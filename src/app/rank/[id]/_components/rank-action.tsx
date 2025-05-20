"use client"

import { Heart, Share2, Star } from "lucide-react"
import { toast } from "sonner"
import { useAuth, useClerk, useSignIn } from "@clerk/nextjs"
import { cn } from "~/lib/utils"
import type { RankDetailsResult } from "~/server/services/rank"
import { api } from "~/trpc/react"

import { format } from "date-fns"
import Link from "next/link"
import { Badge } from "~/components/ui/badge"
import { shortenAddress } from "~/lib/web3"

interface RankActionProps {
  detail?: RankDetailsResult
  id: string
}

const RankAction = ({ detail, id }: RankActionProps) => {
  const { data } = api.rank.detail.useQuery(
    { rankId: id },
    {
      initialData: detail
    }
  )
  const { isSignedIn } = useAuth()
  const { openSignIn } = useClerk()
  const useUtils = api.useUtils()
  const { mutate: starMutate } = api.rank.star.useMutation({
    onSuccess: () => {
      void useUtils.rank.detail.refetch()
    },
    onError: (error) => {
      console.error(error)
      toast.error("Failed to star the rank", { duration: 3000 })
    }
  })
  const { mutate: likeMutate } = api.rank.like.useMutation({
    onSuccess: () => {
      void useUtils.rank.detail.refetch()
    },
    onError: (error) => {
      console.error(error)
      toast.error("Failed to like the rank", { duration: 3000 })
    }
  })
  return (
    <>
      <div className="container py-8 space-y-4">
        <h1 className="text-6xl font-bold mb-2 text-primary">{data?.name ?? "Unknown"}</h1>
        <div className="flex items-center mt-6 gap-4 text-primary font-bold">
          <Link href={"/profile/"} className="hover:underline">
            {data?.user.name?.startsWith("0x") ? shortenAddress(data.user.name) : `@${data?.user.name}`}
          </Link>
          <div>|</div>
          <div>{data && format(new Date(data.createdAt), "MMMM d, yyyy")}</div>
        </div>
        <p className="opacity-60">{data?.description}</p>
        <div className="flex flex-wrap gap-2 text-lg">
          {data?.tags.map((tag) => (
            <Badge key={`rank-tag-${tag}`} variant={"outline"} className={"px-5 py-1 font-bold"}>
              #{tag}
            </Badge>
          ))}
        </div>
        <div className="flex items-center gap-4 mt-4">
          <Star
            className={cn(
              "cursor-pointer text-primary hover:scale-125 hover:fill-yellow-400 hover:text-yellow-400 transition",
              data?.isStared && "text-yellow-400 fill-yellow-400"
            )}
            onClick={(event) => {
              if (!isSignedIn) {
                void openSignIn()
              } else {
                data && starMutate({ rankId: data.id })
              }
              event.preventDefault()
              event.stopPropagation()
            }}
          />
          <Heart
            className={cn("cursor-pointer text-primary hover:scale-125 hover:fill-red-400 hover:text-red-400 transition", data?.isLiked && "text-red-400 fill-red-400")}
            onClick={(event) => {
              if (!isSignedIn) {
                void openSignIn()
              } else {
                data && likeMutate({ rankId: data.id })
              }
              event.preventDefault()
              event.stopPropagation()
            }}
          />
          <Share2 className={"cursor-pointer text-primary hover:scale-125 hover:fill-blue-400 hover:text-blue-400 transition"} size={20} />
        </div>
      </div>
    </>
  )
}

export default RankAction
