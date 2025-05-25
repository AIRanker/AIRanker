"use client"
import { useAuth, useClerk } from "@clerk/nextjs"
import { formatDistanceToNow } from "date-fns"
import { MessageSquare, ThumbsUp } from "lucide-react"
import { useState } from "react"
import * as React from "react"
import { RankCommentReply } from "~/app/rank/[id]/_components/rank-comment-reply"
import { ToolCommentReply } from "~/app/tool/[id]/_components/tool-comment-reply"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Button } from "~/components/ui/button"
import type { ToolCommentListResult } from "~/server/services/software-comment"
import { api } from "~/trpc/react"

interface ToolCommentProps {
  comment: ToolCommentListResult["list"][number] & {
    user?: {
      avatar?: string
      name?: string
    }
  }
  softwareId: string
}

const ToolCommentItem = ({ comment, softwareId }: ToolCommentProps) => {
  return (
    <div className={"mt-4 flex flex-col rounded-lg p-3  border-b border-gray-100"}>
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
          <ToolCommentReply softwareId={softwareId} replyMessage={comment}>
            <div>Reply</div>
          </ToolCommentReply>
        </div>
      </div>
      <div className={"text-gray-400"}>
        {comment.comment}
        <div className="mb-1 text-xs text-gray-500">
          {comment.replyCount} {comment.replyCount === 1 ? "reply" : "replies"}
        </div>
        {comment.replyCount > 0 && (
          <div className="mt-2 space-y-2 rounded-lg border-t pt-2">
            {comment.replies.map((reply) => (
              <div key={reply.id} className="rounded border p-3">
                <div className="flex items-center justify-between text-xs font-bold">
                  <div className={"flex flex-row gap-4 items-center text-sm"}>
                    <Avatar className={"w-6 h-6"}>
                      <AvatarImage src={comment.user?.avatar} />
                      <AvatarFallback>{comment.user?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>{comment.user?.name}</div>
                    {/*TODO：回复的用户信息*/}
                    {reply.replyToUser && reply.replyToComment !== comment.id && <span className="mx-1 text-gray-500">replied to {reply.replyToUser}</span>}
                    <span className="ml-2 text-gray-500">{formatDistanceToNow(reply.createdAt)}</span>
                  </div>
                  <div className={"flex cursor-pointer flex-row items-center gap-4 text-xs"}>
                    {/*{compareStringToUpperCase(address, reply.createdBy) && <DeleteMessage messageId={reply.id} />}*/}
                    <ToolCommentReply softwareId={softwareId} replyMessage={reply}>
                      <div>Reply</div>
                    </ToolCommentReply>
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

const ToolComments = ({ id }: { id: string }) => {
  const { isSignedIn } = useAuth()
  const { openSignIn } = useClerk()
  const [pageNow, setPageNoe] = useState<number>(0)
  const { data, isPending } = api.softwareComment.getComments.useQuery({
    softwareId: id,
    pageable: {
      page: pageNow,
      size: 10
    }
  })
  return (
    <div className="container py-8" id="comments">
      <h2 className="text-2xl font-bold mb-6 text-primary">Comments</h2>
      <div className="space-y-1">
        {data?.list?.map((comment) => (
          <ToolCommentItem key={`comment-${comment.id}`} comment={comment} softwareId={id} />
        ))}
        {data?.list?.length === 0 && (
          <div>
            <div className="flex flex-col items-center justify-center">
              <MessageSquare size={65} className="text-primary mb-2" />
              <div className="text-gray-500 text-xl space-y-8 text-center">
                <div>No comments yet.</div>
                {isSignedIn ? (
                  <ToolCommentReply softwareId={id}>
                    <Button>Post the first message</Button>
                  </ToolCommentReply>
                ) : (
                  <Button variant={"outline"} onClick={() => openSignIn()}>
                    Sign in to post a comment
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ToolComments
