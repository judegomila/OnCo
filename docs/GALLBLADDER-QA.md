# Gallbladder deep spike: review checklist and results (24 September 2026)

Six agents built the gallbladder cancer deep spike in parallel (`src/data/spikes/gallbladder-*.ts`). This is the
review that ran afterwards, written so the same pass can be repeated for the next deep spike. Each section gives the
check, how it was run, what was found and what changed. Commands assume a dev server on a free port above 4000
(`npx next dev -p 4177`) and Chrome at the usual macOS path.

## 1. Read every page end to end (1440 and 390 px)

Pages: `/cancers/gallbladder/`, `/cancers/gallbladder/uk/`, `/cancers/gallbladder/decisions/`,
`/roadmaps/gallbladder-cancer-roadmap/`, the eight subtype pages, the linked terms, biomarkers and trials.
Screenshots with `/tmp/drafts/cdp-shot.mjs <url> out.png 1440 5000` and `... 390 4000`; text read from the dev HTML
(`curl -s http://localhost:4177/cancers/gallbladder/`) and from the source files.

| Check | Result | Change |
| --- | --- | --- |
| Sections or sentences that say the same thing twice | Three glossary terms (`radical-cholecystectomy`, `gallbladder-polyp`, a second T2a/T2b term `t2a-t2b-gallbladder`) and seven trials (HERIZON-BTC-01, NIFTY, S0809, OPT-IN, GAIN, POLCAGB, ACTICCA-1) were written in full by both the core or treatment file and the evidence file; `mergeDuplicates` kept the first scalars and appended both sets of arrays, so outcomes, drugs (`irinotecan` beside `liposomal-irinotecan`) and aliases doubled, and two T2a/T2b glossary pages existed. Three history entries (2015 Shindoh, 2017 AJCC, 2022 polyp guideline) appeared twice. The core "Unresectable or metastatic" standard-of-care row repeated the treatment file's second-line and HER2 rows. The generic "Connected" tab repeated the cancer-specific "Related pages" tab. | Evidence duplicates became `supplement()` records carrying only the papers, notes and cross-references unique to that reading; `t2a-t2b-gallbladder` references point at `t2a-versus-t2b`; duplicate history entries removed (their paper refs moved to the core entries); the core first-line row trimmed to first line; the Connected tab is skipped on cancer pages (they keep Related pages, which is a superset, with the Similar strip). |
| Contradictory figures | HER2: treatment open problem said "5 percent (European resected series) to 13 percent" (unsourced) against the molecular table's 9.4 percent (Angerilli 2026), 12.8 percent (Roa 2014) and 31.3 percent (Hiraoka 2020); the living file said "about one in six tumours is HER2-positive" (the 14 to 16 percent figure is ERBB2 alterations by sequencing, not staining). NICE and zanidatamab: the living file said "a NICE appraisal under way" and "NICE is appraising it" while the UK and treatment files record TA1153 (7 May 2026); the treatment KEYNOTE-966 note said no NICE appraisal existed while the UK file records TA966 (terminated). SMC: the UK nations row said "all five biliary medicines it has assessed are accepted" while its own funding table records SMC2683 (pembrolizumab, not recommended). UK incidence (1,288; around 1,300), deaths (810), five-year survival (11.8 percent, England 2016 to 2020), TOPAZ-1 gallbladder share (25 percent, Imfinzi label) and HERIZON-BTC-01 share (53 percent, Ziihera label) agree across files. | Treatment open problem now quotes the three sourced series; living file says one in ten HER2-positive on staining and one in seven with a gene change, each with its cohort; NICE TA1153 and TA966 stated consistently; SMC sentence corrected; roadmap gained the MHRA (February 2026) and NICE (May 2026) dates beside the FDA and EU approvals. |
| Orphaned references | "the UK layer of this deep dive" (roadmap summary, roadmap step, roadmap note, BSG guideline paper, CAPBIL paper), "the molecular page", "the treatment page", "the treatment and molecular pages of this deep dive" (core record; there are no such pages, the material merges into the cancer page). No "agent B", "see below" or placeholder text rendered; the agent letters lived only in code comments, now reworded. | All replaced with the real destination (the UK and NHS page, the standard-of-care rows, the trial records). Stale header comments saying the record lived in `nci-rare-other.ts` corrected in five files. |
| Sentences reading as prognosis advice | None found; survival figures are quoted with their cohort and source, and the UK figure carries "Population averages, not a personal prognosis". The `prognosis` field is not rendered while `SHOW_OUTLOOK` is false in `src/components/EntityDetail.tsx` (confirmed: its text does not appear in the page HTML). | None. |
| US spellings, em-dashes | No em-dashes. US spellings occur only inside quoted paper titles and registry titles (`Tumor location is a strong predictor...`, `Multi-center`), which must stay verbatim. | None. |
| React console errors | Four "two children with the same key" errors on the cancer page: the same URL added to `links` by two files under different labels (NHS symptoms, NHS tests, CRUK statistics, the Foley polyp guideline). | Duplicate-URL links removed from the living, UK and evidence patches; the core record keeps them. |

