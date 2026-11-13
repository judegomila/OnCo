/**
 * Supportive care gaps, November 2026, part one: the supportive and general medicines the care protocols named that the
 * corpus lacked. Registered in src/data/index.ts; `supportiveCareGapDrugBacklinks` maps an existing record to the new
 * medicines it should list (applied by the census-fill backlink step there). Every record here except cyproterone is
 * flagged supportive in src/data/supportive-drugs.ts.
 *
 * What was read, on 11 November 2026, as raw text:
 * - US labels: the indications section of each product through the openFDA label API, and the Kinlytic (urokinase)
 *   label from the DailyMed SPL service. Original approval dates come from the Drugs@FDA API (ORIG submission, status
 *   AP) and are given only where the application was found; the approval row's indication is the current label's.
 * - UK labels (products not marketed in the US): section 4.1 and 5.1 of the electronic medicines compendium SmPC for
 *   cyclizine, levomepromazine, Cyprostat (cyproterone acetate), Buscopan ampoules (hyoscine butylbromide) and tinzaparin.
 * - Guidelines and trials, each DOI resolved through Europe PMC and its title checked; full text from Europe PMC, the
 *   NCBI BioC service or the PMC page where open, otherwise the abstract: ITAC 2022 (full text), ASCO VTE update 2023
 *   (abstract), Cochrane review of occluded central lines 2012 (abstract), ASTCT IEC-HS 2023 (full text), SITC immune
 *   effector cell guideline 2020 and SITC checkpoint inhibitor guideline 2021 (full text), MASCC EGFR inhibitor skin
 *   guideline 2011 (full text), Cancer Care Ontario 2017 (full text), MASCC/ESMO advanced-cancer nausea 2016 (abstract),
 *   MASCC bowel obstruction 2022 (full text), EAPC palliative sedation 2024 (full text), JSPC survivor pain 2025 (full
 *   text), ASCO CIPN 2020 (abstract), Australian cancer pain guideline 2025 (full text, PMC page), MASCC/ISOO mucositis
 *   2020 (full text), AGIHO herpesvirus 2022 and gastrointestinal complications 2017 (full text), ASCO hepatitis B
 *   opinion 2020 (full text), ECIL-10 antifungal prophylaxis 2025 (full text), POGO antibacterial prophylaxis 2020 (full
 *   text), MASCC radiation dermatitis 2023 (abstract), Ren 2015 urea cream trial (abstract), REVEH 2023 (abstract),
 *   Loeffen 2020 (abstract).
 * - NICE CG140, CG151, CG112, NG31 and NG131: recommendations pages, HTML.
 * Doses are given only where a cited source states them. Not read: the BTS bronchoscopy guideline (the publisher
 * refused a script), so lidocaine's bronchoscopy use is not stated.
 */
import type { DrugInput } from "@/lib/schema";

const asOf = "2026-11-11";
const tags = ["supportive", "generic", "supportive-care-gaps-2026-11"];
const provenance = { editedBy: "OnCo supportive care gap fill (DailyMed, openFDA, Drugs@FDA, emc SmPCs, NICE, ESMO, ASCO, MASCC, SITC, ASTCT, ITAC, Europe PMC)", editedOn: asOf };
const W = (s: string) => `https://en.wikipedia.org/wiki/${s}`;
const DM = (setid: string, what: string) => ({ label: `US label (DailyMed): ${what}`, url: `https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=${setid}` });
const EMC = (id: string, what: string) => ({ label: `UK SmPC (emc): ${what}`, url: `https://www.medicines.org.uk/emc/product/${id}/smpc` });
const d = (x: Omit<DrugInput, "kind" | "asOf">): DrugInput => ({ kind: "drug", asOf, status: "approved", tags, provenance, ...x } as DrugInput);

// Guidelines and trials cited by more than one record.
const ITAC = { label: "Farge et al., 2022 international clinical practice guidelines (ITAC) for the treatment and prophylaxis of venous thromboembolism in patients with cancer (Lancet Oncol 2022)", url: "https://doi.org/10.1016/S1470-2045(22)00160-7" };
const ASCO_VTE = { label: "Key et al., Venous thromboembolism prophylaxis and treatment in patients with cancer: ASCO guideline update (J Clin Oncol 2023)", url: "https://doi.org/10.1200/JCO.23.00294" };
const COCHRANE_CVC = { label: "van Miert et al., Interventions for restoring patency of occluded central venous catheter lumens (Cochrane Database Syst Rev 2012)", url: "https://doi.org/10.1002/14651858.CD007119.pub2" };
const HINES = { label: "Hines et al., Immune effector cell-associated hemophagocytic lymphohistiocytosis-like syndrome (ASTCT, Transplant Cell Ther 2023)", url: "https://doi.org/10.1016/j.jtct.2023.03.006" };
const SITC_IEC = { label: "Maus et al., SITC clinical practice guideline on immune effector cell-related adverse events (J Immunother Cancer 2020)", url: "https://doi.org/10.1136/jitc-2020-001511" };
const SITC_ICI = { label: "Brahmer et al., SITC clinical practice guideline on immune checkpoint inhibitor-related adverse events (J Immunother Cancer 2021)", url: "https://doi.org/10.1136/jitc-2021-002435" };
const MASCC_EGFRI = { label: "Lacouture et al., MASCC clinical practice guidelines for the prevention and treatment of EGFR inhibitor-associated dermatologic toxicities (Support Care Cancer 2011)", url: "https://doi.org/10.1007/s00520-011-1197-6" };
const RYBREVANT = DM("1466c070-9f97-4fa4-a955-6a6b59981fb8", "Rybrevant (amivantamab), rash prophylaxis");
const CCO = { label: "Barbera et al., Interventions to address sexual problems in people with cancer (Cancer Care Ontario guideline, Curr Oncol 2017), vasomotor symptoms", url: "https://doi.org/10.3747/co.24.3583" };
const NG131 = { label: "NICE NG131: Prostate cancer, diagnosis and management, recommendations 1.4.3 to 1.4.5 (hot flushes)", url: "https://www.nice.org.uk/guidance/ng131/chapter/Recommendations" };
const MASCC_ESMO_ADV = { label: "Walsh et al., 2016 updated MASCC/ESMO consensus recommendations: management of nausea and vomiting in advanced cancer (Support Care Cancer 2017)", url: "https://doi.org/10.1007/s00520-016-3371-3" };
const MASCC_MBO = { label: "Davis et al., MASCC recommendations for the management of malignant bowel obstruction in advanced cancer (Support Care Cancer 2022)", url: "https://doi.org/10.1007/s00520-022-06889-8" };
const NG31 = { label: "NICE NG31: Care of dying adults in the last days of life, recommendations", url: "https://www.nice.org.uk/guidance/ng31/chapter/Recommendations" };
const EAPC = { label: "Surges et al., Revised EAPC recommended framework on palliative sedation (Palliat Med 2024), table of medications", url: "https://doi.org/10.1177/02692163231220225" };
const JSPC = { label: "Japan Society of Pain Clinicians, Consensus statement on chronic pain treatment in cancer survivors (J Anesth 2025)", url: "https://doi.org/10.1007/s00540-024-03427-0" };
const ASCO_CIPN = { label: "Loprinzi et al., Prevention and management of chemotherapy-induced peripheral neuropathy in survivors of adult cancers: ASCO guideline update (J Clin Oncol 2020)", url: "https://doi.org/10.1200/JCO.20.01399" };
const CG140 = { label: "NICE CG140: Palliative care for adults, strong opioids for pain relief, recommendations", url: "https://www.nice.org.uk/guidance/cg140/chapter/Recommendations" };
const AUS_PAIN = { label: "Lovell et al., Update of the Australian guideline for the management of cancer pain in adults (Asia Pac J Clin Oncol 2026)", url: "https://doi.org/10.1111/ajco.70047" };
const MASCC_ISOO = { label: "Elad et al., MASCC/ISOO clinical practice guidelines for the management of mucositis secondary to cancer therapy (Cancer 2020)", url: "https://doi.org/10.1002/cncr.33100" };
const CG151 = { label: "NICE CG151: Neutropenic sepsis, prevention and management in people with cancer, recommendations", url: "https://www.nice.org.uk/guidance/cg151/chapter/Recommendations" };
const CG112 = { label: "NICE CG112: Sedation in under 19s, using sedation for diagnostic and therapeutic procedures, recommendations", url: "https://www.nice.org.uk/guidance/cg112/chapter/Recommendations" };

