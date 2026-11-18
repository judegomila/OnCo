import { protocol } from "./helpers";

/*
 * Thyroid function monitoring and levothyroxine for adults taking VEGFR-targeted and related tyrosine kinase
 * inhibitors (sunitinib, pazopanib, axitinib, cabozantinib, lenvatinib, tivozanib, vandetanib, sorafenib,
 * fruquintinib).
 *
 * What was read, and how (all on 16 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - US prescribing information from DailyMed (SPL XML, full text): Sutent (sunitinib, setid 43a4d7f8), Votrient
 *   (pazopanib, eeaaaf38), Inlyta (axitinib, 8a903e31), Cabometyx (cabozantinib, 3850cce2), Lenvima (lenvatinib,
 *   f4bedd21), Fotivda (tivozanib, de77155c), Caprelsa (vandetanib, e5721cb8), Fruzaqla (fruquintinib, 186d786e),
 *   Nexavar (sorafenib, b50667e4; its only thyroid instruction is monthly TSH in thyroid cancer) and, to confirm that
 *   it lists hypothyroidism but gives no monitoring instruction, Stivarga (regorafenib).
 * - EU product information (EMA PDFs read with pdftotext), section 4.4 or 4.8: Sutent, Lenvima and Fruzaqla. The
 *   Votrient, Cabometyx and Inlyta texts were also read and say the same as their US labels (baseline and periodic
 *   testing); they are not cited separately. The Stivarga request was refused (HTTP 429) and was not retried.
 * - Hamnvik, Larsen and Marqusee, "Thyroid Dysfunction from Antineoplastic Agents", J Natl Cancer Inst 2011: full
 *   text. Europe PMC returned an error for the XML, so the PubMed Central article page (PMC3206040) was fetched with
 *   curl and stripped to text. Funded by the US National Institutes of Health.
 * - American Thyroid Association, Guidelines for the Treatment of Hypothyroidism (Jonklaas et al., Thyroid 2014):
 *   full text, PubMed Central article page (PMC4267409). Used for levothyroxine dosing and its one recommendation
 *   that names tyrosine kinase inhibitors.
 * - Drui, Illouz, Do Cao and Caron, "Expert opinion on thyroid complications of new anti-cancer therapies: Tyrosine
 *   kinase inhibitors", Annales d'Endocrinologie 2018 (French Endocrine Society consensus): ABSTRACT ONLY, from
 *   Europe PMC. The publisher's page served no article text to a script and no open copy was found. Four steps rest
 *   on sentences of that abstract and are marked as such in gaps.
 *
 * Not found: no ESMO, ASCO or European Thyroid Association guideline specific to thyroid dysfunction from kinase
 * inhibitors was found. Hamnvik 2011 says its own schedule is "not evidence based".
 *
 * Every DOI was resolved through Crossref or Europe PMC and its title checked. Quotes are copied from the raw text with
 * line breaks joined and nothing else changed.
 *
 * Second reading, 17 November 2026 (an independent reader; every source fetched again raw with curl):
 * - The nine US labels were re-read from the DailyMed SPL XML and the three EU texts from the EMA PDFs (pdftotext).
 *   Hamnvik 2011 and the ATA 2014 guideline were re-read from their PubMed Central article pages (Europe PMC and the
 *   NCBI XML service do not serve their full text), stripped to text by script. All 26 quotes matched verbatim by
 *   script, as did the four added on this pass.
 * - Drui 2018 is still abstract only: the DOI leads to the publisher's redirect page and Europe PMC lists no open copy.
 * - Added and read in full: the Stivarga (regorafenib) US label, which the page already drew figures from without
 *   listing it; the Stivarga EU text, which was refused on 16 November and read today; and NICE NG145 (levothyroxine
 *   starting doses), fetched from nice.org.uk.
 * - Corrected: reasons in "why" that no source states, now replaced by what the sources say; orders softened where the
 *   source says "reasonable" or "consider" (the low-dose trial, the review's schedule); "at the same dose" removed
 *   from the step on continuing the kinase inhibitor; the symptom list now matches the EU lenvatinib patient leaflet;
 *   pazopanib's label does not say "periodically"; the regorafenib rate was incomplete (18% in the GIST trial);
 *   the gap saying no source gave a starting dose was wrong (Hamnvik gives one), and the doses are now a variant.
 * - Newer editions: none found for the ATA guideline or the two reviews (Europe PMC title searches, Crossref records).
 */
