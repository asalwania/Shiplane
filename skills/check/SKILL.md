---
name: check
description: Confirm a change is ready before merge, in two modes — "check verify" runs the app in a real browser against the spec's acceptance criteria, "check review" is a fresh-model senior read of the diff for web-specific issues. Use when a feature just built needs proving in a real browser (verify), or when a change is about to become a PR and needs an independent read (review).
---

# check

Reports what it finds. Never edits code, never marks anything `done` — that's the developer's call either way.

## `check verify`

Run the real app (the dev/build command from `AGENTS.md`) and walk the spec's acceptance criteria as a user would, not by reading the code.

- Exercise the flow end to end; note any acceptance criterion that fails and why.
- Watch the browser console and network tab for errors during the walkthrough — a silently failing request is a fail even if the UI looks fine.
- Check the layout at the support target's breakpoints from `scope` (at minimum: the narrowest and widest listed).
- Tab through the flow keyboard-only: confirm focus is visible and follows a sensible order, and every interactive element is reachable.
- Write the result to `docs/reviews/<date>-<feature>-verify.md`: a pass/fail line per acceptance criterion, plus anything found that the spec didn't anticipate.

## `check review`

Read the diff cold, as if reviewing a stranger's PR — don't reuse `develop`'s reasoning.

- **Semantic HTML** — right element for the job, heading levels that nest without skipping, landmarks present.
- **CSS architecture** — specificity fights, styles that leak past their component's boundary, hardcoded values that should be tokens.
- **Bundle impact** — a new dependency or a large asset added for a small feature; flag it, don't block on it.
- **Injection/XSS risk** — unescaped user content reaching the DOM, `dangerouslySetInnerHTML`/`innerHTML` equivalents without sanitization, unvalidated input reaching a query.
- Write findings to `docs/reviews/<date>-<feature>-review.md`, ranked by what would actually break something over style nits.

## Handoff

`verify` failures and `review` findings are the developer's to fix or accept — point back to `develop` for fixes, or to `test`/`document` if the change is otherwise clear to proceed.