export const supportiveCareGapDrugs: DrugInput[] = [
  // ---- Thrombolytics for a blocked central line ----
  d({ id: "alteplase", name: "Alteplase", brand: "Activase / Cathflo Activase", aka: ["tPA", "Cathflo", "Actilyse"], modality: "Thrombolytic (recombinant tissue plasminogen activator)", wikipedia: W("Alteplase"),
    mechanism: "Recombinant tissue plasminogen activator: converts plasminogen to plasmin, which breaks down the fibrin in a clot.",
    tldr: "Alteplase is a clot-dissolving medicine. In cancer care its common use is a small dose left inside a port or central line that has stopped working because of a clot, to get blood flowing through it again.",
    summary: "The Cathflo Activase label is \"indicated for the restoration of function to central venous access devices as assessed by the ability to withdraw blood\"; the Activase label covers acute ischaemic stroke, acute myocardial infarction and acute massive pulmonary embolism. People having chemotherapy through ports, PICC lines and tunnelled catheters are the main users of the catheter indication. A 2012 Cochrane review found very low-quality evidence from two single studies that alteplase 2 mg/2 mL may restore flow in lumens blocked by thrombosis, and called for better trials. The Genentech biologics licence (BLA 103172) was first approved on 13 November 1987.",
    approvals: [{ region: "US", year: 1987, indication: "Activase: acute ischaemic stroke, acute myocardial infarction and acute massive pulmonary embolism. Cathflo Activase: restoration of function to central venous access devices", note: "Year is the original BLA 103172 approval (Drugs@FDA); the Cathflo indication came later" }],
    technologies: ["picc-lines", "implanted-ports", "infusion-devices-vascular-access"], terms: ["central-venous-access"], related: ["urokinase"], companies: [],
    links: [DM("91ecdef2-95ff-42dd-a31c-c8a09cab3ad9", "Cathflo Activase"), DM("c669f77c-fa48-478b-a14b-80b20a0139c2", "Activase"), COCHRANE_CVC] }),
  d({ id: "urokinase", name: "Urokinase", brand: "Kinlytic", aka: ["Abbokinase", "Syner-KINASE"], modality: "Thrombolytic (plasminogen activator)", wikipedia: W("Urokinase"),
    mechanism: "A plasminogen activator: converts plasminogen to plasmin, which digests fibrin in a clot.",
    tldr: "Urokinase is a clot-dissolving medicine. Its US label is for large clots in the lungs; in cancer care it has also been used to unblock central lines, with low-quality evidence that it works.",
    summary: "The Kinlytic label (DailyMed SPL, 2008) is indicated in adults \"for the lysis of acute massive pulmonary emboli\" and of pulmonary emboli with unstable haemodynamics. The 2012 Cochrane review of occluded central venous catheters found \"low quality evidence from a meta-analysis of two studies suggesting that urokinase (various strengths) was more effective than placebo for restoring patency to occluded CVC lumens\" (relative risk 2.09, 95% CI 1.47 to 2.95; number needed to treat 4). The licence holder's original approval in Drugs@FDA is dated 16 January 1978.",
    approvals: [{ region: "US", year: 1978, indication: "Lysis of acute massive pulmonary embolism, or pulmonary embolism with unstable haemodynamics", note: "Year from Drugs@FDA (BLA 021846, original approval)" }],
    technologies: ["picc-lines", "implanted-ports"], terms: ["central-venous-access"], related: ["alteplase"],
    links: [DM("bfe5cfb9-591d-4df8-12a3-6555cde3185d", "Kinlytic (urokinase)"), COCHRANE_CVC] }),

  // ---- Anticoagulants ----
  d({ id: "enoxaparin", name: "Enoxaparin", brand: "Lovenox / Clexane", aka: ["enoxaparin sodium", "Inhixa"], modality: "Low-molecular-weight heparin (injection)", wikipedia: W("Enoxaparin_sodium"),
    mechanism: "A low-molecular-weight heparin: potentiates antithrombin, mainly against activated factor X.",
    tldr: "Enoxaparin is a blood-thinning injection given under the skin. People with cancer have it to prevent clots after surgery or to treat a clot in a leg vein or the lungs.",
    summary: "The Lovenox label covers prophylaxis of deep vein thrombosis in abdominal, hip and knee surgery and in acutely ill medical patients, inpatient and outpatient treatment of acute DVT, and acute coronary syndromes. ITAC 2022 recommends a low-molecular-weight heparin (LMWH) for the initial treatment of established venous thromboembolism in people with cancer when creatinine clearance is at least 30 mL/min (grade 1A), and prefers LMWHs over vitamin K antagonists for treatment (1A); where a twice-daily regimen is needed, it says only enoxaparin (1 mg/kg twice daily) can be used. The NDA was first approved on 29 March 1993.",
    approvals: [{ region: "US", year: 1993, indication: "Prophylaxis of DVT in abdominal, hip and knee surgery and in medical patients with restricted mobility; treatment of acute DVT; acute coronary syndromes", note: "Year is the original NDA 020164 approval (Drugs@FDA)" }],
    technologies: ["cancer-associated-thrombosis"], terms: ["vte"], related: ["dalteparin", "tinzaparin", "apixaban", "rivaroxaban", "edoxaban", "warfarin"],
    links: [DM("3d263380-4f44-4fd8-aa2a-e69702ab258f", "Lovenox"), ITAC] }),
  d({ id: "dalteparin", name: "Dalteparin", brand: "Fragmin", aka: ["dalteparin sodium"], modality: "Low-molecular-weight heparin (injection)", wikipedia: W("Dalteparin"),
    mechanism: "A low-molecular-weight heparin: potentiates antithrombin, mainly against activated factor X.",
    tldr: "Dalteparin is a daily blood-thinning injection. Its US label is one of the few written for people with cancer: it treats a clot and keeps giving protection for six months so that another clot is less likely.",
    summary: "The Fragmin label includes \"extended treatment of symptomatic venous thromboembolism (VTE) to reduce the recurrence in adult patients with cancer\", the therapy beginning with the initial treatment and continuing for six months, alongside DVT prophylaxis in surgery and in medical patients and the prevention of ischaemic complications of unstable angina. ITAC 2022 recommends LMWH for initial treatment and prefers LMWHs over vitamin K antagonists; dalteparin is the comparator in several of the trials ITAC weighs, including ADAM-VTE, where apixaban was compared with dalteparin. The NDA was first approved on 22 December 1994.",
    approvals: [{ region: "US", year: 1994, indication: "Extended treatment of symptomatic VTE to reduce recurrence in adults with cancer (six months); DVT prophylaxis; unstable angina; VTE in children", note: "Year is the original NDA 020287 approval (Drugs@FDA); the cancer indication came later" }],
    technologies: ["cancer-associated-thrombosis"], terms: ["vte"], related: ["enoxaparin", "tinzaparin", "apixaban"],
    links: [DM("23527b8b-9b28-4e6d-9751-33b143975ac7", "Fragmin"), ITAC] }),
  d({ id: "tinzaparin", name: "Tinzaparin", brand: "Innohep", aka: ["tinzaparin sodium"], modality: "Low-molecular-weight heparin (injection)", wikipedia: W("Tinzaparin_sodium"),
    mechanism: "A low-molecular-weight heparin of porcine origin that potentiates antithrombin's inhibition of activated clotting factors, mainly factor Xa (UK SmPC 5.1).",
    tldr: "Tinzaparin is a once-daily blood-thinning injection used in the UK and Europe to treat and prevent clots, including long-term treatment of a clot in people with active cancer.",
    summary: "The UK SmPC for the 20,000 IU/mL vials covers treatment of deep vein thrombosis and pulmonary embolism and \"extended treatment of venous thromboembolism and prevention of recurrences in adult patients with active cancer\"; the 10,000 IU/mL vials cover prophylaxis in surgery, \"particularly orthopaedic, general or oncological surgery\", and in immobilised medical patients including those with active cancer. In the US, Innohep was labelled for acute DVT with or without pulmonary embolism given with warfarin (DailyMed SPL). Among the evidence for LMWH, ITAC 2022 cites the randomised trial of tinzaparin against warfarin in active cancer (Lee et al., JAMA 2015).",
    approvals: [{ region: "UK", year: 1994, indication: "Treatment of DVT and PE; extended treatment of venous thromboembolism and prevention of recurrences in adults with active cancer", note: "Year is the first authorisation of UK licence PL 00043/0192 (20,000 IU/ml vials) as printed in its SmPC; the cancer indication came later" }],
    technologies: ["cancer-associated-thrombosis"], terms: ["vte"], related: ["enoxaparin", "dalteparin", "warfarin"],
    links: [EMC("13848", "tinzaparin 20,000 IU/ml (treatment, extended treatment in active cancer)"), EMC("13847", "tinzaparin 10,000 IU/ml (prophylaxis)"), DM("1513b960-d9d1-11de-8a1e-0002a5d5c51b", "Innohep (historic US label)"), ITAC] }),
  d({ id: "apixaban", name: "Apixaban", brand: "Eliquis", modality: "Direct oral anticoagulant (factor Xa inhibitor, tablet)", wikipedia: W("Apixaban"),
    mechanism: "A direct, oral inhibitor of activated factor X.",
    tldr: "Apixaban is a blood-thinning tablet. Guidelines now accept it for treating a clot in most people with cancer, and for preventing clots in some people starting chemotherapy who are at higher risk.",
    summary: "The Eliquis label covers stroke prevention in non-valvular atrial fibrillation, DVT prophylaxis after hip or knee replacement, and treatment of DVT and pulmonary embolism with reduction of recurrence. ITAC 2022: rivaroxaban or apixaban can be used for initial treatment of established VTE in people with cancer without a high risk of gastrointestinal or genitourinary bleeding (1A), DOACs are recommended for maintenance in the absence of strong drug interactions or impaired absorption, with caution in gastrointestinal cancers (1A), and rivaroxaban or apixaban are recommended as primary prophylaxis for ambulatory people on systemic anticancer therapy with a Khorana score of 2 or more and low bleeding risk (1B), including those with locally advanced or metastatic pancreatic cancer (1B). The 2023 ASCO update added apixaban as an option for treating VTE (strong recommendation, high-quality evidence) and, with rivaroxaban, for extended prophylaxis after cancer surgery (weak). The NDA was first approved on 28 December 2012.",
    approvals: [{ region: "US", year: 2012, indication: "Stroke prevention in non-valvular atrial fibrillation; DVT prophylaxis after hip or knee replacement; treatment of DVT and PE and reduction of recurrence", note: "Year is the original NDA 202155 approval (Drugs@FDA)" }],
    technologies: ["cancer-associated-thrombosis"], terms: ["vte"], trials: ["nct07160686"], keyPapers: ["paper-key-j-clin-oncol"], related: ["rivaroxaban", "edoxaban", "dalteparin"],
    links: [DM("1523ab32-2c2c-6501-e063-6394a90aa0b3", "Eliquis"), ITAC, ASCO_VTE] }),
  d({ id: "rivaroxaban", name: "Rivaroxaban", brand: "Xarelto", modality: "Direct oral anticoagulant (factor Xa inhibitor, tablet)", wikipedia: W("Rivaroxaban"),
    mechanism: "A direct, oral inhibitor of activated factor X.",
    tldr: "Rivaroxaban is a blood-thinning tablet used to treat a clot in many people with cancer, and to prevent clots in some people starting chemotherapy who are at higher risk.",
    summary: "The Xarelto label covers atrial fibrillation, treatment of DVT and pulmonary embolism and reduction of recurrence, prophylaxis after hip or knee replacement and in acutely ill medical patients, and coronary and peripheral artery disease. ITAC 2022 accepts rivaroxaban for initial and maintenance treatment of VTE in people with cancer without a high risk of gastrointestinal or genitourinary bleeding (1A), and recommends rivaroxaban or apixaban for primary prophylaxis in ambulatory people on systemic anticancer therapy with a Khorana score of 2 or more (1B), including locally advanced or metastatic pancreatic cancer (1B). The 2023 ASCO update added rivaroxaban and apixaban as options for extended prophylaxis after cancer surgery (weak recommendation). The NDA was first approved on 1 July 2011.",
    approvals: [{ region: "US", year: 2011, indication: "Atrial fibrillation; treatment of DVT and PE and reduction of recurrence; VTE prophylaxis after hip or knee replacement and in acutely ill medical patients; coronary and peripheral artery disease", note: "Year is the original NDA 022406 approval (Drugs@FDA)" }],
    technologies: ["cancer-associated-thrombosis"], terms: ["vte"], keyPapers: ["paper-key-j-clin-oncol"], related: ["apixaban", "edoxaban", "enoxaparin"],
    links: [DM("10db92f9-2300-4a80-836b-673e1ae91610", "Xarelto"), ITAC, ASCO_VTE] }),
  d({ id: "edoxaban", name: "Edoxaban", brand: "Savaysa / Lixiana", modality: "Direct oral anticoagulant (factor Xa inhibitor, tablet)", wikipedia: W("Edoxaban"),
    mechanism: "A direct, oral inhibitor of activated factor X.",
    tldr: "Edoxaban is a blood-thinning tablet. For a clot in someone with cancer it is started after at least five days of heparin injections.",
    summary: "The Savaysa label covers stroke prevention in non-valvular atrial fibrillation and treatment of DVT and pulmonary embolism \"following 5 to 10 days of initial therapy with a parenteral anticoagulant\". ITAC 2022 allows edoxaban for initial treatment of VTE in cancer when started after at least 5 days of parenteral anticoagulation, in people without a high risk of gastrointestinal or genitourinary bleeding (1A), and lists edoxaban with rivaroxaban and apixaban among the DOACs recommended for maintenance (1A), with caution in gastrointestinal cancers. The NDA was first approved on 8 January 2015.",
    approvals: [{ region: "US", year: 2015, indication: "Stroke prevention in non-valvular atrial fibrillation; treatment of DVT and PE after 5 to 10 days of parenteral anticoagulation", note: "Year is the original NDA 206316 approval (Drugs@FDA)" }],
    technologies: ["cancer-associated-thrombosis"], terms: ["vte"], related: ["apixaban", "rivaroxaban"],
    links: [DM("e77d3400-56ad-11e3-949a-0800200c9a66", "Savaysa"), ITAC] }),
  d({ id: "warfarin", name: "Warfarin", brand: "Coumadin", aka: ["warfarin sodium", "vitamin K antagonist"], modality: "Vitamin K antagonist (oral anticoagulant)", wikipedia: W("Warfarin"),
    mechanism: "A vitamin K antagonist: reduces the liver's production of active vitamin K-dependent clotting factors; dosing is monitored by the INR.",
    tldr: "Warfarin is an older blood-thinning tablet that needs regular blood tests. For a clot in someone with cancer, guidelines now prefer heparin injections or the newer tablets, but warfarin still has a place, for example with severe kidney failure.",
    summary: "The warfarin label covers prophylaxis and treatment of venous thrombosis and pulmonary embolism, thromboembolism with atrial fibrillation or valve replacement, and risk reduction after myocardial infarction. ITAC 2022 prefers LMWHs over vitamin K antagonists for treating VTE in cancer when creatinine clearance is at least 30 mL/min (1A); with severe renal failure (creatinine clearance below 30 mL/min) it suggests unfractionated heparin followed by early vitamin K antagonists, or LMWH adjusted to anti-Xa levels (guidance, in the absence of data). The Coumadin NDA was approved on 8 June 1954.",
    approvals: [{ region: "US", year: 1954, indication: "Prophylaxis and treatment of venous thrombosis and pulmonary embolism; thromboembolism with atrial fibrillation or valve replacement; after myocardial infarction", note: "Year is the Coumadin NDA 009218 approval (Drugs@FDA)" }],
    technologies: ["cancer-associated-thrombosis"], terms: ["vte"], related: ["enoxaparin", "tinzaparin"],
    links: [DM("0cbce382-9c88-4f58-ae0f-532a841e8f95", "warfarin sodium tablets"), ITAC] }),

  // ---- Cell therapy toxicity ----
  d({ id: "anakinra", name: "Anakinra", brand: "Kineret", modality: "Interleukin-1 receptor antagonist (recombinant protein, injection)", wikipedia: W("Anakinra"),
    mechanism: "A recombinant interleukin-1 receptor antagonist that blocks IL-1 signalling.",
    tldr: "Anakinra is an anti-inflammatory injection approved for arthritis and rare inflammatory diseases. After CAR-T cell therapy it is used to calm a severe inflammatory reaction (IEC-HS) and as a third-line option when cytokine release syndrome does not settle.",
    summary: "The Kineret label covers rheumatoid arthritis, neonatal-onset multisystem inflammatory disease (a cryopyrin-associated periodic syndrome) and deficiency of the interleukin-1 receptor antagonist. In the ASTCT consensus on immune effector cell-associated HLH-like syndrome (Hines 2023), \"Anakinra was recommended as a first-line agent\", and \"Therapy should generally be initiated with corticosteroids +/− anakinra prior to development of life-threatening complications\". SITC 2020 says that if cytokine release syndrome does not improve after two doses of tocilizumab and steroids, third-line agents including anakinra, siltuximab and high-dose methylprednisolone should be considered (level of evidence 4). Its use in these settings is off-label. The BLA was first approved on 14 November 2001.",
    approvals: [{ region: "US", year: 2001, indication: "Rheumatoid arthritis; neonatal-onset multisystem inflammatory disease; deficiency of interleukin-1 receptor antagonist", note: "Year is the original BLA 103950 approval (Drugs@FDA); oncology use is off-label" }],
    technologies: ["car-t"], terms: ["crs", "iec-hs"], related: ["tocilizumab"],
    links: [DM("d9d74915-6606-4570-9c52-c4001d3177de", "Kineret"), HINES, SITC_IEC] }),

  // ---- Skin toxicity of EGFR inhibitors ----
  d({ id: "doxycycline", name: "Doxycycline", brand: "Vibramycin / Doryx", modality: "Tetracycline-class antibacterial (oral)", wikipedia: W("Doxycycline"),
    mechanism: "A tetracycline-class antibacterial; in acneiform rash it is used for its anti-inflammatory effect as well as against bacteria.",
    tldr: "Doxycycline is an antibiotic tablet. People starting EGFR-blocking cancer drugs often take it for the first weeks to make the acne-like rash milder.",
    summary: "The US label covers a long list of bacterial infections. The MASCC EGFR inhibitor guideline (2011) states: \"Hydrocortisone 1% combined with moisturizer, sunscreen, and doxycycline 100 mg bid for the first 6 weeks is recommended based on randomized data\", and notes that doxycycline appears safer with renal dysfunction while minocycline is less photosensitising. The amivantamab (Rybrevant) label tells prescribers to give an oral antibiotic, \"doxycycline or minocycline, 100 mg orally twice daily\", from day 1 for the first 12 weeks. The Vibramycin NDA was approved on 5 December 1967.",
    approvals: [{ region: "US", year: 1967, indication: "Bacterial infections including rickettsial, respiratory, urinary and sexually transmitted infections, and others listed on the label", note: "Year is the Vibramycin NDA 050007 approval (Drugs@FDA); rash prophylaxis is off-label except as directed in the amivantamab label" }],
    terms: ["rash-skin-toxicity"], related: ["minocycline", "amivantamab"],
    links: [DM("00b2aa98-dea2-90c3-e063-6294a90a35d6", "doxycycline"), MASCC_EGFRI, RYBREVANT] }),
  d({ id: "minocycline", name: "Minocycline", brand: "Minocin", modality: "Tetracycline-class antibacterial (oral)", wikipedia: W("Minocycline"),
    mechanism: "A tetracycline-class antibacterial, used in acneiform rash for its anti-inflammatory as well as antibacterial effect.",
    tldr: "Minocycline is an antibiotic tablet used, like doxycycline, to make the acne-like rash from EGFR-blocking cancer drugs milder.",
    summary: "The US label covers bacterial infections. The MASCC EGFR inhibitor guideline (2011) reports that \"prophylactic minocycline 100 mg daily is an effective agent in reducing the number of lesions during the first 8 weeks\" and that minocycline \"is less photosensitizing, thus preferable in geographic or seasonal locations with a high UV index\". The amivantamab label names doxycycline or minocycline, 100 mg twice daily, from day 1 for 12 weeks. The Minocin NDA was approved on 26 October 1972.",
    approvals: [{ region: "US", year: 1972, indication: "Bacterial infections listed on the label", note: "Year is the Minocin NDA 050444 approval (Drugs@FDA)" }],
    terms: ["rash-skin-toxicity"], related: ["doxycycline", "amivantamab"],
    links: [DM("0760232b-21a6-2b13-e063-6394a90a22c1", "minocycline capsules"), MASCC_EGFRI, RYBREVANT] }),

  // ---- Hot flushes and antiandrogen ----
  { ...d({ id: "cyproterone", name: "Cyproterone acetate", brand: "Cyprostat / Androcur", modality: "Steroidal antiandrogen with progestogenic activity (oral)", wikipedia: W("Cyproterone_acetate"),
    mechanism: "Blocks androgen action on the tumour directly and, through its progestogenic activity, lowers gonadotrophin release and so testicular androgen production (UK SmPC 5.1).",
    tldr: "Cyproterone is a hormone tablet for prostate cancer, used in the UK to block the brief testosterone surge when hormone injections start, as a treatment when other options do not suit, and to ease hot flushes caused by hormone therapy.",
    summary: "The UK SmPC for Cyprostat covers management of prostatic cancer \"(1) to suppress 'flare' with initial LHRH analogue therapy, (2) in long-term palliative treatment where LHRH analogues or surgery are contraindicated, not tolerated, or where oral therapy is preferred, and (3) in the treatment of hot flushes in patients under treatment with LHRH analogues or who have had orchidectomy\". NICE NG131 says to consider cyproterone acetate (50 mg twice a day for 4 weeks) for troublesome hot flushes if medroxyprogesterone is not effective or not tolerated, and Cancer Care Ontario lists it among the options for men with vasomotor symptoms. It is not marketed in the US. Because one of its indications treats the cancer itself, it is not counted as a supportive medicine.",
    approvals: [{ region: "UK", year: 2008, indication: "Management of prostate cancer: suppression of flare with initial LHRH analogue therapy, long-term palliative treatment, and hot flushes under LHRH analogues or after orchidectomy", note: "Year is the first authorisation printed in the SmPC for the current Cyprostat licence (PL 56734/0017), not the first approval of the medicine" }],
    cancers: ["prostate"], terms: ["hot-flushes-on-hormone-therapy"], related: ["venlafaxine", "gabapentin"],
    links: [EMC("15997", "Cyprostat 50 mg"), NG131, CCO] }), tags: ["generic", "supportive-care-gaps-2026-11"] },
  d({ id: "venlafaxine", name: "Venlafaxine", brand: "Effexor", modality: "Serotonin and noradrenaline reuptake inhibitor (oral)", wikipedia: W("Venlafaxine"),
    mechanism: "Inhibits reuptake of serotonin and noradrenaline.",
    tldr: "Venlafaxine is an antidepressant tablet that is also used, at the doctor's discretion, to reduce hot flushes caused by breast or prostate cancer hormone treatment.",
    summary: "The US label covers major depressive disorder (and, for the extended-release form, anxiety disorders). Cancer Care Ontario's 2017 guideline, adapted by ASCO, says that for women unable or unwilling to use hormone therapy alternatives include paroxetine, venlafaxine, gabapentin and clonidine, and that options for men include \"venlafaxine, medroxyprogesterone acetate, cyproterone acetate, and gabapentin\". The use for hot flushes is off-label. The Effexor NDA was approved on 28 December 1993.",
    approvals: [{ region: "US", year: 1993, indication: "Major depressive disorder", note: "Year is the Effexor NDA 020151 approval (Drugs@FDA)" }],
    terms: ["hot-flushes-on-hormone-therapy"], related: ["gabapentin", "cyproterone"],
    links: [DM("017a84aa-0e1f-f560-e063-6294a90a9069", "venlafaxine tablets"), CCO] }),
  d({ id: "gabapentin", name: "Gabapentin", brand: "Neurontin", modality: "Gabapentinoid (oral)", wikipedia: W("Gabapentin"),
    mechanism: "Binds the alpha-2-delta subunit of voltage-activated calcium channels; the label states that the precise mechanism of its analgesic and antiepileptic actions is unknown.",
    tldr: "Gabapentin is a tablet for nerve pain and epilepsy. In cancer care it is used for nerve pain caused by the cancer or its treatment, and sometimes for hot flushes.",
    summary: "The Neurontin label covers postherpetic neuralgia and adjunctive treatment of partial-onset seizures. The Japan Society of Pain Clinicians (2025) weakly recommends gabapentinoids for neuropathic pain directly related to cancer in survivors because they can reduce the opioid dose needed [2B]. SITC 2021 says people with painful peripheral neuropathy from checkpoint inhibitors \"should receive neuropathic pain medication such as gabapentin, pregabalin, or duloxetine until neuropathy resolves\". Cancer Care Ontario lists gabapentin among non-hormonal options for hot flushes in women and men with cancer. The NDA was first approved on 30 December 1993.",
    approvals: [{ region: "US", year: 1993, indication: "Postherpetic neuralgia; adjunctive treatment of partial-onset seizures", note: "Year is the Neurontin NDA 020235 approval (Drugs@FDA)" }],
    technologies: ["pain-management"], terms: ["peripheral-neuropathy", "hot-flushes-on-hormone-therapy", "irae"], related: ["duloxetine", "venlafaxine"],
    links: [DM("97935fd9-1d4a-43b6-a5d9-de994591187b", "Neurontin"), JSPC, SITC_ICI, CCO] }),
  d({ id: "duloxetine", name: "Duloxetine", brand: "Cymbalta", modality: "Serotonin and noradrenaline reuptake inhibitor (oral)", wikipedia: W("Duloxetine"),
    mechanism: "Inhibits reuptake of serotonin and noradrenaline.",
    tldr: "Duloxetine is a capsule for depression and nerve pain. It is the one medicine with good enough evidence to recommend for painful nerve damage caused by chemotherapy, though its benefit is modest.",
    summary: "The US label covers major depressive disorder, generalised anxiety disorder, diabetic peripheral neuropathic pain, fibromyalgia and chronic musculoskeletal pain. ASCO's 2020 CIPN guideline: \"Duloxetine is the only agent that has appropriate evidence to support its use for patients with established painful CIPN. Nonetheless, the amount of benefit from duloxetine is limited.\" The Japan Society of Pain Clinicians weakly recommends it for chronic pain in survivors, being more effective for pain from chemotherapy-induced peripheral neuropathy than other adjuvant analgesics [2B]. A trial is testing whether it prevents oxaliplatin neuropathy in colorectal cancer. The Cymbalta NDA was approved on 3 August 2004.",
    approvals: [{ region: "US", year: 2004, indication: "Major depressive disorder; generalised anxiety disorder; diabetic peripheral neuropathic pain; fibromyalgia; chronic musculoskeletal pain", note: "Year is the Cymbalta NDA 021427 approval (Drugs@FDA)" }],
    technologies: ["pain-management"], terms: ["peripheral-neuropathy"], trials: ["nct04137107"], related: ["gabapentin"],
    links: [DM("00628e5e-4c5b-2573-e063-6294a90a0e3b", "duloxetine delayed-release capsules"), ASCO_CIPN, JSPC] }),

  // ---- Nausea and vomiting ----
  d({ id: "metoclopramide", name: "Metoclopramide", brand: "Reglan / Maxolon", modality: "Dopamine antagonist prokinetic antiemetic", wikipedia: W("Metoclopramide"),
    mechanism: "A dopamine antagonist that speeds stomach emptying and gut transit (prokinetic) and acts against nausea centrally.",
    tldr: "Metoclopramide is an anti-sickness medicine that also helps the stomach empty. It is the usual first choice for ongoing nausea in advanced cancer, but it is avoided when the bowel is completely blocked.",
    summary: "The US injection label includes \"the prophylaxis of vomiting associated with emetogenic cancer chemotherapy\" as well as diabetic gastroparesis, postoperative nausea and vomiting, small bowel intubation and radiological examination; the oral forms cover reflux and gastroparesis, with therapy not to exceed 12 weeks. MASCC/ESMO 2016: \"The drug of choice for managing N & V in advanced cancer is metoclopramide titrated to effect. Alternative options include haloperidol, levomepromazine, or olanzapine.\" MASCC 2022 suggests dopamine antagonist prokinetics may help in partial malignant bowel obstruction but should likely be avoided in complete obstruction because of the risk of perforation. The Reglan NDA was approved on 30 December 1980.",
    approvals: [{ region: "US", year: 1980, indication: "Injection: prophylaxis of vomiting with emetogenic cancer chemotherapy, postoperative nausea and vomiting, diabetic gastroparesis and procedural uses; oral: reflux and diabetic gastroparesis", note: "Year is the Reglan NDA 017854 approval (Drugs@FDA)" }],
    technologies: ["antiemetic-therapy"], terms: ["chemotherapy-induced-nausea-and-vomiting"], related: ["haloperidol", "levomepromazine", "cyclizine"],
    links: [DM("1ecab710-8b7d-4903-80a8-de66562be55a", "metoclopramide injection"), MASCC_ESMO_ADV, MASCC_MBO] }),
  d({ id: "haloperidol", name: "Haloperidol", brand: "Haldol", modality: "Butyrophenone antipsychotic, used as an antiemetic", wikipedia: W("Haloperidol"),
    mechanism: "A butyrophenone dopamine antagonist.",
    tldr: "Haloperidol is an antipsychotic medicine used in small doses in palliative care for nausea and vomiting, especially when the bowel is blocked.",
    summary: "The US label covers psychotic disorders, Tourette's disorder and severe behaviour problems in children. MASCC 2022 suggests haloperidol \"may be an effective anti-emetic in MBO, particularly for complete MBO\" (level IV, grade B), and MASCC/ESMO 2016 names it as an alternative to metoclopramide for nausea in advanced cancer and as the antiemetic to give alongside octreotide in bowel obstruction. The antiemetic use is off-label. The first Haldol NDA was approved on 18 May 1971.",
    approvals: [{ region: "US", year: 1971, indication: "Psychotic disorders; Tourette's disorder; severe behaviour problems in children", note: "Year is the Haldol NDA 015923 approval (Drugs@FDA)" }],
    technologies: ["antiemetic-therapy", "palliative-care"], related: ["metoclopramide", "levomepromazine"],
    links: [DM("00bb61c8-db35-4c04-9ef7-47d447d2496b", "haloperidol tablets"), MASCC_MBO, MASCC_ESMO_ADV] }),
  d({ id: "levomepromazine", name: "Levomepromazine", brand: "Nozinan", aka: ["methotrimeprazine"], modality: "Phenothiazine antipsychotic, used as an antiemetic and sedative", wikipedia: W("Levomepromazine"),
    mechanism: "Resembles chlorpromazine and promethazine: anti-emetic, antihistamine and anti-adrenaline activity with a strong sedative effect (UK SmPC 5.1).",
    tldr: "Levomepromazine is a strong anti-sickness and calming medicine used in hospices and palliative care, often by a small pump under the skin, for nausea, restlessness and distress near the end of life.",
    summary: "The UK SmPC for the injection gives \"management of the terminally ill patient\" and \"the management of pain and accompanying restlessness or distress in the terminally ill patient\"; the tablets add psychiatric uses. MASCC/ESMO 2016 lists it as an alternative to metoclopramide for nausea and vomiting in advanced cancer. In the EAPC 2024 framework for palliative sedation it is the step 2 medicine, added to midazolam when midazolam alone is not enough. It is not marketed in the US.",
    approvals: [{ region: "UK", year: 2012, indication: "Injection: management of pain and accompanying restlessness or distress in the terminally ill patient", note: "Year is the first authorisation of UK licence PL 29831/0462 as printed in its SmPC, not the first approval of the medicine" }],
    technologies: ["antiemetic-therapy", "palliative-care"], terms: ["palliative-sedation"], related: ["haloperidol", "midazolam", "metoclopramide"],
    links: [EMC("3014", "levomepromazine 25 mg/ml injection"), EMC("11912", "levomepromazine 25 mg tablets"), MASCC_ESMO_ADV, EAPC] }),
  d({ id: "cyclizine", name: "Cyclizine", brand: "Valoid", modality: "Antihistamine antiemetic (H1 receptor antagonist)", wikipedia: W("Cyclizine"),
    mechanism: "A histamine H1 receptor antagonist of the piperazine class with anticholinergic and antiemetic properties (UK SmPC 5.1).",
    tldr: "Cyclizine is an anti-sickness tablet or injection widely used in the UK, including for sickness caused by opioid painkillers and by radiotherapy.",
    summary: "The UK SmPCs list prevention and treatment of nausea and vomiting from motion sickness, from narcotic analgesics and general anaesthetics after surgery, and \"vomiting associated with radiotherapy especially for breast cancer since Cyclizine does not elevate prolactin levels\". The Scottish Palliative Care Guidelines advise against prescribing a prokinetic such as metoclopramide together with an anticholinergic such as cyclizine, because the anticholinergic diminishes the prokinetic effect. It is not marketed as a prescription medicine in the US.",
    approvals: [{ region: "UK", year: 2001, indication: "Prevention and treatment of nausea and vomiting: motion sickness, narcotic analgesics and general anaesthetics after surgery, and vomiting with radiotherapy, especially for breast cancer", note: "Year is the first authorisation of UK licence PL 20072/0241 (tablets) as printed in its SmPC, not the first approval of the medicine" }],
    cancers: ["breast-cancer"], technologies: ["antiemetic-therapy"], related: ["metoclopramide"],
    links: [EMC("4318", "cyclizine 50 mg tablets"), EMC("100940", "cyclizine 50 mg/ml injection"), { label: "Scottish Palliative Care Guidelines: nausea and vomiting", url: "https://www.palliativecareguidelines.scot.nhs.uk/scottish-palliative-care-guidelines/symptoms/non-pain-symptoms/nausea-and-vomiting/" }] }),

  // ---- Diarrhoea and immune colitis ----
  d({ id: "loperamide", name: "Loperamide", brand: "Imodium", aka: ["loperamide hydrochloride"], modality: "Medicine for diarrhoea (peripherally acting opioid receptor agonist, oral)", wikipedia: W("Loperamide"),
    mechanism: "Binds opiate receptors in the gut wall, slowing intestinal movement and changing water and electrolyte movement through the bowel (US label).",
    tldr: "Loperamide is an anti-diarrhoea capsule. People on some cancer drugs, such as irinotecan and neratinib, are told to keep it at home and start it at the first loose stool.",
    summary: "The US prescription label covers acute non-specific diarrhoea, chronic diarrhoea of inflammatory bowel disease and reduction of ileostomy output. The irinotecan (Camptosar) label says patients \"should have loperamide readily available to begin treatment for late diarrhea\" and to begin it at the first poorly formed or loose stool. The neratinib (Nerlynx) label, when dose escalation is not used, starts loperamide with the first dose and continues it for the first 56 days, then uses it to keep to one or two bowel movements a day. The Imodium NDA was approved on 28 December 1976.",
    approvals: [{ region: "US", year: 1976, indication: "Acute non-specific diarrhoea; chronic diarrhoea of inflammatory bowel disease; reducing ileostomy output", note: "Year is the Imodium NDA 017690 approval (Drugs@FDA)" }],
    related: ["irinotecan", "neratinib"],
    links: [DM("03c907d5-87f8-47a6-9544-5a24f5272739", "loperamide capsules"), DM("e518dfc6-7e93-4fee-a66c-51e1ab71c056", "Camptosar (irinotecan), late diarrhoea"), DM("d1e41dcf-e82a-47c2-a0ad-6c6eef621834", "Nerlynx (neratinib), diarrhoea prophylaxis")] }),
  d({ id: "infliximab", name: "Infliximab", brand: "Remicade", modality: "Monoclonal antibody (TNF blocker)", wikipedia: W("Infliximab"),
    mechanism: "A chimeric monoclonal antibody that binds and blocks tumour necrosis factor alpha.",
    tldr: "Infliximab is an anti-inflammatory drip used for Crohn's disease and arthritis. When checkpoint immunotherapy causes colitis that steroids do not control, it is the usual next step; it is avoided for immune hepatitis.",
    summary: "The Remicade label covers Crohn's disease, ulcerative colitis, rheumatoid arthritis, ankylosing spondylitis, psoriatic arthritis and plaque psoriasis. SITC 2021: if colitis does not respond to corticosteroids within 3 to 5 days, recurs on the taper, or is severely ulcerative at colonoscopy, \"3 doses of infliximab (5 mg/kg) should be administered at 0, 2, and 6 weeks\" (LE 1); people should be tested for hepatitis B, HIV and tuberculosis first without delaying the dose; and \"Infliximab should not be used in patients with liver toxicity, given the risk for hepatotoxicity\". SITC also names it for steroid-refractory nephritis and pneumonitis. The BLA was first approved on 24 August 1998.",
    approvals: [{ region: "US", year: 1998, indication: "Crohn's disease, ulcerative colitis, rheumatoid arthritis, ankylosing spondylitis, psoriatic arthritis, plaque psoriasis", note: "Year is the original BLA 103772 approval (Drugs@FDA); immune-related colitis is off-label" }],
    terms: ["immune-colitis", "irae", "pneumonitis"], related: ["vedolizumab", "mycophenolate"],
    links: [DM("a0a046c1-056d-45a9-bfd9-13b47c24f257", "Remicade"), SITC_ICI] }),
  d({ id: "vedolizumab", name: "Vedolizumab", brand: "Entyvio", modality: "Monoclonal antibody (gut-selective integrin receptor antagonist)", wikipedia: W("Vedolizumab"),
    mechanism: "A monoclonal antibody against alpha-4 beta-7 integrin that blocks immune cell traffic into the gut, giving a gut-selective anti-inflammatory effect.",
    tldr: "Vedolizumab is a gut-targeted anti-inflammatory drip for ulcerative colitis and Crohn's disease, used when colitis caused by checkpoint immunotherapy does not settle with steroids and infliximab.",
    summary: "The Entyvio label covers moderately to severely active ulcerative colitis and Crohn's disease in adults. SITC 2021: if colitis symptoms persist after the second infliximab dose, \"the third dose should be held and 3 doses of vedolizumab (300 mg) should be administered at 0, 2, and 6 weeks\" (LE 1); SITC notes that vedolizumab blocks alpha-4 beta-7 integrin, giving gut-selective anti-inflammatory activity. The use for immune-related colitis is off-label. The BLA was first approved on 20 May 2014.",
    approvals: [{ region: "US", year: 2014, indication: "Moderately to severely active ulcerative colitis and Crohn's disease in adults", note: "Year is the original BLA 125476 approval (Drugs@FDA)" }],
    terms: ["immune-colitis", "irae"], related: ["infliximab"],
    links: [DM("6e94621c-1a95-4af9-98d1-52b9e6f1949c", "Entyvio"), SITC_ICI] }),
  d({ id: "mycophenolate", name: "Mycophenolate mofetil", brand: "CellCept", aka: ["MMF", "mycophenolic acid"], modality: "Antimetabolite immunosuppressant (oral or intravenous)", wikipedia: W("Mycophenolic_acid"),
    mechanism: "An antimetabolite immunosuppressant; its active form, mycophenolic acid, limits lymphocyte proliferation.",
    tldr: "Mycophenolate is a medicine that damps down the immune system, approved to stop transplanted organs being rejected. In cancer care it is used when immunotherapy side effects such as hepatitis or pneumonitis do not respond to steroids.",
    summary: "The CellCept label covers prophylaxis of organ rejection in kidney, heart or liver transplant recipients, with other immunosuppressants. SITC 2021: if liver tests do not improve to grade 1 or better within 10 to 14 days of steroids, or hepatitis recurs on the taper, mycophenolate mofetil may be given at 1 to 2 g a day in two divided doses (LE 4); it is one option when pneumonitis does not improve within 72 hours of high-dose steroids, and for interstitial nephritis that does not respond to glucocorticoids. These uses are off-label. The NDA was first approved on 3 May 1995.",
    approvals: [{ region: "US", year: 1995, indication: "Prophylaxis of organ rejection in kidney, heart or liver transplant recipients", note: "Year is the CellCept NDA 050722 approval (Drugs@FDA)" }],
    terms: ["irae", "pneumonitis"], related: ["infliximab"],
    links: [DM("37241e87-4af4-4dc3-a1aa-ea6f20d8dc40", "CellCept"), SITC_ICI] }),

  // ---- Pain ----
  d({ id: "morphine", name: "Morphine", brand: "MS Contin / Oramorph / Sevredol", aka: ["morphine sulfate"], modality: "Strong opioid analgesic", wikipedia: W("Morphine"),
    mechanism: "A full agonist at the mu-opioid receptor.",
    tldr: "Morphine is the standard strong painkiller for cancer pain. NICE advises starting with regular morphine by mouth, with extra quick-acting doses for pain that breaks through.",
    summary: "US morphine labels cover acute and chronic pain severe enough to need an opioid when alternatives are inadequate, with warnings on addiction, abuse and misuse. NICE CG140 for adults needing strong opioids in palliative care: start with regular oral sustained-release or immediate-release morphine, with immediate-release morphine for breakthrough pain; with normal kidney and liver function a typical starting dose is 20 mg to 30 mg of oral morphine a day (for example 10 mg to 15 mg sustained-release twice daily) plus 5 mg immediate-release rescue doses; and oral sustained-release morphine is the first-line maintenance treatment. MASCC/ISOO 2020 suggests topical morphine 0.2% mouthwash for mucositis pain in head and neck cancer during chemoradiotherapy. The MS Contin NDA was approved on 29 May 1987.",
    approvals: [{ region: "US", year: 1987, indication: "Pain severe enough to require an opioid analgesic when alternatives are inadequate", note: "Year is the MS Contin NDA 019516 approval (Drugs@FDA); other morphine products are older" }],
    technologies: ["pain-management", "palliative-care"], terms: ["mucositis"], keyPapers: ["paper-elad-cancer"], related: ["oxycodone", "naloxone", "fentanyl", "methylnaltrexone"],
    links: [DM("07593aa4-f2c4-4d6e-b186-ab2a4ecaa38a", "morphine sulfate tablets"), CG140, MASCC_ISOO] }),
  d({ id: "oxycodone", name: "Oxycodone", brand: "OxyContin / OxyNorm", aka: ["oxycodone hydrochloride"], modality: "Strong opioid analgesic", wikipedia: W("Oxycodone"),
    mechanism: "A full opioid agonist, acting mainly at the mu-opioid receptor.",
    tldr: "Oxycodone is a strong painkiller used for cancer pain, often when morphine does not suit, for example with kidney problems or when the medicine has to be given under the skin.",
    summary: "The OxyContin label covers severe and persistent pain that needs an opioid and cannot be adequately treated with alternatives, in adults and some opioid-tolerant children, with boxed warnings on addiction, abuse and respiratory depression. The Australian cancer pain guideline (2025 update) names oxycodone among the preferred opioids in severe kidney disease, with careful titration, and among the opioids to switch to subcutaneously when the oral route is no longer possible. The reformulated OxyContin NDA in Drugs@FDA was approved on 5 April 2010.",
    approvals: [{ region: "US", year: 2010, indication: "Severe and persistent pain requiring an opioid that cannot be adequately treated with alternatives", note: "Year is NDA 022272 (reformulated OxyContin) in Drugs@FDA; the original 1995 application is not in the API and is not dated here" }],
    technologies: ["pain-management"], related: ["morphine", "naloxone"],
    links: [DM("bfdfe235-d717-4855-a3c8-a13d26dadede", "OxyContin"), AUS_PAIN] }),
  d({ id: "naloxone", name: "Naloxone", brand: "Narcan", aka: ["naloxone hydrochloride"], modality: "Opioid antagonist (injection, nasal spray)", wikipedia: W("Naloxone"),
    mechanism: "A competitive opioid receptor antagonist that reverses the effects of opioids.",
    tldr: "Naloxone reverses an opioid overdose. For people on strong painkillers for cancer, it is given in small repeated doses so that breathing recovers without bringing all the pain back.",
    summary: "The US injection label covers \"the complete or partial reversal of opioid depression, including respiratory depression\" and diagnosis of suspected acute opioid overdose. The Australian cancer pain guideline (2025) advises that if the respiratory rate is 8 a minute or less and the person cannot be roused, \"use the appropriate dose of naloxone in frequent small doses with the aim to improve consciousness without worsening pain\", diluting the ampoule to 10 mL. The same guideline suggests switching to oxycodone combined with naloxone for opioid constipation that does not respond to laxatives. The Narcan NDA was approved on 13 April 1971.",
    approvals: [{ region: "US", year: 1971, indication: "Complete or partial reversal of opioid depression; diagnosis of suspected acute opioid overdose", note: "Year is the Narcan NDA 016636 approval (Drugs@FDA)" }],
    technologies: ["pain-management"], related: ["morphine", "oxycodone"],
    links: [DM("201fdedf-1736-4e52-9d7d-de14292547fd", "naloxone hydrochloride injection"), AUS_PAIN] }),

  // ---- Sedation, end of life and procedures ----
  d({ id: "midazolam", name: "Midazolam", brand: "Versed / Hypnovel / Buccolam", modality: "Benzodiazepine sedative (injection, oral, buccal)", wikipedia: W("Midazolam"),
    mechanism: "A short-acting benzodiazepine that enhances GABA-A receptor signalling, giving sedation, anxiety relief and amnesia.",
    tldr: "Midazolam is a fast, short-acting sedative. In cancer care it is used to keep people comfortable during procedures such as bronchoscopy, and in palliative care as the first medicine for sedation when suffering cannot be relieved any other way.",
    summary: "The US injection label covers sedation, anxiolysis and amnesia before or during diagnostic, therapeutic or endoscopic procedures, naming bronchoscopy and \"oncology procedures\", and induction of general anaesthesia. In the EAPC 2024 framework for palliative sedation midazolam is step 1, with levomepromazine added at step 2 and propofol under an anaesthetist at step 3, and the doses are halved where there are risk factors. NICE NG31 suggests an opioid, a benzodiazepine or both for breathlessness in the last days of life. NICE CG112 lists oral or intranasal midazolam for children having painful procedures at minimal or moderate sedation. The Versed NDA was approved on 20 December 1985.",
    approvals: [{ region: "US", year: 1985, indication: "Sedation, anxiolysis and amnesia for procedures (including oncology procedures); induction of general anaesthesia; sedation of intubated patients", note: "Year is the Versed NDA 018654 approval (Drugs@FDA)" }],
    technologies: ["palliative-care"], terms: ["palliative-sedation"], related: ["levomepromazine", "propofol", "lidocaine"],
    links: [DM("06e4f754-72df-4eb4-aaed-b538524f5277", "midazolam injection"), EAPC, NG31, CG112] }),
  d({ id: "propofol", name: "Propofol", brand: "Diprivan", modality: "Intravenous general anaesthetic and sedative", wikipedia: W("Propofol"),
    mechanism: "A short-acting intravenous anaesthetic that enhances GABA-A receptor signalling.",
    tldr: "Propofol is an anaesthetic given into a vein for operations and deep sedation. Children with cancer may have it for lumbar punctures and other procedures, and in palliative care it is a last-step option for sedation, given under an anaesthetist.",
    summary: "The Diprivan label covers monitored anaesthesia care sedation, combined sedation and regional anaesthesia, induction and maintenance of general anaesthesia and sedation of ventilated patients in intensive care. The international guideline on needle procedures in children with cancer (Loeffen 2020) strongly recommends offering deep sedation or general anaesthesia to all children having a lumbar puncture; NICE CG112 requires a professional trained in delivering anaesthetic agents to be available whenever propofol, sevoflurane or opioids with ketamine are used for sedation in under-19s. In the EAPC 2024 palliative sedation framework propofol is step 3, \"Administration under the supervision of an anaesthesiologist is advisable\". The Diprivan NDA was approved on 2 October 1989.",
    approvals: [{ region: "US", year: 1989, indication: "Induction and maintenance of general anaesthesia; procedural and intensive care sedation", note: "Year is the Diprivan NDA 019627 approval (Drugs@FDA)" }],
    terms: ["palliative-sedation"], related: ["midazolam", "ketamine", "levomepromazine"],
    links: [DM("5cec3b97-5183-4a9d-accd-21e76c99d3dd", "Diprivan"), CG112, EAPC, { label: "Loeffen et al., Reducing pain and distress related to needle procedures in children with cancer: a clinical practice guideline (Eur J Cancer 2020)", url: "https://doi.org/10.1016/j.ejca.2020.02.039" }] }),
  d({ id: "ketamine", name: "Ketamine", brand: "Ketalar", modality: "Intravenous or intramuscular general anaesthetic", wikipedia: W("Ketamine"),
    mechanism: "A dissociative anaesthetic that blocks NMDA receptors.",
    tldr: "Ketamine is an anaesthetic used for sedation and pain relief during procedures, including in children having cancer care procedures, given by staff trained in anaesthesia.",
    summary: "The Ketalar label covers use as the sole anaesthetic for diagnostic and surgical procedures that do not need muscle relaxation, induction of anaesthesia, and as a supplement to other anaesthetics. NICE CG112 requires a professional trained in delivering anaesthetic agents to be available when opioids are combined with ketamine for sedation in under-19s, and advises against routinely using ketamine or opioids for painless imaging. The Ketalar NDA was approved on 19 February 1970.",
    approvals: [{ region: "US", year: 1970, indication: "Sole anaesthetic for procedures not requiring muscle relaxation; induction of anaesthesia; supplement to other anaesthetics", note: "Year is the Ketalar NDA 016812 approval (Drugs@FDA)" }],
    related: ["propofol", "midazolam"],
    links: [DM("14e8f864-8b8a-4e7e-8439-e510d3107063", "Ketalar"), CG112] }),
  d({ id: "lidocaine", name: "Lidocaine", brand: "Xylocaine", aka: ["lignocaine"], modality: "Amide local anaesthetic (injection, topical)", wikipedia: W("Lidocaine"),
    mechanism: "A local anaesthetic that blocks sodium channels in nerve membranes, stopping pain signals where it is applied or injected.",
    tldr: "Lidocaine is the local anaesthetic used to numb the skin and tissues before needles and biopsies, such as a bone marrow biopsy.",
    summary: "The Xylocaine injection label covers local or regional anaesthesia by infiltration, peripheral nerve block and central neural techniques; viscous lidocaine labels cover topical anaesthesia of irritated or inflamed mucous membranes of the mouth and pharynx. In the REVEH trial of pain relief for bone marrow biopsy (126 patients), \"All patients received local anesthesia (lidocaine) before biopsy\". NICE CG112 advises considering a local anaesthetic as well as a sedative for every child having a painful procedure. The Xylocaine NDA was approved on 19 November 1948.",
    approvals: [{ region: "US", year: 1948, indication: "Local or regional anaesthesia by infiltration, nerve block and central neural techniques", note: "Year is the Xylocaine NDA 006488 approval (Drugs@FDA)" }],
    related: ["midazolam"],
    links: [DM("1414bcfc-1543-4ad4-83bd-4fc444a02e92", "Xylocaine injection"), DM("0050d05a-b8e9-c544-e063-6294a90a0243", "lidocaine for topical mouth and pharynx use"), { label: "Le Du et al., Virtual reality for pain prevention in bone marrow biopsy (REVEH trial, J Med Internet Res 2023)", url: "https://doi.org/10.2196/38619" }, CG112] }),
  d({ id: "glycopyrronium", name: "Glycopyrronium bromide", brand: "Robinul", aka: ["glycopyrrolate"], modality: "Antimuscarinic (anticholinergic) injection", wikipedia: W("Glycopyrronium_bromide"),
    mechanism: "An anticholinergic that blocks muscarinic receptors, reducing saliva and airway secretions.",
    tldr: "Glycopyrronium dries up secretions. In the last days of life it is one of the medicines that can be tried for noisy breathing from secretions when this distresses the dying person.",
    summary: "The US injection label covers reduction of salivary, tracheobronchial and pharyngeal secretions in anaesthesia, intraoperative use against vagal reflex arrhythmias, protection against peripheral muscarinic effects when neuromuscular block is reversed, and peptic ulcer. NICE NG31 recommends considering a trial of medicine for noisy respiratory secretions if they cause the dying person distress, using one of atropine, glycopyrronium bromide, hyoscine butylbromide or hyoscine hydrobromide, monitoring at least every 12 hours (off-label in December 2015). The Robinul NDA was approved on 6 February 1975.",
    approvals: [{ region: "US", year: 1975, indication: "Reduction of secretions and vagal reflexes in anaesthesia; reversal of neuromuscular block; peptic ulcer", note: "Year is the Robinul NDA 017558 approval (Drugs@FDA)" }],
    technologies: ["palliative-care"], related: ["hyoscine"],
    links: [DM("02541cfd-b209-49b9-a73f-13ef18dce06d", "glycopyrrolate injection"), NG31] }),
  d({ id: "hyoscine", name: "Hyoscine (scopolamine): butylbromide and hydrobromide", brand: "Buscopan / Transderm Scop", aka: ["scopolamine", "hyoscine butylbromide", "hyoscine hydrobromide", "butylscopolamine"], modality: "Antimuscarinic (anticholinergic)", wikipedia: W("Scopolamine"),
    mechanism: "Blocks muscarinic receptors: the butylbromide salt relaxes gut and urinary smooth muscle without entering the brain much; the hydrobromide salt acts centrally against nausea and reduces secretions.",
    tldr: "Hyoscine comes in two forms. Hyoscine butylbromide eases gut cramps and is the first medicine NICE suggests for sickness from a blocked bowel in the last days of life; either form can be tried for noisy breathing from secretions.",
    summary: "The UK SmPC for Buscopan ampoules (hyoscine butylbromide) covers acute spasm such as renal or biliary colic and diagnostic procedures where spasm is a problem; the US Transderm Scop patch (hyoscine hydrobromide) covers prevention of motion sickness and postoperative nausea and vomiting. NICE NG31 suggests hyoscine butylbromide as first-line treatment for nausea or vomiting with obstructive bowel disorders in the last days of life, with octreotide if symptoms do not improve within 24 hours, and lists both salts among the options for noisy respiratory secretions (off-label in December 2015). MASCC 2022 suggests hyoscine butylbromide may help abdominal pain in malignant bowel obstruction and may be inferior to octreotide for vomiting. The Transderm Scop NDA was approved on 31 December 1979.",
    approvals: [{ region: "US", year: 1979, indication: "Hydrobromide patch: prevention of motion sickness and postoperative nausea and vomiting", note: "Year is the Transderm Scop NDA 017874 approval (Drugs@FDA); the butylbromide salt is not marketed in the US" }],
    technologies: ["palliative-care"], related: ["glycopyrronium", "haloperidol"],
    links: [EMC("890", "Buscopan ampoules (hyoscine butylbromide)"), DM("b877a694-a1d0-4280-937a-a06820b12a88", "Transderm Scop (hyoscine hydrobromide)"), NG31, MASCC_MBO] }),

  // ---- Infection prevention and treatment ----
  d({ id: "valaciclovir", name: "Valaciclovir", brand: "Valtrex", aka: ["valacyclovir"], modality: "Antiviral (oral prodrug of aciclovir)", wikipedia: W("Valaciclovir"),
    mechanism: "A prodrug of aciclovir, a deoxynucleoside analogue that inhibits herpesvirus DNA polymerase; better absorbed by mouth than aciclovir.",
    tldr: "Valaciclovir is an antiviral tablet against herpes viruses. People having some cancer treatments take it, or aciclovir, to prevent cold sores, mouth ulcers and shingles coming back.",
    summary: "The Valtrex label covers cold sores, genital herpes and herpes zoster in adults and cold sores and chickenpox in children, and states that efficacy and safety have not been established in immunocompromised patients other than for suppressing genital herpes in HIV. AGIHO 2022 notes that valaciclovir \"has been shown to be non-inferior to acyclovir in preventing HSV stomatitis in patients with acute leukaemia and intensive chemotherapy\"; it recommends oral aciclovir as prophylaxis of oral HSV disease and says oral valaciclovir \"can be used alternatively (BI)\", the best regimen not yet defined. The NDA was first approved on 23 June 1995.",
    approvals: [{ region: "US", year: 1995, indication: "Cold sores, genital herpes and herpes zoster in adults; cold sores and chickenpox in children", note: "Year is the Valtrex NDA 020487 approval (Drugs@FDA); prophylaxis during cancer treatment is off-label" }],
    technologies: ["allogeneic-hsct"], related: ["posaconazole"],
    links: [DM("56a62c21-bead-4f3b-a24e-c3fd0b4a732f", "Valtrex"), { label: "Sandherr et al., Management of herpesvirus reactivations in patients with solid tumours and hematologic malignancies: AGIHO guideline update (Ann Hematol 2022)", url: "https://doi.org/10.1007/s00277-021-04746-y" }] }),
  d({ id: "tenofovir", name: "Tenofovir (disoproxil and alafenamide)", brand: "Viread / Vemlidy", aka: ["tenofovir disoproxil fumarate", "TDF", "tenofovir alafenamide", "TAF"], modality: "Antiviral (nucleotide analogue reverse transcriptase inhibitor, oral)", wikipedia: W("Tenofovir_disoproxil"),
    mechanism: "A nucleotide analogue that inhibits hepatitis B virus and HIV-1 reverse transcriptase.",
    tldr: "Tenofovir is an antiviral tablet for hepatitis B and HIV. Someone with current or past hepatitis B who needs certain cancer treatments takes it to stop the virus flaring up.",
    summary: "The Viread (tenofovir disoproxil fumarate) label covers HIV-1 infection with other antiretrovirals and chronic hepatitis B; the Vemlidy (tenofovir alafenamide) label covers chronic hepatitis B with compensated liver disease. ASCO's 2020 provisional clinical opinion on hepatitis B and cancer summarises guidance that patients with chronic infection or past exposure receiving higher-risk chemotherapy \"require antiviral prophylaxis with tenofovir or entecavir\". Viread was first approved on 26 October 2001 and Vemlidy on 10 November 2016.",
    approvals: [{ region: "US", year: 2001, indication: "Viread: HIV-1 infection and chronic hepatitis B", note: "NDA 021356 (Drugs@FDA)" }, { region: "US", year: 2016, indication: "Vemlidy: chronic hepatitis B with compensated liver disease", note: "NDA 208464 (Drugs@FDA)" }],
    terms: ["lymphoma-tx-hepatitis-b-reactivation"],
    links: [DM("33fd6418-fbdc-42ca-a50d-ce2a476a5418", "Viread"), DM("72e6b33c-0351-4070-9172-eeaa186c01d2", "Vemlidy"), { label: "Hwang et al., Hepatitis B virus screening and management for patients with cancer prior to therapy: ASCO provisional clinical opinion update (J Clin Oncol 2020)", url: "https://doi.org/10.1200/JCO.20.01757" }] }),
  d({ id: "posaconazole", name: "Posaconazole", brand: "Noxafil", modality: "Azole antifungal (oral, intravenous)", wikipedia: W("Posaconazole"),
    mechanism: "A triazole antifungal that blocks ergosterol synthesis in the fungal cell membrane.",
    tldr: "Posaconazole is an antifungal medicine. Its label includes preventing mould and yeast infections in people with blood cancers whose white cells stay low for a long time after chemotherapy.",
    summary: "The Noxafil label covers treatment of invasive aspergillosis, and \"prophylaxis of invasive Aspergillus and Candida infections in patients who are at high risk of developing these infections due to being severely immunocompromised, such as hematopoietic stem cell transplant (HSCT) recipients with graft-versus-host disease (GVHD) or those with hematologic malignancies with prolonged neutropenia from chemotherapy\", as well as oropharyngeal candidiasis. The ECIL-10 guideline (2025) considers isavuconazole for adults in remission induction for acute myeloid leukaemia \"for whom posaconazole is not appropriate\", and notes literature support for posaconazole during the first four cycles of azacitidine in high-risk MDS. ECIL notes that the drug interaction between triazoles and vincristine, part of most acute lymphoblastic leukaemia regimens, hampers antifungal prophylaxis there. The NDA was first approved on 15 September 2006.",
    approvals: [{ region: "US", year: 2006, indication: "Prophylaxis of invasive Aspergillus and Candida infections in severely immunocompromised patients (HSCT with GVHD, haematological malignancies with prolonged neutropenia from chemotherapy); invasive aspergillosis; oropharyngeal candidiasis", note: "Year is the Noxafil NDA 022003 approval (Drugs@FDA)" }],
    technologies: ["allogeneic-hsct"], terms: ["neutropenia", "gvhd"], related: ["valaciclovir"],
    links: [DM("b073b082-7b57-4423-8c06-4fd4263d6f84", "Noxafil"), { label: "Primary antifungal prophylaxis in hematological malignancies: updated ECIL-10 clinical practice guidelines (Leukemia 2025)", url: "https://doi.org/10.1038/s41375-025-02586-7" }] }),
  d({ id: "levofloxacin", name: "Levofloxacin", brand: "Levaquin / Tavanic", modality: "Fluoroquinolone antibacterial (oral, intravenous)", wikipedia: W("Levofloxacin"),
    mechanism: "A fluoroquinolone that inhibits bacterial DNA gyrase and topoisomerase IV.",
    tldr: "Levofloxacin is an antibiotic. Children and adults expected to have very low white cell counts after chemotherapy may take it to prevent bacterial infection during that time.",
    summary: "The US label covers pneumonia, skin, urinary, prostate and other infections, with boxed warnings about tendon, nerve and central nervous system effects. NICE CG151 offers adults with acute leukaemias, stem cell transplants or solid tumours in whom significant neutropenia (0.5 × 10⁹/L or lower) is expected prophylaxis with a fluoroquinolone during the expected period of neutropenia only, noting that in September 2024 only ciprofloxacin was licensed for this in the UK. The paediatric guideline endorsed by POGO and COG (2020) states that \"Levofloxacin is the preferred agent if antibacterial prophylaxis is planned\" (strong recommendation, moderate-quality evidence). The Levaquin NDA was approved on 20 December 1996.",
    approvals: [{ region: "US", year: 1996, indication: "Pneumonia, skin, urinary tract, prostate and other bacterial infections listed on the label", note: "Year is the Levaquin NDA 020634 approval (Drugs@FDA)" }],
    terms: ["febrile-neutropenia", "neutropenia"], related: ["ciprofloxacin"],
    links: [DM("05d179f5-b200-8597-e063-6394a90a10cc", "levofloxacin tablets"), CG151, { label: "Lehrnbecher et al., Guideline for antibacterial prophylaxis administration in pediatric cancer and hematopoietic stem cell transplantation (Clin Infect Dis 2020)", url: "https://doi.org/10.1093/cid/ciz1082" }] }),
  d({ id: "ciprofloxacin", name: "Ciprofloxacin", brand: "Cipro / Ciproxin", modality: "Fluoroquinolone antibacterial (oral, intravenous)", wikipedia: W("Ciprofloxacin"),
    mechanism: "A fluoroquinolone that inhibits bacterial DNA gyrase and topoisomerase IV.",
    tldr: "Ciprofloxacin is an antibiotic. In the UK it is the fluoroquinolone licensed to prevent infection in adults whose white cell count is expected to fall very low after chemotherapy.",
    summary: "The Cipro label covers skin, bone and joint, intra-abdominal, urinary, respiratory and other infections, with boxed warnings about tendon, nerve and central nervous system effects. NICE CG151 offers adults with acute leukaemias, stem cell transplants or solid tumours in whom significant neutropenia is expected prophylaxis with a fluoroquinolone during the expected period of neutropenia only, and notes that \"In September 2024, only ciprofloxacin was licensed for prophylaxis of infections in neutropenic patients\", referring to MHRA January 2024 advice on fluoroquinolone restrictions. The Cipro NDA was approved on 22 October 1987.",
    approvals: [{ region: "US", year: 1987, indication: "Skin, bone and joint, intra-abdominal, urinary, respiratory and other bacterial infections listed on the label", note: "Year is the Cipro NDA 019537 approval (Drugs@FDA)" }],
    terms: ["febrile-neutropenia", "neutropenia"], related: ["levofloxacin"],
    links: [DM("888dc7f9-ad9c-4c00-8d50-8ddfd9bd27c0", "Cipro"), CG151] }),
  d({ id: "piperacillin-tazobactam", name: "Piperacillin with tazobactam", brand: "Zosyn / Tazocin", aka: ["pip-taz", "piperacillin-tazobactam", "Tazocin"], modality: "Penicillin-class antibacterial with a beta-lactamase inhibitor (intravenous)", wikipedia: W("Piperacillin/tazobactam"),
    mechanism: "Piperacillin, a penicillin-class antibacterial, combined with tazobactam, a beta-lactamase inhibitor that protects it from bacterial enzymes.",
    tldr: "Piperacillin with tazobactam is a broad-spectrum antibiotic drip. NICE recommends it as the first antibiotic for suspected neutropenic sepsis, a fever when white cells are low after chemotherapy.",
    summary: "The Zosyn label covers intra-abdominal infections, nosocomial and community-acquired pneumonia, skin and skin structure infections and female pelvic infections. NICE CG151: \"Offer beta lactam monotherapy with piperacillin with tazobactam as initial empiric antibiotic therapy to patients with suspected neutropenic sepsis who need intravenous treatment unless there are patient-specific or local microbiological contraindications.\" For neutropenic enterocolitis, AGIHO 2017 recommends piperacillin/tazobactam, imipenem/cilastatin or meropenem (BIII). The Zosyn NDA was approved on 22 October 1993.",
    approvals: [{ region: "US", year: 1993, indication: "Intra-abdominal infections, nosocomial and community-acquired pneumonia, skin and skin structure infections, female pelvic infections", note: "Year is the Zosyn NDA 050684 approval (Drugs@FDA)" }],
    terms: ["febrile-neutropenia", "neutropenic-enterocolitis-typhlitis"],
    links: [DM("8db6bd91-2106-4bfd-8cc8-38aaf1e18d17", "Zosyn"), CG151, { label: "Schmidt-Hieber et al., Diagnosis and management of gastrointestinal complications in adult cancer patients: AGIHO guideline update (Ann Hematol 2018)", url: "https://doi.org/10.1007/s00277-017-3183-7" }] }),

  // ---- Neurology, endocrine, skin ----
  d({ id: "levetiracetam", name: "Levetiracetam", brand: "Keppra", modality: "Antiepileptic (oral, intravenous)", wikipedia: W("Levetiracetam"),
    mechanism: "An antiepileptic that binds synaptic vesicle protein SV2A.",
    tldr: "Levetiracetam is an anti-seizure medicine. After CAR-T cell therapy it is the recommended treatment for seizures, and some people at high risk of nerve side effects take it to prevent them.",
    summary: "The Keppra label covers partial-onset seizures from 1 month of age and, as adjunctive therapy, myoclonic seizures in juvenile myoclonic epilepsy and primary generalised tonic-clonic seizures. SITC 2020: \"To manage seizures in patients treated with CAR T cell therapies, levetiracetam is recommended (LE: 4)\"; there is insufficient evidence for prophylaxis in everyone, but \"in patients deemed to be at high-risk of developing neurotoxicity ... prophylactic levetiracetam may be considered\". The NDA was first approved on 30 November 1999.",
    approvals: [{ region: "US", year: 1999, indication: "Partial-onset seizures; adjunctive treatment of myoclonic and primary generalised tonic-clonic seizures", note: "Year is the Keppra NDA 021035 approval (Drugs@FDA)" }],
    technologies: ["car-t"], terms: ["icans"],
    links: [DM("3ca9df05-a506-4ec8-a4fe-320f1219ab21", "Keppra"), SITC_IEC] }),
  d({ id: "levothyroxine", name: "Levothyroxine", brand: "Synthroid / Eltroxin", aka: ["L-thyroxine", "T4", "thyroxine"], modality: "Thyroid hormone replacement (oral)", wikipedia: W("Levothyroxine"),
    mechanism: "Synthetic thyroxine (T4), converted in the body to the active hormone T3.",
    tldr: "Levothyroxine replaces thyroid hormone. After surgery and radioactive iodine for thyroid cancer it is given at a dose that also keeps TSH down, and it treats the underactive thyroid that immunotherapy can cause.",
    summary: "The US label covers replacement in primary, secondary and tertiary hypothyroidism and pituitary TSH suppression \"as an adjunct to surgery and radioiodine therapy in the management of thyrotropin-dependent well-differentiated thyroid cancer\"; it is not indicated for suppressing benign nodules. SITC 2021 states that \"The standard of care for the treatment of hypothyroidism is levothyroxine\", and that most people who develop thyrotoxicosis from checkpoint inhibitors go on to need long-term replacement. The Synthroid NDA in Drugs@FDA was approved on 24 July 2002.",
    approvals: [{ region: "US", year: 2002, indication: "Hypothyroidism; TSH suppression with surgery and radioiodine in well-differentiated thyroid cancer", note: "Year is the Synthroid NDA 021402 approval (Drugs@FDA)" }],
    cancers: ["thyroid"], terms: ["tsh-suppression", "immune-endocrinopathy"],
    links: [DM("008de8fd-150f-4022-8ccb-c8bfa94875c7", "levothyroxine sodium tablets"), SITC_ICI] }),
  d({ id: "mometasone", name: "Mometasone furoate (skin cream)", brand: "Elocon", aka: ["mometasone"], modality: "Medium-potency topical corticosteroid", wikipedia: W("Mometasone_furoate"),
    mechanism: "A topical corticosteroid that reduces skin inflammation and itch.",
    tldr: "Mometasone is a steroid cream. MASCC experts recommend it to help prevent the skin reaction that radiotherapy can cause.",
    summary: "The US label for mometasone furoate 0.1% cream covers \"the relief of the inflammatory and pruritic manifestations of corticosteroid-responsive dermatoses\" from 2 years of age. The MASCC Delphi consensus on acute radiation dermatitis (Lancet Oncol 2023) recommended six interventions for prevention: \"photobiomodulation therapy and Mepitel film in people with breast cancer, Hydrofilm, mometasone, betamethasone, and olive oil\". The Elocon NDA was approved on 30 April 1987.",
    approvals: [{ region: "US", year: 1987, indication: "Inflammatory and itchy manifestations of corticosteroid-responsive dermatoses", note: "Year is the Elocon NDA 019543 approval (Drugs@FDA)" }],
    terms: ["radiation-dermatitis"],
    links: [DM("16e134c7-39fb-4d16-9c24-a6df438967bf", "mometasone furoate cream 0.1%"), { label: "Behroozian et al., MASCC clinical practice guidelines for the prevention and management of acute radiation dermatitis (Lancet Oncol 2023)", url: "https://doi.org/10.1016/S1470-2045(23)00067-0" }] }),
  d({ id: "urea-cream", name: "Urea cream", aka: ["urea-based cream", "10% urea cream"], modality: "Topical keratolytic emollient", status: "established", wikipedia: W("Urea"),
    mechanism: "Urea softens and moisturises thickened skin and helps shed hard surface layers.",
    tldr: "Urea cream softens thick, dry skin. Rubbed on the hands and feet from the first day of sorafenib, a 10 per cent cream made the painful hand-foot skin reaction less common in a large trial.",
    summary: "A DailyMed listing for a 40% urea cream describes use for debridement of hyperkeratotic lesions and for hyperkeratotic conditions such as dry rough skin, eczema, keratoderma, corns and calluses; that listing carries no FDA application number. In a randomised open-label trial in 871 people with advanced hepatocellular carcinoma starting sorafenib (Ren et al., J Clin Oncol 2015), 10% urea-based cream three times a day from day 1 with best supportive care lowered the 12-week incidence of any-grade hand-foot skin reaction compared with best supportive care alone (56.0% vs 73.6%; odds ratio 0.457, 95% CI 0.344 to 0.608); the authors called for blinded placebo-controlled trials.",
    terms: ["hand-foot-syndrome"], related: ["sorafenib"],
    links: [DM("0920f780-b504-1fea-e063-6394a90ae5a9", "urea cream 40% (listing)"), { label: "Ren et al., Randomized controlled trial of the prophylactic effect of urea-based cream on sorafenib-associated hand-foot skin reactions in advanced hepatocellular carcinoma (J Clin Oncol 2015)", url: "https://doi.org/10.1200/JCO.2013.52.9651" }] }),
];

