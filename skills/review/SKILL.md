---
name: review
allowed-tools: Read, Write, Grep, Glob, Agent, AskUserQuestion
description: Give a change a senior read of the diff on a fresh model, for issues specific to the web (semantic HTML, CSS architecture, bundle impact, and injection risk) before it becomes a PR. Use when a change is about to become a PR and needs an independent read, offered at Beta tier and above.
---

# review

## Output style

<!-- OUTPUT-STYLE:START -->
Everything this skill writes for a person to read (a completion summary, a scope entry, a spec, a review or verify report) states findings and next steps as recommendations, never orders: name the suggested next skill or the pending decision, and let the developer choose to run it, skip it, or override it. Lead with the outcome that matters, and point to the file that holds the detail rather than restating it. Never mark a scope item or spec status done or accepted on this skill's word alone, beyond what this skill owns. Write in plain words: never use an em dash, an en dash, or a hyphen as punctuation. Write `read only`, not `read-only`, or reword the sentence with a comma, a colon, or parentheses. Code, file paths, command flags, and values other skills match on keep their hyphens.
<!-- OUTPUT-STYLE:END -->

Reports what it finds. Never edits code, never marks anything `done`; that's the developer's call either way.

## Steps

1. Spawn the review per [`review-agent-prompt.md`](review-agent-prompt.md), on a model that did not write the code: the one invariant this skill exists to guarantee.
2. The rubric it follows and the report format are in [`review-guide.md`](review-guide.md).
3. Relay the findings, ranked by what would actually break something over style nits.

## Asks vs acts

Acts, with one exception: confirms the author model before spawning a reviewer, since guessing wrong silently turns the review into a review of its own work on the same model. Everything else (scoping, reviewing, writing findings) runs without asking.

## Artifact ownership

Owns `docs/reviews/<date>-<feature>-review.md`. Reads code and diffs; writes no code.

## Handoff

Findings are the developer's to fix or accept: point back to `build` for fixes, or to `log` if the change is otherwise clear to proceed.
