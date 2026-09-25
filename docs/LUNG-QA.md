# Lung cancer deep spike: review checklist and results (25 September 2026)

Six agents built the lung cancer deep spike in parallel (`src/data/spikes/lung-core.ts`, `lung-treatment.ts` with
`lung-treatment-trials*.ts`, `lung-registry-trials.ts` and `lung-trial-sponsors.ts`, `lung-uk.ts`, `lung-molecular.ts`,
`lung-evidence.ts` with `lung-evidence-papers-*.ts` and `lung-evidence-roadmap.ts`, `lung-living.ts`, plus
`src/data/decision-tools/lung-early-stage.ts` and `src/data/lung-molecular.test.ts`), on top of the older
`spikes/nsclc.ts` and `spikes/sclc.ts` and the `lung-cancer` parent record in `cancer-parents-wave2.ts`. This is the
review that ran afterwards, following `docs/GALLBLADDER-QA.md`, `docs/TNBC-QA.md`, `docs/PANCREATIC-QA.md` and
`docs/COLORECTAL-QA.md` step for step, including the numbered lists at the end of each. Commands assume a dev server on
a free port above 4000 (`npx next dev -p 4213`) and Chrome at the usual macOS path. Working files are under
`/tmp/lung-qa` (the URL extractor and checker with its cache, the merged-record dump with its per-file attribution, the
duplicate id, DOI and NCT finders, the NICE pages and the NG122 chapters, the CDP console, width and duplicate-key
probes, the fetched dev pages, and the edit scripts that made the bulk changes).

One note on the environment: the worktree had no `node_modules` of its own and Turbopack refuses a symlink that leaves
the project root, so the dev server only starts after a copy-on-write clone (`cp -Rc`) of the repository's
`node_modules` into the worktree. That is four seconds on APFS and is worth doing first.

## 1. Read every page end to end (1440 and 390 px)

Pages: `/cancers/lung-cancer/` and its nine section and sibling pages (`treating-it`, `evidence`, `science`,
`where-you-are`, `living-with-it`, `coming`, `data`, `decisions`, `changes`; Overview, What it is and **Finding it** are
inline on the hub), `/cancers/lung-cancer/uk/` and `/cancers/nsclc/uk/`, `/cancers/nsclc/`, `/cancers/sclc/`,
`/cancers/lung-lcnec/`, the ten wave 4 histology pages, the ten molecular and four stage pages in `lung-subtypes.ts`,
`/tools/lung-early-stage/`, `/first-60-days/lung-cancer/`, `/roadmaps/lung-cancer-evidence-roadmap/` and the roadmap's
rewritten idea page (44 pages fetched and read as text, 465 fetched for the backlink count; the roadmap's other six
ideas were read in the source).

`/cancers/lung-cancer/finding-it/` answers 500 on the dev server and is **not a bug**: the section's weight estimate
keeps it inline on the hub, `generateStaticParams` therefore does not emit it, and `dynamicParams = false` makes any
other address an error in dev and a 404 in the export. The hub carries `id="sec-finding-it"` in full.

