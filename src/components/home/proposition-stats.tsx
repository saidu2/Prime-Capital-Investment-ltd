"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/* Figures and disclaimer from the owner's Corporate Profile deck
   ("The Prime Capital Proposition", 2026-11-22). The disclaimer must stay
   with the figures: they describe leadership experience in prior roles. */
const STATS = [
  { prefix: "", value: 40, suffix: "+", label: "years of finance leadership" },
  { prefix: "₦", value: 18, suffix: "tn+", label: "PenCom investment reviews" },
  { prefix: "₦", value: 200, suffix: "bn+", label: "prior asset stewardship" },
  {
    prefix: "",
    value: 20,
    suffix: "+",
    label: "years of multi-asset execution and supervision",
  },
];

function Counter({
  value,
  prefix,
  suffix,
}: {
  value: number;
  prefix: string;
  suffix: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setN(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 2.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {n}
      {suffix}
    </span>
  );
}

export function PropositionStats() {
  return (
    <div className="mt-16 md:mt-20">
      <ul className="grid grid-cols-2 gap-y-12 border-t border-ink/10 pt-12 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <li
            key={s.label}
            className={`px-4 text-center ${i % 2 === 1 ? "border-l border-ink/10" : ""} lg:border-l lg:first:border-l-0`}
          >
            <p className="font-display text-[2.6rem] leading-none text-ink md:text-[3.6rem]">
              <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
            </p>
            <p className="mx-auto mt-4 max-w-[14rem] text-[13.5px] leading-snug text-text-muted-dark">
              {s.label}
            </p>
          </li>
        ))}
      </ul>
      <p className="mt-10 text-center text-[12.5px] italic text-text-muted-dark">
        Prior-role experience; figures are not Prime Capital AUM.
      </p>
    </div>
  );
}
