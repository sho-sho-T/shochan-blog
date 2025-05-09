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
        - [x] `Button` コンポーネントが `/components/ui/button.tsx` に追加されている。
        - [x] グローバル CSS (`/app/globals.css`) に Tailwind CSS の設定が反映されている。
    - 動作確認:
        - [x] `npm run dev` でスタイルが適用された Button が表示できること。

3.  **[T1-3] ディレクトリ構造整備**
    - 概要: `docs/002_directory_structure.md` に基づき、`/app`, `/components`, `/features`, `/lib`, `/content`, `public/images`, `scripts` 等のディレクトリを作成。
    - 完了条件:
        - [x] 設計書通りの主要ディレクトリが存在する。
    - 動作確認:
        - [x] ディレクトリ構造が設計書と一致していることを目視確認。

4.  **[T1-4] 基本レイアウトコンポーネント実装**
    - 概要: ヘッダー (`Header`)、フッター (`Footer`)、メインコンテンツ領域を含む共通レイアウト (`/components/layout/`) を実装。
    - 完了条件:
        - [x] `Header` コンポーネントが作成されている（サイトタイトル表示など）。
        - [x] `Footer` コンポーネントが作成されている（コピーライト表示など）。
        - [x] ルートレイアウト (`/app/(routes)/layout.tsx`) でヘッダー、フッターが適用されている。
    - 動作確認:
        - [x] `npm run dev` で各ページに共通のヘッダー・フッターが表示されること。

### フェーズ2: コンテンツ処理と記事表示

5.  **[T2-1] コンテンツ取得ユーティリティ実装 (`/lib/content/posts.ts`)**
    - 概要: `/content/posts` ディレクトリ内の Markdown ファイルを読み込み、`gray-matter` で Front Matter と本文をパースする関数を実装。
    - 完了条件:
        - [x] 指定ディレクトリの `.md`/`.mdx` ファイルを再帰的に読み込む関数 (`getAllPosts`) が実装されている。
        - [x] Front Matter (title, publishedAt, status, category, tags など) と本文 (`content`) を含むオブジェクトの配列を返す。
        - [x] 公開日 (`publishedAt`) で降順ソートする機能を含む。
        - [x] 下書き (`status: 'draft'`) を除外する機能を含む。
        - [x] 個別記事取得用の関数 (`getPostBySlug`) も実装されている (slug はファイル名から生成)。
        - [x] Front Matter の型定義 (`/lib/content/types.ts` または `/features/post/_types/post.ts`) が作成されている。
    - 動作確認:
        - [x] `npm run test` でユニットテストが通ること。 (Script name is 'test')
        - [x] テスト用に配置したダミー Markdown ファイルが正しくパースされることを確認。

6.  **[T2-2] Markdown レンダリング設定 (`react-markdown`)**
    - 概要: `react-markdown` と関連プラグイン (`remark-gfm`, `rehype-highlight`, `rehype-autolink-headings`, `rehype-slug`) を導入・設定。MDX グローバルコンポーネント (`/mdx-components.tsx`) を設定。
    - 完了条件:
        - [x] 必要なライブラリがインストールされている。
        - [x] `react-markdown` を使用するラッパーコンポーネント (`/components/mdx/MarkdownRenderer.tsx` 等) が作成されている。
        - [x] 各プラグインが適用され、GFM、シンタックスハイライト、見出しリンクが機能する設定になっている。
        - [x] `mdx-components.tsx` で基本的な HTML タグのカスタムスタイル（任意）やカスタムコンポーネントが設定されている。
    - 動作確認:
        - [ ] `npm run test:components` でユニットテストが通ること (該当する場合)。
        - [ ] Storybook で様々な Markdown 要素（コードブロック、テーブル、リンク）が正しくレンダリングされることを確認。

