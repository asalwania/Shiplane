# blueprint mode: architecture

Read this when `outline` just planned a brand new project and no `AGENTS.md` exists yet: the decision isn't one scope item's rendering strategy, it's which stack the whole project runs on. Runs once per project (or once per stack change), before any `feature` mode decision.

## What's different from `feature` mode

This is a wide comparison with a recommendation, not a focused design of one thing. Sort everything the stack choice needs into the same three kinds as `internal/design-conversation.md`, but at project scope:

- **Framework and rendering default**: recommend one (naming a runner up) based on the flows `outline` recorded. Content heavy pages sensitive to search engines lean toward SSR or SSG; interaction heavy ones lean toward CSR with selective SSR.
- **Data layer**: recommend a database and access pattern that fits the data shapes the idea implies; only ask if the developer has a constraint only they know (an existing account with a provider, a compliance rule).
- **Styling system and token source**: recommend one; this becomes the token source every later `feature` mode spec points at instead of redefining.
- **Deploy target**: recommend one that matches the framework's default hosting story, unless the developer names an existing one.

## Steps

1. Read `docs/scope/` for the flows and support target `outline` recorded; never ask what's already written there.
2. If a decision could be helped by an outside connector or a skill that's ready to use, ask first (`internal/tool-discovery.md`) before searching.
3. Recommend each category with a one line reason and a named runner up; never present a plain list with no pick.
4. Write the decision as `docs/specs/000-stack.md` (or the next unused low number). This spec has no single scope item; every later spec's "Tokens" and "Data" rows point back at it instead of repeating the choice.

## Handoff

Point to `survey` next: scaffold the project with the chosen stack's own setup tool, then let `survey` read the real, scaffolded project rather than an empty folder.
