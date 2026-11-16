import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Myanmar: the public bodies, patient groups and papers behind /countries/mm/ (wave 5) that the corpus did not hold.
 * Each was written from its own source, read raw on 11 November 2026: the Department of Food and Drug Administration's
 * own "About" page (fda.gov.mm), the UICC membership pages of the two patient groups (read through Internet Archive
 * copies, because uicc.org refused a scripted request), and six papers whose DOIs and PubMed ids were resolved through
 * Europe PMC, with figures taken from the indexed abstract or, where the paper is open access, from its full text in
 * Europe PMC. Nothing here is taken from a summary of a page.
 *
 * Since February 2021, when the military took power (OCHA calls it "the military take-over of 2021"), Myanmar's public
 * health system has been disrupted by conflict. These records state what their sources state and attribute it; they
 * name the Ministry of Health as the regulator's own site and the registry paper's affiliations name it.
 *
 * Inbound links: the registry and the regulator link to each other, the two patient groups link to each other, the
 * registry links its papers through keyPapers, and the three papers on the health system since 2021 link to each other
 * through `related`. Coordinates are city points, not buildings.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });
const epmc = (pmcid: string) => ({ label: "Europe PMC full text", url: `https://europepmc.org/article/PMC/${pmcid}` });

const FDA_ABOUT = "https://www.fda.gov.mm/?p=214";
const UICC_PINK = "https://web.archive.org/web/20220708223651/https://www.uicc.org/membership/pun-yaung-hnin-si-pink-rose-breast-cancer-patients-support-group";
const UICC_SHWE = "https://web.archive.org/web/20260509200041/https://www.uicc.org/membership/shwe-yaung-hnin-si-cancer-foundation";

