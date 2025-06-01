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

export const softwareCommentSchema = z.object({
  id: z.string(),
  softwareId: z.string(),
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
export const softwareSearchParamsSchema = searchParamsSchema.extend({
  tags: z.array(z.string()).optional(),
  sort: z.enum(["likes", "stars"]).optional().default("likes"),
  order: z.enum(["asc", "desc"]).optional().default("desc"),
  isStared: z.boolean().optional().default(false),
  isLiked: z.boolean().optional().default(false),
  categoryIds: z.array(z.string()).optional()
})

export const rankSeachParamsSchema = searchParamsSchema.extend({
  tags: z.array(z.string()).optional(),
  sort: z.enum(["likes", "stars"]).optional().default("likes"),
  order: z.enum(["asc", "desc"]).optional().default("desc"),
  isStared: z.boolean().optional().default(false),
  isLiked: z.boolean().optional().default(false),
  isOwner: z.boolean().optional().default(false)
})

export const softwareParamsSchema = z.object({
  name: z.string().min(1).max(100),
  image: z.string(),
  categoryId: z.string(),
  description: z.string().optional(),
  url: z.string().url(),
  tags: z.array(z.string()).optional()
})

export const createRankParamsSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  tags: z.array(z.string()).optional(),
  image: z.string().optional(),
  softwareList: z
    .array(
      z.object({
        softwareId: z.string().optional(),
        categoryId: z.string().optional(),
        name: z.string().min(1).max(100).optional(),
        image: z.string().optional(),
        description: z.string().optional(),
        url: z.string().optional(),
        tags: z.array(z.string()).optional(),
        rankDescription: z.string().max(500),
        rankIndex: z.number().min(0)
      })
    )
    .min(1)
    .max(20)
})
export const updateRankParamsSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  tags: z.array(z.string()).optional(),
  image: z.string().optional(),
  softwareList: z
    .array(
      z.object({
        softwareId: z.string().optional(),
        categoryId: z.string().optional(),
        name: z.string().min(1).max(100).optional(),
        image: z.string().optional(),
        description: z.string().optional(),
        url: z.string().optional(),
        tags: z.array(z.string()).optional(),
        rankDescription: z.string().max(500),
        rankIndex: z.number().min(0)
      })
    )
    .min(1)
    .max(20)
})

export const createArticleParamsSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  content: z.string(),
  image: z.string().optional(),
  softwareList: z.array(z.string()).max(20)
})

export const updateUserParamsSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  email: z.string().email().optional(),
  github: z.string().optional(),
  instagram: z.string().optional(),
  telegram: z.string().optional(),
  website: z.string().optional(),
  x: z.string().optional(),
  avatar: z.string().optional()
})

export const suggestionSchema = z.object({
  name: z.string().describe("A captivating and trending title for the collection that grabs attention (e.g., '10 Game-Changing AI Tools That Are Revolutionizing Design in 2025')"),
  description: z
    .string()
    .describe("An engaging introduction that hooks readers and highlights the value proposition of this collection - explain why these tools matter and who they're for"),
  softwares: z
    .array(
      z.object({
        name: z.string().describe("The name of the AI software"),
        url: z.string().url().describe("The homepage URL of the AI software"),
        description: z
          .string()
          .describe(
            "A comprehensive description covering: key features, main use cases, target audience, pricing model, unique selling points, and any standout technical capabilities"
          ),
        collectionReason: z
          .string()
          .describe(
            "A persuasive, experience-based reason why this tool deserves to be in the collection - include personal insights, specific advantages, and real-world benefits"
          )
      })
    )
    .describe("A curated and ranked list of AI tools, arranged from most recommended to least recommended based on overall value proposition")
})

export type RankSearchParams = z.infer<typeof rankSeachParamsSchema>
export type Pageable = z.infer<typeof pageableSchema>
export type CreateRankParams = z.infer<typeof createRankParamsSchema>
export type CreateArticleParams = z.infer<typeof createArticleParamsSchema>
export type UpdateRankParams = z.infer<typeof updateRankParamsSchema>
export type SearchParams = z.infer<typeof searchParamsSchema>
export type UpdateUserParams = z.infer<typeof updateUserParamsSchema>
export type SoftwareParams = z.infer<typeof softwareParamsSchema>
export type SoftwareSearchParams = z.infer<typeof softwareSearchParamsSchema>
export type SuggestionResult = z.infer<typeof suggestionSchema>

export interface PageableData<T> {
  list: T[]
  pages: number
  total: number
}
