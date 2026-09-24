/**
 * Hand-written, dated checklists for the first 60 days after a diagnosis, keyed by cancer id. Rendered as its own
 * step on /first-60-days/[id]/ (src/lib/first-60-days.ts adds the section only for cancers listed here). Each item
 * names the page it was read from: the days and weeks are the typical order those pages describe, not a schedule,
 * and nothing here is advice for an individual case. UK and NHS focus where the item is about services or money.
 */
export type ChecklistSource = { label: string; url: string };
export type ChecklistItem = {
  /** Typical timing, as a label ("Day 1 to 7", "Week 2 to 4", "By day 60"). */
  when: string;
  /** What to do or ask, in one sentence. */
  item: string;
  /** Why it matters, one sentence, sourced. */
  why: string;
  source: ChecklistSource;
  also?: ChecklistSource;
};

const L = (label: string, url: string): ChecklistSource => ({ label, url });
const NHS_GB_TESTS = L("NHS: gallbladder cancer, tests and next steps", "https://www.nhs.uk/conditions/gallbladder-cancer/tests-and-next-steps/");
const NHS_GB_TREATMENT = L("NHS: gallbladder cancer, treatment", "https://www.nhs.uk/conditions/gallbladder-cancer/treatment/");
const NHS_GB_SUPPORT = L("NHS: gallbladder cancer, help and support", "https://www.nhs.uk/conditions/gallbladder-cancer/help-and-support/");
const NHS_GENOMIC = L("NHS: genetic and genomic testing", "https://www.nhs.uk/conditions/genetic-and-genomic-testing/");
const NHS_TRIALS = L("NHS: clinical trials", "https://www.nhs.uk/conditions/clinical-trials/");
const NHS_CARER_ASSESSMENT = L("NHS: carer's assessments", "https://www.nhs.uk/social-care-and-support/support-and-benefits-for-carers/carer-assessments/");
const NHS_CARER_BENEFITS = L("NHS: benefits for carers", "https://www.nhs.uk/social-care-and-support/support-and-benefits-for-carers/benefits-for-carers/");
const MAC_MDT = L("Macmillan: your multidisciplinary team", "https://www.macmillan.org.uk/cancer-information-and-support/treatment/preparing-for-treatment/your-multidisciplinary-team");
const MAC_SECOND = L("Macmillan: getting a second opinion", "https://www.macmillan.org.uk/cancer-information-and-support/treatment/preparing-for-treatment/getting-a-second-opinion");
const MAC_WORK = L("Macmillan: work and cancer", "https://www.macmillan.org.uk/cancer-information-and-support/impacts-of-cancer/work-and-cancer");
const MAC_BENEFITS = L("Macmillan: benefits and financial support", "https://www.macmillan.org.uk/cancer-information-and-support/get-help/financial-help/benefits");
const MAC_CARERS = L("Macmillan: looking after someone with cancer", "https://www.macmillan.org.uk/cancer-information-and-support/supporting-someone/looking-after-someone-with-cancer");
const CRUK_DECISIONS = L("Cancer Research UK: gallbladder cancer treatment decisions", "https://www.cancerresearchuk.org/about-cancer/gallbladder-cancer/treatment/treatment-decisions");
const CRUK_STENTS = L("Cancer Research UK: biliary stents", "https://www.cancerresearchuk.org/about-cancer/bile-duct-cancer/treatment/stents");
const CRUK_EATING = L("Cancer Research UK: eating problems and gallbladder cancer", "https://www.cancerresearchuk.org/about-cancer/gallbladder-cancer/living-with/eating-problems");
const CRUK_FOLLOWUP = L("Cancer Research UK: follow up after gallbladder cancer", "https://www.cancerresearchuk.org/about-cancer/gallbladder-cancer/treatment/follow-up");
const CRUK_PREHAB = L("Cancer Research UK: prehabilitation", "https://www.cancerresearchuk.org/about-cancer/treatment/prehabilitation");
const AMMF_CENTRES = L("AMMF: UK centres with hepatobiliary expertise", "https://ammf.org.uk/centres-with-cca-expertise/");
const AMMF_PROFILING = L("AMMF: molecular profiling booklet", "https://ammf.org.uk/molecular-profiling-booklet-and-video/");
const NICE_TA944 = L("NICE TA944: durvalumab with gemcitabine and cisplatin for biliary tract cancer", "https://www.nice.org.uk/guidance/ta944");
const SOREIDE = L("Søreide et al., incidental gallbladder cancer after cholecystectomy, systematic review (Br J Surg 2019)", "https://doi.org/10.1002/bjs.11035");
const ETHUN = L("Ethun et al., optimal time interval to re-resection for incidental gallbladder cancer (JAMA Surg 2017)", "https://doi.org/10.1001/jamasurg.2016.3642");
const BILCAP = L("BILCAP: adjuvant capecitabine (Lancet Oncology 2019)", "https://doi.org/10.1016/S1470-2045(18)30915-X");

