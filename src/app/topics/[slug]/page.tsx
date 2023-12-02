import CreatePostForm from "@/components/posts/CreatePostForm"
import PostList from "@/components/posts/PostList"
import { fetchPostBySlug } from "@/db/queries/posts"

interface TopicPageProps {
  params: {
    slug: string
  }
}

function TopicPage({ params }: TopicPageProps) {
  const { slug } = params

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-2xl font-bold">{slug}</h1>
        <PostList fetchData={() => fetchPostBySlug(slug)} />
      </div>

      <div>
        <CreatePostForm slug={slug} />
      </div>
    </div>
  )
}

export default TopicPage
