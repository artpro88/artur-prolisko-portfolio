# Asset Inventory — Reused from pokacity.com

Assets pulled from the current site to **reuse and retouch** into the new luxury design (per Artur's brief: "reuse images from the current website, polished and adapted"). All must be colour-graded toward the palette (`08-visual-design-system.md §2`) and framed in dark device/cards — never dropped in raw with their old yellow/white backgrounds.

## Company logos (`/wp-content/uploads/2019/10/`)
| File | Brand | Use | Notes |
|------|-------|-----|-------|
| `SG.png` | SG Digital / Scientific Games | Brands + Timeline (2 roles) | 100×48, light logo |
| `Unibet.png` | Unibet (Kindred) | Brands + Timeline (2 roles) | 135×48 |
| `Kindred.png` | Kindred Group | Brands + Timeline | 225×48 |
| `leovegas.png` | LeoVegas | Brands + Timeline | 197×48 |
| `Storspiller.png` | Storspiller | Brands | 210×48 |
| `Photojet.png` | Photojet | (optional / early side project) | 245×48 |
| — | **Fitzdares** | Brands + Timeline (current role) | **No asset — need real logo.** Placeholder: letter-spaced wordmark. |

> All logos are rendered on a **pearl chip** so colour/contrast reads on any ground. Present **monochrome-friendly**; production may recreate as clean SVG.

## Product screenshots (`/wp-content/uploads/2020/03/`)
| File | Product | Chapter | Dimensions |
|------|---------|---------|------------|
| `Betslip-takeoverv4.png` | Sportsbook betslip — singles/multiples/teaser/bet-builder | Featured Work | 2794×2000 |
| `Freebets-Portfolio-2.png` | Freebets & boosts confirmation flow | Featured Work | 1397×1000 |
| `Cashout-takeover.png` | Cash out (auto & partial) | Featured Work | 2794×2000 |
| `Search-takeover.png` | Global search + in-play + live odds | Featured Work | 2794×2000 |

> These are genuine SG Digital / Fitzdares **sportsbook** UIs — the strongest story material on the site. Retouch: crop old yellow/white grounds into framed dark cards, unify to palette, add soft platinum edge + shadow. In the concept they are inlined as data-URIs (artifact CSP blocks external hosts); the production Next.js build loads them from `/public` (optimised via `next/image`).

## Not reused
- `coming-soon-2.png` placeholders — dropped (replaced with real content).
- External skill/tool logos (Sketch, XD, Axure, etc.) — recreate as clean monochrome marks for the **Technologies** chapter rather than hotlinking.

## Production TODO
- Obtain **Fitzdares** logo (+ Gibraltar entity treatment if distinct).
- Source higher-res or re-exported screenshots if available; otherwise upscale/retouch the above.
- Confirm rights to display each operator logo (standard portfolio use).
