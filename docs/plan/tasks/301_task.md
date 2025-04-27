# 個人技術ブログ 実装タスク一覧

## 📑 関連ドキュメント

- [個人技術ブログ 要件定義書](../requirements/101_specification.md)
- [個人技術ブログ 設計方針書](../design/201_design-doc.md)
- [タスク分割・整理ガイド](../rules/make-task.md)

## 📋 概要

Git ベースのコンテンツ管理を行う静的ブログサイトの構築に関する実装タスクを整理します。Next.js (SSG), TypeScript, shadcn-ui を使用します。

## ✅ タスクリスト

### フェーズ1: プロジェクトセットアップと基本構造

1.  **[T1-1] Next.js プロジェクト初期化と Biome 設定**
    - 概要: `create-next-app` を使用してプロジェクトを作成し、フォーマッター/リンターとして Biome を導入・設定。
    - 完了条件:
        - [x] Next.js プロジェクトが作成されている。
        - [x] TypeScript, Tailwind CSS, ESLint が設定されている。
        - [x] Biome (`@biomejs/biome`) が dev dependency としてインストールされている。
        - [x] `biome.json` が設定されている (フォーマット、リント ルール)。
        - [x] `package.json` に Biome のフォーマット・リント用スクリプトが追加されている (例: `format`, `lint:biome`)。
        - [x] `npm run dev` で開発サーバーが起動し、初期ページが表示される。
    - 動作確認:
        - [x] `npm run lint:biome` (または設定したコマンド) でエラーが出ないこと。
        - [x] `npm run format` (または設定したコマンド) でコードがフォーマットされること。
        - [x] `npm run build` でビルドが成功すること。

2.  **[T1-2] shadcn-ui 導入と設定**
    - 概要: shadcn-ui CLI を使用して初期化し、基本的な UI コンポーネント (Button など) を導入。
    - 完了条件:
        - [x] `components.json` が生成されている。
        - [x] `Button` コンポーネントが `src/components/ui/button.tsx` に追加されている。
        - [x] グローバル CSS (`src/app/globals.css`) に Tailwind CSS の設定が反映されている。
    - 動作確認:
        - [x] `npm run dev` でスタイルが適用された Button が表示できること。

3.  **[T1-3] ディレクトリ構造整備**
    - 概要: `docs/002_directory_structure.md` に基づき、`src/app`, `src/components`, `src/features`, `src/lib`, `src/content`, `public/images`, `scripts` 等のディレクトリを作成。
    - 完了条件:
        - [ ] 設計書通りの主要ディレクトリが存在する。
    - 動作確認:
        - [ ] ディレクトリ構造が設計書と一致していることを目視確認。

4.  **[T1-4] 基本レイアウトコンポーネント実装**
    - 概要: ヘッダー (`Header`)、フッター (`Footer`)、メインコンテンツ領域を含む共通レイアウト (`src/components/layout/`) を実装。
    - 完了条件:
        - [ ] `Header` コンポーネントが作成されている（サイトタイトル表示など）。
        - [ ] `Footer` コンポーネントが作成されている（コピーライト表示など）。
        - [ ] ルートレイアウト (`src/app/(routes)/layout.tsx`) でヘッダー、フッターが適用されている。
    - 動作確認:
        - [ ] `npm run dev` で各ページに共通のヘッダー・フッターが表示されること。
        - [ ] Storybook でレイアウトコンポーネントの表示確認 (任意)。

### フェーズ2: コンテンツ処理と記事表示

5.  **[T2-1] コンテンツ取得ユーティリティ実装 (`src/lib/content/posts.ts`)**
    - 概要: `src/content/posts` ディレクトリ内の Markdown ファイルを読み込み、`gray-matter` で Front Matter と本文をパースする関数を実装。
    - 完了条件:
        - [ ] 指定ディレクトリの `.md`/`.mdx` ファイルを再帰的に読み込む関数 (`getAllPosts`) が実装されている。
        - [ ] Front Matter (title, publishedAt, status, category, tags など) と本文 (`content`) を含むオブジェクトの配列を返す。
        - [ ] 公開日 (`publishedAt`) で降順ソートする機能を含む。
        - [ ] 下書き (`status: 'draft'`) を除外する機能を含む。
        - [ ] 個別記事取得用の関数 (`getPostBySlug`) も実装されている (slug はファイル名から生成)。
        - [ ] Front Matter の型定義 (`src/lib/content/types.ts` または `src/features/post/_types/post.ts`) が作成されている。
    - 動作確認:
        - [ ] `npm run test:lib` でユニットテストが通ること。
        - [ ] テスト用に配置したダミー Markdown ファイルが正しくパースされることを確認。

