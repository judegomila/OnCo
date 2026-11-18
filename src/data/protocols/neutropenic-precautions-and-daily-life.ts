import { protocol } from "./helpers";

/*
 * Protective measures during cancer treatment and neutropenia: hand hygiene, visitors, pets, plants, gardening,
 * school, swimming and crowds, for children and transplant recipients, and what the evidence says to stop restricting.
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - Stavleu et al., Less restrictions in daily life: a clinical practice guideline for children with cancer (Dutch
 *   Children's Oncology Group, Support Care Cancer 2024): open access, full text from Europe PMC (PMC11162397).
 * - Children's Oncology Group endorsement of that guideline (version date 28 April 2025): public PDF, full text.
 * - CDC/IDSA/ASBMT and international partners, Guidelines for preventing infectious complications among HCT
 *   recipients (Tomblyn et al., 2009): full text from Europe PMC (PMC3103296).
 * - ASCO/IDSA antimicrobial prophylaxis guideline update (Taplitz et al., J Clin Oncol 2018): abstract only, Europe PMC;
 *   its full text was not read.
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied from the raw text with line breaks
 * joined and nothing else changed; where a sentence ends in a reference list, the quote stops before it.
 *
 * Second accuracy pass, 17 November 2026. The Dutch guideline was fetched again as full-text XML from Europe PMC and its
 * DOI resolved through Crossref; the Children's Oncology Group PDF was fetched again and read with pdftotext; the 2009
 * transplant guideline was read from the Europe PMC full-text XML another checker saved the same day; the ASCO/IDSA 2018
 * record was fetched again from Europe PMC (abstract only, no open copy of the guideline or of its summary is listed).
 * Every quote was matched to the raw text by script, normalising whitespace only. Reasons in `why` that no source
 * states were reworded to the panels' own reasons, orders were softened where the source hedges, the transplant
 * guideline's two grades for gardening and soil (BIII and CIII) are both given, and the sport step was split so that
 * each half carries its own grade. Europe PMC was searched for later editions of each source and none was found.
 */
