"use client"
import { BarChart3Icon, BookmarkIcon, HeartIcon, TrophyIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Avatar } from "~/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"

interface RankI {
  id: string
  title: string
  date: string
  views: string
  likes: string
}

const LikeStar = () => {
  const likedRanks: RankI[] = [
    {
      id: "rank1",
      title: "Top AI Developer Tools",
      date: "3 days ago",
      views: "112.0K",
      likes: "112.0K"
    },
    {
      id: "rank2",
      title: "Top AI Developer Tools",
      date: "3 days ago",
      views: "112.0K",
      likes: "112.0K"
    },
    {
      id: "rank3",
      title: "Top AI Developer Tools",
      date: "3 days ago",
      views: "112.0K",
      likes: "112.0K"
    },
    {
      id: "rank4",
      title: "Top AI Developer Tools",
      date: "3 days ago",
      views: "112.0K",
      likes: "112.0K"
    },
    {
      id: "rank5",
      title: "Top AI Developer Tools",
      date: "3 days ago",
      views: "112.0K",
      likes: "112.0K"
    }
  ]

  const starRanks: RankI[] = [
    {
      id: "rank6",
      title: "Top AI Developer Tools",
      date: "3 days ago",
      views: "112.0K",
      likes: "112.0K"
    },
    {
      id: "rank7",
      title: "Top AI Developer Tools",
      date: "3 days ago",
      views: "112.0K",
      likes: "112.0K"
    },
    {
      id: "rank8",
      title: "Top AI Developer Tools",
      date: "3 days ago",
      views: "112.0K",
      likes: "112.0K"
    }
  ]

  const RankList = ({ ranks, icon }: { ranks: RankI[]; icon: string }) => (
    <div className="divide-y">
      {ranks.map((rank) => (
        <div key={rank.id} className="py-6 first:pt-0 last:pb-0">
          <Link href={`/rank/${rank.id}`} className="flex items-start gap-4 hover:opacity-90 transition-opacity">
            <Avatar className="h-12 w-12 rounded-full overflow-hidden">
              <Image
                src={`https://avatars.githubusercontent.com/u/${Number.parseInt(String(Math.random() * 10000))}?v=4`}
                alt="Avatar"
                width={48}
                height={48}
                className="aspect-square"
              />
            </Avatar>
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-primary">{rank.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{rank.date}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <BarChart3Icon className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">{rank.views}</span>
              </div>
              <div className="flex items-center gap-1">
                {icon === "heart" ? <HeartIcon className="h-5 w-5 text-primary fill-primary" /> : <BookmarkIcon className="h-5 w-5 text-primary fill-primary" />}
                <span className="text-sm text-muted-foreground">{rank.likes}</span>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )

  return (
    <div className="space-y-10">
      {/* Likes Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">Liked Rankings</CardTitle>
        </CardHeader>
        <CardContent>
          <RankList ranks={likedRanks} icon="heart" />
        </CardContent>
      </Card>

      {/* Star Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">Stared Rankings</CardTitle>
        </CardHeader>
        <CardContent>
          <RankList ranks={starRanks} icon="bookmark" />
        </CardContent>
      </Card>
    </div>
  )
}

export default LikeStar
