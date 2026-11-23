import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation";

export default function NewsLoading() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navigation />

      {/* banner placeholder, same height as PageHero */}
      <div className="h-[58vh] max-h-[640px] min-h-[420px] animate-pulse bg-ink" />

      <section className="px-4 pt-24 pb-14 sm:px-6 md:pt-32 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-4">
          <div className="mx-auto h-7 w-full animate-pulse bg-ink/[0.06]" />
          <div className="mx-auto h-7 w-2/3 animate-pulse bg-ink/[0.06]" />
        </div>
      </section>

      <section className="bg-paper px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 h-10 w-64 animate-pulse bg-ink/[0.06]" />
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {["a", "b", "c", "d", "e", "f"].map((k) => (
              <div key={k} className="bg-white">
                <div className="aspect-[16/10] animate-pulse bg-ink/[0.06]" />
                <div className="space-y-3 p-8">
                  <div className="h-3 w-24 animate-pulse bg-ink/[0.06]" />
                  <div className="h-6 w-full animate-pulse bg-ink/[0.06]" />
                  <div className="h-6 w-2/3 animate-pulse bg-ink/[0.06]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
