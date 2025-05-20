import { z } from "zod"
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc"
import articleService from "~/server/services/article"
import { createArticleParamsSchema } from "~/server/schema"

export const articleRouter = createTRPCRouter({
    detail: publicProcedure.input(z.object({ id: z.string() })).query(async ({ input, ctx }) => {
        return await articleService.detail(input.id, ctx.userId)
    }),
    getArticlesByRankId: publicProcedure.input(z.object({ rankId: z.string() })).query(async ({ input, ctx }) => {
        return await articleService.getArticlesByRankId(input.rankId, ctx.userId)
    }),
    create: protectedProcedure.input(z.object({ rankId: z.string(), params: createArticleParamsSchema })).mutation(async ({ input, ctx }) => {
        return await articleService.create(input.rankId, input.params, ctx.userId!)
    }),
    update: protectedProcedure
        .input(z.object({
            id: z.string(),
            params: createArticleParamsSchema
        }))
        .mutation(async ({ input, ctx }) => {
            return await articleService.update(input.id, input.params, ctx.userId!)
        }),
    delete: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ input, ctx }) => {
            return await articleService.delete(input.id, ctx.userId!)
        }),
})
