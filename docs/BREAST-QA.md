# Breast cancer family round: review checklist and results (25 September 2026)

Four agents filled in the breast cancer family page in parallel (`src/data/spikes/breast-core.ts`, `breast-treatment.ts`
with `breast-treatment-shared.ts` and its three trial files, `breast-uk.ts`, `breast-living.ts`, and
`src/data/decision-tools/breast-surgery-choice.ts`). This is the review that ran afterwards, following
`docs/TNBC-QA.md`, `docs/PROSTATE-QA.md` and `docs/LUNG-QA.md` step for step, including the numbered lists at the end
of each. Commands assume a dev server on a free port above 4000 (`npx next dev -p 4214`) and Chrome at the usual macOS
path. Working files are under `/tmp/breast-qa` (the per-file attribution dump, the family-against-subtype prose
comparison, the URL extractor and checker with its cache, the fetched NICE pages, the CDP console, width and
min-content probes, the fetched dev pages, and the edit scripts that made the bulk changes). The worktree had no
`node_modules` of its own, so the dev server only starts after `cp -Rc` of the repository's into it, as the lung
review records.

**This round's risk was not the usual one.** The three receptor subtypes already had deep spikes, so the danger was
never thin content; it was the family page and a subtype page each saying the same thing, and the family page
contradicting a subtype page that had read the source more recently. That was checked first and hardest, and the
answer is the best result any of these reviews has had: **the four new layers duplicate each other nowhere, and they
duplicate the subtype pages nowhere.** Across the merged `breast-cancer`, `tnbc`, `breast-hr-positive` and
`breast-her2-positive` records and the six histology and clinical-entity pages beside them, a 5-gram comparison of every string of
60 characters or more found **zero** cross-record prose duplicates and eight shared sentences, all of them source
labels for the same NICE guideline, dataset or SEER table.

**The duplication that does exist is older than this round and sits one level down.** The base records for
`breast-hr-positive` and `breast-her2-positive` in `src/data/cancers.ts` still carried the six and five history
entries, the six standard-of-care one-liners, the five open problems and the five state-of-the-art lines that their
own September deep spikes write in full. A reader following the family page's routing, which is what this round
built, landed on a Milestones list with "Tamoxifen approved" and "TAILORx: most women can skip chemotherapy" printed
twice, and a Treating it list with "Metastatic first line" twice under two spellings. That is the lung review's rule
24 (check the base records of every cancer the spike touches, not only the one it patches), and `breast-core.ts`
patches all six.

`/cancers/breast-cancer/finding-it/` and `/treating-it/` answer 500 on the dev server and are **not a bug**: both
sections are inline on the hub by the section plan's own weight decision, so `generateStaticParams` does not emit
them and `dynamicParams = false` makes any other address an error in dev and a 404 in the export. The hub carries
`id="sec-finding-it"` and `id="sec-treating-it"` in full and no nav link to either page.

## 1. Read every page end to end (1440 and 390 px)

Pages: `/cancers/breast-cancer/` and its eight section and sibling pages (`evidence`, `science`, `where-you-are`,
`living-with-it`, `coming`, `data`, `changes`, plus `uk` and `decisions`; Overview, What it is, **Finding it** and
**Treating it** are inline on the hub), `/cancers/breast-hr-positive/`, `/cancers/breast-her2-positive/`,
`/cancers/tnbc/`, `/cancers/tnbc/uk/`, the six histology and clinical-entity pages under the family (DCIS, LCIS,
no special type, invasive lobular, male and inflammatory) and the medullary record the round folded, `/tools/breast-surgery-choice/` and `/first-60-days/breast-cancer/` (25 routes fetched and read as text,
plus the term, trial and institution pages the layers link).

