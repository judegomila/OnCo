import { protocol } from "./helpers";

/*
 * Changes in thinking, memory, mood and speech on lorlatinib, and cognitive effects on avapritinib: what the person
 * and family are told before starting, what is looked for, and the label rules for pausing, lowering or stopping the
 * medicine. The lipid and weight effects of lorlatinib are a separate record
 * (raised-lipids-and-weight-gain-on-lorlatinib-bexarotene-and-elacestrant), written in the same round; neither file
 * links the other in `related` because neither was registered when they were checked. The coordinator adds the links.
 *
 * What was read, and how (all on 18 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - Lorlatinib: the US label (Lorbrena, DailyMed SPL XML, set id 2b34d62d-e02a-4af3-bc0d-1571dd4ee76d, SPL version
 *   dated 26 June 2026, patient information revised January 2026) and the EU product information (Lorviqua, EMA PDF
 *   created 28 April 2026, pdftotext -layout; the PDF prints no revision date).
 * - Avapritinib: the US label (Ayvakit, DailyMed SPL XML, set id 645c887c-8cd4-4623-8da9-ac223d71a8b9, SPL version
 *   dated 20 October 2026; its patient information prints "Revised: November/2024") and the EU product information
 *   (Ayvakyt, EMA PDF created 5 November 2026).
 * - Bauer et al., "Clinical Management of Adverse Events Associated with Lorlatinib" (The Oncologist 2019): full
 *   text from the PubMed Central article page (PMC6693708; the Europe PMC full-text XML returned HTTP 500 twice).
 *   Its tables are images on that page and were not read. Three authors are Pfizer employees; medical writing was
 *   "funded by Pfizer Inc."
 * - Arriola et al., "Expert Consensus on the Management of Adverse Events of Lorlatinib..." (Clinical Drug
 *   Investigation 2024, a Spanish panel): Europe PMC full-text XML (PMC11338981). "This project was developed with
 *   funding from Pfizer"; medical writing funded by Pfizer. Its figure 4 (the neurological algorithm) is an image.
 * - Liu et al., "Kinetics and management of adverse events associated with lorlatinib after 5 years of follow-up in
 *   the CROWN study" (The Oncologist 2025): Europe PMC full-text XML (PMC12557321). "This study was sponsored by
 *   Pfizer"; the first draft was prepared with Pfizer's AI writing tool and medical writing was funded by Pfizer.
 * - Ardizzoni et al., "Lorlatinib atypical safety profile in ALK-positive aNSCLC: tips for management from an Italian
 *   expert panel" (Future Oncology 2026): Europe PMC full-text XML (PMC12867354). Funded by Pfizer; two authors
 *   were Pfizer employees and the other four were paid consultants to Pfizer for the manuscript.
 * - Not read: Liu et al., "A pragmatic guide for management of adverse events associated with lorlatinib" (Lung
 *   Cancer 2024) and the neurocognitive papers in J Thorac Oncol 2023 and Clin Lung Cancer 2024, none open access in
 *   Europe PMC; no management paper for avapritinib cognitive effects was found, so avapritinib rests on its labels.
 *
 * Editions checked: DOIs and titles were confirmed through the Europe PMC search API; a Europe PMC title search on
 * 18 November 2026 found the 2026 Italian paper among the newest lorlatinib management papers. Quotes are copied
 * from the raw text with line breaks joined and nothing else changed, and were checked by script.
 *
 * Second reader, 18 November 2026. The four labels, the Spanish, CROWN and Italian papers were fetched again with curl
 * into a separate folder and converted the same way; all seven texts were byte-identical to the writer's copies.
 * DailyMed's version history confirmed SPL version 13 (Lorbrena, published 29 June 2026) and version 16 (Ayvakit,
 * published 26 October 2026) as the current ones. The Lorviqua and Ayvakyt PDFs were converted with pdftotext both
 * with and without -layout and the dose tables read in both: the EU lorlatinib table has one row for grade 2 or
 * grade 3 and one for grade 4 and no grade 1 row. Bauer 2019 could not be fetched a second time (Europe PMC XML
 * returned HTTP 500 and the PubMed Central page answered with a reCAPTCHA challenge, which was not worked round), so
 * its claims were checked against the writer's copy saved the same day. The four DOIs were resolved through Crossref.
 * 117 claims checked: 3 wrong, 8 unsupported, 0 unverifiable; 32 quotes checked, all verbatim. Changed: the US
 * avapritinib cognitive rows are printed under "Patients with GIST or AdvSM" only, while the EU table covers all
 * three indications (the page had said the table was the same for all three); the EU median times to improvement
 * (15 and 9 weeks) are now shown beside the US ones (7.9 and 8.1 weeks); the bleeding step no longer requires a
 * change in mental state to come together with other symptoms; "straight away" in the patient text is now tied to
 * the EU lorlatinib leaflet, the only patient document that says it; the 2019 paper is described by what its
 * funding statement says (medical writing funded by Pfizer, three Pfizer employees among the authors) and not as
 * "Pfizer-funded"; "cites no trial" claims were replaced by what the passages show. Added: the Latin American expert
 * recommendations (Frontiers in Oncology, published 26 October 2026, Europe PMC full-text XML, PMC13746836,
 * "supported by Pfizer"), which say to continue at the current dose at grade 1; the Spanish panel's aim of avoiding
 * a dose reduction; and the CROWN paper's figures on prior brain radiotherapy.
 */
