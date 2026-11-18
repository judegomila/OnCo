import { protocol } from "./helpers";

/*
 * Draining an indwelling pleural catheter (IPC) at home, for a malignant pleural effusion.
 *
 * What was read, and how (first on 11 November 2026; every source fetched again raw with curl and re-read as text in
 * the second accuracy pass on 17 November 2026):
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
 *
 * Second pass, 17 November 2026: the BTS guideline, the clinical statement, appendices 1-4, 9 and 13 were downloaded
 * again from the BTS document library and read with pdftotext; the four abstracts were re-read from Europe PMC. All 20
 * quotes matched by script. The BTS pages list both documents as valid (July 2023). Europe PMC and Crossref show a
 * correction to the clinical statement (Thorax, 14 May 2026, doi 10.1136/thorax-2022-219371corr1); the journal site
 * refused a script (403) and the correction could not be read. Reasons in several `why` lines that no source stated
 * were reworded to what the sources say, and ratios worked out from the trial figures were replaced by the figures.
 */
export const indwellingPleuralCatheterDrainageAtHome = protocol({
  id: "indwelling-pleural-catheter-drainage-at-home",
  name: "Indwelling pleural catheter: draining fluid from the chest at home",
  aka: ["IPC drainage", "PleurX drainage at home", "Rocket IPC drainage", "tunnelled pleural catheter care", "home drainage of a malignant pleural effusion", "draining a pleural catheter"],
  domain: "palliative",
  tldr: "An indwelling pleural catheter is a thin tube left in the chest so that fluid caused by cancer can be drained at home, by a nurse, a relative or yourself, using vacuum bottles. Drain as often as your breathing needs, or daily if the aim is for the fluid to stop; slow or stop if it hurts; and call the team for fever, redness, a damaged tube, or worse breathlessness when nothing drains.",
  simple: "The tube stays in your chest. A nurse, a family member or you attach a vacuum bottle to drain the fluid when you are breathless. Stop if it hurts. Call your team if you get a fever, the skin goes red, the tube is damaged, or you get more breathless and nothing comes out.",
  summary: "The BTS pleural guideline (2023) offers people with a malignant pleural effusion and no known non-expandable lung a choice of IPC or pleurodesis first line (conditional), and suggests an IPC rather than talc where more than a quarter of the lung will not re-expand (good practice point). After insertion every patient should be referred to the community nursing team, and patients and relatives supported to drain and keep a drainage diary (good practice points). Drainage uses the manufacturer's vacuum bottles and procedure; the usual starting frequency is three times a week. Daily drainage raises the rate of spontaneous pleurodesis and shortens the time to it (ASAP: 47% vs 24% with every-other-day drainage; AMPLE-2: 44.2% vs 15.9% at 6 months against symptom-guided drainage); breathlessness did not differ significantly in AMPLE-2, so BTS recommends daily drainage only where removal is a priority (conditional) and tells patients they do not need daily drainage to control breathlessness (strong, by consensus). About 500 mL is usually drained at a time, up to 1500 mL, slowed or stopped for pain, chest discomfort or persistent cough. Infection (pleural infection 3.2% to 5%) usually responds to antibiotics without removing the catheter (ATS/STS/STR, weak). Removal is considered after less than 50 mL on three consecutive drainages with no symptoms of reaccumulation and no substantial effusion on imaging. Talc instilled through the IPC raised pleurodesis at 35 days (43% vs 23% with placebo, IPC-PLUS) and BTS offers it where removal matters (conditional, by consensus).",
  asOf: "2026-11-17",
  setting: {
    who: ["nurse", "patient-or-carer", "doctor"],
    where: ["home", "community", "outpatient-clinic"],
  },
  population: "Adults with a malignant pleural effusion who have had a tunnelled indwelling pleural catheter (PleurX, Rocket and others) inserted, whether the lung re-expands or not. IPCs for non-malignant (transudative) effusions are not covered: BTS does not in general endorse them. Children are not covered by these sources.",
  trigger: "Discharge home after insertion of an indwelling pleural catheter.",
  steps: [
    {
      action: "Before insertion, offer people without known non-expandable lung a choice between an IPC and pleurodesis, and talk through what living with a tube means",
      why: "Both improve breathlessness and quality of life, with no clear difference between them. An IPC appears to mean a shorter first hospital stay, but BTS says the effect of living with a tube in place must be considered before insertion.",
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
      why: "The catheters are licensed for drainage with the manufacturer's own vacuum bottles, and each pack carries the full procedure.",
      source: "bts-procedures-2023",
      quote: "All manufacturers' drainage packs contain comprehensive procedure guidelines which should be adhered to.",
      grade: "Clinical practice point (ungraded)",
    },
    {
      action: "Agree how often to drain: guided by symptoms, or as often as possible (daily), as tolerated, if the lung re-expands and the aim is for the fluid to stop (pleurodesis)",
      why: "Daily drainage raises the chance that the lung lining seals and does so sooner, but the BTS guideline tells patients it is not needed to control breathlessness or chest pain.",
      source: "bts-procedures-2023",
      quote: "Drainage frequency should be guided by patient symptoms, unless aiming for pleurodesis in those with expansile lungs, in which case IPC drainage should be as frequent as possible (daily) as tolerated by the patient.",
      grade: "Clinical statement (ungraded); see grades for the BTS guideline recommendation",
    },
    {
      action: "Expect about 500 mL at a drainage, and no more than 1500 mL; slow or stop if there is pain, and stop for chest discomfort or a persistent cough",
      why: "Suction can make the pressure inside the chest too negative, which hurts; pain towards the end of drainage may mean the lung cannot fully expand.",
      source: "bts-procedures-2023",
      quote: "Usually around 500 mL are drained, but up to 1500 mL pleural fluid may be drained",
      grade: "Grade C (the 1500 mL ceiling, as cited by the statement); the statement calls the figure arbitrary",
    },
    {
      action: "Keep the exit site clean and dry; shower normally provided it stays so, and bath or swim only after both sutures are out, changing a wet dressing promptly",
      why: "The risk of pleural infection rises the longer the catheter is in place, so the statement stresses careful care of the site.",
      source: "bts-procedures-2023",
      quote: "After both sutures are removed, patients can have a bath and swim, although care should be taken to keep the IPC site clean and dry, such as with a waterproof dressing and prompt changing of the dressing should it get wet.",
      grade: "Clinical statement (ungraded)",
    },
    {
      action: "Tell the patient to call the team for increasing chest pain, fever, redness around the catheter or if it seems to have moved",
      why: "These can be signs of infection or of a tube that has moved; the leaflet says such problems can be treated by the team.",
      source: "bts-leaflet-2023",
      quote: "Contact your doctor if you have increasing chest pain, fever or any redness around the IPC, or if you are concerned the IPC has become dislodged.",
      grade: "Patient information (ungraded)",
    },
    {
      action: "Start antibiotics if catheter infection is suspected, refer promptly to the respiratory team if pleural infection is suspected, and do not routinely remove the catheter",
      why: "Most catheter-related pleural infections respond to antibiotics, and most do not need the catheter removed.",
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
      why: "The lining may have sealed itself (pleurodesis), and the catheter may no longer be needed.",
      source: "bts-procedures-2023",
      quote: "If the catheter drains less than 50 mL on three consecutive occasions the respiratory team should be contacted for consideration of catheter removal.",
      grade: "Clinical practice point (ungraded)",
    },
    {
      action: "Dispose of the fluid and bottle as local clinical waste rules say; check the rules if the patient is having chemotherapy",
      why: "During chemotherapy, local rules may require the bottle to be clamped and put in a clinical waste bag for collection.",
      source: "bts-procedures-2023",
      quote: "If the patient is not receiving chemotherapy/immunotherapy the drainage fluid can be disposed of down the toilet and the bottle with the household rubbish.",
      grade: "Appendix 9 (ungraded)",
    },
  ],
  bestInClass: {
    statement: "The BTS guideline for pleural disease (2023) with the BTS clinical statement on pleural procedures (2023) is the most detailed standard read for home IPC care, and agrees with the ATS/STS/STR guideline (2018) that an IPC and pleurodesis are both reasonable first choices, that an IPC is preferred when the lung will not re-expand, and that catheter infections are treated with antibiotics without removing the catheter. The one real choice is drainage frequency: two randomised trials show more spontaneous pleurodesis with daily drainage (47% vs 24% in ASAP, 44.2% vs 15.9% at 6 months in AMPLE-2), and BTS finds symptoms appear the same whichever regime is used, so BTS ties daily drainage to the patient's own priority (removal of the catheter) and says plainly that it is not needed for symptom control.",
    sources: ["bts-2023", "bts-procedures-2023", "ats-2018", "asap-2017", "ample2-2018"],
  },
  variants: [
    {
      name: "Daily (aggressive) drainage",
      differs: "Drains every day from the start, aiming for the pleura to seal and the catheter to come out.",
      evidence: "ASAP: autopleurodesis 47% vs 24% with every-other-day drainage, median time to it 54 vs 90 days, no significant difference in adverse events or quality of life. AMPLE-2: spontaneous pleurodesis 44.2% vs 15.9% at 6 months against symptom-guided drainage, no significant difference in breathlessness, better EQ-5D-5L scores. BTS: conditional recommendation where removal is a priority.",
      sources: ["asap-2017", "ample2-2018", "bts-2023"],
    },
    {
      name: "Symptom-guided drainage",
      differs: "Drains only when breathlessness returns.",
      evidence: "Breathlessness did not differ significantly from daily drainage in AMPLE-2. BTS notes that daily drainage may carry a cost, to the health service and to the patient, from the greater number of drainages (good practice point). BTS: patients should be told they do not need daily drainage to control symptoms (strong, by consensus).",
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
      differs: "Instils 4 g of talc slurry through the catheter as an outpatient, in IPC-PLUS at 10 days if there was no substantial lung entrapment.",
      evidence: "IPC-PLUS: pleurodesis at day 35 in 43% with talc vs 23% with placebo, with no significant difference in the number of adverse events. BTS 2023: offer where pleurodesis and removal matter to the patient or clinician (conditional, by consensus).",
      sources: ["ipc-plus-2018", "bts-2023"],
    },
    {
      name: "Flutter bag or underwater seal instead of a vacuum bottle",
      differs: "Some NHS trusts use flutter bags for community patients who find vacuum drainage uncomfortable; an underwater seal drain may be considered for inpatients to save cost or to drain an infected effusion.",
      evidence: "Named by the BTS clinical statement (appendix 9) as local practice (Torbay and South Devon NHS Foundation Trust); the licensed method is the manufacturer's vacuum bottle. The statement cites no comparison between them.",
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
    { claim: "Infection rate and response to antibiotics", grade: "Not graded (complications table, appendix 3)", source: "bts-procedures-2023", quote: "IPC related pleural infections carry a 0.29% mortality rate, but the majority (94%) respond to antibiotics treatment." },
  ],
  sources: [
    {
      key: "bts-2023",
      label: "British Thoracic Society Guideline for pleural disease (Roberts et al., Thorax 2023)",
      publisher: "British Thoracic Society",
      year: 2023,
      url: "https://www.brit-thoracic.org.uk/clinical-resources/guidelines/pleural-disease/",
      doi: "10.1136/thorax-2022-219784",
      gradingScheme: "GRADE: recommendations are Strong or Conditional, some printed 'by consensus'; good practice points, developed by informal consensus where there was no quality evidence, are ungraded.",
      read: "full-text",
      accessed: "2026-11-17",
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
      accessed: "2026-11-17",
    },
    {
      key: "bts-leaflet-2023",
      label: "Sample patient information leaflet: indwelling pleural catheter (BTS clinical statement on pleural procedures, online appendix 13)",
      publisher: "British Thoracic Society",
      year: 2023,
      url: "https://www.brit-thoracic.org.uk/document-library/clinical-statements/pleural-procedures/online-appendix-13-pleural-procedures-ipc-patient-information-leaflet/",
      gradingScheme: "Patient information; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
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
      accessed: "2026-11-17",
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
      accessed: "2026-11-17",
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
      accessed: "2026-11-17",
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
      accessed: "2026-11-17",
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
    "The 1500 mL ceiling per drainage is, in the BTS statement's own word, arbitrary; the statement cites no trial comparing drainage volumes.",
    "The BTS sample leaflet tells patients infection affects 'about 1 in 50 people', while the same statement's complications table gives pleural infection at 3.2% to 5% and cellulitis at 1.6% to 2.5%; the two figures do not match.",
    "The sources read cite no trial of dressing type, dressing change frequency or the cleaning steps of home drainage; these rest on the manufacturers' procedures.",
    "On 17 November 2026 Europe PMC and Crossref listed a correction to the BTS clinical statement on pleural procedures (Thorax, 14 May 2026, doi 10.1136/thorax-2022-219371corr1). The journal site refused the request and no open copy was found, so what it corrects is not known; the steps here rest on the statement as published in July 2023 and still listed as valid by BTS.",
    "The BTS leaflet and statement say whom to contact for each warning sign but give no time limit, so none is given here.",
    "Whether daily drainage is worth its cost and burden for people with a short prognosis, who may not live to have the catheter removed, is left to patient choice.",
  ],
});
