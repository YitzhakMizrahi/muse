import { productSteps } from "@/lib/site";

export function ProcessStrip() {
  return (
    <section className="rounded-[2rem] border border-ink/10 bg-[#ebe0d0] p-6 md:p-8">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink/42">How Muse works</p>
          <h2 className="mt-3 max-w-xl font-display text-4xl leading-[0.96] tracking-[-0.04em] text-ink">
            One clear loop from rough idea to usable direction.
          </h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-ink/72">
          The first release stays narrow on purpose. It helps you decide how the product
          should feel before you hand it to a designer or a builder.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {productSteps.map((step, index) => (
          <div
            key={step.index}
            className={index === 0 ? "pl-0" : "border-l border-ink/10 pl-4"}
          >
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
