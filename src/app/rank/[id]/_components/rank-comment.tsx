"use client"
import { Button } from "@radix-ui/themes"
import { formatDistanceToNow } from "date-fns"
import { MessageSquare, ThumbsUp } from "lucide-react"
import { useState } from "react"
import * as React from "react"
import { RankCommentReply } from "~/app/rank/[id]/_components/rank-comment-reply"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import type { CommentListResult } from "~/server/services/rank-comment"
import { api } from "~/trpc/react"

interface RankCommentItemProps {
  comment: CommentListResult["list"][number] & {
    user?: {
      avatar?: string
      name?: string
    }
  }
  rankId: string
}

const RankCommentItem = ({ comment, rankId }: RankCommentItemProps) => {
  return (
    <div className={"mt-4 flex flex-col rounded-lg p-3 border-b border-gray-100"}>
      <div className={"flex flex-row items-center justify-between"}>
        <div className={"flex flex-row gap-4 items-center text-sm"}>
          <Avatar className={"w-6 h-6"}>
            <AvatarImage src={comment.user?.avatar} />
            <AvatarFallback>{comment.user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>{comment.user?.name}</div>
          <span className={"text-xs text-gray-400"}>{formatDistanceToNow(comment.createdAt)}</span>
        </div>
        <div className={"flex cursor-pointer flex-row items-center gap-4 text-xs"}>
          {/*TODO 删除*/}
          {/*{compareStringToUpperCase(address, item.createdBy) && <DeleteMessage messageId={item.id} />}*/}
          <RankCommentReply rankId={comment.id} replyMessage={comment}>
            <div>Reply</div>
          </RankCommentReply>
        </div>
      </div>
      <div className={"text-gray-400"}>
        <div className={"my-4"}>{comment.comment}</div>
        <div className="mb-1 text-xs text-gray-500">
          {comment.replyCount} {comment.replyCount === 1 ? "reply" : "replies"}
        </div>
        {comment.replyCount >= 0 && (
          <div className="mt-2 space-y-2 rounded-lg border-t pt-2">
            {comment.replies.map((reply) => (
              <div key={reply.id} className="rounded p-3">
                <div className="flex flex-row items-center justify-between text-xs font-bold">
                  <div>
                    {reply.createdBy}
                    {reply.replyToUser && reply.replyToComment !== comment.id && <span className="mx-1 text-gray-500">replied to {reply.replyToUser}</span>}
                    <span className="ml-2 text-gray-500">{formatDistanceToNow(reply.createdAt)}</span>
                  </div>
                  <div className={"flex cursor-pointer flex-row items-center gap-4 text-xs"}>
                    {/*{compareStringToUpperCase(address, reply.createdBy) && <DeleteMessage messageId={reply.id} />}*/}
                    <RankCommentReply rankId={rankId} replyMessage={reply}>
                      <div>Reply</div>
                    </RankCommentReply>
                  </div>
                </div>
                <div className="mt-1 text-sm font-thin">{reply.comment}</div>
              </div>
            ))}
          </div>
        )}
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
          <RankCommentItem key={`comment-${comment.id}`} comment={comment} rankId={id} />
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
