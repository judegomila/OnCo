import type { Answers, DecisionTool, ToolCard, ToolSource } from "@/lib/decision-tools";

/**
 * BREAST-CONSERVING SURGERY OR MASTECTOMY: the decision that is shared whichever receptor result comes back.
 *
 * This aid quotes NICE NG101 and the two randomised trials that followed people for twenty years, and nothing else.
 * It gives no score and no personal prediction, because none of those sources gives one. The reason it exists is
 * that the choice is routinely summarised as "similar outcomes", which is true of survival and of almost nothing
 * else: the operations differ in radiotherapy, in the chance of a second operation, in how the breast looks and
 * feels afterwards, and in what a recurrence would mean. Every one of those differences has a guideline sentence
 * or a trial number behind it, and they are set out here so the reader arrives at the clinic already knowing what
 * is being traded.
 *
 * Sources, all read 25 September 2026:
 *   NICE NG101 (early and locally advanced breast cancer, 2018, last updated 2025): 1.2.1 axillary ultrasound,
 *     1.4.3 and 1.4.5 margins and further surgery, 1.4.6 shared decision making, 1.4.9 to 1.4.12 the axilla,
 *     1.5.1 to 1.5.5 and table 1 reconstruction, 1.13.3 to 1.13.16 radiotherapy, 1.14.1 lymphoedema information.
 *   Veronesi et al. (NEJM 2002), the Milan trial at 20 years; Fisher et al. (NEJM 2002), NSABP B-06 at 20 years;
 *     EBCTCG (Lancet 2011), radiotherapy after breast-conserving surgery in 10,801 women; DiSipio et al.
 *     (Lancet Oncology 2013), lymphoedema incidence; Bartels et al. (JCO 2023), AMAROS at 10 years.
 *   Macmillan on when a mastectomy is recommended, and Cancer Research UK on reconstruction.
 *
 * The aid stops at the operation. Chemotherapy, endocrine therapy, HER2 drugs and immunotherapy are decided by the
 * receptor result and live on the subtype pages.
 */
const asOf = "2026-09-25";

const NG101: ToolSource = { label: "NICE NG101: early and locally advanced breast cancer, recommendations (2018, updated 2025)", url: "https://www.nice.org.uk/guidance/ng101/chapter/Recommendations" };
const VERONESI: ToolSource = { label: "Veronesi et al., twenty-year follow-up of breast-conserving surgery versus radical mastectomy (NEJM 2002)", url: "https://doi.org/10.1056/NEJMoa020989" };
const NSABP_B06: ToolSource = { label: "Fisher et al., twenty-year follow-up of total mastectomy, lumpectomy, and lumpectomy plus irradiation, NSABP B-06 (NEJM 2002)", url: "https://doi.org/10.1056/NEJMoa022152" };
const EBCTCG: ToolSource = { label: "EBCTCG, radiotherapy after breast-conserving surgery: meta-analysis of 10,801 women in 17 randomised trials (Lancet 2011)", url: "https://doi.org/10.1016/S0140-6736(11)61629-2" };
const DISIPIO: ToolSource = { label: "DiSipio et al., incidence of unilateral arm lymphoedema after breast cancer (Lancet Oncology 2013)", url: "https://doi.org/10.1016/S1470-2045(13)70076-7" };
const AMAROS: ToolSource = { label: "Bartels et al., radiotherapy or surgery of the axilla after a positive sentinel node, 10-year results of AMAROS (JCO 2023)", url: "https://doi.org/10.1200/JCO.22.01565" };
const MAC_MASTECTOMY: ToolSource = { label: "Macmillan: removing the breast (mastectomy)", url: "https://www.macmillan.org.uk/cancer-information-and-support/treatments-and-drugs/removing-the-breast-mastectomy" };
const CRUK_RECON: ToolSource = { label: "Cancer Research UK: breast reconstruction", url: "https://www.cancerresearchuk.org/about-cancer/breast-cancer/treatment/surgery/breast-reconstruction" };

