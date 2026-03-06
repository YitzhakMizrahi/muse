import { SessionForm } from "@/components/create/session-form";

export default function CreatePage() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-4 md:px-6 md:py-6">
        <section className="overflow-hidden rounded-[2rem] border border-ink/10 bg-[#ede2d2]">
          <div className="grid gap-0 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="px-4 py-5 md:px-7 md:py-7">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink/40">
                Muse Session
              </p>
              <div className="mt-3 flex flex-col gap-3">
                <div>
                  <h1 className="max-w-3xl font-display text-[2.65rem] leading-[0.9] tracking-[-0.05em] text-ink md:text-6xl">
                    Give Muse a real starting point.
                  </h1>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-ink/70 md:mt-4 md:text-base">
                    Milestone 1 is about proving the core loop: rough idea in, one
                    recommended direction out, plus two alternates worth comparing.
                  </p>
                </div>
                <div className="mt-1 flex flex-wrap gap-2">
                  {["Prompt first", "Adaptive questions", "One recommendation"].map(
                    (item) => (
                      <span
                        key={item}
                        className="rounded-full border border-ink/10 bg-paper/45 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/60"
                      >
                        {item}
                      </span>
                    ),
                  )}
                </div>
              </div>
            </div>

            <div className="border-t border-ink/10 bg-[#e4d6c5] px-4 py-5 lg:border-l lg:border-t-0 md:px-7 md:py-7">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink/42">
                What happens here
              </p>
              <div className="mt-4 grid gap-3">
                <div>
                  <p className="font-display text-[1.8rem] leading-none tracking-[-0.03em] text-ink md:text-2xl">
                    1. Start rough
                  </p>
                  <p className="mt-2 text-sm leading-6 text-ink/68">
                    Begin with one rough idea instead of filling a full brief.
                  </p>
                </div>
                <div>
                  <p className="font-display text-[1.8rem] leading-none tracking-[-0.03em] text-ink md:text-2xl">
                    2. Let Muse sharpen it
                  </p>
                  <p className="mt-2 text-sm leading-6 text-ink/68">
                    Answer three short questions so the recommendation has a real point of view.
                  </p>
                </div>
                <div>
                  <p className="font-display text-[1.8rem] leading-none tracking-[-0.03em] text-ink md:text-2xl">
                    3. Compare the outcome
                  </p>
                  <p className="mt-2 text-sm leading-6 text-ink/68">
                    Review one recommended direction and two alternates worth reacting to.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="hidden rounded-[2rem] border border-ink/10 bg-paper/60 px-5 py-4 md:block md:px-7">
          <div className="grid gap-3 md:grid-cols-3">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink/40">
                Input guided
              </p>
              <p className="mt-2 text-sm leading-6 text-ink/68">
                The page should feel like guided thinking, not intake admin.
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink/40">
                Output structured
              </p>
              <p className="mt-2 text-sm leading-6 text-ink/68">
                The result should feel like a reusable direction system, not a chat response.
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink/40">
                Taste stays human
              </p>
              <p className="mt-2 text-sm leading-6 text-ink/68">
                Muse recommends; the user still decides what should move forward.
              </p>
            </div>
          </div>
        </section>

        <SessionForm />
      </div>
    </main>
  );
}
