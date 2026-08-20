# survey mode: large-repo

Same starting point as the plain whole-repo pass — an existing codebase, no `AGENTS.md` yet — except the repo is too big to read inline without spending most of the context budget on file contents nobody will reread: hundreds of source files, or several distinct top-level areas.

1. **Spawn a read-only subagent** — a fast, low-cost tier model, not the session model — with `Read`/`Grep`/`Glob` only, no `Write`/`Edit`. Brief it with [../SKILL.md](../SKILL.md)'s "What it inspects" list verbatim and ask it to return a compact map, not a file-by-file narration: framework and rendering mode, routing convention, styling system, component library, build tooling with the real scripts, deploy target if configured, and the organizing pattern with one or two example paths as evidence.
2. **Write `AGENTS.md` yourself** from that map. The subagent never writes the file — a summary it produced could be wrong in a way that's cheap to catch by reading the map, expensive to catch by re-reading the whole repo.
3. If the map is missing something "What it inspects" asks for, read that one piece directly rather than spawning again.

## Handoff

Same as the plain whole-repo pass: point to `outline` (brownfield: plan the next slice on top of what's enrolled) or `blueprint` (a decision is already known to be open).
