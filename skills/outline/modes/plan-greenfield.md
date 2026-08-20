# outline mode: plan-greenfield

No code exists yet for this project.

1. Ask what the product is, who uses it, and the two or three flows that matter most. Don't ask about framework or hosting — that's `blueprint`'s call once the idea is clear.
2. Break the idea into pages, routes, or API surfaces, ordered so each item only depends on items above it. A "product listing page" before "product detail page with related items," not the reverse.
3. Record the browser/device support target (e.g. "last 2 versions of evergreen browsers, no IE, mobile-first down to 360px"). Every later `blueprint` and `trial` pass reads this instead of guessing.
4. Ask which delivery approach fits — [approaches/tracer-bullet.md](../approaches/tracer-bullet.md), [approaches/skateboard.md](../approaches/skateboard.md), [approaches/facade.md](../approaches/facade.md), or [approaches/journey.md](../approaches/journey.md) — and record the pick as the project default. Any single feature can override it later.
5. Pick the workflow depth from the table in `SKILL.md` and state it in the file.
6. Write `docs/scope/<project>.md` from the template.

## Handoff

Point to `blueprint` in its `architecture` mode next: the stack itself is still an open decision on a brand-new project.
