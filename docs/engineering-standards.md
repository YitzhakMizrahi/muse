# Engineering Standards

## Goal

Build with the level of rigor expected from a polished production-grade portfolio project.

## Core Standards

1. Use TypeScript strictly.
2. Validate external inputs and AI outputs explicitly.
3. Keep components small, named clearly, and composed intentionally.
4. Separate product logic from presentation logic when it improves clarity.
5. Prefer server-side boundaries for secrets and sensitive orchestration.
6. Design for accessibility from the first pass, not as cleanup.
7. Make responsive behavior intentional on mobile and desktop.
8. Include error handling that produces usable recovery paths.
9. Keep styling systems consistent and token-driven.
10. Add lightweight tests where they defend important behavior.

## AI Standards

1. Prompts should be structured, inspectable, and versionable.
2. Model outputs should map to typed schemas.
3. Generated content should be editable rather than treated as sacred.
4. The UI should communicate when content is generated, refined, or inferred.
5. Human override must remain obvious and easy.

## Frontend Standards

1. Use semantic HTML where possible.
2. Motion should be purposeful and performant.
3. Typography, spacing, and rhythm must be consistent across screens.
4. Avoid shipping generic components without adaptation to the product language.
5. The first screen should communicate identity immediately.

## Delivery Standards

1. Each milestone should leave the app in a coherent state.
2. Documentation should keep pace with durable decisions.
3. Do not add tools or abstractions that are not clearly paying for themselves.
4. Production-grade constraints should be applied early enough to shape the architecture, not retrofitted after complexity accumulates.
