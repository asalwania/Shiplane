---
name: trial
allowed-tools: Bash, Read, Write, AskUserQuestion
description: Prove a change works by running the real app in a browser against the spec's acceptance criteria — not by reading the code. Use when a feature just built needs proving before it's called done, at Alpha tier and above.
---

# trial

## Output style

<!-- OUTPUT-STYLE:START -->
Everything this skill writes for a person to read — a completion summary, a scope entry, a spec, a review or verify report — states findings and next steps as recommendations, never orders: name the suggested next skill or the pending decision, and let the developer choose to run it, skip it, or override it. Lead with the outcome that matters, and point to the file that holds the detail rather than restating it. Never mark a scope item or spec status done or accepted on this skill's say-so alone, beyond what this skill owns.
<!-- OUTPUT-STYLE:END -->

Reports what it finds. Never edits code, never marks anything `done` — that's the developer's call either way. Governed by [verify-guide.md](verify-guide.md): no cited evidence, no pass, no exception.

## Steps

- Run the real app (the dev/build command from `AGENTS.md`) and walk the spec's acceptance criteria as a user would.
- Exercise the flow end to end; note any acceptance criterion that fails and why. Record evidence for each per [verify-guide.md](verify-guide.md) as you go, not from memory afterward.
- Watch the browser console and network tab for errors during the walkthrough — a silently failing request is a fail even if the UI looks fine.
- Check the layout at the support target's breakpoints from `outline` (at minimum: the narrowest and widest listed).
- Tab through the flow keyboard-only: confirm focus is visible and follows a sensible order, and every interactive element is reachable.
- Write the result to `docs/reviews/<date>-<feature>-verify.md`: a pass/fail/blocked line per acceptance criterion with its cited evidence, plus anything found that the spec didn't anticipate.

## Asks vs acts

Acts throughout — it runs the app and records what happens without asking permission at each step. It asks only if it genuinely cannot reach the app (no dev command found, environment won't start), and then it asks what's needed rather than reporting a guessed pass.

## Artifact ownership

Owns `docs/reviews/<date>-<feature>-verify.md`. Reads specs and scope; writes no code, no spec content.

## Handoff

Failures or blocks are the developer's to resolve — point back to `build` for a fix, or name exactly what's needed to unblock. If everything passes, the workflow depth's next step is `test`, `review`, or `log`.
