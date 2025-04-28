import { describe, it, expect, vi } from 'vitest';
import { getAllTags } from '../tags';
import * as postsApi from '../posts';
import type { Post } from '../types';

// getAllPosts関数をモック化
vi.mock('../posts', async (importOriginal) => {
  const original = await importOriginal<typeof postsApi>();
  return {
    ...original,
    getAllPosts: vi.fn(),
  };
});

const mockedGetAllPosts = vi.mocked(postsApi.getAllPosts);

describe('getAllTags', () => {
  it('タグとその記事数を正しく集計し、降順で返すこと', async () => {
    const mockPosts: Post[] = [
      { slug: 'post-1', title: 'Post 1', publishedAt: '2024-01-01', status: 'published', category: 'C', tags: ['tagA', 'tagB'], content: '' },
      { slug: 'post-2', title: 'Post 2', publishedAt: '2024-01-02', status: 'published', category: 'C', tags: ['tagB', 'tagC'], content: '' },
      { slug: 'post-3', title: 'Post 3', publishedAt: '2024-01-03', status: 'published', category: 'C', tags: ['tagA', 'tagC', 'tagD'], content: '' },
      { slug: 'post-4', title: 'Post 4', publishedAt: '2024-01-04', status: 'published', category: 'C', tags: ['tagB'], content: '' },
      { slug: 'post-5', title: 'Post 5', publishedAt: '2024-01-05', status: 'published', category: 'C', tags: [], content: '' }, // タグなし
      { slug: 'draft-1', title: 'Draft 1', publishedAt: '2024-01-06', status: 'draft', category: 'C', tags: ['tagA', 'tagE'], content: '' }, // 下書き
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { slug: 'no-tags-prop', title: 'No Tags Prop', publishedAt: '2024-01-07', status: 'published', category: 'C', tags: undefined as any, content: '' }, // tagsプロパティなし(不正なデータだが念のため)
    ];
    mockedGetAllPosts.mockResolvedValue(mockPosts);

    const tags = await getAllTags();

    expect(tags).toEqual([
      { name: 'tagB', count: 3 },
      { name: 'tagA', count: 2 },
      { name: 'tagC', count: 2 },
      { name: 'tagD', count: 1 },
    ]);
  });

  it('公開記事がない場合、空の配列を返すこと', async () => {
    const mockPosts: Post[] = [
      { slug: 'draft-1', title: 'Draft 1', publishedAt: '2024-01-06', status: 'draft', category: 'C', tags: ['tagA'], content: '' },
    ];
    mockedGetAllPosts.mockResolvedValue(mockPosts);
    const tags = await getAllTags();
    expect(tags).toEqual([]);
  });

  it('全ての公開記事にタグがない場合、空の配列を返すこと', async () => {
    const mockPosts: Post[] = [
      { slug: 'no-tags-1', title: 'No Tags 1', publishedAt: '2024-01-01', status: 'published', category: 'C', tags: [], content: '' },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { slug: 'no-tags-2', title: 'No Tags 2', publishedAt: '2024-01-02', status: 'published', category: 'C', tags: undefined as any, content: '' },
    ];
    mockedGetAllPosts.mockResolvedValue(mockPosts);
    const tags = await getAllTags();
    expect(tags).toEqual([]);
  });
}); 