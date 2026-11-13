import { protocol } from "./helpers";

/*
 * Pausing bevacizumab and the other drugs that block blood vessel growth (anti-VEGF antibodies and VEGF receptor
 * tyrosine kinase inhibitors) before and after surgery, because they slow wound healing.
 *
 * There is no guideline devoted to this; the drug labels are the right source for the intervals (docs/PROTOCOLS.md: a
 * label is the source for a schedule), and they differ by drug and by regulator. What was read, and how (all on
 * 11 November 2026, fetched raw into a scratch directory and read as text):
 * - US prescribing information (DailyMed SPL XML, the current version on that date) for Avastin (bevacizumab),
 *   Cyramza (ramucirumab), Zaltrap (ziv-aflibercept), Cabometyx (cabozantinib), Stivarga (regorafenib), Inlyta
 *   (axitinib), Lenvima (lenvatinib), Sutent (sunitinib), Votrient (pazopanib), Nexavar (sorafenib), Fruzaqla
 *   (fruquintinib) and Fotivda (tivozanib): full text.
 * - EU summaries of product characteristics (EMA EPAR PDFs) for Avastin, Cyramza and Lenvima: full text. The Zaltrap
 *   and Cabometyx EPAR downloads were refused (HTTP 429) and were not retried round the limit.
 * - Zhang et al., Bevacizumab and wound-healing complications: meta-analysis of randomised trials (Oncotarget 2016):
 *   full text, Europe PMC (PMC5347706).
 * - ESMO metastatic colorectal cancer guideline 2023: not read (no open copy in Europe PMC).
 * Every DOI was resolved through Crossref and Europe PMC and its title checked.
 */
