import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Lesotho: the regulator and papers behind /countries/ls/ (wave 15) that the corpus did not hold. The corpus already
 * has the Ministry of Health (`lesotho-ministry-of-health`), the Senkatana Oncology Clinic (`senkatana-oncology-clinic`)
 * and the Action Against Cancer Association (`action-against-cancer-lesotho`), in
 * src/data/institutions/countries-2026-11-east-southern-africa.ts; those are linked here, not repeated.
 *
 * Sources, read raw on 16 November 2026: the Botswana Medicines Regulatory Authority's page on the Lesotho health
 * minister's visit (June 2026), The Reporter (27 March 2026), Newsday (4 September 2023), WHO's Country Planning Cycle
 * Database, WHO's list of regulators at maturity level 3 and 4 (August 2026) and the African Union's list of
 * ratifications of the African Medicines Agency treaty (19 September 2023). DOIs were resolved through Europe PMC, or
 * through Crossref for the South African Journal of Oncology paper, and the figures in `findings` are from the indexed
 * abstracts.
 *
 * Inbound links: the papers link one another and the regulator through `related`. The existing records
 * `lesotho-ministry-of-health` and `senkatana-oncology-clinic` should gain links to these (see the wave report).
 * The regulator's coordinates are an approximate Maseru city point, not a building position.
 */
const asOf = "2026-11-16";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const BOMRA = "https://www.bomra.co.bw/lesotho-health-minister-leads-delegation-on-benchmarking-visit-to-bomra/";
const REPORTER_2026 = "https://www.thereporter.co.ls/2026/03/27/health-ministry-gets-m5m-for-drug-authority-offices/";
const NEWSDAY_2023 = "https://newsdayonline.co.ls/ministry-acknowledges-oversight-in-new-medicines-law/";
const WHO_CPCD = "https://extranet.who.int/cpcd/health-legislation/countries/les/thematic-highlights";
const WHO_ML3 = "https://cdn.who.int/media/docs/default-source/medicines/regulatory-systems/wla/list-of-nras-operating-at-ml3-and-ml4.pdf";
const AMA = "https://au.int/sites/default/files/treaties/36892-sl-TREATY_FOR_THE_ESTABLISHMENT_OF_THE_AFRICAN_MEDICINES_AGENCY.pdf";

const P_BARRIERS = "paper-ramathebane-barriers-cancer-services-lesotho-sajo-2024";
const P_TCM = "paper-sooro-traditional-medicine-senkatana-bmccmt-2024";
const P_HPV = "paper-zbelo-routine-hpv-vaccination-lesotho-bmjph-2026";
const P_DHS = "paper-wassie-cervical-screening-lesotho-dhs-bmcph-2025";
const P_COST = "paper-sefuthi-patient-costs-cervical-screening-lesotho-fph-2026";

