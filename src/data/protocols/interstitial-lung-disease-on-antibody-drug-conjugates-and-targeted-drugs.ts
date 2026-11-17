import { protocol } from "./helpers";

/*
 * Drug-induced interstitial lung disease (ILD, pneumonitis) on trastuzumab deruxtecan and other deruxtecan
 * antibody-drug conjugates, EGFR and KRAS inhibitors, CDK4/6 inhibitors, everolimus and PARP inhibitors: watching for
 * it, grading it, and the different label rules set side by side.
 *
 * What was read, and how (all on 16 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - Conte et al., "Drug-induced interstitial lung disease during cancer therapies: expert opinion on diagnosis and
 *   treatment" (ESMO Open 2022): full text, Europe PMC full-text XML (PMC8881716). It is the opinion of a panel of 14
 *   Italian experts published in an ESMO journal, not an ESMO Clinical Practice Guideline, and prints no grades. Its
 *   funding statement reads: "Funding for publication and workshops: Daiichi Sankyo S.p.A. (Italy) and AstraZeneca
 *   S.p.A. (Italy)", and its acknowledgements thank an employee of each company for contributions to the conception
 *   and design of the work. Both companies market trastuzumab deruxtecan.
 * - Powell et al., pooled analysis of ILD in nine trastuzumab deruxtecan monotherapy studies (ESMO Open 2022): full
 *   text, Europe PMC full-text XML (PMC9434416). Supported by AstraZeneca and Daiichi Sankyo, with medical writing
 *   funded by AstraZeneca (its own funding statement).
 * - Eight United States labels, each the current DailyMed SPL XML stripped to text: trastuzumab deruxtecan (Enhertu),
 *   datopotamab deruxtecan (Datroway), osimertinib (Tagrisso), abemaciclib (Verzenio), ribociclib (Kisqali),
 *   everolimus (Afinitor), sotorasib (Lumakras) and olaparib (Lynparza).
 * - Swain et al., multidisciplinary clinical guidance on trastuzumab deruxtecan ILD (Cancer Treat Rev 2022): abstract
 *   only, from Europe PMC. The publisher pages returned 403 to a script and Europe PMC holds no full text. Its funding
 *   statement could therefore not be read; Europe PMC's record lists AstraZeneca among the funders. No step rests on
 *   it, and its monitoring schedule is not described here.
 * - Rugo et al., pooled analysis of trastuzumab deruxtecan retreatment after grade 1 ILD (Ann Oncol 2025): abstract
 *   only, from Europe PMC, whose record lists AstraZeneca and Daiichi Sankyo as funders. Used for the retreatment
 *   figures only.
 * - Not read: the Japanese Respiratory Society consensus on drug-induced lung injury, any ASCO guidance, the labels of
 *   patritumab deruxtecan and ifinatamab deruxtecan (no US label was looked for), and the European product information.
 *
 * DOIs were resolved through Europe PMC or Crossref and the titles checked. Quotes are copied from the raw text with
 * line breaks joined and nothing else changed, and were checked by script. US labels spell "dyspnea"; quotes keep it.
 */
