import {
  fetchCommentsByPostId,
  type CommentWithAuthor,
} from "@/db/queries/comments"
import CommentDetails from "./CommentDetails"

interface CommentListProps {
  postId: string
}

async function CommentList({ postId }: CommentListProps) {
  const comments = await fetchCommentsByPostId(postId)
  const topLevelComments = comments.filter(
    (comment) => comment.parentId === null
  )
  return (
    <div className="space-y-3">
      <h1 className="text-lg font-bold">All {comments.length} comments</h1>
      {topLevelComments.map((comment) => (
        <CommentDetails
          commentId={comment.id}
          postId={postId}
          key={comment.id}
        />
      ))}
    </div>
  )
}

export default CommentList
