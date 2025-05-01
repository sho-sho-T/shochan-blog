import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { PostCard } from '@/features/post/_components/PostCard';
import { getAllPosts } from '@/lib/content/posts';
import { getAllTags } from '@/lib/content/tags';

/**
 * ビルド時に静的なパスを生成する
 */
export async function generateStaticParams() {
  const tags = await getAllTags();
  // タグ名からパスパラメータを生成
  return tags.map((t) => ({
    tag: t.name,
  }));
}

/**
 * メタデータを生成する
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }> 
}): Promise<Metadata> {
  const { tag } = await params;
  const tagName = decodeURIComponent(tag);

  return {
    title: `タグ: ${tagName}`,
    description: `${tagName} タグの記事一覧`,
    openGraph: {
      title: `タグ: ${tagName}`,
      description: `${tagName} タグの記事一覧`,
      url: `/blog/tags/${tag}`,
    },
    twitter: {
      card: 'summary',
      title: `タグ: ${tagName}`,
      description: `${tagName} タグの記事一覧`,
    },
  };
}

/**
 * タグ別記事一覧ページ
 */
const TagPostsPage = async ({
  params,
}: {
  params: Promise<{ tag: string }> 
}) => {
  const { tag } = await params;
  const tagName = decodeURIComponent(tag);
  const allPosts = await getAllPosts();

  // 指定されたタグを持つ記事をフィルタリング (公開記事のみ)
  const tagPosts = allPosts.filter(
    (post) =>
      post.status === 'published' &&
      post.tags?.some((t) => t.toLowerCase() === tagName.toLowerCase()), // t を使用するように修正 (元コードのtagと変数名が被るため)
  );

  if (tagPosts.length === 0) {
    // タグが存在しない、または該当記事がない場合は404
    notFound();
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">
        タグ: <span className="capitalize">{tagName}</span>
      </h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tagPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
};

export default TagPostsPage; 