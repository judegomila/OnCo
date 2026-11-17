import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Fiji: the public bodies and papers behind /countries/fj/ (wave 16) that the corpus did not hold. Each was written
 * from its own primary source, read raw on 16 November 2026: the Ministry of Health and Medical Services' page for the
 * Fiji Medicines Regulatory Authority and for the Fiji Pharmaceutical and Biomedical Services Centre (HTML text), and
 * the summary of the imPACT Review of February 2023 by the IAEA, WHO and IARC (PDF text). DOIs were resolved through
 * Europe PMC and the figures in `findings` are taken from the indexed abstracts, except for Naidu et al. 2025, whose
 * counts were read from the open-access full text through Europe PMC.
 *
 * Inbound links: both institutions link the existing Ministry record (fiji-ministry-of-health) and are listed on the
 * country page; the papers are linked from the country page and through keyPapers.
 * Coordinates are approximate Suva city points, not building positions.
 */
const asOf = "2026-11-16";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const FIJI_MRA = "https://www.health.gov.fj/fiji-mra/";
const FPBS = "https://www.health.gov.fj/fiji-pharmaceutical-biomedical-services-centre-fpbs/";
const IMPACT_2023 = "https://www.iaea.org/sites/default/files/documents/review-missions/impact-review-fiji-feb2023.pdf";

