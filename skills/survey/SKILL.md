---
name: survey
allowed-tools: Read, Write, Edit, Grep, Glob, Agent
description: Bootstrap AGENTS.md by inspecting a real web codebase for its framework, rendering mode, routing, styling system, component library, build tooling, and deploy target. Use when onboarding onto an existing codebase, right after blueprint scaffolds a new one, auditing one area of a large codebase, filling gaps in an AGENTS.md missing sections, or recording what agent tooling a project relies on.
---

# survey

## Output style

<!-- OUTPUT-STYLE:START -->
Everything this skill writes for a person to read (a completion summary, a scope entry, a spec, a review or verify report) states findings and next steps as recommendations, never orders: name the suggested next skill or the pending decision, and let the developer choose to run it, skip it, or override it. Lead with the outcome that matters, and point to the file that holds the detail rather than restating it. Never mark a scope item or spec status done or accepted on this skill's word alone, beyond what this skill owns. Write in plain words: never use an em dash, an en dash, or a hyphen as punctuation. Write `read only`, not `read-only`, or reword the sentence with a comma, a colon, or parentheses. Code, file paths, command flags, and values other skills match on keep their hyphens.
<!-- OUTPUT-STYLE:END -->

Produces `AGENTS.md` (plus a two line `CLAUDE.md` pointer to it, for clients that only read that file): the stack facts every other skill in this project assumes are already known.

## What it inspects

Read, don't ask, wherever the answer is in the repo:

- **Framework and rendering mode**: `package.json` dependencies, framework config files (`next.config.*`, `astro.config.*`, `vite.config.*`, etc.) tell you CSR versus SSR versus SSG versus a mix per route.
- **Routing convention**: file based (`app/`, `pages/`, `routes/`) or a router config; note the pattern with one real example path.
- **Styling system**: Tailwind config, CSS Modules, a CSS in JS library, or plain CSS with a naming convention (BEM, etc.). Note where design tokens live if any.
- **Component library**: an internal `components/`/`ui/` directory, or an installed library. Note where new components should live by convention.
- **Build tooling and scripts**: the real `npm`/`pnpm`/`yarn` scripts in `package.json`. Never invent a command that isn't there.
- **Deploy target**: a platform config if one exists; otherwise state "not yet configured."
- **Organizing pattern**: sample two or three real files to check for a recognizable architecture; read the matching file under `patterns/` (`clean-architecture.md`, `domain-driven.md`, `functional.md`, `solid-oop.md`) only if one is actually detected, and record what it says to record.

## Which mode

| Situation | Read |
|---|---|
| Right after `blueprint` scaffolds a brand new project | [`modes/greenfield.md`](modes/greenfield.md) |
| Called against one directory, not the whole repo | [`modes/area.md`](modes/area.md) |
| `AGENTS.md` exists but is missing sections | [`modes/gapfill.md`](modes/gapfill.md) |
| Recording installed MCP servers, agent skills, or CI gates | [`modes/tool-skills.md`](modes/tool-skills.md) |
| Onboarding onto a small to medium existing codebase with no `AGENTS.md` at all | run "What it inspects" directly below, no mode file needed |
| Same, but the codebase is large (hundreds of source files, or several distinct top level areas) | [`modes/large-repo.md`](modes/large-repo.md), which offloads the read so it doesn't flood context |

**Monorepo:** write one root `AGENTS.md` for shared tooling, and use [`modes/area.md`](modes/area.md) per workspace for what differs.

## Asks vs acts

Acts. It reads the repo and writes what it finds; it never asks the developer to state a fact that's already visible in a config file or a real file it can sample.

## Artifact ownership

Owns `AGENTS.md` and the `CLAUDE.md` pointer. `sync` corrects individual stale facts as drift is found; only `survey` regenerates a section from scratch, reserved for a real change to the stack itself.

## Handoff

Once `AGENTS.md` exists, point to `outline` (brownfield: plan the next slice on top of what's enrolled) or `blueprint` (a decision is already known to be open). Keeping `AGENTS.md` current after this point is `sync`'s job, not a repeat `survey` run.
