# Changelog

All notable changes to OnCo are recorded here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Dates are release dates; the corpus itself is kept current continuously.

## [Unreleased]

### Added
- Startups and investors: company records gain optional `stage`, `ycBatch`, `investors`, `funding` (sourced rounds, amounts only where the source states them) and `acquiredBy`; `companyType: "investor"` for venture funds, corporate venture arms, an accelerator and disease foundations, whose portfolios are derived from backlinks.
- 62 Y Combinator companies attacking cancer, drawn from the open YC directory dataset and checked one by one (`src/data/companies-yc.ts`, snapshot with every hit and its decision in `src/data/universe-lists/yc-oncology.json`); 187 further venture-backed oncology companies across therapeutics, diagnostics, AI, digital care, radiotherapy hardware, surgery and tools (`src/data/companies-startups.ts`); 69 investors (`src/data/investors.ts`).
- `/startups/` (stage strip, YC batch chips, filters by stage, modality, cancer, batch, investor and country, most active investors, recently funded) and `/investors/`; Funding panel on company pages, Portfolio panel on investor pages; stage and investor facets on `/companies/`; Startups and Investors in the Institutions & people group.

## [0.4.0] - 2026-09-08

### Added
- Animated wireframe schematics for all 18 fronts (front pages, Fronts index, home) and for all 19 glossary term categories (`/terms/` and every term page).
- Molecule thumbnails wherever a product is mentioned: cards in pipelines, connected lists, and product tabs; hover popover with the rotating molecule on inline drug chips.
- Self-hosted organisation logos under `public/logos/` (Wikimedia Commons via Wikidata with domain verification, favicon fallback) for companies, institutions, and collections.
- `person` kind (clinicians and scientists: role, specialisms, profiles, papers) with a People index and a People tab on institution pages.
- Site favicon and Apple touch icon; GitHub link in the header.
- Public-readiness: CI workflow, issue and pull-request templates, Code of Conduct, security policy, consolidated contributing guide.

### Changed
- Graph explorer rebuilt as a clean radial view (fronts inner ring, cancers outer ring) with a focus mode that groups neighbours by kind; no physics.
- Header language and theme controls are single-line and compact.
- Footer and About page carry the work-in-progress disclaimer: verify every fact at its primary source; not medical advice.

## [0.3.0] - 2026-09-07

### Added
- Deep dives for all 31 cancers (standard of care by setting with NCCN/ESMO guideline mapping, state of the art, history, pipeline, open problems), taking the corpus from 875 to 1574 objects.
- Structured trial outcomes on every trial, out-of-100 pictograms, replication notes, and a disclosed evidence score (`/evidence/`).
- Product depth: dosing, label-sourced toxicity tables, cost and access, dated regulatory timelines (`/regulatory/`), class-wise toxicity comparison (`/toxicity/`), and animated mechanism cards.
- Sourced biomarker prevalence by cancer for targets, with a matrix at `/prevalence/`.
- Browser-only profile with Navigator (line of therapy, cautions, next options), caregiver mode, and a trial finder with country and distance filters.
- Reading-level and language layers: plain and simple TL;DRs, translations into Spanish, Chinese, Portuguese, and Hindi (machine-assisted, unreviewed), and glossary hovers.
- Power tools: multi-item Compare with differences, Pivot tables, Timeline scrubber, Query builder.
- Trust layer: `/audit/` (staleness and contradictions), provenance line per record from the commit history, weekly fact checks against openFDA and ClinicalTrials.gov, confidence chips for ideas and speculative roadmap steps, `/corrections/` from `CORRECTIONS.md`, and expert and patient-advocate review tracks with mandatory conflict-of-interest statements.
- Visuals: pathway diagrams that light up per product, Body map, theme toggle with high contrast and skip link, Story mode on roadmaps, interactive molecule viewer with nine drug–target PDB complexes, animated process schematics (ADC internalisation, CAR-T, radioligand, and more).
- Suggest-an-edit on every page with an organisation self-service track; open evaluation benchmark of 100 questions (`/eval/`).
- Tabbed object pages with the section kept in the URL; grouped navigation (Find, Map, Intelligence, Who, Learn & contribute) with landing pages.
- Research output ranking from OpenAlex on `/universities/`, trial leadership index at `/leadership/`, cooperative trial groups as institution records, funding flows at `/funding/`, gaps and bounties at `/gaps/`, annual report at `/report/2026/`, and an MCP server (`npm run mcp`).

### Changed
- Duplicate entity ids across per-cancer files are merged at load time (first record's scalars win, arrays appended).

## [0.2.0] - 2026-09-06

### Added
- Slowly rotating 3D wireframes on every product page: small molecules from PubChem 3D conformers, the payload for ADCs, and an IgG C-alpha backbone (PDB 1IGT) for antibodies. Structures are self-hosted under `public/structures/`.
- Organisation logos on company, institution, and collection pages, hotlinked from the organisation's own site.
- Filterable, sortable products browser at `/drugs/` with phase/status, modality, ADC payload class, front, target, cancer, and company facets, in card or table view.
- Explore power view at `/explore/`: pick a cancer type, switch entity kind, and get a ranked list with a disclosed relevance score.

### Changed
- "Sections" renamed to "Fronts" (the fronts of the war on cancer); routes moved from `/sections/` to `/fronts/`.
- Hero line changed to "Total information dominance on cancer."
- The visible "as of" stamp was removed from pages; the internal last-checked date remains in the data for maintainers.

## [0.1.0] - 2026-09-04

### Added
- Initial release: 642 objects across 14 kinds (cancers, fronts, technologies, targets, products, companies, institutions, pathways, terms, trials, pairings, roadmaps, ideas, collections), one page per object with plain-English TL;DR, derived backlinks, and connected-objects panels.
- Triple-negative breast cancer deep dive (the first fully built example): standard of care by setting, state of the art, history timeline, pipeline, open problems.
- Nine roadmaps including ADC generations, TROP2 ADCs, TNBC, radiopharmaceuticals, cell therapy, molecular imaging, early detection, immunotherapy, and KRAS.
- "For me" cancer picker, institution world map with a disclosed ranking, pathway diagrams, glossary, 50 hub ideas, and a static JSON API at `/api/v1/`.
- Build-time validation of every cross-reference; MIT code licence, CC BY 4.0 data licence.
