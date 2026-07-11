"use client";

import { useEffect } from "react";

/** Auto-assign a direction so the choreography has variety without any
 *  per-component wiring: headlines/eyebrows sweep from the left, grid
 *  children alternate left/right, everything else rises. An authored
 *  data-rv on the element always wins. */
function assignVariant(el: HTMLElement) {
  if (el.dataset.rv) return;
  if (el.classList.contains("eyebrow") || /^H[1-3]$/.test(el.tagName)) {
    el.dataset.rv = "l";
    return;
  }
  const parent = el.parentElement;
  if (parent && getComputedStyle(parent).display === "grid") {
    const peers = Array.from(parent.children).filter((c) =>
      c.classList.contains("reveal"),
    );
    el.dataset.rv = peers.indexOf(el) % 2 ? "r" : "l";
  }
  // default: no data-rv → rises from below (base .reveal transform)
}

/**
 * Reveal choreography that replays on EVERY visit: .in is added once a
 * fifth of the element is truly in view (NOT at the first pixel — that
 * would finish the entrance before the snap lands), and removed once it
 * has fully left, so each chapter snap re-runs its entrance. Exit is a
 * quick soft dissolve; only the entrance is staggered.
 *
 * The hero's CSS-keyframe entrance (.reveal-now/.focus-now) is replayed
 * by restarting its animation when the hero section re-enters after
 * having left — the initial load path stays pure CSS (LCP-safe).
 */
export default function RevealObserver() {
  useEffect(() => {
    const ENTER = 0.18;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const el = e.target as HTMLElement;
          if (e.intersectionRatio >= ENTER) {
            // stagger siblings 100ms apart — one orchestrated entrance per group
            const parent = el.parentElement;
            if (parent) {
              const peers = Array.from(parent.children).filter((c) =>
                c.classList.contains("reveal"),
              );
              el.style.transitionDelay = `${peers.indexOf(el) * 100}ms`;
            }
            // hidden documents (prerender, background tab, capture) freeze CSS
            // transitions — land on the final state immediately there
            if (document.hidden) {
              el.style.transitionDuration = "0s";
              el.style.transitionDelay = "0s";
            }
            el.classList.add("in");
          } else if (!e.isIntersecting && el.classList.contains("in")) {
            // fully offscreen: re-arm so the next snap replays the entrance
            el.style.transitionDelay = "0ms";
            el.classList.remove("in");
          }
        }
      },
      { threshold: [0, ENTER] },
    );
    document.querySelectorAll<HTMLElement>(".reveal").forEach((el) => {
      // assign the variant with transitions off — the hidden-state transform
      // must JUMP to its directional pose, not glide there
      el.style.transition = "none";
      assignVariant(el);
      void el.offsetWidth;
      el.style.transition = "";
      io.observe(el);
    });

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
