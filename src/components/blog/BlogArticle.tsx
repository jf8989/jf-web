/// Path: src/components/blog/BlogArticle.tsx
/// Role: Client formatter for blog posts with EN/ES toggle; renders a list of content blocks.

"use client";

import React, { useEffect, useMemo, useState } from "react";
import type {
  BlogPostData,
  ContentBlock,
  MultiLanguageString,
  SupportedLanguageCode,
} from "@/data/blog/types";

type BlogArticleProps = {
  post: BlogPostData;
  initialLanguage?: SupportedLanguageCode;
};

export default function BlogArticle({
  post,
  initialLanguage,
}: BlogArticleProps) {
  const [language, setLanguage] = useState<SupportedLanguageCode>(
    initialLanguage ?? "en"
  );

  // Remember preference locally without global state.
  useEffect(() => {
    const stored = window.localStorage.getItem("blogPreferredLanguage");
    if (!initialLanguage && (stored === "en" || stored === "es")) {
      setLanguage(stored);
    }
  }, [initialLanguage]);

  useEffect(() => {
    window.localStorage.setItem("blogPreferredLanguage", language);
  }, [language]);

  const titleText = useMemo(
    () => resolveText(post.meta.title, language),
    [post.meta.title, language]
  );
  const descriptionText = useMemo(
    () => resolveText(post.meta.description, language),
    [post.meta.description, language]
  );

  return (
    <article className="prose prose-invert max-w-none prose-pre:overflow-x-auto">
      <header className="not-prose mb-6 border-b border-white/10 pb-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold">{titleText}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {descriptionText}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              <time dateTime={post.meta.publishedAt}>
                {new Date(post.meta.publishedAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                })}
              </time>
              {post.meta.tags.length > 0 && (
                <span className="ml-2">
                  {post.meta.tags.map((tag) => `#${tag}`).join(" ")}
                </span>
              )}
            </p>
          </div>

          <LanguageToggle
            currentLanguage={language}
            onChangeLanguage={setLanguage}
          />
        </div>
      </header>

      {post.contentBlocks.map((contentBlock, contentBlockIndex) => (
        <ContentRenderer
          key={`${post.meta.slug}-block-${contentBlockIndex}`}
          block={contentBlock}
          language={language}
        />
      ))}
    </article>
  );
}

function LanguageToggle(props: {
  currentLanguage: SupportedLanguageCode;
  onChangeLanguage: (newLanguage: SupportedLanguageCode) => void;
}) {
  const isEnglish = props.currentLanguage === "en";

  return (
    <div
      role="group"
      aria-label="Language toggle"
      className="inline-flex rounded-xl border border-white/15 p-1"
    >
      <button
        type="button"
        onClick={() => props.onChangeLanguage("en")}
        className={`rounded-lg px-3 py-1 text-sm ${
          isEnglish ? "bg-white text-black" : "text-white hover:bg-white/10"
        }`}
        aria-pressed={isEnglish}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => props.onChangeLanguage("es")}
        className={`rounded-lg px-3 py-1 text-sm ${
          !isEnglish ? "bg-white text-black" : "text-white hover:bg-white/10"
        }`}
        aria-pressed={!isEnglish}
      >
        ES
      </button>
    </div>
  );
}

function ContentRenderer({
  block,
  language,
}: {
  block: ContentBlock;
  language: SupportedLanguageCode;
}) {
  switch (block.type) {
    case "heading": {
      const headingText = resolveText(block.text, language);
      if (block.level === 1) return <h2>{headingText}</h2>;
      if (block.level === 2) return <h3>{headingText}</h3>;
      return <h4>{headingText}</h4>;
    }
    case "paragraph": {
      return <p>{resolveText(block.text, language)}</p>;
    }
    case "list": {
      const items = block.items.map((item) => resolveText(item, language));
      return block.ordered ? (
        <ol className="list-decimal pl-6">
          {items.map((listItemText, listItemIndex) => (
            <li key={`ordered-item-${listItemIndex}`}>{listItemText}</li>
          ))}
        </ol>
      ) : (
        <ul className="list-disc pl-6">
          {items.map((listItemText, listItemIndex) => (
            <li key={`unordered-item-${listItemIndex}`}>{listItemText}</li>
          ))}
        </ul>
      );
    }
    case "quote": {
      return (
        <blockquote>
          <p>{resolveText(block.text, language)}</p>
          {block.attribution && (
            <footer className="mt-1 text-sm text-muted-foreground">
              — {resolveText(block.attribution, language)}
            </footer>
          )}
        </blockquote>
      );
    }
    case "code": {
      return (
        <pre>
          <code>{block.code}</code>
        </pre>
      );
    }
    case "image": {
      const altText = resolveText(block.alt, language);
      const captionText = block.caption && resolveText(block.caption, language);
      return (
        <figure className="my-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={block.src} alt={altText} className="rounded-xl" />
          {captionText && (
            <figcaption className="mt-2 text-center text-sm text-muted-foreground">
              {captionText}
            </figcaption>
          )}
        </figure>
      );
    }
    default:
      return null;
  }
}

function resolveText(
  multiLanguageText: MultiLanguageString,
  language: SupportedLanguageCode
): string {
  return language === "es" ? multiLanguageText.es : multiLanguageText.en;
}
