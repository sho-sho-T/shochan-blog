import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { Post, PostFrontMatter } from './types';

const POSTS_DIR = path.join(process.cwd(), 'content/posts');

// 指定されたディレクトリ内の全ての .md/.mdx ファイルパスを取得 (再帰的)
async function getMarkdownFiles(dir: string): Promise<string[]> {
  let files: string[] = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // _test ディレクトリは再帰検索の対象外とする
      if (entry.name !== '_test') {
        files = files.concat(await getMarkdownFiles(fullPath));
      }
    } else if (entry.isFile() && /\.(md|mdx)$/.test(entry.name)) {
      // _test ディレクトリ内のファイルは結果に含めない
      // Check if the parent directory is NOT _test
      if (!dir.split(path.sep).includes('_test')) {
          files.push(fullPath);
      }
    }
  }
  return files;
}

// slug から記事データを取得 (検索ディレクトリ指定可能)
export async function getPostBySlug(slug: string, baseDir: string = POSTS_DIR): Promise<Post> {
  const possibleExtensions = ['.md', '.mdx'];
  let filePath: string | null = null;
  let fileContent: string | null = null;

  for (const ext of possibleExtensions) {
    // Use baseDir instead of hardcoded POSTS_DIR
    const potentialPath = path.join(baseDir, `${slug}${ext}`);
    try {
      fileContent = await fs.readFile(potentialPath, 'utf-8');
      filePath = potentialPath;
      break; // ファイルが見つかったらループを抜ける
    } catch (error: any) {
      // ファイルが存在しない場合は次の拡張子を試す
      if (error.code !== 'ENOENT') {
        throw error; // 読み取りエラーなど、他のエラーは再スロー
      }
    }
  }

  if (!fileContent || !filePath) {
    // Include baseDir in error message for clarity
    throw new Error(`Post not found for slug: ${slug} in directory: ${baseDir}`);
  }

  const { data, content } = matter(fileContent);
  const frontMatter = data as PostFrontMatter;

  return {
    slug,
    ...frontMatter,
    content,
  };
}

// 全ての公開記事データを取得 (公開日降順)
export async function getAllPosts(): Promise<Post[]> {
  const filePaths = await getMarkdownFiles(POSTS_DIR); // Still search in actual posts dir

  const posts = await Promise.all(
    filePaths.map(async (filePath) => {
      const slug = path.basename(filePath).replace(/\.(md|mdx)$/, '');
      try {
        // Call getPostBySlug without baseDir, so it uses the default POSTS_DIR
        return await getPostBySlug(slug);
      } catch (error) {
        console.error(`Error processing file ${filePath}:`, error);
        return null; // エラーが発生したファイルはスキップ
      }
    })
  );

  // null を除外し、公開済み記事のみフィルタリングし、日付でソート
  const publishedPosts = posts
    .filter((post): post is Post => post !== null && post.status === 'published')
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return publishedPosts;
} 