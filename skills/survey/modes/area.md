# survey mode: area

Called against one directory, not the whole repo (e.g. `survey src/auth`): a large or monorepo scale codebase where a single root `AGENTS.md` can't hold every area's local convention.

1. Confirm a root `AGENTS.md` already exists. If not, run a whole repo pass first; an area file assumes the shared conventions are already recorded above it.
2. Inspect only the named directory, same categories as the whole repo pass (framework/rendering, routing, styling, components, build tooling), but note only what's genuinely different from the root file; don't repeat a shared fact locally.
3. Write `<area>/AGENTS.md`, nested inside the directory, stating only the local delta and pointing back to the root file for everything else.

## Handoff

None required unless the area turns out to need its own scope file (a distinct sub product inside a larger app); point to `outline` in `plan-monorepo` mode if so.
