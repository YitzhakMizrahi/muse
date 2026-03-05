# Schema Spec

## Purpose

Muse v1 needs stable structured objects for:

- normalized session input
- recommended direction output
- alternate direction output
- export payloads

These schemas should make the system:

- renderable
- refinable
- exportable
- testable

## 1. Normalized Session Input

The normalized session input should contain:

- `product_idea_raw`
- `product_summary`
- `primary_audience`
- `feel_qualities`
- `primary_page_action`
- `references`
- `constraints`
- `anti_preferences`

Rules:

- `feel_qualities` should cap at 3
- `primary_audience` should be singular in v1
- `primary_page_action` should be singular in v1
- `references`, `constraints`, and `anti_preferences` may be empty arrays

## 2. Recommended Direction Object

The recommended direction object should contain these top-level groups:

- `direction_identity`
- `brief`
- `visual_panels`
- `refinement_metadata`
- `exports`

### `direction_identity`

Should contain:

- `name`
- `core_thesis`
- `recommended_reason`

### `brief`

Should contain:

- `who_it_should_resonate_with`
- `feel_like`
- `not_feel_like`
- `brand_tone`
- `visual_principles`
- `typography_direction`
- `color_logic`
- `layout_guidance`
- `landing_page_narrative`
- `section_outline`
- `cta_strategy`
- `anti_patterns`

### `visual_panels`

Should contain:

- `hero_panel`
- `section_rhythm_panel`
- `style_system_panel`
- `conversion_moment_panel`

### `refinement_metadata`

Should contain separated subfields for:

- `strategic_foundation`
- `emotional_posture`
- `visual_system`
- `narrative_structure`
- `conversion_behavior`

### `exports`

Should contain:

- `direction_brief_export`
- `agent_handoff_prompt_export`

## 3. Alternate Direction Object

Each alternate should contain:

- `name`
- `one_line_thesis`
- `feel_like`
- `visual_character`
- `choose_this_if`
- `visual_preview`

### `visual_preview`

Should contain:

- `mini_hero_panel`
- `mini_style_feel_panel`

## 4. Export Payloads

### `direction_brief_export`

Should contain:

- ordered sections ready for document rendering
- no alternates in full detail
- no raw generation traces

### `agent_handoff_prompt_export`

Should contain:

- `objective`
- `direction_summary`
- `execution_requirements`
- `things_to_avoid`

## 5. Schema Rules

- all major objects should be complete enough to render without inference-heavy UI logic
- alternates should be structurally lighter than the recommended direction
- field names should reflect product concepts, not implementation internals
- export payloads should be derived from the same source direction object, not generated independently from scratch

## 6. Validation Rules

- schema validation should happen before rendering
- incomplete recommended direction output should fail clearly
- malformed alternates should fail clearly
- export payloads should be validated separately from the base direction object
