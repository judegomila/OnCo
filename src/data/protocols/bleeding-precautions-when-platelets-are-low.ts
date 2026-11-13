import { protocol } from "./helpers";

/*
 * Bleeding precautions at home when cancer treatment has lowered the platelet count (thrombocytopenia).
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - NCI, Chemotherapy and You (PDF dated December 2023): full text, pdftotext. The bleeding problems section.
 * - NCI, Bleeding and Bruising (Thrombocytopenia) and Cancer Treatment (web page, reviewed 29 December 2022): full text.
 * - Macmillan Cancer Support, Side effects of chemotherapy (web page, reviewed 30 September 2018, marked as under
 *   review): full text.
 * - NICE NG24, Blood transfusion, platelet transfusion chapter (published 2015, last updated 26 February 2026): full text.
 * - ASCO, Platelet Transfusion for Patients With Cancer (J Clin Oncol 2018): abstract only, through PubMed; DOI resolved
 *   through Crossref and Europe PMC.
 * The home precautions are expert patient advice from national bodies; no trial has tested them. That is said in the
 * grades and the gaps rather than dressed up.
 */
export const bleedingPrecautionsWhenPlateletsAreLow = protocol({
  id: "bleeding-precautions-when-platelets-are-low",
  name: "Bleeding precautions at home when platelets are low",
  aka: ["thrombocytopenia precautions", "low platelet precautions", "bleeding precautions", "low platelets during chemotherapy", "bruising and bleeding on chemotherapy"],
  domain: "supportive-care",
  tldr: "When chemotherapy lowers the platelets that help blood clot, small changes at home lower the chance of bleeding: a very soft toothbrush, an electric shaver, shoes on, no aspirin or ibuprofen unless the team agrees, and firm pressure on any cut. Some signs need a call to the team straight away, such as bleeding that will not stop, blood in urine or stools, or a bad headache or change in vision.",
  simple: "Chemotherapy can lower your platelets, the cells that stop bleeding. Use a very soft toothbrush and an electric shaver, wear shoes, and ask before taking any painkiller or supplement. Press firmly on a cut until it stops. Call your team if bleeding will not stop, if you see blood in your urine or stools, or if you get a bad headache or blurred vision.",
  summary: "The home advice comes from national patient guidance: NCI's Chemotherapy and You (2023) and its thrombocytopenia page (reviewed 2022), and Macmillan (2018, under review). They agree on a very soft toothbrush, an electric shaver, care with sharp objects, shoes at all times, gentle nose-blowing, avoiding aspirin, ibuprofen and supplements without the team's agreement, firm pressure on bleeding, treating constipation, and calling about named warning signs. They differ on flossing: NCI's booklet says not to use dental floss but suggests a water flosser, its mouth-care section says to ask before flossing, and Macmillan says not to floss. None of this has been tested in a trial and none of it is graded. Platelet support is a clinical decision: NICE NG24 offers prophylactic platelet transfusion below 10 x 10^9 per litre to people who are not bleeding and not having a procedure, with exceptions (chronic bone marrow failure, autoimmune thrombocytopenia, HIT, TTP), and transfusion for clinically significant bleeding below 30 x 10^9 per litre. ASCO 2018 allows adults after autologous stem cell transplant at experienced centres to be transfused at the first sign of bleeding rather than prophylactically.",
  asOf: "2026-11-11",
  setting: {
    who: ["patient-or-carer", "nurse", "doctor"],
    where: ["home", "telephone-triage", "chemotherapy-day-unit"],
  },
  population: "Adults having chemotherapy or targeted therapy whose platelet count is low or is expected to fall. The sources do not set a platelet count at which the home precautions start; the treating team says when they apply. Children, people after stem cell transplant, and people on anticoagulants have their own team-specific advice.",
  trigger: "The team says the platelet count is low, or a treatment known to lower platelets is starting.",
  steps: [
    {
      action: "Brush teeth with a very soft toothbrush, softened under hot water, and ask the team before flossing",
      why: "Gums bleed easily when platelets are low; a soft brush cleans without cutting them.",
      source: "nci-chemo-and-you",
      quote: "Brush your teeth with a very soft toothbrush.",
      grade: "Not graded (patient booklet)",
    },
    {
      action: "Use an electric shaver rather than a razor, and take care with scissors, knives and other sharp objects",
      why: "Small cuts bleed for longer when platelets are low.",
      source: "nci-chemo-and-you",
      quote: "Use an electric shaver instead of a razor.",
      grade: "Not graded (patient booklet)",
    },
    {
      action: "Wear shoes at all times, blow the nose gently, and avoid contact sports or activities where an injury is likely",
      why: "Knocks and falls cause bruising and bleeding that may be hard to stop.",
      source: "nci-chemo-and-you",
      quote: "Wear shoes all the time, even inside the house or hospital.",
      grade: "Not graded (patient booklet)",
    },
    {
      action: "Do not use tampons, enemas, suppositories or rectal thermometers, or wear clothes with tight collars, wrists or waistbands",
      why: "These can damage delicate linings and cause bleeding. NCI lists them under 'Things not to do'.",
      source: "nci-chemo-and-you",
      quote: "Use tampons, enemas, suppositories, or rectal thermometers.",
      grade: "Not graded (patient booklet; listed under 'Things not to do')",
    },
    {
      action: "Check with the team before taking aspirin, ibuprofen, other over-the-counter medicines, vitamins, herbs or supplements, or drinking alcohol",
      why: "Aspirin and ibuprofen make bleeding more likely, and some supplements change how treatment works.",
      source: "nci-bleeding-page",
      quote: "Many over-the-counter medicines contain aspirin or ibuprofen, which can increase your risk of bleeding.",
      grade: "Not graded (patient information)",
    },
    {
      action: "Tell the team about constipation, so a stool softener can be prescribed",
      why: "Straining can make the back passage bleed.",
      source: "nci-chemo-and-you",
      quote: "They may prescribe a stool softener to prevent straining and rectal bleeding when you go to the bathroom.",
      grade: "Not graded (patient booklet)",
    },
    {
      action: "If bleeding starts, press firmly on the place with a clean cloth and keep pressing until it stops; put ice on a bruise",
      why: "Steady pressure helps a clot form when there are fewer platelets to make one.",
      source: "nci-bleeding-page",
      quote: "If you start to bleed, press down firmly on the area with a clean cloth. Keep pressing until the bleeding stops.",
      grade: "Not graded (patient information)",
    },
    {
      action: "Call the team straight away for bleeding that does not stop after a few minutes, blood in urine, black or bloody stools, vomiting blood, unusual vaginal bleeding, a bad headache, a change in vision, or new confusion or sleepiness",
      why: "These can be signs of serious bleeding, including bleeding in the brain, and need checking the same day.",
      source: "nci-bleeding-page",
      quote: "Head or vision changes such as bad headaches or changes in how well you see, or if you feel confused or very sleepy.",
      grade: "Not graded (patient information)",
    },
    {
      action: "Expect the team to check the platelet count often, and to decide on medicine, a platelet transfusion or a delay in chemotherapy if it is too low",
      why: "A platelet transfusion or a treatment delay is the team's decision, made on the count and on whether there is bleeding.",
      source: "nci-chemo-and-you",
      quote: "You may need medication, a platelet transfusion, or a delay in your chemotherapy treatment if your platelet count is too low.",
      grade: "Not graded (patient booklet)",
    },
  ],
  bestInClass: {
    statement: "No guideline grades home bleeding precautions; the best available version is the national patient guidance from NCI (2023 booklet, 2022 web page), with Macmillan (2018) agreeing on every point except flossing. Where they differ, NCI's booklet allows a water flosser but not dental floss, and Macmillan says not to floss. The clinical side is graded by its own guidelines: NICE NG24 (2015, updated 2026) offers prophylactic platelet transfusion below 10 x 10^9 per litre to people who are not bleeding or having a procedure, and transfusion for clinically significant bleeding below 30 x 10^9 per litre; ASCO 2018 agrees on prophylactic thresholds and allows transfusion at the first sign of bleeding, rather than prophylactically, for adults after autologous stem cell transplant at experienced centres.",
    sources: ["nci-chemo-and-you", "nci-bleeding-page", "macmillan-chemo-side-effects", "nice-ng24-platelets", "asco-platelet-2018"],
  },
  variants: [
    {
      name: "No flossing at all (Macmillan)",
      differs: "Says to use a soft toothbrush and not to floss, with no mention of a water flosser.",
      evidence: "Patient information, not graded: 'Use a soft toothbrush to protect your gums from bleeding and do not floss.' NCI's booklet instead suggests a water flosser and, in its mouth-care section, says to ask about flossing when platelets are low.",
      sources: ["macmillan-chemo-side-effects", "nci-chemo-and-you"],
    },
    {
      name: "Gloves for housework and gardening (Macmillan)",
      differs: "Adds protective gloves for household and garden work to prevent cuts.",
      evidence: "Patient information, not graded: 'Wear protective gloves when doing work around the house or in the garden.'",
      sources: ["macmillan-chemo-side-effects"],
    },
    {
      name: "Platelet transfusion only when bleeding, after autologous stem cell transplant (ASCO 2018)",
      differs: "Adults after autologous stem cell transplant at experienced centres are transfused at the first sign of bleeding rather than at a set count.",
      evidence: "ASCO 2018, from randomised trials, as stated in the abstract; prophylactic thresholds still apply to children after autologous transplant and to everyone after allogeneic transplant.",
      sources: ["asco-platelet-2018"],
    },
  ],
  grades: [
    { claim: "Home bleeding precautions", grade: "Not graded: patient booklets and web pages give expert advice without a grading scheme", source: "nci-chemo-and-you" },
    { claim: "Prophylactic platelet transfusion below 10 x 10^9 per litre for people who are not bleeding or having a procedure, except in chronic bone marrow failure, autoimmune thrombocytopenia, HIT and TTP", grade: "Not graded (NICE NG24 1.7.3, 'offer'); the threshold's superscript does not survive in the page text, so it is given here in prose", source: "nice-ng24-platelets" },
    { claim: "No routine prophylactic platelet transfusion in chronic bone marrow failure, autoimmune thrombocytopenia, HIT or TTP", grade: "Not graded (NICE NG24 1.7.7)", source: "nice-ng24-platelets", quote: "Do not routinely offer prophylactic platelet transfusions to people with any of the following:" },
    { claim: "No prophylactic platelet transfusion before low-bleeding-risk procedures such as central venous cannulation", grade: "Not graded (NICE NG24 1.7.8, 'do not offer')", source: "nice-ng24-platelets", quote: "Do not offer prophylactic platelet transfusions to people having procedures with a low risk of bleeding, such as adults having central venous cannulation or any people having bone marrow aspiration and trephine biopsy." },
    { claim: "Adults after autologous stem cell transplant may be transfused at the first sign of bleeding", grade: "Based on randomised controlled trials (as stated in the ASCO 2018 abstract; the graded recommendation table was not read)", source: "asco-platelet-2018", quote: "Based on data from randomized controlled trials, adult patients who undergo autologous stem-cell transplantation at experienced centers may receive a platelet transfusion at the first sign of bleeding, rather than prophylactically." },
  ],
  sources: [
    {
      key: "nci-chemo-and-you",
      label: "Chemotherapy and You: Support for People with Cancer",
      publisher: "National Cancer Institute (US)",
      year: 2023,
      url: "https://www.cancer.gov/publications/patient-education/chemotherapy-and-you.pdf",
      gradingScheme: "Patient booklet; recommendations are not graded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "nci-bleeding-page",
      label: "Bleeding and Bruising (Thrombocytopenia) and Cancer Treatment",
      publisher: "National Cancer Institute (US)",
      year: 2022,
      url: "https://www.cancer.gov/about-cancer/treatment/side-effects/bleeding-bruising",
      gradingScheme: "Patient information page; not graded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "macmillan-chemo-side-effects",
      label: "Side effects of chemotherapy",
      publisher: "Macmillan Cancer Support",
      year: 2018,
      url: "https://www.macmillan.org.uk/cancer-information-and-support/treatment/types-of-treatment/chemotherapy/side-effects-of-chemotherapy",
      gradingScheme: "Patient information page; not graded. Reviewed September 2018, next review was due 2021, page marked as under review.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "nice-ng24-platelets",
      label: "Blood transfusion (NG24): platelet transfusion recommendations",
      publisher: "NICE",
      year: 2015,
      url: "https://www.nice.org.uk/guidance/ng24/chapter/Platelet-transfusion",
      gradingScheme: "NICE does not grade recommendations; the wording ('offer', 'consider', 'do not offer') signals strength. Last updated 26 February 2026.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "asco-platelet-2018",
      label: "Platelet Transfusion for Patients With Cancer: American Society of Clinical Oncology Clinical Practice Guideline Update",
      publisher: "ASCO (Journal of Clinical Oncology)",
      year: 2018,
      url: "https://doi.org/10.1200/JCO.2017.76.1734",
      doi: "10.1200/JCO.2017.76.1734",
      gradingScheme: "ASCO evidence quality and recommendation strength; the graded table was not read, only the abstract.",
      read: "abstract",
      accessed: "2026-11-11",
    },
  ],
  terms: ["thrombocytopenia"],
  related: ["oral-mucositis-prevention-and-oral-care", "diet-alcohol-and-weight-during-cancer-treatment"],
  gaps: [
    "No trial has tested whether home bleeding precautions prevent bleeding; every home step here is expert advice, and none is graded.",
    "The sources do not say at what platelet count the precautions should start or stop; that is left to the treating team.",
    "The flossing advice differs between NCI and Macmillan, and neither cites evidence for its position.",
    "Macmillan's chemotherapy side effects page was last reviewed in 2018 and is marked as under review.",
    "Only the abstract of the ASCO 2018 platelet transfusion guideline was read; its graded recommendation table, including its numerical thresholds, was not.",
    "Advice for people taking anticoagulants or antiplatelet drugs while their platelets are low is specific to each team and is not covered by these sources.",
  ],
});
