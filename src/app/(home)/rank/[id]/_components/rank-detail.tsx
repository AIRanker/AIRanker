"use client"

import { useAuth, useClerk, useSignIn } from "@clerk/nextjs"
import { Heart, MessageCircle, Share2, Star } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { toast } from "sonner"
import { cn } from "~/lib/utils"
import type { RankDetailsResult } from "~/server/services/rank"
import { api } from "~/trpc/react"
interface RankDetailProps {
  detail: RankDetailsResult
  id: string
}
const RankDetail = ({ detail, id }: RankDetailProps) => {
  const { isSignedIn } = useAuth()
  const { openSignIn } = useClerk()
  const pathname = usePathname()
  const router = useRouter()
  const { mutate: starMutate } = api.rank.star.useMutation({
    onSuccess: () => {
      router.refresh()
    },
    onError: (error) => {
      console.error(error)
      toast.error("Failed to star the rank", { duration: 3000 })
    }
  })
  const { mutate: likeMutate } = api.rank.like.useMutation({
    onSuccess: () => {
      router.refresh()
    },
    onError: (error) => {
      console.error(error)
      toast.error("Failed to like the rank", { duration: 3000 })
    }
  })
  console.log('detail', detail)
  return (
    <div className="relative flex flex-col h-[40rem] py-20 w-full items-center  bg-white dark:bg-black">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
        )}
      />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black" />
      <p className="relative z-20 bg-gradient-to-b from-primary to-primary/40 bg-clip-text py-8 text-4xl font-bold text-transparent sm:text-7xl">{detail?.name}</p>
      {detail?.description && (
        <p className="relative z-20 bg-gradient-to-b from-primary to-primary/40 bg-clip-text py-4 text-2xl font-bold text-transparent sm:text-4xl">{detail.description}</p>
      )}
      <div className="flex items-center gap-4 z-20 mt-10">
        <div className="flex items-center gap-1">
          <Star
            className={cn(
              "cursor-pointer text-primary hover:scale-125 hover:fill-yellow-400 hover:text-yellow-400 transition",
              detail.isStared && "text-yellow-400 fill-yellow-400"
            )}
            onClick={(event) => {
              if (!isSignedIn) {
                void openSignIn()
              } else {
                starMutate({ rankId: id })
              }
              event.preventDefault()
              event.stopPropagation()
            }}
          />
          <span className="text-sm font-medium">{detail._count.likes ?? 0}</span>
        </div>
        <div className="flex items-center gap-1">
          <Heart
            className={cn(" cursor-pointer text-primary hover:scale-125 hover:fill-red-400 hover:text-red-400 transition", detail.isLiked && "text-red-400 fill-red-400")}
            onClick={(event) => {
              if (!isSignedIn) {
                void openSignIn()
              } else {
                likeMutate({ rankId: id })
              }
              event.preventDefault()
              event.stopPropagation()
            }}
          />
          <span className="text-sm font-medium">{detail._count.stars ?? 0}</span>
        </div>
        <div className="flex items-center gap-1">
          <MessageCircle
            className={cn(" cursor-pointer text-primary hover:scale-125 hover:fill-green-400 hover:text-green-400 transition")}
            onClick={(event) => {
              router.push(`${pathname}#comments`, { scroll: true })
              event.preventDefault()
              event.stopPropagation()
            }}
          />
          <span className="text-sm font-medium">{detail._count.stars ?? 0}</span>
        </div>
        <div>
          <Share2
            className={"cursor-pointer text-primary hover:scale-125 hover:fill-blue-400 hover:text-blue-400 transition"}
            onClick={(event) => {
              const shareUrl = encodeURIComponent(window.location.href)
              const shareText = encodeURIComponent(`Check out this collection: ${detail.name || "Amazing software"}`)
              window.open(`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`, "_blank")
              event.preventDefault()
              event.stopPropagation()
            }}
          />
        </div>
      </div>
      
    </div>
  )
}

export default RankDetail
