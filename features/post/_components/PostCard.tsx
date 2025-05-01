import Link from 'next/link';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { Post } from '@/lib/content/types';
import { CategoryIcon } from '@/components/post/CategoryIcon';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  // 日付のフォーマット
  const formattedDate = post.publishedAt 
    ? format(new Date(post.publishedAt), 'yyyy/MM/dd', { locale: ja })
    : '日付なし';

  return (
    <Link href={`/blog/${post.slug}`} className="block">
      <div className="bg-card border rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 h-full flex flex-col">
        <div className="flex items-start gap-4 mb-4">
          {/* カテゴリアイコン */}
          <CategoryIcon category={post.category} size="md" />
          
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