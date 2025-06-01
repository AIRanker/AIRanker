"use client"

import { useThreadRuntime } from "@assistant-ui/react"
import { useEffect } from "react"
import RankDetail from "~/app/(home)/assistant/_components/rank-detail"

const AssistantContent = () => {
  // const thread = useThreadRuntime()
  // useEffect(() => {
  //   thread.append("Hello!")
  // }, [])
  return (
    <div className={"w-full h-full"}>
      <RankDetail />
    </div>
  )
}

export default AssistantContent