| Check | Result | Change |
| --- | --- | --- |
| Sections or sentences that say the same thing twice | **Standard of care: 40 rows on `lung-cancer`, 21 on `nsclc`, 12 on `sclc`.** Three one-line settings on `lung-cancer` (Screening; Diagnosis and staging; Treatment), five on `nsclc` (Screening; Early stage; Stage III unresectable; Metastatic, driver-positive; Metastatic, driver-negative) and three on `sclc` (Limited stage; Extensive stage; Relapsed) came from the base records in `cancers.ts` and `cancer-parents-wave2.ts` and said, without a figure or a source, what the 26 sourced rows in `lung-treatment.ts`, the 16 in `spikes/nsclc.ts` and the 9 in `spikes/sclc.ts` say at length. On `nsclc` the label "Stage III unresectable" rendered twice. **History: 29 entries on `lung-cancer`, 33 on `nsclc`, 20 on `sclc`.** Twelve base entries repeated an entry a spike file had written in full: 1950 (Doll and Hill) and 2011 (NLST) on `lung-cancer`, base against `lung-core.ts`; 2004 (EGFR mutations), 2007 (EML4-ALK), 2011 (NLST), 2015 (nivolumab against docetaxel), 2021 (sotorasib) and 2025 (first MET ADC) on `nsclc`, base against `spikes/nsclc.ts`; 2018 (IMpower133), 2019 (rovalpituzumab tesirine) and 2024 (tarlatamab) on `sclc`, base against `spikes/sclc.ts`. **Open problems: 14, 23 and 11.** The four one-line problems on `lung-cancer`, the three on `nsclc` and the three on `sclc` were each restated at length, with sources, by the spike layers. **Papers: three exist twice inside the spike**, one DOI under two ids: George 2015 (`paper-george-small-cell-lung-cancer-genomes-nature-2015` in `lung-molecular.ts` against `paper-george-sclc-genomic-profiles-nature-2015` in `lung-evidence-papers-immunotherapy.ts`), Zhang 2021 (Sherlock-Lung) and IMpower110 (Herbst 2020). **Links: two URLs were on `lung-cancer` twice**, the NHS symptoms page and the NG122 diagnosis chapter, under a long label from `lung-core.ts` and a short one from `lung-living.ts`. | The eleven base one-line settings, the twelve duplicated base history entries and the ten one-line open problems are removed from `cancers.ts` and `cancer-parents-wave2.ts`, each with a comment naming the file that now owns them; every record they referenced was checked to be still reachable before the removal, and the two NCCN guidelines and the ESMO-MCBS analysis of antibody-drug conjugates that only they cited are now links on the `nsclc` and `sclc` records. The three duplicated molecular paper records became `sup<PaperInput>` supplements carrying only what the layer adds (the cBioPortal cohort and the landscape edges), and the molecular `SRC` map points at the evidence ids. The living file's two duplicate links are removed. Result: **37, 16 and 9 settings, 27, 27 and 16 history entries, 10, 20 and 8 open problems, and no duplicate link URL on any of the four records**. |
| Contradictory figures | **The small-cell share.** The hub's summary line said "small-cell (about 15 percent)" while the UK page, two clicks away, said small-cell disease was 6.6 percent of English cases in 2024 and 9.1 percent of Welsh ones (National Lung Cancer Audit, State of the Nation 2026), down from 8.6 percent in 2019. **Never-smokers.** The evidence layer's screening open problem said never-smokers are "now about one lung cancer in five" with no source, against the core layer's sourced "fifteen percent of UK lung cancers, and 15 to 25 percent worldwide". **European screening.** The base record's state-of-the-art line said CT screening "is now recommended in the US, UK and much of Europe", against the core layer's open problem that of the ten European countries surveyed in 2026 only three had a formal programme. **The platinum-etoposide year.** `cancers.ts` dated it 1980 and `spikes/sclc.ts` 1985, on the same page. Everything else agrees: NLST 53,454 participants and a 20 percent mortality reduction and NELSON 15,789 (13,195 men and 2,594 women) and 24 percent agree between `lung-core.ts` and `lung-treatment.ts`; 50,200 UK cases and 32,800 UK deaths agree across `lung-core.ts` and `lung-uk.ts` and match the UK page's own table (50,218 and 32,800); 72 percent of UK cases attributable to tobacco and 85 percent non-small-cell are used consistently. | The hub's summary line now quotes the audit with its cohort; the evidence open problem drops the never-smoker clause the core layer owns and keeps the pack-year finding with its source (Aldrich 2019); the state-of-the-art line says the United States and, since June 2022, the four UK nations, and that Europe is still mostly not a programme; the 1980 entry goes with the rest of the base history, leaving 1985. |
| Orphaned references | **A rendered placeholder.** `idea-lung-uk-screening-testing-and-access-gaps` in `lung-evidence-roadmap.ts` had "A placeholder for the United Kingdom-specific gaps" as its `tldr` (and therefore as its meta description, its Open Graph description and its JSON-LD), "To be written from the gaps the United Kingdom and NHS page for lung cancer names" as its hypothesis and test, and the word "placeholder" twice more in its rationale. The UK page now exists and names fifteen gaps of its own. Comments naming "agent A" and "agent B" in `lung-living.ts` and `lung-treatment.ts` (twice). No "see below", "the rows above" or source-code path renders on any lung page. | The idea is rewritten from four of the UK page's own gaps and renamed "Publish the four numbers the NHS lung cancer pathway does not currently measure": the absent reflex testing rate (one hit for EGFR, ALK, ROS1, PD-L1, molecular, genomic and biomarker in the whole 2026 audit report), the absent genomic turnaround (the Test Directory has no turnaround column and NHS England says waiting-time data is planned for a future publication), the thoracic surgery centres no NHS England document names (service specification 170016/S says 29 units and lists none, last refreshed July 2017), and the missing lung-specific waiting time in Wales and Northern Ireland. Its hypothesis, rationale and test are written from those four. The comments name files, not agents. |
| Sentences reading as prognosis advice | None. No second-person survival statement exists on any lung page. The `prognosis` field of `lung-cancer` and `nsclc` opens "Population averages ... not a personal prognosis" and does not render while `SHOW_OUTLOOK` is false in `src/components/CancerRecord.tsx`; `sclc` has no `prognosis`. Every survival figure on a rendered page carries its source and its cohort. | None. |
| Smoking and stigma | The living layer's rule holds across all six layers, which is the point of this pass. Stopping smoking appears as a treatment recommendation with a named benefit and is paired with the NG122 rule every time: `lung-living.ts` quotes 1.3.1, 1.3.2 and 1.3.3 in the newly-diagnosed question, the early-stage question, the carer question and the glossary term; `lung-uk.ts` states the pathway standard as "do not postpone surgery to allow someone to stop"; `lung-early-stage.ts` quotes 1.3.2 and 1.3.3 verbatim and adds "Stopping smoking is offered because it lowers the chance of lung complications after an operation, and support to do it should be offered with that reason attached". All three NG122 numbers were checked against the guideline's own Management chapter and are exact. Never-smokers are addressed directly, not as an exception: a glossary term of their own, an open problem on both `lung-cancer` and `nsclc`, two FAQ answers written in the second person, and the Sherlock-Lung and Million Women papers behind the figures. The 359 trial records were read for eligibility text: the only smoking sentences in them are a tobacco-treatment trial's own intervention and outcome names. No instance of "heavy smoker", "failed to quit", "still smoking", "self-inflicted" or "unwilling" exists in any lung file. `lung-uk.ts` records the stigma literature directly (Chapple, Ziebland and McPherson, BMJ 2004) and the Roy Castle campaign that lung cancer is still seen as self-inflicted. | None. |
| US spellings, em-dashes | Zero em-dashes, en-dashes, figure dashes and minus signs in the seventeen spike files and the decision aid, and none on any rendered page. US spellings occur only in quoted registry and paper titles (`randomized` 134, `tumor` 56 and `tumors` 50 in the registry file), in proper names (M.D. Anderson Cancer Center, World Health Organization, VU University Medical Center, the GIRFT "national specialty report"), in bottleneck ids (`b-tumor-heterogeneity`) and in field names (`programs`). One prose instance of `tumorigenesis`, which is standard in both spellings and which the colorectal review also left. | None. |
| React console errors | **Three duplicate-key errors on the hub and two on each of five section pages, and nine on the UK page.** The hub's were the two duplicated link URLs and the key `nsclc`: `preview()` in `src/components/CancerRecord.tsx` builds the Treating it summary card from `c.standardOfCare.flatMap((s) => s.refs)` with no de-duplication, and the base record's Diagnosis-and-staging and Treatment rows both referenced `nsclc`, so `ChipList`, which keys by id, saw it twice. The UK page's nine were five figure labels recorded for more than one nation or period ("New cases a year", "Deaths a year", "Net survival by stage", "Incidence gradient by deprivation", "Mortality gradient by deprivation"), keyed by label alone in `src/app/cancers/[id]/uk/page.tsx`. Both are general bugs that the lung data happened to expose. | `preview()` de-duplicates by id; the UK figure cards key on label, nation and period. Re-checked at 390 and 1440 px on thirteen lung routes: no duplicate-key errors and no exceptions. The only message left is the dev-mode hydration attribute mismatch on chip `lang` attributes that the TNBC, pancreatic and colorectal reviews also recorded, and which is not from the spike. |

