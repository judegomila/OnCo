import { protocol } from "./helpers";

/*
 * Assessing, preventing and treating constipation in adults with cancer, including opioid-induced constipation and
 * constipation from vincristine.
 *
 * Second accuracy pass, 17 November 2026. Every source was fetched again raw with curl and read as text, and every
 * quote was checked by script against the saved text (whitespace joined, nothing else changed).
 * - NCI PDQ, Gastrointestinal Complications, health professional version (updated 3 April 2025) and NCI PDQ, Cancer
 *   Pain, health professional version (updated 24 April 2025): full text, the cancer.gov pages stripped to text. Both
 *   still carry those update dates.
 * - NCI, Constipation and Cancer Treatment (patient page, updated 16 May 2025): full text, added in this pass as the
 *   source for which symptoms a patient or carer should report.
 * - NICE CG140 (published 23 May 2012, last updated 3 August 2016; a minor change in September 2024 added links to the
 *   two technology appraisals), TA345 (22 July 2015, reviewed 9 July 2018), TA651 (30 September 2020) and NG234 (spinal
 *   metastases and metastatic spinal cord compression, 6 September 2023; added in this pass): recommendations, full text.
 * - Vincristine sulfate injection, US prescribing information (Hospira; DailyMed SPL XML, setid
 *   b22e4c8e-dbe1-4d4b-a026-e1812974071c, version 16, label revised 12/2025): full text.
 * - MASCC recommendations on constipation in advanced cancer (Davies et al., Support Care Cancer 2020): the first pass
 *   read the abstract only. The author-accepted manuscript is open in UCL Discovery (linked from Europe PMC) and was
 *   read in full with pdftotext, including Table 1 and the grading appendix. The 15 recommendations and their levels
 *   are now reported. Nothing is quoted from the manuscript, because the journal's typeset wording could differ; the
 *   one MASCC quote is from the published abstract.
 * - ESMO Clinical Practice Guidelines on constipation in advanced cancer (Larkin et al., Ann Oncol 2018): still not
 *   reachable. The DOI resolves to an Elsevier page that needs a browser, annalsofoncology.org returned 403 to a
 *   script, and Europe PMC holds no abstract or full text. Named in sources; no step rests on it.
 * - Cochrane reviews CD003448.pub4 (2015) and CD006332.pub4 (2022), and Farmer et al. (United European Gastroenterol J
 *   2019): abstracts only, from Europe PMC. The Europe PMC full-text endpoint returned 500, NCBI E-utilities returned
 *   the abstract, and the Europe PMC PDF link returned 403. Europe PMC and Crossref list Kyowa Hakko Kirin as funder of
 *   the Farmer paper, and Crossref lists a correction to it (10.1177/2050640619832801), not read.
 * - No newer edition of the ESMO or MASCC guideline, and no update of either Cochrane review, was found in Europe PMC
 *   or Crossref.
 * - Not read and not cited: NICE CKS, the ONS constipation guidelines (2020) and NCCN.
 *
 * What changed in this pass: MASCC brought in as a read source (first laxative, opioid antagonists, lifestyle advice,
 * rectal measures); orders softened to the sources' own strength (a rectal examination "may be part of" the evaluation,
 * the opioid antagonists are "an option"); the rule on rectal examination scoped to immunocompromised patients as the
 * NCI words it; the cord compression step moved onto NICE NG234; the patient warning signs moved onto the NCI patient
 * page and NG234; reasons in `why` that no source states removed.
 *
 * Antibody-drug conjugates and 5-HT3 antiemetics: the corpus records constipation as a common side effect of several
 * antibody-drug conjugates, and the PDQ pain summary says serotonin antagonists such as ondansetron could worsen
 * constipation in people on opioids. No source read gives a management rule specific to either, so they are named in
 * gaps and not in `drugs`.
 *
 * Every DOI was resolved through Crossref and Europe PMC and its title checked.
 */
