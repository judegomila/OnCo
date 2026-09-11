# OnCo press kit

One page for journalists, directory editors and anyone describing OnCo. Copy the blocks as they are. Where a number is needed, take it from the live metadata (below) rather than from this file, so it is right on the day.

## What OnCo is

**Short (one sentence, under 160 characters)**

OnCo is a free, cited knowledge graph of oncology: cancers, treatments, targets, trials, companies and people, one page each, in plain English with sources.

**Medium (one paragraph)**

OnCo (onco.cc) is a public, cited knowledge graph of oncology. Every cancer, treatment and test, target, technology, trial, key paper, company, institution and person has its own page, opening with a plain-English summary and followed by the technical detail, with every fact dated and linked to a primary source. The same corpus is published as a static JSON API, Markdown files for language models, Atom feeds, an MCP server for assistants such as Claude and Cursor, and a command-line tool. The data are free for individual and educational use with attribution; commercial use must pay for a licence. The code is open source. Nothing on the site is medical advice.

**Long (three paragraphs)**

OnCo (onco.cc) is a public, cited knowledge graph of oncology built so that a patient, a carer, a clinician, a scientist, an investor or a policymaker can start from any object and walk to everything connected to it. There are 18 kinds of record: cancers, fronts (the broad approaches, from imaging to cell therapy), technologies, targets, treatments and tests, companies, institutions, pathways, glossary terms, trials, pairings, roadmaps, ideas, collections, people, bottlenecks, key papers and journals. Each record opens with a plain-English TL;DR, then a technical summary, then the structured facts, each dated and linked to its source. Where a number is not sourced it is left out.

Around the records sit tools built from them: an explorer that ranks everything for a chosen cancer, lines of therapy by biomarker, a biomarker-against-cancer matrix, trial results explained as people out of 100, a forest plot of every hazard ratio in the corpus, approvals by region, HTA verdicts from NICE, SMC, G-BA and PBAC, what insurers and the NHS pay for, deals and exclusivity expiry, a catalyst calendar, a resistance atlas, animated schematics, three-dimensional molecules, a living-with-cancer area, and a completeness dashboard that measures the corpus against named external lists such as the NCI cancer type list and the FDA and EMA approved oncology drugs. Every correction is logged publicly.

The corpus ships in every form a builder needs: a static JSON API with no key and permissive CORS, one Markdown context file per record for language models, an OpenAPI description, RDF triples linked to Wikidata, Atom feeds, a CLI and a Model Context Protocol server. It is free for individual and educational use with attribution under CC BY-NC 4.0; commercial use must contact OnCo to pay for the data. The code is MIT-licensed on GitHub, where anyone can propose a correction. OnCo is being built and checked in the open, may be incomplete or wrong, and is not medical advice: every page links the primary source so readers can check.

## Counts, computed at build time

Never quote a count from memory. The metadata file is rewritten on every deploy:

```sh
curl -s https://onco.cc/api/v1/meta.json | jq '{built, total, counts}'
```

Template sentence, filled from that output: "OnCo holds `total` records in 18 kinds, including `counts.cancer` cancers, `counts.drug` treatments and tests, `counts.trial` trials, `counts.company` companies, `counts.institution` institutions and `counts.person` people (build of `built`)." The `/about/` page prints the same numbers, and `/completeness/` shows how much of each named external list they cover.

Safe floor for copy that will not be refreshed: "more than 6,000 records in 18 kinds".

## Attribution line

> Data from OnCo (onco.cc)

With a link to https://onco.cc wherever the data or text derived from it appears. Reusing a chart or a table: name the page it came from.

## Licence summary

- **Data** (the records, their wording and the derived files): copyright OnCo and its contributors, licensed under CC BY-NC 4.0. Free for individual and educational use, which includes personal, academic, charitable and other non-profit use, with attribution. Commercial use, for example inside a paid product, a commercial service, advertising-funded redistribution or a company's internal data pipeline, must contact OnCo and pay for the data. Full text: `LICENSE-DATA` in the repository and https://onco.cc/about/#licence.
- **Code**: MIT. https://github.com/judegomila/OnCo
- **Logos and portraits**: trademarks and photographs of their owners, shown for identification, each with its own licence recorded in the repository.
- **Upstream sources** keep their own licences, listed on https://onco.cc/data-sources/.
- **Citation**: `CITATION.cff` in the repository (GitHub shows "Cite this repository"). A Zenodo DOI is issued per release once the repository is linked; check the README for the current one.

## Not medical advice

> OnCo is a reference, not medical advice. It does not replace a conversation with a clinical team. Facts are being built and checked in the open and may be incomplete, out of date or wrong; every page links the primary source so you can check.

Use this line in full wherever a treatment, a test or a cancer is discussed.

## Pages that show the range

