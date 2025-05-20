import type { Prisma } from "@prisma/client"
import { db } from "../db"
import type { PageableData, SearchParams, SoftwareParams, SoftwareSearchParams } from "../schema"
import { generateSoftwareSelect } from "../select"
export async function createSoftware(tx: Prisma.TransactionClient, softwareParams: SoftwareParams, userId: string) {
  const newSoftware = await tx.software.create({
    data: {
      name: softwareParams.name,
      description: softwareParams.description || "",
      image: softwareParams.image || "",
      url: softwareParams.url,
      categoryId: softwareParams.categoryId
    },
    select: generateSoftwareSelect(userId)
  })
  // 只有创建新软件时才处理标签
  if (softwareParams.tags && softwareParams.tags.length > 0) {
    // 查找已存在的标签
    const existingTags = await tx.tag.findMany({
      where: {
        name: {
          in: softwareParams.tags
        }
      },
      select: {
        id: true,
        name: true
      }
    })

    const existingTagNames = existingTags.map((tag) => tag.name)
    const newTagNames = softwareParams.tags.filter((tag) => !existingTagNames.includes(tag))

    // 创建新标签
    const newTags = await Promise.all(
      newTagNames.map((name) =>
        tx.tag.create({
          data: { name },
          select: { id: true, name: true }
        })
      )
    )

    // 合并所有标签
    const allTags = [...existingTags, ...newTags]

    // 将标签关联到软件
    await Promise.all(
      allTags.map((tag) =>
        tx.softwareTag.create({
          data: {
            softwareId: newSoftware.id,
            tagId: tag.id
          }
        })
      )
    )
  }
  return newSoftware
}

class SoftwareService {
  async pageSoftwares(params: SoftwareSearchParams, userId?: string) {
    const whereOptions: Prisma.SoftwareWhereInput = {}

    if (params.search) {
      whereOptions.name = {
        contains: params.search,
        mode: "insensitive" // 不区分大小写
      }
    }
    if (params.tags && params.tags.length > 0) {
      whereOptions.tags = {
        some: {
          tag: {
            name: {
              in: params.tags
            }
          }
        }
      }
    }
    if (params.isLiked) {
      whereOptions.likes = {
        some: {
          userId
        }
      }
    }
    if (params.isStared) {
      whereOptions.stars = {
        some: {
          userId
        }
      }
    }
    if (params.categoryIds && params.categoryIds.length > 0) {
      whereOptions.categoryId = {
        in: params.categoryIds
      }
    }

    // 计算总记录数
    const total = await db.software.count({ where: whereOptions })

    // 计算总页数
    const pages = Math.ceil(total / params.pageable.size) || 1

    // 确保当前页在有效范围内
    const actualPage = Math.max(0, Math.min(params.pageable.page, pages - 1))

    // 查询软件数据，包括关联的标签和统计信息
    const softwares = await db.software.findMany({
      where: whereOptions,
      select: generateSoftwareSelect(userId),
      orderBy: {
        [params.sort]: {
          _count: params.order
        }
      },
      skip: actualPage * params.pageable.size,
      take: params.pageable.size
    })

    // 处理返回数据，格式化标签并处理点赞/收藏状态
    const list = softwares.map((software) => ({
      ...software,
      tags: software.tags.map((tag) => tag.tag.name),
      isLiked: userId ? software.likes?.length > 0 : false,
      isStared: userId ? software.stars?.length > 0 : false,
      // 移除原始关联数据，只保留处理后的状态
      likes: undefined,
      stars: undefined
    }))

    return {
      list,
      total,
      pages
    } as PageableData<(typeof list)[number]>
  }

  async getSoftwaresByRankId(rankId: string, userId?: string) {
    const softwaresOnRank = await db.softwareOnRank.findMany({
      where: {
        rankId
      },
      select: {
        description: true,
        rankIndex: true,
        software: {
          select: generateSoftwareSelect(userId)
        }
      },
      orderBy: {
        rankIndex: "asc"
      }
    })

    return softwaresOnRank.map((item) => {
      const software = item.software
      return {
        ...software,
        rankDescription: item.description,
        rankIndex: item.rankIndex,
        tags: software.tags.map((tag) => tag.tag.name),
        isLiked: userId ? software.likes?.length > 0 : false,
        isStared: userId ? software.stars?.length > 0 : false,
        likes: undefined,
        stars: undefined
      }
    })
  }
  async like(softwareId: string, userId: string) {
    const softwareLike = await db.softwareLike.findFirst({
      where: {
        softwareId: softwareId,
        userId: userId
      }
    })
    if (softwareLike) {
      await db.softwareLike.delete({
        where: {
          softwareId_userId: {
            softwareId: softwareId,
            userId: userId
          }
        }
      })
      return false
    }
    await db.softwareLike.create({
      data: {
        softwareId: softwareId,
        userId: userId
      }
    })
    return true
  }