export const interstitialLungDiseaseOnAntibodyDrugConjugatesAndTargetedDrugs = protocol({
  id: "interstitial-lung-disease-on-antibody-drug-conjugates-and-targeted-drugs",
  name: "Interstitial lung disease on antibody-drug conjugates and targeted drugs: monitoring and management by grade",
  aka: [
    "drug-induced ILD",
    "drug-induced pneumonitis",
    "trastuzumab deruxtecan ILD",
    "T-DXd pneumonitis",
    "Enhertu lung inflammation",
    "osimertinib pneumonitis",
    "everolimus non-infectious pneumonitis",
    "CDK4/6 inhibitor pneumonitis",
    "DIILD",
  ],
  domain: "symptom-management",
  tldr: "Some cancer drugs, above all trastuzumab deruxtecan, can inflame the lungs. It is often found on a scan before any symptoms, and it is treated by pausing or stopping the drug and, often, steroid tablets. The rules differ from drug to drug. A new or worsening cough, breathlessness or fever needs a call to your cancer team the same day, not at the next appointment.",
  simple: "A few cancer medicines can inflame the lungs. Tell your cancer team the same day if you get a new cough, feel short of breath or have a fever. They may do a scan, pause the medicine and give steroids. Your own team's plan comes first.",
  summary: "Drug-induced ILD is a diagnosis of exclusion: infection, cancer progression, radiation pneumonitis and fluid overload look similar on CT. Grade 1 is a scan finding with no symptoms, grade 2 mild symptoms, grade 3 severe symptoms or a need for oxygen, grade 4 life-threatening. What happens at each grade depends on the drug, and the label of the drug being taken is the rule; the reader's own team's protocol comes first.\n\nHow common (US labels): trastuzumab deruxtecan 12% at 5.4 mg/kg, fatal in 0.9%, median onset 5.5 months; datopotamab deruxtecan 7% in lung cancer and 3.0% in breast cancer; osimertinib 4%; abemaciclib about 3%; ribociclib 1.6% in advanced breast cancer; everolimus up to 19%; sotorasib 2.2%; olaparib 1.0%. In a manufacturer-funded pooled analysis of 1150 trial patients on trastuzumab deruxtecan, 87.0% of first events came within 12 months, and the factors associated with higher risk were age under 65, enrolment in Japan, a dose above 6.4 mg/kg, oxygen saturation below 95%, moderate or severe renal impairment, lung comorbidities and more than 4 years since diagnosis.\n\nGrade 1 (no symptoms), side by side. Trastuzumab deruxtecan and datopotamab deruxtecan: withhold until fully resolved, consider prednisolone at 0.5 mg/kg/day or more, and resume at the same dose if resolved within 28 days or one dose level lower if later. Everolimus: continue without changing the dose. Abemaciclib: no dose change at grade 1 or 2. Ribociclib: no interruption at grade 1. Osimertinib: stop permanently once ILD is confirmed, whatever the grade, except after recent chemoradiotherapy, where grade 1 may be continued or interrupted and restarted. Sotorasib and olaparib: withhold on suspicion and stop permanently if confirmed.\n\nGrade 2 and above. Deruxtecan conjugates: stop permanently and start prednisolone at 1 mg/kg/day or more for at least 14 days, then taper over at least 4 weeks. Osimertinib, sotorasib, olaparib: stopped. Everolimus: withhold at grade 2 or 3 and resume at half dose after improvement, stop at grade 4. Abemaciclib: withhold for persistent or recurrent grade 2 and resume one dose lower, stop at grade 3 or 4. Ribociclib: interrupt at grade 2 and consider a lower dose, stop at grade 3 or 4.\n\nThe expert opinion of Conte and colleagues (ESMO Open 2022, funded by Daiichi Sankyo and AstraZeneca, ungraded) adds a work-up (high-resolution CT at once, oxygen saturation, bloods, microbiology, lung function, bronchoscopy when the picture is unclear), prednisone 1 to 2 mg/kg/day at grade 2, methylprednisolone 1 to 2 mg/kg/day at grade 3, pulsed methylprednisolone 500 to 1000 mg/day for 3 days as an option at grade 4, and infliximab, mycophenolate or immunoglobulin if there is no response in 48 to 72 hours. It says the efficacy of steroids is not clearly established.",
  asOf: "2026-11-16",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "patient-or-carer", "multidisciplinary-team"],
    where: ["outpatient-clinic", "chemotherapy-day-unit", "acute-oncology-service", "telephone-triage", "emergency-department", "ward"],
  },
  population: "Adults taking a non-immunotherapy anticancer drug whose label warns of interstitial lung disease or pneumonitis: here trastuzumab deruxtecan, datopotamab deruxtecan, osimertinib, abemaciclib, ribociclib, everolimus, sotorasib and olaparib, whose US labels were read. Pneumonitis from checkpoint inhibitors and radiation pneumonitis have their own pages. Patritumab deruxtecan, ifinatamab deruxtecan and other products were not read label by label. Children are not addressed.",
  trigger: "Starting one of these drugs (baseline assessment and teaching), a new or worsening cough, breathlessness, fever or fall in oxygen saturation during treatment, or new lung shadowing on a scan done for any reason.",
  steps: [
    {
      action: "Before the first dose, review the risk: existing lung disease, earlier pneumonitis, chest radiotherapy, kidney function and other medicines that can injure the lung",
      why: "People who start with lung disease have less reserve if inflammation develops, and on trastuzumab deruxtecan lung disease and reduced kidney function were linked with a higher risk.",
      source: "conte-esmo-2022",
      quote: "Before the start of any anticancer therapy, physicians should carefully evaluate the risk for DIILD",
    },
    {
      action: "For a drug with a high risk, record a baseline: oxygen saturation and other vital signs, a chest examination, chest imaging and spirometry",
      why: "A later change can only be judged against where the person started.",
      source: "conte-esmo-2022",
      quote: "(ii) the baseline evaluation of respiratory function (i.e. spirometry) in addition to vital signs, physical examination and chest imaging",
    },
    {
      action: "Teach the person to report a new or worsening cough, breathlessness or fever the same day",
      why: "Early inflammation is treatable, and delay is what turns a mild case into a dangerous one.",
      source: "label-trastuzumab-deruxtecan",
      quote: "Advise patients to immediately report cough, dyspnea, fever, and/or any new or worsening respiratory symptoms.",
    },
    {
      action: "At every visit ask about cough and breathlessness, and look at each new scan for lung changes as well as for the cancer",
      why: "Up to a third of cases have no symptoms and are found on a scan; reviewers looking back at trial scans often dated the onset earlier than the treating doctor had.",
      source: "label-abemaciclib",
      quote: "Monitor patients for pulmonary symptoms indicative of ILD or pneumonitis. Symptoms may include hypoxia, cough, dyspnea, or interstitial infiltrates on radiologic exams.",
    },
    {
      action: "If lung inflammation is suspected, hold the next dose until it has been assessed",
      why: "Carrying on while the cause is unknown risks making a drug injury worse.",
      source: "label-ribociclib",
      quote: "In patients who have new or worsening respiratory symptoms suspected to be due to ILD or pneumonitis, interrupt KISQALI immediately and evaluate the patient.",
    },
    {
      action: "Measure oxygen saturation and breathing rate, and confirm a low reading with an arterial blood gas",
      why: "A fall in oxygen level, particularly against the person's own baseline, separates a scan-only finding from one that needs urgent treatment.",
      source: "conte-esmo-2022",
      quote: "When DIILD is suspected, vital signs should be routinely monitored, particularly the respiratory rate to detect tachypnoea and oxygen saturation by pulse oximetry (SpO2), the latter being extremely relevant in patients with dyspnoea.",
    },
    {
      action: "Arrange a high-resolution CT scan of the chest straight away",
      why: "A CT shows inflammation that a plain X-ray misses and shows how much of the lung is involved.",
      source: "conte-esmo-2022",
      quote: "HRCT is recommended immediately after the medical examination.",
    },
    {
      action: "Exclude infection, cancer progression, radiation pneumonitis and fluid overload before settling on the drug as the cause",
      why: "These look alike on a scan and need opposite treatments: steroids help drug inflammation and can worsen an untreated infection.",
      source: "label-abemaciclib",
      quote: "Infectious, neoplastic, and other causes for such symptoms should be excluded by means of appropriate investigations.",
    },
    {
      action: "Involve a lung specialist, and consider bronchoscopy with lavage when the diagnosis is unclear or there is no improvement",
      why: "Washings from the lung can find an infection, bleeding or cancer spread that a scan cannot tell apart from drug injury.",
      source: "conte-esmo-2022",
      quote: "BAL should be considered when there is a lack of clinical improvement on withdrawal of the causative drug, despite corticosteroid therapy, or when the differential diagnosis is inconclusive.",
    },
    {
      action: "Grade 1 (scan changes, no symptoms) on trastuzumab deruxtecan or datopotamab deruxtecan: withhold the drug until the scan has cleared and consider steroids",
      why: "On these drugs even a symptomless case can progress, so the label pauses treatment; if the scan clears, treatment can restart.",
      source: "label-trastuzumab-deruxtecan",
      quote: "For asymptomatic (Grade 1) ILD, consider corticosteroid treatment (e.g., ≥0.5 mg/kg/day prednisolone or equivalent). Withhold ENHERTU until recovery",
    },
    {
      action: "Grade 1 on everolimus: continue at the same dose and keep watching",
      why: "With everolimus, scan changes without symptoms are common and often do not progress.",
      source: "label-everolimus",
      quote: "Continue AFINITOR/AFINITOR DISPERZ without dose alteration in patients who develop radiological changes suggestive of non-infectious pneumonitis and have few or no symptoms.",
    },
    {
      action: "On osimertinib, stop the drug permanently once lung inflammation is confirmed, at any grade, unless it follows recent chemoradiotherapy",
      why: "Lung inflammation from this drug can be fatal, and the label does not allow a restart outside that one setting.",
      source: "label-osimertinib",
      quote: "Permanently discontinue TAGRISSO if ILD/pneumonitis is confirmed",
    },
    {
      action: "Grade 2 or higher (any symptoms) on trastuzumab deruxtecan or datopotamab deruxtecan: stop the drug permanently",
      why: "Once there are symptoms the risk of a severe or fatal recurrence is judged too high to restart.",
      source: "label-trastuzumab-deruxtecan",
      quote: "Permanently discontinue ENHERTU in all patients with Grade 2 or higher ILD/pneumonitis.",
    },
    {
      action: "For symptomatic inflammation start prednisolone at 1 mg/kg a day or more without delay, continue for at least 14 days, then reduce slowly over at least 4 weeks",
      why: "Steroids calm the inflammation; reducing them too fast can bring it back.",
      source: "label-trastuzumab-deruxtecan",
      quote: "In cases of symptomatic ILD (Grade 2 or greater), promptly initiate systemic corticosteroid treatment (e.g., ≥1 mg/kg/day prednisolone or equivalent) and continue for at least 14 days followed by gradual taper for at least 4 weeks.",
    },
    {
      action: "On abemaciclib, withhold for grade 2 that persists or recurs and restart one dose lower; stop permanently at grade 3 or 4",
      why: "Milder cases on CDK4/6 inhibitors often settle with a pause; severe ones can be fatal.",
      source: "label-abemaciclib",
      quote: "Withhold or reduce dose for patients who develop persistent or recurrent Grade 2 ILD or pneumonitis. Permanently discontinue VERZENIO in all patients with Grade 3 or 4 ILD or pneumonitis",
    },
    {
      action: "Grade 3 or 4: admit, give oxygen, and give methylprednisolone 1 to 2 mg/kg a day; if there is no improvement in 48 to 72 hours, consider a second immunosuppressant",
      why: "Severe lung inflammation can progress to respiratory failure within days.",
      source: "conte-esmo-2022",
      quote: "In grade 3 DIILD, the timely and definitive discontinuation of the anticancer drug and the initiation of corticosteroid therapy at 1-2 mg/kg/day of methylprednisolone or equivalent are essential.",
    },
    {
      action: "Repeat the CT about 2 weeks after diagnosis, sooner or later as the person's course dictates",
      why: "The scan shows whether treatment is working and, for some drugs, whether treatment may restart.",
      source: "conte-esmo-2022",
      quote: "A follow-up CT scan should be repeated 2 weeks after the initial diagnosis of DIILD, although the time interval can be adjusted depending on the patient’s overall clinical course.",
    },
  ],
  bestInClass: {
    statement: "Teaching and prompt reporting of symptoms, an immediate hold and high-resolution CT on suspicion, exclusion of infection and progression, and then the product label's rule for the grade. The labels do not agree, and all are shown. At grade 1: deruxtecan conjugates are withheld until resolved with steroids considered; everolimus, abemaciclib and ribociclib continue; osimertinib, sotorasib and olaparib stop once ILD is confirmed (osimertinib may continue at grade 1 after chemoradiotherapy). At grade 2: deruxtecan conjugates stop permanently; everolimus, abemaciclib and ribociclib may resume at a lower dose after recovery. The expert opinion of Conte and colleagues (funded by Daiichi Sankyo and AstraZeneca; ungraded) advises stopping the causative drug at grade 1 in general, allows continuation in selected cases for mTOR inhibitors and, by its authors' own opinion, tyrosine kinase inhibitors, which is more permissive than the osimertinib label, and says steroids are not generally needed at grade 1, where the trastuzumab deruxtecan label says to consider them. No randomised trial compares any of these rules.",
    sources: ["label-trastuzumab-deruxtecan", "label-datopotamab-deruxtecan", "label-osimertinib", "label-abemaciclib", "label-ribociclib", "label-everolimus", "label-sotorasib", "label-olaparib", "conte-esmo-2022"],
  },
  variants: [
    {
      name: "Grade 1 (no symptoms): hold, continue or stop, by drug",
      differs: "Trastuzumab deruxtecan and datopotamab deruxtecan: withhold until resolved to grade 0; same dose if resolved in 28 days or less, one dose level lower if longer; consider corticosteroids. Everolimus: continue without dose alteration. Abemaciclib: no dosage modification at grade 1 or 2. Ribociclib: no interruption; start appropriate medical therapy and monitor. Osimertinib: permanently discontinue if confirmed; after recent definitive platinum-based chemoradiotherapy, withhold or continue at grade 1 as clinically indicated. Sotorasib: withhold if suspected, permanently discontinue if confirmed and no other cause is found. Olaparib: interrupt if suspected, discontinue if confirmed.",
      evidence: "Regulatory labels, each from its own trials. The everolimus label notes that imaging appears to overestimate the incidence of clinical pneumonitis. Conte and colleagues say that no robust scientific evidence is available to guide the decision to continue at grade 1.",
      sources: ["label-trastuzumab-deruxtecan", "label-datopotamab-deruxtecan", "label-everolimus", "label-abemaciclib", "label-ribociclib", "label-osimertinib", "label-sotorasib", "label-olaparib", "conte-esmo-2022"],
    },
    {
      name: "Grade 2 and above: permanent stop or a lower dose, by drug",
      differs: "Deruxtecan conjugates: permanently discontinue at grade 2 or higher. Osimertinib: permanently discontinue at grade 2 or higher in every setting. Everolimus: withhold at grade 2 until grade 0 or 1 and resume at 50% of the previous dose, stopping if there is no improvement within 4 weeks; the same at grade 3, stopping if grade 3 recurs; stop at grade 4. Abemaciclib: withhold for grade 2 that does not resolve within 7 days with maximal supportive measures, or recurs, and resume at the next lower dose; discontinue at grade 3 or 4. Ribociclib: interrupt at grade 2 until grade 1 or less and consider the next lower dose, stopping if grade 2 recurs; discontinue at grade 3 or 4.",
      evidence: "Regulatory labels. Conte and colleagues (ungraded expert opinion, funded by Daiichi Sankyo and AstraZeneca) say rechallenge after grade 2 may be considered for mTOR inhibitors and most targeted agents after complete resolution, but not for trastuzumab deruxtecan.",
      sources: ["label-trastuzumab-deruxtecan", "label-datopotamab-deruxtecan", "label-osimertinib", "label-everolimus", "label-abemaciclib", "label-ribociclib", "conte-esmo-2022"],
    },
    {
      name: "Steroid dose and length",
      differs: "Trastuzumab deruxtecan and datopotamab deruxtecan labels: consider prednisolone 0.5 mg/kg/day or more at grade 1; 1 mg/kg/day or more at grade 2 or higher for at least 14 days, then a taper over at least 4 weeks. Conte and colleagues: steroids not generally needed at grade 1 (0.5 mg/kg/day of prednisone if judged appropriate, as with trastuzumab deruxtecan); prednisone 1 to 2 mg/kg/day at grade 2, tapered over 4 to 6 weeks; methylprednisolone 1 to 2 mg/kg/day at grade 3 with a taper after 8 to 12 weeks; at grade 4 intravenous methylprednisolone 2 mg/kg/day or a pulse of 500 to 1000 mg/day for 3 days. Everolimus label: corticosteroids may be indicated until symptoms resolve, with Pneumocystis prophylaxis while they are given. The other labels read give no steroid dose.",
      evidence: "No controlled trial of steroid dose or duration in drug-induced ILD was cited by any source read. Conte and colleagues state that the efficacy of corticosteroids is not clearly established.",
      sources: ["label-trastuzumab-deruxtecan", "label-datopotamab-deruxtecan", "label-everolimus", "conte-esmo-2022"],
    },
    {
      name: "Restarting trastuzumab deruxtecan after grade 1",
      differs: "The label allows a restart once a grade 1 event has resolved to grade 0. Not everyone is restarted in practice.",
      evidence: "A pooled analysis of nine trials (Rugo and colleagues 2025, abstract read; funders listed as AstraZeneca and Daiichi Sankyo): of 193 patients with a grade 1 event, 45 (23.3%) were retreated; ILD came back in 15 (33.3%), all grade 1 or 2, at a median of 64 days. Uncontrolled, and the retreated patients were selected.",
      sources: ["label-trastuzumab-deruxtecan", "rugo-2025"],
    },
    {
      name: "Osimertinib after chemoradiotherapy",
      differs: "For people who have had recent definitive platinum-based chemoradiotherapy, the label allows osimertinib to be continued, or interrupted and restarted, at grade 1; everyone else stops permanently once ILD is confirmed.",
      evidence: "In the LAURA study ILD or pneumonitis, including radiation pneumonitis, was reported in 56% of 143 patients on osimertinib and 38% of 73 on placebo; of 46 patients rechallenged, 11% had a recurrence (label).",
      sources: ["label-osimertinib"],
    },
  ],
  grades: [
    { claim: "Trastuzumab deruxtecan: permanent stop at grade 2 or higher (boxed warning)", grade: "Regulatory label; not graded", source: "label-trastuzumab-deruxtecan", quote: "Permanently discontinue ENHERTU in all patients with Grade 2 or higher ILD/pneumonitis." },
    { claim: "Datopotamab deruxtecan: withhold on suspicion, permanent stop if grade 2 or higher is confirmed", grade: "Regulatory label; not graded", source: "label-datopotamab-deruxtecan", quote: "Withhold DATROWAY in patients with suspected ILD/pneumonitis and permanently discontinue DATROWAY if ≥Grade 2 ILD/pneumonitis is confirmed" },
    { claim: "Osimertinib after chemoradiotherapy: grade 1 may continue or be interrupted and restarted", grade: "Regulatory label; not graded", source: "label-osimertinib", quote: "For patients who have received recent definitive platinum-based chemoradiation therapy with Grade 1 ILD/pneumonitis continue TAGRISSO or interrupt and restart, as appropriate." },
    { claim: "Everolimus: withhold or stop for grade 2 to 4, with Pneumocystis prophylaxis when steroids are needed", grade: "Regulatory label; not graded", source: "label-everolimus", quote: "Administer prophylaxis for PJP when concomitant use of corticosteroids or other immunosuppressive agents are required." },
    { claim: "Ribociclib: no interruption at grade 1", grade: "Regulatory label; not graded", source: "label-ribociclib", quote: "No dose interruption or adjustment is required. Initiate appropriate medical therapy and monitor as clinically indicated." },
    { claim: "Sotorasib: withhold on suspicion, stop permanently if no other cause is found", grade: "Regulatory label; not graded", source: "label-sotorasib", quote: "Withhold LUMAKRAS if ILD/pneumonitis is suspected." },
    { claim: "Olaparib: interrupt on suspicion, discontinue if confirmed", grade: "Regulatory label; not graded", source: "label-olaparib", quote: "If pneumonitis is confirmed, discontinue Lynparza treatment and treat the patient appropriately." },
    { claim: "At grade 1, continuation can be considered for mTOR inhibitors and, in the authors' opinion, tyrosine kinase inhibitors; antibody-drug conjugates should be stopped until resolution", grade: "Expert opinion; not graded (funded by Daiichi Sankyo and AstraZeneca)", source: "conte-esmo-2022", quote: "Specifically, continuation can be considered for ICIs and mTOR inhibitors (and also tyrosine kinase inhibitors by our expert opinion), whereas ADCs such as T-DXd should be discontinued until resolution." },
    { claim: "Steroids are not generally needed at grade 1", grade: "Expert opinion; not graded (funded by Daiichi Sankyo and AstraZeneca)", source: "conte-esmo-2022", quote: "The efficacy of corticosteroids is not clearly established, given the widespread practice of discontinuing the pneumotoxic drug when starting steroid therapy." },
    { claim: "Treatment need not wait for every other cause to be excluded in severe cases", grade: "Expert opinion; not graded (funded by Daiichi Sankyo and AstraZeneca)", source: "conte-esmo-2022", quote: "Since early treatment of DIILD is critical for improved outcome, a definitive diagnosis (by means of exclusion of all the alternative aetiologies) is not always mandatory before the start of steroid treatment, especially in severe cases (grade 3 and 4)." },
    { claim: "Too fast a steroid taper can reactivate the disease", grade: "Expert opinion; not graded (funded by Daiichi Sankyo and AstraZeneca)", source: "conte-esmo-2022", quote: "Early interruption of steroid treatment or an excessively fast tapering may reactivate the disease." },
    { claim: "Most first events on trastuzumab deruxtecan come in the first 12 months", grade: "Pooled analysis of trials; not graded (supported by AstraZeneca and Daiichi Sankyo)", source: "powell-2022", quote: "Overall, 87.0% (154/177) had a first adjudicated drug-related ILD/pneumonitis event within 12 months of starting T-DXd" },
    { claim: "ILD recurred in a third of patients retreated with trastuzumab deruxtecan after grade 1, all grade 1 or 2", grade: "Pooled analysis of trials; not graded (funders listed as AstraZeneca and Daiichi Sankyo)", source: "rugo-2025", quote: "ILD recurred in one-third of patients; all recurrence events were grade 1/2 and manageable using existing treatment guidelines." },
  ],
  sources: [
    {
      key: "conte-esmo-2022",
      label: "Drug-induced interstitial lung disease during cancer therapies: expert opinion on diagnosis and treatment (funded by Daiichi Sankyo and AstraZeneca)",
      publisher: "ESMO Open (Conte et al.; a panel of 14 Italian experts, not an ESMO guideline; publication, workshops and medical writing funded by Daiichi Sankyo S.p.A. and AstraZeneca S.p.A.)",
      year: 2022,
      url: "https://doi.org/10.1016/j.esmoop.2022.100404",
      doi: "10.1016/j.esmoop.2022.100404",
      gradingScheme: "Expert opinion from a literature review and panel meetings; no levels of evidence or grades are printed.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "powell-2022",
      label: "Pooled analysis of drug-related interstitial lung disease and/or pneumonitis in nine trastuzumab deruxtecan monotherapy studies (supported by AstraZeneca and Daiichi Sankyo)",
      publisher: "ESMO Open (Powell et al.; supported by AstraZeneca and Daiichi Sankyo, medical writing funded by AstraZeneca)",
      year: 2022,
      url: "https://doi.org/10.1016/j.esmoop.2022.100554",
      doi: "10.1016/j.esmoop.2022.100554",
      gradingScheme: "A pooled analysis of trial data; not graded.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "swain-2022",
      label: "Multidisciplinary clinical guidance on trastuzumab deruxtecan (T-DXd)-related interstitial lung disease/pneumonitis: focus on proactive monitoring, diagnosis, and management",
      publisher: "Cancer Treatment Reviews (Swain et al.; Europe PMC lists AstraZeneca among the funders; the paper's own funding statement was not read)",
      year: 2022,
      url: "https://doi.org/10.1016/j.ctrv.2022.102378",
      doi: "10.1016/j.ctrv.2022.102378",
      gradingScheme: "Not graded, as far as the abstract shows.",
      read: "abstract",
      accessed: "2026-11-16",
    },
    {
      key: "rugo-2025",
      label: "Pooled analysis of trastuzumab deruxtecan retreatment after recovery from grade 1 interstitial lung disease/pneumonitis",
      publisher: "Annals of Oncology (Rugo et al.; Europe PMC lists AstraZeneca and Daiichi Sankyo as funders)",
      year: 2025,
      url: "https://doi.org/10.1016/j.annonc.2025.07.015",
      doi: "10.1016/j.annonc.2025.07.015",
      gradingScheme: "A pooled analysis of trial data; not graded.",
      read: "abstract",
      accessed: "2026-11-16",
    },
    { key: "label-trastuzumab-deruxtecan", label: "Enhertu (fam-trastuzumab deruxtecan-nxki) for injection: US prescribing information", publisher: "Daiichi Sankyo, on DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=7e67e73e-ddf4-4e4d-8b50-09d7514910b6", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-16" },
    { key: "label-datopotamab-deruxtecan", label: "Datroway (datopotamab deruxtecan) for injection: US prescribing information", publisher: "Daiichi Sankyo, on DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=2950227c-6230-4ca4-a135-46e44d9424a0", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-16" },
    { key: "label-osimertinib", label: "Tagrisso (osimertinib) tablets: US prescribing information", publisher: "AstraZeneca, on DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=5e81b4a7-b971-45e1-9c31-29cea8c87ce7", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-16" },
    { key: "label-abemaciclib", label: "Verzenio (abemaciclib) tablets: US prescribing information", publisher: "Eli Lilly, on DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=be4bc0de-0fdc-4d46-8d25-be43c79e6a06", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-16" },
    { key: "label-ribociclib", label: "Kisqali (ribociclib) tablets: US prescribing information", publisher: "Novartis, on DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=aaeaef94-f3f5-4367-8ea2-b181d7be2da8", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-16" },
    { key: "label-everolimus", label: "Afinitor and Afinitor Disperz (everolimus): US prescribing information", publisher: "Novartis, on DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=2150f73a-179b-4afc-b8ce-67c85cc72f04", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-16" },
    { key: "label-sotorasib", label: "Lumakras (sotorasib) tablets: US prescribing information", publisher: "Amgen, on DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=c80a362c-7ac3-4894-a076-0691e68ef8c1", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-16" },
    { key: "label-olaparib", label: "Lynparza (olaparib) tablets: US prescribing information", publisher: "AstraZeneca, on DailyMed (US National Library of Medicine)", year: 2025, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=741ff3e3-dc1a-45a6-84e5-2481b27131aa", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-16" },
  ],
  drugs: ["trastuzumab-deruxtecan", "datopotamab-deruxtecan", "osimertinib", "abemaciclib", "ribociclib", "everolimus", "sotorasib", "olaparib"],
  terms: ["ild", "pneumonitis", "radiation-pneumonitis", "ctcae-grading"],
  related: ["irae-pneumonitis", "pneumocystis-pneumonia-prophylaxis", "ild-overlap-caution", "methylprednisolone"],
  upgrades: [],
  gaps: [
    "No graded guideline on drug-induced ILD from targeted drugs or antibody-drug conjugates was read. The one management paper read in full (Conte and colleagues, ESMO Open 2022) is the ungraded opinion of an Italian expert panel, paid for by Daiichi Sankyo and AstraZeneca, the companies that market trastuzumab deruxtecan, with an employee of each thanked for contributing to the conception and design of the work.",
    "The multidisciplinary guidance for trastuzumab deruxtecan (Swain and colleagues, 2022) was read as an abstract only: the publisher returned 403 to a script and Europe PMC holds no full text. Its schedule for routine CT scans during treatment is therefore not given here, and no label read sets one. How often to scan a person with no symptoms is not settled by anything read in full.",
    "Steroid dose and duration rest on label wording ('e.g.') and expert opinion. Conte and colleagues state that the efficacy of corticosteroids is not clearly established, and no source read cites a controlled trial.",
    "At grade 1 the sources disagree and none rests on a comparison: the trastuzumab deruxtecan label withholds, the everolimus and CDK4/6 inhibitor labels continue, the osimertinib label stops permanently outside the chemoradiotherapy setting, while Conte and colleagues would allow selected continuation on tyrosine kinase inhibitors by their own opinion.",
    "Retreatment with trastuzumab deruxtecan after grade 1 was read as an abstract only (Rugo and colleagues 2025); the patients retreated were a selected 23.3%, and the analysis has manufacturer funders. There are no data read here on retreatment after grade 2, which the label forbids.",
    "Patritumab deruxtecan, ifinatamab deruxtecan and trastuzumab rezetecan record ILD in this corpus but no label or guideline covering them was read; they are not listed among this protocol's drugs. The other EGFR inhibitors (gefitinib, erlotinib, afatinib), palbociclib and the other PARP inhibitors were not read label by label.",
    "The Japanese Respiratory Society consensus on drug-induced lung injury and any ASCO guidance were not read. European product information was not read and may differ from the US labels.",
    "The risk factors for trastuzumab deruxtecan ILD come from one exploratory, manufacturer-funded pooled analysis whose authors say they need confirmation.",
  ],
});
