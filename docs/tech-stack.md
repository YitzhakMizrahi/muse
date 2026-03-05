# Tech Stack

## Chosen Stack

- `Next.js` with App Router
- `React`
- `TypeScript` in strict mode
- `Tailwind CSS`
- `Framer Motion`
- `OpenAI API`
- `Zod`
- `Postgres`
- `Drizzle ORM`
- object storage for uploaded references and generated artifacts

## Why This Stack

### Next.js

Good fit for:

- polished frontend delivery
- server and client boundaries
- streaming and server actions if needed
- deployability

### TypeScript + Zod

Good fit for:

- strong typing
- schema validation
- keeping AI outputs structured and trustworthy

### Tailwind CSS + Custom Tokens

Good fit for:

- fast iteration
- a consistent design system
- expressive styling without committing to a heavy UI kit

### Framer Motion

Good fit for:

- meaningful motion
- staged reveals
- making the creative workflow feel alive without becoming noisy

### OpenAI API

Good fit for:

- structured creative synthesis
- iterative refinement
- critique and transformation workflows

### Postgres + Drizzle

Good fit for:

- durable session history
- artifact persistence
- clean schema evolution

## Deliberate Non-Choices

Avoid for now:

- heavy agent frameworks
- custom microservices
- premature queueing infrastructure
- auth before it is necessary
- generic enterprise admin surfaces

## Architectural Direction

### Frontend

- App Router pages and layouts
- server-rendered shell where useful
- client components only where interaction requires them

### AI Layer

- direct API integration
- prompt modules kept explicit and inspectable
- structured JSON outputs validated with `Zod`

### Data Layer

- relational storage for sessions, references, territories, and refinements
- object storage for uploaded images and persistent artifacts

## Versioning Note

Use current stable major versions at implementation time unless a compatibility issue justifies otherwise.
