---
name: audit
description: Bootstrap AGENTS.md context files by inspecting a real web codebase for its framework, rendering mode, routing convention, styling system, component library, build tooling, and deploy target. Use when onboarding onto an existing web codebase, or right after architect scaffolds a new one so later skills stop re-deriving the stack from scratch.
---

# audit

Produces `AGENTS.md` (plus a two-line `CLAUDE.md` pointer to it, for clients that only read that file) — the stack facts every other skill in this project assumes are already known.

## What it inspects

Read, don't ask, wherever the answer is in the repo:

- **Framework and rendering mode** — `package.json` dependencies, framework config files (`next.config.*`, `astro.config.*`, `vite.config.*`, etc.) tell you CSR vs SSR vs SSG vs a mix per route.
- **Routing convention** — file-based (`app/`, `pages/`, `routes/`) or a router config; note the pattern with one real example path.
- **Styling system** — Tailwind config, CSS Modules, a CSS-in-JS library, or plain CSS with a naming convention (BEM, etc.). Note where design tokens live if any (`tailwind.config.*`, a `tokens.json`, CSS custom properties file).
- **Component library** — an internal `components/` or `ui/` directory, or an installed library (shadcn/ui, MUI, Chakra). Note where new components should live by convention.
- **Build tooling and scripts** — the real `npm`/`pnpm`/`yarn` scripts in `package.json`: dev, build, test, lint. Never invent a command that isn't there.
- **Deploy target** — a platform config (`vercel.json`, `netlify.toml`, a Dockerfile, a CI deploy step) if one exists; otherwise state "not yet configured."

## Steps

1. Read `package.json`, lockfile name (to confirm the package manager), and every config file in the repo root before opening source files.
2. Sample two or three real files per area above (a route, a component, a style file) to confirm the convention holds, not just what a config claims.
3. Write `AGENTS.md` at the repo root with one section per area, each stating the fact and the file(s) it was read from, so a future audit can spot drift.
4. **Monorepo:** write one root `AGENTS.md` for shared tooling, and a nested `AGENTS.md` per workspace for what differs (its own framework, scripts, deploy target).
5. Write or refresh `CLAUDE.md` as a two-line pointer: "See AGENTS.md for stack, commands, and conventions." Never duplicate content into it.

## Handoff

Once `AGENTS.md` exists, point to `scope` (brownfield: plan the next slice on top of what's enrolled) or `architect` (a decision is already known to be open).

Keeping `AGENTS.md` current after this point is `sync`'s job, not a repeat `audit` run — only re-run this skill after a stack-level change (new framework, new styling system).
