import { z } from "zod"
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc"
import softwareService from "~/server/services/software"

export const softwareRouter = createTRPCRouter({
  getSoftwareByRankId: publicProcedure
    .input(
      z.object({
        rankId: z.string()
      })
    )
    .query(async ({ input, ctx }) => {
      const userAddress = ctx.session?.address
      return await softwareService.getSoftwareByRankId(input.rankId, userAddress)
    }),
  like: protectedProcedure.input(z.object({ softwareId: z.string() })).mutation(async ({ input, ctx }) => {
    const userAddress = ctx.session!.address
    return await softwareService.like(input.softwareId, userAddress)
  }),
  favorite: protectedProcedure.input(z.object({ softwareId: z.string() })).mutation(async ({ input, ctx }) => {
    const userAddress = ctx.session!.address
    return await softwareService.favorite(input.softwareId, userAddress)
  })
})

export default softwareRouter
