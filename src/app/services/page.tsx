import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/motion/reveal";
import { Navigation } from "@/components/navigation";
import { PageHero } from "@/components/page-hero";
import { Advantage } from "@/components/services/advantage";
import { Discipline } from "@/components/services/discipline";
import { Offerings } from "@/components/services/offerings";
import { ServiceLines } from "@/components/services/service-lines";

export const metadata: Metadata = {
  title: "Investment Products",
  description:
    "Professionally managed funds and bespoke portfolios from Prime Capital & Investment Limited: money market instruments, fixed income, ethical & Shari'ah compliant products, alternative investments and financial advisory.",
  alternates: { canonical: "https://primecapital.ng/services" },
};

/* All copy is existing, approved PCI wording. */
export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navigation />
      <PageHero
        title="Investment Products"
        crumb="Services"
        image="/client-handshake.jpg"
        focus="50% 45%"
      />

      {/* Intro */}
      <section className="px-4 py-24 sm:px-6 md:py-32 lg:px-8">
        <Reveal className="mx-auto max-w-4xl text-center">
          <span
            aria-hidden
            className="mx-auto mb-9 block h-14 w-px bg-linear-to-b from-transparent to-gold-refined"
          />
          <p className="font-display text-[1.45rem] leading-[1.5] text-ink md:text-[2rem]">
            At Prime Capital & Investment Limited, our solutions are designed to
            meet diverse client needs for wealth creation and preservation,
            blending disciplined investment strategies with innovative and
            transparent offerings.
          </p>
          <p className="mx-auto mt-8 max-w-2xl text-[17px] leading-[1.8] text-text-muted-dark">
            We provide access to a range of professionally managed funds and
            bespoke portfolios. Our Offerings Include:
          </p>
        </Reveal>
      </section>

      <ServiceLines />
      <Offerings />
      <Discipline />
      <Advantage />

      <CtaBand
        title="Ready to Optimise Your Portfolio?"
        text="Let our experts help you navigate the complexities of the financial markets with confidence and clarity."
        primary={{ href: "/contact", label: "Start Investing" }}
        secondary={{ href: "/about", label: "More on us" }}
      />

      <Footer />
    </div>
  );
}
