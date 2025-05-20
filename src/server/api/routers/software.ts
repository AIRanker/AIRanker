import { z } from "zod"
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc"
import { softwareParamsSchema, softwareSearchParamsSchema } from "~/server/schema"
import softwareService from "~/server/services/software"

export const softwareRouter = createTRPCRouter({
    pageSoftwares: publicProcedure.input(softwareSearchParamsSchema).query(async ({ input, ctx }) => {
        return await softwareService.pageSoftwares(input, ctx.userId)
    }),
    getSoftwaresByRankId: publicProcedure
        .input(
            z.object({
                rankId: z.string()
            })
        )
        .query(async ({ input, ctx }) => {

            return await softwareService.getSoftwaresByRankId(input.rankId, ctx.userId)
        }),
    like: protectedProcedure.input(z.object({ softwareId: z.string() })).mutation(async ({ input, ctx }) => {

        return await softwareService.like(input.softwareId, ctx.userId!)
    }),
    fav: protectedProcedure.input(z.object({ softwareId: z.string() })).mutation(async ({ input, ctx }) => {

        return await softwareService.star(input.softwareId, ctx.userId!)
    }),
    create: protectedProcedure.input(softwareParamsSchema).mutation(async ({ input, ctx }) => {

        return await softwareService.create(input, ctx.userId!)
    }),
    similarSoftwares: publicProcedure.input(z.object({ softwareId: z.string(), limit: z.number().int().default(10).optional() })).query(async ({ input, ctx }) => {

        return await softwareService.similarSoftwares(input.softwareId, input.limit, ctx.userId)
    }),
    recentlySoftwares: publicProcedure.query(async () => {
        return await softwareService.recentlySoftwares()
    }),
    recentlyStarAndLikeSoftwares: publicProcedure.query(async ({ ctx }) => {
        return await softwareService.recentlyStarAndLikeSoftwares(ctx.userId)
    }),
    detail: publicProcedure.input(z.string()).query(async ({ input, ctx }) => {

        return await softwareService.detail(input, ctx.userId!)
    })
})

export default softwareRouter
