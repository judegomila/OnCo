import { protocol } from "./helpers";

/*
 * Primary and secondary prophylaxis with granulocyte colony-stimulating factor (G-CSF) by the risk of febrile
 * neutropenia.
 *
 * First written on 11 November 2026. Second accuracy pass on 17 November 2026: every source was fetched again raw
 * (curl, the Europe PMC REST API, pdftotext for PDFs, DailyMed SPL XML) and every claim re-read against the text;
 * every quote was checked by script against the saved text, normalising only whitespace and line-break hyphenation.
 * What was read, and how:
 * - NICE CG151, Neutropenic sepsis (published 19 September 2012; recommendation 1.2.1.1 updated January 2020 and
 *   September 2024, 1.2.1.2 updated September 2024): recommendations and update pages, HTML, full text, re-used from
 *   a sibling checker's copy fetched from nice.org.uk on 17 November. Recommendation 1.2.1.3 on G-CSF is unchanged
 *   since 2012. The 2012 full guideline PDF (pdftotext), for the reasoning behind 1.2.1.3, re-used from a sibling's
 *   copy fetched on 16 November.
 * - ASCO, WBC Growth Factors: ASCO Guideline Update (J Clin Oncol 2026): NEW in this pass. The first pass said no
 *   ASCO update after 2015 was found; Europe PMC now lists this one (PMID 41740078, published 25 February 2026).
 *   Abstract only; ascopubs.org returned 403.
 * - ASCO 2015 update (Smith et al.): abstract only, from Europe PMC. Now the superseded edition.
 * - EORTC 2010 G-CSF guideline update (Aapro et al., Eur J Cancer 2011): abstract only, from Europe PMC;
 *   ejcancer.com returned 403. No later EORTC edition was found in Europe PMC.
 * - SEOM 2018 febrile neutropenia guideline (Clin Transl Oncol 2019, PMC6339667, CC BY): full text XML from Europe
 *   PMC, re-used from a sibling's copy fetched on 16 November. NEW in this pass: it is the one guideline read in full
 *   that grades its G-CSF recommendations.
 * - AGIHO/DGHO G-CSF guideline update (Eur J Cancer 2026): abstract only, from Europe PMC. Crossref lists a CC BY
 *   licence, but ejcancer.com and sciencedirect.com returned 403 and Europe PMC holds no full text.
 * - NCCN Guidelines Insights, Hematopoietic Growth Factors version 1.2022: abstract from Europe PMC; jnccn.org
 *   answered with an empty bot-check response. The public nccn.org page lists the current guideline as Version
 *   1.2027; its content needs a login.
 * - ESMO 2016 febrile neutropenia guideline: not readable (publisher 403 on 16 November for a sibling; one Internet
 *   Archive request on 17 November returned 429). DOI and title confirmed through Crossref.
 * - Product information, NEW in this pass, for doses and timing: Neulasta (pegfilgrastim) and Zarzio (filgrastim)
 *   EU product information PDFs from ema.europa.eu; Neulasta and Neupogen US prescribing information from DailyMed.
 * Every DOI was resolved through Crossref and Europe PMC and its title checked. Quotes are copied from the raw text
 * with nothing changed.
 */
