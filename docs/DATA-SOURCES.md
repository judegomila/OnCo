# Open data behind OnCo

An inventory of the open databases that feed the corpus today and the ones that could feed it next. The machine-readable form is `src/data/data-sources.ts` (rendered at `/data-sources/`); this file is the long form with field mappings and the reasoning.

Licences were read from each source's own terms page on 2026-09-09. Where a page could not be fetched by script (bot-gated, JavaScript-only or 403) the entry says **unverified** and gives the best available statement rather than a guess; those rows need a manual browser check before anything is ingested. Licences change: check the source before reusing anything.

Ground rules that apply to every row:

- We store counts, identifiers and short derived records, never wholesale copies of a database. Every page links back to the primary record.
- Every snapshot under `public/` carries `source`, `fetched` and, where the source states one, `license`. Scripts send a named `User-Agent` with a contact address, one request at a time with backoff.
- Sources with academic-only, non-commercial or all-rights-reserved terms (COSMIC, OncoKB, DrugBank, KEGG, NCCN text, IARC data beyond citation, SMC text, Semantic Scholar API) are linked, not ingested, unless their terms allow redistribution compatible with the corpus licence (CC BY 4.0).
- No patient-level data, no personal data beyond public professional profiles, no scraping of patient forums or social media. Epidemiology is aggregate estimates only.

## Part A: what we already pull from

### A1. By script or live query

| Source | What we take | Script / component and workflow | Cadence | Licence and attribution | Coverage in the corpus | Known gaps |
|---|---|---|---|---|---|---|
| **ClinicalTrials.gov API v2** (clinicaltrials.gov/data-api/api) | Phase 2/3 studies per product: NCT, title, status, phases, conditions, start and primary-completion dates, lead sponsor; `overallStatus` for our own trial records; study counts per location country | `scripts/fetch-trials.ts` → `public/trials/<drugId>.json` + `index.json`; `scripts/factcheck.ts` → `public/factcheck.json`; `scripts/fetch-countries.ts` (trials per country); `TrialFinder`, `TrialFinderGeo` live in the browser (`src/lib/ctgov.ts`, `ctgov-geo.ts`) | Weekly PRs: `refresh-trials.yml` (Mon 06:17 UTC), `factcheck.yml` (Mon 06:41 UTC); countries by hand | Public domain (US Government work, NLM); "Courtesy of the National Library of Medicine" requested | 94 product snapshot files (fetched 2026-09-06); 90 trials status-checked; 181 clinicaltrials.gov links in hand-written records | Results sections, arms, eligibility and outcome measures not pulled; `query.intr` name matching misses code-named agents and over-matches classes; no published rate limit (we hold 350 ms); investigator contacts are personal data and are never stored |
| **Europe PMC REST API** (europepmc.org/RestfulWebService) | Hit counts per year 2019-2026, last-12 vs prior-12 months, five most recent titles (title, DOI, PMID, journal, date, citations) per drug, target, cancer, technology | `scripts/fetch-papers.ts` → `public/papers/<id>.json` + `index.json`; query builders in `src/lib/europepmc.ts`; `LatestPapers` live on entity pages | Weekly PR: `refresh-papers.yml` (Tue 05:41 UTC, `--force`) | No standalone licence for search metadata; OA full text under CC licences, other content publisher copyright; API use accepts Europe PMC terms; terms forbid systematic batch retrieval of articles (we store counts and citation metadata only) | 546 entity snapshots (fetched 2026-09-08); `/papers/` ranks fastest-growing topics | Title/abstract phrase queries measure attention, not quality; vague names skipped or curated in `TECH_QUERIES`; no citation graph; only four kinds |
| **GLOBOCAN 2022** (gco.iarc.who.int, via `gco-api.iarc.fr`) | New cases, incidence ASR, deaths, mortality ASR, cumulative risk to 74 for 185 countries × 36 sites, both sexes, all ages, plus world | `scripts/fetch-globocan.ts` → `public/globocan/countries.json`; `src/lib/globocan.ts`, `src/data/globocan-map.ts` (OnCo cancer → GCO codes) | By hand (`npm run fetch:globocan`); single edition 2022 | IARC copyright notice: reproduction for research or private study with acknowledgement of IARC and the URL; **not for commercial purposes without written permission**; citation printed on every page | `/cases/`, `/countries/`, burden panels on cancer pages; cancers with no direct estimate or a shared site are disclosed | Endpoint undocumented and refuses anonymous clients (we send a named UA); snapshot cannot be relicensed CC BY, it stays IARC's and cited; no sex or age split; Cancer Tomorrow and Cancer Over Time not used |
| **OpenAlex** (help.openalex.org/api) | Oncology works (primary topic subfield 2730) and citations per institution, 2024-2025; works per author country 2021-2025, highly cited (>50), open-access share | `scripts/fetch-openalex.ts` → `public/openalex/institutions.json`; `scripts/fetch-countries.ts` → `public/openalex/countries.json` | By hand (`npm run fetch:openalex`, `fetch:countries`) | CC0 1.0 | `/universities/`, `/countries/`; institutions resolved by search with a manual override table | OpenAlex now meters use as a daily budget (about US$1/day free, ×10 with a free key); last institution run was rate-limited and citation sums are pending; author-level data unused |
| **PubChem PUG REST** | 3D (or 2D) SDF per compound → compact atom and bond arrays | `scripts/fetch-structures.ts` (from `src/data/structures.ts`) → `public/structures/pubchem-<cid>.json` + `index.json` | By hand (`npm run fetch:structures`); idempotent | Public domain for NCBI-authored content; depositor records may carry third-party rights; NLM acknowledgement requested; policy: ≤5 requests/s, 30 s per request, no API keys | 274 structure files across small-molecule products, payloads and linkers (rotating wireframes) | V3000 SDF unsupported; biologics have no structure (explained placeholder) |
| **RCSB PDB** | PDB file → C-alpha trace, drug-like ligands, pocket residues | `scripts/fetch-structures.ts` → `public/structures/pdb-<id>.json` | By hand | CC0 1.0 for archive files; entry authors attributed; no request-rate limit set | Antibody-antigen and drug-target complexes (e.g. sacituzumab Fab–TROP2, 9PI9) | Pocket capped at 1,500 atoms; ids curated by hand |
| **Wikidata + Wikimedia Commons** | Organisation logos (P154) with per-file Commons licence, after P856 domain and P31 class verification; Wikipedia links on entities | `scripts/fetch-logos.ts` → `public/logos/<id>.<ext>` + `index.json`; `wikipedia` field on entities | By hand (`npm run fetch:logos`); idempotent | Wikidata structured data CC0 1.0; each Commons file keeps its own licence (recorded per file); descriptive User-Agent mandatory | 441 logo files for companies, institutions and collections; 160 en.wikipedia links | Clearbit and Google favicons are fallbacks and not open data (labelled as such); logos are trademarks shown for identification only |
| **openFDA drug label** (open.fda.gov/apis/drug/label) | Existence of a US prescribing-information record per US-approved product (`openfda.generic_name`) | `scripts/factcheck.ts` → `public/factcheck.json` → `/audit/` | Weekly PR: `factcheck.yml` | CC0 1.0 (openFDA licence page); credit to FDA requested; 240 req/min and 1,000/day per IP without a key, 120,000/day with a free key | 130 products checked (2026-09-08) | Only label existence, not dates or indications; fuzzy search and four-letter biologic suffixes need a strong/weak match rule; `drugsfda`, NDC and adverse-event endpoints unused |
| **OpenStreetMap Nominatim** | Geocode of a reader's town, on explicit action | `src/lib/ctgov-geo.ts`, `TrialFinderGeo` (browser only, nothing stored) | Live | ODbL 1.0; usage policy: attribution, User-Agent, ≤1 request/s, no bulk geocoding | Trial finder distance filter | None; we never batch |
| **world-atlas (Natural Earth)** | Country outlines (`countries-110m.json`) | `src/components/WorldMap.tsx` loads from jsDelivr at runtime | Pinned package | Natural Earth public domain; world-atlas ISC | Institutions map, GLOBOCAN choropleth | Third-party CDN dependency (could be self-hosted) |

