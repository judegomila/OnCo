import type { Answers, DecisionTool, ToolCard, ToolSource } from "@/lib/decision-tools";

/**
 * SURGERY OR RADIOTHERAPY FOR LUNG CANCER THAT HAS NOT SPREAD: what NICE NG122 says, by stage, by what the breathing
 * tests show, and by whether you want an operation. This is the one decision in lung cancer where the guideline is
 * genuinely rule-based: NG122 names lobectomy as the first offer for people well enough for treatment with curative
 * intent, names stereotactic ablative radiotherapy and sublobar resection as the offer when a lobectomy is declined
 * or contraindicated, names stereotactic ablative radiotherapy when any surgery is declined or contraindicated, and
 * sets out the lung function and fitness tests that decide which of those sentences applies to you.
 *
 * Sources, all quoted word for word and all read 25 September 2026:
 *   NICE NG122 (lung cancer: diagnosis and management, March 2019, last updated March 2024), management chapter:
 *     1.3.1 to 1.3.3 stop smoking interventions, 1.4.1 perioperative mortality, 1.4.9 to 1.4.14 lung function,
 *     1.5.1 to 1.5.12 surgery and radiotherapy with curative intent, 1.6.1 to 1.6.18 multimodality treatment.
 *   NICE NG122, diagnosis and staging chapter: 1.2.4 PET-CT before treatment with curative intent.
 *
 * The aid does not weigh, score or predict. It gives no personal survival figure, because NG122 gives none: the
 * guideline asks for a global risk score such as Thoracoscore to be calculated for you by your team, and for you to
 * be told that number before you consent. Where the person's preference is the deciding factor, the guideline says
 * so in its own words ("decline lobectomy", "decline any surgery", "if they accept the risks"), and the cards keep
 * that wording rather than smoothing it away.
 */
const asOf = "2026-09-25";

const NG122: ToolSource = { label: "NICE NG122: lung cancer, management (March 2019, last updated March 2024)", url: "https://www.nice.org.uk/guidance/ng122/chapter/Management" };
const NG122_DX: ToolSource = { label: "NICE NG122: lung cancer, diagnosis and staging (March 2019, last updated March 2024)", url: "https://www.nice.org.uk/guidance/ng122/chapter/Diagnosis-and-staging" };

const LINKS = {
  cancer: { label: "Non-small-cell lung cancer", href: "/cancers/nsclc/" },
  lung: { label: "Lung cancer (all types)", href: "/cancers/lung-cancer/" },
  decisions: { label: "Lung cancer decisions", href: "/cancers/lung-cancer/decisions/" },
  first60: { label: "The first 60 days", href: "/first-60-days/lung-cancer/" },
  prep: { label: "Appointment sheet", href: "/prep/lung-cancer/" },
  lobectomy: { label: "Lobectomy", href: "/terms/lobectomy/" },
  segmentectomy: { label: "Segmentectomy (sublobar resection)", href: "/terms/segmentectomy/" },
  pneumonectomy: { label: "Pneumonectomy", href: "/terms/pneumonectomy/" },
  sbrt: { label: "Stereotactic radiotherapy (SABR)", href: "/technologies/sbrt/" },
  petct: { label: "PET/CT", href: "/technologies/pet-ct/" },
  durvalumab: { label: "Durvalumab", href: "/drugs/durvalumab/" },
  nivolumab: { label: "Nivolumab", href: "/drugs/nivolumab/" },
  pembrolizumab: { label: "Pembrolizumab", href: "/drugs/pembrolizumab/" },
  osimertinib: { label: "Osimertinib", href: "/drugs/osimertinib/" },
  alectinib: { label: "Alectinib", href: "/drugs/alectinib/" },
  performance: { label: "Performance status", href: "/terms/performance-status/" },
  pneumonitis: { label: "Radiation pneumonitis", href: "/terms/radiation-pneumonitis/" },
  prehab: { label: "Prehabilitation before surgery", href: "/technologies/prehabilitation/" },
  mdt: { label: "Multidisciplinary tumour boards", href: "/technologies/multidisciplinary-tumour-board/" },
};

