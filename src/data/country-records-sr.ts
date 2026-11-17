import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Suriname: the public bodies and papers behind /countries/sr/ (wave 16) that the corpus did not hold. The two
 * institutions were written from the Ministry of Health's National Cancer Control Plan Suriname 2019-2028 (PDF text,
 * ICCP portal copy), the Netherlands Enterprise Agency's page on export rules for Suriname and the State Health
 * Insurance Fund's home page (both read in Dutch), all read raw on 16 November 2026. DOIs were resolved through Europe
 * PMC and the figures in `findings` are taken from the indexed abstracts.
 *
 * Inbound links: the Ministry and the Fund list each other and the existing record for the Academic Hospital
 * Paramaribo; the Ministry lists the five papers through keyPapers and each paper lists the Ministry or the hospital.
 * Coordinates are approximate Paramaribo city points, not building positions.
 */
const asOf = "2026-11-16";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const NCCP = "https://www.iccp-portal.org/system/files/plans/SUR_B5_s21_NCCP%20Suriname%202019-2028.pdf";
const RVO = "https://www.rvo.nl/onderwerpen/landen-en-gebieden/suriname/exportregels";
const SZF = "https://www.szf.sr/";
const MOH = "https://gov.sr/ministeries/ministerie-van-volksgezondheid/";
const MANS = "paper-mans-cancer-incidence-suriname-tumori-2003";
const BISHESHAR = "paper-bisheshar-head-neck-cancer-suriname-jcogo-2025";
const WIELZEN = "paper-wielzen-prostate-cancer-suriname-jcogo-2026";
const STIJNBERG = "paper-stijnberg-hiv-cervical-suriname-rpsp-2024";
const WOITTIEZ = "paper-woittiez-cervical-screening-hiv-suriname-cureus-2026";

const institutions: InstitutionInput[] = [
  i({ id: "moh-suriname", name: "Ministry of Health, Suriname", aka: ["Ministerie van Volksgezondheid", "MOH Suriname"],
    city: "Paramaribo", country: "SR", lat: 5.85, lng: -55.2, institutionType: "government", website: MOH,
    tldr: "Suriname's Ministry of Health, which published the National Cancer Control Plan 2019 to 2028. The plan says the country has no cancer registry and no national screening programme, and that the government pays for radiotherapy and for treatment in Colombia when care is not available at home.",
    summary: "The National Cancer Control Plan Suriname 2019-2028, with a foreword by the Minister of Health, sets goals for prevention, screening and early detection, diagnosis and treatment, palliative care and surveillance. Its situational analysis says cancer incidence is known only from the pathology department of the Academic Hospital Paramaribo (133 histologically confirmed cases per 100,000 a year in 2013 and 2014), that there is no national cancer registry or screening programme, that radiotherapy was introduced in 2012 and was funded by the government, with patients and insurers not yet charged, and that patients needing services not available in Suriname can be sent to Colombia under a 2004 regulation, ARMU-LOV, with treatment and housing at government expense. The Ministry and its Inspectorate set standards and inspect; a steering committee appointed by the Ministry draws up the national medicines list, and a Dutch government guide says a medicine must be on that list to be imported. The plan dates from 2019, and OnCo found no published review of its progress. The coordinates are an approximate Paramaribo city point.",
    programs: ["National Cancer Control Plan 2019 to 2028", "ARMU-LOV scheme for treatment abroad (Colombia)", "National medicines list (Nationale Geneesmiddelen Klapper)", "HPV vaccination (since 2013)"],
    institutions: ["azp-suriname", "szf-suriname"],
    keyPapers: [MANS, BISHESHAR, WIELZEN, STIJNBERG, WOITTIEZ],
    cancers: ["cervical", "breast-cancer", "prostate", "colorectal"],
    links: [
      { label: "Ministry of Health: National Cancer Control Plan Suriname 2019-2028 (PDF, ICCP portal)", url: NCCP },
      { label: "Government of Suriname: Ministerie van Volksgezondheid", url: MOH },
      { label: "Netherlands Enterprise Agency: export rules for Suriname (in Dutch)", url: RVO },
    ] }),

  i({ id: "szf-suriname", name: "Staatsziekenfonds (State Health Insurance Fund, Suriname)", aka: ["SZF", "Stichting Staatsziekenfonds", "State Health Insurance Fund"],
    city: "Paramaribo", country: "SR", lat: 5.85, lng: -55.2, institutionType: "government", website: SZF,
    tldr: "Suriname's State Health Insurance Fund, which has run the country's compulsory basic health insurance since 2016. At the end of 2016 it insured about three quarters of the people who had health insurance.",
    summary: "The National Cancer Control Plan Suriname 2019-2028 says the fund, known as SZF, originally insured civil servants and a small group of voluntary members, financed by wage tax contributions, subsidies and premiums. The National Basic Health Insurance Act of 2014 made insurance for a basic package compulsory, with children up to 16 and adults over 60 of Surinamese nationality exempt from the premium; implementation began with a private insurer and passed to the fund in 2016. At the end of 2016 an estimated 78% of the population had health insurance, 75% of it provided by the fund. The plan says anticancer medicines on the national list are covered under the Act up to US$800 a year. The fund's own home page describes itself as the largest purchaser of care in Suriname, with more than 40 years of experience. OnCo did not find a current benefits list that mentions cancer care. The coordinates are an approximate Paramaribo city point.",
    programs: ["Basic health insurance under the National Basic Health Insurance Act 2014 (since 2016)", "Insurance for civil servants and voluntary members"],
    institutions: ["moh-suriname", "azp-suriname"],
    links: [
      { label: "Staatsziekenfonds: home page (in Dutch)", url: SZF },
      { label: "Ministry of Health: National Cancer Control Plan Suriname 2019-2028, health system (PDF, ICCP portal)", url: NCCP },
    ] }),
];

