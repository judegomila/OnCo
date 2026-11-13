import type { EntityInput, IdeaInput } from "@/lib/schema";
import type { EvidenceGrade } from "@/lib/complementary";

/*
 * Protocol upgrades found while writing the pharmacy dosing and vascular access protocols (protocol fill round, second
 * agent, 11 November 2026). Same shape and tiers as protocol-upgrades-administration.ts:
 *   upgrade:promising  some clinical evidence, not yet settled;
 *   upgrade:untested   plausible or already in use, with the study that would settle it named in `test`.
 * Every statement below was read in the source beside it (full text unless marked abstract), and every DOI was resolved
 * through Europe PMC. Adoption is not stated where no survey measured it.
 */

const asOf = "2026-11-11";
const doi = (label: string, d: string) => ({ label, url: `https://doi.org/${d}` });

type Tier = "proven-unevenly-used" | "promising" | "untested";
const T = (tier: Tier, grade: EvidenceGrade, extra: string[] = []) => ["protocol-upgrade", `upgrade:${tier}`, `evidence:${grade}`, ...extra];
const idea = (x: Omit<IdeaInput, "kind" | "asOf">): IdeaInput => ({ kind: "idea", asOf, ...x });

const ADDIKD_PART1 = doi("Sandhu et al., Aligning kidney function assessment in patients with cancer to global practices in internal medicine (ADDIKD Part 1, eClinicalMedicine 2025)", "10.1016/j.eclinm.2025.103102");
const ADDIKD_INTEGRATION = doi("Sandhu et al., Integrating International Consensus Guidelines for Anticancer Drug Dosing in Kidney Dysfunction (ADDIKD) into everyday practice (eClinicalMedicine 2025)", "10.1016/j.eclinm.2025.103161");
const JANOWITZ_2017 = doi("Janowitz et al., New Model for Estimating Glomerular Filtration Rate in Patients With Cancer (J Clin Oncol 2017; abstract read)", "10.1200/JCO.2017.72.7578");
const SAKAKIDA_2025 = doi("Sakakida et al., Midline catheter use for cancer patients receiving 5-FU chemotherapy (Oncologist 2025; abstract read)", "10.1093/oncolo/oyaf108");
const JSCN_2024 = doi("JSCN/JSMO/JASPO multidisciplinary clinical practice guidelines for the management of extravasation of anticancer drugs (ESMO Open 2024)", "10.1016/j.esmoop.2024.103932");
const PUSHPARAJ_2026 = doi("Pushparaj et al., Minimizing discard volume to 2 ml before blood sampling from a central venous catheter (Acute Crit Care 2026; abstract read)", "10.4266/acc.000792");
// The four sources below are the implanted port protocol's own (src/data/protocols/implanted-port-access-and-care.ts),
// read there in full on 11 November 2026; nothing in the mask idea rests on anything else.
const MANITOBA_P02_2 = { label: "Shared Health Manitoba, P02.2: Medication and fluid administration by subcutaneous port (clinical procedure, version 2025-05-20)", url: "https://healthproviders.sharedhealthmb.ca/download/924/p-standard-clinical-procedures/42744/p02-2-medication-fluid-administration-by-subcutaneous-port.pdf" };
const CDC_HICPAC_2011 = { label: "CDC/HICPAC, Guidelines for the Prevention of Intravascular Catheter-Related Infections, 2011 (last update October 2017)", url: "https://www.cdc.gov/infection-control/media/pdfs/Guideline-BSI-H.pdf" };
const SHEA_2022 = doi("SHEA, IDSA and APIC, Strategies to prevent central line-associated bloodstream infections in acute-care hospitals: 2022 update (Infect Control Hosp Epidemiol 2022)", "10.1017/ice.2022.87");
const EPIC3 = doi("Loveday et al., epic3: national evidence-based guidelines for preventing healthcare-associated infections in NHS hospitals in England (J Hosp Infect 2014)", "10.1016/S0195-6701(13)60012-2");