export const antiVegfDrugsAroundSurgery = protocol({
  id: "anti-vegf-drugs-around-surgery",
  name: "Bevacizumab and other anti-VEGF drugs around surgery: pausing before and restarting after",
  aka: ["holding bevacizumab before surgery", "anti-angiogenic drugs and wound healing", "VEGF inhibitor surgery interval", "stopping TKI before surgery", "Avastin before surgery"],
  domain: "surgery-perioperative",
  tldr: "Drugs that block blood vessel growth, such as bevacizumab (Avastin), ramucirumab, aflibercept and tablets like cabozantinib, lenvatinib or sunitinib, slow the healing of wounds. Before planned surgery they are paused, for between 2 days and 4 weeks depending on the drug, and restarted only once the wound has healed, usually at least 2 to 4 weeks after a big operation.",
  simple: "If you take one of these drugs and need an operation, tell both the surgeon and the cancer team. The drug is usually paused beforehand and restarted once the wound has healed. Do not stop or restart it yourself.",
  summary: "Every anti-VEGF agent's label carries a wound-healing warning with an interval, and the intervals track the drug's half-life. US labels: bevacizumab withhold at least 28 days before elective surgery and do not give for at least 28 days after major surgery (half-life about 20 days); ramucirumab 28 days before, at least 2 weeks after; ziv-aflibercept at least 4 weeks before and after (minor surgery such as port placement, biopsy or tooth extraction: resume once healed); cabozantinib and sunitinib at least 3 weeks before; tivozanib at least 24 days; regorafenib and fruquintinib 2 weeks; sorafenib at least 10 days; lenvatinib and pazopanib at least 1 week; axitinib at least 2 days; for all the TKIs, at least 2 weeks after major surgery and until the wound has healed. EU SmPCs are less specific: Avastin says therapy 'should be withheld for elective surgery' and not started for at least 28 days after major surgery; Lenvima says interruption 'should be considered'. In the Avastin colorectal trials, surgery 28 to 60 days before starting carried no extra risk, while operating during treatment gave wound or bleeding complications in 10 to 20%. A meta-analysis of 7 randomised trials (5147 people) found bevacizumab doubled wound complications (OR 2.32), mainly in colon cancer. No label establishes the safety of restarting after a wound-healing complication.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "surgical-team", "pharmacist", "nurse", "patient-or-carer"],
    where: ["outpatient-clinic", "ward", "home"],
  },
  population: "Adults receiving bevacizumab (including biosimilars), ramucirumab, ziv-aflibercept or a VEGF receptor tyrosine kinase inhibitor (cabozantinib, lenvatinib, sunitinib, pazopanib, sorafenib, regorafenib, axitinib, fruquintinib, tivozanib) who need elective surgery or are recovering from it. Emergency surgery cannot wait for these intervals; the label warnings still tell the team what to watch for. Intravitreal anti-VEGF injections for eye disease are outside scope.",
  trigger: "Planned surgery, including dental surgery, in someone on an anti-VEGF drug, or starting an anti-VEGF drug soon after an operation.",
  steps: [
    {
      action: "Tell the surgeon and the oncology team about the anti-VEGF drug as soon as surgery is planned, including dental surgery",
      why: "The pause has to start weeks ahead for some of these drugs, so it needs planning.",
      source: "fotivda-us",
      quote: "Advise patients to contact their healthcare provider before any planned surgeries, including dental surgery",
      grade: "Label instruction (no grade)",
    },
    {
      action: "Withhold bevacizumab for at least 28 days before elective surgery",
      why: "Bevacizumab stays in the body for weeks (its half-life is about 20 days), and wounds heal less well while it is active.",
      source: "avastin-us",
      quote: "Withhold for at least 28 days prior to elective surgery. Do not administer Avastin for at least 28 days following a major surgery, and until adequate wound healing.",
      grade: "Label instruction (no grade)",
    },
    {
      action: "Withhold ramucirumab for 28 days and ziv-aflibercept for at least 4 weeks before elective surgery",
      why: "Both are antibodies or fusion proteins that last for weeks, like bevacizumab.",
      source: "zaltrap-us",
      quote: "Withhold ZALTRAP for at least 4 weeks prior to elective surgery. Do not administer ZALTRAP for at least 4 weeks after major surgery and until wounds have adequately healed.",
      grade: "Label instruction (no grade)",
    },
    {
      action: "Stop a VEGF receptor tablet for the interval on its own label before elective surgery: cabozantinib or sunitinib 3 weeks, tivozanib 24 days, regorafenib or fruquintinib 2 weeks, sorafenib 10 days, lenvatinib or pazopanib 1 week, axitinib 2 days",
      why: "Each tablet leaves the body at a different speed, so each label sets its own pause.",
      source: "cabometyx-us",
      quote: "Impaired Wound Healing: Withhold CABOMETYX for at least 3 weeks before elective surgery. Do not administer for at least 2 weeks following major surgery and adequate wound healing.",
      grade: "Label instruction (no grade)",
    },
    {
      action: "After major surgery, do not restart for at least 2 weeks (TKIs, ramucirumab) or 4 weeks (bevacizumab, ziv-aflibercept), and not until the wound has healed",
      why: "Restarting too early can make a wound or a bowel join break down.",
      source: "cyramza-us",
      quote: "Impaired Wound Healing : Withhold CYRAMZA for 28 days prior to elective surgery. Do not administer CYRAMZA for at least 2 weeks following a major surgical procedure and until adequate wound healing.",
      grade: "Label instruction (no grade)",
    },
    {
      action: "After minor surgery such as port placement, a biopsy or a tooth extraction, restart once the wound has fully healed",
      why: "Small wounds heal faster, so the gap after them can be shorter.",
      source: "zaltrap-us",
      quote: "For minor surgery such as central venous access port placement, biopsy, and tooth extraction, ZALTRAP may be initiated/resumed once the surgical wound is fully healed.",
      grade: "Label instruction (no grade)",
    },
    {
      action: "If a wound-healing problem develops during treatment, withhold the drug until the wound has healed and decide case by case whether to restart",
      why: "No study has shown that restarting after a wound complication is safe.",
      source: "avastin-us",
      quote: "Withhold AVASTIN until adequate wound healing.The safety of resumption of AVASTIN after resolution of wound healing complications has not been established.",
      grade: "Label instruction (no grade)",
    },
  ],
  bestInClass: {
    statement: "Follow the interval on the drug's own current label; there is no guideline that sets a different one. The US labels give explicit numbers before and after surgery for every agent; the EU SmPCs for Avastin and Lenvima give the post-surgery interval or a 'consider interrupting' instruction but no pre-surgery number, so a UK or EU team may use the US figure or its own policy. The evidence behind the bevacizumab interval is the colorectal trial experience reported in the labels (no extra wound or bleeding complications when surgery was 28 to 60 days before starting; 10 to 20% when operating during treatment) and a meta-analysis of randomised trials (OR 2.32 for wound complications).",
    sources: ["avastin-us", "avastin-eu", "lenvima-eu", "zhang-2016"],
  },
  variants: [
    {
      name: "EU Avastin wording: withhold for elective surgery, interval not stated",
      differs: "Says therapy should be withheld for elective surgery and not started for at least 28 days after major surgery or until the wound is fully healed, without a number of days before surgery.",
      evidence: "EU SmPC section 4.4; the same trial experience as the US label is reported in section 4.8.",
      sources: ["avastin-eu"],
    },
    {
      name: "EU Lenvima wording: consider interruption",
      differs: "Temporary interruption 'should be considered' before major surgery; the US label says withhold for at least 1 week.",
      evidence: "EU SmPC: no formal studies of lenvatinib on wound healing; limited experience on when to restart.",
      sources: ["lenvima-eu", "lenvima-us"],
    },
    {
      name: "Sorafenib: two different intervals in one label",
      differs: "The US label's dosing and warnings sections say at least 10 days before elective surgery; one line of its patient information says at least 2 weeks.",
      evidence: "Both appear in the current DailyMed text; the prescriber sections give 10 days.",
      sources: ["nexavar-us"],
    },
  ],
  grades: [
    { claim: "Bevacizumab doubles wound-healing complications", grade: "Meta-analysis of 7 randomised trials, 5147 participants", source: "zhang-2016", quote: "The pooled estimate of odds ratio (OR) was 2.32, and the 95 % confidence intervals (CI) was 1.43 to 3.75. (P < 0.001)." },
    { claim: "No extra risk when major surgery was 28 to 60 days before starting bevacizumab", grade: "Clinical trial experience reported in the SmPC", source: "avastin-eu", quote: "In clinical trials of metastatic carcinoma of the colon or rectum, there was no increased risk of post-operative bleeding or wound healing complications observed in patients who underwent major surgery 28-60 days prior to starting Avastin." },
    { claim: "Bevacizumab half-life", grade: "Pharmacokinetics (label)", source: "avastin-us", quote: "The estimated half-life is 20 days (11 to 50 days)." },
    { claim: "Axitinib: shortest pre-surgery interval", grade: "Label instruction", source: "inlyta-us", quote: "Withhold INLYTA for at least 2 days prior to elective surgery." },
    { claim: "Lenvatinib and pazopanib: one week", grade: "Label instruction", source: "lenvima-us", quote: "Withhold LENVIMA for at least 1 week prior to elective surgery." },
    { claim: "Regorafenib: two weeks", grade: "Label instruction", source: "stivarga-us", quote: "Withhold STIVARGA for at least 2 weeks prior to elective surgery." },
    { claim: "Sunitinib: three weeks", grade: "Label instruction", source: "sutent-us", quote: "Impaired Wound Healing : Withhold SUTENT for at least 3 weeks prior to elective surgery." },
    { claim: "Tivozanib: 24 days", grade: "Label instruction", source: "fotivda-us", quote: "Risk of Impaired Wound Healing: Withhold FOTIVDA for at least 24 days before elective surgery." },
    { claim: "Fruquintinib: two weeks before major surgery", grade: "Label instruction", source: "fruzaqla-us", quote: "Impaired Wound Healing: Withhold FRUZAQLA for 2 weeks before major surgery." },
    { claim: "Pazopanib: one week", grade: "Label instruction", source: "votrient-us", quote: "Withhold VOTRIENT at least 1 week prior to elective surgery." },
    { claim: "Sorafenib: ten days", grade: "Label instruction", source: "nexavar-us", quote: "Risk of Impaired Wound Healing : Withhold NEXAVAR for at least 10 days prior to elective surgery." },
    { claim: "Ramucirumab EU SmPC: at least 4 weeks", grade: "Label instruction", source: "cyramza-eu", quote: "Ramucirumab therapy should be temporarily discontinued for at least 4 weeks prior to elective surgery." },
  ],
  sources: [
    { key: "avastin-us", label: "Avastin (bevacizumab) US prescribing information, DailyMed (Genentech, version of 8 January 2025)", publisher: "Genentech / US FDA (DailyMed)", year: 2025, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=939b5d1f-9fb2-4499-80ef-0607aa6b114e", gradingScheme: "Regulatory label; no grading.", read: "full-text", accessed: "2026-11-11" },
    { key: "avastin-eu", label: "Avastin summary of product characteristics (EMA EPAR product information, as downloaded; the PDF prints no revision date)", publisher: "European Medicines Agency", year: 2026, url: "https://www.ema.europa.eu/en/documents/product-information/avastin-epar-product-information_en.pdf", gradingScheme: "Regulatory label; no grading.", read: "full-text", accessed: "2026-11-11" },
    { key: "cyramza-us", label: "Cyramza (ramucirumab) US prescribing information, DailyMed (Eli Lilly, version of 10 June 2026)", publisher: "Eli Lilly / US FDA (DailyMed)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=c6080942-dee6-423e-b688-1272c2ae90d4", gradingScheme: "Regulatory label; no grading.", read: "full-text", accessed: "2026-11-11" },
    { key: "cyramza-eu", label: "Cyramza summary of product characteristics (EMA EPAR product information, as downloaded; the PDF prints no revision date)", publisher: "European Medicines Agency", year: 2026, url: "https://www.ema.europa.eu/en/documents/product-information/cyramza-epar-product-information_en.pdf", gradingScheme: "Regulatory label; no grading.", read: "full-text", accessed: "2026-11-11" },
    { key: "zaltrap-us", label: "Zaltrap (ziv-aflibercept) US prescribing information, DailyMed (Sanofi, version of 17 November 2025)", publisher: "Sanofi / US FDA (DailyMed)", year: 2025, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f6725df6-50ee-4b0a-b900-d02ba634395d", gradingScheme: "Regulatory label; no grading.", read: "full-text", accessed: "2026-11-11" },
    { key: "cabometyx-us", label: "Cabometyx (cabozantinib) US prescribing information, DailyMed (Exelixis, version of 17 November 2025)", publisher: "Exelixis / US FDA (DailyMed)", year: 2025, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=3850cce2-6137-42e5-a792-d318c4a4b3b5", gradingScheme: "Regulatory label; no grading.", read: "full-text", accessed: "2026-11-11" },
    { key: "stivarga-us", label: "Stivarga (regorafenib) US prescribing information, DailyMed (Bayer, version of 18 February 2026)", publisher: "Bayer / US FDA (DailyMed)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=824f19c9-0546-4a8a-8d8f-c4055c04f7c7", gradingScheme: "Regulatory label; no grading.", read: "full-text", accessed: "2026-11-11" },
    { key: "inlyta-us", label: "Inlyta (axitinib) US prescribing information, DailyMed (Pfizer, version of 21 February 2025)", publisher: "Pfizer / US FDA (DailyMed)", year: 2025, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=84137882-e000-47da-bd5b-fa76ab3c76f9", gradingScheme: "Regulatory label; no grading.", read: "full-text", accessed: "2026-11-11" },
    { key: "lenvima-us", label: "Lenvima (lenvatinib) US prescribing information, DailyMed (Eisai, version of 22 October 2026)", publisher: "Eisai / US FDA (DailyMed)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f4bedd21-efde-44c6-9d9c-b48b78d7ed1e", gradingScheme: "Regulatory label; no grading.", read: "full-text", accessed: "2026-11-11" },
    { key: "lenvima-eu", label: "Lenvima summary of product characteristics (EMA EPAR product information, as downloaded; the PDF prints no revision date)", publisher: "European Medicines Agency", year: 2026, url: "https://www.ema.europa.eu/en/documents/product-information/lenvima-epar-product-information_en.pdf", gradingScheme: "Regulatory label; no grading.", read: "full-text", accessed: "2026-11-11" },
    { key: "sutent-us", label: "Sutent (sunitinib) US prescribing information, DailyMed (Pfizer, version of 23 February 2026)", publisher: "Pfizer / US FDA (DailyMed)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=43a4d7f8-48ae-4a63-9108-2fa8e3ea9d9c", gradingScheme: "Regulatory label; no grading.", read: "full-text", accessed: "2026-11-11" },
    { key: "votrient-us", label: "Votrient (pazopanib) US prescribing information, DailyMed (Novartis, version of 17 December 2025)", publisher: "Novartis / US FDA (DailyMed)", year: 2025, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=eeaaaf38-fb86-4d9f-a19d-0f61daac2fd7", gradingScheme: "Regulatory label; no grading.", read: "full-text", accessed: "2026-11-11" },
    { key: "nexavar-us", label: "Nexavar (sorafenib) US prescribing information, DailyMed (Bayer, version of 18 November 2024)", publisher: "Bayer / US FDA (DailyMed)", year: 2024, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b50667e4-5ebc-4968-a646-d605058dbef0", gradingScheme: "Regulatory label; no grading.", read: "full-text", accessed: "2026-11-11" },
    { key: "fruzaqla-us", label: "Fruzaqla (fruquintinib) US prescribing information, DailyMed (Takeda, version of 12 August 2026)", publisher: "Takeda / US FDA (DailyMed)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=186d786e-dc8a-45f2-b5e1-01ac0201879f", gradingScheme: "Regulatory label; no grading.", read: "full-text", accessed: "2026-11-11" },
    { key: "fotivda-us", label: "Fotivda (tivozanib) US prescribing information, DailyMed (AVEO, version of 21 September 2026)", publisher: "AVEO / US FDA (DailyMed)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=de77155c-ecf2-4f15-9758-21d271449d83", gradingScheme: "Regulatory label; no grading.", read: "full-text", accessed: "2026-11-11" },
    { key: "zhang-2016", label: "Zhang et al., Bevacizumab and wound-healing complications: a systematic review and meta-analysis of randomized controlled trials (Oncotarget 2016)", publisher: "Oncotarget", year: 2016, url: "https://doi.org/10.18632/oncotarget.12666", doi: "10.18632/oncotarget.12666", gradingScheme: "Meta-analysis; no recommendation grade.", read: "full-text", accessed: "2026-11-11" },
  ],
  cancers: [],
  drugs: ["bevacizumab", "ramucirumab", "ziv-aflibercept", "cabozantinib", "lenvatinib", "sunitinib", "pazopanib", "sorafenib", "regorafenib", "axitinib", "fruquintinib", "tivozanib"],
  technologies: ["antiangiogenic"],
  terms: ["antiangiogenic-toxicities"],
  related: ["surgical-site-infection-prevention", "routine-preoperative-tests"],
  upgrades: [],
  gaps: [
    "No national or international guideline sets these intervals independently of the labels; the ESMO metastatic colorectal cancer guideline (2023) could not be read in full to check whether it states one for liver surgery after bevacizumab.",
    "The intervals before surgery are set from half-life and trial exclusion rules rather than from trials comparing intervals; whether a shorter pause is safe is not known.",
    "The EU product information for Zaltrap and Cabometyx could not be downloaded (rate limit) and was not read; the US labels were used.",
    "No label establishes when it is safe to restart after a wound-healing complication.",
    "Biosimilars of bevacizumab carry the same instructions as the reference product; their labels were not read one by one.",
  ],
});
