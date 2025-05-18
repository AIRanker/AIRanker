"use client"

import { useAuth, useClerk } from "@clerk/nextjs"
import { Heart, MessageCircle, Share2, Star } from "lucide-react"
import { toast } from "sonner"
import { cn } from "~/lib/utils"
import { api } from "~/trpc/react"

const SoftwareAction = ({ item, className }: { item: { id: string; _count: { likes: number; stars: number; comments: number } }; className?: string }) => {
  const { isSignedIn } = useAuth()
  const { openSignIn } = useClerk()
  const useUtils = api.useUtils()
  const { mutate: starMutate } = api.software.fav.useMutation({
    onSuccess: () => {
      void useUtils.software.getSoftwaresByRankId.refetch()
    },
    onError: (error) => {
      console.error(error)
      toast.error("Failed to star the rank", { duration: 3000 })
    }
  })
  const { mutate: likeMutate } = api.software.like.useMutation({
    onSuccess: () => {
      void useUtils.software.getSoftwaresByRankId.refetch()
    },
    onError: (error) => {
      console.error(error)
      toast.error("Failed to like the rank", { duration: 3000 })
    }
  })
  return (
    <div className="flex items-center gap-4 z-20">
      <div className="flex items-center gap-1">
        <Star
          className={cn("cursor-pointer text-primary hover:scale-125 hover:fill-yellow-400 hover:text-yellow-400 transition", className)}
          onClick={(event) => {
            if (!isSignedIn) {
              void openSignIn()
            } else {
              starMutate({ softwareId: item.id })
            }
            event.preventDefault()
            event.stopPropagation()
          }}
        />
        <span className="text-sm font-medium">{item._count.likes ?? 0}</span>
      </div>
      <div className="flex items-center gap-1">
        <Heart
          className={cn(" cursor-pointer text-primary hover:scale-125 hover:fill-red-400 hover:text-red-400 transition", className)}
          onClick={(event) => {
            if (!isSignedIn) {
              void openSignIn()
            } else {
              likeMutate({ softwareId: item.id })
            }
            event.preventDefault()
            event.stopPropagation()
          }}
        />
        <span className="text-sm font-medium">{item._count.stars ?? 0}</span>
      </div>
      <div className="flex items-center gap-1">
        <MessageCircle
          className={cn("cursor-pointer text-primary hover:scale-125 hover:fill-green-400 hover:text-green-400 transition", className)}
          onClick={(event) => {
            if (!isSignedIn) {
              void openSignIn()
            } else {
              likeMutate({ softwareId: item.id })
            }
            event.preventDefault()
            event.stopPropagation()
          }}
        />
        <span className="text-sm font-medium">{item._count.comments ?? 0}</span>
      </div>
      <div>
        <Share2 className={"cursor-pointer text-primary hover:scale-125 hover:fill-blue-400 hover:text-blue-400 transition"} />
      </div>
    </div>
  )
}

export default SoftwareAction
