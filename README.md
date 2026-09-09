# OnCo — total information dominance on cancer

**Live:** https://onco.cc

OnCo is a public, cited, editable knowledge graph of oncology. Every cancer, front, technology, target, product, company, institution, person, pathway, trial, pairing, roadmap, idea, and collection has its own page. Every page opens with a plain-English TL;DR (switchable to a simpler reading level or to Spanish, Chinese, Portuguese, or Hindi), continues with a technical summary, and ends with everything in the graph that connects to it. Links are declared once and backlinks are derived, so the graph stays consistent.

> **Work in progress. Verify at source.** Every fact on this site is being built and checked in the open and may be incomplete, out of date, or wrong. Do your own research and confirm anything here at its primary source before relying on it. Nothing here is medical advice; decisions belong with you and your clinicians.

## What you can do

| Group | Pages |
|---|---|
| **Find** | [Explore](https://onco.cc/explore/) (pick a cancer, switch kind, ranked list), [For me](https://onco.cc/for-me/), [Navigator](https://onco.cc/navigator/) (line of therapy from a browser-only profile), [Tumour board](https://onco.cc/tumor-board/), [Compare](https://onco.cc/compare/), [Pivot](https://onco.cc/pivot/), [Timeline](https://onco.cc/timeline/), [Query](https://onco.cc/query/), [Graph](https://onco.cc/graph/), [Body map](https://onco.cc/body/), ⌘K search |
| **Map** | [Cancers](https://onco.cc/cancers/), [Fronts](https://onco.cc/fronts/), [Technologies](https://onco.cc/technologies/), [Targets](https://onco.cc/targets/), [Products](https://onco.cc/drugs/), [Pathways](https://onco.cc/pathways/), [Prevalence](https://onco.cc/prevalence/), [Trials](https://onco.cc/trials/), [Pairings](https://onco.cc/pairings/), [Roadmaps](https://onco.cc/roadmaps/), [Ideas](https://onco.cc/ideas/), [Glossary](https://onco.cc/terms/), [Collections](https://onco.cc/collections/) |
| **Intelligence** | [Evidence](https://onco.cc/evidence/), [Readout calendar](https://onco.cc/calendar/), [Congress digests](https://onco.cc/digests/), [Failure museum](https://onco.cc/failures/), [Resistance atlas](https://onco.cc/resistance/), [Payloads & linkers](https://onco.cc/payloads/), [Regulatory timeline](https://onco.cc/regulatory/), [Toxicity compare](https://onco.cc/toxicity/), [Isotope supply](https://onco.cc/isotopes/), [State of the war 2026](https://onco.cc/report/2026/), [Changelog](https://onco.cc/changelog/), [Audit](https://onco.cc/audit/), [Corrections](https://onco.cc/corrections/) |
| **Who** | [Institutions](https://onco.cc/institutions/) (map and disclosed ranking), [Universities](https://onco.cc/universities/), [Trial leadership](https://onco.cc/leadership/), [People](https://onco.cc/people/), [Companies](https://onco.cc/companies/), [Funding](https://onco.cc/funding/) |
| **Learn & contribute** | [Reading paths](https://onco.cc/paths/), [About & methodology](https://onco.cc/about/), [Roadmap ideas](https://onco.cc/hub/), [Gaps to fill](https://onco.cc/gaps/), [Suggest an edit](https://onco.cc/suggest/), [Open evaluation](https://onco.cc/eval/), [Open API](https://onco.cc/api/) |

Product pages show the exact molecule as a slowly rotating 3D wireframe (PubChem conformers for small molecules, the payload for ADCs, real PDB structures for antibodies where they exist, drug–target complexes with binding pockets for several kinase inhibitors), plus dosing, safety, cost and access, a dated regulatory timeline, and an animated mechanism card. Technology, front, and glossary pages open with animated wireframe schematics. Trials carry structured outcomes drawn as people out of 100.

## What is in the corpus

Counts from `npm run validate` on 2026-09-08. Run it for the current numbers.

| Kind | Count |
|---|---|
| Cancers | 31 (every one with a deep "spike": standard of care by setting with guideline mapping, state of the art, history, pipeline, open problems) |
| Fronts | 18 |
| Technologies | 153 |
| Targets | 72 (with sourced prevalence by cancer) |
| Products | 290 |
| Companies | 180 |
| Institutions | 73 |
| Pathways | 13 |
| Terms | 154 |
| Trials | 387 (with structured outcomes, replication notes, evidence score) |
| Pairings | 85 |
| Roadmaps | 9 |
| Ideas | 79 |
| Collections | 30 |
| People | 0 (schema in place; records arriving) |

Total: 1574 objects, about 3200 static pages.

## The rules for facts

1. **Cite it.** New facts carry a source URL. If it cannot be sourced, leave the field out.
2. **Keep it current.** Every record carries an internal last-checked date for maintainers; pages show the current state.
3. **Prefer a link to a remembered number.** Trial figures appear only when sourced on the page or in the linked trial record.
4. **Evidence tier is visible.** Approved, phase 3, phase 2, phase 1, preclinical, concept: colour-coded everywhere, plus a disclosed evidence score.
5. **Ideas are labelled as ideas**, with a maturity grade, a proposed test, and a named confidence estimate.
6. **Unknown beats guessed.** Missing fields render as missing.
7. **No patient data.** Public information about technologies, products, organisations, trials, and public professional figures only.
8. **Failures are data.** Negative trials, withdrawals, and discontinued programmes are kept and explained.

Trust tooling: `/audit/` (staleness and contradictions, recomputed each build), weekly fact checks against openFDA and ClinicalTrials.gov, a provenance line on every page from `git blame`, a public corrections log, and expert and patient-advocate review badges with mandatory conflict-of-interest statements.

## Run it

```bash
npm install
npm run validate     # schema + every cross-reference (fails on a bad id)
npm test             # vitest: schema, invariants, ranking
npm run dev          # http://localhost:3000 (builds the JSON API first)
npm run build        # static export to out/
```

Node 22 or newer. No server, database, environment variables, or tracking. Optional data refreshers (network): `fetch:structures`, `fetch:logos`, `fetch:trials`, `fetch:openalex`, `factcheck`, `provenance`, `audit`, `bench`.

## Layout

| Path | What |
|---|---|
| `src/lib/schema.ts` | Zod schemas for all kinds. The source of truth. |
| `src/lib/graph.ts` | Loads and validates the corpus; derives backlinks and neighbourhoods. |
| `src/lib/ranking.ts`, `relevance.ts`, `evidence.ts` | The disclosed scoring formulas. |
| `src/data/*.ts` | The corpus, one file per kind. Edit these. |
| `src/data/spikes/*.ts` | One deep dive per cancer, merged onto the base record at build time. |
| `src/data/people/` | Clinicians and scientists, one file per group. |
| `src/app/` | Next.js App Router pages. |
| `public/structures/`, `public/logos/`, `public/openalex/` | Self-hosted data fetched by `scripts/`. |
| `scripts/` | Validators, fetchers, fact checks, provenance, benchmark. |
| `mcp/server.ts` | MCP server exposing the corpus to AI assistants (`npm run mcp`). |

## Contribute

Read [CONTRIBUTING.md](CONTRIBUTING.md). In short: each kind lives in one file under `src/data/`, ids are kebab-case and unique, every fact needs a source, and `npm test` must pass. Ways in:

- **Fix a fact.** Use "Suggest an edit" on any page (it opens a prefilled issue) or edit the record directly.
- **Deepen a cancer.** Add to its spike under `src/data/spikes/`.
- **Review a page.** Expert and patient-advocate review tracks put a badge on the page; see `.github/REVIEWERS.md`.
- **Fill a gap.** `/gaps/` lists objects and fields that need work.
- **Build a roadmap item.** `/hub/` has two roadmaps with statuses.

Maintainers: the weekly workflows (`refresh-trials.yml`, `factcheck.yml`) open pull requests, which requires **Settings → Actions → General → "Allow GitHub Actions to create and approve pull requests"** to be enabled.

## Licence

Code: [MIT](LICENSE). Data in `src/data/`: [CC BY 4.0](LICENSE-DATA). Attribute "OnCo (github.com/judegomila/OnCo)". Logos under `public/logos/` are trademarks of their owners, shown for identification; Wikimedia Commons files carry their own licences, recorded per file in `public/logos/index.json`.

## Credits

Data and structures from [PubChem](https://pubchem.ncbi.nlm.nih.gov), [RCSB PDB](https://www.rcsb.org), [Wikimedia Commons and Wikidata](https://commons.wikimedia.org), [ClinicalTrials.gov](https://clinicaltrials.gov), [openFDA](https://open.fda.gov), [OpenAlex](https://openalex.org), [world-atlas](https://github.com/topojson/world-atlas) (Natural Earth), and the open databases listed under [Collections](https://onco.cc/collections/). Built with Next.js, Tailwind, Zod, MiniSearch, and d3-geo. Modelled on the Open Medical Registry's "cite everything, omit what you cannot confirm" approach.
