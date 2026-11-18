import { protocol } from "./helpers";

/*
 * Protecting fertility and ovarian function before radiotherapy to the pelvis: the fertility conversation, freezing
 * sperm, eggs, embryos or ovarian tissue, and moving the ovaries out of the radiation field (ovarian transposition).
 *
 * What was read, and how (first on 11 November 2026; re-read claim by claim on 17 November 2026 in a second accuracy
 * pass, from raw text, with every quote checked by script against the saved copy):
 * - NICE NG257, Fertility problems: assessment and treatment (published 31 March 2026; replaces CG156), section 1.53
 *   Fertility preservation for medical indications: full text (HTML), a copy another checker fetched from nice.org.uk
 *   on 17 November 2026 was re-used.
 * - ESHRE guideline: female fertility preservation (Human Reproduction Open 2020): full text, Europe PMC XML
 *   (PMC7666361), a copy another checker fetched on 17 November 2026 was re-used; grades were read from the XML
 *   tables. Crossref and Europe PMC show no later edition.
 * - ASCO, Fertility Preservation in People With Cancer: ASCO Guideline Update (Journal of Clinical Oncology 2025):
 *   abstract, Europe PMC; the publisher's page answers a script with a browser check, so the full text, its two
 *   published errata and the 2026 Clinical Insights companion were not read.
 * - ESMO Clinical Practice Guidelines, Fertility preservation and post-treatment pregnancies in post-pubertal cancer
 *   patients (Annals of Oncology 2020): not read; Europe PMC holds no abstract or full text for it and the publisher's
 *   page answers a script with a browser check. It is shown as a source that exists.
 * - Lim et al., The role of ovarian transposition prior to pelvic radiation: a review (Gynecologic Oncology Reports
 *   2026): full text, Europe PMC XML (PMC13103583), fetched again on 17 November 2026.
 * - Outcomes of ovarian transposition in cervical cancer; an updated meta-analysis (BMC Women's Health 2022): full
 *   text, Europe PMC XML (PMC9308360), fetched again on 17 November 2026.
 *
 * Every DOI was resolved through Europe PMC or Crossref and its title checked. Quotes are copied from the raw text with
 * line breaks joined; citation brackets keep their printed content.
 *
 * The second pass changed: the transposition step (ESHRE says women "may be offered" it, a weak recommendation, and the
 * page had it as an order to offer); the disagreement on chemotherapy (the 2026 review says to offer transposition
 * with or without chemotherapy, which the page had not set against ESHRE); reasons in several "why" lines that no
 * source gave; the statement that pelvic radiotherapy damages sperm production, which no source read here makes; and
 * bladder cancer in the population, which no source names.
 */
