import { protocol } from "./helpers";

/*
 * Eye care with the antibody-drug conjugates whose labels carry an ocular warning: belantamab mafodotin (boxed warning
 * and REMS), mirvetuximab soravtansine (boxed warning), tisotumab vedotin (boxed warning) and enfortumab vedotin
 * (warning, no box). One record with per-drug steps, because the drugs share the same pattern (an eye examination
 * before and during treatment, drops, no contact lenses, dose holds by corneal findings) and differ in the detail.
 *
 * What was read, and how (all on 11 November 2026, fetched raw as SPL XML from the DailyMed web service into a scratch
 * directory and stripped to text):
 * - BLENREP (belantamab mafodotin) US prescribing information, GlaxoSmithKline, DailyMed version of 6 October 2026:
 *   boxed warning, sections 2.1 to 2.3, 5.1 and 5.2 (REMS). Full text.
 * - ELAHERE (mirvetuximab soravtansine) US prescribing information, ImmunoGen, DailyMed version of 16 February 2026:
 *   boxed warning, section 2.3 and Table 2, section 5.1. Full text.
 * - TIVDAK (tisotumab vedotin) US prescribing information, Seagen, DailyMed version of 26 October 2026: boxed warning,
 *   section 2.2 (ocular premedication and eye care), Table 2, section 5.1, patient counselling. Full text.
 * - PADCEV (enfortumab vedotin) US prescribing information, Seagen, DailyMed version of 17 August 2026: section 5.5.
 *   Full text.
 * - Latin American expert panel guidance on belantamab mafodotin ocular events (Oncol Ther 2025): full text from PubMed
 *   Central (PMC12378815). DOI resolved through Europe PMC and the title checked.
 * No ESMO, ASCO or NCCN guideline on ADC eye care was found; the labels are the governing source for these drugs, as
 * docs/PROTOCOLS.md allows for a dose or schedule. Quotes are copied from the raw text with nothing changed.
 */
