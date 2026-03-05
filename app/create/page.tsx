import { SessionForm } from "@/components/create/session-form";

export default function CreatePage() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-4 md:px-6 md:py-6">
        <section className="rounded-[2rem] border border-ink/10 bg-[#ede2d2] px-5 py-5 md:px-7">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink/40">
            Muse Session
          </p>
          <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="font-display text-4xl leading-[0.94] tracking-[-0.04em] text-ink md:text-5xl">
                Give Muse a real starting point.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-ink/70 md:text-base">
                Milestone 1 is about proving the core loop: rough idea in, one
                recommended direction out, plus two alternates worth comparing.
              </p>
            </div>
            <p className="max-w-sm font-mono text-[10px] uppercase tracking-[0.24em] text-ink/38">
              Input guided. Output structured. Taste stays human.
            </p>
          </div>
        </section>

        <SessionForm />
      </div>
    </main>
  );
}