const LINKS = {
  cancer: { label: "Breast cancer (all types)", href: "/cancers/breast-cancer/" },
  decisions: { label: "Breast cancer decisions", href: "/cancers/breast-cancer/decisions/" },
  first60: { label: "The first 60 days", href: "/first-60-days/breast-cancer/" },
  prep: { label: "Appointment sheet", href: "/prep/breast-cancer/" },
  lumpectomy: { label: "Lumpectomy (breast-conserving surgery)", href: "/terms/lumpectomy/" },
  mastectomy: { label: "Mastectomy", href: "/terms/mastectomy/" },
  reconstruction: { label: "Breast reconstruction", href: "/terms/breast-reconstruction/" },
  margins: { label: "Margins and second operations", href: "/terms/breast-margins-and-re-excision/" },
  sentinel: { label: "Sentinel node biopsy", href: "/terms/sentinel-lymph-node-biopsy/" },
  clearance: { label: "Lymph node dissection", href: "/terms/lymphadenectomy/" },
  lymphoedema: { label: "Lymphoedema after breast cancer", href: "/terms/lymphoedema-after-breast-cancer/" },
  numbness: { label: "Numbness after breast surgery", href: "/terms/numbness-after-breast-surgery/" },
  hypofractionation: { label: "Hypofractionated radiotherapy", href: "/technologies/hypofractionated-radiotherapy/" },
  hrPositive: { label: "Hormone receptor-positive breast cancer", href: "/cancers/breast-hr-positive/" },
  her2: { label: "HER2-positive breast cancer", href: "/cancers/breast-her2-positive/" },
  tnbc: { label: "Triple-negative breast cancer", href: "/cancers/tnbc/" },
};

