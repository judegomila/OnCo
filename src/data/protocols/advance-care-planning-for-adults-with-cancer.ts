import { protocol } from "./helpers";

/*
 * Advance care planning for adults with cancer: who offers it, when, what is discussed, how it is recorded, shared and
 * reviewed. The glossary term `advance-care-planning` defines the word and lists the documents; this record carries the
 * steps of the conversation, which no record held. ReSPECT forms and decisions about resuscitation are a separate
 * record (`respect-and-dnacpr-decisions`).
 *
 * Scope of what was read. The step sources are NICE guidelines, written for England, and the Mental Capacity Act 2005,
 * which applies in England and Wales. Scottish and Northern Irish law and the Scottish and Welsh national planning
 * programmes were not read, and nothing is said about them beyond that.
 *
 * What was read, and how (all on 16 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - NICE NG108, Decision-making and mental capacity (published 3 October 2018): recommendations page, full text; the
 *   advance care planning recommendations are 1.1.30 to 1.1.45 in the text served.
 * - NICE NG142, End of life care for adults: service delivery (published 16 October 2019): recommendations page, full
 *   text. NICE QS13 (2011, last updated 2 September 2021): the quality statements page only.
 * - Mental Capacity Act 2005, sections 1, 4, 25 and 26: legislation.gov.uk, full text of those sections.
 * - ESMO Clinical Practice Guidelines, care of the adult cancer patient at the end of life (Crawford et al., ESMO Open
 *   2021): full text, Europe PMC XML (PMC8411064). It covers the last weeks and days of life and mentions advance care
 *   planning in one ungraded sentence.
 * - EAPC international consensus definition and recommendations (Rietjens et al., Lancet Oncol 2017): abstract only,
 *   Europe PMC; the 41 recommendations themselves are behind a paywall and were not read.
 * - ACTION cluster-randomised trial (Korfage et al., PLoS Med 2020): abstract, Europe PMC.
 * - Zhang et al., meta-analysis of randomised studies in advanced cancer (Int J Nurs Stud 2025): abstract only.
 *
 * Not read, and nothing rests on them:
 * - Universal Principles for Advance Care Planning (NHS England and partners, 2022): england.nhs.uk answered a script
 *   with an empty 202 response. Not reachable.
 * - GMC, Treatment and care towards the end of life: gmc-uk.org returned 403 to a script. Not reachable.
 *   (An earlier draft of this file used Internet Archive copies of both; that is a way round a block, so every step,
 *   grade row and sentence that rested on them was removed on the lead's ruling.)
 * - ESMO Clinical Practice Guidelines on advance care planning (Schrijvers and Cherny, Ann Oncol 2014):
 *   annalsofoncology.org returned 403 and Europe PMC holds no abstract or full text. Not reachable.
 * - ASCO guideline update on palliative care (2024): its abstract does not mention advance care planning and the full
 *   text could not be read (ascopubs.org 403), so it is not cited here.
 * - The Mental Capacity Act Code of Practice (the GOV.UK page was fetched but not the code itself).
 *
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied from the raw text with line breaks
 * joined and nothing else changed. NICE does not grade; the `grade` field says so and gives the recommendation number.
 */
