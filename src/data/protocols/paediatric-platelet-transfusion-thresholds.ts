import { protocol } from "./helpers";

/*
 * Platelet transfusion thresholds for children with cancer: prophylaxis during chemotherapy or after allogeneic
 * transplant, lumbar puncture and other procedures, and bleeding.
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - Children's Oncology Group endorsement document for the 2025 AABB and ICTMG international guidelines (version date
 *   26 March 2026; endorsed February 2026), public PDF from the COG supportive care page (pdftotext, full text). It
 *   reprints the recommendations that apply to children. COG lists the 2021 ASCO and 2019 ICTMG endorsements as
 *   archived.
 * - Metcalf et al., Platelet transfusion: 2025 AABB and ICTMG international clinical practice guidelines (JAMA 2025):
 *   abstract only, from Europe PMC; the full text is not open access.
 * - NICE NG24, Blood transfusion: the platelet transfusion chapter, the inclusions and exclusions chapter and the
 *   update information (HTML, full text). NG24 excludes children under 1 year and says its recommendations for older
 *   children were extrapolated from adult evidence.
 * - British Society for Haematology guidelines on transfusion for fetuses, neonates and older children (2016, with a
 *   2020 addendum): the publisher returned 403 to a script and Europe PMC holds no abstract. Not read; no step rests on
 *   it.
 * The DOIs were resolved through Europe PMC and their titles checked. Quotes are copied from the raw text with line
 * breaks joined and nothing else changed. The superscripts in the platelet counts (10 to the power 3 or 9) mangle in
 * the raw text, so no quote carries a count; the counts are given in the prose, read from the same recommendations.
 */
