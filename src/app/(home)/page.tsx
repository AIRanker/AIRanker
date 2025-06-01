import CuratedCollection from "~/app/(home)/_components/curated-collection"
import TopTools from "~/app/(home)/_components/top-tools"
import { HydrateClient, api } from "~/trpc/server"
import AskHero from "./_components/ask-hero"

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
