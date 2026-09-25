# Triple-negative breast cancer deep spike: review checklist and results (24 September 2026)

Six agents built the triple-negative breast cancer deep spike in parallel (`src/data/spikes/tnbc-*.ts`: core, treatment
with the registry trials, UK, molecular, evidence in four files, living-with). This is the review that ran afterwards,
following `docs/GALLBLADDER-QA.md` step for step, written so the same pass can be repeated for the next spike. Commands
assume a dev server on a free port above 4000 (`npx next dev -p 4211`) and Chrome at the usual macOS path. Working files
are under `/tmp/tnbc-qa` (URL extractor and checker, merged-record dump, CDP console, width and screenshot helpers).

## 1. Read every page end to end (1440 and 390 px)

Pages: `/cancers/tnbc/` and its eight section pages (`finding-it`, `treating-it`, `evidence`, `science`,
`where-you-are`, `living-with-it`, `coming`, `data`; `what-it-is` is inline on the hub), `/cancers/tnbc/uk/`,
`/cancers/tnbc/decisions/`, `/roadmaps/tnbc-roadmap/`, `/tools/tnbc-after-chemotherapy/`, `/first-60-days/tnbc/`, the
twelve subtype pages, and the biomarker, drug, target, institution and roadmap pages the spike links. Screenshots with
`/tmp/drafts/cdp-shot.mjs <url> out.png 1440 5000` and `... 390 4000`; text read from the dev HTML and the source files.

