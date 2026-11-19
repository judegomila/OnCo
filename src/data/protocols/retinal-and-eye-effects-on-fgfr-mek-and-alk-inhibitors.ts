import { protocol } from "./helpers";

/*
 * Eye side effects of targeted anticancer drugs other than the cornea-toxic antibody-drug conjugates and the
 * checkpoint inhibitors, which have their own records: the retinal effects of FGFR inhibitors (erdafitinib,
 * pemigatinib, futibatinib) and MEK inhibitors (trametinib, binimetinib, cobimetinib, selumetinib), the visual
 * disturbances of crizotinib, brigatinib and camizestrant, the eye rules of datopotamab deruxtecan (an antibody-drug
 * conjugate handled here because eye-care-with-ocular-toxic-antibody-drug-conjugates says it does not cover it), and
 * what the US tamoxifen label says about the eye. One record with per-drug steps, because the pattern is shared (an
 * eye examination before or during treatment, prompt referral for a change in sight, hold, reduce and stop rules) and
 * the detail differs by drug and between the US and EU texts.
 *
 * Written 18 November 2026. Everything below was fetched raw that day with curl and read as text; every quote was
 * checked by script against the saved text (whitespace and line-break hyphenation normalised, nothing else).
 *
 * US prescribing information, SPL XML from the DailyMed web service, tags stripped (version; DailyMed effective date;
 * "Revised" date where the text prints one):
 * - BALVERSA erdafitinib (v14; 24 October 2025; revised 10/2024), PEMAZYRE pemigatinib (v17; 9 June 2026; patient
 *   information revised 08/2022), LYTGOBI futibatinib (v9; 4 November 2026; revised 10/2026).
 * - MEKINIST trametinib (v35; 7 May 2026; revised March 2025), MEKTOVI binimetinib (v12; 20 March 2025; revised
 *   10/2023), COTELLIC cobimetinib (v24; 29 July 2026), KOSELUGO selumetinib (v17; 26 May 2026; revised 11/2025).
 * - XALKORI crizotinib (v47; 29 October 2026; revised Sep 2023), ALUNBRIG brigatinib (v17; 12 January 2026; revised
 *   October 2024), ETCAMAH camizestrant (v1; 4 September 2026), DATROWAY datopotamab deruxtecan (v18; 27 May 2026;
 *   revised 05/2026), tamoxifen citrate tablets, Mylan (v14; 2 July 2021; revised 7/2021).
 * - Read only to say what is not covered: LORBRENA lorlatinib (v13) and GOMEKLI mirdametinib (v8).
 *
 * EU product information (summary of product characteristics and package leaflet), PDFs from the European Medicines
 * Agency read with pdftotext -layout. The PDFs print no revision date; the date given is the PDF's own modification
 * date: Balversa (19 May 2026), Pemazyre (2 November 2026), Lytgobi (3 October 2025), Mekinist (19 May 2026), Mektovi
 * (1 November 2026), Cotellic (13 June 2025), Koselugo (14 October 2026), Xalkori (19 August 2025), Alunbrig
 * (23 April 2025), Etcamah (15 June 2026), Datroway (24 June 2026). Lorviqua and Ezmekly were read only for gaps.
 * Tamoxifen has no centrally authorised EU product information; no national (UK or other) tamoxifen text was read.
 *
 * Papers, full text XML from the Europe PMC REST service, each DOI resolved through Crossref and the title checked:
 * - Jeng-Miller, Miller and Heier, Oncologist 2024 (PMC11067803), ocular effects of MEK inhibitors. "This publication
 *   was sponsored by Array BioPharma"; medical writing "funded by Pfizer" (Pfizer owns Array, the maker of binimetinib).
 * - O'Hagan et al., Oncologist 2026 (PMC13293072), retinopathy across the erdafitinib trial programme. "This study
 *   was sponsored by Johnson & Johnson"; several authors are its employees; writing support funded by it.
 * - Subbiah and Verstovsek, Cell Reports Medicine 2023 (PMC10591034), FGFR inhibitor adverse events. "This manuscript
 *   was sponsored by" Incyte, which makes pemigatinib; writing funded by Incyte.
 * - Brufsky et al., Oncologist 2026 (PMC13471996), SERENA-6 visual outcomes on camizestrant. Funded by AstraZeneca;
 *   four authors are its employees; writing support funded by AstraZeneca.
 * - Farooq et al., Ophthalmology and Therapy 2025 (PMC12167182), a grading scale for bemarituzumab eye reactions.
 *   Most authors are Amgen employees; writing support funded by Amgen.
 * - Iimura et al., International Journal of Clinical Oncology 2026 (PMC13506660), a literature review with management
 *   recommendations for non-ophthalmologic settings. Declares no specific grant; open access paid by the University
 *   of Tokyo.
 *
 * Editions and guidelines checked: the labels are the versions DailyMed and the EMA served on the day. A Europe PMC
 * title search the same day for a consensus statement or guideline on eye toxicity of targeted anticancer drugs found
 * no ESMO, ASCO, NCCN or Royal College of Ophthalmologists guideline. It found a 2020 Chinese recommendation paper
 * (Thoracic Cancer) and a 2026 consensus on reporting eye events of experimental oncology drugs (JAMA Ophthalmology);
 * neither was read and neither is cited. The labels are the governing source for a dose or a schedule, as
 * docs/PROTOCOLS.md allows.
 *
 * Second reader, 18 November 2026. All 29 sources were fetched again by a second reader with curl (the twelve US
 * labels as SPL XML from the DailyMed web service, the eleven EU texts as PDFs from the European Medicines Agency,
 * the six papers as full text XML from Europe PMC, each DOI through Crossref) and every converted text was identical
 * to the writer's copy. The DailyMed version history of each label showed the version read to be the latest; camizestrant
 * (ETCAMAH) has one version, published 10 September 2026. All 39 quotes were found verbatim by script. 238 claims
 * were checked against the texts: 6 were wrong (two faults, each in three places), 9 said more than the source
 * and 1 was not reached. The summary, the best-in-class
 * statement and one grade row said the EU brigatinib text only considers action at grade 2, when its dose table withholds
 * at grade 2 or 3 as the US one does; the crizotinib examination schedule was given to young adults with
 * inflammatory myofibroblastic tumour, where the US label says children. Softened or scoped: the erdafitinib 4-week
 * stop (the US dose table says consider), "within 24 hours" (US labels only), "immediately" for every drug, a prompt
 * examination "on any of these drugs", the futibatinib OCT sentence, and the patient summary's "each drug's label".
 * Tamoxifen was taken out of `drugs`: the record gives its reader one prescriber-facing sentence and no cataract
 * management. Lorlatinib and mirdametinib (gaps only) were checked against the writer's saved texts, not fetched again.
 *
 * Bemarituzumab is investigational: DailyMed held no label for it on 18 November 2026. It is named in the variants
 * and gaps from the one paper read, and is not in `drugs` because no source read gives a management rule for it.
 */
