"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CornerDownLeft, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLenis } from "@/components/smooth-scroll";
import { FAQ_GROUPS } from "@/data/faqs";
import { BOARD, MANAGEMENT } from "@/data/leadership";

const EASE = [0.22, 1, 0.36, 1] as const;

type Entry = {
  title: string;
  section: string;
  href: string;
  keywords?: string;
};

const PAGES: Entry[] = [
  { title: "Home", section: "Pages", href: "/" },
  {
    title: "About Prime Capital",
    section: "Pages",
    href: "/about",
    keywords: "who we are overview mission vision",
  },
  {
    title: "Corporate Philosophy",
    section: "Pages",
    href: "/about#philosophy",
    keywords: "values tenets confidentiality integrity excellence stewardship",
  },
  {
    title: "Board of Directors",
    section: "Pages",
    href: "/about/board",
    keywords: "governance committees chairman",
  },
  {
    title: "Management Team",
    section: "Pages",
    href: "/about/management",
    keywords: "leadership heads",
  },
  {
    title: "Investment Products",
    section: "Services",
    href: "/services",
    keywords: "offerings services",
  },
  {
    title: "Money Market Instruments",
    section: "Services",
    href: "/services#offerings",
    keywords:
      "treasury bills commercial papers certificates of deposit bankers acceptances",
  },
  {
    title: "Fixed Income Securities",
    section: "Services",
    href: "/services#offerings",
    keywords: "fgn bonds state bonds corporate bonds",
  },
  {
    title: "Ethical & Shari'ah Compliant Products",
    section: "Services",
    href: "/services#offerings",
    keywords: "islamic sukuk murabaha ijara mudarabah halal non-interest",
  },
  {
    title: "Alternative Investments",
    section: "Services",
    href: "/services#offerings",
    keywords: "real estate private equity venture infrastructure",
  },
  {
    title: "Financial Advisory",
    section: "Services",
    href: "/services#offerings",
    keywords: "wealth planning retirement estate corporate advisory",
  },
  {
    title: "Investment Vehicles",
    section: "Services",
    href: "/investment-vehicles",
    keywords: "equities commodities",
  },
  {
    title: "Investment Portal",
    section: "Pages",
    href: "/portal",
    keywords: "login client access sign in dashboard statements",
  },
  {
    title: "News & Insights",
    section: "Pages",
    href: "/news",
    keywords: "articles updates",
  },
  {
    title: "Careers",
    section: "Pages",
    href: "/careers",
    keywords: "jobs vacancies open positions apply",
  },
  {
    title: "Contact Us",
    section: "Pages",
    href: "/contact",
    keywords: "address phone email whatsapp office hours map",
  },
  {
    title: "Frequently Asked Questions",
    section: "Pages",
    href: "/faq",
    keywords: "faq help questions",
  },
  {
    title: "Privacy Notice",
    section: "Legal",
    href: "/privacy",
    keywords: "data protection ndpa",
  },
  {
    title: "Website Use Policy",
    section: "Legal",
    href: "/terms",
    keywords: "terms conditions",
  },
  {
    title: "Corporate Profile (PDF)",
    section: "Downloads",
    href: "/Prime-Capital-Corporate-Profile.pdf",
    keywords: "brochure download company profile",
  },
];

const INDEX: Entry[] = [
  ...PAGES,
  ...BOARD.map((p) => ({
    title: p.name,
    section: "Board of Directors",
    href: "/about/board",
    keywords: p.role,
  })),
  ...MANAGEMENT.map((p) => ({
    title: p.name,
    section: "Management Team",
    href: "/about/management",
    keywords: p.role,
  })),
  ...FAQ_GROUPS.flatMap((g) =>
    g.items.map((f) => ({
      title: f.q,
      section: "FAQs",
      href: "/faq",
      keywords: f.a,
    })),
  ),
];

const SUGGESTED = [
  "Open an account",
  "Shari'ah",
  "Board of Directors",
  "Careers",
];

