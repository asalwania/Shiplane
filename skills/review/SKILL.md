---
name: review
description: Give a change a fresh-model senior read of the diff for web-specific issues before it becomes a PR — semantic HTML, CSS architecture, bundle impact, and injection risk. Use when a change is about to become a PR and needs an independent read, offered at Beta tier and above.
---

# review

Reports what it finds. Never edits code, never marks anything `done` — that's the developer's call either way.

## Steps

Read the diff cold, as if reviewing a stranger's PR — don't reuse `build`'s reasoning.

- **Semantic HTML** — right element for the job, heading levels that nest without skipping, landmarks present.
- **CSS architecture** — specificity fights, styles that leak past their component's boundary, hardcoded values that should be tokens.
- **Bundle impact** — a new dependency or a large asset added for a small feature; flag it, don't block on it.
- **Injection/XSS risk** — unescaped user content reaching the DOM, `dangerouslySetInnerHTML`/`innerHTML` equivalents without sanitization, unvalidated input reaching a query.
- Write findings to `docs/reviews/<date>-<feature>-review.md`, ranked by what would actually break something over style nits.

## Handoff

Findings are the developer's to fix or accept — point back to `build` for fixes, or to `log` if the change is otherwise clear to proceed.
