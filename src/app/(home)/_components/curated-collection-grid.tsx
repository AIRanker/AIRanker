import { useAuth, useClerk } from "@clerk/nextjs"
import { formatDistanceToNow } from "date-fns"
import { AsyncImage } from "loadable-image"
import { Heart, PackageOpen } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useMemo, useRef } from "react"
import { toast } from "sonner"
import { AnimatedBeam } from "~/components/magicui/animated-beam"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { AvatarGroup } from "~/components/ui/avatar-group"
import { Skeleton } from "~/components/ui/skeleton"
import { cn } from "~/lib/utils"
import { api } from "~/trpc/react"

interface RankSoftware {
  software: {
    id: string
    name: string
    image?: string | null
  }
}

interface RankComment {
  user: {
    id: string
    name?: string | null
    avatar?: string | null
  }
}

interface RankItem {
  id: string
  name: string
  description?: string | null
  image?: string | null
  createdAt: Date
  isLiked?: boolean
  user?: {
    id: string
    name?: string | null
    avatar?: string | null
  } | null
  softwares: RankSoftware[]
  comments?: RankComment[]
  _count: {
    likes: number
    stars?: number
  }
}

interface CuratedCollectionGridProps {
  data?: {
    list: RankItem[]
    pages?: number
    total?: number
  }
  isPending: boolean
}

const LogoBeam = ({ data }: { data: RankItem }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const softwareRefs = useMemo(() => {
    return Array(data.softwares.length)
      .fill(0)
      .map(() => React.createRef<HTMLDivElement>())
  }, [data.softwares.length])
  return (
    <div ref={containerRef} className={"aspect-square h-60 w-full rounded-t-lg object-cover relative justify-center flex items-center"}>
      <div className="flex size-full flex-col items-stretch justify-around gap-10">
        <div className="flex flex-row justify-around items-center w-full h-full">
          <div className={"flex flex-col gap-4"}>
            {data.softwares.slice(0, 7).map(
              (software, index) =>
                index % 2 === 0 && (
                  <div
                    key={software.software.id}
                    ref={softwareRefs[index]}
                    className="z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={software.software.image ?? ""} />
                      <AvatarFallback>{(software.software.name ?? "A").charAt(0)}</AvatarFallback>
                    </Avatar>
                  </div>
                )
            )}
          </div>
          <div ref={rootRef} className="z-10 flex size-12 text-primary items-center justify-center rounded-full border-2 p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]">
            <PackageOpen />
          </div>
          <div className={"flex flex-col gap-4"}>
            {data.softwares.slice(0, 8).map(
              (software, index) =>
                index % 2 !== 0 && (
                  <div
                    key={software.software.id}
                    ref={softwareRefs[index]}
                    className="z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={software.software.image ?? ""} />
                      <AvatarFallback>{(software.software.name ?? "A").charAt(0)}</AvatarFallback>
                    </Avatar>
                  </div>
                )
            )}
          </div>
        </div>
      </div>
      {softwareRefs.length > 0 &&
        softwareRefs
          .slice(0, 8)
          .map((toRef, index) =>
            index % 2 === 0 ? (
              <AnimatedBeam key={`beam-${index}`} duration={3} pathColor={"black"} startXOffset={-30} containerRef={containerRef} fromRef={rootRef} toRef={toRef} />
            ) : (
              <AnimatedBeam key={`beam-${index}`} duration={3} pathColor={"black"} startXOffset={30} containerRef={containerRef} fromRef={containerRef} toRef={toRef} />
            )
          )}
    </div>
  )
}

const CuratedCollectionGrid: React.FC<CuratedCollectionGridProps> = ({ data, isPending }) => {
  const { isSignedIn, userId } = useAuth()
  const { openSignIn } = useClerk()
  const router = useRouter()
  const useUtils = api.useUtils()

  const { mutate: likeMutate, isPending: likePending } = api.rank.like.useMutation({
    onSuccess: async () => {
      await useUtils.rank.pageRanks.refetch()
      router.refresh()
    },
    onError: (error) => {
      console.error(error)
      toast.error("Failed to like the rank", { duration: 3000 })
    }
  })

  return (
    <>
      {isPending &&
        Array(6)
          .fill(0)
          .map((_, index) => (
            <div key={`cc-${index}`} className={"w-full border border-primary/20 rounded-lg p-5 animate-pulse"}>
              <Skeleton className={"h-60 rounded-t-lg mb-4 "} />
              <Skeleton className={"h-8 w-3/4 rounded-md mb-3"} />
              <Skeleton className={"h-16 rounded-md mb-4"} />
              <div className={"flex flex-row items-center gap-3"}>
                <Skeleton className={"w-10 h-10 rounded-full"} />
                <div className={"flex flex-col gap-2 flex-1"}>
                  <Skeleton className={"h-4 w-20 rounded-md"} />
                  <Skeleton className={"h-3 w-24 rounded-md"} />
                </div>
                <div className={"flex flex-row gap-1 items-center"}>
                  <Skeleton className={"w-5 h-5 rounded-full"} />
                  <Skeleton className={"h-4 w-4 rounded-md"} />
                </div>
              </div>
            </div>
          ))}
      {data?.list?.map((item) => (
        <div key={`cc-${item.id}`} className={"flex flex-col border border-primary rounded-lg p-5 gap-4"}>
          {item.image && item.image.trim().length > 0 ? (
            <AsyncImage src={item.image} className={"aspect-square h-60 w-full rounded-t-lg object-cover"} />
          ) : (
            <LogoBeam data={item} />
          )}
          <Link href={`/rank/${item.id}`} className={"text-primary text-2xl font-bold hover:underline"}>
            {item.name}
          </Link>
          <div className={"text-md flex-1"}>{item.description}</div>
          <div className={"flex flex-row gap-3 items-center"}>
            <Avatar className={"w-10 h-10"}>
              <AvatarImage src={item.user?.avatar ?? ""} />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <div className={"flex flex-col justify-between"}>
              <div className={"font-bold"}>{item.user?.name}</div>
              <div className={"text-muted-foreground"}>{formatDistanceToNow(item.createdAt)} ago</div>
            </div>
            <div className={"flex-1 text-center"}>
              {(item.comments?.length ?? 0) > 0 && (
                <AvatarGroup
                  avatars={
                    item.comments
                      ?.filter((comment) => comment.user.id !== userId)
                      .map((comment) => ({
                        src: comment.user?.avatar ?? "",
                        label: comment.user?.name ?? "A"
                      })) ?? []
                  }
                  maxVisible={4}
                  size={35}
                  overlap={1}
                />
              )}
            </div>
            <div className="flex items-center gap-1">
              <Heart
                className={cn(
                  " cursor-pointer text-primary hover:scale-125 hover:fill-red-400 hover:text-red-400 transition",
                  item.isLiked && "fill-red-400 text-red-400",
                  likePending && "opacity-25 cursor-not-allowed"
                )}
                onClick={(event) => {
                  if (likePending) {
                    return
                  }
                  if (!isSignedIn) {
                    void openSignIn()
                  } else {
                    likeMutate({ rankId: item.id })
                  }
                  event.preventDefault()
                  event.stopPropagation()
                }}
              />
              <span className="text-sm font-medium">{item._count.likes}</span>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default CuratedCollectionGrid
