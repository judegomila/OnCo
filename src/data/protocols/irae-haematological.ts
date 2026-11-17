import { protocol } from "./helpers";
import { ASCO_GAP, ASCO_ICI_2021, ESMO_GAP, ESMO_ICI_2022, SITC_ICI_2021 } from "./irae-sources";

/*
 * Blood side effects of checkpoint inhibitors: immune thrombocytopenia, autoimmune haemolytic anaemia, neutropenia,
 * aplastic anaemia, pure red cell aplasia and haemophagocytic lymphohistiocytosis.
 *
 * What was read, and how: SITC 2021 (full text, general recommendations, haematological section and its
 * recommendations), as described in ./irae-sources.ts. ASCO 2021 abstract only; ESMO 2022 not reachable.
 *
 * Second accuracy pass, 17 November 2026. Every claim was re-read against raw text. SITC 2021 and the ASCO 2021
 * abstract were re-read from the copies another checker saved from Europe PMC late on 16 November 2026 (full-text XML
 * of PMC8237720 and the core record for the ASCO DOI); those copies were re-used, not fetched again. The SITC
 * reference list was read to see which paper each LE grade cites. Two patient pages were fetched with curl on
 * 17 November 2026 and read as tag-stripped text: Macmillan and Cancer Research UK on pembrolizumab. A Europe PMC
 * title search on 17 November 2026 for a guideline, consensus or position paper on haematological toxicity of
 * checkpoint inhibitors (2021 to 2026) returned nothing, and a wider search of 2023 to 2026 guideline titles found no
 * newer SITC, ASCO or ESMO edition. Quotes checked by script against the raw text on 17 November 2026 (tags and
 * citation-number links stripped, white space normalised, nothing else).
 */
