"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Gem,
  Handshake,
  Lightbulb,
  LockKeyhole,
  Scale,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import { type CSSProperties, type PointerEvent, useState } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;
const HEX = "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)";

/* Existing, approved PCI wording. `key` is a word lifted verbatim from each
   title, used only as the short label inside the hexagon. */
const TENETS = [
  {
    key: "Confidentiality",
    icon: LockKeyhole,
    title: "Confidentiality & Data Sovereignty",
    note: "We treat client information as sacred capital. Every portfolio detail, transaction, and strategic discussion is protected by strict confidentiality protocols, secure infrastructure, and governance controls. Discretion is not optional; it is a core responsibility.",
  },
  {
    key: "Integrity",
    icon: Scale,
    title: "Integrity & Transparency",
    note: "Trust is the foundation of wealth management. We uphold the highest ethical standards, ensuring full transparency in disclosures, reporting, and decision-making. Our clients always understand where their capital is invested and why.",
  },
  {
    key: "Excellence",
    icon: Gem,
    title: "Excellence & Confidence",
    note: "We pursue superior outcomes through rigorous research, data-driven analysis and professional expertise. The 'Gold standard' defines our commitment to quality, precision, and confidence-inspiring performance.",
  },
  {
    key: "Stewardship",
    icon: ShieldCheck,
    title: "Disciplined, Risk-Aware Stewardship",
    note: "We act as fiduciaries first. Our long-term, risk-aware approach balances return optimisation with capital preservation, supported by robust governance and continuous risk monitoring.",
  },
  {
    key: "Partnership",
    icon: Handshake,
    title: "Client-Centric Partnership",
    note: "Our clients are the centre of everything we do. We build enduring partnerships by tailoring strategies to individual goals, risk profiles, and legacy aspirations.",
  },
  {
    key: "Innovation",
    icon: Lightbulb,
    title: "Innovation for Sustainable Growth",
    note: "We embrace innovation responsibly by leveraging cutting-edge technology, analytics, and sustainable practices to deliver resilient solutions in an evolving global market.",
  },
];

/* Tilt a block toward the pointer — subtle, springy, off for reduced motion. */
function useTilt(max = 8) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 60, damping: 18 });
  const sy = useSpring(y, { stiffness: 60, damping: 18 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-max, max]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [max, -max]);
  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onPointerLeave = () => {
    x.set(0);
    y.set(0);
  };
  return { rotateX, rotateY, onPointerMove, onPointerLeave };
}

/* ------------------------------------------------------------------ */

