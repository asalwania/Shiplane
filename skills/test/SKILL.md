---
name: test
allowed-tools: Bash, Read, Write, Edit, Grep, Glob, AskUserQuestion
description: Write the test suite for code just built or changed, component/unit tests, plus an end to end flow when the change touches a full user journey. Use when build or patch just produced a change that needs coverage, or when picking up a regression test handed off from patch.
---

# test

## Output style

<!-- OUTPUT-STYLE:START -->
Everything this skill writes for a person to read (a completion summary, a scope entry, a spec, a review or verify report) states findings and next steps as recommendations, never orders: name the suggested next skill or the pending decision, and let the developer choose to run it, skip it, or override it. Lead with the outcome that matters, and point to the file that holds the detail rather than restating it. Never mark a scope item or spec status done or accepted on this skill's word alone, beyond what this skill owns. Write in plain words: never use an em dash, an en dash, or a hyphen as punctuation. Write `read only`, not `read-only`, or reword the sentence with a comma, a colon, or parentheses. Code, file paths, command flags, and values other skills match on keep their hyphens.
<!-- OUTPUT-STYLE:END -->

Targets the uncommitted diff by default: don't go hunting for unrelated coverage gaps unless asked.

## Steps

1. **First run in this project?** No test framework line recorded in `AGENTS.md` yet: read [`modes/setup.md`](modes/setup.md) first, then continue below.
2. Follow [`agent-prompt.md`](agent-prompt.md), the operating template, for scoping, classifying, writing, and running the suite.
3. Strategy per file type, the regression test sequence, and the report format all live in [`writing-guide.md`](writing-guide.md).

## Asks vs acts

Acts once the framework is known. Asks only on first run (which framework, per [modes/setup.md](modes/setup.md)) and when the scope is genuinely ambiguous (no uncommitted changes).

## Artifact ownership

Owns test files matching the project's recorded pattern, and the testing section of `AGENTS.md` it writes on first run.

## Handoff

Point to `review` at `Beta`+, or `log` if this was the last step before opening a PR.
