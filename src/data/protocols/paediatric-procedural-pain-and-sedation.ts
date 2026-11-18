import { protocol } from "./helpers";

/*
 * Pain, distress and sedation for needle procedures, lumbar punctures and bone marrow tests in children with cancer.
 *
 * First written on 11 November 2026. Second accuracy pass on 17 November 2026: every source was fetched again raw
 * with curl into a scratch directory and read as text, and every quote was checked against that text by script.
 * - Loeffen et al., Reducing pain and distress related to needle procedures in children with cancer: a clinical
 *   practice guideline (Eur J Cancer 2020): abstract only, from Europe PMC (the copy a sibling checker saved the same
 *   day), with the DOI checked at Crossref. The publisher's page answered a script with a browser check (403), the
 *   Groningen repository copy did the same, and a request to the Internet Archive was refused by the permission
 *   system, so the full text stays unread. Its individual recommendations and grades beyond those the abstract lists
 *   were not read, and what the first version said beyond the abstract has been taken out.
 * - NICE CG112, Sedation in under 19s (recommendations, overview and update information pages, HTML, full text;
 *   published 15 December 2010; the prescribing note is dated October 2018 and recommendation 1.2.3 on fasting was
 *   updated in February 2019; NICE's December 2018 surveillance found no new evidence affecting it).
 * - Children's Oncology Group nursing systematic review on the level of sedation for oncology procedures (J Pediatr
 *   Oncol Nurs 2020): now read in full, as HTML from PubMed Central with one plain request (the Europe PMC XML
 *   endpoint answered 500 and E-utilities returns only the front matter for this journal). The first version had it
 *   as an abstract only; its bone marrow recommendation is now a step.
 * - WHO hand hygiene guideline (2009): full text, the PDF from the download link on WHO's publication page (pdftotext).
 * - Added in this pass: the Dutch guideline on topical analgesia for needle procedures in children (Arch Dis Child
 *   2025; full text, Europe PMC XML), the ESAIC guideline on pre-operative fasting in children (Eur J Anaesthesiol
 *   2022; abstract only, Europe PMC) and the international consensus on fasting before procedural sedation
 *   (Anaesthesia 2020; full text, Europe PMC XML; its algorithm is a figure and was not read).
 * - The Children's Oncology Group list of endorsed supportive care guidelines was read from the copy a sibling checker
 *   saved on 16 November 2026.
 * Intrathecal chemotherapy safety (drug checks, keeping vinca alkaloids away from intrathecal drugs) is a separate
 * protocol and is not covered here. Every DOI was resolved through Europe PMC or Crossref and its title checked.
 * Quotes are copied from the raw text with line breaks joined and nothing else changed.
 */
