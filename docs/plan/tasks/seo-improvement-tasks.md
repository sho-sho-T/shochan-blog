# SEO改善タスク一覧

## 概要
プロジェクトのSEO対策を強化するための7つの主要改善項目とその実装手順を記載します。

## 🔄 実装優先度
1. **高**: サイトマップ、robots.txt、構造化データ
2. **中**: メタデータ改善、内部リンク構造
3. **低**: パフォーマンス最適化、アクセシビリティ

---

## 1. サイトマップ（sitemap.xml）実装

### 📍 実装場所
- `/app/sitemap.ts` (新規作成)

### 🎯 実装内容
```typescript
import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/content/posts'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://shochan-blog.vercel.app'
  
  // 静的ページ
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/flashcards`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/profile`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ]

  // 記事ページ
  const posts = await getAllPosts()
  const publishedPosts = posts.filter(post => post.status === 'published')
  
  const postPages = publishedPosts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...postPages]
}
```

### ✅ 確認方法
- `/sitemap.xml` にアクセスして XML が表示されるか確認
- Google Search Console でサイトマップを送信

---

## 2. robots.txt 実装

### 📍 実装場所
- `/app/robots.ts` (新規作成)

### 🎯 実装内容
```typescript
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://shochan-blog.vercel.app'
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/_next/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
```

### ✅ 確認方法
- `/robots.txt` にアクセスして内容が表示されるか確認

---

## 3. 構造化データ（JSON-LD）実装

### 📍 実装場所
- `/components/seo/JsonLd.tsx` (新規作成)
- `/app/(routes)/blog/[slug]/page.tsx` (修正)
- `/app/(routes)/layout.tsx` (修正)

### 🎯 実装内容

#### 3.1 JsonLdコンポーネント作成
```typescript
// /components/seo/JsonLd.tsx
interface JsonLdProps {
  data: Record<string, any>
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
```

#### 3.2 記事ページに構造化データ追加
```typescript
// /app/(routes)/blog/[slug]/page.tsx に以下を追加

import { JsonLd } from '@/components/seo/JsonLd'

// PostDetailPage コンポーネント内に以下を追加
const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: post.title,
  author: {
    '@type': 'Person',
    name: 'Shochan',
    url: 'https://shochan-blog.vercel.app/profile',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Shochan.dev',
    url: 'https://shochan-blog.vercel.app',
  },
  datePublished: post.publishedAt,
  dateModified: post.updatedAt || post.publishedAt,
  description: post.excerpt || `${post.title}についての記事`,
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `https://shochan-blog.vercel.app/blog/${post.slug}`,
  },
  ...(post.coverImage && {
    image: `https://shochan-blog.vercel.app${post.coverImage}`,
  }),
}

// return文のheadタグ内に追加
<JsonLd data={articleJsonLd} />
```

#### 3.3 トップページに構造化データ追加
```typescript
// /app/(routes)/page.tsx に以下を追加

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Shochan.dev',
  url: 'https://shochan-blog.vercel.app',
  description: 'Webアプリケーション開発、AI, AI駆動開発、など気まぐれで記事を書いています。',
  author: {
    '@type': 'Person',
    name: 'Shochan',
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://shochan-blog.vercel.app/blog?search={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
}
```

### ✅ 確認方法
- Google Rich Results Test で構造化データをテスト
- 開発者ツールでJSONが正しく出力されているか確認

---

## 4. メタデータ改善

### 📍 実装場所
- `/lib/content/posts.ts` (修正)
- `/app/(routes)/blog/[slug]/page.tsx` (修正)

### 🎯 実装内容

#### 4.1 記事のexcerpt（抜粋）生成機能追加
```typescript
// /lib/content/posts.ts に以下の関数を追加

export function generateExcerpt(content: string, maxLength: number = 160): string {
  // Markdownの記号を除去
  const plainText = content
    .replace(/#+\s/g, '') // ヘッダー記号除去
    .replace(/\*\*(.+?)\*\*/g, '$1') // 太字記号除去
    .replace(/\*(.+?)\*/g, '$1') // イタリック記号除去
    .replace(/`(.+?)`/g, '$1') // インラインコード記号除去
    .replace(/\[(.+?)\]\(.+?\)/g, '$1') // リンク記号除去
    .replace(/\n+/g, ' ') // 改行を空白に
    .trim()

  if (plainText.length <= maxLength) {
    return plainText
  }

  return plainText.substring(0, maxLength).replace(/\s+\S*$/, '') + '...'
}
```

#### 4.2 記事詳細ページのメタデータ強化
```typescript
// /app/(routes)/blog/[slug]/page.tsx の generateMetadata 関数を修正

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {}
  }

  const description = post.excerpt || generateExcerpt(post.content)
  const ogImage = post.coverImage || '/images/default-og.png'

  return {
    title: `${post.title} | Shochan.dev`,
    description,
    keywords: post.tags?.join(', '),
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      url: `/blog/${slug}`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      authors: ['Shochan'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: `https://shochan-blog.vercel.app/blog/${slug}`,
    },
  }
}
```

### ✅ 確認方法
- Open Graph Debugger でOGPが正しく表示されるか確認
- Twitter Card Validator でTwitterカードが正しく表示されるか確認

---

## 5. パフォーマンス最適化

### 📍 実装場所
- `/next.config.ts` (修正)
- 各画像使用箇所の確認

### 🎯 実装内容

#### 5.1 next.config.ts 最適化設定
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compress: true,
  poweredByHeader: false,
  experimental: {
    optimizeCss: true,
  },
}

export default nextConfig;
```

