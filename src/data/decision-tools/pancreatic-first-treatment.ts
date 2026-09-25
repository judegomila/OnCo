import type { Answers, DecisionTool, ToolCard, ToolSource } from "@/lib/decision-tools";

/**
 * PANCREATIC CANCER AT DIAGNOSIS: what the resectability class, jaundice and fitness usually mean for the order of
 * treatment. Inputs are the three things the NICE guideline turns on: the class the multidisciplinary team gave the
 * scan (resectable, borderline resectable, locally advanced, metastatic), whether the bile duct is blocked (jaundice),
 * and fitness for a major operation or combination chemotherapy. Every card quotes its source word for word:
 *
 *   NICE NG85 (2018, with the 2024 and 2025 notes), pancreatic cancer in adults: 1.2 deciding care, 1.3 staging,
 *     1.4 psychological support, 1.5 pain, 1.6 nutrition, 1.7 relieving biliary and duodenal obstruction,
 *     1.8 resectable and borderline resectable disease, 1.9 unresectable disease
 *   NICE TA476 (2017), nab-paclitaxel with gemcitabine; NICE TA440 (2017), pegylated liposomal irinotecan
 *   Cancer Research UK, treatment options for pancreatic cancer (the three words explained; the trial offer for borderline disease)
 *   Pancreatic Cancer UK, who can have surgery; stent for a blocked bile duct
 *   NHS, treatment for pancreatic cancer (the palliative care team)
 *   the pancreatic record's own standard-of-care rows (src/data/spikes/pancreatic.ts), quoted and kept equal by
 *   src/lib/decision-tools.test.ts
 *
 * All read 24 September 2026. The aid does not rank or weigh: where the guideline is silent the card says so and points
 * at the multidisciplinary team. The NCCN resectability definitions are paraphrased on the subtype records, not quoted
 * here, because the NCCN text is behind a login.
 */
const asOf = "2026-09-24";

const NG85: ToolSource = { label: "NICE NG85: pancreatic cancer in adults, diagnosis and management, recommendations (February 2018, with later notes)", url: "https://www.nice.org.uk/guidance/ng85/chapter/Recommendations" };
const TA476: ToolSource = { label: "NICE TA476: paclitaxel as albumin-bound nanoparticles with gemcitabine for untreated metastatic pancreatic cancer, recommendation 1.1 (September 2017)", url: "https://www.nice.org.uk/guidance/ta476/chapter/1-Recommendations" };
const TA440: ToolSource = { label: "NICE TA440: pegylated liposomal irinotecan for treating pancreatic cancer after gemcitabine, recommendation 1.1 (April 2017)", url: "https://www.nice.org.uk/guidance/ta440/chapter/1-Recommendations" };
const CRUK_DECISIONS: ToolSource = { label: "Cancer Research UK: treatment options for pancreatic cancer", url: "https://www.cancerresearchuk.org/about-cancer/pancreatic-cancer/treatment/treatment-decisions" };
const PCUK_WHO: ToolSource = { label: "Pancreatic Cancer UK: who can have surgery for pancreatic cancer?", url: "https://www.pancreaticcancer.org.uk/information-and-support/treatments-for-pancreatic-cancer/surgery-for-pancreatic-cancer/who-can-have-surgery/" };
const PCUK_STENT: ToolSource = { label: "Pancreatic Cancer UK: stent for a blocked bile duct", url: "https://www.pancreaticcancer.org.uk/information-and-support/treatments-for-pancreatic-cancer/stent-for-a-blocked-bile-duct/" };
const NHS_TREATMENT: ToolSource = { label: "NHS: treatment for pancreatic cancer", url: "https://www.nhs.uk/conditions/pancreatic-cancer/treatment/" };
const ROW_NCCN: ToolSource = { label: "OnCo standard-of-care rows for pancreatic ductal adenocarcinoma (src/data/spikes/pancreatic.ts), written from NCCN Guidelines: Pancreatic Adenocarcinoma", url: "https://www.nccn.org/guidelines/guidelines-detail?category=1&id=1455" };

