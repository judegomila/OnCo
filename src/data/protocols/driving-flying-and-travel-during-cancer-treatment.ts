import { protocol } from "./helpers";

/*
 * Driving, flying and travel during cancer treatment: telling the licensing authority, driving on medicines that cause
 * drowsiness, fitness to fly, vaccines, carrying medicines and travel insurance. UK-centred, because the driving rules
 * read are the UK's.
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - GOV.UK, Cancer and driving (DVLA): full text.
 * - GOV.UK, Drugs and driving: the law: full text.
 * - Macmillan Cancer Support, travel and cancer pages (Can you fly with cancer?, Cancer and travel vaccinations, Cancer
 *   and buying travel insurance, Taking medication abroad, Taking care on holiday), all reviewed 1 March 2023 and marked
 *   as under review: full text. Side effects of chemotherapy (reviewed 2018): full text.
 * - CDC Yellow Book, immunocompromised travellers: not reachable (HTTP 403).
 */
export const drivingFlyingAndTravelDuringCancerTreatment = protocol({
  id: "driving-flying-and-travel-during-cancer-treatment",
  name: "Driving, flying and travel during cancer treatment",
  aka: ["driving and cancer", "DVLA and cancer", "flying with cancer", "travel insurance and cancer", "travel vaccinations during chemotherapy", "taking cancer medicines abroad"],
  domain: "supportive-care",
  tldr: "In Great Britain most people with cancer need not tell the DVLA, unless the cancer affects the brain or nerves, a doctor says they may be unfit to drive, or medicines affect driving. Before travelling abroad, ask the cancer team whether it is safe, avoid live vaccines unless the team agrees, carry medicines and a doctor's letter in hand luggage, and declare the cancer to the travel insurer.",
  simple: "Ask your team before you drive, fly or travel abroad. Do not drive if you feel sleepy from treatment or medicines. Tell the DVLA if your doctor says your cancer or treatment affects your driving. Do not have live vaccines during treatment unless your team says it is safe. Keep your medicines and a letter from your doctor in your hand luggage, and tell your travel insurer about your cancer.",
  summary: "The UK driving rules are law, not clinical guidance. The DVLA requires a car or motorcycle driver with cancer to tell it only if they develop problems with the brain or nervous system, a doctor says they might not be fit to drive, they are restricted to certain or adapted vehicles, or medication side effects could affect driving; bus, coach and lorry drivers must tell it if the condition will affect driving. Failing to declare a condition that affects driving carries a fine of up to £1,000. Under the drug-driving law in England, Scotland and Wales, prescribed opioids and benzodiazepines may be taken while driving only if they were prescribed, taken as advised, and are not impairing. Macmillan's travel guidance (2023, under review) says to ask the cancer team before flying, names reasons people may be advised not to fly (low platelets, raised pressure from a brain tumour, recent brain, chest, bowel or eye surgery), notes the clot risk of long flights, says live vaccines must not be given during or recently after chemotherapy or radiotherapy and some targeted or immunotherapy drugs, advises seeing a travel health professional at least 8 weeks before travel, carrying medicines and a doctor's letter in hand luggage in original packaging, and always declaring pre-existing conditions to the insurer. None of this is graded, and the CDC Yellow Book chapter on immunocompromised travellers could not be read.",
  asOf: "2026-11-11",
  setting: {
    who: ["patient-or-carer", "doctor", "nurse", "pharmacist"],
    where: ["home", "outpatient-clinic"],
  },
  population: "Adults with cancer, during or after treatment, who drive or plan to travel. The driving rules are those of Great Britain (DVLA) and, for drug-driving, England, Scotland and Wales; other countries have their own rules. People who have had a stem cell transplant, leukaemia, or thymus cancer or thymectomy have specific vaccine restrictions named below.",
  trigger: "A person with cancer wants to drive, or plans a flight or a trip abroad.",
  steps: [
    {
      action: "Ask the cancer team whether the cancer or the treatment affects driving, and tell the DVLA if it does",
      why: "A driver must declare a condition that affects driving, and not doing so can bring a fine or prosecution after an accident.",
      source: "dvla-cancer-driving",
      quote: "You must tell DVLA if your condition will affect your driving.",
      grade: "Legal requirement (Great Britain)",
    },
    {
      action: "Do not drive if a treatment or medicine makes you sleepy, and ask the doctor or pharmacist before driving on opioids or benzodiazepines",
      why: "Driving while impaired by a prescribed medicine is an offence, even when the medicine was correctly prescribed.",
      source: "gov-drug-driving",
      quote: "It’s illegal in England, Scotland and Wales to drive with legal drugs in your body if it impairs your driving.",
      grade: "Legal requirement (England, Scotland and Wales)",
    },
    {
      action: "Ask the cancer doctor or specialist nurse before booking a flight",
      why: "Low platelets, raised pressure in the brain and recent surgery to the brain, chest, bowel or eye can make flying unsafe.",
      source: "macmillan-flying",
      quote: "Always get advice from your cancer doctor or specialist nurse if you are thinking of flying anywhere.",
      grade: "Not graded (patient information)",
    },
    {
      action: "On long journeys, ask the team about your clot risk and how to reduce it",
      why: "Sitting still for a long time and cancer treatment both raise the risk of a blood clot.",
      source: "macmillan-flying",
      quote: "Flying can increase the risk of developing a blood clot.",
      grade: "Not graded (patient information)",
    },
    {
      action: "See a travel health professional at least 8 weeks before travel, and do not have live vaccines during or soon after chemotherapy, radiotherapy, some targeted or immunotherapy drugs, high-dose steroids or a transplant unless the cancer doctor says it is safe",
      why: "A live vaccine can cause a serious infection when the immune system is weak, and some vaccines need several doses over weeks.",
      source: "macmillan-vaccinations",
      quote: "If you have a weakened immune system, live vaccines may cause a serious or life-threatening infection.",
      grade: "Not graded (patient information, drawing on the UK Green Book)",
    },
    {
      action: "Carry medicines in their original packaging in hand luggage, with a doctor's letter and a list of medicines by generic name, and enough supply for delays; check controlled-drug rules for opioids",
      why: "Customs and security may check medicines, some countries restrict them, and luggage can be lost.",
      source: "macmillan-medication-abroad",
      quote: "For security and customs checks, it is best to carry all medicines and letters from your doctor or other paperwork in your hand luggage.",
      grade: "Not graded (patient information)",
    },
    {
      action: "Declare the cancer and any other conditions to the travel insurer, and tell them of changes before travel",
      why: "An insurer can refuse any claim, even an unrelated one, if a condition was not declared.",
      source: "macmillan-travel-insurance",
      quote: "You should always tell your insurer about pre-existing medical conditions.",
      grade: "Not graded (patient information)",
    },
    {
      action: "If treatment raises the risk of infection, ask the team for advice before the trip and take care with food, water and hand washing abroad",
      why: "Infections from food and water can be more serious when the immune system is weak.",
      source: "macmillan-holiday",
      quote: "If you are at risk of infection because of cancer treatment , you need to be extra careful about what you eat and drink.",
      grade: "Not graded (patient information)",
    },
  ],
  bestInClass: {
    statement: "Driving is governed by law rather than clinical guidance: in Great Britain the DVLA's cancer rules and the drug-driving law are the standard, and a driver follows them. For travel, no graded guideline was read; the best available version is the convergent UK patient guidance from Macmillan (2023): clearance from the cancer team before flying, no live vaccines during or soon after immunosuppressive treatment unless the cancer doctor agrees, a travel health appointment at least 8 weeks ahead, medicines in original packaging in hand luggage with a doctor's letter, and full declaration to the travel insurer.",
    sources: ["dvla-cancer-driving", "gov-drug-driving", "macmillan-flying", "macmillan-vaccinations", "macmillan-medication-abroad", "macmillan-travel-insurance"],
  },
  variants: [
    {
      name: "Lifelong caution on live vaccines after leukaemia or HIV-related cancer, and no yellow fever vaccine after thymus cancer or thymectomy (Macmillan)",
      differs: "Some people have to avoid live vaccines for life, and yellow fever vaccine is never given after thymus cancer or removal of the thymus.",
      evidence: "Patient information drawing on the UK Green Book, not graded.",
      sources: ["macmillan-vaccinations"],
    },
    {
      name: "Bus, coach and lorry licences",
      differs: "Drivers with these licences must tell the DVLA if the condition will affect driving, using form C1V rather than C1.",
      evidence: "Legal requirement (DVLA).",
      sources: ["dvla-cancer-driving"],
    },
    {
      name: "Advice not to drive when sleepy (Macmillan)",
      differs: "Puts the rule simply: if sleepy from chemotherapy or sleep problems, do not drive or operate machinery.",
      evidence: "Patient information, not graded: 'If you feel sleepy, do not drive or operate machinery.'",
      sources: ["macmillan-chemo-side-effects"],
    },
  ],
  grades: [
    { claim: "When a car or motorcycle driver with cancer must tell the DVLA", grade: "Legal requirement (Great Britain)", source: "dvla-cancer-driving", quote: "You do not need to tell DVLA if you have cancer, unless:" },
    { claim: "Penalty for not declaring a condition that affects driving", grade: "Legal requirement (Great Britain)", source: "dvla-cancer-driving", quote: "You can be fined up to £1,000 if you do not tell DVLA about a medical condition that affects your driving." },
    { claim: "Prescribed opioids and benzodiazepines may be taken when driving only if prescribed, taken as advised and not impairing", grade: "Legal requirement (England, Scotland and Wales)", source: "gov-drug-driving", quote: "you’ve been prescribed them and followed advice on how to take them by a healthcare professional" },
    { claim: "Travel advice", grade: "Not graded: patient information pages without a grading scheme", source: "macmillan-flying" },
  ],
  sources: [
    {
      key: "dvla-cancer-driving",
      label: "Cancer and driving",
      publisher: "GOV.UK (Driver and Vehicle Licensing Agency)",
      year: 2026,
      url: "https://www.gov.uk/cancer-and-driving",
      gradingScheme: "Legal requirements; not a graded guideline. Undated page, read as current on the access date.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "gov-drug-driving",
      label: "Drugs and driving: the law",
      publisher: "GOV.UK",
      year: 2026,
      url: "https://www.gov.uk/drug-driving-law",
      gradingScheme: "Legal requirements; not a graded guideline. Undated page, read as current on the access date.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "macmillan-flying",
      label: "Can you fly with cancer?",
      publisher: "Macmillan Cancer Support",
      year: 2023,
      url: "https://www.macmillan.org.uk/cancer-information-and-support/impacts-of-cancer/travel/cancer-and-flying",
      gradingScheme: "Patient information page; not graded. Reviewed 1 March 2023, page marked as under review.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "macmillan-vaccinations",
      label: "Cancer and travel vaccinations",
      publisher: "Macmillan Cancer Support",
      year: 2023,
      url: "https://www.macmillan.org.uk/cancer-information-and-support/impacts-of-cancer/travel/getting-vaccinations",
      gradingScheme: "Patient information page; not graded. Reviewed 1 March 2023, page marked as under review.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "macmillan-medication-abroad",
      label: "Taking medication abroad",
      publisher: "Macmillan Cancer Support",
      year: 2023,
      url: "https://www.macmillan.org.uk/cancer-information-and-support/impacts-of-cancer/travel/taking-medication-abroad",
      gradingScheme: "Patient information page; not graded. Reviewed 1 March 2023, page marked as under review.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "macmillan-travel-insurance",
      label: "Cancer and buying travel insurance",
      publisher: "Macmillan Cancer Support",
      year: 2023,
      url: "https://www.macmillan.org.uk/cancer-information-and-support/impacts-of-cancer/travel/buying-travel-insurance",
      gradingScheme: "Patient information page; not graded. Reviewed 1 March 2023, page marked as under review.",
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
      key: "macmillan-chemo-side-effects",
      label: "Side effects of chemotherapy",
      publisher: "Macmillan Cancer Support",
      year: 2018,
      url: "https://www.macmillan.org.uk/cancer-information-and-support/treatment/types-of-treatment/chemotherapy/side-effects-of-chemotherapy",
      gradingScheme: "Patient information page; not graded. Reviewed September 2018, page marked as under review.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "cdc-yellow-book-immunocompromised",
      label: "CDC Yellow Book: immunocompromised travelers",
      publisher: "CDC",
      year: 2026,
      url: "https://www.cdc.gov/yellow-book/hcp/travelers-with-additional-considerations/immunocompromised-travelers.html",
      read: "not-reachable",
      accessed: "2026-11-11",
    },
  ],
  related: ["sun-protection-during-and-after-cancer-treatment"],
  gaps: [
    "The driving rules read are those of Great Britain; Northern Ireland and other countries have their own licensing rules, which were not read.",
    "The DVLA's medical standards for professionals (Assessing fitness to drive), which set specific rules for brain tumours and other cancers affecting the nervous system, were not read.",
    "The CDC Yellow Book chapter on immunocompromised travellers returned HTTP 403 and could not be read; the UK Green Book itself was not read, only Macmillan's account of it.",
    "How long to wait after chemotherapy or other treatment before a live vaccine is safe varies by treatment and is not given in the sources read; the cancer doctor decides.",
    "No source read gives a graded recommendation on preventing clots during travel for people with cancer.",
    "All Macmillan travel pages were last reviewed in March 2023 and are marked as under review.",
  ],
});