7.  **[T2-3] 記事一覧ページ実装 (`/app/(routes)/blog/page.tsx`)**
    - 概要: 全記事一覧を表示するページを実装。SSG で生成。
    - 完了条件:
        - [x] [T2-1] の `getAllPosts` を使用して公開記事データを取得。
        - [x] 記事カードコンポーネント (`/features/post/_components/PostCard.tsx` 等) を使用して記事一覧を表示。
        - [x] 各記事カードにはタイトル、公開日、カテゴリ、タグ、抜粋（任意）を表示。
        - [x] 記事詳細ページへのリンクが設定されている。
    - 動作確認:
        - [x] `npm run dev` で `/blog` にアクセスし、テスト用記事の一覧が表示されること。
        - [ ] `npm run build` で静的ページが生成されること。

8.  **[T2-4] 記事詳細ページ実装 (`/app/(routes)/blog/[slug]/page.tsx`)**
    - 概要: 個別記事の内容を表示するページを実装。SSG で動的ルートを生成。
    - 完了条件:
        - [x] `generateStaticParams` で公開記事の slug を取得し、静的パスを生成。
        - [x] [T2-1] の `getPostBySlug` を使用して記事データを取得。
        - [x] タイトル、公開日、カテゴリ、タグなどのメタ情報を表示。
        - [x] [T2-2] の Markdown レンダリングコンポーネントを使用して記事本文を表示。
    - 動作確認:
        - [x] `npm run dev` で `/blog/[slug]` にアクセスし、テスト用記事の内容が表示されること。
        - [x] コードブロックのハイライト、見出しリンクなどが機能することを確認。
        - [ ] `npm run build` で各記事の静的ページが生成されること。

### フェーズ3: カテゴリ・タグ機能実装

9.  **[T3-1] カテゴリ/タグ集約ユーティリティ実装 (`/lib/content/[categories|tags].ts`)**
    - 概要: 全記事データからユニークなカテゴリとタグのリスト、および各項目に属する記事数を集約する関数を実装。
    - 完了条件:
        - [x] 全記事データを引数に取り、カテゴリ名（またはタグ名）とその記事数のマップを返す関数 (`getAllCategories`, `getAllTags`) が実装されている。
    - 動作確認:
        - [x] `npm run test:lib` でユニットテストが通ること。

10. **[T3-2] カテゴリ/タグ別記事一覧ページ実装 (`/blog/categories/[category]`, `/blog/tags/[tag]`)**
     - 概要: 特定のカテゴリまたはタグに属する記事の一覧を表示するページを実装。SSG で動的ルートを生成。
     - 完了条件:
         - [x] `generateStaticParams` で存在するカテゴリ名/タグ名を取得し、静的パスを生成。
         - [x] [T2-1] の `getAllPosts` をフィルタリングして該当記事データを取得。
         - [x] 記事一覧を [T2-3] と同様の形式で表示。
         - [x] 現在表示中のカテゴリ/タグ名をページタイトル等に表示。
     - 動作確認:
         - [x] `npm run dev` で `/blog/categories/[category]`

### フェーズ4: UI改善と機能強化

11. **[T4-1] カスタム404ページ実装 (`/app/not-found.tsx`)**
    - 概要: サイトのデザインに合わせたカスタム404エラーページを作成。
    - 完了条件:
        - [ ] `/app/not-found.tsx` ファイルが作成されている。
        - [ ] サイト共通のレイアウト（ヘッダー/フッター）が適用されている。
        - [ ] 404エラーを示すメッセージと、トップページへのリンクが表示されている。
        - [ ] デザインが他のページと一貫している。
    - 動作確認:
        - [ ] `npm run dev` で存在しないURLにアクセスした際にカスタム404ページが表示されること。

