# Flow: the build order

Backend and full stack work (an API endpoint, a data backed page, a service) builds in this order. A pure front end piece against an API that's already built skips straight to the UI half.

1. **Data layer first.** Build it to match the spec's data fetching decision, then actually confirm it: run the migration and check the table or field really exists, don't trust that writing the change was enough.
2. **Core logic next.** Handle the edge cases the spec's acceptance criteria named. Make anything that mutates state safe to retry: a double click or a retried request shouldn't create two of something.
3. **Endpoints or routes**, built exactly to the spec's API contract. Check not just that a caller is authenticated but that they're allowed to touch this specific resource. Rate limit anything open to the public.
4. **UI wiring.** Read [`ui-guide.md`](../ui-guide.md) for how the interface half gets built and composed.
5. **Cleanup.** If this replaced older code, delete it; don't leave the two implementations sitting side by side.
6. **Self check** against [`checklist.md`](../checklist.md) before handoff.

If the spec turns out to be wrong partway through (the data shape can't actually hold what was decided), stop and send the developer back to `blueprint` to fix the spec first; don't quietly build something different from what was decided.
