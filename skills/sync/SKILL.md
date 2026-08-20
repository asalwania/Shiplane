---
name: sync
description: Reconcile AGENTS.md, the scope, and spec statuses with what the repository actually shows after a merge. Use when a change has just merged, or when the docs seem to have drifted from the code — a command in AGENTS.md that no longer exists, a scope item stuck "in progress" for a feature that shipped.
---

# sync

Makes small, surgical edits to bring docs back in line with reality. It adds lines and corrects single lines it owns — it does not rewrite a whole section or touch curated prose a person wrote by hand.

## Steps

1. **Scope:** for each item not already `done`, check whether the code now backing it actually exists and is reachable (routed, exported, wired in). If so, mark it `done`; if a `todo` item was actually completed as a side effect of other work, mark it too rather than leaving stale rows.
2. **Specs:** for each `Assumed` spec, check whether its assumption has since been confirmed (the real API shape observed, the token system settled) and flip it to `Ratified` if so; otherwise leave the flag standing — it's a reminder, not a blocker.
3. **AGENTS.md:** re-check the facts against the repo — a script that was renamed, a styling system that was swapped, a new deploy target. Correct only the lines that are now wrong; don't regenerate the whole file (that's `survey`'s job, for a stack-level change).
4. Report what changed as a short diff-shaped summary, not a restatement of the files' full contents.

## Handoff

None required — this is the closing step. If drift turns out to be large (a stack actually changed), point to `survey` instead of patching around it.
