# blueprint mode: feature

The default mode: one open decision for one `docs/scope/` item. Read this when a scope item names a category still open (see the table in `SKILL.md`) and no wider trigger from `architecture.md`, `cross-cutting.md`, or `enhancement.md` applies.

## Steps

1. Read the scope item and `AGENTS.md` first — reuse the project's existing stack and tokens rather than introducing a second system. If `AGENTS.md` doesn't exist yet, stop and point to `survey`; a decision without stack context is a guess.
2. Work through only the categories this item actually needs (see the decision-category table in `SKILL.md`) — a static marketing page may need none of the data-layer questions.
3. For each open category, use the three-kind interview from `internal/design-conversation.md` rather than dumping every question on the developer at once.
4. State the decision and the one-line reason. Skip categories that don't apply rather than padding the spec.
5. Write acceptance criteria as checkable conditions — each names where its value comes from (an API field, a token, a fixed number), so a gap is visible now instead of surfacing mid-build.
6. If a real unknown remains (a third-party API's actual shape, say), don't block: mark the spec `Assumed`, record the assumption plainly, and flag it for confirmation once the unknown resolves.
7. Save to `docs/specs/<NNN>-<slug>.md` from `spec-template.md`; update the scope item's status to reference the spec.
8. At `Beta` tier and above, offer — don't run unasked — the second-model gap-check subagent (`agent-prompt.md`). Any gap it finds is the developer's to resolve; see `internal/after-subagent.md` for how to relay it.

## Handoff

Point to `build` to build against the finished spec.
