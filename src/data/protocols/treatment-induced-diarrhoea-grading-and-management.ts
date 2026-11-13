import { protocol } from "./helpers";

/*
 * Diarrhoea caused by chemotherapy, targeted therapy and radiotherapy: grading, first steps at home, loperamide,
 * escalation, octreotide, and when to admit. Two drug-specific protocols sit beside it and are linked in `related`:
 * irinotecan (early cholinergic syndrome and late diarrhoea) and neratinib (prophylaxis or dose escalation). Diarrhoea
 * from checkpoint inhibitors is a different illness (immune colitis) and is excluded, as eviQ excludes it.
 *
 * What was read, and how (11 November 2026, fetched raw with curl or the Europe PMC REST API into a scratch directory
 * and read as text):
 * - ESMO Clinical Practice Guideline on diarrhoea in adult cancer patients (Bossi et al., Ann Oncol 2018): the latest
 *   ESMO edition. Europe PMC holds no abstract and both academic.oup.com and annalsofoncology.org returned 403 to a
 *   script. Not read.
 * - eviQ (Cancer Institute NSW) "Treatment induced diarrhoea", ID 779 version 5 (updated May 2022, last reviewed
 *   November 2020, review overdue as eviQ itself says): full public page.
 * - eviQ "Algorithm: irinotecan and sacituzumab govitecan induced diarrhoea management", ID 3238 version 3 (last
 *   reviewed June 2024): the PDF algorithm, full text.
 * - NCI PDQ "Gastrointestinal Complications (PDQ), Health Professional Version", diarrhoea section (updated 3 April
 *   2025): full public page.
 * - MASCC/ISOO mucositis guidelines 2014 (Lalla et al., Cancer 2014; PMC4164022), full text, for the octreotide
 *   recommendation, and the 2020 update (Elad et al., Cancer 2020), full text, which states that recommendation was
 *   unchanged and keeps the probiotic suggestion.
 * - Benson et al., "Recommended guidelines for the treatment of cancer treatment-induced diarrhea" (J Clin Oncol 2004):
 *   abstract only, from Europe PMC; the full text and its algorithm were not read. PDQ describes that panel's advice.
 * Every DOI was resolved through Europe PMC or Crossref and its title checked. Quotes are copied from the raw text with
 * nothing changed.
 */
