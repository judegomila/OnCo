import { protocol } from "./helpers";

/*
 * Long-term follow-up after cancer in childhood, adolescence or young adulthood, organised by what treatment a person
 * had (exposure-based follow-up): the treatment summary or survivorship passport, the risk-based surveillance plan and
 * the move to adult care. A framework record: it describes how the follow-up is organised and its main surveillance
 * items with their thresholds, not all 165 sections of the COG guidelines. Heart surveillance has its own record
 * (`cardiomyopathy-surveillance-after-childhood-cancer`), as do breast screening after chest radiotherapy, hearing
 * protection with cisplatin and fertility preservation; they are linked, not repeated.
 *
 * What was read, and how (all on 16 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - Children's Oncology Group Long-Term Follow-Up Guidelines for Survivors of Childhood, Adolescent, and Young Adult
 *   Cancers, Version 6.0, October 2023: public PDF from childrensoncologygroup.org, pdftotext. This is the current
 *   version (the COG survivorship page lists versions 1.0 to 5.0 as archive). Read: the preface (goal, target population,
 *   methods, scoring, benefits and harms, Passport for Care), the instructions for use, "New to Version 6.0", and
 *   sections 1 (any cancer experience), 33 (heavy metals, hearing), 34 and 77 (heart), 67 (thyroid nodules), 73 (breast)
 *   and 86 (colorectal cancer after radiation), plus the gonadal counselling text. The other sections were not read.
 *   Tables come out of the PDF with cells interleaved, so schedules are given in prose and only whole sentences quoted.
 * - DeVine et al., JAMA Oncol 2025, the COG review of Version 6.0: abstract only (Europe PMC; the full-text service
 *   returned an error on the day and pmc.ncbi.nlm.nih.gov served a bot challenge, which was not bypassed).
 * - IGHG recommendations documents (PDFs on ighg.org, pdftotext, each in full): breast cancer surveillance 2020 and 2025,
 *   thyroid cancer surveillance 2018, ototoxicity surveillance 2019, premature ovarian insufficiency 2016, male
 *   gonadotoxicity 2017, cardiomyopathy 2022. Each is the edition the IGHG topic page lists as current. The journal
 *   articles behind them were not read here.
 * - PanCareFollowUp Recommendations (van Kalsbeek et al., Eur J Cancer 2021): abstract only; the 25 recommendations
 *   themselves were not read.
 * - PanCareSurFup recommendations for the organisation of long-term follow-up (Michel et al., J Cancer Surviv 2019):
 *   abstract only.
 * - The Survivorship Passport (Haupt et al., Eur J Cancer 2018) and the PanCare transition definition paper (Mulder et
 *   al., Eur J Cancer 2016): abstracts only.
 * - SIGN 132, Long term follow up of survivors of childhood cancer (March 2013): full guideline PDF from sign.ac.uk.
 *   SIGN's page says "Some recommendations may be out of date".
 * - Children's Cancer and Leukaemia Group (CCLG, a UK charity and professional association), public page "Follow-up
 *   support service pathways": read as a public summary. The CCLG "Therapy based long term follow up" practice statement
 *   could NOT be found on the group's public guidelines page and was not read; it is named in gaps,
 *   not cited as a source (its edition and year could not be read), and no step rests on it.
 *
 * Every DOI was resolved through Crossref or Europe PMC and its title checked. Quotes are copied from the raw text with
 * line breaks joined and nothing else changed; where a source sentence ends in footnote symbols the quote stops before
 * them. "CAYA" in a quote is the source's abbreviation for childhood, adolescent and young adult; "LTFU" for long-term
 * follow-up.
 */
