"use client"

import { AssistantRuntimeProvider } from "@assistant-ui/react"
import { useChatRuntime } from "@assistant-ui/react-ai-sdk"
import type React from "react"

const AssistantProvider = ({ children }: { children: React.ReactNode }) => {
  const runtime = useChatRuntime({
    api: "/api/chat"
  })
  return <AssistantRuntimeProvider runtime={runtime} children={children} />
}

export default AssistantProvider
