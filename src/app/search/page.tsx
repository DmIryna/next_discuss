import PostList from "@/components/posts/PostList"
import { searchPost } from "@/db/queries/posts"
import { redirect } from "next/navigation"

interface SearchPageProps {
  searchParams: {
    term: string
  }
}

async function SearchPage({ searchParams }: SearchPageProps) {
  const { term } = searchParams

  if (!term) redirect("/")

  return (
    <div>
      <PostList fetchData={() => searchPost(term)} />
    </div>
  )
}

export default SearchPage
