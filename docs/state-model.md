# State Model

## Purpose

Muse v1 needs explicit state definitions so the product can handle:

- normal flow
- loading
- failure
- recovery
- refinement
- export

This keeps the experience predictable and implementation-ready.

## Session States

### 1. Idle

The user has not started a session yet.

UI needs:

- smart prompt box
- clear product promise
- no stale result content

### 2. Drafting

The user is entering the initial idea or answering follow-up questions.

UI needs:

- visible progress through the intake
- editable answers
- low-friction interaction

### 3. Ready To Generate

Muse has enough normalized input to generate directions.

UI needs:

- clear generate action
- visible summary of the captured input
- ability to edit before generation

### 4. Generating

Muse is producing the recommended direction, alternates, and export payloads.

UI needs:

- active loading state
- explicit status messaging
- no false impression that generation is complete

### 5. Generated

Muse has returned a valid recommended direction and alternates.

UI needs:

- recommended direction view
- alternate comparison
- refinement actions
- export actions

### 6. Refining

Muse is applying one structured refinement to the chosen direction.

UI needs:

- visible indication of the chosen refinement action
- preservation of the prior direction context
- clear transition back to the updated result

### 7. Export Ready

Muse has a valid brief export and a valid handoff prompt export ready for the user.

UI needs:

- clear distinction between the two exports
- copy or download actions
- confidence that the artifacts are finalized for handoff

## Failure States

### Input Failure

Muse cannot normalize the user input into a valid session shape.

Recovery:

- explain what is missing or ambiguous
- return the user to editing, not to a blank state

### Generation Failure

Muse fails to return a valid structured result.

Recovery:

- preserve input
- allow retry
- show a clear error state

### Refinement Failure

Muse fails to apply the selected refinement cleanly.

Recovery:

- preserve the last valid generated direction
- allow retry or return to the previous valid result

### Export Failure

Muse cannot produce one or both export artifacts.

Recovery:

- preserve the generated direction
- allow retry of export only
- do not force full regeneration

## State Rules

- the product should always preserve the last valid state when possible
- failures should not wipe the user's work
- generation, refinement, and export should have distinct loading and failure states
- the UI should never imply success when the structured output is incomplete or invalid

## Recovery Principle

Muse should recover by stepping back to the last valid artifact, not by forcing the user to restart the whole session.
