# survey mode: gapfill

`AGENTS.md` already exists but is missing sections — a project onboarded before some category was tracked, or a category `survey` skipped because it genuinely didn't apply at the time (no deploy target configured yet, say) and now does.

1. Read the existing `AGENTS.md` and diff its sections against the full list in `../SKILL.md`'s "What it inspects."
2. Inspect only the missing categories — don't re-derive what's already recorded and correct (that's `sync`'s job on drift, not this mode's).
3. Append the missing sections in place, matching the existing file's structure and tone rather than starting a second style.

## Handoff

None required — this closes out `AGENTS.md` to the standard shape.
