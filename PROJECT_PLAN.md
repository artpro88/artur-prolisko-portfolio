# Artur Prolisko Portfolio Redesign - Project Plan

**Project Name**: Artur Prolisko Portfolio v2  
**Repository**: Artur Prolisko (GitHub)  
**Status**: Strategy Phase → Development Ready  
**Timeline**: 9-13 weeks  
**Target Launch**: Q3 2026

---

## PROJECT OVERVIEW

Transform pokacity.com from a static 2019 site into an award-worthy, immersive portfolio that tells the complete story of 14+ years in iGaming product leadership. The redesign emphasizes business impact, strategic vision, and luxury aesthetic aligned with the iGaming industry.

### Key Objectives

1. **Complete Career Narrative** - Update timeline to 2026 with major milestones
2. **Leadership Positioning** - Reposition from "UX/Designer" to "Head of Product"
3. **Business Impact Focus** - Highlight metrics (250% ROI, market launches, scaling)
4. **Immersive Experience** - Scroll-driven storytelling with 3D interactive elements
5. **Modern Tech Stack** - Replace dated Foundation framework with Next.js
6. **Luxury Aesthetic** - Dark/light hybrid theme reflecting iGaming industry
7. **Performance & SEO** - Lighthouse 90+, mobile-first, optimized for search

---

## PHASE BREAKDOWN

### PHASE 1: Design & Strategy (Weeks 1-2)

**Deliverables:**
- [x] CV & PRD analysis
- [x] Competitive research (Flowty.co, similar portfolios)
- [ ] Figma design system (colors, typography, components)
- [ ] High-fidelity mockups (Hero, Timeline, Featured Work)
- [ ] 3D scene planning & asset list
- [ ] Content outline & copy structure

**Issues:**
```
- Design System Setup in Figma
- Figma High-Fidelity Mockups (Hero Section)
- Figma High-Fidelity Mockups (Timeline Section)
- Figma High-Fidelity Mockups (Featured Work)
- 3D Scene Planning & Asset Research
- Content Outline & Copy Structure
- Review & Sign-off
```

**Owner**: Design Lead  
**Stakeholder**: Artur

---

### PHASE 2: Core Development (Weeks 3-5)

**Deliverables:**
- [ ] Next.js 14 project setup
- [ ] Tailwind CSS + dark/light theme system
- [ ] Header & navigation component
- [ ] Scroll provider (Lenis integration)
- [ ] 3D scene setup (Three.js + React Three Fiber)
- [ ] Basic page layout (sections structure)
- [ ] TypeScript setup & linting

**Issues:**
```
- Setup: Next.js 14 Project
- Setup: Tailwind CSS + Design Tokens
- Setup: Dark/Light Theme System
- Component: Header & Navigation
- Component: Footer
- Integration: Lenis Smooth Scroll
- Integration: Three.js 3D Scene
- Component: Section Wrapper (snap scrolling)
- CI/CD: GitHub Actions for builds & tests
```

**Owner**: Lead Developer  
**Tech Stack**: Next.js 14, React, TypeScript, Tailwind CSS v4

---

### PHASE 3: Feature Development (Weeks 6-9)

**Deliverables (14-chapter narrative — see `SPEC_ADDENDUM.md §2` & `docs/06-sitemap-ia.md`):**
- [ ] 1. Hero (headline, persistent 3D object, scroll cue)
- [ ] 2. Introduction (positioning chapter)
- [ ] 3. Brands I've Worked With (animated logos — highest priority)
- [ ] 4. My Journey (origin, 1996 12yo developer)
- [ ] 5. Career Timeline (interactive; 2011→now, ends on Founder/Gibraltar 2025)
- [ ] 6. Major Achievements (visual; 250% ROI + 3 launches)
- [ ] 7. Featured Projects (case studies)
- [ ] 8. Product Leadership (team impact, scope)
- [ ] 9. Design Philosophy
- [ ] 10. Skills
- [ ] 11. Technologies (tools/stack)
- [ ] 12. Awards / Recognition (certifications + recognition)
- [ ] 13. About (first-person, from CV; resolves arc into founder)
- [ ] 14. Contact (multi-channel CTA)
- [ ] ~~Testimonials~~ — CUT per Artur

