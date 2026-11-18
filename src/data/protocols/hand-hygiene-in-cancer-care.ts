import { protocol } from "./helpers";

/*
 * Hand hygiene for staff, patients, families and visitors in cancer care: the WHO five moments and when soap and water
 * is needed instead of alcohol rub.
 *
 * First written on 11 November 2026. Second accuracy pass on 17 November 2026: every claim re-read against raw text.
 * - WHO Guidelines on Hand Hygiene in Health Care (2009): full text of the PDF (pdftotext), a copy another checker
 *   fetched from WHO the same day, re-used. The PDF is set in two columns, so quotes are taken only from passages that
 *   read continuously in the extracted text. The durations come from the captions of Figures II.1 and II.2.
 * - NICE CG139, recommendations page and update information (HTML as text, copies another checker fetched from
 *   nice.org.uk the same day): published March 2012, last updated February 2017, a minor change in July 2023.
 * - Dutch Children's Oncology Group guideline on daily-life restrictions (Support Care Cancer 2024, PMC11162397), the
 *   Children's Oncology Group endorsement of it (PDF, version date 28 April 2025) and the CDC/IDSA/ASBMT HCT
 *   guideline (2009, PMC3103296): full texts, copies another checker fetched the same day from Europe PMC and the
 *   Children's Oncology Group, re-used. DOIs checked against the saved Crossref and Europe PMC records.
 * - CDC's patient page on preventing infections during cancer treatment: one request on 17 November 2026 returned
 *   HTTP 403, so it is still not read.
 * What changed in the second pass: the step on teaching patients quoted a NICE recommendation from the urinary
 * catheter section and now quotes the general one; the visitor step now quotes the graded sentence (BIII) and says it
 * is written for transplant centres; the surroundings step now rests on WHO's graded indication; reasons that no
 * source states were reworded to what the sources say; the endorsement by the Children's Oncology Group now has its
 * source.
 * Quotes are copied from the raw text with line breaks joined and nothing else changed; where a sentence ends in a
 * reference list, the quote stops before it. All quotes were checked by script against the saved texts.
 */
