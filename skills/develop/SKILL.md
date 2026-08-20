---
name: develop
description: Build a page, component, route, or API endpoint from its spec, wired to the project's existing design tokens and data layer. Use when a spec already exists for the item and it's time to write the code, or when picking up the next todo item from scope.
---

# develop

Builds one scope item at a time, against its spec's acceptance criteria — not past them.

## Steps

1. **Find the work.** No target given: read `docs/scope/` and take the next `todo` item in build order.
2. **Check for a spec.** If the item needs a load-bearing decision (see `architect`'s definition) and none exists, stop and name the missing decision — don't invent one silently. The developer may override and build anyway; if so, record the assumption as an `Assumed` spec in `docs/specs/` before writing code, so the gap is tracked instead of lost.
3. **Read `AGENTS.md`** for the real build/dev commands, routing convention, and where this kind of file lives by project convention. Don't guess a folder structure a scaffolding tool would have generated differently.
4. **Build against the spec's decisions**, not around them: use the token source it named, hit the API contract it defined, meet the accessibility and performance budget it set (semantic elements over ARIA patches, real `<button>`/`<a>` over clickable `<div>`s, images sized and lazy-loaded per the performance row).
5. **Wire it in** — route registration, nav entry, or export — so the feature is reachable, not just present in the tree.
6. **Update the scope item's status** to `in progress` while building, and leave it there; `check verify` or the developer marks it `done`.

## Handoff

Name the workflow depth's suggested next step (from `scope`'s table) and the one command to run it — `check verify` at `Alpha`+, straight to `document`/`sync` at `Prototype`. It's a suggestion: the developer runs or skips it.