export const treatmentInducedDiarrhoeaGradingAndManagement = protocol({
  id: "treatment-induced-diarrhoea-grading-and-management",
  name: "Diarrhoea from chemotherapy, targeted therapy and radiotherapy: grading, loperamide, octreotide and when to admit",
  aka: ["chemotherapy-induced diarrhoea", "CID", "cancer treatment-induced diarrhea", "loperamide for chemotherapy diarrhoea", "octreotide for chemotherapy diarrhoea", "complicated diarrhoea"],
  domain: "symptom-management",
  tldr: "Treatment diarrhoea can turn dangerous quickly, especially with a low blood count. Drink plenty and start loperamide at the first loose stool if your team has told you to. Call the 24-hour line at once if it does not settle within a day, if there are seven or more stools a day, or with fever, blood, vomiting or dizziness. If cancer tablets are the cause and loperamide fails, stop them and ring.",
  simple: "Cancer treatment can cause runny poo. Drink lots and take the medicine your team gave you. Call them fast if it does not stop or you feel ill or hot.",
  summary: "The usual approach, as written by eviQ (Cancer Institute NSW) and NCI PDQ, follows the 2004 expert panel (Benson et al.): grade the diarrhoea with CTCAE, look for complicating features, and split uncomplicated from complicated diarrhoea. Uncomplicated grade 1 or 2 diarrhoea is managed at home with clear fluids, dietary changes and standard-dose loperamide (4 mg, then 2 mg every 4 hours or after each loose stool until 12 hours free of diarrhoea), increased to 2 mg every 2 hours if it persists beyond 24 hours. Grade 3 or 4 diarrhoea, or grade 1 or 2 with cramping, fever, sepsis, neutropenia, bleeding, nausea or vomiting, dehydration or falling performance status, or diarrhoea lasting beyond 48 hours on loperamide, is complicated: it usually needs admission, stool cultures, intravenous fluids, antibiotics and subcutaneous octreotide (100 to 150 micrograms three times daily, escalated to 500 micrograms). MASCC/ISOO recommend octreotide of at least 100 micrograms twice daily when loperamide fails after chemotherapy associated with transplant (level II), and suggest Lactobacillus probiotics to prevent diarrhoea from pelvic radiotherapy (level III). Anticancer treatment is interrupted and the dose modified by the regimen's own rules. Irinotecan, sacituzumab govitecan and neratinib have their own protocols; checkpoint inhibitor diarrhoea is immune colitis and is excluded. The latest ESMO guideline (2018) could not be read.",
  asOf: "2026-11-11",
  setting: {
    who: ["nurse", "doctor", "pharmacist", "patient-or-carer"],
    where: ["home", "telephone-triage", "chemotherapy-day-unit", "acute-oncology-service", "ward"],
  },
  population: "Adults with diarrhoea caused by chemotherapy, targeted therapy or radiotherapy. Excludes diarrhoea from PD-1, PD-L1 or CTLA-4 checkpoint inhibitors, which is managed as immune-related colitis, and gastrointestinal graft-versus-host disease. Irinotecan and sacituzumab govitecan (early cholinergic and late diarrhoea) and neratinib (prophylaxis) have their own protocols. Children are not covered by the sources read.",
  trigger: "A person on cancer treatment reports more stools than usual, looser stools or a rise in stoma output.",
  steps: [
    {
      action: "Before treatment starts, tell the person how likely diarrhoea is, when to start loperamide, how much to drink, and when to call",
      why: "Diarrhoea from treatment can become dangerous within a day or two; people who know what to do and when to ring act sooner.",
      source: "eviq-779",
      quote: "Educate patient about: the likelihood of experiencing diarrhoea prior to commencement of treatment",
    },
    {
      action: "Grade the diarrhoea with CTCAE (stools per day above baseline, stoma output, effect on daily life) and ask about cramps, fever, blood, vomiting, dizziness and fluid intake",
      why: "The grade and any warning signs decide whether it can be managed at home or needs hospital care.",
      source: "eviq-779",
      quote: "The severity of treatment induced diarrhoea should be evaluated as per the CTCAE grading table below.",
    },
    {
      action: "Ask whether the person is on a checkpoint inhibitor; if so, manage as immune-related colitis instead and do not start antidiarrhoeals by this protocol",
      why: "Diarrhoea from immunotherapy can be inflammation of the bowel that needs steroids; slowing the bowel can hide it.",
      source: "eviq-779",
      quote: "If immune colitis is suspected antidiarrhoeal agents are contraindicated and management of this and any diarrhoea as a result of these agents should be according to the Management of immune related adverse events (irAEs) document.",
    },
    {
      action: "Manage uncomplicated grade 1 or 2 diarrhoea at home; arrange admission for grade 3 or 4, or for grade 1 or 2 with cramping, fever, sepsis, neutropenia, bleeding, nausea or vomiting, dehydration or falling performance status",
      why: "Diarrhoea with these features can lead to dehydration, kidney damage and infection, and needs drips, tests and closer watching.",
      source: "eviq-779",
      quote: "Uncomplicated patients presenting with grade 1-2 diarrhoea may be managed conservatively in the outpatient setting. However, patients with grade 3-4 diarrhoea or grade 1-2 diarrhoea plus one or more additional symptoms of cramping, fever, sepsis, neutropenia, frank bleeding, nausea or vomiting, dehydration or declining performance status, will often require hospital admission.",
    },
    {
      action: "Advise 8 to 10 large glasses of clear fluid a day, small bland meals, and a record of the number and consistency of stools",
      why: "Replacing lost fluid prevents dehydration, and a stool record shows the team whether things are improving.",
      source: "eviq-779",
      quote: "oral rehydration, approximately 8 to 10 large glasses of clear liquids per day (e.g. water, sports drinks, clear juices or broth)",
    },
    {
      action: "Start loperamide 4 mg at the first loose stool, then 2 mg every 4 hours or after each unformed stool, until 12 hours free of diarrhoea",
      why: "Loperamide slows the bowel and controls most treatment-related diarrhoea when it is started early.",
      source: "eviq-779",
      quote: "4 mg at the first onset of diarrhoea followed by 2 mg every 4 hours or after every unformed stool and continued until diarrhoea free for 12 hrs.",
    },
    {
      action: "If diarrhoea lasts beyond 24 hours, increase loperamide to 2 mg every 2 hours; if it lasts beyond 48 hours, treat it as complicated",
      why: "Diarrhoea that does not respond to standard loperamide is more likely to become severe and needs a different approach.",
      source: "eviq-779",
      quote: "If diarrhoea persists beyond 24 hours, the dose of loperamide should be increased to 2 mg every 2 hours. If diarrhoea persists beyond 48 hours, the patient’s symptoms should be considered complicated and managed as grade 3-4 diarrhoea.",
    },
    {
      action: "For complicated diarrhoea, send stool for culture and C. difficile, check blood count and electrolytes, and give intravenous fluids and antibiotics as needed",
      why: "Infection and dehydration must be found and treated quickly, particularly when the blood count is low.",
      source: "eviq-779",
      quote: "Treatment may include aggressive intravenous rehydration, antidiarrhoeal medications, antibiotics, octreotide (for chemotherapy and targeted therapy induced diarrhoea, unresponsive to high dose loperamide) and a diagnostic work up. Stool should be sent for culture in these patients and electrolytes closely monitored.",
    },
    {
      action: "When high-dose loperamide fails, give octreotide 100 to 150 micrograms subcutaneously three times daily and escalate quickly up to 500 micrograms three times daily",
      why: "Octreotide reduces the fluid the bowel pours out and controls most diarrhoea that loperamide does not.",
      source: "eviq-779",
      quote: "The recommended starting dose is 100 to 150 micrograms three times daily given subcutaneously (alternatively can give 25-50 micrograms/hour via intravenous infusion), with the dose rapidly escalated to 500 micrograms three times a day subcutaneously/intravenously.",
      grade: "MASCC/ISOO level II (transplant-associated chemotherapy)",
    },
    {
      action: "Interrupt the anticancer treatment until the diarrhoea has resolved and follow the regimen's protocol for dose changes",
      why: "Continuing the drug that causes the diarrhoea makes it worse; a lower dose can allow treatment to continue safely.",
      source: "eviq-779",
      quote: "Treatment with anti-cancer agents may need to be interrupted until symptoms have resolved and dose modification may be considered.",
    },
    {
      action: "Tell anyone taking cancer tablets to stop them and call the team if diarrhoea does not settle with loperamide",
      why: "With tablets at home, nobody else will stop the drug; carrying on can turn mild diarrhoea into a dangerous one.",
      source: "eviq-779",
      quote: "Patients taking oral anti-cancer therapy must be informed that if they develop diarrhoea which does not settle with loperamide, then they must STOP taking oral anti-cancer therapy and contact their treating team.",
    },
    {
      action: "For loose stools that persist through treatment, consider bile acid malabsorption and a gastroenterology referral",
      why: "Some long-lasting diarrhoea after pelvic radiotherapy, bowel or pancreatic surgery or some drugs is caused by bile acids and has its own treatment.",
      source: "eviq-779",
      quote: "For patients who have chronic loose stools that persist throughout treatment, bile acid malabsorption may be the cause",
    },
  ],
  bestInClass: {
    statement: "No current guideline could be read in full that is newer than the 2004 expert panel on which the common approach rests: the 2018 ESMO guideline refused a script. The best-supported practice in the sources read is the eviQ version of that approach (also described by NCI PDQ, 2025): CTCAE grading with a check for complicating features, home management of uncomplicated grade 1 or 2 diarrhoea with fluids and standard-dose loperamide, escalation to high-dose loperamide at 24 hours, and admission with stool tests, intravenous fluids, antibiotics and octreotide for complicated diarrhoea. MASCC/ISOO give the only graded recommendation read, for octreotide after loperamide fails in transplant-associated chemotherapy (level II, 2014, unchanged in 2020). The sources differ on octreotide: eviQ reserves it for loperamide failure, while the 2004 panel, as PDQ reports it, would use high-dose octreotide first for grade 3 or 4 diarrhoea.",
    sources: ["eviq-779", "pdq-gi-2025", "mascc-isoo-2014", "mascc-isoo-2020", "benson-2004", "esmo-2018"],
  },
  variants: [
    {
      name: "High-dose loperamide from the first day, then octreotide (2004 expert panel, as reported by NCI PDQ)",
      differs: "Uses loperamide 2 mg every 2 hours from the first day of low-grade diarrhoea, followed by octreotide 100 to 150 micrograms every 8 hours, and octreotide 500 to 1500 micrograms every 8 hours as first-line treatment for grade 3 or 4 diarrhoea; suggests severe radiotherapy diarrhoea may be cared for in an outpatient unit or with intensive home nursing rather than in hospital.",
      evidence: "Expert panel consensus. PDQ notes that the optimal octreotide dose has not been established and that, in a prospective study of 32 people with diarrhoea refractory to loperamide, octreotide 100 micrograms three times a day resolved it in 30.",
      sources: ["pdq-gi-2025", "benson-2004"],
    },
    {
      name: "Lactobacillus probiotics to prevent diarrhoea during pelvic radiotherapy (MASCC/ISOO)",
      differs: "Adds a probiotic containing Lactobacillus during pelvic radiotherapy or chemoradiotherapy to prevent diarrhoea.",
      evidence: "MASCC/ISOO suggestion at level III (2020, maintained from 2014). eviQ limits it to pelvic cancers and advises avoiding it in people who are or may become neutropenic, because of the risk of infection.",
      sources: ["mascc-isoo-2020", "eviq-779"],
    },
    {
      name: "Diphenoxylate with atropine as an alternative to loperamide",
      differs: "Two tablets three or four times a day until 12 hours free of diarrhoea, instead of loperamide.",
      evidence: "eviQ lists it as an alternative but says loperamide appears more effective and is the agent guidelines recommend.",
      sources: ["eviq-779"],
    },
  ],
  grades: [
    { claim: "Octreotide of at least 100 micrograms subcutaneously twice daily for diarrhoea after standard- or high-dose chemotherapy associated with transplant, when loperamide is ineffective", grade: "Recommendation, level of evidence II", source: "mascc-isoo-2014", quote: "The panel recommends that octreotide, at a dose of ≥100 μg subcutaneously twice daily, be used to treat diarrhea induced by standard‐ or high‐dose chemotherapy associated with HSCT, if loperamide is ineffective (II)." },
    { claim: "Lactobacillus probiotics may help prevent diarrhoea from pelvic radiotherapy or chemoradiotherapy", grade: "Suggestion, level of evidence III", source: "mascc-isoo-2020", quote: "The panel suggests that probiotics containing Lactobacillus spp. may be beneficial for the prevention of RT‐induced or RT‐CT–induced diarrhea in patients with pelvic malignancy." },
    { claim: "Loperamide may be less effective in grade 3 or 4 diarrhoea", grade: "PDQ level of evidence I", source: "pdq-gi-2025", quote: "Regardless of the dose, however, loperamide may be less effective in patients with grade 3 or 4 diarrhea." },
  ],
  sources: [
    { key: "eviq-779", label: "Treatment induced diarrhoea (ID 779, version 5)", publisher: "eviQ, Cancer Institute NSW", year: 2022, url: "https://www.eviq.org.au/p/779", gradingScheme: "Evidence-based summary endorsed by eviQ reference committees; recommendations are not graded. Last reviewed November 2020, updated May 2022, review due December 2022 and not yet repeated.", read: "full-text", accessed: "2026-11-11" },
    { key: "pdq-gi-2025", label: "Gastrointestinal Complications (PDQ), Health Professional Version: Diarrhea", publisher: "National Cancer Institute", year: 2025, url: "https://www.cancer.gov/about-cancer/treatment/side-effects/constipation/gi-complications-hp-pdq", gradingScheme: "PDQ levels of evidence (I = randomised controlled trials, through to IV = expert opinion), attached to statements rather than recommendations.", read: "full-text", accessed: "2026-11-11" },
    { key: "mascc-isoo-2014", label: "MASCC/ISOO clinical practice guidelines for the management of mucositis secondary to cancer therapy", publisher: "MASCC/ISOO, Cancer", year: 2014, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4164022/", doi: "10.1002/cncr.28592", gradingScheme: "MASCC/ISOO: recommendation (strong evidence) or suggestion (weaker evidence), with level of evidence I to V in brackets.", read: "full-text", accessed: "2026-11-11" },
    { key: "mascc-isoo-2020", label: "MASCC/ISOO clinical practice guidelines for the management of mucositis secondary to cancer therapy (2020 update)", publisher: "MASCC/ISOO, Cancer", year: 2020, url: "https://doi.org/10.1002/cncr.33100", doi: "10.1002/cncr.33100", gradingScheme: "MASCC/ISOO: recommendation or suggestion, with level of evidence I to V.", read: "full-text", accessed: "2026-11-11" },
    { key: "benson-2004", label: "Recommended guidelines for the treatment of cancer treatment-induced diarrhea", publisher: "Journal of Clinical Oncology", year: 2004, url: "https://europepmc.org/abstract/MED/15254061", doi: "10.1200/JCO.2004.04.132", gradingScheme: "Expert panel consensus; not graded.", read: "abstract", accessed: "2026-11-11" },
    { key: "esmo-2018", label: "Diarrhoea in adult cancer patients: ESMO Clinical Practice Guidelines", publisher: "ESMO, Annals of Oncology", year: 2018, url: "https://doi.org/10.1093/annonc/mdy145", doi: "10.1093/annonc/mdy145", read: "not-reachable", accessed: "2026-11-11" },
  ],
  gaps: [
    "The 2018 ESMO guideline on diarrhoea, the latest ESMO edition, could not be read: Europe PMC holds no abstract and the publisher refused a script. Its grades and any differences from eviQ are not shown here.",
    "The 2004 expert panel was read only as an abstract; its algorithm is reported here through NCI PDQ and eviQ.",
    "NCCN and ASCO guidance on treatment-induced diarrhoea was not read; no ASCO guideline on the subject newer than 2004 was found.",
    "The eviQ page is past its own review date (due December 2022); eviQ says it is reviewing high-priority documents first in 2026.",
    "The optimal octreotide dose is not established: eviQ, PDQ and MASCC/ISOO give different starting doses (100 micrograms twice daily to 150 micrograms three times daily), and PDQ reports up to 1500 micrograms every 8 hours for severe diarrhoea.",
    "Which antibiotics to give for complicated diarrhoea, and when, is not specified in the sources read; local febrile neutropenia and antimicrobial policies apply.",
    "Dose modification rules for each anticancer drug come from each regimen's protocol and product information, not from these sources.",
    "The sources read do not cover children.",
  ],
  institutions: ["nci", "mascc", "esmo"],
  technologies: ["probiotics-treatment-diarrhoea", "bowel-after-pelvic-radiotherapy"],
  drugs: ["fluorouracil", "capecitabine", "irinotecan", "sacituzumab-govitecan", "idelalisib", "pertuzumab", "panitumumab", "cetuximab", "sorafenib", "loperamide"],
  terms: ["ctcae-grading", "immune-colitis", "febrile-neutropenia"],
  related: ["irinotecan-early-cholinergic-syndrome-and-late-diarrhoea", "neratinib-diarrhoea-prophylaxis-and-dose-escalation", "octreotide-lanreotide", "febrile-neutropenia-first-hour"],
  sections: ["supportive-care"],
  tags: ["protocol", "diarrhoea", "supportive-care"],
});
