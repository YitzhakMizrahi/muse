# Session Flow

## Goal

Define the end-to-end Muse v1 session flow before further implementation.

## Product Shape

Muse turns:

- rough founder instinct

into:

- one recommended Direction Brief
- two lighter alternate directions
- one agent-ready handoff prompt for a design/build agent

## Flow

### 1. Entry

The user lands on Muse and is prompted with one smart input box.

The user should feel:

- low friction
- no design expertise required
- clear promise about what Muse will produce

### 2. Initial Prompt

The user writes a rough product idea in plain language.

Examples of likely input:

- what the product is
- who it is for
- what the founder is trying to make happen
- rough vibe or instinct, if any

### 3. Follow-Up Questions

Muse asks three short follow-up questions, adaptively:

1. Who is this for?
2. How should it feel?
3. What should the landing page get people to do?

Rules:

- infer when confidence is high
- ask when confidence is low
- always allow override
- provide suggested options plus custom input

### 4. Generation

Muse generates:

- one recommended Direction Brief
- two alternate directions

The recommendation should be based primarily on:

- strategic fit

And secondarily on:

- conversion potential
- aesthetic distinctiveness

### 5. Recommended Direction View

The recommended output should lead with the visual concept and then explain the reasoning.

It should include:

1. direction name
2. core thesis
3. audience impression
4. what it should feel like
5. what it should not feel like
6. brand tone
7. visual principles
8. typography direction
9. color logic
10. layout or composition guidance
11. landing page narrative
12. section-by-section landing page outline
13. CTA strategy
14. anti-patterns
15. why this direction is recommended
16. agent handoff prompt

### 6. Alternate Comparison

The two alternates should be lighter and faster to scan.

Each alternate should include:

1. direction name
2. one-line thesis
3. tone
4. visual character
5. why a user might choose it instead

### 7. Refinement

After generation, the user should be able to refine through structured actions first.

Initial actions:

- make it bolder
- make it calmer
- make it more premium
- make it more experimental
- make it more conversion-focused

### 8. Export / Handoff

Muse should conclude with two exportable artifacts:

1. polished Direction Brief document
2. agent-ready prompt for a design/build agent creating a branded landing page

## Experience Requirements

The session should feel:

- guided, not bureaucratic
- intelligent, not mysterious
- taste-aware, not overly technical
- useful to both a human founder and a downstream agent
