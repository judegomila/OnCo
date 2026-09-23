# The open pipeline: combination proposals

**These are hypotheses for research, not medical advice.** Nothing here is a recommendation to take, prescribe
or trial any drug. A proposal is a gap in a table, not a claim that a medicine will work. Talk to your
oncologist about treatment; talk to a trial sponsor about trials.

Modern cancer drugs are modular. An antibody-drug conjugate is a target plus a payload class. A radioligand
is a target plus an isotope. A CAR-T is a target plus a costimulatory domain. A bispecific is one target plus
another. A degrader is a target plus an E3 ligase. Write those as a grid and most cells are empty, not because
somebody decided against them but because nobody has got to them yet. `src/data/combination-ideas.ts` holds
the cells worth asking about, each with the evidence we could find that somebody may already be there.

The permutation engine at `/pipeline/engine/` decomposes the corpus into that grid and classifies every cell
as approved, in development, stopped or untried. This file is the hand-curated layer above it: the untried
cells where both halves are already validated, ranked, and searched against the public record.

## How a proposal is scored

Score is out of 100 and is the sum of four parts, all stored on the row so a reader can check the arithmetic:

| Part | Range | How it is set |
|---|---|---|
| `burden` | 0-40 | `round(10 * log10(1 + worldDeaths / 1000))`, capped at 40. `worldDeaths` is GLOBOCAN 2022 world deaths summed over the distinct cancer sites in `cancers` (subtypes fall back to their parent's site, so listing both breast subtypes and breast does not double-count). |
| `validationA` | 0-15 | The first component (the target): approved 15, phase-3 10, phase-2 7, phase-1/2 5, none 0. |
| `validationB` | 0-15 | The second component (payload class, isotope, costimulatory domain, second target, E3 ligase), same scale. |
| `plausibility` | 0-30 | Hand-assigned, with the reason written out in `plausibilityNote`: does the target internalise (needed for an ADC), is it tumour-restricted (needed for a radioligand), is the antigen homogeneous (needed for CAR-T), is there a ligand for the E3 ligase, what normal tissue carries the target. |

Only the plausibility part is a judgement. The other three are computed, and a test recomputes `burden` and
`worldDeaths` from GLOBOCAN on every run, so a row cannot drift away from its own score.

The top 60 candidates ship. The ones cut are named in the header comment of the data file with their scores,
so nothing is silently dropped.

Two things the score deliberately does not do. It does not reward novelty: a cell with a terminated phase 3
behind it can score highly, because knowing it was tried and stopped is as useful as knowing it is open. And
it does not down-weight rare cancers to nothing: the log scale means a disease killing 25,000 people a year
still earns a third of the burden a disease killing 900,000 does.

## How evidence is gathered

For each proposal we search three public sources for anything naming both components, then read the results
and pick the rows that actually match. The queries used are stored on the row (`searched`), with the date, so
anyone can repeat the search and see what has appeared since.

1. **ClinicalTrials.gov API v2** — intervention and general-term queries naming both components or the
   construct name found in an earlier pass (`SHR-A2102`, `ASP3082`, `ZL-1310`).
2. **Europe PMC** — title and abstract queries, e.g. `TITLE:"Nectin-4" AND ABSTRACT:"exatecan"`.
3. **Google Patents** public pages, for title and abstract matches on both components.

Rules the data file obeys, each enforced by `src/data/combination-ideas.test.ts`:

- Every evidence row quotes a **verbatim sentence** from a source fetched with status 200. Quotes are
  extracted from the cached response by `scripts`, never typed from memory.
- Every evidence row carries a date, an identifier (NCT number, DOI, patent publication number) and an
  `https` url. No date or no quote means the row does not ship.
- A row with no evidence says `"no public evidence"`. It does not say "probably untried".
- Evidence marked `adjacent: true` tests a neighbouring cell, not this one: an actinium-225 agent against the
  same target when the proposal is lutetium-177, a CAR-NK when the proposal is CAR-T. Adjacent rows are kept
  because they are the most useful context a reader can have, but they do not set the status.
- Where the search showed the cell is already occupied by a corpus drug whose record is missing the field the
  decomposer reads (an ADC with no `payload`, a degrader with no ligase), the status is
  `"already in development (missed by decomposer)"` and the corpus ids go in `decomposerMissed`. Those rows
  are a to-do list for the corpus as much as a proposal.

Requests are made one at a time, 400 ms to 2.5 s apart depending on the host, with a User-Agent naming OnCo,
and cached under `/tmp/ctgov-cache`, `/tmp/europepmc-cache` and `/tmp/patents-cache`. Only 200 responses are
cached; a 503 is retried once and otherwise skipped, so a rate limit never becomes a silent empty result.

## What the search changed

Curation is not a formality. Of the proposals generated from the corpus, several turned out to be occupied:

- The Claudin 18.2, MET and Nectin-4 topoisomerase-I ADC cells all read as untried because the corpus records
  for `ibi343`, `telisotuzumab-adizutecan` and `shr-a2102` have no `payload` field. All three are in trials.
- The KRAS degrader in phase 3, setidegrasib (ASP3082), recruits **VHL**, not cereblon. The discovery paper
  reports the ternary complex with VHL. That moved VHL from an unproven ligase to one with a phase-3 agent
  behind it, which raised the validation score of three other proposals and rewrote the KRAS row.

Both are the kind of thing a decomposer alone cannot tell you.

## How to add a proposal

Open a pull request against `src/data/combination-ideas.ts`.

1. Pick a cell where both components are validated and no corpus drug combines them. Check
   `/pipeline/engine/` first: if the engine already shows the cell as occupied, there is nothing to propose.
2. Write the row. `rationale` is two plain-English sentences and every claim names the corpus record it rests
   on in parentheses, e.g. "(enfortumab-vedotin)". Those ids also go in `refs`, and a test checks they
   resolve. `plausibilityNote` says why the pairing is or is not chemically and biologically sensible.
   `caveat` is what would need to be true for it to work: the objection a reviewer would raise first.
3. Search the three sources. Record what you find with a quote, a date, a url and the sponsor or assignee.
   If you find nothing, set `"no public evidence"` and leave `evidence` empty. Do not guess.
4. Set the score. `burden` and `worldDeaths` come from GLOBOCAN and the test will recompute them, so get the
   cancer list right rather than the number. `plausibility` is yours to argue for in the pull request.
5. Run `npm run typecheck && npm run lint && npx vitest run`.

Corrections are as welcome as additions. If a proposal here is already in trials, or was tried and abandoned
for a reason we missed, open an issue or a pull request that moves it to the right status and cites the
source. A wrong row that gets corrected is worth more than a cautious blank.

## House rules

- No invented facts. A proposal is a hypothesis and is labelled as such. Every "somebody may be testing this"
  line quotes a fetched source with its URL and date, or the row says no public evidence was found.
- UK spelling, no em-dashes, in line with the rest of the corpus.
- Nothing here is medical advice, and the presence of a proposal is not evidence that a treatment works.
