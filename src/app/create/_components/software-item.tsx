"use client"
import AddDialog from "~/app/create/_components/add-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Button } from "~/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover"
import { Separator } from "~/components/ui/separator"
import type { CreateRankParams } from "~/server/schema"

interface Props {
  data: CreateRankParams["softwareList"][number]
  onDelete: () => void
}

const SoftwareItem = ({ data, onDelete }: Props) => {
  return (
    <div className={"border border-primary rounded-lg px-4 py-4"}>
      <div className={"flex flex-row items-center gap-4"}>
        <Avatar className={"w-18 h-18"}>
          <AvatarImage src={data.image} />
          <AvatarFallback>{data.name}</AvatarFallback>
        </Avatar>
        <div className={"flex flex-col gap-2"}>
          <div className={"text-lg font-bold"}>{data.name}</div>
          <div>{data.description}</div>
        </div>
      </div>
      <Separator className={"my-2"} />
      <div className={"flex flex-col gap-4"}>
        <div>{data.rankDescription.length === 0 ? "No Rank description" : data.rankDescription}</div>
      </div>
      <div className={"w-full flex justify-end gap-4 font-bold"}>
        <AddDialog value={data} onSubmit={() => {}} actionClassname={"cursor-pointer hover:opacity-40 transition-all"} />
        <Popover>
          <PopoverTrigger>
            <div className={"cursor-pointer hover:opacity-40 transition-all"}>DELETE</div>
          </PopoverTrigger>
          <PopoverContent>
            <div>Do you delete this item?</div>
            <div className={"w-full flex justify-end"}>
              <Button className={"text-destructive font-bold"} variant={"outline"} onClick={onDelete}>
                Delete
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

export default SoftwareItem
