/// Path: src/app/blog/page.tsx
/// Role: Blog index/detail — ensure text colors adapt to light/dark

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { loadPostBySlug, listAllPostMetas } from "@/data/blog";
import PostList from "@/components/blog/PostList";
import { BlogArticle } from "@/components/blog/BlogArticle";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function BlogPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = (await searchParams) ?? {};
  const getFirst = (v: string | string[] | undefined) =>
    Array.isArray(v) ? v[0] : v;

  const slugFromParams = getFirst(sp.slug) ?? "";
  const langRaw = getFirst(sp.lang);
  const preferredLanguageFromParams =
    langRaw === "en" || langRaw === "es" ? (langRaw as "en" | "es") : undefined;

  let content: React.ReactNode;

  if (slugFromParams) {
    const blogPost = await loadPostBySlug(slugFromParams);
    if (blogPost) {
      content = (
        <main
          className="mx-auto max-w-3xl px-6 pt-24 pb-16"
          key={slugFromParams}
        >
          <BlogArticle
            post={blogPost}
            initialLanguage={preferredLanguageFromParams}
          />
        </main>
      );
    } else {
      const allMetas = await listAllPostMetas();
      content = (
        <main className="mx-auto max-w-3xl px-6 pt-24 pb-16">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
            Post not found
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            The requested article does not exist. Pick one from the list below.
          </p>
          <div className="mt-8">
            <PostList posts={allMetas} />
          </div>
        </main>
      );
    }
  } else {
    const allMetas = await listAllPostMetas();
    content = (
      <main className="mx-auto max-w-3xl px-6 pt-24 pb-16">
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
          Blog
        </h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Choose an article. You can toggle English/Español inside each post.
        </p>
        <div className="mt-8">
          <PostList posts={allMetas} />
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">{content}</div>
      <Footer />
    </div>
  );
}
