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
 */
export const hypothyroidismOnTyrosineKinaseInhibitors = protocol({
  id: "hypothyroidism-on-tyrosine-kinase-inhibitors",
  name: "Underactive thyroid on VEGFR-targeted tyrosine kinase inhibitors: thyroid tests and levothyroxine",
  aka: ["TKI-induced hypothyroidism", "sunitinib hypothyroidism", "axitinib hypothyroidism", "lenvatinib hypothyroidism", "cabozantinib thyroid dysfunction", "pazopanib hypothyroidism", "thyroid monitoring on kinase inhibitors", "TSH monitoring on anti-angiogenic tablets", "levothyroxine on tyrosine kinase inhibitors"],
  domain: "symptom-management",
  tldr: "Many targeted cancer tablets that block blood vessel growth, such as sunitinib, axitinib, lenvatinib and cabozantinib, can make the thyroid underactive. It causes tiredness, feeling cold, constipation and weight gain, which are easy to blame on the cancer. A blood test (TSH) before and during treatment finds it, and a daily levothyroxine tablet treats it. Your own team's plan comes first.",
  simple: "Some cancer tablets slow down the thyroid, a gland in the neck that sets how fast the body runs. You may feel tired, cold or constipated. A blood test before and during treatment shows it, and a small daily tablet called levothyroxine puts it right. You do not usually need to stop the cancer tablets.",
  summary: "VEGFR-targeted kinase inhibitors cause hypothyroidism, sometimes after a brief thyrotoxic phase, probably through loss of thyroid capillaries. Label rates: hypothyroidism in 19% on axitinib (TSH rising to 10 or more in 32% of those under 5 beforehand), thyroid dysfunction in 19% on cabozantinib, hypothyroidism in 21% to 24% on lenvatinib, 8% on tivozanib, 4% to 7% on pazopanib and 17% to 21% on fruquintinib (31.5% in the EU text, median onset 56 days). Reviews put it at 32% to 85% on sunitinib, with onset from 4 to 94 weeks. In people already taking levothyroxine, including after thyroidectomy, these medicines raise the dose needed: on vandetanib 49% needed more against 17% on placebo.\n\nThe regulators agree on thyroid function before treatment and during it, and differ on how often: at least monthly for lenvatinib (US); every 3 months for sunitinib (EU); at baseline, 2 to 4 weeks, 8 to 12 weeks and then every 3 months for vandetanib; 'periodically' for axitinib, pazopanib and tivozanib; 'as clinically indicated' for cabozantinib (US). The sorafenib US label asks for monthly TSH only in differentiated thyroid cancer, where it impairs TSH suppression; the regorafenib and fruquintinib US labels list hypothyroidism without a monitoring instruction. Two endocrine reviews give tighter schedules: TSH monthly for 4 months then every 2 to 3 months (Hamnvik 2011), or monthly for 6 months, on day 1 of the cycle for intermittent regimens, then every 2 to 3 months (French expert opinion 2018, abstract only).\n\nTreatment: levothyroxine for a TSH above 10 mIU/L, a low free T4 or symptoms (both reviews). They differ below that: Hamnvik suggests a low-dose trial for a TSH of 5 to 10 because symptoms cannot be told from those of cancer treatment; the French opinion treats only symptomatic hypothyroidism or a TSH above 10. The ATA guideline covers dosing: full or partial replacement titrated to TSH, rechecked 4 to 6 weeks after any change. The kinase inhibitor is not stopped for thyroid dysfunction, and no label has a dose rule for it.",
  asOf: "2026-11-16",
  setting: {
    who: ["doctor", "nurse", "pharmacist"],
    where: ["outpatient-clinic", "community", "telephone-triage"],
  },
  population: "Adults taking a VEGFR-targeted tyrosine kinase inhibitor for kidney, liver, thyroid, bowel or other cancers, whether or not they had thyroid disease beforehand. People with thyroid cancer who take levothyroxine to keep TSH low have a TSH target set by their thyroid cancer team, and these medicines can push TSH above it. Thyroid problems from checkpoint inhibitors, alone or combined with a kinase inhibitor, behave differently and have their own protocol. Children and pregnancy are not covered.",
  trigger: "One of these medicines is about to be started, or a person taking one has a raised TSH or symptoms that could be thyroid.",
  steps: [
    {
      action: "Measure thyroid function (TSH) before the first dose",
      why: "A starting value shows existing thyroid disease and gives something to compare later results with.",
      source: "smpc-sutent",
      quote: "Baseline laboratory measurement of thyroid function is recommended in all patients.",
    },
    {
      action: "Treat an existing underactive or overactive thyroid before starting, and keep it controlled during treatment",
      why: "The medicine tends to make existing thyroid disease worse, and it is easier to start from a normal level.",
      source: "label-tivozanib",
      quote: "Treat hypothyroidism and hyperthyroidism to maintain euthyroid state before and during treatment with FOTIVDA.",
    },
    {
      action: "Use TSH as the test, and add free T4 whenever TSH is abnormal",
      why: "TSH moves first and furthest when the thyroid slows; free T4 shows how severe it is.",
      source: "hamnvik-2011",
      quote: "The single best screening test for thyroid dysfunction is a TSH assay, except in patients with pituitary disease",
    },
    {
      action: "Repeat thyroid tests on the schedule in that medicine's label; for lenvatinib, at least monthly",
      why: "Most cases have no clear symptoms at first, and the thyroid can fail weeks or many months into treatment.",
      source: "label-lenvatinib",
      quote: "Monitor thyroid function prior to initiating LENVIMA and at least monthly during treatment.",
    },
    {
      action: "Where the label says only 'periodically', check TSH monthly for the first four months and then every two to three months",
      why: "The first months carry the highest risk; a fixed schedule avoids relying on symptoms.",
      source: "hamnvik-2011",
      quote: "TSH before treatment and then every month for the first 4 mo, then every 2–3 mo.",
    },
    {
      action: "For a medicine taken with planned breaks, such as sunitinib four weeks on and two weeks off, take the TSH on day 1 of the new cycle",
      why: "TSH rises during the weeks on treatment and partly recovers in the break, so the timing of the test changes the result.",
      source: "drui-2018",
      quote: "During TKI treatment, TSH should be assayed monthly, or at end of off-period (i.e., day 1 of new cycle after interruption), for the first 6 months, then every 2-3 months or in case of clinical signs of dysthyroidism.",
    },
    {
      action: "Ask at each visit about tiredness, feeling cold, constipation, weight gain, a slow pulse, low mood, and also palpitations, tremor or weight loss, and test whenever they appear",
      why: "These symptoms are easily put down to the cancer or its treatment, which can lead to the cancer medicine being reduced when the thyroid is the cause.",
      source: "label-sunitinib",
      quote: "Monitor patients closely for signs and symptoms of thyroid dysfunction, including hypothyroidism, hyperthyroidism, and thyroiditis, during treatment with SUTENT.",
    },
    {
      action: "If the first change is an overactive result (low TSH), treat symptoms only and recheck, because an underactive phase usually follows",
      why: "The gland often leaks stored hormone briefly before it slows down; treatment at that stage is for symptoms only.",
      source: "drui-2018",
      quote: "Treatment is symptomatic in case of thyrotoxicosis, and levothyroxine replacement therapy is initiated in case of symptomatic hypothyroidism or TSH>10mIU/L.",
    },
    {
      action: "Start levothyroxine when TSH is above 10 mIU/L or free T4 is low",
      why: "At this level the thyroid is clearly failing, and replacement improves tiredness in about half of people.",
      source: "hamnvik-2011",
      quote: "In patients with TSH greater than 10 mIU/L or with low free T4 levels, treatment should be initiated.",
    },
    {
      action: "For a TSH between 5 and 10 mIU/L with a normal free T4, either recheck in a few weeks or try low-dose levothyroxine, deciding on symptoms",
      why: "A mild rise may settle or may be the start of failure, and in someone on cancer treatment it is hard to tell whether tiredness is from the thyroid. Sources differ here (see variants).",
      source: "hamnvik-2011",
      quote: "Therefore, it seems reasonable to start low-dose levothyroxine therapy in these patients as a therapeutic trial, especially if they are receiving an agent associated with a high risk of hypothyroidism.",
    },
    {
      action: "Dose levothyroxine as for any hypothyroidism: full or partial replacement adjusted to TSH, starting lower in older people and those with heart disease, with TSH rechecked 4 to 6 weeks after each change",
      why: "Levothyroxine takes four to six weeks to reach a steady level, and too fast a start can strain a diseased heart.",
      source: "ata-2014",
      quote: "Thyroid hormone therapy should be initiated as an initial full replacement or as partial replacement with gradual increments in the dose titrated upward using serum thyrotropin as the goal.",
      grade: "Strong recommendation. Moderate quality of evidence.",
    },
    {
      action: "In people already taking levothyroxine, recheck TSH soon after the kinase inhibitor is started and expect to increase the dose",
      why: "These medicines change how thyroid hormone is broken down, so the same dose stops being enough, especially after thyroid removal.",
      source: "ata-2014",
      quote: "Serum thyrotropin should also be reassessed in patients who are started on agents such as tyrosine kinase inhibitors that affect thyroxine metabolism and thyroxine or triiodothyronine deiodination.",
      grade: "Strong recommendation. Low-quality evidence.",
    },
    {
      action: "Continue the kinase inhibitor at the same dose; thyroid dysfunction is treated, not a reason to stop",
      why: "An underactive thyroid is fully treatable with a tablet, while stopping the cancer medicine risks the cancer growing.",
      source: "drui-2018",
      quote: "TKIs should not be discontinued because of onset of thyroid dysfunction.",
    },
    {
      action: "When the kinase inhibitor is stopped for good, recheck thyroid function and consider reducing levothyroxine gradually under monitoring",
      why: "The thyroid recovers in some people and not in others, and it cannot be predicted which.",
      source: "drui-2018",
      quote: "At TKI termination, remission of hypothyroidism is possible but unpredictable, and progressive discontinuation of levothyroxine may be considered under monitoring.",
    },
  ],
  bestInClass: {
    statement: "Every label that addresses the problem asks for thyroid function before treatment and during it, with thyroid disease treated to keep the person euthyroid, and none asks for the kinase inhibitor to be changed. They differ on frequency: at least monthly (lenvatinib, US label); every 3 months (sunitinib, EU text; the US label says 'periodically'); baseline, 2 to 4 weeks, 8 to 12 weeks, then every 3 months (vandetanib); 'periodically' (axitinib, pazopanib, tivozanib; lenvatinib in the EU text); testing 'as clinically indicated' (cabozantinib, US). Two endocrine sources advise a fixed, tighter schedule for all of them: monthly for 4 months then every 2 to 3 months (Hamnvik 2011, which calls its schedule logical but not evidence based), or monthly for 6 months then every 2 to 3 months (French Endocrine Society expert opinion 2018, read as abstract only). Both start levothyroxine for a TSH above 10 mIU/L or symptoms; below 10 they differ, Hamnvik allowing a low-dose trial and the French opinion treating only if symptomatic. The ATA hypothyroidism guideline gives the only graded statements: reassess TSH when a kinase inhibitor is started in someone on levothyroxine (strong recommendation, low-quality evidence) and titrate levothyroxine to TSH with a recheck 4 to 6 weeks after any change (strong recommendation, moderate quality). No ESMO, ASCO or European Thyroid Association guideline on this was found.",
    sources: ["label-lenvatinib", "label-sunitinib", "smpc-sutent", "label-vandetanib", "label-axitinib", "label-pazopanib", "label-tivozanib", "label-cabozantinib", "smpc-lenvima", "hamnvik-2011", "drui-2018", "ata-2014"],
  },
  variants: [
    {
      name: "Monitoring frequency by medicine (labels)",
      differs: "Lenvatinib: before treatment and at least monthly (US); before and periodically (EU). Sunitinib: baseline and periodically (US); baseline and every 3 months (EU). Vandetanib: TSH at baseline, 2 to 4 weeks, 8 to 12 weeks and every 3 months. Axitinib, pazopanib, tivozanib: before and periodically. Cabozantinib (US): assess for signs before and during treatment, with testing as clinically indicated. Sorafenib (US): TSH monthly in people with differentiated thyroid cancer, with thyroid replacement adjusted; no instruction for other cancers. Regorafenib and fruquintinib (US): hypothyroidism listed as an adverse reaction, no monitoring instruction.",
      evidence: "Regulatory texts; the intervals are not from trials of monitoring. Rates in the labels: axitinib 19% (sorafenib 8% in the same trial); cabozantinib 19% thyroid dysfunction; lenvatinib 21% to 24% grade 1 or 2 hypothyroidism; tivozanib 8%; pazopanib 7% in the kidney cancer trial and 5% in the sarcoma trial; fruquintinib 21% and 17% in its two US trial tables and 31.5% in the EU text; regorafenib 6.4% in one trial.",
      sources: ["label-lenvatinib", "smpc-lenvima", "label-sunitinib", "smpc-sutent", "label-vandetanib", "label-axitinib", "label-pazopanib", "label-tivozanib", "label-cabozantinib", "label-sorafenib", "label-fruquintinib", "smpc-fruzaqla"],
    },
    {
      name: "Fixed endocrine schedules",
      differs: "TSH before treatment, monthly for the first 4 months, then every 2 to 3 months (Hamnvik 2011, for sunitinib, sorafenib, axitinib and related medicines). TSH monthly for the first 6 months, timed to day 1 of the cycle on intermittent regimens, then every 2 to 3 months; and for people already on levothyroxine, monthly for 3 months then every 3 months (French expert opinion 2018).",
      evidence: "Expert opinion from the reported time course: in the review, hypothyroidism on sunitinib occurred in 32% to 85% across studies, starting 4 to 94 weeks into treatment. Hamnvik 2011 states that no official screening recommendations existed and that its own are not evidence based.",
      sources: ["hamnvik-2011", "drui-2018"],
    },
    {
      name: "Treating a mildly raised TSH (5 to 10 mIU/L)",
      differs: "A trial of low-dose levothyroxine even without clear symptoms (Hamnvik 2011), against levothyroxine only for symptomatic hypothyroidism or a TSH above 10 mIU/L (French expert opinion 2018).",
      evidence: "Opinion on both sides. Hamnvik notes that treating subclinical hypothyroidism is generally discouraged in healthy people for lack of evidence of benefit, and argues that in cancer patients symptoms cannot be separated from those of treatment. No trial in people on kinase inhibitors was cited.",
      sources: ["hamnvik-2011", "drui-2018"],
    },
    {
      name: "People already on levothyroxine, including after thyroid removal",
      differs: "No new diagnosis to make: TSH is rechecked every 4 weeks after starting the kinase inhibitor and the levothyroxine dose raised as needed, then every 2 months once stable (Hamnvik 2011, written for imatinib, sorafenib and motesanib). In thyroid cancer the target TSH is the thyroid cancer team's, and lenvatinib and sorafenib make TSH suppression harder to hold.",
      evidence: "Vandetanib label: in the medullary thyroid cancer trial, where 90% had had a thyroidectomy, 49% needed more thyroid replacement against 17% on placebo. Lenvatinib label: among thyroid cancer patients with a normal TSH at baseline, TSH rose above 0.5 mU/L in 57%. Sorafenib label: TSH rose above 0.5 mU/L in 41% against 16% on placebo. The French opinion puts the share of levothyroxine users needing a higher dose at 20% to 60%. The ATA guideline grades reassessing TSH as a strong recommendation on low-quality evidence.",
      sources: ["hamnvik-2011", "label-vandetanib", "label-lenvatinib", "label-sorafenib", "drui-2018", "ata-2014"],
    },
  ],
  grades: [
    { claim: "Reassess TSH when a tyrosine kinase inhibitor is started in a person on levothyroxine", grade: "Strong recommendation. Low-quality evidence.", source: "ata-2014" },
    { claim: "Start levothyroxine as full or partial replacement titrated to TSH, with TSH 4 to 6 weeks after a dose change", grade: "Strong recommendation. Moderate quality of evidence.", source: "ata-2014", quote: "Dose adjustments should be made when there are large changes in body weight, with aging, and with pregnancy, with thyrotropin assessment 4–6 weeks after any dosage change." },
    { claim: "Thyroid function at baseline and every 3 months on sunitinib (EU)", grade: "Regulatory product information; not graded", source: "smpc-sutent", quote: "During sunitinib treatment, routine monitoring of thyroid function should be performed every 3 months." },
    { claim: "Thyroid function at baseline, periodically and as clinically indicated on sunitinib (US)", grade: "Regulatory label; not graded", source: "label-sunitinib", quote: "Monitor thyroid function at baseline, periodically during treatment and as clinically indicated." },
    { claim: "Thyroid function before and periodically throughout axitinib, treating to a euthyroid state", grade: "Regulatory label; not graded", source: "label-axitinib", quote: "Monitor thyroid function before initiation of, and periodically throughout, treatment with INLYTA. Treat hypothyroidism and hyperthyroidism according to standard medical practice to maintain euthyroid state." },
    { claim: "Thyroid tests at baseline and during pazopanib", grade: "Regulatory label; not graded", source: "label-pazopanib", quote: "Monitor thyroid tests at baseline, during treatment and as clinically indicated and manage hypothyroidism as appropriate." },
    { claim: "Cabozantinib: assess for signs, test as clinically indicated", grade: "Regulatory label; not graded", source: "label-cabozantinib", quote: "Thyroid function testing and management of dysfunction should be performed as clinically indicated" },
    { claim: "Vandetanib: TSH at baseline, 2 to 4 weeks, 8 to 12 weeks, then every 3 months", grade: "Regulatory label; not graded", source: "label-vandetanib", quote: "Obtain Thyroid-stimulating hormone (TSH) at baseline, at 2 to 4 weeks and 8 to 12 weeks after starting treatment with CAPRELSA, and every 3 months thereafter." },
    { claim: "Sorafenib: TSH monthly in differentiated thyroid cancer", grade: "Regulatory label; not graded", source: "label-sorafenib", quote: "Monitor TSH levels monthly and adjust thyroid replacement medication as needed in patients with DTC." },
    { claim: "Lenvatinib (EU): monitor before and periodically; in thyroid cancer adjust thyroid hormone to the TSH target", grade: "Regulatory product information; not graded", source: "smpc-lenvima", quote: "Hypothyroidism should be treated according to standard medical practice to maintain euthyroid state." },
    { claim: "Fruquintinib: hypothyroidism in 31.5%, median onset 56 days, none leading to dose change (EU)", grade: "Regulatory product information; not graded", source: "smpc-fruzaqla", quote: "No events led to dose reduction or discontinuation." },
    { claim: "The review's screening schedule is reasoned, not evidence based", grade: "Narrative review; not graded", source: "hamnvik-2011", quote: "Although these recommendations are not evidence based, they are logical given the reported complications and provide a framework for providers to identify and treat thyroid dysfunction before the appearance of symptoms." },
    { claim: "People on levothyroxine before a kinase inhibitor: TSH every 4 weeks, then every 2 months once stable", grade: "Narrative review; not graded", source: "hamnvik-2011", quote: "Once the TSH and dose of levothyroxine are stable, the frequency of monitoring can be decreased to every 2 months." },
    { claim: "Levothyroxine for symptomatic hypothyroidism or TSH above 10 mIU/L; the kinase inhibitor is not stopped", grade: "Expert opinion (French Endocrine Society), read as abstract; not graded", source: "drui-2018" },
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
      accessed: "2026-11-16",
    },
    {
      key: "label-pazopanib",
      label: "Votrient (pazopanib) tablets: US prescribing information, section 5.13",
      publisher: "Novartis, via DailyMed (US National Library of Medicine)",
      year: 2025,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=eeaaaf38-fb86-4d9f-a19d-0f61daac2fd7",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "label-axitinib",
      label: "Inlyta (axitinib) tablets: US prescribing information, section 5.7",
      publisher: "Pfizer, via DailyMed (US National Library of Medicine)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=8a903e31-936e-4ed7-8a59-59f32374f338",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "label-cabozantinib",
      label: "Cabometyx (cabozantinib) tablets: US prescribing information, section 5.14",
      publisher: "Exelixis, via DailyMed (US National Library of Medicine)",
      year: 2025,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=3850cce2-6137-42e5-a792-d318c4a4b3b5",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "label-lenvatinib",
      label: "Lenvima (lenvatinib) capsules: US prescribing information, section 5.13",
      publisher: "Eisai, via DailyMed (US National Library of Medicine)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f4bedd21-efde-44c6-9d9c-b48b78d7ed1e",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "label-tivozanib",
      label: "Fotivda (tivozanib) capsules: US prescribing information, section 5.8",
      publisher: "AVEO, via DailyMed (US National Library of Medicine)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=de77155c-ecf2-4f15-9758-21d271449d83",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "label-vandetanib",
      label: "Caprelsa (vandetanib) tablets: US prescribing information, sections 2.1 and 5.8",
      publisher: "Genzyme (Sanofi), via DailyMed (US National Library of Medicine)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=e5721cb8-4185-47b9-bbb3-1c587e558a03",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "label-fruquintinib",
      label: "Fruzaqla (fruquintinib) capsules: US prescribing information, section 6.1",
      publisher: "Takeda, via DailyMed (US National Library of Medicine)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=186d786e-dc8a-45f2-b5e1-01ac0201879f",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "label-sorafenib",
      label: "Nexavar (sorafenib) tablets: US prescribing information, sections 5.12 and 6",
      publisher: "Bayer, via DailyMed (US National Library of Medicine)",
      year: 2024,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b50667e4-5ebc-4968-a646-d605058dbef0",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "smpc-sutent",
      label: "Sutent: EU summary of product characteristics, section 4.4 (the text served by the EMA on the day it was read)",
      publisher: "European Medicines Agency",
      year: 2026,
      url: "https://www.ema.europa.eu/en/documents/product-information/sutent-epar-product-information_en.pdf",
      gradingScheme: "Regulatory product information; not graded.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "smpc-lenvima",
      label: "Lenvima: EU summary of product characteristics, section 4.4 (the text served by the EMA on the day it was read)",
      publisher: "European Medicines Agency",
      year: 2026,
      url: "https://www.ema.europa.eu/en/documents/product-information/lenvima-epar-product-information_en.pdf",
      gradingScheme: "Regulatory product information; not graded.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "smpc-fruzaqla",
      label: "Fruzaqla: EU summary of product characteristics, section 4.8 (the text served by the EMA on the day it was read)",
      publisher: "European Medicines Agency",
      year: 2026,
      url: "https://www.ema.europa.eu/en/documents/product-information/fruzaqla-epar-product-information_en.pdf",
      gradingScheme: "Regulatory product information; not graded.",
      read: "full-text",
      accessed: "2026-11-16",
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
      accessed: "2026-11-16",
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
      accessed: "2026-11-16",
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
      accessed: "2026-11-16",
    },
  ],
  drugs: ["sunitinib", "pazopanib", "axitinib", "cabozantinib", "lenvatinib", "tivozanib", "vandetanib", "sorafenib", "fruquintinib"],
  targets: ["vegf"],
  terms: [],
  related: ["irae-thyroid", "levothyroxine"],
  gaps: [
    "No ESMO, ASCO or European Thyroid Association guideline specific to thyroid dysfunction from kinase inhibitors was found. The two schedules shown come from a 2011 review that calls its own advice not evidence based and from a 2018 French expert opinion.",
    "The French expert opinion (Drui 2018) was read as its abstract only: the publisher's page served no article text to a script and no open copy was found. Four steps (timing the test to day 1 of the cycle, managing the overactive phase, not stopping the kinase inhibitor, and withdrawing levothyroxine afterwards) rest on sentences of that abstract; its full reasoning, grading and any funding statement could not be checked.",
    "Whether to treat a TSH between 5 and 10 mIU/L is unsettled, and no trial has tested screening or early levothyroxine in people on these medicines.",
    "No source read gives a levothyroxine starting dose specific to kinase inhibitor hypothyroidism; dosing follows the general ATA guideline of 2014, which has not been checked against later editions or against NICE NG145.",
    "The US labels for regorafenib and fruquintinib list hypothyroidism without a monitoring instruction, and the sorafenib label gives one only for thyroid cancer. Sorafenib is included because its label, the review and the ATA guideline name it; fruquintinib because its EU text reports hypothyroidism in 31.5%. Regorafenib (6.4% in one trial) is not included in the linked medicines, and its EU text could not be fetched (HTTP 429).",
    "Imatinib and other BCR-ABL inhibitors raise the levothyroxine dose needed in people already on it, by a different mechanism; they are mentioned in a variant but not covered.",
    "When a kinase inhibitor is combined with a checkpoint inhibitor (axitinib or lenvatinib with pembrolizumab, cabozantinib with nivolumab), thyroid dysfunction may be immune rather than from the kinase inhibitor; which protocol applies then was not addressed by any source read.",
    "Some reports link hypothyroidism on sunitinib or sorafenib to better cancer outcomes; the review explains why that may be an artefact of longer treatment, and it is not a reason to leave hypothyroidism untreated.",
    "The year given for the three EU product information documents is the year they were read.",
  ],
});
