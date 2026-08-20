---
name: log
description: Write the human-facing text for a finished change — PR description, changelog entry, or release note — from the real diff and spec, not from memory of the conversation. Use when a change is ready to open as a PR, land in CHANGELOG.md, or ship as a dated release note.
---

# log

Reads the actual diff and the spec it satisfies before writing a word — never summarizes from what was discussed in chat, which drifts from what shipped.

## Modes

- **`log pr`** — a PR description: what changed and why (from the spec's "why" lines), how to verify it (the acceptance criteria, as a checklist), and anything a reviewer should know that isn't obvious from the diff.
- **`log changelog`** — one entry in `CHANGELOG.md` under "Unreleased," written for the person consuming the package, not the person who built it: what they can now do, not which files changed.
- **`log release-note`** — a dated entry in `docs/releases/`, grouping every changelog entry since the last release into a short narrative, ordered by what users would care about most.

## Steps

1. Run `git diff` (or the equivalent against the merge base) — read it, don't ask the developer to restate what changed.
2. Read the spec(s) the diff satisfies for the "why" and the acceptance criteria; if none exists, say so rather than inventing a rationale.
3. Write in plain, specific language: name the page or flow affected, not "various improvements."
4. Save to the right location for the mode (see above) — never leave the text only in the chat reply.

## Handoff

`pr` output is ready to open; `changelog`/`release-note` output is ready to commit. Point to `sync` next, to reconcile the scope and specs now that the change is logged.
