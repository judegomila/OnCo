import { protocol } from "./helpers";

/*
 * Draining an indwelling pleural catheter (IPC) at home, for a malignant pleural effusion.
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - British Thoracic Society Guideline for pleural disease (Roberts et al., Thorax 2023, doi 10.1136/thorax-2022-219784,
 *   the full guideline in the supplement; a shorter print version is doi 10.1136/thorax-2023-220304): full text, the PDF
 *   from the BTS document library, read with pdftotext. Recommendations graded Strong or Conditional; good practice
 *   points are ungraded.
 * - BTS Clinical Statement on pleural procedures (Asciak et al., Thorax 2023, doi 10.1136/thorax-2022-219371): full text
 *   from the BTS document library, with online appendix 9 (how to drain an IPC with a vacuum bottle), appendices 1-4
 *   (IPC complications table) and appendix 13 (sample IPC patient information leaflet). The step-by-step boxes in
 *   appendix 9 are images and were not read.
 * - ATS/STS/STR guideline on malignant pleural effusion (2018): abstract only (Europe PMC); the full text is paywalled.
 * - AMPLE-2 (Lancet Respir Med 2018), ASAP (Am J Respir Crit Care Med 2017) and IPC-PLUS (N Engl J Med 2018): abstracts
 *   only, from Europe PMC.
 * Every DOI was resolved through Crossref and Europe PMC and its title checked. Quotes were checked by script against
 * the downloaded text, with soft hyphens removed.
 */
