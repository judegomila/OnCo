import { protocol } from "./helpers";

/*
 * Driving, flying and travel during cancer treatment: telling the licensing authority, driving on medicines that cause
 * drowsiness, fitness to fly, vaccines, carrying medicines and travel insurance. UK-centred, because the driving rules
 * read are the UK's.
 *
 * What was read, and how (first on 11 November 2026; every source fetched again raw with curl on 17 November 2026 for
 * a second accuracy pass, tags stripped by script, every quote checked verbatim by script):
 * - GOV.UK, Cancer and driving (DVLA): full text.
 * - GOV.UK, Drugs and driving: the law: full text.
 * - GOV.UK, Medical conditions, disabilities and driving: full text (added on 17 November 2026 for the Northern
 *   Ireland sentence, which the cancer page does not carry).
 * - Macmillan Cancer Support, travel and cancer pages (Can you fly with cancer?, Cancer and travel vaccinations, Cancer
 *   and buying travel insurance, Taking medication abroad, Taking care while you are on holiday), all reviewed 1 March
 *   2023, next review due 1 March 2026 and marked as under review: full text. Side effects of chemotherapy (reviewed
 *   30 September 2018): full text.
 * - CDC Yellow Book (2026 edition), Immunocompromised Travelers: cdc.gov still returns HTTP 403 to a script; the page
 *   was read in full on 17 November 2026 from the Internet Archive capture of 4 October 2026. Its tables were read as
 *   text; nothing is quoted from them.
 */
