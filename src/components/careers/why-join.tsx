import { Award, Lightbulb, ShieldCheck, TrendingUp } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { BENEFITS, WHY_JOIN } from "@/data/careers";

const ICONS = {
  shield: ShieldCheck,
  award: Award,
  trending: TrendingUp,
  lightbulb: Lightbulb,
} as const;

/** "Why Join" cards (Norrenberger pattern) + the benefits as a quiet strip. */
export function WhyJoin() {
  return (
    <section className="bg-white px-4 py-24 sm:px-6 md:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal className="grid items-end gap-6 md:grid-cols-12">
          <h2 className="font-display text-[2.3rem] font-normal leading-[1.08] tracking-tight text-ink md:col-span-7 md:text-[3.25rem]">
            Why Join{" "}
            <em className="font-normal text-gold-refined">Prime Capital</em>
          </h2>
          <p className="text-[17px] leading-[1.85] text-text-muted-dark md:col-span-5">
            A close-knit, SEC-regulated firm where your work shapes real
            mandates from day one.
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 md:mt-16">
          {WHY_JOIN.map((w, i) => {
            const Icon = ICONS[w.icon];
            return (
              <Reveal as="li" key={w.title} delay={i * 0.1}>
                <div className="group relative h-full overflow-hidden bg-paper p-8 transition-all duration-700 ease-soft hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_rgba(10,16,36,0.35)] md:p-9">
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gold-refined transition-transform duration-700 ease-soft group-hover:scale-x-100"
                  />
                  <Icon
                    aria-hidden
                    strokeWidth={1.2}
                    className="h-14 w-14 text-gold-refined transition-transform duration-700 ease-soft group-hover:scale-110"
                  />
                  <h3 className="mt-9 font-display text-[1.45rem] font-normal text-ink">
                    {w.title}
                  </h3>
                  <p className="mt-4 text-[15px] leading-[1.8] text-text-muted-dark">
                    {w.text}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </ul>

        <Reveal className="mt-12 flex flex-col gap-5 border-t border-ink/10 pt-8 md:flex-row md:items-center">
          <p className="shrink-0 text-[12px] font-bold uppercase tracking-[0.24em] text-gold-refined">
            Benefits include
          </p>
          <ul className="flex flex-wrap gap-2.5">
            {BENEFITS.map((b) => (
              <li
                key={b.label}
                className="border border-ink/12 px-4 py-2 text-[14px] text-ink/80"
              >
                {b.label}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
