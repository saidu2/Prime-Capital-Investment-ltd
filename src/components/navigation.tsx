"use client";

import {
  AnimatePresence,
  MotionConfig,
  motion,
  useScroll,
  useSpring,
} from "framer-motion";
import { ArrowUpRight, ChevronDown, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  type FocusEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { type MegaKind, MegaPanel } from "@/components/nav-mega";
import { SiteSearch } from "@/components/site-search";
import { useLenis } from "@/components/smooth-scroll";
import { TickerTape } from "@/components/ticker-tape";

type NavChild = { href: string; label: string };
type NavItem = {
  href: string;
  label: string;
  children?: NavChild[];
  /** Desktop: show a wide mega panel instead of the simple dropdown. */
  mega?: MegaKind;
};

const NAV: NavItem[] = [
  { href: "/", label: "Home" },
  {
    href: "/services",
    label: "Services",
    mega: "services",
    children: [
      { href: "/services", label: "Investment Products" },
      { href: "/investment-vehicles", label: "Investment Vehicles" },
    ],
  },
  {
    href: "/about",
    label: "About Us",
    mega: "about",
    children: [
      { href: "/about", label: "About Prime Capital" },
      { href: "/about#philosophy", label: "Corporate Philosophy" },
      { href: "/about/board", label: "Board of Directors" },
      { href: "/about/management", label: "Management Team" },
    ],
  },
  { href: "/news", label: "News" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact Us" },
];

const ACCOUNT_LINKS: NavChild[] = [
  { href: "https://forms.gle/Mxu9fhggN8AtA93e6", label: "Individual Account" },
  { href: "https://forms.gle/iAPfcrcJrz2qiXK19", label: "Corporate Account" },
];

const IMAGE_TOP_ROUTES = new Set([
  "/",
  "/about",
  "/about/board",
  "/about/management",
  "/services",
  "/investment-vehicles",
  "/news",
  "/careers",
  "/contact",
  "/terms",
  "/privacy",
  "/faq",
  "/portal",
]);

const EASE = [0.22, 1, 0.36, 1] as const;
const CURTAIN = [0.76, 0, 0.24, 1] as const;

// The header mounts on every page; play the entrance only once per visit.
let introPlayed = false;

function isActive(pathname: string, item: NavItem) {
  if (item.href === "/") return pathname === "/";
  const hrefs = [item.href, ...(item.children ?? []).map((c) => c.href)];
  return hrefs.some((h) => {
    const path = h.split("#")[0];
    return pathname === path || pathname.startsWith(`${path}/`);
  });
}

export function Navigation() {
  const pathname = usePathname();
  // Pages that open with a full-bleed photo banner: header floats over it.
  const overImage = IMAGE_TOP_ROUTES.has(pathname);
  const lenis = useLenis();

  const [solid, setSolid] = useState(!overImage);
  const [hidden, setHidden] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [playIntro] = useState(() => !introPlayed);

  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reading-progress hairline along the bottom of the header.
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    introPlayed = true;
  }, []);

  // Solid-vs-transparent + hide-on-scroll-down / reveal-on-scroll-up.
  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setSolid(!overImage || y > 24);
      if (y < 120) {
        setHidden(false);
        lastY = y;
        return;
      }
      const delta = y - lastY;
      if (Math.abs(delta) > 6) {
        setHidden(delta > 0);
        lastY = y;
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [overImage]);

  const isHidden = hidden && !mobileOpen && openMenu === null;

  // Expose header visibility so later sticky elements (hero tab strip) can follow it.
  useEffect(() => {
    document.documentElement.dataset.header = isHidden ? "hidden" : "shown";
  }, [isHidden]);

  // Close menus on navigation.
  // biome-ignore lint/correctness/useExhaustiveDependencies: run on route change only
  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  // Desktop dropdowns: close on outside click or Escape.
  useEffect(() => {
    if (!openMenu) return;
    const onPointer = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setOpenMenu(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(null);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [openMenu]);

  // Mobile menu: lock scroll, Escape to close, focus in and back out.
  useEffect(() => {
    if (!mobileOpen) return;
    const toggle = toggleRef.current;
    lenis?.stop();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const focusTimer = setTimeout(
      () => firstMobileLinkRef.current?.focus(),
      350,
    );

    // Close if the viewport grows into desktop layout.
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => mq.matches && setMobileOpen(false);
    mq.addEventListener("change", onMq);

    return () => {
      lenis?.start();
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
      clearTimeout(focusTimer);
      toggle?.focus();
    };
  }, [mobileOpen, lenis]);

  const openDropdown = useCallback((key: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(key);
  }, []);

  const scheduleClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  }, []);

  const closeIfFocusLeaves = (e: FocusEvent<HTMLElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
      setOpenMenu(null);
    }
  };

  const intro = (i: number) =>
    playIntro
      ? {
          initial: { opacity: 0, y: -10 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1.1, ease: EASE, delay: 0.2 + i * 0.07 },
        }
      : {};

  return (
    <MotionConfig reducedMotion="user">
      <header
        ref={headerRef}
        onFocusCapture={() => setHidden(false)}
        className="fixed inset-x-0 top-0 z-50 h-(--header-h) transition-transform duration-700 ease-soft"
        style={{ transform: isHidden ? "translateY(-100%)" : "none" }}
      >
        {/* Top legibility fade (over hero only) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-linear-to-b from-ink/70 to-transparent transition-opacity duration-500"
          style={{ opacity: solid || mobileOpen ? 0 : 1 }}
        />
        {/* Ink glass — fades in rather than toggling */}
        <div
          aria-hidden
          className="absolute inset-0 bg-ink/85 backdrop-blur-xl backdrop-saturate-150 border-b border-white/[0.06] shadow-[0_12px_32px_-16px_rgba(0,0,0,0.6)] transition-opacity duration-500 ease-soft"
          style={{ opacity: solid && !mobileOpen && !isHidden ? 1 : 0 }}
        />
        {/* Reading progress */}
        <motion.div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-linear-to-r from-gold-refined/40 via-gold-refined to-gold-soft transition-opacity duration-500"
          style={{ scaleX: progress, opacity: solid && !mobileOpen ? 1 : 0 }}
        />

        {/* Live NGX prices (TradingView), as on the current live site */}
        <TickerTape />

        <div className="relative mx-auto flex h-[calc(100%-var(--ticker-h))] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <motion.div {...intro(0)}>
            <Link
              href="/"
              className="group flex items-center gap-3"
              aria-label="Prime Capital & Investment Limited, Home"
            >
              <span className="relative block h-12 w-12 shrink-0">
                <span className="absolute inset-0 rounded-full bg-gold-refined/20 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100" />
                <Image
                  src="/logo-mark.png"
                  alt=""
                  width={48}
                  height={48}
                  priority
                  className="relative h-12 w-12 transition-transform duration-700 ease-soft group-hover:scale-[1.06]"
                />
              </span>
              <span className="leading-none">
                <span className="block whitespace-nowrap font-display text-[1.2rem] font-semibold tracking-tight text-white xl:text-[1.4rem]">
                  Prime Capital
                </span>
                <span className="mt-1.5 block whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.26em] text-gold-refined xl:text-[10px] xl:tracking-[0.3em]">
                  & Investment LTD
                </span>
              </span>
            </Link>
          </motion.div>

          {/* Desktop links */}
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-0 xl:gap-2">
              {NAV.map((item, i) => {
                const active = isActive(pathname, item);
                const hasChildren = !!item.children?.length;
                const open = openMenu === item.label;
                return (
                  <motion.li
                    key={item.href}
                    className={item.mega ? "static" : "relative"}
                    {...intro(i + 1)}
                    onMouseEnter={
                      hasChildren ? () => openDropdown(item.label) : undefined
                    }
                    onMouseLeave={hasChildren ? scheduleClose : undefined}
                    onFocus={
                      hasChildren ? () => openDropdown(item.label) : undefined
                    }
                    onBlur={hasChildren ? closeIfFocusLeaves : undefined}
                  >
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      aria-expanded={hasChildren ? open : undefined}
                      className={`group relative flex items-center gap-1.5 whitespace-nowrap px-2.5 py-2 text-[12px] font-bold uppercase tracking-[0.1em] transition-colors duration-300 xl:px-4 xl:text-[14.5px] xl:tracking-[0.16em] ${
                        active ? "text-white" : "text-white/80 hover:text-white"
                      }`}
                    >
                      {item.label}
                      {hasChildren && (
                        <ChevronDown
                          aria-hidden
                          className={`h-3.5 w-3.5 opacity-60 transition-transform duration-300 ${
                            open ? "rotate-180" : ""
                          }`}
                        />
                      )}
                      <span
                        aria-hidden
                        className={`absolute inset-x-3 -bottom-1 h-[2px] origin-left xl:inset-x-4 bg-gold-refined transition-transform duration-500 ease-soft ${
                          active || open
                            ? "scale-x-100"
                            : "scale-x-0 group-hover:scale-x-100"
                        }`}
                      />
                    </Link>

                    <AnimatePresence>
                      {item.mega && open && (
                        <MegaPanel
                          kind={item.mega}
                          onNavigate={() => setOpenMenu(null)}
                        />
                      )}
                      {!item.mega && hasChildren && open && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.5, ease: EASE }}
                          className="absolute left-1/2 top-full -translate-x-1/2 pt-4"
                        >
                          <ul className="relative min-w-60 overflow-hidden rounded-[4px] bg-white p-2 shadow-[0_24px_60px_-18px_rgba(10,16,36,0.45)]">
                            <span
                              aria-hidden
                              className="absolute inset-x-0 top-0 h-[2px] bg-gold-refined"
                            />
                            {item.children?.map((child, ci) => (
                              <motion.li
                                key={child.href}
                                initial={{ opacity: 0, x: -6 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                  duration: 0.35,
                                  ease: EASE,
                                  delay: 0.04 + ci * 0.04,
                                }}
                              >
                                <Link
                                  href={child.href}
                                  onClick={() => setOpenMenu(null)}
                                  className="group/item flex items-center justify-between gap-6 rounded-[3px] px-4 py-3 text-[15px] font-medium text-text-muted-dark transition-colors duration-300 hover:bg-ink hover:text-white focus-visible:bg-ink focus-visible:text-white"
                                >
                                  {child.label}
                                  <ArrowUpRight
                                    aria-hidden
                                    className="h-4 w-4 -translate-x-1 text-gold-refined opacity-0 transition-all duration-300 group-hover/item:translate-x-0 group-hover/item:opacity-100"
                                  />
                                </Link>
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.li>
                );
              })}
            </ul>
          </nav>

          {/* Desktop search + CTA */}
          <motion.div className="hidden lg:block" {...intro(NAV.length + 1)}>
            <SiteSearch />
          </motion.div>
          <motion.div
            className="relative -ml-4 hidden lg:block xl:-ml-2"
            {...intro(NAV.length + 1)}
            onMouseEnter={() => openDropdown("account")}
            onMouseLeave={scheduleClose}
            onBlur={closeIfFocusLeaves}
          >
            <button
              type="button"
              aria-haspopup="true"
              aria-expanded={openMenu === "account"}
              onClick={() => openDropdown("account")}
              className="btn-sheen inline-flex items-center gap-2 rounded-[2px] bg-gold-refined whitespace-nowrap px-4 py-3 text-[12px] font-bold uppercase tracking-[0.12em] text-ink xl:px-6 xl:py-3.5 xl:text-[13px] xl:tracking-[0.16em] shadow-[0_8px_24px_-10px_rgba(201,162,75,0.6)] transition-colors duration-300 hover:bg-gold-soft cursor-pointer"
            >
              Open Account
              <ChevronDown
                aria-hidden
                className={`h-3.5 w-3.5 transition-transform duration-300 ${
                  openMenu === "account" ? "rotate-180" : ""
                }`}
              />
            </button>
            <AnimatePresence>
              {openMenu === "account" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="absolute right-0 top-full pt-4"
                >
                  <ul className="relative min-w-56 overflow-hidden rounded-[4px] bg-white p-2 shadow-[0_24px_60px_-18px_rgba(10,16,36,0.45)]">
                    <span
                      aria-hidden
                      className="absolute inset-x-0 top-0 h-[2px] bg-gold-refined"
                    />
                    {ACCOUNT_LINKS.map((a) => (
                      <li key={a.href}>
                        <a
                          href={a.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setOpenMenu(null)}
                          className="group/item flex items-center justify-between gap-6 rounded-[3px] px-4 py-3 text-[15px] font-medium text-text-muted-dark transition-colors duration-300 hover:bg-ink hover:text-white focus-visible:bg-ink focus-visible:text-white"
                        >
                          {a.label}
                          <ArrowUpRight
                            aria-hidden
                            className="h-4 w-4 text-gold-refined transition-transform duration-300 group-hover/item:-translate-y-0.5 group-hover/item:translate-x-0.5"
                          />
                        </a>
                      </li>
                    ))}
                    <li className="mt-1 border-t border-ink/10 pt-1">
                      <Link
                        href="/portal"
                        onClick={() => setOpenMenu(null)}
                        className="group/item flex items-center justify-between gap-6 rounded-[3px] px-4 py-3 text-[15px] font-medium text-text-muted-dark transition-colors duration-300 hover:bg-ink hover:text-white focus-visible:bg-ink focus-visible:text-white"
                      >
                        <span>
                          Investment Portal
                          <span className="ml-2 rounded-full bg-gold-refined/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-gold-refined group-hover/item:bg-gold-refined group-hover/item:text-ink">
                            Soon
                          </span>
                        </span>
                        <ArrowUpRight
                          aria-hidden
                          className="h-4 w-4 text-gold-refined transition-transform duration-300 group-hover/item:-translate-y-0.5 group-hover/item:translate-x-0.5"
                        />
                      </Link>
                    </li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Mobile search + toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <SiteSearch />
            <motion.button
              ref={toggleRef}
              type="button"
              {...intro(1)}
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-colors duration-300 hover:border-gold-refined/60 lg:hidden"
            >
              <span className="sr-only">Menu</span>
              <span
                aria-hidden
                className={`absolute h-px w-5 bg-current transition-transform duration-500 ease-soft ${
                  mobileOpen ? "rotate-45" : "-translate-y-[4px]"
                }`}
              />
              <span
                aria-hidden
                className={`absolute h-px w-5 bg-current transition-transform duration-500 ease-soft ${
                  mobileOpen ? "-rotate-45" : "translate-y-[4px]"
                }`}
              />
            </motion.button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen menu (sibling of header so it is viewport-fixed) */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            data-lenis-prevent
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.9, ease: CURTAIN }}
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-ink pt-(--header-h) lg:hidden"
          >
            {/* faint gold light streak */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-1/4 top-0 h-full w-3/4 rotate-12 bg-linear-to-b from-gold-refined/[0.07] via-transparent to-transparent blur-2xl"
            />

            <nav
              aria-label="Mobile"
              className="relative flex-1 px-6 pb-10 pt-8 sm:px-10"
            >
              <ul className="space-y-1">
                {NAV.map((item, i) => {
                  const active = isActive(pathname, item);
                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, y: 28 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 12 }}
                      transition={{
                        duration: 0.6,
                        ease: EASE,
                        delay: 0.25 + i * 0.06,
                      }}
                      className="border-b border-white/[0.07]"
                    >
                      <Link
                        ref={i === 0 ? firstMobileLinkRef : undefined}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className="group flex items-baseline gap-4 py-4"
                      >
                        <span
                          className={`font-display text-3xl tracking-tight transition-colors duration-300 sm:text-4xl ${
                            active
                              ? "text-gold-soft"
                              : "text-white group-hover:text-gold-soft"
                          }`}
                        >
                          {item.label}
                        </span>
                      </Link>
                      {item.children && (
                        <div className="-mt-2 flex flex-wrap gap-x-5 gap-y-1 pb-4 pl-10">
                          {item.children
                            .filter((c) => c.href !== item.href)
                            .map((c) => (
                              <Link
                                key={c.href}
                                href={c.href}
                                onClick={() => setMobileOpen(false)}
                                className="text-sm text-white/55 transition-colors hover:text-white"
                              >
                                {c.label}
                              </Link>
                            ))}
                        </div>
                      )}
                    </motion.li>
                  );
                })}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.6,
                  ease: EASE,
                  delay: 0.3 + NAV.length * 0.06,
                }}
                className="mt-10 space-y-8"
              >
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {ACCOUNT_LINKS.map((a, ai) => (
                    <a
                      key={a.href}
                      href={a.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`btn-sheen flex items-center justify-between rounded-[2px] px-6 py-4 text-[12.5px] font-semibold uppercase tracking-[0.12em] transition-colors duration-300 ${
                        ai === 0
                          ? "bg-gold-refined text-ink hover:bg-gold-soft"
                          : "border border-white/20 text-white hover:border-gold-refined"
                      }`}
                    >
                      Open {a.label}
                      <ArrowUpRight aria-hidden className="h-4 w-4" />
                    </a>
                  ))}
                  <Link
                    href="/portal"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between rounded-[2px] border border-white/20 px-6 py-4 text-[12.5px] font-semibold uppercase tracking-[0.12em] text-white transition-colors duration-300 hover:border-gold-refined"
                  >
                    Investment Portal · Soon
                    <ArrowUpRight aria-hidden className="h-4 w-4" />
                  </Link>
                </div>

                <div className="space-y-3 border-t border-white/[0.07] pt-8 text-sm text-white/55">
                  <p className="flex items-start gap-3">
                    <MapPin
                      aria-hidden
                      className="mt-0.5 h-4 w-4 shrink-0 text-gold-refined"
                    />
                    No. 3, Sankuru Close, Off Rima Street, Maitama, Abuja
                  </p>
                  <a
                    href="tel:+2348111837348"
                    className="flex items-center gap-3 transition-colors hover:text-white"
                  >
                    <Phone
                      aria-hidden
                      className="h-4 w-4 shrink-0 text-gold-refined"
                    />
                    +234 (0) 811 183 7348
                  </a>
                  <a
                    href="mailto:info@primecapital.ng"
                    className="flex items-center gap-3 transition-colors hover:text-white"
                  >
                    <Mail
                      aria-hidden
                      className="h-4 w-4 shrink-0 text-gold-refined"
                    />
                    info@primecapital.ng
                  </a>
                </div>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
