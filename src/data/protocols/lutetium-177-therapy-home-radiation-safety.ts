import { protocol } from "./helpers";

/*
 * Radiation safety for the patient, family and carers after lutetium-177 radioligand therapy: lutetium-177 PSMA
 * (vipivotide tetraxetan, Pluvicto) for prostate cancer and lutetium-177 dotatate (Lutathera) for neuroendocrine
 * tumours.
 *
 * What was read, and how (11 November 2026, fetched raw into a scratch directory and read as text):
 * - Joint EANM/SNMMI procedure guideline for 177Lu-labeled PSMA-targeted radioligand therapy (Kratochwil et al.,
 *   Eur J Nucl Med Mol Imaging 2023): full text, Europe PMC full-text XML (PMC10317889).
 * - The joint IAEA, EANM and SNMMI practical guidance on peptide receptor radionuclide therapy in neuroendocrine
 *   tumours (Eur J Nucl Med Mol Imaging 2013): full text, Europe PMC full-text XML (PMC3622744). An erratum exists
 *   (PMC4079671); its text could not be retrieved. A Europe PMC search on 11 November 2026 found no newer
 *   EANM/SNMMI/IAEA procedure guideline for lutetium-177 dotatate; the NANETS/SNMMI consensus statement (2020) was
 *   read in full from PMC (PMC9364765) and covers patient selection, not home precautions.
 * - US prescribing information for Pluvicto (DailyMed set 14908037-2892-4d98-a053-253ce35afb1a, published 13 August
 *   2026) and Lutathera (DailyMed set 72d1a024-00b7-418a-b36e-b2cb48f2ab55, published 16 January 2026): full text, SPL
 *   XML from the DailyMed API.
 * - US Nuclear Regulatory Commission, 10 CFR 35.75 (release of individuals containing unsealed byproduct material):
 *   full text from the eCFR renderer.
 * - EMA product information for Pluvicto and Lutathera: ema.europa.eu returned HTTP 429 to a script; not read, not
 *   cited. UK rules (the Ionising Radiations Regulations and the Environmental Permitting rules on release) were not
 *   read.
 *
 * Every DOI was resolved through Europe PMC or Crossref and its title checked. Quotes are copied from the raw text.
 */