const papers: PaperInput[] = [
  p({ id: MANS, name: "Cancer incidence in Suriname from 1980 through 2000 a descriptive study",
    journal: "Tumori", year: 2003, doi: "10.1177/030089160308900404", pmid: "14606637", authors: "Mans DR, Mohamedradja RN, Hoeblal AR, et al.", paperType: "observational",
    tldr: "Using the records of Suriname's pathology laboratory for 1980 to 2000, this study found about 70 confirmed cancers per 100,000 people a year, more in women than in men, in large part because cervical cancer was the commonest cancer.",
    summary: "The authors took the numbers of histopathologically confirmed malignancies from the Pathology Laboratory and population figures from the General Bureau of Statistics, and calculated yearly crude and sex-specific incidence rates overall, by site, by age band and for the three largest ethnic groups (Hindustani, Creole and Javanese).",
    findings: ["Average yearly crude incidence was 70 per 100,000 (standard deviation 12): 59 in men and 83 in women.", "Cervical cancer led, at 22.1 per 100,000 women; other leading sites, at 2 to 17 per 100,000, were the gastrointestinal tract, breast, blood, prostate, head and neck, lung and liver.", "Cancer overall was two to six times more common in Creole than in Hindustani and Javanese people, but cervical cancer was seen as often in Hindustani as in Creole women.", "Most primary liver cancers were in Creole people of both sexes and Javanese men; thyroid cancer was more frequent in Hindustani women."],
    whatItMeans: "It is the baseline that later figures from Suriname are compared with, and it shows how much the count depends on what reaches the one laboratory.",
    caveats: ["Only cancers confirmed by histopathology were counted, so cancers diagnosed without a biopsy are missing.", "Crude rates, not age-standardised, and the data end in 2000."],
    cancers: ["cervical", "breast-cancer", "prostate", "hcc"], institutions: ["azp-suriname", "moh-suriname"], related: [BISHESHAR, WIELZEN],
    links: [doi("10.1177/030089160308900404", "DOI"), pubmed("14606637")] }),

  p({ id: BISHESHAR, name: "Head and Neck Cancer in Suriname: An Epidemiologic Review of Clinical and Pathologic Features of Patients Treated Between 2009 and 2021",
    journal: "JCO Global Oncology", year: 2025, doi: "10.1200/go-25-00045", pmid: "40768686", authors: "Bisheshar SK, Dams ETM, Chan M, et al.", paperType: "observational", participants: 364,
    tldr: "A review of 364 head and neck cancers diagnosed in Suriname from 2009 to 2021 found that 73% were at an advanced stage at diagnosis, and that the commonest site differed between ethnic groups.",
    summary: "Histologically confirmed head and neck cancers diagnosed between 2009 and 2021 were collected retrospectively from the Academic Hospital Paramaribo, described as the country's diagnostic pathology centre, with clinical data from three other hospitals. Incidence was expressed as crude and age-standardised rates, and HPV and Epstein-Barr virus status was tested on tissue from 263 patients.",
    findings: ["Of 364 patients, 279 (76.6%) were male.", "Incidence rose by 6.8% a year from 2012 to 2019, which the authors attribute to better diagnostics and more ear, nose and throat specialists.", "Oral cavity carcinoma was most common in the Hindustani population, nasopharyngeal carcinoma in the Maroon and Javanese populations, and laryngeal carcinoma in the Creole population.", "73.0% presented with advanced-stage disease; 21 of 60 oropharyngeal cancers (35.0%) were HPV positive and 43 of 47 nasopharyngeal cancers (91.4%) were Epstein-Barr virus positive."],
    whatItMeans: "Most head and neck cancers in Suriname are found late, and the authors call for awareness and earlier detection.",
    caveats: ["Retrospective, and limited to cancers confirmed by histology.", "Virus testing was possible in 263 of the 364 patients."],
    cancers: ["head-and-neck"], institutions: ["azp-suriname", "moh-suriname"], related: [MANS, WIELZEN],
    links: [doi("10.1200/go-25-00045", "DOI"), pubmed("40768686")] }),

  p({ id: WIELZEN, name: "Ethnic and Geographic Variation in Prostate Cancer Presentation in Suriname",
    journal: "JCO Global Oncology", year: 2026, doi: "10.1200/go-26-00274", pmid: "42814916", authors: "Wielzen HA, Sandel NJ, Ramsoekh A, et al.", paperType: "observational", participants: 570,
    tldr: "Among 570 men with prostate cancer confirmed in Suriname's national pathology database from 2018 to 2023, 41% had high-grade disease and the median PSA at diagnosis was 21 ng/mL.",
    summary: "A retrospective analysis of histologically confirmed prostate adenocarcinoma from the National Pathology Database of Suriname, 2018 to 2023, with age, ethnicity, PSA level, grade group and district of residence (remote or not). Multivariable logistic regression looked for factors associated with high-grade disease (grade groups 4 and 5).",
    findings: ["570 patients, median age 69 years; 40.9% had high-grade disease and the overall median PSA was 21.0 ng/mL (interquartile range 12.0 to 47.4).", "Median PSA did not differ between African-ancestry and Asian-ancestry groups (21.0 against 20.3 ng/mL).", "In the regression (331 patients), Javanese ethnicity was associated with high-grade disease compared with Creole ethnicity (adjusted odds ratio 3.31, 95% CI 1.31 to 8.39).", "Patients from remote districts had numerically higher PSA and more high-grade disease, without statistical significance."],
    whatItMeans: "Many men in Suriname are diagnosed with prostate cancer when it is already high grade; the authors describe the differences between groups as hypothesis generating.",
    caveats: ["Only biopsy-confirmed cases, so men never biopsied are missing.", "The regression used 331 of the 570 patients.", "No information on stage, treatment or outcome in the abstract."],
    cancers: ["prostate"], institutions: ["azp-suriname", "moh-suriname"], related: [MANS, BISHESHAR],
    links: [doi("10.1200/go-26-00274", "DOI"), pubmed("42814916")] }),

  p({ id: STIJNBERG, name: "HIV prevalence among cervical (pre)cancer diagnoses in Suriname: a retrospective population study",
    journal: "Revista Panamericana de Salud Pública", year: 2024, doi: "10.26633/rpsp.2024.122", pmid: "39529690", authors: "Stijnberg D, Charles R, Mc Kee M, et al.", paperType: "observational", participants: 2901,
    tldr: "Of 2,901 diagnoses of cervical precancer or cancer in Suriname from 2010 to 2020, 57.5% of the women had an HIV test on record, and 5.8% of those tested were HIV positive.",
    summary: "A retrospective population study of all women diagnosed with cervical intraepithelial neoplasia or cervical cancer in Suriname's only pathology department from 2010 to 2020, matched with the national HIV test database, with retention in HIV care followed to 2022. The open full text states that Suriname has no formal national screening programme for cervical cancer.",
    findings: ["2,901 diagnoses: 1,395 CIN I, 396 CIN II, 444 CIN III and 666 cervical cancers.", "HIV test coverage was 57.5% and the positivity ratio 5.8%, with no difference between stages.", "HIV not previously diagnosed was found in 1.6% of women with precancer and 2.9% of women with cancer.", "Among women with cervical cancer and HIV, median time in HIV care was 8 months for those not on antiretroviral therapy and 4 years for those who started it."],
    whatItMeans: "The authors recommend offering an HIV test to every woman diagnosed with cervical precancer or cancer, and starting treatment when it is positive.",
    caveats: ["Record linkage of two databases; women never tested for HIV could not be classified.", "Counts are of pathology diagnoses, so cervical cancers never biopsied are missing."],
    cancers: ["cervical"], institutions: ["azp-suriname", "moh-suriname"], related: [WOITTIEZ],
    links: [doi("10.26633/rpsp.2024.122", "DOI"), pubmed("39529690")] }),

  p({ id: WOITTIEZ, name: "Cervical Cancer Screening in Women Living With HIV in Suriname",
    journal: "Cureus", year: 2026, doi: "10.7759/cureus.105234", pmid: "41982595", authors: "Woittiez L, Soekdew A, Dams E, et al.", paperType: "observational", participants: 195,
    tldr: "Among 195 women living with HIV who attended one clinic in Paramaribo over six weeks in 2023, 69% had ever had cervical screening and 39.5% had been screened in the previous three years.",
    summary: "A single-centre study at the HIV outpatient clinic of the Academic Hospital Paramaribo. The date of each woman's last cervical screening was recorded for all women attending during six weeks in 2023, and the women were asked to complete a questionnaire on factors linked to screening.",
    findings: ["195 women attended; 134 (68.7%) had ever had cervical screening and 77 (39.5%) had been screened in the past three years.", "134 women completed the questionnaire; 99 of them (73.9%) were not aware that women living with HIV have a higher risk of cervical cancer."],
    whatItMeans: "Most of these women were not being screened as often as WHO advises, and most had not been told of their higher risk.",
    caveats: ["One clinic and six weeks, so the women are those already in HIV care.", "The abstract does not say how the date of each woman's last screening was established."],
    cancers: ["cervical"], institutions: ["azp-suriname"], related: [STIJNBERG],
    links: [doi("10.7759/cureus.105234", "DOI"), pubmed("41982595")] }),
];

/** Records behind /countries/sr/ (wave 16). */
export const recordsSR: EntityInput[] = [...institutions, ...papers];