const cards: ToolCard[] = [
  {
    id: "survival-same",
    title: "On survival, the two operations were the same in both twenty-year trials",
    tone: "info",
    quotes: [
      { text: "After a median follow-up of 20 years, the rate of death from all causes was 41.7 percent in the group that underwent breast-conserving surgery and 41.2 percent in the radical-mastectomy group (P=1.0). The respective rates of death from breast cancer were 26.1 percent and 24.3 percent (P=0.8).", source: VERONESI },
      { text: "No significant differences were observed among the three groups of women with respect to disease-free survival, distant-disease-free survival, or overall survival.", source: NSABP_B06 },
    ],
    meaning: "This card is shown whatever you answer, because it is the sentence everything else hangs on. The Milan trial randomised 701 women with cancers no larger than 2 cm to radical mastectomy or to quadrantectomy with radiotherapy; NSABP B-06 randomised 1,851 women to total mastectomy, lumpectomy alone or lumpectomy with radiotherapy. Both followed people for twenty years and found no survival difference. Those are cohorts treated decades ago with the surgery and drugs of the time, and neither says anything about what will happen to you. What they establish is that keeping the breast, where the cancer allows it, did not cost survival.",
    questions: ["Do the trial results apply to a cancer like mine, and if not, why not?"],
    links: [LINKS.lumpectomy, LINKS.mastectomy],
  },
  {
    id: "bcs-first",
    title: "One area, small relative to the breast: breast-conserving surgery is the usual first offer",
    tone: "surgery",
    quotes: [
      { text: "Breast surgeons will try to do an operation that means you can keep your breast (breast-conserving surgery). But sometimes they may recommend a mastectomy.", source: MAC_MASTECTOMY },
      { text: "Offer whole-breast radiotherapy to women with invasive breast cancer who have had breast-conserving surgery with clear margins.", source: NG101 },
    ],
    meaning: "Removing the cancer with a rim of healthy tissue and keeping the rest of the breast is what surgeons aim for when the cancer is a single area and small enough relative to the breast for the result to look acceptable. It comes with radiotherapy attached, and with a chance of a second operation if the margins are not clear. Neither of those is a reason not to do it; they are the things to know before you agree.",
    questions: ["How much of my breast would be removed, and what would it look like afterwards?", "Can I see photographs of results from operations like mine?"],
    links: [LINKS.lumpectomy, LINKS.margins],
  },
  {
    id: "bcs-or-mastectomy-by-size",
    title: "One area, but large relative to the breast: this is where reshaping and a genuine choice both come in",
    tone: "discuss",
    quotes: [
      { text: "Breast surgeons will try to do an operation that means you can keep your breast (breast-conserving surgery). But sometimes they may recommend a mastectomy. This may be when: the lump is large compared to the rest of your breast", source: MAC_MASTECTOMY },
      { text: "Reshaping might be an option if you need part of your breast removed and you have quite large breasts. It is called therapeutic mammoplasty. The surgeon removes the tumour and an area of surrounding healthy tissue. They then reshape the remaining breast tissue to create a smaller breast.", source: CRUK_RECON },
    ],
    meaning: "The ratio between the cancer and the breast, not the size of the cancer alone, is what decides whether conserving surgery leaves an acceptable shape. Where the ratio is awkward there are two ways forward: reshaping the breast at the same operation, sometimes with a reduction on the other side to match, or a mastectomy. Both are reasonable, and this is the point at which what you want about your own body is part of the clinical answer rather than an afterthought. If a mastectomy is what you choose, the reconstruction recommendations on the decisions page apply.",
    questions: ["Is therapeutic mammoplasty or a partial reconstruction possible here, and do you do them?", "If we reshape, would I need surgery on the other breast to match, and when?"],
    links: [LINKS.lumpectomy, LINKS.reconstruction, LINKS.decisions],
  },
  {
    id: "mastectomy-indicated",
    title: "More than one area, or widespread DCIS: a mastectomy is usually recommended rather than chosen",
    tone: "surgery",
    quotes: [
      { text: "Breast surgeons will try to do an operation that means you can keep your breast (breast-conserving surgery). But sometimes they may recommend a mastectomy. This may be when: the lump is large compared to the rest of your breast, there is cancer in different parts of the breast, this is called multicentric breast cancer, there is widespread DCIS in the breast, the cancer is on the skin or in underlying muscle, you have had radiotherapy to the chest before to treat another cancer, such as a previous breast cancer or Hodgkin lymphoma, you have a family history of breast or ovarian cancer and have tested positive for a gene mutation.", source: MAC_MASTECTOMY },
    ],
    meaning: "Where the cancer sits in more than one part of the breast, or where there is widespread DCIS, conserving surgery cannot reliably remove all of it and leave a breast worth keeping. That makes the mastectomy a recommendation rather than a preference. What remains a choice is what happens next: immediate reconstruction, delayed reconstruction, or none.",
    questions: ["What exactly did the MRI or the biopsies show that makes conserving surgery unsuitable?", "Would anything change that, for example treatment before surgery to shrink the cancer?"],
    links: [LINKS.mastectomy, LINKS.reconstruction],
  },
  {
    id: "previous-radiotherapy",
    title: "Radiotherapy to this breast or chest before: that is usually what rules conserving surgery out",
    tone: "stop",
    quotes: [
      { text: "But sometimes they may recommend a mastectomy. This may be when: you have had radiotherapy to the chest before to treat another cancer, such as a previous breast cancer or Hodgkin lymphoma", source: MAC_MASTECTOMY },
      { text: "Offer whole-breast radiotherapy to women with invasive breast cancer who have had breast-conserving surgery with clear margins.", source: NG101 },
    ],
    meaning: "Conserving surgery works because radiotherapy follows it, and the same breast cannot usually be given a full course twice. If you have had radiotherapy to this breast or to the chest before, that is normally the reason a mastectomy is being recommended, rather than anything about the cancer itself. It is worth having it said out loud so you know which constraint you are working within.",
    questions: ["Is it the previous radiotherapy that rules conserving surgery out, or something about this cancer?", "Is partial-breast re-irradiation offered anywhere, or in a trial?"],
    links: [LINKS.mastectomy, LINKS.hypofractionation],
  },
  {
    id: "radiotherapy-after-bcs",
    title: "Conserving surgery commits you to radiotherapy, and this is what it is worth",
    tone: "info",
    quotes: [
      { text: "Offer 26 Gy in 5 fractions over 1 week for people with invasive breast cancer having partial-breast, whole-breast or chest-wall radiotherapy, without regional lymph node irradiation, after breast-conserving surgery or mastectomy.", source: NG101 },
      { text: "Offer 40 Gy in 15 fractions over 3 weeks for people with invasive breast cancer having regional lymph node irradiation, with or without whole-breast or chest-wall radiotherapy, after breast-conserving treatment or mastectomy.", source: NG101 },
      { text: "Overall, about one breast cancer death was avoided by year 15 for every four recurrences avoided by year 10.", source: EBCTCG },
    ],
    meaning: "For most people that is five sessions over one week, or fifteen over three weeks if the lymph nodes are being treated or there is a reason such as an implant reconstruction. The meta-analysis of 10,801 women in 17 randomised trials found radiotherapy cut the 10-year risk of any first recurrence from 35.0 to 19.3 percent and the 15-year risk of breast cancer death from 25.2 to 21.4 percent. It is not an optional extra on the end of the operation; it is part of what makes conserving surgery as safe as a mastectomy.",
    questions: ["How many sessions, over how many weeks, and to which areas?", "Will I need a boost to where the tumour was, and will I be asked to hold my breath?"],
    links: [LINKS.hypofractionation, LINKS.lumpectomy],
  },
  {
    id: "radiotherapy-omission",
    title: "You may be in the narrow group NICE says can consider leaving radiotherapy out",
    tone: "watch",
    quotes: [
      { text: "Consider not using radiotherapy for women who: have had breast-conserving surgery for invasive breast cancer with clear margins and have a very low absolute risk of local recurrence (defined as women aged 65 and over with tumours that are T1N0, ER-positive, HER2-negative and grade 1 to 2) and are willing to take adjuvant endocrine therapy for a minimum of 5 years.", source: NG101 },
      { text: "without radiotherapy, local recurrence occurs in about 50 women per 1,000 at 5 years, and with radiotherapy, occurs in about 10 women per 1,000 at 5 years", source: NG101 },
      { text: "overall survival at 10 years is the same with or without radiotherapy", source: NG101 },
    ],
    meaning: "This is one of the few places in breast cancer where NICE writes down both numbers and hands you the choice. Leaving radiotherapy out roughly quintuples the chance of the cancer coming back in that breast over five years, from about 1 in 100 to about 5 in 100, and does not change survival at ten years. NICE also says there is no increase in serious late effects from having it in this low-risk group. The trade is five sessions and some skin change against a small extra chance of a further operation later. Check first that you actually meet every part of the definition, because it is narrow.",
    questions: ["Do I meet every part of that definition: age, size, node status, receptors and grade?", "If I leave radiotherapy out and it comes back in the breast, what would the treatment be then?"],
    links: [LINKS.hypofractionation, LINKS.lumpectomy, LINKS.hrPositive],
  },
  {
    id: "radiotherapy-after-mastectomy",
    title: "A mastectomy does not reliably avoid radiotherapy",
    tone: "info",
    quotes: [
      { text: "Offer adjuvant postmastectomy radiotherapy to people with node-positive (macrometastases) invasive breast cancer or involved resection margins.", source: NG101 },
      { text: "Consider adjuvant postmastectomy radiotherapy for people with node-negative T3 or T4 invasive breast cancer.", source: NG101 },
      { text: "Do not offer radiotherapy following mastectomy to people with invasive breast cancer who are at low risk of local recurrence (for example, most people who have lymph node-negative breast cancer).", source: NG101 },
    ],
    meaning: "People often choose a mastectomy partly to avoid radiotherapy, and for lymph node-negative disease that usually works. Where the lymph nodes contain macrometastases, or the margins are involved, NICE offers radiotherapy after the mastectomy as well, so the operation would be the bigger one and the radiotherapy would still happen. Since the node result often is not known until after surgery, this is a possibility to understand before you decide rather than a certainty either way.",
    questions: ["If the nodes turn out to be involved, would I need radiotherapy after a mastectomy too?", "Would that change what kind of reconstruction is sensible?"],
    links: [LINKS.mastectomy, LINKS.hypofractionation],
  },
  {
    id: "margins-and-second-operation",
    title: "Conserving surgery sometimes needs a second operation, and NICE lowered the threshold to reduce that",
    tone: "info",
    quotes: [
      { text: "Offer further surgery (re-excision or mastectomy, as appropriate) after breast-conserving surgery where invasive cancer or DCIS is present at the radial margins ('tumour on ink'; 0 mm).", source: NG101 },
      { text: "Consider further surgery (re-excision or mastectomy, as appropriate) after breast-conserving surgery for invasive cancer with or without DCIS if tumour cells are present within 1 mm of, but not at, the radial margins (greater than 0 mm and less than 1 mm).", source: NG101 },
    ],
    meaning: "After the operation a pathologist measures how close the cancer came to the edge of what was taken out. Cancer at the inked edge means another operation is offered; within 1 mm it is considered, with the decision made with you. NICE moved that threshold from 2 mm to 1 mm in 2024 and said why: a smaller margin is likely to achieve better breast preservation and fewer additional surgeries, and repeated surgeries damage the appearance of the breast, affect self-esteem and are traumatic. Rates of further surgery vary between units, which makes it a fair thing to ask about here.",
    questions: ["What proportion of people here need a second operation after conserving surgery?", "If my margins are not clear, would the second operation be a re-excision or a mastectomy?"],
    links: [LINKS.margins, LINKS.lumpectomy],
  },
  {
    id: "axilla-sentinel",
    title: "Armpit ultrasound normal: a sentinel node biopsy rather than clearing the armpit",
    tone: "info",
    quotes: [
      { text: "Perform surgery using sentinel lymph node biopsy (SLNB) rather than axillary lymph node clearance to stage the axilla for people with invasive breast cancer if they have: no evidence of lymph node involvement on ultrasound or a negative ultrasound-guided needle biopsy.", source: NG101 },
      { text: "Offer further axillary treatment (axillary node clearance or radiotherapy) after SLNB to people who have 1 or more sentinel lymph node macrometastasis.", source: NG101 },
    ],
    meaning: "A sentinel node biopsy takes the first one to three nodes the breast drains to, which is enough to tell whether the cancer has reached the armpit, and leaves the rest. It is the single biggest thing that reduces lifelong arm swelling. If one of those nodes turns out to contain a macrometastasis, NICE offers either clearance or radiotherapy to the armpit as the next step, and those two differ a great deal in what they cost the arm.",
    questions: ["If a sentinel node is positive, would you offer me radiotherapy to the armpit rather than clearance?", "Will the nodes be checked during the operation, so a second operation can be avoided?"],
    links: [LINKS.sentinel, LINKS.lymphoedema],
  },
  {
    id: "axilla-clearance",
    title: "A needle biopsy already proved cancer in a node: NICE offers clearance",
    tone: "surgery",
    quotes: [
      { text: "Offer axillary node clearance to people with invasive breast cancer who have a preoperative ultrasound-guided needle biopsy with pathologically proven lymph node metastases.", source: NG101 },
      { text: "ALND was associated with a higher lymphedema rate in updated 5-year analyses (24.5% v 11.9%; P < .001).", source: AMAROS },
    ],
    meaning: "Where a needle biopsy has already shown cancer in a node before surgery, NICE offers clearance of the armpit rather than a sentinel node biopsy. That is the operation with the highest lymphoedema risk, so this is the point at which the arm needs the most attention: baseline measurement before surgery, the early signs explained, supervised physiotherapy, and a clear route to a lymphoedema service. The AMAROS figures above compare clearance with axillary radiotherapy in people whose node was found positive at sentinel node biopsy rather than beforehand, so they are not directly your situation, but they are the best measure of what clearance costs the arm.",
    questions: ["Will my arm be measured before the operation so there is a baseline?", "Am I high risk for shoulder problems, and can I have supervised physiotherapy rather than a leaflet?"],
    links: [LINKS.clearance, LINKS.lymphoedema, LINKS.numbness],
  },
  {
    id: "axilla-unknown",
    title: "The armpit result is not back yet: it is meant to be scanned before any treatment",
    tone: "discuss",
    quotes: [
      { text: "For people having investigations for early and locally advanced invasive breast cancer: perform pretreatment ultrasound evaluation of the axilla and if abnormal lymph nodes are identified, perform ultrasound-guided needle sampling.", source: NG101 },
    ],
    meaning: "NICE asks for the armpit to be scanned before treatment and any abnormal node sampled with a needle, because that result decides which armpit operation you have and therefore most of your long-term arm risk. If nobody has told you the result, it is worth asking for it before the operation is booked rather than after.",
    questions: ["Has the armpit been scanned, and what did it show?", "Which armpit operation is planned, and would the scan result change it?"],
    links: [LINKS.sentinel, LINKS.clearance],
  },
  {
    id: "reconstruction-offer",
    title: "You want reconstruction: NICE says to offer both timings, whether or not this unit does them",
    tone: "refer",
    quotes: [
      { text: "Offer breast reconstruction to people after they have had mastectomy for breast cancer.", source: NG101 },
      { text: "Offer both breast reconstruction options to women (immediate reconstruction and delayed reconstruction), whether or not they are available locally.", source: NG101 },
      { text: "Offer immediate breast reconstruction to women who have been advised to have a mastectomy, including those who may need radiotherapy, unless they have comorbidities that rule out reconstructive surgery.", source: NG101 },
    ],
    meaning: "Two sentences here are worth carrying into the room. Both timings must be offered even where the local service does only one, which is grounds for a referral elsewhere. And needing radiotherapy is not by itself a reason to refuse immediate reconstruction, although it does change which kind is sensible: NICE notes that implant-based reconstructions may be more affected by radiotherapy than flap reconstructions, and Cancer Research UK describes the usual route of a tissue expander first and an exchange after radiotherapy. Expect more than one operation either way.",
    questions: ["Which types of reconstruction do you do here, and which would you send me elsewhere for?", "Given my radiotherapy plan, which type would you advise, and why?"],
    links: [LINKS.reconstruction, LINKS.mastectomy],
  },
  {
    id: "reconstruction-declined",
    title: "You would rather not have a reconstruction: that is a recognised choice, not a gap",
    tone: "info",
    quotes: [
      { text: "Be aware that some people may prefer not to have breast reconstruction surgery.", source: NG101 },
      { text: "Some people choose not to have breast reconstruction. Your surgeon and breast care nurse will talk to you about all your options. They will explain the advantages and disadvantages to help you make the right decision for you.", source: CRUK_RECON },
    ],
    meaning: "NICE puts this sentence immediately after the one requiring reconstruction to be offered, which is the guideline saying that declining is an answer rather than a failure to decide. What is worth asking for anyway is a flat closure done well, because a chest wall left even and without loose skin is a surgical result in its own right, and a prosthesis fitting service if you want one. You can change your mind later: delayed reconstruction stays possible for years.",
    questions: ["Will you close the chest wall flat and even, and who here does that well?", "If I changed my mind in a few years, what would still be possible?"],
    links: [LINKS.reconstruction, LINKS.mastectomy],
  },
  {
    id: "reconstruction-undecided",
    title: "Undecided about reconstruction: here is the trade-off NICE sets out",
    tone: "discuss",
    quotes: [
      { text: "More than 1 operation is usually needed to complete the reconstruction", source: NG101 },
      { text: "No clear differences in satisfaction with completed reconstructions", source: NG101 },
      { text: "The new breast will feel and look different to the one removed. But some women find that immediate reconstruction helps them to cope more easily with their feelings about the loss of a breast.", source: CRUK_RECON },
    ],
    meaning: "Immediate means waking with a shape, usually fewer operations and less scarring because the existing skin is used, but limited time to decide and a risk that a complication delays chemotherapy, which works best started within six weeks of surgery. Delayed means a period with no breast, which a prosthesis can fill, but time to choose, time to lose weight or stop smoking first, and a reconstruction that cannot be derailed by cancer treatment. NICE found no clear difference in satisfaction with the finished result either way. Whichever you choose, the reconstructed breast is a shape rather than a restored breast, and it has little sensation.",
    questions: ["How long do I actually have to decide, and can I delay the operation to take it?", "Will the reconstructed breast or a spared nipple have any feeling?"],
    links: [LINKS.reconstruction, LINKS.numbness, LINKS.decisions],
  },
  {
    id: "reconstruction-after-conserving",
    title: "Keeping the breast: the shape question does not disappear, it just gets smaller",
    tone: "info",
    quotes: [
      { text: "If you have a large amount of breast tissue taken you may be left with a dent in the breast. This means the treated breast ends up looking much smaller than the other breast. But it is sometimes possible to get back the shape. Your surgeon may suggest a partial reconstruction of the breast.", source: CRUK_RECON },
      { text: "You may still need radiotherapy to the remaining breast tissue to reduce the risk of the cancer coming back.", source: CRUK_RECON },
    ],
    meaning: "Conserving surgery can leave a dent, and radiotherapy afterwards can make the breast smaller and firmer over time, so the two breasts may not match. Filling the dent with nearby tissue, or reshaping the breast at the same operation, is often possible and is best planned before rather than after. If a mastectomy ends up being the choice instead, the reconstruction recommendations on the decisions page apply.",
    questions: ["Would I be left with a dent, and can that be filled at the same operation?", "How much does radiotherapy usually change the size and firmness of the breast?"],
    links: [LINKS.reconstruction, LINKS.lumpectomy, LINKS.decisions],
  },
  {
    id: "lymphoedema-whatever-you-choose",
    title: "Whatever you choose, ask about the arm before the operation and not after",
    tone: "info",
    quotes: [
      { text: "Inform people having breast cancer treatment about their risk of developing lymphoedema after treatment. Before treatment starts, give them information in a suitable format to take away and refer to.", source: NG101 },
      { text: "Our findings suggest that more than one in five women who survive breast cancer will develop arm lymphoedema.", source: DISIPIO },
    ],
    meaning: "Lymphoedema is decided by what happens to the armpit rather than to the breast, it is lifelong once it starts, and nearly everything that reduces it is arranged in the first month: the smallest armpit operation the cancer allows, radiotherapy instead of clearance where that is an option, a baseline measurement of the arm, the early signs explained, and a route to a lymphoedema service that does not depend on you finding it. NICE requires the information before treatment starts. If nobody has given it to you, ask.",
    questions: ["Will someone measure my arm before surgery, and where is the measurement recorded?", "Who do I contact if I notice swelling, and how quickly will I be seen?"],
    links: [LINKS.lymphoedema, LINKS.sentinel, LINKS.clearance],
  },
  {
    id: "ask-your-team",
    title: "The guideline puts this decision in your hands, and says so",
    tone: "discuss",
    quotes: [
      { text: "When discussing the benefits and risks of further surgery, follow the recommendations on: enabling patients to actively participate in their care in NICE's guideline on patient experience in adult NHS services and communicating risks, benefits and consequences in NICE's guideline on shared decision making.", source: NG101 },
    ],
    meaning: "Shown last whatever you answered. Nothing in this aid is a recommendation for you: it is the set of statements that apply to the answers you gave, so that you arrive at the appointment knowing which questions are still open. Which drugs follow the operation depends on the receptor result, and that is on the page for your type of breast cancer.",
    questions: ["What would you recommend if I were your relative, and what would change your mind?", "How long do I have to decide, and does taking a week cost me anything?"],
    links: [LINKS.decisions, LINKS.hrPositive, LINKS.her2, LINKS.tnbc],
  },
];

