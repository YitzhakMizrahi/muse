"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { saveDraftSession } from "@/lib/draft-session";
import {
  moodOptions,
  sessionFormDefaults,
  sessionFormSchema,
  type SessionFormValues,
} from "@/lib/session";
import { cn } from "@/lib/utils";

type FieldErrors = Partial<Record<keyof SessionFormValues, string>>;

function validateForm(values: SessionFormValues): FieldErrors {
  const parsed = sessionFormSchema.safeParse(values);

  if (parsed.success) {
    return {};
  }

  const issues = parsed.error.flatten().fieldErrors;

  return {
    title: issues.title?.[0],
    concept: issues.concept?.[0],
    audience: issues.audience?.[0],
    moodWords: issues.moodWords?.[0],
    references: issues.references?.[0],
  };
}

export function SessionForm() {
  const router = useRouter();
  const [values, setValues] = useState<SessionFormValues>(sessionFormDefaults);
  const [submitted, setSubmitted] = useState(false);

  const errors = useMemo(() => validateForm(values), [values]);
  const hasErrors = Object.values(errors).some(Boolean);

  function toggleMoodWord(word: (typeof moodOptions)[number]) {
    setValues((current) => {
      const exists = current.moodWords.includes(word);

      if (exists) {
        return {
          ...current,
          moodWords: current.moodWords.filter((entry) => entry !== word),
        };
      }

      if (current.moodWords.length >= 4) {
        return current;
      }

      return {
        ...current,
        moodWords: [...current.moodWords, word],
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
    router.push("/create/territories");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <section className="rounded-[2rem] border border-paper/10 bg-ink px-5 py-6 text-paper shadow-halo md:px-7 md:py-8">
        <div className="flex items-start justify-between gap-4 border-b border-paper/10 pb-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-paper/45">
              Step 01
            </p>
            <h1 className="mt-3 font-display text-4xl leading-[0.94] tracking-[-0.04em] md:text-5xl">
              Enter the spark.
            </h1>
          </div>

          <Link
            href="/"
            className="rounded-full border border-paper/15 px-4 py-2 text-xs uppercase tracking-[0.22em] text-paper/65 transition hover:border-paper/35 hover:text-paper"
          >
            Back
          </Link>
        </div>

        <p className="mt-5 max-w-xl text-sm leading-6 text-paper/70 md:text-base">
          Start with enough signal to shape a direction. The goal is not perfect
          documentation. The goal is a sharp beginning.
        </p>

        <form className="mt-8 grid gap-6" onSubmit={handleSubmit} noValidate>
          <Field
            label="Project title"
            hint="Name the thing as it wants to exist."
            error={submitted ? errors.title : undefined}
          >
            <input
              value={values.title}
              onChange={(event) =>
                setValues((current) => ({ ...current, title: event.target.value }))
              }
              className={inputClassName(submitted ? errors.title : undefined)}
              placeholder="A ritual platform for focused work"
            />
          </Field>

          <Field
            label="Concept"
            hint="What are you making, and what should it feel like in the world?"
            error={submitted ? errors.concept : undefined}
          >
            <textarea
              value={values.concept}
              onChange={(event) =>
                setValues((current) => ({ ...current, concept: event.target.value }))
              }
              rows={6}
              className={inputClassName(submitted ? errors.concept : undefined)}
              placeholder="Describe the idea in plain language."
            />
          </Field>

          <div className="grid gap-6 md:grid-cols-2">
            <Field
              label="Audience"
              hint="Who should feel seen by this?"
              error={submitted ? errors.audience : undefined}
            >
              <input
                value={values.audience}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    audience: event.target.value,
                  }))
                }
                className={inputClassName(submitted ? errors.audience : undefined)}
                placeholder="Design-led teams building a new category"
              />
            </Field>

            <Field
              label="References"
              hint="List influences, scenes, brands, materials, or moods."
              error={submitted ? errors.references : undefined}
            >
              <input
                value={values.references}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    references: event.target.value,
                  }))
                }
                className={inputClassName(submitted ? errors.references : undefined)}
                placeholder="Magazines, galleries, launch campaigns, textures"
              />
            </Field>
          </div>

          <Field
            label="Mood words"
            hint="Choose up to four. These will steer the first set of territories."
            error={submitted ? errors.moodWords : undefined}
          >
            <div className="flex flex-wrap gap-2">
              {moodOptions.map((word) => {
                const active = values.moodWords.includes(word);

                return (
                  <button
                    key={word}
                    type="button"
                    onClick={() => toggleMoodWord(word)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-xs uppercase tracking-[0.22em] transition",
                      active
                        ? "border-ember bg-ember text-ink"
                        : "border-paper/12 text-paper/72 hover:border-paper/30 hover:bg-paper/6 hover:text-paper",
                    )}
                  >
                    {word}
                  </button>
                );
              })}
            </div>
          </Field>

          <div className="flex flex-col gap-3 border-t border-paper/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-paper/42">
                Next
              </p>
              <p className="mt-2 text-sm text-paper/65">
                Generate three creative territories from this spark.
              </p>
            </div>

            <button
              type="submit"
              className="rounded-full bg-paper px-6 py-3 text-sm font-medium text-ink transition hover:bg-white"
            >
              Build Territories
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
          Session Preview
        </p>

        <div className="mt-6 rounded-[1.75rem] border border-ink/10 bg-paper/80 p-5">
          <p className="font-display text-3xl leading-none tracking-[-0.04em] text-ink">
            {values.title || "Untitled direction"}
          </p>
          <p className="mt-4 text-sm leading-6 text-ink/70">
            {values.concept || "A rough spark waiting for shape."}
          </p>

          <div className="mt-6 grid gap-3">
            <PreviewBlock label="Audience" value={values.audience} />
            <PreviewBlock label="References" value={values.references} />
            <div className="rounded-[1.25rem] border border-ink/10 bg-[#f5ecdf] p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink/45">
                Mood words
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {values.moodWords.length > 0 ? (
                  values.moodWords.map((word) => (
                    <span
                      key={word}
                      className="rounded-full border border-ink/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/62"
                    >
                      {word}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-ink/50">No mood selected yet.</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-[1.75rem] border border-ink/10 bg-ink px-5 py-5 text-paper">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-paper/42">
            Output contract
          </p>
          <ul className="mt-4 grid gap-3 text-sm leading-6 text-paper/70">
            <li>3 distinct creative territories</li>
            <li>Visual signals, tone, motion, and typography guidance</li>
            <li>A clear primary thesis to refine next</li>
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

function PreviewBlock({ label, value }: { label: string; value?: string }) {
  return (
    <div className="rounded-[1.25rem] border border-ink/10 bg-[#f5ecdf] p-4">
      <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink/45">{label}</p>
      <p className="mt-3 text-sm leading-6 text-ink/70">
        {value && value.trim().length > 0 ? value : "Still open. Muse will infer carefully."}
      </p>
    </div>
  );
}

function inputClassName(error?: string) {
  return cn(
    "w-full rounded-[1.35rem] border bg-paper/[0.04] px-4 py-3 text-sm leading-6 text-paper outline-none transition placeholder:text-paper/30",
    error
      ? "border-ember/70 focus:border-ember"
      : "border-paper/12 focus:border-paper/35",
  );
}
