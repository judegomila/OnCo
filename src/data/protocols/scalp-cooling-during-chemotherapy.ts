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
 *
 * Added on 16 November 2026: hair care during a course of scalp cooling (the three steps marked `practice`, five
 * variants, two evidence rows, eight sources and the gaps that name them). What was read for it, raw, on that day:
 * - INDUSTRY sources, labelled as such wherever they are used: Paxman's patient site coldcap.com (the haircare guide,
 *   haircare questions, getting your hair ready, and shedding pages; undated) and Dignitana's DigniCap hair care page
 *   (undated). The two manufacturers' guides are word for word the same in most passages. No trial is cited on any of
 *   these pages, so nothing from them is a sourced step.
 * - Breast Cancer Now, Breast cancer and hair loss (last reviewed February 2022; its own planned review date of
 *   February 2024 has passed): public web page. Its hair care tips are for hair during breast cancer treatment in
 *   general, not for scalp cooling in particular.
 * - Macmillan's scalp cooling page was fetched again (it now shows a review date of 1 December 2022).
 * - Minta et al., interview study of Black women with breast cancer (Support Care Cancer 2026): full text, Europe PMC
 *   (PMC13144178). Dilawari et al., feasibility study of Paxman cooling in Black patients (Oncologist 2021): abstract
 *   only (the PubMed Central copy returned an error), and the abstract text is cut off where it gives its p value and
 *   hair loss grades, so those are not stated. Araoye et al. (J Clin Oncol 2020), which the interview study cites
 *   for hair preparation, has no abstract and its full text could not be fetched; it is not cited.
 * - Not found or not reachable: the Cancer Research UK scalp cooling page (the addresses tried returned 404); no
 *   MASCC guidance on hair care during cooling was found, and the ESMO dermatological toxicity guideline remains
 *   unread. No trial comparing hair care regimens during scalp cooling was found in Europe PMC title searches.
 */
