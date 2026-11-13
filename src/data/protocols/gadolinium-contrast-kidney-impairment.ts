import { protocol } from "./helpers";

/*
 * Gadolinium-based contrast for MRI in people with weak kidneys: the risk of nephrogenic systemic fibrosis (NSF) by
 * agent group, whether a kidney blood test is needed, dialysis, repeat doses, pregnancy and breastfeeding.
 *
 * What was read, and how (11 November 2026, fetched raw into a scratch directory and read as text):
 * - ESUR Contrast Media Safety Committee Guidelines 2026: full text. The PDF linked from esur.org/esur-guidelines-2026/
 *   (uploaded October 2026, preface dated November 2025), read with pdftotext: the sections on renal adverse
 *   reactions to gadolinium, dialysis, waiting times between injections, prevention of NSF, the risk classification of
 *   agents, pregnancy and lactation, metformin and gadolinium retention. The handbook prints no grades.
 * - Weinreb et al., Use of Intravenous Gadolinium-Based Contrast Media in Patients With Kidney Disease: Consensus
 *   Statements from the American College of Radiology and the National Kidney Foundation (Kidney Medicine 2021, the
 *   open-access copy of the Radiology paper 10.1148/radiol.2020202903): full text, Europe PMC XML (PMC7873723).
 * - ACR Manual on Contrast Media: not reachable (its address served a JavaScript shell to a script when the first
 *   agent of this round tried it); its later group II additions, including gadopiclenol, are therefore not on this
 *   page.
 *
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied from the raw text with line breaks
 * joined. The superscript in "1.73 m2" breaks in the raw text, so quotes stop before it where it would fall.
 */
