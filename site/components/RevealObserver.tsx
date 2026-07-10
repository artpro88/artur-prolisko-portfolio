"use client";

import { useEffect } from "react";

/** Adds .in to .reveal elements as they enter the viewport (one-shot). */
export default function RevealObserver() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          // stagger siblings 80ms apart — one orchestrated entrance per group
          const parent = el.parentElement;
          if (parent) {
            const peers = Array.from(parent.children).filter((c) =>
              c.classList.contains("reveal"),
            );
            el.style.transitionDelay = `${peers.indexOf(el) * 80}ms`;
          }
          // hidden documents (prerender, background tab, capture) freeze CSS
          // transitions — land on the final state immediately there
          if (document.hidden) {
            el.style.transitionDuration = "0s";
            el.style.transitionDelay = "0s";
          }
          el.classList.add("in");
          io.unobserve(el);
        }
      },
      { threshold: 0.14 },
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
