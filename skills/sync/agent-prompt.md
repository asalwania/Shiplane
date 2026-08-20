# Operating template

Followed on the main thread. Every step is a correction against what the repo actually shows, never a rewrite of hand written prose.

1. **Scope**: for each item not already `done`, check whether the code now backing it actually exists and is reachable (routed, exported, wired in). Mark it `done` if so; mark a `todo` item that turns out already complete, rather than leaving stale rows.
2. **Specs**: for each `Assumed` spec, check whether its assumption has since been confirmed (the real API shape observed, the token system settled). Flip it to `Ratified` if so; otherwise leave the flag standing, since it's a reminder, not a blocker.
3. **AGENTS.md**: recheck the facts against the repo: a renamed script, a swapped styling system, a new deploy target. Correct only the lines that are now wrong. A change big enough to need whole new sections is a stack change; stop and point to `survey` instead of patching around it.
4. **Report**: a short summary, shaped like a diff, of exactly what changed in each file, not a restatement of the files' full contents.
