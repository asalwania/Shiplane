# Guide: building the interface half

Read after the data/logic layers (if any) are in place. First question: where does the design come from?

| Source | Read |
|---|---|
| A connected design tool (Figma, etc.) and the spec says to use it | [`ui/mcp.md`](ui/mcp.md) |
| A pasted reference image | [`ui/image.md`](ui/image.md) |
| The project already has `design.md` and real token values in CSS | [`ui/existing.md`](ui/existing.md) |
| None of the above, no design system yet | [`ui/generate.md`](ui/generate.md) |

Whichever source, once there's something to build against, [`ui/implementation.md`](ui/implementation.md) is the standard every screen or component is held to before it counts as done; read it every time, regardless of which source file sent you here.

## Screen versus piece

Treat these differently. A **screen** (a page, a route) owns its own layout and every state it can be in. A **piece** (a reusable component) just takes inputs and renders; it doesn't own the layout of a whole page, or navigation.

## Placeholder images

If a screen needs images it doesn't have real assets for, ask which of three: the developer will add real files later, an image service used as a stand in, wired at the right sizes, or plain colored placeholders. Never invent a path to a file that doesn't exist.
