# Guide: logic, data, and API work

Detail behind [flow/build.md](flow/build.md)'s steps 1 to 3.

- **Data layer**: match the spec's data-fetching row exactly — source, shape, caching/revalidation rule. After a migration or schema change, query the live schema to confirm it actually applied; a migration file that's committed but never run is a common, silent failure.
- **Idempotency**: anything that mutates state on a user action (submit, checkout, sign-up) must be safe against a double click or a retried request. A unique constraint, an idempotency key, or a check-before-write, whichever fits the stack already in `AGENTS.md`.
- **Input validation at the edge**: validate where the request enters (the endpoint/route handler), not just deep in a helper function — an invalid payload should never reach business logic.
- **Authorization, not just authentication**: confirm the caller is logged in AND allowed to touch this specific resource. "Logged in" alone is a common, exploitable gap.
- **Rate limiting**: anything public-facing gets a limit; anything internal doesn't need one unless the spec says so.
- **Secrets**: read from the environment, never hardcoded, never logged.
- **Logging**: at the edges (request in, response out, error caught) — enough to debug a production issue without a redeploy, not so much it's noise.
