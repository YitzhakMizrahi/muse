"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { saveDraftSession } from "@/lib/draft-session";
import {
  actionOptions,
  audienceOptions,
  feelOptions,
  inferAudienceFromPrompt,
  inferPageActionFromPrompt,
  museSessionDefaults,
  museSessionSchema,
  normalizeMuseSession,
  recommendFeelQualities,
  type MuseSessionValues,
} from "@/lib/session";
import { cn } from "@/lib/utils";

type FieldErrors = Partial<Record<keyof MuseSessionValues, string>>;

function validateForm(values: MuseSessionValues): FieldErrors {
  const parsed = museSessionSchema.safeParse(values);

  if (parsed.success) {
    return {};
  }

  const issues = parsed.error.flatten().fieldErrors;

  return {
    rawPrompt: issues.rawPrompt?.[0],
    primaryAudience: issues.primaryAudience?.[0],
    feelQualities: issues.feelQualities?.[0],
    primaryPageAction: issues.primaryPageAction?.[0],
    references: issues.references?.[0],
    constraints: issues.constraints?.[0],
    antiPreferences: issues.antiPreferences?.[0],
  };
}

export function SessionForm() {
  const router = useRouter();
  const [values, setValues] = useState<MuseSessionValues>(museSessionDefaults);
  const [submitted, setSubmitted] = useState(false);

  const errors = useMemo(() => validateForm(values), [values]);
  const hasErrors = Object.values(errors).some(Boolean);
  const inferredAudience = useMemo(
    () => inferAudienceFromPrompt(values.rawPrompt),
    [values.rawPrompt],
  );
  const inferredAction = useMemo(
    () => inferPageActionFromPrompt(values.rawPrompt),
    [values.rawPrompt],
  );
  const recommendedFeels = useMemo(
    () => recommendFeelQualities(values.rawPrompt),
    [values.rawPrompt],
  );

  const promptReady = values.rawPrompt.trim().length >= 24;
  const audienceReady = values.primaryAudience.trim().length > 0;
  const feelsReady = values.feelQualities.length > 0;

  const normalized = useMemo(() => {
    const parsed = museSessionSchema.safeParse(values);
    if (!parsed.success) {
      return null;
    }
    return normalizeMuseSession(parsed.data);
  }, [values]);

  function toggleFeel(feel: string) {
    setValues((current) => {
      const exists = current.feelQualities.includes(feel);

      if (exists) {
        return {
          ...current,
          feelQualities: current.feelQualities.filter((entry) => entry !== feel),
        };
      }

      if (current.feelQualities.length >= 3) {
        return current;
      }

      return {
        ...current,
        feelQualities: [...current.feelQualities, feel],
      };
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);

    if (hasErrors) {
      return;
    }

    saveDraftSession(values);
    router.push("/create/result");
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
      <section className="rounded-[2rem] border border-paper/10 bg-ink px-5 py-6 text-paper shadow-halo md:px-7 md:py-8">
        <div className="flex items-start justify-between gap-4 border-b border-paper/10 pb-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-paper/45">
              Step 01
            </p>
            <h1 className="mt-3 font-display text-4xl leading-[0.94] tracking-[-0.04em] md:text-5xl">
              Start with the rough idea.
            </h1>
          </div>

          <Link
            href="/"
            className="rounded-full border border-paper/15 px-4 py-2 text-xs uppercase tracking-[0.22em] text-paper/65 transition hover:border-paper/35 hover:text-paper"
          >
            Back
          </Link>
        </div>

        <p className="mt-5 max-w-2xl text-sm leading-6 text-paper/70 md:text-base">
          Muse starts from your rough language, then sharpens it with a few guided
          decisions. The point is not to fill a form. The point is to give the system
          enough signal to recommend a direction worth building on.
        </p>

        <form className="mt-8 grid gap-6" onSubmit={handleSubmit} noValidate>
          <Field
            label="The rough idea"
            hint="Describe what you are building in plain language. Include who it is for or what should feel different if you know."
            error={submitted ? errors.rawPrompt : undefined}
          >
            <textarea
              value={values.rawPrompt}
              onChange={(event) =>
                setValues((current) => ({ ...current, rawPrompt: event.target.value }))
              }
              rows={7}
              className={inputClassName(submitted ? errors.rawPrompt : undefined)}
              placeholder="I am building a product for..."
            />
          </Field>

          {promptReady ? (
            <QuestionCard
              eyebrow="Question 1"
              title="Who is this mainly for?"
              note={`Muse pulled a likely answer from your prompt: ${inferredAudience}`}
              error={submitted ? errors.primaryAudience : undefined}
            >
              <ChipRow>
                {audienceOptions.map((option) => (
                  <SelectableChip
                    key={option}
                    active={values.primaryAudience === option}
                    onClick={() =>
                      setValues((current) => ({
                        ...current,
                        primaryAudience: option,
                      }))
                    }
                    label={option}
                  />
                ))}
              </ChipRow>
              <input
                value={values.primaryAudience}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    primaryAudience: event.target.value,
                  }))
                }
                className={inputClassName(submitted ? errors.primaryAudience : undefined)}
                placeholder={inferredAudience}
              />
            </QuestionCard>
          ) : null}

          {promptReady && audienceReady ? (
            <QuestionCard
              eyebrow="Question 2"
              title="How should it feel when someone lands on it?"
              note={`Recommended from your prompt: ${recommendedFeels.join(", ")}`}
              error={submitted ? errors.feelQualities : undefined}
            >
              <ChipRow>
                {feelOptions.map((feel) => (
                  <SelectableChip
                    key={feel}
                    active={values.feelQualities.includes(feel)}
                    onClick={() => toggleFeel(feel)}
                    label={feel}
                  />
                ))}
              </ChipRow>
            </QuestionCard>
          ) : null}

          {promptReady && audienceReady && feelsReady ? (
            <QuestionCard
              eyebrow="Question 3"
              title="What should the page get people to do first?"
              note={`Muse would default to: ${inferredAction}`}
              error={submitted ? errors.primaryPageAction : undefined}
            >
              <ChipRow>
                {actionOptions.map((option) => (
                  <SelectableChip
                    key={option}
                    active={values.primaryPageAction === option}
                    onClick={() =>
                      setValues((current) => ({
                        ...current,
                        primaryPageAction: option,
                      }))
                    }
                    label={option}
                  />
                ))}
              </ChipRow>
              <input
                value={values.primaryPageAction}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    primaryPageAction: event.target.value,
                  }))
                }
                className={inputClassName(submitted ? errors.primaryPageAction : undefined)}
                placeholder={inferredAction}
              />
            </QuestionCard>
          ) : null}

          {promptReady && audienceReady && feelsReady ? (
            <div className="grid gap-6 md:grid-cols-3">
              <Field
                label="References"
                hint="Optional scenes, products, or brands."
                error={submitted ? errors.references : undefined}
              >
                <textarea
                  value={values.references}
                  onChange={(event) =>
                    setValues((current) => ({
                      ...current,
                      references: event.target.value,
                    }))
                  }
                  rows={4}
                  className={inputClassName(submitted ? errors.references : undefined)}
                  placeholder="Optional"
                />
              </Field>
              <Field
                label="Constraints"
                hint="Optional technical or business limits."
                error={submitted ? errors.constraints : undefined}
              >
                <textarea
                  value={values.constraints}
                  onChange={(event) =>
                    setValues((current) => ({
                      ...current,
                      constraints: event.target.value,
                    }))
                  }
                  rows={4}
                  className={inputClassName(submitted ? errors.constraints : undefined)}
                  placeholder="Optional"
                />
              </Field>
              <Field
                label="What to avoid"
                hint="Optional anti-patterns or wrong directions."
                error={submitted ? errors.antiPreferences : undefined}
              >
                <textarea
                  value={values.antiPreferences}
                  onChange={(event) =>
                    setValues((current) => ({
                      ...current,
                      antiPreferences: event.target.value,
                    }))
                  }
                  rows={4}
                  className={inputClassName(submitted ? errors.antiPreferences : undefined)}
                  placeholder="Optional"
                />
              </Field>
            </div>
          ) : null}

          <div className="flex flex-col gap-3 border-t border-paper/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-paper/42">
                Next
              </p>
              <p className="mt-2 text-sm text-paper/65">
                Generate one recommended direction and two alternates.
              </p>
            </div>

            <button
              type="submit"
              className="rounded-full bg-paper px-6 py-3 text-sm font-medium text-ink transition hover:bg-white"
            >
              Generate Recommendation
            </button>
          </div>
        </form>
      </section>

      <motion.aside
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="rounded-[2rem] border border-ink/10 bg-[#eee3d4] px-5 py-6 md:px-7 md:py-8"
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/42">
          Normalized Session
        </p>

        <div className="mt-6 rounded-[1.75rem] border border-ink/10 bg-paper/80 p-5">
          <p className="font-display text-3xl leading-none tracking-[-0.04em] text-ink">
            {normalized?.productSummary ?? "Muse will summarize the idea here."}
          </p>
          <div className="mt-6 grid gap-4">
            <PreviewBlock
              label="Primary audience"
              value={normalized?.primaryAudience ?? "Waiting for a clear audience."}
            />
            <PreviewBlock
              label="Feel qualities"
              value={normalized?.feelQualities.join(", ") ?? "Waiting for feel selections."}
            />
            <PreviewBlock
              label="Primary page action"
              value={
                normalized?.primaryPageAction ?? "Waiting for the page action decision."
              }
            />
          </div>
        </div>

        <div className="mt-5 rounded-[1.75rem] border border-ink/10 bg-ink px-5 py-5 text-paper">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-paper/42">
            Output contract
          </p>
          <ul className="mt-4 grid gap-3 text-sm leading-6 text-paper/70">
            <li>1 recommended direction with a structured brief</li>
            <li>2 alternate directions with clear tradeoffs</li>
            <li>Minimal loading and failure states in Milestone 1</li>
          </ul>
        </div>
      </motion.aside>
    </div>
  );
}