## 2. Cited URLs

A walker over the ten spike modules and the decision aid (after template expansion, plus `doi` and `pmid` fields)
produced **804 distinct URLs**, checked once each with a browser user agent, following redirects manually, cached in
`/tmp/lung-qa/url-cache.json`.

- **688 returned 200.**
- **114 returned 403 to a script**, all bot-blocking publishers reached through `doi.org`, across twelve hosts: NEJM
  (40), Europe PMC article pages (22), JAMA Network (15), ASCO Publications (12), AACR (10), Science (5), Wiley (3),
  BMJ and Thorax (5 between them), Oxford Academic, BMJ Open Respiratory Research and the European Respiratory Society
  (1 each). The Europe PMC REST API answers for all of them, which is how the metadata was read in the first place.
- **1 returned 405**: `doi.org/10.3310/hta20400` resolves correctly to the NIHR Journals Library page for the UKLS
  health technology assessment, which refuses a scripted GET. Kept.
- **1 dead (404), fixed**: the Sherlock-Lung page on the NCI's Division of Cancer Epidemiology and Genetics site moved
  from `/research/what-we-study/sherlock-lung` to `/research/cancer-types/lung/sherlock-lung-study`.
- **9 redirects rewritten to their final address**: Roy Castle Lung Cancer Foundation dropped its `www` and moved its
  support tree, so `/get-help-support/telephone-support/`, `/get-help-support/face-to-face-support/` and
  `/get-help-support/useful-contacts-and-support-organisations/` are now `/our-support/...` and `/this-is-lung-cancer/`
  is now `/about-us/campaigns/this-is-lung-cancer/`.