export const constipationInAdultsWithCancer = protocol({
  id: "constipation-in-adults-with-cancer",
  name: "Constipation in adults with cancer: assessment, prevention and treatment, including opioid-induced constipation",
  aka: ["constipation", "opioid-induced constipation", "OIC", "laxatives with opioids", "bowel regimen", "faecal impaction", "fecal impaction", "vincristine constipation", "PAMORA", "peripherally acting mu-opioid receptor antagonist"],
  domain: "symptom-management",
  tldr: "Constipation is common in cancer, from pain medicines, some chemotherapy, and eating, drinking and moving less. Anyone starting a strong opioid should be prescribed a regular laxative too. Tell your team if you are constipated. Tell them straight away about severe tummy pain, vomiting, or sudden diarrhoea or leaking stool after constipation, or new leg weakness or numbness.",
  simple: "Many people with cancer get constipated, often from painkillers such as morphine. A laxative taken regularly is prescribed with strong painkillers to help prevent it. Tell your team if you are not going as you normally do. Tell them at once if you have bad tummy pain, are being sick, have sudden diarrhoea or leaking after constipation, or your legs feel weak or numb.",
  summary: "Constipation in cancer has many possible causes: opioids, anticholinergics (including antidepressants and antihistamines), antacids, diuretics, neurotoxic chemotherapy (the NCI names vinca alkaloids, oxaliplatin, taxanes and thalidomide), low intake of fluid and fibre, immobility, hypercalcaemia and other metabolic disorders, a growing tumour, and spinal cord injury or compression. The NCI's assessment is a history of the bowel pattern, diet and medicines with a physical examination; a digital rectal examination may be part of it, to rule out impaction in the rectum, and MASCC says the examination should ideally include one. In immunocompromised patients the NCI says manipulation of the rectum and anus should be avoided: no rectal examinations, suppositories or enemas. If constipation persists despite preventive laxatives, obstruction and impaction are ruled out and other causes such as hypercalcaemia treated. Diarrhoea or leakage of stool in a constipated patient suggests impaction: the NCI calls leakage with nausea, vomiting, abdominal pain and dehydration virtually diagnostic.\n\nPrevention with opioids is the best supported step: NICE CG140 says to prescribe a regular laxative for all patients starting a strong opioid, MASCC suggests routine co-prescription of a laxative or an opioid antagonist (level IV), and the NCI says a bowel regimen continues for as long as the opioid does, titrated to one unforced bowel movement every 1 to 2 days. On which laxative, the sources differ. The NCI starts a scheduled stimulant such as senna, says adding a stool softener offers no further benefit, and finds no evidence to prefer one class when constipation persists; MASCC recommends polyethylene glycol first; the Cochrane review (2015) found laxatives of similar effectiveness on limited evidence. The NCI does not advise bulk-forming agents for opioid-induced constipation. The vincristine label recommends a routine prophylactic regimen for all patients and warns that impaction can be in the upper colon with an empty rectum.\n\nFor opioid-induced constipation, a peripherally acting mu-opioid receptor antagonist is an option: NICE recommends naloxegol as an option when constipation has not adequately responded to laxatives and naldemedine as an option after laxative treatment; methylnaltrexone is given by subcutaneous injection. MASCC says these medicines should always be considered in opioid-induced constipation (level I). The NCI says they are not used if postoperative ileus or mechanical bowel obstruction is suspected. Sources differ on whether laxatives stop when one is started.\n\nThe ESMO guideline (2018) could not be read, so its graded recommendations are not reported here. The reader's own team's protocol comes first.",
  asOf: "2026-11-17",
  setting: {
    who: ["nurse", "doctor", "pharmacist", "patient-or-carer"],
    where: ["home", "community", "outpatient-clinic", "ward", "chemotherapy-day-unit", "telephone-triage"],
  },
  population: "Adults with cancer at any stage who are constipated or at risk of it, including those starting or taking opioids and those having vincristine. Children are not covered. Bowel obstruction, spinal cord compression and hypercalcaemia are causes to be recognised here and are managed by their own protocols. Constipation after bowel surgery or with a stoma follows the surgical team's advice. People who are immunocompromised, neutropenic or have a low platelet count are covered; for them the sources say the rectal route is avoided or generally avoided.",
  trigger: "An opioid or vincristine is being started; or a person with cancer reports fewer or harder stools than is normal for them, straining, a sense of incomplete emptying, or new loose leakage after a period of constipation.",
  steps: [
    {
      action: "Take a bowel history: what is normal for this person, when the bowels last opened, stool consistency, pain, nausea or vomiting, wind, diet and fluids, and every medicine with its dose",
      why: "The history, with an examination, is how the possible causes are found. The NCI asks what is normal for the patient and whether the symptom is a recent change.",
      source: "pdq-gi",
      quote: "A thorough history of the patient’s bowel pattern, dietary changes, and medications, along with a physical examination, can identify possible causes of constipation.",
    },
    {
      action: "Review the medicines for ones that constipate: opioids, anticholinergics including antidepressants and antihistamines, antacids, diuretics, and neurotoxic chemotherapy such as vinca alkaloids",
      why: "The NCI lists medicines among the causes, and removing a cause where that is possible is part of managing constipation. Its pain summary adds that 5-HT3 antiemetics such as ondansetron could worsen constipation in people taking opioids.",
      source: "pdq-gi",
      quote: "Constipation is frequently the result of autonomic neuropathy caused by vinca alkaloids, oxaliplatin, taxanes, and thalidomide.",
    },
    {
      action: "Ask about and examine for signs of spinal cord compression (bladder or bowel dysfunction, difficulty walking, limb weakness, numbness or sensory loss) and, if they are present, contact the cord compression coordinator immediately",
      why: "The NCI lists spinal cord compression among the causes of constipation, and NICE treats its signs in a person with cancer as an oncological emergency.",
      source: "nice-ng234",
      quote: "Immediately contact the MSCC coordinator if a person with a past or current diagnosis of cancer presents with the symptoms or signs of cord compression listed in box 1. Treat this as an oncological emergency.",
      grade: "NICE recommendation 1.3.2 (not graded)",
    },
    {
      action: "Examine the abdomen and, unless the patient is immunocompromised, consider a digital rectal examination to look for impaction",
      why: "A rectal examination shows whether stool is impacted in the rectum. The NCI lists it among tests that may be part of the evaluation, and MASCC says the examination should ideally include one.",
      source: "pdq-gi",
      quote: "Digital rectal exam: Done to rule out fecal impaction at the level of the rectum.",
    },
    {
      action: "In immunocompromised patients, avoid rectal examination, suppositories and enemas",
      why: "The NCI says these can lead to anal fissures or abscesses, which let infection in.",
      source: "pdq-gi",
      quote: "In immunocompromised patients, manipulation of the rectum and anus should be avoided (i.e., no rectal examinations, no suppositories, and no enemas).",
    },
    {
      action: "If constipation persists despite preventive laxatives, reassess its cause and severity: rule out bowel obstruction and impaction first, then treat other causes such as a high calcium",
      why: "The NCI's table marks several laxatives as contraindicated or to be avoided in bowel obstruction, and it lists hypercalcaemia among the metabolic causes.",
      source: "pdq-pain",
      quote: "After obstruction and impaction are ruled out, other causes of constipation (such as hypercalcemia) are treated.",
    },
    {
      action: "Suspect faecal impaction when loose stool leaks or diarrhoea starts in a person who has been constipated",
      why: "Liquid stool passing around a hard mass looks like diarrhoea but is a sign of impaction.",
      source: "pdq-gi",
      quote: "Movement of stool around the impaction may result in diarrhea, which can be explosive.",
    },
    {
      action: "Support the basics: fluids unless contraindicated, movement as able, privacy, and a toilet or commode in place of a bedpan",
      why: "The NCI says constipation is made worse by dehydration and inactivity, and lists lack of privacy among its causes. MASCC adds that changes to diet and exercise have a limited role in advanced cancer.",
      source: "pdq-gi",
      quote: "Provide a toilet or bedside commode and appropriate assistive devices; avoid bedpan use whenever possible.",
    },
    {
      action: "Prescribe a regular laxative for every patient starting a strong opioid, and tell them why",
      why: "NICE says constipation affects nearly all patients on strong opioids. The NCI gives 40% to 95% and says patients generally do not develop tolerance to it.",
      source: "nice-cg140",
      quote: "Prescribe laxative treatment (to be taken regularly at an effective dose) for all patients starting strong opioids.",
      grade: "NICE recommendation 1.1.18 (not graded)",
    },
    {
      action: "Where the team follows the NCI, start a scheduled stimulant laxative such as senna with the opioid, and do not rely on a stool softener alone",
      why: "Opioids reduce peristalsis and a stimulant increases the bowel's motor activity; the NCI says adding a stool softener offers no further benefit. MASCC instead recommends polyethylene glycol first, so local protocols differ.",
      source: "pdq-pain",
      quote: "A scheduled stimulant laxative, such as senna, is started with opioid initiation. The addition of a stool softener offers no further benefit.",
    },
    {
      action: "Adjust the laxative dose to the bowels, aiming for one unforced bowel movement every 1 to 2 days, and keep it going for as long as the opioid continues",
      why: "The NCI cites one study suggesting the laxative should be titrated to bowel function and not set by the opioid dose.",
      source: "pdq-pain",
      quote: "Laxatives are titrated to a goal of one unforced bowel movement every 1 to 2 days.",
    },
    {
      action: "Do not use bulk-forming laxatives (methylcellulose, psyllium or ispaghula) for opioid-induced constipation, or where impaction or obstruction is suspected",
      why: "The NCI's table says bulk producers must be taken with plenty of water to reduce the risk of bowel obstruction.",
      source: "pdq-gi",
      quote: "Not advised for opioid-induced constipation.",
    },
    {
      action: "Give every patient on vincristine a preventive laxative regimen, and if they have colicky pain with an empty rectum, consider a plain abdominal radiograph",
      why: "The label says vincristine constipation can be an impaction in the upper colon, or a paralytic ileus, with an empty rectum that may mislead the examiner, and that a flat film of the abdomen is useful in showing it.",
      source: "label-vincristine",
      quote: "A routine prophylactic regimen against constipation is recommended for all patients receiving Vincristine Sulfate Injection.",
    },
    {
      action: "For opioid-induced constipation that has not adequately responded to laxatives, consider a peripherally acting mu-opioid receptor antagonist (naloxegol, naldemedine or methylnaltrexone)",
      why: "The NCI says these block opioid receptors in the gut and have a restricted ability to cross into the brain; in the study it cites pain scores were unchanged. NICE recommends naloxegol and naldemedine as options, not as a requirement.",
      source: "nice-ta345",
      quote: "Naloxegol is recommended, within its marketing authorisation, as an option for treating opioid induced constipation in adults whose constipation has not adequately responded to laxatives.",
      grade: "NICE technology appraisal recommendation 1.1 (not graded)",
    },
    {
      action: "Do not give a peripherally acting opioid antagonist if postoperative ileus or mechanical bowel obstruction is suspected",
      why: "The NCI says these medicines are not used in that setting, and its table lists them as contraindicated in bowel obstruction.",
      source: "pdq-pain",
      quote: "These agents are not used if postoperative ileus or mechanical bowel obstruction is suspected.",
    },
    {
      action: "For impaction, hydrate and soften the stool with enemas, with removal by finger if it is within reach; do not use the rectal route in immunocompromised patients, and generally avoid it in neutropenia or thrombocytopenia",
      why: "The NCI says enemas lubricate the bowel and soften the stool, and warns that too many can perforate it. Its patient page says suppositories and enemas may lead to bleeding or infection in some people with cancer.",
      source: "pdq-gi",
      quote: "The patient may need to be digitally disimpacted if the stool is within reach.",
    },
    {
      action: "Before switching opioid because of constipation, make sure the laxative regimen has been optimised",
      why: "NICE asks for laxatives to be optimised first. MASCC notes that lowering the opioid dose does not improve the constipation, though switching opioid sometimes does.",
      source: "nice-cg140",
      quote: "Optimise laxative treatment for managing constipation before considering switching strong opioids.",
      grade: "NICE recommendation 1.1.20 (not graded)",
    },
  ],
  bestInClass: {
    statement: "The body whose remit this is, MASCC (2020), makes 15 recommendations, most of them suggestions on level IV or V evidence. Its level I recommendations are that conventional laxatives should be considered first-line in functional constipation (data mainly from the general population; the group recommends polyethylene glycol first) and that peripherally acting mu-opioid receptor antagonists should always be considered in opioid-induced constipation. The other well supported steps are: a regular laxative for all patients starting a strong opioid (NICE CG140 1.1.18; NCI PDQ; MASCC, level IV, a laxative or an antagonist), continued while the opioid continues and titrated to one unforced bowel movement every 1 to 2 days (NCI); ruling out obstruction and impaction, and treating causes such as hypercalcaemia, when constipation persists (NCI); no rectal examination, suppositories or enemas in immunocompromised patients (NCI); and an opioid antagonist as an option when laxatives have not worked (NICE TA345 and TA651; Cochrane 2022, moderate-certainty evidence that naldemedine and methylnaltrexone may improve bowel function over two weeks). The sources differ on three points and all are shown. On laxative choice, the NCI starts a stimulant and says a softener adds nothing, MASCC recommends polyethylene glycol, NICE names no class and Cochrane found laxatives similar on limited evidence. On combining treatments, the NCI pain summary stops laxatives before an opioid antagonist is started, while NICE TA651 says an antagonist and a conventional laxative are commonly used together and MASCC suggests adding or switching to a laxative if the antagonist does not work. On fluids, fibre and exercise, the NCI encourages them and MASCC says they have a limited role in advanced cancer. The ESMO guideline (2018) could not be read and is not represented.",
    sources: ["mascc-2020", "nice-cg140", "pdq-gi", "pdq-pain", "nice-ta345", "nice-ta651", "cochrane-pamora-2022", "cochrane-laxatives-2015"],
  },
  variants: [
    {
      name: "Which laxative first",
      differs: "For preventing opioid constipation the NCI pain summary starts a scheduled stimulant such as senna and adds that a stool softener gives no further benefit. When constipation persists it lists bisacodyl, polyethylene glycol, magnesium hydroxide, lactulose, sorbitol and magnesium citrate as appropriate and says no class can be recommended over another. MASCC recommends polyethylene glycol as the first-line treatment for constipation in advanced cancer, individualised because the volume, taste and side effects can limit its use. NICE CG140 asks for a laxative taken regularly at an effective dose and names no class.",
      evidence: "The Cochrane review of laxatives in palliative care (2015) found laxatives of similar effectiveness from a few small trials, none of which tested polyethylene glycol or any rectal treatment. MASCC grades conventional laxatives first-line as level I for functional constipation, on data mainly from the general population, and level V for secondary constipation; its preference for polyethylene glycol rests on general-population data, expert opinion and clinical experience. Three of its authors declared personal fees from Kyowa Kirin. Whether ESMO prefers an osmotic or a stimulant laxative could not be checked.",
      sources: ["pdq-pain", "mascc-2020", "nice-cg140", "cochrane-laxatives-2015"],
    },
    {
      name: "Opioid antagonist: when, and alone or with a laxative",
      differs: "NICE recommends naloxegol as an option when constipation has not adequately responded to laxatives, and naldemedine as an option for adults who have had laxative treatment. The NCI's table of agents says to give opioid antagonists only if other drugs have failed, and its pain summary says laxatives are discontinued before one is started. MASCC says the antagonists should always be considered in opioid-induced constipation and accepts one in place of a laxative for prevention, while noting there are no data to support co-prescribing one for prevention. NICE TA651 says treatment may be an antagonist alone but that commonly an antagonist and a conventional laxative are used together; MASCC suggests adding or switching to a conventional laxative when an antagonist has not worked.",
      evidence: "Cochrane 2022: moderate-certainty evidence that oral naldemedine in people with cancer, and subcutaneous methylnaltrexone in people receiving palliative care, may improve bowel function over two weeks; the evidence on serious adverse events is low certainty. MASCC grades its recommendation level I and the add-or-switch advice level V. No trial read compares an antagonist with and without a continued laxative.",
      sources: ["pdq-pain", "pdq-gi", "nice-ta345", "nice-ta651", "mascc-2020", "cochrane-pamora-2022"],
    },
    {
      name: "Rectal examination and rectal treatments: when they are avoided",
      differs: "The NCI lists a digital rectal examination among the tests that may be part of the evaluation, and in the same summary says that in immunocompromised patients there should be no rectal examinations, suppositories or enemas. Separately it says rectal agents should be avoided in patients at risk of low platelets, low white cells or mucositis, and its pain summary says suppositories and enemas are generally avoided in neutropenia or thrombocytopenia. MASCC says the examination should ideally include a digital rectal examination, and suggests suppositories and enemas only where there is stool in the rectum or descending colon and other measures have not worked.",
      evidence: "The NCI gives the reasoning that anal fissures and abscesses are portals of entry for infection and cites no trial. MASCC grades its suggestion on suppositories and enemas level V and says there are no randomised trials of rectal measures in advanced cancer.",
      sources: ["pdq-gi", "pdq-pain", "mascc-2020"],
    },
    {
      name: "Fluids, fibre and exercise: encouraged, or of limited use",
      differs: "The NCI encourages fluids, fibre and regular exercise before or alongside laxatives. MASCC says such lifestyle changes have a limited role in patients with advanced cancer, are generally unsuitable for them, and improve functional but not opioid-induced constipation in other groups. The NCI's patient page adds that high-fibre foods and fibre supplements can make constipation worse for some people.",
      evidence: "MASCC: level V, suggestion; it says there is no evidence that these strategies work in advanced cancer. The NCI summaries are not graded.",
      sources: ["pdq-gi", "pdq-pain", "mascc-2020", "nci-patient"],
    },
    {
      name: "European stepwise algorithm for opioid-induced constipation (funded by Kyowa Hakko Kirin)",
      differs: "A European expert panel proposes early recognition, fluids, exercise and standard laxatives first, the Bowel Function Index to measure severity and response, and gut-restricted or peripherally acting opioid antagonists second line, adding that a combination of interventions may be needed.",
      evidence: "Expert opinion, read as an abstract only. The record lists the drug company Kyowa Hakko Kirin as funder.",
      sources: ["farmer-2019"],
    },
  ],
  grades: [
    { claim: "Regular laxative for all patients starting strong opioids", grade: "NICE recommendation 1.1.18 (not graded)", source: "nice-cg140" },
    { claim: "Tell patients constipation affects nearly all patients on strong opioids", grade: "NICE recommendation 1.1.17 (not graded)", source: "nice-cg140", quote: "Inform patients that constipation affects nearly all patients receiving strong opioid treatment." },
    { claim: "A bowel regimen starts with the opioid and continues with it", grade: "PDQ summary; not graded", source: "pdq-gi", quote: "a bowel regimen should be initiated when opioids are prescribed and continued for as long as the patient takes them." },
    { claim: "Patients prescribed opioid analgesics should be routinely co-prescribed laxatives (or a peripherally acting opioid antagonist)", grade: "Level of evidence IV; category of guideline: suggestion", source: "mascc-2020" },
    { claim: "No laxative class can be recommended over another when opioid constipation persists despite prevention", grade: "PDQ summary; not graded", source: "pdq-pain", quote: "There is no evidence to recommend one laxative class over another in this setting." },
    { claim: "Laxatives are of similar effectiveness in palliative care, on limited evidence", grade: "Cochrane review; certainty not stated in the abstract", source: "cochrane-laxatives-2015", quote: "This second update found that laxatives were of similar effectiveness but the evidence remains limited due to insufficient data from a few small RCTs." },
    { claim: "Conventional laxatives should be considered first-line in functional constipation (the group recommends polyethylene glycol first)", grade: "Level of evidence I; category of guideline: recommendation; data primarily from the general population", source: "mascc-2020" },
    { claim: "Conventional laxatives should be considered first-line in secondary constipation", grade: "Level of evidence V; category of guideline: suggestion", source: "mascc-2020" },
    { claim: "Peripherally acting mu-opioid receptor antagonists should always be considered in opioid-induced constipation", grade: "Level of evidence I; category of guideline: recommendation", source: "mascc-2020" },
    { claim: "If an opioid antagonist does not work, reassess and consider adding or switching to a conventional laxative or specialist medication", grade: "Level of evidence V; category of guideline: suggestion", source: "mascc-2020" },
    { claim: "Naldemedine after laxative treatment", grade: "NICE technology appraisal recommendation 1.1 (not graded)", source: "nice-ta651", quote: "Naldemedine is recommended, within its marketing authorisation, as an option for treating opioid-induced constipation in adults who have had laxative treatment." },
    { claim: "An opioid antagonist and a conventional laxative are commonly used together", grade: "NICE committee statement (not graded)", source: "nice-ta651", quote: "But, commonly a PAMORA and a conventional laxative are used together." },
    { claim: "Laxatives are stopped before an opioid antagonist is started", grade: "PDQ summary; not graded", source: "pdq-pain", quote: "Laxatives are discontinued before peripherally acting opioid antagonists are initiated." },
    { claim: "Methylnaltrexone may improve bowel function over two weeks in people receiving palliative care", grade: "Moderate-certainty evidence (GRADE)", source: "cochrane-pamora-2022", quote: "Moderate-certainty evidence for methylnaltrexone on spontaneous laxations over two weeks suggests subcutaneous methylnaltrexone may improve bowel function in people receiving palliative care, but certainty of evidence for AEs was low." },
    { claim: "Rectal agents avoided in patients at risk of low platelets, low white cells or mucositis", grade: "PDQ summary; not graded", source: "pdq-gi", quote: "Rectal agents should be avoided in patients with cancer at risk of thrombocytopenia, leukopenia, and/or mucositis from cancer and its treatment." },
    { claim: "Suppositories and enemas generally avoided in neutropenia or thrombocytopenia", grade: "PDQ summary; not graded", source: "pdq-pain", quote: "Suppositories and enemas are generally avoided in the setting of neutropenia or thrombocytopenia." },
    { claim: "Suppositories and enemas only where there is stool in the rectum or descending colon and other measures have not worked", grade: "Level of evidence V; category of guideline: suggestion", source: "mascc-2020" },
    { claim: "Impaction is treated by hydrating and softening the stool so it can be passed or removed", grade: "PDQ summary; not graded", source: "pdq-gi", quote: "The primary treatment of impaction is to hydrate and soften the stool so that it can be removed or passed." },
    { claim: "Lifestyle changes such as dietary fibre and exercise have a limited role in advanced cancer", grade: "Level of evidence V; category of guideline: suggestion", source: "mascc-2020" },
    { claim: "Vincristine: impaction may be in the upper colon with an empty rectum", grade: "Regulatory label; not graded", source: "label-vincristine", quote: "Constipation may take the form of upper–colon impaction, and, on physical examination, the rectum may be empty." },
    { claim: "5-HT3 antiemetics could worsen constipation in people taking opioids", grade: "PDQ summary; not graded", source: "pdq-pain", quote: "However, they could worsen constipation among patients already taking opioids." },
    { claim: "A carer should tell the team about fewer than three bowel movements in a week, severe abdominal pain, vomiting or other signs of impaction", grade: "NCI patient information; not graded", source: "nci-patient", quote: "Notify the care team if the person has had fewer than three bowel movements in one week or is experiencing severe abdominal pain, vomiting, and other signs of fecal impaction." },
    { claim: "MASCC produced 15 recommendations on assessment, treatment and re-assessment", grade: "Level of evidence I to V with a category of guideline: recommendation, suggestion, or no guideline possible", source: "mascc-2020", quote: "The group produced 15 recommendations, with varying levels of evidence and so varying categories of guideline." },
  ],
  sources: [
    { key: "pdq-gi", label: "Gastrointestinal Complications (PDQ), health professional version: constipation, faecal impaction and bowel obstruction", publisher: "US National Cancer Institute, PDQ Supportive and Palliative Care Editorial Board", year: 2025, url: "https://www.cancer.gov/about-cancer/treatment/side-effects/constipation/gi-complications-hp-pdq", gradingScheme: "PDQ summaries cite evidence and do not grade recommendations.", read: "full-text", accessed: "2026-11-17" },
    { key: "pdq-pain", label: "Cancer Pain (PDQ), health professional version: constipation as an adverse effect of opioids", publisher: "US National Cancer Institute, PDQ Supportive and Palliative Care Editorial Board", year: 2025, url: "https://www.cancer.gov/about-cancer/treatment/side-effects/pain/pain-hp-pdq", gradingScheme: "PDQ summaries cite evidence and do not grade recommendations.", read: "full-text", accessed: "2026-11-17" },
    { key: "nice-cg140", label: "Palliative care for adults: strong opioids for pain relief (CG140), recommendations", publisher: "NICE", year: 2012, url: "https://www.nice.org.uk/guidance/cg140/chapter/Recommendations", gradingScheme: "NICE does not grade recommendations; the wording (offer, consider) carries the strength.", read: "full-text", accessed: "2026-11-17" },
    { key: "nice-ta345", label: "Naloxegol for treating opioid-induced constipation (TA345), guidance chapter", publisher: "NICE", year: 2015, url: "https://www.nice.org.uk/guidance/ta345/chapter/1-Guidance", gradingScheme: "NICE technology appraisal; recommendations are not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "nice-ta651", label: "Naldemedine for treating opioid-induced constipation (TA651), recommendations chapter", publisher: "NICE", year: 2020, url: "https://www.nice.org.uk/guidance/ta651/chapter/1-Recommendations", gradingScheme: "NICE technology appraisal; recommendations are not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "label-vincristine", label: "Vincristine sulfate injection: US prescribing information (label revised 12/2025), adverse reactions (gastrointestinal)", publisher: "Hospira (DailyMed, US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b22e4c8e-dbe1-4d4b-a026-e1812974071c", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "nice-ng234", label: "Spinal metastases and metastatic spinal cord compression (NG234), recommendations", publisher: "NICE", year: 2023, url: "https://www.nice.org.uk/guidance/ng234/chapter/Recommendations", gradingScheme: "NICE does not grade recommendations; the wording (offer, consider) carries the strength.", read: "full-text", accessed: "2026-11-17" },
    { key: "nci-patient", label: "Constipation and Cancer Treatment (patient page, updated 16 May 2025)", publisher: "US National Cancer Institute", year: 2025, url: "https://www.cancer.gov/about-cancer/treatment/side-effects/constipation", gradingScheme: "Patient information; not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "cochrane-laxatives-2015", label: "Laxatives for the management of constipation in people receiving palliative care", publisher: "Cochrane Database of Systematic Reviews (Candy et al.)", year: 2015, url: "https://doi.org/10.1002/14651858.CD003448.pub4", doi: "10.1002/14651858.CD003448.pub4", gradingScheme: "Cochrane review; the abstract states no GRADE ratings.", read: "abstract", accessed: "2026-11-17" },
    { key: "cochrane-pamora-2022", label: "Mu-opioid antagonists for opioid-induced bowel dysfunction in people with cancer and people receiving palliative care", publisher: "Cochrane Database of Systematic Reviews (Candy et al.)", year: 2022, url: "https://doi.org/10.1002/14651858.CD006332.pub4", doi: "10.1002/14651858.CD006332.pub4", gradingScheme: "GRADE certainty of evidence: high, moderate, low or very low.", read: "abstract", accessed: "2026-11-17" },
    { key: "mascc-2020", label: "MASCC recommendations on the management of constipation in patients with advanced cancer (read as the author-accepted manuscript held by UCL Discovery)", publisher: "Supportive Care in Cancer (Davies et al., MASCC Palliative Care Study Group)", year: 2020, url: "https://doi.org/10.1007/s00520-019-05016-4", doi: "10.1007/s00520-019-05016-4", gradingScheme: "Level of evidence I to V, with a category of guideline: recommendation (level I or II evidence), suggestion (level III to V, with panel consensus) or no guideline possible.", read: "full-text", accessed: "2026-11-17" },
    { key: "esmo-2018", label: "Diagnosis, assessment and management of constipation in advanced cancer: ESMO Clinical Practice Guidelines", publisher: "ESMO (Annals of Oncology, Larkin et al.)", year: 2018, url: "https://doi.org/10.1093/annonc/mdy148", doi: "10.1093/annonc/mdy148", read: "not-reachable", accessed: "2026-11-17" },
    { key: "farmer-2019", label: "Pathophysiology and management of opioid-induced constipation: European expert consensus statement (funded by Kyowa Hakko Kirin)", publisher: "United European Gastroenterology Journal (Farmer et al.; funder listed as Kyowa Hakko Kirin)", year: 2019, url: "https://doi.org/10.1177/2050640618818305", doi: "10.1177/2050640618818305", gradingScheme: "Expert panel opinion; not graded in the abstract.", read: "abstract", accessed: "2026-11-17" },
  ],
  drugs: ["vincristine"],
  cancers: [],
  terms: [],
  related: ["malignant-bowel-obstruction", "strong-opioids-for-cancer-pain", "opioid-switching-and-conversion", "metastatic-spinal-cord-compression-emergency", "hypercalcaemia-of-malignancy-management", "methylnaltrexone", "morphine", "oxycodone", "ondansetron"],
  upgrades: [],
  gaps: [
    "The ESMO Clinical Practice Guidelines on constipation in advanced cancer (Larkin et al., Ann Oncol 2018) could not be read. On 17 November 2026 the publisher's page again returned 403 to a script, Europe PMC held no abstract or full text, and no open copy was found. Its graded recommendations, including its position on osmotic and stimulant laxatives, rectal measures and opioid antagonists, are not reported here. No newer edition was found.",
    "The MASCC recommendations (Davies et al., Support Care Cancer 2020) were read on 17 November 2026 as the author-accepted manuscript held open by UCL Discovery, not as the journal's typeset article, which sits behind a subscription. The recommendations and levels reported here come from that manuscript; it is not quoted, because the published wording could differ. Three of its authors declared personal fees from Kyowa Kirin.",
    "The NCI PDQ summaries do not grade their statements, and NICE covers only laxatives with strong opioids and two opioid antagonists. Most of the 15 MASCC recommendations are suggestions resting on level IV or V evidence.",
    "No trial has shown which laxative is best in people with cancer. The Cochrane review (2015) found only a few small trials, none of polyethylene glycol and none of any rectal treatment. Both Cochrane reviews were read as abstracts only.",
    "Sources differ on whether laxatives stop when a peripherally acting opioid antagonist is started (NCI: stopped; NICE TA651: commonly used together; MASCC: add or switch to a laxative if the antagonist does not work). No trial read settles it.",
    "The advice to avoid rectal examination, suppositories and enemas in immunocompromised patients, and rectal agents when white cells or platelets are low, is stated by the NCI without a cited trial, and no source read gives a count below which it applies.",
    "Antibody-drug conjugates: constipation is recorded here as a common side effect of brentuximab vedotin, trastuzumab deruxtecan, datopotamab deruxtecan and sacituzumab govitecan, but no source read gives management specific to them, so they are not listed as drugs of this protocol. The same is true of 5-HT3 antiemetics beyond the NCI's remark that they could worsen constipation on opioids.",
    "Of the neurotoxic drugs the NCI names as causes (vinca alkaloids, oxaliplatin, taxanes, thalidomide), only the vincristine label was read; it is the only one listed as a drug of this protocol.",
    "No dose is given here for any laxative or opioid antagonist. The NCI table lists US doses and products; UK formularies differ and were not read. MASCC asks that each medicine be used in line with its Summary of Product Characteristics.",
    "NICE CKS, the ONS guidelines on cancer constipation (2020) and NCCN palliative care guidance were not read and are not cited.",
    "The only figure read for when to report is on the NCI's patient page, which asks carers to tell the team about fewer than three bowel movements in one week; the NCI's professional summary notes that the usual definition of a normal bowel pattern may be inappropriate for people with cancer. The warning signs in the plain summaries here come from that patient page (severe abdominal pain, vomiting, sudden diarrhoea or leaking stool) and from NICE NG234 (limb weakness, numbness). No source read sets a number of hours for any of them.",
    "The European consensus on opioid-induced constipation (Farmer et al., 2019) was read as an abstract only on 17 November 2026; Crossref lists a correction to it that was not read.",
  ],
});
