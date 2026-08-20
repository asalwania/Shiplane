---
name: blueprint
allowed-tools: Bash, Read, Write, Edit, Grep, Glob, Agent, AskUserQuestion
description: Settle a load bearing web decision (rendering strategy, data fetching approach, design tokens, an API contract, or a11y/perf budgets) and write it as a build spec with acceptance criteria. Use when a decision like this is open for a scoped item, a new project needs its stack chosen, the same decision is open on several items at once, or an existing decision is being reversed.
---

# blueprint

## Output style

<!-- OUTPUT-STYLE:START -->
Everything this skill writes for a person to read (a completion summary, a scope entry, a spec, a review or verify report) states findings and next steps as recommendations, never orders: name the suggested next skill or the pending decision, and let the developer choose to run it, skip it, or override it. Lead with the outcome that matters, and point to the file that holds the detail rather than restating it. Never mark a scope item or spec status done or accepted on this skill's word alone, beyond what this skill owns. Write in plain words: never use an em dash, an en dash, or a hyphen as punctuation. Write `read only`, not `read-only`, or reword the sentence with a comma, a colon, or parentheses. Code, file paths, command flags, and values other skills match on keep their hyphens.
<!-- OUTPUT-STYLE:END -->

**Load bearing decision**: one that later work would have to be redone to reverse (not "which icon library" but "client rendered or server rendered," not "button corner radius" but "the token scale it's drawn from"). Produces one `docs/specs/<NNN>-<slug>.md` per decision, from [`spec-template.md`](spec-template.md).

## Decision categories

Every mode below works through only the categories a given decision actually needs: a static marketing page may need none of the data layer questions.

- **Rendering strategy**: CSR, SSR, SSG, or ISR, per route if they differ. State the "why" in one line (SEO need, personalization, build time data).
- **Data fetching**: where data is read from, request/response shape, caching or revalidation rule.
- **Design tokens**: the color, spacing, and type scale this feature draws from. Point at the existing token source (`AGENTS.md` names it); only define new tokens if none exist yet.
- **Accessibility budget**: the concrete bar (keyboard operability, landmark structure, color contrast ratio, focus visibility). Not "be accessible": the specific pass/fail checks `trial` will run.
- **Performance budget**: a number, not a feeling (largest bundle addition, an image weight ceiling, a target for largest contentful paint on the slowest supported device).
- **API contract**: request method, path, payload and response shape, error cases, for any new or changed endpoint.

## Which mode

Read the one file that applies; each carries its own full steps.

| Situation | Read |
|---|---|
| `outline` just planned a brand new project, no `AGENTS.md` yet | [`agent-modes/architecture.md`](agent-modes/architecture.md) |
| The same open category sits on 2+ scope items | [`agent-modes/cross-cutting.md`](agent-modes/cross-cutting.md) |
| An existing spec's decision is being reversed, not extended | [`agent-modes/enhancement.md`](agent-modes/enhancement.md) |
| One open decision, one scope item (the common case) | [`agent-modes/feature.md`](agent-modes/feature.md) |

All four modes use the same interview technique, [`internal/design-conversation.md`](internal/design-conversation.md), and the same rule before leaning on outside knowledge, [`internal/tool-discovery.md`](internal/tool-discovery.md).

## Asks vs acts

Acts once a decision is reachable. Only pauses for the interview's "ask, and only this" questions (never the ones it can derive or recommend), and at `Beta`+ to offer, not run unasked, the gap check subagent ([`agent-prompt.md`](agent-prompt.md), relayed per [`internal/after-subagent.md`](internal/after-subagent.md)).

## Artifact ownership

Owns every file under `docs/specs/`. `build` reads a spec; it doesn't rewrite it. Only `blueprint` writes spec content, marks a spec `Superseded`, or clears an `Assumed` flag.