export const paediatricProceduralPainAndSedation = protocol({
  id: "paediatric-procedural-pain-and-sedation",
  name: "Procedural pain and sedation for children with cancer: needles, lumbar punctures and marrow tests",
  aka: ["sedation for lumbar puncture in children", "general anaesthetic for LP", "needle pain in children with cancer", "numbing cream before port access", "procedural distress paediatric oncology", "bone marrow aspirate sedation"],
  domain: "paediatric",
  tldr: "Children with cancer have many needles, lumbar punctures and bone marrow tests. An international guideline says every needle procedure should use numbing cream and distraction, and every child having a lumbar puncture should be offered deep sedation or a general anaesthetic. Sedation is given by a trained team with monitoring, after the child and family are prepared for what will happen.",
  simple: "Guidelines say pain from needles and spinal taps should be prevented. Ask for numbing cream and distraction, and for a lumbar puncture, deep sedation or an anaesthetic. A trained team watches your child closely.",
  summary: "The international clinical practice guideline on needle procedures in children with cancer (Loeffen et al., Eur J Cancer 2020; GRADE, 48 randomised trials, 2,271 participants, evidence very low to moderate) makes strong recommendations for topical anaesthetics in all needle procedures, for offering deep sedation or general anaesthesia to all children undergoing lumbar puncture, for deep sedation or general anaesthesia in major procedures in children of all ages, and for hypnosis and active distraction in all needle procedures. Only its abstract could be read. A Dutch guideline (Arch Dis Child 2025) recommends EMLA for minor needle procedures, applied for at least 60 minutes (strong, very low-quality evidence), and suggests tetracaine creams only when the needle is needed within 30 to 60 minutes (weak). For bone marrow aspirates and biopsies, a Children's Oncology Group nursing review makes a strong recommendation, on moderate evidence, for moderate sedation or general anaesthesia, and found too little evidence for an overall recommendation on the level of sedation. NICE CG112 (sedation in under 19s) sets the safety frame: trained pre-sedation assessment and documented consent, psychological preparation suited to the child's developmental stage, parents offered the chance to be present if appropriate, a team with life support skills (at least one member with advanced life support skills for deep sedation), a professional trained in delivering anaesthetic agents available to give propofol, sevoflurane or opioids combined with ketamine, continuous monitoring (with capnography for deep sedation where it does not wake the child), and discharge criteria. Fasting is not needed for minimal sedation, nitrous oxide in oxygen or moderate sedation with verbal contact; for other sedation before elective procedures NICE refers to professional guidance, noting the 2-4-6 rule (2 hours for clear fluids, 4 for breast milk, 6 for solids) and the 2018 change supporting 1 hour for clear fluids. For painful procedures NICE suggests considering a local anaesthetic as well as a sedative.",
  asOf: "2026-11-17",
  setting: {
    who: ["nurse", "doctor", "anaesthetist", "patient-or-carer"],
    where: ["outpatient-clinic", "ward", "theatre", "chemotherapy-day-unit"],
  },
  population: "Children with cancer having needle procedures, lumbar punctures and major procedures (Loeffen 2020, as its abstract scopes it), and bone marrow aspirates and biopsies in paediatric oncology (Children's Oncology Group review). The Dutch topical analgesia guideline covers minor needle procedures (venepuncture, cannulation, port access) in children generally, from trials in ages 1 to 18. NICE CG112 covers sedation for diagnostic and therapeutic procedures in anyone under 19 and asks for specialist advice before sedating infants, including neonates.",
  trigger: "A needle procedure, lumbar puncture or bone marrow test is planned for a child having cancer care.",
  steps: [
    {
      action: "Use a topical anaesthetic for every needle procedure",
      why: "Children with cancer have repeated needle procedures that can cause pain and distress; the guideline's abstract names no product or application time.",
      source: "loeffen-2020",
      quote: "Strong recommendations were made for the use of topical anesthetics in all needle procedures, for offering deep sedation (DS)/general anesthesia (GA) to all children undergoing lumbar puncture, for the use of DS/ GA in major procedures in children of all ages, for the use of hypnosis in all needle procedures and for the use of active distraction in all needle procedures.",
      grade: "Strong recommendation",
    },
    {
      action: "For a minor needle procedure, apply EMLA cream or patch for at least 60 minutes; consider a tetracaine cream only when the needle is needed sooner",
      why: "The Dutch guideline judged any advantage of tetracaine creams over EMLA to be small and suggests them only when cannulation or puncture is needed within 30 to 60 minutes. Its review included trials in ages 1 to 18, and it expects EMLA to be used according to prescription.",
      source: "stavleu-2025",
      quote: "We recommend the use of EMLA in children who need to undergo a minor needle-related procedure, with minimal application duration of 60 min (strong recommendation, very low-quality evidence).",
      grade: "Strong recommendation, very low-quality evidence",
    },
    {
      action: "Use active distraction and hypnosis for every needle procedure",
      why: "The guideline recommends both psychological methods, alongside numbing cream, to reduce the pain and distress of repeated needles.",
      source: "loeffen-2020",
      grade: "Strong recommendation",
    },
    {
      action: "Offer every child having a lumbar puncture deep sedation or a general anaesthetic",
      why: "The guideline makes this a strong recommendation for all children having a lumbar puncture, and recommends deep sedation or general anaesthesia for major procedures at all ages.",
      source: "loeffen-2020",
      grade: "Strong recommendation",
    },
    {
      action: "Use moderate sedation or a general anaesthetic for bone marrow aspirates and biopsies",
      why: "This is the one recommendation the Children's Oncology Group review could make; it found too little evidence to say which level of sedation is needed for other procedures.",
      source: "cog-sedation-review-2020",
      quote: "There is a strong recommendation based on moderate level of evidence that moderate sedation or GA should be utilized for bone marrow aspirates and bone marrow biopsies in pediatric oncology care.",
      grade: "Strong recommendation, moderate level of evidence",
    },
    {
      action: "Before sedation, have a trained professional assess the child, including weight, airway, medicines and allergies, previous sedation or anaesthesia, and psychological and developmental status, and document it",
      why: "NICE asks for specialist advice before sedation where there is concern about the airway or breathing, for a child of ASA grade 3 or greater, and for infants, including neonates.",
      source: "nice-cg112",
      quote: "Ensure that trained healthcare professionals (see section 1.4) carry out pre‑sedation assessments and document the results in the healthcare record.",
    },
    {
      action: "Give the child and family spoken and written information on the sedation technique, its alternatives, risks and benefits, and record consent",
      why: "NICE asks for this information so that the child and their parents or carers can make an informed decision.",
      source: "nice-cg112",
      quote: "Obtain and document informed consent for sedation.",
    },
    {
      action: "Prepare the child psychologically: what will happen, what they will feel and how to cope, in a way suited to their developmental stage",
      why: "NICE asks staff to check that the child has understood, and to consider referral to a mental health specialist before an elective procedure for a child who is severely anxious or has a learning disability.",
      source: "nice-cg112",
      quote: "Ensure that the information is appropriate for the developmental stage of the child or young person and check that the child or young person has understood the information.",
    },
    {
      action: "Offer parents and carers the chance to be present if appropriate, with advice on their role",
      why: "NICE leaves the choice to the parent or carer and asks that those who stay are told what their part in the procedure is.",
      source: "nice-cg112",
      quote: "Offer parents and carers the opportunity to be present during sedation if appropriate. If a parent or carer decides to be present, offer them advice about their role during the procedure.",
    },
    {
      action: "Record the time of the last food and drink; for an elective procedure, fast only for deep sedation or moderate sedation without verbal contact, following professional fasting guidance",
      why: "NICE says fasting is not needed for minimal sedation, nitrous oxide in oxygen, or moderate sedation with verbal contact. Its note gives the 2-4-6 rule (2 hours for clear fluids, 4 for breast milk, 6 for solids) and the 2018 change supporting 1 hour for clear fluids.",
      source: "nice-cg112",
      quote: "Before starting sedation, confirm and record the time of last food and fluid intake in the healthcare record.",
    },
    {
      action: "Make sure the team has the right life support skills, and that a professional trained in delivering anaesthetic agents is available to give propofol, sevoflurane or opioids combined with ketamine",
      why: "NICE expects those giving sedation to be competent in its complications and their immediate management, including paediatric life support.",
      source: "nice-cg112",
      quote: "Ensure that all members of the sedation team have basic life support skills for minimal, moderate and deep sedation. At least 1 team member should have intermediate life support skills for moderate sedation and advanced life support skills for deep sedation.",
    },
    {
      action: "Clean hands before the lumbar puncture and before putting on gloves",
      why: "WHO lists lumbar puncture among tasks on clean sites where gloves are standard, and says gloves alone may not entirely prevent contamination.",
      source: "who-2009",
      quote: "For some tasks on clean sites (lumbar puncture, surgical procedures, tracheal suctioning, etc.), the use of gloves is standard procedure. In this case, hand hygiene is required before donning gloves because gloves alone may not entirely prevent contamination",
    },
    {
      action: "During deep sedation, continuously monitor depth of sedation, breathing, oxygen saturation, heart rate, three-lead ECG, pain, coping and distress; add capnography and blood pressure every 5 minutes unless that monitoring would wake the child",
      why: "NICE asks the team to interpret and respond to changes, and the person giving the sedation does nothing else.",
      source: "nice-cg112",
      quote: "The healthcare professional administering sedation should be involved only in continuously monitoring, interpreting and responding to all of the above.",
    },
    {
      action: "After the procedure, keep monitoring until the child has a patent airway, protective airway and breathing reflexes, a stable circulation and is easily roused",
      why: "These are the four conditions NICE sets for ending monitoring after sedation.",
      source: "nice-cg112",
    },
    {
      action: "Discharge only when vital signs have returned to normal, the child is awake or back to their usual level of consciousness with no risk of it falling again, and nausea, vomiting and pain are adequately managed",
      why: "NICE asks that all three criteria are met before a child goes home after sedation.",
      source: "nice-cg112",
      quote: "the child or young person is awake (or returned to baseline level of consciousness) and there is no risk of further reduced level of consciousness",
    },
  ],
  bestInClass: {
    statement: "Follow the international paediatric oncology needle-procedure guideline (Loeffen 2020): topical anaesthetic, active distraction and hypnosis for every needle procedure, deep sedation or general anaesthesia offered to every child having a lumbar puncture, and deep sedation or general anaesthesia for major procedures, all strong recommendations on very low to moderate evidence. For bone marrow aspirates and biopsies the Children's Oncology Group review recommends moderate sedation or general anaesthesia (strong, moderate evidence), which allows a lighter level than the international guideline's deep sedation for major procedures; the abstract read does not say which procedures count as major. Deliver the sedation within NICE CG112's safety frame of assessment, consent, preparation, a skilled team, continuous monitoring and discharge criteria. NICE CG112 is general, not oncology-specific, and for painful procedures where the target is minimal or moderate sedation it suggests considering nitrous oxide in oxygen and/or oral or intranasal midazolam, then ketamine or intravenous midazolam with or without fentanyl where those are unsuitable, then a specialist technique such as propofol with or without fentanyl.",
    sources: ["loeffen-2020", "cog-sedation-review-2020", "nice-cg112"],
  },
  variants: [
    {
      name: "Stepped sedation for painful procedures (NICE CG112)",
      differs: "For painful procedures where the target is minimal or moderate sedation, considers nitrous oxide in oxygen and/or oral or intranasal midazolam; where those are unsuitable, intravenous or intramuscular ketamine, or intravenous midazolam with or without fentanyl to achieve moderate sedation; where those are unsuitable, a specialist technique such as propofol with or without fentanyl. For all children having a painful procedure it says to consider a local anaesthetic as well as a sedative. No doses are given.",
      evidence: "NICE does not grade recommendations; every one of these is worded 'consider'. The guideline is for all procedures in under 19s, not oncology, and its examples are suturing a laceration and orthopaedic manipulation.",
      sources: ["nice-cg112"],
    },
    {
      name: "Level of sedation in the Children's Oncology Group nursing review",
      differs: "Makes no overall recommendation on the level of sedation for procedures in children with cancer, and recommends moderate sedation or general anaesthesia for bone marrow aspirates and biopsies. For lumbar punctures it reports mixed results for general anaesthesia against mild sedation, with some preference among children, parents and nurses for mild sedation, where the international guideline offers deep sedation or general anaesthesia to every child.",
      evidence: "Systematic review of 15 studies, rated with GRADE; overall quality of evidence moderate; one strong recommendation.",
      sources: ["cog-sedation-review-2020", "loeffen-2020"],
    },
    {
      name: "Shorter fasting times in newer anaesthetic and sedation guidance",
      differs: "NICE's note gives 2 hours for clear fluids, 4 for breast milk and 6 for solids, with clear fluids reduced to 1 hour in 2018. The European Society of Anaesthesiology and Intensive Care guideline on fasting before anaesthesia in children (2022) recommends 1 hour for clear fluids and 3 hours for breast milk. An international consensus on procedural sedation (2020) says fasting before sedation can reasonably be less restrictive than before general anaesthesia and grades fasting by aspiration risk.",
      evidence: "ESAIC reports its main recommendations as GRADE 1C or 1B; only its abstract was read. The 2020 consensus was reached by a Delphi process and carries no grades; its algorithm with the fasting times is a figure and was not read.",
      sources: ["nice-cg112", "esaic-fasting-2022", "icaps-fasting-2020"],
    },
  ],
  grades: [
    { claim: "Topical anaesthetics in all needle procedures", grade: "Strong recommendation", source: "loeffen-2020" },
    { claim: "Offer deep sedation or general anaesthesia to all children undergoing lumbar puncture", grade: "Strong recommendation", source: "loeffen-2020" },
    { claim: "Hypnosis and active distraction in all needle procedures", grade: "Strong recommendation", source: "loeffen-2020" },
    { claim: "Quality of evidence across the recommendations", grade: "very low to moderate (GRADE)", source: "loeffen-2020", quote: "Quality of evidence supporting the recommendations ranged from very low to moderate." },
    { claim: "Moderate sedation or general anaesthesia for bone marrow aspirates and biopsies", grade: "Strong recommendation, moderate level of evidence", source: "cog-sedation-review-2020", quote: "There is a strong recommendation based on moderate level of evidence that moderate sedation or GA should be utilized for bone marrow aspirates and bone marrow biopsies in pediatric oncology care." },
    { claim: "EMLA for minor needle procedures, applied for at least 60 minutes", grade: "Strong recommendation, very low-quality evidence", source: "stavleu-2025" },
    { claim: "Tetracaine creams only when cannulation or puncture is needed within 30 to 60 minutes", grade: "Weak recommendation, very low-quality evidence", source: "stavleu-2025" },
    { claim: "Clear fluids up to 1 hour and breast milk up to 3 hours before anaesthesia in children", grade: "GRADE 1C or 1B", source: "esaic-fasting-2022", quote: "Recommendations for reducing clear fluid fasting to 1 h, reducing breast milk fasting to 3 h, and allowing early postoperative feeding were the main results, with GRADE 1C or 1B evidence." },
  ],
  sources: [
    { key: "loeffen-2020", label: "Reducing pain and distress related to needle procedures in children with cancer: A clinical practice guideline", publisher: "International inter-disciplinary guideline panel (Loeffen et al.), European Journal of Cancer", year: 2020, url: "https://europepmc.org/article/MED/32302949", doi: "10.1016/j.ejca.2020.02.039", gradingScheme: "GRADE with evidence-to-decision frameworks; the abstract reports strong recommendations and evidence quality from very low to moderate.", read: "abstract", accessed: "2026-11-17" },
    { key: "stavleu-2025", label: "Topical analgesia during needle-related procedures in children: a clinical practice guideline", publisher: "Procedural Local Anesthetics Guideline Panel, Princess Máxima Center (Stavleu et al.), Archives of Disease in Childhood", year: 2025, url: "https://europepmc.org/article/MED/39933876", doi: "10.1136/archdischild-2024-326917", gradingScheme: "GRADE: 'we recommend' (strong) or 'we suggest' (weak), with the quality of evidence.", read: "full-text", accessed: "2026-11-17" },
    { key: "nice-cg112", label: "Sedation in under 19s: using sedation for diagnostic and therapeutic procedures (CG112), recommendations (published December 2010, recommendation 1.2.3 updated February 2019)", publisher: "NICE", year: 2010, url: "https://www.nice.org.uk/guidance/cg112/chapter/Recommendations", gradingScheme: "NICE does not grade recommendations; strength is in the wording ('ensure', 'consider', 'do not').", read: "full-text", accessed: "2026-11-17" },
    { key: "cog-sedation-review-2020", label: "Evidence-Based Recommendations for the Appropriate Level of Sedation to Manage Pain in Pediatric Oncology Patients Requiring Procedures: A Systematic Review From the Children's Oncology Group", publisher: "Children's Oncology Group nursing, Journal of Pediatric Oncology Nursing", year: 2020, url: "https://europepmc.org/article/MED/31303100", doi: "10.1177/1043454219858610", gradingScheme: "GRADE: quality of the body of evidence from high to very low, and a strong or weak recommendation.", read: "full-text", accessed: "2026-11-17" },
    { key: "who-2009", label: "WHO Guidelines on Hand Hygiene in Health Care", publisher: "World Health Organization", year: 2009, url: "https://www.who.int/publications/i/item/9789241597906", gradingScheme: "CDC/HICPAC categories IA, IB, IC and II.", read: "full-text", accessed: "2026-11-17" },
    { key: "esaic-fasting-2022", label: "Pre-operative fasting in children: A guideline from the European Society of Anaesthesiology and Intensive Care", publisher: "European Society of Anaesthesiology and Intensive Care (Frykholm et al.), European Journal of Anaesthesiology", year: 2022, url: "https://europepmc.org/article/MED/34857683", doi: "10.1097/EJA.0000000000001599", gradingScheme: "GRADE, printed in the abstract as 1C or 1B.", read: "abstract", accessed: "2026-11-17" },
    { key: "icaps-fasting-2020", label: "An international multidisciplinary consensus statement on fasting before procedural sedation in adults and children", publisher: "International Committee for the Advancement of Procedural Sedation (Green et al.), Anaesthesia", year: 2020, url: "https://europepmc.org/article/MED/31792941", doi: "10.1111/anae.14892", gradingScheme: "Consensus reached by a Delphi process; the recommendations carry no grades.", read: "full-text", accessed: "2026-11-17" },
  ],
  upgrades: [],
  gaps: [
    "The 2020 international guideline was read only as an abstract, so its weak recommendations, its advice on specific drugs, which procedures it counts as major and its grades for each strong recommendation are not given here. On 17 November 2026 the publisher's page answered a script with a browser check, a university repository copy did the same, and a request to the Internet Archive was refused, so the full text was not read.",
    "The Children's Oncology Group nursing review was read in full on 17 November 2026. It makes one recommendation, on bone marrow aspirates and biopsies, and says there was not enough evidence for an overall recommendation on the level of sedation. The doses in its tables are those the 15 studies used, not recommendations, and are not repeated here.",
    "No recommendation read sets a dose for a sedative, an analgesic or a topical anaesthetic in children with cancer, an age limit for a numbing cream, or the use of sucrose for infants; none names play specialists. These come from local protocols and product licences. NICE notes that in October 2018 no drug had a UK marketing authorisation specifically for sedation in all ages under 19.",
    "The fasting times here are those printed in NICE's note and in the abstract of the 2022 European guideline, which is about anaesthesia, not sedation, and was not read in full. The 2020 international consensus on fasting before procedural sedation gives its times in a figure that could not be read as text, and has a published correction that was not read. NICE and the European guideline differ on breast milk (4 hours and 3 hours).",
    "The Dutch topical analgesia guideline (2025) compares EMLA with tetracaine creams only, for minor needle procedures in children generally; its review included only trials in ages 1 to 18, so it does not settle what to use in babies.",
    "A 2022 expert consensus guideline from the Children's Hospital of Philadelphia on preparing children with cancer for general anaesthesia (J Pediatr Hematol Oncol) was seen only as an abstract, which states none of its recommendations.",
    "The Children's Oncology Group lists its endorsed guideline on atraumatic (pencil-point) needles for lumbar puncture as archived in August 2024, and its list of endorsed supportive care guidelines, as saved on 16 November 2026, has no topic on procedural pain or sedation.",
    "Intrathecal chemotherapy safety, including the separation of vinca alkaloids from intrathecal drugs, is not covered by this protocol.",
  ],
  institutions: ["nice", "who"],
  companies: ["childrens-oncology-group"],
  cancers: ["childhood-cancers", "all-leukemia"],
  drugs: ["ketamine", "midazolam", "propofol"],
  technologies: ["implanted-ports"],
  terms: ["intrathecal-therapy"],
  related: ["hand-hygiene-in-cancer-care", "implanted-port-access-and-care"],
  sections: ["supportive-care"],
  tags: ["protocol", "paediatric", "procedural-pain", "sedation"],
});
