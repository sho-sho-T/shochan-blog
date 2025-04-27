import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="container py-12">
      <section className="py-12 md:py-24 lg:py-32 flex flex-col items-center text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-6">
          Shochan.dev
        </h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl mb-8">
          フロントエンド開発者として、技術的な知見や学習内容を発信するブログサイトです。
          Next.js, React, TypeScriptなどのモダンなWeb技術について発信しています。
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild>
            <Link href="/blog">ブログを見る</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/profile">プロフィールを見る</Link>
          </Button>
        </div>
      </section>
    </div>
  );
} 