# OnCo — time to win

**Live:** https://onco.cc

OnCo is a public, cited, editable knowledge graph of oncology: every cancer, front, technology, target, treatment, company, institution, person, pathway, trial, key paper, journal, pairing, roadmap, bottleneck and idea, one page each, with a plain-English TL;DR before the technical layer and links in every direction. It exists so that a patient, a clinician, a scientist, an investor or a policymaker can walk from any object to everything connected to it and see the state of the art, the history and what is coming.

> **Work in progress. Verify at source.** Every fact is being built and checked in the open and may be incomplete, out of date or wrong. Nothing here is medical advice. Do your own research and check anything that matters at its primary source, which every page links.

Current counts live at https://onco.cc/about/ and print from `npm run validate`. This file deliberately carries no numbers, so it never goes stale.

## How the site is organised

| Area | What it holds |
|---|---|
| **Start here** | Explore (ranked, filterable view of everything for a cancer), For me (pick your cancer type), Navigator, Tumour board, Compare, Landscape grid, Timeline, Query builder, Graph explorer, Body map |
| **Cancers & treatments** | One page per cancer type, front, technology, target, treatment or test, trial, pairing, pathway, roadmap, key paper and glossary term; the Mechanics of cancer atlas; the Resistance atlas |
| **News & evidence** | Evidence ranking, readout calendar, congress digests, research pulse, what the world is publishing, approvals by region, failures, payloads and linkers, toxicity, isotopes, key papers, journals, annual report, changelog, audit and corrections |
| **Institutions & people** | Institutions, universities, trial leadership, companies, countries, cases by country, funding, people, heroes and heroines |
| **Learn & contribute** | Reading paths, About and methodology, Roadmap (what we are building), Gaps, Bottlenecks of the war on cancer, Ideas, Suggest an edit, Evaluation, Open API |

Every treatment with a small-molecule structure shows the exact molecule as a slowly rotating wireframe; antibodies, cells, vaccines, devices and tests show an explained placeholder. Fronts, technologies, cancers, targets and glossary categories carry hand-drawn animated schematics. Readers pick their country in the header, and "approved" then means their regulator's verdict, with other regions shown as flags.

## Repository layout

```
src/data/            The corpus: TypeScript records, one array per kind or theme
  index.ts           ALL_INPUTS: every array that becomes part of the graph
  cancers.ts, drugs.ts, targets.ts, technologies.ts, companies.ts, institutions.ts, ...
  spikes/            Per-cancer deep dives merged into the cancer records at load time
  people/, key-papers/, ideas-waves/, institutions/   Multi-file kinds, each with an index
  regional-approvals.ts, payloads.ts, resistance.ts, biomarkers.ts, ...   Structured side data
src/lib/schema.ts    Zod schemas for every kind, KIND_META (routes, labels), REL_FIELDS
src/lib/graph.ts     Builds the graph: validates ids, resolves references, derives backlinks
src/lib/nav.ts       Navigation groups and every top-level route
src/app/             Next.js App Router pages; src/app/[kind]/ renders every index, src/components/EntityDetail.tsx every object page
src/components/      UI: EntityBrowser (the shared filterable table), Wireframe3D and schematics, Tip (tooltips), icons, maps
scripts/             Fetchers and checks: structures (PubChem/RCSB), logos, OpenAlex, GLOBOCAN, trials, papers, factcheck, audit, provenance, API build
public/              Self-hosted structures, logos, snapshots, the static JSON API under /api/v1/
docs/                GAPS.md (what is still missing) and design notes
```

### Adding or fixing a record

1. Find the kind's file under `src/data/` (or the right sub-file for multi-file kinds) and add or edit the record. Every record needs an `id`, `name`, `tldr` (plain English, one or two sentences), `summary`, `asOf`, and at least one primary `links` entry.
2. Reference other objects by id in the relationship fields (`cancers`, `drugs`, `targets`, `technologies`, `trials`, `terms`, `people`, `bottlenecks`, `keyPapers`, `related`, and so on). Backlinks are derived, so link in one direction only.
3. Run `npm run validate`. It rejects duplicate ids, dangling references and malformed records, and prints the counts per kind.
4. Run `npm run typecheck && npm run lint && npm test && npm run build`.
5. Open a pull request. Suggested edits from the site arrive as GitHub issues using the templates in `.github/ISSUE_TEMPLATE/`.

New kinds need: a schema in `src/lib/schema.ts` (plus `KIND_META`, and the rel field in `Base` and `REL_FIELDS` if objects can point at it), a data file spread into `ALL_INPUTS`, a `case` in `buildBrowser` (`src/app/[kind]/page.tsx`) for the index table, a `case` in `kindTabs` (`src/components/EntityDetail.tsx`) for the page, a colour in `src/lib/text.ts` and `GraphExplorer`, and a nav entry.

### Scripts

| Command | Purpose |
|---|---|
| `npm run validate` | Parse the corpus, check ids and references, print counts |
| `npm run dev` / `npm run build` | Develop / build the static site into `out/` |
| `npm run fetch:structures` | Pull molecule structures from PubChem and RCSB for `src/data/structures.ts` |
| `npm run fetch:logos` | Self-host institution and company logos (Wikidata or favicon) |
| `npm run fetch:openalex`, `fetch:countries`, `fetch:globocan`, `fetch:trials`, `fetch:papers` | Refresh research output, country rankings, incidence, trial registry and literature snapshots |
| `npm run factcheck`, `npm run audit`, `npm run provenance` | Cross-check against openFDA and ClinicalTrials.gov, find stale or contradictory facts, map records to commits |
| `npm run build:api` | Emit the static JSON API |

GitHub Actions run the checks on every push and open weekly pull requests with refreshed snapshots.

## Principles

- **One page per object, links everywhere.** If it can be a page, it is a page.
- **Plain English first.** Every object opens with a TL;DR a newcomer understands; the technical layer follows. Technical terms are glossary objects and get hover explanations wherever they appear.
- **Cited, dated, honest about gaps.** Every record links a primary source, carries the date it was last checked, and says "no data" rather than guessing.
- **Nothing stale by design.** Counts and dates are computed at build time from the corpus, never written into copy.
- **Open.** Code is MIT; data is CC BY 4.0 (see `LICENSE-DATA`); logos remain their owners' trademarks.

## Contributing and safety

See `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md` and `SECURITY.md`. No personal or patient data belongs in this repository; only public knowledge about the science, the products and the organisations.

Data and structures from PubChem, RCSB PDB, Wikimedia Commons and Wikidata, OpenAlex, GLOBOCAN (IARC), ClinicalTrials.gov, Europe PMC, openFDA and the publishers and institutions linked on each page.
