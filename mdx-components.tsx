import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
// react-markdown との互換性のために Components 型をインポート
import type { Components } from 'react-markdown';

// Directly export the components object
export const mdxComponents: Components = {
  // ルート要素にクラスを適用するための div オーバーライド
  div: ({ node, ...props }) => <div className="markdown-body max-w-none" {...props} />,

  // Standard HTML elements with explicit types
  h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
  h2: ({ node, ...props }) => <h2 className="text-2xl font-semibold mt-6 mb-3 border-b pb-2" {...props} />,
  h3: ({ node, ...props }) => <h3 className="text-xl font-semibold mt-4 mb-2" {...props} />,
  p: ({ node, ...props }) => <p className="leading-7 [&:not(:first-child)]:mt-6" {...props} />,
  a: ({ node, href, ...props }) => {
    if (href?.startsWith('/')) {
      return <Link href={href} className="text-primary underline hover:text-primary/80" {...props} />;
    }
    if (href?.startsWith('#')) {
      return <a href={href} className="text-primary underline hover:text-primary/80" {...props} />;
    }
    return <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80" {...props} />;
  },
  ul: ({ node, ...props }) => <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props} />,
  ol: ({ node, ...props }) => <ol className="my-6 ml-6 list-decimal [&>li]:mt-2" {...props} />,
  li: ({ node, ...props }) => <li className="" {...props} />,
  blockquote: ({ node, ...props }) => <blockquote className="mt-6 border-l-2 pl-6 italic" {...props} />,
  code: ({ node, className, children, ...props }) => {
    // rehype-highlight がインライン/ブロックを正しく処理する場合、ここのコードはインライン用
    return <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold" {...props}>{children}</code>;
    // ブロックコードのスタイルは rehype-highlight とその CSS テーマで処理される想定
  },
  // pre は通常 rehype-highlight で処理されるため、特定のスタイルが必要なければオーバーライド不要

  // 必要に応じて img 要素を Next Image で置き換える例:
  // img: ({ node, ...props }) => (
  //   <Image sizes="100vw" style={{ width: '100%', height: 'auto' }} alt={props.alt || ""} {...props} />
  // ),

  // Allow further customization by merging (handled in the component using it)
}; 