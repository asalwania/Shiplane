---
name: scope
description: Turn a web product idea into a living, ordered plan of the pages, routes, and flows to build, with a browser/device support target and a workflow depth. Use when starting a new web project, planning the next slice of an existing one, or checking where an in-flight project stands with no other arguments given.
---

# scope

Produces `docs/scope/<project>.md`: the ordered list of what to build next, kept current as work ships. Use [scope-template.md](scope-template.md) for the file shape.

## Workflow depth

Every scoped project picks one tier, recorded at the top of the scope file. It sets the *suggested* tail of checks after `develop` — never a lock; override it per feature anytime.

| Tier | Adds |
|---|---|
| `Prototype` | Nothing — `develop`, self-checked. For throwaway spikes. |
| `Alpha` | `check verify` — prove it runs in a real browser. |
| `Beta` | + `test` — a real suite, not just a manual pass. |
| `GA` | + `check review` and `document` — a second-model read and public-facing writeup. |

## Steps

1. **Read what exists.** If `docs/scope/` already has a file for this project, read it — you're updating, not starting over. If `AGENTS.md` exists, read it for the current stack.
2. **Greenfield** (no code yet): ask what the product is, who uses it, and the two or three flows that matter most. Don't ask about framework or hosting — that's `architect`'s call once the idea is clear.
3. **Brownfield** (code exists, no scope file yet): read the routes/pages that already exist and enroll them as "shipped" before planning new work, so the file reflects reality on day one.
4. **Break the idea into pages, routes, or API surfaces**, ordered so each item only depends on items above it. A "product listing page" before "product detail page with related items," not the reverse.
5. **Record the browser/device support target** (e.g. "last 2 versions of evergreen browsers, no IE, mobile-first down to 360px"). Every later `architect` and `check verify` pass reads this instead of guessing.
6. **Pick the workflow depth** from the table above and state it in the file.
7. **Write or update** `docs/scope/<project>.md` from the template. Mark each item `todo` / `in progress` / `done`; never delete a shipped item, so the file stays a record.

## When called with no arguments

Read the scope file(s) under `docs/scope/`, report status per item in one line each, and name the next `todo` item. Don't re-interview the developer.

## Handoff

Point to `architect` for the first item that has an open load-bearing decision, or straight to `develop` if the decision already exists.
