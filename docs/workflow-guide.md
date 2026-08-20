# The workflow, walked through

This is the deep dive: what each file is for, who's allowed to touch it, and one feature carried from idea to shipped so the shape is concrete instead of abstract.

## The phases

```
idea → outline → survey → blueprint → build → trial → test → review → log → sync
```

Nothing here is a forced order. `outline` and `survey` run once per project (or once per new stack); everything from `blueprint` onward repeats per feature. A bug skips straight to `patch`, any time.

## Files and ownership

| File | Written by | Read by |
|---|---|---|
| `docs/scope/<project>.md` | `outline`, updated by `build`/`sync` | everyone — it's the map |
| `AGENTS.md` | `survey`, corrected by `sync` | everyone |
| `docs/specs/<n>-<slug>.md` | `blueprint` | `build`, `trial`, `review`, `test` |
| `docs/reviews/<date>-*.md` | `trial`, `review` | the developer, `log` |
| test files | `test`, `patch` | CI, the developer |
| `CHANGELOG.md`, `docs/releases/`, PR body | `log` | the team, the community |

Each file has one owner. `build` reads a spec; it doesn't rewrite it. `sync` corrects stale facts; it doesn't regenerate `AGENTS.md` from scratch — that's `survey`'s job, reserved for an actual stack change.

## Worked example: a paginated product listing page

**outline.** The idea is an online storefront. `outline` asks what it sells and who buys it, then breaks the idea into an ordered list: listing page, detail page, cart drawer, checkout. It records the support target ("evergreen browsers, mobile-first from 360px") and picks `Beta` as the workflow depth — real users, but pre-launch, so `test` matters more than a fresh-model `review` does yet.

**survey.** The project is greenfield, so this runs after the stack is picked (Next.js, Tailwind, a Postgres-backed API). `survey` reads `package.json` and the config files, samples a couple of real routes, and writes `AGENTS.md`: framework, routing convention (`app/` directory), styling system (Tailwind, tokens in `tailwind.config.ts`), and the real `npm run dev`/`build`/`test` commands.

**blueprint.** The listing page is next in `outline`'s build order. Two decisions are open: how the page is rendered, and the page-size/response shape for `/api/products`. `blueprint` decides SSR (product data changes often, and it needs to be indexable), defines the API contract (`GET /api/products?page=`, response shape, 24 items per page), points at the existing token scale for cards and spacing, and sets a performance budget (largest contentful paint under 2.5s on a mid-tier mobile device). It writes `docs/specs/003-product-listing.md` with acceptance criteria: "page 2 of results loads via the documented endpoint," "each card exposes name, price, and image with real alt text," "layout holds at 360px and 1440px."

**build.** Reads the spec, builds the route and the `ProductCard`/`Pagination` components against the named tokens, wires the page into the nav, and marks the scope item `in progress`.

**trial.** Runs `npm run dev`, walks both acceptance criteria in a real browser, watches the network tab while paginating (catches a page-2 request that was silently 500ing behind a working-looking UI), checks the layout at 360px and 1440px, and tabs through the pagination controls keyboard-only. Writes `docs/reviews/2026-08-20-product-listing-verify.md` with one line per criterion.

**test.** Writes a component test for `ProductCard` and `Pagination`, plus a request test for `/api/products` covering the empty-page and last-page cases the spec didn't explicitly ask for but the acceptance criteria imply.

**review** (offered at `Beta`+, run before the PR). A fresh read flags that the price is rendered as a raw string instead of going through the project's currency-formatting utility — a real find `build`'s own review missed.

**log.** Writes the PR body from the actual diff and the spec's acceptance criteria as a reviewer checklist, and a one-line `CHANGELOG.md` entry: "Product listing now paginates."

**sync.** After merge: the scope item flips to `done`, the spec's status stays `Ratified` (nothing was left `Assumed`), and `AGENTS.md` is confirmed still accurate — no stack change happened, so nothing to correct.

## The patch loop, mid-stream

Two weeks later, a support ticket reports the listing page blank on first load in production, fine on refresh. `patch` reproduces it, localizes to a hydration mismatch (the page number was read from `window.location` during server render, which doesn't exist yet), forms the hypothesis, confirms it by logging the value on both renders, fixes it by reading the page number from a source available on both sides, and hands the reproduction steps to `test` as a regression test — written failing against the old code, then passing after the fix.
