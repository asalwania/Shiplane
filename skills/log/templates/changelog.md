# Template: changelog entry

One line under `## Unreleased` in `CHANGELOG.md`, written for the person using the product, not the person who built it — what they can now do, not which files changed.

```markdown
## Unreleased

- <what changed, in user-facing terms> ([#<issue/PR> if known])
```

Match the existing file's format if `CHANGELOG.md` already has entries — don't impose a different convention over an established one. "Product listing now paginates," not "Added pagination logic to ProductList.tsx."
