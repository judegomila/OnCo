import { protocol } from "./helpers";

/*
 * End of life care for children and young people with cancer: planning with the child and family, the place of care,
 * symptom control, recognising the last days, and support for parents, brothers and sisters before and after a death.
 * The adult record is care-in-the-last-days-of-life; palliative sedation has its own record.
 *
 * What was read, and how (all on 16 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - NICE NG61, End of life care for infants, children and young people with life-limiting conditions: planning and
 *   management: the recommendations page, read in full, with the overview and update pages. The overview prints
 *   "Published: 07 December 2016" and "Last updated: 25 July 2019" (a gabapentin amendment); the update page adds that
 *   a link was inserted in October 2021. This is the current edition. It covers everyone under 18 with a
 *   life-limiting condition, not cancer alone.
 * - Weaver et al., Palliative care as a standard of care in pediatric oncology (Pediatr Blood Cancer 2015, one of the
 *   Standards for Psychosocial Care of Children with Cancer and Their Families): full text of the author manuscript,
 *   PubMed Central XML through NCBI E-utilities (PMC5198905).
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
  tldr: "When a child's cancer can no longer be cured, care is planned with the child and family around what matters to them: where they want to be, who is with them, and comfort. A specialist children's palliative care team can treat pain, breathlessness, agitation and seizures at home, in a hospice or in hospital, day and night. Support for parents, brothers and sisters continues after the death.",
  simple: "If treatment can no longer cure a child's cancer, the team's job is to keep the child comfortable and to help the family do what matters most to them. You can choose where care happens: home, a children's hospice or hospital. There is help day and night, and support for the whole family before and after.",
  summary: "NICE NG61 (2016, last updated 2019) is the anchor. It covers everyone under 18 with a life-limiting condition, and its definition of end of life care takes in the final days, weeks and months and the planning for them. Each child's own team and local children's palliative care service have their own plans and medicines charts, which come first; this page is for understanding the care.\n\nPlanning. The child and parents have a central role in decisions and do not make them alone. Every child has a named medical specialist and an Advance Care Plan, which is not a do-not-attempt-resuscitation order and which records wishes, ambitions, the preferred place of care and of death, and plans for life-threatening events. Plans are made in parallel, because the course is often unpredictable. The psychosocial standard for paediatric oncology goes further on timing: palliative care concepts introduced early and throughout, regardless of disease status (a strong recommendation on moderate-quality evidence).\n\nPlace. Preferred place of care and death is discussed and agreed, and services should make it possible, including rapid transfer. For care at home NICE asks for a paediatric palliative care consultant's advice and paediatric nursing at any time of day or night, home visits, equipment, anticipatory prescribing and support for subcutaneous or intravenous infusions.\n\nSymptoms. Pain is assessed in a way suited to the child's age and ability to communicate, and treated stepwise: paracetamol or ibuprofen, then opioids by mouth, across the mucosa, under the skin or through a central line, titrated to the smallest effective dose, with background and breakthrough doses, calculated by weight. For agitation, causes are sought first, then calm, familiar surroundings, then a benzodiazepine or a neuroleptic. Seizure plans go in the Advance Care Plan and parents are shown how to give buccal midazolam. Unresolved distress is a reason to involve the specialist team. NICE NG61 makes no recommendation on palliative sedation; the Dutch national guideline does, and describes its recommendations as the first evidence-based ones on paediatric palliative sedation in Europe.\n\nThe last days. Signs that a child may die within hours or days are listed by NICE, with a reminder that there is often uncertainty and that parents who sense it may be right. Drinking and eating are supported for as long as the child wants; tube or intravenous fluids are a decision about the child's best interests, reviewed regularly. Private time, rituals and memory-making are part of care. Bereavement support is offered before and after the death, and brothers and sisters are included.\n\nWhy this is planned. Parents of 103 children who died of cancer in Boston between 1990 and 1997 reported that 89 per cent suffered a lot or a great deal from at least one symptom in the last month (Wolfe 2000). Findings like these are why symptom control is planned ahead and why a specialist team is involved; no comparable recent figure was read.",
  asOf: "2026-11-16",
  setting: {
    who: ["multidisciplinary-team", "doctor", "nurse", "patient-or-carer", "pharmacist"],
    where: ["home", "ward", "community", "outpatient-clinic", "intensive-care"],
  },
  population: "Children and young people under 18 whose cancer is expected to end their life, and their parents, carers, brothers, sisters and others close to them. NICE NG61 is written for all life-limiting conditions in England, not cancer alone, and defines end of life care as the final days, weeks and months and the planning for them. Young adults of 18 and over are covered by the adult record. Doses are not given here: they come from the child's own team and the local children's palliative care service, whose plan comes first.",
  trigger: "A child's cancer is no longer expected to be cured, or the child's condition changes so that they may die within weeks; planning can and should start earlier.",
  steps: [
    {
      action: "Treat the child and their parents as central to every decision, and tell them they will not have to decide alone",
      why: "Families want a real say in what happens, and they also need to know the team shares the weight of the decisions.",
      source: "nice-ng61",
      quote: "Explain to children and young people and to their parents or carers that their contribution to decisions about their care is very important, but that they do not have to make decisions alone and the multidisciplinary team will be involved as well.",
    },
    {
      action: "Introduce palliative care early and alongside cancer treatment, not only when treatment stops",
      why: "A team that already knows the child and family can relieve symptoms and plan with them from the start, whatever course the illness takes.",
      source: "weaver-2015",
      quote: "Youth and their families should be introduced to palliative care concepts to reduce suffering and enhance well-being throughout the disease process regardless of disease status.",
      grade: "Strong recommendation, moderate quality of evidence",
    },
    {
      action: "Give the child a named medical specialist who leads and coordinates their care, and a named first point of contact",
      why: "Many teams are involved by this stage. One named person stops the family having to carry messages between them.",
      source: "nice-ng61",
      quote: "Every child or young person with a life-limiting condition should have a named medical specialist who leads on and coordinates their care.",
    },
    {
      action: "Plan in parallel: make more than one plan and use the one that fits how the child is at the time",
      why: "Nobody can say exactly how a child's illness will go. Planning for more than one course lets a family hope for more time and still be ready.",
      source: "nice-ng61",
      quote: "When developing plans for the care of the child or the young person with a life-limiting condition, use parallel planning to take account of possible unpredictability in the course of the condition.",
    },
    {
      action: "Develop and record an Advance Care Plan with the child and parents, keep it up to date, and share it with everyone involved, including the GP, hospice, school and ambulance service",
      why: "The plan carries the child's and family's wishes to whoever is on duty, including in an emergency at night.",
      source: "nice-ng61",
      quote: "Develop and record an Advance Care Plan at an appropriate time for the current and future care of each child or young person with a life-limiting condition.",
    },
    {
      action: "Keep the Advance Care Plan separate from any decision about resuscitation",
      why: "An Advance Care Plan is about how the child wants to live and be cared for. It is not an instruction to withhold treatment.",
      source: "nice-ng61",
      quote: "Be aware that all children and young people with life-limiting conditions should have an Advance Care Plan in their medical record, and that this should not be confused with a do-not-attempt-resuscitation order.",
    },
    {
      action: "Make room for the child to talk about dying if they want to, and offer the family help in talking with each other",
      why: "Children often know more than adults think and may not ask directly. Being able to talk can relieve fear, and nobody is made to.",
      source: "nice-ng61",
      quote: "Be aware that children and young people may have difficulty asking directly if they are going to die or are dying. Explore and discuss their concerns if you think they want to talk about this.",
    },
    {
      action: "Discuss and agree where the child and family would prefer care to be given and where they would prefer the child to die, and explain that this can change",
      why: "Home, a children's hospice and hospital each offer different things. The right place is the one the family chooses, and they may choose again.",
      source: "nice-ng61",
      quote: "Discuss with children and young people with life-limiting conditions and their parents or carers where they would prefer to be cared for and where they would prefer to die.",
    },
    {
      action: "For a child cared for at home, provide a paediatric palliative care consultant's advice and paediatric nursing at any time of day or night, home visits, equipment and medicines prescribed in advance",
      why: "Symptoms do not keep office hours. A family can stay at home only if help and the right medicines are there when something changes.",
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
      why: "A small child, or one who cannot speak, shows pain differently. Constipation, a full bladder, a headache or a sore mouth can be the cause and can be treated.",
      source: "nice-ng61",
      quote: "use an age-appropriate approach that takes account of their stage of development and ability to communicate",
    },
    {
      action: "Treat pain stepwise, and when an opioid is needed, titrate to the smallest dose that relieves and prevents pain, with continuous background relief and extra doses for breakthrough pain",
      why: "The aim is a child who is comfortable and as awake as they want to be. Regular relief prevents pain returning, and extra doses cover the moments that hurt more.",
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
      action: "If the child becomes agitated, keep them safe, look for a cause such as pain, a full bladder, constipation, fear or a medicine, and use calm, familiar surroundings and touch before or alongside any medicine",
      why: "Agitation usually has a cause that can be eased. A parent's voice and a quiet, familiar room often settle a child, and a medicine is there if they do not.",
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
      why: "Anxiety, position, secretions or an infection can each be behind it, and each has its own remedy. Knowing it is common makes it less alarming to watch.",
      source: "nice-ng61",
      quote: "If a child or young person is approaching the end of life and has respiratory distress, breathlessness or noisy breathing, think about and if possible treat the likely contributing factors or causes.",
    },
    {
      action: "Involve the specialist paediatric palliative care team whenever distressing symptoms are not resolved",
      why: "A specialist team has more options and can come to the child, including at home.",
      source: "nice-ng61",
      quote: "Involve the specialist paediatric palliative care team if a child or young person has unresolved distressing symptoms as they approach the end of life",
    },
    {
      action: "Support the child to drink and eat for as long as they want to and can, keep up lip and mouth care, and if they cannot drink, decide with the family whether tube or intravenous fluids are in the child's best interests, and review that decision",
      why: "Food and drink are comfort and family life as well as nourishment. Fluids by tube or drip can help some children and burden others, and can affect where the child can be cared for.",
      source: "nice-ng61",
      quote: "If a child or young person is dying and cannot drink, discuss with them (as appropriate) and their parents or carers whether starting or continuing enteral tube or intravenous fluids is in their best interests.",
    },
    {
      action: "Watch for the signs that a child may die within hours or days, weigh them against how the child usually is, and listen when the child or parents feel the time is near",
      why: "There is often uncertainty, and some children rally. Parents know their child, and saying what is expected, with its uncertainty, lets the family be together.",
      source: "nice-ng61",
      quote: "If the child or young person or their parents or carers feel that they are likely to die within hours or days:",
    },
    {
      action: "Make sure the child and parents can have private time together, and ask what would help them, such as rituals and keeping memories",
      why: "These hours belong to the family. Photographs, handprints and a lock of hair are things many parents treasure afterwards.",
      source: "nice-ng61",
      quote: "When a child or young person is likely to die within hours or days, ensure that they can have private time with their parents or carers.",
    },
    {
      action: "Support brothers and sisters, and others close to the child, through the illness and afterwards",
      why: "Siblings live through the illness too, and through their parents' grief. They need their own support, suited to their age.",
      source: "nice-ng61",
      quote: "Be aware that siblings will need support to cope with:",
    },
    {
      action: "Offer parents bereavement support from someone with the right expertise both before and after the death, and discuss what they would find helpful",
      why: "Grief does not begin at the death or end with the funeral, and the staff who knew the child are often the people parents most want to talk to.",
      source: "nice-ng61",
      quote: "Offer bereavement support from a professional with appropriate expertise to the parents or carers both before and after the death of a child or young person.",
    },
    {
      action: "Before the death, explain the practical arrangements that follow and give them in writing; afterwards, inform everyone who needs to know and update records so that no appointment letters are sent by mistake",
      why: "A family should not have to find out about registration or the coroner on the day, or open a clinic letter addressed to their child weeks later.",
      source: "nice-ng61",
      quote: "Update relevant documents and databases after the death of a child or young person (to avoid, for example, clinical appointments being offered by mistake).",
    },
    {
      action: "Arrange for staff to talk with colleagues about their own thoughts and feelings when a child they care for is dying or has died",
      why: "The people caring for the child grieve too, and are better able to support the next family when they are supported themselves.",
      source: "nice-ng61",
      quote: "Ensure that arrangements are in place for professionals to talk about their thoughts and feelings with colleagues when a child or young person they are caring for is approaching the end of life or has died.",
    },
  ],
  bestInClass: {
    statement: "NICE NG61 (2016, updated 2019) is the most complete national guideline that could be read: shared decisions, an Advance Care Plan, parallel planning, an agreed place of care with day-and-night specialist support at home, stepwise symptom control, attention to the last days, and bereavement support before and after. NICE does not grade its recommendations. The sources differ on three things. Timing: NG61 is about life-limiting conditions and end of life care, while the psychosocial standard for paediatric oncology (Weaver 2015) recommends palliative care for every child with cancer from early in the illness, regardless of disease status (strong recommendation, moderate-quality evidence). Refractory symptoms: NG61 says to involve the specialist team and makes no recommendation on palliative sedation or on stopping fluids and food, while the Dutch national guideline (GRADE, 221 recommendations on symptom treatment, 106 of them strong recommendations to act) covers both. Place of death: NG61 and an expert panel on quality measures for children with cancer (Johnston 2021) both make the family's preferred place the aim; the panel endorsed death in the preferred location and declined to endorse home death as a measure, and also declined to endorse avoiding chemotherapy at the end of life. The Together for Short Lives pathway (2013) sets two standards for this stage, an end of life care plan and bereavement support, and the international GO-PPaCS standards (2022) include end of life care among six areas; both were read in part only.",
    sources: ["nice-ng61", "weaver-2015", "dutch-symptoms-2024", "johnston-2021", "tfsl-core-care-pathway-2013", "go-ppacs-2022"],
  },
  variants: [
    {
      name: "Palliative care for every child with cancer from diagnosis",
      differs: "Introduces the palliative care team early in the illness for all children with cancer, alongside treatment aimed at cure, instead of at the point when the condition is recognised as life-limiting.",
      evidence: "The psychosocial standard for paediatric oncology reviewed 73 papers from 1995 to 2015 and states: \"This is an overall strong recommendation given risk-benefit ratio including significant health impact on bereaved family members and positive outcomes with earlier integration of palliative care and end of life care.\" It rates the evidence as moderate, drawn from consistent lower-level studies. NICE NG61 is scoped to life-limiting conditions and does not address children whose cancer is expected to be cured.",
      sources: ["weaver-2015", "nice-ng61"],
    },
    {
      name: "Palliative sedation, and stopping fluids and food, under a written national guideline",
      differs: "The Dutch national guideline for paediatric palliative care includes recommendations on palliative sedation for symptoms that cannot otherwise be relieved and on forgoing hydration and nutrition, covering communication, preparation, carrying out and evaluation. NICE NG61 has no recommendation on palliative sedation.",
      evidence: "The Dutch panel (56 professionals and nine parents, some of them bereaved) used GRADE and found few studies: evidence could answer, in part, eight of its 27 clinical questions, and the rest of its recommendations rest on other guidelines, expertise and family values. The paper says: \"Additionally, we introduce the first evidence-based recommendations on paediatric palliative sedation in Europe.\" The recommendations themselves are printed in tables that could not be read as text, so they are not reproduced here. Four UK specialist centres have published consensus guidance on artificial nutrition and hydration towards the end of life, read as an abstract, which notes how little evidence there is.",
      sources: ["dutch-symptoms-2024", "nice-ng61", "anderson-2021"],
    },
    {
      name: "Home as the goal, against the family's preferred place as the goal",
      differs: "Some services and audits count a death at home as the mark of good care. NICE NG61 and the Together for Short Lives pathway aim for the place the child and family choose, which may be home, a children's hospice or hospital, and say that it may change.",
      evidence: "An expert panel using a modified Delphi method (Johnston 2021) endorsed 16 quality measures for end of life care for children with cancer, including death in the preferred location, palliative care involvement, a sibling needs assessment, a bereavement programme and removing visitor restrictions; the abstract lists home death and avoidance of chemotherapy at the end of life among the measures it did not endorse.",
      sources: ["johnston-2021", "nice-ng61", "tfsl-core-care-pathway-2013"],
    },
    {
      name: "A separate end of life plan beside the Advance Care Plan",
      differs: "The Together for Short Lives pathway asks for a specific end of life plan for the time of death, in addition to the wider care plan: \"Every child and family should be helped to decide on an end of life plan and should be provided with care and support to achieve this.\" NICE NG61 keeps one Advance Care Plan and updates it, for example before a rapid transfer, with the plan for the final hours or days.",
      evidence: "Both are consensus documents. The pathway is the charity's third edition (2013); NICE NG61 followed it in 2016 and does not grade its recommendations.",
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
    { key: "nice-ng61", label: "End of life care for infants, children and young people with life-limiting conditions: planning and management (NG61), recommendations", publisher: "NICE", year: 2016, url: "https://www.nice.org.uk/guidance/ng61/chapter/Recommendations", gradingScheme: "NICE does not grade recommendations; strength is in the wording ('offer', 'consider', 'be aware'). Published 7 December 2016, last updated 25 July 2019; a link was added in October 2021.", read: "full-text", accessed: "2026-11-16" },
    { key: "weaver-2015", label: "Palliative care as a standard of care in pediatric oncology", publisher: "Pediatric Blood and Cancer (Weaver et al., Standards for Psychosocial Care of Children with Cancer and Their Families)", year: 2015, url: "https://doi.org/10.1002/pbc.25695", doi: "10.1002/pbc.25695", gradingScheme: "GRADE-based: quality of evidence and strength of recommendation stated for the standard as a whole.", read: "full-text", accessed: "2026-11-16" },
    { key: "tfsl-core-care-pathway-2013", label: "A Core Care Pathway for Children with Life-limiting and Life-threatening Conditions, third edition (stage three, end of life, read)", publisher: "Together for Short Lives", year: 2013, url: "https://www.togetherforshortlives.org.uk/app/uploads/2018/01/ProRes-Core-Care-Pathway.pdf", gradingScheme: "A charity's care pathway with six standards; not graded.", read: "full-text", accessed: "2026-11-16" },
    { key: "dutch-symptoms-2024", label: "A Dutch paediatric palliative care guideline: a systematic review and evidence-based recommendations for symptom treatment", publisher: "BMC Palliative Care (van Teunenbroek et al.)", year: 2024, url: "https://doi.org/10.1186/s12904-024-01367-w", doi: "10.1186/s12904-024-01367-w", gradingScheme: "GRADE for the evidence; recommendations strong (to do or not to do) or weak (to consider).", read: "full-text", accessed: "2026-11-16" },
    { key: "dutch-acp-2024", label: "A Dutch paediatric palliative care guideline: a systematic review and recommendations on advance care planning and shared decision-making", publisher: "BMC Palliative Care (van Teunenbroek et al.)", year: 2024, url: "https://doi.org/10.1186/s12904-024-01568-3", doi: "10.1186/s12904-024-01568-3", gradingScheme: "GRADE for the evidence; recommendations strong or weak.", read: "full-text", accessed: "2026-11-16" },
    { key: "dutch-psychosocial-2025", label: "A Dutch clinical practice guideline for paediatric palliative care: a systematic review and recommendations on psychosocial care including preloss and bereavement care", publisher: "BMC Palliative Care (van Teunenbroek et al.)", year: 2025, url: "https://doi.org/10.1186/s12904-025-01763-w", doi: "10.1186/s12904-025-01763-w", gradingScheme: "GRADE for the evidence; recommendations strong or weak.", read: "full-text", accessed: "2026-11-16" },
    { key: "go-ppacs-2022", label: "International Standards for Pediatric Palliative Care: From IMPaCCT to GO-PPaCS", publisher: "Journal of Pain and Symptom Management (Benini et al.)", year: 2022, url: "https://doi.org/10.1016/j.jpainsymman.2021.12.031", doi: "10.1016/j.jpainsymman.2021.12.031", gradingScheme: "Expert consensus standards; not graded.", read: "abstract", accessed: "2026-11-16" },
    { key: "johnston-2021", label: "Quality measures for end-of-life care for children with cancer: a modified Delphi approach", publisher: "Cancer (Johnston et al.)", year: 2021, url: "https://doi.org/10.1002/cncr.33546", doi: "10.1002/cncr.33546", read: "abstract", accessed: "2026-11-16" },
    { key: "anderson-2021", label: "Artificial nutrition and hydration for children and young people towards end of life: consensus guidelines across four specialist paediatric palliative care centres", publisher: "BMJ Supportive and Palliative Care (Anderson et al.)", year: 2021, url: "https://doi.org/10.1136/bmjspcare-2019-001909", doi: "10.1136/bmjspcare-2019-001909", read: "abstract", accessed: "2026-11-16" },
    { key: "wolfe-2000", label: "Symptoms and suffering at the end of life in children with cancer", publisher: "New England Journal of Medicine (Wolfe et al.)", year: 2000, url: "https://doi.org/10.1056/nejm200002033420506", doi: "10.1056/nejm200002033420506", read: "abstract", accessed: "2026-11-16" },
    { key: "who-ppc-2018", label: "Integrating palliative care and symptom relief into paediatrics: a WHO guide for health care planners, implementers and managers", publisher: "World Health Organization", year: 2018, url: "https://iris.who.int/handle/10665/274561", read: "not-reachable", accessed: "2026-11-16" },
  ],
  upgrades: [],
  gaps: [
    "NICE NG61 is written for all life-limiting conditions in under 18s. It has no recommendations specific to cancer, such as bleeding, spinal cord compression, raised pressure in the head from a brain tumour, or when to stop chemotherapy or transfusions; no guideline on those in children was read.",
    "NICE NG61 makes no recommendation on palliative sedation in children. The Dutch national guideline does, but its individual recommendations are in tables that could not be read as text, so they are not given here. The adult palliative sedation record should not be read as applying to children.",
    "No doses are given. NICE lists several of the medicines it names as off-label in children in December 2016; doses come from the local children's palliative care service. The Association for Paediatric Palliative Medicine formulary was not read.",
    "The WHO guide on palliative care in paediatrics (2018) could not be read: the WHO repository returned a script-only page. The 2007 IMPaCCT standards were not read, and their 2022 revision (GO-PPaCS) was read as an abstract only.",
    "The Together for Short Lives pathway read is the third edition of 2013, which is what the charity's resource page serves; whether a later edition exists elsewhere was not established, and only its end of life stage was read.",
    "The figure for symptoms in the last month of life comes from children who died between 1990 and 1997 in two Boston hospitals. No recent figure of the same kind, and none from the UK, was read.",
    "How many children with cancer in the UK die in their preferred place, and how many families have day-and-night specialist advice at home as NICE asks, was not found in any source read.",
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
