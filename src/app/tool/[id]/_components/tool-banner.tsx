"use client"
import { formatDistanceToNow } from "date-fns"
import dynamic from "next/dynamic"
import SoftwareAction from "~/app/_components/software-action"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Card } from "~/components/ui/card"
import { LinkPreview } from "~/components/ui/link-preview"
import { api } from "~/trpc/react"

const WarpBackground = dynamic(() => import("~/components/magicui/warp-background"), { ssr: false })
const ToolBanner = ({ id }: { id: string }) => {
  const { data: detail } = api.software.detail.useQuery(id)
  return (
    <WarpBackground className={"border-none"}>
      <Card className="w-full p-6 flex flex-row gap-4">
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
      </Card>
    </WarpBackground>
  )
}

export default ToolBanner
