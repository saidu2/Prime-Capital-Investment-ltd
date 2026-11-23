"use client";

import { MotionConfig } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext<Lenis | null>(null);

/** The active Lenis instance, or null (SSR, or OS reduced-motion is on). */
export function useLenis() {
  return useContext(LenisContext);
}

/** Read the header height token so anchor jumps land below the fixed header. */
function headerOffset() {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--header-h")
    .trim();
  const px = Number.parseFloat(raw);
  return Number.isFinite(px) ? px + 16 : 96;
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    // Reduced motion: leave native scrolling alone, no smoothing at all.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const instance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      // In-page #anchor links glide and stop below the fixed header.
      anchors: { offset: -headerOffset() },
    });

    instance.on("scroll", ScrollTrigger.update);

    // Keep a stable reference so cleanup removes the same function it added.
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    setLenis(instance);

    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
      {/* Every Framer animation on the site respects OS reduced-motion. */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LenisContext.Provider>
  );
}