- **1 link corrected rather than redirected**: the J-ALEX record address at the Japan Pharmaceutical Information
  Center, a `ShowDirect.jsp` query on `clinicaltrials.jp` naming the trial's Japic registration, now redirects to the
  registry home page, so that record page no longer exists. The label says so, and the link points at the registry.
- ISRCTN's six record pages answer 200 with the `/holding` cookie challenge, as in every previous review; the UK layer
  reads them through the ISRCTN API and says so in its gaps.

## 3. NICE: every appraisal and guideline checked against its own page

The lung files cite **90 NICE identifiers** (NG12, NG59, NG122, NG209, NG234, QS17 and 84 technology appraisals).
Every one was fetched and read (`/tmp/lung-qa/nice/`). **All 90 exist**, and:

- **Every publication date is right.** 54 prose date claims of the form "TA1091 ... 20 August 2025" and 99 structured
  `date:` fields were compared against the dates on the pages themselves. Not one disagreed. NICE numbering is the
  usual error in these reviews and it is not an error here.
- **Every title matches.** Eighty labels in `lung-uk.ts` were compared word by word against the NICE page titles; the
  only differences are the repo writing ALK for "anaplastic lymphoma kinase", EGFR for "epidermal growth factor
  receptor" and "before surgery then alone after surgery" for "neoadjuvant ... adjuvant".
- **Terminated and withdrawn appraisals are labelled as such**, which is the colorectal review's rule 19: sixteen
  terminated appraisals (TA1118, TA1076, TA1072, TA1058, TA1047, TA976, TA884, TA848, TA662, TA635, TA618, TA444,
  TA438, TA436, TA362, TA148) and one withdrawal (TA855, mobocertinib) are named with their reasons, and each of those
  pages does carry the "(terminated appraisal)" title.
