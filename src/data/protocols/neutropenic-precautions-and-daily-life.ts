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
 */
export const neutropenicPrecautionsAndDailyLife = protocol({
  id: "neutropenic-precautions-and-daily-life",
  name: "Protective measures and daily life during neutropenia: hand hygiene, visitors, pets, plants, school and swimming",
  aka: ["neutropenic precautions", "reverse barrier nursing", "protective isolation", "safe living during chemotherapy", "social restrictions for children with cancer", "pets during chemotherapy", "gardening during chemotherapy", "school during chemotherapy"],
  domain: "infection-prevention",
  tldr: "Clean hands, for everyone, matter most. A 2024 guideline for children with cancer says many old restrictions can go: children can keep pets, go to school even when their white count is low, keep plants and swim, unless they have a PICC line. Still avoid building sites and digging in soil, bath toys that hold water, cleaning pet litter or cages, and ill visitors. Transplant units are stricter.",
  simple: "Wash hands often. Children with cancer can usually go to school, keep pets and swim. Stay away from building work and soil. Do not let ill people visit. Ask your team, because transplant patients have extra rules.",
  summary: "For children with cancer on curative treatment as outpatients (not after stem cell transplant), the Dutch Children's Oncology Group guideline (2024, GRADE, endorsed by the Children's Oncology Group in March 2025) makes hand hygiene for patients, carers and staff a strong good practice statement; recommends school or kindergarten attendance irrespective of neutropenia unless a classmate has a serious contagious disease such as varicella (strong, very low); suggests keeping domestic pets (weak, very low) but not letting children clean litter boxes or cages (weak, expert); suggests swimming irrespective of neutropenia (weak, very low) but not with a non-tunnelled line such as a PICC (strong, expert); recommends against reservoir bath toys (strong, very low) and public warm bubble baths (weak); suggests against chlorhexidine bathing or wipes (weak, very low); allows indoor plants (strong, expert); and, following ASCO/IDSA, recommends avoiding prolonged contact with environments high in fungal spores such as construction, demolition, gardening or digging (strong). It advises against crowded places and public transport with neutropenia during viral seasons (weak, expert).\n\nFor HCT recipients the CDC/IDSA/ASBMT guideline (2009) is stricter: no plants or flowers in hospital rooms (DIII), avoid gardening, soil and plants while immunosuppressed (CIII), avoid construction areas, screen visitors and keep symptomatic visitors away (BIII), vaccinate VZV-susceptible contacts (AIII), and do not ask patients to part with pets but avoid reptiles, chicks, exotic and young or ill animals, with someone else changing cat litter.",
  asOf: "2026-11-11",
  setting: {
    who: ["patient-or-carer", "nurse", "doctor", "multidisciplinary-team"],
    where: ["home", "community", "ward", "outpatient-clinic"],
  },
  population: "Children aged 0 to 18 with cancer receiving treatment with curative intent, at home and in outpatient care (the Dutch guideline excludes hospitalised children, palliative care, care after treatment ends and stem cell transplant); and adult and child recipients of haematopoietic cell transplant (the CDC/IDSA/ASBMT guideline). For adults on chemotherapy outside transplant, only the ASCO/IDSA environmental recommendation was read.",
  trigger: "Treatment that can lower the white cell count starts, or a family asks what their child can and cannot do.",
  steps: [
    {
      action: "Make hand hygiene the first measure for the patient, family, visitors and staff, following local protocols",
      why: "Hands carry most of the germs that cause infection at home and on the ward; this matters more than any restriction on activities.",
      source: "dcog-2024",
      quote: "Proper hand hygiene should be performed by patients, caregivers, and medical personnel (STRONG recommendation, GOOD PRACTICE STATEMENT).",
      grade: "STRONG recommendation, GOOD PRACTICE STATEMENT",
    },
    {
      action: "Ask visitors to clean their hands before and after visiting, and keep away anyone with fever, rash, vomiting, diarrhoea, a cold or conjunctivitis",
      why: "Visitors can bring in infections that are mild for them and serious for someone with no white cells.",
      source: "hct-2009",
      quote: "All visitors should be screened for symptoms of infection: fever, rash, vomiting, diarrhea, upper respiratory symptoms, or conjunctivitis, and should not be allowed to visit a HCT recipient while they are symptomatic (BIII).",
      grade: "BIII",
    },
    {
      action: "Vaccinate family members, household contacts and visitors who have not had chickenpox before they have close contact with a transplant recipient",
      why: "Chickenpox can be severe in people with weak immunity; protecting those around them reduces exposure.",
      source: "hct-2009",
      quote: "Health care workers (HCWs), family members, household contacts, and visitors who are healthy and do not have a reported history of varicella infection or who are VZV-seronegative should receive VZV vaccination before being allowed to visit or have direct contact with an HCT recipient (AIII).",
      grade: "AIII",
    },
    {
      action: "Avoid prolonged time near building sites, demolition, house renovation, gardening or digging in soil while neutropenic",
      why: "These places put large amounts of mould spores into the air, which can cause serious lung infection when neutrophils are low.",
      source: "dcog-2024",
      quote: "We recommend that children with cancer and neutropenia should avoid prolonged contact with environments that have high concentrations of fungal spores (i.e., construction or demolition sites, exposure to soil through gardening or digging, household renovation) (STRONG recommendation, ASCO and IDSA guideline [21]).",
      grade: "STRONG recommendation, ASCO and IDSA guideline",
    },
    {
      action: "Let children with cancer go to school or nursery whatever their neutrophil count, unless someone in their class has a serious contagious illness such as chickenpox",
      why: "School matters for a child's life and learning, and the infection risk from attending is small; chickenpox in the class is the exception to discuss with the team.",
      source: "dcog-2024",
      quote: "We recommend allowing children with cancer to attend school or kindergarten irrespective of neutropenia (unless someone in their class or group has a contagious disease with potential severe consequences, e.g., varicella zoster) (STRONG recommendation, VERY LOW quality evidence).",
      grade: "STRONG recommendation, VERY LOW quality evidence",
    },
    {
      action: "Let families keep their pets, but do not let the child clean the litter box or cage",
      why: "Pets help a child's wellbeing and no study found they raise infection; cleaning up after them is the task with the most germs and is easy to hand to someone else.",
      source: "dcog-2024",
      quote: "We suggest allowing to keep domestic pets in the households of children with cancer (WEAK recommendation, VERY LOW quality of evidence).",
      grade: "WEAK recommendation, VERY LOW quality of evidence",
    },
    {
      action: "Allow swimming whatever the neutrophil count, but not with a non-tunnelled line such as a PICC",
      why: "Swimming was not linked to more infection in children with tunnelled lines; a PICC carries a higher infection risk and the panel advises against it.",
      source: "dcog-2024",
      quote: "We strongly believe children with cancer with a non-tunneled central venous catheter such as PICC line should not swim (STRONG recommendation, EXPERT opinion).",
      grade: "STRONG recommendation, EXPERT opinion",
    },
    {
      action: "Do not use bath toys that hold water inside or cannot be dried thoroughly",
      why: "Water trapped inside bath toys grows Pseudomonas, and such toys have been linked to infections and an outbreak on a children's cancer ward.",
      source: "dcog-2024",
      quote: "We recommend against the use of bath toys that have a reservoir (in which water can be retained) or bath toys that cannot be dried thoroughly (STRONG recommendation, VERY LOW quality of evidence).",
      grade: "STRONG recommendation, VERY LOW quality of evidence",
    },
    {
      action: "Do not add chlorhexidine bathing or antiseptic wipes at home to ordinary hygiene",
      why: "Studies in children with cancer did not show it adds anything to normal washing, and it is a burden.",
      source: "dcog-2024",
      quote: "We suggest not to use chlorhexidine bathing or other bath wipes as it does not seem to have an added value to basic hygiene measures (WEAK recommendation, VERY LOW quality of evidence).",
      grade: "WEAK recommendation, VERY LOW quality of evidence",
    },
    {
      action: "Allow indoor flowers and plants at home, changing flower water often and keeping the child away from the soil",
      why: "The risk from having plants in the house is very small, provided the child does not handle the soil.",
      source: "dcog-2024",
      quote: "We strongly believe that indoor flowers or plants at home should be allowed (STRONG recommendation, EXPERT opinion).",
      grade: "STRONG recommendation, EXPERT opinion",
    },
    {
      action: "When neutropenic during a season of high viral infection, avoid crowded places and public transport",
      why: "Crowds at those times raise the chance of catching a respiratory virus; outside those times crowds and public transport are allowed with hand hygiene.",
      source: "dcog-2024",
      quote: "We believe that it is not advisable for children with cancer with neutropenia to use public transport or visit crowded places when there is a higher incidence of viral infections and thereby a higher chance of getting infected (WEAK recommendation, EXPERT opinion).",
      grade: "WEAK recommendation, EXPERT opinion",
    },
    {
      action: "Encourage exercise and sport, avoiding contact sports and activities with a risk of falling while platelets are below 50",
      why: "Exercise helps children through treatment; a low platelet count raises the risk of bleeding from a knock or fall.",
      source: "dcog-2024",
      grade: "WEAK recommendation, EXPERT opinion",
    },
  ],
  bestInClass: {
    statement: "For children with cancer outside transplant, the Dutch Children's Oncology Group guideline (2024), endorsed by the Children's Oncology Group, is the only evidence-graded guideline on daily-life restrictions and sets the standard: hand hygiene first, school regardless of neutropenia, pets, indoor plants and swimming allowed (not with a PICC), and a short list of exposures to avoid (construction and soil, reservoir bath toys, public bubble baths, cleaning litter or cages, crowds during viral seasons when neutropenic). Most of its recommendations rest on very low quality evidence or expert opinion, which the panel says openly. For transplant recipients, the CDC/IDSA/ASBMT guideline (2009) remains the reference and is stricter: no plants or flowers in hospital rooms (DIII), avoiding gardening and soil while immunosuppressed (CIII), visitor screening (BIII) and restrictions on certain animals. The two guidelines differ on plants, and the transplant guideline's restrictions are graded mainly on expert opinion (III).",
    sources: ["dcog-2024", "cog-lifestyles-2025", "hct-2009", "asco-idsa-2018"],
  },
  variants: [
    {
      name: "Stricter rules after stem cell transplant (CDC/IDSA/ASBMT 2009)",
      differs: "No plants or dried or fresh flowers in hospital rooms during conditioning or after transplant; avoid gardening, soil and plants while on immunosuppressive therapy, or wear an N95 mask and gloves if continuing; avoid construction areas; do not adopt young, ill or stray animals, reptiles, chicks or exotic pets; someone other than the patient changes cat litter daily for the first 6 months.",
      evidence: "Graded mainly on expert opinion: plants and flowers in rooms DIII, gardening and soil CIII, reptiles BII, litter boxes BIII; the guideline notes plants and flowers have not conclusively caused mould infection.",
      sources: ["hct-2009"],
    },
    {
      name: "Protective environment rooms and HEPA filtration in transplant units",
      differs: "Transplant centres house patients at highest risk of mould infection in rooms with HEPA-filtered air and, when such rooms run short, use portable HEPA filters; laminar air flow rooms are not recommended for new builds.",
      evidence: "HEPA filtration AIII and room allocation BIII; laminar air flow DII because it has not shown an overall survival benefit.",
      sources: ["hct-2009"],
    },
    {
      name: "Swimming with a tunnelled line",
      differs: "Where Dutch practice previously discouraged it, children with an external tunnelled line may swim if the site and dressing can be cleaned and dried and there is no needle in a port; a tight shirt can hold the line against the body.",
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
    { claim: "Avoid gardening, soil and plants while on immunosuppressive therapy after HCT", grade: "CIII", source: "hct-2009", quote: "Patients should be advised to avoid gardening, soil, and plants while receiving immunosuppressive therapy (CIII)." },
    { claim: "Water-retaining bath toys should not be used by HCT recipients", grade: "DII", source: "hct-2009", quote: "Water-retaining bath toys should not be used by immunocompromised HCT recipients and candidates as they have been associated with an outbreak of Pseudomonas aeruginosa in a pediatric oncology ward (DII)" },
    { claim: "Do not routinely advise HCT recipients to part with their pets", grade: "not graded in the sentence; reptiles BII, juvenile and stray animals BIII", source: "hct-2009", quote: "HCT physicians should advise recipients and candidates undergoing conditioning therapy of the potential infection risks posed by pet ownership; however, they should not routinely advise HCT recipients to part with their pets, with limited exceptions." },
  ],
  sources: [
    { key: "dcog-2024", label: "Less restrictions in daily life: a clinical practice guideline for children with cancer", publisher: "Dutch Children's Oncology Group (DCOG), Supportive Care in Cancer", year: 2024, url: "https://europepmc.org/article/PMC/PMC11162397", doi: "10.1007/s00520-024-08537-9", gradingScheme: "GRADE: STRONG or WEAK recommendation with quality of evidence HIGH to VERY LOW; recommendations worded 'we believe' rest on EXPERT opinion; good practice statements are separate.", read: "full-text", accessed: "2026-11-11" },
    { key: "cog-lifestyles-2025", label: "Less restrictions in daily life for children with cancer (COG endorsement, version date 28 April 2025)", publisher: "Children's Oncology Group", year: 2025, url: "https://childrensoncologygroup.org/wp-content/uploads/2026/05/COG_SC_Lifestyles_Guideline_Document_28APRIL2025-new-logo.pdf", gradingScheme: "Endorses the source guideline's GRADE recommendations and good practice statement; the expert opinion statements are not part of the endorsement table.", read: "full-text", accessed: "2026-11-11" },
    { key: "hct-2009", label: "Guidelines for preventing infectious complications among hematopoietic cell transplantation recipients: a global perspective", publisher: "CDC, IDSA, ASBMT and international partners (Biology of Blood and Marrow Transplantation)", year: 2009, url: "https://europepmc.org/article/PMC/PMC3103296", doi: "10.1016/j.bbmt.2009.06.019", gradingScheme: "Strength A (always offer) to E (never offer); quality of evidence I (randomised trial), II (non-randomised or observational), III (expert opinion); printed together, for example BIII.", read: "full-text", accessed: "2026-11-11" },
    { key: "asco-idsa-2018", label: "Antimicrobial Prophylaxis for Adult Patients With Cancer-Related Immunosuppression: ASCO and IDSA Clinical Practice Guideline Update", publisher: "ASCO and IDSA, Journal of Clinical Oncology", year: 2018, url: "https://europepmc.org/article/MED/30179565", doi: "10.1200/JCO.18.00374", read: "abstract", accessed: "2026-11-11" },
  ],
  upgrades: [],
  gaps: [
    "The COG endorsement covers only the Dutch guideline's GRADE recommendations and good practice statement; the expert opinion statements (litter boxes, plants, crowds, sport, swimming with a PICC) are the Dutch panel's alone.",
    "There is no equivalent graded guideline for adults having chemotherapy outside transplant; the ASCO/IDSA 2018 environmental recommendation was read only in its abstract, which mentions it without its wording or grade.",
    "The CDC/IDSA/ASBMT transplant guideline dates from 2009 and no later edition was found; most of its environmental measures are graded on expert opinion.",
    "Protective isolation in a single room for neutropenic patients outside transplant units is not addressed by either guideline read; NICE CG151 and epic3 were not checked for it.",
    "Masks for patients in public places are mentioned only in the transplant guideline (N95 near construction, CIII), which notes no mask has been tested for reducing mould exposure and surgical masks give negligible protection.",
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
