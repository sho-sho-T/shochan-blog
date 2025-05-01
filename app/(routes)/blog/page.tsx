import { getAllPosts } from '@/lib/content/posts';
import { PostCard } from '@/features/post/_components/PostCard';
import type { Metadata } from "next";
import { BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: "ブログ | Shochan.dev",
  description: "技術ブログの記事一覧",
};

export default async function BlogPage() {
  // 公開記事のみを取得
  const posts = await getAllPosts();

  return (
    <main className="container mx-auto px-4 md:px-6 py-8 overflow-hidden">
      <div className="mb-10">
        <div className="flex items-center justify-center gap-3 mb-2">
          <BookOpen className="w-6 h-6 text-primary" />
          <h1 className="text-3xl font-bold text-foreground break-words">記事一覧</h1>
        </div>
        <p className="text-center text-muted-foreground mt-2 max-w-xl mx-auto px-4">
          技術的な知見やプログラミングに関する記事を投稿しています
        </p>
        <div className="w-full h-px bg-border mt-8"></div>
      </div>
      
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