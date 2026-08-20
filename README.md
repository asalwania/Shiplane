# Shiplane

A set of [Agent Skills](https://agentskills.io) for building on the web — pages, components, routes, and APIs — carried from a rough idea to something shipped, verified in a real browser, and written up. One skill per phase, for any AI coding agent that speaks the Agent Skills format.

Rendering strategy, design tokens, accessibility, and performance aren't an afterthought bolted onto a generic build process here — they're decisions the workflow makes you write down before code gets built, and checks it actually runs in a real browser before you call it done.

```
idea → scope → audit → architect → develop → check verify → test → check review → document → sync
```

Run `debug` any time something breaks. Run a bare `scope` any time to see where a project stands.

> 📖 New to the workflow? **[docs/workflow-guide.md](docs/workflow-guide.md)** walks a paginated product listing page all the way from idea to shipped, file by file.

## The skills

| Skill | What it does |
|---|---|
| `scope` | Turns a web product idea into a living, ordered plan of pages, routes, and flows, with a browser/device support target. |
| `audit` | Reads a real web codebase and writes `AGENTS.md`: framework, rendering mode, routing, styling system, build tooling. |
| `architect` | Settles a load-bearing decision (rendering strategy, data layer, tokens, a11y/perf budgets, an API contract) and writes it as a spec. |
| `develop` | Builds a page, component, route, or endpoint from its spec, wired to the project's tokens. Gates to `architect` if a decision is missing. |
| `check` | `verify` runs the app in a real browser against the spec; `review` is a fresh-model read for semantic HTML, CSS architecture, bundle impact, and XSS risk. |
| `test` | Writes component/unit tests and, when the change spans a full journey, an end-to-end test. |
| `document` | Writes the PR body, changelog entry, or release note from the real diff. |
| `sync` | Reconciles `AGENTS.md`, the scope, and spec statuses with what the repo now shows. |
| `debug` | Runs a reproduce → localize → hypothesize → fix → verify loop for a web bug, then hands `test` a regression test. |

## Install

Using [npx skills](https://github.com/vercel-labs/skills):

```bash
# Claude Code (installs into .claude/skills, then restart)
npx skills@latest add <your-org>/shiplane -a claude-code

# Generic .agents/skills, read by other Agent Skills clients
npx skills@latest add <your-org>/shiplane
```

Works with any Agent Skills client (Claude Code, Cursor, Codex, Gemini CLI, and [more](https://agentskills.io/clients)). Commit the installed skills folder so the whole team shares the same workflow.

## Where to start

**New project:** `scope` the idea → `architect` the stack and first page → scaffold it → `audit` to seed `AGENTS.md` from the real project → the feature loop below.

**Existing codebase:** `audit` first, so every skill knows your stack → `scope` the next slice on top of what's already there → the feature loop.

**One small change:** run only what it needs. A bug goes straight to `debug`. A quick fix can be `develop` then `check verify`.

**Monorepo:** each workspace gets its own `AGENTS.md`, scope, and specs; every skill scopes to the workspace you're working in.

### The feature loop

```
architect → develop → check verify → test → check review → document → sync
```

At the end of `scope` you pick a **workflow depth** for the project, overridable per feature: `Prototype` (just `develop`, self-checked), `Alpha` (adds `check verify`), `Beta` (adds `test`), or `GA` (adds a fresh-model `check review` and `document`). It's a suggested tail, not a locked track — you run or skip any step, and `done` is always your call. The one thing every tier asks is that a load-bearing decision gets written down; even that isn't enforced — an unconfirmed one is flagged as `Assumed` in its spec rather than blocking you.

## What gets written, and where

| Artifact | Path | Owner |
|---|---|---|
| Scope | `docs/scope/` | `scope` |
| Specs | `docs/specs/` | `architect` |
| Context file | `AGENTS.md` (+ a thin `CLAUDE.md` pointer) | `audit`, kept current by `sync` |
| Review findings | `docs/reviews/` | `check` |
| Tests | your test directories | `test` |
| App code | your source tree | `develop` |
| Human docs | PR body, `CHANGELOG.md`, `docs/releases/` | `document` |

State lives in these files, not in a chat session — a fresh session picks up exactly where the last one left off, and the workflow works the same for a solo project or a whole team.

## Contributing

Read [docs/conventions.md](docs/conventions.md) before touching a skill — it covers the description format, size budget, and where a template belongs versus prose. Run `npm run check` before opening a PR; it validates every `SKILL.md`'s frontmatter and flags anything over the size budget.

## Learn more

**[docs/workflow-guide.md](docs/workflow-guide.md)** has the full walkthrough: file ownership, the worked example above, and the debug loop picking up a bug weeks after ship.

---

Built on the [Agent Skills](https://agentskills.io) open format.
