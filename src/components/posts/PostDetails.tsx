import { db } from "@/db"
import { notFound } from "next/navigation"

interface PostDetailsProps {
  postId: string
}

async function PostDetails({ postId }: PostDetailsProps) {
  const post = await db.post.findFirst({
    where: { id: postId },
  })
  if (!post) notFound()
  return (
    <div className="m-4">
      <h1 className="text-2xl font-bold my-2">{post.title}</h1>
      <p className="p-4 border rounded">{post.content}</p>
    </div>
  )
}

export default PostDetails