### A2. Read by hand and cited (no script yet)

| Source | What we take | Where it lands | Cadence | Licence and attribution | Coverage | Known gaps |
|---|---|---|---|---|---|---|
| **DailyMed** (NLM) | Grade 3+ adverse-event rates and dosing from US labels, each row linking the setid | `src/data/drug-depth.ts` → product pages, `/toxicity/` | When a label changes | Public domain (US Government) | Toxicity and dosing on products with depth records | SPL XML tables are free text; a REST/SPL service exists and could replace manual reading |
| **FDA OCE approval notifications, Drugs@FDA letters** | Approval dates, indications, CRLs | `drugs.ts`, `drug-depth.ts`, `regional-approvals.ts` → `/regulatory/`, region matrix | Continuous | Not copyrighted (FDA website policy); credit appreciated | 108 fda.gov and 24 accessdata.fda.gov links | Manual transcription; fact check tests label existence only |
| **EMA EPARs** | EU authorisation status and dates | `regional-approvals.ts` (EU rows marked `verified`); UK/JP/CN/AU rows link regulator searches | EU rows verified 2026-09-08 | EMA legal notice: reproduction permitted for commercial and non-commercial purposes with EMA acknowledged in each copy; company-authored content excluded | Six-region matrix for approved and late-stage products | No structured feed for MHRA, PMDA, NMPA, TGA; absence means unknown |
| **NCCN and ESMO guidelines** | Guideline category / ESMO-MCBS grade per standard-of-care row, with link | Cancer records (`standardOfCare.guideline`), `GuidelineChip` | Per guideline version | NCCN: free with registration, non-commercial, not redistributable (we never copy text); ESMO: free | 137 nccn.org links | Category strings best-effort; need reviewer passes |
| **World Bank** (SP.POP.TOTL) | 2024 population per country | `src/data/country-extras.ts` → `/countries/` | By hand | CC BY 4.0 | Denominators for per-capita output | Could be one Indicators API call |
| **Newsweek/Statista, Nature Index, SCImago** | Oncology hospital rank; research-output positions | Institution records (`newsweekOncology2026`), `src/lib/ranking.ts` | Annual | Proprietary publications; we record rank positions as cited facts with methodology links | Institution ranking (formula printed under the table) | One number per institution only; no bulk reuse |
| **Clarivate JCR** | 2023 impact factor where widely published | `src/data/journals.ts` | Annual | Proprietary; individual well-known figures only | Journals table | No other metrics |
| **cBioPortal** | Alteration frequency per cancer, read from study views | Target `prevalence` rows → `/prevalence/` | By hand | ODC ODbL with attribution to original studies; some studies restrict commercial use | 47 cbioportal.org links | API could compute per gene and study |