export const gadoliniumContrastKidneyImpairment = protocol({
  id: "gadolinium-contrast-kidney-impairment",
  name: "Gadolinium contrast for MRI in kidney impairment: NSF risk by agent group",
  aka: ["gadolinium and kidneys", "MRI contrast and kidney disease", "nephrogenic systemic fibrosis", "NSF", "GBCA", "GBCM", "gadolinium-based contrast agent", "eGFR before MRI", "MRI dye kidneys", "gadolinium dialysis"],
  domain: "screening-diagnostics",
  tldr: "Many MRI scans for cancer use a dye containing gadolinium. Older types could cause a rare, serious scarring disease (nephrogenic systemic fibrosis) in people with very weak kidneys. The types used for most scans today carry a very low risk, so an important scan should not be refused because of the kidneys. Tell the team if you have kidney disease, are on dialysis, or are pregnant or breastfeeding.",
  simple: "MRI scans often use a dye called gadolinium. Old types could harm people with very weak kidneys. Today's types are much safer. Tell the team if you have kidney problems or have dialysis. You do not usually need extra dialysis after the scan. You can keep breastfeeding.",
  summary: "NSF occurs almost only in people with acute kidney injury or an eGFR below 30 ml/min/1.73 m², above all below 15 or on dialysis, and was linked mainly to linear agents: gadodiamide caused most cases, with an estimated incidence of 3 to 18% in severe kidney failure (ESUR 2026). The groupings differ by body. ESUR puts the macrocyclic agents (gadobutrol, gadoterate, gadoteridol, gadopiclenol) at lowest risk, the linear liver-specific agents gadobenate and gadoxetate at intermediate risk and approved in Europe for liver imaging only, and gadodiamide, gadopentetate and gadoversetamide at highest risk, now suspended or withdrawn for intravenous use in Europe. ACR/NKF (2021) put gadobenate with the macrocyclic agents in group II (very low risk: no NSF in 4,931 administrations at eGFR below 30; upper 95% bound 0.07%), gadoxetate in group III (limited data, no unconfounded cases) and the old linear agents in group I.\n\nFor lowest-risk or group II agents a kidney blood test beforehand is not mandatory (ESUR) or optional (ACR/NKF); ACR/NKF require it for group III. A clinically indicated scan is never denied (ESUR) and group II contrast is not withheld if harm would follow (ACR/NKF). Use the smallest diagnostic dose and record the agent and dose. No drug prophylaxis prevents NSF. Dialysis is not started or changed for group II or III agents (ACR/NKF); ESUR needs no immediate dialysis after macrocyclic agents but does after linear agents in haemodialysis patients, repeated on the next two days. ESUR suggests waiting between elective gadolinium MRIs: 7 days optimally (60 hours minimum) when eGFR is below 30, 48 hours (16 minimum) at 30 to 60. Gadolinium is not a meaningful kidney toxin at approved doses, so metformin needs no change. In pregnancy the smallest dose of a macrocyclic agent may be given when there is a very strong indication; breastfeeding continues normally after macrocyclic agents; ESUR advises no gadolinium in a pregnant or breastfeeding woman with kidney impairment. Gadolinium is retained in brain and body after repeated doses, most after linear agents, with no confirmed neurological symptoms.",
  asOf: "2026-11-11",
  setting: {
    who: ["radiographer", "doctor", "nurse", "patient-or-carer"],
    where: ["outpatient-clinic", "ward", "emergency-department"],
  },
  population: "Adults and children having intravenous gadolinium-based contrast for MRI, with attention to people with acute kidney injury, an eGFR below 30 ml/min/1.73 m², or on dialysis, and to pregnant and breastfeeding women. Allergy to contrast is a separate protocol; iodinated contrast for CT is in its own protocol.",
  trigger: "A contrast-enhanced MRI is requested.",
  steps: [
    {
      action: "Do not refuse a clinically well-indicated contrast MRI because of kidney function",
      why: "With today's agents the risk to the kidneys and skin is very low, and a missed diagnosis can be the bigger harm.",
      source: "esur-2026",
      quote: "Never deny a patient a clinically well-indicated enhanced MR-examination.",
    },
    {
      action: "Choose a lowest-risk agent (macrocyclic in Europe; ACR group II in the United States) for anyone with eGFR below 30, acute kidney injury or dialysis, keeping the liver-specific agents for liver imaging",
      why: "The NSF cases came almost all from older linear agents; the newer, more stable agents have very few or none.",
      source: "acr-nkf-2021",
      quote: "The risk of NSF is very low for a standard dose (0.1 mmol/kg) of group II GBCM, even in patients with eGFR <30 mL/min per 1.73 m 2 or AKI.",
      grade: "Consensus statement (ungraded)",
    },
    {
      action: "For a lowest-risk or group II agent, a kidney blood test beforehand is not required; check kidney function first for a group III (gadoxetate) agent",
      why: "A routine blood test adds delay without changing what happens when the agent is very low risk.",
      source: "acr-nkf-2021",
      quote: "Kidney function screening is optional for group II GBCM but is necessary for group III GBCM.",
      grade: "Consensus statement (ungraded)",
    },
    {
      action: "Use the smallest dose that gives a diagnostic result and record the agent's name and dose in the notes",
      why: "Risk rises with dose, and a record lets later teams know exactly what was given.",
      source: "esur-2026",
      quote: "Always record the name and dose of the contrast agent used in the patient records.",
    },
    {
      action: "Tell a person with acute kidney injury or stage 4 or 5 kidney disease about the small risk of NSF, why contrast is needed and the alternatives",
      why: "They are the people in whom the risk is real, even if small, and the choice is shared.",
      source: "acr-nkf-2021",
      quote: "Although written documentation of informed consent is not required before administration of group II or group III GBCM, patients with known AKI or known stage 4 or 5 CKD should be informed of the potential risk of NSF associated with GBCM administration, the reason GBCM administration is indicated, and whether there are viable alternative diagnostic strategies.",
      grade: "Consensus statement (ungraded)",
    },
    {
      action: "Do not give any drug or extra dialysis to prevent NSF; do not start or change dialysis because of a group II or III agent",
      why: "No preventive treatment has been shown to work, and starting dialysis has its own risks.",
      source: "acr-nkf-2021",
      quote: "Dialysis should not be initiated or altered based on group II or group III GBCM administration.",
      grade: "Consensus statement (ungraded)",
    },
    {
      action: "In a person on haemodialysis given a linear agent (for example a liver-specific agent), arrange dialysis straight after and on the next two days; after a macrocyclic agent no immediate session is needed",
      why: "Linear agents release gadolinium more easily, and dialysis is the only way to clear them when the kidneys do not.",
      source: "esur-2026",
      quote: "An immediate dialysis session is not needed after macrocyclic gadolinium-based contrast agents but is indicated after linear agents (e.g., liver-specific agents) and needs to be repeated on the following two days.",
    },
    {
      action: "If eGFR is below 30, space elective contrast MRIs: ideally 7 days apart and at least 60 hours, unless the situation is urgent",
      why: "Weak kidneys take days to clear the dye, and a second dose before the first has gone adds to the body's load.",
      source: "esur-2026",
      quote: "In emergency or life-threatening situations, employ less waiting time between contrast- enhanced MRI with successive gadolinium-based contrast agent administrations.",
    },
    {
      action: "Do not stop metformin for a gadolinium scan",
      why: "Gadolinium at approved doses does not injure the kidneys in a way that makes metformin dangerous.",
      source: "esur-2026",
      quote: "No special precautions are necessary when diabetic patients on metformin are given gadolinium-based contrast agents as the risk of CA-AKI is extremely low and lactic acidosis has never been reported in this scenario.",
    },
    {
      action: "In pregnancy give gadolinium only for a very strong indication, as the smallest dose of a macrocyclic agent; do not give it to a pregnant or breastfeeding woman with kidney impairment",
      why: "The dye crosses to the baby, so it is kept for scans that are truly needed; with weak kidneys the mother clears it slowly.",
      source: "esur-2026",
      quote: "When there is a very strong indication for enhanced MRI, the smallest possible dose of a macrocyclic gadolinium contrast agent may be given to the pregnant female.",
    },
    {
      action: "Tell breastfeeding mothers they can carry on normally after a macrocyclic agent",
      why: "Only a tiny amount reaches breast milk and less still is absorbed by the baby.",
      source: "esur-2026",
      quote: "Breast feeding may be continued normally when macrocyclic gadolinium-based contrast agents are given to the mother.",
    },
  ],
  bestInClass: {
    statement: "Use a lowest-risk agent (ESUR: macrocyclic; ACR/NKF: group II) at the smallest diagnostic dose, never deny or delay an indicated contrast MRI on kidney grounds, do not require an eGFR beforehand for these agents (ESUR 2026: not mandatory; ACR/NKF 2021: optional), and do not give prophylaxis or alter dialysis. The two bodies disagree on two points. Gadobenate (MultiHance) is a lowest-risk group II agent for ACR/NKF but an intermediate-risk linear agent in ESUR, approved in Europe for liver imaging only. In haemodialysis patients ESUR still arranges dialysis after linear agents, on three consecutive days, while ACR/NKF say dialysis should not be started or changed for group II or III agents. Neither body grades its statements.",
    sources: ["esur-2026", "acr-nkf-2021"],
  },
  variants: [
    {
      name: "Kidney blood test for every contrast MRI",
      differs: "Some departments still require an eGFR before any gadolinium.",
      evidence: "ESUR 2026 states testing is not mandatory for lowest-risk agents; ACR/NKF make it optional for group II and necessary for group III. Earlier guidance (ACR 2018, KDIGO 2013) is compared in ACR/NKF table 3.",
      sources: ["esur-2026", "acr-nkf-2021"],
    },
    {
      name: "Dialysis after gadolinium in people already on dialysis (KDIGO and the earlier ACR position)",
      differs: "KDIGO (2013), as summarised by ACR/NKF, performs dialysis immediately after gadolinium and possibly again at 24 hours; the 2018 ACR manual gave gadolinium as soon as possible before a scheduled dialysis session. ACR/NKF 2021 say not to start or alter dialysis for group II or III agents; ESUR keeps dialysis after linear agents only.",
      evidence: "ACR/NKF: no evidence that dialysis prevents NSF; ESUR agrees that haemodialysis has not been shown to protect against NSF.",
      sources: ["acr-nkf-2021", "esur-2026"],
    },
    {
      name: "Avoiding gadolinium below eGFR 15 (KDIGO 2013 as summarised by ACR/NKF)",
      differs: "Avoid gadolinium if eGFR is below 15 unless there is no alternative, and treat macrocyclic versus linear structure as the dividing line rather than ACR groups.",
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
      accessed: "2026-11-11",
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
      accessed: "2026-11-11",
    },
    {
      key: "acr-manual-contrast",
      label: "ACR Manual on Contrast Media",
      publisher: "American College of Radiology",
      year: 2024,
      url: "https://www.acr.org/Clinical-Resources/Contrast-Manual",
      read: "not-reachable",
      accessed: "2026-11-11",
    },
  ],
  technologies: ["gadolinium-based-contrast-agents", "mri"],
  drugs: ["gadobutrol", "gadoterate-meglumine", "gadoteridol", "gadopiclenol", "gadobenate-dimeglumine", "gadoxetate-disodium", "gadodiamide"],
  related: ["iodinated-contrast-kidney-and-metformin", "contrast-reaction-history-and-premedication", "mri-safety-screening-implants"],
  upgrades: ["idea-pu-no-fasting-before-contrast"],
  gaps: [
    "The ACR Manual on Contrast Media could not be read; ACR's current grouping is taken from the 2021 ACR/NKF paper, which predates gadopiclenol and so does not place it. ESUR 2026 places gadopiclenol at lowest risk.",
    "The dose-related risk of NSF for group II and III agents is unknown (ACR/NKF), and the absolute risk below eGFR 15 or on dialysis rests on observational cohorts with small numbers of exposed patients.",
    "The clinical significance of gadolinium retained in the brain and body after repeated doses is not known (ESUR 2026); all studies have been retrospective. This matters for people with cancer having many surveillance MRIs, and no source read sets a cumulative limit.",
    "Neither source grades its recommendations.",
    "KDIGO's 2013 position is shown only as ACR/NKF summarise it; KDIGO was not read.",
  ],
});