- **Every NG122 recommendation number the repo cites exists.** The six recommendation chapters were fetched and
  parsed; 83 distinct numbers are cited across `lung-core.ts`, `lung-uk.ts`, `lung-living.ts`, `lung-treatment.ts` and
  the decision aid, and all 83 are on the pages. The one apparent miss, 1.1.6, is NG12's mesothelioma referral
  recommendation, checked separately against the NG12 site-by-site chapter.
- **The three stop-smoking recommendations are quoted exactly.** NG122 1.3.1 "Inform people that smoking increases the
  risk of pulmonary complications after lung cancer surgery", 1.3.2 "Advise people to stop smoking as soon as the
  diagnosis of lung cancer is suspected and tell them why this is important", 1.3.3 "Do not postpone surgery for lung
  cancer to allow people to stop smoking".
- **The brain imaging thresholds are right**: NG122 1.2.24 does not offer dedicated brain imaging in clinical stage 1
  without neurological symptoms, 1.2.25 offers contrast-enhanced CT in stage 2, 1.2.26 offers MRI in stage 3.

## 4. TNM 9, and the one place an older edition is still in use

The core layer's account of the ninth edition is right and is stated once, in the glossary term
`tnm-9-lung-cancer`, with the IASLC papers behind each part: in force 1 January 2025; T unchanged from the eighth
edition; N2 split into N2a (a single ipsilateral mediastinal or subcarinal station) and N2b (multiple stations); M1c
split into M1c1 and M1c2; the stage groups rebuilt to follow (T1N1 to IIA, T1N2a to IIB, T3N2a to IIIA, T2aN2b and
T2bN2b to IIIB).

The NG122 mismatch is real and was verified on the NICE page, which says in three chapters that "the guideline
recommendations were developed using the 7th edition of the American Joint Committee on Cancer (AJCC) staging system".
It is stated **four** times across the corpus, not six, and each time for a different reader: once in the hub's own
prose, once as an open problem on `nsclc`, once in the glossary term, and once in the UK page's diagnostic row where it
changes what a reader should expect of the brain-imaging rule. That is not repetition to fold.

What was missing is the **other** edition problem: the treatment layer's 26 standard-of-care rows use stage-group
labels ("Resected stage II to IIIA", "Resectable stage II to IIIB") with no edition named anywhere, although the same
words mean different patients either side of January 2025. The registry records quote the edition their trials used and
they are not all the same: 8th edition for most, 9th for studies opening since 2025, 7th for the older adjuvant
studies. The glossary term now says so, in the one place the whole record points at for staging.

## 5. Taxonomy

Five tiers, exactly as the spike intended, checked against the graph rather than the files:

```
lung-cancer (Lung cancer (all types))
  nsclc         → 10 molecular subsets, 2 stage subsets, 10 wave 4 histologies
  sclc          → limited-stage-sclc, extensive-stage-sclc
  lung-lcnec
```

- The spike created **one** new cancer record, `lung-lcnec`, parented to `lung-cancer`. Nothing else.
- No cancer record was added for a mutation. The ten molecular pages (`egfr-mutant-nsclc`, `alk-positive-nsclc` and
  the rest) predate this spike; they live in `src/data/lung-subtypes.ts` and were last touched by the cooperative-group
  pass, not by any lung layer. The spike's own molecular work is in `biomarker` records and target prevalence rows.
- Mesothelioma stays outside the family: `parent` unset, `group: "thoracic"`, named as a neighbour on the lung-cancer
  record and in the TNM 9 term, never as a subtype. `lung-net`, `extrapulmonary-nec` and `pleuropulmonary-blastoma`
  correctly sit under `neuroendocrine` and `childhood-cancers`.
- The UK pathway hangs off `lung-cancer` with `nsclc`, `sclc` and the molecular and stage subtypes as aliases, so
  `/cancers/lung-cancer/uk/` and `/cancers/nsclc/uk/` render the same page (206,235 and 206,238 characters of extracted text).
  `src/lib/uk-pathway.test.ts` asserts it.

