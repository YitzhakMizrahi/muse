# Muse

Muse is a Creative Direction Engine for turning rough ideas into structured visual and verbal direction.

The product thesis is simple:

- people start with sparks, not finished briefs
- AI should expand and organize creative thinking
- human taste remains in control

Instead of producing one generic answer, Muse is designed to generate distinct creative territories, make them comparable, and let the user refine a direction intentionally.

## First Release

The first end-to-end product loop is:

1. Enter a concept, mood, audience, and optional references
2. Generate three creative territories
3. Compare them side by side
4. Refine one with explicit taste controls
5. Save the resulting artifact

This is the narrowest version of the product that still proves the idea.

## Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- OpenAI API
- Zod
- Postgres
- Drizzle ORM

## Project Standards

Muse is being built as a flagship portfolio piece.

That means:

- strong visual identity over generic SaaS defaults
- structured AI output over loose text blobs
- serious attention to motion, typography, and responsiveness
- implementation quality that holds up under inspection

## Project Docs

The repo uses living documentation as project memory.

- [docs/vision.md](/home/unix/dev/gpt-5.4-codex/docs/vision.md)
- [docs/principles.md](/home/unix/dev/gpt-5.4-codex/docs/principles.md)
- [docs/workflow.md](/home/unix/dev/gpt-5.4-codex/docs/workflow.md)
- [docs/engineering-standards.md](/home/unix/dev/gpt-5.4-codex/docs/engineering-standards.md)
- [docs/user-journey.md](/home/unix/dev/gpt-5.4-codex/docs/user-journey.md)
- [docs/tech-stack.md](/home/unix/dev/gpt-5.4-codex/docs/tech-stack.md)
- [docs/decision-log.md](/home/unix/dev/gpt-5.4-codex/docs/decision-log.md)
- [docs/roadmap.md](/home/unix/dev/gpt-5.4-codex/docs/roadmap.md)

## Getting Started

Install dependencies:

```bash
pnpm install
```

Run the app:

```bash
pnpm dev
```

## Current Status

The repository currently includes:

- foundation docs and project rules
- first product workflow definition
- stack decision
- initial Next.js app shell
- an authored landing page that establishes visual direction

The next stage is building the actual session flow for creating and refining creative directions.
