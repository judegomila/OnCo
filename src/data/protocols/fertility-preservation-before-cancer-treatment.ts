import { protocol } from "./helpers";

/*
 * Fertility discussion, referral and preservation before cancer treatment that may harm fertility, including GnRH
 * agonists for ovarian protection during chemotherapy. One record for two census rows (fertility preservation before
 * treatment, and GnRH agonist ovarian protection), because the guidelines place GnRH agonists inside the same decision.
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl or the Europe PMC REST API into a scratch
 * directory and read as text):
 * - NICE NG257, Fertility problems: assessment and treatment (published 31 March 2026, replacing CG156), chapter on
 *   fertility preservation for medical indications, recommendations 1.53.1 to 1.53.8 (HTML, full text).
 * - ESHRE guideline on female fertility preservation (Hum Reprod Open 2020): full text from PubMed Central (PMC7666361),
 *   including the recommendation tables with strength and evidence quality.
 * - ASCO guideline update, Fertility Preservation in People With Cancer (J Clin Oncol 2025): abstract only, from Europe
 *   PMC; ascopubs.org refused a script. Two errata (2025) exist; their content was not read.
 * - ESMO 2020 guideline on fertility preservation and post-treatment pregnancies: not in Europe PMC as an abstract and
 *   the publisher refused a script. Not read.
 * No ESHRE female fertility preservation update after 2020 was found in Europe PMC. Every DOI was resolved through
 * Europe PMC and its title checked. Quotes are copied from the raw text with nothing changed.
 */
