"use client"
import { AsyncImage } from "loadable-image"
import { encode } from "qss"
import SoftwareAction from "~/app/(home)/_components/software-action"
import { api } from "~/trpc/react"

const ToolHeader = ({ id }: { id: string }) => {
  const { data: detail, isLoading } = api.software.detail.useQuery(id)
  const params = encode({
    url: detail?.url,
    screenshot: true,
    meta: false,
    embed: "screenshot.url",
    colorScheme: "dark",
    "viewport.isMobile": true,
    "viewport.deviceScaleFactor": 1
  })
  const src = `https://api.microlink.io/?${params}`

  return (
    <div className={"flex flex-col gap-5"}>
      <div className={"flex flex-row items-center gap-4 justify-between"}>
        <div className={"flex flex-row gap-4"}>
          <div className={"text-primary text-5xl font-bold"}>{detail?.name}</div>
        </div>
        {detail && <SoftwareAction item={detail} />}
      </div>
      <AsyncImage src={src} style={{ width: "100%", height: "auto", aspectRatio: 16 / 9 }} />
      <div className={"border-l-4 border-l-primary pl-8 text-foreground/50 "}>{detail?.description}</div>
    </div>
  )
}

export default ToolHeader
