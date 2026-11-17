import { protocol } from "./helpers";

/*
 * Platelet transfusion thresholds for children with cancer: prophylaxis during chemotherapy or after allogeneic
 * transplant, lumbar puncture and other procedures, and bleeding.
 *
 * First written 11 November 2026. Second accuracy pass on 17 November 2026: every source was read again as raw text
 * and every quote checked verbatim by script (whitespace and line breaks only). Copies saved earlier the same day by
 * the checkers of the adult transfusion protocol and the paediatric intrathecal protocol were re-used where noted.
 * - Children's Oncology Group endorsement document for the 2025 AABB and ICTMG international guidelines (version date
 *   26 March 2026; endorsed February 2026), public PDF from the COG supportive care page (pdftotext, full text;
 *   re-used copy). It reprints the recommendations that apply to children. COG lists the 2021 ASCO and 2019 ICTMG
 *   endorsements as archived.
 * - Metcalf et al., Platelet transfusion: 2025 AABB and ICTMG international clinical practice guidelines (JAMA 2025;
 *   334(7):606-617): abstract only, from Europe PMC (re-used copy); jamanetwork.com answered a sibling checker's script
 *   with a browser check the same day. The abstract grades its recommendations in two groups, so the individual grades come from the COG
 *   reprint.
 * - NICE NG24, Blood transfusion: the platelet transfusion chapter, the overview, the inclusions and exclusions
 *   chapter and the update information (HTML, full text; re-used copies). Last updated 26 February 2026; the platelet
 *   recommendations are all dated [2015]. NG24 covers people aged 1 year and over and says its recommendations for
 *   children were extrapolated from adult evidence.
 * - NHS Blood and Transplant bookmark "Transfusion of Blood Components for Infants and Children" (BLC736.1P, updated
 *   November 2020), the public summary of the British Society for Haematology 2016 guideline and its 2020 addendum,
 *   linked from the BSH guideline page: PDF fetched with curl on 17 November 2026 and read with pdftotext. New in this
 *   pass. It supplies the UK thresholds for children, the dose in mL/kg and the central line thresholds, none of which
 *   the first version of this page had.
 * - British Society for Haematology guidelines on transfusion for fetuses, neonates and older children (Br J Haematol
 *   2016;175:784-828, with a 2020 addendum, doi 10.1111/bjh.17109): the publisher returned 403 again and Europe PMC
 *   holds no abstract. Not read; the steps rest on the NHSBT summary, not on it.
 * - A new edition of that guideline was published online on 12 November 2026 (Transfusion Medicine, doi
 *   10.1111/tme.70117; found through Europe PMC and resolved through Crossref). The publisher returned 403 and neither
 *   Europe PMC nor Crossref holds an abstract. Not read.
 * - ASCO platelet transfusion guideline update (J Clin Oncol 2018): abstract only, from Europe PMC (re-used copy).
 * - SaBTO position statement on cytomegalovirus tested blood components (2012): PDF text (re-used copy).
 * The DOIs were resolved through Crossref or Europe PMC and their titles checked. Quotes are copied from the raw text
 * with line breaks joined and nothing else changed. The superscripts in the platelet counts (10 to the power 3 or 9)
 * mangle in the raw text, so no quote carries a count; the counts are given in the prose, read from the same
 * recommendations. 10³/μL (AABB, ICTMG and COG) and 10⁹/L (NICE and the UK summaries) are the same unit.
 */
