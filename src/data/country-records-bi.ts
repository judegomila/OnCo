import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Burundi: the body behind /countries/bi/ (wave 14) that the corpus did not hold. The Kinindo centre, the palliative
 * care association and Kenyera already exist in src/data/institutions/countries-2026-11-east-southern-africa.ts and are
 * linked, not repeated. Written from the Plan stratégique national de lutte contre le cancer au Burundi 2024 to 2028
 * (January 2024, PDF text from the ICCP portal) and from one paper resolved through Europe PMC with its abstract read,
 * and the ClinicalTrials.gov record NCT05211271 (API), all on 16 November 2026. The hospital's coordinates are the approximate Bujumbura city point the corpus already uses.
 */
const asOf = "2026-11-16";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });

const PLAN = { label: "Plan stratégique national de lutte contre le cancer au Burundi 2024 to 2028 (January 2024, PDF via ICCP)", url: "https://www.iccp-portal.org/sites/default/files/plans/PNLC%20Version%20pr%C3%A9fac%C3%A9.pdf" };
const TA_DOI = "10.1002/ijc.34117";

const institutions: InstitutionInput[] = [
  i({ id: "chu-kamenge", name: "Centre Hospitalo-Universitaire de Kamenge (CHUK)", aka: ["CHUK", "Kamenge University Hospital", "CHU de Kamenge"],
    city: "Bujumbura", country: "BI", lat: -3.364, lng: 29.368, institutionType: "hospital",
    tldr: "The university hospital in Bujumbura that Burundi's national cancer plan of January 2024 lists as the country's one public chemotherapy unit and its one public pathology laboratory. The plan counts it as one of three places in the country that give chemotherapy.",
    summary: "Burundi's national cancer plan for 2024 to 2028 (January 2024) lists the Centre Hospitalo-Universitaire de Kamenge as the one public chemotherapy unit among three in the country, with six day-hospital beds and longer stays housed in other services; the other two units are private, at the Centre Médico-Chirurgical de Kinindo and Tanganyika Hospital. The plan says cancer can be confirmed by pathology in one public laboratory, at this hospital, where an examination cost 50,000 Burundi francs with results in one to two months, and that the laboratory has a slide-scanning microscope for telepathology. It cites a 30-year series of 4,135 cancers confirmed from 1978 to 2008, when this was the country's only pathology laboratory. ClinicalTrials.gov names the hospital as the site of an International Agency for Research on Cancer study of thermal ablation for early changes in the cervix (NCT05211271, 86 women, 2018 to 2020). OnCo has not read the hospital's own pages. The coordinates are an approximate city point for Bujumbura.",
    programs: ["Chemotherapy unit (public)", "Pathology laboratory"],
    institutions: ["cmck-bujumbura", "iarc"],
    keyPapers: ["paper-sauvaget-thermal-ablation-burundi-ijc-2022"],
    links: [PLAN, { label: "ClinicalTrials.gov: NCT05211271", url: "https://clinicaltrials.gov/study/NCT05211271" }] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-sauvaget-thermal-ablation-burundi-ijc-2022", name: "Thermal ablation for cervical neoplasia in Burundi: effectiveness, acceptability and safety",
    journal: "International Journal of Cancer", year: 2022, doi: TA_DOI, pmid: "35567576", authors: "Sauvaget C, Bazikamwe S, Lucas E, et al.", paperType: "observational", participants: 86,
    tldr: "In Burundi, 86 women with early changes in the cervix found by visual inspection were treated by thermal ablation, a short heat treatment. A year later 96% of the women examined were free of the changes, and no serious harm was reported.",
    summary: "Published as \"Evaluation of effectiveness, acceptability and safety of thermal ablation in the treatment of cervical neoplasia in Burundi\", with a first author at the International Agency for Research on Cancer. Women referred to a gynaecology ward for symptoms or opportunistic screening were assessed by visual inspection with acetic acid and colposcopy; those with lesions eligible for ablation were counselled and treated, asked about pain and satisfaction, followed up at six weeks and reassessed at 12 months. The study is registered as NCT05211271, sponsored by the agency, with Kamenge University Hospital in Bujumbura as its site.",
    findings: [
      "86 women with a positive visual inspection were included; the mean age was 46 years (range 28 to 61).",
      "At 12 months 82 women were examined (95% follow-up) and the overall cure rate was 96%: 98% for low-grade and 94% for high-grade lesions.",
      "One third had mild pain or cramp during treatment; watery discharge was the main event at six weeks; no major adverse event or hospitalisation was reported.",
    ],
    whatItMeans: "This study shows thermal ablation working in Burundi with a high cure rate at one year. The national cancer plan for 2024 to 2028 builds on screening and treating early cervical changes, in a country with no radiotherapy for invasive cervical cancer.",
    caveats: ["A single-arm study of 86 women with one year of follow-up; there was no comparison group.", "The abstract does not name the hospital; the registry record does."],
    cancers: ["cervical"],
    technologies: ["via-cervical-screening"],
    institutions: ["iarc", "chu-kamenge"],
    links: [{ label: "International Journal of Cancer 2022", url: `https://doi.org/${TA_DOI}` }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/35567576/" }, { label: "ClinicalTrials.gov: NCT05211271", url: "https://clinicaltrials.gov/study/NCT05211271" }] }),
];

/** Records behind /countries/bi/ (wave 14). */
export const recordsBI: EntityInput[] = [...institutions, ...papers];