**Issues:**
```
- Section: 1. Hero with 3D Object
- Section: 2. Introduction
- Section: 3. Brand Logo Showcase (animated)
- Section: 4. My Journey (origin)
- Section: 5. Career Timeline (Component)
- Section: 5. Career Timeline (Data Structure — incl. Gibraltar 2025)
- Section: 6. Major Achievements (visual — 3 launches)
- Section: 7. Featured Projects Gallery
- Section: 8. Product Leadership
- Section: 9. Design Philosophy
- Section: 10. Skills
- Section: 11. Technologies
- Section: 12. Awards / Recognition (certifications)
- Section: 13. About (from CV)
- Section: 14. Contact Section
- Component: Scroll Indicator
- Component: Chapter Transitions (light/dark alternation)
- Animation: Persistent 3D Scene Scroll Sync (GSAP ScrollTrigger)
- Animation: Scroll-Triggered Reveals
```

**Owner**: Product Developer  
**Parallel tracks possible**: Sections can be built in parallel

---

### PHASE 4: Content & Polish (Weeks 10-11)

**Deliverables:**
- [ ] Final copy for all sections
- [ ] Timeline data verified against CV
- [ ] Image optimization & compression
- [ ] 3D model refinement
- [ ] Mobile responsiveness testing
- [ ] Accessibility (A11y) audit
- [ ] Performance optimization
- [ ] Cross-browser testing

**Issues:**
```
- Content: Hero Copy
- Content: Timeline Dates & Descriptions
- Content: Achievement Metrics & Impact
- Content: Case Study Copy
- Content: Design Philosophy
- Assets: Image Optimization
- Assets: Image Compression & WebP
- Assets: 3D Model Refinement
- Testing: Mobile Responsiveness
- Testing: Cross-Browser Compatibility
- Testing: Accessibility (WCAG 2.1 AA)
- Performance: Lighthouse Optimization
- Performance: 3D Scene Performance
- SEO: Meta Tags & Schema
- SEO: Open Graph Images
```

**Owner**: QA Lead, Content Manager, Designer  
**Dependencies**: Completed feature sections

---

### PHASE 5: Launch & Deployment (Week 12)

**Deliverables:**
- [ ] Final testing & bug fixes
- [ ] DNS cutover (pokacity.com → Vercel)
- [ ] Analytics setup (Plausible)
- [ ] Monitoring & alerting
- [ ] Launch checklist review
- [ ] Backup strategy for old site

**Issues:**
```
- Deployment: Vercel Setup
- Deployment: DNS Configuration
- Analytics: Plausible Setup
- Monitoring: Error Tracking
- Monitoring: Performance Monitoring
- Launch: Pre-launch Checklist
- Launch: Email Announcement
- Launch: Social Media Promotion
- Post-Launch: Feedback Collection
```

**Owner**: DevOps/Launch Lead  
**Risk**: DNS propagation delays

---

### PHASE 6: Post-Launch (Week 13+)

**Ongoing:**
- [ ] Monitor analytics & performance
- [ ] Collect user feedback
- [ ] Iterative improvements
- [ ] Blog/thought leadership articles
- [ ] Speaking engagement promotion

**Issues:**
```
- Analytics: Daily Monitoring
- Analytics: Weekly Reports
- Feedback: User Testing Sessions
- Improvements: Bug Fixes (Post-Launch)
- Improvements: Performance Tweaks
- Content: Blog Post Planning
- Content: LinkedIn Articles
- Promotion: Speaking Engagements
```

---

## TECHNICAL ARCHITECTURE

### Frontend Stack

```
Framework: Next.js 14+ (App Router)
Language: TypeScript
Styling: Tailwind CSS v4
Animation: GSAP + ScrollTrigger (scroll choreography) + Framer Motion (component motion)
Scroll: Lenis.js
3D Graphics: Three.js + React Three Fiber + Drei (+ Spline, optional)
```

### Directory Structure

```
portfolio/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── sections/
│       ├── hero.tsx
│       ├── brands.tsx
│       ├── origin-story.tsx
│       ├── timeline.tsx
│       ├── leadership.tsx
│       ├── product-impact.tsx
│       ├── design-philosophy.tsx
│       ├── featured-work.tsx
│       ├── achievements.tsx
│       └── contact.tsx
├── components/
│   ├── header.tsx
│   ├── footer.tsx
│   ├── scroll-indicator.tsx
│   ├── section-wrapper.tsx
│   ├── 3d-scene.tsx
│   └── ...
├── lib/
│   ├── cn.ts
│   ├── constants.ts
│   └── types.ts
├── public/
│   ├── images/
│   ├── videos/
│   └── 3d-models/
├── content/
│   ├── timeline.ts
│   ├── achievements.ts
│   ├── featured-work.ts
│   └── copy.ts
└── ...
```

