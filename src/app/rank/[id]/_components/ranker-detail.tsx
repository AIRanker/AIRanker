import { SiDiscord, SiGithub, SiTelegram, SiX } from "@icons-pack/react-simple-icons"
import { Heart } from "lucide-react"
import Link from "next/link"
import type React from "react"
import { Badge } from "~/components/ui/badge"

interface RankerDetailProps {
  title: string
  description: string
  author: string
  createdAt: string
  usedInCount: number
  likes: number
  comments: number
  tags: string[]
  githubUrl?: string
}

const RankerDetail: React.FC<RankerDetailProps> = ({ title, description, author, createdAt, usedInCount, likes, tags, githubUrl }) => {
  return (
    <div className="rounded-xl border border-secondary p-6 hover:shadow-md transition-shadow flex flex-col gap-4">
      <div className="flex items-center gap-4 ">
        <div className="w-12 h-12 bg-gray-200 rounded-full" />
        <div className="flex-1">
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Heart size={20} />
            <span className="text-gray-600">{likes}</span>
          </div>
        </div>
      </div>

      <p className="">{description}</p>

      <div className="flex items-center gap-2 text-sm text-primary font-bold ">
        <Link href={`/profile/${author.replace("@", "")}`} className="hover:underline">
          {author}
        </Link>
        <span>|</span>
        <span>{createdAt}</span>
        <span>|</span>
        <span>Used in {usedInCount} rankings</span>
      </div>

      <div className="flex flex-wrap gap-2 ">
        {tags.map((tag, index) => (
          <Badge variant={"outline"} key={`badge-${tag}-${index}-${title}`} className="px-3 py-1 border-primary border font-bold text-sm">
            #{tag}
          </Badge>
        ))}
      </div>

      {githubUrl && (
        <a href={githubUrl} className="inline-block" target="_blank" rel="noopener noreferrer">
          <SiGithub />
        </a>
      )}
    </div>
  )
}

export default RankerDetail
