import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/motion/reveal";
import { Navigation } from "@/components/navigation";
import { PageHero } from "@/components/page-hero";
import { VehiclesIndex } from "@/components/services/vehicles-index";

export const metadata: Metadata = {
  title: "Investment Vehicles",
  description:
    "Explore our range of investment solutions designed to grow and protect your wealth: money market instruments, fixed income, equities, ethical compliant products and alternative investments.",
  alternates: { canonical: "https://primecapital.ng/investment-vehicles" },
};

export default function InvestmentVehiclesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navigation />
      <PageHero
        title="Investment Vehicles"
        crumb="Investment Vehicles"
        image="/hero-3.jpg"
        focus="50% 45%"
      />

      <section className="px-4 py-24 sm:px-6 md:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-16 grid items-end gap-6 md:mb-20 md:grid-cols-12">
            <h2 className="font-display text-[2.4rem] font-normal leading-[1.08] tracking-tight text-ink md:col-span-7 md:text-[3.5rem]">
              Investment{" "}
              <em className="font-normal text-gold-refined">Vehicles</em>
            </h2>
            <p className="text-[17px] leading-[1.8] text-text-muted-dark md:col-span-5">
              Explore our range of investment solutions designed to grow and
              protect your wealth.
            </p>
          </Reveal>
          <VehiclesIndex />
        </div>
      </section>

      <CtaBand
        title="Ready to Optimise Your Portfolio?"
        text="Let our experts help you navigate the complexities of the financial markets with confidence and clarity."
        primary={{ href: "/contact", label: "Start Investing" }}
        secondary={{ href: "/services", label: "Investment Products" }}
      />

      <Footer />
    </div>
  );
}
