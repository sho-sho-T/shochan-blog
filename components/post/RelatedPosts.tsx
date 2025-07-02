import { PostCard } from '@/features/post/_components/PostCard'
import { Post } from '@/lib/content/types'

interface RelatedPostsProps {
  currentPost: Post
  posts: Post[]
}

export function RelatedPosts({ currentPost, posts }: RelatedPostsProps) {
  const relatedPosts = posts
    .filter(post => 
      post.slug !== currentPost.slug && 
      post.status === 'published' &&
      (post.category === currentPost.category || 
       post.tags?.some(tag => currentPost.tags?.includes(tag)))
    )
    .slice(0, 3)

  if (relatedPosts.length === 0) return null

  return (
    <section className="mt-12 pt-8 border-t">
      <h2 className="text-2xl font-bold mb-6">関連記事</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedPosts.map(post => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  )
}