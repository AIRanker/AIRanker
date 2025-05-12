"use client"

import { Heart } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { AvatarGroup } from "~/components/ui/avatar-group"
import { Badge } from "~/components/ui/badge"
import { cn } from "~/lib/utils"
import { api } from "~/trpc/react"

const CuratedCollection = () => {
  const { data, isPending } = api.rank.pageRanks.useQuery({
    pageable: { page: 0, size: 10 }
  })
  console.log(data, "dat1a")
  return (
    <>
      <h1 className="mt-20 text-4xl font-bold">Curated Collections</h1>
      <div className="mt-10 grid grid-cols-3 gap-4">
        {data?.list?.map((item) => (
          <div key={`cc-${item.id}`} className={"flex flex-col border border-primary rounded-lg p-5 gap-4"}>
            <img
              className={"aspect-square h-60 w-full rounded-t-lg object-cover"}
              alt={"data"}
              src={"https://storage.googleapis.com/repofi-prod/launchpad/avatar/1745410111571_airanker.svg"}
            />
            <div className={"text-primary text-2xl font-bold"}>{item.name}</div>
            <div className={"text-md flex-1"}>{item.description}</div>
            <div className={"flex flex-row gap-3 items-center"}>
              <Avatar className={"w-10 h-10"}>
                <AvatarImage src={"https://storage.googleapis.com/repofi-prod/launchpad/avatar/1745410111571_airanker.svg"} />
                <AvatarFallback>{"err"}</AvatarFallback>
              </Avatar>
              <div className={"flex flex-col justify-between"}>
                <div className={"font-bold"}>@alex</div>
                <div className={"text-muted-foreground"}>3 days ago</div>
              </div>
              <div className={"flex-1 text-center"}>
                <AvatarGroup
                  avatars={[
                    {
                      src: "https://pbs.twimg.com/profile_images/1913868626605535232/yYTNh-zg_400x400.jpg",
                      label: "preett"
                    },
                    {
                      src: "https://pbs.twimg.com/profile_images/1909249051968839680/MdA0uZV4_400x400.png",
                      label: "21st.dev"
                    },
                    {
                      src: "https://pbs.twimg.com/profile_images/1593304942210478080/TUYae5z7_400x400.jpg",
                      label: "shadcn"
                    },
                    { src: "https://hextaui.com/logo.svg", label: "HextaUI" },
                    { src: "/logo.png", label: "HextaUI" },
                    { src: "/logo.png", label: "HextaUI" }
                  ]}
                  maxVisible={4}
                  size={35}
                  overlap={1}
                />
              </div>
              <div className="flex items-center gap-1">
                <Heart className={cn("cursor-pointer text-primary hover:scale-125 hover:fill-red-400 hover:text-red-400 transition")} />
                <span className="text-sm font-medium">{0}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default CuratedCollection
