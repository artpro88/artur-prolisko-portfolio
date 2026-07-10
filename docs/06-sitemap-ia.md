# Deliverable #6 — Sitemap & Information Architecture

**Project:** Artur Prolisko Portfolio v2
**Phase:** 1 (Strategy)
**Date:** July 10, 2026

---

## 1. Site model

This is a **single-page, scroll-driven narrative** — not a multi-page site. All 15 chapters live on one route (`/`) as full-height sections with scroll-snap. Deep content (long case studies) lives on secondary routes so the main story stays lean.

```
/                         → The story (15 chapters, one continuous scroll)
├── #hero                 1. Hero
├── #intro                2. Introduction
├── #brands               3. Brands I've Worked With
├── #journey              4. My Journey
├── #timeline             5. Career Timeline
├── #achievements         6. Major Achievements
├── #work                 7. Featured Projects   ──┐ (cards link to detail routes)
├── #leadership           8. Product Leadership    │
├── #philosophy           9. Design Philosophy     │
├── #skills               10. Skills               │
├── #technologies         11. Technologies         │
├── #recognition          12. Awards / Recognition │
├── #about                13. About                │
└── #contact              14. Contact              │
                          (Testimonials — CUT per Artur)
                                                   │
/work/[slug]              Case-study detail pages ◀┘ (progressive disclosure)
├── /work/betslip-redesign
├── /work/b2b-design-system
├── /work/canada-launch
└── /work/uk-replatform

/cv                       → CV (PDF download + lightweight HTML view)
/404                      → On-brand not-found
```

**Rationale:** The story must stay uncluttered (Flowty-style restraint). Case studies are the one place a motivated visitor wants *depth* — so they get their own routes, keeping Chapter 7 a gallery, not a wall of text. Everything else is inline.

---

## 2. Navigation model

### Primary nav (persistent, minimal)
A slim top bar that **fades to a translucent chip on scroll**. Contents:
- **Left:** Monogram "AP" (returns to hero).
- **Center (desktop only):** 4 anchor links — the *narrative act* jumps, not all 15 chapters: **Work · Journey · Leadership · Contact.**
- **Right:** Theme-rhythm indicator + "Contact" button.

> We deliberately do **not** expose all 15 anchors in the nav — that would break the "story, not menu" feeling. Four wayfinding jumps are enough.

### Scroll progress / chapter rail (right edge, desktop)
A vertical progress rail with 15 nodes; the active chapter node expands to show its title on hover. Doubles as a "you are here" device and a jump menu. Hidden on mobile (replaced by progress bar under the nav).

### Mobile nav
- Hamburger → full-screen overlay listing the 4 act jumps + Contact + CV.
- Thin scroll-progress bar beneath the top bar.

### Scroll cue
Hero shows an elegant animated cue (Ch.1 only). Disappears after first scroll.

---

## 3. Reading order & acts

