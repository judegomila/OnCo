# Launch copy

Ready to paste, each piece factual and free of claims the site cannot back. Before posting: run `curl -s https://onco.cc/api/v1/meta.json | jq .total` and replace "more than 6,000" with the live figure if you want the exact number, check that every URL below loads, and keep the not-medical-advice line wherever a treatment is mentioned. The owner posts under their own name; nothing here posts itself.

## Show HN

**Title** (80 characters is the limit):

Show HN: OnCo, a cited open knowledge graph of oncology with a JSON API and MCP server

**Post body:**

I have been building OnCo (https://onco.cc), a public, cited knowledge graph of oncology. Every cancer, treatment and test, target, technology, trial, key paper, company, institution and person has its own page: a plain-English summary first, the technical detail after, every fact dated and linked to a primary source. Where a number is not sourced it is left out. There are more than 6,000 records in 18 kinds, and the links go in every direction, so you can start from a target and walk to the drugs that hit it, the trials that tested them, the resistance mechanisms, the companies, the approvals by region and when exclusivity ends.

The same corpus ships as:

- a static JSON API under https://onco.cc/api/v1/ (no key, CORS on), with NDJSON and CSV per kind, a JSON Schema generated from the Zod schema that validates the corpus, and an OpenAPI 3.1 description at /api/v1/openapi.json
- one Markdown context file per record for language models (/api/v1/context/<id>.md) plus /llms.txt and /llms-full.txt
- RDF N-Triples with owl:sameAs to Wikidata
- Atom feeds for regulatory events, the readout calendar, the research pulse and the changelog
- an MCP server (`npx -y onco-mcp`: search, get_entity, list_kind, ask, context, compare) and a CLI (`npx onco`)

Stack: Next.js static export, TypeScript records validated by Zod at build time, everything computed at build so nothing is served dynamically. The repository is https://github.com/judegomila/OnCo: the data are TypeScript files under src/data, so a correction is a pull request.

Things I want to be upfront about. It is being built in the open and will contain mistakes; every correction is logged at https://onco.cc/corrections/, and https://onco.cc/completeness/ measures the corpus against named external lists (NCI cancer types, FDA and EMA approved oncology drugs, NCI-designated centres and so on) so you can see what is missing. No page has yet been signed off by a named reviewer; that queue is public at /review/. It is not medical advice.

Licence: code MIT; data CC BY-NC 4.0, free for individual and educational use with attribution, commercial use has to pay. I know NC is a trade-off and I am happy to discuss it.

I would like to hear what is wrong, what is missing, and what you would build on it.

**Replies to keep ready** (answer in your own words; these are the facts):

- "How do you know it is right?" Every fact links its primary source and carries the date it was checked. Weekly workflows cross-check trial statuses against ClinicalTrials.gov and US labels against openFDA; the audit page lists contradictions and stale records; corrections are public. Named clinical review has not started and is the biggest gap.
- "Why NC?" Individuals, students, charities and academics use it free. Companies that want it inside a product pay, which is how the work is funded without advertising or tracking.
- "Why static?" Everything is derived from the corpus at build time, so there is nothing to scale, nothing to leak, and the API is just files on a CDN.
- "Is it an LLM writing this?" Records are TypeScript files in the repository with a git history per record (/history/); sources are checked by scripts against the registries named above. Summaries are edited text with a source list, not generated at request time.

## Product Hunt

**Name:** OnCo

**Tagline** (60 characters):

The cited, open knowledge graph of cancer treatment

**Description:**

OnCo is a free reference for oncology that is also a dataset and an API. Every cancer, treatment and test, target, trial, company, institution and person has a page that opens in plain English and continues into the technical detail, with every fact dated and linked to its source. Tools built from the records: an explorer that ranks everything for a chosen cancer, lines of therapy by biomarker, trial results explained as people out of 100, approvals by region, what insurers and the NHS pay for, deals and exclusivity expiry, a catalyst calendar, a resistance atlas, animated schematics and three-dimensional molecules, and a living-with-cancer area. For builders: a static JSON API with no key, an OpenAPI description, Markdown files for language models, Atom feeds, a CLI and an MCP server for Claude and Cursor. Free for individual and educational use with attribution; commercial use pays for a licence. Open source code. Not medical advice: every page links the primary source so you can check.

**First comment (maker):**

Hello Product Hunt. Two things to say plainly before anything else. First, OnCo is not medical advice; it is a reference that explains the words and shows the sources, and it does not replace a clinical team. Second, it is being built in the open and will have mistakes; the corrections log and the completeness dashboard are public, and every page has a "Suggest an edit" link that reaches me. The data are free for individuals, students and charities; companies that want them inside a product pay for a licence, which is how this stays free of advertising and tracking. Ask me anything about how it is built.

**Topics:** Health, Open Source, Developer Tools, Data, Artificial Intelligence

## LinkedIn

OnCo is live at onco.cc.

It is a public, cited knowledge graph of oncology: more than 6,000 records in 18 kinds, one page each, plain English first, every fact dated and linked to its source. The same pages serve a patient asking what a drug does and an analyst asking when it loses exclusivity.

For people who follow the business of oncology, the pages I would start with:

- Startups and investors: venture-backed companies attacking cancer, by stage, modality, cancer and investor, including the Y Combinator cohort checked one by one. onco.cc/startups
- Deals and licences: who bought or licensed what, for how much, and where assets flow between regions. onco.cc/deals
- Exclusivity expiry: when each product loses patent or regulatory exclusivity, and the biosimilars and generics coming. onco.cc/exclusivity
- Catalysts: regulatory decisions, expected readouts, filings and deal closings by company, with a calendar feed. onco.cc/catalysts
- Pipeline and addressable population: assets by phase for any target or cancer, and incidence times prevalence times setting share with every input linked. onco.cc/pipeline and onco.cc/market

For builders: a static JSON API with no key, an OpenAPI description, Markdown files for language models, and an MCP server so Claude or Cursor can query the corpus with citations.

The data are free for individual and educational use with attribution. Commercial use, including inside a company's own pipeline, needs a licence; if that is you, the details are at onco.cc/about.

It is not medical advice, it is being built in the open, and it will have gaps: onco.cc/completeness shows exactly which. Tell me what is wrong and I will fix it.

## Three short lines (under 280 characters each)

1. OnCo is live: a cited, open knowledge graph of oncology. Every cancer, drug, target, trial, company and person on its own page, plain English first, every fact dated and linked to its source. Free for individuals and education. Not medical advice. https://onco.cc

2. For builders: the whole OnCo corpus as static JSON with no key, an OpenAPI description, one Markdown file per record for language models, RDF triples, Atom feeds, and an MCP server for Claude and Cursor: `npx -y onco-mcp`. Data CC BY-NC 4.0, code MIT. https://onco.cc/build/

3. Which cancer drugs are approved in the US but not the EU, UK, Japan, China or Australia? One grid, every cell linked to the regulator. https://onco.cc/regulatory/regions/ (Reference only, not medical advice.)

## Lines for specific audiences (optional)

- Clinicians: Checkpoint-inhibitor toxicity by organ and grade: hold, steroids, escalation, rechallenge, with sources, printable. https://onco.cc/irae/ Reference only; follow your institution's protocol.
- Scientists: Resistance mechanisms with no countermeasure, or only a preclinical one, per drug class: the drug-design opportunities, each with its evidence. https://onco.cc/resistance/gaps/
- Data people: The OnCo corpus is on GitHub releases as JSON, NDJSON, CSV and JSON Schema, with a citation file and a DOI per release. https://github.com/judegomila/OnCo/releases
- Patients and carers: Every trial result in plain words: people out of 100, medians explained, surrogate endpoints flagged. https://onco.cc/explained/ Not medical advice; bring questions to your clinical team.

## What not to say

- No survival figures in any post or image.
- No "most complete", "most accurate", "trusted by" or comparisons with named sites.
- No count that did not come from meta.json on the day.
- No claim that a page has been clinically reviewed until a named reviewer appears on /reviewers/.
- No advice, even by implication: "shows which options exist", never "tells you what to take".
