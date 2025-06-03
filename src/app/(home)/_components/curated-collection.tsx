"use client"

import { Clock, Search, ThumbsUp } from "lucide-react"
import React, { useState } from "react"
import CuratedCollectionGrid from "~/app/(home)/_components/curated-collection-grid"
import ListPagination from "~/components/list-pagination"
import { Input } from "~/components/ui/input"
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group"
import type { Pageable } from "~/server/schema"
import { api } from "~/trpc/react"

const CuratedCollection = () => {
  const [pageable, setPageable] = useState<Pageable>({
    page: 0,
    size: 6
  })
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState<"likes" | undefined>(undefined)
  const { data, isPending } = api.rank.pageRanks.useQuery({
    pageable: { ...pageable },
    search,
    sort
  })

  return (
    <>
      <div className="flex flex-row justify-between mt-20">
        <div className={"text-4xl font-bold"}>Curated Collections</div>
        <div className="flex items-center gap-2">
          <ToggleGroup type="single" value={sort || "latest"} onValueChange={(value) => setSort(value === "latest" ? undefined : "likes")}>
            <ToggleGroupItem value="latest" aria-label="最新">
              <Clock className="h-4 w-4 mr-1" />
              Latest
            </ToggleGroupItem>
            <ToggleGroupItem value="likes" aria-label="最热">
              <ThumbsUp className="h-4 w-4 mr-1" />
              Hot
            </ToggleGroupItem>
          </ToggleGroup>
          <div className={"relative"}>
            <Search className={"absolute m-2"} size={18} />
            <Input placeholder={"Search..."} className={"pl-8"} value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>
      </div>
      <div className="mt-10 grid grid-cols-3 gap-4">
        <CuratedCollectionGrid isPending={isPending} data={data} />
        <div className={"col-span-3"}>
          <ListPagination pageable={pageable} totalPages={data?.pages ?? 0} setPageable={setPageable} />
        </div>
      </div>
    </>
  )
}

export default CuratedCollection
