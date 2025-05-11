"use client"

import { Heart } from "lucide-react"
import type { FC } from "react"
import { Button } from "~/components/ui/button"
import { Card, CardContent } from "~/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"

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

const mockTools: Record<string, ToolItem[]> = {
  llms: [
    {
      id: "gpt-4-1",
      name: "GPT-4",
      description: "A large multimodal model developed by OpenAI",
      likes: 12000,
      image: "/gpt4.png"
    },
    {
      id: "gpt-4-2",
      name: "GPT-4",
      description: "A large multimodal model developed by OpenAI",
      likes: 12000,
      image: "/gpt4.png"
    },
    {
      id: "gpt-4-3",
      name: "GPT-4",
      description: "A large multimodal model developed by OpenAI",
      likes: 12000,
      image: "/gpt4.png"
    },
    {
      id: "gpt-4-4",
      name: "GPT-4",
      description: "A large multimodal model developed by OpenAI",
      likes: 12000,
      image: "/gpt4.png"
    },
    {
      id: "gpt-4-5",
      name: "GPT-4",
      description: "A large multimodal model developed by OpenAI",
      likes: 12000,
      image: "/gpt4.png"
    },
    {
      id: "gpt-4-6",
      name: "GPT-4",
      description: "A large multimodal model developed by OpenAI",
      likes: 12000,
      image: "/gpt4.png"
    }
  ],
  agents: [],
  frameworks: [],
  rag: [],
  video: [],
  mcp: []
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

const ToolCard: FC<{ tool: ToolItem }> = ({ tool }) => {
  return (
    <div className="flex items-center justify-between border-b py-4">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <img src={tool.image} alt={tool.name} className="h-8 w-8" />
        </div>
        <div>
          <h3 className="font-bold">{tool.name}</h3>
          <p className="text-sm text-gray-600">{tool.description}</p>
        </div>
      </div>
      <button className="flex items-center gap-1 text-primary">
        <Heart className="size-5" />
        <span>{tool.likes > 1000 ? `${Math.floor(tool.likes / 1000)}K` : tool.likes}</span>
      </button>
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

const TopTools = () => {
  return (
    <>
      <h1 className="mt-20 text-4xl font-bold">Top Tools</h1>
      <div className="flex flex-row mx-auto py-8 w-full gap-28">
        <div className="flex-1">
          <Tabs defaultValue="llms">
            <TabsList className="mb-6">
              <TabsTrigger value="llms" className="text-primary">
                LLMS
              </TabsTrigger>
              <TabsTrigger value="agents">AI Agents</TabsTrigger>
              <TabsTrigger value="frameworks">AgentFrameworks</TabsTrigger>
              <TabsTrigger value="rag">RAG</TabsTrigger>
              <TabsTrigger value="video">Video</TabsTrigger>
              <TabsTrigger value="mcp">MCP</TabsTrigger>
            </TabsList>

            {Object.keys(mockTools).map((category) => (
              <TabsContent key={category} value={category}>
                <h2 className="mb-4 text-2xl font-bold text-primary">Top Tools in {category.toUpperCase()}</h2>
                <div className="space-y-2">
                  {mockTools[category]?.map((tool) => (
                    <ToolCard key={tool.id} tool={tool} />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
        <div className="space-y-4 min-w-[330px]">
          <div>
            <h2 className="mb-4 text-2xl font-bold text-primary">Community Pulse</h2>
            <div className="space-y-4 divide-y">
              {communityPosts.map((post) => (
                <CommunityPost key={post.id} post={post} />
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-bold text-primary">Recently Added Tools</h2>
            <div className="space-y-2">
              {recentTools.map((tool) => (
                <div key={tool.id} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2 text-sm font-bold">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                      <img src={tool.image} alt={tool.name} className="h-6 w-6" />
                    </div>
                    <span>{tool.name}</span>
                  </div>
                  <span className="text-sm text-gray-500">3 days ago</span>
                </div>
              ))}
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-bold text-primary">Top Contributors</h2>
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
      </div>
    </>
  )
}

export default TopTools
