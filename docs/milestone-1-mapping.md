# Milestone 1 Mapping

## Goal

Map the Milestone 1 product scope to concrete application surfaces before code changes begin.

Milestone 1 proves:

- smart intake
- adaptive follow-up questions
- normalized input
- structured generation
- recommended direction result
- alternate comparison
- minimal loading and failure states

## Route / Surface Mapping

### `/`

Purpose:

- explain the product clearly
- route the user into the session flow

Milestone 1 role:

- keep simple
- not the primary build focus

### `/create`

Purpose:

- host the initial Muse session intake

Milestone 1 responsibilities:

- smart prompt box
- adaptive follow-up questions
- visible normalized session summary before generation
- clear generate action

### `/create/result`

Purpose:

- host the generated Muse output

Milestone 1 responsibilities:

- loading state
- generation failure state
- recommended direction view
- alternate comparison view

## Component Mapping

### Intake Layer

Likely components:

- `create/intake-shell`
- `create/prompt-box`
- `create/follow-up-questions`
- `create/input-summary`

### Result Layer

Likely components:

- `result/result-shell`
- `result/recommended-direction`
- `result/alternate-directions`
- `result/loading-state`
- `result/error-state`

## Library / Data Mapping

### Session Model

Should own:

- raw prompt input
- adaptive question answers
- normalized session input object

### Generation Model

Should own:

- request contract
- response contract
- recommendation payload
- alternate payloads

### Export Model

Can remain present in schema and contracts, but does not need full UX implementation in Milestone 1.

## API Boundary

Milestone 1 should use one generation boundary.

Recommendation:

- keep a single server endpoint for generation in Milestone 1
- change its contract to match the current Muse schema

## State Mapping

Milestone 1 must implement:

- idle
- drafting
- ready to generate
- generating
- generated
- generation failure

Milestone 1 may defer:

- full refinement state behavior
- export-specific failure states

## Reuse / Replace Guidance

### Reuse patterns

- server route shape
- API error contract
- logging pattern

### Replace

- territory naming and output model
- form-first intake UX
- territory result view
- outdated mock outputs

## Build Rule

Milestone 1 should prefer a correct product loop over polished presentation.

If forced to choose, prioritize:

1. correct structure
2. understandable result
3. reliable states
4. visual polish later
