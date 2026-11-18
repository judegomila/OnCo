import { protocol } from "./helpers";

/*
 * Eye care with the antibody-drug conjugates whose labels carry an ocular warning: belantamab mafodotin (boxed warning
 * and REMS), mirvetuximab soravtansine (boxed warning), tisotumab vedotin (boxed warning) and enfortumab vedotin
 * (warning, no box). One record with per-drug steps, because the drugs share the same pattern (an eye examination
 * before and during treatment, drops, no contact lenses, dose holds by corneal findings) and differ in the detail.
 *
 * First written on 11 November 2026 from the four US labels and one expert panel paper.
 *
 * Second accuracy pass, 17 November 2026. Everything below was fetched raw that day with curl and read as text; every
 * quote was checked by script against the saved text (whitespace normalised only).
 * - BLENREP (belantamab mafodotin) US prescribing information, GlaxoSmithKline: SPL XML from the DailyMed web service,
 *   version 2 (published on DailyMed 6 October 2026; the label text is dated October 2025). Boxed warning, sections 2.1
 *   to 2.3, Tables 1 and 2, 5.1, 5.2, 6.1 and the Medication Guide.
 * - ELAHERE (mirvetuximab soravtansine) US prescribing information, ImmunoGen: SPL XML, version 14 (published
 *   16 February 2026). Boxed warning, sections 2.3, 2.4 and Table 3, 5.1, 6.1 and the Medication Guide.
 * - TIVDAK (tisotumab vedotin) US prescribing information, Seagen: SPL XML, version 11 (published 26 October 2026).
 *   Boxed warning, sections 2.2, 2.3 and Table 2, 2.4, 5.1, 6.1, patient counselling and the Medication Guide.
 * - PADCEV (enfortumab vedotin) US prescribing information, Seagen: SPL XML, version 18 (published 17 August 2026).
 *   Section 5.5, 6.1 and patient counselling.
 * - The EU product information (summary of product characteristics) of all four, as PDFs from the European Medicines
 *   Agency, read with pdftotext -layout: sections 4.1, 4.2, 4.4 and 4.8. Not read in the first pass.
 * - The European Medicines Agency's medicine page for Blenrep (authorisation status and risk minimisation measures) and
 *   the FDA's Approved REMS page for Blenrep (REMS 446, BLA 761440), both as HTML stripped to text.
 * - Latin American expert panel guidance on belantamab mafodotin ocular events (Oncol Ther 2025): full text XML from
 *   the Europe PMC REST service (PMC12378815). DOI resolved through Crossref and the title checked.
 * - DATROWAY (datopotamab deruxtecan) and EMRELIS (telisotuzumab vedotin) US labels, SPL XML from DailyMed, read only
 *   to say in gaps what this record does not cover.
 * What the pass changed: one quote that was not verbatim (a stray space), four "why" lines that gave mechanisms or
 * comparisons no label states, "most problems improve" (not true of belantamab on the label's own figures), the
 * missing grade 4 rule for belantamab, the missing dose rules for mirvetuximab, and the EU texts, which differ from
 * the US labels on examination schedules and on steroid drops.
 * No ESMO, ASCO or NCCN guideline on ADC eye care was found; the labels are the governing source for these drugs, as
 * docs/PROTOCOLS.md allows for a dose or schedule. Quotes are copied from the raw text with nothing changed.
 */
