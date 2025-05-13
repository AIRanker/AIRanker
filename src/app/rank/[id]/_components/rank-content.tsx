"use client"
import { motion } from "framer-motion"
import { cn } from "~/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import Link from "next/link"
import { Separator } from "~/components/ui/separator"
import { Heart, MessageCircle, Share2, Star } from "lucide-react"
import { api } from "~/trpc/react"
import type { SoftwareByRankIdResult } from "~/server/services/software"
import { toast } from "sonner"
import { useAuth, useClerk } from "@clerk/nextjs"
interface RankerContentProps {
  id: string
}

const SoftwareAction = ({ item, className }: { item: SoftwareByRankIdResult[number]; className?: string }) => {
  const { isSignedIn } = useAuth()
  const { openSignIn } = useClerk()
  const useUtils = api.useUtils()
  const { mutate: starMutate } = api.software.fav.useMutation({
    onSuccess: () => {
      void useUtils.software.getSoftwaresByRankId.refetch()
    },
    onError: (error) => {
      console.error(error)
      toast.error("Failed to star the rank", { duration: 3000 })
    }
  })
  const { mutate: likeMutate } = api.software.like.useMutation({
    onSuccess: () => {
      void useUtils.software.getSoftwaresByRankId.refetch()
    },
    onError: (error) => {
      console.error(error)
      toast.error("Failed to like the rank", { duration: 3000 })
    }
  })
  return (
    <div className="flex items-center gap-4 z-20">
      <div className="flex items-center gap-1">
        <Star
          className={cn("cursor-pointer text-primary hover:scale-125 hover:fill-yellow-400 hover:text-yellow-400 transition", className)}
          onClick={(event) => {
            if (!isSignedIn) {
              void openSignIn()
            } else {
              starMutate({ softwareId: item.id })
            }
            event.preventDefault()
            event.stopPropagation()
          }}
        />
        <span className="text-sm font-medium">{item._count.likes ?? 0}</span>
      </div>
      <div className="flex items-center gap-1">
        <Heart
          className={cn(" cursor-pointer text-primary hover:scale-125 hover:fill-red-400 hover:text-red-400 transition", className)}
          onClick={(event) => {
            if (!isSignedIn) {
              void openSignIn()
            } else {
              likeMutate({ softwareId: item.id })
            }
            event.preventDefault()
            event.stopPropagation()
          }}
        />
        <span className="text-sm font-medium">{item._count.stars ?? 0}</span>
      </div>
      <div className="flex items-center gap-1">
        <MessageCircle
          className={cn("cursor-pointer text-primary hover:scale-125 hover:fill-green-400 hover:text-green-400 transition", className)}
          onClick={(event) => {
            if (!isSignedIn) {
              void openSignIn()
            } else {
              likeMutate({ softwareId: item.id })
            }
            event.preventDefault()
            event.stopPropagation()
          }}
        />
        <span className="text-sm font-medium">{item._count.stars ?? 0}</span>
      </div>
      <div>
        <Share2 className={"cursor-pointer text-primary hover:scale-125 hover:fill-blue-400 hover:text-blue-400 transition"} />
      </div>
    </div>
  )
}

const RankTopList = ({ data }: { data: SoftwareByRankIdResult }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {data.slice(0, 3).map((item, index) => (
        <motion.div
          key={`${item.id}-${item.rankIndex}`}
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
          <Avatar className={"size-20"}>
            <AvatarImage src={item.image ?? ""} />
            <AvatarFallback>{item.name}</AvatarFallback>
          </Avatar>
          <Link target="_blank" href={item.url} className="text-xl font-semibold text-muted-foreground">
            {item.name}
          </Link>
          <SoftwareAction item={item} />
          <div className={"text-muted-foreground/60"}>{item.description}</div>
          <Separator />
          <div className="relative mt-2 text-left text-primary border-l-4 border-primary pl-4 w-full">
            <span className="italic underline">{item.rankDescription}</span>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

const RankContent = ({ id }: RankerContentProps) => {
  const { data } = api.software.getSoftwaresByRankId.useQuery({ rankId: id })
  const { data: articleData } = api.article.getArticlesByRankId.useQuery({ rankId: id })
  return (
    <div className={"flex flex-col justify-center -mt-40"}>
      {data && <RankTopList data={data} />}
      <div className="mt-20 grid grid-cols-3 gap-8">
        <div className="col-span-2 flex flex-col gap-4">
          {(data?.length ?? 0) > 3 &&
            data?.slice(3).map((item, index) => (
              <div key={`item-${item.id}`} className="rounded-2xl border-[1px] p-6 bg-background relative flex flex-col gap-4">
                <div className=" flex flex-row gap-4">
                  <div className="size-7 absolute -top-4 -left-2 text-primary bg-background text-2xl">#{index + 4}</div>
                  <Avatar className={"size-20"}>
                    <AvatarImage src={item.image ?? ""} />
                    <AvatarFallback>{item.name}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <div className="flex flex-row gap-4">
                      <Link target="_blank" href={item.url} className="text-xl font-semibold text-muted-foreground">
                        {item.name}
                      </Link>
                      <SoftwareAction item={item} className="size 4" />
                    </div>
                    <div className={"text-muted-foreground/60"}>{item.description}</div>
                  </div>
                </div>
                <div className="relative text-left text-primary border-l-4 border-primary pl-4 w-full">
                  <span className="italic underline">{item.description}</span>
                </div>
              </div>
            ))}
        </div>
        <div className="col-span-1 flex flex-col rounded-2xl border-[1px] p-6 bg-background">
          <div className="mb-4 text-2xl font-bold text-primary"># Recently Articles</div>
          {
            articleData?.map((item) => (
              <div key={item.id} className="flex flex-row gap-4 items-center mb-4 justify-between">
                <Link target="_blank" href={"/"} className="font-semibold text-muted-foreground hover:underline">
                  {item.title}
                </Link>
                <div className="text-xs text-muted-foreground">{item.createdAt.toLocaleDateString()}</div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default RankContent