| Page | Shows |
|---|---|
| https://onco.cc/explore/ | Pick a cancer, switch kind, get a ranked list of everything connected to it |
| https://onco.cc/cancers/tnbc/ | One cancer page: state of the art, standard of care, trials, history, what is coming |
| https://onco.cc/drugs/trastuzumab-deruxtecan/ | One treatment page: mechanism, approvals by region, trials, toxicity, exclusivity, the molecule in three dimensions |
| https://onco.cc/targets/trop2/ and https://onco.cc/dossiers/ | Target dossiers: biology, prevalence, products by phase, resistance, assays, open questions |
| https://onco.cc/biomarker-matrix/ | Every biomarker against every cancer: approved in your region versus in trials |
| https://onco.cc/sequencing/ | Lines of therapy by cancer and biomarker subgroup |
| https://onco.cc/explained/ | Every trial result as people out of 100, surrogate endpoints flagged |
| https://onco.cc/forest/ | Every hazard ratio in the corpus on one axis |
| https://onco.cc/regulatory/regions/ | Approvals in the US, EU, UK, Japan, China and Australia, and what is missing where |
| https://onco.cc/hta/ | NICE, SMC, G-BA and PBAC verdicts per product |
| https://onco.cc/coverage/us/ and https://onco.cc/coverage/uk/ | Who pays: Medicare Part B or D and assistance programmes; NICE, the Cancer Drugs Fund and the SMC |
| https://onco.cc/costs/ | Each cost driver paired with what is being done and the ideas that could do more |
| https://onco.cc/deals/ and https://onco.cc/exclusivity/ | Who bought or licensed what; when each product loses exclusivity |
| https://onco.cc/startups/ and https://onco.cc/investors/ | Venture-backed companies attacking cancer, by stage, modality and investor |
| https://onco.cc/catalysts/ | Regulatory decisions, readouts and congresses, with a calendar feed |
| https://onco.cc/resistance/ | Escape routes per drug class and the countermeasures |
| https://onco.cc/mechanics/ and https://onco.cc/atlas/ | How cancer works, drawn stage by stage; organ schematics and where each cancer spreads |
| https://onco.cc/molecules/ | Every product with a three-dimensional structure |
| https://onco.cc/live/ | Living with cancer: appointments, side effects, second opinions, hair loss, complementary approaches graded by evidence |
| https://onco.cc/irae/ and https://onco.cc/calculators/ | Checkpoint-inhibitor toxicity by organ and grade; dosing calculators |
| https://onco.cc/institutions/ and https://onco.cc/countries/ | Cancer centres mapped and ranked; country deep dives |
| https://onco.cc/heroes/ | The patients, families, advocates and pioneers whose lives changed cancer |
| https://onco.cc/completeness/ and https://onco.cc/corrections/ | How much of the known world is covered, and every correction made |
| https://onco.cc/api/ and https://onco.cc/build/ | The corpus as JSON, the OpenAPI description, recipes, the MCP server |

## Boilerplate

> OnCo (onco.cc) is a public, cited knowledge graph of oncology: every cancer, treatment, target, trial, company, institution and person on its own page, in plain English first, with every fact dated and linked to its source. The corpus is published as a website, a static JSON API, Markdown files for language models, Atom feeds, a command-line tool and an MCP server. Data are free for individual and educational use with attribution; commercial use must pay for a licence. Code is open source. OnCo is not medical advice. Made by Jude Gomila.

## For directory forms

- Name: OnCo
- One line: A cited, open knowledge graph of oncology with a JSON API, Markdown for language models and an MCP server.
- Category: Health and medicine; Open data; Developer tools
- Install (MCP): `npx -y onco-mcp` or `claude mcp add onco -- npx -y onco-mcp`
- Install (CLI): `npx onco search "HER2-low breast cancer"`
- Repository: https://github.com/judegomila/OnCo
- Licence: MIT (code), CC BY-NC 4.0 (data)

## Images

- Open Graph image (1200 by 630): https://onco.cc/og.png, also `public/og.png` in the repository
- Icons: `public/icons/` and `src/app/apple-icon.svg`
- Screenshots: take them from the live pages listed above; every page carries its own Open Graph image, so a shared link previews correctly.

## Contact

- Corrections and questions: the "Suggest an edit" link on any page, or https://github.com/judegomila/OnCo/issues
- Commercial licences: open an issue with the label "licensing" or use the contact on https://onco.cc/about/
- Press: there is no press email in the repository yet; the owner should add one here and on `/about/` before sending this kit.
- Maker: Jude Gomila, https://judegomila.com

## Data sources to acknowledge

PubChem, RCSB PDB, Wikimedia Commons and Wikidata, OpenAlex, GLOBOCAN (IARC), ClinicalTrials.gov, Europe PMC, openFDA, DailyMed, FDA, EMA, NICE, the NCI cancer type and drug lists, the Open Medical Registry, and the publishers and institutions linked on each page. The full list with licences is at https://onco.cc/data-sources/.
