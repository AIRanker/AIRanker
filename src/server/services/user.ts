import { type Platform, Prisma, type User } from "@prisma/client"
import { db } from "~/server/db"
import type { UpdateUserParams } from "~/server/schema"
import { fetchUserInfo } from "~/server/tools/platform"

const generateReferralCode = (): string => {
  const timestamp = Date.now().toString(36)
  const randomPart = Math.random().toString(36).substring(2, 6)
  const code = (timestamp + randomPart).toUpperCase()
  return code.substring(0, 10)
}

class UserService {
  async createUser(address: string, referralCode?: string) {
    let referrer: User | null = null
    if (referralCode) {
      referrer = await db.user.findUnique({
        where: {
          referralCode
        }
      })
    }
    return await db.user.create({
      data: {
        address: address,
        name: address,
        referralCode: generateReferralCode(),
        invitedBy: referrer ? [referrer.address, ...referrer.invitedBy] : []
      }
    })
  }

  async getUserByAddress(address: string) {
    return await db.user.findUnique({
      where: {
        address: address
      },
      include: {
        platforms: true
      }
    })
  }

  async bind(accessToken: string, platform: Platform, userAddress: string) {
    const user = await fetchUserInfo(accessToken, platform)
    await db.userPlatform.upsert({
      where: {
        userAddress_platform: {
          userAddress: userAddress,
          platform: platform
        }
      },
      update: {
        platformAvatar: user.avatar,
        platformName: user.name,
        platformId: user.id
      },
      create: {
        userAddress: userAddress,
        platform: platform,
        platformAvatar: user.avatar,
        platformName: user.name,
        platformId: user.id
      }
    })
  }

  async updateMe(params: UpdateUserParams, userAddress: string) {
    return await db.user.update({
      where: {
        address: userAddress
      },
      data: {
        name: params.name,
        description: params.description,
        email: params.email,
        github: params.github,
        instagram: params.instagram,
        telegram: params.telegram,
        website: params.website,
        x: params.x,
        avatar: params.avatar
      }
    })
  }
  async topContributors() {
    // 使用聚合查询获取创建 rank 数量最多的用户
    const topContributors = await db.user.findMany({
      where: {
        ranks: {
          some: {} // 确保用户至少有一个 rank
        }
      },
      select: {
        address: true,
        name: true,
        avatar: true,
        _count: {
          select: {
            ranks: true // 计算每个用户的 rank 数量
          }
        }
      },
      orderBy: {
        ranks: {
          _count: 'desc' // 按 rank 数量降序排序
        }
      },
      take: 10 // 只取前 10 名
    });

    // 格式化返回结果
    return topContributors.map(user => ({
      address: user.address,
      name: user.name,
      avatar: user.avatar,
      rankCount: user._count.ranks
    }));
  }
}
const userWithPlatforms = Prisma.validator<Prisma.UserDefaultArgs>()({ include: { platforms: true } })
export type UserWithPlatforms = Prisma.UserGetPayload<typeof userWithPlatforms>
export const userService = new UserService()
