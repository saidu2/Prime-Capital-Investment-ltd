import { Gem, Handshake, Landmark, ScanEye } from "lucide-react";
import { PropositionStats } from "@/components/home/proposition-stats";
import { Reveal } from "@/components/motion/reveal";

/* Existing, approved PCI wording (homepage "Why Choose Prime Capital?"). */
const REASONS = [
  {
    icon: Gem,
    title: "Gold Standard Excellence",
    text: "Professional expertise, disciplined research, and premium service delivery define our commitment to quality.",
  },
  {
    icon: ScanEye,
    title: "Absolute Transparency",
    text: "Represented by our 'White' value, we ensure full transparency in disclosures, reporting, and decision-making.",
  },
  {
    icon: Landmark,
    title: "SEC-Regulated Assurance",
    text: "Managed within a robust regulatory framework, strictly in accordance with the Investments & Securities Act.",
  },
  {
    icon: Handshake,
    title: "Client-First Partnerships",
    text: "Bespoke solutions tailored to individual goals, risk profiles, and legacy aspirations.",
  },
];

export function WhyChoose() {
  return (
    <section className="bg-white px-4 py-24 sm:px-6 md:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span
            aria-hidden
            className="mx-auto mb-8 block h-14 w-px bg-linear-to-b from-transparent to-gold-refined"
          />
          <h2 className="font-display text-[2.4rem] font-normal leading-[1.08] tracking-tight text-ink md:text-[3.75rem]">
            Why Choose{" "}
            <em className="font-normal text-gold-refined">Prime Capital?</em>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-[1.85] text-text-muted-dark md:text-lg">
            Choosing a wealth manager is a decision of trust. We build enduring
            financial partnerships designed to empower confidence, stability,
            and prosperity.
          </p>
        </Reveal>

        <ul className="mt-16 grid gap-px border-y border-ink/10 bg-ink/10 sm:grid-cols-2 md:mt-24 lg:grid-cols-4">
          {REASONS.map((r, i) => (
            <Reveal as="li" key={r.title} delay={i * 0.12} className="bg-white">
              <div className="group relative h-full overflow-hidden px-8 py-12 md:px-10 md:py-16">
                {/* ink panel rises on hover */}
                <span
                  aria-hidden
                  className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-700 ease-soft group-hover:scale-y-100"
                />
                <div className="relative">
                  <div className="flex items-start justify-between">
                    <r.icon
                      aria-hidden
                      strokeWidth={1}
                      className="h-14 w-14 text-gold-refined transition-transform duration-700 ease-soft group-hover:-translate-y-1 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-10 font-display text-[1.5rem] font-normal leading-snug text-ink transition-colors duration-700 group-hover:text-white">
                    {r.title}
                  </h3>
                  <span
                    aria-hidden
                    className="mt-5 block h-px w-10 bg-gold-refined transition-all duration-700 ease-soft group-hover:w-20"
                  />
                  <p className="mt-5 text-[15px] leading-[1.8] text-text-muted-dark transition-colors duration-700 group-hover:text-text-muted-light">
                    {r.text}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>

        <PropositionStats />
      </div>
    </section>
  );
}
