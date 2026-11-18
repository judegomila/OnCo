import { protocol } from "./helpers";

/*
 * Fertility discussion, referral and preservation before cancer treatment that may harm fertility, including GnRH
 * agonists for ovarian protection during chemotherapy. One record for two census rows (fertility preservation before
 * treatment, and GnRH agonist ovarian protection), because the guidelines place GnRH agonists inside the same decision.
 *
 * First written on 11 November 2026. Second accuracy pass on 17 November 2026: every source was fetched again raw
 * (curl, or the Europe PMC REST API) and read as text, and every quote was checked against the saved text by script,
 * normalising only whitespace.
 * - NICE NG257, Fertility problems: assessment and treatment (published 31 March 2026, replacing CG156 of February
 *   2013), chapter on fertility preservation for medical indications, recommendations 1.53.1 to 1.53.8 (HTML, full
 *   text). The chapter makes no recommendation on GnRH agonists.
 * - ESHRE guideline on female fertility preservation (Hum Reprod Open 2020): full text XML from Europe PMC
 *   (PMC7666361), with the strength and evidence quality printed under each recommendation.
 * - ESHRE guideline on ovarian stimulation for IVF/ICSI, update in 2025 (Hum Reprod, published online 24 February
 *   2026): full text XML from Europe PMC (PMC13061131). Added in the second pass, because NICE points to it and it
 *   updates the three stimulation recommendations the 2020 guideline took from its 2019 edition.
 * - ASCO guideline update, Fertility Preservation in People With Cancer (J Clin Oncol 2025): abstract only, from Europe
 *   PMC; ascopubs.org answered 403 again. Two errata (2025) exist; Europe PMC holds no text for them.
 * - ESMO 2020 guideline on fertility preservation and post-treatment pregnancies: Europe PMC holds no abstract and
 *   annalsofoncology.org answered 403 with a browser check. Not read.
 * No ESHRE female fertility preservation guideline later than 2020 was found in Europe PMC. Every DOI was resolved
 * through Crossref and its title checked. Quotes are copied from the raw text with nothing changed.
 * What the second pass changed: the letrozole step was an order and is now what ESHRE says (a good practice point,
 * "can be considered" in 2025); starting stimulation at any point in the cycle had been filed under the grade of the
 * antagonist recommendation and is now its own step on the 2025 text; the statement that NICE agrees on GnRH agonists
 * was removed; the difference between NICE and ASCO on ovarian tissue is stated; reasons no source gives were reworded.
 */