export const neutropenicPrecautionsAndDailyLife = protocol({
  id: "neutropenic-precautions-and-daily-life",
  name: "Protective measures and daily life during neutropenia: hand hygiene, visitors, pets, plants, school and swimming",
  aka: ["neutropenic precautions", "reverse barrier nursing", "protective isolation", "safe living during chemotherapy", "social restrictions for children with cancer", "pets during chemotherapy", "gardening during chemotherapy", "school during chemotherapy"],
  domain: "infection-prevention",
  tldr: "Clean hands, for everyone, come first. A 2024 guideline for children with cancer says many old restrictions can go: children can keep pets, go to school even when their white count is low, keep plants and swim, but not with a PICC line. It still advises against long spells near building work or digging in soil when the count is low, and bath toys that hold water. Transplant units are stricter.",
  simple: "Wash hands often. Children with cancer can usually go to school, keep pets and swim. When the white count is low, stay away from building work and digging in soil. Ask your team, because transplant patients have extra rules, such as no visitors who are ill.",
  summary: "For children with cancer on curative treatment as outpatients (not after stem cell transplant), the Dutch Children's Oncology Group guideline (2024, GRADE, endorsed by the Children's Oncology Group in March 2025) makes hand hygiene for patients, carers and staff a strong good practice statement; recommends school or kindergarten attendance irrespective of neutropenia unless a classmate has a serious contagious disease such as varicella (strong, very low); suggests keeping domestic pets (weak, very low) but not letting children clean litter boxes or cages (weak, expert); suggests swimming irrespective of neutropenia (weak, very low) but not with a non-tunnelled line such as a PICC (strong, expert); recommends against reservoir bath toys (strong, very low) and public warm bubble baths (weak); suggests against chlorhexidine bathing or wipes (weak, very low); allows indoor plants (strong, expert); and, following ASCO/IDSA, recommends that children with neutropenia avoid prolonged contact with environments high in fungal spores such as construction, demolition, gardening or digging (strong). It encourages exercise and sport (strong, expert) but advises against contact sports and activities with a risk of falling while the platelet count is below 50 × 10⁹/L (weak, expert). It advises against crowded places and public transport with neutropenia during viral seasons (weak, expert).\n\nFor HCT recipients the CDC/IDSA/ASBMT guideline (2009) is stricter: no plants or flowers in hospital rooms (DIII), avoid gardening and direct contact with soil and plants during the first 6 months and while substantially immunosuppressed (BIII in its safe living section, CIII in its Nocardia section), avoid construction or renovation areas whenever possible (AIII), screen visitors and keep symptomatic visitors away (BIII), vaccinate VZV-susceptible contacts (AIII), and do not routinely ask patients to part with pets but avoid reptiles, chicks, exotic and young or ill animals, with someone else cleaning the cat litter.",
  asOf: "2026-11-17",
  setting: {
    who: ["patient-or-carer", "nurse", "doctor", "multidisciplinary-team"],
    where: ["home", "community", "ward", "outpatient-clinic"],
  },
  population: "Children aged 0 to 18 with cancer receiving treatment with curative intent, at home and in outpatient care (the Dutch guideline excludes hospitalised children, palliative care, care after treatment ends and stem cell transplant); and adult and child recipients of haematopoietic cell transplant (the CDC/IDSA/ASBMT guideline). For adults on chemotherapy outside transplant, only the ASCO/IDSA environmental recommendation was read.",
  trigger: "Treatment that can lower the white cell count starts, or a family asks what their child can and cannot do.",
  steps: [
    {
      action: "Make hand hygiene the first measure for the patient, carers and staff, following local protocols",
      why: "The Dutch panel strongly agrees that proper hand hygiene is very important, and several of the freedoms it allows (pets, sandboxes, public transport) depend on it.",
      source: "dcog-2024",
      quote: "Proper hand hygiene should be performed by patients, caregivers, and medical personnel (STRONG recommendation, GOOD PRACTICE STATEMENT).",
      grade: "STRONG recommendation, GOOD PRACTICE STATEMENT",
    },
    {
      action: "On a transplant unit, ask visitors to clean their hands before and after visiting, and keep away anyone with fever, rash, vomiting, diarrhoea, cold symptoms or conjunctivitis",
      why: "The transplant guideline says visitors can bring in communicable infections, by contaminating surroundings or by direct spread.",
      source: "hct-2009",
      quote: "All visitors should be screened for symptoms of infection: fever, rash, vomiting, diarrhea, upper respiratory symptoms, or conjunctivitis, and should not be allowed to visit a HCT recipient while they are symptomatic (BIII).",
      grade: "BIII",
    },
    {
      action: "Vaccinate healthy family members, household contacts and visitors who have no history of chickenpox, or no antibodies to it, before they visit or have direct contact with a transplant recipient",
      why: "The transplant guideline points to the potential seriousness of chickenpox and shingles virus disease in people with weak immunity, and asks that they avoid exposure to it.",
      source: "hct-2009",
      quote: "Health care workers (HCWs), family members, household contacts, and visitors who are healthy and do not have a reported history of varicella infection or who are VZV-seronegative should receive VZV vaccination before being allowed to visit or have direct contact with an HCT recipient (AIII).",
      grade: "AIII",
    },
    {
      action: "Avoid prolonged time near building sites, demolition, house renovation, gardening or digging in soil while neutropenic",
      why: "The panel agreed these places can hold high levels of fungal spores and so could be a danger. The advice is taken from an adult guideline; the panel believes it applies to children too, and it still allows playing in a sandbox with hand hygiene (weak, expert opinion).",
      source: "dcog-2024",
      quote: "We recommend that children with cancer and neutropenia should avoid prolonged contact with environments that have high concentrations of fungal spores (i.e., construction or demolition sites, exposure to soil through gardening or digging, household renovation) (STRONG recommendation, ASCO and IDSA guideline [21]).",
      grade: "STRONG recommendation, ASCO and IDSA guideline",
    },
    {
      action: "Let children with cancer go to school or nursery whatever their neutrophil count, unless someone in their class has a serious contagious illness such as chickenpox",
      why: "The panel judged that school's benefit to a child's development and social life outweighs the harm of possible infections; in the one study it found, restricting social contact was not linked to fewer infections. Chickenpox in the class is the exception to discuss with the team.",
      source: "dcog-2024",
      quote: "We recommend allowing children with cancer to attend school or kindergarten irrespective of neutropenia (unless someone in their class or group has a contagious disease with potential severe consequences, e.g., varicella zoster) (STRONG recommendation, VERY LOW quality evidence).",
      grade: "STRONG recommendation, VERY LOW quality evidence",
    },
    {
      action: "Let families keep their pets, but do not let the child clean the litter box or cage",
      why: "In the one study found, restricting pets at home was not linked to fewer infections, and the panel believes the risk is minimal with hand hygiene after touching a pet. It considers the infection risk higher for cleaning litter boxes and cages, which is easy to avoid (weak, expert opinion).",
      source: "dcog-2024",
      quote: "We suggest allowing to keep domestic pets in the households of children with cancer (WEAK recommendation, VERY LOW quality of evidence).",
      grade: "WEAK recommendation, VERY LOW quality of evidence",
    },
    {
      action: "Allow swimming whatever the neutrophil count, but not with a non-tunnelled line such as a PICC",
      why: "One retrospective study found no significant difference in infections between children who swam and those who did not, and the panel suggests allowing swimming (weak, very low quality evidence). No study looked at non-tunnelled lines; the panel advises against swimming with one because of their higher infection risk.",
      source: "dcog-2024",
      quote: "We strongly believe children with cancer with a non-tunneled central venous catheter such as PICC line should not swim (STRONG recommendation, EXPERT opinion).",
      grade: "STRONG recommendation, EXPERT opinion",
    },
    {
      action: "Do not use bath toys that hold water inside or cannot be dried thoroughly",
      why: "Standing water inside a toy is a reservoir for bacteria such as Pseudomonas aeruginosa; in one study, children infected with it had used bath toys more than children who were not. Toys with no reservoir that can be dried thoroughly can still be used.",
      source: "dcog-2024",
      quote: "We recommend against the use of bath toys that have a reservoir (in which water can be retained) or bath toys that cannot be dried thoroughly (STRONG recommendation, VERY LOW quality of evidence).",
      grade: "STRONG recommendation, VERY LOW quality of evidence",
    },
    {
      action: "Do not add chlorhexidine bathing or other bath wipes to ordinary hygiene",
      why: "Studies in children with cancer gave inconsistent results; the panel sees no added value over basic hygiene and considers it more of a burden to the child.",
      source: "dcog-2024",
      quote: "We suggest not to use chlorhexidine bathing or other bath wipes as it does not seem to have an added value to basic hygiene measures (WEAK recommendation, VERY LOW quality of evidence).",
      grade: "WEAK recommendation, VERY LOW quality of evidence",
    },
    {
      action: "Allow indoor flowers and plants at home, changing flower water often and keeping the child away from the soil",
      why: "The panel believes the infection risk from simply having plants or flowers in the house is very small; it suggests the child does not play with the soil or help clean it.",
      source: "dcog-2024",
      quote: "We strongly believe that indoor flowers or plants at home should be allowed (STRONG recommendation, EXPERT opinion).",
      grade: "STRONG recommendation, EXPERT opinion",
    },
    {
      action: "When neutropenic during a season of high viral infection, avoid crowded places and public transport",
      why: "The chance of catching a viral infection is higher in those months, and it can mean a hospital admission for fever or a delay to chemotherapy. Otherwise the panel allows public transport and crowded places, with hand hygiene (weak, expert opinion).",
      source: "dcog-2024",
      quote: "We believe that it is not advisable for children with cancer with neutropenia to use public transport or visit crowded places when there is a higher incidence of viral infections and thereby a higher chance of getting infected (WEAK recommendation, EXPERT opinion).",
      grade: "WEAK recommendation, EXPERT opinion",
    },
    {
      action: "Encourage exercise and sport",
      why: "The panel says physical activity greatly benefits a child's physical state and quality of life.",
      source: "dcog-2024",
      quote: "We strongly believe that children with cancer should be encouraged to exercise and perform sports (STRONG recommendation, EXPERT opinion).",
      grade: "STRONG recommendation, EXPERT opinion",
    },
    {
      action: "Avoid contact sports, high-impact or high-speed activities and activities with a risk of falling while the platelet count is below 50 × 10⁹/L",
      why: "The panel judges the risk of bleeding in these activities too high when platelets are low, and suggests encouraging activities that are safe instead.",
      source: "dcog-2024",
      grade: "WEAK recommendation, EXPERT opinion",
    },
  ],
  bestInClass: {
    statement: "For children with cancer outside transplant, the Dutch Children's Oncology Group guideline (2024), endorsed by the Children's Oncology Group, is, to its authors' knowledge, the first guideline to cover this broad topic, and no other graded guideline on daily-life restrictions was found for this page: hand hygiene first, school regardless of neutropenia, pets, indoor plants and swimming allowed (not with a PICC), and a short list of exposures to avoid (construction and soil, reservoir bath toys, public bubble baths, cleaning litter or cages, crowds during viral seasons when neutropenic). Most of its recommendations rest on very low quality evidence or expert opinion, which the panel says openly. For transplant recipients, the CDC/IDSA/ASBMT guideline (2009) remains the reference and is stricter: no plants or flowers in hospital rooms (DIII), avoiding gardening and soil in the first 6 months and while substantially immunosuppressed (BIII in one section, CIII in another), visitor screening (BIII) and restrictions on certain animals. The two guidelines differ on plants (allowed at home for children outside transplant, not allowed in transplant hospital rooms), and the transplant guideline's restrictions are graded mainly on expert opinion (III).",
    sources: ["dcog-2024", "cog-lifestyles-2025", "hct-2009", "asco-idsa-2018"],
  },
  variants: [
    {
      name: "Stricter rules after stem cell transplant (CDC/IDSA/ASBMT 2009)",
      differs: "No plants or dried or fresh flowers in hospital rooms during conditioning or after transplant; avoid gardening, soil and plants during the first 6 months after transplant and while on immunosuppressive therapy (those who wish to continue gardening may reduce exposure with gloves and a mask such as an N95); avoid construction or renovation areas whenever possible; do not adopt young, ill or stray animals, and avoid reptiles, ducklings, chicks and exotic pets; someone other than the patient cleans the cat litter daily for the first 6 months and during periods of substantial immunosuppression; spend as little time as possible in crowded areas while immunocompromised.",
      evidence: "Graded mainly on expert opinion: plants and flowers in rooms DIII, gardening and soil BIII in the safe living section and CIII in the Nocardia section (protective gear for those who continue CIII), construction or renovation areas AIII, reptiles and exotic pets BII, ducklings and chicks BIII, litter boxes BIII, crowded areas BIII; the guideline notes plants and flowers have not conclusively caused mould infection, and that how well gloves and masks protect against soil-borne infection is unknown.",
      sources: ["hct-2009"],
    },
    {
      name: "Protective environment rooms and HEPA filtration in transplant units",
      differs: "Transplant recipients should ideally be placed in protective environment rooms with HEPA-filtered air; when there are too few, the rooms go first to those at highest risk of invasive mould infection and portable HEPA filters may be used in other rooms; laminar air flow rooms are not recommended for new builds.",
      evidence: "HEPA filtration AIII, room allocation BIII and portable filters BIII; laminar air flow DII because routine use has not been shown to give a substantial overall survival benefit.",
      sources: ["hct-2009"],
    },
    {
      name: "Swimming with a tunnelled line",
      differs: "Where Dutch practice previously discouraged it, children with an external tunnelled line may swim if the site and dressing can be cleaned and dried thoroughly and there is no needle in a port and no sign of infection; a tight shirt can hold the line against the body.",
      evidence: "One retrospective cohort found no significant difference in infection between swimmers and non-swimmers; the recommendation is weak, very low quality.",
      sources: ["dcog-2024"],
    },
  ],
  grades: [
    { claim: "Hand hygiene by patients, carers and staff", grade: "STRONG recommendation, GOOD PRACTICE STATEMENT", source: "dcog-2024" },
    { claim: "School or kindergarten irrespective of neutropenia", grade: "STRONG recommendation, VERY LOW quality evidence", source: "dcog-2024" },
    { claim: "Avoid environments high in fungal spores when neutropenic", grade: "STRONG recommendation, ASCO and IDSA guideline", source: "dcog-2024" },
    { claim: "Keep domestic pets", grade: "WEAK recommendation, VERY LOW quality of evidence", source: "dcog-2024" },
    { claim: "No plants or flowers in hospital rooms after HCT", grade: "DIII", source: "hct-2009" },
    { claim: "Avoid gardening, soil and plants while on immunosuppressive therapy after HCT (Nocardia section)", grade: "CIII", source: "hct-2009", quote: "Patients should be advised to avoid gardening, soil, and plants while receiving immunosuppressive therapy (CIII)." },
    { claim: "Avoid gardening or direct contact with soil and plants in the first 6 months after HCT and during substantial immunosuppression (safe living section)", grade: "BIII", source: "hct-2009" },
    { claim: "HCT recipients avoid construction or renovation areas whenever possible", grade: "AIII", source: "hct-2009", quote: "Whenever possible, HCT recipients should avoid construction or renovation areas (AIII)" },
    { claim: "Encourage exercise and sport", grade: "STRONG recommendation, EXPERT opinion", source: "dcog-2024" },
    { claim: "Water-retaining bath toys should not be used by HCT recipients", grade: "DII", source: "hct-2009", quote: "Water-retaining bath toys should not be used by immunocompromised HCT recipients and candidates as they have been associated with an outbreak of Pseudomonas aeruginosa in a pediatric oncology ward (DII)" },
    { claim: "Do not routinely advise HCT recipients to part with their pets", grade: "not graded in the sentence; reptiles BII, ill or juvenile pets and stray animals BIII", source: "hct-2009", quote: "HCT physicians should advise recipients and candidates undergoing conditioning therapy of the potential infection risks posed by pet ownership; however, they should not routinely advise HCT recipients to part with their pets, with limited exceptions." },
  ],
  sources: [
    { key: "dcog-2024", label: "Less restrictions in daily life: a clinical practice guideline for children with cancer", publisher: "Dutch Children's Oncology Group (DCOG), Supportive Care in Cancer", year: 2024, url: "https://europepmc.org/article/PMC/PMC11162397", doi: "10.1007/s00520-024-08537-9", gradingScheme: "GRADE: STRONG or WEAK recommendation with quality of evidence HIGH to VERY LOW; recommendations worded 'we believe' rest on EXPERT opinion; good practice statements are separate.", read: "full-text", accessed: "2026-11-17" },
    { key: "cog-lifestyles-2025", label: "Less restrictions in daily life for children with cancer (COG endorsement, version date 28 April 2025)", publisher: "Children's Oncology Group", year: 2025, url: "https://childrensoncologygroup.org/wp-content/uploads/2026/05/COG_SC_Lifestyles_Guideline_Document_28APRIL2025-new-logo.pdf", gradingScheme: "Endorses the source guideline's GRADE recommendations and good practice statement; the expert opinion statements are not part of the endorsement table.", read: "full-text", accessed: "2026-11-17" },
    { key: "hct-2009", label: "Guidelines for preventing infectious complications among hematopoietic cell transplantation recipients: a global perspective", publisher: "CDC, IDSA, ASBMT and international partners (Biology of Blood and Marrow Transplantation)", year: 2009, url: "https://europepmc.org/article/PMC/PMC3103296", doi: "10.1016/j.bbmt.2009.06.019", gradingScheme: "Strength A (always offer) to E (never offer); quality of evidence I (randomised trial), II (non-randomised or observational), III (expert opinion); printed together, for example BIII.", read: "full-text", accessed: "2026-11-17" },
    { key: "asco-idsa-2018", label: "Antimicrobial Prophylaxis for Adult Patients With Cancer-Related Immunosuppression: ASCO and IDSA Clinical Practice Guideline Update", publisher: "ASCO and IDSA, Journal of Clinical Oncology", year: 2018, url: "https://europepmc.org/article/MED/30179565", doi: "10.1200/JCO.18.00374", read: "abstract", accessed: "2026-11-17" },
  ],
  upgrades: [],
  gaps: [
    "The COG endorsement covers only the Dutch guideline's GRADE recommendations and good practice statement; the expert opinion statements (litter boxes, plants, crowds, sport, swimming with a PICC) are the Dutch panel's alone.",
    "No equivalent graded guideline for adults having chemotherapy outside transplant was found for this page. The ASCO/IDSA 2018 environmental recommendation was read only in its abstract, which mentions it without its wording or grade; on 17 November 2026 Europe PMC listed no open copy of the guideline or of its summary, so the wording used here is the Dutch guideline's restatement of it. The Children's Oncology Group endorsement table does not include that recommendation.",
    "The CDC/IDSA/ASBMT transplant guideline dates from 2009; a Europe PMC search on 17 November 2026 found no later edition. An erratum to it (Biology of Blood and Marrow Transplantation, February 2010) is listed and was not read. Most of its environmental measures are graded on expert opinion, and it grades avoiding gardening and soil BIII in one section and CIII in another.",
    "The Dutch guideline gives a neutrophil figure for neutropenia (below 0.5 × 10⁹/L) only in its recommendation on flying and diving; its school, swimming, crowd and fungal spore recommendations say neutropenia without a figure. Its panel notes that some recommendations may need adjusting for other countries and for the individual child.",
    "Protective isolation in a single room for neutropenic patients outside transplant units is not addressed by either guideline read; NICE CG151 and epic3 were not checked for it.",
    "Masks for patients in public places are mentioned only in the transplant guideline (recipients may benefit from an N95 respirator outside HEPA-filtered areas, especially during hospital construction, CIII), which notes no mask has been tested for reducing patients' mould exposure in construction areas and that standard surgical masks give negligible protection against mould spores.",
  ],
  institutions: ["asco"],
  companies: ["childrens-oncology-group"],
  cancers: ["childhood-cancers"],
  technologies: ["allogeneic-hsct", "picc-lines"],
  terms: ["neutropenia", "febrile-neutropenia", "thrombocytopenia"],
  related: ["central-line-maintenance-bundle", "food-safety-and-neutropenic-diet"],
  sections: ["supportive-care"],
  tags: ["protocol", "neutropenic-precautions", "paediatric", "safe-living"],
});
