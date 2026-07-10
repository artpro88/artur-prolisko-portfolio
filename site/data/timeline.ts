export type Altitude = "Craft" | "Systems" | "Product · Systems" | "Product" | "Business";

export interface Role {
  slug: string;
  years: string;
  title: string;
  org: string;
  logo: string; // /logos/*.png — readable-on-light set (docs/asset-inventory.md)
  summary: string;
  milestones: string[];
  altitude: Altitude;
  current?: boolean;
}

/** Reverse chronological — latest first (docs/07 Ch.5). */
export const roles: Role[] = [
  {
    slug: "fitzdares-hop",
    years: "2023 — NOW",
    title: "Head of Product",
    org: "Fitzdares",
    logo: "/logos/fitzdares.png",
    summary:
      "Own the end-to-end product lifecycle — roadmap to delivery — driving growth and engagement across sportsbook & casino.",
    milestones: [
      "Relocated to Gibraltar (2025) to set up Fitzdares under a Gibraltarian licence",
      "Launched Sportsbook & Casino in Canada; replatformed the UK",
      "250% ROI across 19 change requests; board & C-level alignment",
    ],
    altitude: "Business",
    current: true,
  },
  {
    slug: "sg-senior-ux-lead",
    years: "2021 — 2023",
    title: "Senior UX Lead",
    org: "SG Digital",
    logo: "/logos/sg.png",
    summary:
      "Led design strategy for SG Digital's Sportsbook — scalable design systems across web, native & retail.",
    milestones: [
      "Owned design systems; cut time-to-theme across product families",
      "Redesigned & delivered the betslip end-to-end",
      "Aligned design with business & technical goals at C-level",
    ],
    altitude: "Product · Systems",
  },
  {
    slug: "sg-ux-architect",
    years: "2018 — 2021",
    title: "UI Designer / UX Architect",
    org: "SG Digital · Scientific Games",
    logo: "/logos/sg.png",
    summary:
      "Built design systems & theming into SG Digital's products; defined UX via UCD across products and back-offices.",
    milestones: [
      "Design systems for Sportsbook, Casino, Payments, KYC, PAM, retail kiosks",
      "Reduced technical debt; improved time-to-market",
      "Research, competitive analysis, prototyping, wireframing",
    ],
    altitude: "Systems",
  },
  {
    slug: "leovegas",
    years: "2018 · JAN — JUL",
    title: "UX/UI Designer",
    org: "LeoVegas",
    logo: "/logos/leovegas.png",
    summary:
      "Designed concepts & wireframes for a cohesive, mobile-first casino experience.",
    milestones: [
      "Defined & gathered requirements with stakeholders",
      "Rapid, lean research & workshops",
    ],
    altitude: "Systems",
  },
  {
    slug: "kindred-ux-architect",
    years: "2016 — 2018",
    title: "UX Architect",
    org: "Kindred Group",
    logo: "/logos/kindred.png",
    summary:
      "Designed experiences across major products, apps & websites — scalable, future-proof systems for a multi-brand enterprise.",
    milestones: [
      "15 brands / 30+ websites within Kindred Group",
      "User journeys, IA, card sorting, prototypes",
    ],
    altitude: "Systems",
  },
  {
    slug: "unibet-ux-lead",
    years: "2013 — 2016",
    title: "UX Delivery Lead",
    org: "Kindred · Unibet",
    logo: "/logos/unibet.png",
    summary:
      "Supported UX, Commercial & Product with multi-channel solutions; owned CMS features, roll-outs, migrations & maintenance.",
    milestones: [
      "Planned & managed roll-outs and product maintenance",
      "Key point for editorial & CMS requirements company-wide",
    ],
    altitude: "Craft",
  },
  {
    slug: "unibet-crm",
    years: "2011 — 2013",
    title: "CRM Manager",
    org: "Kindred · Unibet",
    logo: "/logos/unibet.png",
    summary:
      "Adapted centralised CRM to local markets; segmented campaigns for activation, retention & cross-sell.",
    milestones: [
      "#1 growth across 10 emerging markets (2012)",
      "Initiated UX-team changes that lifted the whole CRM org",
    ],
    altitude: "Craft",
  },
];
