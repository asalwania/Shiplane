# Shiplane

A set of [Agent Skills](https://agentskills.io) for building on the web — pages, components, routes, and APIs — carried from a rough idea to something shipped, verified in a real browser, and written up. One skill per phase, for any AI coding agent that speaks the Agent Skills format.

Rendering strategy, design tokens, accessibility, and performance aren't an afterthought bolted onto a generic build process here — they're decisions the workflow makes you write down before code gets built, and checks it actually runs in a real browser before you call it done.

```
idea → outline → survey → blueprint → build → trial → test → review → log → sync
```

Run `patch` any time something breaks. Run a bare `outline` any time to see where a project stands.

> 📖 New to the workflow? **[docs/workflow-guide.md](docs/workflow-guide.md)** walks a paginated product listing page all the way from idea to shipped, file by file.

## The skills

| Skill | What it does |
|---|---|
| `outline` | Turns a web product idea into a living, ordered plan of pages, routes, and flows, with a browser/device support target. |
| `survey` | Reads a real web codebase and writes `AGENTS.md`: framework, rendering mode, routing, styling system, build tooling. |
| `blueprint` | Settles a load-bearing decision (rendering strategy, data layer, tokens, a11y/perf budgets, an API contract) and writes it as a spec. |
| `build` | Builds a page, component, route, or endpoint from its spec, wired to the project's tokens. Gates to `blueprint` if a decision is missing. |
| `trial` | Runs the app in a real browser against the spec's acceptance criteria. |
| `test` | Writes component/unit tests and, when the change spans a full journey, an end-to-end test. |
| `review` | A fresh-model read for semantic HTML, CSS architecture, bundle impact, and XSS risk. |
| `log` | Writes the PR body, changelog entry, or release note from the real diff. |
| `sync` | Reconciles `AGENTS.md`, the scope, and spec statuses with what the repo now shows. |
| `patch` | Runs a reproduce → localize → hypothesize → fix → verify loop for a web bug, then hands `test` a regression test. |

## Install

Using [npx skills](https://github.com/vercel-labs/skills):

```bash
# Claude Code (installs into .claude/skills, then restart)
npx skills@latest add asalwania/shiplane -a claude-code

# Generic .agents/skills, read by other Agent Skills clients
npx skills@latest add asalwania/shiplane
```

Works with any Agent Skills client (Claude Code, Cursor, Codex, Gemini CLI, and [more](https://agentskills.io/clients)). Commit the installed skills folder so the whole team shares the same workflow.

## Where to start

**New project:** `outline` the idea → `blueprint` the stack and first page → scaffold it → `survey` to seed `AGENTS.md` from the real project → the feature loop below.

**Existing codebase:** `survey` first, so every skill knows your stack → `outline` the next slice on top of what's already there → the feature loop.

**One small change:** run only what it needs. A bug goes straight to `patch`. A quick fix can be `build` then `trial`.

**Monorepo:** each workspace gets its own `AGENTS.md`, scope, and specs; every skill scopes to the workspace you're working in.

### The feature loop

```
blueprint → build → trial → test → review → log → sync
```

At the end of `outline` you pick a **workflow depth** for the project, overridable per feature: `Prototype` (just `build`, self-checked), `Alpha` (adds `trial`), `Beta` (adds `test`), or `GA` (adds a fresh-model `review` and `log`). It's a suggested tail, not a locked track — you run or skip any step, and `done` is always your call. The one thing every tier asks is that a load-bearing decision gets written down; even that isn't enforced — an unconfirmed one is flagged as `Assumed` in its spec rather than blocking you.

## What gets written, and where

| Artifact | Path | Owner |
|---|---|---|
| Scope | `docs/scope/` | `outline` |
| Specs | `docs/specs/` | `blueprint` |
| Context file | `AGENTS.md` (+ a thin `CLAUDE.md` pointer) | `survey`, kept current by `sync` |
| Review findings | `docs/reviews/` | `trial`, `review` |
| Tests | your test directories | `test` |
| App code | your source tree | `build` |
| Human docs | PR body, `CHANGELOG.md`, `docs/releases/` | `log` |

State lives in these files, not in a chat session — a fresh session picks up exactly where the last one left off, and the workflow works the same for a solo project or a whole team.

## Contributing

Read [docs/conventions.md](docs/conventions.md) before touching a skill — it covers the description format, size budget, and where a template belongs versus prose. Run `npm run check` before opening a PR; it validates every `SKILL.md`'s frontmatter and flags anything over the size budget.

## Learn more

**[docs/workflow-guide.md](docs/workflow-guide.md)** has the full walkthrough: file ownership, the worked example above, and the patch loop picking up a bug weeks after ship.

---

Built on the [Agent Skills](https://agentskills.io) open format.
