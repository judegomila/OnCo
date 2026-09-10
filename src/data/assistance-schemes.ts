/**
 * National and charitable schemes that help pay for cancer care, by country. Plain language, each with the
 * official page and a source. Figures are quoted only where the linked page states them; everything else is
 * qualitative. Complements drug.access[] (per-product reimbursement and manufacturer programmes) on /assistance/.
 */
export type AssistanceScheme = {
  id: string;
  /** ISO 3166-1 alpha-2, or "EU" for union-wide schemes. */
  country: string;
  name: string;
  /** Who it is for, in plain words. */
  who: string;
  /** What it gives. */
  what: string;
  /** How to get it: plain steps. */
  how: string[];
  url: string;
  source: { label: string; url: string };
  kind: "public" | "charity" | "manufacturer" | "legal";
  asOf: string;
};

const AS_OF = "2026-09-09";

export const assistanceSchemes: AssistanceScheme[] = [
  // ---- United States ----
  { id: "us-part-d-cap", country: "US", kind: "public", name: "Medicare Part D yearly out-of-pocket cap", asOf: AS_OF,
    who: "Anyone with Medicare drug coverage (a Part D plan or a Medicare Advantage plan with drug cover) taking oral cancer drugs and other pharmacy-dispensed medicines.",
    what: "Since 2025 there is a yearly limit on what you pay out of pocket for covered Part D drugs; once you reach it you pay nothing more for covered drugs that year. Medicare publishes the current year's amount. You can also spread payments over the year through the Medicare Prescription Payment Plan.",
    how: ["Check that the drug is on your plan's formulary; infused drugs given in a clinic are usually Part B, not Part D, and the cap does not apply to them.", "Ask your plan about the Medicare Prescription Payment Plan if a large bill lands early in the year.", "Compare plans each autumn during open enrolment; formularies and tiers change."],
    url: "https://www.medicare.gov/drug-coverage-part-d/costs-for-medicare-drug-coverage", source: { label: "Medicare.gov: costs for Medicare drug coverage", url: "https://www.medicare.gov/drug-coverage-part-d/costs-for-medicare-drug-coverage" } },
  { id: "us-extra-help", country: "US", kind: "public", name: "Extra Help (Part D low-income subsidy)", asOf: AS_OF,
    who: "People with Medicare who have limited income and resources.",
    what: "Pays the Part D premium and deductible and reduces copayments for covered drugs; there is no late-enrolment penalty while you receive it.",
    how: ["Apply through Social Security online or by phone; people on Medicaid, Supplemental Security Income or a Medicare Savings Program qualify automatically.", "Once approved, tell your Part D plan so copayments are adjusted."],
    url: "https://www.medicare.gov/basics/costs/help/drug-costs", source: { label: "Medicare.gov: help with drug costs", url: "https://www.medicare.gov/basics/costs/help/drug-costs" } },
  { id: "us-340b", country: "US", kind: "public", name: "340B Drug Pricing Program", asOf: AS_OF,
    who: "Patients treated at safety-net hospitals, community health centres and other covered entities.",
    what: "Lets those providers buy outpatient drugs at discounted prices; many use the savings to fund free or reduced-cost medicines and services for uninsured and under-insured patients. The discount does not flow to you automatically, so ask.",
    how: ["Ask the hospital's financial counsellor or pharmacy whether it is a 340B covered entity and what patient discount or charity programme it runs.", "Bring proof of income and insurance status."],
    url: "https://www.hrsa.gov/opa", source: { label: "HRSA: Office of Pharmacy Affairs (340B)", url: "https://www.hrsa.gov/opa" } },
  { id: "us-manufacturer-pap", country: "US", kind: "manufacturer", name: "Manufacturer patient assistance and copay programmes", asOf: AS_OF,
    who: "Uninsured or under-insured patients (free-drug programmes) and commercially insured patients (copay cards). Copay cards cannot be used with Medicare or Medicaid.",
    what: "Free or reduced-cost supply of a branded drug, or a card that covers the copay. Each product has its own programme; the manufacturer links in the table above go straight to them.",
    how: ["Find the programme for your drug in the table above, or search NeedyMeds by drug name.", "Your clinic's financial navigator or the infusion pharmacy usually enrols you; income documents and a prescription are needed.", "Re-enrol each year and whenever your insurance changes."],
    url: "https://www.needymeds.org/", source: { label: "NeedyMeds programme directory", url: "https://www.needymeds.org/" } },
  { id: "us-paf-copay", country: "US", kind: "charity", name: "Patient Advocate Foundation Co-Pay Relief", asOf: AS_OF,
    who: "Insured patients with a qualifying diagnosis and household income under the programme's limit; funds open and close by disease.",
    what: "Direct payment of copays, coinsurance and deductibles for treatment of the covered diagnosis.",
    how: ["Check whether the fund for your cancer is open on the Co-Pay Relief site.", "Apply online or by phone with your diagnosis, insurance and income details; your provider can bill the fund directly."],
    url: "https://copays.org/", source: { label: "PAF Co-Pay Relief", url: "https://copays.org/" } },
  { id: "us-cancercare", country: "US", kind: "charity", name: "CancerCare financial assistance", asOf: AS_OF,
    who: "People in active cancer treatment who meet income guidelines.",
    what: "Limited grants for treatment-related costs such as transport, home care and child care, plus copay assistance funds for some diagnoses, and free counselling from oncology social workers.",
    how: ["Call or apply online; an oncology social worker screens eligibility and can point to other funds."],
    url: "https://www.cancercare.org/financial_assistance", source: { label: "CancerCare: financial assistance", url: "https://www.cancercare.org/financial_assistance" } },
  { id: "us-healthwell", country: "US", kind: "charity", name: "HealthWell Foundation", asOf: AS_OF,
    who: "Insured patients whose fund for a specific disease is open and whose income is under the fund's limit.",
    what: "Grants toward copays, premiums and deductibles for the covered disease.",
    how: ["Search the open funds list for your cancer type.", "Apply online; grants are paid to the pharmacy or provider."],
    url: "https://www.healthwellfoundation.org/", source: { label: "HealthWell Foundation", url: "https://www.healthwellfoundation.org/" } },
  { id: "us-lls-copay", country: "US", kind: "charity", name: "Leukemia & Lymphoma Society Co-Pay Assistance Program", asOf: AS_OF,
    who: "Insured patients with a blood cancer covered by an open fund.",
    what: "Help with insurance premiums and copays for treatment of the covered blood cancer.",
    how: ["Check the open diagnoses on the LLS site and apply online or through an LLS information specialist."],
    url: "https://www.lls.org/support-resources/financial-support/co-pay-assistance-program", source: { label: "LLS Co-Pay Assistance Program", url: "https://www.lls.org/support-resources/financial-support/co-pay-assistance-program" } },
  { id: "us-acs-road", country: "US", kind: "charity", name: "American Cancer Society Road To Recovery", asOf: AS_OF,
    who: "Patients who need a ride to treatment and cannot drive themselves.",
    what: "Free rides to and from treatment from trained volunteer drivers, where the programme operates.",
    how: ["Call the ACS helpline or request a ride online a few days in advance."],
    url: "https://www.cancer.org/support-programs-and-services/road-to-recovery.html", source: { label: "ACS Road To Recovery", url: "https://www.cancer.org/support-programs-and-services/road-to-recovery.html" } },
  { id: "us-acs-hope-lodge", country: "US", kind: "charity", name: "American Cancer Society Hope Lodge", asOf: AS_OF,
    who: "Patients and a caregiver travelling away from home for treatment.",
    what: "Free lodging near treatment centres in the cities where a Hope Lodge operates.",
    how: ["Ask your treatment centre's social worker to refer you, or contact the Lodge directly; availability varies."],
    url: "https://www.cancer.org/support-programs-and-services/patient-lodging/hope-lodge.html", source: { label: "ACS Hope Lodge", url: "https://www.cancer.org/support-programs-and-services/patient-lodging/hope-lodge.html" } },

  // ---- United Kingdom ----
  { id: "uk-medex", country: "GB", kind: "public", name: "Free NHS prescriptions with a medical exemption certificate", asOf: AS_OF,
    who: "Anyone in England being treated for cancer, its effects, or the effects of treatment. Prescriptions are already free in Scotland, Wales and Northern Ireland.",
    what: "All NHS prescriptions free of charge for five years, renewable, not only the cancer drugs.",
    how: ["Ask your GP surgery or hospital for form FP92A; a clinician signs it.", "The certificate arrives from the NHS Business Services Authority; tick the exemption box on the prescription form and show the certificate if asked."],
    url: "https://www.nhsbsa.nhs.uk/exemption-certificates/medical-exemption-certificates", source: { label: "NHSBSA: medical exemption certificates", url: "https://www.nhsbsa.nhs.uk/exemption-certificates/medical-exemption-certificates" } },
  { id: "uk-macmillan-grants", country: "GB", kind: "charity", name: "Macmillan Grants", asOf: AS_OF,
    who: "People living with cancer on a low income and with limited savings.",
    what: "A one-off payment towards costs such as heating, travel to hospital, clothing or household items.",
    how: ["A health or social care professional (for example a Macmillan nurse or hospital social worker) applies with you.", "Macmillan's support line can check eligibility and connect you with a professional to apply."],
    url: "https://www.macmillan.org.uk/cancer-information-and-support/get-help/financial-help/macmillan-grants", source: { label: "Macmillan Grants", url: "https://www.macmillan.org.uk/cancer-information-and-support/get-help/financial-help/macmillan-grants" } },
  { id: "uk-pip", country: "GB", kind: "public", name: "Personal Independence Payment (PIP)", asOf: AS_OF,
    who: "People aged 16 to State Pension age in England and Wales whose illness or treatment affects daily living or mobility; Scotland has Adult Disability Payment.",
    what: "A regular, non-means-tested payment. People who are terminally ill can claim under special rules with a faster decision and no assessment.",
    how: ["Start the claim by phone or online on GOV.UK.", "Ask your clinical team for the SR1 form if you may qualify under the special rules for end of life.", "Macmillan and Citizens Advice can help fill in the forms."],
    url: "https://www.gov.uk/pip", source: { label: "GOV.UK: Personal Independence Payment", url: "https://www.gov.uk/pip" } },
  { id: "uk-attendance", country: "GB", kind: "public", name: "Attendance Allowance", asOf: AS_OF,
    who: "People over State Pension age who need help with personal care or supervision because of illness.",
    what: "A regular, non-means-tested payment at one of two rates; special rules apply for terminal illness.",
    how: ["Claim by post using the form on GOV.UK or by phone; the special-rules route uses the SR1 form from your clinician."],
    url: "https://www.gov.uk/attendance-allowance", source: { label: "GOV.UK: Attendance Allowance", url: "https://www.gov.uk/attendance-allowance" } },
  { id: "uk-cdf", country: "GB", kind: "public", name: "Cancer Drugs Fund (England)", asOf: AS_OF,
    who: "NHS patients in England whose oncologist recommends a drug that NICE has placed in the Fund while more evidence is collected.",
    what: "Interim NHS funding for promising drugs that are not yet in routine commissioning; your clinician applies, not you. The 'What the NHS offers' page lists which products are in the Fund.",
    how: ["Ask your oncologist whether the treatment is in the CDF and whether you meet the treatment criteria.", "The hospital submits the application; the drug is then supplied free on the NHS."],
    url: "https://www.england.nhs.uk/cancer/cdf/", source: { label: "NHS England: Cancer Drugs Fund", url: "https://www.england.nhs.uk/cancer/cdf/" } },
  { id: "uk-maggies", country: "GB", kind: "charity", name: "Maggie's centres", asOf: AS_OF,
    who: "Anyone with cancer, and their family and friends, near a Maggie's centre.",
    what: "Free practical, emotional and financial support, including benefits advice from trained advisers, without an appointment.",
    how: ["Walk in to a centre, most of which sit next to NHS cancer hospitals, or contact one online."],
    url: "https://www.maggies.org/", source: { label: "Maggie's", url: "https://www.maggies.org/" } },

  // ---- European Union ----
  { id: "eu-cross-border", country: "EU", kind: "legal", name: "Cross-border healthcare (Directive 2011/24/EU)", asOf: AS_OF,
    who: "People insured in an EU or EEA country who want treatment or a consultation in another member state.",
    what: "Reimbursement by your home insurer up to what the same care would have cost at home; prior authorisation may be required for hospital stays and costly treatments. National schemes for cancer drugs and copayments differ by country, so ask your national contact point.",
    how: ["Find your national contact point through the Your Europe portal.", "Ask whether prior authorisation is needed before travelling.", "Keep invoices and reports for reimbursement."],
    url: "https://europa.eu/youreurope/citizens/health/planned-healthcare/index_en.htm", source: { label: "Directive 2011/24/EU", url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32011L0024" } },

  // ---- Australia ----
  { id: "au-pbs-safety-net", country: "AU", kind: "public", name: "PBS co-payment and Safety Net", asOf: AS_OF,
    who: "Anyone with a Medicare card filling PBS-listed prescriptions, including most oral cancer drugs; concession card holders pay a lower co-payment.",
    what: "Subsidised medicines with a fixed co-payment per script. Once a family's spending reaches the yearly Safety Net threshold, scripts for the rest of the year are cheaper or free for concession holders. Services Australia publishes the current thresholds.",
    how: ["Ask one pharmacy to keep a Prescription Record Form, or ask each pharmacy to record your scripts, so spending is tracked for the Safety Net.", "Apply for a Safety Net card when the threshold is reached."],
    url: "https://www.servicesaustralia.gov.au/pbs-safety-net-thresholds", source: { label: "Services Australia: PBS Safety Net thresholds", url: "https://www.servicesaustralia.gov.au/pbs-safety-net-thresholds" } },
  { id: "au-medicare-safety-net", country: "AU", kind: "public", name: "Medicare Safety Nets", asOf: AS_OF,
    who: "Anyone with high out-of-hospital costs, for example specialist consultations, scans and radiotherapy given as an outpatient.",
    what: "Once your gap payments in a calendar year pass a threshold, Medicare pays a higher share of further out-of-hospital costs for the rest of the year.",
    how: ["Register as a family or couple with Services Australia so costs are pooled.", "Services Australia tracks the total from claims automatically."],
    url: "https://www.servicesaustralia.gov.au/medicare-safety-nets", source: { label: "Services Australia: Medicare Safety Nets", url: "https://www.servicesaustralia.gov.au/medicare-safety-nets" } },
  { id: "au-cancer-council", country: "AU", kind: "charity", name: "Cancer Council practical and financial assistance", asOf: AS_OF,
    who: "People affected by cancer in any state or territory.",
    what: "Financial counselling, legal and workplace advice through the Pro Bono Program, transport and accommodation help for people travelling to treatment, and referral to state patient travel assistance schemes.",
    how: ["Call 13 11 20 or contact your state Cancer Council; a nurse or counsellor screens and refers you."],
    url: "https://www.cancer.org.au/support-and-services/practical-and-financial-assistance", source: { label: "Cancer Council: practical and financial assistance", url: "https://www.cancer.org.au/support-and-services/practical-and-financial-assistance" } },

  // ---- Japan ----
  { id: "jp-kougaku", country: "JP", kind: "public", name: "High-Cost Medical Expense Benefit (kougaku ryouyouhi seido)", asOf: AS_OF,
    who: "Everyone enrolled in Japanese public health insurance, which is compulsory for residents.",
    what: "A monthly ceiling on what you pay for insured medical care, set by age and income band; the insurer reimburses anything above it, and the ceiling falls further after several high-cost months in a year.",
    how: ["Ask your insurer for a Certificate of Eligibility for Ceiling-Amount Application (gendogaku tekiyou ninteishou) before treatment so the hospital bills you only up to the ceiling.", "Without the certificate, pay and then claim reimbursement from the insurer."],
    url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/iryouhoken/juuyou/kougakuiryou/index.html", source: { label: "Ministry of Health, Labour and Welfare (Japanese)", url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/iryouhoken/juuyou/kougakuiryou/index.html" } },

  // ---- China ----
  { id: "cn-nrdl", country: "CN", kind: "public", name: "National Reimbursement Drug List (NRDL)", asOf: AS_OF,
    who: "People covered by basic medical insurance, which covers most residents.",
    what: "Cancer drugs added to the list after national price negotiation are reimbursed at a share set by the provincial scheme; drugs not on the list are largely self-pay. The list is updated each year, and many new targeted drugs and immunotherapies have been added through negotiation.",
    how: ["Ask the hospital pharmacy whether your drug is on the current NRDL and what the local reimbursement share is.", "Some hospitals and provinces also run supplementary insurance (huiminbao) and charity supply programmes for drugs not yet listed; ask the social worker or the manufacturer."],
    url: "https://www.nhsa.gov.cn/", source: { label: "National Healthcare Security Administration", url: "https://www.nhsa.gov.cn/" } },

  // ---- Canada ----
  { id: "ca-provincial", country: "CA", kind: "public", name: "Provincial and territorial cancer drug programmes", asOf: AS_OF,
    who: "Residents with a provincial health card. Coverage rules differ by province: hospital-administered drugs are covered everywhere, while take-home oral cancer drugs are covered fully in some provinces and through public drug plans with deductibles in others.",
    what: "Public funding of cancer drugs recommended by Canada's Drug Agency and negotiated by the pan-Canadian Pharmaceutical Alliance, then listed by each province.",
    how: ["Ask your cancer centre's drug access navigator which programme covers your drug where you live.", "If a take-home drug is not covered, ask about the provincial drug plan, private insurance and the manufacturer's patient support programme."],
    url: "https://www.pcpacanada.ca/", source: { label: "pan-Canadian Pharmaceutical Alliance", url: "https://www.pcpacanada.ca/" } },
  { id: "ca-ccs", country: "CA", kind: "charity", name: "Canadian Cancer Society financial help", asOf: AS_OF,
    who: "People affected by cancer anywhere in Canada.",
    what: "Guidance on income supports, tax credits and drug coverage, plus travel and lodging programmes near treatment centres.",
    how: ["Call the Cancer Information Helpline or use the community services locator on the site."],
    url: "https://cancer.ca/en/living-with-cancer/how-we-can-help/financial-help", source: { label: "Canadian Cancer Society: financial help", url: "https://cancer.ca/en/living-with-cancer/how-we-can-help/financial-help" } },
  // ---- India ----
  { id: "in-pmjay", country: "IN", kind: "public", name: "Ayushman Bharat PM-JAY", asOf: "2026-09-10",
    who: "Families in the poorest roughly 40% of the population identified through the socio-economic caste census and state lists, and since September 2024 everyone aged 70 and over regardless of income.",
    what: "Cashless hospital treatment up to 5 lakh rupees per family per year at empanelled public and private hospitals, including oncology packages for cancer surgery, chemotherapy, radiotherapy and supportive care. Outpatient care and most oral medicines are not covered.",
    how: ["Check eligibility with your Aadhaar or ration card on the PM-JAY portal, the Ayushman app or at a Common Service Centre, and collect an Ayushman card.", "Find an empanelled hospital (public cancer centres and many private hospitals are listed) and go to its PM-JAY help desk (Pradhan Mantri Arogya Mitra) before admission.", "The hospital raises the pre-authorisation for the treatment package; you should not be asked to pay for covered procedures."],
    url: "https://nha.gov.in/PM-JAY", source: { label: "National Health Authority: AB PM-JAY", url: "https://nha.gov.in/PM-JAY" } },
  { id: "in-tata-memorial-charity", country: "IN", kind: "charity", name: "Tata Memorial Centre general (subsidised) category and hospital charity funds", asOf: "2026-09-10",
    who: "Patients registering at Tata Memorial Hospital and its units who cannot pay; the majority of its patients are treated in the general category.",
    what: "Free or heavily subsidised investigations and treatment in the general category, with medical social workers who connect patients to charitable trusts, state chief minister relief funds and PM-JAY for drugs and accommodation.",
    how: ["Register as a new patient at Tata Memorial Hospital (Mumbai) or a Tata Memorial unit; ask for the general category at registration.", "Meet the medical social work department, which assesses need and applies to hospital and external charitable funds on your behalf.", "Bring identity documents, income certificate if available, and the PM-JAY card if you have one."],
    url: "https://tmc.gov.in", source: { label: "Tata Memorial Centre", url: "https://tmc.gov.in" } },
];

/** Country labels for the assistance navigator's filter. */
export const ASSISTANCE_COUNTRIES: Record<string, string> = { US: "United States", GB: "United Kingdom", UK: "United Kingdom", EU: "European Union", DE: "Germany", AU: "Australia", JP: "Japan", CN: "China", CA: "Canada", IN: "India" };