export const drivingFlyingAndTravelDuringCancerTreatment = protocol({
  id: "driving-flying-and-travel-during-cancer-treatment",
  name: "Driving, flying and travel during cancer treatment",
  aka: ["driving and cancer", "DVLA and cancer", "flying with cancer", "travel insurance and cancer", "travel vaccinations during chemotherapy", "taking cancer medicines abroad"],
  domain: "supportive-care",
  tldr: "In Great Britain a car or motorcycle driver with cancer need not tell the DVLA unless it affects the brain or nerves, a doctor says they may be unfit to drive, they need adapted vehicles, or medicine side effects may affect driving. Before travel, ask the cancer team, avoid live vaccines unless the cancer doctor agrees, carry medicines and a doctor's letter in hand luggage, and tell the insurer.",
  simple: "Ask your team before you drive, fly or travel abroad. Do not drive if you feel sleepy from treatment or medicines. Tell the DVLA if your doctor says your cancer or treatment affects your driving. Do not have live vaccines during treatment unless your cancer doctor says it is safe. Keep your medicines and a letter from your doctor in your hand luggage, and tell your travel insurer about your cancer.",
  summary: "The UK driving rules are law, not clinical guidance. The DVLA requires a car or motorcycle driver with cancer to tell it only if they develop problems with the brain or nervous system, a doctor says they might not be fit to drive, they are restricted to certain or adapted vehicles, or medication side effects could affect driving; bus, coach and lorry drivers must tell it if the condition will affect driving. Failing to declare a condition that affects driving carries a fine of up to £1,000. In Northern Ireland a driver contacts the Driver and Vehicle Agency instead. Under the drug-driving law in England, Scotland and Wales it is illegal to drive if a legal drug impairs driving; for the medicines the law lists, which include morphine and other opioids, methadone, six named benzodiazepines and amphetamine, a person may drive only if the medicine was prescribed, taken as advised, and is not making them unfit to drive. Macmillan's travel guidance (2023, under review) says to ask the cancer team before flying, names reasons people may be advised not to fly (breathlessness, anaemia, low platelets, a risk of raised pressure from a brain tumour, recent brain, chest, bowel or eye surgery, ear or sinus problems), notes the clot risk of long flights, says live vaccines must not be given during or recently after chemotherapy or radiotherapy, after a transplant, on high-dose steroids, or on some targeted or immunotherapy drugs or within a year of them, advises speaking to the GP, practice nurse or a travel health professional, if possible at least 8 weeks before travel, carrying medicines and a doctor's letter in hand luggage in original packaging, and always declaring pre-existing conditions to the insurer. Macmillan gives no fixed wait before a live vaccine after treatment; the CDC Yellow Book (2026 edition, United States) gives 3 months after chemotherapy or radiotherapy. None of this is graded.",
  asOf: "2026-11-17",
  setting: {
    who: ["patient-or-carer", "doctor", "nurse", "pharmacist"],
    where: ["home", "outpatient-clinic"],
  },
  population: "Adults with cancer, during or after treatment, who drive or plan to travel. The driving rules are those of Great Britain (DVLA) and, for drug-driving, England, Scotland and Wales; Northern Ireland and other countries have their own rules. People who have had an organ, stem cell or bone marrow transplant, lymphoma, leukaemia, an HIV-related cancer, or thymus cancer or removal of the thymus have specific vaccine restrictions named below.",
  trigger: "A person with cancer wants to drive, or plans a flight or a trip abroad.",
  steps: [
    {
      action: "Ask your doctor whether the cancer or the treatment affects driving, and tell the DVLA if it does",
      why: "A driver must declare a condition that affects driving; not doing so can bring a fine, and prosecution if it leads to an accident.",
      source: "dvla-cancer-driving",
      quote: "You must tell DVLA if your condition will affect your driving.",
      grade: "Legal requirement (Great Britain)",
    },
    {
      action: "Do not drive if a medicine impairs your driving, and talk to your doctor about driving if you are prescribed morphine or another opioid, or one of the benzodiazepines the law lists",
      why: "Driving while impaired by a legal medicine is an offence in England, Scotland and Wales, even when the medicine was prescribed.",
      source: "gov-drug-driving",
      quote: "It’s illegal in England, Scotland and Wales to drive with legal drugs in your body if it impairs your driving.",
      grade: "Legal requirement (England, Scotland and Wales)",
    },
    {
      action: "Ask the cancer doctor or specialist nurse before flying anywhere",
      why: "People may be advised not to fly if they are breathless or anaemic, have low platelets, are at risk of raised pressure in the brain from a brain tumour, have recently had surgery to the brain, chest, bowel or eye, or have ear or sinus problems.",
      source: "macmillan-flying",
      quote: "Always get advice from your cancer doctor or specialist nurse if you are thinking of flying anywhere.",
      grade: "Not graded (patient information)",
    },
    {
      action: "Before a long flight or journey, ask your doctor about your risk of a blood clot",
      why: "Flying can raise the risk of a blood clot, for example on trips with long periods of sitting still, and cancer and some treatments can raise it too.",
      source: "macmillan-flying",
      quote: "Flying can increase the risk of developing a blood clot.",
      grade: "Not graded (patient information)",
    },
    {
      action: "Speak to the GP, practice nurse or a travel health professional, if possible at least 8 weeks before travel; do not have live vaccines during or recently after chemotherapy or radiotherapy, after a transplant, on high-dose steroids or immunosuppressive medicines, or on some targeted or immunotherapy drugs or within a year of them; ask the cancer doctor when a live vaccine may be safe",
      why: "A live vaccine may cause a serious or life-threatening infection when the immune system is weak, and some vaccines need several doses over weeks or months.",
      source: "macmillan-vaccinations",
      quote: "If you have a weakened immune system, live vaccines may cause a serious or life-threatening infection.",
      grade: "Not graded (patient information; the UK Green Book is among the references the page lists)",
    },
    {
      action: "Carry medicines in their original packaging in hand luggage, with a doctor's letter and a list of medicines by generic name, and enough supply for delays; check controlled-drug rules for opioids",
      why: "Medicines go through security and customs checks, some countries restrict them, and a supply kept in one bag can go missing.",
      source: "macmillan-medication-abroad",
      quote: "For security and customs checks, it is best to carry all medicines and letters from your doctor or other paperwork in your hand luggage.",
      grade: "Not graded (patient information)",
    },
    {
      action: "Tell the travel insurer about the cancer and any other pre-existing conditions, and about any change in health or medicines before travel",
      why: "An insurer could refuse to pay a claim or cancel the policy, even where the claim is unrelated, if a condition was not declared.",
      source: "macmillan-travel-insurance",
      quote: "You should always tell your insurer about pre-existing medical conditions.",
      grade: "Not graded (patient information)",
    },
    {
      action: "If treatment raises the risk of infection, ask the cancer doctor or specialist nurse for advice before the trip and take extra care with food, water and hand washing abroad",
      why: "Infections can be more serious and harder to treat when the immune system is weak, and many are spread by food and water.",
      source: "macmillan-holiday",
      quote: "Infections can be more serious and difficult to treat if your immune system is weak.",
      grade: "Not graded (patient information)",
    },
  ],
  bestInClass: {
    statement: "Driving is governed by law rather than clinical guidance: in Great Britain the DVLA's cancer rules and the drug-driving law are the standard, and a driver follows them. For travel, no graded guideline was read; the best available version is the convergent UK patient guidance from Macmillan (2023): advice from the cancer doctor or specialist nurse before flying, no live vaccines during or recently after immunosuppressive treatment until the cancer doctor says it is safe, a travel health conversation if possible at least 8 weeks ahead, medicines in original packaging in hand luggage with a doctor's letter, and full declaration to the travel insurer. The CDC Yellow Book (2026 edition), a United States reference for health professionals, adds waiting periods before a live vaccine that Macmillan does not give.",
    sources: ["dvla-cancer-driving", "gov-drug-driving", "macmillan-flying", "macmillan-vaccinations", "macmillan-medication-abroad", "macmillan-travel-insurance", "cdc-yellow-book-immunocompromised"],
  },
  variants: [
    {
      name: "Possible lifelong avoidance of live vaccines after lymphoma, leukaemia or an HIV-related cancer, and no yellow fever vaccine after thymus cancer or removal of the thymus (Macmillan)",
      differs: "Macmillan says some people have to avoid live vaccines for the rest of their lives, and that people who have or have had lymphoma, leukaemia or an HIV-related cancer should always ask their cancer doctor. It says the yellow fever vaccine must never be given to someone with thymus gland cancer or whose thymus has been removed for any reason.",
      evidence: "Patient information, not graded; the UK Green Book is among the references the page lists.",
      sources: ["macmillan-vaccinations"],
    },
    {
      name: "Stated waiting periods before a live vaccine (CDC Yellow Book, United States)",
      differs: "Where Macmillan says the wait varies and the cancer doctor advises, the CDC chapter for health professionals states waiting periods after stopping treatment: 3 months for cancer chemotherapy, radiation therapy and highly immunosuppressive medicines; at least 6 months for lymphocyte-depleting agents such as alemtuzumab and rituximab, noting that IDSA guidelines suggest at least 1 year; and 1 month for immunosuppressive corticosteroid regimens. It says the wait is not uniform and depends on the therapy. It also says yellow fever vaccine is contraindicated in severe immunosuppression and in people with a history of a thymus disorder such as thymoma, whether or not the thymus has been removed.",
      evidence: "A travel medicine reference for United States health professionals, not graded; read from an Internet Archive capture.",
      sources: ["cdc-yellow-book-immunocompromised"],
    },
    {
      name: "Bus, coach and lorry licences",
      differs: "Drivers with these licences must tell the DVLA if the condition will affect driving, using form C1V rather than C1.",
      evidence: "Legal requirement (DVLA).",
      sources: ["dvla-cancer-driving"],
    },
    {
      name: "Advice not to drive when sleepy (Macmillan)",
      differs: "In its section on tiredness during chemotherapy, puts the rule simply: if sleepy, do not drive or operate machinery.",
      evidence: "Patient information, not graded: 'If you feel sleepy, do not drive or operate machinery.'",
      sources: ["macmillan-chemo-side-effects"],
    },
  ],
  grades: [
    { claim: "When a car or motorcycle driver with cancer must tell the DVLA", grade: "Legal requirement (Great Britain)", source: "dvla-cancer-driving", quote: "You do not need to tell DVLA if you have cancer, unless:" },
    { claim: "Penalty for not declaring a condition that affects driving", grade: "Legal requirement (Great Britain)", source: "dvla-cancer-driving", quote: "You can be fined up to £1,000 if you do not tell DVLA about a medical condition that affects your driving." },
    { claim: "Drivers in Northern Ireland report to a different agency", grade: "Legal requirement (Northern Ireland)", source: "gov-driving-medical-conditions", quote: "If you’re in Northern Ireland you must contact the Driver and Vehicle Agency (DVA)." },
    { claim: "The opioids, benzodiazepines and other medicines the law lists may be taken when driving only if prescribed, taken as advised and not causing unfitness to drive", grade: "Legal requirement (England, Scotland and Wales)", source: "gov-drug-driving", quote: "you’ve been prescribed them and followed advice on how to take them by a healthcare professional" },
    { claim: "Travel advice", grade: "Not graded: patient information pages without a grading scheme", source: "macmillan-flying" },
    { claim: "Wait of 3 months after chemotherapy or radiotherapy before a live vaccine (United States)", grade: "Not graded: reference chapter for health professionals", source: "cdc-yellow-book-immunocompromised", quote: "For cancer chemotherapy, radiation therapy, and highly immunosuppressive medications (exclusive of lymphocyte-depleting agents and organ transplant immunosuppression), the waiting period is 3 months." },
  ],
  sources: [
    {
      key: "dvla-cancer-driving",
      label: "Cancer and driving",
      publisher: "GOV.UK (Driver and Vehicle Licensing Agency)",
      year: 2026,
      url: "https://www.gov.uk/cancer-and-driving",
      gradingScheme: "Legal requirements; not a graded guideline. The page prints no date and was read as current on the access date.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "gov-drug-driving",
      label: "Drugs and driving: the law",
      publisher: "GOV.UK",
      year: 2026,
      url: "https://www.gov.uk/drug-driving-law",
      gradingScheme: "Legal requirements; not a graded guideline. The page prints no date and was read as current on the access date.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "gov-driving-medical-conditions",
      label: "Medical conditions, disabilities and driving: Telling DVLA about a medical condition or disability",
      publisher: "GOV.UK",
      year: 2026,
      url: "https://www.gov.uk/driving-medical-conditions",
      gradingScheme: "Legal requirements; not a graded guideline. The page prints no date and was read as current on the access date.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "macmillan-flying",
      label: "Can you fly with cancer?",
      publisher: "Macmillan Cancer Support",
      year: 2023,
      url: "https://www.macmillan.org.uk/cancer-information-and-support/impacts-of-cancer/travel/cancer-and-flying",
      gradingScheme: "Patient information page; not graded. Reviewed 1 March 2023, page marked as under review.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "macmillan-vaccinations",
      label: "Cancer and travel vaccinations",
      publisher: "Macmillan Cancer Support",
      year: 2023,
      url: "https://www.macmillan.org.uk/cancer-information-and-support/impacts-of-cancer/travel/getting-vaccinations",
      gradingScheme: "Patient information page; not graded. Reviewed 1 March 2023, page marked as under review.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "macmillan-medication-abroad",
      label: "Taking medication abroad",
      publisher: "Macmillan Cancer Support",
      year: 2023,
      url: "https://www.macmillan.org.uk/cancer-information-and-support/impacts-of-cancer/travel/taking-medication-abroad",
      gradingScheme: "Patient information page; not graded. Reviewed 1 March 2023, page marked as under review.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "macmillan-travel-insurance",
      label: "Cancer and buying travel insurance",
      publisher: "Macmillan Cancer Support",
      year: 2023,
      url: "https://www.macmillan.org.uk/cancer-information-and-support/impacts-of-cancer/travel/buying-travel-insurance",
      gradingScheme: "Patient information page; not graded. Reviewed 1 March 2023, page marked as under review.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "macmillan-holiday",
      label: "Taking care while you are on holiday",
      publisher: "Macmillan Cancer Support",
      year: 2023,
      url: "https://www.macmillan.org.uk/cancer-information-and-support/impacts-of-cancer/travel/taking-care-on-holiday",
      gradingScheme: "Patient information page; not graded. Reviewed 1 March 2023, page marked as under review.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "macmillan-chemo-side-effects",
      label: "Side effects of chemotherapy",
      publisher: "Macmillan Cancer Support",
      year: 2018,
      url: "https://www.macmillan.org.uk/cancer-information-and-support/treatment/types-of-treatment/chemotherapy/side-effects-of-chemotherapy",
      gradingScheme: "Patient information page; not graded. Reviewed 30 September 2018, page marked as under review.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "cdc-yellow-book-immunocompromised",
      label: "CDC Yellow Book: Health Information for International Travel, 2026 edition. Immunocompromised Travelers",
      publisher: "CDC",
      year: 2025,
      url: "https://www.cdc.gov/yellow-book/hcp/travelers-with-additional-considerations/immunocompromised-travelers.html",
      gradingScheme: "Reference chapter for health professionals; not graded. Page dated 23 April 2025, edition 2026. Read from the Internet Archive capture of 4 October 2026, because cdc.gov refuses a script.",
      read: "full-text",
      accessed: "2026-11-17",
    },
  ],
  related: ["sun-protection-during-and-after-cancer-treatment"],
  gaps: [
    "The driving rules read are those of Great Britain; in Northern Ireland a driver contacts the Driver and Vehicle Agency, and its rules and those of other countries were not read.",
    "The DVLA's medical standards for professionals (Assessing fitness to drive), which set specific rules for brain tumours and other cancers affecting the nervous system, were not read.",
    "The two GOV.UK driving pages print no date; the DVLA page does not itself say which nations it covers, and Great Britain is taken from the GOV.UK page on medical conditions and driving, which sends Northern Ireland drivers to a different agency.",
    "On 17 November 2026 the CDC Yellow Book chapter on immunocompromised travellers still returned HTTP 403 from cdc.gov; it was read from an Internet Archive capture of 4 October 2026, so a later change to the live page would not have been seen. The UK Green Book itself was not read; Macmillan lists it among its references.",
    "How long to wait after treatment before a live vaccine is safe is not given by Macmillan, which says it varies and the cancer doctor advises; the only figures on this page are the CDC's, written for United States practice.",
    "No source read gives a graded recommendation on preventing clots during travel for people with cancer.",
    "All Macmillan travel pages were last reviewed in March 2023, were due for review on 1 March 2026 and are marked as under review; no newer version was found on 17 November 2026.",
  ],
});