const institutions: InstitutionInput[] = [
  i({ id: "nay-pyi-taw-cancer-registry", name: "Nay Pyi Taw Cancer Registry (population-based), Myanmar", aka: ["Nay Pyi Taw Population-Based Cancer Registry", "NPT PBCR", "Naypyidaw PBCR"],
    city: "Nay Pyi Taw", country: "MM", lat: 19.745, lng: 96.129, institutionType: "government",
    tldr: "A population-based cancer registry for the Nay Pyi Taw Union Territory, about 1.16 million people, based at Nay Pyi Taw General Hospital (1000 bedded). It recorded 5,952 new cancers and 1,874 cancer deaths in 2013 to 2017; its team wrote that Myanmar had no population-based cancer estimates before.",
    summary: "The registry's team, writing in the Asian Pacific Journal of Cancer Prevention in 2022, give their affiliation as the Nay Pyi Taw Cancer Registry, Nay Pyi Taw General Hospital (1000 Bedded), Department of Medical Services, Ministry of Health. They report that an International Atomic Energy Agency review, carried out with WHO and IARC under the Agency's Programme of Action for Cancer Therapy, found cancer registration to be Myanmar's top priority and recommended starting a population-based registry in Nay Pyi Taw as a first step before expanding to other states and regions, and that the registry's initial funding came from IARC under a collaborative research agreement. Staff collect cases actively from every hospital and laboratory in the territory and from death certificates held by the Central Statistical Organization's vital registration unit, and also from Yangon General Hospital, Mandalay General Hospital and other centres outside the territory, and analyse them in CanReg5. The paper states that before it there were no population-based cancer incidence and mortality estimates for Myanmar.\n\nFor 2013 to 2017 the registry counted 5,952 new cancers, 2,835 in men and 3,117 in women, and 1,874 cancer deaths. Age-standardised incidence for all sites excluding non-melanoma skin cancer was 125.9 per 100,000 men and 107.3 per 100,000 women. The commonest cancers were lung, liver and mouth and pharynx in men and breast, cervix and lung in women; liver cancer caused the most cancer deaths. The authors name their own data-quality limits: 61.44% of men's and 71.04% of women's cases were morphologically verified, and 16.08% and 15.15% were known only from a death certificate.\n\nA second regional registry, the Yangon population-based cancer registry, covered about 7.3 million people from 2018 to 2020 according to a 2025 review; its executive report for 2018, prepared with Vital Strategies, was not found online. The coordinates are a Nay Pyi Taw city point.",
    programs: ["Population-based cancer registration, Nay Pyi Taw Union Territory (from 2013)", "Initial funding from IARC under a collaborative research agreement"],
    institutions: ["myanmar-fda", "iarc", "iaea"],
    keyPapers: ["paper-shwe-nay-pyi-taw-cancer-registry-2022", "paper-win-hpv-cervical-cancer-myanmar-review-2025", "paper-thinn-cervical-screening-myanmar-2023"],
    cancers: ["lung-cancer", "hcc", "breast-cancer", "cervical"], related: ["cancer-registries-surveillance"],
    links: [
      { label: "Shwe KM et al., Nay Pyi Taw population-based cancer registry, APJCP 2022", url: "https://doi.org/10.31557/apjcp.2022.23.1.311" },
      epmc("PMC9258644"),
    ] }),

  i({ id: "myanmar-fda", name: "Department of Food and Drug Administration, Myanmar", aka: ["Food and Drug Administration, Myanmar", "FDA Myanmar", "Myanmar FDA"],
    city: "Nay Pyi Taw", country: "MM", lat: 19.76, lng: 96.12, institutionType: "government", website: FDA_ABOUT,
    tldr: "Myanmar's regulator for medicines, food, medical devices and cosmetics, a department of the Ministry of Health with its headquarters in Nay Pyi Taw. It grants marketing authorisation for new medicines and monitors adverse drug reactions.",
    summary: "The department's own page says the Food and Drug Administration was set up in 1995 as a division of the Department of Health and became a separate department in April 2013, with headquarters in Nay Pyi Taw and five divisions: administration, drug control, food control, cosmetic and medical device control, and laboratory. Its Yangon and Mandalay branches remain its major branches, and it has added branches in other regions and states and at border trade posts including Muse, Kalthaung, Myawaddy and Tamu, as the page spells them.\n\nThe same page lists its drug control work as marketing authorisation for new products, variations to existing authorisations, quality control testing, adverse drug reaction monitoring, Good Manufacturing Practice inspection, licensing of manufacturers and wholesalers, enforcement, and control of drug promotion and advertising. Its contact page names its parent as the Ministry of Health. Most of its regulations, guidelines and notices are published in Burmese. No English description of its registration routes for cancer medicines, of any reliance on other regulators' approvals, or of approval times was found on its site on 11 November 2026. The coordinates are a Nay Pyi Taw city point.",
    programs: ["Marketing authorisation of medicines", "Adverse drug reaction monitoring", "Good Manufacturing Practice inspection and licensing", "Medical device and cosmetic notification"],
    institutions: ["nay-pyi-taw-cancer-registry"], related: ["global-oncology-access"],
    links: [
      { label: "Department of Food and Drug Administration: About FDA", url: FDA_ABOUT },
    ] }),

  i({ id: "pink-rose-breast-cancer-support-group-myanmar", name: "Pun Yaung Hnin Si (Pink Rose) Breast Cancer Patients Support Group", aka: ["Pink Rose Breast Cancer Patients Support Group", "Pun Yaung Hnin Si"],
    city: "Yangon", country: "MM", lat: 16.775, lng: 96.17, institutionType: "consortium",
    tldr: "A breast cancer patients' support group in Yangon and a full member of the Union for International Cancer Control. It states two aims: to help and support breast cancer patients and to take part in community breast awareness programmes for early detection.",
    summary: "The Union for International Cancer Control lists Pun Yaung Hnin Si (Pink Rose) Breast Cancer Patients Support Group as a full member, with an address in Botahtaung Township, Yangon. Its membership entry gives two aims: \"To help and support breast cancer patients\" and \"To involve in community breast cancer awareness programs for early detection\". The entry was last updated on 7 July 2022 and was read through an Internet Archive copy, because uicc.org refused a scripted request on 11 November 2026; no website of the group's own was found. The coordinates are a Yangon city point.",
    programs: ["Support for breast cancer patients", "Community breast cancer awareness for early detection"],
    institutions: ["shwe-yaung-hnin-si-cancer-foundation", "uicc"], cancers: ["breast-cancer"],
    links: [{ label: "UICC membership entry (Internet Archive copy, July 2022)", url: UICC_PINK }] }),

  i({ id: "shwe-yaung-hnin-si-cancer-foundation", name: "Shwe Yaung Hnin Si Cancer Foundation", aka: ["Shwe Yaung Hnin Si Myanmar Cancer Foundation"],
    city: "Yangon", country: "MM", lat: 16.78, lng: 96.18, institutionType: "consortium", website: "http://shweyaunghninsi-myanmarcf.org",
    tldr: "A cancer foundation in Yangon and a full member of the Union for International Cancer Control, whose stated mission is to improve awareness of cancer prevention and early detection.",
    summary: "The Union for International Cancer Control lists Shwe Yaung Hnin Si Cancer Foundation as a full member, with an address in Pazundaung Township, Yangon, and the website shweyaunghninsi-myanmarcf.org. Its membership entry states its mission as \"Dedicated to improve awareness on prevention and early detection of cancer.\" The entry was read through an Internet Archive copy of May 2026, because uicc.org refused a scripted request on 11 November 2026; the foundation's own site was not read. The coordinates are a Yangon city point.",
    programs: ["Awareness of cancer prevention and early detection"],
    institutions: ["pink-rose-breast-cancer-support-group-myanmar", "uicc"],
    links: [{ label: "UICC membership entry (Internet Archive copy, May 2026)", url: UICC_SHWE }] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-shwe-nay-pyi-taw-cancer-registry-2022", name: "Cancer incidence and mortality in central Myanmar: report of the Nay Pyi Taw population-based cancer registry",
    journal: "Asian Pacific Journal of Cancer Prevention", year: 2022, doi: "10.31557/apjcp.2022.23.1.311", pmid: "35092400", authors: "Shwe KM, Win SM, Thant AN, et al.", paperType: "observational",
    tldr: "Population-based cancer figures for Myanmar, which its authors write the country had not had before: 5,952 new cancers and 1,874 cancer deaths among the 1.16 million people of the Nay Pyi Taw Union Territory in 2013 to 2017, led by lung, breast and liver cancer.",
    summary: "Published as \"Cancer Incidence and Mortality in Central Myanmar: Report of Nay Pyi Taw Population-Based Cancer Registry\". The registry team collected new cancers actively and passively from all data sources in the Nay Pyi Taw Union Territory, whose population at the 2014 census was 1,160,242, and analysed them in CanReg5, reporting counts, cumulative risk and age-standardised rates per 100,000. The authors write that before this report there were no population-based cancer incidence and mortality estimates for Myanmar, and that GLOBOCAN's estimates for the country had been extrapolated from registries in neighbouring countries, mainly India and Thailand.",
    findings: [
      "5,952 new cancers (2,835 men, 3,117 women) and 1,874 cancer deaths were recorded in 2013 to 2017.",
      "Age-standardised incidence for all sites excluding non-melanoma skin cancer was 125.9 per 100,000 men and 107.3 per 100,000 women.",
      "In men the commonest cancers were lung (18.1%, ASR 26.2), liver (14.8%, ASR 17.9) and mouth and pharynx (13%, ASR 15.8); in women breast (21.2%, ASR 22.4), cervix (13.0%, ASR 14.1) and lung (10.3%, ASR 12.1).",
      "Liver cancer caused the most cancer deaths (20.8%), followed by lung (15.7%) and mouth and pharynx (9.3%).",
      "61.44% of men's and 71.04% of women's cases were morphologically verified; 16.08% and 15.15% were known only from a death certificate.",
    ],
    whatItMeans: "It gives Myanmar measured, rather than extrapolated, cancer rates for one territory, and the authors read the pattern as showing a significant proportion of tobacco-related and infection-related cancers: lung, liver and mouth and pharynx cancers lead in men. It covers one territory around the capital, not the country.",
    caveats: ["One union territory of about 1.16 million people; rates elsewhere in Myanmar differ.", "The authors report death registration completeness below 60% nationally, and a high share of cases known only from death certificates.", "The series ends in 2017, before the 2021 military takeover."],
    institutions: ["nay-pyi-taw-cancer-registry"], cancers: ["lung-cancer", "hcc", "breast-cancer", "cervical"], related: ["cancer-registries-surveillance"],
    links: [doi("10.31557/apjcp.2022.23.1.311", "APJCP 2022"), pubmed("35092400"), epmc("PMC9258644")] }),

  p({ id: "paper-win-hpv-cervical-cancer-myanmar-review-2025", name: "A review of human papillomavirus prevalence and cervical cancer in Myanmar",
    journal: "Journal of Epidemiology and Global Health", year: 2025, doi: "10.1007/s44197-025-00436-4", pmid: "40560256", authors: "Win TZK, Simms K, Thinn MM, et al.", paperType: "review",
    tldr: "A systematic review of cervical cancer and human papillomavirus in Myanmar, drawing on the two regional cancer registries, estimating that 4% of women screened in the community, and 11% of women attending outpatient clinics, carry the virus.",
    summary: "Published as \"A Review of Human Papillomavirus Prevalence and Cervical Cancer in Myanmar\". The authors searched Embase, Global Health, Medline and local databases to 31 May 2024 for observational studies of the virus, precancerous lesions, co-factors and cervical cancer in Myanmar, and pooled prevalence studies by meta-analysis. The full text describes the Yangon population-based cancer registry as covering about 7.3 million people from 2018 to 2020, and the Nay Pyi Taw registry as covering about 1.16 million since 2013, and reports that only 4% of eligible women had ever been screened in 2019 according to WHO.",
    findings: [
      "The two regional registries reported age-standardised cervical cancer incidence of 14.1 per 100,000 women in Nay Pyi Taw (2013 to 2017) and 19.3 in Yangon (2018), where breast (32.7) and lung cancer (21.7) were more common.",
      "Pooled prevalence of the virus was 4% (95% CI 3 to 5%) in community-based screening of women aged 18 to 65, and 11% (4 to 21%) in outpatient clinic screening; 30.1% among women living with HIV.",
      "Types 16 (60 to 85.7%) and 18 (14.8 to 20%) were the commonest in cervical cancers.",
      "Co-factors included smokeless tobacco use by 24.1% of women and smoking by 8.4%.",
    ],
    whatItMeans: "The review sets out what is known about cervical cancer and human papillomavirus in Myanmar, and how little screening there had been by 2019.",
    caveats: ["The abstract's sentence on registry rates pairs the Nay Pyi Taw and Yangon figures the other way round from the full text; the figures here follow the full text and the Nay Pyi Taw registry's own paper.", "Most included studies predate 2021."],
    institutions: ["nay-pyi-taw-cancer-registry"], cancers: ["cervical"], related: ["paper-thinn-cervical-screening-myanmar-2023"],
    links: [doi("10.1007/s44197-025-00436-4", "J Epidemiol Glob Health 2025"), pubmed("40560256"), epmc("PMC12198088")] }),

  p({ id: "paper-thinn-cervical-screening-myanmar-2023", name: "Current status of cervical cancer prevention and screening in Myanmar",
    journal: "South Asian Journal of Cancer", year: 2023, doi: "10.1055/s-0043-1764212", pmid: "36851926", authors: "Thinn MM, Aung S, Aung A, Tun NM", paperType: "review",
    tldr: "A short commentary by Yangon gynaecological and medical oncologists on how Myanmar introduced vaccination of 9-year-old girls against human papillomavirus in 2020 and began screening for the virus in 2021 and 2022.",
    summary: "Published as a mini commentary, \"Current Status of Cervical Cancer Prevention and Screening in Myanmar\", by clinicians at Yangon Central Women's Hospital and the Universities of Medicine (1) and (2), Yangon. It describes Myanmar's selection in 2017 for the United Nations Global Joint Programme on cervical cancer prevention and control, the screening and treatment guidelines launched in 2018, a National Cervical Cancer Prevention and Control Program from 2019, and the introduction of the vaccine in 2020.",
    findings: [
      "The vaccine against human papillomavirus entered the Expanded Programme on Immunization in 2020 as its 13th new vaccine, for a single age cohort of 9-year-old girls.",
      "Planned as school-based, it was given in the community because schools were closed during the COVID-19 pandemic, and more than 90% of 9-year-old girls received a first dose in 2020.",
      "The 2018 guidelines adopt a hybrid approach: visual inspection with acetic acid where staff allow, testing for the virus, including self-collected samples, in rural areas, and ablative treatment of women who test positive.",
      "Screening planned for 16 townships in 2020 was halted by the pandemic; in late 2021 and early 2022 pilot screening with the careHPV test took place in 9 of 17 states and regions.",
    ],
    whatItMeans: "It records the design and early delivery of Myanmar's cervical cancer programme as described by clinicians involved in it.",
    caveats: ["A commentary, not a systematic study; coverage figures are quoted from other sources.", "It gives Yangon's 2018 cervical cancer rate as 19.5 per 100,000 where a 2025 review gives 19.3."],
    cancers: ["cervical"], related: ["paper-win-hpv-cervical-cancer-myanmar-review-2025", "hpv-vaccine"],
    links: [doi("10.1055/s-0043-1764212", "South Asian J Cancer 2023"), pubmed("36851926"), epmc("PMC9966159")] }),

  p({ id: "paper-thu-hospital-access-conflict-myanmar-2026", name: "Geographical accessibility to hospital care amid armed conflict in Myanmar, 2021 to 2024",
    journal: "BMJ Global Health", year: 2026, doi: "10.1136/bmjgh-2026-024615", pmid: "42680226", authors: "Thu H, Tin KK, Htoo AT", paperType: "observational",
    tldr: "An analysis of Myanmar's 330 townships finding that the conflict after the February 2021 coup fell hardest on people who already lived furthest from a general hospital.",
    summary: "Published as \"Geographical accessibility to hospital care amid armed conflict in Myanmar: a population-weighted analysis of compounding health inequality, 2021-2024\". The authors estimated travel time from every populated square kilometre to the nearest of 68 general hospitals, using the pre-coup facility registry, OpenStreetMap roads and WorldPop 2020, and set it against 35,647 battle and explosion events from the Armed Conflict Location and Event Data Project and 655 attacks on health facilities reported by the Safeguarding Health in Conflict Coalition, quarter by quarter from 2021 to 2024.",
    findings: [
      "Before the coup 5.8 million people (12%) lived more than 2 hours from a general hospital.",
      "People with poor or very poor access who also lived with high or extreme conflict rose from 0.4 million in the first quarter of 2021 to 3.1 million in the first quarter of 2024.",
      "Conflict events were concentrated among people with worse access (concentration index 0.126, 95% CI 0.053 to 0.199); attacks on facilities were not significantly concentrated.",
      "About 8.4 million person-years of this double burden accumulated over 2021 to 2024.",
    ],
    whatItMeans: "For a cancer patient, whose treatment depends on repeated trips to a hospital, the paper measures how conflict has added to distance as a barrier. It is about general hospitals, not cancer centres.",
    caveats: ["Access is held at the pre-coup baseline, so the authors call their estimates optimistic bounds.", "Ecological analysis at township level."],
    related: ["paper-usmany-attacks-on-healthcare-five-conflicts-2025", "paper-than-non-state-actors-myanmar-2024", "global-oncology-access"],
    links: [doi("10.1136/bmjgh-2026-024615", "BMJ Glob Health 2026"), pubmed("42680226"), epmc("PMC13536129")] }),

  p({ id: "paper-usmany-attacks-on-healthcare-five-conflicts-2025", name: "Attacks on healthcare in five conflict-affected countries, 2018 to 2024, from WHO and Safeguarding Health in Conflict Coalition data",
    journal: "Population Health Metrics", year: 2025, doi: "10.1186/s12963-025-00442-5", pmid: "41392142", authors: "Usmany J, Barten DG, Goniewicz K, et al.", paperType: "observational",
    tldr: "A comparison of attacks on health care in Lebanon, Myanmar, the occupied Palestinian territory, Sudan and Ukraine; for Myanmar, WHO's surveillance system recorded 443 attacks from the February 2021 coup to the end of 2024.",
    summary: "Published as \"Attacks on healthcare in conflict-affected countries: a comparison of temporal trends in ongoing conflicts in Lebanon, Myanmar, occupied Palestinian territory, Sudan and Ukraine using WHO SSA and SHCC data, 2018-2024\". The authors took each conflict's start date from grey literature, 1 February 2021 for Myanmar, when they write that a military coup deposed the civilian government, and counted attacks recorded by the WHO Surveillance System for Attacks on Health Care and by the Insecurity Insight Safeguarding Health in Conflict Coalition to 31 December 2024.",
    findings: [
      "For Myanmar the WHO system recorded 443 attacks and the Coalition 1,492.",
      "In the WHO data for Myanmar, attacks killed 108 people and injured 289, and 127 health workers were abducted, 379 arrested and 12 detained.",
      "The most attacks in Myanmar were recorded in the first three months after the coup: 183 in the WHO data and 212 in the Coalition's.",
    ],
    whatItMeans: "It quantifies, from two independent databases, attacks on health workers and facilities in Myanmar after the 2021 coup. It does not measure their effect on cancer care.",
    caveats: ["The two databases differ widely in their counts, and the authors report significant differences for Myanmar.", "Counts are of reported incidents."],
    related: ["paper-thu-hospital-access-conflict-myanmar-2026"],
    links: [doi("10.1186/s12963-025-00442-5", "Popul Health Metr 2025"), pubmed("41392142"), epmc("PMC12822187")] }),

  p({ id: "paper-than-non-state-actors-myanmar-2024", name: "Assessing the role of non-state actors in health service delivery and health system resilience in Myanmar",
    journal: "International Journal for Equity in Health", year: 2024, doi: "10.1186/s12939-024-02292-3", pmid: "39449065", authors: "Than K, Bertone MP, La T, Witter S", paperType: "observational",
    tldr: "A qualitative study of how non-governmental groups, ethnic health organisations and private providers have delivered health care in Myanmar from 2010 to 2022, and how the February 2021 coup halted their collaboration with the government.",
    summary: "Published as \"Assessing the role of non-state actors in health service delivery and health system resilience in Myanmar\". The study combined a review of 22 documents, 14 central key informant interviews and two township case studies with 13 interviews and 4 focus groups, mostly collected in 2022, and analysed them with a health system resilience framework.",
    findings: [
      "Because the public health system was weak and reached little, especially in border areas, non-state providers, including local and international non-governmental organisations, civil society groups, ethnic health organisations and the private sector, have historically played an important role in Myanmar's care.",
      "From 2010 to 2020 the government increasingly recognised them and began a convergence with ethnic health systems.",
      "The authors write that the military coup of February 2021 brought a halt to this progress: collaboration with the government was interrupted and parallel systems returned.",
      "Most service provision first stopped; providers then coped by focusing on basic services, using informal communication and keeping buffer stocks.",
    ],
    whatItMeans: "Providers outside the state system have an important role in Myanmar's care, especially in border areas, and the study describes how they have adapted since 2021. It does not study cancer care.",
    caveats: ["Qualitative, with a small number of interviews collected in 2022."],
    related: ["paper-thu-hospital-access-conflict-myanmar-2026"],
    links: [doi("10.1186/s12939-024-02292-3", "Int J Equity Health 2024"), pubmed("39449065"), epmc("PMC11515364")] }),
];

/** Records behind /countries/mm/ (wave 5). */
export const recordsMM: EntityInput[] = [...institutions, ...papers];
