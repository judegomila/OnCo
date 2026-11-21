import type { CompanyInput } from "@/lib/schema";

/**
 * Tumour sequencing tests side by side: what sample they need, how much of the genome they read, what comes
 * back, and the regulatory status where it is certain. Rendered by /tumour-testing/. A cell is left empty
 * rather than guessed. `drugId` points at the OnCo test record when one exists; `technologies` are the
 * technology pages the row belongs under.
 */
export type SampleType = "tissue" | "blood" | "both";
export type TestScope = "targeted-panel" | "exome" | "exome-transcriptome" | "genome" | "mrd" | "screening";

export const SCOPE_LABEL: Record<TestScope, string> = {
  "targeted-panel": "Targeted panel",
  exome: "Exome",
  "exome-transcriptome": "Exome plus transcriptome",
  genome: "Genome",
  mrd: "MRD (residual disease)",
  screening: "Screening",
};

export const SCOPE_PLAIN: Record<TestScope, string> = {
  "targeted-panel": "Reads a chosen set of cancer genes, usually a few hundred, at high depth.",
  exome: "Reads the protein-coding part of every gene, about one to two per cent of the genome.",
  "exome-transcriptome": "Reads the coding DNA and the RNA, so it also sees which genes are switched on and catches fusions.",
  genome: "Reads all the DNA, including the parts between genes, at lower depth per base.",
  mrd: "Looks in blood for traces of tumour DNA after treatment, to catch relapse early.",
  screening: "Looks in blood for signs of a cancer in someone without symptoms.",
};

/** Regulatory statuses a row can be filtered by; each is read from the `regulatory` strings, never guessed. */
export type RegStatus = "fda" | "ldt" | "ce" | "ruo";
export const REG_LABEL: Record<RegStatus, string> = {
  fda: "FDA approved",
  ldt: "Laboratory-developed test",
  ce: "CE marked",
  ruo: "Research use only",
};
export const REG_ORDER: RegStatus[] = ["fda", "ce", "ldt", "ruo"];

/**
 * Which statuses a test's regulatory strings state. "FDA approved" must appear as the test's own status (a
 * mention of another FDA-approved version, or a Breakthrough Device designation, does not count).
 */
export function regulatoryStatuses(reg: { us?: string; eu?: string }): RegStatus[] {
  const out: RegStatus[] = [];
  const us = reg.us ?? "", eu = reg.eu ?? "";
  if (/\bFDA approved\b/.test(us)) out.push("fda");
  if (/\bCE marked\b/.test(eu)) out.push("ce");
  if (/laboratory-developed test/i.test(us)) out.push("ldt");
  if (/research use only/i.test(us)) out.push("ruo");
  return out;
}

export type TumourTest = {
  id: string;
  name: string;
  /** Company record id. */
  companyId: string;
  sample: SampleType;
  scope: TestScope;
  /** What the report contains, in plain words. */
  returns: string;
  /** Regulatory status by region, only where certain. Empty string means not stated. */
  regulatory: { us?: string; eu?: string };
  /** The test's own page, or the company's site when the test has no stable page. */
  url: string;
  /** OnCo test record, when one exists. */
  drugId?: string;
  technologies: string[];
  note?: string;
};

const t = (x: TumourTest): TumourTest => x;

