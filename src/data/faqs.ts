/**
 * DRAFT (2026-11-23) — answers are built only from facts already on the site
 * and in the Corporate Profile deck. Compliance to review before launch.
 * Deliberately no minimum amounts, rates or fees — add only approved figures.
 */
export type Faq = { q: string; a: string };
export type FaqGroup = { id: string; title: string; items: Faq[] };

export const FAQ_GROUPS: FaqGroup[] = [
  {
    id: "about",
    title: "About Prime Capital",
    items: [
      {
        q: "Who is Prime Capital & Investment Limited?",
        a: "Prime Capital & Investment Limited is an Abuja-based Fund and Portfolio Management firm providing asset management and advisory services to individuals, families and institutions across Nigeria.",
      },
      {
        q: "Is Prime Capital regulated?",
        a: "Yes. We are registered and regulated by the Securities and Exchange Commission (SEC) Nigeria as a Funds/Portfolio Manager and Financial Adviser (SEC Registration No.: SEC/REMI/REG/3095/2026), and operate in accordance with the Investments & Securities Act and applicable SEC Rules. You can verify any registered entity directly with the SEC at www.sec.gov.ng.",
      },
      {
        q: "Who do you serve?",
        a: "High-net-worth individuals and families, corporate clients, pension and institutional investors, and public-sector entities.",
      },
      {
        q: "Where are you located?",
        a: "Our head office is at No. 3, Sankuru Close, Off Rima Street, Maitama, Abuja. We serve clients across Nigeria, and meetings outside office hours can be arranged in advance.",
      },
    ],
  },
  {
    id: "investing",
    title: "Investing With Us",
    items: [
      {
        q: "What services do you offer?",
        a: "Four service lines: Fund & Portfolio Management, Private Wealth Management, Investment Advisory, and Corporate & Institutional solutions, across money market instruments, fixed income, equities, ethical and Shari'ah-compliant products and alternative investments.",
      },
      {
        q: "What is the difference between discretionary and non-discretionary portfolios?",
        a: "In a discretionary mandate we manage your portfolio within the objectives and risk limits agreed with you. In a non-discretionary (advisory) arrangement we provide portfolio reviews, asset allocation advice and transaction support, and you retain decision authority.",
      },
      {
        q: "Do you offer Shari'ah-compliant investments?",
        a: "Yes. Our ethical and Shari'ah-compliant products include Sukuk, Murabaha, Musharakah, Mudarabah and Ijarah-based investments.",
      },
      {
        q: "How do you manage risk?",
        a: "Capital preservation comes first. Risk budgets, liquidity floors and drawdown limits are agreed at onboarding, allocations are research-led and reviewed monthly, and decisions above delegated limits are escalated to the Board's Finance & Investment Committee.",
      },
    ],
  },
  {
    id: "accounts",
    title: "Accounts & Onboarding",
    items: [
      {
        q: "How do I open an account?",
        a: "Choose Open Account at the top of any page and select an Individual or Corporate account to complete the application form. Our team will then contact you to complete onboarding and agree your mandate.",
      },
      {
        q: "What documents will I need?",
        a: "As a regulated firm we are required to complete Know-Your-Customer (KYC) checks. Our team will confirm the exact documents for your account type, typically valid identification, proof of address and, for corporates, company registration documents and details of directors and signatories.",
      },
      {
        q: "Is there a minimum investment?",
        a: "Minimums depend on the product and mandate. Please contact our team for current details.",
      },
    ],
  },
  {
    id: "safety",
    title: "Safety, Reporting & Fees",
    items: [
      {
        q: "Who holds my money?",
        a: "Independent custodians hold client assets; Prime Capital manages the investments. This separation is a core part of how we protect client capital.",
      },
      {
        q: "How will I know how my investments are performing?",
        a: "We report against agreed benchmarks and show you your holdings, performance and costs throughout the mandate.",
      },
      {
        q: "What fees do you charge?",
        a: "Fees depend on the service and mandate and are agreed with you in writing. We disclose every fee and transaction cost, with no hidden charges.",
      },
      {
        q: "How is my personal information protected?",
        a: "We handle client information with strict confidentiality, in line with the Nigeria Data Protection Act 2023. See our Privacy Notice for details.",
      },
    ],
  },
];
