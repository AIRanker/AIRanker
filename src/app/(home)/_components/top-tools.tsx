"use client"

import { useAuth, useClerk } from "@clerk/nextjs"
import { formatDistanceToNow } from "date-fns"
import { Heart, MessageCircle, Share2, Star } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { type FC, useEffect, useMemo, useState } from "react"
import { toast } from "sonner"
import { ToolDialog } from "~/app/(home)/_components/tool-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Button } from "~/components/ui/button"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "~/components/ui/pagination"
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
  useEffect(() => {
    if (category) {
      const firstElement = category[0]
      if (firstElement) {
        setCondition({
          currentCategory: firstElement.id,
          pageable: {
            page: 0,
            size: 10
          }
        })
      }
    }
  }, [category])
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
          <Tabs
            value={condition.currentCategory}
            onValueChange={(c) => setCondition({ ...condition, currentCategory: c, pageable: { page: 0, size: condition.pageable.size } })}
            className={"flex flex-col"}
          >
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
              {!isPending && (!data?.list || data.list.length === 0) && (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="text-gray-400 mb-2">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <title>No Data</title>
                      <path
                        d="M3 6C3 4.34315 4.34315 3 6 3H18C19.6569 3 21 4.34315 21 6V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V6Z"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path d="M9 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <span className="text-gray-500">No tools found in this category</span>
                </div>
              )}
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
            {!isPending && data && (
              <Pagination className="mt-4">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() =>
                        setCondition({
                          ...condition,
                          pageable: {
                            ...condition.pageable,
                            page: Math.max(0, (condition.pageable.page ?? 0) - 1)
                          }
                        })
                      }
                      className={cn((condition.pageable.page ?? 0) <= 0 && "pointer-events-none opacity-50")}
                    />
                  </PaginationItem>

                  {Array.from({ length: data.pages }, (_, i) => i).map((page) => {
                    // 显示当前页码前后各1页，以及首尾页
                    const currentPage = condition.pageable.page ?? 0
                    const shouldShowPage = page === 0 || page === data.pages - 1 || Math.abs(page - currentPage) <= 1

                    // 显示省略号的条件
                    const showEllipsisBefore = page === 1 && currentPage > 2
                    const showEllipsisAfter = page === data.pages - 2 && currentPage < data.pages - 3

                    if (showEllipsisBefore) {
                      return (
                        <PaginationItem key={"ellipsis-before"}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      )
                    }

                    if (showEllipsisAfter) {
                      return (
                        <PaginationItem key={"ellipsis-after"}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      )
                    }

                    if (shouldShowPage) {
                      return (
                        <PaginationItem key={page}>
                          <PaginationLink
                            isActive={page === (condition.pageable.page ?? 0)}
                            onClick={() =>
                              setCondition({
                                ...condition,
                                pageable: {
                                  ...condition.pageable,
                                  page
                                }
                              })
                            }
                          >
                            {page + 1}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    }

                    return null
                  })}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        setCondition({
                          ...condition,
                          pageable: {
                            ...condition.pageable,
                            page: Math.min(data.pages - 1, (condition.pageable.page ?? 0) + 1)
                          }
                        })
                      }
                      className={cn((condition.pageable.page ?? 0) >= data.pages - 1 && "pointer-events-none opacity-50")}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
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
        </div>
      </div>
    </>
  )
}

export default TopTools
