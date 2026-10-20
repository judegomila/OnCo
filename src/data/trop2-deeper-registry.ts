import type { EntityInput } from "@/lib/schema";

/** Primary-source additions. Trial phase does not establish benefit or approval. */
export const trop2DeeperRegistry: EntityInput[] = [
  {
    "id": "mt-302",
    "kind": "drug",
    "name": "MT-302",
    "modality": "In vivo myeloid cell therapy (mRNA lipid nanoparticles)",
    "status": "phase-1",
    "asOf": "2026-10-06",
    "tldr": "MT-302 programs myeloid immune cells inside the body to recognise TROP-2-bearing cancers. It is an experimental treatment in an early clinical trial.",
    "summary": "The 2025 ASCO correlative abstract describes intravenous mRNA-LNP delivery of an anti-TROP2 scFv/truncated-CD89 CAR, functionally active upon association with FcRgamma-expressing myeloid cells. It reports tumour and blood pharmacodynamic observations, not a comparative efficacy estimate. NCT05969041 remains recruiting in its last registry update, dated January 2024; planned enrolment is 48. The registry age does not establish current local slot availability.",
    "targets": [
      "trop2"
    ],
    "trials": [
      "nct05969041"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT05969041",
        "url": "https://clinicaltrials.gov/study/NCT05969041"
      },
      {
        "label": "Primary correlative abstract",
        "url": "https://doi.org/10.1200/JCO.2025.43.16_suppl.2591"
      }
    ],
    "mechanism": "mRNA lipid nanoparticles encode an anti-TROP2 CAR to engage FcRgamma-expressing myeloid cells in vivo.",
    "mechanismSteps": [
      "Intravenous lipid nanoparticles deliver messenger RNA into endogenous myeloid cells",
      "The cells express an anti-TROP2 chimeric antigen receptor with truncated CD89",
      "The receptor recognises TROP2-bearing tumour cells and engages FcRgamma-associated signalling",
      "Tumour and blood pharmacodynamic findings are being studied; clinical benefit remains investigational"
    ],
    "cancers": []
  },
  {
    "id": "pf-06664178",
    "kind": "drug",
    "name": "PF-06664178",
    "modality": "Antibody-drug conjugate",
    "status": "historic",
    "asOf": "2026-10-06",
    "tldr": "This early TROP-2 antibody-drug conjugate was tested in a study that stopped before completing development.",
    "summary": "NCT02122146 is terminated with 31 actual participants. The registry reports a business-related decision based on the overall results; this is a historical program, not a recruiting treatment opportunity.",
    "targets": [
      "trop2"
    ],
    "trials": [
      "nct02122146"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT02122146",
        "url": "https://clinicaltrials.gov/study/NCT02122146"
      }
    ],
    "mechanism": "Anti-TROP2 antibody-drug conjugate.",
    "cancers": []
  },
  {
    "id": "js108",
    "kind": "drug",
    "name": "JS108",
    "modality": "Antibody-drug conjugate",
    "status": "historic",
    "asOf": "2026-10-06",
    "tldr": "JS108 is an experimental TROP-2 antibody-drug conjugate whose first clinical study was terminated.",
    "summary": "NCT04601285 describes a humanised anti-TROP2 monoclonal antibody linked to Tub196, given intravenously every three weeks. The study enrolled 25 actual participants and was terminated after the sponsor adjusted its development plan. This study status does not establish that every future JS108 programme has been abandoned.",
    "targets": [
      "trop2"
    ],
    "trials": [
      "nct04601285"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT04601285",
        "url": "https://clinicaltrials.gov/study/NCT04601285"
      }
    ],
    "mechanism": "Humanised anti-TROP2 antibody conjugated to the microtubule inhibitor Tub196.",
    "cancers": []
  },
  {
    "id": "sti-3258",
    "kind": "drug",
    "name": "STI-3258",
    "modality": "Antibody-drug conjugate",
    "status": "historic",
    "asOf": "2026-10-06",
    "tldr": "The first registered STI-3258 TROP-2 study was withdrawn before enrolling any participants.",
    "summary": "NCT05060276 describes an anti-TROP2 antibody-drug conjugate phase 1 study, withdrawn with zero actual participants because the protocol changed to phase 2. Withdrawal of this study is not evidence of clinical inefficacy or proof that the entire asset was abandoned.",
    "targets": [
      "trop2"
    ],
    "trials": [
      "nct05060276"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT05060276",
        "url": "https://clinicaltrials.gov/study/NCT05060276"
      }
    ],
    "mechanism": "Anti-TROP2 antibody-drug conjugate described in NCT05060276.",
    "cancers": []
  },
  {
    "id": "nct02122146",
    "kind": "trial",
    "name": "A Study Of PF-06664178 In Patients With Advanced Solid Tumors",
    "nct": "NCT02122146",
    "phase": "1",
    "asOf": "2026-10-06",
    "setting": "A Phase 1, Dose Escalation Study Of Pf-06664178 In Patients With Locally Advanced Or Metastatic Solid Tumors",
    "sponsor": "Pfizer",
    "tldr": "This study tests TROP-2-directed treatment; the registry reports that it is terminated.",
    "summary": "The registry lists NCT02122146 as terminated, last updated 2018-02-19. Enrolment is 31 actual participants. Interventions: PF-06664178. Primary measures include First Cycle Dose Limiting Toxicities (DLTs) In Order to Determine the Maximum Tolerated Dose(MTD); Number of Patients With All-Causality Treatment-Emergent Adverse Events(TEAEs) [Part 2 & 3]. The registry reason for stopping is: The study was prematurely discontinued due to a business-related decision on 09-FEB-2016. The decision to terminate the trial was based on the overall results. Results are posted in the registry.",
    "targets": [
      "trop2"
    ],
    "drugs": [
      "pf-06664178"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT02122146",
        "url": "https://clinicaltrials.gov/study/NCT02122146"
      }
    ],
    "status": "withdrawn",
    "enrolled": 31,
    "started": "2014-08",
    "startedType": "actual",
    "cancers": []
  },
  {
    "id": "nct04601285",
    "kind": "trial",
    "name": "A Phase I Study of JS108 in Patients With Advanced Solid Tumors",
    "nct": "NCT04601285",
    "phase": "1",
    "asOf": "2026-10-06",
    "setting": "A Phase I, Open-label, First-in-human, Dose Escalation and Expansion Study to Evaluate the Safety, Tolerability and Pharmacokinetic Profile of Recombinant Humanized Anti-Trop2 mAb-Tub196 Conjugate in Patients With Advanced Solid Tumors.",
    "sponsor": "Shanghai Junshi Bioscience Co., Ltd.",
    "tldr": "This study tests TROP-2-directed treatment; the registry reports that it is terminated.",
    "summary": "The registry lists NCT04601285 as terminated, last updated 2023-07-06. Enrolment is 25 actual participants. Interventions: JS108 (recombinant humanized anti-Trop2 mAb-Tub196 conjugate for injection). Primary measures include First Cycle Dose Limiting Toxicities (DLTs) In Order to Determine the Maximum Tolerated Dose(MTD); Number of participants with adverse events (AEs). The registry reason for stopping is: Sponsor has adjusted study development plan and terminated this clinical study. No results are posted in the registry; this does not exclude separate publications.",
    "targets": [
      "trop2"
    ],
    "drugs": [
      "js108"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT04601285",
        "url": "https://clinicaltrials.gov/study/NCT04601285"
      }
    ],
    "status": "withdrawn",
    "enrolled": 25,
    "started": "2020-10-28",
    "startedType": "actual",
    "cancers": []
  },
  {
    "id": "nct05060276",
    "kind": "trial",
    "name": "Study to Assess an Anti-Trop2 Antibody Drug Conjugate in Relapsed or Refractory Solid Tumors",
    "nct": "NCT05060276",
    "phase": "1",
    "asOf": "2026-10-06",
    "setting": "A Phase 1B, Dose-Escalation Study of the Safety and Preliminary Efficacy of an Anti-Trop2 Antibody Drug Conjugate (STI-3258) in Patients With Relapsed or Refractory Solid Tumors",
    "sponsor": "Sorrento Therapeutics, Inc.",
    "tldr": "This study tests TROP-2-directed treatment; the registry reports that it is withdrawn.",
    "summary": "The registry lists NCT05060276 as withdrawn, last updated 2023-01-26. Enrolment is 0 actual participants. Interventions: STI-3258. Primary measures include Incidence of adverse events by type, frequency, severity, and causality (safety); Incidence of treatment-emergent adverse events by type, frequency, severity, and causality (safety). The registry reason for stopping is: Protocol changed to Phase 2 No results are posted in the registry; this does not exclude separate publications.",
    "targets": [
      "trop2"
    ],
    "drugs": [
      "sti-3258"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT05060276",
        "url": "https://clinicaltrials.gov/study/NCT05060276"
      }
    ],
    "status": "withdrawn",
    "enrolled": 0,
    "started": "2022-12",
    "startedType": "estimated",
    "cancers": []
  },
  {
    "id": "nct05969041",
    "kind": "trial",
    "name": "Study of MT-302 in Adults With Advanced or Metastatic Epithelial Tumors",
    "nct": "NCT05969041",
    "phase": "1",
    "asOf": "2026-10-06",
    "setting": "MYE Symphony: A Phase 1, Open-Label, First-in-Human, Dose Escalation Study to Investigate the Safety, Pharmacokinetics, Pharmacodynamics and Preliminary Efficacy of MT-302 in Adults With Advanced or Metastatic Epithelial Tumors",
    "sponsor": "Myeloid Therapeutics",
    "tldr": "This study tests TROP-2-directed treatment; the registry reports that it is recruiting.",
    "summary": "The registry lists NCT05969041 as recruiting, last updated 2024-01-18. Enrolment is 48 planned participants, an estimate. Interventions: MT-302 (A). Primary measures include To evaluate the safety and tolerability of MT-302 through incidence of Adverse Events; To establish the maximum tolerated dose (MTD). No results are posted in the registry; this does not exclude separate publications.",
    "targets": [
      "trop2"
    ],
    "drugs": [
      "mt-302"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT05969041",
        "url": "https://clinicaltrials.gov/study/NCT05969041"
      }
    ],
    "status": "recruiting",
    "started": "2023-08-02",
    "startedType": "actual",
    "cancers": []
  },
  {
    "id": "nct05922930",
    "kind": "trial",
    "name": "Study of TROP2 CAR Engineered IL15-transduced Cord Blood-derived NK Cells Delivered Intraperitoneally for the Management of Platinum Resistant Ovarian Cancer, Mesonephric-like Adenocarcinoma, and Pancreatic Cancer",
    "nct": "NCT05922930",
    "phase": "1/2",
    "asOf": "2026-10-06",
    "setting": "Phase I/II Study of TROP2 CAR Engineered IL15-transduced Cord Blood-derived NK Cells Delivered Intraperitoneally for the Management of Platinum Resistant Ovarian Cancer, Mesonephric-like Adenocarcinoma, and Pancreatic Cancer",
    "sponsor": "M.D. Anderson Cancer Center",
    "tldr": "This study tests TROP-2-directed treatment; the registry reports that it is active not recruiting.",
    "summary": "The registry lists NCT05922930 as active not recruiting, last updated 2026-09-25. Enrolment is 51 planned participants, an estimate. Interventions: TROP2-CAR-NK, Cyclophosphamide, Fludarabine. Primary measures include Incidence of Adverse Events, Graded According to National Cancer Institute Common Terminology Criteria for Adverse Events (NCI CTCAE) Version (v) 5.0. No results are posted in the registry; this does not exclude separate publications.",
    "targets": [
      "trop2"
    ],
    "drugs": [],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT05922930",
        "url": "https://clinicaltrials.gov/study/NCT05922930"
      }
    ],
    "status": "active",
    "started": "2023-10-11",
    "startedType": "actual",
    "cancers": [
      "ovarian",
      "pancreatic"
    ]
  },
  {
    "id": "nct06454890",
    "kind": "trial",
    "name": "Clinical Study of Trop2 CAR-NK in the Treatment of Relapsed/Refractory Non-Small Cell Lung Cancer (NSCLC)",
    "nct": "NCT06454890",
    "phase": "1/2",
    "asOf": "2026-10-06",
    "setting": "An Investigator-initiated Trial Evaluating the Efficacy and Safety of Anti-Trop2 Universal CAR-NK(U-CAR-NK) Cells Therapy Combined With Chemotherapy for Relapsed/Refractory Non-Small Cell Lung Cancer (NSCLC)",
    "sponsor": "Henan Cancer Hospital",
    "tldr": "This study tests TROP-2-directed treatment; the registry reports that it is not yet recruiting.",
    "summary": "The registry lists NCT06454890 as not yet recruiting, last updated 2024-06-12. Enrolment is 50 planned participants, an estimate. Interventions: Anti-Trop2 CAR-NK cell. Primary measures include Safety by Common Terminology Criteria for Adverse Events (CTCAE) V5.0; Objective Response Rate (ORR). No results are posted in the registry; this does not exclude separate publications.",
    "targets": [
      "trop2"
    ],
    "drugs": [],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT06454890",
        "url": "https://clinicaltrials.gov/study/NCT06454890"
      }
    ],
    "status": "planned",
    "started": "2024-08-01",
    "startedType": "estimated",
    "cancers": ["nsclc"]
  },
  {
    "id": "nct07101432",
    "kind": "trial",
    "name": "Phase I Study of Preconditioning Radiation Therapy With IL-15 Transduced TGFBR2 KO CAR.TROP2-engineered Cord Blood-derived NK Cells in Patients With Advanced Head and Neck Cancer (RADIANCE-NK)",
    "nct": "NCT07101432",
    "phase": "1",
    "asOf": "2026-10-06",
    "setting": "Phase I Study of Preconditioning Radiation Therapy With IL-15 Transduced TGFBR2 KO CAR.TROP2-engineered Cord Blood-derived NK Cells in Patients With Advanced Head and Neck Cancer (RADIANCE-NK)",
    "sponsor": "M.D. Anderson Cancer Center",
    "tldr": "This study tests TROP-2-directed treatment; the registry reports that it is recruiting.",
    "summary": "The registry lists NCT07101432 as recruiting, last updated 2026-10-05. Enrolment is 33 planned participants, an estimate. Interventions: Fludarabine, Cyclophosphamide. Primary measures include Safety and Adverse Events (AEs). No results are posted in the registry; this does not exclude separate publications. The brief summary specifies TROP2 CAR/IL-15 TGFBR2-knockout cord-blood NK cells with radiation; the intervention list names only the lymphodepleting drugs.",
    "targets": [
      "trop2"
    ],
    "drugs": [],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT07101432",
        "url": "https://clinicaltrials.gov/study/NCT07101432"
      }
    ],
    "status": "recruiting",
    "started": "2025-12-19",
    "startedType": "actual",
    "cancers": []
  },
  {
    "id": "nct07377526",
    "kind": "trial",
    "name": "TROP2 CAREngineered Cord Blood-Derived NK Cells + Belzutifan In Pancreatic Cancer",
    "nct": "NCT07377526",
    "phase": "1/2",
    "asOf": "2026-10-06",
    "setting": "Phase 1/2 Study Of IL15-Transduced, TGFBR2 KO, TROP2 CAR- Engineered Cord Blood-Derived NK Cells Administered Intraperitoneally And Intravenously In Combination With Oral Belzutifan For The Management Of Pancreatic Cancer",
    "sponsor": "M.D. Anderson Cancer Center",
    "tldr": "This study tests TROP-2-directed treatment; the registry reports that it is suspended.",
    "summary": "The registry lists NCT07377526 as suspended, last updated 2026-07-31. Enrolment is 37 planned participants, an estimate. Interventions: TGFBR2 KO CAR27/IL-15 NK cells. Primary measures include Safety and Adverse Events (AEs). The registry reason for stopping is: PI Request No results are posted in the registry; this does not exclude separate publications. The title and brief summary specify intraperitoneal cells with oral belzutifan, but the intervention table incorrectly describes the cells as given by mouth; the route is not reproduced as a dosing recommendation.",
    "targets": [
      "trop2"
    ],
    "drugs": [],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT07377526",
        "url": "https://clinicaltrials.gov/study/NCT07377526"
      }
    ],
    "started": "2026-05-26",
    "startedType": "actual",
    "cancers": [
      "pancreatic"
    ]
  },
  {
    "id": "nct07509008",
    "kind": "trial",
    "name": "Phase 1/2 Window Of Opportunity Study Of TROP2 CAR/IL-15 TGFBR2 KO NK Cells Delivered Intraperitoneally For The Management Of Gastric Cancer Metastatic To The Peritoneum",
    "nct": "NCT07509008",
    "phase": "1/2",
    "asOf": "2026-10-06",
    "setting": "Phase 1/2 Window Of Opportunity Study Of TROP2 CAR/IL-15 TGFBR2 KO NK Cells Delivered Intraperitoneally For The Management Of Gastric Cancer Metastatic To The Peritoneum",
    "sponsor": "M.D. Anderson Cancer Center",
    "tldr": "This study tests TROP-2-directed treatment; on 8 October 2026 the registry reported that it is recruiting.",
    "summary": "The registry lists NCT07509008 as not yet recruiting, last updated 2026-07-29. Enrolment is 10 planned participants, an estimate. Interventions: TGFBR2 KO CAR27/IL-15 NK cells, Rimiducid (AP1903), Fludarabine, Cyclophosphamide. Primary measures include Safety and Adverse Events (AEs). No results are posted in the registry; this does not exclude separate publications.",
    "targets": [
      "trop2"
    ],
    "drugs": [],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT07509008",
        "url": "https://clinicaltrials.gov/study/NCT07509008"
      }
    ],
    "status": "planned",
    "started": "2026-09-01",
    "startedType": "estimated",
    "cancers": [
      "gastric"
    ]
  },
  {
    "id": "nct07553390",
    "kind": "trial",
    "name": "Phase 1b Study Of TRICK-NK In Combination With T-Dxd In Treatment-Refractory Breast Cancers",
    "nct": "NCT07553390",
    "phase": "1",
    "asOf": "2026-10-06",
    "setting": "Phase 1b Study Of Allogeneic CAR TROP2/IL15 Transduced TGFBR2 KO CB NK-Cells (TRICK-NK) In Combination With Trastuzumab Deruxtecan (T-Dxd) In Treatment-Refractory Breast Cancers",
    "sponsor": "M.D. Anderson Cancer Center",
    "tldr": "This study tests TROP-2-directed treatment; the registry reports that it is not yet recruiting.",
    "summary": "The registry lists NCT07553390 as not yet recruiting, last updated 2026-08-19. Enrolment is 60 planned participants, an estimate. Interventions: TGFBR2 KO iC9/TROP2.CAR/IL-15 NK cells, Trastuzumab deruxtecan (T-DXd), Rimiducid. Primary measures include Safety and Adverse Events (AEs). No results are posted in the registry; this does not exclude separate publications.",
    "targets": [
      "trop2"
    ],
    "drugs": [],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT07553390",
        "url": "https://clinicaltrials.gov/study/NCT07553390"
      }
    ],
    "status": "planned",
    "started": "2026-10-01",
    "startedType": "estimated",
    "cancers": [
      "breast-cancer"
    ]
  },
  {
    "id": "nct07631013",
    "kind": "trial",
    "name": "Phase 1 Study Of TROP2 CAR/IL-15 TGFBR2 KO NK Cell In Patients With Oral Premalignant Lesions",
    "nct": "NCT07631013",
    "phase": "1",
    "asOf": "2026-10-06",
    "setting": "Phase 1 Dose Escalation And Expansion Study Of Intralesional TROP2-CAR/ IL15 TGFBR2 KO Engineered Cord Blood-Derived NK Cells In Patients With Diffused Or Multifocal Oral Premalignant Lesions",
    "sponsor": "M.D. Anderson Cancer Center",
    "tldr": "This study tests TROP-2-directed treatment; the registry reports that it is not yet recruiting.",
    "summary": "The registry lists NCT07631013 as not yet recruiting, last updated 2026-06-11. Enrolment is 36 planned participants, an estimate. Interventions: TROP2 CAR/IL-15 TGFBR2 KO NK cells. Primary measures include Safety and Adverse Events (AEs). No results are posted in the registry; this does not exclude separate publications.",
    "targets": [
      "trop2"
    ],
    "drugs": [],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT07631013",
        "url": "https://clinicaltrials.gov/study/NCT07631013"
      }
    ],
    "status": "planned",
    "started": "2026-12-31",
    "startedType": "estimated",
    "cancers": []
  }
];