Also cited but not pulled: NEJM, Lancet, JCO and other journals via DOI (622 doi.org links), PubMed (56), NCI PDQ (30), WHO (28), company and institution sites. These are citations, not data feeds.

## Part B: what we could extend to

Effort: **S** = a day, one script and a snapshot; **M** = a week, new fields or a page; **L** = new kinds, licences to negotiate or heavy parsing. "Map to" names OnCo kinds and pages (`drug`, `trial`, `target`, `cancer`, `company`, `institution`, `person`, `pathway`, `term`, `collection`; `/regulatory/regions/`, `/evidence/`, `/calendar/`, `/prevalence/`, `/tumor-board/`, `/funding/`, `/cases/`, `/audit/`).

### B1. Trials and results

| Source | URL | Access | Licence and attribution | Map to | Effort | Risks |
|---|---|---|---|---|---|---|
| ClinicalTrials.gov results sections | clinicaltrials.gov/data-api/about-api/study-data-structure | REST (same API; `resultsSection`, `armsInterventionsModule`, `eligibilityModule`) | Public domain (NLM); attribution requested | `trial.outcomes`, `trial.enrolment`, arms; `/evidence/`; primary-completion dates → `/calendar/`; AE tables → `/toxicity/` | M | Results posted for a minority, lag ≥1 year; outcome measures free text; sponsor text may carry third-party copyright |
| EU CTR (legacy) and CTIS | euclinicaltrials.eu; clinicaltrialsregister.eu | HTML search; CTIS portal with CSV export, JSON endpoints refuse scripts, no documented API | Legacy: reuse with attribution "EU Clinical Trials Register" + access date; CTIS legal notice **unverified** (404) | `trial` (EU-only studies, EU trial numbers as cross-ids), `countries` | M | HTML parsing; e-mail addresses may not be used for marketing; results are PDFs |
| ISRCTN | isrctn.com (XML API at `/api/query`) | REST XML, no key; CSV export | Record content CC BY; metadata from 2019 CC0; earlier metadata not CC0; documented API page currently 404 | `trial` (UK academic and NIHR trials) | S | Undocumented endpoint may change |
| WHO ICTRP | trialsearch.who.int | Search UI with XML export; web service and crawling service gated (free for research, charged for businesses; crawling unavailable when checked) | WHO default CC BY-NC-SA 3.0 IGO; ICTRP-specific terms **unverified** | `trial` bridging ids across 17 registries (de-duplication), `countries` | M | Non-commercial; no free bulk API; registry quality varies |
| jRCT (Japan) | jrct.mhlw.go.jp/en-top (moved from jrct.niph.go.jp) | Web UI only | MHLW copyright, all rights reserved; **automated or bulk collection deemed impermissible** | `trial` (Japan), `/regulatory/regions/` | L | Link only; do not scrape |
| ChiCTR (China) | chictr.org.cn/indexEN.html | Web UI only | All rights reserved | `trial` (China), `company` (Chinese pipelines) | L | Anti-bot, Chinese-language; scraping breaches terms; also indexed by ICTRP |
| CTRI (India) | ctri.nic.in | Web UI only | Site terms, no explicit licence; CTRI disclaims verification | `trial` (India), `countries` | M | No API; investigator contacts are personal data |

### B2. Regulatory

