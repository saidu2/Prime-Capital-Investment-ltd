"use client";

import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type KeyboardEvent, type ReactNode, useRef, useState } from "react";

/*
 * Copy sources (no invented wording):
 *  - Portfolio names + instrument lists: PCI-BUILD-SPEC §14 (captured from the live site).
 *  - Financial Advisory description + areas: src/app/services/page.tsx.
 */

type Service = {
  tab: string;
  eyebrow: string;
  title: string;
  intro?: string;
  listLabel: string;
  items: string[];
  image: string;
  imageFocus?: string;
};

const CONVENTIONAL = [
  "FGN Bonds",
  "States Bonds",
  "Corporate bonds",
  "Treasury Bills (T-Bills)",
  "Commercial Papers (CPs)",
  "Certificates of Deposit (CDs)",
  "Bankers' Acceptances (BAs)",
  "EURO Bonds",
];

const SHARIAH = [
  "Sovereign Sukuk (FGN Sukuk)",
  "State Government Sukuk",
  "Corporate Sukuk (Listed and Unlisted)",
  "Shari'ah-compliant Equities (Quoted and Unquoted Equities traded on SEC registered OTC)",
  "Shari'ah-compliant Money Market Instruments & Mudarabah/Wakalah Placements",
];

const SERVICES: Service[] = [
  {
    tab: "Discretionary Portfolio",
    eyebrow: "Conventional",
    title: "Prime Discretionary Portfolio",
    listLabel: "Instruments",
    items: CONVENTIONAL,
    image: "/service-portfolio.jpg",
  },
  {
    tab: "Non-Discretionary",
    eyebrow: "Conventional",
    title: "Prime Non-Discretionary Portfolio",
    listLabel: "Instruments",
    items: CONVENTIONAL,
    image: "/service-nondiscretionary.jpg",
  },
  {
    tab: "Shari'ah-Compliant",
    eyebrow: "Prime Discretionary & Non-Discretionary",
    title: "Shari'ah-Compliant Sub-Portfolio",
    listLabel: "Instruments",
    items: SHARIAH,
    image: "/service-shariah.jpg",
  },
  {
    tab: "Financial Advisory",
    eyebrow: "Advisory",
    title: "Financial Advisory",
    intro:
      "Our Financial Advisory services are designed to help individuals and corporate institutions make sound, compliant, and sustainable financial decisions aligned with their goals, risk appetite, and ethical preferences.",
    listLabel: "Advisory Areas",
    items: [
      "Investment Advisory",
      "Wealth & Financial Planning",
      "Corporate & Institutional Advisory",
    ],
    image: "/service-advisory.jpg",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export function ServiceShowcase() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const service = SERVICES[active];

  // WAI-ARIA tabs: arrow keys move between tabs and select them.
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const last = SERVICES.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowRight") next = active === last ? 0 : active + 1;
    if (e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
    tabRefs.current[next]?.scrollIntoView({
      block: "nearest",
      inline: "nearest",
    });
  };

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="services-showcase"
        aria-label="Our services"
        className="relative z-10 -mt-[104px] md:-mt-[72px]"
      >
        {/* Tab strip — overlaps the hero edge; the active tab opens into the panel */}
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div
            role="tablist"
            aria-label="Our services"
            onKeyDown={onKeyDown}
            className="grid grid-cols-2 md:grid-cols-4"
          >
            {SERVICES.map((s, i) => {
              const selected = i === active;
              return (
                <button
                  key={s.tab}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  id={`svc-tab-${i}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="svc-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  className={`relative h-[52px] cursor-pointer border-b border-r px-3 text-[12.5px] font-medium tracking-wide transition-colors duration-700 ease-soft even:border-r-0 md:h-[72px] md:border-b-0 md:px-5 md:text-sm md:even:border-r md:last:border-r-0 ${
                    selected
                      ? "border-transparent bg-paper text-ink"
                      : "border-white/10 bg-ink/75 text-white/70 backdrop-blur-md hover:bg-ink/90 hover:text-white"
                  }`}
                >
                  {selected && (
                    <motion.span
                      layoutId="svc-tab-line"
                      transition={{ duration: 0.7, ease: EASE }}
                      className="absolute inset-x-0 top-0 h-[2px] bg-gold-refined"
                    />
                  )}
                  {s.tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* Panel — swaps in place */}
        <div className="bg-paper">
          <div
            id="svc-panel"
            role="tabpanel"
            aria-labelledby={`svc-tab-${active}`}
            className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                initial="hidden"
                animate="show"
                exit="exit"
                variants={{
                  hidden: {},
                  show: {
                    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
                  },
                  exit: {},
                }}
                className="grid items-center gap-12 lg:grid-cols-12 lg:gap-20"
              >
                <div className="lg:col-span-6">
                  <Reveal>
                    <p className="font-display text-lg italic text-gold-refined">
                      {service.eyebrow}
                    </p>
                  </Reveal>
                  <Reveal>
                    <h2 className="mt-3 font-display text-[2rem] font-normal leading-[1.15] tracking-tight text-ink md:text-[2.75rem]">
                      {service.title}
                    </h2>
                  </Reveal>
                  {service.intro && (
                    <Reveal>
                      <p className="mt-6 max-w-xl text-base leading-relaxed text-text-muted-dark md:text-[17px]">
                        {service.intro}
                      </p>
                    </Reveal>
                  )}
                  <Reveal>
                    <p className="mt-9 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/60">
                      {service.listLabel}
                    </p>
                  </Reveal>
                  <motion.ul
                    variants={{
                      show: { transition: { staggerChildren: 0.05 } },
                    }}
                    className={`mt-5 grid gap-x-10 gap-y-3.5 ${
                      service.items.length > 5 ? "sm:grid-cols-2" : ""
                    }`}
                  >
                    {service.items.map((item) => (
                      <Reveal as="li" key={item}>
                        <span className="flex items-start gap-3 text-[15px] leading-snug text-ink/85">
                          <span
                            aria-hidden
                            className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full bg-gold-refined"
                          />
                          {item}
                        </span>
                      </Reveal>
                    ))}
                  </motion.ul>
                  <Reveal>
                    <Link
                      href="/services"
                      className="btn-sheen group mt-11 inline-flex items-center gap-3 rounded-[2px] bg-ink px-8 py-4 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-white transition-colors duration-500 ease-soft hover:bg-ink-2"
                    >
                      Learn More
                      <ArrowRight
                        aria-hidden
                        className="h-4 w-4 text-gold-refined transition-transform duration-500 ease-soft group-hover:translate-x-1"
                      />
                    </Link>
                  </Reveal>
                </div>

                <motion.div
                  variants={{
                    hidden: { opacity: 0, scale: 1.04 },
                    show: {
                      opacity: 1,
                      scale: 1,
                      transition: { duration: 1.1, ease: EASE },
                    },
                    exit: {
                      opacity: 0,
                      transition: { duration: 0.35, ease: EASE },
                    },
                  }}
                  className="group relative aspect-[4/3] overflow-hidden lg:col-span-6"
                >
                  <Image
                    src={service.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[1600ms] ease-soft group-hover:scale-[1.04]"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-linear-to-t from-ink/25 to-transparent"
                  />
                  <span
                    aria-hidden
                    className="absolute bottom-0 left-0 h-[3px] w-24 bg-gold-refined"
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}

function Reveal({
  children,
  as = "div",
}: {
  children: ReactNode;
  as?: "div" | "li";
}) {
  const Comp = as === "li" ? motion.li : motion.div;
  return (
    <Comp
      variants={{
        hidden: { opacity: 0, y: 16 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
        exit: { opacity: 0, transition: { duration: 0.3, ease: EASE } },
      }}
    >
      {children}
    </Comp>
  );
}