6.  **[T2-2] Markdown レンダリング設定 (`react-markdown`)**
    - 概要: `react-markdown` と関連プラグイン (`remark-gfm`, `rehype-highlight`, `rehype-autolink-headings`, `rehype-slug`) を導入・設定。MDX グローバルコンポーネント (`src/mdx-components.tsx`) を設定。
    - 完了条件:
        - [ ] 必要なライブラリがインストールされている。
        - [ ] `react-markdown` を使用するラッパーコンポーネント (`src/components/mdx/MarkdownRenderer.tsx` 等) が作成されている。
        - [ ] 各プラグインが適用され、GFM、シンタックスハイライト、見出しリンクが機能する設定になっている。
        - [ ] `mdx-components.tsx` で基本的な HTML タグのカスタムスタイル（任意）やカスタムコンポーネントが設定されている。
    - 動作確認:
        - [ ] `npm run test:components` でユニットテストが通ること (該当する場合)。
        - [ ] Storybook で様々な Markdown 要素（コードブロック、テーブル、リンク）が正しくレンダリングされることを確認。

7.  **[T2-3] 記事一覧ページ実装 (`src/app/(routes)/blog/page.tsx`)**
    - 概要: 全記事一覧を表示するページを実装。SSG で生成。
    - 完了条件:
        - [ ] [T2-1] の `getAllPosts` を使用して公開記事データを取得。
        - [ ] 記事カードコンポーネント (`src/features/post/_components/PostCard.tsx` 等) を使用して記事一覧を表示。
        - [ ] 各記事カードにはタイトル、公開日、カテゴリ、タグ、抜粋（任意）を表示。
        - [ ] 記事詳細ページへのリンクが設定されている。
    - 動作確認:
        - [ ] `npm run dev` で `/blog` にアクセスし、テスト用記事の一覧が表示されること。
        - [ ] `npm run build` で静的ページが生成されること。

8.  **[T2-4] 記事詳細ページ実装 (`src/app/(routes)/blog/[slug]/page.tsx`)**
    - 概要: 個別記事の内容を表示するページを実装。SSG で動的ルートを生成。
    - 完了条件:
        - [ ] `generateStaticParams` で公開記事の slug を取得し、静的パスを生成。
        - [ ] [T2-1] の `getPostBySlug` を使用して記事データを取得。
        - [ ] タイトル、公開日、カテゴリ、タグなどのメタ情報を表示。
        - [ ] [T2-2] の Markdown レンダリングコンポーネントを使用して記事本文を表示。
    - 動作確認:
        - [ ] `npm run dev` で `/blog/[slug]` にアクセスし、テスト用記事の内容が表示されること。
        - [ ] コードブロックのハイライト、見出しリンクなどが機能することを確認。
        - [ ] `npm run build` で各記事の静的ページが生成されること。

### フェーズ3: カテゴリ・タグ機能実装

9.  **[T3-1] カテゴリ/タグ集約ユーティリティ実装 (`src/lib/content/[categories|tags].ts`)**
    - 概要: 全記事データからユニークなカテゴリとタグのリスト、および各項目に属する記事数を集約する関数を実装。
    - 完了条件:
        - [ ] 全記事データを引数に取り、カテゴリ名（またはタグ名）とその記事数のマップを返す関数 (`getAllCategories`, `getAllTags`) が実装されている。
    - 動作確認:
        - [ ] `npm run test:lib` でユニットテストが通ること。

10. **[T3-2] カテゴリ/タグ別記事一覧ページ実装 (`/blog/categories/[category]`, `/blog/tags/[tag]`)**
     - 概要: 特定のカテゴリまたはタグに属する記事の一覧を表示するページを実装。SSG で動的ルートを生成。
     - 完了条件:
         - [ ] `generateStaticParams` で存在するカテゴリ名/タグ名を取得し、静的パスを生成。
         - [ ] [T2-1] の `getAllPosts` をフィルタリングして該当記事データを取得。
         - [ ] 記事一覧を [T2-3] と同様の形式で表示。
         - [ ] 現在表示中のカテゴリ/タグ名をページタイトル等に表示。
     - 動作確認:
         - [ ] `npm run dev` で `/blog/categories/[category]`