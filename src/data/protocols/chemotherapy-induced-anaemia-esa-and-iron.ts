import { protocol } from "./helpers";

/*
 * Anaemia during chemotherapy: finding other causes, iron, erythropoiesis-stimulating agents (ESAs) and when
 * transfusion is the alternative.
 *
 * First written on 11 November 2026 from ASCO/ASH 2019 and NICE TA323 chapter 1.
 *
 * Second accuracy pass, 17 November 2026. Everything below was fetched raw with curl and read as text; every quote
 * was checked verbatim by script against the saved copy.
 * - ASCO/ASH 2019 (Bohlius et al., Blood Advances): full text from PubMed Central (PMC6482353) as HTML with the tags
 *   stripped (the Europe PMC XML endpoint returned 500 and the E-utilities copy carries no body text). Every
 *   recommendation, its type, evidence quality and strength, Table 1 and Table 2 (dosing) were re-read.
 * - NICE TA323: the overview and chapters 1 to 4 from nice.org.uk. The overview prints "Last reviewed: 26 April
 *   2018" with nothing new found. Chapter 3 gives the UK licensed indications, the haemoglobin level for starting,
 *   the target and the starting doses, which the first pass had not read.
 * - Epogen and Aranesp US prescribing information: SPL XML from DailyMed, read for the first time, for the boxed
 *   warning, the cancer dosing sections and the iron statement. The doses in ASCO/ASH Table 2 still match them.
 * - SEOM 2020 guideline on anaemia in cancer (Clin Transl Oncol 2021): full text XML from Europe PMC (PMC8057996),
 *   read for the first time, for iron thresholds, the 12 g/dL ceiling and transfusion levels.
 * - ESMO 2018 (Ann Oncol): still not readable. Europe PMC holds no abstract or full text, the journal's free PDF link
 *   answered 403 to a script, esmo.org renders the page in the browser only, and the one Internet Archive request
 *   answered 429.
 * Newer editions: none of ASCO/ASH 2019, ESMO 2018 or NICE TA323 has a successor in Europe PMC, Crossref or on
 * nice.org.uk. Every DOI was resolved through Crossref or Europe PMC and its title checked.
 */
