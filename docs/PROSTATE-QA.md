# Prostate cancer deep spike: review checklist and results (25 September 2026)

Seven agents built the prostate cancer deep spike in parallel on top of the older `src/data/spikes/prostate.ts`
(`prostate-core.ts`, `prostate-treatment.ts` with `prostate-treatment-trials-{localised,hormone,crpc,failed}.ts`,
`prostate-uk.ts`, `prostate-molecular.ts`, `prostate-evidence*.ts`, `prostate-living.ts`, `prostate-glossary.ts`, and
`src/data/decision-tools/prostate-localised.ts`), under the hub-and-sections architecture
(docs/INFORMATION-ARCHITECTURE.md). This is the review that ran afterwards, following `docs/GALLBLADDER-QA.md`,
`docs/TNBC-QA.md`, `docs/PANCREATIC-QA.md` and `docs/COLORECTAL-QA.md` step for step, including the numbered lists at
the end of each. Commands assume a dev server on a free port above 4000 and Chrome at the usual macOS path. Working
files are under `/tmp/prostate-qa` (the URL extractor and checker with its cache, the per-file attribution dump of
every merged array, the duplicate id, DOI and PMID finder, the fetched NICE and SMC pages, the CDP console and width
helper, the fetched dev pages and the edit scripts that made the bulk changes).

Two things were settled before the review and are not reopened: the family page is also the acinar adenocarcinoma
page, deliberately and unlike lung (docs/CANCER-PAGES.md); and the explained page budget measures per-row, per-pill
and per-section cost rather than a total (`src/app/heavy-pages.test.ts`).

**The one finding that justifies the pass.** The corpus said in three places that NICE TA1110 "removes TA721's
restriction" on abiraterone in newly diagnosed high-risk metastatic hormone-sensitive disease. TA721 had no
restriction: its recommendation 1.1 reads "Abiraterone with prednisone or prednisolone plus androgen deprivation
therapy (ADT) **is not recommended**, within its marketing authorisation". TA1110 of 19 November 2025 reversed a
refusal. The error then propagated into three lead-time claims on the UK page, which measured Scotland's January 2020
acceptance as "nearly two years before the first English appraisal" when that appraisal refused the drug and NICE did
not recommend it for another five years and ten months. Same class as the radioligand funding error the UK agent found
during the build: a patient-facing statement about whether the NHS pays for a drug, stated confidently, and wrong.

## 1. Read every page end to end (1440 and 390 px)

