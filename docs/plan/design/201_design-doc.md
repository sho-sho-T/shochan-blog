# 個人技術ブログ 設計方針書

## 📑 関連ドキュメント

- [個人技術ブログ 要件定義書](../requirements/101_specification.md)
- [技術スタック仕様書](../../003_teck_stack.md)
- [設計方針書作成ガイド](../rules/make-design-doc.md)

## 📋 概要

このドキュメントは、[個人技術ブログ 要件定義書](../requirements/101_specification.md) に基づき、ブログアプリケーションのフロントエンドおよび関連するバックエンドインタラクションの実装方針を定義します。Juniorエンジニアが迷いなく開発を進められるように、アーキテクチャ、主要コンポーネント、データフロー、および重要な実装選択に関する指針を提供します。

## 🔍 要件の分析

[個人技術ブログ 要件定義書](../requirements/101_specification.md) より、以下の主要な実装ポイントが抽出されます。

- **コア機能**: 記事（Markdown）、カテゴリ、タグのCRUD操作、画像管理（Supabase Storage連携）。
- **認証**: 管理者専用の機能（記事、カテゴリ、タグ管理）のための認証。
- **データ表示**: 記事一覧、記事詳細、カテゴリ/タグ別一覧、検索結果の表示。
- **付加機能**: アクセス解析（閲覧数表示、人気順）、SEO対策、検索機能。
- **技術スタック**: Next.js (App Router), TypeScript, shadcn-ui, Prisma, PostgreSQL (Supabase), Supabase Storage。

## 🛠 実装方針

### アーキテクチャ選択

- **フレームワーク**: Next.js 15 (App Router) を採用します。Server Components と Client Components を適切に使い分け、パフォーマンスと開発効率のバランスを取ります。
- **バックエンド/DB**: Supabase を利用します。認証、データベース (PostgreSQL)、ストレージ機能を提供します。
- **ORM**: Prisma を使用し、TypeScript との親和性を高め、型安全なデータベースアクセスを実現します。
- **UI**: shadcn-ui をベースとし、Tailwind CSS を用いてスタイリングします。参考画像のデザイン（ダークテーマ、シンプル、機能的）を踏襲します。

### コンポーネント設計

- **基本方針**: `docs/002_directory_structure.md` に従い、コンポーネントを配置します。
    - **共通コンポーネント**: プロジェクト全体で再利用可能な UI 部品（ボタン、レイアウト、MDX カスタム要素など）は `src/components/` 以下に配置します。`shadcn-ui` のコンポーネントを拡張したり、組み合わせたりしたものもここに含まれます。
    - **機能特化コンポーネント**: 特定の機能（記事、カテゴリ、タグ、認証など）に強く関連するコンポーネントは、`src/features/[機能名]/_components/` 以下に配置します。これにより、機能ごとの独立性を高めます。
    - **命名規則**: コンポーネントファイル名はケバブケース (`post-list.tsx`) またはパスカルケース (`PostList.tsx`) で統一します（プロジェクト内で一貫性を保つ）。
- **主要コンポーネント群（配置場所例）**:
    - `Layout` (例: `Header`, `Footer`): `src/components/layout/`
    - `Auth` (例: `LoginForm`): `src/features/auth/_components/`
    - `Article` (例: `PostList`, `PostDetail`, `MarkdownRenderer`):
        - `PostList`, `PostDetail`: `src/features/post/_components/`
        - `MarkdownRenderer` (共通部品として): `src/components/mdx/` または `src/components/ui/`
    - `Editor` (例: `MarkdownEditor`): `src/features/post/_components/post-editor/` または、より汎用的な場合は `src/components/ui/`
    - `Form` (例: `PostForm`, `CategoryForm`): 各機能の `src/features/[機能名]/_components/` 内
    - `Search` (例: `SearchBar`, `FilterPanel`): `src/components/search/` または機能として分離する場合は `src/features/search/_components/`
    - `Admin` (例: `AdminTable`, `AdminSidebar`): `src/components/admin/` または `src/features/admin/_components/` （管理者機能の規模による）
