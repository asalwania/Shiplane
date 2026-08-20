# Operating template

Followed on the main thread once the framework is known (either read from `AGENTS.md`, or just recorded by [modes/setup.md](modes/setup.md)).

1. **Scope**: the uncommitted diff by default. No uncommitted changes — ask whether to target the last commit, specific named files, or stop.
2. **Classify** each changed file per [writing-guide.md](writing-guide.md)'s table. A large, unfamiliar diff: offload just the reading to a `scout` subagent that returns a compact map of what each file does, then write from that — don't spawn a second writer, the main thread still writes the tests itself.
3. **Write** against the classified strategy, applying the regression-test and failure-path rules in [writing-guide.md](writing-guide.md).
4. **Run** the suite; fix a test that's wrong, report a bug the test correctly caught rather than papering over it.
5. **Report** per [writing-guide.md](writing-guide.md)'s format, and update the scope item's status per `SKILL.md`'s handoff.
