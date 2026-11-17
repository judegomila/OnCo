import { protocol } from "./helpers";

/*
 * Monitoring for and treating capillary leak syndrome on tagraxofusp, dinutuximab and dinutuximab beta, high-dose
 * aldesleukin (interleukin-2) and gemcitabine.
 *
 * What was read, and how (all on 16 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - US prescribing information, full text, from the DailyMed SPL XML service, tags stripped: Elzonris (tagraxofusp,
 *   setid 80eb1080-fe20-4af0-b2a5-a67999923fa8; boxed warning, section 2 with Tables 1 and 2, section 5.1), Unituxin
 *   (dinutuximab, d66bdf0d-9d65-45de-ae5b-a58617c27492; sections 2.2, 2.3, 5.3, 5.4), Proleukin (aldesleukin,
 *   f3c516ad-d405-4fbe-af6a-962080dbfa7d; boxed warning and section 5.1) and gemcitabine for injection (Sagent,
 *   44bcc16c-341d-49e8-a1c6-95d084667aca; section 5.9).
 * - Qarziba (dinutuximab beta) EU product information: full text, the EMA PDF
 *   (ema.europa.eu/en/documents/product-information/qarziba-epar-product-information_en.pdf) converted with
 *   pdftotext -layout. Its dose-modification table is laid out in columns, so only sentences that sit on their own
 *   lines are quoted.
 * - Izzedine et al., Kidney Int Rep 2022, "Anticancer drug-induced capillary leak syndrome" (open access): full text,
 *   Europe PMC full-text XML (PMC9091576). A narrative review.
 * - Pagano et al., HemaSphere 2023, a consensus position paper on blastic plasmacytoid dendritic cell neoplasm (open
 *   access): full text, Europe PMC full-text XML (PMC9946418). It prints no funding statement; several panel members
 *   declare board, speaker or consultancy roles with Stemline or Menarini, which market tagraxofusp.
 * - Lane et al., Leuk Lymphoma 2025, "Optimizing capillary leak syndrome prevention and management in patients
 *   receiving tagraxofusp": abstract only (Europe PMC); the article is not open access and was not read. Crossref
 *   records the funder as the Menarini Group and one author's affiliation is the Menarini Group. Named in sources; no
 *   step rests on it.
 * - The moxetumomab pasudotox label (Lumoxiti, DailyMed, 2020) was read and has weight and blood pressure rules for
 *   capillary leak, but the product's record here is marked withdrawn, so it is left out of this protocol.
 * - The naxitamab label was read and does not name capillary leak syndrome.
 *
 * The two tagraxofusp figures differ and both are true to their source: the label counts capillary leak in 53% of 122
 * patients using a broad definition (any reported event, or two of low albumin, oedema and low blood pressure within
 * 7 days); the consensus paper and the Lane abstract quote 21% from the registration trial.
 *
 * Every DOI was resolved through Crossref or Europe PMC and its title checked. Quotes are copied from the raw text with
 * line breaks joined and nothing else changed.
 */
