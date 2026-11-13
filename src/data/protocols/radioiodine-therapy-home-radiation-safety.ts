import { protocol } from "./helpers";

/*
 * Radiation safety for the patient, family and others after radioactive iodine (iodine-131) for differentiated
 * thyroid cancer, from the information given before treatment to the end of the precautions at home.
 *
 * What was read, and how (11 November 2026, fetched raw into a scratch directory and read as text):
 * - IAEA Safety Reports Series No. 63, Release of Patients After Radionuclide Therapy (2009, with contributions from
 *   the ICRP): full text, the PDF from www-pub.iaea.org read with pdftotext. It reproduces the ICRP Publication 94
 *   tables for thyroid cancer and an example instruction leaflet adapted from the European Commission guidance. No
 *   newer IAEA safety report on the subject was looked for beyond the IAEA Safety Guide below.
 * - IAEA Specific Safety Guide SSG-46 (2018): full text, PDF read with pdftotext, paras 4.235 to 4.248 (carers and
 *   comforters, pregnancy and breastfeeding status, release after radiopharmaceutical therapy).
 * - ICRP Publication 94, Release of patients after therapy with unsealed radionuclides (2004): abstract only, from the
 *   ICRP publication page; the full text link (SAGE) returned HTTP 403 to a script.
 * - US Nuclear Regulatory Commission, 10 CFR 35.75: full text from the eCFR renderer.
 * - The Ionising Radiation (Medical Exposure) Regulations 2017, regulation 12 (latest revised text): full text from
 *   legislation.gov.uk.
 * - Wadsley et al., UK patient preparation and radiation protection guidance for radioactive iodine in thyroid
 *   cancer (Clinical Oncology 2023, open access under CC BY-NC-ND): abstract only, through Europe PMC; the publisher's
 *   page returned HTTP 403 to a script and the Elsevier API returned metadata only.
 * - American Thyroid Association radiation safety practice recommendations (Sisson et al., Thyroid 2011): abstract
 *   only, through Europe PMC.
 * - Wu et al., nationwide US survey on release after iodine-131 for thyroid cancer (J Nucl Med 2020): abstract.
 * - The SNMMI/EANM procedure standard for differentiated thyroid cancer (J Nucl Med 2022, PMID 35649660) could not be
 *   reached at the journal's address and is not cited.
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
  tldr: "After radioactive iodine your body gives off radiation for some days, and some leaves in urine, saliva and sweat. For a while you keep your distance from others, especially babies, young children and anyone pregnant, sleep apart, take care in the toilet and with cups and towels, and stop breastfeeding completely. Your team works out how many days apply to you and writes them down.",
  simple: "For some days after this treatment, keep away from babies, small children and pregnant women, sleep on your own, sit down to pass urine, flush and wash your hands, and do not share cups, cutlery or towels. Breastfeeding must stop. Drink plenty. Carry the card the hospital gives you.",
  summary: "Before treatment the patient is told how to protect others and how long it will last, so they can plan (IAEA SRS-63; ICRP 94). Pregnancy is excluded and breastfeeding is stopped completely; ICRP says mothers must cease breastfeeding immediately, and some physicians ask for it to stop two to three weeks before treatment so the breast takes up less iodine (SRS-63). Release is an individual decision: the IAEA and ICRP base it on the dose others could receive rather than on a fixed amount left in the body; the US allows release where no one else is likely to receive more than 5 mSv, with written instructions where anyone could receive more than 1 mSv (10 CFR 35.75); in the UK the patient must have written instructions on restricting others' dose before leaving (IR(ME)R 2017 reg 12(6) and (7)). Many European countries also set a maximum retained activity, mostly 400 to 600 MBq (SRS-63), and thyroid cancer treatment is usually given with a hospital stay there; in the US most patients are now treated as outpatients (87% of survey respondents treated after 2011, Wu 2020).\n\nAt home the effort goes on pregnant women, infants and children, because measured doses to adults who follow the advice rarely approach a few millisieverts (SRS-63). The example IAEA leaflet asks for a distance of at least one metre, two metres for longer than an hour, a separate bed two metres apart, close contact limited to half an hour a day, under-twos cared for by someone else, seated urination with flushing and hand washing, a daily shower especially on the first two days, and no sharing of cutlery, crockery, towels or laundry. Durations depend on the activity and on whether the treatment is a first ablation or a later follow-up treatment; the ICRP 94 table reproduced by SRS-63 gives, for 3,700 MBq, 4 days of sleeping apart after a follow-up treatment and 20 days after ablation. Patients carry a card for unplanned admissions and for radiation detectors at airports and borders, which can pick up radioiodine for weeks. ICRP advises women to avoid pregnancy for 4 months after iodine-131 for thyroid cancer; ARSAC in the UK says 6 months; men are commonly advised to avoid fathering a child for some months, on prudence rather than evidence (SRS-63). UK guidance from 2023 found wide variation and some unnecessarily burdensome restrictions, and recommends personalising them.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "nurse", "patient-or-carer"],
    where: ["ward", "outpatient-clinic", "home"],
  },
  population: "Adults treated with iodine-131 (sodium iodide) for differentiated thyroid cancer, after thyroidectomy (ablation, adjuvant treatment or treatment of persistent or metastatic disease), and the people they live and work with. The day counts are examples: each centre sets them from the activity given, measured dose rate, home circumstances and national rules. Children treated with iodine-131, iodine-131 MIBG and treatment for an overactive thyroid follow their own instructions; lutetium-177 therapy is a separate protocol.",
  trigger: "Radioactive iodine treatment is planned, and again when the patient is released from hospital or from the department.",
  steps: [
    {
      action: "Before treatment, tell the patient how they will protect others afterwards and for how long, in time for them to plan childcare, work and travel",
      why: "Knowing in advance how many days of precautions apply makes them easier to follow and less frightening.",
      source: "iaea-srs63",
      quote: "Patients should be given information about their own safety and that of others before their treatment is started.",
    },
    {
      action: "Confirm the patient is not pregnant before giving the iodine",
      why: "Radioactive iodine crosses the placenta and can damage the baby's thyroid; thyroid cancer treatment can usually wait until after pregnancy.",
      source: "iaea-srs63",
      quote: "Pregnancy is a strong contraindication to unsealed radionuclide therapy, unless the therapy is life saving.",
    },
    {
      action: "Make sure breastfeeding has stopped completely before treatment and does not restart for this child",
      why: "Radioactive iodine passes into breast milk and could destroy the baby's thyroid.",
      source: "iaea-srs63",
      quote: "Thus, therapeutic radiopharmaceuticals, regardless of the route of administration, are potentially hazardous, and therefore breast-feeding must be discontinued indefinitely",
    },
    {
      action: "Decide on release for this patient individually, from the dose other people could receive and their home circumstances, within national rules",
      why: "A fixed rule can keep people in hospital who could safely go home, or send home someone who lives with a baby.",
      source: "iaea-srs63",
      quote: "The decision to hospitalize or release a patient should be determined on an individual basis.",
    },
    {
      action: "Give written instructions on protecting others, and the risks of radiation, before the patient leaves the department",
      why: "Instructions on paper are there when questions come up at home.",
      source: "irmer-2017-reg12",
      quote: "be provided to the patient or other person specified in paragraph (6) as appropriate prior to the patient leaving the radiological installation where the exposure was carried out.",
    },
    {
      action: "Focus the restrictions on pregnant women, babies and children",
      why: "Adults at home who follow the advice receive very small doses; the young and the unborn are most sensitive.",
      source: "iaea-srs63",
      quote: "Restrictions, once families and carers have been well instructed, should thus focus on the special consideration groups (i.e. pregnant women, infants and children).",
    },
    {
      action: "Keep at least one metre from other people, and two metres for anything longer than an hour, for the days set by the team",
      why: "Radiation falls off quickly with distance, so a little space cuts the dose a lot.",
      source: "iaea-srs63",
      quote: "Do not sit or stay close to any person either at home or at work. Try to maintain a distance of at least one metre. For long periods (more than one hour), stay two metres away.",
    },
    {
      action: "Sleep in a separate bed two metres away, and limit hugging or sex to half an hour a day, for the days set by the team",
      why: "A night beside someone is the longest close contact of the day; house walls do not block this radiation well.",
      source: "iaea-srs63",
      quote: "Close contact such as hugging or sex should be limited to half an hour a day. You should sleep in a separate bed. Beds should be two metres apart, even if there is a wall separating them.",
    },
    {
      action: "Arrange for someone else to look after children under two where possible",
      why: "Babies are the most sensitive to radiation and need the longest, closest contact.",
      source: "iaea-srs63",
      quote: "Children under two years old should be looked after by someone else.",
    },
    {
      action: "Sit to pass urine (men too), dry with toilet paper and flush, wash hands every time, and shower daily, especially in the first two days",
      why: "Most of the iodine not taken up by the thyroid leaves in urine; careful toilet habits keep it off surfaces others touch.",
      source: "iaea-srs63",
      quote: "Therefore, pass urine while seated (including men). Always dry your genitals with toilet paper and flush the toilet.",
    },
    {
      action: "Do not share cutlery, crockery, towels, face cloths or toothbrushes; wash your clothes and bedding separately",
      why: "Some iodine leaves in saliva and sweat; washing removes it.",
      source: "iaea-srs63",
      quote: "Therefore, cutlery, crockery, towels, bed linen, etc., should not be shared with others.",
    },
    {
      action: "Drink plenty and pass urine often",
      why: "Emptying the bladder often moves the iodine out of the body sooner and lowers the dose to nearby organs.",
      source: "iaea-srs63",
      quote: "The dose can be reduced by orally hydrating the patient and by encouraging frequent voiding. This is a common recommendation for all patients whether pregnant or not.",
    },
    {
      action: "Carry the treatment card, show it if admitted to any hospital, and take it when travelling",
      why: "Staff need to know about the radioactivity, and airport and border detectors can pick it up for weeks.",
      source: "iaea-srs63",
      quote: "Environmental or other radiation detection devices are sensitive enough that they will usually detect patients who have received radioiodine treatment for weeks after administration.",
    },
    {
      action: "Avoid pregnancy for at least 4 months (ICRP) or 6 months (ARSAC, UK) after treatment",
      why: "The wait protects a future baby from radiation and lets the team confirm the cancer is controlled before a pregnancy.",
      source: "iaea-srs63",
      quote: "the ICRP recommends that female patients be advised to avoid pregnancy for the time periods indicated in Table 13.",
    },
  ],
  bestInClass: {
    statement: "An individual release decision based on the dose others could receive, with written instructions before leaving (IAEA SRS-63 and SSG-46; ICRP 94; 10 CFR 35.75; IR(ME)R 2017 reg 12), and restrictions focused on pregnant women, infants and children, whose length is set for the person from the activity given and their household rather than taken from a single table. None of these sources grades its advice: the IAEA and ICRP documents are consensus built on measured and modelled doses, and the US and UK texts are law. They differ on two points shown below: how release is decided (dose to others in the US and in IAEA and ICRP advice, a retained-activity limit in many European countries) and how long to avoid pregnancy (4 months ICRP, 6 months ARSAC, 6 to 12 months in some practice). The 2023 UK multidisciplinary guidance adds the case against over-restriction, which its authors found widespread.",
    sources: ["iaea-srs63", "iaea-ssg46", "icrp-94", "nrc-10cfr35-75", "irmer-2017-reg12", "uk-rai-2023"],
  },
  variants: [
    {
      name: "Release by retained activity (many European countries)",
      differs: "A patient is kept in hospital until the iodine left in the body falls below a set amount: the old IAEA Basic Safety Standards guidance level was 1,100 MBq; most EU member states use 400 to 600 MBq (range about 95 to 800); Germany 250 MBq, based on 3.5 microsieverts an hour at one metre; the European Thyroid Association favours outpatient treatment up to 800 MBq (SRS-63 tables 9 and 10). Thyroid cancer treatment is usually given with a hospital stay in the EU.",
      evidence: "SRS-63 says some retained-activity models are unduly conservative and may cause unnecessary hospital stays, and that where the two approaches conflict the ICRP regards the dose-based one as more fundamental.",
      sources: ["iaea-srs63"],
    },
    {
      name: "Release by dose to others (United States)",
      differs: "Release is allowed when no other person is likely to receive more than 5 mSv; written instructions are required when anyone could receive more than 1 mSv, with breastfeeding guidance where a nursing infant could. In practice most US patients with thyroid cancer are treated as outpatients.",
      evidence: "In a 2018 survey of 1,111 US patients treated between 2011 and 2018, 87% were treated as outpatients (66% before 2009), 67% were able to discuss and individualise their instructions, and 2% did not recall receiving any.",
      sources: ["nrc-10cfr35-75", "wu-2020-survey"],
    },
    {
      name: "UK guidance (2023): personalised, less burdensome restrictions",
      differs: "A UK multidisciplinary group convened at the instigation of patient support groups, with the British Thyroid Association, British Nuclear Medicine Society, IPEM, BIR and RCR among the authors, wrote guidance and a patient leaflet focused on personalising the advice, including for patients on haemodialysis.",
      evidence: "Its abstract reports significant variation across the UK and that some patients are asked to observe unnecessarily burdensome restrictions. Only the abstract was read; its specific day counts are not reproduced here.",
      sources: ["uk-rai-2023"],
    },
    {
      name: "Stopping breastfeeding weeks before treatment",
      differs: "Some physicians ask women to stop breastfeeding two to three weeks before radioiodine, so that the breast takes up less iodine and there is no risk of restarting; the general rule is only that breastfeeding stops and does not resume.",
      evidence: "SRS-63 describes it as a practice some find helpful, without a grade or data.",
      sources: ["iaea-srs63"],
    },
    {
      name: "American Thyroid Association tables (2011)",
      differs: "Gives example tables for working out the number of days of precautions for an individual patient, built on US NRC rules and NCRP Report 155, with a checklist for the patient's circumstances.",
      evidence: "Its authors state there are insufficient data on long-term outcomes for evidence-based guidelines. Only the abstract was read.",
      sources: ["ata-2011"],
    },
  ],
  grades: [
    { claim: "Decide hospital stay or release individually", grade: "Consensus (ungraded)", source: "icrp-94", quote: "The decision to hospitalise or release a patient should be determined on an individual basis." },
    { claim: "Stop breastfeeding immediately after radioiodine", grade: "Consensus (ungraded)", source: "icrp-94", quote: "After radioiodine therapy, mothers must cease breastfeeding immediately." },
    { claim: "Release allowed if no other person is likely to receive more than 5 mSv; written instructions if anyone could receive more than 1 mSv", grade: "Regulatory requirement (ungraded)", source: "nrc-10cfr35-75", quote: "A licensee may authorize the release from its control of any individual who has been administered unsealed byproduct material or implants containing byproduct material if the total effective dose equivalent to any other individual from exposure to the released individual is not likely to exceed 5 mSv (0.5 rem)." },
    { claim: "Written instructions to the patient on restricting others' doses", grade: "Regulatory requirement (ungraded)", source: "irmer-2017-reg12", quote: "specify how doses resulting from the patient’s exposure can be restricted as far as reasonably possible so as to protect persons in contact with the patient;" },
    { claim: "Written instructions to carers after radioiodine, including time and proximity, physical contact and not sharing food or drinks", grade: "Safety Guide recommendation (ungraded)", source: "iaea-ssg46", quote: "carer or comforter of the patient (including for example, instructions on time spent with the patient and proximity to the patient, minimizing of physical contact and not sharing food or drinks)." },
    { claim: "Dose constraint of 5 mSv per episode for an adult carer, 1 mSv for children and for the embryo or fetus of a pregnant carer", grade: "Safety Guide recommendation (ungraded)", source: "iaea-ssg46", quote: "For an adult carer or comforter, a value of dose constraint commonly used is 5 mSv effective dose per episode." },
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
      accessed: "2026-11-11",
    },
    {
      key: "iaea-ssg46",
      label: "Radiation Protection and Safety in Medical Uses of Ionizing Radiation, Specific Safety Guide No. SSG-46",
      publisher: "International Atomic Energy Agency, jointly sponsored by PAHO and WHO",
      year: 2018,
      url: "https://www-pub.iaea.org/MTCD/Publications/PDF/PUB1775_web.pdf",
      gradingScheme: "An IAEA Safety Guide: recommendations ('should') on meeting the Safety Requirements; not graded by evidence.",
      read: "full-text",
      accessed: "2026-11-11",
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
      accessed: "2026-11-11",
    },
    {
      key: "nrc-10cfr35-75",
      label: "10 CFR 35.75 Release of individuals containing unsealed byproduct material or implants containing byproduct material",
      publisher: "US Nuclear Regulatory Commission (Code of Federal Regulations, via eCFR)",
      year: 2007,
      url: "https://www.ecfr.gov/current/title-10/chapter-I/part-35/subpart-C/section-35.75",
      gradingScheme: "Federal regulation; requirements are not graded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "irmer-2017-reg12",
      label: "The Ionising Radiation (Medical Exposure) Regulations 2017, regulation 12 (optimisation), latest revised text",
      publisher: "UK legislation (legislation.gov.uk)",
      year: 2017,
      url: "https://www.legislation.gov.uk/uksi/2017/1322/regulation/12",
      gradingScheme: "Statutory instrument; requirements are not graded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "uk-rai-2023",
      label: "Patient Preparation and Radiation Protection Guidance for Adult Patients Undergoing Radioiodine Treatment for Thyroid Cancer in the UK",
      publisher: "Wadsley et al. with the British Thyroid Association, British Thyroid Foundation, BNMS, IPEM, BIR, RCR and patient groups (Clinical Oncology)",
      year: 2023,
      url: "https://doi.org/10.1016/j.clon.2022.07.002",
      doi: "10.1016/j.clon.2022.07.002",
      gradingScheme: "Multidisciplinary consensus guidance; grading not known (only the abstract was read).",
      read: "abstract",
      accessed: "2026-11-11",
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
      accessed: "2026-11-11",
    },
    {
      key: "wu-2020-survey",
      label: "Nationwide Survey on Implementation of 2011 Nuclear Regulatory Commission Policy on Release of Patients After 131I Therapy for Thyroid Cancer",
      publisher: "Wu et al., Journal of Nuclear Medicine",
      year: 2020,
      url: "https://doi.org/10.2967/jnumed.119.230730",
      doi: "10.2967/jnumed.119.230730",
      gradingScheme: "Patient survey; not a guideline.",
      read: "abstract",
      accessed: "2026-11-11",
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
    "The example leaflet quoted in the steps is the IAEA's for radioiodine treatment of an overactive thyroid, adapted from European Commission guidance; SRS-63 says thyroid cancer needs its own leaflet. The behaviours are the same, but the number of days after cancer treatment is longer and is set by each centre.",
    "The 2023 UK guidance, the most recent national guidance found, was read only as its abstract: the publisher's page refused a script. Its recommended durations, and its advice for patients on haemodialysis, are not reproduced here.",
    "The ICRP 94 report itself, the American Thyroid Association recommendations (2011) and the SNMMI/EANM procedure standard (2022) were not read in full; the last could not be reached at all.",
    "Whether men should avoid fathering a child after radioiodine, and for how long, has no strong evidence base (SRS-63); centres differ.",
    "The day counts in the ICRP 94 table reproduced by SRS-63 come from dose models from the 1990s and 2000s; SRS-63 notes that calculated doses tended to be higher than measured ones and that some contact restrictions in use could be eased.",
    "SRS-63 dates from 2009. A newer IAEA safety report on release was not looked for beyond SSG-46 (2018), which defers to it for detail.",
  ],
});