| Source | URL | Access | Licence and attribution | Map to | Effort | Risks |
|---|---|---|---|---|---|---|
| openFDA `drugsfda`, NDC | open.fda.gov/apis/drug/drugsfda | REST JSON | CC0 1.0 | `drug.approvals` (application no., dates, submission types), `regulatoryEvents` → `/regulatory/`; `/audit/` date checks | S | Same rate limits; indications live in labels |
| Drugs@FDA data files | fda.gov/drugs/drug-approvals-and-databases/drugsfda-data-files | Bulk zip of 12 tab-delimited tables, each weekday | Not copyrighted (FDA policy) | Full reconciliation of `drug.approvals` | S | Readme-only schema; brand/generic matching |
| FDA Purple Book | purplebooksearch.fda.gov/downloads | Monthly CSV + XLSX (2020→) | No licence text on site; FDA policy applies | `drug` biologics: BLA number, licensure date, reference product, biosimilar/interchangeable, exclusivity → biosimilar layer on antibody pages | S | Retroactive history changes |
| EMA medicines data + website JSON | ema.europa.eu/en/medicines/download-medicine-data; `/download-website-data-json-data-format` | Nightly XLSX tables; twice-daily JSON dumps of the site | Reproduction permitted (commercial and non-commercial) with EMA acknowledged in each copy; third-party content excluded | EU column of `/regulatory/regions/`, `drug.approvals`, CHMP opinions → `/calendar/` | S | No query API; company-authored product information excluded |
| MHRA Products | products.mhra.gov.uk | Web UI; no documented API or bulk feed | GOV.UK content OGL v3 except where stated; Products site shows no licence; SmPC/PIL are licence-holder documents (**unverified**) | UK column, `drug` | M | Undocumented endpoints; post-Brexit dates |
| PMDA approved products | pmda.go.jp/english/.../0002.html | One PDF list (2004→) + review reports | Japan Public Data License 1.0 with attribution; **bulk, frequent or automated downloads prohibited** | Japan column, `drug` | L (manual read) | Automated crawling forbidden; machine-translated pages |
| NMPA / CDE | english.nmpa.gov.cn; cde.org.cn | Web UI; English databases limited to vaccines and CPPs | All rights reserved | China column, `drug`, `company` | L | Chinese-only, anti-bot, no API, data-export considerations |
| TGA ARTG | tga.gov.au/resources/artg; data.gov.au extract | Search + public extract | **Unverified** (fetches refused); TGA content normally CC BY | Australia column, `drug` | S | Confirm licence; extract covers all goods, filter by ATC |
| Health Canada DPD + NOC | health-products.canada.ca/api/documentation/dpd-documentation-en.html; noc-ac | REST JSON (12 endpoints, no key) + monthly extract; NOC text extracts | DPD: Open Government Licence – Canada; NOC extract **unverified** | New Canada column (schema change), `drug` | S | Region enum change; sponsor-authored monographs |

### B3. Pricing and access

| Source | URL | Access | Licence and attribution | Map to | Effort | Risks |
|---|---|---|---|---|---|---|
| CMS Part B ASP pricing files | cms.gov/medicare/payment/part-b-drugs/asp-pricing-files | Quarterly zip (ASP, NOC, NDC-HCPCS crosswalk) | US Government work presumed; no licence text (**unverified**); check zip readme for AMA CPT notices | `drug.access` (US price per dose for infused agents), `company` | M | HCPCS mapping by hand; ASP+6% is payment, not list |
| Medicaid NADAC | data.medicaid.gov | DKAN REST + CSV, weekly | US Government work (licence field → usa.gov/government-works) | `drug.access` for oral agents | S | Retail channel only |
| Medicare Part D / Part B spending by drug | data.cms.gov (JSON:API, pages ≤5,000, no key) | REST | US Government work (catalogue default) | `drug` US spend line, `company`, `/report/` top-spend table | S | Two-year lag; small cells suppressed |
| NICE Syndication API | nice.org.uk/reusing-our-content/syndication | REST with registration and key | **Unverified** (403); known to require key and content terms (display without alteration) | UK access column, `drug.access`, guidance in development → `/calendar/` | M | Terms to confirm by hand |
| Scottish Medicines Consortium | scottishmedicines.org.uk/medicines-advice | Web pages | Copying for NHSScotland and not-for-profit education only; **no reproduction by or for commercial organisations without permission** | `drug.access` (Scotland decisions, dates) | M | Cite decisions, never copy text |
| IQWiG / G-BA | g-ba.de/ais (bulk XML + XSD, 1st and 15th monthly; RSS); iqwig.de | Bulk XML; PDFs | G-BA general terms of use (ANB) **unverified**; IQWiG notice **unverified** | `drug` added-benefit grade per indication; `/evidence/` | M | Read ANB before redistribution; German-first |
| Australian PBS Public Data API | data.pbs.gov.au (v3 REST) | REST JSON + CSV; legacy XML discontinued | Commonwealth copyright; API data licence **unverified**; public API throttled to **one request per 20 s shared by all users** | `drug.access` (Australia listing, PBAC outcome), region matrix | M | Throttle makes bulk impractical |

### B4. Literature

