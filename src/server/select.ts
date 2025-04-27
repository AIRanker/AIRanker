export function generateRankSelect(userAddress?: string) {
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
    ...(userAddress
      ? {
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
        }
      : {})
  }
}
export function generateSoftwareSelect(userAddress?: string) {
  return {
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
    ...(userAddress
      ? {
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
        }
      : {})
  }
}
