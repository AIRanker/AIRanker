import { BarChart2 } from "lucide-react"
import type React from "react"
import type { FC } from "react"
import { cn } from "~/lib/utils"

interface RankItemProps {
  title: string
  token: number
}

const RankItem: FC<RankItemProps> = ({ title, token }) => {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-2">
        <div className="size-6 rounded-full bg-gray-200" />
        <span className="font-bold text-nowrap text-xs">{title}</span>
      </div>
      <div className="text-right text-nowrap text-xs">{token.toLocaleString()} TOKEN</div>
    </div>
  )
}

interface RankCardProps {
  title: string
  items: RankItemProps[]
  className?: string
  icon?: React.ReactNode
}

export const RankCard: FC<RankCardProps> = ({ icon = <BarChart2 className="size-5" />, title, items, className }) => {
  return (
    <div className={cn("p-4", className)}>
      <div className="mb-4 flex items-center gap-2 text-primary">
        {icon}
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="space-y-1 divide-y">
        {items.map((item, index) => (
          <RankItem key={`rank-home-${index}-${item.title}`} title={item.title} token={item.token} />
        ))}
      </div>
    </div>
  )
}