export const retinalAndEyeEffectsOnFgfrMekAndAlkInhibitors = protocol({
  id: "retinal-and-eye-effects-on-fgfr-mek-and-alk-inhibitors",
  name: "Retinal and visual side effects of FGFR, MEK and ALK inhibitors and other targeted drugs: eye examinations and dose rules",
  aka: ["FGFR inhibitor retinopathy", "MEK inhibitor retinopathy", "MEKAR", "central serous retinopathy on erdafitinib", "retinal pigment epithelial detachment", "RPED", "serous retinal detachment on pemigatinib", "retinal vein occlusion on MEK inhibitors", "crizotinib visual disturbance", "camizestrant photopsia", "Datroway eye care", "tamoxifen and cataract", "Amsler grid on Balversa"],
  domain: "supportive-care",
  tldr: "Some targeted cancer drugs can affect the back of the eye or your sight: FGFR inhibitors (erdafitinib, pemigatinib, futibatinib), MEK inhibitors (trametinib, binimetinib, cobimetinib, selumetinib), crizotinib and others. Most of their labels set eye checks and rules for pausing or lowering the dose. Tell your team straight away about any change in your sight.",
  simple: "Some cancer tablets can change your sight. Your team may send you for eye checks before and during treatment. Tell them straight away if your sight goes blurred, you see flashes or dark spots, or you lose any sight. The dose can be paused or lowered.",
  summary: "This record sets out what the US label and the EU summary of product characteristics (SmPC) of each drug ask for. No ESMO, ASCO or NCCN guideline on the subject was found, and the review papers cited were all but one funded by a manufacturer.\n\nFGFR inhibitors. Erdafitinib: the US label reports central serous retinopathy or retinal pigment epithelial detachment (CSR/RPED) in 22 per cent of a pooled population, median first onset 46 days, and asks for monthly eye examinations for the first 4 months, then every 3 months, and urgently for visual symptoms, with visual acuity, slit lamp, fundoscopy and optical coherence tomography (OCT). The EU SmPC keeps that schedule and adds an examination before starting and an Amsler grid test at each monthly examination; the US label read names neither. Both withhold for CSR and stop for good if it does not resolve within 4 weeks or is grade 4; the US dose table words the 4-week point as 'consider permanent discontinuation'. Pemigatinib: both texts ask for an examination with OCT before starting, every 2 months for 6 months, then every 3 months. Futibatinib: the US label asks for the same schedule; the EU SmPC asks for an examination before starting, 6 weeks later, and urgently for visual symptoms. The US tables go by symptoms and serial examination; the EU tables for pemigatinib and futibatinib go by visual acuity.\n\nMEK inhibitors. The US labels of trametinib, binimetinib and cobimetinib ask for eye examinations periodically or at regular intervals, with no interval stated, and for any visual disturbance; trametinib and binimetinib ask for an evaluation within 24 hours for loss of vision. Their EU SmPCs set no scheduled examination: patients are assessed for visual symptoms and an eye examination is recommended when they have them (promptly, in the trametinib and binimetinib texts). Selumetinib is the only one of the four whose label asks for an examination before starting (US: comprehensive assessments before and at regular intervals; EU: before starting and for new visual disturbances). Retinal vein occlusion (RVO) means stopping for good in every text that mentions it; the EU cobimetinib SmPC read does not mention it. For RPED or serous retinopathy the hold differs: trametinib up to 3 weeks; binimetinib up to 10 days (US) or up to 2 weeks (EU), for symptomatic disease; cobimetinib up to 4 weeks (US) or until visual symptoms improve to grade 1 or less (EU); selumetinib until resolution (US), or only when visual acuity is reduced (EU).\n\nOthers. Crizotinib: the US label recommends a monthly assessment of visual symptoms and stopping for good for a grade 3 or 4 ocular disorder or severe visual loss (best corrected vision less than 20/200; the EU text says 6/60) unless another cause is found; children and young adults with anaplastic large cell lymphoma, and children with inflammatory myofibroblastic tumour, have examinations at baseline, within 1 month and every 3 months. Brigatinib: both dose tables withhold for a grade 2 or 3 visual disturbance, resume at the next lower dose and stop for good at grade 4; the US label also asks for an eye examination at grade 2 or worse, where the EU warning says an evaluation and dose reduction should be considered for severe symptoms. Camizestrant: the US label withholds for grade 2 or worse visual disturbances and refers to an eye care professional; the EU SmPC says to consider referral and leaves interruption to clinical assessment. Datopotamab deruxtecan: the US label asks for an eye examination at the start, visual acuity and slit lamp every 3 cycles and at the end, with lubricant drops at least four times daily; the EU SmPC sets no scheduled examination. Tamoxifen: the US label reports cataracts and other ocular disturbances and asks that women seek prompt medical attention for changes in vision; it sets no examination schedule. The reader's own team's protocol comes first.",
  asOf: "2026-11-18",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "patient-or-carer"],
    where: ["outpatient-clinic", "telephone-triage", "home"],
  },
  population: "People taking erdafitinib, pemigatinib, futibatinib, trametinib, binimetinib, cobimetinib, selumetinib, crizotinib, brigatinib, camizestrant, datopotamab deruxtecan or tamoxifen. The steps are each drug's US label, with the EU summary of product characteristics beside it where the two differ; UK texts were not read, and no EU or UK tamoxifen text was read. Selumetinib's labels concern children and adults with neurofibromatosis type 1; the crizotinib examination schedule applies to children and young adults with anaplastic large cell lymphoma and children with inflammatory myofibroblastic tumour (the EU text says paediatric patients with either). Tamoxifen has one step here, the US label's one sentence, and no management rule (see gaps). Not covered: the corneal effects of belantamab, mirvetuximab, tisotumab and enfortumab, and the eye effects of checkpoint inhibitors (see the related protocols); lorlatinib, mirdametinib, telisotuzumab vedotin and bemarituzumab (see gaps).",
  trigger: "One of these drugs is planned or being taken, or a person taking one reports a change in sight.",
  steps: [
    {
      action: "Erdafitinib: arrange an eye examination every month for the first 4 months, then every 3 months, and urgently at any time for visual symptoms",
      why: "The US label says erdafitinib can cause central serous retinopathy or retinal pigment epithelial detachment resulting in visual field defect, in 22 per cent of its pooled safety population, with a median time to first onset of 46 days. It says the examination should include visual acuity, slit lamp examination, fundoscopy and optical coherence tomography. The EU text keeps the schedule, adds an examination before starting (Amsler grid test, fundoscopy, visual acuity and, if available, OCT) and an Amsler grid test at the monthly examinations, and recommends close monitoring for people aged 65 and over. The US label read names no examination before starting and no Amsler grid.",
      source: "us-balversa",
      quote: "Perform monthly ophthalmological examinations during the first 4 months of treatment and every 3 months afterwards, and urgently at any time for visual symptoms.",
    },
    {
      action: "Erdafitinib: withhold when central serous retinopathy or retinal pigment epithelial detachment occurs; stop for good if it is grade 4, and stop or consider stopping (the US label says both) if it does not resolve within 4 weeks",
      why: "The US dose table asks for an eye evaluation within 2 weeks: if improving within 14 days, restart at the current dose; if not, withhold until improving and then the drug may be resumed at the next lower dose, with monitoring for recurrence every 1 to 2 weeks for a month. Where it recurs or has not improved after 4 weeks the table says to consider permanent discontinuation, a weaker wording than the label's own summary quoted here. The EU table goes by grade: grade 1, refer for an examination and withhold if it cannot be done within 7 days; grades 2 and 3, withhold immediately and refer; grade 3 that resolves within 4 weeks may resume 2 dose levels lower; grade 4, stop for good. The US label reports that of 24 patients who restarted after an interruption, 67 per cent had recurrence or worsening.",
      source: "us-balversa",
      quote: "Withhold BALVERSA when CSR/RPED occurs and permanently discontinue if it does not resolve within 4 weeks or if Grade 4 in severity.",
    },
    {
      action: "Erdafitinib: give everyone lubricating eye drops, gels or ointment to prevent dry eye; pemigatinib and futibatinib: treat dry eye with them as needed",
      why: "The US erdafitinib label reports dry eye symptoms in 26 per cent and tells patients to use artificial tear substitutes or lubricating gels or ointments at least every 2 hours during waking hours; the EU text says the same and adds that severe treatment-related dry eye should be evaluated by an ophthalmologist. The US pemigatinib label reports dry eye in 31 per cent and the US futibatinib label in 15 per cent; both say to treat patients with ocular demulcents as needed.",
      source: "us-balversa",
      quote: "All patients should receive dry eye prophylaxis with ocular demulcents as needed.",
    },
    {
      action: "Pemigatinib and futibatinib: arrange a full eye examination with optical coherence tomography before starting, every 2 months for the first 6 months and every 3 months after that",
      why: "The US pemigatinib label reports retinal pigment epithelial detachment in 11 per cent of 635 patients, with a median time to first onset of 56 days, and says its trials did not routinely use OCT, so the incidence without symptoms is unknown. The EU pemigatinib text asks for the same schedule. The US futibatinib label asks for the same schedule (with OCT of the macula) and reports the detachment in 9 per cent of 318 patients. The EU futibatinib text asks for less: an examination before starting, 6 weeks later, and urgently at any time for visual symptoms.",
      source: "us-pemazyre",
      quote: "Perform a comprehensive ophthalmological examination including OCT prior to initiation of PEMAZYRE and every 2 months for the first 6 months and every 3 months thereafter during treatment.",
    },
    {
      action: "Pemigatinib and futibatinib: refer urgently to an eye specialist when visual symptoms start, with follow-up every 3 weeks, and change the dose by each label's table",
      why: "US pemigatinib table: continue if the detachment is without symptoms and stable on serial examination; withhold if it is symptomatic or worsening; resume at a lower dose if without symptoms and improved; consider permanent discontinuation if symptoms persist or the examination does not improve. US futibatinib table: continue at the current dose with periodic eye evaluation; if not resolving within 14 days, withhold until resolving, then resume at the previous or a lower dose. The EU tables for both drugs go by visual acuity: continue if without symptoms; withhold for a moderate decrease (20/40 or better, or up to 3 lines lost) and resume at the next lower dose; after a marked decrease the drug may be resumed 2 dose levels lower; for acuity worse than 20/200 the EU futibatinib text says permanent discontinuation should be considered.",
      source: "us-pemazyre",
      quote: "For onset of visual symptoms, refer patients for ophthalmologic evaluation urgently, with follow-up every 3 weeks until resolution or discontinuation of PEMAZYRE.",
    },
    {
      action: "MEK inhibitors: ask about visual symptoms at each visit, and arrange an eye examination at regular intervals and for any new or worsening visual disturbance (US labels)",
      why: "The US binimetinib label reports serous retinopathy in 20 per cent of patients given it with encorafenib in the COLUMBUS trial, symptomatic in 8 per cent, with no cases of blindness. The US trametinib label says to examine periodically and at any time a patient reports visual disturbances, the US cobimetinib label at regular intervals, and the US selumetinib label before starting and at regular intervals; none states the interval. The EU texts of trametinib, binimetinib and cobimetinib set no scheduled examination in their warnings: patients are assessed for visual symptoms and referred when they have them (the EU trametinib leaflet does tell patients they should have their eyes examined by their doctor while taking it). The EU selumetinib text recommends an evaluation before starting and whenever new visual disturbances are reported.",
      source: "us-mektovi",
      quote: "Assess for visual symptoms at each visit. Perform an ophthalmologic examination at regular intervals, for new or worsening visual disturbances, and to follow new or persistent ophthalmologic findings.",
    },
    {
      action: "Trametinib and binimetinib: get an eye examination within 24 hours when a patient reports loss of vision or another visual disturbance (US labels; the EU texts say promptly)",
      why: "The US trametinib label says retinal vein occlusion may lead to macular oedema, decreased visual function, neovascularisation and glaucoma. The US binimetinib label also says within 24 hours. The EU texts of both drugs recommend a prompt ophthalmological assessment for new visual disturbances such as diminished central vision, blurred vision or loss of vision, and give no figure in hours.",
      source: "us-mekinist",
      quote: "Urgently (within 24 hours) perform ophthalmological evaluation for patient-reported loss of vision or other visual disturbances.",
    },
    {
      action: "MEK inhibitors: stop for good if a retinal vein occlusion is confirmed",
      why: "The US labels of trametinib, binimetinib, cobimetinib and selumetinib and the EU texts of trametinib, binimetinib and selumetinib all say so; the EU cobimetinib text read does not mention retinal vein occlusion. The US trametinib label reports it in 0.6 per cent of its pooled monotherapy population. The EU texts say trametinib and binimetinib are not recommended in people with a history of retinal vein occlusion, and that safety has not been established in people with predisposing factors, among them uncontrolled glaucoma, ocular hypertension, uncontrolled diabetes, and hyperviscosity or hypercoagulability syndromes.",
      source: "us-mekinist",
      quote: "Permanently discontinue MEKINIST in patients with documented RVO",
    },
    {
      action: "Trametinib: withhold if retinal pigment epithelial detachment is diagnosed and repeat the eye examination within 3 weeks; for the other MEK inhibitors follow each label's own hold",
      why: "US trametinib: if not improved after 3 weeks, resume at a reduced dose or stop for good. EU trametinib: grade 1, continue with a retinal evaluation every month until resolution; grades 2 and 3, withhold for up to 3 weeks, resume at a lower dose if improved to grade 0 or 1, and stop for good if not. Binimetinib, for symptomatic disease: withhold for up to 10 days (US) or up to 2 weeks with repeat monitoring including visual acuity (EU). Cobimetinib: withhold for up to 4 weeks and resume at the next lower dose if improved (US); withhold until visual symptoms improve to grade 1 or less (EU). Selumetinib: withhold until resolution, follow with OCT every 3 weeks and resume at a reduced dose (US); interrupt only when visual acuity is reduced, and otherwise assess every 3 weeks until resolution (EU).",
      source: "us-mekinist",
      quote: "Withhold MEKINIST if RPED is diagnosed. If resolution of the RPED is documented on repeat ophthalmological evaluation within 3 weeks, resume MEKINIST at same or reduced dose.",
    },
    {
      action: "Consider an eye examination before starting any MEK inhibitor",
      why: "A 2024 review by three authors (sponsored by the maker of binimetinib, with medical writing funded by Pfizer) says a baseline examination lets pre-existing eye disease be told apart from retinopathy caused by the drug. The same review says there is currently no recommendation for routine screening, and that regular screening should be considered for people at increased risk, such as those with underlying macular disease. Of the labels read, only selumetinib's ask for an examination before starting.",
      source: "mek-ocular-oncologist-2024",
      quote: "A baseline ophthalmologic evaluation, including visual acuity and fundoscopy, may be useful for all patients initiating MEK inhibitor therapy.",
    },
    {
      action: "Crizotinib: assess visual symptoms every month and report new ones to an eye specialist; for children and young adults with anaplastic large cell lymphoma and children with inflammatory myofibroblastic tumour, arrange eye examinations at baseline, within 1 month and every 3 months",
      why: "The US label reports vision disorders in 63 per cent of 1,719 patients with lung cancer, grade 1 in the majority, generally starting within the first week, and grade 4 visual field defect with visual loss in 0.2 per cent. The examinations for the younger group include a retinal examination in both the US and EU texts. For adults the EU text recommends an ophthalmological evaluation if a vision disorder persists or worsens.",
      source: "us-xalkori",
      quote: "Assessment of visual symptoms for all patients is recommended monthly during treatment. Report new visual symptoms to an eye specialist.",
    },
    {
      action: "Crizotinib: stop while severe visual loss is evaluated, and stop for good for a grade 3 or 4 ocular disorder or severe visual loss unless another cause is found",
      why: "The US label says optic atrophy and optic nerve disorder have been reported as potential causes of visual loss, and that there is insufficient information to characterise the risks of restarting. For grade 2 visual symptoms both texts say to consider a dose reduction. The EU text defines severe visual loss as best corrected visual acuity less than 6/60 in one or both eyes and asks for an evaluation with best corrected visual acuity, retinal photographs, visual fields and OCT.",
      source: "us-xalkori",
      quote: "Permanently discontinue XALKORI for Grade 3 or 4 ocular disorders or severe visual loss (best corrected vision less than 20/200 in one or both eyes) unless another cause is identified",
    },
    {
      action: "Brigatinib: withhold for new or worsening visual symptoms of grade 2 or worse, and obtain an eye examination (US label; the EU text says to consider one for severe symptoms)",
      why: "The US label says to resume at a reduced dose once a grade 2 or 3 disturbance recovers to grade 1 or baseline, and to stop for good for grade 4; the EU dose table says the same, so both texts withhold at grade 2. The EU warning is worded more weakly on the examination: for new or worsening severe visual symptoms an ophthalmologic evaluation and dose reduction should be considered. Neither text gives a reason beyond reporting that visual disturbances have occurred.",
      source: "us-alunbrig",
      quote: "Withhold ALUNBRIG and obtain an ophthalmologic evaluation in patients with new or worsening visual symptoms of Grade 2 or greater severity.",
    },
    {
      action: "Camizestrant: for visual disturbances of grade 2 or worse, withhold until they settle to grade 1 or below and refer to an eye care professional (US label); the EU text says to consider referral",
      why: "The US table also asks for the disturbances to be reassessed at the next visit. The EU table says to consider referring to an eye care professional if visual symptoms are progressive, persistent or interfere with daily activities, and that the decision to interrupt treatment should be based on clinical assessment. The EU text reports visual effects in 40.7 per cent, grade 1 in 92.5 per cent of those, most often photopsia (24.0 per cent), with a median onset of 9 days, and says ophthalmological review showed no evidence of structural effects on the eye. A manufacturer-funded analysis of the SERENA-6 trial concluded that its data support a symptom-guided approach, not routine eye examination.",
      source: "us-etcamah",
      quote: "Withhold ETCAMAH until symptoms resolve to Grade 1 or below.",
    },
    {
      action: "Datopotamab deruxtecan (US label): eye examination at the start and the end of treatment, visual acuity and slit lamp every 3 cycles, preservative-free lubricant drops at least four times daily, and no contact lenses unless an eye care professional directs",
      why: "This antibody-drug conjugate is covered here because the record on the cornea-toxic conjugates does not cover it. The US label reports ocular adverse reactions, including dry eye and keratitis, in 38 per cent of its pooled population. The starting examination includes visual acuity, slit lamp with fluorescein staining, intraocular pressure and fundoscopy. The EU text sets no scheduled examination: it advises drops several times daily, no contact lenses unless directed, and prompt referral for new or worsening signs that could suggest keratitis.",
      source: "us-datroway",
      quote: "While on treatment, conduct visual acuity testing and slit lamp examination every 3 cycles.",
    },
    {
      action: "Datopotamab deruxtecan: refer promptly to an eye care professional for any new or worsening eye problem, and withhold, reduce or stop by the severity of keratitis",
      why: "US table: nonconfluent superficial keratitis, monitor and continue; confluent superficial keratitis, a corneal epithelial defect or a loss of 3 or more lines of best corrected visual acuity, withhold until improved or resolved, then restart at the same dose or consider a reduction; corneal ulcer, stromal opacity or acuity of 20/200 or worse, withhold and restart at a reduced dose; corneal perforation, stop for good. The EU table goes by grade: grade 2, delay until grade 1 or less and keep the dose; grade 3, delay and reduce by one level; grade 4, stop for good.",
      source: "us-datroway",
      quote: "Promptly refer patients to an eye care professional for any new or worsening ocular adverse reactions.",
    },
    {
      action: "Tamoxifen: tell women to seek prompt medical attention for changes in vision",
      why: "The US label says ocular disturbances, including corneal changes, a decrement in colour vision perception, retinal vein thrombosis and retinopathy, have been reported, with an increased incidence of cataracts and of cataract surgery. In the NSABP P-1 prevention trial the relative risk of developing cataracts was 1.13 and of cataract surgery 1.62 among women without cataracts at baseline; eye examinations were not required in that trial. The label sets no eye examination schedule and no dose rule. Its patient information says the sign of cataract is slow blurring of vision.",
      source: "us-tamoxifen",
      quote: "Women taking or having previously taken tamoxifen should be instructed to seek prompt medical attention for new breast lumps, vaginal bleeding, gynecologic symptoms (menstrual irregularities, changes in vaginal discharge, or pelvic pain or pressure), symptoms of leg swelling or tenderness, unexplained shortness of breath, or changes in vision.",
    },
    {
      action: "Tell everyone taking one of these drugs to report any change in sight, and for most of them to do so immediately",
      why: "The US patient information for pemigatinib names blurred vision, flashes of light and black spots, and says the patient may need to see an eye specialist right away. That for trametinib names blurred vision, loss of vision, colour dots, halos, and eye pain, swelling or redness, and says the drug can cause severe eye problems that might lead to blindness. The crizotinib patient information tells people not to drive or operate machinery if they have changes in vision. The US patient information read for the other drugs says to tell the healthcare provider right away, except camizestrant's, which says to tell the provider and gives no time.",
      source: "us-pemazyre",
      quote: "Advise patients that PEMAZYRE may cause ocular toxicity including RPED and to immediately inform their healthcare provider if they experience any visual changes.",
    },
  ],
  bestInClass: {
    statement: "No ESMO, ASCO or NCCN guideline on these eye effects was found, so the best supported version for each drug is its own label, and the US and EU texts do not always agree. Where they agree: retinal vein occlusion on a MEK inhibitor means stopping for good; a new visual disturbance on an FGFR or MEK inhibitor means an eye examination, urgently or promptly in most of the texts; retinal fluid on an FGFR or MEK inhibitor is managed by withholding and lowering the dose; pemigatinib needs an examination with OCT before starting, every 2 months for 6 months and then every 3 months. Where they differ, both stand on this page: erdafitinib (the EU text adds an examination before starting and Amsler grid tests); futibatinib (US: the pemigatinib schedule; EU: before starting and at 6 weeks); trametinib, binimetinib and cobimetinib (US: examinations at regular intervals; EU: symptom-led); binimetinib and cobimetinib hold times; camizestrant (US: withhold at grade 2 and refer; EU: consider referral, interruption by clinical assessment); brigatinib (both withhold at grade 2; US: examine at grade 2, EU: consider an examination for severe symptoms); datopotamab deruxtecan (US: scheduled examinations; EU: none). Reviews funded by manufacturers add a baseline examination before any MEK inhibitor (may be useful) and before any FGFR inhibitor (recommended); no independent body was found to have graded either.",
    sources: ["us-balversa", "eu-balversa", "us-pemazyre", "eu-pemazyre", "us-lytgobi", "eu-lytgobi", "us-mekinist", "eu-mekinist", "us-mektovi", "eu-mektovi", "us-cotellic", "eu-cotellic", "us-alunbrig", "eu-alunbrig", "us-etcamah", "eu-etcamah", "us-datroway", "eu-datroway", "mek-ocular-oncologist-2024", "fgfr-ae-cellrepmed-2023"],
  },
  variants: [
    {
      name: "Erdafitinib in the EU: an examination before starting and Amsler grid tests",
      differs: "The EU text asks for a baseline examination including an Amsler grid test, fundoscopy, visual acuity and, if available, OCT, and for an Amsler grid test at the monthly examinations. Its dose table counts an abnormal Amsler grid test as grade 1. The US label read asks for monthly examinations and names neither a baseline examination nor the Amsler grid.",
      evidence: "Regulatory texts, not graded. In the erdafitinib trials, as their sponsor reports them, every patient had an eye examination at screening and an Amsler grid test at screening and on day 1 of every cycle from cycle 2; retinopathy occurred in 21.5 per cent of 479 patients in the pooled urothelial studies, most of it within 90 days, with no grade 4 events (analysis sponsored by Johnson & Johnson).",
      sources: ["eu-balversa", "us-balversa", "erdafitinib-retinopathy-2026"],
    },
    {
      name: "Futibatinib in the EU: two examinations, not a continuing schedule",
      differs: "The EU text asks for an eye examination before starting, 6 weeks later, and urgently at any time for visual symptoms. The US label asks for an examination with OCT of the macula before starting, every 2 months for the first 6 months and every 3 months after that.",
      evidence: "Regulatory texts, not graded. Both say the trials did not routinely use OCT; the EU text adds that the incidence of detachment without symptoms is therefore unknown. The EU text reports serous retinal detachment in 6.2 per cent and the US label retinal pigment epithelial detachment in 9 per cent of 318 patients.",
      sources: ["eu-lytgobi", "us-lytgobi"],
    },
    {
      name: "MEK inhibitors in the EU: symptom-led eye examination",
      differs: "The EU texts of trametinib, binimetinib and cobimetinib ask for patients to be assessed for new or worsening visual disturbances (binimetinib and cobimetinib: at each visit) and for an eye examination when there are symptoms. The US labels of the same drugs ask in addition for examinations periodically or at regular intervals.",
      evidence: "Regulatory texts, not graded. A 2024 review sponsored by the maker of binimetinib states that there is currently no recommendation for routine ocular screening of patients on MEK inhibitors, that a baseline examination may be useful for all, and that all patients reporting visual disturbance should be referred for prompt ophthalmologic review.",
      sources: ["eu-mekinist", "eu-mektovi", "eu-cotellic", "us-mekinist", "us-mektovi", "us-cotellic", "mek-ocular-oncologist-2024"],
    },
    {
      name: "A baseline eye examination before any FGFR inhibitor",
      differs: "A 2023 review recommends a baseline ophthalmologic evaluation before starting any FGFR inhibitor, with education about eye effects. The US erdafitinib label read does not ask for one; the EU erdafitinib text and both pemigatinib and futibatinib texts do.",
      evidence: "A narrative review by two authors, sponsored by Incyte (the maker of pemigatinib), not graded.",
      sources: ["fgfr-ae-cellrepmed-2023", "us-balversa", "eu-balversa"],
    },
    {
      name: "Camizestrant: symptom-guided monitoring without routine eye examinations",
      differs: "No routine eye examination; patients are told about photopsia and asked to report new visual symptoms. In the SERENA-6 trial grade 1 visual effects needed no dose change, and grade 2 or worse meant interrupting camizestrant until symptoms resolved, with referral for an eye assessment if deemed appropriate.",
      evidence: "SERENA-6 (315 patients; funded by AstraZeneca, with AstraZeneca authors): visual effect adverse events in 31.6 per cent on camizestrant with a CDK4/6 inhibitor against 16.1 per cent on an aromatase inhibitor with a CDK4/6 inhibitor; 90 per cent were grade 1 and none led to discontinuation; no changes in visual acuity or ocular structure were observed.",
      sources: ["camizestrant-serena6-visual-2026", "us-etcamah", "eu-etcamah"],
    },
    {
      name: "Symptom-based monitoring where there is no eye clinic on site",
      differs: "A 2026 Japanese review for non-ophthalmologic settings advises relying on patient-reported symptoms and simple inspection at each cycle, with early referral for moderate symptoms. It makes an exception for drugs that need specialised monitoring, naming MEK inhibitors among them: these are to be given only where the examinations regulators require can be done.",
      evidence: "A literature review with the authors' recommendations, not graded; it declares no specific grant.",
      sources: ["ocular-asia-ijco-2026"],
    },
    {
      name: "Bemarituzumab (investigational): corneal events graded from the eye examination",
      differs: "Bemarituzumab is an antibody directed at FGFR2b, not a tablet FGFR inhibitor. The paper read says the cornea is the main part of the eye affected, that corneal adverse events such as dry eye, keratitis and corneal epithelial defect were reported in up to two-thirds of patients in the bemarituzumab arm of the phase 2 FIGHT trial, and that retinal pigment epithelial detachment was not observed there. Its trials grade these events on a scale built by the manufacturer from eye examination findings, with visual acuity graded separately.",
      evidence: "A commentary written mostly by Amgen employees with writing support funded by Amgen. It gives a grading scale, not a management rule, and says the scale may not serve another product. No label exists.",
      sources: ["bemarituzumab-grading-2025"],
    },
  ],
  grades: [
    { claim: "Erdafitinib, EU: an examination before starting, including an Amsler grid test (the US label read names neither)", grade: "EU summary of product characteristics, not graded", source: "eu-balversa", quote: "Prior to initiating Balversa, a baseline ophthalmological exam including an Amsler grid test, fundoscopy, visual acuity and, if available, an optical coherence tomography (OCT) should be performed." },
    { claim: "Pemigatinib, EU: the same examination schedule as the US label", grade: "EU summary of product characteristics, not graded", source: "eu-pemazyre", quote: "Ophthalmological examination, including optical coherence tomography (OCT) should be performed prior to initiation of therapy and every 2 months for the first 6 months of treatment, every 3 months afterwards, and urgently at any time for visual symptoms." },
    { claim: "Futibatinib, US: examination with OCT before starting, every 2 months for 6 months, then every 3 months", grade: "US prescribing information, not graded", source: "us-lytgobi", quote: "Perform a comprehensive ophthalmological examination, including OCT of the macula, prior to initiation of therapy, every 2 months for the first 6 months, and every 3 months thereafter." },
    { claim: "Futibatinib, EU: examination before starting and 6 weeks later (differs from the US label)", grade: "EU summary of product characteristics, not graded", source: "eu-lytgobi", quote: "Ophthalmological examination should be performed prior to initiation of therapy, 6 weeks thereafter, and urgently at any time for visual symptoms." },
    { claim: "Binimetinib, US: eye evaluation within 24 hours for acute vision loss or other visual disturbance", grade: "US prescribing information, not graded", source: "us-mektovi", quote: "Perform ophthalmologic evaluation for patient-reported acute vision loss or other visual disturbance within 24 hours." },
    { claim: "Binimetinib, EU: assessment for visual symptoms at each visit, with no scheduled examination", grade: "EU summary of product characteristics, not graded", source: "eu-mektovi", quote: "Patients should be assessed at each visit for symptoms of new or worsening visual disturbances." },
    { claim: "Trametinib, EU: not recommended after a retinal vein occlusion", grade: "EU summary of product characteristics, not graded", source: "eu-mekinist", quote: "Trametinib is not recommended in patients with a history of RVO." },
    { claim: "Cobimetinib, US: examination at regular intervals and for new or worsening visual disturbances", grade: "US prescribing information, not graded", source: "us-cotellic", quote: "Perform an ophthalmological evaluation at regular intervals and any time a patient reports new or worsening visual disturbances." },
    { claim: "Cobimetinib, EU: examination when visual disturbances are identified", grade: "EU summary of product characteristics, not graded", source: "eu-cotellic", quote: "If symptoms of new or worsening visual disturbances are identified, an ophthalmologic examination is recommended." },
    { claim: "Selumetinib, US: assessments before starting, at regular intervals and for visual changes", grade: "US prescribing information, not graded", source: "us-koselugo", quote: "Conduct comprehensive ophthalmic assessments prior to initiating KOSELUGO, at regular intervals during treatment, and for new or worsening visual changes." },
    { claim: "Selumetinib, EU: evaluation before starting and when new visual disturbances are reported", grade: "EU summary of product characteristics, not graded", source: "eu-koselugo", quote: "In line with clinical practice an ophthalmological evaluation prior to treatment initiation and at any time a patient reports new visual disturbances is recommended." },
    { claim: "Crizotinib, EU, adults: evaluation if a vision disorder persists or worsens", grade: "EU summary of product characteristics, not graded", source: "eu-xalkori", quote: "Ophthalmological evaluation is recommended if vision disorder persists or worsens in severity" },
    { claim: "Brigatinib, EU warning: evaluation and dose reduction to be considered for severe visual symptoms (the US label asks for an examination at grade 2 or worse; both dose tables withhold at grade 2)", grade: "EU summary of product characteristics, not graded", source: "eu-alunbrig", quote: "For new or worsening severe visual symptoms, an ophthalmologic evaluation and dose reduction should be considered" },
    { claim: "Camizestrant, EU: interruption for visual effects left to clinical assessment (the US label says withhold at grade 2)", grade: "EU summary of product characteristics, not graded", source: "eu-etcamah", quote: "Decision regarding treatment interruption should be based on clinical assessment." },
    { claim: "Datopotamab deruxtecan, EU: lubricant drops several times daily (the US label says at least four times daily)", grade: "EU summary of product characteristics, not graded", source: "eu-datroway", quote: "Patients should be advised to use preservative-free lubricant eye drops several times daily for prophylaxis." },
    { claim: "MEK inhibitors: no recommendation for routine eye screening exists", grade: "narrative review sponsored by a manufacturer, ungraded", source: "mek-ocular-oncologist-2024", quote: "There is currently no recommendation for the routine ocular screening of patients undergoing MEK inhibitor therapy." },
    { claim: "FGFR inhibitors: a baseline eye evaluation recommended for all patients", grade: "narrative review sponsored by a manufacturer, ungraded", source: "fgfr-ae-cellrepmed-2023", quote: "A baseline ophthalmologic evaluation before starting FGFR inhibitors is recommended for all patients, along with education regarding the potential for ocular toxicities." },
    { claim: "Erdafitinib retinopathy can be managed by lowering, interrupting or stopping the dose", grade: "pooled analysis by the manufacturer, ungraded", source: "erdafitinib-retinopathy-2026", quote: "FGFRi-associated retinopathy with erdafitinib can be managed with dose reductions, interruptions, or discontinuations." },
    { claim: "Camizestrant: a symptom-guided approach, not routine eye examination", grade: "trial analysis funded by the manufacturer, ungraded", source: "camizestrant-serena6-visual-2026", quote: "Collectively, these data support a symptom-guided approach rather than routine ophthalmological examination." },
    { claim: "MEK inhibitors need co-management with an ophthalmologist", grade: "literature review with authors' recommendations, ungraded", source: "ocular-asia-ijco-2026", quote: "For specific high-risk agents requiring specialized monitoring—such as belantamab mafodotin and mirvetuximab soravtansine (which require frequent slit-lamp exams for keratopathy) or MEK inhibitors (which require retinal evaluation)—direct co-management with an ophthalmologist is mandatory." },
    { claim: "The bemarituzumab grading scale is for that drug only", grade: "commentary by the manufacturer, ungraded", source: "bemarituzumab-grading-2025", quote: "This scale is intended for use with bemarituzumab and may not serve the needs of another product with ocular side effects." },
  ],
  sources: [
    { key: "us-balversa", label: "BALVERSA (erdafitinib) prescribing information (revised 10/2024; DailyMed version 14)", publisher: "Janssen Products, via DailyMed (US National Library of Medicine)", year: 2024, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=2a8aa5c0-6c92-4566-8c45-e8f4d1fc20ee", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "eu-balversa", label: "Balversa (erdafitinib) EU product information: summary of product characteristics and package leaflet (PDF dated 19 May 2026)", publisher: "European Medicines Agency", year: 2026, url: "https://www.ema.europa.eu/en/documents/product-information/balversa-epar-product-information_en.pdf", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "us-pemazyre", label: "PEMAZYRE (pemigatinib) prescribing information (DailyMed version 17, effective 9 June 2026)", publisher: "Incyte, via DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=9e1f2222-1d89-4e63-989c-ccebe2ab1eb4", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "eu-pemazyre", label: "Pemazyre (pemigatinib) EU product information (PDF dated 2 November 2026)", publisher: "European Medicines Agency", year: 2026, url: "https://www.ema.europa.eu/en/documents/product-information/pemazyre-epar-product-information_en.pdf", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "us-lytgobi", label: "LYTGOBI (futibatinib) prescribing information (revised 10/2026; DailyMed version 9)", publisher: "Taiho Pharmaceutical, via DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=0b1332a1-0581-4707-9bf6-1eccfa39bef4", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "eu-lytgobi", label: "Lytgobi (futibatinib) EU product information (PDF dated 3 October 2025)", publisher: "European Medicines Agency", year: 2025, url: "https://www.ema.europa.eu/en/documents/product-information/lytgobi-epar-product-information_en.pdf", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "us-mekinist", label: "MEKINIST (trametinib) prescribing information (revised March 2025; DailyMed version 35)", publisher: "Novartis, via DailyMed (US National Library of Medicine)", year: 2025, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=0002ad27-779d-42ab-83b5-bc65453412a1", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "eu-mekinist", label: "Mekinist (trametinib) EU product information (PDF dated 19 May 2026)", publisher: "European Medicines Agency", year: 2026, url: "https://www.ema.europa.eu/en/documents/product-information/mekinist-epar-product-information_en.pdf", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "us-mektovi", label: "MEKTOVI (binimetinib) prescribing information (revised 10/2023; DailyMed version 12)", publisher: "Array BioPharma (Pfizer), via DailyMed (US National Library of Medicine)", year: 2023, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=6c3408ac-d401-4925-8a03-26591afbc240", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "eu-mektovi", label: "Mektovi (binimetinib) EU product information (PDF dated 1 November 2026)", publisher: "European Medicines Agency", year: 2026, url: "https://www.ema.europa.eu/en/documents/product-information/mektovi-epar-product-information_en.pdf", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "us-cotellic", label: "COTELLIC (cobimetinib) prescribing information (DailyMed version 24, effective 29 July 2026)", publisher: "Genentech, via DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=c387579e-cee0-4334-bd1e-73f93ac1bde6", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "eu-cotellic", label: "Cotellic (cobimetinib) EU product information (PDF dated 13 June 2025)", publisher: "European Medicines Agency", year: 2025, url: "https://www.ema.europa.eu/en/documents/product-information/cotellic-epar-product-information_en.pdf", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "us-koselugo", label: "KOSELUGO (selumetinib) prescribing information (revised 11/2025; DailyMed version 17)", publisher: "AstraZeneca, via DailyMed (US National Library of Medicine)", year: 2025, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=7d042c61-f28f-4ab5-ab10-d7558c0d49ff", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "eu-koselugo", label: "Koselugo (selumetinib) EU product information (PDF dated 14 October 2026)", publisher: "European Medicines Agency", year: 2026, url: "https://www.ema.europa.eu/en/documents/product-information/koselugo-epar-product-information_en.pdf", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "us-xalkori", label: "XALKORI (crizotinib) prescribing information (revised Sep 2023; DailyMed version 47)", publisher: "Pfizer, via DailyMed (US National Library of Medicine)", year: 2023, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=2a51b0de-47d6-455e-a94c-d2c737b04ff7", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "eu-xalkori", label: "Xalkori (crizotinib) EU product information (PDF dated 19 August 2025)", publisher: "European Medicines Agency", year: 2025, url: "https://www.ema.europa.eu/en/documents/product-information/xalkori-epar-product-information_en.pdf", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "us-alunbrig", label: "ALUNBRIG (brigatinib) prescribing information (revised October 2024; DailyMed version 17)", publisher: "Takeda, via DailyMed (US National Library of Medicine)", year: 2024, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=0fe9ff20-d402-41f3-bc1e-7002ea7007db", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "eu-alunbrig", label: "Alunbrig (brigatinib) EU product information (PDF dated 23 April 2025)", publisher: "European Medicines Agency", year: 2025, url: "https://www.ema.europa.eu/en/documents/product-information/alunbrig-epar-product-information_en.pdf", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "us-etcamah", label: "ETCAMAH (camizestrant) prescribing information (DailyMed version 1, effective 4 September 2026)", publisher: "AstraZeneca, via DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=c54223d3-f3c7-4186-afa0-429d84805826", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "eu-etcamah", label: "Etcamah (camizestrant) EU product information (PDF dated 15 June 2026)", publisher: "European Medicines Agency", year: 2026, url: "https://www.ema.europa.eu/en/documents/product-information/etcamah-epar-product-information_en.pdf", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "us-datroway", label: "DATROWAY (datopotamab deruxtecan-dlnk) prescribing information (revised 05/2026; DailyMed version 18)", publisher: "Daiichi Sankyo, via DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=2950227c-6230-4ca4-a135-46e44d9424a0", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "eu-datroway", label: "Datroway (datopotamab deruxtecan) EU product information (PDF dated 24 June 2026)", publisher: "European Medicines Agency", year: 2026, url: "https://www.ema.europa.eu/en/documents/product-information/datroway-epar-product-information_en.pdf", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "us-tamoxifen", label: "Tamoxifen citrate tablets prescribing information and patient information (revised 7/2021; DailyMed version 14)", publisher: "Mylan Pharmaceuticals, via DailyMed (US National Library of Medicine)", year: 2021, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=7ee3d3d2-85d1-4018-8e70-5ed8a64ae1f0", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "mek-ocular-oncologist-2024", label: "Ocular Effects of MEK Inhibitor Therapy: Literature Review, Clinical Presentation, and Best Practices for Mitigation (sponsored by Array BioPharma; medical writing funded by Pfizer)", publisher: "The Oncologist (Jeng-Miller, Miller and Heier)", year: 2024, url: "https://doi.org/10.1093/oncolo/oyae014", doi: "10.1093/oncolo/oyae014", gradingScheme: "Narrative review with the authors' practice; recommendations not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "erdafitinib-retinopathy-2026", label: "Incidence and outcomes of FGFR inhibitor-associated retinopathy of patients treated with oral erdafitinib across the clinical trial program (sponsored by Johnson & Johnson, with Johnson & Johnson authors)", publisher: "The Oncologist (O'Hagan et al.)", year: 2026, url: "https://doi.org/10.1093/oncolo/oyag174", doi: "10.1093/oncolo/oyag174", gradingScheme: "Pooled trial safety analysis; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "fgfr-ae-cellrepmed-2023", label: "Clinical development and management of adverse events associated with FGFR inhibitors (sponsored by Incyte; medical writing funded by Incyte)", publisher: "Cell Reports Medicine (Subbiah and Verstovsek)", year: 2023, url: "https://doi.org/10.1016/j.xcrm.2023.101204", doi: "10.1016/j.xcrm.2023.101204", gradingScheme: "Narrative review; recommendations not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "camizestrant-serena6-visual-2026", label: "SERENA-6 visual patient-reported outcomes and safety: camizestrant for emerging ESR1m advanced breast cancer during first-line endocrine-based therapy (funded by AstraZeneca, with AstraZeneca authors)", publisher: "The Oncologist (Brufsky et al.)", year: 2026, url: "https://doi.org/10.1093/oncolo/oyag278", doi: "10.1093/oncolo/oyag278", gradingScheme: "Randomised trial analysis; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "bemarituzumab-grading-2025", label: "Advancing Ocular Safety Profile Assessment: A Novel Grading Scale for Ocular Adverse Reactions Associated with Bemarituzumab (Amgen authors; medical writing funded by Amgen)", publisher: "Ophthalmology and Therapy (Farooq et al.)", year: 2025, url: "https://doi.org/10.1007/s40123-025-01139-6", doi: "10.1007/s40123-025-01139-6", gradingScheme: "Commentary; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "ocular-asia-ijco-2026", label: "Ocular toxicities associated with anticancer drug therapy in Asian patients: a literature review and practical management recommendations for non-ophthalmologic settings", publisher: "International Journal of Clinical Oncology (Iimura et al.)", year: 2026, url: "https://doi.org/10.1007/s10147-026-03096-x", doi: "10.1007/s10147-026-03096-x", gradingScheme: "Literature review with the authors' recommendations; not graded.", read: "full-text", accessed: "2026-11-18" },
  ],
  drugs: ["erdafitinib", "pemigatinib", "futibatinib", "trametinib", "binimetinib", "cobimetinib", "selumetinib", "crizotinib", "brigatinib", "camizestrant", "datopotamab-deruxtecan"],
  terms: ["ocular-toxicity"],
  related: ["eye-care-with-ocular-toxic-antibody-drug-conjugates", "irae-ocular", "hyperphosphataemia-on-fgfr-inhibitors"],
  gaps: [
    "No ESMO, ASCO, NCCN or Royal College of Ophthalmologists guideline on the eye effects of FGFR, MEK or ALK inhibitors was found in a Europe PMC title search on 18 November 2026. Every step but one rests on a drug label, and that one on a manufacturer-sponsored review. A 2020 Chinese recommendation paper on ocular toxicity of targeted therapy and a 2026 consensus on reporting eye events of experimental oncology drugs were found and not read.",
    "No label read says how often 'regular intervals' or 'periodically' means for trametinib, binimetinib, cobimetinib or selumetinib, and no graded recommendation for a baseline eye examination before a MEK inhibitor was found.",
    "The US erdafitinib label read (revised 10/2024) names no eye examination before starting and no Amsler grid; the EU text asks for both. Whether US practice includes a baseline examination is not settled by the label.",
    "Tamoxifen: only the US label of one generic maker (Mylan, revised 7/2021) was read. Tamoxifen has no centrally authorised EU product information, and no UK or other national text was read, so the page cannot say what European labels ask. The US label sets no eye examination schedule and no rule for managing a cataract, and its patient leaflet says only that the sign of a cataract is slow blurring of vision. Published work on tamoxifen retinopathy was not read. Because the record offers a person taking tamoxifen one sentence and no management, tamoxifen was taken out of this record's linked drugs on 18 November 2026, so the page is not shown as the protocol for tamoxifen's cataract risk; that side effect still has no protocol.",
    "Bemarituzumab is investigational and had no label on DailyMed on 18 November 2026. The one paper read (written mostly by Amgen employees) describes how its trials grade corneal events and gives no rule for eye drops, examinations or dose changes, so the drug is not in this record's steps. The phase 2 and phase 3 trial reports were not read.",
    "Not covered by the steps: lorlatinib (its US label and EU text list vision disorder as an adverse reaction and, as read, set no eye warning, examination or dose rule), mirdametinib (its US label and EU text carry an ocular toxicity warning with examinations before starting and at regular intervals; they were read only in part), telisotuzumab vedotin, alectinib, ceritinib, tovorafenib, encorafenib, dabrafenib and vemurafenib (not read; the trametinib and binimetinib texts refer uveitis to the dabrafenib and encorafenib texts).",
    "Uveitis on a BRAF and MEK inhibitor combination is not covered: the US binimetinib label has a uveitis rule, and the EU texts send the reader to the partner drug's text, which was not read.",
    "The EU product information PDFs print no revision date; the dates given are the PDFs' own modification dates. The EU cobimetinib text read does not mention retinal vein occlusion; that is reported as found, not as a statement that the rule does not apply in the EU.",
    "The review papers are narrative and, except the Japanese review, were sponsored by a manufacturer or written with its employees: Array BioPharma and Pfizer (MEK review), Johnson & Johnson (erdafitinib analysis), Incyte (FGFR review), AstraZeneca (camizestrant analysis), Amgen (bemarituzumab commentary).",
    "When to call: the US patient information of most of these drugs says to tell the healthcare provider right away about vision changes; the camizestrant patient information says only to tell the provider, and none of the texts read tells patients to go to an emergency department.",
    "UK texts (MHRA summaries of product characteristics, NICE, NHS pages) were not read.",
  ],
});
