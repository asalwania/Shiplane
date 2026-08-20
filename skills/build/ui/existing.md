# UI source: an existing design system

The project already has `design.md` (the art direction) and real token values in CSS. Build inside it rather than introducing a second system.

1. Read `design.md` for the character and rules, and the real CSS token values it points at. Never hardcode a value `design.md` already names.
2. Match the existing component patterns (`AGENTS.md` names where they live) before writing a new one from scratch; check for a close match first.
3. If this screen needs a token `design.md` doesn't have (a new semantic color, a new spacing step), that's a `blueprint` decision, not something to invent inline. Stop and flag it rather than growing the token set silently.
4. Continue to [`implementation.md`](implementation.md).
