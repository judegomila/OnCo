import { protocol } from "./helpers";

/*
 * Gadolinium-based contrast for MRI in people with weak kidneys: the risk of nephrogenic systemic fibrosis (NSF) by
 * agent group, whether a kidney blood test is needed, dialysis, repeat doses, pregnancy and breastfeeding.
 *
 * What was read, and how (first on 11 November 2026; every source re-fetched raw and re-read as text in the second
 * accuracy pass on 17 November 2026, each quote checked verbatim by script):
 * - ESUR Contrast Media Safety Committee Guidelines 2026: full text. The PDF linked from esur.org/esur-guidelines-2026/
 *   (uploaded October 2026; its preface is dated November 2025 and calls it the 2025 version), read with pdftotext:
 *   the sections on renal adverse reactions to gadolinium, dialysis, waiting times between injections, prevention of
 *   NSF, the risk classification of agents, pregnancy and lactation, metformin and gadolinium retention, and the
 *   questionnaire for the referring clinician. The handbook prints no grades.
 * - Weinreb et al., Use of Intravenous Gadolinium-Based Contrast Media in Patients With Kidney Disease: Consensus
 *   Statements from the American College of Radiology and the National Kidney Foundation (Kidney Medicine 2021, the
 *   open-access copy of the Radiology paper 10.1148/radiol.2020202903): full text, Europe PMC XML (PMC7873723). The DOI
 *   was resolved through Crossref and Europe PMC and its title checked.
 * - ACR Manual on Contrast Media 2026: not reachable on 11 November; on 17 November the complete PDF linked from the
 *   manual's page downloaded with a plain request and was read with pdftotext: chapter 16 (nephrogenic systemic
 *   fibrosis, 2025 update) with its table 1, the gadolinium pregnancy screening statement, and the gadolinium parts of
 *   the pregnancy and breastfeeding chapters. It moves gadoxetate into group II, leaves group III empty and gives
 *   gadopiclenol a provisional group II place, so the page now carries the 2021 and the 2026 grouping side by side.
 * - NHS, MRI scan (page last reviewed 11 September 2025): read raw, for what a patient is asked before a scan.
 *
 * Corrected in the second pass: orders where the sources say "consider" (waiting times) or "can include" (choice of
 * agent); reasons the sources do not give; the ACR/NKF advice on repeat doses, which differs from ESUR's and was
 * missing; and the group III wording, which the 2026 manual has overtaken. Quotes are copied from the raw text with
 * line breaks joined. Sentences holding the superscript in "1.73 m2" are not used as quotes, because it breaks in the
 * raw text.
 */
