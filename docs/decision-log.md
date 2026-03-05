# Decision Log

## 2026-03-05

### D-001
The project direction is a Creative Direction Engine with the working name `Muse`.

Reason:
It offers high upside for visual quality, product differentiation, and AI-native workflow design.

### D-002
The collaboration model is high-autonomy execution with user-led taste correction.

Reason:
The user wants to guide feel and taste as reactions emerge rather than specify everything upfront.

### D-003
The product should position AI as a creative partner that scales intuition rather than acting as an autopilot.

Reason:
This is the clearest through-line from the initial project discussion.

### D-004
The project should avoid generic AI SaaS patterns and prioritize a premium feel at small scope.

Reason:
A smaller, sharper first version is more credible than a broad, generic feature set.

### D-005
The project quality bar is "flagship portfolio piece" rather than "good demo".

Reason:
The user wants work that reflects best practices, immediate visual impact, and clear technical seriousness.

### D-006
The first product workflow is: capture a spark, generate three creative territories, refine one with explicit taste controls, and save the resulting artifact.

Reason:
This is the smallest end-to-end loop that proves the core thesis of the product.

### D-007
The technical foundation is Next.js, TypeScript, Tailwind, Framer Motion, OpenAI API, Zod, Postgres, and Drizzle.

Reason:
This stack supports a premium frontend, structured AI workflows, and durable persistence without premature complexity.

### D-008
The first implemented product interaction is a dedicated session creation flow at `/create` with typed inputs, mood selection, validation, and a live preview of the session artifact.

Reason:
The product needed to move from a descriptive landing page to a real input surface that proves the "enter the spark" step of the workflow.

### D-009
Creative direction generation is now defined by a typed territory schema and served through `/api/territories`, with deterministic mock generation as the fallback when live model access is unavailable.

Reason:
The UI needed a durable output contract so the generated territory experience could be built against a real structure instead of ad hoc copy.

### D-010
The second product step is implemented at `/create/territories`, where the user sees a creative thesis, a recommended direction, and three structured territory cards generated from the saved session draft.

Reason:
The product now needs to prove comparison, not just input collection.

### D-011
Muse now explicitly adopts production-oriented standards covering security, reliability, observability, architecture boundaries, and testing strategy.

Reason:
The project should read as a serious production-minded build, not only a polished prototype.

### D-012
Current implementation boundaries were tightened to align with the new standards: server env access is validated centrally, API responses use a stable contract, generation emits structured logs, and client draft storage is versioned and schema-validated.

Reason:
Early production-minded discipline is more valuable now than retrofitting these boundaries after the codebase grows.

### D-013
The product direction has shifted from a generic creative direction engine toward a narrower first release: helping solo founders turn an idea into brand + landing page concepts.

Reason:
The clarified user and problem are stronger than the earlier broader framing.

### D-014
The project workflow is now documentation-first discovery, and further coding should pause until the product definition is better specified.

Reason:
The team concluded that implementation outran product thinking and that decisions should be covered more thoroughly in docs first.

### D-015
Muse v1 should produce one recommended Direction Brief plus two lighter alternates, rather than three equally developed outputs.

Reason:
The user should leave with momentum and a recommended direction, not just more decisions.

### D-016
Muse should start with one smart prompt box followed by three short follow-up questions.

Reason:
This keeps the experience approachable while still extracting the signals needed for a strong creative direction.

### D-017
The first three follow-up questions should cover audience, desired feel, and the primary landing page action.

Reason:
These are the highest-leverage inputs for producing a strategically useful direction.

### D-018
Muse should recommend a direction using a blend of strategic fit, conversion potential, and aesthetic distinctiveness, weighted primarily toward strategic fit.

Reason:
The best direction should be the one most aligned with the product and audience, not merely the prettiest or safest.

### D-019
The first refinement model should use structured actions instead of reopening immediately into generic freeform chat.

Reason:
Structured refinement preserves product specificity and avoids collapsing back into plain LLM behavior.

### D-020
Muse should end a successful session with two exportable artifacts: a polished Direction Brief document and an agent-ready prompt for a design/build agent.

Reason:
The product should create value for both human readers and downstream AI execution.

### D-021
The first agent handoff target is a branded landing page optimized for signup conversion.

Reason:
This is the clearest and most immediate downstream use case for the v1 artifact.

