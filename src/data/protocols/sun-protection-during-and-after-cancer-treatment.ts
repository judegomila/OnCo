import { protocol } from "./helpers";

/*
 * Sun protection during and after cancer treatment: drugs that make the skin burn more easily, skin treated with
 * radiotherapy, and radiation recall.
 *
 * What was read, and how. First written on 11 November 2026. Second accuracy pass on 17 November 2026: every source
 * re-read as raw text and every claim, figure and quotation checked against it; quotations checked by script.
 * - NHS, Sunscreen and sun safety (page last reviewed 24 March 2026): fetched with curl on 17 November, full text.
 * - NCI, Radiation Therapy and You (back cover: NIH Publication No. 21-7157, April 2021): PDF fetched with curl on
 *   17 November and read with pdftotext; the skin changes and hair loss sections.
 * - NCI, Chemotherapy and You (back cover: NIH Publication No. 24-7157, January 2024, so the year is 2024, not 2023):
 *   the PDF another checker fetched from cancer.gov on 17 November was re-used and read with pdftotext.
 * - Macmillan Cancer Support, Taking care on holiday (reviewed 1 March 2023, marked as being reviewed): the copy another
 *   checker fetched on 17 November was re-used, tags stripped by script.
 * - MASCC EGFR inhibitor dermatologic toxicity guideline (Support Care Cancer 2011): Europe PMC full-text XML
 *   (PMC3128700) fetched by another checker on 17 November, re-used; Tables 1, 2, 3 and 8 read from the XML.
 * - Jatoi and colleagues, the N05C4 sunscreen trial (Oncologist 2010): added in this pass; DOI resolved through Europe
 *   PMC and the abstract read. It is the trial behind MASCC's "sunscreen as single agent: not recommended".
 * - ESMO dermatological toxicities guideline (Ann Oncol 2021): still not readable. Another checker's request on
 *   17 November met the publisher's bot check and Europe PMC holds no abstract; it was not requested again.
 */