export const scalpCoolingDuringChemotherapy = protocol({
  id: "scalp-cooling-during-chemotherapy",
  name: "Scalp cooling during chemotherapy: suitability, preparation and cooling times",
  aka: ["cold cap", "cool cap", "scalp hypothermia", "Paxman", "DigniCap", "post-infusion cooling time", "PICT", "preventing hair loss during chemotherapy"],
  domain: "supportive-care",
  tldr: "A cold cap worn before, during and after a chemotherapy drip can help some people keep much of their hair, especially with taxanes such as paclitaxel and docetaxel. It is not suitable for blood cancers or for people very sensitive to cold. For taxanes, trials show 20 minutes afterwards works as well as longer. It does not always work, and results depend on the chemotherapy.",
  simple: "A cold cap can help you keep your hair during some chemotherapy. It goes on before the drip and stays on a while after. It does not suit everyone.",
  summary: "Machine scalp cooling (DigniCap, Paxman) is FDA-authorised to reduce the likelihood of chemotherapy-induced alopecia in women with breast cancer (the 2015 De Novo and 2017 510(k) decisions read); later extensions were not read. In the SCALP randomised trial (Paxman, 142 evaluable), 50.5 per cent of cooled women kept their hair against 0 per cent of controls. Contraindications in the DigniCap instructions are cold sensitivity, cold agglutinin disease, cryoglobulinaemia and cryofibrinogenaemia, and haematological malignancy treated with curative intent. A 2025 meta-analysis of 67 studies found scalp metastasis in 0.15 per cent; common effects were chills (42 per cent), cap heaviness (35 per cent) and headache (30 per cent), and 18 per cent stopped cooling.\n\nThere is no guideline-defined schedule. Pre-cooling of 30 minutes is the accepted standard. Post-infusion cooling time depends on the regimen: randomised trials found 20 minutes as effective as 45 minutes after docetaxel and after weekly paclitaxel (the 2022 authors call 20 minutes the new standard of care), while with FEC extending from 90 to 150 minutes did not significantly reduce head-cover use; the Dutch registry (4680 patients) found under 85 minutes as effective as longer for the taxane and anthracycline regimens studied. Wetting hair before cooling lowers scalp temperature but, in the Dutch registry of 1825 patients, added little and slightly raised discontinuation for intolerance. Results are poorer with anthracyclines and with taxane plus anthracycline regimens.\n\nHair care between sessions has no trial evidence. The advice comes from the device manufacturers (Paxman and Dignitana, whose guides are largely identical) and from charity pages: wash no more than twice a week and no less than once every ten days with a mild shampoo, remove shed hair daily with gentle brushing or finger combing to prevent matting, and avoid heat styling, colouring, relaxing and tight styles. For Afro-textured hair the sources disagree on preparation, and the one prospective study in Black patients (15 enrolled) closed early for lack of efficacy. The person's own unit gives the instructions for their cap and hair type, and those come first.",
  asOf: "2026-11-16",
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
    {
      action: "Between sessions, wash the hair gently no more than twice a week and no less than once every ten days, with a mild unperfumed shampoo and warm rather than hot water",
      why: "Chemotherapy dries the hair and makes the scalp sensitive, so frequent or rough washing adds damage, while leaving it too long lets shed hair build up and tangle.",
      practice: "No trial has compared washing schedules during scalp cooling. Breast Cancer Now gives this frequency, a mild unperfumed shampoo and warm rather than hot water for hair during treatment in general, and both manufacturers' guides (Paxman, Dignitana: industry sources) give the same frequency for scalp cooling.",
    },
    {
      action: "Remove shed hair every day by gentle brushing, a wide-tooth comb or finger combing, and keep doing so when shedding is heavy",
      why: "Loose hairs left in place knot around the hair that is still growing and can mat; gentle brushing takes out only hair that has already been shed.",
      practice: "No trial has tested brushing or detangling during scalp cooling. Both manufacturers (industry sources) advise it morning and night and say matting can sometimes be irreversible; Breast Cancer Now advises gentle brushing with a soft brush or wide-tooth comb during treatment in general.",
    },
    {
      action: "During the course, avoid heated styling tools, hair dye, perms and relaxers, and styles that pull at the roots such as tight plaits, weaves and extensions",
      why: "Heat, chemicals and tension stress hair that chemotherapy has already made dry and fragile, and dye can irritate a sensitive scalp.",
      practice: "No trial evidence. Breast Cancer Now lists these as things to avoid during treatment, Macmillan tells people with Afro hair to avoid chemical relaxing, and both manufacturers (industry sources) say the same and allow a hairdryer on a cool setting.",
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
    {
      name: "Hair care, manufacturers' regimen: washing, shampoo and conditioner (industry guidance)",
      differs: "Paxman and Dignitana, the device makers, give the same washing advice: \"Don’t wash your hair more than twice a week or less than once every 10 days\", with a hypoallergenic, sulfate-free shampoo and conditioner, smoothed in rather than rubbed, and plenty of conditioner and natural oils, but no oils the day before treatment because they make the hair harder to wet for the cap. Both say to avoid baby shampoo. Neither guide states a water temperature.",
      evidence: "Industry guidance with no trial cited; no study comparing shampoos, washing frequency or water temperature during scalp cooling was found. Breast Cancer Now, an independent charity, gives the same washing frequency for hair during treatment in general and adds that warm rather than hot water should be used. The sources differ on the scalp: the manufacturers say to avoid circular rubbing because it tangles the hair, while Breast Cancer Now's general tips say \"Massage the scalp to improve the blood supply to the hair follicles\", advice not written for scalp cooling.",
      sources: ["paxman-haircare-guide", "dignicap-haircare", "bcn-hair-loss"],
    },
    {
      name: "Hair care, manufacturers' regimen: brushing, shedding and matting (industry guidance)",
      differs: "Brush gently morning and night, and before washing, even during heavy shedding. Paxman states: \"This won’t remove hair that wouldn’t have fallen out anyway, but it can help to prevent knotting, tangling, and even matting.\" Hair may be tied back loosely in a low ponytail, plait or bun, without tension at the roots. Shedding is said to be expected even when all the guidance is followed, to be heavier with anthracycline regimens than with taxanes, and to continue for some weeks after the last cycle; Dignitana suggests speaking to a doctor if raised shedding continues 12 weeks after the final treatment.",
      evidence: "Industry guidance with no trial cited. No study of brushing, detangling or the management of matted hair during scalp cooling was found, and no source read says what to do once hair has matted beyond preventing it; for curly and coily hair the guides warn that matting can sometimes be irreversible.",
      sources: ["paxman-haircare-guide", "paxman-haircare-faqs", "paxman-shedding", "dignicap-haircare"],
    },
    {
      name: "Hair care, manufacturers' regimen: heat styling and colouring (industry guidance)",
      differs: "No straighteners, curling wands or other heated tools; a hairdryer on a cool setting is allowed, using the fingers rather than a brush. Paxman says not to dye the hair during chemotherapy, whether the dye is natural, from a box or applied by a hairdresser, that colour can be refreshed ideally a week or more before the first treatment, avoiding bleach, and that dyeing is safe again once shedding has returned to a normal rate. Dry trims and cuts during treatment are allowed, and Paxman says a short cut does not improve results.",
      evidence: "Industry guidance with no trial cited. Breast Cancer Now, for hair during treatment in general, also lists hair colours and dyes, perms, relaxers and \"Excessive heat from hair straighteners, hairdryers, hot brushes and heated rollers\" as things to avoid. No study of colouring or heat styling during scalp cooling was found.",
      sources: ["paxman-haircare-guide", "paxman-haircare-faqs", "paxman-hair-ready", "dignicap-haircare", "bcn-hair-loss"],
    },
    {
      name: "Curly, coily and Afro-textured hair: manufacturers' care regimen (industry guidance)",
      differs: "For what the guides call type 3 and 4 hair: wash less often than usual; work shampoo and conditioner through with the fingers or a wide-tooth comb; finger comb every day, ideally morning and night, and comb through with conditioner at each wash and every couple of days in between; use plenty of conditioner, leave-in conditioner and natural oils; make sure the hair is fully wet before the cap goes on, topping up with a spray bottle; use a diffuser on a low, cool setting; no dry shampoo; and \"No weaves or protective styling that cause root tension\", with hair relaxing avoided. A wig may be worn if it does not pull or rub at the roots.",
      evidence: "Industry guidance with no trial cited. In an interview study of 17 Black women with breast cancer at one centre, women who used cooling said the instructions and the conditioner supplied were not written for their hair, and described using their own leave-in conditioner or hair gel; the authors report: \"Participants noted a lack of information on scalp cooling tailored to Black women, highlighting the need for customized guidance.\" Breast Cancer Now says African and Caribbean hair is the most vulnerable to damage of all hair textures.",
      sources: ["paxman-haircare-guide", "dignicap-haircare", "minta-2026", "bcn-hair-loss"],
    },
    {
      name: "Preparing Afro-textured hair for the cap: the sources disagree",
      differs: "Three positions. The manufacturers say to remove extensions, weaves and braids, wet the hair thoroughly before the cap goes on, and not to straighten or relax it chemically beforehand; Paxman says a short cut does not improve results. Macmillan says to remove weaves or braids and avoid chemical relaxing, and that the chemotherapy nurse will have instructions for the hair type. The authors of the 2026 interview study, citing earlier papers, write that \"Women with relaxed hair can wet their hair per manufacturer instructions, while those with natural hair should avoid excess wetting, opting instead to straighten their hair and apply emollients\", while noting the time, fatigue and heat damage that straightening involves.",
      evidence: "None of the three rests on a comparative trial. The one prospective study in Black patients read, a phase II feasibility study of Paxman cooling in breast cancer, planned 30 patients and reports: \"Fifteen patients enrolled in the intervention before the study was closed early because of lack of efficacy.\" Its authors name hair thickness, hair volume and cap design as possible reasons. The Dutch registry study of wetting was mainly in people with a European hair type. Women in the interview study described their own changes, such as cutting the hair short or using hair gel, which no trial has tested.",
      sources: ["paxman-hair-ready", "paxman-haircare-faqs", "paxman-haircare-guide", "macmillan", "minta-2026", "dilawari-2021", "sc-wet-2023"],
    },
  ],
  grades: [
    { claim: "Paxman cooling preserved hair in 50.5 per cent against 0 per cent of controls (SCALP)", grade: "randomised trial, n = 142 evaluable, p < 0.0001", source: "paxman-k163484", quote: "Results show 48 (50.5%) out of 95 in the cooling group and 0 (0%) out of 47 in the control group had hair preservation." },
    { claim: "20 minutes of post-infusion cooling was as effective as 45 minutes with docetaxel", grade: "randomised multi-centre trial, n = 134, p = 0.5", source: "sc-docetaxel-2016", quote: "A 20-min post-infusion cooling time is effective and tolerable for patients treated with scalp cooling to prevent docetaxel-induced alopecia." },
    { claim: "Shorter post-infusion cooling (under 85 minutes) was as effective as longer across taxane and anthracycline regimens", grade: "observational registry study, 4680 patients, 68 hospitals", source: "sc-dutch-pict-2025", quote: "For all anthracycline and taxane-based chemotherapy regimens studied, shorter PICTs delivered comparable results to longer PICTs." },
    { claim: "Guideline recommendations on scalp cooling are lacking", grade: "overview of 14 systematic reviews (poor quality by AMSTAR 2)", source: "onf-overview-2022", quote: "There is a lack of guideline recommendations about the use of scalp cooling for preventing chemotherapy-induced alopecia (CIA)." },
    { claim: "Scalp cooling may be less effective in Black women; hair thickness, volume and cap design are possible reasons", grade: "phase II feasibility study, 15 of a planned 30 enrolled, closed early", source: "dilawari-2021", quote: "SC may not be efficacious in preventing alopecia in Black women. Differences in hair thickness, hair volume, and limitations of cooling cap design are possible contributing factors." },
    { claim: "Black women using scalp cooling wanted instructions and products written for textured hair", grade: "qualitative interview study, 17 women, one centre", source: "minta-2026", quote: "For Black women who elected to undergo scalp cooling, the addition of styling products and instructions tailored for textured/afro hair was commonly identified as a way to improve the patient experience." },
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
    { key: "paxman-haircare-guide", label: "Scalp cooling haircare guide (industry source: patient website of the device manufacturer Paxman)", publisher: "Paxman Coolers (manufacturer)", year: 2026, url: "https://coldcap.com/haircare/scalp-cooling-haircare-guide/", gradingScheme: "Manufacturer's patient guidance, undated, not graded; no trial cited.", read: "public-summary", accessed: "2026-11-16" },
    { key: "paxman-haircare-faqs", label: "Scalp cooling haircare FAQs (industry source: patient website of the device manufacturer Paxman)", publisher: "Paxman Coolers (manufacturer)", year: 2026, url: "https://coldcap.com/haircare/scalp-cooling-haircare-faqs/", gradingScheme: "Manufacturer's patient guidance, undated, not graded; no trial cited.", read: "public-summary", accessed: "2026-11-16" },
    { key: "paxman-hair-ready", label: "Getting your hair ready for scalp cooling (industry source: patient website of the device manufacturer Paxman)", publisher: "Paxman Coolers (manufacturer)", year: 2026, url: "https://coldcap.com/haircare/getting-your-hair-ready-for-scalp-cooling/", gradingScheme: "Manufacturer's patient guidance, undated, not graded; no trial cited.", read: "public-summary", accessed: "2026-11-16" },
    { key: "paxman-shedding", label: "Shedding and hair loss (industry source: patient website of the device manufacturer Paxman)", publisher: "Paxman Coolers (manufacturer)", year: 2026, url: "https://coldcap.com/ive-decided-to-scalp-cool/shedding-hairloss/", gradingScheme: "Manufacturer's patient guidance, undated, not graded; no trial cited.", read: "public-summary", accessed: "2026-11-16" },
    { key: "dignicap-haircare", label: "Scalp cooling haircare guide (industry source: website of the device manufacturer Dignitana)", publisher: "Dignitana (manufacturer of DigniCap)", year: 2026, url: "https://dignicap.com/hair-care/", gradingScheme: "Manufacturer's patient guidance, undated, not graded; no trial cited.", read: "public-summary", accessed: "2026-11-16" },
    { key: "bcn-hair-loss", label: "Breast cancer and hair loss (last reviewed February 2022)", publisher: "Breast Cancer Now", year: 2022, url: "https://breastcancernow.org/about-breast-cancer/treatment/chemotherapy/chemotherapy-side-effects/breast-cancer-and-hair-loss", gradingScheme: "Patient information, not graded.", read: "public-summary", accessed: "2026-11-16" },
    { key: "minta-2026", label: "An interview-based qualitative study of scalp cooling, alopecia, and disparities in Black breast cancer patients", publisher: "Supportive Care in Cancer (Minta et al.)", year: 2026, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC13144178/", doi: "10.1007/s00520-026-10721-y", read: "full-text", accessed: "2026-11-16" },
    { key: "dilawari-2021", label: "Does Scalp Cooling Have the Same Efficacy in Black Patients Receiving Chemotherapy for Breast Cancer?", publisher: "The Oncologist (Dilawari et al.)", year: 2021, url: "https://europepmc.org/abstract/MED/33512741", doi: "10.1002/onco.13690", read: "abstract", accessed: "2026-11-16" },
  ],
  upgrades: ["idea-moon-hair-preservation-for-all", "idea-upgrade-twenty-minute-post-infusion-scalp-cooling-after-taxanes", "idea-mach-cooling-off-the-chair", "idea-upgrade-scalp-cooling-instructions-for-afro-textured-hair"],
  gaps: [
    "No ESMO, ASCO, MASCC, ONS or NICE guideline on scalp cooling was found; the ESMO 2021 dermatological toxicity guideline, which covers alopecia, could not be read (the publisher refused a script).",
    "Hair care during a course of cooling (washing, brushing, heat styling, colouring, tight styles) has no trial evidence: no study comparing regimens was found. The detailed advice read on 16 November 2026 comes from the two device manufacturers, whose guides are largely the same text, and the independent charity pages read (Breast Cancer Now, Macmillan) cover hair care during chemotherapy in general or in a few lines. This replaces an earlier note that no such page could be read.",
    "No source read states a water temperature for washing during scalp cooling; Breast Cancer Now's advice to use warm rather than hot water is general advice for hair during treatment. No source read says how to manage hair that has already matted.",
    "The sources disagree on scalp massage (Breast Cancer Now's general tips suggest it; the manufacturers say not to rub) and on preparing natural Afro-textured hair (wet thoroughly, or avoid excess wetting and straighten first). Neither question has been tested.",
    "Evidence in Afro-textured hair is one feasibility study of 15 Black patients that closed early for lack of efficacy, read as an abstract whose figures were cut off in the copy fetched, two case reports found by title and not read, and one interview study. The commentary the interview study cites for hair preparation (Araoye et al., J Clin Oncol 2020) could not be read.",
    "The manufacturers' hair care pages are undated, the Breast Cancer Now page was last reviewed in February 2022 and the Macmillan page in December 2022. The Cancer Research UK scalp cooling page could not be found at the addresses tried.",
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
