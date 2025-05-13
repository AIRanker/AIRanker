"use client"

import { Heart, PackageOpen } from "lucide-react"
import Link from "next/link"
import React, { forwardRef, useMemo, useRef } from "react"
import { AnimatedBeam } from "~/components/magicui/animated-beam"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { AvatarGroup } from "~/components/ui/avatar-group"
import { cn } from "~/lib/utils"
import type { PageRankResult } from "~/server/services/rank"
import { api } from "~/trpc/react"

const LogoBeam = ({ data }: { data: PageRankResult["list"][number] }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const softwareRefs = useMemo(() => {
    // 为每个软件创建一个 ref
    return Array(data.softwares.length)
      .fill(0)
      .map(() => React.createRef<HTMLDivElement>())
  }, [data.softwares.length])
  return (
    <div ref={containerRef} className={"aspect-square h-60 w-full rounded-t-lg object-cover relative justify-center flex items-center"}>
      <div className="flex size-full flex-col items-stretch justify-around gap-10">
        <div className="flex flex-row justify-between items-center mx-10">
          <div ref={rootRef} className="z-10 flex size-12 text-primary items-center justify-center rounded-full border-2 p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]">
            <PackageOpen />
          </div>
          <div className={"flex flex-col gap-4"}>
            {data.softwares.map((software, index) => (
              <div
                key={software.software.id}
                ref={softwareRefs[index]}
                className="z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]"
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={software.software.image} />
                  <AvatarFallback>{(software.software.name ?? "A").charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
            ))}
          </div>
        </div>
      </div>
      {softwareRefs.length > 0 &&
        softwareRefs.map((toRef, index) => (
          <AnimatedBeam key={`beam-${index}`} duration={3} pathColor={"black"} startXOffset={30} containerRef={containerRef} fromRef={rootRef} toRef={toRef} />
        ))}
    </div>
  )
}

const CuratedCollection = () => {
  const { data, isPending } = api.rank.pageRanks.useQuery({
    pageable: { page: 0, size: 6 }
  })

  return (
    <>
      <h1 className="mt-20 text-4xl font-bold">Curated Collections</h1>
      <div className="mt-10 grid grid-cols-3 gap-4">
        {data?.list?.map((item) => (
          <div key={`cc-${item.id}`} className={"flex flex-col border border-primary rounded-lg p-5 gap-4"}>
            <LogoBeam data={item} />
            <Link href={`/rank/${item.id}`} className={"text-primary text-2xl font-bold hover:underline"}>
              {item.name}
            </Link>
            <div className={"text-md flex-1"}>{item.description}</div>
            <div className={"flex flex-row gap-3 items-center"}>
              <Avatar className={"w-10 h-10"}>
                <AvatarImage src={item.user?.avatar ?? ""} />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              <div className={"flex flex-col justify-between"}>
                <div className={"font-bold"}>@alex</div>
                <div className={"text-muted-foreground"}>3 days ago</div>
              </div>
              <div className={"flex-1 text-center"}>
                <AvatarGroup
                  avatars={[
                    {
                      src: "https://pbs.twimg.com/profile_images/1913868626605535232/yYTNh-zg_400x400.jpg",
                      label: "preett"
                    },
                    {
                      src: "https://pbs.twimg.com/profile_images/1909249051968839680/MdA0uZV4_400x400.png",
                      label: "21st.dev"
                    },
                    {
                      src: "https://pbs.twimg.com/profile_images/1593304942210478080/TUYae5z7_400x400.jpg",
                      label: "shadcn"
                    },
                    { src: "https://hextaui.com/logo.svg", label: "HextaUI" },
                    { src: "/logo.png", label: "HextaUI" },
                    { src: "/logo.png", label: "HextaUI" }
                  ]}
                  maxVisible={4}
                  size={35}
                  overlap={1}
                />
              </div>
              <div className="flex items-center gap-1">
                <Heart className={cn("cursor-pointer text-primary hover:scale-125 hover:fill-red-400 hover:text-red-400 transition")} />
                <span className="text-sm font-medium">{0}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default CuratedCollection
