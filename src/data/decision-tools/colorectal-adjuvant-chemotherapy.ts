import type { Answers, DecisionTool, ToolCard, ToolSource } from "@/lib/decision-tools";

/**
 * CHEMOTHERAPY AFTER SURGERY FOR BOWEL CANCER: what NICE NG151 says, by site, stage, what was given before the
 * operation and fitness for oxaliplatin. The guideline is explicit for stage 3 disease and silent for stage 1 and
 * stage 2, and the aid says so rather than filling the gap: where NG151 makes no recommendation the card quotes the
 * recommendations it does make about information and shared decision making, and points at the multidisciplinary team.
 *
 * Sources, all quoted word for word and all read 24 September 2026:
 *   NICE NG151 (2020, last updated December 2021, with later amendments including the August 2025 off-label notes),
 *     colorectal cancer: 1.2 information for people with colorectal cancer, 1.3.3 to 1.3.5 early and preoperative
 *     treatment for rectal cancer, 1.3.15 adjuvant therapy for rectal cancer, 1.3.16 preoperative therapy for colon
 *     cancer, 1.3.18 adjuvant therapy for colon cancer, 1.6.1 follow-up, 1.6.2 low anterior resection syndrome
 *   the colorectal record's own standard-of-care rows (src/data/spikes/colorectal.ts), quoted and kept equal to the
 *     data by src/lib/decision-tools.test.ts
 *
 * The aid does not weigh, score or predict. It does not give an absolute benefit figure for an individual, because
 * NG151 gives none: the guideline asks teams to base the choice on histopathology, performance status, personal
 * preferences, comorbidities and age, and that conversation is what the aid is for.
 */
const asOf = "2026-09-24";

const NG151: ToolSource = { label: "NICE NG151: colorectal cancer, recommendations (January 2020, last updated December 2021)", url: "https://www.nice.org.uk/guidance/ng151/chapter/Recommendations" };
const ROW_SOURCE: ToolSource = { label: "OnCo standard-of-care rows for colorectal cancer (src/data/spikes/colorectal.ts), written from the NCCN Guidelines for colon and rectal cancer", url: "https://www.nccn.org/guidelines/guidelines-detail?category=1&id=1428" };

/** Row text quoted from the colorectal record; src/lib/decision-tools.test.ts keeps this equal to the data. */
export const QUOTED_COLORECTAL_ROWS: Record<string, string> = {
  "Stage I-II colon": "Surgical resection; observation for stage I and low-risk stage II. High-risk stage II (T4, obstruction, <12 nodes, LVI): consider 3-6 months fluoropyrimidine ± oxaliplatin; ctDNA-negative patients can safely omit (DYNAMIC). dMMR stage II derives no benefit from 5-FU alone.",
  "Stage III colon, pMMR": "Resection then adjuvant CAPOX for 3 months (T1-3 N1, low risk) or FOLFOX/CAPOX for 6 months (T4 or N2), per IDEA.",
};

const LINKS = {
  cancer: { label: "Colorectal cancer", href: "/cancers/colorectal/" },
  decisions: { label: "Colorectal cancer decisions", href: "/cancers/colorectal/decisions/" },
  first60: { label: "The first 60 days", href: "/first-60-days/colorectal/" },
  prep: { label: "Appointment sheet", href: "/prep/colorectal/" },
  colon: { label: "Colon cancer", href: "/cancers/colon-cancer/" },
  rectal: { label: "Rectal cancer", href: "/cancers/rectal-cancer/" },
  msiHigh: { label: "Mismatch repair deficient colorectal cancer", href: "/cancers/msi-high-colorectal/" },
  capox: { label: "CAPOX", href: "/drugs/capox/" },
  folfox: { label: "FOLFOX", href: "/drugs/folfox/" },
  capecitabine: { label: "Capecitabine", href: "/drugs/capecitabine/" },
  oxaliplatin: { label: "Oxaliplatin", href: "/drugs/oxaliplatin/" },
  neuropathy: { label: "Peripheral neuropathy", href: "/terms/peripheral-neuropathy/" },
  msi: { label: "Microsatellite instability and mismatch repair", href: "/terms/msi/" },
  ctdna: { label: "Circulating tumour DNA", href: "/terms/ctdna/" },
  stoma: { label: "Stoma", href: "/terms/stoma/" },
  tme: { label: "Total mesorectal excision", href: "/terms/total-mesorectal-excision/" },
  tnt: { label: "Total neoadjuvant therapy", href: "/terms/total-neoadjuvant-therapy/" },
  organPreservation: { label: "Organ preservation and watch and wait", href: "/terms/organ-preservation/" },
  cea: { label: "CEA surveillance after surgery", href: "/technologies/cea-surveillance-colorectal/" },
  mdt: { label: "Multidisciplinary tumour boards", href: "/technologies/multidisciplinary-tumour-board/" },
  pharmacogenomics: { label: "Pharmacogenomic testing before chemotherapy", href: "/technologies/oncology-pharmacogenomics/" },
  dynamic: { label: "DYNAMIC", href: "/trials/dynamic/" },
};

