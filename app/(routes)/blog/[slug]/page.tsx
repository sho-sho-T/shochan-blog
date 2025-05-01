import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { MarkdownRenderer } from '@/components/mdx/MarkdownRenderer';
import { CategoryIcon } from '@/components/post/CategoryIcon';
import { getAllPosts, getPostBySlug } from '@/lib/content/posts';
import { format, parseISO } from 'date-fns';

/**
 * ビルド時に静的なパスを生成する
 */
export async function generateStaticParams() {
  const posts = await getAllPosts();
  // draft記事は除外
  const publishedPosts = posts.filter((post) => post.status === 'published');
  return publishedPosts.map((post) => ({
    slug: post.slug,
  }));
}

/**
 * メタデータを生成する
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params; // await してから slug を取得
  const post = await getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    // description: post.excerpt, // 必要に応じて抜粋を追加
    openGraph: {
      title: post.title,
      // description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      url: `/blog/${slug}`,
      // images: [ // 必要に応じてOGP画像を追加
      //   {
      //     url: `/images/posts/${slug}/ogp.png`, // 例
      //     width: 1200,
      //     height: 630,
      //     alt: post.title,
      //   },
      // ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      // description: post.excerpt,
      // images: [`/images/posts/${slug}/ogp.png`], // 例
    },
  };
}

/**
 * 記事詳細ページ
 */
const PostDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }> 
}) => {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post || post.status === 'draft') {
    notFound(); // 下書き記事や存在しない記事は404
  }

  const { title, publishedAt, category, tags, content } = post;

  return (
    <article className="prose prose-zinc mx-auto max-w-3xl dark:prose-invert lg:prose-lg mb-10">
      {/* 記事ヘッダー */}
      <header className="mb-8 border-b pb-4">
        {/* カテゴリアイコン - 中央配置、ラベルなし、より大きなサイズ、上部に余白追加 */}
        {category && (
          <div className="flex justify-center mt-12 mb-10">
            <CategoryIcon category={category} size="xxl" showLabel={false} />
          </div>
        )}
        
        <h1 className="mb-2 text-3xl font-bold leading-tight lg:text-4xl">
          {title}
        </h1>
        <div className="text-sm text-muted-foreground">
          <span>公開日: {format(parseISO(publishedAt), 'yyyy年MM月dd日')}</span>
          {category && <span className="ml-4">カテゴリ: {category}</span>}
        </div>
        {tags && tags.length > 0 && (
          <div className="mt-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="mr-2 inline-block rounded bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* 記事本文 */}
      <MarkdownRenderer content={content} />
    </article>
  );
};

export default PostDetailPage; 