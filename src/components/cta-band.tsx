import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";

/** Closing call-to-action: a slow push-in skyline under an ink wash. */
export function CtaBand({
  title,
  text,
  primary,
  secondary,
  image = "/cta-bg.jpg",
}: {
  title: string;
  text: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
  image?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-ink px-4 py-28 text-white sm:px-6 md:py-40 lg:px-8">
      <div aria-hidden className="absolute inset-0 -z-10">
        <Image
          src={image}
          alt=""
          fill
          sizes="100vw"
          className="push-in-slow object-cover"
        />
        <span className="absolute inset-0 bg-ink/75" />
        <span className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_100%,rgba(201,162,75,0.22),transparent_70%)]" />
      </div>
      <Reveal className="mx-auto max-w-3xl text-center">
        <span
          aria-hidden
          className="mx-auto mb-8 block h-14 w-px bg-linear-to-b from-transparent to-gold-refined"
        />
        <h2 className="font-display text-[2.4rem] font-normal leading-[1.08] tracking-tight md:text-[3.75rem]">
          {title}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-[1.8] text-text-muted-light">
          {text}
        </p>
        <div className="mt-11 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href={primary.href}
            className="btn-sheen group inline-flex items-center justify-center gap-3 rounded-[2px] bg-gold-refined px-9 py-4 text-[13px] font-bold uppercase tracking-[0.16em] text-ink transition-colors duration-500 ease-soft hover:bg-gold-soft"
          >
            {primary.label}
            <ArrowRight
              aria-hidden
              className="h-4 w-4 transition-transform duration-500 ease-soft group-hover:translate-x-1"
            />
          </Link>
          {secondary && (
            <Link
              href={secondary.href}
              className="inline-flex items-center justify-center rounded-[2px] border border-white/60 px-9 py-4 text-[13px] font-bold uppercase tracking-[0.16em] text-white transition-colors duration-500 ease-soft hover:border-white hover:bg-white hover:text-ink"
            >
              {secondary.label}
            </Link>
          )}
        </div>
      </Reveal>
    </section>
  );
}
