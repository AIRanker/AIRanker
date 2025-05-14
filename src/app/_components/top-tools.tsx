"use client"

import { Heart } from "lucide-react"
import { type FC, useEffect, useMemo, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Button } from "~/components/ui/button"
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
          <h3 className="font-bold">{tool.name}</h3>
          <p className="text-sm text-gray-600 line-clamp-3">{tool.description}</p>
        </div>
      </div>
      <div className="flex items-center gap-1 text-primary ml-4">
        <Heart className="size-5" />
        <span>{tool._count.likes > 1000 ? `${Math.floor(tool._count.likes / 1000)}K` : tool._count.likes}</span>
      </div>
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
  const currentCategory = useMemo(() => {
    return category?.find((item) => item.id === condition.currentCategory)
  }, [condition])
  console.log("data", data)
  const { data: recentlySoftware } = api.software.recentlySoftwares.useQuery()
  return (
    <>
      <h1 className="mt-20 text-4xl font-bold">Top Tools</h1>
      <div className="flex flex-row mx-auto py-8 w-full gap-28">
        <div className="flex-1">
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
              {data?.list?.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </Tabs>
        </div>
        <div className="space-y-4 min-w-[330px] flex flex-col">
          {/*<div>*/}
          {/*  <h2 className="mb-4 text-2xl font-bold text-primary">Community Pulse</h2>*/}
          {/*  <div className="space-y-4 divide-y">*/}
          {/*    {communityPosts.map((post) => (*/}
          {/*      <CommunityPost key={post.id} post={post} />*/}
          {/*    ))}*/}
          {/*  </div>*/}
          {/*</div>*/}
          <h2 className="mb-4 text-2xl font-bold text-primary">Recently Added Tools</h2>
          <div className="space-y-2">
            {recentlySoftware?.map((tool) => (
              <div key={tool.id} className="flex items-center justify-between py-2 gap-4">
                <div className="flex items-center gap-2 text-sm font-bold">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                    <Avatar className={"size-5"}>
                      <AvatarImage src={tool.image ?? ""} />
                      <AvatarFallback>{tool.name[0]}</AvatarFallback>
                    </Avatar>
                  </div>
                  <span className={"truncate"}>{tool.name}</span>
                </div>
                <span className="text-sm text-gray-500">3 days ago</span>
              </div>
            ))}
          </div>

          <div className={"flex-1"}>
            <h2 className="mt-4 mb-4 text-2xl font-bold text-primary">Top Contributors</h2>
            <div className="space-y-2">
              {contributors.map((contributor) => (
                <div key={contributor.id} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100" />
                    <span>{contributor.username}</span>
                    <span className="text-sm text-gray-500">{contributor.points} points</span>
                  </div>
                  <button className="flex items-center gap-1 text-primary">
                    <Heart className="size-4" />
                    <span>{contributor.points}</span>
                  </button>
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
