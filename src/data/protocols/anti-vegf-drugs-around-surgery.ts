import { protocol } from "./helpers";

/*
 * Pausing bevacizumab and the other drugs that block blood vessel growth (anti-VEGF antibodies and VEGF receptor
 * tyrosine kinase inhibitors) before and after surgery, because they slow wound healing.
 *
 * No guideline devoted to this was found; the drug labels are the right source for the intervals (docs/PROTOCOLS.md:
 * a label is the source for a schedule), and they differ by drug and by regulator.
 *
 * Second accuracy pass, 17 November 2026. Every source was fetched again raw and read as text, and every quote was
 * checked against it by script (whitespace and line breaks normalised only):
 * - US prescribing information (DailyMed SPL XML, the current version of each, with its version history) for Avastin,
 *   Cyramza, Zaltrap, Cabometyx, Stivarga, Inlyta, Lenvima, Sutent, Votrient, Nexavar, Fruzaqla and Fotivda: full
 *   text. Fotivda had a new version published on 16 November 2026; its wound-healing text is the text quoted here.
 * - EU product information (EMA EPAR PDFs, pdftotext) for Avastin, Cyramza and Lenvima: full text. The Zaltrap and
 *   Cabometyx PDFs, refused on 11 November (HTTP 429), downloaded normally and were read in full; the EU Cabometyx
 *   interval (28 days) differs from the US one (3 weeks) and is now on the page.
 * - Zhang et al. (Oncotarget 2016): full text, Europe PMC (PMC5347706); DOI resolved through Crossref and Europe PMC.
 * - ESMO metastatic colorectal cancer guideline: not read. Europe PMC lists a 2026 edition as well as the 2023 one;
 *   neither has an open copy there.
 * What changed: the fruquintinib interval is scoped to major surgery as its label words it; the claim that the
 * intervals follow each drug's half-life was cut back to what a source says (bevacizumab only); the minor-surgery
 * step is scoped to ziv-aflibercept; the wound-complication step now gives each label's own instruction; four quotes
 * that were not verbatim (a stray space before a colon, a table cell run together) were replaced.
 */
