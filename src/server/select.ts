import type { Prisma } from "@prisma/client"

export function generateRankSelect(userId?: string) {
  return {
    id: true,
    userId: true,
    name: true,
    image: true,
    description: true,
    createdAt: true,
    updatedAt: true,
    user: {
      select: {
        id: true,
        name: true,
        avatar: true
      }
    },
    softwares: {
      select: {
        software: {
          select: {
            id: true,
            name: true,
            image: true,
            url: true,
            createdAt: true,
            updatedAt: true,
            categoryId: true,
            description: true
          }
        },
        description: true,
        rankIndex: true,
        createdAt: true,
        updatedAt: true,
      }
    },
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
        comments: true,
        softwares: true,
        articles: true,
        likes: true,
        stars: true
      }
    },
    comments: {
      select: {
        id: true,
        user: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        }
      },
      take: 4,
      orderBy: {
        createdAt: "desc" as Prisma.SortOrder
      }
    },
    ...(userId
      ? {
        likes: {
          where: {
            userId
          },
          select: {
            rankId: true
          },
          take: 1
        },
        stars: {
          where: {
            userId
          },
          select: {
            rankId: true
          },
          take: 1
        }
      }
      : {})
  }
}
export function generateSoftwareSelect(userId?: string) {
  return {
    id: true,
    name: true,
    description: true,
    image: true,
    url: true,
    createdAt: true,
    updatedAt: true,
    categoryId: true,
    tags: {
      select: {
        tag: {
          select: {
            name: true
          }
        }
      }
    },
    category: {
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true
      }
    },
    _count: {
      select: {
        likes: true,
        stars: true,
        comments: true
      }
    },
    comments: {
      select: {
        id: true,
        user: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        }
      },
      take: 4,
      orderBy: {
        createdAt: "desc" as Prisma.SortOrder
      }
    },
    ...(userId
      ? {
        likes: {
          where: {
            userId
          },
          select: {
            softwareId: true
          },
          take: 1
        },
        stars: {
          where: {
            userId
          },
          select: {
            softwareId: true
          },
          take: 1
        }
      }
      : {})
  }
}
