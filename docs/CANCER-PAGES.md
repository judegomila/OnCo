# Cancer pages: what counts as a cancer record

Decided 24 September 2026 for wave 4 of the content roadmap (docs/CONTENT-ROADMAP.md, section 4). This is the rule the
`content:gaps` count of missing cancer pages is read against, and the rule every new `kind: "cancer"` record follows.

## The rule

1. **A cancer record is a tumour entity.** An entity is a histological or molecular tumour type that the WHO
   Classification of Tumours (the Blue Books) or the NCI PDQ summaries name as such: invasive lobular carcinoma, clear
   cell renal cell carcinoma, MYCN-amplified neuroblastoma, hepatosplenic T-cell lymphoma. Genetic tumour syndromes the
   WHO lists in its syndrome chapters (MEN1, MEN2, the hyperparathyroidism-jaw tumour syndrome, Lynch syndrome) count as
   entities when a tumour defines them. Every entity record carries a `parent` (the broader cancer it is a type of) and
   sits in an organ drawing (`src/data/organ-schematics.ts`).
2. **A treatment setting is never a cancer record.** "AML in older unfit patients", "first-line metastatic",
   "relapsed after CAR-T", "resectable stage I to III" describe a moment in one disease, not a disease. Settings live as
   a string in the parent's `subtypes` array, as a `standardOfCare` row, or as a glossary term. The setting pages that
   predate this rule (the `-older-unfit`, `-relapsed`, `-transplant-eligible` and stage records) are kept for their URLs
   and are not added to.
3. **A cross-cutting group keeps no subtypes of its own.** Metastatic cancer, adolescent and young adult cancers,
   childhood cancers, cancer of unknown primary and the other umbrella records group entities by spread, age or
   presentation. They carry an empty `subtypes` array and link to the entities through `related`, so a reader reaches
   the entity page rather than a string. (Cancer of unknown primary is the one umbrella whose subsets, favourable and
   unfavourable, are treated as diseases in guidelines; those two pages stay.)
4. **Molecular subgroups are entities only when a classification names them.** MYCN-amplified neuroblastoma,
   IDH-mutant astrocytoma and the WHO's group 3 and 4 medulloblastoma are entities. Fusion partners of one gene (the
   NUTM1 partners of NUT carcinoma), driver-mutation subsets no classification separates (FGFR3-altered urothelial
   carcinoma) and biomarker-selected trial populations (PD-L1-high squamous cell carcinoma) stay strings.
5. **No invented facts.** Every sentence with a figure names its source in the `links` array or in the sentence; where
   the incidence or the treatment of a subtype is not published, the record says so and states that it is treated as
   its parent. TL;DRs are under 400 characters, in UK spelling and plain English, and name the parent cancer in words
   (`src/lib/cancer-families.test.ts` checks this through `PARENT_PHRASES`; a new parent needs an entry there).

## What every wave 4 record carries

