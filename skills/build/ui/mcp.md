# UI source: a connected design tool

The spec says to use a connected design tool (e.g. Figma) and one is available in this environment.

1. Pull the real frames for this screen rather than approximating from a screenshot.
2. Match spacing, type, and color to what the tool reports, not to eyeballed values.
3. Where the tool exposes real design tokens or variables, use those as the source of truth over anything already in `design.md` that might have drifted, but flag the drift rather than silently overwriting `design.md`.
4. If the tool isn't actually reachable when this runs (no connection, no matching frame), say so and fall back to [`image.md`](image.md) or [`existing.md`](existing.md) rather than guessing at what the design tool would have shown.
5. Continue to [`implementation.md`](implementation.md).
