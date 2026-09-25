import type { Answers, DecisionTool, ToolCard, ToolSource } from "@/lib/decision-tools";

/**
 * A LOW-RISK BASAL CELL CARCINOMA: SURGERY, CURETTAGE, FREEZING, A CREAM, OR PHOTODYNAMIC THERAPY.
 *
 * This aid exists because the choice is routinely summarised as "several options are available", which tells a
 * person nothing about what they are trading. There is a real difference in cure rate, a real difference in how
 * the result looks, and a real difference in what the treatment does to your skin for the six to twelve weeks it
 * is working, and all three are measured. The aid quotes the randomised evidence and the British Association of
 * Dermatologists, and nothing else. It gives no score and makes no prediction, because none of those sources
 * gives one, and it says plainly at the top that the highest cure rate is surgery.
 *
 * Sources, all read 25 September 2026:
 *   Thomson et al., Cochrane review of interventions for basal cell carcinoma (2020): 52 randomised trials,
 *     6,690 participants, with recurrence and cosmetic outcomes by comparison.
 *   Bath-Hextall et al. (Lancet Oncology 2014) and Williams et al. (J Invest Dermatol 2017): the UK SINS trial of
 *     imiquimod against excision in 501 participants, at three and five years.
 *   Jansen et al. (J Invest Dermatol 2018): the five-year results of the Dutch three-arm trial of photodynamic
 *     therapy, imiquimod and fluorouracil in 601 patients with superficial disease.
 *   van Loo et al. (Eur J Cancer 2014): Mohs against surgical excision for facial basal cell carcinoma at ten years.
 *   Marcil and Stern (Arch Dermatol 2000): the risk of a second keratinocyte cancer.
 *   The British Association of Dermatologists patient leaflets on basal cell carcinoma (updated July 2025) and on
 *     Mohs micrographic surgery (updated June 2025), and Cancer Research UK on the types of surgery.
 *
 * The aid stops where the lesion stops being low-risk and treatable by a dermatology department: hedgehog
 * inhibitors, cemiplimab and locally advanced disease are not here, and neither is melanoma.
 */
const asOf = "2026-09-25";

const COCHRANE: ToolSource = { label: "Thomson et al., interventions for basal cell carcinoma of the skin: Cochrane review of 52 randomised trials and 6,690 participants (2020)", url: "https://doi.org/10.1002/14651858.CD003412.pub3" };
const SINS_5Y: ToolSource = { label: "Williams et al., surgery versus 5% imiquimod for nodular and superficial basal cell carcinoma, 5-year results of the SINS randomised controlled trial (J Invest Dermatol 2017)", url: "https://doi.org/10.1016/j.jid.2016.10.019" };
const SINS_3Y: ToolSource = { label: "Bath-Hextall et al., surgical excision versus imiquimod 5% cream for nodular and superficial basal-cell carcinoma, SINS (Lancet Oncology 2014)", url: "https://doi.org/10.1016/S1470-2045(13)70530-8" };
const JANSEN: ToolSource = { label: "Jansen et al., five-year results of a randomised controlled trial comparing photodynamic therapy, topical imiquimod and topical 5-fluorouracil in superficial basal cell carcinoma (J Invest Dermatol 2018)", url: "https://doi.org/10.1016/j.jid.2017.09.033" };
const MOHS_10Y: ToolSource = { label: "van Loo et al., surgical excision versus Mohs micrographic surgery for basal cell carcinoma of the face: randomised clinical trial with 10-year follow-up (Eur J Cancer 2014)", url: "https://doi.org/10.1016/j.ejca.2014.08.018" };
const MARCIL_STERN: ToolSource = { label: "Marcil and Stern, risk of developing a subsequent non-melanoma skin cancer in patients with a history of non-melanoma skin cancer (Arch Dermatol 2000)", url: "https://doi.org/10.1001/archderm.136.12.1524" };
const BAD_BCC: ToolSource = { label: "British Association of Dermatologists: basal cell carcinoma, patient information leaflet (updated July 2025)", url: "https://www.skinhealthinfo.org.uk/condition/basal-cell-carcinoma/" };
const BAD_MOHS: ToolSource = { label: "British Association of Dermatologists and British Society for Dermatological Surgery: Mohs micrographic surgery, patient information leaflet (updated June 2025)", url: "https://www.skinhealthinfo.org.uk/condition/mohs-micrographic-surgery/" };
const BAD_OTR: ToolSource = { label: "British Association of Dermatologists and BSSCII: skin cancer advice for organ transplant recipients, patient information leaflet (June 2024)", url: "https://www.skinhealthinfo.org.uk/condition/skin-cancer-in-organ-transplant-recipients/" };
const CRUK_SURGERY: ToolSource = { label: "Cancer Research UK: types of surgery for non-melanoma skin cancer", url: "https://www.cancerresearchuk.org/about-cancer/skin-cancer/treatment/surgery/treatment-surgery-types" };
const CRUK_FOLLOWUP: ToolSource = { label: "Cancer Research UK: follow-up after non-melanoma skin cancer treatment", url: "https://www.cancerresearchuk.org/about-cancer/skin-cancer/treatment/follow-up-appointments" };

