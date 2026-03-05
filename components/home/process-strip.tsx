import { productSteps } from "@/lib/site";

export function ProcessStrip() {
  return (
    <section className="rounded-[2rem] border border-ink/10 bg-[#ebe0d0] p-6 md:p-8">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {productSteps.map((step) => (
          <div key={step.index} className="border-l border-ink/10 pl-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink/42">{step.index}</p>
            <h3 className="mt-3 font-display text-2xl leading-none tracking-[-0.03em] text-ink">
              {step.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-ink/72">{step.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
