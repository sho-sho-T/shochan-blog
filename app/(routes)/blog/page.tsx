import { getAllPosts } from '@/lib/content/posts';
import { PostCard } from '@/features/post/_components/PostCard';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ブログ | Shochan.dev",
  description: "技術ブログの記事一覧",
};

export default async function BlogPage() {
  // 公開記事のみを取得
  const posts = await getAllPosts();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">記事一覧</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
      
      {posts.length === 0 && (
        <p className="text-center text-gray-500 my-12">記事がありません</p>
      )}
    </main>
  );
} 