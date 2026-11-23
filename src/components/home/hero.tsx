"use client";

import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useLenis } from "@/components/smooth-scroll";

gsap.registerPlugin(ScrollTrigger);

/* Every line of copy below is existing, approved PCI wording. */

type Cta = { href: string; label: string };
type Slide = {
  image: string;
  /** object-position for the crop */
  focus: string;
  /** where the slow push-in zooms toward */
  origin: string;
  eyebrow?: string;
  headline: ReactNode;
  body: ReactNode;
  primary: Cta;
  secondary?: Cta;
};

const SLIDES: Slide[] = [
  {
    image: "/hero-2.jpg",
    focus: "60% 40%",
    origin: "62% 38%",
    eyebrow: "Prime Capital",
    headline: (
      <>
        Building Wealth.{" "}
        <span className="italic text-gold-refined">Preserving Trust.</span>
      </>
    ),
    body: (
      <>
        Prime Capital &amp; Investment Limited is a Fund and Portfolio
        Management firm built on disciplined expertise, unwavering integrity,
        and a clear commitment to long-term wealth creation.
      </>
    ),
    primary: { href: "/contact", label: "Start Investing" },
    secondary: { href: "/about#philosophy", label: "Our Philosophy" },
  },
  {
    image: "/hero-1.jpg",
    focus: "50% 50%",
    origin: "50% 45%",
    headline: "Our Mission",
    body: "Grow and protect client wealth through innovative and disciplined strategies.",
    primary: { href: "/services", label: "Learn More" },
  },
  {
    image: "/hero-3.jpg",
    focus: "50% 45%",
    origin: "50% 60%",
    headline: "Our Vision",
    body: "To be one of the most trusted partners in wealth management.",
    primary: { href: "/about", label: "About Us" },
  },
  {
    image: "/hero-4.jpg",
    focus: "70% 55%",
    origin: "68% 30%",
    headline: "SEC-Regulated Assurance",
    body: "Managed within a robust regulatory framework, strictly in accordance with the Investments & Securities Act.",
    primary: { href: "/contact", label: "Contact Us" },
  },
];

const SLIDE_MS = 8500;
const EASE = [0.22, 1, 0.36, 1] as const;

/* Text: quick, quiet exit; the headline arrives a touch large and settles. */
const group = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.25 } },
  exit: {},
};
const settle = {
  hidden: { opacity: 0, scale: 1.07, filter: "blur(8px)" },
  show: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1.6, ease: EASE },
  },
  exit: { opacity: 0, transition: { duration: 0.45, ease: EASE } },
};
const rise = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 1.1, ease: EASE } },
  exit: { opacity: 0, transition: { duration: 0.4, ease: EASE } },
};

const outlineBtn =
  "inline-flex items-center rounded-[2px] border border-white/70 px-8 py-4 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-white transition-colors duration-500 ease-soft hover:border-white hover:bg-white hover:text-ink";

