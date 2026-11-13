import { protocol } from "./helpers";

/*
 * Protecting fertility and ovarian function before radiotherapy to the pelvis: the fertility conversation, freezing
 * sperm, eggs, embryos or ovarian tissue, and moving the ovaries out of the radiation field (ovarian transposition).
 *
 * What was read, and how (11 November 2026, fetched raw into a scratch directory and read as text):
 * - NICE NG257, Fertility problems: assessment and treatment (published 31 March 2026; replaces CG156), section 1.53
 *   Fertility preservation for medical indications: full text (HTML).
 * - ESHRE guideline: female fertility preservation (Human Reproduction Open 2020): full text, Europe PMC XML
 *   (PMC7666361). No later edition was found in Europe PMC.
 * - ASCO, Fertility Preservation in People With Cancer: ASCO Guideline Update (Journal of Clinical Oncology 2025):
 *   abstract, Europe PMC; the full text was not read.
 * - ESMO Clinical Practice Guidelines, Fertility preservation and post-treatment pregnancies in post-pubertal cancer
 *   patients (Annals of Oncology 2020): not read; Europe PMC holds no abstract or full text for it, and it is shown
 *   as a source that exists.
 * - Lim et al., The role of ovarian transposition prior to pelvic radiation: a review (Gynecologic Oncology Reports
 *   2026): full text, Europe PMC XML (PMC13103583).
 * - Outcomes of ovarian transposition in cervical cancer; an updated meta-analysis (BMC Women's Health 2022): full
 *   text, Europe PMC XML (PMC9308360).
 *
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied from the raw text with line breaks
 * joined; citation brackets keep their printed content.
 */
