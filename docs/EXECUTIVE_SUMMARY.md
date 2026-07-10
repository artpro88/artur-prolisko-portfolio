# Executive Summary: Artur Prolisko Portfolio Redesign

**Project**: Portfolio v2 Redesign  
**Status**: Strategy Complete → Ready for Phase 1  
**Prepared**: July 10, 2026  
**Timeline**: 9-13 weeks to launch  

---

## THE OPPORTUNITY

Your current portfolio (pokacity.com) is a functional 2019 site built on dated technology that doesn't reflect your actual career trajectory or seniority level. It ends at 2018 as "ongoing work" and positions you as a UX/Designer when you're actually a Head of Product leading cross-functional teams.

**The gap:** 8 years of career growth (2018-2026) are missing from your portfolio, including:
- Head of Product role at Fitzdares (2023-present)
- Senior UX Lead at SG Digital (2021-2023)
- Major market launches (Canada 2023, UK 2023)
- Significant business impact (250% ROI on 19 change requests)

This redesign transforms your portfolio into an immersive, story-driven experience that showcases your complete journey from a 12-year-old developer to a strategic product leader at Tier 1 iGaming operators.

---

## WHAT WE'RE BUILDING

### Core Vision
An award-worthy portfolio (Awwwards-level quality) inspired by Flowty.co's luxury aesthetic, featuring:
- Full-screen scroll-snap sections telling your career story
- 3D interactive elements that parallax with scroll
- Dark/light hybrid luxury theme reflecting iGaming aesthetic
- Complete timeline (1996-2026) emphasizing leadership and business impact
- Modern tech stack (Next.js 14, React, Three.js, Tailwind)

### 10 Key Sections
1. **Hero** - Powerful opening with 3D object
2. **Brands** - Premium logo showcase of 6+ employers
3. **Origin Story** - Your first app at 12 years old
4. **Career Timeline** - Major milestones 1996-2026
5. **Leadership Era** - 2021-present team & strategic impact
6. **Product Impact** - Business metrics & market launches
7. **Design Philosophy** - Core principles
8. **Featured Work** - 3-5 case studies with business outcomes
9. **Achievements** - Key wins & recognition
10. **Contact** - Multi-channel CTA

### Design System
- **Colors**: Matte black, warm white, emerald (luxury accent), gold
- **Typography**: Large, bold headlines in geometric sans-serif
- **Components**: Rounded corners, subtle glass effects, premium buttons
- **Interactions**: Smooth scroll-snap, parallax 3D, purposeful micro-interactions

---

## CRITICAL GAPS ADDRESSED

### Gap 1: Career Narrative ✓
**Current**: Ends 2018  
**Fixed**: Now shows complete journey through 2026 with emphasis on:
- Senior leadership roles
- Major projects & launches
- Business outcomes

### Gap 2: Positioning ✓
**Current**: "UX/UI Designer @ SG Digital"  
**Fixed**: Repositioned as "Head of Product / 14+ Years iGaming"
- Emphasizes strategic leadership
- Highlights cross-functional team leadership
- Shows business growth mindset

### Gap 3: Business Impact ✓
**Current**: Design deliverables only  
**Fixed**: Highlights metrics that matter:
- 250% ROI improvements
- 2 market launches
- Team scaling
- Revenue/player growth

### Gap 4: Modern UX ✓
**Current**: Static, dated (Foundation 6.4.3 from 2017)  
**Fixed**: Modern stack with:
- Smooth scroll-snap sections
- 3D interactive elements
- Dark/light theme
- Mobile-responsive
- Performance optimized

### Gap 5: Image Strategy ✓
**Current**: Placeholder "coming soon" images  
**Fixed**: Reuse existing images, polished & adapted to:
- New color palette
- Luxury overlays
- Modern crop ratios

---

## COMPETITIVE BENCHMARKS

### References Analyzed
1. **Flowty.co** - Aesthetic inspiration (minimal, luxurious, scroll-driven)
2. **Paul Stamatiou** - Deep case studies with business outcomes
3. **Toby Soar** - Creative direction positioning
4. **Oliur Rahman** - Thought leadership + portfolio
5. **Award-winning portfolios** (Awwwards) - 2024-2025 trends

