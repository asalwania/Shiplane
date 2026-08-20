# Internal: reaching outside the repo

Before relying on outside knowledge to settle a decision (an unfamiliar library's real current API, whether an MCP server or an installable skill exists that would help), ask first, don't search silently.

1. Name what you'd look up and why the decision needs it.
2. Ask a single yes or no: "Want me to check for `<the thing>` before deciding this?" Don't bundle it with the decision's own questions.
3. If yes, search, then write what you found and relied on directly into the spec's reasoning; a decision that leaned on an external source without saying so can't be checked again later.
4. If no, decide from what's already known and say so in the spec, so a future read knows the outside check was skipped, not forgotten.

Never fetch anything without this ask first, and never let a search result silently become the decision without landing in the spec.
