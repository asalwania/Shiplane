# Writing a skill for this project

These are the house rules for every `SKILL.md` in `skills/`. They exist so ten skills written at different times still read like one project.

## The description is the router

An agent picks a skill by its frontmatter `description` alone, before reading a single line of the body. Every description follows the same two-sentence shape: what the skill produces, then "Use when [triggers]" naming the concrete situations that should fire it. A description that could describe two skills in this project is a bug — tighten the triggers until it can't.

## One phase, one job

A skill does the thing its name says and nothing past it. `build` builds; it does not also decide the rendering strategy — that's a gap it hands to `blueprint`. `trial` and `review` confirm; they do not fix what they find — they report, and the developer decides. Resist the pull to make a skill "helpful" by absorbing the next phase's job; that's how phases stop being legible.

## Structure before prose

Every skill that produces a durable file (a spec, a scope entry, a review) ships a template for that file as a separate bundled resource. The template carries the shape — headings, required fields, a worked example — and the skill body carries only the judgment calls: what belongs in each field, when a field can be skipped, what a bad answer looks like. Don't duplicate the template's shape in prose inside `SKILL.md`.

## Read on demand, not inline

Once a skill has more than one real branch (a mode, a delivery approach, a per-surface guide), split each branch into its own file — `modes/`, `flow/`, `ui/`, `patterns/`, `approaches/`, `internal/`, one level deep — and have `SKILL.md` read the one branch a given run needs, named by an explicit trigger ("first run, no `test-preferences.json` yet → read `modes/setup.md`"). `SKILL.md` becomes the router: it stays short because it never carries a branch's content, only the condition that sends the agent to read it. Don't split a skill that has no real branches yet — a single `if X, read Y` file for content that's short and always relevant is overhead, not discipline.

## Size discipline

- `SKILL.md` targets under 100 lines (hard budget 220). It loads in full on every invocation of that skill, so every line is a cost paid repeatedly, not once.
- A bundled file (mode, template, reference) is unbounded in principle but should earn its length — cut anything that doesn't change what gets written or checked.
- A skill's **bundle** — `SKILL.md` plus every file it can read on demand — targets under 48KB, hard budget 96KB. This isn't what loads on every run (the router plus one branch is), but it bounds the worst case and catches decomposition quietly turning into duplication. A warning means prune or split the skill further, not raise the ceiling; a budget that's routinely raised stops meaning anything.
- Run `npm run check` before committing a skill edit. It flags missing frontmatter fields, `SKILL.md` files past the size budget, a bundle past its budget, and a missing OpenAI adapter. `npm run tokens` gives the same numbers as a plain report, for spotting where a skill's weight actually is.

## Ship the OpenAI adapter alongside the skill

Every skill carries `skills/<name>/agents/openai.yaml` so it installs for Codex users without a second copy of the instructions — the adapter is interface metadata only (`display_name`, `short_description`, `default_prompt`), never a place to restate what `SKILL.md` already says. Add one whenever a new skill folder is added; `npm run check` fails a skill missing it.

## Name the check, skip the lecture

When a skill instructs a web-specific check ("confirm focus order survives a keyboard-only pass"), state it as an instruction, not an explainer. Assume the agent following the skill already knows why keyboard focus order matters; if it didn't, restating it here wouldn't teach it in time to matter. Reserve an explanation only for a term this project itself defines (like "workflow depth" below) — spell those out once, in the skill that introduces them, and have every other skill reference it by name instead of re-explaining it.

## Terms this project defines

- **Workflow depth** — `Prototype` / `Alpha` / `Beta` / `GA`. Set by `outline`, overridable per feature. Defined in full in `skills/outline/SKILL.md`; every other skill just names the tier it applies to.
- **Load-bearing decision** — a choice that later work would have to be redone to reverse (a rendering strategy, a data shape, a design token set). Defined in `skills/blueprint/SKILL.md`.

## Before opening a PR against this repo

- [ ] Description has a "Use when" clause with concrete triggers.
- [ ] `SKILL.md` and the skill's bundle are both under budget (`npm run check` passes).
- [ ] Any new template or mode file lives in the skill's own folder, one level deep, and `SKILL.md` names the explicit trigger that reads it.
- [ ] `agents/openai.yaml` exists with `display_name`, `short_description`, and `default_prompt`.
- [ ] No rule from this file is restated inside the skill body — link back here instead.
