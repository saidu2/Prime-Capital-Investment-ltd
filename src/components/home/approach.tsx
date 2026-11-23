"use client";

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import { useRef, useState } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/* Existing, approved PCI wording (homepage "Our Investment Approach"). */
const STEPS = [
  {
    title: "Strategic Discovery & Alignment",
    text: "We begin with a deep understanding of each client's financial position, objectives, and risk tolerance, ensuring every portfolio is aligned with clear goals.",
  },
  {
    title: "Disciplined Asset Allocation",
    text: "We construct resilient portfolios using a Total Portfolio Approach (TPA), ensuring assets work collectively across equities, fixed income, and alternatives.",
  },
  {
    title: "Integrated Risk Management",
    text: "Risk management is a 24/7 commitment. We provide clear, real-time insights and ESG integration to ensure sustainable, long-term returns.",
  },
  {
    title: "Innovation-Led Stewardship",
    text: "We enhance human expertise with advanced analytics, AI-enabled insights, and scenario modelling to stress-test portfolios across market cycles.",
  },
];

/** The four-step process; a gold line draws through it as you scroll and
    each stage lights as the line reaches it. */
export function Approach() {
  const track = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: track,
    offset: ["start 80%", "end 55%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 70, damping: 24 });
  const [lit, setLit] = useState(0);
  useMotionValueEvent(progress, "change", (v) => {
    setLit(Math.min(STEPS.length, Math.floor(v * STEPS.length + 0.35)));
  });

  return (
    <section className="relative isolate overflow-hidden bg-ink px-4 py-24 text-white sm:px-6 md:py-36 lg:px-8">
      <span
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(55%_60%_at_15%_0%,rgba(201,162,75,0.14),transparent_70%)]"
      />
      <span
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.06] [background-image:repeating-linear-gradient(115deg,#c9a24b_0_1px,transparent_1px_90px)]"
      />
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, ease: EASE }}
          className="grid items-end gap-8 md:grid-cols-12"
        >
          <h2 className="font-display text-[2.4rem] font-normal leading-[1.06] tracking-tight md:col-span-6 md:text-[4rem]">
            Our Investment{" "}
            <em className="font-normal text-gold-soft">Approach</em>
          </h2>
          <p className="text-[17px] leading-[1.85] text-text-muted-light md:col-span-6 md:pl-10">
            At Prime Capital & Investment Limited, we believe that wealth
            management is the result of a rigorous, systematic process that
            balances data-driven innovation with timeless investment principles.
          </p>
        </motion.div>

        <ol
          ref={track}
          className="relative mt-20 grid gap-14 pl-12 md:mt-28 md:grid-cols-4 md:gap-8 md:pl-0"
        >
          {/* rails: vertical on mobile, horizontal on desktop */}
          <span
            aria-hidden
            className="absolute bottom-0 left-[19px] top-0 w-px bg-white/12 md:inset-x-0 md:bottom-auto md:left-0 md:top-[19px] md:h-px md:w-auto"
          />
          <motion.span
            aria-hidden
            style={{ scaleY: progress }}
            className="absolute bottom-0 left-[19px] top-0 w-px origin-top bg-gold-refined md:hidden"
          />
          <motion.span
            aria-hidden
            style={{ scaleX: progress }}
            className="absolute inset-x-0 top-[19px] hidden h-px origin-left bg-gold-refined md:block"
          />

          {STEPS.map((s, i) => {
            const on = i < lit;
            return (
              <li key={s.title} className="relative md:pr-6">
                <span
                  className={`absolute -left-12 top-0 flex h-10 w-10 items-center justify-center rounded-full border font-display text-[15px] transition-all duration-700 ease-soft md:static ${
                    on
                      ? "border-gold-refined bg-gold-refined text-ink shadow-[0_0_0_8px_rgba(201,162,75,0.12)]"
                      : "border-white/25 bg-ink text-white/60"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`block h-2 w-2 rotate-45 ${on ? "bg-ink" : "bg-white/40"}`}
                  />
                </span>
                <h3
                  className={`font-display text-[1.45rem] font-normal leading-snug transition-colors duration-700 md:mt-9 md:text-[1.55rem] ${
                    on ? "text-white" : "text-white/70"
                  }`}
                >
                  {s.title}
                </h3>
                <p
                  className={`mt-4 text-[15px] leading-[1.85] transition-colors duration-700 ${
                    on ? "text-text-muted-light" : "text-white/55"
                  }`}
                >
                  {s.text}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
