import { protocol } from "./helpers";

/*
 * Oral anticancer medicines taken at home: how they are ordered and labelled, what patients and carers are taught, how
 * adherence is supported and followed, and how the medicines are stored, handled and disposed of, keeping household
 * members safe from the drug in body fluids.
 *
 * This record joins two fill rounds written in parallel on 11 November 2026, one on prescribing, teaching and
 * adherence and one on storage, handling and disposal. Every step, source and gap from both is kept.
 *
 * What was read, and how (all on 11 November 2026, raw text in a scratch directory):
 * - ASCO-ONS Antineoplastic Therapy Administration Safety Standards (2024): full text, from the Internet Archive's
 *   capture of ascopubs.org (the publisher refuses a script; a direct fetch returned a bot check). Standards 2.3, 2.4,
 *   3.10, 3.11.4 and 4.4.
 * - ONS Guidelines to Support Patient Adherence to Oral Anticancer Medications (Belcher et al., Oncology Nursing Forum
 *   2022, PMC9303042): full text from the PMC XML. GRADE-based.
 * - Xeloda (capecitabine) EU summary of product characteristics: full text; cited for the handling instruction.
 * - Macmillan Cancer Support, How chemotherapy is given (reviewed 1 March 2022): full text.
 * - American Cancer Society, Getting Oral Chemotherapy and Chemotherapy Safety (both last revised 15 May 2025, with
 *   ASCO medical review): full text.
 * - Oncology Nursing Society, Toolkit for Safe Handling of Hazardous Drugs for Nurses in Oncology (PDF, May 2018): full
 *   text, pdftotext; the home caregiver section.
 * - NCI, Chemotherapy and You (December 2023): full text; the home safety section.
 * - FDA, Disposal of Unused Medicines: What You Should Know (content dated 31 October 2024): full text.
 * - The MASCC Oral Agent Teaching Tool review (2025, PMC11868222) was fetched but not used for any step.
 * - ISOPP Standards for the Safe Handling of Cytotoxics (2022) and the pan-Canadian community pharmacy consensus on
 *   oral anticancer drugs (2018): not reachable (bot check; the PMC full text did not return).
 * Every DOI was resolved through Crossref and Europe PMC.
 *
 * Quotes are copied from the raw text with line breaks joined and nothing else changed.
 */
