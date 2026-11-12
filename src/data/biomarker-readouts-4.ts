/**
 * Biomarker readouts, part 4: surface antigens that antibodies, ADCs, bispecifics and CAR-T cells aim at (whether or
 * not a label requires the antigen to be shown), TP53 and del(17p), MYCN amplification, MGMT promoter methylation,
 * H3 K27M, ctDNA residual disease, and HLA-A*02:01. Same sourcing rules as biomarker-readouts.ts. Where a label names
 * the antigen only in the drug's description and does not require testing, the record says so and the threshold list
 * is empty.
 */
import type { BiomarkerInput } from "@/lib/schema";
import { b, cdx, FDA_CDX_LABEL, FDA_CDX_URL, LABEL, th } from "./biomarker-readouts";

const CT = (nct: string) => `https://clinicaltrials.gov/study/${nct}`;
const NO_TEST = "The label names the antigen in the drug's description but does not require it to be measured before treatment; no approval threshold exists for this readout.";

/** Research-only readouts supply their own scoring rule rather than inheriting label language. */
const expr = (x: { id: string; name: string; aka: string[]; target: string; tldr: string; summary: string; quote: string; source: string; sourceLabel: string; cancers: string[]; drugs: string[]; forPatient: string; terms?: string[]; related?: string[]; definedBy?: { label: string; url: string }; tests?: string[]; asOf?: BiomarkerInput["asOf"]; notes?: BiomarkerInput["notes"]; links?: BiomarkerInput["links"]; scoringRule?: BiomarkerInput["scoringRule"] }): BiomarkerInput =>
  b({ id: x.id, name: x.name, aka: x.aka, target: x.target, measurement: "ihc-score", tldr: x.tldr, summary: x.summary,
    scoringRule: x.scoringRule ?? { text: NO_TEST, quote: x.quote, source: x.source, sourceLabel: x.sourceLabel }, definedBy: x.definedBy,
    ...(x.asOf !== undefined ? { asOf: x.asOf } : {}), ...(x.notes !== undefined ? { notes: x.notes } : {}),
    cancers: x.cancers, drugs: x.drugs, tests: x.tests, forPatient: x.forPatient, terms: x.terms, related: x.related, links: [{ label: x.sourceLabel, url: x.source }, ...(x.links ?? [])], tags: ["biomarker", "surface-antigen", "no-threshold"] });

