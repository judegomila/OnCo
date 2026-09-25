import type { EntityInput, PaperInput } from "@/lib/schema";

/**
 * ISRAEL: the papers behind /countries/il/ that the corpus did not hold. Institutions are in
 * src/data/institutions/israel.ts and people in src/data/people/israel.ts; the sixteen Israeli companies and the
 * Hadassah CAR-T trial were already recorded elsewhere and are linked, not duplicated.
 *
 * Every record was checked against Europe PMC on 2026-09-25: the DOI, the PubMed id, the author list and the
 * numbers quoted in `findings` come from the indexed abstract or full text, not from a summary of it.
 */
const asOf = "2026-09-25";
const p = (x: Omit<PaperInput, "kind" | "asOf">): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const papers: PaperInput[] = [
  p({
    id: "paper-gross-eshhar-chimeric-receptor-pnas-1989",
    name: "Expression of immunoglobulin-T-cell receptor chimeric molecules as functional receptors with antibody-type specificity",
    journal: "Proceedings of the National Academy of Sciences", year: 1989, doi: "10.1073/pnas.86.24.10024", pmid: "2513569",
    authors: "Gross G, Waks T, Eshhar Z", paperType: "basic",
    tldr: "The paper that invented the CAR. A T cell was given the business end of an antibody, and it killed what the antibody recognised without needing the immune system's usual permission step.",
    summary: "Zelig Eshhar's group at the Weizmann Institute of Science asked whether the specificity of a T cell could be designed rather than selected. They built chimeric T-cell receptor genes in which the variable domains of the heavy and light chains of an anti-trinitrophenyl antibody (SP6) were spliced to the constant regions of the T-cell receptor alpha or beta chain, and expressed them in a cytotoxic T-cell hybridoma.\n\nThe transfectants expressed a functional receptor carrying the antibody's idiotope, and responded to trinitrophenyl-bearing targets without major histocompatibility complex restriction, killing them and producing interleukin-2 across strain and species barriers. They also responded to immobilised trinitrophenyl-protein conjugates, which means cellular processing and presentation were bypassed entirely. Because the binding site of this particular antibody lies almost wholly in the heavy chain, a construct containing only the heavy-chain variable domain fused to either constant region was enough.\n\nEshhar called the construct a T-body. Everything that followed, the single-chain variable fragment format, the CD28 and 4-1BB costimulatory domains added by Michel Sadelain, Carl June and Dario Campana, and the manufacturing that turns the idea into a product, is built on this experiment.",
    findings: [
      "Chimeric genes joining antibody variable domains to T-cell receptor constant domains produced a functional surface receptor on a cytotoxic T-cell hybridoma.",
      "The chimeric receptor conferred non-MHC-restricted killing and interleukin-2 production against hapten-bearing targets across strain and species barriers.",
      "Transfectants responded to immobilised hapten-protein conjugates, bypassing antigen processing and presentation altogether.",
      "A construct carrying only the heavy-chain variable domain fused to the alpha or beta constant region was sufficient in this system.",
    ],
    whatItMeans: "Every approved CAR-T product descends from this design. It is the reason a T cell can be pointed at CD19 or BCMA at all, and the reason the question of what to point it at in solid tumours is a question about antigens rather than about the receptor.",
    caveats: [
      "A model antigen (trinitrophenyl) in a hybridoma, not a tumour antigen in a patient. The construct had no costimulatory domain, so first-generation CARs of this kind proved too weak in the clinic; the additions that made CAR-T work came a decade or more later from other groups.",
    ],
    changedPractice: true,
    links: [doi("10.1073/pnas.86.24.10024", "PNAS 1989"), pubmed("2513569")],
    technologies: ["car-t"], targets: ["cd19"], people: ["zelig-eshhar"], institutions: ["weizmann"], journals: ["pnas"], sections: ["cell-therapy"], bottlenecks: ["b-manufacturing-cell-therapy"],
  }),

  p({
    id: "paper-gabai-kapara-population-brca-screening-pnas-2014",
    name: "Population-based screening for breast and ovarian cancer risk due to BRCA1 and BRCA2",
    journal: "Proceedings of the National Academy of Sciences", year: 2014, doi: "10.1073/pnas.1415979111", pmid: "25192939",
    authors: "Gabai-Kapara E, Lahad A, Kaufman B, Friedman E, Segev S, Renbaum P, Beeri R, Gal M, Grinshpun-Cohen J, Djemal K, Mandell JB, Lee MK, Beller U, Catane R, King MC, Levy-Lahad E",
    paperType: "observational", participants: 8195,
    tldr: "The study that made population-wide BRCA testing defensible. Instead of measuring risk in families already known to cancer clinics, it found carriers among healthy men and then followed their female relatives, and the risk turned out to be just as high.",
    summary: "The objection to offering BRCA testing to everyone in a population was that the risk figures came from families referred to cancer genetics clinics, who are selected for having a lot of cancer. Ephrat Levy-Lahad and Mary-Claire King's answer was to start somewhere with no such selection. Between June 2004 and December 2010 they recruited healthy Ashkenazi Israeli men aged 30 and over with no personal history of cancer from health-screening centres and outpatient clinics: 8,222 enrolled, 8,195 (99.7 percent) were successfully genotyped for the three founder variants. Female relatives of the carriers were then enrolled and genotyped.\n\nCarrier frequency was 1.14 percent for BRCA1 and 1.03 percent for BRCA2, 2.17 percent combined. Among fully genotyped sibships, cumulative risk of breast or ovarian cancer was 0.60 by age 60 and 0.83 by age 80 for BRCA1 carriers, and 0.33 by 60 and 0.76 by 80 for BRCA2 carriers. Risk was higher in later birth cohorts: 3.8-fold higher age-specific risk for carriers born after 1958 than for those born in or before it.\n\nThe decisive number for policy is that 51 percent of the 167 carrier families had little or no relevant cancer history, so testing triggered by family history would have missed them; and only 35 percent of the 82 families that did have a high cancer burden had ever been referred for genetic counselling, in a country with universal health coverage. Israel began offering the three-variant test to every woman of Ashkenazi origin in January 2020.",
    findings: [
      "Carrier frequency among 8,195 genotyped healthy Ashkenazi Israeli men: BRCA1 1.14 percent, BRCA2 1.03 percent, 2.17 percent combined.",
      "Cumulative risk of breast or ovarian cancer by age 80: 0.83 (standard error 0.07) for BRCA1 carriers, 0.76 (0.13) for BRCA2 carriers.",
      "Age-specific risk was 3.8-fold higher in carriers born after 1958 than in those born in or before 1958 (P = 0.006).",
      "51 percent (85 of 167) of carrier families had little or no history of relevant cancer, so family-history criteria would not have identified them.",
      "Only 35 percent (29 of 82) of the families with a high cancer burden had previously been referred for genetic counselling.",
    ],
    whatItMeans: "This is the evidence base for offering an inherited-risk test to a whole population rather than to people who already look high risk. It is why Israel's health basket funds BRCA founder testing for every woman of Ashkenazi origin without a family history requirement, and it is quoted in every argument for doing the same elsewhere.",
    caveats: [
      "Risk estimates are for three specific founder variants in one population; they do not transfer to other BRCA variants or other populations, and a negative three-variant test does not exclude inherited risk.",
      "Ascertainment through healthy men removes clinic selection but the female relatives who agreed to be genotyped are still a volunteer sample.",
      "The BRCA2 ovarian cancer estimate is unstable: 0.62 in fully genotyped sibships but 0.37 to 0.45 when all sibships are included with imputation.",
    ],
    changedPractice: true,
    links: [doi("10.1073/pnas.1415979111", "PNAS 2014"), pubmed("25192939")],
    targets: ["brca"], cancers: ["breast-hr-positive", "ovarian"], technologies: ["germline-testing"], terms: ["founder-variant"], people: ["ephrat-levy-lahad", "eitan-friedman"], institutions: ["shaare-zedek", "sheba"], journals: ["pnas"], sections: ["prevention"], bottlenecks: ["b-hereditary-risk"],
  }),

  p({
    id: "paper-besser-til-melanoma-intent-to-treat-ccr-2013",
    name: "Adoptive transfer of tumor-infiltrating lymphocytes in patients with metastatic melanoma: intent-to-treat analysis and efficacy after failure to prior immunotherapies",
    journal: "Clinical Cancer Research", year: 2013, doi: "10.1158/1078-0432.ccr-13-0380", pmid: "23690483",
    authors: "Besser MJ, Shapira-Frommer R, Itzhaki O, Treves AJ, Zippel DB, Levy D, Kubi A, Shoshani N, Zikich D, Ohayon Y, Ohayon D, Shalmon B, Markel G, Yerushalmi R, Apter S, Ben-Nun A, Schachter J, et al.",
    paperType: "observational", participants: 80,
    tldr: "Sheba's decade of growing melanoma patients' own tumour-fighting cells and giving them back, reported honestly: counting everyone who enrolled, not only those who made it to treatment.",
    summary: "The Ella Lemelbaum Institute at Sheba Medical Center began treating metastatic melanoma with autologous tumour-infiltrating lymphocytes in 2006, more than a decade before any regulator approved the approach. This report is the intent-to-treat analysis of the first 80 patients with stage IV disease enrolled in the programme.\n\nTumour-infiltrating lymphocyte cultures could be established for 72 of the 80. Fifty-seven were treated with unselected or young lymphocytes and high-dose interleukin-2 after non-myeloablative lymphodepleting conditioning. Twenty-three were withdrawn, mostly because they deteriorated clinically during the weeks the cells were being grown, which is the cost of a manufacturing step that cannot be hurried.\n\nThe overall response rate was 29 percent and median survival 9.8 months counting everyone enrolled; 40 percent and 15.2 months counting those actually treated. Five patients achieved complete and 18 partial remission. Every complete responder remained in unmaintained remission at a median follow-up of 28 months, and three-year survival among responders was 78 percent. On multivariate analysis, lactate dehydrogenase, sex, days of culture and the total number of infused CD8-positive cells independently predicted outcome. Thirty-two patients received ipilimumab before or after the cells; patients who had not responded to ipilimumab or interleukin-2 did about as well on cell therapy as those who had.",
    findings: [
      "Cultures established for 72 of 80 enrolled patients; 57 treated; 23 withdrawn, mainly through clinical deterioration during manufacture.",
      "Overall response rate 29 percent and median survival 9.8 months on intent to treat; 40 percent and 15.2 months among treated patients.",
      "Five complete and 18 partial remissions; all complete responders in unmaintained remission at a median 28 months; three-year survival among responders 78 percent.",
      "Lactate dehydrogenase, sex, days of cells in culture and total infused CD8-positive cells were independent predictors of outcome.",
      "Failure of prior ipilimumab or interleukin-2 did not predict failure of cell therapy.",
    ],
    whatItMeans: "It showed that a single academic centre outside the United States could run tumour-infiltrating lymphocyte therapy at scale and get durable remissions, and it quantified the attrition that intent-to-treat reporting exposes and single-arm treated-patient reporting hides.",
    caveats: [
      "Single-arm, single-centre and not randomised, in an era before checkpoint inhibitors became standard first-line treatment, so the comparison group is historical.",
      "High-dose interleukin-2 and lymphodepletion make the regimen unsuitable for frail patients, and the three-week manufacturing window excluded nearly a third of those enrolled.",
    ],
    links: [doi("10.1158/1078-0432.ccr-13-0380", "Clin Cancer Res 2013"), pubmed("23690483")],
    cancers: ["melanoma"], technologies: ["til-therapy"], people: ["michal-besser", "jacob-schachter", "gal-markel"], institutions: ["sheba"], journals: ["clinical-cancer-research"], sections: ["cell-therapy"], bottlenecks: ["b-manufacturing-cell-therapy"],
  }),

  p({
    id: "paper-moore-israel-cancer-registry-completeness-imaj-2021",
    name: "An assessment of the completeness and timeliness of the Israel National Cancer Registry",
    journal: "Israel Medical Association Journal", year: 2021, pmid: "33443338",
    authors: "Moore E, Silverman BG, Fishler Y, Ben-Adiva E, Davidov O, Dichtiar R, Edri H, Zatlawi M, Keinan-Boker L",
    paperType: "methods",
    tldr: "The registry checked its own work by sending people to 39 hospitals and laboratories to count the cancers by hand, then seeing how many were in the database. About one in sixteen was not.",
    summary: "The Israel National Cancer Registry was established in 1960 and notification has been compulsory since 1982. Reportable disease covers all invasive and in-situ malignancies and neoplasms of uncertain behaviour, and benign as well as malignant tumours of the brain and central nervous system, but excludes basal and squamous cell carcinomas of the skin, which is why Israel's non-melanoma skin cancer figures should not be read as a count.\n\nTo measure its own completeness the registry sent abstractors into the medical records departments, pathology and cytology laboratories and oncology and haematology institutes of 39 Israeli medical facilities to identify every reportable case diagnosed or treated in 2005, then linked those cases to the registry database by national identity number. Completeness was the proportion of independently identified reportable cases that the registry already held; timeliness was the proportion of 2005 cases in the database by 31 December 2007.\n\nCompleteness was 93.7 percent for all reportable disease, 96.8 percent for invasive solid tumours and 88.0 percent for haematopoietic tumours. Cases diagnosed in the index year were less likely to be in the database than older ones, which is what a reporting lag looks like. The authors judge both measures to meet international guidelines and argue for fully automated reporting.",
    findings: [
      "Completeness against an independent case-finding survey of 39 facilities: 93.7 percent for all reportable disease, 96.8 percent for invasive solid tumours, 88.0 percent for haematopoietic tumours.",
      "Notification has been mandatory since 1982; the registry was founded in 1960.",
      "Basal and squamous cell carcinomas of the skin are not reportable, so they are absent from Israeli registry counts.",
      "Cases from the index diagnosis year were less likely to be present than older cases, the signature of a reporting lag.",
    ],
    whatItMeans: "It is the number to quote when using Israeli registry data, and the reason to treat the most recent year in any registry report as provisional. It also explains why haematological malignancies are the weakest part of the count, and why Israeli non-melanoma skin cancer statistics are not comparable with countries that register it.",
    caveats: [
      "The audit covers cases diagnosed or treated in 2005; completeness and timeliness since then are not measured by this paper, and the authors expected automated reporting to change both.",
      "Completeness is measured against what abstractors could find in 39 facilities, which is itself an incomplete frame.",
    ],
    links: [pubmed("33443338"), { label: "Israel Medical Association Journal", url: "https://www.ima.org.il/MedicineIMAJ/" }],
    sections: ["prevention"], terms: ["incidence-vs-prevalence"],
  }),
];

export const israel: EntityInput[] = [...papers];
