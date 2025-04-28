import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
// Import the components object directly
import { mdxComponents } from '@/mdx-components'; // Adjust path if necessary

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // Remove the hook call
  // const mdxComponents = useMDXComponents({});

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[
        rehypeSlug, // Add IDs to headings
        [rehypeAutolinkHeadings, { behavior: 'wrap' }], // Add links to headings (wraps the heading)
        rehypeHighlight, // Add syntax highlighting
      ]}
      components={mdxComponents} // Use the imported object directly
      // className is removed, handled by div in mdxComponents
    >
      {content}
    </ReactMarkdown>
  );
} 