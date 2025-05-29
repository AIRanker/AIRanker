"use client"

import { AssistantRuntimeProvider } from "@assistant-ui/react"
import { useChatRuntime } from "@assistant-ui/react-ai-sdk"
import { Thread } from "~/components/thread"
import { WeatherToolUI } from "./weather-tool-ui"

const AssistantContent = () => {
  const runtime = useChatRuntime({
    api: "/api/chat"
  })

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div className="grid h-dvh gap-x-2 px-4 py-4">
        <Thread />
        <WeatherToolUI />
      </div>
    </AssistantRuntimeProvider>
  )
}

export default AssistantContent
