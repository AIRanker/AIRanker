"use client"
import { Lock } from "lucide-react"
import Image from "next/image"
import { api } from "~/trpc/react"
import RankerDetail from "./ranker-detail"

interface RankerContentProps {
  id: string
}

const RankerContent = ({ id }: RankerContentProps) => {
  const { data } = api.software.getSoftwaresByRankId.useQuery({ rankId: id })
  return (
    <div className={"flex flex-col gap-8"}>
      <div className={"w-full h-[350px] flex justify-center items-center relative"}>
        <Image src={"https://storage.googleapis.com/repofi/external/img.png"} alt={"banner"} fill={true} />
        <div className={"z-10 text-white font-bold text-xl flex flex-col items-center gap-4"}>
          <Lock size={64} />
          <div>Like to unlock benefits.</div>
        </div>
      </div>
      <div className={"grid grid-cols-1 md:grid-cols-2 gap-4"}>
        {data?.map((item, index) => (
          <RankerDetail key={`ranker-detail-${item.name}-${index}`} item={item} />
        ))}
      </div>
    </div>
  )
}

export default RankerContent
