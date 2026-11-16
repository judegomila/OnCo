import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Slovenia: the public bodies and paper behind /countries/si/ (wave 11) that the corpus did not hold. Each was written
 * from its own primary source, read raw in Slovenian or English on 11 November 2026: the Cancer Registry of the Republic
 * of Slovenia's page on the Institute of Oncology Ljubljana site and the SLORA data portal, the summary of the registry's
 * annual report "Rak v Sloveniji 2023" (PDF text), the National Cancer Control Programme 2022 to 2026 (DPOR, PDF text)
 * and a DPOR news item of October 2026, the ZZZS pages on compulsory insurance and the compulsory health contribution,
 * the JAZMP pages on the agency, medicine prices and health technology assessment, the Programme Svit pages, and a
 * government news item of 11 November 2026 on EU funding for oncology at UKC Maribor. The paper's DOI was resolved
 * through Europe PMC and its figures are taken from the indexed abstract.
 *
 * Inbound links: the Ministry of Health links ZZZS, JAZMP, NIJZ, the cancer registry and UKC Maribor, and each links
 * the Ministry back; the paper is linked through the Ministry's keyPapers. Coordinates are approximate city points,
 * not building positions.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const MZ = "https://www.gov.si/drzavni-organi/ministrstva/ministrstvo-za-zdravje/";
const DPOR_PDF = "http://www.dpor.si/wp-content/uploads/2021/12/Drzavni-program-obvladovanja-raka-2022-2026.pdf";
const RRS = "https://www.onko-i.si/rrs/register-raka-republike-slovenije";
const SLORA = "https://www.slora.si/";
const RAK_2023 = "https://www.onko-i.si/fileadmin/onko/datoteke/dokumenti/2026/Rak_v_Sloveniji_2023_povzetek.pdf";
const ZZZS_CONTR = "https://www.zzzs.si/en/compulsory-health-insurance/contributions-for-compulsory-health-insurance/";
const ZZZS_ABOUT = "https://www.zzzs.si/o-zzzs/zavod-za-zdravstveno-zavarovanje-slovenije/";
const ZZZS_KAJ = "https://www.zzzs.si/kaj-je-zdravstveno-zavarovanje/";
const ZZZS_OZP = "https://zavezanec.zzzs.si/prispevki-za-obvezno-zdravstveno-zavarovanje/obvezni-zdravstveni-prispevek/";
const ZZZS_MED = "https://www.zzzs.si/en/compulsory-health-insurance/the-extent-of-rights-deriving-from-compulsory-health-insurance/medicaments-on-prescription/";
const JAZMP_ID = "https://www.jazmp.si/o-nas/osebna-izkaznica-agencije/";
const JAZMP_PRICES = "https://www.jazmp.si/humana-zdravila/cene-zdravil/";
const JAZMP_HTA = "https://www.jazmp.si/humana-zdravila/hta/";
const SVIT = "https://www.program-svit.si/za-uporabnike/o-programu/kako-poteka-program-svit/";
const SVIT_ONAS = "https://www.program-svit.si/za-uporabnike/o-nas/";
const MB_ONCO = "https://www.gov.si/novice/2026-11-11-evropska-sredstva-za-siritev-onkoloske-dejavnosti-v-ukc-maribor/";
const DIRAC = "https://dirac.iaea.org/Data/CountriesLight";

