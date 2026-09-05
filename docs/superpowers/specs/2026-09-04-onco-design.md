# OnCo design (2026-09-04)

## Purpose

A public web app and repository that lets anyone see, for every cancer, the current state of the art, the history, and what is coming, and follow links between technologies, targets, products, companies, institutions, pathways, trials, pairings, roadmaps, ideas, and terms. Non-technical readers get a TL;DR on every page; technical readers get a sourced summary.

## Non-goals (v1)

- No user accounts, server, or database. Static export only.
- No live ClinicalTrials.gov ingestion (planned; see hub ideas).
- No patient data, ever.

## Architecture

- **Corpus**: TypeScript records in `src/data/<kind>.ts`, typed by Zod schemas in `src/lib/schema.ts`. One discriminated union `Entity` with 14 kinds. Base fields shared; kind-specific fields per schema.
- **Graph**: `src/lib/graph.ts` parses all records, enforces unique ids and resolving references, and derives backlinks (`incoming`), neighbourhoods (`neighbours`), and a cancer-centric expansion (`forCancer`: direct links plus targets/companies/technologies of linked drugs).
- **Rendering**: Next.js App Router with `output: "export"`. Routes: `/` home, `/[kind]/` index (with special layouts for sections, technologies, cancers, products, terms, companies, institutions), `/[kind]/[id]/` generic detail with kind-specific blocks, `/for-me/` client-side cancer picker, `/universities/`, `/hub/`, `/about/`, `/api/`.
- **Search**: MiniSearch in the browser over `/api/v1/search.json`.
- **Map**: d3-geo Natural Earth projection over world-atlas TopoJSON fetched client-side; dot size = score.
- **Ranking**: `src/lib/ranking.ts`, disclosed formula (Newsweek 2026 rank, NCI designation, corpus link count).
- **API**: `scripts/build-api.ts` emits `public/api/v1/{all,search,<kind>,ranking,meta}.json` and `entities/<id>.json`. CORS headers via `vercel.json`.
- **Validation**: `npm run validate` and vitest. Build fails on dangling references.

## Data model decisions

- Relationship arrays of ids rather than a separate edge table: simplest to author, and backlinks are derived so consistency is automatic.
- Pairings are first-class objects (`a`, `b`, `pairingType` including `caution`) because "what works together" and "what does not" is a core question.
- Roadmaps are ordered steps with `status` (historic/current/emerging/speculative) and refs, so speculation is visually separated from evidence.
- Ideas carry `hypothesis`, `rationale`, `test`, `maturity`.
- Cancers carry `standardOfCare` by setting, `stateOfArt`, `history` timeline with refs, `pipeline`, `openProblems`.

## Editorial rules

See README "The rules for facts". Summarised: date everything, cite over recall, show evidence tier, label ideas, prefer unknown to guessed, no patient data.

## Deployment

Private GitHub repo `judegomila/OnCo` (to be made public); Vercel static deployment via CLI.

## Open questions

- Whether to move the corpus to YAML per record (as in the Open Medical Registry) for non-developer contributors. TypeScript chosen for v1 for type-checking at authoring time.
- Automated ClinicalTrials.gov and FDA ingestion cadence.
- Expert review workflow and badges.
