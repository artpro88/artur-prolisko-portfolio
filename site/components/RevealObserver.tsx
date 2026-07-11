"use client";

import { useEffect } from "react";

/** Split a chapter headline into word masks: each word rises out of its
 *  own overflow-hidden slot — the modern masked-line reveal. */
function splitHeadline(el: HTMLElement) {
  if (el.dataset.split) return;
  el.dataset.split = "1";
  el.dataset.rv = "m"; // mask mode: the element fades, its words travel
  const words = (el.textContent ?? "").trim().split(/\s+/);
  el.textContent = "";
  words.forEach((w, i) => {
    const mask = document.createElement("span");
    mask.className = "rv-wm";
    const inner = document.createElement("i");
    inner.textContent = w;
    inner.style.setProperty("--wd", String(i));
    mask.appendChild(inner);
    el.appendChild(mask);
    if (i < words.length - 1) el.appendChild(document.createTextNode(" "));
  });
}

/** Directional pose per element: eyebrows/headings sweep from the left,
 *  grid children alternate left/right, the rest rises. Authored data-rv
 *  wins; .h-chapter headlines get the word-mask treatment instead. */
function assignVariant(el: HTMLElement) {
  if (el.dataset.rv) return;
  if (el.classList.contains("h-chapter")) {
    splitHeadline(el);
    return;
  }
  if (el.classList.contains("eyebrow") || /^H[1-4]$/.test(el.tagName)) {
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
 * Chapter-orchestrated choreography. Elements are NOT revealed as they
 * individually cross the viewport — the whole cast stays hidden until
 * its chapter is substantially in view (the snap has landed), then
 * performs in one timed cascade: beat of stillness → headline words
 * rise through their masks → cards sweep in from the sides. Once the
 * chapter has left, everything re-arms, so the show replays on every
 * visit, both directions.
 */
export default function RevealObserver() {
  useEffect(() => {
    document.querySelectorAll<HTMLElement>(".reveal").forEach((el) => {
      // pose with transitions off — hidden states jump, never glide
      el.style.transition = "none";
      assignVariant(el);
      void el.offsetWidth;
      el.style.transition = "";
    });

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const reveals = e.target.querySelectorAll<HTMLElement>(".reveal");
          if (e.intersectionRatio >= 0.45) {
            reveals.forEach((el, i) => {
              const d = 100 + Math.min(i, 7) * 110;
              el.style.transitionDelay = `${d}ms`;
              el.style.setProperty("--sd", `${d}ms`);
              // hidden documents (prerender, capture) freeze transitions —
              // land on the final state immediately there
              if (document.hidden) el.classList.add("rv-instant");
              el.classList.add("in");
            });
          } else if (e.intersectionRatio <= 0.15) {
            reveals.forEach((el) => {
              if (!el.classList.contains("in")) return;
              el.style.transitionDelay = "0ms";
              el.style.setProperty("--sd", "0ms");
              el.classList.remove("in", "rv-instant");
            });
          }
        }
      },
      { threshold: [0.15, 0.45] },
    );
    document
      .querySelectorAll("main section[id], .tl-role")
      .forEach((sec) => io.observe(sec));

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
