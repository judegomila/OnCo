import { protocol } from "./helpers";

/*
 * Pre-emptive skin care for the acne-like (papulopustular) rash of EGFR inhibitors: an oral tetracycline, moisturiser,
 * sunscreen and a mild topical steroid from the first day, then dose changes by grade. Covers the EGFR antibodies
 * (cetuximab, panitumumab), the bispecific amivantamab, and the EGFR tyrosine kinase inhibitors.
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl, the DailyMed SPL web service or the Europe
 * PMC REST API into a scratch directory and read as text):
 * - MASCC Skin Toxicity Study Group guideline on EGFR inhibitor dermatologic toxicities (Lacouture et al., Support Care
 *   Cancer 2011): full text from PubMed Central (PMC3128700), including the evidence and grade tables. No later MASCC
 *   edition was found in Europe PMC.
 * - ESMO 2021 guideline on dermatological toxicities (Ann Oncol 2021): not reachable (no abstract in Europe PMC;
 *   annalsofoncology.org returned 403).
 * - RYBREVANT (amivantamab) US prescribing information, DailyMed version of 13 July 2026, section 2.6 (prophylactic
 *   and concomitant medicines), and VECTIBIX (panitumumab), DailyMed version of 26 June 2026, boxed warning, section
 *   2.3 and sun advice. Full text.
 * - Trials and reviews, as abstracts from Europe PMC: STEPP (J Clin Oncol 2010), J-STEPP (Future Oncol 2015), COCOON
 *   (J Thorac Oncol 2025), the Valentino post hoc analysis (Support Care Cancer 2021) and a 2022 systematic review and
 *   meta-analysis (Asia Pac J Clin Oncol).
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied from the raw text unchanged.
 */
