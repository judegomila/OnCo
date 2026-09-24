import type { DrugInput, PaperInput, TrialInput } from "@/lib/schema";

/**
 * Ivermectin and the evidence in trials for it so far (owner ask, 24 September 2026).
 *
 * Sources were fetched once and cached under /tmp/ivermectin: every ivermectin study on ClinicalTrials.gov v2 (239
 * records screened by hand for cancer conditions), the ISRCTN search (30 ivermectin trials, none in cancer), Europe
 * PMC core records for each PMID named below, the Stromectol label on DailyMed (setid
 * 681888c9-af79-4b7d-ae80-c3f4f6f1effd, revised 09/2024), Drugs@FDA for NDA 050742 and the WHO eEML entry. Every
 * sentence of every summary, result and note cites one of the record's links by label; src/data/ivermectin.test.ts
 * enforces this so a claim cannot arrive without its source. Laboratory findings are labelled as such. Nothing here is
 * a treatment recommendation.
 *
 * The ivermectin record carries no `approvals` and no `regulatoryEvents`, although Stromectol is an approved
 * antiparasitic: src/lib/for-me-related.ts treats any drug with an approval entry as approved for the cancers it
 * names, and the parasitic approval must not surface as "approved for triple-negative breast cancer" on /for-me/.
 * The approval is stated in prose, in `dosing` and in the links instead.
 */
const asOf = "2026-09-24";
const provenance = { editedBy: "OnCo agent (Claude Fable 5.1)", editedOn: asOf, note: "Written from cached ClinicalTrials.gov v2, Europe PMC, DailyMed, Drugs@FDA and WHO eEML responses; no figure appears without its source link." };

