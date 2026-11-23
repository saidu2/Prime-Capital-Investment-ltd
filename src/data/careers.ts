/**
 * Careers page content.
 *
 * DRAFT COPY — written 2026-11-21 at the owner's request. Before going live:
 *  - TESTIMONIALS: each staff member must read and approve the quote
 *    attributed to them (they are drafts, not their words yet).
 *  - BENEFITS: HR must confirm every item is actually offered.
 * Photos for testimonials are pending from the owner (monograms until then).
 */

export const CAREERS_INTRO = {
  eyebrow: "Life at Prime Capital",
  title: "People who treat capital as a trust",
  paragraphs: [
    "At Prime Capital, we believe the quality of our people is the clearest measure of the quality of our stewardship. Every mandate we manage rests on sound judgement, quiet discipline and absolute integrity, and those qualities live in people, not processes.",
    "That is why we look for professionals with intellectual curiosity, a respect for detail and the character to do the right thing when no one is watching. Explore exciting career opportunities at Prime Capital and become part of a team that's shaping the future of finance.",
  ],
  image: "/careers-team.jpg",
  imageFocus: "50% 30%",
};

export const CULTURE_BLOCKS = [
  {
    title: "We work as one team",
    paragraphs: [
      "Prime Capital is a close-knit firm by design. Research, portfolio management, operations, compliance and technology sit side by side, so ideas move quickly and every voice is heard.",
      "We challenge each other's thinking, celebrate each other's wins, and never let a colleague carry a hard problem alone.",
    ],
    image: "/careers-teamwork.jpg",
    imageFocus: "55% 40%",
  },
  {
    title: "We grow people, not just portfolios",
    paragraphs: [
      "From early on, you work on live mandates alongside experienced professionals who take the time to explain the thinking behind every decision.",
      "We encourage continuous learning and professional development, because the best way to build a career in asset management is to practise it, with the right support around you.",
    ],
    image: "/career-mentoring.jpg",
    imageFocus: "50% 35%",
  },
  {
    title: "We hold ourselves to a gold standard",
    paragraphs: [
      "As a SEC-regulated firm, excellence and transparency are not slogans for us; they are daily habits. We do things properly, document them carefully and are proud to explain them.",
      "If you value precision, integrity and accountability, you will feel at home here.",
    ],
    image: "/career-standard.jpg",
    imageFocus: "50% 45%",
  },
];

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  /** Empty until the owner supplies a photo — a monogram is shown. */
  photo: string;
};

/** DRAFT — awaiting each staff member's approval. */
export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Saadah Sambo",
    role: "Head, Private Wealth & Investment",
    quote:
      "Prime Capital gave me real ownership early. I work on research that genuinely shapes portfolio decisions, and the senior team always takes time to explain the 'why' behind every call. It is demanding, in the best possible way.",
    photo: "",
  },
  {
    name: "Oluwatosin Idowu",
    role: "Senior Associate, Operations",
    quote:
      "In operations and compliance the details matter, and here they are respected. There is a culture of doing things properly, of asking questions and of supporting one another to get it right. I have grown more in this role than I imagined.",
    photo: "",
  },
  {
    name: "Saidu Safiyanu",
    role: "Head of ICT",
    quote:
      "Keeping a regulated investment firm secure and running smoothly is a serious responsibility, and I am trusted with it. Technology is treated as part of how we serve our clients, which makes the work meaningful and the learning constant.",
    photo: "",
  },
];

/** DRAFT — HR to confirm each benefit before launch. */
export const BENEFITS = [
  { icon: "wallet", label: "Competitive Compensation" },
  { icon: "graduation", label: "Learning & Development" },
  { icon: "award", label: "Professional Certification Support" },
  { icon: "users", label: "Mentorship & Leadership Growth" },
  { icon: "building", label: "Conducive Work Environment" },
  { icon: "heart", label: "Health & Wellbeing" },
] as const;

/** DRAFT (2026-11-23) — "Why Join" cards; owner/HR to approve wording. */
export const WHY_JOIN = [
  {
    icon: "shield",
    title: "Stewardship",
    text: "Work where client capital is treated as a trust. Every decision is documented, disciplined and done properly.",
  },
  {
    icon: "award",
    title: "Best Talent",
    text: "Learn alongside experienced professionals from pensions, capital markets, law, finance and technology.",
  },
  {
    icon: "trending",
    title: "Real Responsibility",
    text: "Contribute to live mandates early, with the support and mentorship to grow into greater responsibility.",
  },
  {
    icon: "lightbulb",
    title: "Possibilities",
    text: "Help build an enduring investment institution and shape your career as Prime Capital grows.",
  },
] as const;

export type OpenRole = {
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  summary: string;
};

/**
 * DRAFT (2026-11-23) — suggested openings, shown alongside any roles posted
 * through the admin. HR must confirm each role (or delete it) before launch.
 */
export const OPEN_ROLES: OpenRole[] = [
  {
    title: "Investment Analyst",
    department: "Investments",
    location: "Abuja",
    type: "Full-time",
    experience: "2+ Years Experience",
    summary:
      "Support portfolio management with macro, credit and issuer research, allocation reviews and client reporting across money market, fixed income and equities.",
  },
  {
    title: "Relationship Manager, Private Wealth",
    department: "Private Wealth & Investment",
    location: "Abuja",
    type: "Full-time",
    experience: "4+ Years Experience",
    summary:
      "Build and serve relationships with high-net-worth individuals and families, from onboarding and mandate setting to ongoing portfolio reviews.",
  },
  {
    title: "Fund Accountant",
    department: "Finance & Operations",
    location: "Abuja",
    type: "Full-time",
    experience: "3+ Years Experience",
    summary:
      "Own fund valuation, reconciliations with custodians, fee computation and financial reporting under strict controls and timelines.",
  },
];
