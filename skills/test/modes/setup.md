# test mode: setup (first run only)

Read this only when `AGENTS.md` has no test-framework line recorded yet.

1. Detect what's already there: a lockfile for the package manager, a framework already installed (`vitest`, `jest`, `@playwright/test`, `cypress`, `@testing-library/*` in `package.json`; `pytest` in `pyproject.toml`; `testify` in `go.sum`). An already-installed tool wins by default — don't propose a second one.
2. If nothing is installed, ask: which framework for unit/integration tests (recommend one sensible default per language: Vitest for JS/TS, pytest for Python, `testing`+testify for Go), and — only if this change touches a page/route/flow — whether to add an end-to-end tool (Playwright is the default recommendation) and a component-testing addon (Testing Library, for React/Vue/Svelte projects).
3. Record the answer in `AGENTS.md` under its testing section: the framework, the E2E tool if any, the conventional test directory and file pattern for that tool, and the package manager. This is what lets every later `test` run skip this step.
4. If the project deliberately has no test runner (a stated convention: typecheck + `trial` is the gate), record that instead — don't push a framework onto a project that opted out. Future `test` runs then run the typecheck gate and point to `trial` for behavior, rather than writing a suite.

## Handoff

Return to `SKILL.md`'s normal steps once the framework is recorded — this mode only runs once per project.
