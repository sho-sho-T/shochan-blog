---
title: 'Next.jsのFont最適化機能 next/font を解説'
publishedAt: '2025-05-18'
status: 'published'
category: 'NextJS'
tags: ['nextjs', 'font', 'optimization', 'web-performance']
---

## はじめに

Webサイト, アプリを作ってて以下の問題に直面することがある

- ページの表示が遅い 😫
- 読み込み途中で文字のレイアウトが崩れる 😱
- 外部サービス依存でプライバシーが心配 🔒

これらの問題はNext.js 13からの**Font最適化機能 (next/font)** が解決してくれる。

## next/fontのメリット

next/font使うと、こんな嬉しいことがある。

1. **ページの表示が速い** ⚡
   外部リクエスト減って、サクサク表示。

2. **レイアウトのガタつき消滅** 🧩
　　ビルド時に用意されるから表示が安定。

3. **自動で最適化** 🔄
   必要な文字だけ含めるからデータ量も減る。日本語フォント使うときは特に効果大。

4. **プライバシーも安心** 🛡️
   Googleに余計な情報送らなくて済む。プライバシー気にする人も安心。

5. **ブランディングも守れる** ✨
   おしゃれフォント使いたいけどパフォーマンスも大事…そのジレンマから解放。

## 基本の使い方

### Google Fontsを使う

```tsx
// app/layout.tsx
import { Inter } from 'next/font/google';

// フォントを設定
const inter = Inter({
  subsets: ['latin'],  // 使う文字セット
  display: 'swap',     // フォント表示方法
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
```

### 独自フォントを使う

```tsx
// app/layout.tsx
import localFont from 'next/font/local';

// 独自フォントを設定
const myFont = localFont({
  src: './my-font.woff2',  // フォントファイルのパス
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={myFont.className}>
      <body>{children}</body>
    </html>
  );
}
```

## 複数フォントの使い方

```tsx
// app/fonts.ts - フォント定義ファイル
import { Inter, Roboto_Mono } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
});

export const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
});
```

```tsx
// app/page.tsx - コンポーネントでの使用例
import { roboto_mono } from './fonts';

export default function Page() {
  return (
    <h1 className={roboto_mono.className}>
      このテキストはRoboto Monoフォントで表示
    </h1>
  );
}
```

## Tailwind CSSと一緒に使う

```tsx
// app/layout.tsx
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',  // CSS変数として設定
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
```

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
    },
  },
};
```

`font-sans`クラス使うだけ。毎回クラス名書く手間ゼロ。

### CSS変数の利点

1. **コードがシンプル** 🧹
   毎回 `className={inter.className}` 書かなくていい。
   
   ```tsx
   // 毎回フォント指定
   <h1 className={inter.className}>見出し</h1>
   <p className={inter.className}>段落</p>
   
   // Tailwindなら
   <h1 className="font-sans">見出し</h1>
   <p className="font-sans">段落</p>
   ```

2. **一元管理** 🎯
   フォント変えたくなったらconfig1箇所だけでOK。超ラク。

3. **Tailwindの機能フル活用** 💪
   レスポンシブも余裕。
   
   ```tsx
   // 画面サイズでフォント切り替え
   <p className="font-sans md:font-serif lg:font-mono">テキスト</p>
   ```

4. **既存プロジェクトにもすぐ導入** 🔄
   既存Tailwindプロジェクトにもサクッと追加できる。

実際の例はこれ。

```tsx
// ヘッダーコンポーネント
export function Header() {
  return (
    <header className="bg-blue-500 p-4">
      <h1 className="font-sans text-2xl font-bold text-white">
        私のNext.jsブログ
      </h1>
      <nav className="font-sans text-sm text-white">
        <a href="/" className="mr-4 hover:underline">ホーム</a>
        <a href="/about" className="mr-4 hover:underline">About</a>
        <a href="/blog" className="hover:underline">ブログ</a>
      </nav>
    </header>
  );
}
```

## まとめ

- ⚡ 表示速い
- 🧩 レイアウト安定
- 🔄 フォント勝手に最適化
- 🛡️ プライバシーもバッチリ
