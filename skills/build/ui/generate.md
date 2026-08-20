# UI source: no design system yet

First screen or component in the project with no `design.md`. Build the system before building the screen.

1. Ask for direction: a website or brand to draw from, a design file to adopt, a style described in words, or nothing at all. If nothing, suggest one rather than leaving it open.
2. If no direction was given, ask for a mood in a few words (calm and light, dark and focused, bold) and derive from it: a single accent color, a ladder of greys, type sizes, spacing steps, corner radius, and motion.
3. **Before writing any CSS**, check that the derived text colors meet contrast against their backgrounds, in both light and dark mode. Fix anything that fails; never ship a color pairing you know is unreadable.
4. Write the real values into the project's CSS (wherever `AGENTS.md` says tokens live, or establish that convention now) and the character and rules into `design.md` at the project root. `design.md` points at the values; it doesn't duplicate them.
5. Continue to [`implementation.md`](implementation.md) to build the actual screen against what was just created.
