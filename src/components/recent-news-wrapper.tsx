"use client";

import { useEffect, useState } from "react";
import { type ArticleSummary, NewsFrame, SignalsSection } from "./recent-news";

function SkeletonCard() {
  return (
    <div className="animate-pulse bg-white">
      <div className="aspect-[16/10] bg-ink/[0.06]" />
      <div className="space-y-3 p-8">
        <div className="h-3 w-24 bg-ink/[0.06]" />
        <div className="h-6 w-full bg-ink/[0.06]" />
        <div className="h-6 w-2/3 bg-ink/[0.06]" />
        <div className="h-3 w-full bg-ink/[0.05]" />
      </div>
    </div>
  );
}

export function RecentNewsWrapper() {
  const [articles, setArticles] = useState<ArticleSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/news/recent")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        setArticles(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching recent news:", error);
        setArticles([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <NewsFrame>
        <div className="grid gap-8 md:grid-cols-3 md:gap-6 lg:gap-8">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </NewsFrame>
    );
  }

  return <SignalsSection articles={articles} />;
}