const institutions: InstitutionInput[] = [
  i({ id: "lesotho-medicines-regulatory-authority", name: "Lesotho Medicines Regulatory Authority (LeMeRA)", aka: ["LeMeRA", "LeMERA", "Lesotho Medicines and Medical Devices Control Authority"],
    city: "Maseru", country: "LS", lat: -29.31, lng: 27.478, institutionType: "government",
    tldr: "The medicines regulator that Lesotho's parliament created by an Act of 2023. Reports in 2026 describe it as still being set up, and The Reporter quoted the health minister saying medicines were entering the country unregistered.",
    summary: "Parliament enacted the Lesotho Medicines and Medical Devices Control Authority Act, 2023 (Act No. 6 of 2023), to create a national authority to register and control medicines and medical devices. Botswana's medicines regulator, which hosted a Lesotho delegation in June 2026, reported the health minister as saying the visit was part of efforts to establish the Lesotho Medicines Regulatory Authority and that the authority was progressing towards operationalisation. The Reporter wrote on 27 March 2026 that the National Assembly had approved M5 million for the Ministry of Health to build the authority's offices in the 2026/27 financial year, and quoted the minister as saying that medicines were entering the country unregistered with no fees paid and that the authority would employ pharmacists to oversee registration. Newsday reported on 4 September 2023 that the Act had recently been gazetted and that regulations under it were still to be made.\n\nBefore the Act, WHO's Country Planning Cycle Database records Lesotho's national health strategic plan for 2018/19 to 2022/23 as saying that slow enactment of the bill had left the country without a medicines regulatory authority. WHO's August 2026 list of regulators operating at maturity level 3 or 4 does not include Lesotho. The African Union's list dated 19 September 2023 gives 17 August 2022 as the date Lesotho ratified or acceded to the African Medicines Agency treaty. OnCo has not read the Act itself: the Government Gazette page refused a script. The coordinates are an approximate city point for Maseru.",
    programs: ["Registration and control of medicines and medical devices (under Act No. 6 of 2023; described in June 2026 as progressing towards operationalisation)"],
    institutions: ["lesotho-ministry-of-health", "who"],
    links: [
      { label: "Botswana Medicines Regulatory Authority: Lesotho health minister leads benchmarking visit (June 2026)", url: BOMRA },
      { label: "The Reporter: health ministry gets M5m for drug authority offices (27 March 2026)", url: REPORTER_2026 },
      { label: "Newsday: ministry acknowledges oversight in new medicines law (4 September 2023)", url: NEWSDAY_2023 },
      { label: "WHO Country Planning Cycle Database: Lesotho, health legislation highlights", url: WHO_CPCD },
      { label: "WHO: regulators operating at maturity level 3 and 4 (August 2026, PDF)", url: WHO_ML3 },
      { label: "African Union: signatures and ratifications of the African Medicines Agency treaty (19 September 2023, PDF)", url: AMA },
    ] }),
];

