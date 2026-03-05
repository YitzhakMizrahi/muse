"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import { readDraftSession } from "@/lib/draft-session";
import type { ApiError, ApiSuccess } from "@/lib/api";
import { type SessionFormValues } from "@/lib/session";
import { type TerritoryResult } from "@/lib/territories";

type TerritoryState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; draft: SessionFormValues; result: TerritoryResult };

export function TerritoryResults() {
  const [state, setState] = useState<TerritoryState>({ status: "loading" });

  useEffect(() => {
    const draftPayload = readDraftSession();

    if (!draftPayload) {
      setState({
        status: "error",
        message: "The saved draft is invalid. Start a fresh session.",
      });
      return;
    }

    const draft = draftPayload.session;

    void fetch("/api/territories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(draft),
    })
      .then(async (response) => {
        const payload = (await response.json()) as
          | ApiSuccess<TerritoryResult>
          | ApiError;

        if (!response.ok || !payload.ok) {
          throw new Error(
            payload.ok ? "Unable to generate territories." : payload.error.message,
          );
        }

        setState({ status: "ready", draft, result: payload.result });
      })
      .catch((error: unknown) => {
        setState({
          status: "error",
          message:
            error instanceof Error
              ? error.message
              : "Unable to generate territories.",
        });
      });
  }, []);

  const recommended = useMemo(() => {
    if (state.status !== "ready") {
      return null;
    }

    return state.result.territories.find(
      (territory) => territory.name === state.result.recommendedDirection,
    );
  }, [state]);

  if (state.status === "loading") {
    return (
      <div className="grid gap-6">
        <ShellHeader />
        <section className="grid gap-4 lg:grid-cols-3">
          {[0, 1, 2].map((item) => (
            <div
              key={item}
              className="min-h-[320px] animate-pulse rounded-[1.75rem] border border-ink/10 bg-[#efe3d3]"
            />
          ))}
        </section>
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="grid gap-6">
        <ShellHeader />
        <section className="rounded-[2rem] border border-ink/10 bg-[#efe3d3] p-8">
          <p className="font-display text-3xl tracking-[-0.03em] text-ink">Generation blocked.</p>
          <p className="mt-4 max-w-xl text-sm leading-6 text-ink/70">{state.message}</p>
          <Link
            href="/create"
            className="mt-6 inline-flex rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper transition hover:bg-ink/90"
          >
            Return to Session
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <ShellHeader />

      <section className="grid gap-4 lg:grid-cols-[0.88fr_1.12fr]">
        <div className="rounded-[2rem] border border-paper/10 bg-ink p-6 text-paper shadow-halo md:p-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-paper/45">
            Creative Thesis
          </p>
          <h1 className="mt-5 font-display text-4xl leading-[0.94] tracking-[-0.04em] md:text-5xl">
            {state.result.creativeThesis}
          </h1>

          <div className="mt-8 rounded-[1.5rem] border border-paper/10 bg-paper/[0.04] p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-paper/42">
              Recommended direction
            </p>
            <p className="mt-3 font-display text-3xl tracking-[-0.03em] text-paper">
              {state.result.recommendedDirection}
            </p>
            {recommended ? (
              <p className="mt-3 text-sm leading-6 text-paper/68">{recommended.thesis}</p>
            ) : null}
          </div>
        </div>

        <div className="rounded-[2rem] border border-ink/10 bg-[#ece0d1] p-6 md:p-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink/42">
            Session inputs
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <ResultMeta label="Title" value={state.draft.title} />
            <ResultMeta label="Audience" value={state.draft.audience} />
            <ResultMeta label="References" value={state.draft.references} />
            <ResultMeta
              label="Mood words"
              value={state.draft.moodWords.join(", ")}
            />
          </div>
          <div className="mt-4 rounded-[1.5rem] border border-ink/10 bg-paper/60 p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink/42">
              Concept
            </p>
            <p className="mt-3 text-sm leading-6 text-ink/72">{state.draft.concept}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        {state.result.territories.map((territory) => (
          <article
            key={territory.name}
            className="rounded-[1.75rem] border border-ink/10 bg-paper/70 p-6"
          >
            <div className="flex items-center justify-between gap-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-ink/45">
                Territory
              </p>
              {territory.name === state.result.recommendedDirection ? (
                <span className="rounded-full bg-ember px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink">
                  Recommended
                </span>
              ) : null}
            </div>

            <h2 className="mt-5 font-display text-4xl leading-none tracking-[-0.04em] text-ink">
              {territory.name}
            </h2>
            <p className="mt-4 text-sm leading-6 text-ink/72">{territory.thesis}</p>

            <dl className="mt-6 grid gap-4">
              <ResultSection label="Voice" value={territory.voice} />
              <ResultSection label="Typography" value={territory.typography} />
              <ResultSection label="Color Mood" value={territory.colorMood} />
              <ResultSection label="Motion Cue" value={territory.motionCue} />
            </dl>

            <div className="mt-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink/45">
                Visual signals
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {territory.visualSignals.map((signal) => (
                  <span
                    key={signal}
                    className="rounded-full border border-ink/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/60"
                  >
                    {signal}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="rounded-[2rem] border border-ink/10 bg-[#e6dac9] p-6 md:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink/42">
              Next move
            </p>
            <h3 className="mt-4 font-display text-4xl leading-none tracking-[-0.04em] text-ink">
              Refine the winning direction.
            </h3>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-ink/70">
              The next stage should let you push a territory toward bolder, calmer,
              more premium, or more experimental territory without losing the core idea.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {["bolder", "calmer", "more premium", "more editorial"].map((item) => (
              <button
                key={item}
                type="button"
                className="rounded-full border border-ink/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/58"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function ShellHeader() {
  return (
    <section className="rounded-[2rem] border border-ink/10 bg-[#ede2d2] px-5 py-5 md:px-7">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink/42">
            Step 02
          </p>
          <h1 className="mt-4 font-display text-4xl leading-[0.94] tracking-[-0.04em] text-ink md:text-5xl">
            Compare the territories.
          </h1>
        </div>
        <Link
          href="/create"
          className="rounded-full border border-ink/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-ink/60 transition hover:border-ink/20 hover:text-ink"
        >
          Edit inputs
        </Link>
      </div>
    </section>
  );
}

function ResultMeta({ label, value }: { label: string; value?: string }) {
  return (
    <div className="rounded-[1.5rem] border border-ink/10 bg-paper/60 p-5">
      <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink/42">{label}</p>
      <p className="mt-3 text-sm leading-6 text-ink/72">
        {value && value.trim().length > 0 ? value : "Unspecified"}
      </p>
    </div>
  );
}

function ResultSection({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink/45">{label}</dt>
      <dd className="mt-2 text-sm leading-6 text-ink/72">{value}</dd>
    </div>
  );
}
