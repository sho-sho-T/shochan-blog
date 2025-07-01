# 保守性向上のためのリファクタリング計画書 2025

## 概要
プロジェクトのコード品質分析結果を基に、保守性とコード品質向上を目的とした段階的リファクタリング計画を策定します。

## 分析結果サマリー
- **テスト失敗**: 1件 (posts.test.ts)
- **コード重複**: categories.ts と tags.ts で共通ロジック
- **型定義不整合**: Post インターフェースの矛盾
- **エラーハンドリング不備**: サイレントエラーが多数
- **大型コンポーネント**: ClientFlashcards (137行)
- **テストカバレッジ不足**: React コンポーネント 0%

## フェーズ1: 緊急修正 (Week 1)

### 1.1 テスト失敗の修正
**優先度**: 🔴 Critical  
**ファイル**: `lib/content/posts.test.ts`  
**問題**: L114でテスト失敗  
**作業時間**: 0.5日

```typescript
// 修正対象
describe('getPostBySlug', () => {
  it('should handle non-existent posts', async () => {
    // 期待される例外処理の修正
  });
});
```

### 1.2 型定義の統一
**優先度**: 🔴 Critical  
**ファイル**: `lib/content/types.ts`  
**作業時間**: 0.5日

```typescript
// Before: 型の不整合
interface PostFrontMatter {
  category: string;    // 必須
  tags: string[];      // 必須
}

interface Post {
  category?: string;   // オプショナル
  tags?: string[];     // オプショナル
}

// After: 統一された型定義
interface PostFrontMatter {
  category?: string;   // オプショナルに統一
  tags?: string[];     // オプショナルに統一
}
```

### 1.3 エラーハンドリング強化
**優先度**: 🟡 High  
**ファイル**: `lib/content/posts.ts`, `lib/utils/local-storage.ts`  
**作業時間**: 1日

```typescript
// 新規作成: lib/errors/index.ts
export class ContentError extends Error {
  constructor(message: string, public readonly filePath?: string) {
    super(message);
    this.name = 'ContentError';
  }
}

export const logger = {
  error: (message: string, error?: unknown, context?: Record<string, unknown>) => {
    if (process.env.NODE_ENV === 'development') {
      console.error(`[ERROR] ${message}`, { error, context, timestamp: new Date().toISOString() });
    }
    // 本番環境では外部ログサービスに送信する仕組みを検討
  }
};
```

## フェーズ2: 構造改善 (Week 2-3)

### 2.1 コード重複の解消
**優先度**: 🟡 High  
**ファイル**: `lib/content/categories.ts`, `lib/content/tags.ts`  
**作業時間**: 1日

```typescript
// 新規作成: lib/content/aggregation.ts
export function createContentAggregator<T>(
  extractor: (post: Post) => T | T[] | undefined,
  getName: (item: T) => string
) {
  return async function(): Promise<Array<{ name: string; count: number }>> {
    const posts = await getAllPosts();
    const publishedPosts = posts.filter(post => post.status === 'published');
    const counts: Record<string, number> = {};
    
    publishedPosts.forEach(post => {
      const items = extractor(post);
      const itemArray = Array.isArray(items) ? items : items ? [items] : [];
      itemArray.forEach(item => {
        const name = getName(item);
        counts[name] = (counts[name] || 0) + 1;
      });
    });
    
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  };
}
```

### 2.2 設定の外部化
**優先度**: 🟡 High  
**ファイル**: `components/post/CategoryIcon.tsx`  
**作業時間**: 0.5日

```typescript
// 新規作成: config/category-config.ts
export const CATEGORY_CONFIG = {
  typescript: {
    icon: '/images/icons/typescript.png',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-600',
    displayName: 'TypeScript'
  },
  react: {
    icon: '/images/icons/react.png',
    bgColor: 'bg-cyan-100', 
    textColor: 'text-cyan-600',
    displayName: 'React'
  }
  // ... 他のカテゴリ設定
} as const;

export type CategoryKey = keyof typeof CATEGORY_CONFIG;
```

