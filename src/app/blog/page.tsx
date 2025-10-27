/// Path: src/app/blog/page.tsx
/// Role: Align with Next.js 15 searchParams (Promise) and safely parse values.

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { loadPostBySlug, listAllPostMetas } from "@/data/blog";
import BlogArticle from "@/components/blog/BlogArticle";
import PostList from "@/components/blog/PostList";

export const dynamic = "force-static";
export const revalidate = false;

export default async function BlogPage({
  searchParams,
}: {
  // Next.js 15: searchParams is a Promise at build time
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = (await searchParams) ?? {};

  const getFirst = (v: string | string[] | undefined) =>
    Array.isArray(v) ? v[0] : v;

  const slugFromParams = getFirst(sp.slug) ?? "";
  const langRaw = getFirst(sp.lang);
  const preferredLanguageFromParams =
    langRaw === "en" || langRaw === "es" ? (langRaw as "en" | "es") : undefined;

  const MainContent = async () => {
    if (slugFromParams) {
      const blogPost = await loadPostBySlug(slugFromParams);
      if (!blogPost) {
        const allMetas = await listAllPostMetas();
        return (
          <main className="mx-auto max-w-3xl px-6 pt-24 pb-16">
            <h1 className="text-3xl font-semibold tracking-tight text-gray-100">
              Post not found
            </h1>
            <p className="mt-2 text-sm text-gray-400">
              The requested article does not exist. Pick one from the list
              below.
            </p>
            <div className="mt-8">
              <PostList posts={allMetas} />
            </div>
          </main>
        );
      }
      return (
        <main className="mx-auto max-w-3xl px-6 pt-24 pb-16">
          <BlogArticle
            post={blogPost}
            initialLanguage={preferredLanguageFromParams}
          />
        </main>
      );
    }

    const allMetas = await listAllPostMetas();
    return (
      <main className="mx-auto max-w-3xl px-6 pt-24 pb-16">
        <h1 className="text-3xl font-semibold tracking-tight text-gray-100">
          Blog
        </h1>
        <p className="mt-2 text-sm text-gray-400">
          Choose an article. You can toggle English/Español inside each post.
        </p>
        <div className="mt-8">
          <PostList posts={allMetas} />
        </div>
      </main>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        <MainContent />
      </div>
      <Footer />
    </div>
  );
}
