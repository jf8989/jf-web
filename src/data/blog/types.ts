/// Path: src/data/blog/types.ts
/// Role: Shared types for multi-language blog posts and content blocks.

export type SupportedLanguageCode = "en" | "es";

export type MultiLanguageString = {
  en: string;
  es: string;
};

export type HeadingLevel = 1 | 2 | 3;

export type ContentBlock =
  | {
      type: "heading";
      level: HeadingLevel;
      text: MultiLanguageString;
    }
  | {
      type: "paragraph";
      text: MultiLanguageString;
    }
  | {
      type: "list";
      ordered: boolean;
      items: MultiLanguageString[];
    }
  | {
      type: "quote";
      text: MultiLanguageString;
      attribution?: MultiLanguageString;
    }
  | {
      type: "code";
      code: string;
      language?: string;
    }
  | {
      type: "image";
      src: string;
      alt: MultiLanguageString;
      caption?: MultiLanguageString;
    };

export type BlogPostMeta = {
  slug: string;
  title: MultiLanguageString;
  description: MultiLanguageString;
  publishedAt: string; // ISO-8601 string
  tags: string[];
};

export type BlogPostData = {
  meta: BlogPostMeta;
  contentBlocks: ContentBlock[];
};