function Honeycomb({
  active,
  setActive,
}: {
  active: number | null;
  setActive: (i: number | null) => void;
}) {
  const tilt = useTilt(7);

  return (
    <div
      className="mt-16 flex justify-center [perspective:1400px] md:mt-20"
      onPointerMove={tilt.onPointerMove}
      onPointerLeave={() => {
        tilt.onPointerLeave();
        setActive(null);
      }}
    >
      {/* Honeycomb geometry: flat-top hexes, w × 0.866w, columns step 0.75w.
          Mobile = 2 staggered columns; md+ = one zig-zag row of six. */}
      <motion.ul
        style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY }}
        className="relative [--w:184px] [--h:calc(var(--w)*0.866)] h-[calc(var(--h)*3.5)] w-[calc(var(--w)*1.75)] sm:[--w:200px] md:[--w:146px] md:h-[calc(var(--h)*1.5)] md:w-[calc(var(--w)*4.75)] lg:[--w:196px] xl:[--w:228px]"
      >
        {TENETS.map((t, i) => {
          const gold = i % 2 === 1;
          const on = active === i;
          // mobile position (2 columns) and desktop position (zig-zag row)
          const xm = (i % 2) * 0.75;
          const ym = Math.floor(i / 2) + (i % 2) * 0.5;
          const xd = i * 0.75;
          const yd = (i % 2) * 0.5;
          return (
            <motion.li
              key={t.key}
              className="absolute left-[calc(var(--xm)*var(--w))] top-[calc(var(--ym)*var(--h))] h-(--h) w-(--w) md:left-[calc(var(--xd)*var(--w))] md:top-[calc(var(--yd)*var(--h))]"
              style={
                {
                  "--xm": xm,
                  "--ym": ym,
                  "--xd": xd,
                  "--yd": yd,
                  zIndex: on ? 10 : 1,
                  transformPerspective: 900,
                } as CSSProperties
              }
              initial={{ opacity: 0, rotateY: -80, z: -120 }}
              whileInView={{ opacity: 1, rotateY: 0, z: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1.3, ease: EASE, delay: 0.15 + i * 0.14 }}
            >
              <motion.a
                href={`#tenet-${i + 1}`}
                onPointerEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                animate={{ scale: on ? 1.07 : 0.965, z: on ? 60 : 0 }}
                transition={{ type: "spring", stiffness: 160, damping: 20 }}
                className="block h-full w-full outline-none drop-shadow-[0_18px_28px_rgba(0,0,0,0.45)]"
                aria-label={t.title}
              >
                <span
                  className={`relative flex h-full w-full flex-col items-center justify-center overflow-hidden text-center transition-colors duration-700 ease-soft ${
                    on
                      ? "bg-gold-soft"
                      : gold
                        ? "bg-gold-refined"
                        : "bg-[#17203d]"
                  }`}
                  style={{ clipPath: HEX }}
                >
                  {/* bevelled light: top glow + inner edge */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,rgba(255,255,255,0.22),transparent_60%)]"
                  />
                  {/* slow sheen when lit */}
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-linear-to-r from-transparent via-white/35 to-transparent transition-transform duration-[1400ms] ease-soft ${
                      on ? "translate-x-[320%]" : "translate-x-0"
                    }`}
                  />
                  <t.icon
                    aria-hidden
                    strokeWidth={1.2}
                    className={`relative h-9 w-9 transition-colors duration-700 lg:h-11 lg:w-11 xl:h-12 xl:w-12 ${
                      on || gold ? "text-ink" : "text-gold-soft"
                    }`}
                  />
                  <span
                    className={`relative mt-3 font-display text-[15px] transition-colors duration-700 md:text-[12.5px] lg:text-[16px] xl:text-[18px] ${
                      on || gold ? "text-ink" : "text-white"
                    }`}
                  >
                    {t.key}
                  </span>
                </span>
              </motion.a>
            </motion.li>
          );
        })}
      </motion.ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */

/** A classical seal: PCI mark in a disc, an engraved ring of words turning
    slowly, tilting toward the pointer. */
function Seal() {
  const tilt = useTilt(12);
  return (
    <div
      className="flex justify-center [perspective:1200px]"
      onPointerMove={tilt.onPointerMove}
      onPointerLeave={tilt.onPointerLeave}
    >
      <motion.div
        style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY }}
        initial={{ opacity: 0, scale: 0.86 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.6, ease: EASE }}
        className="relative aspect-square w-[min(78vw,380px)] [transform-style:preserve-3d]"
      >
        {/* soft gold halo */}
        <span
          aria-hidden
          className="absolute -inset-10 rounded-full bg-[radial-gradient(circle,rgba(201,162,75,0.22),transparent_65%)]"
        />
        {/* engraved rotating ring */}
        <svg
          viewBox="0 0 200 200"
          aria-hidden="true"
          className="seal-spin absolute inset-0 h-full w-full"
        >
          <defs>
            <path
              id="seal-ring"
              d="M100,100 m-86,0 a86,86 0 1,1 172,0 a86,86 0 1,1 -172,0"
            />
          </defs>
          <circle
            cx="100"
            cy="100"
            r="98"
            fill="none"
            stroke="rgba(201,162,75,0.55)"
            strokeWidth="0.6"
          />
          <circle
            cx="100"
            cy="100"
            r="76"
            fill="none"
            stroke="rgba(201,162,75,0.55)"
            strokeWidth="0.6"
          />
          <text
            fill="#d8b86e"
            textLength="532"
            lengthAdjust="spacing"
            fontSize="9.4"
            letterSpacing="3.2"
            style={{ fontFamily: "var(--font-display, serif)" }}
          >
            <textPath href="#seal-ring" startOffset="0">
              STEWARDSHIP · EXCELLENCE · RESPONSIBILITY ·
            </textPath>
          </text>
        </svg>
        {/* the disc, lifted off the ring in 3D */}
        <div
          className="absolute inset-[19%] flex items-center justify-center overflow-hidden rounded-full bg-[radial-gradient(circle_at_35%_30%,#1d2850,#0a1024_70%)] shadow-[0_30px_60px_-10px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.12),inset_0_0_0_1px_rgba(201,162,75,0.45)]"
          style={{ transform: "translateZ(40px)" }}
        >
          <Image
            src="/logo-mark.png"
            alt=""
            width={240}
            height={240}
            className="h-[58%] w-[58%] object-contain drop-shadow-[0_6px_18px_rgba(201,162,75,0.35)]"
          />
          <span
            aria-hidden
            className="seal-sheen pointer-events-none absolute inset-0 bg-linear-to-tr from-transparent via-white/12 to-transparent"
          />
        </div>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

export function Philosophy() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section
      id="philosophy"
      className="relative isolate scroll-mt-24 overflow-hidden bg-ink px-4 py-24 text-white sm:px-6 md:py-36 lg:px-8"
    >
      {/* atmosphere: gold glow + fine engraved lines */}
      <span
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_30%,rgba(201,162,75,0.14),transparent_70%)]"
      />
      <span
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.07] [background-image:repeating-linear-gradient(115deg,#c9a24b_0_1px,transparent_1px_90px)]"
      />

      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, ease: EASE }}
          className="mx-auto max-w-3xl text-center"
        >
          <span
            aria-hidden
            className="mx-auto mb-8 block h-14 w-px bg-linear-to-b from-transparent to-gold-refined"
          />
          <h2 className="font-display text-[2.4rem] font-normal leading-[1.08] tracking-tight md:text-[4rem]">
            Our Corporate{" "}
            <em className="font-normal text-gold-soft">Philosophy</em>
          </h2>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-[1.85] text-text-muted-light md:text-lg">
            Our philosophy goes beyond asset management; it is a covenant of
            stewardship, excellence, and responsibility. Our core tenets are:
          </p>
        </motion.div>

        <Honeycomb active={active} setActive={setActive} />

        {/* Seal + tenets (Cardinal "Core Values" detail) */}
        <div className="mt-24 grid items-start gap-16 md:mt-32 lg:grid-cols-12 lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:col-span-5">
            <Seal />
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
              className="mx-auto mt-12 max-w-sm text-center font-display text-2xl leading-snug text-white md:text-[1.75rem]"
            >
              <span className="text-gold-soft">&ldquo;</span>It is a covenant of
              stewardship, excellence, and responsibility.
              <span className="text-gold-soft">&rdquo;</span>
            </motion.blockquote>
          </div>

          <ol className="grid gap-x-14 gap-y-4 sm:grid-cols-2 lg:col-span-7">
            {TENETS.map((t, i) => {
              const on = active === i;
              return (
                <motion.li
                  key={t.key}
                  id={`tenet-${i + 1}`}
                  onPointerEnter={() => setActive(i)}
                  onPointerLeave={() => setActive(null)}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 1,
                    ease: EASE,
                    delay: (i % 2) * 0.12,
                  }}
                  className="relative scroll-mt-32 py-7"
                >
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-px bg-white/10"
                  />
                  <span
                    aria-hidden
                    className={`absolute left-0 top-0 h-px bg-gold-refined transition-all duration-700 ease-soft ${
                      on ? "w-full" : "w-10"
                    }`}
                  />
                  <h3 className="font-display text-[1.35rem] font-normal leading-snug md:text-[1.55rem]">
                    <span
                      className={`transition-colors duration-700 ${
                        on ? "text-gold-soft" : "text-white"
                      }`}
                    >
                      {t.title}
                    </span>
                  </h3>
                  <p className="mt-4 text-[15px] leading-[1.85] text-text-muted-light">
                    {t.note}
                  </p>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
