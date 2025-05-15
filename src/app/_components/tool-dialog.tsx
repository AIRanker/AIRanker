"use client"

import { useAuth, useClerk } from "@clerk/nextjs"
import { Heart, Share2, Star } from "lucide-react"
import type { FC } from "react"
import { toast } from "sonner"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Button } from "~/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "~/components/ui/dialog"
import { cn } from "~/lib/utils"
import type { PageSoftwareResult } from "~/server/services/software"
import { api } from "~/trpc/react"

interface ToolDialogProps {
  tool: PageSoftwareResult["list"][number]
  open: boolean
  onOpenChange: (open: boolean) => void
}
export const ToolDialog = ({ tool, open, onOpenChange }: ToolDialogProps) => {
  const { isSignedIn } = useAuth()
  const { openSignIn } = useClerk()
  const useUtils = api.useUtils()

  const { mutate: starMutate } = api.software.fav.useMutation({
    onSuccess: () => {
      void useUtils.software.getSoftwaresByRankId.refetch()
    },
    onError: (error) => {
      console.error(error)
      toast.error("Failed to star the tool", { duration: 3000 })
    }
  })

  const { mutate: likeMutate } = api.software.like.useMutation({
    onSuccess: () => {
      void useUtils.software.getSoftwaresByRankId.refetch()
    },
    onError: (error) => {
      console.error(error)
      toast.error("Failed to like the tool", { duration: 3000 })
    }
  })
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <Avatar className="size-12">
              <AvatarImage src={tool.image ?? ""} />
              <AvatarFallback>{tool.name[0]}</AvatarFallback>
            </Avatar>
            <DialogTitle className="text-2xl">{tool.name}</DialogTitle>
          </div>
          <DialogDescription className="mt-2">{tool.description}</DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Category</p>
              <p>{tool.category?.name || "Uncategorized"}</p>
            </div>
            <div className={"overflow-hidden"}>
              <p className="text-sm text-gray-500">Website</p>
              <a href={tool.url || "#"} target="_blank" rel="noopener noreferrer" className="text-primary w-full hover:underline truncate">
                {tool.url ? tool.url : "N/A"}
              </a>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star
                className={cn(
                  "cursor-pointer text-primary hover:scale-125 hover:fill-yellow-400 hover:text-yellow-400 transition",
                  tool.isStared && "text-yellow-400 fill-yellow-400"
                )}
                onClick={() => {
                  if (!isSignedIn) {
                    void openSignIn()
                  } else {
                    starMutate({ softwareId: tool.id })
                  }
                }}
              />
              <span className="text-sm font-medium">{tool._count.likes ?? 0}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart
                className={cn("cursor-pointer text-primary hover:scale-125 hover:fill-red-400 hover:text-red-400 transition", tool.isLiked && "text-red-400 fill-red-400")}
                onClick={() => {
                  if (!isSignedIn) {
                    void openSignIn()
                  } else {
                    likeMutate({ softwareId: tool.id })
                  }
                }}
              />
              <span className="text-sm font-medium">{tool._count.stars ?? 0}</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Share2 className="cursor-pointer size-4 mr-2" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
