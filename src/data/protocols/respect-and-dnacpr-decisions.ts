import { protocol } from "./helpers";

/*
 * ReSPECT plans and decisions about cardiopulmonary resuscitation (DNACPR) in the United Kingdom: the conversation,
 * who signs, capacity and best interests, what the form does and does not do, review and portability. The glossary
 * term `respect-process` defines the form; this record carries the steps, which no record held. The wider conversation
 * about future care is `advance-care-planning-for-adults-with-cancer`.
 *
 * Scope of what was read. These are UK processes. The joint BMA, Resuscitation Council UK and RCN guidance is written
 * for all four UK countries and says where the law differs; the statute read is the Mental Capacity Act 2005 (England
 * and Wales). The Adults with Incapacity (Scotland) Act 2000, the Mental Capacity Act (Northern Ireland) 2016, the All
 * Wales DNACPR policy, the Scottish national DNACPR policy and the court judgments the guidance cites (Tracey,
 * Winspear) were not read; what is said about them is what the joint guidance says.
 *
 * What was read, and how (first on 16 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - Resuscitation Council UK, "The ReSPECT process: a guide for clinicians completing the plan" (PDF dated February
 *   2023, for version 3 of the form): full text, pdftotext. The version 3 specimen form itself is an image with no
 *   text layer and could not be read as text; its sections are described from the clinicians' guide.
 * - Resuscitation Council UK ReSPECT pages (overview, for healthcare professionals, for patients and carers, adoption
 *   across the UK, research), the patient guide "ReSPECT and You" (version 2.0), "Guidance for people with a ReSPECT
 *   plan" (2025) and the ReSPECT policy briefing (updated February 2026): full text.
 * - Decisions relating to cardiopulmonary resuscitation, guidance from the BMA, the Resuscitation Council (UK) and the
 *   RCN, 3rd edition (1st revision) 2016: full text from resus.org.uk, pdftotext (plain and -layout; the two-column
 *   pages interleave in places, so each quote was checked to be one continuous passage). The Resuscitation Council UK
 *   page says this is the latest edition and that a further review is under way. It predates ReSPECT's roll-out.
 * - NHS website, Do not attempt cardiopulmonary resuscitation (DNACPR) decisions (page last reviewed 14 December
 *   2023): full text. A patient page for England.
 * - Mental Capacity Act 2005, sections 1, 4, 25 and 26: legislation.gov.uk.
 * - National POLST (polst.org), "About the POLST form" and "For patients" pages: full text, for the comparison with the
 *   United States only.
 * - Perkins et al., ReSPECT mixed-methods evaluation (NIHR Health and Social Care Delivery Research 2022; PMID
 *   36548453): abstract. Hawkes et al., development of ReSPECT (Resuscitation 2020): abstract. Perkins et al., DNACPR
 *   evidence synthesis (NIHR HS&DR 2016): abstract. Fritz et al., Universal Form of Treatment Options (PLoS One 2013):
 *   abstract. Vranas et al., systematic review of POLST (J Am Geriatr Soc 2021): abstract.
 *
 * Not read, and nothing rests on them:
 * - GMC, Treatment and care towards the end of life (its section on cardiopulmonary resuscitation): gmc-uk.org returned
 *   403 to a script. Not reachable.
 * - NHS England and partners, Universal Principles for Advance Care Planning (2022): england.nhs.uk answered a script
 *   with an empty 202 response. Not reachable.
 *   (An earlier draft of this file used Internet Archive copies of both; that is a way round a block, so every step,
 *   grade row and sentence that rested on them was removed or re-sourced on the lead's ruling.)
 * - The Care Quality Commission's interim report on DNACPR decisions during the pandemic (2020) and the Parliamentary
 *   and Health Service Ombudsman report on DNACPR conversations (2024), as the Resuscitation Council UK policy briefing
 *   names them.
 *
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied from the raw text with line breaks
 * joined and end-of-line hyphenation undone, nothing else. None of these bodies grades its statements.
 *
 * Second accuracy pass, 17 November 2026. Every source above was fetched again raw with curl (PDFs through pdftotext,
 * web pages with tags stripped by script, abstracts from the Europe PMC REST service) and every quote, including the
 * quotations inside the variants, was checked verbatim by script: all matched. Section 24 of the Mental Capacity Act
 * was read as well. gmc-uk.org again returned 403 and england.nhs.uk again an empty 202, so both stay unread. No newer
 * edition of the joint guidance exists: its Resuscitation Council UK page still says a review is under way. Changes
 * made: "must be explained" brought back to the guidance's "presumption in favour of explaining", with its exception
 * for harm; the attorney's power worded as each source words it; legal statements scoped to the nation they apply to;
 * reasons in `why` that no source gave replaced with what the sources say; and the Care Quality Commission report
 * named as the policy briefing names it.
 */
