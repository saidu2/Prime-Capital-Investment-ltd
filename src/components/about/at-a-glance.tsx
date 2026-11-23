import { Building, Layers, UserRoundCheck, UsersRound } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

/* Wording from the owner's Corporate Profile deck (2026-11-22). */
const ITEMS = [
  {
    icon: Layers,
    title: "Investment Solutions",
    text: "Fund and portfolio management, private wealth, investment advisory and dedicated corporate and institutional solutions.",
  },
  {
    icon: UsersRound,
    title: "Who We Serve",
    text: "High-net-worth individuals and families, corporate clients, pension and institutional investors, and public-sector entities.",
  },
  {
    icon: UserRoundCheck,
    title: "Leadership & Expertise",
    text: "Five directors and nine management committee members bring experience in pensions, capital markets, law, finance and technology.",
  },
  {
    icon: Building,
    title: "Abuja Headquarters",
    text: "Based at No. 3, Sankuru Close, Off Rima Street, Maitama, Abuja, serving clients across Nigeria.",
  },
];

export function AtAGlance() {
  return (
    <section className="relative isolate overflow-hidden bg-ink px-4 py-24 text-white sm:px-6 md:py-28 lg:px-8">
      <span
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_70%_at_100%_0%,rgba(201,162,75,0.14),transparent_70%)]"
      />
      <div className="mx-auto max-w-7xl">
        <Reveal className="grid items-end gap-8 md:grid-cols-12">
          <h2 className="font-display text-[2.3rem] font-normal leading-[1.08] tracking-tight md:col-span-6 md:text-[3.25rem]">
            Prime Capital{" "}
            <em className="font-normal text-gold-soft">at a Glance</em>
          </h2>
          <p className="text-[17px] leading-[1.85] text-text-muted-light md:col-span-6">
            Asset management and advisory services for private and institutional
            clients, supported by investment discipline and Board oversight.
          </p>
        </Reveal>
        <ul className="mt-14 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4 md:mt-16">
          {ITEMS.map((it, i) => (
            <Reveal as="li" key={it.title} delay={i * 0.1} className="bg-ink">
              <div className="group h-full p-8 md:p-10">
                <it.icon
                  aria-hidden
                  strokeWidth={1.1}
                  className="h-10 w-10 text-gold-refined transition-transform duration-700 ease-soft group-hover:-translate-y-1"
                />
                <h3 className="mt-7 font-display text-[1.35rem] font-normal leading-snug">
                  {it.title}
                </h3>
                <p className="mt-4 text-[15px] leading-[1.8] text-text-muted-light">
                  {it.text}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
