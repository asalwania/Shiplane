# Pattern: clean/layered architecture

Signals: folders named by layer rather than by feature (`domain/`, `application`/`use-cases/`, `infrastructure/`, `interfaces`/`adapters/`), dependencies pointing inward only (outer layers import inner ones, never the reverse), a domain layer with no framework imports.

If detected, record in `AGENTS.md`: the layer names and what belongs in each, the dependency direction rule, and where a new feature's pieces should land (which layer owns a new API route's handler vs. its business rule vs. its DB access). `build` reads this to place new code in the layer that already owns that kind of responsibility, instead of guessing a folder.
