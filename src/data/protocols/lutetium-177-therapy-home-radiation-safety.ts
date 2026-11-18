import { protocol } from "./helpers";

/*
 * Radiation safety for the patient, family and carers after lutetium-177 radioligand therapy: lutetium-177 PSMA
 * (vipivotide tetraxetan, Pluvicto) for prostate cancer and lutetium-177 dotatate (Lutathera) for neuroendocrine
 * tumours.
 *
 * First read on 11 November 2026. Second accuracy pass on 17 November 2026: every source was fetched again as raw
 * text, every quote was checked by script against that text, and each step was re-read against its passage.
 * - Joint EANM/SNMMI procedure guideline for 177Lu-labeled PSMA-targeted radioligand therapy (Kratochwil et al.,
 *   Eur J Nucl Med Mol Imaging 2023): full text, Europe PMC full-text XML (PMC10317889). Crossref lists no update.
 * - The joint IAEA, EANM and SNMMI practical guidance on peptide receptor radionuclide therapy in neuroendocrine
 *   tumours (Eur J Nucl Med Mol Imaging 2013): full text, Europe PMC full-text XML (PMC3622744). Its erratum
 *   (PMC4079671), unreadable on 11 November, was read: it corrects the order and spelling of the authors only.
 * - NANETS/SNMMI Procedure Standard for somatostatin receptor-based peptide receptor radionuclide therapy with
 *   177Lu-DOTATATE (Hope et al., J Nucl Med 2019): added in this pass. The first pass had said that no guideline
 *   newer than 2013 covered home precautions for lutetium-177 dotatate; this one does. Full text read as HTML from
 *   PubMed Central (PMC12079155) with one plain request; its Table 4 is text, not an image.
 * - US prescribing information for Pluvicto (DailyMed set 14908037-2892-4d98-a053-253ce35afb1a, version 5,
 *   effective 12 August 2026) and Lutathera (DailyMed set 72d1a024-00b7-418a-b36e-b2cb48f2ab55, version 12,
 *   effective 15 January 2026): full text, SPL XML from the DailyMed API.
 * - EMA product information (summary of product characteristics and package leaflet) for Pluvicto and Lutathera:
 *   refused a script on 11 November (HTTP 429); both PDFs downloaded on 17 November and were read with pdftotext.
 *   Neither prints a revision date; the files are dated 16 July 2026 (Pluvicto) and 6 August 2026 (Lutathera).
 * - US Nuclear Regulatory Commission, 10 CFR 35.75: text from the eCFR, re-using the copy a sibling checker
 *   fetched from the eCFR versioner on 17 November 2026.
 * - Not read: UK rules (the Ionising Radiations Regulations and the Environmental Permitting rules on release).
 *
 * Every DOI was resolved through Europe PMC or Crossref and its title checked. Quotes are copied from the raw text.
 */