function decide(a: Answers): string[] {
  const out: string[] = [];
  const cannotRT = a.radiotherapy === "cannot";
  const conserving = a.extent !== "multiple" && !cannotRT;
  if (a.extent === "multiple") out.push("mastectomy-indicated");
  else if (cannotRT) out.push("previous-radiotherapy", "mastectomy-indicated");
  else if (a.extent === "large-relative") out.push("bcs-or-mastectomy-by-size");
  else out.push("bcs-first");
  out.push("survival-same");
  if (conserving) {
    out.push(a.lowrisk === "yes" ? "radiotherapy-omission" : "radiotherapy-after-bcs", "margins-and-second-operation");
  } else {
    out.push("radiotherapy-after-mastectomy");
  }
  if (a.nodes === "biopsy-positive") out.push("axilla-clearance");
  else if (a.nodes === "normal") out.push("axilla-sentinel");
  else out.push("axilla-unknown");
  if (conserving) out.push("reconstruction-after-conserving");
  else if (a.reconstruction === "yes") out.push("reconstruction-offer");
  else if (a.reconstruction === "no") out.push("reconstruction-declined");
  else out.push("reconstruction-undecided");
  out.push("lymphoedema-whatever-you-choose", "ask-your-team");
  return out;
}

export const breastSurgeryChoiceTool: DecisionTool = {
  id: "breast-surgery-choice",
  cancerId: "breast-cancer",
  entityIds: ["breast-cancer", "lumpectomy", "mastectomy", "breast-reconstruction", "breast-margins-and-re-excision", "sentinel-lymph-node-biopsy", "lymphadenectomy", "lymphoedema-after-breast-cancer", "hypofractionated-radiotherapy"],
  title: "Breast-conserving surgery or mastectomy: what NICE NG101 and the twenty-year trials say, and what actually differs",
  short: "Surgery choice aid",
  lede: "Answer five questions about the cancer and about what you want, and read the statements that apply, quoted word for word from NICE NG101 and from the trials that followed people for twenty years. An educational aid to prepare for the conversation with your surgeon, not advice, and not a prediction about you. Nothing you enter leaves this page.",
  icon: "scalpel",
  guideline: NG101,
  sources: [NG101, VERONESI, NSABP_B06, EBCTCG, DISIPIO, AMAROS, MAC_MASTECTOMY, CRUK_RECON],
  asOf,
  inputs: [
    {
      id: "extent", label: "How much of the breast is affected", hint: "It is the ratio between the cancer and the breast that decides whether conserving surgery leaves an acceptable shape, not the size of the cancer on its own. If an MRI or further biopsies showed cancer in more than one part of the breast, choose the third option.", icon: "shape",
      options: [
        { value: "small-relative", label: "One area, small relative to the size of my breast" },
        { value: "large-relative", label: "One area, but large relative to the size of my breast" },
        { value: "multiple", label: "More than one area, or widespread DCIS" },
      ],
    },
    {
      id: "radiotherapy", label: "Whether radiotherapy is possible for you", hint: "Conserving surgery works because radiotherapy follows it, and the same breast cannot usually have a full course twice. Previous radiotherapy to this breast or to the chest, for a previous breast cancer or for Hodgkin lymphoma, is the commonest reason it is not possible.", icon: "layers",
      options: [
        { value: "can", label: "I can have radiotherapy" },
        { value: "cannot", label: "I have had radiotherapy to this breast or chest before, or cannot have it" },
      ],
    },
    {
      id: "nodes", label: "What the ultrasound of the armpit showed", hint: "NICE asks for the armpit to be scanned before treatment and any abnormal node sampled with a needle. That result decides which armpit operation you have, which is the single biggest determinant of long-term arm swelling.", icon: "scan",
      options: [
        { value: "normal", label: "Normal, or the needle biopsy was negative" },
        { value: "biopsy-positive", label: "A needle biopsy of a node showed cancer" },
        { value: "unknown", label: "I have not been told, or it has not been done yet" },
      ],
    },
    {
      id: "reconstruction", label: "How you feel about reconstruction", hint: "NICE writes separate recommendations for people who want reconstruction and for people who do not, so your preference is part of the guideline rather than something applied on top of it. This only changes the result where a mastectomy is on the table.", icon: "question",
      options: [
        { value: "yes", label: "I would want a reconstruction" },
        { value: "no", label: "I would rather not have one" },
        { value: "undecided", label: "I have not decided" },
      ],
    },
    {
      id: "lowrisk", label: "Whether you are in the group that can consider leaving radiotherapy out", hint: "NICE defines this narrowly: women aged 65 and over with a tumour that is T1N0, ER-positive, HER2-negative and grade 1 to 2, who are willing to take endocrine therapy for at least 5 years. If you are not sure, choose no and ask.", icon: "age",
      options: [
        { value: "yes", label: "Yes, I meet all of that definition" },
        { value: "no", label: "No, or I am not sure" },
      ],
    },
  ],
  cards,
  decide,
  questions: [
    "Which operation do you recommend for me, and what would change your recommendation?",
    "What will the breast or the chest wall look and feel like afterwards, and can I see photographs?",
    "What is my risk of needing a second operation, and what is this unit's rate?",
    "Which armpit operation am I having, and what does it mean for lymphoedema?",
    "Who is my breast care nurse, and what is the number for the team between appointments?",
  ],
  notes: [
    "This aid covers the operation only. Which drugs follow it, and whether any of them come first, is decided by the receptor result and is on the hormone receptor-positive, HER2-positive and triple-negative pages.",
    "No personal figure is given here, because none of the sources gives one. The trial numbers describe the people in those trials: 701 women with cancers under 2 cm in the Milan trial, 1,851 women in NSABP B-06, and 10,801 women across 17 radiotherapy trials, all treated with the surgery and drugs of their time.",
    "Where NICE writes a recommendation about women specifically, the wording is kept as NICE wrote it. Men get breast cancer too and have their own page; the operation and the armpit decisions are the same, and the reconstruction options are not.",
    "Nothing you enter is stored or sent anywhere.",
  ],
  links: [LINKS.decisions, LINKS.first60, LINKS.prep, LINKS.cancer],
};