export const paediatricPlateletTransfusionThresholds = protocol({
  id: "paediatric-platelet-transfusion-thresholds",
  name: "Platelet transfusion thresholds for children with cancer",
  aka: ["paediatric platelet transfusion", "prophylactic platelet transfusion children", "platelet threshold lumbar puncture", "platelet count 10 transfusion"],
  domain: "paediatric",
  tldr: "Chemotherapy can lower platelets, the blood cells that help stop bleeding. A child who is not bleeding is usually given a platelet transfusion only when the count falls below 10, because studies found that transfusing at higher counts probably did not reduce bleeding. Higher counts are used before a lumbar puncture or surgery, for some children with sepsis, and for a child who is bleeding.",
  simple: "Platelets help blood clot. If chemotherapy makes them very low, the child gets a platelet transfusion. The team gives them when the count is very low or before some procedures, not every time it drops.",
  summary: "The 2025 AABB and ICTMG international guidelines (GRADE, 21 randomised trials and 13 observational studies), endorsed by the Children's Oncology Group in February 2026, favour restrictive platelet use. For non-bleeding patients with hypoproliferative thrombocytopenia receiving chemotherapy or undergoing allogeneic stem cell transplant, transfuse at a platelet count below 10 × 10³/μL (strong, moderate); 10³/μL is the same unit as 10⁹/L. Before lumbar puncture, transfuse below 20 × 10³/μL (strong, moderate), recognising an extremely low rate of spinal haematoma. Preterm neonates without major bleeding are transfused below 25 × 10³/μL (strong, high). A good practice statement asks clinicians to weigh symptoms, bleeding history, medicines, values and the whole clinical picture. NICE NG24 (people aged 1 year and over, extrapolated to children from adult evidence) offers prophylaxis below 10 × 10⁹/L, offers platelets for clinically significant (WHO grade 2) bleeding below 30 × 10⁹/L, uses higher thresholds up to 100 for severe or critical-site bleeding, says to consider raising the count above 50 for invasive procedures or surgery (a higher threshold, for example 50 to 75, with a high risk of bleeding, and above 100 for surgery in critical sites), and says not to offer prophylactic platelets for bone marrow aspiration and trephine. The UK summary of the British Society for Haematology 2016 children's guideline (NHS Blood and Transplant, 2020; no grades printed) also uses 10 for most stable children and suggests 20 with sepsis, severe mucositis and some other risks or before a non-tunnelled central line, 40 before lumbar puncture, 50 for moderate haemorrhage or surgery and 75 to 100 for major haemorrhage or surgery at critical sites, with a typical dose of 10 to 20 mL/kg and normally no more than one pack. So the guidelines differ before lumbar puncture (20 against 40) and for bleeding (30 against 50). A new edition of the British guideline, published on 12 November 2026, could not be read. One dose at a time, then reassess the child and recheck the count.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "nurse"],
    where: ["ward", "chemotherapy-day-unit", "outpatient-clinic"],
  },
  population: "Children with cancer who have low platelets because of chemotherapy or allogeneic stem cell transplant (hypoproliferative thrombocytopenia), as the AABB and ICTMG recommendations endorsed by COG for children scope them. NICE NG24 covers people aged 1 year and over and excludes neonates and children under 1 year; preterm neonates have their own AABB and ICTMG threshold. The AABB and ICTMG recommendations on autologous transplant and aplastic anaemia are for adults only. The UK summary excludes immune thrombocytopenia, thrombotic thrombocytopenic purpura, haemolytic uraemic syndrome and heparin-induced thrombocytopenia from its prophylactic threshold, and NICE does not offer routine prophylaxis in chronic bone marrow failure, autoimmune thrombocytopenia, heparin-induced thrombocytopenia or thrombotic thrombocytopenic purpura.",
  trigger: "A child having chemotherapy or after transplant has a low platelet count, is bleeding, or is due for a procedure.",
  steps: [
    {
      action: "Decide on each transfusion with the whole picture in mind: symptoms, signs, other blood tests, bleeding history, medicines, the patient's values and preferences, and other treatments",
      why: "The guideline asks teams to weigh all of these, not the count alone.",
      source: "cog-platelet-2026",
      quote: "Consider symptoms, signs, other laboratory parameters, bleeding history, medications, patients’ values and preferences, alternative therapies, and overall clinical context when deciding to perform a platelet transfusion on a particular patient.",
      grade: "Good practice statement",
    },
    {
      action: "For a child who is not bleeding during chemotherapy or allogeneic transplant, transfuse platelets when the count is below 10 × 10³/μL (10 × 10⁹/L)",
      why: "In the trials, giving fewer platelets probably did not lead to more bleeding or more deaths than giving more. The COG reprint grades this Strong / Moderate. NICE and the UK children's summary use the same count.",
      source: "metcalf-2025",
      quote: "Evidence demonstrated that restrictive transfusion strategies probably did not cause increases in mortality or bleeding relative to liberal strategies across predefined clinical populations.",
      grade: "strong recommendations with high/moderate-certainty evidence",
    },
    {
      action: "Check whether the team uses a higher threshold of 20 × 10⁹/L for a child with sepsis, severe mucositis, laboratory signs of disseminated intravascular coagulation without bleeding, anticoagulant treatment, or a risk of bleeding from local tumour infiltration",
      why: "The UK summary for children suggests this higher count in these situations. The AABB and ICTMG recommendations reprinted by COG, and NICE, name no higher count for them, and no source read names fever on its own.",
      source: "nhsbt-bsh-children-2020",
    },
    {
      action: "Before a lumbar puncture, transfuse if the count is below 20 × 10³/μL (20 × 10⁹/L)",
      why: "Bleeding around the spine after a lumbar puncture with low platelets was found to be very uncommon. The COG reprint grades this Strong / Moderate. The UK summary for children suggests a higher count, 40, and notes that some clinicians use anything from 20 to 50 depending on the clinical situation.",
      source: "metcalf-2025",
      quote: "Exceedingly low incidence of spinal hematoma was identified in patients with thrombocytopenia undergoing lumbar puncture.",
      grade: "strong recommendations with high/moderate-certainty evidence",
    },
    {
      action: "Do not give prophylactic platelets for a bone marrow aspirate and trephine",
      why: "NICE classes it as a procedure with a low risk of bleeding, so platelets are not given just for it.",
      source: "nice-ng24",
      quote: "Do not offer prophylactic platelet transfusions to people having procedures with a low risk of bleeding, such as adults having central venous cannulation or any people having bone marrow aspiration and trephine biopsy.",
    },
    {
      action: "Before a central line is put in, check which threshold the team uses: the UK summary for children suggests transfusing below 20 × 10⁹/L for a non-tunnelled line and below 50 × 10⁹/L for a tunnelled line",
      why: "The other guidelines read give no figure for children: the AABB and ICTMG central line threshold of 10 and NICE's advice not to offer platelets for central venous cannulation are both written for adults.",
      source: "nhsbt-bsh-children-2020",
    },
    {
      action: "For other invasive procedures or surgery, consider raising the count above 50 × 10⁹/L, consider a higher threshold (for example 50 to 75) for a child with a high risk of bleeding, and consider above 100 for surgery in critical sites such as the central nervous system, including the back of the eye",
      why: "NICE says 'consider' for all three, and wrote them for people aged 1 year and over from adult evidence. The UK summary for children suggests below 50 for surgery unless it is minor, and below 75 to 100 for surgery at critical sites.",
      source: "nice-ng24",
    },
    {
      action: "For a child with clinically significant bleeding (WHO grade 2) and a count below 30 × 10⁹/L, transfuse platelets",
      why: "NICE says to offer platelets here. The UK summary for children suggests a higher count, below 50, for moderate bleeding such as bleeding from the gut.",
      source: "nice-ng24",
    },
    {
      action: "For severe bleeding (WHO grade 3 or 4) or bleeding in a critical site such as the central nervous system, including the eyes, use a higher threshold, up to a maximum of 100 × 10⁹/L",
      why: "NICE sets the higher limit for these two situations. The UK summary for children suggests below 75 to 100 for major bleeding or significant bleeding after an operation.",
      source: "nice-ng24",
    },
    {
      action: "Prescribe platelets for a child by weight: a typical volume is 10 to 20 mL/kg, a single pack for a child of 15 kg or more and normally no more than one pack, given at 10 to 20 mL/kg an hour",
      why: "Children vary so much in size that the UK summary gives the volume per kilogram, with one pack as the normal upper limit.",
      source: "nhsbt-bsh-children-2020",
      quote: "Typical transfusion volume 10-20 mL/kg (single pack for children ≥15 kg, normal maximum 1 pack); rate 10-20 mL/kg/hr.",
    },
    {
      action: "Give one dose at a time, then reassess the child and recheck the count before giving more",
      why: "NICE says not to give more than a single dose routinely, and to consider more only for severe thrombocytopenia with bleeding in a critical site.",
      source: "nice-ng24",
      quote: "Reassess the person's clinical condition and check their platelet count after each platelet transfusion, and give further doses if needed.",
    },
  ],
  bestInClass: {
    statement: "For prophylaxis during chemotherapy or allogeneic transplant the guidelines agree: transfuse a non-bleeding child below 10 (AABB and ICTMG 2025, strong, moderate, endorsed by COG for children; NICE NG24, 'offer', for people aged 1 year and over; the UK summary of the British Society for Haematology 2016 guideline, for most stable children). They differ before lumbar puncture: AABB and ICTMG recommend a threshold of 20 × 10³/μL (strong, moderate), on evidence that spinal haematoma is exceedingly rare; the UK summary suggests 40 × 10⁹/L, with no grade printed, and notes that some clinicians use 20 to 50; NICE NG24 names no lumbar puncture threshold and says to consider raising the count above 50 × 10⁹/L for invasive procedures or surgery in general, a 2015 recommendation extrapolated from adults. They also differ for bleeding: NICE offers platelets below 30 for WHO grade 2 bleeding, and the UK summary suggests below 50 for moderate haemorrhage. The 2025 international guideline is the newest that could be read and the one COG endorses for children; a new edition of the British guideline appeared on 12 November 2026 and could not be read.",
    sources: ["cog-platelet-2026", "metcalf-2025", "nice-ng24", "nhsbt-bsh-children-2020"],
  },
  variants: [
    {
      name: "Platelets above 40 before lumbar puncture (UK summary of the British Society for Haematology 2016 guideline)",
      differs: "Suggests transfusing before a lumbar puncture when the count is below 40 × 10⁹/L, rather than only below 20, and says some clinicians transfuse at higher or lower counts (for example 20 to 50) depending on the clinical situation.",
      evidence: "The NHS Blood and Transplant summary prints 'suggested' thresholds without grades; the full 2016 guideline and its 2026 successor could not be read. AABB and ICTMG 2025 give a strong recommendation, moderate certainty, for a threshold of 20 × 10³/μL specifically for lumbar puncture. NICE names no lumbar puncture threshold: its only procedure recommendations are to consider raising the count above 50 × 10⁹/L for invasive procedures or surgery in general, written in 2015 and extrapolated to children from adult evidence.",
      sources: ["nhsbt-bsh-children-2020", "metcalf-2025", "nice-ng24"],
    },
    {
      name: "Prophylactic platelets for children having an autologous transplant (ASCO 2018)",
      differs: "ASCO's 2018 guideline still recommends prophylactic platelets at defined count thresholds for children having an autologous stem cell transplant, while allowing adults at experienced centres to be transfused at the first sign of bleeding instead.",
      evidence: "Read as an abstract, which gives no counts and no grades. The 2025 AABB and ICTMG recommendation against prophylactic platelets after autologous transplant is for adults (conditional, low or very low certainty), so the two do not conflict for children. COG has archived its endorsement of the ASCO guideline.",
      sources: ["asco-2018", "metcalf-2025"],
    },
    {
      name: "Standard leucodepleted platelets, not CMV-negative, after transplant (UK, SaBTO 2012)",
      differs: "In the UK, leucodepleted platelets are considered enough protection against cytomegalovirus (CMV) for children after a stem cell transplant; CMV-negative platelets are kept for transfusions in the womb and for newborn babies up to 28 days after their expected date of delivery.",
      evidence: "A position statement from the UK advisory committee on the safety of blood, with no grades. The thresholds guidelines read here do not address CMV status.",
      sources: ["sabto-cmv-2012"],
    },
  ],
  grades: [
    { claim: "Prophylactic transfusion below 10 × 10³/μL during chemotherapy or allogeneic transplant", grade: "Strong / Moderate", source: "cog-platelet-2026" },
    { claim: "Transfusion below 20 × 10³/μL before lumbar puncture", grade: "Strong / Moderate", source: "cog-platelet-2026" },
    { claim: "Preterm neonates without major bleeding transfused below 25 × 10³/μL", grade: "Strong / High", source: "cog-platelet-2026" },
    { claim: "No prophylactic platelets for non-bleeding adults after autologous transplant or with aplastic anaemia", grade: "conditional recommendations with low/very low-certainty evidence", source: "metcalf-2025", quote: "For hypoproliferative thrombocytopenia in nonbleeding adults undergoing autologous stem cell transplant or with aplastic anemia, prophylactic platelet transfusion is not recommended." },
    { claim: "Prophylactic platelets still recommended for children having an autologous transplant", grade: "not graded in the abstract", source: "asco-2018", quote: "Prophylactic platelet transfusion at defined platelet count thresholds is still recommended for pediatric patients undergoing autologous stem-cell transplantation and for adult and pediatric patients undergoing allogeneic stem-cell transplantation." },
    { claim: "UK thresholds for children: 20 with sepsis and other risks, 40 before lumbar puncture, 50 for moderate haemorrhage or surgery, 75 to 100 for major haemorrhage or surgery at critical sites", grade: "not graded ('suggested transfusion thresholds')", source: "nhsbt-bsh-children-2020" },
    { claim: "CMV-negative platelets not needed in addition to leucodepletion after stem cell transplant", grade: "not graded", source: "sabto-cmv-2012", quote: "CMV seronegative red cells and platelets may be replaced with leucodepleted blood components for adults and children post haemopoeitic stem cell transplantation, for all patient groups including seronegative donor/seronegative recipients." },
  ],
  sources: [
    { key: "cog-platelet-2026", label: "Platelet Transfusion 2025 AABB and ICTMG International Clinical Practice Guidelines (COG endorsement, version date 26 March 2026)", publisher: "Children's Oncology Group", year: 2026, url: "https://childrensoncologygroup.org/wp-content/uploads/2026/07/COG_SC_Platelet_Transfusion_Guideline_Document_26MARCH2026.pdf", gradingScheme: "GRADE, reprinted from the source guideline as strength of recommendation / certainty of evidence (for example Strong / Moderate).", read: "full-text", accessed: "2026-11-17" },
    { key: "metcalf-2025", label: "Platelet Transfusion: 2025 AABB and ICTMG International Clinical Practice Guidelines", publisher: "AABB and the International Collaboration for Transfusion Medicine Guidelines, JAMA", year: 2025, url: "https://europepmc.org/abstract/MED/40440268", doi: "10.1001/jama.2025.7529", gradingScheme: "GRADE: strong or conditional recommendations; certainty high, moderate, low or very low. The abstract grades its recommendations in two groups ('strong recommendations with high/moderate-certainty evidence' and 'conditional recommendations with low/very low-certainty evidence'), not one by one.", read: "abstract", accessed: "2026-11-17" },
    { key: "nice-ng24", label: "Blood transfusion (NG24): platelet transfusion recommendations", publisher: "NICE", year: 2015, url: "https://www.nice.org.uk/guidance/ng24/chapter/Platelet-transfusion", gradingScheme: "NICE does not grade recommendations; the strength is in the wording ('offer', 'consider', 'do not offer'), and each is dated, here [2015]. The guideline was last updated on 26 February 2026 (tranexamic acid during surgery).", read: "full-text", accessed: "2026-11-17" },
    { key: "nhsbt-bsh-children-2020", label: "Transfusion of Blood Components for Infants and Children (bookmark BLC736.1P, updated November 2020): summary of the British Society for Haematology 2016 guideline and 2020 addendum", publisher: "NHS Blood and Transplant", year: 2020, url: "https://nhsbtdbe.blob.core.windows.net/umbraco-assets-corp/21547/blc7361p-nov-2020-infants-and-children-bookmark.pdf", gradingScheme: "A two-page summary; it prints 'suggested transfusion thresholds' and no grades.", read: "public-summary", accessed: "2026-11-17" },
    { key: "bsh-2016", label: "Guidelines on transfusion for fetuses, neonates and older children (with 2020 addendum)", publisher: "British Society for Haematology, British Journal of Haematology", year: 2016, url: "https://doi.org/10.1111/bjh.14233", doi: "10.1111/bjh.14233", read: "not-reachable", accessed: "2026-11-17" },
    { key: "bsh-2026", label: "British Society for Haematology guideline on transfusion for fetuses, neonates and older children (new edition, published online 12 November 2026)", publisher: "British Society for Haematology, Transfusion Medicine", year: 2026, url: "https://doi.org/10.1111/tme.70117", doi: "10.1111/tme.70117", read: "not-reachable", accessed: "2026-11-17" },
    { key: "asco-2018", label: "Platelet Transfusion for Patients With Cancer: American Society of Clinical Oncology Clinical Practice Guideline Update", publisher: "ASCO, Journal of Clinical Oncology", year: 2018, url: "https://europepmc.org/abstract/MED/29182495", doi: "10.1200/JCO.2017.76.1734", gradingScheme: "The abstract prints no grades.", read: "abstract", accessed: "2026-11-17" },
    { key: "sabto-cmv-2012", label: "Cytomegalovirus tested blood components: position statement", publisher: "Advisory Committee on the Safety of Blood, Tissues and Organs (SaBTO), Department of Health", year: 2012, url: "https://www.gov.uk/government/publications/sabto-report-of-the-cytomegalovirus-steering-group", gradingScheme: "A position statement; recommendations are not graded.", read: "full-text", accessed: "2026-11-17" },
  ],
  upgrades: [],
  gaps: [
    "The full text of the 2025 AABB and ICTMG guideline is not open access (jamanetwork.com answered a sibling checker's script with a browser check on 17 November 2026); the recommendations here come from its abstract and the COG endorsement document, which lists only those applicable to children. The abstract grades recommendations in two groups, so each recommendation's own grade is taken from the COG reprint.",
    "A new edition of the British Society for Haematology guideline on transfusion for fetuses, neonates and older children was published online on 12 November 2026 (Transfusion Medicine, doi 10.1111/tme.70117). On 17 November 2026 the publisher returned 403 and neither Europe PMC nor Crossref held an abstract, so it could not be read, and the society's own guideline page still showed the 2016 edition. The UK thresholds and dose on this page come from the NHS Blood and Transplant summary of the 2016 edition and its 2020 addendum and may have changed in the new edition.",
    "The full text of the 2016 British Society for Haematology guideline and its 2020 addendum could not be read either (403 on 17 November 2026). The NHS Blood and Transplant summary prints no grades and does not say how its thresholds apply to a child who is unwell or unstable beyond the situations it lists.",
    "No source read gives a separate platelet threshold for children with brain tumours or with acute promyelocytic leukaemia, and none names fever on its own as a reason to raise the prophylactic threshold; the UK summary names sepsis.",
    "For central line insertion in children the only figures read are the UK summary's suggested thresholds; the AABB and ICTMG threshold of 10 for compressible central venous catheter sites is for adults.",
    "NICE's thresholds for bleeding and for procedures were extrapolated to children from adult evidence, and the UK summary's higher figures carry no grade, so the difference between them (30 against 50 for moderate bleeding) is not settled by the sources read.",
    "Irradiated platelets: the British Society for Haematology's guideline on irradiated blood components (Br J Haematol 2020, doi 10.1111/bjh.17015) returned 403 on 17 November 2026, and no source read says which children need irradiated platelets, so this page does not say.",
    "The ASCO 2018 guideline was read only as an abstract, which gives no thresholds for children. Whether C17, the Canadian children's cancer network, has a current platelet guideline could not be established on 17 November 2026: its site showed no public guideline list and the page tried asked for a login.",
  ],
  cancers: ["childhood-cancers", "all-leukemia", "aml"],
  technologies: ["transfusion-support", "allogeneic-hsct"],
  companies: ["childrens-oncology-group"],
  institutions: ["nice"],
  terms: ["thrombocytopenia", "intrathecal-therapy"],
  sections: ["supportive-care"],
  tags: ["protocol", "paediatric", "transfusion"],
});