| Check | Result | Change |
| --- | --- | --- |
| Sections or sentences that say the same thing twice | **Between the family page and the subtype pages: none.** A per-file attribution dump of every merged array (1,214 rows over twelve files) is what makes this readable. On `breast-cancer` the 24 standard-of-care rows come from four files with no overlap: 2 base rows, 3 from `breast-core.ts` (diagnosis, staging, recurrence), 12 from `breast-treatment.ts` (the surgery and radiotherapy spine) and 7 from `breast-living.ts` (the same decisions written for a patient). 15 history entries, 10 open problems, 7 state-of-the-art lines, 53 terms, 79 links, **0 duplicate link URLs**. **On the two receptor pages it is bad and it is older than this round.** `cancers.ts` carried four one-line settings on `breast-hr-positive` (Early stage; Metastatic first line; Metastatic second line; Endocrine-resistant) and two on `breast-her2-positive` (Early stage; Metastatic) that the September spikes restate at length with their trials; six history entries on the first (1896 Beatson, 1977 tamoxifen, 2015 palbociclib, 2018 TAILORx, 2022 HER2-low, 2026 PROTAC) and five on the second (1987 Slamon, 1998 trastuzumab, 2013 T-DM1, 2021 DESTINY-Breast03, 2026 T-DXd) that the spikes write again; three and two one-line open problems and three and two state-of-the-art lines likewise. 1977, 1987 and 2018 rendered as two **identical** rows under Milestones, and "Metastatic first line" and "Metastatic, first line" as two rows of the same name. **Three duplicate link URLs**, all written by `breast-core.ts` onto records another file owns: the SEER breast-subtypes URL onto `tnbc`, which `tnbc-core.ts` already carries under its own label, and the Tan 2020 WHO DOI onto `lobular-carcinoma-in-situ` and `invasive-breast-carcinoma-no-special-type`, which `cancers-wave4-breast.ts` already carries. | The base one-liners, history entries, open problems and state-of-the-art lines are removed from `cancers.ts` with a comment naming the file that now owns each, following the pattern `cancer-parents-wave2.ts` already uses for `breast-cancer` and `lung-cancer`. Every id they referenced was checked reachable before the removal (a before-and-after snapshot of the ids reachable from each of the seven patched records: **0 lost**), and the NCCN guideline summary those rows were the only citation of is now a link on both records, so `src/lib/model-reviews.test.ts` still finds every source the panel quotes. The three duplicate links are removed from `breast-core.ts`. **Result: `breast-hr-positive` 15 rows to 11, 24 history entries to 18, 11 open problems to 8, 9 state-of-the-art lines to 6; `breast-her2-positive` 12 to 10, 20 to 15, 10 to 8, 8 to 6; no duplicate link URL on any of the four records.** |
| The UK pages: is the family page restating `tnbc-uk.ts`? | The UK agent reported finding no shared prose with `tnbc-uk.ts`, only shared sources, and that is **independently confirmed**. A 4-gram comparison of every string of 40 characters or more in the two pathway objects (470 against 415) found 7 exact matches, 33 near matches at Jaccard 0.25 or more, and 1 shared sentence of 12 words or more. **Every one of them is a label, a national standard or a proper name**: the NG101 title, the AWMSG, New Treatment Fund, Public Health Scotland, Northern Ireland waiting-times and NHS Business Services Authority source labels, "Treatment starts within 31 days of the decision to treat", "First treatment within 62 days of the urgent referral", "Faster Diagnosis Standard: told you have cancer, or that you do not, within 28 days", and the trust names Guy's and St Thomas' and University Hospitals Birmingham. Not one `detail`, `what`, `note`, `story` or `text` field is shared. The two pages **do cover some of the same ground** (both describe the referral routes, the one-stop clinic, the 28/31/62-day standards, reconstruction under NG101 and the R208 germline panel), but in different words, from different sources and at different depths, and no figure disagrees between them. The family page is also far deeper on what is genuinely shared: the NHS Breast Screening Programme in full, the very high risk surveillance programme, the family history service and the four-nation split, none of which is on the triple-negative page. | None. The UK agent's report holds. |
| Contradictory figures | **None found between the family page and any subtype page.** The figures that appear on both sides agree exactly: 59,413 UK cases and 11,200 deaths a year (`breast-core.ts` and `tnbc-core.ts`); "In England in 2022, 85 percent of cases with a known stage were stage I or II" (both, both correctly about all breast cancer); the SEER 21 subtype shares (70.1 / 13.3 / 10.8 percent) and the five-year survival figures behind them; the screening age ranges and intervals in `breast-uk.ts` and `tnbc-uk.ts`; TA992 described as a refusal on both. Against their own sources, 19 of 20 sampled figures on the core and treatment layers agree to the digit, and every one of the six groups of UK figures does: the 2024/25 screening statistics (2.75 million invitations, 1.94 million screened, 71.8 percent coverage, 70.6 percent uptake, 63.6 percent first-invite uptake, 19,291 cancers at 9.0 per 1,000), the leaflet's 96/4/1 arithmetic, the 1 in 7 lifetime risk, the Marmot review's 1,300 deaths prevented and around 3 overtreated, the six programme standards BSP-S02, S03, S06, S07, S09 and S13, and every English waiting-time figure for July and April to July 2026, recomputed from the cited CSV. **One wrong citation**, reached from the treatment layer: the LUMINA record in `src/data/radiation-wave2.ts` cited "Whelan and colleagues, Lancet Oncology 2023" with DOI `10.1016/S1470-2045(23)00246-2`, which resolves to a phase 1 BCMA CAR-T trial in multiple myeloma. LUMINA's own figures are all correct. **One overstated scope**: the HTG719 row said the eligible population is "nought to three positive nodes", where recommendation 1.2 says the tests should not be used for women who have not been through the menopause, 1.4 allows node-negative use only while more evidence is generated and only at intermediate risk, and 1.3 and 1.5 say MammaPrint and IHC4+C should not be used at all, although the row listed both among the tests. **One date attributed to the wrong object**: "its sixth edition appeared in April 2026" is the online publication date of the WHO editorial board's own summary of the sixth edition (Quinn, Histopathology 2026;89(2):199 to 218), not a confirmed date for the book. | LUMINA now cites Whelan et al., New England Journal of Medicine 2023;389:612 to 619, `10.1056/NEJMoa2302344`, with the 90 percent confidence interval the paper gives. The HTG719 row names the three tests the guidance endorses, says the menopause condition and the node-negative condition in the reader's own terms, and records that the test directory entry M3.12 is two tests wider than the guidance; the OPTIMA note is corrected the same way. The glossary term now says the sixth edition "was set out in April 2026, in the editorial board's own summary of it". |
| Orphaned references | Four comments naming "agent B", "agent C" and "agent F" in `breast-core.ts`, which do not render but which every previous review has reworded. Three sentences that do render and read as notes to the developer: "Two more series, folded in from **the page this record replaced**" on the medullary record; "which is why the number is not carried on **this record**" on START-A; and "which is the argument **this record exists to record**" on RAPID. **Five NHS England source-link labels carrying HTTP status codes and a firewall vendor as their visible link text** ("the page answered HTTP 403 with a Cloudflare interstitial to OnCo on 25 September 2026"; "HTTP 202 with an empty web application firewall challenge", three times) and one gaps entry written the same way, which is the prostate review's exact finding repeated. One more of the same kind on `tnbc-uk.ts`: "the national CDF list itself could not be read (202)". No "see below", "the rows above", "TODO", "placeholder" or source-code path renders on any breast page. | All rewritten in a reader's language. The gaps keep the fact (the page will not open for an automated reader, so the figure is taken from the release rather than the tables) and drop the status codes and the vendor. Comments name files, not agents. |
| Sentences reading as prognosis advice | None. No sentence gives a reader a personal survival probability. Every survival figure carries its cohort and its source: the Nottingham Prognostic Index bands are quoted with Galea's 1,629-patient series and the age-matched population figure beside them; the SEER figures carry SEER 21 and their years; the UK ten-year figure carries Cancer Research UK and its 2018 prediction. The family record's own outlook note opens "Population figures for breast cancer are averages over everyone diagnosed in a period" and closes "No one of those numbers is a prediction about a person". The living layer repeats a guard on every question set: "no figure on this page is a prediction about you". | None. |
| "Women" where "people" is meant | Held. The living, treatment and UK layers use "people" for anything true of everyone and "women" only where the source or the programme says women (the screening programme's own eligibility, NG101 recommendations that are written about women, trial cohorts that enrolled women). Male breast cancer is named on the hub with its own figure (about 420 UK cases a year against about 59,000), in the symptoms list ("a lump behind a man's nipple needs the same appointment"), in the R208 testing criteria ("breast cancer in anyone assigned male at birth at any age") and as a page in the family strip. The HTG719 row names men and trans, non-binary and intersex people because the guidance does. | None. |
| US spellings, em-dashes | **Zero** em-dashes, en-dashes, figure dashes and minus signs in the nine files. US spellings occur twice, both inside proper names: "World Health Organization" in a quoted paper title and "University of Texas MD Anderson Cancer Center" in a trial sponsor field. | None. |
| React console errors | Console at 390 and 1440 px on sixteen breast routes: **no duplicate-key errors, no exceptions**. The only message is the dev-mode hydration attribute mismatch on chip `lang` and `translate` attributes that the gallbladder, TNBC, pancreatic, colorectal, lung and prostate reviews all recorded and which is not from this round. | None here. |
| Horizontal overflow at 390 px | **`/cancers/breast-cancer/living-with-it/` laid out at 439 px**, and no other breast route did. The cause is the red-cards grid: a grid item's automatic minimum size is its content's min-content width, a concern chip cannot wrap (`.chip` is `white-space: nowrap` by design, one pill being one unit), and the lymphoedema card's chip for `lymphoedema-decongestive-therapy` is "Compression, decongestive therapy and exercise for lymphoedema", 397 px wide at a 390 px viewport. The same page for triple-negative, prostate, lung, colorectal and gallbladder disease lays out at 390: breast is simply the first cancer whose red card names a record with a long enough title. | `min-w-0` on the card in `src/components/RedCards.tsx`, so the track stays at the viewport and the chip's own `max-width` and ellipsis do the truncating, with `ChipTitles` carrying the full label. All sixteen breast routes, and the five other cancers' living-with-it pages, now lay out at 390 (`scrollWidth` 390, `innerWidth` 390). |

## 2. Cited URLs

A walker over the nine modules and their exported tables, after template expansion and including `doi` and `pmid`
fields, produced **205 distinct URLs**, each fetched once with a browser user agent, following redirects manually,
cached in `/tmp/breast-qa/url-cache.json`.

- **160 returned 200.**
- **37 returned 403 to a script**, all but one a bot-blocking publisher reached through `doi.org`: NEJM (9), JAMA
  Network (8), ASCO Publications (5), Oxford Academic (5), Wiley (4), BMJ Open (2), Journal of Clinical Pathology,
  the BMJ and Lippincott (1 each). The exception is `health-ni.gov.uk`, which blocks scripts as it did in the TNBC
  review.
- **6 returned 202**, all `www.england.nhs.uk`, which serves an AWS web application firewall challenge to a script.
  The figures behind them were read through the site's own WordPress REST endpoint and through the statistics CSV,
  which both answer 200; the page says so without naming a status code or a vendor.
- **2 dead (404), both fixed.** `en.wikipedia.org/wiki/WHO_classification_of_tumours` (the article is now
  `WHO_Blue_Books`) on the `who-breast-classification` term, and
  `en.wikipedia.org/wiki/Bloom%E2%80%93Richardson_scale` (the grading system is covered at
  `Breast_cancer_classification`, which names Nottingham, Elston, tubule formation and mitotic count) on the
  `nottingham-grade` term. Both replacements answer 200 and were read.
- **1 URL added**: `nice.org.uk/guidance/ta992`, so a reader told on the family UK page that a drug was refused can
  open the refusal. TA992 was cited by number twice and had no source entry, unlike every other appraisal on that
  page.
- **1 URL corrected**: the LUMINA DOI (section 1).

## 3. NICE: every identifier and every recommendation number checked against its own page

The breast files cite **24 NICE identifiers** (NG101, NG12, NG234, NG257, CG164, CG81, CG151, QS12, HTG719, HTG642,
DG34, DG58, TA501, TA214, TA263, TA265, TA886, TA992, TA1040, TA1089, TA1112, TA1136, and the three in-development
references GID-TA12551, GID-NG10438 and GID-NG10592). Every one was fetched and read (`/tmp/breast-qa/nice/`).

- **All 24 exist, every title matches and every publication date the files state matches the date on the page.**
- **Every recommendation number the repo cites exists on the guideline it is attributed to.** The recommendation
  chapters were fetched and parsed and 119 distinct numbers checked: NG101 86, CG164 21, NG257 6, CG81 4, NG12 2.
  The one apparent miss, "NG101 1.20", is the hazard ratio 1.20 in the sentinel-node row, not a recommendation.
- **The quotations are exact.** NG101 1.3.1 (all three receptors assessed simultaneously at the initial
  histopathological diagnosis), 1.3.5 (available and recorded at both multidisciplinary meetings), 1.3.6 (BRCA
  testing under 50 in triple-negative disease, which is the number the TNBC review corrected), 1.4.3 / 1.4.4 / 1.4.5
  (tumour on ink; within 2 mm for DCIS; within 1 mm for invasive disease), 1.4.13 (the POSNOC discussion), 1.5.1 and
  1.5.3 (reconstruction offered to everyone, both options whether or not available locally), 1.13.7 (who can leave
  radiotherapy out), 1.13.13 and 1.13.14 (26 Gy in 5, and 40 Gy in 15 where the shorter course is unsuitable) and
  1.15.1 and 1.15.3 (annual mammography for five years; no routine ultrasound or MRI) were all read on the page and
  are quoted word for word. NG257's six fertility-preservation recommendations 1.53.1, 1.53.3, 1.53.4, 1.53.6, 1.53.7
  and 1.53.8 are quoted verbatim, including the funding sentence most people are never told. CG81 1.3.1 to 1.3.3 and
  1.4.1 are exact, including "[2017, amended 2026]".
- **Terminated, refused and in-development are kept apart everywhere they appear**, which is decided item 5. TA1089
  (13 August 2025) and TA1112 (19 November 2025) both carry "(terminated appraisal)" in their NICE titles and both
  say "NICE is unable to make a recommendation ... because the company did not provide an evidence submission"; the
  family UK page gives them a row of their own, "Metastatic disease: appraisals abandoned before a decision",
  separate from "Metastatic disease: the refusals that apply to everyone", and says in the row itself that "a
  terminated appraisal is not a refusal on the evidence: it means the NHS has no funding route and no committee ever
  looked". TA214, TA263 and TA501 are refusals and are described as refusals. TA992 is a refusal on
  cost-effectiveness and is described as one on the family page, on `tnbc-uk.ts` and in `tnbc-treatment.ts`.
  SMC2916 and SMC2888 are non-submissions and are named as non-submissions. Nothing is described as "check the
  guidance". **No status error was found anywhere in the two files.**
- **One thing the pages now say that the files did not.** NG101 was last reviewed on 11 September 2026 and NICE says
  it "will be updating the recommendation on annual mammography", following a June 2026 surveillance decision. That
  is the single recommendation the living layer's follow-up answer is built on, so both the answer and the NG101
  source label now say it is under revision.

## 4. The six decisions, checked rather than reopened

1. **The routing from a receptor result to the reader's own page works, followed end to end.** The hub's `tldr` says
   "the result that decides which page you need is the receptor result ... Those two answers give four boxes, not
   three, with a page for each"; the Subtypes block says which box goes to which page with its share ("HER2-positive
   whatever the hormone receptors say (13.3 percent, of which 9.3 points are also hormone receptor-positive)"); and
   the family strip at the top of the hub lists and links all eighteen children, so every destination is one click
   away. The `aka` aliases the core layer added are what make it work from search, and they do: "triple positive
   breast cancer" and "ER positive HER2 positive breast cancer" both rank `breast-her2-positive` first, "all three
   receptors negative" ranks `tnbc` first, "ER low positive breast cancer" ranks `breast-hr-positive` first with the
   `er-pr-negative-threshold` term in the top four, "grade 3 triple negative breast cancer" ranks `tnbc` first,
   "stage 0 breast cancer" ranks `ductal-carcinoma-in-situ` first, "lobular neoplasia" ranks
   `lobular-carcinoma-in-situ` first, and "IDC NST" and "ordinary breast cancer" both rank
   `invasive-breast-carcinoma-no-special-type` first. The UK page is the same page for all three receptor subtypes
   (277 KB of markup for each of `breast-cancer`, `breast-hr-positive` and `breast-her2-positive`), which is the
   alias routing working. **One placement finding, recorded rather than changed**: the fullest statement of the
   routing, the three "Which page is mine?" notes that cover the ER-low-positive band, "a grade is not a page" and
   what to do if you are here after a screening recall rather than a diagnosis, is in the record's `notes` field, and
   `notes` belongs to the **Data** section in `src/lib/record-sections.ts`. Those three paragraphs therefore render
   only on `/cancers/breast-cancer/data/`, under "Notes", on the last tab. The routing itself is on the hub; its
   fullest version is nine tabs away.
2. **No new cancer record and nothing re-parented.** 454 cancer records before the round's merge and 454 after.
   `breast-cancer` has 37 descendants in three tiers: the three receptor subtypes with their five state pages, the
   twelve histologies and four clinical entities directly under the family, and the twelve histologies and states
   under `tnbc`. No record in the breast group is unparented except the family itself. One record was **removed**,
   which the core layer records in its header: `breast-carcinoma-medullary-pattern`, a second full page for what
   `medullary-pattern-breast-carcinoma` already described, written the same day by a different layer. That is
   correct, and its consequence had been missed (section 6, decided item 6).
3. **The classification choice is stated, not merely made.** It is said twice, in the two places a reader would
   look. The family record's open problem, rendering on `/cancers/breast-cancer/coming/`, reads: "The classification
   a report is written against is two years behind the classification in print ... the UK reporting dataset in force
   was written against the fifth edition and is due for review in November 2026. Every page in this family, and every
   report a patient is holding, is currently a fifth-edition document, and there is no mechanism that tells a patient
   which edition her report was written to." The glossary term `who-breast-classification` says it again with the
   dataset's own words: "The Royal College of Pathologists dataset in force (G148, version 3, November 2024) states
   that its histological subtypes were updated in line with the fifth edition, and it is due for full review in
   November 2026. So in 2026 a UK report is a fifth-edition report, and the sixth edition is what the next one will
   be written against." The staging side is covered the same way by `tnm-breast-cancer-editions`, and the RCPath
   version, date and review date were read from the PDF and agree.
4. **The four breast red-card sets are correctly separate from the three triple-negative ones.** The breast sets
   (`breast-infection-sepsis`, `breast-cord-compression`, `breast-lymphoedema-cellulitis`,
   `breast-recurrence-signs`) are scoped `cancerIds: ["breast-cancer"]` and are the emergencies of the disease and
   of surgery, radiotherapy and any chemotherapy. The triple-negative sets are scoped `cancerIds: ["tnbc"]` and name
   carboplatin, pembrolizumab, sacituzumab govitecan and the deruxtecan antibody-drug conjugates, which are not
   given to everyone with breast cancer. That is how every other cancer in the file is handled and
   `src/lib/red-flags.test.ts` asserts the exact list for each. **Not folded.** One consequence is recorded as a gap
   below: `redFlagsForCancerId` matches on the exact id and does not walk to the parent, so the four family sets do
   not reach the three receptor pages, where prostate and lung solve the same problem by listing their subtype ids.
5. **Terminated, refused and in-development are kept apart everywhere they appear** (section 3). The four rows the
   UK agent fixed are correct against the NICE pages, and so is every other status claim in the two files.
6. **The retired ids.** `npm run -s validate` resolves every reference in the corpus, so no breast layer points at an
   id that no longer exists. But the round's own retirement had not been registered: `breast-carcinoma-medullary-
   pattern` was deleted from `cancers-wave4-breast.ts` with no entry in `src/data/merged-records.ts` and no redirect,
   so a published and indexed URL 404s in the export, and `breast-uk.ts` still listed the dead id among the UK
   pathway's aliases. Both are fixed: the pair is in `MERGED_RECORDS` with its reason, `vercel.json` redirects
   `/cancers/breast-carcinoma-medullary-pattern/:path*` to the survivor,
   `scripts/build-redirect-stubs.ts` writes the static stub, the alias now names the survivor, and the ratchet in
   `src/lib/corpus-rules.test.ts` ("every retired id redirects to a survivor that exists and has no record of its
   own") passes on it.

## 5. The two loose ends the agents reported against themselves

- **The re-excision rate after breast-conserving surgery.** The agent reported no UK figure; there is one, and the
  UK page found it. The National Audit of Primary Breast Cancer's 2026 data tables give **re-operation within 12
  months of breast-conserving surgery at 16 percent in England and 19 percent in Wales, ranging from 7.9 to 32.0
  percent by organisation**, and the page prints it as a figure with that fourfold spread named, plus two centres'
  own rates (Plymouth 10.3 percent of 861 operations, Norfolk and Norwich 10.0 percent of 1,117). The decision aid
  still does not quote a national number and instead tells the reader to ask "What proportion of people here need a
  second operation after conserving surgery?", which is the right question given the spread. Nothing was invented;
  the gap is closed, better than reported.
- **The unpublished trial.** POSNOC. Its record carries the design, the population, the randomisation strata and the
  prohibition that distinguishes it from Z0011 and SENOMAC, `status: "active"`, no `result` and no `outcomes`, and a
  TL;DR that ends "Results are not published yet." The registry agrees: NCT02401685 is active, not recruiting, with
  an actual enrolment of 1,900, a primary completion estimated July 2026 and a completion estimated 31 December
  2026. Correct as it stands.

## 6. Backlinks, mobile, console, private data and budgets

- **Backlinks.** All 97 records the four layers create or supplement were checked for a reference back into the
  breast family. 94 carry one. The three that do not are general glossary terms with no `cancers` array at all
  (`alpha-beta-ratio`, `carcinoma-in-situ`, `grade-vs-stage`), which is right for terms that belong to every cancer;
  all three are reached from the breast pages through the records' `terms` arrays (5, 2 and 1 inbound links among the
  25 fetched pages).
- **Mobile audit.** `npx tsx scripts/mobile-audit.ts http://localhost:4214`: **35 of 35 checks passed**.
- **Width at 390 px.** All sixteen routes checked (the hub and its eight section and sibling pages, the three
  receptor pages, `/cancers/tnbc/`, `/cancers/breast-cancer/changes/`, the decision aid and the first-60-days page)
  lay out at 390 after the red-cards fix, as do the living-with-it pages of the five other cancers that carry red
  cards (section 1).
- **Console.** Clean of duplicate keys and exceptions at both widths; the pre-existing hydration attribute mismatch
  is the only message.
- **Private data.** The nine files were scanned for individual dates, personal names, ages and allele fractions. Of
  the 90 ISO dates, 38 are the 25 September 2026 page-read date and the other 52 are NICE, GOV.UK, audit, screening
  and statistics publication dates; there are 32 distinct dates in all and not one is a person's. All 61 "aged"
  phrases are screening age bands, trial eligibility bands or published cohort statistics. No allele fractions, no
  case descriptions, no ages of individuals, no reference to the private repositories. The only personal name is
  Jack Cuzick, a published researcher with a public professional page, on the IBIS trials. Nothing removed.
- **Budgets.** Measured with `renderToStaticMarkup` inside the layout. **`breast-cancer`, `breast-hr-positive` and
  `breast-her2-positive` are now in the `HEAVY` list in `src/lib/record-sections.test.ts`** beside gallbladder,
  TNBC, NSCLC, pancreatic, colorectal, lung and prostate, so their budgets are enforced rather than measured once.

| Page | KB | | Page | KB |
| --- | --- | --- | --- | --- |
| `/cancers/breast-cancer/` (hub) | 247 | | `/cancers/breast-hr-positive/` (hub) | 189 |
| `/cancers/breast-cancer/evidence/` | 111 | | `/cancers/breast-hr-positive/coming/` | 180 |
| `/cancers/breast-cancer/science/` | 80 | | `/cancers/breast-hr-positive/data/` | 205 |
| `/cancers/breast-cancer/where-you-are/` | 110 | | `/cancers/breast-her2-positive/` (hub) | 178 |
| `/cancers/breast-cancer/living-with-it/` | 126 | | `/cancers/breast-her2-positive/coming/` | 149 |
| `/cancers/breast-cancer/coming/` | 136 | | `/cancers/breast-her2-positive/data/` | 170 |
| `/cancers/breast-cancer/data/` | 156 | | `/cancers/tnbc/` (hub) | 253 |
| `/cancers/breast-cancer/uk/` | 277 | | `/cancers/tnbc/decisions/` | 495 |
| `/cancers/breast-cancer/decisions/` | 443 | | | |

Budgets are 350 KB for a hub and 600 KB for a section page. The UK page and the decisions page have no budget of
their own in any test, as the lung review recorded; breast's decisions page at 443 KB is well under lung's 910.

## 7. Gates

`npm run -s validate` (18,858 entities OK), `npm run -s typecheck`, `npm run -s lint` (0 errors; the same 5
pre-existing warnings) and `npx vitest run --testTimeout=600000 --hookTimeout=600000` (163 files, 1,762 tests passed and
1 skipped) pass on the committed state; the same four passed on `main` before the review (163 files, 1,759 passed and
1 skipped), so nothing here is inherited.

One run failed and is worth recording because the next agent will hit it. `src/app/nested-anchors.test.ts` sets its
own 120-second limit in the test body (`FULL ? 1_800_000 : 120_000`), which `--testTimeout` does not override, and
`./[kind]/[id]/page.tsx` took 121,723 ms and timed out while a dev server and several headless Chrome instances were
still running from the page checks. With those stopped the same file passes in 164 seconds of wall clock with the
test itself well inside its limit. **Close the dev server and the CDP probes before the last full run.**

Two gates were tightened and none loosened: the three breast records added to the section-budget list, and the Ask
extractive floor **raised** from 0.42 to 0.4275 (rubric 0.65 to 0.66). `src/lib/ask.test.ts` measures retrieval
recall at **0.4326** and rubric **0.6900** after this review, against 0.4271 and 0.6875 before it. Recall rose while
text was removed, which is the opposite of the usual direction, and the reason is the finding this review turned on:
each removed base line was a second, weaker index entry competing with the long sourced one for the same question.
The measurement is recorded in the file's table with a dated note, as the convention asks.

## Open gaps

- **The three "Which page is mine?" notes render only on `/cancers/breast-cancer/data/`.** `notes` is a Data-section
  field in the information architecture, and the Data section is where the JSON, Markdown and RDF twins live. The
  routing itself is on the hub in the `tldr`, the Subtypes block and the family strip, so a reader is never stuck;
  but the fullest version of the thing this round was built for, including the 1 to 10 percent ER-low band and the
  screening-recall case, is on the last tab. Moving it means either a new field on the hub or a change to the section
  registry, which is the owner's call and not a review's.
- **The organ schematic prints the family page's routing sentences as subsite captions.** `matchedSubtypes` in
  `src/data/organ-schematics.ts` matches a subsite's keywords as substrings against the record's `subtypes` strings,
  which it assumes are short names. The family page's `subtypes` are three long axis sentences, so the breast
  schematic's legend prints 338, 214 and 157 characters of routing prose beside "Ducts (most cancers start here)" and
  again beside "Lobules". It reads badly at 390 px. This is corpus-wide, not breast-specific: **894 subsite captions
  longer than 70 characters** exist across the corpus, on leukaemia, sarcoma, lung and prostate pages among others;
  the single longest is this one, and three of the six longest are on this page. Capping the caption
  length is a one-line change in `matchedSubtypes` that would alter every organ page in the corpus, which is too
  broad for a breast review.
- **The four family red-card sets do not reach the three receptor pages.** `redFlagsForCancerId` matches on the exact
  cancer id. Prostate lists four state ids on each set and lung lists `lung-cancer`, `nsclc` and `sclc`; the breast
  sets list only `breast-cancer`, so a reader on `/cancers/tnbc/living-with-it/` gets the three triple-negative cards
  and not the spinal cord compression, cellulitis or recurrence cards, all of which apply to her. Separate was the
  decision; unreachable was probably not. Adding the subtype ids would change the assertions in
  `src/lib/red-flags.test.ts` and is a content decision, so it is recorded rather than made.
- **The family page and the living layer cover four decisions twice, for two audiences.** "Surgery to the breast:
  conservation or mastectomy" and "Breast-conserving surgery or mastectomy"; "Reconstruction" and "Reconstruction
  surgery, delayed reconstruction, or neither"; the three axilla rows and "Surgery to the armpit, and the
  lymphoedema risk that lasts for life"; "Dose and schedule" and the radiotherapy questions. The prose is entirely
  different in each pair (the clinical rows carry the trial figures, the patient rows carry the NG101 numbers and the
  questions to ask), and the lung review recorded the identical pattern as a deliberate keep. A reader moving down
  `/cancers/breast-cancer/living-with-it/` still meets the same decision twice.
- **`tnbc-uk.ts` and the family UK page cover some of the same NHS ground in different words.** No prose is shared
  and no figure disagrees (section 1), and a triple-negative reader needs a coherent pathway of her own. But the
  referral routes, the one-stop clinic, the three waiting-time standards, reconstruction under NG101 and the R208
  panel are now written twice in the corpus. Lung solved this by making one pathway serve the family and its subtypes
  through aliases; breast has two pathways because triple-negative disease got one first.
- **The WHO sixth edition's own publication date is not sourced.** The corpus cites the editorial board's summary of
  it (Quinn 2026, online 21 April 2026) and that is what "April 2026" now means on the glossary term; five other
  places in `breast-core.ts` still say "published April 2026" of the edition itself.
- **`public/reviews/models/breast-hr-positive.json` and `breast-her2-positive.json` predate this review.** Both
  quote the NCCN guideline summary that the removed base rows carried; the URL is now a link on each record so the
  panel's sources still resolve, but the reviews should be re-run with the owner's key against the folded records.
- **The NHS England pages answer 202 to any script.** The six the UK layer cites were read through the site's own
  WordPress REST endpoint and the statistics CSV, both of which answer 200. The pages say the figures come from the
  release rather than the underlying tables; the tables themselves have still not been read directly.
- The dev-mode hydration attribute mismatch on chip `lang` and `translate` attributes fires on breast pages as it
  does on every other cancer's. It is not from this round and is still unexplained.

## Repeating this review for the next round

Follow the lists at the end of `docs/GALLBLADDER-QA.md`, `docs/TNBC-QA.md`, `docs/PANCREATIC-QA.md`,
`docs/COLORECTAL-QA.md`, `docs/LUNG-QA.md` and `docs/PROSTATE-QA.md`, and add:

30. **A family round's duplication risk is not inside its own files; it is against the pages that already existed.**
    Compare the merged records string by string, not file by file, and compare on 5-grams rather than on exact
    matches, because two agents writing the same fact write it differently. Here that comparison came back clean, and
    the finding moved to the base records one level down, which nobody had compared.
31. **Check the base record of every cancer the spike *patches*, not only the one it is named after.** `breast-core.ts`
    patches seven records; the duplication was on two of the other six.
32. **When a round retires a record, check `src/data/merged-records.ts` and `vercel.json`, not just `validate`.**
    Validate only proves nothing references the dead id. It does not notice that a published URL now 404s, and it
    does not notice a UK pathway alias naming a page that no longer exists. The ratchet only checks ids that are
    already in `MERGED_RECORDS`.
33. **A grid of cards must be measured at 390 px with `min-content`, not just with the bounding box.** The red-cards
    overflow was invisible to a scrollWidth check on twelve of thirteen routes and only appeared on the one page
    whose data named a long enough record.
34. **Read the rendered page for where a field lands, not only for what it says.** The best writing in this round is
    in `notes`, and `notes` renders on the Data tab. A field's section is decided by `src/lib/record-sections.ts`,
    not by how important the sentence is.
35. **Raising the Ask floor is part of the ratchet, not an optional courtesy.** Appending a measurement more than
    0.0101 above the floor makes `only ever raises the extractive floor` fail until the floor is raised; that is the
    test working, and the floor should go to the measurement minus 0.005 as the note above the table says.
36. **Check a trial's citation as well as its numbers.** LUMINA's figures were all right and its DOI pointed at a
    myeloma CAR-T trial. A DOI that resolves is not a DOI that resolves to the right paper.
37. **Stop the dev server and the headless Chrome instances before the last full test run.**
    `src/app/nested-anchors.test.ts` carries its own 120-second limit that `--testTimeout` does not override, and it
    fails on a loaded machine and passes on a quiet one. A review that reads pages and then runs the suite in the
    same session will see it.