export const advanceCarePlanningForAdultsWithCancer = protocol({
  id: "advance-care-planning-for-adults-with-cancer",
  name: "Advance care planning for adults with cancer: the conversation, the record, sharing and review",
  aka: ["advance care planning", "ACP", "planning ahead", "future care planning", "anticipatory care planning", "advance statement", "what matters to me conversation", "planning for future care"],
  domain: "palliative",
  tldr: "Advance care planning is a series of conversations, always your choice, in which you tell your care team and those close to you what matters to you and what care you would want if you later could not speak for yourself. Your team should offer it, write down what you agree in your own words, give you a copy, share it with your consent, and revisit it when your health or wishes change.",
  simple: "This is a conversation about your future care, and you decide whether and when to have it. You say what matters to you and who should be involved. It is written down, you keep a copy, and you can change it at any time.",
  summary: "This page describes how advance care planning is meant to be done so that patients and families know what to expect and what to ask for; your own team's process and local forms come first. In England, NICE NG108 asks every practitioner who meets a person after a life-limiting diagnosis to help them make an informed choice about taking part, to offer the discussion at the most suitable time after diagnosis and again later, to be ready to postpone it, to take account of the person's history, wishes, feelings, values and beliefs, to help them anticipate how their needs may change, to keep contemporaneous notes agreed with the person, to give them an accessible record, to share it with consent and to review it at reviews of treatment. NICE NG142 and quality standard QS13 place the offer with adults approaching the end of life, identified systematically, and ask that a copy of the plan is where the person lives and goes with them into hospital, a care home or a hospice. NG108 distinguishes the forms planning can take: advance decisions to refuse treatment and the appointment of an attorney are legally binding, while advance statements are not but must be considered carefully. In England and Wales the Mental Capacity Act 2005 requires anyone deciding a person's best interests to consider any relevant written statement the person made while they had capacity. The trial evidence is weaker than the guidance: in the ACTION cluster-randomised trial (1,117 patients with advanced lung or colorectal cancer, six European countries) structured conversations with trained facilitators did not change quality of life at 12 weeks, and 16 per cent of patients found the conversations distressing; a 2025 meta-analysis of 14 randomised studies found more advance directives completed and more use of palliative care, with no difference in anxiety, depression, satisfaction or quality of life. NHS England's Universal Principles for Advance Care Planning (2022) and the GMC's guidance on care towards the end of life could not be read, because both sites refused a script.",
  asOf: "2026-11-16",
  setting: {
    who: ["doctor", "nurse", "multidisciplinary-team", "patient-or-carer"],
    where: ["outpatient-clinic", "ward", "home", "community"],
  },
  population: "Adults with cancer who have the mental capacity to discuss their future care: NICE NG108 says planning should be offered to everyone at risk of losing capacity, for example through progressive illness, and NICE NG142 covers adults approaching the end of life. The steps are from NICE guidelines written for England and from the Mental Capacity Act 2005, which applies in England and Wales; Scotland and Northern Ireland have different capacity law, which was not read. None of the step sources is specific to cancer. Children and young people are outside this record, as are the ReSPECT form and resuscitation decisions, which have their own. Taking part is voluntary at every step, and your own team's process and local documents come first.",
  trigger: "A diagnosis that makes planning ahead useful, the person being thought to be approaching the end of life, a review of treatment or support, or the person asking.",
  steps: [
    {
      action: "Have a system that identifies adults who are likely to be approaching the end of life, so that the offer of planning is not left to chance",
      why: "People who are never identified are never asked, and then decisions are made in an emergency without knowing what they would have wanted.",
      source: "nice-ng142",
      quote: "People managing and delivering services should develop systems to identify adults who are likely to be approaching the end of their life (for example, using tools such as the Gold Standards Framework, the Amber Care Bundle or the Supportive and Palliative Care Indicators Tool [SPICT]).",
      grade: "Not graded (NICE NG142 1.1.1)",
    },
    {
      action: "Help the person make an informed choice about whether to take part, whichever professional they are seeing",
      why: "Planning ahead is optional, and a person can only choose it if someone has explained that it exists and what it involves.",
      source: "nice-ng108",
      quote: "All health and social care practitioners who come into contact with the person after diagnosis should help them to make an informed choice about participating in advance care planning.",
      grade: "Not graded (NICE NG108 1.1.33)",
    },
    {
      action: "Offer the discussion at a suitable time after the diagnosis, and offer it again later",
      why: "People think about these questions at their own pace, and what they want can change as the illness and its treatment change.",
      source: "nice-ng108",
      quote: "Offer the person a discussion about advance care planning: at the most suitable time once they receive a diagnosis likely to make advance care planning useful and at other times, allowing people to think through and address different issues in their own time.",
      grade: "Not graded (NICE NG108 1.1.34)",
    },
    {
      action: "Give spoken and written information about advance care planning that relates to the person's own condition",
      why: "A person needs to know what can be planned, and what each document does, before deciding what to put in it.",
      source: "nice-ng108",
      quote: "Offer people accessible verbal and written information about advance care planning, including how it relates to their own circumstances and conditions.",
      grade: "Not graded (NICE NG108 1.1.31)",
    },
    {
      action: "Be sensitive to people who prefer not to talk about this or not to have a plan, and be ready to postpone the discussion if the person wishes",
      why: "Some people are not ready, or prefer not to plan in this way, and nobody should feel pushed into the conversation.",
      source: "nice-ng108",
      quote: "be prepared to postpone discussions until a later date, if the person wishes",
      grade: "Not graded (NICE NG108 1.1.36)",
    },
    {
      action: "During the discussion, take account of the person's history, circumstances, wishes and feelings, values and beliefs, and anything else they consider important",
      why: "Treatment choices only make sense in the light of what the person values, so that comes before any question about a particular treatment.",
      source: "nice-ng108",
      quote: "take into account the person's history, social circumstances, wishes and feelings, values and beliefs (including religious, cultural and ethnic factors), aspirations and any other factors they may consider important to them",
      grade: "Not graded (NICE NG108 1.1.39)",
    },
    {
      action: "Help the person think ahead about how their needs may change, including who they want involved in decisions and their preferences for treatment, support and where they live",
      why: "A plan is for a future the person has not yet lived, and most people need help picturing what choices may come.",
      source: "nice-ng108",
      quote: "help the person to anticipate how their needs may change in the future.",
      grade: "Not graded (NICE NG108 1.1.39)",
    },
    {
      action: "Before the discussion, make sure you have the information about the person's medical condition that the conversation will need",
      why: "A plan built on a wrong picture of the illness, or on options that are not available, fails the person when it is needed.",
      source: "nice-ng108",
      quote: "Practitioners involved in advance care planning should ensure that they have access to information about the person's medical condition that helps them to support the advance care planning process.",
      grade: "Not graded (NICE NG108 1.1.35)",
    },
    {
      action: "Include family, friends, carers or an advocate if the person agrees, and arrange communication support such as an interpreter where it is needed",
      why: "The people close to someone are often the ones asked what the person would want, and they can only answer if they heard it from the person.",
      source: "nice-ng108",
      quote: "If the person has given consent for carers, family and friends or advocates to be involved in discussions about advance care planning, practitioners should take reasonable steps to include them.",
      grade: "Not graded (NICE NG108 1.1.37)",
    },
    {
      action: "Explain which forms of planning are legally binding (an advance decision to refuse treatment, appointing an attorney) and which are not (an advance statement)",
      why: "An advance statement guides the team but does not bind it; a valid advance decision or an attorney's decision does, in England and Wales, so the difference matters.",
      source: "nice-ng108",
      quote: "Some approaches involve the production of legally binding advance decisions, which only cover decisions to refuse medical treatment, or the appointment of an attorney.",
      grade: "Not graded (NICE NG108, introduction to the advance care planning recommendations)",
    },
    {
      action: "Write the notes at the time, agree them with the person, and ask their consent to share them",
      why: "A record the person has read and agreed is the one that will be trusted later, and it is theirs to share or keep private.",
      source: "nice-ng108",
      quote: "Practitioners must ensure that all notes made on advance care planning are contemporaneous.",
      grade: "Not graded (NICE NG108 1.1.40)",
    },
    {
      action: "Give the person an accessible document recording their wishes, beliefs and preferences that they can carry between services",
      why: "The plan belongs to the person, and a copy in their hands reaches places that computer systems do not.",
      source: "nice-ng108",
      quote: "Provide the person with an accessible document that records their wishes, beliefs and preferences in relation to advance care planning and which they may take with them to show different services.",
      grade: "Not graded (NICE NG108 1.1.41)",
    },
    {
      action: "Share the plan, with consent, with everyone involved in the person's care, and make sure a copy is where the person lives and goes with them into hospital, a care home or a hospice",
      why: "A plan that the ambulance crew, the out-of-hours doctor or the ward cannot see cannot guide them.",
      source: "nice-ng142",
      quote: "Service providers should have systems in place to ensure that adults approaching the end of their life each have a copy of their advance care plan available in their place of residence or with them if admitted to a hospital, care home or hospice.",
      grade: "Not graded (NICE NG142 1.6.3)",
    },
    {
      action: "Review the plan at reviews of treatment or support while the person has capacity, amend it if they wish, and offer a review as the end of life approaches",
      why: "People change their minds, and a plan made at one stage of an illness may not fit the next.",
      source: "nice-ng108",
      quote: "Review advance care plans at reviews of treatment or support, while the person has capacity, and amend as necessary, if the person wishes.",
      grade: "Not graded (NICE NG108 1.1.44)",
    },
    {
      action: "If the person later lacks capacity for a decision, use the plan: a valid and applicable advance decision is followed, an attorney with the right authority is consulted, and any written statement is weighed in deciding the person's best interests",
      why: "This is the moment the plan was made for, and in England and Wales the law requires what the person wrote while able to be taken into account.",
      source: "mca-2005",
      quote: "the person's past and present wishes and feelings (and, in particular, any relevant written statement made by him when he had capacity),",
      grade: "Statute (Mental Capacity Act 2005, section 4(6)(a); England and Wales)",
    },
  ],
  bestInClass: {
    statement: "A voluntary offer made by the team rather than left to the patient, repeated over time; a conversation that takes account of the person's wishes, feelings, values and beliefs and helps them anticipate how their needs may change; a record written at the time, agreed with the person, held by the person and shared with consent with everyone involved in their care; and review at reviews of treatment. That is what NICE NG108 (2018) and NICE NG142 (2019) set out for England; NICE does not grade its recommendations. The two guidelines differ on when the offer is made. NG108 places it after diagnosis of a long-term or life-limiting condition, at the most suitable time and again later. NG142 and quality standard QS13 place it with adults approaching the end of life, which NICE describes as the final weeks and months and, for some conditions, longer. The sources also differ on who leads: NICE asks all health and social care practitioners who meet the person to help, while the EAPC international consensus (109 experts, 2017) recommends trained non-physician facilitators and adapting the content to the person's readiness and to worsening health. The trials do not show what the guidance hopes for. In ACTION (23 hospitals, six European countries, 1,117 patients with advanced lung or colorectal cancer) scripted conversations with certified facilitators did not change quality of life or symptoms at 12 weeks (T-score change -1.8 against -0.8, p = 0.59); more intervention patients used specialist palliative care (37 against 27 per cent) and had an advance directive on file (10 against 3 per cent), and 16 per cent found the conversations distressing. A 2025 meta-analysis of 14 randomised studies in advanced cancer found more advance directives completed (odds ratio 7.93) and more palliative care use (odds ratio 1.39), with no difference in anxiety, depression, decisional conflict, satisfaction or quality of life, and inconsistent results on whether care matched preferences. So the guidance rests on the person's right to be involved and on consensus, and whether planning changes the care a person finally receives is not settled. Two documents that belong beside these, NHS England's Universal Principles for Advance Care Planning (2022) and the GMC's guidance on care towards the end of life, could not be read and are not represented.",
    sources: ["nice-ng108", "nice-ng142", "nice-qs13", "eapc-consensus-2017", "action-trial-2020", "zhang-meta-2025"],
  },
  variants: [
    {
      name: "Offered from diagnosis, or offered when approaching the end of life",
      differs: "NICE NG108 offers the discussion once a person has a diagnosis likely to make planning useful and gives information about the process to anyone recently diagnosed with a long-term or life-limiting condition. NICE NG142 asks service providers for policies so that planning is offered to adults approaching the end of their life, and QS13 statement 2 reads \"Adults approaching the end of their life have opportunities to discuss advance care planning.\"",
      evidence: "Neither NICE guideline grades the recommendation. No trial read compares an offer at diagnosis with an offer later in the illness; the 2025 meta-analysis states that the optimal timing needs to be clarified.",
      sources: ["nice-ng108", "nice-ng142", "nice-qs13", "zhang-meta-2025"],
    },
    {
      name: "Structured conversations led by a trained facilitator",
      differs: "A certified facilitator, often not the person's doctor, holds one or more scripted conversations with the patient and a family member, using standard leaflets and a standard advance directive form (the Respecting Choices model tested in ACTION). The EAPC consensus recommends \"using trained non-physician facilitators to support the ACP process\".",
      evidence: "ACTION: no difference in quality of life, symptoms, coping, satisfaction or shared decision making at 12 weeks; more specialist palliative care use and more advance directives in hospital files; a mean of 1.3 conversations per patient; 16 per cent of patients found the conversations distressing; recruitment was lower in intervention hospitals than in control hospitals, which the authors name as a key limitation. The EAPC recommendation is expert consensus (agreement between 68 and 100 per cent across its definitions and recommendations).",
      sources: ["action-trial-2020", "eapc-consensus-2017"],
    },
    {
      name: "The legal documents in England and Wales",
      differs: "An advance decision to refuse treatment is made under the Mental Capacity Act 2005. A refusal of life-sustaining treatment must be in writing, signed and witnessed, and verified by a statement that it applies even if life is at risk (section 25). In deciding a person's best interests, any relevant written statement they made while they had capacity must be considered (section 4), which is the legal footing of an advance statement. NICE NG108 names the appointment of an attorney under a lasting power of attorney as the other legally binding route.",
      evidence: "Statute, which extends to England and Wales. The Act does not extend to Scotland or Northern Ireland, whose law was not read; the GMC guidance for doctors across the UK could not be read.",
      sources: ["mca-2005", "nice-ng108"],
    },
    {
      name: "Planning with someone who cannot take a full part",
      differs: "NICE NG142 asks service providers for processes \"to take into account the views of carers and other people important to the person if the person approaching the end of their life lacks capacity to make decisions in line with the Mental Capacity Act 2005\". NICE NG108 asks practitioners to help everyone take part, by finding the barriers to their involvement and providing communication support such as communication aids, advocacy, interpreters or speech and language therapy. Under the Act, the person deciding must, so far as reasonably practicable, permit and encourage the person to participate as fully as possible.",
      evidence: "Guidance and statute (England and Wales); not graded.",
      sources: ["nice-ng142", "nice-ng108", "mca-2005"],
    },
  ],
  grades: [
    { claim: "Offer advance care planning to adults approaching the end of life, with policies that take account of under-served and vulnerable groups", grade: "Not graded (NICE NG142 1.6.1)", source: "nice-ng142", quote: "Service providers should develop policies to ensure that advance care planning is offered to adults who are approaching the end of their life. Policies should take into account under-served and vulnerable groups." },
    { claim: "Opportunities to discuss advance care planning for adults approaching the end of life (quality statement 2)", grade: "[new 2021]", source: "nice-qs13", quote: "Adults approaching the end of their life have opportunities to discuss advance care planning." },
    { claim: "Offer a discussion at the most suitable time after diagnosis and at other times", grade: "Not graded (NICE NG108 1.1.34)", source: "nice-ng108" },
    { claim: "Be sensitive, be prepared to postpone, and recognise that some people prefer not to have an advance care plan", grade: "Not graded (NICE NG108 1.1.36)", source: "nice-ng108", quote: "be sensitive, recognising that some people may prefer not to talk about this, or prefer not to have an advance care plan" },
    { claim: "Share advance care plans in a clear and simple format with everyone involved in the person's care, with consent", grade: "Not graded (NICE NG108 1.1.42)", source: "nice-ng108", quote: "Practitioners should share any advance care plans in a clear and simple format with everyone involved in the person's care, if the person has given consent." },
    { claim: "Protocols and plans should reflect that advance care planning is optional", grade: "Not graded (NICE NG108 1.1.30)", source: "nice-ng108", quote: "ensure that protocols and plans reflect the optional nature of advance care planning" },
    { claim: "Advance statements have no legal force but must be considered carefully", grade: "Not graded (NICE NG108, introduction to the advance care planning recommendations)", source: "nice-ng108", quote: "do not have legal force, but practitioners must consider them carefully when future decisions are being made, and need to be able to justify not adhering to them." },
    { claim: "Regular reviews of advance care plans are offered as part of care coordination", grade: "Not graded (NICE NG142 1.10.4)", source: "nice-ng142", quote: "ensure that regular discussions and reviews of care, holistic needs and advance care plans are offered" },
    { claim: "Definition of advance care planning and 41 recommendations, including adapting to readiness and using trained non-physician facilitators", grade: "Delphi consensus, agreement 68-100% (109 experts)", source: "eapc-consensus-2017", quote: "Of the 109 experts (82 from Europe, 16 from North America, and 11 from Australia) who rated the ACP definitions and its 41 recommendations, agreement for each definition or recommendation was between 68-100%." },
    { claim: "Advance care planning can identify substitute decision makers or prepare family members", grade: "Ungraded statement (ESMO 2021 text)", source: "esmo-eol-2021", quote: "Advance care planning with the patient can identify substitute decision makers, or prepare family members for death, a possible protective factor against later distress." },
    { claim: "Structured advance care planning did not change quality of life at 12 weeks in advanced lung or colorectal cancer", grade: "Cluster-randomised trial, 1,117 patients", source: "action-trial-2020", quote: "Mean change in patients' quality of life did not differ between intervention and control groups (T-score -1.8 versus -0.8, p = 0.59), nor did changes in symptoms, coping, patient satisfaction, and shared decision-making." },
    { claim: "Some patients found the conversations distressing", grade: "Cluster-randomised trial, 1,117 patients", source: "action-trial-2020", quote: "Sixteen percent of patients found ACP conversations distressing." },
    { claim: "Advance care planning raised completion of advance directives and use of palliative care in advanced cancer, without improving anxiety, depression, satisfaction or quality of life", grade: "Meta-analysis of 14 randomised studies", source: "zhang-meta-2025", quote: "It was not effective in improving anxiety, depression, decisional conflicts, patient satisfaction, and quality of life." },
  ],
  sources: [
    {
      key: "nhse-universal-principles-2022",
      label: "Universal Principles for Advance Care Planning (ACP)",
      publisher: "NHS England",
      year: 2022,
      url: "https://www.england.nhs.uk/publication/universal-principles-for-advance-care-planning/",
      read: "not-reachable",
      accessed: "2026-11-16",
    },
    {
      key: "nice-ng108",
      label: "Decision-making and mental capacity (NG108), recommendations",
      publisher: "NICE",
      year: 2018,
      url: "https://www.nice.org.uk/guidance/ng108/chapter/Recommendations",
      gradingScheme: "NICE does not grade recommendations; the wording ('must', 'should', 'offer', 'consider') shows their strength.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "nice-ng142",
      label: "End of life care for adults: service delivery (NG142), recommendations",
      publisher: "NICE",
      year: 2019,
      url: "https://www.nice.org.uk/guidance/ng142/chapter/Recommendations",
      gradingScheme: "NICE does not grade recommendations; the wording shows their strength.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "nice-qs13",
      label: "End of life care for adults (QS13), quality statements (2011, last updated September 2021)",
      publisher: "NICE",
      year: 2021,
      url: "https://www.nice.org.uk/guidance/qs13/chapter/Quality-statements",
      gradingScheme: "Quality statements are not graded; each is tagged with the year it was written or updated ([new 2021], [2011, updated 2021]).",
      read: "public-summary",
      accessed: "2026-11-16",
    },
    {
      key: "gmc-end-of-life-care",
      label: "Treatment and care towards the end of life: good practice in decision making",
      publisher: "General Medical Council",
      year: 2024,
      url: "https://www.gmc-uk.org/professional-standards/the-professional-standards/treatment-and-care-towards-the-end-of-life",
      read: "not-reachable",
      accessed: "2026-11-16",
    },
    {
      key: "mca-2005",
      label: "Mental Capacity Act 2005, sections 1 (principles), 4 (best interests), 25 and 26 (advance decisions)",
      publisher: "UK Parliament (legislation.gov.uk); extends to England and Wales",
      year: 2005,
      url: "https://www.legislation.gov.uk/ukpga/2005/9/section/4",
      gradingScheme: "Statute, not a guideline: its provisions are law in England and Wales.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "esmo-eol-2021",
      label: "Care of the adult cancer patient at the end of life: ESMO Clinical Practice Guidelines",
      publisher: "ESMO (ESMO Open, Crawford et al.)",
      year: 2021,
      url: "https://doi.org/10.1016/j.esmoop.2021.100225",
      doi: "10.1016/j.esmoop.2021.100225",
      gradingScheme: "[level, grade]: levels I to V and grades A to E, adapted from the IDSA/USPHS system; the sentence on advance care planning is in the text and carries no grade.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "eapc-consensus-2017",
      label: "Definition and recommendations for advance care planning: an international consensus supported by the European Association for Palliative Care",
      publisher: "The Lancet Oncology (Rietjens et al.)",
      year: 2017,
      url: "https://doi.org/10.1016/S1470-2045(17)30582-X",
      doi: "10.1016/S1470-2045(17)30582-X",
      gradingScheme: "Formal Delphi consensus; each definition and recommendation is reported with its percentage agreement.",
      read: "abstract",
      accessed: "2026-11-16",
    },
    {
      key: "action-trial-2020",
      label: "Advance care planning in patients with advanced cancer: a 6-country, cluster-randomised clinical trial (ACTION)",
      publisher: "PLoS Medicine (Korfage et al.)",
      year: 2020,
      url: "https://doi.org/10.1371/journal.pmed.1003422",
      doi: "10.1371/journal.pmed.1003422",
      read: "abstract",
      accessed: "2026-11-16",
    },
    {
      key: "zhang-meta-2025",
      label: "Effects of advance care planning for patients with advanced cancer: a meta-analysis of randomized controlled studies",
      publisher: "International Journal of Nursing Studies (Zhang et al.)",
      year: 2025,
      url: "https://doi.org/10.1016/j.ijnurstu.2025.105096",
      doi: "10.1016/j.ijnurstu.2025.105096",
      read: "abstract",
      accessed: "2026-11-16",
    },
    {
      key: "esmo-acp-2014",
      label: "ESMO Clinical Practice Guidelines on palliative care: advanced care planning",
      publisher: "ESMO (Annals of Oncology, Schrijvers and Cherny)",
      year: 2014,
      url: "https://doi.org/10.1093/annonc/mdu241",
      doi: "10.1093/annonc/mdu241",
      read: "not-reachable",
      accessed: "2026-11-16",
    },
  ],
  terms: ["advance-care-planning", "advance-decision-to-refuse-treatment", "lasting-power-of-attorney-health-welfare", "respect-process", "serious-illness-conversation-guide", "gold-standards-framework", "prognostic-evaluation-advanced-cancer"],
  related: ["respect-and-dnacpr-decisions", "early-palliative-care-referral", "care-in-the-last-days-of-life", "palliative-sedation-for-refractory-suffering", "strong-opioids-for-cancer-pain", "distress-screening-and-referral", "consent-and-education-before-anticancer-treatment", "palliative-care", "hospice-end-of-life"],
  upgrades: [],
  gaps: [
    "Whether advance care planning changes the care a person with cancer finally receives is not settled. ACTION found no effect on quality of life at 12 weeks, and the 2025 meta-analysis found inconsistent results on whether care matched preferences. Both were read as abstracts.",
    "The ESMO guideline on advance care planning (2014) could not be read: the publisher refused a script, no archived copy of the article was found and Europe PMC holds no abstract. Nothing here rests on it, and whether ESMO has replaced it was not established.",
    "The EAPC consensus was read as an abstract only; its 41 recommendations, which are the most detailed international statement of the steps, are behind a paywall.",
    "NHS England's Universal Principles for Advance Care Planning (2022), the national statement for England of what a good planning conversation looks like, could not be read: england.nhs.uk answered a script with an empty 202 response. This page therefore states none of its principles, and the steps here come from NICE alone.",
    "The GMC guidance Treatment and care towards the end of life could not be read: gmc-uk.org returned 403 to a script. This page therefore does not state what the regulator requires of doctors across the UK in these conversations, and has no UK-wide source for the steps.",
    "No source read is specific to cancer except the trials. The NICE texts apply to any condition.",
    "No source read sets a time by which the first conversation should have been offered after a diagnosis of advanced cancer, or an interval for review; review is triggered by change.",
    "The Scottish and Northern Irish statutes, the Scottish and Welsh national programmes and the Mental Capacity Act Code of Practice were not read, so this page states the legal position for England and Wales only.",
    "The ASCO palliative care guideline update (2024) could not be read in full, so how it treats advance care planning is not stated here. Other systems' documents, such as POLST in the United States, are shown on the ReSPECT and DNACPR page.",
  ],
});
