"use client"
import { Button } from "@radix-ui/themes"
import { formatDistanceToNow } from "date-fns"
import { MessageSquare, ThumbsUp } from "lucide-react"
import { useState } from "react"
import { RankCommentReply } from "~/app/rank/[id]/_components/rank-comment-reply"
import type { CommentListResult } from "~/server/services/rank-comment"
import { api } from "~/trpc/react"

const RankCommentItem = ({ comment }: { comment: CommentListResult["list"][number] }) => {
  return (
    <div className="flex gap-3 py-4 border-b border-gray-100">
      {/*<Avatar className="h-10 w-10">*/}
      {/*  <AvatarImage src={comment.author.avatar} />*/}
      {/*  <AvatarFallback>{comment.author.username[0]}</AvatarFallback>*/}
      {/*</Avatar>*/}
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">@{comment.createdBy}</div>
        <p className="text-sm text-gray-700 mb-2">{comment.comment}</p>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span className="text-xs">{formatDistanceToNow(comment.createdAt)}</span>
          <div className="flex items-center gap-1">
            <ThumbsUp size={14} className="cursor-pointer" />
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare size={14} className="cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  )
}

const RankComments = ({ id }: { id: string }) => {
  const [pageNow, setPageNoe] = useState<number>(0)
  const { data, isPending } = api.rankComment.getComments.useQuery({
    rankId: id,
    pageable: {
      page: pageNow,
      size: 10
    }
  })
  return (
    <div className="container py-8">
      <h2 className="text-2xl font-bold mb-6 text-primary">Comments</h2>
      <div className="space-y-1">
        {data?.list?.map((comment) => (
          <RankCommentItem key={comment.id} comment={comment} />
        ))}
        {data?.list?.length === 0 && (
          <div>
            <div className="flex flex-col items-center justify-center">
              <MessageSquare size={65} className="text-primary mb-2" />
              <div className="text-gray-500 text-xl space-y-8 text-center">
                <div>No comments yet.</div>
                <RankCommentReply rankId={id}>
                  <Button>Post the first message</Button>
                </RankCommentReply>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default RankComments