### What Sets Your Portfolio Apart
- **Deep domain expertise** - 14 years iGaming, Tier 1 operators
- **Full-stack capability** - Developer roots → current product leadership
- **Measurable business impact** - ROI, launches, team scaling
- **Strategic narrative** - Compelling origin story to C-level leadership
- **Industry-aligned aesthetic** - Luxury feel for high-end operators

---

## PROJECT PHASES

### Phase 1: Design & Strategy (Weeks 1-2)
**Deliverables:**
- Figma design system (color palette, typography, components)
- High-fidelity mockups (Hero, Timeline, Featured Work sections)
- 3D scene planning & asset research
- Content outline & copy structure

**Key Decisions Needed:**
1. Which 3-5 achievements are "hero-level"?
2. Default theme preference (dark mode or toggle)?
3. 3D aesthetic (abstract geometry or casino-themed)?
4. Featured work (polish existing or create new case studies)?

---

### Phase 2: Core Development (Weeks 3-5)
**Deliverables:**
- Next.js 14 project setup with TypeScript
- Tailwind CSS + dark/light theme system
- Header, navigation, footer components
- Lenis smooth scroll integration
- Three.js 3D scene setup & performance optimization
- Section wrapper component for snap scrolling

**Technical Foundation:**
- Modern React patterns
- Responsive design system
- Performance-first architecture
- Accessibility built-in

---

### Phase 3: Feature Development (Weeks 6-9)
**Deliverables:**
- All 10 sections built and interactive
- Timeline component (data-driven)
- Brand showcase animation
- 3D parallax effects
- Scroll-triggered animations
- Achievement metrics display
- Featured work gallery
- Contact form integration

**Can Run in Parallel:**
- Different sections can be built simultaneously
- Speeds up overall delivery

---

### Phase 4: Content & Polish (Weeks 10-11)
**Deliverables:**
- Final copy for all sections
- Timeline verified against CV
- Image optimization & compression
- 3D model refinement
- Mobile responsiveness testing
- Accessibility (WCAG 2.1 AA) audit
- Performance optimization (target: Lighthouse 90+)
- Cross-browser testing

---

### Phase 5: Launch & Deployment (Week 12+)
**Deliverables:**
- DNS cutover from WordPress to Vercel
- Analytics setup (Plausible)
- Monitoring & alerting
- Post-launch feedback collection

---

## TECH STACK

### Frontend
- **Framework**: Next.js 14+ (React 18+, TypeScript)
- **Styling**: Tailwind CSS v4 with custom design tokens
- **Animation**: Framer Motion + Lenis.js (smooth scroll)
- **3D Graphics**: Three.js + React Three Fiber

### Deployment
- **Hosting**: Vercel (optimal for Next.js)
- **Domain**: pokacity.com (or new domain)
- **Analytics**: Plausible (privacy-first)
- **CDN**: Vercel built-in

### Why This Stack?
- **Performance**: Built-in image optimization, code splitting
- **SEO**: Server-side rendering, meta tags
- **Developer Experience**: TypeScript, hot reload, great tooling
- **Scalability**: Component-driven architecture
- **Maintenance**: Industry-standard, well-documented

---

## SUCCESS METRICS

### Performance Targets
| Metric | Target |
|--------|--------|
| Lighthouse Score | 90+ across all categories |
| Mobile Lighthouse | 85+ |
| Largest Contentful Paint | < 2.5s |
| First Contentful Paint | < 1.2s |
| Cumulative Layout Shift | < 0.1 |

### User Engagement Targets
| Metric | Target |
|--------|--------|
| Scroll Depth | 80%+ reach end |
| Average Session Time | 3+ minutes |
| Featured Work CTR | 30%+ |
| Contact CTR | 15%+ |
| Return Visitors | 25%+ |

### Business Metrics
- Increased organic search traffic (+50% in 3 months)
- Speaking engagement inquiries
- Consulting/advisory opportunities
- Network growth (LinkedIn connections)

---

## RISK MITIGATION

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|-----------|
| 3D performance on mobile | Medium | High | Lazy load, 2D fallback, progressive enhancement |
| Complex scroll interactions | Medium | Medium | Extensive testing, graceful degradation |
| Image optimization delays | Low | Medium | Batch tools, automated compression |
| Timeline data accuracy | Low | High | Verify all dates against CV before launch |
| DNS cutover issues | Low | High | Plan during low-traffic window, keep backup |

---

## RESOURCE REQUIREMENTS

### Team
- **Design Lead**: Figma mockups, design system (Weeks 1-2, then review)
- **Lead Developer**: Architecture, core features, performance (Weeks 3-12)
- **Product Developer**: Section building (Weeks 6-9)
- **QA/Tester**: Testing, accessibility, performance (Weeks 10-12)
- **DevOps**: Vercel setup, DNS, monitoring (Week 12)
- **Artur**: Vision, content approval, sign-off (Weeks 1, 5, 10, 12)

### Time Investment
- **Design**: 40-50 hours (Figma)
- **Development**: 150-200 hours (code)
- **Testing & Polish**: 40-60 hours (QA)
- **Content**: 20-30 hours (copy, verification)
- **Deployment**: 10-15 hours (launch)
- **Total**: ~280-355 hours (3.5-4.5 person-months)

---

## FINANCIAL IMPLICATIONS

### Option A: Internal/Team Build
- Cost: Team salaries (absorbed if existing team)
- Timeline: 9-13 weeks as planned
- Quality: Full control, aligned with vision
- Maintenance: Owned by team

### Option B: Agency/Contract
- Cost: €15,000-35,000 depending on scope & team
- Timeline: 8-12 weeks
- Quality: Depends on agency expertise
- Maintenance: May require ongoing support

### Option C: Hybrid (Recommended)
- Design agency (4-6 weeks, €3-5K)
- Internal dev team (6-8 weeks)
- Internal testing & launch (2 weeks)
- Total: €3-5K + team time

---

## NEXT STEPS (IMMEDIATE)

### Week 1 (This Week)
1. **Answer 10 Key Questions** (see below)
2. **Create Figma Design System**
   - Color palette, typography, components
   - Link provided for reference
3. **Start Content Audit**
   - Verify all timeline dates/achievements
   - Identify 5-7 featured work pieces

### Week 2
1. **Create High-Fidelity Mockups** (Figma)
   - Hero section
   - Timeline section
   - Featured work section
2. **Plan 3D Scene**
   - Decide on objects/styling
   - Find/commission 3D models
3. **Finalize Copy**
   - Write hero statement
   - Write section headlines

### Week 3-5
- Begin Next.js project setup
- Hire/assign development team
- Start core development

---

## 10 KEY QUESTIONS FOR ARTUR

**Please provide answers to:**

1. **Hero Focus**: Which 3-5 achievements are most important to highlight immediately?
   - Example: Canada launch, 250% ROI, team leadership?

2. **Brand Logos**: Should we add any recent/current clients or partners?
   - Currently showing: SG Digital, Unibet, Storspiller, LeoVegas, Kindred, Photojet
   - Add: Fitzdares? Any others?

3. **3D Aesthetic**: Preference?
   - Abstract geometry (modern, sleek)
   - Casino-themed (roulette wheels, chips, luxury elements)
   - Luxury objects (glass cubes, crystals, diamonds)

4. **Theme Default**: 
   - Dark mode only?
   - Allow light mode toggle?

5. **Featured Work**: Should we?
   - Polish existing case studies (Freebets, Betslip, etc.)?
   - Create completely new ones?
   - Mix of both?

6. **Timeline Detail**:
   - Show every role (13 entries)?
   - Focus on major positions only (7-8)?

7. **Contact Methods**: Preferred channels?
   - Email form?
   - Calendly link?
   - LinkedIn direct message?
   - Phone? Email display?

8. **Domain**:
   - Keep pokacity.com?
   - Migrate to new domain?
   - Sub-domain on another site?

9. **Blog/Articles**:
   - Add section for thought leadership?
   - Articles on iGaming product strategy?
   - LinkedIn/Medium cross-posting?

10. **Speaking/Events**:
    - Showcase speaking engagements?
    - Promote upcoming talks?
    - Add "Available for Speaking" badge?

---

## SUCCESS CRITERIA

At launch, the portfolio must:

✅ **Storytelling**: Tell compelling career journey (1996 → 2026)  
✅ **Positioning**: Position as Head of Product / iGaming leader  
✅ **Impact**: Highlight business metrics & measurable outcomes  
✅ **Experience**: Smooth, immersive scroll-driven UX  
✅ **Technology**: Modern tech stack (Next.js, 3D, animations)  
✅ **Performance**: Lighthouse 90+, Core Web Vitals all green  
✅ **Mobile**: Fully responsive, 85+ Lighthouse score  
✅ **Accessibility**: WCAG 2.1 AA compliant  
✅ **Results**: Generates leads & opportunities  
✅ **Pride**: Portfolio you're proud to share  

---

## COMPETITIVE ADVANTAGES

This redesign positions you as:

1. **Strategic Leader** (not just designer)
   - Business metrics, ROI focus
   - Team leadership emphasis
   - Operational excellence

2. **Deep Domain Expert**
   - 14 years iGaming Tier 1 operators
   - Multiple market launches
   - Platform scalability expertise

3. **Full-Stack Thinker**
   - Developer roots (12yo first app)
   - Design leadership
   - Product strategy
   - Business operations

4. **Innovative Designer**
   - Modern portfolio with 3D
   - Award-worthy aesthetics
   - Immersive UX patterns

5. **Thought Leader**
   - Potential for blog/speaking
   - Industry expertise visibility
   - Consulting/advisory positioning

---

## FINANCIAL IMPACT POTENTIAL

This redesign can unlock:

- **Speaking Engagements** - 5-10 talks @ €2-5K each = €10-50K
- **Consulting Opportunities** - 1-2 advisory roles = €30-100K+
- **Executive Recruitment** - Premium positioning for C-level roles
- **Product Strategy Sales** - Potential for fractional CRO/Head of Product roles

**ROI Break-Even**: 2-3 months (if it generates 1 speaking gig or consulting engagement)

---

## DELIVERABLES SUMMARY

### You'll Receive
1. **Source Code** - GitHub repo with Next.js project, all components
2. **Design System** - Figma file with components & patterns
3. **Documentation** - README, deployment guide, content management
4. **Analytics Dashboard** - Plausible analytics setup with custom tracking
5. **Hosting** - Live on Vercel with custom domain
6. **Support** - Ongoing updates & maintenance plan

### You Own
- GitHub repository (your account)
- Domain (pokacity.com)
- Vercel project
- Analytics data
- All content & assets

---

## TIMELINE AT A GLANCE

```
Week 1-2:   Design & Strategy (Figma mockups, design system)
Week 3-5:   Core Development (Next.js setup, components)
Week 6-9:   Feature Development (sections, 3D, animations)
Week 10-11: Content & Polish (copy, images, testing)
Week 12:    Launch & Deployment (go live!)
Week 13+:   Post-Launch (monitoring, iteration)
```

**Target Launch Date**: Late September 2026 (13 weeks)  
**Accelerated Launch**: Mid-September 2026 (11 weeks)

---

## RECOMMENDED NEXT STEPS

### This Week
1. ✅ Read this summary & PROJECT_PLAN.md
2. ✅ Review competitive research (3-4 referenced sites)
3. ⏭️ **Answer 10 key questions above**
4. ⏭️ **Approve project vision & timeline**
5. ⏭️ **Schedule kickoff meeting** (design lead + dev lead)

### Next Week
1. Create Figma design system
2. Start content verification (timeline, achievements)
3. Assign dev team / hire contractors
4. Create high-fidelity mockups

### Week 3
1. Approve Figma mockups
2. Begin Next.js project setup
3. Start development sprints

---

## CONTACT & QUESTIONS

**Project Artifacts:**
- 📄 PROJECT_PLAN.md - Detailed roadmap
- 📄 README.md - Technical documentation
- 🎨 COMPETITIVE_RESEARCH.md - 5+ reference sites analyzed
- 📊 PORTFOLIO_REDESIGN_STRATEGY.md - Comprehensive analysis

**GitHub Repository:**
- Status: Initialized with strategy documents
- Next: Add Figma design system & high-fidelity mockups
- Branch: `main` (production-ready code)

---

## APPROVAL & SIGN-OFF

**Project Overview**: ✅ Approved  
**Design Direction**: ⏳ Awaiting feedback on 10 questions  
**Technical Stack**: ✅ Approved  
**Timeline**: ⏳ Pending resource confirmation  
**Budget**: ⏳ Pending decision (internal vs. agency vs. hybrid)  

**Next Gate**: Answers to 10 key questions → Figma kickoff

---

**Last Updated**: July 10, 2026  
**Status**: Strategy Complete → Ready for Phase 1  
**Owner**: Artur Prolisko  
**Prepared By**: Strategy Team

