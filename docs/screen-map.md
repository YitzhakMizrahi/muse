# Screen Map

## Purpose

Define the concrete Muse v1 product surfaces before implementation resumes.

## Screen 1: Entry

### User Sees

- a smart prompt box
- a concise explanation of what Muse produces
- one clear primary action to begin

### System Goal

- reduce fear of starting
- make the product legible quickly
- encourage plain-language input rather than design jargon

### User Action

- enters a rough product idea

### System Transition

- parses the prompt
- determines whether follow-up answers can be prefilled
- moves to the follow-up flow

## Screen 2: Follow-Up Questions

### User Sees

- one question at a time
- suggested answers
- editable custom input
- any Muse-inferred answer shown visibly

### Questions

1. Who is this mainly for?
2. How should it feel when someone lands on it?
3. What should the page get people to do first?

### System Goal

- extract high-leverage signals without creating form fatigue

### User Action

- accepts, edits, or overrides the suggested answers

### System Transition

- synthesizes the intake into generation inputs
- moves to generation

## Screen 3: Generation State

### User Sees

- a clear progress state
- a concise statement of what Muse is preparing

### System Goal

- reinforce that Muse is building a recommendation, not just returning generic text

### System Work

- create one recommended Direction Brief
- create two lighter alternates
- prepare an agent handoff prompt

### System Transition

- moves to the recommended direction view

## Screen 4: Recommended Direction Brief

### User Sees

- the recommended direction first
- visual concept panels leading the presentation
- the full Direction Brief beneath or alongside the visual concept

### System Goal

- create immediate orientation and trust
- make the recommendation feel reasoned, not arbitrary

### Core Sections

1. Direction Name
2. Core Thesis
3. Who It Should Resonate With
4. What It Should Feel Like
5. What It Should Not Feel Like
6. Brand Tone
7. Visual Principles
8. Typography Direction
9. Color Logic
10. Layout / Composition Guidance
11. Landing Page Narrative
12. Section-by-Section Landing Page Outline
13. CTA Strategy
14. Anti-Patterns
15. Why This Direction Is Recommended
16. Agent Handoff Prompt

### User Actions

- read
- compare against alternates
- begin refinement
- export or hand off

## Screen 5: Alternate Comparison

### User Sees

- two lighter alternate directions
- fast-scan comparison panels

### Alternate Contents

1. Direction Name
2. One-line Thesis
3. What It Feels Like
4. Visual Character
5. Why You'd Choose This Instead

### System Goal

- make tradeoffs legible
- reduce tunnel vision
- support confident choice

### User Actions

- compare
- switch focus to an alternate if preferred

## Screen 6: Refinement

### User Sees

- structured refinement actions

### Initial Refinement Actions

- make it bolder
- make it calmer
- make it more premium
- make it more experimental
- make it more conversion-focused

### System Goal

- preserve product structure
- avoid collapsing back into generic chat behavior

### User Actions

- choose a refinement action
- review the updated brief

## Screen 7: Export / Handoff

### User Sees

- exportable Direction Brief
- agent-ready handoff prompt

### System Goal

- turn the session into a durable artifact
- support immediate downstream use

### Export Targets

1. human-readable Direction Brief
2. code-capable design/build agent prompt for a branded landing page

## Key State Rules

- the recommended brief should always lead
- alternates should stay lighter than the recommended brief
- inferred answers should remain visible and editable
- refinement should remain structured before freeform
- handoff should be execution-oriented, not just descriptive