## 6. The PENDING markers, and the papers that exist twice

- **`PENDING_TRIALS` and `PENDING_TERMS`** in `lung-evidence-shared.ts` were stale, which is worse than being long:
  they told the next reader that 26 trials and 24 terms had no record when seven of each had since been written and
  were already referenced by id (`profile-1014`, `impower110`, `checkmate-017`, `checkmate-057` and `keynote-010` in
  `lung-treatment-trials-advanced.ts`, `lace-pooled-analysis` in `lung-treatment.ts`, `tracerx` in `lung-uk.ts`;
  `pack-year`, `low-dose-ct-screening`, `met-exon-14-skipping`, `alk-fusion`, `chromosomal-instability`,
  `consolidation-therapy` and `smoking-cessation`). Both lists are now what is actually still missing, 19 trials and
  17 terms, with the ones that landed named in the comment. **No reference dangles**: `npm run validate` resolves every
  id in the corpus, so the orphan count for this spike is zero.
- **Fifteen lung papers exist twice in the corpus**, one DOI under two ids, always a full record written by the spike
  against a record the corpus already held: IPASS, MARIPOSA, LAURA, ALEX, CROWN, ALINA, GEOMETRY-mono-1, CodeBreaK 200,
  Sequist 2011, TRACERx 100, IMpower010, AEGEAN, CASPIAN, ADRIATIC and DeLLphi-301, which is fifteen pairs after the
  three within-spike duplicates were merged. Nine of the older records are thin registry or citation ingests
  (`paper-mok-n-engl-j-med`, `paper-sequist-sci-transl-med`, `paper-nct02486718-lancet-2021`,
  `paper-nct03800134-n-engl-j-med-2023`, `paper-laura-n-engl-j-med-2024`, `paper-alex-n-engl-j-med-2017`,
  `paper-alina-n-engl-j-med-2024`, `paper-caspian-lancet-2019` and `paper-geometry-mono-1-capmatinib-nejm-2020`) and
  six are curated key papers. Retiring either side needed the
  redirect policy for `key-papers` ids that the TNBC and colorectal reviews also asked for; that policy landed on
  25 September 2026 (`docs/DUPLICATE-RECORDS.md`) and all fifteen are now merged.
- **Four pairs of trial records share a registry id**, the four the spike found outside lung. Two are legitimate and
  now say so: `roar` and `roar-atc` are the biliary and anaplastic thyroid cohorts of one basket trial, and `i-spy-2-2`
  runs under the `i-spy-2` registration, which its own summary states. Two are genuine duplicates of a curated record
  and a registry ingest: `keynote-158` with `nct02628067`, and `impactmf` with `nct04576156`. Merging them meant
  deleting an id that `trial-registry-outcomes.ts` and the simple-English files key on, so at the time each record
  linked the other, and `src/lib/corpus-rules.test.ts` gained a ratchet: **no two trial records may share a registry
  id except these four, each with its reason**. A new pair now fails the build. Both duplicate pairs were merged on
  25 September 2026, keys and all (`docs/DUPLICATE-RECORDS.md`), and the ratchet is down to the two legitimate pairs.

## 7. Backlinks, mobile, console, private data and budgets

- **Backlinks.** Every one of the 465 pages the spike names or supplements was fetched and its links to
  `/cancers/lung-cancer/`, `/cancers/nsclc/`, `/cancers/sclc/` and `/cancers/lung-lcnec/` counted. Every institution,
  person, biomarker, target, technology and term carries at least one: the twelve UK institutions the UK layer names or supplements run
  from 4 (Francis Crick, Royal Marsden, UCLH) to 20 (Roy Castle, Royal Papworth) and the seven UK clinicians from 15 to 20. The only
  zero-count pages are three records that claim no lung cancer at all (`imrt-igrt`, which `spikes/sclc.ts` references
  from two history entries without ever giving it a `cancers` array, and the ctDNA and targeted-therapy roadmaps).