12. **[T4-2] カテゴリアイコン表示機能実装**
    - 概要: カテゴリ名と `/public/images/icons` 配下のアイコン画像をマッピングし、記事カードコンポーネント (`PostCard`) で **Next/Image** を使用して表示する。また、記事詳細ページにもカテゴリアイコンを表示する。
    - 完了条件:
        - [x] `/features/post/_components/PostCard.tsx` の `CATEGORY_ICONS` 定義を修正し、各カテゴリに対応するアイコン画像のパスをマッピングする (例: `TypeScript` -> `/images/icons/typescript.png`)。
        - [x] マッピングが存在しないカテゴリにはデフォルトの表示（例: 絵文字または汎用アイコン）が適用される。
        - [x] `PostCard` コンポーネント内でカテゴリに対応するアイコンを `next/image` を使用して表示する。画像が存在しない場合のフォールバック処理を含む。
        - [x] `public/images/icons/` に主要なカテゴリに対応するアイコンファイル (例: `typescript.png`, `nextjs.png`, `javascript.png`, `ruby.png`) が配置されている。
        - [x] 記事詳細ページ (`/app/(routes)/blog/[slug]/page.tsx`) にもカテゴリアイコンを表示する機能を追加する。
        - [x] アイコンはタイトルの上部または横に適切なサイズで表示し、カテゴリ名と一緒に表示する。
        - [x] アイコン表示のために再利用可能な `CategoryIcon` コンポーネントを作成する (任意)。
    - 動作確認:
        - [x] `npm run dev` で記事一覧ページ (`/blog`) を開き、各記事のカテゴリに対応するアイコン画像が表示されること (例: TypeScript の記事には `typescript.png` が表示される)。
        - [x] アイコンが未定義のカテゴリや画像ファイルが存在しない場合に、適切にデフォルト表示または非表示になること。
        - [x] 記事詳細ページ (`/blog/[slug]`) でも記事のカテゴリに対応するアイコンが表示されること。
        - [x] `npm run build` が成功すること。

13. **[T4-3] Markdown レンダリング改善**
    - 概要: `MarkdownRenderer` コンポーネントにおけるテーブル表示の不具合を修正し、コードブロックのスタイルを改善する。
    - 完了条件:
        - [x] `components/mdx/MarkdownRenderer.tsx` または関連する CSS (`/app/globals.css`), `mdx-components.tsx` を修正し、Markdown 内のテーブル (`<table>`, `<th>`, `<td>` 等) が適切なスタイル（罫線、パディング等）で表示されるようにする。
        - [x] コードブロック (`<pre><code>`) に視認しやすい背景色 (例: ダークグレー系) と適切なパディングを適用する。 `rehype-highlight` によって付与されるクラス (`hljs`) を利用してスタイリングする。
        - [x] スタイリングは shadcn-ui のテーマ（CSS 変数）と整合性を保つ。
    - 動作確認:
        - [x] テーブルを含む Markdown ファイル (`content/posts/dummy-post-1.md` 等に追記して確認) を記事詳細ページで表示し、テーブルが整形されていることを確認。
        - [x] コードブロックが表示されている記事詳細ページで、コードブロックに背景色が付与され、読みやすくなっていることを確認。
        - [ x] Storybook で `MarkdownRenderer` コンポーネントの表示を確認 (任意)。

14. **[T4-4] ホーム画面への最新記事表示**
    - 概要: ホーム画面 (`/app/(routes)/page.tsx`) に最新の公開記事を数件 (例: 3件) 表示するセクションを追加する。
    - 完了条件:
        - [x] `/app/(routes)/page.tsx` で `getAllPosts` ユーティリティを使用し、公開済み (`status: 'published'`) の記事を公開日 (`publishedAt`) の降順で取得する。
        - [x] 取得した記事の中から最新の数件 (例: 3件) を選択する。
        - [x] `PostCard` コンポーネントを使用して、選択した記事の一覧を表示する。
        - [x] セクションのタイトル (例: "新着記事", "Recent Posts") を表示する。
        - [x] 全記事一覧ページ (`/blog`) へのリンク (例: "もっと見る", "View all posts") を表示する。
    - 動作確認:
        - [x] `npm run dev` でホーム画面 (`/`) にアクセスし、最新記事のセクションが表示され、記事カードが正しく表示・リンクされていることを確認。
        - [x] "もっと見る" リンクが `/blog` に正しく遷移することを確認。
        - [x] 記事が存在しない場合でもエラーなく表示されること。

