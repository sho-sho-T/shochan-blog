export interface PostFrontMatter {
  title: string;
  publishedAt: string; // Consider using Date type later if needed
  status: 'published' | 'draft';
  category: string;
  tags: string[];
  // Add other potential front matter fields as needed
  // description?: string;
  // coverImage?: string;
}

/**
 * 記事のメタデータと内容を表す型
 */
export type Post = {
  slug: string;
  title: string;
  publishedAt: string; // ISO 8601 形式 (YYYY-MM-DD)
  status: 'published' | 'draft';
  category?: string; // カテゴリをオプショナルに変更
  tags: string[];
  content: string; // Markdown の本文
  // excerpt?: string; // 必要に応じて抜粋を追加
}; 