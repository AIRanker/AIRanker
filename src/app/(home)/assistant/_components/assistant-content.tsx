"use client"

import { useMessage, useThreadRuntime } from "@assistant-ui/react"
import { useEffect } from "react"
import { toast } from "sonner"
import RankContent from "~/app/(home)/assistant/_components/rank-content"
import RankDetail from "~/app/(home)/assistant/_components/rank-detail"

const AssistantContent = () => {
  const thread = useThreadRuntime()
  useEffect(() => {
    thread.append("Hello!")

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
      <RankDetail />
      <RankContent />
    </div>
  )
}

export default AssistantContent
