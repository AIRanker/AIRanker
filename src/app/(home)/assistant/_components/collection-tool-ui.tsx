import { makeAssistantToolUI } from "@assistant-ui/react"
import { useAtom, useSetAtom } from "jotai"
import { CheckCircle, Loader2 } from "lucide-react"
import { aiLoadingAtom, suggestionAtom } from "~/app/(home)/assistant/store"
import TextWave from "~/components/ui/text-wave"

export type CollectionArgs = {
  name: string
  description: string
  softwares: Array<{
    name: string
    url: string
    description: string
    collectionReason: string
  }>
}

export const CollectionToolUI = makeAssistantToolUI<CollectionArgs, string>({
  toolName: "result",
  render: ({ args, status }) => {
    const setAiLoading = useSetAtom(aiLoadingAtom)
    const setSuggestion = useSetAtom(suggestionAtom)
    setAiLoading(true)
    if (status.type === "running") {
      return (
        <div className="flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin text-primary flex-shrink-0" />
          <TextWave className={"text-sm"} text={"Generating AI tools collection..."} />
        </div>
      )
    }

    if (status.type === "incomplete" && status.reason === "error") {
      setAiLoading(false)
      return (
        <div className="flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin text-primary flex-shrink-0" />
          <TextWave className={"text-sm text-destructive"} text={"Error: Failed to generate collection!"} />
        </div>
      )
    }
    setSuggestion(args)
    setAiLoading(false)
    return (
      <div className="flex items-center gap-2">
        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
        <TextWave className={"text-sm"} text={"Generate completed!"} />
      </div>
    )
  }
})
