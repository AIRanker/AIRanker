import { formatDistanceToNow } from "date-fns"
import SoftwareAction from "~/app/_components/software-action"
import SimilarSoftware from "~/app/tool/[id]/_components/similar-software"
import ToolComments from "~/app/tool/[id]/_components/tool-comment"
import { WarpBackground } from "~/components/magicui/warp-background"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Card } from "~/components/ui/card"
import { LinkPreview } from "~/components/ui/link-preview"
import { api } from "~/trpc/server"

const ToolPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const detail = await api.software.detail(id)
  if (!detail) {
    return <div>No tool found</div>
  }
  const similarSoftware = await api.software.similarSoftwares({ softwareId: id })
  return (
    <div className={"mt-4 flex flex-col gap-4"}>
      <WarpBackground className={"border-none"}>
        <Card className="w-full p-6 flex flex-row gap-4">
          <Avatar className={"w-18 h-18"}>
            <AvatarImage src={detail.image} />
            <AvatarFallback>{detail.name}</AvatarFallback>
          </Avatar>
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
        </Card>
      </WarpBackground>
      <SimilarSoftware list={similarSoftware} />
      <ToolComments id={id} />
    </div>
  )
}

export default ToolPage
