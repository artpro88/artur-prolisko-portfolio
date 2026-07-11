"use client";

import { useEffect } from "react";
import { SPY_THRESHOLDS, sectionDominant, sectionGone } from "@/components/sectionSpy";

/** Split a chapter headline into word masks: each word rises out of its
 *  own overflow-hidden slot — the modern masked-line reveal. Structure-
 *  preserving: styled child elements (e.g. a dimmed second sentence)
 *  keep their markup; only their text nodes are masked. */
function splitHeadline(el: HTMLElement) {
  if (el.dataset.split) return;
  el.dataset.split = "1";
  el.dataset.rv = "m"; // mask mode: the element fades, its words travel
  let wi = 0;
  const process = (node: Node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const frag = document.createDocumentFragment();
      for (const tok of (node.textContent ?? "").split(/(\s+)/)) {
        if (!tok) continue;
        if (/^\s+$/.test(tok)) {
          frag.appendChild(document.createTextNode(" "));
          continue;
        }
        const mask = document.createElement("span");
        mask.className = "rv-wm";
        const inner = document.createElement("i");
        inner.textContent = tok;
        inner.style.setProperty("--wd", String(wi++));
        mask.appendChild(inner);
        frag.appendChild(mask);
      }
      node.parentNode?.replaceChild(frag, node);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      [...node.childNodes].forEach(process);
    }
  };
  [...el.childNodes].forEach(process);
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
          if (sectionDominant(e)) {
            reveals.forEach((el, i) => {
              const d = 100 + Math.min(i, 7) * 110;
              el.style.transitionDelay = `${d}ms`;
              el.style.setProperty("--sd", `${d}ms`);
              // hidden documents (prerender, capture) freeze transitions —
              // land on the final state immediately there
              if (document.hidden) el.classList.add("rv-instant");
              el.classList.add("in");
            });
          } else if (sectionGone(e)) {
            reveals.forEach((el) => {
              if (!el.classList.contains("in")) return;
              el.style.transitionDelay = "0ms";
              el.style.setProperty("--sd", "0ms");
              el.classList.remove("in", "rv-instant");
            });
          }
        }
      },
      { threshold: SPY_THRESHOLDS },
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