export const fertilityProtectionBeforePelvicRadiotherapy = protocol({
  id: "fertility-protection-before-pelvic-radiotherapy",
  name: "Fertility protection before pelvic radiotherapy: ovarian transposition, egg, embryo and sperm freezing",
  aka: ["ovarian transposition", "oophoropexy", "ovariopexy", "fertility preservation before radiotherapy", "sperm banking before radiotherapy", "egg freezing before radiotherapy", "ovarian tissue cryopreservation", "oncofertility pelvic radiotherapy", "premature ovarian insufficiency after radiotherapy"],
  domain: "radiotherapy",
  tldr: "Radiotherapy to the pelvis can stop the ovaries working, which brings an early menopause and a risk of infertility. Before treatment starts, your team should talk with you about fertility and refer you to a specialist if you want to protect it or are unsure: sperm, eggs or embryos can be frozen, and some women may be offered an operation to move the ovaries up out of the radiation field.",
  simple: "Pelvic radiotherapy can affect having children later. Ask about it before treatment starts. Sperm, eggs or embryos can be stored. Some women can have their ovaries moved higher in the body, out of the way of the radiation.",
  summary: "Ovaries are very sensitive to radiation: for women under 40, a dose under 2 Gy is estimated to destroy half the oocytes and 14 Gy may cause complete ovarian failure (2026 review, citing Wallace et al. 2005); the same review gives 45 to 50 Gy as the typical dose for postoperative gynaecological radiotherapy. NICE NG257 (March 2026) says to discuss fertility preservation with people preparing for treatment likely to impair fertility, at the earliest possible opportunity if treatment is urgent; to offer sperm cryopreservation, and oocyte or embryo cryopreservation, to those of reproductive age; to consider ovarian tissue cryopreservation when those are not feasible; and not to apply the usual NHS fertility eligibility criteria. ASCO (2025, abstract) lists ovarian transposition among established methods that should be offered to females, with embryo, oocyte and ovarian tissue cryopreservation.\n\nESHRE (2020) says women planned for pelvic radiotherapy without chemotherapy may be offered ovarian transposition to prevent premature ovarian insufficiency (WEAK, low-quality evidence), that women with reduced ovarian reserve or at risk of ovarian metastases are inappropriate candidates (good practice point), and that transposition can be done at the same time as ovarian tissue cryopreservation. A 2026 narrative review goes further: it says transposition should be offered to premenopausal women aged 40 or younger (35 to 40 or younger in its conclusion) without raised risk of ovarian metastasis, with or without chemotherapy. It recommends placing the ovaries at least 4 cm from the field or 1.5 cm above the iliac crest and marking them with clips; reported success ranges from 15% to 100%, about 50% to 65% in cervical cancer after external beam radiotherapy, lower with chemotherapy; ovarian metastasis after transposition was found in 0.36% of women with cervical cancer. A 2022 meta-analysis of 1,160 women with cervical cancer found preserved ovarian function in 61% (95% CI 55 to 69) of those who had external beam radiotherapy. Reports of pregnancies after transposition and pelvic radiotherapy are few; a gestational carrier may be an option when the uterus has been affected by radiation (review). ESHRE says radiotherapy to a field that included the uterus raises the risk of pregnancy complications and that these pregnancies should be managed as high risk (STRONG, very low-quality evidence).",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "multidisciplinary-team", "nurse", "patient-or-carer"],
    where: ["outpatient-clinic", "radiotherapy-department", "theatre"],
  },
  population: "People of reproductive age, and children, about to have radiotherapy to the pelvis or nearby (the sources name cervical, vaginal, rectal and anal cancer, pelvic sarcoma and Hodgkin lymphoma), whose fertility or ovarian function the treatment is likely to impair. Ovarian transposition applies to premenopausal women, generally aged 40 or younger, whose ovaries look normal and need not be removed. Prepubertal children are named only where the sources address them.",
  trigger: "A plan for radiotherapy that will include, or come close to, the ovaries, uterus or testes, made before treatment starts.",
  steps: [
    {
      action: "Before treatment, discuss fertility and fertility preservation with everyone whose treatment is likely to impair fertility; if treatment is urgent, have this talk at the earliest possible opportunity",
      why: "The talk has to come before treatment: ASCO also says fertility preservation approaches should be discussed before cancer treatment starts.",
      source: "nice-ng257",
      quote: "Discuss fertility preservation as an option with people who are preparing for medical treatment, or who have a medical condition, that is likely to impair their fertility. For people who need urgent treatment, this discussion should take place at the earliest possible opportunity.",
      grade: "[2026]",
    },
    {
      action: "Refer people interested in or unsure about fertility preservation to a reproductive specialist, with prompt access to a multidisciplinary fertility team",
      why: "A reproductive specialist is the person who can set out the options; ASCO asks oncology teams to make sure that access is prompt.",
      source: "asco-fp-2025",
      quote: "Patients interested in or uncertain about FP should be referred to reproductive specialists.",
      grade: "as printed in the abstract (full grade not read)",
    },
    {
      action: "Offer sperm cryopreservation to men and boys of reproductive age before treatment likely to make them infertile",
      why: "NICE recommends offering sperm storage when treatment is likely to cause infertility.",
      source: "nice-ng257",
      quote: "Offer sperm cryopreservation to men (and boys), and trans women and non-binary people with male reproductive organs who are of reproductive age, and who are preparing for medical treatment, or who have a medical condition, that is likely to make them infertile.",
      grade: "[2026]",
    },
    {
      action: "Offer egg or embryo freezing, as appropriate, to women and girls of reproductive age before treatment likely to make them infertile",
      why: "NICE recommends offering egg or embryo storage when treatment is likely to cause infertility.",
      source: "nice-ng257",
      quote: "Offer oocyte or embryo cryopreservation (as appropriate) to women (and girls), and trans men and non-binary people with female reproductive organs who are of reproductive age, and who are preparing for medical treatment, or who have a medical condition, that is likely to make them infertile.",
      grade: "[2026]",
    },
    {
      action: "Consider ovarian tissue freezing when egg or embryo freezing is not feasible, for example in girls before puberty",
      why: "Egg and embryo freezing are not possible for everyone; ASCO calls ovarian tissue freezing the only established method for girls before puberty.",
      source: "nice-ng257",
      quote: "Consider ovarian tissue cryopreservation when oocyte or embryo cryopreservation is not feasible, for example, in girls before puberty.",
      grade: "[2026]",
    },
    {
      action: "For women planned for pelvic radiotherapy without chemotherapy, discuss ovarian transposition as an option that may be offered",
      why: "The aim is to prevent premature ovarian insufficiency (an early menopause). The recommendation is weak, which in this guideline means it needs discussion and a shared decision.",
      source: "eshre-2020",
      quote: "Where pelvic radiotherapy without chemotherapy is planned, women may be offered ovarian transposition with the aim to prevent POI (Gubbala et al., 2014; Hoekman et al., 2019).",
      grade: "WEAK ⊕⊕◯◯",
    },
    {
      action: "Do not offer transposition to women with reduced ovarian reserve or at risk of ovarian metastases",
      why: "The guideline panel judges these women to be inappropriate candidates; this is a good practice point based on clinical expertise, and the summary read gives no further reason.",
      source: "eshre-2020",
      quote: "Women with reduced ovarian reserve and women at risk of having ovarian metastases are inappropriate candidates for ovarian transposition.",
      grade: "GPP",
    },
    {
      action: "Consider doing transposition at the same time as ovarian tissue freezing in women who will have pelvic radiotherapy",
      why: "The guideline says the two can be done together.",
      source: "eshre-2020",
      quote: "Ovarian transposition can be performed at the same time as OTC in patients who will receive pelvic irradiation.",
      grade: "GPP",
    },
    {
      action: "Place the transposed ovaries at least 4 cm from the radiation field or 1.5 cm above the iliac crest",
      why: "The further the ovaries are from the field, the more likely they are to keep working.",
      source: "ot-review-2026",
      quote: "The location of transposed ovaries should be at least 4 cm from the radiation field or 1.5 cm above the iliac crest to avoid gonadotoxic radiation doses.",
      grade: "narrative review (no grade)",
    },
    {
      action: "Mark the lower edge of each transposed ovary with radiopaque clips so the planning team can see and spare it",
      why: "The clips let the ovaries be identified later on CT imaging.",
      source: "ot-review-2026",
      quote: "The inferior margin of the ovaries should be tagged with radiopaque surgical clips for future identification on CT imaging (Buonomo et al., 2021).",
      grade: "narrative review (no grade)",
    },
    {
      action: "Tell the person that results of transposition vary, that chemotherapy lowers the chance of keeping ovarian function, and that reported pregnancies after pelvic radiotherapy are few",
      why: "The review says it is important to counsel that results may vary and that hormone replacement or assisted reproduction may still be needed.",
      source: "ot-review-2026",
      quote: "Approximately 50–65% of patients with cervical cancer who undergo OT followed by external beam radiation therapy with or without brachytherapy maintain ovarian function; adjuvant chemotherapy further reduces ovarian function preservation.",
      grade: "narrative review (no grade)",
    },
    {
      action: "For NHS-funded fertility preservation, do not apply the usual fertility treatment eligibility rules, including the lower age limit",
      why: "NICE sets fertility preservation apart from conventional fertility treatment; its usual criteria apply later, when stored material is used.",
      source: "nice-ng257",
      quote: "For NHS-funded fertility preservation, do not apply the eligibility criteria used for conventional fertility treatment, including the lower age limit.",
      grade: "[2013, amended 2026]",
    },
  ],
  bestInClass: {
    statement: "Discuss fertility preservation before treatment with people whose treatment is likely to impair fertility, and refer those interested or unsure to a reproductive specialist (NICE NG257 2026; ASCO 2025); offer sperm, egg or embryo cryopreservation, and consider ovarian tissue cryopreservation when egg or embryo cryopreservation is not feasible (NICE [2026]). ASCO (2025, abstract) lists ovarian transposition among the established methods that should be offered to females. ESHRE (2020) says women may be offered it where pelvic radiotherapy without chemotherapy is planned (WEAK, low-quality evidence), and that women with reduced ovarian reserve or at risk of ovarian metastases are inappropriate candidates (good practice point). Where it is done, a 2026 narrative review recommends placing the ovaries at least 4 cm from the field or 1.5 cm above the iliac crest and marking them with clips. NICE NG257 does not mention ovarian transposition. The sources differ on chemotherapy: ESHRE's recommendation covers radiotherapy without chemotherapy; the 2026 review (ungraded) says transposition should be offered to premenopausal women aged 35 to 40 or younger having pelvic radiotherapy with or without chemotherapy; ASCO's abstract sets no limit either way.",
    sources: ["nice-ng257", "asco-fp-2025", "eshre-2020", "ot-review-2026"],
  },
  variants: [
    {
      name: "Transposition alongside chemoradiotherapy",
      differs: "ESHRE's recommendation covers radiotherapy without chemotherapy. The 2026 review says transposition should be offered with or without chemotherapy, while reporting lower success when chemotherapy is added. The 2022 meta-analysis left chemotherapy out of its analysis, saying transposition does not protect against the effects of chemotherapy.",
      evidence: "Observational series. The review reports ovarian function preserved in about 50% to 65% after external beam radiotherapy for cervical cancer, and in 51.1% after chemoradiation in one systematic review and 0% to 69.2% in another. The 2022 meta-analysis of 29 studies found 61% after external beam radiotherapy.",
      sources: ["eshre-2020", "ot-review-2026", "ot-meta-2022"],
    },
    {
      name: "Transposition in rectal and anal cancer",
      differs: "Higher risk of ovarian metastasis than in cervical cancer (rates of 1% to 8%, about 5% in premenopausal women); the 2026 review says that in premenopausal women with locally advanced rectal and anal cancer the risks may outweigh the benefits.",
      evidence: "Narrative review; it says there are no reports of ovarian metastases after transposition in this subgroup, and cites one retrospective series of women with rectal or anal cancer in which 67% kept ovarian function.",
      sources: ["ot-review-2026"],
    },
    {
      name: "Placing the ovaries behind the uterus (Hodgkin lymphoma)",
      differs: "Ovariopexy keeps the ovaries within the pelvis and fixes them behind the uterus, which then acts as a radiation shield; the review says it is done mainly in Hodgkin lymphoma. The review also says the vast majority of successful pregnancies after transposition and pelvic radiotherapy were in Hodgkin lymphoma treated with an inverted Y field and a lead shield to the uterus.",
      evidence: "Reports cited in the 2026 review. One cohort of 90 survivors of childhood Hodgkin lymphoma that it cites found no significant difference in the age of ovarian insufficiency with and without transposition.",
      sources: ["ot-review-2026"],
    },
    {
      name: "Opportunistic salpingectomy at transposition",
      differs: "Removing the fallopian tubes at the same operation where the uterus stays in place, which the review says should be considered.",
      evidence: "The review says opportunistic bilateral salpingectomy can reduce the risk of ovarian cancer by up to 65%; it gives no data from women who had transposition.",
      sources: ["ot-review-2026"],
    },
  ],
  grades: [
    { claim: "Ovarian transposition may be offered where pelvic radiotherapy without chemotherapy is planned", grade: "WEAK ⊕⊕◯◯", source: "eshre-2020" },
    { claim: "Not for women with reduced ovarian reserve or at risk of ovarian metastases", grade: "GPP", source: "eshre-2020" },
    { claim: "Provide decision aids to patients considering fertility preservation", grade: "STRONG ⊕⊕◯◯", source: "eshre-2020", quote: "It is recommended to provide decision aids to patients who are considering FP (Peate et al., 2009; Anazodo et al., 2019; Wang et al., 2019)." },
    { claim: "Ovarian transposition is among the established fertility preservation methods that should be offered to females", grade: "as printed in the abstract (grade not read)", source: "asco-fp-2025", quote: "For females, established FP methods should be offered, including embryo, oocyte, and ovarian tissue cryopreservation (OTC), ovarian transposition, and conservative gynecologic surgery." },
    { claim: "Radiotherapy to a field that included the uterus: later pregnancies are high risk", grade: "STRONG ⊕◯◯◯", source: "eshre-2020", quote: "Radiotherapy to a field that included the uterus increases the risk of pregnancy complications; this risk is age (higher at prepubertal ages) and dose dependent." },
    { claim: "Offer sperm cryopreservation before treatment likely to cause infertility", grade: "[2026]", source: "nice-ng257" },
  ],
  sources: [
    {
      key: "nice-ng257",
      label: "Fertility problems: assessment and treatment (NG257), section 1.53 Fertility preservation for medical indications (published 31 March 2026)",
      publisher: "NICE",
      year: 2026,
      url: "https://www.nice.org.uk/guidance/ng257/chapter/Fertility-preservation-for-medical-indications",
      gradingScheme: "NICE does not grade recommendations; each is tagged with the year it was written or amended ([2026], [2013, amended 2026]).",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "eshre-2020",
      label: "ESHRE guideline: female fertility preservation",
      publisher: "European Society of Human Reproduction and Embryology (Human Reproduction Open)",
      year: 2020,
      url: "https://doi.org/10.1093/hropen/hoaa052",
      doi: "10.1093/hropen/hoaa052",
      gradingScheme: "Each recommendation is labelled STRONG or WEAK with a grade for the strength of the supporting evidence from ⊕⊕⊕⊕ (high) to ⊕◯◯◯ (very low); GPP is a good practice point based on clinical expertise; RESEARCH ONLY marks interventions for research settings. Weak recommendations require discussion and shared decision-making.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "asco-fp-2025",
      label: "Fertility Preservation in People With Cancer: ASCO Guideline Update",
      publisher: "American Society of Clinical Oncology (Journal of Clinical Oncology)",
      year: 2025,
      url: "https://doi.org/10.1200/JCO-24-02782",
      doi: "10.1200/JCO-24-02782",
      gradingScheme: "The abstract prints no grades; the full text, where ASCO gives them, was not read.",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "esmo-fp-2020",
      label: "Fertility preservation and post-treatment pregnancies in post-pubertal cancer patients: ESMO Clinical Practice Guidelines",
      publisher: "European Society for Medical Oncology (Annals of Oncology)",
      year: 2020,
      url: "https://doi.org/10.1016/j.annonc.2020.09.006",
      doi: "10.1016/j.annonc.2020.09.006",
      read: "not-reachable",
      accessed: "2026-11-17",
    },
    {
      key: "ot-review-2026",
      label: "The role of ovarian transposition prior to pelvic radiation: A review",
      publisher: "Lim et al., Gynecologic Oncology Reports",
      year: 2026,
      url: "https://doi.org/10.1016/j.gore.2026.102079",
      doi: "10.1016/j.gore.2026.102079",
      gradingScheme: "Narrative review; no grades.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "ot-meta-2022",
      label: "Outcomes of ovarian transposition in cervical cancer; an updated meta-analysis",
      publisher: "BMC Women's Health",
      year: 2022,
      url: "https://doi.org/10.1186/s12905-022-01887-8",
      doi: "10.1186/s12905-022-01887-8",
      read: "full-text",
      accessed: "2026-11-17",
    },
  ],
  cancers: ["cervical", "rectal-cancer", "anal", "hodgkin-lymphoma"],
  technologies: ["fertility-preservation"],
  institutions: ["asco"],
  related: ["radiotherapy-pregnancy-and-breastfeeding-enquiry", "radiotherapy-consent"],
  upgrades: [],
  gaps: [
    "The ESMO 2020 fertility preservation guideline could not be read. On 17 November 2026 Europe PMC still held no abstract or full text for it and the publisher's page answered a script with a browser check; no claim on this page rests on it.",
    "The ASCO 2025 update was read as an abstract only (17 November 2026: the publisher's page answers a script with a browser check), so its grades and its detail on ovarian transposition are not quoted. Two errata to it (10.1200/JCO-25-00662 and 10.1200/JCO-25-01373) and a 2026 Clinical Insights companion (10.1200/OP-25-00223) exist and were not read.",
    "The sources differ on chemotherapy. ESHRE (2020) limits its weak recommendation to pelvic radiotherapy without chemotherapy; the 2026 narrative review says transposition should be offered with or without chemotherapy. No graded guideline read here settles it.",
    "The 2026 review gives the upper age for transposition as 40 in its abstract and as 35 to 40 in its conclusion, and says most studies found better results under 35.",
    "NICE NG257 does not address ovarian transposition or gonadal shielding; no UK guideline found sets out when transposition should be offered.",
    "No source read here states the effect of pelvic radiotherapy on the testes, a testicular dose threshold, or testicular shielding; the sources support sperm storage before treatment and nothing further. No source read gives a uterine dose threshold either: ESHRE says only that the risk to a later pregnancy depends on dose and age.",
    "The evidence for transposition is observational, with wide variation in technique, dose and outcome definitions; the 2026 review drew on systematic reviews, meta-analyses, retrospective cohorts and case series.",
    "The 2022 meta-analysis prints some confidence intervals that do not fit their point estimates (for example 99% with a 95% CI of 1 to 5); only its figure of 61% (95% CI 55 to 69) after external beam radiotherapy is used here.",
  ],
});
