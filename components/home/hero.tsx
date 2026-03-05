"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { siteCopy } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-paper/10 bg-ink/70 px-6 py-10 shadow-halo backdrop-blur md:px-10 md:py-14">
      <div className="absolute inset-0 bg-grain opacity-90" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-paper/40 to-transparent" />

      <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div className="space-y-8">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="font-mono text-xs uppercase tracking-[0.32em] text-paper/60"
          >
            {siteCopy.eyebrow}
          </motion.p>

          <div className="space-y-5">
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.08 }}
              className="max-w-3xl font-display text-5xl leading-[0.94] tracking-[-0.04em] text-paper md:text-7xl"
            >
              {siteCopy.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.16 }}
              className="max-w-xl text-base leading-7 text-paper/72 md:text-lg"
            >
              {siteCopy.subtitle}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut", delay: 0.24 }}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <Link
              href="/create"
              className="rounded-full bg-paper px-6 py-3 text-center text-sm font-medium text-ink transition hover:bg-white"
            >
              {siteCopy.ctaPrimary}
            </Link>
            <Link
              href="/create"
              className="rounded-full border border-paper/20 px-6 py-3 text-center text-sm font-medium text-paper/88 transition hover:border-paper/40 hover:bg-paper/5"
            >
              {siteCopy.ctaSecondary}
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.85, ease: "easeOut", delay: 0.1 }}
          className="relative rounded-[1.75rem] border border-paper/12 bg-paper/[0.06] p-5"
        >
          <div className="rounded-[1.35rem] border border-paper/10 bg-[#211914] p-5">
            <div className="flex items-center justify-between border-b border-paper/10 pb-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-paper/45">
                  Session
                </p>
                <p className="mt-2 font-display text-2xl text-paper">A new ritual brand for focus</p>
              </div>
              <div className="rounded-full border border-ember/30 bg-ember/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.24em] text-ember">
                Live
              </div>
            </div>

            <div className="grid gap-4 pt-4">
              {[
                ["Audience", "Founders and creative teams seeking clarity"],
                ["Mood", "Grounded, articulate, magnetic"],
                ["Territory", "Editorial Tension"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-paper/10 bg-paper/[0.03] px-4 py-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper/42">{label}</p>
                  <p className="mt-2 text-sm leading-6 text-paper/82">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