const cards: ToolCard[] = [
  {
    id: "colon-stage3-capox",
    title: "Stage 3 colon cancer: three months of CAPOX, or the alternatives if it is not suitable",
    tone: "discuss",
    quotes: [
      { text: "For people with stage 3 colon cancer (pT1-4, pN1-2, M0), offer: capecitabine in combination with oxaliplatin (CAPOX) for 3 months, or if this is not suitable either: oxaliplatin in combination with 5-fluorouracil and folinic acid (FOLFOX) for 3 to 6 months, or single-agent fluoropyrimidine (for example, capecitabine) for 6 months.", source: NG151 },
      { text: `Stage III colon, pMMR: ${QUOTED_COLORECTAL_ROWS["Stage III colon, pMMR"]}`, source: ROW_SOURCE },
    ],
    meaning: "Cancer in the lymph nodes is where chemotherapy after surgery has the clearest benefit, and NICE names CAPOX for three months as the first option. Three months of the two-drug combination and six months of the single tablet are both in the guideline, so the length and the number of drugs are genuinely open to discussion.",
    questions: ["Three months of CAPOX or six months of capecitabine: which are you recommending for me, and why?", "How soon after my operation would it start, and what if I am still recovering?"],
    links: [LINKS.capox, LINKS.folfox, LINKS.capecitabine, LINKS.colon],
  },
  {
    id: "rectal-stage3-capox",
    title: "Stage 3 rectal cancer after short-course radiotherapy or no preoperative treatment: the same offer",
    tone: "discuss",
    quotes: [
      { text: "For people with stage 3 rectal cancer (pT1-4, pN1-2, M0) treated with short-course radiotherapy or no preoperative treatment, offer: capecitabine in combination with oxaliplatin (CAPOX) for 3 months, or if this is not suitable either: oxaliplatin in combination with 5-fluorouracil and folinic acid (FOLFOX) for 3 to 6 months, or single-agent fluoropyrimidine (for example, capecitabine) for 6 months.", source: NG151 },
    ],
    meaning: "For rectal cancer the guideline attaches its adjuvant recommendation to what happened before the operation. Where the preoperative treatment was short-course radiotherapy, or there was none, the offer is the same as for colon cancer.",
    questions: ["Was my preoperative treatment short-course radiotherapy or long-course chemoradiotherapy, and does that change what you are offering now?"],
    links: [LINKS.capox, LINKS.folfox, LINKS.rectal, LINKS.tme],
  },
  {
    id: "rectal-after-chemoradiotherapy",
    title: "Stage 3 rectal cancer after long-course chemoradiotherapy: outside the wording of the recommendation",
    tone: "refer",
    quotes: [
      { text: "For people with stage 3 rectal cancer (pT1-4, pN1-2, M0) treated with short-course radiotherapy or no preoperative treatment, offer: capecitabine in combination with oxaliplatin (CAPOX) for 3 months, or if this is not suitable either: oxaliplatin in combination with 5-fluorouracil and folinic acid (FOLFOX) for 3 to 6 months, or single-agent fluoropyrimidine (for example, capecitabine) for 6 months.", source: NG151 },
      { text: "Give people information on all treatment options for colorectal cancer available to them, including: surgery, radiotherapy, systemic anticancer therapy or palliative care, the potential benefits, risks, side effects and implications of treatments, for example, possible effects on bowel and sexual function, quality of life and independence.", source: NG151 },
    ],
    meaning: "NICE wrote its adjuvant recommendation for rectal cancer treated with short-course radiotherapy or with nothing before the operation, so if you had long-course chemoradiotherapy the recommendation does not literally cover you. Chemotherapy afterwards is still commonly given, and UK practice has moved towards giving the chemotherapy before the operation instead, so this is a decision for your team to explain rather than a rule to look up.",
    questions: ["Since the guideline wording does not cover my situation, what are you basing the recommendation on?", "Would the chemotherapy have been better given before the operation, and does that change what happens now?"],
    links: [LINKS.tnt, LINKS.rectal, LINKS.mdt],
  },
  {
    id: "no-oxaliplatin",
    title: "If oxaliplatin is not suitable: six months of a single fluoropyrimidine",
    tone: "discuss",
    quotes: [
      { text: "capecitabine in combination with oxaliplatin (CAPOX) for 3 months, or if this is not suitable either: oxaliplatin in combination with 5-fluorouracil and folinic acid (FOLFOX) for 3 to 6 months, or single-agent fluoropyrimidine (for example, capecitabine) for 6 months.", source: NG151 },
      { text: "Emphasise to people the importance of monitoring and managing side effects during non-surgical treatment to try to prevent permanent damage (for example, monitoring prolonged sensory symptoms after platinum-based chemotherapy treatment, which can be a sign that the dose needs to be reduced to minimise future permanent peripheral neuropathy).", source: NG151 },
    ],
    meaning: "The guideline builds in an alternative for people who should not have oxaliplatin, whether because of existing nerve damage, age, other illnesses or preference: a single fluoropyrimidine, usually capecitabine tablets, for six months. It also asks teams to watch sensory symptoms during treatment, because a dose reduction at the right moment is what prevents permanent neuropathy.",
    questions: ["What do I give up by leaving oxaliplatin out, in plain numbers if you have them?", "If I start oxaliplatin and the tingling gets worse, at what point would you reduce or stop it?"],
    links: [LINKS.capecitabine, LINKS.oxaliplatin, LINKS.neuropathy],
  },
  {
    id: "duration-choice",
    title: "How the length and the combination are meant to be chosen",
    tone: "info",
    quotes: [
      { text: "Base the choice on the person's histopathology (for example pT1-T3 and pN1, and pT4 and/or pN2), performance status, personal preferences, any comorbidities and age.", source: NG151 },
    ],
    meaning: "NICE names your preferences in the same sentence as the pathology report, which is unusual and worth using. Lower-risk node-positive disease (pT1 to T3 with pN1) tends towards the shorter course, higher-risk disease (pT4 or pN2) towards the longer one, and how much neuropathy you are willing to risk is a legitimate part of the answer.",
    questions: ["Where does my pathology report sit: pT1 to T3 with pN1, or pT4 or pN2?", "If I choose the shorter course, what am I trading away?"],
    links: [LINKS.decisions, LINKS.prep],
  },
  {
    id: "off-label-note",
    title: "Some of these are used off-label, and NICE says so",
    tone: "info",
    quotes: [
      { text: "In August 2025, the use of some treatments was off label: capecitabine in combination with oxaliplatin (though CAPOX is common in UK clinical practice) capecitabine for 3 months' duration of adjuvant treatment.", source: NG151 },
    ],
    meaning: "Off-label means the licence was written before the evidence caught up, not that the treatment is experimental. NICE flags it so the conversation about consent is an honest one, and notes in the same breath that CAPOX is common UK practice.",
    questions: ["Is anything you are proposing off-label, and what does that mean for me in practice?"],
    links: [LINKS.capox, LINKS.capecitabine],
  },
  {
    id: "stage2-no-recommendation",
    title: "Stage 2: NICE makes no adjuvant recommendation, so this is a conversation about your own risk",
    tone: "discuss",
    quotes: [
      { text: "Give people information on all treatment options for colorectal cancer available to them, including: surgery, radiotherapy, systemic anticancer therapy or palliative care, the potential benefits, risks, side effects and implications of treatments, for example, possible effects on bowel and sexual function, quality of life and independence.", source: NG151 },
      { text: `Stage I-II colon: ${QUOTED_COLORECTAL_ROWS["Stage I-II colon"]}`, source: ROW_SOURCE },
    ],
    meaning: "NG151's adjuvant recommendations are written for stage 3 only. For node-negative disease the guideline is silent, so the decision runs on the risk features in your pathology report (a T4 tumour, a blocked or perforated bowel, fewer than 12 nodes examined, invasion of lymphatic or blood vessels), on the mismatch repair result, and increasingly on whether tumour DNA can still be found in your blood after the operation. Ask for the absolute numbers rather than percentages of a percentage.",
    questions: ["Which high-risk features does my pathology report have, and what does each add to the risk?", "What is my risk of recurrence with and without chemotherapy, as numbers out of 100?", "Is my tumour mismatch repair deficient, and does that change the answer?", "Is a ctDNA-guided trial open to me?"],
    links: [LINKS.msi, LINKS.ctdna, LINKS.dynamic, LINKS.msiHigh],
  },
  {
    id: "stage1-colon",
    title: "Stage 1 colon cancer: the operation is the treatment",
    tone: "stop",
    quotes: [
      { text: "Laparoscopic resection is recommended as an alternative to open resection for treating colon cancer when both techniques are considered suitable.", source: NG151 },
      { text: `Stage I-II colon: ${QUOTED_COLORECTAL_ROWS["Stage I-II colon"]}`, source: ROW_SOURCE },
    ],
    meaning: "For a stage 1 colon cancer removed with clear margins, NICE makes no recommendation for chemotherapy afterwards, and the OnCo record describes observation. What follows the operation is surveillance rather than treatment.",
    questions: ["Is anything about my pathology report unexpected enough to change this?", "What does my follow-up look like from here?"],
    links: [LINKS.colon, LINKS.cea],
  },
  {
    id: "stage1-rectal",
    title: "Stage 1 rectal cancer: a shared decision between three operations, and no radiotherapy outside a trial",
    tone: "discuss",
    quotes: [
      { text: "Offer one of the treatments shown in table 1 to people with early rectal cancer (cT1-T2, cN0, M0) after discussing the implications of each treatment and reaching a shared decision with the person about the best option.", source: NG151 },
      { text: "Do not offer preoperative radiotherapy to people with early rectal cancer (cT1-T2 cN0, M0), unless as part of a clinical trial.", source: NG151 },
    ],
    meaning: "For early rectal cancer NICE puts three operations side by side (transanal excision, endoscopic submucosal dissection and total mesorectal excision) and compares them in a table on the points patients actually ask about: whether bowel is removed, whether a stoma may be needed, the hospital stay, scarring and the complications of each. Radiotherapy before the operation is only for a trial.",
    questions: ["Which of the three operations are you offering, and what does the NICE table say about each for me?", "Would further surgery be needed depending on what the pathology shows?"],
    links: [LINKS.rectal, LINKS.tme, LINKS.stoma],
  },
  {
    id: "rectal-lars",
    title: "Rectal surgery: ask about low anterior resection syndrome before, not after",
    tone: "info",
    quotes: [
      { text: "Give information on low anterior resection syndrome (LARS) to people who will potentially have sphincter-preserving surgery. Advise them to seek help from primary care if they think they have symptoms of LARS, such as: increased frequency of stool, urgency with or without incontinence of stool, feeling of incomplete emptying of the bowels, fragmentation of stool (passing small amounts little and often), difficulty in differentiating between gas and stool.", source: NG151 },
      { text: "Offer treatment (such as dietary management, laxatives, anti-bulking agents, anti-diarrhoeal agents, or anti-spasmodic agents) in primary care to people with bowel dysfunction symptoms associated with LARS. Seek advice from secondary care if the treatment is not successful.", source: NG151 },
    ],
    meaning: "Bowel function after rectal surgery is the effect people most often say they were not warned about. NICE requires the warning in advance, asks for the LARS score to be used to measure it, and names the treatments a GP can start, so it is neither inevitable nor untreatable.",
    questions: ["What is my likely bowel function after this operation, in the first months and in a year?", "Who do I go to if it does not settle: my GP, the surgeon or a continence nurse?"],
    links: [LINKS.organPreservation, LINKS.rectal],
  },
  {
    id: "stoma-information",
    title: "Whether you will need a stoma, and for how long",
    tone: "info",
    quotes: [
      { text: "Advise people with colorectal cancer of possible reasons why their treatment plan might need to change during their care, including: changes from laparoscopic to open surgery or curative to non-curative treatment, and why this change may be the most suitable option for them, the likelihood of having a stoma, why it might be necessary and for how long it might be needed.", source: NG151 },
      { text: "Ensure that appropriate specialists discuss possible side effects with people who have had surgery for colorectal cancer, including: altered bowel, urinary and sexual function, physical changes, including anal discharge or bleeding. If relevant, have a trained stoma professional provide information on the care and management of stomas and on learning to live with a stoma.", source: NG151 },
    ],
    meaning: "NICE puts three things in writing: that you should be told how likely a stoma is and for how long, that the plan can change during the operation, and that a trained stoma professional should teach you to live with it. Meeting the stoma nurse before the operation is part of the standard, not a favour.",
    questions: ["What is the chance I wake up with a stoma, and would it be temporary or permanent?", "When would a temporary stoma be reversed, and what decides that?", "Can I meet the stoma nurse before the operation and have the site marked?"],
    links: [LINKS.stoma, LINKS.first60],
  },
  {
    id: "dpd-and-monitoring",
    title: "Before the first dose: the DPD test, and what to report during treatment",
    tone: "watch",
    quotes: [
      { text: "Emphasise to people the importance of monitoring and managing side effects during non-surgical treatment to try to prevent permanent damage (for example, monitoring prolonged sensory symptoms after platinum-based chemotherapy treatment, which can be a sign that the dose needs to be reduced to minimise future permanent peripheral neuropathy).", source: NG151 },
      { text: "Give people who have had treatments for colorectal cancer information about possible short-term, long-term, permanent and late side effects which can affect quality of life, including: pain, altered bowel, urinary or sexual function, nerve damage and neuropathy, mental and emotional changes, including anxiety, depression, chemotherapy-related cognitive impairment, and changes to self-perception and social identity.", source: NG151 },
    ],
    meaning: "Every one of these options contains a fluoropyrimidine, so a DPD blood test comes first: low DPD has no symptoms of its own and raises the risk of severe toxicity. During treatment, tingling in the fingers and toes is the symptom to report at every visit rather than at the end, because that is when the dose can still be changed.",
    questions: ["Has my DPD test been done, and what was the result?", "Who do I tell about tingling, and how quickly?"],
    links: [LINKS.pharmacogenomics, LINKS.neuropathy],
  },
  {
    id: "follow-up",
    title: "After treatment: three years of CEA blood tests and CT scans",
    tone: "watch",
    quotes: [
      { text: "For people who have had potentially curative surgical treatment for non-metastatic colorectal cancer, offer follow-up for detection of local recurrence and distant metastases for the first 3 years. Follow-up should include serum carcinoembryonic antigen (CEA) and CT scan of the chest, abdomen and pelvis.", source: NG151 },
      { text: "Help people prepare for discharge after treatment for colorectal cancer by giving them advice on: adapting physical activity to maintain their quality of life, diet, including advice on foods that can cause or contribute to bowel problems such as diarrhoea, flatulence, incontinence and difficulty in emptying the bowels, stopping smoking, how long their recovery might take, how, when and where to seek help if side effects become problematic.", source: NG151 },
    ],
    meaning: "Follow-up is a named part of the plan for the first three years, not something to chase. The same recommendation covers what you should be told at discharge: activity, diet, recovery time and where to go when something goes wrong.",
    questions: ["What is my follow-up schedule, who arranges it, and what happens after three years?", "What symptoms should bring me back between appointments?"],
    links: [LINKS.cea, LINKS.first60],
  },
  {
    id: "team",
    title: "The decision belongs to you and your team",
    tone: "refer",
    quotes: [
      { text: "Give people information on all treatment options for colorectal cancer available to them, including: surgery, radiotherapy, systemic anticancer therapy or palliative care, the potential benefits, risks, side effects and implications of treatments, for example, possible effects on bowel and sexual function, quality of life and independence.", source: NG151 },
    ],
    meaning: "This aid quotes a guideline; it does not know your pathology report, your other illnesses or what matters to you. Take the statements above to the appointment and ask which apply, and what your team would do differently and why.",
    questions: ["Which of these recommendations apply to me, and where does my plan depart from them?", "Can I have the plan in writing, with the reasons?"],
    links: [LINKS.decisions, LINKS.cancer, LINKS.mdt],
  },
];

