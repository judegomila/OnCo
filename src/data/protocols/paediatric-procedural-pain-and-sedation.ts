import { protocol } from "./helpers";

/*
 * Pain, distress and sedation for needle procedures, lumbar punctures and bone marrow tests in children with cancer.
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - Loeffen et al., Reducing pain and distress related to needle procedures in children with cancer: a clinical
 *   practice guideline (Eur J Cancer 2020): abstract only, Europe PMC; not open access. Its individual recommendations
 *   and grades beyond those the abstract lists were not read.
 * - NICE CG112, Sedation in under 19s: using sedation for diagnostic and therapeutic procedures (recommendations page,
 *   HTML, full text; published 2010, with October 2018 prescribing and fasting notes).
 * - Children's Oncology Group nursing systematic review on the level of sedation for oncology procedures (J Pediatr
 *   Oncol Nurs 2020): abstract only; it does not state its recommendation in the abstract.
 * - WHO hand hygiene guideline (2009), for hand hygiene before a lumbar puncture: full text.
 * Intrathecal chemotherapy safety (drug checks, keeping vinca alkaloids away from intrathecal drugs) is a separate
 * protocol and is not covered here. Every DOI was resolved through Europe PMC and its title checked. Quotes are copied
 * from the raw text with line breaks joined and nothing else changed.
 */
