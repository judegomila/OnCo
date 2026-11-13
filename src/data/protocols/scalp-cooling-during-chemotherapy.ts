import { protocol } from "./helpers";

/*
 * Scalp cooling during chemotherapy: who it suits and who it does not, preparing the hair, how long to cool before and
 * after the infusion, and what to expect. The device itself is the technology record `scalp-cooling`; the policy idea
 * of offering it to everyone is `idea-moon-hair-preservation-for-all`. This record is the procedure.
 *
 * No society guideline on scalp cooling was found: an Oncology Nursing Forum overview of systematic reviews (2022)
 * states that guideline recommendations are lacking, and a 2025 review says no national or international guideline sets
 * cooling times. The procedure therefore rests on the FDA decision documents, randomised trials of cooling time, the
 * Dutch Scalp Cooling Registry and Macmillan's patient guidance.
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl or the Europe PMC REST API into a scratch
 * directory, PDFs converted with pdftotext):
 * - FDA De Novo decision summary DEN150010, DigniCap Scalp Cooling System (2015): full text (PDF).
 * - FDA 510(k) summary K163484, Paxman Scalp Cooler (2017), including the SCALP trial procedure and results: full text.
 * - Lugtenberg et al., 45 against 20 minutes of post-infusion cooling with weekly paclitaxel (Support Care Cancer 2022):
 *   full text from PubMed Central (PMC9213299).
 * - Review of variability in cooling duration (Support Care Cancer 2025): full text from PubMed Central (PMC12578718).
 * - As abstracts from Europe PMC: 20 against 45 minutes with docetaxel (2016), 90 against 150 minutes with FEC (2019),
 *   Dutch Scalp Cooling Registry studies of wetting hair (2023) and post-infusion time (2025), a systematic review and
 *   meta-analysis of adverse effects and scalp metastasis (Breast Cancer Res Treat 2025), and an overview of systematic
 *   reviews (Oncol Nurs Forum 2022).
 * - Macmillan Cancer Support, scalp cooling page: public HTML.
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied from the raw text unchanged.
 */
