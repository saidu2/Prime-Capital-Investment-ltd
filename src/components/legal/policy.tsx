import { ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";
import { TermsToc } from "@/components/legal/terms-toc";
import { Reveal } from "@/components/motion/reveal";

export type PolicyBlock =
  | { p: string; strong?: boolean }
  | { ul: string[]; tone?: "dont" }
  | { callout: string }
  | { sub: string; blocks: PolicyBlock[] };

export type PolicySection = {
  id: string;
  title: string;
  blocks: PolicyBlock[];
};

function Blocks({ blocks }: { blocks: PolicyBlock[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((b) => {
        if ("p" in b)
          return (
            <p
              key={b.p}
              className={`text-[16px] leading-[1.85] ${b.strong ? "font-semibold text-ink" : "text-text-muted-dark"}`}
            >
              {b.p}
            </p>
          );
        if ("ul" in b)
          return (
            <ul key={b.ul[0]} className="space-y-3">
              {b.ul.map((li) => (
                <li
                  key={li}
                  className="flex gap-4 text-[16px] leading-[1.8] text-text-muted-dark"
                >
                  <span
                    aria-hidden
                    className={`mt-[0.7em] block h-1.5 w-1.5 shrink-0 rotate-45 ${b.tone === "dont" ? "bg-ink" : "bg-gold-refined"}`}
                  />
                  {li}
                </li>
              ))}
            </ul>
          );
        if ("callout" in b)
          return (
            <div
              key={b.callout.slice(0, 30)}
              className="border-l-2 border-gold-refined bg-paper p-6 md:p-8"
            >
              <p className="font-display text-[1.15rem] leading-[1.7] text-ink">
                {b.callout}
              </p>
            </div>
          );
        return (
          <div key={b.sub} className="border-t border-ink/10 pt-6">
            <h3 className="mb-4 font-display text-[1.2rem] font-normal text-ink">
              {b.sub}
            </h3>
            <Blocks blocks={b.blocks} />
          </div>
        );
      })}
    </div>
  );
}

/** Long-form legal document: sticky contents + sections (Terms pattern). */
export function PolicyDocument({
  sections,
  meta,
  footer,
}: {
  sections: PolicySection[];
  meta?: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <section className="px-4 py-20 sm:px-6 md:py-28 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-12 lg:gap-20">
        <aside className="hidden lg:col-span-4 lg:block">
          <div className="sticky top-36">
            <TermsToc
              sections={sections.map(({ id, title }) => ({ id, title }))}
            />
          </div>
        </aside>
        <div className="min-w-0 lg:col-span-8">
          {meta}
          {sections.map((s) => (
            <Reveal
              as="section"
              key={s.id}
              y={18}
              className="border-b border-ink/10 py-12 first:pt-0 last:border-b-0"
            >
              <div id={s.id} className="scroll-mt-40">
                <h2 className="mb-6 font-display text-[1.7rem] font-normal leading-tight tracking-tight text-ink md:text-[2.1rem]">
                  {s.title}
                </h2>
                <Blocks blocks={s.blocks} />
              </div>
            </Reveal>
          ))}
          {footer ?? (
            <div className="mt-14 flex flex-col items-start gap-4 border-t border-ink/10 pt-10 sm:flex-row sm:items-center sm:justify-between">
              <span className="inline-flex items-center gap-2.5 bg-ink px-5 py-3 text-[12px] font-bold uppercase tracking-[0.16em] text-white">
                <ShieldCheck aria-hidden className="h-4 w-4 text-gold-soft" />
                SEC Regulated • NDPA Compliant
              </span>
              <p className="text-[13px] text-text-muted-dark">
                Prime Capital & Investment Ltd. All rights reserved.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
