import type { SoftwareComment } from "@prisma/client"
import { subDays, subHours } from "date-fns"
import { z } from "zod"
import { CommonError, ErrorCode } from "~/lib/error"
import { db } from "../db"
import { getRedis } from "../redis"
import { type Pageable, type PageableData, softwareCommentSchema } from "../schema"

export const softwareCommentWithRepliesSchema = softwareCommentSchema.extend({
  replies: softwareCommentSchema.array(),
  replyCount: z.number()
})

export type CommentWithReplies = z.infer<typeof softwareCommentWithRepliesSchema>

class SoftwareCommentService {
  async getCommentList(softwareId: string, pageable: Pageable, replyLimit: number): Promise<PageableData<CommentWithReplies>> {
    const totalCount = await db.softwareComment.count({
      where: {
        softwareId,
        deletedAt: null,
        rootCommentId: null
      }
    })

    const totalPages = Math.ceil(totalCount / pageable.size)
    const actualPage = Math.max(0, Math.min(pageable.page, totalPages - 1))

    const comments = await db.softwareComment.findMany({
      where: {
        softwareId,
        deletedAt: null,
        rootCommentId: null
      },
      orderBy: {
        createdAt: "desc"
      },
      skip: actualPage * pageable.size,
      take: pageable.size,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        }
      }
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
        const [count, replyIds] = await Promise.all([redis.zcard(`software-comment-replies:${id}`), redis.zrange(`software-comment-replies:${id}`, 0, replyLimit - 1)])
        return { rootId: id, count, replyIds, replies: [] as SoftwareComment[] }
      })
    )

    // Get replies from db
    const replyIds = replyInfos.flatMap((reply) => reply.replyIds)
      // biome-ignore lint/complexity/noForEach: <explanation>
      ; (
        await db.softwareComment.findMany({
          where: {
            id: { in: replyIds },
            deletedAt: null
          },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                avatar: true
              }
            }
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

    const totalCount = await redis.zcard(`software-comment-replies:${commentId}`)

    const replyIds = await redis.zrange(`software-comment-replies:${commentId}`, cursor, cursor + limit - 1)

    const nextCursor = cursor + limit
    const previousCursor = cursor - limit

    const replies = (
      await db.softwareComment.findMany({
        where: {
          id: { in: replyIds },
          deletedAt: null
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              avatar: true
            }
          }
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
    const comment = await db.softwareComment.findUnique({
      where: {
        id,
        deletedAt: null
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        }
      }
    })

    if (!comment) {
      throw new CommonError(ErrorCode.NOT_FOUND, `Can't found comment with id ${id}`)
    }

    if (expand) {
      const commentThread: (SoftwareComment & { replyTo?: SoftwareComment })[] = [comment]
      const MAX_DEPTH = 50 // Prevent infinite loops
      let depth = 0

      while (depth < MAX_DEPTH) {
        const lastComment = commentThread[commentThread.length - 1]
        if (!lastComment?.replyToComment) break

        const replyTo = await db.softwareComment.findUnique({
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

      const result = commentThread.reverse().reduce<SoftwareComment | undefined>((acc, comment) => {
        comment.replyTo = acc
        return comment
      }, undefined)

      return result
    }

    return comment
  }

  async getRecentUserComments({
    softwareId,
    userId,
    startTime,
    limit = 50
  }: {
    softwareId: string
    userId: string
    startTime?: Date
    limit?: number
  }) {
    startTime = startTime ?? subHours(new Date(), 6)

    const comments = await db.softwareComment.findMany({
      where: {
        softwareId,
        userId: { not: userId },
        createdAt: {
          gte: startTime
        }
      },
      orderBy: {
        createdAt: "desc"
      },
      take: Math.max(limit, 100),
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        }
      }
    })

    return comments
  }

  async createComment({
    softwareId,
    content,
    userId,
    replyToCommentId
  }: {
    softwareId: string
    content: string
    userId: string
    replyToCommentId?: string
  }) {
    const software = await db.software.findUnique({
      where: { id: softwareId }
    })

    if (!software) {
      throw new CommonError(ErrorCode.BAD_PARAMS, `Can't found software with id ${softwareId}`)
    }

    console.log(`Creating comment for software ${softwareId} from user ${userId} in reply to comment ${replyToCommentId}: ${content.slice(0, 10)}...`)

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
      const newComment = await tx.softwareComment.create({
        data: {
          softwareId,
          content,
          userId,
          rootCommentId,
          replyToComment: replyTo?.id ?? null,
          replyToUser: replyTo?.userId ?? null
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              avatar: true
            }
          }
        }
      })

      console.log(`Created comment for software ${softwareId}, new comment id: ${newComment.id}`)

      const redis = getRedis()

      if (replyTo) {
        await redis.zadd(`software-comment-replies:${rootCommentId}`, newComment.createdAt.getTime(), newComment.id)
      }

      return newComment
    })
  }

  async deleteComment(id: string, userId: string) {
    await db.$transaction(async (tx) => {
      const comment = await tx.softwareComment.findUnique({
        where: { id, userId },
        select: { rootCommentId: true }
      })

      if (!comment) {
        throw new CommonError(ErrorCode.NOT_FOUND, "Comment not found")
      }

      await tx.softwareComment.update({
        where: { id, userId },
        data: { deletedAt: new Date() }
      })

      const redis = getRedis()

      if (comment.rootCommentId) {
        // Comment is a reply, remove it from the reply list
        await redis.zrem(`software-comment-replies:${comment.rootCommentId}`, id)
      } else {
        // Comment is a root comment, delete the entire reply list
        await redis.del(`software-comment-replies:${id}`)
      }
    })
  }

  /**
   * Reset the reply cache for a Software
   * @param softwareId - The ID of the Software
   */
  async resetReplyCache(softwareId: string) {
    const rootComments = await db.softwareComment.findMany({
      where: {
        softwareId,
        replyToComment: null,
        deletedAt: null
      }
    })

    for (const comment of rootComments) {
      const replies = await db.softwareComment.findMany({
        where: {
          rootCommentId: comment.id,
          deletedAt: null
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              avatar: true
            }
          }
        }
      })

      const redis = getRedis()
      await redis.del(`software-comment-replies:${comment.id}`)
      await redis.zadd(`software-comment-replies:${comment.id}`, ...replies.flatMap((reply) => [reply.createdAt.getTime(), reply.id]))
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
      ? await db.softwareComment.findMany({
        where: {
          userId: {
            contains: userId,
            mode: "insensitive"
          }
        },
        orderBy: {
          createdAt: "desc"
        },
        take: limit,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              avatar: true
            }
          }
        }
      })
      : []
  }

  /**
   * Get comment statistics for a Software
   * @param software - The Software object with id and userId
   * @returns Comment statistics
   */
  async getCommentStats(software: { id: string; userId?: string }) {
    const total = await db.softwareComment.count({
      where: { softwareId: software.id }
    })

    if (!software.userId) {
      return { total, selfTotal: 0, self24h: 0, self7d: 0 }
    }

    const selfTotal = await db.softwareComment.count({
      where: {
        softwareId: software.id,
        userId: {
          contains: software.userId,
          mode: "insensitive"
        }
      }
    })

    const self24h = await db.softwareComment.count({
      where: {
        softwareId: software.id,
        userId: {
          contains: software.userId,
          mode: "insensitive"
        },
        createdAt: {
          gte: subHours(new Date(), 24)
        }
      }
    })

    const self7d = await db.softwareComment.count({
      where: {
        softwareId: software.id,
        userId: {
          contains: software.userId,
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
const softwareCommentService = new SoftwareCommentService()
export { softwareCommentService }
export type ToolCommentListResult = Awaited<ReturnType<typeof softwareCommentService.getCommentList>>
