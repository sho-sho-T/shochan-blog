import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { PostCard } from '@/features/post/_components/PostCard';
import { getAllCategories } from '@/lib/content/categories';
import { getAllPosts } from '@/lib/content/posts';
import { CategoryIcon } from '@/components/post/CategoryIcon';

/**
 * ビルド時に静的なパスを生成する
 */
export async function generateStaticParams() {
  const categories = await getAllCategories();
  // カテゴリ名からパスパラメータを生成
  return categories.map((cat) => ({
    // category名はURLエンコードされる可能性があるため、デコードしておくことが推奨される場合がある
    // が、現状の実装ではファイル名由来ではないため、そのまま使う
    category: cat.name,
  }));
}

/**
 * メタデータを生成する
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }> 
}): Promise<Metadata> {
  const { category } = await params;
  const categoryName = decodeURIComponent(category);
  // TODO: カテゴリが存在しない場合の処理を追加する

  return {
    title: `カテゴリ: ${categoryName}`,
    description: `${categoryName} カテゴリの記事一覧`,
    openGraph: {
      title: `カテゴリ: ${categoryName}`,
      description: `${categoryName} カテゴリの記事一覧`,
      url: `/blog/categories/${category}`,
    },
    twitter: {
      card: 'summary',
      title: `カテゴリ: ${categoryName}`,
      description: `${categoryName} カテゴリの記事一覧`,
    },
  };
}

/**
 * カテゴリ別記事一覧ページ
 */
const CategoryPostsPage = async ({
  params,
}: {
  params: Promise<{ category: string }> 
}) => {
  const { category } = await params;
  const categoryName = decodeURIComponent(category);
  const allPosts = await getAllPosts();

  // 指定されたカテゴリの記事をフィルタリング (公開記事のみ)
  const categoryPosts = allPosts.filter(
    (post) =>
      post.status === 'published' &&
      post.category &&
      post.category.toLowerCase() === categoryName.toLowerCase(), // 大文字小文字を区別しない
  );

  if (categoryPosts.length === 0) {
    // カテゴリが存在しない、または該当記事がない場合は404
    // (より親切なUIにする場合は、記事がない旨のメッセージ表示も検討)
    notFound();
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 md:px-6 py-8 overflow-hidden">
      <div className="mb-10">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center gap-2 mb-3">
            {/* カテゴリアイコンを表示 */}
            <div className="w-10 h-10 flex items-center justify-center">
              <CategoryIcon category={categoryName} size="lg" />
            </div>
            <h1 className="text-3xl font-bold text-foreground capitalize ml-3 break-words">
              {categoryName}
            </h1>
          </div>
          <p className="text-center text-muted-foreground">
            <span className="font-medium text-foreground">{categoryPosts.length}</span> 件の記事
          </p>
          <div className="w-full h-px bg-border mt-8"></div>
        </div>
      </div>
      
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {categoryPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPostsPage; 