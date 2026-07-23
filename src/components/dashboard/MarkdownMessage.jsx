/**
 * MarkdownMessage
 * -----------------------------------------------------------------------
 * Renders AI reply content as real formatted Markdown (bold, headings,
 * lists, code) instead of showing raw "**"/"##" characters as literal
 * text. Uses react-markdown + remark-gfm (adds table/strikethrough
 * support on top of base Markdown).
 *
 * Every element is re-styled via the `components` prop to use ASTRA's
 * own design tokens — react-markdown's default output is unstyled HTML,
 * so left alone it would look like a browser default, not part of
 * this app's design system.
 * ----------------------------------------------------------------------- */

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const markdownComponents = {
  h1: ({ children }) => (
    <h1 className="font-display font-semibold text-lg text-text-primary mt-3 mb-2 first:mt-0">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="font-display font-semibold text-base text-text-primary mt-3 mb-1.5 first:mt-0">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-display font-semibold text-sm text-text-primary mt-2 mb-1 first:mt-0">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-sm font-body leading-relaxed mb-2 last:mb-0">{children}</p>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-text-primary">{children}</strong>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-outside ml-4 mb-2 flex flex-col gap-1">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-outside ml-4 mb-2 flex flex-col gap-1">{children}</ol>
  ),
  li: ({ children }) => <li className="text-sm font-body leading-relaxed">{children}</li>,
  code: ({ children }) => (
    <code className="font-mono-label text-xs bg-glass-fill-hover px-1.5 py-0.5 rounded normal-case tracking-normal">
      {children}
    </code>
  ),
  a: ({ children, href }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-accent-signal hover:text-accent-signal-soft underline"
    >
      {children}
    </a>
  ),
};

export function MarkdownMessage({ content }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
      {content}
    </ReactMarkdown>
  );
}