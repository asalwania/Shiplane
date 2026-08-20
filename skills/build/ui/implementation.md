# UI standard: every screen ships complete

Read regardless of which source file sent you here. One standard governs every screen or component before it counts as built.

- **A complete, professional product**, not a bare form floating on an empty page. Compose the whole screen: real wording (never lorem ipsum in a final build), the brand's character, a finished layout.
- **Every state**, not just the happy path: empty, loading, and error states are part of the build, not an afterthought. A screen with no empty state is an unfinished screen.
- **Accessible from build time**, not bolted on after `trial` finds it: real interactive elements, a sensible heading structure, visible focus.
- **Self check before reporting done.** Render the screen if the tooling allows it (a dev server, a component preview) and look at your own work. Fix visible defects (a broken layout, an overflow, a misaligned element) before handing off. This doesn't replace `trial`; it catches what's obviously wrong before a second pass has to.

Finish with [`checklist.md`](../checklist.md).