export const fertilityPreservationBeforeCancerTreatment = protocol({
  id: "fertility-preservation-before-cancer-treatment",
  name: "Fertility discussion and preservation before cancer treatment",
  aka: ["oncofertility referral", "egg freezing before chemotherapy", "sperm banking before cancer treatment", "embryo freezing before cancer treatment", "ovarian tissue freezing", "GnRH agonist ovarian protection during chemotherapy", "goserelin to protect the ovaries"],
  domain: "survivorship",
  tldr: "Some cancer treatments can make it harder or impossible to have children later. Before treatment, your team should discuss this and, if you want, refer you quickly to a fertility specialist. Freezing sperm, eggs, embryos or ovarian tissue are the established options; an injection to rest the ovaries during chemotherapy can be added for some women with breast cancer but does not replace freezing.",
  simple: "Cancer treatment can affect having children later. Ask about this before treatment starts. Sperm, eggs or embryos can be frozen and stored.",
  summary: "Every person whose treatment may affect fertility should be told about the risk and the options before treatment, at the earliest opportunity where treatment is urgent (NICE NG257, 2026; ASCO 2025), and those who are interested or unsure referred promptly to a reproductive specialist (ASCO). NICE offers sperm cryopreservation, and oocyte or embryo cryopreservation, to people of reproductive age facing treatment likely to make them infertile, and ovarian tissue cryopreservation when oocyte or embryo storage is not feasible, for example before puberty; NHS-funded preservation is not bound by the usual eligibility criteria such as the lower age limit, and storage is reviewed at least every 5 years.\n\nESHRE (2020) recommends the GnRH antagonist protocol for ovarian stimulation for its speed and safety (strong), random-start stimulation as an option in urgent cycles (weak), and concurrent letrozole in oestrogen-sensitive cancers (good practice point). GnRH agonists during chemotherapy should be offered as an option for ovarian function protection in premenopausal women with breast cancer (ESHRE, strong), but not instead of cryopreservation (ESHRE; ASCO 2025: an adjunct only, in breast cancer). ASCO adds that testicular tissue freezing in prepubertal boys is experimental, that ovarian tissue cryopreservation is the only established method before puberty in girls, and that sperm collected soon after starting treatment may carry more genetic damage.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "nurse", "multidisciplinary-team", "patient-or-carer"],
    where: ["outpatient-clinic", "acute-oncology-service"],
  },
  population: "People of any sex facing cancer treatment that may impair fertility (chemotherapy, pelvic or total body radiotherapy, surgery to reproductive organs), including adolescents and, for some methods, children. NICE NG257 applies to NHS care in England. ESHRE's guideline is for women and transgender men; ASCO's covers adults and children of all sexes.",
  trigger: "A treatment plan is being made that may impair fertility, before the first treatment.",
  steps: [
    {
      action: "Before treatment, tell the person about the risk to fertility and discuss preservation, as early as possible when treatment is urgent",
      why: "The window closes once treatment starts; a short conversation now keeps choices open.",
      source: "nice-ng257",
      quote: "Discuss fertility preservation as an option with people who are preparing for medical treatment, or who have a medical condition, that is likely to impair their fertility. For people who need urgent treatment, this discussion should take place at the earliest possible opportunity.",
    },
    {
      action: "Refer anyone interested or unsure to a reproductive specialist promptly",
      why: "Specialists can explain the options and start them quickly, often without delaying cancer treatment.",
      source: "asco-2025",
      quote: "Patients interested in or uncertain about FP should be referred to reproductive specialists.",
    },
    {
      action: "Offer sperm cryopreservation before treatment to people with male reproductive organs of reproductive age",
      why: "Sperm banking is quick, established and is best done before the first dose.",
      source: "nice-ng257",
      quote: "Offer sperm cryopreservation to men (and boys), and trans women and non-binary people with male reproductive organs who are of reproductive age, and who are preparing for medical treatment, or who have a medical condition, that is likely to make them infertile.",
    },
    {
      action: "Collect sperm before treatment where possible, because sperm collected soon after treatment starts may carry more genetic damage",
      why: "Chemotherapy can damage sperm made in the weeks after it starts.",
      source: "asco-2025",
      quote: "Males should be advised of potentially higher genetic damage risks in sperm collected soon after cancer-directed therapy initiation and completion.",
    },
    {
      action: "Offer oocyte or embryo cryopreservation to people with female reproductive organs of reproductive age",
      why: "Frozen eggs or embryos are the established ways to keep the chance of a pregnancy later.",
      source: "nice-ng257",
      quote: "Offer oocyte or embryo cryopreservation (as appropriate) to women (and girls), and trans men and non-binary people with female reproductive organs who are of reproductive age, and who are preparing for medical treatment, or who have a medical condition, that is likely to make them infertile.",
    },
    {
      action: "Use a GnRH antagonist stimulation protocol, starting at any point in the cycle if time is short",
      why: "ESHRE prefers this protocol because it is feasible when treatment is urgent, takes a short time and is safe.",
      source: "eshre-2020",
      quote: "For ovarian stimulation in women seeking FP for medical reasons, the GnRH antagonist protocol is recommended for its feasibility in urgent situations, short time and safety reasons",
      grade: "STRONG, very low quality evidence",
    },
    {
      action: "In oestrogen-sensitive cancers, add letrozole during stimulation",
      why: "Letrozole keeps oestrogen levels lower while the ovaries are stimulated.",
      source: "eshre-2020",
      quote: "In ovarian stimulation for FP in oestrogen-sensitive diseases the concomitant use of anti-oestrogen therapy, such as letrozole, is probably recommended.",
      grade: "GPP (good practice point)",
    },
    {
      action: "Consider ovarian tissue cryopreservation when egg or embryo freezing is not feasible, for example before puberty or when there is no time for stimulation",
      why: "Ovarian tissue can be removed and frozen without hormone stimulation, and later put back to try to restore fertility.",
      source: "nice-ng257",
      quote: "Consider ovarian tissue cryopreservation when oocyte or embryo cryopreservation is not feasible, for example, in girls before puberty.",
    },
    {
      action: "For premenopausal women with breast cancer having chemotherapy, offer a GnRH agonist during chemotherapy as an option to protect ovarian function, in addition to, not instead of, freezing",
      why: "Resting the ovaries during chemotherapy helps protect how they work, but the evidence that it keeps the chance of pregnancy is limited.",
      source: "eshre-2020",
      quote: "GnRH agonists during chemotherapy should be offered as an option for ovarian function protection in premenopausal breast cancer patients receiving chemotherapy; however, limited evidence exists on their protective effect on the ovarian reserve and the potential for future pregnancies",
      grade: "STRONG, high quality evidence",
    },
    {
      action: "Offer psychological support and decision aids to people deciding about fertility preservation",
      why: "These decisions come at the same time as a cancer diagnosis and are hard to make quickly.",
      source: "eshre-2020",
      quote: "It is recommended to provide decision aids to patients who are considering FP",
      grade: "STRONG, low quality evidence",
    },
    {
      action: "Review stored material at least every 5 years, and keep NHS-funded storage for those still at significant risk of infertility",
      why: "Storage depends on renewed consent and on whether the person still needs it.",
      source: "nice-ng257",
      quote: "Organise follow-ups at least every 5 years with people who have had their material preserved to determine whether or not there is a need to continue NHS-funded storage.",
    },
  ],
  bestInClass: {
    statement: "NICE NG257 (2026) and ASCO (2025) are the most recent and agree: discuss fertility before treatment, refer quickly, offer sperm, oocyte or embryo cryopreservation, and use ovarian tissue cryopreservation where egg or embryo storage is not feasible, including before puberty. ESHRE (2020) gives the most detail on how, with graded recommendations for the stimulation protocol and for each method. On GnRH agonists the three agree that they do not replace cryopreservation; ESHRE recommends offering them for ovarian protection in premenopausal women with breast cancer (strong, high quality evidence) and ASCO allows them as an adjunct in breast cancer, while ESHRE says the evidence for their effect on ovarian reserve and future pregnancy is limited. ASCO also allows GnRH agonists to stop periods in people who need urgent treatment for an oncological emergency, a different purpose. ESMO's 2020 guideline could not be read.",
    sources: ["nice-ng257", "asco-2025", "eshre-2020", "esmo-2020"],
  },
  variants: [
    {
      name: "GnRH agonist as an adjunct in breast cancer only (ASCO 2025)",
      differs: "Says GnRH agonists should not replace established methods and may be offered as an adjunct to females with breast cancer, and may be offered for menstrual suppression when urgent treatment is needed.",
      evidence: "ASCO 2025, read as an abstract; grades not seen. ESHRE grades its breast cancer recommendation strong on high-quality evidence.",
      sources: ["asco-2025", "eshre-2020"],
    },
    {
      name: "Post-treatment fertility preservation (ASCO 2025)",
      differs: "Offers preservation after treatment to people who did not have it before, or did not store enough eggs or embryos.",
      evidence: "ASCO 2025, read as an abstract.",
      sources: ["asco-2025"],
    },
    {
      name: "In vitro maturation of oocytes",
      differs: "Collects immature eggs without full stimulation and matures them in the laboratory, where stimulation is not feasible.",
      evidence: "ASCO 2025 calls it an emerging method that may be offered; ESHRE (2020) says it requires specific expertise and that maturation after removal of ovarian tissue is experimental.",
      sources: ["asco-2025", "eshre-2020"],
    },
  ],
  grades: [
    { claim: "GnRH antagonist protocol for ovarian stimulation for fertility preservation", grade: "STRONG, very low (⊕◯◯◯)", source: "eshre-2020" },
    { claim: "Random-start ovarian stimulation in urgent cycles", grade: "WEAK, low (⊕⊕◯◯)", source: "eshre-2020", quote: "In urgent FP cycles, random-start ovarian stimulation is an option" },
    { claim: "Oocyte cryopreservation as an established option", grade: "STRONG, low (⊕⊕◯◯)", source: "eshre-2020", quote: "Oocyte cryopreservation should be offered as an established option for FP" },
    { claim: "Embryo cryopreservation as an established option", grade: "STRONG, low (⊕⊕◯◯)", source: "eshre-2020", quote: "Embryo cryopreservation is an established option for FP" },
    { claim: "Ovarian tissue cryopreservation where oocyte or embryo storage is not feasible, or by preference, before moderate or high-risk treatment", grade: "STRONG, low (⊕⊕◯◯)", source: "eshre-2020", quote: "It is recommended to offer OTC in patients undergoing moderate/high-risk gonadotoxic treatment where oocyte/embryo cryopreservation is not feasible, or at patient preference" },
    { claim: "GnRH agonists during chemotherapy for ovarian protection in premenopausal breast cancer", grade: "STRONG, high (⊕⊕⊕⊕)", source: "eshre-2020" },
    { claim: "GnRH agonists not instead of cryopreservation in breast cancer", grade: "STRONG, moderate (⊕⊕⊕◯)", source: "eshre-2020", quote: "In women with breast cancer, GnRH agonists during chemotherapy should not be considered an option for FP instead of cryopreservation techniques" },
    { claim: "GnRH agonists in cancers other than breast cancer", grade: "STRONG, very low (⊕◯◯◯)", source: "eshre-2020", quote: "In malignancies other than breast cancer, GnRH agonists should not be routinely offered as an option for ovarian function protection and FP without discussion of the uncertainty about its benefit" },
  ],
  sources: [
    { key: "nice-ng257", label: "Fertility problems: assessment and treatment (NG257), fertility preservation for medical indications", publisher: "NICE", year: 2026, url: "https://www.nice.org.uk/guidance/ng257/chapter/Fertility-preservation-for-medical-indications", gradingScheme: "NICE does not grade recommendations; the strength is in the wording ('offer', 'consider') and each is dated, for example [2026] or [2013, amended 2026]. Published 31 March 2026, replacing CG156.", read: "full-text", accessed: "2026-11-11" },
    { key: "eshre-2020", label: "ESHRE guideline: female fertility preservation", publisher: "European Society of Human Reproduction and Embryology (ESHRE), Human Reproduction Open", year: 2020, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7666361/", doi: "10.1093/hropen/hoaa052", gradingScheme: "Each recommendation labelled STRONG or WEAK with evidence quality high ⊕⊕⊕⊕, moderate ⊕⊕⊕◯, low ⊕⊕◯◯ or very low ⊕◯◯◯; GPP for good practice points; research only for interventions to be used only in research.", read: "full-text", accessed: "2026-11-11" },
    { key: "asco-2025", label: "Fertility Preservation in People With Cancer: ASCO Guideline Update", publisher: "ASCO, Journal of Clinical Oncology", year: 2025, url: "https://europepmc.org/abstract/MED/40106739", doi: "10.1200/JCO-24-02782", read: "abstract", accessed: "2026-11-11" },
    { key: "esmo-2020", label: "Fertility preservation and post-treatment pregnancies in post-pubertal cancer patients: ESMO Clinical Practice Guidelines", publisher: "ESMO, Annals of Oncology", year: 2020, url: "https://doi.org/10.1016/j.annonc.2020.09.006", doi: "10.1016/j.annonc.2020.09.006", read: "not-reachable", accessed: "2026-11-11" },
  ],
  upgrades: ["idea-acc-default-fertility-preservation-referral"],
  gaps: [
    "The ESMO 2020 guideline could not be read: Europe PMC holds no abstract and the publisher refused a script.",
    "ASCO 2025 was read only as an abstract; its grades, its two errata and its detailed recommendations for children are not given here.",
    "ESHRE's female guideline dates from 2020; NICE NG257 points to part D of ESHRE's 2025 ovarian stimulation guideline for fertility preservation, which was not read.",
    "No source read gives live birth rates per stored egg, embryo or tissue graft; ESHRE asks that each centre give its own rates.",
    "The evidence that GnRH agonists protect future pregnancy, as opposed to ovarian function, is limited (ESHRE); outside breast cancer ESHRE advises against offering them routinely without discussing the uncertainty about their benefit.",
    "No source read gives the number of days ovarian stimulation takes, so the delay to cancer treatment is not stated here.",
  ],
  institutions: ["nice", "asco"],
  technologies: ["fertility-preservation"],
  drugs: ["goserelin", "leuprolide"],
  terms: ["lymphoma-tx-fertility-preservation"],
  related: ["letrozole", "rejuv-paed-fertility-female", "rejuv-paed-fertility-male", "rejuv-access-fertility-preservation"],
  sections: ["supportive-care"],
  tags: ["protocol", "fertility", "survivorship", "aya"],
});
