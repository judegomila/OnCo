# Skin cancer round: review checklist and results (25 September 2026)

Four agents wrote the skin cancer family and the keratinocyte cancers in parallel (`src/data/spikes/skin-core.ts`,
`skin-treatment.ts` with `skin-treatment-shared.ts` and its two trial files, `skin-uk.ts`, `skin-living.ts`, and
`src/data/decision-tools/bcc-low-risk-treatment.ts`). This is the review that ran afterwards, following
`docs/PROSTATE-QA.md`, `docs/BREAST-QA.md` and `docs/LUNG-QA.md` step for step, including the numbered lists at the
end of each and of `docs/GALLBLADDER-QA.md`, `docs/TNBC-QA.md`, `docs/PANCREATIC-QA.md` and `docs/COLORECTAL-QA.md`.
Commands assume a dev server on a free port above 4000 (`npx next dev --webpack -p 4215`) and Chrome at the usual
macOS path. Working files are under `/tmp/skin-qa` (the URL extractor and checker with its cache, the per-file
attribution dump of every merged array, the cross-record 8-gram prose comparison, the CDP console and width probe,
559 fetched dev pages as HTML and as text, and the edit scripts that made the bulk changes). The worktree had no
`node_modules` of its own, so the dev server only starts after `cp -Rc` of the repository's into it, as the lung
review records.

**Three findings justify the pass, and two of them are about a reader rather than a citation.**

1. **A page about a cream told a reader to watch for a blood clot, and named three myeloma drugs while doing it.**
   `/cancers/bowens-disease/` is a page for someone with an in-situ patch of skin usually treated with a cream, and
   every one of its red cards came from the `fluorouracil` record. The worst read: "Blood clot (lenalidomide,
   pomalidomide, thalidomide) ... venous and arterial thromboembolism is a boxed warning", sourced to Revlimid and
   headed "Emergency services now". The cause is one word in a regular expression: the immunomodulator red-flag set
   in `src/data/red-flags.ts` matched `imid` unanchored, and `imid` is a substring of **pyrimidine**, imidazole and
   benzimidazole. **Eleven drugs corpus-wide carried the lenalidomide, bortezomib and carfilzomib cards**, including
   every fluoropyrimidine, which means every colorectal, gastric, pancreatic, anal, oesophageal and head-and-neck
   page. Six reviews missed it because on those pages the six-card cap pushes it below the fold; skin surfaced it
   because a cream is sometimes the only drug on the page. Fixed to `\bimids?\b`: the set is down from 19 drugs to
   the 8 it is for.
2. **NICE TA414 was presented as a funded option and is a refusal.** The UK page's BRAF row read "Trametinib with
   dabrafenib is recommended ...; encorafenib with binimetinib ...; cobimetinib with vemurafenib (TA414, 26 October
   2016)", governed by "is recommended", and the genomic-test row said BRAF V600 "opens" all three. TA414
   recommendation 1.1: "Cobimetinib in combination with vemurafenib **is not recommended** within its marketing
   authorisation for treating unresectable or metastatic melanoma in adults with a BRAF V600 mutation." Same class
   as the prostate review's TA721 finding, on a page that elsewhere takes great care to separate a refusal from a
   terminated appraisal from a non-submission.
3. **The photodynamic therapy trials were still attached to the wrong photosensitiser.** The round's own follow-up
   commit moved the *figures* from aminolevulinic acid to methyl aminolevulinate (review lesson 32). It did not move
   the *records*: all three randomised photodynamic trials still declared `drugs: ["aminolevulinic-acid"]`, and a
   supplement listed all three on the aminolevulinic acid drug page, directly under the note the living layer had
   written there saying the trials used the other cream.

## 1. Read every page end to end (1440 and 390 px)

Pages: `/cancers/skin-cancer/` and its eight section and sibling pages (`evidence`, `science`, `where-you-are`,
`coming`, `data`, plus `uk`, `decisions` and `changes`; Overview, What it is, Finding it, Treating it and Living
with it are inline on the hub), `/cancers/basal-cell-carcinoma/`, `/cancers/cutaneous-scc/`,
`/cancers/merkel-cell-carcinoma/`, `/cancers/bowens-disease/`, `/cancers/locally-advanced-bcc/`,
`/cancers/advanced-cutaneous-scc/` and their section pages, `/tools/bcc-low-risk-treatment/`,
`/first-60-days/skin-cancer/`, and the term, trial, drug, institution and person pages the round writes.
**559 routes were fetched from the dev server and read as text; every one answered 200**, and 39 of them were also
read at 1440 and 390 px through the Chrome DevTools Protocol.

