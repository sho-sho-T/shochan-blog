import { getAllPosts } from './posts';

export type TagCount = {
  name: string;
  count: number;
};

/**
 * 全ての公開記事からタグとその記事数を集約して取得する
 * @returns タグ名と記事数の配列 (記事数で降順ソート)
 */
export async function getAllTags(): Promise<TagCount[]> {
  const posts = await getAllPosts();
  const publishedPosts = posts.filter((post) => post.status === 'published');
  const tagCounts: Record<string, number> = {};

  publishedPosts.forEach((post) => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach((tag) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    }
  });

  const sortedTags = Object.entries(tagCounts)
    .map(([name, count]) => ({ name, count }))
    // 記事数が多い順にソート
    .sort((a, b) => b.count - a.count);

  return sortedTags;
} 