export const FIRST_60_DAYS_CHECKLISTS: Record<string, ChecklistItem[]> = {
  gallbladder: [
    { when: "Day 1 to 7", item: "Get the name and number of your clinical nurse specialist (your key worker) and the hospital's 24-hour line, and keep both by the phone.", why: "The NHS says a group of specialists looks after you throughout, with a clinical nurse specialist as your main contact; the 24-hour line is where fever, jaundice or uncontrolled pain are reported.", source: NHS_GB_TESTS },
    { when: "Day 1 to 7", item: "If the cancer was found after your gallbladder was removed, ask for a copy of the pathology report: the T stage and the cystic duct margin decide whether a second operation is advised.", why: "Cancer Research UK says a second operation may be suggested; the systematic review of incidental gallbladder cancer supports re-resection for T1b and deeper tumours in fit patients.", source: CRUK_DECISIONS, also: SOREIDE },
    { when: "Day 1 to 7", item: "Ask when your case goes to the hepatobiliary multidisciplinary team meeting and how you will hear what was decided.", why: "Macmillan explains that a team of specialists meets to agree the recommended plan before it is put to you.", source: MAC_MDT },
    { when: "Week 1 to 2", item: "Staging tests: blood tests, a CT scan of the chest, abdomen and pelvis, often MRI, sometimes PET, laparoscopy or ERCP.", why: "The NHS lists these tests and says it can take several weeks to get the results, which does not mean something is wrong.", source: NHS_GB_TESTS },
    { when: "Week 1 to 2", item: "If your skin or eyes are yellow, ask how and when the blockage will be relieved (usually a stent) and what the signs of a blocked or infected stent are.", why: "Cancer Research UK says stents can block after a few months and that a high temperature or shivering means contacting your doctor straight away.", source: CRUK_STENTS },
    { when: "Week 1 to 2", item: "Ask for a dietitian referral if you have lost weight or your appetite; nutritional drinks are available on prescription.", why: "Cancer Research UK says many people with gallbladder cancer lose their appetite and some lose weight, and that a dietitian can advise.", source: CRUK_EATING },
    { when: "Week 1 to 2", item: "Decide what to tell your employer, check your sick pay, and ask Macmillan's welfare rights advisers what you can claim.", why: "Macmillan says the law treats cancer as a disability, employers should make reasonable adjustments, and Statutory Sick Pay applies if there is no company scheme.", source: MAC_WORK, also: MAC_BENEFITS },
    { when: "Week 2 to 4", item: "Surgeon appointment: is the cancer resectable, what operation, which unit and how many it does a year; ask about a second opinion or referral to a hepatobiliary centre.", why: "AMMF advises care from a team specialising in the hepatobiliary system and lists UK centres; Macmillan explains how a second opinion is arranged.", source: AMMF_CENTRES, also: MAC_SECOND },
    { when: "Week 2 to 4", item: "If the cancer has spread, ask that HER2 testing and a tumour gene panel are requested now, on tissue already taken, so the results are back before a treatment change is needed.", why: "The NHS says your hospital specialist requests genomic testing on a sample already removed; AMMF's booklet explains why a result may open a targeted treatment.", source: NHS_GENOMIC, also: AMMF_PROFILING },
    { when: "Week 2 to 4", item: "Ask whether a clinical trial is open to you and what joining would involve.", why: "The NHS clinical trials page lists the questions to ask before joining and says you can leave at any time without it affecting your care.", source: NHS_TRIALS },
    { when: "Week 3 to 6", item: "Second operation, if advised: ask about timing and about prehabilitation (exercise, nutrition, stopping smoking) while you wait.", why: "A US multicentre study found survival was best when re-resection was done around four to eight weeks after the first operation; Cancer Research UK describes prehabilitation before treatment.", source: ETHUN, also: CRUK_PREHAB },
    { when: "Week 3 to 6", item: "Oncologist appointment for cancer that has spread: gemcitabine and cisplatin with durvalumab is the NHS standard; ask about the aim, the side effects, the alert card and the 24-hour number.", why: "NICE TA944 recommends durvalumab with gemcitabine and cisplatin for unresectable or advanced biliary tract cancer.", source: NICE_TA944 },
    { when: "Week 3 to 6", item: "Ask for the palliative care or symptom control team to be involved alongside treatment if you have pain, itching, sickness or weight loss.", why: "The NHS says people whose cancer cannot be cured are referred to the palliative care or symptom control team; it can work alongside active treatment.", source: NHS_GB_TREATMENT },
    { when: "Week 4 to 8", item: "Chemotherapy after surgery: ask whether six months of capecitabine tablets is recommended and when it should start.", why: "The BILCAP trial made six months of capecitabine the standard after biliary cancer surgery.", source: BILCAP },
    { when: "Week 4 to 8", item: "Carers: tell the team you are the carer, ask the council for a free carer's assessment, and check whether Carer's Allowance applies.", why: "The NHS says anyone over 18 can ask for a carer's assessment; Carer's Allowance is £86.45 a week for 35 or more hours of care for someone on certain benefits.", source: NHS_CARER_ASSESSMENT, also: NHS_CARER_BENEFITS },
    { when: "By day 60", item: "Know your follow-up plan and contact the team about any new symptom between visits.", why: "Cancer Research UK says follow-up after curative treatment is typically every 3 months for 2 years then every 6 months, with blood tests at most visits and scans when needed.", source: CRUK_FOLLOWUP },
    { when: "By day 60", item: "Have the printed red cards, the medicine list and the date any stent went in to hand, and know the free helplines.", why: "The NHS lists Macmillan (0808 808 00 00), Cancer Research UK nurses (0808 800 4040), Maggie's and Marie Curie; Macmillan says carers should tell the team who they are.", source: NHS_GB_SUPPORT, also: MAC_CARERS },
  ],
};
