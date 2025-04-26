import { BarChart2, Heart } from "lucide-react"
import Image from "next/image"
import type { FC } from "react"

interface RankItem {
  title: string
  description: string
  views: number
  likes: number
  imageUrl: string
}

interface TopRankedProps {
  items: RankItem[]
  title?: string
  className?: string
}

export const RankList: FC<TopRankedProps> = ({ title = "Top Ranked", items, className }) => {
  return (
    <div className={className}>
      <h2 className="text-2xl font-bold text-primary mb-4">Top Ranked</h2>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={`rank-list-${item.title}-${index}`} className="rounded-sm border border-primary bg-card p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <Image src={item.imageUrl} alt={item.title} width={48} height={48} className="rounded-full" />
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <BarChart2 className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">{item.views.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">{item.likes.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
