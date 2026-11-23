"use client";

import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";

/** Search + category filter for the public news page (URL-driven). */
export function NewsToolbar({ categories }: { categories: readonly string[] }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const current = searchParams.get("category") || "";

  const push = (mutate: (p: URLSearchParams) => void) => {
    const params = new URLSearchParams(searchParams.toString());
    mutate(params);
    params.delete("page");
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const onSearch = (term: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      push((p) => (term ? p.set("search", term) : p.delete("search")));
    }, 300);
  };

  const chip = (label: string, value: string) => {
    const on = current === value;
    return (
      <button
        key={label}
        type="button"
        aria-pressed={on}
        onClick={() =>
          push((p) => (value ? p.set("category", value) : p.delete("category")))
        }
        className={`shrink-0 whitespace-nowrap border px-4 py-2.5 text-[13px] font-semibold transition-colors duration-500 ${
          on
            ? "border-ink bg-ink text-white"
            : "border-ink/15 text-ink/75 hover:border-ink hover:text-ink"
        }`}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] lg:mx-0 lg:flex-wrap lg:px-0">
        {chip("All", "")}
        {categories.map((c) => chip(c, c))}
      </div>
      <label className="group relative block w-full lg:max-w-xs">
        <span className="sr-only">Search articles</span>
        <Search
          aria-hidden
          className="absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40 transition-colors group-focus-within:text-gold-refined"
        />
        <input
          type="search"
          placeholder="Search articles..."
          defaultValue={searchParams.get("search") || ""}
          onChange={(e) => onSearch(e.target.value)}
          className="block w-full border-0 border-b border-ink/15 bg-transparent py-3 pl-7 text-[15px] text-ink placeholder:text-ink/35 focus:border-gold-refined focus:outline-none focus:ring-0"
        />
      </label>
    </div>
  );
}
