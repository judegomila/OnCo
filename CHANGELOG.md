# Changelog

All notable changes to OnCo are recorded here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Dates are release dates; the corpus itself is kept current continuously.

## [Unreleased]

### Added
- Research output ranking from OpenAlex (oncology subfield, 2024–2025) on `/universities/`, with the exact query disclosed and data committed under `public/openalex/`.
- Trial leadership index at `/leadership/`.
- Cooperative trial groups and guideline bodies as institution records: SWOG, NRG Oncology, Alliance, ECOG-ACRIN, Children's Oncology Group, CCTG, BIG, GBG, JCOG, UNICANCER, NCCN.
- Funding flows at `/funding/`, every figure sourced.
- Gaps and bounties at `/gaps/`, computed from the corpus at build time.
- This changelog and its page at `/changelog/`.
- Expert review badge infrastructure (`src/data/reviews.ts`) and a documented review track in CONTRIBUTING.
- Annual report at `/report/2026/`, generated from the corpus.
- MCP server (`npm run mcp`) exposing search, get, list, for-cancer, and rank tools to AI assistants.

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
- Triple-negative breast cancer deep spike: standard of care by setting, state of the art, history timeline, pipeline, open problems.
- Nine roadmaps including ADC generations, TROP2 ADCs, TNBC, radiopharmaceuticals, cell therapy, molecular imaging, early detection, immunotherapy, and KRAS.
- "For me" cancer picker, institution world map with a disclosed ranking, pathway diagrams, glossary, 50 hub ideas, and a static JSON API at `/api/v1/`.
- Build-time validation of every cross-reference; MIT code licence, CC BY 4.0 data licence.
