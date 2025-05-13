import { z } from "zod"
import { PlatformSchema } from "~/lib/zod"
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc"
import { updateUserParamsSchema } from "~/server/schema"
import { userService } from "~/server/services/user"

export const userRouter = createTRPCRouter({
  bind: protectedProcedure.input(z.object({ accessToken: z.string(), platform: PlatformSchema })).mutation(({ input, ctx }) => {
    const userAddress = ctx.userAddress!
    return userService.bind(input.accessToken, input.platform, userAddress)
  }),
  me: protectedProcedure.query(({ ctx }) => {
    const userAddress = ctx.userAddress!
    return userService.getUserByAddress(userAddress)
  }),
  updateMe: protectedProcedure.input(updateUserParamsSchema).mutation(({ input, ctx }) => {
    const userAddress = ctx.userAddress!
    return userService.updateMe(input, userAddress)
  })
})
