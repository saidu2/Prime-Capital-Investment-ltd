"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

export interface ArticleSummary {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImageUrl: string | null;
  category: string;
  featured: boolean;
  readTime: string | null;
  publishedAt: Date | null;
  createdAt: Date;
  author: {
    id: string;
    name: string | null;
    image: string | null;
  } | null;
}

interface RecentNewsProps {
  articles: ArticleSummary[];
}

/* Used when an article has no cover image. */
const FALLBACK_COVERS = ["/hero-2.jpg", "/hero-1.jpg", "/hero-3.jpg"];

/** Shared frame for the news section (also used by the loading state). */
export function NewsFrame({ children }: { children: ReactNode }) {
  return (
    <section
      id="signals"
      className="bg-paper px-4 py-24 sm:px-6 md:py-32 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: EASE }}
          className="flex flex-col justify-between gap-8 md:flex-row md:items-end"
        >
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.28em] text-gold-refined">
              Recent News
            </p>
            <h2 className="mt-4 font-display text-[2.4rem] font-normal leading-[1.06] tracking-tight text-ink md:text-[3.75rem]">
              Latest <em className="font-normal text-gold-refined">Updates</em>
            </h2>
          </div>
          <Link
            href="/news"
            className="group inline-flex items-center gap-4 text-[13px] font-bold uppercase tracking-[0.18em] text-ink"
          >
            News &amp; Insights
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/20 transition-colors duration-500 group-hover:border-ink group-hover:bg-ink group-hover:text-white">
              <ArrowRight aria-hidden className="h-4 w-4" />
            </span>
          </Link>
        </motion.div>
        <div className="mt-14 md:mt-16">{children}</div>
      </div>
    </section>
  );
}

export function SignalsSection({ articles = [] }: RecentNewsProps) {
  const list = articles.slice(0, 3);
  return (
    <NewsFrame>
      {list.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-3 md:gap-6 lg:gap-8">
          {list.map((article, index) => (
            <NewsCard key={article.id} article={article} index={index} />
          ))}
        </div>
      ) : (
        <div className="border border-ink/10 bg-white px-8 py-16 text-center">
          <p className="font-display text-2xl text-ink">
            No recent news available
          </p>
        </div>
      )}
    </NewsFrame>
  );
}

function NewsCard({
  article,
  index,
}: {
  article: ArticleSummary;
  index: number;
}) {
  const date = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Draft";
  const cover =
    article.coverImageUrl || FALLBACK_COVERS[index % FALLBACK_COVERS.length];

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1, ease: EASE, delay: index * 0.12 }}
    >
      <Link
        href={`/news/${article.slug}`}
        className="group flex h-full flex-col bg-white transition-shadow duration-700 hover:shadow-[0_30px_60px_-30px_rgba(10,16,36,0.35)]"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-ink">
          {/* Cover images are arbitrary URLs from the CMS, so a plain img. */}
          {/* biome-ignore lint/performance/noImgElement: CMS-hosted covers */}
          <img
            src={cover}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1800ms] ease-soft group-hover:scale-[1.06]"
          />
          {article.category && (
            <span className="absolute left-5 top-5 bg-ink/85 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-gold-soft backdrop-blur-sm">
              {article.category}
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col p-7 md:p-8">
          <time className="text-[13px] text-text-muted-dark">
            {date}
            {article.readTime ? ` · ${article.readTime}` : ""}
          </time>
          <h3 className="mt-3 line-clamp-3 font-display text-[1.45rem] font-normal leading-snug text-ink transition-colors duration-500 group-hover:text-gold-refined">
            {article.title}
          </h3>
          <p className="mt-4 line-clamp-3 text-[15px] leading-[1.75] text-text-muted-dark">
            {article.excerpt}
          </p>
          <span className="mt-auto inline-flex items-center gap-3 pt-7 text-[12.5px] font-bold uppercase tracking-[0.16em] text-ink">
            Read More
            <span
              aria-hidden
              className="h-px w-8 bg-gold-refined transition-all duration-700 ease-soft group-hover:w-16"
            />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
