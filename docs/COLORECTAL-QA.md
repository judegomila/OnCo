# Colorectal cancer deep spike: review checklist and results (25 September 2026)

Six agents built the colorectal cancer deep spike in parallel on top of the older `src/data/spikes/colorectal.ts`
(`colorectal-core.ts`, `colorectal-treatment*.ts` with `colorectal-registry-trials.ts`, `colorectal-uk.ts`,
`colorectal-molecular.ts`, `colorectal-evidence*.ts`, `colorectal-living.ts`, and `trial-sponsor-companies.ts`), under
the hub-and-sections architecture (docs/INFORMATION-ARCHITECTURE.md). This is the review that ran afterwards,
following `docs/GALLBLADDER-QA.md`, `docs/TNBC-QA.md` and `docs/PANCREATIC-QA.md` step for step, including the numbered
lists at the end of each. Commands assume a dev server on a free port above 4000 (`npx next dev -p 4321`) and Chrome at
the usual macOS path. Working files are under `/tmp/crc-qa` (the URL extractor and checker with its cache, the merged
record dump and its per-file attribution, the duplicate id, DOI and link finders, the NICE and four-nations page texts,
the CDP console, overflow, min-content and screenshot helpers, the fetched dev pages, and the edit scripts that made
the bulk changes).

## 1. Read every page end to end (1440 and 390 px)

Pages: `/cancers/colorectal/` and its eight section pages (`finding-it`, `treating-it`, `evidence`, `science`,
`where-you-are`, `living-with-it`, `coming`, `data`; Overview and What it is are inline on the hub),
`/cancers/colorectal/uk/`, `/decisions/`, `/changes/`, `/roadmaps/colorectal-roadmap/`,
`/tools/colorectal-adjuvant-chemotherapy/`, `/first-60-days/colorectal/`, the fifteen subtype pages, and the biomarker,
target, drug, trial, institution, term and collection pages the spike links (47 pages read as text, 86 fetched for the
backlink count).