export function Hero() {
  const reduceMotion = useReducedMotion();
  const lenis = useLenis();
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);

  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const swipeX = useRef<number | null>(null);

  useEffect(() => {
    if (reduceMotion) setPlaying(false);
  }, [reduceMotion]);

  const running = playing && inView && pageVisible;

  const goTo = useCallback((next: number) => {
    setActive((current) => {
      const target = (next + SLIDES.length) % SLIDES.length;
      if (target !== current) setPrev(current);
      return target;
    });
  }, []);

  // Keyboard: ← / → while focus is inside the hero.
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") goTo(active - 1);
    if (e.key === "ArrowRight") goTo(active + 1);
  };

  // Touch swipe.
  const onPointerDown = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") swipeX.current = e.clientX;
  };
  const onPointerUp = (e: PointerEvent) => {
    if (swipeX.current === null) return;
    const dx = e.clientX - swipeX.current;
    swipeX.current = null;
    if (Math.abs(dx) > 50) goTo(active + (dx < 0 ? 1 : -1));
  };

  // Pause when off-screen or the browser tab is hidden.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.15 },
    );
    io.observe(el);
    const onVis = () => setPageVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  // Depth on scroll: photo lags behind, text lifts and fades away.
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const trigger = sectionRef.current;
      gsap.to(mediaRef.current, {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(contentRef.current, {
        y: -80,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger,
          start: "top top",
          end: "65% top",
          scrub: true,
        },
      });
    });
    return () => mm.revert();
  }, []);

  const scrollOn = () => {
    const target = document.getElementById("services-showcase");
    if (!target) return;
    if (lenis) lenis.scrollTo(target, { duration: 1.6 });
    else target.scrollIntoView({ behavior: "smooth" });
  };

  const slide = SLIDES[active];

  return (
    <MotionConfig reducedMotion="user">
      <section
        ref={sectionRef}
        aria-roledescription="carousel"
        aria-label="Prime Capital highlights"
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        className="relative isolate flex min-h-[max(100svh,640px)] items-center overflow-hidden bg-ink"
      >
        <h1 className="sr-only">
          Prime Capital &amp; Investment Limited: Building Wealth. Preserving
          Trust.
        </h1>

        {/* Layer 1 — photography: slow cross-fade + push-in toward the camera */}
        <div ref={mediaRef} aria-hidden className="absolute inset-0 -z-10">
          {SLIDES.map((s, i) => {
            const isActive = i === active;
            const isPrev = i === prev;
            return (
              <div
                key={s.image}
                className={`absolute inset-0 transition-opacity duration-[1600ms] ease-soft ${
                  isActive
                    ? "z-[2] opacity-100"
                    : isPrev
                      ? "z-[1] opacity-100"
                      : "z-0 opacity-0"
                }`}
              >
                <div
                  className={`absolute inset-0 ${isActive || isPrev ? "push-in" : ""}`}
                  style={{ transformOrigin: s.origin }}
                >
                  <Image
                    src={s.image}
                    alt=""
                    fill
                    sizes="100vw"
                    quality={75}
                    priority={i === 0}
                    className="object-cover"
                    style={{ objectPosition: s.focus }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Layer 2 — ink wash */}
        <div aria-hidden className="absolute inset-0 -z-10 bg-ink/60" />

        {/* Layer 3 — vignette for centred text, faint gold light streaks, floor fade */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 48%, rgba(10,16,36,0.45) 0%, rgba(10,16,36,0.15) 60%, rgba(10,16,36,0.55) 100%)",
          }}
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
          aria-hidden
          className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-linear-to-t from-ink/85 to-transparent"
        />

        {/* Layer 4 — centred content */}
        <div
          ref={contentRef}
          className="relative mx-auto w-full max-w-5xl px-6 pb-48 pt-36 text-center sm:px-10"
        >
          <div aria-live={running ? "off" : "polite"}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                variants={group}
                initial="hidden"
                animate="show"
                exit="exit"
                className="flex flex-col items-center"
              >
                {slide.eyebrow && (
                  <motion.p
                    variants={rise}
                    className="mb-5 font-display text-lg italic text-gold-soft md:text-xl"
                  >
                    {slide.eyebrow}
                  </motion.p>
                )}

                <motion.p
                  variants={settle}
                  className="font-display text-[2.75rem] font-normal leading-[1.06] tracking-[-0.01em] text-white text-balance [text-shadow:0_2px_30px_rgba(10,16,36,0.45)] sm:text-6xl lg:text-[5.25rem]"
                >
                  {slide.headline}
                </motion.p>

                <motion.p
                  variants={rise}
                  className="mt-7 max-w-2xl text-base leading-relaxed text-white/80 [text-shadow:0_1px_16px_rgba(10,16,36,0.5)] md:text-lg"
                >
                  {slide.body}
                </motion.p>

                <motion.div
                  variants={rise}
                  className="mt-10 flex flex-wrap items-center justify-center gap-4"
                >
                  {slide.secondary ? (
                    <>
                      <Link
                        href={slide.primary.href}
                        className="btn-sheen group inline-flex items-center gap-3 rounded-[2px] bg-gold-refined px-8 py-4 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-ink transition-colors duration-500 ease-soft hover:bg-gold-soft"
                      >
                        {slide.primary.label}
                        <ArrowRight
                          aria-hidden
                          className="h-4 w-4 transition-transform duration-500 ease-soft group-hover:translate-x-1"
                        />
                      </Link>
                      <Link href={slide.secondary.href} className={outlineBtn}>
                        {slide.secondary.label}
                      </Link>
                    </>
                  ) : (
                    <Link href={slide.primary.href} className={outlineBtn}>
                      {slide.primary.label}
                    </Link>
                  )}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Edge arrows (Cardinal-style) */}
        {(
          [
            {
              dir: -1,
              label: "Previous slide",
              Icon: ChevronLeft,
              side: "left",
            },
            { dir: 1, label: "Next slide", Icon: ChevronRight, side: "right" },
          ] as const
        ).map(({ dir, label, Icon, side }) => (
          <motion.button
            key={side}
            type="button"
            onClick={() => goTo(active + dir)}
            aria-label={label}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.4, ease: EASE }}
            className={`group absolute top-1/2 z-10 hidden h-16 w-12 -translate-y-1/2 cursor-pointer items-center justify-center text-white/55 transition-colors duration-500 hover:text-white md:flex ${
              side === "left" ? "left-3 lg:left-6" : "right-3 lg:right-6"
            }`}
          >
            <Icon
              aria-hidden
              strokeWidth={1}
              className={`h-10 w-10 transition-transform duration-500 ease-soft ${
                side === "left"
                  ? "group-hover:-translate-x-1"
                  : "group-hover:translate-x-1"
              }`}
            />
          </motion.button>
        ))}

        {/* Scroll cue — gently bobbing */}
        <motion.button
          type="button"
          onClick={scrollOn}
          aria-label="Scroll to our services"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.8, ease: EASE }}
          className="absolute bottom-[100px] left-1/2 z-10 hidden -translate-x-1/2 cursor-pointer p-2 text-white/70 transition-colors hover:text-white md:block"
        >
          <motion.span
            className="block"
            animate={{ y: [0, 7, 0] }}
            transition={{
              duration: 2.6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <ChevronDown aria-hidden strokeWidth={1.25} className="h-7 w-7" />
          </motion.span>
        </motion.button>

        {/* Slide timer + pause (quiet, bottom-right) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.8, ease: EASE }}
          className="absolute bottom-[120px] left-1/2 z-10 flex -translate-x-1/2 items-center gap-0.5 opacity-60 transition-opacity duration-500 hover:opacity-100 focus-within:opacity-100 md:bottom-[104px] md:left-auto md:right-6 md:translate-x-0 lg:right-10"
        >
          {SLIDES.map((s, i) => (
            <button
              key={s.image}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === active ? "true" : undefined}
              className="group relative h-6 w-5 cursor-pointer sm:w-6"
            >
              <span className="absolute inset-x-1 top-1/2 h-px -translate-y-1/2 bg-white/15 transition-colors group-hover:bg-white/40" />
              {i === active && (
                <span
                  key={`run-${active}`}
                  onAnimationEnd={() => {
                    if (
                      window.matchMedia("(prefers-reduced-motion: reduce)")
                        .matches
                    )
                      return;
                    goTo(active + 1);
                  }}
                  className="hero-progress absolute inset-x-1 top-1/2 h-px origin-left bg-gold-refined/80"
                  style={{
                    animationDuration: `${SLIDE_MS}ms`,
                    animationPlayState: running ? "running" : "paused",
                    ...(reduceMotion
                      ? { animation: "none", transform: "translateY(-50%)" }
                      : {}),
                  }}
                />
              )}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pause slideshow" : "Play slideshow"}
            className="flex h-8 w-7 cursor-pointer items-center justify-center text-white/45 transition-colors hover:text-white"
          >
            {playing ? (
              <Pause aria-hidden className="h-2.5 w-2.5" />
            ) : (
              <Play aria-hidden className="h-2.5 w-2.5" />
            )}
          </button>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
