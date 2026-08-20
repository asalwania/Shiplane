---
name: sync
allowed-tools: Bash, Read, Edit, Grep, Glob
description: Reconcile AGENTS.md, the scope, and spec statuses with what the repository actually shows after a merge. Use when a change has just merged, or when the docs seem to have drifted from the code — a command in AGENTS.md that no longer exists, a scope item stuck "in progress" for a feature that shipped.
---

# sync

## Output style

<!-- OUTPUT-STYLE:START -->
Everything this skill writes for a person to read — a completion summary, a scope entry, a spec, a review or verify report — states findings and next steps as recommendations, never orders: name the suggested next skill or the pending decision, and let the developer choose to run it, skip it, or override it. Lead with the outcome that matters, and point to the file that holds the detail rather than restating it. Never mark a scope item or spec status done or accepted on this skill's say-so alone, beyond what this skill owns.
<!-- OUTPUT-STYLE:END -->

Makes small, surgical edits to bring docs back in line with reality — adds lines and corrects single lines it owns. It does not rewrite a whole section or touch curated prose a person wrote by hand. Follow [agent-prompt.md](agent-prompt.md) for the per-file steps.

## Asks vs acts

Acts throughout — reconciliation is a read-the-repo-and-correct task, not a decision that needs the developer's input.

## Artifact ownership

The only skill allowed to correct drift in `docs/scope/`, `docs/specs/` status lines, and `AGENTS.md` after the fact. Never regenerates a file from scratch — that's `outline`'s or `survey`'s job for a real replan or stack change.

## Handoff

None required — this is the closing step. If drift turns out to be large (a stack actually changed), point to `survey` instead of patching around it.
