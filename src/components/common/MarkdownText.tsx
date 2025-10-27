/* eslint-disable @typescript-eslint/no-unused-vars */
/// Path: src/components/common/MarkdownText.tsx
/// Role: Safe Markdown renderer with GFM and Tailwind Typography styling

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
    "prose-invert",
    "max-w-none",
    // Make body text breathe and links/quotes/lists look like the reference
    "md:prose-lg",
    "prose-p:leading-relaxed",
    "prose-p:text-gray-300",
    "prose-a:no-underline hover:prose-a:underline",
    "prose-a:text-sky-400 hover:prose-a:text-sky-300",
    "prose-strong:text-gray-100",
    "prose-blockquote:border-l-2",
    "prose-blockquote:border-gray-700",
    "prose-blockquote:italic",
    "prose-li:marker:text-gray-500",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={wrapperClassName}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ node, ...anchorProperties }) => (
            <a
              {...anchorProperties}
              target="_blank"
              rel="noopener noreferrer"
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
