"use client";

import { useEffect, useState } from "react";
import { useLenis } from "@/components/smooth-scroll";

/** Sticky contents list that follows the section being read. */
export function TermsToc({
  sections,
}: {
  sections: { id: string; title: string }[];
}) {
  const [active, setActive] = useState(sections[0]?.id);
  const lenis = useLenis();

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    for (const el of els) io.observe(el);
    return () => io.disconnect();
  }, [sections]);

  return (
    <nav aria-label="Policy contents">
      <p className="text-[12px] font-bold uppercase tracking-[0.26em] text-gold-refined">
        Contents
      </p>
      <ol className="mt-6 border-l border-ink/10">
        {sections.map((s) => {
          const on = s.id === active;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={(e) => {
                  if (!lenis) return;
                  e.preventDefault();
                  lenis.scrollTo(`#${s.id}`, { offset: -110, duration: 1.4 });
                }}
                aria-current={on ? "true" : undefined}
                className={`relative -ml-px flex gap-3 border-l py-2 pl-5 text-[14px] leading-snug transition-colors duration-500 ${
                  on
                    ? "border-gold-refined text-ink"
                    : "border-transparent text-text-muted-dark hover:text-ink"
                }`}
              >
                {s.title}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
