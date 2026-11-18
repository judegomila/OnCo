import { protocol } from "./helpers";
import { ASTCT_2019, ASTCT_2026 } from "./cell-therapy-sources";

/*
 * T-cell engaging bispecific antibodies (BCMA-directed in myeloma above all): step-up dosing, observation, the
 * outpatient route, infection prophylaxis and handover to community centres.
 *
 * First written on 11 November 2026 from one full text and four abstracts; the product labels were not read then.
 *
 * Second accuracy pass, 16 November 2026. Every source was fetched again as raw text and each claim checked against it:
 * - European Delphi consensus on outpatient step-up dosing and transition of care for BCMA bispecifics (eJHaem 2026):
 *   open access, full-text XML from Europe PMC (PMC13172755), all 84 statements with their agreement percentages.
 *   The study was initiated and funded by Pfizer and panel members received honoraria; the page says so.
 * - Remote patient monitoring viewpoint (JMIR Cancer 2026): now open in full (PMC13739275, Europe PMC full-text XML).
 * - IMWG immunotherapy committee 2024 and European Myeloma Network 2023 (both Lancet Oncology) and the CD3xCD20
 *   consensus 2024 (Blood): abstracts from Europe PMC. The publisher pages were tried once each: the Lancet Oncology
 *   links returned only a redirect page to a script and Blood returned 403, so they stay abstracts.
 * - Product labels, read for the first time. US prescribing information for Tecvayli, Elrexfio and Lynozyfic as SPL
 *   XML from DailyMed, each matched against the latest labelling supplement listed by openFDA (Tecvayli S-018 of
 *   5 March 2026, Elrexfio S-007 of 19 February 2026, Lynozyfic original approval of 2 July 2025). EU product
 *   information for the same three as PDFs from ema.europa.eu, read with pdftotext -layout.
 * - ASTCT 2019 consensus grading: the full text a sibling checker saved the same day from PubMed Central
 *   (PMC12180426) was re-used. ASTCT 2026: abstract only.
 * Every DOI was resolved through Crossref and its title checked. Every quote was checked verbatim by script
 * (whitespace and line-break hyphenation normalised, nothing else).
 *
 * Independent dose re-read, 17 November 2026. Every step-up dose, unit, route, day, interval, premedication dose and
 * observation period for teclistamab, elranatamab and linvoseltamab was read again by a second reader against the
 * current US prescribing information (DailyMed SPL XML; the version history was checked the same day and the versions
 * read are the latest: Tecvayli 17, Elrexfio 5, Lynozyfic 6) and the EU product information PDFs saved on 16 November
 * (ema.europa.eu answered 429 on 17 November, so the PDFs could not be confirmed unchanged overnight). No dose was
 * found wrong. The Delphi thresholds were re-read in the Europe PMC full text. The drug links were then checked one
 * by one: talquetamab, glofitamab, epcoritamab and mosunetuzumab were linked with no label read, so their current US
 * labels (DailyMed SPL XML: Talvey version 6, Columvi version 9, Epkinly version 11, Lunsumio version 7) were read
 * and added as sources, with a variant and four quoted label rows. Their EU product information was not read.
 */
