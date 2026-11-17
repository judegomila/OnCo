/**
 * Assay registry rows (src/data/assays.ts) that describe the same product as a test record, so a readout page lists
 * the product once (src/lib/members.ts). Without this, the dMMR page listed "VENTANA MMR RxDx Panel" twice: once from
 * its assay row and once from the test record the mismatch repair rule gathers.
 *
 * Only one-to-one pairs belong here, each checked by name, maker and approval number on 3 November 2026. An assay row
 * that is one kit inside a family record (a therascreen kit inside `therascreen-cdx`, HercepTest inside
 * `her2-testing-assays`) is left out, so the kit keeps its own name. An assay naming exactly one test record in its
 * `drugs` resolves without an entry here.
 */
export const ASSAY_RECORD: Readonly<Record<string, string>> = {
  "pdl1-22c3": "dako-pd-l1-22c3-pharmdx",
  "pdl1-sp142": "ventana-pd-l1-sp142",
  "pdl1-sp263": "ventana-pd-l1-sp263",
  "egfr-cobas-v2": "cobas-egfr-mutation-test",
  "oncomine-dx": "oncomine-dx-target-test",
  "resolution-ctdx-first": "resolution-ctdx-first",
  "guardant360-cdx": "guardant360-cdx",
  "guardant360-liquid-cdx": "guardant360-liquid-cdx",
  "mmr-ventana": "ventana-mmr-rxdx",
  "mychoice-cdx": "mychoice-cdx",
  "bracanalysis-cdx": "bracanalysis-cdx",
  // The record covers both FoundationOne CDx and FoundationOne Liquid CDx under one id.
  "foundationone-cdx-panel": "foundationone-cdx",
  "foundationone-liquid-cdx": "foundationone-cdx",
};
