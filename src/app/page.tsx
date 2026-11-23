import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { Footer } from "@/components/footer";
import { Approach } from "@/components/home/approach";
import { ClientPaths } from "@/components/home/client-paths";
import { Disclosure, HomeContact } from "@/components/home/contact";
import { Hero } from "@/components/home/hero";
import { ServiceShowcase } from "@/components/home/service-showcase";
import { WhyChoose } from "@/components/home/why-choose";
import { Reveal } from "@/components/motion/reveal";
import { Navigation } from "@/components/navigation";
import { RecentNewsWrapper } from "@/components/recent-news-wrapper";

/* The homepage is a short summary that hands off to the inner pages.
   All copy is existing, approved PCI wording unless a component says DRAFT. */
export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-clip bg-white text-ink">
      <Navigation />
      <Hero />
      <ServiceShowcase />

      {/* Overview — light, airy intro that hands off to the About page */}
      <section
        id="overview"
        className="relative border-t border-ink/[0.06] bg-white px-4 py-24 sm:px-6 md:py-32 lg:px-8"
      >
        <Reveal className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="font-display text-lg italic text-gold-refined">
              Prime Capital &amp; Investment Limited
            </p>
            <h2 className="mt-4 font-display text-[2.6rem] font-normal tracking-tight text-ink md:text-[4rem]">
              Overview
            </h2>
            <span
              aria-hidden
              className="mt-8 block h-px w-16 bg-gold-refined"
            />
          </div>
          <div className="space-y-6 text-base leading-relaxed text-text-muted-dark md:text-lg lg:col-span-8">
            <p className="font-display text-xl leading-snug text-ink md:text-2xl">
              At Prime Capital & Investment Limited, we believe that asset
              management is more than generating returns; it is about
              responsible stewardship of capital, disciplined risk management,
              and contributing meaningfully to sustainable economic growth in
              Nigeria.
            </p>
            <p>
              In a rapidly evolving economic landscape, capital must be deployed
              with clarity, prudence, and foresight. We recognize that
              well-managed investment capital can strengthen institutions,
              deepen markets, support productive enterprises, and create
              longterm prosperity.
            </p>
            <p>
              Our philosophy at Prime Capital is grounded in the conviction that
              sustainable wealth creation comes from aligning strategy,
              governance, and risk management with long-term national
              development priorities.
            </p>
            <Link
              href="/about"
              className="group inline-flex items-center gap-4 pt-4 text-[13px] font-bold uppercase tracking-[0.2em] text-ink"
            >
              About Us
              <span
                aria-hidden
                className="h-px w-10 bg-gold-refined transition-all duration-700 ease-soft group-hover:w-20"
              />
            </Link>
          </div>
        </Reveal>
      </section>

      <Approach />
      <ClientPaths />
      <WhyChoose />
      <RecentNewsWrapper />

      <CtaBand
        title="Ready to Secure Your Future?"
        text="Join a modern, dependable, and client-focused institution trusted to steward wealth across market cycles."
        primary={{ href: "/contact", label: "Get Started Now" }}
        secondary={{ href: "/about", label: "Learn More" }}
        image="/hero-2.jpg"
      />

      <HomeContact />
      <Disclosure />
      <Footer />
    </div>
  );
}
