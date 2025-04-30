import { Bookmark, Heart, Share2 } from "lucide-react"
import Link from "next/link"
import Comments from "~/app/rank/[id]/_components/comment"
import RankerContent from "~/app/rank/[id]/_components/content"
import { Badge } from "~/components/ui/badge"

const RankerPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params

  return (
    <>
      <div className="container py-8 space-y-4">
        <h1 className="text-6xl font-bold mb-2 text-primary">Top AI Frameworks 2024</h1>
        <div className="flex items-center mt-6 gap-4 text-primary font-bold">
          <Link href={"/profile/"} className="hover:underline">
            @AliceDev
          </Link>
          <div className="flex items-center px-4 border-x border-primary">
            <span>Score:</span>
            <span>92.6</span>
          </div>
          <div>March 28, 2025 </div>
        </div>
        <p className="opacity-60">
          A curated list of the most powerful open-source <br /> frameworks for AI developers in 2024
        </p>
        <div className="flex flex-wrap gap-2 text-lg">
          <Badge variant={"outline"} className={"px-5 py-1 font-bold"}>
            #AI
          </Badge>
          <Badge variant={"outline"} className={"px-5 py-1 font-bold"}>
            #Framework
          </Badge>
          <Badge variant={"outline"} className={"px-5 py-1 font-bold"}>
            #OpenSource
          </Badge>
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