export const lutetium177TherapyHomeRadiationSafety = protocol({
  id: "lutetium-177-therapy-home-radiation-safety",
  name: "Radiation safety at home after lutetium-177 PSMA or dotatate therapy",
  aka: ["Pluvicto radiation precautions", "Lutathera radiation precautions", "177Lu-PSMA home precautions", "PRRT home precautions", "radioligand therapy precautions", "after lutetium treatment at home", "radiation safety after radionuclide therapy"],
  domain: "radiotherapy",
  tldr: "After a lutetium-177 treatment your body gives off a small amount of radiation for some days, and most of the radioactivity leaves in your urine. For a short time you are asked to keep some distance from others, especially children and anyone pregnant, to sleep apart, to be careful with the toilet and washing, and to drink plenty. Your team will give you written instructions with the exact days.",
  simple: "For a few days after this treatment, keep a little distance from other people, especially children and pregnant women, sleep on your own, and flush the toilet twice and wash your hands after using it. Drink plenty of water. Follow the written sheet your hospital gives you.",
  summary: "Release follows national law: the EANM/SNMMI 2023 guideline notes that up to 48 to 72 hours of ward isolation may be needed to reach a local discharge threshold, and that where outpatient treatment is allowed the patient should stay about 2 hours to be monitored, hydrated and to pass urine first. In the United States 10 CFR 35.75 allows release where no other person is likely to receive more than 5 mSv, with written instructions where anyone could receive more than 1 mSv. Precautions: drink more for 3 to 4 days and void often (EANM/SNMMI; both US labels); rigorous toilet hygiene, a double flush and hand washing, with particular care in the first 2 days and against soiling for a week (IAEA/EANM/SNMMI 2013 for PRRT); catheterise incontinent patients and keep the catheter for 2 days (IAEA 2013), and EANM/SNMMI suggests considering a catheter. The Pluvicto label gives the most specific contact limits after each dose: under 3 feet from others for 2 days and from children and pregnant women for 7 days, no sexual activity for 7 days, and separate sleeping for 3, 7 and 15 days (others, children, pregnant women). The Lutathera label gives no day counts and notes radioactivity in urine for up to 30 days. Contraception figures differ by source: Pluvicto men 14 weeks after the last dose; Lutathera women 7 months and men 4 months, no breastfeeding for 2.5 months; EANM/SNMMI 3 months for PSMA; IAEA 2013 at least 6 months avoiding pregnancy for women after PRRT. A medical emergency is never delayed for radiation reasons.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "nurse", "patient-or-carer"],
    where: ["outpatient-clinic", "ward", "home"],
  },
  population: "Adults treated with lutetium-177 vipivotide tetraxetan (PSMA) for prostate cancer or lutetium-177 dotatate (PRRT) for neuroendocrine tumours, and the people they live with. The day counts quoted are from the US Pluvicto label; the Lutathera label and the guidelines read leave the exact numbers to institutional and national rules, which vary by country and by the dose rate measured at discharge. Children treated with PRRT, and other radionuclide therapies (radioactive iodine, radium-223), follow their own instructions.",
  trigger: "A lutetium-177 radioligand treatment has been given and the patient is being prepared for discharge, after each cycle.",
  steps: [
    {
      action: "Decide on release by national rules: keep the patient on a shielded ward until the dose rate is below the local discharge threshold where the law requires it, or for about 2 hours after outpatient treatment",
      why: "The rules on when someone can go home after a radioactive treatment differ between countries; the short stay also lets the team check side effects and that the patient can pass urine.",
      source: "eanm-snmmi-psma-2023",
      quote: "Where out-patient therapy is allowed, patients should nevertheless be kept in isolation for approx. 2 h to monitor side effects, ensure sufficient hydration, and complete first urination before release.",
    },
    {
      action: "Give written instructions on reducing radiation to other people before the patient leaves",
      why: "People remember little of what is said on treatment day; a written sheet with the dates lets the household follow it.",
      source: "nrc-10cfr35-75",
      quote: "A licensee shall provide the released individual, or the individual's parent or guardian, with instructions, including written instructions, on actions recommended to maintain doses to other individuals as low as is reasonably achievable if the total effective dose equivalent to any other individual is likely to exceed 1 mSv (0.1 rem).",
    },
    {
      action: "Ask the patient to drink more for the first 3 to 4 days and to pass urine often, especially in the first hours",
      why: "Most of the radioactivity leaves in urine; drinking and emptying the bladder often clears it faster and lowers the dose to the bladder and kidneys.",
      source: "eanm-snmmi-psma-2023",
      quote: "To support kidney clearance, the patient is encouraged to increase fluid intake during the first 3–4 days following treatment.",
    },
    {
      action: "Teach toilet hygiene: flush twice after passing urine, wash hands every time, and wash heavily soiled clothing separately",
      why: "Urine is the main source of contamination in the home for the first days, and others may use the same toilet.",
      source: "iaea-eanm-snmmi-prrnt-2013",
      quote: "Patients should be advised to observe rigorous hygiene to avoid contaminating persons using the same toilet facilities. A double toilet flush is recommended after urination. Patients should wash their hands after urination.",
    },
    {
      action: "For the first week, take care not to soil underclothing or the area around the toilet",
      why: "Small amounts of radioactive urine on clothes or surfaces are the commonest way others are exposed.",
      source: "iaea-eanm-snmmi-prrnt-2013",
      quote: "Once discharged, patients should be cautioned to avoid soiling underclothing or areas around toilet bowls for 1 week following PRRNT. Considerably contaminated clothing should be washed separately.",
    },
    {
      action: "If the patient is incontinent, place a urinary catheter before treatment and keep it for 2 days, emptying the bag often and with gloves",
      why: "A catheter keeps radioactive urine contained when the bladder cannot be controlled.",
      source: "iaea-eanm-snmmi-prrnt-2013",
      quote: "Incontinent patients should be catheterized prior to PRRNT and the catheter should be kept for 2 days thereafter.",
    },
    {
      action: "Keep a distance from other people, and more so from children and pregnant women, for the days set out in the instructions (after Pluvicto: under 3 feet from others for 2 days, and from children and pregnant women for 7 days)",
      why: "The treatment gives off some gamma radiation for several days, and distance cuts the dose to others sharply; children and unborn babies are more sensitive.",
      source: "pluvicto-uspi",
      quote: "Limit close contact (less than 3 feet) with others for 2 days or with children and pregnant women for 7 days.",
    },
    {
      action: "Sleep in a separate room for the days set out (after Pluvicto: 3 days from other adults, 7 days from children, 15 days from a pregnant woman), and avoid sexual activity for 7 days",
      why: "Hours spent close together at night account for much of a partner's dose.",
      source: "pluvicto-uspi",
      quote: "Sleep in a separate room from others for 3 days, from children for 7 days, or from pregnant women for 15 days.",
    },
    {
      action: "Use effective contraception during treatment and afterwards for the period the product and the team set, and do not breastfeed after Lutathera",
      why: "Radiation can harm an unborn baby and sperm and eggs; the advised gap differs between the drugs and the guidelines.",
      source: "lutathera-uspi",
      quote: "Advise females of reproductive potential to use effective contraception during treatment with LUTATHERA and for 7 months after the last dose.",
    },
    {
      action: "Give a discharge letter stating the radionuclide, the drug, the activity given, the date, the aftercare and the next appointment",
      why: "Other clinicians need to know what was given, and urine can carry detectable radioactivity for weeks (up to 30 days after Lutathera, by its US label).",
      source: "eanm-snmmi-psma-2023",
      quote: "The discharge letter should contain relevant patient data, date of therapy, the administered radionuclide (177Lu) and radiopharmaceutical, administered activity, details on necessary aftercare, and next follow-up appointment.",
    },
    {
      action: "In a medical emergency, give care at once; radiation precautions come second",
      why: "The dose to staff from a treated patient is small compared with the harm of delayed treatment.",
      source: "iaea-eanm-snmmi-prrnt-2013",
      quote: "In a medical emergency, concerns about radiation exposure should not hinder the prompt delivery of appropriate medical care to the patient.",
    },
  ],
  bestInClass: {
    statement: "Release under national rules (EANM/SNMMI 2023: up to 48 to 72 hours' isolation where the law requires it, otherwise about 2 hours' observation; US 10 CFR 35.75: release where no one else is likely to receive more than 5 mSv, with written instructions above 1 mSv), followed by written home precautions: plenty to drink and frequent voiding, rigorous toilet hygiene with a double flush and hand washing (IAEA/EANM/SNMMI 2013), catheterisation for incontinence, distance and separate sleeping for set periods (the US Pluvicto label is the most specific: 2 and 7 days of limited close contact, 3, 7 and 15 days of separate sleeping, 7 days without sexual activity), and contraception. The sources disagree on contraception after treatment: for Lutathera, 7 months for women and 4 months for men (US label) against at least 6 months avoiding pregnancy (IAEA 2013); for PSMA, 14 weeks for men (US label) against 3 months (EANM/SNMMI). Patients should follow the figure their own team gives, which is set by the product licence in their country.",
    sources: ["eanm-snmmi-psma-2023", "iaea-eanm-snmmi-prrnt-2013", "pluvicto-uspi", "lutathera-uspi", "nrc-10cfr35-75"],
  },
  variants: [
    {
      name: "Inpatient isolation until a dose-rate threshold",
      differs: "Keeps the patient on a shielded radioisotope ward for up to 48 to 72 hours rather than treating as an outpatient.",
      evidence: "Set by national law rather than by evidence about outcomes: EANM/SNMMI 2023 says that, depending on national legislation, up to 48 to 72 hours of isolation on a radioisotope ward may be needed to reach the local discharge threshold. The United States allows outpatient release under the 5 mSv rule.",
      sources: ["eanm-snmmi-psma-2023", "nrc-10cfr35-75"],
    },
    {
      name: "Contraception periods by source",
      differs: "Pluvicto (US label): men with female partners, 14 weeks after the last dose. Lutathera (US label): women 7 months, men 4 months, and no breastfeeding for 2.5 months. EANM/SNMMI (PSMA): 3 months. IAEA/EANM/SNMMI (PRRT, 2013): women to avoid pregnancy for at least 6 months, and men to consider sperm banking before therapy.",
      evidence: "No trial compares them; the label periods derive from the drug's half-life and genotoxicity, and EANM/SNMMI states its 3 months is \"Without specific evidence for 177Lu-PSMA-RLT, but according to general knowledge of radiopharmaceuticals\".",
      sources: ["pluvicto-uspi", "lutathera-uspi", "eanm-snmmi-psma-2023", "iaea-eanm-snmmi-prrnt-2013"],
    },
  ],
  grades: [
    { claim: "Release where no other person is likely to receive more than 5 mSv", grade: "US federal regulation (10 CFR 35.75(a))", source: "nrc-10cfr35-75", quote: "if the total effective dose equivalent to any other individual from exposure to the released individual is not likely to exceed 5 mSv (0.5 rem)." },
    { claim: "Instruct patients how to minimise exposure to others, such as avoiding prolonged close contact with pregnant women or infants", grade: "Procedure guideline statement (not graded)", source: "eanm-snmmi-psma-2023", quote: "Patients should be instructed how to minimize exposure to others (e.g., avoiding prolonged close contact with pregnant women or infants)." },
    { claim: "Contraception during and for 3 months after lutetium-177 PSMA therapy", grade: "Procedure guideline statement, stated to be without specific evidence", source: "eanm-snmmi-psma-2023", quote: "Due to the pro-mutagenic characteristics of any radioactive drug, sufficient contraception is needed during and for 3 months after therapy." },
    { claim: "Contraception for men after Pluvicto, 14 weeks after the last dose", grade: "US prescribing information (FDA label)", source: "pluvicto-uspi", quote: "Advise males with female partners of reproductive potential to use effective contraception during treatment with PLUVICTO and for 14 weeks after the last dose" },
    { claim: "No breastfeeding during Lutathera and for 2.5 months after the last dose", grade: "US prescribing information (FDA label)", source: "lutathera-uspi", quote: "Because of the potential risk for serious adverse reactions in breastfed children, advise women not to breastfeed during treatment with LUTATHERA and for 2.5 months after the last dose." },
    { claim: "Radioactivity in urine for up to 30 days after Lutathera", grade: "US prescribing information (FDA label)", source: "lutathera-uspi", quote: "Radiation can be detected in the urine for up to 30 days following LUTATHERA administration." },
  ],
  sources: [
    {
      key: "eanm-snmmi-psma-2023",
      label: "Joint EANM/SNMMI procedure guideline for the use of 177Lu-labeled PSMA-targeted radioligand-therapy (177Lu-PSMA-RLT)",
      publisher: "EANM and SNMMI (European Journal of Nuclear Medicine and Molecular Imaging; Kratochwil et al.)",
      year: 2023,
      url: "https://doi.org/10.1007/s00259-023-06255-8",
      doi: "10.1007/s00259-023-06255-8",
      gradingScheme: "Indications are graded strong or weak by level of evidence; the radiation protection and aftercare statements quoted here are procedure guidance and carry no grade.",
      read: "full-text",
      accessed: "2026-11-11",
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
      accessed: "2026-11-11",
    },
    {
      key: "pluvicto-uspi",
      label: "PLUVICTO (lutetium Lu 177 vipivotide tetraxetan) injection, US prescribing information (sections 5.1, 8.3 and 17)",
      publisher: "Novartis, via DailyMed (US National Library of Medicine)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=14908037-2892-4d98-a053-253ce35afb1a",
      gradingScheme: "Regulatory label: not graded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "lutathera-uspi",
      label: "LUTATHERA (lutetium Lu 177 dotatate) injection, US prescribing information (sections 5.1, 8.2, 8.3 and 17)",
      publisher: "Advanced Accelerator Applications, via DailyMed (US National Library of Medicine)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=72d1a024-00b7-418a-b36e-b2cb48f2ab55",
      gradingScheme: "Regulatory label: not graded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "nrc-10cfr35-75",
      label: "10 CFR 35.75: Release of individuals containing unsealed byproduct material or implants containing byproduct material",
      publisher: "US Nuclear Regulatory Commission (Electronic Code of Federal Regulations)",
      year: 2007,
      url: "https://www.ecfr.gov/current/title-10/chapter-I/part-35/subpart-C/section-35.75",
      gradingScheme: "Federal regulation: binding on US licensees, not graded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
  ],
  cancers: ["prostate", "neuroendocrine"],
  drugs: ["pluvicto", "lutathera"],
  technologies: ["lu177-radioligand-therapy"],
  terms: ["castration-resistance"],
  related: [],
  upgrades: ["idea-pu-lutetium-177-family-planning-table"],
  gaps: [
    "The European product information for Pluvicto and Lutathera could not be read (ema.europa.eu refused a script with HTTP 429), so the European and UK day counts and contraception periods are not given here; patients in Europe should follow the leaflet supplied with their treatment.",
    "The Lutathera US label and both guidelines leave the number of days of distance and separate sleeping to institutional rules; only the Pluvicto US label states them. Hospital instruction sheets set them from the dose rate measured at discharge.",
    "No newer IAEA, EANM or SNMMI procedure guideline for lutetium-177 dotatate than 2013 was found; an erratum to the 2013 guidance exists and could not be read.",
    "Contraception periods differ between the labels and the guidelines (3 months, 14 weeks, 4 months, 6 months, 7 months); no study compares them.",
    "UK release rules (Ionising Radiations Regulations 2017, IR(ME)R and environmental permitting) were not read.",
    "The precautions rest on dose modelling and regulation, not on trials measuring harm to household members.",
  ],
});