export const paediatricProceduralPainAndSedation = protocol({
  id: "paediatric-procedural-pain-and-sedation",
  name: "Procedural pain and sedation for children with cancer: needles, lumbar punctures and marrow tests",
  aka: ["sedation for lumbar puncture in children", "general anaesthetic for LP", "needle pain in children with cancer", "numbing cream before port access", "procedural distress paediatric oncology", "bone marrow aspirate sedation"],
  domain: "paediatric",
  tldr: "Children with cancer have many needles, lumbar punctures and bone marrow tests. An international guideline says every needle procedure should use numbing cream and distraction, and every child having a lumbar puncture should be offered deep sedation or a general anaesthetic. Sedation is given by a trained team with monitoring, after the child and family are prepared for what will happen.",
  simple: "Needles and spinal taps should not have to hurt. Ask for numbing cream, distraction such as games or videos, and for a lumbar puncture, a sleep medicine or anaesthetic. A trained team watches your child closely.",
  summary: "The international clinical practice guideline on needle procedures in children with cancer (Loeffen et al., Eur J Cancer 2020; GRADE, 48 randomised trials, 2,271 participants, evidence very low to moderate) makes strong recommendations for topical anaesthetics in all needle procedures, for offering deep sedation or general anaesthesia to all children undergoing lumbar puncture, for deep sedation or general anaesthesia in major procedures in children of all ages, and for hypnosis and active distraction in all needle procedures. NICE CG112 (sedation in under 19s) sets the safety frame: trained pre-sedation assessment and documented consent, psychological preparation suited to the child's development, parents offered the chance to be present, a team with life support skills (advanced life support for deep sedation), an anaesthetist available for propofol, sevoflurane or opioids with ketamine, continuous monitoring including capnography for deep sedation, and discharge criteria. Fasting is not needed for minimal sedation, nitrous oxide or moderate sedation with verbal contact; for deeper sedation professional fasting guidance applies, with the 2018 move to 1 hour for clear fluids. For painful procedures NICE suggests considering a local anaesthetic as well as a sedative.",
  asOf: "2026-11-11",
  setting: {
    who: ["nurse", "doctor", "anaesthetist", "patient-or-carer"],
    where: ["outpatient-clinic", "ward", "theatre", "chemotherapy-day-unit"],
  },
  population: "Children and young people with cancer having needle procedures (port access, venepuncture, cannulation, injections), lumbar punctures and bone marrow aspiration or biopsy (Loeffen 2020); NICE CG112 covers sedation for diagnostic and therapeutic procedures in anyone under 19.",
  trigger: "A needle procedure, lumbar puncture or bone marrow test is planned for a child having cancer care.",
  steps: [
    {
      action: "Use a topical anaesthetic for every needle procedure, including port access",
      why: "Children with cancer have many needles during treatment; numbing the skin reduces pain each time and the fear that builds up.",
      source: "loeffen-2020",
      quote: "Strong recommendations were made for the use of topical anesthetics in all needle procedures, for offering deep sedation (DS)/general anesthesia (GA) to all children undergoing lumbar puncture, for the use of DS/ GA in major procedures in children of all ages, for the use of hypnosis in all needle procedures and for the use of active distraction in all needle procedures.",
      grade: "Strong recommendation",
    },
    {
      action: "Use active distraction, and hypnosis where staff are trained in it, for every needle procedure",
      why: "Psychological methods reduce pain and distress at little cost and work alongside numbing cream.",
      source: "loeffen-2020",
      grade: "Strong recommendation",
    },
    {
      action: "Offer every child having a lumbar puncture deep sedation or a general anaesthetic",
      why: "Lumbar punctures are repeated many times in leukaemia treatment; deep sedation lets the child keep still and avoids the procedure becoming traumatic.",
      source: "loeffen-2020",
      grade: "Strong recommendation",
    },
    {
      action: "Before sedation, have a trained professional assess the child, including airway, medicines, previous sedation and development, and document it",
      why: "The assessment picks out children who need a specialist or an anaesthetist, such as those with airway problems or ASA grade 3 or above.",
      source: "nice-cg112",
      quote: "Ensure that trained healthcare professionals (see section 1.4) carry out pre‑sedation assessments and document the results in the healthcare record.",
    },
    {
      action: "Give the child and family spoken and written information on the sedation, its alternatives, risks and benefits, and record consent",
      why: "Families decide better, and children cope better, when they know what will happen.",
      source: "nice-cg112",
      quote: "Obtain and document informed consent for sedation.",
    },
    {
      action: "Prepare the child psychologically: what will happen, what they will feel and how to cope, in words suited to their age",
      why: "Preparation lowers distress, and checking understanding shows whether the explanation worked.",
      source: "nice-cg112",
      quote: "Ensure that the information is appropriate for the developmental stage of the child or young person and check that the child or young person has understood the information.",
    },
    {
      action: "Offer parents the chance to be present, with advice on their role",
      why: "Many children are calmer with a parent there, and parents cope better when they know what to do.",
      source: "nice-cg112",
      quote: "Offer parents and carers the opportunity to be present during sedation if appropriate. If a parent or carer decides to be present, offer them advice about their role during the procedure.",
    },
    {
      action: "Record the time of the last food and drink; fast only for deep sedation or moderate sedation without verbal contact, following current anaesthetic guidance",
      why: "Fasting protects the airway under deep sedation but is not needed for lighter sedation; long fasts are distressing for small children.",
      source: "nice-cg112",
      quote: "Before starting sedation, confirm and record the time of last food and fluid intake in the healthcare record.",
    },
    {
      action: "Make sure the team has the right life support skills, and an anaesthetist for propofol, sevoflurane or opioids with ketamine",
      why: "Deep sedation can stop a child breathing; the person giving it must be able to rescue the airway.",
      source: "nice-cg112",
      quote: "Ensure that all members of the sedation team have basic life support skills for minimal, moderate and deep sedation. At least 1 team member should have intermediate life support skills for moderate sedation and advanced life support skills for deep sedation.",
    },
    {
      action: "Clean hands before the lumbar puncture and before putting on gloves",
      why: "A lumbar puncture enters a sterile space; gloves alone may not prevent contamination.",
      source: "who-2009",
      quote: "For some tasks on clean sites (lumbar puncture, surgical procedures, tracheal suctioning, etc.), the use of gloves is standard procedure. In this case, hand hygiene is required before donning gloves because gloves alone may not entirely prevent contamination",
    },
    {
      action: "During deep sedation, continuously monitor depth of sedation, breathing, oxygen saturation, heart rate and ECG, with capnography and blood pressure every 5 minutes where possible",
      why: "Monitoring catches slowed breathing or low oxygen early; the person giving sedation does nothing else.",
      source: "nice-cg112",
      quote: "The healthcare professional administering sedation should be involved only in continuously monitoring, interpreting and responding to all of the above.",
    },
    {
      action: "Discharge only when vital signs are normal, the child is awake with no risk of drowsiness returning, and nausea, vomiting and pain are controlled",
      why: "Some sedatives last longer than the procedure; going home too early risks a drowsy child with no one watching.",
      source: "nice-cg112",
      quote: "the child or young person is awake (or returned to baseline level of consciousness) and there is no risk of further reduced level of consciousness",
    },
  ],
  bestInClass: {
    statement: "Follow the international paediatric oncology needle-procedure guideline (Loeffen 2020): topical anaesthetic, active distraction and hypnosis for every needle procedure, and deep sedation or general anaesthesia offered for every lumbar puncture and major procedure, all strong recommendations. Deliver the sedation within NICE CG112's safety frame of assessment, consent, preparation, a skilled team, continuous monitoring and discharge criteria. NICE CG112 is general rather than oncology-specific, and for painful procedures it suggests lighter options first (nitrous oxide or oral or intranasal midazolam for minimal or moderate sedation, then ketamine or intravenous midazolam with or without fentanyl, then propofol) where the oncology guideline offers deep sedation for every lumbar puncture.",
    sources: ["loeffen-2020", "nice-cg112"],
  },
  variants: [
    {
      name: "Stepped sedation for painful procedures (NICE CG112)",
      differs: "For painful procedures at minimal or moderate target depth, considers nitrous oxide and/or oral or intranasal midazolam first, then intravenous or intramuscular ketamine or intravenous midazolam with or without fentanyl, then a specialist technique such as propofol, with a local anaesthetic in all cases.",
      evidence: "NICE does not grade recommendations; the guideline is for all procedures in under 19s, not oncology, and its examples are suturing and fracture manipulation.",
      sources: ["nice-cg112"],
    },
  ],
  grades: [
    { claim: "Topical anaesthetics in all needle procedures", grade: "Strong recommendation", source: "loeffen-2020" },
    { claim: "Offer deep sedation or general anaesthesia to all children undergoing lumbar puncture", grade: "Strong recommendation", source: "loeffen-2020" },
    { claim: "Hypnosis and active distraction in all needle procedures", grade: "Strong recommendation", source: "loeffen-2020" },
    { claim: "Quality of evidence across the recommendations", grade: "very low to moderate (GRADE)", source: "loeffen-2020", quote: "Quality of evidence supporting the recommendations ranged from very low to moderate." },
  ],
  sources: [
    { key: "loeffen-2020", label: "Reducing pain and distress related to needle procedures in children with cancer: A clinical practice guideline", publisher: "International inter-disciplinary guideline panel (Loeffen et al.), European Journal of Cancer", year: 2020, url: "https://europepmc.org/article/MED/32302949", doi: "10.1016/j.ejca.2020.02.039", gradingScheme: "GRADE with evidence-to-decision frameworks: strong or weak recommendations, evidence high to very low.", read: "abstract", accessed: "2026-11-11" },
    { key: "nice-cg112", label: "Sedation in under 19s: using sedation for diagnostic and therapeutic procedures (CG112), recommendations", publisher: "NICE", year: 2010, url: "https://www.nice.org.uk/guidance/cg112/chapter/Recommendations", gradingScheme: "NICE does not grade recommendations; strength is in the wording ('ensure', 'consider', 'do not').", read: "full-text", accessed: "2026-11-11" },
    { key: "cog-sedation-review-2020", label: "Evidence-Based Recommendations for the Appropriate Level of Sedation to Manage Pain in Pediatric Oncology Patients Requiring Procedures: A Systematic Review From the Children's Oncology Group", publisher: "Children's Oncology Group nursing, Journal of Pediatric Oncology Nursing", year: 2020, url: "https://europepmc.org/article/MED/31303100", doi: "10.1177/1043454219858610", read: "abstract", accessed: "2026-11-11" },
    { key: "who-2009", label: "WHO Guidelines on Hand Hygiene in Health Care", publisher: "World Health Organization", year: 2009, url: "https://www.who.int/publications/i/item/9789241597906", gradingScheme: "CDC/HICPAC categories IA, IB, IC and II.", read: "full-text", accessed: "2026-11-11" },
  ],
  upgrades: [],
  gaps: [
    "The 2020 international guideline was read only as an abstract, so its weak recommendations, its advice on specific drugs and its grades for each strong recommendation are not given here.",
    "The Children's Oncology Group nursing review makes a recommendation on the level of sedation for bone marrow aspirates and biopsies that its abstract does not state; it was not read in full.",
    "No guideline read sets doses for sedative or topical anaesthetic drugs in children with cancer; these come from local protocols and product licences.",
    "The Children's Oncology Group archived its guideline on atraumatic (pencil-point) needles for lumbar puncture in August 2024; no current guideline on needle type was read.",
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
