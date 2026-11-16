import { protocol } from "./helpers";
import { ASCO_ICI_2021, ESMO_GAP, ESMO_ICI_2022, SITC_ICI_2021 } from "./irae-sources";

/*
 * Acute kidney injury caused by an immune checkpoint inhibitor, most often acute tubulointerstitial nephritis.
 *
 * What was read, and how: SITC 2021 (full text, renal section and recommendations), as described in
 * ./irae-sources.ts; the 34th Acute Disease Quality Initiative (ADQI) consensus report on ICI-associated AKI (J Am Soc
 * Nephrol 2026), whose publisher does not allow full-text download from PubMed Central, so only the abstract was read
 * (through the NCBI E-utilities efetch service). ASCO 2021 abstract only; ESMO 2022 not reachable. DOIs resolved through
 * Europe PMC. Quotes checked by script against the raw text on 11 November 2026.
 */
export const iraeNephritis = protocol({
  id: "irae-nephritis",
  name: "Kidney inflammation (immune-related nephritis) from checkpoint inhibitors",
  aka: ["checkpoint inhibitor nephritis", "ICI-associated acute kidney injury", "ICI-AKI", "immune-related acute interstitial nephritis", "checkpoint inhibitor tubulointerstitial nephritis", "immunotherapy kidney damage"],
  domain: "immunotherapy-toxicity",
  tldr: "Immunotherapy can occasionally inflame the kidneys. It usually causes no symptoms and is found when the creatinine on a routine blood test rises. Other causes are looked for first, some medicines may be stopped, immunotherapy is paused, and steroids are given if the immunotherapy is the cause. Some people can later restart.",
  simple: "Immunotherapy can sometimes affect the kidneys. Your blood tests check for this. If it happens, immunotherapy is paused and you may need steroids.",
  summary: "Acute kidney injury is common on checkpoint inhibitors (up to 20% in observational data) but only about 2 to 5% is caused by the checkpoint inhibitor (ADQI 2026). Tubulointerstitial nephritis is the commonest lesion (80 to 90% of biopsies); glomerular disease is rarer. Pooled-trial incidence is about 2% on PD-(L)1 inhibitors or ipilimumab and 5% on the combination (SITC 2021).\n\nSITC 2021: urinalysis and spot urine protein to creatinine ratio (a normal urinalysis does not exclude nephritis); stop drugs known to cause interstitial nephritis, including NSAIDs and proton pump inhibitors; hold the checkpoint inhibitor at KDIGO stage 1 while reversible causes are treated, restarting if the injury resolves; at stage 2 or 3 or significant proteinuria, withhold and refer urgently to nephrology; strongly consider biopsy. Glucocorticoids are first-line (LE: 3); infliximab or mycophenolate for steroid-refractory nephritis (LE: 4).\n\nADQI 2026 (abstract): no clinical feature reliably separates ICI-AKI from other causes and biopsy remains the gold standard; starting glucocorticoids within 3 days of diagnosis is associated with more kidney recovery; recurrence after rechallenge is under 20%, and the panel supports cautious rechallenge in selected patients.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "multidisciplinary-team"],
    where: ["outpatient-clinic", "chemotherapy-day-unit", "acute-oncology-service", "ward"],
  },
  population: "Adults receiving or who have received an immune checkpoint inhibitor whose kidney function falls. Kidney transplant recipients are a separate high-risk group: SITC allows checkpoint inhibitors only after counselling about the high chance of rejection and dialysis. Children are not addressed by these sources.",
  trigger: "A rise in serum creatinine (KDIGO stage 1: a rise of more than 0.3 mg/dL or 1.5 to 1.9 times baseline), new proteinuria or blood in the urine, during or after checkpoint inhibitor treatment.",
  steps: [
    {
      action: "Send a urinalysis and a spot urine protein to creatinine ratio",
      why: "The urine helps separate nephritis from glomerular disease, though a normal result does not rule nephritis out.",
      source: "sitc-2021",
      quote: "Patients with possible ICI-related AKI should have a urinalysis and quantification of proteinuria with a spot urine protein:Cr ratio. It should be noted that normal urinalysis does not exclude TIN.",
    },
    {
      action: "Stop other medicines that can cause interstitial nephritis, such as NSAIDs, proton pump inhibitors and some antibiotics",
      why: "These drugs cause the same kidney inflammation and may be the real culprit.",
      source: "sitc-2021",
      quote: "In cases of potential ICI-related AKI, concomitant medications known to cause TIN (eg, NSAIDs, proton pump inhibitors, and some antibiotics) should be discontinued.",
    },
    {
      action: "At stage 1 kidney injury, hold the checkpoint inhibitor while reversible causes such as dehydration are treated; restart if the injury resolves",
      why: "Most kidney injury in people on immunotherapy has another cause that can be fixed.",
      source: "sitc-2021",
      quote: "In patients with stage I AKI (Cr increase of >0.3 mg/dL or 1.5–1.9 times baseline), the ICI should be held while the patient undergoes evaluation and treatment of reversible causes (eg, hypovolemia). ICI therapy can be restarted if the AKI resolves.",
    },
    {
      action: "At stage 2 or 3 (creatinine at least twice baseline) or grade 2 or more proteinuria, withhold the checkpoint inhibitor and get an urgent nephrology review",
      why: "Larger falls in kidney function need specialist assessment and often a biopsy.",
      source: "sitc-2021",
      quote: "Patients with stage II or III AKI (Cr ≥2 times baseline) and/or significant (grade ≥2) proteinuria should have ICIs temporarily withheld and undergo expedited evaluation by a nephrologist.",
    },
    {
      action: "Strongly consider a kidney biopsy where it is feasible",
      why: "No blood or urine test reliably proves the immunotherapy is the cause; a biopsy does.",
      source: "sitc-2021",
      quote: "Given the lack of specific clinical features for ICI-related AKI, renal biopsy should be strongly considered when feasible, particularly when a plausible alternative etiology for AKI exists or urine studies are suggestive of glomerular disease.",
    },
    {
      action: "Treat immune-related interstitial nephritis with glucocorticoids, starting early",
      why: "Most cases respond to steroids, and recovery is better when they start within 3 days of diagnosis.",
      source: "sitc-2021",
      quote: "The first-line treatment for ICI-related TIN is glucocorticoids",
      grade: "LE: 3",
    },
    {
      action: "Aim to start glucocorticoids within 3 days of diagnosis",
      why: "Earlier steroids were associated with more kidney recovery.",
      source: "adqi-2026",
      quote: "Early glucocorticoid initiation (within 3 days of ICI-AKI diagnosis versus >3 days after diagnosis) is associated with higher rates of kidney recovery, although optimal dosing and duration remain uncertain.",
    },
    {
      action: "If nephritis does not respond to glucocorticoids, consider infliximab or mycophenolate mofetil",
      why: "A second immunosuppressant can rescue kidneys that do not respond to steroids.",
      source: "sitc-2021",
      quote: "Patients with interstitial nephritis that does not respond to glucocorticoid therapy may receive infliximab or mycophenolate mofetil",
      grade: "LE: 4",
    },
    {
      action: "Once the kidneys have recovered, discuss restarting the checkpoint inhibitor in selected patients",
      why: "The kidney injury comes back in fewer than 1 in 5 people who restart.",
      source: "adqi-2026",
      quote: "Recurrent ICI-AKI occurs in fewer than 20% of patients undergoing ICI rechallenge.",
    },
  ],
  bestInClass: {
    statement: "SITC 2021 (full text) gives the stepwise protocol: urine studies, stop drugs that cause interstitial nephritis, hold at KDIGO stage 1 and refer at stage 2 or 3, strongly consider biopsy, glucocorticoids first-line (LE: 3), infliximab or mycophenolate if refractory (LE: 4). The ADQI 2026 consensus, the most recent and the only nephrology-led statement, agrees and adds from its abstract that steroids started within 3 days are associated with more recovery, that biopsy is the diagnostic gold standard, and that cautious rechallenge is reasonable in selected patients because recurrence is under 20%. Neither sets a steroid dose or duration with confidence: ADQI says the optimal dosing and duration remain uncertain.",
    sources: ["sitc-2021", "adqi-2026", "asco-2021", "esmo-2022"],
  },
  variants: [
    {
      name: "KDIGO staging instead of CTCAE grading (SITC 2021)",
      differs: "Stages the kidney injury with KDIGO creatinine and urine output criteria, which use both a rise above baseline and absolute thresholds, rather than the CTCAE grade; SITC notes that most trials use CTCAE, which may underestimate kidney injury.",
      evidence: "Expert consensus.",
      sources: ["sitc-2021"],
    },
    {
      name: "Checkpoint inhibitors in kidney transplant recipients (SITC 2021)",
      differs: "Allows treatment only after extensive counselling about the high probability of rejection and dialysis dependence, particularly with PD-(L)1 antibodies.",
      evidence: "LE: 4.",
      sources: ["sitc-2021"],
    },
  ],
  grades: [
    { claim: "Glucocorticoids first-line for immune-related interstitial nephritis", grade: "LE: 3", source: "sitc-2021" },
    { claim: "Infliximab or mycophenolate mofetil for steroid-refractory interstitial nephritis", grade: "LE: 4", source: "sitc-2021" },
    { claim: "Checkpoint inhibitors in kidney transplant recipients only after counselling on rejection risk", grade: "LE: 4", source: "sitc-2021", quote: "Patients with renal allografts may receive ICIs, but only after extensive counseling on the associated risks and high probability of rejection and subsequent dialysis dependence" },
    { claim: "Cautious rechallenge in selected patients", grade: "consensus statement (modified Delphi)", source: "adqi-2026", quote: "these consensus statements provide a framework for diagnosis and management, support cautious ICI rechallenge in selected patients, and identify priorities for future research." },
  ],
  sources: [
    SITC_ICI_2021,
    {
      key: "adqi-2026",
      label: "Immune Checkpoint Inhibitor-Associated Acute Kidney Injury: A Report from the 34th Acute Disease Quality Initiative (ADQI) Consensus Conference",
      publisher: "Acute Disease Quality Initiative, Journal of the American Society of Nephrology",
      year: 2026,
      url: "https://europepmc.org/article/PMC/PMC13641466",
      doi: "10.1681/ASN.0000001232",
      gradingScheme: "Consensus statements reached by a modified Delphi method after systematic PubMed searches; the abstract does not give grades.",
      read: "abstract",
      accessed: "2026-11-11",
    },
    ASCO_ICI_2021,
    ESMO_ICI_2022,
  ],
  upgrades: [],
  gaps: [
    ESMO_GAP,
    "The ADQI 2026 consensus was read only as its abstract: the publisher does not allow the full text to be downloaded from PubMed Central. Its individual consensus statements, steroid regimen and rechallenge criteria are not given here.",
    "The ASCO 2021 guideline was read only as its abstract and its renal table is not compared here.",
    "No source read gives a steroid dose or duration for immune-related nephritis that rests on more than observational data; ADQI states that the optimal dosing and duration remain uncertain.",
  ],
  drugs: ["pembrolizumab", "nivolumab", "ipilimumab", "atezolizumab", "durvalumab", "cemiplimab", "tremelimumab", "avelumab", "dostarlimab", "infliximab", "mycophenolate"],
  technologies: ["checkpoint-inhibitor"],
  institutions: ["sitc", "asco", "esmo"],
  terms: ["irae", "rechallenge"],
  keyPapers: ["paper-asco-irae-guideline-jco-2021"],
  related: ["irae-rechallenge", "checkpoint-inhibitor-baseline-and-monitoring"],
  tags: ["protocol", "irae", "nephrology"],
});
