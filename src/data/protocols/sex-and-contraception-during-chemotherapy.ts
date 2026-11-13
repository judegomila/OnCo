import { protocol } from "./helpers";

/*
 * Sex, contraception and barrier protection during and after chemotherapy.
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - Macmillan Cancer Support, Side effects of chemotherapy (reviewed 30 September 2018, marked as under review): full
 *   text; the sex, contraception, pregnancy and breastfeeding sections.
 * - NHS, Chemotherapy (page reviewed 14 February 2025): full text.
 * - NCI, Chemotherapy and You (December 2023): full text; the sexual changes and home safety sections.
 * - US Medical Eligibility Criteria for Contraceptive Use, 2024 (CDC, MMWR Recomm Rep): full text, Europe PMC XML
 *   (PMC11315372). The tables do not survive extraction cleanly, so only prose sentences are quoted.
 * - Society of Family Planning with the Society of Gynecologic Oncology, Contraceptive considerations for individuals
 *   with cancer and cancer survivors, parts 1 to 3 (Contraception 2025): abstracts.
 * - ASCO, Fertility Preservation in People With Cancer, guideline update (J Clin Oncol 2025): abstract.
 * - ESMO, Fertility preservation and post-treatment pregnancies in post-pubertal cancer patients (Ann Oncol 2020): not
 *   reachable (the journal page returned a bot check and PubMed holds no abstract).
 * Every DOI was resolved through Crossref and Europe PMC.
 */
