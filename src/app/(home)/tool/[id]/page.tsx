import SimilarSoftware from "~/app/(home)/tool/[id]/_components/similar-software"
import ToolBanner from "~/app/(home)/tool/[id]/_components/tool-banner"
import ToolComments from "~/app/(home)/tool/[id]/_components/tool-comment"
import ToolContent from "~/app/(home)/tool/[id]/_components/tool-content"
import ToolHeader from "~/app/(home)/tool/[id]/_components/tool-header"
import { HydrateClient, api } from "~/trpc/server"

const ToolPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  await api.software.detail.prefetch(id)
  const similarSoftware = await api.software.similarSoftwares({ softwareId: id })
  return (
    <HydrateClient>
      <div className={"mt-4 flex flex-col"}>
        {/*<ToolBanner id={id} />*/}
        <ToolHeader id={id} />
        <ToolContent id={id} />
        <SimilarSoftware list={similarSoftware} />
        <ToolComments id={id} />
      </div>
    </HydrateClient>
  )
}

export default ToolPage
