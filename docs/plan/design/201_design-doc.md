# 個人技術ブログ 設計方針書

## 📑 関連ドキュメント

- [個人技術ブログ 要件定義書](../requirements/101_specification.md)
- [技術スタック仕様書](../../003_teck_stack.md)
- [設計方針書作成ガイド](../rules/make-design-doc.md)
- [ディレクトリ構造](../../002_directory_structure.md)

## 📋 概要

このドキュメントは、[個人技術ブログ 要件定義書](../requirements/101_specification.md) に基づき、**Git ベースのコンテンツ管理を行う静的ブログサイト**の実装方針を定義します。Juniorエンジニアが迷いなく開発を進められるように、コンテンツ処理、コンポーネント設計、主要な実装選択に関する指針を提供します。

## 🔍 要件の分析

[個人技術ブログ 要件定義書](../requirements/101_specification.md) より、以下の主要な実装ポイントが抽出されます。

- **コンテンツソース**: Git リポジトリ内の Markdown ファイル (`src/content/posts/`) と画像ファイル (`public/images/posts/`)。
- **管理フロー**: 管理者（開発者）によるローカルでのファイル編集と `git push` によるデプロイ。
- **メタデータ**: Markdown Front Matter による記事情報（タイトル、日付、カテゴリ、タグ等）の管理。
- **サイト種別**: Next.js を用いた SSG (Static Site Generation) による静的サイト。
- **コア機能**: 記事一覧・詳細表示、カテゴリ別・タグ別表示、検索機能。
- **主要技術**: Next.js (App Router), TypeScript, shadcn-ui, Tailwind CSS。
- **廃止された機能**: 管理画面 UI、DB ベースの CRUD、認証、閲覧数カウント。

## 🛠 実装方針

### アーキテクチャ選択

- **フレームワーク**: Next.js 15 (App Router) を採用します。**SSG (Static Site Generation) を基本**とし、ビルド時にコンテンツから静的ページを生成します。
- **コンテンツ処理**: ビルド時に `src/content/posts/` 内の Markdown ファイルを読み込み、Front Matter と本文をパースします。`gray-matter` ライブラリを利用します。
- **データソース**: **データベース (Supabase/PostgreSQL) と ORM (Prisma) は原則として使用しません。** コンテンツはファイルシステムから直接取得します。
- **認証**: **認証機能 (Supabase Auth 等) は不要です。**
- **UI**: shadcn-ui をベースとし、Tailwind CSS を用いてスタイリングします。公開画面の UI を構築します。

### コンポーネント設計

- **基本方針**: `docs/002_directory_structure.md` に従い、コンポーネントを配置します。
    - **共通コンポーネント**: `src/components/` 以下（UI 部品、レイアウト、MDX カスタム要素）。
    - **機能特化コンポーネント**: `src/features/[機能名]/_components/` 以下（記事表示、検索関連など）。
- **主要コンポーネント群（配置場所例）**:
    - `Layout` (例: `Header`, `Footer`): `src/components/layout/`
    - `Article` (例: `PostList`, `PostCard`, `PostDetail`, `MarkdownRenderer`):
        - `PostList`, `PostCard`, `PostDetail`: `src/features/post/_components/`
        - `MarkdownRenderer`: `src/components/mdx/`
    - `Category`/`Tag` (例: `CategoryList`, `TagList`, `CategoryIcon`):
        - `CategoryList`, `TagList`: `src/features/category/_components/`, `src/features/tag/_components/`
        - `CategoryIcon`: `src/features/category/_components/` (マッピングロジック含む)
    - `Search` (例: `SearchBar`, `SearchResultList`): `src/features/search/_components/`
- **Server/Client 分担**:
    - **Server Components (SSG)**: ページの大部分はビルド時にレンダリングされる Server Components となります。記事一覧、記事詳細、カテゴリ/タグ一覧ページなどが該当します。
    - **Client Components**: クライアントサイドでのインタラクションが必要な部分のみ Client Components とします。例: 検索バーの入力ハンドリング、検索結果の動的表示、テーマ切り替えボタンなど。`'use client'` ディレクティブを付与します。

### データフロー

- **コンテンツ取得**: Next.js のビルドプロセス中に、`lib/post.ts` のようなユーティリティ関数が `src/content/posts/` ディレクトリをスキャンし、各 Markdown ファイルを読み込み、`gray-matter` で Front Matter と本文をパースします。取得した記事データ（メタデータと本文）は、`generateStaticParams` やページコンポーネントの `props` として渡され、静的ページ生成に使用されます。
- **カテゴリ/タグ集約**: ビルド時に全記事の Front Matter からカテゴリとタグの情報を抽出し、ユニークなリストを作成します。これもユーティリティ関数 (`lib/category.ts`, `lib/tag.ts` 等) で実装します。
- **状態管理**: **複雑なクライアントサイドの状態管理は基本的に不要**になります。検索 UI など、局所的な状態管理には React の `useState` を使用します。
- **認証フロー**: 不要です。

## 🔄 実装方法の選択肢と決定

### 1. Markdown 処理 (レンダリング)