#### 5.2 画像の最適化確認
- 全ての `<img>` タグを `next/image` の `Image` コンポーネントに変更
- `alt` 属性の適切な設定
- `priority` プロパティの設定（above the fold の画像）

### ✅ 確認方法
- Lighthouse でパフォーマンススコアを確認
- WebPageTest で読み込み速度を測定

---

## 6. 内部リンク構造改善

### 📍 実装場所
- `/components/post/Breadcrumb.tsx` (新規作成)
- `/components/post/RelatedPosts.tsx` (新規作成)
- `/app/(routes)/blog/[slug]/page.tsx` (修正)

### 🎯 実装内容

#### 6.1 パンくずナビ実装
```typescript
// /components/post/Breadcrumb.tsx
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface BreadcrumbProps {
  items: Array<{
    label: string
    href?: string
  }>
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="パンくずナビ" className="mb-6">
      <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && <ChevronRight className="w-4 h-4 mx-2" />}
            {item.href ? (
              <Link 
                href={item.href}
                className="hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
```

#### 6.2 関連記事コンポーネント実装
```typescript
// /components/post/RelatedPosts.tsx
import Link from 'next/link'
import { PostCard } from '@/features/post/_components/PostCard'
import { Post } from '@/lib/content/types'

interface RelatedPostsProps {
  currentPost: Post
  posts: Post[]
}

export function RelatedPosts({ currentPost, posts }: RelatedPostsProps) {
  // 同じカテゴリまたはタグを持つ関連記事を取得
  const relatedPosts = posts
    .filter(post => 
      post.slug !== currentPost.slug && 
      post.status === 'published' &&
      (post.category === currentPost.category || 
       post.tags?.some(tag => currentPost.tags?.includes(tag)))
    )
    .slice(0, 3)

  if (relatedPosts.length === 0) return null

  return (
    <section className="mt-12 pt-8 border-t">
      <h2 className="text-2xl font-bold mb-6">関連記事</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedPosts.map(post => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  )
}
```

### ✅ 確認方法
- パンくずナビが正しく表示されるか確認
- 関連記事が適切に表示されるか確認

---

## 7. アクセシビリティ改善

### 📍 実装場所
- 全コンポーネントの見直し
- `/app/(routes)/layout.tsx` (修正)

### 🎯 実装内容

#### 7.1 見出し構造の改善
- h1 → h2 → h3 の順序で階層化
- スキップされる見出しレベルがないか確認

#### 7.2 alt属性の改善
```typescript
// 画像のalt属性例
<Image 
  src="/images/icons/nextjs.png"
  alt="Next.jsのロゴアイコン"
  width={32}
  height={32}
/>

// 装飾的な画像の場合
<Image 
  src="/images/decoration.png"
  alt=""
  width={100}
  height={50}
  aria-hidden="true"
/>
```

#### 7.3 フォーカス管理
```typescript
// ボタンやリンクのフォーカス状態の改善
className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
```

### ✅ 確認方法
- axe DevTools でアクセシビリティをテスト
- キーボードナビゲーションが正常に動作するか確認
- スクリーンリーダーでの読み上げ順序を確認

---

## 🚀 実装順序の推奨

1. **フェーズ1（基本SEO）**
   - サイトマップ実装
   - robots.txt実装
   - メタデータ改善

2. **フェーズ2（構造化データ）**
   - JSON-LD構造化データ実装

3. **フェーズ3（ユーザビリティ）**
   - パンくずナビ実装
   - 関連記事実装

4. **フェーズ4（最適化）**
   - パフォーマンス最適化
   - アクセシビリティ改善

## 📊 効果測定

実装後は以下のツールで効果を測定：
- Google Search Console（検索パフォーマンス）
- Google Analytics（ユーザー行動）
- Lighthouse（パフォーマンス・SEO・アクセシビリティ）
- PageSpeed Insights（ページ速度）

---

## 📚 参考リンク

- [Next.js Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Next.js Sitemap](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)
- [Schema.org](https://schema.org/)
- [Google Search Central](https://developers.google.com/search)