export const fertilityPreservationBeforeCancerTreatment = protocol({
  id: "fertility-preservation-before-cancer-treatment",
  name: "Fertility discussion and preservation before cancer treatment",
  aka: ["oncofertility referral", "egg freezing before chemotherapy", "sperm banking before cancer treatment", "embryo freezing before cancer treatment", "ovarian tissue freezing", "GnRH agonist ovarian protection during chemotherapy"],
  domain: "survivorship",
  tldr: "Some cancer treatments can make it harder or impossible to have children later. Before treatment, your team should discuss this and, if you are interested or unsure, refer you to a fertility specialist. Sperm, eggs, embryos or ovarian tissue can be frozen. For women with breast cancer, a medicine called a GnRH agonist may be added during chemotherapy, but it does not replace freezing.",
  simple: "Cancer treatment can affect having children later. Ask about this before treatment starts. Sperm, eggs or embryos can be frozen and stored.",
  summary: "People whose treatment is likely to impair fertility should have the risk and fertility preservation discussed before treatment, at the earliest possible opportunity where treatment is urgent (NICE NG257, 2026; ASCO 2025), and those who are interested or unsure should be referred to reproductive specialists (ASCO). NICE says to offer sperm cryopreservation, and oocyte or embryo cryopreservation, to people of reproductive age facing treatment likely to make them infertile, and to consider ovarian tissue cryopreservation when oocyte or embryo cryopreservation is not feasible, for example in girls before puberty. ASCO lists ovarian tissue cryopreservation among the established methods that should be offered to females. For NHS-funded preservation NICE says not to apply the eligibility criteria used for conventional fertility treatment, including the lower age limit, and asks for follow-up at least every 5 years to decide whether NHS-funded storage is still needed.\n\nFor ovarian stimulation ESHRE recommends the GnRH antagonist protocol (strong, very low quality evidence; 2020 and 2025). Its 2025 ovarian stimulation update says stimulation before gonadotoxic treatment should be started irrespective of the menstrual cycle phase (strong, very low), where the 2020 guideline called random start an option in urgent cycles (weak, low). In oestrogen-sensitive disease an anti-oestrogen alongside stimulation is a good practice point only: 'probably recommended' (letrozole) in 2020, 'can be considered' (letrozole or tamoxifen) in 2025. GnRH agonists during chemotherapy should be offered as an option for ovarian function protection in premenopausal women with breast cancer (ESHRE 2020, strong, high), but not instead of cryopreservation (ESHRE; ASCO 2025: not in place of established methods, an adjunct in breast cancer). ASCO adds that testicular tissue cryopreservation in prepubertal boys is experimental and for clinical trials only, that ovarian tissue cryopreservation is the only established method for girls before puberty, and that sperm collected soon after treatment starts or finishes may carry a higher risk of genetic damage.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "nurse", "multidisciplinary-team", "patient-or-carer"],
    where: ["outpatient-clinic", "acute-oncology-service"],
  },
  population: "People of any sex facing cancer treatment that is likely to impair fertility, including adolescents and, for some methods, children. NICE NG257 is written for NHS-funded care and covers any medical treatment or condition likely to impair fertility, not cancer alone. ESHRE's 2020 guideline covers women after puberty and transgender men, and says it does not cover men, children before puberty or transgender women. ASCO's covers people with cancer of both sexes, including children.",
  trigger: "A treatment plan is being made that may impair fertility, before the first treatment.",
  steps: [
    {
      action: "Before treatment, discuss the risk to fertility and fertility preservation, at the earliest possible opportunity when treatment is urgent",
      why: "NICE asks for this discussion with everyone whose treatment is likely to impair fertility. ASCO also says people with cancer should be counselled about reproductive risks at diagnosis, and that preservation should be discussed before cancer treatment starts.",
      source: "nice-ng257",
      quote: "Discuss fertility preservation as an option with people who are preparing for medical treatment, or who have a medical condition, that is likely to impair their fertility. For people who need urgent treatment, this discussion should take place at the earliest possible opportunity.",
    },
    {
      action: "Refer anyone interested or unsure to a reproductive specialist",
      why: "ASCO does not limit referral to people who have already decided, and also asks oncology teams to ensure prompt access to a multidisciplinary fertility preservation team.",
      source: "asco-2025",
      quote: "Patients interested in or uncertain about FP should be referred to reproductive specialists.",
    },
    {
      action: "Offer sperm cryopreservation before treatment likely to cause infertility to people of reproductive age with male reproductive organs",
      why: "NICE and ASCO both say sperm storage should be offered before treatment. ASCO adds testicular sperm extraction for those unable to provide a semen sample.",
      source: "nice-ng257",
      quote: "Offer sperm cryopreservation to men (and boys), and trans women and non-binary people with male reproductive organs who are of reproductive age, and who are preparing for medical treatment, or who have a medical condition, that is likely to make them infertile.",
    },
    {
      action: "Advise that sperm collected soon after cancer treatment starts or finishes may carry a higher risk of genetic damage",
      why: "ASCO wants people to know this when they decide when to store sperm. The abstract read gives no figure for the risk and no length of time.",
      source: "asco-2025",
      quote: "Males should be advised of potentially higher genetic damage risks in sperm collected soon after cancer-directed therapy initiation and completion.",
    },
    {
      action: "Offer oocyte or embryo cryopreservation before treatment likely to cause infertility to people of reproductive age with female reproductive organs",
      why: "ESHRE calls oocyte cryopreservation and embryo cryopreservation established options for preserving fertility (each strong, on low quality evidence).",
      source: "nice-ng257",
      quote: "Offer oocyte or embryo cryopreservation (as appropriate) to women (and girls), and trans men and non-binary people with female reproductive organs who are of reproductive age, and who are preparing for medical treatment, or who have a medical condition, that is likely to make them infertile.",
    },
    {
      action: "Use a GnRH antagonist protocol for ovarian stimulation",
      why: "ESHRE recommends this protocol because it is feasible when treatment is urgent, takes a short time and is safe. Its 2025 ovarian stimulation update keeps the recommendation at the same grade.",
      source: "eshre-2020",
      quote: "For ovarian stimulation in women seeking FP for medical reasons, the GnRH antagonist protocol is recommended for its feasibility in urgent situations, short time and safety reasons",
      grade: "STRONG ⊕◯◯◯ (very low quality evidence)",
    },
    {
      action: "Start ovarian stimulation whatever the phase of the menstrual cycle",
      why: "ESHRE's 2025 update says stimulation before treatment that can harm the ovaries should start at any point in the cycle. Its 2020 guideline had called this random start only an option in urgent cycles (WEAK ⊕⊕◯◯).",
      source: "eshre-os-2025",
      quote: "For patients facing gonadotoxic treatment, ovarian stimulation for fertility preservation should be started irrespective of the menstrual cycle phase.",
      grade: "Strong ⊕◯◯◯ (very low quality evidence)",
    },
    {
      action: "In oestrogen-sensitive disease, consider an anti-oestrogen such as letrozole or tamoxifen alongside stimulation",
      why: "This is a good practice point resting on the guideline group's clinical expertise, not a graded recommendation. ESHRE's 2020 guideline said letrozole was 'probably recommended'; the 2025 update says an anti-oestrogen 'can be considered'.",
      source: "eshre-os-2025",
      quote: "In ovarian stimulation for fertility preservation in oestrogen-sensitive diseases, the concomitant use of anti-oestrogen therapy, such as letrozole or tamoxifen, can be considered.",
      grade: "GPP (good practice point)",
    },
    {
      action: "Consider ovarian tissue cryopreservation when egg or embryo freezing is not feasible, for example in girls before puberty",
      why: "ESHRE calls ovarian tissue cryopreservation an important option by choice or when there is not enough time for ovarian stimulation, and recommends transplanting the tissue back later to restore fertility. ASCO goes further than NICE and lists it among the established methods to be offered.",
      source: "nice-ng257",
      quote: "Consider ovarian tissue cryopreservation when oocyte or embryo cryopreservation is not feasible, for example, in girls before puberty.",
    },
    {
      action: "For premenopausal women with breast cancer having chemotherapy, offer a GnRH agonist during chemotherapy as an option to protect ovarian function, in addition to, not instead of, freezing",
      why: "ESHRE grades the offer strong on high quality evidence, but says the evidence is limited on ovarian reserve and on future pregnancies. In a separate recommendation (STRONG ⊕⊕⊕◯) it says GnRH agonists should not be considered an option instead of cryopreservation.",
      source: "eshre-2020",
      quote: "GnRH agonists during chemotherapy should be offered as an option for ovarian function protection in premenopausal breast cancer patients receiving chemotherapy; however, limited evidence exists on their protective effect on the ovarian reserve and the potential for future pregnancies",
      grade: "STRONG ⊕⊕⊕⊕ (high quality evidence)",
    },
    {
      action: "Provide decision aids, and offer psychological support and counselling, to people deciding about fertility preservation",
      why: "ESHRE recommends both. The grade shown is for decision aids; psychological support and counselling is also a strong recommendation but on very low quality evidence (STRONG ⊕◯◯◯), and ESHRE notes that the size of its benefit has not been studied.",
      source: "eshre-2020",
      quote: "It is recommended to provide decision aids to patients who are considering FP",
      grade: "STRONG ⊕⊕◯◯ (low quality evidence)",
    },
    {
      action: "Follow up people with stored material at least every 5 years, and offer continued NHS-funded storage to those still at significant risk of infertility",
      why: "NICE asks services to check whether NHS-funded storage is still needed, and to continue it, in line with the law on consent, for people who remain at significant risk of infertility.",
      source: "nice-ng257",
      quote: "Organise follow-ups at least every 5 years with people who have had their material preserved to determine whether or not there is a need to continue NHS-funded storage.",
    },
  ],
  bestInClass: {
    statement: "NICE NG257 (2026) and ASCO (2025) are the most recent on the whole pathway. Both say to discuss fertility before treatment and to offer sperm cryopreservation and oocyte or embryo cryopreservation; ASCO adds referral to reproductive specialists for anyone interested or unsure. They differ on ovarian tissue cryopreservation: NICE says to consider it when oocyte or embryo cryopreservation is not feasible, for example in girls before puberty, while ASCO lists it among the established methods that should be offered to females and calls it the only established method before puberty. ESHRE (2020) recommends offering it before moderate or high-risk treatment where oocyte or embryo cryopreservation is not feasible, or at patient preference (strong, low quality evidence). ESHRE gives the most detail on how, with graded recommendations for each method, and its 2025 ovarian stimulation update is the latest text on the stimulation protocol. On GnRH agonists ESHRE and ASCO agree that they do not replace cryopreservation: ESHRE recommends offering them for ovarian function protection in premenopausal women with breast cancer (strong, high quality evidence) while saying the evidence on ovarian reserve and future pregnancy is limited, and ASCO says they may be offered as an adjunct to females with breast cancer. ASCO also says GnRH agonists may be offered to stop periods in people who need urgent treatment for an oncological emergency, a different purpose. The NICE chapter read makes no recommendation on GnRH agonists. ESMO's 2020 guideline could not be read.",
    sources: ["nice-ng257", "asco-2025", "eshre-2020", "eshre-os-2025", "esmo-2020"],
  },
  variants: [
    {
      name: "GnRH agonist as an adjunct in breast cancer only (ASCO 2025)",
      differs: "Says GnRH agonists should not be used in place of established methods and may be offered as an adjunct to females with breast cancer, and may be offered for menstrual suppression when an oncological emergency needs urgent treatment.",
      evidence: "ASCO 2025, read as an abstract; grades not seen. ESHRE grades its breast cancer recommendation strong on high quality evidence.",
      sources: ["asco-2025", "eshre-2020"],
    },
    {
      name: "Post-treatment fertility preservation (ASCO 2025)",
      differs: "Says preservation may be offered after treatment to people who did not have it before, or did not store enough eggs or embryos.",
      evidence: "ASCO 2025, read as an abstract; grade not seen.",
      sources: ["asco-2025"],
    },
    {
      name: "In vitro maturation of oocytes",
      differs: "Matures eggs in the laboratory. ESHRE limits it to cases where oocyte cryopreservation is required but ovarian stimulation is not feasible.",
      evidence: "ASCO 2025 says it may be offered as an emerging method. ESHRE (2020) says it should be regarded as an innovative procedure (STRONG ⊕◯◯◯), that it requires specific expertise (GPP), and that maturation after ex vivo extraction can be offered as an experimental procedure (WEAK ⊕◯◯◯).",
      sources: ["asco-2025", "eshre-2020"],
    },
    {
      name: "Random start as an option only (ESHRE 2020)",
      differs: "The 2020 female fertility preservation guideline called random-start stimulation an option in urgent cycles; the 2025 ovarian stimulation update says stimulation should be started irrespective of the cycle phase.",
      evidence: "ESHRE 2020: WEAK ⊕⊕◯◯. ESHRE 2025 update: Strong ⊕◯◯◯, marked as updated.",
      sources: ["eshre-2020", "eshre-os-2025"],
    },
  ],
  grades: [
    { claim: "GnRH antagonist protocol for ovarian stimulation for fertility preservation (2020)", grade: "STRONG ⊕◯◯◯ (very low)", source: "eshre-2020" },
    { claim: "GnRH antagonist protocol for ovarian stimulation for fertility preservation (2025 update, unchanged)", grade: "Strong ⊕◯◯◯ (very low)", source: "eshre-os-2025", quote: "For ovarian stimulation in women seeking fertility preservation for medical reasons, the GnRH antagonist protocol is recommended." },
    { claim: "Starting stimulation irrespective of the menstrual cycle phase before gonadotoxic treatment (2025 update)", grade: "Strong ⊕◯◯◯ (very low)", source: "eshre-os-2025" },
    { claim: "Random-start ovarian stimulation in urgent cycles (2020)", grade: "WEAK ⊕⊕◯◯ (low)", source: "eshre-2020", quote: "In urgent FP cycles, random-start ovarian stimulation is an option" },
    { claim: "Anti-oestrogen such as letrozole alongside stimulation in oestrogen-sensitive disease (2020)", grade: "GPP", source: "eshre-2020", quote: "In ovarian stimulation for FP in oestrogen-sensitive diseases the concomitant use of anti-oestrogen therapy, such as letrozole, is probably recommended." },
    { claim: "Oocyte cryopreservation as an established option", grade: "STRONG ⊕⊕◯◯ (low)", source: "eshre-2020", quote: "Oocyte cryopreservation should be offered as an established option for FP" },
    { claim: "Embryo cryopreservation as an established option", grade: "STRONG ⊕⊕◯◯ (low)", source: "eshre-2020", quote: "Embryo cryopreservation is an established option for FP" },
    { claim: "Ovarian tissue cryopreservation where oocyte or embryo storage is not feasible, or by preference, before moderate or high-risk treatment", grade: "STRONG ⊕⊕◯◯ (low)", source: "eshre-2020", quote: "It is recommended to offer OTC in patients undergoing moderate/high-risk gonadotoxic treatment where oocyte/embryo cryopreservation is not feasible, or at patient preference" },
    { claim: "GnRH agonists during chemotherapy for ovarian protection in premenopausal breast cancer", grade: "STRONG ⊕⊕⊕⊕ (high)", source: "eshre-2020" },
    { claim: "GnRH agonists not instead of cryopreservation in breast cancer", grade: "STRONG ⊕⊕⊕◯ (moderate)", source: "eshre-2020", quote: "In women with breast cancer, GnRH agonists during chemotherapy should not be considered an option for FP instead of cryopreservation techniques" },
    { claim: "GnRH agonists in cancers other than breast cancer", grade: "STRONG ⊕◯◯◯ (very low)", source: "eshre-2020", quote: "In malignancies other than breast cancer, GnRH agonists should not be routinely offered as an option for ovarian function protection and FP without discussion of the uncertainty about its benefit" },
    { claim: "Psychological support and counselling for people making fertility preservation decisions", grade: "STRONG ⊕◯◯◯ (very low)", source: "eshre-2020", quote: "It is recommended that patients are offered psychological support and counselling when dealing with FP decisions, although the extent of the clinical benefit has not been studied" },
  ],
  sources: [
    { key: "nice-ng257", label: "Fertility problems: assessment and treatment (NG257), fertility preservation for medical indications", publisher: "NICE", year: 2026, url: "https://www.nice.org.uk/guidance/ng257/chapter/Fertility-preservation-for-medical-indications", gradingScheme: "NICE does not grade recommendations; the strength is in the wording ('offer', 'consider') and each is dated, for example [2026] or [2013, amended 2026]. Published 31 March 2026, replacing CG156.", read: "full-text", accessed: "2026-11-17" },
    { key: "eshre-2020", label: "ESHRE guideline: female fertility preservation", publisher: "European Society of Human Reproduction and Embryology (ESHRE), Human Reproduction Open", year: 2020, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7666361/", doi: "10.1093/hropen/hoaa052", gradingScheme: "Each evidence-based recommendation is labelled STRONG or WEAK with the quality of the supporting evidence: high ⊕⊕⊕⊕, moderate ⊕⊕⊕◯, low ⊕⊕◯◯ or very low ⊕◯◯◯. GPP marks a good practice point based on clinical expertise; 'research only' marks interventions to be applied only within research.", read: "full-text", accessed: "2026-11-17" },
    { key: "eshre-os-2025", label: "ESHRE guideline: ovarian stimulation for IVF/ICSI: an update in 2025 (fertility preservation in patients facing gonadotoxic treatment)", publisher: "European Society of Human Reproduction and Embryology (ESHRE), Human Reproduction", year: 2026, url: "https://europepmc.org/article/PMC/PMC13061131", doi: "10.1093/humrep/deag018", gradingScheme: "Each recommendation is labelled strong or conditional with the quality of the supporting evidence: high ⊕⊕⊕⊕, moderate ⊕⊕⊕◯, low ⊕⊕◯◯ or very low ⊕◯◯◯. Where there is no evidence the group makes no recommendation or a good practice point (GPP) based on clinical expertise. Each is tagged [2019], [reworded], [updated] or [2025].", read: "full-text", accessed: "2026-11-17" },
    { key: "asco-2025", label: "Fertility Preservation in People With Cancer: ASCO Guideline Update", publisher: "ASCO, Journal of Clinical Oncology", year: 2025, url: "https://europepmc.org/abstract/MED/40106739", doi: "10.1200/JCO-24-02782", read: "abstract", accessed: "2026-11-17" },
    { key: "esmo-2020", label: "Fertility preservation and post-treatment pregnancies in post-pubertal cancer patients: ESMO Clinical Practice Guidelines", publisher: "ESMO, Annals of Oncology", year: 2020, url: "https://doi.org/10.1016/j.annonc.2020.09.006", doi: "10.1016/j.annonc.2020.09.006", read: "not-reachable", accessed: "2026-11-17" },
  ],
  upgrades: ["idea-acc-default-fertility-preservation-referral"],
  gaps: [
    "On 17 November 2026 the ESMO 2020 guideline still could not be read: Europe PMC holds no abstract and the publisher answered with a browser check. No step rests on it.",
    "On 17 November 2026 ASCO 2025 was again readable only as an abstract (the publisher refused a script); its grades, its two 2025 errata and its detailed recommendations for children are not given here. An ASCO 'Clinical Insights' companion paper (JCO Oncology Practice, 2026) exists and was not read.",
    "ESHRE's female fertility preservation guideline dates from 2020 and no later edition was found on 17 November 2026. Its three ovarian stimulation recommendations were taken from ESHRE's ovarian stimulation guideline, which was updated in 2025; that update is now read and used for the stimulation steps. ESHRE also published good practice recommendations on testicular tissue cryopreservation in children in 2025, which were not read.",
    "NICE points to its HealthTech guidance on removing, preserving and reimplanting ovarian tissue; that guidance was not read.",
    "No source read gives live birth rates per stored egg, embryo or tissue graft; ESHRE says women should be told centre-specific live birth rates, and that success after freezing at the time of a cancer diagnosis may be lower than in women without cancer.",
    "The evidence that GnRH agonists protect future pregnancy, as opposed to ovarian function, is limited (ESHRE); outside breast cancer ESHRE advises against offering them routinely without discussing the uncertainty about their benefit.",
    "No source read names a particular GnRH agonist, its dose or its schedule for ovarian protection, so none is given here.",
    "No source read gives the number of days ovarian stimulation takes, so the delay to cancer treatment is not stated here.",
  ],
  institutions: ["nice", "asco"],
  technologies: ["fertility-preservation"],
  terms: ["lymphoma-tx-fertility-preservation"],
  related: ["letrozole", "goserelin", "leuprolide", "rejuv-paed-fertility-female", "rejuv-paed-fertility-male", "rejuv-access-fertility-preservation"],
  sections: ["supportive-care"],
  tags: ["protocol", "fertility", "survivorship", "aya"],
});
