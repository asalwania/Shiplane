# outline mode: replan (no arguments)

Called with no target — reconcile against what shipped, don't re-interview.

1. Read the scope file(s) under `docs/scope/`.
2. Report status per item in one line each: `done`, `in progress`, or `todo`.
3. Name the next `todo` item.
4. If an item's status looks stale against the actual code (something built that's still marked `todo`, something `in progress` with no recent activity), flag it rather than silently correcting it — correcting stale status against the repo is `sync`'s job, not a guess made here.

## Handoff

Point to whichever skill the next `todo` item actually needs — `blueprint` if it has an open decision, `build` if it doesn't.