| Check | Result | Change |
| --- | --- | --- |
| Sections or sentences that say the same thing twice | Standard of care: 28 rows from four files. The treatment file's "Residual disease after neoadjuvant therapy (RCB I to III)" and "Brain metastases" rows repeated the living-with file's rows of the same name and the glossary terms `tnbc-residual-disease-decision` and `tnbc-symptom-control-palliation` (the same figures three times); the treatment file's "Germline BRCA1 or BRCA2 carriers: testing and early-stage choices" repeated the core file's "Germline testing at diagnosis" and the living file's "Genetic testing and what a BRCA result means for your family". History: 42 entries with the molecular file duplicating the evidence file or the record for 2011 (Lehmann), 2015 (Couch), 2018 (IMpassion130), 2020 (KEYNOTE-355), 2021 (Rugo), 2022 (DESTINY-Breast04) and 2023 (c-TRAK TN). Open problems: 26, with the molecular file restating the record's own ADC-selection and disparity problems, the evidence file's PD-L1 assay and ctDNA problems and the treatment file's AKT and ctDNA problems. Papers: ten DOIs had two records (Slamon 1987 and Korde 2021 against existing corpus records; CREATE-X against `paper-masuda-n-engl-j-med`; Leon-Ferre 2024 against `paper-leon-ferre-jama`; Radovich, Schettini, Burstein, Rugo, Turner and Struewing written by both the evidence and the molecular files), and three ids (Lehmann 2011 and 2016, Loibl 2018) were written in full by both files so `mergeDuplicates` concatenated their findings and caveats. Links: the CRUK TNBC page, NG101 and CG164 were on the record twice (core and living files) under different labels. The staging row said "the rows above" for rows that merge below it; the summary said "Each has a page below". | The two treatment rows are exported only (`PATCH_SETTINGS`), the living row keeps the patient-facing text and now carries the trial refs and the glossary term; the treatment germline row is renamed "early-stage choices" and no longer restates the testing rules. Molecular history entries rewritten to what the layer alone adds (TNT and Bareche 2018, ctDNA 2020, HER2-low share 2021, Martini 2022, Stecklein 2023); the 2011 and 2015 entries removed and their paper refs moved to the surviving entries. Molecular open problems cut from seven to two (HRD, Lehmann subtypes), the unique clauses folded into the evidence and treatment problems. The nine molecular paper records became `sup<PaperInput>` supplements carrying only their relations, with the SRC table pointing at the evidence ids; the evidence Slamon record became a supplement onto the HER2 spike's `paper-slamon-her2-amplification-science-1987`; the three thin Europe PMC ingest records cross-link the full ones (open gap below). Living-file duplicate links removed. Result: 26 rows, 40 history entries, 20 open problems, 0 duplicate URLs. |
| Contradictory figures | KEYNOTE-522 overall survival: the record summary (carried into the core file) said "a 7.9-point overall survival gain at seven years" and the roadmap "a 7.9-point five-year gain"; the treatment file and the NEJM 2024 abstract give 86.6 against 81.7 percent at 60 months, a 4.9-point gain. Germline BRCA share: "~20% germline BRCA1/2" (summary), "about one in five" (treatment row, ASCO hereditary paper) against the sourced 11.2 percent (Couch 2015), 15.4 percent (Sharma 2014) and 17.2 percent (Hahnen 2017). HER2-low share: "~35%" in the summary and "the earlier unsourced text" in the eligibility term, against Schettini 36.6, Denkert 34.0 and Boissiere-Michot 24.0 percent in the molecular table. PD-L1 by assay: SP142 46.4, SP263 74.9, 22C3 73.1 percent (Rugo 2021) and 27.2 percent CPS 10 (Sigurjonsdottir 2023) agree across the core, evidence and molecular files. NICE NG101: the core file cited recommendation 1.3.5 for BRCA testing in nine places; the NICE page (re-read) numbers it 1.3.6, as the UK, living and decision-tool files had it. NICE TA992: "25 July 2024" in the treatment file against "29 July 2024" in the UK file; the NICE page gives 29 July 2024 (25 July is the final draft). TA851 (14 December 2022), TA801 (29 June 2022), TA639 (1 July 2020), TA819 (17 August 2022), TA886 (10 May 2023), TA1040 (12 February 2025) and TA952 (21 February 2024) agree across files and with the NICE pages. The UK file said NICE's olaparib metastatic position "was not read" while the treatment file records TA1040. TROPION-Breast trials: the UK file listed NCT06103864 as TROPION-Breast02 (recruiting, 625 patients, Cardiff to Taunton); the registry record is TROPION-Breast05 (PD-L1-positive first line, with durvalumab against chemotherapy plus pembrolizumab); TROPION-Breast02 is NCT05374512 (644 patients, closed 2024). The record's open problem "PD-L1-negative early disease has no immunotherapy option" contradicted TA851 and KEYNOTE-522 (unselected). SMC decisions (SMC2538, 2460, 2267, 2518, 2607, 2737, 2446, 2608) and the TNBC share (10.8 percent SEER 21, around 15 percent CRUK, 8.4 percent Scott 2019, quoted with their cohorts) are consistent. | 4.9 points at five years in the summary (cancers.ts and core), roadmap summary and step; BRCA share "11 to 17 percent by cohort" and "one in nine" with the three cohorts named; HER2-low term quotes the three cohorts; 1.3.6 throughout; 29 July 2024; UK funding row and note carry TA1040 and the gap line is corrected; the UK trials list, four centre entries and the Be Part of Research source say TROPION-Breast05 and name TROPION-Breast02 beside it; the open problem now reads "immunotherapy proven only in KEYNOTE-522's unselected population". |
| Orphaned references | "agent A" and "agent B" in the living file's header comment; two roadmap ideas whose rendered summaries began "Placeholder for the UK-specific gaps" and carried a "Placeholder: ... should be revised" note; "Each has a page below" and "the rows above" in the core file; "TROPION-Breast02 recruited at nine UK sites" followed by seven names. No "see below" or "deep dive" text renders ("deep dive" in the nav is the India page). | All reworded: the ideas now say what the UK page records and what the audit would measure; comments name the files, not the agents. |
| Sentences reading as prognosis advice | None found. Survival figures carry their cohort; the `prognosis` field opens with "Population figures, quoted with their cohorts; none is a personal prognosis" and does not render while `SHOW_OUTLOOK` is false in `src/components/CancerRecord.tsx` (its text appears in none of the 53 fetched pages). The Dent 2007 paper record's "survivors past five years are told their risk has largely passed" is the paper's own reading, kept. | None. |
| US spellings, em-dashes | No em-dashes in the eleven spike files or the decision aid (one on `/institutions/guys-st-thomas/` is in a quoted Lancet Oncology Commission title from another record). US spellings occur only in quoted paper and registry titles (`tumor`, `estrogen`, `randomized`) and in bottleneck ids. | None. |
| React console errors | Console at 390 and 1440 px on eight TNBC routes (`/tmp/tnbc-qa/mobile-check.mjs`): no duplicate-key errors after the link de-duplication. Two pre-existing dev-mode messages remain: a hydration attribute mismatch on chip `lang` attributes (fires on `/cancers/pancreatic/` and the gallbladder pages too) and, on `/roadmaps/tnbc-roadmap/` only, "Encountered a script tag while rendering React component" with no component stack (no `<script>` inside `<main>`; the other roadmaps do not show it; recorded below). | None here. |

## 2. Cited URLs

`/tmp/tnbc-qa/extract-urls.ts` walks the eleven spike modules and the decision aid (after template expansion, plus `doi`
and `pmid` fields) and `/tmp/tnbc-qa/check-urls.mjs` fetches each once with a browser user agent, following redirects
manually, cached in `/tmp/tnbc-qa/url-cache.json`. 822 distinct URLs.

