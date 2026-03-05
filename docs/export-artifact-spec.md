# Export Artifact Spec

## Purpose

Muse v1 ends with two exportable artifacts:

1. a polished Direction Brief document for human use
2. an agent-ready handoff prompt for downstream execution

The exports should make the session durable outside Muse.

## Export Set

### 1. Direction Brief Export

Purpose:

- preserve the recommended direction as a reusable artifact
- help a founder explain the direction clearly to collaborators
- give designers, builders, or agents a stable reference

Format:

- clean document
- readable top to bottom
- structured for scanning and handoff

Should include:

- Direction Name
- Core Thesis
- Who It Should Resonate With
- What It Should Feel Like
- What It Should Not Feel Like
- Brand Tone
- Visual Principles
- Typography Direction
- Color Logic
- Layout / Composition Guidance
- Landing Page Narrative
- Section-by-Section Landing Page Outline
- CTA Strategy
- Anti-Patterns
- Why This Direction Is Recommended

Should not include:

- alternate directions in full detail
- raw generation traces
- implementation-specific code instructions

Quality rules:

- should read like a polished creative strategy artifact
- should be concise enough to hand to another person without cleanup
- should preserve taste boundaries clearly

### 2. Agent Handoff Prompt Export

Purpose:

- convert the chosen direction into an execution-ready build brief
- reduce ambiguity for a downstream design/build agent
- preserve the direction while making execution concrete

Format:

- structured prompt
- directly copyable into a downstream agent
- optimized for a code-capable design/build agent

Required structure:

1. Objective
2. Direction Summary
3. Execution Requirements
4. Things To Avoid

Should include:

- the landing page objective
- the intended audience impression
- the emotional and visual character of the direction
- the required landing page sections
- the conversion goal
- the core constraints and anti-patterns

Should not include:

- vague style adjectives without operational meaning
- multiple conflicting objectives
- implementation detail that belongs only to a specific stack unless the user asks for it

Quality rules:

- should be executable by an agent without heavy reinterpretation
- should preserve the chosen direction faithfully
- should aim at a branded landing page optimized for signup conversion

## Relationship Between The Two Exports

The Direction Brief export is the human-readable source artifact.

The Agent Handoff Prompt export is the execution-oriented derivative artifact.

They should stay aligned, but they should not be written in the same voice.

## Export UX Rules

- the user should understand why there are two exports
- the brief should feel like the strategic artifact
- the handoff prompt should feel like the operational artifact
- the export step should reinforce that Muse is creating reusable direction, not just a transient chat response
