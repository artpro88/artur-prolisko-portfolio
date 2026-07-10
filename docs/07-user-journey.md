# Deliverable #7 — User Journey

**Project:** Artur Prolisko Portfolio v2
**Phase:** 1 (Strategy)
**Date:** July 10, 2026

Chapter-by-chapter walkthrough of the scroll experience. Each entry defines: **goal · content · layout · 3D state · motion · ground · CTA/exit.** Grounds alternate to signal chapter changes (the "chapter clock"). Full motion/3D specs in `11-animation-plan.md` and `12-3d-concept.md`.

---

### Chapter 1 · Hero `#hero` — Dark
- **Goal:** Establish level and positioning in one glance.
- **Content:** Headline *"Senior Product Design Leader for iGaming, Sportsbook, Casino & Live Casino."* · one-line support *"14 years turning platform complexity into effortless products."* · scroll cue.
- **Layout:** Headline lower-left third; 3D form occupies right/center depth; generous negative space.
- **3D:** Single luminous chip/crystal form, slow idle rotation, soft key light.
- **Motion:** Staggered headline reveal (words rise + fade in); 3D fades up from dark; scroll cue pulses once.
- **Exit/CTA:** Scroll cue → Chapter 2. Nav "Contact" always available.

### Chapter 2 · Introduction `#intro` — Light
- **Goal:** Convert poise into credibility.
- **Content:** 2–3 sentence positioning paragraph; the nine descriptors woven in (not listed). Small stat trio optional: *14+ yrs · Tier 1 · EU/CA/US.*
- **Layout:** Editorial single column, wide margins; large body type.
- **3D:** Form refines; facets catch light (first ground switch = 3D relights to suit light scene).
- **Motion:** Text reveals line-by-line on scroll; background eases dark→light.
- **Exit:** Flows into Brands.

### Chapter 3 · Brands `#brands` — Dark **(priority moment)**
- **Goal:** Prove trust at scale — "Tier 1 only."
- **Content:** Brand cards for Fitzdares, SG Digital/Scientific Games, Kindred, Unibet, LeoVegas, Storspiller. **Each card shows the real logo (on a pearl chip) + role + years + one-line impact — all visible by default. No hover-reveal** (mobile has no hover). Fitzdares → letter-spaced wordmark (no logo asset).
- **Layout:** Premium card grid that assembles on scroll; generous spacing.
- **3D:** Hero chip multiplies into a slow orbit of casino tokens behind the cards.
- **Motion:** Scroll-triggered card reveals (staggered); hover only nudges elevation (enhancement, never gating info).
- **Exit:** Chips compress → transition to Journey.

### Chapter 4 · My Journey `#journey` — Light
- **Goal:** Humanise; plant the "range that compounds" idea.
- **Content:** Short narrative — *"It started at twelve, with a receipt printer."* The SelfHome origin → the instinct that scaled.
- **Layout:** Editorial; a single polished archival-style visual or stylised graphic; pull-quote.
- **3D:** Tokens compress toward one point, then release forward (origin → momentum).
- **Motion:** Parallax on the visual; pull-quote scales in.
- **Exit:** Momentum carries into the timeline.

### Chapter 5 · Career Timeline `#timeline` — Dark **(signature sequence — rebuilt Jul 2026)**
- **Goal:** Show the climb, most recent first — and make it feel like a *real* timeline, not a generic AI list.
- **Structure:** **Reverse chronological — latest role first.** **Each of the 7 roles is its own full-height section** (Fitzdares 2023–now → SG Snr UX Lead → SG UI/UX Architect → LeoVegas 2018 → Kindred UX Architect → Kindred/Unibet UX Lead → Unibet CRM 2011). Fitzdares' section carries the **2025 Gibraltar relocation** as a milestone bullet.
- **Content per role (all visible, no hover):** the **real company logo** on a pearl chip (+ optional brand tint), year range, role title, 1–2 line summary, milestone bullets, and an altitude tag (craft → systems → product → business).
- **The line fills as you scroll:** a vertical rail on the left **fills top→down with a champagne→bordeaux gradient** tracking scroll progress through the positions; each role's node ignites champagne when it becomes the active section. Inactive role content rests at ~35% opacity and resolves to full as it centers.
- **Layout:** Same vertical structure on desktop and mobile (no fragile horizontal scrub); logos on pearl chips so any logo colour reads on the dark ground.
- **3D:** Casino chips advance along a receding spine, one per role, synced to the active section.
- **Exit:** Oldest role (Unibet 2011) → hands off to Achievements.

### Chapter 6 · Major Achievements `#achievements` — Light (igniting accents)
- **Goal:** Make impact undeniable and *visual*.
- **Content:** Metric tiles: **250% ROI** · **3 launches** (Canada 2023 · UK replatform 2023 · Fitzdares Gibraltar 2025) · **Gibraltar setup** · **UKGC migration** · **GGR growth**. Each with one-line context. No paragraphs.
- **Layout:** Asymmetric grid of large stat tiles; the two biggest metrics dominate.
- **3D:** Select chips ignite (champagne/bordeaux) and rise above the field.
- **Motion:** Numbers count up on enter; tiles stagger in; accent glow on the two hero metrics.
- **Exit:** Into Featured Projects.