15. **[T4-5] ヘッダー検索機能実装**
    - 概要: ヘッダーにカテゴリおよびタグによる記事検索機能を追加する。shadcn-ui の `Command` や `Dialog` を使用して UI を構築する。
    - 完了条件:
        - [x] `components/layout/header.tsx` に検索アイコンボタン (`MagnifyingGlassIcon` 等) を追加する。
        - [x] ボタンクリック時に shadcn-ui の `Dialog` または `CommandDialog` が開く。
        - [x] `Dialog` 内に `Command` コンポーネントを配置し、検索入力フィールドとカテゴリ/タグのリストを表示する。
        - [x] `getAllCategories` および `getAllTags` ユーティリティを使用して、存在するカテゴリとタグのリストを取得し、`CommandList` 内に表示する。
        - [x] ユーザーがリストからカテゴリまたはタグを選択すると、対応する一覧ページ (`/blog/categories/[category]` または `/blog/tags/[tag]`) に遷移する。
        - [x] (任意) 検索入力フィールドでカテゴリ/タグ名をフィルタリングできる。
    - 動作確認:
        - [x] `npm run dev` でヘッダーの検索ボタンをクリックし、検索ダイアログが表示されること。
        - [x] ダイアログ内にカテゴリとタグのリストが表示されること。
        - [x] リストから項目を選択すると、対応するカテゴリ/タグのページに遷移すること。
        - [x] ダイアログが正しく閉じられること。

### フェーズ5: フラッシュカードデータ構造とデータ準備

16. **[T5-1] フラッシュカードデータ形式定義とサンプルデータ作成**
    - 概要: フラッシュカードのデータ形式として JSON を採用し、型定義 (`Flashcard`, `Deck`) を作成する。 `/content/flashcards` ディレクトリを作成し、カテゴリ別のサンプル JSON ファイルを配置する。
    - 完了条件:
        - [ ] データ形式として JSON ファイル (`.json`) が決定されている。
        - [ ] 各 JSON ファイルは `Flashcard` オブジェクトの配列を含み、各オブジェクトは `id`, `question`, `answer` を持つ形式とする。
        - [ ] `Flashcard` (例: `id`, `question`, `answer`) と `Deck` (例: `category`, `title`, `cards`) の TypeScript 型定義が作成されている (`/lib/content/types.ts` または `/features/flashcard/_types/flashcard.ts`)。
        - [ ] `/content/flashcards` ディレクトリが作成されている。
        - [ ] カテゴリ別 (例: `/content/flashcards/ap/`, `/content/flashcards/pm/`) にディレクトリを作成し、その中にサンプル `.json` ファイルが配置されている (例: `/content/flashcards/pm/cards.json`)。
    - 動作確認:
        - [ ] 型定義が正しく、データ形式と一致していることを確認。
        - [ ] サンプル JSON ファイルが指定の形式に沿っていることを確認。
    - メモ:
        - カテゴリごとに1つの JSON ファイル (例: `cards.json`) を想定。
    - ~~**確認事項**~~ (解決済み)

### フェーズ6: フラッシュカードデータ処理

17. **[T6-1] フラッシュカードデータ取得ユーティリティ実装 (`/lib/content/flashcards.ts`)**
    - 概要: `/content/flashcards` ディレクトリ内の JSON ファイルを読み込み、パースする関数群を実装する。カテゴリはディレクトリ名から取得する。
    - 完了条件:
        - [ ] 全てのデッキ情報 (カテゴリ名、タイトル、カード数など) を取得する関数 (`getAllDecks`) が実装されている (カテゴリ名はディレクトリ名から取得)。
        - [ ] 特定のカテゴリのデッキデータ (カード情報を含む) を取得する関数 (`getDeckByCategory`) が実装されている。
        - [ ] JSON ファイルの読み込みと `JSON.parse` によるパース処理が正しく実装されている。
    - 動作確認:
        - [ ] サンプル JSON データが正しく読み込まれ、型定義に沿ったオブジェクトが返されることを確認。
    - テスト: 不要

