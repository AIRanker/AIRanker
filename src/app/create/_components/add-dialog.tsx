"use client"
import { ImagePlus, TrashIcon } from "lucide-react"
import type React from "react"
import { useState } from "react"
import { uploadFile } from "~/app/actions"
import PictureSelectPopover from "~/components/picture-select-popover"
import { Button } from "~/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Textarea } from "~/components/ui/textarea"
import { UPLOAD_PATH_POST } from "~/lib/const"
import { cn } from "~/lib/utils"
import type { CreateRankParams } from "~/server/schema"

interface Props {
  value?: CreateRankParams["softwareList"][number]
  onSubmit: (params: CreateRankParams["softwareList"][number]) => void
}

const AddDialog = ({ value, onSubmit }: Props) => {
  const [data, setData] = useState<CreateRankParams["softwareList"][number]>({
    name: value?.name ?? "",
    image: value?.image ?? "",
    description: value?.description ?? "",
    url: value?.url ?? "",
    rankDescription: value?.rankDescription ?? "",
    rankIndex: value?.rankIndex ?? 0
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setData((prev) => ({
      ...prev,
      [id]: id === "rankIndex" ? Number.parseInt(value) || 0 : value
    }))
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className={"underline font-bold text-sm cursor-pointer"}>NEW</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Add software</DialogTitle>
          <DialogDescription>You can add new software to your rank</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {data.image ? (
            <div className="flex gap-2">
              <div
                className="w-1/2 max-h-52 rounded-xl bg-gray-700 bg-cover bg-center bg-no-repeat shadow lg:w-4/5"
                style={{
                  backgroundImage: `url(${data.image})`,
                  aspectRatio: "1 / 1"
                }}
              />
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="text-muted-foreground"
                onClick={() => {
                  setData({
                    ...data,
                    image: ""
                  })
                }}
              >
                <TrashIcon className="mx-auto h-5 w-5" />
              </Button>
            </div>
          ) : (
            <PictureSelectPopover
              onSelect={(url) => {
                setData({
                  ...data,
                  image: url
                })
              }}
              uploadPath={UPLOAD_PATH_POST}
              onUpload={uploadFile}
              side={"bottom"}
            >
              <button type={"button"} className={cn("flex h-36 cursor-pointer w-full flex-col items-center justify-center rounded-lg border border-dashed")}>
                <ImagePlus className="text-muted-foreground h-14 w-14" />
              </button>
            </PictureSelectPopover>
          )}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value={data.name} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea id="description" value={data.description} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="url" className="text-right">
              URL
            </Label>
            <Input id="url" value={data.url} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="rankDescription" className="text-right">
              Description
            </Label>
            <Input id="rankDescription" value={data.rankDescription} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="rankIndex" className="text-right">
              Index
            </Label>
            <Input id="rankIndex" type="number" value={data.rankIndex} onChange={handleChange} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            onClick={() => {
              onSubmit(data)
            }}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddDialog
