/** Brands grid — all info visible by default (docs/08 §5a: no hover-only content). */
export interface Brand {
  name: string;
  logo: string;
  meta: string;
  role: string;
  impact: string;
}

export const brands: Brand[] = [
  {
    name: "Fitzdares",
    logo: "/logos/fitzdares.png",
    meta: "Head of Product · 2023–now",
    role: "Launched Canada · UK replatform",
    impact: "Roadmap, migrations, board & IT — now from Gibraltar.",
  },
  {
    name: "SG Digital",
    logo: "/logos/sg.png",
    meta: "UX Architect → Snr UX Lead · 2018–23",
    role: "B2B design system · betslip",
    impact: "Design systems across web, native & retail.",
  },
  {
    name: "Kindred",
    logo: "/logos/kindred.png",
    meta: "UX Architect · 2016–18",
    role: "15 brands · 30+ sites",
    impact: "Scalable multi-brand enterprise UX.",
  },
  {
    name: "Unibet",
    logo: "/logos/unibet.png",
    meta: "CRM → UX Lead · 2011–16",
    role: "#1 emerging-market growth ’12",
    impact: "Grew 10 markets; CMS & roll-outs.",
  },
  {
    name: "LeoVegas",
    logo: "/logos/leovegas.png",
    meta: "UX/UI Designer · 2018",
    role: "Mobile-first casino",
    impact: "Concepts, wireframes, rapid research.",
  },
  {
    name: "Storspiller",
    logo: "/logos/storspiller.png",
    meta: "Product design",
    role: "Nordic operator",
    impact: "Casino & sportsbook experiences.",
  },
];

/** Featured work — code-drawn 3D product vignettes (components/work). */
export interface WorkItem {
  tag: string;
  title: string;
  desc: string;
  kind: "betslip" | "freebets" | "cashout" | "search";
}

export const work: WorkItem[] = [
  {
    tag: "Sportsbook · Betslip",
    title: "Betslip, rebuilt end-to-end",
    desc: "Singles, multiples, teasers & bet builder — a full betslip solution redesigned for clarity and speed.",
    kind: "betslip",
  },
  {
    tag: "Sportsbook · Promotions",
    title: "Freebets & boosts",
    desc: "Apply freebets and boosters across all bet types, with clear confirmation flows.",
    kind: "freebets",
  },
  {
    tag: "Sportsbook · Trading",
    title: "Cash out",
    desc: "Automated & partial cash-out flows — designed for real-time decisions.",
    kind: "cashout",
  },
  {
    tag: "Sportsbook · Discovery",
    title: "Global search & in-play",
    desc: "Events, leagues, players & markets — unified search with live odds.",
    kind: "search",
  },
];

/** Achievements — hero metrics gold, secondary bordeaux (docs/07 Ch.6). */
export interface Achievement {
  label: string;
  metric: string;
  context: string;
  hero?: boolean;
}

export const achievements: Achievement[] = [
  {
    label: "ROI · 19 change requests",
    metric: "250%",
    context: "Return delivered on prioritised product change at Fitzdares, with GGR growth alongside.",
    hero: true,
  },
  {
    label: "Market launches · 2023–25",
    metric: "3",
    context: "Canada sportsbook & casino, UK replatform, and Fitzdares' new platform under a Gibraltar licence.",
    hero: true,
  },
  {
    label: "Gibraltar setup · 2025",
    metric: "Gibraltar",
    context: "Relocated by Fitzdares to establish its operation under a Gibraltarian licence.",
  },
  {
    label: "Migration",
    metric: "UKGC",
    context: "UK business migrated to a new tech provider under UKGC compliance.",
  },
  {
    label: "Infrastructure",
    metric: "Cloud",
    context: "Office data & finance migrated off legacy drives to the cloud.",
  },
];

/** Leadership scope (docs/07 Ch.8). */
export const leadership = [
  { title: "Roadmap ownership", desc: "End-to-end product lifecycle — strategy to delivery." },
  { title: "Cross-functional teams", desc: "Product, design, engineering, ops & trading, aligned." },
  { title: "Board & C-level", desc: "Cases, trade-offs and outcomes, argued at board level." },
  { title: "IT & operations", desc: "Infrastructure, vendors and compliance behind the product." },
];

/** Skills & tools (docs/07 Ch.10–11). */
export const skills = [
  { cluster: "Product strategy", items: "Roadmaps · prioritisation · P&L cases · market launches" },
  { cluster: "UX & research", items: "UCD · journeys · IA · lean research · workshops" },
  { cluster: "Design systems", items: "Multi-brand theming · tokens · component libraries" },
  { cluster: "Delivery", items: "Migrations · replatforming · CMS · roll-outs" },
];

export const technologies = [
  "Figma", "Sketch", "Axure", "Adobe XD", "Jira", "Confluence",
  "Contentful", "HTML/CSS", "Analytics", "Maxymiser",
];

/** Recognition (docs/05 Ch.12 — certifications). */
export const recognition = [
  { title: "BCS Certificate in Requirements Engineering", org: "QA", year: "2015" },
  { title: "Maxymiser Technical Training", org: "maxBADGES-12707655", year: "2015" },
  { title: "UX Fundamentals", org: "QA Ltd", year: "" },
];