| Check | Result | Change |
| --- | --- | --- |
| Sections or sentences that say the same thing twice | Standard of care: 57 rows from five files. `cancers.ts` carried four one-line rows (Screening, Stage II-III, Metastatic MSS, Metastatic dMMR) and `colorectal.ts` fourteen short ones, and the treatment file's 24 sourced rows restated both, setting for setting. History: 61 entries, with 1982 (total mesorectal excision) written twice, 1988 (Vogelstein), 2008 (KRAS as a negative predictor), 2012 (TCGA), 2013 (extended RAS), 2015 (consensus molecular subtypes), 2016 (circulating tumour DNA after surgery), 2021 (HIPEC) and 2022 (DYNAMIC) each written by two files, and a 1990 entry titled "MOSAIC and the adjuvant era" for a trial that reported in 2004. Open problems: 28, with the base spike's eight one-liners restated in full by the molecular, evidence and treatment layers, microsatellite-stable immunotherapy written three times and circulating tumour DNA four times. Papers: `paper-arnold-primary-tumour-side-ras-wild-type-ann-oncol-2017` and `paper-bullock-botensilimab-balstilimab-mss-colorectal-nat-med-2024` were each written in full by both the molecular and the evidence layers, so `mergeDuplicates` concatenated their findings and caveats (seven and six findings for three-finding papers); five more papers exist twice under different ids from the same two layers, and 23 colorectal spike papers share a DOI with a record the corpus already held. Trials: `quasar`, `scot` and `foxtrot` were written in full by both the treatment and the UK layers. Links: twelve URLs appeared twice on one record under two labels, which is what gives React duplicate-key errors. The UK page said Scotland's referral threshold five times, its screening age three times and England's age extension twice; the English pilot modelling figures were written three times. | The four rows in `cancers.ts` and the fourteen in `colorectal.ts` are gone; the treatment file's 24 rows are the sourced ones and the two refs no other row carried (`anti-egfr-left-sided`, `kras-plus-egfr-crc`) moved onto its left-sided and KRAS G12C rows. `src/data/decision-tools/colorectal-adjuvant-chemotherapy.ts` now quotes three treatment rows instead of two base ones, and `src/lib/decision-tools.test.ts` keeps those quotes equal to the data (a check that did not exist for colorectal before). Result: **39 rows** (24 sourced, 5 core, 10 living), see section 4. History 61 to 57: the duplicated milestones are removed or rewritten to what their layer alone adds, and the 1990 entry is retitled and dated correctly. Open problems 28 to 18. The two duplicated paper records became `sup<PaperInput>` supplements carrying only their relations; the three duplicated trial records are written once, in the UK layer, with the treatment layer's `outcomes` moved onto them. Zero duplicate URLs on any record the hub reaches. The UK page states each nation's threshold and age once, in the four-nations table. |
| Contradictory figures | **England's screening threshold.** The core layer asserted 120 micrograms of haemoglobin per gram in eight places while the UK layer printed "the widely repeated 120 is not quoted here because no readable source carries it". The core layer is right and its source is good: the modelling of the English FIT pilot (Br J Cancer 2022, read through Europe PMC) says "Current 2-yearly screening with a f-Hb threshold of 120 µg/g". **Uptake standard.** 62 percent acceptable and 73 to 76 percent achievable (core) against 52 and 60 percent (UK page). **Early-onset rise.** 3 percent a year at 20 to 49 (American Cancer Society 2026), "about 2 percent" (roadmap) and 1.6 to 7.9 percent across Europe and the United States (evidence layer) for the same claim. **KRAS.** "KRAS-mutant (~45%)" in the subtypes list against 40 to 44 percent in the molecular table on the same page; the 45 percent figure is RAS-mutant (KRAS plus NRAS), not KRAS. **BRAF V600E.** 10 to 15 percent (UK page) against 8 to 10 percent (subtypes and subtype page), 6 to 18 percent (molecular table across cohorts) and 8 to 12 percent (BREAKWATER key paper). **HER2.** 2 to 3 percent and 3 to 5 percent in two panels of the hub. **dMMR share.** "the 95% of colorectal cancers that are mismatch-repair proficient" beside "about 10-15% of colon cancers" on three biomarker and target pages; 95 percent proficient is the metastatic figure. **Botensilimab.** 17 percent response (molecular and evidence), 21 percent (treatment row) and "~20% ORR" (base spike): 17 percent of 101 response-evaluable patients is the phase 1 (Bullock, Nature Medicine 2024, abstract read), 21 percent of 123 is the later cohort selected for the absence of liver metastases (Clinical Cancer Research 2026); the treatment row also quoted a median overall survival and a 36-month rate that are not in the phase 1. **OPRA.** "five-year TME-free survival of 54 against 39 percent" against "3-year survival without TME 41% (induction) vs 53% (consolidation)"; both are correct, for the 2024 long-term report and the 2022 first report respectively (abstracts read). UK incidence (48,213 cases, about 17,700 deaths), US incidence (158,850 and 55,230, SEER 2026), the screening start ages (45 United States, 50 England, Scotland and Wales, 60 Northern Ireland), the symptomatic threshold of 10 micrograms per gram and the survival figures agree everywhere. | The screening-threshold gap on the UK page is rewritten: no English or Scottish programme publication states a threshold, and the 120 is attributed to the Br J Cancer paper. The uptake target on the UK page is 62 and 73 to 76 percent. The roadmap gives 3 percent in the United States and 1.6 to 7.9 percent in Europe. The subtypes list now reads KRAS 40 to 44 percent with NRAS in a further 4 to 9 percent and the allele shares from the molecular table, BRAF V600E 8 to 10 percent plus non-V600 2 to 4 percent, HER2 2 to 3 percent of all tumours and 5 to 8 percent of RAS and BRAF wild-type ones; the UK page's BRAF range is 8 to 10 percent. The 95 percent sentence says metastatic and names the localised figure. Every botensilimab figure now carries its population and publication, and the unsourced survival figures are gone. Both OPRA timepoints are stated with their report. |
| Orphaned references | A source-code path printed as a citation four times on the decision aid ("OnCo standard-of-care rows for colorectal cancer (src/data/spikes/colorectal-treatment.ts)"); four developer notes on the roadmap naming `scripts/roadmap-watch.ts`, `npm run roadmap:watch`, "the trials file of this deep dive", "the terms file" and `PENDING_TRIALS` and `PENDING_TERMS` in `./colorectal-evidence-shared.ts`; "written by another file of the deep dive"; seven paragraphs on the Data page opening "The science in detail, N of 7 (the molecular layer; the headline is on the overview)"; "correcting the note the core layer first wrote" and "The cell says so" in the UK gaps; "the attendance figures are in the screening-uptake problem written by the core layer" in an open problem; four "on this record" self-references in patient-facing question prompts; and "the specialist HPB centres" in the shared UK panel of `src/components/CancerRecord.tsx`, which is gallbladder-era copy rendering on every cancer. No "see below", "as above", "deep dive", "TODO", "placeholder" or "agent A/B/C" reaches the reader. | All rewritten in reader's language. The HPB wording in `CancerRecord.tsx` is now "the specialist centres" for every cancer. |
| Sentences reading as prognosis advice | None. No second-person survival statement exists on any page; every survival panel carries "Averages across everyone diagnosed, often years ago. Your stage, subtype, age, fitness and the treatment you receive matter more than the average", the `prognosis` field opens "Population averages, not a personal prognosis", and every trial result names its trial and its n. | None. |
| US spellings, em-dashes | Zero em-dashes, en-dashes, figure dashes and minus signs in the seventeen spike files, the sponsor file, the decision aid and the subtype file, and none on any rendered page. US spellings in OnCo prose: `tumorigenesis` five times and `tumorigenic` once, and `specialty` twice. Everything else the scan caught is a proper name (World Health Organization, National Cancer Center Japan, Sun Yat-sen University Cancer Center, Hemoccult-II, the author Gray R) or a verbatim quoted paper or ClinicalTrials.gov title, including the 234 `tumor` and 374 `-ize` forms in the registry file, which are registered titles and correct as printed. | The eight prose hits are UK spelling (`tumourigenesis`, `tumourigenic`, `speciality`). Two other non-ASCII characters in prose, the arrows in "APC → KRAS → TP53" and the beta in "TGF-β-rich", are now words. |
| React console errors | At 390 and 1440 px on twelve colorectal routes plus the roadmap, the decision aid, the first-60-days page, two subtype pages and the new biomarker page: no duplicate-key errors, no exceptions. The only message is the dev-mode hydration attribute mismatch on chip `lang` attributes, which the gallbladder, TNBC and pancreatic reviews also recorded and which is not from the spike. One wrong auto-link did render: the ordinary word "response" linked to the RESPONSE trial, a polycythaemia vera study, on `/cancers/colorectal/coming/`. | `STOP` in `src/lib/term-hover.tsx` gains "response", "correct", "prime", "opus", "coin", "crystal", "challenge", "focus" and "niche": ordinary English words that are also trial acronyms and were linking to the wrong record. |