const LINKS = {
  cancer: { label: "Basal cell carcinoma", href: "/cancers/basal-cell-carcinoma/" },
  decisions: { label: "Basal cell carcinoma decisions", href: "/cancers/basal-cell-carcinoma/decisions/" },
  family: { label: "Skin cancer (all types)", href: "/cancers/skin-cancer/" },
  first60: { label: "The first 60 days", href: "/first-60-days/basal-cell-carcinoma/" },
  prep: { label: "Appointment sheet", href: "/prep/basal-cell-carcinoma/" },
  excision: { label: "Wide local excision", href: "/terms/wide-local-excision/" },
  mohs: { label: "Mohs surgery", href: "/terms/mohs-surgery/" },
  curettage: { label: "Curettage and cautery", href: "/terms/curettage-and-cautery/" },
  imiquimod: { label: "Imiquimod cream", href: "/drugs/imiquimod/" },
  fluorouracil: { label: "Fluorouracil cream", href: "/drugs/fluorouracil/" },
  pdt: { label: "Photodynamic therapy (methyl aminolevulinate)", href: "/drugs/methyl-aminolevulinate/" },
  scar: { label: "The scar on the face afterwards", href: "/terms/facial-scar-after-skin-cancer/" },
  reconstruction: { label: "Skin grafts and flaps", href: "/terms/skin-graft-and-flap-reconstruction/" },
  second: { label: "The next skin cancer", href: "/terms/second-primary-skin-cancer/" },
  sun: { label: "Sun protection afterwards", href: "/terms/sun-protection-after-skin-cancer/" },
  transplant: { label: "Skin cancer after an organ transplant", href: "/terms/skin-cancer-after-organ-transplant/" },
  radiotherapy: { label: "Image-guided radiotherapy", href: "/technologies/imrt-igrt/" },
};

