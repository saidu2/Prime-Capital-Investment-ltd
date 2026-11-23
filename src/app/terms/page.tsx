import { ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { TermsToc } from "@/components/legal/terms-toc";
import { Reveal } from "@/components/motion/reveal";
import { Navigation } from "@/components/navigation";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Website Use Policy",
  description:
    "Read the Website Use Policy for Prime Capital & Investment Limited, governing your use of primecapital.ng.",
  alternates: { canonical: "https://primecapital.ng/terms" },
  robots: { index: false, follow: false },
};

/* ------------------------------------------------------------------ */
/* Policy text — verbatim from the previous page (legally reviewed).   */
/* ------------------------------------------------------------------ */

type Block =
  | { p: string; strong?: boolean }
  | { ul: string[]; tone?: "dont" }
  | { callout: string }
  | { sub: string; blocks: Block[] };

const SECTIONS: { id: string; title: string; blocks: Block[] }[] = [
  {
    id: "introduction",
    title: "Introduction",
    blocks: [
      {
        // NOTE(owner): this sentence ends mid-way ("bound by this") in the
        // original text; confirm the intended ending (e.g. "this Policy.").
        p: "This Website Use Policy governs access to and use of Prime Capital & Investment Ltd's website. The Website is provided for general information purposes relating to our asset and fund management, financial advisory, and related services. This Policy is issued in line with the Investments and Securities Act, SEC Rules and Regulations, the Nigerian Data Protection Act 2023 (NDPA), and other applicable laws and regulatory guidelines in Nigeria. By accessing or using our Website, you agree to be bound by this",
      },
    ],
  },
  {
    id: "regulatory-status",
    title: "Regulatory Status and No Offer Disclaimer",
    blocks: [
      {
        p: "Prime Capital & Investment Limited is registered and regulated by the Securities and Exchange Commission (SEC) Nigeria as a Funds/Portfolio Manager and Financial Adviser. Information on this Website does not constitute:",
      },
      {
        ul: [
          "An offer, solicitation, or invitation to buy or sell securities or other financial instruments; or",
          "Investment, legal, tax, or other professional advice.",
        ],
      },
      {
        p: "Investment decisions should only be made based on approved offer documents, prospectuses, mandates, and professional advice specific to your circumstances, in compliance with SEC Rules.",
      },
    ],
  },
  {
    id: "permitted-use",
    title: "Permitted Use of the Website",
    blocks: [
      {
        p: "Users may access and use the Website solely for lawful purposes, including:",
      },
      {
        ul: [
          "Obtaining general information about the Company, its services, and regulatory disclosures;",
          "Making lawful enquiries or contacting the Company through approved channels.",
        ],
      },
      { p: "You agree not to:", strong: true },
      {
        tone: "dont",
        ul: [
          "Use the Website in any manner that breaches applicable laws or SEC regulations;",
          "Misrepresent your identity or provide false information;",
          "Interfere with the security, integrity, or performance of the Website;",
          "Upload or transmit viruses, malicious code, or harmful content;",
          "Use the Website to promote unauthorized financial products or schemes.",
        ],
      },
    ],
  },
  {
    id: "investment-risk",
    title: "Investment Risk Disclosure",
    blocks: [
      {
        callout:
          "All investments involve risk, including the possible loss of capital. Past performance is not a guarantee of future results. The value of investments may fluctuate due to market, economic, regulatory, and other factors. The Company does not guarantee returns on any investment except as may be expressly stated in SEC-approved documentation, where permitted by law.",
      },
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    blocks: [
      {
        p: "All content on the Website, including text, graphics, logos, trademarks, reports, and documents, is owned by or licensed to the Company and is protected by applicable intellectual property laws. No content may be copied, reproduced, distributed, modified, or used for commercial purposes without the Company's prior written consent, except as permitted by law.",
      },
    ],
  },
  {
    id: "data-protection",
    title: "Data Protection and Privacy",
    blocks: [
      {
        p: "The Company is committed to protecting personal data in accordance with the Nigerian Data Protection Act 2023 and applicable regulations.",
      },
      {
        sub: "Collection of Personal Data",
        blocks: [
          {
            p: "We may collect personal data such as names, contact details, IP addresses, and other information voluntarily provided through the Website.",
          },
        ],
      },
      {
        sub: "Use of Personal Data",
        blocks: [
          { p: "Personal data collected via the Website may be used to:" },
          {
            ul: [
              "Respond to enquiries and communications;",
              "Provide information about our services;",
              "Meet legal, regulatory, and compliance obligations;",
              "Improve Website functionality and user experience.",
            ],
          },
        ],
      },
      {
        sub: "Data Security",
        blocks: [
          {
            p: "Appropriate technical and organizational measures are implemented to safeguard personal data against unauthorized access, loss, misuse, or disclosure.",
          },
        ],
      },
      {
        sub: "Data Subject Rights",
        blocks: [
          {
            p: "Users have rights under the NDPA, including the right to access, rectify, erase, or restrict processing of their personal data, subject to legal and regulatory requirements. Further details are contained in our Privacy Notice, which forms part of this Policy.",
          },
        ],
      },
    ],
  },
  {
    id: "cookies",
    title: "Cookies and Tracking Technologies",
    blocks: [
      {
        p: "The Website may use cookies and similar technologies to enhance functionality and analyze usage. Users may manage cookie preferences through their browser settings.",
      },
    ],
  },
  {
    id: "third-party-links",
    title: "Third-Party Links",
    blocks: [
      {
        p: "The Website may contain links to third-party websites for convenience. The Company does not control or endorse such websites and is not responsible for their content, accuracy, or data protection practices.",
      },
    ],
  },
  {
    id: "limitation-of-liability",
    title: "Limitation of Liability",
    blocks: [
      {
        p: "To the fullest extent permitted by law, the Company shall not be liable for any loss, damage, or expense arising from:",
      },
      {
        ul: [
          "Use of or inability to use the Website;",
          "Reliance on information provided on the Website;",
          "Errors, omissions, interruptions, or security breaches.",
        ],
      },
      {
        p: "Nothing in this Policy excludes liability that cannot be excluded under Nigerian law.",
      },
    ],
  },
  {
    id: "compliance",
    title: "Compliance and Monitoring",
    blocks: [
      {
        p: "Use of the Website may be monitored to ensure compliance with this Policy, SEC Rules, and applicable laws. Any misuse may result in access restriction and, where necessary, regulatory or legal action.",
      },
    ],
  },
  {
    id: "amendments",
    title: "Amendments",
    blocks: [
      {
        p: "The Company reserves the right to amend this Policy at any time to reflect changes in law, regulation, or business practices. Updated versions will be posted on the Website and become effective upon publication.",
      },
    ],
  },
  {
    id: "governing-law",
    title: "Governing Law and Jurisdiction",
    blocks: [
      {
        p: "This Policy shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Nigerian courts shall have exclusive jurisdiction over any disputes arising from use of the Website.",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */

function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((b) => {
        if ("p" in b)
          return (
            <p
              key={b.p}
              className={`text-[16px] leading-[1.85] ${b.strong ? "font-semibold text-ink" : "text-text-muted-dark"}`}
            >
              {b.p}
            </p>
          );
        if ("ul" in b)
          return (
            <ul key={b.ul[0]} className="space-y-3">
              {b.ul.map((li) => (
                <li
                  key={li}
                  className="flex gap-4 text-[16px] leading-[1.8] text-text-muted-dark"
                >
                  <span
                    aria-hidden
                    className={`mt-[0.7em] block h-1.5 w-1.5 shrink-0 rotate-45 ${b.tone === "dont" ? "bg-ink" : "bg-gold-refined"}`}
                  />
                  {li}
                </li>
              ))}
            </ul>
          );
        if ("callout" in b)
          return (
            <div
              key={b.callout.slice(0, 30)}
              className="relative border-l-2 border-gold-refined bg-paper p-6 md:p-8"
            >
              <p className="font-display text-[1.15rem] leading-[1.7] text-ink">
                {b.callout}
              </p>
            </div>
          );
        return (
          <div key={b.sub} className="border-t border-ink/10 pt-6">
            <h3 className="mb-4 font-display text-[1.2rem] font-normal text-ink">
              {b.sub}
            </h3>
            <Blocks blocks={b.blocks} />
          </div>
        );
      })}
    </div>
  );
}

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navigation />
      <PageHero
        title="Website Use Policy"
        crumb="Website Use Policy"
        image="/hero-2.jpg"
        focus="60% 40%"
        eyebrow="Legal"
      />

      <section className="px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-12 lg:gap-20">
          <aside className="hidden lg:col-span-4 lg:block">
            <div className="sticky top-28">
              <TermsToc
                sections={SECTIONS.map(({ id, title }) => ({ id, title }))}
              />
            </div>
          </aside>

          <div className="min-w-0 lg:col-span-8">
            {SECTIONS.map((s) => (
              <Reveal
                as="section"
                key={s.id}
                y={18}
                className="border-b border-ink/10 py-12 first:pt-0 last:border-b-0"
              >
                <div id={s.id} className="scroll-mt-32">
                  <h2 className="mb-6 font-display text-[1.7rem] font-normal leading-tight tracking-tight text-ink md:text-[2.1rem]">
                    {s.title}
                  </h2>
                  <Blocks blocks={s.blocks} />
                </div>
              </Reveal>
            ))}

            <div className="mt-14 flex flex-col items-start gap-4 border-t border-ink/10 pt-10 sm:flex-row sm:items-center sm:justify-between">
              <span className="inline-flex items-center gap-2.5 bg-ink px-5 py-3 text-[12px] font-bold uppercase tracking-[0.16em] text-white">
                <ShieldCheck aria-hidden className="h-4 w-4 text-gold-soft" />
                SEC Regulated • NDPA Compliant
              </span>
              <p className="text-[13px] text-text-muted-dark">
                Prime Capital & Investment Ltd. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