- **Mobile audit.** `npx tsx scripts/mobile-audit.ts http://localhost:4213`: 35 checks passed.
- **Width at 390 px.** Thirteen lung routes plus the decision aid, the first-60-days page, the roadmap and the rewritten
  idea page all lay out at 390 (`scrollWidth` 390, `innerWidth` 390), including the UK page, which the colorectal
  review had to fix for its own data. The chip-wrapping fixes that review made hold for the longer lung site lists.
- **Console.** Section 1: clean of duplicate keys and exceptions after the two component fixes.
- **Private data.** The seventeen spike files and the decision aid were scanned for individual dates, personal names, ages
  and allele fractions. Of 826 ISO dates, 511 are ClinicalTrials.gov start and completion dates in the registry file
  and 298 are NICE, SMC, audit, screening-programme and page-read dates in the UK file; the other 17 are one or two
  read dates each in the remaining files. All 60 "aged" phrases are trial
  eligibility bands, screening age bands or published cohort statistics. The three allele-fraction mentions are
  published cohort findings and an assay sensitivity threshold from the CAP/IASLC/AMP guideline, not an individual's
  result. The only personal names are published authors and eleven UK clinicians and researchers with public
  professional pages. No case descriptions, no ages of individuals, no reference to the private repositories. Nothing
  removed.
- **Budgets.** `src/lib/record-sections.test.ts` measures markup inside the layout with `renderToStaticMarkup` against
  `HUB_BUDGET_KB` 350 and `SUBPAGE_BUDGET_KB` 600. **`lung-cancer` is now in that test's `HEAVY` list** beside
  gallbladder, TNBC, NSCLC, pancreatic and colorectal, so its budgets are enforced rather than measured once.

| Page | KB | | Page | KB |
| --- | --- | --- | --- | --- |
| `/cancers/lung-cancer/` (hub) | 160 | | `/cancers/nsclc/` (hub) | 231 |
| `/cancers/lung-cancer/treating-it/` | 182 | | `/cancers/nsclc/coming/` | 322 |
| `/cancers/lung-cancer/evidence/` | 127 | | `/cancers/nsclc/data/` | 277 |
| `/cancers/lung-cancer/science/` | 77 | | `/cancers/sclc/` (hub) | 199 |
| `/cancers/lung-cancer/where-you-are/` | 112 | | `/cancers/sclc/data/` | 179 |
| `/cancers/lung-cancer/living-with-it/` | 146 | | `/cancers/lung-lcnec/` (hub) | 110 |
| `/cancers/lung-cancer/coming/` | 149 | | `/cancers/lung-cancer/uk/` | 440 |
| `/cancers/lung-cancer/data/` | 188 | | `/cancers/lung-cancer/decisions/` | 910 |

The UK page and the decisions page have no budget of their own in any test; the decisions page, at 910 KB of markup
for 37 settings, is the largest page this spike produces and is recorded as a gap below.

## 8. Gates

`npm run -s validate` (18,657 entities OK), `npm run -s typecheck`, `npm run -s lint` (0 errors; the same 5
pre-existing warnings) and `npx vitest run --testTimeout=600000 --hookTimeout=600000` (162 files, 1,740 tests) pass on
the committed state; the same four passed on `main` before the review, so nothing here is inherited.

Two gates were tightened and none loosened: the duplicate registry-id ratchet in `src/lib/corpus-rules.test.ts`, and
`lung-cancer` in the section-budget list. One floor was **not** moved: `src/lib/ask.test.ts` measures extractive
retrieval recall at **0.422** against the 0.42 floor after this review, down from 0.4243 before it, because removing
eighteen duplicated lines and three duplicate paper records removes lexical matches. The measurement is recorded in the
file's table beside the two the spike agents took, as the convention asks.

`src/lib/model-reviews.test.ts` did the job the colorectal review predicted for it (rule 22): removing the `nsclc`
metastatic one-liner took with it the only citation of the BMJ Open 2024 ESMO-MCBS analysis of antibody-drug
conjugates, which the model panel quotes. It is now a link on the record, under its own title rather than mislabelled
as the NCCN guideline, which is what the panel had complained about.

