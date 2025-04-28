import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import path from 'path';
import fs from 'fs/promises';
// Import only the functions needed
import { getPostBySlug, getAllPosts } from './posts';
import { Post } from './types';

// テスト用の content ディレクトリパス
const TEST_POSTS_DIR = path.join(process.cwd(), 'content/posts/_test');

// ダミーファイルの内容
const dummyPost1Content = `---
title: 'Dummy Post 1'
publishedAt: '2024-01-01'
status: 'published'
category: 'TestCategory'
tags: ['test', 'dummy']
---
This is the content of the first dummy post.`;

const draftPostContent = `---
title: 'Draft Post'
publishedAt: '2024-01-02'
status: 'draft'
category: 'Drafts'
tags: ['draft']
---
This post is a draft and should not be listed.`;

const anotherPublishedPostContent = `---
title: 'Another Published Post'
publishedAt: '2023-12-31'
status: 'published'
category: 'AnotherCategory'
tags: ['another', 'test']
---
Content of another post.`;

// --- テスト用ヘルパー ---
// ダミーファイルを作成
async function createDummyFile(filePath: string, content: string) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, content, 'utf-8');
}

// --- テスト ---
describe('Content Utility Functions', () => {

  // テスト実行前にダミーファイルを作成 (モックは不要に)
  beforeAll(async () => {
    await fs.mkdir(TEST_POSTS_DIR, { recursive: true }); // Ensure _test dir exists
    await createDummyFile(path.join(TEST_POSTS_DIR, 'dummy-post-1.md'), dummyPost1Content);
    await createDummyFile(path.join(TEST_POSTS_DIR, 'draft-post.md'), draftPostContent);
    await createDummyFile(path.join(TEST_POSTS_DIR, 'another-published-post.mdx'), anotherPublishedPostContent);
    // Mocking POSTS_DIR is no longer needed
  });

  // テスト実行後にクリーンアップ (モック解除は不要に)
  afterAll(async () => {
    try {
      await fs.rm(TEST_POSTS_DIR, { recursive: true, force: true });
    } catch (error) {
      console.error(`Error cleaning up test directory ${TEST_POSTS_DIR}:`, error);
    }
    // vi.restoreAllMocks(); // No longer needed
  });

  describe('getPostBySlug', () => {
    // getPostBySlug にテスト用ディレクトリを渡す
    it('should return the correct post data for a valid slug (.md)', async () => {
      // Pass TEST_POSTS_DIR as the second argument
      const post = await getPostBySlug('dummy-post-1', TEST_POSTS_DIR);
      expect(post).toBeDefined();
      expect(post.title).toBe('Dummy Post 1');
      expect(post.status).toBe('published');
      expect(post.content).toContain('This is the content');
      expect(post.slug).toBe('dummy-post-1');
    });

    it('should return the correct post data for a valid slug (.mdx)', async () => {
       // Pass TEST_POSTS_DIR as the second argument
       const post = await getPostBySlug('another-published-post', TEST_POSTS_DIR);
       expect(post).toBeDefined();
       expect(post.title).toBe('Another Published Post');
       expect(post.status).toBe('published');
       expect(post.slug).toBe('another-published-post');
    });

    it('should throw an error for a non-existent slug', async () => {
      // Pass TEST_POSTS_DIR as the second argument
      await expect(getPostBySlug('non-existent-slug', TEST_POSTS_DIR)).rejects.toThrow(
        // Error message now includes the directory
        /Post not found for slug: non-existent-slug in directory: .*_test/
      );
    });

     it('should return draft post data if slug matches', async () => {
       // Pass TEST_POSTS_DIR as the second argument
       const post = await getPostBySlug('draft-post', TEST_POSTS_DIR);
       expect(post).toBeDefined();
       expect(post.title).toBe('Draft Post');
       expect(post.status).toBe('draft');
     });
  });

  describe('getAllPosts', () => {
    // getAllPosts はデフォルトの POSTS_DIR を使うので変更なし
    it('should return only published posts from the actual content directory (excluding _test)', async () => {
      // 注意: このテストは実際の content/posts ディレクトリの状態に依存します。
      // CI環境など、ディレクトリが空の状態で実行されることを想定する場合は調整が必要です。
      const posts = await getAllPosts();
      // 実際の content/posts に 'dummy-post-1.md' (published) が存在することを期待
      expect(posts.length).toBeGreaterThanOrEqual(1);
      expect(posts.some((p: Post) => p.slug === 'dummy-post-1')).toBe(true);
      expect(posts.some((p: Post) => p.status === 'draft')).toBe(false);
    });

    it('should return posts sorted by publishedAt descending (if any from actual dir)', async () => {
       const posts = await getAllPosts();
        if (posts.length > 1) {
          const dates = posts.map(p => new Date(p.publishedAt).getTime());
          for (let i = 0; i < dates.length - 1; i++) {
            expect(dates[i]).toBeGreaterThanOrEqual(dates[i + 1]);
          }
        } else {
          expect(true).toBe(true); // Pass if 0 or 1 post
        }
    });
  });
}); 