export const gCsfProphylaxisByFebrileNeutropeniaRisk = protocol({
  id: "g-csf-prophylaxis-by-febrile-neutropenia-risk",
  name: "G-CSF prophylaxis by febrile neutropenia risk",
  aka: ["primary G-CSF prophylaxis", "secondary G-CSF prophylaxis", "pegfilgrastim after chemotherapy", "filgrastim injections", "white cell growth factor injections"],
  domain: "supportive-care",
  tldr: "Some chemotherapy lowers the white cells that fight infection. If your treatment carries a high risk of a fever with low white cells, or you had one on an earlier cycle, you may be given injections of a growth factor (G-CSF) after each cycle to help your white cells recover. Bone pain is a very common side effect, and your team can tell you what to take for it.",
  simple: "Some chemotherapy lowers the cells that fight germs. A small injection after treatment can help these cells come back faster. It is given to people at high risk.",
  summary: "Primary prophylaxis with G-CSF is warranted when the risk of febrile neutropenia from chemotherapy is about 20 per cent or higher and no equally effective and safe regimen that does not need it is available (ASCO 2026, the same threshold as its 2015 edition). EORTC 2010 continues to recommend it for regimens at high risk (20 per cent or more), and SEOM 2018 recommends it when the probability exceeds 20 per cent [I, A]. Below 20 per cent the wording differs. ASCO 2026 says prophylaxis may be warranted if the person is at high risk because of age, medical history or disease characteristics. EORTC asks for particular attention to patient risk factors, such as age 65 or over and the neutrophil count, with regimens at 10 to 20 per cent. SEOM says the decision at 10 to 20 per cent must be individualised [II, A], and lists age over 65, liver or kidney dysfunction, widespread bone marrow involvement, recent extensive surgery, persistent neutropenia and earlier febrile neutropenia. After an episode of febrile neutropenia, EORTC says patients should receive G-CSF in later cycles; SEOM recommends this secondary prophylaxis where delaying or lowering the dose can harm survival [I, A]. EORTC also recommends G-CSF support where dose-dense or dose-intense chemotherapy has a survival benefit, and says it may be used to maintain chemotherapy where a lower dose intensity is known to carry a poor prognosis.\n\nNICE CG151 takes a different line: do not routinely offer G-CSF to prevent neutropenic sepsis unless it is an integral part of the regimen or needed to maintain dose intensity. Its guideline group reached this on cost-effectiveness, and did not review G-CSF used in those two ways. Doses come from the product information. Pegfilgrastim is one 6 mg injection under the skin each cycle, at least 24 hours after chemotherapy (EU and US); the US label adds that it is not to be given in the 14 days before chemotherapy. Filgrastim is 5 micrograms per kg a day, first given at least 24 hours after chemotherapy and continued until the expected lowest count has passed and the neutrophil count has recovered, which the EU product information expects to take up to 14 days after standard chemotherapy. SEOM gives the same filgrastim dose, started 24 to 72 hours after chemotherapy [I, A]. EORTC says filgrastim, lenograstim and pegfilgrastim all work, that filgrastim biosimilars are approved in Europe, and that the choice is a matter of clinical judgement; it notes audit evidence that some patients receive suboptimal daily G-CSF, which pegfilgrastim, given once per cycle, may avoid. The AGIHO 2026 update says it confirms most of the key recommendations of 2014 and adds recommendations for immunotherapy settings.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "pharmacist", "nurse", "patient-or-carer"],
    where: ["outpatient-clinic", "chemotherapy-day-unit", "home"],
  },
  population: "Adults having chemotherapy for solid tumours or lymphoproliferative cancers (the scope of EORTC 2010; SEOM 2018 covers adults with solid tumours). This page does not cover acute myeloid leukaemia, myelodysplastic syndromes, stem cell mobilisation or children: ASCO 2015 did not address AML or MDS, ASCO 2026 covers stem cell mobilisation separately, and the EU product information for pegfilgrastim is for adults and excludes chronic myeloid leukaemia and myelodysplastic syndromes.",
  trigger: "A chemotherapy regimen is planned, and again before each cycle.",
  steps: [
    {
      action: "Before the first cycle, find the regimen's risk of febrile neutropenia: high (20 per cent or more), intermediate (10 to 20 per cent) or below that",
      why: "The regimen's own risk is the starting point for deciding whether G-CSF is needed.",
      source: "eortc-2010",
      quote: "We provide an expanded list of common chemotherapy regimens considered to have a high (≥20%) or intermediate (10-20%) risk of FN.",
    },
    {
      action: "Add the person's own risk factors, such as age 65 or over and the neutrophil count, and reassess before every cycle",
      why: "The person's own factors add to the regimen's risk, and EORTC asks for the overall risk to be judged again before each cycle.",
      source: "eortc-2010",
      quote: "We recommend that patient-related adverse risk factors, such as elderly age (≥65 years) and neutrophil count be evaluated in the overall assessment of FN risk before administering each cycle of chemotherapy.",
    },
    {
      action: "Give G-CSF from the first cycle when the risk of febrile neutropenia from the chemotherapy is about 20 per cent or more and no equally effective and safe regimen without it is available",
      why: "ASCO calls prophylaxis warranted at this level of risk; EORTC and SEOM recommend it for regimens at or above 20 per cent.",
      source: "asco-2026",
      quote: "Prophylactic use of CSFs to reduce the risk of febrile neutropenia is warranted when the risk of febrile neutropenia from chemotherapy is approximately 20% or higher and no other equally effective and safe regimen that does not require CSFs is available.",
    },
    {
      action: "For a regimen with a risk below 20 per cent, weigh the person's risk factors; G-CSF may be warranted if they put the person at high risk",
      why: "Age, medical history and the disease itself can put a person at high risk on a regimen that is not high risk for most people. ASCO says prophylaxis may be warranted then; SEOM says the decision at 10 to 20 per cent must be made person by person.",
      source: "asco-2026",
      quote: "For patients receiving chemotherapy with a <20% risk of febrile neutropenia, primary prophylaxis with a CSF may be warranted if patients are at a high risk of febrile neutropenia based on age, medical history, or disease characteristics.",
    },
    {
      action: "After an episode of febrile neutropenia, give G-CSF in the following cycles",
      why: "EORTC calls this important after a previous episode. SEOM recommends it where delaying or lowering the chemotherapy dose instead could harm survival.",
      source: "eortc-2010",
      quote: "It is important that after a previous episode of FN, patients receive prophylactic administration of G-CSF in subsequent cycles.",
    },
    {
      action: "Where NICE guidance applies, do not offer G-CSF routinely to adults on chemotherapy unless it is an integral part of the regimen or needed to maintain dose intensity",
      why: "NICE's guideline group did not recommend routine G-CSF because its economic model found the cost too high for the benefit. It did not review G-CSF used as part of a regimen or to keep the dose, and left those uses in place.",
      source: "nice-cg151",
      quote: "Do not routinely offer G-CSF for the prevention of neutropenic sepsis in adults receiving chemotherapy unless they are receiving G-CSF as an integral part of the chemotherapy regimen or in order to maintain dose intensity.",
    },
    {
      action: "Give G-CSF support with a dose-dense or dose-intense regimen where that regimen has a survival benefit",
      why: "Some regimens can only be given on schedule with G-CSF; EORTC recommends the support where the more intense schedule improves survival.",
      source: "eortc-2010",
      quote: "In situations where dose-dense or dose-intense chemotherapy strategies have survival benefits, prophylactic G-CSF support is recommended.",
    },
    {
      action: "Choose filgrastim (or a biosimilar), lenograstim or pegfilgrastim",
      why: "EORTC recommends any of the three and leaves the choice to clinical judgement. Pegfilgrastim is one injection a cycle; the others are a course of daily injections.",
      source: "eortc-2010",
      quote: "Clinical evidence shows that filgrastim, lenograstim and pegfilgrastim have clinical efficacy and we recommend the use of any of these agents to prevent FN and FN-related complications where indicated.",
    },
    {
      action: "Give pegfilgrastim as one 6 mg injection under the skin each cycle, at least 24 hours after the chemotherapy",
      why: "The cells that G-CSF pushes to divide may be sensitive to chemotherapy, so the product information keeps the two apart.",
      source: "pegfilgrastim-eu",
      quote: "One 6 mg dose (a single pre-filled syringe) of Neulasta is recommended for each chemotherapy cycle, given at least 24 hours after cytotoxic chemotherapy.",
    },
    {
      action: "Give filgrastim at 5 micrograms per kg a day, first dose at least 24 hours after the chemotherapy, and continue daily until the expected lowest count has passed and the neutrophil count has recovered",
      why: "The count rises briefly a day or two after starting, which is not the recovery; the product information says not to stop before the expected lowest point has passed.",
      source: "filgrastim-eu",
      quote: "The recommended dose of filgrastim is 0.5 MU/kg/day (5 mcg/kg/day). The first dose of filgrastim should be administered at least 24 hours after cytotoxic chemotherapy.",
    },
    {
      action: "Tell the person what to report to their team: pain in the upper left of the tummy or at the tip of the shoulder, a cough with fever and difficulty breathing, signs of allergy, or rapid swelling or puffiness",
      why: "The patient leaflet lists these as possible signs of serious problems, such as a problem with the spleen. Bone pain is very common, and the team can advise what to take for it.",
      source: "pegfilgrastim-eu",
      quote: "if you get left upper abdominal pain or pain at the tip of your shoulder. This may be a sign of a problem with your spleen (splenomegaly).",
    },
  ],
  bestInClass: {
    statement: "ASCO (2026, the most recent edition, read as an abstract), EORTC (2010) and SEOM (2018) put the threshold for primary prophylaxis in the same place: a risk of febrile neutropenia of about 20 per cent or more. They differ below it. ASCO 2026 says prophylaxis may be warranted for people at high risk on a regimen below 20 per cent, a softer wording than its 2015 abstract, which said primary prophylaxis is recommended for patients at high risk on the basis of age, medical history, disease characteristics and the myelotoxicity of the regimen. EORTC asks for particular attention to patient risk factors at 10 to 20 per cent, and SEOM says the decision must be individualised [II, A]. For secondary prophylaxis, EORTC says patients should receive G-CSF after an episode, and SEOM recommends it where delaying or lowering the dose can harm survival [I, A]. NICE CG151 does not use a risk threshold: it says no routine G-CSF unless it is integral to the regimen or needed to maintain dose intensity, and offers a fluoroquinolone to adults in whom significant neutropenia is expected. Only SEOM's grades could be read; the ASCO, EORTC and AGIHO grades are in full texts that could not be reached, and neither NCCN's current version nor ESMO's guideline could be read.",
    sources: ["asco-2026", "asco-2015", "eortc-2010", "seom-2018", "nice-cg151", "agiho-2026", "nccn-2022"],
  },
  variants: [
    {
      name: "Antibiotic prophylaxis rather than G-CSF (NICE CG151)",
      differs: "NICE offers a fluoroquinolone, during the expected period of neutropenia only, to adults with acute leukaemias, stem cell transplants or solid tumours in whom a neutrophil count of 0.5 × 10⁹ per litre or lower is expected from chemotherapy. It points to the MHRA January 2024 advice on fluoroquinolone risks, and does not offer G-CSF routinely.",
      evidence: "NICE recommendations are not graded; the G-CSF recommendation dates from 2012. The full guideline rates the evidence comparing growth factors with placebo as low quality, showing no difference in short-term mortality, and bases the recommendation on its cost-effectiveness analysis.",
      sources: ["nice-cg151", "nice-cg151-full"],
    },
    {
      name: "G-CSF as treatment once febrile neutropenia has started (SEOM 2018)",
      differs: "This is treatment, not prevention. SEOM recommends G-CSF during an episode for patients at high risk of infectious complications: a neutrophil count below 100 per cubic millimetre, or adverse factors such as age over 65, instability, serious complications or widespread infection. It does not recommend routine use during an episode, because, although it shortens duration and hospital stay, it does not improve survival.",
      evidence: "Graded I, A by SEOM for the high-risk group. What ASCO, ESMO and NCCN say on this could not be read.",
      sources: ["seom-2018"],
    },
    {
      name: "Timing limits and radiotherapy cautions in the US labels",
      differs: "The US pegfilgrastim label says not to give it between 14 days before and 24 hours after chemotherapy; the EU product information says at least 24 hours after, and notes that in trials it was given safely 14 days before chemotherapy. The US filgrastim label says not to give it in the 24 hours before chemotherapy, and to avoid using it at the same time as chemotherapy and radiation therapy. Both pegfilgrastim texts report that myelodysplastic syndrome and acute myeloid leukaemia have been associated with its use alongside chemotherapy, radiotherapy or both in people with breast or lung cancer, and ask for monitoring.",
      evidence: "Regulatory labels, not graded. The US filgrastim label says its safety and efficacy have not been evaluated in patients receiving concurrent radiation therapy.",
      sources: ["pegfilgrastim-us", "pegfilgrastim-eu", "filgrastim-us"],
    },
    {
      name: "Dose-dense regimens only with convincing evidence (ASCO 2015)",
      differs: "The 2015 ASCO edition said dose-dense regimens that require G-CSF should only be used within an appropriately designed clinical trial or if supported by convincing efficacy data. The 2026 abstract does not repeat the sentence, and the 2026 full text could not be read.",
      evidence: "From the abstract of the superseded 2015 edition; not graded in the abstract.",
      sources: ["asco-2015", "asco-2026"],
    },
    {
      name: "G-CSF guidance for immunotherapy settings (AGIHO 2026)",
      differs: "Adds recommendations on G-CSF in immunotherapy settings and on new G-CSF formulations, alongside the key 2014 recommendations it says it mostly confirms.",
      evidence: "Levels of evidence and strengths of recommendation set by ESCMID criteria after a literature search from January 2014 to December 2024; read as an abstract only, so the recommendations themselves are not given here.",
      sources: ["agiho-2026"],
    },
  ],
  grades: [
    { claim: "Primary prophylaxis when the probability of febrile neutropenia exceeds 20 per cent", grade: "I, A", source: "seom-2018", quote: "Primary prophylaxis with filgrastim, pegfilgrastim, or biosimilar drugs is recommended when the probability of FN exceeds 20%" },
    { claim: "At intermediate risk (10 to 20 per cent) the decision is individualised", grade: "II, A", source: "seom-2018", quote: "The indication for primary prophylaxis with filgrastim, pegfilgrastim, or biosimilar drugs in patients with intermediate risk for neutropenic fever (10–20%) should be individualized." },
    { claim: "Secondary prophylaxis after an episode, where delaying or lowering the dose can harm survival", grade: "I, A", source: "seom-2018", quote: "Secondary prophylaxis with filgrastim, pegfilgrastim, or biosimilar drugs is recommended in patients with a previous episode of FN in whom delaying or lowering the dose can negatively impact survival" },
    { claim: "Filgrastim 5 micrograms per kg a day under the skin, started 24 to 72 hours after chemotherapy, until a sufficient and stable neutrophil count after the lowest point", grade: "I, A", source: "seom-2018" },
    { claim: "G-CSF as treatment during an episode of febrile neutropenia, for patients at high risk of infectious complications", grade: "I, A", source: "seom-2018" },
  ],
  sources: [
    { key: "nice-cg151", label: "Neutropenic sepsis: prevention and management in people with cancer (CG151), recommendations", publisher: "NICE", year: 2012, url: "https://www.nice.org.uk/guidance/cg151/chapter/Recommendations", gradingScheme: "NICE does not grade recommendations; the strength is in the wording ('offer', 'do not routinely offer').", read: "full-text", accessed: "2026-11-17" },
    { key: "nice-cg151-full", label: "Neutropenic sepsis: prevention and management of neutropenic sepsis in cancer patients, full guideline and evidence review", publisher: "NICE (National Collaborating Centre for Cancer)", year: 2012, url: "https://www.nice.org.uk/guidance/cg151/evidence/full-guideline-pdf-188303581", gradingScheme: "Evidence for each question rated with GRADE as high, moderate, low or very low; recommendations themselves are not graded.", read: "full-text", accessed: "2026-11-16" },
    { key: "asco-2026", label: "WBC Growth Factors: ASCO Guideline Update", publisher: "ASCO, Journal of Clinical Oncology", year: 2026, url: "https://europepmc.org/abstract/MED/41740078", doi: "10.1200/JCO-25-02938", read: "abstract", accessed: "2026-11-17" },
    { key: "asco-2015", label: "Recommendations for the Use of WBC Growth Factors: American Society of Clinical Oncology Clinical Practice Guideline Update (superseded by the 2026 update)", publisher: "ASCO, Journal of Clinical Oncology", year: 2015, url: "https://europepmc.org/abstract/MED/26169616", doi: "10.1200/JCO.2015.62.3488", read: "abstract", accessed: "2026-11-17" },
    { key: "eortc-2010", label: "2010 update of EORTC guidelines for the use of granulocyte-colony stimulating factor to reduce the incidence of chemotherapy-induced febrile neutropenia in adult patients with lymphoproliferative disorders and solid tumours", publisher: "EORTC, European Journal of Cancer", year: 2011, url: "https://europepmc.org/abstract/MED/21095116", doi: "10.1016/j.ejca.2010.10.013", read: "abstract", accessed: "2026-11-17" },
    { key: "seom-2018", label: "SEOM clinical practice guideline: management and prevention of febrile neutropenia in adults with solid tumors (2018)", publisher: "Spanish Society of Medical Oncology (SEOM), Clinical and Translational Oncology", year: 2019, url: "https://europepmc.org/article/PMC/PMC6339667", doi: "10.1007/s12094-018-1983-4", gradingScheme: "Infectious Diseases Society of America-US Public Health Service grading system, printed as level of evidence (I to III) and grade of recommendation (letter), for example II, A.", read: "full-text", accessed: "2026-11-16" },
    { key: "agiho-2026", label: "Evidence-based AGIHO guideline update on prophylaxis of infectious complications with granulocyte-stimulating factors (G-CSF) for the treatment of adult patients with cancer", publisher: "AGIHO of the German Society of Hematology and Medical Oncology (DGHO), European Journal of Cancer", year: 2026, url: "https://europepmc.org/abstract/MED/41570611", doi: "10.1016/j.ejca.2026.116244", gradingScheme: "ESCMID criteria for level of evidence and strength of recommendation (not read).", read: "abstract", accessed: "2026-11-17" },
    { key: "nccn-2022", label: "NCCN Guidelines Insights: Hematopoietic Growth Factors, Version 1.2022 (the current NCCN guideline is Version 1.2027, behind a login)", publisher: "NCCN, Journal of the National Comprehensive Cancer Network", year: 2022, url: "https://europepmc.org/abstract/MED/35545171", doi: "10.6004/jnccn.2022.0026", read: "abstract", accessed: "2026-11-17" },
    { key: "esmo-2016", label: "Management of febrile neutropaenia: ESMO Clinical Practice Guidelines", publisher: "ESMO, Annals of Oncology", year: 2016, url: "https://doi.org/10.1093/annonc/mdw325", doi: "10.1093/annonc/mdw325", read: "not-reachable", accessed: "2026-11-17" },
    { key: "pegfilgrastim-eu", label: "Neulasta (pegfilgrastim) EU product information: summary of product characteristics and package leaflet (EMA EPAR, as downloaded; the PDF prints no revision date and its file date is 10 July 2024)", publisher: "European Medicines Agency", year: 2024, url: "https://www.ema.europa.eu/en/documents/product-information/neulasta-epar-product-information_en.pdf", gradingScheme: "Regulatory label; no grading.", read: "full-text", accessed: "2026-11-17" },
    { key: "filgrastim-eu", label: "Zarzio (filgrastim, a biosimilar) EU product information: summary of product characteristics (EMA EPAR, as downloaded; the PDF prints no revision date and its file date is October 2026)", publisher: "European Medicines Agency", year: 2026, url: "https://www.ema.europa.eu/en/documents/product-information/zarzio-epar-product-information_en.pdf", gradingScheme: "Regulatory label; no grading.", read: "full-text", accessed: "2026-11-17" },
    { key: "pegfilgrastim-us", label: "Neulasta (pegfilgrastim) US prescribing information, DailyMed (Amgen, revised August 2026)", publisher: "Amgen / US FDA (DailyMed)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=fdfe5d72-6b80-435a-afa4-c5d74dd852ce", gradingScheme: "Regulatory label; no grading.", read: "full-text", accessed: "2026-11-17" },
    { key: "filgrastim-us", label: "Neupogen (filgrastim) US prescribing information, DailyMed (Amgen, revised July 2026)", publisher: "Amgen / US FDA (DailyMed)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=97cc73cc-b5b7-458a-a933-77b00523e193", gradingScheme: "Regulatory label; no grading.", read: "full-text", accessed: "2026-11-17" },
  ],
  upgrades: [],
  gaps: [
    "On 17 November 2026 the full texts of ASCO 2026, ASCO 2015, EORTC 2010 and AGIHO 2026 could not be read (the publishers' sites returned 403), so each was read as an abstract. Their grades, their lists of high-risk regimens and their advice on timing, on use during chemoradiotherapy and on treating an established episode are not given here. The ASCO 2026 abstract says the guideline gives information on dosing and selection of G-CSF products; that part was not read.",
    "ASCO published a new edition in 2026, which this page now follows for the 20 per cent threshold. Whether it keeps the 2015 sentence on dose-dense regimens, and what it says about secondary prophylaxis, could not be checked from the abstract.",
    "The AGIHO 2026 update is the most recent European guideline found; its individual recommendations and grades were not in the abstract.",
    "NCCN's current Hematopoietic Growth Factors guideline is Version 1.2027 on nccn.org and requires a login; the 2022 Insights paper is older, its abstract states no threshold, and jnccn.org did not serve the full text to a script on 17 November 2026. NCCN's position is therefore not given here.",
    "ESMO's 2016 febrile neutropenia guideline could not be read on 16 or 17 November 2026 (the publisher returned 403 and the Internet Archive 429), so ESMO's position and grades are not given here. No later ESMO edition and no later EORTC edition was found in Europe PMC.",
    "Giving pegfilgrastim on the same day as chemotherapy, rather than the next day, is not addressed by any source read: the EU and US product information both say at least 24 hours after chemotherapy.",
    "The filgrastim dose is taken from one product's EU information (Zarzio, a biosimilar) and the US Neupogen label; other filgrastim products, lenograstim and the newer long-acting products were not read. The pegfilgrastim and filgrastim EU PDFs print no revision date.",
    "No source read gives a list of which regimens fall above 20 per cent; EORTC 2010 publishes one, which was not read.",
    "No source read sets a time limit for reporting the warning signs in the pegfilgrastim leaflet; it says to tell the doctor immediately about rapid swelling or puffiness and to talk to the doctor, pharmacist or nurse about the others.",
    "A Japanese guideline on G-CSF (2022) exists and was not read. The sources read do not cover G-CSF with immunotherapy combinations, where AGIHO 2026 says it adds recommendations.",
  ],
  institutions: ["nice", "asco"],
  technologies: ["g-csf-growth-factors"],
  drugs: ["filgrastim", "pegfilgrastim", "lenograstim"],
  terms: ["febrile-neutropenia", "neutropenia"],
  related: ["febrile-neutropenia-first-hour"],
  sections: ["supportive-care"],
  tags: ["protocol", "neutropenia", "supportive-care"],
});
