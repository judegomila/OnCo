import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Guyana: the bodies and papers behind /countries/gy/ (wave 16) that the corpus did not hold. Each was written from
 * its own source, read raw on 16 November 2026: the registry's 2009 paper (open full text at Europe PMC), the Ministry
 * of Health's Action Plan for the Elimination of Cervical Cancer in Guyana 2024-2030 (PDF text), IAEA's note on its
 * imPACT review of December 2018 (PDF text), the Food and Drugs Regulations under Cap. 34:03 (FAOLEX PDF text), the
 * Department of Public Information's report of 14 December 2017 and CARPHA's Caribbean Regulatory System guidance.
 * DOIs were resolved through Europe PMC and the figures in `findings` are taken from the indexed abstracts and, for the
 * registry paper, its open full text.
 *
 * Inbound links: the registry and the Food and Drug Department list each other and the existing Ministry of Health
 * record; the registry lists its own paper, and the two papers list each other through `related`. Coordinates are approximate
 * Georgetown city points, not building positions.
 */
const asOf = "2026-11-16";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const ACTION_PLAN = "https://www.iccp-portal.org/sites/default/files/2026-01/Guyana-Cervical-Cancer-Elimination-Strategy-2024-2030-1.pdf";
const IAEA_IMPACT = "https://iaea.org/sites/default/files/documents/review-missions/guyana_-_2018_impact_review.pdf";
const FD_REGS = "https://faolex.fao.org/docs/pdf/guy211856.pdf";
const DPI_CRS = "https://dpi.gov.gy/guyana-to-adopt-crs-measures-for-procurement-of-pharmaceuticals";
const CRS_FAQ = "https://carpha.org/What-We-Do/CRS/faq";
const PLUMMER = "paper-best-plummer-ethnicity-cancer-guyana-iac-2009";
const MARTIN = "paper-martin-single-visit-cervical-guyana-jogr-2014";

const institutions: InstitutionInput[] = [
  i({ id: "guyana-cancer-registry", name: "Cancer Registry of Guyana", aka: ["Guyana Cancer Registry", "National Cancer Registry (Guyana)"],
    city: "Georgetown", country: "GY", lat: 6.8, lng: -58.16, institutionType: "research-institute",
    tldr: "Guyana's national cancer registry, set up in 2000 as part of the Ministry of Health's disease surveillance. It collects cancer diagnoses from public and private hospitals and laboratories across the country.",
    summary: "A 2009 paper by the registry's staff describes the Cancer Registry of Guyana as a population-based registry established in 2000 and an active part of the Ministry of Health's national disease surveillance system, built on pathologically supported diagnoses abstracted from the records of public and private institutions and laboratories. Its database then held 589 breast, 573 cervical and 525 prostate cancers, analysed by ethnic group. The paper names the registry's difficulties: no Cancer Act making cancer a notifiable disease, cancer omitted from death certificates, and wealthier patients seeking care abroad. The Ministry's 2024 action plan on cervical cancer reports 56, 57, 91 and 68 cervical cancers from the registry for 2020 to 2023. IAEA's note on its December 2018 review says the Ministry planned to strengthen registration. IARC's GLOBOCAN 2024 fact sheet lists no country-specific incidence data for Guyana and models its estimate from mortality. OnCo found no registry report online. The coordinates are an approximate Georgetown city point.",
    programs: ["Cancer registration for Guyana (since 2000)", "Reporting by ethnic group"],
    institutions: ["moh-guyana", "gphc-guyana", "ga-fdd-guyana", "iarc"],
    keyPapers: [PLUMMER],
    cancers: ["breast-cancer", "cervical", "prostate"],
    links: [
      doi("10.1186/1750-9378-4-s1-s7", "Best Plummer et al., ethnicity and cancer in Guyana (Infect Agent Cancer 2009)"),
      { label: "Ministry of Health: Action Plan for the Elimination of Cervical Cancer in Guyana 2024-2030 (PDF, ICCP portal)", url: ACTION_PLAN },
      { label: "IAEA: imPACT review, Guyana, December 2018 (PDF)", url: IAEA_IMPACT },
    ] }),

  i({ id: "ga-fdd-guyana", name: "Government Analyst Food and Drug Department (Guyana)", aka: ["GA-FDD", "Food and Drug Department, Guyana"],
    city: "Georgetown", country: "GY", lat: 6.8, lng: -58.16, institutionType: "government",
    tldr: "The government department that regulates medicines in Guyana under the Food and Drugs Act. The regulations require a licence from the Minister before a new drug is imported or sold.",
    summary: "Regulation 78 of the Food and Drugs Regulations, made under Chapter 34:03 of the Laws of Guyana (2012 revision), says no person shall import, sell or advertise for sale a new drug without a licence in force issued by the Minister, on an application that sets out the ingredients, proposed dosage, claims, contraindications and side effects, and the method of manufacture; the regulations define the Government Analyst as including the Commissioner of Food and Drugs. In December 2017 the Department of Public Information reported a workshop at which the department's director spoke of the difficulty of registering quality medicines locally and CARPHA explained the Caribbean Regulatory System, a voluntary regional review service. CARPHA's guidance lists Guyana among six Caribbean Community countries that conduct marketing authorisation. OnCo did not find the department's own website. The coordinates are an approximate Georgetown city point.",
    programs: ["Licensing of new drugs under the Food and Drugs Regulations", "Use of Caribbean Regulatory System recommendations"],
    institutions: ["moh-guyana", "guyana-cancer-registry"],
    links: [
      { label: "Food and Drugs Regulations, Laws of Guyana Cap. 34:03 (FAOLEX PDF)", url: FD_REGS },
      { label: "Department of Public Information: Guyana to adopt CRS measures for procurement of pharmaceuticals (14 December 2017)", url: DPI_CRS },
      { label: "CARPHA: Caribbean Regulatory System, guidance and questions for applicants", url: CRS_FAQ },
    ] }),
];