export const paediatricPlateletTransfusionThresholds = protocol({
  id: "paediatric-platelet-transfusion-thresholds",
  name: "Platelet transfusion thresholds for children with cancer",
  aka: ["paediatric platelet transfusion", "prophylactic platelet transfusion children", "platelet threshold lumbar puncture", "platelet count 10 transfusion"],
  domain: "paediatric",
  tldr: "Chemotherapy can lower platelets, the blood cells that stop bleeding. A child who is not bleeding is usually given a platelet transfusion only when the count falls below 10, because giving them earlier does not prevent more bleeding. Higher counts are needed before a lumbar puncture or surgery, and for a child who is bleeding.",
  simple: "Platelets help blood clot. If chemotherapy makes them very low, the child gets a platelet transfusion. The team gives them when the count is very low or before some procedures, not every time it drops.",
  summary: "The 2025 AABB and ICTMG international guidelines (GRADE, 21 randomised trials and 13 observational studies), endorsed by the Children's Oncology Group in February 2026, favour restrictive platelet use. For non-bleeding patients with hypoproliferative thrombocytopenia receiving chemotherapy or undergoing allogeneic stem cell transplant, transfuse at a platelet count below 10 × 10³/μL (strong, moderate). Before lumbar puncture, transfuse below 20 × 10³/μL (strong, moderate), recognising an extremely low rate of spinal haematoma. Preterm neonates without major bleeding are transfused below 25 × 10³/μL (strong, high). A good practice statement asks clinicians to weigh symptoms, bleeding history, medicines, values and the whole clinical picture. NICE NG24 (children over 1 year, extrapolated from adults) agrees on prophylaxis below 10 × 10⁹/L, gives a threshold of 30 × 10⁹/L for clinically significant (WHO grade 2) bleeding and up to 100 for severe or critical-site bleeding, considers raising the count above 50 for invasive procedures or surgery, and advises no prophylactic platelets for bone marrow aspiration and trephine. One dose at a time, then reassess the child and recheck the count.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "nurse"],
    where: ["ward", "chemotherapy-day-unit", "outpatient-clinic"],
  },
  population: "Children with cancer who have low platelets because of chemotherapy or allogeneic stem cell transplant (hypoproliferative thrombocytopenia), as the AABB and ICTMG recommendations endorsed by COG for children scope them. NICE NG24 excludes children under 1 year; preterm neonates have their own AABB and ICTMG threshold. The guideline's recommendations on autologous transplant and aplastic anaemia are for adults only.",
  trigger: "A child having chemotherapy or after transplant has a low platelet count, is bleeding, or is due for a procedure.",
  steps: [
    {
      action: "Decide on each transfusion with the whole picture in mind: symptoms, signs, other blood tests, bleeding history, medicines, the family's values and other treatments",
      why: "The count is a guide, not the only reason to transfuse or not.",
      source: "cog-platelet-2026",
      quote: "Consider symptoms, signs, other laboratory parameters, bleeding history, medications, patients’ values and preferences, alternative therapies, and overall clinical context when deciding to perform a platelet transfusion on a particular patient.",
      grade: "Good practice statement",
    },
    {
      action: "For a child who is not bleeding during chemotherapy or after allogeneic transplant, transfuse platelets when the count is below 10 × 10³/μL",
      why: "Transfusing at higher counts did not reduce bleeding or deaths in the trials, and each transfusion carries a risk of reactions.",
      source: "metcalf-2025",
      quote: "Evidence demonstrated that restrictive transfusion strategies probably did not cause increases in mortality or bleeding relative to liberal strategies across predefined clinical populations.",
      grade: "Strong / Moderate",
    },
    {
      action: "Before a lumbar puncture, transfuse if the count is below 20 × 10³/μL",
      why: "Bleeding into the spine after a lumbar puncture with low platelets was found to be extremely rare, so a lower threshold spares children transfusions.",
      source: "metcalf-2025",
      quote: "Exceedingly low incidence of spinal hematoma was identified in patients with thrombocytopenia undergoing lumbar puncture.",
      grade: "Strong / Moderate",
    },
    {
      action: "Do not give prophylactic platelets for a bone marrow aspirate and trephine",
      why: "NICE classes it as a procedure with a low risk of bleeding, so platelets are not given just for it.",
      source: "nice-ng24",
      quote: "Do not offer prophylactic platelet transfusions to people having procedures with a low risk of bleeding, such as adults having central venous cannulation or any people having bone marrow aspiration and trephine biopsy.",
    },
    {
      action: "For other invasive procedures or surgery, consider raising the count above 50 × 10⁹/L, and above 100 for surgery in critical sites such as the brain or the back of the eye",
      why: "Riskier procedures need a higher count, and the brain and the back of the eye are where bleeding does most harm.",
      source: "nice-ng24",
    },
    {
      action: "For a child with clinically significant bleeding (WHO grade 2) and a count below 30 × 10⁹/L, transfuse platelets",
      why: "Bleeding with a low count is the clearest reason to give platelets.",
      source: "nice-ng24",
    },
    {
      action: "For severe bleeding or bleeding in a critical site such as the brain or eyes, use a higher threshold, up to 100 × 10⁹/L",
      why: "Bleeding in these places can cause lasting harm, so the count is kept higher.",
      source: "nice-ng24",
    },
    {
      action: "Give one dose at a time, then reassess the child and recheck the count before giving more",
      why: "A single dose is usually enough, and checking avoids giving more than needed.",
      source: "nice-ng24",
      quote: "Reassess the person's clinical condition and check their platelet count after each platelet transfusion, and give further doses if needed.",
    },
  ],
  bestInClass: {
    statement: "For prophylaxis during chemotherapy or after allogeneic transplant the guidelines agree: transfuse a non-bleeding child below 10 (AABB and ICTMG 2025, strong, moderate, endorsed by COG for children; NICE NG24, for people over 1 year). They differ before lumbar puncture: AABB and ICTMG recommend a threshold of 20 × 10³/μL (strong, moderate), on evidence that spinal haematoma is exceedingly rare, while NICE NG24 has no lumbar puncture threshold and considers raising the count above 50 × 10⁹/L for invasive procedures in general, a 2015 recommendation extrapolated from adults. The 2025 international guideline is the newer and the one COG endorses for children.",
    sources: ["cog-platelet-2026", "metcalf-2025", "nice-ng24"],
  },
  variants: [
    {
      name: "Platelets above 50 before lumbar puncture (NICE NG24 general procedure threshold)",
      differs: "Treats a lumbar puncture as an invasive procedure and considers raising the count above 50 × 10⁹/L, rather than transfusing only below 20.",
      evidence: "NICE does not grade recommendations and wrote this one in 2015 for invasive procedures in general, extrapolated to children from adult evidence. AABB and ICTMG 2025 give a strong recommendation, moderate certainty, for a threshold of 20 × 10³/μL specifically for lumbar puncture.",
      sources: ["nice-ng24", "metcalf-2025"],
    },
  ],
  grades: [
    { claim: "Prophylactic transfusion below 10 × 10³/μL during chemotherapy or after allogeneic transplant", grade: "Strong / Moderate", source: "cog-platelet-2026" },
    { claim: "Transfusion below 20 × 10³/μL before lumbar puncture", grade: "Strong / Moderate", source: "cog-platelet-2026" },
    { claim: "Preterm neonates without major bleeding transfused below 25 × 10³/μL", grade: "Strong / High", source: "cog-platelet-2026" },
    { claim: "No prophylactic platelets for non-bleeding adults after autologous transplant or with aplastic anaemia", grade: "conditional recommendation, low/very low-certainty evidence", source: "metcalf-2025", quote: "For hypoproliferative thrombocytopenia in nonbleeding adults undergoing autologous stem cell transplant or with aplastic anemia, prophylactic platelet transfusion is not recommended." },
  ],
  sources: [
    { key: "cog-platelet-2026", label: "Platelet Transfusion 2025 AABB and ICTMG International Clinical Practice Guidelines (COG endorsement, version date 26 March 2026)", publisher: "Children's Oncology Group", year: 2026, url: "https://childrensoncologygroup.org/wp-content/uploads/2026/07/COG_SC_Platelet_Transfusion_Guideline_Document_26MARCH2026.pdf", gradingScheme: "GRADE, reprinted from the source guideline as strength of recommendation / certainty of evidence (for example Strong / Moderate).", read: "full-text", accessed: "2026-11-11" },
    { key: "metcalf-2025", label: "Platelet Transfusion: 2025 AABB and ICTMG International Clinical Practice Guidelines", publisher: "AABB and the International Collaboration for Transfusion Medicine Guidelines, JAMA", year: 2025, url: "https://europepmc.org/abstract/MED/40440268", doi: "10.1001/jama.2025.7529", gradingScheme: "GRADE: strong or conditional recommendations; certainty high, moderate, low or very low.", read: "abstract", accessed: "2026-11-11" },
    { key: "nice-ng24", label: "Blood transfusion (NG24): platelet transfusion recommendations", publisher: "NICE", year: 2015, url: "https://www.nice.org.uk/guidance/ng24/chapter/Platelet-transfusion", gradingScheme: "NICE does not grade recommendations; the strength is in the wording ('offer', 'consider', 'do not offer'), and each is dated, here [2015]. The guideline was last updated in February 2026 (tranexamic acid).", read: "full-text", accessed: "2026-11-11" },
    { key: "bsh-2016", label: "Guidelines on transfusion for fetuses, neonates and older children (with 2020 addendum)", publisher: "British Society for Haematology, British Journal of Haematology", year: 2016, url: "https://doi.org/10.1111/bjh.14233", doi: "10.1111/bjh.14233", read: "not-reachable", accessed: "2026-11-11" },
  ],
  upgrades: [],
  gaps: [
    "The full text of the 2025 AABB and ICTMG guideline is not open access; the recommendations here come from its abstract and the COG endorsement document, which lists only those applicable to children.",
    "The British Society for Haematology paediatric transfusion guideline (2016, 2020 addendum), the main UK source for children, could not be read: the publisher refused a script and Europe PMC holds no abstract.",
    "No guideline read here gives a platelet threshold for central line insertion in children; the AABB and ICTMG threshold of 10 for compressible central venous catheter sites is for adults.",
    "The thresholds for children who are bleeding come from NICE, extrapolated from adult evidence.",
    "Whether a fever, infection or a falling count should raise the prophylactic threshold in children is not addressed in the sources read.",
  ],
  cancers: ["childhood-cancers", "all-leukemia", "aml"],
  technologies: ["transfusion-support", "allogeneic-hsct"],
  companies: ["childrens-oncology-group"],
  institutions: ["nice"],
  terms: ["thrombocytopenia", "intrathecal-therapy"],
  sections: ["supportive-care"],
  tags: ["protocol", "paediatric", "transfusion"],
});