### Chapter 7 · Featured Projects `#work` — Dark
- **Goal:** Provide substance behind the metrics.
- **Content:** 3–5 project cards: **Betslip redesign · B2B Design System · Canada launch · UK replatform** (+ optional). Card = cover image, title, one-line outcome. Linked ones open `/work/[slug]`.
- **Layout:** Large staggered cards; reused-but-retouched imagery (color-graded to system).
- **3D:** Tokens flatten into card-planes holding the work (recedes behind UI).
- **Motion:** Cards reveal on scroll; hover = lift + cover parallax + "View case study"; click → shared-element transition into detail route.
- **Exit:** Into Leadership.

### Chapter 8 · Product Leadership `#leadership` — Light
- **Goal:** Signal scope and seniority.
- **Content:** Leadership dimensions — cross-functional teams (design/eng/product/ops), board & C-level alignment, roadmap ownership, UAT, IT & infrastructure oversight, 3rd-party integrations. Framed as responsibilities owned, not tasks done.
- **Layout:** Two-column: statement left, structured capability lattice right.
- **3D:** Tokens organise into a clean structured lattice (systems & teams).
- **Motion:** Lattice assembles node-by-node on scroll; each responsibility line reveals in time with a node.
- **Exit:** Into Philosophy.

### Chapter 9 · Design Philosophy `#philosophy` — Dark
- **Goal:** Give a memorable POV.
- **Content:** One core line — *"Make complex systems feel effortless. Subtract until only the essential remains."* — plus 3 short principles (Research first · Systems over screens · Restraint as luxury).
- **Layout:** Big-type statement; principles as a quiet triad beneath.
- **3D:** Lattice simplifies to essential geometry (taste = subtraction).
- **Motion:** Statement scales in; principles fade sequentially.
- **Exit:** Into Skills.

### Chapter 10 · Skills `#skills` — Light
- **Goal:** Organised capability map.
- **Content:** Grouped: **Product** (strategy, roadmap, delivery, UAT) · **Design** (UX, UI, design systems, prototyping) · **Research** (competitive analysis, user research, analytics) · **Leadership** (cross-functional, Agile/Scrum, stakeholder mgmt).
- **Layout:** 3–4 labelled clusters; generous space, no skill bars/percentages (they read junior).
- **3D:** Lattice nodes label softly.
- **Motion:** Clusters reveal on scroll; subtle hover emphasis.
- **Exit:** Into Technologies (paired spread).

### Chapter 11 · Technologies `#technologies` — Light
- **Goal:** Show modern, hands-on fluency.
- **Content:** Tools & platforms — Figma, design-system tooling, CMS, analytics (GA/Adobe), HTML/CSS/JS literacy, prototyping tools. Presented as a refined logo/label set (retouched from old site's tool logos).
- **Layout:** Monochrome tool marks in a calm grid; continues Ch.10's light ground as one capability "spread."
- **3D:** Minimal; scene rests before the human act.
- **Motion:** Gentle reveal; hover tint.
- **Exit:** Into Act IV (Recognition).

> **Testimonials chapter — CUT** (Artur, Jul 2026). Narrative is 14 chapters. Social proof carried by Brands + named launches.

### Chapter 12 · Awards / Recognition `#recognition` — Light
- **Goal:** Add rigor/credibility.
- **Content:** Certifications — **BCS Requirements Engineering (QA, 2015) · Maxymiser Technical Training (2015) · UX Fundamentals (QA Ltd)** — plus any awards/recognition. Credential IDs where available.
- **Layout:** Clean credential rows/badges; issuer + year.
- **3D:** Minimal, steady.
- **Motion:** Rows reveal on scroll.
- **Exit:** Into About.

### Chapter 13 · About `#about` — Light/warm *(content from CV)*
- **Goal:** Humanise; show range that compounds.
- **Content (drafted from CV):** first-person — first Windows app at 12 in Estonia (SelfHome, UI + front/back end + printed receipts); the instinct *"make complex systems feel effortless"*; IATI IT degree; 14 years across Tier 1 operators (EU/CA/US); **2025 relocation by Fitzdares to Gibraltar to set up its operation under a Gibraltarian licence.**
- **Layout:** Warm editorial; two-column statement + narrative; optional portrait (if Artur supplies one).
- **3D:** Warmest light of the story; scene at its calmest.
- **Motion:** Soft, unhurried reveals.
- **Exit:** Into Contact.

### Chapter 14 · Contact `#contact` — Dark (resolving)
- **Goal:** Convert interest into a conversation.
- **Content:** Invitation line — *"Let's build something at Tier 1 standard."* · email (`pokacity@gmail.com`) · LinkedIn · optional calendar link · CV download. Light contact form optional.
- **Layout:** Centered, spacious; the 3D form resolves to a single stable, inviting shape behind.
- **3D:** Everything resolves to one calm form — arrival / open door.
- **Motion:** Final settle of the scene; CTA button premium hover; form fields focus states.
- **Exit:** Footer: monogram, quick links, credits, back-to-top.

---

## Cross-journey rules

- **Chapter clock:** every ground switch (dark↔light) = "new idea." Never two identical-ground chapters back-to-back for the heavy beats.
- **One idea per screen.** If a chapter needs two ideas, it's two chapters or a detail route.
- **The 3D never resets** — it *transforms* between states, preserving continuity (the widening lens).
- **Reduced-motion path:** snap → normal scroll; 3D → a static, tasteful still per chapter; count-ups → final values; all content fully reachable.
- **Mobile:** horizontal timeline → vertical; chapter rail → progress bar; 3D → lighter particle count or static hero still; tap replaces hover reveals.
