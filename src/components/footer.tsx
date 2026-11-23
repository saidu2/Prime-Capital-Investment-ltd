import {
  ArrowUpRight,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { BackToTop } from "@/components/back-to-top";

/* Existing PCI links, contact details and regulatory wording. */
const USEFUL_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Board of Directors", href: "/about/board" },
  { label: "Management Team", href: "/about/management" },
  { label: "Careers", href: "/careers" },
  { label: "News", href: "/news" },
  { label: "Contact Us", href: "/contact" },
  { label: "FAQs", href: "/faq" },
  { label: "Investment Portal", href: "/portal" },
];

const SERVICES = [
  { label: "Money Market", href: "/services#offerings" },
  { label: "Fixed Income", href: "/services#offerings" },
  { label: "Multi-Asset", href: "/services" },
  { label: "Ethical Products", href: "/services#offerings" },
  { label: "Financial Advisory", href: "/services#offerings" },
  { label: "Equity Investment", href: "/investment-vehicles" },
];

const ACCOUNTS = [
  { label: "Individual Account", href: "https://forms.gle/Mxu9fhggN8AtA93e6" },
  { label: "Corporate Account", href: "https://forms.gle/iAPfcrcJrz2qiXK19" },
];

// LinkedIn and Instagram are PCI's live profiles (from primecapital.ng).
// TODO(owner): Twitter/X and Facebook URLs — left idle ("#") for now.
const SOCIALS = [
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/company/primecapitalng/",
    label: "LinkedIn",
  },
  { icon: Twitter, href: "#", label: "Twitter" },
  {
    icon: Instagram,
    href: "https://www.instagram.com/primecapital.ng",
    label: "Instagram",
  },
  { icon: Facebook, href: "#", label: "Facebook" },
];

function ColumnTitle({ children }: { children: ReactNode }) {
  return (
    <h3 className="font-body text-[12px] font-bold uppercase tracking-[0.26em] text-gold-soft">
      {children}
    </h3>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group relative inline-block text-[15px] text-white/70 transition-colors duration-300 hover:text-white"
    >
      {label}
      <span
        aria-hidden
        className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-gold-refined transition-transform duration-500 ease-soft group-hover:scale-x-100"
      />
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-ink text-white">
      <span
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(50%_60%_at_85%_0%,rgba(201,162,75,0.12),transparent_70%)]"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Statement + account opening */}
        <div className="flex flex-col justify-between gap-10 border-b border-white/10 py-16 md:flex-row md:items-end md:py-20">
          <p className="max-w-2xl font-display text-[2.2rem] leading-[1.1] tracking-tight md:text-[3.25rem]">
            Building Wealth.{" "}
            <em className="font-normal text-gold-soft">Preserving Trust.</em>
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            {ACCOUNTS.map((a, i) => (
              <a
                key={a.href}
                href={a.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center gap-2.5 rounded-[2px] px-6 py-3.5 text-[12.5px] font-bold uppercase tracking-[0.16em] transition-colors duration-500 ${
                  i === 0
                    ? "btn-sheen bg-gold-refined text-ink hover:bg-gold-soft"
                    : "border border-white/30 text-white hover:border-white hover:bg-white hover:text-ink"
                }`}
              >
                {a.label}
                <ArrowUpRight aria-hidden className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Columns */}
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="group inline-flex items-center gap-3"
              aria-label="Prime Capital & Investment Limited, Home"
            >
              <Image
                src="/logo-mark.png"
                alt=""
                width={52}
                height={52}
                className="h-13 w-13 transition-transform duration-700 ease-soft group-hover:scale-105"
              />
              <span className="leading-none">
                <span className="block font-display text-[1.45rem] font-semibold tracking-tight">
                  Prime Capital
                </span>
                <span className="mt-1.5 block text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-refined">
                  &amp; Investment LTD
                </span>
              </span>
            </Link>
            <p className="mt-7 max-w-sm text-[15px] leading-[1.8] text-white/65">
              A financial services firm offering comprehensive investment
              product for wealth creation and preservation.
            </p>
          </div>

          <div className="lg:col-span-3">
            <ColumnTitle>Contact</ColumnTitle>
            <ul className="mt-7 space-y-5 text-[15px] text-white/70">
              <li className="flex gap-3.5">
                <MapPin
                  aria-hidden
                  strokeWidth={1.4}
                  className="mt-0.5 h-5 w-5 shrink-0 text-gold-refined"
                />
                No. 3, Sankuru Close, Off Rima Street, Maitama, Abuja
              </li>
              <li>
                <a
                  href="tel:+2348111837348"
                  className="flex gap-3.5 transition-colors hover:text-white"
                >
                  <Phone
                    aria-hidden
                    strokeWidth={1.4}
                    className="mt-0.5 h-5 w-5 shrink-0 text-gold-refined"
                  />
                  +234 (0) 811 183 7348
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@primecapital.ng"
                  className="flex gap-3.5 transition-colors hover:text-white"
                >
                  <Mail
                    aria-hidden
                    strokeWidth={1.4}
                    className="mt-0.5 h-5 w-5 shrink-0 text-gold-refined"
                  />
                  info@primecapital.ng
                </a>
              </li>
            </ul>
          </div>

          <nav aria-label="Useful links" className="lg:col-span-3">
            <ColumnTitle>Useful Links</ColumnTitle>
            <ul className="mt-7 space-y-3.5">
              {USEFUL_LINKS.map((l) => (
                <li key={l.href}>
                  <FooterLink {...l} />
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Services" className="lg:col-span-2">
            <ColumnTitle>Services</ColumnTitle>
            <ul className="mt-7 space-y-3.5">
              {SERVICES.map((l) => (
                <li key={l.label}>
                  <FooterLink {...l} />
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-6 border-t border-white/10 py-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-3 text-[13.5px] text-white/50 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
            <p>
              &copy; {new Date().getFullYear()} Prime Capital &amp; Investment
              Limited. All rights reserved.
            </p>
            <Link href="/terms" className="transition-colors hover:text-white">
              Terms of Use
            </Link>
            <Link
              href="/privacy"
              className="transition-colors hover:text-white"
            >
              Privacy Notice
            </Link>
            <a
              href="/Prime-Capital-Corporate-Profile.pdf"
              download
              className="transition-colors hover:text-white"
            >
              Corporate Profile (PDF)
            </a>
          </div>
          <div className="flex items-center gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                {...(s.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors duration-500 hover:border-gold-refined hover:text-gold-soft"
              >
                <s.icon aria-hidden className="h-4 w-4" />
              </a>
            ))}
            <span aria-hidden className="mx-2 h-6 w-px bg-white/15" />
            <BackToTop />
          </div>
        </div>

        <p className="pb-10 text-[12.5px] leading-relaxed text-white/40">
          Prime Capital &amp; Investment Limited is registered and regulated by
          the Nigerian Securities and Exchange Commission (SEC). Investments are
          subject to market risks. Past performance is not indicative of future
          results.{" "}
          <span className="whitespace-nowrap text-white/55">
            SEC Registration No.: SEC/REMI/REG/3095/2026
          </span>
        </p>
      </div>

      {/* Engraved watermark */}
      <p
        aria-hidden
        className="pointer-events-none -mb-[0.22em] select-none whitespace-nowrap text-center font-display text-[14.2vw] leading-none tracking-tight text-transparent [-webkit-text-stroke:1px_rgba(201,162,75,0.22)]"
      >
        Prime Capital
      </p>
      <div className="h-[3px] bg-linear-to-r from-transparent via-gold-refined to-transparent" />
    </footer>
  );
}
