import { protocol } from "./helpers";
import { SITC_IEC_2020 } from "./cell-therapy-sources";

/*
 * Tumour lysis syndrome (TLS): risk assessment, prophylaxis with hydration and allopurinol or rasburicase,
 * monitoring, and treatment of established TLS.
 *
 * What was read, and how (first on 11 November 2026; every source fetched again raw and re-read as text on
 * 16 November 2026 for the second accuracy pass):
 * - Italian consensus conference (SIE, AIEOP, AIOM), Haematologica 2008 (Tosi et al.): open access PDF from
 *   haematologica.org (the article's own download link), converted with pdftotext and read in full. The two-column
 *   layout interleaves some lines, so only sentences that run unbroken in the converted text are quoted. The paper
 *   declares an unrestricted educational grant from Sanofi-Aventis, which sells rasburicase.
 * - Coiffier et al. 2008 (JCO) evidence-based review and Cairo et al. 2010 (BJH) expert panel risk classification:
 *   abstracts from Europe PMC. The 2008 paper's first author is Coiffier (Cairo is the last author); the first
 *   version of this file called it "Cairo 2008". The free PDF Europe PMC lists for the 2010 paper returned 403.
 * - BSH 2015 guideline (Jones et al., BJH) and its 2025 update (Chan et al., BJH, doi 10.1111/bjh.70092, found on
 *   16 November 2026): Europe PMC holds no abstract for either and the Wiley pages returned 403. Not read.
 * - United States modified Delphi panel 2023 (Perissinotti et al., Cancer Treatment Reviews), found on
 *   16 November 2026: abstract from Europe PMC; ScienceDirect returned 403.
 * - Gribben 2020 (BJH), practical management of TLS with venetoclax in CLL: open access, full text from Europe PMC
 *   (PMC7154710). A review with medical writing support funded by the venetoclax manufacturer; used as a variant.
 * - SITC 2020 immune effector cell guideline (full text; see ./cell-therapy-sources.ts) for TLS around CAR T cells.
 * DOIs resolved through Crossref. Quotes checked by script on both dates.
 */
