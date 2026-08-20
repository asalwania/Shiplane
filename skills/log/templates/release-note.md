# Template: release note

`docs/releases/<version>.md`, grouping every changelog entry since the last release into a short narrative, ordered by what users would care about most.

```markdown
# <version>: <date>

## Highlights

<1 to 3 sentences on the headline change, if there is one.>

## What's new

- <user-facing change>

## Fixes

- <user-facing fix>
```

If there are no tags yet to define the range, ask for a version name and range rather than guessing; see how `SKILL.md` handles that case.
