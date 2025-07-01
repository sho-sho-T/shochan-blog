import Image from 'next/image';
import { getCategoryConfig, DEFAULT_CATEGORY_CONFIG } from '@/config/category-config';

interface CategoryIconProps {
  category?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
  showLabel?: boolean;
}

export function CategoryIcon({ 
  category, 
  size = 'md', 
  showLabel = false 
}: CategoryIconProps) {
  // カテゴリが存在するか確認
  const hasCategory = !!category;
  
  // カテゴリ設定を取得
  const categoryConfig = hasCategory ? getCategoryConfig(category!) : null;
  
  // アイコンパスと色スタイルを設定
  const iconPath = categoryConfig?.icon || '';
  const bgClass = categoryConfig?.bgColor || DEFAULT_CATEGORY_CONFIG.bgColor;
  const textClass = categoryConfig?.textColor || DEFAULT_CATEGORY_CONFIG.textColor;
  const displayName = categoryConfig?.displayName || category;

  // サイズに応じたクラス名
  const sizeClasses = {
    sm: 'w-6 h-6 text-sm',
    md: 'w-10 h-10 text-xl',
    lg: 'w-16 h-16 text-2xl',
    xl: 'w-24 h-24 text-3xl',
    xxl: 'w-32 h-32 text-4xl',
    xxxl: 'w-40 h-40 text-5xl',
  };

  // サイズに応じた画像サイズの設定
  const getImageSize = (size: string): number => {
    switch (size) {
      case 'sm': return 24;
      case 'md': return 40;
      case 'lg': return 64;
      case 'xl': return 96;
      case 'xxl': return 128;
      case 'xxxl': return 160;
      default: return 40;
    }
  };

  const imageSize = getImageSize(size);

  return (
    <div className="flex items-center gap-2">
      {/* アイコン - 画像パスがある場合は画像を表示、ない場合はテキストまたは絵文字を表示 */}
      <div className={`flex items-center justify-center rounded-md overflow-hidden ${sizeClasses[size]} ${bgClass}`}>
        {iconPath ? (
          <Image 
            src={iconPath}
            alt={`${displayName} icon`}
            width={imageSize}
            height={imageSize}
            className="object-cover"
          />
        ) : (
          <span className={`font-bold ${textClass}`}>
            {hasCategory ? category!.substring(0, 2) : DEFAULT_CATEGORY_CONFIG.emoji}
          </span>
        )}
      </div>
      
      {/* カテゴリ名ラベル（表示する場合のみ） */}
      {showLabel && hasCategory && (
        <span className={`font-medium ${textClass}`}>
          {displayName}
        </span>
      )}
    </div>
  );
} 