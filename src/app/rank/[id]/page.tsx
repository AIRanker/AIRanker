import Comments from "~/app/rank/[id]/_components/comment"
import RankDetail from "~/app/rank/[id]/_components/rank-detail"
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
      <Comments />
    </>
  )
}

export default RankerPage
