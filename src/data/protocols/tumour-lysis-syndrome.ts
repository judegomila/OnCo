import { protocol } from "./helpers";
import { SITC_IEC_2020 } from "./cell-therapy-sources";

/*
 * Tumour lysis syndrome (TLS): risk assessment, prophylaxis with hydration and allopurinol or rasburicase,
 * monitoring, and treatment of established TLS.
 *
 * What was read, and how (11 November 2026, fetched raw and read as text):
 * - Italian consensus conference (SIE, AIEOP, AIOM), Haematologica 2008: open access PDF from haematologica.org
 *   reached through doi.org, converted with pdftotext and read in full. The two-column layout interleaves some lines,
 *   so only sentences that run unbroken in the converted text are quoted.
 * - Cairo et al. 2008 (JCO) evidence-based review and Cairo et al. 2010 (BJH) expert panel risk classification:
 *   abstracts from Europe PMC.
 * - BSH 2015 guideline (Jones et al., BJH): Europe PMC holds no abstract and the Wiley page returned 403. Not read.
 * - Gribben 2020 (BJH), practical management of TLS with venetoclax in CLL: open access, full text from Europe PMC
 *   (PMC7154710). A review with medical writing support funded by the venetoclax manufacturer; used as a variant.
 * - SITC 2020 immune effector cell guideline (full text; see ./cell-therapy-sources.ts) for TLS around CAR T cells.
 * DOIs resolved through Crossref. Quotes checked by script.
 */
