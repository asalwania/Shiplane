---
name: blueprint
description: Settle a load-bearing web decision — rendering strategy, data-fetching approach, design tokens, an API contract, or accessibility/performance budgets — and write it down as a build spec with acceptance criteria. Use when a decision like this is still open for a scoped item, or when build reports one is missing before it can build.
---

# blueprint

**Load-bearing decision**: one that later work would have to be redone to reverse — not "which icon library" but "client- or server-rendered," not "button corner radius" but "the token scale it's drawn from." Produces one `docs/specs/<NNN>-<slug>.md` per decision, from [spec-template.md](spec-template.md).

## Decision categories

Work through only the categories this item actually needs — a static marketing page may need none of the data-layer questions.

- **Rendering strategy** — CSR, SSR, SSG, or ISR, per route if they differ. State the "why" in one line (SEO need, personalization, build-time data).
- **Data fetching** — where data is read from, request/response shape, caching or revalidation rule.
- **Design tokens** — the color, spacing, and type scale this feature draws from. Point at the existing token source (`AGENTS.md` names it); only define new tokens if none exist yet.
- **Accessibility budget** — the concrete bar: keyboard operability, landmark structure, color contrast ratio, focus visibility. Not "be accessible" — the specific pass/fail checks `trial` will run.
- **Performance budget** — a number, not a feeling: largest bundle addition, an image weight ceiling, a target for largest contentful paint on the slowest supported device.
- **API contract** — request method, path, payload and response shape, error cases, for any new or changed endpoint.

## Steps

1. Read the scope item and `AGENTS.md` first — reuse the project's existing stack and tokens rather than introducing a second system.
2. Decide each open category. State the decision and the one-line reason; skip categories that don't apply rather than padding the spec.
3. Write acceptance criteria as checkable conditions — each one names where its value comes from (an API field, a token, a fixed number), so a gap is visible now instead of surfacing mid-build.
4. If a real unknown remains (a third-party API's actual shape, say), mark the spec `Assumed` instead of blocking — record the assumption plainly and flag it for confirmation once the unknown resolves.
5. Save to `docs/specs/`, update the scope item's status to reference the spec.
6. At `Beta` tier and above, offer — don't run unasked — an independent second-model read of the spec for gaps it didn't settle. Any gap it finds is the developer's to resolve, never auto-applied.

## Handoff

Point to `build` to build against the finished spec.
