# Education concepts: from measurement to patient benefit

Checked 8 November 2026. This round applies the public-curriculum gap method beyond ADC payloads: **29 new concepts and five strengthened canonical entries**, drawn from 20 lesson comparisons and additional literature discovery. It is a bounded augmentation, not a claim that every oncology concept or source has been reviewed.

The baseline is OnCo `0f8ebc2569e2dcb023364d8cb6971186f11f59ab`; the public curriculum is OncoGuide `7510db6be8053b64708b6c6c037ab1ea564a35ab`. The earlier payload proposal is separate, so this contribution does not depend on its unmerged records. The linked issue is [OnCo #370](https://github.com/judegomila/OnCo/issues/370). Maintainer triage and scientific review are pending.

| Area | What a reader can now distinguish |
|---|---|
| Drug delivery and mechanisms | Antigen expression, binding-site distribution, internalization, lysosomal transport, engagement and clinically relevant exposure |
| Biomarkers and liquid biopsy | Prognosis versus treatment prediction; variant function versus actionability; blood-cell origin, shedding, molecular sampling, assay design, detection and quantification |
| Functional models | Division-rate bias, growth arrest versus cell death, ATP readouts, on-target attribution, copy-number cutting effects and a model's intended question |
| Clinical evidence | Treatment-selection confounding, immortal time, target-trial design, competing events and transfer to another population |
| Decisions and uncertainty | Qualification context, agreement versus accuracy, cutoff selection, decision curves and inconclusive versus informative negative findings |

Start in the new `measurement-to-benefit-evidence` record. It is a reading map, not a required experimental sequence or a treatment algorithm. The five existing entries link back into the map.

## How the gap method worked

1. Compare the public lesson's educational distinction with the actual OnCo graph, aliases and owning files. A missing page is different from an existing concept that needs explanation or links.
2. Preserve canonical owners. Strengthen biomarker, drug sensitivity, actionability, validation and external-validation entries instead of introducing competing definitions.
3. Search outside the curriculum through four Elicit paper queries and web/identifier searches. Keep discovery separate from source verification.
4. Resolve cited DOI and PubMed identities through Europe PMC, read the supporting abstract, and check selected load-bearing details against raw publisher, NCBI or FDA text.
5. Label the evidence setting. Mouse delivery experiments, cell-line screens, clinical management trials, consensus frameworks and methodological illustrations support different claims.
6. Validate the graph, duplicate survey, link-sense ratchet and rendered record pages. Preserve named gaps where evidence has not been checked.

The source data contain no new clinical thresholds, trial-access claims or approval changes. ClinicalTrials.gov searches were not run for this concept round because it does not assess recruiting programs, eligibility or current treatment availability. Those questions require a separate registry and regulator lane.

## Review artifacts

- [Readable curriculum crosswalk](curriculum-crosswalk.md), [paths, pinned public URLs and hashes](curriculum-crosswalk.json).
- [Readable sources and scope](sources.md), [source-to-record ledger](sources.json), [selected full-text verification](fulltext-verification.json).
- [Every Elicit result and its disposition](elicit-dispositions.json). Four of 80 results were used through independently resolved publications; the other 76 remain discovery, without new corpus claims based on them.
- [Identifier-resolution dispositions](identifier-dispositions.json), [raw response URLs and hashes](primary/capture-manifest.json). Responses are bounded first pages, not complete paginated literature searches. Zero-result and unused queries are retained.
- [New and augmented record inventory](record-inventory.json).
- [Schema observations grounded in the existing biomarker and assay types](schema-observations.md); proposed follow-up only.
- [Validation and rendered-page review](validation.md).

No Elicit hosted report was created. The four links below preserve the actual questions and the complete released-CLI JSON envelopes, including retrieval times and any response metadata.

## Elicit questions and exact responses

### Delivery

Which primary studies distinguish antibody target expression from internalization, endosomal processing, lysosomal payload transport and target engagement, including binding-site barriers and SLC46A3?

[Exact Elicit request and response](elicit/delivery.json), retrieved 2026-11-08T18:38:14.429Z. Returned 20 paper results.

### Evidence Interpretation

Which primary methodological studies establish confounding by indication, immortal-time bias, competing risk analysis, transportability of trial evidence, biomarker cutoff selection bias, decision curve analysis, and interpretation of nonsignificant results in oncology?

[Exact Elicit request and response](elicit/evidence-interpretation.json), retrieved 2026-11-08T18:39:02.410Z. Returned 20 paper results.

### Functional Models

What primary studies distinguish target engagement from cancer dependency and clinical drug response, including growth-rate corrected drug sensitivity, ATP viability assay confounding, CRISPR copy-number artifacts, rescue experiments, and organoid microenvironment retention?

[Exact Elicit request and response](elicit/functional-models.json), retrieved 2026-11-08T18:39:04.282Z. Returned 20 paper results.

### Measurement

What primary studies show limits of cancer biomarker interpretation, including clonal hematopoiesis in plasma DNA, tumor DNA shedding, detection versus quantification limits, prognostic versus predictive biomarkers, and randomized evidence of clinical utility?

[Exact Elicit request and response](elicit/measurement.json), retrieved 2026-11-08T18:41:35.892Z. Returned 20 paper results.

## New concepts

| ID | Concept |
|---|---|
| `measurement-to-benefit-evidence` | Evidence from measurement to patient benefit |
| `antigen-expression-and-response` | Antigen expression and treatment response |
| `binding-site-barrier` | Binding-site barrier in tumor delivery |
| `antibody-internalization-trafficking` | Antibody internalization and intracellular trafficking |
| `lysosomal-payload-egress` | Lysosomal payload transport |
| `drug-target-engagement` | Drug target engagement |
| `experimental-versus-clinical-exposure` | Experimental and clinical drug exposure |
| `prognostic-versus-predictive-biomarkers` | Prognostic and predictive biomarkers |
| `functional-variant-evidence` | Functional evidence for a sequence variant |
| `blood-cell-variants-liquid-biopsy` | Blood-cell variants in liquid biopsy |
| `ctdna-shedding-negative-results` | Tumor DNA shedding and negative plasma results |
| `detection-versus-quantification` | Detection and quantification limits |
| `finite-molecule-sampling` | Finite-molecule sampling in blood tests |
| `tumor-informed-assay-design` | Tumor-informed and tumor-naive assay design |
| `biomarker-qualification-context` | Biomarker qualification and context of use |
| `test-agreement-versus-accuracy` | Test agreement and diagnostic accuracy |
| `growth-rate-inhibition` | Growth-rate correction in drug-response assays |
| `cytostasis-versus-cell-death` | Growth arrest, cell number and cell death |
| `on-target-drug-validation` | On-target validation of drug effects |
| `crispr-copy-number-artifact` | Copy-number artifacts in gene-dependency screens |
| `model-context-of-use` | Context of use for a tumor model |
| `confounding-by-indication` | Confounding by indication |
| `immortal-time-bias` | Immortal time bias |
| `target-trial-emulation` | Target-trial emulation |
| `competing-risks` | Competing events and cumulative incidence |
| `trial-population-transportability` | Transporting trial evidence to another population |
| `biomarker-cutpoint-selection` | Biomarker cutoff selection and validation |
| `decision-curve-net-benefit` | Decision curves and net benefit |
| `inconclusive-and-negative-evidence` | Inconclusive results and evidence against an effect |

## Existing entries strengthened

| Canonical ID | Owning file |
|---|---|
| `biomarker` | `src/data/terms-basics.ts` |
| `drug-response-sensitivity` | `src/data/terms-cansim-oncology.ts` |
| `cancer-drivers-vs-actionable` | `src/data/terms-cansim-oncology.ts` |
| `analytical-vs-clinical-validation` | `src/data/terms-cansim-oncology.ts` |
| `external-validation` | `src/data/terms-cansim-methods.ts` |

The biomarker, actionability and external-validation overstatements are recorded in `CORRECTIONS.md`. Existing calibration, ranking and surrogate-validation concepts were reused, without claiming that every sentence of those records was audited.

## Remaining work

The 76 unused semantic-search results are a research queue, not negative evidence. The full corpus of curriculum lessons has not been exhaustively mapped. Patient-reported outcomes, diagnostic spectrum effects, spatial sampling, pharmacodynamic timing and immunotherapy resistance are plausible next passes; each needs the same ownership and primary-source checks before new claims are added.

Identifiers for classic optimal-cutpoint, absence-of-evidence and Fine–Gray papers resolved, but usable abstracts/full text were not inspected in this run. They were not cited for new claims. The selected cutoff, null-result and competing-risk sources were used with their own scope instead. All additions remain unreviewed contributions until the repository's review process is complete.