| Source | URL | Access | Licence and attribution | Map to | Effort | Risks |
|---|---|---|---|---|---|---|
| PubMed E-utilities | ncbi.nlm.nih.gov/books/NBK25497 | REST XML/JSON; 3 req/s (10 with key) | NCBI content public domain; abstracts may be publisher copyright; NCBI disclaimer must be shown | `paper` MeSH and publication type; `person.papers`; `/papers/` quality filter | S | Night/weekend for large jobs |
| Crossref REST | api.crossref.org (polite pool via `mailto`; 50 req/s headers) | REST JSON | Metadata free for any purpose; some abstracts publisher copyright | Resolve 622 DOIs: `paper` metadata, references, funder ids → `/funding/`; `journal` ISSN/publisher | S | 429 backoff |
| OpenAlex works/authors/topics | help.openalex.org/api | REST JSON (budget-metered) | CC0 1.0 | `paper` citations, `person` (ORCID-linked output), topic trends for `/papers/` | M | Author disambiguation; daily budget |
| Semantic Scholar API | semanticscholar.org/product/api | REST JSON; shared unauthenticated pool, 1 req/s per key | **AI2 API licence: internal non-commercial research use only; public displays must show the Semantic Scholar name and logo and link back with `utm_source=api`**; commercial use by agreement | `paper` influential citations (display only) | M | Not an open licence; conflicts with CC BY redistribution |
| bioRxiv / medRxiv API | api.biorxiv.org | REST JSON, 100 records per call | No API licence statement (**unverified**); each preprint carries its author-chosen licence | `/papers/` preprints, `/pulse/` | S | Label as preprints |
| Unpaywall API | unpaywall.org/products/api | REST JSON; e-mail parameter; ≤100,000 calls/day | **Unverified** (no licence statement found) | `paper` OA status and free full-text link | S | Confirm licence before storing |

### B5. Genomics and targets

| Source | URL | Access | Licence and attribution | Map to | Effort | Risks |
|---|---|---|---|---|---|---|
| cBioPortal web API | docs.cbioportal.org/web-api-and-clients | REST (OpenAPI), no key for public instance | ODC ODbL with attribution to original studies and cBioPortal papers; some studies restrict commercial use | `/prevalence/` computed alteration frequencies with sample counts; `target`; `/tumor-board/` | M | Per-study terms; heavy queries |
| NCI GDC API | gdc.cancer.gov/developers | REST JSON; token only for controlled data | Open data: no restrictions except re-identification ban | TCGA-based `/prevalence/`, `cancer` molecular subtypes | M | Open tier only; harmonisation changes |
| COSMIC | cosmickb.org/licensing | Registered download | Free for academic/not-for-profit; **commercial licence required for R&D, products, clinical reporting and public-facing websites** | Link only: `target` Cancer Gene Census, `/resistance/` signatures | L | Redistribution and public-website use barred |
| OncoKB | oncokb.org/terms | REST with API token | Personal reference or academic research only; no redistribution without MSK licence; credit required | Link only: `/tumor-board/` levels, `target`, `drug` actionability | L | Redistribution barred |
| CIViC | civicdb.org (GraphQL `/api/graphql`) | GraphQL; 3 req/s without key, unlimited with free key | CC0 1.0; cite Griffith et al. 2017 | `/tumor-board/` evidence items per biomarker and drug with PMIDs; `target`, `drug`, `biomarkers` | M | Uneven coverage; levels differ from OncoKB |
| ClinVar | ncbi.nlm.nih.gov/clinvar/docs/maintenance_use | E-utilities; weekly XML, monthly VCF | Public domain (NCBI places no restrictions); attribution requested; not for direct diagnostic use | `term` hereditary syndromes, germline `biomarkers`: pathogenic-variant counts per gene | M | Keep to gene-level summaries |
| DepMap | depmap.org/portal/data_page | Quarterly bulk files; portal asks not to be scraped | **Unverified** (portal refused fetch); described as CC BY 4.0 | `target` dependency summary (fraction of lines dependent, lineage selectivity); `idea`, `pairing` | M | Gigabyte files; offline aggregation |
| GTEx Portal | gtexportal.org/home/license; API v2 | REST JSON, no key | Custom terms: free, no warranty, attribution with access date or dbGaP accession; keep data current | `target` normal-tissue TPM across 54 tissues → on-target/off-tumour risk, `/toxicity/` | S | Bulk RNA, not protein |
| Open Targets Platform | platform-docs.opentargets.org/licence; GraphQL v4 | GraphQL, no key; bulk via downloads/BigQuery preferred | CC0 1.0; upstream commercial-arrangement sources agreed to unrestricted use | `target` association scores by disease, tractability, safety; `drug` mechanism and phase; `pathway` | M | Entity-by-entity querying discouraged; EFO→OnCo cancer mapping |
| UniProt | uniprot.org/help/license; rest.uniprot.org | REST, no key | CC BY 4.0 | `target` accession, function, domains, PDB/AlphaFold cross-refs (anchor for all joins) | S | Some entries under patents |
| ChEMBL | chembl.gitbook.io; `/chembl/api/data` | REST (XML/JSON), no key | CC BY-SA 3.0 | `drug` mechanism, target, max phase, ATC, first approval; `target`; payload chemistry | M | Share-alike on derived tables; ADC records patchy |
| DrugBank | go.drugbank.com/legal/terms_of_use | Bulk (academic, paused); commercial API | Academic CC BY-NC 4.0; Vocabulary and Structures CC0; commercial licence for anything else | CC0 vocabulary only (names, identifiers); link the rest | L | Non-commercial conflicts with CC BY |
| PubChem properties/synonyms | pubchem.ncbi.nlm.nih.gov/docs/pug-rest | REST | Public domain (NCBI content); depositor rights | `drug` formula, mass, SMILES, InChIKey, synonyms; payloads | S | 5 req/s |
| AlphaFold DB | alphafold.ebi.ac.uk/faq; small REST API | REST, no key; FTP bulk | CC BY 4.0 (academic and commercial) | `target` predicted structure wireframe where no PDB entry | S | Label as prediction; confidence colouring |
| Reactome | reactome.org/license; ContentService | REST, no key | CC0 (data); illustrations CC BY 4.0 | `pathway` canonical reactions and member genes | M | Finer granularity than our diagrams |
| KEGG | kegg.jp/kegg/legal.html | REST (academic only; ≤3 calls/s); FTP by subscription | **Academic users only; non-academic use requires a commercial licence** | Link only: `pathway` ids | L | Redistribution barred |
| STRING | string-db.org/cgi/access | REST (`caller_identity`, 1 s between calls); bulk downloads | CC BY 4.0 | `target` interaction partners (capped, thresholded), `pathway` | S | API for occasional use only |
| Human Protein Atlas | proteinatlas.org/about/licence; `/<ENSG>.json` | Per-gene JSON/XML/TSV; bulk | **CC BY 4.0** (not BY-SA 3.0 as often quoted); embedded AlphaFold 3 data CC BY-NC-SA 4.0 | `target` tissue specificity, cancer staining, prognostic markers; `/toxicity/` | S | IHC semi-quantitative; cite version |