Pages: `/cancers/prostate/` and its nine section pages (`finding-it`, `evidence`, `science`, `where-you-are`,
`living-with-it`, `coming`, `data`, `changes`, plus `uk` and `decisions`; Overview, What it is and **Treating it** are
inline on the hub for this record, which is the section plan's own weight decision and not a missing page),
`/cancers/prostate-ductal-adenocarcinoma/`, the eight risk-band and disease-state pages (`prostate-low-risk`,
`-intermediate-risk`, `-high-risk`, `-bcr`, `-mhspc`, `-nmcrpc`, `-mcrpc`, `-nepc`), `/roadmaps/prostate-roadmap/`,
`/tools/prostate-localised/`, `/first-60-days/prostate/` and the new trial, biomarker, term, institution and person
pages the spike links (26 pages fetched as text, 10 more for the backlink count).

| Check | Result | Change |
| --- | --- | --- |
| Sections or sentences that say the same thing twice | A per-file attribution dump of every merged array (`/tmp/prostate-qa/attrib.txt`) is what makes this readable, because the merged record hides which of nine files wrote each line. **Standard of care: 27 rows from four files.** `cancers.ts` carried three one-liners (Localised; Metastatic hormone-sensitive; Castration-resistant) and `spikes/prostate.ts` eight short ones, and `prostate-treatment.ts` restates both, setting for setting, with sources and in NICE's vocabulary. **History: 58 entries.** `cancers.ts` wrote six one-line milestones that `spikes/prostate.ts` writes in full (1941, 2011, 2013, 2020, 2022, 2025); `spikes/prostate.ts` and the evidence layer both wrote 1941 (Huggins) and 2004 (TAX 327); the evidence and molecular layers both wrote 1995 (Visakorpi), 2005 (Tomlins), 2014 (AR-V7), 2015 (TCGA and SU2C), 2016 (Pritchard) and 2017 (Ku and Mu). **Open problems: 32**, with `cancers.ts`'s three one-liners restated by `spikes/prostate.ts`, and the TMPRSS2-ERG "no treatment" problem written by both the evidence and molecular layers. **State of the art: 17**, with `cancers.ts`'s three one-liners restated. **Papers: twelve records exist twice under two ids**, in every case one written by the evidence layer and one by the molecular layer from the same DOI and PMID (Antonarakis 2014, Visakorpi 1995, Pritchard 2016, Robinson 2015, Taylor 2010, Chen 2004, Ku 2017, Tomlins 2005, Abida TRITON2 2020, Mu 2017, TCGA 2015, Grasso 2012). **Links: two URLs on the record twice** under two labels (NG131 recommendations, and the NHS symptoms page), from the core and living layers, plus the PubMed link twice on the Silver 1997 paper. | The three `cancers.ts` rows, its six history entries, its three open problems and its three state-of-the-art lines are gone, and the NCCN prostate guideline URL those rows carried is now a record link. Five of the eight `spikes/prostate.ts` rows are gone; Screening and Biochemical recurrence stay, because the treatment layer has no row for either, and the later-lines row is retitled to what it alone adds (the trials after the approved order runs out). The two refs only the removed rows carried, `decipher-prostate` and `imrt-igrt`, moved onto the CPG 1 and CPG 4-5 rows; every other ref was checked programmatically and is still on the record. **Result: 19 rows** (8 sourced, 3 base, 8 living), 48 history entries, 29 open problems, 14 state-of-the-art lines. Eleven of the twelve duplicated papers are now written once, in the evidence layer, and the molecular layer's copies are `sup<PaperInput>` supplements carrying only their relations, with `SRC` pointing at the surviving ids. All three duplicate URLs removed. |
| Contradictory figures | **PSMAddition.** The record printed "rPFS HR 0.72 (updated 0.67); OS HR 0.80 (NS, immature)" and a summary saying the effect was "stronger at update". The primary publication (Europe PMC PMID 42561994, second interim analysis, cut-off 13 January 2025) gives rPFS HR 0.72 (0.58 to 0.90, p=0.0021) with medians not reached, and reports no overall survival at all. **CAPItello-281.** The record said "rPFS significantly improved (HR reported at presentation)" while the trial is published (Ann Oncol 2026, PMID 41120017): 33.2 against 25.7 months, HR 0.81 (0.66 to 0.98), OS HR 0.90 at 26.4 percent maturity. **PTEN loss.** "~25%" on the drug and subtype panels against "47%" in the molecular table, for the same protein: 25.3 percent is CAPItello-281's cut-off (1,519 of 6,003 tested) and 47 percent is IPATential150's Ventana assay (521 of 1,101). **Neuroendocrine share.** "~15-20% of late mCRPC" twice in `prostate.ts` against 10.5 to 17 percent (Kench 2022) in the core and glossary layers and 17 percent of metastatic biopsies (Aggarwal) in the evidence layer; the 20 percent upper bound has no source anywhere. **PSMA-negative share.** "10%" unsourced against TheraP's measured 31 percent screen-fail. **Lifetime risk.** 17 percent, one in six (CRUK, men born 1961) on the core page against "one in eight for White men" (Lloyd 2015, ethnic-specific) on the UK page; both right for their estimator, nothing reconciling them. **NG131 box 2 at 10 years** quoted in the decision aid above prose giving ProtecT's 15-year progression rates. Everything else checked held: TRITON3's BRCA-versus-ATM split identical in six files, ProtecT's 15-year mortality and its patient-reported outcomes verbatim in four, ERSPC's two denominators (1,410 screened, 570 invited) explicitly distinguished in the glossary, PEACE-3's 38.2 against 32.6 months correct against the final publication, USPSTF's 1 in 5 and 2 in 3 identical in five files, UK incidence 57,900 and deaths 12,300 against CRUK live. | Every figure above now carries its source and its assay or timepoint. PSMAddition prints the published hazard ratio and says survival is not yet reported; CAPItello-281 prints its medians and both hazard ratios; both PTEN prevalences are stated with the cut-off that produced them, on the drug panel, the subtype list and the molecular table; the neuroendocrine share is 10.5 to 17 percent with Kench and Aggarwal named; the PSMA-negative line gives VISION's and TheraP's criteria separately; the UK lifetime risk names Lloyd's estimate and CRUK's beside it; the decision aid names both timepoints. |
| Orphaned references | Fourteen strings that read as notes to another agent or to the developer, all of which render. The worst was a 300-character ownership note (`UK_PAGE_NOTE`) appended to seven roadmap summaries: "UK and NHS specifics ... belong on the UK and NHS page for prostate cancer and are not restated here." Then: two NHS England source-link **labels** carrying HTTP status codes and a firewall description as their visible link text; a trials note and four "what could not be sourced" entries written as a fetch log (HTTP 202, "Amazon Web Services firewall challenge", "to automated readers", "read through the registry's public application programming interface"); "the corpus's report reader"; "this record covers that in its imaging rows"; "This record calls incontinence leaking"; "The row above collects"; "The eight decision rows above"; "the same argument made elsewhere in this record"; "the paper is the reason this page does not print one number"; and a pure data note in a prose field ("The corpus has no MYC target record, so this row carries no targetId"). No "see below", "deep dive" (outside the nav), "TODO", "placeholder" (outside a quoted NHS specification that itself contains one) or "agent A/B/C" reaches a reader. | All rewritten in a reader's language. `UK_PAGE_NOTE` is now one sentence pointing at the UK pathway page. The gaps entries keep the fact (the figure could not be established, the link will not open for a program) and drop the status codes and the firewall vendor. One kept deliberately: `/roadmaps/prostate-roadmap/` invites a pull request to `src/data/confidence.ts`, which is the shared confidence explainer on every roadmap, not prostate copy. |
| A milestone dated six years in the future | The evidence layer's history ends with `{ year: 2032, title: "The platform and registry trials complete" }`, which renders under **Milestones** as though it had happened. The note itself is explicit that these are planned completion dates. The colorectal and lung evidence layers do the same thing and both passed their reviews, so the pattern stays. | The prostate title now reads "are due to complete". The pattern itself is recorded as an open gap rather than changed unilaterally across three spikes. |
| Sentences reading as prognosis advice | None. No sentence gives a reader a personal survival probability; every figure carries its cohort in the "out of 100 men offered" or "in a trial of 1,643 men" form. Four files carry an explicit guard ("These are averages over everybody diagnosed and they are not a personal prognosis"; "No personal survival figure is given here, and NICE gives none"). The three second-person `your` sentences are NHS "when to see a GP" copy and two statements that a figure is *not* a description of the reader's risk. | None. |
| US spellings, em-dashes | **Zero** em-dashes, en-dashes, figure dashes and minus signs in the nineteen files, including inside quoted titles, and none on any rendered page (checked with a UTF-8-aware scan and confirmed against a control). US spellings occur only in entity ids (`b-tumor-heterogeneity`, `b-aging-comorbidity`, `weill-cornell-meyer-cancer-center`), in verbatim quoted paper titles (`localized` seven times, `estrogen`, `tumor`, `hybridization` inside `quote:` fields), in the trial's own registered name ("European Randomized study of Screening for Prostate Cancer"), in sponsor and institution proper names, and in the registry titles on `/coming/` and `/data/`. 64 uses of "programme" against zero prose "program"; "licence" and "licensed" used correctly. | None. |
| React console errors | Console at 390 and 1440 px on fifteen prostate routes: no duplicate-key errors, no exceptions. The only message is the dev-mode hydration attribute mismatch on chip `lang` and `translate` attributes, which the gallbladder, TNBC, pancreatic and colorectal reviews all recorded and which is not from the spike. | None here. |
| Auto-link collisions | The colorectal review's rule 21 applied to this spike's 82 trial records. Four names are ordinary words that already occur in prostate prose and are **not** in the `STOP` list in `src/lib/term-hover.tsx`, so the prose linked to the wrong record: **IMPACT** (the sipuleucel-T trial) against six occurrences of "impact of bowel habits on quality of life" and "equality impact assessment"; **CARD** (the cabazitaxel sequencing trial) against "Every urgent card on this page"; **TRANSFORM** (the UK screening trial) against "most such tumours do not transform"; **PRECISION** (the MRI trial) against "multi-beam precision radiotherapy". Matching is on `name` and `aka`, case-insensitively, not on id. | All four added to `STOP`. The cost is that those four trials no longer auto-link from prose, which is the same trade the list already makes for VISION, DESTINY and PARADIGM; a wrong link is worse than no link. The latent list and the duplicate-name problem are under open gaps. |

## 2. Cited URLs

`/tmp/prostate-qa/` holds the extractor (which walks the nineteen modules and their exported tables after template
expansion, plus `doi` and `pmid` fields) and the checker, which fetches each URL once with a browser user agent,
following redirects manually, cached. **537 distinct URLs.**

- 412 returned 200.
- 121 returned 403 to a script, all bot-blocking hosts: `doi.org` resolutions (110), Europe PMC article pages (5),
  OncLive (2), ASCO Publications, Taylor and Francis, The Lancet and Annals of Oncology.
- **2 dead (404), both fixed.** The ESMO prostate guideline page has gone; the genitourinary guidelines index answers
  200 and the roadmap now links that, relabelled. More interesting: `NG131/chapter/Terms-used-in-this-guideline`,
  which the glossary cites for the definitions of template biopsy and mapping template biopsy, **does not exist** as a
  chapter. NICE folded that section into the recommendations chapter; the definitions are there word for word, so the
  citation is now `.../chapter/Recommendations#terms-used-in-this-guideline` and the quotation stands.
- **1 redirect that mattered.** `nice.org.uk/guidance/ta1032` redirects to `/guidance/terminated/ta1032`. The label
  already said "terminated appraisal", so this is the colorectal review's rule 19 catching nothing new, but the
  address is now written out through a `niceTerminated` helper in `prostate-treatment-shared.ts`, as the UK layer
  already did.
- **Four other redirects rewritten to their final address**: Veracyte moved Decipher Prostate under `/tests/`;
  PROSPERO moved from `display_record.php?RecordID=` to `/PROSPERO/view/`; Prostate Cancer UK moved `get-support`
  under `/prostate-information-and-support/`; and the Royal Marsden consultant directory now serves Nicholas van As at
  `prof-nicholas-van-as`, which also retires a source label that existed only to explain that the address said "dr"
  and the page said "Professor".
- Five DailyMed `search.cfm?query=` addresses redirect to a single `drugInfo.cfm?setid=` page. Left alone: the search
  address is the stable one and the redirect is DailyMed's own disambiguation.
- ISRCTN answers 200 with its `/holding` cookie challenge for all eight of its record pages, as in every previous
  review.
- **2 unreachable from this network**, neither confirmed live nor dead: `essapharma.com` (DNS resolves, the host never
  answers; ESSA Pharma wound down after masofaniten failed) and a Lantheus investor release behind an HTTP/2 stream
  error and a 403.

## 3. NICE and SMC: every appraisal checked against its own page

Every identifier the spike cites was fetched once and read (`/tmp/prostate-qa/nice/`, `/tmp/prostate-qa/smc/`):
NG131, NG234, NG12, QS91, DG53, DG54, IPG364, and TA101, TA259, TA316, TA332, TA376, TA377, TA387, TA391, TA404,
TA412, TA546, TA580, TA660, TA712, TA721, TA740, TA741, TA831, TA887, TA903, TA930, TA951, TA994, TA995, TA1032,
TA1109, TA1110, TA1130, TA1179, plus SMC2195, SMC2215, SMC2297, SMC2366, SMC2400, SMC2472, SMC2517, SMC2579, SMC2604,
SMC2617, SMC2625, SMC2678, SMC2742, SMC2753, SMC2940, SMC2942, SMC2966, SMC 735/11 and SMC 1077/15. **All 98 distinct
NG131 recommendation numbers the repo cites exist**, and all but two say what the repo says they say. Nine problems,
all fixed:

| # | What was wrong | Fix |
| --- | --- | --- |
| 1 | **TA721 presented as a restricted recommendation** in three places ("TA1110 ... removes that appraisal's restriction"; "with no restriction to men for whom another option is unsuitable"). TA721 recommendation 1.1: abiraterone plus ADT "**is not recommended**, within its marketing authorisation". (The live page is now a replacement stub; read from the Internet Archive snapshot of `ta721/chapter/1-Recommendations` and corroborated by NHS England's interim Blueteq ABI4 route from 13 December 2024, which would not exist if NICE had recommended the drug.) | All three say TA1110 reverses a refusal, with both dates. |
| 2 | **Scotland's abiraterone lead-time measured against that refusal**, in three places: "nearly two years before the first English appraisal". SMC2215 was accepted 13 January 2020; TA721 followed 19 months later and refused; TA1110 recommended it 5 years 10 months after Scotland. | "Nineteen months before the first English appraisal, TA721, which refused it, and nearly six years before NICE recommended it in TA1110." |
| 3 | **Two wrong NG131 numbers** on the CPG 4 and 5 page: continuing ADT to three years cited as 1.3.30 (that is pelvic radiotherapy) and brachytherapy-alone cited as 1.3.33 (that is adjuvant hormonal therapy after prostatectomy). The real numbers are 1.3.23 and 1.3.25. | Corrected. |
| 4 | **"Offers" written where NG131 says "discuss".** 1.3.26 says "Discuss the option of docetaxel chemotherapy with people who ... and make a shared decision". | "Asks teams to discuss six cycles of docetaxel with the same population and make a shared decision." |
| 5 | **Olaparib lead-time overstated** by measuring against the replacement appraisal. SMC2366 was accepted 11 October 2021; NICE's first appraisal in that indication was TA831 of 5 October 2022, twelve months later. Eighteen months is the gap to TA887, which the corpus itself calls TA831's replacement. | Both gaps stated, each against its appraisal, in three places. |
| 6 | **The appraisal count does not add up**: "Thirty-one ... Nineteen ... three ... three ... five" sums to 30, and NICE's own prostate product list plus the five withdrawn or replaced appraisals gives 30. | "Thirty". |
| 7 | **A truncated sentence in patient-facing prose**: "sipuleucel-T (TA332), withdrawn in 2015 after its marketing authorisation was." | "... was withdrawn on 19 May 2015", the date on the TA332 page. |
| 8 | **"Consider" dropped from 1.3.23** in two UK summary fields ("continued to three years in CPG 4 and 5"), though the living layer gets it right twice. | Both now say the option is to be considered and discussed. |
| 9 | **1.3.26 cited for metastatic disease** beside 1.5.6; 1.3.26 is explicitly non-metastatic. | Split, each recommendation cited for what it says. |

Verified correct and unchanged: TA101, TA259, TA316, TA377, TA387, TA391, TA404, TA412, TA546, TA580, TA660, TA712,
TA740, TA741, TA887, TA903, TA930, TA951, TA995, TA1109, TA1110, TA1130 on drug, indication, restriction wording and
date; the withdrawn, replaced and terminated set (TA332, TA376, TA721, TA831, TA994, TA1032, TA1179) on its status;
the statement that the Cancer Drugs Fund carries no prostate indication; NG131's dates and its boxes 1, 2 and 3,
table 1 and table 2, including the roughly forty verbatim quotations in `src/data/decision-tools/prostate-localised.ts`,
checked one by one; NG234, NG12 (including that 1.6.1 is an "offer" and 1.6.3 only a "consider") and QS91; the current
NICE identifiers HTG678, HTG680, HTG237 and HTG659 behind the old DG and IPG numbers; and every SMC advice, its
accepted or non-submission status, its PACE mention and its date. TA831's recommendation **wording** could not be
read: the live page is a replacement stub and the Internet Archive answered 429 and then an outage page, so finding 5
rests on publication dates only, which are certain.

## 4. Vocabulary: does every layer hold the taxonomy agent's line?

The taxonomy agent established that NICE writes in Cambridge Prognostic Groups, says "hormone-relapsed" rather than
"castration-resistant", and reports MRI on a Likert scale rather than PI-RADS. Every sentence that names a NICE
artefact and also carries the other vocabulary was read, 71 of them.

- **Hormone-relapsed: zero violations.** Every "castration-resistant" next to a NICE reference is either an explicit
  bridge or an SMC decision, where SMC and not NICE is the subject. All fourteen appraisal lines use NICE's word.
- **Likert: zero violations.** The four sentences pairing NICE with PI-RADS all say NICE asks for Likert rather than
  PI-RADS; NG131's biopsy thresholds are in Likert numbers everywhere.
- **Cambridge Prognostic Groups: one violation**, on the grade-group glossary page: "NICE's Cambridge Prognostic
  Groups use exactly that split to divide favourable from unfavourable intermediate-risk disease." Favourable and
  unfavourable intermediate risk is NCCN language; the Cambridge table has no such labels, and the same file says so
  77 lines later. Now reads "to separate CPG 2 from CPG 3", with the NCCN attribution stated.
- Everything else that looked like a violation is NICE's own wording, verified against the appraisal titles:
  "high-risk hormone-relapsed non-metastatic" is a metastasis-risk term the corpus defines in NICE's terms, and
  "newly diagnosed high-risk hormone-sensitive metastatic", "untreated, unilateral, low-risk" and "high-risk localised
  or locally advanced" are the TA1110, TA546 and TA995 titles verbatim.
- **All three bridges exist and all three render**, in five, five and four places respectively, including in the
  standard-of-care headings themselves ("CPG 1 (low risk)"). **One gap was open and is now closed**: nothing told a
  reader that NICE's *appraisals* still write in low, intermediate and high risk while NG131 writes in CPG, so a man
  who reads the funding note and then meets TA995's "high-risk localised" has no explanation. The funding note now
  says it in one sentence.

## 5. The five named sourcing gaps

| Gap as reported by the agent that wrote it | What the review found | Change |
| --- | --- | --- |
| **F877L as the antagonist-to-agonist switch** asserted in three places on allele counts plus a general finding, because Korpal, Joseph and Balbás (all 2013) were not reached | The wording is already the careful one. The receptor-mutation claims rest on Chen 2004 (overexpression turns antagonists into agonists, which is the mechanism) and on cBioPortal allele counts with their cohorts; the three 2013 papers name the specific residue. The claim as printed, that F877L "turns enzalutamide and apalutamide into agonists", is the textbook reading of the residue and is not sourced to a primary paper here | None. The honest fix is to attach one of the three papers, which needs a fetch this pass did not make; recorded as an open gap rather than softened into vagueness, because the surrounding sentence already names its evidence (the 13.7 to 18.0 percent ligand-binding-domain mutation rate and its cohorts) |
| **gLOH-high at 16 percent** unsourced | Not present anywhere in the tree. The glossary says ARIEL2 part 1's prespecified 14 percent "was set for one next-generation sequencing assay in ovarian carcinoma" and that "there is no single agreed cut point for gLOH-high across assays or across cancers", which is correct | None needed; confirmed |
| **AR-V7 prevalence by disease state** rests on one small single-centre series | The label survived and is stronger than reported. Every file gives Antonarakis 2014's figures with their denominators (39 percent of 31 starting enzalutamide, 19 percent of 31 starting abiraterone), the 62-patient limitation is in the caveats of both the paper record and the glossary term, and PROPHECY (118 men, two assays) and Scher 2018 (142 men) are carried beside it as the validation | None needed; confirmed |
| **PI-RADS v2.1 overall categories** from a secondary source | Unchanged. The term says which source it came from | None; recorded |
| **L702H and glucocorticoid**, the same problem more weakly | Same position as F877L | None; recorded |

## 6. Trials named in prose but never written

The evidence layer listed `PENDING_TRIALS`; the treatment layer wrote thirteen of them during the build. **ERSPC and
PLCO, which the whole screening section rests on, are now written** (`prostate-treatment-trials-localised.ts`), every
figure quoted from the primary publication read through Europe PMC:

- **`erspc`**, ISRCTN49127736: 182,000 men, core group 162,243 aged 55 to 69, rate ratio 0.80 (0.65 to 0.98) at a
  median of nine years with 1,410 needing to be screened and 48 extra cancers treated per death prevented, and 0.80
  (0.72 to 0.89) at 16 years with 570 needing to be **invited** and 18 diagnosed. The record states in its own summary
  that those are two different denominators, which is how this trial is usually misquoted.
- **`plco-prostate`**, NCT00002540: 76,693 men, death rate 2.0 against 1.7 per 10,000 person-years, rate ratio 1.13
  (0.75 to 1.70), and the reason the null result is hard to read, control-group PSA testing rising from 40 to 52
  percent over the six screening years.

Both are referenced from the Screening standard-of-care row and the 2009 milestone, so a reader who meets the name has
somewhere to go, and each carries the other as a replication. `PENDING_TRIALS` is trimmed from 24 ids to the nine
still unwritten (stopcap, toparp-a, triton2, transformer, restore, keynote-199, spartan, probio, stampede2), with the
comment rewritten to say what the list now is. None of the nine dangles: each is named in prose only and linked to its
paper record.

## 7. Backlinks, mobile, page weight, private data

- **Backlinks.** Every page the spike claims to link was fetched and its `href="/cancers/prostate/"` counted: the two
  new trial pages 6 and 10, `ar-v7-splice-variant` 6, `psma` 5, `cambridge-prognostic-group` 3, the Royal Marsden 3,
  abiraterone, olaparib, ProtecT and STAMPEDE 2 each. None orphaned.
- **Mobile audit.** `npx tsx scripts/mobile-audit.ts` has 26 site-wide checks and **no prostate route**, so it says
  nothing about this spike either way. It reported 20 passed and 6 failed here; every failure is on a page the spike
  does not touch (`/graph/`, `/tumor-board/`, `/query/`, `/cancers/nsclc/`, `/biomarkers/her2-ihc-3-plus/`,
  `/people/thomas-powles/`) and every one is of the "element not found" or "no scroll happened" shape. All six were
  re-checked individually with a longer settle time and all six have their section bar and lay out at 390, so these
  are the webpack dev server being slow to hydrate, not regressions. See the note at the end of section 8 on why the
  dev server here is webpack and not Turbopack.
- **Width at 390 px.** Fifteen prostate routes, including the UK page, the decisions page, the roadmap, the tool and
  the two new trial pages, all lay out at 390 (`scrollWidth` 390, `innerWidth` 390). No repeat of the colorectal UK
  page's nowrap chip problem: the fixes made there hold for this page's data.
- **Console.** Section 1. No duplicate-key errors and no exceptions at either width; only the pre-existing hydration
  attribute message.
- **Page weight**, measured with `renderToStaticMarkup` inside the layout against `HUB_BUDGET_KB` 350 and
  `SUBPAGE_BUDGET_KB` 600:

| Page | KB | | Page | KB |
| --- | --- | --- | --- | --- |
| `/cancers/prostate/` (hub) | 261 | | `/cancers/prostate/coming/` | 277 |
| `/cancers/prostate/finding-it/` | 111 | | `/cancers/prostate/data/` | 278 |
| `/cancers/prostate/evidence/` | 165 | | `/cancers/prostate-mcrpc/` (hub) | 139 |
| `/cancers/prostate/science/` | 126 | | `/cancers/prostate-mcrpc/data/` | 138 |
| `/cancers/prostate/where-you-are/` | 120 | | `/cancers/prostate-ductal-adenocarcinoma/` (hub) | 113 |
| `/cancers/prostate/living-with-it/` | 130 | | | |

  **Prostate is now in the `HEAVY` list of `src/lib/record-sections.test.ts`** beside gallbladder, TNBC, NSCLC,
  pancreatic and colorectal, so these are enforced rather than measured once. That is the one gate this review
  tightened.
- **Private data.** Of the 226 ISO dates in the spike, every one is a `date:` field on a source: a NICE or SMC
  publication date, a policy date or a page-read date. No variant allele fractions, no ages of individuals, no case
  descriptions, no references to the private repositories. The only personal names are published authors and UK
  clinicians with public professional pages. Nothing removed.

## 8. Gates

`npm run validate` (18,877 entities OK), `npm run typecheck`, `npm run lint` (0 errors; 5 pre-existing warnings) and
`npx vitest run --testTimeout=600000` (162 files, 1,746 tests) pass on the committed state. One gate caught a real mistake in this review's own
work: `src/lib/corpus-rules.test.ts` requires a phase 3 trial to carry a primary registry id, and the first ERSPC
record had its ISRCTN number only in a link. **No floor was moved**; the Ask recall floor in `src/lib/ask.test.ts`
passes unchanged after the row and paper de-duplication. One gate was tightened (prostate added to the enforced
section budgets).

## Open gaps

- **F877L, L702H and the antagonist-to-agonist switch** still rest on allele counts plus Chen 2004 rather than on
  Korpal, Joseph or Balbás (all Cancer Discovery or eLife, 2013). Attaching one of the three is a single fetch and
  would close the last named sourcing gap in the molecular layer.
- **`paper-ku-science` and `paper-ku-rb1-trp53-lineage-plasticity-science-2017`** are the same paper. The first is a
  thin Europe PMC ingest record (empty `findings`, "No figure has been checked by an editor") that the wider corpus
  already cites; the second is the molecular layer's full record. The evidence layer's four references now point at
  the full record and the thin one carries a `related` link to it, but retiring it needs the redirect policy for
  `key-papers` ids that the TNBC and colorectal reviews also asked for.
- **A history entry dated 2032** renders under Milestones on three cancer records (prostate, colorectal, lung). The
  prostate title now says "are due to complete"; the pattern is worth a decision, because a milestone list that
  contains the future is a small lie of form even when every sentence in it is true.
- **Auto-link names that are ordinary English words and are not yet in `STOP`**: PROfound, MAGNITUDE, PROpel,
  LATITUDE, ARCHES, EMBARK, READY, PROFIT, SYNERGY, PREVAIL, AFFIRM, HERO, PIVOT, SPLASH, TROPIC, ORIOLE, STOMP. None
  fires on prostate prose today. Separately, three names are claimed by **two or three records each** (TRANSFORM:
  prostate screening and DLBCL; ECLIPSE: prostate radioligand, pancreatic GVAX and a test; PROSPECT: prostate PROSTVAC
  and rectal Alliance N1048), and the de-duplication keeps whichever comes first in graph order, so which record the
  word links to is arbitrary. There is no test guarding `STOP`.
- **`public/reviews/models/prostate.json`**, if it exists, predates this pass and quotes the record's old figures; it
  needs re-running with the owner's key, as the TNBC and colorectal reviews also recorded.
- **Two hosts unreachable from this network** (`essapharma.com`, a Lantheus investor release) are neither confirmed
  live nor dead.
- **NHS England pages** answer a firewall challenge to anything that is not a browser. The prose no longer says so in
  those words, but the fact matters for the agentic-accessibility work in docs/LAUNCH.md: five pages the UK layer
  cites are readable by a person and not by an agent.
- **There is no `src/data/prostate-molecular.test.ts`**, although TNBC, lung and colorectal each have one checking
  that every landscape row's `targetId` is on the cancer record and that every figure carries a cohort. Prostate's
  landscape is the largest of the four.
- `/cancers/prostate/treating-it/` is inline on the hub rather than a page of its own, unlike colorectal and TNBC.
  That is the section plan's weight estimate and the hub is 261 KB of its 350 KB budget, so nothing is wrong; it is
  recorded because the section is the one a newly diagnosed man is most likely to deep-link to.

## Repeating this review for the next deep spike

Follow the lists at the end of `docs/GALLBLADDER-QA.md`, `docs/TNBC-QA.md`, `docs/PANCREATIC-QA.md` and
`docs/COLORECTAL-QA.md`, and add:

23. **When one appraisal replaces another, read the one that was replaced.** A replacement is not evidence that the
    earlier appraisal was a weaker version of the later one: TA721 was a refusal and the corpus described it as a
    recommendation with a restriction. The replaced page is a stub, so this means the Internet Archive.
24. **Check every "earlier than NICE by X" claim twice**, once for the dates and once for what the NICE decision
    actually was. A lead-time measured against a refusal is not a lead time, and this spike had three of them, all
    downstream of one wrong reading.
25. **Grep the spike for a regulator's modal verbs.** "Offer", "consider" and "discuss" are three different
    instructions in a NICE guideline and writing the strongest of them is the commonest quiet error; four of this
    pass's nine NICE findings were of that shape.
26. **Diff the two vocabularies a taxonomy agent establishes, then check the bridge covers the appraisals too.** NG131
    writes in Cambridge Prognostic Groups and the technology appraisals do not, so a corpus can hold the line
    perfectly and still leave a reader with two names for the same man and no sentence joining them.
27. **Run the duplicate finder on PMID as well as DOI and id.** Twelve papers existed twice here, all from the same
    two layers, all catchable before a page is opened.
28. **Look for a `year` in the future in `history`.** It renders under Milestones.
29. **Read the source-link labels, not only the URLs.** A label is visible text; three of this spike's carried HTTP
    status codes and a firewall vendor into the page.
30. **A worktree with no `node_modules` cannot run `next dev` under Turbopack**, because a symlink out of the
    filesystem root is refused; `next dev --webpack` works and is what the page reading here used.
31. **Open the source and check it contains the claim, not merely that it is a respectable source.** The rule that a
    standard-of-care row must cite a guideline body or a primary publication is satisfied by any DOI, so a row whose
    real source is a patient leaflet can pass by pointing at a paper nobody opened. The skin layer did this eight
    times, twice at paywalled guideline papers known only from a leaflet's reference list. The rule now accepts a
    patient-information body when the row names it in `guideline.version` (see `PATIENT_INFO_HOSTS` in
    `src/lib/corpus-rules.test.ts`), because a source that does not contain the sentence is a worse failure than an
    informal one that does. Nothing in the gates catches this class; only reading the source does.
32. **Check a figure is attributed to the drug it was measured on.** The photodynamic therapy figures in the skin
    layer were attached to aminolevulinic acid and were measured on methyl aminolevulinate, which is a different
    photosensitiser with different approvals and already had its own record. Same class as lesson 31: a citation
    that does not contain the claim.
33. **Note any source past its own stated review date.** The dermatology association's squamous cell leaflet, quoted
    by several rows, says its next review was due April 2025 and no newer version exists at the URL. That is not a
    reason to drop it, but it is a reason to say so and to re-read it next round.
