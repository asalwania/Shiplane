# Project: Shiplane

A set of Agent Skills for building on the web — pages, components, routes, and APIs — phase by phase. Nothing is mandatory: run whichever skill the change in front of you needs, in whatever order fits.

## Ground rules

- **The developer owns "done."** A skill recommends a next step and a workflow depth (`Prototype` / `Alpha` / `Beta` / `GA`); it never blocks completion on unchecked boxes.
- **Web concerns live inside the phase that owns them**, not bolted on at the end: rendering strategy and design tokens are `blueprint` decisions, browser/console verification is `trial`, semantic HTML and bundle impact are `review`.
- **State lives in files** (`docs/scope/`, `docs/specs/`, `AGENTS.md`), not in chat, so work survives across sessions.
- **Keep `SKILL.md` lean.** It loads in full on every run. Long or rarely-needed content moves to a bundled file the skill reads only when needed.

## Layout

- `skills/<name>/SKILL.md` — the skills themselves, installable via any Agent Skills client.
- `docs/workflow-guide.md` — what the workflow is, walked through on a real feature.
- `docs/conventions.md` — how skills in this project are written.

See `README.md` for the phase order and install instructions.