export const tumourLysisSyndrome = protocol({
  id: "tumour-lysis-syndrome-prevention-and-treatment",
  name: "Tumour lysis syndrome: risk assessment, prophylaxis and treatment",
  aka: ["TLS prophylaxis", "tumor lysis syndrome management", "rasburicase or allopurinol", "laboratory TLS", "clinical TLS", "Cairo-Bishop"],
  domain: "emergencies",
  tldr: "When a fast-growing cancer such as some leukaemias and lymphomas is first treated, many cancer cells can die at once and flood the blood with potassium, phosphate and uric acid, which can damage the kidneys and heart. Teams check who is at risk, give extra fluids and a medicine (allopurinol, or rasburicase for higher risk) before treatment, and check blood tests often in the first days.",
  simple: "Some cancer treatments kill cancer cells so quickly that the waste can harm the kidneys. Drinking plenty, extra fluids through a drip, a tablet or drip to lower uric acid, and regular blood tests prevent this.",
  summary: "TLS is laboratory (two or more of raised uric acid, potassium or phosphate, or low calcium, by 25% from baseline or past fixed thresholds, from three days before to seven days after starting treatment) or clinical (laboratory TLS with renal failure, arrhythmia or seizure) (Italian consensus 2008). Risk rises with bulky or highly chemosensitive disease (Burkitt and lymphoblastic lymphoma, acute lymphoblastic leukaemia, bulky small cell lung cancer), LDH over twice normal, pre-existing renal impairment, dehydration and high uric acid. The Cairo 2010 expert panel assigns low, intermediate and high risk with a decision tree.\n\nPrevention (Cairo 2008): close monitoring for low risk, hydration with allopurinol or rasburicase for intermediate risk, hydration with prophylactic rasburicase for high risk. The Italian consensus gives low-risk patients oral allopurinol and hydration and high-risk patients rasburicase 0.20 mg/kg/day over 30 minutes as inpatients, starting at least 4 hours before treatment and continuing 3 to 5 days, without allopurinol at the same time; rasburicase is contraindicated in G6PD deficiency and methaemoglobinaemia. Hydration ideally starts 48 hours ahead, keeping urine output at least 100 mL an hour in adults. Monitor LDH, uric acid, sodium, potassium, creatinine, urea, phosphate and calcium every 12 hours for 3 days in high-risk patients.\n\nEstablished TLS: hydration and rasburicase, observations and electrolytes every 6 hours for the first 24 hours, calcium only for symptomatic hypocalcaemia, and renal replacement for persistent hyperkalaemia, severe acidosis, refractory overload or uraemia. Cairo 2008 does not recommend urine alkalinisation; the Italian consensus keeps it only for low-risk patients and those who cannot have rasburicase. The BSH 2015 guideline could not be read.",
  asOf: "2026-11-11",
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
      why: "The cheaper drug is enough when risk is lower; rasburicase removes existing uric acid quickly when it is high.",
      source: "cairo-2008",
      quote: "Prevention strategies include hydration and prophylactic rasburicase in high-risk patients, hydration plus allopurinol or rasburicase for intermediate-risk patients, and close monitoring for low-risk patients.",
    },
    {
      action: "Start hydration, where possible, 48 hours before treatment and keep adult urine output at least 100 mL an hour",
      why: "Good urine flow washes out uric acid, potassium and phosphate before they build up.",
      source: "haematologica-2008",
      quote: "When possible, hydration should start at least 48 hours before tumor-specific therapy; however, the use of rasburicase with subsequent rapid degradation of uric acid allows earlier administration of chemotherapy, if needed.",
    },
    {
      action: "For high risk, give rasburicase 0.20 mg/kg/day over 30 minutes, the first dose at least 4 hours before treatment, for 3 to 5 days, then switch to oral allopurinol",
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
      action: "Do not give rasburicase to people with G6PD deficiency or methaemoglobinaemia; use allopurinol and hydration instead",
      why: "Rasburicase can cause severe haemolysis and methaemoglobinaemia in these patients.",
      source: "haematologica-2008",
      quote: "Rasburicase is contraindicated in patients with metahemoglobinemia, G6PDH deficiency or other metabolic disorders that can potentially cause hemolytic anemia; these patents should be treated with oral allopurinol, hydration and urine alkalinization.",
    },
    {
      action: "In high-risk patients, check LDH, uric acid, sodium, potassium, creatinine, urea, phosphate and calcium every 12 hours for 3 days, then daily",
      why: "TLS usually develops within the first days of treatment, and early changes can be corrected before harm.",
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
      action: "Treat established TLS with intravenous hydration and rasburicase",
      why: "Clearing uric acid quickly protects the kidneys and lets cancer treatment continue.",
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
    statement: "Risk-adapted prophylaxis is common ground: hydration for everyone at risk, allopurinol at lower risk and rasburicase at high risk, given before treatment starts (Cairo 2008; Cairo 2010 risk model; Italian consensus 2008). The sources disagree on urine alkalinisation: Cairo 2008 does not recommend it, while the Italian consensus still lists it for low-risk patients and for those who cannot have rasburicase, although it also says alkalinisation brings no biochemical advantage and has been progressively abandoned. Rasburicase dosing and schedule here are from the Italian consensus (0.20 mg/kg/day for 3 to 5 days); lower and single fixed doses are in use but were described as under evaluation in 2008. The UK guideline (BSH 2015), the most recent national guideline in the census, could not be read, so this page does not say how the UK position differs.",
    sources: ["cairo-2008", "cairo-2010", "haematologica-2008", "bsh-2015"],
  },
  variants: [
    {
      name: "No urine alkalinisation (Cairo 2008)",
      differs: "States that alkalinisation is not recommended for prevention or treatment.",
      evidence: "Expert panel evidence-based review (abstract read).",
      sources: ["cairo-2008"],
    },
    {
      name: "Alkalinisation for low-risk patients (Italian consensus 2008)",
      differs: "Gives low-risk children and adults oral allopurinol, hydration and urine alkalinisation, and uses alkalinisation for those who cannot have rasburicase.",
      evidence: "Consensus conference endorsed by SIE, AIEOP and AIOM; the same document says alkalinisation does not improve the biochemistry of TLS.",
      sources: ["haematologica-2008"],
    },
    {
      name: "Venetoclax ramp-up in CLL (UK practice review)",
      differs: "Stratifies TLS risk before a five-week ramp-up of venetoclax (20, 50, 100, 200, 400 mg), starts allopurinol two to three days ahead and oral fluids of 1.5 to 2 litres a day for the two days before, admits high-risk patients for intravenous fluids, and checks blood chemistry before, and 8 and 24 hours after, each dose increase. The author gives the first dose early in the morning so the 6 to 8 hour blood test is seen while staff are present.",
      evidence: "A single clinician's practical review following the product label; medical writing support was funded by the manufacturer.",
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
    { claim: "Risk-adapted prophylaxis: rasburicase for high risk, allopurinol or rasburicase for intermediate, monitoring for low", grade: "expert panel consensus (grades not in abstract)", source: "cairo-2008" },
    { claim: "Alkalinisation not recommended", grade: "expert panel consensus (grades not in abstract)", source: "cairo-2008", quote: "Alkalinization is not recommended." },
    { claim: "Hydration and rasburicase for high-risk adults; hydration and oral allopurinol for low risk", grade: "consensus conference recommendation (not graded)", source: "haematologica-2008" },
    { claim: "Allopurinol before CAR T cells", grade: "LE: 4", source: "sitc-iec-2020", quote: "For prophylaxis against TLS prior to CAR T cell therapy, allopurinol should be administered" },
  ],
  sources: [
    { key: "haematologica-2008", label: "Consensus conference on the management of tumor lysis syndrome", publisher: "Italian Society of Hematology (SIE), Italian Association of Pediatric Oncologists (AIEOP) and Italian Society of Medical Oncology (AIOM), Haematologica", year: 2008, url: "https://doi.org/10.3324/haematol.13290", doi: "10.3324/haematol.13290", gradingScheme: "Consensus statements from an expert panel; not graded.", read: "full-text", accessed: "2026-11-11" },
    { key: "cairo-2008", label: "Guidelines for the management of pediatric and adult tumor lysis syndrome: an evidence-based review", publisher: "Journal of Clinical Oncology (expert panel)", year: 2008, url: "https://europepmc.org/abstract/MED/18509186", doi: "10.1200/JCO.2007.15.0177", read: "abstract", accessed: "2026-11-11" },
    { key: "cairo-2010", label: "Recommendations for the evaluation of risk and prophylaxis of tumour lysis syndrome (TLS) in adults and children with malignant diseases: an expert TLS panel consensus", publisher: "British Journal of Haematology (international expert panel)", year: 2010, url: "https://europepmc.org/abstract/MED/20331465", doi: "10.1111/j.1365-2141.2010.08143.x", read: "abstract", accessed: "2026-11-11" },
    { key: "bsh-2015", label: "Guidelines for the management of tumour lysis syndrome in adults and children with haematological malignancies on behalf of the British Committee for Standards in Haematology", publisher: "British Society for Haematology, British Journal of Haematology", year: 2015, url: "https://doi.org/10.1111/bjh.13403", doi: "10.1111/bjh.13403", read: "not-reachable", accessed: "2026-11-11" },
    { key: "gribben-2020", label: "Practical management of tumour lysis syndrome in venetoclax-treated patients with chronic lymphocytic leukaemia", publisher: "British Journal of Haematology (review)", year: 2020, url: "https://europepmc.org/article/PMC/PMC7154710", doi: "10.1111/bjh.16345", read: "full-text", accessed: "2026-11-11" },
    SITC_IEC_2020,
  ],
  upgrades: [],
  gaps: [
    "The BSH 2015 guideline, the UK standard, could not be read: Europe PMC holds no abstract and the Wiley page returned 403 to a script.",
    "The Cairo 2008 and 2010 papers were read as abstracts only, so their risk tables, drug doses and grades are not given here.",
    "The fullest source read is from 2008; no newer international guideline on TLS was found in Europe PMC. Lower or single fixed doses of rasburicase are in use, and the evidence for them was not reviewed for this page.",
    "Venetoclax, and other targeted drugs with their own ramp-up schedules, follow their product labels, which were not read here.",
  ],
  drugs: ["rasburicase", "allopurinol", "venetoclax"],
  technologies: ["car-t"],
  terms: ["tumor-lysis-syndrome", "lymphoma-tx-tumour-lysis"],
  tags: ["protocol", "acute-oncology", "oncological-emergency", "metabolic"],
});
