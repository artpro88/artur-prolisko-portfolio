"use client";

import { useEffect, useState } from "react";

const CHAPTERS = [
  ["hero", "Hero"],
  ["intro", "Introduction"],
  ["brands", "Brands"],
  ["journey", "My Journey"],
  ["timeline", "Timeline"],
  ["achievements", "Achievements"],
  ["work", "Featured Work"],
  ["leadership", "Leadership"],
  ["philosophy", "Philosophy"],
  ["skills", "Skills"],
  ["technologies", "Technologies"],
  ["recognition", "Recognition"],
  ["about", "About"],
  ["contact", "Contact"],
] as const;

/** Desktop-only chapter rail (docs/06 §2) — decorative on mobile per §5a. */
export default function Rail() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { threshold: 0.5 },
    );
    CHAPTERS.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <nav className="rail" aria-label="Chapters">
      {CHAPTERS.map(([id, label]) => (
        <a
          key={id}
          href={`#${id}`}
          className={active === id ? "on" : ""}
          aria-label={label}
          aria-current={active === id ? "true" : undefined}
        />
      ))}
    </nav>
  );
}