export const chemotherapyInducedAnaemiaEsaAndIron = protocol({
  id: "chemotherapy-induced-anaemia-esa-and-iron",
  name: "Anaemia during chemotherapy: investigation, iron and erythropoiesis-stimulating agents",
  aka: ["chemotherapy-induced anaemia", "ESA in cancer", "epoetin for anaemia in cancer", "darbepoetin", "iron for anaemia during chemotherapy", "cancer-associated anaemia"],
  domain: "supportive-care",
  tldr: "Chemotherapy often lowers the red blood cells, causing tiredness and breathlessness. Your team should first look for other causes such as low iron or blood loss. Injections that boost red cell production (ESAs) or a blood transfusion are options. ESAs raise the risk of blood clots. US guidance advises against them when treatment aims at cure; UK guidance does not draw that line.",
  simple: "Chemotherapy can lower red blood cells and make you tired. Doctors check for other causes first. They may give iron, an injection to make more red cells, or a blood transfusion.",
  summary: "ASCO/ASH (2019) ask clinicians first to look for and treat other causes of anaemia (drug history, blood film, reticulocytes, occult blood loss, renal function, erythropoietin level and, where indicated, iron studies including ferritin and transferrin saturation, folate, vitamin B12 and thyroid function). ESAs may be offered for chemotherapy-associated anaemia when treatment is not curative in intent and haemoglobin has fallen below 10 g/dL, with red cell transfusion as an alternative (evidence based, high quality, strong). They should not be offered when treatment is curative (strong), nor to most people whose anaemia is not chemotherapy-associated (strong), except lower-risk myelodysplastic syndromes with erythropoietin 500 IU/L or below.\n\nESAs raise the risk of thromboembolism (high quality, strong): ASCO/ASH cite a 50% to 75% increase, and the US labels carry a boxed warning that ESAs shortened survival or increased tumour progression or recurrence in studies of several cancers. ASCO/ASH ask that doses follow the US labels: epoetin alfa 150 units/kg three times a week or 40,000 units weekly, or darbepoetin alfa 2.25 micrograms/kg weekly or 500 micrograms every 3 weeks, all under the skin. Haemoglobin is raised only to the lowest level that avoids transfusion; ESAs stop if there is no response in 6 to 8 weeks, prompting a search for progression or iron deficiency (strong). Iron may be used with an ESA, with baseline and periodic iron studies (weak).\n\nNICE TA323 recommends ESAs within their UK licences for anaemia in people having chemotherapy, choosing the cheapest suitable product. It describes those licences as starting at a haemoglobin of 100 g/litre or lower with target values up to 120 g/litre, and the licensed indications it quotes do not mention whether treatment is curative. SEOM (2020) adds iron thresholds and a ceiling of 12 g/dL.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "pharmacist", "nurse"],
    where: ["outpatient-clinic", "chemotherapy-day-unit"],
  },
  population: "Adults with cancer and anaemia during or related to myelosuppressive chemotherapy. Children are not covered. People who also have chronic kidney disease have their own ESA guidance, which ASCO/ASH ask clinicians to consider as well. Red cell transfusion thresholds have their own protocol; only what these sources say about them is noted here.",
  trigger: "Haemoglobin falls during chemotherapy, or symptoms of anaemia appear.",
  steps: [
    {
      action: "Before any ESA, look for other causes: take a history and examine, review the drug history and a blood film, check reticulocytes, kidney function and signs of blood loss and, where indicated, iron studies, folate and vitamin B12, and deal with what you find",
      why: "ASCO/ASH call treating reversible causes the preferred first approach; an ESA would not correct iron deficiency or bleeding.",
      source: "asco-ash-2019",
      quote: "Before offering an ESA, clinicians should conduct an appropriate history, physical examination, and diagnostic tests to identify alternative causes of anemia aside from chemotherapy or an underlying hematopoietic malignancy.",
      grade: "informal consensus; evidence quality intermediate; strength strong",
    },
    {
      action: "If treatment is not aimed at cure and haemoglobin is below 10 g/dL, an ESA may be offered; a red cell transfusion is the other option, depending on how severe the anaemia is and the circumstances",
      why: "ESAs reduce the need for transfusions. ASCO/ASH say no best starting level has been established and judge it prudent to wait until haemoglobin is below 10 g/dL.",
      source: "asco-ash-2019",
      quote: "Depending on clinical circumstances, ESAs may be offered to patients with chemotherapy-associated anemia whose cancer treatment is not curative in intent and whose hemoglobin (HgB) has declined to < 10 g/dL.",
      grade: "evidence based; evidence quality high; strength strong",
    },
    {
      action: "Do not offer an ESA when the treatment is curative in intent (the ASCO/ASH and US label position; NICE and the UK licences it quotes do not draw this line)",
      why: "The US labels say ESAs are not indicated when the expected outcome is cure. ASCO/ASH accept that the benefits may be outweighed by the risks for someone who could otherwise expect cure, while noting that no trial compares the two groups directly.",
      source: "asco-ash-2019",
      quote: "ESAs should not be offered to patients with chemotherapy-associated anemia whose cancer treatment is curative in intent",
      grade: "evidence based; evidence quality intermediate; strength strong",
    },
    {
      action: "Do not offer an ESA to most people whose anaemia is not associated with chemotherapy; the exception is lower-risk myelodysplastic syndromes with an erythropoietin level of 500 IU/L or below",
      why: "ASCO/ASH note that the licences cover only anaemia from chemotherapy given at the same time. The exception for lower-risk myelodysplastic syndromes is a separate recommendation with its own grade (evidence based; intermediate; moderate).",
      source: "asco-ash-2019",
      quote: "ESAs should not be offered to most patients with nonchemotherapy-associated anemia",
      grade: "informal consensus; evidence quality low; strength strong",
    },
    {
      action: "Weigh the risk of blood clots before starting an ESA",
      why: "ASCO/ASH report that trials consistently show a 50% to 75% higher risk of thromboembolism and arterial events in people given an ESA, and ask for special attention in myeloma treated with thalidomide or lenalidomide together with doxorubicin or corticosteroids.",
      source: "asco-ash-2019",
      quote: "ESAs increase the risk of thromboembolism, and clinicians should carefully weigh the risks of thromboembolism and use caution and clinical judgment when considering use of these agents",
      grade: "evidence based; evidence quality high; strength strong",
    },
    {
      action: "Discuss the possible harms and benefits of an ESA with the patient before starting",
      why: "Besides clots, studies have reported shorter survival, more deaths during the study, or a higher risk of the cancer progressing or returning with ESAs. ASCO/ASH print this advice in their discussion, without a grade.",
      source: "asco-ash-2019",
      quote: "The Expert Panel stresses the importance of including a detailed discussion between health care providers and their patients about the potential harms and benefits of ESA therapy.",
    },
    {
      action: "Start the ESA at its licensed dose and adjust the dose as the licence sets out",
      why: "The US labels, as ASCO/ASH tabulate them, start epoetin alfa at 150 units/kg three times a week or 40,000 units weekly, and darbepoetin alfa at 2.25 micrograms/kg weekly or 500 micrograms every 3 weeks, all under the skin. ASCO/ASH found no evidence that other doses do better. UK starting doses and the dose changes are under variants.",
      source: "asco-ash-2019",
      quote: "It is recommended that starting and modifying doses of ESAs follow FDA guidelines",
      grade: "informal consensus; evidence quality intermediate; strength moderate",
    },
    {
      action: "Raise haemoglobin only to the lowest level that avoids transfusion",
      why: "ASCO/ASH say an optimal target cannot be determined from the evidence, and that the dose should come down once haemoglobin is high enough to avoid transfusion or is rising by more than 1 g/dL in 2 weeks.",
      source: "asco-ash-2019",
      quote: "HgB may be increased to the lowest concentration needed to avoid or reduce the need for RBC transfusions, which may vary by patient and condition",
      grade: "informal consensus; evidence quality intermediate; strength moderate",
    },
    {
      action: "Consider iron alongside an ESA, and check iron studies at the start and during treatment",
      why: "Adding iron may improve the haemoglobin response and reduce transfusions, whether or not iron deficiency has been found. ASCO/ASH accept iron by mouth or into a vein.",
      source: "asco-ash-2019",
      quote: "Iron replacement may be used to improve HgB response and reduce RBC transfusions for patients receiving ESA with or without iron deficiency.",
      grade: "evidence based; evidence quality intermediate; strength weak",
    },
    {
      action: "Stop the ESA if there is no response within 6 to 8 weeks, and look again for progression, iron deficiency or another cause",
      why: "ASCO/ASH want exposure to ESAs kept to a minimum because of their known harms. The US labels stop the ESA if there is no response after 8 weeks, and when the chemotherapy course ends.",
      source: "asco-ash-2019",
      quote: "ESAs should be discontinued in patients who do not respond within 6 to 8 weeks.",
      grade: "informal consensus; evidence quality intermediate; strength strong",
    },
  ],
  bestInClass: {
    statement: "ASCO/ASH (2019), read in full, is the most detailed current guideline that could be read: investigate other causes first, offer an ESA or transfusion for chemotherapy-associated anaemia below 10 g/dL only when treatment is not curative, weigh the clot risk, follow the labelled doses, aim for the lowest haemoglobin that avoids transfusion, stop after 6 to 8 weeks without response, and consider iron alongside. The bodies differ on treatment intent. ASCO/ASH say ESAs should not be offered when treatment is curative (evidence based; intermediate; strong), in line with the US labels. NICE TA323 (2014, last reviewed April 2018) recommends ESAs within their UK marketing authorisations, and the authorisations it quotes do not mention treatment intent. SEOM (2020) says ESAs should be avoided with curative intent (level of evidence IV, grade C). On a ceiling, ASCO/ASH set none, while NICE describes UK licences with target values up to 120 g/litre and SEOM says not to exceed 12 g/dL. ESMO's 2018 guideline could not be read, so its position is not given.",
    sources: ["asco-ash-2019", "nice-ta323", "seom-2020", "fda-epogen", "fda-aranesp", "esmo-2018"],
  },
  variants: [
    {
      name: "ESAs within their UK licences, cheapest suitable product (NICE TA323)",
      differs: "Recommends epoetin alfa, beta, theta and zeta and darbepoetin alfa within their marketing authorisations as options for anaemia in people with cancer having chemotherapy, and the product with the lowest acquisition cost where several are equally suitable. NICE describes the licences as recommending use when haemoglobin is 100 g/litre or lower, with target values up to 120 g/litre. The licensed indications it quotes cover adults having chemotherapy and do not mention whether treatment is curative, so NICE does not repeat the ASCO/ASH restriction.",
      evidence: "A NICE technology appraisal of clinical and cost effectiveness; NICE does not grade it. The committee concluded it could not assume that ESAs either prolonged or shortened survival, and that the evidence suggests the risks of adverse reactions are lower when ESAs are used within their current marketing authorisations. ASCO/ASH separately consider epoetin beta and alfa, darbepoetin and biosimilar epoetin alfa equivalent (informal consensus; intermediate; moderate).",
      sources: ["nice-ta323", "asco-ash-2019"],
    },
    {
      name: "Starting doses and dose changes: US labels and UK licences",
      differs: "US labels (in ASCO/ASH Table 2, confirmed in the current Epogen and Aranesp labels): epoetin alfa 150 units/kg three times a week or 40,000 units weekly; darbepoetin alfa 2.25 micrograms/kg weekly or 500 micrograms every 3 weeks; all subcutaneous, started only if haemoglobin is below 10 g/dL and at least two more months of chemotherapy are planned. If haemoglobin has risen by less than 1 g/dL and is still below 10 g/dL after 4 weeks, epoetin alfa goes up to 300 units/kg three times a week or 60,000 units weekly; after 6 weeks, weekly darbepoetin goes up to 4.5 micrograms/kg; the 3-weekly darbepoetin dose is not increased. The dose is cut by 25% (epoetin alfa) or 40% (darbepoetin) when haemoglobin reaches a level that avoids transfusion or rises by more than 1 g/dL in 2 weeks. UK starting doses, as NICE TA323 prints them: epoetin alfa and zeta 150 units/kg three times weekly or 450 units/kg once a week; epoetin beta 450 units/kg once a week or in divided doses 3 to 7 times a week; epoetin theta 20,000 units once a week; darbepoetin alfa 500 micrograms (6.75 micrograms/kg) once every 3 weeks or 2.25 micrograms/kg once a week.",
      evidence: "Regulatory labelling, not graded. ASCO/ASH recommend following the US labels (informal consensus; intermediate; moderate). NICE gives UK starting doses only; UK dose changes are in each product's summary of product characteristics, which was not read.",
      sources: ["asco-ash-2019", "fda-epogen", "fda-aranesp", "nice-ta323"],
    },
    {
      name: "Wait for the response to treatment in myeloma, lymphoma and CLL (ASCO/ASH)",
      differs: "In myeloma, non-Hodgkin lymphoma and chronic lymphocytic leukaemia, observes the blood count response to cancer treatment before considering an ESA, with particular caution where the treatment or the disease raises the risk of clots, and with transfusion considered in all cases.",
      evidence: "ASCO/ASH recommendation 3 (informal consensus; evidence quality low; strength moderate).",
      sources: ["asco-ash-2019"],
    },
    {
      name: "Iron deficiency thresholds and the route of iron (US labels and SEOM)",
      differs: "ASCO/ASH set no ferritin or transferrin saturation threshold and accept oral or intravenous iron, the choice resting on preference, availability, cost and other illnesses. The US ESA labels say to check iron status in all patients before and during treatment and to give supplemental iron when serum ferritin is below 100 micrograms/L or transferrin saturation is below 20%. SEOM (2020) defines absolute iron deficiency as ferritin below 30 ng/ml with transferrin saturation below 20% and recommends oral or intravenous iron, with oral iron only when there is no inflammation and a switch to intravenous iron if there is no response after four weeks. For functional iron deficiency (ferritin 30 to 500 ng/ml with transferrin saturation below 50%) it recommends intravenous iron together with an ESA. It advises giving intravenous iron before or after chemotherapy or at the end of a cycle.",
      evidence: "SEOM: level of evidence II, grade of recommendation A for the two iron deficiency recommendations; level III, grade C for the timing of intravenous iron. ASCO/ASH report a Cochrane review in which intravenous iron with an ESA raised haemoglobin more than oral iron, and call that evidence limited and inconsistent across other outcomes. The labels are not graded.",
      sources: ["asco-ash-2019", "fda-epogen", "fda-aranesp", "seom-2020"],
    },
    {
      name: "A 12 g/dL ceiling and transfusion levels (SEOM 2020)",
      differs: "Recommends ESAs for people with solid tumours having chemotherapy who have symptomatic anaemia with haemoglobin below 10 g/dL, or anaemia without symptoms below 8 g/dL, after iron and other causes are corrected; continues until haemoglobin is stable at a level that avoids or reduces transfusion, without exceeding 12 g/dL; and stops, without raising the dose or switching product, in people who have not responded after 6 to 8 weeks, except with epoetin theta. Suggests considering red cell transfusion below 7 to 8 g/dL (below 9 g/dL with cardiovascular risk factors) or with severe symptoms.",
      evidence: "SEOM: level of evidence I, grade A for the indication; level IV, grade B for the 12 g/dL ceiling; level II, grade B for stopping in non-responders and for the transfusion levels.",
      sources: ["seom-2020"],
    },
  ],
  grades: [
    { claim: "ESA or transfusion for chemotherapy-associated anaemia below 10 g/dL, non-curative treatment", grade: "evidence based; high; strong", source: "asco-ash-2019" },
    { claim: "No ESA when treatment is curative", grade: "evidence based; intermediate; strong", source: "asco-ash-2019" },
    { claim: "No ESA for most anaemia not associated with chemotherapy", grade: "informal consensus; low; strong", source: "asco-ash-2019" },
    { claim: "ESA for lower-risk MDS with erythropoietin 500 IU/L or below", grade: "evidence based; intermediate; moderate", source: "asco-ash-2019", quote: "ESAs may be offered to patients with lower risk myelodysplastic syndromes and a serum erythropoietin level ≤ 500 IU/L" },
    { claim: "Look for other causes before an ESA", grade: "informal consensus; intermediate; strong", source: "asco-ash-2019" },
    { claim: "ESAs increase thromboembolism risk", grade: "evidence based; high; strong", source: "asco-ash-2019" },
    { claim: "ESA doses follow the US labels", grade: "informal consensus; intermediate; moderate", source: "asco-ash-2019" },
    { claim: "Lowest haemoglobin that avoids transfusion", grade: "informal consensus; intermediate; moderate", source: "asco-ash-2019" },
    { claim: "Stop after 6 to 8 weeks without response", grade: "informal consensus; intermediate; strong", source: "asco-ash-2019" },
    { claim: "Iron with an ESA", grade: "evidence based; intermediate; weak", source: "asco-ash-2019" },
    { claim: "ESA continued without exceeding 12 g/dL (SEOM)", grade: "level of evidence IV, grade of recommendation B", source: "seom-2020", quote: "Administer until stable Hgb values that avoid or reduce the need for red blood cell transfusion have been achieved, without exceeding 12 g/dl" },
    { claim: "Oral or intravenous iron for absolute iron deficiency, switching to intravenous after four weeks without response (SEOM)", grade: "Level of evidence II, grade of recommendation A", source: "seom-2020", quote: "If no response is obtained with oral treatment after four weeks, switch to IV iron." },
    { claim: "ESAs not indicated when the expected outcome is cure (US labels)", grade: "not graded (boxed warning)", source: "fda-aranesp", quote: "ESAs are not indicated for patients receiving myelosuppressive chemotherapy when the anticipated outcome is cure" },
    { claim: "Start only below 10 g/dL and with at least two more months of chemotherapy planned (US labels)", grade: "not graded (labelling)", source: "fda-epogen", quote: "Initiate Epogen in patients on cancer chemotherapy only if the hemoglobin is less than 10 g/dL, and if there is a minimum of two additional months of planned chemotherapy." },
    { claim: "Supplemental iron below ferritin 100 micrograms/L or transferrin saturation 20% (US labels)", grade: "not graded (labelling)", source: "fda-aranesp", quote: "Administer supplemental iron therapy when serum ferritin is less than 100 mcg/L or when serum transferrin saturation is less than 20%." },
    { claim: "UK licences: start at 100 g/litre or lower, target up to 120 g/litre (NICE TA323, section 3)", grade: "not graded", source: "nice-ta323", quote: "Epoetins are recommended for use when haemoglobin concentrations are 100 g/litre or lower, and target values up to 120 g/litre." },
  ],
  sources: [
    { key: "asco-ash-2019", label: "Management of cancer-associated anemia with erythropoiesis-stimulating agents: ASCO/ASH clinical practice guideline update", publisher: "ASCO and the American Society of Hematology, Blood Advances (published jointly in J Clin Oncol)", year: 2019, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6482353/", doi: "10.1182/bloodadvances.2018030387", gradingScheme: "Each recommendation printed with type (evidence based or informal consensus), evidence quality (high, intermediate, low) and strength (strong, moderate, weak).", read: "full-text", accessed: "2026-11-17" },
    { key: "nice-ta323", label: "Erythropoiesis-stimulating agents (epoetin and darbepoetin) for treating anaemia in people with cancer having chemotherapy (TA323), published 26 November 2014, last reviewed 26 April 2018", publisher: "NICE", year: 2014, url: "https://www.nice.org.uk/guidance/ta323", gradingScheme: "NICE technology appraisals are not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "fda-epogen", label: "Epogen (epoetin alfa) US prescribing information, DailyMed (Amgen; SPL version 137, revised December 2024)", publisher: "Amgen / US FDA (DailyMed)", year: 2024, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=1f2d0b28-9cc5-4523-80b8-637fdaf3f7a5", gradingScheme: "Regulatory labelling; not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "fda-aranesp", label: "Aranesp (darbepoetin alfa) US prescribing information, DailyMed (Amgen; SPL version 161, revised December 2024)", publisher: "Amgen / US FDA (DailyMed)", year: 2024, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=0fd36cb9-c4f6-4167-93c9-8530865db3f9", gradingScheme: "Regulatory labelling; not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "seom-2020", label: "SEOM clinical guidelines for anaemia treatment in cancer patients (2020)", publisher: "Spanish Society of Medical Oncology (SEOM), Clinical and Translational Oncology", year: 2021, url: "https://europepmc.org/article/PMC/PMC8057996", doi: "10.1007/s12094-021-02580-2", gradingScheme: "Prints a level of evidence (I to IV) and a grade of recommendation (A to C) after each statement; the paper does not define the scale.", read: "full-text", accessed: "2026-11-17" },
    { key: "esmo-2018", label: "Management of anaemia and iron deficiency in patients with cancer: ESMO Clinical Practice Guidelines", publisher: "ESMO, Annals of Oncology", year: 2018, url: "https://doi.org/10.1093/annonc/mdx758", doi: "10.1093/annonc/mdx758", read: "not-reachable", accessed: "2026-11-17" },
  ],
  upgrades: [],
  gaps: [
    "On 17 November 2026 the ESMO 2018 guideline on anaemia and iron deficiency still could not be read: Europe PMC holds no abstract or full text, the journal's free PDF link refused a script, and the one Internet Archive request was refused. Nothing on this page rests on it, and where ESMO stands on treatment intent, a haemoglobin ceiling, iron thresholds and intravenous iron without an ESA is not given here. No newer ESMO edition was found.",
    "ASCO/ASH 2019 sets no iron deficiency thresholds and does not choose between oral and intravenous iron. The thresholds on this page come from the US ESA labels and from SEOM 2020, which differ from each other.",
    "SEOM 2020 has a published correction (10.1007/s12094-021-02681-y) whose text could not be read on 17 November 2026, so it is not known whether it changes any figure used here. SEOM's lines on ferritin above 500 ng/ml are printed with inconsistent units and are not reproduced, and its serum iron cut-off is left out because the unit is misprinted. Its table of intravenous iron product doses is not reproduced either; no iron product label was read.",
    "UK summaries of product characteristics were not read directly. The UK starting levels, targets and doses here are as NICE TA323 printed them in 2014, and a licence may have changed since; the US doses were checked against the labels current on 17 November 2026.",
    "ASCO/ASH's 6 to 8 weeks for stopping an ESA and the US labels' 8 weeks are both given; the sources do not reconcile them.",
    "No ASCO/ASH update after 2019 was found in Europe PMC or Crossref, and NICE last reviewed TA323 on 26 April 2018 and found nothing new. Newer agents for anaemia in MDS are outside this protocol.",
  ],
  institutions: ["asco", "nice"],
  technologies: ["transfusion-support"],
  drugs: ["epoetin-alfa", "darbepoetin-alfa", "epoetin-theta"],
  terms: ["anaemia"],
  related: ["mds", "red-cell-and-platelet-transfusion-thresholds"],
  sections: ["supportive-care"],
  tags: ["protocol", "anaemia", "supportive-care"],
});
