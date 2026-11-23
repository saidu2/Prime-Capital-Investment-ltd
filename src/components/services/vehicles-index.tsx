"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import Image from "next/image";
import { type PointerEvent, useRef, useState } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/* Existing, approved PCI wording (Investment Vehicles page). */
const VEHICLES = [
  {
    title: "Money Market Instruments",
    items: [
      "Treasury Bills",
      "Commercial Papers",
      "Certificate of Deposits",
      "Bankers Acceptances",
    ],
    image: "/service-portfolio.jpg",
  },
  {
    title: "Fixed Income Securities",
    items: ["FGN Bonds", "Sub-National Bonds", "Corporate Debenture"],
    image: "/service-nondiscretionary-alt.jpg",
  },
  {
    title: "Equities",
    items: [
      "Listed on SEC recognized Exchanges for trading and long-term investments",
    ],
    image: "/hero-1.jpg",
  },
  {
    title: "Ethical Compliant Products",
    items: ["Sukuk", "Murabaha", "Musharakah", "Mudarabah", "Ijarah"],
    image: "/service-shariah.jpg",
  },
  {
    title: "Alternative Investments",
    items: [
      "Private Equity",
      "Infrastructure Funds",
      "Commodities",
      "Real Estate",
    ],
    image: "/hero-3.jpg",
  },
];

/** A ledger of vehicles; on desktop a photograph floats beside the cursor. */
export function VehiclesIndex() {
  const reduce = useReducedMotion();
  const [hover, setHover] = useState<number | null>(null);
  const box = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 120, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 120, damping: 22, mass: 0.6 });

  const onMove = (e: PointerEvent) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  };

  return (
    <div
      ref={box}
      className="relative"
      onPointerMove={onMove}
      onPointerLeave={() => setHover(null)}
    >
      {/* floating preview (desktop pointer only) */}
      <motion.div
        aria-hidden
        style={{ x: sx, y: sy }}
        className="pointer-events-none absolute left-0 top-0 z-20 hidden [@media(hover:hover)_and_(min-width:1024px)]:block"
      >
        <AnimatePresence>
          {hover !== null && !reduce && (
            <motion.div
              key={hover}
              initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="absolute -left-[150px] -top-[100px] h-[200px] w-[300px] overflow-hidden shadow-[0_40px_80px_-20px_rgba(10,16,36,0.6)]"
            >
              <Image
                src={VEHICLES[hover].image}
                alt=""
                fill
                sizes="300px"
                className="object-cover"
              />
              <span className="absolute inset-0 ring-1 ring-inset ring-gold-refined/40" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <ol className="border-t border-ink/10">
        {VEHICLES.map((v, i) => {
          const on = hover === i;
          return (
            <motion.li
              key={v.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1, ease: EASE, delay: i * 0.08 }}
              onPointerEnter={() => setHover(i)}
              className="relative border-b border-ink/10"
            >
              {/* ink wash slides in on hover */}
              <span
                aria-hidden
                className={`absolute inset-0 origin-left bg-ink transition-transform duration-700 ease-soft ${
                  on ? "scale-x-100" : "scale-x-0"
                }`}
              />
              <div className="relative grid gap-6 py-10 md:grid-cols-12 md:items-center md:gap-10 md:py-12">
                {/* mobile/tablet photo */}
                <div className="relative aspect-[16/9] overflow-hidden lg:hidden">
                  <Image
                    src={v.image}
                    alt=""
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                </div>
                <h3
                  className={`font-display text-[1.9rem] font-normal leading-tight tracking-tight transition-all duration-700 ease-soft md:col-span-6 md:pl-6 md:text-[2.6rem] ${
                    on ? "translate-x-2 text-white" : "text-ink"
                  }`}
                >
                  {v.title}
                </h3>
                <ul className="flex flex-wrap gap-2.5 md:col-span-6 md:pr-6">
                  {v.items.map((item) => (
                    <li
                      key={item}
                      className={`border px-4 py-2 text-[14px] leading-snug transition-colors duration-700 ${
                        on
                          ? "border-white/20 text-white/90"
                          : "border-ink/12 text-ink/80"
                      }`}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