const LABEL = "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=681888c9-af79-4b7d-ae80-c3f4f6f1effd";
const DRUGS_AT_FDA = "https://www.accessdata.fda.gov/scripts/cder/daf/index.cfm?event=overview.process&ApplNo=050742";
const WHO_EML = "https://list.essentialmeds.org/medicines/58";
const FDA_CURES = "https://www.fda.gov/consumers/consumer-updates/products-claiming-cure-cancer-are-cruel-deception";
const ct = (nct: string) => ({ label: `ClinicalTrials.gov ${nct}`, url: `https://clinicaltrials.gov/study/${nct}` });
const doi = (label: string, d: string) => ({ label, url: `https://doi.org/${d}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

// Link labels shared between the drug page and the papers, so a sentence on the drug page can cite the paper directly.
const L = {
  label: { label: "Stromectol label on DailyMed", url: LABEL },
  nda: { label: "Drugs@FDA NDA 050742", url: DRUGS_AT_FDA },
  who: { label: "WHO Model List of Essential Medicines", url: WHO_EML },
  fda: { label: "FDA on products claiming to cure cancer", url: FDA_CURES },
  patel: doi("Patel review 2025", "10.1007/s11912-025-01704-z"),
  mujumdar: doi("Mujumdar review 2025", "10.1016/j.gore.2025.101803"),
  straughn: doi("Straughn editorial 2025", "10.1016/j.gore.2025.101920"),
  yilmaz: doi("Yilmaz toxicity review 2026", "10.1002/jat.70166"),
  draganov: doi("Draganov mouse study 2021", "10.1038/s41523-021-00229-5"),
  draganovEoc: doi("Expression of concern 2026", "10.1038/s41523-026-00988-z"),
  hulscher: doi("Hulscher cohort 2026", "10.21873/anticanres.18194"),
  hulscherEoc: doi("Anticancer Research expression of concern 2026", "10.21873/anticanres.18276"),
  loja: doi("Loja survey 2023", "10.3390/nursrep13010030"),
  rockwell: doi("Rockwell JAMA Network Open 2026", "10.1001/jamanetworkopen.2026.16780"),
  saperstein: doi("Saperstein case report 2026", "10.1080/00325481.2026.2672183"),
  powderly: doi("Powderly case report 2026", "10.7759/cureus.108896"),
  hoang: doi("Hoang poison centre series 2022", "10.1080/15563650.2022.2134788"),
  ghai: doi("Ghai poison centre trends 2024", "10.1177/00333549231201679"),
  gilene: doi("Gilene paediatric case 2025", "10.1002/pbc.31876"),
  thakurdesai: doi("Thakurdesai case report 2024", "10.14309/crj.0000000000001354"),
  makis: doi("Makis case series 2025, retracted", "10.1159/000546362"),
  makisRetraction: doi("Retraction notice 2026", "10.1159/000549387"),
  patil: doi("Reverse swing-M phase 1 2020", "10.1002/cam4.3094"),
  mansoori: doi("Mebendazole phase 2a 2021", "10.1038/s41598-021-88433-y"),
  cheng: doi("Cheng melanoma case report 2026", "10.3389/fonc.2026.1907192"),
  ishiguro: doi("Ishiguro case series 2022", "10.7759/cureus.21884"),
  guilford: { label: "Guilford case series 2026", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC13377776/" },
  juarez: { label: "Juarez review 2018", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5835698/" },
  tang: doi("Tang review 2021", "10.1016/j.phrs.2020.105207"),
  wiki: { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Ivermectin" },
};

export const ivermectinDrug: DrugInput = {
  id: "ivermectin", kind: "drug", name: "Ivermectin", aka: ["Stromectol", "IVM", "MK-0933"], brand: "Stromectol", asOf, provenance, status: "phase-2",
  modality: "Oral antiparasitic small molecule (macrocyclic lactone), studied in cancer as an add-on to checkpoint antibodies",
  mechanism: "In parasites ivermectin opens glutamate-gated chloride channels and paralyses the worm. In cancer cell lines and mice it has been reported to act on several things at once, including the ATP-gated P2X4 and P2X7 receptors, WNT-TCF and Akt/mTOR signalling and PAK1, and the trials pair it with an anti-PD-1 antibody on the mouse finding that the pair drew T cells into tumours where neither drug alone worked. All of this is laboratory evidence; none of it has been shown in a patient.",
  mechanismSteps: [
    "Laboratory: in breast cancer cell lines, ivermectin triggers a form of cell death that releases ATP and other signals which attract immune cells (Draganov mouse study 2021).",
    "Laboratory: as a modulator of the ATP-gated P2X4 and P2X7 receptors it was reported to reduce regulatory T cells and suppressive myeloid cells in mouse tumours (Draganov mouse study 2021).",
    "Laboratory: on its own it did nothing to tumour growth in mice; with an anti-PD-1 antibody the combination limited growth, and the images behind part of that figure are now under an expression of concern (Expression of concern 2026).",
    "Untested: whether any of this happens in people at the doses the two trials use is exactly the question the trials are asking (ClinicalTrials.gov NCT05318469).",
  ],
  tldr: "Ivermectin is a worm and parasite medicine that is being tested as an add-on to immunotherapy in two small early trials. No trial has shown that it treats any cancer, and people who have dosed themselves outside a trial have ended up in hospital with seizures or liver damage.",
  summary: "Ivermectin is approved in the United States as Stromectol for intestinal strongyloidiasis and onchocerciasis, two parasitic worm infections, and for nothing else (Stromectol label on DailyMed). The approval dates from 22 November 1996 under NDA 050742 (Drugs@FDA NDA 050742). The World Health Organization lists it as an essential medicine for onchocerciasis, strongyloidiasis, other soil-transmitted worm infections and scabies (WHO Model List of Essential Medicines).\n\nReviews collect cell-culture and mouse experiments in which ivermectin slowed cancer cells or shrank tumours in animals through several pathways at once, and note that no large randomised trial has confirmed any benefit in people (Patel review 2025). The most cited animal experiment reported that ivermectin plus an anti-PD-1 antibody limited tumour growth in mouse models of breast cancer where neither agent alone worked (Draganov mouse study 2021). That paper now carries an editorial expression of concern because several images in one figure were found to be duplicates and the authors said the original data were no longer available (Expression of concern 2026).\n\nAll 239 ivermectin studies registered on ClinicalTrials.gov were screened for this page, and two are cancer treatment trials: a phase 1/2 study at Cedars-Sinai giving ivermectin with balstilimab or pembrolizumab to about 34 patients with metastatic triple-negative breast cancer, recruiting since October 2023 with no results posted (ClinicalTrials.gov NCT05318469), and ICONIC, a University of Florida phase 2 comparing two ivermectin doses alongside a standard checkpoint inhibitor in 80 patients with solid tumours, not yet recruiting and measuring a change in immune cells rather than tumour response (ClinicalTrials.gov NCT07487805). The ICONIC registry entry says that among the first nine patients treated in the Cedars-Sinai study no treatment-related serious adverse events were observed, which is the only human safety information from either trial so far (ClinicalTrials.gov NCT07487805). Two other registered studies are not tests of ivermectin against cancer: a São Paulo phase 2 of ivermectin plus losartan for COVID-19 in cancer patients, stopped for futility after 77 of a planned 176 patients (ClinicalTrials.gov NCT04447235), and a Mexican clinic's 'atavistic chemotherapy' protocol that lists ivermectin among eight antiprotozoal drugs, last updated in 2022 with no results (ClinicalTrials.gov NCT02366884). No phase 3 trial exists, and neither cancer trial has reported whether ivermectin shrinks tumours or lengthens life (ClinicalTrials.gov NCT05318469).\n\nOutside trials the human evidence is survey and anecdote: 19 percent of cancer patients interviewed in Loja, Ecuador said they took ivermectin alongside chemotherapy, radiotherapy or immunotherapy (Loja survey 2023). A telemedicine cohort of 197 patients prescribed ivermectin with mebendazole reported self-assessed benefit in 84 percent of the 122 who answered a six-month survey (Hulscher cohort 2026). The journal has placed an expression of concern on that paper while it audits ethical approval and whether the diagnoses and reported regressions can be verified (Anticancer Research expression of concern 2026). A review for gynaecological cancers finds the clinical data limited to cell lines and 'strongly cautions' against use (Mujumdar review 2025), and the accompanying editorial notes that no major oncology organisation, including ASCO, SGO or NCCN, endorses ivermectin for cancer (Straughn editorial 2025).\n\nHarm from self-dosing is documented: a 73-year-old woman with metastatic breast cancer who took high doses on the strength of online information developed seizures and respiratory failure and needed a ventilator, recovering within 48 hours (Saperstein case report 2026). A 65-year-old man with prostate cancer who alternated veterinary fenbendazole and ivermectin for three months developed severe liver injury that resolved within six weeks of stopping (Powderly case report 2026). An Oregon poison-centre series of 37 people who took ivermectin against COVID-19, most men over 60, recorded neurotoxicity in 30, hospital admission in 21 and one death (Hoang poison centre series 2022). The label itself records drowsiness, stupor, coma, confusion and death at recommended doses and in overdose, most often after veterinary products (Stromectol label on DailyMed). After a January 2025 podcast, combined ivermectin and benzimidazole prescribing to US cancer patients ran 2.6 times higher than in the same months a year earlier (Rockwell JAMA Network Open 2026).\n\nThe bottom line for a patient who has read about this drug online: it is being studied in two early trials, no trial has shown that it treats any cancer, and dosing outside a trial has caused documented harm (Stromectol label on DailyMed). The one trial open to patients is the Cedars-Sinai study in metastatic triple-negative breast cancer (ClinicalTrials.gov NCT05318469). The FDA's guidance on products promoted as cancer cures without trial evidence applies here (FDA on products claiming to cure cancer).",
  notes: [
    "Being studied: two early trials, one recruiting in metastatic triple-negative breast cancer (ClinicalTrials.gov NCT05318469) and one not yet open, ICONIC, which measures an immune-cell change rather than tumour shrinkage (ClinicalTrials.gov NCT07487805).",
    "Not shown to treat any cancer: neither trial has reported a result and no phase 3 exists (ClinicalTrials.gov NCT05318469). The only published human data are a survey (Loja survey 2023) and a self-reported cohort under an expression of concern (Anticancer Research expression of concern 2026).",
    "Harm outside trials: seizures and mechanical ventilation after high-dose self-use (Saperstein case report 2026), severe liver injury with veterinary fenbendazole (Powderly case report 2026), a poison-centre series with one death (Hoang poison centre series 2022), and the label's own warning of coma and death with overdose (Stromectol label on DailyMed).",
    "Tell your oncologist if you are taking it: the toxicity review names P-glycoprotein, the pump that keeps ivermectin out of the brain, as the central factor in neurotoxicity, so anything that blocks it raises the risk (Yilmaz toxicity review 2026). A paediatric case of severe neurotoxicity in a patient on regorafenib was attributed to a CYP3A4 interaction (ClinicalTrials.gov NCT07487805).",
  ],
  dosing: {
    route: "Oral tablet, 3 mg (Stromectol)",
    schedule: "Label: a single dose of about 200 micrograms per kg for strongyloidiasis and about 150 micrograms per kg for onchocerciasis, taken on an empty stomach with water; no cancer dose exists. Trials: the Cedars-Sinai study gives an assigned dose on days 1 to 3 of each week of a 21-day cycle with the antibody, and ICONIC compares 200 and 400 micrograms per kg on days 1 to 3 weekly for four weeks.",
    monitoring: "The label's warnings and overdosage sections describe drowsiness, stupor, coma, confusion, seizures and death with recommended doses and with overdose, most often after veterinary formulations; poisoning is managed with supportive care.",
    source: LABEL,
  },
  toxicity: [
    { event: "Pruritus (itching)", anyGradePct: 27.5, source: LABEL, note: "Onchocerciasis trials, 963 adults, 100 to 200 micrograms per kg; Mazzotti reactions to dying parasites, not expected outside onchocerciasis" },
    { event: "Skin oedema, papular, pustular or urticarial rash", anyGradePct: 22.7, source: LABEL, note: "Onchocerciasis trials, 963 adults, 100 to 200 micrograms per kg; Mazzotti reactions to dying parasites, not expected outside onchocerciasis" },
    { event: "Fever", anyGradePct: 22.6, source: LABEL, note: "Onchocerciasis trials, 963 adults, 100 to 200 micrograms per kg; Mazzotti reactions to dying parasites, not expected outside onchocerciasis" },
    { event: "Headache (regardless of cause)", anyGradePct: 22.3, source: LABEL, note: "Onchocerciasis trials, 963 adults; the label judged 0.2 percent drug-related" },
    { event: "Myalgia (regardless of cause)", anyGradePct: 19.7, source: LABEL, note: "Onchocerciasis trials, 963 adults; the label judged 0.4 percent drug-related" },
    { event: "Arthralgia or synovitis", anyGradePct: 9.3, source: LABEL, note: "Onchocerciasis trials, 963 adults, 100 to 200 micrograms per kg; Mazzotti reactions to dying parasites, not expected outside onchocerciasis" },
    { event: "Tachycardia (arrhythmia: fast heart rate)", anyGradePct: 3.5, source: LABEL, note: "Onchocerciasis trials, 963 adults; judged possibly, probably or definitely drug-related" },
    { event: "Peripheral oedema", anyGradePct: 3.2, source: LABEL, note: "Onchocerciasis trials, 963 adults; judged possibly, probably or definitely drug-related" },
    { event: "Facial oedema", anyGradePct: 1.2, source: LABEL, note: "Onchocerciasis trials, 963 adults; judged possibly, probably or definitely drug-related" },
    { event: "Orthostatic hypotension", anyGradePct: 1.1, source: LABEL, note: "Onchocerciasis trials, 963 adults; judged possibly, probably or definitely drug-related" },
    { event: "Decrease in white cell count", anyGradePct: 3, source: LABEL, note: "Strongyloidiasis trials, 109 patients, one or two doses of 170 to 200 micrograms per kg; laboratory finding regardless of drug relationship" },
    { event: "Dizziness (neurological, per label)", anyGradePct: 2.8, source: LABEL, note: "Strongyloidiasis trials, 109 patients, one or two doses of 170 to 200 micrograms per kg; judged drug-related" },
    { event: "ALT or AST elevation", anyGradePct: 2, source: LABEL, note: "Strongyloidiasis trials, 109 patients, one or two doses of 170 to 200 micrograms per kg; laboratory finding regardless of drug relationship" },
    { event: "Diarrhoea", anyGradePct: 1.8, source: LABEL, note: "Strongyloidiasis trials, 109 patients, one or two doses of 170 to 200 micrograms per kg; judged drug-related" },
    { event: "Nausea", anyGradePct: 1.8, source: LABEL, note: "Strongyloidiasis trials, 109 patients, one or two doses of 170 to 200 micrograms per kg; judged drug-related" },
    { event: "Somnolence, vertigo or tremor (neurological, per label)", anyGradePct: 0.9, source: LABEL, note: "Strongyloidiasis trials, 109 patients, one or two doses of 170 to 200 micrograms per kg; 0.9 percent each, judged drug-related" },
    { event: "Neurotoxicity: altered consciousness, stupor, coma, confusion, seizures, death", source: LABEL, note: "Warnings and overdosage sections; reported at recommended doses and in overdose, most often after veterinary formulations; no rate is given" },
  ],
  cancers: ["tnbc"], drugs: ["balstilimab", "pembrolizumab", "mebendazole", "fenbendazole"], companies: ["merck", "agenus"], institutions: ["cedars-sinai-cancer", "uf-health-cancer-center"],
  technologies: ["fenbendazole-ivermectin-repurposing-claims", "drug-repurposing", "checkpoint-inhibitor"], bottlenecks: ["b-generic-repurposing", "b-misinformation"],
  terms: ["off-label", "preclinical", "in-vitro-in-vivo", "cell-line", "rp2d", "orr", "hepatotoxicity", "trial-phases", "pharmacokinetics", "single-arm"],
  trials: ["nct05318469", "nct07487805", "nct04447235", "nct02366884"],
  keyPapers: ["paper-patel-ivermectin-cancer-curr-oncol-rep-2025", "paper-mujumdar-ivermectin-gynaecological-cancer-2025", "paper-straughn-ivermectin-hope-versus-hype-2025", "paper-yilmaz-ivermectin-toxicity-j-appl-toxicol-2026", "paper-draganov-ivermectin-cold-tumours-npj-breast-cancer-2021", "paper-hulscher-ivermectin-mebendazole-cohort-anticancer-res-2026", "paper-rockwell-ivermectin-benzimidazole-prescribing-jama-netw-open-2026", "paper-saperstein-ivermectin-neurotoxicity-breast-cancer-2026", "paper-powderly-fenbendazole-ivermectin-liver-injury-2026", "paper-hoang-ivermectin-toxicity-clin-toxicol-2022", "paper-gilene-ivermectin-toxicity-paediatric-oncology-2025", "paper-ghai-california-poison-control-ivermectin-2024", "paper-jimenez-gaona-ivermectin-loja-ecuador-2023", "paper-juarez-ivermectin-repositioned-cancer-drug-2018", "paper-tang-ivermectin-potential-anticancer-pharmacol-res-2021", "paper-cheng-melanoma-ctdna-antiparasitic-front-oncol-2026", "paper-ishiguro-dichloroacetate-ivermectin-cureus-2022", "paper-guilford-antiparasitic-acupuncture-meridian-case-series-2026"],
  wikipedia: L.wiki.url,
  links: [L.label, L.nda, L.who, ct("NCT05318469"), ct("NCT07487805"), ct("NCT04447235"), ct("NCT02366884"), L.fda, L.patel, L.draganov, L.draganovEoc, L.loja, L.hulscher, L.hulscherEoc, L.mujumdar, L.straughn, L.saperstein, L.powderly, L.hoang, L.rockwell, L.yilmaz, L.wiki],
};

export const fenbendazoleDrug: DrugInput = {
  id: "fenbendazole", kind: "drug", name: "Fenbendazole (veterinary anthelmintic)", aka: ["FBZ"], asOf, provenance, status: "preclinical",
  modality: "Veterinary benzimidazole anthelmintic; not approved for human use in any country",
  mechanism: "Binds parasite tubulin and stops microtubule assembly, which is how it kills worms in dogs and livestock. Cancer cell lines respond to the same microtubule effect in a dish; that is laboratory evidence with no human trial behind it.",
  tldr: "Fenbendazole is a dog and livestock dewormer that is sold online as a cancer cure. It has never been approved for people, no trial has tested it in cancer, and doctors have reported severe liver injury in patients who took it.",
  summary: "Fenbendazole is an anthelmintic approved only for animals, and its human use has grown because social media promotes it as an anticancer drug (Thakurdesai case report 2024). The first case of biopsy-confirmed severe liver injury from self-administered fenbendazole was a 67-year-old woman whose jaundice cleared three months after she stopped (Thakurdesai case report 2024). A 65-year-old man with prostate cancer who alternated veterinary fenbendazole and ivermectin daily for three months developed hepatocellular liver injury with a bilirubin of 12.9 mg/dL, which normalised within six weeks of stopping (Powderly case report 2026). A three-patient case series claiming remissions was retracted by the journal in January 2026 (Retraction notice 2026). After a January 2025 podcast promoted fenbendazole with ivermectin for cancer, combined prescribing to US cancer patients rose 2.6-fold (Rockwell JAMA Network Open 2026). The FDA's guidance on products promoted as cancer cures without trial evidence applies here (FDA on products claiming to cure cancer).",
  cancers: [], drugs: ["ivermectin", "mebendazole"], technologies: ["fenbendazole-ivermectin-repurposing-claims"], bottlenecks: ["b-misinformation"], terms: ["hepatotoxicity", "off-label", "preclinical"],
  keyPapers: ["paper-thakurdesai-fenbendazole-liver-injury-2024", "paper-powderly-fenbendazole-ivermectin-liver-injury-2026", "paper-makis-fenbendazole-case-series-retracted-2025", "paper-rockwell-ivermectin-benzimidazole-prescribing-jama-netw-open-2026"],
  wikipedia: "https://en.wikipedia.org/wiki/Fenbendazole",
  links: [L.thakurdesai, L.powderly, L.makisRetraction, L.rockwell, L.fda],
};

export const mebendazoleDrug: DrugInput = {
  id: "mebendazole", kind: "drug", name: "Mebendazole", aka: ["Vermox", "MBZ"], asOf, provenance, status: "phase-2",
  modality: "Oral benzimidazole anthelmintic for human worm infections, tested in two small cancer trials",
  mechanism: "Binds tubulin and blocks microtubule assembly in worms. In glioma and other cancer cell lines the same effect stops cell division; that is laboratory evidence, and the two human studies below are the clinical record.",
  tldr: "Mebendazole is a human worm medicine that has been through two very small cancer trials: a dose-finding study in brain tumours found a tolerable dose, and a study in advanced bowel and stomach cancers saw every patient's cancer keep growing.",
  summary: "Reverse swing-M, a phase 1 study of 11 patients with recurrent glioblastoma, added mebendazole to re-irradiation with temozolomide, to lomustine or to temozolomide alone, and set a recommended phase 2 dose of 1600 mg three times a day with temozolomide and 800 mg three times a day with lomustine, with anaemia in 82 percent and nausea in 64 percent the most common adverse events (Reverse swing-M phase 1 2020). A phase 2a study in treatment-refractory gastrointestinal cancer treated 10 of 11 enrolled patients with individually dosed mebendazole up to 4 g a day, saw no severe adverse effects, and stopped every patient for progressive disease by the eight-week scan, four of them meeting suggested criteria for hyperprogression (Mebendazole phase 2a 2021). A telemedicine cohort of 197 patients prescribed compounded ivermectin with mebendazole reported self-assessed benefit, and the journal has placed an expression of concern on the paper while it audits the data (Anticancer Research expression of concern 2026). Combined ivermectin and benzimidazole prescribing to US cancer patients rose 2.6-fold after a January 2025 podcast (Rockwell JAMA Network Open 2026).",
  cancers: ["glioblastoma"], drugs: ["ivermectin", "fenbendazole", "temozolomide", "lomustine"], technologies: ["fenbendazole-ivermectin-repurposing-claims", "drug-repurposing"], bottlenecks: ["b-generic-repurposing", "b-misinformation"], terms: ["rp2d", "off-label", "preclinical"],
  keyPapers: ["paper-patil-mebendazole-glioma-phase-1-cancer-med-2020", "paper-mansoori-mebendazole-gi-cancer-phase-2a-sci-rep-2021", "paper-hulscher-ivermectin-mebendazole-cohort-anticancer-res-2026"],
  wikipedia: "https://en.wikipedia.org/wiki/Mebendazole",
  links: [L.patil, L.mansoori, L.hulscherEoc, L.rockwell],
};

export const ivermectinDrugs: DrugInput[] = [ivermectinDrug, fenbendazoleDrug, mebendazoleDrug];

type T = Omit<TrialInput, "kind" | "asOf">;
const t = (x: T): TrialInput => ({ kind: "trial", asOf, provenance, ...x });

export const ivermectinTrials: TrialInput[] = [
  t({ id: "nct05318469", name: "Ivermectin with balstilimab or pembrolizumab in metastatic triple-negative breast cancer (Cedars-Sinai phase 1/2)", nct: "NCT05318469", phase: "1/2", status: "recruiting",
    sponsor: "Yuan Yuan, sponsor-investigator at Cedars-Sinai Medical Center, with Agenus and Gateway for Cancer Research", enrolled: 34,
    setting: "Metastatic triple-negative breast cancer: single-arm phase 1 dose finding then phase 2, ivermectin by mouth on days 1 to 3 of each week with balstilimab or pembrolizumab intravenously on day 1 of each 21-day cycle",
    tldr: "A small single-centre trial in Los Angeles is testing whether adding a worm medicine to an immunotherapy antibody is safe, and then whether it shrinks triple-negative breast cancer that has spread. It opened in 2023 and has not reported.",
    summary: "The study opened on 13 October 2023, plans 34 patients and expects to reach its primary completion in October 2026 (ClinicalTrials.gov NCT05318469). Phase 1 finds the recommended phase 2 dose of ivermectin by counting adverse events, and phase 2 measures the objective response rate, with progression-free survival, overall survival and duration of response as secondary endpoints (ClinicalTrials.gov NCT05318469). No results have been posted and no publication is indexed on Europe PMC (ClinicalTrials.gov NCT05318469). The registry entry for the later ICONIC trial reports that among the first nine treated patients no treatment-related serious adverse events were observed (ClinicalTrials.gov NCT07487805).",
    result: "No results posted (ClinicalTrials.gov NCT05318469). The ICONIC registry entry reports no treatment-related serious adverse events among the first nine treated patients (ClinicalTrials.gov NCT07487805).",
    drugs: ["ivermectin", "balstilimab", "pembrolizumab"], cancers: ["tnbc"], companies: ["agenus", "merck"], institutions: ["cedars-sinai-cancer"], technologies: ["checkpoint-inhibitor", "drug-repurposing"], terms: ["rp2d", "orr", "single-arm"], bottlenecks: ["b-generic-repurposing"],
    links: [ct("NCT05318469"), ct("NCT07487805")] }),

  t({ id: "nct07487805", name: "ICONIC: ivermectin combined with immune checkpoint inhibition in cancer (University of Florida phase 2)", nct: "NCT07487805", phase: "2", status: "planned",
    sponsor: "University of Florida", enrolled: 80,
    setting: "Adults with solid tumours on a standard immune checkpoint inhibitor: randomised to 200 or 400 micrograms per kg of oral ivermectin on days 1 to 3 of each week for four weeks",
    tldr: "A University of Florida trial will randomise 80 people already on immunotherapy to two doses of ivermectin and measure a change in their immune cells after two weeks. It is not yet open and does not measure whether tumours shrink.",
    summary: "ICONIC is a randomised, parallel-arm phase 2 in 80 adults with solid tumours, due to start in September 2026 and reach its primary completion in September 2027 (ClinicalTrials.gov NCT07487805). The primary endpoint is the median fold-change at week 2 in Ki-67-positive, HLA-DR-positive non-naive CD8 T cells, a laboratory marker of T-cell activation, with adverse events and cytokine changes as secondary endpoints (ClinicalTrials.gov NCT07487805). The registry text explains the rationale: widespread off-label use after public claims, a 2023 survey in Loja, Ecuador in which 19 percent of respondents had used ivermectin alongside cancer treatment, virtually absent clinical data, and a reported case of severe neurotoxicity in a patient with metastatic osteosarcoma on regorafenib attributed to a CYP3A4 interaction (ClinicalTrials.gov NCT07487805).",
    result: "Not yet recruiting; no results (ClinicalTrials.gov NCT07487805).",
    drugs: ["ivermectin"], cancers: [], institutions: ["uf-health-cancer-center"], technologies: ["checkpoint-inhibitor", "drug-repurposing"], terms: ["immune-checkpoint", "off-label", "pharmacokinetics"], bottlenecks: ["b-generic-repurposing", "b-misinformation"],
    links: [ct("NCT07487805")] }),

  t({ id: "nct04447235", name: "Ivermectin plus losartan for COVID-19 in cancer patients (ICESP phase 2, terminated)", nct: "NCT04447235", phase: "2", status: "negative",
    sponsor: "Instituto do Câncer do Estado de São Paulo", enrolled: 77,
    setting: "Patients with active cancer and newly diagnosed COVID-19: randomised, double-blind, placebo-controlled; a single 12 mg dose of ivermectin then losartan 50 mg daily for 15 days versus placebo; primary endpoint intensive care admission, mechanical ventilation or death within 28 days",
    tldr: "This Brazilian trial tested ivermectin against COVID-19 in people with cancer, not against the cancer itself. It was stopped early because an interim analysis found no difference between the drug and placebo.",
    summary: "The trial opened on 23 July 2020, planned 176 patients and was terminated after enrolling 77 (ClinicalTrials.gov NCT04447235). The registry gives the reason for stopping as 'futility analysis has demonstrated no difference between arms' (ClinicalTrials.gov NCT04447235). No results are posted and no publication was found on Europe PMC (ClinicalTrials.gov NCT04447235). It appears on this page because it is one of only four ivermectin studies on ClinicalTrials.gov that name cancer, and it says nothing about ivermectin as a cancer treatment (ClinicalTrials.gov NCT04447235).",
    result: "Terminated for futility after 77 of a planned 176 patients; no difference between arms on the interim analysis, per the registry; no publication (ClinicalTrials.gov NCT04447235).",
    drugs: ["ivermectin"], cancers: [], institutions: ["icesp"], terms: ["futility"],
    links: [ct("NCT04447235")] }),

  t({ id: "nct02366884", name: "Atavistic chemotherapy: combinations of antibacterial, antifungal and antiprotozoal drugs in advanced cancer (Arguello clinic, status unknown)", nct: "NCT02366884", phase: "2", status: "historic",
    sponsor: "Dr. Frank Arguello Cancer Clinic, San José del Cabo, Mexico", enrolled: 250,
    setting: "Advanced, metastatic or otherwise incurable cancers of any type after conventional treatment failed or was refused: randomised, single-blind, response-adaptive; four arms of two or six marketed anti-infective drugs, with ivermectin one of eight antiprotozoals in one arm",
    tldr: "A private Mexican clinic registered a trial of mixtures of antibiotics, antifungals and anti-parasite drugs, ivermectin among them, in any advanced cancer. The registry has not been updated since 2022, shows no results, and lists a primary endpoint judged partly by looking at tumours.",
    summary: "The study is registered by a private clinic as a phase 2 with an estimated 250 participants, started in July 2011, an estimated primary completion of December 2022 and an overall status of unknown since its last update in April 2022 (ClinicalTrials.gov NCT02366884). The antiprotozoal arm lists nitazoxanide, chloroquine, albendazole, ivermectin, mebendazole, metronidazole, praziquantel and levamisole, so any result could not be attributed to ivermectin alone (ClinicalTrials.gov NCT02366884). The primary outcome is objective clinical tumour regression at six months, with methods that include changes in signs and symptoms and visual inspection of tumours alongside imaging (ClinicalTrials.gov NCT02366884). No results are posted and the registry's reference list contains only the investigator's own animal papers from 1988 to 1998 (ClinicalTrials.gov NCT02366884).",
    result: "No results posted; status unknown since April 2022 (ClinicalTrials.gov NCT02366884).",
    drugs: ["ivermectin", "mebendazole"], cancers: [], technologies: ["fenbendazole-ivermectin-repurposing-claims"], bottlenecks: ["b-misinformation"],
    links: [ct("NCT02366884")] }),
];

type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, provenance, ...x });

/** Titles, authors, journals, years and abstracts were read from the Europe PMC core records cached on 24 September 2026. */
export const ivermectinPapers: PaperInput[] = [
  // ---- Reviews and editorial ----
  p({ id: "paper-juarez-ivermectin-repositioned-cancer-drug-2018", name: "The multitargeted drug ivermectin: from an antiparasitic agent to a repositioned cancer drug",
    tldr: "A 2018 review that gathered the cell-culture and animal experiments on ivermectin and argued it was ready for cancer trials; those trials began five years later and have not reported.",
    summary: "The review summarises in vitro and in vivo experiments in which ivermectin acted on multidrug resistance protein, Akt/mTOR and WNT-TCF signalling, purinergic receptors, PAK1, the SIN3A and SIN3B epigenetic regulators, RNA helicase and chloride channels, and on cancer stem-like cells (Juarez review 2018). It argues that the concentrations used are reachable in people on the basis of pharmacokinetic studies in healthy and parasite-infected volunteers, and that this could allow a rapid move into trials (Juarez review 2018).",
    journal: "American Journal of Cancer Research", year: 2018, pmid: "29511601", authors: "Juarez M, Schcolnik-Cabrera A, Dueñas-Gonzalez A.", paperType: "review", changedPractice: false,
    findings: ["Laboratory evidence only: cell lines and animal models across several cancer types.", "Argues that anticancer concentrations are clinically reachable, on pharmacokinetic grounds, not on any patient data."],
    whatItMeans: "This is the paper the online claims usually trace back to. It is a call for trials, not evidence that the drug works in people, and the trials it called for are still running.",
    caveats: ["No human efficacy data existed when it was written and none has been published since.", "The concentration argument has not been tested in a cancer patient."],
    links: [L.juarez, pubmed("29511601")], drugs: ["ivermectin"], technologies: ["drug-repurposing", "fenbendazole-ivermectin-repurposing-claims"], terms: ["in-vitro-in-vivo", "preclinical"] }),

  p({ id: "paper-tang-ivermectin-potential-anticancer-pharmacol-res-2021", name: "Ivermectin, a potential anticancer drug derived from an antiparasitic drug",
    tldr: "A 2021 review of the pathways through which ivermectin killed cancer cells in the laboratory, written as a case for testing it in people.",
    summary: "The review, indexed as a systematic review, collects reports that ivermectin inhibits proliferation of several tumour cell types by regulating multiple signalling pathways and promotes programmed cell death, and discusses prospects for clinical use (Tang review 2021). The evidence it reviews is from cell lines and animal models (Tang review 2021).",
    journal: "Pharmacological Research", year: 2021, doi: "10.1016/j.phrs.2020.105207", pmid: "32971268", authors: "Tang M, Hu X, Wang Y, et al.", paperType: "review", changedPractice: false,
    findings: ["Laboratory mechanisms catalogued: proliferation inhibition and programmed cell death across cancer cell lines."],
    whatItMeans: "Useful as a map of the laboratory story; it contains no patient outcomes.",
    caveats: ["Preclinical evidence only."],
    links: [L.tang, pubmed("32971268")], drugs: ["ivermectin"], technologies: ["drug-repurposing"], terms: ["preclinical", "in-vitro-in-vivo"] }),

  p({ id: "paper-patel-ivermectin-cancer-curr-oncol-rep-2025", name: "Ivermectin in cancer treatment: should healthcare providers caution or explore its therapeutic potential?",
    tldr: "A 2025 review that weighs the laboratory promise against the absence of human trials and concludes that clinicians should counter misinformation while supporting proper trials.",
    summary: "The review finds that in vitro and animal studies show anticancer effects through Wnt/beta-catenin and Akt/mTOR signalling, but that clinical evidence in humans is limited, with no large randomised controlled trials confirming benefit (Patel review 2025). It notes that observational studies and case reports show the risks of self-medication driven by social media, which has led to toxicity in some oncology patients, and calls the gap between preclinical and clinical evidence a critical translational gap (Patel review 2025).",
    journal: "Current Oncology Reports", year: 2025, doi: "10.1007/s11912-025-01704-z", pmid: "40715995", authors: "Patel Y, Chawla J, Parmar MS.", paperType: "review", changedPractice: false,
    findings: ["No large randomised trial confirms any therapeutic benefit of ivermectin in cancer.", "Self-medication driven by social media has caused toxicity in oncology patients."],
    whatItMeans: "The clearest recent statement of where the evidence stands: promising in a dish, untested in people, and already causing harm through self-dosing.",
    caveats: ["Narrative review; it does not add new data."],
    links: [L.patel, pubmed("40715995")], drugs: ["ivermectin"], journals: ["current-oncology-reports"], technologies: ["fenbendazole-ivermectin-repurposing-claims"], bottlenecks: ["b-misinformation"], terms: ["preclinical", "off-label"] }),

  p({ id: "paper-mujumdar-ivermectin-gynaecological-cancer-2025", name: "Ivermectin and gynecologic cancer: what's the data?",
    tldr: "Gynaecological oncologists reviewed the evidence for ivermectin in womb, ovarian and cervical cancers, found only cell-line data, and strongly caution against using it.",
    summary: "The review states that ivermectin was approved by the FDA in 1996 as an oral medicine for intestinal strongyloidiasis and onchocerciasis, that data on it as a gynaecological cancer-fighting compound are lacking, and that clinical studies of ivermectin in cancer are limited to effects observed in cell lines (Mujumdar review 2025). Its authors write that they have not assessed its safety and efficacy in gynaecological cancers and 'do not recommend and strongly caution' its use (Mujumdar review 2025).",
    journal: "Gynecologic Oncology Reports", year: 2025, doi: "10.1016/j.gore.2025.101803", pmid: "40851910", authors: "Mujumdar V, Huang M, Smith LC, Musa F.", paperType: "review", changedPractice: false,
    findings: ["Clinical evidence for ivermectin in gynaecological cancers is limited to cell-line studies.", "The authors strongly caution against its use for these cancers."],
    whatItMeans: "For a patient with a gynaecological cancer, the specialists who would run such a trial say the evidence does not exist yet.",
    caveats: ["Review of a field with almost no clinical data; the conclusion rests on absence of evidence rather than on trials showing harm."],
    links: [L.mujumdar, pubmed("40851910")], drugs: ["ivermectin"], cancers: ["ovarian", "endometrial", "cervical"], technologies: ["fenbendazole-ivermectin-repurposing-claims"], terms: ["cell-line"] }),

  p({ id: "paper-straughn-ivermectin-hope-versus-hype-2025", name: "Ivermectin treatment for gynecologic cancers: hope versus hype",
    tldr: "An editorial accompanying the gynaecological review: repurposing is legitimate and early trials deserve support, but no major oncology organisation endorses ivermectin for cancer and patients should not forgo proven treatment for it.",
    summary: "The editorial describes drug repurposing as a sound strategy whose usual failure mode is that agents active in cell culture or mice do not deliver clinical benefit in randomised trials (Straughn editorial 2025). It states that no major oncology organisations, including ASCO, SGO or NCCN, currently endorse ivermectin for cancer treatment, that the clinical evidence is not sufficient to support its use, and that ivermectin used outside approved dosing carries real risks of toxicity and drug interactions (Straughn editorial 2025). It welcomes the early-phase trials now under way and asks the oncology community to resist leaping ahead of the science (Straughn editorial 2025).",
    journal: "Gynecologic Oncology Reports", year: 2025, doi: "10.1016/j.gore.2025.101920", pmid: "40896730", authors: "Straughn JM.", paperType: "review", changedPractice: false,
    findings: ["No major oncology organisation endorses ivermectin for cancer treatment.", "Early-phase trials are under way and deserve support and scrutiny."],
    whatItMeans: "A measured position a patient can take to their oncologist: the drug is being tested properly, and until those tests report, it is not a treatment.",
    caveats: ["Editorial opinion, not a systematic review."],
    links: [L.straughn, pubmed("40896730")], drugs: ["ivermectin"], technologies: ["drug-repurposing", "fenbendazole-ivermectin-repurposing-claims"], bottlenecks: ["b-generic-repurposing", "b-misinformation"] }),

  p({ id: "paper-yilmaz-ivermectin-toxicity-j-appl-toxicol-2026", name: "Ivermectin toxicity in humans and animals: clinical spectrum, mechanisms, and management",
    tldr: "A 2026 review of how ivermectin poisons the nervous system: usually safe at approved doses, but encephalopathy, seizures, coma and death have followed high doses, and the pump that keeps it out of the brain is the key factor.",
    summary: "The review integrates controlled human trials, pharmacovigilance, case reports and animal studies, and finds that early placebo-controlled studies in healthy volunteers showed ivermectin well tolerated even at doses well above approved levels, while post-marketing surveillance has identified rare but severe neurotoxic events, including encephalopathy, seizures, coma and death, after supratherapeutic exposure and, in susceptible people, at standard doses (Yilmaz toxicity review 2026). It identifies impairment or saturation of P-glycoprotein-mediated efflux at the blood-brain barrier as the central determinant of neurotoxicity, and records that the COVID-19 pandemic brought a substantial increase in toxic exposures, especially to veterinary formulations, without demonstrated clinical benefit (Yilmaz toxicity review 2026).",
    journal: "Journal of Applied Toxicology", year: 2026, doi: "10.1002/jat.70166", pmid: "41837342", authors: "Yilmaz S, Göktaş B, Ateş İ, Çelik M.", paperType: "review", changedPractice: false,
    findings: ["Severe neurotoxicity follows high or cumulative dosing and, in susceptible people, standard doses.", "P-glycoprotein efflux at the blood-brain barrier is the central determinant; drugs that block it raise the risk.", "Pandemic-era off-label use, especially of veterinary products, increased toxic exposures without demonstrated benefit."],
    whatItMeans: "Explains why a patient on cancer drugs that inhibit P-glycoprotein or CYP3A4 is at higher risk from ivermectin than a healthy volunteer, and why veterinary doses are dangerous.",
    caveats: ["A review; the human neurotoxicity data are case reports and surveillance rather than controlled studies."],
    links: [L.yilmaz, pubmed("41837342")], drugs: ["ivermectin"], terms: ["pharmacokinetics"] }),

  // ---- Animal study and its expression of concern ----
  p({ id: "paper-draganov-ivermectin-cold-tumours-npj-breast-cancer-2021", name: "Ivermectin converts cold tumors hot and synergizes with immune checkpoint blockade for treatment of breast cancer (with 2026 expression of concern)",
    tldr: "The mouse study behind the current trials: ivermectin on its own did nothing to breast tumours in mice, but with an anti-PD-1 antibody the pair shrank them. The journal has since flagged duplicated images in one figure and the raw data are gone.",
    summary: "In mouse models of breast cancer, ivermectin induced immunogenic cell death and T-cell infiltration, and as a modulator of the ATP/P2X4/P2X7 axis reduced regulatory T cells and suppressive myeloid cells; neither ivermectin nor the anti-PD-1 antibody alone showed efficacy in vivo, but the combination limited tumour growth, produced complete responses and reduced relapse in neoadjuvant, adjuvant and metastatic settings (Draganov mouse study 2021). In June 2026 the journal issued an editorial expression of concern: multiple highly similar images were found between panels 4d and 4f, an author correction had already removed some duplicates, further checks found more, and the authors stated that the original data are no longer available, so readers are advised to interpret these data with caution (Expression of concern 2026).",
    journal: "npj Breast Cancer", year: 2021, doi: "10.1038/s41523-021-00229-5", pmid: "33654071", authors: "Draganov D, Han Z, Rana A, Bennett N, Irvine DJ, Lee PP.", paperType: "basic", changedPractice: false,
    findings: ["Mice only: ivermectin alone had no effect on tumour growth; ivermectin plus anti-PD-1 limited growth and produced complete responses.", "Expression of concern, 5 June 2026: duplicated images in Figure 4d and 4f, original data unavailable."],
    whatItMeans: "This is the scientific basis for pairing ivermectin with checkpoint antibodies in the Cedars-Sinai and ICONIC trials. Its key figure is now in doubt, which makes those trials more important, not less, as the only way to find out whether the effect is real.",
    caveats: ["Animal study; no patient data.", "Editorial expression of concern issued 5 June 2026 over duplicated images; original data no longer available.", "An author correction (npj Breast Cancer 2026;12:31) preceded the expression of concern."],
    links: [L.draganov, L.draganovEoc, pubmed("33654071"), { label: "Expression of concern on PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/42248882/" }],
    drugs: ["ivermectin"], cancers: ["tnbc"], technologies: ["checkpoint-inhibitor"], trials: ["nct05318469", "nct07487805"], terms: ["preclinical", "in-vitro-in-vivo"] }),

  // ---- Observational and survey ----
  p({ id: "paper-hulscher-ivermectin-mebendazole-cohort-anticancer-res-2026", name: "Real-world clinical outcomes of ivermectin and mebendazole in cancer patients: results from a prospective observational cohort (with 2026 expression of concern)",
    tldr: "A telemedicine company's survey of patients it prescribed ivermectin and mebendazole reported that most felt better; the journal has attached an expression of concern while it checks whether the diagnoses, the regressions and the ethical approval can be verified.",
    summary: "The cohort comprised 197 patients with cancer prescribed compounded ivermectin 25 mg with mebendazole 250 mg off-label through a US telemedicine platform, of whom 122 completed a six-month digital survey; the authors report a self-assessed 'clinical benefit ratio' of 84.4 percent, with 48.4 percent reporting regression or no evidence of disease, 36.1 percent stable and 15.6 percent progression, side effects in 25.4 percent, and 27.9 percent also on chemotherapy (Hulscher cohort 2026). On 9 June 2026 the journal's editorial board issued an expression of concern citing serious concerns about the verifiability, statistical reliability and ethical oversight of the dataset, and opened an audit of the institutional review board documentation, the source records confirming the 197 baseline diagnoses and the medical documentation behind the reported regressions (Anticancer Research expression of concern 2026). The board also stated that it does not endorse or condone unvalidated off-label use of medications for unapproved oncological indications (Anticancer Research expression of concern 2026).",
    journal: "Anticancer Research", year: 2026, doi: "10.21873/anticanres.18194", pmid: "42203321", authors: "Hulscher N, Victory K, Thorp JA, et al.", paperType: "observational", participants: 197, changedPractice: false,
    findings: ["197 prescribed, 122 surveyed at six months; outcomes were self-reported by the patients, not measured by scans read for the study.", "Expression of concern, 9 June 2026: audit of ethical approval, baseline diagnoses and the documentation behind reported regressions."],
    whatItMeans: "This is the paper most often quoted online as proof. Patients reporting how they feel to the company that sold them the treatment, with 38 percent not answering, cannot show whether a cancer shrank, and the journal is now checking whether the underlying records exist.",
    caveats: ["Self-reported outcomes through digital surveys; no independent imaging review; 38 percent lost to follow-up.", "Expression of concern issued 9 June 2026; a further update notice is indexed on Europe PMC (PMID 42703869, September 2026) whose content OnCo has not read.", "Many participants were also receiving chemotherapy, radiotherapy or surgery."],
    links: [L.hulscher, L.hulscherEoc, pubmed("42203321"), { label: "Expression of concern on PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/42300708/" }],
    drugs: ["ivermectin", "mebendazole"], journals: ["anticancer-research"], technologies: ["fenbendazole-ivermectin-repurposing-claims"], bottlenecks: ["b-misinformation"], terms: ["off-label"] }),

  p({ id: "paper-jimenez-gaona-ivermectin-loja-ecuador-2023", name: "Outcome of ivermectin in cancer treatment: an experience in Loja, Ecuador",
    tldr: "A survey in rural Ecuador found that about one in five people with cancer were taking cattle ivermectin alongside their treatment, while the specialists interviewed said there was no evidence and did not recommend it.",
    summary: "Using observation, surveys and interviews in the rural Loja province, the study found that 19 percent of participants diagnosed with cancer took ivermectin-based medicines, commonly used in cattle, as an alternative therapy without leaving chemotherapy, radiotherapy or immunotherapy, while 81 percent used it for other diseases (Loja survey 2023). Participants said they felt better after the third dose; the specialists interviewed said there was no authorisation to prescribe it, no scientific knowledge of its use in humans for cancer, and that they did not recommend it (Loja survey 2023).",
    journal: "Nursing Reports", year: 2023, doi: "10.3390/nursrep13010030", pmid: "36976682", authors: "Jiménez-Gaona Y, Vivanco-Galván O, Morales-Larreategui G, Cabrera-Bejarano A, Lakshminarayanan V.", paperType: "observational", changedPractice: false,
    findings: ["19 percent of surveyed cancer patients used ivermectin as an add-on to their treatment.", "Self-reported improvement only; specialists interviewed did not recommend it."],
    whatItMeans: "Shows how widespread use already is where cancer care is expensive, and why the ICONIC investigators cite it as a reason to run a proper trial.",
    caveats: ["Small mixed-methods survey; no clinical outcomes measured."],
    links: [L.loja, pubmed("36976682")], drugs: ["ivermectin"], trials: ["nct07487805"], bottlenecks: ["b-misinformation"] }),

  p({ id: "paper-rockwell-ivermectin-benzimidazole-prescribing-jama-netw-open-2026", name: "Ivermectin-benzimidazole prescribing following celebrity endorsement",
    tldr: "After a January 2025 podcast promoted ivermectin with a dog dewormer as a cancer cure, US prescriptions of the combination doubled overall and rose 2.6-fold among people with cancer, most steeply in the South.",
    summary: "Using electronic records from 67 US health care organisations covering 68,373,949 patients, the authors compared same-day ivermectin plus benzimidazole prescribing from January to July 2025 with the same months of 2024 (Rockwell JAMA Network Open 2026). Overall prescribing doubled, rate ratio 1.97 with a 99.5 percent confidence interval of 1.70 to 2.29, and among patients with a cancer diagnosis it rose 2.63-fold, 99.5 percent confidence interval 2.08 to 3.24, with larger rises in men, in adults under 65, in White patients and in the South (Rockwell JAMA Network Open 2026). The authors note that no rigorous trial evidence supports ivermectin, fenbendazole or other benzimidazoles for cancer, and that the podcast was viewed more than 60 million times (Rockwell JAMA Network Open 2026).",
    journal: "JAMA Network Open", year: 2026, doi: "10.1001/jamanetworkopen.2026.16780", pmid: "42118539", authors: "Rockwell MS, Kahn KL, Fendrick AM, Vangala S, Mafi JN.", paperType: "observational", participants: 68373949, changedPractice: false,
    findings: ["Combination prescribing doubled after the January 2025 endorsement: rate ratio 1.97 (99.5 percent CI 1.70 to 2.29).", "Among patients with cancer the rate ratio was 2.63 (99.5 percent CI 2.08 to 3.24); in the South, 3.91."],
    whatItMeans: "Measures the reach of the claim rather than the drug: tens of thousands of prescriptions written on the strength of a podcast, with no trial behind them.",
    caveats: ["Observational; prescriptions ordered, not dispensed or taken; cannot show whether patients delayed conventional treatment."],
    links: [L.rockwell, pubmed("42118539")], drugs: ["ivermectin", "fenbendazole", "mebendazole"], technologies: ["fenbendazole-ivermectin-repurposing-claims"], bottlenecks: ["b-misinformation"] }),

  // ---- Case reports of harm and poison-centre series ----
  p({ id: "paper-saperstein-ivermectin-neurotoxicity-breast-cancer-2026", name: "Life-threatening neurotoxicity following off-label ivermectin use in metastatic breast cancer: a case report",
    tldr: "A 73-year-old woman with metastatic breast cancer took high doses of ivermectin after reading about it online, had seizures and stopped breathing adequately, and spent two days on a ventilator before recovering fully.",
    summary: "The patient self-administered high doses of ivermectin based on information obtained online, developed acute altered mental status, generalised seizures and respiratory failure, and was managed with intubation, mechanical ventilation, intravenous fluids and anticonvulsants, recovering to baseline within 48 hours (Saperstein case report 2026). The authors note that the FDA has explicitly discouraged ivermectin for cancer outside clinical trials and ask clinicians to take a thorough exposure history (Saperstein case report 2026).",
    journal: "Postgraduate Medicine", year: 2026, doi: "10.1080/00325481.2026.2672183", pmid: "42170801", authors: "Saperstein Y, Bou Sanayeh E, Boazak P, Itani H, Moussa E, Gut T.", paperType: "observational", participants: 1, changedPractice: false,
    findings: ["Seizures, altered consciousness and respiratory failure after unintentional high-dose self-administration; full recovery within 48 hours with intensive care."],
    whatItMeans: "The clearest documented case of what the label's neurotoxicity warning looks like in a cancer patient dosing herself.",
    caveats: ["Single case; the dose taken was not precisely known."],
    links: [L.saperstein, pubmed("42170801")], drugs: ["ivermectin"], terms: ["off-label"], bottlenecks: ["b-misinformation"] }),

  p({ id: "paper-powderly-fenbendazole-ivermectin-liver-injury-2026", name: "Drug-induced liver injury following co-ingestion of veterinary fenbendazole and ivermectin for prostate cancer: a case report",
    tldr: "A 65-year-old man with prostate cancer took veterinary fenbendazole and ivermectin on alternate days for three months on the advice of online support groups and developed severe liver injury, which cleared six weeks after he stopped.",
    summary: "The patient presented with two weeks of fatigue, jaundice and abdominal pain after a three-month regimen of alternating veterinary-grade fenbendazole and ivermectin at 'one squirt' a day, estimated at 0.18 mg/kg of ivermectin and 0.98 mg/kg of fenbendazole (Powderly case report 2026). Alanine aminotransferase was 1764 U/L, aspartate aminotransferase 1132 U/L and bilirubin 12.9 mg/dL, viral, autoimmune and biliary causes were excluded, transaminases fell 58 percent within nine days of stopping and normalised within six weeks, and a RUCAM score of 9 rated the causal link 'highly probable' (Powderly case report 2026).",
    journal: "Cureus", year: 2026, doi: "10.7759/cureus.108896", pmid: "42299164", authors: "Powderly GE, Hassevoort K, Loy M, Balonier J, Sievers C.", paperType: "observational", participants: 1, changedPractice: false,
    findings: ["Hepatocellular liver injury with bilirubin 12.9 mg/dL after three months of veterinary fenbendazole and ivermectin; RUCAM 9, highly probable.", "Resolved within six weeks of stopping both agents."],
    whatItMeans: "Veterinary paste is dosed for animals by weight, and 'one squirt' is not a human dose. Liver injury of this severity can be fatal and this patient was fortunate to present in time.",
    caveats: ["Single case; the relative contribution of the two drugs cannot be separated."],
    links: [L.powderly, pubmed("42299164")], drugs: ["ivermectin", "fenbendazole"], cancers: ["prostate"], terms: ["hepatotoxicity", "off-label"], bottlenecks: ["b-misinformation"] }),

  p({ id: "paper-gilene-ivermectin-toxicity-paediatric-oncology-2025", name: "The threat of medical misinformation: a case of ivermectin toxicity in a pediatric oncology patient",
    tldr: "A letter describing severe ivermectin poisoning in a young patient with bone cancer who was also taking regorafenib, a cancer drug that shares the enzyme ivermectin is cleared by.",
    summary: "Europe PMC indexes this letter without an abstract, so OnCo transcribes no figures from it (Gilene paediatric case 2025). The ICONIC trial's registry entry summarises it as a case of severe neurotoxicity in a patient with metastatic osteosarcoma receiving regorafenib, likely due to a pharmacokinetic interaction through CYP3A4 (ClinicalTrials.gov NCT07487805).",
    journal: "Pediatric Blood & Cancer", year: 2025, doi: "10.1002/pbc.31876", pmid: "40556334", authors: "Gilene S, Haacker L, Rutan H, Pressey JG.", paperType: "observational", participants: 1, changedPractice: false,
    findings: ["Severe neurotoxicity in a paediatric osteosarcoma patient on regorafenib, attributed to a CYP3A4 interaction, as summarised by the ICONIC registry entry."],
    whatItMeans: "A reminder that ivermectin interacts with cancer drugs: the dose that a healthy adult tolerates can poison a patient whose liver enzymes are already occupied by a kinase inhibitor.",
    caveats: ["Letter with no indexed abstract; details are taken from the ICONIC registry's summary of it."],
    links: [L.gilene, pubmed("40556334"), ct("NCT07487805")], drugs: ["ivermectin", "regorafenib"], cancers: ["osteosarcoma"], journals: ["pediatric-blood-and-cancer"], trials: ["nct07487805"], terms: ["pharmacokinetics"], bottlenecks: ["b-misinformation"] }),

  p({ id: "paper-hoang-ivermectin-toxicity-clin-toxicol-2022", name: "Characteristics of ivermectin toxicity in patients taking veterinary and human formulations for the prevention and treatment of COVID-19",
    tldr: "An Oregon poison centre saw 37 people poisoned by ivermectin in six months of the pandemic; 30 had nervous-system effects, 21 were admitted to hospital and one died, with veterinary products giving the largest doses and the most confusion.",
    summary: "The Oregon Poison Center reviewed 37 ivermectin exposures for COVID-19 prevention or treatment that led to a healthcare visit between 14 August 2021 and 31 January 2022; median age was 64, most were men, 21 were hospitalised, 13 treated in an emergency department and one died (Hoang poison centre series 2022). Neurotoxicity occurred in 30, gastrointestinal symptoms in 14 and musculoskeletal complaints in 7; the 17 who took veterinary formulations took higher doses and had more altered mental status than the 15 on prescription tablets, and chronic users on a median 13.5 mg a day for 3.8 weeks had milder toxicity (Hoang poison centre series 2022).",
    journal: "Clinical Toxicology", year: 2022, doi: "10.1080/15563650.2022.2134788", pmid: "36374218", authors: "Hoang R, Temple C, Correia MS, Clemons J, Hendrickson RG.", paperType: "observational", participants: 37, changedPractice: false,
    findings: ["37 cases: neurotoxicity 30, hospitalised 21, one death.", "Veterinary formulations were associated with higher doses and more altered mental status than prescription tablets."],
    whatItMeans: "The pattern of harm that cancer self-dosing now repeats: mostly older men, veterinary products, and neurological effects that need hospital care.",
    caveats: ["Retrospective single-centre series limited to cases that reached a poison centre; COVID-19 use rather than cancer use."],
    links: [L.hoang, pubmed("36374218")], drugs: ["ivermectin"] }),

  p({ id: "paper-ghai-california-poison-control-ivermectin-2024", name: "Exposures to bleach, peroxide, disinfectants, antimalarials, and ivermectin reported to the California Poison Control System before and during the COVID-19 pandemic, 2015 to 2021",
    tldr: "California's poison control system saw ivermectin exposures rise steadily through 2021 as people tried it against COVID-19, from about 14 a month to a rising monthly count.",
    summary: "Interrupted time-series analysis of California Poison Control System reports from 2015 through 2021 found that reported ivermectin exposures were stable at 14.5 a month before December 2020 and then increased by 2.05 a month through December 2021 (Ghai poison centre trends 2024). Exposures to household cleaning products also rose sharply in March 2020, while antimalarial exposures did not change significantly (Ghai poison centre trends 2024).",
    journal: "Public Health Reports", year: 2024, doi: "10.1177/00333549231201679", pmid: "37933467", authors: "Ghai A, Sabour E, Salonga R, Ho R, Apollonio DE.", paperType: "observational", changedPractice: false,
    findings: ["Ivermectin exposure reports rose by about two a month from December 2020 through December 2021, from a baseline of 14.5 a month."],
    whatItMeans: "Population-level evidence that when a drug is promoted online for an unproven use, poison centres see the result.",
    caveats: ["Reports to a poison centre undercount exposures and do not record severity in this analysis."],
    links: [L.ghai, pubmed("37933467")], drugs: ["ivermectin"] }),

  // ---- Anecdotal reports of benefit ----
  p({ id: "paper-cheng-melanoma-ctdna-antiparasitic-front-oncol-2026", name: "Metastatic melanoma with initial ctDNA decline and radiographic response during self-directed antiparasitic use: treatment effect or spontaneous regression?",
    tldr: "A man with metastatic melanoma who refused standard treatment and took ivermectin and fenbendazole saw his tumour markers and scans improve for a while, then worsen; his oncologists judged spontaneous immune regression at least as likely as any drug effect.",
    summary: "A 74-year-old man with nodular melanoma and nodal and liver metastases declined guideline-directed therapy and took ivermectin and fenbendazole with lifestyle changes; his disease initially showed reduced metabolic activity and size on imaging and his tumour-informed ctDNA fell from 2.04 to 0.18 MTM/mL, then both worsened, with ctDNA rising to 0.93 MTM/mL and the dominant axillary mass growing (Cheng melanoma case report 2026). The tumour carried at least 50 mutations per megabase, placing it at the extreme immunogenic end of the spectrum, and the authors write that spontaneous immune-mediated regression is at least as plausible as any effect of the patient's interventions, that clinical evidence for efficacy is absent, and that safety counselling is needed given the drugs' reported toxicities (Cheng melanoma case report 2026).",
    journal: "Frontiers in Oncology", year: 2026, doi: "10.3389/fonc.2026.1907192", pmid: "42745863", authors: "Cheng R, Araujo DV.", paperType: "observational", participants: 1, changedPractice: false,
    findings: ["Transient ctDNA and imaging improvement followed by progression during self-directed ivermectin and fenbendazole.", "Very high tumour mutational burden made spontaneous immune regression a plausible explanation."],
    whatItMeans: "Shows why single stories cannot settle the question: a melanoma this immunogenic can wax and wane on its own, and the improvement did not last.",
    caveats: ["Single case; the patient declined immunotherapy, which such a tumour would be expected to respond to."],
    links: [L.cheng, pubmed("42745863")], drugs: ["ivermectin", "fenbendazole"], cancers: ["melanoma"], technologies: ["fenbendazole-ivermectin-repurposing-claims"] }),

  p({ id: "paper-ishiguro-dichloroacetate-ivermectin-cureus-2022", name: "Synergistic anti-tumor effect of dichloroacetate and ivermectin",
    tldr: "Three patients treated at a private clinic with dichloroacetate, omeprazole, tamoxifen and ivermectin were reported to have relief of symptoms; there was no control, no measured tumour response and no follow-up study.",
    summary: "The authors, who had earlier proposed that dichloroacetate, omeprazole and tamoxifen block cancer progression by reducing lactic acid production, present three patients in whom adding ivermectin was said to have 'dramatically relieved' the symptoms of cancer and sarcoma progression (Ishiguro case series 2022). The report describes symptom relief rather than tumour measurements (Ishiguro case series 2022).",
    journal: "Cureus", year: 2022, doi: "10.7759/cureus.21884", pmid: "35265417", authors: "Ishiguro T, Ishiguro RH, Ishiguro M, Toki A, Terunuma H.", paperType: "observational", participants: 3, changedPractice: false,
    findings: ["Three patients; symptom relief reported; no objective response measured."],
    whatItMeans: "An anecdote from the clinic that prescribed the regimen; it cannot show benefit and has not led to a trial.",
    caveats: ["No control group, no tumour measurements, authors treated the patients they report on."],
    links: [L.ishiguro, pubmed("35265417")], drugs: ["ivermectin"] }),

  p({ id: "paper-guilford-antiparasitic-acupuncture-meridian-case-series-2026", name: "Cancer therapy using antiparasitic medications guided by acupuncture meridian assessment: a case series of six patients",
    tldr: "Six patients with advanced cancers treated over a decade with antiparasitic drugs chosen by measuring electrical conductance at acupuncture points were reported to have lived longer than expected; the method has no established basis and the series has no controls.",
    summary: "Six patients with stage IV breast, lung, prostate, glioblastoma and multiple myeloma seen between 2011 and 2022 received combinations of ivermectin, mebendazole, praziquantel, niclosamide and antifungals selected by acupuncture meridian assessment, a modification of electroacupuncture according to Voll that measures skin conductance, with dental infections treated at the same time (Guilford case series 2026). The authors report survival beyond conventional expectation in all six and no serious adverse events, and call for further study (Guilford case series 2026).",
    journal: "Integrative Medicine (Encinitas)", year: 2026, pmid: "42491797", authors: "Guilford FT, Yu S.", paperType: "observational", participants: 6, changedPractice: false,
    findings: ["Six selected patients over eleven years; drug choice by skin-conductance readings; no controls."],
    whatItMeans: "A case series selected by its authors from a decade of practice cannot show that any drug worked, and the selection method has no scientific basis.",
    caveats: ["Retrospective, uncontrolled, author-selected; several patients also had conventional treatment.", "Acupuncture meridian assessment has no validated relation to drug choice."],
    links: [L.guilford, pubmed("42491797")], drugs: ["ivermectin", "mebendazole"], technologies: ["fenbendazole-ivermectin-repurposing-claims"], bottlenecks: ["b-misinformation"] }),

  // ---- Fenbendazole ----
  p({ id: "paper-thakurdesai-fenbendazole-liver-injury-2024", name: "Severe drug-induced liver injury due to self-administration of the veterinary anthelmintic medication fenbendazole",
    tldr: "The first biopsy-confirmed case of severe liver injury from a dog dewormer taken for cancer: a 67-year-old woman with two weeks of jaundice whose liver tests took three months to recover.",
    summary: "Fenbendazole is approved for veterinary use only, and its human use appears to be increasing because social media popularises its potential anticancer effects (Thakurdesai case report 2024). The authors describe the first case of histologically confirmed severe drug-induced liver injury, hepatocellular pattern, in a 67-year-old woman who presented with two weeks of jaundice after self-administering fenbendazole; liver function tests normalised three months after she stopped (Thakurdesai case report 2024).",
    journal: "ACG Case Reports Journal", year: 2024, doi: "10.14309/crj.0000000000001354", pmid: "38706451", authors: "Thakurdesai A, Rivera-Matos L, Nagra N, Busch B, Mais DD, Cave MC.", paperType: "observational", participants: 1, changedPractice: false,
    findings: ["Histologically confirmed hepatocellular liver injury from self-administered fenbendazole; recovery over three months."],
    whatItMeans: "Fenbendazole has never been tested for safety in people. This is what that absence means in practice.",
    caveats: ["Single case."],
    links: [L.thakurdesai, pubmed("38706451")], drugs: ["fenbendazole"], terms: ["hepatotoxicity"], bottlenecks: ["b-misinformation"] }),

  p({ id: "paper-makis-fenbendazole-case-series-retracted-2025", name: "RETRACTED: Fenbendazole as an anticancer agent? A case series of self-administration in three patients",
    tldr: "A 2025 report of three patients said to have gone into remission on a dog dewormer was retracted by the journal in January 2026. It should not be cited as evidence.",
    summary: "The paper reported three patients with advanced breast cancer, prostate cancer and melanoma, two said to have achieved complete remission and one near-complete remission after adding fenbendazole to other therapies excluding chemotherapy, with no adverse effects (Makis case series 2025, retracted). The journal published a retraction statement on 21 January 2026 (Retraction notice 2026).",
    journal: "Case Reports in Oncology", year: 2025, doi: "10.1159/000546362", pmid: "40605964", authors: "Makis W, Baghli I, Martinez P.", paperType: "observational", participants: 3, changedPractice: false,
    findings: ["Retracted 21 January 2026; the claims of remission no longer stand in the scholarly record."],
    whatItMeans: "This paper circulates widely online. Anyone quoting it should know that the journal has withdrawn it.",
    caveats: ["Retracted publication; the retraction notice (PMID 41574240) is indexed on PubMed."],
    links: [L.makis, L.makisRetraction, pubmed("40605964"), { label: "Retraction notice on PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/41574240/" }], drugs: ["fenbendazole"], technologies: ["fenbendazole-ivermectin-repurposing-claims"], bottlenecks: ["b-misinformation"] }),

  // ---- Mebendazole trials ----
  p({ id: "paper-patil-mebendazole-glioma-phase-1-cancer-med-2020", name: "Reverse swing-M, phase 1 study of repurposing mebendazole in recurrent high-grade glioma",
    tldr: "An Indian phase 1 trial gave a worm medicine to 11 people with recurrent glioblastoma alongside chemotherapy or re-irradiation, found the dose they could tolerate, and saw anaemia and nausea as the most common side effects.",
    summary: "Eleven patients with recurrent glioblastoma were enrolled in an accelerated titration design: arm A1 added mebendazole to re-irradiation with concurrent temozolomide, arm B1 to lomustine and arm C1 to temozolomide alone (Reverse swing-M phase 1 2020). The maximum tolerated dose was not reached in arms A1 and C1, giving a recommended phase 2 dose of 1600 mg three times a day, while with lomustine it was 1600 mg three times a day and the recommended dose 800 mg three times a day; the most common adverse events were anaemia in 9 patients, nausea in 7 and fatigue in 6 (Reverse swing-M phase 1 2020).",
    journal: "Cancer Medicine", year: 2020, doi: "10.1002/cam4.3094", pmid: "32400117", authors: "Patil VM, Bhelekar A, Menon N, et al.", paperType: "translational", participants: 11, changedPractice: false,
    findings: ["Recommended phase 2 dose 1600 mg three times a day with temozolomide or chemoradiation; 800 mg three times a day with lomustine.", "Anaemia 82 percent, nausea 64 percent, fatigue 55 percent."],
    whatItMeans: "This is what legitimate repurposing looks like: a registered dose-finding trial that reports its toxicities. It says nothing yet about whether mebendazole helps glioblastoma.",
    caveats: ["Phase 1 with 11 patients; no efficacy endpoint."],
    links: [L.patil, pubmed("32400117")], drugs: ["mebendazole", "temozolomide", "lomustine"], cancers: ["glioblastoma"], journals: ["cancer-medicine"], technologies: ["drug-repurposing"], terms: ["rp2d", "dose-escalation-design"] }),

  p({ id: "paper-mansoori-mebendazole-gi-cancer-phase-2a-sci-rep-2021", name: "A phase 2a clinical study on the safety and efficacy of individualized dosed mebendazole in patients with advanced gastrointestinal cancer",
    tldr: "A Swedish trial gave mebendazole to ten people with advanced bowel and stomach cancers that had stopped responding to treatment; it was safe, but every patient's cancer kept growing, four of them unusually fast.",
    summary: "Patients with treatment-refractory gastrointestinal cancer received mebendazole at individually adjusted doses up to 4 g a day aiming at a serum level of 300 ng/mL; 11 were included and 10 started treatment (Mebendazole phase 2a 2021). Two stopped before and the remaining eight after the eight-week CT scan, all for progressive disease, four met suggested criteria for hyperprogression, only five reached the target level, and no severe adverse effects were observed; the authors conclude that new approaches such as prodrugs or combinations would be needed for further exploration (Mebendazole phase 2a 2021).",
    journal: "Scientific Reports", year: 2021, doi: "10.1038/s41598-021-88433-y", pmid: "33903692", authors: "Mansoori S, Fryknäs M, Alvfors C, Loskog A, Larsson R, Nygren P.", paperType: "translational", participants: 11, changedPractice: false,
    findings: ["10 treated; all 10 stopped for progressive disease by the eight-week scan; four met hyperprogression criteria.", "No severe adverse effects; only five reached the target serum concentration."],
    whatItMeans: "The only completed efficacy study of an internet-famous dewormer in cancer patients found no benefit in anyone. It is the clearest human result in this whole story.",
    caveats: ["Small single-arm study in heavily pretreated patients; drug exposure was below target in half of them."],
    links: [L.mansoori, pubmed("33903692")], drugs: ["mebendazole"], cancers: ["colorectal", "gastric"], technologies: ["drug-repurposing"], terms: ["single-arm"] }),
];
