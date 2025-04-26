import type { Prisma } from "@prisma/client"
import { db } from "../db"
import type { CreateRankParams, PageableData, RankSearchParams } from "../schema"
import { generateRankSelect } from "../select"

class RankService {
  async topRanks(userAddress?: string) {
    const topRanks = await db.rank.findMany({
      select: generateRankSelect(userAddress),
      orderBy: [{ likes: { _count: "desc" } }, { favorites: { _count: "desc" } }],
      take: 10
    })
    return topRanks.map((rank) => ({
      ...rank,
      tags: rank.tags.map((tag) => tag.tag.name),
      isLiked: userAddress ? rank.likes.length > 0 : false,
      isFavorite: userAddress ? rank.favorites.length > 0 : false,
      likes: undefined,
      favorites: undefined
    }))
  }
  async pageRanks(params: RankSearchParams, userAddress?: string) {
    const whereOptions: Prisma.RankWhereInput = {}
    if (params.tags) {
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
    if (params.search) {
      whereOptions.name = {
        contains: params.search,
        mode: "insensitive"
      }
    }

    const total = await db.rank.count({ where: whereOptions })
    const pages = Math.ceil(total / params.pageable.size) || 1
    const ranks = await db.rank.findMany({
      where: whereOptions,
      select: generateRankSelect(userAddress),
      orderBy: { [params.sort]: params.order },
      take: params.pageable.size,
      skip: params.pageable.page * params.pageable.size
    })

    const list = ranks.map((rank) => ({
      ...rank,
      tags: rank.tags.map((tag) => tag.tag.name),
      isLiked: userAddress ? rank.likes.length > 0 : false,
      isFavorite: userAddress ? rank.favorites.length > 0 : false,
      likes: undefined,
      favorites: undefined
    }))
    return {
      list,
      pages,
      total
    } as PageableData<(typeof list)[number]>
  }

  async like(rankId: string, userAddress: string) {
    const rankLike = await db.rankLike.findFirst({
      where: {
        rankId: rankId,
        userAddress
      }
    })
    if (rankLike) {
      await db.rankLike.delete({
        where: {
          rankId_userAddress: {
            rankId: rankId,
            userAddress
          }
        }
      })
      return false
    }
    await db.rankLike.create({
      data: {
        rankId: rankId,
        userAddress
      }
    })
    return true
  }
  async favorite(rankId: string, userAddress: string) {
    const rankFavorite = await db.rankFavorite.findFirst({
      where: {
        rankId: rankId,
        userAddress
      }
    })
    if (rankFavorite) {
      await db.rankFavorite.delete({
        where: {
          rankId_userAddress: {
            rankId: rankId,
            userAddress
          }
        }
      })
      return false
    }
    await db.rankFavorite.create({
      data: {
        rankId: rankId,
        userAddress
      }
    })
    return true
  }
  async create(params: CreateRankParams, userAddress: string) {
    return await db.$transaction(async (tx) => {
      // 1. 创建 Rank
      const rank = await tx.rank.create({
        data: {
          name: params.name,
          description: params.description,
          userAddress: userAddress,
        },
        select: {
          id: true
        }
      });

      // 2. 创建 RankMetadata
      const rankMetadata = await tx.rankMetadata.create({
        data: {
          rankId: rank.id,
          id: params.metadataId
        }
      });

      // 3. 处理标签 - 检查已存在的并创建新的
      if (params.tags && params.tags.length > 0) {
        // 查找已存在的标签
        const existingTags = await tx.tag.findMany({
          where: {
            name: {
              in: params.tags
            }
          },
          select: {
            id: true,
            name: true
          }
        });

        const existingTagNames = existingTags.map(tag => tag.name);
        const newTagNames = params.tags.filter(tag => !existingTagNames.includes(tag));

        // 创建新标签
        const newTags = await Promise.all(
          newTagNames.map(name =>
            tx.tag.create({
              data: { name },
              select: { id: true, name: true }
            })
          )
        );

        // 合并所有标签
        const allTags = [...existingTags, ...newTags];

        // 将标签关联到 Rank
        await Promise.all(
          allTags.map(tag =>
            tx.rankTag.create({
              data: {
                rankId: rank.id,
                tagId: tag.id
              }
            })
          )
        );
      }

      // 4. 处理软件
      if (params.softwares && params.softwares.length > 0) {
        await Promise.all(
          params.softwares.map(async (softwareItem, index) => {
            let softwareId = softwareItem.softwareId;

            // 如果没有提供 softwareId，则创建新软件
            if (!softwareId && softwareItem.name) {
              const newSoftware = await tx.software.create({
                data: {
                  name: softwareItem.name,
                  description: softwareItem.description || '',
                  image: softwareItem.image || '',
                  url: softwareItem.url || '', // 如果 CreateRankParams 中没有 url 字段，可能需要提供默认值或从其他地方获取
                },
                select: {
                  id: true
                }
              });

              softwareId = newSoftware.id;
            }

            // 确保 softwareId 存在
            if (!softwareId) {
              throw new Error('Software ID is required when creating a rank.');
            }

            // 检查软件是否存在
            const softwareExists = await tx.software.findUnique({
              where: {
                id: softwareId
              },
              select: {
                id: true
              }
            });

            if (!softwareExists) {
              throw new Error(`Software with ID ${softwareId} not found.`);
            }

            // 将软件添加到排名中
            await tx.softwareOnRank.create({
              data: {
                rankId: rank.id,
                softwareId: softwareId,
                description: softwareItem.rankDescription,
                rankIndex: softwareItem.rankIndex // 如果没有提供 rankIndex，则使用数组索引
              }
            });
          })
        );
      }
      return await tx.rank.findUnique({
        where: {
          id: rank.id
        },
        select: generateRankSelect(userAddress)
      });
    });
  }
}

const rankService = new RankService()
export default rankService
export type TopRanksResult = Awaited<ReturnType<typeof rankService.topRanks>>