## 2. Cited URLs

`/tmp/crc-qa/extract-urls.ts` walks the seventeen spike modules, their exported tables, the sponsor file and the
decision aid (plus `doi` and `pmid` fields) and `/tmp/crc-qa/check-urls.mjs` fetches each once with a browser user
agent, following redirects manually, cached in `/tmp/crc-qa/url-cache.json`. **1,406 distinct URLs** after the pass
(1,410 before).

- 1,233 returned 200.
- 167 returned 403 to a script, all bot-blocking hosts across 24 domains: NEJM (46), Europe PMC article pages (37),
  ASCO Publications (25), AACR (9), JAMA Network (9), Gut and BMJ (8), Oxford Academic (5), Wiley (6), Science (4),
  Annals of Oncology, the Lancet, SAGE, PNAS, Taylor and Francis and `health-ni.gov.uk`. ISRCTN answers 200 with its
  `/holding` cookie challenge for all 25 of its record pages, so those were read through the ISRCTN API.
- 4 returned 202 with an empty body: three NHS England pages and the Scottish referral guidelines chapter, all already
  named in the UK layer's own gaps.
- 2 unreachable from this network on every attempt (`bartshealth.nhs.uk` and `nuh.nhs.uk` home pages): neither
  confirmed live nor dead, kept, listed as an open gap.
