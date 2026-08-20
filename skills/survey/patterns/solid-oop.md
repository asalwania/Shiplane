# Pattern: SOLID object-oriented design

Signals: classes with a single clear responsibility, interfaces or abstract base classes that concrete implementations depend on (dependency inversion), small focused interfaces over one large one, extension points designed for subclassing or composition rather than editing existing classes.

If detected, record in `AGENTS.md`: the interface/abstraction conventions already in use (where interfaces live, the naming convention for an implementation), and the extension points a new feature should plug into rather than modify. `build` reads this so a new capability is added by implementing an existing interface or extension point where one exists, instead of modifying a class that already has callers depending on its current shape.
