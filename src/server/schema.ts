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
  rootCommentId: z.string().nullable()
})
export const searchParamsSchema = z.object({
  search: z.string().optional(),
  pageable: pageableSchema
})
export const rankSeachParamsSchema = searchParamsSchema.extend({
  tags: z.array(z.string()).optional(),
  sort: z.enum(["likes", "favorites"]).optional().default("likes"),
  order: z.enum(["asc", "desc"]).optional().default("desc")
})




export const createRankParamsSchema = z.object({
  metadataId: z.string(),
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  tags: z.array(z.string()).optional(),
  image: z.string().optional(),
  softwares: z
    .array(
      z.object({
        softwareId: z.string().optional(),
        name: z.string().min(1).max(100).optional(),
        image: z.string().optional(),
        description: z.string().optional(),
        url: z.string().optional(),
        rankDescription: z.string().max(500),
        rankIndex: z.number().min(0)
      })
    )
    .min(5)
    .max(20)
})
export const updateRankParamsSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  tags: z.array(z.string()).optional(),
  image: z.string().optional(),
  softwares: z
    .array(
      z.object({
        softwareId: z.string().optional(),
        name: z.string().min(1).max(100).optional(),
        image: z.string().optional(),
        description: z.string().optional(),
        url: z.string().optional(),
        rankDescription: z.string().max(500),
        rankIndex: z.number().min(0)
      })
    )
    .min(5)
    .max(20)
})

export const createArticleParamsSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  content: z.string(),
  image: z.string().optional(),
  softwares: z.array(z.string()).max(20)
})

export type RankSearchParams = z.infer<typeof rankSeachParamsSchema>
export type Pageable = z.infer<typeof pageableSchema>
export type CreateRankParams = z.infer<typeof createRankParamsSchema>
export type CreateArticleParams = z.infer<typeof createArticleParamsSchema>
export type UpdateRankParams = z.infer<typeof updateRankParamsSchema>
export type SearchParams = z.infer<typeof searchParamsSchema>

export interface PageableData<T> {
  list: T[]
  pages: number
  total: number
}
