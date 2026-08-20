# Spawn template: review subagent on a different model

The one rule this file exists to guarantee: the review runs on a model that did not write the code, because a model reviewing its own output shares its blind spots.

## 1. Determine the author model, then pick a different reviewer

Don't rely on the code's author claiming its own identity; check durable config (session/environment model setting) for what actually generated the code. Confirm with one question if genuinely ambiguous: "Which model wrote this? I'll review with a different one." Skip the question only when detection was unambiguous.

Map to a reviewer that differs from the author. If no differing model is available in this environment, review inline on the author's model and say so plainly in the report: a degraded review, not the guarantee of a different model reviewing it. Never silently accept a review on the same model as if it were independent.

## 2. Scope the change set

Names only here; let the subagent read the actual diff. Resolve the base branch (`main`, falling back to `master`), the current branch, and whether this is uncommitted work on the base branch or a feature branch (review everything that differs from the base). Exclude lock files and generated output from the count.

If the change set is empty, stop and say so; don't spawn.

## 3. Spawn

- **model**: the reviewer model chosen in step 1, confirmed different from the author.
- **tools**: `Read`, `Grep`, `Glob`, `Bash`, no `Edit`. The reviewer reports; it does not change code.
- **prompt**: pass the diff scope (base, current branch, mode), the absolute path to `AGENTS.md`, the absolute path to [`review-guide.md`](review-guide.md) (the rubric to follow), and the output path `docs/reviews/<date>-<feature>-review.md`. Instruct it to run the diff itself and read the changed files, not to rely on a summary.

## 4. Relay

If the subagent errored or wrote nothing, say so and offer to run it again; never relay a fabricated or empty review. Otherwise relay its findings per [`review-guide.md`](review-guide.md)'s report format.
