import { db } from "../db";

class SoftwareService {
    async getSoftwaresByRankId(rankId: string, userAddress?: string) {
        const softwaresOnRank = await db.softwareOnRank.findMany({
            where: {
                rankId
            },
            select: {
                description: true,
                rankIndex: true,
                software: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                        image: true,
                        url: true,
                        createdAt: true,
                        updatedAt: true,
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
                                    softwareId: true
                                },
                                take: 1
                            },
                            favorites: {
                                where: {
                                    userAddress
                                },
                                select: {
                                    softwareId: true
                                },
                                take: 1
                            }
                        } : {})
                    }
                }
            },
            orderBy: {
                rankIndex: 'asc'
            }
        });

        return softwaresOnRank.map(item => {
            const software = item.software;
            return {
                ...software,
                rankDescription: item.description,
                rankIndex: item.rankIndex,
                tags: software.tags.map(tag => tag.tag.name),
                isLiked: userAddress ? software.likes?.length > 0 : false,
                isFavorite: userAddress ? software.favorites?.length > 0 : false,
                likes: undefined,
                favorites: undefined
            };
        });
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

export default new SoftwareService();