## Open gaps

- ~~Fifteen lung papers share a DOI with a record the corpus already held (section 6)~~ **Closed 25 September 2026.**
  All fifteen were merged, along with 65 more the corpus-wide survey found outside lung. The redirect policy this gap
  asked for is `docs/DUPLICATE-RECORDS.md`, and `scripts/merge-records.ts` does the merge.
- ~~`keynote-158` with `nct02628067` and `impactmf` with `nct04576156`~~ **Closed 25 September 2026.** Both were
  merged; the keys in `trial-registry-outcomes.ts`, the simple-English files and the translations moved with them, and
  the registry-id ratchet is down to the two legitimate pairs.
- `public/reviews/models/nsclc.json` predates this review. Its verdict that the metastatic driver-positive row cited a
  PubMed Central article under an NCCN label is now moot because the row is gone, and the panel needs re-running with
  the owner's key.
- `/cancers/lung-cancer/decisions/` is 910 KB of markup, larger than any budgeted page in the corpus, and no test
  watches it. The same is true of every cancer's decisions page; lung is simply the first one large enough to notice.
- The living layer's nine patient-facing settings and the treatment layer's 26 clinical ones both render on
  `/cancers/lung-cancer/treating-it/`, and four pairs cover the same decision for two audiences (early-stage surgery
  against radiotherapy; unresectable stage III; immunotherapy by PD-L1 score; brain metastases). They are kept
  deliberately: the living rows are written to be read by a patient and carry NG122 numbers, the treatment rows carry
  the trial figures. A reader moving down the page still meets the same decision twice.
- `imrt-igrt` is referenced twice from the small-cell history but has no `cancers` array at all, so it never links back
  to any lung page. It belongs to `spikes/sclc.ts`, not to this spike, and was left alone.
- The UK layer's own fifteen gaps stand, and four of them are now the substance of the roadmap's delivery idea. The
  largest is still that no published figure says what share of English lung cancer patients receive the molecular
  testing NG122 requires.
- The dev-mode hydration attribute mismatch on chip `lang` attributes fires on lung pages as it does on the
  gallbladder, TNBC, pancreatic and colorectal ones. It is not from the spike and is still unexplained.

## Repeating this review for the next deep spike

Follow the lists at the end of `docs/GALLBLADDER-QA.md`, `docs/TNBC-QA.md`, `docs/PANCREATIC-QA.md` and
`docs/COLORECTAL-QA.md`, and add:

23. **Read the duplicate-key console errors as a data bug before reading them as a component bug.** Both of this
    spike's were: one row's refs repeated an id, five figures shared a label. The component fix is right in both cases,
    but the error named the offending value and that value came from the corpus.
24. **Check the base records of every cancer the spike touches, not only the one it patches.** The lung spike patches
    `lung-cancer`; the duplicated history, open problems and standard-of-care rows were on `nsclc` and `sclc`, which it
    only re-parented.
25. **Before deleting a row, match it by its `approach` text, not by its `setting` label.** Two files wrote a row
    called "Stage III unresectable" and a label-based reachability check wrongly reported that deleting the base row
    would orphan `imrt-igrt` and `proton-therapy`, which the surviving row carries.
26. **Re-check the `PENDING_` lists against the corpus rather than trusting them.** Fourteen of the fifty ids on them
    had records by the time the merge finished, and a stale list is read by the next agent as a to-do.
27. **Two layers can mint two ids for one paper even when one of them has a "do not duplicate" list.** The lung
    molecular layer kept a careful "already in the corpus" section and still wrote three full records the evidence
    layer had also written; check by DOI across the whole spike, not against the list.
28. **Ratchet what you cannot fix.** The four shared registry ids could not all be merged safely, so the test now
    allows exactly those four, with a reason each, and fails on a fifth.
29. **A spike is not finished with its own files.** The three worst findings here (a rendered placeholder idea, a
    figure contradicted two clicks away, and eleven duplicated base lines) were all at the seams between a layer and
    something it did not own.
