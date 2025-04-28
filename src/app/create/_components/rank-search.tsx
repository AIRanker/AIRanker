"use client"
import { Check, ChevronsUpDown, Plus } from "lucide-react"
import * as React from "react"

import { useMemo } from "react"
import { Button } from "~/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "~/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover"
import { cn } from "~/lib/utils"
import type { PageSoftwareResult } from "~/server/services/software"
import { api } from "~/trpc/react"

interface Props {
  onAdd: (item: PageSoftwareResult["list"][number]) => void
  children?: React.ReactNode
}

const RankSearch = ({ onAdd, children }: Props) => {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const { data, isPending } = api.software.pageSoftwares.useQuery({
    pageable: {
      page: 1,
      size: 10
    },
    search: value
  })
  const current = useMemo(() => {
    return (data?.list ?? []).find((item) => item.name === value)
  }, [data])

  return (
    <div className={"flex flex-row gap-4 items-center"}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" aria-expanded={open} className="w-full justify-between">
            {value ? current?.name : "Select software..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command className={"w-full"}>
            <CommandInput placeholder="Search framework..." />
            <CommandList>
              <CommandEmpty>No software found.</CommandEmpty>
              <CommandGroup>
                {(data?.list ?? []).map((item) => (
                  <CommandItem
                    key={item.id}
                    value={item.name}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue)
                    }}
                  >
                    <Check className={cn("mr-2 h-4 w-4", value === item.name ? "opacity-100" : "opacity-0")} />
                    <div className={"w-32 truncate"}>{item.name}</div>
                    <div className={"w-64 truncate opacity-65"}>{item.description}</div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <div className={"flex flex-row gap-2"}>
        <Plus
          className={current ? "cursor-pointer" : "text-gray-400"}
          size={18}
          onClick={() => {
            current && onAdd(current)
          }}
        />
        {children}
      </div>
    </div>
  )
}

export default RankSearch
