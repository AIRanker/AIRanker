import { makeAssistantToolUI } from "@assistant-ui/react"
import { useSetAtom } from "jotai/index"
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import { aiLoadingAtom } from "~/app/(home)/assistant/store"
import TextWave from "~/components/ui/text-wave"

export const GenerateLogoPrompt = makeAssistantToolUI<string, string>({
  toolName: "generateLogoPrompt",
  render: ({ args, status }) => {
    const setAiLoading = useSetAtom(aiLoadingAtom)
    setAiLoading(true)
    return (
      <div className="flex items-center gap-2">
        {status.type === "running" && (
          <>
            <Loader2 className="h-4 w-4 animate-spin text-primary flex-shrink-0" />
            <TextWave className={"text-sm"} text={"Generating logo prompt..."} />
          </>
        )}
        {status.type === "incomplete" && status.reason === "error" && (
          <>
            <AlertCircle className="h-4 w-4 text-destructive flex-shrink-0" />
            <TextWave className={"text-sm text-destructive"} text={"Error: Unable to generate logo prompt. Please try again later."} />
          </>
        )}
        {status.type === "complete" && (
          <>
            <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
            <TextWave className={"text-sm"} text={"Logo prompt generated successfully！"} />
          </>
        )}
      </div>
    )
  }
})
