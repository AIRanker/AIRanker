import { z } from "zod"
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc"
import { createRankParamsSchema, pageableSchema, rankSeachParamsSchema, searchParamsSchema } from "~/server/schema"
import rankService from "~/server/services/rank"

export const rankRouter = createTRPCRouter({
  pageRanks: publicProcedure.input(rankSeachParamsSchema).query(async ({ input, ctx }) => {
    return await rankService.pageRanks(input, ctx.userId)
  }),

  topRanks: publicProcedure.query(async ({ ctx }) => {
    return await rankService.topRanks(ctx.userId)
  }),
  like: protectedProcedure.input(z.object({ rankId: z.string() })).mutation(async ({ input, ctx }) => {
    return await rankService.like(input.rankId, ctx.userId!)
  }),
  star: protectedProcedure.input(z.object({ rankId: z.string() })).mutation(async ({ input, ctx }) => {
    return await rankService.star(input.rankId, ctx.userId!)
  }),
  create: protectedProcedure.input(z.object({ forms: createRankParamsSchema, metadataId: z.string() })).mutation(async ({ input, ctx }) => {
    return await rankService.create(input.forms, ctx.userId!, input.metadataId)
  }),
  detail: publicProcedure.input(z.object({ rankId: z.string() })).query(async ({ input, ctx }) => {
    return await rankService.detail(input.rankId, ctx.userId)
  }),
  pageRanksBySoftwareId: publicProcedure.input(pageableSchema.extend({ softwareId: z.string() })).query(async ({ input, ctx }) => {
    return await rankService.pageRanksBySoftwareId(input.softwareId, { page: input.page, size: input.size }, ctx.userId)
  }),
})

export default rankRouter
