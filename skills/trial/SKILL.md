---
name: trial
description: Prove a change works by running the real app in a browser against the spec's acceptance criteria — not by reading the code. Use when a feature just built needs proving before it's called done, at Alpha tier and above.
---

# trial

Reports what it finds. Never edits code, never marks anything `done` — that's the developer's call either way.

## Steps

- Run the real app (the dev/build command from `AGENTS.md`) and walk the spec's acceptance criteria as a user would.
- Exercise the flow end to end; note any acceptance criterion that fails and why.
- Watch the browser console and network tab for errors during the walkthrough — a silently failing request is a fail even if the UI looks fine.
- Check the layout at the support target's breakpoints from `outline` (at minimum: the narrowest and widest listed).
- Tab through the flow keyboard-only: confirm focus is visible and follows a sensible order, and every interactive element is reachable.
- Write the result to `docs/reviews/<date>-<feature>-verify.md`: a pass/fail line per acceptance criterion, plus anything found that the spec didn't anticipate.

## Handoff

Failures are the developer's to fix — point back to `build`. If everything passes, the workflow depth's next step is `test`, `review`, or `log`.
