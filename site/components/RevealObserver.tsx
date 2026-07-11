"use client";

import { useEffect } from "react";

/**
 * Reveal choreography that replays on EVERY visit, not just the first:
 * .in is added as a .reveal enters and removed once it has fully left,
 * so each chapter snap re-runs its entrance. Exit is instant (no delay)
 * — only the entrance is staggered.
 *
 * The hero's CSS-keyframe entrance (.reveal-now/.focus-now) is replayed
 * by restarting its animation when the hero section re-enters after
 * having left — the initial load path stays pure CSS (LCP-safe).
 */
export default function RevealObserver() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const el = e.target as HTMLElement;
          if (e.isIntersecting) {
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
          } else if (e.intersectionRatio === 0 && el.classList.contains("in")) {
            // fully offscreen: re-arm silently so the next snap replays it
            el.style.transitionDelay = "0ms";
            el.classList.remove("in");
          }
        }
      },
      { threshold: [0, 0.14] },
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

    // hero entrance replay on re-entry (skip the initial mount — CSS played it)
    const hero = document.getElementById("hero");
    let heroLeft = false;
    const heroIo = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) {
            heroLeft = true;
            continue;
          }
          if (!heroLeft || document.hidden) continue;
          hero!
            .querySelectorAll<HTMLElement>(".reveal-now, .focus-now")
            .forEach((el) => {
              el.style.animation = "none";
              void el.offsetWidth; // reflow — restart the keyframes
              el.style.animation = "";
            });
        }
      },
      { threshold: 0.3 },
    );
    if (hero) heroIo.observe(hero);

    return () => {
      io.disconnect();
      heroIo.disconnect();
    };
  }, []);

  return null;
}
