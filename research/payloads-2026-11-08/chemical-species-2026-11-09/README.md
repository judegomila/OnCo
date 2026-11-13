# Chemical species and conjugate observations

This follow-up checks ten legacy payload rows, nine linker rows and four mechanism-class owners, adds AF-HPA/auristatin F and the DM21-C peptide-linked maytansinoid system, and supplements the existing upifitamab rilsodotin record. The next-generation index links both new cargo designs. The full data draft now contains 65 canonical owners: 34 new records and 31 supplemented existing records. None overlaps the canonical owners in draft #375.

Free drug, attached drug-linker, released catabolite and further metabolite are different objects. The registry contains 46 source-scoped observations: 32 on chemical identity, processing, membrane access, bystander or transporter endpoints, and 14 on named conjugate loading. A loading statement retains the source's range or approximation; it is not converted into a fixed mean or a patient dose. Missing observations stay missing. No row retains an unqualified permeability boolean or a family-wide efflux grade.

The two cargo additions are distinct chemical designs within the tubulin category. The 2015 polyacetal Fleximer-vinca paper is not evidence for 2021 Dolaflexin-AF-HPA composition. The DM51 catabolite has conference-only support in the cited experiment and is not an alias for the attached DM21-C system. The linked IMGC936 registry state does not establish patient benefit. A free-MMAF experiment is not a cys-mcMMAF experiment, and a Lys-MCC-DM1 membrane assay does not measure free DM1. Substrate and inhibition are separate transporter endpoints. The SG3199 label and cell-study ABCG2/BCRP findings are retained together with their contexts.

## Sources and custody

The [source summary](source-summary.json), [publication identities](publication-identities.json), [reading scope](reading-scope.json) and [capture manifest](capture-manifest.json) distinguish 73 requests, 66 successful responses and seven failed requests. Twenty-nine MED abstracts were read completely, five of those with selected full-text passages; twelve additional MED identities were screened on metadata alone. Ten named labels were read in selected sections. These are not claims of whole-paper, whole-label or worldwide programme review.

The [Elicit receipt](elicit-discovery.json) preserves the exact request and custody hash of the complete twelve-result JSON response, retained outside Git. The [46 literature occurrences](literature-dispositions.json) have explicit dispositions and reading depths. Versions of the transporter work are not independent replications. An unresolved conference identity and an inaccessible publisher page are unused, with their boundaries retained. [Registry observations](registry-observations.json) separate an overall study state from current sponsor activity, local access and clinical benefit. No private correspondence or patient material entered the queries or patch.

## Consumers and release boundary

The data branch updates 209 existing translated/simplified summaries and retains 25 explicit missing-entry English fallbacks. They remain machine-assisted and unreviewed by a named speaker. Long-summary caches are accepted only when their existing English-source hash still matches.

The formal optional observation contract, query, comparison reader, glossary evidence disclosure, search/answer handling and Markdown export are in [product draft #376](https://github.com/judegomila/OnCo/pull/376). That product change requires owner review. Data draft #369 alone still has the baseline comparison reader; its old captions and footer do not consume the new observations. Treat these two drafts as an integration dependency for release. No production ship, merge or owner approval is claimed.

Matched static renders use the actual 65 records and comparison page, with the same data in both reader versions. The integration retains all 46 observations in the canonical structured records. HTML, local source bytes and complete discovery responses stay outside Git; receipts contain hashes. These checks do not claim browser hydration, responsive visual review or a hosted preview for this new follow-up.

The wider curriculum, asset, literature and inference audit remains active. This batch does not close the remaining educational sources, broader ambiguous-prose classification or product approval dependencies.
