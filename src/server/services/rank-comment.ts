import type { RankComment } from "@prisma/client"
import { subDays, subHours } from "date-fns"
import { z } from "zod"
import { CommonError, ErrorCode } from "~/lib/error"
import { db } from "../db"
import { getRedis } from "../redis"
import { type Pageable, type PageableData, rankCommentSchema } from "../schema"

export const rankCommentWithRepliesSchema = rankCommentSchema.extend({
  replies: rankCommentSchema.array(),
  replyCount: z.number()
})

export type CommentWithReplies = z.infer<typeof rankCommentWithRepliesSchema>

class RankCommentService {
  async getCommentList(rankId: string, pageable: Pageable, replyLimit: number): Promise<PageableData<CommentWithReplies>> {
    const totalCount = await db.rankComment.count({
      where: {
        rankId,
        deletedAt: null,
        rootCommentId: null
      }
    })

    const totalPages = Math.ceil(totalCount / pageable.size)
    const actualPage = Math.max(0, Math.min(pageable.page, totalPages - 1))

    const comments = await db.rankComment.findMany({
      where: {
        rankId,
        deletedAt: null,
        rootCommentId: null
      },
      orderBy: {
        createdAt: "desc"
      },
      skip: actualPage * pageable.size,
      take: pageable.size
    })

    if (totalCount === 0) {
      return {
        list: [],
        total: totalCount,
        pages: totalPages
      }
    }

    const commentIds = comments.map((comment) => comment.id)

    // Get reply counts and ids from redis
    const redis = getRedis()
    const replyInfos = await Promise.all(
      commentIds.map(async (id) => {
        const [count, replyIds] = await Promise.all([redis.zcard(`rank-comment-replies:${id}`), redis.zrange(`rank-comment-replies:${id}`, 0, replyLimit - 1)])
        return { rootId: id, count, replyIds, replies: [] as RankComment[] }
      })
    )

    // Get replies from db
    const replyIds = replyInfos.flatMap((reply) => reply.replyIds)
    // biome-ignore lint/complexity/noForEach: <explanation>
    ;(
      await db.rankComment.findMany({
        where: {
          id: { in: replyIds },
          deletedAt: null
        }
      })
    ).forEach((reply) => {
      const replyInfo = replyInfos.find((replyInfo) => replyInfo.rootId === reply.rootCommentId)
      if (replyInfo) {
        replyInfo.replies.push(reply)
      }
    })

    const commentsWithReplies = comments.map((comment) => {
      const replyInfo = replyInfos.find((replyInfo) => replyInfo.rootId === comment.id)
      const replies = replyInfo
        ? replyInfo.replies
            .sort((a, b) => replyInfo.replyIds.indexOf(a.id) - replyInfo.replyIds.indexOf(b.id))
            .map((reply) => ({
              ...reply,
              comment: reply.content,
              createdBy: reply.userId
            }))
        : []
      const replyCount = replyInfo?.count ?? 0

      return {
        ...comment,
        comment: comment.content,
        createdBy: comment.userId,
        replies,
        replyCount
      }
    })

    return {
      list: commentsWithReplies,
      total: totalCount,
      pages: totalPages
    }
  }

  /**
   * Get a list of replies for a comment
   * @param commentId - The ID of the comment
   * @param cursor - The cursor to start from
   * @param limit - The number of replies to return, defaults to 10
   * @returns A paged response of replies
   */
  async getCommentReplies({
    commentId,
    cursor,
    limit = 10
  }: {
    commentId: string
    cursor: number
    limit?: number
  }) {
    const redis = getRedis()

    const totalCount = await redis.zcard(`rank-comment-replies:${commentId}`)

    const replyIds = await redis.zrange(`rank-comment-replies:${commentId}`, cursor, cursor + limit - 1)

    const nextCursor = cursor + limit
    const previousCursor = cursor - limit

    const replies = (
      await db.rankComment.findMany({
        where: {
          id: { in: replyIds },
          deletedAt: null
        }
      })
    ).sort((a, b) => replyIds.indexOf(a.id) - replyIds.indexOf(b.id))

    return {
      items: replies,
      totalItems: totalCount,
      cursor: {
        next: nextCursor >= totalCount ? undefined : nextCursor,
        previous: previousCursor >= 0 ? previousCursor : undefined
      }
    }
  }

  async getCommentById(id: string, expand = false) {
    const comment = await db.rankComment.findUnique({
      where: {
        id,
        deletedAt: null
      }
    })

    if (!comment) {
      throw new CommonError(ErrorCode.NOT_FOUND, `Can't found comment with id ${id}`)
    }

    if (expand) {
      const commentThread: (RankComment & { replyTo?: RankComment })[] = [comment]
      const MAX_DEPTH = 50 // Prevent infinite loops
      let depth = 0

      while (depth < MAX_DEPTH) {
        const lastComment = commentThread[commentThread.length - 1]
        if (!lastComment?.replyToComment) break

        const replyTo = await db.rankComment.findUnique({
          where: {
            id: lastComment.replyToComment,
            deletedAt: null
          }
        })

        if (replyTo) {
          // Check for circular references
          if (commentThread.some((m) => m.id === replyTo.id)) {
            console.error(`Circular reference detected in comment thread: ${comment.id}`)
            break
          }
          commentThread.push(replyTo)
        }
        depth++
      }

      if (depth >= MAX_DEPTH) {
        console.warn(`Comment thread exceeded maximum depth of ${MAX_DEPTH}: ${comment.id}`)
      }

      const result = commentThread.reverse().reduce<RankComment | undefined>((acc, comment) => {
        comment.replyTo = acc
        return comment
      }, undefined)

      return result
    }

    return comment
  }