export const sexAndContraceptionDuringChemotherapy = protocol({
  id: "sex-and-contraception-during-chemotherapy",
  name: "Sex, contraception and barrier protection during and after chemotherapy",
  aka: ["contraception during chemotherapy", "condoms after chemotherapy", "pregnancy prevention during cancer treatment", "sex during chemotherapy", "birth control and cancer treatment"],
  domain: "supportive-care",
  tldr: "Chemotherapy can harm an unborn baby, and pregnancy is still possible even when fertility is affected, so anyone who could get pregnant, or get a partner pregnant, needs contraception during treatment and for a time after. Condoms are usually advised, and they also protect a partner from traces of drug in body fluids after some treatments. Ask your team which method suits you and for how long.",
  simple: "Most people can have sex during chemotherapy, but ask your team first. Use contraception during treatment and for as long afterwards as your team says, because the drugs can harm a baby. Condoms are usually best. After some drugs, use a condom for a few days to protect your partner. Tell your team straight away if you might be pregnant.",
  summary: "Patient guidance from Macmillan (2018), the NHS (2025) and NCI (2023) agrees that chemotherapy can harm a pregnancy, that contraception is needed by anyone who could get pregnant or make a partner pregnant during treatment and for a time after, that a pregnancy test may be done before treatment, and that pregnancy remains possible even when fertility is reduced. Macmillan says barrier methods are usually best during treatment, condoms (or a dental dam for oral sex) for a few days after certain drugs protect partners from drug in body fluids, and breastfeeding is not advised. NCI says to prevent pregnancy for a year after chemotherapy and that some teams suggest two methods. The Society of Family Planning (2025) recommends offering a discussion of contraception before treatment to everyone who is pregnancy-capable, says emergency contraception is safe, recommends nonhormonal contraception first line after breast cancer (GRADE 1B) and avoiding oestrogen-containing methods with oestrogen-blocking therapy (best practice), and supports access to all methods for most other cancers. US MEC 2024 lists breast cancer among conditions in which pregnancy carries added risk. ASCO 2025 says fertility preservation should be discussed before treatment. The ESMO 2020 fertility and pregnancy guideline could not be read.",
  asOf: "2026-11-11",
  setting: {
    who: ["patient-or-carer", "doctor", "nurse"],
    where: ["home", "outpatient-clinic"],
  },
  population: "Adults having chemotherapy who are sexually active and could become pregnant or make a partner pregnant, and their partners. Advice differs for people with hormone-sensitive cancers (breast cancer in particular), people after a stem cell transplant, and people with very low blood counts; those differences are named in the steps.",
  trigger: "Before chemotherapy starts, and again at any change of treatment.",
  steps: [
    {
      action: "Before treatment, talk with the team about contraception, pregnancy and fertility, including storing eggs or sperm",
      why: "Choices about fertility must be made before treatment, and the right contraceptive depends on the cancer and the drugs.",
      source: "sfp-2025-part1",
      quote: "No test reliably rules out pregnancy potential in cancer survivors; clinicians should offer to discuss contraception with individuals who are pregnancy-capable before cancer treatment.",
      grade: "Committee statement (Society of Family Planning); not graded in the abstract",
    },
    {
      action: "Use contraception during treatment and for as long afterwards as the team advises, if you could get pregnant or get a partner pregnant",
      why: "Chemotherapy can harm a developing baby, and pregnancy can still happen even if fertility has been reduced.",
      source: "nhs-chemotherapy",
      quote: "It's important to use contraception during treatment if you could get pregnant or you could get your partner pregnant.",
      grade: "Not graded (patient information)",
    },
    {
      action: "Ask which method is best; barrier methods such as condoms or a cap are usually advised during treatment",
      why: "Some hormonal methods are unsuitable with some cancers and drugs, and barrier methods are safe for almost everyone.",
      source: "macmillan-chemo-side-effects",
      quote: "During treatment, it is usually best to use barrier methods of contraception, such as condoms or the cap (diaphragms). Ask your cancer doctor or specialist nurse which type is best for you to use.",
      grade: "Not graded (patient information)",
    },
    {
      action: "After breast cancer, use a nonhormonal method first line, and avoid oestrogen-containing contraception if taking oestrogen-blocking therapy",
      why: "Breast cancer is often hormone-sensitive, and oestrogen-containing methods work against oestrogen-blocking treatment.",
      source: "sfp-2025-part2",
      quote: "For individuals with a history of breast cancer, we recommend nonhormonal contraceptives as the first-line option (GRADE 1B); additional guidance is provided for hormonal contraception depending on breast cancer hormone receptor status.",
      grade: "GRADE 1B (nonhormonal first line after breast cancer); Best Practice (avoid oestrogen with oestrogen-blocking therapy)",
    },
    {
      action: "If the team advises it, use a condom for vaginal or anal sex, and a condom or dental dam for oral sex, for a few days after certain drugs",
      why: "Small amounts of some drugs reach semen and vaginal fluid, and a barrier protects a partner from them.",
      source: "macmillan-chemo-side-effects",
      quote: "To protect partners, your cancer doctor may advise that for a few days after certain drugs you use a condom for vaginal or anal sex and a condom (or a latex barrier such as a dental dam) for oral sex.",
      grade: "Not graded (patient information)",
    },
    {
      action: "Ask the team whether sex is safe for you during treatment, especially when blood counts are low or after a stem cell transplant",
      why: "Most people can have sex, but very low platelets or white cells change the risks of bleeding and infection.",
      source: "nci-chemo-and-you",
      quote: "Ask your doctor or nurse if it is okay for you to have sex during chemotherapy.",
      grade: "Not graded (patient booklet)",
    },
    {
      action: "Use emergency contraception if needed; it is safe for people with cancer",
      why: "A missed or failed method should not be left uncovered during treatment.",
      source: "sfp-2025-part1",
      quote: "Clinicians should counsel individuals with cancer that it is safe for them to use emergency contraception.",
      grade: "Committee statement (Society of Family Planning); not graded in the abstract",
    },
    {
      action: "Tell the team straight away if you are, or might be, pregnant",
      why: "The team can explain the risks and options, which depend on the drugs and the stage of pregnancy.",
      source: "macmillan-chemo-side-effects",
      quote: "If you know you are pregnant before starting treatment, or become pregnant during treatment, tell your cancer doctor or nurse straight away.",
      grade: "Not graded (patient information)",
    },
    {
      action: "Do not breastfeed during chemotherapy",
      why: "The drugs can pass to a baby in breast milk.",
      source: "macmillan-chemo-side-effects",
      quote: "Breastfeeding during chemotherapy is not advised.",
      grade: "Not graded (patient information)",
    },
    {
      action: "For vaginal dryness, use a water-based lubricant, and ask about other treatments if sex is still painful",
      why: "Chemotherapy can lower hormone levels and cause dryness, which makes sex uncomfortable.",
      source: "nci-chemo-and-you",
      quote: "If sex is still painful because of dryness, ask your doctor or nurse about medications to help restore moisture in your vagina.",
      grade: "Not graded (patient booklet)",
    },
  ],
  bestInClass: {
    statement: "Contraception for anyone pregnancy-capable, or with a pregnancy-capable partner, during chemotherapy and for a period after is agreed by every source read (NHS 2025, NCI 2023, Macmillan 2018, Society of Family Planning 2025). The Society of Family Planning 2025 series is the most recent specialist guidance: discuss contraception before treatment with everyone pregnancy-capable, emergency contraception is safe, nonhormonal methods first after breast cancer (GRADE 1B), no oestrogen with oestrogen-blocking therapy (best practice), and access to all methods for most other cancers. How long to continue after treatment is not agreed: NCI says a year, Macmillan says 'for a time after', and the real figure depends on the drug's label, which the team gives.",
    sources: ["sfp-2025-part1", "sfp-2025-part2", "sfp-2025-part3", "nhs-chemotherapy", "nci-chemo-and-you", "macmillan-chemo-side-effects"],
  },
  variants: [
    {
      name: "A year of pregnancy prevention, possibly with two methods (NCI)",
      differs: "Sets a fixed year after chemotherapy for women and says some teams suggest two forms of birth control.",
      evidence: "NCI booklet, not graded: 'It is very important to prevent pregnancy while having chemotherapy and for a year afterwards.' Other sources leave the period to the drug and the team.",
      sources: ["nci-chemo-and-you"],
    },
    {
      name: "Hormonal and intrauterine methods for most cancers other than breast (Society of Family Planning)",
      differs: "Supports access to all contraceptive methods for most other cancers, with shared decision-making for some hormone-sensitive tumours (for example adult granulosa cell, low-grade serous and endometrioid ovarian tumours, melanoma, meningioma, follicular lymphoma), and advises against an IUD with active cervical cancer.",
      evidence: "Society of Family Planning 2025 parts 2 and 3: GRADE 1B to 2C depending on the cancer, as printed in the abstracts.",
      sources: ["sfp-2025-part2", "sfp-2025-part3"],
    },
    {
      name: "Avoiding close contact after high-dose chemotherapy or stem cell transplant (Macmillan)",
      differs: "After high-dose chemotherapy or a stem cell transplant, the team may advise no close physical contact for a while, to prevent infection.",
      evidence: "Patient information, not graded.",
      sources: ["macmillan-chemo-side-effects"],
    },
  ],
  grades: [
    { claim: "Nonhormonal contraception first line after breast cancer", grade: "GRADE 1B", source: "sfp-2025-part2", quote: "For individuals with a history of breast cancer, we recommend nonhormonal contraceptives as the first-line option (GRADE 1B); additional guidance is provided for hormonal contraception depending on breast cancer hormone receptor status." },
    { claim: "No oestrogen-containing contraception with oestrogen-blocking therapy", grade: "Best Practice", source: "sfp-2025-part2", quote: "Estrogen-containing contraceptives should be avoided by individuals treated with estrogen-blocking therapy (Best Practice)." },
    { claim: "Access to all methods after colorectal, pancreatic, oesophageal and gastric cancer", grade: "GRADE 1C", source: "sfp-2025-part3", quote: "For individuals with a history of colorectal, pancreatic, esophageal, and gastric cancer, we recommend clinicians provide access to all available contraceptive methods (GRADE 1C)." },
    { claim: "Breast cancer is hormonally sensitive; LNG-IUD may carry less concern than combined or higher-dose progestogen methods", grade: "US MEC 2024 classification comment", source: "us-mec-2024", quote: "Breast cancer is a hormonally sensitive tumor. Concerns about progression of the disease might be less with LNG-IUDs than with COCs or higher-dose POCs." },
    { claim: "Fertility preservation discussed before treatment", grade: "ASCO guideline recommendation (strength not shown in the abstract)", source: "asco-fp-2025", quote: "FP approaches should be discussed before cancer-directed therapy." },
  ],
  sources: [
    {
      key: "macmillan-chemo-side-effects",
      label: "Side effects of chemotherapy",
      publisher: "Macmillan Cancer Support",
      year: 2018,
      url: "https://www.macmillan.org.uk/cancer-information-and-support/treatment/types-of-treatment/chemotherapy/side-effects-of-chemotherapy",
      gradingScheme: "Patient information page; not graded. Reviewed September 2018, page marked as under review.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "nhs-chemotherapy",
      label: "Chemotherapy",
      publisher: "NHS",
      year: 2025,
      url: "https://www.nhs.uk/tests-and-treatments/chemotherapy/",
      gradingScheme: "Patient information page; not graded. Reviewed 14 February 2025.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "nci-chemo-and-you",
      label: "Chemotherapy and You: Support for People with Cancer",
      publisher: "National Cancer Institute (US)",
      year: 2023,
      url: "https://www.cancer.gov/publications/patient-education/chemotherapy-and-you.pdf",
      gradingScheme: "Patient booklet; recommendations are not graded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "us-mec-2024",
      label: "U.S. Medical Eligibility Criteria for Contraceptive Use, 2024",
      publisher: "CDC (MMWR Recommendations and Reports)",
      year: 2024,
      url: "https://doi.org/10.15585/mmwr.rr7304a1",
      doi: "10.15585/mmwr.rr7304a1",
      gradingScheme: "Categories 1 to 4 for each method and condition (1 no restriction, 4 unacceptable health risk).",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "sfp-2025-part1",
      label: "Society of Family Planning Committee Statement: Contraceptive considerations for individuals with cancer and cancer survivors part 1, key considerations for clinical care",
      publisher: "Society of Family Planning and Society of Gynecologic Oncology (Contraception)",
      year: 2025,
      url: "https://doi.org/10.1016/j.contraception.2025.110870",
      doi: "10.1016/j.contraception.2025.110870",
      gradingScheme: "Committee statement; not graded in the abstract.",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "sfp-2025-part2",
      label: "Society of Family Planning Clinical Recommendation: Contraceptive considerations for individuals with cancer and cancer survivors part 2, breast, ovarian, uterine and cervical cancer",
      publisher: "Society of Family Planning and Society of Gynecologic Oncology (Contraception)",
      year: 2025,
      url: "https://doi.org/10.1016/j.contraception.2025.110867",
      doi: "10.1016/j.contraception.2025.110867",
      gradingScheme: "GRADE strength (1 strong, 2 weak) and certainty (A to C), printed after each recommendation in the abstract; some statements are labelled Best Practice.",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "sfp-2025-part3",
      label: "Society of Family Planning Clinical Recommendation: Contraceptive considerations for individuals with cancer and cancer survivors part 3, skin, blood, gastrointestinal, liver, lung, central nervous system and other cancers",
      publisher: "Society of Family Planning and Society of Gynecologic Oncology (Contraception)",
      year: 2025,
      url: "https://doi.org/10.1016/j.contraception.2025.110869",
      doi: "10.1016/j.contraception.2025.110869",
      gradingScheme: "GRADE strength (1 strong, 2 weak) and certainty (A to C), printed after each recommendation in the abstract.",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "asco-fp-2025",
      label: "Fertility Preservation in People With Cancer: ASCO Guideline Update",
      publisher: "ASCO (Journal of Clinical Oncology)",
      year: 2025,
      url: "https://doi.org/10.1200/JCO-24-02782",
      doi: "10.1200/JCO-24-02782",
      gradingScheme: "ASCO evidence quality and recommendation strength; not shown in the abstract.",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "esmo-fertility-2020",
      label: "Fertility preservation and post-treatment pregnancies in post-pubertal cancer patients: ESMO Clinical Practice Guidelines",
      publisher: "ESMO (Annals of Oncology)",
      year: 2020,
      url: "https://doi.org/10.1016/j.annonc.2020.09.006",
      doi: "10.1016/j.annonc.2020.09.006",
      read: "not-reachable",
      accessed: "2026-11-11",
    },
  ],
  terms: ["cancer-in-pregnancy"],
  technologies: ["fertility-preservation"],
  related: ["idea-acc-default-fertility-preservation-referral", "oral-anticancer-medicines-at-home"],
  gaps: [
    "How long to continue contraception after treatment depends on each drug's label; the patient sources give a year (NCI) or 'a time' (Macmillan), and no source read here gives drug-by-drug periods.",
    "How much drug reaches semen or vaginal fluid, and for how long, is poorly measured; the 'few days' of condom use is expert advice.",
    "The ESMO 2020 guideline on fertility preservation and pregnancy after treatment could not be read (bot check on the journal page, no abstract in PubMed).",
    "The Society of Family Planning 2025 series and the ASCO 2025 fertility guideline were read as abstracts only.",
    "Macmillan's chemotherapy side effects page was last reviewed in 2018 and is marked as under review.",
    "Advice for trans and non-binary people, and for same-sex partners, is not addressed in the patient sources beyond the Society of Family Planning's call for person-centred care.",
  ],
});
