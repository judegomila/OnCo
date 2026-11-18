import { protocol } from "./helpers";

/*
 * End of life care for children and young people with cancer: planning with the child and family, the place of care,
 * symptom control, recognising the last days, and support for parents, brothers and sisters before and after a death.
 * The adult record is care-in-the-last-days-of-life; palliative sedation has its own record.
 *
 * Second accuracy pass, 17 November 2026: every source below was fetched again raw with curl and read as text, every
 * quote was re-checked by script against the saved text (the pathway PDF in reading order as well as in layout), and
 * each step, figure and grade was compared with its passage. The quotes all stood. What changed: recommendations NICE
 * words as "consider" or "think about" (a stepwise approach to pain, a named first point of contact, medicines for
 * agitation) are no longer written as orders; the step that told readers to keep the Advance Care Plan apart from
 * any resuscitation decision now says what NICE says (the plan records resuscitation plans and must not be confused
 * with a do-not-attempt-resuscitation order); the statement that NICE has no recommendation on stopping fluids and
 * food was corrected (it has recommendations 1.3.47 to 1.3.55 on hydration and nutrition, and none on palliative
 * sedation); reasons in the "why" lines that no source states were reworded to the source; and the patient summary
 * no longer presents day-and-night specialist help as something every family has. No newer edition of any source
 * was found. The WHO repository still serves a script-only page.
 *
 * What was read, and how (first on 16 November 2026 and again on 17 November 2026, fetched raw with curl and read as
 * text):
 * - NICE NG61, End of life care for infants, children and young people with life-limiting conditions: planning and
 *   management: the recommendations page, read in full, with the overview and update pages. The overview prints
 *   "Published: 07 December 2016" and "Last updated: 25 July 2019" (a gabapentin amendment); the update page adds that
 *   a link was inserted in October 2021. This is the current edition. It covers everyone under 18 with a
 *   life-limiting condition, not cancer alone.
 * - Weaver et al., Palliative care as a standard of care in pediatric oncology (Pediatr Blood Cancer 2015, one of the
 *   Standards for Psychosocial Care of Children with Cancer and Their Families): full text of the author manuscript,
 *   PubMed Central XML through NCBI E-utilities (PMC5198905); the Europe PMC copy returned an error on 17 November.
 * - Together for Short Lives, A Core Care Pathway for Children with Life-limiting and Life-threatening Conditions, third
 *   edition, February 2013: the PDF the charity's resource page serves today; stage three (end of life) and the fifth
 *   and sixth standards were read. No later edition was found on that page.
 * - The Dutch clinical practice guideline for paediatric palliative care, as published in three open papers in BMC
 *   Palliative Care (symptom treatment 2024, PMC10935792; advance care planning 2024, PMC11585104; psychosocial and
 *   bereavement care 2025, PMC12100996): full text, Europe PMC XML. The individual recommendations are printed in
 *   tables that are not text in the open copies, so what is cited is the papers' own account of them.
 * - Abstracts, Europe PMC: GO-PPaCS international standards (Benini 2022, the revision of the 2007 IMPaCCT standards);
 *   Johnston 2021 (quality measures for end of life care for children with cancer); Anderson 2021 (artificial nutrition
 *   and hydration); Wolfe 2000 (symptoms at the end of life in children with cancer).
 * - WHO, Integrating palliative care and symptom relief into paediatrics (2018): not reachable. The WHO repository
 *   serves a script-only page to curl and no text; it is named in sources and nothing rests on it. The 2007 IMPaCCT
 *   standards themselves were not read; the GO-PPaCS abstract says it redefines them.
 *
 * No source here is industry funded so far as its text states. Every DOI came from a Europe PMC or PubMed Central
 * record whose title was checked. Quotes are copied from the raw text with line breaks joined and nothing else
 * changed. NICE does not grade recommendations.
 */
