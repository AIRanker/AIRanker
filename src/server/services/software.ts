import type { Prisma } from "@prisma/client"
import { db } from "../db"
import type { PageableData, SearchParams, SoftwareParams, SoftwareSearchParams } from "../schema"
import { generateSoftwareSelect } from "../select"
export async function createSoftware(tx: Prisma.TransactionClient, softwareParams: SoftwareParams, userAddress: string) {
  const newSoftware = await tx.software.create({
    data: {
      name: softwareParams.name,
      description: softwareParams.description || "",
      image: softwareParams.image || "",
      url: softwareParams.url,
      categoryId: softwareParams.categoryId
    },
    select: generateSoftwareSelect(userAddress)
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
  async pageSoftwares(params: SoftwareSearchParams, userAddress?: string) {
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
          userAddress
        }
      }
    }
    if (params.isStared) {
      whereOptions.stars = {
        some: {
          userAddress
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
      select: generateSoftwareSelect(userAddress),
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
      isLiked: userAddress ? software.likes?.length > 0 : false,
      isStared: userAddress ? software.stars?.length > 0 : false,
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

  async getSoftwaresByRankId(rankId: string, userAddress?: string) {
    const softwaresOnRank = await db.softwareOnRank.findMany({
      where: {
        rankId
      },
      select: {
        description: true,
        rankIndex: true,
        software: {
          select: generateSoftwareSelect(userAddress)
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
        isLiked: userAddress ? software.likes?.length > 0 : false,
        isStared: userAddress ? software.stars?.length > 0 : false,
        likes: undefined,
        stars: undefined
      }
    })
  }
  async like(softwareId: string, userAddress: string) {
    const softwareLike = await db.softwareLike.findFirst({
      where: {
        softwareId: softwareId,
        userAddress
      }
    })
    if (softwareLike) {
      await db.softwareLike.delete({
        where: {
          softwareId_userAddress: {
            softwareId: softwareId,
            userAddress
          }
        }
      })
      return false
    }
    await db.softwareLike.create({
      data: {
        softwareId: softwareId,
        userAddress
      }
    })
    return true
  }

  async star(softwareId: string, userAddress: string) {
    const softwareStar = await db.softwareStar.findFirst({
      where: {
        softwareId: softwareId,
        userAddress
      }
    })
    if (softwareStar) {
      await db.softwareStar.delete({
        where: {
          softwareId_userAddress: {
            softwareId: softwareId,
            userAddress
          }
        }
      })
      return false
    }
    await db.softwareStar.create({
      data: {
        softwareId: softwareId,
        userAddress
      }
    })
    return true
  }
  async create(softwareParams: SoftwareParams, userAddress: string) {
    return await db.$transaction(async (tx) => {
      const newSoftware = await createSoftware(tx, softwareParams, userAddress)
      return newSoftware
    })
  }
  async recentlySoftwares(userAddress?: string) {
    const softwares = await db.software.findMany({
      orderBy: {
        updatedAt: "desc"
      },
      take: 5,
      select: generateSoftwareSelect(userAddress)
    })
    return softwares.map((software) => ({
      ...software,
      tags: software.tags.map((tag) => tag.tag.name),
      isLiked: userAddress ? software.likes?.length > 0 : false,
      isStared: userAddress ? software.stars?.length > 0 : false,
      likes: undefined,
      stars: undefined
    }))
  }
  async recentlyStarAndLikeSoftwares(userAddress?: string) {
    const recentStarSoftwares = await db.softwareStar.findMany({
      orderBy: {
        createdAt: "desc"
      },
      take: 5,
      select: {
        user: {
          select: {
            address: true,
            name: true,
            avatar: true
          }
        },
        software: {
          select: generateSoftwareSelect(userAddress)
        },
        createdAt: true
      }
    });

    // 查询最近的点赞记录
    const recentLikeSoftwares = await db.softwareLike.findMany({
      orderBy: {
        createdAt: "desc"
      },
      take: 5,
      select: {
        user: {
          select: {
            address: true,
            name: true,
            avatar: true
          }
        },
        software: {
          select: generateSoftwareSelect(userAddress)
        },
        createdAt: true
      }
    });
    return {
      star: recentStarSoftwares.map((item) => {
        const software = item.software
        return {
          software: {
            ...software,
            tags: software.tags.map((tag) => tag.tag.name),
            isLiked: userAddress ? software.likes?.length > 0 : false,
            isStared: userAddress ? software.stars?.length > 0 : false,
            likes: undefined,
            stars: undefined
          },
          user: {
            address: item.user.address,
            name: item.user.name,
            avatar: item.user.avatar
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
            isLiked: userAddress ? software.likes?.length > 0 : false,
            isStared: userAddress ? software.stars?.length > 0 : false,
            likes: undefined,
            stars: undefined,
          },
          user: {
            address: item.user.address,
            name: item.user.name,
            avatar: item.user.avatar
          },
          createdAt: item.createdAt
        }
      })
    }
  }
  async similarTags(softwareId: string, userAddress?: string) {
    const software = await db.software.findUnique({
      where: { id: softwareId },
      select: {
        tags: {
          select: {
            tagId: true
          }
        }
      }
    })
    if (!software) return []

    const similarSoftwares = await db.software.findMany({
      where: {
        id: { not: softwareId },
        tags: {
          some: {
            tagId: { in: software.tags.map((tag) => tag.tagId) }
          }
        }
      },
      select: generateSoftwareSelect(userAddress),
      orderBy: {
        likes: {
          _count: "desc"
        }
      },
      take: 10
    })
    return similarSoftwares.map((software) => ({
      ...software,
      tags: software.tags.map((tag) => tag.tag.name),
      isLiked: userAddress ? software.likes?.length > 0 : false,
      isStared: userAddress ? software.stars?.length > 0 : false,
      likes: undefined,
      stars: undefined
    }))
  }

  async similarCategory(softwareId: string, userAddress?: string) {
    // 1. 查找当前软件以获取其分类ID
    const software = await db.software.findUnique({
      where: { id: softwareId },
      select: {
        categoryId: true
      }
    });

    if (!software || !software.categoryId) return [];

    // 2. 查询同一分类的其他软件
    const sameCategorySoftwares = await db.software.findMany({
      where: {
        id: { not: softwareId }, // 排除当前软件
        categoryId: software.categoryId // 匹配相同分类
      },
      select: generateSoftwareSelect(userAddress),
      orderBy: {
        // 按点赞数排序，可以根据需求修改
        likes: {
          _count: 'desc'
        }
      },
      take: 10 // 限制返回数量
    });

    // 3. 格式化返回结果
    return sameCategorySoftwares.map((software) => ({
      ...software,
      tags: software.tags.map((tag) => tag.tag.name),
      isLiked: userAddress ? software.likes?.length > 0 : false,
      isStared: userAddress ? software.stars?.length > 0 : false,
      likes: undefined,
      stars: undefined
    }));
  }
}

const softwareService = new SoftwareService()
export default softwareService
export type PageSoftwareResult = Awaited<ReturnType<typeof softwareService.pageSoftwares>>
export type SoftwareByRankIdResult = Awaited<ReturnType<typeof softwareService.getSoftwaresByRankId>>
export type RecentlySoftwaresResult = Awaited<ReturnType<typeof softwareService.recentlySoftwares>>
