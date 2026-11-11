import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Guatemala: the institution and papers behind /countries/gt/ (wave 9) that the corpus did not hold. UNOP was written
 * from its own home page (read as raw text in Spanish on 11 November 2026) and its published papers; DOIs were resolved
 * through Europe PMC and every figure in `findings` is taken from the indexed abstract. The Ministry of Public Health
 * (mspas.gob.gt) refused a plain request (HTTP 403) and INCAN's site did not answer, so no records are added for them.
 * Coordinates are approximate city points.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const institutions: InstitutionInput[] = [
  i({ id: "unop-guatemala", name: "Unidad Nacional de Oncología Pediátrica", aka: ["UNOP", "National Pediatric Oncology Unit, Guatemala"],
    city: "Guatemala City", country: "GT", lat: 14.62, lng: -90.52, institutionType: "cancer-center", website: "https://www.unop.org.gt",
    tldr: "Guatemala's national children's cancer unit, which says it gives comprehensive treatment free of charge to children with cancer. A 2017 paper calls it the only paediatric haemato-oncology centre in Guatemala.",
    summary: "The Unidad Nacional de Oncología Pediátrica (UNOP) in Guatemala City says on its home page that it provides comprehensive treatment at no cost to the children of Guatemala. A 2017 paper in Cancer describes it as the only paediatric haemato-oncology centre in the country and reports 787 children with acute lymphoblastic leukaemia treated from July 2007 to June 2014 on a modified IC-BFM 2002 protocol, with five-year overall survival of 64.1%. A second paper reports that its multidisciplinary psychosocial team, medicina integral, cut treatment abandonment from 27% in 2001 to 7% in 2008. The coordinates on this record are an approximate Guatemala City point.",
    programs: ["Free comprehensive treatment for children with cancer", "Medicina integral (psychosocial support to prevent abandonment)", "Acute lymphoblastic leukaemia treatment on a modified IC-BFM 2002 protocol"],
    cancers: ["all-leukemia", "childhood-cancers"],
    keyPapers: ["paper-antillon-guatemala-childhood-all-cancer-2017", "paper-alvarez-guatemala-paediatric-abandonment-pbc-2017"],
    links: [
      { label: "UNOP (Spanish)", url: "https://www.unop.org.gt/" },
      doi("10.1002/cncr.30257", "Antillón et al., treatment of childhood ALL in Guatemala (Cancer 2017)"),
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-antillon-guatemala-childhood-all-cancer-2017", name: "Treating childhood acute lymphoblastic leukaemia in Guatemala: biology, hurdles and results",
    journal: "Cancer", year: 2017, doi: "10.1002/cncr.30257", pmid: "27683100", authors: "Antillón FG, Blanco JG, Valverde PD, et al.", paperType: "observational", participants: 787,
    tldr: "At Guatemala's national paediatric oncology unit, 787 children with ALL treated in 2007 to 2014 had five-year overall survival of 64.1%; the authors call outcomes suboptimal because of late diagnosis, early deaths and a high relapse rate.",
    summary: "Published as \"The treatment of childhood acute lymphoblastic leukemia in Guatemala: Biologic features, treatment hurdles, and results\". Children aged 1 to 17 were treated at UNOP on a modified ALL IC-BFM 2002 protocol with risk groups set by age, white cell count, immunophenotype, genetics where available and early response.",
    findings: [
      "787 patients were treated from July 2007 to June 2014: 160 standard risk, 450 intermediate risk and 177 high risk.",
      "Induction deaths were 6.6% and remission 92.9%; deaths and abandonment in first remission were 4.8% and 2.5%.",
      "Five-year event-free survival was 56.2% and overall survival 64.1%, with five-year cumulative relapse of 28.9%.",
    ],
    whatItMeans: "An organised centre in a lower-middle-income country can overcome malnutrition and reduce abandonment, but earlier diagnosis and better management of complications are still needed.",
    caveats: ["One centre; median follow-up 3.6 years."],
    institutions: ["unop-guatemala"], cancers: ["all-leukemia"], related: ["paper-alvarez-guatemala-paediatric-abandonment-pbc-2017"],
    links: [doi("10.1002/cncr.30257", "Cancer 2017"), pubmed("27683100")] }),

  p({ id: "paper-alvarez-guatemala-paediatric-abandonment-pbc-2017", name: "Reducing treatment abandonment among children with cancer in Guatemala",
    journal: "Pediatric Blood & Cancer", year: 2017, doi: "10.1002/pbc.26560", pmid: "28423236", authors: "Alvarez E, Seppa M, Rivas S, et al.", paperType: "observational", participants: 1789,
    tldr: "Among 1,789 children treated at UNOP in 2001 to 2008, 21% refused or abandoned treatment; abandonment fell from 27% to 7% after a multidisciplinary psychosocial team was introduced.",
    summary: "Published as \"Improvement in treatment abandonment in pediatric patients with cancer in Guatemala\". A retrospective study of children aged 0 to 18 treated at UNOP, using the Pediatric Oncology Network Database, evaluating the medicina integral team.",
    findings: [
      "Of 1,789 patients, 21% refused or abandoned treatment.",
      "Abandonment fell from 27% in 2001 to 7% in 2008 after medicina integral was introduced.",
      "Distance from the centre, age, year of diagnosis and indigenous ethnicity were associated with abandonment.",
    ],
    whatItMeans: "A multidisciplinary psychosocial team cut treatment abandonment at one Guatemalan centre, and the authors say the approach can be replicated in other low- and middle-income countries.",
    caveats: ["Retrospective, one centre."],
    institutions: ["unop-guatemala"], cancers: ["childhood-cancers"], related: ["paper-antillon-guatemala-childhood-all-cancer-2017"],
    links: [doi("10.1002/pbc.26560", "Pediatr Blood Cancer 2017"), pubmed("28423236")] }),

];

/** Records behind /countries/gt/ (wave 9). */
export const recordsGT: EntityInput[] = [...institutions, ...papers];