export const sunProtectionDuringAndAfterCancerTreatment = protocol({
  id: "sun-protection-during-and-after-cancer-treatment",
  name: "Sun protection during and after cancer treatment",
  aka: ["photosensitivity during chemotherapy", "sunscreen during cancer treatment", "sun protection after radiotherapy", "sun sensitivity on targeted therapy", "radiation recall sun protection"],
  domain: "supportive-care",
  tldr: "Some chemotherapy, many targeted and immunotherapy drugs, and radiotherapy make the skin burn more easily; skin treated with radiotherapy stays sensitive for many years. Keep to the shade at midday, wear a wide-brimmed hat and long sleeves, use sunscreen of at least SPF 30 with high UVA protection and reapply it, avoid sunbeds, and ask before putting anything on skin having radiotherapy.",
  simple: "Cancer treatment can make your skin burn quickly. Keep in the shade at midday, wear a hat and long sleeves, use sunscreen of at least SPF 30 and put more on often. Never use sunbeds. Take extra care to protect skin that has had radiotherapy from the sun, especially in the first year, and ask your team before using sunscreen on it during treatment.",
  summary: "None of the sources read is a graded guideline on sun protection during anticancer treatment (the ESMO 2021 skin toxicity guideline could not be read); the advice comes from national patient guidance and general sun-safety guidance. NCI's chemotherapy booklet (2024) lists sensitivity to the sun among the skin changes some types of chemotherapy cause, even in people with very dark skin, and advises avoiding direct sunlight (it says the summer sun tends to be strongest from 10 a.m. until 4 p.m.), sunscreen of SPF 15 or higher, lip balm of SPF 15 or higher, covering clothing and no tanning beds, and protecting skin previously treated with radiotherapy from the sun (radiation recall). NCI's radiotherapy booklet (2021) advises protecting the skin from the sun every day, a broad-brimmed hat and long sleeves, talking to the team about sunscreen (they may suggest SPF 30 or higher), no tanning beds, protection continuing after treatment ends, and checking with the team before using sunscreen or other products on the skin during treatment. Macmillan (2023) says many targeted and immunotherapy drugs make skin sun-sensitive, that sensitivity after some chemotherapy can sometimes last several years, and that radiotherapy skin stays sensitive for many years, with extra care especially in the first year; NCI says skin in the treatment area will always burn quickly. The NHS (2026) recommends shade from 11 a.m. to 3 p.m. in the UK from March to October, at least SPF 30 and at least 4-star UVA protection, enough sunscreen, and reapplication every 2 hours and after water or sweating. The MASCC EGFR inhibitor guideline (2011) includes sunscreen in its preventive rash regimen (level II, grade C), lists sunscreen alone as not recommended for preventing that rash, and recommends avoiding direct sunlight to prevent dry skin (level III, grade B). The sources differ on the SPF figure (15 in NCI's chemotherapy booklet, 30 in the others).",
  asOf: "2026-11-17",
  setting: {
    who: ["patient-or-carer", "nurse"],
    where: ["home", "radiotherapy-department", "outpatient-clinic"],
  },
  population: "Adults having chemotherapy, targeted therapy, immunotherapy or radiotherapy, and survivors with skin previously treated with radiotherapy. The sources read do not name the drugs that cause sun sensitivity and tell the reader to ask the team; this protocol does not list them. The NHS page is written for the UK.",
  trigger: "Starting a treatment the team says makes the skin sun-sensitive, any course of radiotherapy, or going into strong sun during or after treatment.",
  steps: [
    {
      action: "Ask the team whether your treatment makes your skin sensitive to the sun",
      why: "Some chemotherapy and many targeted and immunotherapy drugs can make the skin burn more easily than normal, and Macmillan advises asking the doctor or nurse whether special care is needed.",
      source: "macmillan-holiday",
      quote: "Many targeted therapy and immunotherapy drugs can make your skin sensitive to the sun. Your skin may burn more easily than normal. Ask your doctor or nurse whether you need to take special care to protect your skin.",
      grade: "Not graded (patient information)",
    },
    {
      action: "Stay in the shade when the sun is strongest, between 11 a.m. and 3 p.m. in the UK from March to October",
      why: "These are the hours when the sun is strongest in the UK. NCI, writing for the United States, says the summer sun tends to be strongest from 10 a.m. until 4 p.m.",
      source: "nhs-sun-safety",
      quote: "Spend time in the shade when the sun is strongest. In the UK, this is between 11am and 3pm from March to October.",
      grade: "Not graded (public health guidance)",
    },
    {
      action: "Cover up outdoors with a broad-brimmed hat, a long-sleeved shirt and long trousers, and cover a bald or thinning scalp",
      why: "The NHS says not to rely on sunscreen alone, and that for a head with thinning or no hair a wide-brimmed hat is better than sunscreen.",
      source: "nci-radiation-and-you",
      quote: "Wear a broad-brimmed hat, long-sleeved shirt, and long pants when you are outside.",
      grade: "Not graded (patient booklet)",
    },
    {
      action: "Use sunscreen of at least SPF 30 with at least 4-star UVA protection, use enough, apply it 30 minutes before going out and again just before if you will be out long enough to risk burning, and reapply every 2 hours and straight after water, towel drying or sweating",
      why: "The NHS says most people do not apply enough sunscreen, that a thin layer protects less, and that water, towelling, sweat and the sun take it off the skin.",
      source: "nhs-sun-safety",
      quote: "use at least factor 30 sunscreen – make sure to use enough and re-apply frequently",
      grade: "Not graded (public health guidance)",
    },
    {
      action: "During radiotherapy, check with the team before putting sunscreen, creams or any other product on the treated skin",
      why: "NCI says to use only the lotions and skin products the doctor or nurse suggests during radiotherapy, and lists sunscreen among the products to check first. It gives no reason.",
      source: "nci-radiation-and-you",
      quote: "Check with your doctor or nurse before using any of the following skin products:",
      grade: "Not graded (patient booklet)",
    },
    {
      action: "Take extra care to protect skin treated with radiotherapy from the sun after treatment ends, especially in the first year",
      why: "Macmillan says the treated skin stays sensitive for many years and is at higher risk of burning and of long-term sun damage, including skin cancers. NCI says it will always burn quickly.",
      source: "macmillan-holiday",
      quote: "The skin in the area treated by radiotherapy stays sensitive for many years. You need to take extra care to protect it from the sun, especially for the first year.",
      grade: "Not graded (patient information)",
    },
    {
      action: "If chemotherapy is given after radiotherapy, protect the previously treated skin from the sun and tell the doctor or nurse if you think you have radiation recall",
      why: "Some chemotherapy makes skin in the area that had radiotherapy turn red, and it may blister, peel or be very painful (radiation recall). NCI counts this among the major skin changes that need to be treated right away.",
      source: "nci-chemo-and-you",
      quote: "Protect the area of your skin that received radiation therapy from the sun.",
      grade: "Not graded (patient booklet)",
    },
    {
      action: "Do not use sunbeds",
      why: "NCI says tanning beds expose you to the same harmful effects as the sun. The NHS says sunbeds can be more dangerous than natural sunlight because they use a concentrated source of UV radiation.",
      source: "nci-radiation-and-you",
      quote: "Do not use tanning beds. Tanning beds expose you to the same harmful effects as the sun.",
      grade: "Not graded (patient booklet)",
    },
  ],
  bestInClass: {
    statement: "No graded guideline on sun protection during anticancer treatment was among the sources that could be read (the ESMO 2021 skin toxicity guideline could not be). The best available version combines the NHS sun-safety guidance (2026: shade at midday, covering clothing, at least SPF 30 and 4-star UVA, enough sunscreen and reapplication) with the cancer-specific points made by NCI (2021, 2024) and Macmillan (2023): ask whether the treatment makes the skin sun-sensitive (Macmillan), protect radiotherapy skin every day during treatment and afterwards (NCI; Macmillan says for many years, especially the first), check with the team before using products on skin under treatment (NCI), protect previously irradiated skin during chemotherapy (NCI), and avoid sunbeds (NCI, in both booklets). The sources disagree on the sunscreen figure: NCI's chemotherapy booklet says SPF 15 or higher; its radiotherapy booklet says the team may suggest 30 or higher; the NHS and Macmillan say at least 30.",
    sources: ["nhs-sun-safety", "nci-radiation-and-you", "nci-chemo-and-you", "macmillan-holiday"],
  },
  variants: [
    {
      name: "SPF 15 or higher (NCI chemotherapy booklet)",
      differs: "Gives SPF 15 or higher, or an ointment that blocks the sun's rays such as one with zinc oxide, a lip balm of SPF 15 or higher, and says to avoid direct sunlight, noting that the summer sun tends to be strongest from 10 a.m. until 4 p.m.",
      evidence: "Patient booklet, not graded: 'Use sunscreen lotion with an SPF (skin protection factor) of 15 or higher.' The NHS and Macmillan say at least 30, and NCI's own radiotherapy booklet says the team may suggest 30 or higher.",
      sources: ["nci-chemo-and-you"],
    },
    {
      name: "Sunscreen within the preventive regimen for EGFR inhibitor rash (MASCC)",
      differs: "Sunscreen is applied twice daily with hydrocortisone 1% cream and moisturiser as preventive treatment (Table 3 heads it weeks 1 to 6 and 8 of starting an EGFR inhibitor; the text says the first 6 weeks); sunscreen alone is listed as not recommended for preventing the rash. MASCC does not state an SPF.",
      evidence: "MASCC 2011 Table 3: topical regimen level II, grade C. Table 8: avoiding extreme temperatures and direct sunlight to prevent dry skin, level III, grade B. The trial MASCC cites for sunscreen alone (N05C4, 2010, abstract read) gave SPF 60 sunscreen or placebo twice a day for 28 days: physician-reported rash occurred in 38 patients (78%) on sunscreen and 39 (80%) on placebo (p = 1.00).",
      sources: ["mascc-egfri-2011", "jatoi-n05c4-2010"],
    },
    {
      name: "Avoiding chlorinated pools and hot tubs (Macmillan)",
      differs: "Adds that some people find chemotherapy makes their skin sensitive to chemicals such as chlorine and may need to avoid chlorinated pools, and that hot tubs and saunas are best avoided because germs grow faster in warm water.",
      evidence: "Patient information, not graded.",
      sources: ["macmillan-holiday"],
    },
  ],
  grades: [
    { claim: "All sun protection steps", grade: "Not graded: patient booklets and public health guidance, without a grading scheme", source: "nhs-sun-safety" },
    { claim: "Avoid extreme temperatures and direct sunlight to prevent dry skin on EGFR inhibitors", grade: "Level III, grade B (MASCC Table 8)", source: "mascc-egfri-2011" },
    { claim: "Chemotherapy can cause sun sensitivity even in very dark skin", grade: "Not graded (patient booklet)", source: "nci-chemo-and-you", quote: "This problem can happen even to people who have very dark skin color." },
    { claim: "Protection of radiotherapy skin continues after treatment ends", grade: "Not graded (patient booklet)", source: "nci-radiation-and-you", quote: "You will need to protect your skin from the sun even after radiation therapy is over." },
  ],
  sources: [
    {
      key: "nhs-sun-safety",
      label: "Sunscreen and sun safety",
      publisher: "NHS",
      year: 2026,
      url: "https://www.nhs.uk/live-well/seasonal-health/sunscreen-and-sun-safety/",
      gradingScheme: "Public health information page; not graded. Page last reviewed 24 March 2026.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "nci-radiation-and-you",
      label: "Radiation Therapy and You: Support for People with Cancer",
      publisher: "National Cancer Institute (US)",
      year: 2021,
      url: "https://www.cancer.gov/publications/patient-education/radiation-therapy-and-you.pdf",
      gradingScheme: "Patient booklet; recommendations are not graded. Printed as NIH Publication No. 21-7157, April 2021.",
      read: "full-text",
      accessed: "2026-11-17",
    },
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
      key: "macmillan-holiday",
      label: "Taking care on holiday (travel and cancer)",
      publisher: "Macmillan Cancer Support",
      year: 2023,
      url: "https://www.macmillan.org.uk/cancer-information-and-support/impacts-of-cancer/travel/taking-care-on-holiday",
      gradingScheme: "Patient information page; not graded. Reviewed 1 March 2023, next review due 1 March 2026; the page says it is currently being reviewed.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "mascc-egfri-2011",
      label: "Clinical practice guidelines for the prevention and treatment of EGFR inhibitor-associated dermatologic toxicities",
      publisher: "MASCC Skin Toxicity Study Group (Supportive Care in Cancer)",
      year: 2011,
      url: "https://doi.org/10.1007/s00520-011-1197-6",
      doi: "10.1007/s00520-011-1197-6",
      gradingScheme: "Levels of evidence I (meta-analyses of randomised trials or randomised trials with high power) to V (case reports and clinical examples); recommendation grades A to D, where D implies little or no evidence.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "jatoi-n05c4-2010",
      label: "Does sunscreen prevent epidermal growth factor receptor (EGFR) inhibitor-induced rash? Results of a placebo-controlled trial from the North Central Cancer Treatment Group (N05C4)",
      publisher: "The Oncologist",
      year: 2010,
      url: "https://doi.org/10.1634/theoncologist.2010-0082",
      doi: "10.1634/theoncologist.2010-0082",
      gradingScheme: "Randomised, double-blinded, placebo-controlled trial; not a guideline.",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "esmo-derm-2021",
      label: "Prevention and management of dermatological toxicities related to anticancer agents: ESMO Clinical Practice Guidelines",
      publisher: "ESMO (Annals of Oncology)",
      year: 2021,
      url: "https://doi.org/10.1016/j.annonc.2020.11.005",
      doi: "10.1016/j.annonc.2020.11.005",
      read: "not-reachable",
      accessed: "2026-11-17",
    },
  ],
  terms: ["sun-protection-after-skin-cancer", "radiation-dermatitis"],
  related: ["skin-and-nail-care-during-cancer-drug-treatment", "driving-flying-and-travel-during-cancer-treatment"],
  gaps: [
    "Every step is expert or public health advice and none is graded. The one randomised trial found through the sources (N05C4, 2010, read as an abstract) tested SPF 60 sunscreen against placebo for preventing EGFR inhibitor rash, not sunburn, and found no difference. No trial of sun protection advice against sunburn during anticancer treatment was found in the sources read.",
    "The sources disagree on the minimum SPF (15 or higher in NCI's 2024 chemotherapy booklet; 30 or higher, as something the team may suggest, in its 2021 radiotherapy booklet; at least 30 from the NHS and Macmillan) and give different hours (NCI says the summer sun tends to be strongest from 10 a.m. until 4 p.m.; the NHS and Macmillan say 11 a.m. to 3 p.m., the NHS for the UK from March to October). The NHS describes the UVA star rating as the one printed on UK sunscreens.",
    "No source read says which drugs cause sun sensitivity or gives a duration for any one drug. Macmillan says only that sensitivity after some chemotherapy can sometimes last for several years. For skin treated with radiotherapy Macmillan says many years, especially the first year, and NCI says the skin will always burn quickly. Each drug's own product information was not compiled here.",
    "The ESMO 2021 dermatological toxicity guideline could not be read. On 17 November 2026 the publisher again answered a script with a bot check and Europe PMC held no abstract or full text, so whether it grades any sun protection advice is not known here. Crossref lists no update or replacement for it.",
    "NCI's radiotherapy booklet is the April 2021 printing and Macmillan's page passed its review date of 1 March 2026 and says it is being reviewed; both were the current public versions on 17 November 2026.",
    "NCI says to check with the doctor or nurse before using sunscreen on the skin during radiotherapy and gives no reason; no source read says whether or when sunscreen may be used on the treated area during a course.",
    "How to balance sun avoidance with vitamin D during long treatment is not addressed by the cancer sources; the NHS page says only to aim for a balance, and gives no dose of vitamin D for adults.",
  ],
});
