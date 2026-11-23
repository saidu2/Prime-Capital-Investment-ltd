import { Landmark, ShieldCheck, Users, Workflow } from "lucide-react";
import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";

/* Wording from the owner's Corporate Profile deck (2026-11-22). */

const PILLARS = [
  {
    icon: Landmark,
    title: "Board of Directors",
    text: "Five directors, including the MD/CEO as the sole executive director, set strategy, approve risk appetite and monitor performance.",
  },
  {
    icon: Users,
    title: "Board Committees",
    text: "Three non-executive-led committees: Audit & Risk, Finance & Investment, and Governance, Nomination & Remuneration.",
  },
  {
    icon: Workflow,
    title: "Executive Management",
    text: "A nine-member committee, led by the MD/CEO, is accountable for execution, operating controls and client service.",
  },
  {
    icon: ShieldCheck,
    title: "Assurance & Compliance",
    text: "Internal Audit reports functionally to the Board Audit & Risk Committee, independently of management.",
  },
];

const COMMITTEES = [
  {
    name: "Audit & Risk Committee",
    membership:
      "Independent NED chair + two NEDs; Internal Audit attends; MD/CEO by invitation.",
    mandate:
      "Financial reporting, controls and risk; audit plan; regulatory and external audit matters.",
    cadence: "Quarterly",
    cadenceNote: "Plus pre-results and private Internal Audit sessions.",
  },
  {
    name: "Finance & Investment Committee",
    membership:
      "Independent NED chair + two directors; Investment and Finance heads attend.",
    mandate:
      "Investment policy, allocation and performance; transactions above delegated limits.",
    cadence: "Quarterly + Ad Hoc",
    cadenceNote: "Additional sessions for large transactions.",
  },
  {
    name: "Governance, Nomination & Remuneration Committee",
    membership: "NED chair + two NEDs; Head of Human Resources is secretary.",
    mandate:
      "Board composition and succession; appointments, remuneration and conflicts.",
    cadence: "Twice Yearly",
    cadenceNote: "Additional appointment or remuneration sessions.",
  },
];

function Label({ children }: { children: ReactNode }) {
  return (
    <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold-refined">
      {children}
    </p>
  );
}