export const antiVegfDrugsAroundSurgery = protocol({
  id: "anti-vegf-drugs-around-surgery",
  name: "Bevacizumab and other anti-VEGF drugs around surgery: pausing before and restarting after",
  aka: ["holding bevacizumab before surgery", "anti-angiogenic drugs and wound healing", "VEGF inhibitor surgery interval", "stopping TKI before surgery", "Avastin before surgery"],
  domain: "surgery-perioperative",
  tldr: "Drugs that block blood vessel growth, such as bevacizumab (Avastin), ramucirumab, aflibercept and tablets like cabozantinib, lenvatinib or sunitinib, slow the healing of wounds. Before planned surgery they are paused, for between 2 days and 4 weeks depending on the drug, and restarted only once the wound has healed, usually at least 2 to 4 weeks after a big operation.",
  simple: "If you take one of these drugs and an operation or dental surgery is planned, tell your cancer team beforehand. The drug is usually paused before the operation and restarted once the wound has healed. Your team will tell you when to stop and when to start again.",
  summary: "Each of the twelve US labels read carries a wound-healing warning with an interval, and the intervals differ by drug and, for some drugs, by regulator. US labels: bevacizumab withhold at least 28 days before elective surgery and do not give for at least 28 days after major surgery (estimated half-life 20 days); ramucirumab 28 days before, at least 2 weeks after; ziv-aflibercept at least 4 weeks before and after (minor surgery such as port placement, biopsy or tooth extraction: resume once fully healed); cabozantinib and sunitinib at least 3 weeks before; tivozanib at least 24 days; regorafenib at least 2 weeks; fruquintinib at least 2 weeks before major surgery; sorafenib at least 10 days; lenvatinib and pazopanib at least 1 week; axitinib at least 2 days; for all nine TKIs, at least 2 weeks after major surgery and until the wound has healed adequately. EU product information: Cyramza and Zaltrap give at least 4 weeks before elective surgery, as in the US; Cabometyx says at least 28 days before scheduled surgery, including dental surgery, 'if possible' (US: 3 weeks); Avastin says therapy 'should be withheld for elective surgery' without a number and not started for at least 28 days after major surgery or until the wound is fully healed; Lenvima says interruption 'should be considered' for major surgical procedures. In the Avastin colorectal trials reported in the EU text, surgery 28 to 60 days before starting carried no extra risk, while operating during treatment gave bleeding or wound complications in 10% (4 of 40) to 20% (3 of 15); the US label reports 15% against 4% in one controlled study. A meta-analysis of 7 randomised trials (5,147 people) found higher odds of wound complications with bevacizumab (OR 2.32, 95% CI 1.43 to 3.75), a finding that held in the colon cancer subgroup and not in the others. Every US label read says the safety of restarting after a wound-healing complication has not been established.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "surgical-team", "pharmacist", "nurse", "patient-or-carer"],
    where: ["outpatient-clinic", "ward", "home"],
  },
  population: "Adults receiving bevacizumab (including biosimilars), ramucirumab, ziv-aflibercept or a VEGF receptor tyrosine kinase inhibitor (cabozantinib, lenvatinib, sunitinib, pazopanib, sorafenib, regorafenib, axitinib, fruquintinib, tivozanib) who need elective surgery or are recovering from it. The label intervals are written for elective, scheduled or major surgery; none of the labels read gives an interval for emergency surgery. Intravitreal anti-VEGF injections for eye disease are outside scope.",
  trigger: "Planned surgery, including dental surgery, in someone on an anti-VEGF drug, or starting an anti-VEGF drug soon after an operation.",
  steps: [
    {
      action: "Ask the patient to tell the cancer team before any planned surgery, including dental surgery",
      why: "Some of these drugs have to be stopped more than three weeks ahead, so the team needs to know early.",
      source: "fotivda-us",
      quote: "Advise patients to contact their healthcare provider before any planned surgeries, including dental surgery",
      grade: "Label instruction (no grade)",
    },
    {
      action: "Withhold bevacizumab for at least 28 days before elective surgery (US label; the EU text says to withhold and gives no number)",
      why: "Wounds can heal less well while bevacizumab is in the body, and its estimated half-life is 20 days.",
      source: "avastin-us",
      quote: "Withhold for at least 28 days prior to elective surgery. Do not administer Avastin for at least 28 days following a major surgery, and until adequate wound healing.",
      grade: "Label instruction (no grade)",
    },
    {
      action: "Withhold ramucirumab for 28 days before elective surgery (US label; the EU text says at least 4 weeks)",
      why: "The label says ramucirumab has the potential to affect wound healing.",
      source: "cyramza-us",
      quote: "Withhold CYRAMZA for 28 days prior to elective surgery. Do not administer CYRAMZA for at least 2 weeks following a major surgical procedure and until adequate wound healing.",
      grade: "Label instruction (no grade)",
    },
    {
      action: "Withhold ziv-aflibercept for at least 4 weeks before elective surgery (US label and EU text agree)",
      why: "Slow wound healing has been reported with this drug.",
      source: "zaltrap-us",
      quote: "Withhold ZALTRAP for at least 4 weeks prior to elective surgery. Do not administer ZALTRAP for at least 4 weeks after major surgery and until wounds have adequately healed.",
      grade: "Label instruction (no grade)",
    },
    {
      action: "Stop a VEGF receptor tablet for at least the interval on its own US label before elective surgery: cabozantinib or sunitinib 3 weeks, tivozanib 24 days, regorafenib 2 weeks, sorafenib 10 days, lenvatinib or pazopanib 1 week, axitinib 2 days; fruquintinib 2 weeks before major surgery. The EU text for cabozantinib says at least 28 days",
      why: "Each label sets its own pause, so the figure for one tablet cannot be carried over to another.",
      source: "cabometyx-us",
      quote: "Impaired Wound Healing: Withhold CABOMETYX for at least 3 weeks before elective surgery. Do not administer for at least 2 weeks following major surgery and adequate wound healing.",
      grade: "Label instruction (no grade)",
    },
    {
      action: "After major surgery, do not restart for at least 2 weeks (the tablets, ramucirumab) or 4 weeks (bevacizumab 28 days, ziv-aflibercept), and not until the wound has healed adequately (US labels)",
      why: "The time on the label is a minimum; the wound also has to have healed.",
      source: "sutent-us",
      quote: "Do not administer for at least 2 weeks following major surgery and until adequate wound healing.",
      grade: "Label instruction (no grade)",
    },
    {
      action: "For ziv-aflibercept, after minor surgery such as port placement, a biopsy or a tooth extraction, start or restart once the wound has fully healed",
      why: "The label does not ask for the 4-week wait after these smaller procedures. The other labels read do not give a separate rule for minor surgery.",
      source: "zaltrap-us",
      quote: "For minor surgery such as central venous access port placement, biopsy, and tooth extraction, ZALTRAP may be initiated/resumed once the surgical wound is fully healed.",
      grade: "Label instruction (no grade)",
    },
    {
      action: "If a wound-healing problem develops during treatment, follow that drug's label: bevacizumab is withheld until the wound has healed adequately and stopped for necrotising fasciitis; ziv-aflibercept is discontinued; axitinib is resumed at a reduced dose or discontinued, depending on severity and persistence",
      why: "Every US label read says the safety of restarting after a wound complication has not been established.",
      source: "avastin-us",
      quote: "In patients who experience wound healing complications during Avastin treatment, withhold Avastin until adequate wound healing.",
      grade: "Label instruction (no grade)",
    },
  ],
  bestInClass: {
    statement: "Follow the interval on the drug's own current label in the country of treatment; no guideline setting a different one was found or read. The US labels give explicit figures before and after surgery for every agent. The EU texts agree for ramucirumab and ziv-aflibercept (at least 4 weeks before), are longer for cabozantinib (at least 28 days, against 3 weeks in the US), and for Avastin and Lenvima give no number of days before surgery. The evidence reported for the bevacizumab interval is the colorectal trial experience in the labels (no extra bleeding or wound complications when major surgery was 28 to 60 days before starting; 10 to 20% when operating during treatment) and a meta-analysis of randomised trials (OR 2.32 for wound complications), whose authors note that the interval before surgery rests largely on bevacizumab's half-life of about 20 days and that some recommend 4 weeks and others 6 to 8.",
    sources: ["avastin-us", "avastin-eu", "cyramza-eu", "zaltrap-eu", "cabometyx-eu", "lenvima-eu", "zhang-2016"],
  },
  variants: [
    {
      name: "EU Avastin wording: withhold for elective surgery, interval not stated",
      differs: "Says therapy should be withheld for elective surgery and not started for at least 28 days after major surgery or until the wound is fully healed, without a number of days before surgery.",
      evidence: "EU product information section 4.4; the colorectal trial experience (28 to 60 days; 10 to 20%) is reported in section 4.8.",
      sources: ["avastin-eu"],
    },
    {
      name: "EU Cabometyx wording: at least 28 days rather than 3 weeks",
      differs: "Cabozantinib 'should be stopped at least 28 days prior to scheduled surgery, including dental surgery or invasive dental procedures, if possible'; the US label says at least 3 weeks. After surgery the EU text gives no number: restarting rests on clinical judgement of adequate wound healing, where the US label says at least 2 weeks after major surgery. The EU text also says to discontinue for wound complications needing medical intervention.",
      evidence: "EU product information section 4.4; neither text gives the evidence behind its figure.",
      sources: ["cabometyx-eu", "cabometyx-us"],
    },
    {
      name: "EU Lenvima wording: consider interruption",
      differs: "Temporary interruption 'should be considered' in patients undergoing major surgical procedures, with restarting based on clinical judgement of adequate wound healing; the US label says withhold for at least 1 week before elective surgery and for at least 2 weeks after major surgery.",
      evidence: "EU product information: no formal studies of lenvatinib on wound healing; limited clinical experience on when to restart.",
      sources: ["lenvima-eu", "lenvima-us"],
    },
    {
      name: "EU Cyramza wording: no fixed interval after surgery",
      differs: "At least 4 weeks before elective surgery, as in the US; after surgery the EU text leaves restarting to clinical judgement of adequate wound healing, where the US label says at least 2 weeks after a major surgical procedure.",
      evidence: "EU product information sections 4.2 and 4.4.",
      sources: ["cyramza-eu", "cyramza-us"],
    },
    {
      name: "Sorafenib: two different intervals in one label",
      differs: "The US label's highlights and warnings sections say at least 10 days before elective surgery; its patient information says at least 2 weeks in one place and at least 10 days in another.",
      evidence: "Both appear in the current DailyMed text; the prescriber sections give 10 days.",
      sources: ["nexavar-us"],
    },
  ],
  grades: [
    { claim: "Bevacizumab raises the odds of wound-healing complications", grade: "Meta-analysis of 7 randomised trials, 5,147 participants", source: "zhang-2016", quote: "The pooled estimate of odds ratio (OR) was 2.32, and the 95 % confidence intervals (CI) was 1.43 to 3.75. (P < 0.001)." },
    { claim: "No extra risk when major surgery was 28 to 60 days before starting bevacizumab", grade: "Clinical trial experience reported in the EU product information", source: "avastin-eu", quote: "In clinical trials of metastatic carcinoma of the colon or rectum, there was no increased risk of post-operative bleeding or wound healing complications observed in patients who underwent major surgery 28-60 days prior to starting Avastin." },
    { claim: "Wound complications after surgery during bevacizumab treatment: 15% against 4%", grade: "Controlled clinical study reported in the US label", source: "avastin-us", quote: "In a controlled clinical study in which Avastin was not administered within 28 days of major surgical procedures, the incidence of wound healing complications, including serious and fatal complications, was 15% in patients with mCRC who underwent surgery while receiving Avastin and 4% in patients who did not receive Avastin." },
    { claim: "Bevacizumab half-life", grade: "Pharmacokinetics (label)", source: "avastin-us", quote: "The estimated half-life is 20 days (11 to 50 days)." },
    { claim: "Axitinib: shortest pre-surgery interval", grade: "Label instruction", source: "inlyta-us", quote: "Withhold INLYTA for at least 2 days prior to elective surgery." },
    { claim: "Lenvatinib: one week", grade: "Label instruction", source: "lenvima-us", quote: "Withhold LENVIMA for at least 1 week prior to elective surgery." },
    { claim: "Regorafenib: two weeks", grade: "Label instruction", source: "stivarga-us", quote: "Withhold STIVARGA for at least 2 weeks prior to elective surgery." },
    { claim: "Sunitinib: three weeks", grade: "Label instruction", source: "sutent-us", quote: "Withhold SUTENT for at least 3 weeks prior to elective surgery." },
    { claim: "Tivozanib: 24 days", grade: "Label instruction", source: "fotivda-us", quote: "Risk of Impaired Wound Healing: Withhold FOTIVDA for at least 24 days before elective surgery." },
    { claim: "Fruquintinib: two weeks before major surgery", grade: "Label instruction", source: "fruzaqla-us", quote: "Do not administer FRUZAQLA for at least 2 weeks prior to major surgery." },
    { claim: "Pazopanib: one week", grade: "Label instruction", source: "votrient-us", quote: "Withhold VOTRIENT at least 1 week prior to elective surgery." },
    { claim: "Sorafenib: ten days", grade: "Label instruction", source: "nexavar-us", quote: "Withhold NEXAVAR for at least 10 days prior to elective surgery." },
    { claim: "Ramucirumab, EU product information: at least 4 weeks", grade: "Label instruction", source: "cyramza-eu", quote: "Ramucirumab therapy should be temporarily discontinued for at least 4 weeks prior to elective surgery." },
    { claim: "Aflibercept, EU product information: at least 4 weeks", grade: "Label instruction", source: "zaltrap-eu", quote: "Aflibercept should be suspended for at least 4 weeks prior to elective surgery." },
    { claim: "Cabozantinib, EU product information: at least 28 days", grade: "Label instruction", source: "cabometyx-eu", quote: "Cabozantinib treatment should be stopped at least 28 days prior to scheduled surgery, including dental surgery or invasive dental procedures, if possible." },
    { claim: "Ziv-aflibercept is discontinued for impaired wound healing", grade: "Label instruction", source: "zaltrap-us", quote: "Discontinue ZALTRAP in patients with impaired wound healing." },
    { claim: "Axitinib after impaired wound healing: reduced dose or discontinue", grade: "Label instruction", source: "inlyta-us", quote: "Resume INLYTA at a reduced dose or discontinue based on severity and persistence of the impaired wound healing." },
  ],
  sources: [
    { key: "avastin-us", label: "Avastin (bevacizumab) US prescribing information, DailyMed (Genentech, version of 8 January 2025)", publisher: "Genentech / US FDA (DailyMed)", year: 2025, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=939b5d1f-9fb2-4499-80ef-0607aa6b114e", gradingScheme: "Regulatory label; no grading.", read: "full-text", accessed: "2026-11-17" },
    { key: "avastin-eu", label: "Avastin summary of product characteristics (EMA EPAR product information; the text prints no revision date, the PDF file is dated 21 January 2026)", publisher: "European Medicines Agency", year: 2026, url: "https://www.ema.europa.eu/en/documents/product-information/avastin-epar-product-information_en.pdf", gradingScheme: "Regulatory label; no grading.", read: "full-text", accessed: "2026-11-17" },
    { key: "cyramza-us", label: "Cyramza (ramucirumab) US prescribing information, DailyMed (Eli Lilly, version of 10 June 2026)", publisher: "Eli Lilly / US FDA (DailyMed)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=c6080942-dee6-423e-b688-1272c2ae90d4", gradingScheme: "Regulatory label; no grading.", read: "full-text", accessed: "2026-11-17" },
    { key: "cyramza-eu", label: "Cyramza summary of product characteristics (EMA EPAR product information; the text prints no revision date, the PDF file is dated 16 December 2025)", publisher: "European Medicines Agency", year: 2025, url: "https://www.ema.europa.eu/en/documents/product-information/cyramza-epar-product-information_en.pdf", gradingScheme: "Regulatory label; no grading.", read: "full-text", accessed: "2026-11-17" },
    { key: "zaltrap-us", label: "Zaltrap (ziv-aflibercept) US prescribing information, DailyMed (Sanofi, version of 17 November 2025)", publisher: "Sanofi / US FDA (DailyMed)", year: 2025, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f6725df6-50ee-4b0a-b900-d02ba634395d", gradingScheme: "Regulatory label; no grading.", read: "full-text", accessed: "2026-11-17" },
    { key: "cabometyx-us", label: "Cabometyx (cabozantinib) US prescribing information, DailyMed (Exelixis, version of 17 November 2025)", publisher: "Exelixis / US FDA (DailyMed)", year: 2025, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=3850cce2-6137-42e5-a792-d318c4a4b3b5", gradingScheme: "Regulatory label; no grading.", read: "full-text", accessed: "2026-11-17" },
    { key: "zaltrap-eu", label: "Zaltrap summary of product characteristics (EMA EPAR product information; the text prints no revision date, the PDF file is dated 24 July 2024)", publisher: "European Medicines Agency", year: 2024, url: "https://www.ema.europa.eu/en/documents/product-information/zaltrap-epar-product-information_en.pdf", gradingScheme: "Regulatory label; no grading.", read: "full-text", accessed: "2026-11-17" },
    { key: "cabometyx-eu", label: "Cabometyx summary of product characteristics (EMA EPAR product information; the text prints no revision date, the PDF file is dated 9 October 2026)", publisher: "European Medicines Agency", year: 2026, url: "https://www.ema.europa.eu/en/documents/product-information/cabometyx-epar-product-information_en.pdf", gradingScheme: "Regulatory label; no grading.", read: "full-text", accessed: "2026-11-17" },
    { key: "stivarga-us", label: "Stivarga (regorafenib) US prescribing information, DailyMed (Bayer, version of 18 February 2026)", publisher: "Bayer / US FDA (DailyMed)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=824f19c9-0546-4a8a-8d8f-c4055c04f7c7", gradingScheme: "Regulatory label; no grading.", read: "full-text", accessed: "2026-11-17" },
    { key: "inlyta-us", label: "Inlyta (axitinib) US prescribing information, DailyMed (Pfizer, version of 21 February 2025)", publisher: "Pfizer / US FDA (DailyMed)", year: 2025, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=84137882-e000-47da-bd5b-fa76ab3c76f9", gradingScheme: "Regulatory label; no grading.", read: "full-text", accessed: "2026-11-17" },
    { key: "lenvima-us", label: "Lenvima (lenvatinib) US prescribing information, DailyMed (Eisai, version of 22 October 2026)", publisher: "Eisai / US FDA (DailyMed)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f4bedd21-efde-44c6-9d9c-b48b78d7ed1e", gradingScheme: "Regulatory label; no grading.", read: "full-text", accessed: "2026-11-17" },
    { key: "lenvima-eu", label: "Lenvima summary of product characteristics (EMA EPAR product information; the text prints no revision date, the PDF file is dated 14 January 2026)", publisher: "European Medicines Agency", year: 2026, url: "https://www.ema.europa.eu/en/documents/product-information/lenvima-epar-product-information_en.pdf", gradingScheme: "Regulatory label; no grading.", read: "full-text", accessed: "2026-11-17" },
    { key: "sutent-us", label: "Sutent (sunitinib) US prescribing information, DailyMed (Pfizer, version of 23 February 2026)", publisher: "Pfizer / US FDA (DailyMed)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=43a4d7f8-48ae-4a63-9108-2fa8e3ea9d9c", gradingScheme: "Regulatory label; no grading.", read: "full-text", accessed: "2026-11-17" },
    { key: "votrient-us", label: "Votrient (pazopanib) US prescribing information, DailyMed (Novartis, version of 17 December 2025)", publisher: "Novartis / US FDA (DailyMed)", year: 2025, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=eeaaaf38-fb86-4d9f-a19d-0f61daac2fd7", gradingScheme: "Regulatory label; no grading.", read: "full-text", accessed: "2026-11-17" },
    { key: "nexavar-us", label: "Nexavar (sorafenib) US prescribing information, DailyMed (Bayer, version of 18 November 2024)", publisher: "Bayer / US FDA (DailyMed)", year: 2024, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b50667e4-5ebc-4968-a646-d605058dbef0", gradingScheme: "Regulatory label; no grading.", read: "full-text", accessed: "2026-11-17" },
    { key: "fruzaqla-us", label: "Fruzaqla (fruquintinib) US prescribing information, DailyMed (Takeda, version of 12 August 2026)", publisher: "Takeda / US FDA (DailyMed)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=186d786e-dc8a-45f2-b5e1-01ac0201879f", gradingScheme: "Regulatory label; no grading.", read: "full-text", accessed: "2026-11-17" },
    { key: "fotivda-us", label: "Fotivda (tivozanib) US prescribing information, DailyMed (AVEO, version of 16 November 2026)", publisher: "AVEO / US FDA (DailyMed)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=de77155c-ecf2-4f15-9758-21d271449d83", gradingScheme: "Regulatory label; no grading.", read: "full-text", accessed: "2026-11-17" },
    { key: "zhang-2016", label: "Zhang et al., Bevacizumab and wound-healing complications: a systematic review and meta-analysis of randomized controlled trials (Oncotarget 2016)", publisher: "Oncotarget", year: 2016, url: "https://doi.org/10.18632/oncotarget.12666", doi: "10.18632/oncotarget.12666", gradingScheme: "Meta-analysis; no recommendation grade.", read: "full-text", accessed: "2026-11-17" },
  ],
  cancers: [],
  drugs: ["bevacizumab", "ramucirumab", "ziv-aflibercept", "cabozantinib", "lenvatinib", "sunitinib", "pazopanib", "sorafenib", "regorafenib", "axitinib", "fruquintinib", "tivozanib"],
  technologies: ["antiangiogenic"],
  terms: ["antiangiogenic-toxicities"],
  related: ["surgical-site-infection-prevention", "routine-preoperative-tests"],
  upgrades: [],
  gaps: [
    "No national or international guideline setting these intervals independently of the labels was found. The ESMO metastatic colorectal cancer guideline could not be read to check whether it states one for liver surgery after bevacizumab: on 17 November 2026 Europe PMC listed a 2026 edition as well as the 2023 one, and neither has an open copy there.",
    "No label read says how its interval before surgery was chosen or reports a trial comparing intervals. The one source read that discusses it, a 2016 meta-analysis, says the bevacizumab interval rests largely on its half-life of about 20 days and that some recommend 4 weeks and others 6 to 8. Whether a shorter pause is safe is not answered by any source read.",
    "The EU product information for Zaltrap and Cabometyx, which could not be downloaded on 11 November 2026, was read on 17 November 2026. EU texts for the other tablets (Stivarga, Inlyta, Sutent, Votrient, Nexavar, Fruzaqla, Fotivda) and the UK texts were not read, so differences between them and the US figures on this page may exist.",
    "The EU product information PDFs print no revision date in their text; the date given for each is the date of the PDF file.",
    "Every US label read says the safety of restarting after a wound-healing complication has not been established.",
    "The labels of bevacizumab biosimilars were not read; this page rests on the Avastin texts.",
    "None of the labels read gives an interval for emergency surgery, or a list of wound symptoms for patients to report with a time limit.",
  ],
});
