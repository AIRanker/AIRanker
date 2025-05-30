"use client"

import { useAuth, useClerk } from "@clerk/nextjs"
import { formatDistanceToNow } from "date-fns"
import { Heart, MessageCircle, Share2, Star } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { type FC, useEffect, useMemo, useState } from "react"
import { toast } from "sonner"
import { ToolDialog } from "~/app/_components/tool-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Button } from "~/components/ui/button"
import { Skeleton } from "~/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { cn } from "~/lib/utils"
import type { Pageable } from "~/server/schema"
import type { PageSoftwareResult } from "~/server/services/software"
import { api } from "~/trpc/react"

interface ToolItem {
  id: string
  name: string
  description: string
  likes: number
  image: string
}

interface CommunityPost {
  id: string
  author: string
  content: string
  likes: number
  comments: number
  date: string
  avatar: string
}

interface ContributorItem {
  id: string
  username: string
  points: number
}

const communityPosts: CommunityPost[] = [
  {
    id: "post1",
    author: "@AliceDev",
    content: "Curated list of the best AI SDKs, APIs...",
    likes: 128,
    comments: 7,
    date: "3 days ago",
    avatar: "/avatar.png"
  },
  {
    id: "post2",
    author: "@AliceDev",
    content: "Curated list of the best AI SDKs, APIs...",
    likes: 128,
    comments: 7,
    date: "3 days ago",
    avatar: "/avatar.png"
  },
  {
    id: "post3",
    author: "@AliceDev",
    content: "Curated list of the best AI SDKs, APIs...",
    likes: 128,
    comments: 7,
    date: "3 days ago",
    avatar: "/avatar.png"
  }
]

const recentTools: ToolItem[] = [
  {
    id: "recent1",
    name: "GPT-4",
    description: "",
    likes: 0,
    image: "/gpt4.png"
  },
  {
    id: "recent2",
    name: "GPT-4",
    description: "",
    likes: 0,
    image: "/gpt4.png"
  },
  {
    id: "recent3",
    name: "GPT-4",
    description: "",
    likes: 0,
    image: "/gpt4.png"
  }
]

const contributors: ContributorItem[] = [
  {
    id: "contrib1",
    username: "@kai",
    points: 148
  },
  {
    id: "contrib2",
    username: "@kai",
    points: 148
  },
  {
    id: "contrib3",
    username: "@kai",
    points: 148
  }
]

const ToolCard: FC<{ tool: PageSoftwareResult["list"][number] }> = ({ tool }) => {
  const { isSignedIn } = useAuth()
  const { openSignIn } = useClerk()
  const useUtils = api.useUtils()
  const [dialogOpen, setDialogOpen] = useState(false)
  const router = useRouter()
  const { mutate: starMutate } = api.software.fav.useMutation({
    onSuccess: () => {
      router.refresh()
      void useUtils.software.getSoftwaresByRankId.refetch()
    },
    onError: (error) => {
      console.error(error)
      toast.error("Failed to star the tool", { duration: 3000 })
    }
  })
  const { mutate: likeMutate } = api.software.like.useMutation({
    onSuccess: () => {
      router.refresh()
      void useUtils.software.getSoftwaresByRankId.refetch()
    },
    onError: (error) => {
      console.error(error)
      toast.error("Failed to like the tool", { duration: 3000 })
    }
  })
  return (
    <div className="flex items-center justify-between border-b py-4">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <Avatar className={"size-8"}>
            <AvatarImage src={tool.image ?? ""} />
            <AvatarFallback>{tool.name[0]}</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex-1">
          <Link className="font-bold cursor-pointer w-fit" href={`/tool/${tool.id}`}>
            {tool.name}
          </Link>
          <p className="text-sm text-gray-600 line-clamp-3">{tool.description}</p>
        </div>
      </div>
      <div className="flex items-center gap-4 z-20">
        <div className="flex items-center gap-1">
          <Star
            className={cn("cursor-pointer text-primary hover:scale-125 hover:fill-yellow-400 hover:text-yellow-400 transition", tool.isStared && "text-yellow-400 fill-yellow-400")}
            onClick={(event) => {
              if (!isSignedIn) {
                void openSignIn()
              } else {
                starMutate({ softwareId: tool.id })
              }
              event.preventDefault()
              event.stopPropagation()
            }}
          />
          <span className="text-sm font-medium">{tool._count.likes ?? 0}</span>
        </div>
        <div className="flex items-center gap-1">
          <Heart
            className={cn(" cursor-pointer text-primary hover:scale-125 hover:fill-red-400 hover:text-red-400 transition", tool.isLiked && "text-red-400 fill-red-400")}
            onClick={(event) => {
              if (!isSignedIn) {
                void openSignIn()
              } else {
                likeMutate({ softwareId: tool.id })
              }
              event.preventDefault()
              event.stopPropagation()
            }}
          />
          <span className="text-sm font-medium">{tool._count.stars ?? 0}</span>
        </div>
      </div>
      <ToolDialog tool={tool} open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  )
}

const CommunityPost: FC<{ post: CommunityPost }> = ({ post }) => {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-purple-600" />
        <span className="font-semibold">{post.author}</span>
      </div>
      <p className="my-1 text-sm text-gray-700">{post.content}</p>
      <div className="flex items-center gap-4 text-sm text-gray-500">
        <span>{post.date}</span>
        <div className="flex items-center gap-1">
          <span>👍</span>
          <span>{post.likes}</span>
        </div>
        <div className="flex items-center gap-1">
          <span>💬</span>
          <span>{post.comments}</span>
        </div>
      </div>
    </div>
  )
}

interface Condition {
  currentCategory: string
  pageable: Pageable
}