export const handHygieneInCancerCare = protocol({
  id: "hand-hygiene-in-cancer-care",
  name: "Hand hygiene in cancer care: staff, patients, families and visitors",
  aka: ["WHO five moments for hand hygiene", "hand washing during chemotherapy", "alcohol hand rub", "hand decontamination", "bare below the elbows", "clean hands"],
  domain: "infection-prevention",
  tldr: "Clean hands are the mainstay of preventing infection in hospital. Staff clean their hands at five set moments around every patient, usually with alcohol rub, and with soap and water when hands are dirty or when a germ that causes diarrhoea, such as C. difficile, may be present. Patients, families and visitors clean their hands too, and are told they have a part in keeping staff to the standard.",
  simple: "Clean your hands well, and expect everyone who cares for you or your child to do the same. Use soap and water if hands look dirty or someone has an illness that causes diarrhoea.",
  summary: "The WHO 2009 guideline (CDC/HICPAC categories) is the international guideline, and NICE CG139 is NICE's guideline for primary and community care. Alcohol-based handrub is the preferred means of routine hand antisepsis when hands are not visibly soiled (WHO IA; NICE 'preferably with a handrub'); wash with soap and water when hands are visibly dirty or soiled with body fluids (IB), after the toilet (II), and when exposure to spore-forming organisms such as Clostridioides difficile is strongly suspected or proven (IB). NICE says liquid soap and water must be used where alcohol-resistant organisms may spread, naming C. difficile and other organisms that cause diarrhoeal illness. WHO's five moments: before touching a patient, before a clean or aseptic procedure, after body fluid exposure risk, after touching a patient and after touching the patient's surroundings. Its graded indications are before and after touching the patient (IB), before handling an invasive device whether or not gloves are used (IB), after contact with body fluids, mucous membranes, non-intact skin or wound dressings (IA), after contact with objects in the patient's immediate vicinity (IB), and after removing sterile (II) or non-sterile (IB) gloves. Gloves do not replace hand hygiene (IB). WHO's technique figures give 20 to 30 seconds for the whole handrub procedure and 40 to 60 seconds for the whole handwash; NICE asks for vigorous rubbing for at least 10 to 15 seconds when washing. Staff do not wear artificial nails with direct patient contact (WHO IA) and are bare below the elbow (NICE). Promotion should be multimodal, with monitoring and feedback (IA). For families, the Dutch paediatric oncology guideline makes hand hygiene by patients, caregivers and medical personnel a strong good practice statement; NICE asks that patients and carers are educated about the benefits, techniques and timing of hand decontamination and their role in maintaining staff standards; the transplant (HCT) guideline says centre policies should encourage visitors to clean their hands before and after each visit (BIII) and that recipients and household contacts should be educated about hand hygiene in hospital and after discharge (BIII).",
  asOf: "2026-11-17",
  setting: {
    who: ["nurse", "doctor", "patient-or-carer", "multidisciplinary-team"],
    where: ["ward", "chemotherapy-day-unit", "outpatient-clinic", "home", "community"],
  },
  population: "Everyone who has contact with a person having cancer treatment. None of the guidelines is written for cancer care as such: WHO covers health-care workers in any health-care setting, NICE covers primary and community care, the Dutch guideline covers children with cancer, their caregivers and staff, and the HCT guideline covers transplant recipients, their household contacts, staff and visitors to transplant centres.",
  steps: [
    {
      action: "Use alcohol-based handrub as the usual way to clean hands when they are not visibly dirty",
      why: "WHO describes handrubbing as faster, more effective and better tolerated by the skin than washing with soap and water.",
      source: "who-2009",
      quote: "Use an alcohol-based handrub as the preferred means for routine hand antisepsis in all other clinical situations described in items D(a) to D(f) listed below, if hands are not visibly soiled (IA).",
      grade: "IA",
    },
    {
      action: "Wash with soap and water when hands are visibly dirty or soiled with body fluids, and after using the toilet",
      why: "Alcohols are not good cleansing agents, so WHO does not recommend them when hands are dirty or visibly contaminated with material such as blood.",
      source: "who-2009",
      quote: "Wash hands with soap and water when visibly dirty or visibly soiled with blood or other body fluids (IB) or after using the toilet (II).",
      grade: "IB (soiled); II (after the toilet)",
    },
    {
      action: "Wash with soap and water rather than using alcohol rub when exposure to C. difficile or another spore-forming germ is strongly suspected or proven; NICE says the same for other germs that cause diarrhoeal illness",
      why: "Alcohol rubs do not reliably kill spores; the friction of washing with soap and water may help to remove them from the hands.",
      source: "who-2009",
      quote: "If exposure to potential spore-forming pathogens is strongly suspected or proven, including outbreaks of Clostridium difficile, hand washing with soap and water is the preferred means (IB).",
      grade: "IB",
    },
    {
      action: "Clean hands before and after touching the patient",
      why: "Cleaning hands before touching protects the patient from germs carried on the hands; cleaning them afterwards limits the spread of that patient's germs to the rest of the unit and protects staff.",
      source: "who-2009",
      quote: "before and after touching the patient (IB);",
      grade: "IB",
    },
    {
      action: "Clean hands immediately before any clean or aseptic task, such as opening a line, giving an injection or a lumbar puncture, and before putting on gloves",
      why: "WHO says these infections mostly start from germs the patient already carries, which hands can move to a critical site from the last surface touched; gloves alone may not entirely prevent contamination.",
      source: "who-2009",
      quote: "For some tasks on clean sites (lumbar puncture, surgical procedures, tracheal suctioning, etc.), the use of gloves is standard procedure. In this case, hand hygiene is required before donning gloves because gloves alone may not entirely prevent contamination",
    },
    {
      action: "Clean hands after any contact with body fluids, mucous membranes, broken skin or wound dressings",
      why: "Hands can pick up germs from body fluids even without visible soiling, which puts staff at risk, and can carry them to a clean body site on the same patient.",
      source: "who-2009",
      quote: "after contact with body fluids or excretions, mucous membranes, non-intact skin, or wound dressings (IA);",
      grade: "IA",
    },
    {
      action: "Clean hands after touching objects in the patient's immediate surroundings, including medical equipment, and after taking off gloves",
      why: "Touching things around the patient contaminates the hands even without touching the patient; germs can also reach the hands through small defects in gloves or as gloves are taken off.",
      source: "who-2009",
      quote: "after contact with inanimate surfaces and objects (including medical equipment) in the immediate vicinity of the patient (IB);",
      grade: "IB (surroundings); after removing gloves, II (sterile) or IB (non-sterile)",
    },
    {
      action: "Do not treat gloves as a substitute for hand hygiene",
      why: "WHO cites studies in which gloves did not fully protect the hands of staff from contamination.",
      source: "who-2009",
      quote: "The use of gloves does not replace the need for hand hygiene by either handrubbing or handwashing (IB).",
      grade: "IB",
    },
    {
      action: "Rub until the hands are dry, covering every surface: 20 to 30 seconds for the whole handrub procedure, 40 to 60 seconds for a whole handwash (WHO technique figures)",
      why: "NICE asks for particular attention to the fingertips, the thumbs and between the fingers; WHO notes that wet hands more readily pick up and spread germs.",
      source: "who-2009",
      quote: "Apply a palmful of alcohol-based handrub and cover all surfaces of the hands. Rub hands until dry (IB).",
      grade: "IB",
    },
    {
      action: "For staff giving direct care, be bare below the elbow: no false nails, nail polish, wristwatch or stoned rings, with wrist and hand jewellery removed, nails short and clean, and cuts covered with waterproof dressings",
      why: "NICE asks this so that hands can be decontaminated throughout clinical work. WHO reports that staff with artificial nails are more likely to carry certain germs on their fingertips, before and after handwashing.",
      source: "nice-cg139",
      quote: "being bare below the elbow when delivering direct patient care (for the purposes of this guideline, bare below the elbow means: not wearing false nails, nail polish, a wristwatch or stoned rings; wearing short-sleeved garments or being able to roll or push up sleeves)",
    },
    {
      action: "Educate patients and carers about the benefits, the correct technique and the timing of hand cleaning, when to use soap and water or handrub, and their role in keeping up the standard of staff hand cleaning",
      why: "NICE lists this among its general advice for all care in primary and community settings, so that patients and carers know when and how to clean their own hands and what to expect of staff.",
      source: "nice-cg139",
      quote: "the correct techniques and timing of hand decontamination",
    },
    {
      action: "In a transplant centre, encourage every visitor to clean their hands before and after each visit",
      why: "Visitors can bring in infections that spread directly or through the surroundings.",
      source: "hct-2009",
      quote: "HCT center policies should encourage visitors to perform hand hygiene before and after each patient visit (BIII).",
      grade: "BIII",
    },
    {
      action: "Run hand hygiene as a multimodal programme, with monitoring of staff adherence and feedback",
      why: "WHO asks programmes to focus on the factors found to influence behaviour, and not solely on the type of hand hygiene product, and to include education and senior executive support.",
      source: "who-2009",
      quote: "Monitor HCWs’ adherence to recommended hand hygiene practices and provide them with performance feedback (IA).",
      grade: "IA",
    },
  ],
  bestInClass: {
    statement: "The WHO 2009 guideline, with its five moments, alcohol handrub as the default (IA) and soap and water for visible soiling (IB) or spore-forming organisms such as C. difficile (IB), is the international guideline, and NICE CG139 gives matching advice for primary and community care. They differ in detail: WHO grades each recommendation with CDC/HICPAC categories and gives 20 to 30 seconds for the handrub procedure and 40 to 60 seconds for the handwash; NICE does not grade, lists five circumstances of its own, asks for at least 10 to 15 seconds of vigorous rubbing when washing, says soap and water must be used for visible soiling and for alcohol-resistant organisms where WHO calls it the preferred means for spores, and adds bare below the elbow. For families of children with cancer, the Dutch guideline (2024, endorsed by the Children's Oncology Group Supportive Care Guideline Committee in March 2025) makes hand hygiene its one good practice statement, graded strong; the transplant guideline (2009) grades hand hygiene by staff and others in contact with recipients AIII.",
    sources: ["who-2009", "nice-cg139", "dcog-2024", "cog-lifestyles-2025", "hct-2009"],
  },
  variants: [
    {
      name: "Handwashing time (NICE CG139)",
      differs: "Asks that hands be rubbed together vigorously for a minimum of 10 to 15 seconds during a handwash, against WHO's 40 to 60 seconds for the whole handwashing procedure.",
      evidence: "NICE does not grade; the wording dates from 2003. WHO gives its durations in the technique figures rather than as graded recommendations.",
      sources: ["nice-cg139", "who-2009"],
    },
    {
      name: "Patients asking staff to clean their hands",
      differs: "WHO describes a hospital campaign that invited patients to ask health-care workers to clean their hands, and asks governments to encourage partnerships between patients, families and health-care workers to promote hand hygiene. NICE asks that patients and carers are educated about their role in maintaining the standard of staff hand decontamination.",
      evidence: "WHO Category II for the partnerships. WHO adds that one campaign found fewer than a third of patients and the public wanted to be involved, and that whether reminders from patients affect the relationship with caregivers remains to be assessed. NICE does not grade.",
      sources: ["who-2009", "nice-cg139"],
    },
  ],
  grades: [
    { claim: "Alcohol-based handrub preferred for routine hand antisepsis when hands are not visibly soiled", grade: "IA", source: "who-2009" },
    { claim: "Hand hygiene before handling an invasive device, with or without gloves", grade: "IB", source: "who-2009", quote: "before handling an invasive device for patient care, regardless of whether or not gloves are used (IB);" },
    { claim: "No artificial fingernails or extenders with direct patient contact", grade: "IA", source: "who-2009", quote: "Do not wear artificial fingernails or extenders when having direct contact with patients (IA)." },
    { claim: "Multifaceted and multimodal hand hygiene promotion with education and senior executive support", grade: "IA", source: "who-2009", quote: "The strategy should be multifaceted and multimodal and include education and senior executive support for implementation.(IA)" },
    { claim: "Hand hygiene by patients, caregivers and medical personnel (children with cancer)", grade: "STRONG recommendation, GOOD PRACTICE STATEMENT", source: "dcog-2024", quote: "Proper hand hygiene should be performed by patients, caregivers, and medical personnel (STRONG recommendation, GOOD PRACTICE STATEMENT)." },
    { claim: "Health-care workers and others in contact with HCT recipients follow hand hygiene", grade: "AIII", source: "hct-2009", quote: "recipients should routinely follow appropriate hand hygiene practices to avoid exposing recipients to bacterial pathogens (AIII)" },
    { claim: "HCT recipients, candidates and household contacts educated about hand hygiene in hospital and after discharge", grade: "BIII", source: "hct-2009", quote: "HCT recipients and candidates and their household contacts should be educated about the importance of hand hygiene during the HCT hospitalization and after hospital discharge (BIII)." },
  ],
  sources: [
    { key: "who-2009", label: "WHO Guidelines on Hand Hygiene in Health Care: First Global Patient Safety Challenge, Clean Care is Safer Care", publisher: "World Health Organization", year: 2009, url: "https://www.who.int/publications/i/item/9789241597906", gradingScheme: "CDC/HICPAC categories as adapted by WHO: IA (strongly recommended, strongly supported by well-designed studies), IB (strongly recommended, some studies and a strong theoretical rationale), IC (required by regulation or standard), II (suggested).", read: "full-text", accessed: "2026-11-17" },
    { key: "nice-cg139", label: "Healthcare-associated infections: prevention and control in primary and community care (CG139), recommendations (published March 2012, last updated February 2017)", publisher: "NICE", year: 2012, url: "https://www.nice.org.uk/guidance/cg139/chapter/Recommendations", gradingScheme: "NICE does not grade recommendations; each is tagged with the year it was written, reviewed or amended ([2003], [2012], [new 2012]).", read: "full-text", accessed: "2026-11-17" },
    { key: "dcog-2024", label: "Less restrictions in daily life: a clinical practice guideline for children with cancer", publisher: "Dutch Children's Oncology Group (DCOG), Supportive Care in Cancer", year: 2024, url: "https://europepmc.org/article/PMC/PMC11162397", doi: "10.1007/s00520-024-08537-9", gradingScheme: "GRADE: STRONG or WEAK with quality of evidence, EXPERT opinion, or GOOD PRACTICE STATEMENT.", read: "full-text", accessed: "2026-11-17" },
    { key: "cog-lifestyles-2025", label: "Less restrictions in daily life for children with cancer (COG endorsement, version date 28 April 2025)", publisher: "Children's Oncology Group", year: 2025, url: "https://childrensoncologygroup.org/wp-content/uploads/2026/05/COG_SC_Lifestyles_Guideline_Document_28APRIL2025-new-logo.pdf", gradingScheme: "Endorses the source guideline's GRADE recommendations and its good practice statement on hand hygiene.", read: "full-text", accessed: "2026-11-17" },
    { key: "hct-2009", label: "Guidelines for preventing infectious complications among hematopoietic cell transplantation recipients: a global perspective", publisher: "CDC, IDSA, ASBMT and international partners (Biology of Blood and Marrow Transplantation)", year: 2009, url: "https://europepmc.org/article/PMC/PMC3103296", doi: "10.1016/j.bbmt.2009.06.019", gradingScheme: "Strength A to E with quality I to III, printed together, for example AIII.", read: "full-text", accessed: "2026-11-17" },
  ],
  upgrades: [],
  gaps: [
    "No guideline read is specific to hand hygiene in cancer care; the measures are general ones applied to people with low immunity. The visitor and household recommendations are written for transplant centres, and NICE CG139 for primary and community care.",
    "The WHO guideline dates from 2009. On 17 November 2026 WHO's publication page still listed that edition; WHO's later hand hygiene materials were not read.",
    "The WHO durations (20 to 30 seconds and 40 to 60 seconds) are printed in the captions of its technique figures and carry no grade. The NICE handwashing wording is tagged 2003.",
    "The Children's Oncology Group endorsement words the good practice statement as hand hygiene by parents, caregivers and medical personnel, where the Dutch guideline says patients, caregivers and medical personnel.",
    "CDC's patient page on preventing infection during cancer treatment was not read: on 17 November 2026 the CDC site answered a single scripted request with HTTP 403, so its advice to patients is not reflected here.",
    "There is no graded recommendation on how often patients and families should clean their hands at home; the paediatric guideline's statement is a good practice statement.",
  ],

  institutions: ["who", "nice"],
  companies: ["childrens-oncology-group"],
  cancers: ["childhood-cancers"],
  terms: ["neutropenia", "central-venous-access"],
  related: ["central-line-maintenance-bundle", "neutropenic-precautions-and-daily-life", "paediatric-clostridioides-difficile"],
  sections: ["supportive-care"],
  tags: ["protocol", "hand-hygiene"],
});
