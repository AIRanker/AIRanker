"use client"

import { AssistantRuntimeProvider, useAssistantToolUI } from "@assistant-ui/react"
import type { ToolCallContentPartComponent } from "@assistant-ui/react"
import { useChatRuntime } from "@assistant-ui/react-ai-sdk"
import { Spinner } from "@radix-ui/themes"
import { useState } from "react"
import { Thread } from "~/components/thread"
import { type WeatherArgs, type WeatherResult, WeatherToolUI } from "./weather-tool-ui"

const AssistantContent = () => {
  const runtime = useChatRuntime({
    api: "/api/chat"
  })
  const [data, setData] = useState<WeatherResult>()
  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div className="flex flex-row">
        {/*<Thread />*/}
        {/*<WeatherToolUI />*/}
      </div>
    </AssistantRuntimeProvider>
  )
}

export default AssistantContent