const norm = (t: string) => t.toLowerCase().replace(/['’]/g, "");

function search(q: string) {
  const terms = norm(q).split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  return INDEX.map((e) => {
    const title = norm(e.title);
    const hay = `${title} ${norm(e.section)} ${norm(e.keywords ?? "")}`;
    if (!terms.every((t) => hay.includes(t))) return null;
    const score =
      terms.reduce((s, t) => s + (title.includes(t) ? 3 : 1), 0) +
      (title.startsWith(terms[0]) ? 3 : 0) +
      (e.section === "FAQs" ? -1 : 0);
    return { e, score };
  })
    .filter((x): x is { e: Entry; score: number } => !!x)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map((x) => x.e);
}

export function SiteSearch({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const lenis = useLenis();
  const results = useMemo(() => search(q), [q]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => input.current?.focus(), 60);
    return () => {
      lenis?.start();
      document.body.style.overflow = prev;
      clearTimeout(t);
    };
  }, [open, lenis]);

  const go = (e: Entry) => {
    setOpen(false);
    setQ("");
    if (e.href.endsWith(".pdf")) window.open(e.href, "_blank", "noopener");
    else router.push(e.href);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
    if (!results.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSel((s) => (s + 1) % results.length);
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSel((s) => (s - 1 + results.length) % results.length);
    }
    if (e.key === "Enter") {
      e.preventDefault();
      go(results[sel]);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search the site"
        title="Search (Ctrl+K)"
        className={`flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/85 transition-colors duration-300 hover:border-gold-refined/60 hover:text-white ${className}`}
      >
        <Search aria-hidden className="h-[18px] w-[18px]" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[12vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              type="button"
              aria-label="Close search"
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-ink/80 backdrop-blur-md"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Search Prime Capital"
              initial={{ opacity: 0, y: -18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="relative w-full max-w-2xl overflow-hidden rounded-[6px] bg-white shadow-[0_50px_120px_-30px_rgba(0,0,0,0.7)]"
              data-lenis-prevent
            >
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-[2px] bg-gold-refined"
              />
              <div className="flex items-center gap-4 border-b border-ink/10 px-6">
                <Search
                  aria-hidden
                  className="h-5 w-5 shrink-0 text-gold-refined"
                />
                <input
                  ref={input}
                  value={q}
                  onChange={(e) => {
                    setQ(e.target.value);
                    setSel(0);
                  }}
                  onKeyDown={onKeyDown}
                  placeholder="Search services, people, questions…"
                  aria-label="Search"
                  className="search-input h-16 w-full bg-transparent font-display text-[1.25rem] text-ink placeholder:text-ink/35 outline-none focus:outline-none focus-visible:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="flex h-9 w-9 shrink-0 items-center justify-center text-ink/50 hover:text-ink"
                >
                  <X aria-hidden className="h-5 w-5" />
                </button>
              </div>

              <div className="max-h-[55vh] overflow-y-auto p-3">
                {q.trim() === "" ? (
                  <div className="px-3 py-4">
                    <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold-refined">
                      Popular
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {SUGGESTED.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() =>
                            setQ(s === "Open an account" ? "account" : s)
                          }
                          className="border border-ink/12 px-4 py-2 text-[14px] text-ink/80 transition-colors hover:border-ink hover:text-ink"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : results.length === 0 ? (
                  <p className="px-3 py-10 text-center text-[15px] text-text-muted-dark">
                    No results for “{q}”. Try another word, or{" "}
                    <button
                      type="button"
                      onClick={() =>
                        go({ title: "", section: "", href: "/contact" })
                      }
                      className="font-semibold text-ink underline decoration-gold-refined underline-offset-4"
                    >
                      contact our team
                    </button>
                    .
                  </p>
                ) : (
                  <ul>
                    {results.map((r, i) => (
                      <li key={`${r.section}-${r.title}`}>
                        <button
                          type="button"
                          onMouseEnter={() => setSel(i)}
                          onClick={() => go(r)}
                          className={`flex w-full items-center justify-between gap-4 rounded-[4px] px-4 py-3.5 text-left transition-colors ${i === sel ? "bg-ink text-white" : "text-ink"}`}
                        >
                          <span className="min-w-0">
                            <span className="block truncate text-[15.5px] font-medium">
                              {r.title}
                            </span>
                            <span
                              className={`block text-[12px] font-bold uppercase tracking-[0.16em] ${i === sel ? "text-gold-soft" : "text-text-muted-dark"}`}
                            >
                              {r.section}
                            </span>
                          </span>
                          {i === sel ? (
                            <CornerDownLeft
                              aria-hidden
                              className="h-4 w-4 shrink-0 text-gold-soft"
                            />
                          ) : (
                            <ArrowRight
                              aria-hidden
                              className="h-4 w-4 shrink-0 text-gold-refined/60"
                            />
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="hidden items-center gap-5 border-t border-ink/[0.06] px-6 py-3 text-[12px] text-text-muted-dark sm:flex">
                <span>↑ ↓ to navigate</span>
                <span>Enter to open</span>
                <span>Esc to close</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