export const bispecificStepUpDosing = protocol({
  id: "bispecific-step-up-dosing",
  name: "T-cell engaging bispecific antibodies: step-up dosing, monitoring and outpatient delivery",
  aka: ["bispecific step-up dosing", "BCMA bispecific outpatient dosing", "teclistamab step-up", "elranatamab step-up", "bispecific CRS prevention", "T-cell engager monitoring"],
  domain: "cell-therapy-toxicity",
  tldr: "Bispecific antibodies such as teclistamab, elranatamab and linvoseltamab for myeloma link T cells to cancer cells. The first doses are built up in steps to lower the risk of cytokine release syndrome (fever, low blood pressure) and confusion. US labels say to stay in hospital for one or two days after the first doses; European labels say to be monitored and stay near a hospital.",
  simple: "These drugs are started at low doses that are stepped up over the first one to three weeks, with medicines beforehand and close checks for fever and confusion. Depending on the drug and the country, you stay in hospital for a day or two after the first doses, or stay close to the hospital, usually with a carer.",
  summary: "Step-up dosing (two small doses before the first full dose) is how the BCMA bispecifics are started; each product's label sets the schedule, premedication and observation period. The current labels were read on 16 November 2026 and their doses read again by a second reader on 17 November 2026. Teclistamab (under the skin, by weight): 0.06 mg/kg, then 0.3 mg/kg, then the first treatment dose of 1.5 mg/kg; as monotherapy the US label puts these on days 1, 4 and 7 and the EU SmPC on days 1, 3 and 5. Elranatamab (under the skin, fixed dose): 12 mg on day 1, 32 mg on day 4, then 76 mg on day 8 and weekly. Linvoseltamab (into a vein): 5 mg on day 1, 25 mg on day 8, then 200 mg on day 15. Each of these doses follows dexamethasone, an antihistamine and paracetamol.\n\nThe labels differ on where the patient waits. The US labels say patients should be hospitalised: for 48 hours after each of the two teclistamab step-up doses (then monitored daily near a healthcare facility for 48 hours after the first treatment dose), for 48 hours after the first and 24 hours after the second elranatamab step-up dose, and for 24 hours after each of the two linvoseltamab step-up doses. The EU SmPCs instead say to monitor for signs and symptoms and have the patient stay near a healthcare facility: for 48 hours after every dose in the teclistamab step-up schedule, for 48 hours after each of the two elranatamab step-up doses, and for 24 hours, with a carer, after the first linvoseltamab step-up dose (after the second too if the first caused a reaction).\n\nThe European Myeloma Network (2023) recommends premedication, frequent assessment for CRS and step-up dosing, with corticosteroids and tocilizumab for CRS; other anti-IL-6 drugs, high-dose corticosteroids and anakinra might be considered in refractory cases. CRS and ICANS are graded on the ASTCT scale.\n\nThe 2026 European Delphi consensus on subcutaneous BCMA bispecifics in myeloma (84 statements, each with 75% or more agreement; Pfizer-funded) says outpatient step-up dosing should only be considered for patients with ECOG 0 to 2, low tumour burden and stable disease, no neurological symptoms and no active infection, generally a neutrophil count of at least 1000/mm3, a trained adult carer available 24 hours a day, and a home within 60 minutes of a centre with haematology or internal medicine expertise and intensive care. Centres must have a clinician experienced in CRS and ICANS during dosing hours, two doses of tocilizumab in a known place, access to dexamethasone, high-dose corticosteroids and anakinra, written procedures with escalation thresholds, and coordinated access to intensive care. Neutropenia should not be corrected with G-CSF before step-up dosing (79% agreement). Antiviral and Pneumocystis prophylaxis are mandatory for all, with baseline CMV testing and immunoglobulin replacement when IgG is under 400 mg/dL or infections recur. Transfer to a community centre should wait until the full step-up phase is complete and any CRS or ICANS has resolved (or until two doses have passed with neither), with the patient afebrile for 24 hours and free of toxicity, and with a treatment summary at handover.\n\nA 2026 viewpoint (writing support funded by Johnson & Johnson) describes remote patient monitoring as a way to give step-up doses to outpatients. The CD3xCD20 consensus (2024) covers the lymphoma bispecifics separately and was read only as an abstract. Talquetamab (myeloma) and the lymphoma bispecifics glofitamab, epcoritamab and mosunetuzumab have their own step-up schedules; the US label figures are set out under the variants below.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "patient-or-carer", "multidisciplinary-team"],
    where: ["ward", "outpatient-clinic", "chemotherapy-day-unit", "home"],
  },
  population: "Adults with relapsed or refractory multiple myeloma starting a BCMA-directed T-cell engaging bispecific antibody (teclistamab, elranatamab or linvoseltamab). The European Delphi consensus was written for the two given under the skin, teclistamab and elranatamab, and says its fit to intravenous agents (linvoseltamab) and to GPRC5D-directed agents (talquetamab) needs more data. Talquetamab, and the CD3xCD20 bispecifics for lymphoma (glofitamab, epcoritamab and mosunetuzumab), have their own labels: their US step-up schedules are given as a variant, and the steps here were not written for them. The lymphoma bispecifics also have their own consensus paper (2024), read here only as an abstract.",
  trigger: "A decision to start a T-cell engaging bispecific antibody.",
  steps: [
    {
      action: "Start with step-up doses and premedication, and assess often for cytokine release syndrome",
      why: "These are the measures the European Myeloma Network recommends against CRS; the labels say the stepped schedule reduces how often and how severely CRS happens.",
      source: "emn-2023",
      quote: "Recommended measures include premedication, frequent assessing for symptoms and severity of cytokine release syndrome, step-up dosing for several BsAbs and some CAR T-cell therapies; corticosteroids; and tocilizumab in the case of cytokine release syndrome.",
    },
    {
      action: "Follow the product label for the step-up schedule, premedication and how long to observe after each dose",
      why: "Each bispecific has its own licensed schedule; the European consensus ties outpatient observation, premedication and the 48-hour minimum gap between step-up doses to the SmPC.",
      source: "eu-bcma-2026",
      quote: "Following each step‐up dose, patients must be observed for vital signs and neurological function for a minimum defined period as specified in the SmPC.",
    },
    {
      action: "Teclistamab (US label, monotherapy): give 0.06 mg/kg on day 1, 0.3 mg/kg on day 4 and the first treatment dose of 1.5 mg/kg on day 7, under the skin; premedicate 1 to 3 hours before each with dexamethasone 16 mg, diphenhydramine 50 mg or equivalent and paracetamol 650 to 1,000 mg; keep the patient in hospital for 48 hours after each of the two step-up doses",
      why: "Step-up dose 2 and the first treatment dose may each be given 2 to 4 days after the dose before, or up to 7 days to let side effects settle. After the first treatment dose the patient stays near a healthcare facility and is checked daily for 48 hours. The EU SmPC puts the monotherapy doses on days 1, 3 and 5 (each 2 to 7 days after the one before), allows dexamethasone 16 to 20 mg and diphenhydramine 25 to 50 mg, and asks for daily monitoring near a healthcare facility for 48 hours after every dose in the schedule. The schedule with daratumumab uses different days.",
      source: "fda-tecvayli",
      quote: "Due to the risk of CRS and neurologic toxicity, including ICANS, patients should be hospitalized for 48 hours after administration of both step-up dose 1 and step-up dose 2.",
    },
    {
      action: "Elranatamab (US label): give 12 mg on day 1, 32 mg on day 4 and the first treatment dose of 76 mg on day 8, under the skin; premedicate about 1 hour before each of these three doses with paracetamol 650 mg, dexamethasone 20 mg and diphenhydramine 25 mg (or equivalents); keep the patient in hospital for 48 hours after the first step-up dose and 24 hours after the second",
      why: "The label asks for at least 2 days between the two step-up doses and at least 3 days between the second and the first treatment dose. The EU SmPC gives the same doses (12 mg on day 1 and 32 mg on day 4 of week 1, then 76 mg weekly from week 2) with paracetamol 500 mg, and asks for monitoring for 48 hours after each of the two step-up doses with the patient staying near a healthcare facility.",
      source: "fda-elrexfio",
      quote: "The recommended dosages of ELREXFIO subcutaneous injection are: step-up dose 1 of 12 mg on Day 1, step-up dose 2 of 32 mg on Day 4, followed by the first treatment dose of 76 mg on Day 8, and then 76 mg weekly thereafter through week 24.",
    },
    {
      action: "Linvoseltamab (US label): infuse 5 mg on day 1, 25 mg on day 8 and the first treatment dose of 200 mg on day 15; before each give dexamethasone 40 mg into a vein 1 to 3 hours ahead, and paracetamol 650 to 1,000 mg and diphenhydramine 25 mg 30 to 60 minutes ahead (or equivalents); keep the patient in hospital for 24 hours after each of the two step-up doses",
      why: "Linvoseltamab is given into a vein, the other two under the skin. The EU SmPC gives the same doses in weeks 1, 2 and 3 with paracetamol 500 to 1,000 mg; it asks for monitoring during the infusion and for 24 hours after the first step-up dose, with the patient staying with a carer near the treatment centre, and the same after the second step-up dose for patients who reacted to the first.",
      source: "fda-lynozyfic",
      quote: "Due to the risk of CRS and neurologic toxicity, including ICANS, patients should be hospitalized for 24 hours after administration of the first step-up dose, and for 24 hours after administration of the second step-up dose.",
    },
    {
      action: "Test for CMV at baseline, and give antiviral and Pneumocystis prophylaxis to every patient",
      why: "These drugs suppress the immune system, so the panel asks for infections to be prevented rather than waited for.",
      source: "eu-bcma-2026",
      quote: "Antiviral (e.g., acyclovir) and PJP prophylaxis (e.g., co‐trimoxazole) are mandatory for all patients.",
    },
    {
      action: "Check IgG at baseline and every 4 weeks, and give immunoglobulin replacement if IgG is under 400 mg/dL or infections recur",
      why: "These drugs cause low antibody levels (hypogammaglobulinaemia), which adds to the risk of infection.",
      source: "eu-bcma-2026",
      quote: "Patients with trough IgG < 400 mg/dL should receive IV or SC Ig every 4 weeks and be retested every month until IgG recovers (including after completion of treatment).",
    },
    {
      action: "Do not use G-CSF to correct neutropenia before step-up dosing",
      why: "The panel's stated reason is the risk of CRS; it also agreed that neutropenia caused by high tumour burden raises that risk. Agreement was 79%, among the lowest in the consensus.",
      source: "eu-bcma-2026",
      quote: "Neutropenia (defined as an absolute neutrophil count < 1000/mm3) should not be resolved with G‐CSF prior to SUD due to the risk of CRS.",
    },
    {
      action: "Consider outpatient step-up dosing only for patients with low tumour burden and stable disease, ECOG 0 to 2, and no neurological symptoms or active infection",
      why: "The panel agreed that outpatient step-up dosing is feasible only when strict patient, carer and centre conditions are met.",
      source: "eu-bcma-2026",
      quote: "Outpatient SUD should only be considered for patients with low tumor burden (where high tumor burden is defined as BMPCs ≥ 60%, presence of ≥ 1 focal lesion ≥ 5 mm [bone or soft tissue] on MRI or PET–CT, M‐spike ≥ 30 g/L, LDH > ULN) and stable disease status.",
    },
    {
      action: "For outpatient dosing, require a trained adult carer available day and night during the step-up period and a home within 60 minutes of a centre with haematology or internal medicine expertise and intensive care",
      why: "Someone must notice fever or confusion and get the patient back quickly.",
      source: "eu-bcma-2026",
      quote: "Patients must reside within 60 min (by ambulance, car, etc.) of a treatment center that provides both hematology or internal medicine expertise and ICU‐level care.",
    },
    {
      action: "Where step-up doses are given to outpatients, keep two doses of tocilizumab in a known and accessible place, with access to dexamethasone, high-dose corticosteroids and anakinra",
      why: "CRS and ICANS typically start within 1 to 3 days of a dose and need prompt treatment.",
      source: "eu-bcma-2026",
      quote: "Outpatient SUD centers must have tocilizumab (two doses) available in a known and accessible location.",
    },
    {
      action: "Write standard procedures that set observation times and escalation thresholds using ASTCT and ICE grading",
      why: "Clear triggers mean every nurse escalates at the same point.",
      source: "eu-bcma-2026",
      quote: "SOPs must define observation duration and escalation thresholds for CRS and ICANS, using established grading systems such as ASTCT and ICE.",
    },
    {
      action: "Grade any CRS on the ASTCT scale",
      why: "The ASTCT definition of CRS covers any immune therapy that activates or engages T cells, and the European consensus asks for ASTCT criteria by name.",
      source: "astct-2019",
      quote: "CRS grade is determined by the more severe event: hypotension or hypoxia not attributable to any other cause.",
    },
    {
      action: "Teach patients and carers, in their first language and in writing, the early signs of CRS, ICANS and infection, and give a 24-hour emergency contact",
      why: "Fever, confusion and breathing symptoms are the early signs the panel names; patients and carers need to know how to reach urgent care.",
      source: "eu-bcma-2026",
      quote: "Education on CRS/ICANS must include both verbal explanations and written materials tailored to BCMA‐BsAb toxicities.",
    },
    {
      action: "Transfer care to a community centre only once the full step-up phase is complete and any CRS or ICANS has resolved (or two doses have passed with neither), with the patient afebrile for 24 hours, haemodynamically stable and free of toxicity",
      why: "With teclistamab and elranatamab most CRS happens during step-up dosing; moving care earlier risks it starting away from the team that knows the drug.",
      source: "eu-bcma-2026",
      quote: "Patients must be afebrile (≥ 24 h) and hemodynamically stable before being considered for transition to community care.",
    },
  ],
  bestInClass: {
    statement: "The dose, the days and the premedication come from the product's own current label, and for the three BCMA bispecifics the US and EU labels agree on the step-up doses (the days differ for teclistamab, and some premedication doses differ). Step-up dosing with premedication and close CRS monitoring is common ground: the European Myeloma Network 2023 abstract recommends it, and the 2026 European Delphi paper cites both that report and the IMWG 2024 guideline for it (the IMWG abstract itself gives no detail). Where the patient waits after a step-up dose is not agreed. The US labels say patients should be hospitalised for 24 to 48 hours after each step-up dose; the EU SmPCs say to monitor and have the patient stay near a healthcare facility; the 2026 European Delphi consensus sets criteria for doing it as an outpatient in selected patients (low tumour burden, ECOG 0 to 2, trained carer, within 60 minutes of intensive care, tocilizumab on site). That consensus is the most detailed source read and it was funded by Pfizer, which makes elranatamab. On infection prevention the Delphi panel calls antiviral and Pneumocystis prophylaxis mandatory for all (100% agreement) and says this reflects the IMWG and European Myeloma Network documents; the labels are less firm (the US teclistamab label says to consider antiviral prophylaxis against herpes zoster, the EU elranatamab SmPC that prophylactic antimicrobials and antivirals should be considered according to local guidelines). The IgG threshold of 400 mg/dL for immunoglobulin replacement is the Delphi panel's.",
    sources: ["fda-tecvayli", "fda-elrexfio", "fda-lynozyfic", "ema-tecvayli", "ema-elrexfio", "ema-lynozyfic", "emn-2023", "imwg-2024", "eu-bcma-2026"],
  },
  variants: [
    {
      name: "Inpatient step-up dosing (US labels)",
      differs: "Patients should be hospitalised after step-up doses: teclistamab for 48 hours after each of the two step-up doses, elranatamab for 48 hours after the first and 24 hours after the second, linvoseltamab for 24 hours after each of the two. A 2026 viewpoint says inpatient step-up dosing typically happens in academic centres and can restrict how many patients are treated.",
      evidence: "Label instruction, read in the current US prescribing information on 16 November 2026; the comment on academic centres is the viewpoint authors' own.",
      sources: ["fda-tecvayli", "fda-elrexfio", "fda-lynozyfic", "rpm-2026"],
    },
    {
      name: "Monitoring near a healthcare facility (EU SmPCs)",
      differs: "The SmPCs ask for monitoring for signs and symptoms with the patient staying near a healthcare facility: daily for 48 hours after every dose in the teclistamab step-up schedule, for 48 hours after each of the two elranatamab step-up doses, and for 24 hours after the first linvoseltamab step-up dose with a carer near the treatment centre (and after the second for patients who reacted to the first).",
      evidence: "Label instruction, read in the EU product information on 16 November 2026. The European Delphi consensus builds its outpatient criteria on the SmPCs.",
      sources: ["ema-tecvayli", "ema-elrexfio", "ema-lynozyfic", "eu-bcma-2026"],
    },
    {
      name: "Outpatient step-up dosing with remote monitoring (2026 viewpoint)",
      differs: "Uses remote patient monitoring (wearable devices, patient-reported symptoms on a phone or tablet) to support outpatient step-up dosing in academic and community practices.",
      evidence: "Authors' real-world experience and case examples; not a trial. Medical writing and publication fees were funded by Johnson & Johnson.",
      sources: ["rpm-2026"],
    },
    {
      name: "Other T-cell engaging bispecifics with step-up schedules (US labels)",
      differs: "Talquetamab (myeloma, GPRC5D-directed, under the skin, by weight): 0.01 mg/kg on day 1 and 0.06 mg/kg on day 4, then either a first treatment dose of 0.4 mg/kg on day 7 (weekly schedule) or a third step-up dose of 0.4 mg/kg on day 7 and a first treatment dose of 0.8 mg/kg on day 10 (schedule of every 2 weeks); patients should be hospitalised for 48 hours after all doses in the step-up schedule. Glofitamab (large B-cell lymphoma, into a vein, fixed dose, 21-day cycles): one dose of obinutuzumab 1,000 mg on day 1 of cycle 1, then glofitamab 2.5 mg on day 8, 10 mg on day 15 and 30 mg on day 1 of cycle 2 onwards; patients should be hospitalised during and for 24 hours after the 2.5 mg infusion, and after the 10 mg infusion if the first caused CRS of any grade. Epcoritamab (under the skin, fixed dose, 28-day cycles) differs by lymphoma type: for diffuse large B-cell and high-grade B-cell lymphoma 0.16 mg on day 1, 0.8 mg on day 8 and the first full dose of 48 mg on day 15; for follicular lymphoma, alone or with lenalidomide and rituximab, 0.16 mg on day 1, 0.8 mg on day 8, 3 mg on day 15 and the first full dose of 48 mg on day 22. Its label asks the team to assess whether hospitalisation or outpatient monitoring is appropriate for the first 48 mg dose. Mosunetuzumab given into a vein (follicular lymphoma, fixed dose, 21-day cycles): 1 mg on day 1, 2 mg on day 8 and 60 mg on day 15 of cycle 1, 60 mg on day 1 of cycle 2, then 30 mg; its label sets no routine hospital stay and says to evaluate patients for hospitalisation at the first sign of CRS.",
      evidence: "Label instruction, read in the current US prescribing information on 17 November 2026. These are the US labels only: the EU product information for these four was not read, and the premedication for each is in its label and not set out here.",
      sources: ["fda-talvey", "fda-columvi", "fda-epkinly", "fda-lunsumio"],
    },
    {
      name: "Lymphoma bispecifics (CD3xCD20 consensus, 2024)",
      differs: "An international panel of physicians, advanced practitioners, nurses and pharmacists set recommendations specific to CD3xCD20 bispecifics, noting that the timing, quality and severity of their toxicities differ from CAR T cells.",
      evidence: "Consensus recommendations; abstract read only.",
      sources: ["cd20-2024"],
    },
  ],
  grades: [
    { claim: "Antiviral and Pneumocystis prophylaxis for all patients on BCMA bispecifics", grade: "consensus, 100% agreement", source: "eu-bcma-2026" },
    { claim: "Outpatient step-up dosing only for low tumour burden and stable disease", grade: "consensus, 84% agreement", source: "eu-bcma-2026" },
    { claim: "Live within 60 minutes of a centre with haematology or internal medicine expertise and intensive care", grade: "consensus, 100% agreement", source: "eu-bcma-2026" },
    { claim: "Two doses of tocilizumab on site for outpatient step-up dosing", grade: "consensus, 97% agreement", source: "eu-bcma-2026" },
    { claim: "No G-CSF to correct neutropenia before step-up dosing", grade: "consensus, 79% agreement", source: "eu-bcma-2026" },
    { claim: "No transfer to a community centre before the step-up phase is complete, unless the first two doses passed without CRS or ICANS", grade: "consensus, 90% agreement", source: "eu-bcma-2026", quote: "Patients should not be transitioned unless they have completed the full SUD phase and any occurring CRS or ICANS has resolved, except if they have not had CRS or ICANS with the first two doses." },
    { claim: "Elranatamab, US label: hospital for 48 hours after the first step-up dose and 24 hours after the second", grade: "Label instruction", source: "fda-elrexfio", quote: "Due to the risk of CRS, patients should be hospitalized for 48 hours after administration of the first step-up dose, and for 24 hours after administration of the second step-up dose." },
    { claim: "Talquetamab, US label: hospital for 48 hours after all doses in the step-up schedule", grade: "Label instruction", source: "fda-talvey", quote: "Patients should be hospitalized for 48 hours after all doses within the step-up dosing schedule." },
    { claim: "Glofitamab, US label: hospital during and for 24 hours after the first step-up dose of 2.5 mg", grade: "Label instruction", source: "fda-columvi", quote: "For the first COLUMVI step-up dose (2.5 mg on Cycle 1 Day 8), patients should be hospitalized during and for 24 hours after completion of the COLUMVI infusion." },
    { claim: "Epcoritamab, US label: two step-up doses for diffuse large B-cell lymphoma, three for follicular lymphoma", grade: "Label instruction", source: "fda-epkinly", quote: "The recommended DLBCL dosage for Cycle 1 consists of 2 step-up doses, and the recommended FL dosage (monotherapy or in combination with lenalidomide and rituximab) consists of 3 step-up doses." },
    { claim: "Mosunetuzumab into a vein, US label: start on the step-up schedule", grade: "Label instruction", source: "fda-lunsumio", quote: "Initiate therapy according to LUNSUMIO step-up dosing schedule to reduce the risk of CRS." },
    { claim: "Teclistamab, EU SmPC: near a healthcare facility and monitored daily for 48 hours after every dose in the step-up schedule", grade: "Label instruction", source: "ema-tecvayli", quote: "Due to the risk of cytokine release syndrome, patients should be instructed to remain within proximity of a healthcare facility, and monitored for signs and symptoms daily for 48 hours after administration of all doses within the TECVAYLI step-up dosing schedule (see section 4.4)." },
    { claim: "Elranatamab, EU SmPC: monitored for 48 hours after each of the two step-up doses, near a healthcare facility", grade: "Label instruction", source: "ema-elrexfio", quote: "Due to the risk of CRS and ICANS, patients should be monitored for signs and symptoms for 48 hours after administration of each of the 2 step-up doses and instructed to remain within proximity of a healthcare facility (see section 4.4)." },
    { claim: "Linvoseltamab, EU SmPC: with a carer near the treatment centre for 24 hours after the first step-up dose", grade: "Label instruction", source: "ema-lynozyfic", quote: "Patients should be instructed to remain with a caregiver within close proximity of the qualified treatment centre for 24 hours after the first step-up treatment dose (see section 4.4)." },
  ],
  sources: [
    { key: "eu-bcma-2026", label: "European Recommendations for Transitioning the Care of Patients With Multiple Myeloma Treated With B-Cell Maturation Antigen Bispecific Antibodies From Academic Hospitals to Community-Based Centers and for Outpatient Step-Up Dosing", publisher: "eJHaem (European Delphi panel; funded by Pfizer)", year: 2026, url: "https://europepmc.org/article/PMC/PMC13172755", doi: "10.1002/jha2.70290", gradingScheme: "Modified Delphi: a statement reached consensus at 75% or more agreement among the 38 to 53 haematologists, nurses and pharmacists from six countries who answered each round; the percentage agreeing is printed beside each statement.", read: "full-text", accessed: "2026-11-16" },
    { key: "fda-tecvayli", label: "Tecvayli (teclistamab-cqyv) US prescribing information, DailyMed (Janssen Biotech; SPL version 17, revised March 2026)", publisher: "Janssen Biotech / US FDA (DailyMed)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=54e0f974-ccee-44ea-9254-40e9883cee1e", gradingScheme: "Regulatory labelling; not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "fda-elrexfio", label: "Elrexfio (elranatamab-bcmm) US prescribing information, DailyMed (Pfizer; SPL version 5, revised February 2026)", publisher: "Pfizer / US FDA (DailyMed)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f6fea598-ff58-4a20-b5e8-8a51f37d8beb", gradingScheme: "Regulatory labelling; not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "fda-lynozyfic", label: "Lynozyfic (linvoseltamab-gcpt) US prescribing information, DailyMed (Regeneron; SPL version 6, label of 2 July 2025)", publisher: "Regeneron Pharmaceuticals / US FDA (DailyMed)", year: 2025, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=e9fd0739-1b3f-4b8b-824a-1f0a902384d3", gradingScheme: "Regulatory labelling; not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "fda-talvey", label: "Talvey (talquetamab-tgvs) US prescribing information, DailyMed (Janssen Biotech; SPL version 6, revised October 2025)", publisher: "Janssen Biotech / US FDA (DailyMed)", year: 2025, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=9001355e-003d-4d4e-b4ce-337e0fd14952", gradingScheme: "Regulatory labelling; not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "fda-columvi", label: "Columvi (glofitamab-gxbm) US prescribing information, DailyMed (Genentech; SPL version 9, revised June 2026)", publisher: "Genentech / US FDA (DailyMed)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=3516e753-f064-4d30-9bd5-e3f2e143f75d", gradingScheme: "Regulatory labelling; not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "fda-epkinly", label: "Epkinly (epcoritamab-bysp) US prescribing information, DailyMed (Genmab; SPL version 11, effective June 2026)", publisher: "Genmab US / US FDA (DailyMed)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=d7836711-b677-412d-bf2d-0f7c8444103a", gradingScheme: "Regulatory labelling; not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "fda-lunsumio", label: "Lunsumio (mosunetuzumab-axgb) for intravenous infusion, US prescribing information, DailyMed (Genentech; SPL version 7, effective June 2026)", publisher: "Genentech / US FDA (DailyMed)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=2ef0cf38-101c-4681-98fe-c05dc9ead443", gradingScheme: "Regulatory labelling; not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "ema-tecvayli", label: "Tecvayli summary of product characteristics (EMA EPAR product information; the PDF prints no revision date and its file date is 29 September 2026)", publisher: "European Medicines Agency", year: 2026, url: "https://www.ema.europa.eu/en/documents/product-information/tecvayli-epar-product-information_en.pdf", gradingScheme: "Regulatory labelling; not graded.", read: "full-text", accessed: "2026-11-16" },
    { key: "ema-elrexfio", label: "Elrexfio summary of product characteristics (EMA EPAR product information; the PDF prints no revision date and its file date is 16 January 2026)", publisher: "European Medicines Agency", year: 2026, url: "https://www.ema.europa.eu/en/documents/product-information/elrexfio-epar-product-information_en.pdf", gradingScheme: "Regulatory labelling; not graded.", read: "full-text", accessed: "2026-11-16" },
    { key: "ema-lynozyfic", label: "Lynozyfic summary of product characteristics (EMA EPAR product information; the PDF prints no revision date and its file date is 15 May 2025)", publisher: "European Medicines Agency", year: 2025, url: "https://www.ema.europa.eu/en/documents/product-information/lynozyfic-epar-product-information_en.pdf", gradingScheme: "Regulatory labelling; not graded.", read: "full-text", accessed: "2026-11-16" },
    { key: "emn-2023", label: "Prevention and management of adverse events during treatment with bispecific antibodies and CAR T cells in multiple myeloma: a consensus report of the European Myeloma Network", publisher: "European Myeloma Network, The Lancet Oncology", year: 2023, url: "https://europepmc.org/abstract/MED/37269857", doi: "10.1016/S1470-2045(23)00159-6", read: "abstract", accessed: "2026-11-16" },
    { key: "imwg-2024", label: "International Myeloma Working Group immunotherapy committee consensus guidelines and recommendations for optimal use of T-cell-engaging bispecific antibodies in multiple myeloma", publisher: "International Myeloma Working Group, The Lancet Oncology", year: 2024, url: "https://europepmc.org/abstract/MED/38697166", doi: "10.1016/S1470-2045(24)00043-3", read: "abstract", accessed: "2026-11-16" },
    { key: "cd20-2024", label: "Consensus recommendations on the management of toxicity associated with CD3xCD20 bispecific antibody therapy", publisher: "Blood (international panel)", year: 2024, url: "https://europepmc.org/abstract/MED/38252906", doi: "10.1182/blood.2023022432", read: "abstract", accessed: "2026-11-16" },
    { key: "rpm-2026", label: "Practical Recommendations for Implementing Remote Patient Monitoring for Patients Receiving Bispecific Antibodies for Multiple Myeloma", publisher: "JMIR Cancer (viewpoint; writing support funded by Johnson & Johnson)", year: 2026, url: "https://europepmc.org/article/PMC/PMC13739275", doi: "10.2196/95949", read: "full-text", accessed: "2026-11-16" },
    { ...ASTCT_2019, accessed: "2026-11-16" },
    { ...ASTCT_2026, accessed: "2026-11-16" },
  ],
  upgrades: [],
  gaps: [
    "On 16 November 2026 the current US and EU labels for teclistamab, elranatamab and linvoseltamab were read and their step-up doses, days, premedication and observation periods are given above. Not set out here: the teclistamab schedule in combination with daratumumab, and the labels' tables for restarting after a missed dose and for changing the next dose after CRS or ICANS.",
    "On 17 November 2026 a second reader re-read the teclistamab, elranatamab and linvoseltamab doses against the same labels and found none wrong; the US label versions were confirmed as the latest on DailyMed, but ema.europa.eu answered 429 that day, so the EU PDFs read are the copies saved on 16 November. The same day the current US labels for talquetamab, glofitamab, epcoritamab and mosunetuzumab were read for the first time, and only their step-up doses and hospital instructions are given here. Not read or not set out for these four: the EU product information, the premedication, the restart tables, and the separate US label for mosunetuzumab under the skin (Lunsumio Velo), which the intravenous label says has different dosage and administration instructions.",
    "The EMA product information PDFs print no revision date, so the edition is identified here by the file's own date. Labels change often: check the current label before relying on a dose or an observation period.",
    "The European Delphi paper, citing the 2025 US prescribing information, describes teclistamab as needing hospital admission for 48 hours after each of three step-up doses. The US label read on 16 November 2026 (revised March 2026) asks for admission after the two step-up doses and for daily monitoring near a healthcare facility after the first treatment dose. The 2025 label was not read, so whether the label changed or the paper summarised it loosely is not known.",
    "The IMWG 2024 guideline, the European Myeloma Network 2023 consensus and the CD3xCD20 consensus 2024 were read only as abstracts. On 16 November 2026 the Lancet Oncology pages returned only a redirect page to a script and the Blood page returned 403. Crossref lists two errata to the IMWG guideline (July 2024 and April 2025), which were not read. No newer edition of any of the three was found.",
    "The most detailed source, the 2026 European Delphi consensus, was funded by Pfizer and its panel members were paid honoraria. It cites an earlier European expert panel consensus on outpatient teclistamab and talquetamab (Lund and colleagues, European Journal of Haematology, 2025), which was not read here. The Delphi statements were written for the two BCMA bispecifics given under the skin.",
    "CRS is graded here on the ASTCT 2019 scale. ASTCT published an updated consensus grading in 2026, which could be read only as an abstract that does not say what changed.",
    "None of the sources read reports a randomised comparison of inpatient and outpatient step-up dosing in myeloma; the 2026 viewpoint cites retrospective comparisons and a phase 1 substudy of tarlatamab in lung cancer.",
  ],
  drugs: ["teclistamab", "elranatamab", "linvoseltamab", "talquetamab", "glofitamab", "epcoritamab", "mosunetuzumab", "tocilizumab", "dexamethasone", "human-normal-immunoglobulin", "anakinra"],
  technologies: ["bispecific-antibody"],
  cancers: ["multiple-myeloma"],
  terms: ["crs", "icans", "lymphoma-tx-bispecific-step-up", "lymphoma-tx-immunoglobulin-replacement"],
  related: ["crs-grading-and-management", "icans-grading-and-management"],
  tags: ["protocol", "cell-therapy", "bispecific"],
});