const cards: ToolCard[] = [
  {
    id: "surgery-highest",
    title: "Whatever else you decide, start from this: surgery has the highest cure rate",
    tone: "info",
    quotes: [
      { text: "Overall, surgical interventions have the lowest recurrence rates. ... Non-surgical treatments, when used for low-risk BCC, are less effective than surgical treatments, but recurrence rates are acceptable and cosmetic outcomes are probably superior.", source: COCHRANE },
      { text: "Five-year success rates for imiquimod were 82.5% (170/206) compared with 97.7% (173/177) for surgery (relative risk of imiquimod success = 0.84, 95% confidence interval = 0.77-0.91, P < 0.001).", source: SINS_5Y },
    ],
    meaning: "This card is shown whatever you answer, because everything else is measured against it. The SINS trial randomised 501 people in the UK with a primary nodular or superficial basal cell carcinoma at a low-risk site between imiquimod cream and excision with a 4 mm margin, and followed them for five years. Roughly one person in six treated with the cream needed something else; roughly one in forty treated with surgery did. That is the size of the trade, and it is a real trade rather than a formality, because the non-surgical options buy other things.",
    questions: ["If I choose something other than surgery, what is my chance of needing surgery in the end anyway?"],
    links: [LINKS.excision, LINKS.imiquimod],
  },
  {
    id: "superficial-choice",
    title: "Superficial basal cell carcinoma: all three non-surgical options are on the table, and they are not equal",
    tone: "discuss",
    quotes: [
      { text: "Five years after treatment, the probability of tumor-free survival was 62.7% for methyl aminolevulinate photodynamic therapy (95% CI = 55.3-69.2), 80.5% for imiquimod (95% CI = 74.0-85.6), and 70.0% for 5-fluorouracil (95% CI = 62.9-76.0).", source: JANSEN },
      { text: "Cryotherapy - 'superficial' type BCCs can be frozen with liquid nitrogen. This will generate a wound that will usually heal with a scar. Creams - these can be applied to the skin to destroy 'superficial' type BCCs. The two commonly used are imiquimod cream and 5-fluorouracil cream.", source: BAD_BCC },
    ],
    meaning: "A superficial basal cell carcinoma is the one where the alternatives to surgery genuinely compete. The Dutch trial randomised 601 patients between the three and followed them for five years, and the order was clear: imiquimod first, fluorouracil second, photodynamic therapy third. Imiquimod is used once daily for six weeks; fluorouracil twice daily for four weeks; photodynamic therapy is two hospital visits. Freezing is also offered and leaves a scar of its own.",
    questions: ["If imiquimod has the best five-year figures, is there a reason not to use it for mine?", "How many hospital visits does each of these mean for me?"],
    links: [LINKS.imiquimod, LINKS.fluorouracil, LINKS.pdt],
  },
  {
    id: "nodular-not-superficial",
    title: "Nodular basal cell carcinoma: the creams and the light were mostly tested on the other kind",
    tone: "discuss",
    quotes: [
      { text: "MAL-PDT may result in more recurrences compared to SE at three years (36.4% versus 0%, respectively) (RR 26.47, 95% CI 1.63 to 429.92; 1 study; 68 participants with low-risk nBCC in the head and neck area; low-certainty evidence).", source: COCHRANE },
      { text: "Participants were randomized to imiquimod 5% cream once daily (superficial basal cell carcinoma, 6 weeks; nodular basal cell carcinoma, 12 weeks) or excisional surgery (4-mm margin).", source: SINS_5Y },
    ],
    meaning: "A nodular basal cell carcinoma is a lump rather than a patch, so a treatment that works on the surface has further to reach. Photodynamic therapy did badly against surgery for nodular disease in the head and neck, although that comparison rests on a single small study and the Cochrane authors graded it low certainty. Imiquimod was tested on nodular disease in SINS, but for twelve weeks rather than six. The British Association of Dermatologists reserves creams and photodynamic therapy for superficial lesions, so if yours is nodular ask specifically what the evidence is for that subtype.",
    questions: ["Is my basal cell carcinoma nodular or superficial, and was that decided on the biopsy?", "If I use a cream on a nodular one, how long would I be using it and how would we know it had worked?"],
    links: [LINKS.excision, LINKS.imiquimod],
  },
  {
    id: "high-risk-surgery",
    title: "A high-risk basal cell carcinoma: this is where the margins have to be checked",
    tone: "surgery",
    quotes: [
      { text: "'High risk' BCCs are more likely to come back after treatment. They include BCCs that are large, have unclear edges, have grown back despite previous treatment, or are classified as 'infiltrative' or 'morphoeic' sub-type. ... For high risk BCCs, the following treatments are most likely to be offered: Surgery (excision) - the BCC is cut out with a surrounding area (margin) of normal skin, as described above. The margins of the skin sample can be tested to confirm whether the BCC has been fully removed.", source: BAD_BCC },
      { text: "Most studies (48/52) included only low-risk BCC (superficial (sBCC) and nodular (nBCC) histological subtypes).", source: COCHRANE },
    ],
    meaning: "If the word used about your basal cell carcinoma is infiltrative, morphoeic or recurrent, or if the edges are not clearly visible, the comparison between creams and surgery does not apply to you: almost all of the randomised evidence was collected in low-risk lesions. The point of an excision or of Mohs here is that somebody can look at the edges of what was taken out and say whether the cancer is all gone, which is exactly what curettage, freezing and creams cannot do.",
    questions: ["What makes mine high risk, in one sentence?", "Will the margins be checked, and what happens if they are not clear?"],
    links: [LINKS.excision, LINKS.mohs],
  },
  {
    id: "mohs-site",
    title: "Near the eyelid, nose, lip or ear, or for a high-risk lesion on the face, Mohs is the operation that spares the most skin",
    tone: "refer",
    quotes: [
      { text: "You may be recommended Mohs surgery if: It is difficult to see the edges of the skin cancer and so there would be a chance of not removing it fully if a standard surgical removal was performed. You have a skin cancer in an area where it is important to try and preserve unaffected skin and deeper tissue, if possible (for example, on eyelids, nose, ears, lips and around the mouth).", source: BAD_MOHS },
      { text: "For primary BCC, the 10-year cumulative probabilities of recurrence were 4.4% after MMS and 12.2% after SE (Log-rank test chi-square 2.704, p=0.100). For recurrent BCC, cumulative 10-year recurrence probabilities were 3.9% and 13.5% for MMS and SE, respectively (Log-rank 5.166, p=0.023).", source: MOHS_10Y },
    ],
    meaning: "The Dutch trial randomised 408 primary and 204 recurrent high-risk facial basal cell carcinomas and followed them for ten years. For a lesion that had already come back once, Mohs clearly did better; for a first lesion the difference pointed the same way but did not reach statistical significance. The other reason for Mohs on a face is not the cure rate at all: checking the edges as it goes means less normal skin is taken, which changes what the reconstruction has to do.",
    questions: ["Is Mohs available here, and if not, where is the nearest centre?", "How much skin would a standard excision take here compared with Mohs?"],
    links: [LINKS.mohs, LINKS.reconstruction],
  },
  {
    id: "mohs-day",
    title: "If it is Mohs, know what the day is: a whole one, awake, with waiting between stages",
    tone: "info",
    quotes: [
      { text: "It can take up to 3 hours to get your result. You may need another stage of surgery if any skin cancer was left behind. This means that you could be in hospital for up to a day, although this can vary. ... More than one set of local anaesthetic injections are often needed for Mohs. It can be a long and tiring day.", source: BAD_MOHS },
      { text: "In 90% of cases the skin cancer is removed after 1-2 stages of Mohs surgery. Some people may need more stages.", source: BAD_MOHS },
    ],
    meaning: "You arrive, the lesion is marked and photographed, you are given local anaesthetic and the tumour is taken out, the wound is dressed and you wait in a recovery bay while the sample is read under a microscope. If anything is left, you are numbed again and another layer comes out. You do not know at the start how many stages there will be or how big the wound will end up, and the wound is only closed once the surgeon is satisfied. The leaflet also says you will need someone to drive you home, that public transport is not advised afterwards, and to bring something to do.",
    questions: ["Can someone stay with me between stages?", "Will the wound be closed on the same day, and by whom?"],
    links: [LINKS.mohs, LINKS.reconstruction, LINKS.scar],
  },
  {
    id: "curettage",
    title: "On the trunk or a limb, curettage and cautery is the quick surgical option",
    tone: "surgery",
    quotes: [
      { text: "Surgery (curettage and cautery) - the BCC is scraped off (a process known as curettage) and then the skin surface is sealed using heat (cautery). Often the curettage and cautery are repeated a few times back-to-back to clear all the affected skin. Although it is usually not possible to test the edges of the sample to confirm that the BCC has been fully removed (such as with an excision), this procedure is generally considered effective for treating a low-risk BCC.", source: BAD_BCC },
      { text: "You don't have any stitches with this type of surgery. The area will scab over. Your doctor will tell you how to look after your wound and when to remove the dressing.", source: CRUK_SURGERY },
    ],
    meaning: "One appointment, local anaesthetic, no stitches and no return visit to have them out, and a round pale scar where the scab falls off. The price is that no pathologist can confirm the edges are clear, which is why it is offered for low-risk lesions on the body rather than for anything high-risk or anything on the face where the edges are hard to see.",
    questions: ["Would curettage and cautery be reasonable for mine, and why or why not?", "What will the scar look like compared with an excision and stitches?"],
    links: [LINKS.curettage, LINKS.excision],
  },
  {
    id: "cure-priority",
    title: "If what you want is the highest chance of being rid of it, the answer is an operation",
    tone: "surgery",
    quotes: [
      { text: "At 3 years, 178 (84%) of 213 participants in the imiquimod group were treated successfully compared with 185 (98%) of 188 participants in the surgery group (RR 0.84, 98% CI 0.78-0.91; p<0.0001). ... Although excisional surgery remains the best treatment for low-risk basal-cell carcinoma, imiquimod cream might still be a useful treatment option for small low-risk superficial or nodular basal-cell carcinoma dependent on factors such as patient preference, size and site of the lesion, and whether the patient has more than one lesion.", source: SINS_3Y },
      { text: "For high-risk facial BCC (high-risk histological subtype or located in the facial 'H-zone' or both), there may be slightly fewer recurrences with Mohs micrographic surgery (MMS) compared to surgical excision (SE) at three years (1.9% versus 2.9%, respectively) ... and at five years (3.2% versus 5.2%, respectively).", source: COCHRANE },
    ],
    meaning: "You said the cure rate matters most, so this is the straight answer rather than a balanced one: excision, or Mohs where the site or the subtype calls for it. Nothing else measured in a randomised trial comes close for a basal cell carcinoma, and the SINS authors wrote that sentence themselves.",
    questions: ["What margin would you take, and what is the chance I need a second operation?"],
    links: [LINKS.excision, LINKS.mohs],
  },
  {
    id: "cream-what-it-costs",
    title: "What choosing a cream actually costs, in cure rate and in six to twelve weeks of your face",
    tone: "watch",
    quotes: [
      { text: "The most common adverse events were itching (211 patients in the imiquimod group vs 129 in the surgery group) and weeping (160 vs 81). ... 12 (5%) participants in the imiquimod group withdrew because of adverse events compared with four (2%) in the surgery group.", source: SINS_3Y },
      { text: "Most imiquimod treatment failures occurred in year 1.", source: SINS_5Y },
    ],
    meaning: "Two things are worth knowing before choosing the cream. The first is that the treatment is visible: itching, weeping and inflammation over the weeks it is working, which on a face is public in a way a dressing is not. The second is more encouraging. Nearly all the failures happened in the first year, so a lesion that clears and stays clear through the first year is unlikely to fail later.",
    questions: ["What will my skin look like at week two and week four, and can I see photographs?", "When will we know whether it has worked, and what happens if it has not?"],
    links: [LINKS.imiquimod, LINKS.fluorouracil],
  },
  {
    id: "cosmetic",
    title: "If how it looks matters most, the non-surgical options are measurably better looking",
    tone: "info",
    quotes: [
      { text: "However, imiquimod may result in greater numbers of good/excellent cosmetic outcomes compared to SE when observer-rated (60.6% versus 35.6%, respectively) (RR 1.70, 95% CI 1.35 to 2.15; 1 study, 344 participants; low-certainty evidence). ... There may be little to no difference in the number of participant-rated good/excellent cosmetic outcomes (RR 1.00, 95% CI 0.94 to 1.06; 1 study, 326 participants).", source: COCHRANE },
      { text: "MAL-PDT probably results in greater numbers of participant- (RR 1.18, 95% CI 1.09 to 1.27; 97.3% versus 82.5%) or observer-rated (RR 1.87, 95% CI 1.54 to 2.26; 87.1% versus 46.6%) good/excellent cosmetic outcomes at one year compared to SE.", source: COCHRANE },
    ],
    meaning: "This is the honest counterweight to the cure-rate card, and it is not a small effect. Doctors looking at the results rated photodynamic therapy nearly twice as likely to look good as surgery, and imiquimod clearly better than surgery. Patients rating their own results were less impressed by the difference for imiquimod but agreed strongly about photodynamic therapy. Notice also what surgery scored on the observer ratings: a good or excellent result in roughly a third to a half. A scar is the usual outcome of an operation, not a complication of one.",
    questions: ["What would the scar look like and where exactly would it run?", "Can I see photographs of results from operations like mine?"],
    links: [LINKS.scar, LINKS.pdt],
  },
  {
    id: "time-cost",
    title: "If what you have least of is time, count the weeks rather than the appointments",
    tone: "info",
    quotes: [
      { text: "Participants were randomly assigned (1:1) ... to receive either imiquimod 5% cream once daily for 6 weeks (superficial) or 12 weeks (nodular), or surgical excision with a 4 mm margin.", source: SINS_3Y },
      { text: "Mohs surgery takes longer to do (half a day on average) than standard excision. More than one set of local anaesthetic injections are often needed for Mohs. It can be a long and tiring day. ... There are usually longer waiting lists for Mohs surgery compared to standard excision.", source: BAD_MOHS },
    ],
    meaning: "A standard excision is usually a single appointment under local anaesthetic, with stitches out at the GP surgery one or two weeks later. Curettage and cautery is one appointment and no stitches. A cream is six to twelve weeks of daily treatment at home with review afterwards. Photodynamic therapy is two hospital visits. Mohs is most of a day, plus a longer wait to get it. The fastest option and the most certain option are not always the same one, and neither is the least disruptive.",
    questions: ["How long is the wait for each of these here?", "How much time off work would each one mean?"],
    links: [LINKS.curettage, LINKS.excision, LINKS.mohs],
  },
  {
    id: "radiotherapy",
    title: "Radiotherapy is the non-surgical option for a site where surgery is difficult, and it has its own cost",
    tone: "discuss",
    quotes: [
      { text: "Based on one study of 347 participants with high- and low-risk primary BCC of the face, radiotherapy may result in more recurrences compared to SE under frozen section margin control at three years (5.2% versus 0%, respectively) ... Radiotherapy probably results in a smaller number of good participant- (RR 0.76, 95% CI 0.63 to 0.91; 50.3% versus 66.1%) or observer-rated (RR 0.48, 95% CI 0.37 to 0.62; 28.9% versus 60.3%) good/excellent cosmetic outcomes compared to SE, when measured at four years, where dyspigmentation and telangiectasia can occur.", source: COCHRANE },
      { text: "Radiotherapy - X-ray radiation is projected onto the BCC, and this treatment is repeated over a number of days/weeks. This treatment is usually delivered by the oncology team. Radiotherapy is not suitable for people with genetic skin cancer syndromes as it can increase the number of BCCs.", source: BAD_BCC },
    ],
    meaning: "Radiotherapy avoids an operation, which is exactly why it is used where surgery would be disfiguring or where someone cannot have an anaesthetic. It is not a free choice: in the one randomised comparison it recurred more often than margin-controlled excision, the skin it treats changes colour and develops fine visible vessels over years, and it means several visits over days or weeks rather than one. It is also not offered to people with a genetic skin cancer syndrome.",
    questions: ["Why radiotherapy rather than surgery in my case?", "What will the treated skin look like in five years?"],
    links: [LINKS.radiotherapy, LINKS.excision],
  },
  {
    id: "no-treatment",
    title: "Not treating it is a recognised option, and it is allowed to be said out loud",
    tone: "discuss",
    quotes: [
      { text: "In some cases, it may be reasonable not to treat the BCC at all - for example, if the BCC is growing slowly on a non-critical area of the body or if the person would be unable to tolerate or recover from treatment due to other health issues.", source: BAD_BCC },
      { text: "BCCs very rarely spread to other parts of the body and are almost never a danger to life.", source: BAD_BCC },
    ],
    meaning: "You said you wanted to avoid an operation, so this belongs on the list rather than being left for someone to raise at the end. It is a choice for a slow-growing lesion on a part of the body where nothing important is nearby, and for someone whose other health problems make treatment the bigger burden. It is not a choice for a lesion near the eye, nose, ear or lip, where growth causes damage that is hard to repair, and it is a decision to make with the team rather than by not going back.",
    questions: ["If we watch this rather than treat it, what would we be watching for and how often?", "What would change your advice from watching to treating?"],
    links: [LINKS.cancer, LINKS.decisions],
  },
  {
    id: "immunosuppressed",
    title: "You take immunosuppressants, which changes this whole conversation",
    tone: "refer",
    quotes: [
      { text: "BCCs are also more likely to come back in people with weak immune systems. In these cases, it is important to make sure that the BCC has been completely removed.", source: BAD_BCC },
      { text: "SCC is 150 times more common in transplant recipients than in the general population and is the most frequent type of skin cancer in organ transplant patients. ... BCCs are up to 10 times more common in organ transplant recipients compared with the general population.", source: BAD_OTR },
    ],
    meaning: "Two things follow. First, the British Association of Dermatologists says that in people with weakened immune systems it is important to be sure the basal cell carcinoma has been completely removed, which argues for a treatment whose margins can be checked rather than a cream. Second, the far bigger risk for you is not this lesion but the next ones, and above all squamous cell carcinoma, so the conversation should also cover how often your skin is checked, daily SPF 50 all year, and whether your immunosuppression itself is worth reviewing with your transplant team.",
    questions: ["Given my medicines, should the margins be checked on this one?", "How often should my whole skin be examined, and by whom?", "Is it worth my transplant team reviewing which immunosuppressants I am on?"],
    links: [LINKS.transplant, LINKS.sun, LINKS.mohs],
  },
  {
    id: "follow-up",
    title: "Whatever you choose, the likeliest next event is a different skin cancer, not this one returning",
    tone: "watch",
    quotes: [
      { text: "For BCCs, the 3-year cumulative risk is 44%, also at least a 10-fold increase in incidence compared with the rate in a comparable general population.", source: MARCIL_STERN },
      { text: "Some skin cancers have a low risk of coming back. For example, if you have an early stage basal cell carcinoma (BCC) or a low risk squamous cell carcinoma (SCC) you might have: a single follow up appointment and then no further follow up appointments.", source: CRUK_FOLLOWUP },
    ],
    meaning: "This card is shown whatever you answer. In the pooled studies, 44 of every 100 people who had a basal cell carcinoma had another one within three years, because the whole area of skin took the same ultraviolet damage. It is also why follow-up for a low-risk lesion is often a single appointment and then discharge: the surveillance is handed to you, and what you are asked to do is check your own skin monthly and go back for any mark that is growing, changing, bleeding or not healing, including a change where this one was treated.",
    questions: ["Am I being discharged after this, and if so what am I watching for?", "Who do I contact if I find something, and how quickly would I be seen?"],
    links: [LINKS.second, LINKS.sun, LINKS.first60],
  },
];

