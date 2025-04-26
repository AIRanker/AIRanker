import { RankCard } from "~/app/_components/rank-card"
import { RankList } from "~/app/_components/rank-list"
import { HydrateClient, api } from "~/trpc/server"

export default async function Home() {
  const topEarningItems = [
    { title: "Top LLM Libraries", token: 1280 },
    { title: "Top LLM Libraries", token: 1280 },
    { title: "Top LLM Libraries", token: 1280 },
    { title: "Top LLM Libraries", token: 1280 },
    { title: "Top LLM Libraries", token: 1280 }
  ]

  const topRankedItems = [
    {
      title: "Top AI Developer Tools",
      description: "Curated list of the best AI SDKs, APIs, and CLIs",
      views: 112000,
      likes: 112000,
      imageUrl: "https://avatars.githubusercontent.com/u/6412038?v=4"
    },
    {
      title: "Top AI Developer Tools",
      description: "Curated list of the best AI SDKs, APIs, and CLIs",
      views: 112000,
      likes: 112000,
      imageUrl: "https://avatars.githubusercontent.com/u/9892522?v=4"
    },
    {
      title: "Top AI Developer Tools",
      description: "Curated list of the best AI SDKs, APIs, and CLIs",
      views: 112000,
      likes: 112000,
      imageUrl: "https://avatars.githubusercontent.com/u/17571969?v=4"
    },
    {
      title: "Top AI Developer Tools",
      description: "Curated list of the best AI SDKs, APIs, and CLIs",
      views: 112000,
      likes: 112000,
      imageUrl: "https://avatars.githubusercontent.com/u/1315101?v=4"
    },
    {
      title: "Top AI Developer Tools",
      description: "Curated list of the best AI SDKs, APIs, and CLIs",
      views: 112000,
      likes: 112000,
      imageUrl: "https://avatars.githubusercontent.com/u/4921183?v=4"
    },
    {
      title: "Top AI Developer Tools",
      description: "Curated list of the best AI SDKs, APIs, and CLIs",
      views: 112000,
      likes: 112000,
      imageUrl: "https://avatars.githubusercontent.com/u/8784712?v=4"
    }
  ]
  const rankList = await api.rank.topRanks()
  return (
    <HydrateClient>
      <div className={"h-full w-full grid grid-cols-1 md:grid-cols-4 mt-12 gap-6"}>
        <div className={"col-span-1 md:col-span-3 space-y-20"}>
          <div className={"space-y-4"}>
            <div className={"text-5xl font-bold tracking-tight text-primary"}>
              <div>AIRanker</div>
              <div>Unlock the Power of Open</div>
              <div>Source Rankings</div>
            </div>
            <div className={"text-xl opacity-50"}>
              Discover, Rank, and Earn from the Best Open
              <br />
              Source Projects on Web3
            </div>
          </div>
          <RankList items={topRankedItems} />
        </div>
        <div className={"col-span-1 space-y-4"}>
          <RankCard title="Top Earning Rankings" items={topEarningItems} className="w-full" />
        </div>
      </div>
    </HydrateClient>
  )
}