export const iraeHaematological = protocol({
  id: "irae-haematological",
  name: "Blood side effects of checkpoint inhibitors: low platelets, haemolysis, neutropenia and marrow failure",
  aka: ["haematological irAEs", "hematologic immune-related adverse events", "checkpoint inhibitor immune thrombocytopenia", "ICI-related ITP", "checkpoint inhibitor haemolytic anaemia", "immune-related neutropenia", "checkpoint inhibitor aplastic anaemia", "ICI-related HLH"],
  domain: "immunotherapy-toxicity",
  tldr: "Uncommonly, checkpoint inhibitor immunotherapy causes immune-related blood problems: low platelets (bruising or bleeding), breakdown of red cells (yellow skin or eyes, dark urine, a high temperature) or low white cells (infection risk). Blood tests find them. Treatment typically includes steroids, and a blood specialist may be involved. Report unexplained bruising or bleeding straight away.",
  simple: "Uncommonly, immunotherapy can lower your blood counts. Contact your hospital's 24-hour number straight away about unexplained bruising or bleeding, yellow skin or eyes, dark urine, or a temperature above 37.5°C.",
  summary: "Uncommon (under 1% in one study of 745 patients on PD-(L)1 inhibitors) but potentially life-threatening (SITC 2021). The commonest are thrombocytopenia (immune thrombocytopenia, median onset 41 days) and haemolytic anaemia (median 50 days; the risk appears greater on PD-(L)1 than CTLA-4 inhibitors). Neutropenia appears at a median of 10.5 weeks and pure red cell aplasia at a median of 89 days. Aplastic anaemia has a low rate of resolution and is frequently difficult to treat. HLH (median 26 days, more common on CTLA-4 inhibitors) is life-threatening. Most haematological events resolve to below grade 2 after a median of 2 to 9 weeks. In a small group re-challenged after a haematological event (7 patients), 43% had a recurrence.\n\nSITC 2021: work up each with a blood count with differential, a film and the relevant tests (clotting tests and LDH for thrombocytopenia; reticulocytes, Coombs test, LDH and ADAMTS13 for haemolysis; reticulocytes for marrow failure; ferritin and soluble IL-2 receptor for HLH), and tell immune neutropenia from chemotherapy marrow suppression. Treatment should follow haematological standard of care, which typically includes: prednisone 1 mg/kg for ITP (LE: 1), with IVIG 0.5 g/kg/day for 5 days added for severe ITP (LE: 1) and rituximab as an option (LE: 2); prednisone 1 mg/kg for haemolysis (LE: 3), with the same IVIG course added for severe haemolysis that does not respond to steroids (LE: 3); prednisone 1 mg/kg with G-CSF for immune neutropenia (LE: 3); steroids for pure red cell aplasia (LE: 3); an immunosuppressant beyond steroids such as ciclosporin for aplastic anaemia (no grade printed), with ATG as an option (LE: 4); steroids and immunosuppressives such as etoposide or tocilizumab for HLH, with a haematologist (LE: 3). SITC gives no platelet or haemoglobin threshold for any of these.\n\nStopping the checkpoint inhibitor: SITC's haematological section states no rule of its own and says its recommendations sit within SITC's general framework, which is to withhold treatment temporarily at grade 2 and to make re-challenge after a grade 3 or 4 event a risk-adjusted decision (LE: 3). The ASCO 2021 abstract says that, in general, treatment continues with close monitoring at grade 1, except for some neurological, haematological and cardiac toxicities; it does not say which haematological ones.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "nurse", "patient-or-carer", "multidisciplinary-team"],
    where: ["outpatient-clinic", "chemotherapy-day-unit", "acute-oncology-service", "ward"],
  },
  population: "People receiving or who have received an immune checkpoint inhibitor, alone or with chemotherapy, whose blood counts fall. SITC lists other causes of a low platelet count to keep in mind: the cancer itself, chemotherapy, other medicines, DIC, radiotherapy, some infections and pre-existing autoimmunity, particularly in people with haematological cancers. SITC 2021 states no age range and makes no recommendation for children.",
  trigger: "A new fall in platelets, haemoglobin or neutrophils, a positive Coombs test, signs of haemolysis, bruising or bleeding, or fever with low blood counts and a very high ferritin, during or after checkpoint inhibitor treatment.",
  steps: [
    {
      action: "Consider recording a baseline platelet count when immunotherapy starts and watching for falls below it",
      why: "Cancer and several cancer treatments can already lower platelets, so SITC says a baseline may be prudent.",
      source: "sitc-2021",
      quote: "Because patients may already be experiencing thrombocytopenia as a result of cancer or due to a number of oncological treatment regimens, it may be prudent to establish a baseline platelet count and monitor for additional drops below this value when beginning ICI therapy.",
    },
    {
      action: "Tell patients to contact the hospital's 24-hour number straight away about unexplained bruising or bleeding",
      why: "A low platelet count can show itself as easy bruising, nosebleeds, bleeding gums or blood in urine or stools. This is Macmillan's advice for pembrolizumab, one checkpoint inhibitor.",
      source: "macmillan-pembrolizumab",
      quote: "If you have any unexplained bruising or bleeding, contact the hospital straight away on the 24-hour number.",
    },
    {
      action: "At grade 2, withhold the checkpoint inhibitor temporarily",
      why: "This is SITC's general rule for immune side effects. Its blood section says it works within that rule and prints no exception to it.",
      source: "sitc-2021",
      quote: "Unless otherwise specified, patients experiencing grade 2 irAEs should have ICI therapy temporarily withheld and be treated with corticosteroids depending on the toxicity in question.",
    },
    {
      action: "For possible immune thrombocytopenia, send a full blood count with differential, a blood film, clotting tests (PT, PTT, fibrinogen, D-dimer) and LDH",
      why: "These are the tests SITC lists. The clotting tests are the ones used to look for DIC, another cause of low platelets.",
      source: "sitc-2021",
      quote: "Diagnostic workup for patients with possible ICI-related ITP should include CBC with differential, blood smear evaluation, DIC labs (PT/partial thromboplastin time (PTT)/fibrinogen/d-dimer), and LDH.",
    },
    {
      action: "Treat immune thrombocytopenia by haematological standard of care, typically steroids (prednisone 1 mg/kg by mouth or equivalent)",
      why: "SITC says to treat it as the same blood condition is usually treated, and that this typically includes steroids.",
      source: "sitc-2021",
      quote: "For patients with ICI-related ITP, treatment should follow hematological standard of care. Typically, this includes steroids (prednisone dose of 1 mg/kg oral or equivalent",
      grade: "LE: 1",
    },
    {
      action: "For severe immune thrombocytopenia, give IVIG 0.5 g/kg/day for 5 days in addition to steroids, and consider rituximab",
      why: "SITC says IVIG should be given as well as steroids when thrombocytopenia is severe, and that rituximab may also be considered. It does not give a platelet count that defines severe.",
      source: "sitc-2021",
      quote: "For patients with severe ITP, IVIG (0.5 g/kg/day for 5 days (LE: 1) should be administered in addition to steroids. Rituximab may also be considered (LE: 2).",
      grade: "LE: 1 (IVIG); LE: 2 (rituximab)",
    },
    {
      action: "For possible haemolysis, send a full blood count with differential, reticulocytes, a blood film, a direct antiglobulin (Coombs) test, and LDH with an ADAMTS13 level",
      why: "These are the tests SITC lists for red cells being broken down.",
      source: "sitc-2021",
      quote: "Diagnostic workup for patients with possible ICI-related HA should include CBC with differential, reticulocyte count, blood smear evaluation, direct antiglobulin test (Coomb’s), and LDH with ADAMTS13 level.",
    },
    {
      action: "Treat autoimmune haemolytic anaemia by haematological standard of care, typically steroids (prednisone 1 mg/kg by mouth or equivalent); if it is severe and does not respond to steroids, add IVIG 0.5 g/kg/day for 5 days",
      why: "SITC says standard care for immune haemolysis typically includes steroids, and that IVIG should be added for severe cases that steroids do not control (LE: 3).",
      source: "sitc-2021",
      quote: "For patients with ICI-related AIHA, treatment should follow hematological standard of care. Typically, this includes steroids (prednisone dose of 1 mg/kg oral or equivalent)",
      grade: "LE: 3",
    },
    {
      action: "In patients on chemotherapy with immunotherapy, distinguish immune neutropenia from chemotherapy marrow suppression",
      why: "Chemotherapy lowers white cells by itself, and SITC says it is important to tell the two causes apart.",
      source: "sitc-2021",
      quote: "For patients being treated with chemo-immunotherapy who develop neutropenia, it is important to differentiate between immune-related neutropenia and chemotherapy-induced myelosuppression.",
    },
    {
      action: "Treat immune neutropenia by haematological standard of care, typically steroids (prednisone 1 mg/kg by mouth or equivalent) with G-CSF",
      why: "SITC says this is what standard care typically includes, and notes that neutropenia carries a higher risk of infection.",
      source: "sitc-2021",
      quote: "For patients with immune-related neutropenia, treatment should follow hematological standard of care. Typically, this includes steroids (prednisone 1 mg/kg oral or equivalent) with G-CSF",
      grade: "LE: 3",
    },
    {
      action: "For aplastic anaemia, use an immunosuppressant beyond steroids, such as ciclosporin; ATG may also be considered",
      why: "SITC says aplastic anaemia is frequently difficult to treat and has a low rate of resolution. The LE: 4 is printed after the ATG sentence and cites a single case report; the ciclosporin sentence cites nothing.",
      source: "sitc-2021",
      quote: "For patients with ICI-related AA, additional immunosuppressive therapies beyond steroids should be used, such as cyclosporine. ATG may also be considered (LE: 4).",
      grade: "LE: 4 (ATG)",
    },
    {
      action: "Treat pure red cell aplasia with steroids; if it does not respond, ciclosporin may be needed and ATG may be considered",
      why: "SITC says standard haematological care for this condition includes steroids, with further immunosuppression such as ciclosporin possibly required if steroids fail (LE: 3) and ATG as an option (LE: 4).",
      source: "sitc-2021",
      quote: "For patients with PRCA, hematological standard of care includes steroids (LE: 3).",
      grade: "LE: 3",
    },
    {
      action: "Suspect HLH when symptoms arise, send a full blood count with differential, a blood film, ferritin and soluble IL-2 receptor, and consult a haematologist early",
      why: "HLH is life-threatening. SITC says a haematologist's advice is required, and that standard treatment typically involves steroids and immunosuppressives such as etoposide or tocilizumab.",
      source: "sitc-2021",
      quote: "Diagnostic workup for patients with possible ICI-related HLH should include CBC with differential, blood smear evaluation, ferritin, and soluble IL-2 receptor. Because this condition is life-threatening, it should be suspected when symptoms arise and warrants early consultation with a specialist.",
    },
  ],
  bestInClass: {
    statement: "SITC 2021 is the only guideline read in full with a haematological section. For immune thrombocytopenia, haemolysis, neutropenia, pure red cell aplasia and HLH it points to the haematological standard of care: typically prednisone 1 mg/kg for immune thrombocytopenia (LE: 1), with IVIG added for severe cases (LE: 1) and rituximab as an option (LE: 2); prednisone 1 mg/kg for haemolysis (LE: 3), with IVIG added for severe cases that do not respond to steroids (LE: 3); prednisone 1 mg/kg with G-CSF for immune neutropenia (LE: 3); steroids for pure red cell aplasia (LE: 3); and steroids with immunosuppressives such as etoposide or tocilizumab for HLH, with a haematologist (LE: 3). For aplastic anaemia it says an immunosuppressant beyond steroids, such as ciclosporin, should be used (no grade printed) and that ATG may be considered (LE: 4, citing one case report). The references it cites for the two LE: 1 grades are meta-analyses in primary immune thrombocytopenia, not in patients on checkpoint inhibitors. It gives no rule of its own for stopping the checkpoint inhibitor, so its general framework applies: withhold at grade 2, and weigh re-challenge after grade 3 or 4 against the risk (LE: 3). The ASCO 2021 abstract says only that, in general, some haematological toxicities are an exception to continuing treatment at grade 1; its haematological table was not read. ESMO 2022 could not be read.",
    sources: ["sitc-2021", "asco-2021", "esmo-2022"],
  },
  variants: [],
  grades: [
    { claim: "Immune thrombocytopenia: typically steroids (prednisone 1 mg/kg by mouth or equivalent)", grade: "LE: 1", source: "sitc-2021" },
    { claim: "Severe immune thrombocytopenia: IVIG 0.5 g/kg/day for 5 days in addition to steroids; rituximab may also be considered", grade: "LE: 1 (IVIG); LE: 2 (rituximab)", source: "sitc-2021" },
    { claim: "Autoimmune haemolytic anaemia: typically steroids (prednisone 1 mg/kg by mouth or equivalent)", grade: "LE: 3", source: "sitc-2021" },
    { claim: "Severe autoimmune haemolytic anaemia that does not respond to steroids: add IVIG 0.5 g/kg/day for 5 days", grade: "LE: 3", source: "sitc-2021", quote: "For patients with severe ICI-related AIHA that do not respond to steroids, IVIG (0.5 g/kg/day for 5 days) (LE: 3) should be added." },
    { claim: "Immune neutropenia: typically steroids (prednisone 1 mg/kg by mouth or equivalent) with G-CSF", grade: "LE: 3", source: "sitc-2021" },
    { claim: "Aplastic anaemia: ATG may be considered. The sentence saying an immunosuppressant beyond steroids, such as ciclosporin, should be used carries no grade of its own", grade: "LE: 4", source: "sitc-2021" },
    { claim: "Pure red cell aplasia: steroids; if steroid-refractory, further immunosuppression such as ciclosporin may be required; ATG may also be considered", grade: "LE: 3 (steroids, ciclosporin); LE: 4 (ATG)", source: "sitc-2021", quote: "For patients with steroid-refractory PRCA, additional immunosuppressive therapies such as cyclosporine may be required (LE: 3). ATG may be also be considered (LE: 4)." },
    { claim: "HLH: steroids and immunosuppressives such as etoposide or tocilizumab, with haematology", grade: "LE: 3", source: "sitc-2021", quote: "For patients with ICI-related secondary HLH, hematological consultation is required as this is a challenging condition to manage. Standard of care treatment typically involves steroids and immunosuppressives, such as etoposide or tocilizumab" },
    { claim: "General rule, not specific to blood: re-challenge after a grade 3 or 4 immune side effect is a risk-adjusted decision", grade: "LE: 3", source: "sitc-2021", quote: "The decision to re-challenge a patient who has experienced grade 3 or 4 irAEs should be risk-adjusted based on anticipated benefit with therapy versus the potential for toxicity" },
    { claim: "General rule, not specific to blood: after a grade 2 immune side effect, re-challenge is possible once signs and symptoms have resolved or are controlled on 10 mg or less of prednisone a day", grade: "LE: 3", source: "sitc-2021", quote: "Unless otherwise specified, patients who have experienced grade 2 irAEs may be re-challenged with ICI therapy if their signs and symptoms have resolved or are controlled with ≤10 mg of prednisone (or equivalent) per day" },
    { claim: "In general, treatment continues with close monitoring at grade 1, except for some neurological, haematological and cardiac toxicities", grade: "expert consensus", source: "asco-2021", quote: "in general, ICPi therapy should be continued with close monitoring for grade 1 toxicities, except for some neurologic, hematologic, and cardiac toxicities" },
  ],
  sources: [
    { ...SITC_ICI_2021, accessed: "2026-11-17" },
    { ...ASCO_ICI_2021, accessed: "2026-11-17" },
    ESMO_ICI_2022,
    {
      key: "macmillan-pembrolizumab",
      label: "Pembrolizumab (patient information; reviewed 1 August 2026)",
      publisher: "Macmillan Cancer Support",
      year: 2026,
      url: "https://www.macmillan.org.uk/cancer-information-and-support/treatments-and-drugs/pembrolizumab",
      gradingScheme: "Patient information, not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "cruk-pembrolizumab",
      label: "Pembrolizumab (Keytruda) (patient information; last reviewed 24 March 2026)",
      publisher: "Cancer Research UK",
      year: 2026,
      url: "https://www.cancerresearchuk.org/about-cancer/treatment/drugs/pembrolizumab",
      gradingScheme: "Patient information, not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
  ],
  upgrades: [],
  gaps: [
    ESMO_GAP,
    ASCO_GAP,
    "The ASCO 2021 haematological table is not compared here, so which haematological toxicities ASCO treats as exceptions at grade 1, and at what grade it stops the checkpoint inhibitor for each, is not stated on this page.",
    "Only one guideline with a haematological section could be read; the steps rest on SITC 2021 alone, and no second guideline is compared. A Europe PMC title search on 17 November 2026 found no haematology-society guideline or consensus statement on checkpoint inhibitor cytopenias from 2021 to 2026.",
    "SITC 2021 gives no platelet count, haemoglobin or neutrophil threshold for acting, does not define severe immune thrombocytopenia or severe haemolysis by a number, and gives no dose for G-CSF, ciclosporin, ATG, rituximab, etoposide or tocilizumab. It grades by CTCAE v5.0, whose definitions are not reproduced here.",
    "SITC's haematological section states no rule of its own on when to hold or permanently stop the checkpoint inhibitor, or when to restart it. Its general framework applies (withhold at grade 2; re-challenge after grade 3 or 4 is a risk-adjusted decision), and the only haematology-specific figure is that 43% of 7 re-challenged patients had a recurrence.",
    "The warning signs for patients come from two pages about pembrolizumab, one checkpoint inhibitor: Macmillan (unexplained bruising or bleeding, a temperature above 37.5°C, yellow skin or eyes and dark urine, each with contact the hospital straight away on the 24-hour number) and Cancer Research UK (breakdown of red blood cells, listed as a rare side effect in fewer than 1 in 100 people, can cause yellowing of the skin and eyes, dark urine and a high temperature). No source read gives a patient symptom list or a time limit for blood side effects of checkpoint inhibitors as a class, and SITC 2021 gives none.",
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
