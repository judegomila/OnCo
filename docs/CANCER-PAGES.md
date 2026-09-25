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
