/**
 * The test and device records that measure a biomarker readout, kept apart from the readout's `drugs` field.
 *
 * On 3 November 2026 a device-fill round wrote these ids into each readout's `drugs` array beside the medicines a result
 * selects, so a readout page listed the tests that measure it and the drugs it chooses as one set. The owner had
 * already objected to exactly that ("atezolizumab in the ctDNA page implies the wrong thing"), and the link-sense audit
 * (scripts/link-sense-audit.ts, rule role/role-mixed) counts it. The link is kept here and written the other way round:
 * src/data/index.ts adds each readout id to the test record's own `related`, so the test names the readout it
 * measures, and the readout's companion diagnostic rows still name each device with its maker and PMA number.
 *
 * Each pairing is the one the round recorded from the FDA companion diagnostic list or the maker's test menu; nothing
 * here is new. Keys are readout ids, values are drug-kind records whose product class is test or device.
 */
export const READOUT_TEST_RECORDS: Record<string, string[]> = {
  "pd-l1-cps": ["pd-l1-ihc-28-8-pharmdx", "omniseq-insight", "caris-mi-profile"],
  "pd-l1-tps": ["omniseq-insight"],
  // ventana-pd-l1-sp142 added 17 November 2026: the FDA list's SP142 NSCLC row reads "TC ≥ 50%" or "IC ≥ 10%" for atezolizumab (P160002/S006).
  "pd-l1-tc-score": ["pd-l1-ihc-28-8-pharmdx", "ventana-pd-l1-sp142"],
  "her2-ihc-3-plus": ["bond-oracle-her2-ihc", "caris-mi-profile"],
  "her2-ish-amplified": ["her2-fish-pharmdx", "pathvysion-her2"],
  "er-status": ["oncotype-dx"],
  "dmmr-ihc": ["mmr-ihc-panel-pharmdx"],
  "msi-high": ["idylla-cdx-msi", "oncomate-msi-dx", "tempus-xt-cdx", "trusight-oncology-500", "strata-select", "omniseq-insight", "altera", "oncoextra", "bostongene-tumor-portrait"],
  "tmb-high": ["caris-mi-cancer-seek", "tempus-xt-cdx", "trusight-oncology-500", "strata-select", "omniseq-insight", "altera", "oncoextra", "bostongene-tumor-portrait", "tempus-xe"],
  "brca-germline": ["mychoice-cdx", "tempus-xt-cdx"],
  "brca-somatic": ["foundationfocus-cdxbrca", "tempus-xt-cdx", "caris-mi-cancer-seek", "trusight-oncology-comprehensive"],
  "hrd-positive": ["caris-mi-profile", "tempus-xt-cdx"],
  // onco-reveal-dx-lung-colon added to both EGFR readouts and to kras-g12d on 17 November 2026: its FDA list rows (P200011, 30 July 2021) read "Exon 19 deletion or exon 21 L858R substitution mutation" in NSCLC tissue and "KRAS wild-type (absence of mutations in codons 12 and 13)" for cetuximab and panitumumab in colorectal tissue. It has no T790M row, so egfr-t790m does not list it.
  // guardant360-liquid-cdx added on 17 November 2026 wherever its FDA list rows (P250027, 19 May 2026) select: osimertinib on "EGFR exon 19 deletions, L858R, and T790M", amivantamab on exon 20 insertions, sotorasib on KRAS G12C, trastuzumab deruxtecan on ERBB2/HER2 activating mutations, elacestrant and imlunestrant on ESR1 mutations, encorafenib on BRAF V600E.
  "egfr-exon-19-deletion": ["tempus-xt-cdx", "trusight-oncology-comprehensive", "caris-mi-cancer-seek", "onco-reveal-dx-lung-colon", "guardant360-liquid-cdx"],
  "egfr-l858r": ["foundationone-cdx", "guardant360-cdx", "tempus-xt-cdx", "trusight-oncology-comprehensive", "onco-reveal-dx-lung-colon", "guardant360-liquid-cdx"],
  "egfr-t790m": ["foundationone-cdx", "guardant360-cdx", "guardant360-liquid-cdx"],
  "egfr-exon-20-insertion": ["oncomine-dx-express", "foundationone-cdx", "tempus-xt-cdx", "trusight-oncology-comprehensive", "guardant360-liquid-cdx"],
  "kras-g12c": ["resolution-ctdx-first", "foundationone-cdx", "tempus-xt-cdx", "trusight-oncology-comprehensive", "caris-mi-cancer-seek", "guardant360-liquid-cdx"],
  "her2-mutation": ["guardant360-liquid-cdx"],
  "ras-wild-type": ["crcdx-ras", "onco-reveal-dx-lung-colon", "guardant360-cdx"],
  // crcdx-ras added 17 November 2026: the FDA list's CRCDx row (P220005, 29 Sept 2023) selects panitumumab on the absence of KRAS and NRAS mutations in exons 2, 3 or 4, which is this readout's panitumumab threshold.
  "kras-g12d": ["foundationone-cdx", "tempus-xt-cdx", "guardant360-cdx", "caris-mi-cancer-seek", "crcdx-ras", "onco-reveal-dx-lung-colon"],
  // Added 17 November 2026: BRACAnalysis CDx is the germline companion diagnostic for olaparib in mCRPC on the FDA list (P140020/S020, 19 May 2020).
  "hrr-gene-mutation": ["bracanalysis-cdx"],
  "braf-v600e": ["cobas-4800-braf-v600", "thxid-braf", "oncomine-dx-target-test", "guardant360-cdx", "foundationone-cdx", "caris-mi-cancer-seek", "tempus-xt-cdx", "trusight-oncology-comprehensive", "guardant360-liquid-cdx"],
  "braf-class-ii-iii": ["foundationone-cdx", "tempus-xt-cdx", "caris-mi-cancer-seek", "trusight-oncology-comprehensive"],
  "braf-fusion": ["tempus-xt-cdx", "trusight-oncology-comprehensive", "caris-mi-profile"],
  "alk-fusion": ["vysis-alk-break-apart-fish", "ventana-alk-d5f3-cdx", "guardant360-cdx", "tempus-xt-cdx", "trusight-oncology-comprehensive", "caris-mi-cancer-seek"],
  "ros1-fusion": ["guardant360-cdx", "tempus-xt-cdx", "trusight-oncology-comprehensive"],
  "ret-fusion": ["tempus-xt-cdx", "guardant360-cdx", "caris-mi-cancer-seek"],
  "ntrk-fusion": ["tempus-xt-cdx", "caris-mi-profile", "oncoextra"],
  "nrg1-fusion": ["foundationone-cdx", "tempus-xt-cdx", "caris-mi-profile", "oncoextra"],
  "met-ex14": ["guardant360-cdx", "tempus-xt-cdx", "trusight-oncology-comprehensive", "caris-mi-profile"],
  "met-amplification-readout": ["foundationone-cdx", "guardant360-cdx", "tempus-xt-cdx", "caris-mi-profile"],
  "met-overexpression": ["ventana-met-sp44"],
  "fgfr2-fusion-rearrangement": ["tempus-xt-cdx", "trusight-oncology-comprehensive", "caris-mi-profile"],
  "fgfr3-alteration": ["foundationone-cdx", "tempus-xt-cdx", "trusight-oncology-comprehensive", "caris-mi-profile"],
  "idh1-r132": ["abbott-realtime-idh1", "foundationone-cdx", "foundationone-heme", "tempus-xt-cdx", "trusight-oncology-comprehensive", "neo-comprehensive"],
  "idh2-mutation": ["abbott-realtime-idh2", "foundationone-heme", "tempus-xt-cdx", "neo-comprehensive"],
  "flt3-itd": ["leukostrat-cdx-flt3", "foundationone-heme", "neo-comprehensive"],
  "flt3-tkd": ["leukostrat-cdx-flt3", "foundationone-heme", "neo-comprehensive"],
  "npm1-mutation": ["foundationone-heme", "neo-comprehensive"],
  "kit-d816v": ["arup-kit-d816v", "foundationone-heme", "neo-comprehensive"],
  "pdgfra-exon-18-d842v": ["foundationone-cdx", "tempus-xt-cdx", "caris-mi-profile"],
  "bcr-abl1-transcript": ["mrdx-bcr-abl", "foundationone-heme"],
  "bcr-abl1-t315i": ["foundationone-heme"],
  "pik3ca-hotspot-mutation": ["guardant360-cdx", "tempus-xt-cdx", "caris-mi-cancer-seek"],
  "akt1-e17k": ["guardant360-cdx", "tempus-xt-cdx"],
  "pten-alteration": ["ventana-pten-sp218", "tempus-xt-cdx", "caris-mi-profile"],
  "esr1-mutation-ctdna": ["foundationone-cdx", "tempus-xt-cdx", "guardant360-liquid-cdx"],
  "cldn18-2-expression": ["ventana-cldn18-43-14a"],
  "folr1-expression": ["ventana-folr1-rxdx"],
  "tp53-del17p": ["vysis-cll-fish", "foundationone-cdx", "foundationone-heme", "tempus-xt-cdx", "neo-comprehensive", "caris-mi-profile"],
  "mycn-amp": ["foundationone-cdx", "caris-mi-profile"],
  "mgmt-promoter-methylation": ["caris-mi-profile", "tempus-xt-cdx"],
  "1p19q-codeletion-readout": ["caris-mi-profile", "foundationone-cdx", "tempus-xt-cdx"],
  "h3-k27m": ["caris-mi-profile", "foundationone-cdx", "tempus-xt-cdx"],
  "hla-a-02-01": ["secore-cdx-hla", "mage-a4-ihc-1f9-pharmdx"],
};