const institutions: InstitutionInput[] = [
  i({ id: "fiji-medicines-regulatory-authority", name: "Fiji Medicines Regulatory Authority (Fiji MRA)", aka: ["Fiji MRA", "Fiji Medicines Regulatory Authority", "Fiji medicines regulator"],
    city: "Suva", country: "FJ", lat: -18.142, lng: 178.442, institutionType: "government", website: FIJI_MRA,
    tldr: "Fiji's medicines regulator, part of the Ministry of Health and Medical Services. Under the Medicinal Products Act 2011 it manages the registration of medicines, issues import permits, inspects premises and monitors medicine safety.",
    summary: "The Ministry of Health and Medical Services' page says that under the Medicinal Products Act 2011 medicinal products must be registered for import, manufacture, export, sale or distribution in Fiji, and that the Fiji Medicinal Products Board has assigned the Fiji Medicines Regulatory Authority to manage provisional registration through an online portal, which the page says also supports streamlined registration for products already approved in Australia or New Zealand. The authority also prequalifies manufacturers and finished products that supply the government, issues import permits and permits for controlled substances, inspects premises that manufacture, store, distribute or sell medicines, processes licences for importers and wholesalers, registers and licenses pharmacists, monitors medicine safety and conducts drug testing, and provides the secretariat for the Fiji Medicinal Products Board and the Fiji Pharmacy Profession Board. The page says Australia supports the authority through the Pacific Medicines Testing Program and the Indo-Pacific Regulatory Strengthening Program. It sits within the Fiji Pharmaceutical and Biomedical Services Centre, which also runs the Free Medicine Scheme. The coordinates are an approximate Suva city point.",
    programs: ["Provisional registration of medicinal products", "Prequalification of manufacturers and products supplying the government", "Import permits", "Inspection and licensing", "Adverse drug reaction reporting"],
    institutions: ["fiji-ministry-of-health"],
    links: [
      { label: "Ministry of Health and Medical Services: Fiji Medicines Regulatory Authority", url: FIJI_MRA },
      { label: "Ministry of Health and Medical Services: Fiji Pharmaceutical and Biomedical Services Centre", url: FPBS },
    ] }),

  i({ id: "colonial-war-memorial-hospital-suva", name: "Colonial War Memorial Hospital, Suva", aka: ["CWM Hospital", "CWMH"],
    city: "Suva", country: "FJ", lat: -18.137, lng: 178.433, institutionType: "hospital",
    tldr: "The divisional hospital in Suva and Fiji's national referral centre for complex cancer cases. It gives limited chemotherapy, treats childhood cancer and has a pain management team; it has no radiotherapy.",
    summary: "The summary of the imPACT Review carried out in February 2023 by the IAEA, WHO and IARC says limited chemotherapy is administered at Fiji's three divisional hospitals, and that Colonial War Memorial Hospital is the national referral centre for complex cases and leads the review of cases between hospitals. It is one of Fiji's two centres for childhood cancer, with Lautoka Hospital; together they manage 45 to 50 new childhood cancers a year using a shared Pacific protocol, with remote and in-country support from Christchurch, New Zealand. The review notes a dedicated pain management team at the hospital with a trained palliative care clinician, and an agreement with North Shore Hospital in Auckland that offers training for surgeons. The review states that radiation oncology services are not available in Fiji. The coordinates are an approximate Suva city point.",
    programs: ["Oncology unit: limited chemotherapy", "National referral centre for complex cancer cases", "Childhood cancer service", "Pain management team"],
    institutions: ["fiji-ministry-of-health"],
    cancers: ["childhood-cancers", "breast-cancer", "cervical"],
    links: [{ label: "IAEA, WHO and IARC: imPACT Review of Fiji, February 2023, summary (PDF)", url: IMPACT_2023 }] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-naidu-cancer-epidemiology-fiji-apjph-2025", name: "Epidemiology of Cancer in the Fiji Islands: 2010 to 2018",
    journal: "Asia-Pacific Journal of Public Health", year: 2025, doi: "10.1177/10105395241306488", pmid: "39873332", authors: "Naidu CK, Wiseman N, Nand D, Harris N", paperType: "observational",
    tldr: "An analysis of the Fiji Ministry of Health's cancer data for 2010 to 2018, which recorded 12,433 cancers and 5,963 deaths. Breast, cervical and endometrial cancer led in women, and prostate, liver and lung cancer in men.",
    summary: "The authors, from Griffith University and Fiji's Ministry of Health and Medical Services, analysed secondary data from the Ministry's Data Analysis and Management Unit for 2010 to 2018. The full text explains that the unit compiles cancer data from pathology reports, the hospital records system and other sources into its own database, which serves instead of a dedicated cancer registry, that the data do not capture stage at diagnosis, and that treatment outcomes are poorly documented. Fijian rules on disclosure meant ethnicity could not be analysed.",
    findings: ["12,433 cancers were reported over 2010 to 2018, 8,457 in women and 3,965 in men, with 5,963 deaths (3,753 women, 2,210 men). The two incidence counts by sex add up to 12,422, eleven short of the paper's total.", "The top three cancers by incidence in women were breast, cervical and endometrial; in men, prostate, liver and lung.", "Over the nine years there were 2,231 breast cancers and 2,043 cervical cancers, and 1,122 cancers of ill-defined or unknown site.", "The abstract says the central division had higher incidence rates and the northern division a disproportionately higher mortality rate; the full text's description of its incidence map says the reverse for incidence, with the northern division highest and the central lowest."],
    whatItMeans: "It is a published count of cancers from Fiji's own records for 2010 to 2018, and it shows what a full registry would need to add: stage and outcome.",
    caveats: ["The authors say the study has limitations due to data quality.", "Recorded cases, not a population-based registry's verified incidence."],
    cancers: ["breast-cancer", "cervical"], institutions: ["fiji-ministry-of-health"], links: [doi("10.1177/10105395241306488", "DOI"), pubmed("39873332")] }),

  p({ id: "paper-reyburn-single-dose-hpv-fiji-lanwpc-2023", name: "A single dose of quadrivalent HPV vaccine is highly effective against HPV genotypes 16 and 18 detection in young pregnant women eight years following vaccination: an retrospective cohort study in Fiji",
    journal: "The Lancet Regional Health. Western Pacific", year: 2023, doi: "10.1016/j.lanwpc.2023.100798", pmid: "37359996", authors: "Reyburn R, Tuivaga E, Ratu T, et al.", paperType: "observational", participants: 822,
    tldr: "Eight years after Fiji's 2008 and 2009 HPV vaccination campaign, a single dose of the quadrivalent vaccine was 81% effective against HPV 16 and 18 in 822 young pregnant women.",
    summary: "In 2008 and 2009 Fiji vaccinated more than 30,000 girls aged 9 to 12 with the quadrivalent HPV vaccine; coverage for at least one dose was over 60%, with 14% receiving one dose only, 13% two and 35% three. This retrospective cohort study, run from 2015 to 2019, enrolled pregnant women aged 23 or under who had been eligible for the vaccine and whose vaccination status was confirmed, a median of eight years after vaccination. It was funded by the Bill and Melinda Gates Foundation and the Australian Government.",
    findings: ["HPV 16 or 18 was detected in 13.3% (50 of 376) of unvaccinated women, 2.5% (4 of 158) after one dose, 0% (0 of 99) after two and 1.6% (3 of 189) after three.", "Adjusted vaccine effectiveness against HPV 16 and 18 was 81% for one dose (95% CI 48 to 93), 100% for two and 89% for three (95% CI 64 to 96).", "Detection of non-vaccine high-risk types was similar across the groups (33.2% to 40.4%)."],
    whatItMeans: "One dose of HPV vaccine gave lasting protection against the two types that cause most cervical cancers, in a Pacific island setting.",
    caveats: ["Restricted to pregnant women, because of the cultural sensitivity of asking about sexual behaviour in Fiji.", "Retrospective, and it measured HPV infection, not cervical disease."],
    cancers: ["cervical"], technologies: ["hpv-vaccine"], institutions: ["fiji-ministry-of-health"], links: [doi("10.1016/j.lanwpc.2023.100798", "DOI"), pubmed("37359996")] }),

  p({ id: "paper-kim-radiotherapy-cost-benefit-fiji-cancerepidemiol-2017", name: "Cost-benefit analysis of establishing and operating radiation oncology services in Fiji",
    journal: "Cancer Epidemiology", year: 2017, doi: "10.1016/j.canep.2017.02.008", pmid: "29120832", authors: "Kim E, Cho YM, Kwon S, Park K", paperType: "methods",
    tldr: "A cost-benefit model of a radiotherapy centre for Fiji over 2021 to 2035 found it worthwhile if a year of life is valued at national income per person (benefit-cost ratio 1.04) and not if valued at the minimum wage (0.69).",
    summary: "The authors, from Seoul National University and WHO's Division of Pacific Technical Support in Suva, note that the Government of Fiji had recognised rising demand for cancer services as a national health priority and that attention had turned to the lack of radiotherapy. They estimated the costs and benefits of introducing radiation oncology services from a societal perspective over 15 years, 2021 to 2035, in 2016 values, using earlier studies, expert opinion and field visits to Fiji in January 2016.",
    findings: ["Valuing a life-year at the national minimum wage, the net benefit was minus FJD 31,624,421 (benefit-cost ratio 0.69).", "Valuing a life-year at gross national income per person, the net benefit was FJD 3,975,684 (ratio 1.04).", "A pessimistic scenario gave a ratio of 0.46 and an optimistic one 1.20."],
    whatItMeans: "Whether a radiotherapy centre in Fiji pays for itself depends on how a year of life is valued; the authors conclude it would be cost-beneficial on the income measure.",
    caveats: ["A model built on assumptions from other studies and expert opinion.", "Written before any centre was built, with 2016 prices."],
    links: [doi("10.1016/j.canep.2017.02.008", "DOI"), pubmed("29120832")] }),

  p({ id: "paper-kunatoga-cervical-screening-fiji-heliyon-2024", name: "Prevalence and trends of cervical cancer screening among women in Fiji from 2014 to 2018",
    journal: "Heliyon", year: 2024, doi: "10.1016/j.heliyon.2024.e30220", pmid: "38707371", authors: "Kunatoga A, Mohammadnezhad M, Khan S, Naeem P, Nusair P", paperType: "observational", participants: 39579,
    tldr: "At the Women's Wellness Clinic in Suva, 12,074 of the 39,579 women who attended from 2014 to 2018 were screened for cervical cancer, 30.5%.",
    summary: "A five-year retrospective review of electronic records for all women attending the Women's Wellness Clinic in Suva, Fiji, from 2014 to 2018. The women included were Fijian citizens over 18 registered at the clinic.",
    findings: ["Of 39,579 women attending the clinic, 12,074 were screened for cervical cancer (30.5%).", "The mean age of the women screened was 37.6 years; 76.4% were under 46 and 53.9% were iTaukei.", "The share having a Pap smear rose in 2015, dipped in 2016 and reached 35.1% in 2018."],
    whatItMeans: "Even among women already attending a women's health clinic in the capital, fewer than a third had cervical screening.",
    caveats: ["One clinic in Suva, so it does not measure national coverage.", "Retrospective records review."],
    cancers: ["cervical"], links: [doi("10.1016/j.heliyon.2024.e30220", "DOI"), pubmed("38707371")] }),
];

/** Records behind /countries/fj/ (wave 16). */
export const recordsFJ: EntityInput[] = [...institutions, ...papers];