## フェーズ3: コンポーネント改善 (Week 4-5)

### 3.1 大型コンポーネントの分割
**優先度**: 🟡 High  
**ファイル**: `features/flashcard/_components/ClientFlashcards.tsx`  
**作業時間**: 2日

#### 分割計画
```
ClientFlashcards.tsx (137行)
├── hooks/
│   ├── useFlashcardProgress.ts    # 進捗管理ロジック
│   └── useFlashcardNavigation.ts  # カード移動ロジック
├── components/
│   ├── FlashcardProgress.tsx      # 進捗表示
│   ├── FlashcardCard.tsx          # カード表示
│   └── FlashcardControls.tsx      # 操作ボタン
└── ClientFlashcards.tsx (50行以下) # メインコンポーネント
```

#### Custom Hook 設計
```typescript
// hooks/useFlashcardProgress.ts
export function useFlashcardProgress(category: string) {
  const [completedCards, setCompletedCards] = useState<Set<string>>(new Set());
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const saveProgress = useCallback(() => {
    if (!isLoaded) return;
    
    const progress: FlashcardProgress = {
      lastCardIndex: currentCardIndex,
      completedCards: Array.from(completedCards),
      lastStudiedAt: new Date().toISOString()
    };
    
    saveFlashcardProgress(category, progress);
  }, [currentCardIndex, completedCards, isLoaded, category]);

  return {
    completedCards,
    currentCardIndex,
    isLoaded,
    setCompletedCards,
    setCurrentCardIndex,
    saveProgress
  };
}
```

### 3.2 パフォーマンス最適化
**優先度**: 🟢 Medium  
**作業時間**: 1日

```typescript
// メモ化の適用例
const FlashcardCard = memo(({ card, isFlipped, onFlip }: FlashcardCardProps) => {
  return (
    <div className="flashcard-container" onClick={onFlip}>
      {isFlipped ? card.answer : card.question}
    </div>
  );
});

// useCallback の適用
const handleNextCard = useCallback(() => {
  if (currentCardIndex < deck.cards.length - 1) {
    setCurrentCardIndex(prev => prev + 1);
    setIsFlipped(false);
  }
}, [currentCardIndex, deck.cards.length]);
```

## フェーズ4: テスト強化 (Week 6-7)

### 4.1 React コンポーネントテスト
**優先度**: 🟢 Medium  
**作業時間**: 3日

#### テスト対象コンポーネント
1. `features/post/_components/PostCard.tsx`
2. `features/flashcard/_components/Flashcard.tsx`
3. `components/layout/header.tsx`
4. `components/post/CategoryIcon.tsx`

```typescript
// components/__tests__/PostCard.test.tsx
import { render, screen } from '@testing-library/react';
import { PostCard } from '../post/_components/PostCard';

describe('PostCard', () => {
  const mockPost = {
    slug: 'test-post',
    title: 'Test Post Title',
    publishedAt: '2024-01-01',
    status: 'published' as const,
    category: 'TypeScript',
    tags: ['react', 'nextjs'],
    content: 'Test content'
  };

  it('renders post information correctly', () => {
    render(<PostCard post={mockPost} />);
    
    expect(screen.getByText('Test Post Title')).toBeInTheDocument();
    expect(screen.getByText('2024/01/01')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('react')).toBeInTheDocument();
    expect(screen.getByText('nextjs')).toBeInTheDocument();
  });

  it('handles missing category gracefully', () => {
    const postWithoutCategory = { ...mockPost, category: undefined };
    render(<PostCard post={postWithoutCategory} />);
    
    expect(screen.getByText('Test Post Title')).toBeInTheDocument();
    // カテゴリが表示されないことを確認
  });
});
```

### 4.2 ユーティリティ関数テスト
**優先度**: 🟢 Medium  
**作業時間**: 1日