export const egfrInhibitorRashProphylaxis = protocol({
  id: "egfr-inhibitor-rash-prophylaxis",
  name: "EGFR inhibitor rash: pre-emptive skin care, antibiotics and dose changes",
  aka: ["EGFR inhibitor rash prophylaxis", "acneiform rash", "papulopustular rash", "pre-emptive doxycycline", "pre-emptive skin treatment", "cetuximab rash", "panitumumab rash", "amivantamab skin care", "COCOON regimen", "STEPP regimen"],
  domain: "symptom-management",
  tldr: "Drugs that block EGFR, such as cetuximab, panitumumab, amivantamab and EGFR tablets for lung cancer, very often cause an acne-like rash. Starting skin care on day one makes a bad rash much less likely: doxycycline or minocycline for the first weeks, moisturiser, sunscreen, and sometimes a mild steroid cream. Tell your team early if it spreads or hurts: a pause or lower dose may help.",
  simple: "Some cancer drugs cause a spotty rash. Starting antibiotic tablets, moisturiser and sunscreen on day one helps. Tell your team if the rash gets bad.",
  summary: "The MASCC Skin Toxicity Study Group (2011) recommends pre-emptive management for EGFR inhibitor rash because it is frequent and appears in the first 2 to 4 weeks: hydrocortisone 1 per cent with moisturiser and sunscreen twice daily, plus doxycycline 100 mg twice daily (or minocycline 100 mg daily) for the first 6 weeks, based on the randomised STEPP trial. In STEPP (panitumumab, 95 people), protocol-specified grade 2 or worse skin toxicity in 6 weeks fell from 62 to 29 per cent; J-STEPP repeated the result in Japanese patients (62.5 to 21.3 per cent). A 2022 meta-analysis found oral antibiotics reduced grade 2 or worse rash by 40 per cent; topical antibiotics, vitamin K1 cream and sunscreen alone were not significant. For amivantamab, the 2026 US label now recommends the COCOON regimen at initiation: doxycycline or minocycline 100 mg twice daily for 12 weeks, then clindamycin 1 per cent lotion to the scalp for 9 months, a non-comedogenic moisturiser, daily 4 per cent chlorhexidine for hands and feet, and sun protection; in the COCOON trial (amivantamab with lazertinib, 201 people) it reduced grade 2 or worse dermatologic events by week 12 from 75 to 42 per cent. Doubts remain: in a post hoc analysis of the Valentino trial of first-line panitumumab, doxycycline prophylaxis did not significantly lower rash. Dose rules come from labels: panitumumab is withheld for 1 to 2 doses at grade 3 and restarted at 100, 80 then 60 per cent by occurrence. The ESMO 2021 guideline could not be read.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "patient-or-carer"],
    where: ["outpatient-clinic", "chemotherapy-day-unit", "home"],
  },
  population: "Adults starting an EGFR-targeted drug: cetuximab or panitumumab (colorectal and head and neck cancer), amivantamab with or without lazertinib, and EGFR tyrosine kinase inhibitors (erlotinib, gefitinib, afatinib, osimertinib) in lung cancer. STEPP and J-STEPP were in metastatic colorectal cancer on panitumumab; COCOON in untreated EGFR-mutant lung cancer on amivantamab with lazertinib. Tetracyclines are not suitable in pregnancy or for some people with drug allergies; the sources read do not list contraindications in full.",
  trigger: "An EGFR-targeted drug is planned; prophylaxis starts on the first day of treatment.",
  steps: [
    {
      action: "Start pre-emptive skin care on the first day of an EGFR inhibitor, rather than waiting for the rash",
      why: "The rash is very common and comes in the first weeks; treating early prevents most of the severe cases.",
      source: "mascc-2011",
      quote: "Based on the high frequency of rash in EGFRI-treated patients and the consistent presentation within the first 2–4 weeks of therapy, preventive/prophylactic management is recommended unless there are contraindications based on patient and/or health care provider factors [ 6 – 12 ].",
      grade: "Level II, grade A (systemic tetracycline)",
    },
    {
      action: "Prescribe doxycycline 100 mg twice daily (or minocycline 100 mg daily) for the first 6 weeks, with hydrocortisone 1 per cent cream, a moisturiser and sunscreen twice daily",
      why: "The antibiotic is used for its anti-inflammatory effect on the skin, not for infection; with gentle skin care it halved moderate rash in the trial behind this advice.",
      source: "mascc-2011",
      quote: "Hydrocortisone 1% combined with moisturizer, sunscreen, and doxycycline 100 mg bid for the first 6 weeks is recommended based on randomized data.",
      grade: "Level II, grade A (tetracycline); Level II, grade C (topical hydrocortisone with moisturiser and sunscreen)",
    },
    {
      action: "With amivantamab, follow the label regimen from day 1: doxycycline or minocycline 100 mg twice daily for 12 weeks, then clindamycin 1 per cent lotion on the scalp once daily for 9 months",
      why: "Amivantamab causes rash, scalp and nail problems over many months; a longer regimen covering the scalp reduced moderate skin problems in a randomised trial.",
      source: "rybrevant-label",
      quote: "Administer an oral antibiotic (doxycycline or minocycline, 100 mg orally twice daily) starting on Day 1 for the first 12 weeks of treatment.",
      grade: "US prescribing information",
    },
    {
      action: "With amivantamab, add a non-comedogenic moisturiser on the face and body and a daily 4 per cent chlorhexidine wash for the hands and feet",
      why: "Moisturiser protects dry skin; the antiseptic wash aims to prevent infection around the nails (paronychia).",
      source: "rybrevant-label",
      quote: "Wash hands and feet with 4% chlorhexidine solution once daily.",
      grade: "US prescribing information",
    },
    {
      action: "Advise sun protection during treatment and for 2 months after: sunscreen, hats and protective clothing, and limiting time in strong sun",
      why: "Sunlight makes the rash worse, and some of the tetracyclines make skin more sensitive to sun.",
      source: "vectibix-label",
      quote: "Advise patients to limit sun exposure (use sunscreen, wear hats) while receiving Vectibix and for 2 months after the last dose of Vectibix therapy",
      grade: "US prescribing information",
    },
    {
      action: "If rash develops despite prophylaxis, treat with a medium- to high-potency topical steroid and continue or start the oral tetracycline",
      why: "The rash is inflammatory rather than true acne, so anti-inflammatory creams help; acne creams that dry the skin can make it worse.",
      source: "mascc-2011",
      quote: "Reactive use of medium- to high-potency topical corticosteroids is recommended based on studies showing in vitro release of inflammatory chemokines after EGFRI therapy.",
      grade: "Level IV, grade C",
    },
    {
      action: "Panitumumab: at a first grade 3 skin reaction, withhold 1 to 2 doses and restart at the original dose once it is below grade 3; reduce to 80 then 60 per cent on later occurrences and stop on the fourth",
      why: "A pause lets the skin settle while keeping the treatment going; repeated severe rashes need a lower dose.",
      source: "vectibix-label",
      quote: "Upon first occurrence of a Grade 3 (NCI-CTC/CTCAE) dermatologic reaction, withhold 1 to 2 doses of Vectibix. If the reaction improves to < Grade 3, reinitiate Vectibix at the original dose.",
      grade: "US prescribing information",
    },
  ],
  bestInClass: {
    statement: "Pre-emptive treatment from day 1 with an oral tetracycline, moisturiser, sunscreen and a mild topical steroid is the best-supported approach for EGFR antibodies, on the MASCC 2011 guideline (systemic tetracycline Level II, grade A) and two randomised trials (STEPP, J-STEPP), and oral antibiotics are the only preventive measure significant in the 2022 meta-analysis. For amivantamab the US label now builds the COCOON regimen into dosing, on the strength of a randomised trial. The evidence is not uniform: a post hoc analysis of first-line panitumumab in the Valentino trial found no significant reduction in rash with doxycycline. The ESMO 2021 dermatological toxicity guideline, the most recent international guideline, could not be read, and MASCC has not updated its 2011 guideline in any source found.",
    sources: ["mascc-2011", "stepp-2010", "j-stepp-2015", "egfr-ma-2022", "rybrevant-label", "cocoon-2025", "valentino-2021", "esmo-derm-2021"],
  },
  variants: [
    {
      name: "COCOON enhanced dermatologic management (amivantamab with lazertinib)",
      differs: "Twelve weeks of oral doxycycline or minocycline (rather than 6), then 9 months of clindamycin 1 per cent on the scalp, chlorhexidine 4 per cent on fingernails and toenails, and ceramide-based moisturiser at least daily.",
      evidence: "Randomised phase 2 trial of 201 people: grade 2 or worse dermatologic adverse events of interest by week 12 in 42 per cent against 75 per cent with standard care (odds ratio 0.24); patient-reported quality of life favoured the regimen. Now in the US amivantamab label.",
      sources: ["cocoon-2025", "rybrevant-label"],
    },
    {
      name: "Reactive treatment only (first-line panitumumab, Valentino analysis)",
      differs: "Treating rash when it appears rather than with routine prophylaxis.",
      evidence: "Post hoc, non-randomised comparison within the Valentino trial (226 people): any-grade rash 81 per cent with doxycycline prophylaxis against 90 per cent without (P = 0.085), grade 3 or 4 rash 27 against 25 per cent; no difference in dose delays, reductions or survival.",
      sources: ["valentino-2021"],
    },
  ],
  grades: [
    { claim: "Pre-emptive skin treatment halved grade 2 or worse skin toxicity with panitumumab (STEPP)", grade: "randomised phase 2 open-label trial, n = 95", source: "stepp-2010", quote: "The incidence of protocol-specified >or= grade 2 skin toxicities during the 6-week skin treatment period was 29% and 62% for the pre-emptive and reactive groups, respectively." },
    { claim: "The result was repeated in Japanese patients (J-STEPP)", grade: "randomised open-label trial, n = 95, P < 0.001", source: "j-stepp-2015", quote: "The primary end point was achieved (21.3 and 62.5% [risk ratio: 0.34; p < 0.001], for pre-emptive and reactive treatment, respectively)." },
    { claim: "Oral antibiotics reduced grade 2 or worse acneiform rash by 40 per cent", grade: "systematic review and meta-analysis", source: "egfr-ma-2022", quote: "Oral antibiotics had the greatest efficacy in preventing grade 2 or higher acneiform eruptions with a relative risk reduction of 40% (RR = .6, 95% CI .46-.79, p < .01)." },
    { claim: "The COCOON regimen reduced grade 2 or worse dermatologic events with amivantamab and lazertinib", grade: "randomised phase 2 trial, n = 201, p < 0.0001", source: "cocoon-2025", quote: "At a median follow-up of 7.1 months, COCOON DM demonstrated significant reduction in the primary end point versus SoC DM (42% versus 75%; OR, 0.24; 95% confidence interval, 0.13-0.45; p < 0.0001)." },
  ],
  sources: [
    { key: "mascc-2011", label: "Clinical practice guidelines for the prevention and treatment of EGFR inhibitor-associated dermatologic toxicities", publisher: "MASCC Skin Toxicity Study Group, Supportive Care in Cancer", year: 2011, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3128700/", doi: "10.1007/s00520-011-1197-6", gradingScheme: "Levels of evidence I (meta-analyses or high-powered randomised trials) to V (case reports); recommendation grades A (level I or consistent multiple studies) to D (little or no evidence).", read: "full-text", accessed: "2026-11-11" },
    { key: "esmo-derm-2021", label: "Prevention and management of dermatological toxicities related to anticancer agents: ESMO Clinical Practice Guidelines", publisher: "ESMO, Annals of Oncology", year: 2021, url: "https://doi.org/10.1016/j.annonc.2020.11.005", doi: "10.1016/j.annonc.2020.11.005", read: "not-reachable", accessed: "2026-11-11" },
    { key: "rybrevant-label", label: "RYBREVANT (amivantamab-vmjw) prescribing information", publisher: "Janssen Biotech, via DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=1466c070-9f97-4fa4-a955-6a6b59981fb8", gradingScheme: "US prescribing information: regulatory labelling, not graded.", read: "full-text", accessed: "2026-11-11" },
    { key: "vectibix-label", label: "VECTIBIX (panitumumab) prescribing information, including boxed warning", publisher: "Amgen, via DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=e0fa4bca-f245-4d92-ae29-b0c630a315c2", gradingScheme: "US prescribing information: regulatory labelling, not graded.", read: "full-text", accessed: "2026-11-11" },
    { key: "stepp-2010", label: "Skin toxicity evaluation protocol with panitumumab (STEPP), a phase II, open-label, randomized trial evaluating the impact of a pre-emptive skin treatment regimen on skin toxicities and quality of life in patients with metastatic colorectal cancer", publisher: "Journal of Clinical Oncology", year: 2010, url: "https://europepmc.org/abstract/MED/20142600", doi: "10.1200/JCO.2008.21.7828", read: "abstract", accessed: "2026-11-11" },
    { key: "j-stepp-2015", label: "Randomized controlled trial on the skin toxicity of panitumumab in Japanese patients with metastatic colorectal cancer: HGCSG1001 study; J-STEPP", publisher: "Future Oncology", year: 2015, url: "https://europepmc.org/abstract/MED/25686117", doi: "10.2217/fon.14.251", read: "abstract", accessed: "2026-11-11" },
    { key: "cocoon-2025", label: "Enhanced Versus Standard Dermatologic Management With Amivantamab-Lazertinib in EGFR-Mutated Advanced NSCLC: The COCOON Global Randomized Controlled Trial", publisher: "Journal of Thoracic Oncology", year: 2025, url: "https://europepmc.org/abstract/MED/40923969", doi: "10.1016/j.jtho.2025.07.117", read: "abstract", accessed: "2026-11-11" },
    { key: "valentino-2021", label: "Systemic doxycycline for pre-emptive treatment of anti-EGFR-related skin toxicity in patients with metastatic colorectal cancer receiving first-line panitumumab-based therapy: a post hoc analysis of the Valentino study", publisher: "Supportive Care in Cancer", year: 2021, url: "https://europepmc.org/abstract/MED/33392769", doi: "10.1007/s00520-020-05972-2", read: "abstract", accessed: "2026-11-11" },
    { key: "egfr-ma-2022", label: "Prevention and management of acneiform rash associated with EGFR inhibitor therapy: a systematic review and meta-analysis", publisher: "Asia-Pacific Journal of Clinical Oncology", year: 2022, url: "https://europepmc.org/abstract/MED/35352492", doi: "10.1111/ajco.13740", read: "abstract", accessed: "2026-11-11" },
  ],
  gaps: [
    "The ESMO 2021 dermatological toxicity guideline could not be read (no abstract in Europe PMC; the publisher refused a script), so its grades and any changes it made to the MASCC 2011 regimen are not given here.",
    "MASCC's guideline is from 2011; no later MASCC edition was found. Its recommendations predate amivantamab and osimertinib.",
    "The trials and the meta-analysis were read as abstracts only; tetracycline contraindications, side effects and interactions are not covered by the sources read.",
    "Prophylaxis evidence is strongest for EGFR antibodies; for EGFR tyrosine kinase inhibitors such as osimertinib, which cause milder rash, no randomised trial of prophylaxis was read.",
    "Dose rules for cetuximab and the EGFR tablets were not read here; each drug's own label sets them.",
    "Paronychia (nail fold inflammation) and scalp problems, which last longer than the rash, are covered only in part: the MASCC guideline's paronychia recommendations rest on expert opinion.",
  ],
  drugs: ["cetuximab", "panitumumab", "amivantamab", "lazertinib", "erlotinib", "gefitinib", "afatinib", "osimertinib", "hydrocortisone", "doxycycline", "minocycline"],
  cancers: ["colorectal", "egfr-mutant-nsclc"],
  terms: ["rash-skin-toxicity", "chemotherapy-side-effects-colorectal"],
  sections: ["supportive-care"],
  tags: ["protocol", "skin-toxicity", "egfr-inhibitor", "supportive-care"],
});
