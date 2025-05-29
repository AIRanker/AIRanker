import AskHero from "~/app/_components/ask-hero"
import CuratedCollection from "~/app/_components/curated-collection"
import TopTools from "~/app/_components/top-tools"
import { HydrateClient, api } from "~/trpc/server"

export default async function Home() {
  await api.rank.topRanks.prefetch()
  return (
    <HydrateClient>
      <div className={"w-full flex flex-row gap-6 relative overflow-hidden"}>
        <AskHero />
      </div>
      <CuratedCollection />
      <TopTools />
    </HydrateClient>
  )
}
