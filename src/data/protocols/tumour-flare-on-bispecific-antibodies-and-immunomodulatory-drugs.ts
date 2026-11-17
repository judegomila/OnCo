import { protocol } from "./helpers";

/*
 * Recognising and managing tumour flare on the CD20xCD3 bispecific antibodies (glofitamab, mosunetuzumab,
 * epcoritamab) and on lenalidomide in lymphoma and chronic lymphocytic leukaemia.
 *
 * This is a small protocol because the guidance is thin: almost all of it is label text, and the one consensus paper
 * on bispecific antibody toxicity could not be read in full.
 *
 * What was read, and how (all on 16 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - US prescribing information, full text, from the DailyMed SPL XML service, tags stripped: Columvi (glofitamab,
 *   setid 3516e753-f064-4d30-9bd5-e3f2e143f75d; sections 2.4, 5.4, 6.1, 17), Lunsumio (mosunetuzumab,
 *   2ef0cf38-101c-4681-98fe-c05dc9ead443; section 5.6 and the medication guide), Epkinly (epcoritamab,
 *   d7836711-b677-412d-bf2d-0f7c8444103a; sections 6.1 and 14, which mention tumour flare but give no warning section
 *   or management rule) and Revlimid (lenalidomide, 5fa97bf5-28a2-48f1-8955-f56012d296be; section 5.11).
 * - EU product information, full text, EMA PDFs converted with pdftotext -layout: Columvi, Tepkinly (epcoritamab),
 *   Lunsumio and Revlimid (ema.europa.eu/en/documents/product-information/<name>-epar-product-information_en.pdf).
 *   These PDFs print no revision date; the year given for each is its first EU authorisation.
 * - Britto et al., CMAJ 2025, "Bispecific antibody toxicities", a one-page practice summary (open access): full text,
 *   Europe PMC full-text XML (PMC11867601).
 * - MacDonald et al., Curr Oncol 2025, Canadian practical guidance on bispecific antibodies for DLBCL (open access):
 *   full text, Europe PMC full-text XML (PMC12384478). Its funding statement reads "This research and the APC was
 *   funded by HOFFMANN-LA ROCHE LTD." (Roche makes glofitamab and mosunetuzumab). On tumour flare it only endorses the
 *   product monographs and Crombie 2024.
 * - Taleb, Anticancer Drugs 2019, a literature review of tumour flare reaction (open access): full text, Europe PMC
 *   full-text XML (PMC6749970). Single author; declares no conflicts of interest.
 * - Cheson et al., Blood 2016, the LYRIC refinement of the Lugano response criteria: abstract only (Europe PMC). The
 *   paper is on ashpublications.org, which returned 403 to a script, and the NCBI id converter reports it is not in
 *   PubMed Central. The size and timing thresholds of its "indeterminate response" categories are therefore not given.
 * - Crombie et al., Blood 2024, consensus recommendations on toxicity of CD3xCD20 bispecific antibodies: abstract only
 *   (Europe PMC), for the same reasons. The abstract does not mention tumour flare, so nothing here rests on it and
 *   its funding statement could not be checked.
 * - Carlo-Stella et al., Leuk Lymphoma 2024, "Tumor flare with T-cell-engaging bispecific antibodies": Europe PMC holds
 *   a title and author list only, with no abstract. Not cited.
 *
 * Every DOI was resolved through Crossref or Europe PMC and its title checked. Quotes are copied from the raw text with
 * line breaks joined and nothing else changed.
 */
