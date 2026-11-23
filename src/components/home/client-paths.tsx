import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";

/*
 * Card titles and descriptions are the "Private Wealth Management" and
 * "Corporate & Institutional" service lines from the owner's Corporate
 * Profile deck (2026-11-22). The section heading is from the build spec;
 * product names and account links are existing wording.
 */
const PATHS = [
  {
    key: "personal",
    eyebrow: "Personal",
    title: "Private Wealth Management",
    text: "Portfolio construction, income planning and intergenerational wealth transfer for high-net-worth individuals and families.",
    image: "/client-personal.jpg",
    focus: "50% 30%",
    links: [
      { label: "Wealth & Financial Planning", href: "/services#offerings" },
      { label: "Investment Advisory", href: "/services#offerings" },
      { label: "Money Market Instruments", href: "/services#offerings" },
      {
        label: "Ethical & Shari'ah Compliant Products",
        href: "/services#offerings",
      },
    ],
    account: {
      label: "Individual Account",
      href: "https://forms.gle/Mxu9fhggN8AtA93e6",
    },
  },
  {
    key: "institutional",
    eyebrow: "Institutional",
    title: "Corporate & Institutional",
    text: "Treasury and liquidity management, dedicated mandates and structured solutions for corporates, pension funds and public institutions.",
    image: "/client-institutional.jpg",
    focus: "50% 30%",
    links: [
      {
        label: "Corporate & Institutional Advisory",
        href: "/services#offerings",
      },
      { label: "Fixed Income Securities", href: "/services#offerings" },
      { label: "Alternative Investments", href: "/services#offerings" },
      { label: "Investment Vehicles", href: "/investment-vehicles" },
    ],
    account: {
      label: "Corporate Account",
      href: "https://forms.gle/iAPfcrcJrz2qiXK19",
    },
  },
];

export function ClientPaths() {
  return (
    <section className="bg-paper px-4 py-24 sm:px-6 md:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-[2.3rem] font-normal leading-[1.1] tracking-tight text-ink md:text-[3.5rem]">
            Let&rsquo;s help you achieve your{" "}
            <em className="font-normal text-gold-refined">investment goals</em>
          </h2>
        </Reveal>

        <div className="mt-16 space-y-8 md:mt-24 md:space-y-10">
          {PATHS.map((p, i) => {
            const flip = i % 2 === 1;
            return (
              <Reveal key={p.key} delay={0.05}>
                <article className="group grid overflow-hidden md:grid-cols-12">
                  <div
                    className={`relative aspect-[4/3] overflow-hidden md:col-span-7 md:aspect-auto md:min-h-[520px] ${
                      flip ? "md:order-2" : ""
                    }`}
                  >
                    <Image
                      src={p.image}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 58vw, 100vw"
                      className="object-cover transition-transform duration-[2000ms] ease-soft group-hover:scale-[1.05]"
                      style={{ objectPosition: p.focus }}
                    />
                  </div>
                  <div
                    className={`relative flex flex-col justify-center bg-ink p-9 text-white transition-transform duration-700 ease-soft md:col-span-5 md:p-14 md:group-hover:-translate-y-2 ${
                      flip ? "md:order-1" : ""
                    }`}
                  >
                    <span
                      aria-hidden
                      className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gold-refined transition-transform duration-1000 ease-soft group-hover:scale-x-100"
                    />
                    <p className="text-[12px] font-bold uppercase tracking-[0.28em] text-gold-soft">
                      {p.eyebrow}
                    </p>
                    <h3 className="mt-5 font-display text-[1.9rem] font-normal leading-[1.15] md:text-[2.35rem]">
                      {p.title}
                    </h3>
                    <p className="mt-5 text-[15.5px] leading-[1.8] text-text-muted-light">
                      {p.text}
                    </p>
                    <ul className="mt-8 space-y-3.5">
                      {p.links.map((l) => (
                        <li key={l.label}>
                          <Link
                            href={l.href}
                            className="group/link inline-flex items-center gap-2 text-[15px] text-white/90 transition-colors duration-300 hover:text-gold-soft"
                          >
                            <span className="relative">
                              {l.label}
                              <span
                                aria-hidden
                                className="absolute inset-x-0 -bottom-1 h-px bg-gold-refined/50"
                              />
                              <span
                                aria-hidden
                                className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-gold-soft transition-transform duration-500 ease-soft group-hover/link:scale-x-100"
                              />
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <a
                      href={p.account.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-sheen mt-10 inline-flex w-fit items-center gap-3 rounded-[2px] bg-gold-refined px-7 py-3.5 text-[12.5px] font-bold uppercase tracking-[0.16em] text-ink transition-colors duration-500 hover:bg-gold-soft"
                    >
                      Open {p.account.label}
                      <ArrowUpRight aria-hidden className="h-4 w-4" />
                    </a>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