export const longTermFollowUpAfterChildhoodCancer = protocol({
  id: "long-term-follow-up-after-childhood-cancer",
  name: "Long-term follow-up after childhood, teenage and young adult cancer, planned by the treatment received",
  aka: ["late effects clinic", "long-term follow-up clinic", "LTFU", "exposure-based follow-up", "risk-based survivorship care", "COG Long-Term Follow-Up Guidelines", "survivorship passport", "SurPass", "Passport for Care", "aftercare after childhood cancer", "transition to adult care after childhood cancer"],
  domain: "survivorship",
  tldr: "After cancer treatment in childhood or young adulthood, follow-up is planned around the treatment a person had. Each survivor should have a written summary of every medicine with its total dose, every radiotherapy area and every operation, and from it a personal plan of checks, such as heart scans, breast screening or hearing tests. The plan should carry on into adult life under a named service.",
  simple: "The checks you need after childhood cancer depend on the treatment you had. Ask for a written summary of your treatment and a plan that says which checks you need and how often. Keep a copy, and show it to any new doctor.",
  summary: "The COG Long-Term Follow-Up Guidelines (Version 6.0, October 2023; 165 exposure sections and 45 patient Health Links) are the most complete exposure-based guideline. They apply from two or more years after the end of treatment to survivors with no symptoms, and work in three moves: obtain the cancer treatment summary (agents, cumulative anthracycline dose in doxorubicin equivalents, radiation fields and doses, surgery, transplant and chronic graft-versus-host disease status); compile the sections that apply; and build an individual screening plan. By COG's own count 68 per cent of sections rest mainly on history and examination, 27 per cent include periodic tests and 5 per cent recommend no screening. COG scores each section by expert consensus (1, 2A, 2B) and states that no randomised trial of screening exists in this population. The IGHG harmonises individual topics with graded recommendations, and where an IGHG guideline exists it is the more rigorous source: cardiomyopathy (2022), breast cancer (2020 and 2025), thyroid cancer (2018), ototoxicity (2019), premature ovarian insufficiency (2016) and male gonadotoxicity (2017) are summarised in the steps. In Europe the PanCareFollowUp recommendations (2021) combine the IGHG guidelines with 25 pragmatic recommendations for topics IGHG has not yet covered, and PanCareSurFup (2019) recommends that risk-adapted follow-up under a survivorship expert service be available to every survivor throughout life. Tools that turn a treatment record into a personal plan are Passport for Care (COG) and the European Survivorship Passport.\n\nWhere the sources differ: COG examines the thyroid by hand every year after neck radiation, while IGHG makes thyroid cancer surveillance a shared decision between palpation every 1 to 2 years and ultrasound every 3 to 5 years; COG lists radiation with potential impact to the heart more broadly than IGHG; SIGN 132 (2013) and the UK aftercare pathways sort survivors into three levels of follow-up intensity, which COG and IGHG do not. This page explains how follow-up is organised; a survivor's own long-term follow-up team decides the plan, and their plan comes first.",
  asOf: "2026-11-16",
  setting: {
    who: ["doctor", "nurse", "multidisciplinary-team", "patient-or-carer"],
    where: ["outpatient-clinic", "community", "home"],
  },
  population: "People who have completed treatment for a cancer diagnosed in childhood, adolescence or young adulthood and are well, from about two years after the end of treatment and for the rest of life (COG: asymptomatic survivors presenting for routine exposure-related follow-up; IGHG and PanCare: childhood, adolescent and young adult cancer survivors). Not covered: checking for return of the original cancer, which COG states its guidelines do not address; survivors with new symptoms, who need assessment rather than a screening schedule; and adults treated for adult cancers, whose end-of-treatment summary is a separate protocol. The schedules given are examples of the main surveillance items, not the whole plan, and the plan made by a survivor's own follow-up team comes first.",
  trigger: "Treatment ends; follow-up by treatment received begins about two years later and is reviewed at each visit, at the move from children's to adult services, and when a new guideline version changes a schedule.",
  steps: [
    {
      action: "Write a full treatment summary at the end of treatment: diagnosis and dates, every chemotherapy agent with its total dose, every radiotherapy field with its dose, every operation, and any transplant",
      why: "Follow-up years later depends on details that are hard to recover once hospital records are archived, and a guideline written in the future may ask about a drug that seems unimportant today.",
      source: "cog-ltfu-v6",
      quote: "Therefore, we strongly advise that a comprehensive treatment summary be prepared for each childhood cancer survivor, including a record of all therapeutic exposures with applicable dates, details of administration, and cumulative doses of all agents, including those not currently addressed by these guidelines.",
    },
    {
      action: "Give the summary, with a list of the late effects to watch for, to the survivor, to their parents or carers and to the GP",
      why: "The survivor is the one person present at every future appointment, so they need to hold their own history.",
      source: "sign-132",
      quote: "At the end of a course of cancer treatment, patients, their parents or carers and general practitioners should be given a summary of the treatment and a list of signs of late effects to look out for.",
      grade: "good practice point",
    },
    {
      action: "Start follow-up by treatment received about two years after treatment ends, alongside, not instead of, the checks for the original cancer",
      why: "Checks for the cancer coming back and checks for effects of the treatment are two different jobs with different timetables.",
      source: "cog-ltfu-v6",
      quote: "These guidelines are intended for use beginning two or more years following the completion of cancer therapy, and provide a framework for ongoing late effects monitoring in childhood cancer survivors; however, these guidelines are not intended to provide guidance for follow-up of the pediatric cancer survivor’s primary disease.",
    },
    {
      action: "From the summary, list the guideline sections that apply to this person and turn them into one personal screening plan",
      why: "Two people who had the same cancer may have had different treatment, so the plan is built from the treatment, and adjusted for the person's health, habits and wishes.",
      source: "cog-ltfu-v6",
      quote: "Review all guideline sections generated in the list above, and develop a plan for screening the individual survivor, taking into consideration the survivor’s relevant risk factors, current health, co-morbidities, health-related behaviors and preferences.",
    },
    {
      action: "Go through the plan with a clinician who knows late effects, so that it is neither over-tested nor left unexplained",
      why: "The guidelines are written for professionals and list many possible problems; most survivors will meet only a few, and someone needs to say which matter for them.",
      source: "cog-ltfu-v6",
      quote: "This is important in order to put the recommendations in perspective, avoid over-testing, address potential anxieties, and provide a comprehensive evaluation of the survivor’s health status.",
    },
    {
      action: "Make a careful history and physical examination the core of each visit, adding tests only where the treatment received calls for them",
      why: "Most late effects are found by asking and examining; by COG's count about two thirds of its sections need no routine test.",
      source: "cog-ltfu-v6",
      quote: "Importantly, the recommended periodic screening underscores the use of a thorough history and physical examination (H&P) as the primary assessment for cancer-related treatment effects.",
    },
    {
      action: "Ask every survivor each year about school or work, mood, relationships and money, whatever treatment they had",
      why: "Having had cancer young can affect education, employment and mental health even when the body has recovered, and help is available.",
      source: "cog-ltfu-v6",
      quote: "Psychological consultation in patients with emotional difficulties related to cancer experience, including physical deformities or chronic disabilities.",
      grade: "SCORE = 1",
    },
    {
      action: "After anthracyclines or radiotherapy that reached the heart, arrange heart ultrasound scans by dose group: every 2 years at high risk, every 5 years at moderate risk, none at low risk",
      why: "These treatments can weaken the heart muscle silently years later; the linked heart protocol gives the dose bands.",
      source: "ighg-cardiomyopathy-2022",
      quote: "Cardiomyopathy surveillance is recommended for high-risk CAYA cancer survivors to begin no later than 2 years after completion of cardiotoxic therapy and continued every 2 years thereafter (moderate-quality evidence, strong recommendation).",
      grade: "moderate-quality evidence, strong recommendation",
    },
    {
      action: "For women who had 10 Gy or more of radiotherapy to the chest, start yearly breast screening with mammogram and breast MRI at age 25 or 8 years after the radiotherapy, whichever is later",
      why: "Breast tissue exposed to radiation when young has a much higher chance of cancer, and at a younger age than national screening starts.",
      source: "ighg-breast-2025",
      quote: "Initiation of breast cancer surveillance is recommended at age 25 years or ≥8 years from radiation (whichever occurs last) (high-quality evidence, strong recommendation).",
      grade: "high-quality evidence, strong recommendation",
    },
    {
      action: "After radiotherapy that included the thyroid gland, explain the raised risk of thyroid cancer and decide together whether to check by feeling the neck or by ultrasound, or not to screen",
      why: "Most thyroid cancers found this way are curable either way, and screening also finds many harmless lumps that lead to biopsies, so the choice is the survivor's.",
      source: "ighg-thyroid-2018",
      quote: "It is recommended that at-risk survivors (i.e., those treated with radiation therapy that includes the thyroid gland) (level A evidence) should be counseled about options for differentiated thyroid carcinoma surveillance.",
      grade: "level A evidence",
    },
    {
      action: "After cisplatin, or 30 Gy or more of radiotherapy to the head or brain, test hearing from the end of treatment: every year under age 6, every other year from 6 to 12, then every 5 years, and refer any loss to an audiologist",
      why: "Hearing loss from these treatments can go unnoticed in a child and hold back speech and schooling; hearing aids and classroom support help.",
      source: "ighg-ototoxicity-2019",
      quote: "Referral to an audiologist or auditory clinic is recommended for any survivor who has symptoms suggesting hearing loss or abnormal audiological test results showing a loss of more than 15 dB absolute threshold level (1000–8000 Hz) (expert opinion*).",
      grade: "expert opinion",
    },
    {
      action: "In girls who had alkylating chemotherapy or radiotherapy that may have reached the ovaries, follow growth and puberty at least yearly, and check hormone levels if puberty does not start or progress or periods become irregular",
      why: "These treatments can cause the ovaries to stop working early; finding it allows hormone replacement and timely advice about fertility.",
      source: "ighg-poi-2016",
      quote: "Monitoring of growth (height) and pubertal development and progression (Tanner stage) is recommended for pre-pubertal survivors treated with potentially gonadotoxic chemotherapy and/or radiotherapy potentially exposing the ovaries (expert opinion and no literature search).",
      grade: "expert opinion and no literature search",
    },
    {
      action: "For boys and men who had treatment that can affect sperm production, explain the risk and offer a semen test when they ask or when they want to become a father, not as a routine check",
      why: "The result matters when someone is thinking about having children, and a test at the wrong time can worry without helping.",
      source: "ighg-male-2017",
      quote: "Surveillance for impaired spermatogenesis should be performed only at the request of the survivor after informed discussion or when paternity is desired in the foreseeable future (expert opinion).",
      grade: "expert opinion",
    },
    {
      action: "After radiotherapy to the abdomen, pelvis or lower spine, or total body irradiation, begin bowel cancer screening early, by a test chosen with the survivor",
      why: "Bowel that was in a radiation field has a raised cancer risk, so COG starts screening earlier than it would otherwise begin. COG gives colonoscopy every 5 years or a stool DNA test every 3 years.",
      source: "cog-ltfu-v6",
      quote: "Beginning 5 years after radiation or at age 30 years (whichever occurs last)",
      grade: "SCORE = 2A",
    },
    {
      action: "Tell every survivor, and any clinician who sees them, that the chance of a new, different cancer is raised for life, and encourage them to take up national screening and report new lumps or symptoms",
      why: "A second cancer can appear anywhere and decades later; knowing this shortens the time to diagnosis.",
      source: "sign-132",
      quote: "Healthcare professionals should be aware that survivors of childhood cancer are at particular and lifelong increased risk of developing a subsequent primary cancer and that this may occur at any site on the body.",
      grade: "C",
    },
    {
      action: "Name one person who coordinates the survivor's follow-up across specialties",
      why: "A survivor may see many departments; without one person holding the plan, checks are duplicated or dropped.",
      source: "sign-132",
      quote: "Each survivor of childhood cancer should have access to an appropriate designated key worker to coordinate care.",
      grade: "good practice point",
    },
    {
      action: "Plan the move from children's to adult services ahead of time, with the young person, and hand over the treatment summary and the plan",
      why: "Follow-up can lapse at this handover: a young adult may not want a children's clinic, and an adult clinic may not know childhood treatments.",
      source: "sign-132",
      quote: "It should be recognised that teenagers may not want to be seen by paediatric services and that adult services may not be appropriate to follow up survivors of childhood cancers.",
    },
    {
      action: "Keep follow-up available for life, matched to the person's risk, under a service with expertise in survivorship",
      why: "Late effects can first appear decades after treatment, so there is no age at which a higher-risk survivor is discharged from the plan.",
      source: "pancaresurfup-2019",
      quote: "We recommend that risk-adapted LTFU care provided under the guidance of a cancer survivorship expert service or cancer centre should be available and accessible for all CAYA cancer survivors throughout their lifespan.",
      grade: "strong recommendation, low level evidence and expert opinion",
    },
    {
      action: "Keep teaching survivors about their cancer, their treatment and their risks as they grow up, in words that fit their age",
      why: "A child treated at four was not part of the conversation; as an adult they need to know enough to look after their own health.",
      source: "pancaresurfup-2019",
      quote: "To improve health outcomes and quality of survivorship of current and future survivors, continued age-adapted education of survivors about the cancer, its treatment, risk of late effects, importance of health behaviours, and necessity of LTFU is important along the cancer and survivorship trajectory.",
    },
  ],
  bestInClass: {
    statement: "Two bodies define current best practice and they are complementary. The COG Long-Term Follow-Up Guidelines, Version 6.0 (October 2023), cover every exposure in one document, updated at least every 5 years, with each section scored by expert consensus; COG says plainly that they are not conventional evidence-based guidelines, because no randomised trial of screening exists in this population. The IGHG guidelines cover fewer topics but grade both the evidence and the strength of each recommendation, and where one exists it is the stronger source; COG Version 6.0 adopted the IGHG 2022 heart schedule. In Europe, PanCareFollowUp (2021) joins the IGHG guidelines to 25 pragmatic recommendations for topics not yet harmonised, and PanCareSurFup (2019) makes strong recommendations, on low-level evidence and expert opinion, that risk-adapted follow-up under a survivorship expert service be available for life. All agree on the method: a complete treatment summary, a plan derived from exposures, history and examination as the core, and follow-up that continues into adulthood.\n\nThey differ on particular items. Thyroid after neck radiation: COG schedules a yearly thyroid examination; IGHG recommends counselling and a shared decision between palpation every 1 to 2 years, ultrasound every 3 to 5 years, or no surveillance. Breast: both start mammography and MRI at 25 or 8 years after chest radiation; IGHG sets the threshold at 10 Gy or more, adds upper abdominal radiation and, since 2025, 200 mg/m² or more of doxorubicin as a reasonable indication, and names 60 as the age to which annual surveillance is recommended, while COG adds a clinical breast examination yearly from puberty and six-monthly from 25 and says the upper age limit has not been established. Hearing: the two give the same intervals (yearly to age 5, every 2 years from 6 to 12, then every 5 years). Organisation: SIGN 132 and the UK aftercare pathways sort survivors into three levels of follow-up intensity; COG and IGHG set the content of surveillance and leave the model of care to the health system.",
    sources: ["cog-ltfu-v6", "ighg-cardiomyopathy-2022", "ighg-breast-2025", "ighg-thyroid-2018", "ighg-ototoxicity-2019", "pancarefollowup-2021", "pancaresurfup-2019", "sign-132", "cclg-aftercare-pathways"],
  },
  variants: [
    {
      name: "Passport for Care (Children's Oncology Group and Baylor College of Medicine)",
      differs: "A web tool in which the clinic enters the treatment and receives the COG recommendations that apply to that survivor, instead of working through the full guideline by hand. COG describes it as \"a web-based interface, known as “Passport for Care,” that generates individualized exposure-based recommendations from these guidelines in a clinician-focused format\".",
      evidence: "COG's preface names the length of the guideline and the effort of finding the relevant sections as barriers to its use, and says the tool is free to COG member institutions. No outcome study of the tool was read.",
      sources: ["cog-ltfu-v6"],
    },
    {
      name: "European Survivorship Passport (SurPass)",
      differs: "An electronic document given to each survivor, translatable into European languages, holding the treatment history and screening recommendations generated automatically from the IGHG and PanCareSurFup guidelines, which the treating doctor can adjust. The developers describe \"personalised follow-up and screening recommendations based on guidelines published by the International Guidelines Harmonization Group and PanCareSurFup.\"",
      evidence: "Haupt 2018 (abstract): developed by PanCare and SIOP Europe paediatric oncologists with survivors' and parents' organisations; a data schema of up to 168 variables; tested at one Italian centre with positive feedback. The abstract estimates 300,000 to 500,000 childhood cancer survivors in Europe. Later implementation studies exist and were not read.",
      sources: ["surpass-2018"],
    },
    {
      name: "PanCareFollowUp Recommendations (Europe, 2021)",
      differs: "Uses the IGHG guidelines where they exist and adds 25 harmonised recommendations for topics IGHG had not yet addressed, sorted by what each requires: awareness only (6), awareness with history or examination (9), or additional surveillance tests (10).",
      evidence: "Developed by 23 late effects specialists, researchers and survivor representatives from nine countries by what the authors call a pragmatic methodology, \"in anticipation of evidence-based IGHG guidelines\", with an external consultation of 18 experts from 14 countries. Read as an abstract only, so the individual recommendations are not given here.",
      sources: ["pancarefollowup-2021"],
    },
    {
      name: "Three levels of follow-up by treatment intensity (SIGN 132, Scotland, 2013)",
      differs: "Five or more years from treatment, survivors are placed in one of three levels: level 1, surgery alone or low-risk chemotherapy, followed by post or telephone every 1 to 2 years; level 2, chemotherapy or cranial irradiation of 24 Gy or less, followed by a nurse or in primary care every 1 to 2 years; level 3, radiotherapy other than low-dose cranial irradiation, megatherapy or bone marrow transplant, followed yearly in a medically supervised clinic. For level 3 the text says \"They should be seen in a medically supervised long term follow up clinic three to four times a year until final height is achieved and at least annually thereafter.\"",
      evidence: "Described by SIGN as possible levels of follow up, not a graded recommendation. SIGN notes that nurse-led or primary care-led follow-up \"may miss some individual problems\", giving early puberty after low-dose cranial irradiation as an example. The guideline dates from 2013 and SIGN's page says some recommendations may be out of date.",
      sources: ["sign-132"],
    },
    {
      name: "United Kingdom aftercare pathways (National Cancer Survivorship Initiative, published by CCLG)",
      differs: "CCLG publishes a paediatric aftercare pathway and two teenage and young adult aftercare pathways, one for levels 1 and 2 and one for level 3 complex care, as downloadable diagrams. The page says the initiative \"was created to offer each survivor a high-quality, personalised aftercare package enabling them to reach their full potential in life.\"",
      evidence: "A public page of a charity and professional association, read as a summary; the pathway diagrams themselves were not read, and no evidence grading is given. The page states there are over 45,000 survivors of children's and young people's cancer in the United Kingdom.",
      sources: ["cclg-aftercare-pathways"],
    },
    {
      name: "Thyroid checks after neck radiation: a yearly examination (COG) or a shared decision (IGHG)",
      differs: "COG section 67 lists a thyroid examination every year, with ultrasound for a lump that can be felt. IGHG asks the clinician to explain the options first: \"If periodic thyroid palpation is chosen as the screening modality it may be reasonable to repeat surveillance for differentiated thyroid carcinoma every 1-2 years (expert opinion; weak recommendation).\" With ultrasound it may be reasonable to repeat every 3 to 5 years, starting 5 years after the radiotherapy.",
      evidence: "IGHG sets out both sides: palpation has low sensitivity (17 to 43 per cent) and high specificity (96 to 100 per cent) for a nodule; ultrasound has high sensitivity and specificity for nodules but poor ability to tell a cancer from a harmless nodule, and \"There are no randomized studies that demonstrate a clear benefit of DTC surveillance.\" COG scores its section 1.",
      sources: ["cog-ltfu-v6", "ighg-thyroid-2018"],
    },
  ],
  grades: [
    { claim: "COG: what a score of 1 means", grade: "Category 1", source: "cog-ltfu-v6", quote: "All “Category 1” recommendations reflect uniform consensus among the reviewers." },
    { claim: "COG: the guidelines rest on expert consensus because no randomised trials of screening exist", grade: "statement in the preface (not a graded recommendation)", source: "cog-ltfu-v6", quote: "This is due to the fact that there are no randomized clinical trials (and none forthcoming in the foreseeable future) on which to base recommendations for periodic screening evaluations in this population; therefore, the guidelines should not be misconstrued as representing conventional “evidence-based clinical practice guidelines” or “standards of care”." },
    { claim: "COG: possible harms of following the guidelines", grade: "statement in the preface (not a graded recommendation)", source: "cog-ltfu-v6", quote: "Potential harms of guideline implementation include increased patient anxiety related to enhanced awareness of possible complications, as well as the potential for false-positive screening evaluations, leading to unnecessary further workup." },
    { claim: "Annual breast surveillance to at least age 60 after 10 Gy or more of chest radiation", grade: "high-quality evidence, strong recommendation", source: "ighg-breast-2025", quote: "Annual breast cancer surveillance is recommended for at least up to 60 years of age (high-quality evidence, strong recommendation)." },
    { claim: "Mammography and breast MRI as the surveillance tests after chest or upper abdominal radiation", grade: "high- to moderate-quality evidence, strong recommendation", source: "ighg-breast-2025", quote: "Mammography and breast MRI are recommended for breast cancer surveillance (high- to moderate-quality evidence, strong recommendation)." },
    { claim: "COG: no upper age limit for breast surveillance has been set", grade: "SCORE = 1", source: "cog-ltfu-v6", quote: "The upper age limit at which mammography and breast MRI should be used for breast cancer surveillance has not been established." },
    { claim: "Thyroid surveillance may start 5 years after radiotherapy that included the thyroid", grade: "level B evidence", source: "ighg-thyroid-2018", quote: "It is reasonable to commence surveillance for differentiated thyroid carcinoma 5 years after radiation therapy that includes the thyroid gland or therapeutic 131I-MIBG (level B evidence)." },
    { claim: "Thyroid ultrasound every 3 to 5 years if chosen and the first is normal", grade: "expert opinion", source: "ighg-thyroid-2018", quote: "If thyroid ultrasonography is chosen as screening modality, it may be reasonable to repeat surveillance for differentiated thyroid carcinoma every 3-5 years if there are no abnormalities found initially (expert opinion)." },
    { claim: "Pure tone audiometry at 1000 to 8000 Hz from age 6, with high-frequency testing where available", grade: "evidence-based guidelines and expert opinion", source: "ighg-ototoxicity-2019", quote: "Pure tone conventional audiometry testing is recommended for survivors ≥6 years of age at 1000–8000 Hz, and additional testing with high frequency audiometry at >8000 Hz is recommended whenever equipment is available (evidence-based guidelines and expert opinion)." },
    { claim: "Anti-Müllerian hormone is not the primary test for early ovarian failure", grade: "expert opinion and no studies", source: "ighg-poi-2016", quote: "AMH is not recommended as the primary surveillance modality for evaluation of premature ovarian insufficiency in survivors treated with potentially gonadotoxic chemotherapy and/or radiotherapy potentially exposing the ovaries† who desire assessment about potential future fertility (expert opinion and no studies)." },
    { claim: "Semen analysis as the primary test of sperm production for men who want to know", grade: "expert opinion", source: "ighg-male-2017", quote: "semen analysis is recommended as the gold standard primary surveillance modality for evaluation of spermatogenesis (expert opinion)." },
    { claim: "COG: colonoscopy is the reference test for bowel screening after radiation, with stool DNA testing as an alternative", grade: "SCORE = 2A", source: "cog-ltfu-v6", quote: "Colonoscopy is considered the gold standard for colorectal cancer screening in high-risk populations; however, recognizing that not all survivors are willing or able to undergo colonoscopy, multitarget stool DNA testing is deemed a reasonable alternative." },
    { claim: "PanCareSurFup: strength and evidence of its recommendations on organising follow-up", grade: "strong recommendations based on low level evidence and expert opinions", source: "pancaresurfup-2019", quote: "We provide strong recommendations based on low level evidence and expert opinions, regarding organization of LTFU care, personnel involved in LTFU care, components of LTFU care and start of LTFU care." },
    { claim: "SIGN: lifelong follow-up as current best practice", grade: "statement in the introduction (not a graded recommendation)", source: "sign-132", quote: "Lifelong follow up of survivors is recommended as current best practice (see section 11) and this will necessitate multidisciplinary collaboration between patients and their families, oncologists and other health professionals including those in primary care" },
  ],
  sources: [
    { key: "cog-ltfu-v6", label: "Long-Term Follow-Up Guidelines for Survivors of Childhood, Adolescent, and Young Adult Cancers, Version 6.0, October 2023", publisher: "Children's Oncology Group", year: 2023, url: "https://childrensoncologygroup.org/wp-content/uploads/2026/05/COG_LTFU_Guidelines_Only_v6.pdf", gradingScheme: "Score per section, a modified NCCN category of consensus: 1 (high-level evidence linking the late effect to the exposure and uniform panel consensus that the screening is appropriate), 2A (lower-level evidence, uniform consensus), 2B (lower-level evidence, non-uniform consensus). The score rates the link between exposure and late effect, not a trial of screening.", read: "full-text", accessed: "2026-11-16" },
    { key: "cog-review-2025", label: "The Children's Oncology Group Long-Term Follow-Up Guidelines for Survivors of Childhood, Adolescent, and Young Adult Cancers: A Review (DeVine et al.)", publisher: "JAMA Oncology", year: 2025, url: "https://doi.org/10.1001/jamaoncol.2024.6812", doi: "10.1001/jamaoncol.2024.6812", read: "abstract", accessed: "2026-11-16" },
    { key: "ighg-cardiomyopathy-2022", label: "Cardiomyopathy surveillance recommendations 2022 (recommendations document; published as Ehrhardt et al., Lancet Oncol 2023)", publisher: "International Late Effects of Childhood Cancer Guideline Harmonization Group (IGHG)", year: 2022, url: "https://www.ighg.org/wp-content/uploads/2023/06/IGHG-Cardiomyopathy-surveillance-recommendations_2022.pdf", doi: "10.1016/S1470-2045(23)00012-8", gradingScheme: "Quality of evidence (high, moderate, low, expert opinion) and strength of recommendation (strong, moderate, or a strong recommendation not to do).", read: "full-text", accessed: "2026-11-16" },
    { key: "ighg-breast-2025", label: "IGHG Breast cancer surveillance recommendations 2020 and 2025 (recommendations document; published as Mulder et al., J Clin Oncol 2020 and JCO Oncol Pract 2026)", publisher: "IGHG", year: 2025, url: "https://www.ighg.org/wp-content/uploads/2026/06/IGHG-Breast-cancer-surveillance-recommendations-chest-RT-and-anthracyclines_2025.pdf", doi: "10.1200/OP-25-01017", gradingScheme: "Quality of evidence (high, moderate, low, expert opinion) and strength of recommendation (strong, moderate).", read: "full-text", accessed: "2026-11-16" },
    { key: "ighg-thyroid-2018", label: "IGHG Thyroid cancer surveillance recommendations 2018 (recommendations document; published as Clement et al., Cancer Treat Rev 2018)", publisher: "IGHG with the PanCareSurFup Consortium", year: 2018, url: "https://www.ighg.org/wp-content/uploads/2020/10/IGHG-Thyroid-cancer-surveillance-recommendations_2018.pdf", doi: "10.1016/j.ctrv.2017.11.005", gradingScheme: "Level of evidence A (high), B (moderate), C (low) or expert opinion, printed after each recommendation.", read: "full-text", accessed: "2026-11-16" },
    { key: "ighg-ototoxicity-2019", label: "IGHG Ototoxicity surveillance recommendations 2019 (recommendations document; published as Clemens et al., Lancet Oncol 2019)", publisher: "IGHG with the PanCare Consortium", year: 2019, url: "https://www.ighg.org/wp-content/uploads/2020/10/IGHG-Ototoxicity-surveillance-recommendations_2019.pdf", doi: "10.1016/S1470-2045(18)30858-1", gradingScheme: "Level of evidence A, B, C or expert opinion; an asterisk marks expert opinion based on evidence that did not meet the inclusion criteria.", read: "full-text", accessed: "2026-11-16" },
    { key: "ighg-poi-2016", label: "IGHG Premature ovarian insufficiency surveillance recommendations 2016 (recommendations document; published as van Dorp et al., J Clin Oncol 2016)", publisher: "IGHG with the PanCareSurFup Consortium", year: 2016, url: "https://www.ighg.org/wp-content/uploads/2020/10/IGHG-Premature-ovarian-insufficieny-surveillance-recommendations_2016.pdf", doi: "10.1200/JCO.2015.64.3288", gradingScheme: "Level of evidence A, B, C or expert opinion; class I strong recommendation to do, class IIb weak recommendation to do, class III recommendation not to do.", read: "full-text", accessed: "2026-11-16" },
    { key: "ighg-male-2017", label: "IGHG Male gonadotoxicity surveillance recommendations 2017 (recommendations document; published as Skinner et al., Lancet Oncol 2017)", publisher: "IGHG with the PanCareSurFup Consortium", year: 2017, url: "https://www.ighg.org/wp-content/uploads/2020/10/IGHG-Male-gonadotoxicity-surveillance-recommendations_2017.pdf", doi: "10.1016/S1470-2045(17)30026-8", gradingScheme: "Level of evidence A, B, C, supplemental literature search or expert opinion.", read: "full-text", accessed: "2026-11-16" },
    { key: "pancarefollowup-2021", label: "European PanCareFollowUp Recommendations for surveillance of late effects of childhood, adolescent, and young adult cancer (van Kalsbeek et al.)", publisher: "PanCareFollowUp Recommendations Working Group, European Journal of Cancer", year: 2021, url: "https://doi.org/10.1016/j.ejca.2021.06.004", doi: "10.1016/j.ejca.2021.06.004", gradingScheme: "Pragmatic consensus recommendations, not graded, for topics without an IGHG guideline.", read: "abstract", accessed: "2026-11-16" },
    { key: "pancaresurfup-2019", label: "Evidence-based recommendations for the organization of long-term follow-up care for childhood and adolescent cancer survivors: a report from the PanCareSurFup Guidelines Working Group (Michel et al.)", publisher: "PanCareSurFup, Journal of Cancer Survivorship", year: 2019, url: "https://doi.org/10.1007/s11764-019-00795-5", doi: "10.1007/s11764-019-00795-5", gradingScheme: "Strength of recommendation with level of evidence; the abstract reports strong recommendations on low-level evidence and expert opinion.", read: "abstract", accessed: "2026-11-16" },
    { key: "surpass-2018", label: "The 'Survivorship Passport' for childhood cancer survivors (Haupt et al.)", publisher: "European Journal of Cancer", year: 2018, url: "https://doi.org/10.1016/j.ejca.2018.07.006", doi: "10.1016/j.ejca.2018.07.006", read: "abstract", accessed: "2026-11-16" },
    { key: "pancare-transition-2016", label: "Transition guidelines: An important step in the future care for childhood cancer survivors. A comprehensive definition as groundwork (Mulder et al.)", publisher: "PanCareSurFup, European Journal of Cancer", year: 2016, url: "https://doi.org/10.1016/j.ejca.2015.10.007", doi: "10.1016/j.ejca.2015.10.007", read: "abstract", accessed: "2026-11-16" },
    { key: "sign-132", label: "SIGN 132: Long term follow up of survivors of childhood cancer (March 2013; SIGN notes that some recommendations may be out of date)", publisher: "Scottish Intercollegiate Guidelines Network", year: 2013, url: "https://www.sign.ac.uk/media/1070/sign132.pdf", gradingScheme: "Grades A to D by the strength of the supporting evidence (D rests on non-analytic studies, expert opinion or extrapolation), with ungraded good practice points from the guideline group's clinical experience.", read: "full-text", accessed: "2026-11-16" },
    { key: "cclg-aftercare-pathways", label: "Follow-up support service pathways (paediatric and teenage and young adult aftercare pathways of the National Cancer Survivorship Initiative)", publisher: "Children's Cancer and Leukaemia Group (CCLG), a UK charity and professional association", year: 2026, url: "https://www.cclg.org.uk/about-cancer/living-beyond-cancer/follow-care-after-treatment/what-expect-follow-care/follow-support-service-pathways", gradingScheme: "A public information page; no grading.", read: "public-summary", accessed: "2026-11-16" },
  ],
  upgrades: [],
  gaps: [
    "This is a framework, not the whole guideline. Of the 165 COG sections only those on any cancer experience, hearing, the heart, thyroid nodules, breast and bowel cancer after radiation, and gonadal counselling were read; the kidneys, lungs, bones, growth and hormones, eyes, teeth, learning and memory, transplant and newer medicines each have sections that are not summarised here.",
    "The United Kingdom's own guidance could not be read in a current form. The CCLG therapy-based long-term follow-up practice statement was not found on the group's public guidelines page, so it is not cited and nothing here rests on it. SIGN 132 dates from 2013 and SIGN says some of it may be out of date. The UK aftercare pathway diagrams were not read.",
    "The PanCareFollowUp recommendations, the PanCareSurFup organisation-of-care guideline, the Survivorship Passport paper and the COG review in JAMA Oncology were read as abstracts only, so their individual recommendations, including any on the age and process of transition, are not given.",
    "No source read sets out a graded, step-by-step transition protocol. The PanCare transition paper (2016, abstract) says many centres have no formal transition programme and that a pan-European transition guideline was needed; whether one has since been published was not established.",
    "No randomised trial shows that exposure-based screening of survivors without symptoms reduces illness or death; COG says none is expected. COG also names anxiety, false-positive results and cost as possible harms.",
    "The IGHG journal articles behind the recommendations documents were not read, so the evidence summaries and the risk figures for each late effect are not quoted. IGHG guidelines also exist for bone density, coronary artery disease, the liver, the kidneys, the lungs, the pituitary, metabolic syndrome, mental health, fatigue, education and employment, and pregnancy care, and are not summarised here.",
    "How many survivors actually receive a treatment summary and plan was not measured in any source read here.",
  ],
  cancers: ["childhood-cancers", "aya-cancers"],
  technologies: ["rejuv-paed-cog-ltfu-guidelines", "survivorship-care-plan"],
  terms: ["late-effects"],
  related: ["cardiomyopathy-surveillance-after-childhood-cancer", "breast-screening-after-chest-radiotherapy-at-a-young-age", "survivorship-care-plan-and-treatment-summary", "paediatric-cisplatin-hearing-protection", "paediatric-fertility-preservation", "ighg", "pancaresurfup", "rejuv-paed-uk-long-term-follow-up", "rejuv-paed-transition-to-adult-care", "rejuv-paed-second-cancers", "rejuv-paed-chronic-disease-burden", "rejuv-paed-heart", "idea-acc-auto-generated-survivorship-plans"],
  companies: ["childrens-oncology-group"],
  sections: ["supportive-care"],
  bottlenecks: ["b-survivorship", "b-care-fragmentation"],
});
