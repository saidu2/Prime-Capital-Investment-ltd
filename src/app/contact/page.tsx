import {
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
} from "lucide-react";
import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/motion/reveal";
import { Navigation } from "@/components/navigation";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Prime Capital & Investment Limited, No. 3, Sankuru Close, Off Rima Street, Maitama, Abuja. Call +234 (0) 811 183 7348 or email info@primecapital.ng.",
  alternates: { canonical: "https://primecapital.ng/contact" },
};

/* All copy and details are existing PCI wording. */
const CONTACT_INFO = [
  {
    icon: MapPin,
    title: "Abuja Office",
    details: [
      "No. 3, Sankuru Close, Off Rima Street,",
      "Maitama, Abuja",
      "Nigeria",
    ],
    href: "https://maps.google.com/?q=No.+3,+Sankuru+Close,+Maitama,+Abuja,+Nigeria",
  },
  {
    icon: Phone,
    title: "Telephone",
    details: ["+234 (0) 811 183 7348", "Mon - Fri: 9:00 AM - 5:00 PM"],
    href: "tel:+2348111837348",
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["info@primecapital.ng"],
    href: "mailto:info@primecapital.ng",
  },
  {
    // From the Corporate Profile deck (2026-11-22).
    icon: MessageCircle,
    title: "WhatsApp",
    details: ["0811 183 7348", "WhatsApp available for document requests."],
    href: "https://wa.me/2348111837348",
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: [
      "Our office time is 9:00am-5:00pm",
      "Monday - Friday",
      "Saturday - Sunday: Closed",
      "Public Holidays: Closed",
      "Meetings outside office hours by prior arrangement.",
    ],
  },
];

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navigation />
      <PageHero
        title="Connect With Us"
        crumb="Contact Us"
        image="/hero-4.jpg"
        focus="70% 45%"
      />

      {/* Intro */}
      <section className="px-4 pt-24 pb-16 sm:px-6 md:pt-32 md:pb-20 lg:px-8">
        <Reveal className="mx-auto max-w-4xl text-center">
          <span
            aria-hidden
            className="mx-auto mb-9 block h-14 w-px bg-linear-to-b from-transparent to-gold-refined"
          />
          <p className="font-display text-[1.5rem] leading-[1.5] text-ink md:text-[2.1rem]">
            Whether you are looking to preserve wealth or create a new legacy,
            our team of experts is ready to guide you through Nigeria&apos;s
            complex financial landscape.
          </p>
        </Reveal>
      </section>

      {/* Form + details */}
      <section className="px-4 pb-24 sm:px-6 md:pb-32 lg:px-8">
        <div className="mx-auto grid max-w-7xl overflow-hidden shadow-[0_50px_100px_-50px_rgba(10,16,36,0.45)] lg:grid-cols-12">
          {/* Details panel */}
          <Reveal className="relative isolate bg-ink p-9 text-white md:p-12 lg:col-span-5 lg:p-14">
            <span
              aria-hidden
              className="absolute inset-0 -z-10 opacity-[0.06] [background-image:repeating-linear-gradient(115deg,#c9a24b_0_1px,transparent_1px_70px)]"
            />
            <span
              aria-hidden
              className="absolute inset-0 -z-10 bg-[radial-gradient(70%_50%_at_0%_0%,rgba(201,162,75,0.18),transparent_70%)]"
            />
            <h2 className="font-display text-[2rem] font-normal leading-tight md:text-[2.5rem]">
              Contact Information
            </h2>
            <span
              aria-hidden
              className="mt-6 block h-px w-14 bg-gold-refined"
            />
            <ul className="mt-10 space-y-9">
              {CONTACT_INFO.map((info) => {
                const body = (
                  <>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-gold-refined/40 text-gold-soft transition-colors duration-500 group-hover:bg-gold-refined group-hover:text-ink">
                      <info.icon
                        aria-hidden
                        strokeWidth={1.4}
                        className="h-5 w-5"
                      />
                    </span>
                    <span>
                      <span className="block text-[12px] font-bold uppercase tracking-[0.22em] text-gold-soft">
                        {info.title}
                      </span>
                      <span className="mt-2 block space-y-1 text-[15.5px] leading-relaxed text-white/80">
                        {info.details.map((d) => (
                          <span key={d} className="block">
                            {d}
                          </span>
                        ))}
                      </span>
                    </span>
                  </>
                );
                return (
                  <li key={info.title}>
                    {info.href ? (
                      <a
                        href={info.href}
                        target={
                          info.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          info.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="group flex gap-5"
                      >
                        {body}
                      </a>
                    ) : (
                      <div className="group flex gap-5">{body}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </Reveal>

          {/* Form */}
          <Reveal
            delay={0.12}
            className="bg-white p-9 md:p-12 lg:col-span-7 lg:p-16"
          >
            <h2 className="font-display text-[2rem] font-normal leading-tight text-ink md:text-[2.5rem]">
              Send Us a{" "}
              <em className="font-normal text-gold-refined">Message</em>
            </h2>
            <p className="mt-4 max-w-xl text-[16px] leading-[1.8] text-text-muted-dark">
              Fill out the form below and a member of our investment team will
              contact you within one business day.
            </p>
            <div className="mt-12">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Map */}
      <section className="group relative h-[420px] overflow-hidden bg-paper md:h-[520px]">
        <iframe
          src="https://www.google.com/maps?q=No.+3,+Sankuru+Close,+Maitama,+Abuja,+Nigeria&output=embed"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 h-full w-full border-0 grayscale-[0.85] contrast-[1.05] transition-[filter] duration-1000 ease-soft group-hover:grayscale-0"
          title="Prime Capital Office Location - No. 3, Sankuru Close, Off Rima Street, Maitama, Abuja, Nigeria"
        />
      </section>

      {/* SEC verification */}
      <section className="border-t border-ink/[0.06] bg-paper px-4 py-14 sm:px-6 lg:px-8">
        <Reveal className="mx-auto flex max-w-4xl flex-col items-center gap-5 text-center md:flex-row md:text-left">
          <ShieldCheck
            aria-hidden
            strokeWidth={1.2}
            className="h-10 w-10 shrink-0 text-gold-refined"
          />
          <p className="text-[14.5px] leading-[1.85] text-text-muted-dark">
            The SEC advises the public to always verify the registration status
            of any entity or investment product with the Commission before
            dealing with them to avoid investment scams. For verification or
            further information, please contact the SEC through their official
            website:{" "}
            <a
              href="https://www.sec.gov.ng"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-ink underline decoration-gold-refined underline-offset-4 hover:text-gold-refined"
            >
              www.sec.gov.ng
            </a>
          </p>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}
