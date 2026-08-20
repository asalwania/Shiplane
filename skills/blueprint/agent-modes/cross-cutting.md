# blueprint mode: cross-cutting

Read this when the same open category shows up on two or more `docs/scope/` items at once — a data-fetching pattern every route will need, a token-scale overhaul, a shared auth check. Deciding it per item would mean writing (and maintaining) the same choice N times.

## Steps

1. Confirm it's actually shared, not coincidentally similar: would every affected item break the same way if this decision changed? If only some would, split it — decide the shared part here and the item-specific part in `feature` mode.
2. Decide it once, the same way `feature` mode would (three-kind interview, `internal/design-conversation.md`).
3. Write one spec, `docs/specs/<NNN>-<slug>.md`, with **Scope items** as a list, not a single link — every item it covers, named.
4. Point each affected scope item's status at this one spec rather than spawning a duplicate per item.
5. If an item later needs a variation on the shared decision (a page-specific exception), that's a `feature`-mode spec that references this one and states only the delta.

## Handoff

Point to `build` for any item this spec now unblocks.
