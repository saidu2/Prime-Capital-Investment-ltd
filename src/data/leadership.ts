/**
 * Leadership data.
 *
 * Source of truth (2026-11-22): the owner's "Prime Capital Corporate Profile"
 * deck — five directors and a nine-member management committee, in the
 * deck's order and with its titles. Biographies are the deck's wording,
 * except: Kunle J. Adeboye (his own approved website profile) and Bashir /
 * Maryam (their longer approved website bios, consistent with the deck).
 *
 * In `fullInfo`, a blank line starts a new paragraph in the profile modal.
 * A `photo` of "" shows gold initials until a photo is supplied.
 */

export type Person = {
  name: string;
  role: string;
  bio: string;
  photo: string;
  fullInfo: string;
};

const KUNLE: Person = {
  name: "Kunle J. Adeboye",
  role: "Managing Director/Chief Executive Officer",
  bio: "Managing Director and Chief Executive Officer with more than 25 years of executive experience across asset management, pensions, financial services and consumer markets.",
  photo: "/kunle-ceo.jpeg",
  // Verbatim from the owner's "Kunle J. Adeboye Website Profile" (2026-11-21).
  fullInfo: [
    "Kunle J. Adeboye is Managing Director and Chief Executive Officer of Prime Capital & Investment Ltd. He has more than 25 years of executive experience across asset management, pensions, financial services and consumer markets, with a career spanning institutional leadership, investment oversight, business transformation and growth.",
    "A pioneer professional in Nigeria’s Contributory Pension Scheme, Kunle contributed to the growth and development of two Pension Fund Administrators and subsequently provided executive leadership at another PFA. Over the course of his career, he has contributed to the management and strategic oversight of pension and investment assets in excess of ₦200 billion.",
    "Kunle is a graduate of the University of Ibadan and holds an MBA in Strategic Business Management. He is a Certified Management Consultant and a Fellow of both the Institute of Management Consultants and the Chartered Institute of Loan & Risk Management of Nigeria.",
    "In 2018, he was selected among 70 distinguished alumni featured in the University of Ibadan’s 70th Anniversary celebrations, in recognition of professional excellence and national impact. In his spare time, Kunle writes on leadership, governance and national development, contributing to the wider conversation on Nigeria’s institutional and economic progress.",
    "At Prime Capital, Kunle is focused on building an enduring investment institution anchored on disciplined growth, sound governance and long-term value creation for clients and stakeholders.",
  ].join("\n\n"),
};

export const BOARD: Person[] = [
  {
    name: "Rebo Usman Ehwan",
    role: "Chairman",
    bio: "40+ years in finance. FCA, FCTI. Former Taraba State Finance Commissioner.",
    photo: "/rebo-ehwan.jpg",
    fullInfo:
      "Financial stewardship. 40+ years in professional practice, investment management and public administration. Managing Partner, Rebo Usman & Co., since 1993. Former Taraba State Finance Commissioner and Chairman, Forum of Commissioners of Finance of Nigeria. Previously Financial Controller, Gongola Investment Company. ECWA Portfolio Management Limited board member. Chartered accountant and tax consultant. Fellow of ICAN and CITN (FCA, FCTI). HND Accountancy, Kaduna Polytechnic.",
  },
  KUNLE,
  {
    name: "Bashir Haliru Tahir",
    role: "Non-Executive Director",
    bio: "Contributes strategic oversight, governance insight, and risk management expertise. Founder of a real estate construction company and aviation professional with over 15 years of experience.",
    photo: "/haliru.jpeg",
    fullInfo:
      "Haliru Bashir Tahir serves as a Non-Executive Director on the Board of Prime Capital & Investment Limited, where he contributes strategic oversight, governance insight, and risk management expertise. He holds a degree in Aerospace and Occupational Safety from Embry-Riddle Aeronautical University, Florida. He is the Founder of a real estate construction company focused on the development of modern and sustainable residential properties in Abuja, reflecting a strong commitment to long-term value creation and responsible development. With over 15 years of experience in the aviation sector, Mr. Tahir has held senior roles as a corporate pilot, aviation safety professional, and aircraft management specialist. His background brings a strong perspective on operational leadership, safety standards, and risk management, which supports effective board-level decision-making at Prime Capital & Investment Limited.",
  },
  {
    name: "Maryam Ibrahim Buwai",
    role: "Non-Executive Director",
    bio: "Seasoned governance and management professional with over 18 years of leadership experience in institutional administration and executive oversight.",
    photo: "/maryam.jpeg",
    fullInfo:
      "Maryam Ibrahim Buwai is a seasoned governance and management professional with over 18 years of leadership experience in institutional administration and executive oversight. She holds a BSc in Management Sciences from Usmanu Danfodio University, Sokoto. She has built a distinguished career within Nigeria’s hospitality and tourism sector, with particular expertise in the commercialization of public tourism and hospitality assets, contributing to sustainable operational and financial outcomes. As a Non-Executive Director at Prime Capital & Investment Limited, Ms. Buwai provides independent oversight and strategic input, supporting strong governance, effective risk management, and operational efficiency. Her objective judgment strengthens board decision-making, regulatory compliance, and long-term investor confidence.",
  },
  {
    name: "Ibrahim Shehu Kangiwa",
    role: "Non-Executive Director",
    bio: "25+ years in finance and pensions. Former Head of Investment Supervision, PenCom.",
    photo: "/ibrahim-kangiwa-studio.jpg",
    fullInfo:
      "Investment supervision. 25+ years in financial services and investments, including 16+ years at PenCom. As Head of Investment Supervision, oversaw investment regulation and reviews of ₦18tn+ in pension assets. Previously at the Nigerian Investment Promotion Commission. MBA and BSc Management Studies, Usmanu Danfodiyo University, Sokoto. Passed CFA Program Level II. London Business School alumnus with training at the World Bank and Federal Reserve Bank, USA.",
  },
];