const institutions: InstitutionInput[] = [
  i({ id: "slovenia-ministry-of-health", name: "Ministrstvo za zdravje, Slovenia", aka: ["Ministry of Health of the Republic of Slovenia", "MZ", "Slovenian Ministry of Health"],
    city: "Ljubljana", country: "SI", lat: 46.05, lng: 14.5, institutionType: "government", website: MZ,
    tldr: "Slovenia's health ministry. It holds the National Cancer Control Programme, which the Institute of Oncology Ljubljana runs, founded the national bowel screening programme Svit, and is the beneficiary of the EU-funded expansion of oncology at UKC Maribor.",
    summary: "The Ministrstvo za zdravje is the Slovenian government's health ministry. The National Cancer Control Programme 2022 to 2026 (Državni program obvladovanja raka, DPOR) names the ministry as the programme's holder and the Institute of Oncology Ljubljana as the body that manages and leads it; the first programme, for 2010 to 2015, and the second, for 2017 to 2021, were adopted by the government in 2010 and 2017. Among its targets the 2022 to 2026 programme sets HPV vaccination of at least 80% of girls aged 11 to 12 by 2026. Programme Svit, the national bowel screening programme, runs under the ministry's auspices with the National Institute of Public Health as its holder, and the ministry founded it in 2007. The coordinates are an approximate Ljubljana city point.\n\nOn 11 November 2026 the government announced EU cohesion funding for the project \"UKC Maribor: expansion of oncology\", a project worth €65,738,002.33 in total to which the European Regional Development Fund contributes €15,085,134.93, with the ministry as beneficiary. It is meant to give oncology, nuclear medicine and haematology at UKC Maribor shared, larger premises so that patients from north-east Slovenia can be treated closer to home.",
    programs: ["Državni program obvladovanja raka (DPOR) 2022 to 2026", "National screening programmes ZORA, DORA and Svit", "UKC Maribor oncology expansion (EU cohesion policy 2021 to 2027)"],
    institutions: ["onkoloski-institut-ljubljana", "zzzs-slovenia", "jazmp-slovenia", "nijz-slovenia", "cancer-registry-slovenia", "ukc-maribor"],
    cancers: ["cervical", "breast-cancer", "colorectal"],
    keyPapers: ["paper-irzaldy-hpv-vaccination-cin2-slovenia-lanepe-2025"],
    links: [
      { label: "Ministrstvo za zdravje (gov.si)", url: MZ },
      { label: "Državni program obvladovanja raka 2022 to 2026 (PDF)", url: DPOR_PDF },
      { label: "Government news: EU funds for expanding oncology at UKC Maribor (11 November 2026)", url: MB_ONCO },
    ] }),

  i({ id: "zzzs-slovenia", name: "Zavod za zdravstveno zavarovanje Slovenije (ZZZS)", aka: ["ZZZS", "Health Insurance Institute of Slovenia"],
    city: "Ljubljana", country: "SI", lat: 46.06, lng: 14.51, institutionType: "government", website: "https://www.zzzs.si/",
    tldr: "Slovenia's single public health insurer. It has run compulsory health insurance since 1 March 1992, and since January 2024, when voluntary complementary insurance was abolished, compulsory insurance covers the basket of rights in full.",
    summary: "The Zavod za zdravstveno zavarovanje Slovenije is the public institute that carries and runs compulsory health insurance, and compulsory long-term care insurance, in Slovenia. It began work on 1 March 1992 under the Health Care and Health Insurance Act (ZZVZZ). Insurance is compulsory for everyone who meets the conditions in that act, as an insured person or a family member; voluntary health insurance is sold by private insurers. ZZZS is governed by an assembly of elected representatives of employers, including the government, and of insured people, and works through 10 regional units. The coordinates are an approximate Ljubljana city point.\n\nVoluntary complementary health insurance was abolished on 31 December 2023 and a compulsory health contribution (obvezni zdravstveni prispevek, OZP) was introduced on 1 January 2024. ZZZS says that since then compulsory insurance covers the basket of rights in full (100%), and warns people not to buy extra insurance to avoid co-payments. From March 2026 to February 2027 the contribution is €39.36 a month; it is uprated every 1 March in line with average gross wages, and for some groups the state budget pays it. ZZZS pays for medicines on the positive list; medicines on the negative list, or prescribed privately, are paid by the patient. It also pays for Programme Svit for people with compulsory insurance.",
    programs: ["Compulsory health insurance", "Compulsory health contribution (OZP, since 1 January 2024)", "Positive list of reimbursed medicines", "Funding of Programme Svit"],
    institutions: ["slovenia-ministry-of-health"],
    links: [
      { label: "ZZZS: what health insurance is", url: ZZZS_KAJ },
      { label: "ZZZS: the compulsory health contribution", url: ZZZS_OZP },
      { label: "ZZZS: medicines on prescription (English)", url: ZZZS_MED },
      { label: "ZZZS: about the institute", url: ZZZS_ABOUT },
      { label: "ZZZS: contributions for compulsory health insurance (English)", url: ZZZS_CONTR },
    ] }),

  i({ id: "jazmp-slovenia", name: "Javna agencija Republike Slovenije za zdravila in medicinske pripomočke (JAZMP)", aka: ["JAZMP", "Agency for Medicinal Products and Medical Devices of the Republic of Slovenia"],
    city: "Ljubljana", country: "SI", lat: 46.06, lng: 14.5, institutionType: "government", website: "https://www.jazmp.si/",
    tldr: "Slovenia's medicines regulator and a member of the European medicines regulatory network. It also sets the maximum prices of publicly funded medicines, by comparison with Germany, Austria and France.",
    summary: "JAZMP regulates and supervises medicines, medical devices, blood, tissues and cells in Slovenia under the Medicinal Products Act, and as a member of the European Medicines Regulatory Network it takes part in the EU system through which new cancer medicines are authorised once for every member state. Its registered seat is Slovenčeva ulica 22, Ljubljana. The coordinates are an approximate Ljubljana city point.\n\nJAZMP is the national body that sets the prices of medicines paid for from public funds. Its pricing page says Slovenia regulates only the prices of publicly funded medicines and uses a comparative model based on prices in Germany, Austria and France; the result is a maximum wholesale price, and suppliers and payers may agree lower prices. Public funding of those medicines is a matter for ZZZS. Under the Act on Quality Assurance in Health Care, the competent body for applying the EU health technology assessment regulation (2021/2282) is the Public Agency of the Republic of Slovenia for Quality in Health Care, not JAZMP.",
    programs: ["Marketing authorisation and supervision of medicines", "Maximum prices of publicly funded medicines", "Pharmacovigilance", "Clinical trials of medicines"],
    institutions: ["slovenia-ministry-of-health", "ema"],
    links: [
      { label: "JAZMP: agency profile", url: JAZMP_ID },
      { label: "JAZMP: medicine prices", url: JAZMP_PRICES },
      { label: "JAZMP: health technology assessment", url: JAZMP_HTA },
    ] }),

  i({ id: "nijz-slovenia", name: "Nacionalni inštitut za javno zdravje (NIJZ)", aka: ["NIJZ", "National Institute of Public Health, Slovenia"],
    city: "Ljubljana", country: "SI", lat: 46.05, lng: 14.5, institutionType: "government", website: "https://nijz.si/",
    tldr: "Slovenia's national public health institute. It holds Programme Svit, the national bowel cancer screening programme for people aged 50 to 74, and is named, with primary care, as responsible for the national HPV vaccination target.",
    summary: "The Nacionalni inštitut za javno zdravje is the holder of Programme Svit, the national programme of screening and early detection of precancerous changes and cancer of the colon and rectum, which runs under the Ministry of Health. Svit invites men and women aged 50 to 74 every two years to send a home stool test, and refers those with a positive result to colonoscopy. In 2025 Svit invited 322,786 people, 321,291 invitations were delivered, and 212,052 people (66.00% of those delivered) returned the form agreeing to take part. The National Cancer Control Programme 2022 to 2026 names NIJZ, with primary care, as responsible for reaching HPV vaccination of at least 80% of girls aged 11 to 12 by 2026 and for promoting vaccination of boys. The coordinates are an approximate Ljubljana city point.",
    programs: ["Programme Svit (bowel screening, ages 50 to 74)", "HPV vaccination programme"],
    institutions: ["slovenia-ministry-of-health"],
    cancers: ["colorectal", "cervical"],
    links: [
      { label: "Programme Svit: how the programme works", url: SVIT },
      { label: "Programme Svit: about us and yearly figures", url: SVIT_ONAS },
      { label: "Državni program obvladovanja raka 2022 to 2026 (PDF)", url: DPOR_PDF },
    ] }),

  i({ id: "cancer-registry-slovenia", name: "Register raka Republike Slovenije", aka: ["Cancer Registry of the Republic of Slovenia", "RRRS", "Slovenian Cancer Registry"],
    city: "Ljubljana", country: "SI", lat: 46.056, lng: 14.515, institutionType: "government", website: RRS,
    tldr: "Slovenia's national population-based cancer registry, founded in 1950 at the Institute of Oncology Ljubljana. Reporting cancer has been compulsory by law since then, and its data can be explored on the SLORA portal.",
    summary: "The Register raka Republike Slovenije was founded in 1950 at the Institute of Oncology Ljubljana as a service collecting data on every new cancer case and on survival, and describes itself as one of the oldest population-based registries in Europe. It has been a member of the International Association of Cancer Registries since that body was founded in 1968, and of the European Network of Cancer Registries from the start. Reporting cancer has been compulsory by law since the registry was founded, and everyone providing health care in Slovenia must report; since 2019 it has been introducing active registration, in which hospitals send lists of eligible patients from their own information systems, and paper notification is being phased out. Its data are published on the SLORA portal, which holds incidence from 1961 and mortality and prevalence from 1985. The coordinates are those of the Institute of Oncology Ljubljana, approximate.\n\nIts summary report for 2023, published in September 2026, counts 19,111 new cancers (10,483 in men and 8,628 in women), of which 5,445 were non-melanoma skin cancers, 6,691 cancer deaths and 142,393 people alive who had ever had cancer. Five-year net survival for adults diagnosed from 2019 to 2023 with any cancer other than non-melanoma skin cancer was 62%.",
    programs: ["National population-based cancer registration since 1950", "SLORA data portal", "Annual report Rak v Sloveniji"],
    institutions: ["onkoloski-institut-ljubljana", "slovenia-ministry-of-health"],
    links: [
      { label: "Register raka Republike Slovenije (Institute of Oncology Ljubljana)", url: RRS },
      { label: "SLORA: Slovenia and cancer, data portal", url: SLORA },
      { label: "Rak v Sloveniji 2023, summary (PDF)", url: RAK_2023 },
    ] }),

  i({ id: "ukc-maribor", name: "Univerzitetni klinični center Maribor", aka: ["UKC Maribor", "University Medical Centre Maribor"],
    city: "Maribor", country: "SI", lat: 46.55, lng: 15.64, institutionType: "hospital", website: "https://www.ukc-mb.si/",
    tldr: "The university hospital in Maribor and one of the two radiotherapy centres IAEA DIRAC lists in Slovenia, with five linear accelerators. EU funds approved in November 2026 are to give its oncology, nuclear medicine and haematology shared, larger premises.",
    summary: "Univerzitetni klinični center Maribor is the university medical centre in Maribor. IAEA DIRAC, read on 11 November 2026 with the entry updated in 2026, lists it with five megavoltage machines, all linear accelerators; the only other radiotherapy centre DIRAC lists in Slovenia is the Institute of Oncology Ljubljana. The National Cancer Control Programme 2022 to 2026 sets goals for its oncology and haematology departments, including space and staff for more complex treatments. The coordinates are an approximate Maribor city point.\n\nOn 11 November 2026 the government announced that the European Regional Development Fund will contribute €15,085,134.93 to the €65,738,002.33 project \"UKC Maribor: expansion of oncology\", which is to relieve a shortage of space and bring oncology, nuclear medicine and haematology together on one site, so that patients from north-east Slovenia can be treated closer to home. The Ministry of Health is the beneficiary.",
    programs: ["Radiotherapy (five linear accelerators)", "Oncology, nuclear medicine and haematology", "Expansion of oncology (EU cohesion policy 2021 to 2027)"],
    institutions: ["slovenia-ministry-of-health", "iaea"],
    links: [
      { label: "Government news: EU funds for expanding oncology at UKC Maribor (11 November 2026)", url: MB_ONCO },
      { label: "IAEA DIRAC: radiotherapy equipment by centre", url: DIRAC },
      { label: "UKC Maribor", url: "https://www.ukc-mb.si/" },
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-irzaldy-hpv-vaccination-cin2-slovenia-lanepe-2025", name: "Impact of Slovenia's national HPV vaccination programme for girls on cytology screening performance and CIN2+ incidence: five-year population-based results",
    journal: "The Lancet Regional Health: Europe", year: 2025, doi: "10.1016/j.lanepe.2024.101203", pmid: "39834615", authors: "Irzaldy A, Jerman T, de Kok IMCM, et al., Ivanuš U", paperType: "observational",
    tldr: "In Slovenia's cervical screening registry, women in the first birth cohorts offered HPV vaccination as girls had 42% fewer high-grade cervical lesions than the cohort just before them, even though only about half were vaccinated.",
    summary: "A cohort study using Slovenia's cervical screening registry, comparing women born 1998 to 2001, the first cohort targeted by the school HPV vaccination programme, with women born 1994 to 1997, the last cohort not targeted, in their first five years of cytology screening, which in Slovenia starts at age 20.",
    findings: ["Annual quadrivalent vaccine coverage in the targeted cohort was between 48.7% and 55.2%.", "CIN2+ incidence was lower in the vaccine-targeted cohort (incidence rate ratio 0.58, 95% CI 0.49 to 0.69).", "The CIN2+ detection rate was 0.31% (79 of 25,185) against 0.55% (165 of 30,181), and the positive predictive value of an abnormal smear fell from 39.0% to 26.8%."],
    whatItMeans: "Vaccination is already reducing precancer in young Slovenian women, and the authors argue that screening needs to change for vaccinated cohorts.",
    caveats: ["Compares birth cohorts rather than vaccinated and unvaccinated individuals; funded by EU Horizon 2020."],
    cancers: ["cervical"], links: [doi("10.1016/j.lanepe.2024.101203", "DOI"), pubmed("39834615")] }),
];

/** Records behind /countries/si/ (wave 11). */
export const recordsSI: EntityInput[] = [...institutions, ...papers];