export const indwellingPleuralCatheterDrainageAtHome = protocol({
  id: "indwelling-pleural-catheter-drainage-at-home",
  name: "Indwelling pleural catheter: draining fluid from the chest at home",
  aka: ["IPC drainage", "PleurX drainage at home", "Rocket IPC drainage", "tunnelled pleural catheter care", "home drainage of a malignant pleural effusion", "draining a pleural catheter"],
  domain: "palliative",
  tldr: "An indwelling pleural catheter is a thin tube left in the chest so that fluid caused by cancer can be drained at home, by a nurse, a relative or yourself, using vacuum bottles. Drain as often as your breathing needs, or daily if the aim is for the fluid to stop; slow or stop if it hurts; and call the team for fever, redness, a damaged tube, or worse breathlessness when nothing drains.",
  simple: "The tube stays in your chest. A nurse, a family member or you attach a vacuum bottle to drain the fluid when you are breathless. Stop if it hurts. Call your team if you get a fever, the skin goes red, the tube is damaged, or you get more breathless and nothing comes out.",
  summary: "The BTS pleural guideline (2023) offers people with a malignant pleural effusion and no known non-expandable lung a choice of IPC or pleurodesis first line (conditional), and favours an IPC where more than a quarter of the lung will not re-expand. After insertion every patient should be referred to the community nursing team, and patients and relatives supported to drain and keep a drainage diary (good practice points). Drainage uses the manufacturer's vacuum bottles and procedure; the usual starting frequency is three times a week. Daily drainage raises the rate of spontaneous pleurodesis and shortens time to catheter removal (ASAP: 47% vs 24% with every-other-day drainage; AMPLE-2: 44.2% vs 15.9% at 6 months against symptom-guided drainage) without improving breathlessness, so BTS recommends daily drainage only where removal is a priority (conditional) and tells patients they do not need daily drainage to control breathlessness (strong, by consensus). About 500 mL is usually drained at a time, up to 1500 mL, slowed or stopped for pain or cough. Infection (pleural infection 3.2% to 5%) usually responds to antibiotics without removing the catheter (ATS/STS/STR, weak). Removal is considered after less than 50 mL on three consecutive drainages with no reaccumulation on imaging. Talc instilled through the IPC doubles pleurodesis at 35 days (43% vs 23%, IPC-PLUS) and BTS offers it where removal matters (conditional, by consensus).",
  asOf: "2026-11-11",
  setting: {
    who: ["nurse", "patient-or-carer", "doctor"],
    where: ["home", "community", "outpatient-clinic"],
  },
  population: "Adults with a malignant pleural effusion who have had a tunnelled indwelling pleural catheter (PleurX, Rocket and others) inserted, whether the lung re-expands or not. IPCs for non-malignant (transudative) effusions are not covered: BTS does not in general endorse them. Children are not covered by these sources.",
  trigger: "Discharge home after insertion of an indwelling pleural catheter.",
  steps: [
    {
      action: "Before insertion, offer people without known non-expandable lung a choice between an IPC and pleurodesis, and talk through what living with a tube means",
      why: "Both work for breathlessness; the catheter avoids a hospital stay but stays in the body, which matters to some people.",
      source: "bts-2023",
      quote: "Patients without known non-expandable lung should be offered a choice of indwelling pleural catheter (IPC) or pleurodesis as first-line intervention in the management of MPE.",
      grade: "Conditional",
    },
    {
      action: "On discharge, refer every patient with a new IPC to the community nursing team for an early check of the wound, symptoms and drainage, and removal of sutures",
      why: "Someone needs to check the wound and help with the first drainages at home.",
      source: "bts-2023",
      quote: "All patients who have had an IPC inserted should be referred to the community nursing team on discharge for an early assessment of the wound site, symptom control, support with IPC drainage and removal of sutures.",
      grade: "Good practice point (ungraded)",
    },
    {
      action: "Teach the patient and relatives to drain the catheter and keep a drainage diary if they feel able to",
      why: "Draining at home without waiting for a nurse gives people more independence, and the diary shows when fluid is slowing down.",
      source: "bts-2023",
      quote: "Patients and their relatives should be supported to perform community drainage and complete a drainage diary if they feel able to do so, to promote independence and self-management.",
      grade: "Good practice point (ungraded)",
    },
    {
      action: "Drain with the manufacturer's vacuum bottles and follow the procedure in the drainage pack",
      why: "Each catheter system has its own valve and bottle, and the pack's instructions keep the procedure clean and air-tight.",
      source: "bts-procedures-2023",
      quote: "All manufacturers' drainage packs contain comprehensive procedure guidelines which should be adhered to.",
      grade: "Clinical practice point (ungraded)",
    },
    {
      action: "Agree how often to drain: as breathlessness requires, or daily if the lung re-expands and the aim is for the fluid to stop so the catheter can come out",
      why: "Draining every day makes the lung lining stick together sooner, but it does not make breathing better than draining when needed.",
      source: "bts-procedures-2023",
      quote: "Drainage frequency should be guided by patient symptoms, unless aiming for pleurodesis in those with expansile lungs, in which case IPC drainage should be as frequent as possible (daily) as tolerated by the patient.",
      grade: "Clinical statement (ungraded); see grades for the BTS guideline recommendation",
    },
    {
      action: "Drain about 500 mL at a time, no more than 1500 mL, and slow or stop if there is chest pain or a persistent cough",
      why: "Pain towards the end of drainage often means the lung cannot expand to fill the space, and pulling harder does harm.",
      source: "bts-procedures-2023",
      quote: "Usually around 500 mL are drained, but up to 1500 mL pleural fluid may be drained",
      grade: "Grade C (the 1500 mL ceiling, as cited by the statement); the statement calls the figure arbitrary",
    },
    {
      action: "Keep the exit site clean and dry; shower once the dressing allows, and bath or swim only after both sutures are out, changing a wet dressing promptly",
      why: "The main long-term risk is infection getting in along the tube.",
      source: "bts-procedures-2023",
      quote: "After both sutures are removed, patients can have a bath and swim, although care should be taken to keep the IPC site clean and dry, such as with a waterproof dressing and prompt changing of the dressing should it get wet.",
      grade: "Clinical statement (ungraded)",
    },
    {
      action: "Tell the patient to call the team for increasing chest pain, fever, redness around the catheter or if it seems to have moved",
      why: "These can be signs of infection or a displaced tube, which are treatable if caught early.",
      source: "bts-leaflet-2023",
      quote: "Contact your doctor if you have increasing chest pain, fever or any redness around the IPC, or if you are concerned the IPC has become dislodged.",
      grade: "Patient information (ungraded)",
    },
    {
      action: "Start antibiotics if catheter infection is suspected, refer promptly to the respiratory team if pleural infection is suspected, and do not routinely remove the catheter",
      why: "Most catheter infections clear with antibiotics and the catheter can stay.",
      source: "bts-procedures-2023",
      quote: "Antibiotic therapy should be commenced if IPC-related infection is suspected.",
      grade: "Clinical practice point (ungraded); ATS/STS/STR 2018: weak recommendation to treat with antibiotics and not remove the catheter",
    },
    {
      action: "Seek hospital advice if nothing drains and the patient is more breathless",
      why: "The tube may be blocked or the fluid may have split into pockets, which the team can treat.",
      source: "bts-procedures-2023",
      quote: "Secondary care advice should be sought in the event drainage stops in the presence of worsening breathlessness.",
      grade: "Clinical practice point (ungraded)",
    },
    {
      action: "If the catheter or valve is damaged, clamp it; if it falls out, close the site with adhesive strips and an occlusive dressing and call the respiratory team",
      why: "An open catheter lets air into the chest and fluid out.",
      source: "bts-procedures-2023",
      quote: "In the rare event of damage to the catheter or its valve the catheter should be clamped to avoid air entry to the pleural cavity or leakage of pleural fluid.",
      grade: "Appendix 9 troubleshooting (ungraded)",
    },
    {
      action: "When less than 50 mL drains on three drainages in a row, contact the respiratory team to consider removing the catheter",
      why: "The lining may have sealed itself, and the tube can then come out as a day case.",
      source: "bts-procedures-2023",
      quote: "If the catheter drains less than 50 mL on three consecutive occasions the respiratory team should be contacted for consideration of catheter removal.",
      grade: "Clinical practice point (ungraded)",
    },
    {
      action: "Dispose of the fluid and bottle as local clinical waste rules say; check the rules if the patient is having chemotherapy",
      why: "Body fluids during some cancer drugs can carry drug residues, so some areas collect them as clinical waste.",
      source: "bts-procedures-2023",
      quote: "If the patient is not receiving chemotherapy/immunotherapy the drainage fluid can be disposed of down the toilet and the bottle with the household rubbish.",
      grade: "Appendix 9 (ungraded)",
    },
  ],
  bestInClass: {
    statement: "The BTS guideline for pleural disease (2023) with the BTS clinical statement on pleural procedures (2023) is the most detailed current standard for home IPC care, and agrees with the ATS/STS/STR guideline (2018) that an IPC and pleurodesis are both reasonable first choices, that an IPC is preferred when the lung will not re-expand, and that catheter infections are treated with antibiotics without removing the catheter. The one real choice is drainage frequency: two randomised trials show that daily drainage roughly doubles spontaneous pleurodesis without improving breathlessness, so BTS ties daily drainage to the patient's own priority (removal of the catheter) and says plainly that it is not needed for symptom control.",
    sources: ["bts-2023", "bts-procedures-2023", "ats-2018", "asap-2017", "ample2-2018"],
  },
  variants: [
    {
      name: "Daily (aggressive) drainage",
      differs: "Drains every day from the start, aiming for the pleura to seal and the catheter to come out.",
      evidence: "ASAP: autopleurodesis 47% vs 24% with every-other-day drainage, median 54 vs 90 days, no difference in adverse events or quality of life. AMPLE-2: spontaneous pleurodesis 44.2% vs 15.9% at 6 months against symptom-guided drainage, no difference in breathlessness, better EQ-5D. BTS: conditional recommendation where removal is a priority.",
      sources: ["asap-2017", "ample2-2018", "bts-2023"],
    },
    {
      name: "Symptom-guided drainage",
      differs: "Drains only when breathlessness returns.",
      evidence: "Breathlessness was no worse than with daily drainage in AMPLE-2; fewer drainages and lower cost. BTS: patients should be told they do not need daily drainage to control symptoms (strong, by consensus).",
      sources: ["ample2-2018", "bts-2023"],
    },
    {
      name: "Three times a week (usual UK starting regime) or every other day (ASAP comparator)",
      differs: "A fixed regular schedule between the two.",
      evidence: "BTS clinical statement calls three times a week the usual starting frequency; every-other-day was the standard arm in ASAP and gave less pleurodesis than daily drainage.",
      sources: ["bts-procedures-2023", "asap-2017"],
    },
    {
      name: "Talc through the IPC",
      differs: "Instils 4 g of talc slurry through the catheter as an outpatient once it is clear the lung re-expands.",
      evidence: "IPC-PLUS: pleurodesis at day 35 in 43% with talc vs 23% with placebo, no excess adverse events. BTS 2023: offer where pleurodesis and removal matter to the patient or clinician (conditional, by consensus).",
      sources: ["ipc-plus-2018", "bts-2023"],
    },
    {
      name: "Flutter bag or underwater seal instead of a vacuum bottle",
      differs: "Some NHS trusts use flutter bags for community patients who find vacuum drainage uncomfortable; underwater seal drains are used for inpatients to save cost or to drain an infected effusion.",
      evidence: "Named by the BTS clinical statement (appendix 9) as local practice (Torbay and South Devon NHS Foundation Trust); the licensed method is the manufacturer's vacuum bottle. No comparative evidence was found.",
      sources: ["bts-procedures-2023"],
    },
  ],
  grades: [
    { claim: "Daily drainage where IPC removal is a priority", grade: "Conditional", source: "bts-2023", quote: "Where IPC removal is a priority, daily IPC drainages are recommended to offer increased rates of pleurodesis when compared with less frequent drainages of symptom-guided or alternate drainage regimes." },
    { claim: "Daily drainage is not needed to control breathlessness", grade: "Strong (by consensus)", source: "bts-2023", quote: "Patients should be advised that they do not require daily drainage to control symptoms of breathlessness and chest pain if they wish to opt for a less intensive regime." },
    { claim: "Talc via the IPC where pleurodesis matters", grade: "Conditional (by consensus)", source: "bts-2023", quote: "Instillation of talc via an IPC should be offered to patients with expandable lung where the clinician or patient deems achieving pleurodesis and IPC removal to be important." },
    { claim: "IPC rather than talc when more than 25% of the lung does not re-expand", grade: "Good practice point (ungraded)", source: "bts-2023", quote: "In patients with radiologically significant (>25%) non-expandable lung requiring intervention for a symptomatic MPE, current evidence suggests the use of an IPC rather than talc pleurodesis." },
    { claim: "IPC or pleurodesis for expandable lung; IPC for non-expandable lung; antibiotics without removal for IPC infection", grade: "Weak recommendations (GRADE)", source: "ats-2018", quote: "treating IPC-associated infections with antibiotics and not removing the catheter" },
    { claim: "Consider removal after three low drainages and no reaccumulation", grade: "Clinical statement (ungraded)", source: "bts-procedures-2023", quote: "Consider removal of IPCs when <50 mL are drained on three consecutive occasions and there is an absence of symptoms of fluid reaccumulation and no substantial residual pleural effusion on imaging." },
    { claim: "Infection rate and response to antibiotics", grade: "Complications table (observational studies)", source: "bts-procedures-2023", quote: "IPC related pleural infections carry a 0.29% mortality rate, but the majority (94%) respond to antibiotics treatment." },
  ],
  sources: [
    {
      key: "bts-2023",
      label: "British Thoracic Society Guideline for pleural disease (Roberts et al., Thorax 2023)",
      publisher: "British Thoracic Society",
      year: 2023,
      url: "https://www.brit-thoracic.org.uk/clinical-resources/guidelines/pleural-disease/",
      doi: "10.1136/thorax-2022-219784",
      gradingScheme: "GRADE-based recommendations, Strong or Conditional, marked 'by consensus' where evidence was lacking; good practice points are ungraded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "bts-procedures-2023",
      label: "British Thoracic Society Clinical Statement on pleural procedures (Asciak et al., Thorax 2023), with online appendices 1-4 and 9",
      publisher: "British Thoracic Society",
      year: 2023,
      url: "https://www.brit-thoracic.org.uk/clinical-resources/clinical-statements/pleural-procedures/",
      doi: "10.1136/thorax-2022-219371",
      gradingScheme: "A clinical statement: clinical practice points are not graded; cited guideline grades are quoted where the statement gives them.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "bts-leaflet-2023",
      label: "Sample patient information leaflet: indwelling pleural catheter (BTS clinical statement on pleural procedures, online appendix 13)",
      publisher: "British Thoracic Society",
      year: 2023,
      url: "https://www.brit-thoracic.org.uk/document-library/clinical-statements/pleural-procedures/online-appendix-13-pleural-procedures-ipc-patient-information-leaflet/",
      gradingScheme: "Patient information; not graded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "ats-2018",
      label: "Management of Malignant Pleural Effusions. An Official ATS/STS/STR Clinical Practice Guideline (Feller-Kopman et al., Am J Respir Crit Care Med 2018)",
      publisher: "American Thoracic Society, Society of Thoracic Surgeons, Society of Thoracic Radiology",
      year: 2018,
      url: "https://doi.org/10.1164/rccm.201807-1415ST",
      doi: "10.1164/rccm.201807-1415st",
      gradingScheme: "GRADE: strong or weak (conditional) recommendations.",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "asap-2017",
      label: "Randomized Trial of Pleural Fluid Drainage Frequency in Patients with Malignant Pleural Effusions: the ASAP Trial (Wahidi et al., Am J Respir Crit Care Med 2017)",
      publisher: "American Thoracic Society",
      year: 2017,
      url: "https://doi.org/10.1164/rccm.201607-1404OC",
      doi: "10.1164/rccm.201607-1404oc",
      gradingScheme: "Randomised controlled trial; no grade.",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "ample2-2018",
      label: "Aggressive versus symptom-guided drainage of malignant pleural effusion via indwelling pleural catheters (AMPLE-2): an open-label randomised trial (Muruganandan et al., Lancet Respir Med 2018)",
      publisher: "The Lancet Respiratory Medicine",
      year: 2018,
      url: "https://doi.org/10.1016/S2213-2600(18)30288-1",
      doi: "10.1016/s2213-2600(18)30288-1",
      gradingScheme: "Randomised controlled trial; no grade.",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "ipc-plus-2018",
      label: "Outpatient Talc Administration by Indwelling Pleural Catheter for Malignant Effusion: IPC-PLUS (Bhatnagar et al., N Engl J Med 2018)",
      publisher: "New England Journal of Medicine",
      year: 2018,
      url: "https://doi.org/10.1056/NEJMoa1716883",
      doi: "10.1056/nejmoa1716883",
      gradingScheme: "Randomised controlled trial; no grade.",
      read: "abstract",
      accessed: "2026-11-11",
    },
  ],
  cancers: ["lung-cancer", "breast-cancer", "mesothelioma", "pleural-mesothelioma"],
  drugs: ["talc-sclerosant"],
  technologies: ["indwelling-pleural-catheters"],
  terms: ["malignant-pleural-effusion", "pleurodesis", "pleural-effusion"],
  related: ["care-in-the-last-days-of-life", "malignant-ascites-drainage"],
  upgrades: ["idea-upgrade-daily-pleural-catheter-drainage-offered"],
  gaps: [
    "The step-by-step drainage instructions in the BTS clinical statement (appendix 9, boxes 2 and 3) are images and were not read; the manufacturers' instructions in each pack were not read either.",
    "The full texts of the ATS/STS/STR guideline, AMPLE-2, ASAP and IPC-PLUS are paywalled; only their abstracts were read.",
    "The 1500 mL ceiling per drainage is, in the BTS statement's own word, arbitrary; no trial has compared drainage volumes.",
    "The BTS sample leaflet tells patients infection affects 'about 1 in 50 people', while the same statement's complications table gives pleural infection at 3.2% to 5% and cellulitis at 1.6% to 2.5%; the leaflet figure appears to understate the risk.",
    "No trial has tested dressing type, dressing change frequency or the cleaning steps of home drainage; these rest on the manufacturers' procedures.",
    "Whether daily drainage is worth its cost and burden for people with a short prognosis, who may not live to have the catheter removed, is left to patient choice.",
  ],
});