/** Row text quoted from the pancreatic record (src/data/spikes/pancreatic.ts); src/lib/decision-tools.test.ts keeps this equal to the data. */
export const QUOTED_PANCREATIC_ROWS: Record<string, string> = {
  "Resectable / borderline": "Neoadjuvant mFOLFIRINOX (borderline; increasingly resectable), surgery, then adjuvant mFOLFIRINOX to complete ~6 months (PRODIGE 24); gemcitabine/capecitabine if unfit. Chemoradiation selectively (PREOPANC).",
  "Metastatic, first line": "mFOLFIRINOX or NALIRIFOX (fit) or gemcitabine/nab-paclitaxel; olaparib maintenance if gBRCA after ≥16 weeks platinum; zenocutuzumab if NRG1 fusion; pembrolizumab if MSI-H; trials of RAS inhibitors + chemotherapy.",
};

const LINKS = {
  cancer: { label: "Pancreatic cancer", href: "/cancers/pancreatic/" },
  decisions: { label: "Pancreatic cancer decisions", href: "/cancers/pancreatic/decisions/" },
  first60: { label: "The first 60 days", href: "/first-60-days/pancreatic/" },
  resectability: { label: "Resectable, borderline resectable and unresectable", href: "/terms/resectability/" },
  whipple: { label: "Whipple procedure", href: "/terms/whipple/" },
  stenting: { label: "Biliary stenting and drainage", href: "/technologies/biliary-stenting-drainage/" },
  folfirinox: { label: "FOLFIRINOX", href: "/drugs/folfirinox/" },
  gemNab: { label: "Gemcitabine with nab-paclitaxel", href: "/drugs/gemcitabine-nab-paclitaxel/" },
  gemcitabine: { label: "Gemcitabine", href: "/drugs/gemcitabine/" },
  prodige24: { label: "PRODIGE 24", href: "/trials/prodige-24/" },
  preopanc: { label: "PREOPANC", href: "/trials/preopanc/" },
  resectable: { label: "Resectable pancreatic cancer", href: "/cancers/resectable-pdac/" },
  borderline: { label: "Borderline resectable pancreatic cancer", href: "/cancers/borderline-resectable-pdac/" },
  locallyAdvanced: { label: "Locally advanced pancreatic cancer", href: "/cancers/locally-advanced-pdac/" },
  metastatic: { label: "Metastatic pancreatic cancer", href: "/cancers/metastatic-pdac/" },
  prehab: { label: "Prehabilitation", href: "/technologies/prehabilitation/" },
  palliative: { label: "Early palliative care", href: "/technologies/palliative-care/" },
  pain: { label: "Cancer pain management", href: "/technologies/pain-management/" },
  performance: { label: "Performance status", href: "/terms/performance-status/" },
  nutrition: { label: "Nutrition support and enzymes", href: "/technologies/oncology-nutrition/" },
};

