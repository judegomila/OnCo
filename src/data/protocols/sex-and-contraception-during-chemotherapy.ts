import { protocol } from "./helpers";

/*
 * Sex, contraception and barrier protection during and after chemotherapy.
 *
 * First written on 11 November 2026. Second accuracy pass on 17 November 2026: every source was fetched again raw
 * with curl (pdftotext for the two PDFs) and each claim was re-read against the text; every quote was checked verbatim
 * by script.
 * - Macmillan Cancer Support, Side effects of chemotherapy (reviewed 30 September 2018, marked as being reviewed): full
 *   text; the sex, contraception, pregnancy and breastfeeding sections.
 * - NHS, Chemotherapy (page reviewed 14 February 2025): full text.
 * - NCI, Chemotherapy and You (printed date January 2024, NIH Publication No. 24-7157): full text of the PDF; the
 *   home safety, infertility and sexual changes sections. The first pass dated it 2023 from the file's creation date.
 * - Cancer Research UK, Sex and chemotherapy (reviewed 23 May 2024): full text. Added in the second pass for the
 *   length of barrier use and the reason hormonal methods may not suit.
 * - FDA, Oncology Pharmaceuticals: Reproductive Toxicity Testing and Labeling Recommendations, guidance for industry
 *   (May 2019): full text of the PDF. Added in the second pass for the length of contraception after treatment by sex.
 * - US Medical Eligibility Criteria for Contraceptive Use, 2024 (CDC, MMWR Recomm Rep): full text, Europe PMC XML
 *   (PMC11315372). The tables do not survive extraction cleanly, so only prose sentences are quoted.
 * - Society of Family Planning with the Society of Gynecologic Oncology, Contraceptive considerations for individuals
 *   with cancer and cancer survivors, parts 1 to 3 (Contraception 2025): abstracts from Europe PMC. An open copy of
 *   part 3 listed by Europe PMC returned an empty response to a script.
 * - ASCO, Fertility Preservation in People With Cancer, guideline update (J Clin Oncol 2025): abstract. Europe PMC
 *   lists two errata (May and August 2025), not read.
 * - ESMO, Fertility preservation and post-treatment pregnancies in post-pubertal cancer patients (Ann Oncol 2020):
 *   still not reachable (the journal page returned 403 and Europe PMC holds no abstract).
 * Every DOI was resolved through Crossref and Europe PMC.
 */