export const eyeCareWithOcularToxicAntibodyDrugConjugates = protocol({
  id: "eye-care-with-ocular-toxic-antibody-drug-conjugates",
  name: "Eye care with antibody-drug conjugates that harm the cornea: belantamab, mirvetuximab, tisotumab and enfortumab",
  aka: ["ADC eye care", "ADC ocular toxicity", "Blenrep eye exams", "Blenrep REMS", "Elahere eye drops", "Tivdak eye drops and cold packs", "keratopathy with antibody-drug conjugates", "corneal toxicity with ADCs"],
  domain: "supportive-care",
  tldr: "Some antibody-drug conjugates damage the front surface of the eye (the cornea), causing dry, gritty or painful eyes and blurred vision. With belantamab, mirvetuximab and tisotumab, an eye specialist examines you before and during treatment, you use eye drops on a schedule, and no contact lenses. Report any change in your sight at once: the dose can be paused or lowered, and most problems improve.",
  simple: "Some cancer drugs can hurt the front of the eye. An eye doctor checks your eyes often. Use the eye drops you are given, do not wear contact lenses, and tell your team about any eye change.",
  summary: "Four antibody-drug conjugates have ocular warnings in their US labels. Belantamab mafodotin (BLENREP) has a boxed warning and is available only through a REMS: an eye care professional performs a slit lamp examination and best-corrected visual acuity (BCVA) at baseline (within 4 weeks before the first dose) and before every dose (within 10 days), patients use preservative-free artificial tears at least four times a day, and avoid contact lenses; doses are held and reduced by a grade built from corneal findings and loss of Snellen lines. In DREAMM-7, ocular toxicity occurred in 92 per cent and 83 per cent needed a dose modification for it. Mirvetuximab soravtansine (ELAHERE) has a boxed warning: examination with visual acuity and slit lamp before starting, every other cycle for the first 8 cycles and as indicated; corticosteroid eye drops six times daily from the day before each infusion to day 4, then four times daily on days 5 to 8; lubricating drops at least four times daily. Tisotumab vedotin (TIVDAK) has a boxed warning: examination before every cycle for the first nine cycles; a steroid drop before each infusion and three times daily for 72 hours after; a vasoconstrictor drop immediately before each infusion; cold packs over the eyes throughout the infusion; lubricating drops for the whole of treatment and 30 days after. Enfortumab vedotin (PADCEV) has no box: monitor, consider artificial tears for prophylaxis, and an eye examination if symptoms occur.\n\nWhere sources differ: the US BLENREP label permanently stops the drug after a recurrent grade 4 finding, while a 2025 Latin American expert panel (haematologists and ophthalmologists) held that no ocular event mandates permanent discontinuation and that dose decisions should give priority to myeloma control. The labels for mirvetuximab and tisotumab require steroid drops; the BLENREP label does not instruct them, and the panel leaves them to the ophthalmologist.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "patient-or-carer"],
    where: ["chemotherapy-day-unit", "outpatient-clinic", "home"],
  },
  population: "Adults receiving belantamab mafodotin (multiple myeloma), mirvetuximab soravtansine (folate receptor alpha positive platinum-resistant ovarian cancer), tisotumab vedotin (recurrent or metastatic cervical cancer) or enfortumab vedotin (urothelial cancer). The steps are each drug's US label; other countries' summaries of product characteristics may differ and were not read. Other ADCs with eye effects in their labels are not covered here.",
  trigger: "One of these drugs is planned, and before each dose while it continues.",
  steps: [
    {
      action: "Belantamab: arrange an eye examination by an ophthalmologist or optometrist, with slit lamp and best-corrected visual acuity, within 4 weeks before the first dose and within 10 days before every later dose",
      why: "Corneal changes are found on examination before the person notices them, and they decide whether the next dose is given in full, reduced or held.",
      source: "blenrep-label",
      quote: "Perform baseline exam within 4 weeks prior to the first dose. Perform each follow-up exam within 10 days prior to the next planned dose.",
      grade: "US prescribing information (boxed warning)",
    },
    {
      action: "Belantamab: prescribe only within the BLENREP REMS, and give the person the REMS Patient Guide",
      why: "In the US the drug can only be prescribed, dispensed and given by certified prescribers and settings, so that every person is counselled and monitored.",
      source: "blenrep-label",
      quote: "Prescribers must counsel patients receiving BLENREP on the risk of ocular toxicity, the need for monitoring via ophthalmic exams before each dose, and provide patients with the BLENREP REMS Patient Guide.",
      grade: "US prescribing information (REMS)",
    },
    {
      action: "Belantamab: advise preservative-free artificial tears at least four times a day from the first infusion to the end of treatment, and no contact lenses",
      why: "Lubricating the eye eases dryness and grittiness; contact lenses can worsen damage to the corneal surface.",
      source: "blenrep-label",
      quote: "Counsel patients to use preservative‑free artificial tears at least 4 times a day starting with the first infusion and continuing until the end of treatment, and to avoid wearing contact lenses for the duration of therapy.",
      grade: "US prescribing information",
    },
    {
      action: "Belantamab: for grade 2 or 3 findings, hold the drug until both the cornea and the visual acuity are back to grade 1 or less, then restart at a reduced dose; do not raise the dose again",
      why: "Holding the drug lets the cornea recover; most changes resolve, and a lower dose lowers the chance they return.",
      source: "blenrep-label",
      quote: "Withhold BLENREP until improvement in both corneal exam findings and change in BCVA to Grade 1 or less. Resume treatment at Reduced Dosage Level 1 as per Table 1 . If recurrent Grade 2 or 3 ocular toxicity is experienced, resume treatment at Reduced Dosage Level 2.",
      grade: "US prescribing information (Table 2)",
    },
    {
      action: "Belantamab: warn the person to take care driving or operating machinery while their sight is affected",
      why: "Blurred vision can make driving and reading unsafe.",
      source: "blenrep-label",
      quote: "Changes in visual acuity may be associated with difficulty for driving and reading. Counsel patients to use caution when driving or operating machinery.",
      grade: "US prescribing information",
    },
    {
      action: "Mirvetuximab: arrange an eye examination with visual acuity and slit lamp before starting, every other cycle for the first 8 cycles, and whenever symptoms appear",
      why: "Eye problems usually start in the first weeks; regular checks find them early.",
      source: "elahere-label",
      quote: "Refer patients to an eye care professional for an ophthalmic exam including visual acuity and slit lamp exam prior to treatment initiation, every other cycle for the first 8 cycles, and as clinically indicated.",
      grade: "US prescribing information (boxed warning)",
    },
    {
      action: "Mirvetuximab: prescribe corticosteroid eye drops after a slit lamp examination, one drop in each eye six times a day from the day before each infusion to day 4, then four times a day on days 5 to 8",
      why: "Steroid drops given around each infusion are meant to reduce inflammation of the cornea; the label asks for a slit lamp check first because steroid drops can mask infection or raise eye pressure.",
      source: "elahere-label",
      quote: "Administer one drop of ophthalmic topical steroids in each eye 6 times daily starting the day prior to each infusion until day 4; then administer one drop in each eye 4 times daily for days 5-8 of each cycle of ELAHERE",
      grade: "US prescribing information",
    },
    {
      action: "Mirvetuximab: advise lubricating eye drops at least four times a day, at least 10 minutes after the steroid drops, and no contact lenses unless the team advises otherwise",
      why: "Lubricant drops ease dryness; leaving a gap stops them washing the steroid drop out.",
      source: "elahere-label",
      quote: "Instruct patients to use lubricating eye drops and advise to wait at least 10 minutes after ophthalmic topical steroid administration before instilling lubricating eye drops",
      grade: "US prescribing information",
    },
    {
      action: "Tisotumab: arrange an eye examination before every cycle for the first nine cycles, including visual acuity, slit lamp of the front of the eye and eye movement",
      why: "Conjunctivitis and corneal damage are common with this drug, and can lead to ulcers if missed.",
      source: "tivdak-label",
      quote: "Conduct an ophthalmic exam prior to initiation of TIVDAK, prior to every cycle for the first nine cycles, and as clinically indicated. The ophthalmic exam should include visual acuity, slit lamp exam of the anterior segment of the eye, and an assessment of normal eye movement.",
      grade: "US prescribing information (boxed warning)",
    },
    {
      action: "Tisotumab: give a steroid drop in each eye before each infusion and three times a day for 72 hours after, and a vasoconstrictor drop in each eye immediately before the infusion",
      why: "The steroid calms inflammation; the vasoconstrictor narrows the small vessels of the eye surface so that less drug reaches it during the drip.",
      source: "tivdak-label",
      quote: "Instruct patients to administer one drop in each eye prior to each infusion and to continue to administer eye drops in each eye three times daily for 72 hours after each infusion.",
      grade: "US prescribing information",
    },
    {
      action: "Tisotumab: put cold packs fully over the eyes after the vasoconstrictor drops and keep the eye area cold for the whole infusion",
      why: "Cooling also narrows the vessels, again reducing how much drug reaches the eye surface.",
      source: "tivdak-label",
      quote: "Apply cold packs fully over the eyes following administration of the vasoconstrictor eye drops. Change cold packs as needed throughout infusion to ensure eye area remains cold during the entire infusion",
      grade: "US prescribing information",
    },
    {
      action: "Tisotumab: advise lubricating drops for the whole of treatment and for 30 days after the last dose, no contact lenses, and to bring all eye drops to each infusion",
      why: "Eye problems can appear after treatment stops; in the main trial some began more than 30 days after the last dose.",
      source: "tivdak-label",
      quote: "Topical lubricating eye drops: Instruct patients to administer for the duration of therapy and for 30 days after the last dose of TIVDAK.",
      grade: "US prescribing information",
    },
    {
      action: "Tisotumab: stop the drug permanently for ulcerative keratitis, perforation or any conjunctival or corneal scarring",
      why: "These are signs of damage that could threaten sight if treatment continued.",
      source: "tivdak-label",
      quote: "Ulcerative keratitis or perforation",
      grade: "US prescribing information (Table 2)",
    },
    {
      action: "Enfortumab: watch for eye symptoms, consider artificial tears to prevent dry eye, and refer for an eye examination if symptoms occur or persist",
      why: "Dry eye affects about a third of people on enfortumab; it is usually milder than with the other three drugs.",
      source: "padcev-label",
      quote: "Consider artificial tears for prophylaxis of dry eyes and ophthalmologic evaluation if ocular symptoms occur or do not resolve.",
      grade: "US prescribing information (warning, not boxed)",
    },
  ],
  bestInClass: {
    statement: "For each drug, the current US prescribing information is the governing protocol: no international guideline on ADC eye care was found. All four share regular examination by an eye care professional, lubricating drops and avoiding contact lenses; they differ in the frequency of examination (every dose for belantamab; every other cycle for 8 cycles for mirvetuximab; every cycle for 9 cycles for tisotumab; on symptoms for enfortumab) and in prophylaxis (steroid drops for mirvetuximab and tisotumab, plus a vasoconstrictor and cold packs for tisotumab; lubricants alone for belantamab). On belantamab, the US label and the 2025 Latin American expert panel disagree on stopping: the label stops the drug after a recurrent grade 4 finding; the panel says no ocular event requires permanent discontinuation, and that dose decisions should give priority to myeloma control and be shared between haematologist and ophthalmologist.",
    sources: ["blenrep-label", "elahere-label", "tivdak-label", "padcev-label", "belamaf-latam-2025"],
  },
  variants: [
    {
      name: "Latin American expert panel approach to belantamab eye events (2025)",
      differs: "Examination before each dose, or monthly, for the first 3 months and then as the ophthalmologist decides, rather than before every dose throughout; a simpler mild, moderate and severe grading by ophthalmologists in place of the trial grading scale; topical antibiotics and steroids at the ophthalmologist's discretion; and no ocular event that by itself mandates stopping treatment.",
      evidence: "Consensus of 13 haematologists, oncologists and ophthalmologists from Argentina, Brazil, Colombia and Mexico, built on discussion, the DREAMM trials and experience; recommendations are not graded. It is written for settings where the drug may be approved and specialist access is uneven.",
      sources: ["belamaf-latam-2025"],
    },
  ],
  grades: [
    { claim: "Belantamab: ocular toxicity in 92 per cent in DREAMM-7, grade 3 or 4 in 77 per cent", grade: "US prescribing information, trial data", source: "blenrep-label", quote: "In DREAMM-7, ocular toxicity occurred in 92% of patients, including Grade 3 or 4 in 77% of patients." },
    { claim: "Mirvetuximab: ocular adverse reactions in 59 per cent of people with ovarian cancer", grade: "US prescribing information, pooled trial data", source: "elahere-label", quote: "Ocular adverse reactions occurred in 59% of patients with ovarian cancer treated with ELAHERE." },
    { claim: "Tisotumab: ocular adverse reactions in 55 per cent of people with cervical cancer", grade: "US prescribing information, pooled trial data", source: "tivdak-label", quote: "Ocular adverse reactions occurred in 55% of patients with cervical cancer treated with TIVDAK across clinical trials." },
    { claim: "Belantamab: no ocular event indicates permanent discontinuation (panel view, differs from the US label)", grade: "expert panel consensus, ungraded", source: "belamaf-latam-2025", quote: "No ocular events indicate permanent discontinuation of belantamab mafodotin treatment." },
  ],
  sources: [
    { key: "blenrep-label", label: "BLENREP (belantamab mafodotin) prescribing information, including boxed warning and REMS", publisher: "GlaxoSmithKline, via DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=aef7c34c-fef8-407c-99c0-a68aded53c60", gradingScheme: "US prescribing information: regulatory labelling, not graded.", read: "full-text", accessed: "2026-11-11" },
    { key: "elahere-label", label: "ELAHERE (mirvetuximab soravtansine) prescribing information, including boxed warning", publisher: "ImmunoGen, via DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=00c424b5-6ccd-48ab-9e88-1986451120e2", gradingScheme: "US prescribing information: regulatory labelling, not graded.", read: "full-text", accessed: "2026-11-11" },
    { key: "tivdak-label", label: "TIVDAK (tisotumab vedotin) prescribing information, including boxed warning", publisher: "Seagen, via DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=c9fe3f32-4219-466e-acb9-3f609b4f4df1", gradingScheme: "US prescribing information: regulatory labelling, not graded.", read: "full-text", accessed: "2026-11-11" },
    { key: "padcev-label", label: "PADCEV (enfortumab vedotin) prescribing information", publisher: "Seagen, via DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b5631d3e-4604-4363-8f20-11dfc5a4a8ed", gradingScheme: "US prescribing information: regulatory labelling, not graded.", read: "full-text", accessed: "2026-11-11" },
    { key: "belamaf-latam-2025", label: "Practical Guidance on the Clinical Management of Ocular Adverse Events Associated with Belantamab Mafodotin for Patients with Relapsed/Refractory Multiple Myeloma: Latin American Expert Panel Recommendations", publisher: "Oncology and Therapy", year: 2025, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12378815/", doi: "10.1007/s40487-025-00354-2", gradingScheme: "Expert panel of 13 specialists; recommendations by discussion, not graded.", read: "full-text", accessed: "2026-11-11" },
  ],
  gaps: [
    "No ESMO, ASCO, NCCN or other society guideline on eye care with ADCs was found; every step rests on a US label or one regional expert panel.",
    "The European and UK summaries of product characteristics for these drugs were not read; their examination schedules and dose rules may differ from the US labels.",
    "The BLENREP label covers belantamab with bortezomib and dexamethasone; the Latin American panel also describes a schedule with pomalidomide and dexamethasone (DREAMM-8) that the US label read does not include.",
    "Whether steroid drops help with belantamab is not settled in the sources read: the US label does not instruct them and the panel leaves them to the ophthalmologist.",
    "The evidence that cold packs and vasoconstrictor drops reduce eye toxicity with tisotumab is not described in the label sections read; they were part of the trial programme.",
    "Who should not receive these drugs because of existing eye disease is not settled: the panel says no one should be excluded on that basis alone and that people with conditions such as Sjogren's syndrome or severe dry eye need an individual benefit and risk assessment.",
  ],
  drugs: ["belantamab-mafodotin", "mirvetuximab-soravtansine", "tisotumab-vedotin", "enfortumab-vedotin"],
  technologies: ["adc"],
  cancers: ["multiple-myeloma", "myeloma-relapsed-refractory", "platinum-resistant-ovarian-cancer", "recurrent-metastatic-cervical-cancer", "urothelial"],
  terms: ["ocular-toxicity", "adc-side-effects-breast"],
  sections: ["adcs", "supportive-care"],
  tags: ["protocol", "ocular-toxicity", "antibody-drug-conjugate", "supportive-care"],
});
