# Internal: the design conversation

The interview technique every `agent-modes/*.md` file uses. Sort what a decision needs into three kinds, and treat each differently — never dump a plain list of open questions on the developer.

- **Work it out yourself** — anything derivable from the idea, the scope item, or the existing code. Never ask; just use it. Example: a listing page's data shape, once the API contract is chosen.
- **Ask, and only this** — anything only the developer knows: a compliance rule, a preference, an existing account with a vendor, a hard constraint on cost or latency. These are the only questions that should reach them.
- **Recommend, with a reason and a runner-up** — anything expertise settles (which database fits, which rendering mode fits the flow). State the pick and the one-line why; name a runner-up so the developer can override in one sentence instead of starting a debate from zero. Never present a bare list of options with no pick — that's the failure mode this rule exists to prevent.

Work through the three kinds in that order: what you can derive, then what only they know, then what you'd recommend. Asking before deriving wastes their attention on something you already had the answer to.
