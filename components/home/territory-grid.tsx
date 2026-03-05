import { territoryCards } from "@/lib/site";

export function TerritoryGrid() {
  return (
    <section className="grid gap-4 lg:grid-cols-3">
      {territoryCards.map((territory, index) => (
        <article
          key={territory.name}
          className="group rounded-[1.75rem] border border-ink/10 bg-paper/60 p-6 transition hover:-translate-y-1 hover:border-ink/20 hover:bg-paper/80"
        >
          <div className="flex items-center justify-between">
            <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-ink/45">
              Territory {index + 1}
            </p>
            <div className="h-2 w-2 rounded-full bg-ember/70 transition group-hover:bg-olive" />
          </div>

          <h2 className="mt-6 font-display text-3xl leading-none tracking-[-0.03em] text-ink">
            {territory.name}
          </h2>
          <p className="mt-4 text-sm leading-6 text-ink/72">{territory.summary}</p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {territory.signals.map((signal) => (
              <li
                key={signal}
                className="rounded-full border border-ink/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55"
              >
                {signal}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </section>
  );
}