export const capillaryLeakSyndromeOnAnticancerDrugs = protocol({
  id: "capillary-leak-syndrome-on-anticancer-drugs",
  name: "Capillary leak syndrome on tagraxofusp, dinutuximab, aldesleukin and gemcitabine: monitoring and treatment",
  aka: ["capillary leak syndrome", "CLS", "vascular leak syndrome", "systemic capillary leak", "tagraxofusp capillary leak", "Elzonris albumin monitoring", "dinutuximab capillary leak", "interleukin-2 capillary leak"],
  domain: "emergencies",
  tldr: "A few cancer medicines can make the smallest blood vessels leaky, so fluid and protein seep out of the blood into the tissues. The signs are sudden weight gain, swelling, breathlessness and low blood pressure. Teams check weight, blood pressure and a blood protein called albumin before each dose, pause the medicine early, and treat with albumin, steroids and careful fluids.",
  simple: "Some cancer medicines can make fluid leak out of your blood vessels. You may gain weight quickly, swell up, feel breathless or feel faint. Your team weighs you and checks your blood before each dose so they can stop and treat it early. Tell them straight away about swelling, weight gain or breathlessness.",
  summary: "Capillary leak syndrome (CLS) is loss of protein-rich fluid from the circulation: hypoalbuminaemia, oedema and weight gain, hypotension, and in severe cases pulmonary oedema, shock and acute kidney injury. Among anticancer drugs with records here, tagraxofusp and high-dose aldesleukin carry boxed warnings for it, dinutuximab and dinutuximab beta list it as a warning, and gemcitabine's label tells prescribers to stop the drug for good.\n\nThe tagraxofusp label has the most detailed rules. Albumin must be at least 3.2 g/dL before the first dose; cycle 1 is given in hospital; vital signs, albumin, transaminases and creatinine are checked before every dose. During dosing, an albumin below 3.5 g/dL or a fall of 0.5 g/dL or more from the start of the cycle, or a weight gain of 1.5 kg or more over the previous day's pre-dose weight, means the dose is held and 25 g of intravenous albumin is given every 12 hours; oedema, fluid overload or hypotension add methylprednisolone 1 mg/kg a day and active fluid and blood pressure management. The label reports CLS in 53% of 122 patients by a broad definition, a median onset of 4 days, and four deaths.\n\nDinutuximab (children with high-risk neuroblastoma) needs 10 mL/kg of 0.9% saline over an hour before each infusion, close blood pressure monitoring, interruption for moderate to severe CLS with restart at half rate, and permanent discontinuation if life-threatening CLS recurs. The EU label for dinutuximab beta says clinical signs appear 2 to 12 hours after the start and stops the drug for good for recurrent or grade 4 CLS. Aldesleukin is given only where intensive care is available and is withheld when organ perfusion fails.\n\nThe sources pull in different directions on fluids: the dinutuximab label requires pre-hydration and the tagraxofusp label uses intravenous fluids for hypotension, while the review of anticancer drug-induced CLS says saline should be limited because it worsens oedema. No randomised trial has tested albumin, steroids or any fluid strategy for drug-induced CLS. The reader's own team's protocol comes first.",
  asOf: "2026-11-16",
  setting: {
    who: ["nurse", "doctor", "pharmacist", "patient-or-carer"],
    where: ["ward", "chemotherapy-day-unit", "intensive-care", "home", "telephone-triage"],
  },
  population: "Adults and children from 2 years having tagraxofusp for blastic plasmacytoid dendritic cell neoplasm; children having dinutuximab (US label: paediatric patients with high-risk neuroblastoma) or dinutuximab beta (EU label: from 12 months); adults having high-dose aldesleukin (interleukin-2); and anyone having gemcitabine. The tagraxofusp, aldesleukin and gemcitabine steps are adult practice unless stated; the dinutuximab steps are paediatric and are carried out in children's cancer units under their own protocols. Capillary leak as part of cytokine release syndrome after CAR-T or bispecific antibodies, of differentiation syndrome, or of engraftment after a transplant is covered by those protocols and not here.",
  trigger: "Before each dose of one of these medicines, and whenever a person on one has new weight gain, swelling, breathlessness, low blood pressure, a falling albumin or a falling urine output.",
  steps: [
    {
      action: "Before the first dose of tagraxofusp, confirm serum albumin is at least 3.2 g/dL and that heart function is adequate",
      why: "A low albumin at the start leaves no reserve when protein begins to leak, and a weak heart copes badly with the fluid shifts.",
      source: "label-tagraxofusp",
      quote: "Before initiating therapy with ELZONRIS, ensure that the patient has adequate cardiac function and serum albumin is greater than or equal to 3.2 g/dL.",
    },
    {
      action: "Give the first cycle of tagraxofusp in hospital and observe for at least 24 hours after the last infusion",
      why: "Nearly all capillary leak on tagraxofusp starts in the first cycle, at a median of 4 days.",
      source: "label-tagraxofusp",
      quote: "Administer Cycle 1 of ELZONRIS in the inpatient setting with patient observation through at least 24 hours after the last infusion.",
    },
    {
      action: "Before preparing every dose of tagraxofusp, check vital signs, albumin, liver enzymes and creatinine",
      why: "A drop in albumin is often the first sign of leak, before swelling or low blood pressure appear, and the dose is not made up until the results are seen.",
      source: "label-tagraxofusp",
      quote: "Monitor vital signs and check albumin, transaminases, and creatinine prior to preparing each dose of ELZONRIS.",
    },
    {
      action: "Weigh the patient before each dose, compare with the previous day's pre-dose weight, and ask them to weigh themselves daily at home",
      why: "Leaked fluid shows up on the scales before it is visible; on tagraxofusp a gain of 1.5 kg or more in a day triggers action.",
      source: "label-tagraxofusp",
      quote: "Advise patients to weigh themselves daily",
    },
    {
      action: "On tagraxofusp, if albumin is below 3.5 g/dL or has fallen by 0.5 g/dL or more since the start of the cycle, hold the dose and give 25 g of intravenous albumin every 12 hours until it recovers",
      why: "Replacing albumin helps hold fluid inside the blood vessels, and pausing the drug stops the leak getting worse.",
      source: "label-tagraxofusp",
      quote: "Administer 25g intravenous albumin (q12h or more frequently as practical) until serum albumin is ≥ 3.5 g/dL AND not more than 0.5 g/dL lower than the value measured prior to dosing initiation of the current cycle.",
    },
    {
      action: "On tagraxofusp, if pre-dose weight is up by 1.5 kg or more on the previous day, hold the dose, give albumin, and manage fluid by blood pressure: fluids and vasopressors if low, diuretics if normal or high",
      why: "The same weight gain can sit alongside too little fluid in the circulation or too much, so the treatment depends on the blood pressure.",
      source: "label-tagraxofusp",
      quote: "manage fluid status as indicated clinically (e.g., generally with intravenous fluids and vasopressors if hypotensive and with diuretics if normotensive or hypertensive)",
    },
    {
      action: "On tagraxofusp, for oedema, fluid overload or low blood pressure, add methylprednisolone 1 mg/kg a day (or an equivalent steroid) until the signs resolve",
      why: "Steroids are used to calm the leak once it is causing symptoms.",
      source: "label-tagraxofusp",
      quote: "Administer 1 mg/kg of methylprednisolone (or an equivalent) per day, until resolution of CLS sign/symptom or as indicated clinically.",
    },
    {
      action: "Restart tagraxofusp in the same cycle only if every sign has resolved and no treatment for unstable blood pressure was needed; otherwise hold it for the rest of the cycle",
      why: "Someone who needed fluids or vasopressors for low blood pressure is at risk of a worse episode if the drug is given again too soon.",
      source: "label-tagraxofusp",
      quote: "ELZONRIS administration should be held for the remainder of the cycle if CLS signs/symptoms have not resolved or the patient required measures to treat hemodynamic instability",
    },
    {
      action: "Before each dinutuximab infusion (children), give 0.9% sodium chloride 10 mL/kg intravenously over 1 hour",
      why: "Filling the circulation first protects blood pressure when the antibody makes vessels leak.",
      source: "label-dinutuximab",
      quote: "Administer 0.9% Sodium Chloride Injection, USP 10 mL/kg as an intravenous infusion over 1 hour just prior to initiating each Unituxin infusion.",
    },
    {
      action: "During dinutuximab, monitor blood pressure closely and interrupt the infusion for symptomatic or severe capillary leak; restart at half the rate after moderate or severe leak, and stop for good if life-threatening leak recurs",
      why: "Severe capillary leak happened in about a quarter of children in the registration trial, and slowing or stopping the infusion is the main treatment.",
      source: "label-dinutuximab",
      quote: "Immediately interrupt or discontinue Unituxin and institute supportive management in patients with symptomatic or severe capillary leak syndrome",
    },
    {
      action: "During dinutuximab beta (EU product), watch circulation and breathing closely from the first hours; interrupt for capillary leak and stop for good if it recurs or reaches grade 4",
      why: "With this antibody the leak starts within hours, and low blood pressure and a fast pulse follow 2 to 12 hours after the infusion begins.",
      source: "smpc-qarziba",
      quote: "Careful monitoring of circulatory and respiratory function is required.",
    },
    {
      action: "Give high-dose aldesleukin only in a hospital with intensive care, and monitor vital signs, weight, fluid intake, albumin and urine output",
      why: "Capillary leak can begin straight after the first dose of interleukin-2 and can damage the heart, lungs, kidneys and liver.",
      source: "label-aldesleukin",
      quote: "Monitor for signs and symptoms of CLS including assessments of vital signs, weight, fluid intake, albumin levels and urine output.",
    },
    {
      action: "Withhold or stop aldesleukin if organs are not being perfused: confusion, falling urine output, oxygen saturation below 90%, systolic blood pressure below 90 mmHg or a new arrhythmia",
      why: "These are signs the leak has gone far enough to starve organs of blood, and more drug would deepen it.",
      source: "label-aldesleukin",
      quote: "Withhold or discontinue Proleukin for failure to maintain organ perfusion as demonstrated by altered mental status, reduced urine output, oxygen saturation <90%, a fall in the systolic blood pressure below 90 mm Hg, or onset of cardiac arrhythmias.",
    },
    {
      action: "If capillary leak develops on gemcitabine, stop gemcitabine permanently",
      why: "The label reports severe consequences and gives no rule for restarting.",
      source: "label-gemcitabine",
      quote: "Permanently discontinue Gemcitabine for Injection if CLS develops during therapy.",
    },
    {
      action: "When capillary leak is suspected, look for infection and sepsis and for heart and lung causes at the same time",
      why: "Sepsis, heart failure and a chest infection also cause low blood pressure, swelling and breathlessness, and they need different treatment.",
      source: "pagano-2023",
      quote: "in addition to other standard practices evaluating for infection/sepsis, other cardiac/pulmonary events during the suspected time of CLS",
      grade: "Consensus position paper; not graded",
    },
    {
      action: "Keep saline for restoring blood pressure and do not give more than is needed",
      why: "While the vessels are leaky, extra saline moves into the tissues and lungs and makes the swelling worse.",
      source: "izzedine-2022",
      quote: "As in idiopathic CLS, administration of saline infusions to restore intravascular volume should be limited as it may worsen the edema of the surrounding tissues and potentially cause damage to limb muscles and nerves.",
    },
    {
      action: "Tell the patient and carer to call the team at once for new or worsening swelling, weight gain, breathlessness, or dizziness and faintness after an infusion",
      why: "Leak can start after the patient has gone home, and it can be life-threatening if it is not treated promptly.",
      source: "label-tagraxofusp",
      quote: "to contact their health care professional for signs and symptoms associated with CLS including new or worsening edema, weight gain, shortness of breath, and/or hypotension after infusion.",
    },
  ],
  bestInClass: {
    statement: "For tagraxofusp, the label's own scheme is the most specific rule in print and the consensus paper on blastic plasmacytoid dendritic cell neoplasm follows it: albumin of at least 3.2 g/dL before the first dose, cycle 1 in hospital, albumin, weight and vital signs before every dose, the dose held and 25 g of intravenous albumin given every 12 hours when albumin falls below 3.5 g/dL or weight rises 1.5 kg in a day, methylprednisolone 1 mg/kg for oedema, fluid overload or hypotension, and no further doses that cycle after haemodynamic instability. For the other drugs the labels give stopping rules and little else: dinutuximab with pre-hydration, interruption and restart at half rate; dinutuximab beta stopped for recurrent or grade 4 leak; aldesleukin withheld for failed organ perfusion; gemcitabine stopped for good. On fluids the sources differ and both views are shown: pre-hydration and fluids for hypotension in the dinutuximab and tagraxofusp labels, against the reviewers' advice to limit saline because it worsens oedema. None of this rests on a comparative trial.",
    sources: ["label-tagraxofusp", "pagano-2023", "label-dinutuximab", "smpc-qarziba", "label-aldesleukin", "label-gemcitabine", "izzedine-2022"],
  },
  variants: [
    {
      name: "Fluids: pre-hydrate and resuscitate, or restrict",
      differs: "The dinutuximab label requires 10 mL/kg of saline before every infusion and the tagraxofusp label uses intravenous fluids and vasopressors for hypotension. The review of anticancer drug-induced capillary leak says saline to restore volume should be limited, notes that albumin's effect is blunted because it leaks too, and that starch solutions have been linked to more deaths and kidney injury in the critically ill.",
      evidence: "No comparative data. The review states: there is a lack of evidence to guide the choice of fluid therapy.",
      sources: ["label-dinutuximab", "label-tagraxofusp", "izzedine-2022"],
    },
    {
      name: "Dinutuximab (US) and dinutuximab beta (EU) rules",
      differs: "The US label interrupts dinutuximab for moderate to severe leak and resumes at 50% of the previous rate; for life-threatening leak it stops for the cycle, gives later cycles at 50% rate, and stops for good on first recurrence. The EU label for dinutuximab beta interrupts, resumes at 50% rate once the reaction resolves or improves to grade 1 to 2, and stops for good for recurrent or grade 4 leak (needing a ventilator).",
      evidence: "Label rules. Severe (grade 3 to 5) leak occurred in 31 of the children (23%) given dinutuximab in the registration trial; the EU label reports severe (grade 3 to 4) leak in 5.2%, becoming less frequent over later courses. The two products, their schedules and the drugs given with them differ, so the figures are not a comparison.",
      sources: ["label-dinutuximab", "smpc-qarziba"],
    },
    {
      name: "Diuretic choice and second-line drugs",
      differs: "The review suggests amiloride as the diuretic because it lowers blood pressure less, and lists steroids, theophylline or terbutaline, thalidomide, plasmapheresis and intravenous immunoglobulin as agents tried in secondary capillary leak. The tagraxofusp label names diuretics only as a class and steroids as methylprednisolone.",
      evidence: "Case reports and case series. The review states that intravenous immunoglobulin, which may help in the idiopathic form, has no documented efficacy in forms caused by anticancer drugs.",
      sources: ["izzedine-2022", "label-tagraxofusp"],
    },
    {
      name: "Manufacturer-funded guidance on tagraxofusp",
      differs: "A 2025 paper by trial investigators and a Menarini Group employee, funded by the Menarini Group (which markets tagraxofusp), discusses patient selection, monitoring and early intervention in practice. Only its abstract was read.",
      evidence: "The abstract quotes capillary leak in 21% of patients at 12 micrograms/kg a day in the registration trial, mostly grade 2, with two deaths, and says that with strict monitoring it is typically mild and mostly in cycle 1. No recommendation here rests on it.",
      sources: ["lane-2025"],
    },
  ],
  grades: [
    { claim: "Tagraxofusp: monitor albumin before each dose and assess for weight gain, oedema, pulmonary oedema and hypotension", grade: "Regulatory label; not graded", source: "label-tagraxofusp", quote: "During treatment with ELZONRIS, monitor serum albumin levels prior to the initiation of each dose of ELZONRIS and as indicated clinically thereafter, and assess patients for other signs or symptoms of CLS, including weight gain, new onset or worsening edema, including pulmonary edema, hypotension or hemodynamic instability" },
    { claim: "Tagraxofusp: capillary leak in 53% of 122 patients by the label's definition, median onset 4 days, four deaths", grade: "Regulatory label; not graded", source: "label-tagraxofusp", quote: "The median time to onset was 4 days (range - 1 to 46 days), and all but 5 patients experienced an event in Cycle 1." },
    { claim: "Tagraxofusp: the label's definition of capillary leak", grade: "Regulatory label; not graded", source: "label-tagraxofusp", quote: "hypoalbuminemia (including albumin value less than 3.0 g/dL), edema (including weight increase of 5 kg or more), hypotension (including systolic blood pressure less than 90 mmHg)." },
    { claim: "Tagraxofusp: precautions as the consensus panel lists them", grade: "Consensus position paper; not graded", source: "pagano-2023", quote: "monitoring and replacing of albumin, measurement of daily weights, albumin levels, vital signs (Body Temperature, Pulse Rate, Respiration Rate, Blood Pressure) during infusion days; hospitalization during cycle 1 for optimal administration; and appropriate use of diuretics when indicated, and employment of measures such as high-dose steroids for active treatment" },
    { claim: "Dinutuximab: severe capillary leak in 23% of children in the registration trial", grade: "Regulatory label; not graded", source: "label-dinutuximab", quote: "In Study 1, severe (Grade 3 to 5) capillary leak syndrome occurred in 31 (23%) patients in the Unituxin/RA group and in no patients treated with RA alone." },
    { claim: "Dinutuximab beta: stop permanently for recurrent or grade 4 capillary leak", grade: "Regulatory label; not graded", source: "smpc-qarziba", quote: "recurrent or grade 4 capillary leak syndrome (requires ventilator support)" },
    { claim: "Dinutuximab beta: timing of clinical signs", grade: "Regulatory label; not graded", source: "smpc-qarziba", quote: "CLS usually develops within hours after initiation of treatment, while clinical symptoms (i.e. hypotension, tachycardia) are reported to occur after 2 to 12 hours." },
    { claim: "Aldesleukin: give in a hospital with intensive care", grade: "Regulatory label; not graded", source: "label-aldesleukin", quote: "Administer Proleukin in a hospital setting with an intensive care facility." },
    { claim: "No specific treatment exists for anticancer drug-induced capillary leak", grade: "Narrative review; not graded", source: "izzedine-2022", quote: "There is no specific treatment of this drug side effect." },
    { claim: "Evidence on fluid choice is lacking", grade: "Narrative review; not graded", source: "izzedine-2022", quote: "There is a lack of evidence to guide the choice of fluid therapy." },
  ],
  sources: [
    { key: "label-tagraxofusp", label: "Elzonris (tagraxofusp) injection: US prescribing information, boxed warning, section 2 (Tables 1 and 2) and section 5.1", publisher: "Stemline Therapeutics, a Menarini Group company (DailyMed, US National Library of Medicine)", year: 2024, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=80eb1080-fe20-4af0-b2a5-a67999923fa8", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-16" },
    { key: "label-dinutuximab", label: "Unituxin (dinutuximab) injection: US prescribing information, sections 2.2, 2.3, 5.3 and 5.4", publisher: "United Therapeutics (DailyMed, US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=d66bdf0d-9d65-45de-ae5b-a58617c27492", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-16" },
    { key: "smpc-qarziba", label: "Qarziba (dinutuximab beta): EU product information, summary of product characteristics sections 4.2, 4.4 and 4.8", publisher: "European Medicines Agency (marketing authorisation holder Recordati Netherlands B.V.)", year: 2017, url: "https://www.ema.europa.eu/en/documents/product-information/qarziba-epar-product-information_en.pdf", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-16" },
    { key: "label-aldesleukin", label: "Proleukin (aldesleukin) injection: US prescribing information, boxed warning and section 5.1", publisher: "Iovance Biotherapeutics (DailyMed, US National Library of Medicine)", year: 2024, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f3c516ad-d405-4fbe-af6a-962080dbfa7d", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-16" },
    { key: "label-gemcitabine", label: "Gemcitabine for injection: US prescribing information, section 5.9", publisher: "Sagent Pharmaceuticals (DailyMed, US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=44bcc16c-341d-49e8-a1c6-95d084667aca", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-16" },
    { key: "izzedine-2022", label: "Anticancer drug-induced capillary leak syndrome", publisher: "Kidney International Reports (Izzedine et al.)", year: 2022, url: "https://doi.org/10.1016/j.ekir.2022.02.014", doi: "10.1016/j.ekir.2022.02.014", gradingScheme: "Narrative review; not graded.", read: "full-text", accessed: "2026-11-16" },
    { key: "pagano-2023", label: "Unmet clinical needs and management recommendations for blastic plasmacytoid dendritic cell neoplasm: a consensus-based position paper from an ad hoc international expert panel", publisher: "HemaSphere (Pagano et al.; no funding statement printed; several panel members declare roles with Stemline or Menarini, which market tagraxofusp)", year: 2023, url: "https://doi.org/10.1097/HS9.0000000000000841", doi: "10.1097/HS9.0000000000000841", gradingScheme: "Expert panel consensus; statements are not graded.", read: "full-text", accessed: "2026-11-16" },
    { key: "lane-2025", label: "Optimizing capillary leak syndrome prevention and management in patients receiving tagraxofusp for blastic plasmacytoid dendritic cell neoplasm (funded by the Menarini Group)", publisher: "Leukemia & Lymphoma (Lane et al.; funder the Menarini Group, one author a Menarini Group employee)", year: 2025, url: "https://doi.org/10.1080/10428194.2025.2557505", doi: "10.1080/10428194.2025.2557505", read: "abstract", accessed: "2026-11-16" },
  ],
  // Gemcitabine is in `related`, not `drugs`: the label gives one rule for a rare event, and naming it in `drugs`
  // would put this emergency protocol on every cancer page that lists gemcitabine.
  drugs: ["tagraxofusp", "dinutuximab", "aldesleukin"],
  cancers: [],
  terms: [],
  related: ["gemcitabine", "differentiation-syndrome-recognition-and-treatment", "fluid-retention-and-effusions-on-kinase-inhibitors", "crs-grading-and-management", "febrile-neutropenia-first-hour"],
  upgrades: [],
  gaps: [
    "No randomised trial has tested albumin replacement, steroids, diuretics or any fluid strategy for capillary leak caused by an anticancer drug. The tagraxofusp scheme is a label rule built from single-arm trials, and the review read states that there is no specific treatment.",
    "The sources differ on fluids: pre-hydration and fluids for hypotension in the dinutuximab and tagraxofusp labels, limited saline in the review. No source read says how to reconcile them in one patient.",
    "The tagraxofusp label reports capillary leak in 53% of 122 patients by a broad definition; the consensus paper and a manufacturer-funded paper quote 21% from the registration trial. The definitions differ and no source read sets them side by side.",
    "Lane et al., Leuk Lymphoma 2025 (funded by the Menarini Group), the most recent paper on managing tagraxofusp capillary leak, is not open access and was read as an abstract only. The earlier management papers by the trial investigators were not found in open full text.",
    "The dinutuximab and dinutuximab beta labels do not say what 'supportive management' of capillary leak consists of in a child (albumin, diuretics, steroids, vasopressors). Paediatric oncology group guidance was not read, and the dinutuximab beta dose table could be quoted only in part because of its column layout.",
    "The aldesleukin label says to start 'standard management for CLS, which may include intensive care' without defining it, and no current guideline on high-dose interleukin-2 toxicity was read.",
    "Gemcitabine: the label says only to stop the drug. The review notes case reports that respond to steroids; the incidence is unknown.",
    "Other anticancer drugs reported to cause capillary leak (the review names clofarabine, bortezomib, rituximab, alemtuzumab and checkpoint inhibitors, among others) are not covered because no label rule for capillary leak was read for them. Moxetumomab pasudotox has label rules but is recorded here as withdrawn.",
    "No glossary term for capillary leak syndrome exists in the corpus to link.",
  ],
});
