/**
 * DRAFT (2026-11-23) — "Our Journey" milestones, built only from facts in the
 * Corporate Profile deck and on the site. TODO(owner): add the incorporation
 * year and any other dated milestones; `when` may be a year or a short label.
 */
export type Milestone = { when: string; title: string; text: string };

export const HISTORY: Milestone[] = [
  {
    when: "Our Founding",
    title: "Prime Capital & Investment Limited is established",
    text: "An Abuja-based asset manager founded on disciplined expertise, unwavering integrity and a clear commitment to long-term wealth creation.",
  },
  {
    when: "2026",
    title: "Registered by the SEC",
    text: "Registered and regulated by the Securities and Exchange Commission as a Funds/Portfolio Manager and Financial Adviser (SEC/REMI/REG/3095/2026).",
  },
  {
    when: "Governance",
    title: "A five-member Board and three committees",
    text: "A non-executive-led Board chaired by Rebo Usman Ehwan, with Audit & Risk, Finance & Investment, and Governance, Nomination & Remuneration committees.",
  },
  {
    when: "Leadership",
    title: "Kunle J. Adeboye leads as MD/CEO",
    text: "Bringing 25+ years across asset management and pensions, supported by a nine-member management committee.",
  },
  {
    when: "Today",
    title: "Four service lines from Maitama, Abuja",
    text: "Fund & portfolio management, private wealth, investment advisory and corporate & institutional solutions for clients across Nigeria.",
  },
  {
    when: "Next",
    title: "The Investment Portal",
    text: "Secure, round-the-clock access to portfolios, statements and our team, coming soon.",
  },
];
