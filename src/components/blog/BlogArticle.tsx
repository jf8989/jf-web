/// Path: src/components/blog/BlogArticle.tsx
/// Role: Bilingual article renderer — paragraphs now render via MarkdownText for rich formatting

"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import type { BlogLanguage, BlogPost, BlogBlock } from "@/data/blog/types";
import { motion } from "framer-motion";
import MarkdownText from "@/components/common/MarkdownText";

export type BlogArticleProps = {
  post: BlogPost;
  initialLanguage?: BlogLanguage;
};

export function BlogArticle({ post, initialLanguage }: BlogArticleProps) {
  const [language, setLanguage] = useState<BlogLanguage>(
    initialLanguage ?? "en"
  );

  const switchTo = (targetLanguage: BlogLanguage) => () =>
    setLanguage(targetLanguage);

  const title = post.title[language];
  const description = post.description[language];

  const renderBlock = (block: BlogBlock, index: number) => {
    switch (block.type) {
      case "h2":
        return (
          <h2
            key={index}
            className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-100 mt-10 mb-4"
          >
            {block.text[language]}
          </h2>
        );
      case "h3":
        return (
          <h3
            key={index}
            className="text-xl md:text-2xl font-semibold tracking-tight text-gray-100 mt-8 mb-3"
          >
            {block.text[language]}
          </h3>
        );
      case "p":
        return (
          <MarkdownText
            key={index}
            content={block.text[language]}
            className="mb-5"
          />
        );
      case "image": {
        const caption = block.caption?.[language];
        return (
          <figure key={index} className="my-8">
            <div className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-white/5">
              <Image
                src={block.src}
                alt={block.alt[language]}
                width={block.width ?? 1600}
                height={block.height ?? 900}
                className="w-full h-auto object-cover"
                priority={block.priority}
              />
            </div>
            {caption && (
              <figcaption className="text-sm text-gray-400 mt-2 text-center">
                {caption}
              </figcaption>
            )}
          </figure>
        );
      }
      case "hr":
        return <hr key={index} className="my-12 border-gray-800" />;
      default:
        return null;
    }
  };

  const publishedDate = useMemo(() => {
    try {
      return new Date(post.publishedAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "2-digit",
      });
    } catch {
      return post.publishedAt;
    }
  }, [post.publishedAt]);

  return (
    <article>
      <header className="mb-8">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-100">
            {title}
          </h1>
          <div className="shrink-0">
            <div className="inline-flex rounded-lg border border-white/10 bg-white/5 p-1">
              <button
                onClick={switchTo("en")}
                className={`px-3 py-1.5 text-sm rounded-md transition ${
                  language === "en"
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-white/10"
                }`}
              >
                EN
              </button>
              <button
                onClick={switchTo("es")}
                className={`px-3 py-1.5 text-sm rounded-md transition ${
                  language === "es"
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-white/10"
                }`}
              >
                ES
              </button>
            </div>
          </div>
        </div>
        <p className="mt-3 text-lg leading-relaxed text-gray-300">
          {description}
        </p>
        <div className="mt-3 text-xs text-gray-500">{publishedDate}</div>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6 }}
          className="mt-5 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"
        />
      </header>

      <section className="max-w-none">{post.blocks.map(renderBlock)}</section>
    </article>
  );
}

export default BlogArticle;
