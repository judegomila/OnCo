import { protocol } from "./helpers";
import { ASCO_GAP, ASCO_ICI_2021, ESMO_GAP, ESMO_ICI_2022, SITC_ICI_2021 } from "./irae-sources";

/*
 * Acute kidney injury caused by an immune checkpoint inhibitor, most often acute tubulointerstitial nephritis.
 *
 * What was read, and how: SITC 2021 (full text, renal section and recommendations), as described in
 * ./irae-sources.ts; the 34th Acute Disease Quality Initiative (ADQI) consensus report on ICI-associated AKI (J Am Soc
 * Nephrol 2026). ASCO 2021 abstract only; ESMO 2022 not reachable. DOIs resolved through Europe PMC. Quotes checked by
 * script against the raw text on 11 November 2026, when only the ADQI abstract had been read.
 *
 * Second accuracy pass, 17 November 2026. The ADQI report now reads in full: the PubMed Central page
 * (pmc.ncbi.nlm.nih.gov/articles/PMC13641466/) answered a plain curl and was read as text with tags stripped, all 16
 * consensus statements and Table 5 (strength of consensus and certainty of evidence) included. The Europe PMC
 * full-text XML endpoint returned 500 and its PDF link 403; Figures 2 and 3 are images and only their captions were
 * read. The DOI was resolved again through Crossref and Europe PMC. SITC 2021 (renal review and recommendations, and
 * the general panel recommendations) and the ASCO 2021 abstract were re-read from the raw copies a sibling checker
 * saved from Europe PMC on 16 November 2026. ESMO 2022 and the ASCO full text were not retried: the sibling found both
 * still refusing a script. Every quote was checked again by script. Changed: the 2 to 5% figure is the incidence of
 * injury caused by the drug, not a share of all kidney injury; "usually causes no symptoms" and "aim to start within
 * 3 days" were not in any source and were reworded; reasons no source gives were replaced; the ADQI statements on
 * referral, biopsy, steroid dose and duration, second-line drugs and rechallenge were added with their printed
 * consensus and certainty; the steroid dose is now reported as ADQI reports it.
 */