export const MANAGEMENT: Person[] = [
  KUNLE,
  {
    name: "Musa Sani",
    role: "Head of Investments",
    bio: "Portfolio management, investment research and risk management.",
    // TODO(owner): no photo in the corporate profile deck — gold initials until supplied.
    photo: "",
    fullInfo:
      "Portfolio management. 13+ years across pensions and investment management. Portfolio Manager, Nigerian University Pension Management Company, since November 2024, and previously Portfolio Manager/Investment Research Analyst there (2019–2023). Business Manager, Trustfund Pensions Plc (2013–2019). MSc Energy Economics and Law, University of Aberdeen, and Master of Islamic Banking and Finance, Bayero University Kano. Member, Institute of Chartered Economists of Nigeria.",
  },
  {
    name: "Buhari Suleiman Alfa",
    role: "Company Secretary & Compliance Officer",
    bio: "Legal advice, regulatory compliance and company secretarial services.",
    photo: "/buhar.jpeg",
    fullInfo:
      "Legal and regulatory oversight. Responsible for legal advice, compliance and company secretarial services. Former Managing Associate, DalaHill Law Practice, and Senior Legal Officer, Abuja Investments Company Limited. LLB and Master’s in Business and Commercial Law, Bayero University, Kano. Member of the Nigerian Bar Association and Chartered Institute of Loan and Risk Management.",
  },
  {
    name: "Saadah Sambo",
    role: "Head, Private Wealth & Investment",
    bio: "Investment research, portfolio support and business management.",
    photo: "/saadah.jpeg",
    fullInfo:
      "Investment research and portfolio support. Experience in investment analysis and asset management operations at CardinalStone Asset Management Limited. First-Class Honours in Business Entrepreneurship, Effat University, Jeddah, and Master’s in Business Management, University of Essex. Supports investment decisions through research, portfolio analysis and business management.",
  },
  {
    name: "Zinatu Atiku",
    role: "Head of Operations & Human Resources",
    bio: "Fund administration, client service and people management and development.",
    photo: "/zinatu-atiku-studio.jpg",
    fullInfo:
      "Fund administration, client service and people management and development.",
  },
  {
    name: "Daniel Clement Adamu",
    role: "Head of Finance",
    bio: "Financial reporting, treasury, budgeting and controls.",
    photo: "/daniel-adamu-studio.jpg",
    fullInfo: "Financial reporting, treasury, budgeting and controls.",
  },
  {
    name: "Saidu Safiyanu",
    role: "Head of ICT",
    bio: "Network design, systems implementation and IT infrastructure.",
    photo: "/saidu-studio.jpg",
    fullInfo:
      "Technology infrastructure. Expertise in network design, systems implementation and infrastructure support. Former Senior Systems Programmer (Network Engineer), Ahmadu Bello University, with earlier network engineering and security roles. BEng Electrical Engineering and Diploma in Computer Engineering, Ahmadu Bello University. Certifications: CCNA, CCNP, HCIA and HCIP.",
  },
  {
    name: "Husseinat Alabi",
    role: "Head of Administration",
    bio: "Corporate services and procurement, with legal and compliance support.",
    photo: "/hussaina.jpeg",
    fullInfo:
      "Administration and legal support. LLB, University of Ilorin, and BL (Second-Class Upper Division), Nigerian Law School. Legal internships at Gas Aggregation Company of Nigeria through the NYSC and at Omaplex Law Firm covered legal documentation, compliance and administration. Supports administration and regulatory compliance.",
  },
  {
    name: "Ugochukwu Udorji",
    role: "Head of Internal Audit",
    bio: "Independent assurance reporting to the Audit & Risk Committee.",
    photo: "/ugochukwu-udorji-studio.jpg",
    fullInfo: "Independent assurance reporting to the Audit & Risk Committee.",
  },
  // Not on the management committee in the Corporate Profile deck; kept on
  // the team at the owner's request (2026-11-22).
  {
    name: "Oluwatosin Idowu",
    role: "Senior Associate, Operations",
    bio: "She is a qualified legal practitioner. She holds an LL.B from the University of Lagos. She is also a SEC-Sponsored Individual. She has several years of professional experience across private legal practice, corporate advisory, and public sector service, with a strong focus on legal compliance, due diligence, and corporate governance. Her experience includes company secretarial services, drafting and review of contracts and legal opinions, regulatory and statutory documentation, handling of confidential records, and client advisory and representation. At Prime Capital, she is supports funds operations and regulatory compliance.",
    photo: "/tosin.jpeg",
    fullInfo:
      "She is a qualified legal practitioner. She holds an LL.B from the University of Lagos. She is also a SEC-Sponsored Individual. She has several years of professional experience across private legal practice, corporate advisory, and public sector service, with a strong focus on legal compliance, due diligence, and corporate governance. Her experience includes company secretarial services, drafting and review of contracts and legal opinions, regulatory and statutory documentation, handling of confidential records, and client advisory and representation. At Prime Capital, she is supports funds operations and regulatory compliance.",
  },
];
