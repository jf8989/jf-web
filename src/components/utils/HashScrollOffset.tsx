/// Path: src/components/utils/HashScrollOffset.tsx
/// Role: Apply header-aware hash scroll; also nudge observers on mount so in-view sections render immediately.

"use client";

import { useEffect } from "react";

export default function HashScrollOffset() {
  useEffect(() => {
    const applyHashScrollIfNeeded = () => {
      const currentHash = window.location.hash;
      if (!currentHash || currentHash.length < 2) return;

      const targetId = currentHash.slice(1);
      const targetElement = document.getElementById(targetId);
      if (!targetElement) return;

      const headerElement = document.querySelector(
        "header.fixed"
      ) as HTMLElement | null;
      const headerHeight = headerElement?.offsetHeight ?? 60;

      const elementTopRelativeToViewport =
        targetElement.getBoundingClientRect().top;
      const desiredScrollTop =
        elementTopRelativeToViewport + window.pageYOffset - headerHeight - 10;

      window.scrollTo({ top: desiredScrollTop });
    };

    const nudgeObservers = () => {
      const currentScrollTop = window.pageYOffset;
      // Tiny jiggle that users cannot perceive, but IO can.
      window.scrollTo({ top: currentScrollTop + 1 });
      requestAnimationFrame(() => {
        window.scrollTo({ top: currentScrollTop });
        window.dispatchEvent(new Event("scroll"));
      });
    };

    // Do hash scroll (if any), then nudge now and shortly after.
    requestAnimationFrame(() => {
      applyHashScrollIfNeeded();
      nudgeObservers();
    });
    const timeoutId = setTimeout(nudgeObservers, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  return null;
}
