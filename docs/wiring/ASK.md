# Wiring for Ask OnCo (intents, entity resolution, templated cited answers)

Ask OnCo now resolves the records a question names, classifies the question into an intent, and fills a
template from those records' structured fields, every sentence cited. It runs entirely in the browser from
precomputed JSON; the extractive sentence-retrieval path in `src/lib/ask.ts` remains the fallback and its
exports (`retrieveIds`, `composeAnswer`, `recordFromEntity`, `answerText`) are unchanged, so the MCP `ask`
tool keeps working.

One shared file needs a line: `package.json`.

## `package.json`

The browser needs `public/api/v1/ask-index.json` (entity names and aliases, curated question pairs). Add
`scripts/build-ask.ts` to the `build:api` chain after `build-api.ts` (which clears `public/api/v1`):

```json
"build:api": "tsx scripts/build-api.ts && tsx scripts/embed.ts && tsx scripts/build-ask.ts && tsx scripts/build-similar.ts && tsx scripts/build-triples.ts && tsx scripts/build-context.ts",
```

Optional alias for the evaluation (the existing `bench:ask` already points at the extended script):

```json
"bench:ask": "tsx scripts/benchmark-ask.ts",
```

Until the line lands, `npx tsx scripts/build-ask.ts` after `npm run build:api` produces the file; without it
the page shows a one-line message asking for the build rather than failing.

## What ships in this batch (no other shared files touched)

| File | Role |
|---|---|
| `src/lib/ask-lexicon.ts` | Curated aliases per record id ("triple-negative" → tnbc, "CT scan" → ct), stop words, case-sensitive names (VISION, FDA, WHO). |
| `src/lib/ask-index.ts` | Index types, alias derivation from name/aka/brand/code/symbol/NCT, compact wire format, browser loader. |
| `src/lib/ask-index-build.ts` | Corpus-side builder (graph, benchmark, patient questions). |
| `src/lib/ask-intent.ts` | Intent rules, longest-match entity resolution over the index, curated-pair matching. |
| `src/lib/ask-compose.ts` | Templates per intent; regional approvals by the reader's region; follow-ups; read-more; method line. |
| `src/lib/ask-pipeline.ts` | Orchestration: analyse, retrieve, fetch records (and a second wave), compose. |
| `src/lib/ask-harness.ts` | Server-side harness used by tests and `scripts/benchmark-ask.ts`. |
| `scripts/build-ask.ts` | Writes `public/api/v1/ask-index.json`. |
| `scripts/benchmark-ask.ts` | Before/after evaluation on the 100 benchmark questions and the 60 natural questions in `src/data/ask-eval.ts`. |
| `src/components/AskOnco.tsx`, `src/app/ask/page.tsx` | The page: entity chips, cited answer, "How this answer was built", follow-ups, "Not what you meant?". |

`src/data/questions.ts`, `src/data/benchmark.ts`, `src/lib/schema.ts` and `src/lib/entity-matcher.ts` are read, not changed.

## September 2026: the new kinds

The corpus grew to 6,689 records (India and China, 259 journals, 21 KEGG maps, YC and startup companies, 69 investors,
approved supportive-care drugs, diagnostic tests, 53 graded complementary approaches, 16 roadmaps). Ask OnCo gained:

| Intent | Wording | Template |
|---|---|---|
| `evidence` | "is X worth it", "is X proven", "does X help", "can I take X" | Evidence grade first (strong, some, insufficient, no benefit, harm), then the record. Anything below "some evidence" is never framed as an option and its strengths are not quoted. Applies only when a graded record is named; otherwise the wording falls through to results, side effects or definition. |
| `regional-approvals` | "what did India approve for CAR-T", "which drugs did China approve for lung cancer" | Products approved in the named region from the index `regions` column, standard of care first, then the region's own approvals; loaded records add brand, year and indication. |
| `companies` | "which companies work on X", "which YC W24 companies" | Companies linked to a technology, target or cancer (plus those behind approved products); an investor's portfolio, optionally one YC batch. |
| `investors` | "who invests in X", "which investors back X startups", "what does Flagship invest in" | A company's backers, rounds and acquirer; an investor's portfolio; the investors behind a field's companies, ranked by count. |
| `roadmap` | "roadmap for X", "where is X heading", "future of X" | The roadmap built around the front or technology named: where it came from, today, coming next, further out, what sets the pace. |
| `journals` | "which journals cover X", "who publishes JCO", "where was X published" | A journal's profile (publisher, scope, access model, impact factor with its year); or every journal whose name matches the topic words. |

The index rows carry three optional extras (`grade`, `batch`, `regions`) so the browser can answer these without
fetching every record. A survival-figure guard (`hasSurvivalFigure`) keeps percentages, hazard ratios, death counts
and rates per 100,000 next to survival words out of every composed sentence except a trial's own result and outcome
fields. The second natural set (`askEvalNew`, 60 questions) is floored in `src/lib/ask.test.ts` and scored by
`scripts/benchmark-ask.ts`.