The 15 chapters group into **four narrative acts** (mirrors the nav's 4 jumps):

| Act | Chapters | Anchor jump | Purpose |
|-----|----------|-------------|---------|
| **I — Who** | 1 Hero, 2 Intro, 3 Brands | *(top)* | Establish credibility & scale |
| **II — Journey** | 4 My Journey, 5 Timeline, 6 Achievements | `#journey` | The climb + proof of impact |
| **III — Depth** | 7 Work, 8 Leadership, 9 Philosophy, 10 Skills, 11 Tech | `#work` / `#leadership` | Substance, scope, POV, capability |
| **IV — Human & Close** | 12 Recognition, 13 About, 14 Contact | `#contact` | Credibility, humanity, invitation |

---

## 4. Content model (data schemas)

All content is data-driven so the timeline/achievements stay easy to update. Stored as typed data in `/content` (or a headless CMS later).

### `timeline.ts`
```ts
type TimelineEntry = {
  id: string;
  start: string;          // ISO "2023-02"
  end: string | "present";
  role: string;           // "Head of Product"
  org: string;            // "Fitzdares"
  orgType: "operator" | "supplier" | "other";
  altitude: "craft" | "systems" | "product" | "business";
  summary: string;        // 1–2 sentences
  milestones: string[];   // bullet highlights
  brandSlug?: string;     // links to brands[]
};
```

### `achievements.ts`
```ts
type Achievement = {
  id: string;
  metric?: string;        // "250%", "2", "14+"
  label: string;          // "ROI across 19 change requests"
  context: string;        // where/when
  category: "growth" | "launch" | "leadership" | "systems" | "infra";
  featured: boolean;      // hero-level?
};
```

### `brands.ts`
```ts
type Brand = {
  slug: string;
  name: string;
  logoMono: string;       // monochrome asset path
  role: string;           // "Head of Product"
  years: string;          // "2023–present"
  impact: string;         // hover reveal, one line
  tier1: boolean;
};
```

### `work.ts`
```ts
type Project = {
  slug: string;
  title: string;
  category: "product" | "design-system" | "launch" | "research";
  cover: string;
  problem: string;
  approach: string;
  outcome: string;        // metric-led
  images: string[];
  hasDetailPage: boolean; // → /work/[slug]
};
```

### `recognition.ts`
```ts
type Recognition = {
  id: string;
  kind: "certification" | "award" | "publication";
  title: string;          // "BCS Certificate in Requirements Engineering"
  issuer: string;         // "QA"
  year: string;           // "2015"
  credentialId?: string;  // "maxBADGES-12707655"
};
```

---

## 5. Canonical content (from CV — source of truth)

### Timeline entries (confirmed by Artur, Jul 2026)
1. **2011–2013** · CRM, Kindred Group (Unibet) · *business/craft*
2. **2013–2016** · UX Interface & Production Manager Lead, Kindred/Unibet · *craft*
3. **2016–2018** · UX Architect, Kindred Group · *systems*
4. **2018 (Jan–Jul)** · UX/UI Designer, **LeoVegas** · *systems* — ✅ confirmed (Jan–Jul 2018)
5. **2018–2021** · UI Designer / UX Architect, SG Digital (Scientific Gaming) · *systems*
6. **2021–2023** · Senior UX Lead, SG Digital · *product/systems*
7. **2023–2025** · Head of Product, Fitzdares · *business/product*
8. **2025–present** · **Founder — new iGaming venture (Gibraltar licence)** · *business/founder* — ⚠ *venture name & exact title to confirm*

> **Positioning shift:** As of Aug 2025 Artur is a **founder**, not an operator employee — setting up a new business and platform under a Gibraltarian licence. The narrative now arcs *operator leadership → founder*. Confirm whether Fitzdares (2023–2025) ended cleanly or overlaps.

Plus origin markers (pre-career, shown in Ch.4 My Journey, not the main timeline):
- **1996** · First Windows app "SelfHome" (age 12)
- **2005** · Apron Coordinator/Supervisor, Tallinn Airport
- **2008–2011** · BA Information Technology, IATI (Estonia) — ⚠ *website showed "2004"; CV says 2008–2011. Use CV.*

### Featured achievements (Ch.6) — hero metrics: **250% ROI** + **3 launches**
- **250%** ROI across **19** change requests (Fitzdares)
- **3** market launches — Sportsbook & Casino, Canada (2023) + UK replatform (2023) + **new platform under Gibraltar licence (2025)**
- Founded a new iGaming business & platform, Gibraltar (2025)
- Canada relaunch on new platform (2024); UK tech-provider migration (UKGC)
- GGR growth; cloud infrastructure migration
- Kindred: biggest growth among 10 emerging markets (2012)

### Brands (Ch.3)
Fitzdares · SG Digital / Scientific Gaming · Kindred Group · Unibet · LeoVegas · Storspiller · Photojet.

### Recognition (Ch.13)
- BCS Certificate in Requirements Engineering — QA (2015)
- Maxymiser Technical Training — `maxBADGES-12707655` (2015)
- UX Fundamentals — QA Ltd

> **⚠ Open verification items** are consolidated in `PROJECT_PLAN.md` risks and must be confirmed by Artur before build sign-off.

---

## 6. SEO / metadata IA

| Element | Value |
|---------|-------|
| `<title>` | Artur Prolisko — Senior Product Design Leader, iGaming |
| Meta description | Product & design leader with 14+ years across Tier 1 sportsbook, casino & live casino — launches, migrations, and design systems. |
| OG image | Dark hero still with headline + 3D form (1200×630) |
| Schema.org | `Person` + `ProfilePage`; `hasCredential` for certifications; `alumniOf` IATI |
| Canonical | `https://pokacity.com/` (pending domain decision) |
| Sitemap | `/`, `/work/*`, `/cv` |

Each `/work/[slug]` gets its own title/description/OG for shareable case studies.

---

## 7. Accessibility IA

- Semantic landmark per chapter: `<section aria-labelledby="…">` with a real (optionally visually-hidden) heading, so the 15 chapters form a coherent screen-reader outline **even though the visual design is sparse**.
- Scroll-snap must not trap keyboard users: full keyboard nav, skip-link to `#contact`, and a "reduce motion" path that disables snap + 3D scroll-sync (respects `prefers-reduced-motion`).
- The chapter rail nodes are real `<a>` anchors with labels.
