import { protocol } from "./helpers";

/*
 * Bladder filling and rectal preparation for prostate radiotherapy.
 *
 * No guideline grades its recommendations on this subject. The UK Radiotherapy Board's On target 2 (2021) has a
 * prostate section with ungraded recommendations on bowel and bladder preparation; the first pass missed it. The ESTRO
 * ACROP consensus guideline on IGRT for localised prostate cancer (Ghadjar et al., Radiother Oncol 2019) could be read
 * only as an abstract, so no step rests on it. The other steps rest on a randomised trial, systematic reviews, a
 * narrative review and a 2026 single-centre study, each named.
 *
 * Second accuracy pass, 17 November 2026. Every source was fetched again as raw text (curl; Europe PMC REST for
 * abstracts and for PubMed Central full-text XML, tags stripped by script) and each claim re-read against it:
 * - On target 2 (Radiotherapy Board, June 2021): full text, the open PDF read with pdftotext; a copy saved the same day
 *   for the sibling protocol on image guidance was re-used. Section 10.10 (prostate) is the part used here.
 * - Alexander et al. (Clin Transl Radiat Oncol 2026, Royal Marsden): full text (PMC13276509); and the published comment
 *   on it (Gupta et al. 2026): full text (PMC13544102).
 * - Nasser et al. (Tech Innov Patient Support Radiat Oncol 2021): full text (PMC7851838). Its first author declares a
 *   patent on a catheter the paper describes; it is used here only for its review of filling methods.
 * - Chen et al., meta-analysis of water volume (Biomed J 2021): now open, full text (PMC9068550); the first pass had
 *   the abstract only.
 * - Mullaney et al. (Pract Radiat Oncol 2014), McNair et al. (Pract Radiat Oncol 2014), McGuffin et al. (Pract Radiat
 *   Oncol 2018), Ward et al., SPoRT (J Med Imaging Radiat Oncol 2022), Weston et al. (Nutr Cancer 2020): abstracts
 *   only, Europe PMC; none has an open full text.
 * - ESTRO ACROP guideline (2019): abstract only; the DOI led to the publisher's redirect page and no open copy was
 *   found. No newer edition is listed in Europe PMC or Crossref.
 *
 * Every DOI was resolved through Europe PMC and its title checked. Every quote was checked by script against the saved
 * text (whitespace and line breaks only). Changed in this pass: the UK guidance added, with its figures kept apart
 * from the trial figures; orders softened where the source hedges; the instruction to wait or drink more, and to tell
 * the patient no method is best, removed as no source read states them; the claim that enemas did not change movement
 * during treatment corrected (that was measured only in patients without preparation); the antiflatulent trial
 * reported as measuring rectal diameter, not volume; patient counts given as the sources print them.
 */
