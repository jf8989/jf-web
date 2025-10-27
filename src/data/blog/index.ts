/// Path: src/data/blog/index.ts
/// Role: Registry of posts and helpers to load by slug or list all metas.

import type { BlogPostData, BlogPostMeta } from "./types";

// Add your posts here. Each entry loads a module exporting { blogPost }.
const blogPostRegistry: Record<
  string,
  () => Promise<{ blogPost: BlogPostData }>
> = {
  "hello-world": () => import("./posts/hello-world"),
};

export async function loadPostBySlug(
  slug: string
): Promise<BlogPostData | null> {
  const loader = blogPostRegistry[slug];
  if (!loader) return null;
  const moduleLoaded = await loader();
  return moduleLoaded.blogPost;
}

export async function listAllPostMetas(): Promise<BlogPostMeta[]> {
  const moduleLoaders = Object.values(blogPostRegistry);
  const modules = await Promise.all(moduleLoaders.map((load) => load()));
  const metas = modules.map((moduleLoaded) => moduleLoaded.blogPost.meta);
  // Newest first.
  return metas.sort(
    (first, second) =>
      new Date(second.publishedAt).getTime() -
      new Date(first.publishedAt).getTime()
  );
}

export type { BlogPostData, BlogPostMeta } from "./types";