const papers: PaperInput[] = [
  p({ id: P_BARRIERS, name: "Barriers to cancer services reported by patients at the Senkatana oncology clinic, Lesotho",
    journal: "South African Journal of Oncology", year: 2024, doi: "10.4102/sajo.v8i0.291", authors: "Ramathebane MM, Sooro MA, Maja LJ, et al.", paperType: "observational", participants: 115,
    tldr: "A survey of 115 people with cancer at Lesotho's oncology clinic found that most faced practical and money barriers: services spread across several facilities, long queues, distance, and the cost of transport and tests.",
    summary: "Published as \"Quantitative exploration of barriers to access cancer services experienced by cancer patients in Lesotho\". A quantitative cross-sectional study at the Senkatana oncology clinic in Maseru, in which patients were interviewed with a structured questionnaire. Most of the authors are at the National University of Lesotho. The paper is indexed by Crossref, where its abstract was read; it was not found in Europe PMC.",
    findings: [
      "115 patients responded, 79.1% of them women.",
      "53.9% found it difficult to access cancer services because they had to use several health facilities in different areas, and all had to join long queues.",
      "Distance from health facilities was a challenge for 64.3%, and 66.1% had difficulty arranging transport; paying for transport, health care and diagnostic tests was a major constraint.",
    ],
    whatItMeans: "With one oncology clinic in the capital, the cost of cancer care in Lesotho falls on patients as travel, time and tests, and most heavily on people who do not live in Maseru.",
    caveats: ["One clinic and 115 patients; people who never reached the clinic are not counted.", "The abstract does not give the survey dates."],
    institutions: ["senkatana-oncology-clinic", "lesotho-ministry-of-health"], related: [P_TCM, P_COST],
    links: [doi("10.4102/sajo.v8i0.291", "S Afr J Oncol 2024")] }),

  p({ id: P_TCM, name: "Use of traditional and complementary medicine by cancer patients at the Senkatana oncology clinic, Lesotho",
    journal: "BMC Complementary Medicine and Therapies", year: 2024, doi: "10.1186/s12906-024-04388-3", pmid: "38561693", authors: "Sooro MA, Thoahlane TS, Ramathebane MV, Mputsoe KA.", paperType: "observational", participants: 50,
    tldr: "All 50 cancer patients interviewed at Lesotho's oncology clinic in 2023 said they used traditional or complementary medicine, nearly all of them alongside their hospital treatment and without telling their oncologist.",
    summary: "Published as \"A preliminary, quantitative study on the use of traditional and complementary medicine by cancer patients seen at the Senkatana oncology clinic, Maseru, Lesotho\". A cross-sectional study in May and June 2023 using structured interviews, by the Department of Pharmacy of the National University of Lesotho with the Senkatana Oncology Clinic. Patients were aged 14 to 82; the commonest cancer among the men was prostate cancer and among the women cervical cancer.",
    findings: [
      "All 50 patients interviewed (24 women and 26 men) reported using traditional or complementary medicine.",
      "66% said they wanted to try everything that could help, and 94% used complementary medicine during the same period as conventional treatment.",
      "Patients said they did not tell their oncologist, because they had been advised not to use other medicines besides those given at the clinic.",
    ],
    whatItMeans: "In this small sample every patient was using other remedies alongside clinic treatment, and the clinic was not told. The authors note that when use is not disclosed, the effects of these medicines on patients cannot be ascertained.",
    caveats: ["A preliminary study of 50 patients at one clinic.", "It records use, not whether any remedy helped or harmed."],
    institutions: ["senkatana-oncology-clinic"], related: [P_BARRIERS, "lesotho-medicines-regulatory-authority"],
    links: [doi("10.1186/s12906-024-04388-3", "BMC Complement Med Ther 2024"), pubmed("38561693")] }),

  p({ id: P_HPV, name: "HPV vaccination coverage and dropout between doses in Lesotho, 2024 national survey",
    journal: "BMJ Public Health", year: 2026, doi: "10.1136/bmjph-2025-003889", pmid: "41919196", authors: "Zbelo M, Chakauya JM, Maepe SA, et al.", paperType: "observational", participants: 279,
    tldr: "A national survey in Lesotho in 2024 found that 85% of eligible girls had received a first dose of the HPV vaccine, which protects against cervical cancer, and 52.9% a second dose. Girls out of school were less likely to complete.",
    summary: "Published as \"Beyond campaigns: a national mixed-methods study on advancing routine HPV vaccination in Lesotho\". A nationally representative survey in 2024 visited 5,111 households and identified 279 eligible girls aged 9 to 17, with 15 key informant interviews in Butha-Buthe and Quthing. The authors are from WHO's office in Lesotho, the Ministry of Health and partners. Lesotho had delivered the vaccine through school-based campaigns.",
    findings: [
      "First-dose coverage was 85% and second-dose coverage 52.9%, a dropout of 32%.",
      "Girls in school had higher completion than girls out of school; caregiver education and trust in health workers predicted uptake.",
      "43% of vaccinated girls could show a vaccination card.",
    ],
    whatItMeans: "Acceptance of the vaccine is high, and the gap is in reaching girls who are not in school and in record keeping. The authors suggest moving to routine delivery in primary care and the single-dose schedule WHO recommends.",
    caveats: ["279 eligible girls; 43% of vaccinated girls could show a card, and the abstract does not say how vaccination was confirmed for the rest.", "These survey figures differ from WHO's administrative coverage figures for the same years."],
    institutions: ["lesotho-ministry-of-health", "who"], cancers: ["cervical"], related: [P_DHS],
    links: [doi("10.1136/bmjph-2025-003889", "BMJ Public Health 2026"), pubmed("41919196")] }),

  p({ id: P_DHS, name: "Cervical cancer screening uptake in Lesotho in the 2024 Demographic and Health Survey",
    journal: "BMC Public Health", year: 2025, doi: "10.1186/s12889-025-23593-4", pmid: "40615793", authors: "Wassie M, Zegeye AF, Zeleke GA, et al.", paperType: "observational", participants: 3250,
    tldr: "In Lesotho's 2024 national health survey, 38.9% of 3,250 women of reproductive age had been screened for cervical cancer. Screening was more common in women aged 20 and over, with schooling and with more exposure to media.",
    summary: "Published as \"Determinants of cervical cancer screening uptake in Lesotho: evidence from 2024 Demographic and Health Survey data\". A secondary analysis of the 2024 Lesotho Demographic and Health Survey using a multilevel logistic regression model, by authors at the University of Gondar in Ethiopia.",
    findings: [
      "38.90% of the 3,250 women had been screened (95% CI 37.20 to 40.60).",
      "Women aged 20 to 49 had higher odds of screening than those aged 15 to 19, and women with primary or secondary education higher odds than women with no formal education.",
      "Women in communities with high media exposure were more likely to be screened (adjusted odds ratio 1.56, 95% CI 1.05 to 2.33).",
    ],
    whatItMeans: "About four in ten women of reproductive age in Lesotho report having been screened, in the country where cervical cancer is estimated to be the commonest cancer.",
    caveats: ["Self-reported screening in a household survey.", "The education estimates have very wide confidence intervals."],
    institutions: ["lesotho-ministry-of-health"], cancers: ["cervical"], related: [P_HPV, P_COST],
    links: [doi("10.1186/s12889-025-23593-4", "BMC Public Health 2025"), pubmed("40615793")] }),

  p({ id: P_COST, name: "What cervical cancer screening costs patients at the Senkatana centre, Lesotho",
    journal: "Frontiers in Public Health", year: 2026, doi: "10.3389/fpubh.2026.1888325", pmid: "42952594", authors: "Sefuthi T, Van Schalkwyk C, Nkonki L.", paperType: "observational", participants: 100,
    tldr: "A 2025 survey of 100 women screened for cervical cancer in Maseru found the average visit cost the patient about 21 international dollars, almost all of it in indirect costs and lost productivity, and that results took a month on average.",
    summary: "Published as \"A patient costing analysis of Lesotho's cervical cancer screening program\". Women using screening services at the Senkatana Cervical Cancer Center of Excellence between January and November 2025 were asked about direct, indirect and productivity costs to themselves and their caregivers. Costs were converted to international dollars using 2024 purchasing power parity. The authors are at Stellenbosch University.",
    findings: [
      "46% were screened with a Pap smear, 44% with HPV DNA testing and 9% with visual inspection with acetic acid; 3% received loop excision treatment.",
      "91% had to return to collect results, with a mean turnaround of 32.4 days.",
      "Mean total cost per patient per visit was $21.4 (95% CI 17.42 to 25.98): indirect costs 52%, productivity costs 44%, direct medical costs 4%.",
      "Across screening and treatment the estimated cost was $62.3 for the Pap smear route, $61.7 for HPV testing and $41.2 for visual inspection, about 17%, 17% and 11% of average monthly income.",
    ],
    whatItMeans: "Medical fees were a small part of what screening cost these women (4%); the rest was indirect costs and lost productivity, and nine in ten had to make a second trip for results. The authors argue that patient costs belong in screening policy and economic evaluations.",
    caveats: ["100 women at one centre in the capital.", "Costs for the full screening-to-treatment route are extrapolated; 3% of the women had treatment.", "The abstract names the Senkatana Cervical Cancer Center of Excellence. It is linked here to the Senkatana Oncology Clinic record because both are at Senkatana in Maseru; OnCo has not confirmed that they are one unit."],
    institutions: ["senkatana-oncology-clinic"], cancers: ["cervical"], related: [P_DHS, P_BARRIERS],
    links: [doi("10.3389/fpubh.2026.1888325", "Front Public Health 2026"), pubmed("42952594")] }),
];

/** Records behind /countries/ls/ (wave 15). */
export const recordsLS: EntityInput[] = [...institutions, ...papers];
