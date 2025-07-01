import { getAllPosts } from './posts';
import { Post } from './types';

export function createContentAggregator<T>(
  extractor: (post: Post) => T | T[] | undefined,
  getName: (item: T) => string
) {
  return async function(): Promise<Array<{ name: string; count: number }>> {
    const posts = await getAllPosts();
    const publishedPosts = posts.filter(post => post.status === 'published');
    const counts: Record<string, number> = {};
    
    publishedPosts.forEach(post => {
      const items = extractor(post);
      const itemArray = Array.isArray(items) ? items : items ? [items] : [];
      itemArray.forEach(item => {
        const name = getName(item);
        counts[name] = (counts[name] || 0) + 1;
      });
    });
    
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  };
}