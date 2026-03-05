import { Hero } from "@/components/home/hero";
import { ProcessStrip } from "@/components/home/process-strip";
import { TerritoryGrid } from "@/components/home/territory-grid";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-4 md:px-6 md:py-6">
        <Hero />

        <section className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[1.75rem] border border-ink/10 bg-[#efe4d6] p-6 md:p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink/42">
              First Release
            </p>
            <h2 className="mt-5 max-w-sm font-display text-4xl leading-[0.96] tracking-[-0.04em] text-ink">
              A clear path from vague idea to usable direction.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-6 text-ink/72">
              Muse starts narrow on purpose. The first version is not trying to automate
              everything. It is trying to make creative momentum tangible.
            </p>
          </div>

          <TerritoryGrid />
        </section>

        <ProcessStrip />
      </div>
    </main>
  );
}