- **Server/Client 分担**:
    - **Server Components**: 静的な表示、データフェッチが主となるページやコンポーネント（記事一覧、記事詳細表示部分など）。
    - **Client Components**: ユーザーインタラクションが必要なコンポーネント（フォーム、エディタ、検索UI、状態を持つドロップダウンなど）。`'use client'` ディレクティブを付与します。

### データフロー

- **データフェッチ**:
    - Server Components 内では、Prisma Client を直接使用するか、Server Actions 経由でデータを取得します。
    - Client Components からのデータ取得や更新は、Server Actions を主に利用します。複雑な API が必要な場合は Route Handlers も検討します。
- **状態管理**:
    - **基本**: React の標準機能（`useState`, `useReducer`, Context API）を主に利用します。
    - **複雑な状態**: コンポーネント間で共有される複雑な状態や、グローバルな状態管理が必要な場合（例: 認証情報、テーマ設定）は、Zustand の導入を検討します。ただし、導入は必要性が明確になってから行います。
- **認証**: Supabase Auth を利用し、認証状態は Context API または Zustand で管理し、必要に応じて Server Components や Server Actions に伝達します。ミドルウェア (`middleware.ts`) で管理画面へのアクセス制御を行います。

## 🔄 実装方法の選択肢と決定

### 1. Markdown 処理

- **要件**: 記事コンテンツを Markdown で記述・表示。シンタックスハイライト、GFM (GitHub Flavored Markdown) 対応。
- **選択肢1**: `@next/mdx` + `@mdx-js/*` + `remark-*` / `rehype-*` プラグイン群
    - **説明**: Next.js 公式サポート。MDX ファイルとしてコンテンツを管理・レンダリング。React コンポーネントを Markdown 内に埋め込める。
    - **評価**: 高機能だが、DB に保存した Markdown 文字列を動的に処理する用途には少し複雑になる可能性がある。ビルド時に処理されることが主。
- **選択肢2**: `next-mdx-remote`
    - **説明**: DB などから取得した Markdown 文字列を動的にパースしてレンダリング。`remark`/`rehype` プラグインも利用可能。
    - **評価**: 今回の要件（DBに保存したMarkdownを表示）に適している。柔軟性が高い。
- **選択肢3**: `react-markdown` + `remark-*` / `rehype-*` プラグイン群
    - **説明**: Markdown 文字列を React 要素に変換するライブラリ。`remark`/`rehype` との連携が容易。
    - **評価**: シンプルで導入しやすい。`next-mdx-remote` より軽量な場合がある。
- **決定**: **`next-mdx-remote` または `react-markdown` を採用**
    - **理由**: DBに保存された Markdown 文字列を動的にレンダリングする要件に合致するため。どちらを選択するかは、実装時のプラグイン連携の容易さやパフォーマンスを比較検討して決定する（初期段階では `react-markdown` から試すのがシンプルか）。技術スタック仕様書にある `@next/mdx`, `@mdx-js/*` は、MDX ファイルを直接扱う場合に主に利用されるため、今回は次点とする。`remark-gfm`, `rehype-highlight`, `rehype-autolink-headings`, `rehype-slug` など、技術スタック仕様書記載の `remark`/`rehype` プラグインは、選択したライブラリと組み合わせて使用する。

### 2. 検索機能実装

- **要件**: キーワード、カテゴリ、タグによる記事検索。新着順、人気順（直近3ヶ月）での並び替え。
- **選択肢1**: Prisma + PostgreSQL の `LIKE` 検索 + クライアントサイドフィルタリング/ソート
    - **説明**: DB では `LIKE` による単純な文字列検索を行い、カテゴリ/タグでの絞り込みや並び替えは取得後にクライアントサイド（またはサーバーサイドのロジック）で行う。
    - **評価**: 実装は比較的容易だが、データ量が増えるとパフォーマンスが低下する可能性がある。全文検索の精度も高くない。
- **選択肢2**: Supabase (PostgreSQL) の全文検索機能 + Prisma
    - **説明**: PostgreSQL の FTS (Full Text Search) 機能を利用。`tsvector` 型と `tsquery` 型を使ってインデックスを作成し、高速かつ高精度な検索を実現。Prisma から FTS 関数を呼び出す。
    - **評価**: 高機能でパフォーマンスも良い。初期設定やクエリの記述がやや複雑になる可能性がある。
