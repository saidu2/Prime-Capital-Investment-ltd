"use client";

import { ArrowUp } from "lucide-react";
import { useLenis } from "@/components/smooth-scroll";

export function BackToTop() {
  const lenis = useLenis();
  return (
    <button
      type="button"
      onClick={() =>
        lenis
          ? lenis.scrollTo(0, { duration: 1.8 })
          : window.scrollTo({ top: 0, behavior: "smooth" })
      }
      aria-label="Back to top"
      className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white transition-colors duration-500 hover:border-gold-refined hover:bg-gold-refined hover:text-ink"
    >
      <ArrowUp
        aria-hidden
        className="h-4 w-4 transition-transform duration-500 ease-soft group-hover:-translate-y-0.5"
      />
    </button>
  );
}