export const scalpCoolingDuringChemotherapy = protocol({
  id: "scalp-cooling-during-chemotherapy",
  name: "Scalp cooling during chemotherapy: suitability, preparation and cooling times",
  aka: ["cold cap", "cool cap", "scalp hypothermia", "Paxman", "DigniCap", "post-infusion cooling time", "PICT", "preventing hair loss during chemotherapy"],
  domain: "supportive-care",
  tldr: "A cold cap worn before, during and after a chemotherapy drip can help some people keep much of their hair, especially with taxanes such as paclitaxel and docetaxel. It is not suitable for blood cancers or for people very sensitive to cold. For taxanes, trials show 20 minutes afterwards works as well as longer. It does not always work, and results depend on the chemotherapy.",
  simple: "A cold cap can help you keep your hair during some chemotherapy. It goes on before the drip and stays on a while after. It does not suit everyone.",
  summary: "Machine scalp cooling (DigniCap, Paxman) is FDA-authorised to reduce the likelihood of chemotherapy-induced alopecia in women with breast cancer (the 2015 De Novo and 2017 510(k) decisions read); later extensions were not read. In the SCALP randomised trial (Paxman, 142 evaluable), 50.5 per cent of cooled women kept their hair against 0 per cent of controls. Contraindications in the DigniCap instructions are cold sensitivity, cold agglutinin disease, cryoglobulinaemia and cryofibrinogenaemia, and haematological malignancy treated with curative intent. A 2025 meta-analysis of 67 studies found scalp metastasis in 0.15 per cent; common effects were chills (42 per cent), cap heaviness (35 per cent) and headache (30 per cent), and 18 per cent stopped cooling.\n\nThere is no guideline-defined schedule. Pre-cooling of 30 minutes is the accepted standard. Post-infusion cooling time depends on the regimen: randomised trials found 20 minutes as effective as 45 minutes after docetaxel and after weekly paclitaxel (the 2022 authors call 20 minutes the new standard of care), while with FEC extending from 90 to 150 minutes did not significantly reduce head-cover use; the Dutch registry (4680 patients) found under 85 minutes as effective as longer for the taxane and anthracycline regimens studied. Wetting hair before cooling lowers scalp temperature but, in the Dutch registry of 1825 patients, added little and slightly raised discontinuation for intolerance. Results are poorer with anthracyclines and with taxane plus anthracycline regimens.",
  asOf: "2026-11-11",
  setting: {
    who: ["nurse", "patient-or-carer"],
    where: ["chemotherapy-day-unit"],
  },
  population: "Adults with solid tumours receiving chemotherapy that causes hair loss, above all taxanes, in whom cooling is available. The FDA decisions read and most trials are in women with breast cancer; the Dutch registry and later studies include other solid tumours. Not for people with haematological cancers (the DigniCap instructions limit this to curative-intent treatment; Macmillan says not suitable for any blood cancer), or with cold sensitivity disorders.",
  trigger: "Chemotherapy likely to cause hair loss is planned and the person wants to try to keep their hair; cooling starts at the first cycle.",
  steps: [
    {
      action: "Before the first cycle, check that cooling is suitable: not for blood cancers treated to cure, or for cold sensitivity, cold agglutinin disease, cryoglobulinaemia or cryofibrinogenaemia",
      why: "In blood cancers, cancer cells may circulate in the scalp, and cooling could shelter them from the drugs; cold-sensitive conditions make cooling unsafe.",
      source: "dignicap-den150010",
      quote: "“Contraindications are cold sensitivity, cold agglutinin disease, cryoglobulinemia and cryofibrinogenemia.”",
      grade: "FDA De Novo decision summary (device instructions)",
    },
    {
      action: "Explain how likely it is to work with the planned regimen, and that results are poorer with anthracyclines and with taxane and anthracycline combinations",
      why: "Success varies with the drugs, dose and infusion time; knowing this helps people decide whether the time and discomfort are worth it.",
      source: "dignicap-den150010",
      quote: "“Attention: Clinical studies have produced variable success rates in patient reduction of chemotherapy induced alopecia with scalp cooling since the outcome is dependent on several factors including chemotherapy regimen, dose, duration of drug infusion, chemotherapy drug metabolism, and concomitant comorbidities.”",
      grade: "FDA De Novo decision summary (device instructions)",
    },
    {
      action: "Explain that the risk of cancer spreading to the scalp is very low",
      why: "People worry that cooling could protect cancer cells in the scalp; in pooled studies this happened in about 1 or 2 people in 1000.",
      source: "sc-ae-ma-2025",
      quote: "Secondary analysis of scalp metastases yielded an incidence of 0.15% (95% CI 0.05-0.47%).",
      grade: "systematic review and meta-analysis of 67 studies",
    },
    {
      action: "For Afro hair, remove weaves or braids before cooling so the cap sits close to the scalp",
      why: "The cap must touch the scalp evenly to cool it enough.",
      source: "macmillan",
      quote: "If you have Afro hair, you will need to remove any weaves or braids before trying scalp cooling.",
      grade: "patient information, ungraded",
    },
    {
      action: "Treat wetting the hair before fitting the cap as optional rather than required",
      why: "Damp hair conducts cold better, but in a large registry it made little difference to hair kept, and a few more people stopped because they could not tolerate it.",
      source: "sc-wet-2023",
      quote: "In a large patient group with mainly a European hair type and a high hair mass, no convincing evidence was found whether wetting hair prior to scalp cooling contributes to better prevention of CIA.",
      grade: "observational registry study, n = 1825",
    },
    {
      action: "Start cooling at least 30 minutes before the chemotherapy and keep it running throughout the infusion",
      why: "The scalp must already be cold, with its blood vessels narrowed, when the drug levels in the blood are highest.",
      source: "paxman-k163484",
      quote: "Scalp cooling will begin a minimum of 30 minutes pre-infusion administration of chemotherapy.",
      grade: "FDA 510(k) summary (SCALP trial procedure)",
    },
    {
      action: "After taxanes (docetaxel, or weekly paclitaxel), continue cooling for 20 minutes after the infusion ends",
      why: "Two randomised trials found 20 minutes kept hair as well as 45 or 90 minutes, which spares the person cold and chair time.",
      source: "lugtenberg-2022",
      quote: "A 20 min PICT is as effective as 45 and 90 min to prevent weekly paclitaxel-induced alopecia and should be the new standard of care.",
      grade: "randomised multi-centre trial (n = 74 analysed for the primary outcome)",
    },
    {
      action: "After anthracycline regimens, continue cooling for about 90 minutes after the infusion, as in the trials",
      why: "Anthracyclines are harder on the hair; trials used 90 minutes, and going longer did not clearly help.",
      source: "sc-fec-2019",
      quote: "Extending the duration of 90-min post-infusion scalp cooling to 150 min in patients treated with adjuvant FEC chemotherapy was well-tolerated but did not significantly diminish the need for head covering.",
      grade: "randomised multi-centre trial, n = 102",
    },
    {
      action: "Prepare the person for cold, heaviness of the cap and headache, and offer warmth and distraction",
      why: "These are the commonest effects and the main reasons people stop; most are worst in the first part of the first session.",
      source: "sc-ae-ma-2025",
      quote: "The most common AEs were generalized chills (42%, 95% confidence interval (CI) 26-58%), cap heaviness (35%, 95% CI 18-52%), and headache (30%, 95% CI 21-39%).",
      grade: "systematic review and meta-analysis of 67 studies",
    },
  ],
  bestInClass: {
    statement: "No society guideline sets a scalp cooling procedure; the best-supported version comes from the device authorisations and randomised trials of timing. Offer cooling to people with solid tumours on regimens where it works best (taxanes), after excluding haematological cancers treated to cure and cold-sensitivity disorders; pre-cool for 30 minutes; cool throughout; then 20 minutes after docetaxel or weekly paclitaxel (two randomised trials) and about 90 minutes after anthracyclines (trial standard, with no significant gain from 150 minutes). The Dutch registry suggests under 85 minutes suffices across the regimens it studied, but it is observational. Wetting the hair is optional. Manufacturers' instructions and many units use longer post-infusion times than these trials support.",
    sources: ["dignicap-den150010", "paxman-k163484", "lugtenberg-2022", "sc-docetaxel-2016", "sc-fec-2019", "sc-dutch-pict-2025", "sc-wet-2023", "sc-ae-ma-2025", "sc-variability-2025", "onf-overview-2022"],
  },
  variants: [
    {
      name: "Manual frozen gel caps",
      differs: "A cap filled with frozen gel, changed every 20 to 40 minutes by a nurse or carer, instead of a machine-cooled cap.",
      evidence: "Macmillan describes the method; the 2025 review notes that gel caps must be pre-frozen, often with dry ice, and changed every 25 to 30 minutes by a caregiver. No head-to-head comparison with machine cooling was read.",
      sources: ["macmillan", "sc-variability-2025"],
    },
    {
      name: "Longer pre-cooling of 30 to 45 minutes",
      differs: "Macmillan tells patients both types of cap need to be worn for 30 to 45 minutes before chemotherapy, longer than the 30-minute minimum in the SCALP trial.",
      evidence: "No trial of pre-cooling time was read; the 2025 review reports pre-cooling of 5 to 30 minutes in studies, with 30 minutes the generally accepted standard.",
      sources: ["macmillan", "sc-variability-2025"],
    },
    {
      name: "Fixed 90-minute post-infusion cooling for every regimen",
      differs: "The SCALP trial and many units cool for at least 90 minutes after every infusion, whatever the drug.",
      evidence: "Used in the SCALP trial that supported FDA clearance. For taxanes, two randomised trials found 20 minutes as effective; the 2025 review notes that institutions often follow manufacturer guidance or internal protocols because there is no guideline.",
      sources: ["paxman-k163484", "sc-docetaxel-2016", "lugtenberg-2022", "sc-variability-2025"],
    },
  ],
  grades: [
    { claim: "Paxman cooling preserved hair in 50.5 per cent against 0 per cent of controls (SCALP)", grade: "randomised trial, n = 142 evaluable, p < 0.0001", source: "paxman-k163484", quote: "Results show 48 (50.5%) out of 95 in the cooling group and 0 (0%) out of 47 in the control group had hair preservation." },
    { claim: "20 minutes of post-infusion cooling was as effective as 45 minutes with docetaxel", grade: "randomised multi-centre trial, n = 134, p = 0.5", source: "sc-docetaxel-2016", quote: "A 20-min post-infusion cooling time is effective and tolerable for patients treated with scalp cooling to prevent docetaxel-induced alopecia." },
    { claim: "Shorter post-infusion cooling (under 85 minutes) was as effective as longer across taxane and anthracycline regimens", grade: "observational registry study, 4680 patients, 68 hospitals", source: "sc-dutch-pict-2025", quote: "For all anthracycline and taxane-based chemotherapy regimens studied, shorter PICTs delivered comparable results to longer PICTs." },
    { claim: "Guideline recommendations on scalp cooling are lacking", grade: "overview of 14 systematic reviews (poor quality by AMSTAR 2)", source: "onf-overview-2022", quote: "There is a lack of guideline recommendations about the use of scalp cooling for preventing chemotherapy-induced alopecia (CIA)." },
  ],
  sources: [
    { key: "dignicap-den150010", label: "De Novo classification request DEN150010: DigniCap Scalp Cooling System, decision summary", publisher: "US Food and Drug Administration", year: 2015, url: "https://www.accessdata.fda.gov/cdrh_docs/reviews/DEN150010.pdf", gradingScheme: "Regulatory decision summary, not graded.", read: "full-text", accessed: "2026-11-11" },
    { key: "paxman-k163484", label: "510(k) summary K163484: Paxman Scalp Cooler", publisher: "US Food and Drug Administration", year: 2017, url: "https://www.accessdata.fda.gov/cdrh_docs/pdf16/K163484.pdf", gradingScheme: "Regulatory decision summary, not graded.", read: "full-text", accessed: "2026-11-11" },
    { key: "lugtenberg-2022", label: "Comparable effectiveness of 45- and 20-min post-infusion scalp cooling time in preventing paclitaxel-induced alopecia: a randomized controlled trial", publisher: "Supportive Care in Cancer", year: 2022, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9213299/", doi: "10.1007/s00520-022-07090-7", read: "full-text", accessed: "2026-11-11" },
    { key: "sc-docetaxel-2016", label: "Results of 20- versus 45-min post-infusion scalp cooling time in the prevention of docetaxel-induced alopecia", publisher: "Supportive Care in Cancer", year: 2016, url: "https://europepmc.org/abstract/MED/26805558", doi: "10.1007/s00520-016-3084-7", read: "abstract", accessed: "2026-11-11" },
    { key: "sc-fec-2019", label: "Prolonging the duration of post-infusion scalp cooling in the prevention of anthracycline-induced alopecia: a randomised trial in patients with breast cancer treated with adjuvant chemotherapy", publisher: "Supportive Care in Cancer", year: 2019, url: "https://europepmc.org/abstract/MED/30206728", doi: "10.1007/s00520-018-4432-6", read: "abstract", accessed: "2026-11-11" },
    { key: "sc-dutch-pict-2025", label: "Shorter post-infusion cooling times at least as effective as longer cooling times: an observational study of taxane- and anthracycline-based chemotherapies in the Dutch Scalp Cooling Registry", publisher: "Supportive Care in Cancer", year: 2025, url: "https://europepmc.org/abstract/MED/40434428", doi: "10.1007/s00520-025-09526-2", read: "abstract", accessed: "2026-11-11" },
    { key: "sc-wet-2023", label: "Minimal added value of wetting hair before scalp cooling to prevent chemotherapy-induced alopecia in cancer patients: results from the Dutch Scalp Cooling Registry", publisher: "Supportive Care in Cancer", year: 2023, url: "https://europepmc.org/abstract/MED/37067605", doi: "10.1007/s00520-023-07687-6", read: "abstract", accessed: "2026-11-11" },
    { key: "sc-ae-ma-2025", label: "Adverse effects of scalp cooling for the reduction of chemotherapy-induced alopecia: a systematic review and meta-analysis", publisher: "Breast Cancer Research and Treatment", year: 2025, url: "https://europepmc.org/abstract/MED/41269388", doi: "10.1007/s10549-025-07858-5", read: "abstract", accessed: "2026-11-11" },
    { key: "sc-variability-2025", label: "Scalp cooling therapy in chemotherapy-induced alopecia: addressing variability in cooling duration and efficacy", publisher: "Supportive Care in Cancer", year: 2025, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12578718/", doi: "10.1007/s00520-025-10058-y", read: "full-text", accessed: "2026-11-11" },
    { key: "onf-overview-2022", label: "Effectiveness, Safety, and Tolerance of Scalp Cooling for Chemotherapy-Induced Alopecia", publisher: "Oncology Nursing Forum", year: 2022, url: "https://europepmc.org/abstract/MED/35788740", doi: "10.1188/22.ONF.369-384", read: "abstract", accessed: "2026-11-11" },
    { key: "macmillan", label: "Scalp cooling", publisher: "Macmillan Cancer Support", year: 2026, url: "https://www.macmillan.org.uk/cancer-information-and-support/impacts-of-cancer/hair-loss/scalp-cooling", gradingScheme: "Patient information, not graded.", read: "public-summary", accessed: "2026-11-11" },
  ],
  upgrades: ["idea-moon-hair-preservation-for-all", "idea-upgrade-twenty-minute-post-infusion-scalp-cooling-after-taxanes", "idea-mach-cooling-off-the-chair"],
  gaps: [
    "No ESMO, ASCO, MASCC, ONS or NICE guideline on scalp cooling was found; the ESMO 2021 dermatological toxicity guideline, which covers alopecia, could not be read (the publisher refused a script).",
    "Hair care during and after cooling (gentle washing, avoiding heat styling, colouring and tight hairstyles) is widely advised by manufacturers and units, but no independent source setting it out could be read; Paxman's hair care page returned no usable text and the Breast Cancer Now and Breastcancer.org pages tried were not found.",
    "The FDA decisions read are limited to women with breast cancer; later extensions to other solid tumours were not read.",
    "The timing trials were read as abstracts, except the 2022 paclitaxel trial; post-infusion times for other drugs (for example antibody-drug conjugates such as trastuzumab deruxtecan or sacituzumab govitecan) were not covered by the trials read.",
    "Whether wetting the hair helps people with dense or Afro-textured hair is not known: the Dutch registry was mainly European hair type, and its authors call for a randomised trial.",
    "The SCALP result is from the 510(k) summary of the trial, not the published paper, which was not read here.",
  ],
  technologies: ["scalp-cooling", "manual-cold-caps", "wigs-cranial-prosthesis"],
  drugs: ["paclitaxel", "docetaxel", "doxorubicin", "epirubicin", "cyclophosphamide"],
  companies: ["paxman", "dignitana"],
  cancers: ["breast-cancer"],
  terms: ["hair-loss-and-scalp-cooling-breast", "anthracycline"],
  sections: ["supportive-care"],
  tags: ["protocol", "alopecia", "scalp-cooling", "supportive-care"],
});
