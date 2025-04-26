import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserPlatformScalarFieldEnumSchema = z.enum(['id','platform','platformId','platformName','platformAvatar','userAddress']);

export const ApiKeyScalarFieldEnumSchema = z.enum(['key','name','userAddress','createdAt','expiredAt']);

export const UserScalarFieldEnumSchema = z.enum(['address','name','email','referralCode','createdAt','updatedAt','invitedBy']);

export const TagScalarFieldEnumSchema = z.enum(['id','name','createdAt','updatedAt']);

export const RankScalarFieldEnumSchema = z.enum(['id','userAddress','name','description','createdAt','updatedAt']);

export const RankTagScalarFieldEnumSchema = z.enum(['tagId','rankId','createdAt','updatedAt']);

export const SoftwareScalarFieldEnumSchema = z.enum(['id','image','name','description','url','createdAt','updatedAt']);

export const SoftwareTagScalarFieldEnumSchema = z.enum(['tagId','softwareId','createdAt','updatedAt']);

export const SoftwareOnRankScalarFieldEnumSchema = z.enum(['softwareId','description','rankId','rankIndex','createdAt','updatedAt']);

export const SoftwareOnArticleScalarFieldEnumSchema = z.enum(['softwareId','articleId','createdAt','updatedAt']);

export const ArticleScalarFieldEnumSchema = z.enum(['id','title','description','image','content','rankId','createdAt','updatedAt','userAddress']);

export const RankLikeScalarFieldEnumSchema = z.enum(['rankId','userAddress','createdAt']);

export const RankFavoriteScalarFieldEnumSchema = z.enum(['rankId','userAddress','createdAt']);

export const SoftwareLikeScalarFieldEnumSchema = z.enum(['softwareId','userAddress','createdAt']);

export const SoftwareFavoriteScalarFieldEnumSchema = z.enum(['softwareId','userAddress','createdAt']);

export const RankCommentScalarFieldEnumSchema = z.enum(['id','rankId','content','createdAt','userAddress','deletedAt','replyToComment','replyToUser','rootCommentId']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const PlatformSchema = z.enum(['GITHUB','GITLAB','X']);

export type PlatformType = `${z.infer<typeof PlatformSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER PLATFORM SCHEMA
/////////////////////////////////////////

export const UserPlatformSchema = z.object({
  platform: PlatformSchema,
  id: z.string(),
  platformId: z.string(),
  platformName: z.string(),
  platformAvatar: z.string(),
  userAddress: z.string(),
})

export type UserPlatform = z.infer<typeof UserPlatformSchema>

/////////////////////////////////////////
// API KEY SCHEMA
/////////////////////////////////////////

export const ApiKeySchema = z.object({
  key: z.string(),
  name: z.string(),
  userAddress: z.string().nullable(),
  createdAt: z.coerce.date(),
  expiredAt: z.coerce.date().nullable(),
})

export type ApiKey = z.infer<typeof ApiKeySchema>

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  address: z.string(),
  name: z.string().nullable(),
  email: z.string().nullable(),
  referralCode: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  invitedBy: z.string().array(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// TAG SCHEMA
/////////////////////////////////////////

export const TagSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Tag = z.infer<typeof TagSchema>

/////////////////////////////////////////
// RANK SCHEMA
/////////////////////////////////////////

export const RankSchema = z.object({
  id: z.string(),
  userAddress: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Rank = z.infer<typeof RankSchema>

/////////////////////////////////////////
// RANK TAG SCHEMA
/////////////////////////////////////////

export const RankTagSchema = z.object({
  tagId: z.string(),
  rankId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type RankTag = z.infer<typeof RankTagSchema>

/////////////////////////////////////////
// SOFTWARE SCHEMA
/////////////////////////////////////////

export const SoftwareSchema = z.object({
  id: z.string(),
  image: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  url: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Software = z.infer<typeof SoftwareSchema>

/////////////////////////////////////////
// SOFTWARE TAG SCHEMA
/////////////////////////////////////////

export const SoftwareTagSchema = z.object({
  tagId: z.string(),
  softwareId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type SoftwareTag = z.infer<typeof SoftwareTagSchema>

/////////////////////////////////////////
// SOFTWARE ON RANK SCHEMA
/////////////////////////////////////////

export const SoftwareOnRankSchema = z.object({
  softwareId: z.string(),
  description: z.string(),
  rankId: z.string(),
  rankIndex: z.number().int(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type SoftwareOnRank = z.infer<typeof SoftwareOnRankSchema>

/////////////////////////////////////////
// SOFTWARE ON ARTICLE SCHEMA
/////////////////////////////////////////

export const SoftwareOnArticleSchema = z.object({
  softwareId: z.string(),
  articleId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type SoftwareOnArticle = z.infer<typeof SoftwareOnArticleSchema>

/////////////////////////////////////////
// ARTICLE SCHEMA
/////////////////////////////////////////

export const ArticleSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  image: z.string(),
  content: z.string(),
  rankId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  userAddress: z.string(),
})

export type Article = z.infer<typeof ArticleSchema>

/////////////////////////////////////////
// RANK LIKE SCHEMA
/////////////////////////////////////////

export const RankLikeSchema = z.object({
  rankId: z.string(),
  userAddress: z.string(),
  createdAt: z.coerce.date(),
})

export type RankLike = z.infer<typeof RankLikeSchema>

/////////////////////////////////////////
// RANK FAVORITE SCHEMA
/////////////////////////////////////////

export const RankFavoriteSchema = z.object({
  rankId: z.string(),
  userAddress: z.string(),
  createdAt: z.coerce.date(),
})

export type RankFavorite = z.infer<typeof RankFavoriteSchema>

/////////////////////////////////////////
// SOFTWARE LIKE SCHEMA
/////////////////////////////////////////

export const SoftwareLikeSchema = z.object({
  softwareId: z.string(),
  userAddress: z.string(),
  createdAt: z.coerce.date(),
})

export type SoftwareLike = z.infer<typeof SoftwareLikeSchema>

/////////////////////////////////////////
// SOFTWARE FAVORITE SCHEMA
/////////////////////////////////////////

export const SoftwareFavoriteSchema = z.object({
  softwareId: z.string(),
  userAddress: z.string(),
  createdAt: z.coerce.date(),
})

export type SoftwareFavorite = z.infer<typeof SoftwareFavoriteSchema>

/////////////////////////////////////////
// RANK COMMENT SCHEMA
/////////////////////////////////////////

export const RankCommentSchema = z.object({
  id: z.string(),
  rankId: z.string(),
  content: z.string(),
  createdAt: z.coerce.date(),
  userAddress: z.string(),
  deletedAt: z.coerce.date().nullable(),
  replyToComment: z.string().nullable(),
  replyToUser: z.string().nullable(),
  rootCommentId: z.string().nullable(),
})

export type RankComment = z.infer<typeof RankCommentSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER PLATFORM
//------------------------------------------------------

export const UserPlatformIncludeSchema: z.ZodType<Prisma.UserPlatformInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const UserPlatformArgsSchema: z.ZodType<Prisma.UserPlatformDefaultArgs> = z.object({
  select: z.lazy(() => UserPlatformSelectSchema).optional(),
  include: z.lazy(() => UserPlatformIncludeSchema).optional(),
}).strict();

export const UserPlatformSelectSchema: z.ZodType<Prisma.UserPlatformSelect> = z.object({
  id: z.boolean().optional(),
  platform: z.boolean().optional(),
  platformId: z.boolean().optional(),
  platformName: z.boolean().optional(),
  platformAvatar: z.boolean().optional(),
  userAddress: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// API KEY
//------------------------------------------------------

export const ApiKeySelectSchema: z.ZodType<Prisma.ApiKeySelect> = z.object({
  key: z.boolean().optional(),
  name: z.boolean().optional(),
  userAddress: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  expiredAt: z.boolean().optional(),
}).strict()

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  ranks: z.union([z.boolean(),z.lazy(() => RankFindManyArgsSchema)]).optional(),
  platforms: z.union([z.boolean(),z.lazy(() => UserPlatformFindManyArgsSchema)]).optional(),
  articles: z.union([z.boolean(),z.lazy(() => ArticleFindManyArgsSchema)]).optional(),
  rankLikes: z.union([z.boolean(),z.lazy(() => RankLikeFindManyArgsSchema)]).optional(),
  rankFavorites: z.union([z.boolean(),z.lazy(() => RankFavoriteFindManyArgsSchema)]).optional(),
  softwareLikes: z.union([z.boolean(),z.lazy(() => SoftwareLikeFindManyArgsSchema)]).optional(),
  softwareFavorites: z.union([z.boolean(),z.lazy(() => SoftwareFavoriteFindManyArgsSchema)]).optional(),
  rankComments: z.union([z.boolean(),z.lazy(() => RankCommentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  ranks: z.boolean().optional(),
  platforms: z.boolean().optional(),
  articles: z.boolean().optional(),
  rankLikes: z.boolean().optional(),
  rankFavorites: z.boolean().optional(),
  softwareLikes: z.boolean().optional(),
  softwareFavorites: z.boolean().optional(),
  rankComments: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  address: z.boolean().optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  referralCode: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  invitedBy: z.boolean().optional(),
  ranks: z.union([z.boolean(),z.lazy(() => RankFindManyArgsSchema)]).optional(),
  platforms: z.union([z.boolean(),z.lazy(() => UserPlatformFindManyArgsSchema)]).optional(),
  articles: z.union([z.boolean(),z.lazy(() => ArticleFindManyArgsSchema)]).optional(),
  rankLikes: z.union([z.boolean(),z.lazy(() => RankLikeFindManyArgsSchema)]).optional(),
  rankFavorites: z.union([z.boolean(),z.lazy(() => RankFavoriteFindManyArgsSchema)]).optional(),
  softwareLikes: z.union([z.boolean(),z.lazy(() => SoftwareLikeFindManyArgsSchema)]).optional(),
  softwareFavorites: z.union([z.boolean(),z.lazy(() => SoftwareFavoriteFindManyArgsSchema)]).optional(),
  rankComments: z.union([z.boolean(),z.lazy(() => RankCommentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// TAG
//------------------------------------------------------

export const TagIncludeSchema: z.ZodType<Prisma.TagInclude> = z.object({
  ranks: z.union([z.boolean(),z.lazy(() => RankTagFindManyArgsSchema)]).optional(),
  softwares: z.union([z.boolean(),z.lazy(() => SoftwareTagFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TagCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const TagArgsSchema: z.ZodType<Prisma.TagDefaultArgs> = z.object({
  select: z.lazy(() => TagSelectSchema).optional(),
  include: z.lazy(() => TagIncludeSchema).optional(),
}).strict();

export const TagCountOutputTypeArgsSchema: z.ZodType<Prisma.TagCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => TagCountOutputTypeSelectSchema).nullish(),
}).strict();

export const TagCountOutputTypeSelectSchema: z.ZodType<Prisma.TagCountOutputTypeSelect> = z.object({
  ranks: z.boolean().optional(),
  softwares: z.boolean().optional(),
}).strict();

export const TagSelectSchema: z.ZodType<Prisma.TagSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  ranks: z.union([z.boolean(),z.lazy(() => RankTagFindManyArgsSchema)]).optional(),
  softwares: z.union([z.boolean(),z.lazy(() => SoftwareTagFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TagCountOutputTypeArgsSchema)]).optional(),
}).strict()

// RANK
//------------------------------------------------------

export const RankIncludeSchema: z.ZodType<Prisma.RankInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  tags: z.union([z.boolean(),z.lazy(() => RankTagFindManyArgsSchema)]).optional(),
  softwares: z.union([z.boolean(),z.lazy(() => SoftwareOnRankFindManyArgsSchema)]).optional(),
  articles: z.union([z.boolean(),z.lazy(() => ArticleFindManyArgsSchema)]).optional(),
  likes: z.union([z.boolean(),z.lazy(() => RankLikeFindManyArgsSchema)]).optional(),
  favorites: z.union([z.boolean(),z.lazy(() => RankFavoriteFindManyArgsSchema)]).optional(),
  comments: z.union([z.boolean(),z.lazy(() => RankCommentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RankCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const RankArgsSchema: z.ZodType<Prisma.RankDefaultArgs> = z.object({
  select: z.lazy(() => RankSelectSchema).optional(),
  include: z.lazy(() => RankIncludeSchema).optional(),
}).strict();

export const RankCountOutputTypeArgsSchema: z.ZodType<Prisma.RankCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => RankCountOutputTypeSelectSchema).nullish(),
}).strict();

export const RankCountOutputTypeSelectSchema: z.ZodType<Prisma.RankCountOutputTypeSelect> = z.object({
  tags: z.boolean().optional(),
  softwares: z.boolean().optional(),
  articles: z.boolean().optional(),
  likes: z.boolean().optional(),
  favorites: z.boolean().optional(),
  comments: z.boolean().optional(),
}).strict();

export const RankSelectSchema: z.ZodType<Prisma.RankSelect> = z.object({
  id: z.boolean().optional(),
  userAddress: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  tags: z.union([z.boolean(),z.lazy(() => RankTagFindManyArgsSchema)]).optional(),
  softwares: z.union([z.boolean(),z.lazy(() => SoftwareOnRankFindManyArgsSchema)]).optional(),
  articles: z.union([z.boolean(),z.lazy(() => ArticleFindManyArgsSchema)]).optional(),
  likes: z.union([z.boolean(),z.lazy(() => RankLikeFindManyArgsSchema)]).optional(),
  favorites: z.union([z.boolean(),z.lazy(() => RankFavoriteFindManyArgsSchema)]).optional(),
  comments: z.union([z.boolean(),z.lazy(() => RankCommentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RankCountOutputTypeArgsSchema)]).optional(),
}).strict()

// RANK TAG
//------------------------------------------------------

export const RankTagIncludeSchema: z.ZodType<Prisma.RankTagInclude> = z.object({
  tag: z.union([z.boolean(),z.lazy(() => TagArgsSchema)]).optional(),
  rank: z.union([z.boolean(),z.lazy(() => RankArgsSchema)]).optional(),
}).strict()

export const RankTagArgsSchema: z.ZodType<Prisma.RankTagDefaultArgs> = z.object({
  select: z.lazy(() => RankTagSelectSchema).optional(),
  include: z.lazy(() => RankTagIncludeSchema).optional(),
}).strict();

export const RankTagSelectSchema: z.ZodType<Prisma.RankTagSelect> = z.object({
  tagId: z.boolean().optional(),
  rankId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  tag: z.union([z.boolean(),z.lazy(() => TagArgsSchema)]).optional(),
  rank: z.union([z.boolean(),z.lazy(() => RankArgsSchema)]).optional(),
}).strict()

// SOFTWARE
//------------------------------------------------------

export const SoftwareIncludeSchema: z.ZodType<Prisma.SoftwareInclude> = z.object({
  tags: z.union([z.boolean(),z.lazy(() => SoftwareTagFindManyArgsSchema)]).optional(),
  ranks: z.union([z.boolean(),z.lazy(() => SoftwareOnRankFindManyArgsSchema)]).optional(),
  likes: z.union([z.boolean(),z.lazy(() => SoftwareLikeFindManyArgsSchema)]).optional(),
  favorites: z.union([z.boolean(),z.lazy(() => SoftwareFavoriteFindManyArgsSchema)]).optional(),
  articles: z.union([z.boolean(),z.lazy(() => SoftwareOnArticleFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => SoftwareCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const SoftwareArgsSchema: z.ZodType<Prisma.SoftwareDefaultArgs> = z.object({
  select: z.lazy(() => SoftwareSelectSchema).optional(),
  include: z.lazy(() => SoftwareIncludeSchema).optional(),
}).strict();

export const SoftwareCountOutputTypeArgsSchema: z.ZodType<Prisma.SoftwareCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => SoftwareCountOutputTypeSelectSchema).nullish(),
}).strict();

export const SoftwareCountOutputTypeSelectSchema: z.ZodType<Prisma.SoftwareCountOutputTypeSelect> = z.object({
  tags: z.boolean().optional(),
  ranks: z.boolean().optional(),
  likes: z.boolean().optional(),
  favorites: z.boolean().optional(),
  articles: z.boolean().optional(),
}).strict();

export const SoftwareSelectSchema: z.ZodType<Prisma.SoftwareSelect> = z.object({
  id: z.boolean().optional(),
  image: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  url: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  tags: z.union([z.boolean(),z.lazy(() => SoftwareTagFindManyArgsSchema)]).optional(),
  ranks: z.union([z.boolean(),z.lazy(() => SoftwareOnRankFindManyArgsSchema)]).optional(),
  likes: z.union([z.boolean(),z.lazy(() => SoftwareLikeFindManyArgsSchema)]).optional(),
  favorites: z.union([z.boolean(),z.lazy(() => SoftwareFavoriteFindManyArgsSchema)]).optional(),
  articles: z.union([z.boolean(),z.lazy(() => SoftwareOnArticleFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => SoftwareCountOutputTypeArgsSchema)]).optional(),
}).strict()

// SOFTWARE TAG
//------------------------------------------------------

export const SoftwareTagIncludeSchema: z.ZodType<Prisma.SoftwareTagInclude> = z.object({
  tag: z.union([z.boolean(),z.lazy(() => TagArgsSchema)]).optional(),
  software: z.union([z.boolean(),z.lazy(() => SoftwareArgsSchema)]).optional(),
}).strict()

export const SoftwareTagArgsSchema: z.ZodType<Prisma.SoftwareTagDefaultArgs> = z.object({
  select: z.lazy(() => SoftwareTagSelectSchema).optional(),
  include: z.lazy(() => SoftwareTagIncludeSchema).optional(),
}).strict();

export const SoftwareTagSelectSchema: z.ZodType<Prisma.SoftwareTagSelect> = z.object({
  tagId: z.boolean().optional(),
  softwareId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  tag: z.union([z.boolean(),z.lazy(() => TagArgsSchema)]).optional(),
  software: z.union([z.boolean(),z.lazy(() => SoftwareArgsSchema)]).optional(),
}).strict()

// SOFTWARE ON RANK
//------------------------------------------------------

export const SoftwareOnRankIncludeSchema: z.ZodType<Prisma.SoftwareOnRankInclude> = z.object({
  software: z.union([z.boolean(),z.lazy(() => SoftwareArgsSchema)]).optional(),
  rank: z.union([z.boolean(),z.lazy(() => RankArgsSchema)]).optional(),
}).strict()

export const SoftwareOnRankArgsSchema: z.ZodType<Prisma.SoftwareOnRankDefaultArgs> = z.object({
  select: z.lazy(() => SoftwareOnRankSelectSchema).optional(),
  include: z.lazy(() => SoftwareOnRankIncludeSchema).optional(),
}).strict();

export const SoftwareOnRankSelectSchema: z.ZodType<Prisma.SoftwareOnRankSelect> = z.object({
  softwareId: z.boolean().optional(),
  description: z.boolean().optional(),
  rankId: z.boolean().optional(),
  rankIndex: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  software: z.union([z.boolean(),z.lazy(() => SoftwareArgsSchema)]).optional(),
  rank: z.union([z.boolean(),z.lazy(() => RankArgsSchema)]).optional(),
}).strict()

// SOFTWARE ON ARTICLE
//------------------------------------------------------

export const SoftwareOnArticleIncludeSchema: z.ZodType<Prisma.SoftwareOnArticleInclude> = z.object({
  software: z.union([z.boolean(),z.lazy(() => SoftwareArgsSchema)]).optional(),
  article: z.union([z.boolean(),z.lazy(() => ArticleArgsSchema)]).optional(),
}).strict()

export const SoftwareOnArticleArgsSchema: z.ZodType<Prisma.SoftwareOnArticleDefaultArgs> = z.object({
  select: z.lazy(() => SoftwareOnArticleSelectSchema).optional(),
  include: z.lazy(() => SoftwareOnArticleIncludeSchema).optional(),
}).strict();

export const SoftwareOnArticleSelectSchema: z.ZodType<Prisma.SoftwareOnArticleSelect> = z.object({
  softwareId: z.boolean().optional(),
  articleId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  software: z.union([z.boolean(),z.lazy(() => SoftwareArgsSchema)]).optional(),
  article: z.union([z.boolean(),z.lazy(() => ArticleArgsSchema)]).optional(),
}).strict()

// ARTICLE
//------------------------------------------------------

export const ArticleIncludeSchema: z.ZodType<Prisma.ArticleInclude> = z.object({
  rank: z.union([z.boolean(),z.lazy(() => RankArgsSchema)]).optional(),
  author: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  softwares: z.union([z.boolean(),z.lazy(() => SoftwareOnArticleFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ArticleCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ArticleArgsSchema: z.ZodType<Prisma.ArticleDefaultArgs> = z.object({
  select: z.lazy(() => ArticleSelectSchema).optional(),
  include: z.lazy(() => ArticleIncludeSchema).optional(),
}).strict();

export const ArticleCountOutputTypeArgsSchema: z.ZodType<Prisma.ArticleCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ArticleCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ArticleCountOutputTypeSelectSchema: z.ZodType<Prisma.ArticleCountOutputTypeSelect> = z.object({
  softwares: z.boolean().optional(),
}).strict();

export const ArticleSelectSchema: z.ZodType<Prisma.ArticleSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  description: z.boolean().optional(),
  image: z.boolean().optional(),
  content: z.boolean().optional(),
  rankId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  userAddress: z.boolean().optional(),
  rank: z.union([z.boolean(),z.lazy(() => RankArgsSchema)]).optional(),
  author: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  softwares: z.union([z.boolean(),z.lazy(() => SoftwareOnArticleFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ArticleCountOutputTypeArgsSchema)]).optional(),
}).strict()

// RANK LIKE
//------------------------------------------------------

export const RankLikeIncludeSchema: z.ZodType<Prisma.RankLikeInclude> = z.object({
  rank: z.union([z.boolean(),z.lazy(() => RankArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const RankLikeArgsSchema: z.ZodType<Prisma.RankLikeDefaultArgs> = z.object({
  select: z.lazy(() => RankLikeSelectSchema).optional(),
  include: z.lazy(() => RankLikeIncludeSchema).optional(),
}).strict();

export const RankLikeSelectSchema: z.ZodType<Prisma.RankLikeSelect> = z.object({
  rankId: z.boolean().optional(),
  userAddress: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  rank: z.union([z.boolean(),z.lazy(() => RankArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// RANK FAVORITE
//------------------------------------------------------

export const RankFavoriteIncludeSchema: z.ZodType<Prisma.RankFavoriteInclude> = z.object({
  rank: z.union([z.boolean(),z.lazy(() => RankArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const RankFavoriteArgsSchema: z.ZodType<Prisma.RankFavoriteDefaultArgs> = z.object({
  select: z.lazy(() => RankFavoriteSelectSchema).optional(),
  include: z.lazy(() => RankFavoriteIncludeSchema).optional(),
}).strict();

export const RankFavoriteSelectSchema: z.ZodType<Prisma.RankFavoriteSelect> = z.object({
  rankId: z.boolean().optional(),
  userAddress: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  rank: z.union([z.boolean(),z.lazy(() => RankArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// SOFTWARE LIKE
//------------------------------------------------------

export const SoftwareLikeIncludeSchema: z.ZodType<Prisma.SoftwareLikeInclude> = z.object({
  software: z.union([z.boolean(),z.lazy(() => SoftwareArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const SoftwareLikeArgsSchema: z.ZodType<Prisma.SoftwareLikeDefaultArgs> = z.object({
  select: z.lazy(() => SoftwareLikeSelectSchema).optional(),
  include: z.lazy(() => SoftwareLikeIncludeSchema).optional(),
}).strict();

export const SoftwareLikeSelectSchema: z.ZodType<Prisma.SoftwareLikeSelect> = z.object({
  softwareId: z.boolean().optional(),
  userAddress: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  software: z.union([z.boolean(),z.lazy(() => SoftwareArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// SOFTWARE FAVORITE
//------------------------------------------------------

export const SoftwareFavoriteIncludeSchema: z.ZodType<Prisma.SoftwareFavoriteInclude> = z.object({
  software: z.union([z.boolean(),z.lazy(() => SoftwareArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const SoftwareFavoriteArgsSchema: z.ZodType<Prisma.SoftwareFavoriteDefaultArgs> = z.object({
  select: z.lazy(() => SoftwareFavoriteSelectSchema).optional(),
  include: z.lazy(() => SoftwareFavoriteIncludeSchema).optional(),
}).strict();

export const SoftwareFavoriteSelectSchema: z.ZodType<Prisma.SoftwareFavoriteSelect> = z.object({
  softwareId: z.boolean().optional(),
  userAddress: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  software: z.union([z.boolean(),z.lazy(() => SoftwareArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// RANK COMMENT
//------------------------------------------------------

export const RankCommentIncludeSchema: z.ZodType<Prisma.RankCommentInclude> = z.object({
  rank: z.union([z.boolean(),z.lazy(() => RankArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const RankCommentArgsSchema: z.ZodType<Prisma.RankCommentDefaultArgs> = z.object({
  select: z.lazy(() => RankCommentSelectSchema).optional(),
  include: z.lazy(() => RankCommentIncludeSchema).optional(),
}).strict();

export const RankCommentSelectSchema: z.ZodType<Prisma.RankCommentSelect> = z.object({
  id: z.boolean().optional(),
  rankId: z.boolean().optional(),
  content: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  userAddress: z.boolean().optional(),
  deletedAt: z.boolean().optional(),
  replyToComment: z.boolean().optional(),
  replyToUser: z.boolean().optional(),
  rootCommentId: z.boolean().optional(),
  rank: z.union([z.boolean(),z.lazy(() => RankArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserPlatformWhereInputSchema: z.ZodType<Prisma.UserPlatformWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserPlatformWhereInputSchema),z.lazy(() => UserPlatformWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserPlatformWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserPlatformWhereInputSchema),z.lazy(() => UserPlatformWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  platform: z.union([ z.lazy(() => EnumPlatformFilterSchema),z.lazy(() => PlatformSchema) ]).optional(),
  platformId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  platformName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  platformAvatar: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userAddress: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const UserPlatformOrderByWithRelationInputSchema: z.ZodType<Prisma.UserPlatformOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  platform: z.lazy(() => SortOrderSchema).optional(),
  platformId: z.lazy(() => SortOrderSchema).optional(),
  platformName: z.lazy(() => SortOrderSchema).optional(),
  platformAvatar: z.lazy(() => SortOrderSchema).optional(),
  userAddress: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const UserPlatformWhereUniqueInputSchema: z.ZodType<Prisma.UserPlatformWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    userAddress_platform: z.lazy(() => UserPlatformUserAddressPlatformCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    userAddress_platform: z.lazy(() => UserPlatformUserAddressPlatformCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().optional(),
  userAddress_platform: z.lazy(() => UserPlatformUserAddressPlatformCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => UserPlatformWhereInputSchema),z.lazy(() => UserPlatformWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserPlatformWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserPlatformWhereInputSchema),z.lazy(() => UserPlatformWhereInputSchema).array() ]).optional(),
  platform: z.union([ z.lazy(() => EnumPlatformFilterSchema),z.lazy(() => PlatformSchema) ]).optional(),
  platformId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  platformName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  platformAvatar: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userAddress: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const UserPlatformOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserPlatformOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  platform: z.lazy(() => SortOrderSchema).optional(),
  platformId: z.lazy(() => SortOrderSchema).optional(),
  platformName: z.lazy(() => SortOrderSchema).optional(),
  platformAvatar: z.lazy(() => SortOrderSchema).optional(),
  userAddress: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserPlatformCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserPlatformMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserPlatformMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserPlatformScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserPlatformScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserPlatformScalarWhereWithAggregatesInputSchema),z.lazy(() => UserPlatformScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserPlatformScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserPlatformScalarWhereWithAggregatesInputSchema),z.lazy(() => UserPlatformScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  platform: z.union([ z.lazy(() => EnumPlatformWithAggregatesFilterSchema),z.lazy(() => PlatformSchema) ]).optional(),
  platformId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  platformName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  platformAvatar: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userAddress: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const ApiKeyWhereInputSchema: z.ZodType<Prisma.ApiKeyWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ApiKeyWhereInputSchema),z.lazy(() => ApiKeyWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ApiKeyWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ApiKeyWhereInputSchema),z.lazy(() => ApiKeyWhereInputSchema).array() ]).optional(),
  key: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userAddress: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  expiredAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const ApiKeyOrderByWithRelationInputSchema: z.ZodType<Prisma.ApiKeyOrderByWithRelationInput> = z.object({
  key: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  userAddress: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  expiredAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
}).strict();

export const ApiKeyWhereUniqueInputSchema: z.ZodType<Prisma.ApiKeyWhereUniqueInput> = z.union([
  z.object({
    key: z.string(),
    name_userAddress: z.lazy(() => ApiKeyNameUserAddressCompoundUniqueInputSchema)
  }),
  z.object({
    key: z.string(),
  }),
  z.object({
    name_userAddress: z.lazy(() => ApiKeyNameUserAddressCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  key: z.string().optional(),
  name_userAddress: z.lazy(() => ApiKeyNameUserAddressCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => ApiKeyWhereInputSchema),z.lazy(() => ApiKeyWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ApiKeyWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ApiKeyWhereInputSchema),z.lazy(() => ApiKeyWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userAddress: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  expiredAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict());

export const ApiKeyOrderByWithAggregationInputSchema: z.ZodType<Prisma.ApiKeyOrderByWithAggregationInput> = z.object({
  key: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  userAddress: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  expiredAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => ApiKeyCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ApiKeyMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ApiKeyMinOrderByAggregateInputSchema).optional()
}).strict();

export const ApiKeyScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ApiKeyScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ApiKeyScalarWhereWithAggregatesInputSchema),z.lazy(() => ApiKeyScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ApiKeyScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ApiKeyScalarWhereWithAggregatesInputSchema),z.lazy(() => ApiKeyScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  key: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userAddress: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  expiredAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  address: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  referralCode: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  invitedBy: z.lazy(() => StringNullableListFilterSchema).optional(),
  ranks: z.lazy(() => RankListRelationFilterSchema).optional(),
  platforms: z.lazy(() => UserPlatformListRelationFilterSchema).optional(),
  articles: z.lazy(() => ArticleListRelationFilterSchema).optional(),
  rankLikes: z.lazy(() => RankLikeListRelationFilterSchema).optional(),
  rankFavorites: z.lazy(() => RankFavoriteListRelationFilterSchema).optional(),
  softwareLikes: z.lazy(() => SoftwareLikeListRelationFilterSchema).optional(),
  softwareFavorites: z.lazy(() => SoftwareFavoriteListRelationFilterSchema).optional(),
  rankComments: z.lazy(() => RankCommentListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  address: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  referralCode: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  invitedBy: z.lazy(() => SortOrderSchema).optional(),
  ranks: z.lazy(() => RankOrderByRelationAggregateInputSchema).optional(),
  platforms: z.lazy(() => UserPlatformOrderByRelationAggregateInputSchema).optional(),
  articles: z.lazy(() => ArticleOrderByRelationAggregateInputSchema).optional(),
  rankLikes: z.lazy(() => RankLikeOrderByRelationAggregateInputSchema).optional(),
  rankFavorites: z.lazy(() => RankFavoriteOrderByRelationAggregateInputSchema).optional(),
  softwareLikes: z.lazy(() => SoftwareLikeOrderByRelationAggregateInputSchema).optional(),
  softwareFavorites: z.lazy(() => SoftwareFavoriteOrderByRelationAggregateInputSchema).optional(),
  rankComments: z.lazy(() => RankCommentOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    address: z.string(),
    email: z.string(),
    referralCode: z.string()
  }),
  z.object({
    address: z.string(),
    email: z.string(),
  }),
  z.object({
    address: z.string(),
    referralCode: z.string(),
  }),
  z.object({
    address: z.string(),
  }),
  z.object({
    email: z.string(),
    referralCode: z.string(),
  }),
  z.object({
    email: z.string(),
  }),
  z.object({
    referralCode: z.string(),
  }),
])
.and(z.object({
  address: z.string().optional(),
  email: z.string().optional(),
  referralCode: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  invitedBy: z.lazy(() => StringNullableListFilterSchema).optional(),
  ranks: z.lazy(() => RankListRelationFilterSchema).optional(),
  platforms: z.lazy(() => UserPlatformListRelationFilterSchema).optional(),
  articles: z.lazy(() => ArticleListRelationFilterSchema).optional(),
  rankLikes: z.lazy(() => RankLikeListRelationFilterSchema).optional(),
  rankFavorites: z.lazy(() => RankFavoriteListRelationFilterSchema).optional(),
  softwareLikes: z.lazy(() => SoftwareLikeListRelationFilterSchema).optional(),
  softwareFavorites: z.lazy(() => SoftwareFavoriteListRelationFilterSchema).optional(),
  rankComments: z.lazy(() => RankCommentListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  address: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  referralCode: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  invitedBy: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  address: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  referralCode: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  invitedBy: z.lazy(() => StringNullableListFilterSchema).optional()
}).strict();

export const TagWhereInputSchema: z.ZodType<Prisma.TagWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TagWhereInputSchema),z.lazy(() => TagWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TagWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TagWhereInputSchema),z.lazy(() => TagWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  ranks: z.lazy(() => RankTagListRelationFilterSchema).optional(),
  softwares: z.lazy(() => SoftwareTagListRelationFilterSchema).optional()
}).strict();

export const TagOrderByWithRelationInputSchema: z.ZodType<Prisma.TagOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  ranks: z.lazy(() => RankTagOrderByRelationAggregateInputSchema).optional(),
  softwares: z.lazy(() => SoftwareTagOrderByRelationAggregateInputSchema).optional()
}).strict();

export const TagWhereUniqueInputSchema: z.ZodType<Prisma.TagWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => TagWhereInputSchema),z.lazy(() => TagWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TagWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TagWhereInputSchema),z.lazy(() => TagWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  ranks: z.lazy(() => RankTagListRelationFilterSchema).optional(),
  softwares: z.lazy(() => SoftwareTagListRelationFilterSchema).optional()
}).strict());

export const TagOrderByWithAggregationInputSchema: z.ZodType<Prisma.TagOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TagCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TagMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TagMinOrderByAggregateInputSchema).optional()
}).strict();

export const TagScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TagScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TagScalarWhereWithAggregatesInputSchema),z.lazy(() => TagScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TagScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TagScalarWhereWithAggregatesInputSchema),z.lazy(() => TagScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const RankWhereInputSchema: z.ZodType<Prisma.RankWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RankWhereInputSchema),z.lazy(() => RankWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RankWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RankWhereInputSchema),z.lazy(() => RankWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userAddress: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  tags: z.lazy(() => RankTagListRelationFilterSchema).optional(),
  softwares: z.lazy(() => SoftwareOnRankListRelationFilterSchema).optional(),
  articles: z.lazy(() => ArticleListRelationFilterSchema).optional(),
  likes: z.lazy(() => RankLikeListRelationFilterSchema).optional(),
  favorites: z.lazy(() => RankFavoriteListRelationFilterSchema).optional(),
  comments: z.lazy(() => RankCommentListRelationFilterSchema).optional()
}).strict();

export const RankOrderByWithRelationInputSchema: z.ZodType<Prisma.RankOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userAddress: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  tags: z.lazy(() => RankTagOrderByRelationAggregateInputSchema).optional(),
  softwares: z.lazy(() => SoftwareOnRankOrderByRelationAggregateInputSchema).optional(),
  articles: z.lazy(() => ArticleOrderByRelationAggregateInputSchema).optional(),
  likes: z.lazy(() => RankLikeOrderByRelationAggregateInputSchema).optional(),
  favorites: z.lazy(() => RankFavoriteOrderByRelationAggregateInputSchema).optional(),
  comments: z.lazy(() => RankCommentOrderByRelationAggregateInputSchema).optional()
}).strict();

export const RankWhereUniqueInputSchema: z.ZodType<Prisma.RankWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => RankWhereInputSchema),z.lazy(() => RankWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RankWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RankWhereInputSchema),z.lazy(() => RankWhereInputSchema).array() ]).optional(),
  userAddress: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  tags: z.lazy(() => RankTagListRelationFilterSchema).optional(),
  softwares: z.lazy(() => SoftwareOnRankListRelationFilterSchema).optional(),
  articles: z.lazy(() => ArticleListRelationFilterSchema).optional(),
  likes: z.lazy(() => RankLikeListRelationFilterSchema).optional(),
  favorites: z.lazy(() => RankFavoriteListRelationFilterSchema).optional(),
  comments: z.lazy(() => RankCommentListRelationFilterSchema).optional()
}).strict());

export const RankOrderByWithAggregationInputSchema: z.ZodType<Prisma.RankOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userAddress: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => RankCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RankMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RankMinOrderByAggregateInputSchema).optional()
}).strict();

export const RankScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RankScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RankScalarWhereWithAggregatesInputSchema),z.lazy(() => RankScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RankScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RankScalarWhereWithAggregatesInputSchema),z.lazy(() => RankScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userAddress: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const RankTagWhereInputSchema: z.ZodType<Prisma.RankTagWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RankTagWhereInputSchema),z.lazy(() => RankTagWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RankTagWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RankTagWhereInputSchema),z.lazy(() => RankTagWhereInputSchema).array() ]).optional(),
  tagId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  rankId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  tag: z.union([ z.lazy(() => TagScalarRelationFilterSchema),z.lazy(() => TagWhereInputSchema) ]).optional(),
  rank: z.union([ z.lazy(() => RankScalarRelationFilterSchema),z.lazy(() => RankWhereInputSchema) ]).optional(),
}).strict();

export const RankTagOrderByWithRelationInputSchema: z.ZodType<Prisma.RankTagOrderByWithRelationInput> = z.object({
  tagId: z.lazy(() => SortOrderSchema).optional(),
  rankId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  tag: z.lazy(() => TagOrderByWithRelationInputSchema).optional(),
  rank: z.lazy(() => RankOrderByWithRelationInputSchema).optional()
}).strict();

export const RankTagWhereUniqueInputSchema: z.ZodType<Prisma.RankTagWhereUniqueInput> = z.object({
  tagId_rankId: z.lazy(() => RankTagTagIdRankIdCompoundUniqueInputSchema)
})
.and(z.object({
  tagId_rankId: z.lazy(() => RankTagTagIdRankIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => RankTagWhereInputSchema),z.lazy(() => RankTagWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RankTagWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RankTagWhereInputSchema),z.lazy(() => RankTagWhereInputSchema).array() ]).optional(),
  tagId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  rankId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  tag: z.union([ z.lazy(() => TagScalarRelationFilterSchema),z.lazy(() => TagWhereInputSchema) ]).optional(),
  rank: z.union([ z.lazy(() => RankScalarRelationFilterSchema),z.lazy(() => RankWhereInputSchema) ]).optional(),
}).strict());

export const RankTagOrderByWithAggregationInputSchema: z.ZodType<Prisma.RankTagOrderByWithAggregationInput> = z.object({
  tagId: z.lazy(() => SortOrderSchema).optional(),
  rankId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => RankTagCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RankTagMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RankTagMinOrderByAggregateInputSchema).optional()
}).strict();

export const RankTagScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RankTagScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RankTagScalarWhereWithAggregatesInputSchema),z.lazy(() => RankTagScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RankTagScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RankTagScalarWhereWithAggregatesInputSchema),z.lazy(() => RankTagScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  tagId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  rankId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const SoftwareWhereInputSchema: z.ZodType<Prisma.SoftwareWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SoftwareWhereInputSchema),z.lazy(() => SoftwareWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SoftwareWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SoftwareWhereInputSchema),z.lazy(() => SoftwareWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  image: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  tags: z.lazy(() => SoftwareTagListRelationFilterSchema).optional(),
  ranks: z.lazy(() => SoftwareOnRankListRelationFilterSchema).optional(),
  likes: z.lazy(() => SoftwareLikeListRelationFilterSchema).optional(),
  favorites: z.lazy(() => SoftwareFavoriteListRelationFilterSchema).optional(),
  articles: z.lazy(() => SoftwareOnArticleListRelationFilterSchema).optional()
}).strict();

export const SoftwareOrderByWithRelationInputSchema: z.ZodType<Prisma.SoftwareOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  tags: z.lazy(() => SoftwareTagOrderByRelationAggregateInputSchema).optional(),
  ranks: z.lazy(() => SoftwareOnRankOrderByRelationAggregateInputSchema).optional(),
  likes: z.lazy(() => SoftwareLikeOrderByRelationAggregateInputSchema).optional(),
  favorites: z.lazy(() => SoftwareFavoriteOrderByRelationAggregateInputSchema).optional(),
  articles: z.lazy(() => SoftwareOnArticleOrderByRelationAggregateInputSchema).optional()
}).strict();

export const SoftwareWhereUniqueInputSchema: z.ZodType<Prisma.SoftwareWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => SoftwareWhereInputSchema),z.lazy(() => SoftwareWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SoftwareWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SoftwareWhereInputSchema),z.lazy(() => SoftwareWhereInputSchema).array() ]).optional(),
  image: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  tags: z.lazy(() => SoftwareTagListRelationFilterSchema).optional(),
  ranks: z.lazy(() => SoftwareOnRankListRelationFilterSchema).optional(),
  likes: z.lazy(() => SoftwareLikeListRelationFilterSchema).optional(),
  favorites: z.lazy(() => SoftwareFavoriteListRelationFilterSchema).optional(),
  articles: z.lazy(() => SoftwareOnArticleListRelationFilterSchema).optional()
}).strict());

export const SoftwareOrderByWithAggregationInputSchema: z.ZodType<Prisma.SoftwareOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SoftwareCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SoftwareMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SoftwareMinOrderByAggregateInputSchema).optional()
}).strict();

export const SoftwareScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SoftwareScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SoftwareScalarWhereWithAggregatesInputSchema),z.lazy(() => SoftwareScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SoftwareScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SoftwareScalarWhereWithAggregatesInputSchema),z.lazy(() => SoftwareScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  image: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  url: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const SoftwareTagWhereInputSchema: z.ZodType<Prisma.SoftwareTagWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SoftwareTagWhereInputSchema),z.lazy(() => SoftwareTagWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SoftwareTagWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SoftwareTagWhereInputSchema),z.lazy(() => SoftwareTagWhereInputSchema).array() ]).optional(),
  tagId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  softwareId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  tag: z.union([ z.lazy(() => TagScalarRelationFilterSchema),z.lazy(() => TagWhereInputSchema) ]).optional(),
  software: z.union([ z.lazy(() => SoftwareScalarRelationFilterSchema),z.lazy(() => SoftwareWhereInputSchema) ]).optional(),
}).strict();

export const SoftwareTagOrderByWithRelationInputSchema: z.ZodType<Prisma.SoftwareTagOrderByWithRelationInput> = z.object({
  tagId: z.lazy(() => SortOrderSchema).optional(),
  softwareId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  tag: z.lazy(() => TagOrderByWithRelationInputSchema).optional(),
  software: z.lazy(() => SoftwareOrderByWithRelationInputSchema).optional()
}).strict();

export const SoftwareTagWhereUniqueInputSchema: z.ZodType<Prisma.SoftwareTagWhereUniqueInput> = z.object({
  tagId_softwareId: z.lazy(() => SoftwareTagTagIdSoftwareIdCompoundUniqueInputSchema)
})
.and(z.object({
  tagId_softwareId: z.lazy(() => SoftwareTagTagIdSoftwareIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => SoftwareTagWhereInputSchema),z.lazy(() => SoftwareTagWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SoftwareTagWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SoftwareTagWhereInputSchema),z.lazy(() => SoftwareTagWhereInputSchema).array() ]).optional(),
  tagId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  softwareId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  tag: z.union([ z.lazy(() => TagScalarRelationFilterSchema),z.lazy(() => TagWhereInputSchema) ]).optional(),
  software: z.union([ z.lazy(() => SoftwareScalarRelationFilterSchema),z.lazy(() => SoftwareWhereInputSchema) ]).optional(),
}).strict());

export const SoftwareTagOrderByWithAggregationInputSchema: z.ZodType<Prisma.SoftwareTagOrderByWithAggregationInput> = z.object({
  tagId: z.lazy(() => SortOrderSchema).optional(),
  softwareId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SoftwareTagCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SoftwareTagMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SoftwareTagMinOrderByAggregateInputSchema).optional()
}).strict();

export const SoftwareTagScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SoftwareTagScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SoftwareTagScalarWhereWithAggregatesInputSchema),z.lazy(() => SoftwareTagScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SoftwareTagScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SoftwareTagScalarWhereWithAggregatesInputSchema),z.lazy(() => SoftwareTagScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  tagId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  softwareId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const SoftwareOnRankWhereInputSchema: z.ZodType<Prisma.SoftwareOnRankWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SoftwareOnRankWhereInputSchema),z.lazy(() => SoftwareOnRankWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SoftwareOnRankWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SoftwareOnRankWhereInputSchema),z.lazy(() => SoftwareOnRankWhereInputSchema).array() ]).optional(),
  softwareId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  rankId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  rankIndex: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  software: z.union([ z.lazy(() => SoftwareScalarRelationFilterSchema),z.lazy(() => SoftwareWhereInputSchema) ]).optional(),
  rank: z.union([ z.lazy(() => RankScalarRelationFilterSchema),z.lazy(() => RankWhereInputSchema) ]).optional(),
}).strict();

export const SoftwareOnRankOrderByWithRelationInputSchema: z.ZodType<Prisma.SoftwareOnRankOrderByWithRelationInput> = z.object({
  softwareId: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  rankId: z.lazy(() => SortOrderSchema).optional(),
  rankIndex: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  software: z.lazy(() => SoftwareOrderByWithRelationInputSchema).optional(),
  rank: z.lazy(() => RankOrderByWithRelationInputSchema).optional()
}).strict();

export const SoftwareOnRankWhereUniqueInputSchema: z.ZodType<Prisma.SoftwareOnRankWhereUniqueInput> = z.object({
  softwareId_rankId: z.lazy(() => SoftwareOnRankSoftwareIdRankIdCompoundUniqueInputSchema)
})
.and(z.object({
  softwareId_rankId: z.lazy(() => SoftwareOnRankSoftwareIdRankIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => SoftwareOnRankWhereInputSchema),z.lazy(() => SoftwareOnRankWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SoftwareOnRankWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SoftwareOnRankWhereInputSchema),z.lazy(() => SoftwareOnRankWhereInputSchema).array() ]).optional(),
  softwareId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  rankId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  rankIndex: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  software: z.union([ z.lazy(() => SoftwareScalarRelationFilterSchema),z.lazy(() => SoftwareWhereInputSchema) ]).optional(),
  rank: z.union([ z.lazy(() => RankScalarRelationFilterSchema),z.lazy(() => RankWhereInputSchema) ]).optional(),
}).strict());

export const SoftwareOnRankOrderByWithAggregationInputSchema: z.ZodType<Prisma.SoftwareOnRankOrderByWithAggregationInput> = z.object({
  softwareId: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  rankId: z.lazy(() => SortOrderSchema).optional(),
  rankIndex: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SoftwareOnRankCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => SoftwareOnRankAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SoftwareOnRankMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SoftwareOnRankMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => SoftwareOnRankSumOrderByAggregateInputSchema).optional()
}).strict();

export const SoftwareOnRankScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SoftwareOnRankScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SoftwareOnRankScalarWhereWithAggregatesInputSchema),z.lazy(() => SoftwareOnRankScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SoftwareOnRankScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SoftwareOnRankScalarWhereWithAggregatesInputSchema),z.lazy(() => SoftwareOnRankScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  softwareId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  rankId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  rankIndex: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const SoftwareOnArticleWhereInputSchema: z.ZodType<Prisma.SoftwareOnArticleWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SoftwareOnArticleWhereInputSchema),z.lazy(() => SoftwareOnArticleWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SoftwareOnArticleWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SoftwareOnArticleWhereInputSchema),z.lazy(() => SoftwareOnArticleWhereInputSchema).array() ]).optional(),
  softwareId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  articleId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  software: z.union([ z.lazy(() => SoftwareScalarRelationFilterSchema),z.lazy(() => SoftwareWhereInputSchema) ]).optional(),
  article: z.union([ z.lazy(() => ArticleScalarRelationFilterSchema),z.lazy(() => ArticleWhereInputSchema) ]).optional(),
}).strict();

export const SoftwareOnArticleOrderByWithRelationInputSchema: z.ZodType<Prisma.SoftwareOnArticleOrderByWithRelationInput> = z.object({
  softwareId: z.lazy(() => SortOrderSchema).optional(),
  articleId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  software: z.lazy(() => SoftwareOrderByWithRelationInputSchema).optional(),
  article: z.lazy(() => ArticleOrderByWithRelationInputSchema).optional()
}).strict();

export const SoftwareOnArticleWhereUniqueInputSchema: z.ZodType<Prisma.SoftwareOnArticleWhereUniqueInput> = z.object({
  softwareId_articleId: z.lazy(() => SoftwareOnArticleSoftwareIdArticleIdCompoundUniqueInputSchema)
})
.and(z.object({
  softwareId_articleId: z.lazy(() => SoftwareOnArticleSoftwareIdArticleIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => SoftwareOnArticleWhereInputSchema),z.lazy(() => SoftwareOnArticleWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SoftwareOnArticleWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SoftwareOnArticleWhereInputSchema),z.lazy(() => SoftwareOnArticleWhereInputSchema).array() ]).optional(),
  softwareId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  articleId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  software: z.union([ z.lazy(() => SoftwareScalarRelationFilterSchema),z.lazy(() => SoftwareWhereInputSchema) ]).optional(),
  article: z.union([ z.lazy(() => ArticleScalarRelationFilterSchema),z.lazy(() => ArticleWhereInputSchema) ]).optional(),
}).strict());

export const SoftwareOnArticleOrderByWithAggregationInputSchema: z.ZodType<Prisma.SoftwareOnArticleOrderByWithAggregationInput> = z.object({
  softwareId: z.lazy(() => SortOrderSchema).optional(),
  articleId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SoftwareOnArticleCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SoftwareOnArticleMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SoftwareOnArticleMinOrderByAggregateInputSchema).optional()
}).strict();

export const SoftwareOnArticleScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SoftwareOnArticleScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SoftwareOnArticleScalarWhereWithAggregatesInputSchema),z.lazy(() => SoftwareOnArticleScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SoftwareOnArticleScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SoftwareOnArticleScalarWhereWithAggregatesInputSchema),z.lazy(() => SoftwareOnArticleScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  softwareId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  articleId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ArticleWhereInputSchema: z.ZodType<Prisma.ArticleWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ArticleWhereInputSchema),z.lazy(() => ArticleWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ArticleWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ArticleWhereInputSchema),z.lazy(() => ArticleWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  image: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  rankId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userAddress: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  rank: z.union([ z.lazy(() => RankScalarRelationFilterSchema),z.lazy(() => RankWhereInputSchema) ]).optional(),
  author: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  softwares: z.lazy(() => SoftwareOnArticleListRelationFilterSchema).optional()
}).strict();

export const ArticleOrderByWithRelationInputSchema: z.ZodType<Prisma.ArticleOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  rankId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userAddress: z.lazy(() => SortOrderSchema).optional(),
  rank: z.lazy(() => RankOrderByWithRelationInputSchema).optional(),
  author: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  softwares: z.lazy(() => SoftwareOnArticleOrderByRelationAggregateInputSchema).optional()
}).strict();

export const ArticleWhereUniqueInputSchema: z.ZodType<Prisma.ArticleWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => ArticleWhereInputSchema),z.lazy(() => ArticleWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ArticleWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ArticleWhereInputSchema),z.lazy(() => ArticleWhereInputSchema).array() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  image: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  rankId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userAddress: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  rank: z.union([ z.lazy(() => RankScalarRelationFilterSchema),z.lazy(() => RankWhereInputSchema) ]).optional(),
  author: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  softwares: z.lazy(() => SoftwareOnArticleListRelationFilterSchema).optional()
}).strict());

export const ArticleOrderByWithAggregationInputSchema: z.ZodType<Prisma.ArticleOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  rankId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userAddress: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ArticleCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ArticleMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ArticleMinOrderByAggregateInputSchema).optional()
}).strict();

export const ArticleScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ArticleScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ArticleScalarWhereWithAggregatesInputSchema),z.lazy(() => ArticleScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ArticleScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ArticleScalarWhereWithAggregatesInputSchema),z.lazy(() => ArticleScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  image: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  rankId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  userAddress: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const RankLikeWhereInputSchema: z.ZodType<Prisma.RankLikeWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RankLikeWhereInputSchema),z.lazy(() => RankLikeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RankLikeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RankLikeWhereInputSchema),z.lazy(() => RankLikeWhereInputSchema).array() ]).optional(),
  rankId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userAddress: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  rank: z.union([ z.lazy(() => RankScalarRelationFilterSchema),z.lazy(() => RankWhereInputSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const RankLikeOrderByWithRelationInputSchema: z.ZodType<Prisma.RankLikeOrderByWithRelationInput> = z.object({
  rankId: z.lazy(() => SortOrderSchema).optional(),
  userAddress: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  rank: z.lazy(() => RankOrderByWithRelationInputSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const RankLikeWhereUniqueInputSchema: z.ZodType<Prisma.RankLikeWhereUniqueInput> = z.object({
  rankId_userAddress: z.lazy(() => RankLikeRankIdUserAddressCompoundUniqueInputSchema)
})
.and(z.object({
  rankId_userAddress: z.lazy(() => RankLikeRankIdUserAddressCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => RankLikeWhereInputSchema),z.lazy(() => RankLikeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RankLikeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RankLikeWhereInputSchema),z.lazy(() => RankLikeWhereInputSchema).array() ]).optional(),
  rankId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userAddress: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  rank: z.union([ z.lazy(() => RankScalarRelationFilterSchema),z.lazy(() => RankWhereInputSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const RankLikeOrderByWithAggregationInputSchema: z.ZodType<Prisma.RankLikeOrderByWithAggregationInput> = z.object({
  rankId: z.lazy(() => SortOrderSchema).optional(),
  userAddress: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => RankLikeCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RankLikeMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RankLikeMinOrderByAggregateInputSchema).optional()
}).strict();

export const RankLikeScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RankLikeScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RankLikeScalarWhereWithAggregatesInputSchema),z.lazy(() => RankLikeScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RankLikeScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RankLikeScalarWhereWithAggregatesInputSchema),z.lazy(() => RankLikeScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  rankId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userAddress: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const RankFavoriteWhereInputSchema: z.ZodType<Prisma.RankFavoriteWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RankFavoriteWhereInputSchema),z.lazy(() => RankFavoriteWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RankFavoriteWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RankFavoriteWhereInputSchema),z.lazy(() => RankFavoriteWhereInputSchema).array() ]).optional(),
  rankId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userAddress: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  rank: z.union([ z.lazy(() => RankScalarRelationFilterSchema),z.lazy(() => RankWhereInputSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const RankFavoriteOrderByWithRelationInputSchema: z.ZodType<Prisma.RankFavoriteOrderByWithRelationInput> = z.object({
  rankId: z.lazy(() => SortOrderSchema).optional(),
  userAddress: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  rank: z.lazy(() => RankOrderByWithRelationInputSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const RankFavoriteWhereUniqueInputSchema: z.ZodType<Prisma.RankFavoriteWhereUniqueInput> = z.object({
  rankId_userAddress: z.lazy(() => RankFavoriteRankIdUserAddressCompoundUniqueInputSchema)
})
.and(z.object({
  rankId_userAddress: z.lazy(() => RankFavoriteRankIdUserAddressCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => RankFavoriteWhereInputSchema),z.lazy(() => RankFavoriteWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RankFavoriteWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RankFavoriteWhereInputSchema),z.lazy(() => RankFavoriteWhereInputSchema).array() ]).optional(),
  rankId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userAddress: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  rank: z.union([ z.lazy(() => RankScalarRelationFilterSchema),z.lazy(() => RankWhereInputSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const RankFavoriteOrderByWithAggregationInputSchema: z.ZodType<Prisma.RankFavoriteOrderByWithAggregationInput> = z.object({
  rankId: z.lazy(() => SortOrderSchema).optional(),
  userAddress: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => RankFavoriteCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RankFavoriteMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RankFavoriteMinOrderByAggregateInputSchema).optional()
}).strict();

export const RankFavoriteScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RankFavoriteScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RankFavoriteScalarWhereWithAggregatesInputSchema),z.lazy(() => RankFavoriteScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RankFavoriteScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RankFavoriteScalarWhereWithAggregatesInputSchema),z.lazy(() => RankFavoriteScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  rankId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userAddress: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const SoftwareLikeWhereInputSchema: z.ZodType<Prisma.SoftwareLikeWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SoftwareLikeWhereInputSchema),z.lazy(() => SoftwareLikeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SoftwareLikeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SoftwareLikeWhereInputSchema),z.lazy(() => SoftwareLikeWhereInputSchema).array() ]).optional(),
  softwareId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userAddress: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  software: z.union([ z.lazy(() => SoftwareScalarRelationFilterSchema),z.lazy(() => SoftwareWhereInputSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const SoftwareLikeOrderByWithRelationInputSchema: z.ZodType<Prisma.SoftwareLikeOrderByWithRelationInput> = z.object({
  softwareId: z.lazy(() => SortOrderSchema).optional(),
  userAddress: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  software: z.lazy(() => SoftwareOrderByWithRelationInputSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const SoftwareLikeWhereUniqueInputSchema: z.ZodType<Prisma.SoftwareLikeWhereUniqueInput> = z.object({
  softwareId_userAddress: z.lazy(() => SoftwareLikeSoftwareIdUserAddressCompoundUniqueInputSchema)
})
.and(z.object({
  softwareId_userAddress: z.lazy(() => SoftwareLikeSoftwareIdUserAddressCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => SoftwareLikeWhereInputSchema),z.lazy(() => SoftwareLikeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SoftwareLikeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SoftwareLikeWhereInputSchema),z.lazy(() => SoftwareLikeWhereInputSchema).array() ]).optional(),
  softwareId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userAddress: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  software: z.union([ z.lazy(() => SoftwareScalarRelationFilterSchema),z.lazy(() => SoftwareWhereInputSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const SoftwareLikeOrderByWithAggregationInputSchema: z.ZodType<Prisma.SoftwareLikeOrderByWithAggregationInput> = z.object({
  softwareId: z.lazy(() => SortOrderSchema).optional(),
  userAddress: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SoftwareLikeCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SoftwareLikeMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SoftwareLikeMinOrderByAggregateInputSchema).optional()
}).strict();

export const SoftwareLikeScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SoftwareLikeScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SoftwareLikeScalarWhereWithAggregatesInputSchema),z.lazy(() => SoftwareLikeScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SoftwareLikeScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SoftwareLikeScalarWhereWithAggregatesInputSchema),z.lazy(() => SoftwareLikeScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  softwareId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userAddress: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const SoftwareFavoriteWhereInputSchema: z.ZodType<Prisma.SoftwareFavoriteWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SoftwareFavoriteWhereInputSchema),z.lazy(() => SoftwareFavoriteWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SoftwareFavoriteWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SoftwareFavoriteWhereInputSchema),z.lazy(() => SoftwareFavoriteWhereInputSchema).array() ]).optional(),
  softwareId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userAddress: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  software: z.union([ z.lazy(() => SoftwareScalarRelationFilterSchema),z.lazy(() => SoftwareWhereInputSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const SoftwareFavoriteOrderByWithRelationInputSchema: z.ZodType<Prisma.SoftwareFavoriteOrderByWithRelationInput> = z.object({
  softwareId: z.lazy(() => SortOrderSchema).optional(),
  userAddress: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  software: z.lazy(() => SoftwareOrderByWithRelationInputSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const SoftwareFavoriteWhereUniqueInputSchema: z.ZodType<Prisma.SoftwareFavoriteWhereUniqueInput> = z.object({
  softwareId_userAddress: z.lazy(() => SoftwareFavoriteSoftwareIdUserAddressCompoundUniqueInputSchema)
})
.and(z.object({
  softwareId_userAddress: z.lazy(() => SoftwareFavoriteSoftwareIdUserAddressCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => SoftwareFavoriteWhereInputSchema),z.lazy(() => SoftwareFavoriteWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SoftwareFavoriteWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SoftwareFavoriteWhereInputSchema),z.lazy(() => SoftwareFavoriteWhereInputSchema).array() ]).optional(),
  softwareId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userAddress: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  software: z.union([ z.lazy(() => SoftwareScalarRelationFilterSchema),z.lazy(() => SoftwareWhereInputSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const SoftwareFavoriteOrderByWithAggregationInputSchema: z.ZodType<Prisma.SoftwareFavoriteOrderByWithAggregationInput> = z.object({
  softwareId: z.lazy(() => SortOrderSchema).optional(),
  userAddress: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SoftwareFavoriteCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SoftwareFavoriteMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SoftwareFavoriteMinOrderByAggregateInputSchema).optional()
}).strict();

export const SoftwareFavoriteScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SoftwareFavoriteScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SoftwareFavoriteScalarWhereWithAggregatesInputSchema),z.lazy(() => SoftwareFavoriteScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SoftwareFavoriteScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SoftwareFavoriteScalarWhereWithAggregatesInputSchema),z.lazy(() => SoftwareFavoriteScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  softwareId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userAddress: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const RankCommentWhereInputSchema: z.ZodType<Prisma.RankCommentWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RankCommentWhereInputSchema),z.lazy(() => RankCommentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RankCommentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RankCommentWhereInputSchema),z.lazy(() => RankCommentWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  rankId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userAddress: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  deletedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  replyToComment: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  replyToUser: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  rootCommentId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  rank: z.union([ z.lazy(() => RankScalarRelationFilterSchema),z.lazy(() => RankWhereInputSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const RankCommentOrderByWithRelationInputSchema: z.ZodType<Prisma.RankCommentOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rankId: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  userAddress: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  replyToComment: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  replyToUser: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  rootCommentId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  rank: z.lazy(() => RankOrderByWithRelationInputSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const RankCommentWhereUniqueInputSchema: z.ZodType<Prisma.RankCommentWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => RankCommentWhereInputSchema),z.lazy(() => RankCommentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RankCommentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RankCommentWhereInputSchema),z.lazy(() => RankCommentWhereInputSchema).array() ]).optional(),
  rankId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userAddress: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  deletedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  replyToComment: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  replyToUser: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  rootCommentId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  rank: z.union([ z.lazy(() => RankScalarRelationFilterSchema),z.lazy(() => RankWhereInputSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const RankCommentOrderByWithAggregationInputSchema: z.ZodType<Prisma.RankCommentOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rankId: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  userAddress: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  replyToComment: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  replyToUser: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  rootCommentId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => RankCommentCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RankCommentMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RankCommentMinOrderByAggregateInputSchema).optional()
}).strict();

export const RankCommentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RankCommentScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RankCommentScalarWhereWithAggregatesInputSchema),z.lazy(() => RankCommentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RankCommentScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RankCommentScalarWhereWithAggregatesInputSchema),z.lazy(() => RankCommentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  rankId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  userAddress: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  deletedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  replyToComment: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  replyToUser: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  rootCommentId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const UserPlatformCreateInputSchema: z.ZodType<Prisma.UserPlatformCreateInput> = z.object({
  id: z.string().optional(),
  platform: z.lazy(() => PlatformSchema).optional(),
  platformId: z.string(),
  platformName: z.string(),
  platformAvatar: z.string(),
  user: z.lazy(() => UserCreateNestedOneWithoutPlatformsInputSchema)
}).strict();

export const UserPlatformUncheckedCreateInputSchema: z.ZodType<Prisma.UserPlatformUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  platform: z.lazy(() => PlatformSchema).optional(),
  platformId: z.string(),
  platformName: z.string(),
  platformAvatar: z.string(),
  userAddress: z.string()
}).strict();

export const UserPlatformUpdateInputSchema: z.ZodType<Prisma.UserPlatformUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platform: z.union([ z.lazy(() => PlatformSchema),z.lazy(() => EnumPlatformFieldUpdateOperationsInputSchema) ]).optional(),
  platformId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformAvatar: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutPlatformsNestedInputSchema).optional()
}).strict();

export const UserPlatformUncheckedUpdateInputSchema: z.ZodType<Prisma.UserPlatformUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platform: z.union([ z.lazy(() => PlatformSchema),z.lazy(() => EnumPlatformFieldUpdateOperationsInputSchema) ]).optional(),
  platformId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformAvatar: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userAddress: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserPlatformCreateManyInputSchema: z.ZodType<Prisma.UserPlatformCreateManyInput> = z.object({
  id: z.string().optional(),
  platform: z.lazy(() => PlatformSchema).optional(),
  platformId: z.string(),
  platformName: z.string(),
  platformAvatar: z.string(),
  userAddress: z.string()
}).strict();

export const UserPlatformUpdateManyMutationInputSchema: z.ZodType<Prisma.UserPlatformUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platform: z.union([ z.lazy(() => PlatformSchema),z.lazy(() => EnumPlatformFieldUpdateOperationsInputSchema) ]).optional(),
  platformId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformAvatar: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserPlatformUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserPlatformUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platform: z.union([ z.lazy(() => PlatformSchema),z.lazy(() => EnumPlatformFieldUpdateOperationsInputSchema) ]).optional(),
  platformId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformAvatar: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userAddress: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ApiKeyCreateInputSchema: z.ZodType<Prisma.ApiKeyCreateInput> = z.object({
  key: z.string(),
  name: z.string(),
  userAddress: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  expiredAt: z.coerce.date().optional().nullable()
}).strict();

export const ApiKeyUncheckedCreateInputSchema: z.ZodType<Prisma.ApiKeyUncheckedCreateInput> = z.object({
  key: z.string(),
  name: z.string(),
  userAddress: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  expiredAt: z.coerce.date().optional().nullable()
}).strict();

export const ApiKeyUpdateInputSchema: z.ZodType<Prisma.ApiKeyUpdateInput> = z.object({
  key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  expiredAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ApiKeyUncheckedUpdateInputSchema: z.ZodType<Prisma.ApiKeyUncheckedUpdateInput> = z.object({
  key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  expiredAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ApiKeyCreateManyInputSchema: z.ZodType<Prisma.ApiKeyCreateManyInput> = z.object({
  key: z.string(),
  name: z.string(),
  userAddress: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  expiredAt: z.coerce.date().optional().nullable()
}).strict();

export const ApiKeyUpdateManyMutationInputSchema: z.ZodType<Prisma.ApiKeyUpdateManyMutationInput> = z.object({
  key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  expiredAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ApiKeyUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ApiKeyUncheckedUpdateManyInput> = z.object({
  key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  expiredAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  address: z.string(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  referralCode: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  invitedBy: z.union([ z.lazy(() => UserCreateinvitedByInputSchema),z.string().array() ]).optional(),
  ranks: z.lazy(() => RankCreateNestedManyWithoutUserInputSchema).optional(),
  platforms: z.lazy(() => UserPlatformCreateNestedManyWithoutUserInputSchema).optional(),
  articles: z.lazy(() => ArticleCreateNestedManyWithoutAuthorInputSchema).optional(),
  rankLikes: z.lazy(() => RankLikeCreateNestedManyWithoutUserInputSchema).optional(),
  rankFavorites: z.lazy(() => RankFavoriteCreateNestedManyWithoutUserInputSchema).optional(),
  softwareLikes: z.lazy(() => SoftwareLikeCreateNestedManyWithoutUserInputSchema).optional(),
  softwareFavorites: z.lazy(() => SoftwareFavoriteCreateNestedManyWithoutUserInputSchema).optional(),
  rankComments: z.lazy(() => RankCommentCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  address: z.string(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  referralCode: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  invitedBy: z.union([ z.lazy(() => UserCreateinvitedByInputSchema),z.string().array() ]).optional(),
  ranks: z.lazy(() => RankUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  platforms: z.lazy(() => UserPlatformUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  articles: z.lazy(() => ArticleUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  rankLikes: z.lazy(() => RankLikeUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  rankFavorites: z.lazy(() => RankFavoriteUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  softwareLikes: z.lazy(() => SoftwareLikeUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  softwareFavorites: z.lazy(() => SoftwareFavoriteUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  rankComments: z.lazy(() => RankCommentUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  referralCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  invitedBy: z.union([ z.lazy(() => UserUpdateinvitedByInputSchema),z.string().array() ]).optional(),
  ranks: z.lazy(() => RankUpdateManyWithoutUserNestedInputSchema).optional(),
  platforms: z.lazy(() => UserPlatformUpdateManyWithoutUserNestedInputSchema).optional(),
  articles: z.lazy(() => ArticleUpdateManyWithoutAuthorNestedInputSchema).optional(),
  rankLikes: z.lazy(() => RankLikeUpdateManyWithoutUserNestedInputSchema).optional(),
  rankFavorites: z.lazy(() => RankFavoriteUpdateManyWithoutUserNestedInputSchema).optional(),
  softwareLikes: z.lazy(() => SoftwareLikeUpdateManyWithoutUserNestedInputSchema).optional(),
  softwareFavorites: z.lazy(() => SoftwareFavoriteUpdateManyWithoutUserNestedInputSchema).optional(),
  rankComments: z.lazy(() => RankCommentUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  referralCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  invitedBy: z.union([ z.lazy(() => UserUpdateinvitedByInputSchema),z.string().array() ]).optional(),
  ranks: z.lazy(() => RankUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  platforms: z.lazy(() => UserPlatformUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  articles: z.lazy(() => ArticleUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  rankLikes: z.lazy(() => RankLikeUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  rankFavorites: z.lazy(() => RankFavoriteUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  softwareLikes: z.lazy(() => SoftwareLikeUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  softwareFavorites: z.lazy(() => SoftwareFavoriteUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  rankComments: z.lazy(() => RankCommentUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  address: z.string(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  referralCode: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  invitedBy: z.union([ z.lazy(() => UserCreateinvitedByInputSchema),z.string().array() ]).optional(),
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  referralCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  invitedBy: z.union([ z.lazy(() => UserUpdateinvitedByInputSchema),z.string().array() ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  referralCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  invitedBy: z.union([ z.lazy(() => UserUpdateinvitedByInputSchema),z.string().array() ]).optional(),
}).strict();

export const TagCreateInputSchema: z.ZodType<Prisma.TagCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  ranks: z.lazy(() => RankTagCreateNestedManyWithoutTagInputSchema).optional(),
  softwares: z.lazy(() => SoftwareTagCreateNestedManyWithoutTagInputSchema).optional()
}).strict();

export const TagUncheckedCreateInputSchema: z.ZodType<Prisma.TagUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  ranks: z.lazy(() => RankTagUncheckedCreateNestedManyWithoutTagInputSchema).optional(),
  softwares: z.lazy(() => SoftwareTagUncheckedCreateNestedManyWithoutTagInputSchema).optional()
}).strict();

export const TagUpdateInputSchema: z.ZodType<Prisma.TagUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ranks: z.lazy(() => RankTagUpdateManyWithoutTagNestedInputSchema).optional(),
  softwares: z.lazy(() => SoftwareTagUpdateManyWithoutTagNestedInputSchema).optional()
}).strict();

export const TagUncheckedUpdateInputSchema: z.ZodType<Prisma.TagUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ranks: z.lazy(() => RankTagUncheckedUpdateManyWithoutTagNestedInputSchema).optional(),
  softwares: z.lazy(() => SoftwareTagUncheckedUpdateManyWithoutTagNestedInputSchema).optional()
}).strict();

export const TagCreateManyInputSchema: z.ZodType<Prisma.TagCreateManyInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TagUpdateManyMutationInputSchema: z.ZodType<Prisma.TagUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TagUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TagUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RankCreateInputSchema: z.ZodType<Prisma.RankCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutRanksInputSchema),
  tags: z.lazy(() => RankTagCreateNestedManyWithoutRankInputSchema).optional(),
  softwares: z.lazy(() => SoftwareOnRankCreateNestedManyWithoutRankInputSchema).optional(),
  articles: z.lazy(() => ArticleCreateNestedManyWithoutRankInputSchema).optional(),
  likes: z.lazy(() => RankLikeCreateNestedManyWithoutRankInputSchema).optional(),
  favorites: z.lazy(() => RankFavoriteCreateNestedManyWithoutRankInputSchema).optional(),
  comments: z.lazy(() => RankCommentCreateNestedManyWithoutRankInputSchema).optional()
}).strict();

export const RankUncheckedCreateInputSchema: z.ZodType<Prisma.RankUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  userAddress: z.string(),
  name: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tags: z.lazy(() => RankTagUncheckedCreateNestedManyWithoutRankInputSchema).optional(),
  softwares: z.lazy(() => SoftwareOnRankUncheckedCreateNestedManyWithoutRankInputSchema).optional(),
  articles: z.lazy(() => ArticleUncheckedCreateNestedManyWithoutRankInputSchema).optional(),
  likes: z.lazy(() => RankLikeUncheckedCreateNestedManyWithoutRankInputSchema).optional(),
  favorites: z.lazy(() => RankFavoriteUncheckedCreateNestedManyWithoutRankInputSchema).optional(),
  comments: z.lazy(() => RankCommentUncheckedCreateNestedManyWithoutRankInputSchema).optional()
}).strict();

export const RankUpdateInputSchema: z.ZodType<Prisma.RankUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutRanksNestedInputSchema).optional(),
  tags: z.lazy(() => RankTagUpdateManyWithoutRankNestedInputSchema).optional(),
  softwares: z.lazy(() => SoftwareOnRankUpdateManyWithoutRankNestedInputSchema).optional(),
  articles: z.lazy(() => ArticleUpdateManyWithoutRankNestedInputSchema).optional(),
  likes: z.lazy(() => RankLikeUpdateManyWithoutRankNestedInputSchema).optional(),
  favorites: z.lazy(() => RankFavoriteUpdateManyWithoutRankNestedInputSchema).optional(),
  comments: z.lazy(() => RankCommentUpdateManyWithoutRankNestedInputSchema).optional()
}).strict();

export const RankUncheckedUpdateInputSchema: z.ZodType<Prisma.RankUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userAddress: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.lazy(() => RankTagUncheckedUpdateManyWithoutRankNestedInputSchema).optional(),
  softwares: z.lazy(() => SoftwareOnRankUncheckedUpdateManyWithoutRankNestedInputSchema).optional(),
  articles: z.lazy(() => ArticleUncheckedUpdateManyWithoutRankNestedInputSchema).optional(),
  likes: z.lazy(() => RankLikeUncheckedUpdateManyWithoutRankNestedInputSchema).optional(),
  favorites: z.lazy(() => RankFavoriteUncheckedUpdateManyWithoutRankNestedInputSchema).optional(),
  comments: z.lazy(() => RankCommentUncheckedUpdateManyWithoutRankNestedInputSchema).optional()
}).strict();

export const RankCreateManyInputSchema: z.ZodType<Prisma.RankCreateManyInput> = z.object({
  id: z.string().optional(),
  userAddress: z.string(),
  name: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const RankUpdateManyMutationInputSchema: z.ZodType<Prisma.RankUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RankUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RankUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userAddress: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RankTagCreateInputSchema: z.ZodType<Prisma.RankTagCreateInput> = z.object({
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tag: z.lazy(() => TagCreateNestedOneWithoutRanksInputSchema),
  rank: z.lazy(() => RankCreateNestedOneWithoutTagsInputSchema)
}).strict();

export const RankTagUncheckedCreateInputSchema: z.ZodType<Prisma.RankTagUncheckedCreateInput> = z.object({
  tagId: z.string(),
  rankId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const RankTagUpdateInputSchema: z.ZodType<Prisma.RankTagUpdateInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tag: z.lazy(() => TagUpdateOneRequiredWithoutRanksNestedInputSchema).optional(),
  rank: z.lazy(() => RankUpdateOneRequiredWithoutTagsNestedInputSchema).optional()
}).strict();

export const RankTagUncheckedUpdateInputSchema: z.ZodType<Prisma.RankTagUncheckedUpdateInput> = z.object({
  tagId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rankId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RankTagCreateManyInputSchema: z.ZodType<Prisma.RankTagCreateManyInput> = z.object({
  tagId: z.string(),
  rankId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const RankTagUpdateManyMutationInputSchema: z.ZodType<Prisma.RankTagUpdateManyMutationInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RankTagUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RankTagUncheckedUpdateManyInput> = z.object({
  tagId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rankId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SoftwareCreateInputSchema: z.ZodType<Prisma.SoftwareCreateInput> = z.object({
  id: z.string().optional(),
  image: z.string(),
  name: z.string(),
  description: z.string().optional().nullable(),
  url: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tags: z.lazy(() => SoftwareTagCreateNestedManyWithoutSoftwareInputSchema).optional(),
  ranks: z.lazy(() => SoftwareOnRankCreateNestedManyWithoutSoftwareInputSchema).optional(),
  likes: z.lazy(() => SoftwareLikeCreateNestedManyWithoutSoftwareInputSchema).optional(),
  favorites: z.lazy(() => SoftwareFavoriteCreateNestedManyWithoutSoftwareInputSchema).optional(),
  articles: z.lazy(() => SoftwareOnArticleCreateNestedManyWithoutSoftwareInputSchema).optional()
}).strict();

export const SoftwareUncheckedCreateInputSchema: z.ZodType<Prisma.SoftwareUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  image: z.string(),
  name: z.string(),
  description: z.string().optional().nullable(),
  url: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tags: z.lazy(() => SoftwareTagUncheckedCreateNestedManyWithoutSoftwareInputSchema).optional(),
  ranks: z.lazy(() => SoftwareOnRankUncheckedCreateNestedManyWithoutSoftwareInputSchema).optional(),
  likes: z.lazy(() => SoftwareLikeUncheckedCreateNestedManyWithoutSoftwareInputSchema).optional(),
  favorites: z.lazy(() => SoftwareFavoriteUncheckedCreateNestedManyWithoutSoftwareInputSchema).optional(),
  articles: z.lazy(() => SoftwareOnArticleUncheckedCreateNestedManyWithoutSoftwareInputSchema).optional()
}).strict();

export const SoftwareUpdateInputSchema: z.ZodType<Prisma.SoftwareUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.lazy(() => SoftwareTagUpdateManyWithoutSoftwareNestedInputSchema).optional(),
  ranks: z.lazy(() => SoftwareOnRankUpdateManyWithoutSoftwareNestedInputSchema).optional(),
  likes: z.lazy(() => SoftwareLikeUpdateManyWithoutSoftwareNestedInputSchema).optional(),
  favorites: z.lazy(() => SoftwareFavoriteUpdateManyWithoutSoftwareNestedInputSchema).optional(),
  articles: z.lazy(() => SoftwareOnArticleUpdateManyWithoutSoftwareNestedInputSchema).optional()
}).strict();

export const SoftwareUncheckedUpdateInputSchema: z.ZodType<Prisma.SoftwareUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.lazy(() => SoftwareTagUncheckedUpdateManyWithoutSoftwareNestedInputSchema).optional(),
  ranks: z.lazy(() => SoftwareOnRankUncheckedUpdateManyWithoutSoftwareNestedInputSchema).optional(),
  likes: z.lazy(() => SoftwareLikeUncheckedUpdateManyWithoutSoftwareNestedInputSchema).optional(),
  favorites: z.lazy(() => SoftwareFavoriteUncheckedUpdateManyWithoutSoftwareNestedInputSchema).optional(),
  articles: z.lazy(() => SoftwareOnArticleUncheckedUpdateManyWithoutSoftwareNestedInputSchema).optional()
}).strict();

export const SoftwareCreateManyInputSchema: z.ZodType<Prisma.SoftwareCreateManyInput> = z.object({
  id: z.string().optional(),
  image: z.string(),
  name: z.string(),
  description: z.string().optional().nullable(),
  url: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SoftwareUpdateManyMutationInputSchema: z.ZodType<Prisma.SoftwareUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SoftwareUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SoftwareUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SoftwareTagCreateInputSchema: z.ZodType<Prisma.SoftwareTagCreateInput> = z.object({
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tag: z.lazy(() => TagCreateNestedOneWithoutSoftwaresInputSchema),
  software: z.lazy(() => SoftwareCreateNestedOneWithoutTagsInputSchema)
}).strict();

export const SoftwareTagUncheckedCreateInputSchema: z.ZodType<Prisma.SoftwareTagUncheckedCreateInput> = z.object({
  tagId: z.string(),
  softwareId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SoftwareTagUpdateInputSchema: z.ZodType<Prisma.SoftwareTagUpdateInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tag: z.lazy(() => TagUpdateOneRequiredWithoutSoftwaresNestedInputSchema).optional(),
  software: z.lazy(() => SoftwareUpdateOneRequiredWithoutTagsNestedInputSchema).optional()
}).strict();

export const SoftwareTagUncheckedUpdateInputSchema: z.ZodType<Prisma.SoftwareTagUncheckedUpdateInput> = z.object({
  tagId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  softwareId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SoftwareTagCreateManyInputSchema: z.ZodType<Prisma.SoftwareTagCreateManyInput> = z.object({
  tagId: z.string(),
  softwareId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SoftwareTagUpdateManyMutationInputSchema: z.ZodType<Prisma.SoftwareTagUpdateManyMutationInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SoftwareTagUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SoftwareTagUncheckedUpdateManyInput> = z.object({
  tagId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  softwareId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SoftwareOnRankCreateInputSchema: z.ZodType<Prisma.SoftwareOnRankCreateInput> = z.object({
  description: z.string(),
  rankIndex: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  software: z.lazy(() => SoftwareCreateNestedOneWithoutRanksInputSchema),
  rank: z.lazy(() => RankCreateNestedOneWithoutSoftwaresInputSchema)
}).strict();

export const SoftwareOnRankUncheckedCreateInputSchema: z.ZodType<Prisma.SoftwareOnRankUncheckedCreateInput> = z.object({
  softwareId: z.string(),
  description: z.string(),
  rankId: z.string(),
  rankIndex: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SoftwareOnRankUpdateInputSchema: z.ZodType<Prisma.SoftwareOnRankUpdateInput> = z.object({
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rankIndex: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  software: z.lazy(() => SoftwareUpdateOneRequiredWithoutRanksNestedInputSchema).optional(),
  rank: z.lazy(() => RankUpdateOneRequiredWithoutSoftwaresNestedInputSchema).optional()
}).strict();

export const SoftwareOnRankUncheckedUpdateInputSchema: z.ZodType<Prisma.SoftwareOnRankUncheckedUpdateInput> = z.object({
  softwareId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rankId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rankIndex: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SoftwareOnRankCreateManyInputSchema: z.ZodType<Prisma.SoftwareOnRankCreateManyInput> = z.object({
  softwareId: z.string(),
  description: z.string(),
  rankId: z.string(),
  rankIndex: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SoftwareOnRankUpdateManyMutationInputSchema: z.ZodType<Prisma.SoftwareOnRankUpdateManyMutationInput> = z.object({
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rankIndex: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SoftwareOnRankUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SoftwareOnRankUncheckedUpdateManyInput> = z.object({
  softwareId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rankId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rankIndex: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SoftwareOnArticleCreateInputSchema: z.ZodType<Prisma.SoftwareOnArticleCreateInput> = z.object({
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  software: z.lazy(() => SoftwareCreateNestedOneWithoutArticlesInputSchema),
  article: z.lazy(() => ArticleCreateNestedOneWithoutSoftwaresInputSchema)
}).strict();

export const SoftwareOnArticleUncheckedCreateInputSchema: z.ZodType<Prisma.SoftwareOnArticleUncheckedCreateInput> = z.object({
  softwareId: z.string(),
  articleId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SoftwareOnArticleUpdateInputSchema: z.ZodType<Prisma.SoftwareOnArticleUpdateInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  software: z.lazy(() => SoftwareUpdateOneRequiredWithoutArticlesNestedInputSchema).optional(),
  article: z.lazy(() => ArticleUpdateOneRequiredWithoutSoftwaresNestedInputSchema).optional()
}).strict();

export const SoftwareOnArticleUncheckedUpdateInputSchema: z.ZodType<Prisma.SoftwareOnArticleUncheckedUpdateInput> = z.object({
  softwareId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  articleId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SoftwareOnArticleCreateManyInputSchema: z.ZodType<Prisma.SoftwareOnArticleCreateManyInput> = z.object({
  softwareId: z.string(),
  articleId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SoftwareOnArticleUpdateManyMutationInputSchema: z.ZodType<Prisma.SoftwareOnArticleUpdateManyMutationInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SoftwareOnArticleUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SoftwareOnArticleUncheckedUpdateManyInput> = z.object({
  softwareId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  articleId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ArticleCreateInputSchema: z.ZodType<Prisma.ArticleCreateInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string(),
  image: z.string(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  rank: z.lazy(() => RankCreateNestedOneWithoutArticlesInputSchema),
  author: z.lazy(() => UserCreateNestedOneWithoutArticlesInputSchema),
  softwares: z.lazy(() => SoftwareOnArticleCreateNestedManyWithoutArticleInputSchema).optional()
}).strict();

export const ArticleUncheckedCreateInputSchema: z.ZodType<Prisma.ArticleUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string(),
  image: z.string(),
  content: z.string(),
  rankId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userAddress: z.string(),
  softwares: z.lazy(() => SoftwareOnArticleUncheckedCreateNestedManyWithoutArticleInputSchema).optional()
}).strict();

export const ArticleUpdateInputSchema: z.ZodType<Prisma.ArticleUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  rank: z.lazy(() => RankUpdateOneRequiredWithoutArticlesNestedInputSchema).optional(),
  author: z.lazy(() => UserUpdateOneRequiredWithoutArticlesNestedInputSchema).optional(),
  softwares: z.lazy(() => SoftwareOnArticleUpdateManyWithoutArticleNestedInputSchema).optional()
}).strict();

export const ArticleUncheckedUpdateInputSchema: z.ZodType<Prisma.ArticleUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rankId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userAddress: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  softwares: z.lazy(() => SoftwareOnArticleUncheckedUpdateManyWithoutArticleNestedInputSchema).optional()
}).strict();

export const ArticleCreateManyInputSchema: z.ZodType<Prisma.ArticleCreateManyInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string(),
  image: z.string(),
  content: z.string(),
  rankId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userAddress: z.string()
}).strict();

export const ArticleUpdateManyMutationInputSchema: z.ZodType<Prisma.ArticleUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ArticleUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ArticleUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rankId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userAddress: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RankLikeCreateInputSchema: z.ZodType<Prisma.RankLikeCreateInput> = z.object({
  createdAt: z.coerce.date().optional(),
  rank: z.lazy(() => RankCreateNestedOneWithoutLikesInputSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutRankLikesInputSchema)
}).strict();

export const RankLikeUncheckedCreateInputSchema: z.ZodType<Prisma.RankLikeUncheckedCreateInput> = z.object({
  rankId: z.string(),
  userAddress: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const RankLikeUpdateInputSchema: z.ZodType<Prisma.RankLikeUpdateInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  rank: z.lazy(() => RankUpdateOneRequiredWithoutLikesNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutRankLikesNestedInputSchema).optional()
}).strict();

export const RankLikeUncheckedUpdateInputSchema: z.ZodType<Prisma.RankLikeUncheckedUpdateInput> = z.object({
  rankId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userAddress: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RankLikeCreateManyInputSchema: z.ZodType<Prisma.RankLikeCreateManyInput> = z.object({
  rankId: z.string(),
  userAddress: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const RankLikeUpdateManyMutationInputSchema: z.ZodType<Prisma.RankLikeUpdateManyMutationInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RankLikeUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RankLikeUncheckedUpdateManyInput> = z.object({
  rankId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userAddress: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RankFavoriteCreateInputSchema: z.ZodType<Prisma.RankFavoriteCreateInput> = z.object({
  createdAt: z.coerce.date().optional(),
  rank: z.lazy(() => RankCreateNestedOneWithoutFavoritesInputSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutRankFavoritesInputSchema)
}).strict();

export const RankFavoriteUncheckedCreateInputSchema: z.ZodType<Prisma.RankFavoriteUncheckedCreateInput> = z.object({
  rankId: z.string(),
  userAddress: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const RankFavoriteUpdateInputSchema: z.ZodType<Prisma.RankFavoriteUpdateInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  rank: z.lazy(() => RankUpdateOneRequiredWithoutFavoritesNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutRankFavoritesNestedInputSchema).optional()
}).strict();

export const RankFavoriteUncheckedUpdateInputSchema: z.ZodType<Prisma.RankFavoriteUncheckedUpdateInput> = z.object({
  rankId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userAddress: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RankFavoriteCreateManyInputSchema: z.ZodType<Prisma.RankFavoriteCreateManyInput> = z.object({
  rankId: z.string(),
  userAddress: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const RankFavoriteUpdateManyMutationInputSchema: z.ZodType<Prisma.RankFavoriteUpdateManyMutationInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RankFavoriteUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RankFavoriteUncheckedUpdateManyInput> = z.object({
  rankId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userAddress: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SoftwareLikeCreateInputSchema: z.ZodType<Prisma.SoftwareLikeCreateInput> = z.object({
  createdAt: z.coerce.date().optional(),
  software: z.lazy(() => SoftwareCreateNestedOneWithoutLikesInputSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutSoftwareLikesInputSchema)
}).strict();

export const SoftwareLikeUncheckedCreateInputSchema: z.ZodType<Prisma.SoftwareLikeUncheckedCreateInput> = z.object({
  softwareId: z.string(),
  userAddress: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const SoftwareLikeUpdateInputSchema: z.ZodType<Prisma.SoftwareLikeUpdateInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  software: z.lazy(() => SoftwareUpdateOneRequiredWithoutLikesNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSoftwareLikesNestedInputSchema).optional()
}).strict();

export const SoftwareLikeUncheckedUpdateInputSchema: z.ZodType<Prisma.SoftwareLikeUncheckedUpdateInput> = z.object({
  softwareId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userAddress: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SoftwareLikeCreateManyInputSchema: z.ZodType<Prisma.SoftwareLikeCreateManyInput> = z.object({
  softwareId: z.string(),
  userAddress: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const SoftwareLikeUpdateManyMutationInputSchema: z.ZodType<Prisma.SoftwareLikeUpdateManyMutationInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SoftwareLikeUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SoftwareLikeUncheckedUpdateManyInput> = z.object({
  softwareId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userAddress: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SoftwareFavoriteCreateInputSchema: z.ZodType<Prisma.SoftwareFavoriteCreateInput> = z.object({
  createdAt: z.coerce.date().optional(),
  software: z.lazy(() => SoftwareCreateNestedOneWithoutFavoritesInputSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutSoftwareFavoritesInputSchema)
}).strict();

export const SoftwareFavoriteUncheckedCreateInputSchema: z.ZodType<Prisma.SoftwareFavoriteUncheckedCreateInput> = z.object({
  softwareId: z.string(),
  userAddress: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const SoftwareFavoriteUpdateInputSchema: z.ZodType<Prisma.SoftwareFavoriteUpdateInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  software: z.lazy(() => SoftwareUpdateOneRequiredWithoutFavoritesNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSoftwareFavoritesNestedInputSchema).optional()
}).strict();

export const SoftwareFavoriteUncheckedUpdateInputSchema: z.ZodType<Prisma.SoftwareFavoriteUncheckedUpdateInput> = z.object({
  softwareId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userAddress: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SoftwareFavoriteCreateManyInputSchema: z.ZodType<Prisma.SoftwareFavoriteCreateManyInput> = z.object({
  softwareId: z.string(),
  userAddress: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const SoftwareFavoriteUpdateManyMutationInputSchema: z.ZodType<Prisma.SoftwareFavoriteUpdateManyMutationInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SoftwareFavoriteUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SoftwareFavoriteUncheckedUpdateManyInput> = z.object({
  softwareId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userAddress: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RankCommentCreateInputSchema: z.ZodType<Prisma.RankCommentCreateInput> = z.object({
  id: z.string().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  replyToComment: z.string().optional().nullable(),
  replyToUser: z.string().optional().nullable(),
  rootCommentId: z.string().optional().nullable(),
  rank: z.lazy(() => RankCreateNestedOneWithoutCommentsInputSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutRankCommentsInputSchema)
}).strict();

export const RankCommentUncheckedCreateInputSchema: z.ZodType<Prisma.RankCommentUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  rankId: z.string(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  userAddress: z.string(),
  deletedAt: z.coerce.date().optional().nullable(),
  replyToComment: z.string().optional().nullable(),
  replyToUser: z.string().optional().nullable(),
  rootCommentId: z.string().optional().nullable()
}).strict();

export const RankCommentUpdateInputSchema: z.ZodType<Prisma.RankCommentUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  replyToComment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  replyToUser: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rootCommentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rank: z.lazy(() => RankUpdateOneRequiredWithoutCommentsNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutRankCommentsNestedInputSchema).optional()
}).strict();

export const RankCommentUncheckedUpdateInputSchema: z.ZodType<Prisma.RankCommentUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rankId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userAddress: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  replyToComment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  replyToUser: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rootCommentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const RankCommentCreateManyInputSchema: z.ZodType<Prisma.RankCommentCreateManyInput> = z.object({
  id: z.string().optional(),
  rankId: z.string(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  userAddress: z.string(),
  deletedAt: z.coerce.date().optional().nullable(),
  replyToComment: z.string().optional().nullable(),
  replyToUser: z.string().optional().nullable(),
  rootCommentId: z.string().optional().nullable()
}).strict();

export const RankCommentUpdateManyMutationInputSchema: z.ZodType<Prisma.RankCommentUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  replyToComment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  replyToUser: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rootCommentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const RankCommentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RankCommentUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rankId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userAddress: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  replyToComment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  replyToUser: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rootCommentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const EnumPlatformFilterSchema: z.ZodType<Prisma.EnumPlatformFilter> = z.object({
  equals: z.lazy(() => PlatformSchema).optional(),
  in: z.lazy(() => PlatformSchema).array().optional(),
  notIn: z.lazy(() => PlatformSchema).array().optional(),
  not: z.union([ z.lazy(() => PlatformSchema),z.lazy(() => NestedEnumPlatformFilterSchema) ]).optional(),
}).strict();

export const UserScalarRelationFilterSchema: z.ZodType<Prisma.UserScalarRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserPlatformUserAddressPlatformCompoundUniqueInputSchema: z.ZodType<Prisma.UserPlatformUserAddressPlatformCompoundUniqueInput> = z.object({
  userAddress: z.string(),
  platform: z.lazy(() => PlatformSchema)
}).strict();

export const UserPlatformCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserPlatformCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  platform: z.lazy(() => SortOrderSchema).optional(),
  platformId: z.lazy(() => SortOrderSchema).optional(),
  platformName: z.lazy(() => SortOrderSchema).optional(),
  platformAvatar: z.lazy(() => SortOrderSchema).optional(),
  userAddress: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserPlatformMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserPlatformMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  platform: z.lazy(() => SortOrderSchema).optional(),
  platformId: z.lazy(() => SortOrderSchema).optional(),
  platformName: z.lazy(() => SortOrderSchema).optional(),
  platformAvatar: z.lazy(() => SortOrderSchema).optional(),
  userAddress: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserPlatformMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserPlatformMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  platform: z.lazy(() => SortOrderSchema).optional(),
  platformId: z.lazy(() => SortOrderSchema).optional(),
  platformName: z.lazy(() => SortOrderSchema).optional(),
  platformAvatar: z.lazy(() => SortOrderSchema).optional(),
  userAddress: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const EnumPlatformWithAggregatesFilterSchema: z.ZodType<Prisma.EnumPlatformWithAggregatesFilter> = z.object({
  equals: z.lazy(() => PlatformSchema).optional(),
  in: z.lazy(() => PlatformSchema).array().optional(),
  notIn: z.lazy(() => PlatformSchema).array().optional(),
  not: z.union([ z.lazy(() => PlatformSchema),z.lazy(() => NestedEnumPlatformWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumPlatformFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumPlatformFilterSchema).optional()
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const ApiKeyNameUserAddressCompoundUniqueInputSchema: z.ZodType<Prisma.ApiKeyNameUserAddressCompoundUniqueInput> = z.object({
  name: z.string(),
  userAddress: z.string()
}).strict();

export const ApiKeyCountOrderByAggregateInputSchema: z.ZodType<Prisma.ApiKeyCountOrderByAggregateInput> = z.object({
  key: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  userAddress: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  expiredAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ApiKeyMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ApiKeyMaxOrderByAggregateInput> = z.object({
  key: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  userAddress: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  expiredAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ApiKeyMinOrderByAggregateInputSchema: z.ZodType<Prisma.ApiKeyMinOrderByAggregateInput> = z.object({
  key: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  userAddress: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  expiredAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const StringNullableListFilterSchema: z.ZodType<Prisma.StringNullableListFilter> = z.object({
  equals: z.string().array().optional().nullable(),
  has: z.string().optional().nullable(),
  hasEvery: z.string().array().optional(),
  hasSome: z.string().array().optional(),
  isEmpty: z.boolean().optional()
}).strict();

export const RankListRelationFilterSchema: z.ZodType<Prisma.RankListRelationFilter> = z.object({
  every: z.lazy(() => RankWhereInputSchema).optional(),
  some: z.lazy(() => RankWhereInputSchema).optional(),
  none: z.lazy(() => RankWhereInputSchema).optional()
}).strict();

export const UserPlatformListRelationFilterSchema: z.ZodType<Prisma.UserPlatformListRelationFilter> = z.object({
  every: z.lazy(() => UserPlatformWhereInputSchema).optional(),
  some: z.lazy(() => UserPlatformWhereInputSchema).optional(),
  none: z.lazy(() => UserPlatformWhereInputSchema).optional()
}).strict();

export const ArticleListRelationFilterSchema: z.ZodType<Prisma.ArticleListRelationFilter> = z.object({
  every: z.lazy(() => ArticleWhereInputSchema).optional(),
  some: z.lazy(() => ArticleWhereInputSchema).optional(),
  none: z.lazy(() => ArticleWhereInputSchema).optional()
}).strict();

export const RankLikeListRelationFilterSchema: z.ZodType<Prisma.RankLikeListRelationFilter> = z.object({
  every: z.lazy(() => RankLikeWhereInputSchema).optional(),
  some: z.lazy(() => RankLikeWhereInputSchema).optional(),
  none: z.lazy(() => RankLikeWhereInputSchema).optional()
}).strict();

export const RankFavoriteListRelationFilterSchema: z.ZodType<Prisma.RankFavoriteListRelationFilter> = z.object({
  every: z.lazy(() => RankFavoriteWhereInputSchema).optional(),
  some: z.lazy(() => RankFavoriteWhereInputSchema).optional(),
  none: z.lazy(() => RankFavoriteWhereInputSchema).optional()
}).strict();

export const SoftwareLikeListRelationFilterSchema: z.ZodType<Prisma.SoftwareLikeListRelationFilter> = z.object({
  every: z.lazy(() => SoftwareLikeWhereInputSchema).optional(),
  some: z.lazy(() => SoftwareLikeWhereInputSchema).optional(),
  none: z.lazy(() => SoftwareLikeWhereInputSchema).optional()
}).strict();

export const SoftwareFavoriteListRelationFilterSchema: z.ZodType<Prisma.SoftwareFavoriteListRelationFilter> = z.object({
  every: z.lazy(() => SoftwareFavoriteWhereInputSchema).optional(),
  some: z.lazy(() => SoftwareFavoriteWhereInputSchema).optional(),
  none: z.lazy(() => SoftwareFavoriteWhereInputSchema).optional()
}).strict();

export const RankCommentListRelationFilterSchema: z.ZodType<Prisma.RankCommentListRelationFilter> = z.object({
  every: z.lazy(() => RankCommentWhereInputSchema).optional(),
  some: z.lazy(() => RankCommentWhereInputSchema).optional(),
  none: z.lazy(() => RankCommentWhereInputSchema).optional()
}).strict();

export const RankOrderByRelationAggregateInputSchema: z.ZodType<Prisma.RankOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserPlatformOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UserPlatformOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ArticleOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ArticleOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RankLikeOrderByRelationAggregateInputSchema: z.ZodType<Prisma.RankLikeOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RankFavoriteOrderByRelationAggregateInputSchema: z.ZodType<Prisma.RankFavoriteOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SoftwareLikeOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SoftwareLikeOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SoftwareFavoriteOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SoftwareFavoriteOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RankCommentOrderByRelationAggregateInputSchema: z.ZodType<Prisma.RankCommentOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  address: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  referralCode: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  invitedBy: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  address: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  referralCode: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  address: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  referralCode: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RankTagListRelationFilterSchema: z.ZodType<Prisma.RankTagListRelationFilter> = z.object({
  every: z.lazy(() => RankTagWhereInputSchema).optional(),
  some: z.lazy(() => RankTagWhereInputSchema).optional(),
  none: z.lazy(() => RankTagWhereInputSchema).optional()
}).strict();

export const SoftwareTagListRelationFilterSchema: z.ZodType<Prisma.SoftwareTagListRelationFilter> = z.object({
  every: z.lazy(() => SoftwareTagWhereInputSchema).optional(),
  some: z.lazy(() => SoftwareTagWhereInputSchema).optional(),
  none: z.lazy(() => SoftwareTagWhereInputSchema).optional()
}).strict();

export const RankTagOrderByRelationAggregateInputSchema: z.ZodType<Prisma.RankTagOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SoftwareTagOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SoftwareTagOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TagCountOrderByAggregateInputSchema: z.ZodType<Prisma.TagCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TagMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TagMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TagMinOrderByAggregateInputSchema: z.ZodType<Prisma.TagMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SoftwareOnRankListRelationFilterSchema: z.ZodType<Prisma.SoftwareOnRankListRelationFilter> = z.object({
  every: z.lazy(() => SoftwareOnRankWhereInputSchema).optional(),
  some: z.lazy(() => SoftwareOnRankWhereInputSchema).optional(),
  none: z.lazy(() => SoftwareOnRankWhereInputSchema).optional()
}).strict();

export const SoftwareOnRankOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SoftwareOnRankOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RankCountOrderByAggregateInputSchema: z.ZodType<Prisma.RankCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userAddress: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RankMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RankMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userAddress: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RankMinOrderByAggregateInputSchema: z.ZodType<Prisma.RankMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userAddress: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TagScalarRelationFilterSchema: z.ZodType<Prisma.TagScalarRelationFilter> = z.object({
  is: z.lazy(() => TagWhereInputSchema).optional(),
  isNot: z.lazy(() => TagWhereInputSchema).optional()
}).strict();

export const RankScalarRelationFilterSchema: z.ZodType<Prisma.RankScalarRelationFilter> = z.object({
  is: z.lazy(() => RankWhereInputSchema).optional(),
  isNot: z.lazy(() => RankWhereInputSchema).optional()
}).strict();

export const RankTagTagIdRankIdCompoundUniqueInputSchema: z.ZodType<Prisma.RankTagTagIdRankIdCompoundUniqueInput> = z.object({
  tagId: z.string(),
  rankId: z.string()
}).strict();

export const RankTagCountOrderByAggregateInputSchema: z.ZodType<Prisma.RankTagCountOrderByAggregateInput> = z.object({
  tagId: z.lazy(() => SortOrderSchema).optional(),
  rankId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RankTagMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RankTagMaxOrderByAggregateInput> = z.object({
  tagId: z.lazy(() => SortOrderSchema).optional(),
  rankId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RankTagMinOrderByAggregateInputSchema: z.ZodType<Prisma.RankTagMinOrderByAggregateInput> = z.object({
  tagId: z.lazy(() => SortOrderSchema).optional(),
  rankId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SoftwareOnArticleListRelationFilterSchema: z.ZodType<Prisma.SoftwareOnArticleListRelationFilter> = z.object({
  every: z.lazy(() => SoftwareOnArticleWhereInputSchema).optional(),
  some: z.lazy(() => SoftwareOnArticleWhereInputSchema).optional(),
  none: z.lazy(() => SoftwareOnArticleWhereInputSchema).optional()
}).strict();

export const SoftwareOnArticleOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SoftwareOnArticleOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SoftwareCountOrderByAggregateInputSchema: z.ZodType<Prisma.SoftwareCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SoftwareMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SoftwareMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SoftwareMinOrderByAggregateInputSchema: z.ZodType<Prisma.SoftwareMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SoftwareScalarRelationFilterSchema: z.ZodType<Prisma.SoftwareScalarRelationFilter> = z.object({
  is: z.lazy(() => SoftwareWhereInputSchema).optional(),
  isNot: z.lazy(() => SoftwareWhereInputSchema).optional()
}).strict();

export const SoftwareTagTagIdSoftwareIdCompoundUniqueInputSchema: z.ZodType<Prisma.SoftwareTagTagIdSoftwareIdCompoundUniqueInput> = z.object({
  tagId: z.string(),
  softwareId: z.string()
}).strict();

export const SoftwareTagCountOrderByAggregateInputSchema: z.ZodType<Prisma.SoftwareTagCountOrderByAggregateInput> = z.object({
  tagId: z.lazy(() => SortOrderSchema).optional(),
  softwareId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SoftwareTagMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SoftwareTagMaxOrderByAggregateInput> = z.object({
  tagId: z.lazy(() => SortOrderSchema).optional(),
  softwareId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SoftwareTagMinOrderByAggregateInputSchema: z.ZodType<Prisma.SoftwareTagMinOrderByAggregateInput> = z.object({
  tagId: z.lazy(() => SortOrderSchema).optional(),
  softwareId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const SoftwareOnRankSoftwareIdRankIdCompoundUniqueInputSchema: z.ZodType<Prisma.SoftwareOnRankSoftwareIdRankIdCompoundUniqueInput> = z.object({
  softwareId: z.string(),
  rankId: z.string()
}).strict();

export const SoftwareOnRankCountOrderByAggregateInputSchema: z.ZodType<Prisma.SoftwareOnRankCountOrderByAggregateInput> = z.object({
  softwareId: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  rankId: z.lazy(() => SortOrderSchema).optional(),
  rankIndex: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SoftwareOnRankAvgOrderByAggregateInputSchema: z.ZodType<Prisma.SoftwareOnRankAvgOrderByAggregateInput> = z.object({
  rankIndex: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SoftwareOnRankMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SoftwareOnRankMaxOrderByAggregateInput> = z.object({
  softwareId: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  rankId: z.lazy(() => SortOrderSchema).optional(),
  rankIndex: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SoftwareOnRankMinOrderByAggregateInputSchema: z.ZodType<Prisma.SoftwareOnRankMinOrderByAggregateInput> = z.object({
  softwareId: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  rankId: z.lazy(() => SortOrderSchema).optional(),
  rankIndex: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SoftwareOnRankSumOrderByAggregateInputSchema: z.ZodType<Prisma.SoftwareOnRankSumOrderByAggregateInput> = z.object({
  rankIndex: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const ArticleScalarRelationFilterSchema: z.ZodType<Prisma.ArticleScalarRelationFilter> = z.object({
  is: z.lazy(() => ArticleWhereInputSchema).optional(),
  isNot: z.lazy(() => ArticleWhereInputSchema).optional()
}).strict();

export const SoftwareOnArticleSoftwareIdArticleIdCompoundUniqueInputSchema: z.ZodType<Prisma.SoftwareOnArticleSoftwareIdArticleIdCompoundUniqueInput> = z.object({
  softwareId: z.string(),
  articleId: z.string()
}).strict();

export const SoftwareOnArticleCountOrderByAggregateInputSchema: z.ZodType<Prisma.SoftwareOnArticleCountOrderByAggregateInput> = z.object({
  softwareId: z.lazy(() => SortOrderSchema).optional(),
  articleId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SoftwareOnArticleMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SoftwareOnArticleMaxOrderByAggregateInput> = z.object({
  softwareId: z.lazy(() => SortOrderSchema).optional(),
  articleId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SoftwareOnArticleMinOrderByAggregateInputSchema: z.ZodType<Prisma.SoftwareOnArticleMinOrderByAggregateInput> = z.object({
  softwareId: z.lazy(() => SortOrderSchema).optional(),
  articleId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ArticleCountOrderByAggregateInputSchema: z.ZodType<Prisma.ArticleCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  rankId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userAddress: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ArticleMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ArticleMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  rankId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userAddress: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ArticleMinOrderByAggregateInputSchema: z.ZodType<Prisma.ArticleMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  rankId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userAddress: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RankLikeRankIdUserAddressCompoundUniqueInputSchema: z.ZodType<Prisma.RankLikeRankIdUserAddressCompoundUniqueInput> = z.object({
  rankId: z.string(),
  userAddress: z.string()
}).strict();

export const RankLikeCountOrderByAggregateInputSchema: z.ZodType<Prisma.RankLikeCountOrderByAggregateInput> = z.object({
  rankId: z.lazy(() => SortOrderSchema).optional(),
  userAddress: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RankLikeMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RankLikeMaxOrderByAggregateInput> = z.object({
  rankId: z.lazy(() => SortOrderSchema).optional(),
  userAddress: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RankLikeMinOrderByAggregateInputSchema: z.ZodType<Prisma.RankLikeMinOrderByAggregateInput> = z.object({
  rankId: z.lazy(() => SortOrderSchema).optional(),
  userAddress: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RankFavoriteRankIdUserAddressCompoundUniqueInputSchema: z.ZodType<Prisma.RankFavoriteRankIdUserAddressCompoundUniqueInput> = z.object({
  rankId: z.string(),
  userAddress: z.string()
}).strict();

export const RankFavoriteCountOrderByAggregateInputSchema: z.ZodType<Prisma.RankFavoriteCountOrderByAggregateInput> = z.object({
  rankId: z.lazy(() => SortOrderSchema).optional(),
  userAddress: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RankFavoriteMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RankFavoriteMaxOrderByAggregateInput> = z.object({
  rankId: z.lazy(() => SortOrderSchema).optional(),
  userAddress: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RankFavoriteMinOrderByAggregateInputSchema: z.ZodType<Prisma.RankFavoriteMinOrderByAggregateInput> = z.object({
  rankId: z.lazy(() => SortOrderSchema).optional(),
  userAddress: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SoftwareLikeSoftwareIdUserAddressCompoundUniqueInputSchema: z.ZodType<Prisma.SoftwareLikeSoftwareIdUserAddressCompoundUniqueInput> = z.object({
  softwareId: z.string(),
  userAddress: z.string()
}).strict();

export const SoftwareLikeCountOrderByAggregateInputSchema: z.ZodType<Prisma.SoftwareLikeCountOrderByAggregateInput> = z.object({
  softwareId: z.lazy(() => SortOrderSchema).optional(),
  userAddress: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SoftwareLikeMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SoftwareLikeMaxOrderByAggregateInput> = z.object({
  softwareId: z.lazy(() => SortOrderSchema).optional(),
  userAddress: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SoftwareLikeMinOrderByAggregateInputSchema: z.ZodType<Prisma.SoftwareLikeMinOrderByAggregateInput> = z.object({
  softwareId: z.lazy(() => SortOrderSchema).optional(),
  userAddress: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SoftwareFavoriteSoftwareIdUserAddressCompoundUniqueInputSchema: z.ZodType<Prisma.SoftwareFavoriteSoftwareIdUserAddressCompoundUniqueInput> = z.object({
  softwareId: z.string(),
  userAddress: z.string()
}).strict();

export const SoftwareFavoriteCountOrderByAggregateInputSchema: z.ZodType<Prisma.SoftwareFavoriteCountOrderByAggregateInput> = z.object({
  softwareId: z.lazy(() => SortOrderSchema).optional(),
  userAddress: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SoftwareFavoriteMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SoftwareFavoriteMaxOrderByAggregateInput> = z.object({
  softwareId: z.lazy(() => SortOrderSchema).optional(),
  userAddress: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SoftwareFavoriteMinOrderByAggregateInputSchema: z.ZodType<Prisma.SoftwareFavoriteMinOrderByAggregateInput> = z.object({
  softwareId: z.lazy(() => SortOrderSchema).optional(),
  userAddress: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RankCommentCountOrderByAggregateInputSchema: z.ZodType<Prisma.RankCommentCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rankId: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  userAddress: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.lazy(() => SortOrderSchema).optional(),
  replyToComment: z.lazy(() => SortOrderSchema).optional(),
  replyToUser: z.lazy(() => SortOrderSchema).optional(),
  rootCommentId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RankCommentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RankCommentMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rankId: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  userAddress: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.lazy(() => SortOrderSchema).optional(),
  replyToComment: z.lazy(() => SortOrderSchema).optional(),
  replyToUser: z.lazy(() => SortOrderSchema).optional(),
  rootCommentId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RankCommentMinOrderByAggregateInputSchema: z.ZodType<Prisma.RankCommentMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rankId: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  userAddress: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.lazy(() => SortOrderSchema).optional(),
  replyToComment: z.lazy(() => SortOrderSchema).optional(),
  replyToUser: z.lazy(() => SortOrderSchema).optional(),
  rootCommentId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutPlatformsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutPlatformsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPlatformsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPlatformsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPlatformsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const EnumPlatformFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumPlatformFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => PlatformSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutPlatformsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutPlatformsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPlatformsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPlatformsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPlatformsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutPlatformsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutPlatformsInputSchema),z.lazy(() => UserUpdateWithoutPlatformsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPlatformsInputSchema) ]).optional(),
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const UserCreateinvitedByInputSchema: z.ZodType<Prisma.UserCreateinvitedByInput> = z.object({
  set: z.string().array()
}).strict();

export const RankCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.RankCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => RankCreateWithoutUserInputSchema),z.lazy(() => RankCreateWithoutUserInputSchema).array(),z.lazy(() => RankUncheckedCreateWithoutUserInputSchema),z.lazy(() => RankUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RankCreateOrConnectWithoutUserInputSchema),z.lazy(() => RankCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RankCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RankWhereUniqueInputSchema),z.lazy(() => RankWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserPlatformCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.UserPlatformCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UserPlatformCreateWithoutUserInputSchema),z.lazy(() => UserPlatformCreateWithoutUserInputSchema).array(),z.lazy(() => UserPlatformUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserPlatformUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserPlatformCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserPlatformCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserPlatformCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserPlatformWhereUniqueInputSchema),z.lazy(() => UserPlatformWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ArticleCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.ArticleCreateNestedManyWithoutAuthorInput> = z.object({
  create: z.union([ z.lazy(() => ArticleCreateWithoutAuthorInputSchema),z.lazy(() => ArticleCreateWithoutAuthorInputSchema).array(),z.lazy(() => ArticleUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => ArticleUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ArticleCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => ArticleCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ArticleCreateManyAuthorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ArticleWhereUniqueInputSchema),z.lazy(() => ArticleWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RankLikeCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.RankLikeCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => RankLikeCreateWithoutUserInputSchema),z.lazy(() => RankLikeCreateWithoutUserInputSchema).array(),z.lazy(() => RankLikeUncheckedCreateWithoutUserInputSchema),z.lazy(() => RankLikeUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RankLikeCreateOrConnectWithoutUserInputSchema),z.lazy(() => RankLikeCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RankLikeCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RankLikeWhereUniqueInputSchema),z.lazy(() => RankLikeWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RankFavoriteCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.RankFavoriteCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => RankFavoriteCreateWithoutUserInputSchema),z.lazy(() => RankFavoriteCreateWithoutUserInputSchema).array(),z.lazy(() => RankFavoriteUncheckedCreateWithoutUserInputSchema),z.lazy(() => RankFavoriteUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RankFavoriteCreateOrConnectWithoutUserInputSchema),z.lazy(() => RankFavoriteCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RankFavoriteCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RankFavoriteWhereUniqueInputSchema),z.lazy(() => RankFavoriteWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SoftwareLikeCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SoftwareLikeCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SoftwareLikeCreateWithoutUserInputSchema),z.lazy(() => SoftwareLikeCreateWithoutUserInputSchema).array(),z.lazy(() => SoftwareLikeUncheckedCreateWithoutUserInputSchema),z.lazy(() => SoftwareLikeUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SoftwareLikeCreateOrConnectWithoutUserInputSchema),z.lazy(() => SoftwareLikeCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SoftwareLikeCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SoftwareLikeWhereUniqueInputSchema),z.lazy(() => SoftwareLikeWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SoftwareFavoriteCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SoftwareFavoriteCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SoftwareFavoriteCreateWithoutUserInputSchema),z.lazy(() => SoftwareFavoriteCreateWithoutUserInputSchema).array(),z.lazy(() => SoftwareFavoriteUncheckedCreateWithoutUserInputSchema),z.lazy(() => SoftwareFavoriteUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SoftwareFavoriteCreateOrConnectWithoutUserInputSchema),z.lazy(() => SoftwareFavoriteCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SoftwareFavoriteCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SoftwareFavoriteWhereUniqueInputSchema),z.lazy(() => SoftwareFavoriteWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RankCommentCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.RankCommentCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => RankCommentCreateWithoutUserInputSchema),z.lazy(() => RankCommentCreateWithoutUserInputSchema).array(),z.lazy(() => RankCommentUncheckedCreateWithoutUserInputSchema),z.lazy(() => RankCommentUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RankCommentCreateOrConnectWithoutUserInputSchema),z.lazy(() => RankCommentCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RankCommentCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RankCommentWhereUniqueInputSchema),z.lazy(() => RankCommentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RankUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.RankUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => RankCreateWithoutUserInputSchema),z.lazy(() => RankCreateWithoutUserInputSchema).array(),z.lazy(() => RankUncheckedCreateWithoutUserInputSchema),z.lazy(() => RankUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RankCreateOrConnectWithoutUserInputSchema),z.lazy(() => RankCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RankCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RankWhereUniqueInputSchema),z.lazy(() => RankWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserPlatformUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.UserPlatformUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UserPlatformCreateWithoutUserInputSchema),z.lazy(() => UserPlatformCreateWithoutUserInputSchema).array(),z.lazy(() => UserPlatformUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserPlatformUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserPlatformCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserPlatformCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserPlatformCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserPlatformWhereUniqueInputSchema),z.lazy(() => UserPlatformWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ArticleUncheckedCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.ArticleUncheckedCreateNestedManyWithoutAuthorInput> = z.object({
  create: z.union([ z.lazy(() => ArticleCreateWithoutAuthorInputSchema),z.lazy(() => ArticleCreateWithoutAuthorInputSchema).array(),z.lazy(() => ArticleUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => ArticleUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ArticleCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => ArticleCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ArticleCreateManyAuthorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ArticleWhereUniqueInputSchema),z.lazy(() => ArticleWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RankLikeUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.RankLikeUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => RankLikeCreateWithoutUserInputSchema),z.lazy(() => RankLikeCreateWithoutUserInputSchema).array(),z.lazy(() => RankLikeUncheckedCreateWithoutUserInputSchema),z.lazy(() => RankLikeUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RankLikeCreateOrConnectWithoutUserInputSchema),z.lazy(() => RankLikeCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RankLikeCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RankLikeWhereUniqueInputSchema),z.lazy(() => RankLikeWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RankFavoriteUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.RankFavoriteUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => RankFavoriteCreateWithoutUserInputSchema),z.lazy(() => RankFavoriteCreateWithoutUserInputSchema).array(),z.lazy(() => RankFavoriteUncheckedCreateWithoutUserInputSchema),z.lazy(() => RankFavoriteUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RankFavoriteCreateOrConnectWithoutUserInputSchema),z.lazy(() => RankFavoriteCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RankFavoriteCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RankFavoriteWhereUniqueInputSchema),z.lazy(() => RankFavoriteWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SoftwareLikeUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SoftwareLikeUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SoftwareLikeCreateWithoutUserInputSchema),z.lazy(() => SoftwareLikeCreateWithoutUserInputSchema).array(),z.lazy(() => SoftwareLikeUncheckedCreateWithoutUserInputSchema),z.lazy(() => SoftwareLikeUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SoftwareLikeCreateOrConnectWithoutUserInputSchema),z.lazy(() => SoftwareLikeCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SoftwareLikeCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SoftwareLikeWhereUniqueInputSchema),z.lazy(() => SoftwareLikeWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SoftwareFavoriteUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SoftwareFavoriteUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SoftwareFavoriteCreateWithoutUserInputSchema),z.lazy(() => SoftwareFavoriteCreateWithoutUserInputSchema).array(),z.lazy(() => SoftwareFavoriteUncheckedCreateWithoutUserInputSchema),z.lazy(() => SoftwareFavoriteUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SoftwareFavoriteCreateOrConnectWithoutUserInputSchema),z.lazy(() => SoftwareFavoriteCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SoftwareFavoriteCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SoftwareFavoriteWhereUniqueInputSchema),z.lazy(() => SoftwareFavoriteWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RankCommentUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.RankCommentUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => RankCommentCreateWithoutUserInputSchema),z.lazy(() => RankCommentCreateWithoutUserInputSchema).array(),z.lazy(() => RankCommentUncheckedCreateWithoutUserInputSchema),z.lazy(() => RankCommentUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RankCommentCreateOrConnectWithoutUserInputSchema),z.lazy(() => RankCommentCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RankCommentCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RankCommentWhereUniqueInputSchema),z.lazy(() => RankCommentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateinvitedByInputSchema: z.ZodType<Prisma.UserUpdateinvitedByInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const RankUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.RankUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => RankCreateWithoutUserInputSchema),z.lazy(() => RankCreateWithoutUserInputSchema).array(),z.lazy(() => RankUncheckedCreateWithoutUserInputSchema),z.lazy(() => RankUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RankCreateOrConnectWithoutUserInputSchema),z.lazy(() => RankCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RankUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => RankUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RankCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RankWhereUniqueInputSchema),z.lazy(() => RankWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RankWhereUniqueInputSchema),z.lazy(() => RankWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RankWhereUniqueInputSchema),z.lazy(() => RankWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RankWhereUniqueInputSchema),z.lazy(() => RankWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RankUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => RankUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RankUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => RankUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RankScalarWhereInputSchema),z.lazy(() => RankScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserPlatformUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.UserPlatformUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserPlatformCreateWithoutUserInputSchema),z.lazy(() => UserPlatformCreateWithoutUserInputSchema).array(),z.lazy(() => UserPlatformUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserPlatformUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserPlatformCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserPlatformCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserPlatformUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserPlatformUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserPlatformCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserPlatformWhereUniqueInputSchema),z.lazy(() => UserPlatformWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserPlatformWhereUniqueInputSchema),z.lazy(() => UserPlatformWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserPlatformWhereUniqueInputSchema),z.lazy(() => UserPlatformWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserPlatformWhereUniqueInputSchema),z.lazy(() => UserPlatformWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserPlatformUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserPlatformUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserPlatformUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => UserPlatformUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserPlatformScalarWhereInputSchema),z.lazy(() => UserPlatformScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ArticleUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.ArticleUpdateManyWithoutAuthorNestedInput> = z.object({
  create: z.union([ z.lazy(() => ArticleCreateWithoutAuthorInputSchema),z.lazy(() => ArticleCreateWithoutAuthorInputSchema).array(),z.lazy(() => ArticleUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => ArticleUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ArticleCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => ArticleCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ArticleUpsertWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => ArticleUpsertWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ArticleCreateManyAuthorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ArticleWhereUniqueInputSchema),z.lazy(() => ArticleWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ArticleWhereUniqueInputSchema),z.lazy(() => ArticleWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ArticleWhereUniqueInputSchema),z.lazy(() => ArticleWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ArticleWhereUniqueInputSchema),z.lazy(() => ArticleWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ArticleUpdateWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => ArticleUpdateWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ArticleUpdateManyWithWhereWithoutAuthorInputSchema),z.lazy(() => ArticleUpdateManyWithWhereWithoutAuthorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ArticleScalarWhereInputSchema),z.lazy(() => ArticleScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RankLikeUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.RankLikeUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => RankLikeCreateWithoutUserInputSchema),z.lazy(() => RankLikeCreateWithoutUserInputSchema).array(),z.lazy(() => RankLikeUncheckedCreateWithoutUserInputSchema),z.lazy(() => RankLikeUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RankLikeCreateOrConnectWithoutUserInputSchema),z.lazy(() => RankLikeCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RankLikeUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => RankLikeUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RankLikeCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RankLikeWhereUniqueInputSchema),z.lazy(() => RankLikeWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RankLikeWhereUniqueInputSchema),z.lazy(() => RankLikeWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RankLikeWhereUniqueInputSchema),z.lazy(() => RankLikeWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RankLikeWhereUniqueInputSchema),z.lazy(() => RankLikeWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RankLikeUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => RankLikeUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RankLikeUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => RankLikeUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RankLikeScalarWhereInputSchema),z.lazy(() => RankLikeScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RankFavoriteUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.RankFavoriteUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => RankFavoriteCreateWithoutUserInputSchema),z.lazy(() => RankFavoriteCreateWithoutUserInputSchema).array(),z.lazy(() => RankFavoriteUncheckedCreateWithoutUserInputSchema),z.lazy(() => RankFavoriteUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RankFavoriteCreateOrConnectWithoutUserInputSchema),z.lazy(() => RankFavoriteCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RankFavoriteUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => RankFavoriteUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RankFavoriteCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RankFavoriteWhereUniqueInputSchema),z.lazy(() => RankFavoriteWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RankFavoriteWhereUniqueInputSchema),z.lazy(() => RankFavoriteWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RankFavoriteWhereUniqueInputSchema),z.lazy(() => RankFavoriteWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RankFavoriteWhereUniqueInputSchema),z.lazy(() => RankFavoriteWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RankFavoriteUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => RankFavoriteUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RankFavoriteUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => RankFavoriteUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RankFavoriteScalarWhereInputSchema),z.lazy(() => RankFavoriteScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SoftwareLikeUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SoftwareLikeUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SoftwareLikeCreateWithoutUserInputSchema),z.lazy(() => SoftwareLikeCreateWithoutUserInputSchema).array(),z.lazy(() => SoftwareLikeUncheckedCreateWithoutUserInputSchema),z.lazy(() => SoftwareLikeUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SoftwareLikeCreateOrConnectWithoutUserInputSchema),z.lazy(() => SoftwareLikeCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SoftwareLikeUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SoftwareLikeUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SoftwareLikeCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SoftwareLikeWhereUniqueInputSchema),z.lazy(() => SoftwareLikeWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SoftwareLikeWhereUniqueInputSchema),z.lazy(() => SoftwareLikeWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SoftwareLikeWhereUniqueInputSchema),z.lazy(() => SoftwareLikeWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SoftwareLikeWhereUniqueInputSchema),z.lazy(() => SoftwareLikeWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SoftwareLikeUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SoftwareLikeUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SoftwareLikeUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SoftwareLikeUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SoftwareLikeScalarWhereInputSchema),z.lazy(() => SoftwareLikeScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SoftwareFavoriteUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SoftwareFavoriteUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SoftwareFavoriteCreateWithoutUserInputSchema),z.lazy(() => SoftwareFavoriteCreateWithoutUserInputSchema).array(),z.lazy(() => SoftwareFavoriteUncheckedCreateWithoutUserInputSchema),z.lazy(() => SoftwareFavoriteUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SoftwareFavoriteCreateOrConnectWithoutUserInputSchema),z.lazy(() => SoftwareFavoriteCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SoftwareFavoriteUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SoftwareFavoriteUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SoftwareFavoriteCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SoftwareFavoriteWhereUniqueInputSchema),z.lazy(() => SoftwareFavoriteWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SoftwareFavoriteWhereUniqueInputSchema),z.lazy(() => SoftwareFavoriteWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SoftwareFavoriteWhereUniqueInputSchema),z.lazy(() => SoftwareFavoriteWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SoftwareFavoriteWhereUniqueInputSchema),z.lazy(() => SoftwareFavoriteWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SoftwareFavoriteUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SoftwareFavoriteUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SoftwareFavoriteUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SoftwareFavoriteUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SoftwareFavoriteScalarWhereInputSchema),z.lazy(() => SoftwareFavoriteScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RankCommentUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.RankCommentUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => RankCommentCreateWithoutUserInputSchema),z.lazy(() => RankCommentCreateWithoutUserInputSchema).array(),z.lazy(() => RankCommentUncheckedCreateWithoutUserInputSchema),z.lazy(() => RankCommentUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RankCommentCreateOrConnectWithoutUserInputSchema),z.lazy(() => RankCommentCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RankCommentUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => RankCommentUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RankCommentCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RankCommentWhereUniqueInputSchema),z.lazy(() => RankCommentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RankCommentWhereUniqueInputSchema),z.lazy(() => RankCommentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RankCommentWhereUniqueInputSchema),z.lazy(() => RankCommentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RankCommentWhereUniqueInputSchema),z.lazy(() => RankCommentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RankCommentUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => RankCommentUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RankCommentUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => RankCommentUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RankCommentScalarWhereInputSchema),z.lazy(() => RankCommentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RankUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.RankUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => RankCreateWithoutUserInputSchema),z.lazy(() => RankCreateWithoutUserInputSchema).array(),z.lazy(() => RankUncheckedCreateWithoutUserInputSchema),z.lazy(() => RankUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RankCreateOrConnectWithoutUserInputSchema),z.lazy(() => RankCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RankUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => RankUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RankCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RankWhereUniqueInputSchema),z.lazy(() => RankWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RankWhereUniqueInputSchema),z.lazy(() => RankWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RankWhereUniqueInputSchema),z.lazy(() => RankWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RankWhereUniqueInputSchema),z.lazy(() => RankWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RankUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => RankUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RankUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => RankUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RankScalarWhereInputSchema),z.lazy(() => RankScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserPlatformUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.UserPlatformUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserPlatformCreateWithoutUserInputSchema),z.lazy(() => UserPlatformCreateWithoutUserInputSchema).array(),z.lazy(() => UserPlatformUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserPlatformUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserPlatformCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserPlatformCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserPlatformUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserPlatformUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserPlatformCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserPlatformWhereUniqueInputSchema),z.lazy(() => UserPlatformWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserPlatformWhereUniqueInputSchema),z.lazy(() => UserPlatformWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserPlatformWhereUniqueInputSchema),z.lazy(() => UserPlatformWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserPlatformWhereUniqueInputSchema),z.lazy(() => UserPlatformWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserPlatformUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserPlatformUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserPlatformUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => UserPlatformUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserPlatformScalarWhereInputSchema),z.lazy(() => UserPlatformScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ArticleUncheckedUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.ArticleUncheckedUpdateManyWithoutAuthorNestedInput> = z.object({
  create: z.union([ z.lazy(() => ArticleCreateWithoutAuthorInputSchema),z.lazy(() => ArticleCreateWithoutAuthorInputSchema).array(),z.lazy(() => ArticleUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => ArticleUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ArticleCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => ArticleCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ArticleUpsertWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => ArticleUpsertWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ArticleCreateManyAuthorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ArticleWhereUniqueInputSchema),z.lazy(() => ArticleWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ArticleWhereUniqueInputSchema),z.lazy(() => ArticleWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ArticleWhereUniqueInputSchema),z.lazy(() => ArticleWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ArticleWhereUniqueInputSchema),z.lazy(() => ArticleWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ArticleUpdateWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => ArticleUpdateWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ArticleUpdateManyWithWhereWithoutAuthorInputSchema),z.lazy(() => ArticleUpdateManyWithWhereWithoutAuthorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ArticleScalarWhereInputSchema),z.lazy(() => ArticleScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RankLikeUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.RankLikeUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => RankLikeCreateWithoutUserInputSchema),z.lazy(() => RankLikeCreateWithoutUserInputSchema).array(),z.lazy(() => RankLikeUncheckedCreateWithoutUserInputSchema),z.lazy(() => RankLikeUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RankLikeCreateOrConnectWithoutUserInputSchema),z.lazy(() => RankLikeCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RankLikeUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => RankLikeUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RankLikeCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RankLikeWhereUniqueInputSchema),z.lazy(() => RankLikeWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RankLikeWhereUniqueInputSchema),z.lazy(() => RankLikeWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RankLikeWhereUniqueInputSchema),z.lazy(() => RankLikeWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RankLikeWhereUniqueInputSchema),z.lazy(() => RankLikeWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RankLikeUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => RankLikeUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RankLikeUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => RankLikeUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RankLikeScalarWhereInputSchema),z.lazy(() => RankLikeScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RankFavoriteUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.RankFavoriteUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => RankFavoriteCreateWithoutUserInputSchema),z.lazy(() => RankFavoriteCreateWithoutUserInputSchema).array(),z.lazy(() => RankFavoriteUncheckedCreateWithoutUserInputSchema),z.lazy(() => RankFavoriteUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RankFavoriteCreateOrConnectWithoutUserInputSchema),z.lazy(() => RankFavoriteCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RankFavoriteUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => RankFavoriteUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RankFavoriteCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RankFavoriteWhereUniqueInputSchema),z.lazy(() => RankFavoriteWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RankFavoriteWhereUniqueInputSchema),z.lazy(() => RankFavoriteWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RankFavoriteWhereUniqueInputSchema),z.lazy(() => RankFavoriteWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RankFavoriteWhereUniqueInputSchema),z.lazy(() => RankFavoriteWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RankFavoriteUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => RankFavoriteUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RankFavoriteUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => RankFavoriteUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RankFavoriteScalarWhereInputSchema),z.lazy(() => RankFavoriteScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SoftwareLikeUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SoftwareLikeUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SoftwareLikeCreateWithoutUserInputSchema),z.lazy(() => SoftwareLikeCreateWithoutUserInputSchema).array(),z.lazy(() => SoftwareLikeUncheckedCreateWithoutUserInputSchema),z.lazy(() => SoftwareLikeUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SoftwareLikeCreateOrConnectWithoutUserInputSchema),z.lazy(() => SoftwareLikeCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SoftwareLikeUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SoftwareLikeUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SoftwareLikeCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SoftwareLikeWhereUniqueInputSchema),z.lazy(() => SoftwareLikeWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SoftwareLikeWhereUniqueInputSchema),z.lazy(() => SoftwareLikeWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SoftwareLikeWhereUniqueInputSchema),z.lazy(() => SoftwareLikeWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SoftwareLikeWhereUniqueInputSchema),z.lazy(() => SoftwareLikeWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SoftwareLikeUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SoftwareLikeUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SoftwareLikeUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SoftwareLikeUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SoftwareLikeScalarWhereInputSchema),z.lazy(() => SoftwareLikeScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SoftwareFavoriteUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SoftwareFavoriteUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SoftwareFavoriteCreateWithoutUserInputSchema),z.lazy(() => SoftwareFavoriteCreateWithoutUserInputSchema).array(),z.lazy(() => SoftwareFavoriteUncheckedCreateWithoutUserInputSchema),z.lazy(() => SoftwareFavoriteUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SoftwareFavoriteCreateOrConnectWithoutUserInputSchema),z.lazy(() => SoftwareFavoriteCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SoftwareFavoriteUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SoftwareFavoriteUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SoftwareFavoriteCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SoftwareFavoriteWhereUniqueInputSchema),z.lazy(() => SoftwareFavoriteWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SoftwareFavoriteWhereUniqueInputSchema),z.lazy(() => SoftwareFavoriteWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SoftwareFavoriteWhereUniqueInputSchema),z.lazy(() => SoftwareFavoriteWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SoftwareFavoriteWhereUniqueInputSchema),z.lazy(() => SoftwareFavoriteWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SoftwareFavoriteUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SoftwareFavoriteUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SoftwareFavoriteUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SoftwareFavoriteUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SoftwareFavoriteScalarWhereInputSchema),z.lazy(() => SoftwareFavoriteScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RankCommentUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.RankCommentUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => RankCommentCreateWithoutUserInputSchema),z.lazy(() => RankCommentCreateWithoutUserInputSchema).array(),z.lazy(() => RankCommentUncheckedCreateWithoutUserInputSchema),z.lazy(() => RankCommentUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RankCommentCreateOrConnectWithoutUserInputSchema),z.lazy(() => RankCommentCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RankCommentUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => RankCommentUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RankCommentCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RankCommentWhereUniqueInputSchema),z.lazy(() => RankCommentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RankCommentWhereUniqueInputSchema),z.lazy(() => RankCommentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RankCommentWhereUniqueInputSchema),z.lazy(() => RankCommentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RankCommentWhereUniqueInputSchema),z.lazy(() => RankCommentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RankCommentUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => RankCommentUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RankCommentUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => RankCommentUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RankCommentScalarWhereInputSchema),z.lazy(() => RankCommentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RankTagCreateNestedManyWithoutTagInputSchema: z.ZodType<Prisma.RankTagCreateNestedManyWithoutTagInput> = z.object({
  create: z.union([ z.lazy(() => RankTagCreateWithoutTagInputSchema),z.lazy(() => RankTagCreateWithoutTagInputSchema).array(),z.lazy(() => RankTagUncheckedCreateWithoutTagInputSchema),z.lazy(() => RankTagUncheckedCreateWithoutTagInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RankTagCreateOrConnectWithoutTagInputSchema),z.lazy(() => RankTagCreateOrConnectWithoutTagInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RankTagCreateManyTagInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RankTagWhereUniqueInputSchema),z.lazy(() => RankTagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SoftwareTagCreateNestedManyWithoutTagInputSchema: z.ZodType<Prisma.SoftwareTagCreateNestedManyWithoutTagInput> = z.object({
  create: z.union([ z.lazy(() => SoftwareTagCreateWithoutTagInputSchema),z.lazy(() => SoftwareTagCreateWithoutTagInputSchema).array(),z.lazy(() => SoftwareTagUncheckedCreateWithoutTagInputSchema),z.lazy(() => SoftwareTagUncheckedCreateWithoutTagInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SoftwareTagCreateOrConnectWithoutTagInputSchema),z.lazy(() => SoftwareTagCreateOrConnectWithoutTagInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SoftwareTagCreateManyTagInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SoftwareTagWhereUniqueInputSchema),z.lazy(() => SoftwareTagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RankTagUncheckedCreateNestedManyWithoutTagInputSchema: z.ZodType<Prisma.RankTagUncheckedCreateNestedManyWithoutTagInput> = z.object({
  create: z.union([ z.lazy(() => RankTagCreateWithoutTagInputSchema),z.lazy(() => RankTagCreateWithoutTagInputSchema).array(),z.lazy(() => RankTagUncheckedCreateWithoutTagInputSchema),z.lazy(() => RankTagUncheckedCreateWithoutTagInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RankTagCreateOrConnectWithoutTagInputSchema),z.lazy(() => RankTagCreateOrConnectWithoutTagInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RankTagCreateManyTagInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RankTagWhereUniqueInputSchema),z.lazy(() => RankTagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SoftwareTagUncheckedCreateNestedManyWithoutTagInputSchema: z.ZodType<Prisma.SoftwareTagUncheckedCreateNestedManyWithoutTagInput> = z.object({
  create: z.union([ z.lazy(() => SoftwareTagCreateWithoutTagInputSchema),z.lazy(() => SoftwareTagCreateWithoutTagInputSchema).array(),z.lazy(() => SoftwareTagUncheckedCreateWithoutTagInputSchema),z.lazy(() => SoftwareTagUncheckedCreateWithoutTagInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SoftwareTagCreateOrConnectWithoutTagInputSchema),z.lazy(() => SoftwareTagCreateOrConnectWithoutTagInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SoftwareTagCreateManyTagInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SoftwareTagWhereUniqueInputSchema),z.lazy(() => SoftwareTagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RankTagUpdateManyWithoutTagNestedInputSchema: z.ZodType<Prisma.RankTagUpdateManyWithoutTagNestedInput> = z.object({
  create: z.union([ z.lazy(() => RankTagCreateWithoutTagInputSchema),z.lazy(() => RankTagCreateWithoutTagInputSchema).array(),z.lazy(() => RankTagUncheckedCreateWithoutTagInputSchema),z.lazy(() => RankTagUncheckedCreateWithoutTagInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RankTagCreateOrConnectWithoutTagInputSchema),z.lazy(() => RankTagCreateOrConnectWithoutTagInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RankTagUpsertWithWhereUniqueWithoutTagInputSchema),z.lazy(() => RankTagUpsertWithWhereUniqueWithoutTagInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RankTagCreateManyTagInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RankTagWhereUniqueInputSchema),z.lazy(() => RankTagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RankTagWhereUniqueInputSchema),z.lazy(() => RankTagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RankTagWhereUniqueInputSchema),z.lazy(() => RankTagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RankTagWhereUniqueInputSchema),z.lazy(() => RankTagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RankTagUpdateWithWhereUniqueWithoutTagInputSchema),z.lazy(() => RankTagUpdateWithWhereUniqueWithoutTagInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RankTagUpdateManyWithWhereWithoutTagInputSchema),z.lazy(() => RankTagUpdateManyWithWhereWithoutTagInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RankTagScalarWhereInputSchema),z.lazy(() => RankTagScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SoftwareTagUpdateManyWithoutTagNestedInputSchema: z.ZodType<Prisma.SoftwareTagUpdateManyWithoutTagNestedInput> = z.object({
  create: z.union([ z.lazy(() => SoftwareTagCreateWithoutTagInputSchema),z.lazy(() => SoftwareTagCreateWithoutTagInputSchema).array(),z.lazy(() => SoftwareTagUncheckedCreateWithoutTagInputSchema),z.lazy(() => SoftwareTagUncheckedCreateWithoutTagInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SoftwareTagCreateOrConnectWithoutTagInputSchema),z.lazy(() => SoftwareTagCreateOrConnectWithoutTagInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SoftwareTagUpsertWithWhereUniqueWithoutTagInputSchema),z.lazy(() => SoftwareTagUpsertWithWhereUniqueWithoutTagInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SoftwareTagCreateManyTagInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SoftwareTagWhereUniqueInputSchema),z.lazy(() => SoftwareTagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SoftwareTagWhereUniqueInputSchema),z.lazy(() => SoftwareTagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SoftwareTagWhereUniqueInputSchema),z.lazy(() => SoftwareTagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SoftwareTagWhereUniqueInputSchema),z.lazy(() => SoftwareTagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SoftwareTagUpdateWithWhereUniqueWithoutTagInputSchema),z.lazy(() => SoftwareTagUpdateWithWhereUniqueWithoutTagInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SoftwareTagUpdateManyWithWhereWithoutTagInputSchema),z.lazy(() => SoftwareTagUpdateManyWithWhereWithoutTagInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SoftwareTagScalarWhereInputSchema),z.lazy(() => SoftwareTagScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RankTagUncheckedUpdateManyWithoutTagNestedInputSchema: z.ZodType<Prisma.RankTagUncheckedUpdateManyWithoutTagNestedInput> = z.object({
  create: z.union([ z.lazy(() => RankTagCreateWithoutTagInputSchema),z.lazy(() => RankTagCreateWithoutTagInputSchema).array(),z.lazy(() => RankTagUncheckedCreateWithoutTagInputSchema),z.lazy(() => RankTagUncheckedCreateWithoutTagInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RankTagCreateOrConnectWithoutTagInputSchema),z.lazy(() => RankTagCreateOrConnectWithoutTagInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RankTagUpsertWithWhereUniqueWithoutTagInputSchema),z.lazy(() => RankTagUpsertWithWhereUniqueWithoutTagInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RankTagCreateManyTagInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RankTagWhereUniqueInputSchema),z.lazy(() => RankTagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RankTagWhereUniqueInputSchema),z.lazy(() => RankTagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RankTagWhereUniqueInputSchema),z.lazy(() => RankTagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RankTagWhereUniqueInputSchema),z.lazy(() => RankTagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RankTagUpdateWithWhereUniqueWithoutTagInputSchema),z.lazy(() => RankTagUpdateWithWhereUniqueWithoutTagInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RankTagUpdateManyWithWhereWithoutTagInputSchema),z.lazy(() => RankTagUpdateManyWithWhereWithoutTagInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RankTagScalarWhereInputSchema),z.lazy(() => RankTagScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SoftwareTagUncheckedUpdateManyWithoutTagNestedInputSchema: z.ZodType<Prisma.SoftwareTagUncheckedUpdateManyWithoutTagNestedInput> = z.object({
  create: z.union([ z.lazy(() => SoftwareTagCreateWithoutTagInputSchema),z.lazy(() => SoftwareTagCreateWithoutTagInputSchema).array(),z.lazy(() => SoftwareTagUncheckedCreateWithoutTagInputSchema),z.lazy(() => SoftwareTagUncheckedCreateWithoutTagInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SoftwareTagCreateOrConnectWithoutTagInputSchema),z.lazy(() => SoftwareTagCreateOrConnectWithoutTagInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SoftwareTagUpsertWithWhereUniqueWithoutTagInputSchema),z.lazy(() => SoftwareTagUpsertWithWhereUniqueWithoutTagInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SoftwareTagCreateManyTagInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SoftwareTagWhereUniqueInputSchema),z.lazy(() => SoftwareTagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SoftwareTagWhereUniqueInputSchema),z.lazy(() => SoftwareTagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SoftwareTagWhereUniqueInputSchema),z.lazy(() => SoftwareTagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SoftwareTagWhereUniqueInputSchema),z.lazy(() => SoftwareTagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SoftwareTagUpdateWithWhereUniqueWithoutTagInputSchema),z.lazy(() => SoftwareTagUpdateWithWhereUniqueWithoutTagInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SoftwareTagUpdateManyWithWhereWithoutTagInputSchema),z.lazy(() => SoftwareTagUpdateManyWithWhereWithoutTagInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SoftwareTagScalarWhereInputSchema),z.lazy(() => SoftwareTagScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutRanksInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutRanksInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRanksInputSchema),z.lazy(() => UserUncheckedCreateWithoutRanksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutRanksInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const RankTagCreateNestedManyWithoutRankInputSchema: z.ZodType<Prisma.RankTagCreateNestedManyWithoutRankInput> = z.object({
  create: z.union([ z.lazy(() => RankTagCreateWithoutRankInputSchema),z.lazy(() => RankTagCreateWithoutRankInputSchema).array(),z.lazy(() => RankTagUncheckedCreateWithoutRankInputSchema),z.lazy(() => RankTagUncheckedCreateWithoutRankInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RankTagCreateOrConnectWithoutRankInputSchema),z.lazy(() => RankTagCreateOrConnectWithoutRankInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RankTagCreateManyRankInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RankTagWhereUniqueInputSchema),z.lazy(() => RankTagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SoftwareOnRankCreateNestedManyWithoutRankInputSchema: z.ZodType<Prisma.SoftwareOnRankCreateNestedManyWithoutRankInput> = z.object({
  create: z.union([ z.lazy(() => SoftwareOnRankCreateWithoutRankInputSchema),z.lazy(() => SoftwareOnRankCreateWithoutRankInputSchema).array(),z.lazy(() => SoftwareOnRankUncheckedCreateWithoutRankInputSchema),z.lazy(() => SoftwareOnRankUncheckedCreateWithoutRankInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SoftwareOnRankCreateOrConnectWithoutRankInputSchema),z.lazy(() => SoftwareOnRankCreateOrConnectWithoutRankInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SoftwareOnRankCreateManyRankInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SoftwareOnRankWhereUniqueInputSchema),z.lazy(() => SoftwareOnRankWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ArticleCreateNestedManyWithoutRankInputSchema: z.ZodType<Prisma.ArticleCreateNestedManyWithoutRankInput> = z.object({
  create: z.union([ z.lazy(() => ArticleCreateWithoutRankInputSchema),z.lazy(() => ArticleCreateWithoutRankInputSchema).array(),z.lazy(() => ArticleUncheckedCreateWithoutRankInputSchema),z.lazy(() => ArticleUncheckedCreateWithoutRankInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ArticleCreateOrConnectWithoutRankInputSchema),z.lazy(() => ArticleCreateOrConnectWithoutRankInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ArticleCreateManyRankInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ArticleWhereUniqueInputSchema),z.lazy(() => ArticleWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RankLikeCreateNestedManyWithoutRankInputSchema: z.ZodType<Prisma.RankLikeCreateNestedManyWithoutRankInput> = z.object({
  create: z.union([ z.lazy(() => RankLikeCreateWithoutRankInputSchema),z.lazy(() => RankLikeCreateWithoutRankInputSchema).array(),z.lazy(() => RankLikeUncheckedCreateWithoutRankInputSchema),z.lazy(() => RankLikeUncheckedCreateWithoutRankInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RankLikeCreateOrConnectWithoutRankInputSchema),z.lazy(() => RankLikeCreateOrConnectWithoutRankInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RankLikeCreateManyRankInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RankLikeWhereUniqueInputSchema),z.lazy(() => RankLikeWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RankFavoriteCreateNestedManyWithoutRankInputSchema: z.ZodType<Prisma.RankFavoriteCreateNestedManyWithoutRankInput> = z.object({
  create: z.union([ z.lazy(() => RankFavoriteCreateWithoutRankInputSchema),z.lazy(() => RankFavoriteCreateWithoutRankInputSchema).array(),z.lazy(() => RankFavoriteUncheckedCreateWithoutRankInputSchema),z.lazy(() => RankFavoriteUncheckedCreateWithoutRankInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RankFavoriteCreateOrConnectWithoutRankInputSchema),z.lazy(() => RankFavoriteCreateOrConnectWithoutRankInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RankFavoriteCreateManyRankInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RankFavoriteWhereUniqueInputSchema),z.lazy(() => RankFavoriteWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RankCommentCreateNestedManyWithoutRankInputSchema: z.ZodType<Prisma.RankCommentCreateNestedManyWithoutRankInput> = z.object({
  create: z.union([ z.lazy(() => RankCommentCreateWithoutRankInputSchema),z.lazy(() => RankCommentCreateWithoutRankInputSchema).array(),z.lazy(() => RankCommentUncheckedCreateWithoutRankInputSchema),z.lazy(() => RankCommentUncheckedCreateWithoutRankInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RankCommentCreateOrConnectWithoutRankInputSchema),z.lazy(() => RankCommentCreateOrConnectWithoutRankInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RankCommentCreateManyRankInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RankCommentWhereUniqueInputSchema),z.lazy(() => RankCommentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RankTagUncheckedCreateNestedManyWithoutRankInputSchema: z.ZodType<Prisma.RankTagUncheckedCreateNestedManyWithoutRankInput> = z.object({
  create: z.union([ z.lazy(() => RankTagCreateWithoutRankInputSchema),z.lazy(() => RankTagCreateWithoutRankInputSchema).array(),z.lazy(() => RankTagUncheckedCreateWithoutRankInputSchema),z.lazy(() => RankTagUncheckedCreateWithoutRankInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RankTagCreateOrConnectWithoutRankInputSchema),z.lazy(() => RankTagCreateOrConnectWithoutRankInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RankTagCreateManyRankInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RankTagWhereUniqueInputSchema),z.lazy(() => RankTagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SoftwareOnRankUncheckedCreateNestedManyWithoutRankInputSchema: z.ZodType<Prisma.SoftwareOnRankUncheckedCreateNestedManyWithoutRankInput> = z.object({
  create: z.union([ z.lazy(() => SoftwareOnRankCreateWithoutRankInputSchema),z.lazy(() => SoftwareOnRankCreateWithoutRankInputSchema).array(),z.lazy(() => SoftwareOnRankUncheckedCreateWithoutRankInputSchema),z.lazy(() => SoftwareOnRankUncheckedCreateWithoutRankInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SoftwareOnRankCreateOrConnectWithoutRankInputSchema),z.lazy(() => SoftwareOnRankCreateOrConnectWithoutRankInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SoftwareOnRankCreateManyRankInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SoftwareOnRankWhereUniqueInputSchema),z.lazy(() => SoftwareOnRankWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ArticleUncheckedCreateNestedManyWithoutRankInputSchema: z.ZodType<Prisma.ArticleUncheckedCreateNestedManyWithoutRankInput> = z.object({
  create: z.union([ z.lazy(() => ArticleCreateWithoutRankInputSchema),z.lazy(() => ArticleCreateWithoutRankInputSchema).array(),z.lazy(() => ArticleUncheckedCreateWithoutRankInputSchema),z.lazy(() => ArticleUncheckedCreateWithoutRankInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ArticleCreateOrConnectWithoutRankInputSchema),z.lazy(() => ArticleCreateOrConnectWithoutRankInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ArticleCreateManyRankInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ArticleWhereUniqueInputSchema),z.lazy(() => ArticleWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RankLikeUncheckedCreateNestedManyWithoutRankInputSchema: z.ZodType<Prisma.RankLikeUncheckedCreateNestedManyWithoutRankInput> = z.object({
  create: z.union([ z.lazy(() => RankLikeCreateWithoutRankInputSchema),z.lazy(() => RankLikeCreateWithoutRankInputSchema).array(),z.lazy(() => RankLikeUncheckedCreateWithoutRankInputSchema),z.lazy(() => RankLikeUncheckedCreateWithoutRankInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RankLikeCreateOrConnectWithoutRankInputSchema),z.lazy(() => RankLikeCreateOrConnectWithoutRankInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RankLikeCreateManyRankInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RankLikeWhereUniqueInputSchema),z.lazy(() => RankLikeWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RankFavoriteUncheckedCreateNestedManyWithoutRankInputSchema: z.ZodType<Prisma.RankFavoriteUncheckedCreateNestedManyWithoutRankInput> = z.object({
  create: z.union([ z.lazy(() => RankFavoriteCreateWithoutRankInputSchema),z.lazy(() => RankFavoriteCreateWithoutRankInputSchema).array(),z.lazy(() => RankFavoriteUncheckedCreateWithoutRankInputSchema),z.lazy(() => RankFavoriteUncheckedCreateWithoutRankInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RankFavoriteCreateOrConnectWithoutRankInputSchema),z.lazy(() => RankFavoriteCreateOrConnectWithoutRankInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RankFavoriteCreateManyRankInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RankFavoriteWhereUniqueInputSchema),z.lazy(() => RankFavoriteWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RankCommentUncheckedCreateNestedManyWithoutRankInputSchema: z.ZodType<Prisma.RankCommentUncheckedCreateNestedManyWithoutRankInput> = z.object({
  create: z.union([ z.lazy(() => RankCommentCreateWithoutRankInputSchema),z.lazy(() => RankCommentCreateWithoutRankInputSchema).array(),z.lazy(() => RankCommentUncheckedCreateWithoutRankInputSchema),z.lazy(() => RankCommentUncheckedCreateWithoutRankInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RankCommentCreateOrConnectWithoutRankInputSchema),z.lazy(() => RankCommentCreateOrConnectWithoutRankInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RankCommentCreateManyRankInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RankCommentWhereUniqueInputSchema),z.lazy(() => RankCommentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutRanksNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutRanksNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRanksInputSchema),z.lazy(() => UserUncheckedCreateWithoutRanksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutRanksInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutRanksInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutRanksInputSchema),z.lazy(() => UserUpdateWithoutRanksInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRanksInputSchema) ]).optional(),
}).strict();

export const RankTagUpdateManyWithoutRankNestedInputSchema: z.ZodType<Prisma.RankTagUpdateManyWithoutRankNestedInput> = z.object({
  create: z.union([ z.lazy(() => RankTagCreateWithoutRankInputSchema),z.lazy(() => RankTagCreateWithoutRankInputSchema).array(),z.lazy(() => RankTagUncheckedCreateWithoutRankInputSchema),z.lazy(() => RankTagUncheckedCreateWithoutRankInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RankTagCreateOrConnectWithoutRankInputSchema),z.lazy(() => RankTagCreateOrConnectWithoutRankInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RankTagUpsertWithWhereUniqueWithoutRankInputSchema),z.lazy(() => RankTagUpsertWithWhereUniqueWithoutRankInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RankTagCreateManyRankInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RankTagWhereUniqueInputSchema),z.lazy(() => RankTagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RankTagWhereUniqueInputSchema),z.lazy(() => RankTagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RankTagWhereUniqueInputSchema),z.lazy(() => RankTagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RankTagWhereUniqueInputSchema),z.lazy(() => RankTagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RankTagUpdateWithWhereUniqueWithoutRankInputSchema),z.lazy(() => RankTagUpdateWithWhereUniqueWithoutRankInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RankTagUpdateManyWithWhereWithoutRankInputSchema),z.lazy(() => RankTagUpdateManyWithWhereWithoutRankInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RankTagScalarWhereInputSchema),z.lazy(() => RankTagScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SoftwareOnRankUpdateManyWithoutRankNestedInputSchema: z.ZodType<Prisma.SoftwareOnRankUpdateManyWithoutRankNestedInput> = z.object({
  create: z.union([ z.lazy(() => SoftwareOnRankCreateWithoutRankInputSchema),z.lazy(() => SoftwareOnRankCreateWithoutRankInputSchema).array(),z.lazy(() => SoftwareOnRankUncheckedCreateWithoutRankInputSchema),z.lazy(() => SoftwareOnRankUncheckedCreateWithoutRankInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SoftwareOnRankCreateOrConnectWithoutRankInputSchema),z.lazy(() => SoftwareOnRankCreateOrConnectWithoutRankInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SoftwareOnRankUpsertWithWhereUniqueWithoutRankInputSchema),z.lazy(() => SoftwareOnRankUpsertWithWhereUniqueWithoutRankInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SoftwareOnRankCreateManyRankInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SoftwareOnRankWhereUniqueInputSchema),z.lazy(() => SoftwareOnRankWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SoftwareOnRankWhereUniqueInputSchema),z.lazy(() => SoftwareOnRankWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SoftwareOnRankWhereUniqueInputSchema),z.lazy(() => SoftwareOnRankWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SoftwareOnRankWhereUniqueInputSchema),z.lazy(() => SoftwareOnRankWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SoftwareOnRankUpdateWithWhereUniqueWithoutRankInputSchema),z.lazy(() => SoftwareOnRankUpdateWithWhereUniqueWithoutRankInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SoftwareOnRankUpdateManyWithWhereWithoutRankInputSchema),z.lazy(() => SoftwareOnRankUpdateManyWithWhereWithoutRankInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SoftwareOnRankScalarWhereInputSchema),z.lazy(() => SoftwareOnRankScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ArticleUpdateManyWithoutRankNestedInputSchema: z.ZodType<Prisma.ArticleUpdateManyWithoutRankNestedInput> = z.object({
  create: z.union([ z.lazy(() => ArticleCreateWithoutRankInputSchema),z.lazy(() => ArticleCreateWithoutRankInputSchema).array(),z.lazy(() => ArticleUncheckedCreateWithoutRankInputSchema),z.lazy(() => ArticleUncheckedCreateWithoutRankInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ArticleCreateOrConnectWithoutRankInputSchema),z.lazy(() => ArticleCreateOrConnectWithoutRankInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ArticleUpsertWithWhereUniqueWithoutRankInputSchema),z.lazy(() => ArticleUpsertWithWhereUniqueWithoutRankInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ArticleCreateManyRankInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ArticleWhereUniqueInputSchema),z.lazy(() => ArticleWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ArticleWhereUniqueInputSchema),z.lazy(() => ArticleWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ArticleWhereUniqueInputSchema),z.lazy(() => ArticleWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ArticleWhereUniqueInputSchema),z.lazy(() => ArticleWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ArticleUpdateWithWhereUniqueWithoutRankInputSchema),z.lazy(() => ArticleUpdateWithWhereUniqueWithoutRankInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ArticleUpdateManyWithWhereWithoutRankInputSchema),z.lazy(() => ArticleUpdateManyWithWhereWithoutRankInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ArticleScalarWhereInputSchema),z.lazy(() => ArticleScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RankLikeUpdateManyWithoutRankNestedInputSchema: z.ZodType<Prisma.RankLikeUpdateManyWithoutRankNestedInput> = z.object({
  create: z.union([ z.lazy(() => RankLikeCreateWithoutRankInputSchema),z.lazy(() => RankLikeCreateWithoutRankInputSchema).array(),z.lazy(() => RankLikeUncheckedCreateWithoutRankInputSchema),z.lazy(() => RankLikeUncheckedCreateWithoutRankInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RankLikeCreateOrConnectWithoutRankInputSchema),z.lazy(() => RankLikeCreateOrConnectWithoutRankInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RankLikeUpsertWithWhereUniqueWithoutRankInputSchema),z.lazy(() => RankLikeUpsertWithWhereUniqueWithoutRankInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RankLikeCreateManyRankInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RankLikeWhereUniqueInputSchema),z.lazy(() => RankLikeWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RankLikeWhereUniqueInputSchema),z.lazy(() => RankLikeWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RankLikeWhereUniqueInputSchema),z.lazy(() => RankLikeWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RankLikeWhereUniqueInputSchema),z.lazy(() => RankLikeWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RankLikeUpdateWithWhereUniqueWithoutRankInputSchema),z.lazy(() => RankLikeUpdateWithWhereUniqueWithoutRankInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RankLikeUpdateManyWithWhereWithoutRankInputSchema),z.lazy(() => RankLikeUpdateManyWithWhereWithoutRankInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RankLikeScalarWhereInputSchema),z.lazy(() => RankLikeScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RankFavoriteUpdateManyWithoutRankNestedInputSchema: z.ZodType<Prisma.RankFavoriteUpdateManyWithoutRankNestedInput> = z.object({
  create: z.union([ z.lazy(() => RankFavoriteCreateWithoutRankInputSchema),z.lazy(() => RankFavoriteCreateWithoutRankInputSchema).array(),z.lazy(() => RankFavoriteUncheckedCreateWithoutRankInputSchema),z.lazy(() => RankFavoriteUncheckedCreateWithoutRankInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RankFavoriteCreateOrConnectWithoutRankInputSchema),z.lazy(() => RankFavoriteCreateOrConnectWithoutRankInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RankFavoriteUpsertWithWhereUniqueWithoutRankInputSchema),z.lazy(() => RankFavoriteUpsertWithWhereUniqueWithoutRankInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RankFavoriteCreateManyRankInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RankFavoriteWhereUniqueInputSchema),z.lazy(() => RankFavoriteWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RankFavoriteWhereUniqueInputSchema),z.lazy(() => RankFavoriteWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RankFavoriteWhereUniqueInputSchema),z.lazy(() => RankFavoriteWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RankFavoriteWhereUniqueInputSchema),z.lazy(() => RankFavoriteWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RankFavoriteUpdateWithWhereUniqueWithoutRankInputSchema),z.lazy(() => RankFavoriteUpdateWithWhereUniqueWithoutRankInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RankFavoriteUpdateManyWithWhereWithoutRankInputSchema),z.lazy(() => RankFavoriteUpdateManyWithWhereWithoutRankInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RankFavoriteScalarWhereInputSchema),z.lazy(() => RankFavoriteScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RankCommentUpdateManyWithoutRankNestedInputSchema: z.ZodType<Prisma.RankCommentUpdateManyWithoutRankNestedInput> = z.object({
  create: z.union([ z.lazy(() => RankCommentCreateWithoutRankInputSchema),z.lazy(() => RankCommentCreateWithoutRankInputSchema).array(),z.lazy(() => RankCommentUncheckedCreateWithoutRankInputSchema),z.lazy(() => RankCommentUncheckedCreateWithoutRankInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RankCommentCreateOrConnectWithoutRankInputSchema),z.lazy(() => RankCommentCreateOrConnectWithoutRankInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RankCommentUpsertWithWhereUniqueWithoutRankInputSchema),z.lazy(() => RankCommentUpsertWithWhereUniqueWithoutRankInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RankCommentCreateManyRankInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RankCommentWhereUniqueInputSchema),z.lazy(() => RankCommentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RankCommentWhereUniqueInputSchema),z.lazy(() => RankCommentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RankCommentWhereUniqueInputSchema),z.lazy(() => RankCommentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RankCommentWhereUniqueInputSchema),z.lazy(() => RankCommentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RankCommentUpdateWithWhereUniqueWithoutRankInputSchema),z.lazy(() => RankCommentUpdateWithWhereUniqueWithoutRankInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RankCommentUpdateManyWithWhereWithoutRankInputSchema),z.lazy(() => RankCommentUpdateManyWithWhereWithoutRankInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RankCommentScalarWhereInputSchema),z.lazy(() => RankCommentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RankTagUncheckedUpdateManyWithoutRankNestedInputSchema: z.ZodType<Prisma.RankTagUncheckedUpdateManyWithoutRankNestedInput> = z.object({
  create: z.union([ z.lazy(() => RankTagCreateWithoutRankInputSchema),z.lazy(() => RankTagCreateWithoutRankInputSchema).array(),z.lazy(() => RankTagUncheckedCreateWithoutRankInputSchema),z.lazy(() => RankTagUncheckedCreateWithoutRankInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RankTagCreateOrConnectWithoutRankInputSchema),z.lazy(() => RankTagCreateOrConnectWithoutRankInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RankTagUpsertWithWhereUniqueWithoutRankInputSchema),z.lazy(() => RankTagUpsertWithWhereUniqueWithoutRankInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RankTagCreateManyRankInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RankTagWhereUniqueInputSchema),z.lazy(() => RankTagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RankTagWhereUniqueInputSchema),z.lazy(() => RankTagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RankTagWhereUniqueInputSchema),z.lazy(() => RankTagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RankTagWhereUniqueInputSchema),z.lazy(() => RankTagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RankTagUpdateWithWhereUniqueWithoutRankInputSchema),z.lazy(() => RankTagUpdateWithWhereUniqueWithoutRankInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RankTagUpdateManyWithWhereWithoutRankInputSchema),z.lazy(() => RankTagUpdateManyWithWhereWithoutRankInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RankTagScalarWhereInputSchema),z.lazy(() => RankTagScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SoftwareOnRankUncheckedUpdateManyWithoutRankNestedInputSchema: z.ZodType<Prisma.SoftwareOnRankUncheckedUpdateManyWithoutRankNestedInput> = z.object({
  create: z.union([ z.lazy(() => SoftwareOnRankCreateWithoutRankInputSchema),z.lazy(() => SoftwareOnRankCreateWithoutRankInputSchema).array(),z.lazy(() => SoftwareOnRankUncheckedCreateWithoutRankInputSchema),z.lazy(() => SoftwareOnRankUncheckedCreateWithoutRankInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SoftwareOnRankCreateOrConnectWithoutRankInputSchema),z.lazy(() => SoftwareOnRankCreateOrConnectWithoutRankInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SoftwareOnRankUpsertWithWhereUniqueWithoutRankInputSchema),z.lazy(() => SoftwareOnRankUpsertWithWhereUniqueWithoutRankInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SoftwareOnRankCreateManyRankInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SoftwareOnRankWhereUniqueInputSchema),z.lazy(() => SoftwareOnRankWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SoftwareOnRankWhereUniqueInputSchema),z.lazy(() => SoftwareOnRankWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SoftwareOnRankWhereUniqueInputSchema),z.lazy(() => SoftwareOnRankWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SoftwareOnRankWhereUniqueInputSchema),z.lazy(() => SoftwareOnRankWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SoftwareOnRankUpdateWithWhereUniqueWithoutRankInputSchema),z.lazy(() => SoftwareOnRankUpdateWithWhereUniqueWithoutRankInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SoftwareOnRankUpdateManyWithWhereWithoutRankInputSchema),z.lazy(() => SoftwareOnRankUpdateManyWithWhereWithoutRankInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SoftwareOnRankScalarWhereInputSchema),z.lazy(() => SoftwareOnRankScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ArticleUncheckedUpdateManyWithoutRankNestedInputSchema: z.ZodType<Prisma.ArticleUncheckedUpdateManyWithoutRankNestedInput> = z.object({
  create: z.union([ z.lazy(() => ArticleCreateWithoutRankInputSchema),z.lazy(() => ArticleCreateWithoutRankInputSchema).array(),z.lazy(() => ArticleUncheckedCreateWithoutRankInputSchema),z.lazy(() => ArticleUncheckedCreateWithoutRankInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ArticleCreateOrConnectWithoutRankInputSchema),z.lazy(() => ArticleCreateOrConnectWithoutRankInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ArticleUpsertWithWhereUniqueWithoutRankInputSchema),z.lazy(() => ArticleUpsertWithWhereUniqueWithoutRankInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ArticleCreateManyRankInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ArticleWhereUniqueInputSchema),z.lazy(() => ArticleWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ArticleWhereUniqueInputSchema),z.lazy(() => ArticleWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ArticleWhereUniqueInputSchema),z.lazy(() => ArticleWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ArticleWhereUniqueInputSchema),z.lazy(() => ArticleWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ArticleUpdateWithWhereUniqueWithoutRankInputSchema),z.lazy(() => ArticleUpdateWithWhereUniqueWithoutRankInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ArticleUpdateManyWithWhereWithoutRankInputSchema),z.lazy(() => ArticleUpdateManyWithWhereWithoutRankInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ArticleScalarWhereInputSchema),z.lazy(() => ArticleScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RankLikeUncheckedUpdateManyWithoutRankNestedInputSchema: z.ZodType<Prisma.RankLikeUncheckedUpdateManyWithoutRankNestedInput> = z.object({
  create: z.union([ z.lazy(() => RankLikeCreateWithoutRankInputSchema),z.lazy(() => RankLikeCreateWithoutRankInputSchema).array(),z.lazy(() => RankLikeUncheckedCreateWithoutRankInputSchema),z.lazy(() => RankLikeUncheckedCreateWithoutRankInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RankLikeCreateOrConnectWithoutRankInputSchema),z.lazy(() => RankLikeCreateOrConnectWithoutRankInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RankLikeUpsertWithWhereUniqueWithoutRankInputSchema),z.lazy(() => RankLikeUpsertWithWhereUniqueWithoutRankInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RankLikeCreateManyRankInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RankLikeWhereUniqueInputSchema),z.lazy(() => RankLikeWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RankLikeWhereUniqueInputSchema),z.lazy(() => RankLikeWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RankLikeWhereUniqueInputSchema),z.lazy(() => RankLikeWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RankLikeWhereUniqueInputSchema),z.lazy(() => RankLikeWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RankLikeUpdateWithWhereUniqueWithoutRankInputSchema),z.lazy(() => RankLikeUpdateWithWhereUniqueWithoutRankInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RankLikeUpdateManyWithWhereWithoutRankInputSchema),z.lazy(() => RankLikeUpdateManyWithWhereWithoutRankInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RankLikeScalarWhereInputSchema),z.lazy(() => RankLikeScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RankFavoriteUncheckedUpdateManyWithoutRankNestedInputSchema: z.ZodType<Prisma.RankFavoriteUncheckedUpdateManyWithoutRankNestedInput> = z.object({
  create: z.union([ z.lazy(() => RankFavoriteCreateWithoutRankInputSchema),z.lazy(() => RankFavoriteCreateWithoutRankInputSchema).array(),z.lazy(() => RankFavoriteUncheckedCreateWithoutRankInputSchema),z.lazy(() => RankFavoriteUncheckedCreateWithoutRankInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RankFavoriteCreateOrConnectWithoutRankInputSchema),z.lazy(() => RankFavoriteCreateOrConnectWithoutRankInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RankFavoriteUpsertWithWhereUniqueWithoutRankInputSchema),z.lazy(() => RankFavoriteUpsertWithWhereUniqueWithoutRankInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RankFavoriteCreateManyRankInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RankFavoriteWhereUniqueInputSchema),z.lazy(() => RankFavoriteWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RankFavoriteWhereUniqueInputSchema),z.lazy(() => RankFavoriteWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RankFavoriteWhereUniqueInputSchema),z.lazy(() => RankFavoriteWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RankFavoriteWhereUniqueInputSchema),z.lazy(() => RankFavoriteWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RankFavoriteUpdateWithWhereUniqueWithoutRankInputSchema),z.lazy(() => RankFavoriteUpdateWithWhereUniqueWithoutRankInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RankFavoriteUpdateManyWithWhereWithoutRankInputSchema),z.lazy(() => RankFavoriteUpdateManyWithWhereWithoutRankInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RankFavoriteScalarWhereInputSchema),z.lazy(() => RankFavoriteScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RankCommentUncheckedUpdateManyWithoutRankNestedInputSchema: z.ZodType<Prisma.RankCommentUncheckedUpdateManyWithoutRankNestedInput> = z.object({
  create: z.union([ z.lazy(() => RankCommentCreateWithoutRankInputSchema),z.lazy(() => RankCommentCreateWithoutRankInputSchema).array(),z.lazy(() => RankCommentUncheckedCreateWithoutRankInputSchema),z.lazy(() => RankCommentUncheckedCreateWithoutRankInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RankCommentCreateOrConnectWithoutRankInputSchema),z.lazy(() => RankCommentCreateOrConnectWithoutRankInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RankCommentUpsertWithWhereUniqueWithoutRankInputSchema),z.lazy(() => RankCommentUpsertWithWhereUniqueWithoutRankInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RankCommentCreateManyRankInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RankCommentWhereUniqueInputSchema),z.lazy(() => RankCommentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RankCommentWhereUniqueInputSchema),z.lazy(() => RankCommentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RankCommentWhereUniqueInputSchema),z.lazy(() => RankCommentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RankCommentWhereUniqueInputSchema),z.lazy(() => RankCommentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RankCommentUpdateWithWhereUniqueWithoutRankInputSchema),z.lazy(() => RankCommentUpdateWithWhereUniqueWithoutRankInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RankCommentUpdateManyWithWhereWithoutRankInputSchema),z.lazy(() => RankCommentUpdateManyWithWhereWithoutRankInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RankCommentScalarWhereInputSchema),z.lazy(() => RankCommentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TagCreateNestedOneWithoutRanksInputSchema: z.ZodType<Prisma.TagCreateNestedOneWithoutRanksInput> = z.object({
  create: z.union([ z.lazy(() => TagCreateWithoutRanksInputSchema),z.lazy(() => TagUncheckedCreateWithoutRanksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TagCreateOrConnectWithoutRanksInputSchema).optional(),
  connect: z.lazy(() => TagWhereUniqueInputSchema).optional()
}).strict();

export const RankCreateNestedOneWithoutTagsInputSchema: z.ZodType<Prisma.RankCreateNestedOneWithoutTagsInput> = z.object({
  create: z.union([ z.lazy(() => RankCreateWithoutTagsInputSchema),z.lazy(() => RankUncheckedCreateWithoutTagsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RankCreateOrConnectWithoutTagsInputSchema).optional(),
  connect: z.lazy(() => RankWhereUniqueInputSchema).optional()
}).strict();

export const TagUpdateOneRequiredWithoutRanksNestedInputSchema: z.ZodType<Prisma.TagUpdateOneRequiredWithoutRanksNestedInput> = z.object({
  create: z.union([ z.lazy(() => TagCreateWithoutRanksInputSchema),z.lazy(() => TagUncheckedCreateWithoutRanksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TagCreateOrConnectWithoutRanksInputSchema).optional(),
  upsert: z.lazy(() => TagUpsertWithoutRanksInputSchema).optional(),
  connect: z.lazy(() => TagWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TagUpdateToOneWithWhereWithoutRanksInputSchema),z.lazy(() => TagUpdateWithoutRanksInputSchema),z.lazy(() => TagUncheckedUpdateWithoutRanksInputSchema) ]).optional(),
}).strict();

export const RankUpdateOneRequiredWithoutTagsNestedInputSchema: z.ZodType<Prisma.RankUpdateOneRequiredWithoutTagsNestedInput> = z.object({
  create: z.union([ z.lazy(() => RankCreateWithoutTagsInputSchema),z.lazy(() => RankUncheckedCreateWithoutTagsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RankCreateOrConnectWithoutTagsInputSchema).optional(),
  upsert: z.lazy(() => RankUpsertWithoutTagsInputSchema).optional(),
  connect: z.lazy(() => RankWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => RankUpdateToOneWithWhereWithoutTagsInputSchema),z.lazy(() => RankUpdateWithoutTagsInputSchema),z.lazy(() => RankUncheckedUpdateWithoutTagsInputSchema) ]).optional(),
}).strict();

export const SoftwareTagCreateNestedManyWithoutSoftwareInputSchema: z.ZodType<Prisma.SoftwareTagCreateNestedManyWithoutSoftwareInput> = z.object({
  create: z.union([ z.lazy(() => SoftwareTagCreateWithoutSoftwareInputSchema),z.lazy(() => SoftwareTagCreateWithoutSoftwareInputSchema).array(),z.lazy(() => SoftwareTagUncheckedCreateWithoutSoftwareInputSchema),z.lazy(() => SoftwareTagUncheckedCreateWithoutSoftwareInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SoftwareTagCreateOrConnectWithoutSoftwareInputSchema),z.lazy(() => SoftwareTagCreateOrConnectWithoutSoftwareInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SoftwareTagCreateManySoftwareInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SoftwareTagWhereUniqueInputSchema),z.lazy(() => SoftwareTagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SoftwareOnRankCreateNestedManyWithoutSoftwareInputSchema: z.ZodType<Prisma.SoftwareOnRankCreateNestedManyWithoutSoftwareInput> = z.object({
  create: z.union([ z.lazy(() => SoftwareOnRankCreateWithoutSoftwareInputSchema),z.lazy(() => SoftwareOnRankCreateWithoutSoftwareInputSchema).array(),z.lazy(() => SoftwareOnRankUncheckedCreateWithoutSoftwareInputSchema),z.lazy(() => SoftwareOnRankUncheckedCreateWithoutSoftwareInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SoftwareOnRankCreateOrConnectWithoutSoftwareInputSchema),z.lazy(() => SoftwareOnRankCreateOrConnectWithoutSoftwareInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SoftwareOnRankCreateManySoftwareInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SoftwareOnRankWhereUniqueInputSchema),z.lazy(() => SoftwareOnRankWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SoftwareLikeCreateNestedManyWithoutSoftwareInputSchema: z.ZodType<Prisma.SoftwareLikeCreateNestedManyWithoutSoftwareInput> = z.object({
  create: z.union([ z.lazy(() => SoftwareLikeCreateWithoutSoftwareInputSchema),z.lazy(() => SoftwareLikeCreateWithoutSoftwareInputSchema).array(),z.lazy(() => SoftwareLikeUncheckedCreateWithoutSoftwareInputSchema),z.lazy(() => SoftwareLikeUncheckedCreateWithoutSoftwareInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SoftwareLikeCreateOrConnectWithoutSoftwareInputSchema),z.lazy(() => SoftwareLikeCreateOrConnectWithoutSoftwareInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SoftwareLikeCreateManySoftwareInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SoftwareLikeWhereUniqueInputSchema),z.lazy(() => SoftwareLikeWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SoftwareFavoriteCreateNestedManyWithoutSoftwareInputSchema: z.ZodType<Prisma.SoftwareFavoriteCreateNestedManyWithoutSoftwareInput> = z.object({
  create: z.union([ z.lazy(() => SoftwareFavoriteCreateWithoutSoftwareInputSchema),z.lazy(() => SoftwareFavoriteCreateWithoutSoftwareInputSchema).array(),z.lazy(() => SoftwareFavoriteUncheckedCreateWithoutSoftwareInputSchema),z.lazy(() => SoftwareFavoriteUncheckedCreateWithoutSoftwareInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SoftwareFavoriteCreateOrConnectWithoutSoftwareInputSchema),z.lazy(() => SoftwareFavoriteCreateOrConnectWithoutSoftwareInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SoftwareFavoriteCreateManySoftwareInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SoftwareFavoriteWhereUniqueInputSchema),z.lazy(() => SoftwareFavoriteWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SoftwareOnArticleCreateNestedManyWithoutSoftwareInputSchema: z.ZodType<Prisma.SoftwareOnArticleCreateNestedManyWithoutSoftwareInput> = z.object({
  create: z.union([ z.lazy(() => SoftwareOnArticleCreateWithoutSoftwareInputSchema),z.lazy(() => SoftwareOnArticleCreateWithoutSoftwareInputSchema).array(),z.lazy(() => SoftwareOnArticleUncheckedCreateWithoutSoftwareInputSchema),z.lazy(() => SoftwareOnArticleUncheckedCreateWithoutSoftwareInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SoftwareOnArticleCreateOrConnectWithoutSoftwareInputSchema),z.lazy(() => SoftwareOnArticleCreateOrConnectWithoutSoftwareInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SoftwareOnArticleCreateManySoftwareInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SoftwareOnArticleWhereUniqueInputSchema),z.lazy(() => SoftwareOnArticleWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SoftwareTagUncheckedCreateNestedManyWithoutSoftwareInputSchema: z.ZodType<Prisma.SoftwareTagUncheckedCreateNestedManyWithoutSoftwareInput> = z.object({
  create: z.union([ z.lazy(() => SoftwareTagCreateWithoutSoftwareInputSchema),z.lazy(() => SoftwareTagCreateWithoutSoftwareInputSchema).array(),z.lazy(() => SoftwareTagUncheckedCreateWithoutSoftwareInputSchema),z.lazy(() => SoftwareTagUncheckedCreateWithoutSoftwareInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SoftwareTagCreateOrConnectWithoutSoftwareInputSchema),z.lazy(() => SoftwareTagCreateOrConnectWithoutSoftwareInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SoftwareTagCreateManySoftwareInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SoftwareTagWhereUniqueInputSchema),z.lazy(() => SoftwareTagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SoftwareOnRankUncheckedCreateNestedManyWithoutSoftwareInputSchema: z.ZodType<Prisma.SoftwareOnRankUncheckedCreateNestedManyWithoutSoftwareInput> = z.object({
  create: z.union([ z.lazy(() => SoftwareOnRankCreateWithoutSoftwareInputSchema),z.lazy(() => SoftwareOnRankCreateWithoutSoftwareInputSchema).array(),z.lazy(() => SoftwareOnRankUncheckedCreateWithoutSoftwareInputSchema),z.lazy(() => SoftwareOnRankUncheckedCreateWithoutSoftwareInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SoftwareOnRankCreateOrConnectWithoutSoftwareInputSchema),z.lazy(() => SoftwareOnRankCreateOrConnectWithoutSoftwareInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SoftwareOnRankCreateManySoftwareInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SoftwareOnRankWhereUniqueInputSchema),z.lazy(() => SoftwareOnRankWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SoftwareLikeUncheckedCreateNestedManyWithoutSoftwareInputSchema: z.ZodType<Prisma.SoftwareLikeUncheckedCreateNestedManyWithoutSoftwareInput> = z.object({
  create: z.union([ z.lazy(() => SoftwareLikeCreateWithoutSoftwareInputSchema),z.lazy(() => SoftwareLikeCreateWithoutSoftwareInputSchema).array(),z.lazy(() => SoftwareLikeUncheckedCreateWithoutSoftwareInputSchema),z.lazy(() => SoftwareLikeUncheckedCreateWithoutSoftwareInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SoftwareLikeCreateOrConnectWithoutSoftwareInputSchema),z.lazy(() => SoftwareLikeCreateOrConnectWithoutSoftwareInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SoftwareLikeCreateManySoftwareInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SoftwareLikeWhereUniqueInputSchema),z.lazy(() => SoftwareLikeWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SoftwareFavoriteUncheckedCreateNestedManyWithoutSoftwareInputSchema: z.ZodType<Prisma.SoftwareFavoriteUncheckedCreateNestedManyWithoutSoftwareInput> = z.object({
  create: z.union([ z.lazy(() => SoftwareFavoriteCreateWithoutSoftwareInputSchema),z.lazy(() => SoftwareFavoriteCreateWithoutSoftwareInputSchema).array(),z.lazy(() => SoftwareFavoriteUncheckedCreateWithoutSoftwareInputSchema),z.lazy(() => SoftwareFavoriteUncheckedCreateWithoutSoftwareInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SoftwareFavoriteCreateOrConnectWithoutSoftwareInputSchema),z.lazy(() => SoftwareFavoriteCreateOrConnectWithoutSoftwareInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SoftwareFavoriteCreateManySoftwareInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SoftwareFavoriteWhereUniqueInputSchema),z.lazy(() => SoftwareFavoriteWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SoftwareOnArticleUncheckedCreateNestedManyWithoutSoftwareInputSchema: z.ZodType<Prisma.SoftwareOnArticleUncheckedCreateNestedManyWithoutSoftwareInput> = z.object({
  create: z.union([ z.lazy(() => SoftwareOnArticleCreateWithoutSoftwareInputSchema),z.lazy(() => SoftwareOnArticleCreateWithoutSoftwareInputSchema).array(),z.lazy(() => SoftwareOnArticleUncheckedCreateWithoutSoftwareInputSchema),z.lazy(() => SoftwareOnArticleUncheckedCreateWithoutSoftwareInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SoftwareOnArticleCreateOrConnectWithoutSoftwareInputSchema),z.lazy(() => SoftwareOnArticleCreateOrConnectWithoutSoftwareInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SoftwareOnArticleCreateManySoftwareInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SoftwareOnArticleWhereUniqueInputSchema),z.lazy(() => SoftwareOnArticleWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SoftwareTagUpdateManyWithoutSoftwareNestedInputSchema: z.ZodType<Prisma.SoftwareTagUpdateManyWithoutSoftwareNestedInput> = z.object({
  create: z.union([ z.lazy(() => SoftwareTagCreateWithoutSoftwareInputSchema),z.lazy(() => SoftwareTagCreateWithoutSoftwareInputSchema).array(),z.lazy(() => SoftwareTagUncheckedCreateWithoutSoftwareInputSchema),z.lazy(() => SoftwareTagUncheckedCreateWithoutSoftwareInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SoftwareTagCreateOrConnectWithoutSoftwareInputSchema),z.lazy(() => SoftwareTagCreateOrConnectWithoutSoftwareInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SoftwareTagUpsertWithWhereUniqueWithoutSoftwareInputSchema),z.lazy(() => SoftwareTagUpsertWithWhereUniqueWithoutSoftwareInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SoftwareTagCreateManySoftwareInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SoftwareTagWhereUniqueInputSchema),z.lazy(() => SoftwareTagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SoftwareTagWhereUniqueInputSchema),z.lazy(() => SoftwareTagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SoftwareTagWhereUniqueInputSchema),z.lazy(() => SoftwareTagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SoftwareTagWhereUniqueInputSchema),z.lazy(() => SoftwareTagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SoftwareTagUpdateWithWhereUniqueWithoutSoftwareInputSchema),z.lazy(() => SoftwareTagUpdateWithWhereUniqueWithoutSoftwareInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SoftwareTagUpdateManyWithWhereWithoutSoftwareInputSchema),z.lazy(() => SoftwareTagUpdateManyWithWhereWithoutSoftwareInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SoftwareTagScalarWhereInputSchema),z.lazy(() => SoftwareTagScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SoftwareOnRankUpdateManyWithoutSoftwareNestedInputSchema: z.ZodType<Prisma.SoftwareOnRankUpdateManyWithoutSoftwareNestedInput> = z.object({
  create: z.union([ z.lazy(() => SoftwareOnRankCreateWithoutSoftwareInputSchema),z.lazy(() => SoftwareOnRankCreateWithoutSoftwareInputSchema).array(),z.lazy(() => SoftwareOnRankUncheckedCreateWithoutSoftwareInputSchema),z.lazy(() => SoftwareOnRankUncheckedCreateWithoutSoftwareInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SoftwareOnRankCreateOrConnectWithoutSoftwareInputSchema),z.lazy(() => SoftwareOnRankCreateOrConnectWithoutSoftwareInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SoftwareOnRankUpsertWithWhereUniqueWithoutSoftwareInputSchema),z.lazy(() => SoftwareOnRankUpsertWithWhereUniqueWithoutSoftwareInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SoftwareOnRankCreateManySoftwareInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SoftwareOnRankWhereUniqueInputSchema),z.lazy(() => SoftwareOnRankWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SoftwareOnRankWhereUniqueInputSchema),z.lazy(() => SoftwareOnRankWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SoftwareOnRankWhereUniqueInputSchema),z.lazy(() => SoftwareOnRankWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SoftwareOnRankWhereUniqueInputSchema),z.lazy(() => SoftwareOnRankWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SoftwareOnRankUpdateWithWhereUniqueWithoutSoftwareInputSchema),z.lazy(() => SoftwareOnRankUpdateWithWhereUniqueWithoutSoftwareInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SoftwareOnRankUpdateManyWithWhereWithoutSoftwareInputSchema),z.lazy(() => SoftwareOnRankUpdateManyWithWhereWithoutSoftwareInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SoftwareOnRankScalarWhereInputSchema),z.lazy(() => SoftwareOnRankScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SoftwareLikeUpdateManyWithoutSoftwareNestedInputSchema: z.ZodType<Prisma.SoftwareLikeUpdateManyWithoutSoftwareNestedInput> = z.object({
  create: z.union([ z.lazy(() => SoftwareLikeCreateWithoutSoftwareInputSchema),z.lazy(() => SoftwareLikeCreateWithoutSoftwareInputSchema).array(),z.lazy(() => SoftwareLikeUncheckedCreateWithoutSoftwareInputSchema),z.lazy(() => SoftwareLikeUncheckedCreateWithoutSoftwareInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SoftwareLikeCreateOrConnectWithoutSoftwareInputSchema),z.lazy(() => SoftwareLikeCreateOrConnectWithoutSoftwareInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SoftwareLikeUpsertWithWhereUniqueWithoutSoftwareInputSchema),z.lazy(() => SoftwareLikeUpsertWithWhereUniqueWithoutSoftwareInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SoftwareLikeCreateManySoftwareInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SoftwareLikeWhereUniqueInputSchema),z.lazy(() => SoftwareLikeWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SoftwareLikeWhereUniqueInputSchema),z.lazy(() => SoftwareLikeWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SoftwareLikeWhereUniqueInputSchema),z.lazy(() => SoftwareLikeWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SoftwareLikeWhereUniqueInputSchema),z.lazy(() => SoftwareLikeWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SoftwareLikeUpdateWithWhereUniqueWithoutSoftwareInputSchema),z.lazy(() => SoftwareLikeUpdateWithWhereUniqueWithoutSoftwareInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SoftwareLikeUpdateManyWithWhereWithoutSoftwareInputSchema),z.lazy(() => SoftwareLikeUpdateManyWithWhereWithoutSoftwareInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SoftwareLikeScalarWhereInputSchema),z.lazy(() => SoftwareLikeScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SoftwareFavoriteUpdateManyWithoutSoftwareNestedInputSchema: z.ZodType<Prisma.SoftwareFavoriteUpdateManyWithoutSoftwareNestedInput> = z.object({
  create: z.union([ z.lazy(() => SoftwareFavoriteCreateWithoutSoftwareInputSchema),z.lazy(() => SoftwareFavoriteCreateWithoutSoftwareInputSchema).array(),z.lazy(() => SoftwareFavoriteUncheckedCreateWithoutSoftwareInputSchema),z.lazy(() => SoftwareFavoriteUncheckedCreateWithoutSoftwareInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SoftwareFavoriteCreateOrConnectWithoutSoftwareInputSchema),z.lazy(() => SoftwareFavoriteCreateOrConnectWithoutSoftwareInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SoftwareFavoriteUpsertWithWhereUniqueWithoutSoftwareInputSchema),z.lazy(() => SoftwareFavoriteUpsertWithWhereUniqueWithoutSoftwareInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SoftwareFavoriteCreateManySoftwareInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SoftwareFavoriteWhereUniqueInputSchema),z.lazy(() => SoftwareFavoriteWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SoftwareFavoriteWhereUniqueInputSchema),z.lazy(() => SoftwareFavoriteWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SoftwareFavoriteWhereUniqueInputSchema),z.lazy(() => SoftwareFavoriteWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SoftwareFavoriteWhereUniqueInputSchema),z.lazy(() => SoftwareFavoriteWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SoftwareFavoriteUpdateWithWhereUniqueWithoutSoftwareInputSchema),z.lazy(() => SoftwareFavoriteUpdateWithWhereUniqueWithoutSoftwareInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SoftwareFavoriteUpdateManyWithWhereWithoutSoftwareInputSchema),z.lazy(() => SoftwareFavoriteUpdateManyWithWhereWithoutSoftwareInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SoftwareFavoriteScalarWhereInputSchema),z.lazy(() => SoftwareFavoriteScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SoftwareOnArticleUpdateManyWithoutSoftwareNestedInputSchema: z.ZodType<Prisma.SoftwareOnArticleUpdateManyWithoutSoftwareNestedInput> = z.object({
  create: z.union([ z.lazy(() => SoftwareOnArticleCreateWithoutSoftwareInputSchema),z.lazy(() => SoftwareOnArticleCreateWithoutSoftwareInputSchema).array(),z.lazy(() => SoftwareOnArticleUncheckedCreateWithoutSoftwareInputSchema),z.lazy(() => SoftwareOnArticleUncheckedCreateWithoutSoftwareInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SoftwareOnArticleCreateOrConnectWithoutSoftwareInputSchema),z.lazy(() => SoftwareOnArticleCreateOrConnectWithoutSoftwareInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SoftwareOnArticleUpsertWithWhereUniqueWithoutSoftwareInputSchema),z.lazy(() => SoftwareOnArticleUpsertWithWhereUniqueWithoutSoftwareInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SoftwareOnArticleCreateManySoftwareInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SoftwareOnArticleWhereUniqueInputSchema),z.lazy(() => SoftwareOnArticleWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SoftwareOnArticleWhereUniqueInputSchema),z.lazy(() => SoftwareOnArticleWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SoftwareOnArticleWhereUniqueInputSchema),z.lazy(() => SoftwareOnArticleWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SoftwareOnArticleWhereUniqueInputSchema),z.lazy(() => SoftwareOnArticleWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SoftwareOnArticleUpdateWithWhereUniqueWithoutSoftwareInputSchema),z.lazy(() => SoftwareOnArticleUpdateWithWhereUniqueWithoutSoftwareInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SoftwareOnArticleUpdateManyWithWhereWithoutSoftwareInputSchema),z.lazy(() => SoftwareOnArticleUpdateManyWithWhereWithoutSoftwareInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SoftwareOnArticleScalarWhereInputSchema),z.lazy(() => SoftwareOnArticleScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SoftwareTagUncheckedUpdateManyWithoutSoftwareNestedInputSchema: z.ZodType<Prisma.SoftwareTagUncheckedUpdateManyWithoutSoftwareNestedInput> = z.object({
  create: z.union([ z.lazy(() => SoftwareTagCreateWithoutSoftwareInputSchema),z.lazy(() => SoftwareTagCreateWithoutSoftwareInputSchema).array(),z.lazy(() => SoftwareTagUncheckedCreateWithoutSoftwareInputSchema),z.lazy(() => SoftwareTagUncheckedCreateWithoutSoftwareInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SoftwareTagCreateOrConnectWithoutSoftwareInputSchema),z.lazy(() => SoftwareTagCreateOrConnectWithoutSoftwareInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SoftwareTagUpsertWithWhereUniqueWithoutSoftwareInputSchema),z.lazy(() => SoftwareTagUpsertWithWhereUniqueWithoutSoftwareInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SoftwareTagCreateManySoftwareInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SoftwareTagWhereUniqueInputSchema),z.lazy(() => SoftwareTagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SoftwareTagWhereUniqueInputSchema),z.lazy(() => SoftwareTagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SoftwareTagWhereUniqueInputSchema),z.lazy(() => SoftwareTagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SoftwareTagWhereUniqueInputSchema),z.lazy(() => SoftwareTagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SoftwareTagUpdateWithWhereUniqueWithoutSoftwareInputSchema),z.lazy(() => SoftwareTagUpdateWithWhereUniqueWithoutSoftwareInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SoftwareTagUpdateManyWithWhereWithoutSoftwareInputSchema),z.lazy(() => SoftwareTagUpdateManyWithWhereWithoutSoftwareInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SoftwareTagScalarWhereInputSchema),z.lazy(() => SoftwareTagScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SoftwareOnRankUncheckedUpdateManyWithoutSoftwareNestedInputSchema: z.ZodType<Prisma.SoftwareOnRankUncheckedUpdateManyWithoutSoftwareNestedInput> = z.object({
  create: z.union([ z.lazy(() => SoftwareOnRankCreateWithoutSoftwareInputSchema),z.lazy(() => SoftwareOnRankCreateWithoutSoftwareInputSchema).array(),z.lazy(() => SoftwareOnRankUncheckedCreateWithoutSoftwareInputSchema),z.lazy(() => SoftwareOnRankUncheckedCreateWithoutSoftwareInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SoftwareOnRankCreateOrConnectWithoutSoftwareInputSchema),z.lazy(() => SoftwareOnRankCreateOrConnectWithoutSoftwareInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SoftwareOnRankUpsertWithWhereUniqueWithoutSoftwareInputSchema),z.lazy(() => SoftwareOnRankUpsertWithWhereUniqueWithoutSoftwareInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SoftwareOnRankCreateManySoftwareInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SoftwareOnRankWhereUniqueInputSchema),z.lazy(() => SoftwareOnRankWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SoftwareOnRankWhereUniqueInputSchema),z.lazy(() => SoftwareOnRankWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SoftwareOnRankWhereUniqueInputSchema),z.lazy(() => SoftwareOnRankWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SoftwareOnRankWhereUniqueInputSchema),z.lazy(() => SoftwareOnRankWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SoftwareOnRankUpdateWithWhereUniqueWithoutSoftwareInputSchema),z.lazy(() => SoftwareOnRankUpdateWithWhereUniqueWithoutSoftwareInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SoftwareOnRankUpdateManyWithWhereWithoutSoftwareInputSchema),z.lazy(() => SoftwareOnRankUpdateManyWithWhereWithoutSoftwareInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SoftwareOnRankScalarWhereInputSchema),z.lazy(() => SoftwareOnRankScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SoftwareLikeUncheckedUpdateManyWithoutSoftwareNestedInputSchema: z.ZodType<Prisma.SoftwareLikeUncheckedUpdateManyWithoutSoftwareNestedInput> = z.object({
  create: z.union([ z.lazy(() => SoftwareLikeCreateWithoutSoftwareInputSchema),z.lazy(() => SoftwareLikeCreateWithoutSoftwareInputSchema).array(),z.lazy(() => SoftwareLikeUncheckedCreateWithoutSoftwareInputSchema),z.lazy(() => SoftwareLikeUncheckedCreateWithoutSoftwareInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SoftwareLikeCreateOrConnectWithoutSoftwareInputSchema),z.lazy(() => SoftwareLikeCreateOrConnectWithoutSoftwareInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SoftwareLikeUpsertWithWhereUniqueWithoutSoftwareInputSchema),z.lazy(() => SoftwareLikeUpsertWithWhereUniqueWithoutSoftwareInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SoftwareLikeCreateManySoftwareInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SoftwareLikeWhereUniqueInputSchema),z.lazy(() => SoftwareLikeWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SoftwareLikeWhereUniqueInputSchema),z.lazy(() => SoftwareLikeWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SoftwareLikeWhereUniqueInputSchema),z.lazy(() => SoftwareLikeWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SoftwareLikeWhereUniqueInputSchema),z.lazy(() => SoftwareLikeWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SoftwareLikeUpdateWithWhereUniqueWithoutSoftwareInputSchema),z.lazy(() => SoftwareLikeUpdateWithWhereUniqueWithoutSoftwareInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SoftwareLikeUpdateManyWithWhereWithoutSoftwareInputSchema),z.lazy(() => SoftwareLikeUpdateManyWithWhereWithoutSoftwareInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SoftwareLikeScalarWhereInputSchema),z.lazy(() => SoftwareLikeScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SoftwareFavoriteUncheckedUpdateManyWithoutSoftwareNestedInputSchema: z.ZodType<Prisma.SoftwareFavoriteUncheckedUpdateManyWithoutSoftwareNestedInput> = z.object({
  create: z.union([ z.lazy(() => SoftwareFavoriteCreateWithoutSoftwareInputSchema),z.lazy(() => SoftwareFavoriteCreateWithoutSoftwareInputSchema).array(),z.lazy(() => SoftwareFavoriteUncheckedCreateWithoutSoftwareInputSchema),z.lazy(() => SoftwareFavoriteUncheckedCreateWithoutSoftwareInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SoftwareFavoriteCreateOrConnectWithoutSoftwareInputSchema),z.lazy(() => SoftwareFavoriteCreateOrConnectWithoutSoftwareInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SoftwareFavoriteUpsertWithWhereUniqueWithoutSoftwareInputSchema),z.lazy(() => SoftwareFavoriteUpsertWithWhereUniqueWithoutSoftwareInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SoftwareFavoriteCreateManySoftwareInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SoftwareFavoriteWhereUniqueInputSchema),z.lazy(() => SoftwareFavoriteWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SoftwareFavoriteWhereUniqueInputSchema),z.lazy(() => SoftwareFavoriteWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SoftwareFavoriteWhereUniqueInputSchema),z.lazy(() => SoftwareFavoriteWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SoftwareFavoriteWhereUniqueInputSchema),z.lazy(() => SoftwareFavoriteWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SoftwareFavoriteUpdateWithWhereUniqueWithoutSoftwareInputSchema),z.lazy(() => SoftwareFavoriteUpdateWithWhereUniqueWithoutSoftwareInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SoftwareFavoriteUpdateManyWithWhereWithoutSoftwareInputSchema),z.lazy(() => SoftwareFavoriteUpdateManyWithWhereWithoutSoftwareInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SoftwareFavoriteScalarWhereInputSchema),z.lazy(() => SoftwareFavoriteScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SoftwareOnArticleUncheckedUpdateManyWithoutSoftwareNestedInputSchema: z.ZodType<Prisma.SoftwareOnArticleUncheckedUpdateManyWithoutSoftwareNestedInput> = z.object({
  create: z.union([ z.lazy(() => SoftwareOnArticleCreateWithoutSoftwareInputSchema),z.lazy(() => SoftwareOnArticleCreateWithoutSoftwareInputSchema).array(),z.lazy(() => SoftwareOnArticleUncheckedCreateWithoutSoftwareInputSchema),z.lazy(() => SoftwareOnArticleUncheckedCreateWithoutSoftwareInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SoftwareOnArticleCreateOrConnectWithoutSoftwareInputSchema),z.lazy(() => SoftwareOnArticleCreateOrConnectWithoutSoftwareInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SoftwareOnArticleUpsertWithWhereUniqueWithoutSoftwareInputSchema),z.lazy(() => SoftwareOnArticleUpsertWithWhereUniqueWithoutSoftwareInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SoftwareOnArticleCreateManySoftwareInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SoftwareOnArticleWhereUniqueInputSchema),z.lazy(() => SoftwareOnArticleWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SoftwareOnArticleWhereUniqueInputSchema),z.lazy(() => SoftwareOnArticleWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SoftwareOnArticleWhereUniqueInputSchema),z.lazy(() => SoftwareOnArticleWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SoftwareOnArticleWhereUniqueInputSchema),z.lazy(() => SoftwareOnArticleWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SoftwareOnArticleUpdateWithWhereUniqueWithoutSoftwareInputSchema),z.lazy(() => SoftwareOnArticleUpdateWithWhereUniqueWithoutSoftwareInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SoftwareOnArticleUpdateManyWithWhereWithoutSoftwareInputSchema),z.lazy(() => SoftwareOnArticleUpdateManyWithWhereWithoutSoftwareInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SoftwareOnArticleScalarWhereInputSchema),z.lazy(() => SoftwareOnArticleScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TagCreateNestedOneWithoutSoftwaresInputSchema: z.ZodType<Prisma.TagCreateNestedOneWithoutSoftwaresInput> = z.object({
  create: z.union([ z.lazy(() => TagCreateWithoutSoftwaresInputSchema),z.lazy(() => TagUncheckedCreateWithoutSoftwaresInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TagCreateOrConnectWithoutSoftwaresInputSchema).optional(),
  connect: z.lazy(() => TagWhereUniqueInputSchema).optional()
}).strict();

export const SoftwareCreateNestedOneWithoutTagsInputSchema: z.ZodType<Prisma.SoftwareCreateNestedOneWithoutTagsInput> = z.object({
  create: z.union([ z.lazy(() => SoftwareCreateWithoutTagsInputSchema),z.lazy(() => SoftwareUncheckedCreateWithoutTagsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SoftwareCreateOrConnectWithoutTagsInputSchema).optional(),
  connect: z.lazy(() => SoftwareWhereUniqueInputSchema).optional()
}).strict();

export const TagUpdateOneRequiredWithoutSoftwaresNestedInputSchema: z.ZodType<Prisma.TagUpdateOneRequiredWithoutSoftwaresNestedInput> = z.object({
  create: z.union([ z.lazy(() => TagCreateWithoutSoftwaresInputSchema),z.lazy(() => TagUncheckedCreateWithoutSoftwaresInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TagCreateOrConnectWithoutSoftwaresInputSchema).optional(),
  upsert: z.lazy(() => TagUpsertWithoutSoftwaresInputSchema).optional(),
  connect: z.lazy(() => TagWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TagUpdateToOneWithWhereWithoutSoftwaresInputSchema),z.lazy(() => TagUpdateWithoutSoftwaresInputSchema),z.lazy(() => TagUncheckedUpdateWithoutSoftwaresInputSchema) ]).optional(),
}).strict();

export const SoftwareUpdateOneRequiredWithoutTagsNestedInputSchema: z.ZodType<Prisma.SoftwareUpdateOneRequiredWithoutTagsNestedInput> = z.object({
  create: z.union([ z.lazy(() => SoftwareCreateWithoutTagsInputSchema),z.lazy(() => SoftwareUncheckedCreateWithoutTagsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SoftwareCreateOrConnectWithoutTagsInputSchema).optional(),
  upsert: z.lazy(() => SoftwareUpsertWithoutTagsInputSchema).optional(),
  connect: z.lazy(() => SoftwareWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SoftwareUpdateToOneWithWhereWithoutTagsInputSchema),z.lazy(() => SoftwareUpdateWithoutTagsInputSchema),z.lazy(() => SoftwareUncheckedUpdateWithoutTagsInputSchema) ]).optional(),
}).strict();

export const SoftwareCreateNestedOneWithoutRanksInputSchema: z.ZodType<Prisma.SoftwareCreateNestedOneWithoutRanksInput> = z.object({
  create: z.union([ z.lazy(() => SoftwareCreateWithoutRanksInputSchema),z.lazy(() => SoftwareUncheckedCreateWithoutRanksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SoftwareCreateOrConnectWithoutRanksInputSchema).optional(),
  connect: z.lazy(() => SoftwareWhereUniqueInputSchema).optional()
}).strict();

export const RankCreateNestedOneWithoutSoftwaresInputSchema: z.ZodType<Prisma.RankCreateNestedOneWithoutSoftwaresInput> = z.object({
  create: z.union([ z.lazy(() => RankCreateWithoutSoftwaresInputSchema),z.lazy(() => RankUncheckedCreateWithoutSoftwaresInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RankCreateOrConnectWithoutSoftwaresInputSchema).optional(),
  connect: z.lazy(() => RankWhereUniqueInputSchema).optional()
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const SoftwareUpdateOneRequiredWithoutRanksNestedInputSchema: z.ZodType<Prisma.SoftwareUpdateOneRequiredWithoutRanksNestedInput> = z.object({
  create: z.union([ z.lazy(() => SoftwareCreateWithoutRanksInputSchema),z.lazy(() => SoftwareUncheckedCreateWithoutRanksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SoftwareCreateOrConnectWithoutRanksInputSchema).optional(),
  upsert: z.lazy(() => SoftwareUpsertWithoutRanksInputSchema).optional(),
  connect: z.lazy(() => SoftwareWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SoftwareUpdateToOneWithWhereWithoutRanksInputSchema),z.lazy(() => SoftwareUpdateWithoutRanksInputSchema),z.lazy(() => SoftwareUncheckedUpdateWithoutRanksInputSchema) ]).optional(),
}).strict();

export const RankUpdateOneRequiredWithoutSoftwaresNestedInputSchema: z.ZodType<Prisma.RankUpdateOneRequiredWithoutSoftwaresNestedInput> = z.object({
  create: z.union([ z.lazy(() => RankCreateWithoutSoftwaresInputSchema),z.lazy(() => RankUncheckedCreateWithoutSoftwaresInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RankCreateOrConnectWithoutSoftwaresInputSchema).optional(),
  upsert: z.lazy(() => RankUpsertWithoutSoftwaresInputSchema).optional(),
  connect: z.lazy(() => RankWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => RankUpdateToOneWithWhereWithoutSoftwaresInputSchema),z.lazy(() => RankUpdateWithoutSoftwaresInputSchema),z.lazy(() => RankUncheckedUpdateWithoutSoftwaresInputSchema) ]).optional(),
}).strict();

export const SoftwareCreateNestedOneWithoutArticlesInputSchema: z.ZodType<Prisma.SoftwareCreateNestedOneWithoutArticlesInput> = z.object({
  create: z.union([ z.lazy(() => SoftwareCreateWithoutArticlesInputSchema),z.lazy(() => SoftwareUncheckedCreateWithoutArticlesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SoftwareCreateOrConnectWithoutArticlesInputSchema).optional(),
  connect: z.lazy(() => SoftwareWhereUniqueInputSchema).optional()
}).strict();

export const ArticleCreateNestedOneWithoutSoftwaresInputSchema: z.ZodType<Prisma.ArticleCreateNestedOneWithoutSoftwaresInput> = z.object({
  create: z.union([ z.lazy(() => ArticleCreateWithoutSoftwaresInputSchema),z.lazy(() => ArticleUncheckedCreateWithoutSoftwaresInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ArticleCreateOrConnectWithoutSoftwaresInputSchema).optional(),
  connect: z.lazy(() => ArticleWhereUniqueInputSchema).optional()
}).strict();

export const SoftwareUpdateOneRequiredWithoutArticlesNestedInputSchema: z.ZodType<Prisma.SoftwareUpdateOneRequiredWithoutArticlesNestedInput> = z.object({
  create: z.union([ z.lazy(() => SoftwareCreateWithoutArticlesInputSchema),z.lazy(() => SoftwareUncheckedCreateWithoutArticlesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SoftwareCreateOrConnectWithoutArticlesInputSchema).optional(),
  upsert: z.lazy(() => SoftwareUpsertWithoutArticlesInputSchema).optional(),
  connect: z.lazy(() => SoftwareWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SoftwareUpdateToOneWithWhereWithoutArticlesInputSchema),z.lazy(() => SoftwareUpdateWithoutArticlesInputSchema),z.lazy(() => SoftwareUncheckedUpdateWithoutArticlesInputSchema) ]).optional(),
}).strict();

export const ArticleUpdateOneRequiredWithoutSoftwaresNestedInputSchema: z.ZodType<Prisma.ArticleUpdateOneRequiredWithoutSoftwaresNestedInput> = z.object({
  create: z.union([ z.lazy(() => ArticleCreateWithoutSoftwaresInputSchema),z.lazy(() => ArticleUncheckedCreateWithoutSoftwaresInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ArticleCreateOrConnectWithoutSoftwaresInputSchema).optional(),
  upsert: z.lazy(() => ArticleUpsertWithoutSoftwaresInputSchema).optional(),
  connect: z.lazy(() => ArticleWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ArticleUpdateToOneWithWhereWithoutSoftwaresInputSchema),z.lazy(() => ArticleUpdateWithoutSoftwaresInputSchema),z.lazy(() => ArticleUncheckedUpdateWithoutSoftwaresInputSchema) ]).optional(),
}).strict();

export const RankCreateNestedOneWithoutArticlesInputSchema: z.ZodType<Prisma.RankCreateNestedOneWithoutArticlesInput> = z.object({
  create: z.union([ z.lazy(() => RankCreateWithoutArticlesInputSchema),z.lazy(() => RankUncheckedCreateWithoutArticlesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RankCreateOrConnectWithoutArticlesInputSchema).optional(),
  connect: z.lazy(() => RankWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutArticlesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutArticlesInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutArticlesInputSchema),z.lazy(() => UserUncheckedCreateWithoutArticlesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutArticlesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const SoftwareOnArticleCreateNestedManyWithoutArticleInputSchema: z.ZodType<Prisma.SoftwareOnArticleCreateNestedManyWithoutArticleInput> = z.object({
  create: z.union([ z.lazy(() => SoftwareOnArticleCreateWithoutArticleInputSchema),z.lazy(() => SoftwareOnArticleCreateWithoutArticleInputSchema).array(),z.lazy(() => SoftwareOnArticleUncheckedCreateWithoutArticleInputSchema),z.lazy(() => SoftwareOnArticleUncheckedCreateWithoutArticleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SoftwareOnArticleCreateOrConnectWithoutArticleInputSchema),z.lazy(() => SoftwareOnArticleCreateOrConnectWithoutArticleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SoftwareOnArticleCreateManyArticleInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SoftwareOnArticleWhereUniqueInputSchema),z.lazy(() => SoftwareOnArticleWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SoftwareOnArticleUncheckedCreateNestedManyWithoutArticleInputSchema: z.ZodType<Prisma.SoftwareOnArticleUncheckedCreateNestedManyWithoutArticleInput> = z.object({
  create: z.union([ z.lazy(() => SoftwareOnArticleCreateWithoutArticleInputSchema),z.lazy(() => SoftwareOnArticleCreateWithoutArticleInputSchema).array(),z.lazy(() => SoftwareOnArticleUncheckedCreateWithoutArticleInputSchema),z.lazy(() => SoftwareOnArticleUncheckedCreateWithoutArticleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SoftwareOnArticleCreateOrConnectWithoutArticleInputSchema),z.lazy(() => SoftwareOnArticleCreateOrConnectWithoutArticleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SoftwareOnArticleCreateManyArticleInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SoftwareOnArticleWhereUniqueInputSchema),z.lazy(() => SoftwareOnArticleWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RankUpdateOneRequiredWithoutArticlesNestedInputSchema: z.ZodType<Prisma.RankUpdateOneRequiredWithoutArticlesNestedInput> = z.object({
  create: z.union([ z.lazy(() => RankCreateWithoutArticlesInputSchema),z.lazy(() => RankUncheckedCreateWithoutArticlesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RankCreateOrConnectWithoutArticlesInputSchema).optional(),
  upsert: z.lazy(() => RankUpsertWithoutArticlesInputSchema).optional(),
  connect: z.lazy(() => RankWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => RankUpdateToOneWithWhereWithoutArticlesInputSchema),z.lazy(() => RankUpdateWithoutArticlesInputSchema),z.lazy(() => RankUncheckedUpdateWithoutArticlesInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutArticlesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutArticlesNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutArticlesInputSchema),z.lazy(() => UserUncheckedCreateWithoutArticlesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutArticlesInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutArticlesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutArticlesInputSchema),z.lazy(() => UserUpdateWithoutArticlesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutArticlesInputSchema) ]).optional(),
}).strict();

export const SoftwareOnArticleUpdateManyWithoutArticleNestedInputSchema: z.ZodType<Prisma.SoftwareOnArticleUpdateManyWithoutArticleNestedInput> = z.object({
  create: z.union([ z.lazy(() => SoftwareOnArticleCreateWithoutArticleInputSchema),z.lazy(() => SoftwareOnArticleCreateWithoutArticleInputSchema).array(),z.lazy(() => SoftwareOnArticleUncheckedCreateWithoutArticleInputSchema),z.lazy(() => SoftwareOnArticleUncheckedCreateWithoutArticleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SoftwareOnArticleCreateOrConnectWithoutArticleInputSchema),z.lazy(() => SoftwareOnArticleCreateOrConnectWithoutArticleInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SoftwareOnArticleUpsertWithWhereUniqueWithoutArticleInputSchema),z.lazy(() => SoftwareOnArticleUpsertWithWhereUniqueWithoutArticleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SoftwareOnArticleCreateManyArticleInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SoftwareOnArticleWhereUniqueInputSchema),z.lazy(() => SoftwareOnArticleWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SoftwareOnArticleWhereUniqueInputSchema),z.lazy(() => SoftwareOnArticleWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SoftwareOnArticleWhereUniqueInputSchema),z.lazy(() => SoftwareOnArticleWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SoftwareOnArticleWhereUniqueInputSchema),z.lazy(() => SoftwareOnArticleWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SoftwareOnArticleUpdateWithWhereUniqueWithoutArticleInputSchema),z.lazy(() => SoftwareOnArticleUpdateWithWhereUniqueWithoutArticleInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SoftwareOnArticleUpdateManyWithWhereWithoutArticleInputSchema),z.lazy(() => SoftwareOnArticleUpdateManyWithWhereWithoutArticleInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SoftwareOnArticleScalarWhereInputSchema),z.lazy(() => SoftwareOnArticleScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SoftwareOnArticleUncheckedUpdateManyWithoutArticleNestedInputSchema: z.ZodType<Prisma.SoftwareOnArticleUncheckedUpdateManyWithoutArticleNestedInput> = z.object({
  create: z.union([ z.lazy(() => SoftwareOnArticleCreateWithoutArticleInputSchema),z.lazy(() => SoftwareOnArticleCreateWithoutArticleInputSchema).array(),z.lazy(() => SoftwareOnArticleUncheckedCreateWithoutArticleInputSchema),z.lazy(() => SoftwareOnArticleUncheckedCreateWithoutArticleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SoftwareOnArticleCreateOrConnectWithoutArticleInputSchema),z.lazy(() => SoftwareOnArticleCreateOrConnectWithoutArticleInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SoftwareOnArticleUpsertWithWhereUniqueWithoutArticleInputSchema),z.lazy(() => SoftwareOnArticleUpsertWithWhereUniqueWithoutArticleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SoftwareOnArticleCreateManyArticleInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SoftwareOnArticleWhereUniqueInputSchema),z.lazy(() => SoftwareOnArticleWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SoftwareOnArticleWhereUniqueInputSchema),z.lazy(() => SoftwareOnArticleWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SoftwareOnArticleWhereUniqueInputSchema),z.lazy(() => SoftwareOnArticleWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SoftwareOnArticleWhereUniqueInputSchema),z.lazy(() => SoftwareOnArticleWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SoftwareOnArticleUpdateWithWhereUniqueWithoutArticleInputSchema),z.lazy(() => SoftwareOnArticleUpdateWithWhereUniqueWithoutArticleInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SoftwareOnArticleUpdateManyWithWhereWithoutArticleInputSchema),z.lazy(() => SoftwareOnArticleUpdateManyWithWhereWithoutArticleInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SoftwareOnArticleScalarWhereInputSchema),z.lazy(() => SoftwareOnArticleScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RankCreateNestedOneWithoutLikesInputSchema: z.ZodType<Prisma.RankCreateNestedOneWithoutLikesInput> = z.object({
  create: z.union([ z.lazy(() => RankCreateWithoutLikesInputSchema),z.lazy(() => RankUncheckedCreateWithoutLikesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RankCreateOrConnectWithoutLikesInputSchema).optional(),
  connect: z.lazy(() => RankWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutRankLikesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutRankLikesInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRankLikesInputSchema),z.lazy(() => UserUncheckedCreateWithoutRankLikesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutRankLikesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const RankUpdateOneRequiredWithoutLikesNestedInputSchema: z.ZodType<Prisma.RankUpdateOneRequiredWithoutLikesNestedInput> = z.object({
  create: z.union([ z.lazy(() => RankCreateWithoutLikesInputSchema),z.lazy(() => RankUncheckedCreateWithoutLikesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RankCreateOrConnectWithoutLikesInputSchema).optional(),
  upsert: z.lazy(() => RankUpsertWithoutLikesInputSchema).optional(),
  connect: z.lazy(() => RankWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => RankUpdateToOneWithWhereWithoutLikesInputSchema),z.lazy(() => RankUpdateWithoutLikesInputSchema),z.lazy(() => RankUncheckedUpdateWithoutLikesInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutRankLikesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutRankLikesNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRankLikesInputSchema),z.lazy(() => UserUncheckedCreateWithoutRankLikesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutRankLikesInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutRankLikesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutRankLikesInputSchema),z.lazy(() => UserUpdateWithoutRankLikesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRankLikesInputSchema) ]).optional(),
}).strict();

export const RankCreateNestedOneWithoutFavoritesInputSchema: z.ZodType<Prisma.RankCreateNestedOneWithoutFavoritesInput> = z.object({
  create: z.union([ z.lazy(() => RankCreateWithoutFavoritesInputSchema),z.lazy(() => RankUncheckedCreateWithoutFavoritesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RankCreateOrConnectWithoutFavoritesInputSchema).optional(),
  connect: z.lazy(() => RankWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutRankFavoritesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutRankFavoritesInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRankFavoritesInputSchema),z.lazy(() => UserUncheckedCreateWithoutRankFavoritesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutRankFavoritesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const RankUpdateOneRequiredWithoutFavoritesNestedInputSchema: z.ZodType<Prisma.RankUpdateOneRequiredWithoutFavoritesNestedInput> = z.object({
  create: z.union([ z.lazy(() => RankCreateWithoutFavoritesInputSchema),z.lazy(() => RankUncheckedCreateWithoutFavoritesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RankCreateOrConnectWithoutFavoritesInputSchema).optional(),
  upsert: z.lazy(() => RankUpsertWithoutFavoritesInputSchema).optional(),
  connect: z.lazy(() => RankWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => RankUpdateToOneWithWhereWithoutFavoritesInputSchema),z.lazy(() => RankUpdateWithoutFavoritesInputSchema),z.lazy(() => RankUncheckedUpdateWithoutFavoritesInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutRankFavoritesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutRankFavoritesNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRankFavoritesInputSchema),z.lazy(() => UserUncheckedCreateWithoutRankFavoritesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutRankFavoritesInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutRankFavoritesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutRankFavoritesInputSchema),z.lazy(() => UserUpdateWithoutRankFavoritesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRankFavoritesInputSchema) ]).optional(),
}).strict();

export const SoftwareCreateNestedOneWithoutLikesInputSchema: z.ZodType<Prisma.SoftwareCreateNestedOneWithoutLikesInput> = z.object({
  create: z.union([ z.lazy(() => SoftwareCreateWithoutLikesInputSchema),z.lazy(() => SoftwareUncheckedCreateWithoutLikesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SoftwareCreateOrConnectWithoutLikesInputSchema).optional(),
  connect: z.lazy(() => SoftwareWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutSoftwareLikesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSoftwareLikesInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSoftwareLikesInputSchema),z.lazy(() => UserUncheckedCreateWithoutSoftwareLikesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSoftwareLikesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const SoftwareUpdateOneRequiredWithoutLikesNestedInputSchema: z.ZodType<Prisma.SoftwareUpdateOneRequiredWithoutLikesNestedInput> = z.object({
  create: z.union([ z.lazy(() => SoftwareCreateWithoutLikesInputSchema),z.lazy(() => SoftwareUncheckedCreateWithoutLikesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SoftwareCreateOrConnectWithoutLikesInputSchema).optional(),
  upsert: z.lazy(() => SoftwareUpsertWithoutLikesInputSchema).optional(),
  connect: z.lazy(() => SoftwareWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SoftwareUpdateToOneWithWhereWithoutLikesInputSchema),z.lazy(() => SoftwareUpdateWithoutLikesInputSchema),z.lazy(() => SoftwareUncheckedUpdateWithoutLikesInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutSoftwareLikesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSoftwareLikesNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSoftwareLikesInputSchema),z.lazy(() => UserUncheckedCreateWithoutSoftwareLikesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSoftwareLikesInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSoftwareLikesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutSoftwareLikesInputSchema),z.lazy(() => UserUpdateWithoutSoftwareLikesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSoftwareLikesInputSchema) ]).optional(),
}).strict();

export const SoftwareCreateNestedOneWithoutFavoritesInputSchema: z.ZodType<Prisma.SoftwareCreateNestedOneWithoutFavoritesInput> = z.object({
  create: z.union([ z.lazy(() => SoftwareCreateWithoutFavoritesInputSchema),z.lazy(() => SoftwareUncheckedCreateWithoutFavoritesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SoftwareCreateOrConnectWithoutFavoritesInputSchema).optional(),
  connect: z.lazy(() => SoftwareWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutSoftwareFavoritesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSoftwareFavoritesInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSoftwareFavoritesInputSchema),z.lazy(() => UserUncheckedCreateWithoutSoftwareFavoritesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSoftwareFavoritesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const SoftwareUpdateOneRequiredWithoutFavoritesNestedInputSchema: z.ZodType<Prisma.SoftwareUpdateOneRequiredWithoutFavoritesNestedInput> = z.object({
  create: z.union([ z.lazy(() => SoftwareCreateWithoutFavoritesInputSchema),z.lazy(() => SoftwareUncheckedCreateWithoutFavoritesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SoftwareCreateOrConnectWithoutFavoritesInputSchema).optional(),
  upsert: z.lazy(() => SoftwareUpsertWithoutFavoritesInputSchema).optional(),
  connect: z.lazy(() => SoftwareWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SoftwareUpdateToOneWithWhereWithoutFavoritesInputSchema),z.lazy(() => SoftwareUpdateWithoutFavoritesInputSchema),z.lazy(() => SoftwareUncheckedUpdateWithoutFavoritesInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutSoftwareFavoritesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSoftwareFavoritesNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSoftwareFavoritesInputSchema),z.lazy(() => UserUncheckedCreateWithoutSoftwareFavoritesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSoftwareFavoritesInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSoftwareFavoritesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutSoftwareFavoritesInputSchema),z.lazy(() => UserUpdateWithoutSoftwareFavoritesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSoftwareFavoritesInputSchema) ]).optional(),
}).strict();

export const RankCreateNestedOneWithoutCommentsInputSchema: z.ZodType<Prisma.RankCreateNestedOneWithoutCommentsInput> = z.object({
  create: z.union([ z.lazy(() => RankCreateWithoutCommentsInputSchema),z.lazy(() => RankUncheckedCreateWithoutCommentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RankCreateOrConnectWithoutCommentsInputSchema).optional(),
  connect: z.lazy(() => RankWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutRankCommentsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutRankCommentsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRankCommentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutRankCommentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutRankCommentsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const RankUpdateOneRequiredWithoutCommentsNestedInputSchema: z.ZodType<Prisma.RankUpdateOneRequiredWithoutCommentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => RankCreateWithoutCommentsInputSchema),z.lazy(() => RankUncheckedCreateWithoutCommentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RankCreateOrConnectWithoutCommentsInputSchema).optional(),
  upsert: z.lazy(() => RankUpsertWithoutCommentsInputSchema).optional(),
  connect: z.lazy(() => RankWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => RankUpdateToOneWithWhereWithoutCommentsInputSchema),z.lazy(() => RankUpdateWithoutCommentsInputSchema),z.lazy(() => RankUncheckedUpdateWithoutCommentsInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutRankCommentsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutRankCommentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRankCommentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutRankCommentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutRankCommentsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutRankCommentsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutRankCommentsInputSchema),z.lazy(() => UserUpdateWithoutRankCommentsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRankCommentsInputSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedEnumPlatformFilterSchema: z.ZodType<Prisma.NestedEnumPlatformFilter> = z.object({
  equals: z.lazy(() => PlatformSchema).optional(),
  in: z.lazy(() => PlatformSchema).array().optional(),
  notIn: z.lazy(() => PlatformSchema).array().optional(),
  not: z.union([ z.lazy(() => PlatformSchema),z.lazy(() => NestedEnumPlatformFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedEnumPlatformWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumPlatformWithAggregatesFilter> = z.object({
  equals: z.lazy(() => PlatformSchema).optional(),
  in: z.lazy(() => PlatformSchema).array().optional(),
  notIn: z.lazy(() => PlatformSchema).array().optional(),
  not: z.union([ z.lazy(() => PlatformSchema),z.lazy(() => NestedEnumPlatformWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumPlatformFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumPlatformFilterSchema).optional()
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const UserCreateWithoutPlatformsInputSchema: z.ZodType<Prisma.UserCreateWithoutPlatformsInput> = z.object({
  address: z.string(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  referralCode: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  invitedBy: z.union([ z.lazy(() => UserCreateinvitedByInputSchema),z.string().array() ]).optional(),
  ranks: z.lazy(() => RankCreateNestedManyWithoutUserInputSchema).optional(),
  articles: z.lazy(() => ArticleCreateNestedManyWithoutAuthorInputSchema).optional(),
  rankLikes: z.lazy(() => RankLikeCreateNestedManyWithoutUserInputSchema).optional(),
  rankFavorites: z.lazy(() => RankFavoriteCreateNestedManyWithoutUserInputSchema).optional(),
  softwareLikes: z.lazy(() => SoftwareLikeCreateNestedManyWithoutUserInputSchema).optional(),
  softwareFavorites: z.lazy(() => SoftwareFavoriteCreateNestedManyWithoutUserInputSchema).optional(),
  rankComments: z.lazy(() => RankCommentCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutPlatformsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutPlatformsInput> = z.object({
  address: z.string(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  referralCode: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  invitedBy: z.union([ z.lazy(() => UserCreateinvitedByInputSchema),z.string().array() ]).optional(),
  ranks: z.lazy(() => RankUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  articles: z.lazy(() => ArticleUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  rankLikes: z.lazy(() => RankLikeUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  rankFavorites: z.lazy(() => RankFavoriteUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  softwareLikes: z.lazy(() => SoftwareLikeUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  softwareFavorites: z.lazy(() => SoftwareFavoriteUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  rankComments: z.lazy(() => RankCommentUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutPlatformsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutPlatformsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutPlatformsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPlatformsInputSchema) ]),
}).strict();

export const UserUpsertWithoutPlatformsInputSchema: z.ZodType<Prisma.UserUpsertWithoutPlatformsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutPlatformsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPlatformsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutPlatformsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPlatformsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutPlatformsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutPlatformsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutPlatformsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPlatformsInputSchema) ]),
}).strict();

export const UserUpdateWithoutPlatformsInputSchema: z.ZodType<Prisma.UserUpdateWithoutPlatformsInput> = z.object({
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  referralCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  invitedBy: z.union([ z.lazy(() => UserUpdateinvitedByInputSchema),z.string().array() ]).optional(),
  ranks: z.lazy(() => RankUpdateManyWithoutUserNestedInputSchema).optional(),
  articles: z.lazy(() => ArticleUpdateManyWithoutAuthorNestedInputSchema).optional(),
  rankLikes: z.lazy(() => RankLikeUpdateManyWithoutUserNestedInputSchema).optional(),
  rankFavorites: z.lazy(() => RankFavoriteUpdateManyWithoutUserNestedInputSchema).optional(),
  softwareLikes: z.lazy(() => SoftwareLikeUpdateManyWithoutUserNestedInputSchema).optional(),
  softwareFavorites: z.lazy(() => SoftwareFavoriteUpdateManyWithoutUserNestedInputSchema).optional(),
  rankComments: z.lazy(() => RankCommentUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutPlatformsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutPlatformsInput> = z.object({
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  referralCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  invitedBy: z.union([ z.lazy(() => UserUpdateinvitedByInputSchema),z.string().array() ]).optional(),
  ranks: z.lazy(() => RankUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  articles: z.lazy(() => ArticleUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  rankLikes: z.lazy(() => RankLikeUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  rankFavorites: z.lazy(() => RankFavoriteUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  softwareLikes: z.lazy(() => SoftwareLikeUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  softwareFavorites: z.lazy(() => SoftwareFavoriteUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  rankComments: z.lazy(() => RankCommentUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const RankCreateWithoutUserInputSchema: z.ZodType<Prisma.RankCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tags: z.lazy(() => RankTagCreateNestedManyWithoutRankInputSchema).optional(),
  softwares: z.lazy(() => SoftwareOnRankCreateNestedManyWithoutRankInputSchema).optional(),
  articles: z.lazy(() => ArticleCreateNestedManyWithoutRankInputSchema).optional(),
  likes: z.lazy(() => RankLikeCreateNestedManyWithoutRankInputSchema).optional(),
  favorites: z.lazy(() => RankFavoriteCreateNestedManyWithoutRankInputSchema).optional(),
  comments: z.lazy(() => RankCommentCreateNestedManyWithoutRankInputSchema).optional()
}).strict();

export const RankUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.RankUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tags: z.lazy(() => RankTagUncheckedCreateNestedManyWithoutRankInputSchema).optional(),
  softwares: z.lazy(() => SoftwareOnRankUncheckedCreateNestedManyWithoutRankInputSchema).optional(),
  articles: z.lazy(() => ArticleUncheckedCreateNestedManyWithoutRankInputSchema).optional(),
  likes: z.lazy(() => RankLikeUncheckedCreateNestedManyWithoutRankInputSchema).optional(),
  favorites: z.lazy(() => RankFavoriteUncheckedCreateNestedManyWithoutRankInputSchema).optional(),
  comments: z.lazy(() => RankCommentUncheckedCreateNestedManyWithoutRankInputSchema).optional()
}).strict();

export const RankCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.RankCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => RankWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RankCreateWithoutUserInputSchema),z.lazy(() => RankUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const RankCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.RankCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RankCreateManyUserInputSchema),z.lazy(() => RankCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserPlatformCreateWithoutUserInputSchema: z.ZodType<Prisma.UserPlatformCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  platform: z.lazy(() => PlatformSchema).optional(),
  platformId: z.string(),
  platformName: z.string(),
  platformAvatar: z.string()
}).strict();

export const UserPlatformUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.UserPlatformUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  platform: z.lazy(() => PlatformSchema).optional(),
  platformId: z.string(),
  platformName: z.string(),
  platformAvatar: z.string()
}).strict();

export const UserPlatformCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.UserPlatformCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => UserPlatformWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserPlatformCreateWithoutUserInputSchema),z.lazy(() => UserPlatformUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const UserPlatformCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.UserPlatformCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UserPlatformCreateManyUserInputSchema),z.lazy(() => UserPlatformCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ArticleCreateWithoutAuthorInputSchema: z.ZodType<Prisma.ArticleCreateWithoutAuthorInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string(),
  image: z.string(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  rank: z.lazy(() => RankCreateNestedOneWithoutArticlesInputSchema),
  softwares: z.lazy(() => SoftwareOnArticleCreateNestedManyWithoutArticleInputSchema).optional()
}).strict();

export const ArticleUncheckedCreateWithoutAuthorInputSchema: z.ZodType<Prisma.ArticleUncheckedCreateWithoutAuthorInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string(),
  image: z.string(),
  content: z.string(),
  rankId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  softwares: z.lazy(() => SoftwareOnArticleUncheckedCreateNestedManyWithoutArticleInputSchema).optional()
}).strict();

export const ArticleCreateOrConnectWithoutAuthorInputSchema: z.ZodType<Prisma.ArticleCreateOrConnectWithoutAuthorInput> = z.object({
  where: z.lazy(() => ArticleWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ArticleCreateWithoutAuthorInputSchema),z.lazy(() => ArticleUncheckedCreateWithoutAuthorInputSchema) ]),
}).strict();

export const ArticleCreateManyAuthorInputEnvelopeSchema: z.ZodType<Prisma.ArticleCreateManyAuthorInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ArticleCreateManyAuthorInputSchema),z.lazy(() => ArticleCreateManyAuthorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const RankLikeCreateWithoutUserInputSchema: z.ZodType<Prisma.RankLikeCreateWithoutUserInput> = z.object({
  createdAt: z.coerce.date().optional(),
  rank: z.lazy(() => RankCreateNestedOneWithoutLikesInputSchema)
}).strict();

export const RankLikeUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.RankLikeUncheckedCreateWithoutUserInput> = z.object({
  rankId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const RankLikeCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.RankLikeCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => RankLikeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RankLikeCreateWithoutUserInputSchema),z.lazy(() => RankLikeUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const RankLikeCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.RankLikeCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RankLikeCreateManyUserInputSchema),z.lazy(() => RankLikeCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const RankFavoriteCreateWithoutUserInputSchema: z.ZodType<Prisma.RankFavoriteCreateWithoutUserInput> = z.object({
  createdAt: z.coerce.date().optional(),
  rank: z.lazy(() => RankCreateNestedOneWithoutFavoritesInputSchema)
}).strict();

export const RankFavoriteUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.RankFavoriteUncheckedCreateWithoutUserInput> = z.object({
  rankId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const RankFavoriteCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.RankFavoriteCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => RankFavoriteWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RankFavoriteCreateWithoutUserInputSchema),z.lazy(() => RankFavoriteUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const RankFavoriteCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.RankFavoriteCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RankFavoriteCreateManyUserInputSchema),z.lazy(() => RankFavoriteCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const SoftwareLikeCreateWithoutUserInputSchema: z.ZodType<Prisma.SoftwareLikeCreateWithoutUserInput> = z.object({
  createdAt: z.coerce.date().optional(),
  software: z.lazy(() => SoftwareCreateNestedOneWithoutLikesInputSchema)
}).strict();

export const SoftwareLikeUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.SoftwareLikeUncheckedCreateWithoutUserInput> = z.object({
  softwareId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const SoftwareLikeCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.SoftwareLikeCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => SoftwareLikeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SoftwareLikeCreateWithoutUserInputSchema),z.lazy(() => SoftwareLikeUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SoftwareLikeCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.SoftwareLikeCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SoftwareLikeCreateManyUserInputSchema),z.lazy(() => SoftwareLikeCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const SoftwareFavoriteCreateWithoutUserInputSchema: z.ZodType<Prisma.SoftwareFavoriteCreateWithoutUserInput> = z.object({
  createdAt: z.coerce.date().optional(),
  software: z.lazy(() => SoftwareCreateNestedOneWithoutFavoritesInputSchema)
}).strict();

export const SoftwareFavoriteUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.SoftwareFavoriteUncheckedCreateWithoutUserInput> = z.object({
  softwareId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const SoftwareFavoriteCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.SoftwareFavoriteCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => SoftwareFavoriteWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SoftwareFavoriteCreateWithoutUserInputSchema),z.lazy(() => SoftwareFavoriteUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SoftwareFavoriteCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.SoftwareFavoriteCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SoftwareFavoriteCreateManyUserInputSchema),z.lazy(() => SoftwareFavoriteCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const RankCommentCreateWithoutUserInputSchema: z.ZodType<Prisma.RankCommentCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  replyToComment: z.string().optional().nullable(),
  replyToUser: z.string().optional().nullable(),
  rootCommentId: z.string().optional().nullable(),
  rank: z.lazy(() => RankCreateNestedOneWithoutCommentsInputSchema)
}).strict();

export const RankCommentUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.RankCommentUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  rankId: z.string(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  replyToComment: z.string().optional().nullable(),
  replyToUser: z.string().optional().nullable(),
  rootCommentId: z.string().optional().nullable()
}).strict();

export const RankCommentCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.RankCommentCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => RankCommentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RankCommentCreateWithoutUserInputSchema),z.lazy(() => RankCommentUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const RankCommentCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.RankCommentCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RankCommentCreateManyUserInputSchema),z.lazy(() => RankCommentCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const RankUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.RankUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => RankWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RankUpdateWithoutUserInputSchema),z.lazy(() => RankUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => RankCreateWithoutUserInputSchema),z.lazy(() => RankUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const RankUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.RankUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => RankWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RankUpdateWithoutUserInputSchema),z.lazy(() => RankUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const RankUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.RankUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => RankScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RankUpdateManyMutationInputSchema),z.lazy(() => RankUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const RankScalarWhereInputSchema: z.ZodType<Prisma.RankScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RankScalarWhereInputSchema),z.lazy(() => RankScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RankScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RankScalarWhereInputSchema),z.lazy(() => RankScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userAddress: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserPlatformUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UserPlatformUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => UserPlatformWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserPlatformUpdateWithoutUserInputSchema),z.lazy(() => UserPlatformUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => UserPlatformCreateWithoutUserInputSchema),z.lazy(() => UserPlatformUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const UserPlatformUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UserPlatformUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => UserPlatformWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserPlatformUpdateWithoutUserInputSchema),z.lazy(() => UserPlatformUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const UserPlatformUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.UserPlatformUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => UserPlatformScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserPlatformUpdateManyMutationInputSchema),z.lazy(() => UserPlatformUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const UserPlatformScalarWhereInputSchema: z.ZodType<Prisma.UserPlatformScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserPlatformScalarWhereInputSchema),z.lazy(() => UserPlatformScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserPlatformScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserPlatformScalarWhereInputSchema),z.lazy(() => UserPlatformScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  platform: z.union([ z.lazy(() => EnumPlatformFilterSchema),z.lazy(() => PlatformSchema) ]).optional(),
  platformId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  platformName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  platformAvatar: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userAddress: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const ArticleUpsertWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.ArticleUpsertWithWhereUniqueWithoutAuthorInput> = z.object({
  where: z.lazy(() => ArticleWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ArticleUpdateWithoutAuthorInputSchema),z.lazy(() => ArticleUncheckedUpdateWithoutAuthorInputSchema) ]),
  create: z.union([ z.lazy(() => ArticleCreateWithoutAuthorInputSchema),z.lazy(() => ArticleUncheckedCreateWithoutAuthorInputSchema) ]),
}).strict();

export const ArticleUpdateWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.ArticleUpdateWithWhereUniqueWithoutAuthorInput> = z.object({
  where: z.lazy(() => ArticleWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ArticleUpdateWithoutAuthorInputSchema),z.lazy(() => ArticleUncheckedUpdateWithoutAuthorInputSchema) ]),
}).strict();

export const ArticleUpdateManyWithWhereWithoutAuthorInputSchema: z.ZodType<Prisma.ArticleUpdateManyWithWhereWithoutAuthorInput> = z.object({
  where: z.lazy(() => ArticleScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ArticleUpdateManyMutationInputSchema),z.lazy(() => ArticleUncheckedUpdateManyWithoutAuthorInputSchema) ]),
}).strict();

export const ArticleScalarWhereInputSchema: z.ZodType<Prisma.ArticleScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ArticleScalarWhereInputSchema),z.lazy(() => ArticleScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ArticleScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ArticleScalarWhereInputSchema),z.lazy(() => ArticleScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  image: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  rankId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userAddress: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const RankLikeUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.RankLikeUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => RankLikeWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RankLikeUpdateWithoutUserInputSchema),z.lazy(() => RankLikeUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => RankLikeCreateWithoutUserInputSchema),z.lazy(() => RankLikeUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const RankLikeUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.RankLikeUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => RankLikeWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RankLikeUpdateWithoutUserInputSchema),z.lazy(() => RankLikeUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const RankLikeUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.RankLikeUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => RankLikeScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RankLikeUpdateManyMutationInputSchema),z.lazy(() => RankLikeUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const RankLikeScalarWhereInputSchema: z.ZodType<Prisma.RankLikeScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RankLikeScalarWhereInputSchema),z.lazy(() => RankLikeScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RankLikeScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RankLikeScalarWhereInputSchema),z.lazy(() => RankLikeScalarWhereInputSchema).array() ]).optional(),
  rankId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userAddress: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const RankFavoriteUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.RankFavoriteUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => RankFavoriteWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RankFavoriteUpdateWithoutUserInputSchema),z.lazy(() => RankFavoriteUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => RankFavoriteCreateWithoutUserInputSchema),z.lazy(() => RankFavoriteUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const RankFavoriteUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.RankFavoriteUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => RankFavoriteWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RankFavoriteUpdateWithoutUserInputSchema),z.lazy(() => RankFavoriteUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const RankFavoriteUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.RankFavoriteUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => RankFavoriteScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RankFavoriteUpdateManyMutationInputSchema),z.lazy(() => RankFavoriteUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const RankFavoriteScalarWhereInputSchema: z.ZodType<Prisma.RankFavoriteScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RankFavoriteScalarWhereInputSchema),z.lazy(() => RankFavoriteScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RankFavoriteScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RankFavoriteScalarWhereInputSchema),z.lazy(() => RankFavoriteScalarWhereInputSchema).array() ]).optional(),
  rankId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userAddress: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const SoftwareLikeUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SoftwareLikeUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SoftwareLikeWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SoftwareLikeUpdateWithoutUserInputSchema),z.lazy(() => SoftwareLikeUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => SoftwareLikeCreateWithoutUserInputSchema),z.lazy(() => SoftwareLikeUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SoftwareLikeUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SoftwareLikeUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SoftwareLikeWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SoftwareLikeUpdateWithoutUserInputSchema),z.lazy(() => SoftwareLikeUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const SoftwareLikeUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.SoftwareLikeUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => SoftwareLikeScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SoftwareLikeUpdateManyMutationInputSchema),z.lazy(() => SoftwareLikeUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const SoftwareLikeScalarWhereInputSchema: z.ZodType<Prisma.SoftwareLikeScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SoftwareLikeScalarWhereInputSchema),z.lazy(() => SoftwareLikeScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SoftwareLikeScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SoftwareLikeScalarWhereInputSchema),z.lazy(() => SoftwareLikeScalarWhereInputSchema).array() ]).optional(),
  softwareId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userAddress: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const SoftwareFavoriteUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SoftwareFavoriteUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SoftwareFavoriteWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SoftwareFavoriteUpdateWithoutUserInputSchema),z.lazy(() => SoftwareFavoriteUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => SoftwareFavoriteCreateWithoutUserInputSchema),z.lazy(() => SoftwareFavoriteUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SoftwareFavoriteUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SoftwareFavoriteUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SoftwareFavoriteWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SoftwareFavoriteUpdateWithoutUserInputSchema),z.lazy(() => SoftwareFavoriteUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const SoftwareFavoriteUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.SoftwareFavoriteUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => SoftwareFavoriteScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SoftwareFavoriteUpdateManyMutationInputSchema),z.lazy(() => SoftwareFavoriteUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const SoftwareFavoriteScalarWhereInputSchema: z.ZodType<Prisma.SoftwareFavoriteScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SoftwareFavoriteScalarWhereInputSchema),z.lazy(() => SoftwareFavoriteScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SoftwareFavoriteScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SoftwareFavoriteScalarWhereInputSchema),z.lazy(() => SoftwareFavoriteScalarWhereInputSchema).array() ]).optional(),
  softwareId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userAddress: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const RankCommentUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.RankCommentUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => RankCommentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RankCommentUpdateWithoutUserInputSchema),z.lazy(() => RankCommentUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => RankCommentCreateWithoutUserInputSchema),z.lazy(() => RankCommentUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const RankCommentUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.RankCommentUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => RankCommentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RankCommentUpdateWithoutUserInputSchema),z.lazy(() => RankCommentUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const RankCommentUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.RankCommentUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => RankCommentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RankCommentUpdateManyMutationInputSchema),z.lazy(() => RankCommentUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const RankCommentScalarWhereInputSchema: z.ZodType<Prisma.RankCommentScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RankCommentScalarWhereInputSchema),z.lazy(() => RankCommentScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RankCommentScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RankCommentScalarWhereInputSchema),z.lazy(() => RankCommentScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  rankId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userAddress: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  deletedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  replyToComment: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  replyToUser: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  rootCommentId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const RankTagCreateWithoutTagInputSchema: z.ZodType<Prisma.RankTagCreateWithoutTagInput> = z.object({
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  rank: z.lazy(() => RankCreateNestedOneWithoutTagsInputSchema)
}).strict();

export const RankTagUncheckedCreateWithoutTagInputSchema: z.ZodType<Prisma.RankTagUncheckedCreateWithoutTagInput> = z.object({
  rankId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const RankTagCreateOrConnectWithoutTagInputSchema: z.ZodType<Prisma.RankTagCreateOrConnectWithoutTagInput> = z.object({
  where: z.lazy(() => RankTagWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RankTagCreateWithoutTagInputSchema),z.lazy(() => RankTagUncheckedCreateWithoutTagInputSchema) ]),
}).strict();

export const RankTagCreateManyTagInputEnvelopeSchema: z.ZodType<Prisma.RankTagCreateManyTagInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RankTagCreateManyTagInputSchema),z.lazy(() => RankTagCreateManyTagInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const SoftwareTagCreateWithoutTagInputSchema: z.ZodType<Prisma.SoftwareTagCreateWithoutTagInput> = z.object({
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  software: z.lazy(() => SoftwareCreateNestedOneWithoutTagsInputSchema)
}).strict();

export const SoftwareTagUncheckedCreateWithoutTagInputSchema: z.ZodType<Prisma.SoftwareTagUncheckedCreateWithoutTagInput> = z.object({
  softwareId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SoftwareTagCreateOrConnectWithoutTagInputSchema: z.ZodType<Prisma.SoftwareTagCreateOrConnectWithoutTagInput> = z.object({
  where: z.lazy(() => SoftwareTagWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SoftwareTagCreateWithoutTagInputSchema),z.lazy(() => SoftwareTagUncheckedCreateWithoutTagInputSchema) ]),
}).strict();

export const SoftwareTagCreateManyTagInputEnvelopeSchema: z.ZodType<Prisma.SoftwareTagCreateManyTagInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SoftwareTagCreateManyTagInputSchema),z.lazy(() => SoftwareTagCreateManyTagInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const RankTagUpsertWithWhereUniqueWithoutTagInputSchema: z.ZodType<Prisma.RankTagUpsertWithWhereUniqueWithoutTagInput> = z.object({
  where: z.lazy(() => RankTagWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RankTagUpdateWithoutTagInputSchema),z.lazy(() => RankTagUncheckedUpdateWithoutTagInputSchema) ]),
  create: z.union([ z.lazy(() => RankTagCreateWithoutTagInputSchema),z.lazy(() => RankTagUncheckedCreateWithoutTagInputSchema) ]),
}).strict();

export const RankTagUpdateWithWhereUniqueWithoutTagInputSchema: z.ZodType<Prisma.RankTagUpdateWithWhereUniqueWithoutTagInput> = z.object({
  where: z.lazy(() => RankTagWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RankTagUpdateWithoutTagInputSchema),z.lazy(() => RankTagUncheckedUpdateWithoutTagInputSchema) ]),
}).strict();

export const RankTagUpdateManyWithWhereWithoutTagInputSchema: z.ZodType<Prisma.RankTagUpdateManyWithWhereWithoutTagInput> = z.object({
  where: z.lazy(() => RankTagScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RankTagUpdateManyMutationInputSchema),z.lazy(() => RankTagUncheckedUpdateManyWithoutTagInputSchema) ]),
}).strict();

export const RankTagScalarWhereInputSchema: z.ZodType<Prisma.RankTagScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RankTagScalarWhereInputSchema),z.lazy(() => RankTagScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RankTagScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RankTagScalarWhereInputSchema),z.lazy(() => RankTagScalarWhereInputSchema).array() ]).optional(),
  tagId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  rankId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const SoftwareTagUpsertWithWhereUniqueWithoutTagInputSchema: z.ZodType<Prisma.SoftwareTagUpsertWithWhereUniqueWithoutTagInput> = z.object({
  where: z.lazy(() => SoftwareTagWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SoftwareTagUpdateWithoutTagInputSchema),z.lazy(() => SoftwareTagUncheckedUpdateWithoutTagInputSchema) ]),
  create: z.union([ z.lazy(() => SoftwareTagCreateWithoutTagInputSchema),z.lazy(() => SoftwareTagUncheckedCreateWithoutTagInputSchema) ]),
}).strict();

export const SoftwareTagUpdateWithWhereUniqueWithoutTagInputSchema: z.ZodType<Prisma.SoftwareTagUpdateWithWhereUniqueWithoutTagInput> = z.object({
  where: z.lazy(() => SoftwareTagWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SoftwareTagUpdateWithoutTagInputSchema),z.lazy(() => SoftwareTagUncheckedUpdateWithoutTagInputSchema) ]),
}).strict();

export const SoftwareTagUpdateManyWithWhereWithoutTagInputSchema: z.ZodType<Prisma.SoftwareTagUpdateManyWithWhereWithoutTagInput> = z.object({
  where: z.lazy(() => SoftwareTagScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SoftwareTagUpdateManyMutationInputSchema),z.lazy(() => SoftwareTagUncheckedUpdateManyWithoutTagInputSchema) ]),
}).strict();

export const SoftwareTagScalarWhereInputSchema: z.ZodType<Prisma.SoftwareTagScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SoftwareTagScalarWhereInputSchema),z.lazy(() => SoftwareTagScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SoftwareTagScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SoftwareTagScalarWhereInputSchema),z.lazy(() => SoftwareTagScalarWhereInputSchema).array() ]).optional(),
  tagId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  softwareId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserCreateWithoutRanksInputSchema: z.ZodType<Prisma.UserCreateWithoutRanksInput> = z.object({
  address: z.string(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  referralCode: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  invitedBy: z.union([ z.lazy(() => UserCreateinvitedByInputSchema),z.string().array() ]).optional(),
  platforms: z.lazy(() => UserPlatformCreateNestedManyWithoutUserInputSchema).optional(),
  articles: z.lazy(() => ArticleCreateNestedManyWithoutAuthorInputSchema).optional(),
  rankLikes: z.lazy(() => RankLikeCreateNestedManyWithoutUserInputSchema).optional(),
  rankFavorites: z.lazy(() => RankFavoriteCreateNestedManyWithoutUserInputSchema).optional(),
  softwareLikes: z.lazy(() => SoftwareLikeCreateNestedManyWithoutUserInputSchema).optional(),
  softwareFavorites: z.lazy(() => SoftwareFavoriteCreateNestedManyWithoutUserInputSchema).optional(),
  rankComments: z.lazy(() => RankCommentCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutRanksInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutRanksInput> = z.object({
  address: z.string(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  referralCode: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  invitedBy: z.union([ z.lazy(() => UserCreateinvitedByInputSchema),z.string().array() ]).optional(),
  platforms: z.lazy(() => UserPlatformUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  articles: z.lazy(() => ArticleUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  rankLikes: z.lazy(() => RankLikeUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  rankFavorites: z.lazy(() => RankFavoriteUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  softwareLikes: z.lazy(() => SoftwareLikeUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  softwareFavorites: z.lazy(() => SoftwareFavoriteUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  rankComments: z.lazy(() => RankCommentUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutRanksInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutRanksInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutRanksInputSchema),z.lazy(() => UserUncheckedCreateWithoutRanksInputSchema) ]),
}).strict();

export const RankTagCreateWithoutRankInputSchema: z.ZodType<Prisma.RankTagCreateWithoutRankInput> = z.object({
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tag: z.lazy(() => TagCreateNestedOneWithoutRanksInputSchema)
}).strict();

export const RankTagUncheckedCreateWithoutRankInputSchema: z.ZodType<Prisma.RankTagUncheckedCreateWithoutRankInput> = z.object({
  tagId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const RankTagCreateOrConnectWithoutRankInputSchema: z.ZodType<Prisma.RankTagCreateOrConnectWithoutRankInput> = z.object({
  where: z.lazy(() => RankTagWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RankTagCreateWithoutRankInputSchema),z.lazy(() => RankTagUncheckedCreateWithoutRankInputSchema) ]),
}).strict();

export const RankTagCreateManyRankInputEnvelopeSchema: z.ZodType<Prisma.RankTagCreateManyRankInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RankTagCreateManyRankInputSchema),z.lazy(() => RankTagCreateManyRankInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const SoftwareOnRankCreateWithoutRankInputSchema: z.ZodType<Prisma.SoftwareOnRankCreateWithoutRankInput> = z.object({
  description: z.string(),
  rankIndex: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  software: z.lazy(() => SoftwareCreateNestedOneWithoutRanksInputSchema)
}).strict();

export const SoftwareOnRankUncheckedCreateWithoutRankInputSchema: z.ZodType<Prisma.SoftwareOnRankUncheckedCreateWithoutRankInput> = z.object({
  softwareId: z.string(),
  description: z.string(),
  rankIndex: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SoftwareOnRankCreateOrConnectWithoutRankInputSchema: z.ZodType<Prisma.SoftwareOnRankCreateOrConnectWithoutRankInput> = z.object({
  where: z.lazy(() => SoftwareOnRankWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SoftwareOnRankCreateWithoutRankInputSchema),z.lazy(() => SoftwareOnRankUncheckedCreateWithoutRankInputSchema) ]),
}).strict();

export const SoftwareOnRankCreateManyRankInputEnvelopeSchema: z.ZodType<Prisma.SoftwareOnRankCreateManyRankInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SoftwareOnRankCreateManyRankInputSchema),z.lazy(() => SoftwareOnRankCreateManyRankInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ArticleCreateWithoutRankInputSchema: z.ZodType<Prisma.ArticleCreateWithoutRankInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string(),
  image: z.string(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  author: z.lazy(() => UserCreateNestedOneWithoutArticlesInputSchema),
  softwares: z.lazy(() => SoftwareOnArticleCreateNestedManyWithoutArticleInputSchema).optional()
}).strict();

export const ArticleUncheckedCreateWithoutRankInputSchema: z.ZodType<Prisma.ArticleUncheckedCreateWithoutRankInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string(),
  image: z.string(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userAddress: z.string(),
  softwares: z.lazy(() => SoftwareOnArticleUncheckedCreateNestedManyWithoutArticleInputSchema).optional()
}).strict();

export const ArticleCreateOrConnectWithoutRankInputSchema: z.ZodType<Prisma.ArticleCreateOrConnectWithoutRankInput> = z.object({
  where: z.lazy(() => ArticleWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ArticleCreateWithoutRankInputSchema),z.lazy(() => ArticleUncheckedCreateWithoutRankInputSchema) ]),
}).strict();

export const ArticleCreateManyRankInputEnvelopeSchema: z.ZodType<Prisma.ArticleCreateManyRankInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ArticleCreateManyRankInputSchema),z.lazy(() => ArticleCreateManyRankInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const RankLikeCreateWithoutRankInputSchema: z.ZodType<Prisma.RankLikeCreateWithoutRankInput> = z.object({
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutRankLikesInputSchema)
}).strict();

export const RankLikeUncheckedCreateWithoutRankInputSchema: z.ZodType<Prisma.RankLikeUncheckedCreateWithoutRankInput> = z.object({
  userAddress: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const RankLikeCreateOrConnectWithoutRankInputSchema: z.ZodType<Prisma.RankLikeCreateOrConnectWithoutRankInput> = z.object({
  where: z.lazy(() => RankLikeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RankLikeCreateWithoutRankInputSchema),z.lazy(() => RankLikeUncheckedCreateWithoutRankInputSchema) ]),
}).strict();

export const RankLikeCreateManyRankInputEnvelopeSchema: z.ZodType<Prisma.RankLikeCreateManyRankInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RankLikeCreateManyRankInputSchema),z.lazy(() => RankLikeCreateManyRankInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const RankFavoriteCreateWithoutRankInputSchema: z.ZodType<Prisma.RankFavoriteCreateWithoutRankInput> = z.object({
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutRankFavoritesInputSchema)
}).strict();

export const RankFavoriteUncheckedCreateWithoutRankInputSchema: z.ZodType<Prisma.RankFavoriteUncheckedCreateWithoutRankInput> = z.object({
  userAddress: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const RankFavoriteCreateOrConnectWithoutRankInputSchema: z.ZodType<Prisma.RankFavoriteCreateOrConnectWithoutRankInput> = z.object({
  where: z.lazy(() => RankFavoriteWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RankFavoriteCreateWithoutRankInputSchema),z.lazy(() => RankFavoriteUncheckedCreateWithoutRankInputSchema) ]),
}).strict();

export const RankFavoriteCreateManyRankInputEnvelopeSchema: z.ZodType<Prisma.RankFavoriteCreateManyRankInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RankFavoriteCreateManyRankInputSchema),z.lazy(() => RankFavoriteCreateManyRankInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const RankCommentCreateWithoutRankInputSchema: z.ZodType<Prisma.RankCommentCreateWithoutRankInput> = z.object({
  id: z.string().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  replyToComment: z.string().optional().nullable(),
  replyToUser: z.string().optional().nullable(),
  rootCommentId: z.string().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutRankCommentsInputSchema)
}).strict();

export const RankCommentUncheckedCreateWithoutRankInputSchema: z.ZodType<Prisma.RankCommentUncheckedCreateWithoutRankInput> = z.object({
  id: z.string().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  userAddress: z.string(),
  deletedAt: z.coerce.date().optional().nullable(),
  replyToComment: z.string().optional().nullable(),
  replyToUser: z.string().optional().nullable(),
  rootCommentId: z.string().optional().nullable()
}).strict();

export const RankCommentCreateOrConnectWithoutRankInputSchema: z.ZodType<Prisma.RankCommentCreateOrConnectWithoutRankInput> = z.object({
  where: z.lazy(() => RankCommentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RankCommentCreateWithoutRankInputSchema),z.lazy(() => RankCommentUncheckedCreateWithoutRankInputSchema) ]),
}).strict();

export const RankCommentCreateManyRankInputEnvelopeSchema: z.ZodType<Prisma.RankCommentCreateManyRankInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RankCommentCreateManyRankInputSchema),z.lazy(() => RankCommentCreateManyRankInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserUpsertWithoutRanksInputSchema: z.ZodType<Prisma.UserUpsertWithoutRanksInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutRanksInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRanksInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutRanksInputSchema),z.lazy(() => UserUncheckedCreateWithoutRanksInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutRanksInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutRanksInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutRanksInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRanksInputSchema) ]),
}).strict();

export const UserUpdateWithoutRanksInputSchema: z.ZodType<Prisma.UserUpdateWithoutRanksInput> = z.object({
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  referralCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  invitedBy: z.union([ z.lazy(() => UserUpdateinvitedByInputSchema),z.string().array() ]).optional(),
  platforms: z.lazy(() => UserPlatformUpdateManyWithoutUserNestedInputSchema).optional(),
  articles: z.lazy(() => ArticleUpdateManyWithoutAuthorNestedInputSchema).optional(),
  rankLikes: z.lazy(() => RankLikeUpdateManyWithoutUserNestedInputSchema).optional(),
  rankFavorites: z.lazy(() => RankFavoriteUpdateManyWithoutUserNestedInputSchema).optional(),
  softwareLikes: z.lazy(() => SoftwareLikeUpdateManyWithoutUserNestedInputSchema).optional(),
  softwareFavorites: z.lazy(() => SoftwareFavoriteUpdateManyWithoutUserNestedInputSchema).optional(),
  rankComments: z.lazy(() => RankCommentUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutRanksInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutRanksInput> = z.object({
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  referralCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  invitedBy: z.union([ z.lazy(() => UserUpdateinvitedByInputSchema),z.string().array() ]).optional(),
  platforms: z.lazy(() => UserPlatformUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  articles: z.lazy(() => ArticleUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  rankLikes: z.lazy(() => RankLikeUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  rankFavorites: z.lazy(() => RankFavoriteUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  softwareLikes: z.lazy(() => SoftwareLikeUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  softwareFavorites: z.lazy(() => SoftwareFavoriteUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  rankComments: z.lazy(() => RankCommentUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const RankTagUpsertWithWhereUniqueWithoutRankInputSchema: z.ZodType<Prisma.RankTagUpsertWithWhereUniqueWithoutRankInput> = z.object({
  where: z.lazy(() => RankTagWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RankTagUpdateWithoutRankInputSchema),z.lazy(() => RankTagUncheckedUpdateWithoutRankInputSchema) ]),
  create: z.union([ z.lazy(() => RankTagCreateWithoutRankInputSchema),z.lazy(() => RankTagUncheckedCreateWithoutRankInputSchema) ]),
}).strict();

export const RankTagUpdateWithWhereUniqueWithoutRankInputSchema: z.ZodType<Prisma.RankTagUpdateWithWhereUniqueWithoutRankInput> = z.object({
  where: z.lazy(() => RankTagWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RankTagUpdateWithoutRankInputSchema),z.lazy(() => RankTagUncheckedUpdateWithoutRankInputSchema) ]),
}).strict();

export const RankTagUpdateManyWithWhereWithoutRankInputSchema: z.ZodType<Prisma.RankTagUpdateManyWithWhereWithoutRankInput> = z.object({
  where: z.lazy(() => RankTagScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RankTagUpdateManyMutationInputSchema),z.lazy(() => RankTagUncheckedUpdateManyWithoutRankInputSchema) ]),
}).strict();

export const SoftwareOnRankUpsertWithWhereUniqueWithoutRankInputSchema: z.ZodType<Prisma.SoftwareOnRankUpsertWithWhereUniqueWithoutRankInput> = z.object({
  where: z.lazy(() => SoftwareOnRankWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SoftwareOnRankUpdateWithoutRankInputSchema),z.lazy(() => SoftwareOnRankUncheckedUpdateWithoutRankInputSchema) ]),
  create: z.union([ z.lazy(() => SoftwareOnRankCreateWithoutRankInputSchema),z.lazy(() => SoftwareOnRankUncheckedCreateWithoutRankInputSchema) ]),
}).strict();

export const SoftwareOnRankUpdateWithWhereUniqueWithoutRankInputSchema: z.ZodType<Prisma.SoftwareOnRankUpdateWithWhereUniqueWithoutRankInput> = z.object({
  where: z.lazy(() => SoftwareOnRankWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SoftwareOnRankUpdateWithoutRankInputSchema),z.lazy(() => SoftwareOnRankUncheckedUpdateWithoutRankInputSchema) ]),
}).strict();

export const SoftwareOnRankUpdateManyWithWhereWithoutRankInputSchema: z.ZodType<Prisma.SoftwareOnRankUpdateManyWithWhereWithoutRankInput> = z.object({
  where: z.lazy(() => SoftwareOnRankScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SoftwareOnRankUpdateManyMutationInputSchema),z.lazy(() => SoftwareOnRankUncheckedUpdateManyWithoutRankInputSchema) ]),
}).strict();

export const SoftwareOnRankScalarWhereInputSchema: z.ZodType<Prisma.SoftwareOnRankScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SoftwareOnRankScalarWhereInputSchema),z.lazy(() => SoftwareOnRankScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SoftwareOnRankScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SoftwareOnRankScalarWhereInputSchema),z.lazy(() => SoftwareOnRankScalarWhereInputSchema).array() ]).optional(),
  softwareId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  rankId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  rankIndex: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ArticleUpsertWithWhereUniqueWithoutRankInputSchema: z.ZodType<Prisma.ArticleUpsertWithWhereUniqueWithoutRankInput> = z.object({
  where: z.lazy(() => ArticleWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ArticleUpdateWithoutRankInputSchema),z.lazy(() => ArticleUncheckedUpdateWithoutRankInputSchema) ]),
  create: z.union([ z.lazy(() => ArticleCreateWithoutRankInputSchema),z.lazy(() => ArticleUncheckedCreateWithoutRankInputSchema) ]),
}).strict();

export const ArticleUpdateWithWhereUniqueWithoutRankInputSchema: z.ZodType<Prisma.ArticleUpdateWithWhereUniqueWithoutRankInput> = z.object({
  where: z.lazy(() => ArticleWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ArticleUpdateWithoutRankInputSchema),z.lazy(() => ArticleUncheckedUpdateWithoutRankInputSchema) ]),
}).strict();

export const ArticleUpdateManyWithWhereWithoutRankInputSchema: z.ZodType<Prisma.ArticleUpdateManyWithWhereWithoutRankInput> = z.object({
  where: z.lazy(() => ArticleScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ArticleUpdateManyMutationInputSchema),z.lazy(() => ArticleUncheckedUpdateManyWithoutRankInputSchema) ]),
}).strict();

export const RankLikeUpsertWithWhereUniqueWithoutRankInputSchema: z.ZodType<Prisma.RankLikeUpsertWithWhereUniqueWithoutRankInput> = z.object({
  where: z.lazy(() => RankLikeWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RankLikeUpdateWithoutRankInputSchema),z.lazy(() => RankLikeUncheckedUpdateWithoutRankInputSchema) ]),
  create: z.union([ z.lazy(() => RankLikeCreateWithoutRankInputSchema),z.lazy(() => RankLikeUncheckedCreateWithoutRankInputSchema) ]),
}).strict();

export const RankLikeUpdateWithWhereUniqueWithoutRankInputSchema: z.ZodType<Prisma.RankLikeUpdateWithWhereUniqueWithoutRankInput> = z.object({
  where: z.lazy(() => RankLikeWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RankLikeUpdateWithoutRankInputSchema),z.lazy(() => RankLikeUncheckedUpdateWithoutRankInputSchema) ]),
}).strict();

export const RankLikeUpdateManyWithWhereWithoutRankInputSchema: z.ZodType<Prisma.RankLikeUpdateManyWithWhereWithoutRankInput> = z.object({
  where: z.lazy(() => RankLikeScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RankLikeUpdateManyMutationInputSchema),z.lazy(() => RankLikeUncheckedUpdateManyWithoutRankInputSchema) ]),
}).strict();

export const RankFavoriteUpsertWithWhereUniqueWithoutRankInputSchema: z.ZodType<Prisma.RankFavoriteUpsertWithWhereUniqueWithoutRankInput> = z.object({
  where: z.lazy(() => RankFavoriteWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RankFavoriteUpdateWithoutRankInputSchema),z.lazy(() => RankFavoriteUncheckedUpdateWithoutRankInputSchema) ]),
  create: z.union([ z.lazy(() => RankFavoriteCreateWithoutRankInputSchema),z.lazy(() => RankFavoriteUncheckedCreateWithoutRankInputSchema) ]),
}).strict();

export const RankFavoriteUpdateWithWhereUniqueWithoutRankInputSchema: z.ZodType<Prisma.RankFavoriteUpdateWithWhereUniqueWithoutRankInput> = z.object({
  where: z.lazy(() => RankFavoriteWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RankFavoriteUpdateWithoutRankInputSchema),z.lazy(() => RankFavoriteUncheckedUpdateWithoutRankInputSchema) ]),
}).strict();

export const RankFavoriteUpdateManyWithWhereWithoutRankInputSchema: z.ZodType<Prisma.RankFavoriteUpdateManyWithWhereWithoutRankInput> = z.object({
  where: z.lazy(() => RankFavoriteScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RankFavoriteUpdateManyMutationInputSchema),z.lazy(() => RankFavoriteUncheckedUpdateManyWithoutRankInputSchema) ]),
}).strict();

export const RankCommentUpsertWithWhereUniqueWithoutRankInputSchema: z.ZodType<Prisma.RankCommentUpsertWithWhereUniqueWithoutRankInput> = z.object({
  where: z.lazy(() => RankCommentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RankCommentUpdateWithoutRankInputSchema),z.lazy(() => RankCommentUncheckedUpdateWithoutRankInputSchema) ]),
  create: z.union([ z.lazy(() => RankCommentCreateWithoutRankInputSchema),z.lazy(() => RankCommentUncheckedCreateWithoutRankInputSchema) ]),
}).strict();

export const RankCommentUpdateWithWhereUniqueWithoutRankInputSchema: z.ZodType<Prisma.RankCommentUpdateWithWhereUniqueWithoutRankInput> = z.object({
  where: z.lazy(() => RankCommentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RankCommentUpdateWithoutRankInputSchema),z.lazy(() => RankCommentUncheckedUpdateWithoutRankInputSchema) ]),
}).strict();

export const RankCommentUpdateManyWithWhereWithoutRankInputSchema: z.ZodType<Prisma.RankCommentUpdateManyWithWhereWithoutRankInput> = z.object({
  where: z.lazy(() => RankCommentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RankCommentUpdateManyMutationInputSchema),z.lazy(() => RankCommentUncheckedUpdateManyWithoutRankInputSchema) ]),
}).strict();

export const TagCreateWithoutRanksInputSchema: z.ZodType<Prisma.TagCreateWithoutRanksInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  softwares: z.lazy(() => SoftwareTagCreateNestedManyWithoutTagInputSchema).optional()
}).strict();

export const TagUncheckedCreateWithoutRanksInputSchema: z.ZodType<Prisma.TagUncheckedCreateWithoutRanksInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  softwares: z.lazy(() => SoftwareTagUncheckedCreateNestedManyWithoutTagInputSchema).optional()
}).strict();

export const TagCreateOrConnectWithoutRanksInputSchema: z.ZodType<Prisma.TagCreateOrConnectWithoutRanksInput> = z.object({
  where: z.lazy(() => TagWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TagCreateWithoutRanksInputSchema),z.lazy(() => TagUncheckedCreateWithoutRanksInputSchema) ]),
}).strict();

export const RankCreateWithoutTagsInputSchema: z.ZodType<Prisma.RankCreateWithoutTagsInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutRanksInputSchema),
  softwares: z.lazy(() => SoftwareOnRankCreateNestedManyWithoutRankInputSchema).optional(),
  articles: z.lazy(() => ArticleCreateNestedManyWithoutRankInputSchema).optional(),
  likes: z.lazy(() => RankLikeCreateNestedManyWithoutRankInputSchema).optional(),
  favorites: z.lazy(() => RankFavoriteCreateNestedManyWithoutRankInputSchema).optional(),
  comments: z.lazy(() => RankCommentCreateNestedManyWithoutRankInputSchema).optional()
}).strict();

export const RankUncheckedCreateWithoutTagsInputSchema: z.ZodType<Prisma.RankUncheckedCreateWithoutTagsInput> = z.object({
  id: z.string().optional(),
  userAddress: z.string(),
  name: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  softwares: z.lazy(() => SoftwareOnRankUncheckedCreateNestedManyWithoutRankInputSchema).optional(),
  articles: z.lazy(() => ArticleUncheckedCreateNestedManyWithoutRankInputSchema).optional(),
  likes: z.lazy(() => RankLikeUncheckedCreateNestedManyWithoutRankInputSchema).optional(),
  favorites: z.lazy(() => RankFavoriteUncheckedCreateNestedManyWithoutRankInputSchema).optional(),
  comments: z.lazy(() => RankCommentUncheckedCreateNestedManyWithoutRankInputSchema).optional()
}).strict();

export const RankCreateOrConnectWithoutTagsInputSchema: z.ZodType<Prisma.RankCreateOrConnectWithoutTagsInput> = z.object({
  where: z.lazy(() => RankWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RankCreateWithoutTagsInputSchema),z.lazy(() => RankUncheckedCreateWithoutTagsInputSchema) ]),
}).strict();

export const TagUpsertWithoutRanksInputSchema: z.ZodType<Prisma.TagUpsertWithoutRanksInput> = z.object({
  update: z.union([ z.lazy(() => TagUpdateWithoutRanksInputSchema),z.lazy(() => TagUncheckedUpdateWithoutRanksInputSchema) ]),
  create: z.union([ z.lazy(() => TagCreateWithoutRanksInputSchema),z.lazy(() => TagUncheckedCreateWithoutRanksInputSchema) ]),
  where: z.lazy(() => TagWhereInputSchema).optional()
}).strict();

export const TagUpdateToOneWithWhereWithoutRanksInputSchema: z.ZodType<Prisma.TagUpdateToOneWithWhereWithoutRanksInput> = z.object({
  where: z.lazy(() => TagWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => TagUpdateWithoutRanksInputSchema),z.lazy(() => TagUncheckedUpdateWithoutRanksInputSchema) ]),
}).strict();

export const TagUpdateWithoutRanksInputSchema: z.ZodType<Prisma.TagUpdateWithoutRanksInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  softwares: z.lazy(() => SoftwareTagUpdateManyWithoutTagNestedInputSchema).optional()
}).strict();

export const TagUncheckedUpdateWithoutRanksInputSchema: z.ZodType<Prisma.TagUncheckedUpdateWithoutRanksInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  softwares: z.lazy(() => SoftwareTagUncheckedUpdateManyWithoutTagNestedInputSchema).optional()
}).strict();

export const RankUpsertWithoutTagsInputSchema: z.ZodType<Prisma.RankUpsertWithoutTagsInput> = z.object({
  update: z.union([ z.lazy(() => RankUpdateWithoutTagsInputSchema),z.lazy(() => RankUncheckedUpdateWithoutTagsInputSchema) ]),
  create: z.union([ z.lazy(() => RankCreateWithoutTagsInputSchema),z.lazy(() => RankUncheckedCreateWithoutTagsInputSchema) ]),
  where: z.lazy(() => RankWhereInputSchema).optional()
}).strict();

export const RankUpdateToOneWithWhereWithoutTagsInputSchema: z.ZodType<Prisma.RankUpdateToOneWithWhereWithoutTagsInput> = z.object({
  where: z.lazy(() => RankWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => RankUpdateWithoutTagsInputSchema),z.lazy(() => RankUncheckedUpdateWithoutTagsInputSchema) ]),
}).strict();

export const RankUpdateWithoutTagsInputSchema: z.ZodType<Prisma.RankUpdateWithoutTagsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutRanksNestedInputSchema).optional(),
  softwares: z.lazy(() => SoftwareOnRankUpdateManyWithoutRankNestedInputSchema).optional(),
  articles: z.lazy(() => ArticleUpdateManyWithoutRankNestedInputSchema).optional(),
  likes: z.lazy(() => RankLikeUpdateManyWithoutRankNestedInputSchema).optional(),
  favorites: z.lazy(() => RankFavoriteUpdateManyWithoutRankNestedInputSchema).optional(),
  comments: z.lazy(() => RankCommentUpdateManyWithoutRankNestedInputSchema).optional()
}).strict();

export const RankUncheckedUpdateWithoutTagsInputSchema: z.ZodType<Prisma.RankUncheckedUpdateWithoutTagsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userAddress: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  softwares: z.lazy(() => SoftwareOnRankUncheckedUpdateManyWithoutRankNestedInputSchema).optional(),
  articles: z.lazy(() => ArticleUncheckedUpdateManyWithoutRankNestedInputSchema).optional(),
  likes: z.lazy(() => RankLikeUncheckedUpdateManyWithoutRankNestedInputSchema).optional(),
  favorites: z.lazy(() => RankFavoriteUncheckedUpdateManyWithoutRankNestedInputSchema).optional(),
  comments: z.lazy(() => RankCommentUncheckedUpdateManyWithoutRankNestedInputSchema).optional()
}).strict();

export const SoftwareTagCreateWithoutSoftwareInputSchema: z.ZodType<Prisma.SoftwareTagCreateWithoutSoftwareInput> = z.object({
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tag: z.lazy(() => TagCreateNestedOneWithoutSoftwaresInputSchema)
}).strict();

export const SoftwareTagUncheckedCreateWithoutSoftwareInputSchema: z.ZodType<Prisma.SoftwareTagUncheckedCreateWithoutSoftwareInput> = z.object({
  tagId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SoftwareTagCreateOrConnectWithoutSoftwareInputSchema: z.ZodType<Prisma.SoftwareTagCreateOrConnectWithoutSoftwareInput> = z.object({
  where: z.lazy(() => SoftwareTagWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SoftwareTagCreateWithoutSoftwareInputSchema),z.lazy(() => SoftwareTagUncheckedCreateWithoutSoftwareInputSchema) ]),
}).strict();

export const SoftwareTagCreateManySoftwareInputEnvelopeSchema: z.ZodType<Prisma.SoftwareTagCreateManySoftwareInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SoftwareTagCreateManySoftwareInputSchema),z.lazy(() => SoftwareTagCreateManySoftwareInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const SoftwareOnRankCreateWithoutSoftwareInputSchema: z.ZodType<Prisma.SoftwareOnRankCreateWithoutSoftwareInput> = z.object({
  description: z.string(),
  rankIndex: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  rank: z.lazy(() => RankCreateNestedOneWithoutSoftwaresInputSchema)
}).strict();

export const SoftwareOnRankUncheckedCreateWithoutSoftwareInputSchema: z.ZodType<Prisma.SoftwareOnRankUncheckedCreateWithoutSoftwareInput> = z.object({
  description: z.string(),
  rankId: z.string(),
  rankIndex: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SoftwareOnRankCreateOrConnectWithoutSoftwareInputSchema: z.ZodType<Prisma.SoftwareOnRankCreateOrConnectWithoutSoftwareInput> = z.object({
  where: z.lazy(() => SoftwareOnRankWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SoftwareOnRankCreateWithoutSoftwareInputSchema),z.lazy(() => SoftwareOnRankUncheckedCreateWithoutSoftwareInputSchema) ]),
}).strict();

export const SoftwareOnRankCreateManySoftwareInputEnvelopeSchema: z.ZodType<Prisma.SoftwareOnRankCreateManySoftwareInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SoftwareOnRankCreateManySoftwareInputSchema),z.lazy(() => SoftwareOnRankCreateManySoftwareInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const SoftwareLikeCreateWithoutSoftwareInputSchema: z.ZodType<Prisma.SoftwareLikeCreateWithoutSoftwareInput> = z.object({
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutSoftwareLikesInputSchema)
}).strict();

export const SoftwareLikeUncheckedCreateWithoutSoftwareInputSchema: z.ZodType<Prisma.SoftwareLikeUncheckedCreateWithoutSoftwareInput> = z.object({
  userAddress: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const SoftwareLikeCreateOrConnectWithoutSoftwareInputSchema: z.ZodType<Prisma.SoftwareLikeCreateOrConnectWithoutSoftwareInput> = z.object({
  where: z.lazy(() => SoftwareLikeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SoftwareLikeCreateWithoutSoftwareInputSchema),z.lazy(() => SoftwareLikeUncheckedCreateWithoutSoftwareInputSchema) ]),
}).strict();

export const SoftwareLikeCreateManySoftwareInputEnvelopeSchema: z.ZodType<Prisma.SoftwareLikeCreateManySoftwareInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SoftwareLikeCreateManySoftwareInputSchema),z.lazy(() => SoftwareLikeCreateManySoftwareInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const SoftwareFavoriteCreateWithoutSoftwareInputSchema: z.ZodType<Prisma.SoftwareFavoriteCreateWithoutSoftwareInput> = z.object({
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutSoftwareFavoritesInputSchema)
}).strict();

export const SoftwareFavoriteUncheckedCreateWithoutSoftwareInputSchema: z.ZodType<Prisma.SoftwareFavoriteUncheckedCreateWithoutSoftwareInput> = z.object({
  userAddress: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const SoftwareFavoriteCreateOrConnectWithoutSoftwareInputSchema: z.ZodType<Prisma.SoftwareFavoriteCreateOrConnectWithoutSoftwareInput> = z.object({
  where: z.lazy(() => SoftwareFavoriteWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SoftwareFavoriteCreateWithoutSoftwareInputSchema),z.lazy(() => SoftwareFavoriteUncheckedCreateWithoutSoftwareInputSchema) ]),
}).strict();

export const SoftwareFavoriteCreateManySoftwareInputEnvelopeSchema: z.ZodType<Prisma.SoftwareFavoriteCreateManySoftwareInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SoftwareFavoriteCreateManySoftwareInputSchema),z.lazy(() => SoftwareFavoriteCreateManySoftwareInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const SoftwareOnArticleCreateWithoutSoftwareInputSchema: z.ZodType<Prisma.SoftwareOnArticleCreateWithoutSoftwareInput> = z.object({
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  article: z.lazy(() => ArticleCreateNestedOneWithoutSoftwaresInputSchema)
}).strict();

export const SoftwareOnArticleUncheckedCreateWithoutSoftwareInputSchema: z.ZodType<Prisma.SoftwareOnArticleUncheckedCreateWithoutSoftwareInput> = z.object({
  articleId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SoftwareOnArticleCreateOrConnectWithoutSoftwareInputSchema: z.ZodType<Prisma.SoftwareOnArticleCreateOrConnectWithoutSoftwareInput> = z.object({
  where: z.lazy(() => SoftwareOnArticleWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SoftwareOnArticleCreateWithoutSoftwareInputSchema),z.lazy(() => SoftwareOnArticleUncheckedCreateWithoutSoftwareInputSchema) ]),
}).strict();

export const SoftwareOnArticleCreateManySoftwareInputEnvelopeSchema: z.ZodType<Prisma.SoftwareOnArticleCreateManySoftwareInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SoftwareOnArticleCreateManySoftwareInputSchema),z.lazy(() => SoftwareOnArticleCreateManySoftwareInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const SoftwareTagUpsertWithWhereUniqueWithoutSoftwareInputSchema: z.ZodType<Prisma.SoftwareTagUpsertWithWhereUniqueWithoutSoftwareInput> = z.object({
  where: z.lazy(() => SoftwareTagWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SoftwareTagUpdateWithoutSoftwareInputSchema),z.lazy(() => SoftwareTagUncheckedUpdateWithoutSoftwareInputSchema) ]),
  create: z.union([ z.lazy(() => SoftwareTagCreateWithoutSoftwareInputSchema),z.lazy(() => SoftwareTagUncheckedCreateWithoutSoftwareInputSchema) ]),
}).strict();

export const SoftwareTagUpdateWithWhereUniqueWithoutSoftwareInputSchema: z.ZodType<Prisma.SoftwareTagUpdateWithWhereUniqueWithoutSoftwareInput> = z.object({
  where: z.lazy(() => SoftwareTagWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SoftwareTagUpdateWithoutSoftwareInputSchema),z.lazy(() => SoftwareTagUncheckedUpdateWithoutSoftwareInputSchema) ]),
}).strict();

export const SoftwareTagUpdateManyWithWhereWithoutSoftwareInputSchema: z.ZodType<Prisma.SoftwareTagUpdateManyWithWhereWithoutSoftwareInput> = z.object({
  where: z.lazy(() => SoftwareTagScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SoftwareTagUpdateManyMutationInputSchema),z.lazy(() => SoftwareTagUncheckedUpdateManyWithoutSoftwareInputSchema) ]),
}).strict();

export const SoftwareOnRankUpsertWithWhereUniqueWithoutSoftwareInputSchema: z.ZodType<Prisma.SoftwareOnRankUpsertWithWhereUniqueWithoutSoftwareInput> = z.object({
  where: z.lazy(() => SoftwareOnRankWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SoftwareOnRankUpdateWithoutSoftwareInputSchema),z.lazy(() => SoftwareOnRankUncheckedUpdateWithoutSoftwareInputSchema) ]),
  create: z.union([ z.lazy(() => SoftwareOnRankCreateWithoutSoftwareInputSchema),z.lazy(() => SoftwareOnRankUncheckedCreateWithoutSoftwareInputSchema) ]),
}).strict();

export const SoftwareOnRankUpdateWithWhereUniqueWithoutSoftwareInputSchema: z.ZodType<Prisma.SoftwareOnRankUpdateWithWhereUniqueWithoutSoftwareInput> = z.object({
  where: z.lazy(() => SoftwareOnRankWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SoftwareOnRankUpdateWithoutSoftwareInputSchema),z.lazy(() => SoftwareOnRankUncheckedUpdateWithoutSoftwareInputSchema) ]),
}).strict();

export const SoftwareOnRankUpdateManyWithWhereWithoutSoftwareInputSchema: z.ZodType<Prisma.SoftwareOnRankUpdateManyWithWhereWithoutSoftwareInput> = z.object({
  where: z.lazy(() => SoftwareOnRankScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SoftwareOnRankUpdateManyMutationInputSchema),z.lazy(() => SoftwareOnRankUncheckedUpdateManyWithoutSoftwareInputSchema) ]),
}).strict();

export const SoftwareLikeUpsertWithWhereUniqueWithoutSoftwareInputSchema: z.ZodType<Prisma.SoftwareLikeUpsertWithWhereUniqueWithoutSoftwareInput> = z.object({
  where: z.lazy(() => SoftwareLikeWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SoftwareLikeUpdateWithoutSoftwareInputSchema),z.lazy(() => SoftwareLikeUncheckedUpdateWithoutSoftwareInputSchema) ]),
  create: z.union([ z.lazy(() => SoftwareLikeCreateWithoutSoftwareInputSchema),z.lazy(() => SoftwareLikeUncheckedCreateWithoutSoftwareInputSchema) ]),
}).strict();

export const SoftwareLikeUpdateWithWhereUniqueWithoutSoftwareInputSchema: z.ZodType<Prisma.SoftwareLikeUpdateWithWhereUniqueWithoutSoftwareInput> = z.object({
  where: z.lazy(() => SoftwareLikeWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SoftwareLikeUpdateWithoutSoftwareInputSchema),z.lazy(() => SoftwareLikeUncheckedUpdateWithoutSoftwareInputSchema) ]),
}).strict();

export const SoftwareLikeUpdateManyWithWhereWithoutSoftwareInputSchema: z.ZodType<Prisma.SoftwareLikeUpdateManyWithWhereWithoutSoftwareInput> = z.object({
  where: z.lazy(() => SoftwareLikeScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SoftwareLikeUpdateManyMutationInputSchema),z.lazy(() => SoftwareLikeUncheckedUpdateManyWithoutSoftwareInputSchema) ]),
}).strict();

export const SoftwareFavoriteUpsertWithWhereUniqueWithoutSoftwareInputSchema: z.ZodType<Prisma.SoftwareFavoriteUpsertWithWhereUniqueWithoutSoftwareInput> = z.object({
  where: z.lazy(() => SoftwareFavoriteWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SoftwareFavoriteUpdateWithoutSoftwareInputSchema),z.lazy(() => SoftwareFavoriteUncheckedUpdateWithoutSoftwareInputSchema) ]),
  create: z.union([ z.lazy(() => SoftwareFavoriteCreateWithoutSoftwareInputSchema),z.lazy(() => SoftwareFavoriteUncheckedCreateWithoutSoftwareInputSchema) ]),
}).strict();

export const SoftwareFavoriteUpdateWithWhereUniqueWithoutSoftwareInputSchema: z.ZodType<Prisma.SoftwareFavoriteUpdateWithWhereUniqueWithoutSoftwareInput> = z.object({
  where: z.lazy(() => SoftwareFavoriteWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SoftwareFavoriteUpdateWithoutSoftwareInputSchema),z.lazy(() => SoftwareFavoriteUncheckedUpdateWithoutSoftwareInputSchema) ]),
}).strict();

export const SoftwareFavoriteUpdateManyWithWhereWithoutSoftwareInputSchema: z.ZodType<Prisma.SoftwareFavoriteUpdateManyWithWhereWithoutSoftwareInput> = z.object({
  where: z.lazy(() => SoftwareFavoriteScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SoftwareFavoriteUpdateManyMutationInputSchema),z.lazy(() => SoftwareFavoriteUncheckedUpdateManyWithoutSoftwareInputSchema) ]),
}).strict();

export const SoftwareOnArticleUpsertWithWhereUniqueWithoutSoftwareInputSchema: z.ZodType<Prisma.SoftwareOnArticleUpsertWithWhereUniqueWithoutSoftwareInput> = z.object({
  where: z.lazy(() => SoftwareOnArticleWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SoftwareOnArticleUpdateWithoutSoftwareInputSchema),z.lazy(() => SoftwareOnArticleUncheckedUpdateWithoutSoftwareInputSchema) ]),
  create: z.union([ z.lazy(() => SoftwareOnArticleCreateWithoutSoftwareInputSchema),z.lazy(() => SoftwareOnArticleUncheckedCreateWithoutSoftwareInputSchema) ]),
}).strict();

export const SoftwareOnArticleUpdateWithWhereUniqueWithoutSoftwareInputSchema: z.ZodType<Prisma.SoftwareOnArticleUpdateWithWhereUniqueWithoutSoftwareInput> = z.object({
  where: z.lazy(() => SoftwareOnArticleWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SoftwareOnArticleUpdateWithoutSoftwareInputSchema),z.lazy(() => SoftwareOnArticleUncheckedUpdateWithoutSoftwareInputSchema) ]),
}).strict();

export const SoftwareOnArticleUpdateManyWithWhereWithoutSoftwareInputSchema: z.ZodType<Prisma.SoftwareOnArticleUpdateManyWithWhereWithoutSoftwareInput> = z.object({
  where: z.lazy(() => SoftwareOnArticleScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SoftwareOnArticleUpdateManyMutationInputSchema),z.lazy(() => SoftwareOnArticleUncheckedUpdateManyWithoutSoftwareInputSchema) ]),
}).strict();

export const SoftwareOnArticleScalarWhereInputSchema: z.ZodType<Prisma.SoftwareOnArticleScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SoftwareOnArticleScalarWhereInputSchema),z.lazy(() => SoftwareOnArticleScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SoftwareOnArticleScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SoftwareOnArticleScalarWhereInputSchema),z.lazy(() => SoftwareOnArticleScalarWhereInputSchema).array() ]).optional(),
  softwareId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  articleId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const TagCreateWithoutSoftwaresInputSchema: z.ZodType<Prisma.TagCreateWithoutSoftwaresInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  ranks: z.lazy(() => RankTagCreateNestedManyWithoutTagInputSchema).optional()
}).strict();

export const TagUncheckedCreateWithoutSoftwaresInputSchema: z.ZodType<Prisma.TagUncheckedCreateWithoutSoftwaresInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  ranks: z.lazy(() => RankTagUncheckedCreateNestedManyWithoutTagInputSchema).optional()
}).strict();

export const TagCreateOrConnectWithoutSoftwaresInputSchema: z.ZodType<Prisma.TagCreateOrConnectWithoutSoftwaresInput> = z.object({
  where: z.lazy(() => TagWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TagCreateWithoutSoftwaresInputSchema),z.lazy(() => TagUncheckedCreateWithoutSoftwaresInputSchema) ]),
}).strict();

export const SoftwareCreateWithoutTagsInputSchema: z.ZodType<Prisma.SoftwareCreateWithoutTagsInput> = z.object({
  id: z.string().optional(),
  image: z.string(),
  name: z.string(),
  description: z.string().optional().nullable(),
  url: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  ranks: z.lazy(() => SoftwareOnRankCreateNestedManyWithoutSoftwareInputSchema).optional(),
  likes: z.lazy(() => SoftwareLikeCreateNestedManyWithoutSoftwareInputSchema).optional(),
  favorites: z.lazy(() => SoftwareFavoriteCreateNestedManyWithoutSoftwareInputSchema).optional(),
  articles: z.lazy(() => SoftwareOnArticleCreateNestedManyWithoutSoftwareInputSchema).optional()
}).strict();

export const SoftwareUncheckedCreateWithoutTagsInputSchema: z.ZodType<Prisma.SoftwareUncheckedCreateWithoutTagsInput> = z.object({
  id: z.string().optional(),
  image: z.string(),
  name: z.string(),
  description: z.string().optional().nullable(),
  url: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  ranks: z.lazy(() => SoftwareOnRankUncheckedCreateNestedManyWithoutSoftwareInputSchema).optional(),
  likes: z.lazy(() => SoftwareLikeUncheckedCreateNestedManyWithoutSoftwareInputSchema).optional(),
  favorites: z.lazy(() => SoftwareFavoriteUncheckedCreateNestedManyWithoutSoftwareInputSchema).optional(),
  articles: z.lazy(() => SoftwareOnArticleUncheckedCreateNestedManyWithoutSoftwareInputSchema).optional()
}).strict();

export const SoftwareCreateOrConnectWithoutTagsInputSchema: z.ZodType<Prisma.SoftwareCreateOrConnectWithoutTagsInput> = z.object({
  where: z.lazy(() => SoftwareWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SoftwareCreateWithoutTagsInputSchema),z.lazy(() => SoftwareUncheckedCreateWithoutTagsInputSchema) ]),
}).strict();

export const TagUpsertWithoutSoftwaresInputSchema: z.ZodType<Prisma.TagUpsertWithoutSoftwaresInput> = z.object({
  update: z.union([ z.lazy(() => TagUpdateWithoutSoftwaresInputSchema),z.lazy(() => TagUncheckedUpdateWithoutSoftwaresInputSchema) ]),
  create: z.union([ z.lazy(() => TagCreateWithoutSoftwaresInputSchema),z.lazy(() => TagUncheckedCreateWithoutSoftwaresInputSchema) ]),
  where: z.lazy(() => TagWhereInputSchema).optional()
}).strict();

export const TagUpdateToOneWithWhereWithoutSoftwaresInputSchema: z.ZodType<Prisma.TagUpdateToOneWithWhereWithoutSoftwaresInput> = z.object({
  where: z.lazy(() => TagWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => TagUpdateWithoutSoftwaresInputSchema),z.lazy(() => TagUncheckedUpdateWithoutSoftwaresInputSchema) ]),
}).strict();

export const TagUpdateWithoutSoftwaresInputSchema: z.ZodType<Prisma.TagUpdateWithoutSoftwaresInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ranks: z.lazy(() => RankTagUpdateManyWithoutTagNestedInputSchema).optional()
}).strict();

export const TagUncheckedUpdateWithoutSoftwaresInputSchema: z.ZodType<Prisma.TagUncheckedUpdateWithoutSoftwaresInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ranks: z.lazy(() => RankTagUncheckedUpdateManyWithoutTagNestedInputSchema).optional()
}).strict();

export const SoftwareUpsertWithoutTagsInputSchema: z.ZodType<Prisma.SoftwareUpsertWithoutTagsInput> = z.object({
  update: z.union([ z.lazy(() => SoftwareUpdateWithoutTagsInputSchema),z.lazy(() => SoftwareUncheckedUpdateWithoutTagsInputSchema) ]),
  create: z.union([ z.lazy(() => SoftwareCreateWithoutTagsInputSchema),z.lazy(() => SoftwareUncheckedCreateWithoutTagsInputSchema) ]),
  where: z.lazy(() => SoftwareWhereInputSchema).optional()
}).strict();

export const SoftwareUpdateToOneWithWhereWithoutTagsInputSchema: z.ZodType<Prisma.SoftwareUpdateToOneWithWhereWithoutTagsInput> = z.object({
  where: z.lazy(() => SoftwareWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => SoftwareUpdateWithoutTagsInputSchema),z.lazy(() => SoftwareUncheckedUpdateWithoutTagsInputSchema) ]),
}).strict();

export const SoftwareUpdateWithoutTagsInputSchema: z.ZodType<Prisma.SoftwareUpdateWithoutTagsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ranks: z.lazy(() => SoftwareOnRankUpdateManyWithoutSoftwareNestedInputSchema).optional(),
  likes: z.lazy(() => SoftwareLikeUpdateManyWithoutSoftwareNestedInputSchema).optional(),
  favorites: z.lazy(() => SoftwareFavoriteUpdateManyWithoutSoftwareNestedInputSchema).optional(),
  articles: z.lazy(() => SoftwareOnArticleUpdateManyWithoutSoftwareNestedInputSchema).optional()
}).strict();

export const SoftwareUncheckedUpdateWithoutTagsInputSchema: z.ZodType<Prisma.SoftwareUncheckedUpdateWithoutTagsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ranks: z.lazy(() => SoftwareOnRankUncheckedUpdateManyWithoutSoftwareNestedInputSchema).optional(),
  likes: z.lazy(() => SoftwareLikeUncheckedUpdateManyWithoutSoftwareNestedInputSchema).optional(),
  favorites: z.lazy(() => SoftwareFavoriteUncheckedUpdateManyWithoutSoftwareNestedInputSchema).optional(),
  articles: z.lazy(() => SoftwareOnArticleUncheckedUpdateManyWithoutSoftwareNestedInputSchema).optional()
}).strict();

export const SoftwareCreateWithoutRanksInputSchema: z.ZodType<Prisma.SoftwareCreateWithoutRanksInput> = z.object({
  id: z.string().optional(),
  image: z.string(),
  name: z.string(),
  description: z.string().optional().nullable(),
  url: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tags: z.lazy(() => SoftwareTagCreateNestedManyWithoutSoftwareInputSchema).optional(),
  likes: z.lazy(() => SoftwareLikeCreateNestedManyWithoutSoftwareInputSchema).optional(),
  favorites: z.lazy(() => SoftwareFavoriteCreateNestedManyWithoutSoftwareInputSchema).optional(),
  articles: z.lazy(() => SoftwareOnArticleCreateNestedManyWithoutSoftwareInputSchema).optional()
}).strict();

export const SoftwareUncheckedCreateWithoutRanksInputSchema: z.ZodType<Prisma.SoftwareUncheckedCreateWithoutRanksInput> = z.object({
  id: z.string().optional(),
  image: z.string(),
  name: z.string(),
  description: z.string().optional().nullable(),
  url: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tags: z.lazy(() => SoftwareTagUncheckedCreateNestedManyWithoutSoftwareInputSchema).optional(),
  likes: z.lazy(() => SoftwareLikeUncheckedCreateNestedManyWithoutSoftwareInputSchema).optional(),
  favorites: z.lazy(() => SoftwareFavoriteUncheckedCreateNestedManyWithoutSoftwareInputSchema).optional(),
  articles: z.lazy(() => SoftwareOnArticleUncheckedCreateNestedManyWithoutSoftwareInputSchema).optional()
}).strict();

export const SoftwareCreateOrConnectWithoutRanksInputSchema: z.ZodType<Prisma.SoftwareCreateOrConnectWithoutRanksInput> = z.object({
  where: z.lazy(() => SoftwareWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SoftwareCreateWithoutRanksInputSchema),z.lazy(() => SoftwareUncheckedCreateWithoutRanksInputSchema) ]),
}).strict();

export const RankCreateWithoutSoftwaresInputSchema: z.ZodType<Prisma.RankCreateWithoutSoftwaresInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutRanksInputSchema),
  tags: z.lazy(() => RankTagCreateNestedManyWithoutRankInputSchema).optional(),
  articles: z.lazy(() => ArticleCreateNestedManyWithoutRankInputSchema).optional(),
  likes: z.lazy(() => RankLikeCreateNestedManyWithoutRankInputSchema).optional(),
  favorites: z.lazy(() => RankFavoriteCreateNestedManyWithoutRankInputSchema).optional(),
  comments: z.lazy(() => RankCommentCreateNestedManyWithoutRankInputSchema).optional()
}).strict();

export const RankUncheckedCreateWithoutSoftwaresInputSchema: z.ZodType<Prisma.RankUncheckedCreateWithoutSoftwaresInput> = z.object({
  id: z.string().optional(),
  userAddress: z.string(),
  name: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tags: z.lazy(() => RankTagUncheckedCreateNestedManyWithoutRankInputSchema).optional(),
  articles: z.lazy(() => ArticleUncheckedCreateNestedManyWithoutRankInputSchema).optional(),
  likes: z.lazy(() => RankLikeUncheckedCreateNestedManyWithoutRankInputSchema).optional(),
  favorites: z.lazy(() => RankFavoriteUncheckedCreateNestedManyWithoutRankInputSchema).optional(),
  comments: z.lazy(() => RankCommentUncheckedCreateNestedManyWithoutRankInputSchema).optional()
}).strict();

export const RankCreateOrConnectWithoutSoftwaresInputSchema: z.ZodType<Prisma.RankCreateOrConnectWithoutSoftwaresInput> = z.object({
  where: z.lazy(() => RankWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RankCreateWithoutSoftwaresInputSchema),z.lazy(() => RankUncheckedCreateWithoutSoftwaresInputSchema) ]),
}).strict();

export const SoftwareUpsertWithoutRanksInputSchema: z.ZodType<Prisma.SoftwareUpsertWithoutRanksInput> = z.object({
  update: z.union([ z.lazy(() => SoftwareUpdateWithoutRanksInputSchema),z.lazy(() => SoftwareUncheckedUpdateWithoutRanksInputSchema) ]),
  create: z.union([ z.lazy(() => SoftwareCreateWithoutRanksInputSchema),z.lazy(() => SoftwareUncheckedCreateWithoutRanksInputSchema) ]),
  where: z.lazy(() => SoftwareWhereInputSchema).optional()
}).strict();

export const SoftwareUpdateToOneWithWhereWithoutRanksInputSchema: z.ZodType<Prisma.SoftwareUpdateToOneWithWhereWithoutRanksInput> = z.object({
  where: z.lazy(() => SoftwareWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => SoftwareUpdateWithoutRanksInputSchema),z.lazy(() => SoftwareUncheckedUpdateWithoutRanksInputSchema) ]),
}).strict();

export const SoftwareUpdateWithoutRanksInputSchema: z.ZodType<Prisma.SoftwareUpdateWithoutRanksInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.lazy(() => SoftwareTagUpdateManyWithoutSoftwareNestedInputSchema).optional(),
  likes: z.lazy(() => SoftwareLikeUpdateManyWithoutSoftwareNestedInputSchema).optional(),
  favorites: z.lazy(() => SoftwareFavoriteUpdateManyWithoutSoftwareNestedInputSchema).optional(),
  articles: z.lazy(() => SoftwareOnArticleUpdateManyWithoutSoftwareNestedInputSchema).optional()
}).strict();

export const SoftwareUncheckedUpdateWithoutRanksInputSchema: z.ZodType<Prisma.SoftwareUncheckedUpdateWithoutRanksInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.lazy(() => SoftwareTagUncheckedUpdateManyWithoutSoftwareNestedInputSchema).optional(),
  likes: z.lazy(() => SoftwareLikeUncheckedUpdateManyWithoutSoftwareNestedInputSchema).optional(),
  favorites: z.lazy(() => SoftwareFavoriteUncheckedUpdateManyWithoutSoftwareNestedInputSchema).optional(),
  articles: z.lazy(() => SoftwareOnArticleUncheckedUpdateManyWithoutSoftwareNestedInputSchema).optional()
}).strict();

export const RankUpsertWithoutSoftwaresInputSchema: z.ZodType<Prisma.RankUpsertWithoutSoftwaresInput> = z.object({
  update: z.union([ z.lazy(() => RankUpdateWithoutSoftwaresInputSchema),z.lazy(() => RankUncheckedUpdateWithoutSoftwaresInputSchema) ]),
  create: z.union([ z.lazy(() => RankCreateWithoutSoftwaresInputSchema),z.lazy(() => RankUncheckedCreateWithoutSoftwaresInputSchema) ]),
  where: z.lazy(() => RankWhereInputSchema).optional()
}).strict();

export const RankUpdateToOneWithWhereWithoutSoftwaresInputSchema: z.ZodType<Prisma.RankUpdateToOneWithWhereWithoutSoftwaresInput> = z.object({
  where: z.lazy(() => RankWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => RankUpdateWithoutSoftwaresInputSchema),z.lazy(() => RankUncheckedUpdateWithoutSoftwaresInputSchema) ]),
}).strict();

export const RankUpdateWithoutSoftwaresInputSchema: z.ZodType<Prisma.RankUpdateWithoutSoftwaresInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutRanksNestedInputSchema).optional(),
  tags: z.lazy(() => RankTagUpdateManyWithoutRankNestedInputSchema).optional(),
  articles: z.lazy(() => ArticleUpdateManyWithoutRankNestedInputSchema).optional(),
  likes: z.lazy(() => RankLikeUpdateManyWithoutRankNestedInputSchema).optional(),
  favorites: z.lazy(() => RankFavoriteUpdateManyWithoutRankNestedInputSchema).optional(),
  comments: z.lazy(() => RankCommentUpdateManyWithoutRankNestedInputSchema).optional()
}).strict();

export const RankUncheckedUpdateWithoutSoftwaresInputSchema: z.ZodType<Prisma.RankUncheckedUpdateWithoutSoftwaresInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userAddress: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.lazy(() => RankTagUncheckedUpdateManyWithoutRankNestedInputSchema).optional(),
  articles: z.lazy(() => ArticleUncheckedUpdateManyWithoutRankNestedInputSchema).optional(),
  likes: z.lazy(() => RankLikeUncheckedUpdateManyWithoutRankNestedInputSchema).optional(),
  favorites: z.lazy(() => RankFavoriteUncheckedUpdateManyWithoutRankNestedInputSchema).optional(),
  comments: z.lazy(() => RankCommentUncheckedUpdateManyWithoutRankNestedInputSchema).optional()
}).strict();

export const SoftwareCreateWithoutArticlesInputSchema: z.ZodType<Prisma.SoftwareCreateWithoutArticlesInput> = z.object({
  id: z.string().optional(),
  image: z.string(),
  name: z.string(),
  description: z.string().optional().nullable(),
  url: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tags: z.lazy(() => SoftwareTagCreateNestedManyWithoutSoftwareInputSchema).optional(),
  ranks: z.lazy(() => SoftwareOnRankCreateNestedManyWithoutSoftwareInputSchema).optional(),
  likes: z.lazy(() => SoftwareLikeCreateNestedManyWithoutSoftwareInputSchema).optional(),
  favorites: z.lazy(() => SoftwareFavoriteCreateNestedManyWithoutSoftwareInputSchema).optional()
}).strict();

export const SoftwareUncheckedCreateWithoutArticlesInputSchema: z.ZodType<Prisma.SoftwareUncheckedCreateWithoutArticlesInput> = z.object({
  id: z.string().optional(),
  image: z.string(),
  name: z.string(),
  description: z.string().optional().nullable(),
  url: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tags: z.lazy(() => SoftwareTagUncheckedCreateNestedManyWithoutSoftwareInputSchema).optional(),
  ranks: z.lazy(() => SoftwareOnRankUncheckedCreateNestedManyWithoutSoftwareInputSchema).optional(),
  likes: z.lazy(() => SoftwareLikeUncheckedCreateNestedManyWithoutSoftwareInputSchema).optional(),
  favorites: z.lazy(() => SoftwareFavoriteUncheckedCreateNestedManyWithoutSoftwareInputSchema).optional()
}).strict();

export const SoftwareCreateOrConnectWithoutArticlesInputSchema: z.ZodType<Prisma.SoftwareCreateOrConnectWithoutArticlesInput> = z.object({
  where: z.lazy(() => SoftwareWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SoftwareCreateWithoutArticlesInputSchema),z.lazy(() => SoftwareUncheckedCreateWithoutArticlesInputSchema) ]),
}).strict();

export const ArticleCreateWithoutSoftwaresInputSchema: z.ZodType<Prisma.ArticleCreateWithoutSoftwaresInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string(),
  image: z.string(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  rank: z.lazy(() => RankCreateNestedOneWithoutArticlesInputSchema),
  author: z.lazy(() => UserCreateNestedOneWithoutArticlesInputSchema)
}).strict();

export const ArticleUncheckedCreateWithoutSoftwaresInputSchema: z.ZodType<Prisma.ArticleUncheckedCreateWithoutSoftwaresInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string(),
  image: z.string(),
  content: z.string(),
  rankId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userAddress: z.string()
}).strict();

export const ArticleCreateOrConnectWithoutSoftwaresInputSchema: z.ZodType<Prisma.ArticleCreateOrConnectWithoutSoftwaresInput> = z.object({
  where: z.lazy(() => ArticleWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ArticleCreateWithoutSoftwaresInputSchema),z.lazy(() => ArticleUncheckedCreateWithoutSoftwaresInputSchema) ]),
}).strict();

export const SoftwareUpsertWithoutArticlesInputSchema: z.ZodType<Prisma.SoftwareUpsertWithoutArticlesInput> = z.object({
  update: z.union([ z.lazy(() => SoftwareUpdateWithoutArticlesInputSchema),z.lazy(() => SoftwareUncheckedUpdateWithoutArticlesInputSchema) ]),
  create: z.union([ z.lazy(() => SoftwareCreateWithoutArticlesInputSchema),z.lazy(() => SoftwareUncheckedCreateWithoutArticlesInputSchema) ]),
  where: z.lazy(() => SoftwareWhereInputSchema).optional()
}).strict();

export const SoftwareUpdateToOneWithWhereWithoutArticlesInputSchema: z.ZodType<Prisma.SoftwareUpdateToOneWithWhereWithoutArticlesInput> = z.object({
  where: z.lazy(() => SoftwareWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => SoftwareUpdateWithoutArticlesInputSchema),z.lazy(() => SoftwareUncheckedUpdateWithoutArticlesInputSchema) ]),
}).strict();

export const SoftwareUpdateWithoutArticlesInputSchema: z.ZodType<Prisma.SoftwareUpdateWithoutArticlesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.lazy(() => SoftwareTagUpdateManyWithoutSoftwareNestedInputSchema).optional(),
  ranks: z.lazy(() => SoftwareOnRankUpdateManyWithoutSoftwareNestedInputSchema).optional(),
  likes: z.lazy(() => SoftwareLikeUpdateManyWithoutSoftwareNestedInputSchema).optional(),
  favorites: z.lazy(() => SoftwareFavoriteUpdateManyWithoutSoftwareNestedInputSchema).optional()
}).strict();

export const SoftwareUncheckedUpdateWithoutArticlesInputSchema: z.ZodType<Prisma.SoftwareUncheckedUpdateWithoutArticlesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.lazy(() => SoftwareTagUncheckedUpdateManyWithoutSoftwareNestedInputSchema).optional(),
  ranks: z.lazy(() => SoftwareOnRankUncheckedUpdateManyWithoutSoftwareNestedInputSchema).optional(),
  likes: z.lazy(() => SoftwareLikeUncheckedUpdateManyWithoutSoftwareNestedInputSchema).optional(),
  favorites: z.lazy(() => SoftwareFavoriteUncheckedUpdateManyWithoutSoftwareNestedInputSchema).optional()
}).strict();

export const ArticleUpsertWithoutSoftwaresInputSchema: z.ZodType<Prisma.ArticleUpsertWithoutSoftwaresInput> = z.object({
  update: z.union([ z.lazy(() => ArticleUpdateWithoutSoftwaresInputSchema),z.lazy(() => ArticleUncheckedUpdateWithoutSoftwaresInputSchema) ]),
  create: z.union([ z.lazy(() => ArticleCreateWithoutSoftwaresInputSchema),z.lazy(() => ArticleUncheckedCreateWithoutSoftwaresInputSchema) ]),
  where: z.lazy(() => ArticleWhereInputSchema).optional()
}).strict();

export const ArticleUpdateToOneWithWhereWithoutSoftwaresInputSchema: z.ZodType<Prisma.ArticleUpdateToOneWithWhereWithoutSoftwaresInput> = z.object({
  where: z.lazy(() => ArticleWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ArticleUpdateWithoutSoftwaresInputSchema),z.lazy(() => ArticleUncheckedUpdateWithoutSoftwaresInputSchema) ]),
}).strict();

export const ArticleUpdateWithoutSoftwaresInputSchema: z.ZodType<Prisma.ArticleUpdateWithoutSoftwaresInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  rank: z.lazy(() => RankUpdateOneRequiredWithoutArticlesNestedInputSchema).optional(),
  author: z.lazy(() => UserUpdateOneRequiredWithoutArticlesNestedInputSchema).optional()
}).strict();

export const ArticleUncheckedUpdateWithoutSoftwaresInputSchema: z.ZodType<Prisma.ArticleUncheckedUpdateWithoutSoftwaresInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rankId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userAddress: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RankCreateWithoutArticlesInputSchema: z.ZodType<Prisma.RankCreateWithoutArticlesInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutRanksInputSchema),
  tags: z.lazy(() => RankTagCreateNestedManyWithoutRankInputSchema).optional(),
  softwares: z.lazy(() => SoftwareOnRankCreateNestedManyWithoutRankInputSchema).optional(),
  likes: z.lazy(() => RankLikeCreateNestedManyWithoutRankInputSchema).optional(),
  favorites: z.lazy(() => RankFavoriteCreateNestedManyWithoutRankInputSchema).optional(),
  comments: z.lazy(() => RankCommentCreateNestedManyWithoutRankInputSchema).optional()
}).strict();

export const RankUncheckedCreateWithoutArticlesInputSchema: z.ZodType<Prisma.RankUncheckedCreateWithoutArticlesInput> = z.object({
  id: z.string().optional(),
  userAddress: z.string(),
  name: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tags: z.lazy(() => RankTagUncheckedCreateNestedManyWithoutRankInputSchema).optional(),
  softwares: z.lazy(() => SoftwareOnRankUncheckedCreateNestedManyWithoutRankInputSchema).optional(),
  likes: z.lazy(() => RankLikeUncheckedCreateNestedManyWithoutRankInputSchema).optional(),
  favorites: z.lazy(() => RankFavoriteUncheckedCreateNestedManyWithoutRankInputSchema).optional(),
  comments: z.lazy(() => RankCommentUncheckedCreateNestedManyWithoutRankInputSchema).optional()
}).strict();

export const RankCreateOrConnectWithoutArticlesInputSchema: z.ZodType<Prisma.RankCreateOrConnectWithoutArticlesInput> = z.object({
  where: z.lazy(() => RankWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RankCreateWithoutArticlesInputSchema),z.lazy(() => RankUncheckedCreateWithoutArticlesInputSchema) ]),
}).strict();

export const UserCreateWithoutArticlesInputSchema: z.ZodType<Prisma.UserCreateWithoutArticlesInput> = z.object({
  address: z.string(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  referralCode: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  invitedBy: z.union([ z.lazy(() => UserCreateinvitedByInputSchema),z.string().array() ]).optional(),
  ranks: z.lazy(() => RankCreateNestedManyWithoutUserInputSchema).optional(),
  platforms: z.lazy(() => UserPlatformCreateNestedManyWithoutUserInputSchema).optional(),
  rankLikes: z.lazy(() => RankLikeCreateNestedManyWithoutUserInputSchema).optional(),
  rankFavorites: z.lazy(() => RankFavoriteCreateNestedManyWithoutUserInputSchema).optional(),
  softwareLikes: z.lazy(() => SoftwareLikeCreateNestedManyWithoutUserInputSchema).optional(),
  softwareFavorites: z.lazy(() => SoftwareFavoriteCreateNestedManyWithoutUserInputSchema).optional(),
  rankComments: z.lazy(() => RankCommentCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutArticlesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutArticlesInput> = z.object({
  address: z.string(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  referralCode: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  invitedBy: z.union([ z.lazy(() => UserCreateinvitedByInputSchema),z.string().array() ]).optional(),
  ranks: z.lazy(() => RankUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  platforms: z.lazy(() => UserPlatformUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  rankLikes: z.lazy(() => RankLikeUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  rankFavorites: z.lazy(() => RankFavoriteUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  softwareLikes: z.lazy(() => SoftwareLikeUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  softwareFavorites: z.lazy(() => SoftwareFavoriteUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  rankComments: z.lazy(() => RankCommentUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutArticlesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutArticlesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutArticlesInputSchema),z.lazy(() => UserUncheckedCreateWithoutArticlesInputSchema) ]),
}).strict();

export const SoftwareOnArticleCreateWithoutArticleInputSchema: z.ZodType<Prisma.SoftwareOnArticleCreateWithoutArticleInput> = z.object({
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  software: z.lazy(() => SoftwareCreateNestedOneWithoutArticlesInputSchema)
}).strict();

export const SoftwareOnArticleUncheckedCreateWithoutArticleInputSchema: z.ZodType<Prisma.SoftwareOnArticleUncheckedCreateWithoutArticleInput> = z.object({
  softwareId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SoftwareOnArticleCreateOrConnectWithoutArticleInputSchema: z.ZodType<Prisma.SoftwareOnArticleCreateOrConnectWithoutArticleInput> = z.object({
  where: z.lazy(() => SoftwareOnArticleWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SoftwareOnArticleCreateWithoutArticleInputSchema),z.lazy(() => SoftwareOnArticleUncheckedCreateWithoutArticleInputSchema) ]),
}).strict();

export const SoftwareOnArticleCreateManyArticleInputEnvelopeSchema: z.ZodType<Prisma.SoftwareOnArticleCreateManyArticleInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SoftwareOnArticleCreateManyArticleInputSchema),z.lazy(() => SoftwareOnArticleCreateManyArticleInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const RankUpsertWithoutArticlesInputSchema: z.ZodType<Prisma.RankUpsertWithoutArticlesInput> = z.object({
  update: z.union([ z.lazy(() => RankUpdateWithoutArticlesInputSchema),z.lazy(() => RankUncheckedUpdateWithoutArticlesInputSchema) ]),
  create: z.union([ z.lazy(() => RankCreateWithoutArticlesInputSchema),z.lazy(() => RankUncheckedCreateWithoutArticlesInputSchema) ]),
  where: z.lazy(() => RankWhereInputSchema).optional()
}).strict();

export const RankUpdateToOneWithWhereWithoutArticlesInputSchema: z.ZodType<Prisma.RankUpdateToOneWithWhereWithoutArticlesInput> = z.object({
  where: z.lazy(() => RankWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => RankUpdateWithoutArticlesInputSchema),z.lazy(() => RankUncheckedUpdateWithoutArticlesInputSchema) ]),
}).strict();

export const RankUpdateWithoutArticlesInputSchema: z.ZodType<Prisma.RankUpdateWithoutArticlesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutRanksNestedInputSchema).optional(),
  tags: z.lazy(() => RankTagUpdateManyWithoutRankNestedInputSchema).optional(),
  softwares: z.lazy(() => SoftwareOnRankUpdateManyWithoutRankNestedInputSchema).optional(),
  likes: z.lazy(() => RankLikeUpdateManyWithoutRankNestedInputSchema).optional(),
  favorites: z.lazy(() => RankFavoriteUpdateManyWithoutRankNestedInputSchema).optional(),
  comments: z.lazy(() => RankCommentUpdateManyWithoutRankNestedInputSchema).optional()
}).strict();

export const RankUncheckedUpdateWithoutArticlesInputSchema: z.ZodType<Prisma.RankUncheckedUpdateWithoutArticlesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userAddress: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.lazy(() => RankTagUncheckedUpdateManyWithoutRankNestedInputSchema).optional(),
  softwares: z.lazy(() => SoftwareOnRankUncheckedUpdateManyWithoutRankNestedInputSchema).optional(),
  likes: z.lazy(() => RankLikeUncheckedUpdateManyWithoutRankNestedInputSchema).optional(),
  favorites: z.lazy(() => RankFavoriteUncheckedUpdateManyWithoutRankNestedInputSchema).optional(),
  comments: z.lazy(() => RankCommentUncheckedUpdateManyWithoutRankNestedInputSchema).optional()
}).strict();

export const UserUpsertWithoutArticlesInputSchema: z.ZodType<Prisma.UserUpsertWithoutArticlesInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutArticlesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutArticlesInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutArticlesInputSchema),z.lazy(() => UserUncheckedCreateWithoutArticlesInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutArticlesInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutArticlesInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutArticlesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutArticlesInputSchema) ]),
}).strict();

export const UserUpdateWithoutArticlesInputSchema: z.ZodType<Prisma.UserUpdateWithoutArticlesInput> = z.object({
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  referralCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  invitedBy: z.union([ z.lazy(() => UserUpdateinvitedByInputSchema),z.string().array() ]).optional(),
  ranks: z.lazy(() => RankUpdateManyWithoutUserNestedInputSchema).optional(),
  platforms: z.lazy(() => UserPlatformUpdateManyWithoutUserNestedInputSchema).optional(),
  rankLikes: z.lazy(() => RankLikeUpdateManyWithoutUserNestedInputSchema).optional(),
  rankFavorites: z.lazy(() => RankFavoriteUpdateManyWithoutUserNestedInputSchema).optional(),
  softwareLikes: z.lazy(() => SoftwareLikeUpdateManyWithoutUserNestedInputSchema).optional(),
  softwareFavorites: z.lazy(() => SoftwareFavoriteUpdateManyWithoutUserNestedInputSchema).optional(),
  rankComments: z.lazy(() => RankCommentUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutArticlesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutArticlesInput> = z.object({
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  referralCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  invitedBy: z.union([ z.lazy(() => UserUpdateinvitedByInputSchema),z.string().array() ]).optional(),
  ranks: z.lazy(() => RankUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  platforms: z.lazy(() => UserPlatformUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  rankLikes: z.lazy(() => RankLikeUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  rankFavorites: z.lazy(() => RankFavoriteUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  softwareLikes: z.lazy(() => SoftwareLikeUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  softwareFavorites: z.lazy(() => SoftwareFavoriteUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  rankComments: z.lazy(() => RankCommentUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const SoftwareOnArticleUpsertWithWhereUniqueWithoutArticleInputSchema: z.ZodType<Prisma.SoftwareOnArticleUpsertWithWhereUniqueWithoutArticleInput> = z.object({
  where: z.lazy(() => SoftwareOnArticleWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SoftwareOnArticleUpdateWithoutArticleInputSchema),z.lazy(() => SoftwareOnArticleUncheckedUpdateWithoutArticleInputSchema) ]),
  create: z.union([ z.lazy(() => SoftwareOnArticleCreateWithoutArticleInputSchema),z.lazy(() => SoftwareOnArticleUncheckedCreateWithoutArticleInputSchema) ]),
}).strict();

export const SoftwareOnArticleUpdateWithWhereUniqueWithoutArticleInputSchema: z.ZodType<Prisma.SoftwareOnArticleUpdateWithWhereUniqueWithoutArticleInput> = z.object({
  where: z.lazy(() => SoftwareOnArticleWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SoftwareOnArticleUpdateWithoutArticleInputSchema),z.lazy(() => SoftwareOnArticleUncheckedUpdateWithoutArticleInputSchema) ]),
}).strict();

export const SoftwareOnArticleUpdateManyWithWhereWithoutArticleInputSchema: z.ZodType<Prisma.SoftwareOnArticleUpdateManyWithWhereWithoutArticleInput> = z.object({
  where: z.lazy(() => SoftwareOnArticleScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SoftwareOnArticleUpdateManyMutationInputSchema),z.lazy(() => SoftwareOnArticleUncheckedUpdateManyWithoutArticleInputSchema) ]),
}).strict();

export const RankCreateWithoutLikesInputSchema: z.ZodType<Prisma.RankCreateWithoutLikesInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutRanksInputSchema),
  tags: z.lazy(() => RankTagCreateNestedManyWithoutRankInputSchema).optional(),
  softwares: z.lazy(() => SoftwareOnRankCreateNestedManyWithoutRankInputSchema).optional(),
  articles: z.lazy(() => ArticleCreateNestedManyWithoutRankInputSchema).optional(),
  favorites: z.lazy(() => RankFavoriteCreateNestedManyWithoutRankInputSchema).optional(),
  comments: z.lazy(() => RankCommentCreateNestedManyWithoutRankInputSchema).optional()
}).strict();

export const RankUncheckedCreateWithoutLikesInputSchema: z.ZodType<Prisma.RankUncheckedCreateWithoutLikesInput> = z.object({
  id: z.string().optional(),
  userAddress: z.string(),
  name: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tags: z.lazy(() => RankTagUncheckedCreateNestedManyWithoutRankInputSchema).optional(),
  softwares: z.lazy(() => SoftwareOnRankUncheckedCreateNestedManyWithoutRankInputSchema).optional(),
  articles: z.lazy(() => ArticleUncheckedCreateNestedManyWithoutRankInputSchema).optional(),
  favorites: z.lazy(() => RankFavoriteUncheckedCreateNestedManyWithoutRankInputSchema).optional(),
  comments: z.lazy(() => RankCommentUncheckedCreateNestedManyWithoutRankInputSchema).optional()
}).strict();

export const RankCreateOrConnectWithoutLikesInputSchema: z.ZodType<Prisma.RankCreateOrConnectWithoutLikesInput> = z.object({
  where: z.lazy(() => RankWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RankCreateWithoutLikesInputSchema),z.lazy(() => RankUncheckedCreateWithoutLikesInputSchema) ]),
}).strict();

export const UserCreateWithoutRankLikesInputSchema: z.ZodType<Prisma.UserCreateWithoutRankLikesInput> = z.object({
  address: z.string(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  referralCode: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  invitedBy: z.union([ z.lazy(() => UserCreateinvitedByInputSchema),z.string().array() ]).optional(),
  ranks: z.lazy(() => RankCreateNestedManyWithoutUserInputSchema).optional(),
  platforms: z.lazy(() => UserPlatformCreateNestedManyWithoutUserInputSchema).optional(),
  articles: z.lazy(() => ArticleCreateNestedManyWithoutAuthorInputSchema).optional(),
  rankFavorites: z.lazy(() => RankFavoriteCreateNestedManyWithoutUserInputSchema).optional(),
  softwareLikes: z.lazy(() => SoftwareLikeCreateNestedManyWithoutUserInputSchema).optional(),
  softwareFavorites: z.lazy(() => SoftwareFavoriteCreateNestedManyWithoutUserInputSchema).optional(),
  rankComments: z.lazy(() => RankCommentCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutRankLikesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutRankLikesInput> = z.object({
  address: z.string(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  referralCode: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  invitedBy: z.union([ z.lazy(() => UserCreateinvitedByInputSchema),z.string().array() ]).optional(),
  ranks: z.lazy(() => RankUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  platforms: z.lazy(() => UserPlatformUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  articles: z.lazy(() => ArticleUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  rankFavorites: z.lazy(() => RankFavoriteUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  softwareLikes: z.lazy(() => SoftwareLikeUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  softwareFavorites: z.lazy(() => SoftwareFavoriteUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  rankComments: z.lazy(() => RankCommentUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutRankLikesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutRankLikesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutRankLikesInputSchema),z.lazy(() => UserUncheckedCreateWithoutRankLikesInputSchema) ]),
}).strict();

export const RankUpsertWithoutLikesInputSchema: z.ZodType<Prisma.RankUpsertWithoutLikesInput> = z.object({
  update: z.union([ z.lazy(() => RankUpdateWithoutLikesInputSchema),z.lazy(() => RankUncheckedUpdateWithoutLikesInputSchema) ]),
  create: z.union([ z.lazy(() => RankCreateWithoutLikesInputSchema),z.lazy(() => RankUncheckedCreateWithoutLikesInputSchema) ]),
  where: z.lazy(() => RankWhereInputSchema).optional()
}).strict();

export const RankUpdateToOneWithWhereWithoutLikesInputSchema: z.ZodType<Prisma.RankUpdateToOneWithWhereWithoutLikesInput> = z.object({
  where: z.lazy(() => RankWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => RankUpdateWithoutLikesInputSchema),z.lazy(() => RankUncheckedUpdateWithoutLikesInputSchema) ]),
}).strict();

export const RankUpdateWithoutLikesInputSchema: z.ZodType<Prisma.RankUpdateWithoutLikesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutRanksNestedInputSchema).optional(),
  tags: z.lazy(() => RankTagUpdateManyWithoutRankNestedInputSchema).optional(),
  softwares: z.lazy(() => SoftwareOnRankUpdateManyWithoutRankNestedInputSchema).optional(),
  articles: z.lazy(() => ArticleUpdateManyWithoutRankNestedInputSchema).optional(),
  favorites: z.lazy(() => RankFavoriteUpdateManyWithoutRankNestedInputSchema).optional(),
  comments: z.lazy(() => RankCommentUpdateManyWithoutRankNestedInputSchema).optional()
}).strict();

export const RankUncheckedUpdateWithoutLikesInputSchema: z.ZodType<Prisma.RankUncheckedUpdateWithoutLikesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userAddress: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.lazy(() => RankTagUncheckedUpdateManyWithoutRankNestedInputSchema).optional(),
  softwares: z.lazy(() => SoftwareOnRankUncheckedUpdateManyWithoutRankNestedInputSchema).optional(),
  articles: z.lazy(() => ArticleUncheckedUpdateManyWithoutRankNestedInputSchema).optional(),
  favorites: z.lazy(() => RankFavoriteUncheckedUpdateManyWithoutRankNestedInputSchema).optional(),
  comments: z.lazy(() => RankCommentUncheckedUpdateManyWithoutRankNestedInputSchema).optional()
}).strict();

export const UserUpsertWithoutRankLikesInputSchema: z.ZodType<Prisma.UserUpsertWithoutRankLikesInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutRankLikesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRankLikesInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutRankLikesInputSchema),z.lazy(() => UserUncheckedCreateWithoutRankLikesInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutRankLikesInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutRankLikesInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutRankLikesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRankLikesInputSchema) ]),
}).strict();

export const UserUpdateWithoutRankLikesInputSchema: z.ZodType<Prisma.UserUpdateWithoutRankLikesInput> = z.object({
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  referralCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  invitedBy: z.union([ z.lazy(() => UserUpdateinvitedByInputSchema),z.string().array() ]).optional(),
  ranks: z.lazy(() => RankUpdateManyWithoutUserNestedInputSchema).optional(),
  platforms: z.lazy(() => UserPlatformUpdateManyWithoutUserNestedInputSchema).optional(),
  articles: z.lazy(() => ArticleUpdateManyWithoutAuthorNestedInputSchema).optional(),
  rankFavorites: z.lazy(() => RankFavoriteUpdateManyWithoutUserNestedInputSchema).optional(),
  softwareLikes: z.lazy(() => SoftwareLikeUpdateManyWithoutUserNestedInputSchema).optional(),
  softwareFavorites: z.lazy(() => SoftwareFavoriteUpdateManyWithoutUserNestedInputSchema).optional(),
  rankComments: z.lazy(() => RankCommentUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutRankLikesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutRankLikesInput> = z.object({
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  referralCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  invitedBy: z.union([ z.lazy(() => UserUpdateinvitedByInputSchema),z.string().array() ]).optional(),
  ranks: z.lazy(() => RankUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  platforms: z.lazy(() => UserPlatformUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  articles: z.lazy(() => ArticleUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  rankFavorites: z.lazy(() => RankFavoriteUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  softwareLikes: z.lazy(() => SoftwareLikeUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  softwareFavorites: z.lazy(() => SoftwareFavoriteUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  rankComments: z.lazy(() => RankCommentUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const RankCreateWithoutFavoritesInputSchema: z.ZodType<Prisma.RankCreateWithoutFavoritesInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutRanksInputSchema),
  tags: z.lazy(() => RankTagCreateNestedManyWithoutRankInputSchema).optional(),
  softwares: z.lazy(() => SoftwareOnRankCreateNestedManyWithoutRankInputSchema).optional(),
  articles: z.lazy(() => ArticleCreateNestedManyWithoutRankInputSchema).optional(),
  likes: z.lazy(() => RankLikeCreateNestedManyWithoutRankInputSchema).optional(),
  comments: z.lazy(() => RankCommentCreateNestedManyWithoutRankInputSchema).optional()
}).strict();

export const RankUncheckedCreateWithoutFavoritesInputSchema: z.ZodType<Prisma.RankUncheckedCreateWithoutFavoritesInput> = z.object({
  id: z.string().optional(),
  userAddress: z.string(),
  name: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tags: z.lazy(() => RankTagUncheckedCreateNestedManyWithoutRankInputSchema).optional(),
  softwares: z.lazy(() => SoftwareOnRankUncheckedCreateNestedManyWithoutRankInputSchema).optional(),
  articles: z.lazy(() => ArticleUncheckedCreateNestedManyWithoutRankInputSchema).optional(),
  likes: z.lazy(() => RankLikeUncheckedCreateNestedManyWithoutRankInputSchema).optional(),
  comments: z.lazy(() => RankCommentUncheckedCreateNestedManyWithoutRankInputSchema).optional()
}).strict();

export const RankCreateOrConnectWithoutFavoritesInputSchema: z.ZodType<Prisma.RankCreateOrConnectWithoutFavoritesInput> = z.object({
  where: z.lazy(() => RankWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RankCreateWithoutFavoritesInputSchema),z.lazy(() => RankUncheckedCreateWithoutFavoritesInputSchema) ]),
}).strict();

export const UserCreateWithoutRankFavoritesInputSchema: z.ZodType<Prisma.UserCreateWithoutRankFavoritesInput> = z.object({
  address: z.string(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  referralCode: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  invitedBy: z.union([ z.lazy(() => UserCreateinvitedByInputSchema),z.string().array() ]).optional(),
  ranks: z.lazy(() => RankCreateNestedManyWithoutUserInputSchema).optional(),
  platforms: z.lazy(() => UserPlatformCreateNestedManyWithoutUserInputSchema).optional(),
  articles: z.lazy(() => ArticleCreateNestedManyWithoutAuthorInputSchema).optional(),
  rankLikes: z.lazy(() => RankLikeCreateNestedManyWithoutUserInputSchema).optional(),
  softwareLikes: z.lazy(() => SoftwareLikeCreateNestedManyWithoutUserInputSchema).optional(),
  softwareFavorites: z.lazy(() => SoftwareFavoriteCreateNestedManyWithoutUserInputSchema).optional(),
  rankComments: z.lazy(() => RankCommentCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutRankFavoritesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutRankFavoritesInput> = z.object({
  address: z.string(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  referralCode: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  invitedBy: z.union([ z.lazy(() => UserCreateinvitedByInputSchema),z.string().array() ]).optional(),
  ranks: z.lazy(() => RankUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  platforms: z.lazy(() => UserPlatformUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  articles: z.lazy(() => ArticleUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  rankLikes: z.lazy(() => RankLikeUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  softwareLikes: z.lazy(() => SoftwareLikeUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  softwareFavorites: z.lazy(() => SoftwareFavoriteUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  rankComments: z.lazy(() => RankCommentUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutRankFavoritesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutRankFavoritesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutRankFavoritesInputSchema),z.lazy(() => UserUncheckedCreateWithoutRankFavoritesInputSchema) ]),
}).strict();

export const RankUpsertWithoutFavoritesInputSchema: z.ZodType<Prisma.RankUpsertWithoutFavoritesInput> = z.object({
  update: z.union([ z.lazy(() => RankUpdateWithoutFavoritesInputSchema),z.lazy(() => RankUncheckedUpdateWithoutFavoritesInputSchema) ]),
  create: z.union([ z.lazy(() => RankCreateWithoutFavoritesInputSchema),z.lazy(() => RankUncheckedCreateWithoutFavoritesInputSchema) ]),
  where: z.lazy(() => RankWhereInputSchema).optional()
}).strict();

export const RankUpdateToOneWithWhereWithoutFavoritesInputSchema: z.ZodType<Prisma.RankUpdateToOneWithWhereWithoutFavoritesInput> = z.object({
  where: z.lazy(() => RankWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => RankUpdateWithoutFavoritesInputSchema),z.lazy(() => RankUncheckedUpdateWithoutFavoritesInputSchema) ]),
}).strict();

export const RankUpdateWithoutFavoritesInputSchema: z.ZodType<Prisma.RankUpdateWithoutFavoritesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutRanksNestedInputSchema).optional(),
  tags: z.lazy(() => RankTagUpdateManyWithoutRankNestedInputSchema).optional(),
  softwares: z.lazy(() => SoftwareOnRankUpdateManyWithoutRankNestedInputSchema).optional(),
  articles: z.lazy(() => ArticleUpdateManyWithoutRankNestedInputSchema).optional(),
  likes: z.lazy(() => RankLikeUpdateManyWithoutRankNestedInputSchema).optional(),
  comments: z.lazy(() => RankCommentUpdateManyWithoutRankNestedInputSchema).optional()
}).strict();

export const RankUncheckedUpdateWithoutFavoritesInputSchema: z.ZodType<Prisma.RankUncheckedUpdateWithoutFavoritesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userAddress: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.lazy(() => RankTagUncheckedUpdateManyWithoutRankNestedInputSchema).optional(),
  softwares: z.lazy(() => SoftwareOnRankUncheckedUpdateManyWithoutRankNestedInputSchema).optional(),
  articles: z.lazy(() => ArticleUncheckedUpdateManyWithoutRankNestedInputSchema).optional(),
  likes: z.lazy(() => RankLikeUncheckedUpdateManyWithoutRankNestedInputSchema).optional(),
  comments: z.lazy(() => RankCommentUncheckedUpdateManyWithoutRankNestedInputSchema).optional()
}).strict();

export const UserUpsertWithoutRankFavoritesInputSchema: z.ZodType<Prisma.UserUpsertWithoutRankFavoritesInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutRankFavoritesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRankFavoritesInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutRankFavoritesInputSchema),z.lazy(() => UserUncheckedCreateWithoutRankFavoritesInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutRankFavoritesInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutRankFavoritesInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutRankFavoritesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRankFavoritesInputSchema) ]),
}).strict();

export const UserUpdateWithoutRankFavoritesInputSchema: z.ZodType<Prisma.UserUpdateWithoutRankFavoritesInput> = z.object({
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  referralCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  invitedBy: z.union([ z.lazy(() => UserUpdateinvitedByInputSchema),z.string().array() ]).optional(),
  ranks: z.lazy(() => RankUpdateManyWithoutUserNestedInputSchema).optional(),
  platforms: z.lazy(() => UserPlatformUpdateManyWithoutUserNestedInputSchema).optional(),
  articles: z.lazy(() => ArticleUpdateManyWithoutAuthorNestedInputSchema).optional(),
  rankLikes: z.lazy(() => RankLikeUpdateManyWithoutUserNestedInputSchema).optional(),
  softwareLikes: z.lazy(() => SoftwareLikeUpdateManyWithoutUserNestedInputSchema).optional(),
  softwareFavorites: z.lazy(() => SoftwareFavoriteUpdateManyWithoutUserNestedInputSchema).optional(),
  rankComments: z.lazy(() => RankCommentUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutRankFavoritesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutRankFavoritesInput> = z.object({
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  referralCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  invitedBy: z.union([ z.lazy(() => UserUpdateinvitedByInputSchema),z.string().array() ]).optional(),
  ranks: z.lazy(() => RankUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  platforms: z.lazy(() => UserPlatformUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  articles: z.lazy(() => ArticleUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  rankLikes: z.lazy(() => RankLikeUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  softwareLikes: z.lazy(() => SoftwareLikeUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  softwareFavorites: z.lazy(() => SoftwareFavoriteUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  rankComments: z.lazy(() => RankCommentUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const SoftwareCreateWithoutLikesInputSchema: z.ZodType<Prisma.SoftwareCreateWithoutLikesInput> = z.object({
  id: z.string().optional(),
  image: z.string(),
  name: z.string(),
  description: z.string().optional().nullable(),
  url: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tags: z.lazy(() => SoftwareTagCreateNestedManyWithoutSoftwareInputSchema).optional(),
  ranks: z.lazy(() => SoftwareOnRankCreateNestedManyWithoutSoftwareInputSchema).optional(),
  favorites: z.lazy(() => SoftwareFavoriteCreateNestedManyWithoutSoftwareInputSchema).optional(),
  articles: z.lazy(() => SoftwareOnArticleCreateNestedManyWithoutSoftwareInputSchema).optional()
}).strict();

export const SoftwareUncheckedCreateWithoutLikesInputSchema: z.ZodType<Prisma.SoftwareUncheckedCreateWithoutLikesInput> = z.object({
  id: z.string().optional(),
  image: z.string(),
  name: z.string(),
  description: z.string().optional().nullable(),
  url: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tags: z.lazy(() => SoftwareTagUncheckedCreateNestedManyWithoutSoftwareInputSchema).optional(),
  ranks: z.lazy(() => SoftwareOnRankUncheckedCreateNestedManyWithoutSoftwareInputSchema).optional(),
  favorites: z.lazy(() => SoftwareFavoriteUncheckedCreateNestedManyWithoutSoftwareInputSchema).optional(),
  articles: z.lazy(() => SoftwareOnArticleUncheckedCreateNestedManyWithoutSoftwareInputSchema).optional()
}).strict();

export const SoftwareCreateOrConnectWithoutLikesInputSchema: z.ZodType<Prisma.SoftwareCreateOrConnectWithoutLikesInput> = z.object({
  where: z.lazy(() => SoftwareWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SoftwareCreateWithoutLikesInputSchema),z.lazy(() => SoftwareUncheckedCreateWithoutLikesInputSchema) ]),
}).strict();

export const UserCreateWithoutSoftwareLikesInputSchema: z.ZodType<Prisma.UserCreateWithoutSoftwareLikesInput> = z.object({
  address: z.string(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  referralCode: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  invitedBy: z.union([ z.lazy(() => UserCreateinvitedByInputSchema),z.string().array() ]).optional(),
  ranks: z.lazy(() => RankCreateNestedManyWithoutUserInputSchema).optional(),
  platforms: z.lazy(() => UserPlatformCreateNestedManyWithoutUserInputSchema).optional(),
  articles: z.lazy(() => ArticleCreateNestedManyWithoutAuthorInputSchema).optional(),
  rankLikes: z.lazy(() => RankLikeCreateNestedManyWithoutUserInputSchema).optional(),
  rankFavorites: z.lazy(() => RankFavoriteCreateNestedManyWithoutUserInputSchema).optional(),
  softwareFavorites: z.lazy(() => SoftwareFavoriteCreateNestedManyWithoutUserInputSchema).optional(),
  rankComments: z.lazy(() => RankCommentCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutSoftwareLikesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSoftwareLikesInput> = z.object({
  address: z.string(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  referralCode: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  invitedBy: z.union([ z.lazy(() => UserCreateinvitedByInputSchema),z.string().array() ]).optional(),
  ranks: z.lazy(() => RankUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  platforms: z.lazy(() => UserPlatformUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  articles: z.lazy(() => ArticleUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  rankLikes: z.lazy(() => RankLikeUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  rankFavorites: z.lazy(() => RankFavoriteUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  softwareFavorites: z.lazy(() => SoftwareFavoriteUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  rankComments: z.lazy(() => RankCommentUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutSoftwareLikesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSoftwareLikesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSoftwareLikesInputSchema),z.lazy(() => UserUncheckedCreateWithoutSoftwareLikesInputSchema) ]),
}).strict();

export const SoftwareUpsertWithoutLikesInputSchema: z.ZodType<Prisma.SoftwareUpsertWithoutLikesInput> = z.object({
  update: z.union([ z.lazy(() => SoftwareUpdateWithoutLikesInputSchema),z.lazy(() => SoftwareUncheckedUpdateWithoutLikesInputSchema) ]),
  create: z.union([ z.lazy(() => SoftwareCreateWithoutLikesInputSchema),z.lazy(() => SoftwareUncheckedCreateWithoutLikesInputSchema) ]),
  where: z.lazy(() => SoftwareWhereInputSchema).optional()
}).strict();

export const SoftwareUpdateToOneWithWhereWithoutLikesInputSchema: z.ZodType<Prisma.SoftwareUpdateToOneWithWhereWithoutLikesInput> = z.object({
  where: z.lazy(() => SoftwareWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => SoftwareUpdateWithoutLikesInputSchema),z.lazy(() => SoftwareUncheckedUpdateWithoutLikesInputSchema) ]),
}).strict();

export const SoftwareUpdateWithoutLikesInputSchema: z.ZodType<Prisma.SoftwareUpdateWithoutLikesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.lazy(() => SoftwareTagUpdateManyWithoutSoftwareNestedInputSchema).optional(),
  ranks: z.lazy(() => SoftwareOnRankUpdateManyWithoutSoftwareNestedInputSchema).optional(),
  favorites: z.lazy(() => SoftwareFavoriteUpdateManyWithoutSoftwareNestedInputSchema).optional(),
  articles: z.lazy(() => SoftwareOnArticleUpdateManyWithoutSoftwareNestedInputSchema).optional()
}).strict();

export const SoftwareUncheckedUpdateWithoutLikesInputSchema: z.ZodType<Prisma.SoftwareUncheckedUpdateWithoutLikesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.lazy(() => SoftwareTagUncheckedUpdateManyWithoutSoftwareNestedInputSchema).optional(),
  ranks: z.lazy(() => SoftwareOnRankUncheckedUpdateManyWithoutSoftwareNestedInputSchema).optional(),
  favorites: z.lazy(() => SoftwareFavoriteUncheckedUpdateManyWithoutSoftwareNestedInputSchema).optional(),
  articles: z.lazy(() => SoftwareOnArticleUncheckedUpdateManyWithoutSoftwareNestedInputSchema).optional()
}).strict();

export const UserUpsertWithoutSoftwareLikesInputSchema: z.ZodType<Prisma.UserUpsertWithoutSoftwareLikesInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutSoftwareLikesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSoftwareLikesInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSoftwareLikesInputSchema),z.lazy(() => UserUncheckedCreateWithoutSoftwareLikesInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutSoftwareLikesInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSoftwareLikesInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutSoftwareLikesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSoftwareLikesInputSchema) ]),
}).strict();

export const UserUpdateWithoutSoftwareLikesInputSchema: z.ZodType<Prisma.UserUpdateWithoutSoftwareLikesInput> = z.object({
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  referralCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  invitedBy: z.union([ z.lazy(() => UserUpdateinvitedByInputSchema),z.string().array() ]).optional(),
  ranks: z.lazy(() => RankUpdateManyWithoutUserNestedInputSchema).optional(),
  platforms: z.lazy(() => UserPlatformUpdateManyWithoutUserNestedInputSchema).optional(),
  articles: z.lazy(() => ArticleUpdateManyWithoutAuthorNestedInputSchema).optional(),
  rankLikes: z.lazy(() => RankLikeUpdateManyWithoutUserNestedInputSchema).optional(),
  rankFavorites: z.lazy(() => RankFavoriteUpdateManyWithoutUserNestedInputSchema).optional(),
  softwareFavorites: z.lazy(() => SoftwareFavoriteUpdateManyWithoutUserNestedInputSchema).optional(),
  rankComments: z.lazy(() => RankCommentUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutSoftwareLikesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSoftwareLikesInput> = z.object({
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  referralCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  invitedBy: z.union([ z.lazy(() => UserUpdateinvitedByInputSchema),z.string().array() ]).optional(),
  ranks: z.lazy(() => RankUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  platforms: z.lazy(() => UserPlatformUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  articles: z.lazy(() => ArticleUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  rankLikes: z.lazy(() => RankLikeUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  rankFavorites: z.lazy(() => RankFavoriteUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  softwareFavorites: z.lazy(() => SoftwareFavoriteUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  rankComments: z.lazy(() => RankCommentUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const SoftwareCreateWithoutFavoritesInputSchema: z.ZodType<Prisma.SoftwareCreateWithoutFavoritesInput> = z.object({
  id: z.string().optional(),
  image: z.string(),
  name: z.string(),
  description: z.string().optional().nullable(),
  url: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tags: z.lazy(() => SoftwareTagCreateNestedManyWithoutSoftwareInputSchema).optional(),
  ranks: z.lazy(() => SoftwareOnRankCreateNestedManyWithoutSoftwareInputSchema).optional(),
  likes: z.lazy(() => SoftwareLikeCreateNestedManyWithoutSoftwareInputSchema).optional(),
  articles: z.lazy(() => SoftwareOnArticleCreateNestedManyWithoutSoftwareInputSchema).optional()
}).strict();

export const SoftwareUncheckedCreateWithoutFavoritesInputSchema: z.ZodType<Prisma.SoftwareUncheckedCreateWithoutFavoritesInput> = z.object({
  id: z.string().optional(),
  image: z.string(),
  name: z.string(),
  description: z.string().optional().nullable(),
  url: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tags: z.lazy(() => SoftwareTagUncheckedCreateNestedManyWithoutSoftwareInputSchema).optional(),
  ranks: z.lazy(() => SoftwareOnRankUncheckedCreateNestedManyWithoutSoftwareInputSchema).optional(),
  likes: z.lazy(() => SoftwareLikeUncheckedCreateNestedManyWithoutSoftwareInputSchema).optional(),
  articles: z.lazy(() => SoftwareOnArticleUncheckedCreateNestedManyWithoutSoftwareInputSchema).optional()
}).strict();

export const SoftwareCreateOrConnectWithoutFavoritesInputSchema: z.ZodType<Prisma.SoftwareCreateOrConnectWithoutFavoritesInput> = z.object({
  where: z.lazy(() => SoftwareWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SoftwareCreateWithoutFavoritesInputSchema),z.lazy(() => SoftwareUncheckedCreateWithoutFavoritesInputSchema) ]),
}).strict();

export const UserCreateWithoutSoftwareFavoritesInputSchema: z.ZodType<Prisma.UserCreateWithoutSoftwareFavoritesInput> = z.object({
  address: z.string(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  referralCode: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  invitedBy: z.union([ z.lazy(() => UserCreateinvitedByInputSchema),z.string().array() ]).optional(),
  ranks: z.lazy(() => RankCreateNestedManyWithoutUserInputSchema).optional(),
  platforms: z.lazy(() => UserPlatformCreateNestedManyWithoutUserInputSchema).optional(),
  articles: z.lazy(() => ArticleCreateNestedManyWithoutAuthorInputSchema).optional(),
  rankLikes: z.lazy(() => RankLikeCreateNestedManyWithoutUserInputSchema).optional(),
  rankFavorites: z.lazy(() => RankFavoriteCreateNestedManyWithoutUserInputSchema).optional(),
  softwareLikes: z.lazy(() => SoftwareLikeCreateNestedManyWithoutUserInputSchema).optional(),
  rankComments: z.lazy(() => RankCommentCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutSoftwareFavoritesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSoftwareFavoritesInput> = z.object({
  address: z.string(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  referralCode: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  invitedBy: z.union([ z.lazy(() => UserCreateinvitedByInputSchema),z.string().array() ]).optional(),
  ranks: z.lazy(() => RankUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  platforms: z.lazy(() => UserPlatformUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  articles: z.lazy(() => ArticleUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  rankLikes: z.lazy(() => RankLikeUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  rankFavorites: z.lazy(() => RankFavoriteUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  softwareLikes: z.lazy(() => SoftwareLikeUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  rankComments: z.lazy(() => RankCommentUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutSoftwareFavoritesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSoftwareFavoritesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSoftwareFavoritesInputSchema),z.lazy(() => UserUncheckedCreateWithoutSoftwareFavoritesInputSchema) ]),
}).strict();

export const SoftwareUpsertWithoutFavoritesInputSchema: z.ZodType<Prisma.SoftwareUpsertWithoutFavoritesInput> = z.object({
  update: z.union([ z.lazy(() => SoftwareUpdateWithoutFavoritesInputSchema),z.lazy(() => SoftwareUncheckedUpdateWithoutFavoritesInputSchema) ]),
  create: z.union([ z.lazy(() => SoftwareCreateWithoutFavoritesInputSchema),z.lazy(() => SoftwareUncheckedCreateWithoutFavoritesInputSchema) ]),
  where: z.lazy(() => SoftwareWhereInputSchema).optional()
}).strict();

export const SoftwareUpdateToOneWithWhereWithoutFavoritesInputSchema: z.ZodType<Prisma.SoftwareUpdateToOneWithWhereWithoutFavoritesInput> = z.object({
  where: z.lazy(() => SoftwareWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => SoftwareUpdateWithoutFavoritesInputSchema),z.lazy(() => SoftwareUncheckedUpdateWithoutFavoritesInputSchema) ]),
}).strict();

export const SoftwareUpdateWithoutFavoritesInputSchema: z.ZodType<Prisma.SoftwareUpdateWithoutFavoritesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.lazy(() => SoftwareTagUpdateManyWithoutSoftwareNestedInputSchema).optional(),
  ranks: z.lazy(() => SoftwareOnRankUpdateManyWithoutSoftwareNestedInputSchema).optional(),
  likes: z.lazy(() => SoftwareLikeUpdateManyWithoutSoftwareNestedInputSchema).optional(),
  articles: z.lazy(() => SoftwareOnArticleUpdateManyWithoutSoftwareNestedInputSchema).optional()
}).strict();

export const SoftwareUncheckedUpdateWithoutFavoritesInputSchema: z.ZodType<Prisma.SoftwareUncheckedUpdateWithoutFavoritesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.lazy(() => SoftwareTagUncheckedUpdateManyWithoutSoftwareNestedInputSchema).optional(),
  ranks: z.lazy(() => SoftwareOnRankUncheckedUpdateManyWithoutSoftwareNestedInputSchema).optional(),
  likes: z.lazy(() => SoftwareLikeUncheckedUpdateManyWithoutSoftwareNestedInputSchema).optional(),
  articles: z.lazy(() => SoftwareOnArticleUncheckedUpdateManyWithoutSoftwareNestedInputSchema).optional()
}).strict();

export const UserUpsertWithoutSoftwareFavoritesInputSchema: z.ZodType<Prisma.UserUpsertWithoutSoftwareFavoritesInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutSoftwareFavoritesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSoftwareFavoritesInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSoftwareFavoritesInputSchema),z.lazy(() => UserUncheckedCreateWithoutSoftwareFavoritesInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutSoftwareFavoritesInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSoftwareFavoritesInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutSoftwareFavoritesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSoftwareFavoritesInputSchema) ]),
}).strict();

export const UserUpdateWithoutSoftwareFavoritesInputSchema: z.ZodType<Prisma.UserUpdateWithoutSoftwareFavoritesInput> = z.object({
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  referralCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  invitedBy: z.union([ z.lazy(() => UserUpdateinvitedByInputSchema),z.string().array() ]).optional(),
  ranks: z.lazy(() => RankUpdateManyWithoutUserNestedInputSchema).optional(),
  platforms: z.lazy(() => UserPlatformUpdateManyWithoutUserNestedInputSchema).optional(),
  articles: z.lazy(() => ArticleUpdateManyWithoutAuthorNestedInputSchema).optional(),
  rankLikes: z.lazy(() => RankLikeUpdateManyWithoutUserNestedInputSchema).optional(),
  rankFavorites: z.lazy(() => RankFavoriteUpdateManyWithoutUserNestedInputSchema).optional(),
  softwareLikes: z.lazy(() => SoftwareLikeUpdateManyWithoutUserNestedInputSchema).optional(),
  rankComments: z.lazy(() => RankCommentUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutSoftwareFavoritesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSoftwareFavoritesInput> = z.object({
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  referralCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  invitedBy: z.union([ z.lazy(() => UserUpdateinvitedByInputSchema),z.string().array() ]).optional(),
  ranks: z.lazy(() => RankUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  platforms: z.lazy(() => UserPlatformUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  articles: z.lazy(() => ArticleUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  rankLikes: z.lazy(() => RankLikeUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  rankFavorites: z.lazy(() => RankFavoriteUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  softwareLikes: z.lazy(() => SoftwareLikeUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  rankComments: z.lazy(() => RankCommentUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const RankCreateWithoutCommentsInputSchema: z.ZodType<Prisma.RankCreateWithoutCommentsInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutRanksInputSchema),
  tags: z.lazy(() => RankTagCreateNestedManyWithoutRankInputSchema).optional(),
  softwares: z.lazy(() => SoftwareOnRankCreateNestedManyWithoutRankInputSchema).optional(),
  articles: z.lazy(() => ArticleCreateNestedManyWithoutRankInputSchema).optional(),
  likes: z.lazy(() => RankLikeCreateNestedManyWithoutRankInputSchema).optional(),
  favorites: z.lazy(() => RankFavoriteCreateNestedManyWithoutRankInputSchema).optional()
}).strict();

export const RankUncheckedCreateWithoutCommentsInputSchema: z.ZodType<Prisma.RankUncheckedCreateWithoutCommentsInput> = z.object({
  id: z.string().optional(),
  userAddress: z.string(),
  name: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tags: z.lazy(() => RankTagUncheckedCreateNestedManyWithoutRankInputSchema).optional(),
  softwares: z.lazy(() => SoftwareOnRankUncheckedCreateNestedManyWithoutRankInputSchema).optional(),
  articles: z.lazy(() => ArticleUncheckedCreateNestedManyWithoutRankInputSchema).optional(),
  likes: z.lazy(() => RankLikeUncheckedCreateNestedManyWithoutRankInputSchema).optional(),
  favorites: z.lazy(() => RankFavoriteUncheckedCreateNestedManyWithoutRankInputSchema).optional()
}).strict();

export const RankCreateOrConnectWithoutCommentsInputSchema: z.ZodType<Prisma.RankCreateOrConnectWithoutCommentsInput> = z.object({
  where: z.lazy(() => RankWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RankCreateWithoutCommentsInputSchema),z.lazy(() => RankUncheckedCreateWithoutCommentsInputSchema) ]),
}).strict();

export const UserCreateWithoutRankCommentsInputSchema: z.ZodType<Prisma.UserCreateWithoutRankCommentsInput> = z.object({
  address: z.string(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  referralCode: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  invitedBy: z.union([ z.lazy(() => UserCreateinvitedByInputSchema),z.string().array() ]).optional(),
  ranks: z.lazy(() => RankCreateNestedManyWithoutUserInputSchema).optional(),
  platforms: z.lazy(() => UserPlatformCreateNestedManyWithoutUserInputSchema).optional(),
  articles: z.lazy(() => ArticleCreateNestedManyWithoutAuthorInputSchema).optional(),
  rankLikes: z.lazy(() => RankLikeCreateNestedManyWithoutUserInputSchema).optional(),
  rankFavorites: z.lazy(() => RankFavoriteCreateNestedManyWithoutUserInputSchema).optional(),
  softwareLikes: z.lazy(() => SoftwareLikeCreateNestedManyWithoutUserInputSchema).optional(),
  softwareFavorites: z.lazy(() => SoftwareFavoriteCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutRankCommentsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutRankCommentsInput> = z.object({
  address: z.string(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  referralCode: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  invitedBy: z.union([ z.lazy(() => UserCreateinvitedByInputSchema),z.string().array() ]).optional(),
  ranks: z.lazy(() => RankUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  platforms: z.lazy(() => UserPlatformUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  articles: z.lazy(() => ArticleUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  rankLikes: z.lazy(() => RankLikeUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  rankFavorites: z.lazy(() => RankFavoriteUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  softwareLikes: z.lazy(() => SoftwareLikeUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  softwareFavorites: z.lazy(() => SoftwareFavoriteUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutRankCommentsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutRankCommentsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutRankCommentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutRankCommentsInputSchema) ]),
}).strict();

export const RankUpsertWithoutCommentsInputSchema: z.ZodType<Prisma.RankUpsertWithoutCommentsInput> = z.object({
  update: z.union([ z.lazy(() => RankUpdateWithoutCommentsInputSchema),z.lazy(() => RankUncheckedUpdateWithoutCommentsInputSchema) ]),
  create: z.union([ z.lazy(() => RankCreateWithoutCommentsInputSchema),z.lazy(() => RankUncheckedCreateWithoutCommentsInputSchema) ]),
  where: z.lazy(() => RankWhereInputSchema).optional()
}).strict();

export const RankUpdateToOneWithWhereWithoutCommentsInputSchema: z.ZodType<Prisma.RankUpdateToOneWithWhereWithoutCommentsInput> = z.object({
  where: z.lazy(() => RankWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => RankUpdateWithoutCommentsInputSchema),z.lazy(() => RankUncheckedUpdateWithoutCommentsInputSchema) ]),
}).strict();

export const RankUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.RankUpdateWithoutCommentsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutRanksNestedInputSchema).optional(),
  tags: z.lazy(() => RankTagUpdateManyWithoutRankNestedInputSchema).optional(),
  softwares: z.lazy(() => SoftwareOnRankUpdateManyWithoutRankNestedInputSchema).optional(),
  articles: z.lazy(() => ArticleUpdateManyWithoutRankNestedInputSchema).optional(),
  likes: z.lazy(() => RankLikeUpdateManyWithoutRankNestedInputSchema).optional(),
  favorites: z.lazy(() => RankFavoriteUpdateManyWithoutRankNestedInputSchema).optional()
}).strict();

export const RankUncheckedUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.RankUncheckedUpdateWithoutCommentsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userAddress: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.lazy(() => RankTagUncheckedUpdateManyWithoutRankNestedInputSchema).optional(),
  softwares: z.lazy(() => SoftwareOnRankUncheckedUpdateManyWithoutRankNestedInputSchema).optional(),
  articles: z.lazy(() => ArticleUncheckedUpdateManyWithoutRankNestedInputSchema).optional(),
  likes: z.lazy(() => RankLikeUncheckedUpdateManyWithoutRankNestedInputSchema).optional(),
  favorites: z.lazy(() => RankFavoriteUncheckedUpdateManyWithoutRankNestedInputSchema).optional()
}).strict();

export const UserUpsertWithoutRankCommentsInputSchema: z.ZodType<Prisma.UserUpsertWithoutRankCommentsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutRankCommentsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRankCommentsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutRankCommentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutRankCommentsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutRankCommentsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutRankCommentsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutRankCommentsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRankCommentsInputSchema) ]),
}).strict();

export const UserUpdateWithoutRankCommentsInputSchema: z.ZodType<Prisma.UserUpdateWithoutRankCommentsInput> = z.object({
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  referralCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  invitedBy: z.union([ z.lazy(() => UserUpdateinvitedByInputSchema),z.string().array() ]).optional(),
  ranks: z.lazy(() => RankUpdateManyWithoutUserNestedInputSchema).optional(),
  platforms: z.lazy(() => UserPlatformUpdateManyWithoutUserNestedInputSchema).optional(),
  articles: z.lazy(() => ArticleUpdateManyWithoutAuthorNestedInputSchema).optional(),
  rankLikes: z.lazy(() => RankLikeUpdateManyWithoutUserNestedInputSchema).optional(),
  rankFavorites: z.lazy(() => RankFavoriteUpdateManyWithoutUserNestedInputSchema).optional(),
  softwareLikes: z.lazy(() => SoftwareLikeUpdateManyWithoutUserNestedInputSchema).optional(),
  softwareFavorites: z.lazy(() => SoftwareFavoriteUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutRankCommentsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutRankCommentsInput> = z.object({
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  referralCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  invitedBy: z.union([ z.lazy(() => UserUpdateinvitedByInputSchema),z.string().array() ]).optional(),
  ranks: z.lazy(() => RankUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  platforms: z.lazy(() => UserPlatformUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  articles: z.lazy(() => ArticleUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  rankLikes: z.lazy(() => RankLikeUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  rankFavorites: z.lazy(() => RankFavoriteUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  softwareLikes: z.lazy(() => SoftwareLikeUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  softwareFavorites: z.lazy(() => SoftwareFavoriteUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const RankCreateManyUserInputSchema: z.ZodType<Prisma.RankCreateManyUserInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserPlatformCreateManyUserInputSchema: z.ZodType<Prisma.UserPlatformCreateManyUserInput> = z.object({
  id: z.string().optional(),
  platform: z.lazy(() => PlatformSchema).optional(),
  platformId: z.string(),
  platformName: z.string(),
  platformAvatar: z.string()
}).strict();

export const ArticleCreateManyAuthorInputSchema: z.ZodType<Prisma.ArticleCreateManyAuthorInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string(),
  image: z.string(),
  content: z.string(),
  rankId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const RankLikeCreateManyUserInputSchema: z.ZodType<Prisma.RankLikeCreateManyUserInput> = z.object({
  rankId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const RankFavoriteCreateManyUserInputSchema: z.ZodType<Prisma.RankFavoriteCreateManyUserInput> = z.object({
  rankId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const SoftwareLikeCreateManyUserInputSchema: z.ZodType<Prisma.SoftwareLikeCreateManyUserInput> = z.object({
  softwareId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const SoftwareFavoriteCreateManyUserInputSchema: z.ZodType<Prisma.SoftwareFavoriteCreateManyUserInput> = z.object({
  softwareId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const RankCommentCreateManyUserInputSchema: z.ZodType<Prisma.RankCommentCreateManyUserInput> = z.object({
  id: z.string().optional(),
  rankId: z.string(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  replyToComment: z.string().optional().nullable(),
  replyToUser: z.string().optional().nullable(),
  rootCommentId: z.string().optional().nullable()
}).strict();

export const RankUpdateWithoutUserInputSchema: z.ZodType<Prisma.RankUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.lazy(() => RankTagUpdateManyWithoutRankNestedInputSchema).optional(),
  softwares: z.lazy(() => SoftwareOnRankUpdateManyWithoutRankNestedInputSchema).optional(),
  articles: z.lazy(() => ArticleUpdateManyWithoutRankNestedInputSchema).optional(),
  likes: z.lazy(() => RankLikeUpdateManyWithoutRankNestedInputSchema).optional(),
  favorites: z.lazy(() => RankFavoriteUpdateManyWithoutRankNestedInputSchema).optional(),
  comments: z.lazy(() => RankCommentUpdateManyWithoutRankNestedInputSchema).optional()
}).strict();

export const RankUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.RankUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.lazy(() => RankTagUncheckedUpdateManyWithoutRankNestedInputSchema).optional(),
  softwares: z.lazy(() => SoftwareOnRankUncheckedUpdateManyWithoutRankNestedInputSchema).optional(),
  articles: z.lazy(() => ArticleUncheckedUpdateManyWithoutRankNestedInputSchema).optional(),
  likes: z.lazy(() => RankLikeUncheckedUpdateManyWithoutRankNestedInputSchema).optional(),
  favorites: z.lazy(() => RankFavoriteUncheckedUpdateManyWithoutRankNestedInputSchema).optional(),
  comments: z.lazy(() => RankCommentUncheckedUpdateManyWithoutRankNestedInputSchema).optional()
}).strict();

export const RankUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.RankUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserPlatformUpdateWithoutUserInputSchema: z.ZodType<Prisma.UserPlatformUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platform: z.union([ z.lazy(() => PlatformSchema),z.lazy(() => EnumPlatformFieldUpdateOperationsInputSchema) ]).optional(),
  platformId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformAvatar: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserPlatformUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.UserPlatformUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platform: z.union([ z.lazy(() => PlatformSchema),z.lazy(() => EnumPlatformFieldUpdateOperationsInputSchema) ]).optional(),
  platformId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformAvatar: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserPlatformUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.UserPlatformUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platform: z.union([ z.lazy(() => PlatformSchema),z.lazy(() => EnumPlatformFieldUpdateOperationsInputSchema) ]).optional(),
  platformId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformAvatar: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ArticleUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.ArticleUpdateWithoutAuthorInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  rank: z.lazy(() => RankUpdateOneRequiredWithoutArticlesNestedInputSchema).optional(),
  softwares: z.lazy(() => SoftwareOnArticleUpdateManyWithoutArticleNestedInputSchema).optional()
}).strict();

export const ArticleUncheckedUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.ArticleUncheckedUpdateWithoutAuthorInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rankId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  softwares: z.lazy(() => SoftwareOnArticleUncheckedUpdateManyWithoutArticleNestedInputSchema).optional()
}).strict();

export const ArticleUncheckedUpdateManyWithoutAuthorInputSchema: z.ZodType<Prisma.ArticleUncheckedUpdateManyWithoutAuthorInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rankId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RankLikeUpdateWithoutUserInputSchema: z.ZodType<Prisma.RankLikeUpdateWithoutUserInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  rank: z.lazy(() => RankUpdateOneRequiredWithoutLikesNestedInputSchema).optional()
}).strict();

export const RankLikeUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.RankLikeUncheckedUpdateWithoutUserInput> = z.object({
  rankId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RankLikeUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.RankLikeUncheckedUpdateManyWithoutUserInput> = z.object({
  rankId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RankFavoriteUpdateWithoutUserInputSchema: z.ZodType<Prisma.RankFavoriteUpdateWithoutUserInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  rank: z.lazy(() => RankUpdateOneRequiredWithoutFavoritesNestedInputSchema).optional()
}).strict();

export const RankFavoriteUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.RankFavoriteUncheckedUpdateWithoutUserInput> = z.object({
  rankId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RankFavoriteUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.RankFavoriteUncheckedUpdateManyWithoutUserInput> = z.object({
  rankId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SoftwareLikeUpdateWithoutUserInputSchema: z.ZodType<Prisma.SoftwareLikeUpdateWithoutUserInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  software: z.lazy(() => SoftwareUpdateOneRequiredWithoutLikesNestedInputSchema).optional()
}).strict();

export const SoftwareLikeUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.SoftwareLikeUncheckedUpdateWithoutUserInput> = z.object({
  softwareId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SoftwareLikeUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.SoftwareLikeUncheckedUpdateManyWithoutUserInput> = z.object({
  softwareId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SoftwareFavoriteUpdateWithoutUserInputSchema: z.ZodType<Prisma.SoftwareFavoriteUpdateWithoutUserInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  software: z.lazy(() => SoftwareUpdateOneRequiredWithoutFavoritesNestedInputSchema).optional()
}).strict();

export const SoftwareFavoriteUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.SoftwareFavoriteUncheckedUpdateWithoutUserInput> = z.object({
  softwareId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SoftwareFavoriteUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.SoftwareFavoriteUncheckedUpdateManyWithoutUserInput> = z.object({
  softwareId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RankCommentUpdateWithoutUserInputSchema: z.ZodType<Prisma.RankCommentUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  replyToComment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  replyToUser: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rootCommentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rank: z.lazy(() => RankUpdateOneRequiredWithoutCommentsNestedInputSchema).optional()
}).strict();

export const RankCommentUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.RankCommentUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rankId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  replyToComment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  replyToUser: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rootCommentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const RankCommentUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.RankCommentUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rankId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  replyToComment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  replyToUser: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rootCommentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const RankTagCreateManyTagInputSchema: z.ZodType<Prisma.RankTagCreateManyTagInput> = z.object({
  rankId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SoftwareTagCreateManyTagInputSchema: z.ZodType<Prisma.SoftwareTagCreateManyTagInput> = z.object({
  softwareId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const RankTagUpdateWithoutTagInputSchema: z.ZodType<Prisma.RankTagUpdateWithoutTagInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  rank: z.lazy(() => RankUpdateOneRequiredWithoutTagsNestedInputSchema).optional()
}).strict();

export const RankTagUncheckedUpdateWithoutTagInputSchema: z.ZodType<Prisma.RankTagUncheckedUpdateWithoutTagInput> = z.object({
  rankId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RankTagUncheckedUpdateManyWithoutTagInputSchema: z.ZodType<Prisma.RankTagUncheckedUpdateManyWithoutTagInput> = z.object({
  rankId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SoftwareTagUpdateWithoutTagInputSchema: z.ZodType<Prisma.SoftwareTagUpdateWithoutTagInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  software: z.lazy(() => SoftwareUpdateOneRequiredWithoutTagsNestedInputSchema).optional()
}).strict();

export const SoftwareTagUncheckedUpdateWithoutTagInputSchema: z.ZodType<Prisma.SoftwareTagUncheckedUpdateWithoutTagInput> = z.object({
  softwareId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SoftwareTagUncheckedUpdateManyWithoutTagInputSchema: z.ZodType<Prisma.SoftwareTagUncheckedUpdateManyWithoutTagInput> = z.object({
  softwareId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RankTagCreateManyRankInputSchema: z.ZodType<Prisma.RankTagCreateManyRankInput> = z.object({
  tagId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SoftwareOnRankCreateManyRankInputSchema: z.ZodType<Prisma.SoftwareOnRankCreateManyRankInput> = z.object({
  softwareId: z.string(),
  description: z.string(),
  rankIndex: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ArticleCreateManyRankInputSchema: z.ZodType<Prisma.ArticleCreateManyRankInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string(),
  image: z.string(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userAddress: z.string()
}).strict();

export const RankLikeCreateManyRankInputSchema: z.ZodType<Prisma.RankLikeCreateManyRankInput> = z.object({
  userAddress: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const RankFavoriteCreateManyRankInputSchema: z.ZodType<Prisma.RankFavoriteCreateManyRankInput> = z.object({
  userAddress: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const RankCommentCreateManyRankInputSchema: z.ZodType<Prisma.RankCommentCreateManyRankInput> = z.object({
  id: z.string().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  userAddress: z.string(),
  deletedAt: z.coerce.date().optional().nullable(),
  replyToComment: z.string().optional().nullable(),
  replyToUser: z.string().optional().nullable(),
  rootCommentId: z.string().optional().nullable()
}).strict();

export const RankTagUpdateWithoutRankInputSchema: z.ZodType<Prisma.RankTagUpdateWithoutRankInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tag: z.lazy(() => TagUpdateOneRequiredWithoutRanksNestedInputSchema).optional()
}).strict();

export const RankTagUncheckedUpdateWithoutRankInputSchema: z.ZodType<Prisma.RankTagUncheckedUpdateWithoutRankInput> = z.object({
  tagId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RankTagUncheckedUpdateManyWithoutRankInputSchema: z.ZodType<Prisma.RankTagUncheckedUpdateManyWithoutRankInput> = z.object({
  tagId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SoftwareOnRankUpdateWithoutRankInputSchema: z.ZodType<Prisma.SoftwareOnRankUpdateWithoutRankInput> = z.object({
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rankIndex: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  software: z.lazy(() => SoftwareUpdateOneRequiredWithoutRanksNestedInputSchema).optional()
}).strict();

export const SoftwareOnRankUncheckedUpdateWithoutRankInputSchema: z.ZodType<Prisma.SoftwareOnRankUncheckedUpdateWithoutRankInput> = z.object({
  softwareId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rankIndex: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SoftwareOnRankUncheckedUpdateManyWithoutRankInputSchema: z.ZodType<Prisma.SoftwareOnRankUncheckedUpdateManyWithoutRankInput> = z.object({
  softwareId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rankIndex: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ArticleUpdateWithoutRankInputSchema: z.ZodType<Prisma.ArticleUpdateWithoutRankInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  author: z.lazy(() => UserUpdateOneRequiredWithoutArticlesNestedInputSchema).optional(),
  softwares: z.lazy(() => SoftwareOnArticleUpdateManyWithoutArticleNestedInputSchema).optional()
}).strict();

export const ArticleUncheckedUpdateWithoutRankInputSchema: z.ZodType<Prisma.ArticleUncheckedUpdateWithoutRankInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userAddress: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  softwares: z.lazy(() => SoftwareOnArticleUncheckedUpdateManyWithoutArticleNestedInputSchema).optional()
}).strict();

export const ArticleUncheckedUpdateManyWithoutRankInputSchema: z.ZodType<Prisma.ArticleUncheckedUpdateManyWithoutRankInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userAddress: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RankLikeUpdateWithoutRankInputSchema: z.ZodType<Prisma.RankLikeUpdateWithoutRankInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutRankLikesNestedInputSchema).optional()
}).strict();

export const RankLikeUncheckedUpdateWithoutRankInputSchema: z.ZodType<Prisma.RankLikeUncheckedUpdateWithoutRankInput> = z.object({
  userAddress: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RankLikeUncheckedUpdateManyWithoutRankInputSchema: z.ZodType<Prisma.RankLikeUncheckedUpdateManyWithoutRankInput> = z.object({
  userAddress: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RankFavoriteUpdateWithoutRankInputSchema: z.ZodType<Prisma.RankFavoriteUpdateWithoutRankInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutRankFavoritesNestedInputSchema).optional()
}).strict();

export const RankFavoriteUncheckedUpdateWithoutRankInputSchema: z.ZodType<Prisma.RankFavoriteUncheckedUpdateWithoutRankInput> = z.object({
  userAddress: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RankFavoriteUncheckedUpdateManyWithoutRankInputSchema: z.ZodType<Prisma.RankFavoriteUncheckedUpdateManyWithoutRankInput> = z.object({
  userAddress: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RankCommentUpdateWithoutRankInputSchema: z.ZodType<Prisma.RankCommentUpdateWithoutRankInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  replyToComment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  replyToUser: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rootCommentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutRankCommentsNestedInputSchema).optional()
}).strict();

export const RankCommentUncheckedUpdateWithoutRankInputSchema: z.ZodType<Prisma.RankCommentUncheckedUpdateWithoutRankInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userAddress: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  replyToComment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  replyToUser: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rootCommentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const RankCommentUncheckedUpdateManyWithoutRankInputSchema: z.ZodType<Prisma.RankCommentUncheckedUpdateManyWithoutRankInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userAddress: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  replyToComment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  replyToUser: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rootCommentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SoftwareTagCreateManySoftwareInputSchema: z.ZodType<Prisma.SoftwareTagCreateManySoftwareInput> = z.object({
  tagId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SoftwareOnRankCreateManySoftwareInputSchema: z.ZodType<Prisma.SoftwareOnRankCreateManySoftwareInput> = z.object({
  description: z.string(),
  rankId: z.string(),
  rankIndex: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SoftwareLikeCreateManySoftwareInputSchema: z.ZodType<Prisma.SoftwareLikeCreateManySoftwareInput> = z.object({
  userAddress: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const SoftwareFavoriteCreateManySoftwareInputSchema: z.ZodType<Prisma.SoftwareFavoriteCreateManySoftwareInput> = z.object({
  userAddress: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const SoftwareOnArticleCreateManySoftwareInputSchema: z.ZodType<Prisma.SoftwareOnArticleCreateManySoftwareInput> = z.object({
  articleId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SoftwareTagUpdateWithoutSoftwareInputSchema: z.ZodType<Prisma.SoftwareTagUpdateWithoutSoftwareInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tag: z.lazy(() => TagUpdateOneRequiredWithoutSoftwaresNestedInputSchema).optional()
}).strict();

export const SoftwareTagUncheckedUpdateWithoutSoftwareInputSchema: z.ZodType<Prisma.SoftwareTagUncheckedUpdateWithoutSoftwareInput> = z.object({
  tagId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SoftwareTagUncheckedUpdateManyWithoutSoftwareInputSchema: z.ZodType<Prisma.SoftwareTagUncheckedUpdateManyWithoutSoftwareInput> = z.object({
  tagId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SoftwareOnRankUpdateWithoutSoftwareInputSchema: z.ZodType<Prisma.SoftwareOnRankUpdateWithoutSoftwareInput> = z.object({
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rankIndex: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  rank: z.lazy(() => RankUpdateOneRequiredWithoutSoftwaresNestedInputSchema).optional()
}).strict();

export const SoftwareOnRankUncheckedUpdateWithoutSoftwareInputSchema: z.ZodType<Prisma.SoftwareOnRankUncheckedUpdateWithoutSoftwareInput> = z.object({
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rankId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rankIndex: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SoftwareOnRankUncheckedUpdateManyWithoutSoftwareInputSchema: z.ZodType<Prisma.SoftwareOnRankUncheckedUpdateManyWithoutSoftwareInput> = z.object({
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rankId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rankIndex: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SoftwareLikeUpdateWithoutSoftwareInputSchema: z.ZodType<Prisma.SoftwareLikeUpdateWithoutSoftwareInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSoftwareLikesNestedInputSchema).optional()
}).strict();

export const SoftwareLikeUncheckedUpdateWithoutSoftwareInputSchema: z.ZodType<Prisma.SoftwareLikeUncheckedUpdateWithoutSoftwareInput> = z.object({
  userAddress: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SoftwareLikeUncheckedUpdateManyWithoutSoftwareInputSchema: z.ZodType<Prisma.SoftwareLikeUncheckedUpdateManyWithoutSoftwareInput> = z.object({
  userAddress: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SoftwareFavoriteUpdateWithoutSoftwareInputSchema: z.ZodType<Prisma.SoftwareFavoriteUpdateWithoutSoftwareInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSoftwareFavoritesNestedInputSchema).optional()
}).strict();

export const SoftwareFavoriteUncheckedUpdateWithoutSoftwareInputSchema: z.ZodType<Prisma.SoftwareFavoriteUncheckedUpdateWithoutSoftwareInput> = z.object({
  userAddress: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SoftwareFavoriteUncheckedUpdateManyWithoutSoftwareInputSchema: z.ZodType<Prisma.SoftwareFavoriteUncheckedUpdateManyWithoutSoftwareInput> = z.object({
  userAddress: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SoftwareOnArticleUpdateWithoutSoftwareInputSchema: z.ZodType<Prisma.SoftwareOnArticleUpdateWithoutSoftwareInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  article: z.lazy(() => ArticleUpdateOneRequiredWithoutSoftwaresNestedInputSchema).optional()
}).strict();

export const SoftwareOnArticleUncheckedUpdateWithoutSoftwareInputSchema: z.ZodType<Prisma.SoftwareOnArticleUncheckedUpdateWithoutSoftwareInput> = z.object({
  articleId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SoftwareOnArticleUncheckedUpdateManyWithoutSoftwareInputSchema: z.ZodType<Prisma.SoftwareOnArticleUncheckedUpdateManyWithoutSoftwareInput> = z.object({
  articleId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SoftwareOnArticleCreateManyArticleInputSchema: z.ZodType<Prisma.SoftwareOnArticleCreateManyArticleInput> = z.object({
  softwareId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SoftwareOnArticleUpdateWithoutArticleInputSchema: z.ZodType<Prisma.SoftwareOnArticleUpdateWithoutArticleInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  software: z.lazy(() => SoftwareUpdateOneRequiredWithoutArticlesNestedInputSchema).optional()
}).strict();

export const SoftwareOnArticleUncheckedUpdateWithoutArticleInputSchema: z.ZodType<Prisma.SoftwareOnArticleUncheckedUpdateWithoutArticleInput> = z.object({
  softwareId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SoftwareOnArticleUncheckedUpdateManyWithoutArticleInputSchema: z.ZodType<Prisma.SoftwareOnArticleUncheckedUpdateManyWithoutArticleInput> = z.object({
  softwareId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserPlatformFindFirstArgsSchema: z.ZodType<Prisma.UserPlatformFindFirstArgs> = z.object({
  select: UserPlatformSelectSchema.optional(),
  include: UserPlatformIncludeSchema.optional(),
  where: UserPlatformWhereInputSchema.optional(),
  orderBy: z.union([ UserPlatformOrderByWithRelationInputSchema.array(),UserPlatformOrderByWithRelationInputSchema ]).optional(),
  cursor: UserPlatformWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserPlatformScalarFieldEnumSchema,UserPlatformScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserPlatformFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserPlatformFindFirstOrThrowArgs> = z.object({
  select: UserPlatformSelectSchema.optional(),
  include: UserPlatformIncludeSchema.optional(),
  where: UserPlatformWhereInputSchema.optional(),
  orderBy: z.union([ UserPlatformOrderByWithRelationInputSchema.array(),UserPlatformOrderByWithRelationInputSchema ]).optional(),
  cursor: UserPlatformWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserPlatformScalarFieldEnumSchema,UserPlatformScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserPlatformFindManyArgsSchema: z.ZodType<Prisma.UserPlatformFindManyArgs> = z.object({
  select: UserPlatformSelectSchema.optional(),
  include: UserPlatformIncludeSchema.optional(),
  where: UserPlatformWhereInputSchema.optional(),
  orderBy: z.union([ UserPlatformOrderByWithRelationInputSchema.array(),UserPlatformOrderByWithRelationInputSchema ]).optional(),
  cursor: UserPlatformWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserPlatformScalarFieldEnumSchema,UserPlatformScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserPlatformAggregateArgsSchema: z.ZodType<Prisma.UserPlatformAggregateArgs> = z.object({
  where: UserPlatformWhereInputSchema.optional(),
  orderBy: z.union([ UserPlatformOrderByWithRelationInputSchema.array(),UserPlatformOrderByWithRelationInputSchema ]).optional(),
  cursor: UserPlatformWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserPlatformGroupByArgsSchema: z.ZodType<Prisma.UserPlatformGroupByArgs> = z.object({
  where: UserPlatformWhereInputSchema.optional(),
  orderBy: z.union([ UserPlatformOrderByWithAggregationInputSchema.array(),UserPlatformOrderByWithAggregationInputSchema ]).optional(),
  by: UserPlatformScalarFieldEnumSchema.array(),
  having: UserPlatformScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserPlatformFindUniqueArgsSchema: z.ZodType<Prisma.UserPlatformFindUniqueArgs> = z.object({
  select: UserPlatformSelectSchema.optional(),
  include: UserPlatformIncludeSchema.optional(),
  where: UserPlatformWhereUniqueInputSchema,
}).strict() ;

export const UserPlatformFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserPlatformFindUniqueOrThrowArgs> = z.object({
  select: UserPlatformSelectSchema.optional(),
  include: UserPlatformIncludeSchema.optional(),
  where: UserPlatformWhereUniqueInputSchema,
}).strict() ;

export const ApiKeyFindFirstArgsSchema: z.ZodType<Prisma.ApiKeyFindFirstArgs> = z.object({
  select: ApiKeySelectSchema.optional(),
  where: ApiKeyWhereInputSchema.optional(),
  orderBy: z.union([ ApiKeyOrderByWithRelationInputSchema.array(),ApiKeyOrderByWithRelationInputSchema ]).optional(),
  cursor: ApiKeyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ApiKeyScalarFieldEnumSchema,ApiKeyScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ApiKeyFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ApiKeyFindFirstOrThrowArgs> = z.object({
  select: ApiKeySelectSchema.optional(),
  where: ApiKeyWhereInputSchema.optional(),
  orderBy: z.union([ ApiKeyOrderByWithRelationInputSchema.array(),ApiKeyOrderByWithRelationInputSchema ]).optional(),
  cursor: ApiKeyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ApiKeyScalarFieldEnumSchema,ApiKeyScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ApiKeyFindManyArgsSchema: z.ZodType<Prisma.ApiKeyFindManyArgs> = z.object({
  select: ApiKeySelectSchema.optional(),
  where: ApiKeyWhereInputSchema.optional(),
  orderBy: z.union([ ApiKeyOrderByWithRelationInputSchema.array(),ApiKeyOrderByWithRelationInputSchema ]).optional(),
  cursor: ApiKeyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ApiKeyScalarFieldEnumSchema,ApiKeyScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ApiKeyAggregateArgsSchema: z.ZodType<Prisma.ApiKeyAggregateArgs> = z.object({
  where: ApiKeyWhereInputSchema.optional(),
  orderBy: z.union([ ApiKeyOrderByWithRelationInputSchema.array(),ApiKeyOrderByWithRelationInputSchema ]).optional(),
  cursor: ApiKeyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ApiKeyGroupByArgsSchema: z.ZodType<Prisma.ApiKeyGroupByArgs> = z.object({
  where: ApiKeyWhereInputSchema.optional(),
  orderBy: z.union([ ApiKeyOrderByWithAggregationInputSchema.array(),ApiKeyOrderByWithAggregationInputSchema ]).optional(),
  by: ApiKeyScalarFieldEnumSchema.array(),
  having: ApiKeyScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ApiKeyFindUniqueArgsSchema: z.ZodType<Prisma.ApiKeyFindUniqueArgs> = z.object({
  select: ApiKeySelectSchema.optional(),
  where: ApiKeyWhereUniqueInputSchema,
}).strict() ;

export const ApiKeyFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ApiKeyFindUniqueOrThrowArgs> = z.object({
  select: ApiKeySelectSchema.optional(),
  where: ApiKeyWhereUniqueInputSchema,
}).strict() ;

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const TagFindFirstArgsSchema: z.ZodType<Prisma.TagFindFirstArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereInputSchema.optional(),
  orderBy: z.union([ TagOrderByWithRelationInputSchema.array(),TagOrderByWithRelationInputSchema ]).optional(),
  cursor: TagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TagScalarFieldEnumSchema,TagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TagFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TagFindFirstOrThrowArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereInputSchema.optional(),
  orderBy: z.union([ TagOrderByWithRelationInputSchema.array(),TagOrderByWithRelationInputSchema ]).optional(),
  cursor: TagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TagScalarFieldEnumSchema,TagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TagFindManyArgsSchema: z.ZodType<Prisma.TagFindManyArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereInputSchema.optional(),
  orderBy: z.union([ TagOrderByWithRelationInputSchema.array(),TagOrderByWithRelationInputSchema ]).optional(),
  cursor: TagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TagScalarFieldEnumSchema,TagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TagAggregateArgsSchema: z.ZodType<Prisma.TagAggregateArgs> = z.object({
  where: TagWhereInputSchema.optional(),
  orderBy: z.union([ TagOrderByWithRelationInputSchema.array(),TagOrderByWithRelationInputSchema ]).optional(),
  cursor: TagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TagGroupByArgsSchema: z.ZodType<Prisma.TagGroupByArgs> = z.object({
  where: TagWhereInputSchema.optional(),
  orderBy: z.union([ TagOrderByWithAggregationInputSchema.array(),TagOrderByWithAggregationInputSchema ]).optional(),
  by: TagScalarFieldEnumSchema.array(),
  having: TagScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TagFindUniqueArgsSchema: z.ZodType<Prisma.TagFindUniqueArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereUniqueInputSchema,
}).strict() ;

export const TagFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TagFindUniqueOrThrowArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereUniqueInputSchema,
}).strict() ;

export const RankFindFirstArgsSchema: z.ZodType<Prisma.RankFindFirstArgs> = z.object({
  select: RankSelectSchema.optional(),
  include: RankIncludeSchema.optional(),
  where: RankWhereInputSchema.optional(),
  orderBy: z.union([ RankOrderByWithRelationInputSchema.array(),RankOrderByWithRelationInputSchema ]).optional(),
  cursor: RankWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RankScalarFieldEnumSchema,RankScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RankFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RankFindFirstOrThrowArgs> = z.object({
  select: RankSelectSchema.optional(),
  include: RankIncludeSchema.optional(),
  where: RankWhereInputSchema.optional(),
  orderBy: z.union([ RankOrderByWithRelationInputSchema.array(),RankOrderByWithRelationInputSchema ]).optional(),
  cursor: RankWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RankScalarFieldEnumSchema,RankScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RankFindManyArgsSchema: z.ZodType<Prisma.RankFindManyArgs> = z.object({
  select: RankSelectSchema.optional(),
  include: RankIncludeSchema.optional(),
  where: RankWhereInputSchema.optional(),
  orderBy: z.union([ RankOrderByWithRelationInputSchema.array(),RankOrderByWithRelationInputSchema ]).optional(),
  cursor: RankWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RankScalarFieldEnumSchema,RankScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RankAggregateArgsSchema: z.ZodType<Prisma.RankAggregateArgs> = z.object({
  where: RankWhereInputSchema.optional(),
  orderBy: z.union([ RankOrderByWithRelationInputSchema.array(),RankOrderByWithRelationInputSchema ]).optional(),
  cursor: RankWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RankGroupByArgsSchema: z.ZodType<Prisma.RankGroupByArgs> = z.object({
  where: RankWhereInputSchema.optional(),
  orderBy: z.union([ RankOrderByWithAggregationInputSchema.array(),RankOrderByWithAggregationInputSchema ]).optional(),
  by: RankScalarFieldEnumSchema.array(),
  having: RankScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RankFindUniqueArgsSchema: z.ZodType<Prisma.RankFindUniqueArgs> = z.object({
  select: RankSelectSchema.optional(),
  include: RankIncludeSchema.optional(),
  where: RankWhereUniqueInputSchema,
}).strict() ;

export const RankFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RankFindUniqueOrThrowArgs> = z.object({
  select: RankSelectSchema.optional(),
  include: RankIncludeSchema.optional(),
  where: RankWhereUniqueInputSchema,
}).strict() ;

export const RankTagFindFirstArgsSchema: z.ZodType<Prisma.RankTagFindFirstArgs> = z.object({
  select: RankTagSelectSchema.optional(),
  include: RankTagIncludeSchema.optional(),
  where: RankTagWhereInputSchema.optional(),
  orderBy: z.union([ RankTagOrderByWithRelationInputSchema.array(),RankTagOrderByWithRelationInputSchema ]).optional(),
  cursor: RankTagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RankTagScalarFieldEnumSchema,RankTagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RankTagFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RankTagFindFirstOrThrowArgs> = z.object({
  select: RankTagSelectSchema.optional(),
  include: RankTagIncludeSchema.optional(),
  where: RankTagWhereInputSchema.optional(),
  orderBy: z.union([ RankTagOrderByWithRelationInputSchema.array(),RankTagOrderByWithRelationInputSchema ]).optional(),
  cursor: RankTagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RankTagScalarFieldEnumSchema,RankTagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RankTagFindManyArgsSchema: z.ZodType<Prisma.RankTagFindManyArgs> = z.object({
  select: RankTagSelectSchema.optional(),
  include: RankTagIncludeSchema.optional(),
  where: RankTagWhereInputSchema.optional(),
  orderBy: z.union([ RankTagOrderByWithRelationInputSchema.array(),RankTagOrderByWithRelationInputSchema ]).optional(),
  cursor: RankTagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RankTagScalarFieldEnumSchema,RankTagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RankTagAggregateArgsSchema: z.ZodType<Prisma.RankTagAggregateArgs> = z.object({
  where: RankTagWhereInputSchema.optional(),
  orderBy: z.union([ RankTagOrderByWithRelationInputSchema.array(),RankTagOrderByWithRelationInputSchema ]).optional(),
  cursor: RankTagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RankTagGroupByArgsSchema: z.ZodType<Prisma.RankTagGroupByArgs> = z.object({
  where: RankTagWhereInputSchema.optional(),
  orderBy: z.union([ RankTagOrderByWithAggregationInputSchema.array(),RankTagOrderByWithAggregationInputSchema ]).optional(),
  by: RankTagScalarFieldEnumSchema.array(),
  having: RankTagScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RankTagFindUniqueArgsSchema: z.ZodType<Prisma.RankTagFindUniqueArgs> = z.object({
  select: RankTagSelectSchema.optional(),
  include: RankTagIncludeSchema.optional(),
  where: RankTagWhereUniqueInputSchema,
}).strict() ;

export const RankTagFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RankTagFindUniqueOrThrowArgs> = z.object({
  select: RankTagSelectSchema.optional(),
  include: RankTagIncludeSchema.optional(),
  where: RankTagWhereUniqueInputSchema,
}).strict() ;

export const SoftwareFindFirstArgsSchema: z.ZodType<Prisma.SoftwareFindFirstArgs> = z.object({
  select: SoftwareSelectSchema.optional(),
  include: SoftwareIncludeSchema.optional(),
  where: SoftwareWhereInputSchema.optional(),
  orderBy: z.union([ SoftwareOrderByWithRelationInputSchema.array(),SoftwareOrderByWithRelationInputSchema ]).optional(),
  cursor: SoftwareWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SoftwareScalarFieldEnumSchema,SoftwareScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SoftwareFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SoftwareFindFirstOrThrowArgs> = z.object({
  select: SoftwareSelectSchema.optional(),
  include: SoftwareIncludeSchema.optional(),
  where: SoftwareWhereInputSchema.optional(),
  orderBy: z.union([ SoftwareOrderByWithRelationInputSchema.array(),SoftwareOrderByWithRelationInputSchema ]).optional(),
  cursor: SoftwareWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SoftwareScalarFieldEnumSchema,SoftwareScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SoftwareFindManyArgsSchema: z.ZodType<Prisma.SoftwareFindManyArgs> = z.object({
  select: SoftwareSelectSchema.optional(),
  include: SoftwareIncludeSchema.optional(),
  where: SoftwareWhereInputSchema.optional(),
  orderBy: z.union([ SoftwareOrderByWithRelationInputSchema.array(),SoftwareOrderByWithRelationInputSchema ]).optional(),
  cursor: SoftwareWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SoftwareScalarFieldEnumSchema,SoftwareScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SoftwareAggregateArgsSchema: z.ZodType<Prisma.SoftwareAggregateArgs> = z.object({
  where: SoftwareWhereInputSchema.optional(),
  orderBy: z.union([ SoftwareOrderByWithRelationInputSchema.array(),SoftwareOrderByWithRelationInputSchema ]).optional(),
  cursor: SoftwareWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SoftwareGroupByArgsSchema: z.ZodType<Prisma.SoftwareGroupByArgs> = z.object({
  where: SoftwareWhereInputSchema.optional(),
  orderBy: z.union([ SoftwareOrderByWithAggregationInputSchema.array(),SoftwareOrderByWithAggregationInputSchema ]).optional(),
  by: SoftwareScalarFieldEnumSchema.array(),
  having: SoftwareScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SoftwareFindUniqueArgsSchema: z.ZodType<Prisma.SoftwareFindUniqueArgs> = z.object({
  select: SoftwareSelectSchema.optional(),
  include: SoftwareIncludeSchema.optional(),
  where: SoftwareWhereUniqueInputSchema,
}).strict() ;

export const SoftwareFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SoftwareFindUniqueOrThrowArgs> = z.object({
  select: SoftwareSelectSchema.optional(),
  include: SoftwareIncludeSchema.optional(),
  where: SoftwareWhereUniqueInputSchema,
}).strict() ;

export const SoftwareTagFindFirstArgsSchema: z.ZodType<Prisma.SoftwareTagFindFirstArgs> = z.object({
  select: SoftwareTagSelectSchema.optional(),
  include: SoftwareTagIncludeSchema.optional(),
  where: SoftwareTagWhereInputSchema.optional(),
  orderBy: z.union([ SoftwareTagOrderByWithRelationInputSchema.array(),SoftwareTagOrderByWithRelationInputSchema ]).optional(),
  cursor: SoftwareTagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SoftwareTagScalarFieldEnumSchema,SoftwareTagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SoftwareTagFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SoftwareTagFindFirstOrThrowArgs> = z.object({
  select: SoftwareTagSelectSchema.optional(),
  include: SoftwareTagIncludeSchema.optional(),
  where: SoftwareTagWhereInputSchema.optional(),
  orderBy: z.union([ SoftwareTagOrderByWithRelationInputSchema.array(),SoftwareTagOrderByWithRelationInputSchema ]).optional(),
  cursor: SoftwareTagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SoftwareTagScalarFieldEnumSchema,SoftwareTagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SoftwareTagFindManyArgsSchema: z.ZodType<Prisma.SoftwareTagFindManyArgs> = z.object({
  select: SoftwareTagSelectSchema.optional(),
  include: SoftwareTagIncludeSchema.optional(),
  where: SoftwareTagWhereInputSchema.optional(),
  orderBy: z.union([ SoftwareTagOrderByWithRelationInputSchema.array(),SoftwareTagOrderByWithRelationInputSchema ]).optional(),
  cursor: SoftwareTagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SoftwareTagScalarFieldEnumSchema,SoftwareTagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SoftwareTagAggregateArgsSchema: z.ZodType<Prisma.SoftwareTagAggregateArgs> = z.object({
  where: SoftwareTagWhereInputSchema.optional(),
  orderBy: z.union([ SoftwareTagOrderByWithRelationInputSchema.array(),SoftwareTagOrderByWithRelationInputSchema ]).optional(),
  cursor: SoftwareTagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SoftwareTagGroupByArgsSchema: z.ZodType<Prisma.SoftwareTagGroupByArgs> = z.object({
  where: SoftwareTagWhereInputSchema.optional(),
  orderBy: z.union([ SoftwareTagOrderByWithAggregationInputSchema.array(),SoftwareTagOrderByWithAggregationInputSchema ]).optional(),
  by: SoftwareTagScalarFieldEnumSchema.array(),
  having: SoftwareTagScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SoftwareTagFindUniqueArgsSchema: z.ZodType<Prisma.SoftwareTagFindUniqueArgs> = z.object({
  select: SoftwareTagSelectSchema.optional(),
  include: SoftwareTagIncludeSchema.optional(),
  where: SoftwareTagWhereUniqueInputSchema,
}).strict() ;

export const SoftwareTagFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SoftwareTagFindUniqueOrThrowArgs> = z.object({
  select: SoftwareTagSelectSchema.optional(),
  include: SoftwareTagIncludeSchema.optional(),
  where: SoftwareTagWhereUniqueInputSchema,
}).strict() ;

export const SoftwareOnRankFindFirstArgsSchema: z.ZodType<Prisma.SoftwareOnRankFindFirstArgs> = z.object({
  select: SoftwareOnRankSelectSchema.optional(),
  include: SoftwareOnRankIncludeSchema.optional(),
  where: SoftwareOnRankWhereInputSchema.optional(),
  orderBy: z.union([ SoftwareOnRankOrderByWithRelationInputSchema.array(),SoftwareOnRankOrderByWithRelationInputSchema ]).optional(),
  cursor: SoftwareOnRankWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SoftwareOnRankScalarFieldEnumSchema,SoftwareOnRankScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SoftwareOnRankFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SoftwareOnRankFindFirstOrThrowArgs> = z.object({
  select: SoftwareOnRankSelectSchema.optional(),
  include: SoftwareOnRankIncludeSchema.optional(),
  where: SoftwareOnRankWhereInputSchema.optional(),
  orderBy: z.union([ SoftwareOnRankOrderByWithRelationInputSchema.array(),SoftwareOnRankOrderByWithRelationInputSchema ]).optional(),
  cursor: SoftwareOnRankWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SoftwareOnRankScalarFieldEnumSchema,SoftwareOnRankScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SoftwareOnRankFindManyArgsSchema: z.ZodType<Prisma.SoftwareOnRankFindManyArgs> = z.object({
  select: SoftwareOnRankSelectSchema.optional(),
  include: SoftwareOnRankIncludeSchema.optional(),
  where: SoftwareOnRankWhereInputSchema.optional(),
  orderBy: z.union([ SoftwareOnRankOrderByWithRelationInputSchema.array(),SoftwareOnRankOrderByWithRelationInputSchema ]).optional(),
  cursor: SoftwareOnRankWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SoftwareOnRankScalarFieldEnumSchema,SoftwareOnRankScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SoftwareOnRankAggregateArgsSchema: z.ZodType<Prisma.SoftwareOnRankAggregateArgs> = z.object({
  where: SoftwareOnRankWhereInputSchema.optional(),
  orderBy: z.union([ SoftwareOnRankOrderByWithRelationInputSchema.array(),SoftwareOnRankOrderByWithRelationInputSchema ]).optional(),
  cursor: SoftwareOnRankWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SoftwareOnRankGroupByArgsSchema: z.ZodType<Prisma.SoftwareOnRankGroupByArgs> = z.object({
  where: SoftwareOnRankWhereInputSchema.optional(),
  orderBy: z.union([ SoftwareOnRankOrderByWithAggregationInputSchema.array(),SoftwareOnRankOrderByWithAggregationInputSchema ]).optional(),
  by: SoftwareOnRankScalarFieldEnumSchema.array(),
  having: SoftwareOnRankScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SoftwareOnRankFindUniqueArgsSchema: z.ZodType<Prisma.SoftwareOnRankFindUniqueArgs> = z.object({
  select: SoftwareOnRankSelectSchema.optional(),
  include: SoftwareOnRankIncludeSchema.optional(),
  where: SoftwareOnRankWhereUniqueInputSchema,
}).strict() ;

export const SoftwareOnRankFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SoftwareOnRankFindUniqueOrThrowArgs> = z.object({
  select: SoftwareOnRankSelectSchema.optional(),
  include: SoftwareOnRankIncludeSchema.optional(),
  where: SoftwareOnRankWhereUniqueInputSchema,
}).strict() ;

export const SoftwareOnArticleFindFirstArgsSchema: z.ZodType<Prisma.SoftwareOnArticleFindFirstArgs> = z.object({
  select: SoftwareOnArticleSelectSchema.optional(),
  include: SoftwareOnArticleIncludeSchema.optional(),
  where: SoftwareOnArticleWhereInputSchema.optional(),
  orderBy: z.union([ SoftwareOnArticleOrderByWithRelationInputSchema.array(),SoftwareOnArticleOrderByWithRelationInputSchema ]).optional(),
  cursor: SoftwareOnArticleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SoftwareOnArticleScalarFieldEnumSchema,SoftwareOnArticleScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SoftwareOnArticleFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SoftwareOnArticleFindFirstOrThrowArgs> = z.object({
  select: SoftwareOnArticleSelectSchema.optional(),
  include: SoftwareOnArticleIncludeSchema.optional(),
  where: SoftwareOnArticleWhereInputSchema.optional(),
  orderBy: z.union([ SoftwareOnArticleOrderByWithRelationInputSchema.array(),SoftwareOnArticleOrderByWithRelationInputSchema ]).optional(),
  cursor: SoftwareOnArticleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SoftwareOnArticleScalarFieldEnumSchema,SoftwareOnArticleScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SoftwareOnArticleFindManyArgsSchema: z.ZodType<Prisma.SoftwareOnArticleFindManyArgs> = z.object({
  select: SoftwareOnArticleSelectSchema.optional(),
  include: SoftwareOnArticleIncludeSchema.optional(),
  where: SoftwareOnArticleWhereInputSchema.optional(),
  orderBy: z.union([ SoftwareOnArticleOrderByWithRelationInputSchema.array(),SoftwareOnArticleOrderByWithRelationInputSchema ]).optional(),
  cursor: SoftwareOnArticleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SoftwareOnArticleScalarFieldEnumSchema,SoftwareOnArticleScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SoftwareOnArticleAggregateArgsSchema: z.ZodType<Prisma.SoftwareOnArticleAggregateArgs> = z.object({
  where: SoftwareOnArticleWhereInputSchema.optional(),
  orderBy: z.union([ SoftwareOnArticleOrderByWithRelationInputSchema.array(),SoftwareOnArticleOrderByWithRelationInputSchema ]).optional(),
  cursor: SoftwareOnArticleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SoftwareOnArticleGroupByArgsSchema: z.ZodType<Prisma.SoftwareOnArticleGroupByArgs> = z.object({
  where: SoftwareOnArticleWhereInputSchema.optional(),
  orderBy: z.union([ SoftwareOnArticleOrderByWithAggregationInputSchema.array(),SoftwareOnArticleOrderByWithAggregationInputSchema ]).optional(),
  by: SoftwareOnArticleScalarFieldEnumSchema.array(),
  having: SoftwareOnArticleScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SoftwareOnArticleFindUniqueArgsSchema: z.ZodType<Prisma.SoftwareOnArticleFindUniqueArgs> = z.object({
  select: SoftwareOnArticleSelectSchema.optional(),
  include: SoftwareOnArticleIncludeSchema.optional(),
  where: SoftwareOnArticleWhereUniqueInputSchema,
}).strict() ;

export const SoftwareOnArticleFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SoftwareOnArticleFindUniqueOrThrowArgs> = z.object({
  select: SoftwareOnArticleSelectSchema.optional(),
  include: SoftwareOnArticleIncludeSchema.optional(),
  where: SoftwareOnArticleWhereUniqueInputSchema,
}).strict() ;

export const ArticleFindFirstArgsSchema: z.ZodType<Prisma.ArticleFindFirstArgs> = z.object({
  select: ArticleSelectSchema.optional(),
  include: ArticleIncludeSchema.optional(),
  where: ArticleWhereInputSchema.optional(),
  orderBy: z.union([ ArticleOrderByWithRelationInputSchema.array(),ArticleOrderByWithRelationInputSchema ]).optional(),
  cursor: ArticleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ArticleScalarFieldEnumSchema,ArticleScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ArticleFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ArticleFindFirstOrThrowArgs> = z.object({
  select: ArticleSelectSchema.optional(),
  include: ArticleIncludeSchema.optional(),
  where: ArticleWhereInputSchema.optional(),
  orderBy: z.union([ ArticleOrderByWithRelationInputSchema.array(),ArticleOrderByWithRelationInputSchema ]).optional(),
  cursor: ArticleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ArticleScalarFieldEnumSchema,ArticleScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ArticleFindManyArgsSchema: z.ZodType<Prisma.ArticleFindManyArgs> = z.object({
  select: ArticleSelectSchema.optional(),
  include: ArticleIncludeSchema.optional(),
  where: ArticleWhereInputSchema.optional(),
  orderBy: z.union([ ArticleOrderByWithRelationInputSchema.array(),ArticleOrderByWithRelationInputSchema ]).optional(),
  cursor: ArticleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ArticleScalarFieldEnumSchema,ArticleScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ArticleAggregateArgsSchema: z.ZodType<Prisma.ArticleAggregateArgs> = z.object({
  where: ArticleWhereInputSchema.optional(),
  orderBy: z.union([ ArticleOrderByWithRelationInputSchema.array(),ArticleOrderByWithRelationInputSchema ]).optional(),
  cursor: ArticleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ArticleGroupByArgsSchema: z.ZodType<Prisma.ArticleGroupByArgs> = z.object({
  where: ArticleWhereInputSchema.optional(),
  orderBy: z.union([ ArticleOrderByWithAggregationInputSchema.array(),ArticleOrderByWithAggregationInputSchema ]).optional(),
  by: ArticleScalarFieldEnumSchema.array(),
  having: ArticleScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ArticleFindUniqueArgsSchema: z.ZodType<Prisma.ArticleFindUniqueArgs> = z.object({
  select: ArticleSelectSchema.optional(),
  include: ArticleIncludeSchema.optional(),
  where: ArticleWhereUniqueInputSchema,
}).strict() ;

export const ArticleFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ArticleFindUniqueOrThrowArgs> = z.object({
  select: ArticleSelectSchema.optional(),
  include: ArticleIncludeSchema.optional(),
  where: ArticleWhereUniqueInputSchema,
}).strict() ;

export const RankLikeFindFirstArgsSchema: z.ZodType<Prisma.RankLikeFindFirstArgs> = z.object({
  select: RankLikeSelectSchema.optional(),
  include: RankLikeIncludeSchema.optional(),
  where: RankLikeWhereInputSchema.optional(),
  orderBy: z.union([ RankLikeOrderByWithRelationInputSchema.array(),RankLikeOrderByWithRelationInputSchema ]).optional(),
  cursor: RankLikeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RankLikeScalarFieldEnumSchema,RankLikeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RankLikeFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RankLikeFindFirstOrThrowArgs> = z.object({
  select: RankLikeSelectSchema.optional(),
  include: RankLikeIncludeSchema.optional(),
  where: RankLikeWhereInputSchema.optional(),
  orderBy: z.union([ RankLikeOrderByWithRelationInputSchema.array(),RankLikeOrderByWithRelationInputSchema ]).optional(),
  cursor: RankLikeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RankLikeScalarFieldEnumSchema,RankLikeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RankLikeFindManyArgsSchema: z.ZodType<Prisma.RankLikeFindManyArgs> = z.object({
  select: RankLikeSelectSchema.optional(),
  include: RankLikeIncludeSchema.optional(),
  where: RankLikeWhereInputSchema.optional(),
  orderBy: z.union([ RankLikeOrderByWithRelationInputSchema.array(),RankLikeOrderByWithRelationInputSchema ]).optional(),
  cursor: RankLikeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RankLikeScalarFieldEnumSchema,RankLikeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RankLikeAggregateArgsSchema: z.ZodType<Prisma.RankLikeAggregateArgs> = z.object({
  where: RankLikeWhereInputSchema.optional(),
  orderBy: z.union([ RankLikeOrderByWithRelationInputSchema.array(),RankLikeOrderByWithRelationInputSchema ]).optional(),
  cursor: RankLikeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RankLikeGroupByArgsSchema: z.ZodType<Prisma.RankLikeGroupByArgs> = z.object({
  where: RankLikeWhereInputSchema.optional(),
  orderBy: z.union([ RankLikeOrderByWithAggregationInputSchema.array(),RankLikeOrderByWithAggregationInputSchema ]).optional(),
  by: RankLikeScalarFieldEnumSchema.array(),
  having: RankLikeScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RankLikeFindUniqueArgsSchema: z.ZodType<Prisma.RankLikeFindUniqueArgs> = z.object({
  select: RankLikeSelectSchema.optional(),
  include: RankLikeIncludeSchema.optional(),
  where: RankLikeWhereUniqueInputSchema,
}).strict() ;

export const RankLikeFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RankLikeFindUniqueOrThrowArgs> = z.object({
  select: RankLikeSelectSchema.optional(),
  include: RankLikeIncludeSchema.optional(),
  where: RankLikeWhereUniqueInputSchema,
}).strict() ;

export const RankFavoriteFindFirstArgsSchema: z.ZodType<Prisma.RankFavoriteFindFirstArgs> = z.object({
  select: RankFavoriteSelectSchema.optional(),
  include: RankFavoriteIncludeSchema.optional(),
  where: RankFavoriteWhereInputSchema.optional(),
  orderBy: z.union([ RankFavoriteOrderByWithRelationInputSchema.array(),RankFavoriteOrderByWithRelationInputSchema ]).optional(),
  cursor: RankFavoriteWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RankFavoriteScalarFieldEnumSchema,RankFavoriteScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RankFavoriteFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RankFavoriteFindFirstOrThrowArgs> = z.object({
  select: RankFavoriteSelectSchema.optional(),
  include: RankFavoriteIncludeSchema.optional(),
  where: RankFavoriteWhereInputSchema.optional(),
  orderBy: z.union([ RankFavoriteOrderByWithRelationInputSchema.array(),RankFavoriteOrderByWithRelationInputSchema ]).optional(),
  cursor: RankFavoriteWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RankFavoriteScalarFieldEnumSchema,RankFavoriteScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RankFavoriteFindManyArgsSchema: z.ZodType<Prisma.RankFavoriteFindManyArgs> = z.object({
  select: RankFavoriteSelectSchema.optional(),
  include: RankFavoriteIncludeSchema.optional(),
  where: RankFavoriteWhereInputSchema.optional(),
  orderBy: z.union([ RankFavoriteOrderByWithRelationInputSchema.array(),RankFavoriteOrderByWithRelationInputSchema ]).optional(),
  cursor: RankFavoriteWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RankFavoriteScalarFieldEnumSchema,RankFavoriteScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RankFavoriteAggregateArgsSchema: z.ZodType<Prisma.RankFavoriteAggregateArgs> = z.object({
  where: RankFavoriteWhereInputSchema.optional(),
  orderBy: z.union([ RankFavoriteOrderByWithRelationInputSchema.array(),RankFavoriteOrderByWithRelationInputSchema ]).optional(),
  cursor: RankFavoriteWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RankFavoriteGroupByArgsSchema: z.ZodType<Prisma.RankFavoriteGroupByArgs> = z.object({
  where: RankFavoriteWhereInputSchema.optional(),
  orderBy: z.union([ RankFavoriteOrderByWithAggregationInputSchema.array(),RankFavoriteOrderByWithAggregationInputSchema ]).optional(),
  by: RankFavoriteScalarFieldEnumSchema.array(),
  having: RankFavoriteScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RankFavoriteFindUniqueArgsSchema: z.ZodType<Prisma.RankFavoriteFindUniqueArgs> = z.object({
  select: RankFavoriteSelectSchema.optional(),
  include: RankFavoriteIncludeSchema.optional(),
  where: RankFavoriteWhereUniqueInputSchema,
}).strict() ;

export const RankFavoriteFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RankFavoriteFindUniqueOrThrowArgs> = z.object({
  select: RankFavoriteSelectSchema.optional(),
  include: RankFavoriteIncludeSchema.optional(),
  where: RankFavoriteWhereUniqueInputSchema,
}).strict() ;

export const SoftwareLikeFindFirstArgsSchema: z.ZodType<Prisma.SoftwareLikeFindFirstArgs> = z.object({
  select: SoftwareLikeSelectSchema.optional(),
  include: SoftwareLikeIncludeSchema.optional(),
  where: SoftwareLikeWhereInputSchema.optional(),
  orderBy: z.union([ SoftwareLikeOrderByWithRelationInputSchema.array(),SoftwareLikeOrderByWithRelationInputSchema ]).optional(),
  cursor: SoftwareLikeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SoftwareLikeScalarFieldEnumSchema,SoftwareLikeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SoftwareLikeFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SoftwareLikeFindFirstOrThrowArgs> = z.object({
  select: SoftwareLikeSelectSchema.optional(),
  include: SoftwareLikeIncludeSchema.optional(),
  where: SoftwareLikeWhereInputSchema.optional(),
  orderBy: z.union([ SoftwareLikeOrderByWithRelationInputSchema.array(),SoftwareLikeOrderByWithRelationInputSchema ]).optional(),
  cursor: SoftwareLikeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SoftwareLikeScalarFieldEnumSchema,SoftwareLikeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SoftwareLikeFindManyArgsSchema: z.ZodType<Prisma.SoftwareLikeFindManyArgs> = z.object({
  select: SoftwareLikeSelectSchema.optional(),
  include: SoftwareLikeIncludeSchema.optional(),
  where: SoftwareLikeWhereInputSchema.optional(),
  orderBy: z.union([ SoftwareLikeOrderByWithRelationInputSchema.array(),SoftwareLikeOrderByWithRelationInputSchema ]).optional(),
  cursor: SoftwareLikeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SoftwareLikeScalarFieldEnumSchema,SoftwareLikeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SoftwareLikeAggregateArgsSchema: z.ZodType<Prisma.SoftwareLikeAggregateArgs> = z.object({
  where: SoftwareLikeWhereInputSchema.optional(),
  orderBy: z.union([ SoftwareLikeOrderByWithRelationInputSchema.array(),SoftwareLikeOrderByWithRelationInputSchema ]).optional(),
  cursor: SoftwareLikeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SoftwareLikeGroupByArgsSchema: z.ZodType<Prisma.SoftwareLikeGroupByArgs> = z.object({
  where: SoftwareLikeWhereInputSchema.optional(),
  orderBy: z.union([ SoftwareLikeOrderByWithAggregationInputSchema.array(),SoftwareLikeOrderByWithAggregationInputSchema ]).optional(),
  by: SoftwareLikeScalarFieldEnumSchema.array(),
  having: SoftwareLikeScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SoftwareLikeFindUniqueArgsSchema: z.ZodType<Prisma.SoftwareLikeFindUniqueArgs> = z.object({
  select: SoftwareLikeSelectSchema.optional(),
  include: SoftwareLikeIncludeSchema.optional(),
  where: SoftwareLikeWhereUniqueInputSchema,
}).strict() ;

export const SoftwareLikeFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SoftwareLikeFindUniqueOrThrowArgs> = z.object({
  select: SoftwareLikeSelectSchema.optional(),
  include: SoftwareLikeIncludeSchema.optional(),
  where: SoftwareLikeWhereUniqueInputSchema,
}).strict() ;

export const SoftwareFavoriteFindFirstArgsSchema: z.ZodType<Prisma.SoftwareFavoriteFindFirstArgs> = z.object({
  select: SoftwareFavoriteSelectSchema.optional(),
  include: SoftwareFavoriteIncludeSchema.optional(),
  where: SoftwareFavoriteWhereInputSchema.optional(),
  orderBy: z.union([ SoftwareFavoriteOrderByWithRelationInputSchema.array(),SoftwareFavoriteOrderByWithRelationInputSchema ]).optional(),
  cursor: SoftwareFavoriteWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SoftwareFavoriteScalarFieldEnumSchema,SoftwareFavoriteScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SoftwareFavoriteFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SoftwareFavoriteFindFirstOrThrowArgs> = z.object({
  select: SoftwareFavoriteSelectSchema.optional(),
  include: SoftwareFavoriteIncludeSchema.optional(),
  where: SoftwareFavoriteWhereInputSchema.optional(),
  orderBy: z.union([ SoftwareFavoriteOrderByWithRelationInputSchema.array(),SoftwareFavoriteOrderByWithRelationInputSchema ]).optional(),
  cursor: SoftwareFavoriteWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SoftwareFavoriteScalarFieldEnumSchema,SoftwareFavoriteScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SoftwareFavoriteFindManyArgsSchema: z.ZodType<Prisma.SoftwareFavoriteFindManyArgs> = z.object({
  select: SoftwareFavoriteSelectSchema.optional(),
  include: SoftwareFavoriteIncludeSchema.optional(),
  where: SoftwareFavoriteWhereInputSchema.optional(),
  orderBy: z.union([ SoftwareFavoriteOrderByWithRelationInputSchema.array(),SoftwareFavoriteOrderByWithRelationInputSchema ]).optional(),
  cursor: SoftwareFavoriteWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SoftwareFavoriteScalarFieldEnumSchema,SoftwareFavoriteScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SoftwareFavoriteAggregateArgsSchema: z.ZodType<Prisma.SoftwareFavoriteAggregateArgs> = z.object({
  where: SoftwareFavoriteWhereInputSchema.optional(),
  orderBy: z.union([ SoftwareFavoriteOrderByWithRelationInputSchema.array(),SoftwareFavoriteOrderByWithRelationInputSchema ]).optional(),
  cursor: SoftwareFavoriteWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SoftwareFavoriteGroupByArgsSchema: z.ZodType<Prisma.SoftwareFavoriteGroupByArgs> = z.object({
  where: SoftwareFavoriteWhereInputSchema.optional(),
  orderBy: z.union([ SoftwareFavoriteOrderByWithAggregationInputSchema.array(),SoftwareFavoriteOrderByWithAggregationInputSchema ]).optional(),
  by: SoftwareFavoriteScalarFieldEnumSchema.array(),
  having: SoftwareFavoriteScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SoftwareFavoriteFindUniqueArgsSchema: z.ZodType<Prisma.SoftwareFavoriteFindUniqueArgs> = z.object({
  select: SoftwareFavoriteSelectSchema.optional(),
  include: SoftwareFavoriteIncludeSchema.optional(),
  where: SoftwareFavoriteWhereUniqueInputSchema,
}).strict() ;

export const SoftwareFavoriteFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SoftwareFavoriteFindUniqueOrThrowArgs> = z.object({
  select: SoftwareFavoriteSelectSchema.optional(),
  include: SoftwareFavoriteIncludeSchema.optional(),
  where: SoftwareFavoriteWhereUniqueInputSchema,
}).strict() ;

export const RankCommentFindFirstArgsSchema: z.ZodType<Prisma.RankCommentFindFirstArgs> = z.object({
  select: RankCommentSelectSchema.optional(),
  include: RankCommentIncludeSchema.optional(),
  where: RankCommentWhereInputSchema.optional(),
  orderBy: z.union([ RankCommentOrderByWithRelationInputSchema.array(),RankCommentOrderByWithRelationInputSchema ]).optional(),
  cursor: RankCommentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RankCommentScalarFieldEnumSchema,RankCommentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RankCommentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RankCommentFindFirstOrThrowArgs> = z.object({
  select: RankCommentSelectSchema.optional(),
  include: RankCommentIncludeSchema.optional(),
  where: RankCommentWhereInputSchema.optional(),
  orderBy: z.union([ RankCommentOrderByWithRelationInputSchema.array(),RankCommentOrderByWithRelationInputSchema ]).optional(),
  cursor: RankCommentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RankCommentScalarFieldEnumSchema,RankCommentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RankCommentFindManyArgsSchema: z.ZodType<Prisma.RankCommentFindManyArgs> = z.object({
  select: RankCommentSelectSchema.optional(),
  include: RankCommentIncludeSchema.optional(),
  where: RankCommentWhereInputSchema.optional(),
  orderBy: z.union([ RankCommentOrderByWithRelationInputSchema.array(),RankCommentOrderByWithRelationInputSchema ]).optional(),
  cursor: RankCommentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RankCommentScalarFieldEnumSchema,RankCommentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RankCommentAggregateArgsSchema: z.ZodType<Prisma.RankCommentAggregateArgs> = z.object({
  where: RankCommentWhereInputSchema.optional(),
  orderBy: z.union([ RankCommentOrderByWithRelationInputSchema.array(),RankCommentOrderByWithRelationInputSchema ]).optional(),
  cursor: RankCommentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RankCommentGroupByArgsSchema: z.ZodType<Prisma.RankCommentGroupByArgs> = z.object({
  where: RankCommentWhereInputSchema.optional(),
  orderBy: z.union([ RankCommentOrderByWithAggregationInputSchema.array(),RankCommentOrderByWithAggregationInputSchema ]).optional(),
  by: RankCommentScalarFieldEnumSchema.array(),
  having: RankCommentScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RankCommentFindUniqueArgsSchema: z.ZodType<Prisma.RankCommentFindUniqueArgs> = z.object({
  select: RankCommentSelectSchema.optional(),
  include: RankCommentIncludeSchema.optional(),
  where: RankCommentWhereUniqueInputSchema,
}).strict() ;

export const RankCommentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RankCommentFindUniqueOrThrowArgs> = z.object({
  select: RankCommentSelectSchema.optional(),
  include: RankCommentIncludeSchema.optional(),
  where: RankCommentWhereUniqueInputSchema,
}).strict() ;

export const UserPlatformCreateArgsSchema: z.ZodType<Prisma.UserPlatformCreateArgs> = z.object({
  select: UserPlatformSelectSchema.optional(),
  include: UserPlatformIncludeSchema.optional(),
  data: z.union([ UserPlatformCreateInputSchema,UserPlatformUncheckedCreateInputSchema ]),
}).strict() ;

export const UserPlatformUpsertArgsSchema: z.ZodType<Prisma.UserPlatformUpsertArgs> = z.object({
  select: UserPlatformSelectSchema.optional(),
  include: UserPlatformIncludeSchema.optional(),
  where: UserPlatformWhereUniqueInputSchema,
  create: z.union([ UserPlatformCreateInputSchema,UserPlatformUncheckedCreateInputSchema ]),
  update: z.union([ UserPlatformUpdateInputSchema,UserPlatformUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserPlatformCreateManyArgsSchema: z.ZodType<Prisma.UserPlatformCreateManyArgs> = z.object({
  data: z.union([ UserPlatformCreateManyInputSchema,UserPlatformCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserPlatformCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserPlatformCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserPlatformCreateManyInputSchema,UserPlatformCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserPlatformDeleteArgsSchema: z.ZodType<Prisma.UserPlatformDeleteArgs> = z.object({
  select: UserPlatformSelectSchema.optional(),
  include: UserPlatformIncludeSchema.optional(),
  where: UserPlatformWhereUniqueInputSchema,
}).strict() ;

export const UserPlatformUpdateArgsSchema: z.ZodType<Prisma.UserPlatformUpdateArgs> = z.object({
  select: UserPlatformSelectSchema.optional(),
  include: UserPlatformIncludeSchema.optional(),
  data: z.union([ UserPlatformUpdateInputSchema,UserPlatformUncheckedUpdateInputSchema ]),
  where: UserPlatformWhereUniqueInputSchema,
}).strict() ;

export const UserPlatformUpdateManyArgsSchema: z.ZodType<Prisma.UserPlatformUpdateManyArgs> = z.object({
  data: z.union([ UserPlatformUpdateManyMutationInputSchema,UserPlatformUncheckedUpdateManyInputSchema ]),
  where: UserPlatformWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserPlatformUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.UserPlatformUpdateManyAndReturnArgs> = z.object({
  data: z.union([ UserPlatformUpdateManyMutationInputSchema,UserPlatformUncheckedUpdateManyInputSchema ]),
  where: UserPlatformWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserPlatformDeleteManyArgsSchema: z.ZodType<Prisma.UserPlatformDeleteManyArgs> = z.object({
  where: UserPlatformWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ApiKeyCreateArgsSchema: z.ZodType<Prisma.ApiKeyCreateArgs> = z.object({
  select: ApiKeySelectSchema.optional(),
  data: z.union([ ApiKeyCreateInputSchema,ApiKeyUncheckedCreateInputSchema ]),
}).strict() ;

export const ApiKeyUpsertArgsSchema: z.ZodType<Prisma.ApiKeyUpsertArgs> = z.object({
  select: ApiKeySelectSchema.optional(),
  where: ApiKeyWhereUniqueInputSchema,
  create: z.union([ ApiKeyCreateInputSchema,ApiKeyUncheckedCreateInputSchema ]),
  update: z.union([ ApiKeyUpdateInputSchema,ApiKeyUncheckedUpdateInputSchema ]),
}).strict() ;

export const ApiKeyCreateManyArgsSchema: z.ZodType<Prisma.ApiKeyCreateManyArgs> = z.object({
  data: z.union([ ApiKeyCreateManyInputSchema,ApiKeyCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ApiKeyCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ApiKeyCreateManyAndReturnArgs> = z.object({
  data: z.union([ ApiKeyCreateManyInputSchema,ApiKeyCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ApiKeyDeleteArgsSchema: z.ZodType<Prisma.ApiKeyDeleteArgs> = z.object({
  select: ApiKeySelectSchema.optional(),
  where: ApiKeyWhereUniqueInputSchema,
}).strict() ;

export const ApiKeyUpdateArgsSchema: z.ZodType<Prisma.ApiKeyUpdateArgs> = z.object({
  select: ApiKeySelectSchema.optional(),
  data: z.union([ ApiKeyUpdateInputSchema,ApiKeyUncheckedUpdateInputSchema ]),
  where: ApiKeyWhereUniqueInputSchema,
}).strict() ;

export const ApiKeyUpdateManyArgsSchema: z.ZodType<Prisma.ApiKeyUpdateManyArgs> = z.object({
  data: z.union([ ApiKeyUpdateManyMutationInputSchema,ApiKeyUncheckedUpdateManyInputSchema ]),
  where: ApiKeyWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ApiKeyUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.ApiKeyUpdateManyAndReturnArgs> = z.object({
  data: z.union([ ApiKeyUpdateManyMutationInputSchema,ApiKeyUncheckedUpdateManyInputSchema ]),
  where: ApiKeyWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ApiKeyDeleteManyArgsSchema: z.ZodType<Prisma.ApiKeyDeleteManyArgs> = z.object({
  where: ApiKeyWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.UserUpdateManyAndReturnArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TagCreateArgsSchema: z.ZodType<Prisma.TagCreateArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  data: z.union([ TagCreateInputSchema,TagUncheckedCreateInputSchema ]),
}).strict() ;

export const TagUpsertArgsSchema: z.ZodType<Prisma.TagUpsertArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereUniqueInputSchema,
  create: z.union([ TagCreateInputSchema,TagUncheckedCreateInputSchema ]),
  update: z.union([ TagUpdateInputSchema,TagUncheckedUpdateInputSchema ]),
}).strict() ;

export const TagCreateManyArgsSchema: z.ZodType<Prisma.TagCreateManyArgs> = z.object({
  data: z.union([ TagCreateManyInputSchema,TagCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const TagCreateManyAndReturnArgsSchema: z.ZodType<Prisma.TagCreateManyAndReturnArgs> = z.object({
  data: z.union([ TagCreateManyInputSchema,TagCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const TagDeleteArgsSchema: z.ZodType<Prisma.TagDeleteArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereUniqueInputSchema,
}).strict() ;

export const TagUpdateArgsSchema: z.ZodType<Prisma.TagUpdateArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  data: z.union([ TagUpdateInputSchema,TagUncheckedUpdateInputSchema ]),
  where: TagWhereUniqueInputSchema,
}).strict() ;

export const TagUpdateManyArgsSchema: z.ZodType<Prisma.TagUpdateManyArgs> = z.object({
  data: z.union([ TagUpdateManyMutationInputSchema,TagUncheckedUpdateManyInputSchema ]),
  where: TagWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TagUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.TagUpdateManyAndReturnArgs> = z.object({
  data: z.union([ TagUpdateManyMutationInputSchema,TagUncheckedUpdateManyInputSchema ]),
  where: TagWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TagDeleteManyArgsSchema: z.ZodType<Prisma.TagDeleteManyArgs> = z.object({
  where: TagWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const RankCreateArgsSchema: z.ZodType<Prisma.RankCreateArgs> = z.object({
  select: RankSelectSchema.optional(),
  include: RankIncludeSchema.optional(),
  data: z.union([ RankCreateInputSchema,RankUncheckedCreateInputSchema ]),
}).strict() ;

export const RankUpsertArgsSchema: z.ZodType<Prisma.RankUpsertArgs> = z.object({
  select: RankSelectSchema.optional(),
  include: RankIncludeSchema.optional(),
  where: RankWhereUniqueInputSchema,
  create: z.union([ RankCreateInputSchema,RankUncheckedCreateInputSchema ]),
  update: z.union([ RankUpdateInputSchema,RankUncheckedUpdateInputSchema ]),
}).strict() ;

export const RankCreateManyArgsSchema: z.ZodType<Prisma.RankCreateManyArgs> = z.object({
  data: z.union([ RankCreateManyInputSchema,RankCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const RankCreateManyAndReturnArgsSchema: z.ZodType<Prisma.RankCreateManyAndReturnArgs> = z.object({
  data: z.union([ RankCreateManyInputSchema,RankCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const RankDeleteArgsSchema: z.ZodType<Prisma.RankDeleteArgs> = z.object({
  select: RankSelectSchema.optional(),
  include: RankIncludeSchema.optional(),
  where: RankWhereUniqueInputSchema,
}).strict() ;

export const RankUpdateArgsSchema: z.ZodType<Prisma.RankUpdateArgs> = z.object({
  select: RankSelectSchema.optional(),
  include: RankIncludeSchema.optional(),
  data: z.union([ RankUpdateInputSchema,RankUncheckedUpdateInputSchema ]),
  where: RankWhereUniqueInputSchema,
}).strict() ;

export const RankUpdateManyArgsSchema: z.ZodType<Prisma.RankUpdateManyArgs> = z.object({
  data: z.union([ RankUpdateManyMutationInputSchema,RankUncheckedUpdateManyInputSchema ]),
  where: RankWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const RankUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.RankUpdateManyAndReturnArgs> = z.object({
  data: z.union([ RankUpdateManyMutationInputSchema,RankUncheckedUpdateManyInputSchema ]),
  where: RankWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const RankDeleteManyArgsSchema: z.ZodType<Prisma.RankDeleteManyArgs> = z.object({
  where: RankWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const RankTagCreateArgsSchema: z.ZodType<Prisma.RankTagCreateArgs> = z.object({
  select: RankTagSelectSchema.optional(),
  include: RankTagIncludeSchema.optional(),
  data: z.union([ RankTagCreateInputSchema,RankTagUncheckedCreateInputSchema ]),
}).strict() ;

export const RankTagUpsertArgsSchema: z.ZodType<Prisma.RankTagUpsertArgs> = z.object({
  select: RankTagSelectSchema.optional(),
  include: RankTagIncludeSchema.optional(),
  where: RankTagWhereUniqueInputSchema,
  create: z.union([ RankTagCreateInputSchema,RankTagUncheckedCreateInputSchema ]),
  update: z.union([ RankTagUpdateInputSchema,RankTagUncheckedUpdateInputSchema ]),
}).strict() ;

export const RankTagCreateManyArgsSchema: z.ZodType<Prisma.RankTagCreateManyArgs> = z.object({
  data: z.union([ RankTagCreateManyInputSchema,RankTagCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const RankTagCreateManyAndReturnArgsSchema: z.ZodType<Prisma.RankTagCreateManyAndReturnArgs> = z.object({
  data: z.union([ RankTagCreateManyInputSchema,RankTagCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const RankTagDeleteArgsSchema: z.ZodType<Prisma.RankTagDeleteArgs> = z.object({
  select: RankTagSelectSchema.optional(),
  include: RankTagIncludeSchema.optional(),
  where: RankTagWhereUniqueInputSchema,
}).strict() ;

export const RankTagUpdateArgsSchema: z.ZodType<Prisma.RankTagUpdateArgs> = z.object({
  select: RankTagSelectSchema.optional(),
  include: RankTagIncludeSchema.optional(),
  data: z.union([ RankTagUpdateInputSchema,RankTagUncheckedUpdateInputSchema ]),
  where: RankTagWhereUniqueInputSchema,
}).strict() ;

export const RankTagUpdateManyArgsSchema: z.ZodType<Prisma.RankTagUpdateManyArgs> = z.object({
  data: z.union([ RankTagUpdateManyMutationInputSchema,RankTagUncheckedUpdateManyInputSchema ]),
  where: RankTagWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const RankTagUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.RankTagUpdateManyAndReturnArgs> = z.object({
  data: z.union([ RankTagUpdateManyMutationInputSchema,RankTagUncheckedUpdateManyInputSchema ]),
  where: RankTagWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const RankTagDeleteManyArgsSchema: z.ZodType<Prisma.RankTagDeleteManyArgs> = z.object({
  where: RankTagWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SoftwareCreateArgsSchema: z.ZodType<Prisma.SoftwareCreateArgs> = z.object({
  select: SoftwareSelectSchema.optional(),
  include: SoftwareIncludeSchema.optional(),
  data: z.union([ SoftwareCreateInputSchema,SoftwareUncheckedCreateInputSchema ]),
}).strict() ;

export const SoftwareUpsertArgsSchema: z.ZodType<Prisma.SoftwareUpsertArgs> = z.object({
  select: SoftwareSelectSchema.optional(),
  include: SoftwareIncludeSchema.optional(),
  where: SoftwareWhereUniqueInputSchema,
  create: z.union([ SoftwareCreateInputSchema,SoftwareUncheckedCreateInputSchema ]),
  update: z.union([ SoftwareUpdateInputSchema,SoftwareUncheckedUpdateInputSchema ]),
}).strict() ;

export const SoftwareCreateManyArgsSchema: z.ZodType<Prisma.SoftwareCreateManyArgs> = z.object({
  data: z.union([ SoftwareCreateManyInputSchema,SoftwareCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SoftwareCreateManyAndReturnArgsSchema: z.ZodType<Prisma.SoftwareCreateManyAndReturnArgs> = z.object({
  data: z.union([ SoftwareCreateManyInputSchema,SoftwareCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SoftwareDeleteArgsSchema: z.ZodType<Prisma.SoftwareDeleteArgs> = z.object({
  select: SoftwareSelectSchema.optional(),
  include: SoftwareIncludeSchema.optional(),
  where: SoftwareWhereUniqueInputSchema,
}).strict() ;

export const SoftwareUpdateArgsSchema: z.ZodType<Prisma.SoftwareUpdateArgs> = z.object({
  select: SoftwareSelectSchema.optional(),
  include: SoftwareIncludeSchema.optional(),
  data: z.union([ SoftwareUpdateInputSchema,SoftwareUncheckedUpdateInputSchema ]),
  where: SoftwareWhereUniqueInputSchema,
}).strict() ;

export const SoftwareUpdateManyArgsSchema: z.ZodType<Prisma.SoftwareUpdateManyArgs> = z.object({
  data: z.union([ SoftwareUpdateManyMutationInputSchema,SoftwareUncheckedUpdateManyInputSchema ]),
  where: SoftwareWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SoftwareUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.SoftwareUpdateManyAndReturnArgs> = z.object({
  data: z.union([ SoftwareUpdateManyMutationInputSchema,SoftwareUncheckedUpdateManyInputSchema ]),
  where: SoftwareWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SoftwareDeleteManyArgsSchema: z.ZodType<Prisma.SoftwareDeleteManyArgs> = z.object({
  where: SoftwareWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SoftwareTagCreateArgsSchema: z.ZodType<Prisma.SoftwareTagCreateArgs> = z.object({
  select: SoftwareTagSelectSchema.optional(),
  include: SoftwareTagIncludeSchema.optional(),
  data: z.union([ SoftwareTagCreateInputSchema,SoftwareTagUncheckedCreateInputSchema ]),
}).strict() ;

export const SoftwareTagUpsertArgsSchema: z.ZodType<Prisma.SoftwareTagUpsertArgs> = z.object({
  select: SoftwareTagSelectSchema.optional(),
  include: SoftwareTagIncludeSchema.optional(),
  where: SoftwareTagWhereUniqueInputSchema,
  create: z.union([ SoftwareTagCreateInputSchema,SoftwareTagUncheckedCreateInputSchema ]),
  update: z.union([ SoftwareTagUpdateInputSchema,SoftwareTagUncheckedUpdateInputSchema ]),
}).strict() ;

export const SoftwareTagCreateManyArgsSchema: z.ZodType<Prisma.SoftwareTagCreateManyArgs> = z.object({
  data: z.union([ SoftwareTagCreateManyInputSchema,SoftwareTagCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SoftwareTagCreateManyAndReturnArgsSchema: z.ZodType<Prisma.SoftwareTagCreateManyAndReturnArgs> = z.object({
  data: z.union([ SoftwareTagCreateManyInputSchema,SoftwareTagCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SoftwareTagDeleteArgsSchema: z.ZodType<Prisma.SoftwareTagDeleteArgs> = z.object({
  select: SoftwareTagSelectSchema.optional(),
  include: SoftwareTagIncludeSchema.optional(),
  where: SoftwareTagWhereUniqueInputSchema,
}).strict() ;

export const SoftwareTagUpdateArgsSchema: z.ZodType<Prisma.SoftwareTagUpdateArgs> = z.object({
  select: SoftwareTagSelectSchema.optional(),
  include: SoftwareTagIncludeSchema.optional(),
  data: z.union([ SoftwareTagUpdateInputSchema,SoftwareTagUncheckedUpdateInputSchema ]),
  where: SoftwareTagWhereUniqueInputSchema,
}).strict() ;

export const SoftwareTagUpdateManyArgsSchema: z.ZodType<Prisma.SoftwareTagUpdateManyArgs> = z.object({
  data: z.union([ SoftwareTagUpdateManyMutationInputSchema,SoftwareTagUncheckedUpdateManyInputSchema ]),
  where: SoftwareTagWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SoftwareTagUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.SoftwareTagUpdateManyAndReturnArgs> = z.object({
  data: z.union([ SoftwareTagUpdateManyMutationInputSchema,SoftwareTagUncheckedUpdateManyInputSchema ]),
  where: SoftwareTagWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SoftwareTagDeleteManyArgsSchema: z.ZodType<Prisma.SoftwareTagDeleteManyArgs> = z.object({
  where: SoftwareTagWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SoftwareOnRankCreateArgsSchema: z.ZodType<Prisma.SoftwareOnRankCreateArgs> = z.object({
  select: SoftwareOnRankSelectSchema.optional(),
  include: SoftwareOnRankIncludeSchema.optional(),
  data: z.union([ SoftwareOnRankCreateInputSchema,SoftwareOnRankUncheckedCreateInputSchema ]),
}).strict() ;

export const SoftwareOnRankUpsertArgsSchema: z.ZodType<Prisma.SoftwareOnRankUpsertArgs> = z.object({
  select: SoftwareOnRankSelectSchema.optional(),
  include: SoftwareOnRankIncludeSchema.optional(),
  where: SoftwareOnRankWhereUniqueInputSchema,
  create: z.union([ SoftwareOnRankCreateInputSchema,SoftwareOnRankUncheckedCreateInputSchema ]),
  update: z.union([ SoftwareOnRankUpdateInputSchema,SoftwareOnRankUncheckedUpdateInputSchema ]),
}).strict() ;

export const SoftwareOnRankCreateManyArgsSchema: z.ZodType<Prisma.SoftwareOnRankCreateManyArgs> = z.object({
  data: z.union([ SoftwareOnRankCreateManyInputSchema,SoftwareOnRankCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SoftwareOnRankCreateManyAndReturnArgsSchema: z.ZodType<Prisma.SoftwareOnRankCreateManyAndReturnArgs> = z.object({
  data: z.union([ SoftwareOnRankCreateManyInputSchema,SoftwareOnRankCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SoftwareOnRankDeleteArgsSchema: z.ZodType<Prisma.SoftwareOnRankDeleteArgs> = z.object({
  select: SoftwareOnRankSelectSchema.optional(),
  include: SoftwareOnRankIncludeSchema.optional(),
  where: SoftwareOnRankWhereUniqueInputSchema,
}).strict() ;

export const SoftwareOnRankUpdateArgsSchema: z.ZodType<Prisma.SoftwareOnRankUpdateArgs> = z.object({
  select: SoftwareOnRankSelectSchema.optional(),
  include: SoftwareOnRankIncludeSchema.optional(),
  data: z.union([ SoftwareOnRankUpdateInputSchema,SoftwareOnRankUncheckedUpdateInputSchema ]),
  where: SoftwareOnRankWhereUniqueInputSchema,
}).strict() ;

export const SoftwareOnRankUpdateManyArgsSchema: z.ZodType<Prisma.SoftwareOnRankUpdateManyArgs> = z.object({
  data: z.union([ SoftwareOnRankUpdateManyMutationInputSchema,SoftwareOnRankUncheckedUpdateManyInputSchema ]),
  where: SoftwareOnRankWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SoftwareOnRankUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.SoftwareOnRankUpdateManyAndReturnArgs> = z.object({
  data: z.union([ SoftwareOnRankUpdateManyMutationInputSchema,SoftwareOnRankUncheckedUpdateManyInputSchema ]),
  where: SoftwareOnRankWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SoftwareOnRankDeleteManyArgsSchema: z.ZodType<Prisma.SoftwareOnRankDeleteManyArgs> = z.object({
  where: SoftwareOnRankWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SoftwareOnArticleCreateArgsSchema: z.ZodType<Prisma.SoftwareOnArticleCreateArgs> = z.object({
  select: SoftwareOnArticleSelectSchema.optional(),
  include: SoftwareOnArticleIncludeSchema.optional(),
  data: z.union([ SoftwareOnArticleCreateInputSchema,SoftwareOnArticleUncheckedCreateInputSchema ]),
}).strict() ;

export const SoftwareOnArticleUpsertArgsSchema: z.ZodType<Prisma.SoftwareOnArticleUpsertArgs> = z.object({
  select: SoftwareOnArticleSelectSchema.optional(),
  include: SoftwareOnArticleIncludeSchema.optional(),
  where: SoftwareOnArticleWhereUniqueInputSchema,
  create: z.union([ SoftwareOnArticleCreateInputSchema,SoftwareOnArticleUncheckedCreateInputSchema ]),
  update: z.union([ SoftwareOnArticleUpdateInputSchema,SoftwareOnArticleUncheckedUpdateInputSchema ]),
}).strict() ;

export const SoftwareOnArticleCreateManyArgsSchema: z.ZodType<Prisma.SoftwareOnArticleCreateManyArgs> = z.object({
  data: z.union([ SoftwareOnArticleCreateManyInputSchema,SoftwareOnArticleCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SoftwareOnArticleCreateManyAndReturnArgsSchema: z.ZodType<Prisma.SoftwareOnArticleCreateManyAndReturnArgs> = z.object({
  data: z.union([ SoftwareOnArticleCreateManyInputSchema,SoftwareOnArticleCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SoftwareOnArticleDeleteArgsSchema: z.ZodType<Prisma.SoftwareOnArticleDeleteArgs> = z.object({
  select: SoftwareOnArticleSelectSchema.optional(),
  include: SoftwareOnArticleIncludeSchema.optional(),
  where: SoftwareOnArticleWhereUniqueInputSchema,
}).strict() ;

export const SoftwareOnArticleUpdateArgsSchema: z.ZodType<Prisma.SoftwareOnArticleUpdateArgs> = z.object({
  select: SoftwareOnArticleSelectSchema.optional(),
  include: SoftwareOnArticleIncludeSchema.optional(),
  data: z.union([ SoftwareOnArticleUpdateInputSchema,SoftwareOnArticleUncheckedUpdateInputSchema ]),
  where: SoftwareOnArticleWhereUniqueInputSchema,
}).strict() ;

export const SoftwareOnArticleUpdateManyArgsSchema: z.ZodType<Prisma.SoftwareOnArticleUpdateManyArgs> = z.object({
  data: z.union([ SoftwareOnArticleUpdateManyMutationInputSchema,SoftwareOnArticleUncheckedUpdateManyInputSchema ]),
  where: SoftwareOnArticleWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SoftwareOnArticleUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.SoftwareOnArticleUpdateManyAndReturnArgs> = z.object({
  data: z.union([ SoftwareOnArticleUpdateManyMutationInputSchema,SoftwareOnArticleUncheckedUpdateManyInputSchema ]),
  where: SoftwareOnArticleWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SoftwareOnArticleDeleteManyArgsSchema: z.ZodType<Prisma.SoftwareOnArticleDeleteManyArgs> = z.object({
  where: SoftwareOnArticleWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ArticleCreateArgsSchema: z.ZodType<Prisma.ArticleCreateArgs> = z.object({
  select: ArticleSelectSchema.optional(),
  include: ArticleIncludeSchema.optional(),
  data: z.union([ ArticleCreateInputSchema,ArticleUncheckedCreateInputSchema ]),
}).strict() ;

export const ArticleUpsertArgsSchema: z.ZodType<Prisma.ArticleUpsertArgs> = z.object({
  select: ArticleSelectSchema.optional(),
  include: ArticleIncludeSchema.optional(),
  where: ArticleWhereUniqueInputSchema,
  create: z.union([ ArticleCreateInputSchema,ArticleUncheckedCreateInputSchema ]),
  update: z.union([ ArticleUpdateInputSchema,ArticleUncheckedUpdateInputSchema ]),
}).strict() ;

export const ArticleCreateManyArgsSchema: z.ZodType<Prisma.ArticleCreateManyArgs> = z.object({
  data: z.union([ ArticleCreateManyInputSchema,ArticleCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ArticleCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ArticleCreateManyAndReturnArgs> = z.object({
  data: z.union([ ArticleCreateManyInputSchema,ArticleCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ArticleDeleteArgsSchema: z.ZodType<Prisma.ArticleDeleteArgs> = z.object({
  select: ArticleSelectSchema.optional(),
  include: ArticleIncludeSchema.optional(),
  where: ArticleWhereUniqueInputSchema,
}).strict() ;

export const ArticleUpdateArgsSchema: z.ZodType<Prisma.ArticleUpdateArgs> = z.object({
  select: ArticleSelectSchema.optional(),
  include: ArticleIncludeSchema.optional(),
  data: z.union([ ArticleUpdateInputSchema,ArticleUncheckedUpdateInputSchema ]),
  where: ArticleWhereUniqueInputSchema,
}).strict() ;

export const ArticleUpdateManyArgsSchema: z.ZodType<Prisma.ArticleUpdateManyArgs> = z.object({
  data: z.union([ ArticleUpdateManyMutationInputSchema,ArticleUncheckedUpdateManyInputSchema ]),
  where: ArticleWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ArticleUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.ArticleUpdateManyAndReturnArgs> = z.object({
  data: z.union([ ArticleUpdateManyMutationInputSchema,ArticleUncheckedUpdateManyInputSchema ]),
  where: ArticleWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ArticleDeleteManyArgsSchema: z.ZodType<Prisma.ArticleDeleteManyArgs> = z.object({
  where: ArticleWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const RankLikeCreateArgsSchema: z.ZodType<Prisma.RankLikeCreateArgs> = z.object({
  select: RankLikeSelectSchema.optional(),
  include: RankLikeIncludeSchema.optional(),
  data: z.union([ RankLikeCreateInputSchema,RankLikeUncheckedCreateInputSchema ]),
}).strict() ;

export const RankLikeUpsertArgsSchema: z.ZodType<Prisma.RankLikeUpsertArgs> = z.object({
  select: RankLikeSelectSchema.optional(),
  include: RankLikeIncludeSchema.optional(),
  where: RankLikeWhereUniqueInputSchema,
  create: z.union([ RankLikeCreateInputSchema,RankLikeUncheckedCreateInputSchema ]),
  update: z.union([ RankLikeUpdateInputSchema,RankLikeUncheckedUpdateInputSchema ]),
}).strict() ;

export const RankLikeCreateManyArgsSchema: z.ZodType<Prisma.RankLikeCreateManyArgs> = z.object({
  data: z.union([ RankLikeCreateManyInputSchema,RankLikeCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const RankLikeCreateManyAndReturnArgsSchema: z.ZodType<Prisma.RankLikeCreateManyAndReturnArgs> = z.object({
  data: z.union([ RankLikeCreateManyInputSchema,RankLikeCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const RankLikeDeleteArgsSchema: z.ZodType<Prisma.RankLikeDeleteArgs> = z.object({
  select: RankLikeSelectSchema.optional(),
  include: RankLikeIncludeSchema.optional(),
  where: RankLikeWhereUniqueInputSchema,
}).strict() ;

export const RankLikeUpdateArgsSchema: z.ZodType<Prisma.RankLikeUpdateArgs> = z.object({
  select: RankLikeSelectSchema.optional(),
  include: RankLikeIncludeSchema.optional(),
  data: z.union([ RankLikeUpdateInputSchema,RankLikeUncheckedUpdateInputSchema ]),
  where: RankLikeWhereUniqueInputSchema,
}).strict() ;

export const RankLikeUpdateManyArgsSchema: z.ZodType<Prisma.RankLikeUpdateManyArgs> = z.object({
  data: z.union([ RankLikeUpdateManyMutationInputSchema,RankLikeUncheckedUpdateManyInputSchema ]),
  where: RankLikeWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const RankLikeUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.RankLikeUpdateManyAndReturnArgs> = z.object({
  data: z.union([ RankLikeUpdateManyMutationInputSchema,RankLikeUncheckedUpdateManyInputSchema ]),
  where: RankLikeWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const RankLikeDeleteManyArgsSchema: z.ZodType<Prisma.RankLikeDeleteManyArgs> = z.object({
  where: RankLikeWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const RankFavoriteCreateArgsSchema: z.ZodType<Prisma.RankFavoriteCreateArgs> = z.object({
  select: RankFavoriteSelectSchema.optional(),
  include: RankFavoriteIncludeSchema.optional(),
  data: z.union([ RankFavoriteCreateInputSchema,RankFavoriteUncheckedCreateInputSchema ]),
}).strict() ;

export const RankFavoriteUpsertArgsSchema: z.ZodType<Prisma.RankFavoriteUpsertArgs> = z.object({
  select: RankFavoriteSelectSchema.optional(),
  include: RankFavoriteIncludeSchema.optional(),
  where: RankFavoriteWhereUniqueInputSchema,
  create: z.union([ RankFavoriteCreateInputSchema,RankFavoriteUncheckedCreateInputSchema ]),
  update: z.union([ RankFavoriteUpdateInputSchema,RankFavoriteUncheckedUpdateInputSchema ]),
}).strict() ;

export const RankFavoriteCreateManyArgsSchema: z.ZodType<Prisma.RankFavoriteCreateManyArgs> = z.object({
  data: z.union([ RankFavoriteCreateManyInputSchema,RankFavoriteCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const RankFavoriteCreateManyAndReturnArgsSchema: z.ZodType<Prisma.RankFavoriteCreateManyAndReturnArgs> = z.object({
  data: z.union([ RankFavoriteCreateManyInputSchema,RankFavoriteCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const RankFavoriteDeleteArgsSchema: z.ZodType<Prisma.RankFavoriteDeleteArgs> = z.object({
  select: RankFavoriteSelectSchema.optional(),
  include: RankFavoriteIncludeSchema.optional(),
  where: RankFavoriteWhereUniqueInputSchema,
}).strict() ;

export const RankFavoriteUpdateArgsSchema: z.ZodType<Prisma.RankFavoriteUpdateArgs> = z.object({
  select: RankFavoriteSelectSchema.optional(),
  include: RankFavoriteIncludeSchema.optional(),
  data: z.union([ RankFavoriteUpdateInputSchema,RankFavoriteUncheckedUpdateInputSchema ]),
  where: RankFavoriteWhereUniqueInputSchema,
}).strict() ;

export const RankFavoriteUpdateManyArgsSchema: z.ZodType<Prisma.RankFavoriteUpdateManyArgs> = z.object({
  data: z.union([ RankFavoriteUpdateManyMutationInputSchema,RankFavoriteUncheckedUpdateManyInputSchema ]),
  where: RankFavoriteWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const RankFavoriteUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.RankFavoriteUpdateManyAndReturnArgs> = z.object({
  data: z.union([ RankFavoriteUpdateManyMutationInputSchema,RankFavoriteUncheckedUpdateManyInputSchema ]),
  where: RankFavoriteWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const RankFavoriteDeleteManyArgsSchema: z.ZodType<Prisma.RankFavoriteDeleteManyArgs> = z.object({
  where: RankFavoriteWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SoftwareLikeCreateArgsSchema: z.ZodType<Prisma.SoftwareLikeCreateArgs> = z.object({
  select: SoftwareLikeSelectSchema.optional(),
  include: SoftwareLikeIncludeSchema.optional(),
  data: z.union([ SoftwareLikeCreateInputSchema,SoftwareLikeUncheckedCreateInputSchema ]),
}).strict() ;

export const SoftwareLikeUpsertArgsSchema: z.ZodType<Prisma.SoftwareLikeUpsertArgs> = z.object({
  select: SoftwareLikeSelectSchema.optional(),
  include: SoftwareLikeIncludeSchema.optional(),
  where: SoftwareLikeWhereUniqueInputSchema,
  create: z.union([ SoftwareLikeCreateInputSchema,SoftwareLikeUncheckedCreateInputSchema ]),
  update: z.union([ SoftwareLikeUpdateInputSchema,SoftwareLikeUncheckedUpdateInputSchema ]),
}).strict() ;

export const SoftwareLikeCreateManyArgsSchema: z.ZodType<Prisma.SoftwareLikeCreateManyArgs> = z.object({
  data: z.union([ SoftwareLikeCreateManyInputSchema,SoftwareLikeCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SoftwareLikeCreateManyAndReturnArgsSchema: z.ZodType<Prisma.SoftwareLikeCreateManyAndReturnArgs> = z.object({
  data: z.union([ SoftwareLikeCreateManyInputSchema,SoftwareLikeCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SoftwareLikeDeleteArgsSchema: z.ZodType<Prisma.SoftwareLikeDeleteArgs> = z.object({
  select: SoftwareLikeSelectSchema.optional(),
  include: SoftwareLikeIncludeSchema.optional(),
  where: SoftwareLikeWhereUniqueInputSchema,
}).strict() ;

export const SoftwareLikeUpdateArgsSchema: z.ZodType<Prisma.SoftwareLikeUpdateArgs> = z.object({
  select: SoftwareLikeSelectSchema.optional(),
  include: SoftwareLikeIncludeSchema.optional(),
  data: z.union([ SoftwareLikeUpdateInputSchema,SoftwareLikeUncheckedUpdateInputSchema ]),
  where: SoftwareLikeWhereUniqueInputSchema,
}).strict() ;

export const SoftwareLikeUpdateManyArgsSchema: z.ZodType<Prisma.SoftwareLikeUpdateManyArgs> = z.object({
  data: z.union([ SoftwareLikeUpdateManyMutationInputSchema,SoftwareLikeUncheckedUpdateManyInputSchema ]),
  where: SoftwareLikeWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SoftwareLikeUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.SoftwareLikeUpdateManyAndReturnArgs> = z.object({
  data: z.union([ SoftwareLikeUpdateManyMutationInputSchema,SoftwareLikeUncheckedUpdateManyInputSchema ]),
  where: SoftwareLikeWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SoftwareLikeDeleteManyArgsSchema: z.ZodType<Prisma.SoftwareLikeDeleteManyArgs> = z.object({
  where: SoftwareLikeWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SoftwareFavoriteCreateArgsSchema: z.ZodType<Prisma.SoftwareFavoriteCreateArgs> = z.object({
  select: SoftwareFavoriteSelectSchema.optional(),
  include: SoftwareFavoriteIncludeSchema.optional(),
  data: z.union([ SoftwareFavoriteCreateInputSchema,SoftwareFavoriteUncheckedCreateInputSchema ]),
}).strict() ;

export const SoftwareFavoriteUpsertArgsSchema: z.ZodType<Prisma.SoftwareFavoriteUpsertArgs> = z.object({
  select: SoftwareFavoriteSelectSchema.optional(),
  include: SoftwareFavoriteIncludeSchema.optional(),
  where: SoftwareFavoriteWhereUniqueInputSchema,
  create: z.union([ SoftwareFavoriteCreateInputSchema,SoftwareFavoriteUncheckedCreateInputSchema ]),
  update: z.union([ SoftwareFavoriteUpdateInputSchema,SoftwareFavoriteUncheckedUpdateInputSchema ]),
}).strict() ;

export const SoftwareFavoriteCreateManyArgsSchema: z.ZodType<Prisma.SoftwareFavoriteCreateManyArgs> = z.object({
  data: z.union([ SoftwareFavoriteCreateManyInputSchema,SoftwareFavoriteCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SoftwareFavoriteCreateManyAndReturnArgsSchema: z.ZodType<Prisma.SoftwareFavoriteCreateManyAndReturnArgs> = z.object({
  data: z.union([ SoftwareFavoriteCreateManyInputSchema,SoftwareFavoriteCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SoftwareFavoriteDeleteArgsSchema: z.ZodType<Prisma.SoftwareFavoriteDeleteArgs> = z.object({
  select: SoftwareFavoriteSelectSchema.optional(),
  include: SoftwareFavoriteIncludeSchema.optional(),
  where: SoftwareFavoriteWhereUniqueInputSchema,
}).strict() ;

export const SoftwareFavoriteUpdateArgsSchema: z.ZodType<Prisma.SoftwareFavoriteUpdateArgs> = z.object({
  select: SoftwareFavoriteSelectSchema.optional(),
  include: SoftwareFavoriteIncludeSchema.optional(),
  data: z.union([ SoftwareFavoriteUpdateInputSchema,SoftwareFavoriteUncheckedUpdateInputSchema ]),
  where: SoftwareFavoriteWhereUniqueInputSchema,
}).strict() ;

export const SoftwareFavoriteUpdateManyArgsSchema: z.ZodType<Prisma.SoftwareFavoriteUpdateManyArgs> = z.object({
  data: z.union([ SoftwareFavoriteUpdateManyMutationInputSchema,SoftwareFavoriteUncheckedUpdateManyInputSchema ]),
  where: SoftwareFavoriteWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SoftwareFavoriteUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.SoftwareFavoriteUpdateManyAndReturnArgs> = z.object({
  data: z.union([ SoftwareFavoriteUpdateManyMutationInputSchema,SoftwareFavoriteUncheckedUpdateManyInputSchema ]),
  where: SoftwareFavoriteWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SoftwareFavoriteDeleteManyArgsSchema: z.ZodType<Prisma.SoftwareFavoriteDeleteManyArgs> = z.object({
  where: SoftwareFavoriteWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const RankCommentCreateArgsSchema: z.ZodType<Prisma.RankCommentCreateArgs> = z.object({
  select: RankCommentSelectSchema.optional(),
  include: RankCommentIncludeSchema.optional(),
  data: z.union([ RankCommentCreateInputSchema,RankCommentUncheckedCreateInputSchema ]),
}).strict() ;

export const RankCommentUpsertArgsSchema: z.ZodType<Prisma.RankCommentUpsertArgs> = z.object({
  select: RankCommentSelectSchema.optional(),
  include: RankCommentIncludeSchema.optional(),
  where: RankCommentWhereUniqueInputSchema,
  create: z.union([ RankCommentCreateInputSchema,RankCommentUncheckedCreateInputSchema ]),
  update: z.union([ RankCommentUpdateInputSchema,RankCommentUncheckedUpdateInputSchema ]),
}).strict() ;

export const RankCommentCreateManyArgsSchema: z.ZodType<Prisma.RankCommentCreateManyArgs> = z.object({
  data: z.union([ RankCommentCreateManyInputSchema,RankCommentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const RankCommentCreateManyAndReturnArgsSchema: z.ZodType<Prisma.RankCommentCreateManyAndReturnArgs> = z.object({
  data: z.union([ RankCommentCreateManyInputSchema,RankCommentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const RankCommentDeleteArgsSchema: z.ZodType<Prisma.RankCommentDeleteArgs> = z.object({
  select: RankCommentSelectSchema.optional(),
  include: RankCommentIncludeSchema.optional(),
  where: RankCommentWhereUniqueInputSchema,
}).strict() ;

export const RankCommentUpdateArgsSchema: z.ZodType<Prisma.RankCommentUpdateArgs> = z.object({
  select: RankCommentSelectSchema.optional(),
  include: RankCommentIncludeSchema.optional(),
  data: z.union([ RankCommentUpdateInputSchema,RankCommentUncheckedUpdateInputSchema ]),
  where: RankCommentWhereUniqueInputSchema,
}).strict() ;

export const RankCommentUpdateManyArgsSchema: z.ZodType<Prisma.RankCommentUpdateManyArgs> = z.object({
  data: z.union([ RankCommentUpdateManyMutationInputSchema,RankCommentUncheckedUpdateManyInputSchema ]),
  where: RankCommentWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const RankCommentUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.RankCommentUpdateManyAndReturnArgs> = z.object({
  data: z.union([ RankCommentUpdateManyMutationInputSchema,RankCommentUncheckedUpdateManyInputSchema ]),
  where: RankCommentWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const RankCommentDeleteManyArgsSchema: z.ZodType<Prisma.RankCommentDeleteManyArgs> = z.object({
  where: RankCommentWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;