export const hypothyroidismOnTyrosineKinaseInhibitors = protocol({
  id: "hypothyroidism-on-tyrosine-kinase-inhibitors",
  name: "Underactive thyroid on VEGFR-targeted tyrosine kinase inhibitors: thyroid tests and levothyroxine",
  aka: ["TKI-induced hypothyroidism", "sunitinib hypothyroidism", "axitinib hypothyroidism", "lenvatinib hypothyroidism", "cabozantinib thyroid dysfunction", "pazopanib hypothyroidism", "thyroid monitoring on kinase inhibitors", "TSH monitoring on anti-angiogenic tablets", "levothyroxine on tyrosine kinase inhibitors"],
  domain: "symptom-management",
  tldr: "Many targeted cancer tablets that block blood vessel growth, such as sunitinib, axitinib, lenvatinib and cabozantinib, can make the thyroid underactive. It causes tiredness, feeling cold, constipation and weight gain, which are easy to blame on the cancer. A blood test (TSH) before and during treatment finds it, and a daily levothyroxine tablet treats it. Your own team's plan comes first.",
  simple: "Some cancer tablets slow down the thyroid, a gland in the neck that sets how fast the body runs. You may feel tired, cold or constipated. A blood test before and during treatment shows it, and a small daily tablet called levothyroxine puts it right. You do not usually need to stop the cancer tablets.",
  summary: "VEGFR-targeted kinase inhibitors cause hypothyroidism, sometimes after a brief thyrotoxic phase, probably through loss of thyroid capillaries. Label rates: hypothyroidism in 19% on axitinib (TSH rising to 10 or more in 32% of those under 5 beforehand), thyroid dysfunction in 19% on cabozantinib, hypothyroidism in 21% to 24% on lenvatinib, 8% on tivozanib, 4% to 7% on pazopanib and 17% to 21% on fruquintinib (31.5% in the EU text, median onset 56 days). Reviews put it at 32% to 85% on sunitinib, with onset from 4 to 94 weeks. In people already taking levothyroxine, including after thyroidectomy, these medicines can raise the dose needed: on vandetanib 49% needed more against 17% on placebo.\n\nMost labels ask for thyroid function before treatment and during it, and differ on how often: at least monthly for lenvatinib (US); every 3 months for sunitinib (EU); at baseline, 2 to 4 weeks, 8 to 12 weeks and then every 3 months for vandetanib; 'periodically' for axitinib and tivozanib; at baseline, during treatment and as clinically indicated for pazopanib; for cabozantinib (US), an assessment for signs before and during treatment with testing 'as clinically indicated'. The sorafenib US label asks for monthly TSH only in differentiated thyroid cancer, where it impairs TSH suppression; the regorafenib and fruquintinib US labels list hypothyroidism without a monitoring instruction, and the EU regorafenib text asks only for biochemical and metabolic monitoring in general. Two endocrine reviews give tighter schedules: TSH monthly for 4 months then every 2 to 3 months (Hamnvik 2011), or monthly for 6 months, on day 1 of the cycle for intermittent regimens, then every 2 to 3 months (French expert opinion 2018, abstract only).\n\nTreatment: levothyroxine for a TSH above 10 mIU/L or a low free T4 (Hamnvik), or for symptomatic hypothyroidism or a TSH above 10 mIU/L (French opinion). They differ below that: Hamnvik finds a low-dose trial reasonable for a TSH of 5 to 10 because symptoms are hard to tell from those of cancer treatment; the French opinion treats only symptomatic hypothyroidism or a TSH above 10. The ATA guideline covers dosing: full or partial replacement titrated to TSH, rechecked 4 to 6 weeks after any change. Starting doses: 1.6 micrograms per kg a day is called reasonable without cardiac disease, and a lower dose such as 50 micrograms a day for the first few weeks in coronary artery disease (Hamnvik); NICE gives similar figures for primary hypothyroidism in general (see variants). The French opinion says the kinase inhibitor should not be stopped because of thyroid dysfunction, and no label read has a dose rule specific to it.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "nurse", "pharmacist"],
    where: ["outpatient-clinic", "community", "telephone-triage"],
  },
  population: "Adults taking a VEGFR-targeted tyrosine kinase inhibitor for kidney, liver, thyroid, bowel or other cancers, whether or not they had thyroid disease beforehand. People with thyroid cancer who take levothyroxine to keep TSH low have a TSH target set by their thyroid cancer team, and these medicines can push TSH above it. Thyroid problems from checkpoint inhibitors, alone or combined with a kinase inhibitor, have their own protocol. Children and pregnancy are not covered.",
  trigger: "One of these medicines is about to be started, or a person taking one has a raised TSH or symptoms that could be thyroid.",
  steps: [
    {
      action: "Measure thyroid function (TSH) before the first dose",
      why: "The EU sunitinib text recommends it for all patients, and the US labels for sunitinib, lenvatinib, axitinib, tivozanib, pazopanib and vandetanib also ask for a thyroid test before treatment.",
      source: "smpc-sutent",
      quote: "Baseline laboratory measurement of thyroid function is recommended in all patients.",
    },
    {
      action: "Treat an existing underactive or overactive thyroid before starting, and keep it controlled during treatment",
      why: "The tivozanib label and the EU sunitinib text ask for existing thyroid disease to be treated before the medicine is started; the axitinib label and the EU lenvatinib text ask for a normal thyroid state to be maintained during treatment.",
      source: "label-tivozanib",
      quote: "Treat hypothyroidism and hyperthyroidism to maintain euthyroid state before and during treatment with FOTIVDA.",
    },
    {
      action: "Use TSH as the screening test, and add free T4 whenever TSH is abnormal",
      why: "The review calls TSH the single best screening test for thyroid dysfunction, and says free thyroxine should be measured in everyone with an abnormal TSH and in people with pituitary disease.",
      source: "hamnvik-2011",
      quote: "The single best screening test for thyroid dysfunction is a TSH assay, except in patients with pituitary disease",
    },
    {
      action: "Repeat thyroid tests on the schedule in that medicine's label; for lenvatinib, at least monthly",
      why: "In the French expert opinion about half of cases are subclinical, meaning they show on a blood test before they are felt, and the EU sunitinib text says hypothyroidism occurs early as well as late in treatment.",
      source: "label-lenvatinib",
      quote: "Monitor thyroid function prior to initiating LENVIMA and at least monthly during treatment.",
    },
    {
      action: "Where the label gives no interval, consider the review's schedule: TSH monthly for the first four months, then every two to three months",
      why: "The review proposes this for sunitinib, sorafenib, axitinib and related medicines from the reported time course, and says its recommendations are logical but not evidence based.",
      source: "hamnvik-2011",
      quote: "TSH before treatment and then every month for the first 4 mo, then every 2–3 mo.",
    },
    {
      action: "For a medicine taken with planned breaks, such as sunitinib four weeks on and two weeks off, take the TSH on day 1 of the new cycle",
      why: "The French opinion gives this timing in its abstract. The 2011 review cites a report of TSH rising during sunitinib treatment and recovering in the two-week break, so the timing of the test can change the result.",
      source: "drui-2018",
      quote: "During TKI treatment, TSH should be assayed monthly, or at end of off-period (i.e., day 1 of new cycle after interruption), for the first 6 months, then every 2-3 months or in case of clinical signs of dysthyroidism.",
    },
    {
      action: "Watch throughout treatment for signs of an underactive thyroid (tiredness, weight gain, constipation, feeling cold, dry skin) or an overactive one (rapid heart rate, sweating, weight loss), and test thyroid function when they appear",
      why: "The symptom lists are those of the EU lenvatinib patient leaflet. The 2011 review notes that symptoms of hypothyroidism may be wrongly put down to the cancer or its treatment, and can lead to the dose of the cancer medicine being reduced.",
      source: "label-sunitinib",
      quote: "Monitor patients closely for signs and symptoms of thyroid dysfunction, including hypothyroidism, hyperthyroidism, and thyroiditis, during treatment with SUTENT.",
    },
    {
      action: "If the first change is an overactive thyroid (thyrotoxicosis), treat the symptoms and keep testing TSH, because hypothyroidism can follow",
      why: "In the French opinion a passing thyrotoxicosis comes before hypothyroidism in 20% to 40% of cases and may be overlooked. The US sunitinib label also reports hyperthyroidism, in some people followed by hypothyroidism.",
      source: "drui-2018",
      quote: "Treatment is symptomatic in case of thyrotoxicosis, and levothyroxine replacement therapy is initiated in case of symptomatic hypothyroidism or TSH>10mIU/L.",
    },
    {
      action: "Start levothyroxine when TSH is above 10 mIU/L or free T4 is low",
      why: "The review says treatment should be started at this level, and cites one study in which at least half of the people who started levothyroxine for hypothyroidism on sunitinib had less fatigue. The French opinion uses the same TSH threshold.",
      source: "hamnvik-2011",
      quote: "In patients with TSH greater than 10 mIU/L or with low free T4 levels, treatment should be initiated.",
    },
    {
      action: "For a TSH between 5 and 10 mIU/L with a normal free T4, consider a trial of low-dose levothyroxine, particularly on a medicine with a high risk of hypothyroidism",
      why: "The review reasons that in someone on cancer treatment it is hard to tell whether mild hypothyroidism is truly free of symptoms. The French opinion starts levothyroxine only for symptomatic hypothyroidism or a TSH above 10 mIU/L, so the sources differ here (see variants).",
      source: "hamnvik-2011",
      quote: "Therefore, it seems reasonable to start low-dose levothyroxine therapy in these patients as a therapeutic trial, especially if they are receiving an agent associated with a high risk of hypothyroidism.",
    },
    {
      action: "Start levothyroxine as full or partial replacement, titrate it to TSH, and recheck TSH 4 to 6 weeks after any dose change",
      why: "The guideline says levothyroxine reaches a steady level by 4 to 6 weeks. It reports that many experts start low and go slow in older people and those with cardiovascular disease, for fear of setting off cardiac events; that advice is in its discussion and is not part of the graded recommendation. Starting doses are in the variants.",
      source: "ata-2014",
      quote: "Thyroid hormone therapy should be initiated as an initial full replacement or as partial replacement with gradual increments in the dose titrated upward using serum thyrotropin as the goal.",
      grade: "Strong recommendation. Moderate quality of evidence.",
    },
    {
      action: "In people already taking levothyroxine, reassess TSH after the kinase inhibitor is started and adjust the dose to the result",
      why: "The guideline says these medicines affect how thyroxine is metabolised, and reports that people with no thyroid have needed substantially higher doses. In the French opinion 20% to 60% of people already on levothyroxine need more. Schedules for rechecking are in the variants.",
      source: "ata-2014",
      quote: "Serum thyrotropin should also be reassessed in patients who are started on agents such as tyrosine kinase inhibitors that affect thyroxine metabolism and thyroxine or triiodothyronine deiodination.",
      grade: "Strong recommendation. Low-quality evidence.",
    },
    {
      action: "Do not stop the kinase inhibitor because thyroid dysfunction has appeared; treat the thyroid problem",
      why: "The French expert opinion says this directly, in its abstract. No label read gives a dose rule specific to thyroid dysfunction, although the cabozantinib label refers from its thyroid section to its general dose-modification rules for adverse reactions.",
      source: "drui-2018",
      quote: "TKIs should not be discontinued because of onset of thyroid dysfunction.",
    },
    {
      action: "When the kinase inhibitor is stopped for good, consider reducing levothyroxine gradually, with monitoring",
      why: "The thyroid recovers in some people and not in others, and it cannot be predicted which.",
      source: "drui-2018",
      quote: "At TKI termination, remission of hypothyroidism is possible but unpredictable, and progressive discontinuation of levothyroxine may be considered under monitoring.",
    },
  ],
  bestInClass: {
    statement: "Most labels that address the problem ask for thyroid function before treatment and during it, with thyroid dysfunction treated (to a euthyroid state in the axitinib, tivozanib and EU lenvatinib texts), and none gives a dose rule specific to thyroid dysfunction; the cabozantinib label refers from its thyroid section to its general dose-modification rules. They differ on frequency: at least monthly (lenvatinib, US label); every 3 months (sunitinib, EU text; the US label says 'periodically'); baseline, 2 to 4 weeks, 8 to 12 weeks, then every 3 months (vandetanib); 'periodically' (axitinib, tivozanib; lenvatinib in the EU text); at baseline, during treatment and as clinically indicated (pazopanib); an assessment for signs before and during treatment, with testing 'as clinically indicated' (cabozantinib, US). Two endocrine sources advise a fixed, tighter schedule for all of them: monthly for 4 months then every 2 to 3 months (Hamnvik 2011, which calls its schedule logical but not evidence based), or monthly for 6 months then every 2 to 3 months (French Endocrine Society expert opinion 2018, read as abstract only). Both start levothyroxine for a TSH above 10 mIU/L (Hamnvik also for a low free T4, the French opinion also for symptomatic hypothyroidism); below 10 they differ, Hamnvik finding a low-dose trial reasonable and the French opinion treating only if symptomatic. The ATA hypothyroidism guideline gives the only graded statements: reassess TSH when a kinase inhibitor is started in someone on levothyroxine (strong recommendation, low-quality evidence) and titrate levothyroxine to TSH with a recheck 4 to 6 weeks after any change (strong recommendation, moderate quality). No ESMO, ASCO or European Thyroid Association guideline on this was found.",
    sources: ["label-lenvatinib", "label-sunitinib", "smpc-sutent", "label-vandetanib", "label-axitinib", "label-pazopanib", "label-tivozanib", "label-cabozantinib", "smpc-lenvima", "hamnvik-2011", "drui-2018", "ata-2014"],
  },
  variants: [
    {
      name: "Monitoring frequency by medicine (labels)",
      differs: "Lenvatinib: before treatment and at least monthly (US); before and periodically (EU). Sunitinib: baseline and periodically (US); baseline and every 3 months (EU). Vandetanib: TSH at baseline, 2 to 4 weeks, 8 to 12 weeks and every 3 months. Axitinib, tivozanib: before and periodically. Pazopanib: at baseline, during treatment and as clinically indicated. Cabozantinib (US): assess for signs before and during treatment, with testing as clinically indicated. Sorafenib (US): TSH monthly in people with differentiated thyroid cancer, with thyroid replacement adjusted; no instruction for other cancers. Regorafenib and fruquintinib (US): hypothyroidism listed as an adverse reaction, no monitoring instruction. Regorafenib (EU): monitoring of biochemical and metabolic parameters is recommended in general, with raised TSH named among the abnormalities.",
      evidence: "Regulatory texts; the intervals are not from trials of monitoring. Rates in the labels: axitinib 19% (sorafenib 8% in the same trial); cabozantinib 19% thyroid dysfunction; lenvatinib 21% to 24% grade 1 or 2 hypothyroidism; tivozanib 8%; pazopanib 7% in the kidney cancer trial and 5% in the sarcoma trial; fruquintinib 21% and 17% in its two US trial tables and 31.5% in the EU text; regorafenib 18% against 6% on placebo in the GIST trial (among those with a normal TSH and no thyroid supplement at baseline) and 6.4% in the liver cancer trial (US), with about 4.6% needing hormone replacement across the phase 3 trials (EU).",
      sources: ["label-lenvatinib", "smpc-lenvima", "label-sunitinib", "smpc-sutent", "label-vandetanib", "label-axitinib", "label-pazopanib", "label-tivozanib", "label-cabozantinib", "label-sorafenib", "label-fruquintinib", "smpc-fruzaqla", "label-regorafenib", "smpc-stivarga"],
    },
    {
      name: "Fixed endocrine schedules",
      differs: "TSH before treatment, monthly for the first 4 months, then every 2 to 3 months (Hamnvik 2011, for sunitinib, sorafenib, dasatinib, nilotinib, axitinib and cediranib). TSH monthly for the first 6 months, timed to day 1 of the cycle on intermittent regimens, then every 2 to 3 months; and for people already on levothyroxine, monthly for 3 months then every 3 months (French expert opinion 2018).",
      evidence: "Expert opinion from the reported time course: in the review, hypothyroidism on sunitinib occurred in 32% to 85% across studies, starting 4 to 94 weeks into treatment. Hamnvik 2011 states that no official screening recommendations existed and that its own are not evidence based.",
      sources: ["hamnvik-2011", "drui-2018"],
    },
    {
      name: "Treating a mildly raised TSH (5 to 10 mIU/L)",
      differs: "A trial of low-dose levothyroxine even without clear symptoms (Hamnvik 2011), against levothyroxine only for symptomatic hypothyroidism or a TSH above 10 mIU/L (French expert opinion 2018).",
      evidence: "Opinion on both sides. Hamnvik notes that treating subclinical hypothyroidism is generally discouraged in healthy people for lack of evidence of benefit, and argues that in cancer patients symptoms are hard to separate from those of treatment or the disease. Neither cites a trial of treating a TSH of 5 to 10 mIU/L in people on kinase inhibitors. For primary hypothyroidism in general, NICE says to consider a 6-month trial of levothyroxine in adults under 65 with symptoms and a TSH above the reference range but below 10 on 2 occasions 3 months apart.",
      sources: ["hamnvik-2011", "drui-2018", "nice-ng145"],
    },
    {
      name: "Levothyroxine starting dose",
      differs: "Hamnvik 2011, writing about hypothyroidism from cancer medicines: a starting dose of 1.6 micrograms per kg a day is reasonable for people without underlying cardiac disease, and in coronary artery disease a lower dose such as 50 micrograms a day may be used for the first few weeks. ATA 2014 (discussion, not a graded recommendation): full replacement, roughly 1.6 micrograms per kg, when TSH is markedly raised, and lower doses such as 25 to 50 micrograms in milder hypothyroidism, for example a TSH of 10 mIU/L or less. NICE NG145, for primary hypothyroidism in general: consider 1.6 micrograms per kg a day, rounded to the nearest 25 micrograms, for adults under 65 with no history of cardiovascular disease, and consider 25 to 50 micrograms a day with titration for adults aged 65 and over and those with a history of cardiovascular disease.",
      evidence: "None of the three figures comes from a study of hypothyroidism caused by a kinase inhibitor. The ATA discussion cites one randomised trial in which older people free of cardiovascular disease were safely started on the full dose. NICE does not grade its recommendations; both of these use 'consider'.",
      sources: ["hamnvik-2011", "ata-2014", "nice-ng145"],
    },
    {
      name: "People already on levothyroxine, including after thyroid removal",
      differs: "No new diagnosis to make: TSH is rechecked every 4 weeks after starting the kinase inhibitor and the levothyroxine dose raised as needed, then every 2 months once stable (Hamnvik 2011, written for imatinib, sorafenib and motesanib). In thyroid cancer the EU lenvatinib text says thyroid hormone should be adjusted to the patient's own TSH target, and the lenvatinib and sorafenib labels say these medicines impair TSH suppression.",
      evidence: "Vandetanib label: in the medullary thyroid cancer trial, where 90% had had a thyroidectomy, 49% needed more thyroid replacement against 17% on placebo. Lenvatinib label: among thyroid cancer patients with a normal TSH at baseline, TSH rose above 0.5 mU/L in 57%. Sorafenib label: TSH rose above 0.5 mU/L in 41% against 16% on placebo. The French opinion puts the share of levothyroxine users needing a higher dose at 20% to 60%. The ATA guideline grades reassessing TSH as a strong recommendation on low-quality evidence.",
      sources: ["hamnvik-2011", "label-vandetanib", "label-lenvatinib", "smpc-lenvima", "label-sorafenib", "drui-2018", "ata-2014"],
    },
  ],
  grades: [
    { claim: "Reassess TSH when a tyrosine kinase inhibitor is started in a person on levothyroxine", grade: "Strong recommendation. Low-quality evidence.", source: "ata-2014" },
    { claim: "Start levothyroxine as full or partial replacement titrated to TSH, with TSH 4 to 6 weeks after a dose change", grade: "Strong recommendation. Moderate quality of evidence.", source: "ata-2014", quote: "Dose adjustments should be made when there are large changes in body weight, with aging, and with pregnancy, with thyrotropin assessment 4–6 weeks after any dosage change." },
    { claim: "Thyroid function at baseline and every 3 months on sunitinib (EU)", grade: "Regulatory product information; not graded", source: "smpc-sutent", quote: "During sunitinib treatment, routine monitoring of thyroid function should be performed every 3 months." },
    { claim: "Thyroid function at baseline, periodically and as clinically indicated on sunitinib (US)", grade: "Regulatory label; not graded", source: "label-sunitinib", quote: "Monitor thyroid function at baseline, periodically during treatment and as clinically indicated." },
    { claim: "Thyroid function before and periodically throughout axitinib, treating to a euthyroid state", grade: "Regulatory label; not graded", source: "label-axitinib", quote: "Monitor thyroid function before initiation of, and periodically throughout, treatment with INLYTA. Treat hypothyroidism and hyperthyroidism according to standard medical practice to maintain euthyroid state." },
    { claim: "Thyroid tests at baseline, during pazopanib and as clinically indicated", grade: "Regulatory label; not graded", source: "label-pazopanib", quote: "Monitor thyroid tests at baseline, during treatment and as clinically indicated and manage hypothyroidism as appropriate." },
    { claim: "Cabozantinib: assess for signs, test as clinically indicated", grade: "Regulatory label; not graded", source: "label-cabozantinib", quote: "Thyroid function testing and management of dysfunction should be performed as clinically indicated" },
    { claim: "Vandetanib: TSH at baseline, 2 to 4 weeks, 8 to 12 weeks, then every 3 months", grade: "Regulatory label; not graded", source: "label-vandetanib", quote: "Obtain Thyroid-stimulating hormone (TSH) at baseline, at 2 to 4 weeks and 8 to 12 weeks after starting treatment with CAPRELSA, and every 3 months thereafter." },
    { claim: "Sorafenib: TSH monthly in differentiated thyroid cancer", grade: "Regulatory label; not graded", source: "label-sorafenib", quote: "Monitor TSH levels monthly and adjust thyroid replacement medication as needed in patients with DTC." },
    { claim: "Lenvatinib (EU): monitor before and periodically; in thyroid cancer adjust thyroid hormone to the TSH target", grade: "Regulatory product information; not graded", source: "smpc-lenvima", quote: "Hypothyroidism should be treated according to standard medical practice to maintain euthyroid state." },
    { claim: "Fruquintinib: hypothyroidism in 31.5%, median onset 56 days, none leading to dose reduction or discontinuation (EU)", grade: "Regulatory product information; not graded", source: "smpc-fruzaqla", quote: "No events led to dose reduction or discontinuation." },
    { claim: "The review's screening schedule is reasoned, not evidence based", grade: "Narrative review; not graded", source: "hamnvik-2011", quote: "Although these recommendations are not evidence based, they are logical given the reported complications and provide a framework for providers to identify and treat thyroid dysfunction before the appearance of symptoms." },
    { claim: "People on levothyroxine before a kinase inhibitor: TSH every 4 weeks, then every 2 months once stable", grade: "Narrative review; not graded", source: "hamnvik-2011", quote: "Once the TSH and dose of levothyroxine are stable, the frequency of monitoring can be decreased to every 2 months." },
    { claim: "Levothyroxine for symptomatic hypothyroidism or TSH above 10 mIU/L; the kinase inhibitor is not stopped", grade: "Expert opinion (French Endocrine Society), read as abstract; not graded", source: "drui-2018" },
    { claim: "Levothyroxine starting dose for adults under 65 with primary hypothyroidism and no cardiovascular disease", grade: "NICE guideline; not graded ('consider')", source: "nice-ng145", quote: "Consider starting levothyroxine at a dosage of 1.6 micrograms per kilogram of body weight per day (rounded to the nearest 25 micrograms) for adults under 65 with primary hypothyroidism and no history of cardiovascular disease." },
    { claim: "Levothyroxine starting dose for adults aged 65 and over or with cardiovascular disease", grade: "NICE guideline; not graded ('consider')", source: "nice-ng145", quote: "Consider starting levothyroxine at a dosage of 25 to 50 micrograms per day with titration for adults aged 65 and over and adults with a history of cardiovascular disease." },
    { claim: "Starting dose in hypothyroidism from cancer medicines", grade: "Narrative review; not graded", source: "hamnvik-2011", quote: "In patients with coronary artery disease, a lower dose such as 50 μg/d may be used for the first few weeks." },
    { claim: "Regorafenib (EU): biochemical and metabolic monitoring in general; no thyroid-specific schedule", grade: "Regulatory product information; not graded", source: "smpc-stivarga", quote: "Overall approximately 4.6% of patients treated with Stivarga developed hypothyroidism requiring hormonal replacement treatment." },
  ],
  sources: [
    {
      key: "label-sunitinib",
      label: "Sutent (sunitinib) capsules: US prescribing information, section 5.11",
      publisher: "Pfizer, via DailyMed (US National Library of Medicine)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=43a4d7f8-48ae-4a63-9108-2fa8e3ea9d9c",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "label-pazopanib",
      label: "Votrient (pazopanib) tablets: US prescribing information, section 5.13",
      publisher: "Novartis, via DailyMed (US National Library of Medicine)",
      year: 2025,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=eeaaaf38-fb86-4d9f-a19d-0f61daac2fd7",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "label-axitinib",
      label: "Inlyta (axitinib) tablets: US prescribing information, section 5.7",
      publisher: "Pfizer, via DailyMed (US National Library of Medicine)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=8a903e31-936e-4ed7-8a59-59f32374f338",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "label-cabozantinib",
      label: "Cabometyx (cabozantinib) tablets: US prescribing information, section 5.14",
      publisher: "Exelixis, via DailyMed (US National Library of Medicine)",
      year: 2025,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=3850cce2-6137-42e5-a792-d318c4a4b3b5",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "label-lenvatinib",
      label: "Lenvima (lenvatinib) capsules: US prescribing information, section 5.13",
      publisher: "Eisai, via DailyMed (US National Library of Medicine)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f4bedd21-efde-44c6-9d9c-b48b78d7ed1e",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "label-tivozanib",
      label: "Fotivda (tivozanib) capsules: US prescribing information, section 5.8",
      publisher: "AVEO, via DailyMed (US National Library of Medicine)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=de77155c-ecf2-4f15-9758-21d271449d83",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "label-vandetanib",
      label: "Caprelsa (vandetanib) tablets: US prescribing information, sections 2.1 and 5.8",
      publisher: "Genzyme (Sanofi), via DailyMed (US National Library of Medicine)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=e5721cb8-4185-47b9-bbb3-1c587e558a03",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "label-fruquintinib",
      label: "Fruzaqla (fruquintinib) capsules: US prescribing information, section 6.1",
      publisher: "Takeda, via DailyMed (US National Library of Medicine)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=186d786e-dc8a-45f2-b5e1-01ac0201879f",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "label-sorafenib",
      label: "Nexavar (sorafenib) tablets: US prescribing information, sections 5.12 and 6",
      publisher: "Bayer, via DailyMed (US National Library of Medicine)",
      year: 2024,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b50667e4-5ebc-4968-a646-d605058dbef0",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "label-regorafenib",
      label: "Stivarga (regorafenib) tablets: US prescribing information, section 6.1",
      publisher: "Bayer, via DailyMed (US National Library of Medicine)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=824f19c9-0546-4a8a-8d8f-c4055c04f7c7",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "smpc-sutent",
      label: "Sutent: EU summary of product characteristics, section 4.4 (the text served by the EMA on the day it was read)",
      publisher: "European Medicines Agency",
      year: 2026,
      url: "https://www.ema.europa.eu/en/documents/product-information/sutent-epar-product-information_en.pdf",
      gradingScheme: "Regulatory product information; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "smpc-lenvima",
      label: "Lenvima: EU summary of product characteristics, sections 4.4 and 4.8, and package leaflet (the text served by the EMA on the day it was read)",
      publisher: "European Medicines Agency",
      year: 2026,
      url: "https://www.ema.europa.eu/en/documents/product-information/lenvima-epar-product-information_en.pdf",
      gradingScheme: "Regulatory product information; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "smpc-fruzaqla",
      label: "Fruzaqla: EU summary of product characteristics, section 4.8 (the text served by the EMA on the day it was read)",
      publisher: "European Medicines Agency",
      year: 2026,
      url: "https://www.ema.europa.eu/en/documents/product-information/fruzaqla-epar-product-information_en.pdf",
      gradingScheme: "Regulatory product information; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "smpc-stivarga",
      label: "Stivarga: EU summary of product characteristics, sections 4.4 and 4.8 (the text served by the EMA on the day it was read)",
      publisher: "European Medicines Agency",
      year: 2026,
      url: "https://www.ema.europa.eu/en/documents/product-information/stivarga-epar-product-information_en.pdf",
      gradingScheme: "Regulatory product information; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "nice-ng145",
      label: "Thyroid disease: assessment and management (NICE guideline NG145), published 20 November 2019, last updated 12 October 2023",
      publisher: "National Institute for Health and Care Excellence",
      year: 2019,
      url: "https://www.nice.org.uk/guidance/ng145/chapter/Recommendations",
      gradingScheme: "NICE does not grade its recommendations; the verb ('offer', 'consider') carries the strength.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "hamnvik-2011",
      label: "Thyroid Dysfunction from Antineoplastic Agents",
      publisher: "Journal of the National Cancer Institute (Hamnvik, Larsen and Marqusee); funded by the US National Institutes of Health",
      year: 2011,
      url: "https://doi.org/10.1093/jnci/djr373",
      doi: "10.1093/jnci/djr373",
      gradingScheme: "Narrative review with the authors' recommendations; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "ata-2014",
      label: "Guidelines for the Treatment of Hypothyroidism: Prepared by the American Thyroid Association Task Force on Thyroid Hormone Replacement",
      publisher: "American Thyroid Association (Thyroid; Jonklaas et al.)",
      year: 2014,
      url: "https://doi.org/10.1089/thy.2014.0028",
      doi: "10.1089/thy.2014.0028",
      gradingScheme: "American College of Physicians system: strong or weak recommendation, with high, moderate or low quality of evidence.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "drui-2018",
      label: "Expert opinion on thyroid complications of new anti-cancer therapies: Tyrosine kinase inhibitors",
      publisher: "Annales d'Endocrinologie (Drui, Illouz, Do Cao and Caron; French Endocrine Society expert consensus)",
      year: 2018,
      url: "https://doi.org/10.1016/j.ando.2018.07.003",
      doi: "10.1016/j.ando.2018.07.003",
      gradingScheme: "Expert opinion; no grades appear in the abstract.",
      read: "abstract",
      accessed: "2026-11-17",
    },
  ],
  drugs: ["sunitinib", "pazopanib", "axitinib", "cabozantinib", "lenvatinib", "tivozanib", "vandetanib", "sorafenib", "fruquintinib"],
  targets: ["vegf"],
  terms: [],
  related: ["irae-thyroid", "levothyroxine", "hypertension-and-proteinuria-on-vegf-pathway-inhibitors"],
  gaps: [
    "No ESMO, ASCO or European Thyroid Association guideline specific to thyroid dysfunction from kinase inhibitors was found. The two schedules shown come from a 2011 review that calls its own advice not evidence based and from a 2018 French expert opinion.",
    "The French expert opinion (Drui 2018) was read as its abstract only: the publisher's page served no article text to a script and no open copy was found. Four steps (timing the test to day 1 of the cycle, managing the overactive phase, not stopping the kinase inhibitor, and withdrawing levothyroxine afterwards) rest on sentences of that abstract; its full reasoning, grading and any funding statement could not be checked. On 17 November 2026 the DOI again led only to the publisher's redirect page, and Europe PMC lists no open copy.",
    "Whether to treat a TSH between 5 and 10 mIU/L is unsettled, and no trial has tested screening or early levothyroxine in people on these medicines.",
    "No source read gives a levothyroxine starting dose tested in hypothyroidism caused by a kinase inhibitor. The 2011 review gives one for hypothyroidism from cancer medicines generally, and the ATA guideline of 2014 and NICE NG145 give figures for hypothyroidism in general; all three are in the variants. On 17 November 2026 a title search of Europe PMC and the Crossref record found no later edition of the ATA treatment guideline; the ATA's own website was not searched.",
    "The US labels for regorafenib and fruquintinib list hypothyroidism without a monitoring instruction, and the sorafenib label gives one only for thyroid cancer. Sorafenib is included because its label, the review and the ATA guideline name it; fruquintinib because its EU text reports hypothyroidism in 31.5%. Regorafenib (18% in its GIST trial and 6.4% in its liver cancer trial, US label) is not included in the linked medicines; its EU text, which could not be fetched on 16 November, read on 17 November 2026 and has no thyroid-specific monitoring schedule.",
    "Imatinib raises the levothyroxine dose needed in people who have had the thyroid removed, and the 2011 review says it is worth considering doubling the dose when imatinib is started; imatinib is mentioned in a variant but not covered.",
    "When a kinase inhibitor is combined with a checkpoint inhibitor (axitinib or lenvatinib with pembrolizumab, cabozantinib with nivolumab), thyroid dysfunction may be immune rather than from the kinase inhibitor; which protocol applies then was not addressed by any source read.",
    "Some reports link hypothyroidism on sunitinib or sorafenib to better cancer outcomes; the review says this may be a bias from longer treatment in people who respond, and that there is no prospective evidence that treating hypothyroidism worsens cancer outcomes.",
    "The year given for the four EU product information documents is the year they were read; the texts print no revision date. The year given for each US label is the year DailyMed published the version read.",
  ],
});
