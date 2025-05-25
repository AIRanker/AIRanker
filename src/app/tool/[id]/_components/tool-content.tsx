"use client"

import { useEffect, useRef } from "react"
import Vditor from "vditor"
import { Skeleton } from "~/components/ui/skeleton"
import { api } from "~/trpc/react"
import "vditor/dist/index.css"

const ToolContent = ({ id }: { id: string }) => {
  const { data: detail, isLoading } = api.software.detail.useQuery(id)
  const previewRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!previewRef.current) return

    void Vditor.preview(previewRef.current, detail?.content ?? "", {
      mode: "light",
      theme: {
        current: "light"
      },
      hljs: {
        style: "base16-snazzy",
        enable: true
      },
      anchor: 1,
      lang: "en_US"
    })
  }, [detail])

  if (isLoading) {
    return (
      <div className="w-full my-4" style={{ minHeight: "calc(100vh - 28rem)" }}>
        <Skeleton className="h-8 w-3/4 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6 mb-6" />

        <Skeleton className="h-6 w-1/2 mb-3" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-4/5 mb-6" />

        <Skeleton className="h-64 w-full mb-6" />

        <Skeleton className="h-6 w-2/3 mb-3" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4 mb-2" />
      </div>
    )
  }

  return <div ref={previewRef} className="prose prose-headings:text-primary max-w-none w-full my-4 p-0" style={{ minHeight: "calc(100vh - 28rem)", padding: 0 }} />
}

export default ToolContent
