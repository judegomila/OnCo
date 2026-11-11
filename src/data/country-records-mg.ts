import type { EntityInput, PaperInput } from "@/lib/schema";

/**
 * Madagascar: the papers behind /countries/mg/ (wave 9) that the corpus did not hold. DOIs were resolved through Europe
 * PMC on 11 November 2026 and every figure in `findings` is taken from the indexed abstract. The Ministry of Public
 * Health (sante.gov.mg) and the medicines agency (agmed.mg) did not answer, so no institution record is added; the two
 * screening papers link each other as related work.
 */
const asOf = "2026-11-11";
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const papers: PaperInput[] = [
  p({ id: "paper-benski-madagascar-hpv-self-test-triage-plosone-2019", name: "HPV self-testing for cervical screening in Madagascar, and how many women came back for triage",
    journal: "PLoS One", year: 2019, doi: "10.1371/journal.pone.0220632", pmid: "31408474", authors: "Benski AC, Viviano M, Jinoro J, et al.", paperType: "observational", participants: 1232,
    tldr: "In a 2015 screening campaign in Madagascar, 28.0% of 1,232 women who took an HPV self-test were positive, and those invited for VIA/VILI triage immediately were the most likely to attend (95.0%).",
    summary: "Published as \"HPV self-testing for primary cervical cancer screening in Madagascar: VIA/VILI triage compliance in HPV-positive women\". Women recruited from February to October 2015 took a self-sample for HPV testing, first sent away (cobas) and later tested on site (Xpert); HPV-positive women were invited for visual inspection with acetic acid and Lugol's iodine.",
    findings: [
      "1,232 self-sampled HPV tests were done; overall HPV prevalence was 28.0%.",
      "Triage attendance was 77.8% when the invitation came more than three months later, 82.7% within 24 to 48 hours and 95.0% when immediate.",
      "CIN2 or worse was found in 9.8% of HPV-positive women in the delayed group and 6.8% in the prompt and immediate groups.",
      "Non-attendance was higher among rural women, women without education and the delayed group.",
    ],
    whatItMeans: "Testing and triaging on the same day keeps more women in care; the authors recommend a single-day test-and-triage strategy for low-resource settings.",
    caveats: ["A screening campaign, not a national programme."],
    institutions: ["hug-geneva"], cancers: ["cervical"], related: ["paper-dumont-madagascar-rural-via-screening-jogoh-2017"],
    links: [doi("10.1371/journal.pone.0220632", "PLoS One 2019"), pubmed("31408474")] }),

  p({ id: "paper-dumont-madagascar-rural-via-screening-jogoh-2017", name: "Cervical cancer screening by a mobile unit in rural Madagascar: feasibility, coverage and incidence",
    journal: "Journal of Gynecology Obstetrics and Human Reproduction", year: 2017, doi: "10.1016/j.jogoh.2017.03.003", pmid: "28643659", authors: "Dumont A, Bessières N, Benbassa A, et al.", paperType: "observational", participants: 1569,
    tldr: "A mobile unit offering VIA screening and same-day treatment in Atsinanana in 2013 to 2015 reached 18% of eligible women; 23% of those screened were VIA positive, and nearly half of those referred to hospital were lost to follow-up.",
    summary: "Published in French as \"Cervical cancer screening in rural Madagascar: Feasibility, coverage and incidence\". A mobile unit with a cold coagulator visited the main health centres of the Atsinanana region every six months between 2013 and 2015, screening by visual inspection with acetic acid and treating eligible lesions the same day.",
    findings: [
      "1,569 of 8,959 women aged 25 to 65 (18%) were screened.",
      "357 (23%) were VIA positive and 322 (21%) were eligible for immediate treatment, with no serious adverse effects.",
      "Of 35 women referred to hospital, 16 (46%) were lost to follow-up.",
    ],
    whatItMeans: "VIA with same-day treatment is feasible where HPV testing or cytology is not, but women who need hospital care often do not get it.",
    caveats: ["One region; a small number referred."],
    cancers: ["cervical"], related: ["paper-benski-madagascar-hpv-self-test-triage-plosone-2019"],
    links: [doi("10.1016/j.jogoh.2017.03.003", "J Gynecol Obstet Hum Reprod 2017"), pubmed("28643659")] }),
];

/** Records behind /countries/mg/ (wave 9). */
export const recordsMG: EntityInput[] = [...papers];