export const eyeCareWithOcularToxicAntibodyDrugConjugates = protocol({
  id: "eye-care-with-ocular-toxic-antibody-drug-conjugates",
  name: "Eye care with antibody-drug conjugates that harm the cornea: belantamab, mirvetuximab, tisotumab and enfortumab",
  aka: ["ADC eye care", "ADC ocular toxicity", "Blenrep eye exams", "Blenrep REMS", "Elahere eye drops", "Tivdak eye drops and cold packs", "keratopathy with antibody-drug conjugates", "corneal toxicity with ADCs"],
  domain: "supportive-care",
  tldr: "Some antibody-drug conjugates can damage the front surface of the eye (the cornea), causing dry, gritty or painful eyes and blurred vision. With belantamab, mirvetuximab and tisotumab, an eye specialist examines you before and during treatment, you use eye drops on a schedule and avoid contact lenses. Tell your team straight away about any eye or sight change: the dose can be paused or lowered.",
  simple: "Some cancer drugs can hurt the front of the eye. An eye doctor checks your eyes. Use the eye drops you are given, do not wear contact lenses, and tell your team about any eye change.",
  summary: "Four antibody-drug conjugates have ocular warnings in their US labels. Belantamab mafodotin (BLENREP) has a boxed warning and is available in the US only through a REMS, which the FDA listed as approved and in force on 17 November 2026: an eye care professional performs a slit lamp examination and best-corrected visual acuity (BCVA) at baseline (within 4 weeks before the first dose) and before every dose (within 10 days), patients use preservative-free artificial tears at least four times a day, and avoid contact lenses; doses are held and reduced by a grade built from corneal findings and loss of Snellen lines. In DREAMM-7 (242 people given belantamab with bortezomib and dexamethasone), ocular toxicity occurred in 92 per cent and 83 per cent needed a dose modification for it. Mirvetuximab soravtansine (ELAHERE) has a boxed warning: examination with visual acuity and slit lamp before starting, every other cycle for the first 8 cycles and as indicated; corticosteroid eye drops six times daily from the day before each infusion to day 4, then four times daily on days 5 to 8; lubricating drops at least four times daily. Tisotumab vedotin (TIVDAK) has a boxed warning: examination before every cycle for the first nine cycles; a steroid drop before each infusion and three times daily for 72 hours after; a vasoconstrictor drop immediately before each infusion; cold packs over the eyes throughout the infusion; lubricating drops for the whole of treatment and 30 days after. Enfortumab vedotin (PADCEV) has no box: monitor, consider artificial tears for prophylaxis, an eye examination if symptoms occur or do not resolve, and steroid drops only if indicated after that examination.\n\nWhere the US and EU texts differ. Belantamab: the EU summary of product characteristics asks for the examination before each of the first 4 doses and then as clinically indicated, not before every dose; there is no REMS, and the European Medicines Agency instead requires educational materials and a patient card; for a grade 4 finding the EU text says to consider stopping permanently if symptoms worsen and do not respond to management, while the US label requires stopping after a recurrent grade 4 finding. Mirvetuximab: the US label gives steroid drops to everyone from the first cycle; the EU text recommends them only as secondary prophylaxis, for later cycles in people who have had a corneal reaction of grade 2 or higher, on the day of infusion and for the next 7 days, and asks for an examination before starting and then when symptoms appear. Tisotumab: the EU text asks for an eye care professional's examination before the first infusion and as clinically indicated, with the treating clinician inspecting the eyes before each infusion; it starts steroid drops the day before the infusion, three times daily, continuing for 3 days after, and keeps the cooling pads on for 30 minutes after the infusion. Enfortumab: the two texts agree.\n\nOn belantamab, a 2025 Latin American expert panel (haematologists and ophthalmologists, funded by the manufacturer) held that no ocular event mandates permanent discontinuation and that dose decisions should give priority to myeloma control. The US labels for mirvetuximab and tisotumab require steroid drops; neither the US nor the EU belantamab text instructs them, and the panel leaves them to the ophthalmologist.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "patient-or-carer"],
    where: ["chemotherapy-day-unit", "outpatient-clinic", "home"],
  },
  population: "Adults receiving belantamab mafodotin (relapsed or refractory multiple myeloma), mirvetuximab soravtansine (folate receptor alpha positive, platinum-resistant epithelial ovarian, fallopian tube or primary peritoneal cancer), tisotumab vedotin (recurrent or metastatic cervical cancer) or enfortumab vedotin (urothelial cancer). The steps are each drug's US label; where the EU summary of product characteristics differs, the difference is in the summary and the variants. UK texts were not read. Other ADCs with eye warnings in their labels, among them datopotamab deruxtecan and telisotuzumab vedotin, are not covered by the steps.",
  trigger: "One of these drugs is planned, and before each dose while it continues.",
  steps: [
    {
      action: "Belantamab: arrange an eye examination by an ophthalmologist or optometrist, with slit lamp and best-corrected visual acuity, within 4 weeks before the first dose and within 10 days before every later dose",
      why: "The label says corneal changes may or may not come with symptoms or a change in sight, so they are looked for at each visit, and the findings decide whether the next dose is given in full, reduced or held. The EU text asks for this before each of the first 4 doses and then as clinically indicated.",
      source: "blenrep-label",
      quote: "Perform baseline exam within 4 weeks prior to the first dose. Perform each follow-up exam within 10 days prior to the next planned dose.",
      grade: "US prescribing information (section 5.1; the boxed warning also asks for an examination before each dose)",
    },
    {
      action: "Belantamab: in the US, prescribe only within the BLENREP REMS, and give the person the REMS Patient Guide",
      why: "In the US the prescriber and the setting that dispenses the drug must be certified and the person enrolled, so that everyone is counselled and has the eye examinations. The FDA listed this REMS as approved on 17 November 2026. The EU has no such programme; it requires educational materials and a patient card.",
      source: "blenrep-label",
      quote: "Prescribers must counsel patients receiving BLENREP on the risk of ocular toxicity, the need for monitoring via ophthalmic exams before each dose, and provide patients with the BLENREP REMS Patient Guide.",
      grade: "US prescribing information (REMS)",
    },
    {
      action: "Belantamab: advise preservative-free artificial tears at least four times a day from the first infusion to the end of treatment, and no contact lenses",
      why: "These are the label's two standing instructions for the eyes between examinations. Bandage contact lenses may be used if an eye care professional directs it.",
      source: "blenrep-label",
      quote: "Counsel patients to use preservative‑free artificial tears at least 4 times a day starting with the first infusion and continuing until the end of treatment, and to avoid wearing contact lenses for the duration of therapy.",
      grade: "US prescribing information",
    },
    {
      action: "Belantamab: for grade 2 or 3 findings, hold the drug until both the cornea and the visual acuity are back to grade 1 or less, then restart at 1.9 mg/kg every 3 weeks; if grade 2 or 3 findings return, restart at 1.9 mg/kg every 8 weeks; do not raise the dose again",
      why: "The dose waits for the eye to improve. In DREAMM-7, of the people with grade 2 to 4 findings, 42 per cent had improved to grade 1 or better at their last event and 22 per cent had returned to baseline or normal.",
      source: "blenrep-label",
      quote: "Withhold BLENREP until improvement in both corneal exam findings and change in BCVA to Grade 1 or less. Resume treatment at Reduced Dosage Level 1 as per Table 1. If recurrent Grade 2 or 3 ocular toxicity is experienced, resume treatment at Reduced Dosage Level 2.",
      grade: "US prescribing information (Table 2)",
    },
    {
      action: "Belantamab: for a grade 4 finding (a corneal epithelial defect or ulcer, or sight worse than 20/200), consider stopping the drug permanently; if it is continued, hold until grade 1 or less and restart at a reduced dose; stop permanently if a grade 4 finding returns",
      why: "Grade 4 is the label's most severe grade. The EU text does not make stopping mandatory: it says to consider it when symptoms worsen and do not respond to management.",
      source: "blenrep-label",
      quote: "If recurrent Grade 4 ocular toxicity is experienced, permanently discontinue BLENREP.",
      grade: "US prescribing information (Table 2)",
    },
    {
      action: "Belantamab: warn the person to take care driving or operating machinery while their sight is affected",
      why: "Blurred vision can make driving and reading difficult.",
      source: "blenrep-label",
      quote: "Changes in visual acuity may be associated with difficulty for driving and reading. Counsel patients to use caution when driving or operating machinery.",
      grade: "US prescribing information",
    },
    {
      action: "Mirvetuximab: arrange an eye examination with visual acuity and slit lamp before starting, every other cycle for the first 8 cycles, and whenever symptoms appear",
      why: "In the pooled trials the first eye problem appeared a median of 5.1 weeks into treatment, with a range from 0.1 to 68.6 weeks.",
      source: "elahere-label",
      quote: "Refer patients to an eye care professional for an ophthalmic exam including visual acuity and slit lamp exam prior to treatment initiation, every other cycle for the first 8 cycles, and as clinically indicated.",
      grade: "US prescribing information (boxed warning)",
    },
    {
      action: "Mirvetuximab: prescribe corticosteroid eye drops after a slit lamp examination, one drop in each eye six times a day from the day before each infusion to day 4, then four times a day on days 5 to 8",
      why: "The US label recommends steroid drops around every infusion, and asks for a slit lamp examination before the first prescription and before each renewal. The EU text recommends them only after a corneal reaction of grade 2 or higher.",
      source: "elahere-label",
      quote: "Administer one drop of ophthalmic topical steroids in each eye 6 times daily starting the day prior to each infusion until day 4; then administer one drop in each eye 4 times daily for days 5-8 of each cycle of ELAHERE",
      grade: "US prescribing information",
    },
    {
      action: "Mirvetuximab: advise lubricating eye drops at least four times a day and as needed, at least 10 minutes after the steroid drops, and no contact lenses unless a healthcare provider directs otherwise",
      why: "The label recommends lubricating drops throughout treatment and sets the 10 minute gap after the steroid drop. The EU text says to wait at least 15 minutes.",
      source: "elahere-label",
      quote: "Instruct patients to use lubricating eye drops and advise to wait at least 10 minutes after ophthalmic topical steroid administration before instilling lubricating eye drops",
      grade: "US prescribing information",
    },
    {
      action: "Mirvetuximab: monitor non-confluent superficial keratitis; hold the drug for confluent superficial keratitis, a corneal epithelial defect or a loss of 3 or more lines of best-corrected sight; hold and then reduce by one dose level for a corneal ulcer, stromal opacity or sight of 20/200 or worse; stop permanently for corneal perforation",
      why: "The dose follows what the eye examination finds. The dose levels are 5 mg/kg and then 4 mg/kg of adjusted ideal body weight every 3 weeks, and the boxed warning says to stop for grade 4 ocular toxicity.",
      source: "elahere-label",
      quote: "Monitor for ocular toxicity and withhold, reduce, or permanently discontinue ELAHERE based on severity and persistence of ocular adverse reactions.",
      grade: "US prescribing information (section 5.1 and Table 3)",
    },
    {
      action: "Tisotumab: arrange an eye examination before starting and before every cycle for the first nine cycles, including visual acuity, slit lamp of the front of the eye and eye movement",
      why: "Eye reactions occurred in 55 per cent of the 425 people treated in the trials, and the label says they may lead to changes in vision or corneal ulceration.",
      source: "tivdak-label",
      quote: "Conduct an ophthalmic exam prior to initiation of TIVDAK, prior to every cycle for the first nine cycles, and as clinically indicated. The ophthalmic exam should include visual acuity, slit lamp exam of the anterior segment of the eye, and an assessment of normal eye movement.",
      grade: "US prescribing information (section 2.2; the boxed warning carries the same schedule)",
    },
    {
      action: "Tisotumab: give a steroid drop in each eye before each infusion and three times a day for 72 hours after, and a vasoconstrictor drop in each eye immediately before the infusion",
      why: "The label lists these drops among the measures to reduce the risk of eye reactions; it does not explain how each one works or name a product. The EU text gives dexamethasone 0.1% and brimonidine tartrate 0.2% as examples and starts the steroid the day before.",
      source: "tivdak-label",
      quote: "Instruct patients to administer one drop in each eye prior to each infusion and to continue to administer eye drops in each eye three times daily for 72 hours after each infusion.",
      grade: "US prescribing information",
    },
    {
      action: "Tisotumab: put cold packs fully over the eyes after the vasoconstrictor drops and keep the eye area cold for the whole infusion",
      why: "Cooling is another of the label's measures to reduce the risk of eye reactions. The EU text keeps the cooling pads on for 30 minutes after the infusion as well.",
      source: "tivdak-label",
      quote: "Apply cold packs fully over the eyes following administration of the vasoconstrictor eye drops. Change cold packs as needed throughout infusion to ensure eye area remains cold during the entire infusion",
      grade: "US prescribing information",
    },
    {
      action: "Tisotumab: advise lubricating drops for the whole of treatment and for 30 days after the last dose, no contact lenses unless the eye care provider advises them, and to bring the eye drops to each infusion",
      why: "Eye problems can appear after treatment stops: in the innovaTV 301 trial, 8 people (3.2 per cent) had eye reactions that began more than 30 days after the drug was stopped.",
      source: "tivdak-label",
      quote: "Topical lubricating eye drops: Instruct patients to administer for the duration of therapy and for 30 days after the last dose of TIVDAK.",
      grade: "US prescribing information",
    },
    {
      action: "Tisotumab: hold the drug for a first episode of confluent superficial keratitis, a corneal epithelial defect or a loss of 3 or more lines of best-corrected sight, and restart at the next lower dose; stop permanently for a second episode, for ulcerative keratitis or perforation, and for any conjunctival or corneal scarring or symblepharon",
      why: "These are the label's rules for the cornea; it has separate rules for conjunctivitis. The label warns that the drug can cause severe vision loss and corneal ulceration.",
      source: "tivdak-label",
      quote: "Ulcerative keratitis or perforation",
      grade: "US prescribing information (Table 2)",
    },
    {
      action: "Enfortumab: watch for eye symptoms, consider artificial tears to prevent dry eye, and refer for an eye examination if symptoms occur or do not resolve",
      why: "Dry eye symptoms occurred in 30 per cent of the 384 people treated with enfortumab alone in trials that scheduled eye examinations. The label also says to consider steroid drops if indicated after an examination, and a dose interruption or reduction for symptomatic eye problems.",
      source: "padcev-label",
      quote: "Consider artificial tears for prophylaxis of dry eyes and ophthalmologic evaluation if ocular symptoms occur or do not resolve.",
      grade: "US prescribing information (warning, not boxed)",
    },
  ],
  bestInClass: {
    statement: "For each drug, the current product label is the governing protocol: no ESMO, ASCO or NCCN guideline on ADC eye care was found. The US and EU texts share lubricating drops, avoiding contact lenses and dose changes led by the eye findings, and they differ on how often an eye care professional examines and on steroid drops. Examination: every dose for belantamab in the US, the first 4 doses and then as indicated in the EU; every other cycle for 8 cycles for mirvetuximab in the US, before starting and on symptoms in the EU; every cycle for 9 cycles for tisotumab in the US, before the first infusion and as indicated in the EU, with the treating clinician inspecting the eyes before each infusion; on symptoms for enfortumab in both. Prophylaxis: steroid drops for everyone on mirvetuximab in the US but only after a corneal reaction of grade 2 or higher in the EU; steroid drops, a vasoconstrictor and cooling for tisotumab in both; lubricants alone for belantamab in both. Neither regulator's text is graded, and this page does not rank one above the other: the label of the country of treatment applies. On belantamab, the US label and the 2025 Latin American expert panel disagree on stopping: the label stops the drug after a recurrent grade 4 finding; the panel says no ocular event requires permanent discontinuation, and that dose decisions should give priority to myeloma control and be shared between haematologist and ophthalmologist.",
    sources: ["blenrep-label", "elahere-label", "tivdak-label", "padcev-label", "blenrep-smpc", "elahere-smpc", "tivdak-smpc", "padcev-smpc", "belamaf-latam-2025"],
  },
  variants: [
    {
      name: "EU summaries of product characteristics (European Medicines Agency)",
      differs: "Belantamab: eye examination before each of the first 4 doses and then as clinically indicated; no restricted programme; the reduced dose with bortezomib and dexamethasone is 1.9 mg/kg every 3 weeks with no second reduced level; for grade 4, consider permanent discontinuation when symptoms worsen and do not respond to management; a second regimen, with pomalidomide and dexamethasone, has its own dose levels. Mirvetuximab: examination before starting and when new or worsening symptoms appear; steroid drops only as secondary prophylaxis after a corneal reaction of grade 2 or higher, on the day of infusion and for the next 7 days, with regular checks of eye pressure and slit lamp while they are used; a 15 minute wait before lubricating drops. Tisotumab: an eye care professional's examination before the first infusion and as clinically indicated, and an inspection of the eyes by the treating clinician before each infusion; preservative-free steroid drops (for example dexamethasone 0.1%) one drop in each eye three times daily from 1 day before each infusion until 3 days after; a preservative-free vasoconstrictor (for example brimonidine tartrate 0.2%, 3 drops per eye) immediately before; cooling eye pads before, during and for 30 minutes after the infusion; dose rules written by grade, with keratitis of grade 3 or 4 a reason to stop. Enfortumab: as in the US.",
      evidence: "Regulatory texts, not graded. The EU belantamab indication is wider than the US one (after at least one prior therapy, with either of two combinations; the US label is after at least two prior lines, with bortezomib and dexamethasone only).",
      sources: ["blenrep-smpc", "elahere-smpc", "tivdak-smpc", "padcev-smpc", "blenrep-ema-page"],
    },
    {
      name: "Latin American expert panel approach to belantamab eye events (2025)",
      differs: "Examination by an ophthalmologist before starting, then where possible before each dose or once a month for the first 3 months, and after that as the ophthalmologist decides, where the US label asks for it before every dose throughout; a mild, moderate and severe grading by ophthalmologists; topical antibiotics and steroids at the ophthalmologist's discretion; and no ocular event that by itself mandates stopping treatment.",
      evidence: "Consensus of 13 specialists (nine haematologists or oncologists and four ophthalmologists) from Argentina, Brazil, Colombia and Mexico, reached in two meetings from the DREAMM-7 and DREAMM-8 data and their own experience; recommendations are not graded. Funded by GSK, the manufacturer, which the paper says had no influence on the choice of panel or the content. It is written for settings where the drug may be approved and specialist access is uneven.",
      sources: ["belamaf-latam-2025"],
    },
  ],
  grades: [
    { claim: "Belantamab: ocular toxicity in 92 per cent in DREAMM-7 (242 people given belantamab with bortezomib and dexamethasone), grade 3 or 4 in 77 per cent", grade: "US prescribing information, trial data", source: "blenrep-label", quote: "In DREAMM-7, ocular toxicity occurred in 92% of patients, including Grade 3 or 4 in 77% of patients." },
    { claim: "Mirvetuximab: ocular adverse reactions in 59 per cent of people with ovarian cancer (pooled safety population of 682)", grade: "US prescribing information, pooled trial data", source: "elahere-label", quote: "Ocular adverse reactions occurred in 59% of patients with ovarian cancer treated with ELAHERE." },
    { claim: "Tisotumab: ocular adverse reactions in 55 per cent of people with cervical cancer (pooled safety population of 425)", grade: "US prescribing information, pooled trial data", source: "tivdak-label", quote: "Ocular adverse reactions occurred in 55% of patients with cervical cancer treated with TIVDAK across clinical trials." },
    { claim: "Enfortumab: ocular disorders in 40 per cent of 384 people treated with enfortumab alone in trials with scheduled eye examinations", grade: "US prescribing information, pooled trial data", source: "padcev-label", quote: "Ocular disorders were reported in 40% of the 384 patients treated with PADCEV as a single agent in clinical trials in which ophthalmologic exams were scheduled." },
    { claim: "Belantamab in the EU: eye examination before each of the first 4 doses, then as clinically indicated (differs from the US label)", grade: "EU summary of product characteristics, not graded", source: "blenrep-smpc", quote: "before each of the first 4 doses of Blenrep and during treatment as clinically indicated." },
    { claim: "Belantamab: no ocular event indicates permanent discontinuation (panel view, differs from the US label)", grade: "expert panel consensus, ungraded", source: "belamaf-latam-2025", quote: "No ocular events indicate permanent discontinuation of belantamab mafodotin treatment." },
  ],
  sources: [
    { key: "blenrep-label", label: "BLENREP (belantamab mafodotin-blmf) prescribing information, including boxed warning and REMS (label text revised October 2025; DailyMed version 2)", publisher: "GlaxoSmithKline, via DailyMed (US National Library of Medicine)", year: 2025, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=aef7c34c-fef8-407c-99c0-a68aded53c60", gradingScheme: "US prescribing information: regulatory labelling, not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "elahere-label", label: "ELAHERE (mirvetuximab soravtansine-gynx) prescribing information, including boxed warning (DailyMed version 14)", publisher: "ImmunoGen, via DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=00c424b5-6ccd-48ab-9e88-1986451120e2", gradingScheme: "US prescribing information: regulatory labelling, not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "tivdak-label", label: "TIVDAK (tisotumab vedotin-tftv) prescribing information, including boxed warning (DailyMed version 11)", publisher: "Seagen, via DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=c9fe3f32-4219-466e-acb9-3f609b4f4df1", gradingScheme: "US prescribing information: regulatory labelling, not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "padcev-label", label: "PADCEV (enfortumab vedotin-ejfv) prescribing information (DailyMed version 18)", publisher: "Seagen, via DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b5631d3e-4604-4363-8f20-11dfc5a4a8ed", gradingScheme: "US prescribing information: regulatory labelling, not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "blenrep-smpc", label: "Blenrep (belantamab mafodotin): EPAR product information, summary of product characteristics", publisher: "European Medicines Agency", year: 2026, url: "https://www.ema.europa.eu/en/documents/product-information/blenrep-epar-product-information_en.pdf", gradingScheme: "EU summary of product characteristics: regulatory labelling, not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "elahere-smpc", label: "Elahere (mirvetuximab soravtansine): EPAR product information, summary of product characteristics", publisher: "European Medicines Agency", year: 2026, url: "https://www.ema.europa.eu/en/documents/product-information/elahere-epar-product-information_en.pdf", gradingScheme: "EU summary of product characteristics: regulatory labelling, not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "tivdak-smpc", label: "Tivdak (tisotumab vedotin): EPAR product information, summary of product characteristics", publisher: "European Medicines Agency", year: 2026, url: "https://www.ema.europa.eu/en/documents/product-information/tivdak-epar-product-information_en.pdf", gradingScheme: "EU summary of product characteristics: regulatory labelling, not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "padcev-smpc", label: "Padcev (enfortumab vedotin): EPAR product information, summary of product characteristics", publisher: "European Medicines Agency", year: 2026, url: "https://www.ema.europa.eu/en/documents/product-information/padcev-epar-product-information_en.pdf", gradingScheme: "EU summary of product characteristics: regulatory labelling, not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "blenrep-ema-page", label: "Blenrep: medicine overview (authorised in the EU; marketing authorisation of 23 July 2025; educational materials and patient card)", publisher: "European Medicines Agency", year: 2025, url: "https://www.ema.europa.eu/en/medicines/human/EPAR/blenrep", gradingScheme: "Regulator's public page, not graded.", read: "public-summary", accessed: "2026-11-17" },
    { key: "blenrep-rems-fda", label: "Approved Risk Evaluation and Mitigation Strategies (REMS): Blenrep (belantamab mafodotin-blmf), BLA 761440, REMS last update 23 October 2025", publisher: "US Food and Drug Administration", year: 2025, url: "https://www.accessdata.fda.gov/scripts/cder/rems/index.cfm?event=IndvRemsDetails.page&REMS=446", gradingScheme: "Regulator's public page, not graded.", read: "public-summary", accessed: "2026-11-17" },
    { key: "datroway-label", label: "DATROWAY (datopotamab deruxtecan-dlnk) prescribing information (DailyMed version 18); read for the gaps only", publisher: "Daiichi Sankyo, via DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=2950227c-6230-4ca4-a135-46e44d9424a0", gradingScheme: "US prescribing information: regulatory labelling, not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "emrelis-label", label: "EMRELIS (telisotuzumab vedotin-tllv) prescribing information (DailyMed version 3); read for the gaps only", publisher: "AbbVie, via DailyMed (US National Library of Medicine)", year: 2025, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=bc04f980-3957-4e35-ab81-8ec2ffe87215", gradingScheme: "US prescribing information: regulatory labelling, not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "belamaf-latam-2025", label: "Practical Guidance on the Clinical Management of Ocular Adverse Events Associated with Belantamab Mafodotin for Patients with Relapsed/Refractory Multiple Myeloma: Latin American Expert Panel Recommendations", publisher: "Oncology and Therapy", year: 2025, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12378815/", doi: "10.1007/s40487-025-00354-2", gradingScheme: "Expert panel of 13 specialists; recommendations by discussion, not graded.", read: "full-text", accessed: "2026-11-17" },
  ],
  gaps: [
    "No ESMO, ASCO or NCCN guideline on eye care with ADCs was found; every step rests on a US label, with the EU texts and one regional expert panel as variants. A title search of Europe PMC on 17 November 2026 found two Chinese expert consensus statements on eye events with ADCs (Zhonghua Yan Ke Za Zhi 2026 and Zhonghua Zhong Liu Za Zhi 2026); neither is open access and neither was read.",
    "Belantamab's approval has changed more than once. On 17 November 2026 the European Medicines Agency's page showed Blenrep as authorised, with a marketing authorisation valid throughout the EU from 23 July 2025, and the FDA's REMS pages showed an earlier Blenrep REMS as withdrawn and the current one, under BLA 761440, as approved with a last update of 23 October 2025. The earlier history was not re-read for this page.",
    "The UK summaries of product characteristics were not read. In the EU PDF of the mirvetuximab text the symbol before 'Grade 2' in the steroid drop sentences did not convert to text; it is read here as 'grade 2 or higher', which is how the same document writes the neighbouring sentence on examinations, and no quote is taken from those sentences.",
    "The US BLENREP label covers belantamab with bortezomib and dexamethasone only; the EU text and the Latin American panel also cover the combination with pomalidomide and dexamethasone (DREAMM-8), which has different dose levels.",
    "Whether steroid drops help with belantamab is not settled in the sources read: neither the US nor the EU text instructs them and the panel leaves them to the ophthalmologist. For mirvetuximab the two regulators differ on whether everyone should have them from the first cycle.",
    "The evidence that cold packs and vasoconstrictor drops reduce eye toxicity with tisotumab is not described in the label sections read, and neither label explains how they are meant to work. The US label names no product or strength for any of the three drops.",
    "How often eye problems get better differs by drug and is not a single figure: at last follow-up the US labels report complete resolution in 53 per cent of people with eye events on mirvetuximab and 59 per cent on tisotumab, and for belantamab improvement to grade 1 or better in 42 per cent of those with grade 2 to 4 findings.",
    "Who should not receive these drugs because of existing eye disease is not settled: the panel says no one should be excluded on that basis alone and that people with conditions such as Sjogren's syndrome or severe dry eye need an individual benefit and risk assessment.",
    "Two other ADCs have eye warnings in US labels read on 17 November 2026 and are not covered by the steps. DATROWAY (datopotamab deruxtecan): an eye examination at the start, visual acuity and slit lamp every 3 cycles, preservative-free lubricant drops at least four times daily and no contact lenses. EMRELIS (telisotuzumab vedotin): monitor, and hold the drug and refer to an eye care professional for ocular toxicity of grade 2 or higher. Their EU texts were not read.",
  ],
  drugs: ["belantamab-mafodotin", "mirvetuximab-soravtansine", "tisotumab-vedotin", "enfortumab-vedotin"],
  technologies: ["adc"],
  cancers: ["multiple-myeloma", "myeloma-relapsed-refractory", "platinum-resistant-ovarian-cancer", "recurrent-metastatic-cervical-cancer", "urothelial"],
  terms: ["ocular-toxicity", "adc-side-effects-breast"],
  sections: ["adcs", "supportive-care"],
  tags: ["protocol", "ocular-toxicity", "antibody-drug-conjugate", "supportive-care"],
});
