# Contributing to OnCo

Thank you. OnCo is a public map of oncology and it is only as good as its facts. This guide covers how to add or fix records, how to deepen a cancer, how reviews work, and the checks every change must pass.

## The two rules

1. **Cite it.** New facts need a source URL in `links` (or a `wikipedia` link plus a trial `nct`). If you cannot source it, leave the field out. Unknown beats guessed.
2. **Date it.** Update `asOf` on any record you change.

And one hard line: **no patient data.** The corpus holds public information about technologies, products, organisations, trials, and public professional figures only.

## Ways to contribute

- **Fix a fact.** Use "Suggest an edit" on any page; it opens a prefilled GitHub issue. Or edit the record and open a pull request. Record confirmed errors in `CORRECTIONS.md` in the same PR.
- **Add an object.** See below.
- **Deepen a cancer.** Extend its spike under `src/data/spikes/<cancer>.ts`.
- **Review a page.** See "Review tracks".
- **Fill a gap.** `/gaps/` on the site lists objects with missing sources, thin links, or empty sections.
- **Build a roadmap item.** `/hub/` lists ideas with statuses; pick one marked planned or proposed and open an issue first.

## Adding an object

1. Pick the kind: `src/data/<kind>.ts` (products live in `drugs.ts`; people under `src/data/people/`; deep cancer material under `src/data/spikes/`).
2. Copy a neighbouring record. Ids are kebab-case and globally unique across all kinds. Check with `grep -rn 'id: "<your-id>"' src/data`.
3. Write the `tldr` for someone with no background: one or two sentences, no jargon, no numbers unless essential. Write the `summary` for a clinician or scientist.
4. Link it: relationship arrays (`cancers`, `targets`, `drugs`, `companies`, `trials`, ...) hold ids. Declare a link once; the other direction is derived.
5. Fill the structured fields where they apply: trials get `outcomes`, `enrolled`, `replication`; products get `dosing`, `toxicity`, `access`, `regulatoryEvents`, `mechanismSteps`; standard-of-care rows get `guideline`; targets get `prevalence`.
6. `npm run validate` fails on a bad id, duplicate id, or schema error. `npm test` runs the same plus invariants.
7. Open a PR using the template. Say what changed and why in one paragraph.

## Adding or deepening a cancer spike

A spike is a fully built cancer page: 3-paragraph summary, `standardOfCare` rows by setting with refs and `guideline`, `stateOfArt`, `history` with refs, `pipeline`, `openProblems`, subtypes, biomarkers, and all the drug, trial, technology, and term objects it points to, with structured outcomes on landmark trials. Every cancer has one; the file is `src/data/spikes/<cancer-id>.ts` and it exports `{ cancerId, entities, patch }`. Arrays in `patch` are appended to the base record and de-duplicated; scalars override. Duplicate entity ids across spikes are merged (first record's scalars win, arrays are appended), so two spikes may both add the same generic drug.

## Style

- British or American spelling is fine; be consistent within a record.
- No superlatives without a comparator. "First", "largest", "only" need a source.
- Failures are welcome: negative trials, withdrawn approvals, discontinued programmes. Mark them `status: "negative"` or `"withdrawn"` and tag `failure`.
- Statuses are honest: `approved` means a regulator approved it; regional approvals go in `approvals` with the region.

## Review tracks

Two badges can appear on a page. Both are statements about the page on a date, not endorsements.

- **Expert** (`track: "expert"`): a named clinician or scientist read the page and its linked sources, checked the standard-of-care rows against current guidelines (NCCN, ESMO) and the trial figures against the primary publication, fixed anything wrong in the same PR, and signed off.
- **Patient advocate** (`track: "advocate"`): a named advocate or advocacy organisation reviewed the TL;DRs, the "questions to ask", and the For-me framing for clarity, tone, and what a patient would need that is missing.

To add a review, append an entry to `src/data/reviews.ts` under the entity id with your name, role and organisation, the date, a **conflict-of-interest statement** (`coi`: funding, employment, advisory roles, equity in the last three years; "None declared" is valid and is displayed), an optional note on what you checked, and an optional profile URL. Open a PR titled `review: <entity id>`. Maintainers verify identity via the profile URL or a signed commit before merging. Reviews without a COI statement are not merged. See `.github/REVIEWERS.md` for the roster and verification rules.

## Organisation self-edits

Companies and institutions may propose changes to their own records through "Suggest an edit" with an official email domain or profile URL for verification. Promotional language is edited out; facts with sources are welcome.

## Trust tooling

- `npm run audit` — contradictions and staleness from the corpus alone (`public/audit.json`, rendered at `/audit/`).
- `npm run factcheck` — openFDA and ClinicalTrials.gov comparisons (`public/factcheck.json`); weekly via GitHub Actions.
- `npm run provenance` — last-edit commit per record from `git blame` (`public/provenance.json`), shown on each page.
- `CORRECTIONS.md` — every confirmed factual correction, rendered at `/corrections/`.
- `src/data/confidence.ts` — named probability estimates for ideas and speculative roadmap steps. Propose revisions with your name and reasoning.

## Code

TypeScript strict, Next.js App Router, static export, Tailwind 4. Keep components small; keep data out of components; keep shared-file edits (schema, layout, `EntityDetail`) separate from data PRs. `npm run typecheck`, `npm run lint`, `npm test`, and `npm run build` must pass; CI runs them on every pull request.

## Conduct and security

This project follows the [Contributor Covenant](CODE_OF_CONDUCT.md). Report security concerns as described in [SECURITY.md](SECURITY.md).
