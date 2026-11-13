import { protocol } from "./helpers";

/*
 * Bladder filling and rectal preparation for prostate radiotherapy.
 *
 * There is no guideline with graded recommendations on this subject. The ESTRO ACROP consensus guideline on IGRT for
 * localised prostate cancer (Ghadjar et al., Radiother Oncol 2019) is the nearest; its full text is held in a
 * restricted repository copy and behind the publisher's bot check, so only its abstract was read and no step rests on
 * it. The steps below rest on randomised trials, systematic reviews and a 2026 cohort study, each named.
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - Alexander et al., Is rectal preparation necessary in contemporary image-guided prostate radiotherapy? (Clin Transl
 *   Radiat Oncol 2026, Royal Marsden, 295 patients): full text, Europe PMC XML (PMC13276509); and the published comment
 *   on it (Gupta et al., Clin Transl Radiat Oncol 2026): full text (PMC13544102).
 * - Nasser et al., Maintaining consistent bladder filling during external beam radiotherapy for prostate cancer (Tech
 *   Innov Patient Support Radiat Oncol 2021): full text (PMC7851838). Its first author declares a patent on a catheter
 *   the paper describes; it is used here only for its review of filling methods.
 * - Mullaney et al., randomised trial of 540 ml against 1080 ml of water (Pract Radiat Oncol 2014); Chen et al.,
 *   systematic review and meta-analysis of water volume (Biomed J 2021); McNair et al., systematic review of rectal
 *   emptying (Pract Radiat Oncol 2014); McGuffin et al., antiflatulent trial (Pract Radiat Oncol 2018); Ward et al.,
 *   SPoRT simethicone trial (J Med Imaging Radiat Oncol 2022); Weston et al., laxative and probiotic trial (Nutr Cancer
 *   2020): abstracts only, Europe PMC.
 * - ESTRO ACROP consensus guideline on IGRT for localised prostate cancer (2019): abstract only.
 *
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied from the raw text unchanged.
 */
