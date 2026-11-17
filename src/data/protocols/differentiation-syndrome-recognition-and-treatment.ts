import { protocol } from "./helpers";

/*
 * Recognising and treating differentiation syndrome on IDH inhibitors, gilteritinib, menin inhibitors, and tretinoin
 * (ATRA) or arsenic trioxide in acute promyelocytic leukaemia.
 *
 * What was read, and how (all on 16 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - US prescribing information, full text, from the DailyMed SPL XML service, tags stripped: Tibsovo (ivosidenib,
 *   setid 65d254c0-67ad-42c4-b972-ad463b755b2d), Idhifa (enasidenib, a5b4cdf0-3fa8-4c6c-80f6-8d8a00e3a5b6), Rezlidhia
 *   (olutasidenib, 4a0c7c8b-b95f-455d-9600-b7351e4397fe), Xospata (gilteritinib, b5ff59aa-9c0d-49a8-9053-1f179b482383),
 *   Revuforj (revumenib, 6eb3cdbc-0e74-477d-82d6-3bb172d3f63f), Komzifti (ziftomenib,
 *   b650f696-3391-4274-8b55-a5f5e9d04769), tretinoin capsules (Par, 9c4ae9d9-c2a0-4995-a27a-e3f0f0284db9) and Trisenox
 *   (arsenic trioxide, 101fc347-d0ad-4aee-8b06-9feb187fd741). All eight carry a boxed warning for the syndrome.
 * - Norsworthy et al., Clin Cancer Res 2020, the FDA's systematic analysis of the syndrome with ivosidenib and
 *   enasidenib: full text. Europe PMC's full-text service returned an error for this author manuscript, so the same
 *   manuscript (PMC7442588) was read from the NCBI E-utilities efetch service (db=pmc) as XML. The authors are FDA staff
 *   and report no financial interests.
 * - Sanz et al., Blood 2019, the European LeukemiaNet recommendations for acute promyelocytic leukaemia: full text.
 *   ashpublications.org returned 403 to a script and the Europe PMC and NCBI services hold only the abstract, so the
 *   free-access article page on PubMed Central (pmc.ncbi.nlm.nih.gov/articles/PMC6509567/) was fetched with curl and
 *   stripped to text. Grades are quoted as printed in its Table 1.
 * - Montesinos and Sanz, Mediterr J Hematol Infect Dis 2011, the PETHEMA group's review of the syndrome (open access):
 *   full text, Europe PMC full-text XML (PMC3248336). It restates the PETHEMA diagnostic criteria of Montesinos 2009.
 * - Brazilian consensus guidelines for acute promyelocytic leukaemia 2024 (de Figueiredo-Pontes et al., open access):
 *   full text, Europe PMC full-text XML (PMC11451342). The recommendations are not graded.
 * - Yilmaz, Kantarjian and Ravandi, Blood Cancer J 2021, treatment algorithms from MD Anderson (open access): full text,
 *   Europe PMC full-text XML (PMC8245494). A single-centre review, used only to show a differing position.
 * - Montesinos et al., Blood 2009, the PETHEMA series of 739 patients: abstract only (Europe PMC). The full paper is on
 *   ashpublications.org, which returned 403 to a script; no open full text was found.
 * - Döhner et al., Blood 2022, the European LeukemiaNet recommendations for AML in adults: abstract only (Europe PMC).
 *   The abstract does not mention differentiation syndrome and ashpublications.org returned 403 to a script. Named in
 *   sources; no step rests on it.
 * - NCCN guidelines for AML: behind a login, not read, not cited.
 *
 * Every DOI was resolved through Crossref or Europe PMC and its title checked. Quotes are copied from the raw text with
 * line breaks joined and nothing else changed. White cell thresholds are stated in prose because the superscript in
 * "x 10^9/L" does not survive conversion to text.
 *
 * Second reader, 17 November 2026. The eight labels were fetched again from the DailyMed SPL XML service (current
 * versions), and Norsworthy 2020 (NCBI E-utilities, db=pmc), Montesinos and Sanz 2011, the Brazilian consensus 2024 and
 * Yilmaz 2021 (Europe PMC full-text XML) were fetched again and read as text. The European LeukemiaNet APL 2019 text was
 * read from a copy of the PubMed Central page that another checker of this pass saved on 16 November 2026; Europe PMC's
 * full-text service returned an error for it and the page was not requested again. Montesinos 2009 and Döhner 2022 were
 * read again as abstracts; ashpublications.org returned 403 to one request each. Every quote was checked by script
 * against the saved text, with whitespace joined and nothing else changed. Changed on this pass: the restart rule
 * (revumenib resumes at grade 1 or lower, not grade 2, and olutasidenib after resolution), the claim that every label
 * gives the same steroid course, hydroxyurea and leukapheresis (they do not: see the summary), orders where the source
 * says "consider" (antibiotics), reasons in the why lines that no source read states, a derived fraction for
 * leukocytosis replaced by the printed percentages, and the patient advice, now worded as the labels word it. One
 * European LeukemiaNet quote was removed because its superscripts do not survive as text.
 */
