import CreateForm from "~/app/create/tool/_components/create-form"
import { Separator } from "~/components/ui/separator"
import { api } from "~/trpc/server"
const ToolPage = async () => {
  const categoryList = await api.softwareCategory.all()
  return (
    <div className={"mt-8 space-y-2"}>
      <div className={"text-3xl font-bold"}>Create new tool</div>
      <div className={"text-foreground/50"}>You can create belong your tool</div>
      <Separator className={"mt-6"} />
      <CreateForm />
    </div>
  )
}

export default ToolPage
