import { searchParamsSchema } from "~/server/schema";
import { createTRPCRouter, publicProcedure } from "../trpc";
import tagService from "~/server/services/tag";
export const tagRouter = createTRPCRouter({
    // 分页获取标签列表
    pageTags: publicProcedure
        .input(searchParamsSchema)
        .query(async ({ input }) => {
            return await tagService.pageTags(input);
        }),

});

export default tagRouter;