export const iraeNephritis = protocol({
  id: "irae-nephritis",
  name: "Kidney inflammation (immune-related nephritis) from checkpoint inhibitors",
  aka: ["checkpoint inhibitor nephritis", "ICI-associated acute kidney injury", "ICI-AKI", "immune-related acute interstitial nephritis", "checkpoint inhibitor tubulointerstitial nephritis", "immunotherapy kidney damage"],
  domain: "immunotherapy-toxicity",
  tldr: "Immunotherapy can sometimes inflame the kidneys. It is usually found when the creatinine on a blood test rises. Other causes are looked for, some medicines may be stopped, immunotherapy is paused, and steroids are the first treatment if the immunotherapy is the cause. Restarting immunotherapy later may be considered.",
  simple: "Immunotherapy can sometimes affect the kidneys. Blood tests during treatment check for this. If it happens, immunotherapy is paused and you may need steroids.",
  summary: "Up to 20% of people treated with a checkpoint inhibitor develop acute kidney injury, but the incidence directly attributable to the drug is likely only 2 to 5% (ADQI 2026). Acute tubulointerstitial nephritis is the commonest lesion (80 to 90% of biopsies); glomerular disease is less common. Pooled-trial incidence is 2% on PD-(L)1 inhibitors, 2% on ipilimumab and 5% on the combination (SITC 2021). The median time from starting treatment is 16 weeks, but it varies widely and can be weeks to months after the last dose (ADQI).\n\nSITC 2021: urinalysis and spot urine protein to creatinine ratio (a normal urinalysis does not exclude nephritis); stop drugs known to cause interstitial nephritis, such as NSAIDs, proton pump inhibitors and some antibiotics; hold the checkpoint inhibitor at stage 1 (creatinine up by more than 0.3 mg/dL or 1.5 to 1.9 times baseline) while reversible causes are treated, restarting if the injury resolves, and consider nephrology referral if it persists or progresses; at stage 2 or 3 (at least twice baseline) or grade 2 or higher proteinuria, withhold temporarily and get an expedited nephrology evaluation; strongly consider biopsy when feasible. Glucocorticoids are first-line for interstitial nephritis (LE: 3); infliximab or mycophenolate may be given if it does not respond (LE: 4); glomerular disease gets the standard therapy for the lesion. The kidney section gives no steroid dose or taper and no level at which the drug is stopped for good; SITC's general rule is that re-challenge after a grade 3 or 4 toxicity is risk-adjusted (LE: 3).\n\nADQI 2026 (16 consensus statements): suggests prompt nephrology referral for every suspected case; biopsy if there is diagnostic uncertainty and the result could change management, or if the injury does not improve on empirical treatment; withholding the checkpoint inhibitor until the injury has recovered or stabilised; withdrawing proton pump inhibitors and other culprit drugs; and early empirical glucocorticoids even while a biopsy is awaited, because treatment within 3 days of diagnosis is associated with higher odds of kidney recovery. It reports that current guidelines start at 0.5 to 1 mg/kg of prednisone equivalents, with higher or intravenous doses often reserved for moderate to severe injury, and that most patients are treated for 4 to 8 weeks, but says the best duration is not established and should be individualised. Nephritis is refractory to steroids or recurs after the taper in 16 to 23%; second-line drugs (infliximab, tocilizumab or mycophenolate) may then be considered, on limited data. Rechallenge may be considered once the injury has been treated: recurrence was under 20% in the largest study.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "multidisciplinary-team"],
    where: ["outpatient-clinic", "chemotherapy-day-unit", "acute-oncology-service", "ward"],
  },
  population: "People receiving or who have received an immune checkpoint inhibitor whose kidney function falls. Kidney transplant recipients are a separate high-risk group: SITC allows checkpoint inhibitors only after extensive counselling about the high probability of rejection and dialysis dependence, and ADQI reports rejection in 20 to 40%. ADQI also suggests cautious use with close monitoring in advanced chronic kidney disease. Neither source makes a recommendation for children.",
  trigger: "A rise in serum creatinine (SITC stage 1: a rise of more than 0.3 mg/dL or 1.5 to 1.9 times baseline; ADQI defines the condition from 1.5 times the baseline before treatment, with no other plausible cause), or significant proteinuria or blood in the urine, during checkpoint inhibitor treatment or in the weeks to months after the last dose.",
  steps: [
    {
      action: "Send a urinalysis and a spot urine protein to creatinine ratio",
      why: "An active urinary sediment or heavy proteinuria points to glomerular disease rather than nephritis, though a normal result does not rule nephritis out.",
      source: "sitc-2021",
      quote: "Patients with possible ICI-related AKI should have a urinalysis and quantification of proteinuria with a spot urine protein:Cr ratio. It should be noted that normal urinalysis does not exclude TIN.",
    },
    {
      action: "Stop other medicines known to cause interstitial nephritis, such as NSAIDs, proton pump inhibitors and some antibiotics",
      why: "These medicines are known to cause the same kidney inflammation. If an antibiotic is implicated and the infection still needs treating, SITC says to use one from a different class.",
      source: "sitc-2021",
      quote: "In cases of potential ICI-related AKI, concomitant medications known to cause TIN (eg, NSAIDs, proton pump inhibitors, and some antibiotics) should be discontinued.",
    },
    {
      action: "At stage 1 kidney injury, hold the checkpoint inhibitor while reversible causes such as low fluid volume are looked for and treated; it can be restarted if the injury resolves. Consider a nephrology referral if stage 1 injury persists or progresses",
      why: "In most cases kidney injury during immunotherapy is not a direct result of the immunotherapy, so other causes are looked for first.",
      source: "sitc-2021",
      quote: "In patients with stage I AKI (Cr increase of >0.3 mg/dL or 1.5–1.9 times baseline), the ICI should be held while the patient undergoes evaluation and treatment of reversible causes (eg, hypovolemia). ICI therapy can be restarted if the AKI resolves. Nephrology referral should be considered for patients with progressive or persistent stage I AKI.",
    },
    {
      action: "At stage 2 or 3 (creatinine at least twice baseline) or grade 2 or higher proteinuria, withhold the checkpoint inhibitor temporarily and get an expedited nephrology evaluation",
      why: "A larger rise in creatinine, or significant protein in the urine, needs a kidney specialist's assessment quickly.",
      source: "sitc-2021",
      quote: "Patients with stage II or III AKI (Cr ≥2 times baseline) and/or significant (grade ≥2) proteinuria should have ICIs temporarily withheld and undergo expedited evaluation by a nephrologist.",
    },
    {
      action: "Strongly consider a kidney biopsy where it is feasible, particularly if another cause is plausible or the urine suggests glomerular disease",
      why: "SITC says kidney injury from immunotherapy has no specific clinical features. ADQI calls kidney biopsy the diagnostic gold standard.",
      source: "sitc-2021",
      quote: "Given the lack of specific clinical features for ICI-related AKI, renal biopsy should be strongly considered when feasible, particularly when a plausible alternative etiology for AKI exists or urine studies are suggestive of glomerular disease.",
    },
    {
      action: "Treat immune-related interstitial nephritis with glucocorticoids first",
      why: "SITC says the majority of interstitial nephritis cases respond to steroids. For glomerular disease it advises the standard therapy for the lesion found.",
      source: "sitc-2021",
      quote: "The first-line treatment for ICI-related TIN is glucocorticoids",
      grade: "LE: 3",
    },
    {
      action: "Consider starting glucocorticoids early when immune-related nephritis is suspected or confirmed, even while a biopsy is awaited",
      why: "Treatment within 3 days of diagnosis was associated with higher odds of kidney recovery. ADQI says this rests mainly on observational data, not randomised trials.",
      source: "adqi-2026",
      quote: "Management of patients with confirmed or suspected ICI–acute tubulointerstitial nephritis, the most common histopathologic lesion in ICI-AKI, includes (1) early consultation with nephrology; (2) temporary withholding of ICI therapy; (3) withdrawal of proton pump inhibitors and other acute tubulointerstitial nephritis–causing drugs, if feasible; and (4) early empiric initiation of immunosuppressive therapy, even while awaiting a kidney biopsy, given that early treatment (within 3 days of ICI-AKI diagnosis) is associated with higher odds of kidney recovery.",
      grade: "Strength of consensus 97%; certainty of evidence: Moderate",
    },
    {
      action: "Individualise the steroid dose and the length of the course; ADQI reports that current guidelines start at 0.5 to 1 mg/kg of prednisone equivalents and that most patients are treated for 4 to 8 weeks",
      why: "The best length of course has not been established. Higher doses or intravenous steroids are often reserved for moderate to severe injury, and steroids are generally tapered gradually over several weeks once kidney function improves.",
      source: "adqi-2026",
      quote: "We suggest that while most patients with ICI-AKI receive glucocorticoids for 4–8 weeks, the duration should be individualized according to AKI severity, responsiveness to glucocorticoids, the presence of extrarenal immune-related adverse events, glucocorticoid toxicity, and the urgency of ICI rechallenge.",
      grade: "Strength of consensus 100%; certainty of evidence: Low",
    },
    {
      action: "If nephritis does not respond to glucocorticoids, consider infliximab or mycophenolate mofetil",
      why: "SITC bases mycophenolate on its use in interstitial nephritis from other causes. ADQI lists tocilizumab as a further option, says infliximab has the most direct data in this condition, and says the data for any specific drug are limited.",
      source: "sitc-2021",
      quote: "Patients with interstitial nephritis that does not respond to glucocorticoid therapy may receive infliximab or mycophenolate mofetil",
      grade: "LE: 4",
    },
    {
      action: "Once the kidney injury has been treated, consider restarting the checkpoint inhibitor, weighing the risk of recurrence and other immune side effects against the benefit of treating the cancer",
      why: "In the largest study ADQI cites, the kidney injury came back in fewer than 1 in 5 people who restarted. SITC's general rule is that restarting after a grade 3 or 4 immune side effect is a risk-adjusted decision.",
      source: "adqi-2026",
      quote: "Once ICI-AKI has been treated, ICI rechallenge may be considered, as the risk of recurrent ICI-AKI is <20%. However, the decision to rechallenge involves weighing the risks of recurrent ICI-AKI and other immune-related adverse events against the benefits of treating progressive cancer.",
      grade: "Strength of consensus 100%; certainty of evidence: Low",
    },
  ],
  bestInClass: {
    statement: "SITC 2021 gives the stepwise oncology protocol: urine studies, stop drugs known to cause interstitial nephritis, hold at stage 1 and get an expedited nephrology evaluation at stage 2 or 3, strongly consider biopsy when feasible, glucocorticoids first-line (LE: 3), infliximab or mycophenolate if there is no response (LE: 4). The ADQI 2026 consensus is the most recent statement read and is written by a multidisciplinary panel focused on this one problem. It agrees on withholding, stopping culprit drugs and glucocorticoids first, and goes further in three places: it suggests prompt nephrology referral for every suspected case, it suggests early empirical glucocorticoids even before a biopsy, and it says rechallenge may be considered because recurrence is under 20%. ADQI rates the certainty of evidence for its management statements as moderate or low. Neither sets a steroid dose of its own: ADQI reports the 0.5 to 1 mg/kg and 4 to 8 weeks of other guidelines and says the duration should be individualised. Neither names a creatinine level at which the checkpoint inhibitor is stopped for good; the ASCO 2021 abstract's general rule, which is not specific to the kidney, is that permanent discontinuation is in general recommended at grade 4.",
    sources: ["sitc-2021", "adqi-2026", "asco-2021"],
  },
  variants: [
    {
      name: "KDIGO staging instead of CTCAE grading (SITC 2021)",
      differs: "Stages the kidney injury with KDIGO creatinine and urine output criteria, which use both a rise above baseline and absolute thresholds, rather than the CTCAE grade; SITC notes that most trials use CTCAE, which may underestimate the rate of kidney injury.",
      evidence: "Expert consensus.",
      sources: ["sitc-2021"],
    },
    {
      name: "A definition without the absolute creatinine rise (ADQI 2026)",
      differs: "Defines the condition as a lesion on biopsy, or a creatinine at least 1.5 times the baseline before treatment with no other plausible cause. It leaves out the absolute rise of 0.3 mg/dL that SITC's stage 1 includes, because that rise has to be shown within 48 hours and most patients are outpatients without daily blood tests.",
      evidence: "Consensus statement 3: strength of consensus 94%; certainty of evidence: Low.",
      sources: ["adqi-2026", "sitc-2021"],
    },
    {
      name: "Nephrology referral for every suspected case (ADQI 2026)",
      differs: "Suggests prompt nephrology referral for all patients with suspected kidney injury from a checkpoint inhibitor. SITC says referral should be considered for stage 1 injury that persists or progresses and asks for expedited nephrology evaluation at stage 2 or 3.",
      evidence: "ADQI consensus statement 5: strength of consensus 97%; certainty of evidence: Moderate. SITC: expert consensus, no LE printed.",
      sources: ["adqi-2026", "sitc-2021"],
    },
    {
      name: "Biopsy decided by clinical suspicion (ADQI 2026)",
      differs: "With low suspicion, address the other suspected cause; with high suspicion, treat empirically with glucocorticoids; biopsy those with moderate suspicion and those with high suspicion who do not respond. The consensus statement suggests biopsy if diagnostic uncertainty exists and the findings could change management, or if the injury fails to improve despite empirical treatment. SITC says biopsy should be strongly considered when feasible.",
      evidence: "ADQI consensus statement 6: strength of consensus 97%; certainty of evidence: Moderate. SITC: expert consensus, no LE printed.",
      sources: ["adqi-2026", "sitc-2021"],
    },
    {
      name: "Checkpoint inhibitors in kidney transplant recipients (SITC 2021, ADQI 2026)",
      differs: "SITC allows treatment only after extensive counselling about the high probability of rejection and dialysis dependence, particularly with PD-(L)1 antibodies. ADQI reports rejection in 20 to 40% of patients, with a median onset 2 to 3 weeks after starting, and suggests careful assessment of risks and benefits, possible adjustment of immunosuppression and close monitoring of kidney function.",
      evidence: "SITC: LE: 4. ADQI consensus statement 14: strength of consensus 100%; certainty of evidence: Moderate.",
      sources: ["sitc-2021", "adqi-2026"],
    },
  ],
  grades: [
    { claim: "Glucocorticoids first-line for immune-related interstitial nephritis", grade: "LE: 3", source: "sitc-2021" },
    { claim: "Infliximab or mycophenolate mofetil may be given for interstitial nephritis that does not respond to glucocorticoids", grade: "LE: 4", source: "sitc-2021" },
    { claim: "Checkpoint inhibitors in kidney transplant recipients only after counselling on rejection risk", grade: "LE: 4", source: "sitc-2021", quote: "Patients with renal allografts may receive ICIs, but only after extensive counseling on the associated risks and high probability of rejection and subsequent dialysis dependence" },
    { claim: "General rule, not specific to the kidney: re-challenge after a grade 3 or 4 immune side effect is a risk-adjusted decision", grade: "LE: 3", source: "sitc-2021", quote: "The decision to re-challenge a patient who has experienced grade 3 or 4 irAEs should be risk-adjusted based on anticipated benefit with therapy versus the potential for toxicity" },
    { claim: "Prompt nephrology referral and structured evaluation for suspected cases (statement 5)", grade: "Strength of consensus 97%; certainty of evidence: Moderate", source: "adqi-2026", quote: "We suggest prompt nephrology referral for patients with suspected ICI-AKI." },
    { claim: "Biopsy if diagnostic uncertainty exists and findings could change management, or if there is no improvement on empirical treatment (statement 6)", grade: "Strength of consensus 97%; certainty of evidence: Moderate", source: "adqi-2026", quote: "We suggest that patients with suspected ICI-AKI undergo a kidney biopsy if diagnostic uncertainty exists and findings could change management or if AKI fails to improve despite empiric treatment" },
    { claim: "Withhold the checkpoint inhibitor, withdraw proton pump inhibitors and other culprit drugs, and start glucocorticoids early (statement 8)", grade: "Strength of consensus 97%; certainty of evidence: Moderate", source: "adqi-2026" },
    { claim: "Individualise the duration of glucocorticoids; most patients receive 4 to 8 weeks (statement 9)", grade: "Strength of consensus 100%; certainty of evidence: Low", source: "adqi-2026" },
    { claim: "Consider second-line immunosuppression for refractory or recurrent cases (statement 10)", grade: "Strength of consensus 97%; certainty of evidence: Low", source: "adqi-2026", quote: "We suggest that patients with ICI-AKI that is refractory to glucocorticoids or that recurs after their completion be considered for second-line immunosuppressive therapies, recognizing that data supporting specific agents remain limited." },
    { claim: "Rechallenge may be considered after an individual weighing of risk and benefit (statement 13)", grade: "Strength of consensus 100%; certainty of evidence: Low", source: "adqi-2026" },
  ],
  sources: [
    { ...SITC_ICI_2021, accessed: "2026-11-17" },
    {
      key: "adqi-2026",
      label: "Immune Checkpoint Inhibitor-Associated Acute Kidney Injury: A Report from the 34th Acute Disease Quality Initiative (ADQI) Consensus Conference",
      publisher: "Acute Disease Quality Initiative, Journal of the American Society of Nephrology",
      year: 2026,
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC13641466/",
      doi: "10.1681/ASN.0000001232",
      gradingScheme: "Consensus statements reached by a modified Delphi method, with consensus defined as agreement by more than 85% of delegates. Table 5 prints for each statement the strength of consensus (percentage agreement) and the panel's certainty of evidence (high, moderate, low or very low). No formal GRADE assessment was performed.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    { ...ASCO_ICI_2021, accessed: "2026-11-17" },
    ESMO_ICI_2022,
  ],
  upgrades: [],
  gaps: [
    ESMO_GAP,
    ASCO_GAP,
    "The kidney table of the ASCO 2021 guideline was not read, so its grade-by-grade creatinine thresholds, steroid doses and rules on stopping the checkpoint inhibitor are not compared here.",
    "On 17 November 2026 the ADQI 2026 report was read in full as text from its PubMed Central page. Its two algorithm figures (Figure 2, diagnosis and treatment; Figure 3, rechallenge) are images and only their captions were read, and its supplemental methods were not read.",
    "No source read sets a steroid dose of its own for immune-related nephritis. SITC's kidney section gives none. ADQI reports that current guidelines recommend 0.5 to 1 mg/kg of prednisone equivalents and 4 to 8 weeks, citing the ASCO 2021 guideline, an American Society of Onco-Nephrology position statement and, for the duration, an NCCN guideline, none of whose kidney advice was read here; it says the optimal duration has not been established.",
    "No source read names a creatinine level or stage at which the checkpoint inhibitor is stopped permanently for kidney injury. SITC and ADQI speak only of withholding and of a risk-weighed decision to restart.",
    "SITC writes \"significant (grade ≥2) proteinuria\" without defining the grade, and no definition is given here.",
  ],
  drugs: ["pembrolizumab", "nivolumab", "ipilimumab", "atezolizumab", "durvalumab", "cemiplimab", "tremelimumab", "avelumab", "dostarlimab", "infliximab", "mycophenolate"],
  technologies: ["checkpoint-inhibitor"],
  institutions: ["sitc", "asco", "esmo"],
  terms: ["irae", "rechallenge"],
  keyPapers: ["paper-asco-irae-guideline-jco-2021"],
  related: ["irae-rechallenge", "checkpoint-inhibitor-baseline-and-monitoring"],
  tags: ["protocol", "irae", "nephrology"],
});
