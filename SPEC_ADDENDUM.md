# Spec Addendum — Reconciliation with Requirements Draft & Design Direction

**Date:** July 10, 2026
**Supersedes conflicting items in:** PROJECT_PLAN.md, README.md, PORTFOLIO_REDESIGN_STRATEGY.md
**Source docs:** `Artur Prolisko Portfolio Redesign - requirements (Draft).docx`, `Design Direction.docx`

This addendum captures everything the two newly attached briefs added or changed versus the original strategy. Where this document conflicts with earlier specs, **this document wins.**

---

## 1. CORRECTION — Theme is Hybrid, NOT Dark-Default

**Previous spec said:** "Dark mode dominant, default to dark mode."
**Corrected:** A **premium hybrid light/dark theme — NOT a fully dark interface.**

> "Use a premium hybrid light/dark theme rather than a fully dark interface. Not fully dark. Not fully light."

**Implications:**
- The site alternates light and dark *chapters* as a deliberate compositional rhythm (e.g., dark hero → light introduction → dark brands → light journey), rather than a single global dark theme with a toggle.
- Light sections use warm white / platinum grounds; dark sections use matte black / deep graphite.
- A user-facing light/dark toggle is **optional and secondary** — the primary experience is the choreographed hybrid, not a mode switch.

**Expanded palette (adds to existing):**
- Matte black, warm white, **soft charcoal**, **deep graphite** (primaries)
- Emerald, gold, soft cyan, platinum, **glass reflections**, subtle neon (accents)
- Rule: **avoid highly saturated gaming colours** — everything refined.

---

## 2. Story Structure — Expand from 10 to 15 Chapters

The brief specifies a 15-chapter narrative. Reconciled structure:

| # | Chapter | Notes / change vs old 10-section plan |
|---|---------|----------------------------------------|
| 1 | Hero | Was #1. Statement + persistent 3D object + scroll cue. |
| 2 | Introduction | **NEW** — short positioning chapter, distinct from hero. |
| 3 | Brands I've Worked With | Was #2. Highest-priority visual moment. |
| 4 | My Journey | **NEW** — narrative/origin (12yo first app) as prose chapter. |
| 5 | Career Timeline | Was #4. Interactive, CV-driven, 1996–2026. |
| 6 | Major Achievements | Was #9, moved earlier. Visual, not buried in paragraphs. |
| 7 | Featured Projects | Was #8. Case studies. |
| 8 | Product Leadership | **NEW** — dedicated leadership/team-impact chapter. |
| 9 | Design Philosophy | Was #7. |
| 10 | Skills | Was part of #10. |
| 11 | Technologies | **NEW** — split out from Skills (tools/stack). |
| 12 | Testimonials | **NEW** — "if appropriate" (needs source content from Artur). |
| 13 | Awards / Recognition | **NEW** — certifications + any recognition. |
| 14 | Personal Side | **NEW** — humanising chapter. |
| 15 | Contact | Was #10. |

> Origin story, leadership, and achievements are now **first-class chapters**, not folded into timeline/impact.

**Open dependencies (content Artur must supply):**
- Testimonials (Ch. 12) — do we have quotes/permission? If not, cut this chapter.
- Personal Side (Ch. 14) — interests/hobbies/photography to include.

---

## 3. Process Gate — Produce 13 Deliverables *Before* Building

The brief is explicit: **"Do not immediately start coding."** Work as an elite agency through these deliverables **in order**:

1. Website audit (detailed findings)
2. CV comparison (everything missing from the site)
3. Competitor research (key insights)
4. Creative strategy (brand direction, positioning, messaging, tone)
5. Story concept (the narrative)
6. Sitemap (full information architecture)
7. User journey (every section described)
8. Visual design system (type, colour, spacing, components, iconography, motion principles, 3D principles)
9. Wireframes (low fidelity)
10. High-fidelity design (detailed screens)
11. Animation plan (scroll, 3D, transitions, micro-interactions)
12. 3D concept (scene structure, objects, lighting, camera, materials, scroll interactions)
13. GitHub project (production-ready, named **Artur Prolisko**, with README/install/deploy docs)

**Status mapping to what's done:**
- #1 Audit — ✅ drafted (expand against full checklist below)
- #2 CV comparison — ✅ done (verify certifications added)
- #3 Competitor research — ✅ done (add named studios below)
- #4–#7 Strategy/Story/Sitemap/Journey — ⏳ Phase 1 deliverables
- #8 Design system — ⏳ Phase 1 (Figma)
- #9–#10 Wireframes → hi-fi — ⏳ Phase 1
- #11–#12 Animation + 3D concept — ⏳ Phase 1
- #13 Build — ⏳ Phase 2+ (gated on sign-off of #1–#12)