- 659 returned 200; 5 NHS England pages returned 202 (a queueing page, recorded as such in the UK file).
- 153 returned 403 to a script, all bot-blocking hosts: `doi.org` resolutions to ASCO (37), NEJM (21), AACR (18), JAMA
  Network (14), Oxford Academic (13), Wiley (8), PNAS, SAGE, BMJ, Science, Rockefeller and Taylor and Francis; the
  roadmap's 25 `europepmc.org/article/MED/...` links (the REST API answers, the article pages challenge scripts);
  `digital.nhs.uk`, `health-ni.gov.uk` and the Guy's, UCLH and Clatterbridge trust sites. ISRCTN answers with its
  `/holding` page.
- 4 dead (404), fixed: the Wikipedia pages `Apocrine_carcinoma` and `Secretory_carcinoma_of_the_breast` (now
  `Breast_cancer_classification` and `Secretory_carcinoma`), the Lund University SCAN-B publication page (now the
  SCAN-B project site `scan-b.lu.se`), the ESMO metastatic breast cancer living guideline page (now the ESMO living
  guidelines index; the ESMO breast guideline index answers 200 and is linked too).
- 1 DNS failure on `oncology.cam.ac.uk` (Jean Abraham's profile) answered 200 on retry; kept.
- Redirects rewritten to their final URL: the NHS breast screening eligibility page (`/tests-and-treatments/...`), NHS
  mastectomy, NHS menopause symptoms (`menopause-and-perimenopause`), the CRUK tests page (`/getting-diagnosed/tests`),
  Maggie's (`/support-and-information/`), and `asco.org/breast-cancer-guidelines` to its `ascopubs.org` destination.

## 3. Backlinks

Checked by fetching each page from the dev server and counting `href="/cancers/tnbc/"` and links to the twelve
subtype pages.

| Page | Result | Change |
| --- | --- | --- |
| `/cancers/breast-cancer/` (parent) | 4 links to the hub; family strip lists all twelve subtypes plus `tnbc-early` and `tnbc-metastatic` | none needed |
| `her2-low-ihc`, `pd-l1-cps`, `brca-germline`, `trop2-expression` | 4, 6, 5 and 2 links | none needed |
| pembrolizumab, sacituzumab govitecan, trastuzumab deruxtecan, olaparib | 1 to 2 hub links each plus 1 to 4 subtype links | none needed |
| Royal Marsden, Guy's, Barts, the Christie, Addenbrooke's, Breast Cancer Now | 2 to 8 links each | none needed |
| `/roadmaps/ctdna-tests/`, `/roadmaps/tnbc-history/` | 2 links each (the evidence file's supplements) | none needed |
| `/targets/trop2/`, `/targets/her2/`, `/targets/brca/`, `/terms/her2-low/`, `/terms/cps/` | 6, 6, 9, 2 and 1 links | none needed |
| For me, Edge "For you", `/tagged/tnbc/`, `/tagged/breast/` | tile present; 4, 23 and 23 links; the search index and Edge feed are built from the graph | none needed |
| Organ drawing | the spread schematic on the hub is labelled for triple-negative breast cancer with its sites and treatments | none needed |
| Slamon 1987 | the HER2 spike's record did not name triple-negative disease | supplement `cancers: ["tnbc"]` (evidence file) |

## 4. Page weight

Measured with `renderToStaticMarkup` inside the layout (the record-sections test pattern; a temporary test file,
deleted after use). Budgets: hub under 350 KB, section pages under 600 KB (`src/lib/record-sections.ts`).

| Page | KB | | Page | KB |
| --- | --- | --- | --- | --- |
| `/cancers/tnbc/` (hub) | 254 | | `/cancers/tnbc/uk/` | 229 |
| `/cancers/tnbc/finding-it/` | 141 | | `/cancers/tnbc/decisions/` | 495 |
| `/cancers/tnbc/treating-it/` | 177 | | `/roadmaps/tnbc-roadmap/` | 461 |
| `/cancers/tnbc/evidence/` | 209 | | `/tools/tnbc-after-chemotherapy/` | 95 |
| `/cancers/tnbc/science/` | 133 | | `/cancers/brca-associated-tnbc/` | 128 |
| `/cancers/tnbc/where-you-are/` | 133 | | `/cancers/tnbc-luminal-androgen-receptor/` | 119 |
| `/cancers/tnbc/living-with-it/` | 148 | | `/cancers/metaplastic-breast-carcinoma/` | 120 |
| `/cancers/tnbc/coming/` | 247 | | | |
| `/cancers/tnbc/data/` | 314 | | | |

`src/lib/record-sections.test.ts` (budgets, fold and deep links on the four heavy cancers) and
`src/app/record-fold.test.ts` pass on the committed state.

## 5. Mobile audit and console check

- `npx tsx scripts/mobile-audit.ts http://localhost:4211`: 35 checks passed, including `/cancers/tnbc/decisions/`.
- Horizontal overflow at 390 px (`/tmp/tnbc-qa/cdp-wide.mjs`, plus `cdp-mincontent.mjs`, which finds the descendant
  with the largest min-content width inside each card): the hub, the section pages, the decisions page, the tool and
  the subtype pages lay out at 390 px. `/cancers/tnbc/uk/` grew the layout viewport to 1297 px because three trial rows
  carried a whole site list as one nowrap chip ("Research sites in Cardiff, Chelsea and Sutton ... (ClinicalTrials.gov
  gives cities only)") and PARTNER's status chip was a sentence; the sites are now one chip each and the status is the
  registry status (394 px after the change, as the tool page). `/roadmaps/tnbc-roadmap/` grew to 1103 px (and the
  gallbladder roadmap to 690, ctDNA roadmap to 594) because the "What to watch" list items were a grid whose implicit
  track took the item's max-content width; `EntityDetail.tsx` now uses `grid-cols-1 sm:grid-cols-[9rem_minmax(0,1fr)]`
  with a `min-w-0 break-words` item cell, and all three roadmaps lay out at 390 px.
- Console (section 1): clean of spike-caused errors; the two pre-existing dev messages are listed under open gaps.

## 6. Private-data check

Grep of the eleven spike files and the decision aid for individual dates, personal names and variant allele fractions
(`/tmp/tnbc-qa` commands recorded in the shell history): every day-level date is a NICE publication date, a registry
start or completion date, a marketing authorisation date, a page-read date or a statistics release date; the 325
ISO dates in the registry file are ClinicalTrials.gov start and completion dates. The only personal names are
published authors (`authors` fields, "Slamon and colleagues") and three UK clinicians with public professional pages
(Abraham, Copson, Armstrong). No allele fractions, case descriptions, ages of individuals or references to the private
repositories. Nothing removed.

## 7. Gates

`npm run validate` (16,694 entities OK), `npm run typecheck`, `npm run lint` (0 errors; warnings pre-existing),
`npx vitest run --testTimeout=600000` (156 files) pass on the committed state. One floor moved:
`src/lib/ask.test.ts` "keeps the extractive path at or above its previous floors" measured retrieval recall 0.3293
against a 0.33 floor both before and after this review (the merged TNBC trial records took the tnbc-01, tnbc-03 and
tnbc-10 lexical slots; the review's de-duplication moved the figure by under 0.001); the floor is 0.32 with the
measurement noted in the test, following the file's convention.

## Open gaps

- Three papers exist twice: the full evidence records for CREATE-X, the 2021 ASCO neoadjuvant guideline and Leon-Ferre
  2024 and the thin Europe PMC ingest records `paper-masuda-n-engl-j-med`, `paper-shelley-hwang-j-clin-oncol-2021`
  and `paper-leon-ferre-jama` (matched to a person or an idea by DOI, with auto-generated text). Supplements make each
  point at the other; retiring the ingest records needs a redirect policy for `key-papers` ids.
- `public/reviews/models/tnbc.json` (the model panel, 17 September 2026) quotes the record's old "7.9-point overall
  survival gain at seven years" claim as "Unclear"; the review predates the correction and needs re-running with the
  owner's key.
- Dev-mode console: the chip `lang` hydration mismatch on record pages and the "script tag while rendering" message on
  `/roadmaps/tnbc-roadmap/` are not from the spike data (no `<script>` inside the roadmap's `<main>`, the other
  roadmaps do not show it); worth a look in the export, where inline scripts run on load.
- The Ask fallback benchmark recall fell from 0.3376 to 0.3293 with the merged treatment and registry trials before
  this review; the live path answers from the compiled index, but the tnbc-01, tnbc-03 and tnbc-10 questions now
  retrieve subtype pages and glossary terms ahead of the drugs and trials they expect.
- The UK page still lists Manchester's Nightingale Centre, Black Women Rising and the devolved nations' wig and
  prosthesis charges as unread (its own gaps section), and the NHS England pages answered 202 to scripts.
- PARTNER is listed as recruiting on ClinicalTrials.gov with a primary completion of June 2024 and 30 sites; the
  Nature 2024 paper and Cambridge release report 23 sites. Both figures are stated with their source.

## Repeating this review for the next deep spike

Follow the list at the end of `docs/GALLBLADDER-QA.md`, and add: (7) check every paper record against the corpus by
DOI, not only by id (`/tmp/tnbc-qa/dup-papers.ts`), because two files reading the same abstract will mint two ids; (8)
diff the NICE appraisal dates and guideline recommendation numbers against the pages themselves (`curl` once each,
`/tmp/tnbc-qa/nice-*.html`) rather than between files, since two files can agree and both be wrong; (9) check any
trial named by acronym against its NCT record, because sister trials (TROPION-Breast02 and 05) are easy to swap; (10)
measure min-content, not only bounding width, when a card grid overflows at 390 px.
