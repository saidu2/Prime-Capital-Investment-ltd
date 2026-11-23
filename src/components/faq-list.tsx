"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import type { FaqGroup } from "@/data/faqs";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Grouped accordion; group tabs on the left (sticky on desktop). */
export function FaqList({ groups }: { groups: FaqGroup[] }) {
  const [group, setGroup] = useState(groups[0].id);
  const [open, setOpen] = useState<string | null>(groups[0].items[0].q);
  const g = groups.find((x) => x.id === group) ?? groups[0];

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
      <div
        role="tablist"
        aria-label="Topics"
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] lg:col-span-4 lg:mx-0 lg:flex-col lg:gap-3 lg:self-start lg:px-0 lg:sticky lg:top-40"
      >
        {groups.map((x) => {
          const on = x.id === group;
          return (
            <button
              key={x.id}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => {
                setGroup(x.id);
                setOpen(x.items[0].q);
              }}
              className={`shrink-0 whitespace-nowrap px-6 py-5 text-left text-[15px] font-medium transition-all duration-500 ease-soft ${
                on
                  ? "bg-ink text-white shadow-[0_20px_40px_-20px_rgba(10,16,36,0.6)]"
                  : "bg-white text-ink/70 hover:text-ink"
              }`}
            >
              {x.title}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.ul
          key={g.id}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="border-t border-ink/10 lg:col-span-8"
        >
          {g.items.map((f) => {
            const on = open === f.q;
            return (
              <li key={f.q} className="border-b border-ink/10">
                <button
                  type="button"
                  onClick={() => setOpen(on ? null : f.q)}
                  aria-expanded={on}
                  className="group flex w-full items-start justify-between gap-6 py-7 text-left"
                >
                  <span
                    className={`font-display text-[1.25rem] leading-snug transition-colors duration-500 md:text-[1.45rem] ${on ? "text-gold-refined" : "text-ink group-hover:text-gold-refined"}`}
                  >
                    {f.q}
                  </span>
                  <span
                    className={`mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${on ? "rotate-45 border-gold-refined bg-gold-refined text-ink" : "border-ink/15 text-ink"}`}
                  >
                    <Plus aria-hidden className="h-4 w-4" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-3xl pb-8 text-[16px] leading-[1.85] text-text-muted-dark">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </motion.ul>
      </AnimatePresence>
    </div>
  );
}
