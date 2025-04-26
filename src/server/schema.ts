import { z } from "zod"
import type { RankCommentFindFirstArgsSchema } from "~/lib/zod"
export const pageableSchema = z.object({
  page: z.number().optional().default(0),
  size: z.number().optional().default(12)
})
export const rankCommentSchema = z.object({
  id: z.string(),
  rankId: z.string(),
  comment: z.string(),
  createdAt: z.coerce.date(),
  createdBy: z.string(),
  deletedAt: z.coerce.date().nullable(),
  replyToComment: z.string().nullable(),
  replyToUser: z.string().nullable(),
  rootCommentId: z.string().nullable(),
})
export const rankSeachParamsSchema = z.object({
  search: z.string().optional(),
  tags: z.array(z.string()).optional(),
  sort: z.enum(["likes", "favorites"]).optional().default("likes"),
  order: z.enum(["asc", "desc"]).optional().default("desc"),
  pageable: pageableSchema
})

export type RankSearchParams = z.infer<typeof rankSeachParamsSchema>
export type Pageable = z.infer<typeof pageableSchema>



export interface PageableData<T> {
  list: T[]
  pages: number
  total: number
}