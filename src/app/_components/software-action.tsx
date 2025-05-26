"use client"

import { useAuth, useClerk, useSignIn } from "@clerk/nextjs"
import { Heart, MessageCircle, Share2, Star } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { toast } from "sonner"
import { cn } from "~/lib/utils"
import { api } from "~/trpc/react"

interface Props {
  item: {
    id: string
    name: string
    isLiked: boolean
    isStared: boolean
    _count: { likes: number; stars: number; comments: number }
  }
  comment?: boolean
  className?: string
}

const SoftwareAction = ({ item, className, comment = true }: Props) => {
  const { isSignedIn } = useAuth()
  const { openSignIn } = useClerk()
  const router = useRouter()
  const pathname = usePathname()
  const useUtils = api.useUtils()
  const { mutate: starMutate, isPending: starPending } = api.software.fav.useMutation({
    onSuccess: () => {
      router.refresh()
      void useUtils.software.getSoftwaresByRankId.refetch()
    },
    onError: (error) => {
      console.error(error)
      toast.error("Failed to star the rank", { duration: 3000 })
    }
  })
  const { mutate: likeMutate, isPending: likePending } = api.software.like.useMutation({
    onSuccess: () => {
      router.refresh()
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
          className={cn(
            "cursor-pointer text-primary hover:scale-125 hover:fill-yellow-400 hover:text-yellow-400 transition",
            item.isStared && "fill-yellow-400 text-yellow-400",
            starPending && "opacity-25 cursor-not-allowed",
            className
          )}
          onClick={(event) => {
            if (starPending) {
              return
            }
            if (!isSignedIn) {
              void openSignIn()
            } else {
              starMutate({ softwareId: item.id })
            }
            event.preventDefault()
            event.stopPropagation()
          }}
        />
        <span className="text-sm font-medium">{item._count.stars ?? 0}</span>
      </div>
      <div className="flex items-center gap-1">
        <Heart
          className={cn(
            " cursor-pointer text-primary hover:scale-125 hover:fill-red-400 hover:text-red-400 transition",
            item.isLiked && "fill-red-400 text-red-400",
            likePending && "opacity-25 cursor-not-allowed",
            className
          )}
          onClick={(event) => {
            if (likePending) {
              return
            }
            if (!isSignedIn) {
              void openSignIn()
            } else {
              likeMutate({ softwareId: item.id })
            }
            event.preventDefault()
            event.stopPropagation()
          }}
        />
        <span className="text-sm font-medium">{item._count.likes ?? 0}</span>
      </div>
      {comment && (
        <div className="flex items-center gap-1">
          <MessageCircle
            className={cn("cursor-pointer text-primary hover:scale-125 hover:fill-green-400 hover:text-green-400 transition", className)}
            onClick={(event) => {
              router.push(`${pathname}#comments`, { scroll: true })
              event.preventDefault()
              event.stopPropagation()
            }}
          />
          <span className="text-sm font-medium">{item._count.comments ?? 0}</span>
        </div>
      )}
      <div>
        <Share2
          className={"cursor-pointer text-primary hover:scale-125 hover:fill-blue-400 hover:text-blue-400 transition"}
          onClick={(event) => {
            const shareUrl = encodeURIComponent(window.location.href)
            const shareText = encodeURIComponent(`Check out this : ${item.name || "Amazing software"}`)
            window.open(`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`, "_blank")
            event.preventDefault()
            event.stopPropagation()
          }}
        />
      </div>
    </div>
  )
}

export default SoftwareAction
