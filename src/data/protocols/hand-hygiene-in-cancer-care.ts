import { protocol } from "./helpers";

/*
 * Hand hygiene for staff, patients, families and visitors in cancer care: the WHO five moments and when soap and water
 * is needed instead of alcohol rub.
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - WHO Guidelines on Hand Hygiene in Health Care (2009): full text, the PDF from WHO IRIS (pdftotext). The WHO
 *   publication page lists this 2009 edition; no later edition of the health-care guideline was found there. The PDF
 *   is set in two columns, so quotes are taken only from passages that read continuously in the extracted text.
 * - NICE CG139, recommendations page (HTML, full text): hand decontamination, bare below the elbows, patient and carer
 *   education.
 * - Dutch Children's Oncology Group guideline on daily-life restrictions (Support Care Cancer 2024, PMC11162397) and
 *   the CDC/IDSA/ASBMT HCT guideline (2009, PMC3103296): full text, for families and visitors.
 * - CDC's patient page on preventing infections during cancer treatment: not fetched for this protocol, since the CDC
 *   site refused scripted requests for its catheter guideline the same day.
 * Quotes are copied from the raw text with line breaks joined and nothing else changed; where a sentence ends in a
 * reference list, the quote stops before it.
 */
export const handHygieneInCancerCare = protocol({
  id: "hand-hygiene-in-cancer-care",
  name: "Hand hygiene in cancer care: staff, patients, families and visitors",
  aka: ["WHO five moments for hand hygiene", "hand washing during chemotherapy", "alcohol hand rub", "hand decontamination", "bare below the elbows", "clean hands"],
  domain: "infection-prevention",
  tldr: "Clean hands are the single most important way to stop infections spreading to someone whose immunity is low. Staff clean their hands at five set moments around every patient, usually with alcohol rub, and with soap and water when hands are dirty or when there is diarrhoea such as C. difficile. Patients, families and visitors should clean their hands too, and ask staff to if they have not.",
  simple: "Wash or rub your hands often, and ask everyone who touches you or your child to do the same. Use soap and water if hands look dirty or someone has diarrhoea.",
  summary: "The WHO 2009 guideline (CDC/HICPAC categories) is the international standard, and NICE CG139 the UK one for community care. Alcohol-based handrub is the preferred means of routine hand antisepsis when hands are not visibly soiled (WHO IA; NICE 'preferably with a handrub'); wash with soap and water when hands are visibly dirty or soiled with body fluids (IB), after the toilet (II), and when spore-forming organisms such as Clostridioides difficile are suspected or proven (IB). WHO's five moments: before touching a patient, before a clean or aseptic procedure (including handling an invasive device such as a central line, whether or not gloves are worn, IB), after body fluid exposure risk (IA), after touching a patient (IB) and after touching the patient's surroundings (IB); also after removing gloves. Gloves do not replace hand hygiene (IB). Handrub takes 20 to 30 seconds and handwashing 40 to 60 seconds (WHO); NICE asks for vigorous rubbing for at least 10 to 15 seconds when washing. Staff do not wear artificial nails with direct patient contact (WHO IA) and are bare below the elbows (NICE). Programmes should be multimodal with monitoring and feedback (IA). For families, the Dutch paediatric oncology guideline makes hand hygiene by patients, carers and staff a strong good practice statement; NICE asks that patients and carers are taught hand decontamination before discharge; the HCT guideline asks all visitors to clean hands before and after visits.",
  asOf: "2026-11-11",
  setting: {
    who: ["nurse", "doctor", "patient-or-carer", "multidisciplinary-team"],
    where: ["ward", "chemotherapy-day-unit", "outpatient-clinic", "home", "community"],
  },
  population: "Everyone who has contact with a person having cancer treatment: health-care workers in any setting (WHO, NICE), and patients, families and visitors at home and in hospital, including children with cancer (Dutch guideline) and transplant recipients (HCT guideline).",
  steps: [
    {
      action: "Use alcohol-based handrub as the usual way to clean hands when they are not visibly dirty",
      why: "Alcohol rub kills more germs, faster, than soap and water, and is quicker to use at the bedside.",
      source: "who-2009",
      quote: "Use an alcohol-based handrub as the preferred means for routine hand antisepsis in all other clinical situations described in items D(a) to D(f) listed below, if hands are not visibly soiled (IA).",
      grade: "IA",
    },
    {
      action: "Wash with soap and water when hands are visibly dirty or soiled with body fluids, and after using the toilet",
      why: "Alcohol does not cut through dirt or body fluids; washing removes them.",
      source: "who-2009",
      quote: "Wash hands with soap and water when visibly dirty or visibly soiled with blood or other body fluids (IB) or after using the toilet (II).",
      grade: "IB (soiled); II (after the toilet)",
    },
    {
      action: "Use soap and water, not alcohol rub, when C. difficile or another spore-forming germ is suspected or confirmed, or there is infectious diarrhoea",
      why: "Alcohol does not kill the spores of C. difficile; washing removes them from the hands.",
      source: "who-2009",
      quote: "If exposure to potential spore-forming pathogens is strongly suspected or proven, including outbreaks of Clostridium difficile, hand washing with soap and water is the preferred means (IB).",
      grade: "IB",
    },
    {
      action: "Clean hands before and after touching the patient",
      why: "This stops germs passing from staff to patient, and from one patient to the next.",
      source: "who-2009",
      quote: "before and after touching the patient (IB);",
      grade: "IB",
    },
    {
      action: "Clean hands immediately before any clean or aseptic task, such as opening a line, giving an injection or a lumbar puncture, and before putting on gloves",
      why: "Most line and procedure infections come from the patient's own skin germs or the last surface touched; gloves alone may not prevent contamination.",
      source: "who-2009",
      quote: "For some tasks on clean sites (lumbar puncture, surgical procedures, tracheal suctioning, etc.), the use of gloves is standard procedure. In this case, hand hygiene is required before donning gloves because gloves alone may not entirely prevent contamination",
    },
    {
      action: "Clean hands after any contact with body fluids, mucous membranes, broken skin or wound dressings",
      why: "Hands can pick up germs from body fluids even without visible soiling, and carry them to a clean body site or to the next surface.",
      source: "who-2009",
      quote: "after contact with body fluids or excretions, mucous membranes, non-intact skin, or wound dressings (IA);",
      grade: "IA",
    },
    {
      action: "Clean hands after touching anything in the patient's immediate surroundings, including equipment, and after taking off gloves",
      why: "Bed rails, pumps and tables near the patient carry their germs; gloves can have tiny holes and hands are contaminated when they come off.",
      source: "nice-cg139",
      quote: "immediately after any other activity or contact with a patient's surroundings that could potentially result in hands becoming contaminated",
    },
    {
      action: "Do not treat gloves as a substitute for hand hygiene",
      why: "Gloves reduce but do not stop contamination of the hands.",
      source: "who-2009",
      quote: "The use of gloves does not replace the need for hand hygiene by either handrubbing or handwashing (IB).",
      grade: "IB",
    },
    {
      action: "Rub until the hands are dry, covering every surface: about 20 to 30 seconds with handrub, 40 to 60 seconds for a full handwash",
      why: "Missed areas, such as fingertips and thumbs, and wet hands are where germs survive.",
      source: "who-2009",
      quote: "Apply a palmful of alcohol-based handrub and cover all surfaces of the hands. Rub hands until dry (IB).",
      grade: "IB",
    },
    {
      action: "For staff, be bare below the elbows: no false nails, nail polish, wristwatch or stoned rings, with nails short and cuts covered",
      why: "Nails, jewellery and sleeves stop the hands and wrists being cleaned properly and harbour germs.",
      source: "nice-cg139",
      quote: "being bare below the elbow when delivering direct patient care (for the purposes of this guideline, bare below the elbow means: not wearing false nails, nail polish, a wristwatch or stoned rings; wearing short-sleeved garments or being able to roll or push up sleeves)",
    },
    {
      action: "Teach patients and carers how and when to clean their hands before they go home",
      why: "Most cancer treatment is given as an outpatient, so families do much of the care, including line care, at home.",
      source: "nice-cg139",
      quote: "Patients and carers should be educated about and trained in techniques of hand decontamination, insertion of intermittent catheters where applicable, and catheter management before discharge from hospital.",
    },
    {
      action: "Ask every visitor to clean their hands before and after the visit",
      why: "Visitors can bring germs that are harmless to them and serious to someone with low immunity.",
      source: "hct-2009",
      quote: "All visitors should perform hand hygiene before and after visits.",
    },
    {
      action: "Run hand hygiene as a multimodal programme, with monitoring of staff adherence and feedback",
      why: "Products alone do not change behaviour; education, leadership, reminders and feedback do.",
      source: "who-2009",
      quote: "Monitor HCWs’ adherence to recommended hand hygiene practices and provide them with performance feedback (IA).",
      grade: "IA",
    },
  ],
  bestInClass: {
    statement: "The WHO 2009 guideline, with its five moments, alcohol handrub as the default (IA) and soap and water for visible soiling (IB) or spore-forming organisms such as C. difficile (IB), is the international standard and is reflected in NICE CG139 for the UK. The two differ only in detail: WHO grades each recommendation with CDC/HICPAC categories and gives 20 to 30 seconds for handrub and 40 to 60 seconds for handwashing; NICE does not grade, describes five equivalent circumstances, asks for at least 10 to 15 seconds of vigorous rubbing when washing, and adds bare below the elbows. For families of children with cancer, the Dutch guideline (2024, endorsed by the Children's Oncology Group) makes hand hygiene by patients, carers and staff the one strong good practice statement among its daily-life recommendations.",
    sources: ["who-2009", "nice-cg139", "dcog-2024", "hct-2009"],
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
      differs: "Some hospitals invite patients and families to remind staff to clean their hands. WHO asks governments to encourage partnerships between patients, families and health-care workers to promote hand hygiene.",
      evidence: "WHO Category II.",
      sources: ["who-2009"],
    },
  ],
  grades: [
    { claim: "Alcohol-based handrub preferred for routine hand antisepsis", grade: "IA", source: "who-2009" },
    { claim: "Hand hygiene before handling an invasive device, with or without gloves", grade: "IB", source: "who-2009", quote: "before handling an invasive device for patient care, regardless of whether or not gloves are used (IB);" },
    { claim: "No artificial fingernails or extenders with direct patient contact", grade: "IA", source: "who-2009", quote: "Do not wear artificial fingernails or extenders when having direct contact with patients (IA)." },
    { claim: "Multimodal hand hygiene promotion with education and senior support", grade: "IA", source: "who-2009" },
    { claim: "Hand hygiene by patients, caregivers and medical personnel (children with cancer)", grade: "STRONG recommendation, GOOD PRACTICE STATEMENT", source: "dcog-2024", quote: "Proper hand hygiene should be performed by patients, caregivers, and medical personnel (STRONG recommendation, GOOD PRACTICE STATEMENT)." },
    { claim: "Health-care workers and others in contact with HCT recipients follow hand hygiene", grade: "AIII", source: "hct-2009" },
  ],
  sources: [
    { key: "who-2009", label: "WHO Guidelines on Hand Hygiene in Health Care: First Global Patient Safety Challenge, Clean Care is Safer Care", publisher: "World Health Organization", year: 2009, url: "https://www.who.int/publications/i/item/9789241597906", gradingScheme: "CDC/HICPAC categories as adapted by WHO: IA (strongly recommended, strongly supported by well-designed studies), IB (strongly recommended, some studies and a strong theoretical rationale), IC (required by regulation or standard), II (suggested).", read: "full-text", accessed: "2026-11-11" },
    { key: "nice-cg139", label: "Healthcare-associated infections: prevention and control in primary and community care (CG139), recommendations", publisher: "NICE", year: 2012, url: "https://www.nice.org.uk/guidance/cg139/chapter/Recommendations", gradingScheme: "NICE does not grade recommendations; each is tagged with the year it was written or amended.", read: "full-text", accessed: "2026-11-11" },
    { key: "dcog-2024", label: "Less restrictions in daily life: a clinical practice guideline for children with cancer", publisher: "Dutch Children's Oncology Group (DCOG), Supportive Care in Cancer", year: 2024, url: "https://europepmc.org/article/PMC/PMC11162397", doi: "10.1007/s00520-024-08537-9", gradingScheme: "GRADE: STRONG or WEAK with quality of evidence, EXPERT opinion, or GOOD PRACTICE STATEMENT.", read: "full-text", accessed: "2026-11-11" },
    { key: "hct-2009", label: "Guidelines for preventing infectious complications among hematopoietic cell transplantation recipients: a global perspective", publisher: "CDC, IDSA, ASBMT and international partners (Biology of Blood and Marrow Transplantation)", year: 2009, url: "https://europepmc.org/article/PMC/PMC3103296", doi: "10.1016/j.bbmt.2009.06.019", gradingScheme: "Strength A to E with quality I to III, printed together, for example AIII.", read: "full-text", accessed: "2026-11-11" },
  ],
  upgrades: [],
  gaps: [
    "No guideline read is specific to hand hygiene in cancer care; the measures are general ones applied to people with low immunity.",
    "The WHO guideline dates from 2009 and its evidence base has not been re-graded since; WHO's later hand hygiene materials were not read.",
    "CDC's patient page on preventing infection during cancer treatment was not read, so its advice to patients is not reflected here.",
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
