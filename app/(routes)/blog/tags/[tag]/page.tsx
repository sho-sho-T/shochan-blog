import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { PostCard } from '@/features/post/_components/PostCard';
import { getAllPosts } from '@/lib/content/posts';
import { getAllTags } from '@/lib/content/tags';

type Props = {
  params: {
    tag: string;
  };
};

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
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tagName = decodeURIComponent(params.tag);
  // TODO: タグが存在しない場合の処理を追加する

  return {
    title: `タグ: ${tagName}`,
    description: `${tagName} タグの記事一覧`,
    openGraph: {
      title: `タグ: ${tagName}`,
      description: `${tagName} タグの記事一覧`,
      url: `/blog/tags/${params.tag}`,
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
const TagPostsPage = async ({ params }: Props) => {
  const tagName = decodeURIComponent(params.tag);
  const allPosts = await getAllPosts();

  // 指定されたタグを持つ記事をフィルタリング (公開記事のみ)
  const tagPosts = allPosts.filter(
    (post) =>
      post.status === 'published' &&
      post.tags?.some((tag) => tag.toLowerCase() === tagName.toLowerCase()), // 大文字小文字を区別しない
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