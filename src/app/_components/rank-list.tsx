import { BarChart2, Heart } from "lucide-react"
import Link from "next/link"
import type { FC } from "react"
import type { TopRanksResult } from "~/server/services/rank"

interface TopRankedProps {
  items: TopRanksResult
  title?: string
  className?: string
}

export const RankList: FC<TopRankedProps> = ({ title = "Top Ranked", items, className }) => {
  return (
    <div className={className}>
      <h2 className="text-2xl font-bold text-primary mb-4">{title}</h2>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={`rank-list-${item.name}-${index}`} className="rounded-sm border border-primary bg-card p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              {/*<div className="flex-shrink-0">*/}
              {/*  <Image src={item.} alt={item.title} width={48} height={48} className="rounded-full" />*/}
              {/*</div>*/}
              <div className="flex-grow">
                <Link className="text-lg font-bold" href={`/rank/${item.id}`}>
                  {item.name ?? "Unnames Rank"}
                </Link>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <BarChart2 className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">{item.likes ?? 0}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">{item.stars ?? 0}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
