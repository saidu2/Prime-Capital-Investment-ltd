"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { Download } from "lucide-react";
import { useRef } from "react";
import { HISTORY } from "@/data/history";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Vertical timeline; a gold line draws down it as you scroll. */
export function Journey() {
  const track = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: track,
    offset: ["start 75%", "end 60%"],
  });
  const line = useSpring(scrollYProgress, { stiffness: 70, damping: 24 });

  return (
    <section
      id="history"
      className="scroll-mt-32 overflow-x-clip bg-white px-4 py-24 sm:px-6 md:py-32 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: EASE }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="font-display text-[2.4rem] font-normal leading-[1.08] tracking-tight text-ink md:text-[3.5rem]">
            Our <em className="font-normal text-gold-refined">Journey</em>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-[1.85] text-text-muted-dark">
            Building Wealth. Preserving Trust. One deliberate step at a
            time.
          </p>
        </motion.div>

        <ol ref={track} className="relative mt-16 md:mt-24">
          <span
            aria-hidden
            className="absolute bottom-0 left-[11px] top-0 w-px bg-ink/10 md:left-1/2 md:-translate-x-1/2"
          />
          <motion.span
            aria-hidden
            style={{ scaleY: line }}
            className="absolute bottom-0 left-[11px] top-0 w-px origin-top bg-gold-refined md:left-1/2 md:-translate-x-1/2"
          />
          {HISTORY.map((m, i) => {
            const right = i % 2 === 1;
            return (
              <li
                key={m.title}
                className="relative pb-14 pl-12 last:pb-0 md:grid md:grid-cols-2 md:gap-20 md:pl-0"
              >
                <span
                  aria-hidden
                  className="absolute left-[5px] top-2 h-3.5 w-3.5 rotate-45 border-2 border-gold-refined bg-white md:left-1/2 md:-translate-x-1/2"
                />
                <motion.div
                  initial={{ opacity: 0, x: right ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 1, ease: EASE }}
                  className={right ? "md:col-start-2" : "md:text-right"}
                >
                  <p className="font-display text-[1.7rem] italic leading-none text-gold-refined md:text-[2.1rem]">
                    {m.when}
                  </p>
                  <h3 className="mt-4 font-display text-[1.4rem] font-normal leading-snug text-ink md:text-[1.6rem]">
                    {m.title}
                  </h3>
                  <p
                    className={`mt-3 max-w-md text-[15.5px] leading-[1.8] text-text-muted-dark ${right ? "" : "md:ml-auto"}`}
                  >
                    {m.text}
                  </p>
                </motion.div>
              </li>
            );
          })}
        </ol>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, ease: EASE }}
          className="relative isolate mt-24 flex flex-col items-start justify-between gap-8 overflow-hidden bg-ink p-9 text-white md:flex-row md:items-center md:p-12"
        >
          <span
            aria-hidden
            className="absolute inset-0 -z-10 bg-[radial-gradient(70%_120%_at_100%_0%,rgba(201,162,75,0.22),transparent_70%)]"
          />
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.26em] text-gold-soft">
              Corporate Profile
            </p>
            <p className="mt-3 font-display text-[1.8rem] leading-tight md:text-[2.2rem]">
              Everything about Prime Capital, in one document.
            </p>
            <p className="mt-2 text-[14px] text-white/60">PDF · 18 pages</p>
          </div>
          <a
            href="/Prime-Capital-Corporate-Profile.pdf"
            download
            className="btn-sheen group inline-flex shrink-0 items-center gap-3 rounded-[2px] bg-gold-refined px-8 py-4 text-[13px] font-bold uppercase tracking-[0.16em] text-ink transition-colors duration-500 hover:bg-gold-soft"
          >
            <Download
              aria-hidden
              className="h-4 w-4 transition-transform duration-500 group-hover:translate-y-0.5"
            />
            Download Profile
          </a>
        </motion.div>
      </div>
    </section>
  );
}