export const biomarkerReadouts4: BiomarkerInput[] = [
  // ---- Lineage antigens with a label requirement ----
  b({ id: "cd19-expression", name: "CD19 expression (CD19-positive)", aka: ["CD19-positive", "CD19+", "CD19 expression", "CD19 positive B-ALL", "CD19 loss", "CD19-negative relapse"],
    target: "cd19", measurement: "ihc-score",
    tldr: "CD19 is the B-cell surface protein that blinatumomab, CAR-T cells and several antibodies aim at. Blinatumomab's label requires CD19-positive leukaemia; the CAR-T labels assume it, and losing CD19 is the commonest way the disease escapes.",
    summary: "CD19 is read by flow cytometry on blood or marrow blasts, or by immunohistochemistry on lymphoma tissue. Blinatumomab (Blincyto) is labelled for CD19-positive B-cell precursor ALL (in remission with MRD of 0.1 percent or more, in consolidation, and relapsed or refractory); tisagenlecleucel, axicabtagene ciloleucel, lisocabtagene maraleucel and brexucabtagene autoleucel are CD19-directed CAR-T products whose labels describe the disease by histology rather than by a CD19 threshold; tafasitamab and loncastuximab tesirine are CD19-directed antibodies for DLBCL. Antigen loss or lineage switch after CD19-directed therapy is documented in the labels' clinical sections and is the reason CD22- and CD20-directed options exist.",
    scoringRule: { text: "CD19 detected on leukaemia blasts by flow cytometry (the label states CD19-positive without a percentage); for CAR-T and lymphoma antibodies no measurement is required.", quote: "CD19-positive B-cell precursor acute lymphoblastic leukemia (ALL) in first or second complete remission with minimal residual disease (MRD) greater than or equal to 0.1%.", source: LABEL.blincyto, sourceLabel: "BLINCYTO prescribing information" },
    thresholds: [th({ value: "CD19-positive (flow cytometry, no percentage stated)", drugId: "blinatumomab", cancerId: "all-leukemia", regulator: "FDA", source: LABEL.blincyto, quote: "BLINCYTO is a bispecific CD19-directed CD3 T-cell engager indicated for the treatment of adult and pediatric patients one month and older with: CD19-positive B-cell precursor acute lymphoblastic leukemia (ALL) in first or second complete remission with minimal residual disease (MRD) greater than or equal to 0.1%." })],
    cancers: ["all-leukemia", "all-paediatric-relapsed", "dlbcl", "follicular-lymphoma", "mantle-cell-lymphoma"], drugs: ["blinatumomab", "tisagenlecleucel", "axicabtagene-ciloleucel", "lisocabtagene-maraleucel", "brexucabtagene-autoleucel", "tafasitamab", "zynlonta"],
    forPatient: "Almost every B-cell leukaemia and lymphoma is CD19-positive, so a positive result mainly confirms that blinatumomab, CAR-T cells and the CD19 antibodies are options. If the disease comes back after one of these treatments, CD19 is re-checked, because a CD19-negative relapse needs a treatment aimed at a different target such as CD22.",
    terms: ["flow-cytometry", "antigen-escape", "mrd"], related: ["cd22-expression", "cd20-expression"], links: [{ label: "BLINCYTO prescribing information (DailyMed)", url: LABEL.blincyto }], tags: ["biomarker", "surface-antigen"] }),

  b({ id: "cd20-expression", name: "CD20 expression (CD20-positive)", aka: ["CD20-positive", "CD20+", "CD20 expression", "CD20 positive lymphoma", "CD20 loss"],
    target: "cd20", measurement: "ihc-score",
    tldr: "CD20 is the B-cell antigen rituximab made famous. Rituximab and obinutuzumab labels are written for CD20-positive lymphoma and leukaemia; the newer CD20 x CD3 bispecifics assume it.",
    summary: "CD20 is read by immunohistochemistry or flow cytometry and is present on almost all mature B-cell lymphomas and chronic lymphocytic leukaemia. Rituximab (Rituxan) is labelled as a CD20-directed cytolytic antibody for CD20-positive non-Hodgkin lymphoma and CLL; obinutuzumab (Gazyva) for CLL and follicular lymphoma; mosunetuzumab, glofitamab and epcoritamab are CD20 x CD3 bispecifics labelled by histology. CD20-negative lymphomas (some after rituximab, and entities such as plasmablastic lymphoma) are excluded from the anti-CD20 indications.",
    scoringRule: { text: "CD20 detected on lymphoma or leukaemia cells by immunohistochemistry or flow cytometry; the labels state CD20-positive without a percentage.", quote: "RITUXAN is a CD20-directed cytolytic antibody indicated for the treatment of: Adult patients with Non-Hodgkin's Lymphoma (NHL)", source: LABEL.rituxan, sourceLabel: "Rituxan prescribing information" },
    thresholds: [th({ value: "CD20-positive", drugId: "rituximab", cancerId: "non-hodgkin-lymphoma", regulator: "FDA", source: LABEL.rituxan, quote: "RITUXAN is a CD20-directed cytolytic antibody indicated for the treatment of: Adult patients with Non-Hodgkin's Lymphoma (NHL)", note: "The full indication text specifies CD20-positive follicular, low-grade and diffuse large B-cell lymphoma and CD20-positive CLL." })],
    cancers: ["non-hodgkin-lymphoma", "dlbcl", "follicular-lymphoma", "cll", "mantle-cell-lymphoma", "marginal-zone-lymphoma"], drugs: ["rituximab", "obinutuzumab", "mosunetuzumab", "glofitamab", "epcoritamab"],
    forPatient: "A CD20-positive result is expected in nearly every B-cell lymphoma and means rituximab or obinutuzumab will be part of treatment, with the CD20-directed bispecific antibodies as later options. A CD20-negative result, which can happen after previous rituximab, steers the team to drugs aimed at other targets.",
    terms: ["ihc", "flow-cytometry", "antigen-escape"], related: ["cd19-expression", "cd22-expression"], links: [{ label: "Rituxan prescribing information (DailyMed)", url: LABEL.rituxan }], tags: ["biomarker", "surface-antigen"] }),

  b({ id: "cd22-expression", name: "CD22 expression (CD22-positive)", aka: ["CD22-positive", "CD22+", "CD22 expression", "CD22 positive ALL"],
    target: "cd22", measurement: "ihc-score",
    tldr: "CD22 is a second B-cell antigen, kept even when CD19 is lost. Inotuzumab ozogamicin is labelled for CD22-positive acute lymphoblastic leukaemia.",
    summary: "CD22 is measured by flow cytometry on blasts; more than 90 percent of B-ALL is CD22-positive. Inotuzumab ozogamicin (Besponsa) is a CD22-directed antibody-drug conjugate labelled for relapsed or refractory CD22-positive B-cell precursor ALL in adults and children aged one and over. CD22-directed CAR-T cells are in trials for CD19-negative relapse after blinatumomab or CD19 CAR-T.",
    scoringRule: { text: "CD22 detected on leukaemia blasts by flow cytometry; the label states CD22-positive without a percentage.", quote: "BESPONSA is a CD22-directed antibody and cytotoxic drug conjugate", source: LABEL.besponsa, sourceLabel: "Besponsa prescribing information" },
    thresholds: [th({ value: "CD22-positive", drugId: "inotuzumab-ozogamicin", cancerId: "all-leukemia", regulator: "FDA", source: LABEL.besponsa, note: "Besponsa indication: relapsed or refractory CD22-positive B-cell precursor acute lymphoblastic leukemia in adults and pediatric patients 1 year and older." })],
    cancers: ["all-leukemia", "all-paediatric-relapsed"], drugs: ["inotuzumab-ozogamicin"],
    forPatient: "If your leukaemia is CD22-positive, inotuzumab ozogamicin is an on-label option when the disease has come back or not responded, and it remains usable if CD19 has been lost after blinatumomab or CAR-T. Liver toxicity, especially before a transplant, is the main thing your team will weigh.",
    terms: ["flow-cytometry", "antigen-escape"], related: ["cd19-expression"], links: [{ label: "Besponsa prescribing information (DailyMed)", url: LABEL.besponsa }], tags: ["biomarker", "surface-antigen"] }),

  b({ id: "cd30-expression", name: "CD30 expression (CD30-positive)", aka: ["CD30-positive", "CD30+", "CD30 expression", "CD30-expressing", "CD30 IHC"],
    target: "cd30", measurement: "ihc-score",
    tldr: "CD30 is the antigen of Hodgkin Reed-Sternberg cells and anaplastic large cell lymphoma. Brentuximab vedotin is labelled for Hodgkin lymphoma without a CD30 test and for peripheral T-cell lymphomas that express it.",
    summary: "CD30 is read by immunohistochemistry; classical Hodgkin lymphoma and ALCL are uniformly positive, other T-cell lymphomas variably so. Brentuximab vedotin (Adcetris) is a CD30-directed antibody-drug conjugate labelled for classical Hodgkin lymphoma (first-line with chemotherapy, consolidation, relapsed), systemic ALCL and CD30-expressing peripheral T-cell lymphomas (ECHELON-2 required at least 10 percent of cells positive) and CD30-expressing mycosis fungoides or primary cutaneous ALCL. No numeric threshold appears in the indications.",
    scoringRule: { text: "CD30 detected on tumour cells by immunohistochemistry; the Hodgkin indications assume it, the T-cell lymphoma indications say CD30-expressing without a percentage (ECHELON-2 used 10 percent or more).", quote: "ADCETRIS is a CD30-directed antibody and microtubule inhibitor conjugate indicated for treatment of: • Adult patients with previously untreated Stage III or IV classical Hodgkin lymphoma (cHL), in combination with doxorubicin, vinblastine, and dacarbazine", source: LABEL.adcetris, sourceLabel: "ADCETRIS prescribing information" },
    thresholds: [th({ value: "CD30-expressing (no percentage in the label; ECHELON-2 used >= 10%)", drugId: "brentuximab-vedotin", cancerId: "peripheral-t-cell-lymphoma", regulator: "FDA", source: LABEL.adcetris, note: "Adcetris indication for previously untreated systemic ALCL or other CD30-expressing peripheral T-cell lymphomas in combination with cyclophosphamide, doxorubicin and prednisone." })],
    cancers: ["hodgkin-lymphoma", "peripheral-t-cell-lymphoma", "cutaneous-t-cell-lymphoma"], drugs: ["brentuximab-vedotin"],
    forPatient: "In Hodgkin lymphoma CD30 is taken as read and brentuximab vedotin is an option without further testing. In a T-cell lymphoma the pathologist reports whether the cells express CD30; if they do, brentuximab vedotin with chemotherapy is on label as first treatment.",
    terms: ["ihc"], related: ["cd19-expression"], links: [{ label: "ADCETRIS prescribing information (DailyMed)", url: LABEL.adcetris }], tags: ["biomarker", "surface-antigen"] }),

  b({ id: "cd33-expression", name: "CD33 expression (CD33-positive)", aka: ["CD33-positive", "CD33+", "CD33 expression", "CD33 positive AML"],
    target: "cd33", measurement: "ihc-score",
    tldr: "CD33 is a myeloid antigen on the blasts of about 90 percent of acute myeloid leukaemias. Gemtuzumab ozogamicin's label requires CD33-positive disease.",
    summary: "CD33 is measured by flow cytometry on marrow or blood blasts. Gemtuzumab ozogamicin (Mylotarg) is a CD33-directed antibody-drug conjugate labelled for newly diagnosed CD33-positive AML with chemotherapy in adults and children from one month, and relapsed or refractory CD33-positive AML; the label does not set a percentage, though trials used 20 percent or more of blasts and benefit is greatest in favourable-risk cytogenetics. CD33 is also the target of bispecifics and CAR-T cells in trials.",
    scoringRule: { text: "CD33 detected on leukaemia blasts by flow cytometry; the label states CD33-positive without a percentage.", quote: "MYLOTARG is a CD33-directed antibody and cytotoxic drug conjugate indicated for: • treatment of newly-diagnosed CD33-positive acute myeloid leukemia (AML) in adults and pediatric patients 1 month and older", source: LABEL.mylotarg, sourceLabel: "Mylotarg prescribing information" },
    thresholds: [th({ value: "CD33-positive", drugId: "gemtuzumab-ozogamicin", cancerId: "aml", regulator: "FDA", source: LABEL.mylotarg, quote: "treatment of newly-diagnosed CD33-positive acute myeloid leukemia (AML) in adults and pediatric patients 1 month and older" })],
    cancers: ["aml", "aml-paediatric"], drugs: ["gemtuzumab-ozogamicin"],
    forPatient: "A CD33-positive result, present in most acute myeloid leukaemias, means gemtuzumab ozogamicin can be added to your first chemotherapy or used if the disease returns; it helps most when the leukaemia's chromosomes are in the favourable group, so both results are read together.",
    terms: ["flow-cytometry", "cytogenetics"], related: ["flt3-itd", "npm1-mutation"], links: [{ label: "Mylotarg prescribing information (DailyMed)", url: LABEL.mylotarg }], tags: ["biomarker", "surface-antigen"] }),

  // ---- Antigens the labels name but do not test ----
  expr({ id: "cd38-expression", name: "CD38 expression", aka: ["CD38", "CD38-positive", "CD38 expression myeloma"], target: "cd38",
    tldr: "CD38 is on almost every myeloma cell, so daratumumab and isatuximab are given without testing for it. The stain matters afterwards: CD38 falls after treatment and can confuse flow cytometry and blood typing.",
    summary: "Daratumumab and isatuximab are CD38-directed antibodies labelled for multiple myeloma by line of therapy, not by CD38 level; every label describes the antigen only in the mechanism section. CD38 expression is near-universal on plasma cells and drops for months after anti-CD38 therapy, which is why laboratories use alternative gating in flow cytometry and why the drugs interfere with indirect antiglobulin tests.",
    quote: "DARZALEX is a CD38-directed cytolytic antibody", source: LABEL.darzalex, sourceLabel: "DARZALEX prescribing information (DailyMed)",
    cancers: ["multiple-myeloma", "myeloma-transplant-eligible", "myeloma-transplant-ineligible", "myeloma-relapsed-refractory"], drugs: ["daratumumab", "isatuximab"],
    forPatient: "You will not usually be tested for CD38 before daratumumab or isatuximab; the antigen is present on virtually all myeloma cells. Tell any hospital laboratory you are on an anti-CD38 antibody, because it interferes with blood-matching tests for transfusion.", terms: ["flow-cytometry"], related: ["bcma-expression", "gprc5d-expression"] }),

  expr({ id: "bcma-expression", name: "BCMA expression", aka: ["BCMA", "BCMA-positive", "B-cell maturation antigen expression", "TNFRSF17 expression", "soluble BCMA"], target: "bcma",
    tldr: "BCMA is the plasma-cell antigen behind the myeloma bispecifics and CAR-T cells. None of their labels requires a BCMA test; expression is near-universal, and loss through BCMA gene deletion is a documented escape route.",
    summary: "Teclistamab, elranatamab and linvoseltamab (BCMA x CD3 bispecifics), idecabtagene vicleucel and ciltacabtagene autoleucel (BCMA CAR-T) and belantamab mafodotin (BCMA ADC) are labelled for relapsed or refractory multiple myeloma by prior lines of therapy, with BCMA named in the mechanism of action only. Biallelic TNFRSF17 loss and extracellular-domain mutations after BCMA-directed therapy are reported in the literature and motivate GPRC5D- and FcRH5-directed alternatives.",
    quote: "TECVAYLI is a bispecific B-cell maturation antigen (BCMA)-directed CD3 T-cell engager", source: LABEL.tecvayli, sourceLabel: "TECVAYLI prescribing information (DailyMed)",
    cancers: ["multiple-myeloma", "myeloma-relapsed-refractory"], drugs: ["teclistamab", "elranatamab", "linvoseltamab", "idecabtagene-vicleucel", "ciltacabtagene-autoleucel", "belantamab-mafodotin"],
    forPatient: "No BCMA test is needed before a BCMA bispecific or CAR-T; the antigen is assumed. If myeloma returns after one BCMA-directed treatment, your team may test whether BCMA is still present before choosing another, or move to a drug aimed at GPRC5D.", terms: ["antigen-escape"], related: ["gprc5d-expression", "fcrh5-expression", "cd38-expression"] }),

  expr({ id: "gprc5d-expression", name: "GPRC5D expression", aka: ["GPRC5D", "GPRC5D-positive", "GPRC5D expression myeloma"], target: "gprc5d",
    tldr: "GPRC5D is a receptor on myeloma cells and in hair follicles, nails and taste buds. Talquetamab targets it without any test, and the side effects on skin, nails and taste follow from where it is expressed.",
    summary: "Talquetamab (Talvey) is a GPRC5D x CD3 bispecific labelled for relapsed or refractory multiple myeloma after at least four prior lines; the label names GPRC5D only as the target. Expression on plasma cells is high and independent of BCMA, which is why GPRC5D-directed therapy works after BCMA failure; GPRC5D loss at relapse has been described.",
    quote: "TALVEY is a bispecific GPRC5D-directed CD3 T-cell engager", source: LABEL.talvey, sourceLabel: "TALVEY prescribing information (DailyMed)",
    cancers: ["multiple-myeloma", "myeloma-relapsed-refractory"], drugs: ["talquetamab"],
    forPatient: "Talquetamab is given without a GPRC5D test. Because the same receptor sits in your skin, nails and taste buds, changes in taste, dry mouth, rash and nail problems are expected and are managed rather than treated as a sign the drug is not working.", terms: ["antigen-escape"], related: ["bcma-expression", "fcrh5-expression"] }),

  expr({ id: "fcrh5-expression", name: "FcRH5 expression", aka: ["FcRH5", "FCRL5 expression", "FcRH5-positive"], target: "fcrh5",
    tldr: "FcRH5 is a third myeloma surface target after BCMA and GPRC5D. Cevostamab, the FcRH5 x CD3 bispecific, is in phase 3; no approval or threshold exists yet.",
    summary: "FcRH5 is expressed on nearly all myeloma cells and gained on 1q21. Cevostamab is being tested in the phase 3 CAMMA 2 trial (NCT05535244) against standard combinations in relapsed or refractory myeloma after BCMA-directed therapy; trials enrol without an FcRH5 expression threshold. No regulator has approved an FcRH5-directed drug.",
    quote: "Cevostamab in relapsed or refractory multiple myeloma (CAMMA 2)", source: CT("NCT05535244"), sourceLabel: "ClinicalTrials.gov NCT05535244 (CAMMA 2)", definedBy: { label: "CAMMA 2: cevostamab versus standard therapy in relapsed or refractory multiple myeloma (NCT05535244)", url: CT("NCT05535244") },
    cancers: ["multiple-myeloma", "myeloma-relapsed-refractory"], drugs: ["cevostamab"],
    forPatient: "FcRH5 is not something you will be tested for today; it is the target of cevostamab, an experimental bispecific antibody available in trials for myeloma that has come back after BCMA-directed treatment.", related: ["bcma-expression", "gprc5d-expression"] }),

  b({ id: "cldn18-2-expression", name: "Claudin 18.2 expression (>= 75% of tumour cells, moderate to strong)", aka: ["CLDN18.2", "Claudin 18.2 positive", "CLDN18.2-positive", "claudin 18.2 expression", "CLDN18 IHC", "CLDN18.2 >= 75%"],
    target: "cldn18-2", measurement: "ihc-score",
    tldr: "Claudin 18.2 is a tight-junction protein exposed on stomach cancer cells. Zolbetuximab requires at least 75 percent of tumour cells to stain moderately or strongly, the strictest expression threshold in any current label.",
    summary: "Zolbetuximab (Vyloy) is labelled with fluoropyrimidine and platinum chemotherapy for first-line HER2-negative gastric or GEJ adenocarcinoma whose tumours are CLDN18.2 positive as determined by an FDA-approved test; the SPOTLIGHT and GLOW trials and the VENTANA CLDN18 (43-14A) RxDx Assay define positivity as 75 percent or more of tumour cells with moderate to strong membranous staining. About 38 percent of screened patients met the bar. CLDN18.2 ADCs and CAR-T cells in trials use lower or different cut-offs.",
    scoringRule: { text: "75 percent or more of viable tumour cells with moderate to strong membranous CLDN18 staining on the VENTANA CLDN18 (43-14A) RxDx Assay.", quote: "CLDN18.2 positivity (defined as ≥75% of tumor cells demonstrating moderate to strong membranous CLDN18 staining) was determined by immunohistochemistry on gastric or GEJ tumor tissue specimens from all patients with the VENTANA CLDN18 (43‑14A) RxDx Assay performed in a central laboratory.", source: LABEL.vyloy, sourceLabel: "VYLOY prescribing information" },
    thresholds: [th({ value: ">= 75% of tumour cells with moderate to strong membranous staining", drugId: "zolbetuximab", cancerId: "gastric-cldn18-2-positive", regulator: "FDA", source: LABEL.vyloy, quote: "VYLOY is a claudin 18.2-directed cytolytic antibody and is indicated in combination with fluoropyrimidine- and platinum-containing chemotherapy for the first-line treatment of adults with locally advanced unresectable or metastatic human epidermal growth factor receptor 2 (HER2)-negative gastric or gastroesophageal junction adenocarcinoma whose tumors are claudin (CLDN) 18.2 positive as determined by an FDA-approved test" })],
    cancers: ["gastric", "gastric-cldn18-2-positive", "pancreatic"], drugs: ["zolbetuximab"], assays: ["cldn18-ventana"],
    companionDiagnostics: [cdx("VENTANA CLDN18 (43-14A) RxDx Assay", "Ventana Medical Systems (Roche)", "Gastric or Gastroesophageal Junction (GEJ) Adenocarcinoma - Tissue", ["zolbetuximab"], "P230018 (10/18/2024)", "roche-genentech")],
    forPatient: "If at least three quarters of your stomach cancer cells stain moderately or strongly for claudin 18.2, zolbetuximab can be added to first-line chemotherapy, provided the cancer is HER2-negative. A lower percentage does not qualify under the label, though trials of other claudin 18.2 drugs may accept it. Nausea and vomiting during the first infusions are common and expected.",
    terms: ["ihc"], related: ["her2-ihc-3-plus", "pd-l1-cps"], links: [{ label: "VYLOY prescribing information (DailyMed)", url: LABEL.vyloy }], tags: ["biomarker", "surface-antigen"] }),

  b({ id: "folr1-expression", name: "Folate receptor alpha expression (FRα-positive, PS2+ >= 75%)", aka: ["FRα", "FRa", "folate receptor alpha positive", "FOLR1 expression", "FRα-positive", "PS2+ >= 75%", "FOLR1 IHC"],
    target: "folr1", measurement: "ihc-score",
    tldr: "Folate receptor alpha is a surface protein on most high-grade serous ovarian cancers. Mirvetuximab soravtansine requires FRα-positive disease, scored as at least 75 percent of cells with moderate or strong staining on the Ventana FOLR1 assay.",
    summary: "Mirvetuximab soravtansine (Elahere) is labelled for FRα-positive platinum-resistant epithelial ovarian, fallopian tube or primary peritoneal cancer after one to three prior regimens, selected with an FDA-approved test; the VENTANA FOLR1 (FOLR-2.1) RxDx Assay scores positive at 75 percent or more of viable tumour cells with moderate (2+) or strong (3+) membrane staining (PS2+ >= 75 percent), the SORAYA and MIRASOL definition. About 35 to 40 percent of high-grade serous cancers are FRα-high by this rule.",
    scoringRule: { text: "75 percent or more of viable tumour cells with moderate (2+) or strong (3+) membrane staining intensity (PS2+ >= 75 percent) on the VENTANA FOLR1 (FOLR-2.1) RxDx Assay.", quote: "Select patients for the treatment of platinum-resistant epithelial ovarian, fallopian tube, or primary peritoneal cancer with ELAHERE based on the presence of FRα tumor expression", source: LABEL.elahere, sourceLabel: "ELAHERE prescribing information" },
    thresholds: [th({ value: "FRα-positive (PS2+ >= 75% on the Ventana FOLR1 assay)", drugId: "mirvetuximab-soravtansine", cancerId: "platinum-resistant-ovarian-cancer", regulator: "FDA", source: LABEL.elahere, quote: "ELAHERE ® is indicated for the treatment of adult patients with folate receptor-alpha (FRα) positive, platinum-resistant epithelial ovarian, fallopian tube, or primary peritoneal cancer, who have received one to three prior systemic treatment regimens." })],
    cancers: ["ovarian", "platinum-resistant-ovarian-cancer", "high-grade-serous-ovarian-cancer", "endometrial"], drugs: ["mirvetuximab-soravtansine"], assays: ["folr1-ventana"],
    companionDiagnostics: [cdx("Ventana FOLR1 (FOLR-2.1) RxDx Assay", "Ventana Medical Systems (Roche)", "Epithelial Ovarian Cancer, Fallopian Tube Cancer, or Primary Peritoneal Cancer - Tissue", ["mirvetuximab-soravtansine"], "P220006 (11/14/2022)", "roche-genentech")],
    forPatient: "If your ovarian cancer is platinum-resistant and at least three quarters of the cells stain moderately or strongly for folate receptor alpha, mirvetuximab soravtansine is on label. Eye examinations before and during treatment are required because the drug can blur vision. Lower expression does not qualify under the current label.",
    terms: ["ihc", "platinum-sensitivity"], related: ["brca-somatic", "hrd-positive"], links: [{ label: "ELAHERE prescribing information (DailyMed)", url: LABEL.elahere }], tags: ["biomarker", "surface-antigen"] }),

  b({ measurement: "ihc-score", tags: ["biomarker", "surface-antigen", "no-threshold"],
    scoringRule:{"text":"ASCENT used a validated research immunohistochemistry assay and histochemical H-score in a prespecified exploratory analysis. Its high, medium and low research groups are not a labelled TROP2 cutoff for the U.S. breast indications described here.","quote":"prespecified, exploratory biomarker analysis","source":"https://doi.org/10.1016/j.annonc.2021.06.002","sourceLabel":"Bardia and colleagues, ASCENT exploratory biomarker analysis, 2021"}, notes:["A biopsy samples one lesion at one time. Surface staining does not measure binding, uptake, released active drug, intracellular transport or sensitivity to that drug. Those steps can differ even when two samples have similar staining. Drug-specific mechanistic evidence and clinical evidence are needed before turning expression into a treatment rule.",
"Two retrospective TNBC series used different assays. Jacot's 2025 nonmetastatic series used the Enzo ENZ-ABS380 antibody and H-scores below 100, 100 to 200, and above 200: 225 of 228 tumours had membrane expression and 58.8% were in the strong group. Izci's 2022 series included 685 patients overall, with 589 scored for these groups using Abcam ab227689: 97 high (201 to 300), 149 medium (100 to 200) and 343 low (below 100), or 16.5%, 25.3% and 58.2%. These are assay- and cohort-specific distributions, not harmonised prevalence estimates or validated individual treatment thresholds.",
"Stepan's 2011 transcript and protein survey found substantial TROP2 expression in several essential normal tissues. Tumour enrichment and a current label's lack of a TROP2 selection test answer different questions from accessible normal-tissue expression and the finished product's therapeutic window. A fictional 85%-positive, minimally normal-staining proposal still needs the antibody, cutoff, cohort, positive-cell distribution within tumours, normal tissues and methods, and full-product distribution, processing and response evidence. A single stain or an antigen count does not supply those results."
], links:[{"label":"TRODELVY prescribing information (DailyMed)","url":"https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=57a597d2-03f0-472e-b148-016d7169169d"},{"label":"DATROWAY prescribing information (DailyMed)","url":"https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=2950227c-6230-4ca4-a135-46e44d9424a0"},{"label":"FDA: Trodelvy urothelial indication withdrawal","url":"https://www.fda.gov/drugs/resources-information-approved-drugs/fda-grants-accelerated-approval-sacituzumab-govitecan-advanced-urothelial-cancer"},{"label":"FDA: first-line sacituzumab TNBC indications, June 24, 2026","url":"https://www.fda.gov/drugs/resources-information-approved-drugs/fda-approves-sacituzumab-govitecan-hziy-monotherapy-and-combination-pembrolizumab-first-line"},{"label":"FDA: Dato-DXd TNBC indication, May 22, 2026","url":"https://www.fda.gov/drugs/resources-information-approved-drugs/fda-approves-datopotamab-deruxtecan-dlnk-unresectable-or-metastatic-triple-negative-breast-cancer"},{"label":"ASCENT prespecified exploratory TROP2 analysis: primary populations and subgroup limits","url":"https://pubmed.ncbi.nlm.nih.gov/34116144/"},
{
  "label": "Jacot et al.: assay-defined TROP2 staining in 228 nonmetastatic TNBCs (2025)",
  "url": "https://pubmed.ncbi.nlm.nih.gov/40059728/"
},
{
  "label": "Izci et al.: TROP2 assay and H-score groups in a retrospective TNBC cohort (2022)",
  "url": "https://pubmed.ncbi.nlm.nih.gov/36577919/"
},
{
  "label": "Stepan et al.: TROP2 transcript and protein expression in normal and tumour tissues (2011)",
  "url": "https://pubmed.ncbi.nlm.nih.gov/21551320/"
}
], asOf:"2026-11-11", id: "trop2-expression", name: "TROP2 expression", aka: ["TROP2", "TROP-2", "Trop-2 expression", "TACSTD2 expression", "TROP2 QCS", "TROP2 normalised membrane ratio"], target: "trop2",
    tldr: "TROP2 expression is a measured feature, not a universal ADC selection rule. The current U.S. breast-cancer uses of sacituzumab govitecan and datopotamab deruxtecan do not require a TROP2 test; other treatment requirements still apply.",
    summary: "In ASCENT, a prespecified exploratory analysis used an immunohistochemical H-score to examine TROP2 expression. Results were available for 290 of the 468 patients in the primary population without brain metastases. The authors supported benefit in the high and medium groups and said the low group was too small for a definitive benefit conclusion. This analysis does not establish equal effects at every expression level or a validated universal threshold. A marker association, a randomised treatment comparison and a treatment-by-marker interaction answer different questions.\n\nThe current U.S. breast indications for sacituzumab govitecan and datopotamab deruxtecan do not require a TROP2 selection assay. That regulatory rule does not prove that the target or its delivery is biologically irrelevant. Check the exact drug, subtype, setting and prior treatment. The first-line sacituzumab-pembrolizumab regimen has a separate PD-L1 CPS requirement of at least 10 using an FDA-authorized test. A research H-score or computational membrane score is not automatically an interchangeable clinical selection test.",
    cancers: ["tnbc", "tnbc-metastatic", "breast-hr-positive", "urothelial", "nsclc"], drugs: ["sacituzumab-govitecan", "datopotamab-deruxtecan", "sacituzumab-tirumotecan"],
    forPatient: "A TROP2 result describes the tested sample. It does not by itself tell whether an ADC will work. These two U.S. breast-cancer drug labels do not require a TROP2 test, but the exact subtype, prior treatment and regimen still matter; the first-line sacituzumab-pembrolizumab combination requires its separate PD-L1 result.", terms: ["ihc"], related: ["her2-low", "nectin-4-expression"] }),

  expr({ id: "nectin-4-expression", name: "Nectin-4 expression", aka: ["Nectin-4", "NECTIN4 expression", "Nectin-4 positive", "Nectin-4 H-score"], target: "nectin4",
    tldr: "Nectin-4 is a surface protein targeted by enfortumab vedotin. Its U.S. label does not require a Nectin-4 test; that rule does not guarantee response or safety.",
    summary: "The U.S. PADCEV label defines particular bladder and urothelial cancer uses, combinations and prior-treatment settings without requiring a Nectin-4 expression cutoff. Other eligibility conditions and product warnings still apply. A tissue stain measures the tested sample; it is different from accessible binding, delivered active drug and a useful therapeutic window.\n\nThe 2017 TNBC staining study and the 2025 EV-202 breast cohorts are separate, assay- and population-specific sources. Neither supplies a universal prevalence, a validated individual response threshold or a comparison against a TROP2 ADC.",
    quote: "PADCEV is a Nectin-4-directed antibody and microtubule inhibitor conjugate", source: LABEL.padcev, sourceLabel: "PADCEV prescribing information (DailyMed)",
    cancers: ["urothelial"], drugs: ["enfortumab-vedotin"],
    forPatient: "A Nectin-4 result belongs to the tested sample. The U.S. PADCEV label does not use an expression cutoff to select patients for its labelled uses. That rule does not make the marker biologically irrelevant, demonstrate an individual response or establish normal-tissue safety.", terms: ["ihc", "gene-amplification"], related: ["trop2-expression", "fgfr3-alteration"] ,
"asOf": "2026-11-11",
"notes": [
  "M-Rabet's 2017 study found membranous Nectin-4 staining in 62% of 61 TNBCs and did not detect protein in the adult normal tissues examined by that assay. That negative assay result is not universal normal-tissue absence or a safety advantage. PADCEV, a different finished Nectin-4-directed construct, carries a boxed warning for severe and fatal skin reactions. Keep antibody, preparation, tissue coverage, detection limits, product and exposure with the comparison.",
  "A staining prevalence, activity of an experimental conjugate in a mouse and a response rate in a nonrandomised clinical cohort are different observations. The EV-202 breast-cohort results are on the trial record. Comparing them with a different product's randomised trial or an unrelated tissue survey cannot rank Nectin-4 against TROP2 as an intrinsically better target, a safer target or a more effective clinical choice."
],
"links": [
  {
    "label": "M-Rabet et al.: Nectin-4 staining and experimental conjugate activity (2017)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/27998973/"
  },
  {
    "label": "EV-202: the existing trial record and cohort-specific results",
    "url": "https://clinicaltrials.gov/study/NCT04225117"
  },
  {
    "label": "Giordano et al.: previously treated breast cohorts in phase 2 EV-202 (2025)",
    "url": "https://doi.org/10.1200/OA-25-00053"
  }
]
,
"scoringRule": {
  "text": "The U.S. PADCEV label does not require a Nectin-4 expression threshold for its specified uses. This label rule is separate from research assays and other investigational products.",
  "quote": "PADCEV is a Nectin-4-directed antibody and microtubule inhibitor conjugate",
  "source": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b5631d3e-4604-4363-8f20-11dfc5a4a8ed",
  "sourceLabel": "PADCEV U.S. prescribing information: indications and patient selection"
}
}),

  expr({ id: "her3-expression", name: "HER3 expression", aka: ["HER3", "ERBB3 expression", "HER3-positive", "HER3 IHC"], target: "her3",
    tldr: "HER3 is a signalling partner of EGFR and HER2 present on most lung and breast cancers. Patritumab deruxtecan was studied in EGFR-mutant lung cancer without a HER3 threshold, and no approval exists.",
    summary: "Patritumab deruxtecan showed activity in EGFR-mutant NSCLC after osimertinib (HERTHENA-Lung01, HERTHENA-Lung02, NCT05338970) irrespective of HER3 membrane H-score; the US application received a complete response letter in 2024 on manufacturing grounds and no approval has followed. NRG1 fusions, which signal through HER3, are the selection marker for zenocutuzumab, a separate readout.",
    quote: "HERTHENA-Lung02: patritumab deruxtecan versus platinum-based chemotherapy in EGFR-mutated NSCLC after EGFR TKI", source: CT("NCT05338970"), sourceLabel: "ClinicalTrials.gov NCT05338970 (HERTHENA-Lung02)", definedBy: { label: "HERTHENA-Lung02 (NCT05338970)", url: CT("NCT05338970") },
    cancers: ["nsclc", "breast-cancer"], drugs: ["patritumab-deruxtecan"],
    forPatient: "There is no approved HER3-directed drug and no HER3 test you would routinely have. Patritumab deruxtecan is available only in trials, which enrol on the EGFR mutation rather than on HER3 staining.", related: ["egfr-exon-19-deletion", "her2-ihc-3-plus"] }),

  expr({ id: "b7-h3-expression", name: "B7-H3 (CD276) expression", aka: ["B7-H3", "CD276 expression", "B7-H3 positive"], target: "b7h3",
    tldr: "B7-H3 expression is an assay result. A positive stain does not by itself establish drug activity, safety or eligibility.",
    summary: "B7-H3, also called CD276, has been studied on cancer cells and tumour-associated vessels. Expression in a tissue sample is different from accessible binding, delivered active material and clinical benefit. Preclinical compartment-targeting experiments and clinical trial registrations answer different questions; neither supplies a universal expression threshold or a breast-cancer prevalence estimate.",
    quote: "B7-H3 protein expression", source: CT("NCT06203210"), sourceLabel: "ClinicalTrials.gov NCT06203210 (IDeate-Lung02)", definedBy: { label: "IDeate-Lung02 (NCT06203210)", url: CT("NCT06203210") },
    cancers: ["sclc", "extensive-stage-sclc", "prostate-mcrpc"], drugs: ["ifinatamab-deruxtecan"],
    forPatient: "A B7-H3 staining result does not by itself establish eligibility for ifinatamab deruxtecan. Each study has its own disease, prior-treatment, other eligibility and site requirements; a recruiting entry is not an approval or a promise that a place is available.", related: ["dll3-expression"] ,
"asOf": "2026-11-11",
"notes": [
  "Seaman's 2017 preclinical work compared defined CD276 conjugates in mouse tumour models. The MMAE construct acted on CD276-positive cancer cells but did not effectively ablate tumour vessels; the PBD construct acted on both compartments and eradicated large established tumours and metastases in the reported models. Preserve the particular antibody, payload, compartment and model. This result does not mean that every B7-H3 payload will behave alike or establish the frequency of expression or benefit in people with breast cancer.",
  "In the ClinicalTrials.gov entries checked on 11 November 2026, three named ifinatamab deruxtecan studies were phase 3 and recruiting: NCT06203210 in relapsed small-cell lung cancer, NCT06925737 in metastatic castration-resistant prostate cancer and NCT06644781 in previously treated advanced or metastatic oesophageal squamous-cell cancer. Their diseases and comparators remain separate. Phase and recruitment are dated registry facts, not reported efficacy, an approval decision, guaranteed enrolment or a breast-cancer indication."
],
"links": [
  {
    "label": "Seaman et al.: CD276 cancer-cell and vascular targeting in preclinical models (2017)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/28399408/"
  },
  {
    "label": "ClinicalTrials.gov NCT06925737 (captured 11 November 2026)",
    "url": "https://clinicaltrials.gov/study/NCT06925737"
  },
  {
    "label": "ClinicalTrials.gov NCT06644781 (captured 11 November 2026)",
    "url": "https://clinicaltrials.gov/study/NCT06644781"
  }
]
,
"scoringRule": {
  "text": "The IDeate-Lung02 registry describes B7-H3 protein expression as a research variable. A trial objective is not a universal clinical expression threshold.",
  "quote": "B7-H3 protein expression",
  "source": "https://clinicaltrials.gov/study/NCT06203210",
  "sourceLabel": "ClinicalTrials.gov NCT06203210: secondary objectives"
}
}),

  expr({ id: "dll3-expression", name: "DLL3 expression", aka: ["DLL3", "DLL3-positive", "delta-like ligand 3 expression", "DLL3 IHC"], target: "dll3",
    tldr: "DLL3 sits on the surface of about 85 percent of small-cell lung cancers and almost no normal adult tissue. Tarlatamab is given without a DLL3 test.",
    summary: "Tarlatamab (Imdelltra) is a DLL3 x CD3 bispecific labelled for extensive-stage small-cell lung cancer after platinum chemotherapy; the DeLLphi trials enrolled without DLL3 selection and the label names DLL3 only as the target. DLL3-directed ADCs, radioligands and CAR-T cells in trials likewise do not gate on expression, and a DLL3 PET tracer is under study.",
    quote: "IMDELLTRA is a bispecific delta-like ligand 3 (DLL3)-directed CD3 T-cell engager", source: LABEL.imdelltra, sourceLabel: "IMDELLTRA prescribing information (DailyMed)",
    cancers: ["sclc", "extensive-stage-sclc", "prostate-nepc"], drugs: ["tarlatamab"],
    forPatient: "Tarlatamab does not require a DLL3 test; the target is present in most small-cell lung cancers. Treatment starts in hospital because of the risk of cytokine release in the first cycle.", terms: ["sclc-molecular-subtypes"], related: ["b7-h3-expression"] }),

  expr({ id: "tissue-factor-expression", name: "Tissue factor expression", aka: ["tissue factor", "TF expression", "F3 expression", "tissue factor positive"], target: "tissue-factor",
    tldr: "Tissue factor, the clotting trigger, is overexpressed on cervical and several other cancers. Tisotumab vedotin is labelled for cervical cancer without a tissue factor test.",
    summary: "Tisotumab vedotin (Tivdak) is a tissue factor-directed ADC labelled for recurrent or metastatic cervical cancer after chemotherapy (innovaTV 301); the label names tissue factor only as the target and no expression threshold was used in the trials. Its ocular toxicity mirrors mirvetuximab's and requires the same eye care.",
    quote: "TIVDAK is a tissue factor (TF)-directed antibody and microtubule inhibitor conjugate", source: LABEL.tivdak, sourceLabel: "TIVDAK prescribing information (DailyMed)",
    cancers: ["cervical", "recurrent-metastatic-cervical-cancer"], drugs: ["tisotumab-vedotin"],
    forPatient: "No tissue factor test is done before tisotumab vedotin; the drug is given on the basis of the cancer type. Eye drops and regular eye checks are part of the treatment.", related: ["folr1-expression", "pd-l1-cps"] }),

  expr({ id: "ceacam5-expression", name: "CEACAM5 expression", aka: ["CEACAM5", "CEACAM5-positive", "CEACAM5 high", "CEA cell adhesion molecule 5 expression"], target: "ceacam5",
    tldr: "CEACAM5 is the cell-surface form of the tumour marker CEA, high on many lung and bowel cancers. Tusamitamab ravtansine was tested in CEACAM5-high lung cancer but failed its phase 3 and no approval exists.",
    summary: "The CARMEN-LC03 trial (NCT04154956) selected non-squamous NSCLC with CEACAM5 expression at 2+ intensity in 50 percent or more of tumour cells by IHC; it did not meet its endpoints and development stopped in 2023. Newer CEACAM5 ADCs and bispecifics are in early trials with similar IHC gates. No label names CEACAM5.",
    quote: "CARMEN-LC03: tusamitamab ravtansine versus docetaxel in CEACAM5-positive non-squamous NSCLC", source: CT("NCT04154956"), sourceLabel: "ClinicalTrials.gov NCT04154956 (CARMEN-LC03)", definedBy: { label: "CARMEN-LC03 (NCT04154956): CEACAM5 IHC 2+ in >= 50% of tumour cells", url: CT("NCT04154956") },
    cancers: ["nsclc", "colorectal"], drugs: ["tusamitamab-ravtansine"],
    forPatient: "CEACAM5 staining is not a routine test and no approved drug depends on it; the one late-stage antibody-drug conjugate aimed at it did not succeed. Trials of newer CEACAM5 drugs may use the stain to select patients.", related: ["trop2-expression"] }),

  // ---- TP53, MYCN, MGMT, H3 K27M, ctDNA, HLA ----
  b({ id: "tp53-del17p", name: "TP53 mutation and del(17p)", aka: ["TP53 mutation", "TP53-mutated", "del(17p)", "17p deletion", "17p-", "TP53 aberration", "p53 abnormal", "TP53 disruption", "TP53mut"],
    target: "tp53", measurement: "sequencing-variant",
    tldr: "TP53 mutation, or deletion of the 17p arm that carries the gene, is the single most common change in cancer and carries a worse outlook almost everywhere. In chronic lymphocytic leukaemia it decides treatment: chemotherapy is avoided and venetoclax's first approval was for del(17p) disease.",
    summary: "TP53 status is read by sequencing (mutations in exons 4 to 10) and del(17p) by FISH; in endometrial and other cancers p53 immunohistochemistry (overexpression or complete absence) is the surrogate. Venetoclax (Venclexta) was first approved in 2016 for CLL with 17p deletion as detected by an FDA-approved test, the Vysis CLL FISH Probe Kit being the companion diagnostic; its CLL indications have since broadened to all patients, and guidelines (iwCLL, NCCN) keep TP53 status as the reason to prefer targeted agents over chemoimmunotherapy. In AML and MDS, TP53 mutation defines an adverse-risk group in ELN 2022 and the WHO and ICC 2022 classifications; in endometrial cancer p53-abnormal is one of the four molecular classes.",
    scoringRule: { text: "A pathogenic TP53 mutation by sequencing, deletion of 17p13 by FISH (the Vysis CLL probe set), or an abnormal p53 immunohistochemistry pattern (strong diffuse nuclear overexpression, complete absence, or cytoplasmic staining) as a surrogate.", quote: "TP53: Deletion chromosome 17p (17p-)", source: FDA_CDX_URL, sourceLabel: FDA_CDX_LABEL },
    thresholds: [th({ value: "17p deletion by FISH (historic first indication; the CLL indication is now unrestricted)", drugId: "venetoclax", cancerId: "cll", regulator: "FDA", source: FDA_CDX_URL, quote: "Vysis CLL FISH Probe Kit (Abbott Molecular, Inc.) B-cell Chronic Lymphocytic Leukemia - Peripheral Blood Venclexta (venetoclax) NDA 208573 P150041 (04/11/2016)", status: "historic", note: "The 2016 accelerated approval was for CLL with 17p deletion after at least one prior therapy; the current Venclexta label covers CLL and SLL without a TP53 restriction." })],
    definedBy: { label: "European LeukemiaNet 2022 recommendations for AML (Döhner et al., Blood 2022): TP53 mutation as adverse risk", url: "https://doi.org/10.1182/blood.2022016867" },
    cancers: ["cll", "cll-relapsed", "aml", "mds", "endometrial", "endometrial-p53-abnormal", "tnbc", "ovarian"], drugs: ["venetoclax"], tests: ["foundationone-cdx", "foundationone-heme", "tempus-xt", "neotype-profiles", "caris-mi-profile"],
    companionDiagnostics: [cdx("Vysis CLL FISH Probe Kit", "Abbott Molecular", "B-cell Chronic Lymphocytic Leukemia - Peripheral Blood", ["venetoclax"], "P150041 (04/11/2016)", "abbott")],
    forPatient: "A TP53 mutation or 17p deletion usually means the cancer is harder to treat with chemotherapy. In chronic lymphocytic leukaemia it means your team will choose a BTK inhibitor or venetoclax-based treatment instead of chemoimmunotherapy. In leukaemia and womb cancer it places the disease in a higher-risk group that changes how intensively it is treated and followed.",
    terms: ["tp53-mutated", "del17p-tp53", "li-fraumeni", "fish"], related: ["dmmr-ihc", "idh1-r132"], links: [{ label: "Venclexta prescribing information (DailyMed)", url: LABEL.venclexta }, { label: FDA_CDX_LABEL, url: FDA_CDX_URL }], tags: ["biomarker", "tp53"] }),

  b({ id: "mycn-amp", name: "MYCN amplification", aka: ["MYCN amplification", "MYCN-amplified", "MYCN amp", "N-myc amplification", "MYCN-amplified neuroblastoma", "MYCN FISH"],
    target: "mycn", measurement: "copy-number",
    tldr: "MYCN amplification, more than four times the normal copy number of the gene on FISH, marks the most aggressive fifth of neuroblastomas and puts a child in the high-risk group whatever their age or stage. No drug targets it; it decides how much treatment is given.",
    summary: "The INRG and COG definitions call MYCN amplified when the signal count is more than four times that of the chromosome 2 reference (or more than 10 copies), by FISH on tumour or bone marrow. Amplification is present in about 20 percent of neuroblastomas and assigns high risk in the INRG classification irrespective of other features (except some stage L1 tumours), triggering induction chemotherapy, surgery, tandem transplant, radiotherapy and anti-GD2 immunotherapy with dinutuximab. Dinutuximab's label describes high-risk neuroblastoma without naming MYCN. Amplification also defines a spinal ependymoma subtype and is found in some medulloblastomas.",
    scoringRule: { text: "MYCN signal count more than four times the reference (chromosome 2 centromere or a control probe) by FISH, or more than 10 copies by molecular methods; gain below that is not amplification.", quote: "MYCN status: amplified versus not amplified is a criterion of the International Neuroblastoma Risk Group (INRG) classification", source: "https://doi.org/10.1200/JCO.2008.16.6785", sourceLabel: "Cohn et al., The International Neuroblastoma Risk Group (INRG) classification system, J Clin Oncol 2009" },
    definedBy: { label: "INRG classification system (Cohn et al., J Clin Oncol 2009)", url: "https://doi.org/10.1200/JCO.2008.16.6785" },
    cancers: ["neuroblastoma", "neuroblastoma-high-risk", "neuroblastoma-intermediate-risk"], drugs: ["dinutuximab"], tests: ["foundationone-cdx", "caris-mi-profile"],
    forPatient: "If your child's neuroblastoma is MYCN-amplified it is treated as high risk with the full programme of chemotherapy, surgery, stem cell rescue, radiotherapy and immunotherapy, even when the tumour is small or the child is young. There is no drug aimed at MYCN itself yet, though trials of indirect approaches are open.",
    terms: ["mycn-amplification", "gene-amplification", "fish", "segmental-chromosomal-aberrations"], related: ["tp53-del17p"], links: [{ label: "INRG classification (Cohn et al. 2009)", url: "https://doi.org/10.1200/JCO.2008.16.6785" }, { label: "Unituxin prescribing information (DailyMed)", url: LABEL.unituxin }], tags: ["biomarker", "paediatric", "no-approval"] }),

  b({ id: "mgmt-promoter-methylation", name: "MGMT promoter methylation", aka: ["MGMT methylation", "MGMT methylated", "MGMT promoter methylated", "MGMT unmethylated", "methylated MGMT", "MGMT status"],
    target: "mgmt-protein", measurement: "methylation",
    tldr: "Methylation of the MGMT promoter switches off the repair enzyme that undoes temozolomide's damage. Methylated glioblastomas live longer on temozolomide; unmethylated ones gain little, and trials now use the result to spare or intensify chemotherapy.",
    summary: "Methylation-specific PCR, pyrosequencing or methylation arrays report the promoter as methylated or unmethylated, with laboratory-specific cut-offs (pyrosequencing commonly 10 percent). The temozolomide (Temodar) label for newly diagnosed glioblastoma does not require MGMT testing; the EORTC/NCIC trial that established the regimen showed the survival benefit concentrated in methylated tumours (Hegi et al., NEJM 2005), and EANO and NCCN guidelines recommend testing, with omission of temozolomide an option for elderly patients with unmethylated tumours. The CeTeG/NOA-09 trial (NCT01149109) tested lomustine plus temozolomide only in methylated glioblastoma.",
    scoringRule: { text: "Promoter methylation of MGMT by methylation-specific PCR (methylated versus unmethylated) or pyrosequencing (laboratory cut-off, often around 10 percent mean methylation across CpG sites); no label defines a threshold.", quote: "MGMT promoter methylation status was associated with benefit from temozolomide in the EORTC 26981/22981 NCIC CE.3 trial", source: "https://doi.org/10.1056/NEJMoa043331", sourceLabel: "Hegi et al., MGMT gene silencing and benefit from temozolomide in glioblastoma, N Engl J Med 2005" },
    definedBy: { label: "Hegi et al., N Engl J Med 2005 (EORTC 26981/22981 NCIC CE.3 correlative study)", url: "https://doi.org/10.1056/NEJMoa043331" },
    cancers: ["glioblastoma", "idh-mutant-astrocytoma"], drugs: ["temozolomide"], tests: ["caris-mi-profile", "tempus-xt"],
    forPatient: "A methylated MGMT result means temozolomide is more likely to help and is a reason to give it in full; an unmethylated result means the benefit is small, and for older patients radiotherapy alone or a trial may be discussed. The result does not change surgery or radiotherapy and is not a drug approval criterion.",
    terms: ["mgmt", "alkylating-agent"], related: ["idh1-r132", "1p19q-codeletion-readout", "h3-k27m"], links: [{ label: "Hegi et al. 2005", url: "https://doi.org/10.1056/NEJMoa043331" }, { label: "TEMODAR prescribing information (DailyMed)", url: LABEL.temodar }], tags: ["biomarker", "methylation", "no-approval"] }),

  b({ id: "1p19q-codeletion-readout", name: "1p/19q codeletion", aka: ["1p/19q codeletion", "1p19q codeleted", "1p/19q co-deletion", "1p19q", "whole-arm 1p/19q loss", "oligodendroglioma marker"],
    measurement: "copy-number", noParentReason: "Whole-arm loss of chromosome arms 1p and 19q: hundreds of genes, no single parent gene or protein.",
    tldr: "Loss of one copy each of chromosome arms 1p and 19q, together with an IDH mutation, defines oligodendroglioma in the WHO 2021 classification. It predicts a slower course and a good response to chemotherapy, and separates oligodendroglioma from astrocytoma.",
    summary: "The whole-arm codeletion is detected by FISH, array or sequencing-based copy-number analysis; partial deletions do not count. WHO CNS5 (2021) requires IDH mutation plus 1p/19q codeletion for the diagnosis of oligodendroglioma, IDH-mutant and 1p/19q-codeleted, grades 2 to 3. The long-term RTOG 9402 and EORTC 26951 results showed that adding PCV chemotherapy to radiotherapy roughly doubled survival in codeleted tumours. Vorasidenib's label covers grade 2 oligodendroglioma by IDH mutation, not by codeletion. As an arm-level change it has no single parent gene and sits under no target here.",
    scoringRule: { text: "Loss of the whole short arm of chromosome 1 and the whole long arm of chromosome 19 by FISH, chromosomal microarray or sequencing copy-number analysis, in a tumour with an IDH1 or IDH2 mutation.", quote: "Oligodendroglioma, IDH-mutant, and 1p/19q-codeleted", source: "https://doi.org/10.1093/neuonc/noab106", sourceLabel: "Louis et al., The 2021 WHO Classification of Tumors of the Central Nervous System, Neuro-Oncology 2021" },
    definedBy: { label: "WHO CNS5 classification (Louis et al., Neuro-Oncology 2021)", url: "https://doi.org/10.1093/neuonc/noab106" },
    cancers: ["oligodendroglioma", "glioblastoma", "idh-mutant-astrocytoma"], drugs: ["vorasidenib", "temozolomide"], tests: ["caris-mi-profile", "foundationone-cdx", "tempus-xt"],
    forPatient: "If your glioma has an IDH mutation and 1p/19q codeletion it is an oligodendroglioma, which grows more slowly and responds well to chemotherapy with radiotherapy. Without the codeletion the same IDH-mutant tumour is an astrocytoma. Vorasidenib is on label for grade 2 tumours of either type after surgery.",
    terms: ["1p19q-codeletion", "fish", "cytogenetics"], related: ["idh1-r132", "idh2-mutation", "mgmt-promoter-methylation"], links: [{ label: "WHO CNS5 (Louis et al. 2021)", url: "https://doi.org/10.1093/neuonc/noab106" }], tags: ["biomarker", "glioma", "no-approval"] }),

  b({ id: "h3-k27m", name: "H3 K27M mutation", aka: ["H3 K27M", "H3K27M", "H3F3A K27M", "H3-3A K27M", "K27M", "H3 K27-altered", "H3 K27M-mutant diffuse midline glioma"],
    target: "h3-3a", measurement: "sequencing-variant",
    tldr: "H3 K27M is a single change in a histone that defines diffuse midline glioma, including the brain-stem tumour DIPG. In 2025 dordaviprone became the first drug approved for tumours carrying it.",
    summary: "The K27M substitution in H3-3A (or H3C2/H3C3, the H3.1 genes) is detected by a mutation-specific antibody on immunohistochemistry or by sequencing; WHO CNS5 groups these tumours as diffuse midline glioma, H3 K27-altered, grade 4. Dordaviprone (Modeyso, August 2025, accelerated approval) is labelled for adult and paediatric patients from one year with diffuse midline glioma harbouring an H3 K27M mutation and progressive disease after prior therapy. Radiotherapy remains the first treatment; the ACTION trial (NCT05580562) tests dordaviprone after radiotherapy.",
    scoringRule: { text: "The H3 K27M substitution by immunohistochemistry with a mutation-specific antibody (with loss of H3K27me3 staining) or by sequencing of H3-3A, H3C2 or H3C3.", quote: "MODEYSO is indicated for the treatment of adult and pediatric patients 1 year of age and older with diffuse midline glioma harboring an H3 K27M mutation with progressive disease following prior therapy.", source: LABEL.modeyso, sourceLabel: "MODEYSO prescribing information" },
    thresholds: [th({ value: "H3 K27M mutation, progressive disease after prior therapy", drugId: "dordaviprone", cancerId: "dipg-dmg", regulator: "FDA", source: LABEL.modeyso, quote: "MODEYSO is indicated for the treatment of adult and pediatric patients 1 year of age and older with diffuse midline glioma harboring an H3 K27M mutation with progressive disease following prior therapy." })],
    cancers: ["dipg-dmg", "paediatric-high-grade-glioma"], drugs: ["dordaviprone"], tests: ["caris-mi-profile", "foundationone-cdx", "tempus-xt"],
    forPatient: "An H3 K27M result confirms a diffuse midline glioma. Radiotherapy is still the first treatment, and if the tumour grows afterwards dordaviprone capsules are now on label for adults and children over one year. Trials of dordaviprone given straight after radiotherapy are recruiting.",
    terms: ["h3k27m"], related: ["mgmt-promoter-methylation", "idh1-r132"], links: [{ label: "MODEYSO prescribing information (DailyMed)", url: LABEL.modeyso }], tags: ["biomarker", "glioma", "paediatric"] }),

  b({ id: "ctdna-mrd-positive", name: "ctDNA MRD positivity (molecular residual disease after curative treatment)", aka: ["ctDNA MRD", "ctDNA positive", "ctDNA-positive", "molecular residual disease", "MRD-positive ctDNA", "Signatera positive", "ctDNA detected after surgery"],
    measurement: "ctdna-detection",
    tldr: "A positive ctDNA residual-disease result means a qualifying signal was detected under the assay's rules after treatment. Its source, sample and clinical setting determine what it means; recurrence and treatment benefit are separate questions.",
    summary: "Tumour-informed assays sequence the tumour first and track a personalised set of variants in plasma: Signatera, RaDaR ST, Oncodetect and Haystack MRD from an exome, and NeXT Personal, FoundationOne MRD, Precise MRD, TrueMRD and Labcorp Plasma Detect Genome from a whole genome. Tumour-naive assays (Guardant Reveal, Tempus xM) read mutations, methylation or fragment patterns without a tumour sample, and NavDx counts HPV DNA shed by HPV-driven throat and anal cancers. Medicare's MolDX billing article A58376 names the tests it covers for residual disease and the cancers each is covered in. A positive result meets the assay's calling rule; some methods return a qualitative call and others also report a level. IMvigor011 showed a survival benefit for atezolizumab over placebo in ctDNA-positive muscle-invasive bladder cancer after cystectomy, and FDA approved Signatera CDx on 15 May 2026 (P260004) to identify ctDNA MRD-positive muscle-invasive bladder cancer for the associated Tecentriq therapies, in accordance with the approved therapeutic labelling. That specific indication does not make all MRD assays interchangeable. In colorectal cancer the DYNAMIC trial and the ongoing CIRCULATE trials use ctDNA to guide adjuvant chemotherapy. As a genome-wide readout it sits under no target.",
    scoringRule: { text: "Detection of tumour-derived DNA in plasma above the assay's validated calling threshold after curative treatment (Signatera: two or more of 16 patient-specific variants detected), reported as MRD-positive with a mean tumour molecules per millilitre level.", quote: "Circulating tumor DNA (ctDNA) molecular residual disease (MRD): Signatera CDx (Natera, Inc.) Muscle Invasive Bladder Cancer (MIBC) - Plasma TECENTRIQ (atezolizumab), TECENTRIQ HYBREZA BLA 761347 P260004 (05/15/2026)", source: FDA_CDX_URL, sourceLabel: FDA_CDX_LABEL },
    thresholds: [th({ value: "ctDNA MRD-positive by Signatera CDx after cystectomy", drugId: "atezolizumab", cancerId: "urothelial", regulator: "FDA", source: FDA_CDX_URL, quote: "Circulating tumor DNA (ctDNA) molecular residual disease (MRD): ctDNA MRD", note: "FDA companion diagnostic row P260004 (15 May 2026) for Tecentriq in muscle-invasive bladder cancer; the atezolizumab label copy read on DailyMed on 23 Sept 2026 (effective 20 May 2026) is the label version to check for the indication text." })],
    cancers: ["urothelial", "colorectal", "tnbc", "nsclc", "breast-cancer"], drugs: ["atezolizumab", "signatera", "guardant-reveal", "radar-mrd", "oncodetect", "next-personal", "foundationone-mrd", "haystack-mrd", "labcorp-plasma-detect", "precise-mrd", "truemrd", "tempus-xm-mrd", "navdx", "clonoseq"], tests: ["signatera", "guardant-reveal", "radar-mrd", "next-personal", "oncodetect", "foundationone-mrd", "haystack-mrd", "labcorp-plasma-detect", "precise-mrd", "truemrd", "tempus-xm-mrd", "navdx"],
    companionDiagnostics: [cdx("Signatera CDx", "Natera", "Muscle Invasive Bladder Cancer (MIBC) - Plasma", ["atezolizumab"], "P260004 (05/15/2026)", "natera")],
    forPatient: "A positive ctDNA test after surgery means traces of the cancer's DNA are still in your blood and relapse is likely without more treatment. In muscle-invasive bladder cancer a positive Signatera result now selects a year of atezolizumab; in bowel cancer it is used in trials and by some teams to decide on chemotherapy. A negative result is reassuring but not a guarantee, and testing is usually repeated over time.",
    terms: ["ctdna", "mrd", "tumour-informed-assay", "cfdna"], related: [
  "tmb-high",
  "esr1-mutation-ctdna",
  "b-subclone-attribution-residual-disease",
  "ctdna-imaging-discordance"
], links: [
  {
    "label": "FDA: List of FDA-Authorized Companion Diagnostic Devices",
    "url": "https://www.fda.gov/medical-devices/in-vitro-diagnostics/list-cleared-or-approved-companion-diagnostic-devices-in-vitro-and-imaging-tools"
  },
  {
    "label": "TECENTRIQ prescribing information (DailyMed)",
    "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=6fa682c9-a312-4932-9831-f286908660ee"
  },
  {
    "label": "CMS MolDX billing article A58376: minimal residual disease testing for solid tumour cancers",
    "url": "https://www.cms.gov/medicare-coverage-database/view/article.aspx?articleid=58376"
  },
  {
    "label": "Scherer et al., Sci Transl Med 2016: ctDNA genotyping classifies cell of origin and tracks genome evolution in lymphoma (92 patients)",
    "url": "https://doi.org/10.1126/scitranslmed.aai8545"
  },
  {
    "label": "Kurtz et al., Nat Biotechnol 2021: PhasED-seq, phased variants for residual disease detection in B-cell lymphoma (213 participants)",
    "url": "https://doi.org/10.1038/s41587-021-00981-w"
  },
  {
    "label": "Circulating tumor DNA and magnetic resonance imaging to predict neoadjuvant chemotherapy response and recurrence risk",
    "url": "https://doi.org/10.1038/s41523-021-00239-3"
  },
  {
    "label": "Powles et al.: ctDNA-guided adjuvant atezolizumab in muscle-invasive bladder cancer (IMvigor011, 2025)",
    "url": "https://doi.org/10.1056/NEJMoa2511885"
  },
  {
    "label": "FDA: Signatera CDx P260004 summary of safety and effectiveness (2026)",
    "url": "https://www.accessdata.fda.gov/cdrh_docs/pdf26/P260004B.pdf"
  }
], tags: ["biomarker", "genome-wide", "ctdna", "precision"], notes: [
  "What the call and the number each say: a positive is detection above the assay's calling rule in one finite plasma aliquot, and any accompanying concentration or fraction has its own unit and validated range, so a detected value below the quantitation range does not support an exact fold change. In the I-SPY 2 pilot of 84 patients, ctDNA positivity after neoadjuvant chemotherapy added significantly to MRI functional tumour volume for predicting distant recurrence and death (p = 0.004), while ctDNA early in treatment gave only a numerical gain for predicting pathological complete response (Magbanua 2021). A positive can also come from a blood-cell clone unless origin is checked, and a blood result and an imaging or pathology result can differ because they sample different material, regions and times.",
  "A molecular detection is evidence about the sampled material under an assay's rule. It is not a direct count of living cancer cells, a location, or a guarantee of later recurrence. Source attribution, specimen quality and the intended clinical use remain necessary. FDA's Signatera CDx summary describes a qualitative positive or negative result for its defined bladder-cancer use; a generic residual-disease result should therefore not be assumed to include a validated quantitative concentration."
],
"asOf": "2026-11-10"
}),

  b({ id: "hla-a-02-01", name: "HLA-A*02:01 (HLA typing for TCR therapies)", aka: [
  "HLA-A*02:01",
  "HLA-A*02:01-positive",
  "HLA-A0201"
],
    target: "hla-a", measurement: "hla-typing",
    tldr: "HLA-A*02:01 is a specific allele used as an eligibility marker for some T-cell receptor therapies. Typing alone does not establish eligibility, target display or benefit.",
    summary: "HLA typing by sequencing (the SeCore CDx HLA Sequencing System is the FDA-listed companion diagnostic for both drugs) reports the patient's HLA-A alleles. Tebentafusp (Kimmtrak) is labelled for HLA-A*02:01-positive adults with unresectable or metastatic uveal melanoma; afamitresgene autoleucel (Tecelra) for synovial sarcoma in patients who are HLA-A*02:01P, -A*02:02P, -A*02:03P or -A*02:06P positive and whose tumour expresses MAGE-A4 by the MAGE-A4 IHC 1F9 pharmDx, with HLA-A*02:05P as an exclusion allele. About 45 percent of Europeans and fewer people of African or East Asian ancestry carry A*02:01, which limits access and drives development of TCR therapies for other alleles. A typing report is read with its resolution: a group-level result such as HLA-A*02 cannot be completed as A*02:01, because the group holds different protein variants, and typing of inherited DNA does not show whether the tumour still expresses the allele or displays the target peptide.",
    scoringRule: { text: "Presence of the HLA-A*02:01 allele (for tebentafusp) or of HLA-A*02:01P, A*02:02P, A*02:03P or A*02:06P without A*02:05P (for afamitresgene autoleucel) by HLA sequencing of blood.", quote: "Eligible alleles: HLA-A*02:01, HLA-A*02:02, HLA-A*02:03 or HLA-A*02:06 and their P-group alleles. Exclusion alleles: HLA-A*02:05 and its P-group alleles.", source: FDA_CDX_URL, sourceLabel: FDA_CDX_LABEL },
    thresholds: [
      th({ value: "HLA-A*02:01-positive", drugId: "tebentafusp", cancerId: "uveal-melanoma", regulator: "FDA", source: LABEL.kimmtrak, quote: "KIMMTRAK is indicated for the treatment of HLA-A*02:01-positive adult patients with unresectable or metastatic uveal melanoma." }),
      th({ value: "HLA-A*02:01P, -A*02:02P, -A*02:03P or -A*02:06P positive and MAGE-A4-expressing", drugId: "afamitresgene-autoleucel", cancerId: "synovial-sarcoma", regulator: "FDA", source: LABEL.tecelra, quote: "TECELRA is indicated for the treatment of adults and pediatric patients 12 years of age and older with unresectable or metastatic synovial sarcoma who have received prior chemotherapy, are HLA-A*02:01P, -A*02:02P, -A*02:03P, or -A*02:06P positive and whose tumor expresses the MAGE-A4 antigen as determined by FDA-approved or cleared companion diagnostic devices." }),
    ],
    cancers: ["uveal-melanoma", "synovial-sarcoma", "melanoma"], drugs: ["tebentafusp", "afamitresgene-autoleucel"],
    companionDiagnostics: [cdx("SeCore CDx HLA Sequencing System", "One Lambda (Thermo Fisher Scientific)", "Uveal Melanoma - Whole Blood", ["tebentafusp"], "BR220737 (11/28/2022)", "one-lambda"), cdx("SeCore CDx HLA Sequencing System", "One Lambda (Thermo Fisher Scientific)", "Synovial sarcoma - Whole blood", ["afamitresgene-autoleucel"], "BK241074 (08/01/2024)", "one-lambda"), cdx("MAGE-A4 IHC 1F9 pharmDx", "Agilent Technologies", "Synovial sarcoma - Tissue", ["afamitresgene-autoleucel"], "P230016 (08/01/2024)", "agilent")],
    forPatient: "Your HLA type is inherited and tested from a blood sample. If you carry HLA-A*02:01, tebentafusp is on label for advanced uveal melanoma, the only drug shown to extend survival in that disease, and afamitresgene autoleucel is an option for synovial sarcoma if the tumour also expresses MAGE-A4. If you do not carry the allele these particular treatments cannot work, and trials for other HLA types are the route to ask about.",
    terms: ["hla-a02-restriction", "uveal-melanoma-prognostic-markers"], related: [
  "pd-l1-cps",
  "hla-typing-and-nomenclature"
], links: [
  {
    "label": "KIMMTRAK prescribing information (DailyMed)",
    "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=24a49f57-d2fc-4ffe-9eb1-fe0460c6b067"
  },
  {
    "label": "TECELRA prescribing information (DailyMed)",
    "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=ab24631f-3364-46e1-8074-7244863bcbab"
  },
  {
    "label": "OptiType: precision HLA typing from next-generation sequencing data.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/25143287/"
  },
  {
    "label": "Phase-defined complete sequencing of the HLA genes by next-generation sequencing.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/23714642/"
  }
], tags: ["biomarker", "hla"] ,
"asOf": "2026-11-09"
}),
];

