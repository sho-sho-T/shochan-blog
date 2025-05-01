import Link from 'next/link';
// 使用していないのでImageインポートを削除
import React from 'react';
// react-markdown との互換性のために Components 型をインポート
import type { Components } from 'react-markdown';

// Directly export the components object
export const mdxComponents: Components = {
  // ルート要素にクラスを適用するための div オーバーライド
  div: ({ ...props }) => <div className="markdown-body max-w-none" {...props} />,

  // Standard HTML elements with explicit types
  h1: ({ ...props }) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
  h2: ({ ...props }) => <h2 className="text-2xl font-semibold mt-6 mb-3 border-b pb-2" {...props} />,
  h3: ({ ...props }) => <h3 className="text-xl font-semibold mt-4 mb-2" {...props} />,
  p: ({ ...props }) => <p className="leading-7 [&:not(:first-child)]:mt-6" {...props} />,
  a: ({ href, ...props }) => {
    if (href?.startsWith('/')) {
      return <Link href={href} className="text-primary underline hover:text-primary/80" {...props} />;
    }
    if (href?.startsWith('#')) {
      return <a href={href} className="text-primary underline hover:text-primary/80" {...props} />;
    }
    return <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80" {...props} />;
  },
  ul: ({ ...props }) => <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props} />,
  ol: ({ ...props }) => <ol className="my-6 ml-6 list-decimal [&>li]:mt-2" {...props} />,
  li: ({ ...props }) => <li className="" {...props} />,
  blockquote: ({ ...props }) => <blockquote className="mt-6 border-l-2 pl-6 italic" {...props} />,
  // Add table styles
  table: ({ ...props }) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className="w-full border-collapse border border-border" {...props} />
    </div>
  ),
  th: ({ ...props }) => (
    <th
      className="border border-border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right"
      {...props}
    />
  ),
  td: ({ ...props }) => (
    <td
      className="border border-border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
      {...props}
    />
  ),
  code: ({ children, ...props }) => {
    // rehype-highlight がインライン/ブロックを正しく処理する場合、ここのコードはインライン用
    return <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold" {...props}>{children}</code>;
    // ブロックコードのスタイルは rehype-highlight とその CSS テーマで処理される想定
  },
  // pre は通常 rehype-highlight で処理されるため、特定のスタイルが必要なければオーバーライド不要

  // 必要に応じて img 要素を Next Image で置き換える例:
  // img: ({ ...props }) => (
  //   <Image sizes="100vw" style={{ width: '100%', height: 'auto' }} alt={props.alt || ""} {...props} />
  // ),

  // Allow further customization by merging (handled in the component using it)
}; 