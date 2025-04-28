import Link from 'next/link';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { Post } from '@/lib/content/types';

// カテゴリーに対応するアイコンマッピング
const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  JavaScript: (
    <div className="w-10 h-10 flex items-center justify-center bg-yellow-100 rounded-md">
      <span className="text-xl font-bold text-yellow-500">JS</span>
    </div>
  ),
  CSS: (
    <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-md">
      <span className="text-xl font-bold text-blue-500">CSS</span>
    </div>
  ),
  React: (
    <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-md">
      <span className="text-xl font-bold text-blue-500">⚛️</span>
    </div>
  ),
  'Testing Library': (
    <div className="w-10 h-10 flex items-center justify-center bg-red-100 rounded-md">
      <span className="text-xl font-bold text-red-500">🧪</span>
    </div>
  ),
  Vitest: (
    <div className="w-10 h-10 flex items-center justify-center bg-green-100 rounded-md">
      <span className="text-xl font-bold text-green-500">⚡</span>
    </div>
  ),
  Storybook: (
    <div className="w-10 h-10 flex items-center justify-center bg-pink-100 rounded-md">
      <span className="text-xl font-bold text-pink-500">S</span>
    </div>
  ),
  WPI: (
    <div className="w-10 h-10 flex items-center justify-center bg-green-100 rounded-md">
      <span className="text-xl font-bold text-green-500">🏕️</span>
    </div>
  ),
  // デフォルトのアイコン
  default: (
    <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-md">
      <span className="text-xl font-bold text-gray-500">📄</span>
    </div>
  ),
};

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  // カテゴリに基づいてアイコンを取得（存在しない場合はデフォルトを使用）
  const icon = post.category ? CATEGORY_ICONS[post.category] || CATEGORY_ICONS.default : CATEGORY_ICONS.default;
  
  // 日付のフォーマット
  const formattedDate = post.publishedAt 
    ? format(new Date(post.publishedAt), 'yyyy/MM/dd', { locale: ja })
    : '日付なし';

  return (
    <Link href={`/blog/${post.slug}`} className="block">
      <div className="bg-card border rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 h-full flex flex-col">
        <div className="flex items-start gap-4 mb-4">
          {/* アイコン */}
          {icon}
          
          {/* タイトルと日付 */}
          <div className="flex-1">
            <h2 className="text-lg font-semibold mb-2 line-clamp-2">{post.title}</h2>
            <time className="text-sm text-muted-foreground" dateTime={post.publishedAt}>
              {formattedDate}
            </time>
          </div>
        </div>
        
        {/* タグ表示（存在する場合） */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-auto pt-4">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="text-xs px-2 py-1 bg-muted rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </Link>
  );
} 