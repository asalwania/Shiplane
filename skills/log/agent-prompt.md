# Writing guide

Followed for every mode. The main thread writes the document itself — never spawn a writer for this, the reasoning (especially a postmortem's root-cause framing) has to stay on the thread that can be held to it.

1. Read the real source before writing a word: the commit log and diff (`pr`/`changelog`/`release-note`) or the incident facts the developer gave (`postmortem`). Never summarize from what was discussed earlier in the conversation — that drifts from what actually shipped.
2. Read the matching spec(s) for the "why," if one exists. If none does, say so rather than inventing a rationale.
3. Write in plain, specific language: name the page or flow affected, not "various improvements."
4. Follow the template for the chosen mode exactly for structure; fill in the judgment calls (what belongs in each field, what to omit) yourself.
5. Save to the location `SKILL.md` names for that mode — never leave the text only in the chat reply, except `pr`, which is always also shown in full in the chat so it works without a `gh` remote.
