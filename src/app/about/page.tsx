import { ArrowRight, Shield, Target, Telescope } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AtAGlance } from "@/components/about/at-a-glance";
import { ColourStory } from "@/components/about/colour-story";
import { Journey } from "@/components/about/journey";
import { Philosophy } from "@/components/about/philosophy";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/motion/reveal";
import { Navigation } from "@/components/navigation";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Prime Capital & Investment Limited is a SEC-regulated Fund and Portfolio Management firm built on disciplined expertise, unwavering integrity, trust, and a clear commitment to long-term wealth creation.",
  alternates: { canonical: "https://primecapital.ng/about" },
};

/* All copy below is existing, approved PCI wording (About page + homepage). */

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navigation />
      <PageHero
        title="About Prime Capital"
        crumb="About Us"
        image="/about-office.jpg"
        focus="50% 30%"
      />

      {/* Intro — framed photo + statement (Cardinal pattern) */}
      <section className="px-4 py-24 sm:px-6 md:py-32 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-12 lg:gap-20">
          <Reveal className="relative lg:col-span-5">
            <span
              aria-hidden
              className="absolute -left-3 md:-left-5 top-12 bottom-0 w-1/3 bg-gold-refined/15"
            />
            <div className="group relative aspect-[3011/2870] overflow-hidden">
              <Image
                src="/team-portrait.jpg"
                alt="Members of the Prime Capital team"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover object-top transition-transform duration-[1600ms] ease-soft group-hover:scale-[1.04]"
              />
            </div>
          </Reveal>
          <Reveal delay={0.15} className="lg:col-span-7">
            <p className="font-display text-lg italic text-gold-refined">
              Prime Capital &amp; Investment Limited
            </p>
            <h2 className="mt-3 font-display text-[2rem] font-normal leading-[1.15] tracking-tight text-ink md:text-[2.75rem]">
              We exist to help investors navigate complexity with confidence.
            </h2>
            <span
              aria-hidden
              className="mt-7 block h-px w-16 bg-gold-refined"
            />
            <div className="mt-7 space-y-5 text-base leading-[1.8] text-text-muted-dark md:text-[17px]">
              <p>
                A Fund and Portfolio Management firm built on disciplined
                expertise, unwavering integrity, trust, and a clear commitment
                to long-term wealth creation.
              </p>
              <p>
                Through professional fund management, bespoke portfolio
                solutions, and robust risk management, we transform financial
                aspirations into enduring value.
              </p>
              <p>
                At Prime Capital & Investment Limited, we believe that asset
                management is more than generating returns; it is about
                responsible stewardship of capital, disciplined risk management,
                and contributing meaningfully to sustainable economic growth in
                Nigeria.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <AtAGlance />

      {/* Mission & Vision (Cardinal pattern) */}
      <section className="border-y border-ink/[0.06] bg-paper px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <h2 className="font-display text-[2rem] font-normal leading-[1.15] tracking-tight text-ink md:text-[2.5rem]">
              Mission &amp;
              <br />
              Vision Statements
            </h2>
            <span
              aria-hidden
              className="mt-7 block h-px w-16 bg-gold-refined"
            />
          </Reveal>
          <div className="grid gap-12 sm:grid-cols-2 lg:col-span-8 lg:gap-0 lg:divide-x lg:divide-ink/10">
            {[
              {
                icon: Telescope,
                title: "Our Vision",
                text: "To be one of the most trusted partners in wealth management.",
              },
              {
                icon: Target,
                title: "Our Mission",
                text: "Grow and protect client wealth through innovative and disciplined strategies.",
              },
            ].map((item, i) => (
              <Reveal
                key={item.title}
                delay={0.1 + i * 0.12}
                className="lg:px-12"
              >
                <item.icon
                  aria-hidden
                  strokeWidth={1.1}
                  className="h-12 w-12 text-gold-refined"
                />
                <h3 className="mt-6 font-display text-2xl text-ink md:text-[1.75rem]">
                  {item.title}
                </h3>
                <p className="mt-4 text-base leading-[1.8] text-text-muted-dark md:text-lg">
                  {item.text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Journey />

      <ColourStory />

      <Philosophy />

      {/* Leadership — Board and Management have their own pages */}
      <section
        id="team"
        className="bg-paper px-4 py-20 sm:px-6 md:py-28 lg:px-8"
      >
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
          {[
            {
              href: "/about/board",
              title: "Board of Directors",
              text: "Strategic oversight and governance from seasoned industry leaders.",
              image: "/board-room.jpg",
              focus: "50% 55%",
            },
            {
              href: "/about/management",
              title: "Management Team",
              text: "The professionals driving our day-to-day excellence.",
              image: "/management-office.jpg",
              focus: "50% 45%",
            },
          ].map((card, i) => (
            <Reveal key={card.href} delay={i * 0.12}>
              <Link
                href={card.href}
                className="group relative block aspect-[4/3] overflow-hidden lg:aspect-[16/11]"
              >
                <Image
                  src={card.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1600ms] ease-soft group-hover:scale-[1.05]"
                  style={{ objectPosition: card.focus }}
                />
                <span
                  aria-hidden
                  className="absolute inset-0 bg-ink/70 transition-colors duration-700 group-hover:bg-ink/55"
                />
                <span className="absolute inset-x-0 bottom-0 p-8 md:p-10">
                  <span
                    aria-hidden
                    className="mb-6 block h-[2px] w-12 bg-gold-refined transition-all duration-700 ease-soft group-hover:w-20"
                  />
                  <h2 className="font-display text-3xl font-normal text-white md:text-4xl">
                    {card.title}
                  </h2>
                  <span className="mt-3 block min-h-[3.25em] max-w-md leading-relaxed text-white/75">
                    {card.text}
                  </span>
                  <span className="mt-6 inline-flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-gold-soft">
                    View
                    <ArrowRight
                      aria-hidden
                      className="h-4 w-4 transition-transform duration-500 ease-soft group-hover:translate-x-1"
                    />
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Regulation & Compliance */}
      <section className="px-4 py-24 sm:px-6 md:py-28 lg:px-8">
        <Reveal className="mx-auto flex max-w-4xl flex-col items-center gap-8 border border-ink/10 p-10 text-center md:flex-row md:p-14 md:text-left">
          <span className="flex h-20 w-20 shrink-0 items-center justify-center bg-ink">
            <Shield
              aria-hidden
              strokeWidth={1.25}
              className="h-9 w-9 text-gold-soft"
            />
          </span>
          <div>
            <h2 className="font-display text-2xl text-ink md:text-[1.75rem]">
              Regulation &amp; Compliance
            </h2>
            <p className="mt-4 text-base leading-[1.8] text-text-muted-dark">
              We are registered with and regulated by the Securities and
              Exchange Commission (SEC), Nigeria, and operate strictly in
              accordance with the Investments & Securities Act (ISA) 2025, as
              amended and applicable SEC Rules.
            </p>
            <p className="mt-5 inline-flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-ink/10 pt-5 text-[13px] font-bold uppercase tracking-[0.16em] text-ink">
              SEC Registration No.
              <span className="font-display text-[15px] normal-case tracking-normal text-gold-refined">
                SEC/REMI/REG/3095/2026
              </span>
            </p>
          </div>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}
