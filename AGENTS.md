# AGENTS.md — shiplane

## What this project is

Not a web app. Shiplane is a library of [Agent Skills](https://agentskills.io) — `skills/<name>/SKILL.md` plus bundled files — distributed for other projects to install (`npx skills@latest add asalwania/shiplane`). There's no framework, rendering mode, routing, or styling system to record here; the "codebase" is the skills themselves, and their behavior is what needs staying legible to an agent working on this repo.

- **Language/runtime:** Node (`engines.node >=18` in `package.json`). No dependencies — `npm run check` is deliberately dependency-free so this repo never needs `npm install`.
- **Layout:** `skills/<name>/SKILL.md` (the skills), `docs/workflow-guide.md` (workflow walked through on a real feature), `docs/conventions.md` (how skills here are written), `scripts/` (validation tooling), `README.md` (phase order, install instructions).

## Scripts

| Command | Does |
|---|---|
| `npm run check` | Runs `scripts/check-portability.mjs` — validates every `skills/<name>/SKILL.md`: frontmatter shape (`allowed-tools` present, using `Agent` not the legacy `Task` name), description length (<400 chars), no Claude-only model alias in a spawn directive, no literal "the Agent tool" naming, no PowerShell-unsafe shell glue, and that the shared `<!-- OUTPUT-STYLE:START/END -->` block is present and byte-identical across all `SKILL.md` files. |
| `npm run test` | Alias for `npm run check`. |
| `npm run tokens` | Runs `scripts/analyze-token-usage.mjs` — reports what each skill costs to load. |

## Tooling

- **CI:** [.github/workflows/check.yml](.github/workflows/check.yml) — GitHub Actions, runs `npm run check` on every push to `main` and every PR. This is the only merge gate; there's no test suite beyond the portability check.
- **Project-local subagents** (`.claude/agents/`, Claude Code only — not part of the portable skill set installed by other projects):
  - `researcher` (haiku, `Read, Bash, WebSearch, WebFetch`) — read-only Agent Skill/MCP discovery and doc/source verification, returns a compact summary only.
  - `scout` (haiku, `Read, Grep, Glob`) — read-only repo scanning, returns a compact file/pattern map, never edits.
- **MCP servers:** none configured for this project specifically. (A user-scoped `playwright` MCP server was added 2026-08-20 for browser-driven `trial` runs against `scratch-tick/` — a machine-level config choice, not a shiplane project dependency, so it isn't recorded as this repo's tooling.)

## Conventions

See [docs/conventions.md](docs/conventions.md) for how skills in this repo are written (frontmatter shape, the shared output-style contract, line/byte budgets). Don't duplicate that content here — it's the authoritative source and drifts if restated in two places.