/** Board page: how oversight works + the three standing committees. */
export function BoardGovernance() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink px-4 py-24 text-white sm:px-6 md:py-32 lg:px-8">
        <span
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(55%_60%_at_85%_0%,rgba(201,162,75,0.14),transparent_70%)]"
        />
        <span
          aria-hidden
          className="absolute inset-0 -z-10 opacity-[0.06] [background-image:repeating-linear-gradient(115deg,#c9a24b_0_1px,transparent_1px_90px)]"
        />
        <div className="mx-auto max-w-7xl">
          <Reveal className="grid items-end gap-8 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="text-[12px] font-bold uppercase tracking-[0.28em] text-gold-soft">
                Corporate Governance
              </p>
              <h2 className="mt-5 font-display text-[2.3rem] font-normal leading-[1.08] tracking-tight md:text-[3.5rem]">
                Board Oversight &amp;{" "}
                <em className="font-normal text-gold-soft">
                  Executive Accountability
                </em>
              </h2>
            </div>
            <p className="text-[17px] leading-[1.85] text-text-muted-light md:col-span-5">
              The Board defines strategy and risk appetite. Management executes
              the approved plan and remains accountable for daily operations.
            </p>
          </Reveal>

          <ul className="mt-16 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4 md:mt-20">
            {PILLARS.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 0.1} className="bg-ink">
                <div className="group h-full p-8 md:p-10">
                  <p.icon
                    aria-hidden
                    strokeWidth={1.1}
                    className="h-11 w-11 text-gold-refined transition-transform duration-700 ease-soft group-hover:-translate-y-1"
                  />
                  <h3 className="mt-8 font-display text-[1.4rem] font-normal leading-snug">
                    {p.title}
                  </h3>
                  <p className="mt-4 text-[15px] leading-[1.8] text-text-muted-light">
                    {p.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal className="mx-auto mt-16 max-w-3xl text-center md:mt-20">
            <p className="text-[12px] font-bold uppercase tracking-[0.28em] text-gold-soft">
              Governance Principle
            </p>
            <p className="mt-5 font-display text-[1.6rem] leading-snug md:text-[2.1rem]">
              The Board oversees. Management executes. Internal Audit provides
              independent assurance.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-white px-4 py-24 sm:px-6 md:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal className="grid items-end gap-8 md:grid-cols-12">
            <h2 className="font-display text-[2.3rem] font-normal leading-[1.08] tracking-tight text-ink md:col-span-7 md:text-[3.25rem]">
              Board Committee{" "}
              <em className="font-normal text-gold-refined">
                Responsibilities
              </em>
            </h2>
            <p className="text-[17px] leading-[1.85] text-text-muted-dark md:col-span-5">
              Three standing committees provide specialised oversight under
              Board-approved charters and non-executive chairs.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 md:mt-20 lg:grid-cols-3">
            {COMMITTEES.map((c, i) => (
              <Reveal
                key={c.name}
                delay={i * 0.12}
                className="group relative flex flex-col border border-ink/10 bg-paper p-8 transition-colors duration-700 hover:border-gold-refined/50 md:p-10"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gold-refined transition-transform duration-700 ease-soft group-hover:scale-x-100"
                />
                <h3 className="min-h-[2.6em] font-display text-[1.45rem] font-normal leading-snug text-ink">
                  {c.name}
                </h3>
                <div className="mt-8 space-y-6 border-t border-ink/10 pt-7">
                  <div>
                    <Label>Membership</Label>
                    <p className="mt-2 text-[15px] leading-[1.75] text-text-muted-dark">
                      {c.membership}
                    </p>
                  </div>
                  <div>
                    <Label>Mandate</Label>
                    <p className="mt-2 text-[15px] leading-[1.75] text-text-muted-dark">
                      {c.mandate}
                    </p>
                  </div>
                </div>
                <div className="mt-auto pt-8">
                  <span className="inline-block bg-ink px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-gold-soft">
                    {c.cadence}
                  </span>
                  <p className="mt-3 text-[13.5px] text-text-muted-dark">
                    {c.cadenceNote}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10 flex flex-col gap-2 border-l-2 border-gold-refined bg-paper px-6 py-5 sm:flex-row sm:items-center sm:gap-6">
            <p className="shrink-0 text-[12px] font-bold uppercase tracking-[0.22em] text-ink">
              Board Accountability
            </p>
            <p className="text-[15px] leading-relaxed text-text-muted-dark">
              Committees report to the next scheduled Board meeting; charters
              are reviewed annually.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------ */

const HEADS = [
  "Head of Investments",
  "Head of Operations & Human Resources",
  "Head of Finance",
  "Head of ICT",
  "Head of Administration",
];

function Box({
  children,
  tone = "light",
  className = "",
}: {
  children: ReactNode;
  tone?: "ink" | "gold" | "light";
  className?: string;
}) {
  const tones = {
    ink: "bg-ink text-white border-ink",
    gold: "bg-gold-refined text-ink border-gold-refined",
    light: "bg-white text-ink border-ink/15",
  };
  return (
    <div
      className={`border px-5 py-4 text-center text-[13px] font-bold uppercase leading-snug tracking-[0.12em] ${tones[tone]} ${className}`}
    >
      {children}
    </div>
  );
}

/** Management page: reporting lines and independent assurance. */
export function ReportingLines() {
  return (
    <section className="bg-white px-4 py-24 sm:px-6 md:py-32 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-[12px] font-bold uppercase tracking-[0.28em] text-gold-refined">
            Organisational Structure
          </p>
          <h2 className="mt-5 font-display text-[2.3rem] font-normal leading-[1.08] tracking-tight text-ink md:text-[3.25rem]">
            Reporting Lines &amp;{" "}
            <em className="font-normal text-gold-refined">
              Independent Assurance
            </em>
          </h2>
          <p className="mt-6 text-[17px] leading-[1.85] text-text-muted-dark">
            Management reporting lines operate alongside direct Board access for
            Internal Audit and the Company Secretary &amp; Compliance Officer.
          </p>
        </Reveal>

        <Reveal className="mt-16 md:mt-20">
          {/* Board tier */}
          <div className="mx-auto max-w-md">
            <Box tone="ink">Board of Directors</Box>
          </div>
          <div className="mx-auto grid max-w-3xl grid-cols-2 items-start">
            {/* left: committees + internal audit */}
            <div className="flex flex-col items-center">
              <span aria-hidden className="block h-8 w-px bg-ink/25" />
              <Box className="w-full max-w-[16rem]">Board Committees</Box>
              <span
                aria-hidden
                className="block h-6 w-px border-l border-dashed border-gold-refined"
              />
              <Box tone="gold" className="w-full max-w-[16rem]">
                Head of Internal Audit
              </Box>
            </div>
            {/* right: MD/CEO + company secretary */}
            <div className="flex flex-col items-center">
              <span aria-hidden className="block h-8 w-px bg-ink/25" />
              <Box tone="ink" className="w-full max-w-[16rem]">
                Managing Director / CEO
              </Box>
              <span
                aria-hidden
                className="block h-6 w-px border-l border-dashed border-gold-refined"
              />
              <Box tone="gold" className="w-full max-w-[16rem]">
                Company Secretary &amp; Compliance Officer
              </Box>
            </div>
          </div>

          {/* Heads tier */}
          <div className="mt-10 border-t border-ink/15 pt-10">
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {HEADS.map((h) => (
                <li key={h}>
                  <Box className="flex h-full items-center justify-center">
                    {h}
                  </Box>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-center text-[13px] text-text-muted-dark">
              Reporting to the Managing Director / CEO
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-14 flex gap-4 border-l-2 border-gold-refined bg-paper px-6 py-6">
          <p className="text-[15px] leading-[1.8] text-text-muted-dark">
            Internal Audit reports functionally to the Board Audit &amp; Risk
            Committee and administratively to the MD/CEO. The Company Secretary
            &amp; Compliance Officer reports to the MD/CEO and has direct Board
            access.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
