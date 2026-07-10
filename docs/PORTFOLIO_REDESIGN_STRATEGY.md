# Artur Prolisko Portfolio Redesign Strategy

**Date:** July 10, 2026  
**Project:** Artur Prolisko Portfolio v2  
**Status:** Strategy Phase

---

## EXECUTIVE SUMMARY

Your portfolio is a compelling personal brand site for a senior product leader with 14+ years of iGaming expertise. The current site (built on Foundation framework) is functional but feels dated (2019 era). The redesign transforms it into an award-worthy, story-driven experience with:

- **Immersive scroll-based narrative** (inspired by Flowty.co)
- **3D animated objects** tracking scroll progress
- **Luxury dark/light hybrid theme** reflecting iGaming aesthetic
- **Complete timeline update** (currently 2018 endpoint)
- **Brand prominence** (current: 6 logos; align with CV achievements)
- **Leadership narrative** highlighting 14+ years of impact

---

## CURRENT STATE ANALYSIS

### Website (pokacity.com)
**Strengths:**
- ✅ Clear brand logos prominently displayed
- ✅ Timeline structure effectively shows career progression
- ✅ Well-organized sections (Experience, Work, Skills, Contact)
- ✅ Portfolio work showcases concrete deliverables

**Weaknesses:**
- ❌ **Outdated tech stack** (Foundation 6.4.3 from 2017)
- ❌ **Static design** (no smooth scroll interactions, no 3D elements)
- ❌ **Incomplete timeline** (ends at 2018 as "ongoing work")
- ❌ **Missing career progression** (2023-2024 work not shown)
- ❌ **Missing leadership focus** (current title: "UX/UI Designer" vs. actual: "Head of Product")
- ❌ **Placeholder content** ("coming soon" for Design System, Betslip, etc.)
- ❌ **Generic color palette** (yellow/blue/white from 2019)
- ❌ **No 3D elements** or modern interactions
- ❌ **Poor hierarchy** for key achievements
- ❌ **No hybrid dark/light theme**

### CV (47 pages)
**Key Insights:**
- **Title Mismatch**: Website shows "UX/UI Designer @ SG Digital" but CV shows Head of Product at Fitzdares (Feb 2023-Present)
- **Missing Recent Roles**: 
  - Head of Product at Fitzdares (2023-present) - major role gap
  - Senior UX Lead at SG Digital (2021-2023) - not on website
- **Timeline Gaps**: Website ends 2018; CV shows active roles through 2026
- **Incomplete Achievements**: Website shows work items but not business impact metrics
- **Education**: IATI, Estonia (BA in IT, 2008-2011) - shows strong technical foundation
- **Early Success**: First Windows app at 12 years old (1996) - compelling origin story
- **Growth Arc**: Clear progression from developer → UX designer → UX architect → UX lead → Head of Product

**Key Achievements Missing from Website:**
1. **Launched Sportsbook & Casino in Canada (2023)** with roadmap planning & UAT oversight
2. **Replatformed Sportsbook & Casino in UK (2023)** - complex migration project
3. **Re-launching Platform in Canada (2024)** - data migration at scale
4. **Migrated UK business to new Tech Provider** - UKGC compliance
5. **Increased GGR delivery** with 250% ROI on 19 change requests
6. **Infrastructure upgrades** (cloud migration)
7. **Design System implementation** at B2B level
8. **Cross-functional team leadership** spanning design, engineering, product, ops

### PRD Analysis
**Desired Direction:**
- Inspired by Flowty.co aesthetic (minimal, luxurious, modern)
- Full-screen snap scrolling sections
- Strong visual hierarchy & generous whitespace
- Luxury dark/light hybrid theme
- Premium casino-inspired 3D objects
- Color palette: matte black, warm white, emerald, gold, platinum, soft cyan
- Story-driven with smooth chapter transitions
- Target: Awwwards-level quality