- **3 dead (404), fixed**: the NATCAN bowel audit page (`/audits/nboca/` to `/audits/bowel/`, taken from the audits
  index), the East and North Hertfordshire page for Mount Vernon Cancer Centre (`/services/mount-vernon-cancer-centre/`
  to `/hospitals/mount-vernon/`, taken from the trust home page), and Cancer Research UK's Bowelbabe Fund page, for
  which no replacement exists on the site (four candidate addresses all 404) so the entry points at the CRUK donate
  page and the gap is recorded.
- **21 redirects rewritten to their final address**, the five the core agent flagged among them: the ESMO
  gastrointestinal guidelines index moved out of `/guidelines-by-topic/` (four places); Bowel Cancer UK moved its
  carer-support, end-of-life and Ask the Nurse pages; Maggie's `/cancer-support/` is now `/support-and-information/`;
  Marie Curie's palliative care page moved into `/information/getting-care/`; Bowel Research UK dropped its `www`; the
  FDA oncology approval notifications page changed a hyphen; Public Health Scotland's bowel screening and cancer
  waiting times indexes redirect to the dated edition the labels quote; Public Health Wales moved bowel screening from
  `/services-and-teams/` to `/topic/`; NHS Tayside needs `/index.htm`; the Scottish Medicines Consortium dropped its
  `www` (nine addresses, now built by the helper); the All Wales one-Wales panitumumab decision moved; and the three
  terminated NICE appraisals TA1118, TA334 and TA240 live under `/guidance/terminated/`, which a new `niceTerminated`
  helper writes.
- **Duplicate URLs on one record, all removed**: `emotional-support-cancer-uk` (Maggie's under two labels, from the
  gallbladder and pancreatic layers), `peripheral-neuropathy` (the Loprinzi ASCO guideline twice), `trial-protocol`
  (the ICH efficacy guidelines index as both E6 and E9), `palliative-care` (Temel 2010 three times and Marie Curie
  twice), `fertility-preservation`, `pembrolizumab` (TA914), `larotrectinib` (TA630), `entrectinib` (TA644),
  `ziv-aflibercept` and `tegafur-gimeracil-oteracil` (their EPARs) and the two duplicated paper records. Where two
  spikes had written the same URL under different labels the labels are aligned; where the colorectal spike added a URL
  the record already carried, the colorectal copy is removed.

## 3. NICE: every appraisal checked against its own page

Each of TA439, TA1136, TA1008, TA1079, TA1065, TA716, TA709, TA914, TA866, TA668, TA405, TA307, TA212, TA118, TA242,
TA630, TA644 and NG151 was fetched once and read (`/tmp/crc-qa/nice/`), and every NG151 recommendation number the repo
cites (1.1.1; 1.2.1, 1.2.2, 1.2.4, 1.2.6; 1.3.1 to 1.3.5 and 1.3.7 to 1.3.18; 1.4.1; 1.5.15 to 1.5.19, 1.5.21; 1.6.1 to
1.6.4) was checked against the recommendations chapter. **Every number exists** and the dates, titles and
recommendation wording agree with the repo in every case except these eleven, all now fixed:

