このドキュメントは本プロジェクトのディレクトリ構造について記載しています。
**Next.jsの`app`ルーターを利用しており、`src/` ディレクトリを使用せず、プロジェクトルート直下に各ディレクトリを配置します。**

# ディレクトリ構造

```
/
├── app/                                # Next.jsのアプリルーター
│   ├── (routes)/                       # 公開ルートグループ
│   │   ├── page.tsx                    # トップページ
│   │   ├── blog/                       # ブログページ
│   │   │   ├── page.tsx                # ブログインデックスページ
│   │   │   ├── [slug]/                 # 個別記事ページ
│   │   │   │   └── page.tsx
│   │   │   ├── categories/             # カテゴリページ
│   │   │   │   ├── page.tsx
│   │   │   │   └── [category]/         # カテゴリ別記事一覧
│   │   │   │       └── page.tsx
│   │   │   └── tags/                   # タグページ
│   │   │       ├── page.tsx
│   │   │       └── [tag]/              # タグ別記事一覧
│   │   │           └── page.tsx
│   │   └── layout.tsx                  # 公開ページレイアウト
│   ├── layout.tsx                      # ルートレイアウト
│   └── not-found.tsx                   # 404ページ
├── features/                           # 機能別モジュール
│   ├── post/                           # 記事関連機能
│   │   ├── _components/                # 記事表示関連コンポーネント (例: PostList, PostCard, PostDetail)
│   │   └── _types/                     # 記事関連の型定義
│   ├── category/                       # カテゴリ関連機能
│   │   ├── _components/                # カテゴリ表示関連コンポーネント (例: CategoryList, CategoryLink, CategoryIcon)
│   │   └── _types/                     # カテゴリ関連の型定義
│   ├── tag/                            # タグ関連機能
│   │   ├── _components/                # タグ表示関連コンポーネント (例: TagList, TagLink)
│   │   └── _types/                     # タグ関連の型定義
│   └── search/                         # 検索機能
│       ├── _components/                # 検索UIコンポーネント (例: SearchBar, SearchResultList)
│       └── _types/                     # 検索関連の型定義
├── components/                         # 共通UIコンポーネント
│   ├── ui/                             # 基本UIコンポーネント (shadcn/uiベース + カスタム)
│   │   ├── button.tsx
│   │   └── ...
│   ├── layout/                         # サイト共通レイアウトコンポーネント
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   └── ...
│   └── mdx/                            # Markdown表示用カスタムコンポーネント
│       ├── code-block.tsx              # コードブロック (シンタックスハイライト含む)
│       ├── heading-link.tsx            # 見出しリンク
│       └── ...
├── lib/                                # 共通ユーティリティ・ロジック
│   ├── content/                        # コンテンツ取得・処理 (ビルド時)
│   │   ├── posts.ts                    # 記事データの取得・パース
│   │   ├── categories.ts               # カテゴリデータの集約
│   │   ├── tags.ts                     # タグデータの集約
│   │   └── types.ts                    # コンテンツ関連の型
│   ├── mdx/                            # Markdownレンダリング関連ユーティリティ
│   │   └── render.ts                   # react-markdownの設定等
│   ├── search/                         # 検索インデックス生成・処理 (ビルド時)
│   │   └── indexer.ts                  # flexsearchインデックス生成ロジック
│   ├── icons/                          # アイコン関連
│   │   └── icon-map.ts                 # カテゴリ/タグとアイコンのマッピング
│   └── utils/                          # その他共通ユーティリティ
│       ├── format.ts                   # 日付フォーマット等
│       └── ...
├── content/                            # Markdownコンテンツソース
│   └── posts/                          # ブログ記事ファイル (.md/.mdx)
│       ├── example-post-1.md
│       └── category-subdirectory/
│           └── example-post-2.mdx
├── types/                              # グローバル型定義
│   └── index.d.ts
├── mdx-components.tsx                  # react-markdown用グローバルコンポーネント設定
├── public/                             # 公開アセット
│   ├── images/                         # 画像ファイル
│   │   └── posts/                      # 記事関連画像
│   ├── search-index.json               # ビルド時に生成される検索インデックス
│   └── ...                             # favicon等
├── scripts/                            # ビルド用スクリプト等
│   └── build-search-index.js           # 検索インデックス生成スクリプト
├── next.config.mjs                     # Next.js設定
└── ...                                 # その他設定ファイル (tsconfig.json, package.json, etc.)
```