const cards: ToolCard[] = [
  { id: "surgery-first", title: "Resectable and well enough: the operation comes first, chemotherapy before it only in a trial", tone: "surgery",
    quotes: [
      { text: "Only consider neoadjuvant therapy for people with resectable pancreatic cancer as part of a clinical trial.", source: NG85 },
      { text: "Surgery is the best treatment for people with pancreatic cancer that has not spread outside the pancreas. It can help people live longer. Cancer that can be removed by surgery is called resectable or operable cancer.", source: PCUK_WHO },
      { text: `Resectable / borderline: ${QUOTED_PANCREATIC_ROWS["Resectable / borderline"]}`, source: ROW_NCCN },
    ],
    meaning: "When the scan shows no contact with the main arteries and no spread, and you are fit for a major operation, NICE's order is surgery first (usually a Whipple procedure for the head of the pancreas), then six months of chemotherapy. Chemotherapy before the operation is being tested in trials and the OnCo record notes it is used increasingly, so ask whether a trial is open to you and what your unit does; the question is unresolved, not settled.",
    questions: ["What on my scan makes this resectable rather than borderline?", "Which operation, how many does this unit do each year, and how soon?", "Is there a trial of chemotherapy before surgery open to me?"],
    links: [LINKS.resectable, LINKS.whipple, LINKS.preopanc, LINKS.decisions] },

  { id: "resectable-jaundice-no-drain", title: "Jaundice with a resectable cancer: NICE says operate rather than drain first", tone: "surgery",
    quotes: [
      { text: "Offer resectional surgery rather than preoperative biliary drainage to people who: have resectable pancreatic cancer and obstructive jaundice and are well enough for the procedure and are not enrolled in a clinical trial that requires preoperative biliary drainage.", source: NG85 },
      { text: "For people with obstructive jaundice and suspected pancreatic cancer, offer a pancreatic protocol CT scan before draining the bile duct.", source: NG85 },
    ],
    meaning: "A stent placed before surgery adds a procedure and a route for infection, so when the operation can happen soon the guideline goes straight to it and the operation relieves the jaundice. The CT scan comes before any drainage so the surgeon sees the tumour undisturbed. If the operation cannot be soon, the next card applies.",
    questions: ["How soon can the operation happen, and will the jaundice be left until then?", "What would make you decide to place a stent first after all?"],
    links: [LINKS.stenting, LINKS.whipple] },

  { id: "resectable-jaundice-stent", title: "Jaundice but not yet fit for the operation: a metal stent by endoscopy", tone: "watch",
    quotes: [
      { text: "If biliary drainage is needed in a person who has resectable pancreatic cancer and obstructive jaundice and is not yet fit enough for resectional surgery, offer endoscopically placed self‑expanding metal stents.", source: NG85 },
      { text: "For people with suspected pancreatic cancer who may need their stent removed later on, consider endoscopically placed self-expanding fully covered metal stents.", source: NG85 },
    ],
    meaning: "When fitness has to be built up first, the bile duct is drained with a metal stent placed through the mouth at ERCP; a fully covered one can be removed at the operation. Pancreatic Cancer UK says most people feel better within a couple of days and the jaundice clears over two to three weeks.",
    questions: ["Plastic or metal, covered or not, and will it be removed at surgery?", "What are the signs of a blocked or infected stent and who do I ring?"],
    links: [LINKS.stenting, LINKS.prehab] },

  { id: "borderline-chemo-first", title: "Borderline resectable: chemotherapy first, then restaging, ideally within a trial", tone: "discuss",
    quotes: [
      { text: "Only consider neoadjuvant therapy for people with borderline resectable pancreatic cancer as part of a clinical trial.", source: NG85 },
      { text: "You might have chemotherapy first to try to reduce the size of the cancer and make an operation more successful. This is called neo adjuvant chemotherapy.", source: CRUK_DECISIONS },
      { text: "Because the best treatment for borderline resectable pancreatic cancer is uncertain, your doctor might offer you treatment as part of a clinical trial.", source: CRUK_DECISIONS },
      { text: `Resectable / borderline: ${QUOTED_PANCREATIC_ROWS["Resectable / borderline"]}`, source: ROW_NCCN },
    ],
    meaning: "Borderline means the tumour touches a main vein or artery, so an operation straight away would probably leave cancer behind. UK practice, and the OnCo record, is chemotherapy first (usually modified FOLFIRINOX for two to four months, sometimes with radiotherapy), a repeat scan and CA 19-9, then surgery for those whose disease has not spread; Pancreatic Cancer UK says the operation usually follows 6 to 8 weeks after chemotherapy ends. NICE places this within trials because the evidence was still forming when it wrote; ask which trial, if any, is open.",
    questions: ["Which vessel is involved and how far round it does the tumour reach?", "How many cycles before restaging, and what result would rule surgery in or out?", "Is a vein resection likely?"],
    links: [LINKS.borderline, LINKS.folfirinox, LINKS.preopanc, LINKS.resectability] },

  { id: "jaundice-before-chemo-stent", title: "Jaundice when chemotherapy comes first: a stent so treatment can start", tone: "watch",
    quotes: [
      { text: "You may have a stent put in to treat jaundice if you are going to have chemotherapy before surgery.", source: PCUK_STENT },
      { text: "Treating the jaundice may mean you can start or continue treatment for the cancer.", source: PCUK_STENT },
      { text: "For people with suspected pancreatic cancer who may need their stent removed later on, consider endoscopically placed self-expanding fully covered metal stents.", source: NG85 },
    ],
    meaning: "Chemotherapy cannot be given safely while bilirubin is high, so the bile duct is drained first, usually with a metal stent placed by ERCP; a fully covered one can be taken out if you later go on to an operation. Expect the yellowing and itch to take two to three weeks to clear.",
    questions: ["How long after the stent can chemotherapy start?", "Will the stent be removed if I have surgery later?"],
    links: [LINKS.stenting] },

  { id: "not-fit-for-surgery", title: "Fitness decides whether an operation is offered at all", tone: "discuss",
    quotes: [
      { text: "You also need to be fit and well enough to have surgery and will have tests to check this. Some hospitals offer programmes to help people get fit enough. This is called prehabilitation. It focuses on diet and physical activity, and can help you recover more quickly after surgery.", source: PCUK_WHO },
      { text: "Health problems might mean you can’t have some treatments including surgery. Before you have surgery you have tests to check how fit you are including heart and lung tests.", source: CRUK_DECISIONS },
    ],
    meaning: "A Whipple operation is among the biggest in cancer surgery, so heart and lung tests and an anaesthetic assessment come first. If you are not fit enough now, ask whether that can change with prehabilitation (exercise, nutrition, enzymes, stopping smoking) and time, and what the plan is meanwhile; if it cannot, the treatment follows the unresectable cards and the team should say so plainly.",
    questions: ["What exactly makes me not fit enough, and can it be improved?", "Is there a prehabilitation programme, and how long would it take?", "If surgery is never possible, what is the plan?"],
    links: [LINKS.prehab, LINKS.performance, LINKS.nutrition] },

  { id: "after-surgery-chemo", title: "After the operation: six cycles of chemotherapy once you have recovered", tone: "info",
    quotes: [
      { text: "Start adjuvant therapy once the person has had time to recover from surgery and as soon as they are well enough to tolerate all 6 cycles.", source: NG85 },
      { text: "Offer adjuvant gemcitabine plus capecitabine to people who have had sufficient time to recover after pancreatic cancer resection.", source: NG85 },
      { text: "Consider adjuvant gemcitabine for people who are not well enough to tolerate combination chemotherapy.", source: NG85 },
      { text: `Resectable / borderline: ${QUOTED_PANCREATIC_ROWS["Resectable / borderline"]}`, source: ROW_NCCN },
    ],
    meaning: "Chemotherapy after surgery is what turns the operation into a real chance of cure. NICE names gemcitabine with capecitabine; since PRODIGE 24 (2018) modified FOLFIRINOX is the OnCo record's standard for fit patients, with gemcitabine-based treatment for those who are not. Pancreatic Cancer UK and Cancer Research UK say it should start within 12 weeks of surgery, so eating, weight, enzymes and blood sugar are sorted out in those weeks.",
    questions: ["Which regimen after surgery, and when would it start?", "What would delay it, and how do we prevent that?"],
    links: [LINKS.prodige24, LINKS.folfirinox, LINKS.gemcitabine, LINKS.first60] },

  { id: "bypass-if-unresectable-at-surgery", title: "If the surgeon finds the cancer cannot be removed: a bypass instead", tone: "info",
    quotes: [
      { text: "During attempted resection for pancreatic cancer, consider surgical biliary bypass if the cancer is found to be unresectable.", source: NG85 },
      { text: "During attempted resection for head of pancreas cancer, consider prophylactic gastrojejunostomy if the cancer is found to be unresectable.", source: NG85 },
    ],
    meaning: "Scans miss small deposits on the liver or the lining of the abdomen, so a minority of operations end without removing the cancer. When that happens the surgeon may join the bile duct and the stomach to the small bowel so that jaundice and a blocked duodenum are prevented; it does not treat the cancer, and Pancreatic Cancer UK says your surgeon will discuss this possibility before the operation.",
    questions: ["How likely is it that the cancer turns out to be unresectable once you start?", "Would you do a bypass in that case, and what would recovery be?"],
    links: [LINKS.whipple, LINKS.stenting] },

  { id: "locally-advanced-chemo", title: "Locally advanced: combination chemotherapy if you are well enough, gemcitabine alone if not", tone: "discuss",
    quotes: [
      { text: "Offer systemic combination chemotherapy to people with locally advanced pancreatic cancer who are well enough to tolerate it.", source: NG85 },
      { text: "Consider gemcitabine for people with locally advanced pancreatic cancer who are not well enough to tolerate combination chemotherapy.", source: NG85 },
      { text: "When using chemoradiotherapy, consider capecitabine as the radiosensitiser.", source: NG85 },
      { text: "After 6 months of chemotherapy, if the scans show you can’t have surgery you may have radiotherapy. This completes your treatment and is called consolidation radiotherapy.", source: CRUK_DECISIONS },
    ],
    meaning: "The tumour has wrapped around the arteries or blocked the main vein without spreading elsewhere. Chemotherapy comes first (modified FOLFIRINOX or gemcitabine with nab-paclitaxel on the OnCo record), with scans every few months; a minority shrink enough for an operation, and radiotherapy (SBRT over five sessions, or chemoradiotherapy with capecitabine tablets) may follow to consolidate. The record also lists tumour treating fields with gemcitabine and nab-paclitaxel (approved 2026) for this stage.",
    questions: ["Which combination, and for how many months before the first restaging?", "Would radiotherapy follow, and which kind is available here?", "Is conversion to surgery realistic for me?"],
    links: [LINKS.locallyAdvanced, LINKS.folfirinox, LINKS.gemNab, LINKS.decisions] },

  { id: "la-not-fit", title: "Locally advanced and not well enough for combination chemotherapy", tone: "refer",
    quotes: [
      { text: "Consider gemcitabine for people with locally advanced pancreatic cancer who are not well enough to tolerate combination chemotherapy.", source: NG85 },
      { text: "You will be referred to a special team of doctors and nurses called the palliative care team or symptom control team.", source: NHS_TREATMENT },
    ],
    meaning: "Gemcitabine alone, given weekly, is the gentler option NICE names; Cancer Research UK adds that radiotherapy on its own can be used when chemotherapy is not possible. Whatever is chosen, the symptom control team, enzymes, nutrition and pain relief are part of the treatment, not an alternative to it.",
    questions: ["Would gemcitabine alone or radiotherapy alone suit me better?", "Can the palliative care team see me now?"],
    links: [LINKS.gemcitabine, LINKS.palliative, LINKS.nutrition] },

  { id: "metastatic-fit", title: "Metastatic and well (performance status 0 to 1): FOLFIRINOX is NICE's first offer", tone: "discuss",
    quotes: [
      { text: "Offer FOLFIRINOX to people with metastatic pancreatic cancer and an Eastern Cooperative Oncology Group (ECOG) performance status of 0 to 1.", source: NG85 },
      { text: `Metastatic, first line: ${QUOTED_PANCREATIC_ROWS["Metastatic, first line"]}`, source: ROW_NCCN },
    ],
    meaning: "For people who are up and about and largely independent, the strongest combination is offered: FOLFIRINOX every two weeks, usually at modified doses in the UK. The OnCo record puts NALIRIFOX beside it for fit patients and gemcitabine with nab-paclitaxel as the alternative; NHS funding for NALIRIFOX follows NICE appraisals, so ask what applies where you are treated. A germline BRCA result, an NRG1 fusion or mismatch repair deficiency each open a different drug on the record.",
    questions: ["Modified FOLFIRINOX or NALIRIFOX, and why for me?", "Have my germline and tumour tests been sent, and when are they back?", "Is a first-line trial open to me?"],
    links: [LINKS.metastatic, LINKS.folfirinox, LINKS.performance, LINKS.decisions] },

  { id: "metastatic-less-fit", title: "Metastatic and not well enough for FOLFIRINOX: a gemcitabine combination", tone: "discuss",
    quotes: [
      { text: "Consider gemcitabine combination therapy for people who are not well enough to tolerate FOLFIRINOX.", source: NG85 },
      { text: "Paclitaxel as albumin-bound nanoparticles (nab‑paclitaxel) with gemcitabine is recommended as an option for untreated metastatic adenocarcinoma of the pancreas in adults, only if: other combination chemotherapies are unsuitable and they would otherwise have gemcitabine monotherapy and the company provides nab‑paclitaxel with the discount agreed in the patient access scheme.", source: TA476 },
    ],
    meaning: "Gemcitabine with nab-paclitaxel (weekly for three weeks in four) or gemcitabine with capecitabine are the usual combinations here. NICE funds nab-paclitaxel on the NHS only when other combinations are unsuitable and gemcitabine alone would otherwise be given, which describes many people at this fitness level; the trade is hair loss and nerve damage against a longer control of the cancer than gemcitabine alone.",
    questions: ["Gemcitabine with nab-paclitaxel or with capecitabine, and what decides it?", "What would make you reduce the dose or stop?"],
    links: [LINKS.gemNab, LINKS.metastatic, LINKS.performance] },

  { id: "metastatic-not-fit", title: "Metastatic and not well enough for combination chemotherapy: gemcitabine alone, or symptom control", tone: "refer",
    quotes: [
      { text: "Offer gemcitabine to people who are not well enough to tolerate combination chemotherapy.", source: NG85 },
      { text: "For people who can’t have surgery or other treatments you will have treatment to help control symptoms.", source: CRUK_DECISIONS },
      { text: "You will be referred to a special team of doctors and nurses called the palliative care team or symptom control team.", source: NHS_TREATMENT },
    ],
    meaning: "Gemcitabine alone is gentle enough for many people who could not have a combination, and for some people the honest choice is symptom control without chemotherapy. Either way the palliative care team, enzymes, nutrition, pain relief and a stent for jaundice are the treatment, and Pancreatic Cancer UK says having treatment is your decision and you do not have to decide anything straight away.",
    questions: ["What would gemcitabine alone add for me, and what would it cost me in side effects?", "If I choose symptom control, who looks after me and how often?"],
    links: [LINKS.gemcitabine, LINKS.palliative, LINKS.pain] },

  { id: "unresectable-jaundice-stent", title: "Jaundice when the cancer cannot be removed: a metal stent, not a bypass operation", tone: "watch",
    quotes: [
      { text: "Offer endoscopically placed self-expanding metal stents rather than surgical biliary bypass to people with unresectable pancreatic cancer.", source: NG85 },
      { text: "You should start feeling better quickly, normally within a couple of days of having the stent put in.", source: PCUK_STENT },
      { text: "The stent may get blocked and the symptoms you had before may come back.", source: PCUK_STENT },
    ],
    meaning: "The bile duct is opened with a metal stent placed through the mouth at ERCP (or through the skin if that fails), and chemotherapy can start once the bilirubin falls. Metal stents stay open longer than plastic; if the yellowing, itch or fever return the stent is checked and can be cleared or replaced the same way it went in.",
    questions: ["When can chemotherapy start after the stent?", "What are the signs of a blocked or infected stent, and who do I ring at night?"],
    links: [LINKS.stenting] },

  { id: "second-line", title: "If the first chemotherapy stops working: what NICE says about the next", tone: "info",
    quotes: [
      { text: "Consider oxaliplatin-based chemotherapy as second-line treatment for people who have not had first-line oxaliplatin.", source: NG85 },
      { text: "Consider gemcitabine-based chemotherapy as second-line treatment for people whose cancer has progressed after first-line FOLFIRINOX.", source: NG85 },
      { text: "Pegylated liposomal irinotecan, in combination with 5‑fluorouracil and leucovorin, is not recommended, within its marketing authorisation, for treating metastatic adenocarcinoma of the pancreas in adults whose disease has progressed after gemcitabine-based therapy.", source: TA440 },
    ],
    meaning: "The usual move is to switch backbone: a gemcitabine-based regimen after FOLFIRINOX, an oxaliplatin-based one after gemcitabine. Liposomal irinotecan with fluorouracil is licensed after gemcitabine but not NICE-recommended. The OnCo record's second-line row names daraxonrasib after first-line chemotherapy (RASolute 302), so ask about that and about trials before the first treatment stops working.",
    questions: ["What would the next treatment be if this one stops working?", "Is daraxonrasib, or a trial of a RAS inhibitor, available to me?"],
    links: [LINKS.metastatic, LINKS.decisions] },

  { id: "supportive-throughout", title: "Whatever the class: enzymes, pain relief and psychological support are part of the treatment", tone: "info",
    quotes: [
      { text: "Offer enteric-coated pancreatin for people with unresectable pancreatic cancer.", source: NG85 },
      { text: "Consider enteric-coated pancreatin before and after pancreatic cancer resection.", source: NG85 },
      { text: "Consider EUS-guided or image-guided percutaneous neurolytic coeliac plexus block to manage pain for people with pancreatic cancer who: have uncontrolled pancreatic pain or are experiencing unacceptable opioid adverse effects or are receiving escalating doses of analgesics.", source: NG85 },
      { text: "Throughout the person's care, assess the psychological impact of: fatigue pain gastrointestinal symptoms (including changes to appetite) nutrition anxiety depression.", source: NG85 },
    ],
    meaning: "Pancreatic enzyme capsules with every meal, a dietitian early, pain relief that can include a nerve block, and attention to mood are in the guideline for everyone, not only for those who cannot have surgery. Ask for the enzymes and the dietitian at the first appointment: they are the most fixable causes of feeling terrible.",
    questions: ["Should I be taking pancreatic enzymes now, and how much?", "Can I see the dietitian and, if I have pain, the pain or palliative care team this week?"],
    links: [LINKS.nutrition, LINKS.pain, LINKS.palliative] },

  { id: "team", title: "The decision is made with you by the specialist pancreatic cancer team", tone: "info",
    quotes: [
      { text: "A specialist pancreatic cancer multidisciplinary team should make a shared decision with the person about the care that is needed.", source: NG85 },
      { text: "For people with newly diagnosed pancreatic cancer who have not had a pancreatic protocol CT scan, offer a pancreatic protocol CT scan that includes the chest, abdomen and pelvis.", source: NG85 },
      { text: "Some people might want to get a second opinion before starting treatment. You can ask your specialist or GP to refer you to a doctor or surgeon specialising in pancreatic cancer.", source: CRUK_DECISIONS },
    ],
    meaning: "The class your scan is given is a judgement made by a specialist team on a pancreas-protocol CT, and Pancreatic Cancer UK says different teams can disagree about whether surgery is possible. Ask for the plan in writing, the name and number of your clinical nurse specialist, and, if the class is borderline or uncertain, whether a specialist pancreatic centre has looked at the scan.",
    questions: ["Has my scan been reviewed at the specialist pancreatic multidisciplinary team meeting?", "Who is my key worker, and what is the 24-hour number?"],
    links: [LINKS.first60, LINKS.cancer] },
];

