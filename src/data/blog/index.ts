/// Path: src/data/blog/index.ts
/// Role: Simple in-memory registry with loader helpers; registers the new post.

import type { BlogPost, BlogPostMeta } from "@/data/blog/types";
import laIaQueNadieUsa from "@/data/blog/posts/la-ia-que-nadie-usa";

// If you already have more posts, import and add them here.
const registry: BlogPost[] = [laIaQueNadieUsa];

export async function loadPostBySlug(slug: string): Promise<BlogPost | null> {
  const found = registry.find((p) => p.slug === slug);
  return found ?? null;
}

export async function listAllPostMetas(): Promise<BlogPostMeta[]> {
  return registry
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      description: p.description,
      publishedAt: p.publishedAt,
      tags: p.tags,
    }))
    .sort((a, b) => (a.publishedAt > b.publishedAt ? -1 : 1));
}
