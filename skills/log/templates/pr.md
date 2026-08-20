# Template: PR description

```markdown
## What

<1 to 3 sentences: what this PR does, in plain terms.>

## Why

<The motivation. Link the spec if one governs this change, e.g. "Implements docs/specs/0007-rate-limiting.md">

## Changes

- <key change, grouped by intent, not a raw commit dump>
- <key change>

## How to verify

- <the acceptance criteria from the spec, as a checklist a reviewer can run>

## Risk & rollout

<Blast radius, migrations, flags, or rollback notes. Write "Low risk, no migrations, no flags" when that's true.>

## Notes for reviewers

<Anything that helps the review: a tricky decision, a deliberate tradeoff. Omit if nothing.>
```

Group changes by intent, not by file. If `review` findings exist for this change, reference any accepted residual risk under "Risk & rollout." Don't invent verify steps; derive them from the spec's actual acceptance criteria.
