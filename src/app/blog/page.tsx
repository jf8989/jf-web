/// Path: src/app/blog/page.tsx
/// Role: Ensure footer shows reliably by giving content area flex-1 in the column layout.

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { loadPostBySlug, listAllPostMetas } from "@/data/blog";
import BlogArticle from "@/components/blog/BlogArticle";
import PostList from "@/components/blog/PostList";

export const dynamic = "force-static";
export const revalidate = false;

type BlogPageProps = {
  searchParams?: {
    slug?: string;
    lang?: "en" | "es";
  };
};

export default async function BlogPage(props: BlogPageProps) {
  const slugFromParams = props.searchParams?.slug ?? "";
  const preferredLanguageFromParams =
    (props.searchParams?.lang as "en" | "es" | undefined) ?? undefined;

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
