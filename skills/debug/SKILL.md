---
name: debug
description: Run a disciplined root-cause loop for a web bug — a console error, a broken layout, a hydration mismatch, a failed request, an event that won't fire — and hand a regression test to test once fixed. Use when something is throwing, rendering wrong, or behaving differently than the spec or the developer expects.
---

# debug

A loop, not a guess-and-check: reproduce, localize, hypothesize, fix, verify. Not tied to any workflow depth — run it the moment something breaks.

## Steps

1. **Reproduce first.** Get the exact steps and environment (browser, viewport, logged-in state) that trigger it. A bug you can't reproduce, you can't confirm you fixed.
2. **Localize before theorizing.** Narrow to the smallest unit that still fails: which component, which request, which line — using the browser console, network tab, and framework devtools, not source reading alone.
   - Console error: read the full stack, not just the message; find where the throwing code was actually called from.
   - Layout break: bisect the CSS — comment out rules or isolate the element until the break disappears, then you know which rule owns it.
   - Hydration mismatch: diff what the server rendered against what the client rendered on first paint; the mismatch is almost always non-deterministic content (dates, random IDs, `window`-only checks) rendered during SSR.
   - Failed request: check the actual request in the network tab (URL, method, payload, status, response body) before assuming the client code is wrong — the API may be returning something the spec didn't anticipate.
3. **Form one hypothesis at a time** for the root cause, not the symptom. State it before testing it.
4. **Test the hypothesis** with the smallest change that would confirm or kill it — a log line, a breakpoint, a temporarily hardcoded value. Don't fix yet.
5. **Fix the root cause**, not the symptom it produced. If the real fix is larger than the bug warrants, say so and let the developer decide whether to fix now or file it.
6. **Verify** by reproducing the original steps and confirming the failure is gone, plus a quick check that nearby behavior didn't regress.

## Handoff

Hand the reproduction steps to `test` as a regression test: written failing against the old code first, then passing after the fix, so it stays proof rather than decoration.
