import { CommandSearch } from "~/app/_components/command-search"
import CuratedCollection from "~/app/_components/curated-collection"
import TopTools from "~/app/_components/top-tools"
import { SplineScene } from "~/components/ui/splite"
import { cn } from "~/lib/utils"
import { HydrateClient, api } from "~/trpc/server"

export default async function Home() {
  await api.rank.topRanks.prefetch()
  return (
    <>
      <div className={"w-full flex flex-row mt-12 gap-6 relative overflow-hidden"}>
        <div className={"space-y-4 flex flex-col justify-center"}>
          <div className={"text-5xl font-bold tracking-tight"}>
            <div>
              Crowd-Ranked AI Tools <br /> Globally Compared.
            </div>
          </div>
          <div className={"text-lg opacity-50"}>
            Discover the most impactful AI tools across categories — ranked by the global community, tracked by region, and driven by open participation.
          </div>
          <CommandSearch />
        </div>
        {/*<BannerIcon />*/}
        <SplineScene
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className={cn(
            // 基础样式
            "relative bg-neutral-800 h-16 w-64 border text-left p-3 text-gray-50 text-base font-bold rounded-lg overflow-hidden",

            // 文本和下划线效果
            "underline underline-offset-2 origin-left",
            "hover:underline hover:underline-offset-4 hover:decoration-2 hover:text-rose-300",

            // 动画过渡效果
            "duration-500 before:duration-500 after:duration-500",
            "hover:duration-500 group-hover:before:duration-500 group-hover:after:duration-500",

            // 边框效果
            "hover:border-rose-300",

            // before 伪元素 (紫色光晕)
            "before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-violet-500 before:rounded-full before:blur-lg",
            "hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf]",

            // after 伪元素 (粉色光晕)
            "after:absolute after:z-10 after:w-20 after:h-20 after:content[''] after:bg-rose-300 after:right-8 after:top-3 after:rounded-full after:blur-lg",
            "hover:after:-right-8"
          )}
        />
      </div>
      <TopTools />
      <CuratedCollection />
    </>
  )
}
