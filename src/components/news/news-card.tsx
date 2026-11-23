import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";

export type NewsItem = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  category: string;
  coverImageUrl: string | null;
  publishedAt: Date | string | null;
  readTime: string | null;
};

const FALLBACK_COVERS = ["/hero-2.jpg", "/hero-1.jpg", "/hero-3.jpg"];

export function formatNewsDate(d: Date | string | null) {
  return d
    ? new Date(d).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";
}

export function coverFor(item: NewsItem, index: number) {
  return item.coverImageUrl || FALLBACK_COVERS[index % FALLBACK_COVERS.length];
}

/** Standard news card (image, category, date, title, excerpt). */
export function NewsCard({ item, index }: { item: NewsItem; index: number }) {
  return (
    <Reveal delay={(index % 3) * 0.1}>
      <Link
        href={`/news/${item.slug}`}
        className="group flex h-full flex-col bg-white transition-shadow duration-700 hover:shadow-[0_30px_60px_-30px_rgba(10,16,36,0.35)]"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-ink">
          {/* biome-ignore lint/performance/noImgElement: CMS-hosted covers */}
          <img
            src={coverFor(item, index)}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1800ms] ease-soft group-hover:scale-[1.06]"
          />
          {item.category && (
            <span className="absolute left-5 top-5 bg-ink/85 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-gold-soft backdrop-blur-sm">
              {item.category}
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col p-7 md:p-8">
          <p className="text-[13px] text-text-muted-dark">
            {formatNewsDate(item.publishedAt)}
            {item.readTime ? ` · ${item.readTime}` : ""}
          </p>
          <h3 className="mt-3 line-clamp-3 font-display text-[1.4rem] font-normal leading-snug text-ink transition-colors duration-500 group-hover:text-gold-refined">
            {item.title}
          </h3>
          {item.excerpt && (
            <p className="mt-4 line-clamp-3 text-[15px] leading-[1.75] text-text-muted-dark">
              {item.excerpt}
            </p>
          )}
          <span className="mt-auto inline-flex items-center gap-3 pt-7 text-[12.5px] font-bold uppercase tracking-[0.16em] text-ink">
            Read More
            <span
              aria-hidden
              className="h-px w-8 bg-gold-refined transition-all duration-700 ease-soft group-hover:w-16"
            />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}
