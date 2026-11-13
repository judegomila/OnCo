import { protocol } from "./helpers";

/*
 * Fertility preservation for children, adolescents and young adults before cancer treatment.
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - Children's Oncology Group endorsement document for the ASCO 2025 fertility preservation guideline update (version
 *   date 27 August 2025; endorsed June 2025), public PDF from the COG supportive care page (pdftotext, raw and layout
 *   text, full text). It reprints every recommendation and good practice statement with its strength and quality, and
 *   replaces the 2018 endorsement, which COG lists as archived in August 2025.
 * - Su et al., Fertility Preservation in People With Cancer: ASCO Guideline Update (J Clin Oncol 2025): abstract only,
 *   from Europe PMC; the full text is not open access.
 * - PanCareLIFE and IGHG recommendations for female and for male patients with childhood, adolescent and young adult
 *   cancer (Lancet Oncol 2021): abstracts only, from Europe PMC. The abstracts state the scope (diagnosed at age 25 or
 *   younger) and the method but not the recommendations, so no step rests on them.
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied from the raw text with line breaks
 * joined and nothing else changed. In the COG PDF the grade column runs into recommendations that wrap over several
 * lines, so most quotes are taken from the ASCO abstract, and the grades from the COG layout text.
 */
export const paediatricFertilityPreservation = protocol({
  id: "paediatric-fertility-preservation",
  name: "Fertility preservation for children and young people before cancer treatment",
  aka: ["oncofertility in children", "paediatric fertility preservation", "sperm banking teenagers", "ovarian tissue freezing children", "testicular tissue cryopreservation", "fertility counselling before chemotherapy"],
  domain: "paediatric",
  tldr: "Some cancer treatments can stop a child having children of their own later. Before treatment, the team should talk with the family about this risk and refer them to a fertility specialist if they want, or are unsure. Teenagers who have started puberty can bank sperm or eggs; for younger girls ovarian tissue can be frozen, and for younger boys testicular tissue freezing is still experimental.",
  simple: "Some cancer treatments affect whether a child can have babies later. The team should talk about this before treatment and offer ways to protect fertility, like freezing sperm, eggs or tissue.",
  summary: "Children's Oncology Group endorses the ASCO 2025 guideline update (166 studies, GRADE) for children. Discuss the possibility of infertility as early as possible before treatment (strong, moderate), offer an evaluation of reproductive risk that accounts for the gonadotoxicity of planned and possible future treatment (strong, moderate), and refer anyone interested or uncertain to reproductive specialists as soon as possible (strong, very low), with prompt access to a multidisciplinary fertility preservation team (good practice). Children and adolescents who have started puberty should be offered established methods with their assent and parental consent (strong, moderate): sperm banking for all pubertal and postpubertal males before treatment (strong, high), with testicular sperm extraction if no sample can be produced (strong, high), and embryo or oocyte cryopreservation in females (strong, high). For prepubertal patients the only options are ovarian tissue cryopreservation, an established method that needs no ovarian stimulation or delay (strong, moderate), and testicular tissue cryopreservation, which is experimental and for trials only (strong, very low). Hormonal suppression does not protect male fertility (strong, high); GnRH agonists must not replace established methods (conditional, moderate). Ovarian transposition may be offered before pelvic radiotherapy (strong, moderate). Revisit fertility at follow-up and when plans change (strong, low).",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "nurse", "multidisciplinary-team", "patient-or-carer"],
    where: ["outpatient-clinic", "ward"],
  },
  population: "Children, adolescents and young adults with cancer facing treatment that may affect fertility, as ASCO 2025 (adult and paediatric patients) and its COG endorsement scope it. Methods differ by pubertal stage. The PanCareLIFE and IGHG guidelines cover people diagnosed at 25 or younger.",
  trigger: "A child or young person is diagnosed with cancer and treatment is being planned.",
  steps: [
    {
      action: "Talk about the possibility of infertility as soon as possible after diagnosis, before treatment starts",
      why: "Many options must be done before the first dose of treatment, so a late conversation can close them off.",
      source: "asco-fp-2025",
      quote: "FP approaches should be discussed before cancer-directed therapy.",
      grade: "Strong, Moderate quality evidence",
    },
    {
      action: "Assess and explain the child's own risk, taking account of the planned treatment and any treatment that may follow",
      why: "Risk differs between treatments, and for many newer treatments it is not yet known, so the family needs to hear what applies to their child.",
      source: "asco-fp-2025",
      quote: "People with cancer should be evaluated for and counseled about reproductive risks at diagnosis and during survivorship.",
      grade: "Strong, Moderate quality evidence",
    },
    {
      action: "Refer every family who is interested, or unsure, to a reproductive specialist straight away",
      why: "Uncertain families benefit from expert advice too, and delay can rule options out.",
      source: "asco-fp-2025",
      quote: "Patients interested in or uncertain about FP should be referred to reproductive specialists.",
      grade: "Strong, Very low quality evidence",
    },
    {
      action: "Make sure the team can reach a multidisciplinary fertility preservation service quickly",
      why: "Fertility specialists, psychological support, social work, financial counselling and genetic counselling may all be needed within days.",
      source: "asco-fp-2025",
      quote: "Oncology teams should ensure prompt access to a multidisciplinary FP team.",
      grade: "Good practice statement",
    },
    {
      action: "For a child who has started puberty, offer established methods with the child's assent and a parent's or guardian's consent",
      why: "A young person who has begun puberty can usually store sperm or eggs, and their own agreement matters alongside the parents'.",
      source: "asco-fp-2025",
      quote: "Established FP methods in children who have begun puberty should be offered with patient assent and parent/guardian consent.",
      grade: "Strong, Moderate quality evidence",
    },
    {
      action: "Offer sperm banking to every pubertal and postpubertal boy before treatment, and testicular sperm extraction if he cannot produce a sample",
      why: "Frozen sperm is the most reliable way for a boy to keep the chance of biological children; even a small sample can be used later.",
      source: "asco-fp-2025",
      quote: "Sperm cryopreservation should be offered to males before cancer-directed treatment, with testicular sperm extraction if unable to provide semen samples.",
      grade: "Strong, High quality evidence",
    },
    {
      action: "Collect sperm before treatment starts, and do not let poor counts or urgency stop banking",
      why: "Sperm collected soon after starting treatment may carry more genetic damage; modern IVF can use very few sperm.",
      source: "asco-fp-2025",
      quote: "Males should be advised of potentially higher genetic damage risks in sperm collected soon after cancer-directed therapy initiation and completion.",
      grade: "Strong, Low quality evidence",
    },
    {
      action: "For a girl who has started puberty, offer embryo or egg freezing where there is time for ovarian stimulation",
      why: "Both are established methods; stimulation no longer has to wait for a particular day of the cycle.",
      source: "cog-fp-2025",
      grade: "Strong, High quality evidence",
    },
    {
      action: "For a girl before puberty, or one who cannot delay treatment, offer ovarian tissue freezing",
      why: "It needs no hormone stimulation or delay and is the only established option before puberty.",
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
      why: "Hormone suppression is not effective for boys; in girls, ASCO allows GnRH agonists only as an addition, in breast cancer, and asks for trials elsewhere.",
      source: "asco-fp-2025",
      quote: "Gonadotropin-releasing hormone agonist (GnRHa) should not be used in place of established FP methods but may be offered as an adjunct to females with breast cancer.",
      grade: "Strong, High quality evidence (males); Conditional, Moderate quality evidence (GnRHa)",
    },
    {
      action: "Where pelvic radiotherapy is planned, consider moving the ovaries out of the field (ovarian transposition) close to the time of radiotherapy",
      why: "Moving the ovaries can shield them from radiation, though scatter means it does not always work.",
      source: "cog-fp-2025",
      grade: "Strong, Moderate quality evidence",
    },
    {
      action: "Revisit fertility at follow-up visits, when treatment plans change, and when pregnancy is being considered, and record each discussion",
      why: "A child's wishes change as they grow up, and options such as egg or embryo freezing remain possible after treatment for some.",
      source: "cog-fp-2025",
      grade: "Strong, Low quality evidence",
    },
  ],
  bestInClass: {
    statement: "The ASCO 2025 guideline update, endorsed by the Children's Oncology Group in June 2025, is the current standard and replaces the 2018 version: early discussion and risk assessment before treatment, immediate referral for anyone interested or uncertain, established methods for pubertal children with their assent and parental consent, ovarian tissue cryopreservation as an established method for prepubertal girls, and testicular tissue cryopreservation for prepubertal boys only in trials. The PanCareLIFE and IGHG recommendations (2021) cover the same ground for patients diagnosed at 25 or younger with GRADE; they were read only as abstracts here, so where they differ from ASCO is not stated.",
    sources: ["cog-fp-2025", "asco-fp-2025", "pancarelife-female-2021", "pancarelife-male-2021"],
  },
  variants: [
    {
      name: "GnRH agonist for menstrual suppression in an oncology emergency",
      differs: "Gives a GnRH agonist when chemotherapy must start urgently, for its benefits such as suppressing periods, rather than as a fertility method.",
      evidence: "ASCO 2025, conditional recommendation, low quality evidence.",
      sources: ["cog-fp-2025", "asco-fp-2025"],
    },
  ],
  grades: [
    { claim: "Discuss infertility as early as possible before treatment", grade: "Strong, Moderate quality evidence", source: "cog-fp-2025" },
    { claim: "Refer interested or uncertain patients to reproductive specialists", grade: "Strong, Very low quality evidence", source: "cog-fp-2025" },
    { claim: "Established methods for children who have begun puberty, with assent and consent", grade: "Strong, Moderate quality evidence", source: "cog-fp-2025" },
    { claim: "Sperm cryopreservation before treatment", grade: "Strong, High quality evidence", source: "cog-fp-2025" },
    { claim: "No hormonal suppression to preserve male fertility", grade: "Strong, High quality evidence", source: "cog-fp-2025" },
    { claim: "Testicular tissue cryopreservation in prepubertal males only in trials", grade: "Strong, Very low quality evidence", source: "cog-fp-2025" },
    { claim: "Ovarian tissue cryopreservation as an established method", grade: "Strong, Moderate quality evidence", source: "cog-fp-2025" },
    { claim: "GnRH agonists not in place of established methods", grade: "Conditional, Moderate quality evidence", source: "cog-fp-2025" },
    { claim: "Ovarian transposition before pelvic radiotherapy", grade: "Strong, Moderate quality evidence", source: "cog-fp-2025" },
  ],
  sources: [
    { key: "cog-fp-2025", label: "Fertility Preservation in People with Cancer: ASCO Clinical Practice Guideline Update (COG endorsement, version date 27 August 2025)", publisher: "Children's Oncology Group", year: 2025, url: "https://childrensoncologygroup.org/wp-content/uploads/2026/05/COG_SC_Fertility_Guideline_Document_27AUG2025-new-logo.pdf", gradingScheme: "Reprints the source guideline's strength (strong or conditional) and quality of evidence (high, moderate, low, very low) for each recommendation; good practice statements are ungraded.", read: "full-text", accessed: "2026-11-11" },
    { key: "asco-fp-2025", label: "Fertility Preservation in People With Cancer: ASCO Guideline Update", publisher: "ASCO, Journal of Clinical Oncology", year: 2025, url: "https://europepmc.org/abstract/MED/40106739", doi: "10.1200/JCO-24-02782", gradingScheme: "Strength strong or conditional, evidence quality high to very low, as reprinted by COG.", read: "abstract", accessed: "2026-11-11" },
    { key: "pancarelife-female-2021", label: "Fertility preservation for female patients with childhood, adolescent, and young adult cancer: recommendations from the PanCareLIFE Consortium and the International Late Effects of Childhood Cancer Guideline Harmonization Group", publisher: "PanCareLIFE and IGHG, The Lancet Oncology", year: 2021, url: "https://europepmc.org/abstract/MED/33539753", doi: "10.1016/S1470-2045(20)30594-5", read: "abstract", accessed: "2026-11-11" },
    { key: "pancarelife-male-2021", label: "Fertility preservation for male patients with childhood, adolescent, and young adult cancer: recommendations from the PanCareLIFE Consortium and the International Late Effects of Childhood Cancer Guideline Harmonization Group", publisher: "PanCareLIFE and IGHG, The Lancet Oncology", year: 2021, url: "https://europepmc.org/abstract/MED/33539754", doi: "10.1016/S1470-2045(20)30582-9", read: "abstract", accessed: "2026-11-11" },
  ],
  upgrades: ["idea-acc-default-fertility-preservation-referral"],
  gaps: [
    "The PanCareLIFE and IGHG 2021 recommendations, the main paediatric-specific fertility guidelines, were read only as abstracts, which do not state the recommendations; their risk thresholds by treatment (for example by cumulative alkylating agent dose) are not given here.",
    "The full text of ASCO 2025 is not open access; recommendations were read in its abstract and as reprinted by COG.",
    "No source read here gives a treatment-by-treatment risk table for children; that assessment is left to the team.",
    "Funding and access to fertility preservation for children vary by country and were not reviewed.",
    "NICE CG156 and ESHRE guidance on fertility preservation were not read for this protocol.",
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
