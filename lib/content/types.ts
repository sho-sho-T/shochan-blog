export interface PostFrontMatter {
  title: string;
  publishedAt: string; // Consider using Date type later if needed
  status: 'published' | 'draft';
  category?: string;
  tags?: string[];
  excerpt?: string;
  coverImage?: string;
  updatedAt?: string;
}

/**
 * 記事のメタデータと内容を表す型
 */
export interface Post {
  slug: string;
  title: string;
  content: string;
  publishedAt: string;
  status: 'published' | 'draft';
  category?: string;
  tags?: string[];
  excerpt?: string;
  coverImage?: string;
  updatedAt?: string;
}

// フラッシュカード関連の型定義
export interface Flashcard {
  id: string;
  question: string;
  answer: string;
}

export interface Deck {
  category: string;
  title: string;
  cards: Flashcard[];
} 