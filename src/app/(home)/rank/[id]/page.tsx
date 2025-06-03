import RankComments from "~/app/(home)/rank/[id]/_components/rank-comment"
import RankDetail from "~/app/(home)/rank/[id]/_components/rank-detail"
import PopularCollection from "~/app/(home)/rank/[id]/_components/popular-collection"
import { api } from "~/trpc/server"
import RankContent from "./_components/rank-content"
const RankerPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const detail = await api.rank.detail({ rankId: id })
  await api.software.getSoftwaresByRankId.prefetch({ rankId: id })
  return (
    <>
      {detail && <RankDetail detail={detail} id={id} />}
      <RankContent id={id} />
      <RankComments id={id} />
      <PopularCollection />
    </>
  )
}

export default RankerPage
