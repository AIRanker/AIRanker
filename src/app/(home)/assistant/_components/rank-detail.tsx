"use client"

import { useAtom, useAtomValue } from "jotai"
import { Heart, MessageCircle, Share2, Star } from "lucide-react"

import { aiLoadingAtom, suggestionAtom } from "~/app/(home)/assistant/store"
import { Skeleton } from "~/components/ui/skeleton"
import { cn } from "~/lib/utils"

const RankDetail = () => {
  const [suggestion, setSuggestion] = useAtom(suggestionAtom)
  const aiLoading = useAtomValue(aiLoadingAtom)
  return (
    <div className="relative flex flex-col h-[40rem] py-20 w-full items-center  bg-white dark:bg-black">
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
        </>
      ) : (
        <>
          <p className="relative z-20 bg-gradient-to-b from-primary to-primary/40 bg-clip-text py-8 text-4xl font-bold text-transparent sm:text-7xl">{suggestion.name}</p>
          <p className="relative z-20 bg-gradient-to-b from-primary to-primary/40 bg-clip-text py-4 text-2xl font-bold text-transparent sm:text-4xl">{suggestion.description}</p>
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
        </>
      )}
    </div>
  )
}

export default RankDetail
