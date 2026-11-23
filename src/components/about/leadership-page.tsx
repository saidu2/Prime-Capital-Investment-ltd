import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { PeopleGrid } from "@/components/about/people-grid";
import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation";
import { PageHero } from "@/components/page-hero";
import type { Person } from "@/data/leadership";

/** Shared layout for /about/board and /about/management. */
export function LeadershipPage({
  title,
  crumb,
  image,
  focus,
  intro,
  people,
  other,
  children,
}: {
  title: string;
  crumb: string;
  image: string;
  focus: string;
  intro: string;
  people: Person[];
  other: { href: string; label: string };
  /** Extra sections shown after the people grid (governance, structure…). */
  children?: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <Navigation />
      <PageHero title={title} crumb={crumb} image={image} focus={focus} />

      <section className="px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mx-auto mb-14 max-w-2xl text-center text-lg leading-relaxed text-text-muted-dark md:mb-20 md:text-xl">
            {intro}
          </p>

          <PeopleGrid people={people} />

          <div className="mt-20 flex flex-col items-center justify-center gap-6 border-t border-ink/10 pt-12 sm:flex-row sm:justify-between">
            <Link
              href="/about"
              className="group inline-flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.22em] text-ink/70 transition-colors hover:text-ink"
            >
              <span
                aria-hidden
                className="h-px w-10 bg-gold-refined transition-all duration-700 ease-soft group-hover:w-16"
              />
              About Prime Capital
            </Link>
            <Link
              href={other.href}
              className="btn-sheen group inline-flex items-center gap-3 rounded-[2px] bg-ink px-8 py-4 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-white transition-colors duration-500 ease-soft hover:bg-ink-2"
            >
              {other.label}
              <ArrowRight
                aria-hidden
                className="h-4 w-4 text-gold-refined transition-transform duration-500 ease-soft group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>

      {children}

      <Footer />
    </div>
  );
}
