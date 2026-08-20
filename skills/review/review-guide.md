# Guide: the review rubric

Read the diff cold, as if reviewing a stranger's PR; don't reuse `build`'s own reasoning about why it made each choice.

## What to check

- **Semantic HTML**: right element for the job, heading levels that nest without skipping, landmarks present.
- **CSS architecture**: specificity fights, styles that leak past their component's boundary, hardcoded values that should be tokens.
- **Bundle impact**: a new dependency or large asset added for a small feature; flag it, don't block on it alone.
- **Injection and XSS risk**: unescaped user content reaching the DOM, an `innerHTML` equivalent without sanitization, unvalidated input reaching a query.

## Severity

- **Blocker**: would break in production, a real security hole, or directly contradicts the spec's acceptance criteria.
- **Major**: a real problem, not urgent enough to block, but should be fixed before or shortly after merge.
- **Minor or nit**: a style preference or small improvement; worth naming, not worth dwelling on.

## Report format

Rank findings blocker first, then major, then minor. Each finding: `file:line`, what's wrong, why it matters. Note anything that worked but looked fragile (a missing empty state, a console warning) as a minor even if not strictly wrong. Say what the change did well in one line; a review that only lists problems is less useful than one that also confirms what's solid.

Write to `docs/reviews/<date>-<feature>-review.md`.