### フェーズ7: フラッシュカードUI実装

18. **[T7-1] デッキ一覧ページ実装 (`/app/(routes)/flashcards/page.tsx`)**
    - 概要: 全てのフラッシュカードデッキを一覧表示するページを実装する。
    - 完了条件:
        - [ ] `/app/(routes)/flashcards/page.tsx` ルートが作成されている。
        - [ ] [T6-1] の `getAllDecks` を使用してデッキデータを取得する。
        - [ ] デッキカードコンポーネント (`/features/flashcard/_components/DeckCard.tsx`) を作成し、各デッキのカテゴリ名 (タイトルとして表示)、カード数を表示する。
        - [ ] 各デッキカードから対応するフラッシュカード学習ページへのリンクが設定されている (`/flashcards/[category]`)。
    - 動作確認:
        - [ ] `npm run dev` で `/flashcards` にアクセスし、サンプルデッキの一覧が表示されること。
        - [ ] 各デッキカードをクリックすると、対応する学習ページに遷移すること (学習ページ実装前は 404 で OK)。
        - [ ] `npm run build` が成功すること。
    - テスト: 不要

19. **[T7-2] フラッシュカード学習ページ実装 (`/app/(routes)/flashcards/[category]/page.tsx`)**
    - 概要: 特定のカテゴリのフラッシュカードを表示し、学習できるページを実装する。解説表示はなく、シンプルな実装とする。
    - 完了条件:
        - [ ] `/app/(routes)/flashcards/[category]/page.tsx` ルートが作成されている。
        - [ ] `generateStaticParams` で存在するデッキのカテゴリを取得し、静的パスを生成する。
        - [ ] [T6-1] の `getDeckByCategory` を使用して該当デッキのカードデータを取得する。
        - [ ] フラッシュカードコンポーネント (`/features/flashcard/_components/Flashcard.tsx`) を作成し、問題 (`question`) と答え (`answer`) を表示する。初期状態では問題のみ表示。
        - [ ] 「答えを見る」ボタンを実装し、クリックすると答えが表示される。
        - [ ] 答え表示後に「次のカードへ」ボタンを表示し、クリックすると次のカードの問題が表示される。最後のカードの場合はデッキ一覧へのリンクなどを表示。
        - [ ]  進捗状況 (例: `3/10 枚目`) を表示する。
    - 動作確認:
        - [ ] `npm run dev` で `/flashcards/[category]` にアクセスし、最初のカードの問題が表示されること。
        - [ ] 「答えを見る」ボタンで答えが表示されること。
        - [ ] 「次のカードへ」ボタンで次のカードが表示されること。
        - [ ] `npm run build` が成功すること。
    - ~~**確認事項**~~ (解決済み)
    - テスト: 不要

### フェーズ8: ホーム画面への統合

20. **[T8-1] ホーム画面へのリンクボタン追加**
    - 概要: ホーム画面 (`/app/(routes)/page.tsx`) にフラッシュカードアプリへの導線を追加する。
    - 完了条件:
        - [ ] `/app/(routes)/page.tsx` の最新記事セクションの上に、フラッシュカードアプリ (`/flashcards`) へのリンクを含むボタン (`Button` コンポーネント使用) を追加する。
        - [ ] ボタンのテキストは分かりやすいものにする (例: \"フラッシュカードで学習する\")。
    - 動作確認:
        - [ ] `npm run dev` でホーム画面 (`/`) にアクセスし、追加されたボタンが表示されること。
        - [ ] ボタンをクリックすると `/flashcards` ページに遷移すること。
    - テスト: 不要