import { protocol } from "./helpers";

/*
 * Bleeding precautions at home when cancer treatment has lowered the platelet count (thrombocytopenia).
 *
 * First written on 11 November 2026. Second accuracy pass on 17 November 2026: every source was read again as raw
 * text and every claim checked against it; each quote was matched to its source by script (whitespace only).
 * - NCI, Chemotherapy and You (the booklet prints "NIH Publication No. 24-7157, January 2024"; the PDF file itself
 *   was made in December 2023): full text, pdftotext, from a copy another checker fetched from cancer.gov on
 *   17 November 2026; the file on cancer.gov is unchanged since January 2024.
 * - NCI, Bleeding and Bruising (Thrombocytopenia) and Cancer Treatment (web page, reviewed 29 December 2022): full
 *   text, fetched with curl.
 * - Macmillan Cancer Support, Side effects of chemotherapy (web page, reviewed 30 September 2018, marked as being
 *   reviewed): full text, fetched with curl.
 * - NICE NG24, Blood transfusion, platelet transfusion chapter, overview and update information (published 2015,
 *   last updated 26 February 2026): full text, from copies another checker fetched from nice.org.uk on
 *   17 November 2026.
 * - ASCO, Platelet Transfusion for Patients With Cancer (J Clin Oncol 2018): abstract only, through Europe PMC; DOI
 *   resolved through Crossref. The journal page answers a script with a browser check, so the full text was not read.
 * What the second pass changed: the warning signs no longer carry "straight away" or "the same day", which no source
 * read says; Macmillan is no longer said to agree with NCI on every point; ASCO is no longer said to agree with
 * NICE's thresholds, which its abstract does not print; reasons the sources do not give were taken out of the "why"
 * lines; the booklet's year is 2024.
 * The home precautions are expert patient advice from national bodies; no trial has tested them. That is said in the
 * grades and the gaps rather than dressed up.
 */
