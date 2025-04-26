import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { rankSeachParamsSchema } from "~/server/schema";
import rankService from "~/server/services/rank";

export const rankRouter = createTRPCRouter({
    pageRanks: publicProcedure
        .input(rankSeachParamsSchema)
        .query(async ({ input, ctx }) => {
            const userAddress = ctx.session?.address
            return await rankService.pageRanks(input, userAddress);
        }),

    topRanks: publicProcedure
        .query(async ({ ctx }) => {
            const userAddress = ctx.session?.address
            return await rankService.topRanks(userAddress);
        }),
});

export default rankRouter;