### B6. Epidemiology

| Source | URL | Access | Licence and attribution | Map to | Effort | Risks |
|---|---|---|---|---|---|---|
| GCO Cancer Tomorrow / Over Time / Survival | gco.iarc.who.int | Same undocumented API family | IARC: research and private study with acknowledgement; not commercial | `/cases/` projections to 2050, trends; `/report/` | S | Undocumented; label projections |
| NCI SEER | seer.cancer.gov/data-software; api.seer.cancer.gov | SEER*Explorer tables; SEER API (Login.gov key, 5,000 calls/h, reference datasets); SEER*Stat under DUA | Published statistics US Government works; research data under SEER DUA; API reserves right to charge for high-volume/commercial use | `cancer` US incidence, stage distribution, 5-year survival by stage; `/prevalence/` | M | Case data off limits; acknowledge database version |
| CDC WONDER | wonder.cdc.gov/wonder/help/WONDER-API.html | XML over HTTP; must accept data-use restrictions per request; ~1 query per 2 min | Public domain; credit CDC WONDER and reproduce footnotes | `cancer` US mortality trends; `/report/` | M | **API returns national level only**; suppression <10 |
| ONS / NHS England NDRS | ons.gov.uk; digital.nhs.uk/.../cancer-registration-statistics | Spreadsheets | ONS OGL v3; NDRS **unverified** (bot-gated) | `cancer` England incidence, survival by stage, routes to diagnosis; `countries` | M | Manual downloads; layout changes |
| NORDCAN | nordcan.iarc.fr | Interactive app | IARC terms (non-commercial, acknowledgement) | `/cases/` Nordic survival benchmarks; `/report/` | M | No API |
| ECIS | ecis.jrc.ec.europa.eu | Interactive tool exports | **Unverified** (WAF rejects scripts); EC default CC BY 4.0 | `/cases/` EU estimates cross-check | M | Confirm notice by hand |
| CONCORD | csg.lshtm.ac.uk/.../concord-programme | Lancet papers and appendices | No dataset licence; publisher copyright | `cancer` 5-year net survival by country (transcribed, cited) | L | Data by request only |

### B7. Care and quality

