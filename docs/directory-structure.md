このドキュメントは本プロジェクトのディレクトリ構造について記載しています。

# ディレクトリ構造

```
/
├── src/
│   ├── app/                                # Next.jsのアプリルーター
│   │   ├── (routes)/                       # 公開ルートグループ
│   │   │   ├── page.tsx                    # トップページ
│   │   │   ├── blog/                       # ブログページ
│   │   │   │   ├── page.tsx                # ブログインデックスページ
│   │   │   │   ├── [slug]/                 # 個別記事ページ
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── categories/             # カテゴリページ
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── [category]/
│   │   │   │   │       └── page.tsx
│   │   │   │   └── tags/                   # タグページ
│   │   │   │       ├── page.tsx
│   │   │   │       └── [tag]/
│   │   │   │           └── page.tsx
│   │   │   └── layout.tsx                  # 公開ページレイアウト
│   │   ├── (admin)/                        # 管理者ルートグループ
│   │   │   ├── login/                      # ログインページ
│   │   │   │   └── page.tsx
│   │   │   ├── dashboard/                  # ダッシュボード
│   │   │   │   └── page.tsx
│   │   │   ├── posts/                      # 記事管理
│   │   │   │   ├── page.tsx
│   │   │   │   ├── new/                    # 新規記事作成
│   │   │   │   │   └── page.tsx
│   │   │   │   └── [id]/                   # 記事編集
│   │   │   │       └── page.tsx
│   │   │   └── layout.tsx                  # 管理者ページレイアウト
│   │   ├── api/                            # APIルート
│   │   │   └── [...]/
│   │   ├── layout.tsx                      # ルートレイアウト
│   │   └── not-found.tsx                   # 404ページ
│   ├── features/                           # 機能モジュール
│   │   ├── post/                           # 記事関連機能
│   │   │   ├── _components/                # コンポーネント
│   │   │   │   ├── post-list/              # 記事一覧表示
│   │   │   │   │   ├── index.tsx
│   │   │   │   │   ├── container.tsx
│   │   │   │   │   └── presentation.tsx
│   │   │   │   ├── post-detail/            # 記事詳細表示
│   │   │   │   │   ├── index.tsx
│   │   │   │   │   ├── container.tsx
│   │   │   │   │   └── presentation.tsx
│   │   │   │   └── post-editor/            # 記事エディタ
│   │   │   │       ├── index.tsx
│   │   │   │       ├── container.tsx
│   │   │   │       └── presentation.tsx
│   │   │   ├── _repositories/              # データアクセス層
│   │   │   │   └── post-repository.ts      # 記事データ操作
│   │   │   ├── _services/                  # サービス層
│   │   │   │   └── post-service.ts         # 記事ビジネスロジック
│   │   │   ├── _actions/                   # Server Actions
│   │   │   │   └── post-actions.ts         # 記事操作アクション
│   │   │   └── _types/                     # 型定義
│   │   │       └── post.ts                 # 記事関連の型
│   │   ├── category/                       # カテゴリ関連機能
│   │   │   ├── _components/
│   │   │   ├── _repositories/
│   │   │   ├── _services/
│   │   │   ├── _actions/
│   │   │   └── _types/
│   │   ├── tag/                            # タグ関連機能
│   │   │   ├── _components/
│   │   │   ├── _repositories/
│   │   │   ├── _services/
│   │   │   ├── _actions/
│   │   │   └── _types/
│   │   └── auth/                           # 認証関連機能
│   │       ├── _components/
│   │       ├── _repositories/
│   │       ├── _services/
│   │       ├── _actions/
│   │       └── _types/
│   ├── components/                         # 共通UIコンポーネント
│   │   ├── ui/                             # 基本UIコンポーネント
│   │   │   ├── button.tsx
│   │   │   └── ...
│   │   ├── layout/                         # レイアウトコンポーネント
│   │   │   ├── header.tsx
│   │   │   ├── footer.tsx
│   │   │   └── ...
│   │   └── mdx/                            # MDXカスタムコンポーネント
│   │       ├── code-block.tsx
│   │       └── ...
│   ├── lib/                                # 共通ユーティリティ
│   │   ├── database/                       # データベース接続
│   │   │   └── prisma.ts
│   │   ├── mdx/                            # MDX処理
│   │   │   └── mdx-utils.ts
│   │   └── utils/                          # その他ユーティリティ
│   │       ├── format.ts
│   │       └── ...
│   ├── content/                            # コンテンツファイル
│   │   └── posts/                          # ブログ記事
│   │       ├── category1/
│   │       └── category2/
│   ├── types/                              # グローバル型定義
│   │   ├── global.d.ts
│   │   └── ...
│   └── mdx-components.tsx                  # MDXグローバルコンポーネント
├── public/                                 # 静的ファイル
├── prisma/                                 # Prisma関連
│   └── schema.prisma                       # データベーススキーマ
├── next.config.mjs                         # Next.js設定
└── ...                                     # その他設定ファイル
```