import { z } from "zod"
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc"
import { searchParamsSchema, softwareParamsSchema, softwareSearchParamsSchema } from "~/server/schema"
import softwareService from "~/server/services/software"

export const softwareRouter = createTRPCRouter({
    pageSoftwares: publicProcedure
        .input(softwareSearchParamsSchema)
        .query(async ({ input, ctx }) => {
            const userAddress = ctx.session?.address
            return await softwareService.pageSoftwares(input, userAddress)
        }),
    getSoftwaresByRankId: publicProcedure
        .input(z.object({
            rankId: z.string()
        }))
        .query(async ({ input, ctx }) => {
            const userAddress = ctx.session?.address
            return await softwareService.getSoftwaresByRankId(input.rankId, userAddress)
        }),
    like: protectedProcedure.input(z.object({ softwareId: z.string() })).mutation(async ({ input, ctx }) => {
        const userAddress = ctx.session!.address
        return await softwareService.like(input.softwareId, userAddress)
    }),
    fav: protectedProcedure.input(z.object({ softwareId: z.string() })).mutation(async ({ input, ctx }) => {
        const userAddress = ctx.session!.address
        return await softwareService.star(input.softwareId, userAddress)
    }),
    create: protectedProcedure.input(softwareParamsSchema).mutation(async ({ input, ctx }) => {
        const userAddress = ctx.session!.address
        return await softwareService.create(input, userAddress)
    }
    ),
    recentlySoftwares: publicProcedure
        .query(async ({ }) => {
            return await softwareService.recentlySoftwares()
        }),
})

export default softwareRouter
