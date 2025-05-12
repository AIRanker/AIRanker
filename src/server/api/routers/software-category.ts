import { softwareCategoryService } from "~/server/services/software-category"
import { createTRPCRouter, publicProcedure } from "../trpc"

export const softwareCategoryRouter = createTRPCRouter({
  all: publicProcedure.query(async () => {
    return await softwareCategoryService.all()
  })
})