  async getRecentUserComments({
    rankId,
    userId,
    startTime,
    limit = 50
  }: {
    rankId: string
    userId: string
    startTime?: Date
    limit?: number
  }) {
    startTime = startTime ?? subHours(new Date(), 6)

    const comments = await db.rankComment.findMany({
      where: {
        rankId,
        userId: { not: userId },
        createdAt: {
          gte: startTime
        }
      },
      orderBy: {
        createdAt: "desc"
      },
      take: Math.max(limit, 100)
    })

    return comments
  }

  async createComment({
    rankId,
    content,
    userId,
    replyToCommentId
  }: {
    rankId: string
    content: string
    userId: string
    replyToCommentId?: string
  }) {
    const rank = await db.rank.findUnique({
      where: { id: rankId }
    })

    if (!rank) {
      throw new CommonError(ErrorCode.BAD_PARAMS, `Can't found rank with id ${rankId}`)
    }

    console.log(`Creating comment for rank ${rankId} from user ${userId} in reply to comment ${replyToCommentId}: ${content.slice(0, 10)}...`)

    const replyTo = replyToCommentId ? await this.getCommentById(replyToCommentId) : null

    if (replyToCommentId && !replyTo) {
      throw new CommonError(ErrorCode.NOT_FOUND, "Reply to comment not found")
    }

    if (content.length === 0 || content.length > 256) {
      throw new CommonError(ErrorCode.BAD_PARAMS, "Comment cannot be empty or longer than 256 characters")
    }

    const rootCommentId = replyTo?.rootCommentId ?? replyTo?.id ?? null

    if (replyTo && !rootCommentId) {
      console.error(`Cannot determine root comment id while replying to comment ${replyTo.id}`)
      throw new CommonError(ErrorCode.INTERNAL_ERROR, "Cannot determine root comment id while replying to comment")
    }

    return await db.$transaction(async (tx) => {
      const newComment = await tx.rankComment.create({
        data: {
          rankId,
          content,
          userId,
          rootCommentId,
          replyToComment: replyTo?.id ?? null,
          replyToUser: replyTo?.userId ?? null
        }
      })

      console.log(`Created comment for rank ${rankId}, new comment id: ${newComment.id}`)

      const redis = getRedis()

      if (replyTo) {
        await redis.zadd(`rank-comment-replies:${rootCommentId}`, newComment.createdAt.getTime(), newComment.id)
      }

      return newComment
    })
  }

  async deleteComment(id: string, userId: string) {
    await db.$transaction(async (tx) => {
      const comment = await tx.rankComment.findUnique({
        where: { id, userId },
        select: { rootCommentId: true }
      })

      if (!comment) {
        throw new CommonError(ErrorCode.NOT_FOUND, "Comment not found")
      }

      await tx.rankComment.update({
        where: { id, userId },
        data: { deletedAt: new Date() }
      })

      const redis = getRedis()

      if (comment.rootCommentId) {
        // Comment is a reply, remove it from the reply list
        await redis.zrem(`rank-comment-replies:${comment.rootCommentId}`, id)
      } else {
        // Comment is a root comment, delete the entire reply list
        await redis.del(`rank-comment-replies:${id}`)
      }
    })
  }

  /**
   * Reset the reply cache for a Rank
   * @param rankId - The ID of the Rank
   */
  async resetReplyCache(rankId: string) {
    const rootComments = await db.rankComment.findMany({
      where: {
        rankId,
        replyToComment: null,
        deletedAt: null
      }
    })

    for (const comment of rootComments) {
      const replies = await db.rankComment.findMany({
        where: {
          rootCommentId: comment.id,
          deletedAt: null
        }
      })

      const redis = getRedis()
      await redis.del(`rank-comment-replies:${comment.id}`)
      await redis.zadd(`rank-comment-replies:${comment.id}`, ...replies.flatMap((reply) => [reply.createdAt.getTime(), reply.id]))
    }
  }

  /**
   * Get comment history for a wallet address
   * @param userId - The wallet address
   * @param limit - The number of comments to return, defaults to 10
   * @returns An array of comments
   */
  async getCommentHistory(userId: string | null, limit = 10) {
    return userId
      ? await db.rankComment.findMany({
          where: {
            userId: {
              contains: userId,
              mode: "insensitive"
            }
          },
          orderBy: {
            createdAt: "desc"
          },
          take: limit
        })
      : []
  }

  /**
   * Get comment statistics for a Rank
   * @param rank - The Rank object with id and userId
   * @returns Comment statistics
   */
  async getCommentStats(rank: { id: string; userId: string | null }) {
    const total = await db.rankComment.count({
      where: { rankId: rank.id }
    })

    if (!rank.userId) {
      return { total, selfTotal: 0, self24h: 0, self7d: 0 }
    }

    const selfTotal = await db.rankComment.count({
      where: {
        userId: {
          contains: rank.userId,
          mode: "insensitive"
        }
      }
    })

    const self24h = await db.rankComment.count({
      where: {
        userId: {
          contains: rank.userId,
          mode: "insensitive"
        },
        createdAt: {
          gte: subHours(new Date(), 24)
        }
      }
    })

    const self7d = await db.rankComment.count({
      where: {
        userId: {
          contains: rank.userId,
          mode: "insensitive"
        },
        createdAt: {
          gte: subDays(new Date(), 7)
        }
      }
    })

    return { total, selfTotal, self24h, self7d }
  }
}

const rankCommentService = new RankCommentService()
export { rankCommentService }
export type CommentListResult = Awaited<ReturnType<typeof rankCommentService.getCommentList>>
