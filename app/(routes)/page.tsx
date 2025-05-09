import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getAllPosts } from "@/lib/content/posts";
import { PostCard } from "@/features/post/_components/PostCard";

export default async function HomePage() {
  // 最新の記事を3件取得
  const latestPosts = await getAllPosts();
  const recentPosts = latestPosts.slice(0, 3);

  return (
    <div className="container px-4 md:px-6 py-12 mx-auto overflow-hidden">
      <section className="py-12 md:py-24 lg:py-32 flex flex-col items-center text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-6 break-words">
          Shochan.dev
        </h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl mb-8 px-4">
          Webアプリケーション開発、AI, AI駆動開発、など気まぐれで記事を書いています。
        </p>
      </section>

      {/* アプリセクション */}
      <section className="py-16 border-t">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h2 className="text-3xl font-bold">アプリ</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <Link href="/flashcards" className="flex flex-col items-center text-center">
              <div className="mb-4 relative w-16 h-16">
                <Image 
                  src="/images/flashcards.png" 
                  alt="ITフラッシュカード" 
                  width={64} 
                  height={64}
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold">ITフラッシュカード</h3>
              <p className="text-sm text-muted-foreground mt-2">
                IT用語や知識を学習できるフラッシュカードアプリ
              </p>
            </Link>
            <div className="mt-4 pt-3 border-t flex justify-center">
              <Link 
                href="/flashcards/cards" 
                className="text-xs text-primary hover:underline flex items-center"
              >
                全カード一覧を見る →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 最新記事セクション */}
      <section className="py-16 border-t">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h2 className="text-3xl font-bold">新着記事</h2>
          <Button variant="outline" asChild>
            <Link href="/blog">もっと見る</Link>
          </Button>
        </div>

        {recentPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-12">
            記事がまだありません。
          </p>
        )}
      </section>
    </div>
  );
} 