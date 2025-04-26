import { z } from "zod"
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc"
import { createRankParamsSchema, rankSeachParamsSchema } from "~/server/schema"
import rankService from "~/server/services/rank"

export const rankRouter = createTRPCRouter({
  pageRanks: publicProcedure.input(rankSeachParamsSchema).query(async ({ input, ctx }) => {
    const userAddress = ctx.session?.address
    return await rankService.pageRanks(input, userAddress)
  }),

  topRanks: publicProcedure.query(async ({ ctx }) => {
    const userAddress = ctx.session?.address
    return await rankService.topRanks(userAddress)
  }),
  like: protectedProcedure.input(z.object({ rankId: z.string() })).mutation(async ({ input, ctx }) => {
    const userAddress = ctx.session!.address
    return await rankService.like(input.rankId, userAddress)
  }),
  favorite: protectedProcedure.input(z.object({ rankId: z.string() })).mutation(async ({ input, ctx }) => {
    const userAddress = ctx.session!.address
    return await rankService.favorite(input.rankId, userAddress)
  }),
  create: protectedProcedure.input(createRankParamsSchema).mutation(async ({ input, ctx }) => {
    const userAddress = ctx.session!.address
    return await rankService.create(input, userAddress)
  }),
})

export default rankRouter
