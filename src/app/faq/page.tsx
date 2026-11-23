import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { FaqList } from "@/components/faq-list";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/motion/reveal";
import { Navigation } from "@/components/navigation";
import { PageHero } from "@/components/page-hero";
import { FAQ_GROUPS } from "@/data/faqs";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about Prime Capital & Investment Limited: regulation, services, opening an account, custody, reporting and fees.",
  alternates: { canonical: "https://primecapital.ng/faq" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_GROUPS.flatMap((g) =>
    g.items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  ),
};

export default function FaqPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: structured data
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navigation />
      <PageHero
        title="Frequently Asked Questions"
        crumb="FAQs"
        image="/hero-1.jpg"
        focus="50% 50%"
      />
      <section className="bg-paper px-4 py-24 sm:px-6 md:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-14 grid items-end gap-6 md:mb-20 md:grid-cols-12">
            <h2 className="font-display text-[2.3rem] font-normal leading-[1.08] tracking-tight text-ink md:col-span-7 md:text-[3.25rem]">
              How can we{" "}
              <em className="font-normal text-gold-refined">help you?</em>
            </h2>
            <p className="text-[17px] leading-[1.85] text-text-muted-dark md:col-span-5">
              Clear answers about who we are, how we invest and how we protect
              your capital. Can&apos;t find what you need? Our team is a message
              away.
            </p>
          </Reveal>
          <FaqList groups={FAQ_GROUPS} />
        </div>
      </section>
      <CtaBand
        title="Still have a question?"
        text="Speak with our team about your investment objectives, our services or opening an account."
        primary={{ href: "/contact", label: "Contact Us" }}
        secondary={{ href: "/services", label: "Our Services" }}
      />
      <Footer />
    </div>
  );
}
