---
name: build
description: Build a page, component, route, or API endpoint from its spec, wired to the project's existing design tokens and data layer. Use when a spec already exists for the item and it's time to write the code, or when picking up the next todo item from outline.
---

# build

Builds one scope item at a time, against its spec's acceptance criteria — not past them.

## Steps

1. **Find the work.** No target given: read `docs/scope/` and take the next `todo` item in build order.
2. **Team-safety and resume checks first** — [flow/git.md](flow/git.md): behind the shared branch, uncommitted work already in the area, a half-built feature to resume rather than restart.
3. **Check for a spec.** If the item needs a load-bearing decision (see `blueprint`'s definition) and none exists, stop and name the missing decision — don't invent one silently. The developer may override and build anyway; if so, record the assumption as an `Assumed` spec in `docs/specs/` before writing code, so the gap is tracked instead of lost.
4. **Read `AGENTS.md`** for the real build/dev commands, routing convention, and where this kind of file lives by project convention. Don't guess a folder structure a scaffolding tool would have generated differently.
5. **Build.** Backend or full-stack work follows the fixed order in [flow/build.md](flow/build.md) (data layer, logic, endpoints, then UI); a pure front-end piece against an already-built API starts straight at [ui-guide.md](ui-guide.md). Logic/data/API detail lives in [logical-guide.md](logical-guide.md).
6. **Wire it in** — route registration, nav entry, or export — so the feature is reachable, not just present in the tree.
7. **Self-check** against [checklist.md](checklist.md) before reporting anything done.
8. **Update the scope item's status** to `in progress` while building, and leave it there; `trial` or the developer marks it `done`.

## Handoff

Name the workflow depth's suggested next step (from `outline`'s table) and the one command to run it — `trial` at `Alpha`+, straight to `log`/`sync` at `Prototype`. It's a suggestion: the developer runs or skips it.
