import { protocol } from "./helpers";

/*
 * Oral anticancer medicines taken at home: how they are ordered and labelled, what patients and carers are taught, how
 * adherence is supported and followed, and how the medicines are stored, handled and disposed of, keeping household
 * members safe from the drug in body fluids.
 *
 * This record joins two fill rounds written in parallel on 11 November 2026, one on prescribing, teaching and
 * adherence and one on storage, handling and disposal.
 *
 * Second accuracy pass, 17 November 2026. Every source was fetched again as raw text (curl, pdftotext, tags stripped
 * by script) and every claim re-read against it; every quote was checked by script with only whitespace normalised.
 * - ASCO-ONS Antineoplastic Therapy Administration Safety Standards (2024): ascopubs.org refuses a script and was not
 *   attempted. The standards were co-published in Oncology Nursing Forum (July 2024); the full text was read from the
 *   Oncology Nursing Society's own PDF of that co-publication, which another checker fetched the same day (copy
 *   re-used). Standards 2.3, 2.4, 3.3, 3.10, 3.11.4, 4.4 and the definitions table.
 * - ONS Guidelines to Support Patient Adherence to Oral Anticancer Medications (Belcher et al., Oncology Nursing Forum
 *   2022, PMC9303042): full text through NCBI E-utilities (the Europe PMC endpoint returned HTTP 500). GRADE-based.
 * - Xeloda (capecitabine) EU product information (PDF dated February 2025; copy another checker fetched from the EMA
 *   the same day, re-used): the summary of product characteristics and the package leaflet.
 * - Macmillan Cancer Support, How chemotherapy is given (reviewed 1 March 2022; its next review was due 1 March 2025
 *   and the page says it is being reviewed): full text.
 * - American Cancer Society, Getting Oral Chemotherapy and Chemotherapy Safety (both last revised 15 May 2025, with
 *   ASCO medical review): full text.
 * - Oncology Nursing Society, Toolkit for Safe Handling of Hazardous Drugs for Nurses in Oncology (PDF, 2018): full
 *   text; the home caregiver section.
 * - NCI, Chemotherapy and You (NIH Publication No. 24-7157, printed January 2024): full text; the home safety section.
 * - FDA, Disposal of Unused Medicines: What You Should Know (content current 31 October 2024): full text.
 * - New on this pass: the British Oncology Pharmacy Association position statement on oral anticancer chemotherapy
 *   (January 2004; the copy NICE publishes with its TA100 consultation documents); the MHRA Drug Safety Update article
 *   of January 2008 reporting the National Patient Safety Agency's alert; the MASCC Oral Agent Teaching Tool, card
 *   format (PDF dated September 2016); and the abstract of the ASCO and NCODA dispensing standards update (2025).
 * - Not readable: the NPSA's 2008 rapid response report itself (the National Archives copy answered with a human
 *   verification page), the ISOPP 2022 standards (HTTP 403), MASCC's own page listing the current version of its tool
 *   (HTTP 403), and the full text of the ASCO and NCODA standards.
 * Corrected on this pass: the page said ASCO-ONS covers hormonal therapies "where listed as antineoplastic" (the
 * standards say they are not included) and that children were outside these sources (ASCO-ONS covers adults and
 * children); "at every contact" for adherence checks, which ONS does not say; "return leftovers to the pharmacy",
 * where ONS says to ask the team whether they can be returned; a capecitabine instruction written as a rule for all
 * tablets; and several reasons no source read gives. The UK position on who prescribes and dispenses was added.
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
  tldr: "Many cancer treatments are tablets taken at home. Ask for the plan in writing: what to take and when, what to do if you miss a dose or are sick after one, what to avoid, and which side effects mean stopping and calling. Keep tablets away from children; carers should not touch them bare-handed; take care with toilets and laundry for at least two days after a dose; ask where to return leftovers.",
  simple: "Ask for the plan for your cancer tablets in writing: when to take them, what to do if you miss one or are sick after one, and when to stop and call. Keep them in the box or bottle they came in unless you are told otherwise, where children and pets cannot reach. Do not crush or cut them unless you are told you can. If someone helps you, they should tip the tablet into the cap or wear gloves. For at least two days after a dose, put the toilet lid down before flushing and wash your hands. Do not bin or flush tablets you do not use: ask your team or pharmacy where to take them.",
  summary: "ASCO-ONS (2024) sets the US safety standards for adults and children, and extends them to home administration. Orders are signed by licensed practitioners the organisation has determined to be qualified. All oral antineoplastics must be ordered in the electronic record or on preprinted forms, and the order should give the quantity to dispense, the number of refills (zero as the preferred default) and the schedule. Labels give the dosage form, quantity, pills per dose, the schedule with days on and off and when follow-up is due, instructions about food and other medicines, and storage and handling warnings. Before the first administration in each treatment plan, patients are given verbal and written or electronic information, which should be in their preferred language, covering the schedule, the plan for missed doses, interactions with prescribed drugs, integrative therapies, over-the-counter drugs and foods, symptoms that require stopping self-administered treatment at once, symptoms that require contacting the organisation, safe handling at home (disposal of waste, body secretions, storage, unused medication and spills), and whom to call; family and carers are included according to the patient's ability to manage. The organisation's policy sets out how adherence is assessed at the start and afterwards (standard 4.4). The standards say hormonal therapies are not included in their definition of antineoplastic agents.\n\nIn the UK, the British Oncology Pharmacy Association's position statement (January 2004, the only UK text read in full) says the prescribing and dispensing of oral chemotherapy should be carried out and monitored to the same standards as parenteral chemotherapy; that, other than in exceptional, clearly defined and mutually agreed circumstances, prescribing and dispensing should remain the sole responsibility of the hospital-based oncologist or haematologist and the hospital pharmacy; that prescriptions must be screened by authorised pharmacists before dispensing; and that whoever hands the drugs over must ensure the patient or carer fully understands how and when to take them, what to do after missing one or more doses or vomiting after a dose, likely adverse effects, how to obtain further supplies, the role of their GP, and safe handling, storage and disposal. It asks for 24-hour points of contact. The MHRA's Drug Safety Update of January 2008 reports the National Patient Safety Agency's alert of that month: risks are increased if practitioners who are not cancer specialists prescribe, dispense or administer these medicines, and oral anticancer medicine should be prescribed, dispensed, administered and monitored to the same standard as injected therapy. The NPSA report itself could not be read, so its own wording on repeat prescribing outside the cancer team is not given here.\n\nThe ONS adherence guideline (2022, GRADE) makes conditional recommendations, mostly on very low-certainty evidence, for an adherence risk assessment at the start, education addressing adherence, ongoing assessment, proactive follow-up for those with extra risk factors, coaching and motivational interviewing (low certainty), and a structured oral anticancer medication programme; it sets no interval for the ongoing assessment and makes no recommendation on reminder technology (knowledge gap).\n\nNo graded guideline sets out the household detail of storage, handling and disposal; that rests on a teaching tool, a nursing toolkit and patient information. MASCC's teaching tool (2016) says to keep tablets in the original container unless otherwise directed, away from children and pets and from heat, sunlight and moisture, to wash hands before and after handling them, not to crush, chew or cut them unless directed otherwise, and to have directions for a missed dose. Macmillan (2022) says to read the labels before leaving hospital, to store drugs as the nurse or pharmacist instructs (some away from direct light or in a fridge) and out of the reach of children, and to contact the hospital straight away after a forgotten dose or being sick after one. ACS (2025, ASCO-reviewed) says to tell the doctor or nurse about a missed or late dose and to ask whether tablets can be opened, broken or crushed. The capecitabine product information says its tablets should not be crushed or cut. For body fluids, ACS (for at least 48 hours after chemotherapy) and the ONS safe handling toolkit (2018; for 48 hours) describe a separate toilet where possible, sitting to use it, lid down before flushing (twice for a low-volume flush), wiping the seat, washing hands, gloves for anyone touching body fluids (ACS says two pairs), washing soiled laundry separately and twice in hot water, and bagging disposable waste (ONS: double-bagged). ACS describes these precautions for traditional chemotherapy and says other cancer drugs may differ. For leftover medicine, ONS says never to put cancer drugs in the bin, drain or toilet and to ask the team whether they can be returned to the doctor's office, pharmacy or treatment centre; the FDA's general advice for medicines (take-back first, then the flush list, then the household bin) is not written for cancer drugs and conflicts with this.",
  asOf: "2026-11-17",
  setting: {
    who: ["pharmacist", "nurse", "doctor", "patient-or-carer"],
    where: ["outpatient-clinic", "home", "telephone-triage"],
  },
  population: "People taking oral anticancer medicines at home, and the people they live with. ASCO-ONS covers adults and children and defines antineoplastic therapy as chemotherapy, targeted agents such as small-molecule inhibitors, and immunotherapy; it says hormonal therapies are not included, and BOPA's statement also leaves out hormonal and anti-hormonal agents. ACS gives capecitabine, cyclophosphamide and etoposide as examples of oral chemotherapy, and describes its body-fluid precautions for traditional chemotherapy, saying other cancer drugs may differ. People unable to manage their own medicines, and drugs with their own pregnancy prevention programmes, need arrangements from the prescriber beyond these sources.",
  trigger: "An oral anticancer medicine is prescribed or dispensed for use at home for the first time, its dose changes, or a patient reports difficulty taking it.",
  steps: [
    {
      action: "Order every oral anticancer medicine in the electronic record or on a preprinted form, giving the quantity to dispense, the schedule and the number of refills, with zero refills as the preferred default",
      why: "ASCO-ONS states the default without printing a reason. BOPA's 2004 statement notes that treatment at home may continue for weeks at a time without direct professional supervision.",
      source: "asco-ons-2024",
      quote: "Number of refills, with zero being the preferred default value for oral antineoplastics",
      grade: "Standard (not graded)",
    },
    {
      action: "In the UK, keep prescribing and dispensing with the hospital cancer specialist and the hospital pharmacy unless a clearly defined exception has been agreed, and have a pharmacist screen every prescription before it is dispensed",
      why: "The MHRA's report of the 2008 NPSA alert says risks are increased if practitioners who are not cancer specialists prescribe, dispense or administer these medicines.",
      source: "bopa-oral-2004",
      quote: "Other than in exceptional and clearly defined and mutually agreed circumstances, prescribing and dispensing should remain the sole responsibility of the hospital-based oncologist/haematologist and pharmacy respectively.",
      grade: "Not graded (position statement, 2004)",
    },
    {
      action: "Label each container with how many to take, how often, the days on and off, and when follow-up is due",
      why: "BOPA notes that some patients find repeated short courses with gaps between them hard to grasp, and that a misunderstanding carries the risk of serious harm.",
      source: "asco-ons-2024",
      quote: "Administration schedule, including number of times per day to take medication and days on or off medication (cycle length) when applicable, and when follow-up is scheduled",
      grade: "Standard (not graded)",
    },
    {
      action: "Before the first dose, teach the schedule, the plan for a missed dose, and interactions with prescribed medicines, over-the-counter drugs, integrative therapies and foods",
      why: "At home the patient, a relative or a carer is the one giving the medicine, so they need the plan before treatment starts.",
      source: "asco-ons-2024",
      quote: "Planned duration of treatment, schedule of treatment administration, plan for missed doses, drug names and supportive medications, and drug interactions with prescribed drugs, integrative therapies, over the counter drugs, and foods",
      grade: "Standard (not graded)",
    },
    {
      action: "Tell the patient which symptoms mean stopping the tablets at once and contacting the team",
      why: "The list is specific to each drug. For capecitabine, for example, the package leaflet says to stop immediately and contact the doctor for symptoms that include diarrhoea (four or more extra bowel movements a day, or any at night), vomiting more than once in 24 hours, pain or sores in the mouth, a hand-and-foot skin reaction, or a temperature of 38°C or greater.",
      source: "asco-ons-2024",
      quote: "Symptoms or events that require immediate discontinuation of oral or other self-administered treatments",
      grade: "Standard (not graded)",
    },
    {
      action: "Teach safe handling at home: storage, handling, disposal of waste and unused tablets, body fluids and cleaning up spills",
      why: "Chemotherapy may damage healthy cells too, so it can be hazardous to other people who are exposed to it (ACS).",
      source: "asco-ons-2024",
      quote: "Procedures for safe handling medications in the home, including disposal of waste, handling body secretions, storage, safe handling, and management of unused medication, and clean-up of drug spills",
      grade: "Standard (not graded)",
    },
    {
      action: "Include family or carers in the teaching, according to how far the patient can manage treatment alone",
      why: "Whoever will be handling the tablets or helping with them needs the same information as the patient.",
      source: "asco-ons-2024",
      quote: "Education includes family, caregivers, or others on the basis of the patient’s ability to assume responsibility for managing therapy.",
      grade: "Standard (not graded)",
    },
    {
      action: "Read the labels on the boxes before leaving the hospital, and ask the nurse, doctor or pharmacist about any instruction that is unclear",
      why: "Macmillan says not taking the drugs at the right times can affect how well treatment works.",
      source: "macmillan-how-chemo-given",
      quote: "read the labels on the drug boxes before you leave the hospital and speak to your nurse, doctor or pharmacist if any instructions are unclear",
      grade: "Not graded (patient information)",
    },
    {
      action: "Do not crush, chew or cut tablets or capsules unless the team says this is safe for that medicine; ask before doing so",
      why: "The capecitabine product information, for example, says its tablets should not be crushed or cut, and reports eye irritation, skin rash, headache and stomach upset in people exposed to crushed or cut tablets.",
      source: "mascc-moatt",
      quote: "Do not crush, chew, cut or disrupt your pills or tablets unless directed otherwise.",
      grade: "Not graded (teaching tool)",
    },
    {
      action: "Store the medicine as the nurse or pharmacist instructs (some need to be kept away from direct light or in a fridge) and, unless told otherwise, in the container it came in",
      why: "MASCC's teaching tool says heat, sunlight and moisture can break tablets down and make them less effective, and that mixing them with other pills could be dangerous.",
      source: "macmillan-how-chemo-given",
      quote: "Some chemotherapy tablets, capsules or injections may need to be stored in a certain way, such as away from direct light or in a fridge. Always follow the instructions given by your nurse or pharmacist.",
      grade: "Not graded (patient information)",
    },
    {
      action: "Keep every dose out of the reach of children and pets",
      why: "The drugs could cause serious harm if a child took them by accident. MASCC's teaching tool adds pets and asks for a childproof container.",
      source: "macmillan-how-chemo-given",
      quote: "All drugs must be stored out of the reach of children, as they could cause serious harm if taken by accident.",
      grade: "Not graded (patient information)",
    },
    {
      action: "Carers who help should not touch tablets with bare hands: tip the dose into the container cap, or wear gloves",
      why: "ONS says protective equipment is indicated for family members who take part in care during treatment with a hazardous drug.",
      source: "ons-safe-handling-toolkit",
      quote: "When assisting patients with oral HDs, family members should use “no-touch” technique (e.g., pour tablets into the cap of the container) or wear gloves for handling.",
      grade: "Not graded (nursing toolkit)",
    },
    {
      action: "If a dose is forgotten, the patient is sick after taking one, or the tablets cannot be taken for any reason, contact the hospital nurse or doctor straight away for advice",
      why: "What to do next differs from drug to drug. ACS adds that the team needs to know about a missed or late dose, and that no change should be made unless the doctor says so.",
      source: "macmillan-how-chemo-given",
      quote: "contact your nurse or doctor at the hospital straight away for advice if you cannot take your medicines for any reason, are sick after taking them, or have forgotten to take a dose",
      grade: "Not graded (patient information)",
    },
    {
      action: "For at least 48 hours after a dose, sit to use the toilet, put the lid down before flushing, wipe the seat after use if others share the toilet, and wash hands with soap and water",
      why: "ACS says it generally takes at least 48 hours for the body to break down or get rid of most chemotherapy, some drugs faster and some slower, and that most of the waste leaves in urine and stools.",
      source: "acs-chemo-safety",
      quote: "It generally takes at least 48 hours for your body to break down and/or get rid of most chemo.",
      grade: "Not graded (patient information)",
    },
    {
      action: "Anyone who has to touch body fluids, vomit or soiled items should wear two pairs of disposable gloves and wash their hands afterwards",
      why: "ACS says contact is not likely to cause harm, but that being exposed often may lead to problems, so extra care is taken to avoid it.",
      source: "acs-chemo-safety",
      quote: "If others need to touch any of your body fluids or something that has been in contact with your body fluids (like a bucket or basin), they should wear 2 pairs of throw-away gloves.",
      grade: "Not graded (patient information)",
    },
    {
      action: "Wash clothes or sheets soiled with body fluids in a machine, separately, twice in hot water; seal them in a plastic bag if they cannot be washed straight away",
      why: "Body fluids can carry chemotherapy waste, and other people could be exposed to it for a few days through contact with them.",
      source: "acs-chemo-safety",
      quote: "Wash them twice in hot water with regular laundry detergent. Do not wash them with other clothes.",
      grade: "Not graded (patient information)",
    },
    {
      action: "Double-bag used gloves and other items that have touched the medicine or body fluids before putting them in the household bin, and do not reuse or recycle empty medicine bottles",
      why: "Double-bagging helps make sure other people do not come into contact with the waste by accident.",
      source: "ons-safe-handling-toolkit",
      quote: "Before putting this waste in the trash, double bag it to help make sure others don’t inadvertently come into contact with it.",
      grade: "Not graded (nursing toolkit)",
    },
    {
      action: "Do not put leftover or stopped medicine in the bin, down the drain or down the toilet; ask the team whether it can be returned to the clinic, pharmacy or treatment centre",
      why: "ONS says leftover cancer medicine needs to be disposed of as safely as possible. MASCC's teaching tool suggests asking the patient to bring unused tablets back to the next visit.",
      source: "ons-safe-handling-toolkit",
      quote: "Never throw cancer drugs in the trash or down the drain, and don’t flush them down the toilet.",
      grade: "Not graded (nursing toolkit)",
    },
    {
      action: "When a new oral anticancer medicine is started, assess what may get in the way of taking it as prescribed",
      why: "Knowing the risks and barriers early lets support be planned. ONS could not identify one standard assessment tool in use.",
      source: "ons-oam-2022",
      quote: "In patients starting a new OAM, the ONS Guidelines panel suggests an adherence risk assessment in addition to usual care rather than usual care alone (conditional recommendation, very low certainty of evidence).",
      grade: "conditional recommendation, very low certainty of evidence",
    },
    {
      action: "Keep assessing adherence during treatment, and follow up proactively, outside routine visits, with people who have extra risk factors for missing doses",
      why: "ONS sets no interval: the studies it reviewed ranged from weekly follow-up to checks months or cycles apart.",
      source: "ons-oam-2022",
      quote: "In patients with additional risk factors for nonadherence taking OAMs, the ONS Guidelines panel suggests proactive follow-up addressing adherence in addition to usual care, rather than usual care alone (conditional recommendation, very low certainty of evidence).",
      grade: "conditional recommendation, very low certainty of evidence",
    },
    {
      action: "Consider coaching or motivational interviewing to support adherence",
      why: "ONS found that motivational interviewing may improve adherence rates compared with usual care, on low certainty evidence.",
      source: "ons-oam-2022",
      quote: "In patients taking OAMs, the ONS Guidelines panel suggests motivational interviewing in addition to usual care rather than usual care alone (conditional recommendation, low certainty of evidence).",
      grade: "conditional recommendation, low certainty of evidence",
    },
  ],
  bestInClass: {
    statement: "A structured oral anticancer medicine programme (ONS 2022, conditional, very low certainty): order and label to the ASCO-ONS standards (2024), with zero refills as the preferred default and the schedule, days off and food instructions on the label; teach patient and carer before the first dose, verbally and in writing or electronically, including missed doses, interactions, stop-and-call symptoms and safe handling and disposal at home; assess adherence risk at the start and adherence during treatment; follow up proactively those with extra risk factors; consider coaching and motivational interviewing. The evidence for each adherence intervention is low or very low in certainty, ONS sets no interval for the checks, and it makes no recommendation on reminder technology. None of these standards is graded apart from the ONS guideline. In the UK, BOPA's 2004 statement keeps prescribing and dispensing with the hospital specialist and hospital pharmacy other than in agreed exceptions, and the 2008 NPSA alert, as the MHRA reports it, asks for the same standard as injected therapy; ASCO-ONS allows dispensing by the ordering facility, another facility or a specialty pharmacy. For the household detail ASCO-ONS requires to be taught but does not specify, the sources are a teaching tool, a nursing toolkit and patient information: MASCC (2016) for the original container, storage, hand washing and not crushing; Macmillan (2022) for storage, children and whom to contact; the ONS toolkit (2018) for a no-touch technique or gloves, 48 hours of body-fluid precautions and not binning or flushing leftovers; ACS (2025, ASCO-reviewed) for at least 48 hours of body-fluid precautions; NCI (2024) leaves the length of time to the treating centre. The ISOPP 2022 standards cover handling but could not be read, so their wording is not used here.",
    sources: ["asco-ons-2024", "ons-oam-2022", "bopa-oral-2004", "mhra-dsu-2008", "mascc-moatt", "acs-oral-chemo", "acs-chemo-safety", "macmillan-how-chemo-given", "nci-chemo-and-you", "ons-safe-handling-toolkit"],
  },
  variants: [
    {
      name: "Dispensing outside the hospital and refills (ASCO-ONS)",
      differs: "The US standards apply whether the medicine is dispensed by the ordering facility, an alternative facility or a specialty pharmacy, and allow refills, with zero as the preferred default. BOPA's UK statement keeps prescribing and dispensing with the hospital specialist and hospital pharmacy other than in exceptional, clearly defined and mutually agreed circumstances.",
      evidence: "Neither is graded. BOPA's statement dates from January 2004; the MHRA's report of the 2008 NPSA alert says risks are increased when practitioners who are not cancer specialists prescribe, dispense or administer these medicines. The NPSA report itself was not readable.",
      sources: ["asco-ons-2024", "bopa-oral-2004", "mhra-dsu-2008"],
    },
    {
      name: "Reminder apps and text messages",
      differs: "Uses automated reminders or interactive apps to support taking oral anticancer medicines.",
      evidence: "ONS (2022) makes no recommendation, citing a knowledge gap; it notes that the improvement in adherence was seen when technology was accompanied by additional primary healthcare follow-up.",
      sources: ["ons-oam-2022"],
    },
    {
      name: "General medicine disposal (FDA)",
      differs: "For most unused medicines, use a take-back option first; if there is none, flush medicines on the FDA flush list, and put others in the household bin.",
      evidence: "FDA consumer guidance (content current 31 October 2024), written for medicines in general and not for anticancer drugs. It conflicts with ONS, which says never to bin or flush cancer drugs and to ask the team whether they can be returned.",
      sources: ["fda-disposal", "ons-safe-handling-toolkit"],
    },
    {
      name: "Separate toilet for 48 hours (ONS toolkit)",
      differs: "ONS says family members should use a different toilet from the patient for 48 hours after a dose, with wipes for the seat and rim in a one-bathroom household, and the toilet and bathroom floor washed at the end of the 48 hours. ACS says to use a separate toilet if possible, otherwise to wipe the seat after each use, for at least 48 hours.",
      evidence: "Nursing toolkit and patient information, not graded; ONS gives the 48-hour period, citing an ONS book on safe handling (2017). Neither source cites a study comparing the two.",
      sources: ["ons-safe-handling-toolkit", "acs-chemo-safety"],
    },
    {
      name: "Length of body-fluid precautions set by the treating centre (NCI)",
      differs: "Lists similar precautions (lid closed and flush twice, sit to urinate, gloves for body fluids, linens washed separately, condoms during sex) but leaves the duration to the centre and the drug.",
      evidence: "NCI booklet: the time 'might differ depending on the policy where you receive treatment and the drugs that you receive.'",
      sources: ["nci-chemo-and-you"],
    },
  ],
  grades: [
    { claim: "Education addressing adherence in addition to standard education", grade: "conditional recommendation, very low certainty of evidence", source: "ons-oam-2022", quote: "In patients taking OAMs, the ONS Guidelines panel suggests education addressing adherence in addition to standard education rather than standard education alone (conditional recommendation, very low certainty of evidence)." },
    { claim: "Ongoing assessment of adherence", grade: "conditional recommendation, very low certainty of evidence", source: "ons-oam-2022", quote: "In patients taking OAMs, the ONS Guidelines panel suggests ongoing assessment of adherence in addition to usual care rather than usual care alone (conditional recommendation, very low certainty of evidence)." },
    { claim: "Coaching", grade: "conditional recommendation, very low certainty of evidence", source: "ons-oam-2022", quote: "In patients taking OAMs, the ONS Guidelines panel suggests coaching in addition to usual care, rather than usual care alone (conditional recommendation, very low certainty of evidence)." },
    { claim: "A structured oral anticancer medication programme", grade: "conditional recommendation, very low certainty of evidence", source: "ons-oam-2022", quote: "The ONS Guidelines panel suggests implementation of a structured OAM program rather than no structured OAM program (conditional recommendation, very low certainty of evidence)." },
    { claim: "Reminder technology", grade: "No recommendation; knowledge gap", source: "ons-oam-2022", quote: "The ONS Guidelines panel makes no recommendation for the use of technology, either interactive or noninteractive, based on a knowledge gap." },
    { claim: "Organisation policy for monitoring adherence", grade: "Standard (not graded)", source: "asco-ons-2024", quote: "The health care organization policy outlines the procedure to monitor initial and subsequent assessment and documentation of patients’ adherence to antineoplastic therapy" },
    { claim: "Home administration within the scope of the ASCO-ONS safety standards", grade: "Standards (expert panel and literature review); not graded", source: "asco-ons-2024", quote: "The standards presented here include clarification and expansion of existing standards to include home administration and other changes in processes of ordering, preparing, and administering antineoplastic therapy; the advent of immune effector cellular therapy; the importance of social determinants of health; fertility preservation; and pregnancy avoidance." },
    { claim: "Oral chemotherapy prescribed, dispensed and monitored to the same standards as parenteral chemotherapy (UK)", grade: "Not graded (position statement, 2004)", source: "bopa-oral-2004", quote: "The prescribing and dispensing of oral chemotherapy should be carried out and monitored to the same standards as those for parenteral chemotherapy." },
    { claim: "Greater risk when practitioners who are not cancer specialists prescribe, dispense or administer", grade: "Not graded (safety alert, as reported by the MHRA)", source: "mhra-dsu-2008", quote: "Risks are increased if healthcare practitioners who are not cancer specialists prescribe, dispense, or administer these medicines." },
    { claim: "Home storage, handling and disposal steps", grade: "Not graded: patient information, a teaching tool and a nursing toolkit, without a grading scheme", source: "ons-safe-handling-toolkit" },
    { claim: "Body-fluid precautions for 48 hours after a dose", grade: "Not graded (ONS toolkit, citing an ONS book)", source: "ons-safe-handling-toolkit", quote: "Family members should use separate toilets from the patient for 48 hours after HD administration to eliminate the risk of contact with contaminated body waste." },
  ],
  sources: [
    {
      key: "asco-ons-2024",
      label: "Antineoplastic Therapy Administration Safety Standards for Adult and Pediatric Oncology: ASCO-ONS Standards",
      publisher: "ASCO and the Oncology Nursing Society (JCO Oncology Practice; co-published in Oncology Nursing Forum)",
      year: 2024,
      url: "https://doi.org/10.1200/OP.24.00216",
      doi: "10.1200/OP.24.00216",
      gradingScheme: "Standards are not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "ons-oam-2022",
      label: "ONS Guidelines to Support Patient Adherence to Oral Anticancer Medications",
      publisher: "Oncology Nursing Society (Oncology Nursing Forum, Belcher et al.)",
      year: 2022,
      url: "https://doi.org/10.1188/22.ONF.279-295",
      doi: "10.1188/22.ONF.279-295",
      gradingScheme: "GRADE: recommendations are labelled strong, conditional, no recommendation or knowledge gap, each with the certainty of the evidence (here low or very low).",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "bopa-oral-2004",
      label: "Position statement on safe practice and the pharmaceutical care of patients receiving oral anticancer chemotherapy (January 2004)",
      publisher: "British Oncology Pharmacy Association (copy published by NICE with its TA100 consultation documents)",
      year: 2004,
      url: "https://www.nice.org.uk/guidance/ta100/documents/british-oncology-pharmacy-association-22",
      gradingScheme: "Position statement; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "mhra-dsu-2008",
      label: "Oral anticancer medicines: risk of incorrect dosing (Drug Safety Update, January 2008, volume 1, issue 6)",
      publisher: "Medicines and Healthcare products Regulatory Agency",
      year: 2008,
      url: "https://www.gov.uk/drug-safety-update/oral-anticancer-medicines-risk-of-incorrect-dosing",
      gradingScheme: "Regulator's report of a National Patient Safety Agency alert; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "mascc-moatt",
      label: "MASCC Teaching Tool for Patients Receiving Oral Agents for Cancer (MOATT), card format",
      publisher: "Multinational Association of Supportive Care in Cancer",
      year: 2016,
      url: "https://mascc.memberclicks.net/assets/Guidelines-Tools/moatt_cardstyle_2016_2pg.pdf",
      gradingScheme: "Teaching tool; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "xeloda-smpc",
      label: "Xeloda (capecitabine): summary of product characteristics (sections 4.2, 4.4 and 4.8) and package leaflet",
      publisher: "European Medicines Agency (EPAR product information)",
      year: 2025,
      url: "https://www.ema.europa.eu/en/documents/product-information/xeloda-epar-product-information_en.pdf",
      gradingScheme: "Product information; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "macmillan-how-chemo-given",
      label: "How chemotherapy is given",
      publisher: "Macmillan Cancer Support",
      year: 2022,
      url: "https://www.macmillan.org.uk/cancer-information-and-support/treatment/types-of-treatment/chemotherapy/how-chemotherapy-is-given",
      gradingScheme: "Patient information page; not graded. Reviewed 1 March 2022; next review was due 1 March 2025.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "acs-oral-chemo",
      label: "Getting Oral Chemotherapy",
      publisher: "American Cancer Society (with ASCO medical review)",
      year: 2025,
      url: "https://www.cancer.org/cancer/treatment-types/chemotherapy/oral-chemotherapy.html",
      gradingScheme: "Patient information page; not graded. Last revised 15 May 2025.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "acs-chemo-safety",
      label: "Chemotherapy Safety",
      publisher: "American Cancer Society (with ASCO medical review)",
      year: 2025,
      url: "https://www.cancer.org/cancer/treatment-types/chemotherapy/chemotherapy-safety.html",
      gradingScheme: "Patient information page; not graded. Last revised 15 May 2025.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "ons-safe-handling-toolkit",
      label: "Toolkit for Safe Handling of Hazardous Drugs for Nurses in Oncology",
      publisher: "Oncology Nursing Society",
      year: 2018,
      url: "https://www.ons.org/sites/default/files/2018-06/ONS_Safe_Handling_Toolkit_0.pdf",
      gradingScheme: "Nursing toolkit; recommendations are not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "nci-chemo-and-you",
      label: "Chemotherapy and You: Support for People with Cancer (NIH Publication No. 24-7157, January 2024)",
      publisher: "National Cancer Institute (US)",
      year: 2024,
      url: "https://www.cancer.gov/publications/patient-education/chemotherapy-and-you.pdf",
      gradingScheme: "Patient booklet; recommendations are not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "fda-disposal",
      label: "Disposal of Unused Medicines: What You Should Know",
      publisher: "US Food and Drug Administration",
      year: 2024,
      url: "https://www.fda.gov/drugs/safe-disposal-medicines/disposal-unused-medicines-what-you-should-know",
      gradingScheme: "Consumer guidance; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "asco-ncoda-2025",
      label: "Medically Integrated Dispensing Pharmacy: ASCO-Network for Collaborative Oncology Development & Advancement Standards Update",
      publisher: "ASCO and NCODA (JCO Oncology Practice)",
      year: 2025,
      url: "https://doi.org/10.1200/OP-25-00279",
      doi: "10.1200/OP-25-00279",
      gradingScheme: "Standards; the abstract prints no grades.",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "isopp-2022",
      label: "ISOPP Standards for the Safe Handling of Cytotoxics",
      publisher: "International Society of Oncology Pharmacy Practitioners (J Oncol Pharm Pract)",
      year: 2022,
      url: "https://doi.org/10.1177/10781552211070933",
      doi: "10.1177/10781552211070933",
      read: "not-reachable",
      accessed: "2026-11-17",
    },
  ],
  drugs: ["capecitabine", "cyclophosphamide", "etoposide"],
  technologies: ["kinase-inhibitors", "cdk46-inhibitor"],
  related: ["hazardous-drug-handling-in-clinical-areas", "dpyd-testing-before-fluoropyrimidines", "idea-acc-pharmacist-interaction-review-oral-anticancer"],
  upgrades: ["idea-upgrade-oral-anticancer-medicine-adherence-programme"],
  gaps: [
    "Every ONS adherence recommendation is conditional and rests on low or very low certainty evidence, and ONS sets no interval for adherence checks; ASCO-ONS leaves the timing to each organisation's policy.",
    "No graded guideline covers storage, handling and disposal of oral anticancer medicines at home: ASCO-ONS requires it to be taught but does not specify it, so every household step rests on patient information, a teaching tool or a nursing toolkit.",
    "On 17 November 2026 the National Patient Safety Agency's 2008 rapid response report on oral anticancer medicines could not be read (the National Archives copy answered with a human verification page), and neither its current status nor its own wording on repeat prescribing in primary care could be checked. What is said of it here rests on the MHRA's two-paragraph report in Drug Safety Update.",
    "The only UK standard read in full is BOPA's position statement of January 2004, in the copy NICE publishes; no later BOPA text on oral anticancer medicines, and no NHS England standard, was found or read, so current UK rules may differ. The sources give no UK-specific return route for leftover anticancer drugs.",
    "The ASCO and NCODA standards for dispensing oral anticancer medicines (2019) were updated in 2025; on 17 November 2026 only the abstracts could be read, so no step rests on them. The abstract of the update names drug access, patient safety, education, adherence, care coordination and waste prevention among its domains.",
    "The ASCO-ONS standards were read in the Oncology Nursing Forum co-publication (the Oncology Nursing Society's own PDF), not on the JCO Oncology Practice site, which refuses a script.",
    "The ISOPP 2022 standards, which address household safe handling, could not be read on 17 November 2026 (the publisher refused a script), and the 2018 pan-Canadian community pharmacy consensus was not found in Europe PMC.",
    "The MASCC teaching tool was read in its card format, a PDF dated September 2016; MASCC's page listing the current version refused a script, so a later version cannot be ruled out. The Macmillan page was last reviewed on 1 March 2022 and says it is being reviewed. The ONS toolkit read here is the 2018 edition; ACS cites a 2024 ONS book on safe handling that is not freely available.",
    "The 48-hour period is a general figure. ACS says some drugs pass more quickly and others take longer, and describes its precautions for traditional chemotherapy, saying targeted, hormone and immunotherapy drugs may differ; NCI leaves the length of time to the treating centre and the drug. No source read says how the precautions apply to a tablet taken every day.",
    "No source read says whether a carer or household member who is pregnant or breastfeeding should handle the tablets or body fluids; the ONS toolkit addresses pregnant staff, not families. Ask the treating team.",
    "Missed-dose and vomited-dose rules are drug-specific and come from each product's leaflet; none is reproduced here. Stop-and-call symptoms are likewise drug-specific: the capecitabine leaflet is quoted only as an example.",
    "The technologies linked to this record include CDK4/6 inhibitors, which no source read names; they fall under the targeted small-molecule agents that ASCO-ONS covers.",
  ],
});
