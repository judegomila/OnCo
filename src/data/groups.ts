import type { InstitutionInput } from "@/lib/schema";

const asOf = "2026-09-06";
type I = Omit<InstitutionInput, "kind" | "asOf" | "institutionType">;
const grp = (x: I): InstitutionInput => ({ kind: "institution", asOf, institutionType: "consortium", ...x });

/**
 * Cooperative trial groups and guideline bodies. They run the academic phase 3 trials that
 * set the standard of care, and they are how a patient's oncologist gets access to a trial.
 * Integrate by spreading into ALL_INPUTS (see src/data/index.ts).
 */
export const groups: InstitutionInput[] = [
  grp({ id: "swog", name: "SWOG Cancer Research Network", city: "Portland, OR", country: "US", lat: 45.512, lng: -122.658, website: "https://www.swog.org",
    tldr: "SWOG is one of the US National Cancer Institute's cooperative groups: thousands of community and academic sites running practice-changing trials, including the 2026 first-line Hodgkin lymphoma result.",
    summary: "Founded 1956 (Southwest Oncology Group). NCI National Clinical Trials Network member with >12,000 members at >1,300 sites. Landmark trials include S1826 (nivolumab-AVD in advanced Hodgkin lymphoma, FDA approval March 2026), S1418/BR006 (adjuvant pembrolizumab in TNBC), and the de-escalation trial SCARLET (S2212) in stage II-III TNBC. Statistical centre at Fred Hutchinson Cancer Center.",
    programs: ["NCTN cooperative group", "S1826 Hodgkin lymphoma", "SCARLET S2212 (TNBC de-escalation)", "Cancer control and survivorship"],
    trials: ["scarlet-s2212"], drugs: ["nivolumab"], cancers: ["hodgkin-lymphoma", "tnbc"], institutions: ["fred-hutch", "nci"] }),
  grp({ id: "nrg-oncology", name: "NRG Oncology", city: "Philadelphia, PA", country: "US", lat: 39.952, lng: -75.165, website: "https://www.nrgoncology.org",
    tldr: "The US cooperative group formed from the radiation, gynaecologic, and breast trial groups; it co-led OlympiA, the trial that put a PARP inhibitor after surgery for BRCA carriers.",
    summary: "Formed 2014 by merger of NSABP, RTOG, and GOG. Runs radiation, breast, gynaecologic, and CNS trials in the NCI National Clinical Trials Network. Co-led OlympiA (adjuvant olaparib, with the Breast International Group and AstraZeneca) and the RTOG trials whose slides trained ArteraAI Prostate.",
    programs: ["NCTN cooperative group", "OlympiA (with BIG)", "RTOG prostate radiation trials", "Gynaecologic oncology (former GOG)"],
    trials: ["olympia"], drugs: ["olaparib", "artera-ai-prostate"], cancers: ["tnbc", "prostate", "cervical", "endometrial"], institutions: ["nci"] }),
  grp({ id: "alliance-oncology", name: "Alliance for Clinical Trials in Oncology", city: "Chicago, IL", country: "US", lat: 41.881, lng: -87.630, website: "https://www.allianceforclinicaltrialsinoncology.org",
    tldr: "US cooperative group formed from CALGB, ACOSOG, and NCCTG; running OptimICE-pCR, which asks whether TNBC patients with a complete response still need a year of immunotherapy.",
    summary: "Formed 2011. NCI National Clinical Trials Network member. Trials include CALGB 40603 (carboplatin in TNBC), Z0011 (sentinel node without dissection), and A012103/OptimICE-pCR (omitting adjuvant pembrolizumab after pathologic complete response).",
    programs: ["NCTN cooperative group", "OptimICE-pCR", "Breast surgical de-escalation (Z0011)"],
    trials: ["optimice-pcr"], drugs: ["pembrolizumab", "carboplatin"], technologies: ["sentinel-node"], cancers: ["tnbc"], institutions: ["nci"] }),
  grp({ id: "ecog-acrin", name: "ECOG-ACRIN Cancer Research Group", city: "Philadelphia, PA", country: "US", lat: 39.955, lng: -75.160, website: "https://ecog-acrin.org",
    tldr: "US cooperative group that pairs a therapy group with an imaging group; its E1910 trial moved blinatumomab into frontline leukaemia treatment.",
    summary: "Merger (2012) of the Eastern Cooperative Oncology Group and the American College of Radiology Imaging Network. E1910 showed adding blinatumomab consolidation improves survival in MRD-negative B-ALL, leading to the 2024 label. Also runs TMIST (tomosynthesis vs digital mammography screening) and the ECOG performance status scale.",
    programs: ["NCTN cooperative group", "E1910 blinatumomab", "TMIST screening trial", "Imaging biomarker trials"],
    drugs: ["blinatumomab"], technologies: ["mammography"], cancers: ["all-leukemia"], institutions: ["nci"] }),
  grp({ id: "childrens-oncology-group", name: "Children's Oncology Group (COG)", city: "Monrovia, CA", country: "US", lat: 34.144, lng: -118.001, website: "https://childrensoncologygroup.org",
    tldr: "The Children's Oncology Group is the world's largest paediatric cancer trials organisation; most children with cancer in North America are treated on or according to a COG protocol.",
    summary: "Formed 2000 from four paediatric groups; >200 member hospitals. Trials define standard risk-adapted therapy in ALL (AALL1731 added blinatumomab), neuroblastoma (anti-GD2 immunotherapy, ANBL0032), and paediatric solid tumours.",
    programs: ["Paediatric ALL (AALL trials)", "Neuroblastoma (ANBL trials)", "Survivorship"],
    drugs: ["blinatumomab"], cancers: ["all-leukemia", "neuroblastoma"], institutions: ["nci"] }),
  grp({ id: "cctg", name: "Canadian Cancer Trials Group (CCTG)", city: "Kingston, ON", country: "CA", lat: 44.231, lng: -76.486, website: "https://www.ctg.queensu.ca",
    tldr: "Canada's national academic trials group, which ran the CHALLENGE exercise trial and co-led the SABR-COMET oligometastasis trial.",
    summary: "CCTG is based at Queen's University. CHALLENGE (CO.21, NEJM 2025) showed a structured exercise programme improves survival in colon cancer; MA.17 (extended letrozole) and PA.3 (erlotinib in pancreatic cancer) were earlier landmarks.",
    programs: ["CHALLENGE exercise trial", "Breast endocrine therapy trials (MA series)"],
    technologies: ["exercise-oncology", "sbrt"], cancers: ["colorectal", "breast-hr-positive"] }),
  grp({ id: "big", name: "Breast International Group (BIG)", city: "Brussels", country: "BE", lat: 50.850, lng: 4.352, website: "https://www.bigagainstbreastcancer.org",
    tldr: "The Breast International Group is the umbrella for 50+ academic breast cancer groups worldwide and co-sponsor of OlympiA, APHINITY, and HERA.",
    summary: "Founded 1999 by Martine Piccart. Coordinates academic breast trials across >60 groups and >10,000 hospitals: HERA (adjuvant trastuzumab), APHINITY (pertuzumab), MINDACT (MammaPrint), OlympiA (adjuvant olaparib with NRG Oncology).",
    programs: ["OlympiA (with NRG)", "HERA / APHINITY", "MINDACT"],
    trials: ["olympia"], drugs: ["olaparib", "trastuzumab"], cancers: ["tnbc", "breast-her2-positive", "breast-hr-positive"], institutions: ["nrg-oncology"] }),
  grp({ id: "gbg", name: "German Breast Group (GBG)", city: "Neu-Isenburg", country: "DE", lat: 50.052, lng: 8.694, website: "https://www.gbg.de",
    tldr: "The German academic group whose GeparX trials established carboplatin and neoadjuvant strategies in triple-negative breast cancer.",
    summary: "Founded 1997 (Gunter von Minckwitz, Sibylle Loibl). GeparSixto (carboplatin raises pCR in TNBC), GeparNuevo (durvalumab), GeparDouze, and the pCR-as-surrogate meta-analyses that shaped neoadjuvant trial design.",
    programs: ["Gepar neoadjuvant trial series", "pCR surrogacy research"],
    drugs: ["carboplatin", "durvalumab"], terms: ["pcr"], cancers: ["tnbc"] }),
  grp({ id: "jcog", name: "Japan Clinical Oncology Group (JCOG)", city: "Tokyo", country: "JP", lat: 35.665, lng: 139.767, website: "https://jcog.jp",
    tldr: "JCOG is Japan's national cooperative group and defines surgical and perioperative standards in gastric and oesophageal cancer.",
    summary: "Established 1990, based at the National Cancer Center. JCOG9501 (D2 vs D2 plus para-aortic dissection), JCOG1109 (neoadjuvant DCF in oesophageal cancer), and lung and colorectal surgical trials.",
    programs: ["Gastric cancer surgery trials", "Oesophageal cancer perioperative therapy"],
    cancers: ["gastric", "esophageal", "nsclc"], institutions: ["ncc-japan"] }),
  grp({ id: "unicancer", name: "UNICANCER", city: "Paris", country: "FR", lat: 48.856, lng: 2.352, website: "https://www.unicancer.fr",
    tldr: "UNICANCER is the network of France's comprehensive cancer centres and its academic trials sponsor.",
    summary: "Federates 18 French comprehensive cancer centres (including Gustave Roussy and Institut Curie) and runs UCBG (breast), PRODIGE (GI; PRODIGE 7 HIPEC), GETUG (GU), and the ESME real-world database.",
    programs: ["PRODIGE GI trials", "UCBG breast trials", "ESME real-world data"],
    technologies: ["hipec"], terms: ["real-world-evidence"], cancers: ["colorectal", "tnbc"], institutions: ["gustave-roussy", "institut-curie"] }),
  grp({ id: "nccn-org", name: "National Comprehensive Cancer Network (NCCN)", city: "Plymouth Meeting, PA", country: "US", lat: 40.102, lng: -75.274, website: "https://www.nccn.org",
    tldr: "The NCCN is an alliance of 33 US cancer centres whose guidelines decide, in practice, what US oncologists do and what insurers pay for.",
    summary: "Founded 1995. Publishes the NCCN Clinical Practice Guidelines in Oncology (>80 guidelines, updated continuously), patient guidelines, and the Oncology Research Program.",
    programs: ["NCCN Guidelines", "Patient guidelines", "Oncology Research Program"],
    related: ["nccn"], terms: ["standard-of-care"], institutions: ["mskcc", "md-anderson", "dana-farber"] }),
];
