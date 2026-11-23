"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, MapPin } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

export type PositionRow = {
  key: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  summary?: string;
  /** Internal role page (admin-posted) or a mailto for suggested roles. */
  href: string;
};

/** Norrenberger-style board: department tabs on the left, role rows right. */
export function OpenPositions({ rows }: { rows: PositionRow[] }) {
  const departments = useMemo(
    () => ["All Departments", ...new Set(rows.map((r) => r.department))],
    [rows],
  );
  const [dept, setDept] = useState(departments[0]);
  const [open, setOpen] = useState<string | null>(null);
  const shown =
    dept === "All Departments"
      ? rows
      : rows.filter((r) => r.department === dept);

  return (
    <section
      id="openings"
      className="scroll-mt-32 bg-paper px-4 py-24 sm:px-6 md:py-32 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid items-end gap-6 md:grid-cols-12">
          <h2 className="font-display text-[2.3rem] font-normal leading-[1.08] tracking-tight text-ink md:col-span-7 md:text-[3.25rem]">
            Open <em className="font-normal text-gold-refined">Positions</em>
          </h2>
          <p className="text-[17px] leading-[1.85] text-text-muted-dark md:col-span-5">
            Explore current opportunities across our teams. All roles are based
            at our Maitama, Abuja head office.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-12 md:mt-16">
          {/* Department tabs */}
          <div
            role="tablist"
            aria-label="Departments"
            className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] lg:col-span-3 lg:mx-0 lg:flex-col lg:gap-3 lg:overflow-visible lg:px-0"
          >
            {departments.map((d) => {
              const on = d === dept;
              const count =
                d === "All Departments"
                  ? rows.length
                  : rows.filter((r) => r.department === d).length;
              return (
                <button
                  key={d}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => {
                    setDept(d);
                    setOpen(null);
                  }}
                  className={`flex shrink-0 items-center justify-between gap-4 px-6 py-5 text-left text-[15px] transition-all duration-500 ease-soft lg:py-6 ${
                    on
                      ? "bg-ink text-white shadow-[0_20px_40px_-20px_rgba(10,16,36,0.6)]"
                      : "bg-white text-ink/70 hover:text-ink"
                  }`}
                >
                  <span className="whitespace-nowrap font-medium">{d}</span>
                  <span
                    className={`font-display text-sm tabular-nums ${on ? "text-gold-soft" : "text-gold-refined"}`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Rows */}
          <ul className="space-y-4 lg:col-span-9">
            <AnimatePresence mode="popLayout" initial={false}>
              {shown.map((r) => {
                const expanded = open === r.key;
                const external = r.href.startsWith("mailto:");
                return (
                  <motion.li
                    key={r.key}
                    layout
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className={`border bg-white transition-colors duration-500 ${expanded ? "border-gold-refined" : "border-ink/10 hover:border-gold-refined/60"}`}
                  >
                    <div className="grid items-center gap-x-6 gap-y-3 px-6 py-6 md:grid-cols-[minmax(0,2.2fr)_1fr_1.2fr_auto] md:px-8">
                      <button
                        type="button"
                        onClick={() => setOpen(expanded ? null : r.key)}
                        aria-expanded={expanded}
                        className="group flex items-start justify-between gap-4 text-left"
                      >
                        <span>
                          <span className="block font-display text-[1.3rem] leading-snug text-ink transition-colors group-hover:text-gold-refined">
                            {r.title}
                          </span>
                          <span className="mt-1 block text-[12px] font-bold uppercase tracking-[0.18em] text-text-muted-dark">
                            {r.department}
                          </span>
                        </span>
                        {r.summary && (
                          <ChevronDown
                            aria-hidden
                            className={`mt-1.5 h-4 w-4 shrink-0 text-gold-refined transition-transform duration-500 md:hidden ${expanded ? "rotate-180" : ""}`}
                          />
                        )}
                      </button>
                      <span className="flex items-center gap-2 text-[15px] text-ink/80">
                        <MapPin
                          aria-hidden
                          className="h-4 w-4 text-gold-refined"
                        />
                        {r.location}
                      </span>
                      <span className="text-[15px] text-ink/80">
                        {r.experience}
                        <span className="block text-[13px] text-text-muted-dark">
                          {r.type}
                        </span>
                      </span>
                      <span className="flex items-center gap-3">
                        {r.summary && (
                          <button
                            type="button"
                            onClick={() => setOpen(expanded ? null : r.key)}
                            aria-label={`${expanded ? "Hide" : "Show"} details for ${r.title}`}
                            className="hidden h-11 w-11 items-center justify-center border border-ink/15 text-ink transition-colors hover:border-ink md:flex"
                          >
                            <ChevronDown
                              aria-hidden
                              className={`h-4 w-4 transition-transform duration-500 ${expanded ? "rotate-180" : ""}`}
                            />
                          </button>
                        )}
                        {external ? (
                          <a
                            href={r.href}
                            className="btn-sheen inline-flex items-center gap-2 bg-ink px-6 py-3 text-[12.5px] font-bold uppercase tracking-[0.16em] text-white transition-colors duration-500 hover:bg-gold-refined hover:text-ink"
                          >
                            Apply
                            <ArrowUpRight aria-hidden className="h-4 w-4" />
                          </a>
                        ) : (
                          <Link
                            href={r.href}
                            className="btn-sheen inline-flex items-center gap-2 bg-ink px-6 py-3 text-[12.5px] font-bold uppercase tracking-[0.16em] text-white transition-colors duration-500 hover:bg-gold-refined hover:text-ink"
                          >
                            Apply
                            <ArrowUpRight aria-hidden className="h-4 w-4" />
                          </Link>
                        )}
                      </span>
                    </div>
                    <AnimatePresence initial={false}>
                      {expanded && r.summary && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.5, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <p className="border-t border-ink/10 px-6 py-6 text-[15.5px] leading-[1.8] text-text-muted-dark md:px-8">
                            {r.summary}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.li>
                );
              })}
            </AnimatePresence>
            {shown.length === 0 && (
              <li className="border border-ink/10 bg-white px-8 py-16 text-center text-text-muted-dark">
                No open positions in this department right now.
              </li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