| # | What was wrong | Fix |
| --- | --- | --- |
| 1 | TA644 (entrectinib) presented as current NICE-funded treatment in four places, though it is withdrawn: TA1118 replaced it and NICE terminated that on 7 January 2026 with no complete evidence submission, and NG151 removed the entrectinib link in the same month. The UK layer had it right, so the record contradicted itself. | All four places say withdrawn, with the TA1118 termination and its date. |
| 2 | TA630 (larotrectinib) described as routine commissioning in four places; NICE recommends it **within the Cancer Drugs Fund only**, under a managed access agreement, where there is no satisfactory treatment option. | All four say Cancer Drugs Fund, with the condition. |
| 3 | NG151 cited as "2020, updated 2025"; it was published 29 January 2020, last updated 15 December 2021 and last reviewed 29 April 2026. | Corrected. |
| 4 | TA866 said to be "eleven years after the FDA approval" of September 2012, and "a decade later" elsewhere in the same spike. | "A decade after". |
| 5 | TA212 and TA118 described as appraisals TA1136 "has now partly overtaken", and TA118 described as a bevacizumab-only appraisal. TA1136 updates and **replaces** TA212 and partially updates TA242 and TA118; TA118 covered bevacizumab and cetuximab; neither page now carries a recommendation. | Rewritten, with TA242 named for what it does say. |
| 6 | NG151 1.3.4 cited for the early rectal cancer treatment options; those are 1.3.3 (its table 1), and 1.3.4 is the radiotherapy prohibition alone. | Both numbers cited for what each says. |
| 7 | "NICE offers stenting for people being treated with palliative intent (1.3.1)"; 1.3.1 says **consider**. | "Asks teams to consider". |
| 8 | "NG151 offers ... open surgery (1.3.9), robotic surgery (1.3.10) and transanal total mesorectal excision (1.3.11)"; all three are **consider**. | Split from the 1.3.8 and 1.3.17 offers. |
| 9 | NG151 section 1.6 labelled "follow-up"; it is "ongoing care and support", of which follow-up is 1.6.1. | Corrected. |
| 10 | "Carcinoembryonic antigen is measured at baseline ... (NICE NG151 1.6.1)"; 1.6.1 covers follow-up only and says nothing about a baseline. | Rewritten to what 1.6.1 says. |
| 11 | "NG151 recommends cetuximab and panitumumab with FOLFOX or FOLFIRI for untreated RAS wild-type metastatic disease"; 1.5.3 restricts cetuximab to **EGFR-expressing** tumours, 1.5.4 does not restrict panitumumab. | Split, with both recommendation numbers. |

## 4. The four short standard-of-care rows, and what folding them did

The colorectal record carried 57 standard-of-care rows from five files: four one-liners in `src/data/cancers.ts`
(Screening; Stage II-III; Metastatic, MSS; Metastatic, dMMR), fourteen short ones in `src/data/spikes/colorectal.ts`,
five in `colorectal-core.ts` (diagnosis and staging, acute obstruction, prevention, follow-up, referral), 24 sourced
ones in `colorectal-treatment.ts` and ten patient-facing ones in `colorectal-living.ts`.

The first eighteen say what the 24 say, with no figure and no source. They are removed, and:

- Nothing keys on a colorectal setting label by string. `src/lib/sequencing.ts` (`lineOf`, `subgroupOf`),
  `src/lib/relevance-rows.ts` (`settingMatches`) and `src/lib/first-60-days.ts` (`settingRank`, `DIAGNOSIS`) all parse
  the label with regular expressions for line of therapy, biomarker subgroup and stage, and every one of those
  patterns still matches the longer labels, so the sequencing view, the relevance rows, the red cards and the first-60-
  days ordering are unchanged. That was checked before the removal, as the pancreatic review's rule 15 asks.