export const gadoliniumContrastKidneyImpairment = protocol({
  id: "gadolinium-contrast-kidney-impairment",
  name: "Gadolinium contrast for MRI in kidney impairment: NSF risk by agent group",
  aka: ["gadolinium and kidneys", "MRI contrast and kidney disease", "nephrogenic systemic fibrosis", "NSF", "GBCA", "GBCM", "gadolinium-based contrast agent", "eGFR before MRI", "MRI dye kidneys", "gadolinium dialysis"],
  domain: "screening-diagnostics",
  tldr: "Many MRI scans use a dye containing gadolinium. Some older types could cause a serious scarring disease (nephrogenic systemic fibrosis) in people with very weak kidneys. The types now preferred carry a very low risk, so a scan that is needed should not be refused because of the kidneys. Tell the team if you have kidney problems, have dialysis, or are pregnant or breastfeeding.",
  simple: "MRI scans often use a dye called gadolinium. Some old types could harm people with very weak kidneys. The types preferred now carry a very low risk. Tell the team if you have kidney problems or have dialysis. With these types you do not need extra dialysis after the scan. You can keep breastfeeding.",
  summary: "NSF occurs almost exclusively in people with acute kidney injury or an eGFR below 30 ml/min/1.73 m² (ACR/NKF), particularly below 15 or on dialysis (ESUR), and nearly all unconfounded cases followed three older linear agents: gadodiamide caused most reported cases, with an estimated incidence of 3 to 18% in severe kidney failure (ESUR 2026). The groupings differ by body. ESUR puts the macrocyclic agents (gadobutrol, gadoterate, gadoteridol, gadopiclenol) at lowest risk, the linear agents gadobenate and gadoxetate at intermediate risk (approved by the European Medicines Agency for liver and bile duct imaging only), and gadodiamide, gadopentetate and gadoversetamide at highest risk (intravenous use suspended in Europe, or withdrawn from the European market). ACR/NKF (2021) put gadobenate with the macrocyclic agents in group II (very low risk: no NSF in 4,931 administrations at eGFR below 30; upper 95% confidence bound 0.07%), gadoxetate in group III (limited data, no unconfounded cases) and the old linear agents in group I. The ACR Manual on Contrast Media 2026 has since moved gadoxetate into group II, lists no agent in group III, and gives gadopiclenol a provisional group II place that local practice may treat as group II or group III.\n\nA kidney blood test beforehand is not mandatory for a lowest-risk agent (ESUR) and optional for a group II agent (ACR/NKF, ACR Manual); ACR/NKF call it necessary for a group III agent. ESUR says never to deny a clinically well-indicated enhanced MRI; ACR/NKF say group II contrast should not be withheld or delayed if harm would result. Both say to use the smallest diagnostic dose, and ESUR to record the agent and dose. ACR/NKF: prophylaxis is not indicated, and dialysis should not be started or altered for a group II or III agent, though where medically appropriate the scan is best timed before a regularly scheduled haemodialysis session. ESUR: no immediate dialysis after macrocyclic agents, but in people on haemodialysis an immediate session after a linear agent, repeated on the following two days, while noting there is no evidence that haemodialysis protects against NSF. For elective repeat doses ESUR says to consider waiting optimally 7 days (minimally 60 hours) when eGFR is below 30, optimally 48 hours (minimally 16) at eGFR 30 to 60, optimally 12 hours (minimally 4) without known kidney impairment, and at least 3 dialysis sessions in people on dialysis with no remaining kidney function, with less waiting in an emergency. ACR/NKF say only that, where delay is not medically inappropriate, more than 24 hours or a dialysis session in between may allow greater clearance, and that an urgent repeat dose should not be delayed for fear of NSF. The risk of kidney injury from gadolinium at approved doses is extremely low (ESUR), so metformin needs no special precautions. In pregnancy ESUR allows the smallest possible dose of a macrocyclic agent when there is a very strong indication; ACR says the decision should be made only when potential significant benefit outweighs the unknown risk to the fetus. Breastfeeding may continue normally after macrocyclic agents (ESUR), and ACR says stopping for 24 hours is not required; ESUR says not to give gadolinium to a pregnant or lactating mother with kidney impairment. Gadolinium is retained in the brain after multiple doses, and in bone, liver and skin, with more retained after linear agents; no relevant neurological symptoms have been confirmed (ESUR).",
  asOf: "2026-11-17",
  setting: {
    who: ["radiographer", "doctor", "nurse", "patient-or-carer"],
    where: ["outpatient-clinic", "ward", "emergency-department"],
  },
  population: "Adults and children having intravenous gadolinium-based contrast for MRI, with attention to people with acute kidney injury, an eGFR below 30 ml/min/1.73 m², or on dialysis, and to pregnant and breastfeeding women. Allergy to contrast is a separate protocol; iodinated contrast for CT is in its own protocol.",
  trigger: "A contrast-enhanced MRI is requested.",
  steps: [
    {
      action: "Do not refuse a clinically well-indicated contrast MRI because of kidney function",
      why: "ACR/NKF say the harms of delaying or withholding a group II agent for a clinically indicated MRI may outweigh the risk of NSF.",
      source: "esur-2026",
      quote: "Never deny a patient a clinically well-indicated enhanced MR-examination.",
    },
    {
      action: "Use a group II agent (ACR) for a person at risk of NSF: on dialysis, with acute kidney injury, or with an eGFR below 30",
      why: "Almost all unconfounded cases followed three older linear agents; group II agents have few, if any. ACR/NKF add that waiting for kidney function to recover can also lower the risk. In Europe, ESUR places only the macrocyclic agents at lowest risk.",
      source: "acr-manual-contrast",
      quote: "Group II agents are strongly preferred in patients at risk for NSF.",
    },
    {
      action: "Treat a kidney blood test beforehand as optional for a group II agent (ACR/NKF) or a lowest-risk agent (ESUR: not mandatory); screen kidney function before a group III agent",
      why: "ACR/NKF say the risk of NSF is extremely low for group II agents, even in high-risk patients. When they wrote, gadoxetate was the only group III agent; the ACR Manual 2026 lists it in group II and leaves group III empty.",
      source: "acr-nkf-2021",
      quote: "Kidney function screening is optional for group II GBCM but is necessary for group III GBCM.",
      grade: "Consensus statement (ungraded)",
    },
    {
      action: "Use the smallest dose that gives a diagnostic result and record the agent's name and dose in the notes",
      why: "ESUR says the risk rises with the dose, although NSF has been reported after a single dose.",
      source: "esur-2026",
      quote: "Always record the name and dose of the contrast agent used in the patient records.",
    },
    {
      action: "Tell a person with known acute kidney injury or stage 4 or 5 kidney disease about the potential risk of NSF, why contrast is indicated and whether there are workable alternatives",
      why: "ACR/NKF say these patients should be informed, though written consent is not required. The ACR Manual 2026 does not recommend informed consent before a group II agent and defers to local practice.",
      source: "acr-nkf-2021",
      quote: "Although written documentation of informed consent is not required before administration of group II or group III GBCM, patients with known AKI or known stage 4 or 5 CKD should be informed of the potential risk of NSF associated with GBCM administration, the reason GBCM administration is indicated, and whether there are viable alternative diagnostic strategies.",
      grade: "Consensus statement (ungraded)",
    },
    {
      action: "Do not give prophylaxis against NSF, and do not start or change dialysis because of a group II or III agent",
      why: "ACR/NKF say no prophylaxis is known to reduce the risk, and that dialysis brings risks of catheter placement and infection. For people already on haemodialysis they say the scan is best timed before a regularly scheduled session where medically appropriate.",
      source: "acr-nkf-2021",
      quote: "Dialysis should not be initiated or altered based on group II or group III GBCM administration.",
      grade: "Consensus statement (ungraded)",
    },
    {
      action: "Under ESUR, for a person on haemodialysis given a linear agent (for example a liver-specific agent), arrange an immediate dialysis session and repeat it on the following two days; after a macrocyclic agent no immediate session is needed",
      why: "ESUR notes that dialysis removes gadolinium agents but that there is no evidence it protects against NSF. ACR/NKF differ: they would not alter dialysis for group II or III agents, which include both liver-specific agents.",
      source: "esur-2026",
      quote: "An immediate dialysis session is not needed after macrocyclic gadolinium-based contrast agents but is indicated after linear agents (e.g., liver-specific agents) and needs to be repeated on the following two days.",
    },
    {
      action: "If eGFR is below 30, consider spacing elective contrast MRIs: optimally 7 days apart and minimally 60 hours (ESUR), with less waiting in an emergency",
      why: "ESUR sets the longer interval to allow near complete clearance of the earlier dose. ACR/NKF give a different figure: where delay is not medically inappropriate, more than 24 hours or a dialysis session in between may allow greater clearance, and an urgent repeat dose should not be delayed for fear of NSF.",
      source: "esur-2026",
      quote: "In emergency or life-threatening situations, employ less waiting time between contrast-enhanced MRI with successive gadolinium-based contrast agent administrations.",
    },
    {
      action: "Do not stop metformin for a gadolinium scan",
      why: "ESUR says the risk of kidney injury from gadolinium is extremely low and lactic acidosis has never been reported in this setting.",
      source: "esur-2026",
      quote: "No special precautions are necessary when diabetic patients on metformin are given gadolinium-based contrast agents as the risk of CA-AKI is extremely low and lactic acidosis has never been reported in this scenario.",
    },
    {
      action: "In pregnancy give gadolinium only when there is a very strong indication, as the smallest possible dose of a macrocyclic agent; under ESUR do not give it to a pregnant or breastfeeding woman with kidney impairment",
      why: "ACR says the risk to the unborn baby is unknown, so contrast is given only when the potential benefit outweighs it.",
      source: "esur-2026",
      quote: "When there is a very strong indication for enhanced MRI, the smallest possible dose of a macrocyclic gadolinium contrast agent may be given to the pregnant female.",
    },
    {
      action: "Tell breastfeeding mothers they can carry on normally after a macrocyclic agent",
      why: "ACR estimates that under 0.0004% of the dose is excreted into breast milk and absorbed by the baby's gut. ESUR says discarding milk for 24 hours is not considered necessary, though the mother can discuss with the doctor whether she wishes to.",
      source: "esur-2026",
      quote: "Breast feeding may be continued normally when macrocyclic gadolinium-based contrast agents are given to the mother.",
    },
  ],
  bestInClass: {
    statement: "Use a lowest-risk agent (ESUR: macrocyclic; ACR: group II) at the smallest diagnostic dose, do not deny a clinically well-indicated contrast MRI on kidney grounds (ESUR) or withhold or delay group II contrast if harm would result (ACR/NKF), treat an eGFR beforehand as not mandatory (ESUR 2026) or optional (ACR/NKF 2021) for these agents, and give no prophylaxis. The bodies disagree on three points. Gadobenate (MultiHance) is a group II agent for ACR but an intermediate-risk linear agent in ESUR, approved in Europe for liver and bile duct imaging only; the ACR Manual 2026 also places gadoxetate in group II. In haemodialysis patients ESUR asks for an immediate dialysis session after a linear agent, repeated on the following two days, while ACR/NKF say dialysis should not be started or altered for group II or III agents. For elective repeat doses when eGFR is below 30, ESUR says to consider waiting optimally 7 days and minimally 60 hours, while ACR/NKF say more than 24 hours or a dialysis session in between may allow greater clearance. None of the three grades these statements.",
    sources: ["esur-2026", "acr-nkf-2021", "acr-manual-contrast"],
  },
  variants: [
    {
      name: "Kidney blood test for every contrast MRI",
      differs: "The United States Food and Drug Administration's 2010 boxed warning recommended kidney function screening before any gadolinium agent, as ACR/NKF report; the ACR Manual 2026 notes that its own advice is less stringent than the drug labelling and that institutions may choose to follow the labelling.",
      evidence: "ESUR 2026 states testing is not mandatory for lowest-risk agents; ACR/NKF make it optional for group II and necessary for group III. Earlier guidance is compared in ACR/NKF table 3: ACR 2018 was similar, and KDIGO 2013 did not address it but implied screening for all agents.",
      sources: ["esur-2026", "acr-nkf-2021", "acr-manual-contrast"],
    },
    {
      name: "Dialysis after gadolinium in people already on dialysis (KDIGO and the earlier ACR position)",
      differs: "KDIGO (2013), as summarised by ACR/NKF, performs dialysis immediately after gadolinium and possibly again 24 hours later; the 2018 ACR manual gave gadolinium as soon as possible before dialysis and did not recommend repeated sessions. ACR/NKF 2021 say not to start or alter dialysis for group II or III agents; ESUR keeps dialysis after linear agents only.",
      evidence: "ACR/NKF: a reduction in the risk of NSF from dialysis is only theoretical and has not been shown in randomised trials; ESUR says there is no evidence that haemodialysis protects against NSF.",
      sources: ["acr-nkf-2021", "esur-2026"],
    },
    {
      name: "Avoiding gadolinium below eGFR 15 (KDIGO 2013 as summarised by ACR/NKF)",
      differs: "Macrocyclic agents are recommended if eGFR is below 30, gadolinium is avoided if eGFR is below 15 unless there is no alternative, and macrocyclic versus linear structure is the dividing line rather than ACR groups.",
      evidence: "Stated in ACR/NKF table 3 as the historical KDIGO position; KDIGO was not read directly.",
      sources: ["acr-nkf-2021"],
    },
  ],
  grades: [
    { claim: "Group II contrast is not withheld or delayed if harm would result", grade: "Consensus statement (ungraded)", source: "acr-nkf-2021", quote: "Group II GBCM should not be withheld or delayed if harm would result from not proceeding with an indicated contrast-enhanced MRI." },
    { claim: "No prophylaxis for NSF", grade: "Consensus statement (ungraded)", source: "acr-nkf-2021", quote: "Prophylaxis is not indicated for the prevention of NSF." },
    { claim: "Recommendations unchanged for chemotherapy, nephrotoxic drugs or same-day contrast CT", grade: "Consensus statement (ungraded)", source: "acr-nkf-2021", quote: "The above recommendations should not be altered in patients receiving nephrotoxic medications, chemotherapy, or contrast-enhanced CT." },
    { claim: "Kidney test not mandatory for lowest-risk agents", grade: "ungraded (handbook)", source: "esur-2026", quote: "Laboratory testing of renal function (eGFR) prior to contrast agent use is not mandatory." },
    { claim: "No gadolinium in a pregnant or breastfeeding woman with kidney impairment", grade: "ungraded (handbook)", source: "esur-2026", quote: "Do not administer gadolinium-based contrast agents." },
    { claim: "Stopping breastfeeding for 24 hours after gadolinium is not required", grade: "Strength of Evidence: Limited", source: "acr-manual-contrast", quote: "Therefore, stopping breastfeeding for 24 hours after maternal IV or IA exposure to gadolinium based contrast material is not required." },
  ],
  sources: [
    {
      key: "esur-2026",
      label: "Contrast Media Safety Committee Guidelines 2026 (successor to ESUR Guidelines on Contrast Agents 10.0)",
      publisher: "European Society of Urogenital Radiology (ESUR) Contrast Media Safety Committee",
      year: 2026,
      url: "https://www.esur.org/wp-content/uploads/2026/10/Guidelines-2026.pdf",
      gradingScheme: "The handbook prints no grades.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "acr-nkf-2021",
      label: "Use of Intravenous Gadolinium-Based Contrast Media in Patients With Kidney Disease: Consensus Statements from the American College of Radiology and the National Kidney Foundation",
      publisher: "American College of Radiology and National Kidney Foundation (Weinreb et al., Kidney Medicine; also published in Radiology, 10.1148/radiol.2020202903)",
      year: 2021,
      url: "https://doi.org/10.1016/j.xkme.2020.10.001",
      doi: "10.1016/j.xkme.2020.10.001",
      gradingScheme: "Consensus statements without formal grades.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "acr-manual-contrast",
      label: "ACR Manual on Contrast Media 2026 (chapter 16, Nephrogenic Systemic Fibrosis, 2025 update; pregnancy and breastfeeding chapters)",
      publisher: "American College of Radiology Committee on Drugs and Contrast Media",
      year: 2026,
      url: "https://www.acr.org/clinical-resources/clinical-tools-and-reference/contrast-manual",
      gradingScheme: "The NSF chapter prints no grades. The breastfeeding chapter gives each recommendation a strength of evidence using the ACR Appropriateness Criteria methodology; it prints \"Limited\" for gadolinium.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "nhs-mri-scan",
      label: "MRI scan (page last reviewed 11 September 2025)",
      publisher: "NHS",
      year: 2025,
      url: "https://www.nhs.uk/tests-and-treatments/mri-scan/",
      gradingScheme: "Patient information; no grades.",
      read: "full-text",
      accessed: "2026-11-17",
    },
  ],
  technologies: ["gadolinium-based-contrast-agents", "mri"],
  drugs: ["gadobutrol", "gadoterate-meglumine", "gadoteridol", "gadopiclenol", "gadobenate-dimeglumine", "gadoxetate-disodium", "gadodiamide"],
  related: ["iodinated-contrast-kidney-and-metformin", "contrast-reaction-history-and-premedication", "mri-safety-screening-implants"],
  upgrades: ["idea-pu-no-fasting-before-contrast"],
  gaps: [
    "The ACR Manual on Contrast Media could not be read on 11 November 2026. On 17 November 2026 its 2026 edition was read as a PDF. It changes the American grouping printed in the 2021 ACR/NKF paper: gadoxetate moved from group III to group II in 2024, no agent is now in group III, and gadopiclenol is group II on a provisional basis, because long-term data in people with eGFR below 30 are less well established than for the other group II agents. The ACR/NKF statements about group III agents therefore apply today only where a practice chooses to treat gadopiclenol as group III.",
    "The dose-related risk of NSF for group II and III agents is unknown (ACR/NKF). Their risk estimate for stage 5 kidney disease, on dialysis or not, rests on 2,581 exposed people with no cases, and they say NSF may rarely occur in this group.",
    "ACR/NKF say the risk of multiple closely spaced doses has not been evaluated in people with eGFR below 30. ESUR's waiting times and the ACR/NKF figure of more than 24 hours differ, and neither source cites a trial for its interval.",
    "The clinical significance of gadolinium retained in the brain after repeated doses is not yet known (ESUR 2026); all studies have been retrospective. This matters for people with cancer having many surveillance MRIs, and no source read sets a cumulative limit.",
    "Neither ESUR nor ACR/NKF grades its recommendations; the ACR Manual grades only its breastfeeding advice.",
    "KDIGO's 2013 position is shown only as ACR/NKF summarise it; KDIGO was not read.",
    "No source read tells patients in so many words to report kidney disease or dialysis. The NHS page says the form before an MRI asks about kidney problems, pregnancy and breastfeeding, and the ESUR questionnaire for the referring clinician asks about ongoing dialysis; the advice in the summary at the top rests on those.",
    "The ESUR handbook says its guidelines are now updated annually; the 2026 file is the one linked from esur.org on 17 November 2026, and its preface calls it the 2025 version.",
  ],
});
