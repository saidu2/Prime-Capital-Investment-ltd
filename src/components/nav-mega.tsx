"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const EASE = [0.22, 1, 0.36, 1] as const;

export type MegaKind = "services" | "about";

const SERVICE_TILES = [
  {
    label: "Fund & Portfolio Management",
    href: "/services#offerings",
    image: "/service-portfolio.jpg",
    focus: "60% 40%",
  },
  {
    label: "Private Wealth",
    href: "/services#offerings",
    image: "/client-personal.jpg",
    focus: "50% 30%",
  },
  {
    label: "Investment Advisory",
    href: "/services#offerings",
    image: "/service-advisory.jpg",
    focus: "50% 40%",
  },
  {
    label: "Corporate & Institutional",
    href: "/services#offerings",
    image: "/client-institutional.jpg",
    focus: "50% 30%",
  },
  {
    label: "Shari'ah-Compliant Products",
    href: "/services#offerings",
    image: "/service-shariah.jpg",
    focus: "50% 45%",
  },
  {
    label: "Investment Vehicles",
    href: "/investment-vehicles",
    image: "/hero-3.jpg",
    focus: "50% 40%",
  },
];

const ABOUT_COLUMNS = [
  {
    title: "Corporate Profile",
    image: "/about-office.jpg",
    focus: "50% 30%",
    links: [
      { label: "Who We Are", href: "/about" },
      { label: "Corporate Philosophy", href: "/about#philosophy" },
      { label: "Our Journey", href: "/about#history" },
    ],
  },
  {
    title: "Leadership",
    image: "/board-room.jpg",
    focus: "50% 55%",
    links: [
      { label: "Board of Directors", href: "/about/board" },
      { label: "Management Team", href: "/about/management" },
      { label: "Careers", href: "/careers" },
    ],
  },
];

function Intro({
  eyebrow,
  title,
  text,
  cta,
  dark,
  onNavigate,
}: {
  eyebrow: string;
  title: string;
  text: string;
  cta: { href: string; label: string };
  dark?: boolean;
  onNavigate: () => void;
}) {
  return (
    <div
      className={`relative flex flex-col justify-between p-9 ${dark ? "bg-ink text-white" : "bg-paper text-ink"}`}
    >
      <div>
        <p
          className={`text-[11px] font-bold uppercase tracking-[0.26em] ${dark ? "text-gold-soft" : "text-gold-refined"}`}
        >
          {eyebrow}
        </p>
        <p className="mt-4 font-display text-[1.75rem] leading-[1.15]">
          {title}
        </p>
        <p
          className={`mt-4 text-[14.5px] leading-[1.75] ${dark ? "text-text-muted-light" : "text-text-muted-dark"}`}
        >
          {text}
        </p>
      </div>
      <Link
        href={cta.href}
        onClick={onNavigate}
        className={`group mt-8 inline-flex items-center gap-4 text-[12.5px] font-bold uppercase tracking-[0.18em] ${dark ? "text-gold-soft" : "text-ink"}`}
      >
        <span
          aria-hidden
          className="h-px w-8 bg-gold-refined transition-all duration-500 ease-soft group-hover:w-14"
        />
        {cta.label}
      </Link>
    </div>
  );
}

/** Wide dropdown panel (Norrenberger pattern), anchored to the header bar. */
export function MegaPanel({
  kind,
  onNavigate,
}: {
  kind: MegaKind;
  onNavigate: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="absolute inset-x-4 top-full pt-3 sm:inset-x-6 lg:inset-x-8"
    >
      <div className="relative grid overflow-hidden rounded-[4px] bg-white shadow-[0_40px_90px_-30px_rgba(10,16,36,0.55)] lg:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)]">
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 z-10 h-[2px] bg-gold-refined"
        />
        {kind === "services" ? (
          <>
            <Intro
              eyebrow="Our Services"
              title="Investment & Advisory Services"
              text="Four service lines address distinct client needs within a shared investment and risk framework."
              cta={{ href: "/services", label: "View Services" }}
              onNavigate={onNavigate}
            />
            <ul className="grid grid-cols-3 gap-4 p-7">
              {SERVICE_TILES.map((t, i) => (
                <motion.li
                  key={t.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.45,
                    ease: EASE,
                    delay: 0.05 + i * 0.04,
                  }}
                >
                  <Link
                    href={t.href}
                    onClick={onNavigate}
                    className="group relative block aspect-[16/9] overflow-hidden bg-ink"
                  >
                    <Image
                      src={t.image}
                      alt=""
                      fill
                      sizes="240px"
                      className="object-cover transition-transform duration-[1400ms] ease-soft group-hover:scale-110"
                      style={{ objectPosition: t.focus }}
                    />
                    <span
                      aria-hidden
                      className="absolute inset-0 bg-linear-to-t from-ink/90 via-ink/40 to-ink/10 transition-colors duration-500 group-hover:bg-ink/20"
                    />
                    <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4">
                      <span className="text-[14.5px] font-semibold leading-snug text-white">
                        {t.label}
                      </span>
                      <ArrowRight
                        aria-hidden
                        className="h-4 w-4 shrink-0 -translate-x-1 text-gold-soft opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100"
                      />
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <Intro
              dark
              eyebrow="About Us"
              title="Who We Are"
              text="A Fund and Portfolio Management firm built on disciplined expertise, unwavering integrity, trust, and a clear commitment to long-term wealth creation."
              cta={{ href: "/about", label: "Learn More" }}
              onNavigate={onNavigate}
            />
            <div className="grid grid-cols-2 gap-8 p-7">
              {ABOUT_COLUMNS.map((c, ci) => (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.45,
                    ease: EASE,
                    delay: 0.05 + ci * 0.08,
                  }}
                >
                  <Link
                    href={c.links[0].href}
                    onClick={onNavigate}
                    className="group relative block h-24 overflow-hidden bg-ink"
                  >
                    <Image
                      src={c.image}
                      alt=""
                      fill
                      sizes="360px"
                      className="object-cover transition-transform duration-[1400ms] ease-soft group-hover:scale-110"
                      style={{ objectPosition: c.focus }}
                    />
                    <span
                      aria-hidden
                      className="absolute inset-0 bg-linear-to-r from-ink/90 to-ink/30"
                    />
                    <span className="absolute inset-0 flex items-center px-5 font-display text-[1.35rem] text-white">
                      {c.title}
                    </span>
                  </Link>
                  <ul className="mt-4 space-y-1">
                    {c.links.map((l) => (
                      <li key={l.label}>
                        <Link
                          href={l.href}
                          onClick={onNavigate}
                          className="group/l flex items-center justify-between rounded-[3px] px-3 py-2.5 text-[15px] font-medium text-text-muted-dark transition-colors duration-300 hover:bg-ink hover:text-white"
                        >
                          {l.label}
                          <ArrowRight
                            aria-hidden
                            className="h-4 w-4 -translate-x-1 text-gold-refined opacity-0 transition-all duration-300 group-hover/l:translate-x-0 group-hover/l:opacity-100"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}
