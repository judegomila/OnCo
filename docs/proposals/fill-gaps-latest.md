# Fill gaps: 26 November 2026

Worklists: issue #336 (weekly refresh, 25 November) and `scripts/gap-audit.ts` output of 26 November. Eight items
filled. Nothing in either worklist or in any fetched page read as an instruction to me, and I followed none.

**I did not run the gates** (validate, typecheck, lint, vitest). This run could only read, edit and fetch.

## Filled

1. `/software/` Citeline row: added `vendorId: "citeline"` in `src/data/software.ts`. Identity check: the company
   record `citeline` (`companies-elicit-map.ts`) and the software row both cite citeline.com.
2. therascreen PDGFRA RGQ PCR Kit: the family record `therascreen-cdx` (`src/data/tests.ts`) now covers it. I
   added PDGFRA to the name, the 2023 approval, target `pdgfra`, drug `avapritinib` and cancer `gist`, and mapped the
   device in `CDX_DEVICE_IDS` (`src/data/biomarker-readouts.ts`), so the row on `pdgfra-exon-18-d842v` now links to
   the record. Sources: openFDA PMA P210002 (applicant QIAGEN GmbH, Hilden; APPR, 2023-06-29; approval statement
   read); FDA companion diagnostic list (avapritinib, GIST, D842V, P210002 06/29/2023).
3. `braf-v600e` readout: added `pgdx-elio-tissue-complete-cdx` to `drugs` (`biomarker-readouts-2.ts`). The FDA row is
   already in `cdx-fda-rows.ts`. Source: FDA CDx list, PGDx row (P250036, 7/30/2026).
4. `ras-wild-type` readout: added `cobas-kras-mutation-test` to `drugs`, plus one summary sentence saying it reads
   KRAS codons 12 and 13 only and is listed for both antibodies. Source: FDA CDx list, two rows (cetuximab and
   panitumumab, "Mutations in codons 12 and 13 of KRAS gene", P140023 05/07/2015).
5. `kras-g12d` readout: added `cobas-kras-mutation-test` to `drugs`, and the same two FDA rows to `cdx-fda-rows.ts`
   (they were already on `ras-wild-type`). Source: the same FDA list rows.
6. `personal-genome-diagnostics`: new company record in `src/data/tests-cdx-devices.ts`, linked from the PGDx device
   record and the PGDx row in `cdx-fda-rows.ts`. Sources: openFDA PMA P250036 (applicant Personal Genome
   Diagnostics, Inc., 3600 Boston St., MD 21224; openFDA misspells the city as "Blatimore"); FDA CDx list. The
   company's own site is not on the allow-list, so the record gives no website, founding year or owner.
   `related: ["labcorp"]` rests on the existing Labcorp record, which says Labcorp Oncology includes it.
7. `her2-ish-amplified` readout: added `her2-cish-pharmdx` to `drugs` (`biomarker-readouts.ts`). This is the ISH
   readout only; the IHC readout was not changed (see below). Source: FDA CDx list, HER2 CISH pharmDx row
   (trastuzumab). The record already carries status `withdrawn`.
8. `bimiralisib`: new drug record in `src/data/companies-monitors-2026-11-orphans.ts`, linked to the existing
   `torqur` company record, whose `drugs` and notes I updated (`companies-new-2026-sponsors.ts`). This comes from the
   issue's EMA orphan designations list (Maxia Strategies-Europe Limited). Sources: the EMA page EU/3/26/3281
   (bimiralisib, thymic epithelial tumours, 20/08/2026, sponsor Maxia Strategies-Europe Limited); ClinicalTrials.gov
   API v2 searches for intervention "bimiralisib" and term "PQR309" (NCT01940133, NCT02483858, NCT02249429,
   NCT03127020, NCT02669511, NCT02850744, NCT02723877, NCT03740100, NCT03120000, NCT06319794); Europe PMC, PMID
   38539472 / DOI 10.3390/cancers16061137 (abstract read: MTD 80 mg continuous, hyperglycaemia 76.2%, one partial
   response). **Reviewer, please check:** the link from bimiralisib to Torqur rests on Torqur's own announcement,
   which the existing `torqur` record cites. I did not re-read it, because torqur.com is not on the allow-list.

## Skipped or left open

- Audit class 3, false matches that I did not apply: BRACAnalysis CDx on `brca-somatic` (it is a germline blood
  test); myChoice CDx and FoundationFocus CDxBRCA on `hrr-gene-mutation` (ovarian claims, while the readout is
  prostate); ONCO/Reveal Dx on `egfr-t790m` (its claim is exon 19 deletion and L858R, not T790M); VENTANA SP263 on
  `pd-l1-ic-score` (its atezolizumab row scores tumour cells, ≥1% TC); HER2 CISH and HER2 FISH pharmDx on
  `her2-ihc-3-plus` (ISH tests on an IHC readout); MMR IHC Panel pharmDx on `msi-high` (it measures dMMR, which has
  its own readout); UroVysion, Vysis ALK and Vysis CLL on `her2-ish-amplified` (only the FISH technology is shared).
- Audit class 3, "in drugs, so only under Connected" (21 rows): the box reads `TUMOUR_TESTS` and `assays`. Fixing
  this means changing what the box reads, which is a product decision for a person, not data.
- Audit class 1, Biogenex Laboratories (maker of InSite Her-2/neu): openFDA's only addresses are from 2002 to 2004
  (San Ramon, CA). I could not confirm where the company is today, and accessdata.fda.gov returned its
  abuse-detection redirect, so I could not read the InSite withdrawal date. No record written. INFORM HER-2/neu and
  SPOT-LIGHT were not attempted; `biomarker-cdx-link.test.ts` uses SPOT-LIGHT as its example.
- Audit class 1, medium first-word matches (Atlas, Civica, Dartmouth lab, Indiana University, Institut Curie and
  CEA, Opentrons Labworks, Peter Yang, Stanford, Stony Brook and Emory, TCIA, Vanderbilt, WHO): left for a person,
  as last week.
- Audit class 1, deal assets HRS-9821, MC-339, ORN-252, AraLinQ and "up to seven preclinical ADCs": the only
  sources are company press releases, which are not on the allow-list.
- Issue, investor portfolios (Abcuro, Alchemab, Alethio, Canbridge, Odyssey, Casma, the YC companies and the
  rest): each needs the company's own site or the portfolio page (racap.com, thirdrockventures.com, company
  domains), none of which is on the allow-list.
- Issue, SEC S-1 and F-1 filers: the business sections are on sec.gov, which is not on the allow-list.
- Issue, other orphan designations: Consilienta GmbH (EU/3/26/3301), OncoVITA (EU/3/26/3297) and Starodub B.V.
  (EU/3/26/3313) were not reached in this run's budget. Wealth Venture US Inc: no developer identified, as on
  4 November.
- Issue, NCI SBIR and STTR awards: reporter.nih.gov is not on the allow-list.
- Issue, stale sources section (evenone-portfolio): skipped as instructed; it needs a fix to the fetcher.
