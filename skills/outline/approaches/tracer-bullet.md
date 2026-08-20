# Delivery approach: thin thread first

Build one narrow path that goes all the way through every layer, screen to database, and works end to end, then thicken it. The first `todo` item under this approach is deliberately the smallest slice spanning the full stack, not the smallest UI slice.

Good when you want something real and connected as early as possible, and when the biggest risk is an integration that doesn't work, not the visual design.

Recorded in the scope file as the project's (or a single feature's) delivery approach; `build` reads it to decide whether to bind the UI to the real backend in the same pass as the UI itself, rather than building either half in isolation.
