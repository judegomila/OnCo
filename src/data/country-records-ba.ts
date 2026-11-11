import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Bosnia and Herzegovina: the public bodies, the cancer centre and the papers behind /countries/ba/ (wave 11) that the
 * corpus did not hold. Each was written from its own primary source, read raw on 11 November 2026: the Agency for
 * Medicinal Products and Medical Devices of Bosnia and Herzegovina's English pages (about us, cooperation, clinical
 * trials, contacts); the Institute for Public Health of the Federation of BiH's report on the health of the population
 * in 2021 (PDF text, English edition) and its January 2025 news page on HPV immunisation; the Public Health Institute
 * of Republika Srpska's 2024 health status report and its March 2023 HPV vaccination guideline (PDF text, Cyrillic);
 * the European Network of Cancer Registries' member list; the Health Insurance and Reinsurance Institute of the
 * Federation's pages on itself and its Solidarity Fund, and the Fund's 2019 medicines list (PDF text); the Health
 * Insurance Fund of Republika Srpska's guide to the rights of people with cancer (PDF text); and the Clinical Centre
 * University of Sarajevo's oncology clinic page and its weekly cytostatics notice. DOIs were resolved through Europe
 * PMC and the figures in `findings` are taken from the indexed abstracts.
 *
 * The country has two entities, the Federation of Bosnia and Herzegovina and Republika Srpska, plus Brčko District;
 * each runs its own public health institute and health insurance fund, and every record says which entity it covers.
 * Brčko District's fund is not written as a record because its website could not be reached; the page names that gap.
 *
 * Inbound links: the two public health institutes link their entity's insurer, the regulator and each other; the
 * insurers, the regulator and the Sarajevo clinical centre link back. The two papers are reached through keyPapers.
 * Coordinates are approximate street or city points, not surveyed building positions.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const ALM_ABOUT = "https://almbih.gov.ba/en/about-us/";
const ALM_COOP = "https://almbih.gov.ba/en/cooperation/";
const ALM_CT = "https://almbih.gov.ba/en/clinical-trials/";
const FBIH_2021 = "https://www.zzjzfbih.ba/wp-content/uploads/2023/04/Zdravstveno-stanje-stanovni%C5%A1tva-engleski.pdf";
const FBIH_HPV = "https://www.zzjzfbih.ba/u-borbi-protiv-karcinioma-cerviksa-vrata-maternice-kljucna-je-imunizacija-protiv-hpv/";
const RS_2024 = "https://www.phi.rs.ba/pdf/publikacije/Zdravstveno%20stanje%20stanovni%C5%A1tva%20RS%20u%202024.%20godini.pdf";
const RS_HPV = "https://www.phi.rs.ba/pdf/publikacije/SMU%20HPV%20vakcinacij%D0%B0,%20Republika%20Srpska.pdf";
const ENCR = "https://www.encr.eu/encr-members-contact-list";
const ZZO_ABOUT = "https://zzofbih.ba/o-nama/";
const ZZO_FS = "https://zzofbih.ba/fond-solidarnosti/";
const ZZO_LIST = "https://zzofbih.ba/wp-content/uploads/2022/06/Lista_lijekova_05_7_2019.pdf";
const FZO_GUIDE = "https://zdravstvo-srpske.org/wp-content/uploads/2025/11/Vodic_za_maligne_final-3.pdf";
const KCUS_ONK = "https://kcus.ba/klinika-za-onkologiju-stari-dizajn/";
const KCUS_CIT = "https://kcus.ba/informacija-za-javnost-stanje-citostatika-09-11-2026-godine/";

