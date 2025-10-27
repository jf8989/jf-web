/// Path: src/data/blog/types.ts
/// Role: Canonical blog types: bilingual strings, meta, blocks, and full post.

export type BlogLanguage = "en" | "es";

export type LocalizedString = {
  en: string;
  es: string;
};

export interface BlogPostMeta {
  slug: string;
  title: LocalizedString;
  description: LocalizedString;
  publishedAt: string; // ISO string
  tags: string[];
}

export type BlogBlock =
  | {
      type: "h2" | "h3";
      text: LocalizedString;
    }
  | {
      type: "p";
      text: LocalizedString;
    }
  | {
      type: "image";
      src: string; // public path under /public
      alt: LocalizedString;
      caption?: LocalizedString;
      width?: number;
      height?: number;
      priority?: boolean;
    }
  | {
      type: "hr";
    };

export interface BlogPost extends BlogPostMeta {
  blocks: BlogBlock[];
}