export const differentiationSyndromeRecognitionAndTreatment = protocol({
  id: "differentiation-syndrome-recognition-and-treatment",
  name: "Differentiation syndrome on IDH, FLT3 and menin inhibitors and on tretinoin or arsenic trioxide: recognition and treatment",
  aka: ["differentiation syndrome", "DS", "retinoic acid syndrome", "ATRA syndrome", "IDH differentiation syndrome", "IDH-DS", "menin inhibitor differentiation syndrome", "APL differentiation syndrome", "dexamethasone 10 mg twice daily for differentiation syndrome"],
  domain: "emergencies",
  tldr: "Some leukaemia medicines work by making leukaemia cells mature. This can cause fever, breathlessness, fluid on the lungs, sudden weight gain, swelling, low blood pressure or kidney problems. This is differentiation syndrome. It is treated at once with a steroid such as dexamethasone and can be fatal if not treated. Call your team or go to the nearest emergency department right away.",
  simple: "A few leukaemia medicines can cause a reaction called differentiation syndrome, from the first days to months after starting. Signs include fever, a cough or being short of breath, quick weight gain, swollen arms or legs, and dizziness. It is treated with steroids straight away, and your team may monitor you in hospital. If you notice any of these, ring your team or go to the nearest emergency department right away.",
  summary: "Differentiation syndrome follows any drug that pushes myeloid blasts to mature: tretinoin and arsenic trioxide in acute promyelocytic leukaemia (APL), the IDH inhibitors ivosidenib, enasidenib and olutasidenib, the FLT3 inhibitor gilteritinib and the menin inhibitors revumenib and ziftomenib. All eight US labels carry a boxed warning. There is no diagnostic test. The PETHEMA criteria (two or more of dyspnoea, unexplained fever, weight gain above 5 kg, unexplained hypotension, acute renal failure, and pulmonary infiltrates or pleuropericardial effusion on imaging) were written for APL and were used by the FDA to re-read the ivosidenib and enasidenib trials, where they found the syndrome in 19% of patients on each drug against 11 to 14% reported, with a median onset of 20 and 19 days and leukocytosis present in 79% and 61% of cases, so not in all.\n\nTiming differs by class. In APL the median onset is 7 to 12 days with two peaks, in the first and third weeks. On IDH inhibitors it can start from day 1 and as late as 3 months (ivosidenib), 5 months (enasidenib) or 18 months (olutasidenib); on gilteritinib from day 1 to day 82; on revumenib a median of 9 days (range 3 to 41); on ziftomenib a median of 15 days (range 3 to 46).\n\nThe core of treatment is consistent across the sources: dexamethasone 10 mg every 12 hours started on suspicion (the labels and the ELN APL panel), without waiting for an abnormal chest radiograph (PETHEMA review), with haemodynamic monitoring (the labels). Seven of the eight labels set a minimum of 3 days of steroids; enasidenib's gives no minimum and says to taper only after symptoms resolve, and the ELN panel says steroids can be discontinued once the syndrome has resolved. Hydroxyurea for accompanying leukocytosis is on every label except gilteritinib's, which gives no rule for leukocytosis (the tretinoin label says to consider cytoreductive chemotherapy, including hydroxyurea). Leukapheresis 'if clinically indicated' is on the ivosidenib, revumenib and ziftomenib labels only, and is to be avoided in APL (ELN III-B). The FDA authors say empirical antibiotics are equally important to consider, because infection and the syndrome share signs and can be present together. The sources differ on when to stop the causative drug (at once on olutasidenib, ziftomenib and arsenic trioxide; only if severe signs persist beyond 48 hours of steroids on ivosidenib, gilteritinib and revumenib; only for severe syndrome in the ELN APL recommendations) and on steroid prophylaxis in APL (for adults with newly diagnosed low-risk APL on arsenic trioxide with tretinoin in the US label; optional and of uncertain value, by white count, in the ELN recommendations). The reader's own team's protocol comes first.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "patient-or-carer"],
    where: ["ward", "outpatient-clinic", "acute-oncology-service", "emergency-department", "telephone-triage", "intensive-care", "home"],
  },
  population: "Adults with acute myeloid leukaemia or myelodysplastic syndrome taking ivosidenib, enasidenib, olutasidenib, gilteritinib, revumenib or ziftomenib (revumenib is licensed for relapsed or refractory acute leukaemia with a KMT2A translocation as well as NPM1-mutated acute myeloid leukaemia), and adults with acute promyelocytic leukaemia on tretinoin (ATRA), arsenic trioxide or both. Revumenib is also licensed for children from 1 year, and its label gives a weight-based dexamethasone dose for children under 40 kg; the APL steps here are written for adults. The ELN recommendations have their own section on children, which is not summarised here, and children with APL follow their own protocols. Differentiation syndrome on other drugs (for example venetoclax combinations or quizartinib) is not covered because no source read here gives rules for it.",
  trigger: "A person on one of these medicines has new fever, breathlessness, low oxygen, weight gain, swelling, low blood pressure, a rising creatinine or new shadowing or fluid on chest imaging, with or without a rising white cell count.",
  steps: [
    {
      action: "Before starting a menin inhibitor, bring the white cell count below 25 x 10^9/L",
      why: "Both menin inhibitor labels (revumenib and ziftomenib) give this instruction within their differentiation syndrome warning. Neither states the reason.",
      source: "label-revumenib",
      quote: "Do not start REVUFORJ until the WBC is reduced to less than 25 Gi/L.",
    },
    {
      action: "Before the first dose, teach the patient and carer the warning signs and ask them to report any of them immediately",
      why: "The enasidenib label warns that the syndrome can start from 1 day and during the first 5 months of treatment and can be fatal if not treated. Its patient leaflet says to call the team or go to the nearest hospital emergency room right away.",
      source: "label-enasidenib",
      quote: "Ask patients to immediately report any symptoms suggestive of differentiation syndrome, such as fever, cough or difficulty breathing, bone pain, rapid weight gain or swelling of their arms or legs, to their healthcare provider for further evaluation",
    },
    {
      action: "Stay alert for the syndrome throughout treatment, not only in the first weeks, and again after any restart",
      why: "The labels record onset as late as 3 months (ivosidenib), 5 months (enasidenib) and 18 months (olutasidenib) after starting, and the FDA authors found repeat episodes in 12% and 15% of patients who had the syndrome.",
      source: "norsworthy-2020",
      quote: "It would be prudent to remain vigilant for DS throughout the course of therapy, particularly in patients with active disease and those who resume therapy following treatment interruption.",
    },
    {
      action: "Suspect the syndrome when two or more of these are present with no other explanation: breathlessness, fever, weight gain of more than 5 kg, low blood pressure, acute kidney injury, lung infiltrates or fluid around the lungs or heart",
      why: "There is no diagnostic test. These six signs are the criteria the PETHEMA group used in its large APL series and the FDA used when it re-read the IDH inhibitor trials. No single sign is enough, and other causes of the signs should be ruled out.",
      source: "montesinos-sanz-2011",
      quote: "based on the presence of at least two of the following signs and symptoms: dyspnea, unexplained fever, weight gain greater than 5 kg, unexplained hypotension, acute renal failure, and, particularly, a chest radiograph demonstrating pulmonary infiltrates or pleuropericardial effusion.",
    },
    {
      action: "Do not wait for a raised white cell count or an abnormal chest radiograph before treating",
      why: "Roughly 40 percent of people with the syndrome have a normal chest film at first, and the review says the white count should not be treated as a diagnostic criterion because the syndrome also develops without a rise in it.",
      source: "montesinos-sanz-2011",
      quote: "Treatment of DS should not be postponed until after having an abnormal chest radiograph since roughly 40 percent of patients with DS have a normal chest radiograph at presentation.",
    },
    {
      action: "Start dexamethasone 10 mg every 12 hours, intravenously or an equivalent steroid, as soon as the syndrome is suspected",
      why: "The labels say the syndrome can be fatal if not treated. In APL, the PETHEMA review reports that adding chemotherapy early and giving high-dose dexamethasone at the first sign appear to have reduced deaths from the syndrome from 30% to 5% or less in the most recent trials.",
      source: "label-gilteritinib",
      quote: "If differentiation syndrome is suspected, initiate dexamethasone 10 mg IV every 12 hours (or an equivalent dose of an alternative oral or IV corticosteroid) and hemodynamic monitoring until improvement.",
    },
    {
      action: "Start haemodynamic monitoring alongside steroids, and admit people with lung or kidney signs for close observation (recommended on the enasidenib label)",
      why: "The labels list low blood pressure and failure of the lungs, kidneys or several organs among the signs. Every label asks for haemodynamic monitoring; none defines what it consists of, and only the enasidenib label makes the recommendation about admission.",
      source: "label-enasidenib",
      quote: "Hospitalization for close observation and monitoring of patients with pulmonary and/or renal manifestation is recommended.",
    },
    {
      action: "Consider empirical antibiotics alongside steroids, and do not rule the syndrome out because an infection has been confirmed",
      why: "The signs overlap with those of infection, the two can be present together, and the FDA authors warn that delaying steroids could be life-threatening or fatal. They word this as something to consider, not as a rule.",
      source: "norsworthy-2020",
      quote: "Treatment with empirical antibiotics would be equally important to consider in patients with suspected DS.",
    },
    {
      action: "If the white cell count is raised without infection, start hydroxyurea; the ivosidenib, revumenib and ziftomenib labels also allow leukapheresis if clinically indicated",
      why: "The labels describe the syndrome as associated with rapid proliferation and differentiation of myeloid cells. Their thresholds differ: ivosidenib above 25 x 10^9/L or a rise of more than 15 x 10^9/L from baseline, enasidenib above 30 x 10^9/L, arsenic trioxide above 10 x 10^9/L. The enasidenib, olutasidenib and arsenic trioxide labels name hydroxyurea only, and the gilteritinib label gives no rule for leukocytosis.",
      source: "label-ivosidenib",
      quote: "If concomitant noninfectious leukocytosis is observed, initiate treatment with hydroxyurea or leukapheresis, as clinically indicated.",
    },
    {
      action: "In acute promyelocytic leukaemia, do not use leukapheresis to lower the white count",
      why: "APL causes a severe bleeding tendency, and the procedure can set off a fatal bleed.",
      source: "eln-apl-2019",
      quote: "Leukapheresis should be avoided due to risk of precipitating fatal hemorrhage",
      grade: "III–B",
    },
    {
      action: "Treat fluid overload with a diuretic such as furosemide, give oxygen, and escalate to ventilation or dialysis where needed",
      why: "The PETHEMA review calls these supportive measures crucial. In its trials 87% of patients with the syndrome needed diuretics, 26% mechanical ventilation and 12% dialysis.",
      source: "montesinos-sanz-2011",
      quote: "In the PETHEMA protocols, furosemide is usually administered to treat acute renal failure, peripheral and pulmonary edema, and weight gain.",
    },
    {
      action: "On olutasidenib, ziftomenib or arsenic trioxide, withhold the drug as soon as the syndrome is suspected",
      why: "These three labels tell the team to withhold the cause at once and resume it once the person has improved.",
      source: "label-ziftomenib",
      quote: "If differentiation syndrome is suspected, interrupt KOMZIFTI, initiate oral or intravenous corticosteroids (e.g., dexamethasone 10 mg every 12 hours) for a minimum of 3 days with hemodynamic and laboratory monitoring.",
    },
    {
      action: "On ivosidenib, gilteritinib or revumenib, continue the drug at first and interrupt it if severe signs persist more than 48 hours after steroids were started; on revumenib interrupt earlier for life-threatening signs",
      why: "These labels start steroids first and interrupt the drug only if severe signs persist. Enasidenib's label names the severe signs: lung symptoms needing intubation or ventilation, or kidney dysfunction.",
      source: "label-ivosidenib",
      quote: "If severe signs and/or symptoms persist for more than 48 hours after initiation of corticosteroids, interrupt TIBSOVO until signs and symptoms are no longer severe",
    },
    {
      action: "In acute promyelocytic leukaemia on tretinoin, with or without arsenic trioxide, give dexamethasone 10 mg intravenously twice daily at the earliest suspicion and stop tretinoin or arsenic only if the syndrome is severe (European LeukemiaNet); the US arsenic trioxide label withholds arsenic in every case",
      why: "The panel grades both statements IIa-B. The arsenic trioxide label also says to consider holding tretinoin if symptoms are severe, and the tretinoin label says to consider withholding it for moderate and severe syndrome. The labels and the panel differ, and local protocols follow one or the other.",
      source: "eln-apl-2019",
      quote: "Temporary discontinuation of differentiation therapy (ATRA or ATO) is indicated only in case of severe APL differentiation syndrome",
      grade: "IIa–B",
    },
    {
      action: "Continue steroids for at least 3 days and until signs and symptoms have resolved, then taper; restart them promptly if signs come back",
      why: "The labels warn that symptoms may recur if steroids, or hydroxyurea, are stopped too soon. The enasidenib label sets no minimum number of days.",
      source: "label-revumenib",
      quote: "Restart steroids promptly if DS recurs after tapering corticosteroids",
    },
    {
      action: "Restart an interrupted drug at the point its own label sets: grade 2 or lower on ivosidenib, enasidenib, gilteritinib and ziftomenib, grade 1 or lower on revumenib, and after resolution on olutasidenib",
      why: "The labels do not agree on the restart point. Arsenic trioxide resumes at half dose when the clinical condition improves and returns to the recommended dose after one week without recurrence; olutasidenib may resume at a reduced dose after a second episode.",
      source: "label-ivosidenib",
      quote: "Resume TIBSOVO when signs and symptoms improve to Grade 2 or lower.",
    },
    {
      action: "On enasidenib, check blood counts and blood chemistry for leukocytosis and tumour lysis syndrome before the first dose and at least every 2 weeks for at least the first 3 months, and manage any abnormality promptly",
      why: "The enasidenib label sets this schedule, and the ivosidenib label lists leukocytosis and tumour lysis syndrome among the events seen with differentiation syndrome. Other labels set their own monitoring schedules, which are not compared here.",
      source: "label-enasidenib",
      quote: "Assess blood counts and blood chemistries for leukocytosis and tumor lysis syndrome prior to the initiation of IDHIFA and monitor at a minimum of every 2 weeks for at least the first 3 months during treatment.",
    },
  ],
  bestInClass: {
    statement: "Dexamethasone 10 mg every 12 hours started on suspicion is stated by every label read (as the rule or as the example dose) and by the European LeukemiaNet APL recommendations (IIa-B). Every label adds haemodynamic monitoring, and seven of the eight set a minimum of 3 days of steroids (enasidenib's sets none); the ELN panel says only that steroids can be discontinued once the syndrome has resolved. Hydroxyurea for accompanying leukocytosis is on every label except gilteritinib's (the tretinoin label says to consider it). The FDA authors say empirical antibiotics are equally important to consider, and the PETHEMA review says not to wait for an abnormal chest radiograph. The sources differ on two points, and both sides are shown here. First, when to stop the causative drug: at once on suspicion (olutasidenib, ziftomenib and arsenic trioxide labels); only if severe signs persist more than 48 hours after steroids (ivosidenib, gilteritinib and revumenib labels; enasidenib for ventilation or kidney dysfunction beyond 48 hours); 'consider' for moderate and severe syndrome (tretinoin label); only if severe (ELN APL 2019, IIa-B; Brazilian consensus 2024). Second, steroid prophylaxis in APL: prednisone 0.5 mg/kg daily from day 1 to the end of induction for newly diagnosed low-risk APL on arsenic trioxide with tretinoin (US label); 'can be given' (ELN, IV-C), with the ungraded text adding that it can be considered above a white count of 5 to 10 x 10^9/L and that the benefit remains uncertain; used in trials and recommended for all newly diagnosed patients, particularly high-risk (as reported by the MD Anderson review); no prospective evidence, with some protocols using a white count above 5 x 10^3 per microlitre or a creatinine above 1.4 mg/dL (Brazilian consensus). No randomised trial has tested any of these choices.",
    sources: ["label-ivosidenib", "label-enasidenib", "label-olutasidenib", "label-gilteritinib", "label-revumenib", "label-ziftomenib", "label-tretinoin", "label-arsenic-trioxide", "eln-apl-2019", "brazil-apl-2024", "yilmaz-2021", "norsworthy-2020"],
  },
  variants: [
    {
      name: "Withhold the drug at once on suspicion",
      differs: "The olutasidenib, ziftomenib and arsenic trioxide labels interrupt the drug as soon as the syndrome is suspected, alongside dexamethasone. Ziftomenib resumes at the same dose once signs are grade 2 or lower; arsenic trioxide resumes at half dose when the clinical condition improves and returns to the recommended dose after a week without recurrence; olutasidenib resumes after resolution and may be resumed at a reduced dose if the syndrome recurs.",
      evidence: "Label rules from single-arm trials. On olutasidenib 19 of 25 patients with the syndrome recovered after treatment or interruption; on ziftomenib treatment was interrupted and resumed in 15 of 112 patients (13%) and stopped for good in 2.",
      sources: ["label-olutasidenib", "label-ziftomenib", "label-arsenic-trioxide"],
    },
    {
      name: "Continue the drug and interrupt only if severe signs persist after 48 hours of steroids",
      differs: "The ivosidenib, gilteritinib and revumenib labels start steroids and keep the drug going, interrupting only if severe signs last more than 48 hours (revumenib: or earlier for life-threatening signs such as needing a ventilator). Enasidenib interrupts for lung symptoms needing intubation or ventilation, or kidney dysfunction, that persist beyond 48 hours. Ivosidenib, enasidenib and gilteritinib resume at grade 2 or lower; revumenib resumes at the same dose at grade 1 or lower.",
      evidence: "Label rules from single-arm trials. In the FDA's analysis most adjudicated cases were moderate; 6% of cases on ivosidenib and 5% on enasidenib were fatal, and only one of the four fatal cases had been recognised and given steroids.",
      sources: ["label-ivosidenib", "label-gilteritinib", "label-revumenib", "label-enasidenib", "norsworthy-2020"],
    },
    {
      name: "APL: stop tretinoin or arsenic only for severe syndrome",
      differs: "The ELN panel and the Brazilian consensus keep tretinoin and arsenic trioxide going on dexamethasone and stop them only when the syndrome is severe (the Brazilian text: severe respiratory failure, renal failure or admission to intensive care). The tretinoin label says to consider withholding for moderate and severe syndrome. The arsenic trioxide label says to consider holding tretinoin if symptoms are severe. The MD Anderson review says tretinoin with arsenic trioxide should be held in severe syndrome, which it characterises as three or more clinical signs or symptoms. The Brazilian consensus also allows dexamethasone to be raised to 10 mg every 6 hours if there is no improvement after 24 hours.",
      evidence: "ELN grades this IIa-B. The PETHEMA review calls the question of stopping controversial and notes that in one trial era patients whose tretinoin was stopped for severe syndrome received less tretinoin and relapsed more often, which the authors offer as a possible explanation.",
      sources: ["eln-apl-2019", "brazil-apl-2024", "label-tretinoin", "label-arsenic-trioxide", "yilmaz-2021", "montesinos-sanz-2011"],
    },
    {
      name: "APL: steroid prophylaxis for everyone, or by white count, or not at all",
      differs: "The US arsenic trioxide label recommends prednisone 0.5 mg/kg daily from day 1 to the end of induction for patients having arsenic trioxide with tretinoin for newly diagnosed low-risk APL. ELN says prophylactic steroids can be given and can be considered when the white count is above 5 to 10 x 10^9/L at presentation or rises after tretinoin starts. The MD Anderson review says prophylactic steroids have been used in prospective trials and recommended for all newly diagnosed patients, particularly those with high-risk disease. The Brazilian consensus notes that some protocols give it for a white count above 5 x 10^3 per microlitre or a creatinine above 1.4 mg/dL.",
      evidence: "No prospective comparison. Across three PETHEMA trials the incidence of the syndrome was 30% with dexamethasone for a white count above 5 x 10^9/L, 23% with prednisone for all, and 28% with lower-dose dexamethasone for a white count above 5 x 10^9/L; the 2009 PETHEMA paper (abstract) reported a lower incidence of severe syndrome with prednisone for all than with selective dexamethasone, and the review found no reduction in deaths from the syndrome. ELN grades 'can be given' IV-C and states in its text that the value of prophylaxis remains unclear.",
      sources: ["label-arsenic-trioxide", "eln-apl-2019", "yilmaz-2021", "brazil-apl-2024", "montesinos-sanz-2011", "montesinos-2009"],
    },
    {
      name: "Adding rash to the criteria on FLT3 inhibitors",
      differs: "On gilteritinib the syndrome can come with a rash or acute febrile neutrophilic dermatosis (painful red skin lumps with fever), which the six PETHEMA criteria do not include.",
      evidence: "The gilteritinib label lists rash among the findings and notes that some cases had acute febrile neutrophilic dermatosis; the FDA authors suggest a rash criterion may be reasonable for FLT3 inhibitors. Not validated.",
      sources: ["label-gilteritinib", "norsworthy-2020"],
    },
  ],
  grades: [
    { claim: "APL: dexamethasone 10 mg intravenously twice daily at the earliest suspicion; steroids stopped and treatment recommenced once resolved", grade: "IIa–B", source: "eln-apl-2019", quote: "Corticosteroids (10 mg of dexamethasone IV twice daily) should be started immediately at the earliest clinical suspicion of incipient APL differentiation syndrome; once the syndrome has resolved, steroids can be discontinued and ATO/ATRA recommenced" },
    { claim: "APL: stop tretinoin or arsenic trioxide temporarily only for severe syndrome", grade: "IIa–B", source: "eln-apl-2019" },
    { claim: "APL: prophylactic corticosteroids are optional", grade: "IV–C", source: "eln-apl-2019", quote: "Prophylactic corticosteroids can be given, which may reduce the risk of APL differentiation syndrome" },
    { claim: "APL: the value of prophylactic steroids is unclear", grade: "Not graded (text)", source: "eln-apl-2019", quote: "Prophylactic corticosteroids to prevent differentiation syndrome have been used in some studies but the value of the use of steroids remains unclear." },
    { claim: "APL: avoid leukapheresis", grade: "III–B", source: "eln-apl-2019" },
    { claim: "APL: hydroxyurea 2 g a day, or idarubicin or gemtuzumab ozogamicin for extreme counts, can be considered when the white count rises after tretinoin or arsenic starts", grade: "IV–C", source: "eln-apl-2019" },
    { claim: "APL on arsenic trioxide with tretinoin: prednisone prophylaxis for all from day 1 to the end of induction", grade: "Regulatory label; not graded", source: "label-arsenic-trioxide", quote: "Differentiation syndrome prophylaxis consisting of prednisone 0.5 mg/kg daily from day 1 until the end of induction cycle with TRISENOX and tretinoin is recommended." },
    { claim: "Arsenic trioxide: withhold on suspicion, dexamethasone 10 mg intravenously every 12 hours for at least 3 days", grade: "Regulatory label; not graded", source: "label-arsenic-trioxide", quote: "If differentiation syndrome is suspected, temporarily withhold TRISENOX and immediately initiate dexamethasone 10 mg intravenously every 12 hours and hemodynamic monitoring until resolution of signs and symptoms for a minimum of 3 days" },
    { claim: "Tretinoin: dexamethasone until signs have abated for at least 3 days; consider withholding for moderate and severe syndrome", grade: "Regulatory label; not graded", source: "label-tretinoin", quote: "Consider withholding tretinoin capsules for moderate and severe differentiation syndrome until resolution" },
    { claim: "Olutasidenib: withhold on suspicion and give steroids for at least 3 days and until resolution", grade: "Regulatory label; not graded", source: "label-olutasidenib", quote: "If differentiation syndrome is suspected, temporarily withhold REZLIDHIA and initiate systemic corticosteroids (e.g., dexamethasone 10 mg IV every 12 hours) for a minimum of 3 days and until resolution of signs and symptoms." },
    { claim: "Enasidenib: interrupt for lung symptoms needing ventilation, or kidney dysfunction, lasting more than 48 hours after steroids", grade: "Regulatory label; not graded", source: "label-enasidenib", quote: "If severe pulmonary symptoms requiring intubation or ventilator support, and/or renal dysfunction persist for more than 48 hours after initiation of corticosteroids, interrupt IDHIFA until signs and symptoms are no longer severe" },
    { claim: "Revumenib: interrupt if severe signs persist beyond 48 hours of steroids, or earlier if life-threatening", grade: "Regulatory label; not graded", source: "label-revumenib", quote: "Interrupt REVUFORJ if severe signs and/or symptoms persist for more than 48 hours after initiation of systemic corticosteroids, or earlier if life-threatening symptoms occur such as pulmonary symptoms requiring ventilator support." },
    { claim: "APL: steroid prophylaxis has no prospective evidence", grade: "Not graded (consensus text)", source: "brazil-apl-2024", quote: "Steroids are used to prevent DS, but there is no prospective evaluation of this benefit." },
    { claim: "IDH inhibitors: the syndrome occurred in 19% of patients on each drug when standard criteria were applied", grade: "FDA pooled analysis of two single-arm trials; not graded", source: "norsworthy-2020", quote: "Both ivosidenib and enasidenib caused DS in 19% of patients, and grade ≥ 3 ARs were present in over half of cases; rare fatalities were observed." },
  ],
  sources: [
    { key: "label-ivosidenib", label: "Tibsovo (ivosidenib) tablets: US prescribing information, boxed warning, sections 2.3 and 5.1", publisher: "Servier Pharmaceuticals (DailyMed, US National Library of Medicine)", year: 2025, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=65d254c0-67ad-42c4-b972-ad463b755b2d", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "label-enasidenib", label: "Idhifa (enasidenib) tablets: US prescribing information, boxed warning, sections 2.3, 5.1 and 17, and medication guide", publisher: "Celgene, a Bristol Myers Squibb company (DailyMed, US National Library of Medicine)", year: 2025, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a5b4cdf0-3fa8-4c6c-80f6-8d8a00e3a5b6", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "label-olutasidenib", label: "Rezlidhia (olutasidenib) capsules: US prescribing information, boxed warning and section 5.1", publisher: "Rigel Pharmaceuticals (DailyMed, US National Library of Medicine)", year: 2025, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=4a0c7c8b-b95f-455d-9600-b7351e4397fe", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "label-gilteritinib", label: "Xospata (gilteritinib) tablets: US prescribing information, boxed warning and section 5.1", publisher: "Astellas Pharma US (DailyMed, US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b5ff59aa-9c0d-49a8-9053-1f179b482383", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "label-revumenib", label: "Revuforj (revumenib) tablets: US prescribing information (revised October 2025), boxed warning, sections 2 and 5.1", publisher: "Syndax Pharmaceuticals (DailyMed, US National Library of Medicine)", year: 2025, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=6eb3cdbc-0e74-477d-82d6-3bb172d3f63f", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "label-ziftomenib", label: "Komzifti (ziftomenib) capsules: US prescribing information, boxed warning, sections 2.5 and 5.1", publisher: "Kura Oncology (DailyMed, US National Library of Medicine)", year: 2025, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b650f696-3391-4274-8b55-a5f5e9d04769", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "label-tretinoin", label: "Tretinoin capsules: US prescribing information, boxed warning and sections 5.2 and 5.4", publisher: "Par Health USA (DailyMed, US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=9c4ae9d9-c2a0-4995-a27a-e3f0f0284db9", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "label-arsenic-trioxide", label: "Trisenox (arsenic trioxide) injection: US prescribing information, boxed warning, sections 2 and 5.1", publisher: "Cephalon; adverse reaction contact Teva Pharmaceuticals (DailyMed, US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=101fc347-d0ad-4aee-8b06-9feb187fd741", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "norsworthy-2020", label: "Differentiation syndrome with ivosidenib and enasidenib treatment in patients with relapsed or refractory IDH-mutated AML: a US Food and Drug Administration systematic analysis", publisher: "Clinical Cancer Research (Norsworthy et al., US Food and Drug Administration; authors report no commercial interests)", year: 2020, url: "https://doi.org/10.1158/1078-0432.CCR-20-0834", doi: "10.1158/1078-0432.CCR-20-0834", gradingScheme: "Regulatory pooled analysis of two single-arm trials; no recommendations graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "eln-apl-2019", label: "Management of acute promyelocytic leukemia: updated recommendations from an expert panel of the European LeukemiaNet", publisher: "Blood (Sanz et al., European LeukemiaNet; several authors declare honoraria or research funding from drug companies including Teva, whose name is on the Trisenox label)", year: 2019, url: "https://doi.org/10.1182/blood-2019-01-894980", doi: "10.1182/blood-2019-01-894980", gradingScheme: "Level of evidence Ia (meta-analysis of randomised trials) to IV (expert committee reports or opinion), then grade of recommendation A (needs at least one randomised trial) to C; printed as, for example, IIa–B.", read: "full-text", accessed: "2026-11-16" },
    { key: "montesinos-sanz-2011", label: "The differentiation syndrome in patients with acute promyelocytic leukemia: experience of the PETHEMA group and review of the literature", publisher: "Mediterranean Journal of Hematology and Infectious Diseases (Montesinos and Sanz)", year: 2011, url: "https://doi.org/10.4084/MJHID.2011.059", doi: "10.4084/MJHID.2011.059", gradingScheme: "Narrative review by the PETHEMA investigators; not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "brazil-apl-2024", label: "Diagnosis and management of acute promyelocytic leukemia: Brazilian consensus guidelines 2024 on behalf of the Brazilian Association of Hematology, Hemotherapy and Cellular Therapy", publisher: "Hematology, Transfusion and Cell Therapy (de Figueiredo-Pontes et al.; several authors declare speaker or advisory fees from drug companies)", year: 2024, url: "https://doi.org/10.1016/j.htct.2024.05.002", doi: "10.1016/j.htct.2024.05.002", gradingScheme: "Society consensus; recommendations are not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "yilmaz-2021", label: "Acute promyelocytic leukemia current treatment algorithms", publisher: "Blood Cancer Journal (Yilmaz, Kantarjian and Ravandi, MD Anderson Cancer Center)", year: 2021, url: "https://doi.org/10.1038/s41408-021-00514-3", doi: "10.1038/s41408-021-00514-3", gradingScheme: "Single-centre review; not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "montesinos-2009", label: "Differentiation syndrome in patients with acute promyelocytic leukemia treated with all-trans retinoic acid and anthracycline chemotherapy: characteristics, outcome, and prognostic factors", publisher: "Blood (Montesinos et al., PETHEMA)", year: 2009, url: "https://doi.org/10.1182/blood-2008-07-168617", doi: "10.1182/blood-2008-07-168617", gradingScheme: "Cohort analysis of two trials; not graded.", read: "abstract", accessed: "2026-11-17" },
    { key: "eln-aml-2022", label: "Diagnosis and management of AML in adults: 2022 recommendations from an international expert panel on behalf of the ELN", publisher: "Blood (Döhner et al., European LeukemiaNet)", year: 2022, url: "https://doi.org/10.1182/blood.2022016867", doi: "10.1182/blood.2022016867", read: "abstract", accessed: "2026-11-17" },
  ],
  drugs: ["ivosidenib", "enasidenib", "olutasidenib", "gilteritinib", "revumenib", "ziftomenib", "tretinoin-atra", "arsenic-trioxide"],
  cancers: [],
  terms: ["differentiation-syndrome", "tumor-lysis-syndrome"],
  related: ["tumour-lysis-syndrome-prevention-and-treatment", "hyperleukocytosis-leukostasis", "capillary-leak-syndrome-on-anticancer-drugs", "febrile-neutropenia-first-hour", "dexamethasone", "hydroxyurea"],
  upgrades: [],
  gaps: [
    "No randomised trial has tested any part of this: the steroid dose and duration, when to stop the causative drug, or prophylaxis. Every rule is a label instruction from single-arm trials or an expert recommendation.",
    "The PETHEMA criteria were written for APL on tretinoin. They have not been validated for IDH, FLT3 or menin inhibitors; the FDA applied them to ivosidenib and enasidenib after the event, and about half the cases its algorithm flagged were judged not to be the syndrome, often because of confirmed infection or a clinical course that did not fit.",
    "The sources disagree on stopping the causative drug (at once, after 48 hours of persistent severe signs, or only if severe) and on steroid prophylaxis in APL (for all, by white count, or of unclear value). Both sets of positions are shown; none rests on a comparative trial.",
    "The European LeukemiaNet 2022 recommendations for AML in adults (Döhner et al., Blood 2022) could be read as an abstract only: ashpublications.org returned 403 to a script and no open full text was found. On 17 November 2026 it returned 403 again. What they say about differentiation syndrome on IDH, FLT3 and menin inhibitors is not reported here.",
    "Montesinos et al., Blood 2009, the source of the PETHEMA criteria and the two-peak timing, was read as an abstract only; the criteria are quoted from the same group's open-access 2011 review. On 17 November 2026 ashpublications.org again returned 403 to a script, so the claim that prednisone for all gave a lower incidence of severe syndrome rests on the abstract.",
    "NCCN guidelines for AML sit behind a login and were not read.",
    "For the menin inhibitors the only sources read are the US labels. No independent guideline on their differentiation syndrome was found in open full text, and ziftomenib's label reports four deaths from the syndrome among 39 patients with KMT2A-rearranged AML, a group it is not approved for.",
    "None of the sources gives a rule for telling the syndrome from infection, heart failure, fluid overload or progressing leukaemia at the bedside, and the FDA authors note that infection and the syndrome can be present together. The labels do not say how to manage tumour lysis and differentiation syndrome when both occur.",
    "Children: only the revumenib label gives a paediatric steroid dose (dexamethasone 0.25 mg/kg every 12 hours under 40 kg). Paediatric APL guidance was not read.",
    "The labels do not agree on details that the first version of this page presented as uniform. On 17 November 2026 they read as follows: the enasidenib label sets no minimum length of steroid treatment; the gilteritinib label gives no instruction on leukocytosis, hydroxyurea or leukapheresis; leukapheresis appears only on the ivosidenib, revumenib and ziftomenib labels; and the restart point is grade 2 or lower on four labels, grade 1 or lower on revumenib and resolution on olutasidenib.",
    "Patient advice: the US patient leaflets say to call the healthcare provider or go to the nearest hospital emergency room right away. No UK patient page (NHS, Macmillan or Cancer Research UK) on differentiation syndrome was read, and no source read gives a time limit in hours.",
    "The European LeukemiaNet APL 2019 text was last fetched on 16 November 2026 (the PubMed Central page). Its Table 1 prints doses with superscripts that do not survive as text, so the recommendation on hydroxyurea is given without a quotation. No newer edition was found in Europe PMC or Crossref on 17 November 2026.",
    "What 'haemodynamic monitoring' consists of (how often, which measurements, when to move to intensive care) is not defined in any label read.",
  ],
});