export const tumourLysisSyndrome = protocol({
  id: "tumour-lysis-syndrome-prevention-and-treatment",
  name: "Tumour lysis syndrome: risk assessment, prophylaxis and treatment",
  aka: ["TLS prophylaxis", "tumor lysis syndrome management", "rasburicase or allopurinol", "laboratory TLS", "clinical TLS", "Cairo-Bishop"],
  domain: "emergencies",
  tldr: "When a fast-growing cancer such as some leukaemias and lymphomas is first treated, many cancer cells can die at once and flood the blood with potassium, phosphate and uric acid, which can damage the kidneys and heart. Teams check who is at risk, give extra fluids and a medicine (allopurinol, or rasburicase for higher risk) before treatment, and check blood tests often in the first days.",
  simple: "Some cancer treatments kill cancer cells so quickly that the waste can harm the kidneys. Drinking plenty, extra fluids through a drip, a tablet or drip to lower uric acid, and regular blood tests help to prevent this.",
  summary: "TLS is laboratory (two or more of raised uric acid, potassium or phosphate, or low calcium, each a change of more than 25% from baseline or a value past a fixed threshold, from three days before to seven days after starting treatment) or clinical (laboratory TLS with renal failure, arrhythmia or seizure) (Italian consensus 2008). Risk rises with bulky or highly chemosensitive disease (Burkitt and lymphoblastic lymphoma, acute lymphoblastic leukaemia, bulky small cell lung cancer), LDH over twice the upper limit of normal, pre-existing renal impairment, dehydration and high uric acid. The Cairo 2010 expert panel assigns low, intermediate and high risk with a decision tree.\n\nPrevention (Coiffier 2008): close monitoring for low risk, hydration with allopurinol or rasburicase for intermediate risk, hydration with prophylactic rasburicase for high risk. The Italian consensus has two tiers. Low-risk patients get oral allopurinol, hydration and urine alkalinisation. High-risk patients get hydration and rasburicase 0.20 mg/kg/day over 30 minutes as inpatients, starting at least 4 hours before treatment and continuing for at least 3 to 5 days, without allopurinol at the same time, and then move to oral allopurinol; rasburicase is contraindicated in G6PD deficiency and methaemoglobinaemia. Hydration starts, when possible, at least 48 hours ahead, keeping urine output at least 100 mL an hour in adults. Monitor LDH, uric acid, sodium, potassium, creatinine, urea, phosphate and calcium every 12 hours for 3 days in high-risk patients, then daily.\n\nEstablished TLS (Italian consensus): hydration and rasburicase for everyone with clinical TLS and for adults with laboratory TLS, observations and electrolytes every 6 hours for the first 24 hours, calcium only for symptomatic hypocalcaemia, and renal replacement for persistent hyperkalaemia, severe acidosis, fluid overload that does not respond to diuretics, or uraemic symptoms. Coiffier 2008 does not recommend urine alkalinisation; the Italian consensus keeps it for low-risk patients and those who cannot have rasburicase. The BSH guideline (2015, updated in 2025) could not be read, and the United States Delphi panel guideline of 2023 was read as an abstract only.",
  asOf: "2026-11-16",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "patient-or-carer"],
    where: ["ward", "chemotherapy-day-unit", "outpatient-clinic", "intensive-care"],
  },
  population: "Adults and children starting treatment for a cancer at risk of rapid cell kill, above all haematological cancers (acute leukaemias, Burkitt and other high-grade lymphomas, CLL starting venetoclax) and bulky chemosensitive solid tumours. CAR T-cell recipients and venetoclax ramp-up have specific variants.",
  trigger: "Planning the first cycle of treatment for a cancer at risk of TLS, or a rise in potassium, phosphate, uric acid or creatinine, or a fall in calcium, in the days after treatment starts.",
  steps: [
    {
      action: "Before treatment, assess TLS risk from the cancer, its bulk and expected response, kidney function, hydration and baseline uric acid",
      why: "Prevention is matched to risk; the highest-risk patients need inpatient care and rasburicase.",
      source: "haematologica-2008",
      quote: "Patients at high risk of developing TLS carry at least one of the following factors: (i) Host-related factors (comorbidities): dehydration; hyponatremia (limited to solid tumors); pre-existing renal impairment (including renal infiltration by hematologic malignancies which induce a reduction in renal function); obstructive uropathy; hyperuricemia (uric acid >8 mg/dL in children and >10 mg/dL in adults).",
    },
    {
      action: "Match prophylaxis to risk: monitoring for low risk, hydration with allopurinol or rasburicase for intermediate risk, hydration with rasburicase for high risk",
      why: "The panel calls prevention the best management of TLS, and scales it to the risk.",
      source: "coiffier-2008",
      quote: "Prevention strategies include hydration and prophylactic rasburicase in high-risk patients, hydration plus allopurinol or rasburicase for intermediate-risk patients, and close monitoring for low-risk patients.",
    },
    {
      action: "Start hydration, where possible, at least 48 hours before treatment and keep adult urine output at least 100 mL an hour",
      why: "More fluid and more urine flow help the kidneys clear uric acid and phosphate.",
      source: "haematologica-2008",
      quote: "When possible, hydration should start at least 48 hours before tumor-specific therapy; however, the use of rasburicase with subsequent rapid degradation of uric acid allows earlier administration of chemotherapy, if needed.",
    },
    {
      action: "For high risk, give rasburicase 0.20 mg/kg/day over 30 minutes as an inpatient, the first dose at least 4 hours before treatment, for at least 3 to 5 days, then switch to oral allopurinol",
      why: "Rasburicase breaks down uric acid already in the blood; allopurinol only stops new uric acid forming.",
      source: "haematologica-2008",
      quote: "Rasburicase should be administered at the dose of 0.20 mg/kg/day, infused over 30 minutes, administering the first dose at least four hours before the start of tumor-specific therapy and continuing for at least 3-5 days.",
    },
    {
      action: "Do not give allopurinol at the same time as rasburicase",
      why: "Allopurinol causes xanthine to build up and starves rasburicase of uric acid to act on.",
      source: "haematologica-2008",
      quote: "In order to avoid xanthine accumulation and lack of substrate for rasburicase, concomitant allopurinol should not be administered.",
    },
    {
      action: "Do not give rasburicase to people with G6PD deficiency or methaemoglobinaemia; use oral allopurinol, hydration and urine alkalinisation instead",
      why: "The consensus lists these, and other metabolic disorders that can cause haemolytic anaemia, as contraindications to rasburicase.",
      source: "haematologica-2008",
      quote: "Rasburicase is contraindicated in patients with metahemoglobinemia, G6PDH deficiency or other metabolic disorders that can potentially cause hemolytic anemia; these patents should be treated with oral allopurinol, hydration and urine alkalinization.",
    },
    {
      action: "In high-risk patients, check LDH, uric acid, sodium, potassium, creatinine, urea, phosphate and calcium every 12 hours for 3 days, then daily",
      why: "No study has tested the best schedule; the panel set this one from good clinical practice.",
      source: "haematologica-2008",
      quote: "In patients at high risk of TLS, levels of LDH, uric acid, sodium, potassium, creatinine, BUN, phosphorus and calcium should be monitored every 12 hours for the first three days, and every 24 hours subsequently.",
    },
    {
      action: "Diagnose laboratory TLS from two or more abnormal values among uric acid, potassium, phosphate and calcium, and clinical TLS when there is also kidney failure, arrhythmia or a seizure",
      why: "A shared definition triggers treatment at the same point everywhere.",
      source: "haematologica-2008",
      quote: "Clinical TLS is defined by the presence of laboratory TLS and at least one of the following clinical alterations: renal failure (estimated glomerular filtration rate ≤ 60 mL/min), cardiac arrhythmia, seizure.",
    },
    {
      action: "Give hydration through a central line and rasburicase to everyone with clinical TLS, and hydration and rasburicase to adults with laboratory TLS",
      why: "Rasburicase breaks uric acid down quickly, which may let cancer treatment continue promptly.",
      source: "haematologica-2008",
      quote: "Hydration through a central venous access and rasburicase should be administrated to all patients with clinical TLS.",
    },
    {
      action: "Do not give calcium for mild, symptom-free low calcium; reserve it for symptoms or for heart rhythm problems from high potassium",
      why: "Calcium given when phosphate is high can deposit as crystals in the kidneys and tissues.",
      source: "haematologica-2008",
      quote: "Asymptomatic hypocalcemia does not require treatment.",
    },
    {
      action: "Refer for renal replacement therapy for persistent high potassium, severe acidosis, fluid overload that does not respond to diuretics, or uraemic symptoms",
      why: "Dialysis removes potassium, phosphate and uric acid when the kidneys cannot.",
      source: "haematologica-2008",
      quote: "Indications for the start-up of renal replacement therapy in TLS include persistent hyperkalemia, severe metabolic acidosis, volume overload unresponsive to diuretic therapy, and overt uremic symptoms, including pericarditis and severe encephalopathy.",
    },
  ],
  bestInClass: {
    statement: "Risk-adapted prophylaxis before treatment starts is common ground, with hydration and rasburicase for high risk (Coiffier 2008; Cairo 2010 risk model; Italian consensus 2008). The sources differ below high risk: Coiffier 2008 has three tiers, with close monitoring for low risk and hydration with allopurinol or rasburicase for intermediate risk, while the Italian consensus has two and gives low-risk patients oral allopurinol, hydration and urine alkalinisation. They also disagree on urine alkalinisation: Coiffier 2008 does not recommend it, while the Italian consensus still lists it for low-risk patients and for those who cannot have rasburicase, although it also says alkalinisation brings no advantage in improving the biochemical abnormalities of TLS and has been progressively abandoned. Rasburicase dosing and schedule here are from the Italian consensus (0.20 mg/kg/day for at least 3 to 5 days), which said lower doses were still under evaluation in 2008 and which was supported by an unrestricted educational grant from the company that sells rasburicase. Two newer guidelines exist and are not reflected in the steps. A United States modified Delphi panel (2023), read as an abstract only, calls hydration a key element of prophylaxis and management and stresses monitoring and treating hyperkalaemia and hyperphosphataemia as well as uric acid. The British Society for Haematology guideline of 2015 was updated in 2025, and neither edition could be read, so this page does not say how the current UK and US positions differ.",
    sources: ["coiffier-2008", "cairo-2010", "haematologica-2008", "us-delphi-2023", "bsh-2015", "bsh-2025"],
  },
  variants: [
    {
      name: "No urine alkalinisation (Coiffier 2008)",
      differs: "States that alkalinisation is not recommended.",
      evidence: "Expert panel evidence-based review (abstract read).",
      sources: ["coiffier-2008"],
    },
    {
      name: "Alkalinisation for low-risk patients (Italian consensus 2008)",
      differs: "Gives low-risk children and adults oral allopurinol, hydration and urine alkalinisation, and uses alkalinisation for those who cannot have rasburicase. For patients on rasburicase it says urine should not be alkalinised unless another condition requires it.",
      evidence: "Consensus conference of a panel of 8 experts, endorsed by SIE, AIEOP and AIOM and supported by an unrestricted educational grant from Sanofi-Aventis; the same document says alkalinisation does not improve the biochemistry of TLS.",
      sources: ["haematologica-2008"],
    },
    {
      name: "Venetoclax ramp-up in CLL (UK practice review)",
      differs: "Stratifies TLS risk by lymph node size, lymphocyte count and creatinine clearance before a five-week ramp-up of venetoclax (20, 50, 100, 200, 400 mg). In the high-risk case described, the author started allopurinol two to three days ahead, asked the patient to drink 1.5 to 2 litres a day for the two days before, and admitted him for hydration and observation. In both cases described, blood chemistry was checked before, and 8 and 24 hours after, each dose increase. The author gives the first dose early in the morning so the 6 to 8 hour blood test is seen while staff are present.",
      evidence: "A single clinician's practical review built on two patient cases and the 2018 European summary of product characteristics; medical writing support was funded by the manufacturer.",
      sources: ["gribben-2020"],
    },
    {
      name: "Around CAR T-cell therapy (SITC 2020)",
      differs: "Monitors disease burden and potassium, phosphate, calcium, uric acid and creatinine, gives allopurinol as prophylaxis before CAR T cells, and considers rasburicase for established TLS.",
      evidence: "LE: 3 for monitoring, LE: 4 for allopurinol and rasburicase.",
      sources: ["sitc-iec-2020"],
    },
  ],
  grades: [
    { claim: "Risk-adapted prophylaxis: rasburicase for high risk, allopurinol or rasburicase for intermediate, monitoring for low", grade: "expert panel consensus (grades not in abstract)", source: "coiffier-2008" },
    { claim: "Alkalinisation not recommended", grade: "expert panel consensus (grades not in abstract)", source: "coiffier-2008", quote: "Alkalinization is not recommended." },
    { claim: "Hydration and rasburicase for high-risk adults; hydration and oral allopurinol for low risk", grade: "consensus conference recommendation (not graded)", source: "haematologica-2008" },
    { claim: "Allopurinol before CAR T cells", grade: "LE: 4", source: "sitc-iec-2020", quote: "For prophylaxis against TLS prior to CAR T cell therapy, allopurinol should be administered" },
  ],
  sources: [
    { key: "haematologica-2008", label: "Consensus conference on the management of tumor lysis syndrome", publisher: "Italian Society of Hematology (SIE), Italian Association of Pediatric Oncologists (AIEOP) and Italian Society of Medical Oncology (AIOM), Haematologica", year: 2008, url: "https://doi.org/10.3324/haematol.13290", doi: "10.3324/haematol.13290", gradingScheme: "Consensus statements from a panel of 8 experts, adopted at 80% agreement; not graded.", read: "full-text", accessed: "2026-11-16" },
    { key: "coiffier-2008", label: "Guidelines for the management of pediatric and adult tumor lysis syndrome: an evidence-based review", publisher: "Journal of Clinical Oncology (expert panel: Coiffier, Altman, Pui, Younes and Cairo)", year: 2008, url: "https://europepmc.org/abstract/MED/18509186", doi: "10.1200/JCO.2007.15.0177", read: "abstract", accessed: "2026-11-16" },
    { key: "cairo-2010", label: "Recommendations for the evaluation of risk and prophylaxis of tumour lysis syndrome (TLS) in adults and children with malignant diseases: an expert TLS panel consensus", publisher: "British Journal of Haematology (international expert panel)", year: 2010, url: "https://europepmc.org/abstract/MED/20331465", doi: "10.1111/j.1365-2141.2010.08143.x", read: "abstract", accessed: "2026-11-16" },
    { key: "us-delphi-2023", label: "Expert consensus guidelines for the prophylaxis and management of tumor lysis syndrome in the United States: Results of a modified Delphi panel", publisher: "Cancer Treatment Reviews (modified Delphi panel of nine experts)", year: 2023, url: "https://europepmc.org/abstract/MED/37579533", doi: "10.1016/j.ctrv.2023.102603", gradingScheme: "Three-round modified Delphi; consensus defined as at least 66% agreement among voting panellists.", read: "abstract", accessed: "2026-11-16" },
    { key: "bsh-2015", label: "Guidelines for the management of tumour lysis syndrome in adults and children with haematological malignancies on behalf of the British Committee for Standards in Haematology", publisher: "British Society for Haematology, British Journal of Haematology", year: 2015, url: "https://doi.org/10.1111/bjh.13403", doi: "10.1111/bjh.13403", read: "not-reachable", accessed: "2026-11-16" },
    { key: "bsh-2025", label: "British Society for Haematology updated guidelines for the diagnosis and management of tumour lysis syndrome in adults and children with haematological malignancies: A focus on patient safety", publisher: "British Society for Haematology, British Journal of Haematology", year: 2025, url: "https://doi.org/10.1111/bjh.70092", doi: "10.1111/bjh.70092", read: "not-reachable", accessed: "2026-11-16" },
    { key: "gribben-2020", label: "Practical management of tumour lysis syndrome in venetoclax-treated patients with chronic lymphocytic leukaemia", publisher: "British Journal of Haematology (review)", year: 2020, url: "https://europepmc.org/article/PMC/PMC7154710", doi: "10.1111/bjh.16345", read: "full-text", accessed: "2026-11-16" },
    SITC_IEC_2020,
  ],
  upgrades: [],
  gaps: [
    "The British Society for Haematology guideline, the UK standard, could not be read in either edition. On 16 November 2026 an updated edition was found (British Journal of Haematology 2025, doi 10.1111/bjh.70092), replacing the 2015 one; Europe PMC holds no abstract for either and the Wiley pages returned 403 to a script. No step on this page rests on them, and the page may differ from current UK practice.",
    "A United States expert consensus guideline (modified Delphi panel, Cancer Treatment Reviews 2023) was found on 16 November 2026 and could be read as an abstract only, which gives no doses, thresholds or schedules. It says earlier guidelines do not take account of newer potent anticancer drugs.",
    "The Coiffier 2008 and Cairo 2010 papers were read as abstracts only, so their risk tables, drug doses and grades are not given here. Europe PMC records a published erratum to the 2008 paper (Journal of Clinical Oncology 2010; 28: 708), which was not read.",
    "The fullest source read, and the source of every dose and threshold in the steps, is the Italian consensus of 2008. It said lower doses of rasburicase were still under evaluation; later evidence on lower or single doses was not reviewed for this page.",
    "Venetoclax, and other targeted drugs with their own ramp-up schedules, follow their product labels, which were not read here.",
  ],
  drugs: ["rasburicase", "allopurinol", "venetoclax"],
  technologies: ["car-t"],
  terms: ["tumor-lysis-syndrome", "lymphoma-tx-tumour-lysis"],
  tags: ["protocol", "acute-oncology", "oncological-emergency", "metabolic"],
});
