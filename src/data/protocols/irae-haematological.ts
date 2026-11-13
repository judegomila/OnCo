import { protocol } from "./helpers";
import { ASCO_ICI_2021, ESMO_GAP, ESMO_ICI_2022, SITC_ICI_2021 } from "./irae-sources";

/*
 * Blood side effects of checkpoint inhibitors: immune thrombocytopenia, autoimmune haemolytic anaemia, neutropenia,
 * aplastic anaemia, pure red cell aplasia and haemophagocytic lymphohistiocytosis.
 *
 * What was read, and how: SITC 2021 (full text, haematological section and recommendations), as described in
 * ./irae-sources.ts. ASCO 2021 abstract only; ESMO 2022 not reachable. No haematology-society guideline specific to
 * checkpoint inhibitor cytopenias was found in a Europe PMC search of 2023 to 2026 guidelines and consensus statements
 * on immune-related adverse events. Quotes checked by script against the raw text on 11 November 2026.
 */
export const iraeHaematological = protocol({
  id: "irae-haematological",
  name: "Blood side effects of checkpoint inhibitors: low platelets, haemolysis, neutropenia and marrow failure",
  aka: ["haematological irAEs", "hematologic immune-related adverse events", "checkpoint inhibitor immune thrombocytopenia", "ICI-related ITP", "checkpoint inhibitor haemolytic anaemia", "immune-related neutropenia", "checkpoint inhibitor aplastic anaemia", "ICI-related HLH"],
  domain: "immunotherapy-toxicity",
  tldr: "Rarely, immunotherapy makes the immune system attack blood cells, causing low platelets (easy bruising or bleeding), destruction of red cells (tiredness, breathlessness, yellow skin, dark urine) or low white cells (infections). These are found on blood tests and treated with steroids and other medicines, usually with a haematologist involved.",
  simple: "Very rarely, immunotherapy can lower your blood counts. Tell your team about unusual bruising or bleeding, yellow skin or dark urine, or a fever.",
  summary: "Uncommon (under 1% in one series of 745 patients on PD-(L)1 inhibitors) but potentially life-threatening (SITC 2021). The commonest are immune thrombocytopenia (median onset 41 days) and autoimmune haemolytic anaemia (median 50 days, more frequent on PD-(L)1 than CTLA-4 inhibitors). Neutropenia appears at a median of 10.5 weeks; aplastic anaemia is rare, hard to treat and often does not resolve; HLH (median 26 days) is the most dangerous. In a small series, 43% of patients rechallenged after a haematological irAE had a recurrence.\n\nSITC 2021: work up each with a blood count, film and the relevant tests (clotting and LDH for thrombocytopenia; reticulocytes, Coombs test, LDH and ADAMTS13 for haemolysis; ferritin and soluble IL-2 receptor for HLH), separate immune causes from chemotherapy, and treat by haematological standard of care: prednisone 1 mg/kg for ITP (LE: 1) with IVIG for severe ITP (LE: 1) and rituximab as an option (LE: 2); prednisone 1 mg/kg for haemolysis (LE: 3) with IVIG if refractory (LE: 3); prednisone with G-CSF for immune neutropenia (LE: 3); ciclosporin or ATG for aplastic anaemia (LE: 4); steroids with etoposide or tocilizumab for HLH, under haematology (LE: 3). ASCO 2021 (abstract) makes haematological toxicity an exception to continuing treatment at grade 1.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "nurse", "patient-or-carer", "multidisciplinary-team"],
    where: ["outpatient-clinic", "chemotherapy-day-unit", "acute-oncology-service", "ward"],
  },
  population: "Adults receiving or who have received an immune checkpoint inhibitor, alone or with chemotherapy, whose blood counts fall without another explanation. People with haematological cancers or pre-existing autoimmunity have more causes of low counts to exclude. Children are not addressed by this source.",
  trigger: "A new fall in platelets, haemoglobin or neutrophils, a positive Coombs test, signs of haemolysis, bruising or bleeding, or unexplained fever with cytopenias and a high ferritin, during or after checkpoint inhibitor treatment.",
  steps: [
    {
      action: "Record a baseline platelet count before immunotherapy and watch for falls below it",
      why: "Cancer and other treatments often lower platelets, so a baseline makes a new immune drop easier to see.",
      source: "sitc-2021",
      quote: "Because patients may already be experiencing thrombocytopenia as a result of cancer or due to a number of oncological treatment regimens, it may be prudent to establish a baseline platelet count and monitor for additional drops below this value when beginning ICI therapy.",
    },
    {
      action: "For possible immune thrombocytopenia, send a full blood count with differential, a blood film, clotting tests (PT, PTT, fibrinogen, D-dimer) and LDH",
      why: "These separate immune destruction from clotting disorders such as DIC.",
      source: "sitc-2021",
      quote: "Diagnostic workup for patients with possible ICI-related ITP should include CBC with differential, blood smear evaluation, DIC labs (PT/partial thromboplastin time (PTT)/fibrinogen/d-dimer), and LDH.",
    },
    {
      action: "Treat immune thrombocytopenia as a haematologist would, typically with prednisone 1 mg/kg",
      why: "Steroids stop the immune system destroying platelets.",
      source: "sitc-2021",
      quote: "For patients with ICI-related ITP, treatment should follow hematological standard of care. Typically, this includes steroids (prednisone dose of 1 mg/kg oral or equivalent",
      grade: "LE: 1",
    },
    {
      action: "For possible haemolysis, send reticulocytes, a blood film, a direct antiglobulin (Coombs) test, LDH and ADAMTS13",
      why: "These confirm red cells are being destroyed and exclude a clotting-related cause that needs different treatment.",
      source: "sitc-2021",
      quote: "Diagnostic workup for patients with possible ICI-related HA should include CBC with differential, reticulocyte count, blood smear evaluation, direct antiglobulin test (Coomb’s), and LDH with ADAMTS13 level.",
    },
    {
      action: "Treat autoimmune haemolytic anaemia with prednisone 1 mg/kg, adding IVIG if it does not respond",
      why: "Steroids are the standard first treatment for immune haemolysis.",
      source: "sitc-2021",
      quote: "For patients with ICI-related AIHA, treatment should follow hematological standard of care. Typically, this includes steroids (prednisone dose of 1 mg/kg oral or equivalent)",
      grade: "LE: 3",
    },
    {
      action: "In patients on chemotherapy with immunotherapy, distinguish immune neutropenia from chemotherapy marrow suppression",
      why: "The treatments differ: immune neutropenia needs steroids, chemotherapy neutropenia does not.",
      source: "sitc-2021",
      quote: "For patients being treated with chemo-immunotherapy who develop neutropenia, it is important to differentiate between immune-related neutropenia and chemotherapy-induced myelosuppression.",
    },
    {
      action: "Treat immune neutropenia with prednisone 1 mg/kg and G-CSF",
      why: "Steroids stop the immune attack and G-CSF lifts the white cell count to lower infection risk.",
      source: "sitc-2021",
      quote: "For patients with immune-related neutropenia, treatment should follow hematological standard of care. Typically, this includes steroids (prednisone 1 mg/kg oral or equivalent) with G-CSF",
      grade: "LE: 3",
    },
    {
      action: "For aplastic anaemia, add an immunosuppressant beyond steroids such as ciclosporin, and consider ATG",
      why: "Immune marrow failure rarely responds to steroids alone.",
      source: "sitc-2021",
      quote: "For patients with ICI-related AA, additional immunosuppressive therapies beyond steroids should be used, such as cyclosporine.",
      grade: "LE: 4",
    },
    {
      action: "Suspect HLH early, send ferritin and soluble IL-2 receptor, and involve a haematologist",
      why: "HLH is life-threatening and needs specialist treatment such as etoposide or tocilizumab with steroids.",
      source: "sitc-2021",
      quote: "Diagnostic workup for patients with possible ICI-related HLH should include CBC with differential, blood smear evaluation, ferritin, and soluble IL-2 receptor. Because this condition is life-threatening, it should be suspected when symptoms arise and warrants early consultation with a specialist.",
    },
  ],
  bestInClass: {
    statement: "SITC 2021 is the only guideline read in full with a haematological section, and its rule is to treat each condition by the haematological standard of care for the same disease without immunotherapy: prednisone 1 mg/kg for immune thrombocytopenia (LE: 1) with IVIG for severe cases (LE: 1) and rituximab as an option (LE: 2); prednisone 1 mg/kg for haemolysis (LE: 3) with IVIG if refractory (LE: 3); prednisone with G-CSF for immune neutropenia (LE: 3); ciclosporin or ATG for aplastic anaemia (LE: 4); and steroids with etoposide or tocilizumab for HLH (LE: 3). The higher grades come from the evidence in the non-immunotherapy diseases. ASCO 2021 (abstract) agrees that haematological toxicity is an exception to continuing treatment at grade 1. ESMO 2022 could not be read.",
    sources: ["sitc-2021", "asco-2021", "esmo-2022"],
  },
  variants: [],
  grades: [
    { claim: "Immune thrombocytopenia: prednisone 1 mg/kg", grade: "LE: 1", source: "sitc-2021" },
    { claim: "Severe immune thrombocytopenia: IVIG 0.5 g/kg/day for 5 days with steroids; rituximab may be considered", grade: "LE: 1 (IVIG); LE: 2 (rituximab)", source: "sitc-2021" },
    { claim: "Autoimmune haemolytic anaemia: prednisone 1 mg/kg; IVIG if steroid-refractory", grade: "LE: 3", source: "sitc-2021", quote: "For patients with severe ICI-related AIHA that do not respond to steroids, IVIG (0.5 g/kg/day for 5 days)" },
    { claim: "Immune neutropenia: prednisone 1 mg/kg with G-CSF", grade: "LE: 3", source: "sitc-2021" },
    { claim: "Aplastic anaemia: ciclosporin; ATG may be considered", grade: "LE: 4", source: "sitc-2021" },
    { claim: "HLH: steroids and immunosuppressives such as etoposide or tocilizumab, with haematology", grade: "LE: 3", source: "sitc-2021", quote: "For patients with ICI-related secondary HLH, hematological consultation is required as this is a challenging condition to manage. Standard of care treatment typically involves steroids and immunosuppressives, such as etoposide or tocilizumab" },
    { claim: "Haematological toxicity is an exception to continuing treatment at grade 1", grade: "expert consensus", source: "asco-2021" },
  ],
  sources: [SITC_ICI_2021, ASCO_ICI_2021, ESMO_ICI_2022],
  upgrades: [],
  gaps: [
    ESMO_GAP,
    "The ASCO 2021 guideline was read only as its abstract and its haematological table is not compared here.",
    "Only one guideline with a haematological section could be read; the steps rest on SITC 2021 alone, and no second guideline is compared.",
    "Whether and when to restart a checkpoint inhibitor after a haematological irAE is not addressed beyond SITC's note that 3 of 7 rechallenged patients in one series had a recurrence.",
    "This protocol does not cover haematological toxicity after CAR T-cell therapy, which has its own grading (ICAHT).",
  ],
  drugs: ["pembrolizumab", "nivolumab", "ipilimumab", "atezolizumab", "durvalumab", "cemiplimab", "tremelimumab", "avelumab", "dostarlimab", "prednisone", "human-normal-immunoglobulin", "rituximab", "etoposide", "tocilizumab"],
  technologies: ["checkpoint-inhibitor"],
  institutions: ["sitc", "asco", "esmo"],
  terms: ["irae", "thrombocytopenia"],
  keyPapers: ["paper-asco-irae-guideline-jco-2021"],
  related: ["irae-rechallenge"],
  tags: ["protocol", "irae", "haematology"],
});
