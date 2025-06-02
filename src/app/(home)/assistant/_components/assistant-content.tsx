"use client"

import { makeAssistantToolUI, useThreadRuntime } from "@assistant-ui/react"
import { useSetAtom } from "jotai/index"
import { CheckCircle, Loader2 } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { type CollectionArgs, CollectionToolUI } from "~/app/(home)/assistant/_components/collection-tool-ui"
import { GenerateLogoImageUi } from "~/app/(home)/assistant/_components/generate-logo-image-tools"
import { GoogleToolUi } from "~/app/(home)/assistant/_components/google-tool-ui"
import RankContent from "~/app/(home)/assistant/_components/rank-content"
import RankDetail from "~/app/(home)/assistant/_components/rank-detail"
import { TimeToolUi } from "~/app/(home)/assistant/_components/time-tool-ui"
import { aiLoadingAtom, suggestionAtom } from "~/app/(home)/assistant/store"
import { AssistantModal } from "~/components/assistant-modal"
import TextWave from "~/components/ui/text-wave"
import type { SuggestionResult } from "~/server/schema"

const AssistantContent = () => {
  const searchParams = useSearchParams()
  const prompt = searchParams.get("prompt")
  const thread = useThreadRuntime()
  useEffect(() => {
    if (prompt) {
      thread.append(prompt)
    }
    const unsubscribe = thread.subscribe(() => {
      const data = thread.getState()
      const messages = data.messages

      if (messages && messages.length > 0) {
        const latestMessage = messages[messages.length - 1]
        console.log(latestMessage)
        if (latestMessage) {
          if (latestMessage.role === "assistant" && latestMessage.status.type === "complete") {
            // 这里是收到助手回复时的处理逻辑
            console.log("收到新回复:", latestMessage.content)
          }
        }
      }
    })

    return () => unsubscribe()
  }, [])
  // thread.subscribe(() => {
  //   const data = thread.getState()
  //   console.log("Current messages:", data)
  // })

  return (
    <div className={"w-full h-full"}>
      <AssistantModal />
      <RankDetail />
      <RankContent />
      <CollectionToolUI />
      <TimeToolUi />
      <GoogleToolUi />
      <GenerateLogoImageUi />
    </div>
  )
}

export default AssistantContent
