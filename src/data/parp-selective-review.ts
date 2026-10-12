import type { EntityInput } from "@/lib/schema";

/** Primary-source additions. Trial phase does not establish benefit or approval. */
export const parpSelectiveReview: EntityInput[] = [
  {
    "id": "eik1004",
    "kind": "drug",
    "name": "EIK1004",
    "modality": "Small-molecule PARP1 inhibitor",
    "status": "phase-2",
    "asOf": "2026-10-06",
    "tldr": "EIK1004 is an experimental pill being studied to block a DNA-repair enzyme in cancer cells.",
    "summary": "PARP1-selective inhibitor, also called IMP1707. The sponsor describes CNS penetration as a development feature. The linked registry records distinguish recruiting, closed, and discontinued studies; those states do not establish comparative efficacy or approval.",
    "mechanism": "PARP1-selective inhibitor, also called IMP1707. The sponsor describes CNS penetration as a development feature.",
    "targets": [
      "parp"
    ],
    "trials": [
      "nct06907043"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT06907043",
        "url": "https://clinicaltrials.gov/study/NCT06907043"
      },
      {
        "label": "Primary EIK1004 clinical abstract",
        "url": "https://doi.org/10.1158/1538-7445.am2026-ct287"
      }
    ],
    "aka": [
      "IMP1707"
    ],
    "cancers": []
  },
  {
    "id": "hrs-1167",
    "kind": "drug",
    "name": "HRS-1167",
    "modality": "Small-molecule PARP1 inhibitor",
    "status": "phase-2",
    "asOf": "2026-10-06",
    "tldr": "HRS-1167 is an experimental pill being studied to block a DNA-repair enzyme in cancer cells.",
    "summary": "PARP1-selective inhibitor, licensed as M9466. The linked registry records distinguish recruiting, closed, and discontinued studies; those states do not establish comparative efficacy or approval. Merck KGaA reports discontinuing its M9466 development in its 2025 annual report. That sponsor decision does not mean the separate Hengrui studies have all stopped.",
    "mechanism": "PARP1-selective inhibitor, licensed as M9466.",
    "targets": [
      "parp"
    ],
    "trials": [
      "nct06689163",
      "nct06719973",
      "nct06568094",
      "nct06509906",
      "nct06421935",
      "nct06516289",
      "nct06308406",
      "nct05473624"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT06689163",
        "url": "https://clinicaltrials.gov/study/NCT06689163"
      },
      {
        "label": "ClinicalTrials.gov NCT06719973",
        "url": "https://clinicaltrials.gov/study/NCT06719973"
      },
      {
        "label": "ClinicalTrials.gov NCT06568094",
        "url": "https://clinicaltrials.gov/study/NCT06568094"
      },
      {
        "label": "ClinicalTrials.gov NCT06509906",
        "url": "https://clinicaltrials.gov/study/NCT06509906"
      },
      {
        "label": "ClinicalTrials.gov NCT06421935",
        "url": "https://clinicaltrials.gov/study/NCT06421935"
      },
      {
        "label": "ClinicalTrials.gov NCT06516289",
        "url": "https://clinicaltrials.gov/study/NCT06516289"
      },
      {
        "label": "ClinicalTrials.gov NCT06308406",
        "url": "https://clinicaltrials.gov/study/NCT06308406"
      },
      {
        "label": "ClinicalTrials.gov NCT05473624",
        "url": "https://clinicaltrials.gov/study/NCT05473624"
      },
      {
        "label": "Primary publication or sponsor source",
        "url": "https://doi.org/10.1200/JCO.2024.42.16_suppl.3154"
      },
      {
        "label": "Primary publication or sponsor source",
        "url": "https://reports.emdgroup.com/en/annualreport/2025/management-report/fundamental-information-about-the-group/research-and-development/healthcare.html"
      }
    ],
    "aka": [
      "M9466"
    ],
    "cancers": [
      "breast-cancer",
      "ovarian"
    ]
  },
  {
    "id": "nms-03305293",
    "kind": "drug",
    "name": "NMS-03305293",
    "modality": "Small-molecule PARP1 inhibitor",
    "status": "phase-2",
    "asOf": "2026-10-06",
    "tldr": "NMS-03305293 is an experimental pill being studied to block a DNA-repair enzyme in cancer cells.",
    "summary": "PARP1-selective, brain-penetrant inhibitor, also called NMS-293. The linked registry records distinguish recruiting, closed, and discontinued studies; those states do not establish comparative efficacy or approval. The monotherapy study NCT04182516 stopped after 52 actual participants because the sponsor shifted towards combinations, explicitly not because of emerging safety or efficacy concerns. Combination studies include temozolomide and topotecan.",
    "mechanism": "PARP1-selective, brain-penetrant inhibitor, also called NMS-293.",
    "targets": [
      "parp"
    ],
    "trials": [
      "nct06931626",
      "nct04910022",
      "nct06930755",
      "nct04182516"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT06931626",
        "url": "https://clinicaltrials.gov/study/NCT06931626"
      },
      {
        "label": "ClinicalTrials.gov NCT04910022",
        "url": "https://clinicaltrials.gov/study/NCT04910022"
      },
      {
        "label": "ClinicalTrials.gov NCT06930755",
        "url": "https://clinicaltrials.gov/study/NCT06930755"
      },
      {
        "label": "ClinicalTrials.gov NCT04182516",
        "url": "https://clinicaltrials.gov/study/NCT04182516"
      },
      {
        "label": "Primary publication or sponsor source",
        "url": "https://doi.org/10.1158/1535-7163.targ-23-lb_a12"
      }
    ],
    "aka": [
      "NMS-293"
    ],
    "cancers": [
      "sclc",
      "ovarian"
    ]
  },
  {
    "id": "gs-0201",
    "kind": "drug",
    "name": "GS-0201",
    "modality": "Small-molecule PARP1 inhibitor",
    "status": "phase-1",
    "asOf": "2026-10-06",
    "tldr": "GS-0201 is an experimental pill being studied to block a DNA-repair enzyme in cancer cells.",
    "summary": "Gilead describes GS-0201 as a PARP1 inhibitor. The linked registry records distinguish recruiting, closed, and discontinued studies; those states do not establish comparative efficacy or approval. NCT06167317 is recruiting and tests GS-0201 alone and with sacituzumab govitecan, connecting PARP dependency with TROP-2-directed delivery.",
    "mechanism": "Gilead describes GS-0201 as a PARP1 inhibitor.",
    "targets": [
      "parp"
    ],
    "trials": [
      "nct06167317"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT06167317",
        "url": "https://clinicaltrials.gov/study/NCT06167317"
      },
      {
        "label": "Primary publication or sponsor source",
        "url": "https://www.gilead.com/science/pipeline"
      }
    ],
    "aka": [],
    "cancers": []
  },
  {
    "id": "hs-10502",
    "kind": "drug",
    "name": "HS-10502",
    "modality": "Small-molecule PARP1 inhibitor",
    "status": "phase-1",
    "asOf": "2026-10-06",
    "tldr": "HS-10502 is an experimental pill being studied to block a DNA-repair enzyme in cancer cells.",
    "summary": "The registry describes HS-10502 as a PARP1-specific selective inhibitor. The linked registry records distinguish recruiting, closed, and discontinued studies; those states do not establish comparative efficacy or approval.",
    "mechanism": "The registry describes HS-10502 as a PARP1-specific selective inhibitor.",
    "targets": [
      "parp"
    ],
    "trials": [
      "nct05740956",
      "nct06769425"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT05740956",
        "url": "https://clinicaltrials.gov/study/NCT05740956"
      },
      {
        "label": "ClinicalTrials.gov NCT06769425",
        "url": "https://clinicaltrials.gov/study/NCT06769425"
      }
    ],
    "aka": [],
    "cancers": [
      "breast-cancer",
      "ovarian",
      "prostate",
      "pancreatic",
      "colorectal",
      "tnbc",
      "gastric"
    ]
  },
  {
    "id": "snv1521",
    "kind": "drug",
    "name": "SNV1521",
    "modality": "Small-molecule PARP1 inhibitor",
    "status": "phase-1",
    "asOf": "2026-10-06",
    "tldr": "SNV1521 is an experimental pill being studied to block a DNA-repair enzyme in cancer cells.",
    "summary": "Synnovation describes SNV1521 as a PARP1-selective inhibitor. The linked registry records distinguish recruiting, closed, and discontinued studies; those states do not establish comparative efficacy or approval.",
    "mechanism": "Synnovation describes SNV1521 as a PARP1-selective inhibitor.",
    "targets": [
      "parp"
    ],
    "trials": [
      "nct07756281",
      "nct06220864"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT07756281",
        "url": "https://clinicaltrials.gov/study/NCT07756281"
      },
      {
        "label": "ClinicalTrials.gov NCT06220864",
        "url": "https://clinicaltrials.gov/study/NCT06220864"
      },
      {
        "label": "Primary publication or sponsor source",
        "url": "https://www.synnovationtx.com/news/parp1-fip-pressrelease"
      }
    ],
    "aka": [],
    "cancers": [
      "pancreatic"
    ]
  },
  {
    "id": "dsb2455",
    "kind": "drug",
    "name": "DSB2455",
    "modality": "Small-molecule PARP1 inhibitor",
    "status": "phase-1",
    "asOf": "2026-10-06",
    "tldr": "DSB2455 is an experimental pill being studied to block a DNA-repair enzyme in cancer cells.",
    "summary": "The registry describes DSB2455 as a PARP1-selective inhibitor; the sponsor describes CNS activity. The linked registry records distinguish recruiting, closed, and discontinued studies; those states do not establish comparative efficacy or approval. The sponsor reports FDA Fast Track designation for HRR-altered TNBC brain metastases. Fast Track is a development designation, not marketing approval.",
    "mechanism": "The registry describes DSB2455 as a PARP1-selective inhibitor; the sponsor describes CNS activity.",
    "targets": [
      "parp"
    ],
    "trials": [
      "nct06458712"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT06458712",
        "url": "https://clinicaltrials.gov/study/NCT06458712"
      },
      {
        "label": "Primary publication or sponsor source",
        "url": "https://dukestbio.com/duke-street-bio-fda-fast-track-dsb2455/"
      }
    ],
    "aka": [],
    "cancers": [
      "breast-cancer",
      "ovarian",
      "prostate",
      "pancreatic"
    ]
  },
  {
    "id": "nct06167317",
    "kind": "trial",
    "name": "Study of GS-0201 Alone and in Combination in Participants With Advanced Solid Tumors",
    "nct": "NCT06167317",
    "phase": "1",
    "asOf": "2026-10-06",
    "setting": "A Phase 1 Study to Evaluate the Safety and Tolerability of GS-0201 as Monotherapy and in Combination in Adults With Advanced Solid Tumors",
    "sponsor": "Gilead Sciences",
    "tldr": "This study tests a PARP inhibitor; the registry reports that it is recruiting.",
    "summary": "The registry lists NCT06167317 as recruiting, last updated 2026-08-13. Enrolment is 278 planned participants, an estimate. Interventions: GS-0201, Sacituzumab Govitecan. Primary measures include The Number of Participants with Dose Limiting Toxicities (DLTs) During Dose Escalation; The Percentage of Participants with Adverse Events (AEs) and Serious Adverse Events (SAEs). No results are posted in the registry; this does not exclude separate publications.",
    "targets": [
      "parp",
      "trop2"
    ],
    "drugs": [
      "gs-0201",
      "sacituzumab-govitecan"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT06167317",
        "url": "https://clinicaltrials.gov/study/NCT06167317"
      }
    ],
    "status": "recruiting",
    "started": "2024-01-09",
    "startedType": "actual",
    "cancers": []
  },
  {
    "id": "nct06931626",
    "kind": "trial",
    "name": "Study of NMS-03305293 in Adult Patient With Relapsed Small Cell Lung Cancer",
    "nct": "NCT06931626",
    "phase": "1",
    "asOf": "2026-10-06",
    "setting": "Study of NMS-03305293, a Non-Trapping PARP1-Specific PARP Inhibitor in Relapsed Small Cell Lung Cancer",
    "sponsor": "Nerviano Medical Sciences",
    "tldr": "This study tests a PARP inhibitor; the registry reports that it is recruiting.",
    "summary": "The registry lists NCT06931626 as recruiting, last updated 2026-07-24. Enrolment is 10 planned participants, an estimate. Interventions: NMS-03305293, Temozolomide. Primary measures include Number of Participants with Adverse Events (AEs). No results are posted in the registry; this does not exclude separate publications.",
    "targets": [
      "parp"
    ],
    "drugs": [
      "nms-03305293"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT06931626",
        "url": "https://clinicaltrials.gov/study/NCT06931626"
      }
    ],
    "status": "recruiting",
    "started": "2025-08-15",
    "startedType": "actual",
    "cancers": [
      "sclc"
    ]
  },
  {
    "id": "nct02264678",
    "kind": "trial",
    "name": "Ascending Doses of Ceralasertib in Combination With Chemotherapy and/or Novel Anti Cancer Agents",
    "nct": "NCT02264678",
    "phase": "1",
    "asOf": "2026-10-06",
    "setting": "A Modular Phase I, Open-Label, Multicentre Study to Assess the Safety, Tolerability, Pharmacokinetics and Preliminary Anti-tumour Activity of Ceralasertib in Combination With Cytotoxic Chemotherapy and/or DNA Damage Repair/Novel Anti-cancer Agents in Patients With Advanced Solid Malignancies.",
    "sponsor": "AstraZeneca",
    "tldr": "This study tests a PARP inhibitor; the registry reports that it is active not recruiting.",
    "summary": "The registry lists NCT02264678 as active not recruiting, last updated 2026-07-24. Enrolment is 358 actual participants. Interventions: Administration of ceralasertib, Administration of ceralasertib in combination with olaparib, Administation of ceralasertib in combination with durvalumab, Administration of ceralasertib monotherapy, Administration of ceralasertib and olaparib, Administration of ceralasertib and durvalumab, Administration of ceralasertib in combination with AZD5305, Administration of ceralasertib in combination with carboplatin. Primary measures include The number of subjects with adverse events/serious adverse events; Module 4 only: Effect of food on ceralasertib absorption by Intensive PK assessments after a single oral dose of ceralasertib (Part A). No results are posted in the registry; this does not exclude separate publications.",
    "targets": [
      "parp"
    ],
    "drugs": [
      "saruparib"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT02264678",
        "url": "https://clinicaltrials.gov/study/NCT02264678"
      }
    ],
    "status": "active",
    "enrolled": 358,
    "started": "2014-10-31",
    "startedType": "actual",
    "cancers": [
      "breast-cancer",
      "ovarian",
      "gastric",
      "nsclc"
    ]
  },
  {
    "id": "nct07711002",
    "kind": "trial",
    "name": "Saruparib in Combination With Physician's Choice of ARPI in Patients With mHSPC Previously Treated With Docetaxel or 177Lu-PSMA Therapy Without Disease Progression and PSA \u2265 0.2 ng/mL (EvoPAR-PR05)",
    "nct": "NCT07711002",
    "phase": "3",
    "asOf": "2026-10-06",
    "setting": "A Randomized, Double-Blind, Placebo-Controlled, 2-Cohort, Phase III Study of Saruparib Combined With Physician's Choice of Androgen Receptor Pathway Inhibitor in Patients With Metastatic Hormone-Sensitive Prostate Cancer, Previously Treated With Docetaxel or PSMA-directed 177Lutetium-Containing Therapy Without Disease Progression, and With Prostate-Specific Antigen \u2265 0.2 ng/mL: EvoPAR-Prostate05",
    "sponsor": "AstraZeneca",
    "tldr": "This study tests a PARP inhibitor; the registry reports that it is not yet recruiting.",
    "summary": "The registry lists NCT07711002 as not yet recruiting, last updated 2026-07-17. Enrolment is 1330 planned participants, an estimate. Interventions: Saruparib, Placebo, Enzalutamide, Darolutamide, Abiraterone. Primary measures include Radiographic progression-free survival (rPFS). No results are posted in the registry; this does not exclude separate publications.",
    "targets": [
      "parp"
    ],
    "drugs": [
      "saruparib"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT07711002",
        "url": "https://clinicaltrials.gov/study/NCT07711002"
      }
    ],
    "status": "planned",
    "started": "2026-10-01",
    "startedType": "estimated",
    "cancers": [
      "prostate"
    ]
  },
  {
    "id": "nct06719973",
    "kind": "trial",
    "name": "Phase 1 Study of M9466 Combined With Carboplatin and Platinum-based Anticancer Therapy (DDRiver 521)",
    "nct": "NCT06719973",
    "phase": "1",
    "asOf": "2026-10-06",
    "setting": "An Open Label, Multicenter, Phase 1 Study of the PARP1 Inhibitor M9466 in Combination With Carboplatin and Platinum-based Anticancer Therapy (DDRiver 521)",
    "sponsor": "EMD Serono Research & Development Institute, Inc.",
    "tldr": "This study tests a PARP inhibitor; the registry reports that it is withdrawn.",
    "summary": "The registry lists NCT06719973 as withdrawn, last updated 2025-06-17. Enrolment is 0 actual participants. Interventions: M9466, Carboplatin, Etoposide, Atezolizumab, M9446. Primary measures include Module 1 and Module 2: Number of Participants with Treatment-Emergent Adverse Events (TEAEs) and Treatment Related TEAEs; Module 1 and Module 2: Number of Participants with Dose-limiting Toxicity (DLT). The registry reason for stopping is: Study was terminated due to decision made not to proceed with the clinical trial DDRiver 521, that has not yet commenced enrolment, for strategic reasons. No results are posted in the registry; this does not exclude separate publications.",
    "targets": [
      "parp"
    ],
    "drugs": [
      "hrs-1167"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT06719973",
        "url": "https://clinicaltrials.gov/study/NCT06719973"
      }
    ],
    "status": "withdrawn",
    "enrolled": 0,
    "started": "2025-05-14",
    "startedType": "actual",
    "cancers": []
  },
  {
    "id": "nct04550104",
    "kind": "trial",
    "name": "A Platform Study of Novel Agents in Combination With Radiotherapy in NSCLC",
    "nct": "NCT04550104",
    "phase": "1",
    "asOf": "2026-10-06",
    "setting": "A Platform Study of DNA Damage Response Inhibitors in Combination With Conventional Radiotherapy in Non Small Cell Lung Cancer",
    "sponsor": "University of Leeds",
    "tldr": "This study tests a PARP inhibitor; the registry reports that it is recruiting.",
    "summary": "The registry lists NCT04550104 as recruiting, last updated 2025-12-19. Enrolment is 200 planned participants, an estimate. Interventions: Radiotherapy, Olaparib Oral Tablet [Lynparza], AZD1390, Ceralasertib, AZD5305, Durvalumab. Primary measures include Dose limiting Toxicities. No results are posted in the registry; this does not exclude separate publications.",
    "targets": [
      "parp"
    ],
    "drugs": [
      "saruparib"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT04550104",
        "url": "https://clinicaltrials.gov/study/NCT04550104"
      }
    ],
    "status": "recruiting",
    "started": "2021-03-17",
    "startedType": "actual",
    "cancers": [
      "nsclc"
    ]
  },
  {
    "id": "nct07060365",
    "kind": "trial",
    "name": "A Master Protocol Study to Investigate Biomarker-guided Novel Anticancer Agent(s) as Monotherapy or Combination Therapy in Participants With Advanced/Recurrent Ovarian Cancer",
    "nct": "NCT07060365",
    "phase": "1/2",
    "asOf": "2026-10-06",
    "setting": "A Master Protocol Phase I/II Study to Investigate Biomarker-Guided Novel Anticancer Agent(s) as Monotherapy or Combination Therapy for the Treatment of Participants With Advanced/Recurrent Ovarian Cancer (Ovarian Platform)",
    "sponsor": "AstraZeneca",
    "tldr": "This study tests a PARP inhibitor; the registry reports that it is withdrawn.",
    "summary": "The registry lists NCT07060365 as withdrawn, last updated 2026-04-03. Enrolment is 0 actual participants. Interventions: Saruparib. Primary measures include Number of participants with treatment-emergent adverse event (TEAEs), serious adverse events (SAEs), and adverse events (AEs) leading to discontinuation. The registry reason for stopping is: The study termination is based on Sponsor decision and is not related to any safety, efficacy or quality concerns. No results are posted in the registry; this does not exclude separate publications.",
    "targets": [
      "parp"
    ],
    "drugs": [
      "saruparib"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT07060365",
        "url": "https://clinicaltrials.gov/study/NCT07060365"
      }
    ],
    "status": "withdrawn",
    "enrolled": 0,
    "started": "2025-09-02",
    "startedType": "actual",
    "cancers": [
      "ovarian"
    ]
  },
  {
    "id": "nct07832630",
    "kind": "trial",
    "name": "Saruparib in HRDsig+ Solid Tumors",
    "nct": "NCT07832630",
    "phase": "2",
    "asOf": "2026-10-06",
    "setting": "A Phase II Study of Saruparib in Patients With Platinum-Sensitive, HRDsig+ Solid Tumors",
    "sponsor": "Abramson Cancer Center at Penn Medicine",
    "tldr": "This study tests a PARP inhibitor; the registry reports that it is not yet recruiting.",
    "summary": "The registry lists NCT07832630 as not yet recruiting, last updated 2026-09-22. Enrolment is 124 planned participants, an estimate. Interventions: Saruparib, FoundationOne\u00aeCDx. Primary measures include Best objective response as determined by RECIST v.1.1. No results are posted in the registry; this does not exclude separate publications.",
    "targets": [
      "parp"
    ],
    "drugs": [
      "saruparib"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT07832630",
        "url": "https://clinicaltrials.gov/study/NCT07832630"
      }
    ],
    "status": "planned",
    "started": "2026-11-01",
    "startedType": "estimated",
    "cancers": []
  },
  {
    "id": "nct06509906",
    "kind": "trial",
    "name": "M9466 in Combination With Topoisomerase 1 Inhibitors-based Regimens in Advanced Solid Tumors and Colorectal Cancer (DDRiver 511)",
    "nct": "NCT06509906",
    "phase": "1",
    "asOf": "2026-10-06",
    "setting": "An Open Label, Multicenter, Phase 1 Study to Evaluate the Safety, Tolerability, and Pharmacokinetic/Pharmacodynamic Profile of the PARP1 Inhibitor M9466 in Combination With Topoisomerase 1 Inhibitor-based Regimens in Advanced Solid Tumors and Colorectal Cancer (DDRiver 511)",
    "sponsor": "EMD Serono Research & Development Institute, Inc.",
    "tldr": "This study tests a PARP inhibitor; the registry reports that it is terminated.",
    "summary": "The registry lists NCT06509906 as terminated, last updated 2025-12-18. Enrolment is 3 actual participants. Interventions: M9466, Irinotecan, Folinic acid, Fluorouracil (5-FU), Bevacizumab, Granulocyte colony stimulating factor (G-CSF). Primary measures include Number of Participants with Treatment-Emergent Adverse Events (TEAEs) and Treatment Related TEAEs; Number of Participants with Dose Limiting Toxicity (DLT). The registry reason for stopping is: Sponsor Decision No results are posted in the registry; this does not exclude separate publications.",
    "targets": [
      "parp"
    ],
    "drugs": [
      "hrs-1167"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT06509906",
        "url": "https://clinicaltrials.gov/study/NCT06509906"
      }
    ],
    "status": "withdrawn",
    "enrolled": 3,
    "started": "2024-10-08",
    "startedType": "actual",
    "cancers": []
  },
  {
    "id": "nct06899061",
    "kind": "trial",
    "name": "Modular Clinical Pharmacology Study to Evaluate the Drug-drug Interaction Potential and Relative Bioavailability of Saruparib",
    "nct": "NCT06899061",
    "phase": "1",
    "asOf": "2026-10-06",
    "setting": "A Modular Phase I, Open-label Study to Assess the Safety, Pharmacokinetics, and Drug Interaction Potential and Relative Bioavailability of Saruparib in Patients With Advanced Solid Malignancies",
    "sponsor": "AstraZeneca",
    "tldr": "This study tests a PARP inhibitor; the registry reports that it is active not recruiting.",
    "summary": "The registry lists NCT06899061 as active not recruiting, last updated 2026-10-01. Enrolment is 41 actual participants. Interventions: Saruparib, Digoxin, Furosemide, Metformin Hydrochloride, Rosuvastatin, Rabeprazole. Primary measures include Module 1: Area under plasma concentration-time curve from zero extrapolated to infinity (AUCinf) of digoxin, furosemide, metformin and rosuvastatin when dosed alone and in combination with saruparib; Module 1: Area under the plasma concentration curve from zero to the last quantifiable concentration (AUClast) of digoxin, furosemide, metformin and rosuvastatin when dosed alone and in combination with saruparib. No results are posted in the registry; this does not exclude separate publications.",
    "targets": [
      "parp"
    ],
    "drugs": [
      "saruparib"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT06899061",
        "url": "https://clinicaltrials.gov/study/NCT06899061"
      }
    ],
    "status": "active",
    "enrolled": 41,
    "started": "2025-03-25",
    "startedType": "actual",
    "cancers": []
  },
  {
    "id": "nct06421935",
    "kind": "trial",
    "name": "M9466 Alone or in Combination in Advanced Solid Tumors (DDriver 501)",
    "nct": "NCT06421935",
    "phase": "1",
    "asOf": "2026-10-06",
    "setting": "An Open Label, Multicenter, Phase 1 Study to Evaluate the Safety, Tolerability, and Pharmacokinetic/Pharmacodynamic Profile of the PARP1 Inhibitor M9466 Alone or in Combination in Participants With Advanced Solid Tumors",
    "sponsor": "EMD Serono Research & Development Institute, Inc.",
    "tldr": "This study tests a PARP inhibitor; the registry reports that it is active not recruiting.",
    "summary": "The registry lists NCT06421935 as active not recruiting, last updated 2026-09-09. Enrolment is 60 actual participants. Interventions: M9466, Tuvusertib, Abiraterone acetate, Prednisone/Prednisolone. Primary measures include Module 1 Part A1 and Part A2: Number of Participants With Treatment-Emergent Adverse Events (TEAE), and Treatment-related AEs (TRAEs); Module 1 Part A1 and Part A2: Number of Participants with Dose Limiting Toxicity (DLT)-like events. No results are posted in the registry; this does not exclude separate publications.",
    "targets": [
      "parp"
    ],
    "drugs": [
      "hrs-1167"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT06421935",
        "url": "https://clinicaltrials.gov/study/NCT06421935"
      }
    ],
    "status": "active",
    "enrolled": 60,
    "started": "2024-08-07",
    "startedType": "actual",
    "cancers": []
  },
  {
    "id": "nct06516289",
    "kind": "trial",
    "name": "Neoadjuvant Treatment of gBRCA-Mutated HER2-Negative Breast Cancer With HRS-1167 and Famitinib \u00b1 Camrelizumab",
    "nct": "NCT06516289",
    "phase": "2",
    "asOf": "2026-10-06",
    "setting": "Neoadjuvant Treatment of gBRCA-Mutated HER2-Negative Breast Cancer With HRS-1167 and Famitinib/ HRS-1167, Famitinib and Camrelizumab: A Prospective, Open-label, Multicenter, Phase II Trial",
    "sponsor": "Fudan University",
    "tldr": "This study tests a PARP inhibitor; the registry reports that it is recruiting.",
    "summary": "The registry lists NCT06516289 as recruiting, last updated 2024-12-12. Enrolment is 130 planned participants, an estimate. Interventions: HRS-1167, Famitinib, Camrelizumab. Primary measures include Safety run-in: Incidence rate of dose-limiting toxicities (DLTs); Safety run-in: adverse events (AEs). No results are posted in the registry; this does not exclude separate publications.",
    "targets": [
      "parp"
    ],
    "drugs": [
      "hrs-1167"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT06516289",
        "url": "https://clinicaltrials.gov/study/NCT06516289"
      }
    ],
    "status": "recruiting",
    "started": "2024-09-30",
    "startedType": "actual",
    "cancers": [
      "breast-cancer"
    ]
  },
  {
    "id": "nct06930755",
    "kind": "trial",
    "name": "Study of NMS-03305293 in Adult Patients With Relapsed Ovarian Cancer",
    "nct": "NCT06930755",
    "phase": "1",
    "asOf": "2026-10-06",
    "setting": "Study of NMS-03305293, a Non-Trapping PARP1-Specific PARP Inhibitor in Relapsed Ovarian Cancer",
    "sponsor": "Nerviano Medical Sciences",
    "tldr": "This study tests a PARP inhibitor; the registry reports that it is recruiting.",
    "summary": "The registry lists NCT06930755 as recruiting, last updated 2026-05-28. Enrolment is 24 planned participants, an estimate. Interventions: NMS-03305293, Topotecan. Primary measures include Number of Participants with Adverse Events (AEs). No results are posted in the registry; this does not exclude separate publications.",
    "targets": [
      "parp"
    ],
    "drugs": [
      "nms-03305293"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT06930755",
        "url": "https://clinicaltrials.gov/study/NCT06930755"
      }
    ],
    "status": "recruiting",
    "started": "2026-05-13",
    "startedType": "actual",
    "cancers": [
      "ovarian"
    ]
  },
  {
    "id": "nct05938270",
    "kind": "trial",
    "name": "A Study to Investigate the Biological Effects of Saruparib (AZD5305), Darolutamide, and in Combination in Men With Newly Diagnosed Prostate Cancer.",
    "nct": "NCT05938270",
    "phase": "1",
    "asOf": "2026-10-06",
    "setting": "An Open-label, Randomised, Phase-I, Multi-Centre Study to Investigate the Biological Effects of Saruparib (AZD5305) Alone, Darolutamide Alone, and in Combination Given Prior to Radical Prostatectomy in Men With Newly Diagnosed Prostate Cancer (ASCERTAIN)",
    "sponsor": "AstraZeneca",
    "tldr": "This study tests a PARP inhibitor; the registry reports that it is completed.",
    "summary": "The registry lists NCT05938270 as completed, last updated 2026-06-30. Enrolment is 113 actual participants. Interventions: Saruparib (AZD5305), Darolutamide, No Treatment. Primary measures include Fold change in % \u03b3H2AX positive cells from baseline value in tumour samples. No results are posted in the registry; this does not exclude separate publications.",
    "targets": [
      "parp"
    ],
    "drugs": [
      "saruparib"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT05938270",
        "url": "https://clinicaltrials.gov/study/NCT05938270"
      }
    ],
    "status": "completed",
    "enrolled": 113,
    "started": "2023-09-21",
    "startedType": "actual",
    "cancers": [
      "prostate"
    ]
  },
  {
    "id": "nct06769126",
    "kind": "trial",
    "name": "Using Biomarker Tests to Select and Test New, Personalized Treatments for Extensive Stage Small Cell Lung Cancer, PRISM Study",
    "nct": "NCT06769126",
    "phase": "2",
    "asOf": "2026-10-06",
    "setting": "PRISM: PRecIsion in SCLC Via a Multicohort Study: Randomized Phase II Studies Evaluating Maintenance Durvalumab With or Without Biomarker-Directed Therapy for Extensive Stage Small Cell Lung Cancer (ES-SCLC)",
    "sponsor": "SWOG Cancer Research Network",
    "tldr": "This study tests a PARP inhibitor; the registry reports that it is recruiting.",
    "summary": "The registry lists NCT06769126 as recruiting, last updated 2026-03-30. Enrolment is 900 planned participants, an estimate. Interventions: Biospecimen Collection, Ceralasertib, Computed Tomography, Durvalumab, Etoposide, Magnetic Resonance Imaging, Monalizumab, Platinum Compound, Positron Emission Tomography, Saruparib, Thoracic Radiation Therapy. Primary measures include Screen success rate (Screening); Progression-free survival (PFS) (Cohort A). No results are posted in the registry; this does not exclude separate publications.",
    "targets": [
      "parp"
    ],
    "drugs": [
      "saruparib"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT06769126",
        "url": "https://clinicaltrials.gov/study/NCT06769126"
      }
    ],
    "status": "recruiting",
    "started": "2025-11-06",
    "startedType": "actual",
    "cancers": [
      "sclc"
    ]
  },
  {
    "id": "nct06308406",
    "kind": "trial",
    "name": "A Phase Ib/II Clinical Study of HRS-1167 in Combination With Bevacizumab in Patients With Recurrent Ovarian Cancer",
    "nct": "NCT06308406",
    "phase": "1/2",
    "asOf": "2026-10-06",
    "setting": "A Phase Ib/II Clinical Study of HRS-1167 in Combination With Bevacizumab in Patients With Recurrent Ovarian Cancer",
    "sponsor": "Jiangsu HengRui Medicine Co., Ltd.",
    "tldr": "This study tests a PARP inhibitor; the registry reports that it is unknown.",
    "summary": "The registry lists NCT06308406 as unknown, last updated 2024-04-11. Enrolment is 54 planned participants, an estimate. Interventions: Bevacizumab\uff1b HRS-1167. Primary measures include The number of subjects with dose-limiting toxicity (DLT); Determination of Recommended Phase II dose (RP2D). No results are posted in the registry; this does not exclude separate publications.",
    "targets": [
      "parp"
    ],
    "drugs": [
      "hrs-1167"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT06308406",
        "url": "https://clinicaltrials.gov/study/NCT06308406"
      }
    ],
    "started": "2024-03-15",
    "startedType": "actual",
    "cancers": [
      "ovarian"
    ]
  },
  {
    "id": "nct05573724",
    "kind": "trial",
    "name": "Drug-drug Interaction Study With AZD5305 and Itraconazole in Patients With Advanced Solid Malignancies",
    "nct": "NCT05573724",
    "phase": "1",
    "asOf": "2026-10-06",
    "setting": "A Non-randomized, Open-label, Fixed-sequence Phase I Study to Assess the Effect of Itraconazole (a CYP3A4 Inhibitor) on the Pharmacokinetics of AZD5305 in Patients With Advanced Solid Malignancies",
    "sponsor": "AstraZeneca",
    "tldr": "This study tests a PARP inhibitor; the registry reports that it is completed.",
    "summary": "The registry lists NCT05573724 as completed, last updated 2024-06-18. Enrolment is 16 actual participants. Interventions: AZD5305, Itraconazole. Primary measures include Part A: Area under the concentration-time curve from time zero to infinity (AUCinf); Part A: AUC from time zero to time of last measurable concentration (AUClast). No results are posted in the registry; this does not exclude separate publications.",
    "targets": [
      "parp"
    ],
    "drugs": [
      "saruparib"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT05573724",
        "url": "https://clinicaltrials.gov/study/NCT05573724"
      }
    ],
    "status": "completed",
    "enrolled": 16,
    "started": "2022-11-07",
    "startedType": "actual",
    "cancers": []
  },
  {
    "id": "nct06713369",
    "kind": "trial",
    "name": "AZD5305 hADME in Patients With Advanced Solid Malignancies",
    "nct": "NCT06713369",
    "phase": "1",
    "asOf": "2026-10-06",
    "setting": "A Phase I, Open-label Study to Assess the Absolute Bioavailability of Saruparib (AZD5305) and Absorption, Distribution, Metabolism, and Excretion (ADME) of [14C]-Saruparib ([14C]-AZD5305) in Patients With Advanced Solid Malignancies",
    "sponsor": "AstraZeneca",
    "tldr": "This study tests a PARP inhibitor; the registry reports that it is recruiting.",
    "summary": "The registry lists NCT06713369 as recruiting, last updated 2026-06-24. Enrolment is 8 planned participants, an estimate. Interventions: Saruparib (AZD5305), [14C]-AZD5305 microtracer, [14C]-AZD5305 (therapeutic dose). Primary measures include Absolute bioavailability (F) of Saruparib; Total radioactivity recovery in urine and faeces. No results are posted in the registry; this does not exclude separate publications.",
    "targets": [
      "parp"
    ],
    "drugs": [
      "saruparib"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT06713369",
        "url": "https://clinicaltrials.gov/study/NCT06713369"
      }
    ],
    "status": "recruiting",
    "started": "2025-04-02",
    "startedType": "actual",
    "cancers": []
  },
  {
    "id": "nct04182516",
    "kind": "trial",
    "name": "Study of NMS-03305293 in Pts with Selected Advanced/Metastatic Solid Tumors",
    "nct": "NCT04182516",
    "phase": "1",
    "asOf": "2026-10-06",
    "setting": "A Phase I Dose Escalation Study of NMS-03305293 in Adult Patients with Selected Advanced/Metastatic Solid Tumors",
    "sponsor": "Nerviano Medical Sciences",
    "tldr": "This study tests a PARP inhibitor; the registry reports that it is terminated.",
    "summary": "The registry lists NCT04182516 as terminated, last updated 2024-09-19. Enrolment is 52 actual participants. Interventions: NMS-03305293. Primary measures include Number of Participants with first-cycle dose limiting toxicity. The registry reason for stopping is: The study closure is related to sponsor decision to shift towards the clinical development of NMS-03305293 in combination in a broader range of indication and not based on emerging safety or efficacy concerns. No results are posted in the registry; this does not exclude separate publications.",
    "targets": [
      "parp"
    ],
    "drugs": [
      "nms-03305293"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT04182516",
        "url": "https://clinicaltrials.gov/study/NCT04182516"
      }
    ],
    "status": "withdrawn",
    "enrolled": 52,
    "started": "2019-11-25",
    "startedType": "actual",
    "cancers": []
  },
  {
    "id": "nct05473624",
    "kind": "trial",
    "name": "Study of HRS-1167 as Monotherapy in Patients With Advanced Solid Tumors",
    "nct": "NCT05473624",
    "phase": "1",
    "asOf": "2026-10-06",
    "setting": "A Phase I, Open-label, Multicenter Study to Assess the Safety, Tolerability, Pharmacokinetics and Preliminary Efficacy of HRS-1167 as Monotherapy in Patients With Advanced Solid Tumors",
    "sponsor": "Jiangsu HengRui Medicine Co., Ltd.",
    "tldr": "This study tests a PARP inhibitor; the registry reports that it is recruiting.",
    "summary": "The registry lists NCT05473624 as recruiting, last updated 2025-04-15. Enrolment is 153 planned participants, an estimate. Interventions: HRS-1167. Primary measures include Dose-limiting toxicity (DLT) of HRS-1167; Maximum tolerated dose (MTD) of HRS-1167. No results are posted in the registry; this does not exclude separate publications.",
    "targets": [
      "parp"
    ],
    "drugs": [
      "hrs-1167"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT05473624",
        "url": "https://clinicaltrials.gov/study/NCT05473624"
      }
    ],
    "status": "recruiting",
    "started": "2022-08-23",
    "startedType": "actual",
    "cancers": []
  },
  {
    "id": "nct07756281",
    "kind": "trial",
    "name": "First in Human Study of SNV1521 With a RAS Inhibitor for People With Advanced Pancreatic Cancer",
    "nct": "NCT07756281",
    "phase": "1",
    "asOf": "2026-10-06",
    "setting": "A Phase 1, Open-Label, Dose-Escalation and Expansion Study of SNV1521 in Combination With RAS Inhibition in Participants With Locally Advanced Unresectable or Metastatic Pancreatic Cancer",
    "sponsor": "Synnovation Therapeutics, Inc.",
    "tldr": "This study tests a PARP inhibitor; the registry reports that it is not yet recruiting.",
    "summary": "The registry lists NCT07756281 as not yet recruiting, last updated 2026-08-10. Enrolment is 40 planned participants, an estimate. Interventions: SNV1521, daraxonrasib. Primary measures include Safety and tolerability of SNV1521 plus daraxonrasib: treatment-emergent adverse events, serious adverse events, and dose-limiting toxicities. No results are posted in the registry; this does not exclude separate publications.",
    "targets": [
      "parp"
    ],
    "drugs": [
      "snv1521"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT07756281",
        "url": "https://clinicaltrials.gov/study/NCT07756281"
      }
    ],
    "status": "planned",
    "started": "2026-09",
    "startedType": "estimated",
    "cancers": [
      "pancreatic"
    ]
  },
  {
    "id": "nct06458712",
    "kind": "trial",
    "name": "Study to Assess Safety, Tolerability and Activity of DSB2455 in Participants With Advanced Malignancies",
    "nct": "NCT06458712",
    "phase": "1",
    "asOf": "2026-10-06",
    "setting": "Phase Ia/Ib Open Label, Multi-Centre Dose Escalation Study With Expansion Cohorts to Assess the Safety, Tolerability, and Activity of DSB2455 as Monotherapy in Participants With Advanced Malignancies",
    "sponsor": "Duke Street Bio Ltd",
    "tldr": "This study tests a PARP inhibitor; the registry reports that it is recruiting.",
    "summary": "The registry lists NCT06458712 as recruiting, last updated 2026-09-02. Enrolment is 180 planned participants, an estimate. Interventions: DSB2455. Primary measures include Number of patients demonstrating dose limiting toxicities and SAEs; Number of patients exhibiting reduction in tumor size.. No results are posted in the registry; this does not exclude separate publications.",
    "targets": [
      "parp"
    ],
    "drugs": [
      "dsb2455"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT06458712",
        "url": "https://clinicaltrials.gov/study/NCT06458712"
      }
    ],
    "status": "recruiting",
    "started": "2024-11-21",
    "startedType": "actual",
    "cancers": [
      "breast-cancer",
      "ovarian",
      "prostate",
      "pancreatic"
    ]
  },
  {
    "id": "nct06220864",
    "kind": "trial",
    "name": "SNV1521 in Participants With Advanced Solid Tumors",
    "nct": "NCT06220864",
    "phase": "1",
    "asOf": "2026-10-06",
    "setting": "A Phase 1, Open-Label Dose Escalation and Expansion Study of SNV1521 in Participants With Advanced Solid Tumors",
    "sponsor": "Synnovation Therapeutics, Inc.",
    "tldr": "This study tests a PARP inhibitor; the registry reports that it is recruiting.",
    "summary": "The registry lists NCT06220864 as recruiting, last updated 2026-06-25. Enrolment is 400 planned participants, an estimate. Interventions: SNV1521, DB-1310, Abiraterone, Darolutamide. Primary measures include Safety of SNV1521; Tolerability of SNV1521. No results are posted in the registry; this does not exclude separate publications.",
    "targets": [
      "parp"
    ],
    "drugs": [
      "snv1521"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT06220864",
        "url": "https://clinicaltrials.gov/study/NCT06220864"
      }
    ],
    "status": "recruiting",
    "started": "2024-02-23",
    "startedType": "actual",
    "cancers": []
  },
  {
    "id": "nct05740956",
    "kind": "trial",
    "name": "A Study of Hansoh (HS)-10502 in Patients With Advanced Solid Tumors",
    "nct": "NCT05740956",
    "phase": "1",
    "asOf": "2026-10-06",
    "setting": "A Phase I Clinical Study to Evaluate the Safety, Tolerability, Pharmacokinetics and Efficacy of HS-10502 in Patients With Advanced Solid Tumors",
    "sponsor": "Jiangsu Hansoh Pharmaceutical Co., Ltd.",
    "tldr": "This study tests a PARP inhibitor; the registry reports that it is recruiting.",
    "summary": "The registry lists NCT05740956 as recruiting, last updated 2025-06-05. Enrolment is 318 planned participants, an estimate. Interventions: HS-10502. Primary measures include Maximum tolerated dose (MTD) of HS-10502\uff08Stage 1\uff09; Maximum applicable dose (MAD) of HS-10502\uff08Stage 1\uff09. No results are posted in the registry; this does not exclude separate publications.",
    "targets": [
      "parp"
    ],
    "drugs": [
      "hs-10502"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT05740956",
        "url": "https://clinicaltrials.gov/study/NCT05740956"
      }
    ],
    "status": "recruiting",
    "started": "2023-06-09",
    "startedType": "actual",
    "cancers": [
      "breast-cancer",
      "ovarian",
      "prostate",
      "pancreatic",
      "colorectal"
    ]
  },
  {
    "id": "nct06769425",
    "kind": "trial",
    "name": "HS-10502 Combination Treatment in Patients With Advanced Solid Tumors",
    "nct": "NCT06769425",
    "phase": "1",
    "asOf": "2026-10-06",
    "setting": "A Phase I Study to Evaluate the Safety, Tolerability, Pharmacokinetics and Efficacy of HS-10502 Combination Treatment in Subjects With Advanced Solid Tumors",
    "sponsor": "Jiangsu Hansoh Pharmaceutical Co., Ltd.",
    "tldr": "This study tests a PARP inhibitor; the registry reports that it is recruiting.",
    "summary": "The registry lists NCT06769425 as recruiting, last updated 2025-06-24. Enrolment is 157 planned participants, an estimate. Interventions: HS-10502 + NHA, HS-10502 + HS-20093, HS-10502+ Apatinib, HS-10502 + HS-20089, HS-10502 + Platinum + Bevacizumab, HS-10502 + nab-paclitaxel or Docetaxel or Irinotecan, HS-10502 + Bevacizumab. Primary measures include Maximum tolerated dose (MTD) of HS-10502\uff08Stage 1\uff1aDose escalating stage\uff09; Maximum applicable dose (MAD) of HS-10502\uff08Stage 1\uff1aDose escalating stage\uff09. No results are posted in the registry; this does not exclude separate publications.",
    "targets": [
      "parp"
    ],
    "drugs": [
      "hs-10502"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT06769425",
        "url": "https://clinicaltrials.gov/study/NCT06769425"
      }
    ],
    "status": "recruiting",
    "started": "2025-05-07",
    "startedType": "actual",
    "cancers": [
      "breast-cancer",
      "tnbc",
      "ovarian",
      "prostate",
      "gastric"
    ]
  },
  {
    "id": "nct03344965",
    "kind": "trial",
    "name": "Olaparib In Metastatic Breast Cancer",
    "nct": "NCT03344965",
    "phase": "2",
    "asOf": "2026-10-10",
    "setting": "A Phase 2 Study of Olaparib Monotherapy in Metastatic Breast Cancer Patients With Germline or Somatic Mutations in DNA Repair Genes (Olaparib Expanded)",
    "sponsor": "Beth Israel Deaconess Medical Center",
    "tldr": "Olaparib showed activity in metastatic breast cancer with germline PALB2 or somatic BRCA alterations, but the somatic cohort missed its prespecified response target.",
    "summary": "The registry lists NCT03344965 as active not recruiting, last updated 2026-01-05. Enrolment is 114 planned participants, an estimate. Interventions: Olaparib. Primary measures include Objective Response Rate. No results are posted in the registry; this does not exclude separate publications. The 2026 expansion publication reports 54 participants: 24 germline PALB2 and 30 somatic BRCA1/2, with 42 ER-positive/HER2-negative, seven TNBC and five HER2-positive cancers. Germline PALB2 response was 75% (80% CI 60.2-86.3), median PFS 9.4 months (90% CI 8.3-13.1). Somatic BRCA response was 36.7% (80% CI 24.7-50.0), median PFS 5.5 months (90% CI 2.8-8.3), and failed the prespecified response target. This metastatic single-arm evidence does not establish an adjuvant somatic-BRCA indication.",
    "targets": [
      "parp"
    ],
    "drugs": [
      "olaparib"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT03344965",
        "url": "https://clinicaltrials.gov/study/NCT03344965"
      },
      {
        "label": "TBCRC 048 expansion, 2026",
        "url": "https://doi.org/10.1200/JCO-25-02075"
      }
    ],
    "status": "active",
    "started": "2018-04-01",
    "startedType": "actual",
    "outcomes": [
      {
        "endpoint": "Objective response, germline PALB2 cohort (2026 expansion)",
        "unit": "%",
        "arms": [
          {
            "name": "Olaparib, germline PALB2",
            "n": 24,
            "value": 75,
            "note": "80% CI 60.2-86.3; single-arm cohort, predominantly ER-positive breast cancer across the trial"
          }
        ],
        "source": "https://doi.org/10.1200/JCO-25-02075"
      },
      {
        "endpoint": "Objective response, somatic BRCA1/2 cohort (2026 expansion)",
        "unit": "%",
        "arms": [
          {
            "name": "Olaparib, somatic BRCA1/2",
            "n": 30,
            "value": 36.7,
            "note": "80% CI 24.7-50.0; prespecified response target not achieved"
          }
        ],
        "source": "https://doi.org/10.1200/JCO-25-02075"
      }
    ],
    "cancers": [
      "breast-cancer"
    ],
    "keyPapers": [
      "paper-tung-tbcrc048-expansion-jco-2026"
    ]
  },
  {
    "id": "nct04191135",
    "kind": "trial",
    "name": "Study of Olaparib Plus Pembrolizumab Versus Chemotherapy Plus Pembrolizumab After Induction With First-Line Chemotherapy Plus Pembrolizumab in Triple Negative Breast Cancer (TNBC) (MK-7339-009/KEYLYNK-009)",
    "nct": "NCT04191135",
    "phase": "2",
    "asOf": "2026-10-06",
    "setting": "An Open-label, Randomized, Phase 2/3 Study of Olaparib Plus Pembrolizumab Versus Chemotherapy Plus Pembrolizumab After Induction of Clinical Benefit With First-line Chemotherapy Plus Pembrolizumab in Participants With Locally Recurrent Inoperable or Metastatic Triple Negative Breast Cancer (TNBC) (KEYLYNK-009)",
    "sponsor": "Merck Sharp & Dohme LLC",
    "tldr": "Replacing chemotherapy with olaparib alongside pembrolizumab did not improve the primary progression-free survival outcome in metastatic TNBC.",
    "summary": "The registry lists NCT04191135 as terminated, last updated 2026-09-14. Enrolment is 462 actual participants. Interventions: Pembrolizumab, Olaparib, Carboplatin, Gemcitabine. Primary measures include Progression-Free Survival (PFS); Overall Survival (OS). The registry reason for stopping is: Business Reasons Results are posted in the registry. The primary paper reports 460 participants receiving induction and 271 randomised; these analysis populations differ from the registry total of 462. Median PFS was 5.5 versus 5.6 months (HR 0.98, 95% CI 0.72-1.33, p=0.4556), and OS 25.1 versus 23.4 months (HR 0.95, 95% CI 0.64-1.40). Exploratory tumour-BRCA subgroup estimates were imprecise and do not establish a positive subgroup trial.",
    "targets": [
      "parp"
    ],
    "drugs": [
      "olaparib"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT04191135",
        "url": "https://clinicaltrials.gov/study/NCT04191135"
      },
      {
        "label": "Primary KEYLYNK-009 publication",
        "url": "https://doi.org/10.1158/1078-0432.CCR-25-1818"
      }
    ],
    "status": "withdrawn",
    "enrolled": 462,
    "started": "2019-12-19",
    "startedType": "actual",
    "outcomes": [
      {
        "endpoint": "Progression-free survival, randomised maintenance population",
        "primary": true,
        "unit": "months",
        "arms": [
          {
            "name": "Pembrolizumab plus olaparib",
            "value": 5.5
          },
          {
            "name": "Pembrolizumab plus chemotherapy",
            "value": 5.6
          }
        ],
        "hr": 0.98,
        "ci": [
          0.72,
          1.33
        ],
        "p": "0.4556",
        "source": "https://doi.org/10.1158/1078-0432.CCR-25-1818"
      },
      {
        "endpoint": "Overall survival, randomised maintenance population",
        "unit": "months",
        "arms": [
          {
            "name": "Pembrolizumab plus olaparib",
            "value": 25.1
          },
          {
            "name": "Pembrolizumab plus chemotherapy",
            "value": 23.4
          }
        ],
        "hr": 0.95,
        "ci": [
          0.64,
          1.4
        ],
        "source": "https://doi.org/10.1158/1078-0432.CCR-25-1818"
      }
    ],
    "cancers": [
      "breast-cancer",
      "tnbc"
    ]
  },
  {
    "id": "nct03990896",
    "kind": "trial",
    "name": "Evaluation of Talazoparib, a PARP Inhibitor, in Patients With Somatic BRCA Mutant Metastatic Breast Cancer: Genotyping Based Clinical Trial",
    "nct": "NCT03990896",
    "phase": "2",
    "asOf": "2026-10-10",
    "setting": "Metastatic HER2-negative breast cancer with deleterious somatic BRCA1/2; germline BRCA carriers excluded",
    "sponsor": "Massachusetts General Hospital",
    "tldr": "This trial tests talazoparib in metastatic breast cancer with a tumour-only BRCA mutation. It is recruiting, but is not an after-surgery recurrence-prevention study.",
    "summary": "The registry lists NCT03990896 as recruiting, last updated 2026-05-06, with 30 planned participants. The live inclusion criteria require a deleterious somatic BRCA1/2 mutation detectable in circulating DNA by a CLIA-certified clinical assay, subject to investigator discretion. TNBC requires progression on at least one chemotherapy regimen in the metastatic setting; hormone-receptor-positive disease requires prior endocrine progression or unsuitability. Evaluable or measurable disease, no prior PARP inhibitor and no concurrent anticancer therapy are required. Prior platinum is permitted only without progression on platinum or within six months after neoadjuvant/adjuvant platinum. UCSF and six other US sites are listed recruiting; this does not confirm a site slot. Older trial-in-progress material mentions tissue-or-cfDNA genotyping, so tissue-only eligibility needs investigator confirmation rather than assuming the current registry gate is broader. No registry results are posted; that does not exclude separate publications.",
    "targets": [
      "parp"
    ],
    "drugs": [
      "talazoparib"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT03990896",
        "url": "https://clinicaltrials.gov/study/NCT03990896"
      },
      {
        "label": "UCSF trial listing and eligibility",
        "url": "https://clinicaltrials.ucsf.edu/trial/NCT03990896"
      }
    ],
    "status": "recruiting",
    "started": "2021-11-18",
    "startedType": "actual",
    "cancers": [
      "breast-cancer"
    ],
    "enrolled": 30
  },
  {
    "id": "nct05332561",
    "kind": "trial",
    "name": "Genomics Guided Targeted Post-neoadjuvant Therapy in Patients With Early Breast Cancer (COGNITION-GUIDE)",
    "nct": "NCT05332561",
    "phase": "2",
    "asOf": "2026-10-10",
    "setting": "Genomics Guided Targeted Post-neoadjuvant Therapy in Patients With Early Breast Cancer - a Multicenter, Open-label, Umbrella Phase-II Study - COGNITION-GUIDE",
    "sponsor": "German Cancer Research Center",
    "tldr": "This German study assigns additional treatment after surgery according to tumour profiling. Its olaparib arm can accept qualifying tumour-only BRCA alterations.",
    "summary": "The registry lists NCT05332561 as recruiting, last updated 2025-03-20. Enrolment is 240 planned participants, an estimate. Interventions: Atezolizumab 1200 mg in 20 ML Injection, Inavolisib, Ipatasertib, Olaparib, Sacituzumab govitecan, Trastuzumab/pertuzumab. Primary measures include Invasive Disease-free Survival (IDFS) as defined by Hudis et al in the entire study population four years after surgery. No results are posted in the registry; this does not exclude separate publications. The current registry lists German sites and no US site. Arm 4 accepts inactivating somatic or germline BRCA1/2, including homozygous deletions, or inactivating germline PALB2, with assignment exclusively determined by the molecular tumour board. Separate arms target separate pathways; the platform is not a combined PARP regimen or proof of adjuvant benefit for somatic-only BRCA.",
    "targets": [
      "parp"
    ],
    "drugs": [
      "olaparib"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT05332561",
        "url": "https://clinicaltrials.gov/study/NCT05332561"
      }
    ],
    "status": "recruiting",
    "started": "2023-06-29",
    "startedType": "actual",
    "cancers": [
      "breast-cancer"
    ]
  },
  {
    "id": "nct03945721",
    "kind": "trial",
    "name": "Niraparib with postoperative radiotherapy in residual TNBC",
    "nct": "NCT03945721",
    "phase": "1",
    "asOf": "2026-10-10",
    "setting": "Residual non-metastatic TNBC after definitive surgery, with planned postoperative radiation",
    "sponsor": "Massachusetts General Hospital",
    "tldr": "Niraparib is studied with radiation after breast surgery. The study is active but is not accepting new participants.",
    "summary": "Registry status active not recruiting, last updated 2026-06-17. Enrollment is 21 actual. Residual non-metastatic TNBC after definitive surgery, with planned postoperative radiation. The registry requires residual invasive disease after neoadjuvant chemotherapy, or at least 1 cm for surgery-first patients, performance status and organ-function gates, and discontinuation of cytotoxic, immune and biologic treatment before RT. This phase 1 safety strategy does not establish recurrence prevention or current access.",
    "status": "active",
    "started": "2019-07-11",
    "startedType": "actual",
    "enrolled": 21,
    "targets": [
      "parp"
    ],
    "drugs": [
      "niraparib"
    ],
    "cancers": [
      "tnbc"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT03945721",
        "url": "https://clinicaltrials.gov/study/NCT03945721"
      }
    ]
  },
  {
    "id": "nct03542175",
    "kind": "trial",
    "name": "Rucaparib with radiation after incomplete response to chemotherapy",
    "nct": "NCT03542175",
    "phase": "1",
    "asOf": "2026-10-10",
    "setting": "Residual non-metastatic TNBC or selected high-risk hormone-receptor-positive/HER2-negative disease after neoadjuvant chemotherapy and definitive surgery",
    "sponsor": "Memorial Sloan Kettering Cancer Center",
    "tldr": "This completed study tested a DNA-repair drug with radiation after breast surgery. It does not offer new enrollment.",
    "summary": "Registry status completed, last updated 2025-12-08. Enrollment is 31 actual. Residual non-metastatic TNBC or selected high-risk hormone-receptor-positive/HER2-negative disease after neoadjuvant chemotherapy and definitive surgery. Dose escalation studied rucaparib concurrently with radiotherapy and additional maintenance. The registry design is phase 1; completion is not evidence of adjuvant efficacy.",
    "status": "completed",
    "started": "2018-05-23",
    "startedType": "actual",
    "enrolled": 31,
    "targets": [
      "parp"
    ],
    "drugs": [
      "rucaparib"
    ],
    "cancers": [
      "tnbc",
      "breast-hr-positive"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT03542175",
        "url": "https://clinicaltrials.gov/study/NCT03542175"
      }
    ]
  },
  {
    "id": "nct04849364",
    "kind": "trial",
    "name": "PERSEVERE: genomically directed post-neoadjuvant residual TNBC",
    "nct": "NCT04849364",
    "phase": "2",
    "asOf": "2026-10-10",
    "setting": "Residual early TNBC after neoadjuvant therapy and definitive resection",
    "sponsor": "Bryan Schneider, MD",
    "tldr": "This study assigned extra treatment after surgery using blood and tumour tests. It stopped and is no longer an access route.",
    "summary": "Registry status terminated, last updated 2025-05-31. Enrollment is 52 actual. Residual early TNBC after neoadjuvant therapy and definitive resection. The ctDNA-enriched, genomically directed platform included talazoparib/capecitabine and inavolisib/capecitabine strategies, with pembrolizumab rules differing by assigned arm. The registry states termination for a funder decision; that administrative reason is not an efficacy result.",
    "status": "withdrawn",
    "started": "2021-08-24",
    "startedType": "actual",
    "enrolled": 52,
    "targets": [
      "parp"
    ],
    "drugs": [
      "talazoparib",
      "capecitabine",
      "inavolisib",
      "pembrolizumab"
    ],
    "cancers": [
      "tnbc"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT04849364",
        "url": "https://clinicaltrials.gov/study/NCT04849364"
      }
    ]
  },
  {
    "id": "nct03598257",
    "kind": "trial",
    "name": "Olaparib with or without radiation in inflammatory breast cancer",
    "nct": "NCT03598257",
    "phase": "2",
    "asOf": "2026-10-10",
    "setting": "Non-metastatic inflammatory breast cancer of any receptor subtype after neoadjuvant chemotherapy and modified radical mastectomy with negative margins and axillary evaluation",
    "sponsor": "National Cancer Institute (NCI)",
    "tldr": "This study tests whether adding olaparib improves radiation treatment for inflammatory breast cancer. It is not accepting new participants.",
    "summary": "Registry status active not recruiting, last updated 2026-09-29. Enrollment is 300 estimated. Non-metastatic inflammatory breast cancer of any receptor subtype after neoadjuvant chemotherapy and modified radical mastectomy with negative margins and axillary evaluation. Randomized radiation with or without olaparib; positive microscopic margins or gross residual tumour after mastectomy are excluded. This disease-specific protocol must not be presented as general postoperative TNBC enrollment.",
    "status": "active",
    "started": "2019-01-18",
    "startedType": "actual",
    "enrolled": 300,
    "targets": [
      "parp"
    ],
    "drugs": [
      "olaparib"
    ],
    "cancers": [
      "breast-cancer"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT03598257",
        "url": "https://clinicaltrials.gov/study/NCT03598257"
      }
    ]
  },
  {
    "id": "nct06488378",
    "kind": "trial",
    "name": "Axatilimab and olaparib in BRCA/PALB2-associated metastatic breast cancer",
    "nct": "NCT06488378",
    "phase": "1",
    "asOf": "2026-10-10",
    "setting": "Metastatic or unresectable HER2-negative breast cancer with a deleterious or suspected deleterious germline/somatic BRCA1/2 mutation or germline PALB2 mutation, documented by a CLIA-certified laboratory",
    "sponsor": "Dana-Farber Cancer Institute",
    "tldr": "This early study combines a DNA-repair drug with a treatment targeting macrophages in advanced breast cancer. It is recruiting, with strict lung-history requirements.",
    "summary": "Registry status recruiting, last updated 2026-09-02. Enrollment is 20 estimated. Metastatic or unresectable HER2-negative breast cancer with a deleterious or suspected deleterious germline/somatic BRCA1/2 mutation or germline PALB2 mutation, documented by a CLIA-certified laboratory. Axatilimab targets CSF1R and is combined with olaparib in phase 1b. The registry excludes a history of pneumonitis or ILD, or baseline evidence of either. Dana-Farber and Mayo are listed recruiting; cohort/site slots need confirmation. This human two-drug study is distinct from preclinical three-drug PARP/CSF1R/SREBP1 experiments and does not establish adjuvant efficacy.",
    "status": "recruiting",
    "started": "2024-08-13",
    "startedType": "actual",
    "enrolled": 20,
    "targets": [
      "parp"
    ],
    "drugs": [
      "olaparib",
      "axatilimab"
    ],
    "cancers": [
      "breast-cancer",
      "tnbc"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT06488378",
        "url": "https://clinicaltrials.gov/study/NCT06488378"
      }
    ]
  },
  {
    "id": "paper-tung-tbcrc048-expansion-jco-2026",
    "kind": "paper",
    "name": "TBCRC 048 expansion: olaparib in metastatic breast cancer with germline PALB2 or somatic BRCA",
    "asOf": "2026-10-10",
    "journal": "Journal of Clinical Oncology",
    "year": 2026,
    "authors": "Tung NM, Robson ME, Li T, et al.",
    "paperType": "translational",
    "doi": "10.1200/JCO-25-02075",
    "pmid": "41604601",
    "participants": 54,
    "tldr": "Olaparib shrank some metastatic breast cancers with tumour-only BRCA mutations. This does not establish benefit in preventing recurrence after surgery.",
    "summary": "Phase 2 expansion with 24 germline PALB2 and 30 somatic BRCA1/2 participants. The overall population comprised 42 ER-positive/HER2-negative, seven TNBC and five HER2-positive cancers. Participants received single-agent olaparib until progression. Somatic-BRCA activity was clinically meaningful but missed the prespecified response target.",
    "findings": [
      "Somatic BRCA1/2: 11/30 responses, ORR 36.7% (80% CI 24.7 to 50.0), median PFS 5.5 months (90% CI 2.8 to 8.3), median response duration 11.2 months (90% CI 4.4 to not reached).",
      "Germline PALB2: ORR 75% (80% CI 60.2 to 86.3), median PFS 9.4 months (90% CI 8.3 to 13.1)."
    ],
    "whatItMeans": "Metastatic single-arm evidence does not supply a somatic-only adjuvant indication or a personal response probability.",
    "caveats": [
      "Metastatic single-arm evidence does not supply a somatic-only adjuvant indication or a personal response probability.",
      "Only seven participants overall had TNBC; somatic cohort mixed BRCA1 and BRCA2, 15 each."
    ],
    "targets": [
      "parp"
    ],
    "drugs": [
      "olaparib"
    ],
    "trials": [
      "nct03344965"
    ],
    "cancers": [
      "breast-cancer",
      "tnbc"
    ],
    "links": [
      {
        "label": "Primary publication",
        "url": "https://doi.org/10.1200/JCO-25-02075"
      },
      {
        "label": "PubMed record",
        "url": "https://pubmed.ncbi.nlm.nih.gov/41604601/"
      }
    ]
  },
  {
    "id": "paper-piha-paul-talazoparib-ddr-npj-2024",
    "kind": "paper",
    "name": "Talazoparib in advanced cancers with BRCA1/2, DNA repair and PTEN alterations",
    "asOf": "2026-10-10",
    "journal": "npj Precision Oncology",
    "year": 2024,
    "authors": "Piha-Paul SA, Tseng C, Leung CH, et al.",
    "paperType": "translational",
    "doi": "10.1038/s41698-024-00634-6",
    "pmid": "39085400",
    "participants": 79,
    "tldr": "Talazoparib helped some people with advanced cancers carrying tumour-only BRCA mutations. The study was small and included several cancer types.",
    "summary": "Phase 2 molecular basket, median four prior lines of therapy. Cohorts included somatic BRCA1/2, other homologous-recombination repair genes, PTEN and germline BRCA1/2 in cancers outside breast/ovarian indications. Clinical benefit included response or stable disease lasting at least 24 weeks.",
    "findings": [
      "Somatic BRCA1/2 cohort: four objective responses among 18 patients, ORR 22.2% (95% CI 6.4 to 47.6); six clinical-benefit events.",
      "Posterior mean clinical-benefit rate 32.5% (90% credible interval 16.7 to 50.3) is a separate endpoint from objective response.",
      "Breast examples included a somatic BRCA1 partial response and prolonged stable disease."
    ],
    "whatItMeans": "Mixed, heavily pretreated cancers and no control arm; cannot compare its ORR directly with olaparib trials or establish postoperative benefit.",
    "caveats": [
      "Mixed, heavily pretreated cancers and no control arm; cannot compare its ORR directly with olaparib trials or establish postoperative benefit."
    ],
    "targets": [
      "parp"
    ],
    "drugs": [
      "talazoparib"
    ],
    "trials": [
      "nct02286687"
    ],
    "cancers": [
      "breast-cancer",
      "tnbc"
    ],
    "links": [
      {
        "label": "Primary publication",
        "url": "https://doi.org/10.1038/s41698-024-00634-6"
      },
      {
        "label": "PubMed record",
        "url": "https://pubmed.ncbi.nlm.nih.gov/39085400/"
      }
    ]
  },
  {
    "id": "paper-kalra-bre09-146-rucaparib-npj-2021",
    "kind": "paper",
    "name": "BRE09-146: cisplatin with or without rucaparib after preoperative breast chemotherapy",
    "asOf": "2026-10-10",
    "journal": "npj Breast Cancer",
    "year": 2021,
    "authors": "Kalra M, Tong Y, Jones DR, et al.",
    "paperType": "rct",
    "doi": "10.1038/s41523-021-00240-w",
    "pmid": "33753748",
    "participants": 128,
    "tldr": "Adding low-dose rucaparib to cisplatin did not significantly improve the main outcome after surgery. Limited drug exposure makes this an incomplete test of other PARP strategies.",
    "summary": "Randomized postoperative TNBC or BRCA-mutated breast trial with residual invasive tumour greater than 2 cm or persistent nodal involvement after neoadjuvant therapy. Patients received cisplatin alone or with low-dose rucaparib; accrual occurred in 2010 to 2013.",
    "findings": [
      "Two-year DFS: 54.2% with cisplatin versus 64.1% with cisplatin/rucaparib; p=0.29.",
      "Rucaparib exposure was limited; the authors concluded the tested regimen did not improve two-year DFS."
    ],
    "whatItMeans": "Negative result for the tested low-exposure combination; not proof that every rucaparib or PARP strategy fails.",
    "caveats": [
      "Negative result for the tested low-exposure combination; not proof that every rucaparib or PARP strategy fails.",
      "Predates modern neoadjuvant chemoimmunotherapy and did not establish somatic-BRCA selection."
    ],
    "targets": [
      "parp"
    ],
    "drugs": [
      "rucaparib",
      "cisplatin"
    ],
    "trials": [
      "nct01074970"
    ],
    "cancers": [
      "breast-cancer",
      "tnbc"
    ],
    "links": [
      {
        "label": "Primary publication",
        "url": "https://doi.org/10.1038/s41523-021-00240-w"
      },
      {
        "label": "PubMed record",
        "url": "https://pubmed.ncbi.nlm.nih.gov/33753748/"
      }
    ]
  },
  {
    "id": "paper-andrade-neo-real-adjuvant-safety-2026",
    "kind": "paper",
    "name": "Neo-Real: adjuvant treatment patterns and safety after TNBC chemoimmunotherapy",
    "asOf": "2026-10-10",
    "journal": "Breast Cancer Research and Treatment",
    "year": 2026,
    "authors": "Andrade MO, Bonadio RC, Ipi\u00f1a A, et al.",
    "paperType": "real-world",
    "doi": "10.1007/s10549-026-07938-0",
    "pmid": "41848921",
    "participants": 726,
    "tldr": "After chemoimmunotherapy, combinations of additional drugs were common when cancer remained at surgery. This study describes safety, not whether the combinations improve survival.",
    "summary": "Brazilian/Argentinian real-world TNBC cohort: 726 included, 692 underwent surgery and safety information was available for 359. Among residual-disease participants without germline BRCA1/2 mutations, most received pembrolizumab/capecitabine; among the small BRCA-mutated residual group, pembrolizumab/olaparib was common. No survival outcomes are reported.",
    "findings": [
      "Pembrolizumab alone had 6.7% grade \u22653 adverse events and lower incidence than combination regimens (p=0.002).",
      "Drug discontinuation: pembrolizumab 5.7%, pembrolizumab/capecitabine 11.2%, pembrolizumab/olaparib 7.7% (p=0.126)."
    ],
    "whatItMeans": "Observational prescribing/safety data do not establish efficacy, comparative benefit or safety after prior pneumonitis.",
    "caveats": [
      "Observational prescribing/safety data do not establish efficacy, comparative benefit or safety after prior pneumonitis.",
      "Small olaparib-treated subgroup and incomplete safety capture; not evidence for somatic-only adjuvant PARP benefit."
    ],
    "targets": [
      "parp"
    ],
    "drugs": [
      "olaparib",
      "pembrolizumab",
      "capecitabine"
    ],
    "trials": [],
    "cancers": [
      "breast-cancer",
      "tnbc"
    ],
    "links": [
      {
        "label": "Primary publication",
        "url": "https://doi.org/10.1007/s10549-026-07938-0"
      },
      {
        "label": "PubMed record",
        "url": "https://pubmed.ncbi.nlm.nih.gov/41848921/"
      }
    ]
  },
  {
    "id": "nct02286687",
    "kind": "trial",
    "name": "Talazoparib molecular basket in advanced cancers",
    "nct": "NCT02286687",
    "asOf": "2026-10-10",
    "phase": "2",
    "status": "active",
    "setting": "Advanced cancers with BRCA1/2, selected other DNA-repair or PTEN alterations",
    "sponsor": "M.D. Anderson Cancer Center",
    "tldr": "This closed study tested talazoparib in advanced cancers with selected DNA-repair or PTEN alterations. Its published somatic-BRCA results come from a small mixed-cancer cohort.",
    "summary": "Registry active not recruiting, last updated 2026-06-12. Advanced cancers with BRCA1/2, selected other DNA-repair or PTEN alterations. The registry enrollment is estimated at 150; the 2024 publication reports 79 treated participants and 18 in the somatic BRCA1/2 cohort. These are different populations, not conflicting efficacy denominators. No current enrollment route.",
    "started": "2014-12-22",
    "startedType": "actual",
    "enrolled": 150,
    "drugs": [
      "talazoparib"
    ],
    "targets": [
      "parp"
    ],
    "cancers": [
      "breast-cancer",
      "tnbc"
    ],
    "keyPapers": [
      "paper-piha-paul-talazoparib-ddr-npj-2024"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT02286687",
        "url": "https://clinicaltrials.gov/study/NCT02286687"
      }
    ]
  },
  {
    "id": "nct01074970",
    "kind": "trial",
    "name": "BRE09-146: postoperative cisplatin with or without rucaparib",
    "nct": "NCT01074970",
    "asOf": "2026-10-10",
    "phase": "2",
    "status": "completed",
    "setting": "Postoperative TNBC or BRCA-mutated breast cancer with residual tumour greater than 2 cm or persistent nodal involvement after neoadjuvant therapy",
    "sponsor": "Hoosier Cancer Research Network",
    "tldr": "This completed study tested extra treatment for breast cancer remaining after chemotherapy and surgery. Adding the tested low-dose rucaparib regimen did not significantly improve two-year disease-free survival.",
    "summary": "Registry completed, last updated 2024-09-19. Postoperative TNBC or BRCA-mutated breast cancer with residual tumour greater than 2 cm or persistent nodal involvement after neoadjuvant therapy. The registry records 135 enrolled; the paper reports 128 randomized. Low rucaparib exposure and the historical regimen limit extrapolation to other PARP strategies.",
    "started": "2010-02",
    "enrolled": 135,
    "drugs": [
      "rucaparib",
      "cisplatin"
    ],
    "targets": [
      "parp"
    ],
    "cancers": [
      "breast-cancer",
      "tnbc"
    ],
    "keyPapers": [
      "paper-kalra-bre09-146-rucaparib-npj-2021"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT01074970",
        "url": "https://clinicaltrials.gov/study/NCT01074970"
      }
    ]
  },
  {
    "id": "axatilimab",
    "kind": "drug",
    "name": "Axatilimab",
    "brand": "Niktimvo",
    "aka": [
      "axatilimab-csfr"
    ],
    "asOf": "2026-10-10",
    "status": "approved",
    "modality": "Monoclonal antibody",
    "mechanism": "Blocks colony-stimulating factor 1 receptor (CSF1R), affecting CSF1-dependent monocytes and macrophages. Its breast-cancer use with olaparib is investigational.",
    "tldr": "Axatilimab targets an immune-cell signal used by macrophages. It is approved for chronic graft-versus-host disease and is being tested with olaparib in advanced breast cancer.",
    "summary": "FDA approval on 2024-08-14 is for chronic graft-versus-host disease after failure of at least two prior systemic treatments in adults and children weighing at least 40 kg. This is not a breast-cancer approval. The June 2026 label describes CSF1R blockade and monitoring for infusion reactions and laboratory abnormalities. The recruiting phase 1b olaparib combination, NCT06488378, studies metastatic or unresectable HER2-negative breast cancer with qualifying BRCA1/2 or germline PALB2 alterations; a history of pneumonitis or ILD, or baseline evidence of either, is excluded. No comparative or postoperative efficacy is established.",
    "approvals": [
      {
        "region": "US",
        "year": 2024,
        "indication": "Chronic graft-versus-host disease after failure of at least two prior systemic lines in adults and pediatric patients weighing at least 40 kg",
        "note": "FDA approval is for chronic GVHD, not breast cancer."
      }
    ],
    "targets": [
      "csf1r"
    ],
    "companies": [
      "syndax",
      "incyte"
    ],
    "trials": [
      "nct06488378"
    ],
    "cancers": [
      "breast-cancer"
    ],
    "links": [
      {
        "label": "FDA approval and indication",
        "url": "https://www.fda.gov/drugs/resources-information-approved-drugs/fda-approves-axatilimab-csfr-chronic-graft-versus-host-disease"
      },
      {
        "label": "Current Niktimvo label (DailyMed)",
        "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=bb6dba23-e7a6-4765-a1e6-b9e277ce0381"
      },
      {
        "label": "Investigational breast combination NCT06488378",
        "url": "https://clinicaltrials.gov/study/NCT06488378"
      }
    ]
  }
];
