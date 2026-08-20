# outline: references consent

Before writing the scope file, ask once whether recommendations in it should be sourced. One question, covers both citations and links; never split into two asks.

- **question:** "Add a References section to the scope, showing where the recommendations come from, and optionally links to back them? The plan reads the same either way; this only adds sourcing."
- **header:** "References"
- **options:**
  - `No references, keep it clean` (recommended): no citations, no links, nothing else changes.
  - `Sources only`: name what a recommendation is based on (an existing `AGENTS.md` fact, a named practice like "foundations before features") inline as `(basis: …)`, no web lookup.
  - `Sources plus verified links`: as above, plus a subagent confirms each link actually says what's claimed before it goes in the file.

## No references

Write the scope with no `(basis: …)` markers and no `## References` section. Default; most projects want this.

## Sources only

Wherever the scope recommends something the developer didn't dictate (a delivery approach, a call on build order, a workflow depth pick), append a short `(basis: …)`: a project fact (`AGENTS.md`, an existing spec) or a named practice, never a bare URL. Add a `## References` section listing what was cited, grouped as project facts and named practices.

## Sources plus verified links

Do the sources only pass first. Then, for any recommendation a canonical link would actually help (an official framework doc, a named standard), spawn a read only subagent (capability first: a fast, low cost tier model, not the session model, with read and web lookup tools only, no write access) to confirm each candidate link is real and says what's claimed. Brief it with the candidate claims and ask for back only a verified list (title plus URL) or "none verified"; never invent a URL yourself and never let the subagent write to the scope file. Add the verified links to `## References` under their own group; drop any claim that came back unverified rather than guessing.

No web lookup tool available: fall back to the sources only behavior and say so in one line, rather than silently skipping the request.