### D-022
The three follow-up questions should be adaptive: Muse may infer, ask, prefill, and always allow the user to override.

Reason:
The experience should feel intelligent and low-friction rather than rigid or bureaucratic.

### D-023
The Direction Brief spec is now the active definition of Muse's core artifact, including its section structure and writing rules.

Reason:
The product now has enough clarity to define the artifact in operational terms before further specification or implementation.

### D-024
Each alternate direction should be lighter than the recommended brief and should include a name, one-line thesis, what it feels like, visual character, and why a user might choose it instead.

Reason:
Alternates are comparison tools, not competing full briefs.

### D-025
The agent handoff output should be a structured build brief with objective, direction summary, execution requirements, and things to avoid.

Reason:
Muse should produce an execution-ready prompt, not a loose prose export.

### D-026
The first downstream handoff target is a code-capable design/build agent producing a branded landing page implementation aligned to the Direction Brief.

Reason:
This is the clearest and most immediate execution target for Muse v1.

### D-027
The adaptive question model should use single-select for audience, multi-select up to three qualities for feel, and single-select for primary page action, with custom input always available.

Reason:
This keeps the questions guided and low-friction while preserving flexibility.

### D-028
Muse should prefill only when the signal is strong, the inferred answer materially fits, and the user can see and override it immediately.

Reason:
Adaptive behavior should feel smart and legible, not opaque or overconfident.

### D-029
Muse should be most conservative when inferring the desired feel; it may recommend likely fits but should usually still ask that question directly.

Reason:
Feel is the highest-taste input and the cost of getting it wrong is high.

### D-030
The Muse v1 experience is now defined as a seven-step screen/state flow: entry, follow-up questions, generation, recommended brief, alternate comparison, refinement, and export/handoff.

Reason:
The product is now specified enough to define the concrete session surfaces before implementation resumes.

### D-031
The recommended Direction Brief should use a four-tier density model: micro, short, compact prose, and structured bullets.

Reason:
The artifact needs to feel substantial and trustworthy without becoming dense, inconsistent, or difficult to render later in the UI.

### D-032
The recommended direction should be presented through a four-panel visual concept set: Hero, Section Rhythm, Style System, and Conversion Moment.

Reason:
Muse should feel visual-first without pretending to be a full design tool or relying on one oversized mockup.

### D-033
Alternates should remain visually comparable, but in compressed form using a mini hero panel and a mini style/feel panel.

Reason:
Comparison should stay visual, but the alternates should not compete with the full recommended direction.

### D-034
Each of the four recommended visual panels should have an explicit content contract covering its purpose, the Direction Brief sections it pulls from, what it must show, and what it must avoid.

Reason:
The visual side of Muse needs to be as structured and controllable as the written artifact.

### D-035
Refinement should preserve the identity of the chosen direction, move it along one dimension at a time, and avoid regenerating a totally different concept unless the user explicitly switches directions.

Reason:
Refinement should make a direction more usable and steerable without making the product output unstable or arbitrary.

### D-036
The first refinement actions are: Make It Bolder, Make It Calmer, Make It More Premium, Make It More Experimental, and Make It More Conversion-Focused, each with explicit rules for what may change and what should stay stable.

Reason:
Structured refinement keeps Muse specific and controllable, and avoids collapsing back into vague freeform iteration.

### D-037
Muse v1 should end with two aligned exports: a polished Direction Brief document for humans and a structured agent handoff prompt for downstream execution.

Reason:
The product should create a durable strategic artifact and an immediately usable execution artifact, not just a transient session result.

### D-038
Muse generation should operate on normalized session input and return structured, renderable, refinable, and exportable output rather than loose prose.

Reason:
The product value depends on durable, controllable artifacts, not ad hoc text generation.

### D-039
Generation must return one fully developed recommended direction, two lighter alternates, recommendation rationale, and export-ready artifact data.

Reason:
Muse needs a stable generation contract so the recommendation, refinement, and export steps can all operate on the same structured output.

### D-040
Muse should use stable product schemas for normalized input, recommended direction output, alternate direction output, and export payloads.

Reason:
The product needs a renderable, refinable, and testable data model before implementation resumes.

### D-041
Muse should define explicit session, loading, failure, and recovery states, and should preserve the last valid artifact whenever possible.

Reason:
The product needs predictable behavior and recovery paths before implementation resumes.
