"use client"

import { useAtom, useAtomValue } from "jotai"
import { Edit, Heart, MessageCircle, Share2, Star } from "lucide-react"
import type React from "react"
import { useState } from "react"

import { AsyncImage } from "loadable-image"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { aiImageLoadingAtom, aiLoadingAtom, suggestionAtom, suggestionImageAtom } from "~/app/(home)/assistant/store"
import { TooltipIconButton } from "~/components/tooltip-icon-button"
import { Button } from "~/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "~/components/ui/dialog"
import { Input } from "~/components/ui/input"
import { Skeleton } from "~/components/ui/skeleton"
import { Textarea } from "~/components/ui/textarea"
import { cn } from "~/lib/utils"
import { api } from "~/trpc/react"

const RankDetail = () => {
  const [suggestion, setSuggestion] = useAtom(suggestionAtom)
  const aiLoading = useAtomValue(aiLoadingAtom)
  const aiImageLoading = useAtomValue(aiImageLoadingAtom)
  const suggestionImage = useAtomValue(suggestionImageAtom)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editData, setEditData] = useState({
    name: suggestion.name,
    description: suggestion.description
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setEditData((prev) => ({
      ...prev,
      [id]: value
    }))
  }

  const handleSave = () => {
    setSuggestion({
      ...suggestion,
      name: editData.name,
      description: editData.description
    })
    setDialogOpen(false)
  }

  const router = useRouter()
  const { mutate, isPending } = api.rank.create.useMutation({
    onSuccess: (data) => {
      if (data) {
        toast.success("Save success!")
        router.push(`/rank/${data.id}`)
      } else {
        toast.error("Save failed!")
      }
    },
    onError: (error) => {
      console.error(error)
      toast.error(`Save error: ${error.message}`)
    }
  })

  return (
    <div className="relative flex flex-col mb-12 py-20 w-full items-center  bg-white dark:bg-black">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
        )}
      />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black" />
      {aiLoading ? (
        <>
          <Skeleton className="relative z-20 h-16 w-3/4 my-8 rounded-lg" />
          <Skeleton className="relative z-20 h-10 w-2/3 my-4 rounded-lg" />
          <div className="flex items-center gap-4 z-20 mt-10">
            <Skeleton className="h-8 w-16 rounded-full" />
            <Skeleton className="h-8 w-16 rounded-full" />
            <Skeleton className="h-8 w-16 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
          <Skeleton className="z-20 mt-12 h-14 w-64 rounded-lg" />
        </>
      ) : (
        <>
          <div className="absolute top-4 right-4 z-30">
            <TooltipIconButton
              tooltip="Edit"
              onClick={() => {
                setEditData({
                  name: suggestion.name,
                  description: suggestion.description
                })
                setDialogOpen(true)
              }}
              className="bg-primary/10 hover:bg-primary/20"
            >
              <Edit className="size-4" />
            </TooltipIconButton>
          </div>
          <p className="relative z-20 bg-gradient-to-b from-primary text-center to-primary/40 bg-clip-text py-8 text-4xl font-bold text-transparent sm:text-7xl">
            {suggestion.name}
          </p>
          <p className="relative z-20 bg-gradient-to-b from-primary text-center to-primary/40 bg-clip-text py-4 text-2xl font-bold text-transparent sm:text-xl">
            {suggestion.description}
          </p>
          <div className="flex items-center gap-4 z-20 mt-10">
            <div className="flex items-center gap-1">
              <Star className={cn("cursor-pointer text-primary hover:scale-125 hover:fill-yellow-400 hover:text-yellow-400 transition")} />
              <span className="text-sm font-medium">0</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className={cn(" cursor-pointer text-primary hover:scale-125 hover:fill-red-400 hover:text-red-400 transition")} />
              <span className="text-sm font-medium">0</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className={cn(" cursor-pointer text-primary hover:scale-125 hover:fill-green-400 hover:text-green-400 transition")} />
              <span className="text-sm font-medium">0</span>
            </div>
            <div>
              <Share2 className={"cursor-pointer text-primary hover:scale-125 hover:fill-blue-400 hover:text-blue-400 transition"} />
            </div>
          </div>

          <Button
            className="z-20 mt-12 px-8 py-6 text-lg font-bold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            onClick={() => {
              mutate({
                forms: {
                  name: suggestion.name,
                  image: suggestionImage,
                  description: suggestion.description,
                  tags: [],
                  softwareList: suggestion.softwares.map((item, index) => ({
                    name: item.name,
                    description: item.description || "",
                    url: item.url || "",
                    rankDescription: item.collectionReason || "",
                    rankIndex: index
                  }))
                }
              })
            }}
            disabled={isPending}
          >
            {isPending ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                <span>Saving...</span>
              </div>
            ) : (
              "Save This Amazing Ranking 🚀"
            )}
          </Button>
        </>
      )}

      <div className=" mt-8 w-full relative">
        {aiImageLoading ? (
          <Skeleton className="w-full aspect-video rounded-lg shadow-lg " />
        ) : suggestionImage ? (
          <AsyncImage src={suggestionImage} style={{ width: "100%", height: "auto", aspectRatio: 16 / 9 }} className={" shadow-lg rounded-lg"} />
        ) : null}
      </div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Edit</DialogTitle>
            <DialogDescription>Collection base information</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right">
                Name
              </label>
              <Input id="name" value={editData.name} onChange={handleChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="description" className="text-right">
                Description
              </label>
              <Textarea id="description" value={editData.description} onChange={handleChange} className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" onClick={handleSave}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default RankDetail
