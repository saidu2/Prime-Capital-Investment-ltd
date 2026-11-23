import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";

/* Existing, approved PCI wording (Services page). */
const ADVANTAGES = [
  {
    title: "Gold Standard Excellence",
    text: "Professional expertise, disciplined research, and premium service delivery define our commitment to quality.",
    image: "/goldbars.jpg",
    focus: "50% 55%",
  },
  {
    title: "Absolute Transparency",
    text: "Represented by our 'White' value, we ensure full transparency in disclosures, reporting, and decision-making.",
    image: "/service-advisory-alt-1.jpg",
    focus: "55% 40%",
  },
  {
    title: "SEC-Regulated Assurance",
    text: "Managed within a robust regulatory framework, strictly in accordance with the Investments & Securities Act.",
    image: "/hero-4.jpg",
    focus: "50% 45%",
  },
  {
    title: "Client-First Partnerships",
    text: "Bespoke solutions tailored to individual goals, risk profiles, and legacy aspirations.",
    image: "/client-handshake.jpg",
    focus: "50% 45%",
  },
];

export function Advantage() {
  return (
    <section className="bg-white px-4 py-24 sm:px-6 md:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal className="grid items-end gap-6 md:grid-cols-12">
          <h2 className="font-display text-[2.4rem] font-normal leading-[1.08] tracking-tight text-ink md:col-span-7 md:text-[3.5rem]">
            The Prime Capital{" "}
            <em className="font-normal text-gold-refined">Advantage</em>
          </h2>
          <p className="text-[17px] leading-[1.8] text-text-muted-dark md:col-span-5">
            We combine professional guidance with disciplined automation to
            deliver a sophisticated investment experience.
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 md:mt-20">
          {ADVANTAGES.map((a, i) => (
            <Reveal as="li" key={a.title} delay={i * 0.12}>
              <article className="group relative aspect-[3/4] overflow-hidden bg-ink">
                <Image
                  src={a.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1800ms] ease-soft group-hover:scale-[1.08]"
                  style={{ objectPosition: a.focus }}
                />
                <span
                  aria-hidden
                  className="absolute inset-0 bg-linear-to-t from-ink via-ink/55 to-ink/5 transition-opacity duration-700"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 bg-ink/0 transition-colors duration-700 ease-soft group-hover:bg-ink/35"
                />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <span
                    aria-hidden
                    className="block h-[2px] w-10 bg-gold-refined transition-all duration-700 ease-soft group-hover:w-20"
                  />
                  <h3 className="mt-5 font-display text-[1.6rem] font-normal leading-tight text-white">
                    {a.title}
                  </h3>
                  {/* always shown on touch; eases up on hover where hover exists */}
                  <p className="mt-3 text-[15px] leading-relaxed text-white/80 transition-all duration-700 ease-soft [@media(hover:hover)]:max-h-0 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:max-h-40 [@media(hover:hover)]:group-hover:opacity-100">
                    {a.text}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>

        {/* Our Financial Advisory Team */}
        <Reveal className="mt-5">
          <Link
            href="/about/management"
            className="group relative grid overflow-hidden bg-ink md:grid-cols-2"
          >
            <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-[420px]">
              <Image
                src="/advisory-team-photo.jpg"
                alt="The Prime Capital advisory team at work"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover object-top transition-transform duration-[1800ms] ease-soft group-hover:scale-[1.05]"
              />
            </div>
            <div className="relative flex flex-col justify-center p-9 md:p-14 lg:p-20">
              <span
                aria-hidden
                className="absolute inset-0 opacity-[0.06] [background-image:repeating-linear-gradient(115deg,#c9a24b_0_1px,transparent_1px_70px)]"
              />
              <h3 className="relative font-display text-[2.2rem] font-normal leading-[1.1] text-white md:text-[3rem]">
                Our Financial Advisory Team
              </h3>
              <span className="relative mt-9 inline-flex items-center gap-3 text-[13px] font-bold uppercase tracking-[0.18em] text-gold-soft">
                Management Team
                <ArrowRight
                  aria-hidden
                  className="h-4 w-4 transition-transform duration-500 ease-soft group-hover:translate-x-1.5"
                />
              </span>
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