const TopTools = () => {
  const { data: category, isPending: categoryPending } = api.softwareCategory.all.useQuery(undefined, {
    refetchInterval: false,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: false
  })
  const [condition, setCondition] = useState<Condition>({
    currentCategory: "",
    pageable: {
      page: 0,
      size: 10
    }
  })
  useEffect(() => {
    if (category) {
      const firstElement = category[0]
      if (firstElement) {
        setCondition({ ...condition, currentCategory: firstElement.id })
      }
    }
  }, [category])
  const { data, isPending } = api.software.pageSoftwares.useQuery(
    {
      categoryIds: [condition.currentCategory],
      sort: "stars",
      pageable: {
        page: condition.pageable.page ?? 0,
        size: condition.pageable.size ?? 10
      }
    },
    {
      enabled: condition.currentCategory.trim().length > 0
    }
  )
  const { data: recentlySoftware, isPending: recentlyPending } = api.software.recentlySoftwares.useQuery()
  const { data: userData, isPending: userPending } = api.user.topContributors.useQuery()
  return (
    <>
      <h1 className="mt-20 text-4xl font-bold">Top Tools</h1>
      <div className="flex flex-row mx-auto py-8 w-full gap-28">
        <div className="flex-1">
          {categoryPending && (
            <div className={"flex flex-row gap-4"}>
              {Array(4)
                .fill(0)
                .map((_, index) => (
                  <Skeleton className={"w-32 h-8"} key={`category-${index}`} />
                ))}
            </div>
          )}
          <Tabs value={condition.currentCategory} onValueChange={(c) => setCondition({ ...condition, currentCategory: c })} className={"flex flex-col"}>
            <TabsList className="flex shrink-0 border-b border-mauve6">
              {category?.map((item) => (
                <TabsTrigger
                  value={item.id}
                  className={cn(
                    "flex bg-none shadow-none select-none items-center justify-center data-[state=active]:border-primary cursor-pointer text-lg mr-4",
                    "data-[state=active]:text-primary data-[state=active]:font-bold data-[state=active]:border-b-2 data-[state=active]:bg-none data-[state=active]:shadow-none"
                  )}
                  key={`category-${item.id}`}
                >
                  {item.name}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="space-y-2">
              {!isPending && data?.list?.map((tool) => <ToolCard key={tool.id} tool={tool} />)}
              {isPending &&
                Array(10)
                  .fill(0)
                  .map((_, index) => (
                    <div key={`skeleton-${index}`} className="flex items-center justify-between border-b py-4">
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="flex-1">
                          <Skeleton className="h-5 w-32 mb-2" />
                          <Skeleton className="h-4 w-96" />
                          <Skeleton className="h-4 w-3/4 mt-1" />
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Skeleton className="h-6 w-12" />
                        <Skeleton className="h-6 w-12" />
                      </div>
                    </div>
                  ))}
            </div>
          </Tabs>
        </div>
        <div className="space-y-4 min-w-[330px] flex flex-col">
          <h2 className="mb-4 text-2xl font-bold text-primary">Recently Added Tools</h2>
          <div className="space-y-2">
            {recentlySoftware?.map((tool) => (
              <div key={tool.id} className="flex items-center justify-between py-2 gap-4 w-full">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                  <Avatar className={"size-5"}>
                    <AvatarImage src={tool.image ?? ""} />
                    <AvatarFallback>{tool.name[0]}</AvatarFallback>
                  </Avatar>
                </div>
                <div className={"flex flex-col flex-1"}>
                  <Link href={`/tool/${tool.id}`} className={"line-clamp-1 cursor-pointer"}>
                    {tool.name}
                  </Link>
                  <span className={"line-clamp-1 font-normal text-foreground/50 text-sm"}>{tool.description}</span>
                </div>
                <div className="text-sm text-gray-500">{formatDistanceToNow(tool.createdAt)} ago</div>
              </div>
            ))}
            {recentlyPending &&
              Array(5)
                .fill(0)
                .map((_, index) => (
                  <div key={`recent-skeleton-${index}`} className="flex items-center justify-between py-2 gap-4 w-full">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <div className="flex flex-col flex-1">
                      <Skeleton className="h-4 w-24 mb-1" />
                      <Skeleton className="h-3 w-full" />
                    </div>
                    <Skeleton className="h-4 w-16" />
                  </div>
                ))}
          </div>

          <div className={"flex-1"}>
            <h2 className="mt-4 mb-4 text-2xl font-bold text-primary">Top Contributors</h2>
            <div className="space-y-2">
              {!userPending &&
                userData?.map((contributor) => (
                  <div key={contributor.id} className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2">
                      <Avatar className={"size-5"}>
                        <AvatarImage src={contributor.info?.imageUrl ?? ""} />
                        <AvatarFallback>{contributor.info?.username?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>{contributor.info?.username}</span>
                      {/*<span className="text-sm text-gray-500">{contributor} points</span>*/}
                    </div>
                    <div className="flex items-center gap-1 text-primary">
                      <span>{formatDistanceToNow(new Date(contributor.info?.lastSignInAt ?? new Date()))}</span>
                    </div>
                  </div>
                ))}
              {userPending &&
                Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <div key={`user-skeleton-${index}`} className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-5 w-5 rounded-full" />
                        <Skeleton className="h-4 w-36" />
                      </div>
                      <Skeleton className="h-4 w-20" />
                    </div>
                  ))}
            </div>
          </div>

          <div className="py-6">
            <h2 className="mb-2 text-2xl font-bold text-primary">Got an AI tool to share?</h2>
            <p className="mb-4">You can submit and promote your own toolhere.</p>
            <Button className="w-full">Submit your tool</Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default TopTools
