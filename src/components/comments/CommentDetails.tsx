import {
  fetchCommentsByPostId,
  type CommentWithAuthor,
} from "@/db/queries/comments"
import Image from "next/image"
import CreateCommentForm from "./CreateCommentForm"

interface CommentDetailsProps {
  commentId: string
  postId: string
}

async function CommentDetails({ commentId, postId }: CommentDetailsProps) {
  const comments = await fetchCommentsByPostId(postId)
  const comment = comments.find((com) => com.id === commentId)

  if (!comment) return null

  const children = comments.filter((com) => com.parentId === commentId)
  const renderedChildren = children.map((child) => (
    <CommentDetails commentId={child.id} postId={postId} key={child.id} />
  ))

  return (
    <div className="mt- mb-1 p-4 border">
      <div className="flex gap-3">
        <Image
          src={comment.user.image || ""}
          alt="user image"
          width={40}
          height={40}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1 space-y-3">
          <p className="text-sm font-medium text-gray-500"></p>
          <p className="text-gray-900">{comment.content}</p>
          {comment.user.name}

          <CreateCommentForm postId={comment.postId} parentId={comment.id} />
        </div>
      </div>
      <div className="pl-4">{renderedChildren}</div>
    </div>
  )
}

export default CommentDetails
