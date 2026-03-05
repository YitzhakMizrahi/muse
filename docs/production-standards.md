# Production Standards

## Goal

Build Muse so it can credibly evolve from portfolio project to production-grade application without architectural rework.

## Core Expectations

1. Every external boundary must be typed and validated.
2. Secrets must never cross client boundaries.
3. Errors must return stable, usable contracts.
4. Loading, empty, and failure states are part of the product, not incidental states.
5. Observability must exist at every important server boundary.
6. Accessibility, responsiveness, and performance are release criteria.
7. Configuration must be explicit, validated, and environment-aware.
8. Persistent data changes must be schema-driven and migration-friendly.

## Security

1. Keep API keys and secret orchestration server-side only.
2. Validate all request payloads and reject malformed input clearly.
3. Sanitize or constrain model outputs before rendering or persisting them.
4. Do not trust local storage as a source of truth.
5. Prepare for rate limiting and abuse controls on public write surfaces.
6. Document any future auth and authorization assumptions before implementation.

## Reliability

1. Prefer deterministic fallbacks where graceful degradation is possible.
2. Do not allow a third-party outage to collapse the entire user experience if a useful fallback exists.
3. All API routes must return structured success and error shapes.
4. Favor idempotent operations where retries are plausible.
5. Server errors should be logged with enough context to debug without exposing secrets.

## Observability

1. Important server actions should emit structured logs.
2. Log entries should include operation name and outcome.
3. Failures should capture enough detail for debugging while redacting sensitive input.
4. If prompts become a durable asset, version them explicitly.

## Performance

1. Ship the smallest client bundle that still supports the intended experience.
2. Default to server components unless client state is necessary.
3. Avoid large client-only dependencies without clear product value.
4. Watch route-level bundle size as features are added.

## Accessibility

1. Interactive elements must be semantic and keyboard reachable.
2. Inputs require labels and usable validation feedback.
3. Color contrast must remain defensible under inspection.
4. Motion should not be required to understand content.

## Delivery

1. New features should include failure paths, not just happy paths.
2. Durable architectural decisions belong in the decision log.
3. Introduce infrastructure only when product needs justify it.