function decide(a: Answers): string[] {
  const ids: string[] = [];
  const push = (id: string) => { if (!ids.includes(id)) ids.push(id); };

  const highRisk = a.subtype === "highrisk";
  const hZone = a.site === "hzone";

  // The headline: the one thing this reader most needs at the top.
  if (highRisk) push("high-risk-surgery");
  else if (a.immune === "yes") push("immunosuppressed");
  else if (a.priority === "cure") push("cure-priority");
  else if (a.subtype === "superficial") push("superficial-choice");
  else push("nodular-not-superficial");

  // The sentence everything else is measured against.
  push("surgery-highest");

  // What the site decides.
  if (highRisk || hZone) { push("mohs-site"); push("mohs-day"); }
  if (!highRisk && a.site === "lowrisk") push("curettage");

  // What the subtype decides, where it was not already the headline.
  if (!highRisk) push(a.subtype === "superficial" ? "superficial-choice" : "nodular-not-superficial");

  // What the reader said mattered most.
  if (a.priority === "cure") push("cure-priority");
  if (a.priority === "look") { push("cosmetic"); if (!highRisk) push("cream-what-it-costs"); }
  if (a.priority === "time") push("time-cost");
  if (a.priority === "avoid") {
    if (!highRisk) push("cream-what-it-costs");
    if (highRisk || hZone) push("radiotherapy");
    if (!highRisk && !hZone && a.immune === "no") push("no-treatment");
  }

  // Immunosuppression is never a footnote.
  if (a.immune === "yes") push("immunosuppressed");

  // Always last.
  push("follow-up");
  return ids;
}

