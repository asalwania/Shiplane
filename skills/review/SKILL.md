---
name: review
description: Give a change a fresh-model senior read of the diff for web-specific issues before it becomes a PR — semantic HTML, CSS architecture, bundle impact, and injection risk. Use when a change is about to become a PR and needs an independent read, offered at Beta tier and above.
---

# review

Reports what it finds. Never edits code, never marks anything `done` — that's the developer's call either way.

## Steps

1. Spawn the review per [review-agent-prompt.md](review-agent-prompt.md) — on a model that did not write the code, the one invariant this skill exists to guarantee.
2. The rubric it follows and the report format are in [review-guide.md](review-guide.md).
3. Relay the findings, ranked by what would actually break something over style nits.

## Asks vs acts

Acts, with one exception: confirms the author model before spawning a reviewer, since guessing wrong silently turns the review into a same-model review of its own work. Everything else — scoping, reviewing, writing findings — runs without asking.

## Artifact ownership

Owns `docs/reviews/<date>-<feature>-review.md`. Reads code and diffs; writes no code.

## Handoff

Findings are the developer's to fix or accept — point back to `build` for fixes, or to `log` if the change is otherwise clear to proceed.