export const oralAnticancerMedicinesAtHome = protocol({
  id: "oral-anticancer-medicines-at-home",
  name: "Oral anticancer medicines at home: prescribing, teaching, adherence, storage, handling and disposal",
  aka: [
    "oral chemotherapy at home",
    "cancer tablets",
    "oral anticancer medication adherence",
    "OAM",
    "capecitabine at home",
    "missed dose of chemotherapy tablets",
    "oral SACT",
    "oral SACT at home",
    "oral chemotherapy safety at home",
    "storing chemotherapy tablets",
    "disposing of chemotherapy tablets",
    "safe handling of oral chemotherapy",
    "chemotherapy body fluid precautions at home",
  ],
  domain: "oral-anticancer-therapy",
  tldr: "Many cancer treatments are now tablets taken at home. Ask for a written plan: what to take and when, what to do about a missed dose, what to avoid, and which side effects mean stopping and calling. Keep tablets in their labelled container away from children; carers should not touch them bare-handed; take care with toilets and laundry for two days after a dose; return leftovers to the pharmacy.",
  simple: "Ask for a written plan for your cancer tablets: when to take them, what to do if you miss one, and when to stop and call. Keep them in the box or bottle they came in, where children and pets cannot reach. Do not crush or split them unless you are told you can. If someone helps you, they should tip the tablet into the cap or wear gloves. For two days after a dose, put the toilet lid down before flushing and wash your hands. Take any tablets you do not use back to the pharmacy.",
  summary: "ASCO-ONS (2024) sets the safety standards, and extends them to home administration. Oral anticancer medicines are ordered on electronic or preprinted forms, with the quantity to dispense, the number of refills (zero as the preferred default) and the schedule. Labels give the dosage form, quantity, pills per dose, the schedule with days on and off, food instructions and handling warnings. Before the first dose, patients receive verbal and written education in their preferred language covering the schedule, missed doses, interactions with drugs, herbal products and foods, side effects that require stopping self-administered treatment and calling, safe handling at home including disposal, body secretions and spills, and whom to contact; carers are included where needed. Adherence is assessed at the start and during treatment (standard 4.4).\n\nThe ONS adherence guideline (2022, GRADE) makes conditional recommendations, mostly on very low-certainty evidence, for an adherence risk assessment at the start, education addressing adherence, ongoing assessment, proactive follow-up for those at risk, coaching and motivational interviewing (low certainty), and a structured oral anticancer medication programme; it makes no recommendation on reminder technology (knowledge gap). Product information adds handling rules, such as not crushing or cutting capecitabine tablets.\n\nNo graded guideline sets out the household detail of storage, handling and disposal; that rests on nursing and patient guidance. ACS (2025, ASCO-reviewed) and Macmillan (2022) say to read the labels before leaving hospital, store tablets as instructed (some away from light or in a fridge), keep them in the original container and out of reach of children, ask whether tablets can be crushed or opened, and report missed doses. ACS and the ONS safe handling toolkit (2018) describe body-fluid precautions for at least 48 hours after a dose: sit to use the toilet, lid down and flush (twice for a low-volume flush), wipe the seat, wash hands, carers wear gloves (ACS says two pairs) for fluids, wash soiled laundry separately and twice in hot water, and double-bag disposable waste. For leftover medicine, ONS says never put cancer drugs in the bin, drain or toilet and to return them to the pharmacy or clinic; the FDA's general advice for medicines (take-back first, then the flush list, then the household bin) is not written for cancer drugs and conflicts with this.",
  asOf: "2026-11-11",
  setting: {
    who: ["pharmacist", "nurse", "doctor", "patient-or-carer"],
    where: ["outpatient-clinic", "home", "telephone-triage"],
  },
  population: "Adults taking oral anticancer medicines at home (chemotherapy tablets such as capecitabine, cyclophosphamide or etoposide, kinase inhibitors, CDK4/6 inhibitors and other oral drugs the team classes as hazardous), and the people they live with. Hormonal therapies are covered by ASCO-ONS only where listed as antineoplastic. Children's oral chemotherapy, people unable to manage their own medicines, and drugs with their own pregnancy prevention programmes need carer-centred arrangements or additional rules from the prescriber beyond these sources.",
  trigger: "An oral anticancer medicine is prescribed or dispensed for use at home for the first time, its dose changes, or a patient reports difficulty taking it.",
  steps: [
    {
      action: "Order oral anticancer medicines on an electronic or preprinted form with the quantity, schedule and number of refills, with no refills as the default",
      why: "Automatic repeat prescriptions let people keep taking a drug after it should have been stopped or the dose changed.",
      source: "asco-ons-2024",
      quote: "Number of refills, with zero being the preferred default value for oral antineoplastics",
    },
    {
      action: "Label each container with how many to take, how often, the days on and off, and when follow-up is due",
      why: "Cycles with days off are a common cause of taking too much or too little.",
      source: "asco-ons-2024",
      quote: "Administration schedule, including number of times per day to take medication and days on or off medication (cycle length) when applicable, and when follow-up is scheduled",
    },
    {
      action: "Before the first dose, teach the schedule, what to do about a missed dose, and interactions with other medicines, herbal products and foods",
      why: "Patients at home make these decisions without a nurse present.",
      source: "asco-ons-2024",
      quote: "Planned duration of treatment, schedule of treatment administration, plan for missed doses, drug names and supportive medications, and drug interactions with prescribed drugs, integrative therapies, over the counter drugs, and foods",
    },
    {
      action: "Tell the patient which symptoms mean stopping the tablets and calling the team straight away",
      why: "Severe diarrhoea, mouth sores, fever or hand-foot skin damage can become dangerous if tablets are continued.",
      source: "asco-ons-2024",
      quote: "Symptoms or events that require immediate discontinuation of oral or other self-administered treatments",
    },
    {
      action: "Teach safe handling at home: storage, handling, disposal of unused tablets, body fluids and cleaning up spills",
      why: "The drugs that harm cancer cells can harm others in the household who touch them.",
      source: "asco-ons-2024",
      quote: "Procedures for safe handling medications in the home, including disposal of waste, handling body secretions, storage, safe handling, and management of unused medication, and clean-up of drug spills",
    },
    {
      action: "Include family or carers in the teaching where the patient needs help to manage treatment",
      why: "Carers often handle the tablets and notice side effects first.",
      source: "asco-ons-2024",
      quote: "Education includes family, caregivers, or others on the basis of the patient's ability to assume responsibility for managing therapy.",
    },
    {
      action: "Read the labels before leaving the hospital or pharmacy, and ask about anything unclear, including whether tablets may be crushed, split or opened",
      why: "Taking the right dose at the right time matters, and crushing or opening some tablets releases drug into the air or onto skin.",
      source: "macmillan-how-chemo-given",
      quote: "read the labels on the drug boxes before you leave the hospital and speak to your nurse, doctor or pharmacist if any instructions are unclear",
      grade: "Not graded (patient information)",
    },
    {
      action: "Do not crush, split or open tablets or capsules unless the product information or pharmacist says this is safe",
      why: "Crushing releases drug dust that the patient or carer can inhale or absorb.",
      source: "xeloda-smpc",
      quote: "Xeloda tablets should not be crushed or cut.",
    },
    {
      action: "Store the medicine exactly as instructed (for example away from light or in a fridge), in the bottle or box it came in",
      why: "Some drugs spoil if stored wrongly, and the original container keeps the label and warnings with the medicine.",
      source: "macmillan-how-chemo-given",
      quote: "Some chemotherapy tablets, capsules or injections may need to be stored in a certain way, such as away from direct light or in a fridge. Always follow the instructions given by your nurse or pharmacist.",
      grade: "Not graded (patient information)",
    },
    {
      action: "Keep every dose out of the reach of children and pets",
      why: "A dose meant for an adult with cancer can seriously harm a child who swallows it.",
      source: "macmillan-how-chemo-given",
      quote: "All drugs must be stored out of the reach of children, as they could cause serious harm if taken by accident.",
      grade: "Not graded (patient information)",
    },
    {
      action: "Carers who help should not touch tablets with bare hands: tip the dose into the container cap, or wear gloves",
      why: "Many oral anticancer drugs are hazardous to the people who handle them, not only to the person taking them.",
      source: "ons-safe-handling-toolkit",
      quote: "When assisting patients with oral HDs, family members should use “no-touch” technique (e.g., pour tablets into the cap of the container) or wear gloves for handling.",
      grade: "Not graded (nursing toolkit)",
    },
    {
      action: "If a dose is missed or taken late, tell the team rather than making it up on your own",
      why: "Doses are timed to keep a steady level of drug; the team decides whether to change anything.",
      source: "acs-oral-chemo",
      quote: "If you miss a dose or are late taking one, tell your doctor or nurse about it.",
      grade: "Not graded (patient information)",
    },
    {
      action: "For at least 48 hours after a dose, sit to use the toilet, put the lid down before flushing, wipe the seat, and wash hands with soap and water",
      why: "Most of the drug leaves the body in urine and stools over about two days, and splashes can reach other people.",
      source: "acs-chemo-safety",
      quote: "It generally takes at least 48 hours for your body to break down and/or get rid of most chemo.",
      grade: "Not graded (patient information)",
    },
    {
      action: "Anyone handling body fluids, vomit or soiled items should wear disposable gloves and wash their hands afterwards",
      why: "Drug in body fluids can irritate or harm skin with repeated exposure.",
      source: "acs-chemo-safety",
      quote: "If others need to touch any of your body fluids or something that has been in contact with your body fluids (like a bucket or basin), they should wear 2 pairs of throw-away gloves.",
      grade: "Not graded (patient information)",
    },
    {
      action: "Wash clothes or sheets soiled with body fluids in a machine, separately, twice in hot water; seal them in a plastic bag if they cannot be washed straight away",
      why: "Washing separately and twice removes drug residue without spreading it to other laundry.",
      source: "acs-chemo-safety",
      quote: "Wash them twice in hot water with regular laundry detergent. Do not wash them with other clothes.",
      grade: "Not graded (patient information)",
    },
    {
      action: "Double-bag used gloves, pads and other contaminated waste before putting it in the household bin, and do not reuse or recycle empty medicine bottles",
      why: "Bagging keeps others from touching drug residue; empty containers still carry traces of the drug.",
      source: "ons-safe-handling-toolkit",
      quote: "Before putting this waste in the trash, double bag it to help make sure others don’t inadvertently come into contact with it.",
      grade: "Not graded (nursing toolkit)",
    },
    {
      action: "Return any leftover or stopped medicine to the pharmacy, clinic or treatment centre; do not put it in the bin, down the drain or down the toilet",
      why: "Leftover anticancer drugs are a hazard to others and to the environment, and pharmacies can destroy them safely.",
      source: "ons-safe-handling-toolkit",
      quote: "Never throw cancer drugs in the trash or down the drain, and don’t flush them down the toilet.",
      grade: "Not graded (nursing toolkit)",
    },
    {
      action: "At the start, assess the risk that the person will struggle to take the medicine as prescribed",
      why: "Cost, complex schedules, low mood and side effects all make missed doses more likely and can be planned for.",
      source: "ons-oam-2022",
      quote: "In patients starting a new OAM, the ONS Guidelines panel suggests an adherence risk assessment in addition to usual care rather than usual care alone (conditional recommendation, very low certainty of evidence).",
      grade: "conditional recommendation, very low certainty of evidence",
    },
    {
      action: "Ask about missed or extra doses at every contact, and follow up proactively between visits for people at higher risk",
      why: "Problems with tablets often show up between clinic visits.",
      source: "ons-oam-2022",
      quote: "In patients with additional risk factors for nonadherence taking OAMs, the ONS Guidelines panel suggests proactive follow-up addressing adherence in addition to usual care, rather than usual care alone (conditional recommendation, very low certainty of evidence).",
      grade: "conditional recommendation, very low certainty of evidence",
    },
    {
      action: "Offer coaching or motivational interviewing to support adherence",
      why: "Talking through goals and barriers helped some patients keep taking their treatment in small trials.",
      source: "ons-oam-2022",
      quote: "In patients taking OAMs, the ONS Guidelines panel suggests motivational interviewing in addition to usual care rather than usual care alone (conditional recommendation, low certainty of evidence).",
      grade: "conditional recommendation, low certainty of evidence",
    },
  ],
  bestInClass: {
    statement: "A structured oral anticancer medicine programme (ONS 2022, conditional, very low certainty): order and label to the ASCO-ONS standards (2024), with zero refills as the default and the schedule, days off and food instructions on the label; teach patient and carer before the first dose, in writing, including missed doses, interactions, stop-and-call symptoms and safe handling and disposal at home; assess adherence risk at the start and adherence at every contact; follow up proactively those at risk; offer coaching and motivational interviewing. The evidence for each adherence intervention is low or very low in certainty, and ONS makes no recommendation on reminder technology. For the household detail ASCO-ONS requires to be taught but does not specify, the convergent nursing and patient guidance (ACS 2025, ASCO-reviewed; Macmillan 2022; NCI 2023; the ONS safe handling toolkit 2018) agrees on original containers, storage as labelled, keeping drugs from children, a no-touch technique or gloves for carers, 48 hours of body-fluid precautions, and returning leftovers to the pharmacy. The ISOPP 2022 standards cover handling but could not be read, so their wording is not used here.",
    sources: ["asco-ons-2024", "ons-oam-2022", "acs-oral-chemo", "acs-chemo-safety", "macmillan-how-chemo-given", "nci-chemo-and-you", "ons-safe-handling-toolkit"],
  },
  variants: [
    {
      name: "Reminder apps and text messages",
      differs: "Uses automated reminders or interactive apps to support taking oral anticancer medicines.",
      evidence: "ONS (2022) makes no recommendation, citing a knowledge gap; it notes adherence improved in studies only where technology came with follow-up from a healthcare worker.",
      sources: ["ons-oam-2022"],
    },
    {
      name: "General medicine disposal (FDA)",
      differs: "For most unused medicines, use a take-back option first; if there is none, flush medicines on the FDA flush list, and put others in the household bin.",
      evidence: "FDA consumer guidance (content current 31 October 2024), written for medicines in general and not for anticancer drugs. It conflicts with ONS, which says never to bin or flush cancer drugs; for anticancer drugs, the team's or pharmacy's return route comes first.",
      sources: ["fda-disposal"],
    },
    {
      name: "Separate toilet for 48 hours (ONS toolkit)",
      differs: "Asks household members to use a different toilet from the patient for 48 hours after a dose; ACS says to do this if possible and otherwise to wipe the seat after each use.",
      evidence: "Nursing toolkit, not graded; ONS gives the 48-hour period, citing a nursing text. No study compares the two approaches.",
      sources: ["ons-safe-handling-toolkit", "acs-chemo-safety"],
    },
    {
      name: "Length of body-fluid precautions set by the treating centre (NCI)",
      differs: "Lists the same precautions (lid closed and flush twice, sit to urinate, gloves for body fluids, separate laundry, condoms during sex) but leaves the duration to the centre and the drug.",
      evidence: "NCI booklet: the time 'might differ depending on the policy where you receive treatment and the drugs that you receive.'",
      sources: ["nci-chemo-and-you"],
    },
  ],
  grades: [
    { claim: "Education addressing adherence in addition to standard education", grade: "conditional recommendation, very low certainty of evidence", source: "ons-oam-2022", quote: "In patients taking OAMs, the ONS Guidelines panel suggests education addressing adherence in addition to standard education rather than standard education alone (conditional recommendation, very low certainty of evidence)." },
    { claim: "Ongoing assessment of adherence", grade: "conditional recommendation, very low certainty of evidence", source: "ons-oam-2022", quote: "In patients taking OAMs, the ONS Guidelines panel suggests ongoing assessment of adherence in addition to usual care rather than usual care alone (conditional recommendation, very low certainty of evidence)." },
    { claim: "Coaching", grade: "conditional recommendation, very low certainty of evidence", source: "ons-oam-2022", quote: "In patients taking OAMs, the ONS Guidelines panel suggests coaching in addition to usual care, rather than usual care alone (conditional recommendation, very low certainty of evidence)." },
    { claim: "A structured oral anticancer medication programme", grade: "Conditional; very low certainty", source: "ons-oam-2022", quote: "The ONS Guidelines panel suggests implementation of a structured OAM program rather than no structured OAM program." },
    { claim: "Reminder technology", grade: "No recommendation; knowledge gap", source: "ons-oam-2022", quote: "The ONS Guidelines panel makes no recommendation for the use of technology, either interactive or noninteractive, based on a knowledge gap." },
    { claim: "Organisation policy for monitoring adherence", grade: "Standard (not graded)", source: "asco-ons-2024", quote: "The health care organization policy outlines the procedure to monitor initial and subsequent assessment and documentation of patients' adherence to antineoplastic therapy" },
    { claim: "Home administration within the scope of the ASCO-ONS safety standards", grade: "Standards (expert panel and literature review); not graded", source: "asco-ons-2024", quote: "The standards presented here include clarification and expansion of existing standards to include home administration and other changes in processes of ordering, preparing, and administering antineoplastic therapy; the advent of immune effector cellular therapy; the importance of social determinants of health; fertility preservation; and pregnancy avoidance." },
    { claim: "Home storage, handling and disposal steps", grade: "Not graded: patient information and a nursing toolkit, without a grading scheme", source: "ons-safe-handling-toolkit" },
    { claim: "Body-fluid precautions for 48 hours after a dose", grade: "Not graded (ONS toolkit, citing a nursing text)", source: "ons-safe-handling-toolkit", quote: "Family members should use separate toilets from the patient for 48 hours after HD administration to eliminate the risk of contact with contaminated body waste." },
  ],
  sources: [
    {
      key: "asco-ons-2024",
      label: "Antineoplastic Therapy Administration Safety Standards for Adult and Pediatric Oncology: ASCO-ONS Standards",
      publisher: "ASCO and the Oncology Nursing Society (JCO Oncology Practice)",
      year: 2024,
      url: "https://doi.org/10.1200/OP.24.00216",
      doi: "10.1200/OP.24.00216",
      gradingScheme: "Standards are not graded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "ons-oam-2022",
      label: "ONS Guidelines to Support Patient Adherence to Oral Anticancer Medications",
      publisher: "Oncology Nursing Society (Oncology Nursing Forum, Belcher et al.)",
      year: 2022,
      url: "https://doi.org/10.1188/22.ONF.279-295",
      doi: "10.1188/22.ONF.279-295",
      gradingScheme: "GRADE: recommendations strong, conditional, no recommendation or knowledge gap; certainty of evidence high, moderate, low or very low.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "xeloda-smpc",
      label: "Xeloda (capecitabine): summary of product characteristics, section 4.4",
      publisher: "European Medicines Agency (EPAR product information)",
      year: 2026,
      url: "https://www.ema.europa.eu/en/documents/product-information/xeloda-epar-product-information_en.pdf",
      gradingScheme: "Product information; not graded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "macmillan-how-chemo-given",
      label: "How chemotherapy is given",
      publisher: "Macmillan Cancer Support",
      year: 2022,
      url: "https://www.macmillan.org.uk/cancer-information-and-support/treatment/types-of-treatment/chemotherapy/how-chemotherapy-is-given",
      gradingScheme: "Patient information page; not graded. Reviewed 1 March 2022.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "acs-oral-chemo",
      label: "Getting Oral Chemotherapy",
      publisher: "American Cancer Society (with ASCO medical review)",
      year: 2025,
      url: "https://www.cancer.org/cancer/treatment-types/chemotherapy/oral-chemotherapy.html",
      gradingScheme: "Patient information page; not graded. Last revised 15 May 2025.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "acs-chemo-safety",
      label: "Chemotherapy Safety",
      publisher: "American Cancer Society (with ASCO medical review)",
      year: 2025,
      url: "https://www.cancer.org/cancer/treatment-types/chemotherapy/chemotherapy-safety.html",
      gradingScheme: "Patient information page; not graded. Last revised 15 May 2025.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "ons-safe-handling-toolkit",
      label: "Toolkit for Safe Handling of Hazardous Drugs for Nurses in Oncology",
      publisher: "Oncology Nursing Society",
      year: 2018,
      url: "https://www.ons.org/sites/default/files/2018-06/ONS_Safe_Handling_Toolkit_0.pdf",
      gradingScheme: "Nursing toolkit; recommendations are not graded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "nci-chemo-and-you",
      label: "Chemotherapy and You: Support for People with Cancer",
      publisher: "National Cancer Institute (US)",
      year: 2023,
      url: "https://www.cancer.gov/publications/patient-education/chemotherapy-and-you.pdf",
      gradingScheme: "Patient booklet; recommendations are not graded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "fda-disposal",
      label: "Disposal of Unused Medicines: What You Should Know",
      publisher: "US Food and Drug Administration",
      year: 2024,
      url: "https://www.fda.gov/drugs/safe-disposal-medicines/disposal-unused-medicines-what-you-should-know",
      gradingScheme: "Consumer guidance; not graded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "isopp-2022",
      label: "ISOPP Standards for the Safe Handling of Cytotoxics",
      publisher: "International Society of Oncology Pharmacy Practitioners (J Oncol Pharm Pract)",
      year: 2022,
      url: "https://doi.org/10.1177/10781552211070933",
      doi: "10.1177/10781552211070933",
      read: "not-reachable",
      accessed: "2026-11-11",
    },
  ],
  drugs: ["capecitabine", "cyclophosphamide", "etoposide"],
  technologies: ["kinase-inhibitors", "cdk46-inhibitor"],
  related: ["hazardous-drug-handling-in-clinical-areas", "dpyd-testing-before-fluoropyrimidines", "idea-acc-pharmacist-interaction-review-oral-anticancer"],
  upgrades: ["idea-upgrade-oral-anticancer-medicine-adherence-programme"],
  gaps: [
    "Every ONS adherence recommendation is conditional and rests on low or very low certainty evidence; no single intervention is proven to improve outcomes such as survival or toxicity.",
    "No graded guideline covers storage, handling and disposal of oral anticancer medicines at home: ASCO-ONS requires it to be taught but does not specify it, so every household step rests on patient information or a nursing toolkit.",
    "The ISOPP 2022 standards, which address household safe handling, and the 2018 pan-Canadian community pharmacy consensus could not be read at all (bot check; the PMC full text did not return).",
    "The ONS toolkit read here is the 2018 edition; ACS cites a 2024 ONS book on safe handling that is not freely available.",
    "The 48-hour period is a general figure; how long a particular drug stays in body fluids varies, and the sources leave the exact period to the drug's label and the treating centre. Gloves for carers and pregnancy in the household are not settled by any source read.",
    "Missed-dose rules are drug-specific and come from each product's label; none is reproduced here.",
    "No UK national standard for oral anticancer medicines (for example, from NHS England or BOPA) was read, and the sources do not give a UK-specific return route for anticancer drugs beyond returning them to the pharmacy or clinic.",
  ],
});