function decide(a: Answers): string[] {
  const out: string[] = [];
  const fit = a.fitness === "fit";
  const canHaveCombination = a.fitness !== "not-fit";
  const jaundice = a.jaundice === "yes";
  if (a.stage === "resectable") {
    if (fit) {
      out.push("surgery-first");
      if (jaundice) out.push("resectable-jaundice-no-drain");
    } else {
      out.push("not-fit-for-surgery");
      if (jaundice) out.push("resectable-jaundice-stent");
    }
    if (canHaveCombination) out.push("after-surgery-chemo");
    out.push("bypass-if-unresectable-at-surgery");
  } else if (a.stage === "borderline") {
    out.push("borderline-chemo-first");
    if (!fit) out.push("not-fit-for-surgery");
    if (jaundice) out.push("jaundice-before-chemo-stent");
    if (canHaveCombination) out.push("after-surgery-chemo");
    out.push("bypass-if-unresectable-at-surgery");
  } else if (a.stage === "locally-advanced") {
    out.push(canHaveCombination ? "locally-advanced-chemo" : "la-not-fit");
    if (jaundice) out.push("unresectable-jaundice-stent");
  } else {
    out.push(fit ? "metastatic-fit" : a.fitness === "less-fit" ? "metastatic-less-fit" : "metastatic-not-fit");
    if (jaundice) out.push("unresectable-jaundice-stent");
    if (canHaveCombination) out.push("second-line");
  }
  out.push("supportive-throughout");
  out.push("team");
  return out;
}