function decide(a: Answers): string[] {
  const out: string[] = [];
  const rectum = a.site === "rectum";
  const oxaliplatin = a.oxaliplatin === "suitable";
  const afterChemoradiotherapy = a.preop === "chemoradiotherapy";

  if (a.stage === "stage3") {
    if (rectum && afterChemoradiotherapy) {
      out.push("rectal-after-chemoradiotherapy");
    } else {
      out.push(rectum ? "rectal-stage3-capox" : "colon-stage3-capox");
      if (!oxaliplatin) out.push("no-oxaliplatin");
      out.push("duration-choice", "off-label-note");
    }
  } else if (a.stage === "stage2") {
    out.push("stage2-no-recommendation");
    if (!oxaliplatin) out.push("no-oxaliplatin");
  } else {
    out.push(rectum ? "stage1-rectal" : "stage1-colon");
  }

  if (rectum) out.push("rectal-lars", "stoma-information");
  if (a.stage !== "stage1") out.push("dpd-and-monitoring");
  out.push("follow-up", "team");
  return out;
}

export const colorectalAdjuvantChemotherapyTool: DecisionTool = {
  id: "colorectal-adjuvant-chemotherapy",
  cancerId: "colorectal",
  entityIds: ["colorectal", "colon-cancer", "rectal-cancer", "msi-high-colorectal", "colectomy", "total-mesorectal-excision", "stoma", "peripheral-neuropathy"],
  title: "Chemotherapy after surgery for bowel cancer: what NICE NG151 says by site, stage and fitness for oxaliplatin",
  short: "After surgery aid",
  lede: "Enter where the cancer was, the stage on your pathology report, what was given before the operation and whether oxaliplatin is suitable for you, and read the statements that apply, quoted word for word from NICE NG151. An educational aid to prepare for the conversation with your team, not advice. Nothing you enter leaves this page.",
  icon: "compass",
  guideline: NG151,
  sources: [NG151, ROW_SOURCE],
  asOf,
  inputs: [
    {
      id: "site", label: "Where the cancer was", hint: "The rectum is the last 15 cm or so of the large bowel; anything above that is the colon. NICE writes separate recommendations for the two.", icon: "shape",
      options: [{ value: "colon", label: "Colon" }, { value: "rectum", label: "Rectum" }],
    },
    {
      id: "stage", label: "Stage on the pathology report", hint: "Stage 1 means the cancer stayed within the bowel wall. Stage 2 means it grew through the wall but no lymph nodes are involved. Stage 3 means cancer was found in lymph nodes (pN1 or pN2).", icon: "layers",
      options: [
        { value: "stage1", label: "Stage 1 (no nodes, within the bowel wall)" },
        { value: "stage2", label: "Stage 2 (through the wall, no nodes)" },
        { value: "stage3", label: "Stage 3 (cancer in the lymph nodes)" },
      ],
    },
    {
      id: "preop", label: "Treatment before the operation", hint: "Mostly a rectal cancer question: NICE attaches its adjuvant recommendation for rectal cancer to short-course radiotherapy or no preoperative treatment, and says nothing about the situation after long-course chemoradiotherapy.", icon: "clock",
      options: [
        { value: "none-or-short", label: "None, or short-course radiotherapy" },
        { value: "chemoradiotherapy", label: "Long-course chemoradiotherapy" },
      ],
    },
    {
      id: "oxaliplatin", label: "Is oxaliplatin suitable for you", hint: "Existing nerve damage, kidney or heart problems, age, other illnesses and your own preference all count. Your team decides this with you; it is not a score you give yourself.", icon: "question",
      options: [
        { value: "suitable", label: "Yes, or not yet discussed" },
        { value: "not-suitable", label: "No, or I would rather avoid it" },
      ],
    },
  ],
  cards,
  decide,
  questions: [
    "Can I have a copy of my pathology report, with the T stage, the number of nodes examined and the number involved?",
    "Was my tumour tested for mismatch repair or microsatellite instability, and what was the result?",
    "What would you recommend if I were your relative, and what would change your mind?",
    "Who is my clinical nurse specialist, and what is the 24-hour number?",
  ],
  notes: [
    "The aid covers what NICE NG151 says about chemotherapy after surgery for bowel cancer that has not spread. It does not cover treatment for cancer that has spread, rectal cancer before the operation, watch and wait after a complete response, or the targeted drugs and immunotherapy, which are on the decisions page.",
    "NICE NG151 makes adjuvant recommendations for stage 3 disease only. For stage 1 and stage 2 it makes none, so the cards say so and point at the pathology report, the mismatch repair result and the multidisciplinary team rather than inventing a rule.",
    "No absolute benefit figure is given here for an individual. NG151 gives none, and a number carried over from a trial population is not your number.",
    "Nothing you enter is stored or sent anywhere.",
  ],
  links: [LINKS.decisions, LINKS.first60, LINKS.prep, LINKS.colon, LINKS.rectal, LINKS.cancer],
};
