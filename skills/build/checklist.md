# Self-check before handoff

Run through this before reporting a scope item `in progress` and pointing to the next step. It's a self-check, not a substitute for `trial` — it catches what's obviously wrong before a second pass has to.

- [ ] Every acceptance criterion in the spec has code behind it — not "should work," actually exercised once by hand or a quick smoke check.
- [ ] The token source the spec named is what's actually used — no hardcoded color, spacing, or type value that should have come from a token.
- [ ] The accessibility budget's specific checks are met: real interactive elements (not clickable `<div>`s), landmark structure present, focus visible.
- [ ] The performance budget's number is plausible for what shipped — a large new dependency or asset didn't sneak in unnoticed.
- [ ] The route, nav entry, or export is actually wired — the feature is reachable, not just present in the tree.
- [ ] If this replaced older code, the old code is deleted, not left sitting alongside the new.
- [ ] No console error or failed request during a quick manual pass, if the build tooling makes that possible to check.

Anything unchecked: fix it now if it's small, or name it plainly in the handoff report if it needs a decision (`blueprint`) or another skill's help.
