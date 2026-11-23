import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/motion/reveal";
import { Navigation } from "@/components/navigation";
import {
  coverFor,
  formatNewsDate,
  NewsCard,
  type NewsItem,
} from "@/components/news/news-card";
import { NewsToolbar } from "@/components/news/news-toolbar";
import { PageHero } from "@/components/page-hero";
import {
  getFeaturedArticles,
  getPublishedArticles,
  getPublishedArticlesCount,
} from "@/db/queries/articles";
import { ArticleCategories } from "@/lib/types/articles";

export const metadata: Metadata = {
  title: "News & Insights",
  description:
    "Stay informed with the latest financial news, market insights, and investment commentary from Prime Capital & Investment Limited.",
  alternates: { canonical: "https://primecapital.ng/news" },
  openGraph: {
    title: "News & Insights – Prime Capital Nigeria",
    description:
      "Financial news, market updates, and investment insights from Prime Capital & Investment Limited.",
    url: "https://primecapital.ng/news",
  },
};

interface NewsPageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    page?: string;
  }>;
}

function pageHref(
  params: { search?: string; category?: string },
  page: number,
) {
  const qs = new URLSearchParams();
  if (params.search) qs.set("search", params.search);
  if (params.category) qs.set("category", params.category);
  if (page > 1) qs.set("page", String(page));
  const s = qs.toString();
  return s ? `/news?${s}` : "/news";
}

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const params = await searchParams;
  const search = params.search || "";
  const category = params.category || "";
  const page = Math.max(1, Number.parseInt(params.page || "1", 10) || 1);
  const limit = 9;
  const offset = (page - 1) * limit;

  // The page still renders (empty) if the database is unreachable.
  let featured: NewsItem[] = [];
  let articles: NewsItem[] = [];
  let totalCount = 0;
  try {
    [featured, articles, totalCount] = await Promise.all([
      getFeaturedArticles(2),
      getPublishedArticles({ search, category, limit, offset }),
      getPublishedArticlesCount({ search, category }),
    ]);
  } catch (error) {
    console.error("News page: could not load articles", error);
  }

  const totalPages = Math.ceil(totalCount / limit);
  const showFeatured =
    featured.length > 0 && !search && !category && page === 1;
  const [lead, second] = featured;

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navigation />
      <PageHero
        title="News & Insights"
        crumb="News"
        image="/hero-1.jpg"
        focus="50% 50%"
      />

      {/* Intro */}
      <section className="px-4 pt-24 pb-14 sm:px-6 md:pt-32 md:pb-16 lg:px-8">
        <Reveal className="mx-auto max-w-4xl text-center">
          <span
            aria-hidden
            className="mx-auto mb-9 block h-14 w-px bg-linear-to-b from-transparent to-gold-refined"
          />
          <p className="font-display text-[1.5rem] leading-[1.5] text-ink md:text-[2.1rem]">
            Stay informed with the latest company updates, market insights, and
            investment perspectives from Prime Capital.
          </p>
        </Reveal>
      </section>

      {/* Featured stories */}
      {showFeatured && lead && (
        <section className="px-4 pb-20 sm:px-6 md:pb-28 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <h2 className="text-[12px] font-bold uppercase tracking-[0.28em] text-gold-refined">
                Featured Stories
              </h2>
            </Reveal>
            <div className="mt-8 grid gap-6 lg:grid-cols-12">
              <Reveal className={second ? "lg:col-span-8" : "lg:col-span-12"}>
                <Link
                  href={`/news/${lead.slug}`}
                  className="group relative block aspect-[4/3] overflow-hidden bg-ink md:aspect-[16/9] lg:aspect-auto lg:h-full lg:min-h-[520px]"
                >
                  {/* biome-ignore lint/performance/noImgElement: CMS-hosted covers */}
                  <img
                    src={coverFor(lead, 0)}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[2000ms] ease-soft group-hover:scale-[1.05]"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-linear-to-t from-ink via-ink/50 to-transparent"
                  />
                  <span className="absolute inset-x-0 bottom-0 p-7 md:p-12">
                    <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-gold-soft">
                      {lead.category}
                      {lead.publishedAt
                        ? ` · ${formatNewsDate(lead.publishedAt)}`
                        : ""}
                    </span>
                    <span className="mt-4 block max-w-3xl font-display text-[1.8rem] leading-[1.15] text-white md:text-[2.8rem]">
                      {lead.title}
                    </span>
                    {lead.excerpt && (
                      <span className="mt-4 line-clamp-2 block max-w-2xl text-[16px] leading-[1.75] text-white/75">
                        {lead.excerpt}
                      </span>
                    )}
                  </span>
                </Link>
              </Reveal>
              {second && (
                <div className="lg:col-span-4">
                  <NewsCard item={second} index={1} />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* All articles */}
      <section className="bg-paper px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-12 flex flex-col gap-10">
            <h2 className="font-display text-[2.2rem] font-normal leading-tight tracking-tight text-ink md:text-[3rem]">
              {search ? (
                "Search Results"
              ) : (
                <>
                  Recent{" "}
                  <em className="font-normal text-gold-refined">Updates</em>
                </>
              )}
            </h2>
            <Suspense fallback={<div className="h-12" />}>
              <NewsToolbar categories={ArticleCategories} />
            </Suspense>
          </Reveal>

          {articles.length === 0 ? (
            <div className="border border-ink/10 bg-white px-8 py-20 text-center">
              <p className="font-display text-[1.75rem] text-ink">
                No articles found
              </p>
              <p className="mt-3 text-[15px] text-text-muted-dark">
                {search
                  ? "Try adjusting your search terms"
                  : "Check back soon for new articles"}
              </p>
            </div>
          ) : (
            <>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                {articles.map((a, i) => (
                  <NewsCard key={a.id} item={a} index={i} />
                ))}
              </div>
              {totalPages > 1 && (
                <nav
                  aria-label="Pagination"
                  className="mt-16 flex items-center justify-center gap-2"
                >
                  {page > 1 && (
                    <Link
                      href={pageHref({ search, category }, page - 1)}
                      aria-label="Previous page"
                      className="flex h-11 w-11 items-center justify-center border border-ink/15 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
                    >
                      <ArrowLeft aria-hidden className="h-4 w-4" />
                    </Link>
                  )}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (n) => (
                      <Link
                        key={n}
                        href={pageHref({ search, category }, n)}
                        aria-current={n === page ? "page" : undefined}
                        className={`flex h-11 min-w-11 items-center justify-center border px-3 font-display text-[15px] transition-colors ${
                          n === page
                            ? "border-ink bg-ink text-white"
                            : "border-ink/15 text-ink hover:border-ink"
                        }`}
                      >
                        {n}
                      </Link>
                    ),
                  )}
                  {page < totalPages && (
                    <Link
                      href={pageHref({ search, category }, page + 1)}
                      aria-label="Next page"
                      className="flex h-11 w-11 items-center justify-center border border-ink/15 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
                    >
                      <ArrowRight aria-hidden className="h-4 w-4" />
                    </Link>
                  )}
                </nav>
              )}
            </>
          )}
        </div>
      </section>

      {/* Newsletter (existing copy) */}
      <section className="relative isolate overflow-hidden bg-ink px-4 py-24 text-white sm:px-6 md:py-28 lg:px-8">
        <span
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_50%_0%,rgba(201,162,75,0.16),transparent_70%)]"
        />
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-[2.4rem] font-normal leading-tight md:text-[3.25rem]">
            Stay <em className="font-normal text-gold-soft">Informed</em>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-[1.8] text-text-muted-light">
            Subscribe to our newsletter to receive the latest market insights,
            investment perspectives, and company updates directly in your inbox.
          </p>
          {/* TODO(owner): the subscribe button has never been connected to a
              mailing list; it needs a provider before launch. */}
          <div className="mx-auto mt-10 flex max-w-lg flex-col gap-3 sm:flex-row">
            <label className="flex-1">
              <span className="sr-only">Email address</span>
              <input
                type="email"
                placeholder="Enter your email"
                className="block w-full border border-white/20 bg-white/5 px-5 py-4 text-[15px] text-white placeholder:text-white/40 focus:border-gold-refined focus:outline-none"
              />
            </label>
            <button
              type="button"
              className="btn-sheen rounded-[2px] bg-gold-refined px-8 py-4 text-[13px] font-bold uppercase tracking-[0.16em] text-ink transition-colors hover:bg-gold-soft"
            >
              Subscribe
            </button>
          </div>
          <p className="mt-6 text-[12.5px] text-white/45">
            By subscribing, you agree to receive marketing communications from
            Prime Capital. You can unsubscribe at any time.
          </p>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}
