import SimilarSoftware from "~/app/tool/[id]/_components/similar-software"
import ToolBanner from "~/app/tool/[id]/_components/tool-banner"
import ToolComments from "~/app/tool/[id]/_components/tool-comment"
import { api } from "~/trpc/server"

const ToolPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  await api.software.detail.prefetch(id)
  const similarSoftware = await api.software.similarSoftwares({ softwareId: id })
  return (
    <div className={"mt-4 flex flex-col gap-4"}>
      <ToolBanner id={id} />
      <SimilarSoftware list={similarSoftware} />
      <ToolComments id={id} />
    </div>
  )
}

export default ToolPage