export const pancreaticFirstTreatmentTool: DecisionTool = {
  id: "pancreatic-first-treatment",
  cancerId: "pancreatic",
  entityIds: ["pancreatic", "resectable-pdac", "borderline-resectable-pdac", "locally-advanced-pdac", "metastatic-pdac", "resectability"],
  title: "Pancreatic cancer at diagnosis: what the resectability class, jaundice and fitness usually mean for the order of treatment",
  short: "First treatment aid",
  lede: "Enter the class the team gave your scan (resectable, borderline resectable, locally advanced or metastatic), whether you have jaundice, and how well you are, and read the statements that apply, quoted word for word from NICE NG85, the NICE appraisals and UK patient pages. An educational aid to prepare for the conversation with your team, not advice. Nothing you enter leaves this page.",
  icon: "compass",
  guideline: NG85,
  sources: [NG85, TA476, TA440, CRUK_DECISIONS, PCUK_WHO, PCUK_STENT, NHS_TREATMENT, ROW_NCCN],
  asOf,
  inputs: [
    { id: "stage", label: "The class the multidisciplinary team gave your scan", hint: "Resectable: the surgeon can remove it. Borderline resectable: it touches a main vein or artery, so surgery straight away is uncertain. Locally advanced: it has grown around the vessels and cannot be removed, but has not spread. Metastatic: it has spread to the liver, lungs or lining of the abdomen.", icon: "vessel",
      options: [{ value: "resectable", label: "Resectable" }, { value: "borderline", label: "Borderline resectable" }, { value: "locally-advanced", label: "Locally advanced (unresectable, not spread)" }, { value: "metastatic", label: "Metastatic (spread to other organs)" }] },
    { id: "jaundice", label: "Jaundice now", hint: "Yellow eyes or skin, dark urine, pale stools or itching: the tumour is blocking the bile duct.", icon: "liver",
      options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }] },
    { id: "fitness", label: "How well you are", hint: "Fitness for a major operation and for combination chemotherapy, as your team judges it (performance status). A rough guide, not a score you give yourself.", icon: "age",
      options: [{ value: "fit", label: "Well (performance status 0 to 1)", hint: "Up and about, largely independent" }, { value: "less-fit", label: "Less well: a gentler combination, not FOLFIRINOX or a major operation yet", hint: "Not fit for FOLFIRINOX-type treatment or a major operation yet, but able to have a gentler combination" }, { value: "not-fit", label: "Not well enough for combination chemotherapy" }] },
  ],
  cards,
  decide,
  questions: [
    "Can I have the class written down, with what on the scan decided it, and has a specialist pancreatic centre reviewed it?",
    "Should I be taking pancreatic enzymes now, and can I see a dietitian this week?",
    "Have germline and tumour tests been sent, and what would each result change?",
    "Who is my clinical nurse specialist, and what is the 24-hour number?",
  ],
  notes: [
    "The aid covers the order of treatment NICE NG85 and the OnCo record set out at diagnosis; it does not cover which chemotherapy regimen suits you, radiotherapy details, targeted drugs for rare tumour changes, or trials, which are on the decisions page.",
    "NICE NG85 was written in 2018 and places chemotherapy before surgery for resectable and borderline disease within clinical trials; UK practice for borderline disease has moved to chemotherapy first, and the OnCo record reflects that. Where the two differ the cards show both.",
    "The resectability class is a judgement made by a specialist team on a pancreas-protocol CT; the NCCN definitions the OnCo subtype records paraphrase are not quoted here because the NCCN text is behind a login.",
    "Nothing you enter is stored or sent anywhere.",
  ],
  links: [LINKS.decisions, LINKS.first60, LINKS.resectability, LINKS.whipple, LINKS.stenting, LINKS.cancer],
};
