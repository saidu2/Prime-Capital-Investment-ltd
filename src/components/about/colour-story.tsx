"use client";

import { motion, type Variants } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/* Existing, approved PCI wording. */
const COLOURS = [
  {
    name: "Gold",
    text: "Represents excellence, confidence, and premium quality in every mandate.",
  },
  {
    name: "White",
    text: "Symbolizes absolute transparency, integrity, and clarity in every relationship.",
  },
];

/* Every animation below is driven by the (unclipped) grid entering view, so
   the panels never have to detect visibility while they are clipped away. */
const panel: Variants = {
  hidden: (gold: boolean) => ({
    clipPath: gold ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)",
  }),
  show: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 1.6, ease: EASE, delay: 0.2 },
  },
};
const letter: Variants = {
  hidden: { y: "105%" },
  show: (i: number) => ({
    y: "0%",
    transition: { duration: 1.1, ease: EASE, delay: 0.9 + i * 0.06 },
  }),
};
const caption: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: EASE, delay: 1.4 },
  },
};
const seam: Variants = {
  hidden: { scaleY: 0 },
  show: { scaleY: 1, transition: { duration: 1.2, ease: EASE } },
};

/** The brand colours as a brand-book spread: gold leaf beside pure white,
    opening outward from the centre seam. */
export function ColourStory() {
  return (
    <section className="bg-white px-4 py-24 sm:px-6 md:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: EASE }}
          className="mx-auto max-w-3xl text-center font-display text-[1.6rem] leading-snug text-ink md:text-[2.25rem]"
        >
          At the heart of our identity are the colors that define our promise:
        </motion.p>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="relative mt-14 grid md:mt-20 md:grid-cols-2"
        >
          {COLOURS.map((c, i) => {
            const gold = i === 0;
            return (
              <motion.div
                key={c.name}
                custom={gold}
                variants={panel}
                className={`relative flex min-h-[360px] flex-col justify-between overflow-hidden p-9 md:min-h-[480px] md:p-14 ${
                  gold
                    ? "gold-leaf text-ink"
                    : "bg-white text-ink ring-1 ring-inset ring-ink/10"
                }`}
              >
                {/* fine engraved frame */}
                <span
                  aria-hidden
                  className={`pointer-events-none absolute inset-4 border md:inset-6 ${
                    gold ? "border-ink/20" : "border-gold-refined/40"
                  }`}
                />
                <span aria-hidden />
                <div className="relative">
                  <h3
                    className={`flex overflow-hidden pb-[0.08em] font-display text-[5.5rem] font-normal leading-[0.9] tracking-tight md:text-[8rem] xl:text-[9.5rem] ${
                      gold ? "" : "italic"
                    }`}
                  >
                    <span className="sr-only">{c.name}</span>
                    {c.name.split("").map((ch, j) => (
                      <motion.span
                        // biome-ignore lint/suspicious/noArrayIndexKey: static letters
                        key={j}
                        aria-hidden
                        custom={j}
                        variants={letter}
                        className="inline-block"
                      >
                        {ch}
                      </motion.span>
                    ))}
                  </h3>
                  <motion.p
                    variants={caption}
                    className={`mt-6 max-w-sm text-base leading-[1.75] md:text-lg ${
                      gold ? "text-ink/80" : "text-text-muted-dark"
                    }`}
                  >
                    {c.text}
                  </motion.p>
                </div>
              </motion.div>
            );
          })}
          {/* the seam */}
          <motion.span
            aria-hidden
            variants={seam}
            className="absolute inset-y-0 left-1/2 hidden w-px origin-top bg-ink/20 md:block"
          />
        </motion.div>
      </div>
    </section>
  );
}
