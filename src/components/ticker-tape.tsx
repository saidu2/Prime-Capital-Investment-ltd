"use client";

import { useEffect, useRef } from "react";

const TICKER_SYMBOLS = [
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
].map((proName) => ({ description: "", proName: `NSENG:${proName}` }));

/**
 * TradingView Ticker Tape widget (legacy embed), NGX stocks.
 *
 * The legacy embed works by TradingView's loader script reading the
 * JSON config out of the very <script> tag that loaded it, so the
 * script element has to be created and injected manually (Next.js's
 * <Script> component strips inline text content from tags that also
 * have a src, which breaks this).
 *
 * TradingView always renders a small "Ticker tape by TradingView"
 * caption line beneath the strip itself (it's baked into the widget's
 * own iframe, not something the JSON config can turn off). We clip it
 * out by constraining the outer wrapper to the ticker row's own
 * height with overflow-hidden.
 */
export function TickerTape() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: TICKER_SYMBOLS,
      showSymbolLogo: true,
      isTransparent: false,
      displayMode: "regular",
      colorTheme: "dark",
      locale: "en",
    });

    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, []);

  return (
    <div className="h-[46px] w-full overflow-hidden">
      <div className="tradingview-widget-container" ref={containerRef}>
        <div className="tradingview-widget-container__widget" />
      </div>
    </div>
  );
}