### Environment & Deployment

```
Local Dev: npm run dev (Next.js dev server)
Staging: Vercel preview deployment
Production: Vercel (automatic from main branch)
Database: None (static content or Contentful for CMS)
CDN: Vercel built-in
Analytics: Plausible (privacy-first)
```

---

## CONTENT STRUCTURE

### Timeline Data (confirmed by Artur, Jul 2026 — CV is source of truth)

```
Origin markers (shown in "My Journey" / "About", not the main track):
1996      - First Windows app (12 years old) - "SelfHome" (Estonia)
2008-2011 - Education: IATI, Estonia (BA in Information Technology)

Career track (Chapter 5):
2011-2013 - CRM, Kindred Group (Unibet)
2013-2016 - UX Delivery / Interface & Production Manager Lead, Kindred/Unibet
2016-2018 - UX Architect, Kindred Group
2018      - UX/UI Designer, LeoVegas (Jan–Jul 2018)  ✅ confirmed
2018-2021 - UI Designer / UX Architect, SG Digital (Scientific Gaming)
2021-2023 - Senior UX Lead, SG Digital
2023-2025 - Head of Product, Fitzdares
2025-now  - Founder, new iGaming venture (Gibraltar licence)  ⚠ name/title TBC
```

### Major Achievements (to Feature) — hero metrics: 250% ROI + 3 launches

```
✓ 250% ROI on 19 change requests (Fitzdares)
✓ 3 market launches: Canada Sportsbook & Casino (2023),
    UK replatform (2023), new platform under Gibraltar licence (2025)
✓ Founded a new iGaming business & platform, Gibraltar (2025)
✓ Canada relaunch on new platform (2024)
✓ Migrated UK business to new tech provider (UKGC compliance)
✓ Infrastructure upgrades (cloud migration)
✓ Design System implementation (B2B)
✓ Kindred: #1 growth across 10 emerging markets (2012)
✓ 14+ years in iGaming Tier 1 operators (EU / CA / US)
```

### Featured Work (Case Studies)

1. **Betslip Redesign** - Enhanced usability & performance
2. **Design System at B2B** - Centralized theming & reduced technical debt
3. **Sportsbook Platform** - Market launches & scalability
4. **Canada Launch** - Strategic roadmap & UAT oversight
5. **UK Replatform** - Complex migration with UKGC compliance

---

## DESIGN SYSTEM

### Color Palette

**Primary:**
- Matte Black: #0A0E27
- Warm White: #F5F7FA
- Graphite: #2D3142

**Accent:**
- Emerald: #10B981 (primary accent, luxury)
- Gold: #D4AF37 (wealth, premium)
- Platinum: #E8E8E8 (highlight)
- Soft Cyan: #06B6D4 (secondary)

**Theme model:** Premium **hybrid light/dark — NOT fully dark.** Chapters alternate light and dark grounds as a deliberate compositional rhythm (dark hero → light intro → dark brands → …). A user-facing mode toggle is optional/secondary.
**Dark chapters:** matte black / deep graphite / soft charcoal ground, warm-white text, emerald/gold/cyan accents.
**Light chapters:** warm white / platinum ground, matte-black text, emerald/gold accents.
**Rule:** avoid highly saturated gaming colours — everything refined. (See `SPEC_ADDENDUM.md §1`.)

### Typography

**Headlines:** DM Sans or Inter Bold, 48-80px  
**Body:** Inter Regular, 16-18px  
**Accent:** Mono (JetBrains Mono), 12-14px for code/small text

### Components

- Rounded corners: 12-16px (modern, not aggressive)
- Shadows: Soft, subtle (not harsh)
- Borders: Minimal, accent color only
- Spacing: 8px grid
- Animations: 300-500ms (purposeful, not frenetic)

---

## PERFORMANCE TARGETS

### Lighthouse Scores (Target)

| Category | Target |
|----------|--------|
| Performance | 90+ |
| Accessibility | 95+ |
| Best Practices | 90+ |
| SEO | 100 |

### Core Web Vitals

