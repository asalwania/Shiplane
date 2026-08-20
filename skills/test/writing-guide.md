# Guide: writing the suite

## Classify, then match the strategy

| File is a... | Strategy |
|---|---|
| Component | Render it; assert on rendered output and behavior on interaction (click, type, keyboard), never on internal state. |
| Page/route (a full screen or flow) | An end to end test if the framework's E2E tool is set up, plus component tests of the pieces. |
| API endpoint / server route | Request/response shape, status codes, and the error cases the spec's acceptance criteria named. |
| Plain logic (a util, a hook, a service function) | Inputs → outputs, edge cases, error paths: a unit test per meaningfully distinct case, not one test with five assertions. |

A full user flow spanning multiple pages (checkout, signing up) gets one end to end test, not a unit test per page it touches.

## Regression tests from `patch`

Write it first in a failing state against the code from before the fix, if that's still checked out, then confirm it passes after the fix. That sequence, fail then pass, is what proves the fix actually fixes it, not just that a new test happens to pass.

## Failure paths, not just the happy path

Cover what the spec's acceptance criteria implied could go wrong (a required field missing, a request that 404s) alongside the success case. A suite that only proves success proves less than it looks like.

## Run it

A new test that doesn't run, or that passes without asserting anything meaningful, isn't done. Run the suite; if a test fails because the code under test is genuinely wrong, that's a real finding. Report it, don't quietly loosen the assertion to make it pass.

## Report

Lead with the pass/fail count and where the suite lives, not a restated list of every test written; the test files are the record.