export const paediatricEndOfLifeCare = protocol({
  id: "paediatric-end-of-life-care",
  name: "End of life care for children and young people with cancer",
  aka: ["paediatric palliative care at the end of life", "pediatric end of life care", "care of a dying child", "children's advance care plan", "NICE NG61", "parallel planning", "children's hospice care", "end of life care at home for a child"],
  domain: "paediatric",
  tldr: "When a child's cancer can no longer be cured, care is planned with the child and family around what matters to them: where they want to be, who is with them, and comfort. NICE asks services to provide specialist children's palliative care advice and nursing at any time of day or night for a child cared for at home. Support for parents, brothers and sisters continues after the death.",
  simple: "If treatment can no longer cure a child's cancer, the team's job is to keep the child comfortable and to help the family do what matters most to them. The team should ask where you would prefer care to happen: home, a children's hospice or hospital. NICE says advice and nursing should be there day and night for a child cared for at home, and that support for the family comes before and after.",
  summary: "NICE NG61 (2016, last updated 2019) is the anchor. It covers everyone under 18 with a life-limiting condition, and its definition of end of life care takes in the final days, weeks and months and the planning for them. Each child's own team and local children's palliative care service have their own plans and medicines charts, which come first; this page is for understanding the care.\n\nPlanning. The child and parents have a central role in decisions and do not make them alone. Every child should have a named medical specialist and an Advance Care Plan, which is not a do-not-attempt-resuscitation order and which records wishes, ambitions, the preferred place of care and of death, and plans for life-threatening events. Plans are made in parallel, because the course is often unpredictable. The psychosocial standard for paediatric oncology goes further on timing: palliative care concepts introduced early and throughout, regardless of disease status (a strong recommendation on moderate-quality evidence).\n\nPlace. Preferred place of care and death is discussed and agreed, and services should make it possible where they can, with a rapid transfer process ready. For care at home NICE asks services to provide, when needed, a paediatric palliative care consultant's advice and paediatric nursing at any time of day or night, home visits, equipment, anticipatory prescribing and support for subcutaneous or intravenous infusions.\n\nSymptoms. Pain is assessed in a way suited to the child's age and ability to communicate. NICE says to consider a stepwise approach: paracetamol or ibuprofen for mild pain, and for moderate to severe pain either those or an opioid (low-dose by mouth, across the mucosa, under the skin, or by infusion into a vein if a central line is in place). Opioids are titrated to the smallest effective dose, with background and breakthrough doses, calculated by weight. For agitation, NICE says to look for causes, to think about calm, familiar surroundings, and to think about medicines, starting at low doses, such as a benzodiazepine or a neuroleptic. For a child at increased risk of seizures, seizure management goes in the Advance Care Plan, and parents given a rescue medicine such as buccal midazolam are told how and when to use it. Unresolved distress is a reason to involve the specialist team. NICE NG61 makes no recommendation on palliative sedation; the Dutch national guideline does, and describes its recommendations as the first evidence-based ones on paediatric palliative sedation in Europe.\n\nThe last days. Signs that a child may die within hours or days are listed by NICE, with a reminder that there is often uncertainty and that parents who sense it may be right. Drinking and eating are supported for as long as the child wants; tube or intravenous fluids are a decision about the child's best interests, reviewed regularly. Private time, rituals and memory-making are part of care. Bereavement support is offered to parents before and after the death, and NICE notes that brothers and sisters will need support too.\n\nWhy this is planned. In interviews with 103 parents of children who died of cancer between 1990 and 1997 after care at two Boston hospitals, 89 per cent of the children were said to have suffered a lot or a great deal from at least one symptom in the last month (Wolfe 2000). The authors concluded that greater attention must be paid to palliative care for children who are dying of cancer. No comparable recent figure was read.",
  asOf: "2026-11-17",
  setting: {
    who: ["multidisciplinary-team", "doctor", "nurse", "patient-or-carer", "pharmacist"],
    where: ["home", "ward", "community", "outpatient-clinic", "intensive-care"],
  },
  population: "Children and young people under 18 whose cancer is expected to end their life, and their parents, carers, brothers, sisters and others close to them. NICE NG61 is written for all life-limiting conditions, not cancer alone, and defines end of life care as the final days, weeks and months and the planning for them. Young adults of 18 and over are covered by the adult record. Doses are not given here: they come from the child's own team and the local children's palliative care service, whose plan comes first.",
  trigger: "A child's cancer is no longer expected to be cured, or the child's condition changes so that they may die within weeks; planning can and should start earlier.",
  steps: [
    {
      action: "Treat the child and their parents as central to every decision, and tell them they will not have to decide alone",
      why: "NICE recognises that the child and parents have a central role in decisions and care planning, and says the multidisciplinary team is involved in the decisions as well.",
      source: "nice-ng61",
      quote: "Explain to children and young people and to their parents or carers that their contribution to decisions about their care is very important, but that they do not have to make decisions alone and the multidisciplinary team will be involved as well.",
    },
    {
      action: "Introduce palliative care early and alongside cancer treatment, not only when treatment stops",
      why: "The authors of the standard point to better outcomes when palliative care is brought in earlier, and to the effect on the health of bereaved family members.",
      source: "weaver-2015",
      quote: "Youth and their families should be introduced to palliative care concepts to reduce suffering and enhance well-being throughout the disease process regardless of disease status.",
      grade: "Strong recommendation, moderate quality of evidence",
    },
    {
      action: "Give the child a named medical specialist who leads and coordinates their care, and think about a named first point of contact in the team",
      why: "NICE notes that continuity of care matters to children and parents. The named specialist may change if the care that is needed or the place of care changes, and the family should be told so.",
      source: "nice-ng61",
      quote: "Every child or young person with a life-limiting condition should have a named medical specialist who leads on and coordinates their care.",
    },
    {
      action: "Plan in parallel: make more than one plan and use the one that fits how the child is at the time",
      why: "The course of a life-limiting condition is often unpredictable. With more than one plan made, the one that best fits the child's circumstances at the time can be used.",
      source: "nice-ng61",
      quote: "When developing plans for the care of the child or the young person with a life-limiting condition, use parallel planning to take account of possible unpredictability in the course of the condition.",
    },
    {
      action: "Develop and record an Advance Care Plan with the child and parents, keep it up to date, share it with everyone involved each time it changes, and think about which services should see it, such as the GP, hospice, school and ambulance service",
      why: "NICE says the plan helps the family be involved, prepares for possible complications, and supports continuity of care when the professionals or the place of care change.",
      source: "nice-ng61",
      quote: "Develop and record an Advance Care Plan at an appropriate time for the current and future care of each child or young person with a life-limiting condition.",
    },
    {
      action: "Do not confuse an Advance Care Plan with a do-not-attempt-resuscitation order",
      why: "The plan records the child's wishes and ambitions and the plans for life-threatening events, including any plans for resuscitation or life support. Having one does not mean treatment is withheld: NICE says to attempt resuscitation unless a do-not-attempt-resuscitation order is in place.",
      source: "nice-ng61",
      quote: "Be aware that all children and young people with life-limiting conditions should have an Advance Care Plan in their medical record, and that this should not be confused with a do-not-attempt-resuscitation order.",
    },
    {
      action: "Make room for the child to talk about dying if they want to, and offer the family help in talking with each other",
      why: "NICE notes that children may find it hard to ask directly whether they are dying, and that parents may too. It asks staff to find out whether they want to talk and are able to; nobody is made to.",
      source: "nice-ng61",
      quote: "Be aware that children and young people may have difficulty asking directly if they are going to die or are dying. Explore and discuss their concerns if you think they want to talk about this.",
    },
    {
      action: "Discuss and agree where the child and family would prefer care to be given and where they would prefer the child to die, and explain that this can change",
      why: "Home, a children's hospice and hospital each offer different care and support. The place is agreed taking account of the family's wishes and values, the views of experienced professionals, safety and practicality, and it may change.",
      source: "nice-ng61",
      quote: "Discuss with children and young people with life-limiting conditions and their parents or carers where they would prefer to be cared for and where they would prefer to die.",
    },
    {
      action: "For a child approaching the end of life at home, provide when needed a paediatric palliative care consultant's advice and paediatric nursing at any time of day or night, home visits, equipment and medicines prescribed in advance",
      why: "NICE asks services to have these ready so that advice, nursing and medicines are there for a child at home who is likely to develop symptoms.",
      source: "nice-ng61",
      quote: "advice from a consultant in paediatric palliative care (for example by telephone) at any time (day and night)",
    },
    {
      action: "If the child may die soon and is not where they wanted to be, consider rapid transfer and discuss it with them and their parents",
      why: "A child in intensive care can sometimes be moved home or to a hospice in time, if the service has a process ready.",
      source: "nice-ng61",
      quote: "If it is suspected that a child or young person may die soon and they are not in their preferred place of death, think about whether rapid transfer is possible and in their best interest.",
    },
    {
      action: "Assess pain in a way suited to the child's age, development and ability to communicate, and look for causes that are easy to miss",
      why: "NICE lists causes of pain and distress that may be overlooked, particularly in a child who cannot communicate, among them constipation, a bladder that cannot empty, headache and dental pain.",
      source: "nice-ng61",
      quote: "use an age-appropriate approach that takes account of their stage of development and ability to communicate",
    },
    {
      action: "Consider a stepwise approach to pain relief, and when an opioid is used, titrate to the smallest dose that relieves and prevents pain, with continuous background relief and extra doses for breakthrough pain",
      why: "NICE asks that the child's and parents' views on the benefits and side effects of pain relief, such as unwanted sleepiness, are taken into account. Background relief is continuous, and extra doses cover breakthrough pain.",
      source: "nice-ng61",
      quote: "Titrate treatment to provide continuous background analgesia, and prescribe additional doses for breakthrough pain if this occurs.",
    },
    {
      action: "Calculate opioid doses by the child's weight, not their age",
      why: "A child who has been ill for a long time may weigh less than others of the same age.",
      source: "nice-ng61",
      quote: "Calculate opioid dosages for children and young people who are approaching the end of life using weight rather than age, because they may be underweight for their age.",
    },
    {
      action: "If the child becomes agitated, keep them safe, look for a cause such as pain, a bladder that cannot empty, constipation, fear or a medicine, and think about calm, familiar surroundings and touch, and about medicines starting at a low dose",
      why: "NICE asks staff to find and if possible treat what is contributing to the agitation, and names calm speaking, holding and touch, less noise and light, and familiar objects and people as things to think about, with medicines as a further option.",
      source: "nice-ng61",
      quote: "If a child or young person who is approaching the end of life becomes agitated or delirious, make sure that they are safe from physical injury.",
    },
    {
      action: "For a child at risk of seizures, put a seizure plan in the Advance Care Plan, tell the family what they might see, and make sure parents know how and when to give the rescue medicine",
      why: "A seizure at home is frightening. A parent who has been shown what to do can act at once.",
      source: "nice-ng61",
      quote: "Ensure that parents or carers who have been provided with anticonvulsive therapy (such as buccal midazolam) know how and when to use it if the child or young person has a seizure at home.",
    },
    {
      action: "For breathlessness or noisy breathing, look for and treat the likely cause, and explain to the child and parents that these symptoms are common and what may help",
      why: "NICE names anxiety, physical discomfort such as the child's position, secretions in the airway and illnesses such as pneumonia as possible causes, each with its own approach, and asks that the family be told these symptoms are common.",
      source: "nice-ng61",
      quote: "If a child or young person is approaching the end of life and has respiratory distress, breathlessness or noisy breathing, think about and if possible treat the likely contributing factors or causes.",
    },
    {
      action: "Involve the specialist paediatric palliative care team whenever distressing symptoms are not resolved",
      why: "NICE describes the specialist team as including a paediatric palliative care consultant, a nurse and a pharmacist with expertise in children's palliative care, and its members can visit a child at home to manage symptoms.",
      source: "nice-ng61",
      quote: "Involve the specialist paediatric palliative care team if a child or young person has unresolved distressing symptoms as they approach the end of life",
    },
    {
      action: "Support the child to drink and eat for as long as they want to and can, keep up lip and mouth care, and if they cannot drink, decide with the family whether tube or intravenous fluids are in the child's best interests, and review that decision",
      why: "NICE notes that fluids by tube or drip may have a significant effect on care, may be a burden for the child, and may mean the place of care has to change.",
      source: "nice-ng61",
      quote: "If a child or young person is dying and cannot drink, discuss with them (as appropriate) and their parents or carers whether starting or continuing enteral tube or intravenous fluids is in their best interests.",
    },
    {
      action: "Watch for the signs that a child may die within hours or days, weigh them against how the child usually is, and listen when the child or parents feel the time is near",
      why: "There is often uncertainty about when a child will die, and a child may have come through earlier spells of being worse. NICE says that a child or parents who feel the time is near may be correct, and asks staff to explain why they think death is likely and what is uncertain.",
      source: "nice-ng61",
      quote: "If the child or young person or their parents or carers feel that they are likely to die within hours or days:",
    },
    {
      action: "Make sure the child and parents can have private time together, and ask what would help them, such as rituals and keeping memories",
      why: "NICE asks staff to discuss with parents what would help them, and gives important rituals and keeping memories with photographs, locks of hair or handprints as examples.",
      source: "nice-ng61",
      quote: "When a child or young person is likely to die within hours or days, ensure that they can have private time with their parents or carers.",
    },
    {
      action: "Support brothers and sisters, and others close to the child, through the illness and afterwards",
      why: "NICE says siblings will need support to cope with their brother's or sister's condition and death and with the effects of their parents' grieving, and that grandparents and friends may need support too.",
      source: "nice-ng61",
      quote: "Be aware that siblings will need support to cope with:",
    },
    {
      action: "Offer parents bereavement support from someone with the right expertise both before and after the death, and discuss what they would find helpful",
      why: "NICE asks for support on both sides of the death, and lists talking with the professionals who cared for the child, home visits from them and bereavement support groups among the options to discuss.",
      source: "nice-ng61",
      quote: "Offer bereavement support from a professional with appropriate expertise to the parents or carers both before and after the death of a child or young person.",
    },
    {
      action: "Discuss with parents the practical arrangements needed after the death and give them in writing; after the death, inform in a timely way everyone who needs to know and update records so that no appointments are offered by mistake",
      why: "The arrangements NICE lists include care of the body, registration of the death, the coroner and the funeral. Updating records spares a family being offered a clinic appointment for a child who has died.",
      source: "nice-ng61",
      quote: "Update relevant documents and databases after the death of a child or young person (to avoid, for example, clinical appointments being offered by mistake).",
    },
    {
      action: "Arrange for staff to talk with colleagues about their own thoughts and feelings when a child they care for is dying or has died",
      why: "NICE asks that these arrangements are in place for the professionals caring for a child who is approaching the end of life or has died.",
      source: "nice-ng61",
      quote: "Ensure that arrangements are in place for professionals to talk about their thoughts and feelings with colleagues when a child or young person they are caring for is approaching the end of life or has died.",
    },
  ],
  bestInClass: {
    statement: "NICE NG61 (2016, updated 2019) is the most complete national guideline that could be read: shared decisions, an Advance Care Plan, parallel planning, an agreed place of care with day-and-night specialist support at home, stepwise symptom control, attention to the last days, and bereavement support before and after. NICE does not grade its recommendations. The sources differ on three things. Timing: NG61 is about life-limiting conditions and end of life care, while the psychosocial standard for paediatric oncology (Weaver 2015) recommends palliative care for every child with cancer from early in the illness, regardless of disease status (strong recommendation, moderate-quality evidence). Refractory symptoms: NG61 says to involve the specialist team and makes no recommendation on palliative sedation, and on fluids and food it asks for a discussion of the child's best interests, reviewed regularly; the Dutch national guideline (GRADE, 221 recommendations on symptom treatment, 106 of them strong recommendations to act) has recommendations on paediatric palliative sedation and on forgoing hydration and nutrition. Place of death: NG61 and an expert panel on quality measures for children with cancer (Johnston 2021) both make the family's preferred place the aim; the panel endorsed death in the preferred location and declined to endorse home death as a measure, and also declined to endorse avoiding chemotherapy at the end of life. The Together for Short Lives pathway (2013) sets two standards for this stage, an end of life care plan and bereavement support, and the international GO-PPaCS standards (2022) include end of life care among six areas; both were read in part only.",
    sources: ["nice-ng61", "weaver-2015", "dutch-symptoms-2024", "johnston-2021", "tfsl-core-care-pathway-2013", "go-ppacs-2022"],
  },
  variants: [
    {
      name: "Palliative care for every child with cancer from diagnosis",
      differs: "Introduces palliative care concepts to all children with cancer and their families early in the course of the diagnosis and throughout care, regardless of disease status, instead of at the point when the condition is recognised as life-limiting.",
      evidence: "The psychosocial standard for paediatric oncology reviewed 73 papers from 1995 to 2015 and states: \"This is an overall strong recommendation given risk-benefit ratio including significant health impact on bereaved family members and positive outcomes with earlier integration of palliative care and end of life care.\" It rates the evidence as moderate, drawn from consistent findings in lower-level studies. NICE NG61 is scoped to life-limiting conditions and does not address children whose cancer is expected to be cured.",
      sources: ["weaver-2015", "nice-ng61"],
    },
    {
      name: "Palliative sedation, and stopping fluids and food, under a written national guideline",
      differs: "The Dutch national guideline for paediatric palliative care includes recommendations on palliative sedation for symptoms that cannot otherwise be relieved and on forgoing hydration and nutrition, covering communication, preparation, carrying out and evaluation. NICE NG61 has no recommendation on palliative sedation; on fluids and food it asks staff to discuss with the child and parents whether tube or intravenous fluids and feeding are in the child's best interests, and to review the decision regularly.",
      evidence: "The Dutch panel (56 professionals and nine parents, some of them bereaved) used GRADE and found few studies: evidence could answer, in part, eight of its 27 clinical questions, and the rest of its recommendations rest on other guidelines, expertise and family values. The paper says: \"Additionally, we introduce the first evidence-based recommendations on paediatric palliative sedation in Europe.\" The recommendations themselves are printed in tables that could not be read as text, so they are not reproduced here. Four UK specialist centres have published consensus guidance on artificial nutrition and hydration towards the end of life, read as an abstract, which notes how little evidence there is.",
      sources: ["dutch-symptoms-2024", "nice-ng61", "anderson-2021"],
    },
    {
      name: "Home as the goal, against the family's preferred place as the goal",
      differs: "A death at home has been proposed as a measure of good end of life care for children with cancer. NICE NG61 and the Together for Short Lives pathway aim for the place the child and family prefer, which may be home, a children's hospice or hospital, and NICE says that it may change.",
      evidence: "An expert panel using a modified Delphi method (Johnston 2021) endorsed 16 quality measures for end of life care for children with cancer, including death in the preferred location, palliative care involvement, a sibling needs assessment, a bereavement programme and removing visitor restrictions; the abstract lists home death and avoidance of chemotherapy at the end of life among the measures it did not endorse.",
      sources: ["johnston-2021", "nice-ng61", "tfsl-core-care-pathway-2013"],
    },
    {
      name: "A separate end of life plan beside the Advance Care Plan",
      differs: "The Together for Short Lives pathway asks for a specific end of life plan for the time of death, in addition to the wider care plan: \"Every child and family should be helped to decide on an end of life plan and should be provided with care and support to achieve this.\" NICE NG61 keeps one Advance Care Plan and updates it, for example before a rapid transfer, with the plan for the final hours or days.",
      evidence: "Neither is graded. The pathway is the charity's third edition (2013); NICE NG61 followed it in 2016 and does not grade its recommendations.",
      sources: ["tfsl-core-care-pathway-2013", "nice-ng61"],
    },
  ],
  grades: [
    { claim: "NICE NG61 recommendations (all steps cited to it)", grade: "Not graded; published December 2016, amended July 2019", source: "nice-ng61" },
    { claim: "Children with cancer and their families introduced to palliative care early and throughout", grade: "Strong recommendation, moderate quality of evidence", source: "weaver-2015", quote: "Current evidence for this recommendation is of moderate quality given consistent findings from lower level evidence studies (Table I)." },
    { claim: "Dutch national guideline: symptom treatment in paediatric palliative care", grade: "GRADE: 106 strong recommendations to do, 106 weak recommendations to consider, six strong recommendations not to do", source: "dutch-symptoms-2024", quote: "we formulated 106 strong recommendations to do (green), 106 weak recommendations to consider (yellow) and six strong recommendations not to do (red)." },
    { claim: "Dutch national guideline: advance care planning and shared decision-making", grade: "28 strong recommendations; 4 randomised trials and 33 qualitative studies", source: "dutch-acp-2024", quote: "We formulated 28 strong recommendations in close collaboration with a multidisciplinary guideline panel that provide guidance to offer advance care planning and shared decision-making, involve children and their family, and communicate information about care and treatment." },
    { claim: "Psychosocial, preloss and bereavement care offered to every child and family", grade: "Dutch national guideline; little direct evidence, recommendations informed by NICE NG61", source: "dutch-psychosocial-2025", quote: "Psychosocial care including preloss and bereavement care should be ensured for all children with life-threatening and life-limiting conditions and their families." },
    { claim: "Quality measures for end of life care for children with cancer", grade: "Modified Delphi expert panel; 16 measures endorsed", source: "johnston-2021" },
    { claim: "Symptoms in the last month of life in children who died of cancer, 1990 to 1997", grade: "Interviews with 103 parents, two Boston hospitals", source: "wolfe-2000", quote: "According to the parents, 89 percent of the children suffered \"a lot\" or \"a great deal\" from at least one symptom in their last month of life, most commonly pain, fatigue, or dyspnea." },
  ],
  sources: [
    { key: "nice-ng61", label: "End of life care for infants, children and young people with life-limiting conditions: planning and management (NG61), recommendations", publisher: "NICE", year: 2016, url: "https://www.nice.org.uk/guidance/ng61/chapter/Recommendations", gradingScheme: "NICE does not grade recommendations; strength is in the wording ('offer', 'consider', 'be aware'). Published 7 December 2016, last updated 25 July 2019; a link was added in October 2021.", read: "full-text", accessed: "2026-11-17" },
    { key: "weaver-2015", label: "Palliative care as a standard of care in pediatric oncology", publisher: "Pediatric Blood and Cancer (Weaver et al., Standards for Psychosocial Care of Children with Cancer and Their Families)", year: 2015, url: "https://doi.org/10.1002/pbc.25695", doi: "10.1002/pbc.25695", gradingScheme: "GRADE-based: quality of evidence and strength of recommendation stated for the standard as a whole.", read: "full-text", accessed: "2026-11-17" },
    { key: "tfsl-core-care-pathway-2013", label: "A Core Care Pathway for Children with Life-limiting and Life-threatening Conditions, third edition (stage three, end of life, read)", publisher: "Together for Short Lives", year: 2013, url: "https://www.togetherforshortlives.org.uk/app/uploads/2018/01/ProRes-Core-Care-Pathway.pdf", gradingScheme: "A charity's care pathway with six standards; not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "dutch-symptoms-2024", label: "A Dutch paediatric palliative care guideline: a systematic review and evidence-based recommendations for symptom treatment", publisher: "BMC Palliative Care (van Teunenbroek et al.)", year: 2024, url: "https://doi.org/10.1186/s12904-024-01367-w", doi: "10.1186/s12904-024-01367-w", gradingScheme: "GRADE for the evidence; recommendations strong (to do or not to do) or weak (to consider).", read: "full-text", accessed: "2026-11-17" },
    { key: "dutch-acp-2024", label: "A Dutch paediatric palliative care guideline: a systematic review and recommendations on advance care planning and shared decision-making", publisher: "BMC Palliative Care (van Teunenbroek et al.)", year: 2024, url: "https://doi.org/10.1186/s12904-024-01568-3", doi: "10.1186/s12904-024-01568-3", gradingScheme: "GRADE for the evidence; recommendations strong or weak.", read: "full-text", accessed: "2026-11-17" },
    { key: "dutch-psychosocial-2025", label: "A Dutch clinical practice guideline for paediatric palliative care: a systematic review and recommendations on psychosocial care including preloss and bereavement care", publisher: "BMC Palliative Care (van Teunenbroek et al.)", year: 2025, url: "https://doi.org/10.1186/s12904-025-01763-w", doi: "10.1186/s12904-025-01763-w", gradingScheme: "GRADE for the evidence; recommendations strong or weak.", read: "full-text", accessed: "2026-11-17" },
    { key: "go-ppacs-2022", label: "International Standards for Pediatric Palliative Care: From IMPaCCT to GO-PPaCS", publisher: "Journal of Pain and Symptom Management (Benini et al.)", year: 2022, url: "https://doi.org/10.1016/j.jpainsymman.2021.12.031", doi: "10.1016/j.jpainsymman.2021.12.031", gradingScheme: "Expert consensus standards; not graded.", read: "abstract", accessed: "2026-11-17" },
    { key: "johnston-2021", label: "Quality measures for end-of-life care for children with cancer: a modified Delphi approach", publisher: "Cancer (Johnston et al.)", year: 2021, url: "https://doi.org/10.1002/cncr.33546", doi: "10.1002/cncr.33546", read: "abstract", accessed: "2026-11-17" },
    { key: "anderson-2021", label: "Artificial nutrition and hydration for children and young people towards end of life: consensus guidelines across four specialist paediatric palliative care centres", publisher: "BMJ Supportive and Palliative Care (Anderson et al.)", year: 2021, url: "https://doi.org/10.1136/bmjspcare-2019-001909", doi: "10.1136/bmjspcare-2019-001909", read: "abstract", accessed: "2026-11-17" },
    { key: "wolfe-2000", label: "Symptoms and suffering at the end of life in children with cancer", publisher: "New England Journal of Medicine (Wolfe et al.)", year: 2000, url: "https://doi.org/10.1056/nejm200002033420506", doi: "10.1056/nejm200002033420506", read: "abstract", accessed: "2026-11-17" },
    { key: "who-ppc-2018", label: "Integrating palliative care and symptom relief into paediatrics: a WHO guide for health care planners, implementers and managers", publisher: "World Health Organization", year: 2018, url: "https://iris.who.int/handle/10665/274561", read: "not-reachable", accessed: "2026-11-17" },
  ],
  upgrades: [],
  gaps: [
    "NICE NG61 (published December 2016, last updated July 2019; no newer edition was found on 17 November 2026) is written for all life-limiting conditions in under 18s. It has no recommendations specific to cancer, such as bleeding, spinal cord compression, raised pressure in the head from a brain tumour, or when to stop chemotherapy or transfusions; no guideline on those in children was read.",
    "NICE NG61 makes no recommendation on palliative sedation in children. The Dutch national guideline does, but its individual recommendations are in tables that could not be read as text, so they are not given here. The adult palliative sedation record should not be read as applying to children.",
    "No doses are given. NICE lists several of the medicines it names as off-label in children in December 2016; doses come from the local children's palliative care service. The Association for Paediatric Palliative Medicine formulary was not read.",
    "The WHO guide on palliative care in paediatrics (2018) could not be read: the WHO repository returned a script-only page, and did so again on 17 November 2026. The 2007 IMPaCCT standards were not read, and their 2022 revision (GO-PPaCS) was read as an abstract only.",
    "The Together for Short Lives pathway read is the third edition of 2013, which is what the charity's resource page still served on 17 November 2026; whether a later edition exists elsewhere was not established, and only its end of life stage was read.",
    "The figure for symptoms in the last month of life comes from children who died between 1990 and 1997 in two Boston hospitals. No recent figure of the same kind, and none from the UK, was read.",
    "How many children with cancer in the UK die in their preferred place, and how many families have day-and-night specialist advice at home as NICE asks, was not found in any source read. The day-and-night support on this page is what NICE asks services to provide, not a description of what every area has.",
    "Care for young adults aged 18 to 24, who may be treated in either children's or adult services, falls between this record and the adult one.",
  ],
  institutions: ["nice"],
  companies: [],
  cancers: ["childhood-cancers"],
  drugs: [],
  technologies: ["palliative-care", "hospice-end-of-life"],
  terms: ["advance-care-planning", "bereavement-support", "hospice-at-home", "palliative-sedation"],
  related: ["care-in-the-last-days-of-life", "palliative-sedation-for-refractory-suffering", "strong-opioids-for-cancer-pain", "idea-acc-paediatric-palliative-in-every-childhood-unit"],
  sections: ["supportive-care"],
  tags: ["protocol", "paediatric", "palliative", "end-of-life"],
});
