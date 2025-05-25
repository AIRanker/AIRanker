"use client"

import { useEffect, useRef } from "react"
import Vditor from "vditor"
import { api } from "~/trpc/react"

const ToolContent = ({ id }: { id: string }) => {
  const { data: detail } = api.software.detail.useQuery(id)
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
  return <div ref={previewRef} className="prose prose-headings:text-primary max-w-none w-full my-4 p-0" style={{ minHeight: "calc(100vh - 28rem)", padding: 0 }} />
}

export default ToolContent
