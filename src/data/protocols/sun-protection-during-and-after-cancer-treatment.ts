import { protocol } from "./helpers";

/*
 * Sun protection during and after cancer treatment: drugs that make the skin burn more easily, skin treated with
 * radiotherapy, and radiation recall.
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - NCI, Chemotherapy and You (December 2023): full text; the skin and nail changes section.
 * - NCI, Radiation Therapy and You (PDF dated June 2021): full text; the skin changes section.
 * - NHS, Sunscreen and sun safety (reviewed 24 March 2026): full text.
 * - Macmillan Cancer Support, Taking care on holiday (reviewed 1 March 2023, marked as under review) and Side effects of
 *   chemotherapy (reviewed 30 September 2018, marked as under review): full text.
 * - MASCC EGFR inhibitor dermatologic toxicity guideline (Support Care Cancer 2011): full text, Europe PMC XML.
 * - ESMO dermatological toxicities guideline (Ann Oncol 2021): not reachable (bot check).
 */
export const sunProtectionDuringAndAfterCancerTreatment = protocol({
  id: "sun-protection-during-and-after-cancer-treatment",
  name: "Sun protection during and after cancer treatment",
  aka: ["photosensitivity during chemotherapy", "sunscreen during cancer treatment", "sun protection after radiotherapy", "sun sensitivity on targeted therapy", "radiation recall sun protection"],
  domain: "supportive-care",
  tldr: "Some chemotherapy, many targeted and immunotherapy drugs, and radiotherapy make the skin burn more easily; treated skin stays sensitive for years. Stay in the shade at midday, cover up with a wide-brimmed hat and long sleeves, use sunscreen of at least SPF 30 with high UVA protection and reapply it, avoid sunbeds, and ask before putting anything on skin being treated with radiotherapy.",
  simple: "Cancer treatment can make your skin burn quickly. Keep in the shade at midday, wear a hat and long sleeves, use sunscreen of at least SPF 30 and put more on often. Never use sunbeds. Keep skin that has had radiotherapy out of the sun, especially in the first year, and ask your team before using sunscreen on it during treatment.",
  summary: "No graded guideline sets out sun protection during anticancer treatment; the advice comes from national patient guidance and general sun-safety guidance. NCI's chemotherapy booklet (2023) says chemotherapy can cause sensitivity to the sun even in people with very dark skin, and advises avoiding direct sun from 10 a.m. to 4 p.m., sunscreen of SPF 15 or higher, lip balm with SPF, covering clothing and no tanning beds, and protecting skin previously treated with radiotherapy from the sun (radiation recall). NCI's radiotherapy booklet (2021) advises daily protection of the treated area, a broad-brimmed hat and long sleeves, sunscreen that the team may suggest at SPF 30 or higher, no tanning beds, protection continuing after treatment ends, and checking with the team before using sunscreen or other products on the treated skin. Macmillan (2023) says many targeted and immunotherapy drugs make skin sun-sensitive and that radiotherapy skin stays sensitive for many years, especially in the first year. The NHS (2026) recommends shade from 11 a.m. to 3 p.m. in the UK from March to October, at least SPF 30 and at least 4-star UVA protection, applied generously and reapplied. The MASCC EGFR inhibitor guideline (2011) includes sunscreen in its preventive rash regimen and recommends avoiding direct sun to prevent dry skin (level III, grade B). The sources differ on the SPF figure (15 in NCI's chemotherapy booklet, 30 in the others).",
  asOf: "2026-11-11",
  setting: {
    who: ["patient-or-carer", "nurse"],
    where: ["home", "radiotherapy-department", "outpatient-clinic"],
  },
  population: "Adults having chemotherapy, targeted therapy, immunotherapy or radiotherapy, and survivors with skin previously treated with radiotherapy. Which drugs cause photosensitivity is set out in each drug's label; this protocol does not list them.",
  trigger: "Starting a treatment the team says makes the skin sun-sensitive, any course of radiotherapy, or going into strong sun during or after treatment.",
  steps: [
    {
      action: "Ask the team whether your treatment makes your skin sensitive to the sun",
      why: "Some chemotherapy and many targeted and immunotherapy drugs make the skin burn faster, and the team knows which ones.",
      source: "macmillan-holiday",
      quote: "Many targeted therapy and immunotherapy drugs can make your skin sensitive to the sun. Your skin may burn more easily than normal. Ask your doctor or nurse whether you need to take special care to protect your skin.",
      grade: "Not graded (patient information)",
    },
    {
      action: "Stay in the shade when the sun is strongest, between 11 a.m. and 3 p.m. in the UK from March to October",
      why: "Most of the burning ultraviolet light reaches the ground in the middle of the day.",
      source: "nhs-sun-safety",
      quote: "Spend time in the shade when the sun is strongest. In the UK, this is between 11am and 3pm from March to October.",
      grade: "Not graded (public health guidance)",
    },
    {
      action: "Cover up outdoors with a broad-brimmed hat, a long-sleeved shirt and long trousers, and cover a bald or thinning scalp",
      why: "Clothing protects more reliably than sunscreen, which is often applied too thinly.",
      source: "nci-radiation-and-you",
      quote: "Wear a broad-brimmed hat, long-sleeved shirt, and long pants when you are outside.",
      grade: "Not graded (patient booklet)",
    },
    {
      action: "Use sunscreen of at least SPF 30 with at least 4-star UVA protection, apply plenty 30 minutes before going out and again just before, and reapply every 2 hours and after swimming or sweating",
      why: "Most people put on too little sunscreen, and it wears off with water, sweat and time.",
      source: "nhs-sun-safety",
      quote: "use at least factor 30 sunscreen – make sure to use enough and re-apply frequently",
      grade: "Not graded (public health guidance)",
    },
    {
      action: "During radiotherapy, check with the team before putting sunscreen, creams or any other product on the treated skin",
      why: "Some products on the treated area can increase the skin reaction or interfere with treatment.",
      source: "nci-radiation-and-you",
      quote: "Check with your doctor or nurse before using any of the following skin products:",
      grade: "Not graded (patient booklet)",
    },
    {
      action: "Keep skin treated with radiotherapy out of the sun after treatment ends, with extra care in the first year",
      why: "Treated skin stays sensitive for years and has a higher risk of burning and of later skin cancer.",
      source: "macmillan-holiday",
      quote: "The skin in the area treated by radiotherapy stays sensitive for many years. You need to take extra care to protect it from the sun, especially for the first year.",
      grade: "Not graded (patient information)",
    },
    {
      action: "If chemotherapy is given after radiotherapy, protect the previously treated skin from the sun and tell the team if it turns red or sore",
      why: "Some drugs can bring back a skin reaction in an area treated before (radiation recall), and sun makes it worse.",
      source: "nci-chemo-and-you",
      quote: "Protect the area of your skin that received radiation therapy from the sun.",
      grade: "Not graded (patient booklet)",
    },
    {
      action: "Do not use sunbeds",
      why: "Sunbeds give the same harmful ultraviolet light as the sun.",
      source: "nci-radiation-and-you",
      quote: "Do not use tanning beds. Tanning beds expose you to the same harmful effects as the sun.",
      grade: "Not graded (patient booklet)",
    },
  ],
  bestInClass: {
    statement: "No graded guideline exists for sun protection during anticancer treatment. The best available version combines the NHS sun-safety guidance (2026: shade at midday, covering clothing, at least SPF 30 and 4-star UVA, generous application and reapplication) with the cancer-specific points that NCI (2021, 2023) and Macmillan (2023) agree on: ask whether the treatment is photosensitising, protect radiotherapy skin daily during and for years after treatment, check with the team before using products on skin under treatment, protect previously irradiated skin during chemotherapy, and avoid sunbeds. The sources disagree on the sunscreen figure: NCI's chemotherapy booklet says SPF 15 or higher; its radiotherapy booklet, the NHS and Macmillan say 30 or higher.",
    sources: ["nhs-sun-safety", "nci-radiation-and-you", "nci-chemo-and-you", "macmillan-holiday"],
  },
  variants: [
    {
      name: "SPF 15 or higher (NCI chemotherapy booklet)",
      differs: "Gives SPF 15 or higher, or a zinc oxide sunblock, and avoids direct sun from 10 a.m. to 4 p.m.",
      evidence: "Patient booklet, not graded: 'Use sunscreen lotion with an SPF (skin protection factor) of 15 or higher.' The NHS, Macmillan and NCI's own radiotherapy booklet give 30.",
      sources: ["nci-chemo-and-you"],
    },
    {
      name: "Sunscreen within the preventive regimen for EGFR inhibitor rash (MASCC)",
      differs: "Sunscreen is applied twice daily with hydrocortisone 1% and moisturiser as part of preventive treatment in the first 6 weeks of an EGFR inhibitor; sunscreen alone is listed as not recommended for preventing the rash.",
      evidence: "MASCC 2011 Table 3: topical regimen level II, grade C; avoiding direct sun to prevent dry skin level III, grade B.",
      sources: ["mascc-egfri-2011"],
    },
    {
      name: "Avoiding chlorinated pools and hot tubs (Macmillan)",
      differs: "Adds that some people's skin becomes sensitive to chlorine during chemotherapy and that hot tubs and saunas are best avoided.",
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
      gradingScheme: "Public health information page; not graded. Reviewed 24 March 2026.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "nci-radiation-and-you",
      label: "Radiation Therapy and You: Support for People with Cancer",
      publisher: "National Cancer Institute (US)",
      year: 2021,
      url: "https://www.cancer.gov/publications/patient-education/radiation-therapy-and-you.pdf",
      gradingScheme: "Patient booklet; recommendations are not graded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "nci-chemo-and-you",
      label: "Chemotherapy and You: Support for People with Cancer",
      publisher: "National Cancer Institute (US)",
      year: 2023,
      url: "https://www.cancer.gov/publications/patient-education/chemotherapy-and-you.pdf",
      gradingScheme: "Patient booklet; recommendations are not graded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "macmillan-holiday",
      label: "Taking care on holiday (travel and cancer)",
      publisher: "Macmillan Cancer Support",
      year: 2023,
      url: "https://www.macmillan.org.uk/cancer-information-and-support/impacts-of-cancer/travel/taking-care-on-holiday",
      gradingScheme: "Patient information page; not graded. Reviewed 1 March 2023, page marked as under review.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "mascc-egfri-2011",
      label: "Clinical practice guidelines for the prevention and treatment of EGFR inhibitor-associated dermatologic toxicities",
      publisher: "MASCC Skin Toxicity Study Group (Supportive Care in Cancer)",
      year: 2011,
      url: "https://doi.org/10.1007/s00520-011-1197-6",
      doi: "10.1007/s00520-011-1197-6",
      gradingScheme: "Levels of evidence I to V and grades A to D.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "esmo-derm-2021",
      label: "Prevention and management of dermatological toxicities related to anticancer agents: ESMO Clinical Practice Guidelines",
      publisher: "ESMO (Annals of Oncology)",
      year: 2021,
      url: "https://doi.org/10.1016/j.annonc.2020.11.005",
      doi: "10.1016/j.annonc.2020.11.005",
      read: "not-reachable",
      accessed: "2026-11-11",
    },
  ],
  terms: ["sun-protection-after-skin-cancer", "radiation-dermatitis"],
  related: ["skin-and-nail-care-during-cancer-drug-treatment", "driving-flying-and-travel-during-cancer-treatment"],
  gaps: [
    "No trial has tested sun protection advice during anticancer treatment; every step is expert or public health advice, and none is graded.",
    "The sources disagree on the minimum SPF (15 in NCI's 2023 chemotherapy booklet, 30 in its 2021 radiotherapy booklet, the NHS and Macmillan) and give different hours (10 a.m. to 4 p.m. for NCI, 11 a.m. to 3 p.m. for the NHS in the UK).",
    "Which drugs are photosensitising, and how long the sensitivity lasts after the last dose, is in each drug's label and was not compiled here.",
    "The ESMO 2021 dermatological toxicity guideline could not be read (bot check).",
    "How to balance sun avoidance with vitamin D during long treatment is not addressed by the cancer sources; the NHS page mentions the balance in general terms only.",
  ],
});
