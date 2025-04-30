import { RankList } from "~/app/_components/rank-list"
import { RankToken } from "~/app/_components/rank-token"
import { HydrateClient, api } from "~/trpc/server"

export default async function Home() {
  const topEarningItems = [
    { title: "Top LLM Libraries", token: 1280 },
    { title: "Top LLM Libraries", token: 1280 },
    { title: "Top LLM Libraries", token: 1280 },
    { title: "Top LLM Libraries", token: 1280 },
    { title: "Top LLM Libraries", token: 1280 }
  ]
  await api.rank.topRanks.prefetch()
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
          <RankList />
        </div>
        <div className={"col-span-1 space-y-4"}>
          <RankToken title="Top Earning Rankings" items={topEarningItems} className="w-full" />
        </div>
      </div>
    </HydrateClient>
  )
}
