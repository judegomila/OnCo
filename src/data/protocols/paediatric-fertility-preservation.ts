import { protocol } from "./helpers";

/*
 * Fertility preservation for children, adolescents and young adults before cancer treatment.
 *
 * Second accuracy pass, 17 November 2026. Every source was fetched again raw with curl and read as text, and every
 * quote was checked against the saved text by script (whitespace and line-break hyphenation only).
 * - Children's Oncology Group endorsement document for the ASCO 2025 fertility preservation guideline update (version
 *   date 27 August 2025; endorsed June 2025), public PDF from the COG supportive care page (pdftotext, raw and layout
 *   text, full text). It reprints every recommendation and good practice statement with its strength and quality. The
 *   COG supportive care page still lists it as the current fertility document, with the 2018 endorsement archived in
 *   August 2025.
 * - Su et al., Fertility Preservation in People With Cancer: ASCO Guideline Update (J Clin Oncol 2025;43:1488-1515):
 *   abstract only, from Europe PMC; the full text is not open access. Europe PMC lists two errata (J Clin Oncol
 *   2025;43:1847 and 43:2553) whose text is not open either.
 * - PanCareLIFE and IGHG recommendations for female and for male patients (Lancet Oncol 2021): the papers are still
 *   abstracts only, but the International Guideline Harmonization Group posts the recommendation documents themselves
 *   (female, male, and communication and ethics, each dated 2020) as open PDFs. These were read in full on
 *   17 November 2026 (pdftotext) and are now a source of their own; the first pass had not found them.
 * Every DOI was resolved through Europe PMC or Crossref and its title checked. In the COG PDF the grade column runs
 * into recommendations that wrap over several lines, so most quotes are taken from the ASCO abstract, and the grades
 * from the COG layout text. Changes in this pass: timing words ("straight away", "immediate") that the graded referral
 * recommendation does not carry are now tied to the ungraded good practice statement; "may be offered" is no longer
 * written as "offer" for ovarian tissue freezing and ovarian transposition; reasons the sources do not give were
 * reworded to what they say; the limits the guideline sets on ovarian transposition were added; and the PanCareLIFE and
 * IGHG treatment-group thresholds are stated as a variant.
 */
