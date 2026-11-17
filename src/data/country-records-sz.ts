import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Eswatini: the oncology unit and papers behind /countries/sz/ (wave 15) that the corpus did not hold. The corpus
 * already has the Ministry of Health (`eswatini-ministry-of-health`), the Eswatini National Cancer Registry
 * (`eswatini-national-cancer-registry`) and Mbabane Government Hospital (`mbabane-government-hospital`), in
 * src/data/institutions/countries-2026-11-east-southern-africa.ts; those are linked here, not repeated.
 *
 * Sources, read raw on 16 November 2026: the Ministry of Health's National Cancer Control Strategic Plan 2025 to 2029,
 * its cervical cancer elimination acceleration plan and a Ministry presentation of 17 July 2024 (PDF text on the ICCP
 * portal), the IAEA's country fact sheet, and Applied Radiation Oncology's report of 2 January 2025. DOIs were resolved
 * through Europe PMC and the figures in `findings` are from the indexed abstracts.
 *
 * Inbound links: the oncology unit lists the papers in keyPapers and the survival paper lists the unit in `related`.
 * The existing records `eswatini-ministry-of-health`, `eswatini-national-cancer-registry` and
 * `mbabane-government-hospital` should gain links to these (see the wave report). The unit's coordinates are an
 * approximate Manzini city point, not a building position.
 */
const asOf = "2026-11-16";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const PLAN_2025 = "https://www.iccp-portal.org/sites/default/files/2026-03/Final%20NCCU%20Strategic%20Plan%20Document.pdf";
const CX_PLAN = "https://www.iccp-portal.org/sites/default/files/2025-07/Eswatini%20Cervical%20Cancer%20Elimination%20Acceleration%20Plan%202025-2030.pdf";
const ECHO_2024 = "https://www.iccp-portal.org/sites/default/files/resources/ICCP%20ECHO%202024%20session%207%20slides%20-%20presentation%20Eswatini.pdf";
const IAEA_TC = "https://www.iaea.org/sites/default/files/25/02/tc-eswatini.pdf";
const ARO_2025 = "https://www.appliedradiationoncology.com/news/eswatini-working-to-finalize-the-country-s-first-radiotherapy-center";

const P_SURVIVAL = "paper-msibi-cervical-cancer-survival-eswatini-pgph-2026";
const P_EARLY = "paper-vilakati-early-onset-cervical-cancer-eswatini-canep-2026";
const P_HPV = "paper-maseko-hpv-vaccine-introduction-eswatini-apjcp-2025";
const P_CX_COST = "paper-ngcamphalala-economic-burden-cervical-cancer-eswatini-plosone-2021";
const P_PR_COST = "paper-ngcamphalala-economic-burden-prostate-cancer-eswatini-bmchsr-2022";

const institutions: InstitutionInput[] = [
  i({ id: "manzini-oncology-unit", name: "Manzini Oncology Unit", aka: ["Manzini Hospital Oncology Unit", "Oncology unit, Manzini Government Hospital"],
    city: "Manzini", country: "SZ", lat: -26.49, lng: 31.37, institutionType: "hospital",
    tldr: "A public oncology unit in Manzini, Eswatini, established in 2022 with a 60-bed ward and an outpatient clinic, where chemotherapy is given. The Ministry of Health has identified the same hospital as the site for the country's first radiotherapy unit.",
    summary: "The Ministry of Health's National Cancer Control Strategic Plan 2025 to 2029 says cancer treatment capacity grew with the establishment of the Manzini Oncology Unit in 2022, and lists a 60-bed oncology ward and outpatient clinic at Manzini, with chemotherapy also available at Mbabane Hospital. A Ministry presentation of 17 July 2024 lists \"Manzini Hospital - Oncology Unit\" as a 2022 milestone, and Applied Radiation Oncology's report of 2 January 2025 on the IAEA-led review of August 2024 describes a 60-bed chemotherapy unit operating at Manzini Government Hospital.\n\nThe plan says the site for the country's first radiotherapy unit has been identified at Manzini Hospital, with 1 million US dollars allocated in the 2024 budget for initial works, and recommends a roadmap for children's cancer services there. The cervical cancer elimination acceleration plan describes the planned national radiotherapy centre as having two linear accelerators and one brachytherapy unit. Neither document gives an opening date, and no radiotherapy was available in Eswatini when these sources were written. The coordinates are an approximate city point for Manzini.",
    programs: ["Oncology ward (60 beds) and outpatient clinic (from 2022)", "Chemotherapy", "Site identified for the planned first radiotherapy unit"],
    institutions: ["eswatini-ministry-of-health", "mbabane-government-hospital", "eswatini-national-cancer-registry", "iaea"],
    keyPapers: [P_SURVIVAL, P_EARLY, P_HPV, P_CX_COST, P_PR_COST],
    links: [
      { label: "Ministry of Health, Eswatini: National Cancer Control Strategic Plan 2025 to 2029 (PDF, ICCP portal)", url: PLAN_2025 },
      { label: "Ministry of Health, Eswatini: use of data for monitoring the national cancer plan (ICCP ECHO slides, 17 July 2024, PDF)", url: ECHO_2024 },
      { label: "Kingdom of Eswatini: cervical cancer elimination acceleration plan (PDF, ICCP portal)", url: CX_PLAN },
      { label: "Applied Radiation Oncology: Eswatini working to finalize the country's first radiotherapy center (2 January 2025)", url: ARO_2025 },
      { label: "IAEA: Eswatini technical cooperation fact sheet (PDF)", url: IAEA_TC },
    ] }),
];