export const bleedingPrecautionsWhenPlateletsAreLow = protocol({
  id: "bleeding-precautions-when-platelets-are-low",
  name: "Bleeding precautions at home when platelets are low",
  aka: ["thrombocytopenia precautions", "low platelet precautions", "bleeding precautions", "low platelets during chemotherapy", "bruising and bleeding on chemotherapy"],
  domain: "supportive-care",
  tldr: "When chemotherapy lowers the platelets that help blood clot, guidance advises small changes at home: a very soft toothbrush, an electric shaver, shoes on, asking the team before taking aspirin or other shop-bought medicines, and firm pressure on any cut. Call the doctor or nurse about bleeding that does not stop after a few minutes, red or pink urine, black or bloody stools, or a bad headache.",
  simple: "Chemotherapy can lower your platelets, the cells that help blood to clot. Use a very soft toothbrush and an electric shaver, wear shoes, and ask before taking aspirin, any shop-bought medicine or a supplement. Press firmly on a cut until it stops. Call your doctor or nurse if bleeding does not stop after a few minutes, if your urine is red or pink or your stools are black or bloody, or if you get a bad headache or a change in your eyesight.",
  summary: "The home advice comes from national patient guidance: NCI's Chemotherapy and You (2024) and its thrombocytopenia page (reviewed 2022), and Macmillan (2018, being reviewed). The two NCI sources give a very soft toothbrush, an electric shaver, care with sharp objects, shoes at all times, checking with the team before taking aspirin, other over-the-counter medicines, vitamins or herbs, firm pressure on bleeding, telling the doctor about constipation, and a list of signs to call about; the booklet adds gentle nose-blowing and a list of things not to do. Macmillan's shorter list has a soft toothbrush, protective gloves for housework and gardening, and care not to bump into things or trip. They differ on flossing: NCI's booklet says not to use dental floss or toothpicks but suggests a water flosser, its mouth-care section says to ask about flossing when platelets are low, and Macmillan says not to floss. No source read says how quickly to call about a warning sign. None of this advice is graded, and the sources cite no trial of it. Platelet support is a clinical decision. NICE NG24, a general transfusion guideline for people aged 1 year and over rather than a cancer guideline, offers prophylactic platelet transfusion below 10 x 10^9 per litre to people who are not bleeding and not having an invasive procedure or surgery, with exceptions (chronic bone marrow failure, autoimmune thrombocytopenia, HIT, TTP), and transfusion for clinically significant bleeding (WHO grade 2) below 30 x 10^9 per litre. The ASCO 2018 abstract says adults having an autologous stem cell transplant at experienced centres may be transfused at the first sign of bleeding rather than prophylactically.",
  asOf: "2026-11-17",
  setting: {
    who: ["patient-or-carer", "nurse", "doctor"],
    where: ["home", "telephone-triage", "chemotherapy-day-unit"],
  },
  population: "People having chemotherapy or targeted therapy, the two treatments the NCI page names, whose platelet count is low or who are at increased risk of bleeding. The patient sources do not set a platelet count at which the home precautions start, and do not give separate advice for children, for people after a stem cell transplant or for people on anticoagulants; the treating team says what applies.",
  trigger: "The team says the platelet count is low, or a treatment known to lower platelets is starting.",
  steps: [
    {
      action: "Brush teeth with a very soft toothbrush, softened under hot water; use a water flosser rather than dental floss or toothpicks, and ask the team about flossing",
      why: "A low platelet count can cause bleeding in the mouth. The booklet lists dental floss and toothpicks under 'Things not to do', and its mouth-care section says to ask about flossing when platelets are low.",
      source: "nci-chemo-and-you",
      quote: "Brush your teeth with a very soft toothbrush.",
      grade: "Not graded (patient booklet)",
    },
    {
      action: "Use an electric shaver rather than a razor, and take care with scissors, knives and other sharp objects",
      why: "When the platelet count is low, a person may bruise or bleed a lot or very easily, as NCI's web page puts it.",
      source: "nci-chemo-and-you",
      quote: "Use an electric shaver instead of a razor.",
      grade: "Not graded (patient booklet)",
    },
    {
      action: "Wear shoes at all times, blow the nose gently, and do not play sports or do other activities in which you could get hurt",
      why: "The booklet lists these among its ways to manage a low platelet count, without giving a reason for each. Macmillan likewise advises care not to bump into things or trip.",
      source: "nci-chemo-and-you",
      quote: "Wear shoes all the time, even inside the house or hospital.",
      grade: "Not graded (patient booklet)",
    },
    {
      action: "Do not use tampons, enemas, suppositories or rectal thermometers, or wear clothes with tight collars, wrists or waistbands",
      why: "NCI's booklet lists these under 'Things not to do' when platelets are low. It does not give a reason for each.",
      source: "nci-chemo-and-you",
      quote: "Use tampons, enemas, suppositories, or rectal thermometers.",
      grade: "Not graded (patient booklet; listed under 'Things not to do')",
    },
    {
      action: "Check with the team before taking aspirin, ibuprofen, other over-the-counter medicines, vitamins, herbs or supplements, before drinking alcohol, and before having sex",
      why: "Aspirin and ibuprofen can increase the risk of bleeding, and the booklet says some of these products can change how chemotherapy works. The booklet also lists alcohol and sex as things to check first; the web page says the team may advise limiting or avoiding alcohol.",
      source: "nci-bleeding-page",
      quote: "Many over-the-counter medicines contain aspirin or ibuprofen, which can increase your risk of bleeding.",
      grade: "Not graded (patient information)",
    },
    {
      action: "Tell the doctor about constipation; a stool softener may be prescribed",
      why: "A stool softener is to prevent straining and bleeding from the back passage.",
      source: "nci-chemo-and-you",
      quote: "They may prescribe a stool softener to prevent straining and rectal bleeding when you go to the bathroom.",
      grade: "Not graded (patient booklet)",
    },
    {
      action: "If bleeding starts, press firmly on the place with a clean cloth and keep pressing until it stops; put ice on a bruise",
      why: "Platelets are the cells that help blood to clot and stop bleeding. NCI's booklet words the same advice as gentle but firm pressure on any cut until the bleeding stops.",
      source: "nci-bleeding-page",
      quote: "If you start to bleed, press down firmly on the area with a clean cloth. Keep pressing until the bleeding stops.",
      grade: "Not graded (patient information)",
    },
    {
      action: "Call the doctor or nurse about bleeding that does not stop after a few minutes, bleeding from the mouth or nose or when vomiting, red or pink urine, black or bloody stools, vaginal bleeding outside a period or a period that is heavier or longer than normal, a bad headache, a change in vision, or feeling confused or very sleepy",
      why: "NCI calls these more serious problems. Neither NCI source says how quickly to call; the web page suggests asking the team how long to wait for bleeding to stop before calling or going to the emergency room. The booklet also lists bruises, small red spots on the skin and a warm or hot feeling in an arm or leg.",
      source: "nci-bleeding-page",
      quote: "Head or vision changes such as bad headaches or changes in how well you see, or if you feel confused or very sleepy.",
      grade: "Not graded (patient information)",
    },
    {
      action: "Expect the team to check the platelet count often, and to decide on medicine, a platelet transfusion or a delay in chemotherapy if it is too low",
      why: "The booklet says the doctor or nurse will check the platelet count often. Macmillan also says some people may need a platelet transfusion.",
      source: "nci-chemo-and-you",
      quote: "You may need medication, a platelet transfusion, or a delay in your chemotherapy treatment if your platelet count is too low.",
      grade: "Not graded (patient booklet)",
    },
  ],
  bestInClass: {
    statement: "None of the sources read grades home bleeding precautions; the fullest version read is the national patient guidance from NCI (2024 booklet, 2022 web page). Macmillan (2018) gives a shorter list that shares the soft toothbrush and adds protective gloves. Where they differ, NCI's booklet suggests a water flosser but not dental floss, and Macmillan says not to floss. The clinical side has its own guidelines: NICE NG24 (2015, last updated 2026; its platelet recommendations are dated 2015) offers prophylactic platelet transfusion below 10 x 10^9 per litre to people who are not bleeding or having an invasive procedure or surgery, and transfusion for clinically significant bleeding below 30 x 10^9 per litre. The ASCO 2018 abstract says adults having an autologous stem cell transplant at experienced centres may receive a platelet transfusion at the first sign of bleeding rather than prophylactically, and that prophylactic transfusion at defined platelet count thresholds is still recommended for other transplant patients; the abstract does not print the thresholds, so they are not compared with NICE's here.",
    sources: ["nci-chemo-and-you", "nci-bleeding-page", "macmillan-chemo-side-effects", "nice-ng24-platelets", "asco-platelet-2018"],
  },
  variants: [
    {
      name: "No flossing at all (Macmillan)",
      differs: "Says to use a soft toothbrush and not to floss, and does not mention a water flosser.",
      evidence: "Patient information, not graded: 'Use a soft toothbrush to protect your gums from bleeding and do not floss.' NCI's booklet instead suggests a water flosser, lists dental floss and toothpicks under 'Things not to do' and, in its mouth-care section, says to ask about flossing when platelets are low.",
      sources: ["macmillan-chemo-side-effects", "nci-chemo-and-you"],
    },
    {
      name: "Gloves for housework and gardening (Macmillan)",
      differs: "Adds protective gloves for work around the house or in the garden, as a tip for avoiding injury.",
      evidence: "Patient information, not graded: 'Wear protective gloves when doing work around the house or in the garden.'",
      sources: ["macmillan-chemo-side-effects"],
    },
    {
      name: "Platelet transfusion only when bleeding, after autologous stem cell transplant (ASCO 2018)",
      differs: "Adults having an autologous stem cell transplant at experienced centres may be transfused at the first sign of bleeding rather than prophylactically.",
      evidence: "ASCO 2018, based on data from randomised controlled trials, as stated in the abstract; prophylactic transfusion at defined platelet count thresholds is still recommended for children having an autologous transplant and for adults and children having an allogeneic transplant. NICE NG24 makes no such exception.",
      sources: ["asco-platelet-2018", "nice-ng24-platelets"],
    },
  ],
  grades: [
    { claim: "Home bleeding precautions", grade: "Not graded: patient booklets and web pages give expert advice without a grading scheme", source: "nci-chemo-and-you" },
    { claim: "Prophylactic platelet transfusion below 10 x 10^9 per litre for people who are not bleeding or having invasive procedures or surgery, except in chronic bone marrow failure, autoimmune thrombocytopenia, HIT and TTP", grade: "Not graded (NICE NG24 1.7.3, 'offer'); the threshold's superscript does not survive in the page text, so it is given here in prose", source: "nice-ng24-platelets" },
    { claim: "No routine prophylactic platelet transfusion in chronic bone marrow failure, autoimmune thrombocytopenia, HIT or TTP", grade: "Not graded (NICE NG24 1.7.7)", source: "nice-ng24-platelets", quote: "Do not routinely offer prophylactic platelet transfusions to people with any of the following:" },
    { claim: "No prophylactic platelet transfusion before low-bleeding-risk procedures such as central venous cannulation", grade: "Not graded (NICE NG24 1.7.8, 'do not offer')", source: "nice-ng24-platelets", quote: "Do not offer prophylactic platelet transfusions to people having procedures with a low risk of bleeding, such as adults having central venous cannulation or any people having bone marrow aspiration and trephine biopsy." },
    { claim: "Adults having an autologous stem cell transplant at experienced centres may be transfused at the first sign of bleeding", grade: "Based on randomised controlled trials (as stated in the ASCO 2018 abstract; the graded recommendation table was not read)", source: "asco-platelet-2018", quote: "Based on data from randomized controlled trials, adult patients who undergo autologous stem-cell transplantation at experienced centers may receive a platelet transfusion at the first sign of bleeding, rather than prophylactically." },
  ],
  sources: [
    {
      key: "nci-chemo-and-you",
      label: "Chemotherapy and You: Support for People with Cancer",
      publisher: "National Cancer Institute (US)",
      year: 2024,
      url: "https://www.cancer.gov/publications/patient-education/chemotherapy-and-you.pdf",
      gradingScheme: "Patient booklet; recommendations are not graded. Printed as NIH Publication No. 24-7157, January 2024.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "nci-bleeding-page",
      label: "Bleeding and Bruising (Thrombocytopenia) and Cancer Treatment",
      publisher: "National Cancer Institute (US)",
      year: 2022,
      url: "https://www.cancer.gov/about-cancer/treatment/side-effects/bleeding-bruising",
      gradingScheme: "Patient information page; not graded. Reviewed 29 December 2022.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "macmillan-chemo-side-effects",
      label: "Side effects of chemotherapy",
      publisher: "Macmillan Cancer Support",
      year: 2018,
      url: "https://www.macmillan.org.uk/cancer-information-and-support/treatment/types-of-treatment/chemotherapy/side-effects-of-chemotherapy",
      gradingScheme: "Patient information page; not graded. Reviewed September 2018, next review was due 2021, page marked as under review.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "nice-ng24-platelets",
      label: "Blood transfusion (NG24): platelet transfusion recommendations",
      publisher: "NICE",
      year: 2015,
      url: "https://www.nice.org.uk/guidance/ng24/chapter/Platelet-transfusion",
      gradingScheme: "NICE does not grade recommendations; the wording ('offer', 'consider', 'do not offer') signals strength. Last updated 26 February 2026, for tranexamic acid in surgery; the platelet recommendations are marked [2015]. A general guideline for people aged 1 year and over, not specific to cancer.",
      read: "full-text",
      accessed: "2026-11-17",
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
      accessed: "2026-11-17",
    },
  ],
  terms: ["thrombocytopenia"],
  related: ["oral-mucositis-prevention-and-oral-care", "diet-alcohol-and-weight-during-cancer-treatment"],
  gaps: [
    "The patient sources cite no trial of home bleeding precautions; every home step here is expert advice, and none is graded.",
    "On 17 November 2026 no source read said how quickly to call about a warning sign: NCI says to call the doctor or nurse and suggests asking the team how long to wait for bleeding to stop before calling or going to the emergency room; Macmillan says to tell the doctor or nurse about unexplained bruising or bleeding. The earlier wording 'straight away' and 'the same day' has been removed. The team's own contact instructions come first.",
    "The sources do not say at what platelet count the precautions should start or stop; that is left to the treating team.",
    "The flossing advice differs between NCI and Macmillan, and neither cites evidence for its position.",
    "Macmillan's chemotherapy side effects page was last reviewed on 30 September 2018, was due for review in 2021, and on 17 November 2026 still said it was being reviewed.",
    "Only the abstract of the ASCO 2018 platelet transfusion guideline was read; on 17 November 2026 the journal page still answered a script with a browser check and Europe PMC lists no open copy. Its graded recommendation table, including its numerical thresholds, was not read, and Crossref records a correction to the paper dated June 2018 that was not read either. No later ASCO edition was found in Europe PMC or Crossref.",
    "A newer platelet transfusion guideline from another body exists (AABB and ICTMG, JAMA 2025, DOI 10.1001/jama.2025.7529, title checked through Crossref). It is not cited for any claim here; the page on red cell and platelet transfusion thresholds covers it.",
    "NICE NG24 is a general transfusion guideline and makes no recommendations for specific conditions such as cancer; its platelet recommendations date from 2015.",
    "Advice for people taking anticoagulants or antiplatelet drugs while their platelets are low is specific to each team and is not covered by these sources.",
  ],
});
