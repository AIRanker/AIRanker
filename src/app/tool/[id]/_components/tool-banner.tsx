"use client"
import { formatDistanceToNow } from "date-fns"
import dynamic from "next/dynamic"
import SoftwareAction from "~/app/_components/software-action"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Card } from "~/components/ui/card"
import { LinkPreview } from "~/components/ui/link-preview"
import { Skeleton } from "~/components/ui/skeleton"
import { api } from "~/trpc/react"

const WarpBackground = dynamic(() => import("~/components/magicui/warp-background"), { ssr: false })
const ToolBanner = ({ id }: { id: string }) => {
  const { data: detail, isLoading } = api.software.detail.useQuery(id)
  return (
    <WarpBackground className={"border-none"}>
      <Card className="w-full p-6 flex flex-row gap-4">
        {isLoading ? (
          // 骨架屏
          <>
            <Skeleton className="w-18 h-18 rounded-full" />
            <div className="flex-1">
              <div className="flex flex-row justify-between items-center">
                <Skeleton className="h-8 w-48 rounded" />
                <Skeleton className="h-8 w-24 rounded" />
              </div>
              <Skeleton className="h-4 w-full rounded mt-2" />
              <Skeleton className="h-4 w-3/4 rounded mt-1" />
              <Skeleton className="h-3 w-32 rounded mt-4" />
            </div>
          </>
        ) : (
          <>
            <Avatar className={"w-18 h-18"}>
              <AvatarImage src={detail?.image} />
              <AvatarFallback>{detail?.name}</AvatarFallback>
            </Avatar>
            {detail && (
              <div>
                <div className={"flex flex-row justify-between items-center"}>
                  <LinkPreview url={detail.url} className="font-bold text-2xl">
                    {detail.name}
                  </LinkPreview>
                  <SoftwareAction item={detail} />
                </div>
                <div>{detail.description}</div>
                <div className={"flex flex-row gap-2"}>
                  <div className={"mt-2 text-gray-400 text-sm"}>Created {formatDistanceToNow(detail.createdAt)}</div>
                </div>
              </div>
            )}
          </>
        )}
      </Card>
    </WarpBackground>
  )
}

export default ToolBanner
