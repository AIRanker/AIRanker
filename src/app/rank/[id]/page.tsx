import Comments from "~/app/rank/[id]/_components/comment"
import RankerContent from "~/app/rank/[id]/_components/content"
import RankAction from "~/app/rank/[id]/_components/rank-action"
import { api } from "~/trpc/server"
const RankerPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const detail = await api.rank.detail({ rankId: id })
  await api.software.getSoftwaresByRankId.prefetch({ rankId: id })
  return (
    <>
      {detail && <RankAction detail={detail} id={id} />}
      <RankerContent id={id} />
      <Comments />
    </>
  )
}

export default RankerPage