- **要件**: Markdown (Front Matter 付き) を HTML に変換して表示。シンタックスハイライト、GFM 対応。
- **選択肢1**: `next-mdx-remote`
    - **説明**: Markdown/MDX 文字列を動的にパースして React コンポーネントに変換。`remark`/`rehype` プラグイン利用可能。
    - **評価**: SSG でビルド時に Markdown 文字列を処理する用途にも適している。
- **選択肢2**: `react-markdown` + `remark-*` / `rehype-*` プラグイン群
    - **説明**: Markdown 文字列を React 要素に変換するライブラリ。
    - **評価**: シンプルで導入しやすい。`next-mdx-remote` より機能は限定的だが、要件を満たせる可能性が高い。
- **選択肢3**: `unified` + `remark-parse` + `remark-rehype` + `rehype-react` など
    - **説明**: より低レイヤーのライブラリを組み合わせて処理パイプラインを構築。
    - **評価**: 非常に柔軟だが、実装が複雑になる。
- **決定**: **`react-markdown` + `remark`/`rehype` プラグイン群 を採用**
    - **理由**: 要件（Markdown 文字列の HTML 変換、GFM、シンタックスハイライト）を満たしつつ、実装が比較的シンプルであるため。`next-mdx-remote` は MDX 特有の機能が不要であれば過剰になる可能性がある。技術スタック仕様書記載の `remark-gfm`, `rehype-highlight`, `rehype-autolink-headings`, `rehype-slug` などを使用する。

### 2. 検索機能実装

- **要件**: キーワード、カテゴリ、タグによる記事検索（クライアントサイド）。
- **選択肢1**: `flexsearch`
    - **説明**: 高速な全文検索ライブラリ。インデックスをビルド時に作成し、クライアントサイドで検索を実行。
    - **評価**: パフォーマンスが良い。日本語対応も比較的容易。
- **選択肢2**: `fuse.js`
    - **説明**: 軽量なファジー検索ライブラリ。
    - **評価**: 導入が容易だが、大規模データや複雑な検索には `flexsearch` が有利な場合がある。
- **選択肢3**: 自前実装（フィルタリング）
    - **説明**: JavaScript の `filter` や `includes` で単純な検索を実装。
    - **評価**: 最もシンプルだが、検索精度やパフォーマンスに限界がある。
- **決定**: **`flexsearch` を採用**
    - **理由**: パフォーマンスと柔軟性のバランスが良いと判断。ビルド時に全記事データから検索用インデックスを JSON として生成し、クライアントサイドの `Search` コンポーネントがそのインデックスを読み込んで検索処理を行う方針とする。

### 3. アクセス解析（閲覧数カウント）

- **決定**: **実装しない**
    - **理由**: ユーザー要件により不要と判断されたため。

## 📊 技術的制約と考慮事項

- **ビルド時間**: 記事数が増加すると、Next.js のビルド時間が増加する可能性がある。ビルドパフォーマンスの監視と、必要に応じた最適化（例: ISR の限定的な利用検討）が必要。
- **コンテンツ構造**: `src/content/posts/` 内のディレクトリ構造や命名規則を一定に保つことが、コンテンツ取得処理の安定性のために重要。
- **Front Matter**: 必須フィールド（`title`, `publishedAt`, `status`, `category`）の記述漏れがないか、ビルド時にチェックする仕組みがあると望ましい（例: Zod でスキーマ定義し、ビルドスクリプトで検証）。
- **メモリ**: ビルド時に全記事データをメモリに読み込むため、記事数が極端に増えた場合のメモリ使用量に注意。
- **SEO**: SSG により SEO には有利だが、`sitemap.xml` の正確な生成、構造化データの実装を確実に行う。

## ❓ 解決すべき技術的課題 (方針決定)

- **検索機能の実装詳細**: 
    - **インデックス作成**: ビルド時に `scripts/build-search-index.js` を実行。`src/content/posts` から記事データを読み込み、`flexsearch` でインデックスを構築し、`public/search-index.json` に出力する。
    - **クライアント実装**: 検索コンポーネント (`src/features/search/_components/SearchBar.tsx` 等) で `/search-index.json` を非同期に読み込み、`flexsearch` でインデックスをロードして検索を実行する。
- **カテゴリ/タグ アイコン**: 
    - **マッピング**: `src/lib/icon-map.ts` にて、カテゴリ/タグ名 (小文字) と `react-icons/si` のコンポーネントのマッピングオブジェクト (`iconMap`) を定義する。
    - **フォールバック**: マッピングが存在しない場合に表示するデフォルトアイコン (`defaultIcon`) も同ファイルで定義する。
    - **利用**: 表示コンポーネントは `iconMap` からアイコンを取得し、存在しなければ `defaultIcon` を使用する。
- **ビルドパフォーマンス**: 
    - **初期対応**: 現状は効率的な SSG 実装を優先する。ビルド時に Front Matter の必須項目チェックなどを追加する。
    - **監視と対策**: 定期的にビルド時間を確認する。問題が発生した場合、`next build --profile` でボトルネックを特定し、ビルドスクリプトの最適化や ISR の限定的導入などを検討する。 