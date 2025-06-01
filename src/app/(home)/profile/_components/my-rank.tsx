"use client"

import { formatDistanceToNow } from "date-fns"
import { BookmarkIcon, EyeIcon, HeartIcon, PencilIcon, StarIcon } from "lucide-react"
import Link from "next/link"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Skeleton } from "~/components/ui/skeleton"
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
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded" />
            </div>
          </div>
        </div>
      ))}
  </div>
)

const MyRank = () => {
  const { data: ownData, isPending: ownPending } = api.rank.pageRanks.useQuery({
    pageable: { page: 0, size: 20 },
    isOwner: true
  })

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-primary">My Collections</CardTitle>
      </CardHeader>
      <CardContent>
        {ownPending ? (
          <RankListSkeleton />
        ) : ownData?.list.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-muted-foreground">You haven't created any collections yet.</p>
            <Button className="mt-4" asChild>
              <Link href="/src/app/(home)/rank/create">Create Your First Collection</Link>
            </Button>
          </div>
        ) : (
          <div className="divide-y">
            {ownData?.list.map((rank) => (
              <div key={rank.id} className="py-6 first:pt-0 last:pb-0">
                <div className="flex items-start gap-4">
                  <div className="flex-1 space-y-1">
                    <Link href={`/src/app/(home)/rank/${rank.id}`} className="font-semibold text-primary hover:underline">
                      {rank.name}
                    </Link>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{formatDistanceToNow(rank.createdAt)} ago</span>
                      <div className="flex items-center gap-1">
                        <HeartIcon className="h-4 w-4" />
                        <span>{rank._count.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <StarIcon className="h-4 w-4" />
                        <span>{rank._count.stars}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" asChild>
                      <Link href={`/src/app/(home)/rank/${rank.id}/update`}>
                        <PencilIcon className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default MyRank
