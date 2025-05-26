import { db } from "../db"
import type { CreateArticleParams } from "../schema"
import { generateSoftwareSelect } from "../select"

class ArticleService {
  async detail(id: string, userId?: string) {
    return await db.article.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        description: true,
        image: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        userId: true,
        author: true,
        softwares: {
          select: {
            software: {
              select: generateSoftwareSelect(userId)
            }
          }
        }
      }
    })
  }

  async getArticlesByRankId(rankId: string, userId?: string) {
    // 1. 查询与指定 rankId 关联的所有文章
    const articles = await db.article.findMany({
      where: {
        rankId
      },
      select: {
        id: true,
        title: true,
        description: true,
        image: true,
        createdAt: true,
        updatedAt: true,
        userId: true,
        author: true,
        softwares: {
          select: {
            software: {
              select: generateSoftwareSelect(userId)
            }
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    })

    // 2. 处理返回数据，转换软件数组并添加用户点赞/收藏状态
    return articles.map((article) => {
      const softwaresWithStatus = article.softwares.map((item) => {
        const software = item.software
        return {
          ...software,
          tags: software.tags.map((tag) => tag.tag.name),
          isLiked: userId ? software.likes?.length > 0 : false,
          isStared: userId ? software.stars?.length > 0 : false,
          likes: undefined,
          stars: undefined
        }
      })

      return {
        ...article,
        softwares: softwaresWithStatus
      }
    })
  }

  async create(rankId: string, params: CreateArticleParams, userId: string) {
    return await db.$transaction(async (tx) => {
      // 1. 验证 rank 的创建者是否为当前用户
      const rank = await tx.rank.findUnique({
        where: { id: rankId },
        select: { userId: true }
      })

      if (!rank) {
        throw new Error(`Rank with ID ${rankId} not found`)
      }

      if (rank.userId !== userId) {
        throw new Error("You don't have permission to create an article for this rank")
      }
      // 2. 创建文章
      const article = await tx.article.create({
        data: {
          title: params.title,
          description: params.description || "",
          content: params.content,
          image: params.image || "",
          rankId,
          userId: userId
        },
        select: {
          id: true
        }
      })

      // 验证并关联软件
      if (params.softwareList && params.softwareList.length > 0) {
        // 验证所有软件ID是否存在
        const softwareIds = params.softwareList
        const existingSoftwares = await tx.software.findMany({
          where: {
            id: {
              in: softwareIds
            }
          },
          select: {
            id: true
          }
        })

        // 检查是否所有的软件ID都存在
        const existingSoftwareIds = existingSoftwares.map((software) => software.id)
        const nonExistingSoftwareIds = softwareIds.filter((id) => !existingSoftwareIds.includes(id))

        if (nonExistingSoftwareIds.length > 0) {
          throw new Error(`Some software IDs don't exist: ${nonExistingSoftwareIds.join(", ")}`)
        }

        // 创建文章-软件关联
        await Promise.all(
          softwareIds.map((softwareId) =>
            tx.softwareOnArticle.create({
              data: {
                softwareId,
                articleId: article.id
              }
            })
          )
        )
      }

      // 返回创建的文章（包含完整信息）
      return await this.detail(article.id, userId)
    })
  }

  async update(id: string, params: CreateArticleParams, userId: string) {
    return await db.$transaction(async (tx) => {
      // 1. 验证文章的创建者是否为当前用户
      const article = await tx.article.findUnique({
        where: { id },
        select: { userId: true }
      })

      if (!article) {
        throw new Error(`Article with ID ${id} not found`)
      }

      if (article.userId !== userId) {
        throw new Error("You don't have permission to update this article")
      }

      // 2. 更新文章
      const updatedArticle = await tx.article.update({
        where: { id },
        data: {
          title: params.title,
          description: params.description || "",
          content: params.content,
          image: params.image || ""
        },
        select: {
          id: true
        }
      })

      // 3. 更新软件关联
      if (params.softwareList && params.softwareList.length > 0) {
        // 删除旧的关联
        await tx.softwareOnArticle.deleteMany({
          where: { articleId: id }
        })

        // 创建新的关联
        await Promise.all(
          params.softwareList.map((softwareId) =>
            tx.softwareOnArticle.create({
              data: {
                softwareId,
                articleId: updatedArticle.id
              }
            })
          )
        )
      }

      // 返回更新后的文章（包含完整信息）
      return await this.detail(updatedArticle.id, userId)
    })
  }
  async delete(id: string, userId: string): Promise<boolean> {
    return await db.$transaction(async (tx) => {
      // 1. 查找文章并验证所有者
      const article = await tx.article.findUnique({
        where: { id },
        select: {
          userId: true,
          rankId: true
        }
      })

      // 2. 如果文章不存在，抛出错误
      if (!article) {
        throw new Error(`Article with ID ${id} not found`)
      }

      // 3. 验证当前用户是否为文章创建者
      if (article.userId !== userId) {
        throw new Error("You don't have permission to delete this article")
      }

      // 4. 先删除所有与文章相关的软件关联
      await tx.softwareOnArticle.deleteMany({
        where: {
          articleId: id
        }
      })

      // 5. 删除文章本身
      await tx.article.delete({
        where: { id }
      })

      return true
    })
  }
}

export default new ArticleService()