export const fertilityProtectionBeforePelvicRadiotherapy = protocol({
  id: "fertility-protection-before-pelvic-radiotherapy",
  name: "Fertility protection before pelvic radiotherapy: ovarian transposition, egg, embryo and sperm freezing",
  aka: ["ovarian transposition", "oophoropexy", "ovariopexy", "fertility preservation before radiotherapy", "sperm banking before radiotherapy", "egg freezing before radiotherapy", "ovarian tissue cryopreservation", "oncofertility pelvic radiotherapy", "premature ovarian insufficiency after radiotherapy"],
  domain: "radiotherapy",
  tldr: "Radiotherapy to the pelvis can stop the ovaries working and end fertility, and can damage sperm production. Before treatment starts, your team should talk with you about fertility and refer you quickly if you want to protect it: sperm, eggs or embryos can be frozen, and for some women a surgeon can move the ovaries up out of the radiation field.",
  simple: "Pelvic radiotherapy can affect having children later. Ask about it before treatment starts. Sperm, eggs or embryos can be stored. Some women can have their ovaries moved higher in the body, out of the way of the radiation.",
  summary: "Ovaries are very sensitive to radiation: in women under 40, under 2 Gy is estimated to destroy half the oocytes and 14 Gy may cause complete ovarian failure (review of Wallace et al.), far below pelvic doses for cervical, rectal or anal cancer. NICE NG257 (March 2026) says to discuss fertility preservation with everyone preparing for treatment likely to impair fertility, at the earliest opportunity if treatment is urgent; to offer sperm cryopreservation, and oocyte or embryo cryopreservation, to those of reproductive age; to consider ovarian tissue cryopreservation when those are not feasible; and not to apply the usual NHS fertility eligibility criteria. ASCO (2025) lists ovarian transposition among established methods for females, with embryo, oocyte and ovarian tissue cryopreservation.\n\nESHRE (2020) says women having pelvic radiotherapy without chemotherapy may be offered ovarian transposition to prevent premature ovarian insufficiency (WEAK, low certainty), that women with reduced ovarian reserve or at risk of ovarian metastases are not candidates (good practice point), and that transposition can be done at the same time as ovarian tissue cryopreservation. A 2026 review: transposition is for premenopausal women, generally 40 or younger, whose ovaries need not be removed; ovaries are moved at least 4 cm from the field or 1.5 cm above the iliac crest and marked with clips; reported success ranges from 15% to 100%, about 50% to 65% in cervical cancer after external beam radiotherapy, lower with chemotherapy; ovarian metastasis is rare (0.36% in cervical cancer). A 2022 meta-analysis of 1,160 women with cervical cancer found preserved ovarian function in 61% after external beam radiotherapy. Pregnancies after transposition and pelvic radiotherapy are few; a gestational carrier may be an option when the uterus has been affected by radiation (review).",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "multidisciplinary-team", "nurse", "patient-or-carer"],
    where: ["outpatient-clinic", "radiotherapy-department", "theatre"],
  },
  population: "People of reproductive age, and children, about to have radiotherapy to the pelvis or nearby (cervical, rectal, anal, bladder and other pelvic cancers, pelvic sarcoma, some lymphomas), whose fertility or ovarian function the treatment is likely to impair. Ovarian transposition applies to premenopausal women whose ovaries are normal and need not be removed. Prepubertal children are named only where the sources address them.",
  trigger: "A plan for radiotherapy that will include, or come close to, the ovaries, uterus or testes, made before treatment starts.",
  steps: [
    {
      action: "Before treatment, discuss fertility and fertility preservation with everyone whose treatment is likely to impair fertility; if treatment is urgent, have this talk at the earliest possible opportunity",
      why: "Once radiotherapy starts, some options are lost; the conversation has to happen first.",
      source: "nice-ng257",
      quote: "Discuss fertility preservation as an option with people who are preparing for medical treatment, or who have a medical condition, that is likely to impair their fertility. For people who need urgent treatment, this discussion should take place at the earliest possible opportunity.",
      grade: "[2026]",
    },
    {
      action: "Refer people interested in or unsure about fertility preservation to a reproductive specialist, with prompt access to a multidisciplinary fertility team",
      why: "Specialists can say quickly which options are realistic before treatment begins.",
      source: "asco-fp-2025",
      quote: "Patients interested in or uncertain about FP should be referred to reproductive specialists.",
      grade: "as printed in the abstract (full grade not read)",
    },
    {
      action: "Offer sperm cryopreservation to men and boys of reproductive age before treatment likely to make them infertile",
      why: "Stored sperm keeps the option of biological children open even if production stops.",
      source: "nice-ng257",
      quote: "Offer sperm cryopreservation to men (and boys), and trans women and non-binary people with male reproductive organs who are of reproductive age, and who are preparing for medical treatment, or who have a medical condition, that is likely to make them infertile.",
      grade: "[2026]",
    },
    {
      action: "Offer egg or embryo freezing, as appropriate, to women and girls of reproductive age before treatment likely to make them infertile",
      why: "Eggs or embryos frozen before radiotherapy are not exposed to it.",
      source: "nice-ng257",
      quote: "Offer oocyte or embryo cryopreservation (as appropriate) to women (and girls), and trans men and non-binary people with female reproductive organs who are of reproductive age, and who are preparing for medical treatment, or who have a medical condition, that is likely to make them infertile.",
      grade: "[2026]",
    },
    {
      action: "Consider ovarian tissue freezing when egg or embryo freezing is not feasible, for example before puberty or when there is no time for stimulation",
      why: "Ovarian tissue can be removed quickly and stored without hormone treatment.",
      source: "nice-ng257",
      quote: "Consider ovarian tissue cryopreservation when oocyte or embryo cryopreservation is not feasible, for example, in girls before puberty.",
      grade: "[2026]",
    },
    {
      action: "For premenopausal women having pelvic radiotherapy without chemotherapy, offer ovarian transposition to protect ovarian function",
      why: "Moving the ovaries out of the beam can keep them making hormones and avoid early menopause.",
      source: "eshre-2020",
      quote: "Where pelvic radiotherapy without chemotherapy is planned, women may be offered ovarian transposition with the aim to prevent POI (Gubbala et al., 2014; Hoekman et al., 2019).",
      grade: "WEAK ⊕⊕◯◯",
    },
    {
      action: "Do not offer transposition to women with reduced ovarian reserve or at risk of ovarian metastases",
      why: "Moving ovaries that have few eggs left gains little, and moving ovaries that may hold cancer can spread it.",
      source: "eshre-2020",
      quote: "Women with reduced ovarian reserve and women at risk of having ovarian metastases are inappropriate candidates for ovarian transposition.",
      grade: "GPP",
    },
    {
      action: "Consider combining transposition with ovarian tissue freezing in the same operation",
      why: "One operation can both protect the remaining ovary and store tissue as a back-up.",
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
      why: "The radiotherapy planners need to find the ovaries on the planning scan to keep dose off them.",
      source: "ot-review-2026",
      quote: "The inferior margin of the ovaries should be tagged with radiopaque surgical clips for future identification on CT imaging (Buonomo et al., 2021).",
      grade: "narrative review (no grade)",
    },
    {
      action: "Tell the person that transposition does not always work, that chemotherapy lowers the chance, and that pregnancies after pelvic radiotherapy are few",
      why: "Realistic expectations matter: keeping the ovaries working is not the same as being able to carry a pregnancy after radiation to the uterus.",
      source: "ot-review-2026",
      quote: "Approximately 50–65% of patients with cervical cancer who undergo OT followed by external beam radiation therapy with or without brachytherapy maintain ovarian function; adjuvant chemotherapy further reduces ovarian function preservation.",
      grade: "narrative review (no grade)",
    },
    {
      action: "For NHS-funded fertility preservation, do not apply the usual fertility treatment eligibility rules, including the lower age limit",
      why: "Preservation before cancer treatment is a different situation from treating infertility.",
      source: "nice-ng257",
      quote: "For NHS-funded fertility preservation, do not apply the eligibility criteria used for conventional fertility treatment, including the lower age limit.",
      grade: "[2013, amended 2026]",
    },
  ],
  bestInClass: {
    statement: "Discuss fertility before treatment with everyone at risk and refer promptly (NICE NG257 2026; ASCO 2025); offer sperm, egg or embryo cryopreservation, and consider ovarian tissue cryopreservation when those are not feasible (NICE [2026]). For premenopausal women having pelvic radiotherapy, ovarian transposition is an established option (ASCO 2025) that ESHRE (2020) supports weakly and only without chemotherapy (WEAK, low certainty), excluding women with reduced ovarian reserve or a risk of ovarian metastases. Where done, the ovaries go at least 4 cm from the field or 1.5 cm above the iliac crest, marked with clips (2026 review). NICE NG257 does not mention ovarian transposition; the guidelines differ on whether chemotherapy alongside radiotherapy rules it out (ESHRE limits it to radiotherapy without chemotherapy; ASCO's abstract sets no such limit).",
    sources: ["nice-ng257", "asco-fp-2025", "eshre-2020", "ot-review-2026"],
  },
  variants: [
    {
      name: "Transposition alongside chemoradiotherapy",
      differs: "Many women with cervical, rectal or anal cancer have chemotherapy with their radiotherapy. ESHRE's recommendation covers radiotherapy without chemotherapy; the 2026 review reports transposition in these settings with lower success when chemotherapy is added.",
      evidence: "Observational series; ovarian function preserved in about 50% to 65% after external beam radiotherapy for cervical cancer, lower with adjuvant chemotherapy (review); 61% after external beam radiotherapy in a 2022 meta-analysis of 29 studies.",
      sources: ["eshre-2020", "ot-review-2026", "ot-meta-2022"],
    },
    {
      name: "Transposition in rectal and anal cancer",
      differs: "Higher baseline risk of ovarian metastasis than in cervical cancer (about 1% to 8%, around 5% in premenopausal women), so the 2026 review judges the risks may outweigh the benefits in locally advanced disease.",
      evidence: "Review of retrospective data; no ovarian metastases after transposition reported in this subgroup.",
      sources: ["ot-review-2026"],
    },
    {
      name: "Placing the ovaries behind the uterus (Hodgkin lymphoma)",
      differs: "Older technique for lymphoma fields in which the uterus shields the ovaries; most successful pregnancies after transposition and pelvic radiotherapy were in Hodgkin lymphoma with an inverted Y field and a lead shield to the uterus.",
      evidence: "Historical case series, cited in the 2026 review.",
      sources: ["ot-review-2026"],
    },
    {
      name: "Opportunistic salpingectomy at transposition",
      differs: "Removing the fallopian tubes at the same operation to lower the later risk of ovarian cancer, which the review says should be considered.",
      evidence: "Review citing data that salpingectomy can reduce ovarian cancer risk by up to 65%; not specific to transposition.",
      sources: ["ot-review-2026"],
    },
  ],
  grades: [
    { claim: "Ovarian transposition before pelvic radiotherapy without chemotherapy", grade: "WEAK ⊕⊕◯◯", source: "eshre-2020" },
    { claim: "Not for women with reduced ovarian reserve or at risk of ovarian metastases", grade: "GPP", source: "eshre-2020" },
    { claim: "Provide decision aids to patients considering fertility preservation", grade: "STRONG ⊕⊕◯◯", source: "eshre-2020", quote: "It is recommended to provide decision aids to patients who are considering FP (Peate et al., 2009; Anazodo et al., 2019; Wang et al., 2019)." },
    { claim: "Ovarian transposition is an established fertility preservation method for females", grade: "as printed in the abstract (grade not read)", source: "asco-fp-2025", quote: "For females, established FP methods should be offered, including embryo, oocyte, and ovarian tissue cryopreservation (OTC), ovarian transposition, and conservative gynecologic surgery." },
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
      accessed: "2026-11-11",
    },
    {
      key: "eshre-2020",
      label: "ESHRE guideline: female fertility preservation",
      publisher: "European Society of Human Reproduction and Embryology (Human Reproduction Open)",
      year: 2020,
      url: "https://doi.org/10.1093/hropen/hoaa052",
      doi: "10.1093/hropen/hoaa052",
      gradingScheme: "GRADE: recommendations STRONG or WEAK with certainty of evidence from ⊕⊕⊕⊕ (high) to ⊕◯◯◯ (very low); GPP good practice point; RESEARCH ONLY.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "asco-fp-2025",
      label: "Fertility Preservation in People With Cancer: ASCO Guideline Update",
      publisher: "American Society of Clinical Oncology (Journal of Clinical Oncology)",
      year: 2025,
      url: "https://doi.org/10.1200/JCO-24-02782",
      doi: "10.1200/JCO-24-02782",
      gradingScheme: "ASCO guideline methodology (evidence quality and recommendation strength; full text not read).",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "esmo-fp-2020",
      label: "Fertility preservation and post-treatment pregnancies in post-pubertal cancer patients: ESMO Clinical Practice Guidelines",
      publisher: "European Society for Medical Oncology (Annals of Oncology)",
      year: 2020,
      url: "https://doi.org/10.1016/j.annonc.2020.09.006",
      doi: "10.1016/j.annonc.2020.09.006",
      read: "not-reachable",
      accessed: "2026-11-11",
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
      accessed: "2026-11-11",
    },
    {
      key: "ot-meta-2022",
      label: "Outcomes of ovarian transposition in cervical cancer; an updated meta-analysis",
      publisher: "BMC Women's Health",
      year: 2022,
      url: "https://doi.org/10.1186/s12905-022-01887-8",
      doi: "10.1186/s12905-022-01887-8",
      read: "full-text",
      accessed: "2026-11-11",
    },
  ],
  cancers: ["cervical", "rectal-cancer", "anal", "hodgkin-lymphoma"],
  technologies: ["fertility-preservation"],
  institutions: ["asco"],
  related: ["radiotherapy-pregnancy-and-breastfeeding-enquiry", "radiotherapy-consent"],
  upgrades: [],
  gaps: [
    "The ESMO 2020 fertility preservation guideline could not be read: Europe PMC holds no text for it.",
    "The ASCO 2025 update was read as an abstract only, so its grades and its detail on ovarian transposition are not quoted.",
    "NICE NG257 does not address ovarian transposition or gonadal shielding; no UK guideline found sets out when transposition should be offered.",
    "Testicular shielding and minimising testicular dose during pelvic radiotherapy were not covered by any source read here.",
    "The evidence for transposition is observational, with wide variation in technique, dose and outcome definitions; no randomised trial exists.",
    "The 2022 meta-analysis reports some confidence intervals that do not fit their point estimates in the abstract; only its 61% figure after external beam radiotherapy is used here.",
  ],
});
