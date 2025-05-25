"use client"
import { formatDistanceToNow } from "date-fns"
import { BarChart3Icon, BookmarkIcon, HeartIcon, Star, TrophyIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Avatar } from "~/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Skeleton } from "~/components/ui/skeleton"
import type { PageRankResult } from "~/server/services/rank"
import { api } from "~/trpc/react"

const RankListSkeleton = () => (
  <div className="divide-y">
    {Array(3)
      .fill(0)
      .map((_, i) => (
        <div key={i} className="py-6 first:pt-0 last:pb-0">
          <div className="flex items-start gap-4">
            <div className="flex-1 space-y-1">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/4" />
            </div>
            <div className="flex items-center gap-1">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-4 w-4" />
            </div>
          </div>
        </div>
      ))}
  </div>
)

const RankList = ({ ranks, icon }: { ranks: PageRankResult["list"]; icon: string }) => (
  <div className="divide-y">
    {ranks.map((rank) => (
      <div key={rank.id} className="py-6 first:pt-0 last:pb-0">
        <Link href={`/rank/${rank.id}`} className="flex items-start gap-4 hover:opacity-90 transition-opacity">
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <Link href={`/rank/${rank.id}`} className="font-semibold text-primary">
                {rank.name}
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">{formatDistanceToNow(rank.createdAt)}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              {icon === "heart" ? <HeartIcon className="h-5 w-5 text-primary fill-primary" /> : <Star className="h-5 w-5 text-primary fill-primary" />}
              <span className="text-sm text-muted-foreground">{rank._count.likes}</span>
            </div>
          </div>
        </Link>
      </div>
    ))}
  </div>
)

const LikeStar = () => {
  const { data: likeData, isPending: likePending } = api.rank.pageRanks.useQuery({
    pageable: { page: 0, size: 20 },
    isLiked: true
  })
  const { data: starData, isPending: starPending } = api.rank.pageRanks.useQuery({
    pageable: { page: 0, size: 20 },
    isStared: true
  })
  return (
    <div className="space-y-10">
      {/* Likes Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">Liked Rankings</CardTitle>
        </CardHeader>
        <CardContent>{likePending ? <RankListSkeleton /> : <RankList ranks={likeData?.list ?? []} icon="heart" />}</CardContent>
      </Card>

      {/* Star Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">Stared Rankings</CardTitle>
        </CardHeader>
        <CardContent>{starPending ? <RankListSkeleton /> : <RankList ranks={starData?.list ?? []} icon="bookmark" />}</CardContent>
      </Card>
    </div>
  )
}

export default LikeStar
