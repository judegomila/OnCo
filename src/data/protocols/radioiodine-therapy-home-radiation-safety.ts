import { protocol } from "./helpers";

/*
 * Radiation safety for the patient, family and others after radioactive iodine (iodine-131) for differentiated
 * thyroid cancer, from the information given before treatment to the end of the precautions at home.
 *
 * First written 11 November 2026. Second accuracy pass on 17 November 2026: every source was read again as raw text
 * and every quote checked by script (whitespace and line breaks only). What was read, and how:
 * - IAEA Safety Reports Series No. 63, Release of Patients After Radionuclide Therapy (2009, with contributions from
 *   the ICRP): full text, the PDF from www-pub.iaea.org read with pdftotext (a copy saved the same day by the checker
 *   of the sibling release-criteria protocol was re-used). Sections 3 to 6, tables 6 and 9 to 13, and Annex V
 *   (V-1 benign thyroid disease, V-2 thyroid cancer) were read. Its example leaflet is for an overactive thyroid.
 * - IAEA Specific Safety Guide SSG-46 (2018): full text, same route, paras 2.49, 4.235 to 4.248.
 *   The IAEA publication pages on iaea.org returned HTTP 403 to a script, so whether either IAEA text has been
 *   superseded could not be checked there.
 * - ICRP Publication 94 (2004): abstract only, from the ICRP publication page, with its three corrigenda (open PDFs
 *   on icrp.org; none touches a figure used here). ICRP Publication 140 (2019) was found and its abstract read.
 * - US Nuclear Regulatory Commission, 10 CFR 35.75: full text from the eCFR renderer (title 10 current to
 *   13 November 2026).
 * - The Ionising Radiation (Medical Exposure) Regulations 2017, regulation 12, as amended on 1 October 2024: full
 *   text from legislation.gov.uk. The regulations say they apply as respects Great Britain.
 * - ARSAC Notes for Guidance, July 2026 version (gov.uk, open PDF read with pdftotext): section 7, paras 7.12 to
 *   7.16, table 7.1 and paras 7.38 to 7.39. Added in the second pass: the first version of this page gave ARSAC's
 *   pregnancy interval as 6 months, which is what SRS-63 recorded from the March 2006 notes; the current notes say 4.
 * - Wadsley et al., UK guidance (Clinical Oncology 2023): abstract only, through Europe PMC, which lists it as
 *   subscription only; the publisher's page serves a redirect to a script and an institutional repository record
 *   returned HTTP 403. Its patient information leaflet, which says it forms part of the guidance, is an open PDF
 *   linked from the British Thyroid Foundation and was read in full with pdftotext. Added in the second pass.
 * - American Thyroid Association practice recommendations (Sisson et al., Thyroid 2011): abstract only, through
 *   Europe PMC; the publisher's page returned HTTP 403. An erratum (Thyroid 2011;21(6):689) was not read.
 * - Wu et al., nationwide US survey (J Nucl Med 2020): full text, the journal's own page read as HTML.
 * - The SNMMI/EANM procedure standard for differentiated thyroid cancer (J Nucl Med 2022, PMID 35649660) is listed
 *   in Europe PMC with no abstract, DOI or full-text link and is not cited.
 *
 * Every DOI was resolved through Europe PMC or Crossref and its title checked. Quotes are copied from the raw text
 * with line breaks joined. Where a superscript mass number breaks in the raw text ("131" on one line, "I" on the
 * next) the quote avoids it.
 */
