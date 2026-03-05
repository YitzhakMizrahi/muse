# Architecture

## Current Shape

Muse currently has four primary layers:

1. `app/`
   Route entry points, layouts, API handlers
2. `components/`
   Presentation and interaction components
3. `lib/`
   Domain logic, schemas, utility modules, data contracts
4. `docs/`
   Durable project memory and standards

## Architectural Rules

1. Domain schemas live in `lib/` and are shared by routes and UI where appropriate.
2. Route handlers validate input before executing domain logic.
3. Client components own ephemeral interaction state only.
4. Secrets and provider clients remain server-side.
5. Prompt construction belongs in server-side domain modules, not UI components.
6. Presentation components should consume typed data, not shape raw provider responses.
7. Persisted data models should be introduced before business logic becomes storage-dependent.

## Boundary Design

### UI Boundary

- React components render validated, product-shaped data.
- Browser persistence may support draft UX, but not durable truth.

### API Boundary

- Requests are schema-validated.
- Responses return stable `ok` and `error` semantics.
- Errors should be human-usable and developer-debuggable.

### AI Boundary

- Prompt input is built from typed domain objects.
- Model output is parsed into typed schemas before use.
- Fallback behavior is explicit.

### Persistence Boundary

- Database access should be introduced through a narrow data layer.
- Route handlers should not accumulate raw SQL or storage logic.

## Planned Evolution

Near-term additions should follow this order:

1. env/config module
2. API response contract helpers
3. persistence layer for sessions and artifacts
4. refinement workflow built on the same territory schema family