const cards: ToolCard[] = [
  {
    id: "lobectomy-offer",
    title: "Stage 1 to 2a and well enough for an operation: NICE offers a lobectomy first",
    tone: "surgery",
    quotes: [
      { text: "For people with NSCLC who are well enough and for whom treatment with curative intent is suitable, offer lobectomy (either open or thoracoscopic).", source: NG122 },
      { text: "Offer people surgery if they have a forced expiratory volume in 1 second (FEV1) within normal limits and good exercise tolerance.", source: NG122 },
      { text: "Offer more extensive surgery (bronchoangioplastic surgery, bilobectomy, pneumonectomy) only when needed to obtain clear margins.", source: NG122 },
    ],
    meaning: "Removing the lobe containing the cancer, either through a keyhole approach or an open operation, is what NICE offers first when your breathing and general fitness allow it. Its own reasoning is that a lobectomy gives better survival than stereotactic radiotherapy and is a good compromise between keeping lung function and taking out all the cancer. Anything larger than a lobe should have a stated reason, which is clear margins.",
    questions: ["Would this be keyhole or open, and what decides that?", "Is there any chance it turns into a larger operation once you are in there?", "How many of these do you and this unit do each year?"],
    links: [LINKS.lobectomy, LINKS.pneumonectomy, LINKS.prehab],
  },
  {
    id: "sublobar-or-sabr",
    title: "Stage 1 to 2a where a lobectomy is difficult: a smaller operation or stereotactic radiotherapy",
    tone: "discuss",
    quotes: [
      { text: "For people with stage 1 to 2a (T1a to T2b, N0, M0) NSCLC who decline lobectomy or in whom it is contraindicated, offer radical radiotherapy with stereotactic ablative radiotherapy (SABR) or sublobar resection.", source: NG122 },
      { text: "if they decline lobectomy or it is contraindicated, sublobar resection and SABR both provide better survival outcomes than conventionally fractionated radiotherapy, although it is not clear which of these 2 is better", source: NG122 },
    ],
    meaning: "Where a full lobectomy is too much, NICE puts two options side by side and says openly that the evidence does not establish which is better. A sublobar resection takes less lung but is still an operation; stereotactic radiotherapy is a handful of outpatient visits with no anaesthetic. This is a genuine choice, so the honest question is which one your team is better set up to do and what each would cost you in recovery.",
    questions: ["Which of these two do you recommend for me, and is that about my cancer or about what this hospital does?", "If I have a sublobar resection, how much lung comes out compared with a lobectomy?", "If the radiotherapy does not control it, can I still have an operation later?"],
    links: [LINKS.segmentectomy, LINKS.sbrt, LINKS.lobectomy],
  },
  {
    id: "sabr-if-declining-surgery",
    title: "If you would rather not have an operation at all: NICE offers stereotactic radiotherapy",
    tone: "watch",
    quotes: [
      { text: "For people with stage 1 to 2a (T1a to T2b, N0, M0) NSCLC who decline surgery or in whom any surgery is contraindicated, offer SABR. If SABR is contraindicated, offer either conventional or hyperfractionated radiotherapy.", source: NG122 },
      { text: "SABR is non-invasive, so if it is as effective as surgery then it may be a preferable option for many people with lung cancer. There are also various factors that may make SABR less costly than surgery. For example, it is usually delivered as outpatient treatment.", source: NG122 },
      { text: "If using SABR, follow the SABR Consortium guidance on fractionation.", source: NG122 },
    ],
    meaning: "Declining an operation is a recognised position in the guideline rather than a refusal of treatment: NICE writes a recommendation specifically for it. Stereotactic radiotherapy is given over a small number of outpatient visits, needs no anaesthetic and no hospital stay, and NICE notes that people often prefer it for exactly that reason. It also says the comparison with surgery has not been settled by randomised trials, which is why it has an open research recommendation on it.",
    questions: ["How many visits would it be, and over how long?", "What are the chances it controls the cancer for good?", "What would the effect be on my breathing afterwards?"],
    links: [LINKS.sbrt, LINKS.pneumonitis],
  },
  {
    id: "perioperative-treatment",
    title: "Larger or node-positive disease: treatment before the operation, after it, or both",
    tone: "discuss",
    quotes: [
      { text: "Nivolumab in combination with chemotherapy is recommended as an option for neoadjuvant treatment of resectable (tumours at least 4 cm or node positive) NSCLC.", source: NG122 },
      { text: "Durvalumab in combination with platinum-based chemotherapy is recommended as an option for neoadjuvant (then continued alone as adjuvant) treatment of resectable (tumours at least 4 cm or node positive) NSCLC without epidermal growth factor receptor (EGFR) mutations or anaplastic lymphoma kinase (ALK) rearrangements.", source: NG122 },
      { text: "Offer postoperative systemic anticancer therapy to people with good performance status (WHO 0 or 1) and T1a to 4, N1 to 2, M0 NSCLC.", source: NG122 },
      { text: "For people with stage 3a N2 NSCLC who are having chemoradiotherapy and surgery, ensure that their surgery is scheduled for 3 to 5 weeks after completion of the chemoradiotherapy.", source: NG122 },
    ],
    meaning: "Above the smallest tumours an operation is usually part of a sequence rather than the whole treatment. NICE recommends immunotherapy with chemotherapy before surgery for tumours of at least 4 cm or with nodes involved, chemotherapy after surgery for node-positive disease with good performance status, and a tablet instead where the tumour carries an EGFR or ALK change. Note the durvalumab recommendation excludes EGFR and ALK disease, which is why those results should be back before this is decided.",
    questions: ["Do my EGFR and ALK results have to be back before we choose?", "How many weeks would treatment before surgery add, and what if the cancer grows during it?", "What would the pathology report after the operation change?"],
    links: [LINKS.nivolumab, LINKS.durvalumab, LINKS.pembrolizumab, LINKS.osimertinib, LINKS.alectinib],
  },
  {
    id: "chemoradiotherapy-if-declining-surgery",
    title: "If you decline an operation for stage 2 or 3 disease: chemoradiotherapy with the aim of cure",
    tone: "discuss",
    quotes: [
      { text: "Consider chemoradiotherapy for people with stage 2 or 3 NSCLC whose condition is not suitable for or who decline surgery. Balance potential benefit in survival with the risk of additional toxicities.", source: NG122 },
      { text: "Durvalumab is recommended as an option for treating locally advanced unresectable NSCLC with PD-L1 expression on 1% or more of tumour cells if disease has not progressed after concurrent platinum-based chemoradiation.", source: NG122 },
    ],
    meaning: "Declining surgery for a larger tumour does not mean giving up on cure. NICE names chemoradiotherapy for exactly this situation and, unusually, says in the recommendation itself that the survival benefit has to be balanced against the extra toxicity, which is an invitation to have that conversation rather than a formality.",
    questions: ["What would the side effects of chemoradiotherapy be for me, week by week?", "Would immunotherapy follow, and what is my PD-L1 score?", "If I change my mind about surgery, is it still possible later?"],
    links: [LINKS.durvalumab, LINKS.sbrt, LINKS.mdt],
  },
  {
    id: "assessed-by-both",
    title: "You should be assessed by a thoracic surgeon and by an oncologist, not one or the other",
    tone: "refer",
    quotes: [
      { text: "Ensure that all people whose condition is potentially suitable for multimodality treatment (surgery, radiotherapy and systemic anticancer therapy in any combination) are assessed by a thoracic oncologist and by a thoracic surgeon.", source: NG122 },
      { text: "Multidisciplinary teams that provide chemoradiotherapy with surgery should have expertise in multimodality treatment and in all of the individual components.", source: NG122 },
    ],
    meaning: "Being seen by both a surgeon and an oncologist is the standard for anyone who might have more than one kind of treatment, not a second opinion you have to argue for. If you have only met one of them and both surgery and radiotherapy are being discussed, that is a fair thing to raise.",
    questions: ["Have I been seen by both a thoracic surgeon and a thoracic oncologist?", "What did each of them say, and where did they differ?"],
    links: [LINKS.mdt, LINKS.decisions],
  },
  {
    id: "chemoradiotherapy-then-durvalumab",
    title: "Locally advanced disease that cannot be removed: chemoradiotherapy, then immunotherapy if the scan and the PD-L1 score allow",
    tone: "discuss",
    quotes: [
      { text: "Consider chemoradiotherapy for people with stage 2 or 3 NSCLC whose condition is not suitable for or who decline surgery. Balance potential benefit in survival with the risk of additional toxicities.", source: NG122 },
      { text: "Durvalumab is recommended as an option for treating locally advanced unresectable NSCLC with PD-L1 expression on 1% or more of tumour cells if disease has not progressed after concurrent platinum-based chemoradiation.", source: NG122 },
    ],
    meaning: "Where the cancer cannot be removed but has not spread beyond the chest, the intent is still cure. Chemotherapy and radiotherapy are given together, and if the scan afterwards shows the disease has not progressed and PD-L1 is on 1 percent or more of tumour cells, immunotherapy follows. The side effect that defines this route is inflammation of the lung, which both the radiotherapy and the immunotherapy can cause, with identical symptoms.",
    questions: ["What is my PD-L1 score, and does it let me have durvalumab afterwards?", "If my tumour has an EGFR change, is a different treatment offered after chemoradiotherapy?", "What are the warning signs of lung inflammation, and who do I ring?"],
    links: [LINKS.durvalumab, LINKS.pneumonitis, LINKS.osimertinib],
  },
  {
    id: "radical-radiotherapy-alternative",
    title: "If chemoradiotherapy is too much: radical radiotherapy on its own",
    tone: "discuss",
    quotes: [
      { text: "Consider radical radiotherapy (either conventional or hyperfractionated) for people with stage 3a NSCLC who: are eligible for this treatment and cannot tolerate, or decline, chemoradiotherapy (with or without surgery).", source: NG122 },
      { text: "If conventionally fractionated radical radiotherapy is used, offer either: 55 Gy in 20 fractions over 4 weeks or 60 to 66 Gy, in 30 to 33 fractions, over 6 to 6.5 weeks.", source: NG122 },
      { text: "people who cannot tolerate chemoradiotherapy may also be unable to tolerate radical radiotherapy, so this will not be an option for everyone with stage 3a or 3b NSCLC", source: NG122 },
    ],
    meaning: "Radiotherapy without chemotherapy is a recognised alternative for people who cannot manage or do not want the combination, and NICE names the two standard schedules. It also says plainly that it will not suit everyone who cannot manage chemoradiotherapy, which is worth knowing before you ask for it.",
    questions: ["Is radiotherapy on its own an option for me, and what does it cost me in effectiveness?", "Which schedule would you use, and how many visits is that?"],
    links: [LINKS.sbrt, LINKS.performance],
  },
  {
    id: "predicted-postop-low",
    title: "If your predicted lung function after surgery is low, the guideline hands the decision to you",
    tone: "discuss",
    quotes: [
      { text: "Offer people with predicted postoperative FEV1 or TLCO below 30% the option of treatment with curative intent if they accept the risks of dyspnoea and associated complications.", source: NG122 },
      { text: "Before surgery, perform a functional segment count to predict postoperative lung function.", source: NG122 },
      { text: "Consider shuttle walk testing (using a distance walked of more than 400 m as a cut-off for good function) to assess the fitness of people with moderate to high risk of postoperative dyspnoea.", source: NG122 },
    ],
    meaning: "Low predicted lung function after surgery is not an automatic refusal. NICE says the option of treatment aimed at cure should still be offered if you accept the risk of being more breathless afterwards, which makes this your judgement to make with the numbers in front of you. Ask for the numbers: the predicted FEV1 and transfer factor after the operation, and how far you walked on the shuttle test.",
    questions: ["What is my predicted FEV1 and transfer factor after the operation, as percentages?", "In plain terms, what would that mean for walking, stairs and getting dressed?", "Is there a smaller operation or radiotherapy that would leave me with more breath?"],
    links: [LINKS.segmentectomy, LINKS.sbrt, LINKS.prehab],
  },
  {
    id: "lung-function-tests",
    title: "The tests this decision rests on, and what each is for",
    tone: "info",
    quotes: [
      { text: "Perform spirometry and transfer factor (TLCO) testing before proceeding with treatment with curative intent.", source: NG122 },
      { text: "Consider cardiopulmonary exercise testing to measure oxygen uptake (VO2 max) and assess lung function in people with moderate to high risk of postoperative dyspnoea, using more than 15 ml/kg/minute as a cut-off for good function.", source: NG122 },
      { text: "A clinical oncologist specialising in thoracic oncology should determine suitability for radiotherapy with curative intent, taking into account performance status and comorbidities.", source: NG122 },
    ],
    meaning: "Four numbers decide most of this: how much air you can blow out in a second, how well your lungs move oxygen into the blood, how far you can walk, and what the first two are predicted to be once part of a lung has gone. NICE also asks for pulmonary function tests before radical radiotherapy, so the tests are not only about surgery. Ask for your results in plain language rather than waiting for them to be summarised as fit or unfit.",
    questions: ["What were my spirometry and transfer factor results?", "Have I had, or do I need, a walk test or an exercise test?", "Which number is the one holding the decision up?"],
    links: [LINKS.performance, LINKS.prep],
  },
  {
    id: "thoracoscore-consent",
    title: "Before you sign: you are entitled to your own risk number",
    tone: "info",
    quotes: [
      { text: "When evaluating surgery as an option for people with NSCLC, consider a global risk score such as Thoracoscore to estimate the risk of death. Ensure the person is aware of the risk before they give consent for surgery.", source: NG122 },
      { text: "Seek a cardiology review for people with: an active cardiac condition or 3 or more risk factors or poor cardiac functional capacity.", source: NG122 },
    ],
    meaning: "NICE asks that a risk of death from the operation is estimated for you specifically and that you are told it before you consent. That is a number, not an impression, and asking for it is following the guideline rather than being difficult. Heart problems are assessed separately, and NICE says to avoid surgery within 30 days of a heart attack.",
    questions: ["What is my estimated risk of dying from this operation?", "Do I need a cardiology review first?", "What are the common complications, and how likely is each for me?"],
    links: [LINKS.lobectomy, LINKS.performance],
  },
  {
    id: "pet-ct-first",
    title: "A PET-CT scan should come before treatment aimed at cure",
    tone: "watch",
    quotes: [
      { text: "Ensure that all people with lung cancer who could potentially have treatment with curative intent are offered positron emission tomography CT (PET-CT) before treatment.", source: NG122_DX },
      { text: "Every cancer alliance should have a system of rapid access to PET-CT scanning for people who are eligible for this.", source: NG122_DX },
    ],
    meaning: "A PET-CT finds disease elsewhere that a CT can miss, which is the difference between an operation that cures and an operation that does not. NICE asks for it before any treatment aimed at cure, and asks local services to make it available quickly. If curative treatment is being planned and no PET-CT has been arranged, ask why.",
    questions: ["Have I had a PET-CT, and what did it show?", "Do I need a scan of my brain as well?"],
    links: [LINKS.petct, LINKS.first60],
  },
  {
    id: "stop-smoking",
    title: "Smoking: what the guideline actually says, including that treatment is not conditional",
    tone: "info",
    quotes: [
      { text: "Inform people that smoking increases the risk of pulmonary complications after lung cancer surgery.", source: NG122 },
      { text: "Advise people to stop smoking as soon as the diagnosis of lung cancer is suspected and tell them why this is important.", source: NG122 },
      { text: "Do not postpone surgery for lung cancer to allow people to stop smoking.", source: NG122 },
    ],
    meaning: "Three sentences, and the third is the one that is rarely read out. Stopping smoking is offered because it lowers the chance of lung complications after an operation, and support to do it should be offered with that reason attached. It is not a condition of being treated, and NICE says surgery must not be delayed for it. If you have never smoked, none of this applies to you and the diagnosis is not something you caused either.",
    questions: ["Can you refer me to a stop smoking service today?", "What help is available: patches, medicines, a vape, a local service?", "Does my treatment change at all if I do not manage to stop?"],
    links: [LINKS.prehab, LINKS.first60],
  },
  {
    id: "team",
    title: "The decision belongs to you and your team",
    tone: "refer",
    quotes: [
      { text: "Ensure that a lung cancer clinical nurse specialist is available at all stages of care to support people and (as appropriate) their family members or carers.", source: { label: "NICE NG122: lung cancer, support from clinical nurse specialists", url: "https://www.nice.org.uk/guidance/ng122/chapter/Support-from-clinical-nurse-specialists" } },
      { text: "Ensure that all people whose condition is potentially suitable for multimodality treatment (surgery, radiotherapy and systemic anticancer therapy in any combination) are assessed by a thoracic oncologist and by a thoracic surgeon.", source: NG122 },
    ],
    meaning: "This aid quotes a guideline. It does not know your scan, your breathing tests, your other illnesses or what matters to you. Take the statements above to the appointment, ask which of them apply, and ask where your team's plan departs from them and why.",
    questions: ["Which of these recommendations apply to me, and where does my plan differ?", "Can I have the plan in writing, with the reasons?", "Who is my clinical nurse specialist, and what is the number?"],
    links: [LINKS.cancer, LINKS.lung, LINKS.decisions, LINKS.prep],
  },
];

