import { Bookmark, Heart, Share2 } from "lucide-react"
import Link from "next/link"
import Comments from "~/app/rank/[id]/_components/comment"
import RankerContent from "~/app/rank/[id]/_components/content"
import { Badge } from "~/components/ui/badge"
import { api } from "~/trpc/server"
import { format } from "date-fns" 

const RankerPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const detail = await api.rank.detail({rankId: id  })
  const formattedDate = format(new Date(detail.createdAt), "MMMM d, yyyy") // 格式化时间

  return (
    <>
      <div className="container py-8 space-y-4">
        <h1 className="text-6xl font-bold mb-2 text-primary">{detail.name}</h1>
        <div className="flex items-center mt-6 gap-4 text-primary font-bold">
          <Link href={"/profile/"} className="hover:underline">
            @{detail.user.name}
          </Link>
          <div>{formattedDate}</div>
        </div>
        <p className="opacity-60">
          {detail.description}
        </p>
        <div className="flex flex-wrap gap-2 text-lg">
          {
            detail.tags.map((tag) => (
              <Badge key={`rank-tag-${tag}`} variant={"outline"} className={"px-5 py-1 font-bold"}>
                #{tag}
              </Badge>
            ))
          }
        </div>
        <div className="flex items-center gap-4 mt-4">
          <Heart size={20} />
          <Bookmark size={20} />
          <Share2 size={20} />
        </div>
      </div>
      <RankerContent />
      <Comments />
    </>
  )
}

export default RankerPage
