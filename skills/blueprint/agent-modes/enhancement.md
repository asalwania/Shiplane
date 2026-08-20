# blueprint mode: enhancement

Read this when a decision that already has a spec (`Proposed`, `Assumed`, or `Accepted`) is genuinely being overturned — not extended, overturned. A new requirement invalidates the rendering choice; the token scale is being replaced; an `Assumed` spec's guess turned out wrong.

## Steps

1. Confirm it's a real reversal, not an addition. An addition (a new field on an existing API contract) is a new `feature`-mode spec that references the old one. A reversal (SSR turns out wrong, must be CSR) replaces it.
2. Write the new spec in full, same as `feature` mode, with the corrected decision and reason.
3. Mark the old spec `Superseded`, with a pointer to the new one, so the history stays readable — never delete or silently overwrite a spec.
4. Check every other spec and scope item that referenced the superseded one; flag each for a re-read rather than assuming the reversal only touches the one you started from.
5. If the superseded spec was `Assumed` and the reversal is what ratifies it (the real answer turned out different from the guess), say so plainly in the new spec's reasoning — this is the ratification, not a separate step.

## Handoff

Point to `build` for any already-built work that now needs to change to match the new spec; flag it clearly as rework, not new work.
