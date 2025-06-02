"use client"

import { useThreadRuntime } from "@assistant-ui/react"
import { useSetAtom } from "jotai/index"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { CollectionToolUI } from "~/app/(home)/assistant/_components/collection-tool-ui"
import { useEffect } from "react"
import { CollectionToolUI } from "~/app/(home)/assistant/_components/collection-tool-ui"
import { GenerateLogoImageUi } from "~/app/(home)/assistant/_components/generate-logo-image-tools"
import { GoogleToolUi } from "~/app/(home)/assistant/_components/google-tool-ui"
import RankContent from "~/app/(home)/assistant/_components/rank-content"
import RankDetail from "~/app/(home)/assistant/_components/rank-detail"
import { TimeToolUi } from "~/app/(home)/assistant/_components/time-tool-ui"
import { aiImageLoadingAtom, aiLoadingAtom } from "~/app/(home)/assistant/store"
import { AssistantModal } from "~/components/assistant-modal"

const AssistantContent = () => {
  const searchParams = useSearchParams()
  const prompt = searchParams.get("prompt")
  const thread = useThreadRuntime()
  const setAiLoading = useSetAtom(aiLoadingAtom)
  const setAiImageLoading = useSetAtom(aiImageLoadingAtom)
  useEffect(() => {
    const isRunning = thread.getState().isRunning
    if (prompt && !isRunning) {
      setAiLoading(true)
      setAiImageLoading(true)
      thread.append(prompt)
    }
  }, [])

  return (
    <div className={"w-full h-full"}>
      <RankDetail />
      <RankContent />
      <CollectionToolUI />
      <TimeToolUi />
      <GoogleToolUi />
      <GenerateLogoImageUi />
      <GenerateLogoPrompt />
    </div>
  )
}

export default AssistantContent
