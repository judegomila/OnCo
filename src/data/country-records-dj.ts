import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Djibouti: the one hospital and two papers behind /countries/dj/ (wave 15) that the corpus did not hold. The papers
 * were found through a Europe PMC search on 16 November 2026 and their indexed abstracts read as raw text; neither has
 * a DOI in Europe PMC, so each is cited by the PubMed id the search returned. The hospital record is written from
 * those two abstracts alone, because OnCo found no page of the hospital's own; it says so in its summary.
 *
 * Inbound links: the hospital lists both papers in keyPapers and each paper lists the hospital. Coordinates are an
 * approximate Djibouti City point, not the building's position.
 */
const asOf = "2026-11-16";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });
// The Europe PMC record as read (its data interface; the europepmc.org article page answers scripts with a challenge).
const epmc = (pmid: string, label: string) => ({ label, url: `https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID%3A${pmid}&resultType=core&format=json` });

const institutions: InstitutionInput[] = [
  i({ id: "balbala-hospital-djibouti", name: "Balbala Hospital, Djibouti (Cheiko Hospital)", aka: ["Balbala Cheiko Hospital", "Cheicko Balbala Hospital", "Italian Hospital"],
    city: "Djibouti", country: "DJ", lat: 11.59, lng: 43.15, institutionType: "hospital",
    tldr: "A referral hospital in the Balbala district of Djibouti City, managed by the Ministry of Health, whose surgical department has published two hospital series of cancer surgery. Its surgeons reported breast cancer operations from 2012 to 2017 and, with the military hospital, oesophageal cancer operations from 2011 to 2021.",
    summary: "OnCo found no page of the hospital's own and describes it from two papers by its surgeons in Annali Italiani di Chirurgia, read as abstracts through Europe PMC on 16 November 2026. The 2020 paper says the Italian Government built the hospital in 1985 in Balbala, a district of Djibouti City with a population of over 250,000, that after a long period of Italian support it is now managed by Djibouti's Ministry of Health, and that it is one of the main referral hospitals in the country; it also calls it the Italian Hospital. The coordinates on this record are an approximate point for Djibouti City, not the hospital's position.\n\nThe same paper reports 102 women with breast cancer seen in the surgical department between 2012 and 2017, 86 of whom accepted surgery, and states that there were no radiotherapy and chemotherapy facilities in Djibouti at the time although tamoxifen was available. The 2022 paper reports 159 patients with oesophageal cancer seen there and at the military hospital from January 2011 to April 2021, 60 of whom had surgery. Both describe the years they cover and neither says what the hospital offers today, so a patient should ask the hospital or the Ministry of Health.",
    programs: ["Surgical department: breast cancer surgery (series of 2012 to 2017)", "Oesophageal cancer surgery, with the Djibouti military hospital (series of 2011 to 2021)"],
    cancers: ["breast-cancer", "esophageal"],
    keyPapers: ["paper-hassan-breast-cancer-balbala-djibouti-aic-2020", "paper-astini-oesophageal-cancer-djibouti-aic-2022"],
    links: [
      epmc("33554946", "Hassan et al., breast cancer at Balbala Hospital (Ann Ital Chir 2020, abstract on Europe PMC)"),
      epmc("35342103", "Astini et al., oesophageal carcinoma in two Djibouti hospitals (Ann Ital Chir 2022, abstract on Europe PMC)"),
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-hassan-breast-cancer-balbala-djibouti-aic-2020", name: "Breast cancer diagnosis and surgery at Balbala Hospital, Djibouti, 2012 to 2017",
    journal: "Annali Italiani di Chirurgia", year: 2020, pmid: "33554946", authors: "Hassan R, Sheeraye M, Astini C, Venezia P.", paperType: "observational", participants: 102,
    tldr: "Surgeons at Balbala Hospital in Djibouti City saw 102 women with breast cancer between 2012 and 2017, and 86 of them accepted an operation. The authors wrote that Djibouti had no radiotherapy or chemotherapy facilities at the time, and that tamoxifen was available.",
    summary: "Indexed as \"Current practice in diagnosis and treatment of breast cancer in Cheicko Balbala Hospital Djibouti\" (Ann Ital Chir 2020; 91: 592 to 597). The authors call it the first breast cancer prevalence study done in Djibouti; it is a single hospital's surgical series, not a population study. All patients came directly to the hospital without a prior referral. OnCo read the abstract as indexed by Europe PMC; the paper has no DOI there.",
    findings: [
      "102 women with clinical breast cancer were evaluated in the surgical department between 2012 and 2017; all had histopathological confirmation.",
      "86 women (84.31%) accepted surgery, which allowed staging; 16 (15.69%) refused surgery.",
      "The abstract states: \"There are no radiotherapy and chemotherapy facilities in Djibouti however hormonal therapy, Tamoxifen, is available.\"",
    ],
    whatItMeans: "It is a rare published count of breast cancer care inside Djibouti, and it records that surgery and tamoxifen were what the hospital could offer in those years. The authors ask for better information for the public and for general practitioners so that women are diagnosed earlier.",
    caveats: ["One hospital's series from 2012 to 2017; it says nothing about what is available now.", "The abstract gives no stage distribution and no survival."],
    institutions: ["balbala-hospital-djibouti"], cancers: ["breast-cancer"],
    links: [epmc("33554946", "Ann Ital Chir 2020 (abstract on Europe PMC)"), pubmed("33554946")] }),

  p({ id: "paper-astini-oesophageal-cancer-djibouti-aic-2022", name: "Oesophageal cancer in two Djibouti hospitals, 2011 to 2021",
    journal: "Annali Italiani di Chirurgia", year: 2022, pmid: "35342103", authors: "Astini C, Robleh H, Said M, Sheraye M, Soriani G, Iltireh IA, Venezia DF, Venezia P.", paperType: "observational", participants: 159,
    tldr: "Surgeons at Balbala Hospital and the Djibouti military hospital saw 159 patients with oesophageal cancer between January 2011 and April 2021, 89 of them women, and operated on 60. They wrote that the country had no radiotherapy and asked for an oesophageal cancer unit and a national cancer register.",
    summary: "Indexed as \"Oesophageal carcinoma in the horn of Africa Ten year cumulative experience in two hospitals in Djibouti\" (Ann Ital Chir 2022; 92). A ten-year surgical series from Balbala Cheiko Hospital and the Djibouti Military Hospital. The authors say long-term survival is very hard to report because most patients live in rural areas and rarely return for check-ups. OnCo read the abstract as indexed by Europe PMC; the paper has no DOI there.",
    findings: [
      "159 patients were diagnosed from January 2011 to April 2021: 89 women (56%) and 70 men (44%).",
      "107 patients (67.30%) reported chewing khat regularly.",
      "60 patients (37.7%) had surgery; the Ivor Lewis operation was the most frequent, done in 44 patients.",
      "The abstract states: \"There are no facilities in the country for radiotherapy.\"",
    ],
    whatItMeans: "In these two hospitals oesophageal cancer was the commonest cancer of the digestive tract, and more women than men had it, which the authors note differs from most published series. They recommend a dedicated unit with follow-up after surgery and a national cancer register.",
    caveats: ["Two hospitals' series, not a population count; follow-up was incomplete.", "The abstract is not consistent with itself: it gives the 89 women as 56% in one sentence and 64% in another, and the 44 Ivor Lewis operations as 66.6% when 44 of 60 is 73%. OnCo quotes the counts."],
    institutions: ["balbala-hospital-djibouti"], cancers: ["esophageal"],
    links: [epmc("35342103", "Ann Ital Chir 2022 (abstract on Europe PMC)"), pubmed("35342103")] }),
];

export const recordsDJ: EntityInput[] = [...institutions, ...papers];
