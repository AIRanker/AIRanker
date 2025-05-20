import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc"
import { z } from "zod"
import { pageableSchema } from "~/server/schema"
import { softwareCommentService } from "~/server/services/software-comment"

export const softwareCommentRouter = createTRPCRouter({
    getComments: publicProcedure
        .input(
            z.object({
                softwareId: z.string(),
                replyLimit: z.number().optional().default(10).describe("Reply limit"),
                pageable: pageableSchema
            })
        )
        .query(async ({ input }) => {
            const { softwareId, replyLimit, pageable } = input
            return await softwareCommentService.getCommentList(softwareId, pageable, replyLimit)
        }),

    createComment: protectedProcedure
        .input(z.object({
            softwareId: z.string(),
            content: z.string(),
            replyTo: z.string().optional()
        }))
        .mutation(async ({ input, ctx }) => {
            return await softwareCommentService.createComment({
                softwareId: input.softwareId,
                content: input.content,
                replyToCommentId: input.replyTo,
                userId: ctx.userId!
            })
        }),

    deleteComment: protectedProcedure
        .input(z.object({ commentId: z.string() }))
        .mutation(async ({ input, ctx }) => {
            const userId = ctx.userId!
            return await softwareCommentService.deleteComment(input.commentId, userId)
        }),

    getReplies: publicProcedure
        .input(z.object({
            commentId: z.string(),
            cursor: z.number(),
            limit: z.number().optional().default(10)
        }))
        .query(async ({ input }) => {
            return await softwareCommentService.getCommentReplies(input)
        }),

    getCommentStats: publicProcedure
        .input(z.object({
            softwareId: z.string()
        }))
        .query(async ({ input, ctx }) => {
            const userId = ctx.userId!
            return await softwareCommentService.getCommentStats({
                id: input.softwareId,
                userId
            })
        })
})

export default softwareCommentRouter