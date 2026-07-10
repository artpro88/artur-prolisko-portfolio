# Artur Prolisko Portfolio v2

> An immersive, story-driven portfolio showcasing 14+ years of iGaming product leadership.

![Status](https://img.shields.io/badge/Status-Strategy%20Phase-blue)
![Timeline](https://img.shields.io/badge/Timeline-9--13%20weeks-blue)
![Target Launch](https://img.shields.io/badge/Target-Q3%202026-blue)

## Overview

This project transforms [pokacity.com](https://pokacity.com) from a static 2019 site into an award-worthy portfolio that tells the complete story of Artur Prolisko's career journey from a 12-year-old developer to a Head of Product at Tier 1 iGaming operators.

### Key Features

- 🎭 **Story-Driven Experience** - Full-screen scroll-snap sections with smooth transitions
- 🎨 **Luxury Aesthetic** - Dark/light hybrid theme inspired by Flowty.co
- 🌐 **3D Interactive Elements** - Casino-inspired 3D objects that parallax with scroll
- 📈 **Business Impact Focus** - Highlights metrics, launches, and team leadership
- ⚡ **Modern Tech** - Next.js 14, React, TypeScript, Tailwind CSS v4, Three.js
- 📱 **Mobile-First** - Responsive design with performance optimization
- ♿ **Accessible** - WCAG 2.1 AA compliance
- 🚀 **Performance** - Lighthouse 90+, Core Web Vitals all green

## Project Structure

```
├── PROJECT_PLAN.md           # Detailed project roadmap (5 phases)
├── README.md                 # This file
├── .gitignore               # Git ignore rules
├── app/                     # Next.js app directory
│   ├── layout.tsx
│   ├── page.tsx
│   └── sections/            # Page sections
├── components/              # Reusable components
├── lib/                     # Utilities & constants
├── public/                  # Static assets
│   ├── images/
│   ├── videos/
│   └── 3d-models/
├── content/                 # Data files (timeline, achievements, etc.)
└── styles/                  # Global styles
```

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/artur-prolisko.git
cd artur-prolisko

# Install dependencies
npm install

# Create .env.local (copy from .env.example)
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Technology Stack

### Frontend
- **Framework**: Next.js 14+ (React 18+, TypeScript)
- **Styling**: Tailwind CSS v4 with custom design tokens
- **Animation**: GSAP + ScrollTrigger (scroll choreography), Framer Motion (component motion), Lenis.js (smooth scroll)
- **3D Graphics**: Three.js + React Three Fiber + Drei; Spline (optional, per-moment only)

### Backend/CMS
- **Content**: Contentful or Sanity (optional)
- **Analytics**: Plausible (privacy-first)

### Deployment
- **Hosting**: Vercel
- **Domain**: pokacity.com (or new domain)
- **CDN**: Vercel built-in (Cloudflare)

## Design System

### Color Palette

**Hybrid light/dark — NOT a fully dark interface.** Chapters alternate light and dark grounds as a deliberate compositional rhythm. A user-facing mode toggle is optional/secondary. See `SPEC_ADDENDUM.md §1`.

**Dark chapters**
- Ground: #0A0E27 (matte black) / deep graphite / soft charcoal
- Accent: #10B981 (Emerald), #D4AF37 (Gold), #06B6D4 (Soft cyan)
- Text: #F5F7FA (Warm White)

**Light chapters**
- Ground: #F5F7FA (Warm white) / platinum
- Accent: #10B981 (Emerald), #D4AF37 (Gold)
- Text: #0A0E27 (matte black)

Rule: avoid highly saturated gaming colours; keep everything refined. See `tailwind.config.ts` for full palette.

### Components

- Rounded corners: 12-16px
- Button height: 40-48px
- Spacing: 8px grid
- Shadow: Soft, subtle
- Animations: 300-500ms

## Project Phases

### Phase 1: Design & Strategy (Weeks 1-2)
- [x] CV & PRD analysis
- [x] Competitive research
- [ ] Figma design system
- [ ] High-fidelity mockups
- [ ] 3D planning

### Phase 2: Core Development (Weeks 3-5)
- [ ] Next.js setup
- [ ] Tailwind + theme system
- [ ] Header/navigation
- [ ] Lenis scroll integration
- [ ] Three.js 3D scene

### Phase 3: Feature Development (Weeks 6-9)
- [ ] Hero section
- [ ] Brand showcase
- [ ] Career timeline
- [ ] Leadership section
- [ ] Product impact
- [ ] Featured work
- [ ] Achievements
- [ ] Contact

### Phase 4: Content & Polish (Weeks 10-11)
- [ ] Final copy
- [ ] Image optimization
- [ ] 3D refinement
- [ ] Testing (mobile, a11y, performance)
- [ ] SEO optimization

### Phase 5: Launch (Week 12)
- [ ] Final testing
- [ ] DNS cutover
- [ ] Analytics setup
- [ ] Monitoring

## Key Sections (14-Chapter Narrative)

Each chapter is a "scene" that flows into the next; light/dark grounds alternate. See `SPEC_ADDENDUM.md §2` and `docs/06-sitemap-ia.md` for full detail. *(Testimonials cut per Artur; Personal Side reframed as About.)*

1. **Hero** — Statement headline, persistent 3D object, scroll cue.
2. **Introduction** — Short positioning chapter (distinct from hero).
3. **Brands I've Worked With** — Highest-priority visual moment; animated logos.
4. **My Journey** — Origin narrative (first Windows app at 12yo → foundation).
5. **Career Timeline** — Interactive, CV-driven, 2011→now (ends on Founder, Gibraltar 2025).
6. **Major Achievements** — Visual; hero metrics **250% ROI + 3 launches**.
7. **Featured Projects** — 3–5 case studies (Betslip, Design System, launches).
8. **Product Leadership** — Team impact, strategic vision, operational excellence.
9. **Design Philosophy** — Core principles & approach.
10. **Skills** — Core competencies.
11. **Technologies** — Tools & stack (split from Skills).
12. **Awards / Recognition** — Certifications (BCS, Maxymiser, UX Fundamentals) + recognition.
13. **About** — First-person, drawn from CV; resolves the arc into "founder in Gibraltar."
14. **Contact** — Multi-channel CTA: Email, LinkedIn, calendar, form.

## Content Data

Timeline and achievement data are stored in `/content`:

```typescript
// content/timeline.ts
export const timeline = [
  {
    year: 1996,
    age: 12,
    title: "First Windows App",
    company: "SelfHome",
    description: "...",
    impact: "...",
  },
  // ... more entries
];

// content/achievements.ts
export const achievements = [
  {
    metric: "250%",
    description: "ROI on 19 change requests",
    period: "2021-2023",
  },
  // ... more achievements
];
```

## Performance Targets

### Lighthouse Scores
- Performance: 90+
- Accessibility: 95+
- Best Practices: 90+
- SEO: 100

### Core Web Vitals
- LCP: < 2.5s
- FID: < 100ms
- CLS: < 0.1

### Load Times
- FCP: < 1.2s
- TTI: < 3s
- 3D Load: < 500ms (lazy)

## Deployment

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
npm start
```

### Deploy to Vercel
```bash
vercel
```

Environment variables:
- `NEXT_PUBLIC_SITE_URL` - Domain
- `PLAUSIBLE_DOMAIN` - Analytics domain

## SEO & Analytics

### Meta Tags
- Title: "Artur Prolisko | Head of Product, 14+ Years iGaming"
- Description: "Product leader specializing in Tier 1 sportsbook, casino, and live casino platforms. [Location]"
- OG Image: Hero screenshot (1200x630px)

### Analytics (Plausible)
- Scroll depth tracking
- Section engagement time
- Featured work clicks
- Contact form submissions

## Accessibility

- WCAG 2.1 AA compliance
- Semantic HTML
- ARIA labels where needed
- Keyboard navigation
- Color contrast 4.5:1 minimum
- Focus indicators visible
- Alt text on all images
- Proper heading hierarchy

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile: iOS 12+, Android 6+

## Contributing

1. Create a feature branch: `git checkout -b feature/section-name`
2. Make changes and test locally
3. Submit a pull request with clear description
4. Await review and approval

## Code Style

- Use TypeScript for type safety
- Follow ESLint rules (configured in `.eslintrc`)
- Format with Prettier (auto on commit)
- Use camelCase for variables/functions
- Use PascalCase for components/classes

## Issues & Roadmap

See [GitHub Issues](https://github.com/yourusername/artur-prolisko/issues) for:
- Feature requests
- Bug reports
- Design discussions
- Performance improvements

## FAQ

### Q: Why Next.js over other frameworks?
**A**: Next.js provides built-in image optimization, SSR for SEO, Vercel deployment, and excellent TypeScript support. Perfect for high-performance portfolio.

### Q: Will the 3D elements work on mobile?
**A**: Yes, with progressive enhancement. 3D is lazy-loaded and has a 2D fallback for older devices.

### Q: Can I use the design system for other projects?
**A**: Yes! The Tailwind config and component library are reusable. See `tailwind.config.ts` and `/components`.

### Q: How often will this be updated?
**A**: Timeline will be kept current as new achievements occur. Consider a blog section for ongoing thought leadership.

## License

Personal use portfolio. Not open source.

## Contact

- **Email**: pokacity@gmail.com
- **LinkedIn**: [Artur Prolisko](https://linkedin.com/in/artur-prolisko)
- **Portfolio**: [pokacity.com](https://pokacity.com)

## Acknowledgments

- Inspired by [Flowty.co](https://flowty.co) design direction
- Three.js for 3D rendering
- Vercel for deployment platform
- Plausible for privacy-first analytics

---

**Last Updated**: July 10, 2026  
**Status**: Strategy Phase → Ready for Phase 1 Development  
**Next Step**: Create Figma design system & high-fidelity mockups

