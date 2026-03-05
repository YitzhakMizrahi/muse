# Generation Contract

## Purpose

Muse v1 should generate structured creative direction artifacts, not loose prose.

The generation layer must return output that is:

- comparable
- renderable
- refinable
- exportable

## Input Contract

Generation should receive a normalized session input with these fields:

### Required

- raw product idea
- primary audience
- desired feel
- primary landing page action

### Optional

- references
- explicit constraints
- anti-preferences

## Normalization Rules

Before generation, Muse should normalize the input into a stable internal shape.

This should include:

- a cleaned product summary
- one primary audience lens
- up to three feel qualities
- one primary page action
- any useful references or constraints

The generation step should work from this normalized shape, not from raw chat text alone.

## Output Contract

Generation must return:

1. one recommended direction
2. two alternate directions
3. recommendation rationale
4. export-ready artifact data

## Recommended Direction Output

The recommended direction must contain:

- full Direction Brief data
- full visual panel data
- refinement-ready metadata
- export-ready brief content
- export-ready handoff prompt content

## Alternate Direction Output

Each alternate must contain:

- alternate summary fields
- compressed visual comparison fields
- explicit tradeoff framing

## Recommendation Rationale

Generation must explain why the recommended direction won.

The rationale should be based on:

1. strategic fit
2. conversion potential
3. aesthetic distinctiveness

Strategic fit should remain the primary weighting.

## Refinement Metadata

The generation output should preserve enough structure to support refinement without regenerating blindly.

This means the output must keep separate fields for:

- strategic foundation
- emotional posture
- visual system
- landing page narrative
- conversion behavior

## Deterministic vs Model-Generated

### Deterministic or rule-driven

- input normalization
- answer caps and selection limits
- output schema shape
- export structure
- refinement guardrails

### Model-generated

- direction naming
- thesis wording
- tone language
- visual principles
- landing page narrative
- alternates
- recommendation rationale within the defined policy

## Quality Rules

- the output must be structurally complete
- the three directions must be meaningfully distinct
- the recommended direction must be more developed than the alternates
- the output must remain within Muse's defined product boundary
- generation should produce direction systems, not pretend-final design files

## Failure Rules

If generation is weak, incomplete, or inconsistent, Muse should prefer:

- explicit retry or regeneration
- preserving the session input
- clear error or recovery states

over:

- silently fabricating partial output
- collapsing into vague prose

