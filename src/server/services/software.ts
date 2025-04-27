import type { Prisma } from "@prisma/client"
import { db } from "../db"
import type { PageableData, SearchParams } from "../schema"
import { generateSoftwareSelect } from "../select"

class SoftwareService {
  async pageSoftwares(params: SearchParams, userAddress?: string) {
    const whereOptions: Prisma.SoftwareWhereInput = {}

    if (params.search) {
      whereOptions.name = {
        contains: params.search,
        mode: "insensitive" // 不区分大小写
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
        name: "asc" // 默认按名称字母顺序排序
      },
      skip: actualPage * params.pageable.size,
      take: params.pageable.size
    })

    // 处理返回数据，格式化标签并处理点赞/收藏状态
    const list = softwares.map((software) => ({
      ...software,
      tags: software.tags.map((tag) => tag.tag.name),
      isLiked: userAddress ? software.likes?.length > 0 : false,
      isFavorite: userAddress ? software.favorites?.length > 0 : false,
      // 移除原始关联数据，只保留处理后的状态
      likes: undefined,
      favorites: undefined
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
        isFavorite: userAddress ? software.favorites?.length > 0 : false,
        likes: undefined,
        favorites: undefined
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

  async favorite(softwareId: string, userAddress: string) {
    const softwareFavorite = await db.softwareFavorite.findFirst({
      where: {
        softwareId: softwareId,
        userAddress
      }
    })
    if (softwareFavorite) {
      await db.softwareFavorite.delete({
        where: {
          softwareId_userAddress: {
            softwareId: softwareId,
            userAddress
          }
        }
      })
      return false
    }
    await db.softwareFavorite.create({
      data: {
        softwareId: softwareId,
        userAddress
      }
    })
    return true
  }
}

const softwareService = new SoftwareService()
export default softwareService
export type PageSoftwareResult = Awaited<ReturnType<typeof softwareService.pageSoftwares>>