function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-3">
      <div className="flex items-end justify-between gap-4">
        <div>
          <span className="block font-mono text-[10px] uppercase tracking-[0.28em] text-paper/50">
            {label}
          </span>
          <span className="mt-2 block text-sm leading-6 text-paper/60">{hint}</span>
        </div>
        {error ? <span className="text-xs text-ember">{error}</span> : null}
      </div>
      {children}
    </label>
  );
}

function QuestionCard({
  eyebrow,
  title,
  note,
  error,
  children,
}: {
  eyebrow: string;
  title: string;
  note: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="grid gap-4 rounded-[1.75rem] border border-paper/10 bg-paper/[0.04] p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-paper/45">
            {eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl leading-none tracking-[-0.04em]">
            {title}
          </h2>
          <p className="mt-3 text-sm leading-6 text-paper/62">{note}</p>
        </div>
        {error ? <span className="text-xs text-ember">{error}</span> : null}
      </div>
      {children}
    </section>
  );
}

function ChipRow({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap gap-2">{children}</div>;
}

function SelectableChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-2 text-xs uppercase tracking-[0.18em] transition",
        active
          ? "border-ember bg-ember text-ink"
          : "border-paper/12 text-paper/72 hover:border-paper/30 hover:bg-paper/6 hover:text-paper",
      )}
    >
      {label}
    </button>
  );
}

function PreviewBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.25rem] border border-ink/10 bg-[#f5ecdf] p-4">
      <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink/45">{label}</p>
      <p className="mt-3 text-sm leading-6 text-ink/70">{value}</p>
    </div>
  );
}

function inputClassName(error?: string) {
  return cn(
    "w-full rounded-[1.4rem] border bg-transparent px-4 py-3 text-sm leading-6 text-paper outline-none transition placeholder:text-paper/32",
    error
      ? "border-ember/60 focus:border-ember"
      : "border-paper/12 focus:border-paper/35",
  );
}
