# Testing Strategy

## Goal

Add tests where they protect important behavior, not just to increase count.

## Priorities

1. schema validation
2. domain transforms and fallback logic
3. API route contracts
4. critical user flows

## Testing Layers

### Unit Tests

Use for:

- schema helpers
- prompt builders
- deterministic generators
- utility functions

### Integration Tests

Use for:

- API handlers
- environment validation
- persistence boundaries
- request and response contracts

### End-to-End Tests

Use for:

- create session flow
- territory generation flow
- refinement flow

## Minimum Expectations

1. New domain modules should be testable without rendering the UI.
2. Important API routes should have contract-level tests.
3. Regressions in typed generation shape should be detectable without manual QA.
4. Critical flows should eventually be covered by E2E tests before public release.

## Current Gap

Muse does not yet have a test runner configured.

This is acceptable for the current stage only because the codebase is still small.

Before adding persistence or refinement history, add:

- unit test runner
- integration test setup
- at least one end-to-end flow
