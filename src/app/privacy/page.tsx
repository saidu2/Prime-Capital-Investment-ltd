import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { PolicyDocument, type PolicySection } from "@/components/legal/policy";
import { Navigation } from "@/components/navigation";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description:
    "How Prime Capital & Investment Limited collects, uses, protects and shares personal data, in line with the Nigeria Data Protection Act 2023.",
  alternates: { canonical: "https://primecapital.ng/privacy" },
};

/*
 * DRAFT (2026-11-23) — prepared as a structure aligned with the Nigeria Data
 * Protection Act 2023 (NDPA) and the firm's existing Website Use Policy.
 * MUST be reviewed and approved by the Company Secretary & Compliance
 * Officer / Data Protection Officer before launch. TODO(owner): effective
 * date and DPO contact email.
 */
const EFFECTIVE = "To be confirmed";
const DPO_EMAIL = "info@primecapital.ng";

const SECTIONS: PolicySection[] = [
  {
    id: "who-we-are",
    title: "Who We Are",
    blocks: [
      {
        p: "Prime Capital & Investment Limited (“Prime Capital”, “we”, “us”) is registered and regulated by the Securities and Exchange Commission (SEC) Nigeria as a Funds/Portfolio Manager and Financial Adviser (SEC Registration No.: SEC/REMI/REG/3095/2026). Our head office is at No. 3, Sankuru Close, Off Rima Street, Maitama, Abuja, Nigeria.",
      },
      {
        p: "We are the data controller for the personal data described in this Privacy Notice, which forms part of our Website Use Policy. It explains what personal data we collect, why we use it, who we share it with and the rights you have under the Nigeria Data Protection Act 2023 (NDPA).",
      },
    ],
  },
  {
    id: "data-we-collect",
    title: "Personal Data We Collect",
    blocks: [
      {
        sub: "Information you give us",
        blocks: [
          {
            ul: [
              "Identity and contact details: name, date of birth, address, email address and telephone number;",
              "Know-Your-Customer (KYC) information: means of identification, BVN, utility bills and other documents required by law;",
              "Financial information: bank details, source of funds, investment objectives and risk profile;",
              "Corporate client information: company registration details and the details of directors, signatories and beneficial owners;",
              "Correspondence: enquiries, messages and job applications you send to us.",
            ],
          },
        ],
      },
      {
        sub: "Information collected automatically",
        blocks: [
          {
            p: "When you visit our Website we may collect technical data such as your IP address, browser type, device information and pages visited, through cookies and similar technologies.",
          },
        ],
      },
    ],
  },
  {
    id: "lawful-basis",
    title: "Why We Use Your Data and Our Lawful Basis",
    blocks: [
      {
        p: "We process personal data only where we have a lawful basis under the NDPA, including:",
      },
      {
        ul: [
          "Contract: to open and administer your account and manage your investment mandate;",
          "Legal obligation: to meet SEC Rules, anti-money laundering and counter-terrorist financing (AML/CFT) requirements, tax and other regulatory obligations;",
          "Legitimate interests: to run, secure and improve our business and Website, and to protect against fraud;",
          "Consent: for marketing communications and non-essential cookies, which you may withdraw at any time.",
        ],
      },
    ],
  },
  {
    id: "sharing",
    title: "Who We Share Your Data With",
    blocks: [
      {
        p: "We do not sell personal data. We share it only where necessary, with:",
      },
      {
        ul: [
          "Regulators, law-enforcement and government authorities, including the SEC and the Nigerian Financial Intelligence Unit, where required by law;",
          "Independent custodians, banks and other counterparties involved in managing your investments;",
          "Professional advisers, auditors and service providers who process data on our behalf under contract and confidentiality obligations.",
        ],
      },
      {
        p: "Where personal data is transferred outside Nigeria, we do so only in accordance with the NDPA and with appropriate safeguards.",
      },
    ],
  },
  {
    id: "retention",
    title: "How Long We Keep Your Data",
    blocks: [
      {
        p: "We keep personal data only for as long as necessary for the purposes described in this Notice, including to satisfy legal, regulatory, accounting and reporting requirements. Records relating to client accounts and transactions are retained for the periods required by applicable law and regulation, after which they are securely deleted or anonymised.",
      },
    ],
  },
  {
    id: "security",
    title: "How We Protect Your Data",
    blocks: [
      {
        p: "Appropriate technical and organisational measures are implemented to safeguard personal data against unauthorised access, loss, misuse or disclosure, including access controls, secure infrastructure, confidentiality obligations for staff and governance oversight.",
      },
    ],
  },
  {
    id: "your-rights",
    title: "Your Rights",
    blocks: [
      {
        p: "Subject to legal and regulatory requirements, you have the right to:",
      },
      {
        ul: [
          "Be informed about how your personal data is used;",
          "Access the personal data we hold about you;",
          "Have inaccurate or incomplete data rectified;",
          "Request erasure or restriction of processing;",
          "Object to processing, including for direct marketing;",
          "Receive your data in a portable format;",
          "Withdraw consent at any time, where processing is based on consent.",
        ],
      },
      {
        callout:
          "If you are not satisfied with how we handle your personal data, you may also lodge a complaint with the Nigeria Data Protection Commission (NDPC).",
      },
    ],
  },
  {
    id: "cookies",
    title: "Cookies",
    blocks: [
      {
        p: "The Website may use cookies and similar technologies to enhance functionality and analyse usage. You may manage cookie preferences through your browser settings; disabling some cookies may affect how the Website works.",
      },
    ],
  },
  {
    id: "contact",
    title: "Contact Us",
    blocks: [
      {
        p: `To exercise your rights or ask a question about this Notice, contact our Data Protection Officer at ${DPO_EMAIL}, call +234 (0) 811 183 7348, or write to No. 3, Sankuru Close, Off Rima Street, Maitama, Abuja, Nigeria.`,
      },
    ],
  },
  {
    id: "changes",
    title: "Changes to This Notice",
    blocks: [
      {
        p: "We may update this Privacy Notice from time to time to reflect changes in law, regulation or our practices. The updated version will be posted on this page and becomes effective upon publication.",
      },
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navigation />
      <PageHero
        title="Privacy Notice"
        crumb="Privacy Notice"
        image="/hero-2.jpg"
        focus="60% 40%"
        eyebrow="Legal"
      />
      <PolicyDocument
        sections={SECTIONS}
        meta={
          <div className="mb-12 flex flex-wrap items-center gap-x-8 gap-y-2 border-b border-ink/10 pb-8 text-[14px] text-text-muted-dark">
            <span>
              <span className="font-semibold text-ink">Effective date:</span>{" "}
              {EFFECTIVE}
            </span>
            <span>
              Read alongside our{" "}
              <Link
                href="/terms"
                className="font-semibold text-ink underline decoration-gold-refined underline-offset-4 hover:text-gold-refined"
              >
                Website Use Policy
              </Link>
            </span>
          </div>
        }
      />
      <Footer />
    </div>
  );
}