| Check | Result | Change |
| --- | --- | --- |
| Sections or sentences that say the same thing twice | **Between the family page and the subtype pages: none.** A per-file attribution dump of every merged array (`/tmp/skin-qa/attrib.txt`) plus a cross-record comparison of every sentence of 60 characters or more and every 8-gram in it, over the seven skin records, the melanoma record and the UK page. **Zero shared prose.** The 80-odd shared sentences are all source labels, navigation chrome, red-card thresholds and the shared question sets, exactly as the breast round found. **The duplication is on the base record and is older than this round.** `src/data/cancers.ts` still carried, on `skin-cancer`: three unsourced standard-of-care one-liners (Basal cell and squamous cell carcinoma; Melanoma; Prevention) against the six sourced rows `skin-treatment.ts` writes and the five `skin-living.ts` writes; seven one-word `subtypes` strings against the five full ones `skin-core.ts` writes, including "Actinic keratosis (precancer)" directly above "Actinic keratosis, which is sun damage rather than cancer and is a glossary term here, not a page"; two melanoma `biomarkers` lines that `skin-core.ts` states once and routes with; and the open problem "Non-melanoma skin cancer is missing from most cancer registries, so its true burden is unknown" against the 200-word sourced version `skin-core.ts` writes. **Six duplicate link URLs on three records**: the NHS symptoms page, NICE CSG8 and NICE NG34 on `skin-cancer` (core and UK against living), the BAD basal cell guideline on `basal-cell-carcinoma` and the BAD squamous cell guideline and the NHS symptoms page on `cutaneous-scc` (core against living). | The base rows, subtypes, the two melanoma biomarker lines and the registry open problem are removed from `cancers.ts`, each with a comment naming the file that now owns it, after checking every id they referenced is still reachable (`cemiplimab`, `vismodegib`, `pembrolizumab`, `nivolumab`, `dabrafenib` are in the record's `drugs`; `dermoscopy-ai` in its `technologies`). The three melanoma history milestones stay: they are not restated by this round, and removing them would take `ipilimumab` and `vemurafenib` off the record. All six duplicate link URLs removed from the living layer. |
| React console errors | **Duplicate-key errors on fourteen routes**, at both widths, naming four URLs: `nhs.uk/conditions/non-melanoma-skin-cancer/symptoms/`, a `nice.org.uk/guidance/...` address, `doi.org/10.1111/bjd.20524` and `doi.org/10.1111/bjd.19621`. This is the lung review's rule 23 exactly: the error named the value, and the value came from the corpus, not from the component. | The six duplicate link URLs are gone and so are the errors. Re-checked at 390 and 1440 px on 39 skin routes: **no duplicate keys, no exceptions, nothing but the dev-mode hydration attribute mismatch on chip `lang` and `translate` attributes** that every review since gallbladder has recorded and which is not from this round. |
| The organ schematic printing the wrong cancer under the wrong cell layer | `/cancers/skin-cancer/` printed "Merkel cells (dermal-epidermal): **Melanoma (including uveal and mucosal melanoma)**, then Merkel cell carcinoma, then ...". `matchedSubtypes` in `src/data/organ-schematics.ts` matches a subsite's keywords as substrings, the Merkel subsite's keywords include `uv`, and `uv` is inside **uveal**. Melanoma therefore appeared under Merkel cells and not under the melanocyte layer at all. | Fixed by the fold above: the base string that carried the word is gone, and no surviving subtype string contains `uv`. The underlying two-character match token is recorded as a gap, with the breast review's caption-length gap beside it. |
| Contradictory figures | None between any two skin records. The figures that appear on more than one page agree to the digit: the 75/25 per cent split of the keratinocyte cancers, the 601-patient Dutch trial's 80.5 / 70.0 / 62.7 per cent at five years (family page, basal cell page, decision aid and the drug record), SINS's 82.5 against 97.7 per cent in four places, the Mohs trial's 4.4 against 12.2 per cent, C-POST's 87.1 against 64.1 per cent, the transplant figures (150 times, up to 10 times, one in three, about half) in three places, and the UK's 89,978 of 308,200 referrals. **One denominator was quietly reconciled**: Cancer Research UK writes basal cell carcinoma as 75 out of every 100 **non-melanoma skin cancers** and squamous cell carcinoma as 25 out of every 100 **skin cancers**, two different denominators in two sentences on one page, and the corpus printed them as a pair that adds to 100. | The four places that carry the split now say which denominator each half is written against. |
| Orphaned references and notes to the developer | **Nine source-link labels and one gaps entry carrying HTTP status codes, a firewall vendor and the site's own name into visible page text** on the UK page: "The page answered HTTP 202 with an empty web application firewall challenge to OnCo on 25 September 2026" (five times), "answers HTTP 403 to a browser user agent and 200 to a plain request" (four), and a gaps entry with two more. This is the prostate review's rule 29 and the breast review's identical finding, repeated. No "see below", "TODO", "placeholder", "agent A/B/C" or source-code path renders on any skin page; the comments that name files are comments. | All rewritten in a reader's language, keeping the fact and dropping the codes and the vendor: "The page does not open for an automated reader; its full text was read through the site's own publishing interface on 25 September 2026". **One of them was also wrong**: on a re-check the three Northern Ireland workbooks answered both kinds of request, so that claim is removed rather than restated. |
| Sentences reading as prognosis advice | None. No sentence gives a reader a personal survival or recurrence probability. Every cohort figure carries its study and its denominator, and the round states the guard in three places ("These are cohort figures, not a prediction for one person"; "Those figures describe that cohort, not you"; "no figure on this page is a prediction about you"), with the decision aid saying "It gives no score and makes no prediction about you" at the top. **One sentence came close**: the sun-protection row said "what sun protection changes is the chance of the next one, which after a basal cell carcinoma is 44 percent within three years", addressed to the reader with the cohort two pages away. | That sentence now names the meta-analysis of 17 studies and adds "That is a figure for a group of people, not a prediction for you". |
| US spellings, em-dashes | **Zero** em-dashes, en-dashes, figure dashes and minus signs in the seven files, and **not one non-ASCII character of any kind**, quoted titles included. US spellings occur only in quoted paper and registry titles (`randomized` in the SINS five-year title, `tumor`, `Organization`), in proper names, and in existing entity ids. | None. |
| Horizontal overflow at 390 px | All 39 routes lay out at 390 (`scrollWidth` 390, `innerWidth` 390) with no non-scrollable element past the viewport, including the UK page, the decisions pages, the decision aid and the first-60-days page. The red-cards `min-w-0` fix the breast review made holds for this round's card titles, which are longer. | None. |

## 2. Cited URLs

A walker over the seven modules and the decision aid, after template expansion and including `doi` and `pmid`
fields, produced **277 distinct URLs**, each fetched once with a browser user agent, following redirects manually,
cached in `/tmp/skin-qa/url-cache.json`.

- **210 returned 200.**
- **53 returned 403 to a script**: 49 `doi.org` resolutions to bot-blocking publishers (JAMA Network, Oxford
  Academic for the British Journal of Dermatology, Elsevier, NEJM, Wiley, BMJ), the three Northern Ireland
  workbooks and the Guy's and St Thomas' page.
- **5 returned 202**, all `www.england.nhs.uk`, which serves an empty firewall challenge to a script. All five were
  read through the site's own WordPress REST endpoint, which answers 200.
- **9 apparent 404s are an artefact of the extractor**, which stopped a URL at the `(` inside a parenthesised
  Elsevier DOI. Each was re-fetched whole and each answers 200. No reader ever sees the truncated form.
- **1 genuinely dead DOI, fixed.** `10.1684/ejd.2008.0472` is the correct identifier for Basset-Seguin's five-year
  photodynamic-therapy-against-cryotherapy trial (Europe PMC agrees, PubMed 18693158) and `doi.org` returns not
  found for it. Both the outcome source and the record's link now point at the PubMed record, and the label says
  the DOI does not resolve.
- **2 redirects rewritten to their final address.** The British Association of Dermatologists moved its squamous
  cell leaflet from `/condition/squamous-cell-carcinoma/` to the plural, and NICE serves medtech innovation
  briefings from `/advice/` rather than `/guidance/` (MIB311).
- ISRCTN's ten record pages answer 200 with the `/holding` cookie challenge, as in every previous review; the UK
  layer reads them through the ISRCTN API and says so.

## 3. NICE: every identifier and every recommendation number checked against its own page

The skin files cite **30 NICE identifiers** in 165 places, all in four files (NG34 20, CSG8 20, TA489 15, TA802 13,
NG12 11, TA691 10, TA517 8, PH32 8, QS130 7, TA766, TA684, TA592, TA396, HTG746 4 each, TA980, TA950, TA837,
TA562, TA558 3 each, TA414, TA410, TA400, TA366, HTG99, HTG714, HTG333 2 each, NG14, IPG478, IPG155, HTG388 1
each), plus MIB311. Every one was fetched and read (`/tmp/skin-qa/nice/`).

- **All 30 exist, every title matches, and every date is right.** 32 structured `date:` fields and about 25 inline
  prose dates were compared against the pages themselves and not one disagreed. NICE numbering is the usual error
  in these reviews and it is not an error here.
- **The four load-bearing recommendations are verbatim.** TA489 1.1 ("Vismodegib is **not recommended** within its
  marketing authorisation for treating symptomatic metastatic basal cell carcinoma, or locally advanced basal cell
  carcinoma that is inappropriate for surgery or radiotherapy, in adults"), TA802 1.1 (cemiplimab recommended "only
  if: it is stopped at 24 months"), TA691 1.1 and TA517 1.1 and 1.2 on avelumab.
- **Every "there is no appraisal" claim was verified by search on nice.org.uk**, and all of them hold: sonidegib
  returns no results anywhere in NICE; cemiplimab has fifteen results and none in basal cell carcinoma;
  pembrolizumab in cutaneous squamous cell carcinoma is ID6473, in development; cosibelimab is ID6663, awaiting
  development; retifanlimab's four results are anal canal and lung.
- **NG12 1.7.1, 1.7.4, 1.7.5 and 1.7.6 are quoted exactly and the modal verbs are preserved**: "consider" stays
  "consider" in all four places, and the claim that a basal cell carcinoma gets a non-urgent referral is the
  guideline's own "Consider non-urgent referral". **NG34's eighteen recommendations** were read one by one and the
  round's negative claim holds: none of them is about regulation, taxation or the provision of sunscreen.
  **PH32's** replacement of recommendations 1 to 5 and its three "no recommendation was made" reasons are exact.
  **CSG8 Box 1** was read from the 2010 partial-update PDF and every criterion in the round's long label matches.

Six problems, all fixed:

| # | What was wrong | Fix |
| --- | --- | --- |
| 1 | **TA414 presented as a funded option** in two places; it is a refusal (see the headline above). | The funding row names the refusal and quotes recommendation 1.1; the genomic-test row says BRAF V600 does not open the third pair. |
| 2 | **NG12 1.7.2 misdescribed** as "asks for dermoscopy where it is available". 1.7.2 is a referral trigger: "Refer people using a suspected cancer pathway referral if dermoscopy suggests melanoma of the skin." The recommendation that asks for the examination is QS130 statement 3, and it is at specialist assessment, not in primary care. | Rewritten with both quoted, and the primary-care claim dropped. |
| 3 | **"Must" written where CSG8 says "should"**, twice: "every incompletely excised basal cell carcinoma must be discussed with" a member of the multidisciplinary team. The prostate review's rule 25, in a cancer service guideline rather than an appraisal. | Both now say CSG8 says it should be. |
| 4 | **The "sixty-five products" breakdown does not describe the list**: it assigned "the rest" to appraisals, HealthTech guidance and briefings, which leaves NG12 and NG14 unaccounted for and treats 22 entries that are in development, awaiting development or in topic prioritisation as published guidance. | The label now gives the real composition: 43 published or terminated (27 appraisals, three of them terminated; 8 HealthTech; 3 guidelines; 1 public health guideline; 1 cancer service guideline; 1 quality standard; 2 briefings) and 22 not yet guidance. |
| 5 | **A quality standard described as a right**, twice ("QS130 statement 4 gives a right to a skin cancer clinical nurse specialist"; "turns this row ... into an entitlement"). Both statements are quoted correctly; a quality standard is what a service is measured against. | Both rewritten, with NICE's own framing said once. |
| 6 | **TA410 stated far more broadly than the recommendation**: "Talimogene laherparepvec is recommended for unresectable metastatic melanoma in England." The recommendation is limited to stage 3B, 3C or 4M1a disease that has not spread to bone, brain, lung or other internal organs, and only where a multidisciplinary team does not consider a systemic immunotherapy the best option. | All three conditions are now in the sentence. |

One more softening, in `skin-treatment.ts`: "That single appraisal is the extent of NICE guidance for this disease"
is true of NICE's *appraisals* and false of its guidance, because HTG333, HTG99, NG12 1.7.4 and QS130 all cover
cutaneous squamous cell carcinoma. The sentence now says so.

## 4. The four things this round decided, checked rather than reopened

1. **Bowen's disease is a record and actinic keratosis and keratoacanthoma are terms, decided on the behaviour code
   and the registration rather than the chapter heading.** The reasoning is in `docs/CANCER-PAGES.md` under "The
   skin family (decided 25 September 2026)", with the behaviour codes, the ICD-10 chapters, the registration status
   and the explicit statement that the fifth edition of the skin Blue Book moved all three between editions, so a
   taxonomy that followed headings would have moved these pages twice in seven years. **Held and correct.** The
   consequence is visible and right on the page: Bowen's disease has a hub with its own staging sentence (pTis) and
   a routing row to cutaneous squamous cell carcinoma if invasion is found, and actinic keratosis renders as a
   glossary term that says in terms that it is not a page.
2. **Growth patterns and grades generate no records.** Checked against the graph rather than the files: 455 cancer
   records, and the only one this round created is `bowens-disease`. Nodular, superficial, morphoeic, sclerosing,
   micronodular, infiltrative, basosquamous, acantholytic, desmoplastic and spindle cell all appear as `subtypes`
   strings and glossary text and none of them is a record. **Held.**
3. **Melanoma was not restated.** The `melanoma` record carries no patch from any skin-round file; every line on it
   is its own or its base record's. The one family-page row that summarises the difference,
   "What is different about melanoma", is accurate on all four counts (margin by thickness rather than a fixed
   4 mm; sentinel node biopsy for nodal staging; checkpoint immunotherapy or BRAF and MEK inhibition for advanced
   disease; no role for creams, curettage or photodynamic therapy in invasive melanoma) and **routes rather than
   half-answers**: it says the melanoma page carries all of it and links `melanoma`,
   `sentinel-lymph-node-biopsy` and `checkpoint-inhibitor`. The half-answer was the *base* row it sits beside,
   which restated melanoma treatment in one unsourced line; that row is now gone.
4. **The counting caveat.** The glossary term `keratinocyte-cancer-counting` carries the 1999 first-per-person rule,
   England's move to first-per-person-per-year (67 per cent more basal cell and 42 per cent more squamous cell
   carcinomas over 2013 to 2022), the residual undercount, the four nations' different practice, and the ONS
   exclusion of the whole of C44 from "all cancers". It is on the `terms` array of `skin-cancer`,
   `basal-cell-carcinoma`, `cutaneous-scc`, `merkel-cell-carcinoma` and `bowens-disease`, so it renders in the
   glossary strip of every page that carries an incidence figure, and the incidence notes on the three main records
   open with "Every number on this page rests on a counting rule" and point at it by id. **The UK page states the
   same caveat in its own words in four places** (the page's opening, the funding-table note, a figures row of its
   own, "Non-melanoma skin cancer in the national statistics: excluded from every all-cancers count", and its
   gaps), with the ONS wording quoted verbatim. It does not link the glossary term, because a `UkPathway` has no
   `terms` field; that is a shape limit, not a missing caveat, and is recorded as a gap.

## 5. The loose ends the agents reported against themselves

| What the agent reported | What the review found | Change |
| --- | --- | --- |
| Glossary terms referenced in prose because they did not exist when the living layer was written: actinic keratosis, Bowen's disease, the H-zone, desmoplastic growth, a keratinocyte cancer alias | Three of the five now exist (`actinic-keratosis`, `keratinocyte-cancer` and the `bowens-disease` record, all from the core layer) and the living layer referenced none of them by id, so five prose mentions of actinic keratosis and five of keratinocyte cancer had no chip and no link | `keratinocyte-cancer`, `actinic-keratosis`, `keratinocyte-cancer-counting` and `cscc-subtype-and-grade` wired onto the three living patches. Desmoplastic growth is covered by `cscc-subtype-and-grade`, now linked |
| The treatment layer wants a Gorlin syndrome term | It exists under another name. `inherited-skin-cancer-syndromes` is titled "Inherited syndromes that cause skin cancer: Gorlin syndrome and xeroderma pigmentosum" and carries "Gorlin syndrome" as its first alias, with the Evans series figures | Wired, rather than a second term written: the patidegib trial and the patidegib drug record now carry it |
| The treatment layer wants an H-zone term | One mention, in the Mohs trial's eligibility. A glossary term for a single use is more surface than a reader needs | Defined in place, in the sentence that uses it: "the H-shaped central band that runs down in front of the ears and across the eyes, nose and lips" |
| There is no plain `sirolimus` drug record although a transplant trial needs one | Confirmed: the corpus held `temsirolimus` and `sirolimus-albumin-bound` and not sirolimus, so TUMORAPA, the one randomised trial in this population, linked to no drug at all | **`sirolimus` written**, in the layer that needs it (`skin-treatment.ts`), with the TUMORAPA figures, the 1999 kidney-transplant approval, the mTOR target and the two related records. TUMORAPA and the transplant glossary term now link to it |
| The dermatology association's squamous cell leaflet is past its stated review date with no newer version at the URL | **Verified four ways** and the agent is right: the page and its PDF both read "NEXT REVIEW DATE APRIL 2025"; the same leaflet at `bad.org.uk` carries the same stamp and a byte-identical PDF; and thirteen Wayback captures since 2024, the most recent 12 June 2026, all say April 2025. No successor exists on either host. Two rows, three glossary passages and a red-card set rest on it, including the 40 and 80 per cent second-primary figures, which no other source the round cites carries | The page now says so. The source label reads "(updated April 2022; the leaflet gives its own next review date as April 2025 and no newer version exists at this address or at bad.org.uk)" in the living layer, the first-60-days checklist and the red-flag set, and the row that quotes it says "review due April 2025 and not yet revised". **A second one was found the same way**: the NHS scars page went past its own review date on 18 September 2026, seven days ago, and now says so |
| Two trial records were written for one trial by two layers and have been merged; check nothing else did the same | **By registry id and by DOI: nothing did.** `scripts/dedupe-survey.ts` finds zero papers sharing a DOI, zero sharing a PubMed id, and only the two legitimate trial pairs the ratchet already allows. The SINS merge is properly registered: `MERGED_RECORDS`, a `vercel.json` redirect and a static stub. **The name pass found one the identifier passes cannot see**: `skin-cancer-in-transplant-recipients` (living layer) and `skin-cancer-after-organ-transplant` (treatment layer) are two glossary records with the **same name**, "Skin cancer after an organ transplant", and overlapping aliases, both written by this round, both on the cutaneous squamous cell carcinoma page | Merged onto `skin-cancer-after-organ-transplant`, which carries the evidence base and eleven backlinks. The living layer's patient-facing reading is now a supplement on it, so nothing is lost. Registered in `MERGED_RECORDS` with a `vercel.json` redirect and a stub, and the ten references repointed |
| One agent could not reach a guideline figure published as an image and used a different sourced table | **Confirmed: no page implies it quotes the figure.** No sentence anywhere in the round attributes a number to a figure, a chart or a graphic, and the numbers that might have come from one, the GIRFT Mohs provision figures, are quoted from that report's own prose ("We found just 79 dermatology doctors carrying out Mohs surgery in England", "fewer than 30 specialist centres", "56 English trusts") and were verified word for word there, not from its Figure 19 | None needed |

## 6. Figures against their sources

Every trial record in the two trial files was checked: **18 records, 16 registry ids, 30 DOIs**. The registry ids
were read from the ClinicalTrials.gov v2 API and the ISRCTN query API, the publications through the Europe PMC REST
API, and two abstracts that Europe PMC truncates at an HTML entity through NCBI eutils.

- **No registry id is wrong, no DOI resolves to the wrong paper, and no acronym is attached to a sister trial.**
  SINS, SCIN, TROG 05.01, C-POST, STEVIE, VISMONEO, ADMEC-O, POD1UM-201, TUMORAPA, AVRIL, the Dutch Mohs trial and
  the Dutch three-arm trial all match the registration and the publication they are attached to.
- **Every figure the brief named checks out to the digit**, including C-POST's hazard ratio 0.32 (0.20 to 0.51) and
  87.1 against 64.1 per cent, ADMEC-O's 0.58 (0.30 to 1.12) correctly described as crossing one, the Dutch trial's
  72.8 / 83.4 / 80.1 and 62.7 / 80.5 / 70.0 with their confidence intervals and arm denominators, SINS at three and
  five years, the Mohs trial at five and ten years with its costs and incremental ratios, STEVIE's 1,215 patients
  and 8.6-month median, cemiplimab in 84 patients with advanced basal cell carcinoma, neoadjuvant cemiplimab in 79,
  TUMORAPA's 22 against 39 per cent and 60 against 14 serious events, and the Dana-Farber twelve.
- **No figure is cited to a guideline paper.** Every `outcomes` source in the two trial files is a trial
  publication. The two BAD guideline papers the round links (`10.1111/bjd.20524`, `10.1111/bjd.19621`) are in
  `links` arrays only, and no claim anywhere is attributed to either, which is the shape review lesson 31 asked for.

Seven problems, all fixed:

| # | What was wrong | Fix |
| --- | --- | --- |
| 1 | **The Mohs trial attributed to the wrong Dutch centre**: "Nijmegen trial", sponsor "Radboud University Nijmegen Medical Centre". ISRCTN65009900's ethics approval, scientific contact and every author of both publications are **Maastricht**; the other two Dutch trials in the same file are correctly attributed to Maastricht | Name, aliases and sponsor corrected |
| 2 | **Three photodynamic trials and two supplements carrying `aminolevulinic-acid`** where the trials used methyl aminolevulinate (see the headline) | The trial records, the term's drug list and the supplements now name `methyl-aminolevulinate`; aminolevulinic acid keeps the family and the glossary term and none of the figures, beside the note that says why |
| 3 | **"The ISRCTN record carries no enrolment figure", twice, and false both times.** ISRCTN79701845 carries a target of 600 and a final enrolment of 601; ISRCTN65009900 carries a target of 612 | Both rewritten to what the registry says |
| 4 | **Recruitment dates that the registry contradicts**: "between March 2008 and August 2010" against a registered recruitment period ending 1 March 2011, with no reachable source for August 2010 | The dates the registry gives are stated as the registry's |
| 5 | **The ten-year outcomes marked as the primary analysis.** ISRCTN65009900's primary outcome is "Recurrence of carcinoma after 5 years follow-up"; the 2014 paper is the long-term extension | The setting says the registry sets the primary analysis at five years and the ten-year report is an extension |
| 6 | **"612 tumours in 565 patients"**, where 565 is in neither publication's abstract nor the registry, and both papers are paywalled | Dropped. The 612 tumours, which both sources carry, stay |
| 7 | **An unsourced series** in the VISMONEO record: "in one series of eight patients only two had complete histological regression". No such series could be found in Europe PMC under any query | Replaced with what is true and checkable: no second randomised trial exists, the published experience is small single-arm series, and no source could be found for how often the histological response matches the clinical one |

Two other findings came from the patient-information pass:

- **Two wrong first authors on real papers.** The BaSQoL quality-of-life paper (Scientific Reports 2024,
  `10.1038/s41598-024-67740-0`) is Van Coile and not Vermeulen; the perineural invasion review (Cancers 2025,
  `10.3390/cancers17243921`) is Morecroft and not Ibrahim. Every figure in both is correct. Both corrected.
- **A silently truncated quotation** in the decision aid, in a `quotes` field, under a lede promising evidence
  "quoted word for word": Bath-Hextall's conclusion was cut from "might still be a useful treatment option for
  small low-risk superficial or nodular basal-cell carcinoma dependent on factors such as patient preference, size
  and site of the lesion, and whether the patient has more than one lesion" to "might still be useful", with no
  ellipsis. Restored in full. Every other quotation in that file is verbatim.
- **Three attributions to a body that does not say it.** "Both the BAD and Cancer Research UK ask people to check
  their own skin monthly": Cancer Research UK names no frequency on either page cited, the BAD does, and the BAD
  leaflet the term linked was the squamous cell one, which says only "from time to time". "The Cochrane review
  records moderate to severe pain and burning during photodynamic therapy": that sentence is Arits 2013 word for
  word and the word "burning" is not in the public Cochrane text. The sunscreen "additional rather than a
  replacement" rule is in the squamous cell and transplant leaflets, not in the sun protection fact sheet cited.
  All three now name the body that says it.

## 7. The UK layer: every non-NICE figure recomputed

Every number in `skin-uk.ts` was read from its cited source and **all eighteen percentages that sit beside a
numerator and a denominator recompute**, worst rounding gap 0.04 points. The three facts the page is built on are
exact: 89,978 of 308,200 urgent suspected cancer referrals in July 2026 (29.19 per cent, and 1.87 times breast);
5,733 skin treatments against the 62-day standard in the same month; and the ONS wording, quoted character for
character. So are the cancer waiting times monitoring guidance's sections 3.2 and 5.10 including the seven basal
cell exclusions and the four out-of-scope conditions, the timed pathway's "around 93 per cent", the GIRFT Mohs and
workforce figures, Public Health Scotland's melanoma-only inclusion list, the Welsh and Northern Irish figures, the
MoleMate trial, the Merkel trial, both genomic test directories down to the indication codes, and the Cancer Drugs
Fund list at page level. Five smaller problems fixed: "three statutory rules" where legislation.gov.uk returns five
and the enumeration must sum to ten; the IMPACT trial recorded as recruiting when ISRCTN10511385 says no longer
recruiting since September 2025; incidence figures attributed to a Cancer Research UK page that gives a different
count and period; a prescription form number that is not on the page cited; and "starts with a second clinical
read" where NHS England says "should consider using it initially with a second clinical read".

## 8. Backlinks, mobile, private data and budgets

- **Backlinks.** All 89 records the four layers write or supplement were listed from the spikes themselves and every
  non-cancer one fetched. **Every one links back into the skin family**, from 2 to 42 inbound links. No orphans.
- **Width at 390 px and console.** Section 1: clean at both widths on 39 routes after the duplicate-link fix.
- **Mobile audit.** `npx tsx scripts/mobile-audit.ts http://localhost:4215`: **35 of 35 checks passed**. As the
  prostate review recorded, the audit has no skin route, so it says nothing about this round either way; it is run
  to show the round broke nothing elsewhere.
- **Private data.** The seven files carry 134 ISO dates over 42 distinct values, of which 71 are the
  25 September 2026 read date and the rest are NICE, ONS, audit, registry and statistics publication dates. Not one
  is a person's. The three "aged" phrases are published cohort statistics. No allele fractions, no case
  descriptions, no ages of individuals, no reference to the private repositories. The only personal names are
  published authors and two UK clinicians with public professional pages. Nothing removed.
- **Budgets**, measured with `renderToStaticMarkup` inside the layout against `HUB_BUDGET_KB` 350 and
  `SUBPAGE_BUDGET_KB` 600. **`skin-cancer`, `basal-cell-carcinoma` and `cutaneous-scc` are now in the `HEAVY` list
  in `src/lib/record-sections.test.ts`**, so these are enforced rather than measured once.

| Page | KB | | Page | KB |
| --- | --- | --- | --- | --- |
| `/cancers/skin-cancer/` (hub) | 212 | | `/cancers/basal-cell-carcinoma/` (hub) | 203 |
| `/cancers/skin-cancer/evidence/` | 102 | | `/cancers/basal-cell-carcinoma/where-you-are/` | 106 |
| `/cancers/skin-cancer/science/` | 80 | | `/cancers/basal-cell-carcinoma/coming/` | 107 |
| `/cancers/skin-cancer/where-you-are/` | 121 | | `/cancers/basal-cell-carcinoma/data/` | 114 |
| `/cancers/skin-cancer/coming/` | 130 | | `/cancers/cutaneous-scc/` (hub) | 210 |
| `/cancers/skin-cancer/data/` | 155 | | `/cancers/cutaneous-scc/data/` | 116 |
| `/cancers/skin-cancer/uk/` | 306 | | `/cancers/merkel-cell-carcinoma/` (hub) | 150 |
| `/cancers/skin-cancer/decisions/` | 181 | | `/cancers/bowens-disease/` (hub) | 129 |

The UK page and the decisions pages have no budget of their own in any test, as the lung and breast reviews
recorded; skin's decisions pages, at 148 to 192 KB, are the smallest of any deep round so far.

## 9. Gates

`npm run -s validate` (18,908 entities OK), `npm run -s typecheck`, `npm run -s lint` (0 errors; the same 5
pre-existing warnings) and `npx vitest run --testTimeout=600000 --hookTimeout=600000` (164 files, 1,780 passed and
1 skipped) pass on the committed state.

One gate caught a real mistake in this review's own work, which is the point of it. `src/lib/supportive-care.test.ts`
reads every drug whose approvals all match the supportive-care rule and requires the flag; the new `sirolimus`
record has one approval, "Prophylaxis of organ rejection in kidney transplant recipients", and the word
"prophylaxis" made the rule read it as supportive care. It is not: it is an immunosuppressant, and it is in the
corpus because switching to it lowers the risk of the next squamous cell carcinoma, which is chemoprevention. It
is now in `SUPPORTIVE_NOT_FLAGGED` with that reason, beside mavorixafor, which is the same shape of exception.

`src/app/nested-anchors.test.ts` timed out twice on its own 120-second limit before passing, which is the breast
review's rule 37 and not a regression: the dev server and the headless Chrome instances were already stopped, but
the machine's load average was 67 from other work. The same two files pass in 72 seconds of wall clock on their
own, and the full suite passes when the machine is quiet.

One gate was tightened and none loosened: the three skin records added to the enforced section budgets.
**No floor was moved.** `scripts/ask-recall.ts` measures extractive retrieval recall at **0.4346** and rubric
**0.6875** after this review, against 0.4326 and 0.6900 before it, and the floor stays at 0.4275: the measurement
is 0.0071 above it, inside the 0.0101 the ratchet allows. Recall rose while text was removed, for the third round
running and for the same reason the breast review found: each removed base line was a second, weaker index entry
competing with the long sourced one for the same question. The measurement is recorded in the file's table with a
dated note.

## Open gaps

- **One drug record covers three different medicines, and a patient reads the wrong one.** `fluorouracil` is
  infusional 5-FU, oral capecitabine and topical Efudix cream in a single record, so
  `/cancers/bowens-disease/` still carries "Bleeding or bruising: bleeding that does not stop by itself" and two
  capecitabine cautions ("take within 30 minutes after a meal", "reduce to 75% for CrCl 30-50") for a reader whose
  treatment is a cream. The `imid` fix removed the worst of it; the rest needs either a separate topical record or
  a route field the red-card builder can read, which is a corpus decision and not a review's.
- **The organ schematic matches subsite keywords as substrings**, so a two-character token (`uv` for the Merkel
  subsite) can claim a subtype string that merely contains it. The skin instance is gone with the folded base
  strings; the mechanism, and the breast review's related finding that 894 subsite captions are over 70 characters,
  are both still there.
- **A `UkPathway` has no `terms` field**, so the skin UK page cannot link the counting caveat by id. It states the
  caveat four times in its own words instead, which is why this is a gap and not a finding.
- **The three keratinocyte red-card sets do not reach `merkel-cell-carcinoma`, `locally-advanced-bcc` or
  `advanced-cutaneous-scc`.** `bowens-disease` was added to them in this pass because its page otherwise had no
  disease card at all; the other three were left, as the breast review left the receptor pages, because whether a
  Merkel cell carcinoma reader should get the keratinocyte wound card is a content decision.
- **The dermatology association's squamous cell leaflet is 17 months past its own review date** and there is no
  successor. The pages now say so. It should be re-read next round, and if the BAD has still not revised it, the
  two figures that exist nowhere else (the 40 and 80 per cent second-primary risks) need a second source.
- **The NHS scars page passed its own review date on 18 September 2026**, seven days ago. Its content was verified
  correct today; it is recorded here so the next round looks again.
- **The five NHS England pages answer a firewall challenge to anything that is not a browser.** They were read
  through the site's own WordPress REST endpoint. This matters for the agentic-accessibility work in
  `docs/LAUNCH.md`: five pages the UK layer cites are readable by a person and not by an agent.
- **`10.1684/ejd.2008.0472` does not resolve at doi.org** although it is the paper's registered identifier. The
  record cites PubMed instead. Worth a second look if the publisher fixes it.
- **Four of the round's accurate prose figures had no citation attached** (the Dutch trial's twelve-month costs,
  STEVIE's Italian cohort, the Belgian transplant cohort, and the Brazilian photodynamic replication). Three now
  name their source in the sentence; none has a link, because these are `replication` fields, which the schema
  renders as prose and not as a sourced row.
- **`public/reviews/models/*.json` for the skin records**, if any exist, predate this pass and would quote the
  folded base rows. They need re-running with the owner's key, as the TNBC, colorectal, lung, prostate and breast
  reviews also recorded.
- The dev-mode hydration attribute mismatch on chip `lang` and `translate` attributes fires on skin pages as it does
  on every other cancer's. It is not from this round and is still unexplained.

## Repeating this review for the next round

Follow the lists at the end of `docs/GALLBLADDER-QA.md`, `docs/TNBC-QA.md`, `docs/PANCREATIC-QA.md`,
`docs/COLORECTAL-QA.md`, `docs/LUNG-QA.md`, `docs/PROSTATE-QA.md` and `docs/BREAST-QA.md`, and add:

38. **Read the red cards on the smallest page in the round, not the biggest.** A cancer with one drug shows every
    card that drug attracts; a cancer with twenty shows the six that sort highest. The lenalidomide boxed warning
    had been on every fluoropyrimidine page in the corpus for six reviews and only became visible on a page whose
    treatment is a cream.
39. **Grep a matching regular expression for substrings that are words inside other words.** `imid` inside
    pyrimidine cost eleven drugs a set of warnings from a different disease. Any `modalityRe` fragment shorter than
    six characters is worth a word boundary and a list of what it currently matches.
40. **Run the duplicate survey's name pass, not only its identifier passes.** Two glossary terms with the same name
    and two ids share no DOI, no PubMed id and no registry id, so the three gates that guard duplication cannot see
    them. `npx tsx scripts/dedupe-survey.ts --names` finds them in one command.
41. **When a round fixes a mis-attribution, check it fixed the records and not only the prose.** The skin round
    moved the photodynamic figures to the right drug and left the trial records, the drug supplements and the
    glossary term pointing at the wrong one, so the drug page still listed three trials of a different cream
    directly under a note saying it was a different cream.
42. **A source label that names the fault is still a label.** "The page answered HTTP 202 with an empty web
    application firewall challenge to OnCo" is a true and useful fact written as a server log. Say it in a
    reader's language, and re-check it before you write it: one of this round's nine access notes no longer
    reproduced.
43. **Check the review date of every patient leaflet, and check for a successor four ways.** The page, the PDF, the
    parent organisation's own copy of the same leaflet, and the Wayback capture index. The round reported one
    lapsed leaflet; the same method found a second, on a page nobody had thought to look at.
44. **A registry record can contradict a "the registry says nothing" claim.** Two records in this round said the
    ISRCTN entry carried no enrolment figure and both entries carry one. The claim that a source is silent is a
    claim about the source and needs the same check as a claim about its contents.
45. **Check the first author, not only the title, the journal and the year.** Two records here named an author who
    is not on the paper, with every figure in both correct. A citation with the wrong author is unfindable by the
    reader who trusts it and passes every gate there is.