export const paediatricFertilityPreservation = protocol({
  id: "paediatric-fertility-preservation",
  name: "Fertility preservation for children and young people before cancer treatment",
  aka: ["oncofertility in children", "paediatric fertility preservation", "sperm banking teenagers", "ovarian tissue freezing children", "testicular tissue cryopreservation", "fertility counselling before chemotherapy"],
  domain: "paediatric",
  tldr: "Some cancer treatments can stop a child having children of their own later. Before treatment, the team should talk with the family about this risk and refer them to a fertility specialist if they want, or are unsure. Teenagers who have started puberty can bank sperm or eggs; for younger girls ovarian tissue can be frozen, and for younger boys testicular tissue freezing is still experimental.",
  simple: "Some cancer treatments affect whether a child can have babies later. The team should talk about this before treatment and offer ways to protect fertility, like freezing sperm, eggs or tissue.",
  summary: "Children's Oncology Group endorses the ASCO 2025 guideline update (166 studies, GRADE). Discuss the possibility of infertility as early as possible before treatment (strong, moderate), offer an evaluation of reproductive risk that accounts for the gonadotoxicity of planned and possible future treatment (strong, moderate), and refer anyone interested or uncertain to reproductive specialists (strong, very low; a good practice statement adds as soon as possible), with prompt access to a multidisciplinary fertility preservation team (good practice). Children and adolescents who have started puberty should be offered established methods with their assent and parental consent (strong, moderate): sperm banking, discussed with all pubertal and postpubertal males before treatment (strong, high), with testicular sperm extraction if no sample can be produced (strong, high), and embryo or oocyte cryopreservation in females (strong, high). For prepubertal patients the only options are ovarian tissue cryopreservation, which may be offered as an established method and needs no ovarian stimulation (strong, moderate), and testicular tissue cryopreservation, which is experimental and for trials only (strong, very low). Hormonal suppression does not protect male fertility (strong, high); GnRH agonists should not be used in place of established methods (conditional, moderate). Ovarian transposition may be offered to reproductive-aged patients before pelvic radiotherapy (strong, moderate). Further discussions may be offered yearly at follow-up and when plans change (strong, low). The PanCareLIFE and IGHG recommendations tie each method to the planned treatment.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "nurse", "multidisciplinary-team", "patient-or-carer"],
    where: ["outpatient-clinic", "ward"],
  },
  population: "Children, adolescents and young adults with cancer facing treatment that may affect fertility, as ASCO 2025 (adult and paediatric patients) and its COG endorsement scope it. Methods differ by pubertal stage. The PanCareLIFE and IGHG guidelines cover people diagnosed with cancer at 25 or younger.",
  trigger: "A child or young person is diagnosed with cancer and treatment is being planned.",
  steps: [
    {
      action: "Talk about the possibility of infertility as soon as possible after diagnosis, before treatment starts",
      why: "The guideline asks for the conversation as early as possible before treatment starts so that the full range of options is kept open.",
      source: "asco-fp-2025",
      quote: "FP approaches should be discussed before cancer-directed therapy.",
      grade: "Strong, Moderate quality evidence",
    },
    {
      action: "Assess and explain the child's own risk, taking account of the planned treatment and any treatment that may follow",
      why: "Some treatments are known to carry a higher risk, and for many cancer treatments the effect on fertility is not known, so the guideline asks that every patient is informed and supported.",
      source: "asco-fp-2025",
      quote: "People with cancer should be evaluated for and counseled about reproductive risks at diagnosis and during survivorship.",
      grade: "Strong, Moderate quality evidence",
    },
    {
      action: "Refer every family who is interested, or unsure, to a reproductive specialist",
      why: "The recommendation covers those who are uncertain as well as those who are interested. A separate good practice statement, which carries no grade, says the referral should be made as soon as possible.",
      source: "asco-fp-2025",
      quote: "Patients interested in or uncertain about FP should be referred to reproductive specialists.",
      grade: "Strong, Very low quality evidence",
    },
    {
      action: "Make sure the team can reach a multidisciplinary fertility preservation service quickly",
      why: "The guideline names who that team includes: fertility specialists, trained mental health professionals, social workers, financial counselling and insurance navigation, and genetic counsellors.",
      source: "asco-fp-2025",
      quote: "Oncology teams should ensure prompt access to a multidisciplinary FP team.",
      grade: "Good practice statement",
    },
    {
      action: "For a child who has started puberty, offer established methods with the child's assent and a parent's or guardian's consent",
      why: "The guideline gives semen and egg freezing as examples of established methods once puberty has begun, and asks for the young person's own assent alongside the parent's or guardian's consent.",
      source: "asco-fp-2025",
      quote: "Established FP methods in children who have begun puberty should be offered with patient assent and parent/guardian consent.",
      grade: "Strong, Moderate quality evidence",
    },
    {
      action: "Offer sperm banking to every pubertal and postpubertal boy before treatment, and testicular sperm extraction if he cannot produce a sample",
      why: "The guideline says any frozen sperm can offer a chance of biological parenthood. More samples give more choice later, but collecting several is not always possible.",
      source: "asco-fp-2025",
      quote: "Sperm cryopreservation should be offered to males before cancer-directed treatment, with testicular sperm extraction if unable to provide semen samples.",
      grade: "Strong, High quality evidence",
    },
    {
      action: "Collect sperm before treatment starts, and do not let poor counts or urgency stop banking",
      why: "Sperm collected soon after treatment starts or finishes may carry a higher risk of genetic damage. Intracytoplasmic sperm injection can use a very limited amount of sperm, so banking is still worthwhile when counts are low or time is short.",
      source: "asco-fp-2025",
      quote: "Males should be advised of potentially higher genetic damage risks in sperm collected soon after cancer-directed therapy initiation and completion.",
      grade: "Strong, Low quality evidence",
    },
    {
      action: "For a girl who has started puberty, offer egg or embryo freezing where treatment can wait for ovarian stimulation",
      why: "Both are established methods. In most cases stimulation no longer has to wait for a particular day of the cycle. For adolescents the guideline names egg freezing as its example, and it says egg freezing should be done in centres with the necessary expertise.",
      source: "cog-fp-2025",
      grade: "Strong, High quality evidence",
    },
    {
      action: "For a girl before puberty, or one who cannot delay chemotherapy, discuss ovarian tissue freezing, which may be offered",
      why: "It needs no ovarian stimulation and no sexual maturity, and is the only established option before puberty. The guideline notes a theoretical risk of returning cancer cells when the tissue is later transplanted, of unknown clinical significance, and asks that survivors are checked for this before transplant.",
      source: "asco-fp-2025",
      quote: "The only established method for prepubertal females is OTC.",
      grade: "Strong, Moderate quality evidence",
    },
    {
      action: "For a boy before puberty, offer testicular tissue freezing only within a clinical trial or approved research protocol",
      why: "The method is still investigational, so it is offered as research rather than as routine care.",
      source: "asco-fp-2025",
      quote: "Testicular tissue cryopreservation in prepubertal males is experimental and should be offered only in a clinical trial.",
      grade: "Strong, Very low quality evidence",
    },
    {
      action: "Do not offer hormonal suppression to protect a boy's fertility, and do not use GnRH agonists in place of established methods in girls",
      why: "Hormone suppression is not effective for boys. In girls, ASCO says GnRH agonists may be offered as an addition in breast cancer, and encourages trials in other cancers.",
      source: "asco-fp-2025",
      quote: "Gonadotropin-releasing hormone agonist (GnRHa) should not be used in place of established FP methods but may be offered as an adjunct to females with breast cancer.",
      grade: "Strong, High quality evidence (males); Conditional, Moderate quality evidence (GnRHa)",
    },
    {
      action: "Where pelvic radiotherapy is planned for a patient of reproductive age, consider moving the ovaries out of the field (ovarian transposition), as close to the time of radiotherapy as possible",
      why: "The guideline says this may be offered, but scattered radiation means the ovaries are not always protected, and the ovaries can move back, which is why it is done close to radiotherapy. It is not suitable where the risk of spread to the ovary is moderate or high, or where chemotherapy that harms the ovaries is given at the same time.",
      source: "cog-fp-2025",
      grade: "Strong, Moderate quality evidence",
    },
    {
      action: "Keep the discussion going through follow-up, when treatment plans change, and when pregnancy is being considered, and record each discussion",
      why: "ASCO says further discussions or referrals may be offered yearly after treatment. PanCareLIFE and IGHG ask for counselling on an ongoing basis because the infertility risk or the patient's ideas may change. Egg or embryo freezing may be offered after treatment to some who did not preserve fertility before.",
      source: "cog-fp-2025",
      grade: "Strong, Low quality evidence",
    },
  ],
  bestInClass: {
    statement: "The ASCO 2025 guideline update, endorsed by the Children's Oncology Group in June 2025, is the current standard and replaces the 2018 version: early discussion and risk assessment before treatment, referral to reproductive specialists for anyone interested or uncertain, established methods for pubertal children with their assent and parental consent, ovarian tissue cryopreservation as an established method that may be offered to prepubertal girls, and testicular tissue cryopreservation for prepubertal boys only in trials. The PanCareLIFE and IGHG recommendations (2021), written with GRADE for patients diagnosed at 25 or younger, agree that every patient and family should be told the expected risk, and differ in tying each method to the planned treatment; the difference is set out under variants.",
    sources: ["cog-fp-2025", "asco-fp-2025", "ighg-fp-recs-2020", "pancarelife-female-2021", "pancarelife-male-2021"],
  },
  variants: [
    {
      name: "GnRH agonist for menstrual suppression in an oncology emergency",
      differs: "For patients with an oncological emergency who need urgent chemotherapy, a GnRH agonist may be offered and can provide benefits such as suppressing periods.",
      evidence: "ASCO 2025, conditional recommendation, low quality evidence.",
      sources: ["cog-fp-2025", "asco-fp-2025"],
    },
    {
      name: "PanCareLIFE and IGHG: methods offered according to the planned treatment",
      differs: "ASCO 2025, as reprinted by COG, sets no dose threshold. PanCareLIFE and IGHG group patients by planned treatment. For girls, high-dose alkylating agents are a cyclophosphamide equivalent dose at or above 6,000 to 8,000 mg/m²; in that group, or with radiotherapy to volumes exposing the ovaries or a stem cell transplant, egg or embryo freezing is strongly recommended after menarche only if the cancer prognosis is not compromised by delay, and harvesting ovarian tissue is moderately recommended before or after puberty. Ovarian tissue harvesting is not recommended with lower alkylating agent doses or cranial radiotherapy, and transplanting tissue taken before puberty is for research only. For girls no recommendation is made on hormone suppression in clinical care. For boys, high-dose alkylating agents are a cyclophosphamide equivalent dose of 4,000 mg/m² or more; sperm freezing is strongly recommended to pubertal and postpubertal boys (Tanner stage II or above) in every at-risk group, and harvesting testicular tissue before puberty is moderately recommended in the high-dose, testicular radiotherapy or transplant group, only within clinical trials or approved protocols.",
      evidence: "PanCareLIFE and IGHG recommendation documents (2020): strong and moderate recommendations, mostly on very low quality evidence and existing guidelines.",
      sources: ["ighg-fp-recs-2020"],
    },
  ],
  grades: [
    { claim: "Discuss infertility as early as possible before treatment", grade: "Strong, Moderate quality evidence", source: "cog-fp-2025" },
    { claim: "Refer interested or uncertain patients to reproductive specialists", grade: "Strong, Very low quality evidence", source: "cog-fp-2025" },
    { claim: "Established methods for children who have begun puberty, with assent and consent", grade: "Strong, Moderate quality evidence", source: "cog-fp-2025" },
    { claim: "Sperm cryopreservation before treatment", grade: "Strong, High quality evidence", source: "cog-fp-2025" },
    { claim: "No hormonal suppression to preserve male fertility", grade: "Strong, High quality evidence", source: "cog-fp-2025" },
    { claim: "Testicular tissue cryopreservation in prepubertal males only in trials", grade: "Strong, Very low quality evidence", source: "cog-fp-2025" },
    { claim: "Ovarian tissue cryopreservation may be offered as an established method", grade: "Strong, Moderate quality evidence", source: "cog-fp-2025" },
    { claim: "GnRH agonists not in place of established methods", grade: "Conditional, Moderate quality evidence", source: "cog-fp-2025" },
    { claim: "Ovarian transposition may be offered to reproductive-aged patients before pelvic radiotherapy", grade: "Strong, Moderate quality evidence", source: "cog-fp-2025" },
    { claim: "Inform all patients and their families of the expected risk of infertility", grade: "Strong recommendation, very low- to moderate-quality evidence", source: "ighg-fp-recs-2020", quote: "We strongly recommend that healthcare providers inform all CAYA cancer patients and their parents/caregivers/partners about the expected risk of infertility, which may vary in magnitude based on the specific treatment planned (very low- to moderate-quality evidence)." },
  ],
  sources: [
    { key: "cog-fp-2025", label: "Fertility Preservation in People with Cancer: ASCO Clinical Practice Guideline Update (COG endorsement, version date 27 August 2025)", publisher: "Children's Oncology Group", year: 2025, url: "https://childrensoncologygroup.org/wp-content/uploads/2026/05/COG_SC_Fertility_Guideline_Document_27AUG2025-new-logo.pdf", gradingScheme: "Reprints the source guideline's strength (strong or conditional) and quality of evidence (high, moderate, low, very low) for each recommendation; good practice statements are ungraded.", read: "full-text", accessed: "2026-11-17" },
    { key: "asco-fp-2025", label: "Fertility Preservation in People With Cancer: ASCO Guideline Update", publisher: "ASCO, Journal of Clinical Oncology", year: 2025, url: "https://europepmc.org/abstract/MED/40106739", doi: "10.1200/JCO-24-02782", gradingScheme: "Strength strong or conditional, evidence quality high to very low, as reprinted by COG.", read: "abstract", accessed: "2026-11-17" },
    { key: "ighg-fp-recs-2020", label: "Fertility preservation recommendations for female and male childhood, adolescent and young adult cancer patients, and for communication and ethical considerations (recommendation documents, 2020)", publisher: "International Late Effects of Childhood Cancer Guideline Harmonization Group and PanCareLIFE", year: 2020, url: "https://www.ighg.org/guidelines/topics/fertility-preservation/recommendations/", gradingScheme: "GRADE-based wording: strongly recommend, moderately recommend, do not recommend, or no recommendation, each with the quality of evidence (high to very low, existing guidelines, or expert opinion).", read: "full-text", accessed: "2026-11-17" },
    { key: "pancarelife-female-2021", label: "Fertility preservation for female patients with childhood, adolescent, and young adult cancer: recommendations from the PanCareLIFE Consortium and the International Late Effects of Childhood Cancer Guideline Harmonization Group", publisher: "PanCareLIFE and IGHG, The Lancet Oncology", year: 2021, url: "https://europepmc.org/abstract/MED/33539753", doi: "10.1016/S1470-2045(20)30594-5", read: "abstract", accessed: "2026-11-17" },
    { key: "pancarelife-male-2021", label: "Fertility preservation for male patients with childhood, adolescent, and young adult cancer: recommendations from the PanCareLIFE Consortium and the International Late Effects of Childhood Cancer Guideline Harmonization Group", publisher: "PanCareLIFE and IGHG, The Lancet Oncology", year: 2021, url: "https://europepmc.org/abstract/MED/33539754", doi: "10.1016/S1470-2045(20)30582-9", read: "abstract", accessed: "2026-11-17" },
  ],
  upgrades: ["idea-acc-default-fertility-preservation-referral"],
  gaps: [
    "The two PanCareLIFE and IGHG papers in The Lancet Oncology (2021) are not open access and were read only as abstracts. On 17 November 2026 the recommendation documents that the IGHG posts on its own site (dated 2020) were read in full and are what the variant here rests on; the papers' supporting text and evidence tables were not read.",
    "The full text of ASCO 2025 is not open access; recommendations were read in its abstract and as reprinted by COG. On 17 November 2026 Europe PMC listed two errata to it (J Clin Oncol 2025;43:1847 and 43:2553); their text is not open and was not read, so what they correct is not known here.",
    "No source read here gives a treatment-by-treatment risk table for children. PanCareLIFE and IGHG define treatment groups by cyclophosphamide equivalent dose and by radiotherapy field, but give no radiation dose threshold in the documents read; that assessment is left to the team.",
    "ASCO says ovarian transposition may be offered to patients of reproductive age; PanCareLIFE and IGHG moderately recommend oophoropexy before or after puberty, after consultation with a radiation oncologist.",
    "Funding and access to fertility preservation for children vary by country and were not reviewed.",
    "NICE and ESHRE guidance on fertility preservation were not read for this protocol.",
  ],
  cancers: ["childhood-cancers"],
  technologies: ["fertility-preservation", "rejuv-paed-fertility-male", "rejuv-paed-fertility-female"],
  companies: ["childrens-oncology-group"],
  institutions: ["asco"],
  related: ["oncofertility-consortium", "goserelin", "leuprolide"],
  terms: ["late-effects"],
  sections: ["supportive-care"],
  tags: ["protocol", "paediatric", "fertility"],
});