| Metric | Target |
|--------|--------|
| LCP (Largest Contentful Paint) | < 2.5s |
| FID (First Input Delay) | < 100ms |
| CLS (Cumulative Layout Shift) | < 0.1 |

### Load Time Goals

| Metric | Target |
|--------|--------|
| First Contentful Paint | < 1.2s |
| Time to Interactive | < 3s |
| 3D Scene Load | < 500ms (lazy) |
| Total Bundle Size | < 150KB gzipped |

---

## RISK MANAGEMENT

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|-----------|
| 3D performance issues on mobile | Medium | High | Lazy load, 2D fallback, progressive enhancement |
| Complex scroll interactions have bugs | Medium | Medium | Extensive testing, simpler fallback |
| Timeline data accuracy | Low | High | Verify all dates/metrics before launch |
| Image optimization takes longer | Low | Medium | Use batch tools, automate compression |
| DNS cutover issues | Low | High | Plan cutover during low-traffic window, keep backup |
| Team availability delays | Medium | Medium | Parallel work streams, clear dependencies |

---

## DEPENDENCIES & BLOCKERS

**None to start** - Can proceed with Phase 1 immediately.

**Critical Path:**
1. Figma designs approved → Phase 2 can start
2. Next.js project setup → Phase 3 can start (parallel)
3. Content finalization → Phase 4 can start
4. All sections built → Phase 5 can start

---

## SUCCESS METRICS

### Business Metrics

- [ ] Increased organic search traffic (+50% in 3 months)
- [ ] Positive feedback on design/storytelling
- [ ] Speaking engagement inquiries
- [ ] Consulting/advisory opportunities
- [ ] Network growth (LinkedIn connections)

### Technical Metrics

- [ ] Lighthouse scores 90+ across all categories
- [ ] Core Web Vitals all green
- [ ] Mobile performance score 85+
- [ ] Zero 404 errors post-launch
- [ ] 99.9% uptime

### User Engagement Metrics

- [ ] 80%+ scroll depth (reach end of page)
- [ ] 3+ minutes average session time
- [ ] 30%+ contact section engagement
- [ ] Featured work section clicks tracked
- [ ] Dark/light mode preference tracked

---

## STAKEHOLDERS

| Role | Name | Responsibility |
|------|------|-----------------|
| Product Owner | Artur Prolisko | Vision, sign-off, content approval |
| Design Lead | TBD | Figma designs, design system, brand |
| Lead Developer | TBD | Architecture, core features, performance |
| QA Lead | TBD | Testing, accessibility, cross-browser |
| DevOps | TBD | Vercel setup, DNS, monitoring |

---

## COMMUNICATION PLAN

**Weekly Standup**: Monday 10am (15 min)  
**Design Review**: Every 2 weeks (Figma)  
**Launch Checklist**: Week 12 (final review)  
**Post-Launch**: Daily monitoring first week, then weekly updates

**Slack Channel**: #portfolio-redesign  
**GitHub Discussions**: For technical decisions  
**Email**: Weekly summary to stakeholders

---

## TIMELINE AT A GLANCE

```
Week 1-2:  Design & Strategy
Week 3-5:  Core Development
Week 6-9:  Feature Development (parallel)
Week 10-11: Content & Polish
Week 12:    Launch & Deployment
Week 13+:   Post-Launch & Iteration
```

---

## APPENDIX: QUESTIONS FOR ARTUR

Before finalizing Phase 1, please provide answers to:

1. **Hero Focus**: Which 3-5 achievements are most important to feature immediately?
2. **Brand Logos**: Should we add any recent/current clients or partners to logo section?
3. **3D Aesthetic**: Preference for abstract geometry vs. casino-themed/luxury objects?
4. **Theme Default**: Dark mode only, or allow light mode toggle?
5. **Featured Work**: Should we polish existing case studies or create new ones?
6. **Timeline Detail**: Show every role, or focus on major positions only?
7. **Contact Methods**: Email form, Calendly link, LinkedIn, phone? What's preferred?
8. **Domain**: Keep pokacity.com or migrate to new domain reflecting current role?
9. **Blog/Articles**: Would you like a section for writing/thought leadership?
10. **Speaking**: Should we showcase speaking engagements or upcoming talks?

---

## SIGN-OFF

**Project Owner**: Artur Prolisko  
**Prepared By**: Strategy Team  
**Date**: July 10, 2026  
**Status**: Ready for Phase 1 Kickoff