const institutions: InstitutionInput[] = [
  i({ id: "almbih", name: "Agency for Medicinal Products and Medical Devices of Bosnia and Herzegovina (ALMBIH)", aka: ["ALMBIH", "ALMBiH", "Agencija za lijekove i medicinska sredstva Bosne i Hercegovine"],
    city: "Banja Luka", country: "BA", lat: 44.77, lng: 17.19, institutionType: "government", website: "https://almbih.gov.ba",
    tldr: "The medicines regulator for the whole of Bosnia and Herzegovina, both entities and Brčko District. It regulates medicines and medical devices, registers medicines and authorises clinical trials, from its seat in Banja Luka.",
    summary: "The Agency was established by the Law on Medicinal Products and Medical Devices (Official Gazette of BiH 58/08) and started work on 1 May 2009. It is a state-level body: its stated purposes include a single market for medicines and medical devices across the whole country and their availability on its whole territory, and cooperation with the state and entity health ministries. Its address is Veljka Mlađenovića bb, Banja Luka; the coordinates are an approximate city point.\n\nThe Agency says its experts have taken part as observers in some European Medicines Agency boards and working groups since 2009, through the EU's Instrument for Pre-Accession Assistance, that it works with the European Directorate for the Quality of Medicines and the network of Official Medicines Control Laboratories, and that it has signed cooperation protocols with the medicines agencies of Serbia (ALIMS), Montenegro (CALIMS) and Croatia (HALMED). Its pharmacovigilance office is in Mostar, with contracted support from the University Clinical Centre in Banja Luka and the Clinical Centre University of Sarajevo.\n\nA Committee for clinical trials assesses applications, and the Agency states that its decisions follow EU Directives 2001/20/EC and 2005/28/EC and the national regulation on clinical trials (Official Gazette of BiH 4/10). The Public Health Institute of Republika Srpska's 2023 HPV vaccination guideline gives the standard registration procedure as 210 days, with a shortened procedure of 150 days, and notes that Republika Srpska's Ministry of Health and Social Welfare may permit the import of a medicine not yet registered. Bosnia and Herzegovina was not on WHO's list of regulators operating at maturity level 3 or 4 in August 2026.",
    programs: ["Marketing authorisation of medicines", "Regulation of medical devices", "Clinical trial authorisation", "Pharmacovigilance (head office in Mostar)", "Medicines control laboratory (Sarajevo)"],
    institutions: ["zzjz-fbih", "phi-republika-srpska"],
    links: [
      { label: "ALMBIH: about us", url: ALM_ABOUT },
      { label: "ALMBIH: cooperation", url: ALM_COOP },
      { label: "ALMBIH: clinical trials", url: ALM_CT },
      { label: "WHO: list of regulators operating at maturity level 3 and 4 (August 2026, PDF)", url: "https://www.who.int/publications/m/item/list-of-nras-operating-at-ml3-and-ml4" },
    ] }),

  i({ id: "zzjz-fbih", name: "Institute for Public Health of the Federation of Bosnia and Herzegovina", aka: ["ZZJZ FBiH", "Zavod za javno zdravstvo Federacije Bosne i Hercegovine", "Institute for Public Health FB&H"],
    city: "Sarajevo", country: "BA", lat: 43.859, lng: 18.42, institutionType: "government", website: "https://www.zzjzfbih.ba",
    tldr: "The public health institute of the Federation of Bosnia and Herzegovina, one of the country's two entities. It keeps the Federation's Cancer Register, started in 2004, publishes the yearly report on the population's health, and wrote the Federation's HPV immunisation programme.",
    summary: "The Institute has seats in Sarajevo (Titova 9) and Mostar (Vukovarska 46); the coordinates are an approximate Sarajevo point. Its report on the health of the population in 2021, published in 2022, says that the Cancer Register in the Federation of BiH was established in 2004 to collect data on every new cancer case, and that because data come from many sources, publication usually takes two to three years.\n\nThat report gives 5,035 cancers registered in the Federation in 2020, excluding skin cancer: 2,686 in men (250.4 per 100,000) and 2,349 in women (211.2 per 100,000), with an average age of 63. Lung cancer led in men (625 cases) and breast cancer in women (540). Rates differed widely by canton, from 534.4 per 100,000 men in Herzegovina-Neretva Canton to 122.2 in West Herzegovina Canton. The same report counts 4,577 deaths from malignant neoplasms in the Federation in 2021, the second leading cause of death by disease group.\n\nThe Institute wrote the Federation's HPV immunisation programme, which the Federal Ministry of Health adopted. In January 2025 it reported that immunisation began at the end of 2022 in four localities, was extended to the whole Federation in 2023, and had given almost 5,500 doses in two years, and that about 150 women a year are diagnosed with cervical cancer in the Federation and about 80 die of it. With the Federal Ministry of Health and UNFPA it mapped the resources for cervical and breast cancer prevention in 2023 and 2024, as groundwork for a prevention programme.",
    programs: ["Cancer Register of the Federation of BiH (since 2004)", "Annual report on the health of the population", "HPV immunisation programme of the Federation of BiH", "Mapping of cervical and breast cancer prevention services (2023 to 2024)"],
    institutions: ["zzo-fbih", "kcus-sarajevo", "almbih", "phi-republika-srpska", "who"],
    cancers: ["lung-cancer", "breast-cancer", "cervical"], related: ["cancer-registries-surveillance"],
    keyPapers: ["paper-vukovic-cervical-cancer-serbia-bih-medicina-2024"],
    links: [
      { label: "Health status of the population and health care in the Federation of BiH in 2021, section 2.4.4 (PDF, English)", url: FBIH_2021 },
      { label: "ZZJZ FBiH: HPV immunisation is key against cervical cancer (15 January 2025)", url: FBIH_HPV },
    ] }),

  i({ id: "phi-republika-srpska", name: "Public Health Institute of Republika Srpska", aka: ["IJZ RS", "JZU Institut za javno zdravstvo Republike Srpske", "Institut za javno zdravstvo Republike Srpske", "Cancer Registry Republika Srpska"],
    city: "Banja Luka", country: "BA", lat: 44.775, lng: 17.19, institutionType: "government", website: "https://www.phi.rs.ba",
    tldr: "The public health institute of Republika Srpska, one of the country's two entities. It keeps the entity's Registry of malignant neoplasms, which is a member of the European Network of Cancer Registries, and organises HPV vaccination, free for children aged 11 to 14 since March 2023.",
    summary: "The Institute's yearly report on the health of the population says that data on cancer cases come from the Registry of malignant neoplasms held at the Institute, collected under a rulebook of 2001 (Official Gazette of RS 28/01) from every health institution in Republika Srpska that diagnoses or treats cancer. The European Network of Cancer Registries lists the Cancer Registry Republika Srpska as an all-ages, all-sites registry covering 1,429,290 people (2012), based at the Institute and the Department of Social Medicine of the University of Banja Luka's Faculty of Medicine, at Jovana Dučića 1, Banja Luka; the coordinates are an approximate city point.\n\nThe report for 2024 records 14,136 deaths in Republika Srpska, of which 2,807 (19.9%) were from neoplasms, ICD-10 chapter II, a rate of 252.8 per 100,000. The reports for 2021 to 2024 read for OnCo give no table of new cancer cases.\n\nIts March 2023 guideline introduced HPV vaccination into Republika Srpska's vaccination calendar as a recommended free vaccine for girls and boys aged 11 or 12 (sixth grade), with children aged 13 and 14 also entitled, using the nine-valent vaccine paid for by the Government of Republika Srpska. The guideline cites the Institute's data that about 200 women a year in Republika Srpska are diagnosed with cervical cancer and about 50 die of it.",
    programs: ["Registry of malignant neoplasms of Republika Srpska", "Annual report on the health of the population", "HPV vaccination in Republika Srpska (from March 2023)"],
    institutions: ["fzo-republika-srpska", "almbih", "zzjz-fbih", "who"],
    cancers: ["cervical"], related: ["cancer-registries-surveillance"],
    keyPapers: ["paper-vukovic-cervical-cancer-serbia-bih-medicina-2024"],
    links: [
      { label: "PHI RS: health status of the population of Republika Srpska in 2024 (PDF, Cyrillic)", url: RS_2024 },
      { label: "PHI RS: guideline for HPV vaccination in Republika Srpska (March 2023, PDF, Cyrillic)", url: RS_HPV },
      { label: "European Network of Cancer Registries: members contact list", url: ENCR },
    ] }),

  i({ id: "zzo-fbih", name: "Health Insurance and Reinsurance Institute of the Federation of Bosnia and Herzegovina", aka: ["ZZOR FBiH", "Zavod zdravstvenog osiguranja i reosiguranja Federacije BiH", "Federal Solidarity Fund", "Fond solidarnosti FBiH"],
    city: "Sarajevo", country: "BA", lat: 43.848, lng: 18.37, institutionType: "government", website: "https://zzofbih.ba",
    tldr: "The federal health insurance institute of the Federation of Bosnia and Herzegovina. Day-to-day insurance in the Federation is run by ten cantonal funds; this institute holds the Solidarity Fund, which pays for cancer medicines on its list and for the most complex treatment, so patients in every canton have the same entitlement.",
    summary: "The Institute was founded under the Federation's Law on Health Insurance and began work by Government decision of 14 May 1998. Its governing board has 11 members, one from each canton and one from the Federal Ministry of Health. Its address is Trg Heroja 14, Sarajevo; the coordinates are approximate.\n\nThe Solidarity Fund, set up under article 13 of the same law, has operated since 1 July 2002. The Institute says it exists so that the most serious illnesses are treated on the same terms for every insured person in the Federation, whatever their canton and whatever the finances of the cantonal insurance fund. It is financed from compulsory health insurance contributions and partly from the Federation's budget. It pays for the services on its list, the medicines on its medicines list, and treatment abroad under a rulebook.\n\nCancer medicines are the first group on the list. The decision on the list adopted by the Government of the Federation on 27 June 2019 (Official Gazette of the Federation 47/19, amended in 2019, 2023 and 2024) has a section of cytostatics and a section of cytostatics with a special prescribing regime, which include trastuzumab and pertuzumab for HER2-positive breast cancer, nivolumab for advanced melanoma, and pembrolizumab for non-small cell lung cancer with PD-L1 expression of 50% or more. Expert committees approve the special-regime medicines: one for breast and lung cancer, one for other cancers, one for metastatic melanoma, a haematology committee, and a committee for children's cancers treated abroad. The Institute also publishes running lists of medicines whose supply has been temporarily or permanently interrupted.",
    programs: ["Solidarity Fund of the Federation of BiH (since 1 July 2002)", "Solidarity Fund medicines list, including cytostatics", "Committees for cytostatics with a special prescribing regime", "Treatment abroad, including children's cancers"],
    institutions: ["zzjz-fbih", "kcus-sarajevo"],
    cancers: ["breast-cancer", "lung-cancer"],
    links: [
      { label: "ZZOR FBiH: about us", url: ZZO_ABOUT },
      { label: "ZZOR FBiH: Solidarity Fund", url: ZZO_FS },
      { label: "Decision on the Solidarity Fund medicines list, Official Gazette of the Federation 47/19 (PDF)", url: ZZO_LIST },
    ] }),

  i({ id: "fzo-republika-srpska", name: "Health Insurance Fund of Republika Srpska", aka: ["FZO RS", "Fond zdravstvenog osiguranja Republike Srpske"],
    city: "Banja Luka", country: "BA", lat: 44.772, lng: 17.184, institutionType: "government", website: "https://zdravstvo-srpske.org",
    tldr: "The compulsory health insurer of Republika Srpska. Its guide for people with cancer says it pays for cancer treatment in full, with no co-payment for care related to the cancer, more than 80 cytostatics in hospitals and over 120 medicines in its medicines programme.",
    summary: "The Fund's guide to the rights of insured people with malignant disease says the Fund fully finances the treatment of cancer within compulsory health insurance. People with cancer are exempt from co-payment for services related to the cancer and its complications (ICD-10 codes C00 to C99, D00 to D09, Z51.0 and Z51.1), but not for unrelated care. The coordinates are an approximate Banja Luka point.\n\nThe guide lists more than 80 cytostatics given in hospitals on the recommendation of an oncology board, with a refund at the price paid if a listed cytostatic is missing and the patient buys it; five prescription medicines for breast and prostate cancer on List A; and a medicines programme of more than 120 medicines, in which innovative therapies are available to a limited number of patients on the proposal of the University Clinical Centre of Republika Srpska. Treatment in Serbia, and abroad where needed, is also funded on that centre's proposal.\n\nThe guide says radiotherapy has been available without waiting since 2010, thanks to the opening of a Centre for radiotherapy in Banja Luka, with accommodation at the Dr Miroslav Zotović institute and transport for patients from distant areas. People with suspected cancer have priority for outpatient MRI and CT at 25 contracted institutions. Since 2020 people with cancer who are not employed can be insured on the basis of their illness, and since 2022 the law pays full salary during sick leave for cancer, and to parents caring for a child with cancer. From 2025 the Fund pays for colorectal cancer screening in health centres.",
    programs: ["Compulsory health insurance in Republika Srpska", "Co-payment exemption for cancer care", "Cytostatics list and medicines programme", "Colorectal cancer screening in health centres (from 2025)"],
    institutions: ["phi-republika-srpska"],
    cancers: ["breast-cancer", "prostate", "colorectal"],
    links: [
      { label: "FZO RS: guide to the rights of people with malignant disease (PDF, Cyrillic)", url: FZO_GUIDE },
      { label: "FZO RS: home page", url: "https://zdravstvo-srpske.org/" },
    ] }),

  i({ id: "kcus-sarajevo", name: "Clinical Centre University of Sarajevo (KCUS)", aka: ["KCUS", "Klinički centar Univerziteta u Sarajevu", "University Clinical Centre Sarajevo", "KCUS Clinic of Oncology"],
    city: "Sarajevo", country: "BA", lat: 43.866, lng: 18.394, institutionType: "hospital", website: "https://kcus.ba",
    tldr: "The university hospital in Sarajevo, whose Clinic of Oncology gives chemotherapy and radiotherapy and keeps a hospital cancer registry. It posts each week which of the 89 cytostatics on its list are out of stock.",
    summary: "The Clinic of Oncology at the Clinical Centre University of Sarajevo, Bolnička 25, has three departments (medical oncology, radiotherapy, and an outpatient department with a day hospital), 73 beds and 89 staff, 25 of them doctors, and keeps a hospital registry of malignant diseases. Radiotherapy and outpatient chemotherapy run from 8 am to 8 pm. The coordinates are approximate.\n\nThe clinic says it began stereotactic radiosurgery in March 2019, with a team of radiation oncologist, neurosurgeon and radiologist formed in May 2019, offers SBRT for lung and liver cancer and IMRT and VMAT techniques, installed a 4D CT simulator in January 2020, and installed a new-generation brachytherapy unit, which it says was the first of its kind in the region, with 3D planning and anaesthetic support for inoperable gynaecological cancers. It was accredited by the Federation's Agency for Quality and Accreditation in Health Care (AKAZ) in November 2022, and opened a nutrition counselling service for patients in November 2023. The IAEA's DIRAC database, read on 11 November 2026, lists 5 megavoltage units in Sarajevo (4 linear accelerators and 1 cobalt-60) and 2 brachytherapy units, last updated in 2024.\n\nEach week the clinic posts the state of its cytostatics: on 9 November 2026 it had 89 on its list, of which pemetrexed, lomustine, letrozole and ifosfamide were missing. A 2026 study of breast cancers diagnosed there from 2019 to 2023, which describes it as managing about 60% of cases in the Federation, found 62.4% diagnosed at stage 1 or 2.",
    programs: ["Clinic of Oncology: medical oncology, radiotherapy and day hospital", "Hospital registry of malignant diseases", "Stereotactic radiosurgery and SBRT (from 2019)", "Weekly public notice of cytostatics in stock"],
    institutions: ["zzo-fbih", "zzjz-fbih", "almbih", "iaea"],
    cancers: ["breast-cancer", "lung-cancer"],
    keyPapers: ["paper-beslija-breast-cancer-bih-scirep-2026"],
    links: [
      { label: "KCUS: Clinic of Oncology", url: KCUS_ONK },
      { label: "KCUS: state of cytostatics, 9 November 2026", url: KCUS_CIT },
      { label: "IAEA DIRAC: radiotherapy centres by country", url: "https://dirac.iaea.org/Data/CountriesLight" },
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-beslija-breast-cancer-bih-scirep-2026", name: "Breast cancer in Bosnia and Herzegovina: diagnosis, treatment and survival at the Sarajevo clinical centre, 2019 to 2023",
    journal: "Scientific Reports", year: 2026, doi: "10.1038/s41598-026-54863-9", pmid: "42236771", authors: "Bešlija S, Sokolović E, Cerić T, et al.", paperType: "observational",
    tldr: "In women diagnosed with breast cancer at the Clinical Centre University of Sarajevo in 2019 to 2023, 62.4% of cancers were found at stage 1 or 2, diagnosis took 70 days on average from first symptom, and three-year overall survival was 86%.",
    summary: "Published as \"Breast cancer in Bosnia and Herzegovina: real-world patterns of diagnosis, treatment, and survival outcomes\". A retrospective analysis of breast cancers diagnosed between 2019 and 2023 at the Clinical Centre University of Sarajevo, which the authors describe as the largest cancer centre in the country, managing about 60% of cases in the Federation of Bosnia and Herzegovina. The authors present it as the first real-world evidence from the country on diagnostic and treatment intervals, adherence and survival.",
    findings: [
      "78.1% (95% CI 73.8 to 82.3) of women were diagnosed after referring themselves with symptoms; 62.4% of cancers were at stage 1 or 2.",
      "The mean patient interval was 38.1 days and the mean system interval 38.6 days, a total diagnostic interval of 70 days (95% CI 58.9 to 82.5).",
      "Radical mastectomy was performed in 61% of women having surgery, and in 55% of those with stage 1 or 2 disease.",
      "Compliance was 99.5% for radiotherapy and 78% for chemotherapy; three-year progression-free survival was 85.7% and overall survival 86%.",
    ],
    whatItMeans: "Most breast cancers in this centre were found because women noticed symptoms rather than through screening, and most were still found at stage 1 or 2; more than half of the women with early cancers had a radical mastectomy.",
    caveats: ["One centre, in the Federation; Republika Srpska is not covered.", "Retrospective; three-year survival is an average for this group, not a forecast for any one woman."],
    institutions: ["kcus-sarajevo"], cancers: ["breast-cancer"],
    links: [doi("10.1038/s41598-026-54863-9", "Sci Rep 2026"), pubmed("42236771")] }),

  p({ id: "paper-vukovic-cervical-cancer-serbia-bih-medicina-2024", name: "Cervical cancer incidence and mortality by administrative unit in Serbia and Bosnia and Herzegovina, 2016 to 2020",
    journal: "Medicina (Kaunas)", year: 2024, doi: "10.3390/medicina60121987", pmid: "39768867", authors: "Vuković V, Štrbac M, Ristić M, et al.", paperType: "observational",
    tldr: "From 2016 to 2020 the age-standardised rate of new cervical cancers was 12.48 per 100,000 women in the Federation of Bosnia and Herzegovina and 22.44 in Republika Srpska; areas where each gynaecologist covered a larger area had higher rates.",
    summary: "Published as \"Relationship Between Population Density, Availability of Gynecological Services, and Cervical Cancer Incidence and Mortality Across Administrative Units in Serbia and Bosnia and Herzegovina During 2016-2020\". An ecological study using aggregated registry and mortality data from Serbia, the Federation of Bosnia and Herzegovina and Republika Srpska, with rates standardised to the world population.",
    findings: [
      "Average age-standardised incidence per 100,000 women was 19.28 in Serbia, 12.48 in the Federation of Bosnia and Herzegovina and 22.44 in Republika Srpska.",
      "Mortality per 100,000 women was 6.67, 5.22 and 4.56 respectively.",
      "Incidence was moderately negatively correlated with population density (rho -0.465) and positively with the area covered per gynaecologist (rho 0.534).",
    ],
    whatItMeans: "Cervical cancer rates differ between the two entities and between districts, and rates are higher where each gynaecologist covers a larger area.",
    caveats: ["Ecological data: associations between areas, not causes for individual women.", "Only the abstract was read; how each registry's completeness was checked is not stated there."],
    institutions: ["zzjz-fbih", "phi-republika-srpska"], cancers: ["cervical"],
    links: [doi("10.3390/medicina60121987", "Medicina (Kaunas) 2024"), pubmed("39768867")] }),
];

/** Records behind /countries/ba/ (wave 11). */
export const recordsBA: EntityInput[] = [...institutions, ...papers];
