import { getAllPosts } from './posts';

export type CategoryCount = {
  name: string;
  count: number;
};

/**
 * 全ての公開記事からカテゴリとその記事数を集約して取得する
 * @returns カテゴリ名と記事数の配列 (記事数で降順ソート)
 */
export async function getAllCategories(): Promise<CategoryCount[]> {
  const posts = await getAllPosts();
  const publishedPosts = posts.filter((post) => post.status === 'published');
  const categoryCounts: Record<string, number> = {};

  publishedPosts.forEach((post) => {
    if (post.category) {
      categoryCounts[post.category] = (categoryCounts[post.category] || 0) + 1;
    }
  });

  const sortedCategories = Object.entries(categoryCounts)
    .map(([name, count]) => ({ name, count }))
    // 記事数が多い順にソート
    .sort((a, b) => b.count - a.count);

  return sortedCategories;
} 