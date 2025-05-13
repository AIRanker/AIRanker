import { z } from "zod"
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc"
import articleService from "~/server/services/article"
import { createArticleParamsSchema } from "~/server/schema"

export const articleRouter = createTRPCRouter({
    detail: publicProcedure.input(z.object({ id: z.string() })).query(async ({ input, ctx }) => {
        const userAddress = ctx.userAddress
        return await articleService.detail(input.id, userAddress)
    }),
    getArticlesByRankId: publicProcedure.input(z.object({ rankId: z.string() })).query(async ({ input, ctx }) => {
        const userAddress = ctx.userAddress
        return await articleService.getArticlesByRankId(input.rankId, userAddress)
    }),
    create: protectedProcedure.input(z.object({ rankId: z.string(), params: createArticleParamsSchema })).mutation(async ({ input, ctx }) => {
        const userAddress = ctx.userAddress!
        return await articleService.create(input.rankId, input.params, userAddress)
    }),
    update: protectedProcedure
        .input(z.object({
            id: z.string(),
            params: createArticleParamsSchema
        }))
        .mutation(async ({ input, ctx }) => {
            const userAddress = ctx.userAddress!
            return await articleService.update(input.id, input.params, userAddress)
        }),
    delete: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ input, ctx }) => {
            const userAddress = ctx.userAddress!
            return await articleService.delete(input.id, userAddress)
        }),
})
