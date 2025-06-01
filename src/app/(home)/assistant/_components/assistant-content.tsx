"use client"

import { useThreadRuntime } from "@assistant-ui/react"
import { useEffect } from "react"
import RankContent from "~/app/(home)/assistant/_components/rank-content"
import RankDetail from "~/app/(home)/assistant/_components/rank-detail"

const AssistantContent = () => {
  // const thread = useThreadRuntime()
  // useEffect(() => {
  //   thread.append("Hello!")
  // }, [])
  return (
    <div className={"w-full h-full"}>
      <RankDetail />
      <RankContent />
    </div>
  )
}

export default AssistantContent
