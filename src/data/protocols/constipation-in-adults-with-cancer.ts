import { protocol } from "./helpers";

/*
 * Assessing, preventing and treating constipation in adults with cancer, including opioid-induced constipation and
 * constipation from vincristine.
 *
 * The two guidelines written for this subject could not be read in full, and the page says so. What follows rests on
 * the US National Cancer Institute's PDQ summaries, NICE, and one drug label.
 *
 * What was read, and how (all on 16 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - NCI PDQ, Gastrointestinal Complications, health professional version (updated 3 April 2025): full text, the
 *   cancer.gov page stripped to text. Sections on constipation, faecal impaction and bowel obstruction.
 * - NCI PDQ, Cancer Pain, health professional version (updated 24 April 2025): full text, same method. The section on
 *   constipation as an opioid adverse effect.
 * - NICE CG140, Palliative care for adults: strong opioids for pain relief (published 23 May 2012, last updated
 *   3 August 2016): recommendations page, full text.
 * - NICE TA345 (naloxegol, 22 July 2015) and TA651 (naldemedine, 30 September 2020): the recommendations chapters,
 *   full text.
 * - Vincristine sulfate injection, US prescribing information (Hospira; DailyMed SPL XML, setid
 *   b22e4c8e-dbe1-4d4b-a026-e1812974071c): full text.
 * - ESMO Clinical Practice Guidelines on constipation in advanced cancer (Larkin et al., Ann Oncol 2018): not
 *   reachable. annalsofoncology.org and academic.oup.com returned 403 to a script, the link on ESMO's own guideline
 *   page leads to the same blocked PDF, Europe PMC holds no abstract or full text, and no open copy was found. Named
 *   in sources; no step rests on it.
 * - MASCC recommendations on constipation in advanced cancer (Davies et al., Support Care Cancer 2020): abstract only.
 *   link.springer.com serves a preview of subscription content. The abstract says there are 15 recommendations and
 *   does not list them, so no step rests on it.
 * - Cochrane reviews CD003448.pub4 (laxatives in palliative care, 2015) and CD006332.pub4 (mu-opioid antagonists,
 *   2022): abstract and plain language summary only (NCBI E-utilities efetch, db=pmc, returns the abstract for
 *   PMC6956627 and PMC9476137).
 * - Farmer et al., United European Gastroenterol J 2019, European expert consensus on opioid-induced constipation:
 *   abstract only (PMC6374852 through the same service). The record lists Kyowa Hakko Kirin as funder. Named as a variant only.
 * - NICE CKS (palliative care, constipation) returned 403 to a script; not read, not cited. ASCO has no open guideline
 *   on constipation that was found; NCCN sits behind a login. The ONS constipation guidelines (2020) are not open.
 * - Read and not used: Müller-Lissner et al., Pain Med 2017 (funded by Mundipharma, with paid editorial assistance)
 *   and Sarrió et al., BMC Palliat Care 2021 (sponsored by Kyowa Kirin).
 *
 * Antibody-drug conjugates and 5-HT3 antiemetics: the corpus records constipation as a common side effect of several
 * antibody-drug conjugates, and the PDQ pain summary says serotonin antagonists such as ondansetron can worsen
 * constipation in people on opioids. No source read gives a management rule specific to either, so they are named in
 * gaps and not in `drugs`.
 *
 * Every DOI was resolved through Crossref or Europe PMC and its title checked. Quotes are copied from the raw text with
 * line breaks joined and nothing else changed.
 */
