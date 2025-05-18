import { z } from "zod"
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc"
import { createRankParamsSchema, pageableSchema, rankSeachParamsSchema, searchParamsSchema } from "~/server/schema"
import rankService from "~/server/services/rank"

export const rankRouter = createTRPCRouter({
  pageRanks: publicProcedure.input(rankSeachParamsSchema).query(async ({ input, ctx }) => {
    return await rankService.pageRanks(input, ctx.userAddress)
  }),

  topRanks: publicProcedure.query(async ({ ctx }) => {
    return await rankService.topRanks(ctx.userAddress)
  }),
  like: protectedProcedure.input(z.object({ rankId: z.string() })).mutation(async ({ input, ctx }) => {
    return await rankService.like(input.rankId, ctx.userAddress!)
  }),
  star: protectedProcedure.input(z.object({ rankId: z.string() })).mutation(async ({ input, ctx }) => {
    return await rankService.star(input.rankId, ctx.userAddress!)
  }),
  create: protectedProcedure.input(z.object({ forms: createRankParamsSchema, metadataId: z.string() })).mutation(async ({ input, ctx }) => {
    return await rankService.create(input.forms, ctx.userAddress!, input.metadataId)
  }),
  detail: publicProcedure.input(z.object({ rankId: z.string() })).query(async ({ input, ctx }) => {
    return await rankService.detail(input.rankId, ctx.userAddress)
  }),
  pageRanksBySoftwareId: publicProcedure.input(pageableSchema.extend({ softwareId: z.string() })).query(async ({ input, ctx }) => {
    return await rankService.pageRanksBySoftwareId(input.softwareId, { page: input.page, size: input.size }, ctx.userAddress)
  }),
})

export default rankRouter
