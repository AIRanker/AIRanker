"use client"
import { useMemo } from "react"
import { InfiniteMovingCards } from "~/components/ui/infinite-moving-cards"
import type { SimilarSoftwaresResult } from "~/server/services/software"

const SimilarSoftware = ({ list }: { list: SimilarSoftwaresResult }) => {
  const data = useMemo(() => {
    return list.map((item) => {
      return {
        id: item.id,
        name: item.name,
        url: item.url,
        image: item.image,
        description: item.description ?? "",
        createdAt: item.createdAt
      }
    })
  }, [list])
  return (
    <div className={"flex flex-col overflow-hidden"}>
      <div className={"text-primary text-2xl font-bold"}>Maybe you will be interested</div>
      <InfiniteMovingCards speed={"slow"} items={data} />
    </div>
  )
}

export default SimilarSoftware
