"use client";

import { MotionConfig, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const EASE = [0.22, 1, 0.36, 1] as const;

type PageHeroProps = {
  /** Page title — rendered as the page's single <h1>. */
  title: string;
  /** Short breadcrumb label for this page, e.g. "About Us". */
  crumb: string;
  image: string;
  /** object-position for the crop */
  focus?: string;
  eyebrow?: string;
};

/**
 * Cardinal-style inner-page banner: photo dipped in ink, centred serif title,
 * a slow push-in on arrival and parallax depth on scroll.
 */
export function PageHero({
  title,
  crumb,
  image,
  focus = "50% 50%",
  eyebrow,
}: PageHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const trigger = sectionRef.current;
      gsap.to(mediaRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(contentRef.current, {
        y: -50,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger,
          start: "top top",
          end: "80% top",
          scrub: true,
        },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <section
        ref={sectionRef}
        className="relative isolate flex h-[58vh] min-h-[420px] max-h-[640px] items-center justify-center overflow-hidden bg-ink"
      >
        {/* Photo with a slow push-in */}
        <div ref={mediaRef} aria-hidden className="absolute inset-0 -z-10">
          <div className="push-in-slow absolute inset-0">
            <Image
              src={image}
              alt=""
              fill
              priority
              sizes="100vw"
              quality={75}
              className="object-cover"
              style={{ objectPosition: focus }}
            />
          </div>
        </div>

        {/* Ink wash, floor fade, faint gold light streaks */}
        <div aria-hidden className="absolute inset-0 -z-10 bg-ink/70" />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-linear-to-b from-ink/40 via-transparent to-ink/60"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-[0.045] mix-blend-screen"
          style={{
            backgroundImage:
              "repeating-linear-gradient(115deg, transparent 0 140px, #c9a24b 140px 141px, transparent 141px 300px)",
          }}
        />

        <div
          ref={contentRef}
          className="relative px-6 pt-[var(--header-h)] text-center"
        >
          {eyebrow && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.2 }}
              className="mb-4 font-display text-lg italic text-gold-soft"
            >
              {eyebrow}
            </motion.p>
          )}

          <motion.h1
            initial={{ opacity: 0, scale: 1.06, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.5, ease: EASE, delay: 0.3 }}
            className="font-display text-[2.6rem] font-normal leading-[1.08] tracking-[-0.01em] text-white text-balance [text-shadow:0_2px_30px_rgba(10,16,36,0.45)] sm:text-6xl lg:text-[4.25rem]"
          >
            {title}
          </motion.h1>

          <motion.nav
            aria-label="Breadcrumb"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.8 }}
            className="mt-7"
          >
            <ol className="flex items-center justify-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em] text-white/60">
              <li>
                <Link
                  href="/"
                  className="transition-colors duration-300 hover:text-white"
                >
                  Home
                </Link>
              </li>
              <li
                aria-hidden
                className="h-1 w-1 rounded-full bg-gold-refined"
              />
              <li aria-current="page" className="text-white/90">
                {crumb}
              </li>
            </ol>
          </motion.nav>
        </div>

        {/* A fine gold line drawing down into the page */}
        <span
          aria-hidden
          className="absolute bottom-0 left-1/2 h-14 w-px -translate-x-1/2"
        >
          <motion.span
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.4, ease: EASE, delay: 1.1 }}
            className="block h-full w-full origin-top bg-linear-to-b from-transparent to-gold-refined"
          />
        </span>
      </section>
    </MotionConfig>
  );
}
