"use client"
import { formatDistanceToNow } from "date-fns"
import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import Link from "next/link"
import CuratedCollectionGrid from "~/app/(home)/_components/curated-collection-grid"
import SoftwareAction from "~/app/(home)/_components/software-action"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Separator } from "~/components/ui/separator"
import { cn } from "~/lib/utils"
import type { SoftwareByRankIdResult } from "~/server/services/software"
import { api } from "~/trpc/react"

interface RankerContentProps {
  id: string
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
            "rounded-2xl border-[1px] p-6 bg-background text-center flex flex-col justify-center gap-4 items-center relative",
            index === 0 ? "border-primary border-2 z-10" : "border-border z-0", // 中间的优先显示
            index === 1 && "order-1 mt-6", // 左边
            index === 0 && "order-2", // 中间
            index === 2 && "order-3 mt-6" // 右边
          )}
        >
          {item.image && item.image.trim().length > 0 && (
            <Avatar className={"size-20"}>
              <AvatarImage src={item.image} />
              <AvatarFallback>{item.name}</AvatarFallback>
            </Avatar>
          )}
          <Link target="_blank" href={`/tool/${item.id}`} className="text-xl font-semibold text-muted-foreground">
            {item.name}
          </Link>
          <SoftwareAction item={item} comment={false} />
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
  const { data, isLoading } = api.software.getSoftwaresByRankId.useQuery({ rankId: id })
  console.log("data", data)
  const { data: rank, isPending: rankPending } = api.rank.topRanks.useQuery()
  return (
    <>
      <div className={"flex flex-col justify-center max-w-4xl mx-auto"}>
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
            : data?.map((item, index) => (
                <div key={`item-${item.id}`} className="rounded-2xl border-[1px] p-6 bg-background relative flex flex-col gap-4">
                  <div className=" flex flex-row gap-4">
                    {item.image && item.image.trim().length > 0 && (
                      <Avatar className={"size-20"}>
                        <AvatarImage src={item.image} />
                        <AvatarFallback>{item.name}</AvatarFallback>
                      </Avatar>
                    )}
                    <div className="flex flex-col">
                      <div className="flex flex-row gap-4">
                        <Link target="_blank" href={item.url} className="text-xl font-semibold text-muted-foreground">
                          {item.name}
                        </Link>
                        <SoftwareAction item={item} className="size 4" comment={false} />
                      </div>
                      <div className={"text-sm text-muted-foreground/60"}>{item.description}</div>
                    </div>
                  </div>
                  <div className="relative text-left text-primary border-l-4 border-primary pl-4 w-full">
                    <span className="italic underline">{item.rankDescription}</span>
                  </div>
                </div>
              ))}
        </div>
      </div>

      <div className={"text-3xl text-primary font-bold mt-10"}>Suggestion</div>
      <div className="mt-10 grid grid-cols-3 gap-4">
        <CuratedCollectionGrid isPending={rankPending} data={{ list: (rank ?? []).slice(0, 3) }} />
      </div>
    </>
  )
}

export default RankContent
