"use client"
import { PopoverClose } from "@radix-ui/react-popover"
import { motion } from "framer-motion"
import { useAtom } from "jotai/index"
import { Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { suggestionAtom } from "~/app/(home)/assistant/store"
import { TooltipIconButton } from "~/components/tooltip-icon-button"
import { Button } from "~/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "~/components/ui/dialog"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover"
import { Separator } from "~/components/ui/separator"
import { Textarea } from "~/components/ui/textarea"
import { cn } from "~/lib/utils"
import type { SuggestionSoftwareResult } from "~/server/schema"

const RankTopList = ({
  data,
  onEdit,
  onDelete
}: {
  data: SuggestionSoftwareResult[]
  onEdit: (item: SuggestionSoftwareResult) => void
  onDelete: (itemName: string) => void
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {data.slice(0, 3).map((item, index) => (
        <motion.div
          key={`${item.name}`}
          initial={{ y: 50, opacity: 1 }}
          whileInView={{
            y: 0,
            opacity: 1,
            x: index === 1 ? -70 : index === 2 ? 50 : 0, // 左右偏移
            scale: index === 0 ? 1.2 : index === 1 ? 1.1 : 1.0 // 中间的放大
          }}
          viewport={{ once: true }}
          transition={{
            duration: 1.6,
            type: "spring",
            stiffness: 100,
            damping: 30,
            delay: 0.4,
            opacity: { duration: 1 }
          }}
          className={cn(
            "rounded-2xl border-[1px] p-6 bg-background text-center flex flex-col justify-center gap-2 items-center relative",
            index === 0 ? "border-primary border-2 z-10" : "border-border z-0", // 中间的优先显示
            index === 1 && "order-1 mt-6", // 左边
            index === 0 && "order-2", // 中间
            index === 2 && "order-3 mt-6" // 右边
          )}
        >
          <div className="size-7 absolute -top-4 -left-2 text-primary bg-background text-2xl">#{index + 1}</div>
          <div className="absolute top-2 right-2 flex gap-2">
            <TooltipIconButton tooltip="Edit" onClick={() => onEdit(item)}>
              <Edit className="size-4" />
            </TooltipIconButton>
            <Popover>
              <PopoverTrigger asChild>
                <TooltipIconButton tooltip="Delete">
                  <Trash2 className="size-4 text-destructive" />
                </TooltipIconButton>
              </PopoverTrigger>
              <PopoverContent className="w-72">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Delete Item</h4>
                    <p className="text-sm text-muted-foreground">Are you sure you want to delete this item? This action cannot be undone.</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <PopoverClose asChild>
                      <Button variant="outline" size="sm">
                        Cancel
                      </Button>
                    </PopoverClose>
                    <Button variant="destructive" size="sm" onClick={() => onDelete(item.name)}>
                      Delete
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          {/*<Avatar className={"size-20"}>*/}
          {/*  <AvatarImage src={item.image ?? ""} />*/}
          {/*  <AvatarFallback>{item.name}</AvatarFallback>*/}
          {/*</Avatar>*/}
          <Link href={item.url} target={"_blank"} className="text-xl font-semibold text-muted-foreground">
            {item.name}
          </Link>
          <div className={"text-muted-foreground/60"}>{item.description}</div>
          <Separator />
          <div className="relative mt-2 text-left text-primary border-l-4 border-primary pl-4 w-full">
            <span className="italic underline">{item.collectionReason}</span>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

const RankContent = () => {
  const [suggestion, setSuggestion] = useAtom(suggestionAtom)
  const isLoading = false
  const [editItem, setEditItem] = useState<SuggestionSoftwareResult | null>(null)
  const [editData, setEditData] = useState({
    name: "",
    description: "",
    url: "",
    collectionReason: ""
  })

  const handleEditItem = (item: SuggestionSoftwareResult) => {
    setEditItem(item)
    setEditData({
      name: item.name,
      description: item.description || "",
      url: item.url || "",
      collectionReason: item.collectionReason || ""
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setEditData((prev) => ({
      ...prev,
      [id]: value
    }))
  }

  const handleSave = () => {
    if (!editItem) return

    const updatedSoftwares = suggestion.softwares.map((item) => (item.name === editItem.name ? { ...item, ...editData } : item))

    setSuggestion({
      ...suggestion,
      softwares: updatedSoftwares
    })

    setEditItem(null)
  }

  const handleDelete = (itemName: string) => {
    const updatedSoftwares = suggestion.softwares.filter((item) => item.name !== itemName)

    setSuggestion({
      ...suggestion,
      softwares: updatedSoftwares
    })
  }

  return (
    <div className={"flex flex-col justify-center -mt-20"}>
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[0, 1, 2].map((index) => (
            <div
              key={`skeleton-${index}`}
              className={cn(
                "rounded-2xl border-[1px] p-6 bg-background text-center flex flex-col justify-center gap-2 items-center relative h-80 animate-pulse",
                index === 0 ? "border-primary/30 border-2 z-10" : "border-border z-0",
                index === 1 && "order-1 mt-6",
                index === 0 && "order-2",
                index === 2 && "order-3 mt-6"
              )}
            >
              <div className="size-20 rounded-full bg-muted" />
              <div className="h-6 w-32 bg-muted rounded-md" />
              <div className="h-4 w-24 bg-muted rounded-md" />
              <div className="h-16 w-full bg-muted rounded-md" />
              <div className="h-0.5 w-full bg-muted" />
              <div className="h-10 w-full bg-muted rounded-md" />
            </div>
          ))}
        </div>
      ) : (
        <RankTopList data={suggestion.softwares} onEdit={handleEditItem} onDelete={handleDelete} />
      )}
      <div className="mt-20 gap-8">
        <div className="col-span-2 flex flex-col gap-6">
          {isLoading
            ? Array(5)
                .fill(0)
                .map((_, index) => (
                  <div key={`skeleton-list-${index}`} className="rounded-2xl border-[1px] p-6 bg-background relative flex flex-col gap-4 animate-pulse">
                    <div className="flex flex-row gap-4">
                      <div className="size-20 rounded-full bg-muted" />
                      <div className="flex flex-col gap-2 flex-1">
                        <div className="h-6 w-32 bg-muted rounded-md" />
                        <div className="h-4 w-full bg-muted rounded-md" />
                      </div>
                    </div>
                    <div className="h-10 w-full bg-muted rounded-md" />
                  </div>
                ))
            : (suggestion.softwares?.length ?? 0) > 3 &&
              suggestion.softwares?.slice(3).map((item, index) => (
                <div key={`item-${item.name}`} className="rounded-2xl border-[1px] p-6 bg-background relative flex flex-col gap-4 mx-auto max-w-5xl">
                  <div className="flex flex-row gap-4">
                    <div className="size-7 absolute -top-4 -left-2 text-primary bg-background text-2xl">#{index + 4}</div>
                    <div className="absolute top-2 right-2 flex gap-2">
                      <TooltipIconButton tooltip="Edit" onClick={() => handleEditItem(item)}>
                        <Edit className="size-4" />
                      </TooltipIconButton>
                      <Popover>
                        <PopoverTrigger asChild>
                          <TooltipIconButton tooltip="Delete">
                            <Trash2 className="size-4 text-destructive" />
                          </TooltipIconButton>
                        </PopoverTrigger>
                        <PopoverContent className="w-72">
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <h4 className="font-medium">Delete Item</h4>
                              <p className="text-sm text-muted-foreground">Are you sure you want to delete this item? This action cannot be undone.</p>
                            </div>
                            <div className="flex justify-end gap-2">
                              <PopoverClose asChild>
                                <Button variant="outline" size="sm">
                                  Cancel
                                </Button>
                              </PopoverClose>
                              <Button variant="destructive" size="sm" onClick={() => handleDelete(item.name)}>
                                Delete
                              </Button>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                    {/*<Avatar className={"size-20"}>*/}
                    {/*  <AvatarImage src={item.image ?? ""} />*/}
                    {/*  <AvatarFallback>{item.name}</AvatarFallback>*/}
                    {/*</Avatar>*/}
                    <div className="flex flex-col">
                      <div className="flex flex-row gap-4">
                        <Link href={item.url} target={"_blank"} className="text-xl font-semibold text-muted-foreground">
                          {item.name}
                        </Link>
                        {/*<SoftwareAction item={item} className="size 4" comment={false} />*/}
                      </div>
                      <div className={"text-sm text-muted-foreground/60"}>{item.description}</div>
                    </div>
                  </div>
                  <div className="relative text-left text-primary border-l-4 border-primary pl-4 w-full">
                    <span className="italic underline">{item.collectionReason}</span>
                  </div>
                </div>
              ))}
        </div>
      </div>

      {/* 编辑对话框 */}
      <Dialog open={!!editItem} onOpenChange={(open) => !open && setEditItem(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Item</DialogTitle>
            <DialogDescription>Make changes to the item details below.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" value={editData.name} onChange={handleChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea id="description" value={editData.description} onChange={handleChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="url" className="text-right">
                URL
              </Label>
              <Input id="url" value={editData.url} onChange={handleChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="collectionReason" className="text-right">
                Reason
              </Label>
              <Textarea id="collectionReason" value={editData.collectionReason} onChange={handleChange} className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" onClick={handleSave}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default RankContent
