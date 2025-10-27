/// Path: src/components/RouteLoader.tsx
/// Role: Fullscreen route loader (portal) that also nudges IntersectionObserver on hide.

"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

type RouteLoaderProps = {
  visible: boolean;
  label?: string;
};

export default function RouteLoader({
  visible,
  label = "Loading…",
}: RouteLoaderProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  // On hide, wake IntersectionObserver-driven animations without altering UX.
  useEffect(() => {
    if (!isMounted || visible) return;

    const wakeObservers = () => {
      // 1) Tiny, imperceptible scroll jiggle to force IO recalculation
      const currentScrollTop = window.pageYOffset;
      window.scrollTo({ top: currentScrollTop + 1 });
      requestAnimationFrame(() => {
        window.scrollTo({ top: currentScrollTop });
        // 2) Fire common events observers and libs listen to
        window.dispatchEvent(new Event("resize"));
        window.dispatchEvent(new Event("scroll"));
      });
    };

    const frameId = requestAnimationFrame(wakeObservers);
    const timeoutId = setTimeout(wakeObservers, 80);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(timeoutId);
    };
  }, [visible, isMounted]);

  if (!isMounted) return null;

  return createPortal(
    <AnimatePresence>
      {visible && (
        <motion.div
          key="route-loader"
          className="fixed inset-0 z-[9999] grid place-items-center bg-black/55 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="rounded-2xl border border-white/10 bg-gradient-to-b from-gray-900/90 to-gray-900/70 shadow-2xl px-6 py-5"
            role="status"
            aria-live="polite"
            aria-busy="true"
          >
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full border-2 border-white/25 border-t-white animate-spin" />
              <div className="flex flex-col">
                <span className="text-white/90 font-medium">{label}</span>
                <span className="text-xs text-white/60">Please wait…</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