const ideas: IdeaInput[] = [
  idea({ id: "idea-upgrade-carboplatin-gfr-estimate-outcome-study", name: "Compare carboplatin dosed by BSA-adjusted CKD-EPI eGFR with Cockcroft-Gault on toxicity and response", maturity: "early-clinical", actor: "research", cost: "medium", horizonYears: 3,
    sections: ["chemotherapy"], tags: T("promising", "moderate"),
    tldr: "Carboplatin doses depend on an estimate of kidney function. The 2025 international guideline (ADDIKD) recommends a newer estimate (BSA-adjusted CKD-EPI) over the old Cockcroft-Gault formula when kidney function cannot be measured directly, because it is more accurate. No study has yet shown that switching changes side effects or how well treatment works.",
    summary: "The recommendation. ADDIKD (2025) recommends BSA-adjusted eGFR CKD-EPI as an alternative to measured GFR in the Calvert formula, on clinical consensus with a strong recommendation, and calls the switch away from creatinine clearance a significant practice change, given the long reliance on creatinine clearance calculated by the Cockcroft-Gault equation. It notes that many prescribing software packages use creatinine clearance by default.\n\nThe evidence. In 2,471 patients at Cambridge, BSA-adjusted CKD-EPI was the most accurate published estimate against measured GFR, and Cockcroft-Gault gave a dose more than 20% off in 25.5% of patients against 18.6% (Janowitz 2017, abstract). These are dose-accuracy outcomes; ADDIKD's own outstanding questions add that cystatin C-based equations may be more accurate where eGFR is unreliable.",
    hypothesis: "Carboplatin dosed with BSA-adjusted CKD-EPI eGFR produces fewer grade 3 or 4 thrombocytopenias and dose delays than dosing with Cockcroft-Gault, with no loss of response.",
    rationale: "A guideline-driven change to the dose of one of the most used cytotoxics should be followed by a measure of what it does to patients, not only to the arithmetic.",
    test: "A before-and-after or stepped-wedge study across centres adopting ADDIKD, or a randomised comparison within a trial network, recording platelet nadirs, dose delays and reductions, and response, with measured GFR in a subset to calibrate.",
    drugs: ["carboplatin"], technologies: ["carboplatin-calvert-dosing"], bottlenecks: ["b-dose-optimisation"],
    links: [ADDIKD_PART1, ADDIKD_INTEGRATION, JANOWITZ_2017] }),

  idea({ id: "idea-upgrade-midline-vesicant-safety-study", name: "Find out whether vesicant and irritant chemotherapy can safely run through a midline catheter", maturity: "early-clinical", actor: "research", cost: "small", horizonYears: 3,
    sections: ["chemotherapy"], tags: T("untested", "insufficient"),
    tldr: "Midline catheters, longer drips in the upper arm, carry fewer bloodstream infections than PICCs and are being used for chemotherapy. No guideline read says whether drugs that damage tissue if they leak can safely go through one.",
    summary: "The gap. None of the guidelines read for the midline protocol (CDC 2011, ESMO 2015, the Japanese extravasation guideline 2024) says whether vesicant or irritant chemotherapy may be given through a midline; the INS Standards, which address infusate limits, could not be read. The Japanese extravasation guideline cites a case report of oxaliplatin extravasation from a midline.\n\nThe evidence so far. A prospective Japanese study of 59 patients given continuous fluorouracil through a midline reported no phlebitis and complications in 6.8% (abstract). Whether this extends to vesicants and to irritants such as oxaliplatin has not been studied in any source read.",
    hypothesis: "For continuous or repeated irritant chemotherapy, a midline with its tip in the axillary vein has an extravasation and phlebitis rate no higher than a PICC.",
    rationale: "Midlines avoid a central line's infection and placement burden; if they are safe for more drugs, many people could avoid a PICC, and if they are not, a clear limit would prevent injuries.",
    test: "A prospective registry of midlines used for anticancer drugs, recording drug class, dwell time, extravasation, phlebitis and infection, followed by a randomised comparison with PICCs for irritant infusions if the registry is reassuring.",
    drugs: ["oxaliplatin", "fluorouracil"], technologies: ["infusion-devices-vascular-access", "picc-lines"], terms: ["extravasation-infusion-reaction"], bottlenecks: ["b-toxicity-qol"],
    links: [SAKAKIDA_2025, JSCN_2024] }),

  idea({ id: "idea-upgrade-central-line-discard-volume-in-cancer-outpatients", name: "Test the smallest safe discard volume for blood taken from ports and PICCs in cancer outpatients", maturity: "early-clinical", actor: "clinic", cost: "small", horizonYears: 2,
    sections: ["chemotherapy", "supportive-care"], tags: T("untested", "insufficient"),
    tldr: "When blood is taken from a line, a small amount is usually drawn off and thrown away first. How much is needed has never been set by a guideline that could be read, and the only recent study was in intensive care, not in people with ports having chemotherapy.",
    summary: "The gap. No guideline read for the blood sampling protocol sets a discard volume; the INS Standards, which do, could not be read. An intensive-care study in 105 patients found a 2 ml discard gave results agreeing with venepuncture for electrolytes and blood counts except white cells (abstract), and noted that no consensus exists on the volume. People with cancer have bloods taken from their lines before nearly every cycle.",
    hypothesis: "In outpatients sampled from implanted ports and PICCs after a saline lock, a discard of a set small volume gives blood counts and biochemistry that agree with venepuncture within clinically acceptable limits.",
    rationale: "A volume that is too small gives diluted results that can wrongly delay chemotherapy; one that is too large wastes blood in people who are often anaemic.",
    test: "A paired-sample method-comparison study in chemotherapy day units: venepuncture against line samples after discards of increasing volume, stratified by device, with Bland-Altman agreement for haemoglobin, neutrophils, platelets, creatinine and potassium.",
    technologies: ["implanted-ports", "picc-lines"], terms: ["central-venous-access"], bottlenecks: ["b-toxicity-qol"],
    links: [PUSHPARAJ_2026] }),

  idea({ id: "idea-upgrade-masks-and-head-turn-at-port-access-infection-study", name: "Masks on patient and nurse, and the head turned away, while a port is accessed: a comparison of infection rates", maturity: "early-clinical", actor: "clinic", cost: "medium", horizonYears: 3,
    sections: ["chemotherapy", "supportive-care"], tags: T("untested", "insufficient"),
    tldr: "Some hospitals ask the nurse to wear a mask, put a mask on the patient and ask the patient to turn their head away while a chemotherapy port is accessed. No national guideline read asks for this, and no study of whether it prevents port infections was found. A comparison would settle whether it should be standard or can be dropped.",
    summary: "The practice. Shared Health Manitoba's public clinical procedure for giving medicines and fluids through a port (P02.2, 2025) states: \"Put a procedure mask on. Place a mask on the patient, as well as any other individuals who will remain in the vicinity.\" and \"Have the patient lay supine, and turn their head away from the port.\" It applies to all ages and is written for paramedic practitioners.\n\nWhat the guidelines say. None of the guidelines read for OnCo's implanted port protocol (ESMO 2015, CDC/HICPAC 2011, SHEA/IDSA/APIC 2022, epic3 2014, NICE CG139) recommends a mask on the clinician or the patient, or the patient turning their head away, when a port is accessed, flushed or dressed. CDC/HICPAC asks for a mask as part of maximal sterile barrier precautions when a central line or PICC is inserted (Category IB), and epic3 asks for face masks where blood or body fluid may splash into the face. Whether the INS Infusion Therapy Standards address masks at port access could not be checked, because they could not be read.\n\nWhat is not known. No trial or comparative study of masks or head-turning at port access was found in the sources read, so neither the benefit nor the cost (time, masks, the patient's comfort) has been measured.",
    hypothesis: "Masking the clinician and the patient and turning the patient's head away during port access does not lower port-related bloodstream infection compared with hand hygiene, chlorhexidine skin and hub antisepsis and aseptic technique alone.",
    rationale: "A step that is common in some units and absent from every national guideline read is either a missing recommendation or an unnecessary one. A port is accessed at nearly every treatment, so either answer matters: a protective step should be everywhere, and an unnecessary one costs time and comfort at every visit.",
    test: "A cluster-randomised or stepped-wedge comparison across chemotherapy day units, both arms using the guideline bundle (hand hygiene, chlorhexidine in alcohol on skin and hub, aseptic technique) and one adding masks for clinician and patient with the head turned away; primary outcome port-related bloodstream infection per 1,000 port-days, with adherence to the bundle audited in both arms. The size of the comparison depends on the baseline infection rate in the units taking part, which should be measured first, for example through a registry linking port infections to each unit's access procedure.",
    technologies: ["implanted-ports", "huber-needles-port-access", "infusion-devices-vascular-access"], terms: ["central-venous-access"], bottlenecks: ["b-toxicity-qol", "b-knowledge-diffusion"],
    related: ["idea-upgrade-central-line-discard-volume-in-cancer-outpatients"],
    links: [MANITOBA_P02_2, CDC_HICPAC_2011, SHEA_2022, EPIC3] }),
];

export const protocolUpgradesPharmacyAccess: EntityInput[] = [...ideas];
