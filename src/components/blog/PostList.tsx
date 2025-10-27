/// Path: src/components/blog/PostList.tsx
/// Role: Readable dark-mode list of posts with card styling.

import React from "react";
import Link from "next/link";
import type { BlogPostMeta } from "@/data/blog/types";

export default function PostList({ posts }: { posts: BlogPostMeta[] }) {
  return (
    <ul className="space-y-4">
      {posts.map((postMeta) => (
        <li key={postMeta.slug}>
          <Link
            href={{ pathname: "/blog", query: { slug: postMeta.slug } }}
            className="block rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors duration-200"
          >
            <div className="p-5">
              <h3 className="text-lg font-medium text-gray-100">
                {postMeta.title.en}
              </h3>
              <p className="mt-1 text-sm text-gray-400">
                {postMeta.description.en}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                <time dateTime={postMeta.publishedAt}>
                  {new Date(postMeta.publishedAt).toLocaleDateString(
                    undefined,
                    {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    }
                  )}
                </time>
                {postMeta.tags.length > 0 && (
                  <span className="ml-2">
                    {postMeta.tags.map((tag) => `#${tag}`).join(" ")}
                  </span>
                )}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
