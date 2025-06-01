import { Heart } from "lucide-react"
import type React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Badge } from "~/components/ui/badge"
import type { SoftwareByRankIdResult } from "~/server/services/software"

interface RankerDetailProps {
  item: SoftwareByRankIdResult[number]
}

const RankerDetail: React.FC<RankerDetailProps> = ({ item }) => {
  const { name, description, likes, tags, url, image } = item
  return (
    <div className="rounded-xl border border-secondary p-6 hover:shadow-md transition-shadow flex flex-col gap-4">
      <div className="flex items-center gap-4 ">
        <Avatar className={"rounded-full size-12 border border-primary"}>
          <AvatarImage src={image ?? "https://storage.googleapis.com/repofi-prod/launchpad/avatar/1745410111571_airanker.svg"} />
          <AvatarFallback>{name}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="text-xl font-bold">{name}</h3>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Heart size={20} />
            <span className="text-gray-600">{likes}</span>
          </div>
        </div>
      </div>

      {description && <p className="">{description}</p>}

      <div className="flex flex-wrap gap-2 ">
        {tags.map((tag, index) => (
          <Badge variant={"outline"} key={`badge-${tag}-${index}-${name}`} className="px-3 py-1 border-primary border font-bold text-sm">
            #{tag}
          </Badge>
        ))}
      </div>

      {url && (
        <a href={url} className="inline-block" target="_blank" rel="noopener noreferrer">
          {url}
        </a>
      )}
    </div>
  )
}

export default RankerDetail
