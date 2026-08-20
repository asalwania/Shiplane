# Template: postmortem

`docs/postmortems/<date>-<slug>.md`. Git won't contain the incident narrative — ask the developer for what broke, when (with timezone), user impact, how it was detected, and the root cause/fix (point to any `/patch` output if it exists). Never invent a timeline entry or a cause beyond what's given.

```markdown
# <date> — <what broke, one line>

## Impact

<who/what was affected, for how long>

## Timeline

- <time> — <what happened>

## Root cause

<the proven cause — from /patch's output if it ran, otherwise what the developer reported>

## Fix

<what was changed>

## Follow-up

- [ ] <a regression test, a monitoring gap, a process fix>
```
