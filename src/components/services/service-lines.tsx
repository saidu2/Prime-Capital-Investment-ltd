import { Briefcase, Building2, Compass, Gem } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

/* Wording from the owner's Corporate Profile deck (2026-11-22). */
const LINES = [
  {
    icon: Briefcase,
    title: "Fund & Portfolio Management",
    text: "Discretionary portfolios in money market instruments, fixed income and equities, managed within each client’s agreed mandate.",
  },
  {
    icon: Gem,
    title: "Private Wealth Management",
    text: "Portfolio construction, income planning and intergenerational wealth transfer for high-net-worth individuals and families.",
  },
  {
    icon: Compass,
    title: "Investment Advisory",
    text: "Portfolio reviews, asset allocation advice and transaction support on a non-discretionary basis. Clients retain decision authority.",
  },
  {
    icon: Building2,
    title: "Corporate & Institutional",
    text: "Treasury and liquidity management, dedicated mandates and structured solutions for corporates, pension funds and public institutions.",
  },
];

export function ServiceLines() {
  return (
    <section className="bg-white px-4 pb-24 sm:px-6 md:pb-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal className="grid items-end gap-8 md:grid-cols-12">
          <h2 className="font-display text-[2.3rem] font-normal leading-[1.08] tracking-tight text-ink md:col-span-7 md:text-[3.25rem]">
            Investment and{" "}
            <em className="font-normal text-gold-refined">Advisory Services</em>
          </h2>
          <p className="text-[17px] leading-[1.85] text-text-muted-dark md:col-span-5">
            Four service lines address distinct client needs within a shared
            investment and risk framework.
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-px border-y border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4 md:mt-20">
          {LINES.map((l, i) => (
            <Reveal as="li" key={l.title} delay={i * 0.1} className="bg-white">
              <div className="group relative h-full overflow-hidden px-8 py-12 md:px-9">
                <span
                  aria-hidden
                  className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-700 ease-soft group-hover:scale-y-100"
                />
                <div className="relative">
                  <l.icon
                    aria-hidden
                    strokeWidth={1}
                    className="h-12 w-12 text-gold-refined"
                  />
                  <h3 className="mt-9 font-display text-[1.4rem] font-normal leading-snug text-ink transition-colors duration-700 group-hover:text-white">
                    {l.title}
                  </h3>
                  <p className="mt-4 text-[15px] leading-[1.8] text-text-muted-dark transition-colors duration-700 group-hover:text-text-muted-light">
                    {l.text}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-8 flex flex-col gap-2 text-[14px] text-text-muted-dark sm:flex-row sm:items-center sm:justify-between">
          <p>
            <span className="font-bold uppercase tracking-[0.16em] text-ink">
              Mandate &amp; Registration
            </span>{" "}
            · Documented, risk-rated mandates.
          </p>
          <p>
            SEC Registration No.:{" "}
            <span className="font-semibold text-ink">
              SEC/REMI/REG/3095/2026
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
