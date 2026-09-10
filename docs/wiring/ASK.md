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