```typescript
// lib/utils/__tests__/local-storage.test.ts
import { saveFlashcardProgress, loadFlashcardProgress } from '../local-storage';

describe('local-storage utilities', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('saves and loads flashcard progress', () => {
    const progress = {
      lastCardIndex: 5,
      completedCards: ['card1', 'card2'],
      lastStudiedAt: '2024-01-01T00:00:00Z'
    };

    saveFlashcardProgress('aws', progress);
    const loaded = loadFlashcardProgress('aws');

    expect(loaded).toEqual(progress);
  });

  it('handles localStorage errors gracefully', () => {
    // localStorage.setItem のモックでエラーを発生させる
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
    setItemSpy.mockImplementation(() => {
      throw new Error('Quota exceeded');
    });

    expect(() => {
      saveFlashcardProgress('aws', { lastCardIndex: 0, completedCards: [], lastStudiedAt: new Date().toISOString() });
    }).not.toThrow();

    setItemSpy.mockRestore();
  });
});
```

## フェーズ5: 設定とドキュメント (Week 8)

### 5.1 Linter 設定の強化
**優先度**: 🟢 Low  
**作業時間**: 0.5日

```json
// biome.json の強化
{
  "linter": {
    "rules": {
      "complexity": {
        "noExcessiveCognitiveComplexity": {
          "level": "error",
          "options": { "maxAllowedComplexity": 10 }
        },
        "noExtraBooleanCast": "error"
      },
      "performance": {
        "noDelete": "error"
      },
      "style": {
        "useConst": "error",
        "useTemplate": "error"
      }
    }
  }
}
```

### 5.2 TypeScript 設定の最適化
**優先度**: 🟢 Low  
**作業時間**: 0.5日

```json
// tsconfig.json の強化
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true
  }
}
```

## 成果指標

### コード品質指標
- **テストカバレッジ**: 現在 ~30% → 目標 80%
- **TypeScript エラー**: 現在 0 → 維持
- **ESLint/Biome エラー**: 現在 0 → 維持
- **重複コード削減**: categories.ts と tags.ts (約50行削減)

### 保守性指標
- **平均関数サイズ**: 137行 → 50行以下
- **サイクロマチック複雑度**: 測定・改善
- **型安全性**: オプショナル型の統一

### パフォーマンス指標
- **ビルド時間**: 現在時間を測定・維持
- **バンドルサイズ**: 現在サイズを測定・最適化

## リスク管理

### 高リスク項目
1. **型定義変更による破壊的変更**
   - 対策: 段階的移行、十分なテスト
2. **大型コンポーネント分割時の機能劣化**
   - 対策: 既存テストの保持、新規テスト追加

### 低リスク項目
1. **設定ファイル変更**
   - 対策: 設定前後での動作確認
2. **ユーティリティ関数の共通化**
   - 対策: 既存テストの流用

## 実施スケジュール

| 週 | フェーズ | 主要タスク | 工数 |
|---|---|---|---|
| Week 1 | フェーズ1 | テスト修正、型統一、エラーハンドリング | 2日 |
| Week 2-3 | フェーズ2 | コード重複解消、設定外部化 | 1.5日 |
| Week 4-5 | フェーズ3 | コンポーネント分割、パフォーマンス | 3日 |
| Week 6-7 | フェーズ4 | テスト追加 | 4日 |
| Week 8 | フェーズ5 | 設定強化、ドキュメント | 1日 |

**総工数**: 11.5日 (約2.3週間)

## 完了条件

- [ ] 全テストが通過する
- [ ] TypeScript エラーが0件
- [ ] Linter エラーが0件  
- [ ] コードカバレッジが80%以上
- [ ] 137行のコンポーネントが50行以下に分割される
- [ ] 重複コードが削除される
- [ ] エラーハンドリングが統一される

## 備考

このリファクタリング計画は段階的に実施し、各フェーズ完了時に動作確認を行います。機能追加は本計画完了後に実施することを推奨します。