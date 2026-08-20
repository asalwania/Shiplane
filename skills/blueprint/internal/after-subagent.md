# Internal: relaying the gap check subagent's result

`agent-prompt.md`'s subagent reads a finished spec cold and looks only for gaps `blueprint` itself didn't settle: categories skipped, an acceptance criterion with no named value source, a decision that contradicts `AGENTS.md`. It never rewrites the spec.

When it returns:

1. If it found nothing, say so in one line and move on; don't pad the report with a clean bill of health.
2. If it found a gap, present each one as a question, not a correction: "It flagged `<category>` as undecided. Want to settle that now, or leave it `Assumed`?" The developer decides; the subagent's read is input, not a verdict.
3. Only `blueprint` edits the spec file, never the subagent directly and never automatically from its output.
4. If the developer settles a gap, that's a normal `feature` mode edit to the same spec; don't spawn a second subagent round for a single small fix.
