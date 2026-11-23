"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  FileText,
  LineChart,
  LockKeyhole,
  MessagesSquare,
  PieChart,
} from "lucide-react";
import type { PointerEvent } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/* An abstract, number-free preview of the portal: no figures are shown so it
   can never be mistaken for real performance. */
const PATH =
  "M0,92 C30,88 45,70 70,72 C95,74 110,56 135,52 C160,48 175,60 200,46 C225,32 240,38 265,26 C290,14 305,22 330,12";

export function PortalPreview() {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useTransform(
    useSpring(y, { stiffness: 60, damping: 18 }),
    [-0.5, 0.5],
    [7, -7],
  );
  const ry = useTransform(
    useSpring(x, { stiffness: 60, damping: 18 }),
    [-0.5, 0.5],
    [-9, 9],
  );

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <div
      className="relative [perspective:1400px]"
      onPointerMove={onMove}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <span
        aria-hidden
        className="absolute -inset-16 rounded-full bg-[radial-gradient(circle,rgba(201,162,75,0.28),transparent_65%)] blur-2xl"
      />
      <motion.div
        aria-hidden
        style={{ rotateX: rx, rotateY: ry }}
        initial={{ opacity: 0, y: 40, rotateX: 18 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 1.4, ease: EASE, delay: 0.3 }}
        className="relative overflow-hidden rounded-[14px] border border-white/12 bg-white/[0.05] p-5 shadow-[0_60px_120px_-40px_rgba(0,0,0,0.8)] backdrop-blur-xl [transform-style:preserve-3d]"
      >
        {/* window chrome */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            {/* biome-ignore lint/performance/noImgElement: tiny static mark */}
            <img src="/logo-mark.png" alt="" className="h-7 w-7" />
            <span className="font-display text-[15px] text-white">
              Investment Portal
            </span>
          </div>
          <span className="flex items-center gap-1.5 rounded-full border border-gold-refined/40 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-gold-soft">
            <LockKeyhole className="h-3 w-3" /> Secure
          </span>
        </div>

        <div className="mt-5 grid grid-cols-[1.6fr_1fr] gap-4">
          {/* chart card */}
          <div className="rounded-[10px] border border-white/10 bg-ink/50 p-4">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/60">
              <LineChart className="h-3.5 w-3.5 text-gold-soft" /> Portfolio
            </div>
            <div className="mt-3 h-2.5 w-24 rounded-full bg-white/15" />
            <svg
              viewBox="0 0 330 100"
              className="mt-4 h-28 w-full"
              role="presentation"
            >
              <defs>
                <linearGradient id="pp-fill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#c9a24b" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#c9a24b" stopOpacity="0" />
                </linearGradient>
              </defs>
              <motion.path
                d={`${PATH} L330,100 L0,100 Z`}
                fill="url(#pp-fill)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 1.6 }}
              />
              <motion.path
                d={PATH}
                fill="none"
                stroke="#d8b86e"
                strokeWidth="2.2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2.2, ease: EASE, delay: 0.9 }}
              />
            </svg>
          </div>
          {/* allocation card */}
          <div className="rounded-[10px] border border-white/10 bg-ink/50 p-4">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/60">
              <PieChart className="h-3.5 w-3.5 text-gold-soft" /> Allocation
            </div>
            <svg
              viewBox="0 0 42 42"
              className="mx-auto mt-3 h-24 w-24 -rotate-90"
              role="presentation"
            >
              {[
                { c: "#c9a24b", len: 45, off: 0 },
                { c: "#d8b86e80", len: 30, off: -45 },
                { c: "#ffffff40", len: 25, off: -75 },
              ].map((s, i) => (
                <motion.circle
                  key={s.c}
                  cx="21"
                  cy="21"
                  r="15.9"
                  fill="none"
                  stroke={s.c}
                  strokeWidth="5"
                  strokeDasharray={`${s.len} ${100 - s.len}`}
                  strokeDashoffset={s.off}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.2 + i * 0.25 }}
                />
              ))}
            </svg>
          </div>
        </div>

        {/* rows */}
        <div className="mt-4 grid grid-cols-2 gap-4">
          {[
            { icon: FileText, label: "Statements" },
            { icon: MessagesSquare, label: "Secure messages" },
          ].map((r, i) => (
            <motion.div
              key={r.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 1.4 + i * 0.15 }}
              className="flex items-center gap-3 rounded-[10px] border border-white/10 bg-ink/50 p-4"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-refined/15 text-gold-soft">
                <r.icon className="h-4 w-4" />
              </span>
              <span className="flex-1">
                <span className="block text-[13px] text-white/85">
                  {r.label}
                </span>
                <span className="mt-1.5 block h-2 w-16 rounded-full bg-white/12" />
              </span>
            </motion.div>
          ))}
        </div>

        {/* sheen */}
        <span
          aria-hidden
          className="seal-sheen pointer-events-none absolute inset-0 bg-linear-to-tr from-transparent via-white/[0.06] to-transparent"
        />
      </motion.div>
    </div>
  );
}