`name`, `aka` (including the exact string the parent's `subtypes` array used, so the gap count recognises the page),
`parent`, `group`, `tldr`, `summary` in four parts (what it is; how it differs from its parent; how common, with the
source; how it is treated, with the trial or guideline cited or "treated as its parent" stated), `burden`, `subtypes`
(the entity's own WHO variants, or empty), `standardOfCare` rows with `refs` that resolve, `drugs` and `trials` found
by searching the corpus for the entity's name, `related` naming the parent and at least one sibling, and `links` to
the WHO, PDQ, Cancer Research UK or Orphanet page and to the papers quoted.

## Files and gates

Records live in `src/data/cancers-wave4-<family>.ts`, registered in `src/data/index.ts`; each new id is added to an
organ drawing in `src/data/organ-schematics.ts`. Gates after each family: `npm run validate && npm run typecheck &&
npm run lint && npx vitest run` (organ mapping, i18n parity, wave 8, orphan ratchet, cancer families, corpus rules).
The checklist in the owner's memory note "OnCo new cancer page checklist" (organ drawing, approval rows, idea maturity
enum, no non-entity refs) applies to every record.

## Judgement calls made in wave 4

Recorded here so the next wave does not re-decide them. Family files carry the detail in their header comments.

- Parents without subtype records (7): extragonadal germ cell tumour gains mediastinal and retroperitoneal pages
  (intracranial disease already has `cns-germ-cell-tumours`); multiple endocrine neoplasia gains MEN1 and MEN2 (MEN4 has
  too few published cases); parathyroid carcinoma gains the hyperparathyroidism-jaw tumour syndrome ("sporadic" and
  "non-functioning" describe the parent); urethral cancer gains its four histologies. Metastatic cancer and AYA cancers
  are cross-cutting groups and lost their subtype strings in favour of links. NUT carcinoma's fusion partners stay strings.
- Lung (`cancers-wave4-lung.ts`): giant-cell carcinoma and large cell carcinoma with rhabdoid phenotype are aliases, not
  pages, because the 2015 and 2021 WHO classifications dropped them as entities; lymphoepithelial carcinoma follows the
  2021 move into squamous cell carcinoma; adult pulmonary blastoma is a sarcomatoid carcinoma and separate from the
  childhood pleuropulmonary blastoma. Adenocarcinoma is named "Adenocarcinoma of the lung" so that the search test's
  "lung" query still ranks the lung cancer page first.
- Breast (`cancers-wave4-breast.ts`): medullary carcinoma is written under its 2019 name (invasive carcinoma of no special
  type with medullary pattern) with the old name as an alias; invasive ductal carcinoma and no special type are one page;
  lobular carcinoma in situ is a page because the WHO lists it beside ductal carcinoma in situ, which already had one.
- Colon, kidney, testis (`cancers-wave4-colon-kidney-testis.ts`): colon cancer is an anatomical entity mirroring the
  rectal cancer page; "malignant oncocytoma" is not a WHO 2022 entity and gets no page; sarcomatoid differentiation is a
  feature, not a type; Leydig and Sertoli cell tumours (sex cord-stromal) sit under the testicular page because it is the
  corpus's organ page; embryonal carcinoma, yolk sac tumour and choriocarcinoma sit under non-seminoma.
- Haematology (`cancers-wave4-haematology.ts`): B-cell prolymphocytic leukaemia was discontinued by WHO-HAEM5 and is
  written under splenic B-cell lymphoma/leukaemia with prominent nucleoli; acute biphenotypic leukaemia is an alias of
  mixed-phenotype acute leukaemia; acute eosinophilic leukaemia and dendritic cell leukaemia are not WHO-HAEM5 entities;
  precursor B lymphoblastic leukaemia is the existing ALL page; orbital lymphoma is a site string on the MALT page.
- Rare tumours (`cancers-wave4-rare.ts`): conventional and chondroid chordoma are the parent page; pineal astrocytoma is a
  glioma by site; PNET and myxosarcoma are retired terms; ganglioneuroma, neurofibroma, adrenocortical adenoma and
  haemangioblastoma are benign and are not cancer records; keratoacanthoma stays a string; the pleuropulmonary blastoma
  entity (types I to III) sits under the corpus's childhood lung tumour umbrella page of the same name.
- Endocrine, thoracic, gynaecological (`cancers-wave4-endocrine-thoracic-gynae.ts`): the five lineage-defined pituitary
  neuroendocrine tumour types of the WHO 2022 endocrine classification are entities (the plurihormonal PIT1 tumour stays a
  string); thymoma types A and AB share a page and B1 and B2 share a page because the WHO and ITMIG treat each pair as one
  prognostic group, while B3 and micronodular thymoma stand alone; "thymoma with myasthenia gravis" is a setting; ciliary
  body and iris melanoma are site variants of uveal melanoma and stay strings.
- Mechanics: `linkSiblings` in `cancers-wave4-shared.ts` gives every new record an inbound `related` link from a sibling
  within the six-sibling cap, so the orphan ratchet holds without hand-edits; every new parent needs a `PARENT_PHRASES`
  entry in `src/lib/cancer-families.test.ts`; TL;DRs are capped at 400 characters by `src/lib/graph.test.ts`.

## The lung family (decided 25 September 2026, during the lung deep spike)

Lung is the hardest family in the corpus to fit to the rule above, because four classifications are in daily use at
once and they do not nest: the WHO Classification of Thoracic Tumours (5th edition, 2021) names the tumour types; the
NCI PDQ summaries use the clinical small-cell / non-small-cell split; that split decides the first fork of treatment;
and the molecular subsets decide the second. The decisions, with the detail in the header of
`src/data/spikes/lung-core.ts`:

1. **`lung-cancer` is the organ family page, not a cross-cutting group.** It keeps its `subtypes` strings and gains
   children, and its `group` moves from `thoracic` to `lung`, leaving `thoracic` holding exactly the thoracic cancers
   that are not lung cancers (mesothelioma and the thymic tumours). It gains a GLOBOCAN mapping (site 15) so the family
   burden rolls up.
2. **`nsclc` and `sclc` gain `parent: "lung-cancer"`.** Neither had a parent before, so the family page had no children
   and `content:gaps` counted it as a parent naming subtypes with no subtype record. "Non-small-cell lung cancer" is not
   a WHO 2021 entity (the Blue Book classifies adenocarcinoma, squamous cell carcinoma and the rest directly) but it is
   a PDQ entity with its own treatment summary, and the rule accepts WHO **or** PDQ. Small cell carcinoma is both.
3. **The ten wave 4 histology pages keep `parent: "nsclc"`.** WHO hangs them off the lung; PDQ and the clinic hang them
   off NSCLC, because histology decides whether a tumour is sequenced and which chemotherapy backbone is safe. Keeping
   them there also keeps the family three deep rather than flattening thirteen records onto one page.
4. **The neuroendocrine spectrum crosses the clinical split, and the corpus splits it by where a reader arrives from.**
   WHO puts typical carcinoid, atypical carcinoid, large cell neuroendocrine carcinoma and small cell carcinoma in one
   chapter. `lung-net` (the carcinoids) stays under `neuroendocrine`, where the somatostatin-analogue pages sit beside
   it; `sclc` sits under `lung-cancer`. `lung-lcnec` is **created** under `lung-cancer` rather than under either, because
   it belongs to neither: WHO classes it with small cell carcinoma, trials have run it both ways, and no guideline
   settles it. All three are cross-linked through `related`.
5. **The molecular subsets are biomarker states, not entities.** EGFR-mutant, ALK-rearranged, ROS1, KRAS G12C, MET exon
   14, RET, BRAF, HER2, NTRK and NRG1 disease are driver subsets of lung adenocarcinoma that no classification separates
   as tumour types, so under rule 4 above they belong to the `biomarker` kind. Ten of them are cancer records in
   `src/data/lung-subtypes.ts`, written before the rule; under rule 2 they are kept for their URLs and **not added to**,
   and the canonical home of each state is its readout in `src/data/biomarker-readouts*.ts`. Nine already had one;
   `nrg1-fusion` was written during the spike so every subset the family names now has a readout. The same holds for
   the four stage records in that file (`resectable-nsclc`, `stage-iii-unresectable-nsclc`, `limited-stage-sclc`,
   `extensive-stage-sclc`): a treatment setting is never a record, they keep their URLs, and no new one is created.
6. **Mesothelioma is not in the family.** It arises from the pleura, WHO gives it its own chapter, the IASLC runs a
   separate staging project for it, and NICE NG12 gives it its own referral rule. It keeps `group: "thoracic"` and no
   lung parent and is not listed among `lung-cancer`'s subtypes. It shares the `lung` organ drawing ("Lungs, pleura and
   mediastinum") because the drawing is anatomy, not taxonomy. The same holds for the thymic tumours and for the
   childhood umbrella `pleuropulmonary-blastoma`, which the parent names as a subtype but which is not a subtype of
   NSCLC or SCLC and is not treated on the adult pathway.
7. **Pancoast (superior sulcus) tumour is a term, not a record.** It is a location and a presentation, not a WHO entity:
   an ordinary non-small-cell lung cancer at the apex of the lung, named for what it invades. The same reasoning keeps
   "combined small-cell carcinoma" a string on the small-cell page rather than a page of its own.

## The prostate family (decided 25 September 2026, during the prostate deep spike)

Prostate is the family where the most classifications are in daily use at once, and unlike lung's four they do not
describe the same axis. A man handed a pathology report in Britain in 2026 is holding five separate classifications:
the histological type (WHO Classification of Tumours, 5th edition, 2022), the grade (Gleason score and the ISUP/WHO
grade groups on top of it), the TNM stage, the risk band (the Cambridge Prognostic Groups here, NCCN's six in the
United States) and the disease state (hormone-sensitive or castration-resistant, metastatic or not). They are
orthogonal: one man is acinar adenocarcinoma, grade group 3, cT2b, Cambridge Prognostic Group 3 and hormone-sensitive
all at once. Only the first is a tumour type, so only the first generates cancer records. The detail is in the header
of `src/data/spikes/prostate-core.ts`.

1. **`prostate` is the organ family page and also the acinar adenocarcinoma page.** Prostatic acinar adenocarcinoma is
   more than 95 percent of prostate cancer (RCPath G084, October 2024), so a separate record would be a near-duplicate
   of the family page. The name is carried in the family page's `aka` and in the glossary term
   `prostate-acinar-adenocarcinoma`, so a reader who types it from a report lands in the right place. This is the
   opposite call from lung, where `lung-cancer` splits into `nsclc` and `sclc` before any histology, because in lung
   that split changes the first treatment decision and in prostate it does not: the first decision is made on grade,
   stage and PSA.
2. **The histology tier holds two records.** `prostate-ductal-adenocarcinoma` is **created**: the fifth edition
   considered folding ductal adenocarcinoma into acinar adenocarcinoma as a subtype and kept it a separate type
   because of its distinctive behaviour and metastatic pattern. `prostate-nepc` already existed and is **not** one of
   the four state records: its subject, treatment-related neuroendocrine prostatic carcinoma, has its own section in
   the WHO fifth edition prostate chapter, so it is a genuine entity and its aliases are widened to the WHO name.
   Adenoid cystic (basal cell) carcinoma, squamous and adenosquamous carcinoma, PIN-like carcinoma (moved in the fifth
   edition from ductal to a subtype of acinar, graded Gleason 6 only) and the prostatic stromal tumours are rare
   enough that a page would be thinner than the parent's section on them, so they stay strings and glossary entries.
   Urothelial carcinoma of the prostatic urethra is in the urinary tract chapter of the same book, not the prostate
   one, so it is not a prostate cancer record here.
3. **Grade generates no records, and a UK report carries both scales.** The Royal College of Pathologists dataset in
   force (G084, version 4, October 2024) sets out the grade groups to be used "in tangent with the Gleason score" and
   its proforma asks for each separately, so the corpus's `gleason-grade-group` term, which says both, is correct. What
   it was missing are the two core items the 2024 revision added and which change management: the percentage of
   Gleason pattern 4 in core biopsies, and the presence of intraductal or invasive cribriform carcinoma. Both are now
   terms. "Gleason 6 prostate cancer" is a grade, not a disease.
4. **Risk bands are settings, and Britain and America use different ones.** NICE NG131 recommendation 1.2.15 asks
   urological cancer MDTs to assign every newly diagnosed localised or locally advanced case a Cambridge Prognostic
   Group from 1 to 5, and the whole of NG131's treatment section is written in those numbers (1.3.8 to 1.3.12). Under
   rule 2 a risk band is never a record; the three localised records in `src/data/prostate-subtypes.ts` predate the
   rule, are kept for their URLs, are not added to, and are instead **mapped**: CPG 1 to `prostate-low-risk`, CPG 2 and
   3 to `prostate-intermediate-risk`, CPG 4 and 5 to `prostate-high-risk`, through aliases and a note on each so that a
   man told "CPG 3" can find his page. The groups gain a glossary term and a staging table (`prostate-cpg`) beside the
   NCCN one already in `src/data/staging.ts`.
5. **Stage and disease state are settings.** `prostate-mhspc`, `prostate-nmcrpc`, `prostate-mcrpc` and `prostate-bcr`
   are kept for their URLs and not added to; no new state record and no molecular-subset record is created. The
   staging facts they hang off are written on the family page instead: UK pathology reports stage against **UICC TNM
   8**, which the RCPath dataset names and reprints; the **9th edition**, published 3 July 2025 and recommended from
   1 January 2026, leaves the prostate T, N and M categories unchanged, clarifies the clinical stage grouping (and
   states there is no pathological stage I) and introduces imaging suffixes, cT2b(mr) and N1(PET), because prostate is
   "probably the malignancy most affected by stage migration"; and **NICE NG131 names no TNM edition at all**, using
   bare T1 to T4 categories that are identical in both editions, so the guideline is not stranded by the change.
