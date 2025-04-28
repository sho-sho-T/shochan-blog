import { describe, it, expect, vi } from 'vitest';
import { getAllCategories } from '../categories';
import * as postsApi from '../posts'; // posts.ts全体をインポート
import type { Post } from '../types'; // Post型をインポート

// getAllPosts関数をモック化
vi.mock('../posts', async (importOriginal) => {
  const original = await importOriginal<typeof postsApi>();
  return {
    ...original,
    // getAllPostsのモック実装
    getAllPosts: vi.fn(),
  };
});

// モックされたgetAllPostsを取得
const mockedGetAllPosts = vi.mocked(postsApi.getAllPosts);

describe('getAllCategories', () => {
  it('カテゴリとその記事数を正しく集計し、降順で返すこと', async () => {
    const mockPosts: Post[] = [
      { slug: 'post-1', title: 'Post 1', publishedAt: '2024-01-01', status: 'published', category: 'Tech', tags: [], content: '' },
      { slug: 'post-2', title: 'Post 2', publishedAt: '2024-01-02', status: 'published', category: 'Life', tags: [], content: '' },
      { slug: 'post-3', title: 'Post 3', publishedAt: '2024-01-03', status: 'published', category: 'Tech', tags: [], content: '' },
      { slug: 'post-4', title: 'Post 4', publishedAt: '2024-01-04', status: 'published', category: 'Gadget', tags: [], content: '' },
      { slug: 'post-5', title: 'Post 5', publishedAt: '2024-01-05', status: 'published', category: 'Tech', tags: [], content: '' },
      { slug: 'draft-1', title: 'Draft 1', publishedAt: '2024-01-06', status: 'draft', category: 'Tech', tags: [], content: '' }, // 下書き
      { slug: 'no-cat', title: 'No Category', publishedAt: '2024-01-07', status: 'published', category: undefined, tags: [], content: '' }, // カテゴリなし
    ];
    mockedGetAllPosts.mockResolvedValue(mockPosts);

    const categories = await getAllCategories();

    expect(categories).toEqual([
      { name: 'Tech', count: 3 },
      { name: 'Life', count: 1 },
      { name: 'Gadget', count: 1 },
    ]);
  });

  it('公開記事がない場合、空の配列を返すこと', async () => {
    const mockPosts: Post[] = [
      { slug: 'draft-1', title: 'Draft 1', publishedAt: '2024-01-06', status: 'draft', category: 'Tech', tags: [], content: '' },
      { slug: 'draft-2', title: 'Draft 2', publishedAt: '2024-01-07', status: 'draft', category: 'Life', tags: [], content: '' },
    ];
    mockedGetAllPosts.mockResolvedValue(mockPosts);

    const categories = await getAllCategories();

    expect(categories).toEqual([]);
  });

  it('全ての公開記事にカテゴリがない場合、空の配列を返すこと', async () => {
    const mockPosts: Post[] = [
      { slug: 'no-cat-1', title: 'No Cat 1', publishedAt: '2024-01-01', status: 'published', category: undefined, tags: [], content: '' },
      { slug: 'no-cat-2', title: 'No Cat 2', publishedAt: '2024-01-02', status: 'published', category: undefined, tags: [], content: '' },
    ];
    mockedGetAllPosts.mockResolvedValue(mockPosts);

    const categories = await getAllCategories();

    expect(categories).toEqual([]);
  });
}); 