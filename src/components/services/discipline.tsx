import { Vault } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

/* Wording from the owner's Corporate Profile deck (2026-11-22). */
const PRINCIPLES = [
  {
    title: "Capital preservation first",
    principle: "Protect downside before seeking return.",
    practice:
      "Agree risk budgets, liquidity floors and drawdown limits at onboarding.",
    guardrail:
      "No excessive concentration, off-mandate illiquidity or performance-enhancing leverage.",
  },
  {
    title: "Research-led allocation",
    principle:
      "Allocate from macro, credit and issuer research, not sentiment.",
    practice:
      "Review allocations monthly; escalate decisions above delegated limits.",
    guardrail:
      "No undocumented trades, single-view dependence or unchecked allocation drift.",
  },
  {
    title: "Transparent stewardship",
    principle:
      "Show clients holdings, performance and costs throughout the mandate.",
    practice:
      "Report against agreed benchmarks and disclose every fee and transaction cost.",
    guardrail:
      "No hidden charges, retrospective benchmark changes or opaque return reporting.",
  },
];

const ROWS = [
  ["Principle", "principle"],
  ["Practice", "practice"],
  ["Guardrail", "guardrail"],
] as const;

export function Discipline() {
  return (
    <section className="relative isolate overflow-hidden bg-ink px-4 py-24 text-white sm:px-6 md:py-32 lg:px-8">
      <span
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(55%_60%_at_15%_0%,rgba(201,162,75,0.14),transparent_70%)]"
      />
      <span
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.06] [background-image:repeating-linear-gradient(115deg,#c9a24b_0_1px,transparent_1px_90px)]"
      />
      <div className="mx-auto max-w-7xl">
        <Reveal className="grid items-end gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="text-[12px] font-bold uppercase tracking-[0.28em] text-gold-soft">
              Investment Approach
            </p>
            <h2 className="mt-5 font-display text-[2.3rem] font-normal leading-[1.08] tracking-tight md:text-[3.5rem]">
              Investment Discipline{" "}
              <em className="font-normal text-gold-soft">in Practice</em>
            </h2>
          </div>
          <p className="text-[17px] leading-[1.85] text-text-muted-light md:col-span-5">
            Each mandate connects an investment objective to portfolio limits,
            research and transparent reporting.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:mt-20 lg:grid-cols-3">
          {PRINCIPLES.map((p, i) => (
            <Reveal
              key={p.title}
              delay={i * 0.12}
              className="group border border-white/10 bg-white/[0.03] p-8 transition-colors duration-700 hover:border-gold-refined/50 hover:bg-white/[0.05] md:p-10"
            >
              <span
                aria-hidden
                className="block h-[2px] w-10 bg-gold-refined transition-all duration-700 ease-soft group-hover:w-20"
              />
              <h3 className="mt-6 font-display text-[1.6rem] font-normal leading-snug">
                {p.title}
              </h3>
              <dl className="mt-8 space-y-6">
                {ROWS.map(([label, key]) => (
                  <div key={key} className="border-t border-white/10 pt-5">
                    <dt className="text-[11px] font-bold uppercase tracking-[0.24em] text-gold-soft">
                      {label}
                    </dt>
                    <dd className="mt-2 text-[15px] leading-[1.75] text-text-muted-light">
                      {p[key]}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 flex flex-col items-start gap-4 border border-gold-refined/30 px-7 py-6 sm:flex-row sm:items-center">
          <Vault
            aria-hidden
            strokeWidth={1.2}
            className="h-9 w-9 shrink-0 text-gold-refined"
          />
          <p className="text-[15.5px] leading-relaxed text-white/85">
            <span className="font-bold uppercase tracking-[0.18em] text-gold-soft">
              Custody Separation
            </span>
            <span className="mx-3 inline-block h-1.5 w-1.5 rotate-45 bg-gold-refined align-middle" />
            Independent custodians hold client assets; Prime Capital manages
            investments.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
