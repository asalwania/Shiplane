---
name: log
allowed-tools: Bash, Read, Write, AskUserQuestion
description: Write the text a person reads about a finished change (PR description, changelog entry, release note, or postmortem) from the real diff and spec, not from memory of the conversation. Use when a change is ready to open as a PR, land in CHANGELOG.md, ship as a dated release note, or when an incident needs writing up after a patch.
---

# log

## Output style

<!-- OUTPUT-STYLE:START -->
Everything this skill writes for a person to read (a completion summary, a scope entry, a spec, a review or verify report) states findings and next steps as recommendations, never orders: name the suggested next skill or the pending decision, and let the developer choose to run it, skip it, or override it. Lead with the outcome that matters, and point to the file that holds the detail rather than restating it. Never mark a scope item or spec status done or accepted on this skill's word alone, beyond what this skill owns. Write in plain words: never use an em dash, an en dash, or a hyphen as punctuation. Write `read only`, not `read-only`, or reword the sentence with a comma, a colon, or parentheses. Code, file paths, command flags, and values other skills match on keep their hyphens.
<!-- OUTPUT-STYLE:END -->

Reads the actual diff and the spec it satisfies before writing a word; never summarizes from what was discussed in chat, which drifts from what shipped. [`agent-prompt.md`](agent-prompt.md) is the writing guide every mode follows.

## Modes

| Mode | Source | Template |
|---|---|---|
| `log pr` | branch commits plus the diff against the base | [`templates/pr.md`](templates/pr.md) |
| `log changelog` | the merged change | [`templates/changelog.md`](templates/changelog.md) |
| `log release-note` | a tag or version range | [`templates/release-note.md`](templates/release-note.md) |
| `log postmortem` | an incident (developer described, plus any `/patch` record) | [`templates/postmortem.md`](templates/postmortem.md) |

## Steps

1. Run `git diff` (or the equivalent against the merge base); read it, don't ask the developer to restate what changed.
2. Read the spec(s) the diff satisfies for the "why" and the acceptance criteria; if none exists, say so rather than inventing a rationale.
3. Follow [`agent-prompt.md`](agent-prompt.md) and the mode's template to write the document.
4. Save to the right location for the mode; never leave the text only in the chat reply (`pr` is always also shown in full in chat, since it needs to work without a `gh` remote).

## Asks vs acts

Acts, with one exception: for `release-note`, if no version tags exist yet, ask for a version name and range rather than guessing one.

## Artifact ownership

Owns PR text, `CHANGELOG.md` entries, `docs/releases/`, and `docs/postmortems/`. Writes nothing else: no code, no specs.

## Handoff

`pr` output is ready to open; `changelog`/`release-note`/`postmortem` output is ready to commit. Point to `sync` next, to reconcile the scope and specs now that the change is logged.
