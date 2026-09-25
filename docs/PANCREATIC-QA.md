# Pancreatic cancer deep spike: review checklist and results (24 September 2026)

Six agents built the pancreatic cancer deep spike in parallel on top of the older `src/data/spikes/pancreatic.ts`
(`pancreatic-core.ts`, `pancreatic-treatment*.ts` with `pancreatic-registry-trials.ts`, `pancreatic-uk.ts`,
`pancreatic-molecular.ts`, `pancreatic-evidence*.ts`, `pancreatic-living.ts`), under the hub-and-sections architecture
(docs/INFORMATION-ARCHITECTURE.md). This is the review that ran afterwards, following `docs/GALLBLADDER-QA.md` and
`docs/TNBC-QA.md` step for step. Commands assume a dev server on a free port above 4000 (`npx next dev -p 4301`) and
Chrome at the usual macOS path. Working files are under `/tmp/panc-qa` (URL extractor and checker with its cache, the
merged-record dump, the DOI duplicate finder, the NICE, NPaCA, FDA and GeNotes page texts, CDP console and screenshot
helpers, the fetched dev pages, and the edit scripts that made the bulk changes).

## 1. Read every page end to end (1440 and 390 px)

Pages: `/cancers/pancreatic/` and its section pages (`finding-it`, `treating-it`, `evidence`, `science`,
`where-you-are`, `living-with-it`, `coming`, `data`; `what-it-is` is inline on the hub), `/cancers/pancreatic/uk/`,
`/cancers/pancreatic/decisions/`, `/cancers/pancreatic/changes/`, `/roadmaps/pancreatic-roadmap/`,
`/tools/pancreatic-first-treatment/`, `/first-60-days/pancreatic/`, the fourteen subtype pages (six histology pages from
the core file, four stage pages and four molecular pages from `pancreatic-subtypes.ts`), and the biomarker, target,
drug, institution, roadmap and glossary pages the spike links (69 pages fetched by `/tmp/panc-qa/fetch-pages.sh`;
screenshots with `/tmp/drafts/cdp-shot.mjs`).

