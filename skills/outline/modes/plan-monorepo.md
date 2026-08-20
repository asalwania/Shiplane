# outline mode: plan monorepo

The repo holds several projects (a monorepo). Everything below scopes to the one workspace being worked on.

1. Identify the target workspace from what the developer named, or the directory already being worked in; never plan across every workspace in one file.
2. Give each workspace its own `docs/scope/<workspace>.md`, its own `docs/specs/`, and its own nested `AGENTS.md` if `survey` has written one. A change to one app doesn't reach into another's scope file.
3. Otherwise run the same interview as [`plan-greenfield.md`](plan-greenfield.md) or [`plan-brownfield.md`](plan-brownfield.md), whichever fits this workspace, scoped entirely to it.
4. Every later skill working in this workspace stays inside it and uses its own commands from its own nested `AGENTS.md`, never a sibling workspace's.

## Handoff

Same as the mode this workspace actually needed (greenfield or brownfield); just confirm the scope file landed under the right workspace path.
