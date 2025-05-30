import { userRouter } from "~/server/api/routers/user"
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc"
import rankRouter from "./routers/rank"
import { articleRouter } from "./routers/article"
import softwareRouter from "./routers/software"
import { rankCommentRouter } from "./routers/rank-comment"
import tagRouter from "./routers/tag"
import softwareCommentRouter from "./routers/software-comment"
import { softwareCategoryRouter } from "./routers/software-category"
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  article: articleRouter,
  rank: rankRouter,
  software: softwareRouter,
  rankComment: rankCommentRouter,
  softwareComment: softwareCommentRouter,
  softwareCategory: softwareCategoryRouter,
  tag: tagRouter
})

// export type definition of API
export type AppRouter = typeof appRouter

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter)
