"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Building2,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  HeartPulse,
  Quote,
  Users,
  Wallet,
} from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import {
  BENEFITS,
  CAREERS_INTRO,
  CULTURE_BLOCKS,
  TESTIMONIALS,
  type Testimonial,
} from "@/data/careers";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/* Intro + alternating culture blocks                                  */
/* ------------------------------------------------------------------ */

function FramedImage({
  src,
  focus,
  side,
}: {
  src: string;
  focus: string;
  side: "left" | "right";
}) {
  return (
    <div className="relative">
      {/* offset block behind the photo (Cardinal detail, in PCI gold) */}
      <span
        aria-hidden
        className={`absolute -bottom-5 h-2/3 w-1/2 bg-gold-refined/15 ${
          side === "left" ? "-left-3 md:-left-5" : "-right-3 md:-right-5"
        }`}
      />
      <div className="group relative aspect-[4/3] overflow-hidden">
        <Image
          src={src}
          alt=""
          fill
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="object-cover transition-transform duration-[1600ms] ease-soft group-hover:scale-[1.04]"
          style={{ objectPosition: focus }}
        />
      </div>
    </div>
  );
}

export function CareersIntro() {
  return (
    <section className="bg-white px-4 py-24 sm:px-6 md:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-24 md:space-y-32">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="font-display text-lg italic text-gold-refined">
              {CAREERS_INTRO.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-[2rem] font-normal leading-[1.15] tracking-tight text-ink md:text-[2.75rem]">
              {CAREERS_INTRO.title}
            </h2>
            <span
              aria-hidden
              className="mt-7 block h-px w-16 bg-gold-refined"
            />
            <div className="mt-7 space-y-5 text-base leading-[1.8] text-text-muted-dark md:text-[17px]">
              {CAREERS_INTRO.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <FramedImage
              src={CAREERS_INTRO.image}
              focus={CAREERS_INTRO.imageFocus}
              side="right"
            />
          </Reveal>
        </div>

        {CULTURE_BLOCKS.map((block, i) => {
          const imageFirst = i % 2 === 0;
          return (
            <div
              key={block.title}
              className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20"
            >
              <Reveal
                delay={imageFirst ? 0 : 0.15}
                className={imageFirst ? "" : "lg:order-2"}
              >
                <FramedImage
                  src={block.image}
                  focus={block.imageFocus}
                  side={imageFirst ? "left" : "right"}
                />
              </Reveal>
              <Reveal delay={imageFirst ? 0.15 : 0}>
                <h3 className="font-display text-[1.75rem] font-normal leading-tight text-ink md:text-[2.25rem]">
                  {block.title}
                </h3>
                <div className="mt-6 space-y-5 text-base leading-[1.8] text-text-muted-dark md:text-[17px]">
                  {block.paragraphs.map((p) => (
                    <p key={p.slice(0, 24)}>{p}</p>
                  ))}
                </div>
              </Reveal>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Testimonials — centre card raised, neighbours receding               */
/* ------------------------------------------------------------------ */

function Avatar({ t, large }: { t: Testimonial; large: boolean }) {
  const initials = t.name
    .split(/\s+/)
    .map((w) => w[0])
    .filter((_, i, a) => i === 0 || i === a.length - 1)
    .join("");
  const size = large ? "h-24 w-24 text-3xl" : "h-16 w-16 text-xl";
  return t.photo ? (
    <span className={`relative block overflow-hidden rounded-full ${size}`}>
      <Image src={t.photo} alt="" fill sizes="96px" className="object-cover" />
    </span>
  ) : (
    <span
      aria-hidden
      className={`flex items-center justify-center rounded-full border border-gold-refined/60 bg-ink font-display text-gold-soft ${size}`}
    >
      {initials}
    </span>
  );
}

export function Testimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = TESTIMONIALS.length;
  const go = useCallback((d: number) => setActive((a) => (a + d + n) % n), [n]);

  useEffect(() => {
    if (paused) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;
    const t = setInterval(() => go(1), 9000);
    return () => clearInterval(t);
  }, [paused, go]);

  const slot = (i: number) => (i - active + n) % n; // 0 = centre, 1 = right, n-1 = left

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Staff testimonials"
      className="relative overflow-hidden bg-paper px-4 py-24 sm:px-6 md:py-32 lg:px-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="mx-auto max-w-7xl">
        <Reveal className="text-center">
          <p className="font-display text-lg italic text-gold-refined">
            In their words
          </p>
          <h2 className="mt-3 font-display text-[2rem] font-normal tracking-tight text-ink md:text-[2.75rem]">
            Testimonials
          </h2>
        </Reveal>

        <div className="relative mt-16 flex min-h-[560px] items-center justify-center sm:min-h-[500px]">
          {TESTIMONIALS.map((t, i) => {
            const s = slot(i);
            const centre = s === 0;
            const offset = s === 0 ? 0 : s === 1 ? 1 : -1;
            return (
              <motion.article
                key={t.name}
                aria-hidden={!centre}
                initial={false}
                animate={{
                  x: `${offset * 105}%`,
                  scale: centre ? 1 : 0.86,
                  opacity: centre ? 1 : 0.45,
                }}
                transition={{ duration: 0.9, ease: EASE }}
                onClick={() => !centre && go(offset)}
                className={`absolute w-full max-w-md bg-white px-8 pb-10 pt-12 text-center sm:px-10 ${
                  centre
                    ? "z-10 shadow-[0_30px_80px_-30px_rgba(10,16,36,0.35)]"
                    : "z-0 hidden cursor-pointer md:block"
                }`}
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[3px] bg-gold-refined"
                  style={{ opacity: centre ? 1 : 0 }}
                />
                <div className="flex justify-center">
                  <Avatar t={t} large={centre} />
                </div>
                <h3 className="mt-6 font-display text-2xl text-ink">
                  {t.name}
                </h3>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-refined">
                  {t.role}
                </p>
                <Quote
                  aria-hidden
                  className="mx-auto mt-6 h-6 w-6 text-gold-refined/50"
                />
                <p className="mt-4 text-[15px] leading-[1.8] text-text-muted-dark">
                  {t.quote}
                </p>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="flex h-11 w-11 cursor-pointer items-center justify-center border border-ink/20 text-ink transition-colors duration-500 hover:border-ink hover:bg-ink hover:text-white"
          >
            <ChevronLeft aria-hidden className="h-4 w-4" />
          </button>
          <div className="flex gap-2">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.name}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show testimonial from ${t.name}`}
                aria-current={i === active ? "true" : undefined}
                className="group h-6 cursor-pointer px-1"
              >
                <span
                  className={`block h-px transition-all duration-700 ease-soft ${
                    i === active
                      ? "w-10 bg-gold-refined"
                      : "w-5 bg-ink/25 group-hover:bg-ink/50"
                  }`}
                />
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="flex h-11 w-11 cursor-pointer items-center justify-center border border-ink/20 text-ink transition-colors duration-500 hover:border-ink hover:bg-ink hover:text-white"
          >
            <ChevronRight aria-hidden className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Employee value proposition — square ink tiles                        */
/* ------------------------------------------------------------------ */

const ICONS = {
  wallet: Wallet,
  graduation: GraduationCap,
  award: Award,
  users: Users,
  building: Building2,
  heart: HeartPulse,
} as const;

export function Benefits() {
  return (
    <section className="bg-white px-4 py-24 sm:px-6 md:py-32 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Reveal className="text-center">
          <p className="font-display text-lg italic text-gold-refined">
            Why Prime Capital
          </p>
          <h2 className="mt-3 font-display text-[2rem] font-normal tracking-tight text-ink md:text-[2.75rem]">
            Employee Value Proposition
          </h2>
        </Reveal>
        <ul className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 md:gap-y-16">
          {BENEFITS.map((b, i) => {
            const Icon = ICONS[b.icon];
            return (
              <Reveal
                as="li"
                key={b.label}
                delay={(i % 3) * 0.1}
                className="group flex flex-col items-center text-center"
              >
                <span className="flex h-24 w-24 items-center justify-center bg-ink text-gold-soft transition-all duration-700 ease-soft group-hover:-translate-y-1.5 group-hover:bg-gold-refined group-hover:text-ink group-hover:shadow-[0_20px_40px_-18px_rgba(201,162,75,0.8)] md:h-28 md:w-28">
                  <Icon
                    aria-hidden
                    strokeWidth={1.25}
                    className="h-10 w-10 md:h-12 md:w-12"
                  />
                </span>
                <span className="mt-5 max-w-[14rem] font-display text-base text-ink md:text-lg">
                  {b.label}
                </span>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Join band — card overlapping a photo band (Cardinal pattern)         */
/* ------------------------------------------------------------------ */

export function JoinBand({ email }: { email: string }) {
  return (
    <section className="relative isolate overflow-hidden bg-ink px-4 py-20 sm:px-6 md:py-28 lg:px-8">
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 -z-10 w-full md:w-3/5"
      >
        <Image
          src="/career-join.jpg"
          alt=""
          fill
          sizes="60vw"
          className="object-cover"
          style={{ objectPosition: "70% 30%" }}
        />
        <span className="absolute inset-0 bg-linear-to-r from-ink via-ink/60 to-ink/10" />
      </div>
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: EASE }}
          className="relative max-w-xl bg-white p-9 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.6)] md:p-12"
        >
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 h-[3px] bg-gold-refined"
          />
          <h2 className="font-display text-[2rem] font-normal leading-tight text-ink md:text-[2.5rem]">
            Don't See the Right Fit?
          </h2>
          <p className="mt-5 text-base leading-[1.8] text-text-muted-dark">
            We're always looking for talented individuals to join our team. Send
            us your resume and we'll keep you in mind for future opportunities.
          </p>
          <p className="mt-4 text-base text-text-muted-dark">
            Reach out to{" "}
            <a
              href={`mailto:${email}`}
              className="font-semibold text-ink underline decoration-gold-refined decoration-2 underline-offset-4 hover:text-gold-refined"
            >
              {email}
            </a>
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href={`mailto:${email}`}
              className="btn-sheen group inline-flex items-center gap-3 rounded-[2px] bg-ink px-7 py-4 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-white transition-colors duration-500 hover:bg-ink-2"
            >
              Send Your Resume
              <ArrowRight
                aria-hidden
                className="h-4 w-4 text-gold-refined transition-transform duration-500 group-hover:translate-x-1"
              />
            </a>
            <a
              href="#openings"
              className="inline-flex items-center rounded-[2px] border border-ink/25 px-7 py-4 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-ink transition-colors duration-500 hover:border-ink hover:bg-ink hover:text-white"
            >
              Open Positions
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
