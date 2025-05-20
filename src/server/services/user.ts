import { type Platform, Prisma, type User } from "@prisma/client"
import { db } from "~/server/db"
import type { UpdateUserParams } from "~/server/schema"
import { fetchUserInfo } from "~/server/tools/platform"
import { fetchUser, fetchUserMap } from "../clerk"

const generateReferralCode = (): string => {
  const timestamp = Date.now().toString(36)
  const randomPart = Math.random().toString(36).substring(2, 6)
  const code = (timestamp + randomPart).toUpperCase()
  return code.substring(0, 10)
}

class UserService {
  async createUser(id: string, referralCode?: string) {
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
        id,
        referralCode: generateReferralCode(),
        invitedBy: referrer ? [referrer.id, ...referrer.invitedBy] : []
      }
    })
  }

  async getUserById(id: string) {
    return await db.user.findUnique({
      where: {
        id
      },
      include: {
        platforms: true
      }
    })
  }

  async bind(accessToken: string, platform: Platform, userId: string) {
    const user = await fetchUserInfo(accessToken, platform)
    await db.userPlatform.upsert({
      where: {
        userId_platform: {
          userId: userId,
          platform: platform
        }
      },
      update: {
        platformAvatar: user.avatar,
        platformName: user.name,
        platformId: user.id
      },
      create: {
        userId: userId,
        platform: platform,
        platformAvatar: user.avatar,
        platformName: user.name,
        platformId: user.id
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
        id: true,
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
    const userMap = await fetchUserMap(topContributors.map(user => user.id))
    // 格式化返回结果
    return topContributors.map(user => ({
      id: user.id,
      info: userMap.get(user.id),
      rankCount: user._count.ranks
    }));
  }
}
const userWithPlatforms = Prisma.validator<Prisma.UserDefaultArgs>()({ include: { platforms: true } })
export type UserWithPlatforms = Prisma.UserGetPayload<typeof userWithPlatforms>
export const userService = new UserService()
