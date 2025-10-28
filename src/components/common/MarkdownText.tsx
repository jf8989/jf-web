/// Path: src/components/common/MarkdownText.tsx
/// Role: Safe Markdown renderer with GFM and tuned Typography utilities (lists, quotes, captions)

"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type MarkdownTextProps = {
  content: string;
  className?: string;
};

export default function MarkdownText({
  content,
  className,
}: MarkdownTextProps) {
  const wrapperClassName = [
    "prose",
    "dark:prose-invert", // <- was "prose-invert"; now only in dark mode
    "max-w-none",
    "md:prose-lg",
    "prose-headings:tracking-tight",
    "prose-h2:mt-10 prose-h2:mb-4",
    "prose-h3:mt-8 prose-h3:mb-3",
    "prose-p:leading-relaxed",
    "prose-li:my-1",
    "prose-ul:my-4 prose-ol:my-4",
    "prose-blockquote:pl-4 prose-blockquote:italic",
    "prose-hr:border-gray-800",
    "prose-a:no-underline hover:prose-a:underline",
    "prose-img:rounded-xl prose-img:border prose-img:border-white/10",
    "prose-figcaption:text-gray-400 prose-figcaption:italic prose-figcaption:text-center",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={wrapperClassName}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
