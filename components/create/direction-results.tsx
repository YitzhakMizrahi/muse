"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import type { ApiError, ApiSuccess } from "@/lib/api";
import { readDraftSession } from "@/lib/draft-session";
import type { DirectionResult } from "@/lib/directions";
import type { MuseSessionValues } from "@/lib/session";

type DirectionState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; draft: MuseSessionValues; result: DirectionResult };

export function DirectionResults() {
  const [state, setState] = useState<DirectionState>({ status: "loading" });

  useEffect(() => {
    const draftPayload = readDraftSession();

    if (!draftPayload) {
      setState({
        status: "error",
        message: "The saved session draft is invalid. Start a fresh Muse session.",
      });
      return;
    }

    const draft = draftPayload.session;

    void fetch("/api/directions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(draft),
    })
      .then(async (response) => {
        const payload = (await response.json()) as ApiSuccess<DirectionResult> | ApiError;

        if (!response.ok || !payload.ok) {
          throw new Error(payload.ok ? "Unable to generate a direction." : payload.error.message);
        }

        setState({ status: "ready", draft, result: payload.result });
      })
      .catch((error: unknown) => {
        setState({
          status: "error",
          message:
            error instanceof Error
              ? error.message
              : "Unable to generate a Muse direction.",
        });
      });
  }, []);

  if (state.status === "loading") {
    return (
      <div className="grid gap-6">
        <ResultHeader />
        <section className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="min-h-[360px] animate-pulse rounded-[2rem] border border-ink/10 bg-[#efe3d3]" />
          <div className="min-h-[360px] animate-pulse rounded-[2rem] border border-ink/10 bg-[#efe3d3]" />
        </section>
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="grid gap-6">
        <ResultHeader />
        <section className="rounded-[2rem] border border-ink/10 bg-[#efe3d3] p-8">
          <p className="font-display text-3xl tracking-[-0.03em] text-ink">Generation blocked.</p>
          <p className="mt-4 max-w-xl text-sm leading-6 text-ink/70">{state.message}</p>
          <Link
            href="/create"
            className="mt-6 inline-flex rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper transition hover:bg-ink/90"
          >
            Return to Muse Session
          </Link>
        </section>
      </div>
    );
  }

  const { draft, result } = state;
  const recommended = result.recommendedDirection;

  return (
    <div className="grid gap-6">
      <ResultHeader />

      <section className="grid gap-4 xl:grid-cols-[1.08fr_0.92fr]">
        <article className="rounded-[2rem] border border-paper/10 bg-ink p-6 text-paper shadow-halo md:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-paper/45">
                Recommended Direction
              </p>
              <h2 className="mt-5 font-display text-4xl leading-[0.92] tracking-[-0.04em] md:text-5xl">
                {recommended.directionIdentity.name}
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {recommended.brief.feelLike.slice(0, 3).map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-paper/12 bg-paper/[0.05] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-paper/62"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <p className="mt-5 max-w-3xl text-base leading-7 text-paper/74">
            {recommended.directionIdentity.coreThesis}
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-[1.5rem] border border-paper/10 bg-paper/[0.04] p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-paper/42">
                Why this direction
              </p>
              <p className="mt-3 text-sm leading-6 text-paper/72">
                {result.recommendationRationale}
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-paper/10 bg-paper/[0.04] p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-paper/42">
                Resonates with
              </p>
              <p className="mt-3 text-sm leading-6 text-paper/72">
                {recommended.brief.whoItShouldResonateWith}
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <PanelCard title="Hero Panel" body={recommended.visualPanels.heroPanel} dark />
            <PanelCard
              title="Section Rhythm"
              body={recommended.visualPanels.sectionRhythmPanel}
              dark
            />
            <PanelCard
              title="Style System"
              body={recommended.visualPanels.styleSystemPanel}
              dark
            />
            <PanelCard
              title="Conversion Moment"
              body={recommended.visualPanels.conversionMomentPanel}
              dark
            />
          </div>
        </article>

        <aside className="grid gap-4 xl:sticky xl:top-6 xl:self-start">
          <section className="rounded-[2rem] border border-ink/10 bg-[#ece0d1] p-6 md:p-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink/42">
              Normalized Input
            </p>
            <dl className="mt-5 grid gap-4">
              <MetaRow label="Product Summary" value={result.normalizedInput.productSummary} />
              <MetaRow label="Audience" value={result.normalizedInput.primaryAudience} />
              <MetaRow label="Feel" value={result.normalizedInput.feelQualities.join(", ")} />
              <MetaRow
                label="Primary Action"
                value={result.normalizedInput.primaryPageAction}
              />
            </dl>
            {draft.references ? (
              <MetaRow className="mt-4" label="References" value={draft.references} />
            ) : null}
            {draft.antiPreferences ? (
              <MetaRow className="mt-4" label="Avoid" value={draft.antiPreferences} />
            ) : null}
          </section>

          <section className="rounded-[2rem] border border-ink/10 bg-paper/80 p-6 md:p-7">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink/42">
                  Direction Brief
                </p>
                <p className="mt-3 text-sm leading-6 text-ink/66">
                  The written artifact that explains and preserves the recommendation.
                </p>
              </div>
            </div>
            <div className="mt-5 grid gap-4">
              <BulletList label="Feels like" items={recommended.brief.feelLike} />
              <BulletList label="Should not feel like" items={recommended.brief.notFeelLike} />
              <TextBlock label="Brand Tone" body={recommended.brief.brandTone} />
              <BulletList label="Visual Principles" items={recommended.brief.visualPrinciples} />
              <TextBlock
                label="Typography Direction"
                body={recommended.brief.typographyDirection}
              />
              <TextBlock label="Color Logic" body={recommended.brief.colorLogic} />
              <TextBlock label="Layout Guidance" body={recommended.brief.layoutGuidance} />
              <TextBlock
                label="Landing Page Narrative"
                body={recommended.brief.landingPageNarrative}
              />
            </div>
          </section>
        </aside>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.08fr_0.92fr]">
        <article className="rounded-[2rem] border border-ink/10 bg-paper/80 p-6 md:p-7">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink/42">
                Section Outline
              </p>
              <h3 className="mt-4 font-display text-4xl leading-none tracking-[-0.04em] text-ink">
                The landing page story.
              </h3>
            </div>
            <p className="max-w-sm text-sm leading-6 text-ink/66">
              This is the application layer of the direction, not just the aesthetic layer.
            </p>
          </div>

          <div className="mt-5 grid gap-4">
            {recommended.brief.sectionOutline.map((item, index) => (
              <div
                key={item.section}
                className="grid gap-4 rounded-[1.5rem] border border-ink/10 bg-[#f4eadc] p-5 md:grid-cols-[auto_1fr]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 bg-paper/60 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/60">
                  {(index + 1).toString().padStart(2, "0")}
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink/42">
                    {item.section}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-ink/72">{item.purpose}</p>
                  <p className="mt-2 text-sm leading-6 text-ink/62">{item.contentRole}</p>
                  <p className="mt-2 text-sm leading-6 text-ink/56">
                    Should feel: {item.feel}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </article>

        <aside className="grid gap-4">
          <section className="rounded-[2rem] border border-ink/10 bg-[#e6dac9] p-6 md:p-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink/42">
              CTA Strategy
            </p>
            <p className="mt-3 text-sm leading-6 text-ink/66">
              How the recommendation should ask for action without breaking its tone.
            </p>
            <BulletList items={recommended.brief.ctaStrategy} />
          </section>

          <section className="rounded-[2rem] border border-ink/10 bg-[#eadccd] p-6 md:p-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink/42">
              Anti-Patterns
            </p>
            <p className="mt-3 text-sm leading-6 text-ink/66">
              The mistakes the build should avoid even if they look superficially appealing.
            </p>
            <BulletList items={recommended.brief.antiPatterns} />
          </section>
        </aside>
      </section>

      <section className="rounded-[2rem] border border-ink/10 bg-[#ede2d2] p-6 md:p-7">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink/42">
              Alternates
            </p>
            <h3 className="mt-4 font-display text-4xl leading-none tracking-[-0.04em] text-ink">
              Compare the two alternate directions.
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-ink/66">
              These are not backup versions of the same idea. They are meaningful alternate reads of the same product.
            </p>
          </div>
          <Link
            href="/create"
            className="rounded-full border border-ink/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-ink/60 transition hover:border-ink/20 hover:text-ink"
          >
            Edit inputs
          </Link>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {result.alternates.map((alternate) => (
            <article
              key={alternate.name}
              className="rounded-[1.75rem] border border-ink/10 bg-paper/80 p-5"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink/42">
                Alternate Direction
              </p>
              <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <h4 className="font-display text-3xl leading-none tracking-[-0.04em] text-ink">
                    {alternate.name}
                  </h4>
                  <p className="mt-4 text-sm leading-6 text-ink/72">
                    {alternate.oneLineThesis}
                  </p>
                </div>
              </div>
              <BulletList label="Feels like" items={alternate.feelLike} />
              <TextBlock label="Visual Character" body={alternate.visualCharacter} />
              <TextBlock label="Choose this if" body={alternate.chooseThisIf} />
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                <PanelCard title="Mini Hero" body={alternate.visualPreview.miniHeroPanel} />
                <PanelCard
                  title="Mini Style"
                  body={alternate.visualPreview.miniStyleFeelPanel}
                />
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function ResultHeader() {
  return (
    <section className="rounded-[2rem] border border-ink/10 bg-[#ede2d2] px-5 py-5 md:px-7">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink/42">
            Step 02
          </p>
          <h1 className="mt-4 font-display text-4xl leading-[0.94] tracking-[-0.04em] text-ink md:text-5xl">
            Review the recommendation.
          </h1>
        </div>
        <p className="max-w-sm text-sm leading-6 text-ink/68">
          Muse now gives you one recommended direction and two alternates worth comparing.
        </p>
      </div>
    </section>
  );
}

function MetaRow({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink/42">{label}</p>
      <p className="mt-2 text-sm leading-6 text-ink/72">{value}</p>
    </div>
  );
}

function TextBlock({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink/42">{label}</p>
      <p className="mt-3 text-sm leading-6 text-ink/72">{body}</p>
    </div>
  );
}

function BulletList({ label, items }: { label?: string; items: string[] }) {
  return (
    <div className={label ? "mt-5" : "mt-4"}>
      {label ? (
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink/42">{label}</p>
      ) : null}
      <ul className="mt-3 grid gap-2 text-sm leading-6 text-ink/72">
        {items.map((item) => (
          <li key={item} className="rounded-full border border-ink/10 px-3 py-2">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function PanelCard({
  title,
  body,
  dark = false,
}: {
  title: string;
  body: string;
  dark?: boolean;
}) {
  return (
    <div
      className={
        dark
          ? "rounded-[1.5rem] border border-paper/10 bg-paper/[0.04] p-4"
          : "rounded-[1.5rem] border border-ink/10 bg-[#f4eadc] p-4"
      }
    >
      <p
        className={
          dark
            ? "font-mono text-[10px] uppercase tracking-[0.24em] text-paper/42"
            : "font-mono text-[10px] uppercase tracking-[0.24em] text-ink/42"
        }
      >
        {title}
      </p>
      <p className={dark ? "mt-3 text-sm leading-6 text-paper/72" : "mt-3 text-sm leading-6 text-ink/72"}>
        {body}
      </p>
    </div>
  );
}