export const TUMOUR_TESTS: TumourTest[] = [
  t({ id: "bostongene-tumor-portrait", name: "BostonGene Tumor Portrait", companyId: "bostongene", sample: "tissue", scope: "exome-transcriptome",
    returns: "Comprehensive genomic profiling across more than 19,000 genes with tumour mutational burden and microsatellite status, and a classification of the tumour's immune microenvironment from the RNA; PD-L1 and mismatch repair immunohistochemistry can be added.",
    regulatory: { us: "Performed in BostonGene's CAP-accredited, CLIA-certified laboratory" }, url: "https://bostongene.com/providers/tumor-portrait", drugId: "bostongene-tumor-portrait", technologies: ["wes-wgs", "cgp"],
    note: "The immune microenvironment classification is the distinctive part: it groups tumours by how immune cells are arranged, which BostonGene reports alongside the genomics." }),
  t({ id: "tempus-xt", name: "Tempus xT and xT CDx", companyId: "tempus", sample: "both", scope: "targeted-panel",
    returns: "Mutations, copy number and fusions across several hundred genes from tumour tissue with a matched normal sample, plus RNA sequencing for fusions, tumour mutational burden and microsatellite status; xT CDx carries companion diagnostic claims.",
    regulatory: { us: "xT CDx FDA approved (2023); the laboratory xT assay is a laboratory-developed test" }, url: "https://www.tempus.com/", drugId: "tempus-xt-cdx", technologies: ["cgp", "companion-diagnostic"] }),
  t({ id: "tempus-xe", name: "Tempus xE", companyId: "tempus", sample: "tissue", scope: "exome",
    returns: "Whole exome sequencing of more than 19,000 genes in tumour and matched normal DNA, reporting potentially actionable alterations and tumour mutational burden, with possible inherited findings from a limited list of 110 genes that need confirming by a germline test.",
    regulatory: {}, url: "https://www.tempus.com/oncology/genomic-profiling/xe/", drugId: "tempus-xe", technologies: ["wes-wgs"],
    note: "Tempus' page does not state the test's regulatory status." }),
  t({ id: "foundationone-cdx", name: "FoundationOne CDx", companyId: "foundation-medicine", sample: "tissue", scope: "targeted-panel",
    returns: "Substitutions, indels, copy number changes and selected rearrangements in 324 genes, plus tumour mutational burden and microsatellite status, with companion diagnostic claims for a long list of targeted drugs.",
    regulatory: { us: "FDA approved (PMA P170019, 2017)", eu: "CE marked" }, url: "https://www.foundationmedicine.com/test/foundationone-cdx", drugId: "foundationone-cdx", technologies: ["cgp", "companion-diagnostic"] }),
  t({ id: "foundationone-liquid-cdx", name: "FoundationOne Liquid CDx", companyId: "foundation-medicine", sample: "blood", scope: "targeted-panel",
    returns: "Alterations in more than 300 genes from cell-free DNA in a blood draw, including blood tumour mutational burden and microsatellite status, with companion diagnostic claims; a negative result does not rule out the alteration in tissue.",
    regulatory: { us: "FDA approved (PMA P190032, 2020)", eu: "CE marked" }, url: "https://www.foundationmedicine.com/test/foundationone-liquid-cdx", drugId: "foundationone-cdx", technologies: ["liquid-biopsy", "cgp", "companion-diagnostic"] }),
  t({ id: "foundationone-heme", name: "FoundationOne Heme", companyId: "foundation-medicine", sample: "both", scope: "targeted-panel",
    returns: "DNA sequencing of more than 400 genes plus RNA sequencing of more than 250 for gene fusions, for blood cancers such as leukaemias and lymphomas, from blood, bone marrow or tissue, with the variant allele frequency of each finding.",
    regulatory: { us: "Laboratory-developed test (CLIA laboratory); not reviewed or approved by the FDA" }, url: "https://www.foundationmedicine.com/solution/foundationone-heme", drugId: "foundationone-heme", technologies: ["cgp"] }),
  t({ id: "caris-mi-profile", name: "Caris MI Profile", companyId: "caris", sample: "tissue", scope: "exome-transcriptome",
    returns: "Whole exome and whole transcriptome sequencing of more than 23,000 genes with immunohistochemistry for more than 25 tumour proteins, reporting mutations, copy number changes, microsatellite status and tumour mutational burden, matched to approved drugs and trials.",
    regulatory: { us: "Not offered in the United States, the EEA, the EU or Switzerland, according to Caris; the FDA-approved US test is MI Cancer Seek" }, url: "https://www.carislifesciences.com/physicians/physician-tests/mi-profile/", drugId: "caris-mi-profile", technologies: ["wes-wgs", "cgp", "rna-seq"] }),
  t({ id: "caris-mi-cancer-seek", name: "Caris MI Cancer Seek", companyId: "caris", sample: "tissue", scope: "exome-transcriptome",
    returns: "The FDA-approved whole exome and whole transcriptome assay, with companion diagnostic claims for specific drug and cancer pairs alongside the broader profile.",
    regulatory: { us: "FDA approved (2024)" }, url: "https://www.carislifesciences.com/", drugId: "caris-mi-cancer-seek", technologies: ["wes-wgs", "companion-diagnostic"] }),
  t({ id: "guardant360-cdx", name: "Guardant360 CDx", companyId: "guardant-health", sample: "blood", scope: "targeted-panel",
    returns: "Mutations, amplifications and fusions in more than 50 genes from cell-free DNA, with companion diagnostic claims in lung, breast and colorectal cancer; the wider laboratory Guardant360 reports more genes.",
    regulatory: { us: "FDA approved (PMA P200010, 2020)" }, url: "https://guardant360cdx.com/", drugId: "guardant360-cdx", technologies: ["liquid-biopsy", "cgp", "companion-diagnostic"] }),
  t({ id: "guardant-reveal", name: "Guardant Reveal", companyId: "guardant-health", sample: "blood", scope: "mrd",
    returns: "Presence or absence of circulating tumour DNA after surgery or during surveillance, using mutations and methylation without needing a tumour sample first, in colorectal, breast and lung cancer.",
    regulatory: { us: "Laboratory-developed test (CLIA laboratory); Medicare covered in colorectal cancer" }, url: "https://www.guardantcomplete.com/hcp/solutions/guardant-reveal", drugId: "guardant-reveal", technologies: ["mrd-testing", "liquid-biopsy"] }),
  t({ id: "guardant-shield", name: "Guardant Shield", companyId: "guardant-health", sample: "blood", scope: "screening",
    returns: "A positive or negative result for colorectal cancer signal in cell-free DNA, for people at average risk aged 45 and over; a positive result leads to colonoscopy.",
    regulatory: { us: "FDA approved (2024) as a primary colorectal cancer screening option" }, url: "https://shieldcancerscreen.com/", drugId: "shield", technologies: ["liquid-biopsy"] }),
  t({ id: "grail-galleri", name: "Galleri", companyId: "grail", sample: "blood", scope: "screening",
    returns: "Cancer signal detected or not detected from cell-free DNA methylation, with a predicted cancer signal origin when a signal is found; a positive result leads to diagnostic work-up.",
    regulatory: { us: "Laboratory-developed test (CLIA laboratory); premarket approval application submitted January 2026; FDA advisory panel voted 7 to 2 in favour on 23 September 2026, decision pending" }, url: "https://grail.com/galleri-test/", drugId: "galleri", technologies: ["mced", "liquid-biopsy", "methylation-profiling"],
    note: "In the NHS-Galleri randomised trial (Nature Medicine, 22 September 2026) about 1 in 100 tests were positive each year, 58.0, 50.4 and 45.8 percent of positives were cancer across three rounds, and the primary endpoint of fewer stage III/IV diagnoses was not met (incidence rate ratio 1.03, NEJM 2026)." }),
  t({ id: "stratangs", name: "Strata Select (StrataNGS)", companyId: "strata-oncology", sample: "tissue", scope: "targeted-panel",
    returns: "DNA and quantitative RNA sequencing across 437 genes from as little as 2 mm² of tumour, reporting mutations, copy number, fusions, tumour mutational burden, microsatellite status and an Immunotherapy Response Score, with RNA results for antibody-drug conjugate targets.",
    regulatory: { us: "Laboratory-developed test (CLIA laboratory); Medicare covered (stated by Strata in 2023)" }, url: "http://web.archive.org/web/20230620062411/https://strataoncology.com/providers/", drugId: "strata-select", technologies: ["cgp", "rna-seq"],
    note: "Published in 2021 as StrataNGS (429 genes) and presented as Strata Select by 2023. Strata Oncology's website in November 2026 no longer names either, so whether the test is still orderable was not confirmed." }),
  t({ id: "neotype-profiles", name: "NeoGenomics Neo Comprehensive", companyId: "neogenomics", sample: "both", scope: "targeted-panel",
    returns: "DNA and RNA sequencing in one assay of genes associated with most blood cancers (Heme Cancers) or with myeloid disorders only, reporting hotspot mutations and 51 clonal haematopoiesis genes down to 3% variant allele frequency.",
    regulatory: {}, url: "https://www.neogenomics.com/providers/oncology-solutions/hematological-cancer", drugId: "neo-comprehensive", technologies: ["cgp", "reference-laboratories"],
    note: "This row named the NeoTYPE profiles until November 2026; NeoGenomics' provider pages now list Neo Comprehensive for blood cancers and PanTracer for solid tumours and no longer name NeoTYPE." }),
  t({ id: "neogenomics-pantracer", name: "NeoGenomics PanTracer", companyId: "neogenomics", sample: "both", scope: "targeted-panel",
    returns: "Tissue sequencing of 517 genes in DNA and RNA, with microsatellite status, tumour mutational burden and, in the HRD and Pro versions, homologous recombination deficiency; or 514 genes from circulating tumour DNA in a blood draw (PanTracer LBx).",
    regulatory: { us: "New York State approved for PanTracer Tissue and Pro, according to NeoGenomics" }, url: "https://www.neogenomics.com/providers/oncology-solutions/pantracer-portfolio", drugId: "neogenomics-pantracer", technologies: ["cgp", "liquid-biopsy", "reference-laboratories"] }),
  t({ id: "radar-mrd", name: "NeoGenomics RaDaR ST", companyId: "neogenomics", sample: "blood", scope: "mrd",
    returns: "A tumour-informed residual disease result: whole-exome sequencing of the tumour picks up to 48 variants, which are then tracked in blood over time.",
    regulatory: { us: "Laboratory-developed test (CLIA laboratory) with FDA Breakthrough Device designation; Medicare covered for selected breast and head and neck cancer indications and immunotherapy monitoring" }, url: "https://www.neogenomics.com/providers/oncology-solutions/radarst-mrd/", drugId: "radar-mrd", technologies: ["mrd-testing", "liquid-biopsy"] }),
  t({ id: "next-personal", name: "Personalis NeXT Personal", companyId: "personalis", sample: "blood", scope: "mrd",
    returns: "An ultra-sensitive tumour-informed residual disease measurement: whole genome sequencing of the tumour designs a panel of up to about 1,800 variants that is then tracked in blood, reported as tumour DNA level over time.",
    regulatory: { us: "Laboratory-developed test (CLIA laboratory); Medicare covered in breast cancer, non-small cell lung cancer and immunotherapy monitoring" }, url: "https://www.personalis.com/for-clinicians/next-personal-dx/", drugId: "next-personal", technologies: ["mrd-testing", "liquid-biopsy", "wes-wgs"],
    note: "Tempus sells the same test as xM (NeXT Personal Dx); Tempus agreed in July 2026 to acquire Personalis." }),
  t({ id: "oncodetect", name: "Oncodetect (Exact Sciences, Abbott)", companyId: "exact-sciences", sample: "blood", scope: "mrd",
    returns: "A tumour-informed residual disease result. The first version (April 2025) tracked up to 200 variants chosen by whole-exome sequencing; the whole-genome version available from 26 October 2026 tracks up to 5,000.",
    regulatory: { us: "Not FDA cleared or approved; performed in a CLIA-certified laboratory; Medicare covered in stage II-IV colorectal cancer (July 2025)" }, url: "https://abbott.mediaroom.com/2026-10-26-Abbott-launches-whole-genome-sequencing-Oncodetect-R-molecular-residual-disease-MRD-test-to-detect-traces-of-cancer-during-and-after-treatment", drugId: "oncodetect", technologies: ["mrd-testing", "liquid-biopsy", "wes-wgs"] }),
  t({ id: "foundationone-mrd", name: "FoundationOne MRD", companyId: "foundation-medicine", sample: "blood", scope: "mrd",
    returns: "A tumour-informed residual disease result for stage II-III breast cancer: whole-genome sequencing of the tumour finds structural variants, and up to 16 are measured in blood by digital PCR.",
    regulatory: { us: "Laboratory-developed test (SAGA Diagnostics US); Medicare covered for recurrence monitoring in stage II-III breast cancer" }, url: "https://www.foundationmedicine.com/solution/foundationone-mrd", drugId: "foundationone-mrd", technologies: ["mrd-testing", "liquid-biopsy", "wes-wgs"],
    note: "This is SAGA Diagnostics' Pathlight test, renamed when Roche's acquisition of SAGA completed in 2026." }),
  t({ id: "haystack-mrd", name: "Haystack MRD (Quest Diagnostics)", companyId: "haystack-oncology", sample: "blood", scope: "mrd",
    returns: "A tumour-informed residual disease result: whole-exome sequencing of tumour and normal designs a panel of up to 50 variants tracked in blood.",
    regulatory: { us: "Laboratory-developed test (CLIA laboratory) with FDA Breakthrough Device designation in stage II colorectal cancer" }, url: "https://haystackmrd.com/", drugId: "haystack-mrd", technologies: ["mrd-testing", "liquid-biopsy", "wes-wgs"] }),
  t({ id: "navdx", name: "NavDx (Naveris, CareDx)", companyId: "naveris", sample: "blood", scope: "mrd",
    returns: "The amount of tumour tissue modified viral HPV DNA in blood, by digital droplet PCR, for HPV-driven oropharyngeal and anal cancers; no tumour sequencing is needed.",
    regulatory: { us: "Medicare covered for surveillance of HPV-driven oropharyngeal and anal squamous cell cancer" }, url: "https://navdx.com/", drugId: "navdx", technologies: ["cthpv-dna", "mrd-testing", "liquid-biopsy"] }),
  t({ id: "labcorp-plasma-detect", name: "Labcorp Plasma Detect (Genome and ID)", companyId: "labcorp", sample: "blood", scope: "mrd",
    returns: "Tumour-informed residual disease results: Plasma Detect Genome uses whole-genome sequencing for stage III colon cancer; Plasma Detect ID uses an exome-designed panel of 18 to 50 variants for stage I-III breast and stage I-IIIA lung cancer.",
    regulatory: { us: "Not FDA cleared or approved; performed in CLIA-certified laboratories" }, url: "https://www.labcorp.com/oncology/providers/testing-solutions/solid-tumor/mrd", drugId: "labcorp-plasma-detect", technologies: ["mrd-testing", "liquid-biopsy", "wes-wgs"] }),
  t({ id: "precise-mrd", name: "Myriad Precise MRD", companyId: "myriad-genetics", sample: "blood", scope: "mrd",
    returns: "A tumour-informed residual disease result: whole-genome sequencing of the tumour builds a panel of up to 1,000 variants tracked in blood, offered for breast, colorectal and renal cancer.",
    regulatory: {}, url: "https://investor.myriad.com/news-releases/news-release-detail/27436/", drugId: "precise-mrd", technologies: ["mrd-testing", "liquid-biopsy", "wes-wgs"],
    note: "Launched in March 2026; no regulatory or Medicare status was found in Myriad's releases." }),
  t({ id: "truemrd", name: "Veracyte TrueMRD", companyId: "veracyte", sample: "blood", scope: "mrd",
    returns: "A tumour-informed whole-genome residual disease result for muscle-invasive bladder cancer after curative treatment.",
    regulatory: { us: "Medicare covered for recurrence monitoring in muscle-invasive bladder cancer (orderable from June 2026)" }, url: "https://www.veracyte.com/tests/truemrd-mibc/", drugId: "truemrd", technologies: ["mrd-testing", "liquid-biopsy", "wes-wgs"] }),
  t({ id: "tempus-xm-mrd", name: "Tempus xM for MRD (tumour-naive)", companyId: "tempus", sample: "blood", scope: "mrd",
    returns: "Circulating tumour DNA detected or not detected, with a quantitative result, from one blood draw in colorectal cancer, without a tumour sample.",
    regulatory: {}, url: "https://www.tempus.com/oncology/genomic-profiling/xm/", drugId: "tempus-xm-mrd", technologies: ["mrd-testing", "liquid-biopsy"],
    note: "Tempus also sells Personalis' tumour-informed test as xM (NeXT Personal Dx), listed above as NeXT Personal." }),
  t({ id: "trusight-oncology-500", name: "Illumina TruSight Oncology 500", companyId: "illumina", sample: "both", scope: "targeted-panel",
    returns: "A kit laboratories run themselves: DNA variants in 523 genes and RNA fusions in 55 genes, plus tumour mutational burden and microsatellite status; a cell-free DNA version exists for blood.",
    regulatory: { us: "Research use only kit; the in vitro diagnostic version is TruSight Oncology Comprehensive" }, url: "https://www.illumina.com/products/by-type/clinical-research-products/trusight-oncology-500.html", drugId: "trusight-oncology-500", technologies: ["cgp"] }),
  t({ id: "trusight-oncology-comprehensive", name: "Illumina TruSight Oncology Comprehensive", companyId: "illumina", sample: "tissue", scope: "targeted-panel",
    returns: "The in vitro diagnostic form of the TSO 500 content, reporting variants across the same gene set with companion diagnostic claims for fusion-directed drugs.",
    regulatory: { us: "FDA approved (2024)", eu: "CE marked" }, url: "https://www.illumina.com/products/by-type/ivd-products/trusight-oncology-comprehensive.html", drugId: "trusight-oncology-comprehensive", technologies: ["cgp", "companion-diagnostic"] }),
  t({ id: "mychoice-cdx", name: "Myriad myChoice CDx", companyId: "myriad-genetics", sample: "tissue", scope: "targeted-panel",
    returns: "BRCA1 and BRCA2 status and a genomic instability score combining loss of heterozygosity, telomeric allelic imbalance and large-scale transitions, reported together as homologous recombination deficiency status.",
    regulatory: { us: "FDA approved (2019) as a companion diagnostic for PARP inhibitors" }, url: "https://myriad.com/", drugId: "mychoice-cdx", technologies: ["companion-diagnostic"] }),
  t({ id: "signatera", name: "Natera Signatera", companyId: "natera", sample: "blood", scope: "mrd",
    returns: "A tumour-informed residual disease result: whole exome sequencing of the tumour and normal picks 16 patient-specific variants, which are then tracked in serial blood samples and reported as detected or not detected with a level.",
    regulatory: { us: "Laboratory-developed test (CLIA laboratory) with FDA Breakthrough Device designations; its companion diagnostic version, Signatera CDx, received FDA premarket approval P260004 in May 2026 for selecting adjuvant atezolizumab in muscle-invasive bladder cancer" }, url: "https://www.natera.com/oncology/signatera-advanced-cancer-detection/", drugId: "signatera", technologies: ["mrd-testing", "liquid-biopsy"] }),
  t({ id: "altera", name: "Natera Altera", companyId: "natera", sample: "tissue", scope: "exome-transcriptome",
    returns: "Whole exome sequencing of about 20,000 genes and whole transcriptome sequencing of the tumour, reporting mutations, copy number, fusions, tumour mutational burden and microsatellite status, with PD-L1 (22C3) and HER2 immunohistochemistry included; the same sample can seed a Signatera panel.",
    regulatory: { us: "Laboratory-developed test (CLIA laboratory); not cleared or approved by the FDA" }, url: "https://www.natera.com/oncology/altera/", drugId: "altera", technologies: ["wes-wgs", "cgp", "rna-seq"] }),
  t({ id: "oncotype-dx-breast", name: "Exact Sciences Oncotype DX Breast Recurrence Score", companyId: "exact-sciences", sample: "tissue", scope: "targeted-panel",
    returns: "A 21-gene expression Recurrence Score from 0 to 100 for early hormone receptor positive, HER2 negative breast cancer, estimating the benefit of adding chemotherapy to endocrine therapy.",
    regulatory: { us: "Laboratory-developed test (CLIA laboratory)" }, url: "https://www.oncotypeiq.com/", drugId: "oncotype-dx", technologies: ["gene-expression-prognostic-assays"],
    note: "Not a mutation test: it measures expression of 21 genes to predict recurrence risk and chemotherapy benefit." }),
  t({ id: "oncoextra", name: "Exact Sciences OncoExTra", companyId: "exact-sciences", sample: "tissue", scope: "exome-transcriptome",
    returns: "Whole exome and whole transcriptome sequencing of tumour with matched normal, reporting mutations, copy number, fusions, tumour mutational burden and microsatellite status, matched to approved therapies and trials.",
    regulatory: { us: "Laboratory-developed test (CLIA laboratory); not cleared or approved by the FDA" }, url: "https://www.exactsciences.com/cancer-testing/oncoextra", drugId: "oncoextra", technologies: ["wes-wgs", "cgp", "rna-seq"] }),
  t({ id: "omniseq-insight", name: "Labcorp OmniSeq INSIGHT", companyId: "labcorp", sample: "tissue", scope: "targeted-panel",
    returns: "DNA sequencing of 523 genes and RNA sequencing of 55 for fusions and splice variants, reporting mutations, copy number, tumour mutational burden and microsatellite status, with PD-L1 testing available on the same sample.",
    regulatory: { us: "Laboratory-developed test" }, url: "https://www.labcorp.com/oncology/providers/testing-solutions/solid-tumor", drugId: "omniseq-insight", technologies: ["cgp", "reference-laboratories"] }),
];


/** Companies named in the table that had no record. */
export const tumourTestCompanies: CompanyInput[] = [
  // strata-oncology lives in diagnostics-wave1.ts

];