| Check | Result | Change |
| --- | --- | --- |
| Sections or sentences that say the same thing twice | Standard of care: 31 rows from four files. The base spike's four short rows (resectable or borderline, locally advanced, metastatic first and second line) restated the treatment file's fourteen sourced rows. History: 51 entries; `cancers.ts` still carried five milestones (1997, 2011, 2019, 2023, 2026) that `pancreatic.ts` writes in full; CAPS5 (2022) was written by the core, evidence and molecular files, PanIN (2001) and the 2015 whole genomes by two files each, and the molecular 2016 and 2018 entries repeated the evidence file's Bailey and germline entries. Open problems: 26, with the base record's three one-liners ("Late diagnosis; no screening.", "Dense stroma blocks drug delivery.", "Immunologically cold.") restated by the spikes and the neoadjuvant-timing and supportive-care problems written three and four times. Biomarkers: 47 lines, with `cancers.ts` and `pancreatic.ts` each listing KRAS, CA 19-9, germline BRCA, MSI, NRG1 and CLDN18.2. State of the art: 15 points, with the base record's "Pan-RAS inhibitors with unprecedented OS in phase 1/2" and "Personalised vaccines with durable immunity" restated by the base spike. Papers: fifteen DOIs had two records and three ids were written in full by both the evidence and the molecular files (`/tmp/panc-qa/dup-papers.ts`): the molecular file re-minted Waddell, Bailey, Moffitt, Hu 2018, Ozdemir, Fahrmann, Goggins, Sharma, KEYNOTE-158 and DETECT-A under its own ids and wrote Tempero 1987, Canto 2018 and Dbouk 2022 in full under the evidence ids (so `mergeDuplicates` concatenated their findings and caveats); the evidence file re-minted Ostrem 2013, which is a corpus key paper, and four of its trial papers (PREOPANC 2020, HALO-301, PANOVA-3, ponsegromab) also exist as thin Europe PMC ingest records. Links: NICE NG85 was on the record twice (UK and living files) under different labels. | The base spike's five short rows stay: the decision aid quotes two of them word for word (`QUOTED_PANCREATIC_ROWS`, kept equal to the data by `src/lib/decision-tools.test.ts`) and the sequencing and relevance helpers key on their setting labels, so they are now framed as the one-line NCCN register with the treatment file's fourteen rows as the sourced detail, and the second-line row no longer says "once approved"; `cancers.ts` no longer carries history, biomarkers or open problems for this record (its summary is overridden but was corrected anyway); the molecular file's 2001, 2015 and 2022 entries are removed (their paper refs moved to the core entries) and its 2016 and 2018 entries rewritten to what the layer alone adds (punctuated evolution; NRG1 fusions and carriers without a family history); the evidence 2022 and 2025 entries drop the CAPS5 and PANOVA-3 clauses the core and base entries carry. The base spike's duplicate neoadjuvant and supportive-care problems are removed and their unique clauses folded into the treatment file's; the stroma problem is written once, in full. The thirteen molecular paper records became `sup<PaperInput>` supplements carrying only their relations, with the SRC table repointed at the evidence or corpus ids; the evidence Ostrem record became a supplement onto `paper-ostrem-kras-g12c-nature-2013`; the four ingest duplicates cross-link the full records (open gap below). NG85 is linked by the UK patch only. Result: 31 rows (five short, fourteen sourced, two core, ten living), 43 milestones, 22 open problems, 41 biomarker lines, 13 state-of-the-art points, 0 duplicate URLs. |
| Contradictory figures | Daraxonrasib: the summary said "regulatory filing is expected under a national priority voucher", the base second-line row "once approved ... is expected to become the standard", the state of the art "heading for approval" and the base 2026 milestone "phase 3 enrolled", while the treatment file recorded FDA approval on 26 August 2026; the FDA oncology approval notifications page (read once, `/tmp/panc-qa/fda-notices.html`) confirms approval on 26 August 2026 (Rasonque) for metastatic disease after at least one systemic therapy or when multi-agent chemotherapy is unsuitable. RASolute 302 control arm: 6.7 months (overall population) and 6.6 months (RAS G12 population) both appear and both are in the NEJM record; the molecular file says which population it quotes. NICE: the treatment file's drug-access term said "by September 2026 NICE had appraised none of NALIRIFOX, olaparib, daraxonrasib or zenocutuzumab", its rows said "no NICE appraisal" for NALIRIFOX and olaparib and its open problem "have no NICE appraisal", while the UK, core and living files record the terminated appraisals TA750 (olaparib, 8 December 2021) and TA1052 (NALIRIFOX, 2 April 2025); the NICE pages confirm both (no company submission). TA476 (6 September 2017, replacing TA360), TA440 (26 April 2017), TA630 (27 May 2020) and TA914 (20 September 2023, which does not name pancreatic cancer) agree across files and with the NICE pages. The UK file said TA476's recommendations were brought into NG85 in September 2025; NG85's update information dates that to August 2023 (September 2025 added links to the appraisals in the metastatic section). NG85 recommendation numbers (1.1.1 to 1.1.19, 1.2.1, 1.3.1 to 1.3.3, 1.5.1, 1.5.2, 1.6.1 to 1.6.4, 1.7.1 to 1.7.8, 1.8.1 to 1.8.9, 1.9.1 to 1.9.11) were checked against the recommendations page as read (`/tmp/panc-qa/ng85-recs.py`): all match. Germline BRCA share: "about 4 to 7 percent" (treatment maintenance row), "~5-7%" (base summary), "about 5 percent" (UK file, from GeNotes) against the molecular table's BRCA2 1.4 to 2 and BRCA1 0.4 to 1 percent (Hu 2018: 2.5 percent); GeNotes (read once) does say approximately 5 percent of unselected patients and up to 17 percent in familial disease. KRAS allele shares: "G12V ~30%, G12R ~15%" (base) against the molecular headline's "about 32%, about 16%" computed from the cBioPortal cohorts (ranges 28 to 37 and 12 to 21 percent in the table). PRODIGE 24: 54.4 against 35.0 months (living file, NEJM 2018), 53.5 against 35.5 (treatment file, JAMA Oncology 2022) and "54 months" (base history note), all correct for their publication. NAPOLI-3: hazard ratio 0.83 (treatment row, Lancet) against 0.84 (base spike and label notes, Onivyde label); both are as published. UK incidence (11,479; "around 11,500"), deaths (about 10,200), the 45 percent emergency presentation share (England, 2019), the HRD range (11 to 19 percent by gene mutation) and the NPaCA 2026 figures (17,672 people, England 2022 to 2023; Wales 2023 to 2024) agree across files. | Summary (base spike and the core's verbatim copy), second-line row, state of the art and 2026 milestone now state the FDA approval and its date and that no European or UK decision existed on 24 September 2026. The drug-access term, the first-line, maintenance and UK-access rows, the open problem and the drug and trial supplements now say the olaparib and NALIRIFOX appraisals were terminated without company submissions, with links to `terminated/ta750` and `terminated/ta1052`. TA476 into NG85 dated August 2023. The maintenance row quotes Hu 2018 (2 to 3 percent unselected) and POLO's 7.5 percent screening rate; the UK test row attributes 5 percent to GeNotes beside the Mayo figure; the base summary and biomarker line use the molecular figures (G12V about 32%, G12R about 16%, Q61 about 7%). The living row names both PRODIGE 24 publications; the first-line row gives both NAPOLI-3 hazard ratios with their sources. |
| Orphaned references | "see neuroendocrine" in a subtype line; no "agent A", "see below", "deep dive" or placeholder text renders (the evidence roadmap's "UK and NHS page for pancreatic cancer" is the real page). The four `%` KRAS shares written with `~` in the base summary. | Subtype line now reads "a different disease with its own record, linked from this page"; the summary sentence uses "about". |
| Sentences reading as prognosis advice | None found. Survival figures carry their cohort and source; the `prognosis` field opens with "Population averages, not a personal prognosis" and does not render while `SHOW_OUTLOOK` is false in `src/components/CancerRecord.tsx` (its text appears in none of the fetched pages); the UK figures that quote survival carry the same sentence. | None. |
| US spellings, em-dashes | No em-dashes in the seventeen spike files or the decision aid. US spellings occur only in proper names and quoted titles (`Shizuoka Cancer Center`, `Erasmus Medical Center`, `Memorial Sloan Kettering Cancer Center`, `National Familial Pancreas Tumor Registry`, `Know Your Tumor`, paper titles with `tumor`, the FDA's `hematologic` URL) and in the UK file's `programs:` field name. | None. |
| React console errors | Twelve "two children with the same key" errors across the hub and section pages at 390 and 1440 px, all for the NG85 URL (the known duplicate), and three on `/cancers/pancreatic/uk/` for the figures table, whose keys are the labels: "New cases (C25)" three times (Scotland, Wales, Northern Ireland) and "Stage at diagnosis (C25)" twice. The dev-mode hydration attribute mismatch on chip `lang` attributes fires here as on the gallbladder and TNBC pages (pre-existing, not from the spike). | Link de-duplicated (above); the devolved figures carry their nation in the label; both key errors are gone on the re-run (section 5). |

## 2. Cited URLs

`/tmp/panc-qa/extract-urls.ts` walks the eight spike modules, their exported tables and the decision aid (plus `doi` and
`pmid` fields) and `/tmp/panc-qa/check-urls.mjs` fetches each once with a browser user agent, following redirects
manually, cached in `/tmp/panc-qa/url-cache.json`. 1,006 distinct URLs.

- 838 returned 200; 5 NHS England pages returned 202 (a queueing page, already recorded in the UK file's gaps).
- 154 returned 403 to a script, all bot-blocking hosts: `doi.org` resolutions to ASCO (34), AACR (20), NEJM (14), JAMA
  Network (11), Wiley (8), Oxford Academic (7), Gut and BMJ Open (8), Science (5), PNAS, RSNA, Rockefeller and Taylor
  and Francis; the roadmap's 31 `europepmc.org/article/MED/...` links (the REST API answers, the article pages
  challenge scripts); `digital.nhs.uk`, `health-ni.gov.uk`, OncLive and the Royal Free, UCLH and Liverpool trust sites.
  ISRCTN answers with its `/holding` page. Revolution Medicines' investor site (two press releases in the base spike)
  answers 403 to scripts over HTTP/1.1 and drops the HTTP/2 stream.
- 2 dead (404), fixed: the Wikipedia page `Familial_pancreatic_cancer` (the familial term now points at
  `Pancreatic_cancer`) and the ESMO pancreatic guideline page (now the ESMO gastrointestinal guidelines index, 200).
- 5 unreachable from this network (connection reset or socket error on every attempt, so neither confirmed live nor
  dead): `royalsurrey.nhs.uk` (home and `/hpb`), `bartshealth.nhs.uk`, `nuh.nhs.uk` and the Public Health Scotland open
  data set page. Kept; listed as an open gap.
- Redirects rewritten to their final URL (47 lines across six files, `/tmp/panc-qa/edit-uk-urls.py`): Pancreatic Cancer
  UK moved its information tree from `/information/` to `/information-and-support/` (33 living-file constants, the core
  and UK source tables and the decision aid), with work-and-money, bypass surgery, family members, the nurse line, the
  Optimal Care Pathway and the statistics page at new paths; the CRUK tests page (`tests-pancreatic-cancer`); NHS blood
  clots (`deep-vein-thrombosis-dvt`); NICE TA1118 (`/guidance/terminated/ta1118`); PRECEDE (`precedestudy.org`); Hull
  (`hull.nhs.uk`, the HPB page gone) and Tayside (HPB page gone; home page); Marie Curie's palliative care page; the
  Macmillan advanced cancer page (now `if-you-have-an-advanced-cancer`); ASCO's GI guidelines to `ascopubs.org`. The
  FDA notifications page adds a random query parameter on every request and is left as written.

## 3. Backlinks

Checked by fetching each page from the dev server and counting `href="/cancers/pancreatic/"` and links to the fourteen
subtype pages (`/tmp/panc-qa/checks3.sh`), and by reading the graph for the HPB collection (`/tmp/panc-qa/hpb-centres.ts`).

| Page | Result | Change |
| --- | --- | --- |
| `/cancers/pancreatic/` (parent) | Family strip lists all fourteen subtypes; each subtype page links the hub and the other thirteen | none needed |
| `kras-g12c`, `kras-g12d`, `brca-germline`, `msi-high`, `/targets/kras/`, `/targets/nrg1/`, `/targets/brca/` | 3 to 10 hub links each | none needed |
| FOLFIRINOX components (oxaliplatin, irinotecan, fluorouracil, leucovorin), gemcitabine, nab-paclitaxel and the doublet, liposomal irinotecan, NALIRIFOX, olaparib, adagrasib, daraxonrasib, zenocutuzumab | 2 to 3 hub links each | none needed |
| sotorasib | 1 hub link through a trial; the drug record carried no pancreatic cancer | supplement `cancers: ["pancreatic", "kras-g12c-pdac"]` (treatment supplements) |
| Pancreatic Cancer UK, Liverpool HPB centre, Glasgow Royal Infirmary, King's, `uk-hpb-specialist-centres` | 2 to 8 hub links each | none needed |
| Royal Free, Imperial, UCLH, Birmingham, Leeds, Newcastle, Southampton, Oxford, Nottingham, Leicester, Weston Park, Bristol | in the HPB collection with pancreatic trials but no pancreatic link of their own (Royal Free 0 hub links) | supplements `cancers: ["pancreatic"]` for the twelve (UK file) |
| `/roadmaps/pancreatic-roadmap/`, `/roadmaps/kras-roadmap/`, `/roadmaps/early-detection-roadmap/` | 3, 2 and 1 hub links; the early-detection roadmap carried only `related` | supplement `cancers: ["pancreatic"]` (evidence file) |
| For me, Edge "For you", `/tagged/pancreatic/`, `/tagged/gi/` | tile present (124 mentions); 2, 40 and 25 hub links; the search index and Edge feed are built from the graph at build time | none needed |
| Organ drawing | the `pancreas-biliary` schematic lists `pancreatic` in `cancers` and the hub renders `#anatomy` | none needed |

Backlinks go through the spike `supplements` mechanism, never by editing the owning file.

## 4. Page weight and the fold

The brief measured the hub at 818 KB on the wire; the dev server's HTML for `/cancers/pancreatic/` was 728 KB before
this pass and 708 KB after (dev HTML carries the React Flight payload beside the markup, so it runs at about two and a
half times the markup). The budget the registry test enforces is markup inside the layout by `renderToStaticMarkup`
(`src/lib/record-sections.test.ts`, `HUB_BUDGET_KB` 350, `SUBPAGE_BUDGET_KB` 600), measured with a temporary test that
was deleted before the commit:

| Page | before | after | | Page | before | after |
| --- | --- | --- | --- | --- | --- | --- |
| `/cancers/pancreatic/` (hub) | 265 | 257 (measured before the five short rows were restored; about 260 with them) | | `/cancers/pancreatic/where-you-are/` | 137 | 137 |
| `/cancers/pancreatic/finding-it/` | 136 | 135 | | `/cancers/pancreatic/living-with-it/` | 159 | 158 |
| `/cancers/pancreatic/treating-it/` | 220 | 214 | | `/cancers/pancreatic/coming/` | 282 | 277 |
| `/cancers/pancreatic/evidence/` | 238 | 231 | | `/cancers/pancreatic/data/` | 333 | 356 |
| `/cancers/pancreatic/science/` | 154 | 154 | | | | |

`/roadmaps/pancreatic-roadmap/` has its own 300 KB budget (`src/app/heavy-pages.test.ts`) and sat a few hundred bytes
under it; the citation counts moved onto the surviving paper ids (section 7) and the ingest cross-links tipped it to
309 KB. The cause on the page was duplication: 19 of the roadmap's 26 `links` were Europe PMC pages for papers the
roadmap already carries as key papers or step refs, each of which links Europe PMC itself, so the aside listed every
paper twice. Those 19 are removed (the five sources that are not paper records stay: NG85, the three NPaCA reports and Pancreatic
Cancer UK's campaign page), the reverse ingest links are withdrawn (open gaps), and the roadmap measures under 300 KB
again.

The hub was inside the 350 KB budget before the pass: eight of ten sections already go to pages by the registry's
estimate (only Overview and What it is are inline). What the hub still carries is the Overview itself (89 KB rendered:
a twelve-paragraph summary of 21 KB from the base spike and the core file, the state-of-the-art points, the family
strip, the organ drawing) and the record aside (43 KB: the model review panel and 124 source links). Two moves lightened
it without deleting content: the molecular layer's seven state-of-the-art paragraphs (about 900 characters each) are now
one-sentence headlines on the hub, with the full paragraphs carried as notes on the Data page ("The science in detail,
1 of 7 ..."), which is why Data grew by 23 KB; and the duplicate rows, milestones and problems above are gone. The
inline sections stay well under twice the inline line (Overview is pinned). `src/lib/record-sections.test.ts` and
`src/app/record-fold.test.ts` pass on the committed state.

## 5. Mobile audit and console check

- `npx tsx scripts/mobile-audit.ts http://localhost:4301`: 35 checks passed (its routes are the tools and one record of
  each kind; the pancreatic decision aid is not among them).
- Console and horizontal overflow at 390 and 1440 px on twelve pancreatic routes (`/tmp/panc-qa/mobile-check.mjs`, a copy
  of the TNBC helper). The hub, the section pages, the decisions page, the roadmap and the subtype and term pages lay
  out at 390 px (`scrollWidth` 390, `innerWidth` 390). Two pages grew the layout viewport: `/cancers/pancreatic/uk/` to
  596 px because three trial cards carried a site and its sponsor as one nowrap chip ("University Hospitals Birmingham
  (sponsor University of Birmingham); UK specialist centres joining", 546 px of min-content) and the legacy strip
  rendered long trial names as nowrap chips; and `/tools/pancreatic-first-treatment/` to 852 px because the fitness
  question's second option was a 110-character nowrap chip. The sponsors moved to the trial notes and the sites are one
  chip each, the option label is short with the long form as its hint, and two components let those chips wrap
  (`whitespace-normal` on the legacy trial chips in `src/app/cancers/[id]/uk/page.tsx` and on the option buttons in
  `src/components/DecisionToolView.tsx`, which the gallbladder and TNBC tools did not need because their labels were
  short). Both pages measure 390 px after the change (`/tmp/tnbc-qa/cdp-wide.mjs`, `cdp-mincontent.mjs`). Before the
  link de-duplication the hub and six section pages logged the NG85 duplicate-key error and the UK page the figures-table
  keys; after it the pancreatic routes log only the pre-existing dev-mode hydration attribute message, which the
  gallbladder and TNBC reviews also recorded.
- Screenshots (`/tmp/panc-qa/shot-*.png`): the hub, UK, decisions, roadmap, tool, treating-it and science pages read
  correctly at both widths; nothing is clipped or overlapping.

## 6. Private-data check

Grep of the seventeen spike files and the decision aid for individual dates, personal names, ages and allele fractions
(`/tmp/panc-qa/checks4.sh`): the 562 ISO dates are ClinicalTrials.gov start and completion dates (458 in the registry
file), ISRCTN and audit dates, NICE and SMC decision dates, marketing authorisation dates and page-read dates; every
"aged" phrase is a trial or cohort eligibility range or a NICE referral threshold; the only personal names are published
authors and UK clinicians with public professional pages (Biankin, Ghaneh, Palmer, Halloran, Greenhalf); the phone
numbers are charity helplines. No case descriptions, ages of individuals, allele fractions or references to the private
repositories. Nothing removed.

## 7. Glossary terms and journals

The molecular layer's report listed the terms it wanted to link to. PanIN, Lewis-negative status, classical versus
basal-like and Know Your Tumor already existed; IPMN and MCN are the cancer records `ipmn-cystic-precursors`,
`ipmn-associated-carcinoma` and `mcn-associated-carcinoma`; CodeBreaK 100, KRYSTAL-1 and HALO-301 are trial records.
Seven new terms are written in `pancreatic-molecular.ts` where a source already in its SRC table supports them, each
quoting only figures the layer had read: `gata6-classical-basal-marker` (O'Kane 2020, Aung 2018, Chan-Seng-Yue 2020),
`kras-allelic-imbalance` (Chan-Seng-Yue 2020, Notta 2016), `caf-subtypes-pancreatic` (Ohlund 2017, Elyada 2019,
Grunwald 2021), `compass-study-pancreatic`, `caps-consortium-pancreatic-screening` (Canto 2018, Dbouk 2022, Goggins
2020), `detect-a-study` (Lennon 2020) and `ccga-study` (Klein 2021). Journal records `gut` and `gastroenterology` are
added to `src/data/journals.ts` in the file's pattern (publisher, society, ISSN, scope, access, founded, `matchNames`);
four and fourteen of the pancreatic key papers name them, so the journal pages list those papers, and the fourteen
paper records in the evidence and molecular files carry `journals: ["gut"]` or `["gastroenterology"]` so the two
records have inbound links (the orphan ratchet, `src/data/orphans.test.ts`, would otherwise count them). No impact
factor is quoted for either because none was read from a source during this pass. The citation snapshot
(`public/citations/index.json`) carried counts under the eleven re-minted paper ids; eight were moved to the surviving
ids and two dropped where the surviving id was already indexed.

## 8. Gates

`npm run validate` (17,277 entities OK), `npm run typecheck`, `npm run lint` (0 errors; 8 pre-existing warnings) and
`npx vitest run --testTimeout=600000` pass on the committed state. No floor was moved.

## Open gaps

- Four papers exist twice: the full evidence records for PREOPANC (2020), HALO-301, PANOVA-3 and the ponsegromab
  phase 2 and the thin Europe PMC ingest records `paper-versteijne-j-clin-oncol`, `paper-van-cutsem-j-clin-oncol`,
  `paper-babiker-j-clin-oncol` and `paper-ponsegromab-phase-2-n-engl-j-med-2024`. Supplements make each ingest record
  point at the full one (the full record sees it as an incoming neighbour); the reverse link was written and withdrawn,
  because the roadmap page renders a key paper's related papers and the four ingest cards took
  `/roadmaps/pancreatic-roadmap/` from under to 1.8 KB over its 300 KB budget (`src/app/heavy-pages.test.ts`).
  Retiring the ingest ids needs the same redirect policy the TNBC review asked for.
- `public/reviews/models/pancreatic.json` (the model panel, 17 September 2026) was written against the pre-spike record
  and still says approval is pending and that the record lacks risk-factor and tumour-suppressor content; it renders in
  the aside of every pancreatic page and needs re-running with the owner's key.
- The National Pancreatic Cancer Audit pages disagree with themselves: the 2026 report page calls itself "this second
  State of the Nation report" while report pages exist for 2024, 2025 (version 2, September 2025) and 2026; the roadmap
  and UK file link all three and describe the 2024 report as the first.
- Five NHS and Scottish government hosts could not be reached from this network at all (section 2); the Royal Surrey
  HPB page in particular should be re-checked from another connection.
- The dev-mode hydration attribute mismatch on chip `lang` attributes persists on record pages (also on the gallbladder
  and TNBC pages); not from the spike data.
- The hub's Overview is still 89 KB of markup, most of it the twelve-paragraph summary: three paragraphs from the base
  spike (2026 headlines) followed by nine from the core file (epidemiology, risk, presentation, diagnosis, staging,
  pathology, screening). They do not repeat each other, but an editorial pass could move the epidemiology detail to the
  FAQ notes and leave a shorter overview.
- Registry-only trial records (`pancreatic-registry-trials.ts`, 284) carry generated one-line summaries, as in the
  gallbladder and TNBC spikes.

## Repeating this review for the next deep spike

Follow the lists at the end of `docs/GALLBLADDER-QA.md` and `docs/TNBC-QA.md`, and add: (11) check the base record in
`cancers.ts` (or the NCI list) as a source of duplicates too, not only the spike files, because its short history,
biomarker and open-problem lines survive the merge beside the spikes' full versions; (12) grep every file for the same
regulatory event (approval, appraisal, termination) and settle each on one date and one status before reading the
pages, since a "pending" written by an earlier spike and an "approved" written by a later one both render; (13) when a
publisher's site has moved its information tree (Pancreatic Cancer UK here), rewrite the prefix across every file in one
script and record the handful of pages that moved elsewhere; (14) measure the hub twice, as dev HTML and as
`renderToStaticMarkup`, because the budget is on the second and the first runs at two to three times it; (15) before
removing a standard-of-care row, grep the decision aids, `src/lib/sequencing.ts`, `relevance-rows.ts` and
`first-60-days.ts` for its setting label, because they quote and key on the short rows; (16) run the width check on the
new decision aid and the UK page, not only the mobile-audit routes, since one long option label or site chip is enough
to widen the layout viewport.
