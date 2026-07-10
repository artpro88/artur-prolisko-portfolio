"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const DARK = "#0B0C10"; // obsidian
const LIGHT = "#EDEAE3"; // alabaster

/**
 * Chapter ground cross-dissolve (docs/11 §2): instead of hard-cut section
 * backgrounds, the body carries the ground and eases dark↔light as each
 * chapter becomes active. Section text colours stay bound to their own
 * ground-* classes, so contrast rules are untouched — only the backdrop
 * dissolves. Sections keep their own backgrounds under reduced motion or
 * without JS (html.has-groundfx gates the transparent override).
 */
export default function GroundFX() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    document.documentElement.classList.add("has-groundfx");
    document.body.style.backgroundColor = DARK;

    const sections = document.querySelectorAll<HTMLElement>("main section[id], .tl-role");
    const triggers: ScrollTrigger[] = [];

    sections.forEach((el) => {
      const light =
        el.classList.contains("ground-light") || el.classList.contains("ground-light-alt");
      triggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: "top 60%",
          end: "bottom 60%",
          onToggle: (self) => {
            if (!self.isActive) return;
            gsap.to(document.body, {
              backgroundColor: light ? LIGHT : DARK,
              duration: 0.55,
              ease: "power2.out",
              overwrite: "auto",
            });
          },
        }),
      );
    });

    return () => {
      triggers.forEach((t) => t.kill());
      document.documentElement.classList.remove("has-groundfx");
      document.body.style.backgroundColor = "";
    };
  }, []);

  return null;
}
