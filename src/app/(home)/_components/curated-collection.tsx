"use client"

import { Search } from "lucide-react"
import React, { useState } from "react"
import CuratedCollectionGrid from "~/app/(home)/_components/curated-collection-grid"
import ListPagination from "~/components/list-pagination"
import { Input } from "~/components/ui/input"
import type { Pageable } from "~/server/schema"
import { api } from "~/trpc/react"

const CuratedCollection = () => {
  const [pageable, setPageable] = useState<Pageable>({
    page: 0,
    size: 6
  })
  const [search, setSearch] = useState("")
  const { data, isPending } = api.rank.pageRanks.useQuery({
    pageable: { ...pageable },
    search
  })

  return (
    <>
      <div className="flex flex-row justify-between mt-20">
        <div className={"text-4xl font-bold"}>Curated Collections</div>
        <div className={"relative"}>
          <Search className={"absolute m-2"} size={18} />
          <Input placeholder={"Search..."} className={"pl-8"} value={search} onChange={(e) => setSearch(e.target.value)} />
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