export const constipationInAdultsWithCancer = protocol({
  id: "constipation-in-adults-with-cancer",
  name: "Constipation in adults with cancer: assessment, prevention and treatment, including opioid-induced constipation",
  aka: ["constipation", "opioid-induced constipation", "OIC", "laxatives with opioids", "bowel regimen", "faecal impaction", "fecal impaction", "vincristine constipation", "PAMORA", "peripherally acting mu-opioid receptor antagonist"],
  domain: "symptom-management",
  tldr: "Constipation is very common in cancer, from pain medicines, some chemotherapy, and eating, drinking and moving less. Anyone starting a strong opioid should start a regular laxative too. Tell your team if your bowels are not opening as they normally do, and straight away if you have vomiting, a swollen painful tummy, leaking loose stool after constipation, or new leg weakness or numbness.",
  simple: "Many people with cancer get constipated, most often from painkillers such as morphine. A regular laxative, taken every day, prevents most of it. Tell your team if you are not going as you normally do. Ring them at once if you are being sick, your tummy is swollen and sore, or your legs feel weak or numb.",
  summary: "Constipation in cancer has many causes at once: opioids, anticholinergics, antiemetics, neurotoxic chemotherapy (the NCI names vinca alkaloids, oxaliplatin, taxanes and thalidomide), low intake, immobility, hypercalcaemia and other metabolic upsets, and the tumour itself through obstruction or spinal cord compression. Assessment is a bowel history, a medicines review and an examination of the abdomen, with a digital rectal examination to look for impaction, except in neutropenic or otherwise immunocompromised patients, where the NCI says the rectum should not be examined and suppositories and enemas should not be given. Obstruction and impaction are excluded before laxatives are escalated, and overflow diarrhoea after days of constipation points to impaction.\n\nPrevention with opioids is the best supported step: NICE CG140 says to prescribe a regular laxative for everyone starting a strong opioid, and the NCI says a bowel regimen continues for as long as the opioid does, titrated to one unforced bowel movement every 1 to 2 days. On which laxative, the NCI starts a scheduled stimulant such as senna, says a stool softener adds nothing, and finds no evidence to prefer one class once constipation is established; the Cochrane review (2015) found laxatives of similar effectiveness on limited evidence. Bulk-forming agents are not advised for opioid-induced constipation. The vincristine label asks for a routine prophylactic regimen for every patient and warns that the impaction can be high in the colon with an empty rectum.\n\nWhen laxatives fail in opioid-induced constipation, a peripherally acting mu-opioid receptor antagonist is the next step: NICE recommends naloxegol after an inadequate response to laxatives and naldemedine after laxative treatment; methylnaltrexone is the injectable option. They are not used where obstruction is suspected. Sources differ on whether laxatives stop when one is started.\n\nThe ESMO (2018) and MASCC (2020) guidelines on this subject could not be read in full, so their graded recommendations are not reported here. The reader's own team's protocol comes first.",
  asOf: "2026-11-16",
  setting: {
    who: ["nurse", "doctor", "pharmacist", "patient-or-carer"],
    where: ["home", "community", "outpatient-clinic", "ward", "chemotherapy-day-unit", "telephone-triage"],
  },
  population: "Adults with cancer at any stage who are constipated or at risk of it, including those starting or taking opioids and those having vincristine. Children are not covered. Bowel obstruction, spinal cord compression and hypercalcaemia are causes to be recognised here and are managed by their own protocols. Constipation after bowel surgery or with a stoma follows the surgical team's advice. People who are neutropenic or have a low platelet count are covered, with the rectal route avoided.",
  trigger: "An opioid or vincristine is being started; or a person with cancer reports fewer or harder stools than is normal for them, straining, a sense of incomplete emptying, or new loose leakage after a period of constipation.",
  steps: [
    {
      action: "Take a bowel history: what is normal for this person, when the bowels last opened, stool consistency, pain, nausea or vomiting, wind, diet and fluids, and every medicine with its dose",
      why: "Constipation means a change from the person's own normal, and the history usually shows more than one cause.",
      source: "pdq-gi",
      quote: "A thorough history of the patient’s bowel pattern, dietary changes, and medications, along with a physical examination, can identify possible causes of constipation.",
    },
    {
      action: "Review the medicine chart for constipating drugs: opioids, anticholinergics including some antidepressants and antihistamines, 5-HT3 antiemetics, and neurotoxic chemotherapy such as vinca alkaloids",
      why: "Medicines are the commonest cause that can be changed, reduced or covered with a laxative.",
      source: "pdq-gi",
      quote: "Constipation is frequently the result of autonomic neuropathy caused by vinca alkaloids, oxaliplatin, taxanes, and thalidomide.",
    },
    {
      action: "Ask about and examine for spinal cord compression (new back pain, leg weakness, numbness, change in bladder control) and treat it as an emergency if suspected",
      why: "Pressure on the spinal cord stops the bowel working, and hours matter for saving the ability to walk.",
      source: "pdq-gi",
      quote: "Neuromuscular disorders (disruption of innervation leading to atony of the bowel, spinal cord injury or compression).",
    },
    {
      action: "Examine the abdomen and, unless the patient is neutropenic or otherwise immunocompromised, do a digital rectal examination to look for impaction",
      why: "A rectum full of hard stool needs different treatment from an empty one, and it cannot be found by questions alone.",
      source: "pdq-gi",
      quote: "Digital rectal exam: Done to rule out fecal impaction at the level of the rectum.",
    },
    {
      action: "In patients with a low white cell count, do not examine the rectum and do not give suppositories or enemas",
      why: "Small tears in the lining of the anus can let bacteria into the blood when there are no white cells to stop them.",
      source: "pdq-gi",
      quote: "In immunocompromised patients, manipulation of the rectum and anus should be avoided (i.e., no rectal examinations, no suppositories, and no enemas).",
    },
    {
      action: "If constipation persists despite laxatives, rule out bowel obstruction and impaction first, then check for and treat other causes such as a high calcium",
      why: "Laxatives can harm a blocked bowel, and hypercalcaemia is a treatable cause that needs a blood test to find.",
      source: "pdq-pain",
      quote: "After obstruction and impaction are ruled out, other causes of constipation (such as hypercalcemia) are treated.",
    },
    {
      action: "Suspect faecal impaction when loose stool leaks or diarrhoea starts after a period of constipation",
      why: "Liquid stool passing around a hard mass looks like diarrhoea but is a sign of blockage.",
      source: "pdq-gi",
      quote: "Movement of stool around the impaction may result in diarrhea, which can be explosive.",
    },
    {
      action: "Support the basics: fluids unless restricted, movement as able, privacy, and a toilet or commode in place of a bedpan",
      why: "Dehydration, immobility and having to use a bedpan each make constipation worse, and each can be eased without a drug.",
      source: "pdq-gi",
      quote: "Provide a toilet or bedside commode and appropriate assistive devices; avoid bedpan use whenever possible.",
    },
    {
      action: "Prescribe a regular laxative for every patient starting a strong opioid, and tell them why",
      why: "Opioids constipate nearly everyone who takes them and the effect does not wear off with time.",
      source: "nice-cg140",
      quote: "Prescribe laxative treatment (to be taken regularly at an effective dose) for all patients starting strong opioids.",
      grade: "NICE recommendation 1.1.18 (not graded)",
    },
    {
      action: "Start with a scheduled stimulant laxative such as senna; do not rely on a stool softener alone",
      why: "Opioids slow the bowel, and a stimulant acts on that; adding a softener such as docusate has not been shown to help.",
      source: "pdq-pain",
      quote: "A scheduled stimulant laxative, such as senna, is started with opioid initiation. The addition of a stool softener offers no further benefit.",
    },
    {
      action: "Adjust the laxative dose to the bowels, aiming for one comfortable bowel movement every 1 to 2 days, and keep it going for as long as the opioid continues",
      why: "The right dose is the one that works for this person; it is not set by the opioid dose.",
      source: "pdq-pain",
      quote: "Laxatives are titrated to a goal of one unforced bowel movement every 1 to 2 days.",
    },
    {
      action: "Do not use bulk-forming laxatives (methylcellulose, psyllium or ispaghula) for opioid-induced constipation, or where impaction or obstruction is suspected",
      why: "Bulk in a slow bowel, in someone drinking little, can set into a blockage.",
      source: "pdq-gi",
      quote: "Not advised for opioid-induced constipation.",
    },
    {
      action: "Give every patient on vincristine a preventive laxative regimen, and if they have colicky pain with an empty rectum, arrange an abdominal radiograph",
      why: "Vincristine affects the nerves of the gut and can cause impaction high in the colon, or an ileus, that a rectal examination misses.",
      source: "label-vincristine",
      quote: "A routine prophylactic regimen against constipation is recommended for all patients receiving Vincristine Sulfate Injection.",
    },
    {
      action: "For opioid-induced constipation that has not responded to laxatives, add or switch to a peripherally acting mu-opioid receptor antagonist (naloxegol, naldemedine or methylnaltrexone)",
      why: "These block the opioid's effect on the gut without reaching the brain, so pain relief is kept.",
      source: "nice-ta345",
      quote: "Naloxegol is recommended, within its marketing authorisation, as an option for treating opioid induced constipation in adults whose constipation has not adequately responded to laxatives.",
      grade: "NICE technology appraisal recommendation 1.1 (not graded)",
    },
    {
      action: "Do not give a peripherally acting opioid antagonist if bowel obstruction or ileus is suspected",
      why: "A blocked bowel needs different treatment, and these medicines are not for use in it.",
      source: "pdq-pain",
      quote: "These agents are not used if postoperative ileus or mechanical bowel obstruction is suspected.",
    },
    {
      action: "For impaction in a patient whose blood counts allow it, soften and clear the stool with enemas, with manual removal if it is within reach; avoid suppositories and enemas in neutropenia or thrombocytopenia",
      why: "Impacted stool will not pass with oral laxatives alone, but the rectal route can cause infection or bleeding when counts are low.",
      source: "pdq-pain",
      quote: "Suppositories and enemas are generally avoided in the setting of neutropenia or thrombocytopenia.",
    },
    {
      action: "Before switching opioid because of constipation, make sure the laxative regimen has been optimised",
      why: "Most opioid constipation is under-treated, and changing the opioid has its own risks.",
      source: "nice-cg140",
      quote: "Optimise laxative treatment for managing constipation before considering switching strong opioids.",
      grade: "NICE recommendation 1.1.20 (not graded)",
    },
  ],
  bestInClass: {
    statement: "The best supported steps that could be read are: a regular laxative for everyone starting a strong opioid (NICE CG140 1.1.18; NCI PDQ), continued while the opioid continues and titrated to one unforced bowel movement every 1 to 2 days; assessment that looks for impaction, obstruction, cord compression and hypercalcaemia before escalating; no rectal examination, suppositories or enemas in neutropenic or immunocompromised patients (NCI PDQ); and a peripherally acting mu-opioid receptor antagonist when laxatives have failed in opioid-induced constipation (NICE TA345 and TA651; Cochrane 2022, moderate-certainty evidence for naldemedine and methylnaltrexone over two weeks). The sources differ on two points and both are shown. On laxative choice, the NCI starts a stimulant and says a softener adds nothing, while NICE names no class and Cochrane found laxatives similar on limited evidence. On combining treatments, the NCI pain summary stops laxatives before an opioid antagonist is started, while NICE TA651 says an antagonist and a conventional laxative are commonly used together. The graded recommendations of ESMO (2018) and MASCC (2020), the guidelines whose remit this is, could not be read and are not represented.",
    sources: ["nice-cg140", "pdq-gi", "pdq-pain", "nice-ta345", "nice-ta651", "cochrane-pamora-2022", "cochrane-laxatives-2015"],
  },
  variants: [
    {
      name: "Which laxative first",
      differs: "For preventing opioid constipation the NCI pain summary starts a scheduled stimulant such as senna and adds that a stool softener gives no further benefit. For established constipation it lists bisacodyl, polyethylene glycol, magnesium hydroxide, lactulose, sorbitol and magnesium citrate as appropriate and says no class can be recommended over another. NICE CG140 asks for a laxative taken regularly at an effective dose and names no class.",
      evidence: "The Cochrane review of laxatives in palliative care (2015) found laxatives of similar effectiveness from a few small trials, none of which tested polyethylene glycol or any rectal treatment. Whether ESMO or MASCC prefer an osmotic or a stimulant laxative could not be checked.",
      sources: ["pdq-pain", "nice-cg140", "cochrane-laxatives-2015"],
    },
    {
      name: "Opioid antagonist alone, or with a laxative",
      differs: "The NCI pain summary says laxatives are discontinued before a peripherally acting opioid antagonist is started. NICE TA651 says treatment may be an antagonist alone but that commonly an antagonist and a conventional laxative are used together. The NCI's table of agents says to give opioid antagonists only if other drugs have failed.",
      evidence: "Cochrane 2022: moderate-certainty evidence that oral naldemedine in people with cancer, and subcutaneous methylnaltrexone in people receiving palliative care, improve bowel function over two weeks; evidence on serious adverse events is low certainty. No trial read compares an antagonist with and without a continued laxative.",
      sources: ["pdq-pain", "pdq-gi", "nice-ta651", "cochrane-pamora-2022"],
    },
    {
      name: "Rectal examination: routine, or avoided",
      differs: "The NCI lists a digital rectal examination among the tests used to rule out impaction, and in the same summary says the rectum should not be examined, and suppositories and enemas not given, in immunocompromised patients or those at risk of low platelets, low white cells or mucositis.",
      evidence: "Stated as a contraindication on the reasoning that anal fissures and abscesses are portals of entry for infection; no trial is cited.",
      sources: ["pdq-gi", "pdq-pain"],
    },
    {
      name: "European stepwise algorithm for opioid-induced constipation (funded by Kyowa Hakko Kirin)",
      differs: "A European expert panel proposes early recognition, fluids, exercise and standard laxatives first, the Bowel Function Index to measure severity and response, and gut-restricted or peripherally acting opioid antagonists second line, often in combination.",
      evidence: "Expert opinion, read as an abstract only. The record lists the drug company Kyowa Hakko Kirin as funder.",
      sources: ["farmer-2019"],
    },
  ],
  grades: [
    { claim: "Regular laxative for all patients starting strong opioids", grade: "NICE recommendation 1.1.18 (not graded)", source: "nice-cg140" },
    { claim: "Tell patients constipation affects nearly everyone on strong opioids", grade: "NICE recommendation 1.1.17 (not graded)", source: "nice-cg140", quote: "Inform patients that constipation affects nearly all patients receiving strong opioid treatment." },
    { claim: "A bowel regimen starts with the opioid and continues with it", grade: "PDQ summary; not graded", source: "pdq-gi", quote: "a bowel regimen should be initiated when opioids are prescribed and continued for as long as the patient takes them." },
    { claim: "No laxative class can be recommended over another for established opioid constipation", grade: "PDQ summary; not graded", source: "pdq-pain", quote: "There is no evidence to recommend one laxative class over another in this setting." },
    { claim: "Laxatives are of similar effectiveness in palliative care, on limited evidence", grade: "Cochrane review; certainty not stated in the abstract", source: "cochrane-laxatives-2015", quote: "This second update found that laxatives were of similar effectiveness but the evidence remains limited due to insufficient data from a few small RCTs." },
    { claim: "Naldemedine after laxative treatment", grade: "NICE technology appraisal recommendation 1.1 (not graded)", source: "nice-ta651", quote: "Naldemedine is recommended, within its marketing authorisation, as an option for treating opioid-induced constipation in adults who have had laxative treatment." },
    { claim: "An opioid antagonist and a conventional laxative are commonly used together", grade: "NICE committee statement (not graded)", source: "nice-ta651", quote: "But, commonly a PAMORA and a conventional laxative are used together." },
    { claim: "Laxatives are stopped before an opioid antagonist is started", grade: "PDQ summary; not graded", source: "pdq-pain", quote: "Laxatives are discontinued before peripherally acting opioid antagonists are initiated." },
    { claim: "Methylnaltrexone improves bowel function over two weeks in people receiving palliative care", grade: "Moderate-certainty evidence (GRADE)", source: "cochrane-pamora-2022", quote: "Moderate‐certainty evidence for methylnaltrexone on spontaneous laxations over two weeks suggests subcutaneous methylnaltrexone may improve bowel function in people receiving palliative care, but certainty of evidence for AEs was low." },
    { claim: "Rectal agents avoided in patients at risk of low platelets, low white cells or mucositis", grade: "PDQ summary; not graded", source: "pdq-gi", quote: "Rectal agents should be avoided in patients with cancer at risk of thrombocytopenia, leukopenia, and/or mucositis from cancer and its treatment." },
    { claim: "Impaction is treated by hydrating and softening the stool so it can be passed or removed", grade: "PDQ summary; not graded", source: "pdq-gi", quote: "The primary treatment of impaction is to hydrate and soften the stool so that it can be removed or passed." },
    { claim: "Vincristine: impaction may be in the upper colon with an empty rectum", grade: "Regulatory label; not graded", source: "label-vincristine", quote: "Constipation may take the form of upper–colon impaction, and, on physical examination, the rectum may be empty." },
    { claim: "5-HT3 antiemetics can worsen constipation in people taking opioids", grade: "PDQ summary; not graded", source: "pdq-pain", quote: "However, they could worsen constipation among patients already taking opioids." },
    { claim: "MASCC produced 15 recommendations on assessment, treatment and re-assessment (not read in full)", grade: "Level of evidence with a category of guideline: recommendation, suggestion, or no guideline possible", source: "mascc-2020", quote: "The group produced 15 recommendations, with varying levels of evidence and so varying categories of guideline." },
  ],
  sources: [
    { key: "pdq-gi", label: "Gastrointestinal Complications (PDQ), health professional version: constipation, faecal impaction and bowel obstruction", publisher: "US National Cancer Institute, PDQ Supportive and Palliative Care Editorial Board", year: 2025, url: "https://www.cancer.gov/about-cancer/treatment/side-effects/constipation/gi-complications-hp-pdq", gradingScheme: "PDQ summaries cite evidence and do not grade recommendations.", read: "full-text", accessed: "2026-11-16" },
    { key: "pdq-pain", label: "Cancer Pain (PDQ), health professional version: constipation as an adverse effect of opioids", publisher: "US National Cancer Institute, PDQ Supportive and Palliative Care Editorial Board", year: 2025, url: "https://www.cancer.gov/about-cancer/treatment/side-effects/pain/pain-hp-pdq", gradingScheme: "PDQ summaries cite evidence and do not grade recommendations.", read: "full-text", accessed: "2026-11-16" },
    { key: "nice-cg140", label: "Palliative care for adults: strong opioids for pain relief (CG140), recommendations", publisher: "NICE", year: 2012, url: "https://www.nice.org.uk/guidance/cg140/chapter/Recommendations", gradingScheme: "NICE does not grade recommendations; the wording (offer, consider) carries the strength.", read: "full-text", accessed: "2026-11-16" },
    { key: "nice-ta345", label: "Naloxegol for treating opioid-induced constipation (TA345), guidance chapter", publisher: "NICE", year: 2015, url: "https://www.nice.org.uk/guidance/ta345/chapter/1-Guidance", gradingScheme: "NICE technology appraisal; recommendations are not graded.", read: "full-text", accessed: "2026-11-16" },
    { key: "nice-ta651", label: "Naldemedine for treating opioid-induced constipation (TA651), recommendations chapter", publisher: "NICE", year: 2020, url: "https://www.nice.org.uk/guidance/ta651/chapter/1-Recommendations", gradingScheme: "NICE technology appraisal; recommendations are not graded.", read: "full-text", accessed: "2026-11-16" },
    { key: "label-vincristine", label: "Vincristine sulfate injection: US prescribing information, adverse reactions (gastrointestinal)", publisher: "Hospira (DailyMed, US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b22e4c8e-dbe1-4d4b-a026-e1812974071c", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-16" },
    { key: "cochrane-laxatives-2015", label: "Laxatives for the management of constipation in people receiving palliative care", publisher: "Cochrane Database of Systematic Reviews (Candy et al.)", year: 2015, url: "https://doi.org/10.1002/14651858.CD003448.pub4", doi: "10.1002/14651858.CD003448.pub4", gradingScheme: "Cochrane review; the abstract states no GRADE ratings.", read: "abstract", accessed: "2026-11-16" },
    { key: "cochrane-pamora-2022", label: "Mu-opioid antagonists for opioid-induced bowel dysfunction in people with cancer and people receiving palliative care", publisher: "Cochrane Database of Systematic Reviews (Candy et al.)", year: 2022, url: "https://doi.org/10.1002/14651858.CD006332.pub4", doi: "10.1002/14651858.CD006332.pub4", gradingScheme: "GRADE certainty of evidence: high, moderate, low or very low.", read: "abstract", accessed: "2026-11-16" },
    { key: "mascc-2020", label: "MASCC recommendations on the management of constipation in patients with advanced cancer", publisher: "Supportive Care in Cancer (Davies et al., MASCC Palliative Care Study Group)", year: 2020, url: "https://doi.org/10.1007/s00520-019-05016-4", doi: "10.1007/s00520-019-05016-4", gradingScheme: "Level of evidence with a category of guideline: recommendation, suggestion, or no guideline possible.", read: "abstract", accessed: "2026-11-16" },
    { key: "esmo-2018", label: "Diagnosis, assessment and management of constipation in advanced cancer: ESMO Clinical Practice Guidelines", publisher: "ESMO (Annals of Oncology, Larkin et al.)", year: 2018, url: "https://doi.org/10.1093/annonc/mdy148", doi: "10.1093/annonc/mdy148", read: "not-reachable", accessed: "2026-11-16" },
    { key: "farmer-2019", label: "Pathophysiology and management of opioid-induced constipation: European expert consensus statement (funded by Kyowa Hakko Kirin)", publisher: "United European Gastroenterology Journal (Farmer et al.; funder listed as Kyowa Hakko Kirin)", year: 2019, url: "https://doi.org/10.1177/2050640618818305", doi: "10.1177/2050640618818305", gradingScheme: "Expert panel opinion; not graded in the abstract.", read: "abstract", accessed: "2026-11-16" },
  ],
  drugs: ["vincristine"],
  cancers: [],
  terms: [],
  related: ["malignant-bowel-obstruction", "strong-opioids-for-cancer-pain", "opioid-switching-and-conversion", "metastatic-spinal-cord-compression-emergency", "hypercalcaemia-of-malignancy-management", "methylnaltrexone", "morphine", "oxycodone", "ondansetron"],
  upgrades: [],
  gaps: [
    "The ESMO Clinical Practice Guidelines on constipation in advanced cancer (Larkin et al., Ann Oncol 2018) could not be read: the publisher pages returned 403 to a script, ESMO's own page links to the same blocked PDF, and no open copy was found. Its graded recommendations, including its position on osmotic and stimulant laxatives, rectal measures and opioid antagonists, are not reported here.",
    "The MASCC recommendations (Davies et al., Support Care Cancer 2020) could be read as an abstract only; the 15 recommendations sit behind a subscription. Nothing here rests on them.",
    "Because those two could not be read, this page leans on the NCI PDQ summaries, which do not grade their statements, and on NICE, which covers only laxatives with strong opioids and two opioid antagonists.",
    "No trial has shown which laxative is best in people with cancer. The Cochrane review (2015) found only a few small trials, none of polyethylene glycol and none of any rectal treatment.",
    "Sources differ on whether laxatives stop when a peripherally acting opioid antagonist is started (NCI: stopped; NICE TA651: commonly used together). No trial read settles it.",
    "The advice to avoid rectal examination, suppositories and enemas when white cells or platelets are low is stated by the NCI without a cited trial, and no source read gives a count below which it applies.",
    "Antibody-drug conjugates: constipation is recorded here as a common side effect of brentuximab vedotin, trastuzumab deruxtecan, datopotamab deruxtecan and sacituzumab govitecan, but no source read gives management specific to them, so they are not listed as drugs of this protocol. The same is true of 5-HT3 antiemetics beyond the NCI's remark that they can worsen constipation on opioids.",
    "Of the neurotoxic drugs the NCI names as causes (vinca alkaloids, oxaliplatin, taxanes, thalidomide), only the vincristine label was read; it is the only one listed as a drug of this protocol.",
    "No dose is given here for any laxative. The NCI table lists US doses and products; UK formularies differ and were not read.",
    "NICE CKS returned 403 to a script; the ONS guidelines on cancer constipation (2020) and NCCN palliative care guidance are not openly readable. None is cited.",
    "No source read gives a number of days without a bowel movement at which a patient should call; the NCI notes that the usual definition of a normal bowel pattern may not suit people with cancer.",
  ],
});
