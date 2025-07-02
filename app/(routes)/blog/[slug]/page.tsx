import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { MarkdownRenderer } from '@/components/mdx/MarkdownRenderer';
import { CategoryIcon } from '@/components/post/CategoryIcon';
import { Breadcrumb } from '@/components/post/Breadcrumb';
import { RelatedPosts } from '@/components/post/RelatedPosts';
import { JsonLd } from '@/components/seo/JsonLd';
import { getAllPosts, getPostBySlug, generateExcerpt } from '@/lib/content/posts';
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
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {};
  }

  const description = post.excerpt || generateExcerpt(post.content);
  const ogImage = post.coverImage || '/images/default-og.png';

  return {
    title: `${post.title} | Shochan.dev`,
    description,
    keywords: post.tags?.join(', '),
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      url: `/blog/${slug}`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      authors: ['Shochan'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: `https://shochan-blog.vercel.app/blog/${slug}`,
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

  const allPosts = await getAllPosts();

  const { title, publishedAt, category, tags, content, updatedAt, excerpt } = post;

  const breadcrumbItems = [
    { label: 'ホーム', href: '/' },
    { label: 'ブログ', href: '/blog' },
    { label: title }
  ];

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    author: {
      '@type': 'Person',
      name: 'Shochan',
      url: 'https://shochan-blog.vercel.app/profile',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Shochan.dev',
      url: 'https://shochan-blog.vercel.app',
    },
    datePublished: publishedAt,
    dateModified: updatedAt || publishedAt,
    description: excerpt || `${title}についての記事`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://shochan-blog.vercel.app/blog/${slug}`,
    },
  };

  return (
    <div className="container mx-auto px-4">
      <JsonLd data={articleJsonLd} />
      <Breadcrumb items={breadcrumbItems} />
      <article className="prose prose-zinc mx-auto max-w-3xl dark:prose-invert lg:prose-lg mb-10 overflow-hidden">
        {/* 記事ヘッダー */}
        <header className="mb-8 border-b pb-4">
          {/* カテゴリアイコン - 中央配置、ラベルなし、より大きなサイズ、上部に余白追加 */}
          {category && (
            <div className="flex justify-center mt-12 mb-10">
              <CategoryIcon category={category} size="xxl" showLabel={false} />
            </div>
          )}
          
          <h1 className="mb-2 text-3xl font-bold leading-tight lg:text-4xl break-words">
            {title}
          </h1>
          <div className="text-sm text-muted-foreground">
            <span>公開日: {format(parseISO(publishedAt), 'yyyy年MM月dd日')}</span>
            {category && <span className="ml-4">カテゴリ: {category}</span>}
          </div>
          {tags && tags.length > 0 && (
            <div className="mt-2 flex flex-wrap">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="mr-2 mb-2 inline-block rounded bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* 記事本文 */}
        <div className="max-w-full overflow-hidden">
          <MarkdownRenderer content={content} />
        </div>
      </article>
      
      <RelatedPosts currentPost={post} posts={allPosts} />
    </div>
  );
};

export default PostDetailPage; 