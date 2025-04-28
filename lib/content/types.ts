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

export interface Post extends PostFrontMatter {
  slug: string;
  content: string;
} 