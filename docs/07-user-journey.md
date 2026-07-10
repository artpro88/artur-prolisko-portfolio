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
- **Content:** 7 monochrome logos (Fitzdares, SG Digital/Scientific Gaming, Kindred, Unibet, LeoVegas, Storspiller, Photojet). Hover/tap reveals role + one-line impact.
- **Layout:** Slow horizontal marquee OR grid that assembles on scroll; large spacing.
- **3D:** Hero form multiplies into a slow orbit of monochrome tokens behind/around logos.
- **Motion:** Scroll-triggered logo reveals (mask-up), subtle parallax; hover lifts a logo to full white + shows impact line.
- **Exit:** Tokens compress → transition to Journey.

### Chapter 4 · My Journey `#journey` — Light
- **Goal:** Humanise; plant the "range that compounds" idea.
- **Content:** Short narrative — *"It started at twelve, with a receipt printer."* The SelfHome origin → the instinct that scaled.
- **Layout:** Editorial; a single polished archival-style visual or stylised graphic; pull-quote.
- **3D:** Tokens compress toward one point, then release forward (origin → momentum).
- **Motion:** Parallax on the visual; pull-quote scales in.
- **Exit:** Momentum carries into the timeline.

### Chapter 5 · Career Timeline `#timeline` — Dark **(key interactive)**
- **Goal:** Show the climb: craft → systems → product → business.
- **Content:** 7 roles (2011→present) on an interactive track; each node: year, role, org, 1–2 line summary, milestone bullets. Altitude encoded by position/label.
- **Layout:** Horizontal scroll-linked track on desktop (moves as you scroll vertically); vertical stacked cards on mobile.
- **3D:** Tokens arrange along a receding spine/path that mirrors the timeline direction.
- **Motion:** Active node scales & brightens as it enters center; connecting line draws; 3D spine advances in lockstep (GSAP ScrollTrigger scrub).
- **Exit:** Latest role (Fitzdares) → hands off to Achievements.

### Chapter 6 · Major Achievements `#achievements` — Light (igniting accents)
- **Goal:** Make impact undeniable and *visual*.
- **Content:** Metric tiles: **250% ROI** · **2 launches** · **GGR growth** · **cloud migration** · **10-market growth**. Each with one-line context. No paragraphs.
- **Layout:** Asymmetric grid of large stat tiles; the two biggest metrics dominate.
- **3D:** Select tokens ignite (emerald/gold) and rise above the field.
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
- **Exit:** Into Act IV (Testimonials/Recognition).

### Chapter 12 · Testimonials `#testimonials` — Dark *(conditional)*
- **Goal:** Third-party validation.
- **Content:** 2–4 quotes with name, title, company. *If no content: chapter removed.*
- **Layout:** One large quote at a time (carousel) or a quiet stacked pair.
- **3D:** Warm, calmer light; sparse tokens.
- **Motion:** Quote cross-fades; attribution slides.
- **Exit:** Into Recognition.

### Chapter 13 · Awards / Recognition `#recognition` — Light
- **Goal:** Add rigor/credibility.
- **Content:** Certifications — **BCS Requirements Engineering (QA, 2015) · Maxymiser Technical Training (2015) · UX Fundamentals (QA Ltd)** — plus any awards/recognition. Credential IDs where available.
- **Layout:** Clean credential rows/badges; issuer + year.
- **3D:** Minimal, steady.
- **Motion:** Rows reveal on scroll.
- **Exit:** Into Personal (or Contact if Personal is cut).

### Chapter 14 · Personal Side `#personal` — Light/warm *(conditional/needs content)*
- **Goal:** Likability; the human behind the platform.
- **Content:** TBD by Artur — interests, photography, causes, a portrait. *If not provided: chapter removed.*
- **Layout:** Warm editorial; portrait + short first-person lines.
- **3D:** Warmest light of the story; scene at its calmest.
- **Motion:** Soft, unhurried reveals.
- **Exit:** Into Contact.

### Chapter 15 · Contact `#contact` — Dark (resolving)
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
