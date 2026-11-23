import {
  BellRing,
  FileText,
  LineChart,
  LockKeyhole,
  MessagesSquare,
  Smartphone,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/motion/reveal";
import { Navigation } from "@/components/navigation";
import { PortalPreview } from "@/components/portal/portal-preview";
import { WaitlistForm } from "@/components/portal/waitlist-form";

export const metadata: Metadata = {
  title: "Investment Portal",
  description:
    "The Prime Capital Investment Portal is coming soon. View your portfolio, statements and mandate documents securely, anytime.",
  alternates: { canonical: "https://primecapital.ng/portal" },
};

/* DRAFT (2026-11-23): planned portal features — confirm with the owner
   before launch so nothing is promised that won't ship. */
const FEATURES = [
  {
    icon: LineChart,
    title: "Portfolio at a glance",
    text: "Holdings, allocation and performance against your agreed benchmark.",
  },
  {
    icon: FileText,
    title: "Statements on demand",
    text: "Download statements and mandate documents whenever you need them.",
  },
  {
    icon: MessagesSquare,
    title: "Secure messaging",
    text: "Reach your relationship team directly from inside the portal.",
  },
  {
    icon: BellRing,
    title: "Timely updates",
    text: "Notifications on transactions, reports and important changes.",
  },
  {
    icon: LockKeyhole,
    title: "Bank-grade security",
    text: "Encrypted access with two-factor authentication.",
  },
  {
    icon: Smartphone,
    title: "Any device",
    text: "Designed for desktop, tablet and phone.",
  },
];

export default function PortalPage() {
  return (
    <div className="flex min-h-screen flex-col bg-ink">
      <Navigation />

      <section className="relative isolate overflow-hidden px-4 pt-[calc(var(--header-h)+4rem)] pb-24 text-white sm:px-6 md:pb-32 lg:px-8">
        <span
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_80%_30%,rgba(201,162,75,0.18),transparent_70%)]"
        />
        <span
          aria-hidden
          className="absolute inset-0 -z-10 opacity-[0.06] [background-image:repeating-linear-gradient(115deg,#c9a24b_0_1px,transparent_1px_90px)]"
        />
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-gold-refined/40 bg-gold-refined/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.24em] text-gold-soft">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-soft opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-soft" />
              </span>
              Coming Soon
            </span>
            <h1 className="mt-8 font-display text-[2.8rem] font-normal leading-[1.04] tracking-tight md:text-[4.5rem]">
              Your wealth,{" "}
              <em className="font-normal text-gold-soft">
                always within reach
              </em>
            </h1>
            <p className="mt-7 max-w-xl text-[17px] leading-[1.85] text-text-muted-light">
              The Prime Capital Investment Portal will give clients secure,
              round-the-clock access to their portfolios, statements and
              relationship team, with the same transparency we promise, now in your
              hands.
            </p>
            <div className="mt-10 max-w-xl">
              <WaitlistForm />
              <p className="mt-4 text-[13px] text-white/50">
                Already a client? Your relationship team remains available on{" "}
                <a
                  href="tel:+2348111837348"
                  className="text-white/80 underline decoration-gold-refined underline-offset-4"
                >
                  0811 183 7348
                </a>{" "}
                for statements and requests.
              </p>
            </div>
          </Reveal>
          <div className="lg:col-span-6">
            <PortalPreview />
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-24 sm:px-6 md:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal className="grid items-end gap-6 md:grid-cols-12">
            <h2 className="font-display text-[2.3rem] font-normal leading-[1.08] tracking-tight text-ink md:col-span-7 md:text-[3.25rem]">
              What&apos;s{" "}
              <em className="font-normal text-gold-refined">coming</em>
            </h2>
            <p className="text-[17px] leading-[1.85] text-text-muted-dark md:col-span-5">
              Built around transparent stewardship: show clients holdings,
              performance and costs throughout the mandate.
            </p>
          </Reveal>
          <ul className="mt-14 grid gap-px border-y border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3 md:mt-16">
            {FEATURES.map((f, i) => (
              <Reveal
                as="li"
                key={f.title}
                delay={(i % 3) * 0.1}
                className="bg-white"
              >
                <div className="group h-full p-8 md:p-10">
                  <f.icon
                    aria-hidden
                    strokeWidth={1.2}
                    className="h-11 w-11 text-gold-refined transition-transform duration-700 ease-soft group-hover:-translate-y-1"
                  />
                  <h3 className="mt-7 font-display text-[1.4rem] font-normal text-ink">
                    {f.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-[1.8] text-text-muted-dark">
                    {f.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
          <Reveal className="mt-12 flex flex-col items-start justify-between gap-6 border-l-2 border-gold-refined bg-paper px-7 py-7 md:flex-row md:items-center">
            <p className="text-[16px] leading-relaxed text-text-muted-dark">
              Not yet a client? Open an account today and be among the first to
              use the portal.
            </p>
            <Link
              href="/contact"
              className="btn-sheen inline-flex shrink-0 items-center gap-3 rounded-[2px] bg-ink px-7 py-4 text-[12.5px] font-bold uppercase tracking-[0.16em] text-white transition-colors duration-500 hover:bg-gold-refined hover:text-ink"
            >
              Speak with our team
            </Link>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