export const respectAndDnacprDecisions = protocol({
  id: "respect-and-dnacpr-decisions",
  name: "ReSPECT plans and DNACPR decisions in the UK: the conversation, the form, capacity and review",
  aka: ["ReSPECT form", "ReSPECT plan", "DNACPR", "DNAR", "DNR", "do not attempt cardiopulmonary resuscitation", "do not resuscitate", "resuscitation decision", "CPR decision", "emergency care and treatment plan", "treatment escalation plan", "TEP"],
  domain: "palliative",
  tldr: "In the UK, a ReSPECT plan records what matters to you and which treatments are recommended in an emergency when you cannot speak for yourself, including whether resuscitation (CPR) should be tried. It is made in conversation with you, or those close to you. It is a recommendation, not legally binding. A decision not to attempt resuscitation covers resuscitation only; all other care continues.",
  simple: "A ReSPECT plan is a form you keep with you. It tells ambulance crews and doctors what matters to you and which treatments are recommended in an emergency, including whether to try to restart your heart. You should be part of the conversation, and you can ask for it to be looked at again.",
  summary: "This page explains how these conversations and forms are meant to work in the UK, so that patients and families know what to expect and what to ask; your own team's policy and local forms come first. The joint BMA, Resuscitation Council UK and RCN guidance (3rd edition, 1st revision, 2016) sets the rules for any decision about cardiopulmonary resuscitation (CPR): decisions are individual, never blanket; they are best made ahead of a crisis within wider planning; there is a presumption in favour of involving the person, and a conversation may be delayed or avoided only where it is likely to cause them physical or psychological harm; where CPR has no realistic prospect of success the decision is a clinical one that does not need consent but there must be a presumption in favour of explaining it to the person; where CPR might work, the balance of benefit and burden is not solely a clinical decision and calls for open dialogue and shared decision making; a valid and applicable advance refusal must be respected; a person who lacks capacity has the decision made in their best interests (in Scotland, their benefit) after consulting those close to them, who help the team decide and do not decide themselves unless they hold legal authority; the most senior clinician responsible carries overall responsibility; a second opinion is offered on disagreement; and the decision is documented, reviewed and travels with the person. A DNACPR decision applies only to CPR. ReSPECT (Resuscitation Council UK, version 3 of the form) sets the CPR recommendation inside a summary plan: a shared understanding of the person's health, what matters to them, an agreed focus of care between extending life and comfort, specific recommendations in plain words, the CPR recommendation, capacity, who was involved, clinicians' signatures, emergency contacts and review. The plan is not legally binding, is not an advance decision to refuse treatment, cannot be used to demand treatment, and may recommend that CPR is attempted. The 2016 guidance gives average survival to discharge after CPR as 15 to 20 per cent in most hospitals and usually 5 to 10 per cent outside hospital, and stresses that these are averages across everyone in whom CPR was tried: an individual's chance could range from zero to almost 100 per cent depending on the cause and circumstances. The GMC's guidance on resuscitation decisions and NHS England's Universal Principles for Advance Care Planning could not be read, because both sites refused a script.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "nurse", "multidisciplinary-team", "emergency-team", "patient-or-carer"],
    where: ["ward", "outpatient-clinic", "home", "community", "emergency-department"],
  },
  population: "Adults in the United Kingdom, with cancer or any other condition, for whom a cardiac or respiratory arrest or a sudden deterioration is foreseeable, or who want to record their preferences for emergency care. These are UK processes. ReSPECT is used in much of England and in 8 of the 14 Scottish health boards, Northern Ireland has decided to adopt it, and Wales uses an all-Wales DNACPR policy instead (Resuscitation Council UK, February 2026); other areas use their own forms, such as a DNACPR form, a treatment escalation plan or London's Universal Care Plan. The law on capacity differs between England and Wales, Scotland and Northern Ireland. Children and young people are covered by the sources but not by this record. Other countries use different instruments (see variants for POLST in the United States). Your own team's policy and form come first.",
  trigger: "The person is approaching the end of life or is at risk of cardiac or respiratory arrest or sudden deterioration, is admitted acutely unwell, or asks to record what they would want in an emergency.",
  steps: [
    {
      action: "Consider whether a decision about resuscitation is needed for anyone approaching the end of life or at risk of cardiac or respiratory arrest; where arrest is not foreseeable, there is no need to raise it",
      why: "Without a decision made ahead of time, the default in an emergency is to attempt resuscitation, including for people it could not help or who would not have wanted it.",
      source: "cpr-decisions-2016",
      quote: "Considering explicitly, and whenever possible making specific anticipatory decisions about, whether or not to attempt CPR is an important part of good-quality care for any person who is approaching the end of life and/or is at risk of cardiorespiratory arrest.",
      grade: "Not graded (main message 1)",
    },
    {
      action: "Have the conversation ahead of a crisis, as part of wider planning for future care",
      why: "The guidance says these decisions are best made before a crisis forces a hurried one in an emergency setting.",
      source: "cpr-decisions-2016",
      quote: "For many people, anticipatory decisions about CPR are best made in the wider context of advance care planning, before a crisis necessitates a hurried decision in an emergency setting.",
      grade: "Not graded (main message 3)",
    },
    {
      action: "Involve the person as fully as possible, or those best able to speak for them if they cannot take part; do not complete the plan without them",
      why: "The plan is meant to record what the person wants and what is realistic for them, which cannot be known without asking.",
      source: "rcuk-respect-clinician-guide",
      quote: "Do not complete the plan without maximum possible involvement of the person in the process (or of those best able to speak for them if they do not have capacity for involvement).",
      grade: "Not graded (ReSPECT guide, before you start)",
    },
    {
      action: "Reach a shared understanding of the person's health conditions and how they may change",
      why: "In the guide, the goal of care and the recommendations follow from this shared view of the person's conditions and how they may progress.",
      source: "rcuk-respect-clinician-guide",
      quote: "Discuss, explain and achieve a shared understanding of the person’s relevant health conditions and how these may progress or change.",
      grade: "Not graded (ReSPECT guide, section 2)",
    },
    {
      action: "Ask what matters most to the person, their values and fears, and record it in their own words where possible",
      why: "Some people want every treatment that might lengthen life, some want comfort above all, and many want a balance; only the person can say which.",
      source: "rcuk-respect-clinician-guide",
      quote: "Summarise what the person says would matter most to them (values and fears), both in daily life and as an outcome of future emergency treatment.",
      grade: "Not graded (ReSPECT guide, section 3)",
    },
    {
      action: "Agree the overall focus of care (extending life, a balance, or comfort) and write specific recommendations in plain words, such as whether hospital admission or intensive care would be wanted",
      why: "The guide says to avoid jargon and use wording easily understood by all who may respond to an emergency in any health or care setting.",
      source: "rcuk-respect-clinician-guide",
      quote: "Following from clinical understanding and the values and fears agreed in sections 2 and 3, establish an agreed overall goal of care, and sign one of the three boxes:",
      grade: "Not graded (ReSPECT guide, section 4)",
    },
    {
      action: "Where resuscitation might restart the heart and breathing, weigh its possible benefits against its harms and burdens with the person, in open dialogue, unless they decline the discussion",
      why: "Whether the chance of benefit is worth the risk of harm is the person's judgement to make, not only the doctor's.",
      source: "cpr-decisions-2016",
      quote: "For a patient with capacity there should be open dialogue and shared decision-making between the patient and professionals, unless the patient declines any such discussion.",
      grade: "Not graded (section 6)",
    },
    {
      action: "Where the team judges that resuscitation has no realistic prospect of success, explain the decision and the reasons for it to the person, or to those close to a person who lacks capacity, unless telling the person is likely to cause them physical or psychological harm",
      why: "Consent to such a decision is not needed, but the guidance sets a presumption in favour of explaining it. The NHS website says that in England the law gives you the right to be involved in, and informed of, the decision.",
      source: "cpr-decisions-2016",
      quote: "Even when CPR has no realistic prospect of success, there must be a presumption in favour of explaining the need and basis for a DNACPR decision to a patient, or to those close to a patient who lacks capacity.",
      grade: "Not graded (main message 10)",
    },
    {
      action: "Make every decision on the individual's own situation, never by age, disability, diagnosis or where they live",
      why: "The guidance calls blanket policies for groups, such as everyone in a nursing home or over a certain age, unethical and probably unlawful; the NHS website for England says such decisions are unlawful.",
      source: "cpr-decisions-2016",
      quote: "Every decision about CPR must be made on the basis of a careful assessment of each individual’s situation. These decisions should never be dictated by ‘blanket’ policies.",
      grade: "Not graded (main message 4)",
    },
    {
      action: "Assume the person has capacity; if there is reason to doubt it, assess capacity for this decision, and if it is lacking follow the capacity law of the UK nation the person is in",
      why: "Adults are assumed to have capacity unless there is clear evidence to the contrary. The law on what must happen when capacity is lacking differs between England and Wales, Scotland and Northern Ireland.",
      source: "rcuk-respect-clinician-guide",
      quote: "If the person lacks capacity for a specific decision, or they cannot have capacity (e.g. they are unconscious), the decision must be made by following the requirements of capacity legislation.",
      grade: "Not graded (ReSPECT guide, section 5)",
    },
    {
      action: "For a person who lacks capacity, check for an advance decision refusing resuscitation and for an attorney or other legal proxy with authority, and consult those close to the person about what they would have wanted",
      why: "Family and friends know the person's wishes; unless they hold legal authority they help the team decide rather than carry the weight of deciding.",
      source: "cpr-decisions-2016",
      quote: "Those close to the patient must be consulted about CPR decisions that are made on a balance of benefits and risks, in particular to determine any previously expressed wishes and what level or chance of recovery or risk the patient would have been likely to consider acceptable.",
      grade: "Not graded (section 10.1)",
    },
    {
      action: "Respect a refusal of resuscitation made by a person with capacity, or in a valid and applicable advance decision",
      why: "The guidance calls it well established in law and ethics that an adult with capacity may refuse any treatment, even if that results in their death. Advance decisions are covered by statute in England and Wales only; for Scotland and Northern Ireland the 2016 guidance says they are likely to be binding under common law.",
      source: "cpr-decisions-2016",
      quote: "If a patient with capacity refuses CPR, or a patient lacking capacity has a valid and applicable advance decision to refuse treatment (ADRT), specifically refusing CPR, this must be respected.",
      grade: "Not graded (main message 8)",
    },
    {
      action: "Sign the plan with the date and time as the professional who completed it, and have the senior responsible clinician review and endorse it at the earliest practicable time; the person's own signature is optional",
      why: "Resuscitation Council UK says the professional signs to confirm their responsibility for following the ReSPECT process and capacity and human rights law; the person's signature shows they took part and does not make the plan legally binding.",
      source: "rcuk-respect-clinician-guide",
      quote: "As the professional who completed the ReSPECT plan, you must sign this section and record the date and time.",
      grade: "Not graded (ReSPECT guide, section 7)",
    },
    {
      action: "Record the decision, the reasons for it and the discussions behind it in the health record, including the reasons if the person or their family could not be involved and the plan to involve them as soon as possible",
      why: "The form is a summary, and the guidance says the health record often needs detail beyond it. Recording a plan to involve the person or their family as soon as possible is from the ReSPECT clinicians' guide (section 6).",
      source: "cpr-decisions-2016",
      quote: "Clear and full documentation of decisions about CPR, the reasons for them, and the discussions that informed those decisions, is an essential part of high-quality care.",
      grade: "Not graded (main message 19)",
    },
    {
      action: "Make clear to the person, those close to them and the whole team that a decision not to attempt resuscitation applies to resuscitation only",
      why: "The guidance calls it a common fear among the public that a DNACPR decision will lead to other treatment being withheld; all other appropriate treatment and care should continue.",
      source: "cpr-decisions-2016",
      quote: "It is essential that healthcare professionals, patients and those close to patients understand that a decision not to attempt CPR applies only to CPR and not to any other element of care or treatment.",
      grade: "Not graded (main message 16)",
    },
    {
      action: "Offer a second opinion if the person or those close to them disagree with the decision",
      why: "The guidance says a second opinion should be offered; where every member of a multidisciplinary team has endorsed the decision, a further opinion may not be needed.",
      source: "cpr-decisions-2016",
      quote: "Where a patient or those close to a patient disagree with a DNACPR decision a second opinion should be offered.",
      grade: "Not graded (main message 12)",
    },
    {
      action: "Keep the plan with the person, tell family and carers where it is, and send it with them whenever they move between home, hospital, care home and hospice",
      why: "Resuscitation Council UK's guidance for people with a plan says to keep it somewhere easy to find and to make sure family or carers know where it is, in case you cannot reach it yourself in an emergency.",
      source: "cpr-decisions-2016",
      quote: "Recorded decisions about CPR should accompany a patient when they move from one setting to another.",
      grade: "Not graded (main message 22)",
    },
    {
      action: "Review the plan when the person or those close to them ask, when their condition changes and when they move to a different care setting",
      why: "A decision made during one illness may not fit a recovery, a relapse or a change of mind.",
      source: "cpr-decisions-2016",
      quote: "Triggers for review should include any request from the patient or those close to them, any substantial change in the patient’s clinical condition or prognosis and transfer of the patient to a different location (including transfer within a healthcare establishment).",
      grade: "Not graded (main message 6)",
    },
    {
      action: "In an emergency, follow the recommendations unless there are valid reasons not to; where no decision has been recorded, start from a presumption in favour of resuscitation",
      why: "The plan guides the professionals on the spot, who make the final decision; Resuscitation Council UK says they should have valid reasons for not following a plan's recommendations. The guidance adds that where nothing is recorded but a person is in the advanced stages of a terminal illness and resuscitation would not succeed, a carefully considered decision not to start it should be supported.",
      source: "cpr-decisions-2016",
      quote: "Where no explicit decision about CPR has been considered and recorded in advance there should be an initial presumption in favour of CPR.",
      grade: "Not graded (main message 24)",
    },
  ],
  bestInClass: {
    statement: "A resuscitation decision made ahead of a crisis, with the person, on their individual situation, explained even where the clinician judges that resuscitation would not work, documented with its reasons, reviewed on request, on a change in condition and on a move between settings, portable across services, and understood by everyone to apply to resuscitation alone. That is what the joint BMA, Resuscitation Council UK and RCN guidance (2016) sets out; it does not grade its statements and is under review. The GMC's guidance for doctors, which covers the same ground, could not be read. Where the sources differ is the form the decision is recorded on. The first position is a standalone DNACPR form, which the 2016 guidance was written around and which Wales uses under an all-Wales policy. The second is an emergency care and treatment plan that sets the resuscitation recommendation inside the person's overall goals of care: ReSPECT, which Resuscitation Council UK recommends as the single plan for all ages in England, or another local tool (the NHS website names treatment escalation plans, and Resuscitation Council UK notes that much of London uses the Universal Care Plan). The evidence for the second position is observational. An NIHR evidence synthesis (2016) found about 1,500 incidents involving DNACPR decisions reported a year, a third of them reporting harm, and found that linking the decision to an overall treatment plan improved clarity and reduced harms. A before-and-after study of one such plan in one acute hospital (the Universal Form of Treatment Options) found fewer harmful events in patients with a decision not to attempt resuscitation (a rate difference of 12.9 per 1,000 patient-days). The NIHR evaluation of ReSPECT itself (England, 2017 to 2020) found patient or family involvement recorded on 513 of 706 forms reviewed (73 per cent), harms on the NHS Safety Thermometer similar with and without a form, and conversations that ranged from open-ended to simply informing the patient of a decision already made; its authors say incomplete adoption limited what could be concluded about outcomes. No randomised trial of either approach was found.",
    sources: ["cpr-decisions-2016", "rcuk-respect-clinician-guide", "rcuk-respect-pages", "rcuk-respect-policy-2026", "nhs-dnacpr", "perkins-dnacpr-synthesis-2016", "fritz-ufto-2013", "perkins-respect-evaluation-2022"],
  },
  variants: [
    {
      name: "What a ReSPECT plan is not",
      differs: "Resuscitation Council UK's guidance for people with a plan answers three common questions. It is not legally binding: \"they should have valid reasons for not following the recommendations on a ReSPECT plan\" and \"The ReSPECT plan is not an Advance Decision to Refuse Treatment (ADRT).\" It is not the same as a DNACPR form: \"It includes a recommendation about CPR, but that may be a recommendation that CPR is attempted, or a recommendation that it is not attempted.\" And its patient page says \"the ReSPECT plan cannot be used to demand treatments that are not likely to benefit you and would not be offered.\"",
      evidence: "The form's owner describing its own form. A person in England or Wales who wants a refusal of resuscitation to be legally binding needs an advance decision to refuse treatment that meets the Mental Capacity Act 2005, sections 24 to 26; the NHS website says the same of a DNACPR form.",
      sources: ["rcuk-respect-patient-guides", "rcuk-respect-pages", "mca-2005", "nhs-dnacpr"],
    },
    {
      name: "Standalone DNACPR form",
      differs: "Records only the decision not to attempt resuscitation, on a form recognised locally or nationally. The NHS website says such a form \"can be written for a short period\" or \"with no end date\", that the person should be told when it will be reviewed, and that a decision made in hospital is included in the discharge summary and shared with the GP. Wales has had an all-Wales DNACPR policy for adults since 2015.",
      evidence: "The NIHR evidence synthesis (2016) found variation and suboptimal practice across settings, and across its focus groups a \"negative impact on overall patient care of having a DNACPR decision and the conflation of ‘do not resuscitate’ with ‘do not provide active treatment’\". The All Wales policy itself was not read.",
      sources: ["nhs-dnacpr", "rcuk-respect-policy-2026", "perkins-dnacpr-synthesis-2016", "cpr-decisions-2016"],
    },
    {
      name: "Law on capacity, by UK nation",
      differs: "In England and Wales a person who lacks capacity has the decision made in their best interests under the Mental Capacity Act 2005, after consulting anyone they named, their carers and others interested in their welfare; the NHS website (England) says an attorney under a lasting power of attorney that covers life-sustaining treatment can make the decision about CPR in the person's best interests but cannot insist on CPR being given, while the 2016 joint guidance says only that it is likely, though untested in the courts, that such an attorney can decide that CPR should not be attempted. In Scotland the test is benefit under the Adults with Incapacity (Scotland) Act 2000, with a welfare attorney or guardian. For Northern Ireland the 2016 joint guidance says statutory provision \"has not been implemented yet; it is nonetheless good practice to discuss decision-making with those close to the patient\", and that the Mental Capacity Act (Northern Ireland) passed in 2016 awaited its code of practice. Advance decisions to refuse treatment are statutory in England and Wales only; the joint guidance says that in Scotland and Northern Ireland \"it is likely that they are binding under common law\".",
      evidence: "Statute and professional guidance. The joint guidance dates from 2016; the Scottish and Northern Irish Acts were not read, the Northern Irish position may have moved since, and the GMC guidance that would give a later statement could not be read.",
      sources: ["cpr-decisions-2016", "mca-2005", "nhs-dnacpr"],
    },
    {
      name: "United States: POLST, a signed medical order",
      differs: "National POLST describes its form as \"a portable medical order for patients who have a progressing serious illness or frailty due to aging\". Unlike a ReSPECT plan, which is a recommendation that the person need not sign, \"Since the POLST form is a medical order, it should be completed and signed by you and your doctor.\" It covers resuscitation, hospital transfer, intensive care and ventilation, and tube feeding, is run state by state under different names, and sits beside an advance directive, which is the legal document that names a decision maker.",
      evidence: "A systematic review (20 observational studies, 104,554 patients, 27,090 with POLST) found no randomised trials, moderate-strength evidence that treatment limitations on POLST may reduce treatment intensity at the end of life, and that in acute care a sizable number of patients likely received care that did not match their POLST. The two systems have not been compared with each other in any source read.",
      sources: ["polst-national", "vranas-polst-2021", "rcuk-respect-patient-guides"],
    },
    {
      name: "Temporary suspension around a procedure",
      differs: "Where a planned procedure could itself cause an arrest that prompt treatment would probably reverse, such as cardiac catheterisation, pacemaker insertion or an operation, the joint guidance says the decision should be reviewed beforehand and discussed with the patient, or their representative, as part of consent to the procedure: \"Some patients may wish a DNACPR decision to remain valid despite the risk of a cardiorespiratory arrest from a reversible cause; others will request that the DNACPR decision is suspended temporarily.\" When the decision will be reinstated is agreed in advance and documented.",
      evidence: "Professional guidance (section 7.3); not graded.",
      sources: ["cpr-decisions-2016"],
    },
  ],
  grades: [
    { claim: "Overall responsibility for a resuscitation decision rests with the most senior clinician responsible for the person's care, as local policy defines; this could be a consultant, a GP or a suitably experienced nurse", grade: "Not graded (section 14)", source: "cpr-decisions-2016", quote: "The overall clinical responsibility for decisions about CPR, including DNACPR decisions, rests with the most senior clinician responsible for the person’s care as defined explicitly by local policy." },
    { claim: "A resuscitation decision form is not legally binding", grade: "Not graded (main message 20)", source: "cpr-decisions-2016", quote: "A CPR decision form in itself is not legally binding." },
    { claim: "Consent is not needed for a decision not to attempt resuscitation that has no realistic prospect of success; there must still be a presumption in favour of explaining it", grade: "Not graded (main message 10)", source: "cpr-decisions-2016", quote: "It is not necessary to obtain the consent of a patient or of those close to a patient to a decision not to attempt CPR that has no realistic prospect of success." },
    { claim: "Those close to a patient who lacks capacity help the team decide; they do not take the decision unless they hold legal authority", grade: "Not graded (section 10)", source: "cpr-decisions-2016", quote: "it should be made clear to those close to the patient that their role is not to take decisions on behalf of the patient, but to help the healthcare team to make an appropriate decision in the patient’s best interests." },
    { claim: "A conversation may be delayed or avoided only where it is likely to cause the patient physical or psychological harm", grade: "Not graded (main message 14)", source: "cpr-decisions-2016", quote: "A decision to delay or avoid communication of a decision to a patient must be based on that communication being likely to cause the patient physical or psychological harm." },
    { claim: "A DNACPR decision does not override clinical judgement where an arrest has a reversible cause that was not envisaged, such as choking", grade: "Not graded (main message 17)", source: "cpr-decisions-2016", quote: "A DNACPR decision does not override clinical judgement in the unlikely event of a reversible cause of the person’s respiratory or cardiac arrest that does not match the circumstances envisaged when that decision was made and recorded." },
    { claim: "Decisions must be free from discrimination, for example on grounds of disability", grade: "Not graded (main message 18)", source: "cpr-decisions-2016", quote: "Decisions about CPR must be free from any discrimination, for example in respect of a disability." },
    { claim: "A recommendation not to attempt CPR must be discussed with the person unless it would cause physiological or psychological harm, with the reasons documented", grade: "Not graded (ReSPECT guide, section 4)", source: "rcuk-respect-clinician-guide", quote: "Remember that clinicians must discuss a recommendation not to attempt CPR with the person concerned, unless it is thought that it will cause physiological or psychological harm; if you believe this is so, you must document your reasons in section 6 and in the person’s health record." },
    { claim: "Signatures of the person or those close to them are optional and do not make the plan legally binding", grade: "Not graded (ReSPECT guide, section 8)", source: "rcuk-respect-clinician-guide", quote: "Their signatures are optional. They do not make the plan legally binding." },
    { claim: "The person must be told that a DNACPR form has been or will be completed, though consent is not needed (England, patient information)", grade: "Not graded (NHS website)", source: "nhs-dnacpr", quote: "You must be told that a DNACPR form will be/has been completed for you, but a doctor does not need your consent." },
    { claim: "Decisions for groups of people at once are unlawful (England, patient information)", grade: "Not graded (NHS website)", source: "nhs-dnacpr", quote: "DNACPR decisions should not be made for a group of people at once." },
    { claim: "Average survival to discharge after in-hospital cardiac arrest where CPR is attempted", grade: "Not graded (section 1; an average, as cited in the 2016 guidance)", source: "cpr-decisions-2016", quote: "In most hospitals the average survival to discharge is in the range of 15-20%." },
    { claim: "ReSPECT evaluation in England, 2017 to 2020: use and involvement", grade: "Mixed-methods evaluation (observational)", source: "perkins-respect-evaluation-2022", quote: "Involvement of the patient and/or family was recorded on 513 of 706 (73%) ReSPECT forms reviewed." },
    { claim: "ReSPECT evaluation: harms", grade: "Mixed-methods evaluation (observational)", source: "perkins-respect-evaluation-2022", quote: "The frequency of harms reported on the NHS Safety Thermometer was similar among patients with or without a ReSPECT form." },
    { claim: "Linking DNACPR to an overall treatment plan improved clarity and reduced harms", grade: "Evidence synthesis (systematic review and NHS data)", source: "perkins-dnacpr-synthesis-2016", quote: "Linking DNACPR to overall treatment plans improved clarity about goals of care, aided communication and reduced harms." },
    { claim: "POLST: strength of evidence", grade: "Moderate strength of evidence (systematic review of observational studies)", source: "vranas-polst-2021", quote: "We found moderate strength of evidence that treatment limitations on POLST may reduce treatment intensity among patients with serious illness." },
  ],
  sources: [
    {
      key: "rcuk-respect-clinician-guide",
      label: "The ReSPECT process: a guide for clinicians completing the plan (for version 3 of the form)",
      publisher: "Resuscitation Council UK",
      year: 2023,
      url: "https://www.resus.org.uk/sites/default/files/2023-02/ReSPECT%20Guide%20for%20Clinicians_FINAL.pdf",
      gradingScheme: "Not graded: section-by-section instructions from the body that owns the form.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "rcuk-respect-pages",
      label: "ReSPECT: overview, for healthcare professionals, for patients and carers, adoption across the UK, and research pages",
      publisher: "Resuscitation Council UK",
      year: 2026,
      url: "https://www.resus.org.uk/respect",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "rcuk-respect-patient-guides",
      label: "ReSPECT and You: Planning Together (version 2.0) and Guidance for people with a ReSPECT plan",
      publisher: "Resuscitation Council UK",
      year: 2025,
      url: "https://www.resus.org.uk/sites/default/files/2025-09/Guidance%20for%20people%20with%20a%20respect%20plan.pdf",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "rcuk-respect-policy-2026",
      label: "ReSPECT: progress and recommendations for UK-wide implementation (policy briefing, updated February 2026)",
      publisher: "Resuscitation Council UK",
      year: 2026,
      url: "https://www.resus.org.uk/sites/default/files/2026-03/ReSPECT%20policy%20briefing%20February%202026_0.pdf",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "cpr-decisions-2016",
      label: "Decisions relating to cardiopulmonary resuscitation: guidance from the British Medical Association, the Resuscitation Council (UK) and the Royal College of Nursing, 3rd edition (1st revision)",
      publisher: "BMA, Resuscitation Council UK, RCN",
      year: 2016,
      url: "https://www.resus.org.uk/sites/default/files/2020-05/20160123%20Decisions%20Relating%20to%20CPR%20-%202016.pdf",
      gradingScheme: "Not graded: 25 numbered main messages and a decision-making framework, with legal requirements stated for England and Wales, Scotland and Northern Ireland.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "gmc-end-of-life-care",
      label: "Treatment and care towards the end of life: good practice in decision making, section on cardiopulmonary resuscitation",
      publisher: "General Medical Council",
      year: 2024,
      url: "https://www.gmc-uk.org/professional-standards/the-professional-standards/treatment-and-care-towards-the-end-of-life/cardiopulmonary-resuscitation-cpr",
      read: "not-reachable",
      accessed: "2026-11-17",
    },
    {
      key: "nhse-universal-principles-2022",
      label: "Universal Principles for Advance Care Planning (ACP)",
      publisher: "NHS England",
      year: 2022,
      url: "https://www.england.nhs.uk/publication/universal-principles-for-advance-care-planning/",
      read: "not-reachable",
      accessed: "2026-11-17",
    },
    {
      key: "nhs-dnacpr",
      label: "Do not attempt cardiopulmonary resuscitation (DNACPR) decisions (page last reviewed 14 December 2023)",
      publisher: "NHS website (England), patient information",
      year: 2023,
      url: "https://www.nhs.uk/tests-and-treatments/do-not-attempt-cardiopulmonary-resuscitation-dnacpr-decisions/",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "mca-2005",
      label: "Mental Capacity Act 2005, sections 1 (principles), 4 (best interests) and 24 to 26 (advance decisions)",
      publisher: "UK Parliament (legislation.gov.uk); extends to England and Wales",
      year: 2005,
      url: "https://www.legislation.gov.uk/ukpga/2005/9/section/4",
      gradingScheme: "Statute, not a guideline: its provisions are law in England and Wales.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "polst-national",
      label: "About the POLST form, and POLST for patients",
      publisher: "National POLST (United States)",
      year: 2026,
      url: "https://polst.org/for-patients/about-polst-form/",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "perkins-respect-evaluation-2022",
      label: "Recommended summary plan for emergency care and treatment: ReSPECT, a mixed-methods study (Health and Social Care Delivery Research, volume 10, number 40; PMID 36548453)",
      publisher: "NIHR Journals Library (Perkins et al.)",
      year: 2022,
      url: "https://europepmc.org/article/MED/36548453",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "hawkes-respect-2020",
      label: "Development of the Recommended Summary Plan for Emergency Care and Treatment (ReSPECT)",
      publisher: "Resuscitation (Hawkes et al.)",
      year: 2020,
      url: "https://doi.org/10.1016/j.resuscitation.2020.01.003",
      doi: "10.1016/j.resuscitation.2020.01.003",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "perkins-dnacpr-synthesis-2016",
      label: "Do-not-attempt-cardiopulmonary-resuscitation decisions: an evidence synthesis",
      publisher: "NIHR Health Services and Delivery Research (Perkins et al.)",
      year: 2016,
      url: "https://doi.org/10.3310/hsdr04110",
      doi: "10.3310/hsdr04110",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "fritz-ufto-2013",
      label: "The Universal Form of Treatment Options (UFTO) as an alternative to Do Not Attempt Cardiopulmonary Resuscitation (DNACPR) orders: a mixed methods evaluation of the effects on clinical practice and patient care",
      publisher: "PLoS One (Fritz et al.)",
      year: 2013,
      url: "https://doi.org/10.1371/journal.pone.0070977",
      doi: "10.1371/journal.pone.0070977",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "vranas-polst-2021",
      label: "The influence of POLST on treatment intensity at the end of life: a systematic review",
      publisher: "Journal of the American Geriatrics Society (Vranas et al.)",
      year: 2021,
      url: "https://doi.org/10.1111/jgs.17447",
      doi: "10.1111/jgs.17447",
      read: "abstract",
      accessed: "2026-11-17",
    },
  ],
  terms: ["respect-process", "advance-care-planning", "advance-decision-to-refuse-treatment", "lasting-power-of-attorney-health-welfare", "polst", "five-wishes"],
  related: ["advance-care-planning-for-adults-with-cancer", "early-palliative-care-referral", "care-in-the-last-days-of-life", "palliative-sedation-for-refractory-suffering", "strong-opioids-for-cancer-pain", "distress-screening-and-referral", "consent-and-education-before-anticancer-treatment", "palliative-care", "hospice-end-of-life"],
  upgrades: [],
  gaps: [
    "No source read gives the chance of resuscitation succeeding for people with cancer in particular. The averages quoted are for everyone in whom CPR was attempted, as cited in the 2016 guidance, and the guidance itself says an individual's chance ranges from zero to almost 100 per cent; ask your own team what applies to you.",
    "The joint BMA, Resuscitation Council UK and RCN guidance dates from 2016, before ReSPECT was rolled out and before later changes in Northern Ireland; Resuscitation Council UK says a review is under way. The statements about Scottish and Northern Irish law are from that guidance, not from the statutes, and are ten years old.",
    "The GMC guidance Treatment and care towards the end of life, whose section on cardiopulmonary resuscitation is the regulator's statement of what doctors across the UK must do, could not be read: gmc-uk.org returned 403 to a script, and did so again on 17 November 2026, so the year given for it here is not confirmed. This page therefore does not state the GMC's duties on discussing, recording and reviewing these decisions; the steps rest on the 2016 joint guidance and the Resuscitation Council UK guide instead.",
    "NHS England's Universal Principles for Advance Care Planning (2022) could not be read: england.nhs.uk answered a script with an empty 202 response, and did so again on 17 November 2026. This page therefore does not state what it says about resuscitation decisions within planning.",
    "The version 3 ReSPECT form is published as an image without readable text, so its wording is taken from the clinicians' guide rather than the form.",
    "Whether a ReSPECT plan leads to better outcomes than a standalone DNACPR form has not been tested in a randomised trial found here. The NIHR evaluation was observational, covered the first two years of use in England, and was read as an abstract.",
    "ReSPECT is not available everywhere: Resuscitation Council UK says people should not expect to use it until it is established locally. Which form is used where you live is a question for your GP or hospital team; the Resuscitation Council UK adoption page lists areas.",
    "The All Wales DNACPR policy, the Scottish national policy, London's Universal Care Plan, the Care Quality Commission's interim report on DNACPR decisions during the pandemic (2020) and the Ombudsman's report on DNACPR conversations (2024), both named in the Resuscitation Council UK policy briefing, were not read.",
    "POLST and ReSPECT have not been compared directly in any source read; the United States comparison shows what each body says about its own form.",
  ],
});
