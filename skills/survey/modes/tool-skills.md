# survey mode: tool skills

Records which agent tooling this project already relies on, so later skills stop discovering it again each time: installed MCP servers, Agent Skills local to the project, CI checks that gate a merge.

1. Look for what's actually configured: MCP server config, a `.claude/` folder or its equivalent for agent tooling, CI workflow files. Don't ask the developer to recall it from memory.
2. Write a short "Tooling" section in `AGENTS.md`: what's installed, what it's for, one line each. Not a tutorial on the tool, just what exists and why.
3. Flag anything that looks configured but unused (an MCP server nothing references) rather than silently recording it as load bearing.

## Handoff

None required: this is a recording pass, not a build step.