**Story Structure Requested:**
1. Hero → 2. Brands → 3. Career Journey → 4. Leadership → 5. Product Impact → 6. Design Philosophy → 7. Featured Work → 8. Achievements → 9. Contact

---

## CRITICAL GAPS & OPPORTUNITIES

### Gap 1: Career Narrative
**Current**: Timeline ends at 2018  
**Needed**: Complete timeline through 2026 with emphasis on:
- Senior leadership roles (2021-present)
- Major projects (Canada launch, UK replatform, migration)
- Business impact (250% ROI, player growth, platform scalability)

### Gap 2: Brand Authority
**Current**: 6 company logos (SG Digital, Unibet, Storspiller, LeoVegas, Kindred, Photojet)  
**Needed**: Update to reflect current role at Fitzdares + historical progression
- Add Fitzdares logo (current employer)
- Potentially add: Scotia Casino, Casumo Group, other Tier 1 operators
- Emphasize Tier 1 European/North American focus

### Gap 3: Leadership Positioning
**Current**: UX/Design focus  
**Needed**: Reposition as "Head of Product / 14+ years iGaming"
- Cross-functional team leadership (design, engineering, product, ops)
- Strategic roadmap creation & execution
- Business growth & operational excellence
- Platform architecture & scalability

### Gap 4: Product Impact
**Current**: Design deliverables (betslip, design system)  
**Needed**: Business outcomes
- Player growth metrics
- Revenue impact (GGR)
- Team scalability
- Market launches (Canada, UK, North America)

### Gap 5: Modern UX/Tech
**Current**: Static, outdated frameworks  
**Needed**: 
- Smooth scroll snap sections (Lenis or similar)
- 3D interactive elements (Three.js)
- Dark/light mode with hybrid theme
- Modern animations & transitions
- Mobile-responsive design system

### Gap 6: Origin Story
**Current**: Ignored  
**Needed**: 
- First app at 12 years old (1996)
- Early evidence of full-stack capability
- Sets narrative foundation

---

## DESIGN STRATEGY

