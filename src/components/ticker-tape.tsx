"use client";

import { memo, useEffect, useRef } from "react";

/* Same NGX symbols as the ticker on the current live site (2026-11-22). */
const SYMBOLS = [
  "ACCESSCORP",
  "DANGSUGAR",
  "BUACEMENT",
  "STANBIC",
  "MTNN",
  "PRESCO",
  "ARADEL",
  "BUAFOODS",
  "UBA",
  "FIRSTHOLDCO",
  "ZENITHBANK",
  "GTCO",
  "AIRTELAFRI",
  "TRANSCORP",
  "NB",
  "SEPLAT",
  "OKOMUOIL",
].map((s) => ({ proName: `NSENG:${s}`, description: "" }));

/**
 * TradingView ticker tape (live NGX prices). The embed script is injected
 * once, after the page is idle, so it never delays first paint.
 */
function TickerTapeImpl() {
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current;
    if (!el || el.querySelector("script")) return;

    const inject = () => {
      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
      script.async = true;
      script.type = "text/javascript";
      script.innerHTML = JSON.stringify({
        symbols: SYMBOLS,
        showSymbolLogo: true,
        isTransparent: true,
        displayMode: "compact",
        colorTheme: "dark",
        locale: "en",
      });
      el.appendChild(script);
    };

    const w = window as Window & {
      requestIdleCallback?: (cb: () => void) => number;
    };
    if (w.requestIdleCallback) w.requestIdleCallback(inject);
    else setTimeout(inject, 600);
  }, []);

  return (
    <div
      aria-label="Live Nigerian Exchange share prices"
      role="region"
      className="relative h-(--ticker-h) overflow-hidden border-b border-white/[0.07] bg-ink"
    >
      <div
        ref={box}
        className="tradingview-widget-container absolute inset-x-0 top-0"
      >
        <div className="tradingview-widget-container__widget" />
      </div>
    </div>
  );
}

export const TickerTape = memo(TickerTapeImpl);
