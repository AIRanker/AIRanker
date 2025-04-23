import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { PlatformSchema } from "~/lib/zod";
import { userService } from "~/server/services/user";

export const userRouter = createTRPCRouter({
  bind: protectedProcedure.input(z.object({ accessToken: z.string(), platform: PlatformSchema })).mutation(({
    input,
    ctx
  }) => {
    const userAddress = ctx.session!.address
    return userService.bind(input.accessToken, input.platform, userAddress)
  }),
  me: protectedProcedure.query(({
    ctx
  }) => {
    const userAddress = ctx.session!.address
    return userService.getUserByAddress(userAddress)
  })
})
