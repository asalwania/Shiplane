# Pattern: functional core

Signals: pure functions doing the actual logic (no shared mutable state, side effects pushed to the edges), composition over inheritance, immutable data structures preferred, minimal or no class usage outside framework requirements.

If detected, record in `AGENTS.md`: the convention (pure logic functions, side effects only at the boundary, such as a route handler or a DB call site), and any composition helpers already in use (a pipe/compose utility). `build` reads this so new logic is written as pure functions composed together rather than introduced as stateful classes that don't match the rest of the codebase.
