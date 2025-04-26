import type { Prisma } from "@prisma/client"
import { db } from "../db"
import type { PageableData, RankSearchParams } from "../schema"

function generateRankSelect(userAddress?: string) {
    return {
        id: true,
        userAddress: true,
        name: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        user: true,
        tags: {
            select: {
                tag: {
                    select: {
                        name: true
                    }
                }
            }
        },
        _count: {
            select: {
                softwares: true,
                articles: true,
                likes: true,
                favorites: true
            }
        },
        ...(userAddress ? {
            likes: {
                where: {
                    userAddress
                },
                select: {
                    rankId: true
                },
                take: 1
            },
            favorites: {
                where: {
                    userAddress
                },
                select: {
                    rankId: true
                },
                take: 1
            }
        } : {})
    }
}

class RankService {
    async topRanks(userAddress?: string) {
        const topRanks = await db.rank.findMany({
            select: generateRankSelect(userAddress),
            orderBy: [
                { likes: { _count: 'desc' } },
                { favorites: { _count: 'desc' } }
            ],
            take: 10
        })
        return topRanks.map(rank => ({
            ...rank,
            tags: rank.tags.map(tag => tag.tag.name),
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

        const total = await db.rank.count({ where: whereOptions });
        const pages = Math.ceil(total / params.pageable.size) || 1;
        const ranks = await db.rank.findMany({
            where: whereOptions,
            select: generateRankSelect(userAddress),
            orderBy: { [params.sort]: params.order },
            take: params.pageable.size,
            skip: params.pageable.page * params.pageable.size,
        });

        const list = ranks.map(rank => ({
            ...rank,
            tags: rank.tags.map(tag => tag.tag.name),
            isLiked: userAddress ? rank.likes.length > 0 : false,
            isFavorite: userAddress ? rank.favorites.length > 0 : false,
            likes: undefined,
            favorites: undefined
        }));
        return {
            list,
            pages,
            total
        } as PageableData<(typeof list)[number]>
    }
}
export default new RankService()