- **選択肢3**: 外部検索サービス (例: Algolia)
    - **説明**: 高度な検索機能を提供する SaaS を利用。
    - **評価**: 最も高機能だが、外部依存が増え、コストが発生する可能性がある。個人ブログの規模では過剰かもしれない。
- **決定**: **Supabase (PostgreSQL) の全文検索機能 + Prisma を採用**
    - **理由**: パフォーマンスと検索精度の観点から最適と判断。Supabase/PostgreSQL を利用しているため、追加コストなしで導入可能。実装の複雑さは許容範囲内と考える。カテゴリ/タグによるフィルタリング、並び替えは Prisma の `where`, `orderBy` で組み合わせる。

### 3. アクセス解析（閲覧数カウント）

- **要件**: 記事ごとの閲覧数を記録・表示。
- **選択肢1**: 記事表示時に API Route や Server Action を呼び出し、DB のカウントをインクリメント。
    - **説明**: ページアクセスごとにバックエンド処理を実行。
    - **評価**: シンプルだが、アクセスが多い場合にDBへの書き込み負荷が増加する可能性がある。ボットなどによる不正カウントのリスク。
- **選択肢2**: Vercel Edge Functions や Middleware を利用してカウント。
    - **説明**: リクエストのエッジ段階でカウント処理を行う。DB への書き込みは非同期やバッチ処理で行うことも可能。
    - **評価**: パフォーマンスが良い。DB 負荷を軽減できる可能性がある。実装がやや複雑になる。
- **選択肢3**: Google Analytics 等の外部サービスを利用し、API 経由で表示。
    - **説明**: 外部の高機能なアクセス解析サービスを利用。
    - **評価**: 実装は容易だが、リアルタイム性の欠如、外部依存、プライバシーへの配慮が必要。要件は「表示」なので、厳密なカウントよりは外部サービスで十分かもしれない。
- **決定**: **記事表示時に Server Action を呼び出し、DB のカウントをインクリメントする方式を採用（初期実装）**
    - **理由**: 実装が最もシンプルで、個人ブログの規模であれば十分機能すると考えられるため。負荷が問題になった場合は、DB 更新処理の最適化（例：キューイング、バッチ処理）や選択肢2への移行を検討する。不正カウント対策は User-Agent や IP アドレスベースの簡易的なフィルタリングを検討。

## 📊 技術的制約と考慮事項

- **Supabase**: 無料プランの制限（同時接続数、DB サイズ、ストレージ容量、関数実行時間など）を意識する。必要に応じて有料プランを検討。
- **Prisma**: スキーマ変更時はマイグレーション (`prisma migrate dev`, `prisma migrate deploy`) を適切に行う。
- **Next.js/Vercel**: Server Actions や Route Handlers のタイムアウト制限。ISR (Incremental Static Regeneration) を利用する場合の revalidate 時間の設定。
- **shadcn-ui**: UI のカスタマイズ性には限界がある場合がある。必要に応じてカスタムコンポーネントを作成する。
- **SEO**: `next-sitemap` 等のライブラリを利用したサイトマップ生成、構造化データ（JSON-LD）の実装を確実に行う。

## ❓ 解決すべき技術的課題

- **Markdown エディタ**: プレビュー機能付きのリッチなエディタが望ましい。`@uiw/react-md-editor` を第一候補として検討し、導入する。シンプルな入力補助（太字、リストなど）のツールバーも実装する。
- **画像管理**: Supabase Storage へのアップロード UI を実装する。記事削除時には、記事本文やカバー画像で参照されていた画像を Supabase Storage から**自動的に削除する**ロジックを Server Action 等で実装する。
- **パフォーマンス**: 大量の記事やタグが存在する場合の DB クエリの最適化（インデックス設定、ページネーション実装）。画像の最適化（Next/Image の活用、適切なフォーマット選択）。初期表示速度を意識したコンポーネント設計（Server/Client Component の適切な分割）。
- **カテゴリ/タグ アイコン**: アイコンライブラリを利用する方針とする。`react-icons` などの包括的なライブラリから、Next.js, TypeScript, Docker など技術スタックに関連するアイコンを選択できるようにする。カテゴリ/タグ編集画面でアイコンを選択・設定する UI を実装する。 