/** Existing records that list the new medicines (the field is chosen by kind in src/data/index.ts). */
export const supportiveCareGapDrugBacklinks: Record<string, string[]> = {
  "cancer-associated-thrombosis": ["enoxaparin", "dalteparin", "tinzaparin", "apixaban", "rivaroxaban", "edoxaban", "warfarin"],
  vte: ["enoxaparin", "dalteparin", "tinzaparin", "apixaban", "rivaroxaban", "edoxaban", "warfarin"],
  "central-venous-access": ["alteplase", "urokinase"],
  "antiemetic-therapy": ["metoclopramide", "haloperidol", "levomepromazine", "cyclizine"],
  "pain-management": ["morphine", "oxycodone", "naloxone", "gabapentin", "duloxetine"],
  "palliative-sedation": ["midazolam", "levomepromazine", "propofol"],
  "palliative-care": ["glycopyrronium", "hyoscine"],
  "immune-colitis": ["infliximab", "vedolizumab"],
  irae: ["infliximab", "mycophenolate"],
  "peripheral-neuropathy": ["duloxetine"],
  "hot-flushes-on-hormone-therapy": ["venlafaxine", "gabapentin", "cyproterone"],
  "rash-skin-toxicity": ["doxycycline", "minocycline"],
  crs: ["anakinra"],
  "febrile-neutropenia": ["piperacillin-tazobactam", "levofloxacin", "ciprofloxacin"],
  neutropenia: ["posaconazole"],
  "lymphoma-tx-hepatitis-b-reactivation": ["tenofovir"],
  "lymphoma-tx-pjp-and-infection-prophylaxis": ["valaciclovir"],
  "chemotherapy-side-effects-colorectal": ["loperamide"],
  icans: ["levetiracetam"],
  "tsh-suppression": ["levothyroxine"],
  "radiation-dermatitis": ["mometasone"],
  "hand-foot-syndrome": ["urea-cream"],
  "bone-marrow-biopsy-devices": ["lidocaine"],
};