  async star(softwareId: string, userId: string) {
    const softwareStar = await db.softwareStar.findFirst({
      where: {
        softwareId: softwareId,
        userId: userId
      }
    })
    if (softwareStar) {
      await db.softwareStar.delete({
        where: {
          softwareId_userId: {
            softwareId: softwareId,
            userId: userId
          }
        }
      })
      return false
    }
    await db.softwareStar.create({
      data: {
        softwareId: softwareId,
        userId: userId
      }
    })
    return true
  }
  async create(softwareParams: SoftwareParams, userId: string) {
    return await db.$transaction(async (tx) => {
      const newSoftware = await createSoftware(tx, softwareParams, userId)
      return newSoftware
    })
  }
  async recentlySoftwares(userId?: string) {
    const softwares = await db.software.findMany({
      orderBy: {
        updatedAt: "desc"
      },
      take: 5,
      select: generateSoftwareSelect(userId)
    })
    return softwares.map((software) => ({
      ...software,
      tags: software.tags.map((tag) => tag.tag.name),
      isLiked: userId ? software.likes?.length > 0 : false,
      isStared: userId ? software.stars?.length > 0 : false,
      likes: undefined,
      stars: undefined
    }))
  }
  async recentlyStarAndLikeSoftwares(userId?: string) {
    const recentStarSoftwares = await db.softwareStar.findMany({
      orderBy: {
        createdAt: "desc"
      },
      take: 5,
      select: {
        userId: true,
        software: {
          select: generateSoftwareSelect(userId)
        },
        createdAt: true
      }
    })

    // 查询最近的点赞记录
    const recentLikeSoftwares = await db.softwareLike.findMany({
      orderBy: {
        createdAt: "desc"
      },
      take: 5,
      select: {
        userId: true,
        software: {
          select: generateSoftwareSelect(userId)
        },
        createdAt: true
      }
    })
    return {
      star: recentStarSoftwares.map((item) => {
        const software = item.software
        return {
          software: {
            ...software,
            tags: software.tags.map((tag) => tag.tag.name),
            isLiked: userId ? software.likes?.length > 0 : false,
            isStared: userId ? software.stars?.length > 0 : false,
            likes: undefined,
            stars: undefined
          },
          createdAt: item.createdAt
        }
      }),
      like: recentLikeSoftwares.map((item) => {
        const software = item.software
        return {
          software: {
            ...software,
            tags: software.tags.map((tag) => tag.tag.name),
            isLiked: userId ? software.likes?.length > 0 : false,
            isStared: userId ? software.stars?.length > 0 : false,
            likes: undefined,
            stars: undefined
          },
          createdAt: item.createdAt
        }
      })
    }
  }
  async similarSoftwares(softwareId: string, limit = 10, userId?: string) {
    const software = await db.software.findUnique({
      where: { id: softwareId },
      select: {
        tags: {
          select: {
            tagId: true
          }
        },
        categoryId: true
      }
    })

    if (!software) return []

    // 构建 OR 条件: 匹配标签 OR 匹配分类
    const whereCondition: Prisma.SoftwareWhereInput = {
      id: { not: softwareId }
    }

    const orConditions: Prisma.SoftwareWhereInput[] = []

    // 条件1: 相同标签
    orConditions.push({
      tags: {
        some: {
          tagId: { in: software.tags.map((tag) => tag.tagId) }
        }
      }
    })

    // 条件2: 相同分类
    if (software.categoryId) {
      orConditions.push({
        categoryId: software.categoryId
      })
    }

    if (orConditions.length > 0) {
      whereCondition.OR = orConditions
    }

    const similarSoftwares = await db.software.findMany({
      where: whereCondition,
      select: generateSoftwareSelect(userId),
      orderBy: {
        likes: {
          _count: "desc"
        }
      },
      take: limit
    })

    return similarSoftwares.map((software) => ({
      ...software,
      tags: software.tags.map((tag) => tag.tag.name),
      isLiked: userId ? software.likes?.length > 0 : false,
      isStared: userId ? software.stars?.length > 0 : false,
      likes: undefined,
      stars: undefined
    }))
  }
  async detail(id: string, userId?: string) {
    const software = await db.software.findUnique({
      where: { id },
      select: generateSoftwareSelect(userId)
    })

    if (!software) {
      return null
    }

    // 处理返回数据，将标签列表转换为名称数组，处理点赞/收藏状态
    return {
      ...software,
      tags: software.tags.map((tag) => tag.tag.name),
      isLiked: userId ? software.likes?.length > 0 : false,
      isStared: userId ? software.stars?.length > 0 : false,
      // 移除原始关联数据，只保留处理后的状态
      likes: undefined,
      stars: undefined
    }
  }
}

const softwareService = new SoftwareService()
export default softwareService
export type PageSoftwareResult = Awaited<ReturnType<typeof softwareService.pageSoftwares>>
export type SoftwareByRankIdResult = Awaited<ReturnType<typeof softwareService.getSoftwaresByRankId>>
export type RecentlySoftwaresResult = Awaited<ReturnType<typeof softwareService.recentlySoftwares>>
export type SoftwareDetailResult = Awaited<ReturnType<typeof softwareService.detail>>
export type SimilarSoftwaresResult = Awaited<ReturnType<typeof softwareService.similarSoftwares>>
