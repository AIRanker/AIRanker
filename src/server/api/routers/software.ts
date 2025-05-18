import { z } from "zod"
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc"
import { searchParamsSchema, softwareParamsSchema, softwareSearchParamsSchema } from "~/server/schema"
import softwareService from "~/server/services/software"

export const softwareRouter = createTRPCRouter({
  pageSoftwares: publicProcedure.input(softwareSearchParamsSchema).query(async ({ input, ctx }) => {
      const userAddress = ctx.userAddress
      return await softwareService.pageSoftwares(input, userAddress)
  }),
  getSoftwaresByRankId: publicProcedure
      .input(
          z.object({
              rankId: z.string()
          })
      )
      .query(async ({ input, ctx }) => {
          const userAddress = ctx.userAddress
          return await softwareService.getSoftwaresByRankId(input.rankId, userAddress)
      }),
  like: protectedProcedure.input(z.object({ softwareId: z.string() })).mutation(async ({ input, ctx }) => {
      const userAddress = ctx.userAddress!
      return await softwareService.like(input.softwareId, userAddress)
  }),
  fav: protectedProcedure.input(z.object({ softwareId: z.string() })).mutation(async ({ input, ctx }) => {
      const userAddress = ctx.userAddress!
      return await softwareService.star(input.softwareId, userAddress)
  }),
  create: protectedProcedure.input(softwareParamsSchema).mutation(async ({ input, ctx }) => {
      const userAddress = ctx.userAddress!
      return await softwareService.create(input, userAddress)
  }),
  similarSoftwares: publicProcedure.input(z.object({ softwareId: z.string(), limit: z.number().int().default(10).optional() })).query(async ({ input, ctx }) => {
    const userAddress = ctx.userAddress
    return await softwareService.similarSoftwares(input.softwareId, input.limit, userAddress)
  }),
  recentlySoftwares: publicProcedure.query(async () => {
      return await softwareService.recentlySoftwares()
  }),
  recentlyStarAndLikeSoftwares: publicProcedure.query(async ({ ctx }) => {
      return await softwareService.recentlyStarAndLikeSoftwares(ctx.userAddress)
  }),
  detail: publicProcedure.input(z.string()).query(async ({ input, ctx }) => {
    const userAddress = ctx.userAddress!
    return await softwareService.detail(input, userAddress)
  })
})

export default softwareRouter
