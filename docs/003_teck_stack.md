# 技術スタック仕様書

このドキュメントはIT技術系個人ブログの技術スタックとバージョン詳細を記載しています。開発およびデプロイにおいて、以下の仕様に準拠してください。

## 主要フレームワークと言語

| 分類 | 技術 | 具体的バージョン | 互換性・依存関係 |
|------|------|----------------|----------------|
| フレームワーク | Next.js | 15.0.2 | React 19.0.0以上が必要 |
| 言語 | TypeScript | 5.4.5 | Next.js 15.xと互換性あり |
| データベース | PostgreSQL | 15.4 | Prisma 5.xでサポート |
| ORM | Prisma | 5.7.1 | TypeScript 5.xと互換性あり |
| UI | shadcn-ui | 0.5.0 | React 19、Next.js 15に対応 |
| ホスティング | Vercel | Enterprise プラン | Next.js 15の全機能サポート |
| バックエンド | Supabase | 2.38.0 | PostgreSQL 15.xと互換 |

## MDX関連ライブラリの詳細バージョン

| ライブラリ名 | 具体的バージョン | 依存関係 |
|-------------|----------------|----------|
| @next/mdx | 15.0.2 | Next.js 15.0.2と完全互換 |
| @mdx-js/loader | 3.0.1 | @next/mdx 15.0.2の要求バージョン |
| @mdx-js/react | 3.0.0 | React 19.0.0以上が必要 |
| gray-matter | 4.0.3 | 依存バージョン制約なし |
| remark-gfm | 4.0.0 | unified 11.xと互換 |
| rehype-highlight | 7.0.0 | unified 11.xと互換 |
| rehype-autolink-headings | 7.1.0 | rehype-slug 6.0.0以上が必要 |
| rehype-slug | 6.0.0 | unified 11.xと互換 |
| @types/mdx | 2.0.11 | TypeScript 5.4.5と互換 |

## 追加推奨ライブラリの具体的バージョン

| ライブラリ名 | 具体的バージョン | 互換性 |
|-------------|----------------|--------|
| next-seo | 6.4.0 | Next.js 15.xと互換 |
| next-mdx-remote | 4.4.1 | Next.js 15.x、MDX 3.xと互換 |
| prism-react-renderer | 2.3.0 | React 19対応 |
| react-syntax-highlighter | 15.5.0 | React 19互換 |
| remark-toc | 9.0.0 | unified 11.x、remark 15.x互換 |
| rehype-prism-plus | 2.0.0 | unified 11.x互換 |
| remark-emoji | 4.0.1 | unified 11.x、remark 15.x互換 |
| remark-math | 6.0.0 | unified 11.x、remark 15.x互換 |
| rehype-katex | 7.0.0 | rehype 13.x互換、remark-mathと連携 |
| reading-time | 1.5.0 | 依存バージョン制約なし |

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

- 全てのパッケージは指定されたバージョンを使用すること
- バージョン更新を行う場合は互換性を十分に検証すること
- Next.jsとReactの互換性を特に注意すること
- Prisma Schemaの変更時はマイグレーションを適切に実行すること