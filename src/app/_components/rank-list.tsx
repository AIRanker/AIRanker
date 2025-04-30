"use client"

import { Heart, Star } from "lucide-react"
import Link from "next/link"
import type { FC } from "react"
import { toast } from "sonner"
import { useAuth } from "~/components/auth/auth-context"
import { cn } from "~/lib/utils"
import type { TopRanksResult } from "~/server/services/rank"
import { api } from "~/trpc/react"

interface TopRankedProps {
  title?: string
  className?: string
}

export const RankList: FC<TopRankedProps> = ({ title = "Top Ranked", className }) => {
  const { data } = api.rank.topRanks.useQuery()

  const { isAuthenticated, openDialog } = useAuth()
  const useUtils = api.useUtils()
  const { mutate: starMutate } = api.rank.star.useMutation({
    onSuccess: () => {
      void useUtils.rank.topRanks.refetch()
    },
    onError: (error) => {
      console.error(error)
      toast.error("Failed to star the rank", { duration: 3000 })
    }
  })
  const { mutate: likeMutate } = api.rank.like.useMutation({
    onSuccess: () => {
      void useUtils.rank.topRanks.refetch()
    },
    onError: (error) => {
      console.error(error)
      toast.error("Failed to like the rank", { duration: 3000 })
    }
  })
  console.log(data)
  return (
    <div className={className}>
      <h2 className="text-2xl font-bold text-primary mb-4">{title}</h2>
      <div className="space-y-4">
        {(data ?? []).map((item, index) => (
          <div key={`rank-list-${item.name}-${index}`} className="rounded-sm border border-primary bg-card p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              {/*<div className="flex-shrink-0">*/}
              {/*  <Image src={item.} alt={item.title} width={48} height={48} className="rounded-full" />*/}
              {/*</div>*/}
              <div className="flex-grow">
                <Link className="text-lg font-bold" href={`/rank/${item.id}`}>
                  {item.name ?? "Unnames Rank"}
                </Link>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star
                    className={cn(
                      "cursor-pointer text-primary hover:scale-125 hover:fill-yellow-400 hover:text-yellow-400 transition",
                      item.isStared && "text-yellow-400 fill-yellow-400"
                    )}
                    onClick={(event) => {
                      if (!isAuthenticated) {
                        void openDialog()
                      } else {
                        starMutate({ rankId: item.id })
                      }
                      event.preventDefault()
                      event.stopPropagation()
                    }}
                  />
                  <span className="text-sm font-medium">{item.likes ?? 0}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart
                    className={cn("cursor-pointer text-primary hover:scale-125 hover:fill-red-400 hover:text-red-400 transition", item.isLiked && "text-red-400 fill-red-400")}
                    onClick={(event) => {
                      if (!isAuthenticated) {
                        void openDialog()
                      } else {
                        likeMutate({ rankId: item.id })
                      }
                      event.preventDefault()
                      event.stopPropagation()
                    }}
                  />
                  <span className="text-sm font-medium">{item.stars ?? 0}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
