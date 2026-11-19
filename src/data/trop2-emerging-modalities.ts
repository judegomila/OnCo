import type { EntityInput } from "@/lib/schema";

/** Public primary-source records; clinical phase is not a clinical efficacy claim. */
export const trop2EmergingModalities: EntityInput[] = [
  {
    "id": "db-1305",
    "name": "DB-1305 / BNT325",
    "kind": "drug",
    "modality": "ADC",
    "status": "phase-2",
    "asOf": "2026-11-18",
    "payload": "TOP1 inhibitor",
    "mechanism": "TROP2-directed antibody-drug conjugate with a cleavable linker and a topoisomerase I inhibitor.",
    "tldr": "DB-1305 / BNT325 is an experimental antibody-drug conjugate being studied in people with advanced cancer. Its benefit and safety are still being evaluated.",
    "summary": "SABCS 2025 abstract PS5-02-29 reports 26 previously treated metastatic TNBC patients at the March 31, 2025 cutoff. Prior sacituzumab govitecan was excluded. Median follow-up was 9.3 months; grade 3 or higher treatment-related adverse events occurred in 9/26 patients (34.6%) and one discontinued for anemia. The deposited abstract does not provide its referenced efficacy table, so a response rate is not inferred. This uncontrolled cohort cannot rank DB-1305 against approved ADCs.",
    "targets": [
      "trop2"
    ],
    "technologies": [
      "adc"
    ],
    "trials": [
      "nct05438329",
      "nct06953089"
    ],
    "links": [
      {
        "label": "Publisher abstract",
        "url": "https://doi.org/10.1158/1557-3265.sabcs25-ps5-02-29"
      },
      {
        "label": "ClinicalTrials.gov NCT05438329",
        "url": "https://clinicaltrials.gov/study/NCT05438329"
      }
    ]
  },
  {
    "id": "ibi130",
    "name": "IBI130",
    "kind": "drug",
    "modality": "ADC",
    "status": "phase-1",
    "asOf": "2026-10-06",
    "payload": "NT1 (camptothecin derivative, TOP1 inhibitor)",
    "mechanism": "Anti-TROP2 antibody linked to NT1, a camptothecin-derived TOP1 inhibitor.",
    "tldr": "IBI130 is an experimental antibody-drug conjugate being studied in people with advanced cancer. Its benefit and safety are still being evaluated.",
    "summary": "ASCO 2025 abstract 1102 reports 71 patients treated in the first-in-human study at the December 15, 2024 cutoff. Among 30 efficacy-evaluable TNBC patients across doses, ORR was 50.0% (95% CI 31.3 to 68.7); PFS and duration of response were immature. Grade 3 treatment-related events occurred in 15.5% of the 71 patients; one had grade 1 interstitial lung disease. This is an uncontrolled early cohort, not comparative proof of improved safety or efficacy.",
    "targets": [
      "trop2"
    ],
    "technologies": [
      "adc"
    ],
    "trials": [
      "nct05923008"
    ],
    "links": [
      {
        "label": "Publisher abstract",
        "url": "https://doi.org/10.1200/jco.2025.43.16_suppl.1102"
      },
      {
        "label": "ClinicalTrials.gov NCT05923008",
        "url": "https://clinicaltrials.gov/study/NCT05923008"
      }
    ]
  },
  {
    "id": "9mw2921",
    "name": "9MW2921",
    "kind": "drug",
    "modality": "ADC",
    "status": "phase-1",
    "asOf": "2026-10-06",
    "payload": "Mtoxin (camptothecin-based payload), DAR 4",
    "mechanism": "TROP2-directed ADC carrying a camptothecin-based Mtoxin payload with site-specific conjugation.",
    "tldr": "9MW2921 is an experimental antibody-drug conjugate being studied in people with advanced cancer. Its benefit and safety are still being evaluated.",
    "summary": "ASCO 2025 abstract 3029 reports 39 treated patients at the November 12, 2024 cutoff. Across doses, 12/38 efficacy-evaluable patients had partial responses. At 3.0 mg/kg, responses were 8/19 (42.1%); this is a dose subgroup, not the full treated population. All three patients at 4.5 mg/kg experienced dose-limiting toxicity and that dose was considered intolerable. The nonrandomized solid-tumor study does not establish TNBC-specific benefit.",
    "targets": [
      "trop2"
    ],
    "technologies": [
      "adc"
    ],
    "trials": [
      "nct05990452"
    ],
    "links": [
      {
        "label": "Publisher abstract",
        "url": "https://doi.org/10.1200/jco.2025.43.16_suppl.3029"
      },
      {
        "label": "ClinicalTrials.gov NCT05990452",
        "url": "https://clinicaltrials.gov/study/NCT05990452"
      }
    ]
  },
  {
    "id": "bat8008",
    "name": "BAT8008",
    "kind": "drug",
    "modality": "ADC",
    "status": "phase-1",
    "asOf": "2026-10-06",
    "payload": "Exatecan (TOP1 inhibitor)",
    "mechanism": "TROP2-directed monoclonal antibody-drug conjugate delivering exatecan.",
    "tldr": "BAT8008 is an experimental antibody-drug conjugate being studied in people with advanced cancer. Its benefit and safety are still being evaluated.",
    "summary": "ASCO 2025 abstract 3024 reports 170 enrolled patients at the January 15, 2025 cutoff, including 147 at the selected 2.4 mg/kg dose. Among efficacy-evaluable patients at that dose, cervical cancer ORR was 36.4% (22 patients) and esophageal cancer ORR 23.1% (13 patients). Two of six patients at 2.7 mg/kg had dose-limiting toxicity. Stomatitis and cytopenias included grade 3 or higher events. These selected nonrandomized cohorts do not establish breast-cancer efficacy.",
    "targets": [
      "trop2"
    ],
    "technologies": [
      "adc"
    ],
    "trials": [
      "nct05620017"
    ],
    "links": [
      {
        "label": "Publisher abstract",
        "url": "https://doi.org/10.1200/jco.2025.43.16_suppl.3024"
      },
      {
        "label": "ClinicalTrials.gov NCT05620017",
        "url": "https://clinicaltrials.gov/study/NCT05620017"
      }
    ]
  },
  {
    "id": "avzo-103",
    "name": "AVZO-103",
    "kind": "drug",
    "modality": "ADC",
    "status": "phase-1",
    "asOf": "2026-10-06",
    "payload": "Exatecan (TOP1 inhibitor)",
    "mechanism": "Bispecific Nectin-4/TROP2 ADC delivering an exatecan payload.",
    "tldr": "AVZO-103 is an experimental antibody-drug conjugate being studied in people with advanced cancer. Its benefit and safety are still being evaluated.",
    "summary": "ASCO GU 2026 trial-in-progress abstract TPS908 describes AVZO-103-1001 (BEACON-1), a phase 1/2 study of monotherapy and combinations in advanced urothelial and other solid tumors. The design includes dose escalation followed by expansion. Its rationale and xenograft activity do not constitute patient efficacy results. Trial participation and prior ADC rules depend on the specific cohort.",
    "targets": [
      "trop2",
      "nectin4"
    ],
    "technologies": [
      "adc",
      "bispecific-adc"
    ],
    "companies": [
      "avenzo"
    ],
    "trials": [
      "nct07193511"
    ],
    "links": [
      {
        "label": "Publisher abstract",
        "url": "https://doi.org/10.1200/jco.2026.44.7_suppl.tps908"
      },
      {
        "label": "ClinicalTrials.gov NCT07193511",
        "url": "https://clinicaltrials.gov/study/NCT07193511"
      }
    ]
  },
  {
    "id": "ibi3014",
    "name": "IBI3014",
    "kind": "drug",
    "modality": "ADC",
    "status": "phase-1",
    "asOf": "2026-10-06",
    "payload": "NT1 (TOP1 inhibitor)",
    "mechanism": "Bispecific TROP2/PD-L1 antibody-drug conjugate combining NT1 delivery with immune checkpoint blockade.",
    "tldr": "IBI3014 is an experimental antibody-drug conjugate being studied in people with advanced cancer. Its benefit and safety are still being evaluated.",
    "summary": "AACR 2025 abstract 344 describes a TROP2/PD-L1 bispecific ADC with an NT1 TOP1 inhibitor payload. The abstract reports cell and xenograft activity, stability and monkey toxicology, not clinical efficacy. NCT06974812 separately registers a recruiting phase 1/2 study. A clinical registry entry does not convert the preclinical comparisons into evidence of patient benefit or a validated safety advantage.",
    "targets": [
      "trop2",
      "pdl1"
    ],
    "technologies": [
      "adc",
      "bispecific-adc"
    ],
    "trials": [
      "nct06974812"
    ],
    "links": [
      {
        "label": "Publisher abstract",
        "url": "https://doi.org/10.1158/1538-7445.am2025-344"
      },
      {
        "label": "ClinicalTrials.gov NCT06974812",
        "url": "https://clinicaltrials.gov/study/NCT06974812"
      }
    ]
  },
  {
    "id": "trop2-car-il15-cord-blood-nk",
    "name": "TROP2 CAR/IL-15 cord-blood NK cells",
    "kind": "drug",
    "modality": "CAR-NK cell therapy",
    "status": "phase-1",
    "asOf": "2026-10-06",
    "mechanism": "Cord-blood natural killer cells engineered with a TROP2 CAR, IL-15 to support persistence, and an inducible caspase-9 safety switch.",
    "tldr": "These experimental immune cells are designed to recognize TROP2 on cancer cells. Early trials are studying their safety and activity.",
    "summary": "AACR 2026 abstract CT294 describes the TROPIKANA phase 1 protocol in advanced TROP2-positive solid tumors, with lymphodepletion and engineered cord-blood NK cells. It reports trial design and first treatment in January 2024, not a clinical response or survival result. NCT06066424 is recruiting with 54 planned participants. A separate colorectal minimal-residual-disease study, NCT06358430, combines this cell platform with cetuximab; it does not establish postoperative TNBC benefit.",
    "targets": [
      "trop2"
    ],
    "technologies": [
      "car-nk-macrophage"
    ],
    "links": [
      {
        "label": "Publisher abstract",
        "url": "https://doi.org/10.1158/1538-7445.am2026-ct294"
      },
      {
        "label": "Publisher abstract",
        "url": "https://doi.org/10.1200/jco.2026.44.2_suppl.tps275"
      },
      {
        "label": "ClinicalTrials.gov NCT06066424",
        "url": "https://clinicaltrials.gov/study/NCT06066424"
      },
      {
        "label": "ClinicalTrials.gov NCT06358430",
        "url": "https://clinicaltrials.gov/study/NCT06358430"
      }
    ],
    "trials": [
      "nct06066424",
      "nct06358430"
    ]
  },
  {
    "asOf": "2026-10-06",
    "phase": "1",
    "setting": "Evaluate the Safety, Tolerability and Pharmacokinetic Characteristics of BAT8008 for Injection",
    "started": "2022-11-30",
    "startedType": "actual",
    "notes": [
      "ClinicalTrials.gov record last updated 2026-02-09: recruiting. Enrollment is planned at 182 participants. Primary completion is estimated at 2027-05-31. No tabular results are posted on ClinicalTrials.gov; this does not exclude separate publications."
    ],
    "targets": [
      "trop2"
    ],
    "id": "nct05620017",
    "kind": "trial",
    "name": "Evaluate the Safety, Tolerability and Pharmacokinetic Characteristics of BAT8008 for Injection",
    "nct": "NCT05620017",
    "status": "recruiting",
    "sponsor": "Bio-Thera Solutions",
    "tldr": "An early trial studying the safety and activity of experimental treatment. Its registry status does not establish patient benefit.",
    "summary": "Evaluate the Safety, Tolerability and Pharmacokinetic Characteristics of BAT8008 for Injection. ClinicalTrials.gov record last updated 2026-02-09: recruiting. Enrollment is planned at 182 participants. Primary completion is estimated at 2027-05-31. No tabular results are posted on ClinicalTrials.gov; this does not exclude separate publications.",
    "links": [
      {
        "label": "ClinicalTrials.gov NCT05620017",
        "url": "https://clinicaltrials.gov/study/NCT05620017"
      }
    ],
    "drugs": [
      "bat8008"
    ]
  },
  {
    "asOf": "2026-10-06",
    "phase": "1",
    "setting": "To Evaluate the Phase I Clinical Study of JSKN016 in Chinese Patients With Advanced Malignant Solid Tumors",
    "started": "2024-04-30",
    "startedType": "actual",
    "notes": [
      "ClinicalTrials.gov record last updated 2024-09-19: recruiting. Enrollment is planned at 140 participants. Primary completion is estimated at 2026-05-17. No tabular results are posted on ClinicalTrials.gov; this does not exclude separate publications."
    ],
    "targets": [
      "trop2"
    ],
    "id": "nct06592417",
    "kind": "trial",
    "name": "To Evaluate the Phase I Clinical Study of JSKN016 in Chinese Patients With Advanced Malignant Solid Tumors",
    "nct": "NCT06592417",
    "status": "recruiting",
    "sponsor": "Jiangsu Alphamab Biopharmaceuticals Co., Ltd",
    "tldr": "An early trial studying the safety and activity of experimental treatment. Its registry status does not establish patient benefit.",
    "summary": "To Evaluate the Phase I Clinical Study of JSKN016 in Chinese Patients With Advanced Malignant Solid Tumors. ClinicalTrials.gov record last updated 2024-09-19: recruiting. Enrollment is planned at 140 participants. Primary completion is estimated at 2026-05-17. No tabular results are posted on ClinicalTrials.gov; this does not exclude separate publications.",
    "links": [
      {
        "label": "ClinicalTrials.gov NCT06592417",
        "url": "https://clinicaltrials.gov/study/NCT06592417"
      }
    ],
    "drugs": [
      "jskn016"
    ]
  },
  {
    "asOf": "2026-10-06",
    "phase": "1/2",
    "setting": "Study of ESG401 in Adults With Solid Tumors",
    "started": "2021-09-14",
    "startedType": "actual",
    "notes": [
      "ClinicalTrials.gov record last updated 2025-09-12: completed. Enrollment is actual at 156 participants. Primary completion is actual at 2025-06-30. No tabular results are posted on ClinicalTrials.gov; this does not exclude separate publications."
    ],
    "targets": [
      "trop2"
    ],
    "id": "nct04892342",
    "kind": "trial",
    "name": "Study of ESG401 in Adults With Solid Tumors",
    "nct": "NCT04892342",
    "status": "completed",
    "sponsor": "Shanghai Escugen Biotechnology Co., Ltd",
    "tldr": "An early trial studying the safety and activity of experimental treatment. Its registry status does not establish patient benefit.",
    "summary": "Study of ESG401 in Adults With Solid Tumors. ClinicalTrials.gov record last updated 2025-09-12: completed. Enrollment is actual at 156 participants. Primary completion is actual at 2025-06-30. No tabular results are posted on ClinicalTrials.gov; this does not exclude separate publications.",
    "links": [
      {
        "label": "ClinicalTrials.gov NCT04892342",
        "url": "https://clinicaltrials.gov/study/NCT04892342"
      }
    ],
    "drugs": [
      "esg401"
    ],
    "enrolled": 156
  },
  {
    "asOf": "2026-10-06",
    "phase": "1",
    "setting": "A Study of FDA018-ADC in Patients With Advanced Solid Tumors",
    "started": "2021-10-22",
    "startedType": "actual",
    "notes": [
      "ClinicalTrials.gov record last updated 2026-01-23: active not recruiting. Enrollment is planned at 78 participants. Primary completion is estimated at 2029-12. No tabular results are posted on ClinicalTrials.gov; this does not exclude separate publications."
    ],
    "targets": [
      "trop2"
    ],
    "id": "nct05174637",
    "kind": "trial",
    "name": "A Study of FDA018-ADC in Patients With Advanced Solid Tumors",
    "nct": "NCT05174637",
    "status": "active",
    "sponsor": "Shanghai Fudan-Zhangjiang Bio-Pharmaceutical Co., Ltd.",
    "tldr": "An early trial studying the safety and activity of experimental treatment. Its registry status does not establish patient benefit.",
    "summary": "A Study of FDA018-ADC in Patients With Advanced Solid Tumors. ClinicalTrials.gov record last updated 2026-01-23: active not recruiting. Enrollment is planned at 78 participants. Primary completion is estimated at 2029-12. No tabular results are posted on ClinicalTrials.gov; this does not exclude separate publications.",
    "links": [
      {
        "label": "ClinicalTrials.gov NCT05174637",
        "url": "https://clinicaltrials.gov/study/NCT05174637"
      }
    ],
    "drugs": [
      "fda018-adc"
    ]
  },
  {
    "asOf": "2026-10-06",
    "phase": "1",
    "setting": "Phase 1 Dose Escalation and Expansion Study of TROP2 CAR Engineered IL15-transduced Cord Blood-derived NK Cells in Patients With Advanced Solid Tumors (TROPIKANA)",
    "started": "2023-10-24",
    "startedType": "actual",
    "notes": [
      "ClinicalTrials.gov record last updated 2026-10-06: recruiting. Enrollment is planned at 54 participants. Primary completion is estimated at 2038-04-30. No tabular results are posted on ClinicalTrials.gov; this does not exclude separate publications."
    ],
    "targets": [
      "trop2"
    ],
    "id": "nct06066424",
    "kind": "trial",
    "name": "Phase 1 Dose Escalation and Expansion Study of TROP2 CAR Engineered IL15-transduced Cord Blood-derived NK Cells in Patients With Advanced Solid Tumors (TROPIKANA)",
    "nct": "NCT06066424",
    "status": "recruiting",
    "sponsor": "M.D. Anderson Cancer Center",
    "tldr": "An early trial studying the safety and activity of experimental treatment. Its registry status does not establish patient benefit.",
    "summary": "Phase 1 Dose Escalation and Expansion Study of TROP2 CAR Engineered IL15-transduced Cord Blood-derived NK Cells in Patients With Advanced Solid Tumors (TROPIKANA). ClinicalTrials.gov record last updated 2026-10-06: recruiting. Enrollment is planned at 54 participants. Primary completion is estimated at 2038-04-30. No tabular results are posted on ClinicalTrials.gov; this does not exclude separate publications.",
    "links": [
      {
        "label": "ClinicalTrials.gov NCT06066424",
        "url": "https://clinicaltrials.gov/study/NCT06066424"
      }
    ],
    "drugs": [
      "trop2-car-il15-cord-blood-nk"
    ]
  },
  {
    "asOf": "2026-10-06",
    "phase": "1",
    "setting": "Dose Escalation and Expansion Study of TROP2 CAR Engineered IL-15- Transduced Cord Blood-derived NK Cells in Combination With Cetuximab in Patient With Colorectal Cancer (CRC) With Minimal Residual Disease (MRD)",
    "started": "2024-12-02",
    "startedType": "actual",
    "notes": [
      "ClinicalTrials.gov record last updated 2026-08-04: active not recruiting. Enrollment is actual at 10 participants. Primary completion is estimated at 2029-01-18. No tabular results are posted on ClinicalTrials.gov; this does not exclude separate publications."
    ],
    "targets": [
      "trop2"
    ],
    "id": "nct06358430",
    "kind": "trial",
    "name": "Dose Escalation and Expansion Study of TROP2 CAR Engineered IL-15- Transduced Cord Blood-derived NK Cells in Combination With Cetuximab in Patient With Colorectal Cancer (CRC) With Minimal Residual Disease (MRD)",
    "nct": "NCT06358430",
    "status": "active",
    "sponsor": "M.D. Anderson Cancer Center",
    "tldr": "An early trial studying the safety and activity of experimental treatment. Its registry status does not establish patient benefit.",
    "summary": "Dose Escalation and Expansion Study of TROP2 CAR Engineered IL-15- Transduced Cord Blood-derived NK Cells in Combination With Cetuximab in Patient With Colorectal Cancer (CRC) With Minimal Residual Disease (MRD). ClinicalTrials.gov record last updated 2026-08-04: active not recruiting. Enrollment is actual at 10 participants. Primary completion is estimated at 2029-01-18. No tabular results are posted on ClinicalTrials.gov; this does not exclude separate publications.",
    "links": [
      {
        "label": "ClinicalTrials.gov NCT06358430",
        "url": "https://clinicaltrials.gov/study/NCT06358430"
      }
    ],
    "drugs": [
      "trop2-car-il15-cord-blood-nk",
      "cetuximab"
    ],
    "enrolled": 10
  },
  {
    "id": "bhv-1510",
    "kind": "drug",
    "name": "BHV-1510",
    "aka": [
      "PBI-410",
      "GQ1010"
    ],
    "modality": "ADC",
    "status": "phase-1",
    "asOf": "2026-10-06",
    "payload": "TopoIx (TOP1 inhibitor)",
    "mechanism": "TROP2-directed antibody-drug conjugate delivering a proprietary TOP1 inhibitor payload.",
    "tldr": "BHV-1510 is an experimental chemotherapy-delivering antibody being studied alone and with immunotherapy. Early response findings need confirmation in larger trials.",
    "summary": "Biohaven reported an early combination cohort with cemiplimab at the October 10, 2025 cutoff: 23 efficacy-evaluable patients across doses had confirmed ORR 52.2%. A selected 2.5 mg/kg dose group had responses in 3/5 NSCLC, 4/4 endometrial and 1/2 urothelial patients. These very small, uncontrolled populations do not establish superiority over approved ADCs or isolate the ADC contribution from immunotherapy. NCT06384807 registers phase 1/2 testing and identifies PBI-410 and GQ1010 as alternative names.",
    "targets": [
      "trop2"
    ],
    "technologies": [
      "adc"
    ],
    "trials": [
      "nct06384807",
      "nct06464055"
    ],
    "links": [
      {
        "label": "Biohaven ESMO IO 2025 sponsor report",
        "url": "https://ir.biohaven.com/news-releases/news-release-details/biohaven-presents-clinical-safety-and-efficacy-data-bhv-1510"
      },
      {
        "label": "ClinicalTrials.gov NCT06384807",
        "url": "https://clinicaltrials.gov/study/NCT06384807"
      }
    ]
  },
  {
    "id": "vbc103",
    "kind": "drug",
    "name": "VBC103",
    "modality": "ADC",
    "status": "phase-1",
    "asOf": "2026-11-18",
    "mechanism": "Bispecific antibody-drug conjugate targeting Nectin-4 and TROP2, as described in the registered trial title.",
    "tldr": "VBC103 is an experimental drug designed to recognize two proteins on cancer cells. Its early trial is testing safety and activity.",
    "summary": "NCT07299747 registers a first-in-human phase I/IIa study of VBC103 targeting Nectin-4 and TROP2. It includes dose escalation, dose optimization and cohort expansion in advanced solid tumors. The registry names VelaVigo Bio Inc as sponsor. No tabular results are posted. Payload identity and comparative clinical efficacy are not inferred from the public registry.",
    "targets": [
      "trop2",
      "nectin4"
    ],
    "technologies": [
      "adc",
      "bispecific-adc"
    ],
    "trials": [
      "nct07299747"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT07299747",
        "url": "https://clinicaltrials.gov/study/NCT07299747"
      }
    ]
  }
];
