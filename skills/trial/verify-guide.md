# Guide: the evidence gate

`trial` exists to prove a change works by running it — not by reading the code and reasoning that it should work. These rules are literal, not guidance to weigh.

## Keep an evidence ledger

For every acceptance criterion you exercise, record the artifact that proves you exercised it, at the moment you observe it:

| What you exercised | Evidence to record |
|---|---|
| A UI flow | the URL loaded, what rendered, and any error state seen |
| An API call | the exact request, the status code, and the key response fields |
| A CLI or background job | the exact command, its exit code, and the output |

Cite this evidence in the report. A criterion with no recorded evidence is not passed, however confident you are.

## Verdict rules

- **No evidence, no pass.** A criterion is `met` only if you can point to the ledger entry that proves it. If you can't, it's `blocked`, not `met`.
- **Never started, never pass.** If the app was never actually run this pass — no dev server, no request sent — every criterion is `blocked`. Say plainly that nothing was exercised, and why.
- **A tool you couldn't use is a block, not a pass.** No way to drive the browser, no reachable environment, missing test data: each blocks the criteria that needed it. "Looks right in the code" is the exact failure this skill exists to prevent.
- **Say what you didn't check.** List every unexercised criterion under Blocked. A partial run reported as a full pass is worse than no run at all.

## Verdict

- **PASS** — every criterion has cited evidence and passed.
- **FAIL** — at least one criterion was exercised and failed.
- **BLOCKED** — at least one criterion couldn't be exercised, and none failed.

A fabricated PASS is the one output this skill must never produce; `test` and the developer both trust it.