export const prostateRadiotherapyBladderAndRectalPreparation = protocol({
  id: "prostate-radiotherapy-bladder-and-rectal-preparation",
  name: "Bladder filling and rectal preparation for prostate radiotherapy",
  aka: ["bladder filling protocol", "full bladder for radiotherapy", "drinking water before radiotherapy", "rectal preparation for radiotherapy", "micro-enema before radiotherapy", "bowel preparation for prostate radiotherapy", "empty bowel radiotherapy", "bladder scan before radiotherapy"],
  domain: "radiotherapy",
  tldr: "For prostate radiotherapy you are usually asked to empty your bladder and then drink a set amount of water before the planning scan and every treatment. A comfortably full bladder pushes the bowel away from the radiation. Some centres also ask for a small enema or laxatives to empty the back passage, but newer studies suggest this is not needed for everyone when daily scans check the position.",
  simple: "Empty your bladder, then drink the amount of water your team tells you, at the same time before every treatment. Some people are also asked to empty their bowel first.",
  summary: "No guideline grades bladder or rectal preparation for prostate radiotherapy, and practice varies. Bladder: a comfortably full bladder lifts small bowel out of the pelvis and lowers bowel dose, but drinking protocols give inconsistent volumes from day to day (Nasser 2021 review). In a randomised trial of 110 men, 540 ml of water gave more reproducible bladder volumes than 1080 ml (median variation 76 against 105 ml) with no more toxicity; a 2021 meta-analysis of 11 studies (417 patients) found 300 to 400 ml gave the best reproducibility and that reproducibility fell as the volume rose. Checking the bladder on imaging before each fraction is the practical safeguard.\n\nRectum: a 2014 systematic review of 18 studies found no robust evidence for one rectal emptying method over another; randomised trials of simethicone (SPoRT, 30 men) and an antiflatulent (78 men) found no reduction in rectal volume or rescans; a small trial found an osmotic laxative gave less rectal gas than a bulking laxative with probiotic. In 295 Royal Marsden patients with daily cone-beam CT, micro-enema preparation reduced the share with a large rectum on the planning CT by only 10 to 15% and did not change intrafraction motion; the authors conclude preparation is not universally needed and recommend intervention where a large rectum coincides with seminal vesicle involvement or risk. A published comment reads the same data as support for risk-adapted, not universal, omission. The ESTRO ACROP IGRT guideline (2019) is cited by Alexander et al. as not recommending routine preparation; its full text could not be read.",
  asOf: "2026-11-11",
  setting: {
    who: ["radiographer", "patient-or-carer"],
    where: ["radiotherapy-department", "home"],
  },
  population: "Adults having external beam radiotherapy to the prostate or prostate bed, with or without the pelvic lymph nodes, using daily image guidance. Bladder and rectal preparation for cervical, bladder, rectal and gynaecological radiotherapy, and for brachytherapy, use different volumes and rules and are not covered.",
  trigger: "Booking of the radiotherapy planning CT; then before each treatment.",
  steps: [
    {
      action: "Ask the patient to empty their bladder, then drink a set, moderate volume of water (in trials 300 to 540 ml) a fixed time before the planning CT and before every treatment",
      why: "A comfortably full bladder lifts the bowel away from the radiation; a moderate drink is easier to repeat the same way every day than a large one.",
      source: "chen-water-volume-2021",
      quote: "Consuming 300-400 ml of water potentially leads to the best bladder volume reproducibility; moreover, the higher the water consumption volume, the lower the bladder volume reproducibility.",
      grade: "Systematic review and meta-analysis (10 cohort studies, 1 randomised trial)",
    },
    {
      action: "Do not ask for very large drinks: 540 ml was more reproducible than 1080 ml and caused no more side effects",
      why: "Drinking more fills the bladder more on the planning day than on treatment days, so the shapes stop matching.",
      source: "mullaney-2014",
      quote: "The 540 mL bladder-filling arm resulted in reproducible BVs throughout a course of RT, without any deterioration in QoL or increase in toxicities for prostate patients.",
      grade: "Randomised trial (110 patients)",
    },
    {
      action: "When the pelvic lymph nodes are treated, aim for a full bladder",
      why: "With a larger area treated, a full bladder matters more for keeping the small bowel out of the high-dose region.",
      source: "nasser-bladder-2021",
      quote: "While treating prostate only with empty bladder could be feasible, treating the prostate and pelvic lymph nodes should be preferably done with a full bladder, to limit the radiation dose to the small bowel.",
      grade: "Narrative review",
    },
    {
      action: "Check bladder filling on the pre-treatment cone-beam CT, and wait or ask the patient to drink more if it differs from the plan",
      why: "Even with a drinking routine the bladder fills differently on different days, and the scan shows it before the dose is given.",
      source: "nasser-bladder-2021",
      quote: "CBCT prior each fraction of RT is useful for urine volume estimation in order to ensure consistent bladder filling for RT.",
      grade: "Narrative review",
    },
    {
      action: "Do not prescribe rectal preparation to everyone by default where daily 3D image guidance is used; decide case by case",
      why: "With a daily scan before each treatment, enemas changed the position of the prostate very little and only modestly reduced the number of people with a full rectum.",
      source: "alexander-rectal-2026",
      quote: "Findings suggest rectal preparation is not universally required with contemporary IGRT.",
      grade: "Retrospective cohort (295 patients), single centre",
    },
    {
      action: "Where the planning CT shows a large rectum and the seminal vesicles are involved or at high risk, intervene: repeat the scan after rectal preparation, or adapt the plan",
      why: "A changing rectum can push the seminal vesicles out of the treated area, so these patients are the ones preparation or adaptation helps.",
      source: "alexander-rectal-2026",
      quote: "Interfraction changes in rectal volume can lead to significant underdosing of seminal vesicles therefore we do recommend further intervention for patients with both a large rectum on pCT and seminal vesicle involvement, or a high risk of seminal vesicle involvement.",
      grade: "Retrospective cohort (295 patients), single centre",
    },
    {
      action: "If rectal preparation is used, choose the method locally and say to the patient that no method has been shown best",
      why: "Enemas, laxatives, diet and anti-wind medicines have all been tried, and none has proved better than another.",
      source: "mcnair-rectal-review-2014",
      quote: "There is no robust evidence to recommend one rectal emptying strategy over another.",
      grade: "Systematic review (18 studies)",
    },
  ],
  bestInClass: {
    statement: "No guideline sets a best practice; the evidence supports a moderate, timed drink after emptying the bladder (300 to 540 ml in the trials; Chen 2021, Mullaney 2014), a full bladder when the pelvic nodes are treated, and confirmation of bladder filling on the pre-treatment scan. For the rectum, with daily 3D image guidance, routine preparation for everyone is not supported (Alexander 2026; ESTRO ACROP 2019 as cited there); preparation or plan adaptation is targeted at people with a large rectum on the planning CT and seminal vesicle involvement or risk. Where the sources differ: Alexander et al. read their data as showing preparation is not universally required, while the published comment on it reads them as support for risk-adapted omission only, pending prospective study. No method of rectal emptying is better than another (McNair 2014).",
    sources: ["chen-water-volume-2021", "mullaney-2014", "nasser-bladder-2021", "alexander-rectal-2026", "gupta-comment-2026", "mcnair-rectal-review-2014"],
  },
  variants: [
    {
      name: "Empty bladder, then 350 ml of water one hour before (Royal Marsden)",
      differs: "Patients empty their bladder an hour before planning and treatment and drink 350 ml of water; micro-enema use depends on the prescription.",
      evidence: "Described as the routine for 295 patients in the Alexander 2026 cohort; within the volume range the meta-analysis found most reproducible.",
      sources: ["alexander-rectal-2026", "chen-water-volume-2021"],
    },
    {
      name: "Drinking until the bladder feels comfortably full",
      differs: "No set volume; the patient drinks until they feel full.",
      evidence: "In the meta-analysis this was less reproducible than 300 to 400 ml (mean bladder volume difference against planning of about 46 ml). The Nasser review cites a study where patients reporting a comfortably full bladder had an adequately full bladder only 76.5% of the time.",
      sources: ["chen-water-volume-2021", "nasser-bladder-2021"],
    },
    {
      name: "Bladder ultrasound scan before treatment, with biofeedback",
      differs: "A portable bladder scanner measures the volume before each treatment, and the patient waits or drinks until a target is reached.",
      evidence: "The Nasser review cites one study where 93% of patients on a scan protocol were ready after the cone-beam CT against 75% without, and another where feedback did not improve filling; overall it judges protocols, ultrasound and biofeedback to fall short of consistent filling.",
      sources: ["nasser-bladder-2021"],
    },
    {
      name: "Empty bladder for prostate-only treatment",
      differs: "The bladder is kept empty, in some single-fraction schedules with a catheter.",
      evidence: "Described as feasible for prostate-only treatment in the Nasser review, citing a non-inferiority report; not recommended when the pelvic nodes are treated.",
      sources: ["nasser-bladder-2021"],
    },
    {
      name: "Antiflatulent (simethicone) as bowel preparation",
      differs: "Patients take simethicone during treatment to reduce rectal gas.",
      evidence: "Two randomised trials found no overall reduction in rectal volume, gas or planning rescans (78 and 30 patients); SPoRT found less rectal volume variability from week three onwards with simethicone, which its authors say needs a larger study.",
      sources: ["mcguffin-antiflatulent-2018", "ward-sport-2022"],
    },
    {
      name: "Laxatives with a low-gas diet",
      differs: "Patients follow a low-gas diet and take a laxative during treatment.",
      evidence: "A trial of 17 patients found an osmotic laxative gave lower rectal gas than a bulking laxative with probiotic (OR 3.2 for a higher gas rating with the bulking regimen); the authors call for larger studies.",
      sources: ["weston-laxative-2020"],
    },
  ],
  grades: [
    { claim: "540 ml gave less bladder volume variation than 1080 ml", grade: "Randomised trial (110 patients)", source: "mullaney-2014", quote: "There was significantly less BV variation in the 540 mL arm when compared with 1080 mL (median: 76 mL vs 105 mL, P = .003)." },
    { claim: "Rectal preparation reduced large rectum on planning CT by only 10 to 15%", grade: "Retrospective cohort (295 patients)", source: "alexander-rectal-2026", quote: "Results do not justify blanket use of rectal preparation for individuals undergoing radiotherapy to their prostate." },
    { claim: "The findings support risk-adapted, not universal, omission of rectal preparation", grade: "Published correspondence", source: "gupta-comment-2026", quote: "The findings are therefore best viewed as supporting risk-adapted deimplementation rather than universal omission of rectal preparation." },
    { claim: "No consensus on bladder filling protocols", grade: "Narrative review", source: "nasser-bladder-2021", quote: "There is no consensus on what bladder filling protocols should be used for prostate external beam radiotherapy." },
  ],
  sources: [
    {
      key: "alexander-rectal-2026",
      label: "Is rectal preparation necessary in contemporary image-guided prostate radiotherapy?",
      publisher: "Clinical and Translational Radiation Oncology (Alexander et al., Royal Marsden)",
      year: 2026,
      url: "https://doi.org/10.1016/j.ctro.2026.101207",
      doi: "10.1016/j.ctro.2026.101207",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "gupta-comment-2026",
      label: "Comment on \"Is rectal preparation necessary in contemporary image-guided prostate radiotherapy?\"",
      publisher: "Clinical and Translational Radiation Oncology (Gupta et al.)",
      year: 2026,
      url: "https://doi.org/10.1016/j.ctro.2026.101255",
      doi: "10.1016/j.ctro.2026.101255",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "nasser-bladder-2021",
      label: "Maintaining consistent bladder filling during external beam radiotherapy for prostate cancer",
      publisher: "Technical Innovations and Patient Support in Radiation Oncology (Nasser et al.)",
      year: 2021,
      url: "https://doi.org/10.1016/j.tipsro.2021.01.002",
      doi: "10.1016/j.tipsro.2021.01.002",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "mullaney-2014",
      label: "A randomized trial comparing bladder volume consistency during fractionated prostate radiation therapy",
      publisher: "Practical Radiation Oncology (Mullaney et al.)",
      year: 2014,
      url: "https://doi.org/10.1016/j.prro.2013.11.006",
      doi: "10.1016/j.prro.2013.11.006",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "chen-water-volume-2021",
      label: "Bladder volume reproducibility after water consumption in patients with prostate cancer undergoing radiotherapy: a systematic review and meta-analysis",
      publisher: "Biomedical Journal (Chen et al.)",
      year: 2021,
      url: "https://doi.org/10.1016/j.bj.2020.11.004",
      doi: "10.1016/j.bj.2020.11.004",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "mcnair-rectal-review-2014",
      label: "A systematic review: effectiveness of rectal emptying preparation in prostate cancer patients",
      publisher: "Practical Radiation Oncology (McNair et al.)",
      year: 2014,
      url: "https://doi.org/10.1016/j.prro.2014.06.005",
      doi: "10.1016/j.prro.2014.06.005",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "mcguffin-antiflatulent-2018",
      label: "To prep or not to prep: a randomized trial on the use of antiflatulent medication as part of bowel preparation for patients having image guided external beam radiation therapy to the prostate",
      publisher: "Practical Radiation Oncology (McGuffin et al.)",
      year: 2018,
      url: "https://doi.org/10.1016/j.prro.2017.10.012",
      doi: "10.1016/j.prro.2017.10.012",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "ward-sport-2022",
      label: "Randomised controlled trial on the effect of simethicone bowel preparation on rectal variability during image-guided radiation therapy for prostate cancer (SPoRT study)",
      publisher: "Journal of Medical Imaging and Radiation Oncology (Ward et al.)",
      year: 2022,
      url: "https://doi.org/10.1111/1754-9485.13404",
      doi: "10.1111/1754-9485.13404",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "weston-laxative-2020",
      label: "Effects of a laxation and probiotic bowel preparation regimen: a randomized controlled trial in patients undergoing prostate radiation therapy",
      publisher: "Nutrition and Cancer (Weston et al.)",
      year: 2020,
      url: "https://doi.org/10.1080/01635581.2019.1669675",
      doi: "10.1080/01635581.2019.1669675",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "estro-acrop-prostate-igrt-2019",
      label: "ESTRO ACROP consensus guideline on the use of image guided radiation therapy for localized prostate cancer",
      publisher: "ESTRO (Radiotherapy and Oncology; Ghadjar et al.)",
      year: 2019,
      url: "https://doi.org/10.1016/j.radonc.2019.08.027",
      doi: "10.1016/j.radonc.2019.08.027",
      read: "abstract",
      accessed: "2026-11-11",
    },
  ],
  cancers: ["prostate"],
  technologies: ["in-room-imaging-systems", "imrt-igrt"],
  terms: ["radiotherapy", "prostate-radiotherapy-fractionation"],
  related: [],
  upgrades: ["idea-pu-pelvic-filling-protocol", "idea-pu-rectal-spacer-prostate"],
  gaps: [
    "No guideline with graded recommendations covers bladder filling or rectal preparation for prostate radiotherapy. The ESTRO ACROP IGRT guideline (2019) was read only as an abstract (the open repository copy is restricted and the publisher returned a bot page); its position on preparation is reported here only as Alexander et al. cite it.",
    "The water-volume trial, the meta-analysis and the rectal preparation trials were read as abstracts; all are small or single-centre.",
    "No source read gives the best timing between drinking and treatment; centres use 30 minutes to an hour.",
    "The Alexander 2026 cohort is retrospective, and its preparation and no-preparation groups differed by prescription, a limitation the published comment sets out.",
    "Whether rectal spacers change the need for preparation was not examined; spacers are an upgrade idea of their own (idea-pu-rectal-spacer-prostate).",
    "Bladder and rectal preparation for cervical, rectal, bladder and gynaecological radiotherapy and for brachytherapy is not covered.",
  ],
});