| Source | URL | Access | Licence and attribution | Map to | Effort | Risks |
|---|---|---|---|---|---|---|
| NCDB | facs.org/.../national-cancer-database | PUF for CoC investigators under DUA; public benchmark tools | Restricted; **facs.org terms prohibit use of ACS content in AI/ML systems without authorisation** | Cite aggregate reports only: `cancer` US treatment patterns | L | Patient-level closed; AI-use clause |
| COSD | digital.nhs.uk/ndrs/data/data-sets/cosd | Record-level via DARS only | Identifiable data; aggregate outputs via NDRS (licence **unverified**) | Only via published aggregates | L | Out of scope for a public corpus |
| NATCAN audits | natcan.org.uk | PDF reports, dashboards | **All rights reserved** (not OGL despite NHS commissioning) | `cancer` UK treatment rates; `institution` trust-level indicators | M | Permission needed; trust name mapping |
| CMS Care Compare | data.cms.gov/provider-data (DKAN REST + SQL, no key) | REST | US Government work presumed; no licence field in metadata (**unverified**) | `institution` US quality measures (few oncology-specific) | M | Provider-id mapping |
| NHS England cancer waiting times | england.nhs.uk/statistics/.../cancer-waiting-times | Monthly XLSX/CSV | OGL v3 | `institution` 62-day performance; `bottleneck` diagnostic delay | S | Layout and ICB boundary changes |
| GIRFT | gettingitrightfirsttime.co.uk | PDF reports | Copyright GIRFT; no explicit licence (**unverified**) | `bottleneck`, `cancer` variation | M | Cite, do not ingest |

### B8. Institutions and people

| Source | URL | Access | Licence and attribution | Map to | Effort | Risks |
|---|---|---|---|---|---|---|
| OpenAlex institutions and funders | help.openalex.org/api | REST | CC0 1.0 | `institution` ROR, geo, type, homepage, output by topic; `/funding/` funder entities | S | Daily budget |
| ROR | ror.readme.io/docs/rest-api; Zenodo dump | REST v2, no key, 2,000 req/5 min | CC0 1.0 | `institution.ror` canonical id, aliases, location → exact joins | S | None |
| ORCID public API | info.orcid.org/documentation/features/public-api | REST (client credentials); 12 req/s, 100k reads/day registered; annual public data file | Public data file CC0 1.0; API terms; records as researchers publish them | `person.orcid`, affiliations, works (link, do not copy) | M | Personal data; public-only, no unsolicited contact |
| NIH RePORTER | api.reporter.nih.gov | REST JSON, no key, 1 req/s | US Government work (policy page not fetched) | `/funding/` NCI grants by institution and cancer; `institution`; `person` PIs | S | PI names are personal data (public record) |
| UKRI Gateway to Research | gtr.ukri.org/resources/api.html | REST XML/JSON, no key | OGL v3 | `/funding/` MRC/NIHR grants; `institution` UK | S | Named PIs; excludes CRUK's own grants |
| EU CORDIS | data.europa.eu (cordis datasets) | Bulk CSV/XLSX/JSON | CC BY 4.0 (Decision 2011/833/EU) | `/funding/` Cancer Mission; `institution` Europe | S | Organisation-name mapping; contact names |
| GRID (retired) | grid.ac | Figshare dumps to 2021 | CC0 1.0 | Legacy id resolution only | S | Use ROR |

### B9. Companies and pipelines

| Source | URL | Access | Licence and attribution | Map to | Effort | Risks |
|---|---|---|---|---|---|---|
| SEC EDGAR | sec.gov/search-filings/edgar-application-programming-interfaces | REST JSON (submissions, XBRL frames), full-text search, bulk; 10 req/s with declared User-Agent | Free to access and reuse; attribution to SEC requested | `company` revenue, R&D, pipeline tables (10-K); 8-K → `/calendar/` | M | Free-text extraction; US-listed only |
| UK Companies House API | developer.company-information.service.gov.uk | REST JSON; free key; 600 req/5 min | OGL v3 (Crown copyright) | `company` UK registration, status, accounts | S | Officer/PSC personal data: company-level only |
| OpenCorporates | opencorporates.com/terms-of-use-2 | REST with key | ODbL share-alike with required "from OpenCorporates" link (free keys for journalists, NGOs, academics); non-share-alike keys paid | `company` jurisdiction, parent-subsidiary links | M | Share-alike; quotas |
| USPTO PatentsView → Open Data Portal | data.uspto.gov | REST (new ODP key with USPTO.gov account and MFA); old `search.patentsview.org` no longer resolves | USPTO government works public domain in US, "Source: USPTO" requested; PatentsView CC BY 4.0 **unverified** during migration | `company` patent counts; `drug` key patents and expiry; `technology` | M | Service in flux; inventor names; patent→product linking |
| Google Patents Public Data (BigQuery) | github.com/google/patents-public-data (archived Apr 2026) | BigQuery SQL (first 1 TB/month free) | Dataset licence **unverified** (Marketplace page JS-only); repo Apache 2.0 for code | `company` global families; `technology` patent trends | L | Cloud costs; archived repo |
| EPO OPS | epo.org/.../ops; developers.epo.org | REST with OAuth registration | EPO terms and fair-use charter; free quota **unverified** | `company` European patents; `drug` SPC dates | M | OAuth, throttling, XML |
| ClinicalTrials.gov sponsor fields | clinicaltrials.gov/data-api/api | REST (already fetched) | Public domain (NLM) | `company` active trials by phase; `institution` site counts; `/leadership/` | S | Sponsor name variants (alias table exists) |
| Wikidata SPARQL | query.wikidata.org | SPARQL (60 s, 5 parallel/IP, mandatory User-Agent) | CC0 1.0 | `company` founded, HQ, ticker, parent; `drug` INN, ATC, cross-ids; `institution`; `person` public facts | S | Keep people to public professional facts |

