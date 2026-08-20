---
name: survey
description: Bootstrap AGENTS.md context files by inspecting a real web codebase for its framework, rendering mode, routing convention, styling system, component library, build tooling, deploy target, and organizing architecture pattern. Use when onboarding onto an existing web codebase, right after blueprint scaffolds a new one, auditing just one area of a large codebase, filling gaps in an AGENTS.md that's missing sections, or recording what agent tooling a project already relies on.
---

# survey

Produces `AGENTS.md` (plus a two-line `CLAUDE.md` pointer to it, for clients that only read that file) — the stack facts every other skill in this project assumes are already known.

## What it inspects

Read, don't ask, wherever the answer is in the repo:

- **Framework and rendering mode** — `package.json` dependencies, framework config files (`next.config.*`, `astro.config.*`, `vite.config.*`, etc.) tell you CSR vs SSR vs SSG vs a mix per route.
- **Routing convention** — file-based (`app/`, `pages/`, `routes/`) or a router config; note the pattern with one real example path.
- **Styling system** — Tailwind config, CSS Modules, a CSS-in-JS library, or plain CSS with a naming convention (BEM, etc.). Note where design tokens live if any.
- **Component library** — an internal `components/`/`ui/` directory, or an installed library. Note where new components should live by convention.
- **Build tooling and scripts** — the real `npm`/`pnpm`/`yarn` scripts in `package.json`. Never invent a command that isn't there.
- **Deploy target** — a platform config if one exists; otherwise state "not yet configured."
- **Organizing pattern** — sample two or three real files to check for a recognizable architecture; read the matching file under `patterns/` (`clean-architecture.md`, `domain-driven.md`, `functional.md`, `solid-oop.md`) only if one is actually detected, and record what it says to record.

## Which mode

| Situation | Read |
|---|---|
| Right after `blueprint` scaffolds a brand-new project | [modes/greenfield.md](modes/greenfield.md) |
| Called against one directory, not the whole repo | [modes/area.md](modes/area.md) |
| `AGENTS.md` exists but is missing sections | [modes/gapfill.md](modes/gapfill.md) |
| Recording installed MCP servers / agent skills / CI gates | [modes/tool-skills.md](modes/tool-skills.md) |
| Onboarding onto an existing codebase with no `AGENTS.md` at all | run "What it inspects" directly below, no mode file needed |

**Monorepo:** write one root `AGENTS.md` for shared tooling, and use [modes/area.md](modes/area.md) per workspace for what differs.

## Asks vs acts

Acts. It reads the repo and writes what it finds; it never asks the developer to state a fact that's already visible in a config file or a real file it can sample.

## Artifact ownership

Owns `AGENTS.md` and the `CLAUDE.md` pointer. `sync` corrects individual stale facts as drift is found; only `survey` regenerates a section from scratch, reserved for a real stack-level change.

## Handoff

Once `AGENTS.md` exists, point to `outline` (brownfield: plan the next slice on top of what's enrolled) or `blueprint` (a decision is already known to be open). Keeping `AGENTS.md` current after this point is `sync`'s job, not a repeat `survey` run.