### Visual Direction
**Theme**: Luxury iGaming Professional  
**Color System**:
- **Primary**: Matte black (#0A0E27), Warm white (#F5F7FA), Graphite (#2D3142)
- **Accents**: Emerald (#10B981), Gold (#D4AF37), Platinum (#E8E8E8), Soft cyan (#06B6D4)
- **Dark mode dominant** with luxury light accents

**Typography**:
- Headlines: Geometric sans-serif (Inter, DM Sans, or similar)
- Body: Clean, high readability
- Scale: Large, confident headlines reflecting seniority

**Components**:
- Rounded corners (12-16px for modern feel)
- Subtle glassmorphism effects
- Layered depth (cards with soft shadows)
- Premium button treatments
- Refined iconography

### Interaction Model
**Scroll-Snap Sections** (full-screen or near-full):
1. **Hero** (120vh) - Large statement, supporting copy, 3D object, scroll cue
2. **Brands** (100vh) - Premium logo showcase, interactive highlights
3. **Origin Story** (100vh) - Early career (12-year-old developer) → foundation narrative
4. **Career Timeline** (140vh) - Visual timeline with major milestones (1996-2026)
5. **Leadership Era** (120vh) - 2021-present focus, team impact, strategic vision
6. **Product Impact** (120vh) - Business metrics, market launches, scalability
7. **Design Philosophy** (100vh) - Core principles, approach to problem-solving
8. **Featured Work** (varying) - Case studies with deep dives
9. **Achievements** (100vh) - Key wins, metrics, recognition
10. **Contact** (60vh) - CTA with multiple channels

**Scroll Behavior**:
- Smooth scroll snap (Lenis.js or CSS scroll-snap)
- Parallax on 3D objects (move ±5-10% based on scroll)
- Section transitions with fade/slide effects
- Micro-interactions on hover (buttons, cards)
- Persistent header (simplified during scroll)

### 3D Experience
**Three.js Scene**:
- Premium casino-inspired abstract objects (geometric shapes, glass cubes, crystals)
- Objects scale/rotate based on scroll position
- Color shifts reflecting luxury palette
- Performance: optimized for 60fps, mobile-friendly
- Examples to reference: Stripe.com (Threejs), Awwwards winners

---

## TECHNICAL ARCHITECTURE

### Recommended Stack
```
Frontend:
- Next.js 14+ (React, TypeScript, SSR)
- Tailwind CSS v4 (design system + theme switching)
- Three.js (3D scenes)
- Framer Motion (scroll-triggered animations)
- Lenis (smooth scroll snap)

Hosting:
- Vercel (optimal for Next.js)

Analytics:
- Plausible or PostHog (privacy-first)

Assets:
- Reuse existing images (polish & adapt)
- 3D models (custom or from sources like Sketchfab)
- Video backgrounds (optional, for hero sections)
```

### Content Structure
```
/content
  /timeline
    - 1996-early-years.mdx
    - 2004-education.mdx
    - 2005-airport.mdx
    - 2011-unibet.mdx
    - 2013-unibet-lead.mdx
    - 2016-kindred.mdx
    - 2017-leovegas.mdx
    - 2018-sg-digital-ui-designer.mdx
    - 2018-sg-digital-ux-architect.mdx
    - 2021-sg-digital-senior-lead.mdx
    - 2023-fitzdares-head-of-product.mdx
  /achievements
    - canada-launch-2023.mdx
    - uk-replatform-2023.mdx
    - canada-relaunch-2024.mdx
    - design-system.mdx
    - infrastructure-upgrade.mdx
  /featured-work
    - betslip-redesign.mdx
    - sportsbook-platform.mdx
    - design-system-b2b.mdx
```

---

## IMAGE STRATEGY

### Current Assets to Reuse
**From pokacity.com:**
- Freebets & Boosters screenshot
- Betslip takeover images
- Design system concepts
- Logos (company & skill tool)

### Polishing Plan
1. **Color Correction**: Adjust saturation/contrast to match new palette
2. **Cropping**: Reframe for 16:9 or hero aspect ratios
3. **Overlays**: Add luxury overlays (gradients, glassmorphism)
4. **Compression**: Optimize for web
5. **Mockups**: Recreate in modern design tools (Figma)

### New Assets Needed
1. Hero image / 3D scene
2. Timeline milestone graphics
3. Icon set for achievements
4. 3D casino objects (custom or sourced)
5. Team/leadership imagery (if available)

---

## PROJECT BREAKDOWN

### Phase 1: Design & Strategy (Current)
- ✅ CV & PRD analysis
- ✅ Competitive research (Flowty.co, similar portfolios)
- Design system creation in Figma
- High-fidelity mockups (Hero, Timeline, Featured Work sections)
- 3D scene planning

### Phase 2: Core Development
- Next.js project setup
- Tailwind CSS + theme system
- Three.js scene setup & optimization
- Header/nav component
- Scroll provider (Lenis integration)
- Timeline component (data-driven)

### Phase 3: Feature Development
- Hero section with 3D object
- Brand showcase with animations
- Career timeline visualization
- Leadership section
- Product impact metrics display
- Featured work gallery
- Achievement highlights
- Contact section

### Phase 4: Content & Polish
- Write compelling copy for each section
- Migrate & optimize images
- 3D model refinement
- Performance optimization (Lighthouse score target: 90+)
- SEO & meta optimization
- Testing (cross-browser, mobile, A11y)

### Phase 5: Launch & Iteration
- DNS cutover from WordPress to Vercel
- Analytics setup
- Monitoring
- Gather feedback
- Post-launch iterations

---

## KEY METRICS FOR SUCCESS

### Performance
- Lighthouse Score: 90+ (all categories)
- Core Web Vitals: All green
- Mobile performance: <2s load time
- FCP: <1.5s
- LCP: <2.5s

### User Engagement
- Scroll depth tracking (target: 80%+ reach end)
- Section engagement time
- Featured work click-through
- Contact form submissions

### SEO
- Target keywords: "Product designer iGaming", "UX lead sportsbook", "Head of Product", "Artur Prolisko"
- Organic search traffic growth

---

## COMPETITIVE BENCHMARKS

### Similar Designers/Leaders to Reference
1. **Flowty.co** - Aesthetic inspiration (minimal, luxury, scroll-driven)
2. **Toby Soar** (Design Director) - Leadership focus
3. **Paul Stamatiou** (Designer + Strategyist) - Deep dive case studies
4. **Oliur Rahman** (VP Design) - Product-focused
5. **Design Studio Portfolios** - Awwwards winners

### What Sets This Portfolio Apart
- **Deep industry expertise** (14 years iGaming, Tier 1 operators)
- **Full-stack capability** (developer roots → current product leadership)
- **Measurable business impact** (250% ROI, market launches, team scaling)
- **Strategic narrative** (origin story to C-level leadership)
- **Luxury aesthetic** aligned with industry vertical
- **3D interactive experience** (uncommon in product portfolios)

---

## RISKS & MITIGATION

| Risk | Impact | Mitigation |
|------|--------|-----------|
| 3D performance on mobile | High | Lazy load, fallback to 2D, progressive enhancement |
| Complex scroll interactions | Medium | Test extensively, simpler fallback, graceful degradation |
| Image optimization | Medium | WebP + modern formats, lazy loading, CDN |
| Timeline data accuracy | High | Verify against CV, get final approval before launch |
| Content volume | Medium | Create editorial calendar, prioritize top stories |
| Migration from WordPress | Medium | Create backup, test on staging, schedule off-hours |

---

## TIMELINE ESTIMATE

| Phase | Duration | Key Deliverable |
|-------|----------|-----------------|
| Design & Competitive Research | 1-2 weeks | Figma design system, competitive analysis |
| Core Development | 2-3 weeks | Next.js setup, components, 3D scene |
| Feature Development | 3-4 weeks | All major sections built & functional |
| Content & Polish | 2 weeks | Copy, images, optimization, testing |
| Launch Preparation | 1 week | Final testing, DNS setup, analytics |
| **Total** | **9-13 weeks** | Launch-ready portfolio |

---

## NEXT STEPS

1. **GitHub Project Setup** → Create issues for each phase
2. **Competitive Research** → Deep dive into 5-10 similar portfolios
3. **Figma Design System** → Create components & color palette
4. **Content Audit** → Finalize timeline, achievements, work samples
5. **3D Planning** → Decide on objects, styling, performance targets
6. **Kickoff Review** → Align on visual direction, tech stack, priorities

---

## QUESTIONS FOR YOU

1. **Timeline Focus**: Which 3-5 major achievements should be hero-featured?
2. **Brand Logos**: Which companies should be emphasized? Any current/recent ones missing?
3. **3D Objects**: Preference for abstract geometry vs. casino-themed assets?
4. **Dark/Light**: Default to dark mode? Allow toggle?
5. **Featured Work**: Should we add new case studies or polish existing ones?
6. **Contact**: Preferred methods? LinkedIn, email, form, calendar link?
7. **Timeline Detail**: Should we keep every role or focus on major positions?
8. **Domain**: Keep pokacity.com or consider new domain reflecting current role?

---

## SUCCESS CRITERIA

✅ Launches with Awwwards-worthy quality  
✅ Tells complete, compelling career story (1996-2026)  
✅ Positions as Head of Product / iGaming leader (not just designer)  
✅ Highlights business impact & measurable outcomes  
✅ Smooth, immersive scroll experience  
✅ Mobile-responsive & performant  
✅ Generates qualified leads & speaking opportunities  
✅ Establishes thought leadership in iGaming product space

