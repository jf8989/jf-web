/// Path: src/components/utils/HashScrollOffset.tsx
/// Role: When Home loads with a hash (e.g., /#workflow), scroll so the section is visible below the fixed header.

"use client";

import { useEffect } from "react";

export default function HashScrollOffset() {
  useEffect(() => {
    const hashValue = window.location.hash;
    if (!hashValue || hashValue.length < 2) return;

    const targetId = hashValue.slice(1);
    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;

    const headerElement = document.querySelector(
      "header.fixed"
    ) as HTMLElement | null;
    const headerHeight = headerElement?.offsetHeight ?? 60;

    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition =
      elementPosition + window.pageYOffset - headerHeight - 10;

    window.scrollTo({ top: offsetPosition });
  }, []);

  return null;
}
