import { makeAssistantToolUI } from "@assistant-ui/react"
import { useAtom } from "jotai"
import { useSetAtom } from "jotai/index"
import { AlertCircle, Check, CheckCircle, Loader2 } from "lucide-react"
import { aiImageLoadingAtom, aiLoadingAtom, suggestionImageAtom } from "~/app/(home)/assistant/store"
import TextWave from "~/components/ui/text-wave"

export const GenerateLogoImageUi = makeAssistantToolUI<string, string>({
  toolName: "generateLogoImage",
  render: ({ args, status, result }) => {
    const setAiImageLoading = useSetAtom(aiImageLoadingAtom)
    const setSuggestionImage = useSetAtom(suggestionImageAtom)
    if (status.type === "complete") {
      if (result) {
        setSuggestionImage(result)
        setAiImageLoading(false)
      }
    } else {
      setAiImageLoading(true)
    }
    return (
      <div className="flex items-center gap-2">
        {status.type === "running" && (
          <>
            <Loader2 className="h-4 w-4 animate-spin text-primary flex-shrink-0" />
            <TextWave className={"text-sm"} text={"Let's generate an image to describe the collection..."} />
          </>
        )}
        {status.type === "incomplete" && status.reason === "error" && (
          <>
            <AlertCircle className="h-4 w-4 text-destructive flex-shrink-0" />
            <TextWave className={"text-sm text-destructive"} text={"Error: Generate picture error."} />
          </>
        )}
        {status.type === "complete" && (
          <>
            <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
            <TextWave className={"text-sm"} text={"Image generated successfully！"} />
          </>
        )}
      </div>
    )
  }
})