- The one thing that did quote the rows is the decision aid. `QUOTED_COLORECTAL_ROWS` in
  `src/data/decision-tools/colorectal-adjuvant-chemotherapy.ts` quoted "Stage I-II colon" and "Stage III colon, pMMR"
  word for word. It now quotes three treatment rows instead ("Stage I and low-risk stage II colon cancer", "High-risk
  stage II colon cancer", "Stage III colon cancer, mismatch-repair proficient"), which is what the three cards that
  used them are actually about, and `src/lib/decision-tools.test.ts` now checks the colorectal quotes against the data
  the way it already did for gallbladder, TNBC and pancreatic.
- The two refs that only the removed rows carried, the pairing `anti-egfr-left-sided` and the pairing
  `kras-plus-egfr-crc`, moved onto the treatment file's left-sided and KRAS G12C rows, so nothing lost an edge. Every
  other ref of the removed rows was already reachable from a surviving row or from the record's own arrays; that was
  checked programmatically.
- The NCCN Colorectal Cancer Screening guideline URL, which only the removed screening row carried, is now a link on
  the record. `src/lib/model-reviews.test.ts` requires the model panel to cite only the record's own sources and
  caught its loss, which is a useful accident: the guideline belongs on the record either way.

**39 rows render**: the 24 sourced rows, the five core rows (whose settings are diagnosis, obstruction, prevention,
follow-up and referral, none of which the 24 cover) and the ten living rows, which are the same decisions in the
second register the pancreatic record also keeps, written from NICE NG151, the NHS, Bowel Cancer UK and Macmillan
patient pages rather than from trials. The brief asked for 33, which is what 24 plus five plus four would be; folding
six of the ten living rows would reach it, but they are the patient-facing layer the pancreatic review deliberately
kept beside its fourteen sourced rows, and cutting them would lose the only plain-English account of the stoma, the
DPD test and the watch-and-wait commitment. Recorded here as a judgement rather than made silently.

## 5. The missing `ras-wild-type` biomarker

The molecular layer's own open problem said it: "there is no colorectal readout record for RAS wild-type itself, only
for the individual mutant alleles". The alias was parked on `kras-g12d`, whose `aka` carried "KRAS wild-type" and "RAS
wild-type" although the record is about the mutant alleles.

`src/data/biomarker-readouts-2.ts` now defines `ras-wild-type`, and `kras-g12d` gives up the two aliases. The
definition and both thresholds are quoted from the FDA list of authorised companion diagnostics, fetched once and
parsed: **KRAS and NRAS wild-type across exons 2, 3 and 4** for panitumumab ("KRAS wild-type (absence of mutations in
exons 2, 3, and 4) and NRAS wild type (absence of mutations in exons 2, 3, and 4)", FoundationOne CDx P170019, with xT
CDx P210011, the EntroGen CRCDx kit P220005 and MI Cancer Seek P240010 carrying the same wording), and **KRAS
wild-type at codons 12 and 13** for cetuximab (FoundationOne CDx P170019, therascreen KRAS RGQ PCR P110027/S013,
ONCO/Reveal Dx P200011, xT CDx P210011). Eight companion diagnostic rows are recorded with their PMA numbers and dates.
`definedBy` is the PRIME extended RAS analysis (Douillard, NEJM 2013), the trial that widened the definition: a further
17 percent of KRAS exon 2 wild-type patients carry another RAS mutation and do worse when panitumumab is added. The
record links `colorectal`, `colon-cancer`, `rectal-cancer`, `her2-amplified-colorectal` and `braf-v600e-colorectal`;
`cetuximab` and `panitumumab` and the drugs whose use turns on the result (encorafenib, tucatinib, trastuzumab,
sotorasib, adagrasib); and the trials that used it: PRIME, PARADIGM, CRYSTAL and FIRE-3, CALGB/SWOG 80405, OPUS,
CodeBreaK 300 and MOUNTAINEER. The molecular open problem is rewritten to the thing that is still wrong: the FDA list
carries the old codon 12 and 13 definition for cetuximab beside the extended one for panitumumab, so two laboratories
reporting "wild-type" are not making the same claim.

## 6. The devolved nations

The brief recorded the four nations' screening ages as missing because NHS inform 404d. On a second attempt NHS inform
answered 200; it simply carries no threshold. The ages were in fact already on the page and correct. What the retry
did find:

| | Screening age and interval | Screening FIT threshold | Symptomatic referral threshold |
| --- | --- | --- | --- |
| England | 50 to 74, two-yearly; extension from 60 completed 2025 | **120 µg Hb/g**, from the Br J Cancer 2022 modelling of the English pilot; no programme publication states it (nine GOV.UK and UK NSC pages read). National Cancer Plan commits to 80 by 2028 | 10 µg Hb/g (NICE NG12 1.3.2 and HTG690) |
| Scotland | 50 to 74, two-yearly, since before FIT in November 2017 | **Not published anywhere.** NHS inform, the Public Health Scotland April 2026 report, its key performance indicator workbook and its screening-standards pages carry no figure or glossary entry | 20 µg Hb/g (Scottish Referral Guidelines for Suspected Cancer 2025) |
| Wales | 50 to 74, two-yearly; 55 to 74 until October 2023, then 51, reaching 50 from October 2024 | 120 µg Hb/g since October 2023, down from 150, with a stated plan to reach 80 (Bowel Screening Wales annual report 2023-24) | **Could not be sourced.** Recorded as a gap rather than assumed to follow England |
| Northern Ireland | 60 to 74, two-yearly, unchanged since 2010 | **120 µg Hb/g** (new): the Northern Ireland Cancer Network's lower gastrointestinal referral pathway tells GPs a result sent without symptoms is processed only above 120 in that age band | **10 µg Hb/g** (new), set by NICaN rather than NICE, with a rule England does not have: two results below 10 two months apart still justify a red-flag referral where concern persists |