export const radioiodineTherapyHomeRadiationSafety = protocol({
  id: "radioiodine-therapy-home-radiation-safety",
  name: "Radiation safety at home after radioactive iodine (I-131) for thyroid cancer",
  aka: ["radioactive iodine precautions", "RAI precautions", "I-131 home precautions", "radioiodine ablation precautions", "after radioiodine treatment at home", "radioiodine isolation", "radioactive iodine and children", "radioiodine and pregnancy", "radioiodine and breastfeeding"],
  domain: "radiotherapy",
  tldr: "After radioactive iodine your body gives off radiation for a time, and some leaves in urine, saliva and sweat. For a while you keep your distance from others, especially babies, young children and anyone pregnant, sleep apart, take care in the toilet and with cups and towels, and stop breastfeeding completely. Your team works out how long this applies to you and writes it down.",
  simple: "For a time after this treatment (your team tells you how long), keep away from babies, small children and pregnant women, sleep on your own, sit down to pass urine, flush and wash your hands, and do not share cups, cutlery or towels. Breastfeeding must stop. Drink plenty. Carry the card the hospital gives you.",
  summary: "Before treatment the patient is told how to protect others and for how long, so they can plan (IAEA SRS-63). Pregnancy is excluded and breastfeeding is stopped completely: ICRP says mothers must cease breastfeeding immediately; SRS-63 notes that some physicians ask for it to stop two to three weeks before treatment, to lower the radiation dose to the breast; the 2022 UK patient leaflet says at least eight weeks before. Release is an individual decision: the IAEA and ICRP base it on the dose others could receive rather than on a fixed amount left in the body; US federal rules allow release where no one else is likely to receive more than 5 mSv, with written instructions where anyone is likely to receive more than 1 mSv (10 CFR 35.75); in Great Britain the employer's procedures must provide, where appropriate, for written instructions on restricting others' dose, handed over before the patient leaves (IR(ME)R 2017 reg 12(6) and (7)). SRS-63 recorded in 2009 that many European countries also set a maximum retained activity, mostly 400 to 600 MBq, and that thyroid cancer treatment there normally came with a hospital stay; the 2022 UK leaflet says a stay of one to three days is typical; in a US patient survey 87% of those treated between 2011 and 2018 were outpatients (Wu 2020).\n\nAt home the effort goes on pregnant women, infants and children, because measured doses to families and carers who follow the advice rarely approach or exceed a few millisieverts per episode (SRS-63). The example leaflet in SRS-63 was written for treatment of an overactive thyroid. The report says thyroid cancer needs its own leaflet; its annex applies the same advice to cancer patients who have spent a few days in hospital and retain less than about 600 MBq, and says anyone released straight after treatment needs additional advice tailored to the country. That leaflet asks for a distance of at least one metre, two metres for longer than an hour, a separate bed two metres apart, close contact limited to half an hour a day, under-twos cared for by someone else, seated urination with flushing and hand washing, a daily shower if possible, especially on the first two days, and no sharing of cutlery, crockery, towels or laundry. Where more than 600 MBq is retained at release, the annex says kissing and sex should be avoided for at least two days. How long the precautions last is set locally, from the activity, how fast the iodine clears and the household. A table in SRS-63 adapted from ICRP and published studies, aimed at keeping co-workers and family below 1 mSv, gives, for 3,700 MBq, 4 days of sleeping apart after a follow-up treatment and 20 days after ablation; the 2022 UK leaflet says most patients do not need to avoid close contact with others for more than a few days. Patients carry a card for unplanned admissions and for radiation detectors at airports and borders, which can pick up radioiodine for weeks. On pregnancy afterwards the sources differ: ICRP, as tabulated in SRS-63, says 4 months for activities up to 6,000 MBq; the current ARSAC notes for guidance in the UK (July 2026) say 4 months for all thyroid indications up to 6,000 MBq, with longer advice where the clinical picture warrants it; the 2022 UK patient leaflet says six months, and four months before trying to get a partner pregnant; SRS-63 notes some practitioners use 6 to 12 months. ARSAC advises avoiding conception for 4 months after iodine-131 iodide because the radionuclide appears in sperm; SRS-63 said in 2009 that advice to men rested on prudence without a strong evidence base. The abstract of the 2023 UK guidance says patient support groups have documented significant variation across the UK and that some patients are asked to observe unnecessarily burdensome restrictions; the guidance focuses on personalising the advice.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "nurse", "patient-or-carer"],
    where: ["ward", "outpatient-clinic", "home"],
  },
  population: "Adults treated with iodine-131 (sodium iodide) for differentiated thyroid cancer, as a first ablation or a later treatment, and the people they live and work with. The day counts are examples: each centre sets them from the activity given, how fast the iodine clears, home circumstances and national rules. The home advice in the steps comes from an IAEA example leaflet written for an overactive thyroid, which the IAEA report applies to cancer patients who have spent a few days in hospital and retain less than about 600 MBq. Children treated with iodine-131, iodine-131 MIBG and treatment for an overactive thyroid follow their own instructions; lutetium-177 therapy is a separate protocol.",
  trigger: "Radioactive iodine treatment is planned, and again when the patient is released from hospital or from the department.",
  steps: [
    {
      action: "Before treatment, tell the patient how they will protect others afterwards and for how long, in time for them to plan childcare, work and travel",
      why: "The information has to cover the period after discharge in enough detail for plans to be made, and clear information reduces anxiety.",
      source: "iaea-srs63",
      quote: "Patients should be given information about their own safety and that of others before their treatment is started.",
    },
    {
      action: "Confirm the patient is not pregnant before giving the iodine",
      why: "Radioactive iodine crosses the placenta quickly and, once the baby's thyroid has formed, can destroy it; the IAEA report says thyroid cancer treatment can often be delayed until after pregnancy.",
      source: "iaea-srs63",
      quote: "Pregnancy is a strong contraindication to unsealed radionuclide therapy, unless the therapy is life saving.",
    },
    {
      action: "Make sure breastfeeding has stopped completely before treatment and is not resumed afterwards",
      why: "Radioactive iodine passes into breast milk; the IAEA report says a breastfed baby may develop permanent hypothyroidism or be at high risk of thyroid cancer later.",
      source: "iaea-srs63",
      quote: "Thus, therapeutic radiopharmaceuticals, regardless of the route of administration, are potentially hazardous, and therefore breast-feeding must be discontinued indefinitely",
    },
    {
      action: "Decide on release for this patient individually, from the dose other people could receive and their home circumstances, within national rules",
      why: "The decision takes in the patient's wishes, medical circumstances, family and the rules that apply; the IAEA report says some fixed retained-activity models are unduly conservative and lead to unnecessary hospital stays.",
      source: "iaea-srs63",
      quote: "The decision to hospitalize or release a patient should be determined on an individual basis.",
    },
    {
      action: "Give the patient written instructions on keeping other people's doses low before they leave",
      why: "IAEA guidance says the patient or their legal guardian should have them, with children and pregnant partners the particular concern. In Great Britain the employer's procedures must provide for them, where appropriate, before the patient leaves; US federal rules require them when another person is likely to receive more than 1 mSv.",
      source: "iaea-ssg46",
      quote: "should be provided with written instructions on how to keep doses to members of the public and carers and comforters as low as reasonably achievable.",
    },
    {
      action: "Focus the restrictions on pregnant women, babies and children",
      why: "Measured doses to families and carers who follow the advice rarely approach or exceed a few millisieverts; the IAEA report says thyroid cancer caused by radiation is a significant risk for unborn children, infants and younger people.",
      source: "iaea-srs63",
      quote: "Restrictions, once families and carers have been well instructed, should thus focus on the special consideration groups (i.e. pregnant women, infants and children).",
    },
    {
      action: "Keep at least one metre from other people, and two metres for anything longer than an hour, for the days set by the team",
      why: "The IAEA example leaflet calls this the most important precaution: the iodine still in the body can irradiate people who are physically close.",
      source: "iaea-srs63",
      quote: "Do not sit or stay close to any person either at home or at work. Try to maintain a distance of at least one metre. For long periods (more than one hour), stay two metres away.",
    },
    {
      action: "Sleep in a separate bed two metres away, and limit hugging or sex to half an hour a day, for the days set by the team",
      why: "The leaflet explains that the walls of a house do not give good protection against this type of radiation, which is why beds are kept apart even in separate rooms.",
      source: "iaea-srs63",
      quote: "Close contact such as hugging or sex should be limited to half an hour a day. You should sleep in a separate bed. Beds should be two metres apart, even if there is a wall separating them.",
    },
    {
      action: "Arrange for someone else to look after children under two where possible",
      why: "The leaflet says the risk is higher for young children than for adults, and that a baby should not be close to the patient, sleeping or on the lap, other than for very short periods.",
      source: "iaea-srs63",
      quote: "Children under two years old should be looked after by someone else.",
    },
    {
      action: "Sit to pass urine (men too), dry with toilet paper and flush, wash hands straight away every time, and shower daily if possible, especially in the first two days",
      why: "Most of the iodine leaves the body in urine, so spilling urine has to be avoided.",
      source: "iaea-srs63",
      quote: "Therefore, pass urine while seated (including men). Always dry your genitals with toilet paper and flush the toilet.",
    },
    {
      action: "Do not share cutlery, crockery, towels, face cloths or toothbrushes; wash your clothes and bedding separately",
      why: "Radioactive iodine also leaves the body in saliva and sweat; the leaflet says cutlery and crockery are safe after thorough washing.",
      source: "iaea-srs63",
      quote: "Therefore, cutlery, crockery, towels, bed linen, etc., should not be shared with others.",
    },
    {
      action: "Drink plenty and pass urine often",
      why: "The IAEA report calls this a common recommendation for all patients: drinking freely helps clear the iodine through the kidneys, and in an unrecognised early pregnancy it lowers the dose the unborn baby receives from iodine in the bladder.",
      source: "iaea-srs63",
      quote: "The dose can be reduced by orally hydrating the patient and by encouraging frequent voiding. This is a common recommendation for all patients whether pregnant or not.",
    },
    {
      action: "Carry the treatment card, show it if admitted to any hospital, and take it when travelling",
      why: "Hospital staff need to know about the treatment, and radiation detectors at borders and airports will usually pick up radioiodine for weeks afterwards.",
      source: "iaea-srs63",
      quote: "Environmental or other radiation detection devices are sensitive enough that they will usually detect patients who have received radioiodine treatment for weeks after administration.",
    },
    {
      action: "Advise avoiding pregnancy after treatment for the period national guidance sets: 4 months in the ICRP table for up to 6,000 MBq; in the UK, 4 months in the ARSAC notes (July 2026) and six months in the 2022 patient leaflet",
      why: "The IAEA report says the wait is partly to keep the dose to an embryo or foetus within the limit and partly to make sure the disease is controlled, so that another treatment is not needed during a new pregnancy.",
      source: "iaea-srs63",
      quote: "the ICRP recommends that female patients be advised to avoid pregnancy for the time periods indicated in Table 13.",
    },
  ],
  bestInClass: {
    statement: "An individual release decision based on the dose others could receive, with written instructions before leaving (IAEA SRS-63 and SSG-46; ICRP 94; 10 CFR 35.75; IR(ME)R 2017 reg 12), and restrictions focused on pregnant women, infants and children, whose length is set for the person from the activity given, how fast the iodine clears and their household rather than taken from a single table. None of these sources grades its advice: the IAEA and ICRP documents are consensus built on measured and modelled doses, the US text is federal regulation and the IR(ME)R text is law in Great Britain. They differ on three points shown below: how release is decided (dose to others in the US and in IAEA and ICRP advice, a retained-activity limit in many European countries when SRS-63 was written), how long to avoid pregnancy (4 months in ICRP's table and in the current ARSAC notes, six months in the 2022 UK patient leaflet, 6 to 12 months in some practice), and how long before treatment breastfeeding stops. The abstract of the 2023 UK multidisciplinary guidance adds the case against over-restriction, saying some patients are asked to observe unnecessarily burdensome restrictions.",
    sources: ["iaea-srs63", "iaea-ssg46", "icrp-94", "nrc-10cfr35-75", "irmer-2017-reg12", "arsac-nfg-2026", "uk-rai-2023", "uk-rai-leaflet-2022"],
  },
  variants: [
    {
      name: "Release by retained activity (many European countries, as recorded in 2009)",
      differs: "A patient is kept in hospital until the iodine left in the body falls below a set amount: the old IAEA Basic Safety Standards guidance level was 1,100 MBq; most EU member states used 400 to 600 MBq (range 95 to 800 in table 10); for Germany SRS-63 prints 250 MBq, based on 3.5 microsieverts an hour at one metre, in table 10 and 75 MBq in table 9, and says essentially all patients there must be in hospital for at least 48 hours; the European Thyroid Association favoured outpatient treatment for patients receiving up to 800 MBq, provided they keep to certain restrictions. Thyroid cancer treatment was normally given with a hospital stay in the EU.",
      evidence: "SRS-63 says some retained-activity models are unduly conservative and may cause unnecessary hospital stays, and that where the two approaches conflict the ICRP regards the dose-based one as more fundamental. These national figures are those SRS-63 printed in 2009 and were not checked against current national rules.",
      sources: ["iaea-srs63"],
    },
    {
      name: "Release by dose to others (United States)",
      differs: "Release may be authorised when no other person is likely to receive more than 5 mSv (0.5 rem); instructions, including written instructions, are required when anyone is likely to receive more than 1 mSv (0.1 rem), with breastfeeding guidance where a nursing infant or child could receive more than that.",
      evidence: "In a 2018 survey of thyroid cancer survivors, 1,111 adult respondents had their most recent treatment in the United States between 2011 and 2018: 87% (956 of 1,102) were treated as outpatients, against 66% in an earlier survey of 1997 to 2009; 67% were able to discuss and individualise their instructions; and 2% did not recall receiving any.",
      sources: ["nrc-10cfr35-75", "wu-2020-survey"],
    },
    {
      name: "UK guidance (2023): personalised, less burdensome restrictions",
      differs: "A UK multidisciplinary group, convened at the instigation of patient support groups, wrote guidance and a patient leaflet focused on personalising the advice, including for patients on haemodialysis. The leaflet is endorsed by the British Thyroid Association, British Thyroid Foundation, Butterfly Thyroid Cancer Trust, Thyroid Cancer Support Group Wales, British Nuclear Medicine Society, IPEM, BIR and RCR. It says a hospital stay of one to three days is typical, that most patients do not need to avoid close contact with others for more than a few days, and that pets need no restriction; its worked example is a 28 year old given a low dose whose children, aged three and five, stayed with grandparents until 72 hours after discharge.",
      evidence: "The abstract reports significant variation across the UK, documented by patient support groups, and that some patients are asked to observe unnecessarily burdensome restrictions. Only the abstract of the guidance was read; the leaflet was read in full. The guidance's own day counts are not reproduced here.",
      sources: ["uk-rai-2023", "uk-rai-leaflet-2022"],
    },
    {
      name: "How long before treatment breastfeeding stops",
      differs: "The general rule is that breastfeeding stops before treatment and is not resumed. SRS-63 says some physicians find it helpful to have women stop two to three weeks before radioiodine, to reduce the dose to the breast and remove any danger of non-compliance. The 2022 UK patient leaflet says at least eight weeks before, and that breastfeeding cannot resume until after a subsequent pregnancy.",
      evidence: "SRS-63 describes the earlier stop as a practice some find helpful, without a grade or data. The ARSAC notes (July 2026) say breastfeeding is completely contraindicated, that the lactating breast receives about 20 times the dose of the non-lactating breast from iodine-131, that lactation may take over 8 weeks to reduce naturally, and recommend advice from a lactation specialist.",
      sources: ["iaea-srs63", "uk-rai-leaflet-2022", "arsac-nfg-2026"],
    },
    {
      name: "How long to avoid pregnancy afterwards",
      differs: "ICRP, as tabulated in SRS-63: 4 months after iodine-131 for thyroid cancer, for activities up to 6,000 MBq. ARSAC notes, July 2026: 4 months for iodine-131 iodide in all thyroid indications up to 6,000 MBq, and a smaller activity does not shorten the period. The 2022 UK patient leaflet: do not try to get pregnant for six months, avoid trying to get a partner pregnant for four months, and use a condom for the first month. SRS-63 adds that some practitioners use a gap of 6 to 12 months.",
      evidence: "SRS-63 in 2009 printed 6 months for ARSAC, from the March 2006 notes; the current notes print 4. ARSAC says its period rests on the potential dose to a foetus, and that the practitioner may advise longer where the patient's condition and a possible need for retreatment warrant it. None of these figures is graded.",
      sources: ["iaea-srs63", "arsac-nfg-2026", "uk-rai-leaflet-2022"],
    },
    {
      name: "American Thyroid Association practice recommendations (2011)",
      differs: "Gives examples of tables for working out the number of hours or days of precautions for an individual patient treated for hyperthyroidism or thyroid cancer, with a checklist for the patient's circumstances; its abstract says the recommendations comply with US NRC regulations and are consistent with NCRP Report 155.",
      evidence: "Its authors state there are insufficient data on long-term outcomes for evidence-based guidelines. Only the abstract was read.",
      sources: ["ata-2011"],
    },
  ],
  grades: [
    { claim: "Decide hospital stay or release individually", grade: "Consensus (ungraded)", source: "icrp-94", quote: "The decision to hospitalise or release a patient should be determined on an individual basis." },
    { claim: "Stop breastfeeding immediately after radioiodine", grade: "Consensus (ungraded)", source: "icrp-94", quote: "After radioiodine therapy, mothers must cease breastfeeding immediately." },
    { claim: "Release may be authorised if no other person is likely to receive more than 5 mSv (US)", grade: "Regulatory requirement (ungraded)", source: "nrc-10cfr35-75", quote: "A licensee may authorize the release from its control of any individual who has been administered unsealed byproduct material or implants containing byproduct material if the total effective dose equivalent to any other individual from exposure to the released individual is not likely to exceed 5 mSv (0.5 rem)." },
    { claim: "Instructions, including written instructions, if another person is likely to receive more than 1 mSv (US)", grade: "Regulatory requirement (ungraded)", source: "nrc-10cfr35-75", quote: "A licensee shall provide the released individual, or the individual's parent or guardian, with instructions, including written instructions, on actions recommended to maintain doses to other individuals as low as is reasonably achievable if the total effective dose equivalent to any other individual is likely to exceed 1 mSv (0.1 rem)." },
    { claim: "Written instructions to the patient, where appropriate, on restricting others' doses, before leaving (Great Britain)", grade: "Regulatory requirement (ungraded)", source: "irmer-2017-reg12", quote: "specify how doses resulting from the patient’s exposure can be restricted as far as reasonably possible so as to protect persons in contact with the patient;" },
    { claim: "Written instructions to carers after radioiodine, including time and proximity, physical contact and not sharing food or drinks", grade: "Safety Guide recommendation (ungraded)", source: "iaea-ssg46", quote: "carer or comforter of the patient (including for example, instructions on time spent with the patient and proximity to the patient, minimizing of physical contact and not sharing food or drinks)." },
    { claim: "Dose constraints the guide describes as commonly used: 5 mSv per episode for an adult carer, with 1 mSv per episode often taken for children and for the embryo or fetus of a pregnant carer", grade: "Safety Guide recommendation (ungraded)", source: "iaea-ssg46", quote: "For an adult carer or comforter, a value of dose constraint commonly used is 5 mSv effective dose per episode." },
    { claim: "Advise avoiding pregnancy for 4 months after iodine-131 iodide, all thyroid indications, activities up to 6,000 MBq (UK)", grade: "Advisory committee guidance (ungraded)", source: "arsac-nfg-2026", quote: "Individuals should be advised to avoid becoming pregnant for a period following radiopharmaceutical administration as given in Table 7.1." },
  ],
  sources: [
    {
      key: "iaea-srs63",
      label: "Release of Patients After Radionuclide Therapy, Safety Reports Series No. 63 (with contributions from the ICRP)",
      publisher: "International Atomic Energy Agency",
      year: 2009,
      url: "https://www-pub.iaea.org/MTCD/Publications/PDF/pub1417_web.pdf",
      gradingScheme: "A safety report built on measured and modelled doses and on ICRP, EU and national guidance; its advice is not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "iaea-ssg46",
      label: "Radiation Protection and Safety in Medical Uses of Ionizing Radiation, Specific Safety Guide No. SSG-46",
      publisher: "International Atomic Energy Agency, jointly sponsored by PAHO and WHO",
      year: 2018,
      url: "https://www-pub.iaea.org/MTCD/Publications/PDF/PUB1775_web.pdf",
      gradingScheme: "An IAEA Safety Guide: recommendations ('should') on meeting the Safety Requirements; not graded by evidence.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "icrp-94",
      label: "ICRP Publication 94: Release of Patients after Therapy with Unsealed Radionuclides",
      publisher: "International Commission on Radiological Protection (Annals of the ICRP 34(2))",
      year: 2004,
      url: "https://www.icrp.org/publication.asp?id=ICRP%20Publication%2094",
      doi: "10.1016/j.icrp.2004.08.001",
      gradingScheme: "ICRP recommendations; not graded.",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "nrc-10cfr35-75",
      label: "10 CFR 35.75 Release of individuals containing unsealed byproduct material or implants containing byproduct material",
      publisher: "US Nuclear Regulatory Commission (Code of Federal Regulations, via eCFR)",
      year: 2007,
      url: "https://www.ecfr.gov/current/title-10/chapter-I/part-35/subpart-C/section-35.75",
      gradingScheme: "Federal regulation; requirements are not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "irmer-2017-reg12",
      label: "The Ionising Radiation (Medical Exposure) Regulations 2017, regulation 12 (optimisation), as amended on 1 October 2024",
      publisher: "UK legislation applying as respects Great Britain (legislation.gov.uk)",
      year: 2017,
      url: "https://www.legislation.gov.uk/uksi/2017/1322/regulation/12",
      gradingScheme: "Statutory instrument; requirements are not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "uk-rai-2023",
      label: "Patient Preparation and Radiation Protection Guidance for Adult Patients Undergoing Radioiodine Treatment for Thyroid Cancer in the UK",
      publisher: "Wadsley et al., Clinical Oncology 35(1); published online in 2022",
      year: 2023,
      url: "https://doi.org/10.1016/j.clon.2022.07.002",
      doi: "10.1016/j.clon.2022.07.002",
      gradingScheme: "Multidisciplinary consensus guidance; grading not known (only the abstract was read).",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "uk-rai-leaflet-2022",
      label: "Patient information for radioactive iodine treatment (the patient leaflet forming part of the UK guidance by Wadsley et al.)",
      publisher: "Endorsed by the British Thyroid Association, British Thyroid Foundation, Butterfly Thyroid Cancer Trust, Thyroid Cancer Support Group Wales, BNMS, IPEM, BIR and RCR; hosted by the British Thyroid Foundation",
      year: 2022,
      url: "https://www.btf-thyroid.org/patient-information-on-radioiodine-treatment",
      gradingScheme: "Patient leaflet; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "arsac-nfg-2026",
      label: "Notes for guidance on the clinical administration of radiopharmaceuticals and use of sealed radioactive sources, July 2026 version",
      publisher: "Administration of Radioactive Substances Advisory Committee (ARSAC), UK",
      year: 2026,
      url: "https://www.gov.uk/government/publications/arsac-notes-for-guidance",
      gradingScheme: "Advisory committee guidance to good clinical practice in UK nuclear medicine; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "ata-2011",
      label: "Radiation safety in the treatment of patients with thyroid diseases by radioiodine 131I: practice recommendations of the American Thyroid Association",
      publisher: "American Thyroid Association Taskforce on Radioiodine Safety (Sisson et al., Thyroid)",
      year: 2011,
      url: "https://doi.org/10.1089/thy.2010.0403",
      doi: "10.1089/thy.2010.0403",
      gradingScheme: "Practice recommendations; the authors state the data are insufficient for evidence-based guidelines.",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "wu-2020-survey",
      label: "Nationwide Survey on Implementation of 2011 Nuclear Regulatory Commission Policy on Release of Patients After 131I Therapy for Thyroid Cancer",
      publisher: "Wu et al., Journal of Nuclear Medicine",
      year: 2020,
      url: "https://doi.org/10.2967/jnumed.119.230730",
      doi: "10.2967/jnumed.119.230730",
      gradingScheme: "Patient survey; not a guideline.",
      read: "full-text",
      accessed: "2026-11-17",
    },
  ],
  drugs: ["radioactive-iodine"],
  technologies: ["radioiodine-therapy"],
  terms: ["radioiodine-term"],
  cancers: ["thyroid", "papillary-thyroid-cancer", "follicular-thyroid-cancer"],
  institutions: ["iaea"],
  related: ["lutetium-177-therapy-home-radiation-safety", "radionuclide-therapy-patient-release-criteria"],
  upgrades: [],
  gaps: [
    "The example leaflet quoted in the steps is the IAEA's for radioiodine treatment of an overactive thyroid, adapted from European Commission guidance; SRS-63 says thyroid cancer needs its own leaflet. Its annex says the same advice applies to cancer patients who have spent a few days in hospital and retain less than about 600 MBq, that patients released straight after treatment need additional advice tailored to the country, and that the period is set locally. The steps should be read with that limit.",
    "The 2023 UK guidance, the most recent national guidance found, was read only as its abstract: on 17 November 2026 the publisher's page still did not serve the text to a script and an institutional repository record returned HTTP 403. Its patient leaflet was read in full. The guidance's recommended durations, and its advice for patients on haemodialysis, are not reproduced here.",
    "On 17 November 2026 the UK sources read give different pregnancy intervals: 4 months in the ARSAC notes (July 2026) and six months in the 2022 patient leaflet. The leaflet does not say why it is longer, and the full guidance, which may, could not be read.",
    "The ICRP 94 report itself and the American Thyroid Association recommendations (2011) were read only as abstracts, so the ICRP figures here are those SRS-63 reproduces. ICRP Publication 140 (2019), on therapy with radiopharmaceuticals, is a newer ICRP text that covers holding and releasing patients; only its abstract was read and it is not used here. The SNMMI/EANM procedure standard (2022) could not be read.",
    "Advice to men differs: SRS-63 said in 2009 that avoiding fathering a child for some months was prudence without a strong evidence base; the ARSAC notes (July 2026) advise avoiding conception for 4 months after iodine-131 iodide.",
    "The day counts in the SRS-63 table adapted from ICRP come from dose models from the 1990s and 2000s; SRS-63 says some models are unduly conservative, and that measured doses to families who follow the advice rarely approach a few millisieverts.",
    "SRS-63 dates from 2009 and its national release limits were not checked against current national rules. On 17 November 2026 the IAEA publication pages returned HTTP 403 to a script, so whether a newer IAEA report on release exists could not be checked there; SSG-46 (2018) refers to SRS-63 for detail.",
    "The US figures are those of the federal rule, 10 CFR 35.75; state rules were not read.",
  ],
});
