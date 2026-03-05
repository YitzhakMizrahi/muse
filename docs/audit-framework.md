# Audit Framework

## Purpose

This document defines how Muse should be audited as implementation resumes.

The goal is to avoid relying on taste alone or output volume alone.

Muse should be reviewed through distinct audit layers.

## 1. Product Audit

Questions:

- Is the product promise clear from the first screen?
- Does the session flow make sense without explanation?
- Does the recommendation feel believable?
- Do the alternates create meaningful comparison?
- Does refinement preserve the identity of the chosen direction?
- Do the exports feel genuinely useful outside the session?

Failure signals:

- the user cannot tell what Muse does quickly
- the recommendation feels arbitrary
- refinement behaves like regeneration rather than steering
- exports feel like copy dumps rather than usable artifacts

## 2. Output Quality Audit

Questions:

- Are the three directions materially distinct?
- Is the recommended direction meaningfully stronger or better justified?
- Does the Direction Brief feel professional and handoff-ready?
- Is the handoff prompt operational rather than vague?
- Are outputs too generic, repetitive, or adjective-heavy?

Failure signals:

- directions differ only cosmetically
- rationale is weak or interchangeable
- outputs rely on vague style language without applied logic
- exports cannot guide another human or agent well

## 3. UX Audit

Questions:

- Is the intake low-friction?
- Are follow-up questions helpful rather than bureaucratic?
- Are loading, failure, and recovery states clear?
- Is comparison easy?
- Are refinement actions legible and trustworthy?
- Does the export step feel like completion rather than admin?

Failure signals:

- unnecessary form feeling
- hidden inference that confuses the user
- weak failure recovery
- too much cognitive load during comparison or refinement

## 4. Visual Audit

Questions:

- Is the interface immediately legible?
- Does it avoid generic AI SaaS patterns?
- Is hierarchy clear?
- Is contrast strong enough?
- Does the design feel authored rather than assembled?
- Do visual panels reinforce the product value?

Failure signals:

- muddy contrast
- equal-weight card grids flattening the experience
- generic hero patterns
- aesthetic ambition without clarity

## 5. Engineering Audit

Questions:

- Are schemas enforced?
- Are failure states handled cleanly?
- Are outputs renderable without brittle UI inference?
- Are validation and logging boundaries clear?
- Are tests covering the right contracts?

Failure signals:

- unvalidated generation output
- brittle coupling between model output and UI
- silent failure paths
- missing verification for core contracts

## 6. Audit Timing

Audit should happen:

- at the end of each milestone
- before merging significant UX or product changes into the main line
- before any claim that the product is production-ready

## 7. Audit Rule

If a milestone fails one of the major audit layers, the answer is not to keep piling on features.

The answer is to fix the weak layer before advancing.