### B10. Imaging and pathology

| Source | URL | Access | Licence and attribution | Map to | Effort | Risks |
|---|---|---|---|---|---|---|
| TCIA | cancerimagingarchive.net/data-usage-policies-and-restrictions; NBIA REST v1 | REST, no key | Most collections CC BY 3.0/4.0, some CC BY-NC; controlled collections via dbGaP since 2025; cite collection DOI + Clark 2013 | `collection` per cancer and modality (metadata only); `technology` imaging examples | M | De-identified patient data: index only, never host images, no re-identification |
| NCI IDC | learn.canceridc.dev/data/licensing.md; BigQuery `dicom_all` | BigQuery; REST for licences and citations | Per series: ~75% CC BY 4.0, 22% CC BY 3.0, 3% CC BY-NC; cite `source_DOI` per series + IDC paper | Dataset finder: cases per cancer and modality; `technology` | M | BigQuery costs; mixed licences; index only |

### B11. Community and reference

| Source | URL | Access | Licence and attribution | Map to | Effort | Risks |
|---|---|---|---|---|---|---|
| Wikipedia REST API | en.wikipedia.org/api/rest_v1 | REST summaries; User-Agent and etiquette policies | CC BY-SA 4.0 text; hyperlink to article or author list required; images per file | `term`, `cancer`, `drug` lead summary shown as attributed quotation | S | Share-alike: never present as OnCo's own TL;DR |
| Wikidata SPARQL | see B9 | | CC0 | | | |
| Patient forums and social media (Reddit, Facebook groups, X) | n/a | APIs exist | Platform terms; personal health information about identifiable people | **Not a source.** OnCo does not ingest, quote or analyse forum or social posts; it links patient organisations instead | — | Consent, personal health data, platform terms; excluded by policy |

## Top ten extensions by value for effort

1. **openFDA `drugsfda` + Drugs@FDA files** (S, CC0 / public domain): machine-check every US approval date we hold; auto-populate label-change events on `/regulatory/`.
2. **EMA medicines table and JSON dumps** (S, acknowledgement required): automate the EU column of `/regulatory/regions/` and CHMP opinions on `/calendar/`.
3. **ClinicalTrials.gov results sections** (M, public domain): structured outcomes, enrolment and adverse events for the trials we already cite, using the API we already call.
4. **Open Targets GraphQL** (M, CC0): association scores, tractability, safety and known drugs on every target page, the highest-yield single addition to the `target` kind.
5. **ChEMBL** (M, CC BY-SA 3.0): mechanism of action, target, max phase, ATC and first approval for every product, plus payload chemistry; publish the derived table share-alike.
6. **CIViC** (M, CC0): open variant-level evidence with PMIDs for `/tumor-board/`, the open substitute for OncoKB.
7. **Medicare Part D/B spending + NADAC** (S, US Government work): a sourced US spend and price line on product pages and a top-spend table in the annual report.
8. **Crossref + OpenAlex works** (S–M, free / CC0): resolve 622 DOIs to full metadata, citation counts and funder ids; connect key papers to `/funding/`.
9. **NIH RePORTER + UKRI + CORDIS** (S each, public domain / OGL / CC BY): make `/funding/` computed per institution and per cancer rather than transcribed.
10. **ROR + UniProt accessions** (S, CC0 / CC BY 4.0): canonical ids on institutions and targets so every later join (OpenAlex, Crossref, HPA, GTEx, AlphaFold, STRING) is exact rather than name-based.

Honourable mentions: Purple Book (S) for a biosimilar layer; Human Protein Atlas + GTEx (S) for ADC target safety; NHS cancer waiting times (S) as a live bottleneck indicator; Health Canada DPD (S) if a Canada column is added; SEER published tables (M) for stage and survival panels.

## Sources we should not ingest

Recorded so the decision is visible: **COSMIC**, **OncoKB**, **DrugBank** (main dataset), **KEGG**, **Semantic Scholar API**, **SMC text**, **NCCN text**, **jRCT**, **PMDA** (automated), **NMPA/CDE**, **ChiCTR**, **NCDB**, **COSD**, **NATCAN** (without permission), **IARC data beyond cited estimates for commercial reuse**, and all **patient forums and social media**. Each is linked where useful; none is copied.
