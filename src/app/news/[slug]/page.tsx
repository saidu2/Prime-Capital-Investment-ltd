import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/motion/reveal";
import { Navigation } from "@/components/navigation";
import { formatNewsDate } from "@/components/news/news-card";
import { getArticleBySlug } from "@/db/queries/articles";

/** Article lookup that treats an unreachable database as "not found". */
async function loadArticle(slug: string) {
  try {
    return await getArticleBySlug(slug);
  } catch (error) {
    console.error("Article page: could not load article", error);
    return null;
  }
}

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await loadArticle(slug);

  if (!article) {
    return { title: "Article Not Found" };
  }

  return {
    title: article.title,
    description: article.excerpt ?? undefined,
    alternates: { canonical: `https://primecapital.ng/news/${slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt ?? undefined,
      url: `https://primecapital.ng/news/${slug}`,
      type: "article",
      publishedTime: article.publishedAt
        ? new Date(article.publishedAt).toISOString()
        : undefined,
      authors: article.author?.name ? [article.author.name] : undefined,
      images: article.coverImageUrl
        ? [{ url: article.coverImageUrl, alt: article.title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt ?? undefined,
      images: article.coverImageUrl ? [article.coverImageUrl] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await loadArticle(slug);

  if (!article) {
    notFound();
  }

  const meta = [
    article.author?.name,
    article.publishedAt ? formatNewsDate(article.publishedAt) : null,
    article.readTime,
  ].filter(Boolean);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navigation />

      <article className="flex-1">
        {/* Header */}
        <header className="relative isolate overflow-hidden bg-ink px-4 pt-[calc(var(--header-h)+4.5rem)] pb-16 text-white sm:px-6 md:pb-24 lg:px-8">
          <span
            aria-hidden
            className="absolute inset-0 -z-10 bg-[radial-gradient(60%_70%_at_80%_0%,rgba(201,162,75,0.16),transparent_70%)]"
          />
          <div className="mx-auto max-w-4xl">
            <Link
              href="/news"
              className="group inline-flex items-center gap-3 text-[12.5px] font-bold uppercase tracking-[0.18em] text-white/70 transition-colors hover:text-white"
            >
              <ArrowLeft
                aria-hidden
                className="h-4 w-4 transition-transform duration-500 ease-soft group-hover:-translate-x-1"
              />
              Back to News
            </Link>
            <p className="mt-10 text-[12px] font-bold uppercase tracking-[0.24em] text-gold-soft">
              {article.category}
              {article.featured ? " · Featured" : ""}
            </p>
            <h1 className="mt-5 font-display text-[2.3rem] font-normal leading-[1.1] tracking-tight md:text-[3.6rem]">
              {article.title}
            </h1>
            {article.excerpt && (
              <p className="mt-7 max-w-3xl text-[18px] leading-[1.75] text-text-muted-light md:text-[20px]">
                {article.excerpt}
              </p>
            )}
            {meta.length > 0 && (
              <p className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/10 pt-6 text-[14px] text-white/60">
                {meta.map((m, i) => (
                  <span key={String(m)} className="flex items-center gap-4">
                    {i > 0 && (
                      <span
                        aria-hidden
                        className="h-1 w-1 rotate-45 bg-gold-refined"
                      />
                    )}
                    {m}
                  </span>
                ))}
              </p>
            )}
          </div>
        </header>

        {/* Cover */}
        {article.coverImageUrl && (
          <div className="bg-linear-to-b from-ink from-50% to-white to-50% px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl overflow-hidden shadow-[0_40px_80px_-40px_rgba(10,16,36,0.5)]">
              {/* biome-ignore lint/performance/noImgElement: External URLs not optimizable with next/image */}
              <img
                src={article.coverImageUrl}
                alt={article.title}
                className="h-auto w-full"
              />
            </div>
          </div>
        )}

        {/* Body */}
        <div className="px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <div
            className="article-body mx-auto max-w-3xl"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: admin-authored article HTML (unchanged)
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
          <Reveal className="mx-auto mt-16 flex max-w-3xl justify-between border-t border-ink/10 pt-8">
            <Link
              href="/news"
              className="group inline-flex items-center gap-3 text-[13px] font-bold uppercase tracking-[0.18em] text-ink"
            >
              All News &amp; Insights
              <ArrowRight
                aria-hidden
                className="h-4 w-4 transition-transform duration-500 ease-soft group-hover:translate-x-1"
              />
            </Link>
          </Reveal>
        </div>
      </article>

      <Footer />
    </div>
  );
}