export const tumourFlareOnBispecificAntibodiesAndImmunomodulatoryDrugs = protocol({
  id: "tumour-flare-on-bispecific-antibodies-and-immunomodulatory-drugs",
  name: "Tumour flare on bispecific antibodies and lenalidomide in lymphoma: recognition and management",
  aka: ["tumour flare", "tumor flare", "tumour flare reaction", "TFR", "pseudoprogression in lymphoma", "pseudo-progression", "flare reaction on glofitamab", "lenalidomide tumour flare", "indeterminate response"],
  domain: "immunotherapy-toxicity",
  tldr: "Some lymphoma medicines draw immune cells into the lymphoma, which can make lumps swell and hurt for a few days before they shrink. This is tumour flare. It is usually mild and treated with painkillers and sometimes steroids, but a lump near the windpipe or another vital organ can press on it. Tell your team at once about swelling, pain, chest pain or trouble breathing.",
  simple: "In the first days of some lymphoma treatments, lumps can get bigger and sore before they get better. This is called tumour flare and it does not mean the treatment has failed. If a lump swells, or you have chest pain or find it hard to breathe, ring your team straight away.",
  summary: "Tumour flare is a short-lived, painful swelling of lymphoma sites, sometimes with new pleural effusions, low-grade fever or rash, in the first days to weeks of a T-cell-engaging bispecific antibody or of lenalidomide. The EU labels attribute it to T cells moving into the tumour. It matters for two reasons: swelling next to an airway or vital organ can cause compression, and on a scan it can be mistaken for progression.\n\nRates and timing from the labels: glofitamab 12% (grade 3 in 2.8%), median onset 2 days after the first dose (range 1 to 16), median duration 3.5 days, almost all in cycle 1; mosunetuzumab 4%; epcoritamab 1.6% as monotherapy with a median onset of 19.5 days (EU label). On lenalidomide it was reported in about 10% of patients in the mantle cell and follicular or marginal zone lymphoma trials, mostly grade 1 or 2 and in cycle 1, with one fatal case; fatal reactions occurred in investigational use in chronic lymphocytic leukaemia, where the US label says lenalidomide is not recommended outside trials.\n\nManagement is label-based. All the bispecific labels ask for close monitoring of people with bulky disease near an airway or vital organ during initial treatment. The US glofitamab label withholds the drug for grade 2 to 4 flare and treats with an antihistamine and corticosteroids; the EU label says corticosteroids and analgesics should be considered and does not require a hold; the epcoritamab trial allowed treatment to continue through suspected flare. Lenalidomide may continue through grade 1 or 2 flare with NSAIDs, corticosteroids or opioid analgesics, and is withheld for grade 3 or 4 until it settles to grade 1 or less. Flare can overlap with cytokine release syndrome, tumour lysis and infection, which are treated at the same time.\n\nThe LYRIC criteria introduced an 'indeterminate response' category so that apparent progression on immune-modulating treatment is confirmed by biopsy or later imaging before treatment is abandoned. No trial has compared any way of managing flare. The reader's own team's protocol comes first.",
  asOf: "2026-11-16",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "patient-or-carer"],
    where: ["chemotherapy-day-unit", "ward", "outpatient-clinic", "home", "telephone-triage", "acute-oncology-service"],
  },
  population: "Adults with B-cell non-Hodgkin lymphoma starting glofitamab, mosunetuzumab or epcoritamab, and adults with mantle cell, follicular or marginal zone lymphoma (or, in trials only, chronic lymphocytic leukaemia) starting lenalidomide. Lenalidomide for myeloma or myelodysplastic syndrome is not covered: the label describes tumour flare only in chronic lymphocytic leukaemia and lymphoma. Flare on checkpoint inhibitors, on bispecific antibodies for myeloma, and hormone flare in prostate or breast cancer are different problems and are not covered. Children are not covered.",
  trigger: "Before the first dose in anyone with bulky disease or disease next to an airway or vital organ, and whenever a lymphoma site swells or becomes painful, or breathlessness, chest pain, a new effusion, fever or rash appears in the first cycles.",
  steps: [
    {
      action: "Before the first dose, note any bulky disease and any disease close to the airway or a vital organ, and plan closer monitoring for those patients during initial treatment",
      why: "Swelling that would be harmless in the groin can be dangerous beside the windpipe or another vital organ.",
      source: "label-glofitamab",
      quote: "Patients with bulky tumors or disease located in close proximity to airways or a vital organ should be monitored closely during initial therapy.",
    },
    {
      action: "On lenalidomide, treat a high tumour burden as a risk for both tumour flare and tumour lysis, and monitor closely through the first cycle and any dose increase",
      why: "The more lymphoma there is, the bigger the reaction when the immune system is turned on it.",
      source: "smpc-revlimid",
      quote: "These patients should be monitored closely, especially during the first cycle or dose-escalation, and appropriate precautions taken.",
    },
    {
      action: "Do not use lenalidomide for chronic lymphocytic leukaemia outside a clinical trial",
      why: "Fatal tumour flare reactions happened when it was tried in this leukaemia.",
      source: "label-lenalidomide",
      quote: "REVLIMID is not indicated and not recommended for use in CLL outside of controlled clinical trials.",
    },
    {
      action: "Tell the patient what flare feels like and to report it straight away",
      why: "Flare usually starts at home in the first days after a dose.",
      source: "label-glofitamab",
      quote: "Inform patients of the potential risk of tumor flare reaction and to report any signs and symptoms associated with this event (e.g., localized pain and swelling) to their healthcare provider for evaluation",
    },
    {
      action: "Recognise flare: new pain and swelling at known lymphoma sites, or breathlessness from a new pleural effusion; on lenalidomide, tender swollen nodes with low-grade fever, pain and rash",
      why: "Knowing the pattern lets the team treat the symptoms and look for pressure on nearby structures.",
      source: "label-glofitamab",
      quote: "Manifestations include localized pain and swelling at the sites of the lymphoma lesions and/or dyspnea from new pleural effusions.",
    },
    {
      action: "Expect it early: on glofitamab within days of the first dose and almost always in cycle 1",
      why: "On glofitamab flare started a median of 2 days after the first dose and lasted a median of 3.5 days; that pattern is one clue that swelling is flare.",
      source: "label-glofitamab",
      quote: "Most tumor flare events occurred during Cycle 1, with a median time to first onset of 2 days (range: 1 to 16 days) after the first dose of COLUMVI.",
    },
    {
      action: "Do not record early swelling as treatment failure on its appearance alone",
      why: "Flare can look like the lymphoma growing, and stopping an effective treatment because of it is a harm in itself.",
      source: "smpc-columvi",
      quote: "Tumour flare does not imply treatment failure or represent tumour progression.",
    },
    {
      action: "Where a scan suggests progression on these treatments but the patient is not clinically worse, class the response as indeterminate and confirm with a biopsy or a later scan",
      why: "Only tissue or time can tell inflamed tumour from growing tumour.",
      source: "lyric-2016",
      quote: "The term \"indeterminate response\" was introduced to identify such lesions until confirmed as flare/pseudo-progression or true PD by either biopsy or subsequent imaging.",
    },
    {
      action: "Assess for cytokine release syndrome, tumour lysis and infection at the same time, and treat them together",
      why: "Fever, breathlessness and pain have several causes in the first cycle, and more than one can be present.",
      source: "britto-2025",
      quote: "They can have overlapping clinical manifestations with CRS and ICANS, and treatment should occur simultaneously.",
    },
    {
      action: "Watch for signs that a swollen lymphoma site is compressing or obstructing an airway or organ, and give the standard emergency treatment for that complication",
      why: "Pressure on an airway or organ is what makes flare dangerous, and it has its own urgent treatments.",
      source: "label-mosunetuzumab",
      quote: "If compression or obstruction develops, institute standard treatment of these complications.",
    },
    {
      action: "For symptomatic flare on a bispecific antibody, give analgesia and consider corticosteroids; the US glofitamab label also names an antihistamine for grade 2 to 4 flare",
      why: "These settle the inflammation and pain while the reaction runs its course, usually over a few days.",
      source: "smpc-columvi",
      quote: "Corticosteroids and analgesics should be considered to treat tumour flare.",
    },
    {
      action: "On glofitamab (US label), withhold the next dose for grade 2 to 4 flare until it resolves",
      why: "Another dose while a lump is swollen against something vital could make the pressure worse.",
      source: "label-glofitamab",
      quote: "Withhold COLUMVI until tumor flare resolves.",
    },
    {
      action: "On lenalidomide, grade 1 or 2 flare can be treated with NSAIDs, corticosteroids or opioid analgesics while the drug continues, at the doctor's discretion",
      why: "Mild flare settles with symptom treatment and does not need the lymphoma treatment stopped.",
      source: "label-lenalidomide",
      quote: "REVLIMID may be continued in patients with Grade 1 and 2 TFR without interruption or modification, at the physician's discretion.",
    },
    {
      action: "On lenalidomide, withhold the drug for grade 3 or 4 flare until it has settled to grade 1 or less",
      why: "Severe flare has been fatal, so the drug is paused until the reaction is nearly over.",
      source: "label-lenalidomide",
      quote: "In patients with Grade 3 or 4 TFR, it is recommended to withhold treatment with REVLIMID until TFR resolves to ≤ Grade 1.",
    },
  ],
  bestInClass: {
    statement: "There is no graded guideline on tumour flare that could be read; the best supported practice is what the labels share. Identify bulky disease and disease next to an airway or vital organ before the first dose and monitor those patients closely in the first cycle (all three bispecific labels, US and EU); teach patients the signs; treat symptoms with analgesics and corticosteroids; treat compression as an emergency; and do not call early swelling progression without a biopsy or a later scan (EU glofitamab label; LYRIC). The labels differ on whether to pause treatment, and both positions are shown: the US glofitamab label withholds for grade 2 to 4 flare, while the EU glofitamab label asks only for management as clinically indicated and the epcoritamab trial allowed treatment to continue; for lenalidomide both labels continue through grade 1 or 2 and withhold for grade 3 or 4.",
    sources: ["label-glofitamab", "smpc-columvi", "label-mosunetuzumab", "smpc-lunsumio", "smpc-tepkinly", "label-epcoritamab", "label-lenalidomide", "smpc-revlimid", "lyric-2016"],
  },
  variants: [
    {
      name: "Withhold the bispecific antibody, or continue through flare",
      differs: "The US glofitamab label withholds for grade 2 to 4 flare until it resolves and only monitors grade 1. The EU glofitamab label gives no hold rule and says to manage as clinically indicated. The US epcoritamab label has no tumour flare warning; its trial description says continued treatment was permitted in suspected flare. The mosunetuzumab labels ask for monitoring and standard treatment of any compression.",
      evidence: "Label text from single-arm trials. In the glofitamab trial no patient stopped treatment because of flare and all but one event resolved (EU label).",
      sources: ["label-glofitamab", "smpc-columvi", "label-epcoritamab", "label-mosunetuzumab"],
    },
    {
      name: "Antihistamine and corticosteroids, or corticosteroids and analgesics",
      differs: "For grade 2 to 4 flare the US glofitamab label names an antihistamine and corticosteroids. The EU label names corticosteroids and analgesics. A literature review of flare on lenalidomide lists analgesics, NSAIDs, antihistamines and corticosteroids.",
      evidence: "Descriptive only. Of 11 patients with grade 2 or higher flare on glofitamab, 2 had analgesics alone, 6 had corticosteroids with analgesics including morphine derivatives, 1 had corticosteroids with anti-emetics and 2 needed no treatment (EU label).",
      sources: ["label-glofitamab", "smpc-columvi", "taleb-2019"],
    },
    {
      name: "Lenalidomide: restart rule after severe flare",
      differs: "The US label withholds for grade 3 or 4 flare until it is grade 1 or less. The EU label adds that lenalidomide then restarts at the same dose level for the rest of the cycle, and says the corticosteroids are given for a limited duration. The EU label also names who is at risk in mantle cell lymphoma: a high MIPI score at diagnosis or bulky disease, defined as a lesion of 7 cm or more.",
      evidence: "Label rules. Flare was reported in 13 of 134 patients (10%) in the mantle cell trial and 19 of 176 (10.8%) on lenalidomide with rituximab in AUGMENT; one case in a separate mantle cell trial was fatal.",
      sources: ["label-lenalidomide", "smpc-revlimid"],
    },
    {
      name: "Following the product labels and the 2024 consensus (Canadian guidance, funded by Roche)",
      differs: "A Canadian expert working group on bispecific antibodies for DLBCL, funded by Hoffmann-La Roche, gives no flare rules of its own and endorses the product monographs and the Crombie 2024 consensus for tumour flare.",
      evidence: "Expert opinion. The Crombie consensus itself could be read as an abstract only.",
      sources: ["macdonald-2025", "crombie-2024"],
    },
  ],
  grades: [
    { claim: "Glofitamab: tumour flare in 12%, grade 3 in 2.8%, recurrent in two patients", grade: "Regulatory label; not graded", source: "label-glofitamab", quote: "Tumor flare was reported in 12% of patients who received COLUMVI, including Grade 2 tumor flare in 4.8% of patients and Grade 3 tumor flare in 2.8%." },
    { claim: "Glofitamab, grade 2 to 4 flare: antihistamine and corticosteroids", grade: "Regulatory label; not graded", source: "label-glofitamab", quote: "Monitor for signs and symptoms of compression or obstruction due to mass effect secondary to tumor flare, and institute appropriate treatment including antihistamine and corticosteroids." },
    { claim: "Glofitamab (EU): flare may mimic progression and is attributed to T cells entering the tumour", grade: "Regulatory label; not graded", source: "smpc-columvi", quote: "tumour flare is likely due to the influx of T cells into tumour sites following Columvi administration and may mimic progression of disease." },
    { claim: "Mosunetuzumab: flare in 4%, with new or worsening pleural effusions, pain and swelling", grade: "Regulatory label; not graded", source: "label-mosunetuzumab", quote: "Among patients who received LUNSUMIO at the recommended dosage in the clinical trial, tumor flare occurred in 4%." },
    { claim: "Mosunetuzumab (EU): monitor at critical anatomical sites", grade: "Regulatory label; not graded", source: "smpc-lunsumio", quote: "Lunsumio should be monitored and evaluated for tumour flare at critical anatomical sites." },
    { claim: "Epcoritamab (EU): monitor at critical anatomical sites", grade: "Regulatory label; not graded", source: "smpc-tepkinly", quote: "epcoritamab should be monitored and evaluated for tumour flare at critical anatomical sites." },
    { claim: "Epcoritamab (EU): flare in 1.6% on monotherapy, all grade 2", grade: "Regulatory label; not graded", source: "smpc-tepkinly", quote: "In study GCT3013-01, tumour flare occurred in 1.6% (6/382) of patients, all of which were grade 2." },
    { claim: "Epcoritamab (US): treatment could continue in suspected flare in the trial", grade: "Regulatory label; not graded", source: "label-epcoritamab", quote: "In the setting of a suspected tumor flare reaction, continued treatment was permitted." },
    { claim: "Lenalidomide: flare may mimic progression; monitoring recommended in mantle cell, follicular and marginal zone lymphoma", grade: "Regulatory label; not graded", source: "label-lenalidomide", quote: "Monitoring and evaluation for TFR is recommended in patients with MCL, FL, or MZL. Tumor flare reaction may mimic progression of disease (PD)." },
    { claim: "Lenalidomide: symptom treatment for grade 1 and 2 flare", grade: "Regulatory label; not graded", source: "label-lenalidomide", quote: "Patients with Grade 1 and 2 TFR may also be treated with corticosteroids, non-steroidal anti-inflammatory drugs (NSAIDs) and/or narcotic analgesics for management of TFR symptoms." },
    { claim: "Canadian guidance defers to the product monographs and the 2024 consensus for tumour flare", grade: "Expert working group, funded by Roche; not graded", source: "macdonald-2025", quote: "The EWG endorse recommendations from the respective product monographs and Crombie et al. (2024) for the management of non-CRS AEs" },
  ],
  sources: [
    { key: "label-glofitamab", label: "Columvi (glofitamab) injection: US prescribing information, sections 2.4, 5.4, 6.1 and 17", publisher: "Genentech, a member of the Roche Group (DailyMed, US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=3516e753-f064-4d30-9bd5-e3f2e143f75d", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-16" },
    { key: "smpc-columvi", label: "Columvi (glofitamab): EU product information, summary of product characteristics sections 4.4 and 4.8", publisher: "European Medicines Agency (marketing authorisation holder Roche Registration GmbH)", year: 2023, url: "https://www.ema.europa.eu/en/documents/product-information/columvi-epar-product-information_en.pdf", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-16" },
    { key: "label-mosunetuzumab", label: "Lunsumio (mosunetuzumab) injection: US prescribing information, section 5.6", publisher: "Genentech, a member of the Roche Group (DailyMed, US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=2ef0cf38-101c-4681-98fe-c05dc9ead443", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-16" },
    { key: "smpc-lunsumio", label: "Lunsumio (mosunetuzumab): EU product information, summary of product characteristics section 4.4", publisher: "European Medicines Agency (marketing authorisation holder Roche Registration GmbH)", year: 2022, url: "https://www.ema.europa.eu/en/documents/product-information/lunsumio-epar-product-information_en.pdf", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-16" },
    { key: "label-epcoritamab", label: "Epkinly (epcoritamab) injection: US prescribing information, sections 6.1 and 14", publisher: "Genmab US (DailyMed, US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=d7836711-b677-412d-bf2d-0f7c8444103a", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-16" },
    { key: "smpc-tepkinly", label: "Tepkinly (epcoritamab): EU product information, summary of product characteristics sections 4.4 and 4.8", publisher: "European Medicines Agency (marketing authorisation holder AbbVie Deutschland GmbH & Co. KG)", year: 2023, url: "https://www.ema.europa.eu/en/documents/product-information/tepkinly-epar-product-information_en.pdf", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-16" },
    { key: "label-lenalidomide", label: "Revlimid (lenalidomide) capsules: US prescribing information, section 5.11", publisher: "Celgene, a Bristol Myers Squibb company (DailyMed, US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=5fa97bf5-28a2-48f1-8955-f56012d296be", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-16" },
    { key: "smpc-revlimid", label: "Revlimid (lenalidomide): EU product information, summary of product characteristics sections 4.2 and 4.4", publisher: "European Medicines Agency (marketing authorisation holder Bristol-Myers Squibb Pharma EEIG)", year: 2007, url: "https://www.ema.europa.eu/en/documents/product-information/revlimid-epar-product-information_en.pdf", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-16" },
    { key: "lyric-2016", label: "Refinement of the Lugano Classification lymphoma response criteria in the era of immunomodulatory therapy (LYRIC)", publisher: "Blood (Cheson et al.)", year: 2016, url: "https://doi.org/10.1182/blood-2016-05-718528", doi: "10.1182/blood-2016-05-718528", gradingScheme: "Workshop consensus; provisional recommendations, not graded.", read: "abstract", accessed: "2026-11-16" },
    { key: "britto-2025", label: "Bispecific antibody toxicities", publisher: "CMAJ (Britto et al.; three authors declare research funding or honoraria from drug companies)", year: 2025, url: "https://doi.org/10.1503/cmaj.241384", doi: "10.1503/cmaj.241384", gradingScheme: "Practice summary; not graded.", read: "full-text", accessed: "2026-11-16" },
    { key: "taleb-2019", label: "Tumour flare reaction in cancer treatments: a comprehensive literature review", publisher: "Anti-Cancer Drugs (Taleb)", year: 2019, url: "https://doi.org/10.1097/CAD.0000000000000814", doi: "10.1097/CAD.0000000000000814", gradingScheme: "Literature review; not graded.", read: "full-text", accessed: "2026-11-16" },
    { key: "macdonald-2025", label: "Practical guidance for the expanded implementation and provision of bispecific antibodies for diffuse large B-cell lymphoma (DLBCL) across Canada (funded by Hoffmann-La Roche)", publisher: "Current Oncology (MacDonald et al.; research and publication charge funded by Hoffmann-La Roche Ltd)", year: 2025, url: "https://doi.org/10.3390/curroncol32080460", doi: "10.3390/curroncol32080460", gradingScheme: "Expert working group consensus; not graded.", read: "full-text", accessed: "2026-11-16" },
    { key: "crombie-2024", label: "Consensus recommendations on the management of toxicity associated with CD3xCD20 bispecific antibody therapy", publisher: "Blood (Crombie et al.)", year: 2024, url: "https://doi.org/10.1182/blood.2023022432", doi: "10.1182/blood.2023022432", read: "abstract", accessed: "2026-11-16" },
  ],
  drugs: ["glofitamab", "mosunetuzumab", "epcoritamab", "lenalidomide"],
  // Scoped to the lymphomas the labels name, so that lenalidomide does not carry it to myeloma pages. Chronic
  // lymphocytic leukaemia is left out: lenalidomide is not licensed for it, and the step above says so.
  cancers: ["dlbcl", "follicular-lymphoma", "mantle-cell-lymphoma", "marginal-zone-lymphoma"],
  terms: ["crs", "imid", "lugano-classification", "tumor-lysis-syndrome"],
  related: ["bispecific-step-up-dosing", "crs-grading-and-management", "tumour-lysis-syndrome-prevention-and-treatment", "svc-obstruction"],
  upgrades: [],
  gaps: [
    "No graded guideline on tumour flare could be read, and no trial has compared ways of managing it. Every management step here is label text or a short practice summary.",
    "Crombie et al., Blood 2024, the consensus recommendations on CD3xCD20 bispecific antibody toxicity, could be read as an abstract only: ashpublications.org returned 403 to a script and the paper is not in PubMed Central. The abstract does not mention tumour flare, so what the consensus recommends for it is not reported here, and its funding statement could not be checked.",
    "The LYRIC criteria (Cheson et al., Blood 2016) were read as an abstract only. The abstract gives the 'indeterminate response' idea; the size and timing thresholds that define its categories are in the full paper and are not given here. The abstract discusses checkpoint inhibitors; LYRIC was not written for bispecific antibodies.",
    "The labels differ on pausing a bispecific antibody for flare (the US glofitamab label withholds for grade 2 to 4; the EU label and the epcoritamab trial do not require it), and no source read explains or resolves the difference.",
    "No source read gives a steroid drug, dose or duration for tumour flare, or says when to image, drain an effusion, or admit.",
    "No source read gives a bedside rule for telling flare from cytokine release syndrome. The CMAJ summary says only that the features overlap and treatment should be given at the same time.",
    "The US epcoritamab label has no tumour flare warning section; its EU label has one. Odronextamab has a record here but its label was not read, so it is not included.",
    "The flare grades the labels use (grade 1 to 4) are not defined in the label text read.",
    "No glossary term for tumour flare or pseudo-progression exists in the corpus to link.",
  ],
});
