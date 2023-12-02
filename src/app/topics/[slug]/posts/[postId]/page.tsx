import CommentList from "@/components/comments/CommentList"
import CreateCommentForm from "@/components/comments/CreateCommentForm"
import PostDetails from "@/components/posts/PostDetails"
import paths from "@/paths"
import Link from "next/link"

import { Suspense } from "react"
import PostLoading from "@/components/posts/PostLoading"

interface PostPageProps {
  params: {
    slug: string
    postId: string
  }
}

function PostPage({ params }: PostPageProps) {
  const { slug, postId } = params

  return (
    <div className="space-y-3">
      <Link href={paths.topicShow(slug)} className="underline decoration-solid">
        &lt; Back to {slug}
      </Link>
      <Suspense fallback={<PostLoading />}>
        <PostDetails postId={postId} />
      </Suspense>
      <CreateCommentForm postId={postId} startOpen />
      <CommentList postId={postId} />
    </div>
  )
}

export default PostPage