export const lutetium177TherapyHomeRadiationSafety = protocol({
  id: "lutetium-177-therapy-home-radiation-safety",
  name: "Radiation safety at home after lutetium-177 PSMA or dotatate therapy",
  aka: ["Pluvicto radiation precautions", "Lutathera radiation precautions", "177Lu-PSMA home precautions", "PRRT home precautions", "radioligand therapy precautions", "after lutetium treatment at home", "radiation safety after radionuclide therapy"],
  domain: "radiotherapy",
  tldr: "After a lutetium-177 treatment your body gives off some radiation for a time, and the medicine leaves mainly in your urine. For some days you are asked to keep a distance from others, especially children and anyone pregnant, to sleep apart, to take care with the toilet and washing, and to drink plenty. The days differ by medicine and country: follow your hospital's written instructions.",
  simple: "For some days after this treatment, keep a little distance from other people, especially children and pregnant women, sleep on your own, and flush the toilet twice and wash your hands after using it. Drink plenty of water. The number of days depends on the medicine and the country, so follow the written sheet your hospital gives you.",
  summary: "Release follows national law: the EANM/SNMMI 2023 guideline notes that up to 48 to 72 hours on a radioisotope ward may be necessary to reach a local discharge threshold, and that where outpatient treatment is allowed the patient should stay about 2 hours to be monitored, hydrated and to pass urine first; the EU Lutathera product information says the legal emission limits are usually reached within 4 to 5 hours. In the United States 10 CFR 35.75 allows release where no other person is likely to receive more than 5 mSv, with written instructions where anyone is likely to receive more than 1 mSv. Fluids: increase intake for 3 to 4 days and void frequently for the first 6 to 10 hours (EANM/SNMMI, PSMA); the EU Pluvicto leaflet says plenty of water for 2 days; the Lutathera labels say before, on the day of and the day after. Toilet: rigorous hygiene, a double flush and hand washing, with particular concern in the first 2 days and against soiling for 1 week (IAEA/EANM/SNMMI 2013, PRRT); the EU leaflets add sitting to pass urine, a daily shower and separate laundry, for 2 days (toilet) and at least 7 days (shower) after Pluvicto and for 7 days after Lutathera. Contact after Pluvicto, the same on the US label and in the EU product information: limit close contact (under 3 feet in the US, under 1 metre in the EU) with others for 2 days and with children and pregnant women for 7 days, no sexual activity for 7 days, a separate room for 3, 7 and 15 days (others, children, pregnant women). Contact after Lutathera differs by source: the US label gives no day counts; the EU product information suggests limiting close contact (under 1 metre) for 7 days, with children and pregnant women to under 15 minutes a day for 7 days, and a separate bedroom for 7 days (15 days from children and pregnant women); NANETS/SNMMI 2019 gives 3 days as basic guidance, extended for children and a pregnant partner. The EU texts present their lists as general recommendations that can be considered along with national and local rules. Contraception after the last dose: Pluvicto, men 14 weeks (US and EU); Lutathera, women 7 months and men 4 months (US and EU), against 6 months in NANETS/SNMMI 2019 and at least 6 months avoiding pregnancy in IAEA 2013; EANM/SNMMI says 3 months for PSMA therapy. Breastfeeding after Lutathera: not during treatment or for 2.5 months after the last dose (US label). For incontinence, IAEA 2013 says to catheterise and keep the catheter for 2 days, while NANETS/SNMMI 2019 does not recommend routine catheterisation. A medical emergency is never delayed for radiation reasons (IAEA 2013).",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "nurse", "patient-or-carer"],
    where: ["outpatient-clinic", "ward", "home"],
  },
  population: "People treated with lutetium-177 vipivotide tetraxetan (PSMA) for prostate cancer or lutetium-177 dotatate (PRRT) for neuroendocrine tumours, and the people they live with. The US Lutathera label covers adults and children aged 12 years and older; the EU text says Pluvicto is not indicated for use in females. The day counts are those of each product's US label or EU product information, or of the NANETS/SNMMI 2019 standard, and each is named where it is used; the EU texts and NANETS/SNMMI leave the final numbers to national, local and institutional rules. Other radionuclide therapies (radioactive iodine, radium-223) are not covered here.",
  trigger: "A lutetium-177 radioligand treatment has been given and the patient is being prepared for discharge, after each cycle.",
  steps: [
    {
      action: "Decide on release by national rules: where the law requires it, keep the patient on a radioisotope ward until the local discharge threshold is reached; where outpatient treatment is allowed, keep the patient for about 2 hours first",
      why: "The rules on going home after a radioactive treatment depend on national law. The guideline says the short stay is to monitor side effects, make sure the patient has had enough to drink and let them pass urine for the first time before leaving.",
      source: "eanm-snmmi-psma-2023",
      quote: "Where out-patient therapy is allowed, patients should nevertheless be kept in isolation for approx. 2 h to monitor side effects, ensure sufficient hydration, and complete first urination before release.",
    },
    {
      action: "Explain the precautions that limit radiation to other people before the patient leaves; in the United States, give them in writing where another person is likely to receive more than 1 mSv",
      why: "The US rule requires written instructions above that dose. The US Pluvicto label and both EU product informations also ask that the precautions are explained before the patient is released.",
      source: "nrc-10cfr35-75",
      quote: "A licensee shall provide the released individual, or the individual's parent or guardian, with instructions, including written instructions, on actions recommended to maintain doses to other individuals as low as is reasonably achievable if the total effective dose equivalent to any other individual is likely to exceed 1 mSv (0.1 rem).",
    },
    {
      action: "Encourage the patient to drink more for the first 3 to 4 days after PSMA therapy and to pass urine often in the first 6 to 10 hours; after Lutathera, the labels say before, on the day of and the day after treatment",
      why: "Both medicines leave the body mainly through the kidneys. The guideline says extra fluid supports that clearance and frequent voiding reduces the radiation dose to the bladder. The EU Pluvicto leaflet says to drink plenty of water for 2 days.",
      source: "eanm-snmmi-psma-2023",
      quote: "To support kidney clearance, the patient is encouraged to increase fluid intake during the first 3–4 days following treatment.",
    },
    {
      action: "Teach toilet hygiene: flush twice after passing urine and wash hands every time",
      why: "The 2013 guidance says the high level of radioactivity passed in urine during the first 2 days is of particular concern, and that hygiene protects other people who use the same toilet.",
      source: "iaea-eanm-snmmi-prrnt-2013",
      quote: "Patients should be advised to observe rigorous hygiene to avoid contaminating persons using the same toilet facilities. A double toilet flush is recommended after urination. Patients should wash their hands after urination.",
    },
    {
      action: "For the first week, take care not to soil underclothing or the area around the toilet, and wash considerably contaminated clothing separately",
      why: "Urine carries radioactivity, so clothing and surfaces it reaches can pass it on to other people in the home.",
      source: "iaea-eanm-snmmi-prrnt-2013",
      quote: "Once discharged, patients should be cautioned to avoid soiling underclothing or areas around toilet bowls for 1 week following PRRNT. Considerably contaminated clothing should be washed separately.",
    },
    {
      action: "Where the EU leaflet applies, also sit to use the toilet, shower every day, and wash underwear, nightwear and sheets apart from the household's laundry: for 7 days after Lutathera; after Pluvicto, 2 days for the toilet rules and at least 7 days for the daily shower",
      why: "The EU package leaflets list these as special precautions to avoid contamination. They add that bleach and extra rinses are not needed, and that a carer who helps in the bathroom or cleans up body fluids should wear disposable gloves.",
      source: "lutathera-smpc",
      quote: "Wash your underwear, pyjamas, sheets and any clothes that contain sweat, blood or urine separately from the laundry of other members of your household, using a standard washing cycle.",
    },
    {
      action: "If the patient cannot control their bladder, plan for it before treatment: the 2013 IAEA/EANM/SNMMI guidance says to place a urinary catheter and keep it for 2 days, emptying the bag frequently",
      why: "Leaked urine spreads radioactivity. The sources differ: NANETS/SNMMI 2019 recommends disposable undergarments where stress incontinence is a concern, says a catheter may be necessary for some patients and does not recommend routine catheterisation; EANM/SNMMI 2023 says a catheter should be considered to improve radiation protection. Staff caring for a catheterised patient should wear gloves and protective clothing (2013 guidance).",
      source: "iaea-eanm-snmmi-prrnt-2013",
      quote: "Incontinent patients should be catheterized prior to PRRNT and the catheter should be kept for 2 days thereafter.",
    },
    {
      action: "After each dose of Pluvicto, limit close contact with others for 2 days and with children and pregnant women for 7 days (close contact is under 3 feet on the US label and under 1 metre in the EU product information)",
      why: "The EANM/SNMMI guideline describes the risk to others as theoretical, from the gamma rays lutetium-177 gives off and from radioactivity that is passed out of the body. The EU text gives the same days as general recommendations that can be considered along with national, local and institutional rules.",
      source: "pluvicto-uspi",
      quote: "Limit close contact (less than 3 feet) with others for 2 days or with children and pregnant women for 7 days.",
    },
    {
      action: "After each dose of Pluvicto, sleep in a separate room for 3 days from other people, 7 days from children and 15 days from pregnant women, and refrain from sexual activity for 7 days",
      why: "The label gives these periods as the precautions that minimise radiation exposure to others; the US label and the EU product information give the same days.",
      source: "pluvicto-uspi",
      quote: "Sleep in a separate room from others for 3 days, from children for 7 days, or from pregnant women for 15 days.",
    },
    {
      action: "After each dose of Lutathera, limit close contact and sleep apart for the days on the hospital's sheet; the EU product information suggests 7 days, and 15 days of separate sleeping from children and pregnant women",
      why: "The sources differ. The EU text also suggests keeping close contact with children and pregnant women to under 15 minutes a day for 7 days, and presents its list as general recommendations alongside national and local rules. The US label sets no number of days. NANETS/SNMMI 2019 gives 3 days as basic guidance (a separate bed, no closer than 3 feet for more than 1 hour a day), longer for infants, children or a pregnant partner, and says each centre should set its own.",
      source: "lutathera-smpc",
      quote: "Close contact (less than 1 metre) with other people should be limited for 7 days.",
    },
    {
      action: "Use effective contraception during treatment and after the last dose for the period on the product's label: after Lutathera, 7 months for women and 4 months for men with a female partner; after Pluvicto, 14 weeks for men",
      why: "The labels say radiation from these medicines can cause harm to an unborn baby. The US labels and EU product informations give the same periods; the guidelines give different ones (3 months for PSMA therapy in EANM/SNMMI 2023; 6 months after lutetium-177 dotatate in NANETS/SNMMI 2019).",
      source: "lutathera-uspi",
      quote: "Advise females of reproductive potential to use effective contraception during treatment with LUTATHERA and for 7 months after the last dose.",
    },
    {
      action: "Advise women not to breastfeed during Lutathera treatment and for 2.5 months after the last dose (US label)",
      why: "The US label gives the potential risk of serious adverse reactions in a breastfed child as the reason. The EU product information says breast-feeding should be avoided during treatment and gives no period afterwards.",
      source: "lutathera-uspi",
      quote: "Because of the potential risk for serious adverse reactions in breastfed children, advise women not to breastfeed during treatment with LUTATHERA and for 2.5 months after the last dose.",
    },
    {
      action: "Give a discharge letter stating the radionuclide, the drug, the activity given, the date, the aftercare and the next appointment",
      why: "The EU Pluvicto leaflet asks a patient who needs emergency care or is admitted to hospital in the first 7 days to tell staff the name, date and dose of the treatment, and the US Lutathera label notes that radiation can be detected in urine for up to 30 days.",
      source: "eanm-snmmi-psma-2023",
      quote: "The discharge letter should contain relevant patient data, date of therapy, the administered radionuclide (177Lu) and radiopharmaceutical, administered activity, details on necessary aftercare, and next follow-up appointment.",
    },
    {
      action: "In a medical emergency, give care promptly; concerns about radiation exposure should not hold it up",
      why: "The 2013 guidance asks teams to note any serious condition in advance and to have a plan for the case where radiation precautions have to be broken to give emergency care.",
      source: "iaea-eanm-snmmi-prrnt-2013",
      quote: "In a medical emergency, concerns about radiation exposure should not hinder the prompt delivery of appropriate medical care to the patient.",
    },
  ],
  bestInClass: {
    statement: "Release under national rules (EANM/SNMMI 2023: up to 48 to 72 hours on a radioisotope ward where the law requires it, otherwise about 2 hours' observation; US 10 CFR 35.75: release where no one else is likely to receive more than 5 mSv, with written instructions above 1 mSv), followed by the home precautions of the product's own label in that country, explained before release: plenty to drink and frequent voiding, toilet hygiene with a double flush and hand washing (IAEA/EANM/SNMMI 2013), distance and separate sleeping for set periods, and contraception. For Pluvicto the US label and the EU product information agree: 2 and 7 days of limited close contact, 3, 7 and 15 days of separate sleeping, 7 days without sexual activity, and 14 weeks of contraception for men. For Lutathera the sources disagree on contact: the US label sets no days, the EU product information suggests 7 days (15 days of separate sleeping from children and pregnant women), and NANETS/SNMMI 2019 gives 3 days as basic guidance. They also disagree on contraception: 7 months for women and 4 months for men on both labels, 6 months in NANETS/SNMMI 2019, at least 6 months avoiding pregnancy in IAEA 2013; for PSMA therapy, 14 weeks on the labels against 3 months in EANM/SNMMI. And on incontinence: a catheter for 2 days (IAEA 2013) against no routine catheterisation (NANETS/SNMMI 2019). Patients should follow the figures their own team gives.",
    sources: ["eanm-snmmi-psma-2023", "iaea-eanm-snmmi-prrnt-2013", "nanets-snmmi-prrt-2019", "pluvicto-uspi", "pluvicto-smpc", "lutathera-uspi", "lutathera-smpc", "nrc-10cfr35-75"],
  },
  variants: [
    {
      name: "Inpatient isolation until a dose-rate threshold",
      differs: "Keeps the patient on a radioisotope ward for up to 48 to 72 hours rather than treating as an outpatient.",
      evidence: "Set by national law rather than by evidence about outcomes: EANM/SNMMI 2023 says that, depending on national legislation, up to 48 to 72 hours of isolation on a radioisotope ward may be necessary to reach the local discharge threshold. The United States allows release under the 5 mSv rule. The EU Lutathera product information says patients should be kept away from others until the legal emission limits are reached, usually within the 4 to 5 hours after administration.",
      sources: ["eanm-snmmi-psma-2023", "nrc-10cfr35-75", "lutathera-smpc"],
    },
    {
      name: "Days of distance and separate sleeping after Lutathera, by source",
      differs: "US label: no number of days; precautions are to follow institutional practice. EU product information: close contact (under 1 metre) limited for 7 days, and to under 15 minutes a day with children and pregnant women for 7 days; a separate bedroom for 7 days, and for 15 days from children and pregnant women. NANETS/SNMMI 2019 (Table 4): 3 days of a separate bed, of flushing twice with the lid closed and of keeping no closer than 3 feet for more than 1 hour a day, with the period extended for infants, children or a pregnant partner.",
      evidence: "No study read compares them. The EU text says its recommendations can be considered along with national, local and institutional procedures and regulations. NANETS/SNMMI says each centre should determine its own recommendations, and that 3 days should be sufficient for resumption of most public activities.",
      sources: ["lutathera-uspi", "lutathera-smpc", "nanets-snmmi-prrt-2019"],
    },
    {
      name: "Contraception periods by source",
      differs: "Pluvicto (US label and EU product information): men, 14 weeks after the last dose; the EU text says to use a condom and not to father a child. Lutathera (US label and EU product information): women 7 months, men 4 months; the US label adds no breastfeeding for 2.5 months. EANM/SNMMI 2023 (PSMA): 3 months. NANETS/SNMMI 2019 (lutetium-177 dotatate): 6 months after the final treatment, and no breastfeeding until 2.5 months after it. IAEA/EANM/SNMMI 2013 (PRRT): women to avoid pregnancy for at least 6 months, and men to consider sperm banking before therapy.",
      evidence: "No trial compares them. EANM/SNMMI states its 3 months is \"Without specific evidence for 177Lu-PSMA-RLT, but according to general knowledge of radiopharmaceuticals\". The EU Pluvicto text gives potential effects on spermatogenesis as its reason.",
      sources: ["pluvicto-uspi", "pluvicto-smpc", "lutathera-uspi", "lutathera-smpc", "eanm-snmmi-psma-2023", "nanets-snmmi-prrt-2019", "iaea-eanm-snmmi-prrnt-2013"],
    },
    {
      name: "Urinary catheter for incontinence",
      differs: "IAEA/EANM/SNMMI 2013: incontinent patients should be catheterised before PRRT and the catheter kept for 2 days. NANETS/SNMMI 2019: disposable undergarments where stress incontinence is a concern; a catheter with a shielded bag may be necessary for some patients, but routine catheterisation is not recommended. EANM/SNMMI 2023 (PSMA): unmanageable incontinence is listed as a relative contraindication, a catheter alone is not one, and a catheter should be considered to improve radiation protection.",
      evidence: "None of the sources read compares the approaches. The EU Lutathera product information asks for special precautions in the first 2 days for patients with urinary incontinence and does not name a catheter.",
      sources: ["iaea-eanm-snmmi-prrnt-2013", "nanets-snmmi-prrt-2019", "eanm-snmmi-psma-2023", "lutathera-smpc"],
    },
  ],
  grades: [
    { claim: "Release where no other person is likely to receive more than 5 mSv", grade: "US federal regulation (10 CFR 35.75(a))", source: "nrc-10cfr35-75", quote: "if the total effective dose equivalent to any other individual from exposure to the released individual is not likely to exceed 5 mSv (0.5 rem)." },
    { claim: "Instruct patients how to minimise exposure to others, such as avoiding prolonged close contact with pregnant women or infants", grade: "Procedure guideline statement (not graded)", source: "eanm-snmmi-psma-2023", quote: "Patients should be instructed how to minimize exposure to others (e.g., avoiding prolonged close contact with pregnant women or infants)." },
    { claim: "Contraception during and for 3 months after lutetium-177 PSMA therapy", grade: "Procedure guideline statement, stated to be without specific evidence", source: "eanm-snmmi-psma-2023", quote: "Due to the pro-mutagenic characteristics of any radioactive drug, sufficient contraception is needed during and for 3 months after therapy." },
    { claim: "Contraception for men after Pluvicto, 14 weeks after the last dose", grade: "US prescribing information (FDA label)", source: "pluvicto-uspi", quote: "Advise males with female partners of reproductive potential to use effective contraception during treatment with PLUVICTO and for 14 weeks after the last dose" },
    { claim: "No breastfeeding during Lutathera and for 2.5 months after the last dose", grade: "US prescribing information (FDA label)", source: "lutathera-uspi", quote: "Because of the potential risk for serious adverse reactions in breastfed children, advise women not to breastfeed during treatment with LUTATHERA and for 2.5 months after the last dose." },
    { claim: "Radioactivity in urine for up to 30 days after Lutathera", grade: "US prescribing information (FDA label)", source: "lutathera-uspi", quote: "Radiation can be detected in the urine for up to 30 days following LUTATHERA administration." },
    { claim: "The EU contact and sleeping periods after Lutathera are general recommendations, to be considered with national and local rules", grade: "EU product information (not graded): \"can be considered\"", source: "lutathera-smpc", quote: "After each administration, the following general recommendations can be considered along with national, local and institutional procedures and regulations:" },
    { claim: "The EU contact and sleeping periods after Pluvicto are general recommendations, to be considered with national and local rules", grade: "EU product information (not graded): \"can be considered\"", source: "pluvicto-smpc", quote: "After each administration of Pluvicto, the following general recommendations for patients can be considered along with national, local and institutional procedures and regulations." },
    { claim: "Contraception for 6 months after the final lutetium-177 dotatate treatment", grade: "Consensus procedure standard (not graded)", source: "nanets-snmmi-prrt-2019", quote: "Contraception should be used for 6 mo after completion of the final treatment." },
    { claim: "Routine bladder catheterisation is not recommended for lutetium-177 dotatate therapy", grade: "Consensus procedure standard (not graded)", source: "nanets-snmmi-prrt-2019", quote: "However, routine bladder catheterization is not recommended." },
  ],
  sources: [
    {
      key: "eanm-snmmi-psma-2023",
      label: "Joint EANM/SNMMI procedure guideline for the use of 177Lu-labeled PSMA-targeted radioligand-therapy (177Lu-PSMA-RLT)",
      publisher: "EANM and SNMMI (European Journal of Nuclear Medicine and Molecular Imaging; Kratochwil et al.)",
      year: 2023,
      url: "https://doi.org/10.1007/s00259-023-06255-8",
      doi: "10.1007/s00259-023-06255-8",
      gradingScheme: "Recommendations on indications are classified strong, moderate-strong or weak by the level of evidence; the radiation protection and aftercare statements quoted here are procedure guidance and carry no grade.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "iaea-eanm-snmmi-prrnt-2013",
      label: "The joint IAEA, EANM, and SNMMI practical guidance on peptide receptor radionuclide therapy (PRRNT) in neuroendocrine tumours",
      publisher: "IAEA, EANM and SNMMI (European Journal of Nuclear Medicine and Molecular Imaging)",
      year: 2013,
      url: "https://doi.org/10.1007/s00259-012-2330-6",
      doi: "10.1007/s00259-012-2330-6",
      gradingScheme: "Not graded: practical guidance.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "nanets-snmmi-prrt-2019",
      label: "NANETS/SNMMI Procedure Standard for Somatostatin Receptor-Based Peptide Receptor Radionuclide Therapy with 177Lu-DOTATATE",
      publisher: "NANETS and SNMMI (Journal of Nuclear Medicine; Hope et al.)",
      year: 2019,
      url: "https://doi.org/10.2967/jnumed.118.230607",
      doi: "10.2967/jnumed.118.230607",
      gradingScheme: "Not graded: a practical consensus guideline.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "pluvicto-uspi",
      label: "PLUVICTO (lutetium Lu 177 vipivotide tetraxetan) injection, US prescribing information (sections 5.1, 8.3 and 17)",
      publisher: "Novartis, via DailyMed (US National Library of Medicine)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=14908037-2892-4d98-a053-253ce35afb1a",
      gradingScheme: "Regulatory label: not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "pluvicto-smpc",
      label: "Pluvicto (lutetium (177Lu) vipivotide tetraxetan), EU product information: summary of product characteristics (sections 4.4 and 4.6) and package leaflet",
      publisher: "Novartis, via the European Medicines Agency",
      year: 2026,
      url: "https://www.ema.europa.eu/en/documents/product-information/pluvicto-epar-product-information_en.pdf",
      gradingScheme: "Regulatory product information: not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "lutathera-uspi",
      label: "LUTATHERA (lutetium Lu 177 dotatate) injection, US prescribing information (sections 5.1, 8.2, 8.3 and 17)",
      publisher: "Advanced Accelerator Applications, via DailyMed (US National Library of Medicine)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=72d1a024-00b7-418a-b36e-b2cb48f2ab55",
      gradingScheme: "Regulatory label: not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "lutathera-smpc",
      label: "Lutathera (lutetium (177Lu) oxodotreotide), EU product information: summary of product characteristics (sections 4.4 and 4.6) and package leaflet",
      publisher: "Advanced Accelerator Applications, via the European Medicines Agency",
      year: 2026,
      url: "https://www.ema.europa.eu/en/documents/product-information/lutathera-epar-product-information_en.pdf",
      gradingScheme: "Regulatory product information: not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "nrc-10cfr35-75",
      label: "10 CFR 35.75: Release of individuals containing unsealed byproduct material or implants containing byproduct material",
      publisher: "US Nuclear Regulatory Commission (Electronic Code of Federal Regulations)",
      year: 2007,
      url: "https://www.ecfr.gov/current/title-10/chapter-I/part-35/subpart-C/section-35.75",
      gradingScheme: "Federal regulation: binding on US licensees, not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
  ],
  cancers: ["prostate", "neuroendocrine"],
  drugs: ["pluvicto", "lutathera"],
  technologies: ["lu177-radioligand-therapy"],
  terms: ["castration-resistance"],
  related: [],
  upgrades: ["idea-pu-lutetium-177-family-planning-table"],
  gaps: [
    "The number of days of distance and separate sleeping after Lutathera is not settled: the US label gives none, the EU product information suggests 7 and 15 days, and NANETS/SNMMI 2019 gives 3 days as basic guidance. Hospital instruction sheets set their own.",
    "The EU product information for Pluvicto and Lutathera, which refused a script on 11 November 2026, was read on 17 November 2026. Neither file prints a date of revision, so the year given is that of the files as downloaded. The UK product information was not read; patients in the UK should follow the leaflet supplied with their treatment.",
    "The 2013 IAEA/EANM/SNMMI guidance is the most recent joint guidance from those three bodies found for PRRT and predates the licensing of Lutathera; the NANETS/SNMMI 2019 procedure standard is newer and specific to lutetium-177 dotatate, and was added on 17 November 2026. The erratum to the 2013 guidance was read on that date and corrects the authors' names only.",
    "Contraception periods differ between the labels and the guidelines (3 months, 14 weeks, 4 months, 6 months, 7 months); no study compares them.",
    "The EU Lutathera product information says breast-feeding should be avoided during treatment and gives no period afterwards; the 2.5 months is from the US label and NANETS/SNMMI 2019.",
    "UK release rules (Ionising Radiations Regulations 2017, IR(ME)R and environmental permitting) were not read.",
    "None of the sources read cites a study measuring harm to household members; the regulation and the labels set limits and periods without one.",
  ],
});
