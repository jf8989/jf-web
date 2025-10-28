/// Path: src/components/ThemeToggle.tsx
/// Role: Theme toggle with persistence; supports "inline" (header) and "floating" variants

"use client";

import React, { useEffect, useState } from "react";

type ThemeMode = "light" | "dark";
type ThemeToggleProps = {
  variant?: "inline" | "floating";
  className?: string;
};

export default function ThemeToggle({
  variant = "inline",
  className,
}: ThemeToggleProps) {
  const [theme, setTheme] = useState<ThemeMode>("light");

  useEffect(() => {
    try {
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "dark" : "light");
    } catch {}
  }, []);

  const applyTheme = (next: ThemeMode) => {
    const root = document.documentElement;
    if (next === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    root.style.colorScheme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
    setTheme(next);
  };

  const toggle = () => applyTheme(theme === "dark" ? "light" : "dark");

  const isDark = theme === "dark";
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  const baseInline =
    "h-9 w-9 rounded-lg border transition-colors flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60";
  const inlineClasses =
    "bg-black/5 border-black/10 text-gray-800 hover:bg-black/10 dark:bg-white/5 dark:border-white/10 dark:text-gray-100 dark:hover:bg-white/10";
  const baseFloating =
    "fixed right-4 top-4 md:right-6 md:top-5 z-[70] h-10 w-10 rounded-xl border backdrop-blur shadow-sm flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60";
  const floatingClasses =
    "bg-black/5 border-black/10 hover:bg-black/10 dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10";

  const classes =
    variant === "floating"
      ? `${baseFloating} ${floatingClasses} ${className ?? ""}`
      : `${baseInline} ${inlineClasses} ${className ?? ""}`;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isDark}
      title={label}
      className={classes}
    >
      <span className="sr-only">{label}</span>
      {isDark ? (
        // Sun icon
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
          <path
            d="M12 4.5v-2M12 21.5v-2M4.5 12h-2M21.5 12h-2M5.94 5.94l-1.41-1.41M19.47 19.47l-1.41-1.41M5.94 18.06l-1.41 1.41M19.47 4.53l-1.41 1.41"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle
            cx="12"
            cy="12"
            r="4.5"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      ) : (
        // Moon icon
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-white">
          <path
            d="M21 12.79A8.5 8.5 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79Z"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="currentColor"
          />
        </svg>
      )}
    </button>
  );
}
