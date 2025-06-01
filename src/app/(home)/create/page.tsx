import CreateForm from "~/app/(home)/create/_components/create-form"
import { Separator } from "~/components/ui/separator"

const CreatePage = () => {
  return (
    <div className={"mt-8 space-y-2"}>
      <div className={"text-3xl font-bold"}>Create your collection</div>
      <div className={"text-foreground/50"}>You can create belong your collection</div>
      <Separator className={"mt-6"} />
      <CreateForm />
    </div>
  )
}

export default CreatePage