export const sexAndContraceptionDuringChemotherapy = protocol({
  id: "sex-and-contraception-during-chemotherapy",
  name: "Sex, contraception and barrier protection during and after chemotherapy",
  aka: ["contraception during chemotherapy", "condoms after chemotherapy", "pregnancy prevention during cancer treatment", "sex during chemotherapy", "birth control and cancer treatment"],
  domain: "supportive-care",
  tldr: "Chemotherapy can harm an unborn baby, and pregnancy is still possible even when fertility is affected, so anyone who could get pregnant, or get a partner pregnant, needs contraception during treatment and for a time after. Barrier methods such as condoms are usually advised; after some drugs they also protect a partner from traces of drug in body fluids. Ask your team which method and how long.",
  simple: "Most people can have sex during chemotherapy, but ask your team first. Use contraception during treatment and for as long afterwards as your team says, because the drugs can harm a baby. Barrier methods such as condoms are usually best. After some drugs, your team may advise a condom for a few days to protect your partner. Tell your team straight away if you might be pregnant.",
  summary: "Patient guidance from Macmillan (2018), the NHS (2025), NCI (2024) and Cancer Research UK (2024) agrees that chemotherapy can harm a pregnancy and that contraception is needed during treatment by anyone who could get pregnant or make a partner pregnant. The NHS and NCI say a pregnancy test may be asked for before treatment. Macmillan adds 'for a time after', says a pregnancy may still start even if fertility is likely to be damaged, that barrier methods are usually best during treatment, that a doctor may advise condoms (or a dental dam for oral sex) for a few days after certain drugs to protect partners, and that breastfeeding is not advised. Cancer Research UK says a barrier method is generally needed only during treatment and for about a week afterwards, and that it is not known for sure whether the drugs pass into semen or vaginal fluid. NCI tells women to prevent pregnancy during chemotherapy and for a year afterwards and says the team may suggest two forms of birth control; for men it speaks only of the time on treatment. FDA guidance for US drug labels (2019, nonbinding) recommends, after a genotoxic drug, contraception for five half-lives plus 6 months for women and five half-lives plus 3 months for men, and five half-lives (at least 1 week) after a nongenotoxic drug that can harm an embryo. The Society of Family Planning (2025) says clinicians should offer to discuss contraception before treatment with everyone who is pregnancy-capable, says emergency contraception is safe, recommends nonhormonal contraception first line after breast cancer (GRADE 1B), says oestrogen-containing methods should be avoided with oestrogen-blocking therapy (best practice), and supports access to all methods for most other cancers. US MEC 2024 lists breast cancer among conditions in which pregnancy carries added risk. ASCO 2025 says fertility preservation should be discussed before treatment. The ESMO 2020 fertility and pregnancy guideline could not be read.",
  asOf: "2026-11-17",
  setting: {
    who: ["patient-or-carer", "doctor", "nurse"],
    where: ["home", "outpatient-clinic"],
  },
  population: "People having chemotherapy who are sexually active and could become pregnant or make a partner pregnant, and their partners. Advice differs for people with breast cancer and some other hormone-sensitive cancers, and for people after high-dose chemotherapy or a stem cell transplant; those differences are named in the steps and variants.",
  trigger: "Before chemotherapy starts.",
  steps: [
    {
      action: "Before treatment, talk with the team about contraception, pregnancy and fertility, including storing eggs or sperm",
      why: "The Society of Family Planning says clinicians should offer this talk before treatment. ASCO says fertility preservation should be discussed before treatment, and the NHS suggests asking about storing eggs or sperm.",
      source: "sfp-2025-part1",
      quote: "No test reliably rules out pregnancy potential in cancer survivors; clinicians should offer to discuss contraception with individuals who are pregnancy-capable before cancer treatment.",
      grade: "Committee statement (Society of Family Planning); not graded in the abstract",
    },
    {
      action: "Use contraception during treatment if you could get pregnant or get a partner pregnant, and afterwards for as long as the team advises",
      why: "The NHS says chemotherapy medicines can be very harmful for an unborn baby. Macmillan adds that contraception is needed for a time after treatment, and that a pregnancy may still start even if fertility is likely to be damaged.",
      source: "nhs-chemotherapy",
      quote: "It's important to use contraception during treatment if you could get pregnant or you could get your partner pregnant.",
      grade: "Not graded (patient information)",
    },
    {
      action: "Ask which method is best; barrier methods such as condoms or a cap are usually advised during treatment",
      why: "Macmillan says barrier methods are usually best. Cancer Research UK says hormone-based contraceptives might not be safe for someone with a hormone dependent cancer or a risk of blood clots, so the choice depends on the cancer type and medical history.",
      source: "macmillan-chemo-side-effects",
      quote: "During treatment, it is usually best to use barrier methods of contraception, such as condoms or the cap (diaphragms). Ask your cancer doctor or specialist nurse which type is best for you to use.",
      grade: "Not graded (patient information)",
    },
    {
      action: "After breast cancer, choose a nonhormonal method first, and avoid oestrogen-containing contraception while taking oestrogen-blocking therapy",
      why: "US MEC 2024 describes breast cancer as a hormonally sensitive tumour. The Society of Family Planning recommends nonhormonal methods first line after breast cancer, and says in a separate sentence that anyone treated with oestrogen-blocking therapy should avoid oestrogen-containing contraceptives.",
      source: "sfp-2025-part2",
      quote: "For individuals with a history of breast cancer, we recommend nonhormonal contraceptives as the first-line option (GRADE 1B); additional guidance is provided for hormonal contraception depending on breast cancer hormone receptor status.",
      grade: "GRADE 1B (nonhormonal first line after breast cancer); Best Practice (avoid oestrogen with oestrogen-blocking therapy, a separate statement not limited to breast cancer)",
    },
    {
      action: "If the team advises it, use a condom for vaginal or anal sex, and a condom or dental dam for oral sex, for a few days after certain drugs",
      why: "Macmillan says small amounts of chemotherapy can get into body fluids, including vaginal fluid and the fluid that contains sperm, and a barrier protects a partner. Cancer Research UK says this is not known for sure and gives about a week after treatment.",
      source: "macmillan-chemo-side-effects",
      quote: "To protect partners, your cancer doctor may advise that for a few days after certain drugs you use a condom for vaginal or anal sex and a condom (or a latex barrier such as a dental dam) for oral sex.",
      grade: "Not graded (patient information)",
    },
    {
      action: "Ask the team whether it is okay for you to have sex during treatment",
      why: "NCI says most women and most men can have sex during chemotherapy, but that it is a good idea to ask.",
      source: "nci-chemo-and-you",
      quote: "Ask your doctor or nurse if it is okay for you to have sex during chemotherapy.",
      grade: "Not graded (patient booklet)",
    },
    {
      action: "Use emergency contraception if you need it; it is safe for people with cancer",
      why: "The Society of Family Planning says clinicians should tell people with cancer that emergency contraception is safe for them.",
      source: "sfp-2025-part1",
      quote: "Clinicians should counsel individuals with cancer that it is safe for them to use emergency contraception.",
      grade: "Committee statement (Society of Family Planning); not graded in the abstract",
    },
    {
      action: "Tell the team straight away if you are, or might be, pregnant",
      why: "The team will explain the possible risks and benefits and the options, which depend on the cancer, the drugs and the stage of pregnancy.",
      source: "macmillan-chemo-side-effects",
      quote: "If you know you are pregnant before starting treatment, or become pregnant during treatment, tell your cancer doctor or nurse straight away.",
      grade: "Not graded (patient information)",
    },
    {
      action: "Do not breastfeed during chemotherapy",
      why: "The drugs could be passed to a baby through breast milk.",
      source: "macmillan-chemo-side-effects",
      quote: "Breastfeeding during chemotherapy is not advised.",
      grade: "Not graded (patient information)",
    },
    {
      action: "For vaginal dryness, use a water-based lubricant, and ask about other treatments if sex is still painful",
      why: "NCI says chemotherapy may damage the ovaries and change hormone levels, which can lead to vaginal dryness.",
      source: "nci-chemo-and-you",
      quote: "If sex is still painful because of dryness, ask your doctor or nurse about medications to help restore moisture in your vagina.",
      grade: "Not graded (patient booklet)",
    },
  ],
  bestInClass: {
    statement: "Contraception during chemotherapy for anyone who could get pregnant or make a partner pregnant is stated by every patient source read (NHS 2025, NCI 2024, Macmillan 2018, Cancer Research UK 2024), and the Society of Family Planning 2025 says pregnancy prevention is generally recommended during cancer treatment. Its series is the most recent specialist guidance: offer to discuss contraception before treatment with everyone pregnancy-capable, emergency contraception is safe, nonhormonal methods first after breast cancer (GRADE 1B), no oestrogen with oestrogen-blocking therapy (best practice), and access to all methods for most other cancers. How long to continue after treatment is not agreed: NCI tells women a year, Macmillan says 'for a time after', Cancer Research UK says it depends on the chemotherapy, and FDA guidance for US drug labels gives a rule by sex and by type of drug (see the variants). The figure for a given drug is on its label, which the team reads.",
    sources: ["sfp-2025-part1", "sfp-2025-part2", "sfp-2025-part3", "nhs-chemotherapy", "nci-chemo-and-you", "macmillan-chemo-side-effects", "cruk-sex-and-chemotherapy", "fda-repro-labelling-2019"],
  },
  variants: [
    {
      name: "A year of pregnancy prevention for women, possibly with two methods (NCI)",
      differs: "Tells women to prevent pregnancy during chemotherapy and for a year afterwards, and says the doctor or nurse may suggest two forms of birth control. For men the booklet speaks only of the time on treatment.",
      evidence: "NCI booklet (US), not graded, in its section for women: 'It is very important to prevent pregnancy while having chemotherapy and for a year afterwards.' The UK patient pages leave the period to the drug and the team.",
      sources: ["nci-chemo-and-you"],
    },
    {
      name: "Length of contraception after treatment by sex and type of drug (FDA guidance for US labels)",
      differs: "For genotoxic drugs, recommends contraception after the end of treatment for five half-lives of the drug plus 6 months for women and five half-lives plus 3 months for men. For nongenotoxic drugs that cause malformations or loss of the embryo, five half-lives for women and, for men, five half-lives for small molecules and none for biological products; where five half-lives is less than 1 week, a minimum of 1 week. No period is needed for a nongenotoxic drug that does neither.",
      evidence: "FDA guidance for industry, May 2019, Tables 1 and 2. It is nonbinding advice to companies on what a US label should say, not advice written for patients, and it allows a different period where justified, so the label of the drug in use decides. It is not graded.",
      sources: ["fda-repro-labelling-2019"],
    },
    {
      name: "Barrier method throughout treatment and for about a week afterwards (Cancer Research UK)",
      differs: "Says some doctors advise a barrier method (condoms, femidoms or dental dams) for vaginal, anal or oral sex during treatment, generally needed only during treatment and for about a week afterwards, where Macmillan says a few days after certain drugs.",
      evidence: "Patient information, not graded. Cancer Research UK says it is not known for sure whether chemotherapy drugs can be passed on through semen or secretions from the vagina; Macmillan says small amounts can get into body fluids.",
      sources: ["cruk-sex-and-chemotherapy", "macmillan-chemo-side-effects"],
    },
    {
      name: "Hormonal and intrauterine methods for most cancers other than breast (Society of Family Planning)",
      differs: "Supports access to all contraceptive methods for most other cancers. It suggests or recommends shared decision-making with the oncologist before hormonal contraception for hormonally sensitive ovarian tumours (such as adult granulosa cell tumours and low-grade serous and endometrioid adenocarcinomas), melanoma, meningioma and follicular lymphoma, puts nonhormonal and progestogen-only methods first with severely altered liver function after liver cancer, and suggests against placing an IUD with active cervical cancer.",
      evidence: "Society of Family Planning 2025 parts 2 and 3: GRADE 1B to 2C depending on the cancer, as printed in the abstracts.",
      sources: ["sfp-2025-part2", "sfp-2025-part3"],
    },
    {
      name: "Avoiding close contact after high-dose chemotherapy or stem cell transplant (Macmillan)",
      differs: "After high-dose chemotherapy or a stem cell transplant, the doctor may advise no close physical contact with anyone for a while, to protect the patient from infection.",
      evidence: "Patient information, not graded.",
      sources: ["macmillan-chemo-side-effects"],
    },
  ],
  grades: [
    { claim: "Nonhormonal contraception first line after breast cancer", grade: "GRADE 1B", source: "sfp-2025-part2", quote: "For individuals with a history of breast cancer, we recommend nonhormonal contraceptives as the first-line option (GRADE 1B); additional guidance is provided for hormonal contraception depending on breast cancer hormone receptor status." },
    { claim: "No oestrogen-containing contraception with oestrogen-blocking therapy", grade: "Best Practice", source: "sfp-2025-part2", quote: "Estrogen-containing contraceptives should be avoided by individuals treated with estrogen-blocking therapy (Best Practice)." },
    { claim: "Access to all methods after colorectal, pancreatic, oesophageal and gastric cancer", grade: "GRADE 1C", source: "sfp-2025-part3", quote: "For individuals with a history of colorectal, pancreatic, esophageal, and gastric cancer, we recommend clinicians provide access to all available contraceptive methods (GRADE 1C)." },
    { claim: "Breast cancer is hormonally sensitive; concern about progression might be less with an LNG-IUD than with combined or higher-dose progestogen methods", grade: "US MEC 2024 classification comment", source: "us-mec-2024", quote: "Breast cancer is a hormonally sensitive tumor. Concerns about progression of the disease might be less with LNG-IUDs than with COCs or higher-dose POCs." },
    { claim: "Fertility preservation discussed before treatment", grade: "ASCO guideline recommendation (strength not shown in the abstract)", source: "asco-fp-2025", quote: "FP approaches should be discussed before cancer-directed therapy." },
    { claim: "Women: 6 months of contraception (plus five half-lives) after a genotoxic drug", grade: "Not graded (nonbinding FDA guidance for industry)", source: "fda-repro-labelling-2019", quote: "The 6-month contraception labeling recommendation for genotoxic pharmaceuticals after cessation of therapy (see Table 1) covers the growth and maturation phase of folliculogenesis and is expected to allow elimination of most damaged follicles and oocytes." },
    { claim: "Men: 3 months of contraception (plus five half-lives) after a genotoxic drug", grade: "Not graded (nonbinding FDA guidance for industry)", source: "fda-repro-labelling-2019", quote: "The 3 months cover the period of spermatogenesis and the epididymal maturation." },
    { claim: "Five half-lives of contraception after a nongenotoxic drug that can harm an embryo", grade: "Not graded (nonbinding FDA guidance for industry)", source: "fda-repro-labelling-2019", quote: "For nongenotoxic pharmaceuticals causing teratogenicity or embryo-fetal lethality, FDA recommends a contraception period of 5 half-lives after completion of therapy." },
    { claim: "Barrier method during treatment and for about a week afterwards", grade: "Not graded (patient information)", source: "cruk-sex-and-chemotherapy", quote: "Generally, you only need a barrier method when you are having treatment and for about a week afterwards." },
  ],
  sources: [
    {
      key: "macmillan-chemo-side-effects",
      label: "Side effects of chemotherapy",
      publisher: "Macmillan Cancer Support",
      year: 2018,
      url: "https://www.macmillan.org.uk/cancer-information-and-support/treatment/types-of-treatment/chemotherapy/side-effects-of-chemotherapy",
      gradingScheme: "Patient information page; not graded. Reviewed 30 September 2018, page marked as being reviewed.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "nhs-chemotherapy",
      label: "Chemotherapy",
      publisher: "NHS",
      year: 2025,
      url: "https://www.nhs.uk/tests-and-treatments/chemotherapy/",
      gradingScheme: "Patient information page; not graded. Reviewed 14 February 2025.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "nci-chemo-and-you",
      label: "Chemotherapy and You: Support for People with Cancer",
      publisher: "National Cancer Institute (US)",
      year: 2024,
      url: "https://www.cancer.gov/publications/patient-education/chemotherapy-and-you.pdf",
      gradingScheme: "Patient booklet; recommendations are not graded. Printed date January 2024 (NIH Publication No. 24-7157).",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "cruk-sex-and-chemotherapy",
      label: "Sex and chemotherapy",
      publisher: "Cancer Research UK",
      year: 2024,
      url: "https://www.cancerresearchuk.org/about-cancer/treatment/chemotherapy/sex",
      gradingScheme: "Patient information page; not graded. Reviewed 23 May 2024.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "fda-repro-labelling-2019",
      label: "Oncology Pharmaceuticals: Reproductive Toxicity Testing and Labeling Recommendations. Guidance for Industry",
      publisher: "US Food and Drug Administration (Center for Drug Evaluation and Research)",
      year: 2019,
      url: "https://www.fda.gov/media/124829/download",
      gradingScheme: "Guidance for industry, May 2019; nonbinding recommendations on what a US drug label should say. Not graded.",
      read: "full-text",
      accessed: "2026-11-17",
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
      accessed: "2026-11-17",
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
      accessed: "2026-11-17",
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
      accessed: "2026-11-17",
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
      accessed: "2026-11-17",
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
      accessed: "2026-11-17",
    },
    {
      key: "esmo-fertility-2020",
      label: "Fertility preservation and post-treatment pregnancies in post-pubertal cancer patients: ESMO Clinical Practice Guidelines",
      publisher: "ESMO (Annals of Oncology)",
      year: 2020,
      url: "https://doi.org/10.1016/j.annonc.2020.09.006",
      doi: "10.1016/j.annonc.2020.09.006",
      read: "not-reachable",
      accessed: "2026-11-17",
    },
  ],
  terms: ["cancer-in-pregnancy"],
  technologies: ["fertility-preservation"],
  related: ["idea-acc-default-fertility-preservation-referral", "oral-anticancer-medicines-at-home"],
  gaps: [
    "How long to continue contraception after treatment depends on each drug's label. The sources give a year for women (NCI), 'a time' (Macmillan) and a rule by sex and type of drug for US labels (FDA 2019); no source read here gives drug-by-drug periods, and no UK or European regulator's rule was read. On 17 November 2026 the FDA guidance was read from the FDA's own PDF, and no check was made for a later revision.",
    "Whether chemotherapy drugs reach semen or vaginal fluid is stated differently: Macmillan says small amounts can, Cancer Research UK says it is not known for sure. The length of barrier use also differs, a few days after certain drugs (Macmillan) against about a week after treatment (Cancer Research UK), and neither page names the drugs.",
    "The first version of this page told people to ask about sex especially when blood counts are low, because of bleeding and infection. On 17 November 2026 no source read here said that, so it was taken out; the booklet says only to ask the team.",
    "The Society of Family Planning's sentence on avoiding oestrogen-containing contraceptives with oestrogen-blocking therapy sits among the ovarian cancer recommendations in the abstract and is not limited to one cancer; the full text, which would show how it applies after breast cancer, was not read.",
    "On 17 November 2026 the ESMO 2020 guideline on fertility preservation and pregnancy after treatment still could not be read (the journal page returned 403 and Europe PMC holds no abstract). Europe PMC and Crossref show no later edition.",
    "The Society of Family Planning 2025 series and the ASCO 2025 fertility guideline were read as abstracts only. Europe PMC lists two errata to the ASCO guideline (May and August 2025), which were not read.",
    "Macmillan's chemotherapy side effects page was last reviewed in 2018 and is marked as being reviewed.",
    "Advice for trans and non-binary people, and for same-sex partners, is not addressed in the patient sources; the Society of Family Planning abstract says only that gender-diverse individuals need a person-centred approach.",
  ],
});
