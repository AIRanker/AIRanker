import { makeAssistantToolUI } from "@assistant-ui/react"
import { useSetAtom } from "jotai/index"
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import { aiLoadingAtom } from "~/app/(home)/assistant/store"
import TextWave from "~/components/ui/text-wave"

interface QueryArgs {
  query: string
  maxResults: number
}

export const GoogleToolUi = makeAssistantToolUI<QueryArgs, string>({
  toolName: "google_custom_search",
  render: ({ args, status }) => {
    const setAiLoading = useSetAtom(aiLoadingAtom)
    setAiLoading(true)
    return (
      <div className="flex items-center gap-2">
        {status.type === "running" && (
          <>
            <Loader2 className="h-4 w-4 animate-spin text-primary flex-shrink-0" />
            <TextWave className={"text-sm"} text={"Searching the web..."} />
          </>
        )}
        {status.type === "incomplete" && status.reason === "error" && (
          <>
            <AlertCircle className="h-4 w-4 text-destructive flex-shrink-0" />
            <TextWave className={"text-sm text-destructive"} text={"Error: Unable to perform web search. Please try again later."} />
          </>
        )}
        {status.type === "complete" && (
          <>
            <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
            <TextWave className={"text-sm"} text={`Search completed: ${args.query}`} />
          </>
        )}
      </div>
    )
  }
})
