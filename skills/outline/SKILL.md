---
name: outline
allowed-tools: Bash, Read, Write, Edit, Grep, Glob, AskUserQuestion
description: Turn a web product idea into a living, ordered plan of the pages, routes, and flows to build, with a browser/device support target, a delivery approach, and a workflow depth. Use when starting a new web project, planning the next slice of an existing one, enrolling one new named feature, working in a monorepo, or checking where an in-flight project stands with no other arguments given.
---

# outline

## Output style

<!-- OUTPUT-STYLE:START -->
Everything this skill writes for a person to read — a completion summary, a scope entry, a spec, a review or verify report — states findings and next steps as recommendations, never orders: name the suggested next skill or the pending decision, and let the developer choose to run it, skip it, or override it. Lead with the outcome that matters, and point to the file that holds the detail rather than restating it. Never mark a scope item or spec status done or accepted on this skill's say-so alone, beyond what this skill owns.
<!-- OUTPUT-STYLE:END -->

Produces `docs/scope/<project>.md`: the ordered list of what to build next, kept current as work ships. Use [outline-template.md](outline-template.md) for the file shape.

## Workflow depth

Every scoped project picks one tier, recorded at the top of the scope file. It sets the *suggested* tail of checks after `build` — never a lock; override it per feature anytime.

| Tier | Adds |
|---|---|
| `Prototype` | Nothing — `build`, self-checked. For throwaway spikes. |
| `Alpha` | `trial` — prove it runs in a real browser. |
| `Beta` | + `test` — a real suite, not just a manual pass. |
| `GA` | + `review` and `log` — a second-model read and public-facing writeup. |

## Which mode

1. Read what exists first — always. If `docs/scope/` already has a file for this project, you're updating, not starting over. If `AGENTS.md` exists, read it for the current stack.
2. Pick the mode:

| Situation | Read |
|---|---|
| No target given, and a scope file exists | [modes/replan.md](modes/replan.md) |
| One new named feature, scope file already exists | [modes/add.md](modes/add.md) |
| The repo is a monorepo | [modes/plan-monorepo.md](modes/plan-monorepo.md) |
| No code exists yet | [modes/plan-greenfield.md](modes/plan-greenfield.md) |
| Code exists, no scope file yet | [modes/plan-brownfield.md](modes/plan-brownfield.md) |

Every planning mode picks a delivery approach — read the one that fits from `approaches/{tracer-bullet,skateboard,facade,journey}.md` — and never delete a shipped item from the file, so it stays a record.

## Handoff

Each mode file states its own handoff.
