import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ブログ | Shochan.dev",
  description: "技術ブログの記事一覧",
};

export default function BlogIndexPage() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">ブログ記事一覧</h1>
      <div className="max-w-3xl mx-auto">
        <p className="text-center text-muted-foreground mb-12">
          現在記事を準備中です。もう少々お待ちください。
        </p>
      </div>
    </div>
  );
} 