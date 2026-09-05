# Contributing to OnCo

## The two rules

1. **Cite it.** New facts need a source URL in `links` (or a `wikipedia` link plus a trial `nct`). If you cannot source it, leave the field out.
2. **Date it.** Update `asOf` on any record you change.

## Adding an object

1. Pick the kind: `src/data/<kind>.ts` (products live in `drugs.ts`).
2. Copy a neighbouring record. Ids are kebab-case and globally unique across all kinds.
3. Write the `tldr` for someone with no background: one or two sentences, no jargon. Write the `summary` for a clinician or scientist.
4. Link it: relationship arrays (`cancers`, `targets`, `drugs`, `companies`, …) hold ids. Declare a link once; the other direction is derived.
5. `npm run validate` — fails on a bad id, duplicate id, or schema error. `npm test` runs the same plus a few invariants.
6. Open a PR. Say what changed and why in one paragraph.

## Adding a cancer spike

A "spike" is a fully built cancer page: `standardOfCare` by setting, `stateOfArt`, `history` with refs, `pipeline`, `openProblems`, and all the drug/trial/technology objects it points to. TNBC is the model. Pancreatic, NSCLC, prostate, and glioblastoma are next.

## Style

- British or American spelling is fine; be consistent within a record.
- No superlatives without a comparator. "First", "largest", "only" need a source.
- Failures are welcome: negative trials, withdrawn approvals, discontinued programmes. Mark them `status: "negative"` or `"withdrawn"`.

## Code

TypeScript strict, Next.js App Router, static export. Keep components small; keep data out of components. `npm run typecheck` and `npm run lint` should pass.