export const prostateRadiotherapyBladderAndRectalPreparation = protocol({
  id: "prostate-radiotherapy-bladder-and-rectal-preparation",
  name: "Bladder filling and rectal preparation for prostate radiotherapy",
  aka: ["bladder filling protocol", "full bladder for radiotherapy", "drinking water before radiotherapy", "rectal preparation for radiotherapy", "micro-enema before radiotherapy", "bowel preparation for prostate radiotherapy", "empty bowel radiotherapy", "bladder scan before radiotherapy"],
  domain: "radiotherapy",
  tldr: "For prostate radiotherapy you are often asked to empty your bladder and then drink a set amount of water before the planning scan and every treatment. A full bladder can move the bowel away from the radiation. UK guidance asks centres to have a bowel-emptying routine too, such as a small enema or laxative; one 2026 hospital study suggests not everyone needs it when daily scans check the position.",
  simple: "Empty your bladder, then drink the amount of water your team tells you, at the same time before every treatment. Some people are also asked to empty their bowel first. Your own team's instructions come first.",
  summary: "No guideline grades its recommendations on bladder or rectal preparation for prostate radiotherapy, and practice varies. The UK Radiotherapy Board's On target 2 (2021, ungraded) recommends written guidance for patients on the department's bowel and bladder protocols, says bowel-emptying protocols should be in place, recommends a bladder volume of 150 to 300 ml if achievable at planning and treatment, and recommends a repeat scan after voiding if the rectum is more than 4 cm front to back on the planning scan.\n\nBladder: a full bladder can potentially move small bowel out of the treated region and lower bowel dose, but drinking protocols give inconsistent volumes from day to day (Nasser 2021 review). In a single-institution randomised trial of 110 patients, 540 ml of water gave less bladder volume variation than 1080 ml (median 76 against 105 ml) with no increase in toxicity. A 2021 meta-analysis of 11 studies (417 patients) concluded that 300 to 400 ml potentially gives the best reproducibility: the mean difference in bladder volume between treatment and the planning scan was about 12 ml after 300 to 400 ml, and about 46 ml (smaller at treatment) after 500 to 540 ml or after drinking to a feeling of fullness. The Nasser review calls cone-beam CT before each fraction useful for checking filling.\n\nRectum: a 2014 systematic review of 18 papers found no robust evidence for one rectal emptying method over another, which On target 2 repeats. A randomised trial of an antiflatulent (78 patients) found no significant difference in planning rescans or rectal diameter; the SPoRT trial of simethicone (30 patients) found no significant difference in rectal or gas volume; a small trial (8 and 9 patients) found an osmotic laxative gave less rectal gas than a bulking laxative with probiotic. At the Royal Marsden, with daily cone-beam CT, 18% of patients using a micro-enema and 28% of those without had a large rectum (90 cm³ or more) on the planning CT (255 patients had movement data, 96 with and 159 without an enema), which the authors summarise as a reduction of only 10 to 15%; movement of the prostate between treatments differed little, and in a further 40 patients without preparation a large rectum did not increase movement during treatment. The authors conclude preparation is not universally required and recommend intervention where a large rectum coincides with seminal vesicle involvement or a high risk of it. A published comment reads the same data as support for risk-adapted, not universal, omission. The ESTRO ACROP IGRT guideline (2019) is cited by Alexander et al. as not recommending preparation as routine practice; its full text could not be read.",
  asOf: "2026-11-17",
  setting: {
    who: ["radiographer", "patient-or-carer"],
    where: ["radiotherapy-department", "home"],
  },
  population: "Adults having external beam radiotherapy to the prostate or prostate bed, with or without the pelvic lymph nodes, using daily image guidance. Bladder and rectal preparation for cervical, bladder, rectal and gynaecological radiotherapy, and for brachytherapy, use different volumes and rules and are not covered.",
  trigger: "Booking of the radiotherapy planning CT; then before each treatment.",
  steps: [
    {
      action: "Give the patient written guidance on the department's bowel and bladder protocols",
      why: "The UK guidance recommends it, alongside having bowel and bladder protocols in the department. It gives no further reason.",
      source: "on-target-2-2021",
      quote: "We recommend providing patients with written guidance on the department’s bowel and bladder protocols.",
      grade: "Not graded (UK consensus guidance)",
    },
    {
      action: "Ask the patient to empty their bladder, then drink the set volume of water at the set time before the planning CT and before every treatment (300 to 540 ml, 30 to 60 minutes before, in most of the studies pooled)",
      why: "A full bladder can move the bowel away from the radiation. In the pooled studies the bladder at treatment was closest to its planning size after 300 to 400 ml, and the authors say that amount is easier to drink than 500 ml.",
      source: "chen-water-volume-2021",
      quote: "Consuming 300-400 ml of water potentially leads to the best bladder volume reproducibility; moreover, the higher the water consumption volume, the lower the bladder volume reproducibility.",
      grade: "Systematic review and meta-analysis (10 cohort studies, 1 randomised trial)",
    },
    {
      action: "In the UK, aim for a bladder volume of 150 to 300 ml at the planning scan and at treatment, if the patient can achieve it",
      why: "The UK guidance says a consistent bladder volume between planning and treatment is important, and that a full bladder lowers the dose to the small bowel and bladder but can be difficult to reproduce. This figure is the volume in the bladder, not the amount drunk.",
      source: "on-target-2-2021",
      quote: "A bladder volume of 150 ml to 300 ml, if achievable, for pretreatment and treatment is recommended.",
      grade: "Not graded (UK consensus guidance)",
    },
    {
      action: "Prefer a moderate drink to a very large one: in one trial 540 ml gave less day-to-day variation than 1080 ml, with no increase in side effects",
      why: "In the trial, a larger bladder at the planning scan went with larger changes in bladder volume during the course.",
      source: "mullaney-2014",
      quote: "The 540 mL bladder-filling arm resulted in reproducible BVs throughout a course of RT, without any deterioration in QoL or increase in toxicities for prostate patients.",
      grade: "Randomised trial (110 patients, single institution)",
    },
    {
      action: "When the pelvic lymph nodes are treated, prefer a full bladder",
      why: "The review says a full bladder limits the radiation dose to the small bowel when the nodes are treated, while an empty bladder could be feasible for treatment of the prostate alone.",
      source: "nasser-bladder-2021",
      quote: "While treating prostate only with empty bladder could be feasible, treating the prostate and pelvic lymph nodes should be preferably done with a full bladder, to limit the radiation dose to the small bowel.",
      grade: "Narrative review",
    },
    {
      action: "Use the cone-beam CT taken before each treatment to check bladder filling",
      why: "Even with a drinking routine the amount of urine in the bladder differs between visits, and the scan shows it before the dose is given.",
      source: "nasser-bladder-2021",
      quote: "CBCT prior each fraction of RT is useful for urine volume estimation in order to ensure consistent bladder filling for RT.",
      grade: "Narrative review",
    },
    {
      action: "Have a bowel-emptying protocol in place, as UK guidance asks; mini-enemas, oral laxatives and dietary measures are the options it lists",
      why: "The UK guidance says an empty bowel is more like the bowel during treatment, reduces the dose to the rectum and so may decrease side effects, and may reduce movement of the prostate caused by the rectum.",
      source: "on-target-2-2021",
      quote: "Bowel preparation: bowel-emptying protocols should be in place.",
      grade: "Not graded (UK consensus guidance)",
    },
    {
      action: "Where daily 3D image guidance is used, consider whether every patient needs rectal preparation; one centre's 2026 study concluded that not all do",
      why: "At that centre, with a scan before each treatment, the position of the prostate from day to day differed little with or without micro-enemas, and enemas reduced the share of patients with a large rectum on the planning scan by 10 to 15%.",
      source: "alexander-rectal-2026",
      quote: "Findings suggest rectal preparation is not universally required with contemporary IGRT.",
      grade: "Single-centre service evaluation and audit (255 and 40 patients), not randomised",
    },
    {
      action: "Assess the rectum at the planning scan; UK guidance recommends a repeat scan after voiding if it is more than 4 cm front to back",
      why: "The threshold is the UK guidance's own. The Royal Marsden study used different limits (4.5 cm with an enema, 5.0 cm without), so the figure depends on the centre.",
      source: "on-target-2-2021",
      quote: "Assess rectal volume prior to the full CT scan; if a rectal AP diameter >4 cm is seen, a repeat scan is recommended after voiding.",
      grade: "Not graded (UK consensus guidance)",
    },
    {
      action: "Where the planning CT shows a large rectum (90 cm³ or more in the study) and the seminal vesicles are involved or at high risk, intervene: the authors prefer online adaptive radiotherapy, and name a repeat scan with rectal preparation as another option",
      why: "Changes in rectal volume between treatments can leave the seminal vesicles underdosed, because they move independently of the prostate.",
      source: "alexander-rectal-2026",
      quote: "Interfraction changes in rectal volume can lead to significant underdosing of seminal vesicles therefore we do recommend further intervention for patients with both a large rectum on pCT and seminal vesicle involvement, or a high risk of seminal vesicle involvement.",
      grade: "Single-centre service evaluation and audit (255 and 40 patients), not randomised",
    },
    {
      action: "If rectal preparation is used, choose the method locally: no method has been shown to be better than another",
      why: "The review covered evacuation techniques, diet, laxatives and enemas, alone or combined, and found no robust evidence to prefer one.",
      source: "mcnair-rectal-review-2014",
      quote: "There is no robust evidence to recommend one rectal emptying strategy over another.",
      grade: "Systematic review (18 papers)",
    },
  ],
  bestInClass: {
    statement: "No guideline grades its recommendations here. The UK Radiotherapy Board (On target 2, 2021) recommends written patient guidance, says bowel-emptying protocols should be in place, recommends a bladder volume of 150 to 300 ml if achievable and a repeat planning scan after voiding if the rectum is more than 4 cm front to back; these are UK recommendations, not graded. On drinking, the pooled studies favour a moderate, timed drink after emptying the bladder (300 to 400 ml potentially the most reproducible, Chen 2021; 540 ml less variable than 1080 ml, Mullaney 2014), a full bladder is preferred when the pelvic nodes are treated, and the pre-treatment scan is used to check filling (Nasser 2021). Where the sources differ on the rectum: On target 2 says bowel-emptying protocols should be in place; Alexander et al. (2026, one centre, daily cone-beam CT) conclude preparation is not universally required and say the ESTRO ACROP guideline (2019) does not recommend it as routine practice, while recommending intervention for a large rectum with seminal vesicle involvement or high risk; the published comment reads their data as support for risk-adapted omission only, pending prospective study. No method of rectal emptying has been shown better than another (McNair 2014).",
    sources: ["on-target-2-2021", "chen-water-volume-2021", "mullaney-2014", "nasser-bladder-2021", "alexander-rectal-2026", "gupta-comment-2026", "mcnair-rectal-review-2014"],
  },
  variants: [
    {
      name: "Empty bladder, then 350 ml of water one hour before (Royal Marsden)",
      differs: "Patients empty their bladder an hour before planning and treatment and drink 350 ml of water; micro-enema use depends on the radiotherapy prescription. The planning scan was repeated if the rectal diameter exceeded 4.5 cm with an enema or 5.0 cm without.",
      evidence: "Described as the routine for the patients in the Alexander 2026 study; 350 ml is within the range the meta-analysis found potentially most reproducible.",
      sources: ["alexander-rectal-2026", "chen-water-volume-2021"],
    },
    {
      name: "Drinking until the bladder feels comfortably full",
      differs: "No set volume; the patient drinks until they feel full.",
      evidence: "In the meta-analysis the mean difference in bladder volume between treatment and the planning scan was about 46 ml (smaller at treatment) with this method, against about 12 ml after 300 to 400 ml. The Nasser review cites a study where patients reporting a comfortably full bladder had an adequately full bladder only 76.5% of the time.",
      sources: ["chen-water-volume-2021", "nasser-bladder-2021"],
    },
    {
      name: "Bladder ultrasound scan before treatment, with biofeedback",
      differs: "A portable bladder scanner measures the volume before treatment; in one protocol the scan was repeated every 15 minutes, aiming for 250 ml of urine.",
      evidence: "The Nasser review cites one study where 93% of patients on a scan protocol were ready after the cone-beam CT against 75% without, and another where feedback did not improve filling; overall it judges protocols, ultrasound and biofeedback to fall short of consistent filling. On target 2 says a bladder scanner has limited utility.",
      sources: ["nasser-bladder-2021", "on-target-2-2021"],
    },
    {
      name: "Empty bladder for prostate-only treatment",
      differs: "The bladder is kept empty, in one single-fraction schedule with a catheter.",
      evidence: "Described as possibly feasible for prostate-only treatment in the Nasser review, citing a report of non-inferior outcomes; the review prefers a full bladder when the pelvic nodes are treated.",
      sources: ["nasser-bladder-2021"],
    },
    {
      name: "Antiflatulent (simethicone) as bowel preparation",
      differs: "Patients take an antiflatulent medicine to reduce rectal gas.",
      evidence: "Two randomised trials found no overall benefit: one (78 patients) found no significant difference in planning rescans or in rectal diameter between arms; SPoRT (30 patients) found rectal and gas volume not significantly different, with less variability in rectal volume from week three onwards on simethicone, which its authors say needs a larger study.",
      sources: ["mcguffin-antiflatulent-2018", "ward-sport-2022"],
    },
    {
      name: "Laxatives with a low-gas diet",
      differs: "Patients follow a low-gas diet and take a laxative during treatment.",
      evidence: "A trial of two groups of 8 and 9 patients found an osmotic laxative gave lower rectal gas than a bulking laxative with probiotic (OR 3.2 for a higher gas rating with the bulking regimen); the authors call for larger studies.",
      sources: ["weston-laxative-2020"],
    },
  ],
  grades: [
    { claim: "Bowel-emptying protocols should be in place (UK)", grade: "Not graded (UK consensus guidance)", source: "on-target-2-2021", quote: "Bowel preparation: bowel-emptying protocols should be in place." },
    { claim: "540 ml gave less bladder volume variation than 1080 ml", grade: "Randomised trial (110 patients, single institution)", source: "mullaney-2014", quote: "There was significantly less BV variation in the 540 mL arm when compared with 1080 mL (median: 76 mL vs 105 mL, P = .003)." },
    { claim: "The results do not justify rectal preparation for every patient", grade: "Single-centre service evaluation and audit (255 and 40 patients), not randomised", source: "alexander-rectal-2026", quote: "Results do not justify blanket use of rectal preparation for individuals undergoing radiotherapy to their prostate." },
    { claim: "The findings support risk-adapted, not universal, omission of rectal preparation", grade: "Published correspondence", source: "gupta-comment-2026", quote: "The findings are therefore best viewed as supporting risk-adapted deimplementation rather than universal omission of rectal preparation." },
    { claim: "No consensus on bladder filling protocols", grade: "Narrative review", source: "nasser-bladder-2021", quote: "There is no consensus on what bladder filling protocols should be used for prostate external beam radiotherapy." },
  ],
  sources: [
    {
      key: "on-target-2-2021",
      label: "On target 2: updated guidance for image-guided radiotherapy",
      publisher: "Radiotherapy Board (The Royal College of Radiologists, Society and College of Radiographers, Institute of Physics and Engineering in Medicine)",
      year: 2021,
      url: "https://www.ipem.ac.uk/media/fxmkha4j/rt-board-image-guided-rt-guidance-2021.pdf",
      gradingScheme: "Consensus guidance; recommendations are not graded by level of evidence.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "alexander-rectal-2026",
      label: "Is rectal preparation necessary in contemporary image-guided prostate radiotherapy?",
      publisher: "Clinical and Translational Radiation Oncology (Alexander et al., Royal Marsden)",
      year: 2026,
      url: "https://doi.org/10.1016/j.ctro.2026.101207",
      doi: "10.1016/j.ctro.2026.101207",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "gupta-comment-2026",
      label: "Comment on \"Is rectal preparation necessary in contemporary image-guided prostate radiotherapy?\"",
      publisher: "Clinical and Translational Radiation Oncology (Gupta et al.)",
      year: 2026,
      url: "https://doi.org/10.1016/j.ctro.2026.101255",
      doi: "10.1016/j.ctro.2026.101255",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "nasser-bladder-2021",
      label: "Maintaining consistent bladder filling during external beam radiotherapy for prostate cancer",
      publisher: "Technical Innovations and Patient Support in Radiation Oncology (Nasser et al.)",
      year: 2021,
      url: "https://doi.org/10.1016/j.tipsro.2021.01.002",
      doi: "10.1016/j.tipsro.2021.01.002",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "mullaney-2014",
      label: "A randomized trial comparing bladder volume consistency during fractionated prostate radiation therapy",
      publisher: "Practical Radiation Oncology (Mullaney et al.)",
      year: 2014,
      url: "https://doi.org/10.1016/j.prro.2013.11.006",
      doi: "10.1016/j.prro.2013.11.006",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "chen-water-volume-2021",
      label: "Bladder volume reproducibility after water consumption in patients with prostate cancer undergoing radiotherapy: a systematic review and meta-analysis",
      publisher: "Biomedical Journal (Chen et al.)",
      year: 2021,
      url: "https://doi.org/10.1016/j.bj.2020.11.004",
      doi: "10.1016/j.bj.2020.11.004",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "mcnair-rectal-review-2014",
      label: "A systematic review: effectiveness of rectal emptying preparation in prostate cancer patients",
      publisher: "Practical Radiation Oncology (McNair et al.)",
      year: 2014,
      url: "https://doi.org/10.1016/j.prro.2014.06.005",
      doi: "10.1016/j.prro.2014.06.005",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "mcguffin-antiflatulent-2018",
      label: "To prep or not to prep - that is the question: A randomized trial on the use of antiflatulent medication as part of bowel preparation for patients having image guided external beam radiation therapy to the prostate",
      publisher: "Practical Radiation Oncology (McGuffin et al.)",
      year: 2018,
      url: "https://doi.org/10.1016/j.prro.2017.10.012",
      doi: "10.1016/j.prro.2017.10.012",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "ward-sport-2022",
      label: "Randomised controlled trial on the effect of simethicone bowel preparation on rectal variability during image-guided radiation therapy for prostate cancer (SPoRT study)",
      publisher: "Journal of Medical Imaging and Radiation Oncology (Ward et al.)",
      year: 2022,
      url: "https://doi.org/10.1111/1754-9485.13404",
      doi: "10.1111/1754-9485.13404",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "weston-laxative-2020",
      label: "Effects of a laxation and probiotic bowel preparation regimen: a randomized controlled trial in patients undergoing prostate radiation therapy",
      publisher: "Nutrition and Cancer (Weston et al.)",
      year: 2020,
      url: "https://doi.org/10.1080/01635581.2019.1669675",
      doi: "10.1080/01635581.2019.1669675",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "estro-acrop-prostate-igrt-2019",
      label: "ESTRO ACROP consensus guideline on the use of image guided radiation therapy for localized prostate cancer",
      publisher: "ESTRO (Radiotherapy and Oncology; Ghadjar et al.)",
      year: 2019,
      url: "https://doi.org/10.1016/j.radonc.2019.08.027",
      doi: "10.1016/j.radonc.2019.08.027",
      read: "abstract",
      accessed: "2026-11-17",
    },
  ],
  cancers: ["prostate"],
  technologies: ["in-room-imaging-systems", "imrt-igrt"],
  terms: ["radiotherapy", "prostate-radiotherapy-fractionation"],
  related: [],
  upgrades: ["idea-pu-pelvic-filling-protocol", "idea-pu-rectal-spacer-prostate"],
  gaps: [
    "No guideline grades its recommendations on bladder filling or rectal preparation for prostate radiotherapy. On target 2 (2021) is UK consensus guidance; its recommendations are ungraded, and a title search of Europe PMC on 17 November 2026 found no graded guideline from another body. The ESTRO ACROP IGRT guideline (2019) was read only as an abstract on 17 November 2026 (the DOI led to the publisher's redirect page and no open copy was found); its position on preparation is reported here only as Alexander et al. cite it.",
    "On target 2 (2021) and the Royal Marsden study (2026) point different ways on routine rectal preparation, and no source read settles which patients can safely omit preparation; the published comment asks for a prospective study.",
    "The water-volume trial, the rectal emptying review and the three bowel preparation trials were read as abstracts only on 17 November 2026; all the trials are small or single-centre. The meta-analysis was read in full: only one trial contributed to its 1080 ml group, and its authors list as limitations that the studies gave little detail of their methods and that waiting time was not analysed.",
    "No source read gives the best timing between drinking and treatment. The studies pooled by Chen et al. waited 60 minutes after 300 or 350 ml, 30 to 45 minutes after 500 ml, and 30 to 40 minutes after 540 or 1080 ml in the randomised trial; On target 2 gives no drinking volume or waiting time for the prostate.",
    "The figures are of different things and should not be merged: 150 to 300 ml (On target 2) is the volume of urine in the bladder, while 300 to 400 ml, 540 ml and 1080 ml are the amounts drunk. The rectal limits also differ: more than 4 cm front to back (On target 2), 4.5 cm with an enema or 5.0 cm without (Royal Marsden rescan thresholds), and 90 cm³ or more by volume (the Royal Marsden study's definition of a large rectum).",
    "The Alexander 2026 study is not randomised: its first dataset was identified from routine records and its second (40 patients, none using preparation) was sampled prospectively. Its preparation and no-preparation groups differed by prescription, a limitation the published comment sets out, and its authors say differences in rectal volume cannot be attributed solely to enema use. Its table counts 131 and 165 patients where its abstract counts 96 and 159 with movement data, so the percentages are given here as printed. It did not record side effects.",
    "Whether rectal spacers change the need for preparation was not examined. On target 2 says only that hydrogel spacers are stated to be an option by NICE and may be more appropriate in strongly hypofractionated treatment; spacers are an upgrade idea of their own (idea-pu-rectal-spacer-prostate).",
    "No source read lists symptoms for a patient to report or says what to do if the drink cannot be held; the treating team's own instructions cover that.",
    "Bladder and rectal preparation for cervical, rectal, bladder and gynaecological radiotherapy and for brachytherapy is not covered.",
  ],
});
