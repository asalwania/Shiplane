# Pattern: domain-driven design

Signals: folders or modules named after business concepts, not technical layers (`orders/`, `billing/`, `catalog/`), each bundling its own models, logic, and routes together; a shared-kernel or `common/` folder for cross-cutting concerns; naming that mirrors terms the product actually uses (a `Cart`, not a `BasketEntity`).

If detected, record in `AGENTS.md`: the bounded contexts (the named domains) and their boundaries, and the rule that a new feature's code lives inside the domain it belongs to rather than in a shared technical folder. `build` reads this to place new code inside the right domain module; `blueprint` reads it so a spec's language matches the domain's own vocabulary.
