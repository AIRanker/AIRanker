import { z } from "zod"
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc"
import { pageableSchema } from "~/server/schema"
import { rankCommentService } from "~/server/services/rank-comment"

export const rankCommentRouter = createTRPCRouter({
  getComments: publicProcedure
    .input(
      z.object({
        rankId: z.string(),
        replyLimit: z.number().optional().default(10).describe("Reply limit"),
        pageable: pageableSchema
      })
    )
    .query(async ({ input }) => {
      const { rankId, replyLimit, pageable } = input
      return await rankCommentService.getCommentList(rankId, pageable, replyLimit)
    }),
  createComment: protectedProcedure.input(z.object({ rankId: z.string(), content: z.string(), replyTo: z.string().optional() })).mutation(async ({ input, ctx }) => {
    return await rankCommentService.createComment({
      ...input,
      replyToCommentId: input.replyTo,
      userId: ctx.userId!
    })
  }),
  deleteComment: protectedProcedure.input(z.object({ commentId: z.string() })).mutation(async ({ input, ctx }) => {
    const userId = ctx.auth!.userId!
    return await rankCommentService.deleteComment(input.commentId, userId)
  })
})
