# 技術スタック仕様書

このドキュメントはIT技術系個人ブログの技術スタックとバージョン詳細を記載しています。開発およびデプロイにおいて、以下の仕様に準拠してください。

## 主要フレームワークと言語

| 分類 | 技術 | 具体的バージョン | 互換性・依存関係 |
|------|------|----------------|----------------|
| フレームワーク | Next.js | 15.0.2 | React 19.0.0以上が必要 |
| 言語 | TypeScript | 5.4.5 | Next.js 15.xと互換性あり |
| UI | shadcn-ui | 0.5.0 | React 19、Next.js 15に対応 |
| ホスティング | Vercel | - | Next.js 15の全機能サポート |

## コンテンツ処理ライブラリ

| ライブラリ名 | 具体的バージョン | 用途・依存関係 |
|-------------|----------------|---------------|
| gray-matter | 4.0.3 | Markdown Front Matter パース |
| react-markdown | (最新版推奨) | Markdown レンダリング |
| remark-gfm | 4.0.0 | GFM サポート (react-markdown プラグイン) |
| rehype-highlight | 7.0.0 | シンタックスハイライト (react-markdown プラグイン) |
| rehype-autolink-headings | 7.1.0 | 見出し自動リンク (react-markdown プラグイン) |
| rehype-slug | 6.0.0 | 見出し slug 生成 (react-markdown プラグイン) |
| @types/mdx | 2.0.11 | MDX ファイルを使用する場合の型定義 (任意) |

## 追加推奨ライブラリの具体的バージョン

| ライブラリ名 | 具体的バージョン | 用途・互換性 |
|-------------|----------------|-------------|
| next-seo | 6.4.0 | SEO メタタグ管理 (Next.js 15.xと互換) |
| flexsearch | (最新版推奨) | クライアントサイド検索 |
| react-icons | (最新版推奨) | アイコン表示 (UI) |
| ~~next-mdx-remote~~ | ~~4.4.1~~ | ~~(react-markdown を採用するため不要)~~ |
| ~~prism-react-renderer~~ | ~~2.3.0~~ | ~~(rehype-highlight を採用するため不要)~~ |
| ~~react-syntax-highlighter~~ | ~~15.5.0~~ | ~~(rehype-highlight を採用するため不要)~~ |
| ~~remark-toc~~ | ~~9.0.0~~ | ~~(必要に応じて remark プラグインとして追加)~~ |
| ~~rehype-prism-plus~~ | ~~2.0.0~~ | ~~(rehype-highlight を採用するため不要)~~ |
| ~~remark-emoji~~ | ~~4.0.1~~ | ~~(必要に応じて remark プラグインとして追加)~~ |
| ~~remark-math~~ | ~~6.0.0~~ | ~~(必要に応じて remark/rehype プラグインとして追加)~~ |
| ~~rehype-katex~~ | ~~7.0.0~~ | ~~(必要に応じて remark/rehype プラグインとして追加)~~ |
| ~~reading-time~~ | ~~1.5.0~~ | ~~(必要に応じてユーティリティとして追加)~~ |

## 開発依存パッケージの詳細バージョン

| パッケージ名 | バージョン | 用途 |
|-------------|----------|------|
| eslint | 8.56.0 | コード品質管理 |
| eslint-config-next | 15.0.2 | Next.js用ESLint設定 |
| prettier | 3.1.1 | コードフォーマッティング |
| typescript | 5.4.5 | 型チェック |
| postcss | 8.4.31 | CSSプロセッサ |
| tailwindcss | 3.4.1 | CSSフレームワーク |
| autoprefixer | 10.4.16 | CSSベンダープレフィックス自動追加 |

## 注意事項

- 全てのパッケージは指定されたバージョン、または互換性のある最新版を使用すること。
- バージョン更新を行う場合は互換性を十分に検証すること。
- Next.jsとReactの互換性を特に注意すること。
- **データベース (PostgreSQL, Supabase) や ORM (Prisma) は本プロジェクトのコア機能では使用しない。**