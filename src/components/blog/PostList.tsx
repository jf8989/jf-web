/// Path: src/components/blog/PostList.tsx
/// Role: Cards adapt to light/dark (borders, backgrounds, hover, focus)

"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { BlogPostMeta } from "@/data/blog/types";

type PostListProps = { posts: BlogPostMeta[] };

export default function PostList({ posts }: PostListProps) {
  if (!posts?.length) {
    return (
      <p className="text-sm text-gray-600 dark:text-gray-400">
        No articles yet. Check back soon.
      </p>
    );
  }

  return (
    <ul className="space-y-6">
      {posts.map((post, index) => {
        const title = post.title.en;
        const description = post.description.en;
        const published = new Date(post.publishedAt).toLocaleDateString(
          undefined,
          {
            year: "numeric",
            month: "short",
            day: "2-digit",
          }
        );

        const href = `/blog?slug=${encodeURIComponent(post.slug)}`;

        return (
          <li key={post.slug}>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.25 }}
            >
              <Link
                href={href}
                prefetch
                className="block rounded-2xl border bg-black/5 border-black/10 hover:bg-black/10 focus:bg-black/10 dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10 dark:focus:bg-white/10 transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600/30"
              >
                <div className="p-6">
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-100">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {description}
                  </p>
                  <div className="mt-3 text-xs text-gray-500">{published}</div>
                </div>
              </Link>
            </motion.div>
          </li>
        );
      })}
    </ul>
  );
}