function decide(a: Answers): string[] {
  const out: string[] = [];
  const declining = a.surgery === "decline";
  if (a.stage === "stage1-2a") {
    if (declining) out.push("sabr-if-declining-surgery");
    else if (a.lung === "normal") out.push("lobectomy-offer");
    else out.push("sublobar-or-sabr");
  } else if (a.stage === "stage2b-3-operable") {
    out.push(declining ? "chemoradiotherapy-if-declining-surgery" : "perioperative-treatment");
    out.push("assessed-by-both");
  } else {
    out.push("chemoradiotherapy-then-durvalumab", "radical-radiotherapy-alternative");
  }
  if (a.lung === "reduced") out.push("predicted-postop-low");
  out.push("lung-function-tests");
  if (!declining && a.stage !== "stage3-unresectable") out.push("thoracoscore-consent");
  out.push("pet-ct-first", "stop-smoking", "team");
  return out;
}

export const lungEarlyStageTool: DecisionTool = {
  id: "lung-early-stage",
  cancerId: "nsclc",
  entityIds: ["nsclc", "lung-cancer", "lobectomy", "segmentectomy", "pneumonectomy", "sbrt", "pet-ct", "performance-status"],
  title: "Surgery, radiotherapy or both for lung cancer that has not spread: what NICE NG122 says by stage, lung function and your own preference",
  short: "Surgery or radiotherapy aid",
  lede: "Enter the stage, what your breathing tests showed and whether you want an operation, and read the statements that apply, quoted word for word from NICE NG122. An educational aid to prepare for the conversation with your team, not advice. Nothing you enter leaves this page.",
  icon: "compass",
  guideline: NG122,
  sources: [NG122, NG122_DX],
  asOf,
  inputs: [
    {
      id: "stage", label: "Stage", hint: "Stage 1 to 2a means a tumour in the lung with no lymph nodes involved. Stage 2b to 3 operable means a larger tumour or involved nodes that a surgeon thinks could be removed. Stage 3 not operable means the cancer is confined to the chest but cannot be taken out.", icon: "layers",
      options: [
        { value: "stage1-2a", label: "Stage 1 to 2a (no nodes involved)" },
        { value: "stage2b-3-operable", label: "Stage 2b to 3, an operation is thought possible" },
        { value: "stage3-unresectable", label: "Stage 3, an operation is not possible" },
      ],
    },
    {
      id: "lung", label: "What the breathing tests showed", hint: "NICE asks for spirometry (FEV1) and transfer factor before any treatment aimed at cure, and a predicted figure for after an operation. If nobody has told you the results, choose the third option.", icon: "trend",
      options: [
        { value: "normal", label: "Normal, with good exercise tolerance" },
        { value: "reduced", label: "Reduced, or predicted to be low after surgery" },
        { value: "not-tested", label: "I have not been told, or not tested yet" },
      ],
    },
    {
      id: "surgery", label: "How you feel about an operation", hint: "NICE writes separate recommendations for people who decline a lobectomy and for people who decline any surgery, so your preference is part of the guideline rather than something outside it.", icon: "question",
      options: [
        { value: "considering", label: "Open to surgery, or not yet decided" },
        { value: "decline", label: "I would rather not have an operation" },
      ],
    },
  ],
  cards,
  decide,
  questions: [
    "What is the stage on my scans, and has a PET-CT been done?",
    "What were my spirometry and transfer factor results, and what are they predicted to be after an operation?",
    "What is my estimated risk of dying from the operation you are proposing?",
    "What would you recommend if I were your relative, and what would change your mind?",
    "Who is my lung cancer clinical nurse specialist, and what is the number between appointments?",
  ],
  notes: [
    "The aid covers what NICE NG122 says about treatment aimed at cure for non-small-cell lung cancer that has not spread beyond the chest. It does not cover treatment for cancer that has spread, small-cell lung cancer, or the choice of immunotherapy by PD-L1, which are on the decisions page.",
    "No personal survival figure is given here. NG122 gives none, and asks instead that your team calculate a global risk score such as Thoracoscore for you and tell you the number before you consent.",
    "Where the guideline uses the words decline or accept the risks, the cards keep them. Your preference is written into these recommendations, not applied on top of them.",
    "Nothing you enter is stored or sent anywhere.",
  ],
  links: [LINKS.decisions, LINKS.first60, LINKS.prep, LINKS.cancer, LINKS.lung],
};
