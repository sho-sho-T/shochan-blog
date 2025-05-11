import Image from 'next/image';

// カテゴリ名と画像パスのマッピング
const CATEGORY_ICONS: Record<string, string> = {
  TypeScript: '/images/icons/typescript.png',
  JavaScript: '/images/icons/javascript.png',
  NextJS: '/images/icons/nextjs.png',
  Ruby: '/images/icons/ruby.png',
  Cursor: '/images/icons/cursor.png',
  // 他のカテゴリも必要に応じて追加
};

// カテゴリ別の背景色とテキスト色のマッピング
const CATEGORY_COLORS: Record<string, { bgClass: string; textClass: string }> = {
  TypeScript: { bgClass: 'bg-blue-100', textClass: 'text-blue-600' },
  JavaScript: { bgClass: 'bg-yellow-100', textClass: 'text-yellow-600' },
  NextJS: { bgClass: 'bg-transparent', textClass: 'text-white' },
  Ruby: { bgClass: 'bg-red-100', textClass: 'text-red-600' },
  Cursor: { bgClass: 'bg-purple-100', textClass: 'text-purple-600' },
  CSS: { bgClass: 'bg-blue-100', textClass: 'text-blue-500' },
  React: { bgClass: 'bg-blue-100', textClass: 'text-blue-500' },
  'Testing Library': { bgClass: 'bg-red-100', textClass: 'text-red-500' },
  Vitest: { bgClass: 'bg-green-100', textClass: 'text-green-500' },
  Storybook: { bgClass: 'bg-pink-100', textClass: 'text-pink-500' },
  WPI: { bgClass: 'bg-green-100', textClass: 'text-green-500' },
  default: { bgClass: 'bg-gray-100', textClass: 'text-gray-500' },
};

// デフォルトのアイコン（マッピングが存在しない場合に使用）
const DEFAULT_ICON = {
  emoji: '📄', // デフォルトの絵文字
};

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
  
  // カテゴリが存在する場合、アイコンのパスを取得（存在しない場合は空文字列）
  const iconPath = hasCategory ? CATEGORY_ICONS[category!] || '' : '';
  
  // カテゴリの色スタイルを取得（存在しない場合はデフォルト）
  const colorStyle = hasCategory 
    ? CATEGORY_COLORS[category!] || CATEGORY_COLORS.default 
    : CATEGORY_COLORS.default;

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
      <div className={`flex items-center justify-center rounded-md overflow-hidden ${sizeClasses[size]} ${colorStyle.bgClass}`}>
        {iconPath ? (
          <Image 
            src={iconPath}
            alt={`${category} icon`}
            width={imageSize}
            height={imageSize}
            className="object-cover"
          />
        ) : (
          <span className={`font-bold ${colorStyle.textClass}`}>
            {hasCategory ? category!.substring(0, 2) : DEFAULT_ICON.emoji}
          </span>
        )}
      </div>
      
      {/* カテゴリ名ラベル（表示する場合のみ） */}
      {showLabel && hasCategory && (
        <span className={`font-medium ${colorStyle.textClass}`}>
          {category}
        </span>
      )}
    </div>
  );
} 