# OncoGuide concept expansion, second round

This data-only proposal adds 36 terms and deepens nine existing records across the seven gap areas identified in the public OncoGuide curriculum audit. It also corrects the content strings of the existing release-testing schematic. No schema, route, ranking or page-layout changes are proposed. Checked 8 November 2026.

Baseline OnCo main: `0f8ebc2569e2dcb023364d8cb6971186f11f59ab`. Public OncoGuide: `7510db6be8053b64708b6c6c037ab1ea564a35ab`. The 31 payload concepts in [draft PR #369](https://github.com/judegomila/OnCo/pull/369) and 29 evidence concepts in [draft PR #371](https://github.com/judegomila/OnCo/pull/371) are separate, unmerged proposals; this patch neither assumes them present nor duplicates their records. [Issue #372](https://github.com/judegomila/OnCo/issues/372) tracks this round.

Data from [OnCo (onco.cc)](https://onco.cc), [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/). Curriculum comparison uses public concept titles, paths and immutable blob hashes only. No patient-specific lesson prose or private-project content is copied.

| Gap area | New terms | Existing owner work |
|---|---:|---|
| Immune measurements | 7 | Flow cytometry |
| Antigen evidence | 8 | Neoantigen; antigen presentation and immunoediting |
| Specimen fitness | 4 | Sample preanalytics |
| RNA constructs | 6 | Existing manufacturing overview remains canonical |
| Recognition modules | 5 | Existing antibody/epitope owners linked |
| Manufacturing evidence | 3 | Release testing; vein-to-vein time; diagram wording |
| Spatial/protein interpretation | 2 | Proteomics; imaging mass cytometry; RPPA |
| Reading map | 1 | Linked from the neoantigen owner |

The [41-lesson crosswalk](curriculum-crosswalk.json) records what changed and where. Most entries add focused distinctions rather than claim comprehensive coverage of an entire lesson. Two are explicitly partial: self-similarity adds cross-recognition evidence but not a full tolerance account; resection specimens add traceability but not a full surgical pathology handling/margins guide. TCR distribution metrics remain descriptive rather than validated response thresholds. This is a bounded teaching-concept pass, not a census of the full 412-file curriculum.

The main corrections remove blanket neoantigen safety, distinguish surface-antigen and peptide-HLA-directed engagers, retain study-specific manufacturing-failure definitions, separate IMC and MIBI, and qualify protein/spatial signal interpretation. The release-testing diagram now follows the same product-specific evidence boundaries as its record; fixed turnaround claims and cytokine-as-killing wording are removed.

The current Term/Technology/Pathway schema can represent these explanations and relationships. Structured specimen preparation, assay conditions, antigen-evidence stage, and delivery-versus-effector target roles remain future schema-design questions. No schema change is needed to make the distinctions readable now.

## Research boundary

Seven Elicit semantic paper searches returned 15 results each (105 result occurrences). Full requests, API endpoint, retrieval timestamps, warnings and responses are in [elicit/](elicit/); this endpoint did not create native Elicit reports. 51 bounded Europe PMC title/DOI lookups supplied independently resolved identities and abstracts. These lookups retain their first response and are not exhaustive paginated literature searches. Every captured identifier has a [primary disposition](primary/identifier-dispositions.json) or [Elicit disposition](elicit/dispositions.json).

Elicit occurrence dispositions: 98 discovery only; not yet independently reviewed, 7 used through independently resolved publication. Discovery results without independent verification remain marked as discovery; 105 results does not mean 105 primary studies reviewed. Reviews, conference items and unrelated alternatives are retained without upgrading their evidence.

No clinical-trial availability, current recruiting status, treatment recommendation, jurisdictional approval or eligibility claim is added. A ClinicalTrials.gov sweep was therefore outside this concept-methods pass. Experiments outside oncology (including CD5-targeted delivery in mouse cardiac fibrosis), mouse findings and yeast normalization evidence are explicitly scoped.

## Reader and custody

- [Source reader](source-reader.md): primary study designs and limits.
- [Source-to-record ledger](source-to-records.json) and [record ledger](record-ledger.json): exact final source usage and changed owners.
- [Query ledger](query-ledger.json): seven semantic searches plus all bounded primary lookups, including zero-result/alternative records.
- [Official-document manifest](primary/official-manifest.json): original byte hashes and exact compressed HTML/JSON; PDFs are URL/hash/section records and are not redistributed.
- [Full-text verification](fulltext-verification.json): two specific BioC checks and three blocked PMC HTML attempts. A reCAPTCHA response is not treated as article text.
- [Rendered-record verification](render-verification.json): 45 actual component renders and the small pages read.
- [Validation](validation.md): actual gates and the existing production-build blocker.

Raw responses retain their original bytes. Gzip archives decompress to the SHA-256 in the official manifest; their stored hashes are separate. PDF hashes identify the fetched files inspected in this run without implying those files are committed. [artifact-manifest.json](artifact-manifest.json) hashes the distributed research artifacts and excludes itself.
