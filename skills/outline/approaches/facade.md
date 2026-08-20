# Delivery approach: look first, wire later

Build the screens on fake data first, so the product can be seen and felt, then connect the real backend afterward.

Good for a prototype, or when the look needs sign-off before investing in the plumbing behind it.

Recorded in the scope file; `build` reads it to know a screen built under this approach is expected to stand up on fake data now, with the real data layer wired in as a separate, later item — not a shortcut `build` invents on its own mid-task.
