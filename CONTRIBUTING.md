# Contributing

## Working Rules

1. Keep commits small and cohesive.
2. Do not mix unrelated refactors with feature work.
3. Validate locally before opening a pull request:
   - `pnpm lint`
   - `pnpm typecheck`
   - `pnpm test`
   - `pnpm build`
4. Update project docs when a decision becomes durable.

## Commit Convention

Use conventional commits with narrow scope.

Examples:

- `feat(create): add typed session creation flow`
- `feat(territories): add structured generation contract`
- `chore(test): add vitest foundation`
- `docs(standards): add production workflow rules`
- `fix(api): standardize territory error responses`

## Pull Requests

Pull requests should explain:

- what changed
- why it changed
- how it was validated
- what remains risky or deferred