const papers: PaperInput[] = [
  p({ id: P_SURVIVAL, name: "Survival of women with cervical cancer in the Eswatini cancer registry, 2016 to 2024",
    journal: "PLOS Global Public Health", year: 2026, doi: "10.1371/journal.pgph.0006309", pmid: "41990049", authors: "Msibi SS, Lopez C, Khumalo FN, Su LJ.", paperType: "observational", participants: 2349,
    tldr: "Among 2,349 women with cervical cancer in Eswatini's registry from 2016 to 2024, 59% did not receive any treatment. Stage at diagnosis and whether a woman was treated were the strongest predictors of survival.",
    summary: "Published as \"Predictors of survival among cervical cancer patients in Swaziland (Eswatini): A population-based analysis in a resource-limited setting (2016-2024)\". The authors screened the Eswatini cancer registry for 2016 to 2024, found 2,349 women with cervical cancer, and analysed 603 deaths with a Cox proportional hazards model, adjusting for age, smoking, HIV status, treatment and basis of diagnosis. They describe it as the first survival analysis of cervical cancer in Eswatini.",
    findings: [
      "44.27% of the women were aged 50 or older at diagnosis, 31.42% were 40 to 49 and 24.31% were 39 or younger.",
      "59.05% did not receive any treatment.",
      "In this registry group (2016 to 2024), median survival was about 40 months for women diagnosed at stage 1 and about 10 months at stage 4. A median is the middle of a group: half lived longer. The abstract does not say whether the medians describe all 2,349 women or the 603 whose deaths were analysed.",
      "Treatment (chemotherapy, radiation or surgery) reduced the hazard of death by 30% (hazard ratio 0.70, 95% CI 0.59 to 0.84).",
    ],
    whatItMeans: "The registry now holds enough years of data to show where the losses are: late diagnosis and no treatment. Both are things screening, referral and a radiotherapy service inside the country are meant to change.",
    caveats: ["Registry data, in a country where the Ministry of Health says cancer is not legally notifiable and private-sector reporting is limited.", "The abstract reports 603 deaths analysed; follow-up of women who left care is not described there."],
    institutions: ["eswatini-national-cancer-registry", "eswatini-ministry-of-health"], cancers: ["cervical"], related: [P_EARLY, "manzini-oncology-unit"],
    links: [doi("10.1371/journal.pgph.0006309", "PLOS Glob Public Health 2026"), pubmed("41990049")] }),

  p({ id: P_EARLY, name: "Cervical cancer by age at diagnosis in the Eswatini National Cancer Registry, 2016 to 2022",
    journal: "Cancer Epidemiology", year: 2026, doi: "10.1016/j.canep.2026.103071", pmid: "41980368", authors: "Vilakati LN, Ndlela MG, Hlophe NP, Liu JJ.", paperType: "observational", participants: 2099,
    tldr: "A study of 2,099 women with cervical cancer in Eswatini's registry from 2016 to 2022 found the share diagnosed at an advanced stage was falling, and that women living with HIV were more often diagnosed after the cancer had spread.",
    summary: "Published as \"Comparison of early-onset and later-onset cervical cancer clinical characteristics and trends in Eswatini\". The authors studied women with invasive primary cervical cancer diagnosed from 2016 to 2022 in the Eswatini National Cancer Registry, comparing stage, tissue type and HIV status across three age groups (15 to 39, 40 to 49, and 50 and over), and used log-linear regression for trends. One author is at the registry.",
    findings: [
      "2,099 women were included; the mean age at diagnosis was 49.0 years.",
      "The distribution of tissue types differed by age at diagnosis.",
      "The proportion of advanced-stage cervical cancer was declining in both younger and older women, and HIV-positive women were more commonly diagnosed with metastatic cancer.",
    ],
    whatItMeans: "The trend in stage at diagnosis is moving the right way, and the authors point to women living with HIV as the group where earlier diagnosis matters most.",
    caveats: ["The indexed abstract is truncated and does not give the size of the trends.", "Registry data with the same limits on completeness as the registry itself."],
    institutions: ["eswatini-national-cancer-registry"], cancers: ["cervical"], related: [P_SURVIVAL],
    links: [doi("10.1016/j.canep.2026.103071", "Cancer Epidemiol 2026"), pubmed("41980368")] }),

  p({ id: P_HPV, name: "Introduction of the HPV vaccine in Eswatini: the June 2023 school campaign",
    journal: "Asian Pacific Journal of Cancer Prevention", year: 2025, doi: "10.31557/apjcp.2025.26.6.1891", pmid: "40542751", authors: "Maseko TN, Dlamini X, Okello V, et al.", paperType: "observational",
    tldr: "Eswatini's first national HPV vaccination campaign, in schools from 12 to 23 June 2023, vaccinated 46,512 girls aged 9 to 14, which was 55.9% of its target of 82,400.",
    summary: "Published as \"Introduction of the HPV Vaccine among Young Girls to Reduce the Long-Term Risk of Cervical Cancer in Eswatini: Programmatic Decision and Roll Out\". A review by authors from the Ministry of Health, including its National Cancer Control Program, and the University of the Free State of how the school-based campaign was planned and run, with the lessons learned. The abstract describes a programme of two doses six months apart.",
    findings: [
      "The national target was 82,400 girls aged 9 to 14; 46,512 were vaccinated, a coverage of 55.9%.",
      "Coverage was highest in the Manzini region (60.1%) and lowest in Shiselweni (48.2%).",
      "Misconceptions about who was eligible, and misinformation, held back uptake.",
    ],
    whatItMeans: "It is the ministry's own account of the launch, and the baseline against which later coverage figures can be read.",
    caveats: ["A programme report by the people who ran the campaign, not an independent survey.", "It covers the first campaign only."],
    institutions: ["eswatini-ministry-of-health"], cancers: ["cervical"], related: [P_CX_COST],
    links: [doi("10.31557/apjcp.2025.26.6.1891", "Asian Pac J Cancer Prev 2025"), pubmed("40542751")] }),

  p({ id: P_CX_COST, name: "The economic burden of cervical cancer in Eswatini, 2018",
    journal: "PLoS One", year: 2021, doi: "10.1371/journal.pone.0250113", pmid: "33857233", authors: "Ngcamphalala C, Östensson E, Ginindza TG.", paperType: "observational",
    tldr: "Cervical cancer cost Eswatini's society an estimated 19 million US dollars in 2018, most of it the direct cost of treating invasive cancer at late stages.",
    summary: "Published as \"The economic burden of cervical cancer in Eswatini: Societal perspective\". A cost-of-illness study using national clinical and registry data for 2018, counting direct medical costs, patients' travel costs, and productivity lost to illness and early death.",
    findings: [
      "Total annual cost was $19 million (range $14 million to $24 million).",
      "Direct costs were 72% ($13.7 million); treating pre-cancer was 0.7% of them ($94,161).",
      "Treatment of stage III and stage IV disease cost $1.7 million and $8.7 million.",
      "Indirect costs were 27% ($5.3 million), 67% of that from early death ($3.5 million).",
    ],
    whatItMeans: "More than half of the total, $10.4 million of $19 million, is the cost of treating stage III and stage IV disease, and less than 1% of direct costs goes on treating pre-cancer. The authors conclude that HPV vaccination and screening should be prioritised.",
    caveats: ["A model built from 2018 data, before the oncology unit at Manzini and before HPV vaccination.", "The abstract does not say how much of the cost was treatment abroad."],
    institutions: ["eswatini-ministry-of-health"], cancers: ["cervical"], related: [P_PR_COST, P_HPV],
    links: [doi("10.1371/journal.pone.0250113", "PLoS One 2021"), pubmed("33857233")] }),

  p({ id: P_PR_COST, name: "The economic burden of prostate cancer in Eswatini, 2018",
    journal: "BMC Health Services Research", year: 2022, doi: "10.1186/s12913-022-07817-6", pmid: "35410213", authors: "Ngcamphalala C, Östensson E, Ginindza TG.", paperType: "observational",
    tldr: "Prostate cancer cost Eswatini's society an estimated 6.2 million US dollars in 2018. Radiotherapy was the largest cost per patient, followed by chemotherapy and then transport and lodging.",
    summary: "Published as \"The economic burden of prostate cancer in Eswatini\". A prevalence-based cost-of-illness study from a societal perspective, using diagnosis-specific data from national registries for 2018 and counting health care use, transport, sick leave and early death.",
    findings: [
      "Total annual cost was $6.2 million (range $4.7 million to $7.8 million).",
      "Average cost per patient was $16,648 for radiotherapy, $7,498 for chemotherapy and $5,959 for transport and lodging.",
      "Costs rose with stage: $1.1 million for stage III and $1.9 million for stage IV.",
    ],
    whatItMeans: "Radiotherapy, which is not available in Eswatini, is the largest cost per patient, and travel and lodging are a cost in their own right.",
    caveats: ["A model built from 2018 data.", "The abstract does not say where the radiotherapy was given."],
    institutions: ["eswatini-ministry-of-health"], cancers: ["prostate"], related: [P_CX_COST],
    links: [doi("10.1186/s12913-022-07817-6", "BMC Health Serv Res 2022"), pubmed("35410213")] }),
];

/** Records behind /countries/sz/ (wave 15). */
export const recordsSZ: EntityInput[] = [...institutions, ...papers];
