"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Clock,
  Mail,
  MessageCircle,
  Phone,
  X,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/* Contact details from the Corporate Profile deck / existing site. */
const WHATSAPP = "https://wa.me/2348111837348?text=";
const CHANNELS = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    detail: "Chat with our team · document requests",
    href: `${WHATSAPP}${encodeURIComponent("Hello Prime Capital, I would like to make an enquiry.")}`,
    external: true,
    primary: true,
  },
  {
    icon: Phone,
    label: "Call us",
    detail: "+234 (0) 811 183 7348",
    href: "tel:+2348111837348",
  },
  {
    icon: Mail,
    label: "Email",
    detail: "info@primecapital.ng",
    href: "mailto:info@primecapital.ng",
  },
];

/** Hours: Mon–Fri, 9:00–17:00 WAT (UTC+1). */
function isOpenNow() {
  const now = new Date();
  const wat = new Date(now.getTime() + (now.getTimezoneOffset() + 60) * 60000);
  const d = wat.getDay();
  const h = wat.getHours() + wat.getMinutes() / 60;
  return d >= 1 && d <= 5 && h >= 9 && h < 17;
}

/**
 * "Speak with us" concierge: a quiet floating button that opens a panel of
 * direct channels. Feels like live chat without needing an agent online.
 */
export function Concierge() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openNow, setOpenNow] = useState<boolean | null>(null);
  const [ready, setReady] = useState(false);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpenNow(isOpenNow());
    const t = setTimeout(() => setReady(true), 2200); // arrive after the intro
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: PointerEvent) => {
      if (!panel.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  if (/^\/(admin|auth)/.test(pathname ?? "")) return null;

  return (
    <div
      ref={panel}
      className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3 md:bottom-7 md:right-7"
    >
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Speak with Prime Capital"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="w-[min(calc(100vw-2.5rem),360px)] origin-bottom-right overflow-hidden rounded-[6px] bg-white shadow-[0_40px_90px_-30px_rgba(10,16,36,0.6)]"
          >
            <div className="relative isolate overflow-hidden bg-ink px-6 pb-6 pt-6 text-white">
              <span
                aria-hidden
                className="absolute inset-0 -z-10 bg-[radial-gradient(80%_100%_at_100%_0%,rgba(201,162,75,0.25),transparent_70%)]"
              />
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  {/* biome-ignore lint/performance/noImgElement: tiny static mark */}
                  <img
                    src="/logo-mark.png"
                    alt=""
                    className="h-11 w-11 rounded-full bg-white/5 p-1"
                  />
                  <div>
                    <p className="font-display text-[1.2rem] leading-tight">
                      Speak with us
                    </p>
                    <p className="mt-1 flex items-center gap-2 text-[12.5px] text-white/70">
                      <span
                        aria-hidden
                        className={`h-2 w-2 rounded-full ${openNow ? "bg-emerald-400 shadow-[0_0_0_3px_rgba(52,211,153,0.25)]" : "bg-gold-soft"}`}
                      />
                      {openNow === null
                        ? "Prime Capital & Investment Ltd"
                        : openNow
                          ? "Our team is available now"
                          : "We'll reply on the next business day"}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="-mr-2 -mt-1 flex h-9 w-9 items-center justify-center text-white/60 transition-colors hover:text-white"
                >
                  <X aria-hidden className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-5 text-[14.5px] leading-relaxed text-white/80">
                How can we help you today? Reach our team directly on any of the
                channels below.
              </p>
            </div>

            <ul className="p-3">
              {CHANNELS.map((c, i) => (
                <motion.li
                  key={c.label}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.4,
                    ease: EASE,
                    delay: 0.1 + i * 0.06,
                  }}
                >
                  <a
                    href={c.href}
                    target={c.external ? "_blank" : undefined}
                    rel={c.external ? "noopener noreferrer" : undefined}
                    className={`group flex items-center gap-4 rounded-[4px] px-4 py-3.5 transition-colors duration-300 ${
                      c.primary
                        ? "bg-paper hover:bg-ink hover:text-white"
                        : "hover:bg-paper"
                    }`}
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold-refined/40 text-gold-refined transition-colors group-hover:border-gold-refined group-hover:bg-gold-refined group-hover:text-ink">
                      <c.icon
                        aria-hidden
                        strokeWidth={1.5}
                        className="h-[18px] w-[18px]"
                      />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[14.5px] font-semibold">
                        {c.label}
                      </span>
                      <span
                        className={`block truncate text-[13px] ${c.primary ? "text-text-muted-dark group-hover:text-white/70" : "text-text-muted-dark"}`}
                      >
                        {c.detail}
                      </span>
                    </span>
                    <ArrowUpRight
                      aria-hidden
                      className="h-4 w-4 shrink-0 text-gold-refined opacity-60 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                    />
                  </a>
                </motion.li>
              ))}
            </ul>
            <p className="flex items-center gap-2 border-t border-ink/[0.06] px-6 py-3.5 text-[12px] text-text-muted-dark">
              <Clock aria-hidden className="h-3.5 w-3.5 text-gold-refined" />
              Monday to Friday, 9:00 am to 5:00 pm WAT
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {ready && (
          <motion.button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? "Close contact options" : "Speak with us"}
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="group relative flex h-14 items-center gap-3 rounded-full bg-ink pl-4 pr-5 text-white shadow-[0_18px_40px_-12px_rgba(10,16,36,0.65)] ring-1 ring-gold-refined/40 transition-colors duration-500 hover:bg-ink-2"
          >
            {!open && (
              <span
                aria-hidden
                className="concierge-pulse absolute inset-0 rounded-full ring-2 ring-gold-refined/50"
              />
            )}
            <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gold-refined text-ink">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? "x" : "chat"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {open ? (
                    <X aria-hidden className="h-4 w-4" />
                  ) : (
                    <MessageCircle aria-hidden className="h-4 w-4" />
                  )}
                </motion.span>
              </AnimatePresence>
            </span>
            <span className="hidden text-[13px] font-bold uppercase tracking-[0.14em] sm:inline">
              {open ? "Close" : "Speak with us"}
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
