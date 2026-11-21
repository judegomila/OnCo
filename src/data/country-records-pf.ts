import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * French Polynesia: the public body and paper behind /countries/pf/ (wave 16) that the corpus did not hold. Written
 * from sources read raw, in French, on 16 November 2026: the ARASS pages on medicine imports and pharmacovigilance,
 * Délibération n° 80-107 of 29 August 1980 on the import of medicines in the consolidated version in force from
 * 15 July 2024 (Lexpol, PDF text), and the Institut du cancer de Polynésie française's registry report for 2019 to
 * 2021 (PDF text). The DOI was resolved through Europe PMC and the figures in `findings` are from the indexed abstract.
 *
 * The existing records for the cancer institute, the public hospital and the social security fund
 * (institutions/countries-2026-11-europe-overseas.ts) are reused on the page, not duplicated. The ARASS coordinates
 * are an approximate city point for Papeete, not the agency's address, which OnCo did not read.
 */
const asOf = "2026-11-16";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const ARASS = "https://www.service-public.pf/arass/";
const ARASS_IMPORT = "https://www.service-public.pf/arass/importation-des-medicaments/";
const ARASS_PV = "https://www.service-public.pf/arass/pharmacovigilance/";
const LEXPOL_80_107 = "https://lexpol.cloud.pf/LexpolAfficheTexte.php?texte=260994";
const ICPF_REG_REPORT = "https://www.icpf.pf/wp-content/uploads/2026/07/Rapport-Registre-2019-2021.pdf";

const institutions: InstitutionInput[] = [
  i({ id: "arass-french-polynesia", name: "Agence de régulation de l'action sanitaire et sociale (ARASS), Polynésie française", aka: ["ARASS", "Agency for the Regulation of Health and Social Action of French Polynesia"],
    city: "Papeete", country: "PF", lat: -17.535, lng: -149.569, institutionType: "government", website: ARASS,
    tldr: "French Polynesia's health and social regulation agency. Its pharmacists handle requests to import medicines, it receives reports of medicine side effects, and its health observation office analyses death certificates.",
    summary: "The Agence de régulation de l'action sanitaire et sociale describes its mission as proposing public policy strategies and their financing in health, family and solidarity, medico-social action and social protection. Under Délibération n° 80-107 of 29 August 1980, French Polynesia's law on importing medicines, a request to import a human medicine that is not on the list of medicines admitted to the market in French Polynesia and has no equivalent in the French pharmacopoeia is made to the agency, and the authorisation is granted by the President of French Polynesia; the same goes for medicines prescribed outside the territory that a patient has sent in for personal use. Health professionals must report suspected side effects of medicines and vaccines to the agency. Its Bureau de veille sanitaire et de l'observation analyses death certificates, and the cancer registry's report for 2019 to 2021 uses its figures for 2019 as the most recent mortality data. OnCo did not read the territory's pharmacy law, Délibération n° 88-153 AT of 1988, so this record does not say how a medicine is admitted to the local market.",
    programs: ["Authorisation of medicine imports", "Pharmacovigilance", "Health observation and causes of death (Bureau de veille sanitaire et de l'observation)"],
    institutions: ["icpf-french-polynesia", "chpf-french-polynesia", "cps-french-polynesia"],
    links: [
      { label: "ARASS (in French)", url: ARASS },
      { label: "ARASS: importing medicines for personal use (in French)", url: ARASS_IMPORT },
      { label: "ARASS: pharmacovigilance (in French)", url: ARASS_PV },
      { label: "Lexpol: Délibération n° 80-107 of 29 August 1980, consolidated (in French)", url: LEXPOL_80_107 },
      { label: "Institut du cancer de Polynésie française: registry report, data 2019 to 2021 (PDF, in French)", url: ICPF_REG_REPORT },
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-de-vathaire-thyroid-nuclear-tests-french-polynesia-jama-netw-open-2023", name: "Differentiated thyroid carcinomas in French Polynesia after France's atmospheric nuclear tests",
    journal: "JAMA Network Open", year: 2023, doi: "10.1001/jamanetworkopen.2023.11908", pmid: "37145599", authors: "de Vathaire F, Zidane M, Xhaard C, et al.", paperType: "observational",
    tldr: "Using military radiation reports declassified in 2013, this case-control study estimated that fallout from France's 41 atmospheric nuclear tests accounts for about 29 thyroid cancers in French Polynesia's population, 2.3% of the 1,524 sporadic cases.",
    summary: "Published as \"Assessment of Differentiated Thyroid Carcinomas in French Polynesia After Atmospheric Nuclear Tests Performed by France\". The authors extended a case-control study published in 2010 by adding cancers diagnosed from 2004 to 2016 and improving dose assessment from original radiation-protection reports on the 41 tests of 1966 to 1974, which doubled the estimated mean thyroid dose from 2 to nearly 5 milligray. Cases were diagnosed from 1984 to 2016 at age 55 or younger, born and resident in French Polynesia; 395 of 457 eligible cases and 555 controls were included.",
    findings: [
      "No association between thyroid radiation dose received before age 15 and risk of differentiated thyroid carcinoma (excess relative risk per milligray 0.04, 95% CI -0.09 to 0.17).",
      "Excluding unifocal non-invasive microcarcinomas, the dose response was significant, but the authors say several incoherencies with the initial study reduce the credibility of this result.",
      "Estimated lifetime risk for the whole population: 29 cases (95% CI 8 to 97), or 2.3% (0.6% to 7.7%) of 1,524 sporadic cases.",
    ],
    whatItMeans: "The authors conclude that the number of thyroid cancers associated with the tests was small, and say this may reassure the population.",
    caveats: ["Doses were reconstructed decades after the tests from reports, weather records and interviews.", "Covers differentiated thyroid cancer only, diagnosed at age 55 or younger."],
    institutions: ["icpf-french-polynesia"], cancers: ["thyroid"],
    links: [doi("10.1001/jamanetworkopen.2023.11908", "JAMA Netw Open 2023"), pubmed("37145599")] }),
];

export const recordsPF: EntityInput[] = [...institutions, ...papers];