export const cognitiveAndMoodEffectsOnLorlatinibAndAvapritinib = protocol({
  id: "cognitive-and-mood-effects-on-lorlatinib-and-avapritinib",
  name: "Cognitive, mood and speech effects on lorlatinib, and cognitive effects on avapritinib",
  aka: [
    "CNS effects of lorlatinib",
    "lorlatinib brain fog",
    "memory problems on lorlatinib",
    "mood changes on lorlatinib",
    "hallucinations on lorlatinib",
    "cognitive effects of avapritinib",
    "memory impairment on avapritinib",
    "neurocognitive adverse events of ALK inhibitors",
  ],
  domain: "symptom-management",
  tldr: "Lorlatinib and avapritinib can affect memory, thinking and mood; lorlatinib can also change speech or cause hallucinations. These effects usually improve when the dose is paused or lowered, so tell your team about new forgetfulness, confusion, mood changes, thoughts of suicide, or seeing or hearing things that are not real. The EU lorlatinib leaflet says immediately. Family may notice first.",
  simple: "These two cancer medicines can make it harder to think or remember, and can change your mood. With lorlatinib some people speak more slowly or see or hear things that are not there. Pausing or lowering the dose usually helps. Ask the people close to you to say if they notice a change, and tell your team. The European leaflet for lorlatinib says to tell your doctor immediately. Your own team's plan comes first.",
  summary: "Lorlatinib: in the US label, central nervous system effects occurred in 52% of 476 patients (cognitive 28%, mood 21%, sleep 12%, speech 11%, psychotic 7%, seizures 1.9%), with a median time to first onset of 1.4 months; 2.1% stopped permanently for one, 10% paused and 8% had a dose reduction. The EU SmPC gives cognitive effects in 27.4%, mood 21.4%, speech 8.2% and psychotic effects 6.9%, and calls them generally mild, transient and reversible on dose delay or reduction. The reader's own team's protocol comes first.\n\nLorlatinib dose rules. US label: grade 1, continue at the same dose or withhold until recovery to baseline, then the same or a reduced dose; grade 2 or 3, withhold until grade 0 or 1 and resume at a reduced dose; grade 4, permanently discontinue. The EU SmPC has the same grade 2 or 3 and grade 4 rules and no grade 1 row; its definition does not include seizures or sleep. Dose levels are 75 mg and then 50 mg once daily.\n\nAvapritinib: cognitive adverse reactions occurred in 33% of 995 patients in the US label (41% of 601 with GIST). The US and EU grade rules match, though the US table prints them under GIST or advanced systemic mastocytosis and the EU table under all three indications: grade 1, continue at the same or a reduced dose, or pause until baseline or resolution; grade 2 or 3, pause until baseline, grade 1 or resolution, then the same or a reduced dose; grade 4, permanently discontinue. The EU SmPC adds that people with GIST or advanced systemic mastocytosis are monitored clinically and must notify their healthcare professional immediately. A change in mental state on avapritinib can also be a sign of bleeding in the brain, for which both labels stop the medicine for good.\n\nBeyond the labels, the advice for lorlatinib (preparing the person and family, looking for other causes, how early to interrupt, when to refer) comes from expert papers funded or supported by Pfizer, the maker of lorlatinib, or (the 2019 paper) written with Pfizer employees and Pfizer-funded medical writing. They differ on how early to interrupt: the Italian panel says as soon as effects emerge; the 2019 paper says to consider interrupting at grade 1; a Latin American panel says to continue at the current dose at grade 1; in the CROWN trial 58% of events needed, per protocol, no medical intervention.",
  asOf: "2026-11-18",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "patient-or-carer"],
    where: ["outpatient-clinic", "home", "telephone-triage", "community"],
  },
  population: "Adults taking lorlatinib (for ALK-positive lung cancer) or avapritinib (for gastrointestinal stromal tumour or systemic mastocytosis), whose US and EU labels were read. The expert papers concern lorlatinib only. The lorlatinib trials excluded people with severe acute or chronic psychiatric conditions, including recent or active suicidal ideation or behaviour (US label), so the figures may not describe them. Not covered: thinking and memory changes after chemotherapy or brain radiotherapy in general; delirium from other causes; neurological side effects of other medicines such as CAR T cells or ifosfamide; peripheral neuropathy; children.",
  trigger: "Starting lorlatinib or avapritinib (a conversation with the person and those close to them), then any new or worsening forgetfulness, confusion, difficulty finding words, slowed or slurred speech, change in mood or personality, hallucinations, or a seizure.",
  steps: [
    {
      action: "Before lorlatinib starts, discuss the possible effects on mood, thinking and speech with the person, and take particular care to review them with anyone who has an existing psychiatric condition",
      why: "The 2019 paper says these effects are temporary and reversible when the dose is interrupted or reduced. The CROWN paper adds that clear examples matter (people have described sluggish thought, fogginess, feeling flat or more irritable) because the term CNS adverse effects will be insufficient for most. The 2019 paper was written with Pfizer employees and its medical writing was funded by Pfizer; the CROWN study was sponsored by Pfizer.",
      source: "bauer-2019",
      quote: "Effects on mood should be discussed with patients before lorlatinib is administered. It is particularly important to review these effects with patients who have pre‐existing psychiatric conditions.",
    },
    {
      action: "Ask about psychiatric history before lorlatinib starts",
      why: "The Spanish panel (funded by Pfizer) says many of these events can also have other causes, among them existing psychiatric disease, and that it is therefore important to set out how to tell them apart both before and after treatment begins. It adds that the psychiatric symptoms of people already on psychiatric treatment should be closely monitored, and that lorlatinib reduces the effect of some antipsychotics.",
      source: "arriola-2024",
      quote: "The patient’s psychiatric history should be explored, and these possible events should be discussed with the patient before initiating treatment with lorlatinib.",
    },
    {
      action: "Encourage family members and carers, as well as the person, to report any change in mood during lorlatinib",
      why: "The paper's reason is that the person may be unaware of the change. The CROWN paper (sponsored by Pfizer) says care partners or family members will often notice these effects before the patient does, particularly when symptoms are subtle.",
      source: "bauer-2019",
      quote: "Caregivers and family members, as well as patients, should also be encouraged to report any changes in patients’ mood during treatment with lorlatinib in the event that patients are unaware of such changes.",
    },
    {
      action: "Advise the person on lorlatinib to tell their healthcare provider about new or worsening symptoms: problems with thinking, mood changes including thoughts of suicide, hallucinations, seizures, or changes in speech or sleep",
      why: "The US label says these effects can be severe and that the dose is withheld, reduced or stopped according to severity. The symptom list is the one in its patient information. The EU leaflet uses stronger words: tell your doctor immediately about speech problems, mental status changes, and mood or memory problems.",
      source: "us-lorbrena",
      quote: "Advise patients to notify their healthcare provider if they experience new or worsening CNS symptoms",
    },
    {
      action: "When symptoms appear on lorlatinib, look for other causes as well as the medicine: brain metastases, earlier brain radiotherapy or surgery, existing psychiatric illness, and other medicines that act on the brain, including any started recently",
      why: "The Spanish panel (funded by Pfizer) says many of the neurological events seen on lorlatinib can also be caused by these, and recommends reviewing new medicines and the person's psychiatric state. No source read says which tests or scans to do.",
      source: "arriola-2024",
      quote: "It is important to keep in mind that many of the neurological AEs detected in patients receiving lorlatinib can also be caused by other factors, including brain metastases, brain radiation, brain surgery, preexisting psychiatric disease, and other neurotropic medications, among others",
    },
    {
      action: "Lorlatinib, grade 1 effect (US label): continue at the same dose, or withhold until recovery to baseline, then resume at the same or a reduced dose",
      why: "This is the US label's row; it gives no reason for offering both courses. The EU SmPC has no grade 1 row. The expert papers pull both ways. The 2019 paper (Pfizer employees among its authors) says dose interruptions should be considered at grade 1, and the Italian panel (funded by Pfizer) goes further and says interruption should be carried out as soon as these effects emerge. The Latin American panel (supported by Pfizer) says treatment should continue at the current dose at grade 1.",
      source: "us-lorbrena",
      quote: "Continue at the same dose or withhold the dose until recovery to baseline. Resume LORBRENA at the same dose or at a reduced dose.",
    },
    {
      action: "Lorlatinib, grade 2 or grade 3 effect: withhold until grade 0 or 1, then resume at a reduced dose",
      why: "Both labels give this rule (the EU SmPC: withhold until grade 1 or less, then resume at one reduced dose level) and neither states a reason beside it. The EU SmPC describes these reactions as generally reversible on dose delay or reduction. The dose levels are 75 mg and then 50 mg once daily.",
      source: "us-lorbrena",
      quote: "Withhold dose until Grade 0 or 1. Resume LORBRENA at a reduced dose.",
    },
    {
      action: "Lorlatinib, grade 4 effect: stop lorlatinib for good",
      why: "Both labels say to permanently discontinue at grade 4, which the EU SmPC labels life-threatening or needing urgent intervention. Neither gives a further reason.",
      source: "ema-lorviqua",
      quote: "Permanently discontinue lorlatinib.",
    },
    {
      action: "If changing the lorlatinib dose does not improve the symptoms, refer to a psychiatrist or neurologist",
      why: "The Italian panel (funded by Pfizer; two authors Pfizer employees) gives this as its advice and says people with known risk factors (brain metastases, brain radiation, psychiatric illness, medicines acting on the brain) should be strictly monitored, without a figure in that passage. The CROWN paper (sponsored by Pfizer) puts referral more weakly: visiting a specialist may be helpful to manage other causes. On risk it says there are no clear predictive factors: these effects occurred in 67% of patients with prior brain radiotherapy and 41% of those without, with patient numbers too small to draw definitive conclusions.",
      source: "italy-2026",
      quote: "If lorlatinib dose modification does not result in CNS symptom improvement, patients should be referred to psychiatrists or neurologists",
    },
    {
      action: "Offer practical ways to lessen the effect on daily life, such as setting reminders; mindfulness, meditation and cognitive behavioural therapy may be useful",
      why: "The CROWN paper (sponsored by Pfizer) says these strategies may be useful, citing an earlier management guide that was not read for this page; it reports no trial of them. The 2019 paper also suggests advice such as setting reminders.",
      source: "crown-ae-2025",
      quote: "Nonpharmacological management strategies to minimize the impact of CNS AEs, such as setting reminders, mindfulness, meditation, and cognitive behavioral therapy, may be useful.",
    },
    {
      action: "Advise caution with driving and operating machines on lorlatinib; on avapritinib, advise not driving or operating hazardous machinery while cognitive effects are present",
      why: "The EU SmPC says lorlatinib has a moderate influence on the ability to drive because of these effects. The US avapritinib label tells prescribers to advise patients not to drive or operate hazardous machinery if they are experiencing cognitive adverse reactions; the EU avapritinib SmPC says such patients must take special care.",
      source: "ema-lorviqua",
      quote: "Caution should be exercised when driving or operating machines as patients may experience CNS effects",
    },
    {
      action: "On avapritinib for GIST or advanced systemic mastocytosis, watch at clinic visits for new or increased forgetfulness, confusion or difficulty with thinking (EU SmPC)",
      why: "The EU SmPC says the mechanism is not known, and that in clinical studies dose reductions or interruptions improved grade 2 or higher cognitive effects compared with no action. It says these patients must notify their healthcare professional immediately about new or worsening symptoms. The US label says to advise patients and caretakers to notify the healthcare provider, without the word immediately.",
      source: "ema-ayvakyt",
      quote: "It is recommended that patients with GIST or AdvSM are clinically monitored for signs and symptoms of cognitive events such as new or increased forgetfulness, confusion, and/or difficulty with cognitive functioning.",
    },
    {
      action: "Avapritinib for GIST or advanced systemic mastocytosis, grade 1 cognitive effect: continue at the same dose or a reduced dose, or withhold until improvement to baseline or resolution, then resume at the same or a reduced dose",
      why: "This is the US label's row, printed under the heading for patients with GIST or advanced systemic mastocytosis. The EU SmPC's row says the same and its heading also covers indolent systemic mastocytosis. The US label says cognitive adverse reactions were managed with dose interruption or reduction when needed; it gives no reason for choosing between the courses.",
      source: "us-ayvakit",
      quote: "Continue AYVAKIT at same dose or reduced dose or withhold until improvement to baseline or resolution. Resume at same dose or reduced dose.",
    },
    {
      action: "Avapritinib for GIST or advanced systemic mastocytosis, grade 2 or grade 3 cognitive effect: withhold until improvement to baseline, grade 1 or resolution, then resume at the same or a reduced dose",
      why: "Both labels give this rule. The EU SmPC notes that grade 2 or higher means an effect on activities of daily living. How long improvement takes differs by label: among people with a grade 2 or worse effect, the US label gives a median time to improvement to grade 1 or resolution of 7.9 weeks in GIST and 8.1 weeks in advanced systemic mastocytosis; the EU SmPC gives a median time to improvement of 15 weeks in GIST and 9 weeks in advanced systemic mastocytosis.",
      source: "us-ayvakit",
      quote: "Withhold AYVAKIT until improvement to baseline, Grade 1, or resolution. Resume at same dose or reduced dose.",
    },
    {
      action: "Avapritinib for GIST or advanced systemic mastocytosis, grade 4 cognitive effect: stop avapritinib for good",
      why: "Both labels say to permanently discontinue at grade 4 (the EU row also covers indolent systemic mastocytosis). Neither gives a further reason.",
      source: "us-ayvakit",
      quote: "Permanently discontinue AYVAKIT.",
    },
    {
      action: "On avapritinib, remember that a change in mental state, like headache, nausea, vomiting or vision changes, can be a symptom of bleeding in the brain: advise the person to seek immediate medical attention for signs or symptoms of it",
      why: "The US label lists altered mental status among the symptoms of intracranial haemorrhage, which occurred in 2.9% of 749 patients with GIST or advanced systemic mastocytosis in its trials, and says to stop avapritinib permanently if it occurs at any grade. The EU SmPC has the same stopping rule, and says people with severe headache, vision problems, somnolence or focal weakness must interrupt dosing and inform their healthcare professional immediately.",
      source: "us-ayvakit",
      quote: "Advise patients to seek immediate medical attention for signs or symptoms of intracranial hemorrhage.",
    },
  ],
  bestInClass: {
    statement: "No guideline with graded recommendations covers these effects. The firmest rules are the labels' dose tables, which the US and EU labels share for grade 2 to 4: for lorlatinib, withhold at grade 2 or 3 until grade 1 or less and resume at a reduced dose, and stop for good at grade 4; for avapritinib, withhold at grade 2 or 3 until baseline, grade 1 or resolution and resume at the same or a reduced dose, and stop for good at grade 4 (rows the US label prints for GIST and advanced systemic mastocytosis, and the EU SmPC for those and indolent systemic mastocytosis). They differ at grade 1 for lorlatinib (a US row allowing either continuing or withholding; no EU row). Everything else for lorlatinib comes from expert papers funded or supported by its maker, Pfizer, or written with its employees, and they pull in two directions on timing: the Italian panel says to interrupt as soon as these effects emerge, even if not particularly bothersome, and the 2019 paper says interruption should be considered at grade 1, while the Latin American panel says to continue at the current dose at grade 1, the CROWN paper reports that 58% of events in the trial needed, per protocol, no medical intervention, and the US label allows continuing at grade 1. Both are shown; this page does not choose. For avapritinib only the labels were found.",
    sources: ["us-lorbrena", "ema-lorviqua", "us-ayvakit", "ema-ayvakyt", "bauer-2019", "arriola-2024", "crown-ae-2025", "italy-2026", "latam-2026"],
  },
  variants: [
    {
      name: "Lorlatinib: US label against EU SmPC",
      differs: "Scope: the US label counts seizures, psychotic effects and changes in cognitive function, mood (including suicidal ideation), speech, mental status and sleep; the EU SmPC's dose row covers psychotic effects and changes in cognition, mood, mental status or speech. Grade 1: the US label has a row (continue, or withhold until baseline, then the same or a reduced dose); the EU SmPC has none. Grade 2 or 3 and grade 4: the same in both. What patients are told: the US patient information says to tell the healthcare provider; the EU leaflet says to tell the doctor immediately.",
      evidence: "Regulatory labels. US label: 52% of 476 patients had a CNS effect; 2.1% stopped permanently, 10% paused, 8% had a dose reduction. EU SmPC: median time to onset 129 days for cognitive, 57 for mood, 58 for speech and 27 for psychotic effects.",
      sources: ["us-lorbrena", "ema-lorviqua"],
    },
    {
      name: "How early to interrupt lorlatinib",
      differs: "Italian panel 2026: unlike other side effects, temporary interruption should be carried out as soon as these effects emerge, even if not particularly bothersome. Bauer 2019: interruptions should be considered at grade 1, and dose changes imposed at low thresholds are generally effective. US label: at grade 1, continue or withhold. Latin American panel 2026: at grade 1, treatment should continue at the current dose, and if this is not possible a lower dose should be considered. Spanish panel 2024: its recommendations, which include supportive treatments, should be used as soon as possible in an attempt to avoid reducing the dose. CROWN paper 2025: more than half (58%) of events in the trial did not, per protocol, require any medical intervention; it also says early interruption can lead to rapid reversal.",
      evidence: "Expert opinion and trial description; every paper was funded, sponsored or supported by Pfizer or (the 2019 paper) written with Pfizer employees. In the 2019 pooled analysis, 24 of 117 patients with these effects had a dose change and 15 of the 24 had resolution, with a median time to resolution of 12.5 days; in CROWN at 5 years 60% of events resolved overall.",
      sources: ["italy-2026", "bauer-2019", "us-lorbrena", "latam-2026", "arriola-2024", "crown-ae-2025"],
    },
    {
      name: "Avapritinib: US label against EU SmPC",
      differs: "The grade rules are the same; the US label says withhold where the EU SmPC says interrupt. Scope differs: the US table prints the cognitive rows under patients with GIST or advanced systemic mastocytosis, the EU table under GIST, advanced or indolent systemic mastocytosis. Dose levels: both give 300, then 200, then 100 mg once daily for GIST and 200, then 100, 50 and 25 mg once daily for advanced systemic mastocytosis; only the EU SmPC gives a reduction for indolent systemic mastocytosis (25 mg once daily to 25 mg every other day). The EU SmPC adds a footnote that grade 2 or higher means an impact on activities of daily living, asks for clinical monitoring of people with GIST or advanced systemic mastocytosis, and says they must notify their healthcare professional immediately; for indolent systemic mastocytosis it notes that cognitive effects can be a symptom of the disease itself and says to notify the healthcare professional, without the word immediately. On driving, the US label says not to drive while cognitive reactions are present; the EU SmPC says to take special care.",
      evidence: "Regulatory labels. US label: cognitive adverse reactions in 33% of 995 patients across indications; in GIST 41% of 601, with 2.7% stopping permanently, 13.5% pausing and 8.5% reducing the dose. EU SmPC: 33% of 585 patients with GIST. Median time to improvement of a grade 2 or worse effect: 7.9 weeks (GIST) and 8.1 weeks (advanced systemic mastocytosis) in the US label, 15 and 9 weeks in the EU SmPC.",
      sources: ["us-ayvakit", "ema-ayvakyt"],
    },
    {
      name: "Medicines for anxiety, low mood or psychosis during lorlatinib",
      differs: "The Spanish panel names choices by their interaction with lorlatinib: short or medium half-life benzodiazepines could be useful for anxiety, but antidepressants with an anxiolytic profile are advisable because benzodiazepines have a negative effect on cognition; the antidepressants of choice are duloxetine and agomelatine, with caution for several others; the effect of some antipsychotics will be reduced; and olanzapine is recommended for psychosis, mania or hallucinosis, because quetiapine and ziprasidone can interact with lorlatinib. The CROWN paper reports only that the medicines most often used in the trial were anxiolytics, antidepressants and antiepileptics. The labels name no medicine for these effects.",
      evidence: "Expert opinion reasoned from drug interactions (the panel points to its interaction table), in a Pfizer-funded paper; the passage reports no trial result for any of these medicines.",
      sources: ["arriola-2024", "crown-ae-2025"],
    },
  ],
  grades: [
    { claim: "Lorlatinib, US label: the range of CNS effects", grade: "Regulatory label; not graded", source: "us-lorbrena", quote: "These include seizures, psychotic effects and changes in cognitive function, mood (including suicidal ideation), speech, mental status, and sleep." },
    { claim: "Lorlatinib, US label: grade 4 is permanent discontinuation", grade: "Regulatory label; not graded", source: "us-lorbrena", quote: "Permanently discontinue LORBRENA." },
    { claim: "Lorlatinib, EU SmPC: generally mild, transient and reversible on dose delay or reduction", grade: "Regulatory label; not graded", source: "ema-lorviqua", quote: "were generally mild, transient, and reversible spontaneously upon dose delay and/or dose reduction" },
    { claim: "Lorlatinib, EU SmPC: dose modification or discontinuation may be required", grade: "Regulatory label; not graded", source: "ema-lorviqua", quote: "Dose modification or discontinuation may be required for those patients who develop CNS effects" },
    { claim: "2019 paper: consider interruption at grade 1", grade: "Expert consensus opinion; not graded (Pfizer employees among the authors; medical writing funded by Pfizer)", source: "bauer-2019", quote: "Dose interruptions should be considered in the presence of grade 1 CNS effects and enforced until recovery to baseline before restarting lorlatinib at the same dose or, if required, at a lower dose." },
    { claim: "2019 paper: patients and caregivers should be instructed to report changes", grade: "Expert consensus opinion; not graded (Pfizer employees among the authors; medical writing funded by Pfizer)", source: "bauer-2019", quote: "patients and their caregivers should be instructed to report any changes in cognitive function, mood, or speech to their health care provider" },
    { claim: "Italian panel: interrupt as soon as CNS effects emerge", grade: "Expert panel; not graded (funded by Pfizer; two authors Pfizer employees)", source: "italy-2026", quote: "Unlike other AEs, lorlatinib temporary interruption should be carried out as soon as CNS AEs emerge, even if not particularly bothersome." },
    { claim: "Latin American panel: continue at the current dose at grade 1", grade: "Expert recommendations; not graded (supported by Pfizer)", source: "latam-2026", quote: "In cases of grade 1 toxicity, treatment with lorlatinib should continue at the current dose. If this is not possible, a lower dose should be considered depending on the patient’s profile." },
    { claim: "CROWN paper: no clear predictive factors", grade: "Trial report with expert commentary; not graded (sponsored by Pfizer)", source: "crown-ae-2025", quote: "There are no clear predictive factors for CNS AEs." },
    { claim: "CROWN paper: more than half of CNS events needed no medical intervention", grade: "Trial report with expert commentary; not graded (sponsored by Pfizer)", source: "crown-ae-2025", quote: "The vast majority of CNS AEs were grade 1 or 2, and more than half (58%) of CNS AEs, per protocol, did not require any medical intervention." },
    { claim: "CROWN paper: a specialist visit may be helpful", grade: "Trial report with expert commentary; not graded (sponsored by Pfizer)", source: "crown-ae-2025", quote: "To potentially manage other causes of neurocognitive and psychiatric impairment, visiting a specialist (eg, neurologist, psychiatrist) may be helpful." },
    { claim: "Spanish panel: closely monitor the psychiatric symptoms of people already on psychiatric treatment", grade: "Expert consensus; not graded (funded by Pfizer)", source: "arriola-2024", quote: "If patients with psychiatric treatment are starting on lorlatinib, their psychiatric symptoms should be closely monitored." },
    { claim: "Spanish panel: antidepressants with an anxiolytic profile are advisable", grade: "Expert consensus; not graded (funded by Pfizer)", source: "arriola-2024", quote: "it is advisable to use antidepressants with an anxiolytic profile, especially because benzodiazepines have a negative effect on cognition" },
    { claim: "Avapritinib, EU SmPC: immediate notification for GIST and advanced systemic mastocytosis", grade: "Regulatory label; not graded", source: "ema-ayvakyt", quote: "Patients with GIST or AdvSM must notify their healthcare professional immediately if they experience new or worsening cognitive symptoms." },
    { claim: "Avapritinib, EU SmPC: indolent systemic mastocytosis, notify without the word immediately", grade: "Regulatory label; not graded", source: "ema-ayvakyt", quote: "Patients with ISM must notify their healthcare professional if they experience new or worsening cognitive symptoms." },
    { claim: "Avapritinib, EU SmPC: dose reductions or interruptions improved grade 2 or higher effects", grade: "Regulatory label; not graded", source: "ema-ayvakyt", quote: "dose reductions or interruptions improved Grade ≥2 cognitive effects compared to no action." },
    { claim: "Avapritinib, US label: not driving while cognitive reactions are present", grade: "Regulatory label; not graded", source: "us-ayvakit", quote: "Advise patients not to drive or operate hazardous machinery if they are experiencing cognitive adverse reactions" },
    { claim: "Avapritinib, US label: altered mental status among the symptoms of intracranial haemorrhage", grade: "Regulatory label; not graded", source: "us-ayvakit", quote: "Symptoms of intracranial hemorrhage may include headache, nausea, vomiting, vision changes, or altered mental status." },
    { claim: "Avapritinib, US label: stop permanently for intracranial haemorrhage of any grade", grade: "Regulatory label; not graded", source: "us-ayvakit", quote: "Permanently discontinue AYVAKIT if intracranial hemorrhage of any grade occurs" },
  ],
  sources: [
    { key: "us-lorbrena", label: "Lorbrena (lorlatinib) tablets: US prescribing information and patient information", publisher: "Pfizer, on DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=2b34d62d-e02a-4af3-bc0d-1571dd4ee76d", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "ema-lorviqua", label: "Lorviqua (lorlatinib): EU summary of product characteristics and package leaflet", publisher: "European Medicines Agency (marketing authorisation holder Pfizer)", year: 2026, url: "https://www.ema.europa.eu/en/documents/product-information/lorviqua-epar-product-information_en.pdf", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "us-ayvakit", label: "Ayvakit (avapritinib) tablets: US prescribing information and patient information", publisher: "Blueprint Medicines, on DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=645c887c-8cd4-4623-8da9-ac223d71a8b9", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "ema-ayvakyt", label: "Ayvakyt (avapritinib): EU summary of product characteristics and package leaflet", publisher: "European Medicines Agency", year: 2026, url: "https://www.ema.europa.eu/en/documents/product-information/ayvakyt-epar-product-information_en.pdf", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    {
      key: "bauer-2019",
      label: "Clinical Management of Adverse Events Associated with Lorlatinib (written with Pfizer employees; medical writing funded by Pfizer)",
      publisher: "The Oncologist (Bauer et al.; phase I investigators with three Pfizer employees among the authors; medical writing funded by Pfizer Inc.)",
      year: 2019,
      url: "https://doi.org/10.1634/theoncologist.2018-0380",
      doi: "10.1634/theoncologist.2018-0380",
      gradingScheme: "Expert consensus opinion of trial investigators; no levels of evidence or grades are printed.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "arriola-2024",
      label: "Expert Consensus on the Management of Adverse Events of Lorlatinib in the Treatment of ALK+ Advanced Non-small Cell Lung Cancer (funded by Pfizer)",
      publisher: "Clinical Drug Investigation (Arriola et al.; a Spanish multidisciplinary panel; project and medical writing funded by Pfizer)",
      year: 2024,
      url: "https://doi.org/10.1007/s40261-024-01379-7",
      doi: "10.1007/s40261-024-01379-7",
      gradingScheme: "Expert consensus from clinical experience; no levels of evidence or grades are printed.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "crown-ae-2025",
      label: "Kinetics and management of adverse events associated with lorlatinib after 5 years of follow-up in the CROWN study (sponsored by Pfizer)",
      publisher: "The Oncologist (Liu et al.; study sponsored by Pfizer; first draft prepared with Pfizer's AI writing tool; medical writing funded by Pfizer)",
      year: 2025,
      url: "https://doi.org/10.1093/oncolo/oyaf287",
      doi: "10.1093/oncolo/oyaf287",
      gradingScheme: "Post hoc safety analysis of a randomised trial with the authors' management advice; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "italy-2026",
      label: "Lorlatinib atypical safety profile in ALK-positive aNSCLC: tips for management from an Italian expert panel (funded by Pfizer)",
      publisher: "Future Oncology (Ardizzoni et al.; funded by Pfizer; two authors Pfizer employees, the other four paid consultants to Pfizer for the manuscript)",
      year: 2026,
      url: "https://doi.org/10.1080/14796694.2025.2612605",
      doi: "10.1080/14796694.2025.2612605",
      gradingScheme: "Narrative review with an expert panel's advice; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "latam-2026",
      label: "Expert recommendations on the management of major and minor toxicities associated with the use of lorlatinib in Latin America (supported by Pfizer)",
      publisher: "Frontiers in Oncology (Corrales et al.; a Latin American expert panel; the consensus was supported by Pfizer, which the paper says had no involvement in its content or conclusions)",
      year: 2026,
      url: "https://doi.org/10.3389/fonc.2026.1740218",
      doi: "10.3389/fonc.2026.1740218",
      gradingScheme: "Expert consensus recommendations; no levels of evidence or grades are printed.",
      read: "full-text",
      accessed: "2026-11-18",
    },
  ],
  drugs: ["lorlatinib", "avapritinib"],
  terms: ["ctcae-grading", "dose-modification"],
  related: [
    "fluid-retention-and-effusions-on-kinase-inhibitors",
    "distress-screening-and-referral",
    "driving-flying-and-travel-during-cancer-treatment",
    "anticancer-drug-interaction-review",
    "raised-lipids-and-weight-gain-on-lorlatinib-bexarotene-and-elacestrant",
  ],
  upgrades: [],
  gaps: [
    "No graded guideline on these effects was found. Every lorlatinib management paper read on 18 November 2026 was funded, sponsored or supported by Pfizer, the maker of lorlatinib, or (the 2019 paper) written with Pfizer employees and Pfizer-funded medical writing, and no management paper at all was found for avapritinib's cognitive effects, which rest here on the two labels.",
    "No source read says which cognitive or mood test to use, how often to ask, or what scan or blood tests to do when symptoms appear. The Spanish panel's algorithm for this is a figure that could not be read as text. The 2019 paper reports that formal testing in the phase II study showed little evidence of systematic decline, citing unpublished company data.",
    "How quickly a person should call differs by document and no source gives a time limit: the EU lorlatinib leaflet and the EU avapritinib SmPC (for GIST and advanced systemic mastocytosis) say immediately; the US patient information for both medicines says to tell the healthcare provider; the EU avapritinib leaflet says to contact the doctor.",
    "Thoughts of suicide: the US lorlatinib label lists suicidal ideation among mood effects and its patient information lists thoughts about suicide or dying among symptoms to report. No source read sets out a separate pathway for it, and the trials excluded people with recent or active suicidal ideation.",
    "Seizures and sleep changes are in the US lorlatinib label's definition and not in the EU SmPC's; no source read gives a rule specific to them beyond the dose table.",
    "Medicines for the symptoms: the choices named by the Spanish panel come from reasoning about drug interactions, not from trials, and the table that lists the interactions was read only as flattened text. This page names them as that panel's view and not as a recommendation.",
    "Not read: the 2024 'pragmatic guide' (Liu et al., Lung Cancer) that the CROWN and Italian papers lean on, the J Thorac Oncol 2023 and Clin Lung Cancer 2024 papers on neurocognitive events, and the 2024 systematic review in Cancers (open access, not fetched). A Europe PMC title search on 18 November 2026 also listed newer papers on these effects that are not open access and were not read: in Supportive Care in Cancer (2025, on risk factors and social support), Mayo Clinic Proceedings (2026) and J Thorac Oncol (2026, on an exposure threshold). The 2019 paper could not be fetched a second time on 18 November 2026 (the Europe PMC full text returned an error and PubMed Central asked for a reCAPTCHA); its claims were checked against the copy saved earlier the same day. Who is at higher risk is not settled: the Italian panel lists brain metastases, brain radiation, psychiatric illness and medicines acting on the brain as known risk factors, and the Latin American panel lists brain metastases, radiotherapy, brain surgery, psychiatric medicines and opioids as factors that may increase the risk, while the CROWN paper says there are no clear predictive factors and that the patient numbers in its radiotherapy comparison (67% against 41%) are too small to draw definitive conclusions. Whether other ALK inhibitors cause the same effects is discussed by the Italian panel and is outside this page.",
    "Avapritinib for indolent systemic mastocytosis: the EU SmPC notes that cognitive symptoms can come from the disease itself, and the US label reports them in 7.8% on avapritinib against 7% on placebo. The EU dose table applies the same cognitive rows to all three indications; the US table prints them under GIST or advanced systemic mastocytosis only, and for indolent systemic mastocytosis the US label says in its warnings to withhold and resume at the same or a reduced dose, or permanently discontinue, depending on severity and indication. The EU SmPC reports cognitive effects in 2.8% of people with indolent systemic mastocytosis on 25 mg, a different figure from the US label's 7.8%.",
  ],
});
