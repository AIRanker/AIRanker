import { z } from "zod"
import { PlatformSchema } from "~/lib/zod"
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc"
import { userService } from "~/server/services/user"

export const userRouter = createTRPCRouter({
  bind: protectedProcedure.input(z.object({ accessToken: z.string(), platform: PlatformSchema })).mutation(({ input, ctx }) => {

    return userService.bind(input.accessToken, input.platform, ctx.userId!)
  }),
  me: protectedProcedure.query(({ ctx }) => {

    return userService.getUserById(ctx.userId!)
  }),
  topContributors: publicProcedure.query(() => {
    return userService.topContributors()
  })
})