---

## 4. Audit — Full Dimension Checklist

The audit must explicitly cover **all** of these (expand the existing audit to hit every one):

UX · UI · branding · typography · colour system · layout · spacing · navigation · storytelling · responsiveness · accessibility · SEO · motion · visual hierarchy · readability · performance · conversion · first impression · trust · professionalism

For each: **what works / what stays / what's redesigned / outdated / weak / missing / opportunity to stand out.**

---

## 5. CV Analysis — Add Missing Dimensions

Original comparison focused on roles/achievements. The brief adds explicit checks for:
- **Certifications** (missing from website — high credibility value):
  - BCS Certificate in Requirements Engineering — QA (2015)
  - Maxymiser Technical Training — maxBADGES-12707655 (2015)
  - UX Fundamentals — QA Ltd
- **Publications** (confirm none / or source)
- **Technologies** (as distinct from skills — feed Chapter 11)
- **Awards** (confirm any industry recognition to feed Chapter 13)

CV remains the **single source of truth**.

---

## 6. Competitor Research — Named Benchmarks to Add

Add these explicitly-named references to COMPETITIVE_RESEARCH.md alongside Flowty:

**Interactive studios / cinematic benchmarks:**
- Apple product pages (scroll-choreographed product storytelling)
- Active Theory · Locomotive · Resn · Fantasy Interactive · Dogstudio · Basic/Dept

**Award galleries to mine for patterns (not copy):**
- Awwwards · CSS Design Awards · FWA

Summarise across these: current trends, interaction patterns, storytelling techniques, motion techniques, layouts, typography, animation, premium effects. **Create something original — do not copy.**

---

## 7. Tech Stack — Additions

Add to the previously documented stack:
- **GSAP + ScrollTrigger** — primary tool for scroll-choreographed timelines and pinned/persistent 3D scroll sync (complements Framer Motion for component-level motion).
- **@react-three/drei** — helpers for R3F (loaders, controls, materials).
- **Spline** — *only if useful* for authoring a specific 3D moment; not a core dependency.
- **Lenis** — confirmed for smooth scroll (already listed).

Full target stack: Next.js · React · TypeScript · Tailwind CSS · Framer Motion · **GSAP** · Three.js · React Three Fiber · **Drei** · Lenis · **Spline (optional)**.

Performance mandates (explicit): lazy loading, 3D asset optimisation, image compression, animation performance, code splitting, GPU acceleration, progressive enhancement.

---

## 8. Positioning — Locked Descriptor Set

The finished portfolio must immediately communicate all nine:

Senior Product Design Leader · UX Strategist · Product Thinker · Digital Innovator · iGaming Specialist · Sportsbook Expert · Luxury Product Designer · Design Systems Expert · Creative Technologist

**Hero one-liner (from Design Direction):**
> "Senior Product Design Leader for iGaming, Sportsbook, Casino & Live Casino."

Note the emphasis blends **product leadership** with **design craft** — keep the "Head of Product" business framing from the CV, but foreground the design-leadership/creative-technologist identity the brief asks for.

---

## 9. 3D Concept — Expanded Requirements

The 3D is called out as "one of the most important requirements." A **persistent scene that evolves with scroll** — objects move, evolve, lighting changes, camera moves, transitions support the narrative. Never gimmicky; always reinforces content; feels physically connected to the page.

**Visual language candidates:** premium casino/poker chips · dice · abstract playing cards · sportsbook odds/data visualisations · glowing geometric structures · luxury metallic objects · crystal/glass elements · abstract particles · elegant floating cards · subtle holographic effects. Avoid clichés.

**3D concept deliverable (#12) must specify:** scene structure · objects · lighting · camera path · materials · per-chapter scroll interactions.

---

## 10. Net Changes to Existing Docs

- **README.md / PROJECT_PLAN.md** — theme corrected to hybrid (not dark-default); sections expanded to 15; GSAP/Drei/Spline added; positioning descriptors added.
- **COMPETITIVE_RESEARCH.md** — append named studios (Active Theory, Locomotive, Resn, Fantasy, Dogstudio, Basic/Dept, Apple) + FWA/CSS Design Awards.
- **PORTFOLIO_REDESIGN_STRATEGY.md** — certifications added to CV-gap list; process gate (13 deliverables) adopted.
- No change to: timeline data, achievement metrics, phased timeline (9–13 weeks), performance targets.
