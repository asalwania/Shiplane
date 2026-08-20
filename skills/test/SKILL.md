---
name: test
description: Write the test suite for code just built or changed — component/unit tests, plus an end-to-end flow when the change touches a full user journey. Use when build or patch just produced a change that needs coverage, or when picking up a regression test handed off from patch.
---

# test

Targets the uncommitted diff by default — don't go hunting for unrelated coverage gaps unless asked.

## Steps

1. **Find the framework**, don't assume one: check `AGENTS.md` first; if this is the first test in the project, ask which the developer wants and record the answer in `AGENTS.md` so this step is skipped next time.
2. **Match the test to what changed:**
   - A component: render it, assert on rendered output and behavior on interaction (click, type, keyboard), not on internal state.
   - A route or API endpoint: request/response shape, status codes, and the error cases the spec's acceptance criteria named.
   - A full user flow spanning multiple pages (checkout, sign-up): one end-to-end test, not a unit test per page.
3. **A regression test from `patch`** gets written first, in a failing state against the pre-fix code if that's still checked out, then confirmed passing after the fix — that's what proves the fix actually fixes it.
4. Cover the failure paths the spec called out (a required field missing, a request that 404s) alongside the happy path — a suite that only proves success proves less than it looks like.
5. Run the suite. A new test that doesn't run, or that passes without asserting anything meaningful, isn't done.

## Handoff

Point to `review` at `Beta`+, or `log` if this was the last step before opening a PR.
