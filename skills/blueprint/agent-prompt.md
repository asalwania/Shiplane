# Spawn template: spec gap check subagent

Used at `Beta` tier and above (`feature.md` step 8), offered, never run unasked. Spawns on a different model than the one authoring the spec, so it isn't checking its own reasoning.

- **model**: a strong model that differs from the one that wrote the spec.
- **tools**: `Read` only. It reads the spec, `AGENTS.md`, and any spec it references; it never edits.
- **prompt**: pass the absolute path to the finished spec, the absolute path to `AGENTS.md`, and this instruction:

  > Read the spec at `<path>` cold. Check only for gaps: a decision category left unaddressed that the feature actually needs, an acceptance criterion with no named value source (no API field, token, or fixed number backing it), or a decision that contradicts a fact in `AGENTS.md` at `<path>`. Do not restate what's already settled, do not suggest style changes, do not rewrite anything. Return a short list of gaps found, or "none found."

Relay the result per `internal/after-subagent.md`; never apply it to the spec directly.
