"use client"
import { ArrowUpRight, CircleFadingPlus, FileInput, FolderPlus, Heart, Search } from "lucide-react"
import * as React from "react"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "~/components/ui/command"
import { api } from "~/trpc/react"

export const CommandSearch = () => {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const { data: toolData, isPending: toolPending } = api.software.pageSoftwares.useQuery({
    pageable: {
      size: 5,
      page: 0
    },
    search
  })
  const { data: rankData, isPending: rankPending } = api.rank.pageRanks.useQuery({
    pageable: {
      size: 5,
      page: 0
    },
    search
  })
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])
  return (
    <>
      <button
        type={"button"}
        className="curso inline-flex h-9 w-fit rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm shadow-black/5 transition-shadow placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20"
        onClick={() => setOpen(true)}
      >
        <span className="flex grow items-center">
          <Search className="-ms-1 me-3 text-muted-foreground/80" size={16} strokeWidth={2} aria-hidden="true" />
          <span className="font-normal text-muted-foreground/70">Search</span>
        </span>
        <kbd className="-me-1 ms-12 inline-flex h-5 max-h-full items-center rounded border border-border bg-background px-1 font-[inherit] text-[0.625rem] font-medium text-muted-foreground/70">
          ⌘K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput value={search} onValueChange={(e) => setSearch(e)} placeholder="Type a tool or collection..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Tools">
            {toolData?.list?.map((tool) => (
              <CommandItem key={`tool-${tool.id}`} className={"flex flex-row"}>
                <Avatar className={"w-4 h-4"}>
                  <AvatarImage src={tool.image} />
                  <AvatarFallback>{tool.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className={"flex-1"}>{tool.name}</div>
                <div className={"flex flex-row items-center gap-1"}>
                  <Heart size={12} />
                  <div>{tool._count.likes}</div>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Collections">
            {rankData?.list?.map((tool) => (
              <CommandItem key={`tool-${tool.id}`} className={"flex flex-row justify-between"}>
                <span>{tool.name}</span>
                <div className={"flex flex-row items-center gap-1"}>
                  <Heart size={12} />
                  <div>{tool._count.likes}</div>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