/**
 * Readouts the owner asked for that could not be sourced to a public label, FDA companion diagnostic entry, guideline
 * or registered trial in this pass, with the reason. Each is a candidate for a later wave once a source is found.
 */
export const BIOMARKER_SKIPS: Array<{ name: string; reason: string }> = [
  { name: "EGFR uncommon mutations (G719X, S768I, L861Q)", reason: "Afatinib's label covers them and the cobas test row lists them, but no exact label sentence was extractable from the openFDA copy in this pass; folded into the exon 19 and L858R pages pending a direct label read." },
  { name: "KIT exon 11 and exon 9 mutations in GIST", reason: "Imatinib dosing by KIT exon 9 status is guideline-based (NCCN, ESMO) and no FDA companion diagnostic row exists; the cancer subtype page gist-kit-exon-11 carries the guideline content." },
  { name: "NRG1 fusion", reason: "Zenocutuzumab's label was not fetched in this pass (brand Bizengri not in the label batch); the tumour-board matrix row nrg1 remains the pointer." },
  { name: "EZH2 mutation (follicular lymphoma)", reason: "The cobas EZH2 Mutation Test row and Tazverik label exist, but tazemetostat's indication text was not extracted in this pass." },
  { name: "KMT2A rearrangement", reason: "Revuforj label and the Cytocell KMT2A FISH row exist; deferred to keep this wave within budget. The cancer page aml-npm1-kmt2a covers the indication." },
  { name: "MAGE-A4 expression", reason: "Covered inside the HLA-A*02:01 record (Tecelra companion diagnostics) rather than as its own readout; a MAGE-A4 target exists (mage-a4) and a separate readout can be split out later." },
  { name: "PD-L1 for durvalumab (EU PACIFIC >= 1%) and other EMA-only thresholds", reason: "Only US labels were read; EMA SmPC thresholds (for example durvalumab TC >= 1% after chemoradiation) need the EPAR fetch and are left for the regional-approvals pass." },
  { name: "Homologous recombination deficiency by non-Myriad assays (FoundationOne LOH)", reason: "The rucaparib ARIEL LOH-high cut-off (16 percent) was not verified against a label sentence in this pass; the hrd-positive record covers the myChoice rule only." },
];