export const bccLowRiskTreatmentTool: DecisionTool = {
  id: "bcc-low-risk-treatment",
  cancerId: "basal-cell-carcinoma",
  entityIds: ["basal-cell-carcinoma", "skin-cancer", "mohs-surgery", "wide-local-excision", "curettage-and-cautery", "imiquimod", "fluorouracil", "methyl-aminolevulinate", "aminolevulinic-acid", "second-primary-skin-cancer", "skin-cancer-after-organ-transplant", "facial-scar-after-skin-cancer"],
  title: "A basal cell carcinoma: surgery, curettage, freezing, a cream, or photodynamic therapy",
  short: "Choosing how a basal cell carcinoma is treated",
  lede: "An educational aid, not advice for your case. For a superficial or low-risk basal cell carcinoma there is a genuine choice, and it is usually summarised in a way that hides what is being traded. Answer four questions and this sets out, for your situation, what the randomised trials found about cure rate, about how the result looks, and about what each treatment does to your skin while it works, quoted word for word with the study it came from. It gives no score and makes no prediction about you.",
  icon: "scalpel",
  guideline: { label: "Thomson et al., interventions for basal cell carcinoma of the skin (Cochrane Database of Systematic Reviews, 2020)", url: "https://doi.org/10.1002/14651858.CD003412.pub3" },
  sources: [COCHRANE, SINS_3Y, SINS_5Y, JANSEN, MOHS_10Y, MARCIL_STERN, BAD_BCC, BAD_MOHS, BAD_OTR, CRUK_SURGERY, CRUK_FOLLOWUP],
  inputs: [
    {
      id: "subtype", label: "What did the biopsy call it?", icon: "layers",
      hint: "The subtype is on the pathology report and decides which treatments are even candidates.",
      options: [
        { value: "superficial", label: "Superficial", hint: "A flat scaly pink or red mark on the surface of the skin" },
        { value: "nodular", label: "Nodular", hint: "A pearly lump, often with fine vessels across it; the commonest kind" },
        { value: "highrisk", label: "Infiltrative, morphoeic, large, unclear edges, or one that has come back", hint: "The British Association of Dermatologists calls these high risk" },
      ],
    },
    {
      id: "site", label: "Where is it?", icon: "compass",
      hint: "Not how big it is but where: the same lesion is treated differently on a shin and on an eyelid.",
      options: [
        { value: "lowrisk", label: "Trunk, arm or leg" },
        { value: "face", label: "Face, scalp or neck, but not right by the eye, nose, lip or ear" },
        { value: "hzone", label: "Eyelid, nose, lip, ear, or another place where skin cannot be spared" },
      ],
    },
    {
      id: "priority", label: "Of these four, which matters most to you?", icon: "flag",
      hint: "There is no wrong answer. The four pull in different directions and the trials measured all of them.",
      options: [
        { value: "cure", label: "The highest chance of being rid of it" },
        { value: "avoid", label: "Avoiding an operation" },
        { value: "look", label: "How it will look afterwards" },
        { value: "time", label: "Fewest visits and least disruption" },
      ],
    },
    {
      id: "immune", label: "Do you take medicines that suppress your immune system?", icon: "question",
      hint: "A transplant, or long-term immunosuppressants for another condition.",
      options: [
        { value: "no", label: "No" },
        { value: "yes", label: "Yes" },
      ],
    },
  ],
  cards,
  decide,
  questions: [
    "Which of these treatments do you do here, and which would I have to travel for?",
    "If this treatment does not work, what is the next one, and does choosing this one make that harder?",
    "Will anyone be able to tell me the edges were clear, and if not, how will we know it has gone?",
    "How many basal cell carcinomas have I had, and does that change what you would advise?",
  ],
  notes: [
    "Nothing here is a prediction about you. Every figure is quoted with the trial or cohort it came from, and those studies describe the people who were in them.",
    "Almost all of the randomised evidence for creams, freezing and photodynamic therapy was collected in low-risk lesions, which the Cochrane reviewers state directly: 48 of the 52 trials included only superficial and nodular disease. It does not transfer to a high-risk basal cell carcinoma.",
    "This aid stops at a basal cell carcinoma that a dermatology department can treat. Hedgehog inhibitors and immunotherapy for locally advanced or metastatic disease are a different conversation, and melanoma is a different disease with its own pages.",
    "The Cochrane evidence certainty grades are quoted where the reviewers gave them, because several of these comparisons rest on a single study and their confidence intervals are wide.",
  ],
  links: [LINKS.cancer, LINKS.family, LINKS.decisions, LINKS.first60, LINKS.prep],
  asOf,
};