## 2. Cited URLs

`/tmp/gallbladder-qa/extract-urls.ts` walks the six spike modules (after template expansion, plus `doi` and `pmid`
fields) and `/tmp/gallbladder-qa/check-urls.mjs` fetches each once with a browser user agent, following redirects
manually, cached in `/tmp/gallbladder-qa/url-cache.json`. 627 distinct URLs.

- 439 returned 200; 75 PubMed pages returned 203 and 7 NHS England pages 202 (a queueing page); both are reachable.
- 101 returned 403 to a script. All are bot-blocking hosts, not dead links: `doi.org` resolutions to Wiley, JAMA
  Network, Oxford Academic, ASCO (ascopubs), NEJM, AACR, BMJ, Springer's `link.springer.com` for some titles,
  wjgnet and SciELO; `europepmc.org/article/MED/...` (the roadmap's 38 Europe PMC links; the REST API answers,
  the article pages challenge scripts); NHS trust sites (Royal Free, UCLH, Liverpool), `ucl.ac.uk`,
  `digital.nhs.uk`, `health-ni.gov.uk`. ISRCTN answers every request with a `/holding` page for scripts.
- 5 dead (404), fixed or removed: the CRUK DETERMINE trial page (removed; the ClinicalTrials.gov link stays),
  the ESMO gastrointestinal guidelines index (now `esmo.org/guidelines/esmo-clinical-practice-guidelines-gastrointestinal-cancers`),
  three Macmillan pages (multidisciplinary team and second opinion removed, no replacement found; benefits now
  points at Macmillan's money and work hub).
- Redirects rewritten to their final URL: CRUK "about" page, two DailyMed searches (now the setid label pages), the
  ABC-07 CRUK page (http to https), AMMF centres (`/second-opinions-and-liver-disease-centres/`), Pancreatic Cancer
  UK centres, Leicester hospitals (`uhleicester.nhs.uk`), NICE TA966 (`/guidance/terminated/ta966`), Macmillan
  grants, NHSBSA medical exemption, NHS Wales suspected cancer pathway, four `nhs.uk` pages that moved to
  `/tests-and-treatments/` or `/symptoms/`, Maggie's and Marie Curie.

## 3. Backlinks

Checked by fetching each page from the dev server and counting `href="/cancers/gallbladder/"`.

| Page | Before | Change |
| --- | --- | --- |
| `/cancers/biliary-tract-cancer/` (parent) | Lists gallbladder in the family strip; 4 links | none needed |
| `/cancers/cholangiocarcinoma/` | Names how gallbladder differs (HER2 highest, separate staging); 4 links | none needed |
| HER2 readouts (`her2-ihc-3-plus`, `her2-ish-amplified`), `/targets/her2/` | 7, 2 and 5 links | none needed |
| zanidatamab, durvalumab, pembrolizumab, capecitabine, BILCAP, TOPAZ-1 | 1 to 2 links each | none needed |
| HPB centres (Royal Free, King's), AMMF, `uk-hpb-specialist-centres` | 8, 2, 6, 3 links | none needed |
| `/roadmaps/ctdna-tests/` | mentioned gallbladder 7 times, 0 links | supplement `cancers: ["gallbladder"]` added (evidence file) |
| `gemcis-plus-io-btc` (pairing) | text says "including gallbladder cancer", `cancers` only cholangiocarcinoma | supplement `cancers: ["gallbladder"]` added |
| For me picker, Edge For you, `/tagged/gallbladder/`, `/tagged/biliary/` | tile present; 13 and 17 links | none needed; the search index and Edge feed are built from the graph at build time |
| Organ drawing | `pancreas-biliary` schematic lists `gallbladder` in `cancers` and has a gallbladder node | none needed |

Backlinks go through the spike `supplements` mechanism (`src/data/spikes/index.ts`), never by editing the owning file.

## 4. Page weight

Measured with `renderToStaticMarkup` of the page component (the heavy-pages test pattern; a temporary test file,
deleted after use). Budget 700 KB of markup.

| Page | Before | After |
| --- | --- | --- |
| `/cancers/gallbladder/` | 997 KB | 652 KB |
| `/cancers/gallbladder/uk/` | 144 KB | 144 KB |
| `/roadmaps/gallbladder-cancer-roadmap/` | 263 KB | 265 KB |
| `/cancers/gallbladder/decisions/` | 193 KB | 192 KB |

What made the cancer page heavy: 151 linked trials (131 registry-only records from the treatment file) rendered
five times each (Landmark trials, Trials under way, Related pages, Connected, and the standard-of-care refs), 75
key-paper cards, and the Connected tab repeating Related pages. Component changes, which help every large record:

- `ChipList` takes `max` and `moreHref`; past the cap it renders an "and N more" chip (`data-more`) to the kind's
  table filtered to the cancer (`/trials/?cancers=<name>`, `/papers/?cancers=<name>`) or to the kind index.
- `Neighbours` passes the cap through (`max`, `moreHref`), including the compact drug grid.
- `EntityDetail`: `NEIGHBOUR_CAP = 48`; key papers show the 48 most recent with a link to the rest; cancer pages
  drop the generic Connected tab (Related pages keeps the Similar strip). Tables deep-link to `#relevant`, `#care`,
  `#pipeline` and `#history` on cancer pages, none to `#connected`.
- `CancerPipeline`: trials under way and trials reported list 48 and link to the trials table.

For calibration the same measure gives NSCLC 2,292 KB before and 813 KB after, cholangiocarcinoma 708 KB to 405 KB.

## 5. Mobile audit and console check

- `npx tsx scripts/mobile-audit.ts http://localhost:4177`: 12 checks passed (its routes are the two-column tools,
  not the cancer pages).
- Console at 390 and 1440 px on the five gallbladder routes (`/tmp/gallbladder-qa/mobile-check.mjs`, a copy of
  `/tmp/drafts/mobile-console.mjs` with a width switch): clean apart from one pre-existing warning, "Each child in
  a list should have a unique key prop ... Check the render method of `Tabs`", which also fires on
  `/cancers/pancreatic/` and `/roadmaps/ctdna-tests/` and is not from this spike (open, below).
- Horizontal overflow at 390 px (`/tmp/gallbladder-qa/cdp-wide.mjs`, which lists elements wider than their
  parent): the UK and decisions pages lay out at 390 px. The entity pages (`/cancers/gallbladder/`, the roadmap)
  let the layout viewport grow (innerWidth 1560) because the tab strip (1462 px, a scrolling strip by design),
  some pipeline list items (783 px) and the Related pages cards (1360 to 1748 px) are wider than the viewport once
  hydrated. `/cancers/pancreatic/` behaves the same way, so this is the shared `EntityDetail` layout under CDP
  mobile emulation, not the spike; recorded as an open gap for the owner rather than changed here.

## 6. Gates

`npm run validate` (16,030 entities OK), `npm run typecheck`, `npm run lint` (0 errors; warnings pre-existing),
`npx vitest run` all pass on the committed state.

## Open gaps

- Europe PMC article pages, ISRCTN and the NHS trust sites block scripted checks; the roadmap's 38 Europe PMC
  links were verified only as far as the 403 challenge. A future check could hit the Europe PMC REST API for the
  PMIDs instead.
- Two Macmillan pages (multidisciplinary team, second opinion) have moved with no discoverable replacement; the
  living file now cites Macmillan's hubs instead.
- Closed: the `Tabs` key warning came from keyless fragments in each tab's `content`, which React Flight sends to
  the client as plain arrays; `EntityDetail` now keys every tab's content on the tab id.
- Closed: the sideways scroll on record pages was a long nowrap pill widening a grid track in the Related pages and
  Connected cards (and the What changed cards, guideline and product pill wrappers, company tables and institution
  year bars); grid children can shrink and tables scroll inside `ScrollRow` (docs/MOBILE.md). One record of each kind
  is now a width-only check in `scripts/mobile-audit.ts`.
- `/cancers/gallbladder/` still carries 15 standard-of-care rows and 17 open problems from four files; they no
  longer repeat each other but a single editorial pass could order them by the patient's journey.
- The KEYNOTE-966 gallbladder share and hazard ratio are in the Lancet paper's tables, not its abstract, and are
  not quoted; ACTICCA-1, GAIN, POLCAGB, DEBATE and NIFE have no results indexed yet (the roadmap's watch list
  tracks them).
- Registry-only trial records (`gallbladder-registry-trials.ts`) carry generated one-line summaries; a hand pass
  over the 131 could add the gallbladder eligibility wording from each protocol.

## Repeating this review for the next deep spike

1. Grep the spike files for internal jargon (`deep dive`, `layer`, `agent [A-F]`, `see below`, `page carries`),
   em-dashes and US spellings outside quoted titles.
2. Load the merged record with `tsx` and list `links` with duplicate URLs, `history` titles by year,
   `standardOfCare` settings and `openProblems`; compare term and trial ids across the spike files for the same
   id defined twice (`grep -h 'id: "' | sort | uniq -d`), and turn the second definition into a `supplement()`.
3. Walk the modules for URLs (`/tmp/gallbladder-qa/extract-urls.ts` pattern), check once each with a browser user
   agent, treat 403 from publishers as reachable, rewrite non-DOI redirects to their final URL, remove 404s.
4. Fetch every page the spike claims to link from and count `href="/cancers/<id>/"`; add `supplements` for the
   misses.
5. Measure markup with `renderToStaticMarkup` for the cancer, UK and roadmap pages against 700 KB.
6. Run `scripts/mobile-audit.ts` and a console check at 390 px on the new routes.
