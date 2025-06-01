import CreateForm from "~/app/(home)/create/_components/create-form"
import { Separator } from "~/components/ui/separator"
import { api } from "~/trpc/server"

const UpdatePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const detail = await api.rank.detail({ rankId: id })
  return (
    <div className={"mt-8 space-y-2"}>
      <div className={"text-3xl font-bold"}>Update your collection</div>
      <div className={"text-foreground/50"}>You can update belong your collection</div>
      <Separator className={"mt-6"} />
      <CreateForm detail={detail} />
    </div>
  )
}

export default UpdatePage
