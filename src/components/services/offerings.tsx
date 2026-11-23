"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { type KeyboardEvent, useId, useRef, useState } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

type Offering = {
  title: string;
  description: string;
  image: string;
  focus: string;
  features?: string[];
  subsections?: { title: string; features: string[] }[];
};

/* Existing, approved PCI wording (Services page). */
const OFFERINGS: Offering[] = [
  {
    title: "Money Market Instruments",
    description: "Investments in securities with short-term maturities",
    image: "/service-portfolio.jpg",
    focus: "60% 40%",
    features: [
      "Treasury Bills (T-Bills)",
      "Commercial Papers (CPs)",
      "Certificates of Deposit (CDs)",
      "Bankers' Acceptances (BAs)",
    ],
  },
  {
    title: "Fixed Income Securities",
    description:
      "Stable income-oriented portfolios investing in government bonds and high-quality corporate debt",
    image: "/service-nondiscretionary.jpg",
    focus: "50% 45%",
    features: ["FGN Bonds", "State Bonds", "Corporate Bonds"],
  },
  {
    title: "Ethical & Shari'ah Compliant Products",
    description:
      "Investment products aligned with ethical investment principles.",
    image: "/service-shariah.jpg",
    focus: "50% 45%",
    features: [
      "Murabahah Investment",
      "Ijara Investment",
      "Sukuk (Islamic bond)",
      "Mudarabah Investment",
    ],
  },
  {
    title: "Alternative Investments",
    description:
      "Access to non-traditional assets for qualified investors seeking enhanced returns.",
    image: "/hero-3.jpg",
    focus: "50% 40%",
    features: [
      "Real estate investments",
      "Private equity investments",
      "Venture capital access",
      "Infrastructure projects",
    ],
  },
  {
    title: "Financial Advisory",
    description:
      "Our Financial Advisory services are designed to help individuals and corporate institutions make sound, compliant, and sustainable financial decisions aligned with their goals, risk appetite, and ethical preferences.",
    image: "/service-advisory.jpg",
    focus: "50% 40%",
    subsections: [
      {
        title: "Investment Advisory",
        features: [
          "Portfolio structuring and asset allocation",
          "Risk profiling and investment strategy design",
          "Advisory on equities, fixed income, and alternative assets",
          "Sharia-compliant investment (non-interest based)",
        ],
      },
      {
        title: "Wealth & Financial Planning",
        features: [
          "Personal and family wealth planning",
          "Retirement and education planning",
          "Estate and succession planning",
        ],
      },
      {
        title: "Corporate & Institutional Advisory",
        features: [
          "Capital structure advisory",
          "Business valuation and financial modelling",
          "Advisory on fund structuring and capital raising",
          "Sharia advisory for Islamic finance products",
        ],
      },
    ],
  },
];

function Diamond() {
  return (
    <span
      aria-hidden
      className="mt-[0.55em] block h-1.5 w-1.5 shrink-0 rotate-45 bg-gold-refined"
    />
  );
}

function FeatureList({ items, cols = 2 }: { items: string[]; cols?: 1 | 2 }) {
  return (
    <ul
      className={`grid gap-x-10 gap-y-3.5 ${cols === 2 ? "sm:grid-cols-2" : ""}`}
    >
      {items.map((f, i) => (
        <motion.li
          key={f}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.45 + i * 0.06 }}
          className="flex gap-3.5 border-b border-ink/[0.07] pb-3.5 text-[15.5px] leading-relaxed text-ink/85"
        >
          <Diamond />
          {f}
        </motion.li>
      ))}
    </ul>
  );
}

/** Cardinal-style service explorer: numbered vertical tabs + a living panel. */
export function Offerings() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const uid = useId();
  const o = OFFERINGS[active];

  const onKey = (e: KeyboardEvent) => {
    const n = OFFERINGS.length;
    let next = -1;
    if (["ArrowDown", "ArrowRight"].includes(e.key)) next = (active + 1) % n;
    if (["ArrowUp", "ArrowLeft"].includes(e.key)) next = (active - 1 + n) % n;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = n - 1;
    if (next < 0) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section
      id="offerings"
      className="scroll-mt-24 bg-paper px-4 py-24 sm:px-6 md:py-32 lg:px-8"
    >
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-12 lg:gap-16">
        {/* Tabs */}
        <div className="min-w-0 lg:col-span-4">
          <p className="text-[12px] font-bold uppercase tracking-[0.28em] text-gold-refined">
            Our Offerings
          </p>
          <div
            role="tablist"
            aria-orientation="vertical"
            aria-label="Our offerings"
            onKeyDown={onKey}
            className="-mx-4 mt-6 flex snap-x gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] lg:mx-0 lg:block lg:space-y-1 lg:overflow-visible lg:px-0 lg:pb-0"
          >
            {OFFERINGS.map((item, i) => {
              const on = i === active;
              return (
                <button
                  key={item.title}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`${uid}-tab-${i}`}
                  aria-selected={on}
                  aria-controls={`${uid}-panel`}
                  tabIndex={on ? 0 : -1}
                  onClick={() => setActive(i)}
                  className={`group relative flex shrink-0 snap-start items-baseline gap-4 px-5 py-4 text-left transition-colors duration-500 ease-soft lg:w-full lg:px-6 lg:py-5 ${
                    on
                      ? "bg-ink text-white"
                      : "bg-white text-ink hover:bg-white/60 lg:bg-transparent"
                  }`}
                >
                  {on && (
                    <motion.span
                      layoutId={`${uid}-bar`}
                      aria-hidden
                      className="absolute inset-y-0 left-0 w-[3px] bg-gold-refined"
                      transition={{ duration: 0.6, ease: EASE }}
                    />
                  )}
                  <span className="whitespace-nowrap font-display text-[1.05rem] leading-snug lg:whitespace-normal lg:text-[1.3rem]">
                    {item.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Panel */}
        <div
          role="tabpanel"
          id={`${uid}-panel`}
          aria-labelledby={`${uid}-tab-${active}`}
          className="min-w-0 lg:col-span-8"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={o.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.35 } }}
            >
              <motion.div
                initial={{ clipPath: "inset(0% 0% 0% 100%)" }}
                animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                transition={{ duration: 1.1, ease: EASE }}
                className="relative aspect-[16/8] overflow-hidden bg-ink"
              >
                <Image
                  src={o.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="push-in-slow object-cover"
                  style={{ objectPosition: o.focus }}
                />
                <span
                  aria-hidden
                  className="absolute inset-0 bg-linear-to-t from-ink/70 via-ink/10 to-transparent"
                />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
                className="mt-10 font-display text-[2rem] font-normal leading-[1.1] tracking-tight text-ink md:text-[2.75rem]"
              >
                {o.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
                className="mt-5 max-w-2xl text-[17px] leading-[1.8] text-text-muted-dark"
              >
                {o.description}
              </motion.p>
              <span
                aria-hidden
                className="mt-8 mb-8 block h-px w-16 bg-gold-refined"
              />

              {o.features && <FeatureList items={o.features} />}

              {o.subsections && (
                <div className="grid gap-10 md:grid-cols-3 md:gap-8">
                  {o.subsections.map((s, si) => (
                    <motion.div
                      key={s.title}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.8,
                        ease: EASE,
                        delay: 0.4 + si * 0.12,
                      }}
                    >
                      <h3 className="font-display text-[1.25rem] font-normal leading-snug text-ink">
                        {s.title}
                      </h3>
                      <div className="mt-5">
                        <FeatureList items={s.features} cols={1} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
