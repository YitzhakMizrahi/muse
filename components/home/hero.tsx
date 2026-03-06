"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { siteCopy } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-ink/10 bg-[#eadfce] px-4 py-4 shadow-halo md:px-8 md:py-8">
      <div className="absolute inset-0 bg-grain opacity-40" />

      <div className="relative grid gap-4 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
        <div className="flex flex-col justify-between rounded-[1.75rem] border border-ink/8 bg-paper/70 p-5 md:p-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-ink/42">
            {siteCopy.eyebrow}
          </p>

          <div className="mt-5 space-y-4 md:mt-8 md:space-y-5">
            <motion.h1
              initial={{ opacity: 0.95, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="max-w-3xl font-display text-[2.65rem] leading-[0.9] tracking-[-0.06em] text-ink md:text-7xl"
            >
              {siteCopy.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0.92, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: 0.04 }}
              className="max-w-xl text-sm leading-6 text-ink/76 md:text-lg md:leading-7"
            >
              {siteCopy.subtitle}
            </motion.p>
          </div>

          <div className="mt-5 grid gap-2 md:mt-8 md:grid-cols-3 md:gap-3">
            {[
              ["You bring", "A rough idea and a few signals."],
              ["Muse returns", "One recommendation plus two real alternates."],
              ["You keep", "A brief and handoff prompt worth building from."],
            ].map(([label, copy]) => (
              <div
                key={label}
                className="rounded-[1.1rem] border border-ink/10 bg-paper/80 px-3 py-3 md:rounded-[1.25rem] md:px-4 md:py-4"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/42">{label}</p>
                <p className="mt-2 text-sm leading-5 text-ink/78 md:leading-6">{copy}</p>
              </div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0.96, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.08 }}
            className="mt-5 flex flex-col gap-3 sm:flex-row md:mt-8"
          >
            <Link
              href="/create"
              className="rounded-full bg-ink px-6 py-3 text-center text-sm font-medium text-paper transition hover:bg-ink/90"
            >
              {siteCopy.ctaPrimary}
            </Link>
            <Link
              href="/create"
              className="rounded-full border border-ink/15 bg-paper/50 px-6 py-3 text-center text-sm font-medium text-ink/88 transition hover:border-ink/25 hover:bg-paper/80"
            >
              {siteCopy.ctaSecondary}
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0.96, y: 10, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.06 }}
          className="relative rounded-[1.75rem] border border-ink/10 bg-[#171210] p-4 text-paper md:p-5"
        >
          <div className="rounded-[1.35rem] border border-paper/10 bg-paper/[0.03] p-4 md:p-5">
            <div className="flex items-center justify-between border-b border-paper/10 pb-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-paper/45">
                  Recommended Direction
                </p>
                <p className="mt-2 font-display text-[1.7rem] leading-tight text-paper md:text-2xl">
                  Quiet Authority
                </p>
                <p className="mt-2 max-w-sm text-sm leading-5 text-paper/72 md:leading-6">
                  A calm, credible direction for products that need immediate trust without looking sterile.
                </p>
              </div>
              <div className="rounded-full border border-olive/30 bg-olive/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.24em] text-paper/82">
                Chosen
              </div>
            </div>

            <div className="grid gap-4 pt-4">
              {[
                ["Audience", "Founders and startup teams"],
                ["Feels like", "Premium and confident, sharp and modern"],
                ["Primary action", "Join the waitlist"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-paper/10 bg-paper/[0.04] px-4 py-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper/42">{label}</p>
                  <p className="mt-2 text-sm leading-6 text-paper/82">{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-[1.2rem] border border-paper/10 bg-[#efe4d6] p-4 text-ink">
              <div className="flex items-center justify-between gap-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink/45">Alternates</p>
                <p className="text-right font-mono text-[10px] uppercase tracking-[0.2em] text-ink/42">
                  2 more to compare
                </p>
              </div>
              <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
                {["Warm Precision", "Sharp Momentum"].map((name) => (
                  <div
                    key={name}
                    className="rounded-xl border border-ink/10 bg-paper/80 px-3 py-3 text-sm text-ink/84"
                  >
                    {name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