Three previously empty cells are filled, one assumption is withdrawn, and the two that remain empty now say what was
tried. The UK National Screening Committee's recommendation (screening from 50 across the UK, last reviewed August
2018) is added as the anchor for Northern Ireland's divergence, which is stronger than the charity page that carried
it. New gaps recorded: no Welsh symptomatic threshold could be sourced (the Wales Cancer Network document library has
been lost in a move between NHS Wales sites, six addresses tried); the Scottish Government's 2025 referral guideline
links twice to national qFIT guidance at `nhscfsd.co.uk` that answers 404, so the guidance its own rule depends on is
unreachable; and the Public Health Agency's page, besides the stale "60 to 71" text already noted, still calls the
guaiac faecal occult blood test the programme's primary test while a later section of the same page says the test has
changed to FIT. The NICaN pathway PDF needs a referer from the qFIT page or the host's firewall rejects the request;
the source label says so.

## 7. Backlinks, mobile, console, private data and budgets

- **Backlinks.** Every one of 86 pages the spike claims to link was fetched and its `href="/cancers/colorectal/"`
  counted. All but one carried between 1 and 30. Mount Vernon Cancer Centre carried none; a supplement in the UK layer
  gives it `cancers: ["colorectal", "rectal-cancer"]` and it now carries seven. Backlinks go through the spike
  `supplements` mechanism, never by editing the owning file.