const papers: PaperInput[] = [
  p({ id: PLUMMER, name: "Ethnicity and cancer in Guyana, South America",
    journal: "Infectious Agents and Cancer", year: 2009, doi: "10.1186/1750-9378-4-s1-s7", pmid: "19208212", authors: "Best Plummer WS, Persaud P, Layne PJ", paperType: "observational",
    tldr: "An analysis of Guyana's cancer registry found that Afro-Guyanese men accounted for about 65% of registered prostate cancers, and that cervical cancer made up a significantly larger share of cancers among Indigenous Amerindian women.",
    summary: "The authors, from the Cancer Registry of Guyana, reviewed the registry's database, built since 2000 from the national referral hospital and other public and private institutions, for the ethnic and site distribution of the three main reported cancers, and compared frequencies by ethnicity and age group with chi-squared tests. The open full text adds that the three main cancers were breast (23%), cervical (22%) and prostate (20%) and gives the counts by ethnic group.",
    findings: ["Afro-Guyanese men accounted for over 65% of prostate cancers in the abstract's words (341 of 525 in the full text's table, which is 65%).", "Indo-Guyanese women presented with the most breast cancers (45%) and Afro-Guyanese women with the most cervical cancers (39%).", "As a proportion of all cancers within an ethnic group, cervical cancer was significantly more common among Indigenous Amerindian women (p < 0.0001).", "Among women under 30 years of age there were significantly more cases of cervical than breast cancer (p = 0.014)."],
    whatItMeans: "It is the published description of what Guyana's registry holds and of how its three main cancers divide by ethnic group.",
    caveats: ["Shares of registered cases, not rates per head of population in each ethnic group.", "The registry misses cases diagnosed abroad and deaths not attended by a health worker; the paper says most prostate cancers were not staged.", "Published in a conference supplement; the data end about 2008."],
    cancers: ["breast-cancer", "cervical", "prostate"], institutions: ["guyana-cancer-registry", "moh-guyana"], related: [MARTIN],
    links: [doi("10.1186/1750-9378-4-s1-s7", "DOI"), pubmed("19208212")] }),

  p({ id: MARTIN, name: "Evaluation of a single-visit approach to cervical cancer screening and treatment in Guyana: feasibility, effectiveness and lessons learned",
    journal: "The Journal of Obstetrics and Gynaecology Research", year: 2014, doi: "10.1111/jog.12366", pmid: "24888938", authors: "Martin CE, Tergas AI, Wysong M, et al.", paperType: "real-world", participants: 21597,
    tldr: "A programme at 18 sites in Guyana screened 21,597 women between 2009 and mid-2012 by looking at the cervix after applying dilute vinegar, and treated 85% of eligible women with abnormal results at the same visit.",
    summary: "The authors analysed service records from January 2009 to June 2012 for 18 cervical cancer prevention sites across Guyana that used visual inspection with acetic acid and immediate cryotherapy in a single visit, including women's HIV status, screening and treatment at the first visit and at one year, and the training and retention of providers. A process evaluation in 2011 looked at integration, scale-up and sustainability.",
    findings: ["21,597 new screenings in 42 months, reaching 95% of HIV-positive women enrolled in care and 17% of women aged 25 to 49 in Guyana.", "13% of women (2,806) tested positive on visual inspection; 85% of those eligible for cryotherapy were treated immediately.", "Half of the women treated returned for screening at one year (1,027), and 95% of them then tested negative.", "Non-physician providers were more likely than physicians to continue offering the service."],
    whatItMeans: "Screening and treating in one visit worked in Guyana's clinics, and nurses and other non-physicians kept it going.",
    caveats: ["Service records, not a trial with a comparison group.", "Only half of treated women came back at one year, so the 95% figure describes those who returned.", "The data end in 2012; the Ministry's 2024 plan gives a much lower current screening baseline."],
    cancers: ["cervical"], institutions: ["moh-guyana"], related: [PLUMMER],
    links: [doi("10.1111/jog.12366", "DOI"), pubmed("24888938")] }),
];

/** Records behind /countries/gy/ (wave 16). */
export const recordsGY: EntityInput[] = [...institutions, ...papers];
