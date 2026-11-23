import { ArrowUpRight, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

/* Existing, approved PCI wording and contact details. */
const CHANNELS = [
  {
    icon: MapPin,
    label: "Abuja Office",
    value: "No. 3, Sankuru Close, Off Rima street, Maitama, Abuja, Nigeria",
    href: "https://maps.google.com/?q=No.%203,%20Sankuru%20Close,%20Off%20Rima%20Street,%20Maitama,%20Abuja",
  },
  {
    icon: Phone,
    label: "Telephone",
    value: "+234 (0) 811 183 7348",
    href: "tel:+2348111837348",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@primecapital.ng",
    href: "mailto:info@primecapital.ng",
  },
];

const MAP_SRC =
  "https://maps.google.com/maps?width=520&height=400&hl=en&q=No.%203,%20Sankuru%20Close,%20Off%20Rima%20Street,%20Maitama,%20Abuja%20Abuja+()&t=&z=16&ie=UTF8&iwloc=B&output=embed";

export function HomeContact() {
  return (
    <section className="bg-white px-4 py-24 sm:px-6 md:py-32 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-12 lg:gap-20">
        <Reveal className="lg:col-span-5">
          <h2 className="font-display text-[2.4rem] font-normal leading-[1.06] tracking-tight text-ink md:text-[3.75rem]">
            Get in <em className="font-normal text-gold-refined">Touch</em>
          </h2>
          <ul className="mt-12 border-t border-ink/10">
            {CHANNELS.map((c) => (
              <li key={c.label} className="border-b border-ink/10">
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    c.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="group flex items-start gap-6 py-7"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-gold-refined/40 text-gold-refined transition-colors duration-500 group-hover:border-ink group-hover:bg-ink group-hover:text-gold-soft">
                    <c.icon aria-hidden strokeWidth={1.4} className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[12px] font-bold uppercase tracking-[0.22em] text-text-muted-dark">
                      {c.label}
                    </span>
                    <span className="mt-2 block font-display text-[1.2rem] leading-snug text-ink transition-colors duration-500 group-hover:text-gold-refined md:text-[1.35rem]">
                      {c.value}
                    </span>
                  </span>
                  <ArrowUpRight
                    aria-hidden
                    className="mt-1 h-5 w-5 shrink-0 text-ink/30 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold-refined"
                  />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.15} className="relative lg:col-span-7">
          <span
            aria-hidden
            className="absolute -bottom-3 -right-3 md:-bottom-5 md:-right-5 h-2/3 w-2/3 bg-gold-refined/15"
          />
          <div className="group relative aspect-[4/3] overflow-hidden bg-paper shadow-[0_40px_80px_-40px_rgba(10,16,36,0.45)] md:aspect-[16/11]">
            <iframe
              title="Prime Capital office location on Google Maps"
              src={MAP_SRC}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0 grayscale-[0.85] contrast-[1.05] transition-[filter] duration-1000 ease-soft group-hover:grayscale-0"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Disclosure() {
  return (
    <section className="border-t border-ink/[0.06] bg-paper px-4 py-16 sm:px-6 md:py-20 lg:px-8">
      <Reveal className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <ShieldCheck
            aria-hidden
            strokeWidth={1.2}
            className="h-10 w-10 text-gold-refined"
          />
          <h2 className="mt-5 font-display text-[1.6rem] font-normal leading-snug text-ink">
            Important Disclosure &amp; Investor Warning
          </h2>
        </div>
        <div className="space-y-5 text-[14.5px] leading-[1.85] text-text-muted-dark lg:col-span-8">
          <p>
            {/* DRAFT (2026-11-23): ticker sentence added at the owner's request;
                Compliance to confirm wording. */}
            The share prices scrolling on our banner are provided for
            information purposes only. They may be delayed, are sourced from a
            third party, and do not constitute investment advice, an offer to
            sell or a solicitation of an offer to buy any securities.
            Investments in the capital market are subject to
            market risks, and the value of investments can go up or down. Past
            performance is not a guarantee of future returns.
          </p>
          <p>
            Prospective investors are advised to carefully read the relevant
            fund prospectus or information memorandum, which contain detailed
            risk warnings and disclosures, before making any investment
            decision. The SEC advises the public to always verify the
            registration status of any entity or investment product with the
            Commission before dealing with them to avoid investment scams. For
            verification or further information, please contact the SEC through
            their official website:{" "}
            <a
              href="https://www.sec.gov.ng"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-ink underline decoration-gold-refined underline-offset-4 transition-colors hover:text-gold-refined"
            >
              www.sec.gov.ng
            </a>
          </p>
        </div>
      </Reveal>
    </section>
  );
}