- **Mobile audit.** `npx tsx scripts/mobile-audit.ts http://localhost:4321`: 35 checks passed.
- **Width at 390 px.** Twelve colorectal routes plus the roadmap, the decision aid and the new biomarker page all lay
  out at 390 (`scrollWidth` 390, `innerWidth` 390) except `/cancers/colorectal/uk/`, which grew the layout viewport to
  828 px. Three nowrap chips in `src/app/cancers/[id]/uk/page.tsx` did it, each holding text no gallbladder,
  pancreatic or TNBC page is long enough to expose: the trial site chips (the longest is 139 characters, "71 UK sites
  led by The Royal Marsden, including Guy's and St Thomas' ..."), the trial status chip ("Closed to recruitment 31
  December 2023; follow-up to December 2027") and the routes-to-diagnosis header, whose title and share pill sat in a
  non-wrapping flex row. All three now wrap (`whitespace-normal`, and `flex-wrap` with `min-w-0` on the header); the
  page measures 390 and the pancreatic, gallbladder and TNBC UK pages still measure 390.
- **Console.** Section 1. No duplicate-key errors and no exceptions at either width after the link de-duplication;
  only the pre-existing dev-mode hydration attribute message.
- **Screenshots** (`/tmp/crc-qa/shot-*.png`): the hub and the new biomarker page at 1440 and the UK page at 390 read
  correctly; nothing is clipped or overlapping.
- **Private data.** Grep of the seventeen spike files, the sponsor file and the decision aid for individual dates,
  personal names, ages and allele fractions: of 1,306 ISO dates, 1,099 are ClinicalTrials.gov start and completion
  dates in the registry file and 191 are NICE, SMC, audit, registry and page-read dates in the UK file; every "aged"
  phrase is a trial eligibility range, a screening programme age band or a NICE referral threshold; the only personal
  names are published authors and UK clinicians with public professional pages (Kerr, Maughan, Seymour, Morton,
  Sebag-Montefiore, Burn, Starling, Chau); the phone numbers are the screening helplines and charity lines. No case
  descriptions, ages of individuals, variant allele fractions or references to the private repositories. Nothing
  removed.
- **Budgets.** `src/lib/record-sections.test.ts` measures markup inside the layout with `renderToStaticMarkup` against
  `HUB_BUDGET_KB` 350 and `SUBPAGE_BUDGET_KB` 600. Colorectal is now in that test's `HEAVY` list beside gallbladder,
  TNBC, NSCLC and pancreatic, so the budgets are enforced rather than measured once: hub **239 KB**; Finding it 131,
  Treating it 226, Evidence 249, The science 154, Where you are 130, Living with it 154, What is coming 296, Data
  **362** (the largest, and 238 KB under its budget). `src/app/record-fold.test.ts` passes.

## 8. Gates

`npm run validate` (18,160 entities OK), `npm run typecheck`, `npm run lint` (0 errors; 5 pre-existing warnings) and
`npx vitest run --testTimeout=600000` pass on the committed state, except the two tests that were already red on `main`
and belong to another agent: the PD-1 dossier markup budget in `src/app/heavy-pages.test.ts` and the citations coverage
floor in `src/lib/citations.test.ts` (which needs `npm run fetch:citations`). No floor was moved; two gates were
tightened (the colorectal decision-aid row quotes, and colorectal in the section-budget list).

## Open gaps

- Twenty-three colorectal spike papers share a DOI with a paper record the corpus already held (BEACON, CAPP2,
  CHALLENGE, DYNAMIC, CodeBreaK 300, TCGA, DESTINY-CRC01, HERACLES, NordICC, FRESCO-2, GALAXY, Vogelstein 1988,
  KEYNOTE-177, Le 2015 and 2017, MOUNTAINEER, Imperiale 2014, PRODIGE 23, CheckMate 8HW, OPRA, MOSAIC, PRIME, RAPIDO,
  SUNLIGHT, Tauriello 2018), and five more exist twice inside the spike under two ids from the molecular and evidence
  layers (Tie 2016, TCGA 2012, HERACLES, Vogelstein 1988, PRIME). The two exact id collisions are fixed; retiring the
  rest needs the redirect policy for `key-papers` ids that the TNBC and pancreatic reviews also asked for.
- `public/reviews/models/colorectal.json` (the model panel) was written before the spike and renders in the aside of
  every colorectal page. It says the record "says nothing about established risk factors", which the core layer now
  covers at length, and it queries claims that now carry sources. It needs re-running with the owner's key.
- Cancer Research UK has no Bowelbabe Fund page that could be found; the charity entry links the donate page instead.
- Two NHS trust home pages (Barts Health, Nottingham University Hospitals) could not be reached from this network at
  all and are neither confirmed live nor dead.
- The shared country table on `/cancers/colorectal/where-you-are/` shows GLOBOCAN 2022 (UK 49,429 cases and 22,868
  deaths) while the prose quotes the UK registries (48,213 and about 17,700). Both are right for their source, but a
  reader moving between the two pages sees two UK death counts; the table is a shared component and would need a source
  note rather than a colorectal edit.
- "paradigm" is in the auto-link stop list, so PARADIGM, a first-line colorectal trial, never links from prose. The
  stop list is a blunt instrument and a per-kind exception would serve both cases.
- Registry-only trial records (`colorectal-registry-trials.ts`, 661) carry generated one-line summaries, as in the
  gallbladder, TNBC and pancreatic spikes.
- The hub is 239 KB, well inside its budget, but the Overview is still a long summary from two files. An editorial pass
  could move the epidemiology detail into the FAQ notes.

## Repeating this review for the next deep spike

Follow the lists at the end of `docs/GALLBLADDER-QA.md`, `docs/TNBC-QA.md` and `docs/PANCREATIC-QA.md`, and add:
(17) when two layers disagree about whether a figure has a source, check the source before deleting the figure: here
the layer that said "no readable source carries it" was wrong and the layer quoting 120 was right, and the peer-reviewed
modelling paper was the source neither had named as such; (18) write a per-file attribution dump of every merged array
(`standardOfCare`, `history`, `openProblems`, `biomarkers`, `stateOfArt`) before reading the pages, because the merged
list hides which of six files wrote each line and that is the only way to fold cleanly; (19) check whether a regulator
has **withdrawn** an appraisal, not only whether it exists: TA644 answers 200 and looks current until you read it;
(20) run a min-content probe over the cards of the UK page specifically, because that page's data is the longest text
in the corpus and one chip is enough to widen the layout viewport; (21) grep the auto-link stop list for the spike's
trial acronyms that are ordinary English words, because they link readers to a different cancer; (22) after deleting a
standard-of-care row, run `src/lib/model-reviews.test.ts`, which catches sources the record loses with it.
