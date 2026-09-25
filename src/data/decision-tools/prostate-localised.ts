import type { Answers, DecisionTool, ToolCard, ToolSource } from "@/lib/decision-tools";

/**
 * PROSTATE CANCER THAT HAS NOT SPREAD: what NICE NG131 offers at each Cambridge Prognostic Group, and what the
 * three options cost you. This is the decision the whole of prostate cancer turns on, and it is unusual in
 * medicine: for CPG 1 to 3 disease the guideline puts active surveillance, surgery and radiotherapy side by side,
 * says the evidence does not show a difference in deaths from prostate cancer between them, and then sets out, in
 * its own box of numbers, how differently each one affects continence, erections and bowels. That is the trade-off
 * a man is actually being asked to make, so this aid gives him NICE's numbers rather than the word "side effects".
 *
 * Sources, all quoted word for word and all read 25 September 2026:
 *   NICE NG131 (prostate cancer: diagnosis and management, May 2019, last updated 15 December 2021):
 *     1.1.6 and 1.1.7 decision aids and nomograms, 1.1.12 and 1.1.13 what you must be told and psychosexual
 *     support, 1.2.15 and table 1 the Cambridge Prognostic Groups, 1.3.1 to 1.3.6 before radical treatment,
 *     box 2 the benefits and harms of the three options, 1.3.8 to 1.3.12 what is offered at each CPG,
 *     1.3.13 to 1.3.16 the active surveillance protocol, 1.3.19 to 1.3.25 radiotherapy and hormone therapy,
 *     1.3.26 and box 3 docetaxel for high-risk non-metastatic disease, 1.3.28 HIFU and cryotherapy,
 *     1.3.36 to 1.3.41 erectile dysfunction and continence services, 1.3.47 PSA follow-up,
 *     and the guideline's own definition of watchful waiting.
 *   Hamdy et al., fifteen-year outcomes after monitoring, surgery, or radiotherapy for prostate cancer (NEJM 2023).
 *   Donovan et al., patient-reported outcomes after monitoring, surgery, or radiotherapy (NEJM 2016).
 *   Donovan et al., patient-reported outcomes 12 years after localized prostate cancer treatment (NEJM Evid 2023).
 *
 * The aid does not weigh, score or predict, and gives no personal survival figure. NICE gives none for this
 * decision either: box 2 reports what happened to 100 men offered each option in one UK trial, which is a
 * different thing from what will happen to you, and the cards say so. Where NICE leaves the choice to the person
 * it says so in its own words ("offer a choice between", "for people who choose not to have immediate radical
 * treatment"), and the cards keep that wording.
 */
const asOf = "2026-09-25";

const NG131: ToolSource = { label: "NICE NG131: prostate cancer, diagnosis and management (May 2019, last updated 15 December 2021)", url: "https://www.nice.org.uk/guidance/ng131/chapter/Recommendations" };
const PROTECT_15Y: ToolSource = { label: "Hamdy et al., fifteen-year outcomes after monitoring, surgery, or radiotherapy for prostate cancer (NEJM 2023)", url: "https://doi.org/10.1056/NEJMoa2214122" };
const PROTECT_PRO: ToolSource = { label: "Donovan et al., patient-reported outcomes after monitoring, surgery, or radiotherapy for prostate cancer (NEJM 2016)", url: "https://doi.org/10.1056/NEJMoa1606221" };
const PROTECT_PRO12: ToolSource = { label: "Donovan et al., patient-reported outcomes 12 years after localized prostate cancer treatment (NEJM Evidence 2023)", url: "https://doi.org/10.1056/EVIDoa2300018" };

const LINKS = {
  cancer: { label: "Prostate cancer", href: "/cancers/prostate/" },
  decisions: { label: "Prostate cancer decisions", href: "/cancers/prostate/decisions/" },
  first60: { label: "The first 60 days", href: "/first-60-days/prostate/" },
  prep: { label: "Appointment sheet", href: "/prep/prostate/" },
  surveillance: { label: "Active surveillance", href: "/technologies/active-surveillance/" },
  psa: { label: "PSA", href: "/terms/psa/" },
  grade: { label: "Gleason score and grade group", href: "/terms/gleason-grade-group/" },
  mri: { label: "Multiparametric MRI", href: "/technologies/mp-mri/" },
  robotic: { label: "Robotic surgery", href: "/technologies/robotic-surgery/" },
  hypo: { label: "Hypofractionated radiotherapy", href: "/technologies/hypofractionated-radiotherapy/" },
  brachy: { label: "Brachytherapy", href: "/technologies/brachytherapy/" },
  sbrt: { label: "Stereotactic radiotherapy", href: "/technologies/sbrt/" },
  docetaxel: { label: "Docetaxel", href: "/drugs/docetaxel/" },
  bcr: { label: "Biochemical recurrence", href: "/terms/biochemical-recurrence/" },
  mdt: { label: "Multidisciplinary tumour boards", href: "/technologies/multidisciplinary-tumour-board/" },
  protect: { label: "ProtecT", href: "/trials/protect/" },
};

const cards: ToolCard[] = [
  {
    id: "risk-unknown",
    title: "First find out your Cambridge Prognostic Group: it is the number this whole decision runs on",
    tone: "info",
    quotes: [
      { text: "Urological cancer MDTs should assign a risk category (see table 1) to all people with newly diagnosed localised or locally advanced prostate cancer.", source: NG131 },
      { text: "Gleason score 6 (grade group 1) and prostate-specific antigen (PSA) less than 10 microgram/litre and Stages T1-T2", source: NG131, grade: "Cambridge Prognostic Group 1" },
      { text: "Two or more of: Gleason score 8 (grade group 4), PSA more than 20 microgram/litre, Stage T3 or Gleason score 9 to 10 (grade group 5) or Stage T4", source: NG131, grade: "Cambridge Prognostic Group 5" },
    ],
    meaning: "NICE writes a separate recommendation for each of the five Cambridge Prognostic Groups, so until you know which one you are in, nobody can tell you what is on offer. The group is worked out from three things you can ask for by name: your Gleason score or grade group, your PSA, and the T stage. If you were given a risk band rather than a number, CPG 1 is low risk, CPG 2 and 3 are intermediate, and CPG 4 and 5 are high. Ask for all three numbers in writing, and ask which CPG they add up to.",
    questions: ["What is my Cambridge Prognostic Group, and which of the three numbers put me there?", "What is my Gleason score or grade group, my PSA, and my T stage?", "What percentage of my cancer is Gleason pattern 4, and does the report mention intraductal or cribriform carcinoma?", "Has my case been through the urology multidisciplinary team yet?"],
    links: [LINKS.grade, LINKS.psa, LINKS.mdt],
  },
  {
    id: "cpg1-active-surveillance",
    title: "CPG 1: NICE offers active surveillance first, and treatment only if you would rather not wait",
    tone: "watch",
    quotes: [
      { text: "For people with CPG 1 localised prostate cancer: offer active surveillance; consider radical prostatectomy or radical radiotherapy if active surveillance is not suitable or acceptable to the person.", source: NG131 },
      { text: "This is part of a 'curative' strategy and is aimed at people with localised prostate cancer for whom radical treatments are suitable, keeping them within a 'window of curability' whereby only those whose tumours are showing signs of progressing, or those with a preference for intervention are considered for radical treatment.", source: NG131, grade: "NICE's definition of active surveillance" },
    ],
    meaning: "For the lowest-risk group, monitoring is the recommended treatment, not a way of putting treatment off. NICE's own definition is explicit that it is part of a curative strategy: you stay inside the window where cure is still possible, and you move to surgery or radiotherapy if the cancer shows signs of progressing or if you decide you would rather be treated. That decision stays yours the whole way through.",
    questions: ["If I choose active surveillance, what exactly would trigger a move to treatment?", "If I change my mind in a year with nothing having changed, can I still have surgery or radiotherapy?", "How many men in this clinic on surveillance end up having treatment, and after how long?"],
    links: [LINKS.surveillance, LINKS.psa, LINKS.protect],
  },
  {
    id: "cpg2-three-way-choice",
    title: "CPG 2: NICE offers a choice between all three, in those words",
    tone: "discuss",
    quotes: [
      { text: "For people with CPG 2 localised prostate cancer, offer a choice between active surveillance, radical prostatectomy or radical radiotherapy if radical treatment is suitable.", source: NG131 },
      { text: "When discussing treatment options with people with CPG 1, 2 and 3 localised prostate cancer, use box 2 to discuss the benefits and harms with them and refer to the NICE guideline on shared decision making.", source: NG131 },
    ],
    meaning: "This is the one place in the guideline where three quite different treatments are put on the table as equals and the choice is handed to you. NICE does not rank them. What it does instead is send your clinician to a box of numbers, reproduced in the cards below, showing what each option did to survival, progression, continence, erections and bowels in a UK trial. If nobody has shown you those numbers, ask for them by name: box 2 of NG131.",
    questions: ["Has anyone taken me through box 2 of NICE NG131, the benefits and harms table?", "Which of the three would you choose in my position, and what is that based on?", "Is there a decision aid I can take home and go through with my family?"],
    links: [LINKS.surveillance, LINKS.robotic, LINKS.hypo, LINKS.protect],
  },
  {
    id: "cpg3-radical-first",
    title: "CPG 3: NICE offers surgery or radiotherapy, and keeps surveillance open if you choose not to be treated now",
    tone: "discuss",
    quotes: [
      { text: "For people with CPG 3 localised prostate cancer: offer radical prostatectomy or radical radiotherapy and consider active surveillance (in line with recommendation 1.3.14) for people who choose not to have immediate radical treatment.", source: NG131 },
      { text: "If a person wishes to move from active surveillance to radical treatment at any stage in their care, make a shared decision to do so based on the person's preferences, comorbidities and life expectancy.", source: NG131 },
    ],
    meaning: "At CPG 3 the balance tips towards treating, but NICE still writes a sentence for the man who chooses not to be treated straight away, and keeps the surveillance protocol available to him. Choosing to wait here is a recognised position in the guideline rather than a refusal of care, and the door back to treatment is written into the same recommendation.",
    questions: ["What changes between CPG 2 and CPG 3 in terms of the risk I am carrying?", "If I choose surveillance at CPG 3, what would the monitoring be and what would trigger treatment?", "How much does waiting six weeks or three months matter for a cancer like mine?"],
    links: [LINKS.surveillance, LINKS.robotic, LINKS.hypo],
  },
  {
    id: "cpg4-5-no-surveillance",
    title: "CPG 4 and 5: surveillance is not offered, and the aim is long-term control",
    tone: "refer",
    quotes: [
      { text: "Do not offer active surveillance to people with CPG 4 and 5 localised and locally advanced prostate cancer.", source: NG131 },
      { text: "Offer radical prostatectomy or radical radiotherapy to people with CPG 4 and 5 localised and locally advanced prostate cancer when it is likely the person's cancer can be controlled in the long term.", source: NG131 },
      { text: "Do not offer brachytherapy alone to people with CPG 4 and 5 localised or locally advanced prostate cancer.", source: NG131 },
    ],
    meaning: "For the two highest-risk groups NICE closes off monitoring in a single negative recommendation, and closes off brachytherapy on its own. What remains is surgery or radiotherapy, with the condition attached that long-term control has to look likely. Box 2 and its numbers were drawn from a trial of CPG 1 to 3 disease, so the trade-offs below are a guide to what treatment costs rather than a description of your risk.",
    questions: ["What is the aim here: cure, or long-term control?", "If I have radiotherapy, how long would the hormone therapy last and why that long?", "Would I be assessed by both a surgeon and an oncologist before this is decided?"],
    links: [LINKS.robotic, LINKS.hypo, LINKS.brachy, LINKS.mdt],
  },
  {
    id: "not-suitable-watchful-waiting",
    title: "If radical treatment is not on the table: watchful waiting is a different thing from active surveillance",
    tone: "watch",
    quotes: [
      { text: "This is part of a strategy for 'controlling' rather than 'curing' prostate cancer and is aimed at people with localised prostate cancer who do not ever wish to have curative treatment, or it is not suitable for them. Instead, it involves the deferred use of hormone therapy. Watchful waiting avoids the use of surgery or radiation, but implies that curative treatment will not be attempted.", source: NG131, grade: "NICE's definition of watchful waiting" },
      { text: "Follow up people with prostate cancer who have chosen a watchful waiting regimen with no curative intent in primary care only if protocols for this have been agreed between the local urological cancer MDT and the relevant primary care organisation(s). Measure their PSA at least once a year.", source: NG131 },
      { text: "People with localised prostate cancer who have chosen watchful waiting and who have evidence of significant disease progression (that is, rapidly rising PSA level or bone pain) should have their situation reviewed by a member of the urological cancer MDT.", source: NG131 },
    ],
    meaning: "The two monitoring words sound alike and mean opposite things. Active surveillance is a route to cure that keeps the option of surgery or radiotherapy open. Watchful waiting is a route to control: no operation, no radiotherapy, hormone therapy held back until symptoms need it, and a PSA at least once a year, usually in primary care. It is a reasonable plan for many men, particularly where other health problems make radical treatment more dangerous than the cancer, but it should be chosen with the name said out loud.",
    questions: ["Is the plan active surveillance or watchful waiting, and which of the two words are you using?", "What would make you start hormone therapy?", "Who is monitoring my PSA, the hospital or the GP, and how often?"],
    links: [LINKS.psa, LINKS.surveillance, LINKS.mdt],
  },
  {
    id: "protect-survival",
    title: "What the three options did to survival and to spread: NICE's own numbers",
    tone: "info",
    quotes: [
      { text: "The evidence does not show a difference in the number of deaths from prostate cancer among people offered active surveillance, prostatectomy or radical radiotherapy. People who had not died of prostate cancer were: 98 out of 100 patients offered active surveillance, 99 out of 100 patients offered radical prostatectomy, 99 out of 100 patients offered radical radiotherapy.", source: NG131, grade: "NG131 box 2, at 10 years" },
      { text: "There is good evidence that both prostatectomy and radiotherapy reduce disease progression compared with active surveillance. Signs of disease progression were reported in: 21 out of 100 patients offered active surveillance, 8 out of 100 patients offered radical prostatectomy, 8 out of 100 patients offered radical radiotherapy.", source: NG131, grade: "NG131 box 2, at 10 years" },
      { text: "Death from prostate cancer occurred in 45 men (2.7%): 17 (3.1%) in the active-monitoring group, 12 (2.2%) in the prostatectomy group, and 16 (2.9%) in the radiotherapy group (P = 0.53 for the overall comparison).", source: PROTECT_15Y, grade: "ProtecT, 1,643 men, median 15 years" },
      { text: "Metastases developed in 51 men (9.4%) in the active-monitoring group, in 26 (4.7%) in the prostatectomy group, and in 27 (5.0%) in the radiotherapy group.", source: PROTECT_15Y, grade: "ProtecT, 1,643 men, median 15 years" },
    ],
    meaning: "This is the finding the rest of the decision hangs on. Fifteen years after 1,643 UK men were randomly assigned to monitoring, surgery or radiotherapy, the number who had died of prostate cancer was about 3 in 100 in every group, and the difference between the groups was not statistically significant. What treatment did change was spread and progression: metastases were roughly twice as common in the monitoring group, and a quarter of that group had clinical progression against about a tenth of the treated groups. These are figures for a trial population, not a prediction about you.",
    questions: ["How close is my cancer to the men in that trial: my PSA, grade and stage against theirs?", "If treatment does not change my chance of dying of this, what am I buying with it?", "What is my personal risk of the cancer spreading if I am monitored?"],
    links: [LINKS.protect, LINKS.surveillance],
  },
  {
    id: "protect-urinary",
    title: "Continence: surgery is the option that leaks, and it does not fully recover",
    tone: "discuss",
    quotes: [
      { text: "At 6 months, moderate to severe urinary incontinence problems were reported in: 4 out of 100 patients offered active surveillance, 19 out of 100 patients offered radical prostatectomy, 6 out of 100 patients offered radical radiotherapy. At 6 years, moderate to severe urinary incontinence problems were reported in: 8 out of 100 patients offered active surveillance, 13 out of 100 patients offered radical prostatectomy, 5 out of 100 patients offered radical radiotherapy.", source: NG131, grade: "NG131 box 2" },
      { text: "The rate of use of absorbent pads increased from 1% at baseline to 46% at 6 months in the prostatectomy group, as compared with 4% at 6 months in the active-monitoring group and 5% at 6 months in the radiotherapy group. By year 6, 17% of men in the prostatectomy group were using pads, as compared with 8% in the active-monitoring group and 4% in the radiotherapy group.", source: PROTECT_PRO, grade: "ProtecT patient-reported outcomes" },
      { text: "Among those in the prostatectomy group, urinary leakage requiring pads occurred in 18 to 24% of patients over 7 to 12 years, compared with 9 to 11% in the active monitoring group and 3 to 8% in the radiotherapy group.", source: PROTECT_PRO12, grade: "ProtecT, years 7 to 12" },
    ],
    meaning: "Leaking urine is the price of the operation, and the honest version is that it is severe early and never goes back to where it started. Nearly half the men who had surgery were wearing pads six months later, against about one in twenty in the other two groups. It improves a great deal over the first year or two, but at six years about one in six was still using pads, and between years seven and twelve the figure was one in five. Radiotherapy barely touches continence. Ask for these numbers from your own surgeon's series as well.",
    questions: ["What proportion of your own patients are pad-free at 12 months, and how do you count that?", "Would I see a continence physiotherapist before the operation to learn the pelvic floor exercises?", "If I am still leaking at a year, what is offered next?"],
    links: [LINKS.robotic, LINKS.protect],
  },
  {
    id: "protect-sexual",
    title: "Erections: surgery is worst, radiotherapy is worse than monitoring, and all three decline with time",
    tone: "discuss",
    quotes: [
      { text: "At 6 months, moderate or severe problems with erectile dysfunction were reported in: 29 out of 100 patients offered active surveillance, 66 out of 100 patients offered radical prostatectomy, 48 out of 100 patients offered radical radiotherapy. At 6 years, moderate or severe problems with erectile dysfunction were reported in: 40 out of 100 patients offered active surveillance, 50 out of 100 patients offered radical prostatectomy, 36 out of 100 patients offered radical radiotherapy.", source: NG131, grade: "NG131 box 2" },
      { text: "At baseline, 67% of men reported erections firm enough for intercourse, but by 6 months this rate fell to 52% in the active-monitoring group, to 22% in the radiotherapy group, and to 12% in the prostatectomy group.", source: PROTECT_PRO, grade: "ProtecT patient-reported outcomes" },
      { text: "In the prostatectomy group, 18% reported erections sufficient for intercourse at 7 years, compared with 30% in the active monitoring and 27% in the radiotherapy groups; all converged to low levels of potency by year 12.", source: PROTECT_PRO12, grade: "ProtecT, years 7 to 12" },
      { text: "Before radical treatment, explain to people and, if they wish, their partner, that radical treatment for prostate cancer will result in an alteration of sexual experience, and may result in loss of sexual function.", source: NG131 },
    ],
    meaning: "Two thirds of the men in this trial could get an erection firm enough for sex before anything was done. Six months later that was one in eight after surgery, one in five after radiotherapy and half in the monitoring group. Surgery is the hardest hit and recovers only partly; radiotherapy hits later and then holds steady; monitoring declines with age. By twelve years all three groups had converged at a low level, which is the part men are rarely told. Nothing here is a reason to avoid treatment, but it is the reason to ask about erectile dysfunction services before the operation rather than a year after it.",
    questions: ["Would this be nerve-sparing surgery, and how likely is that to be possible in my case?", "Can I be referred to the erectile dysfunction clinic before treatment rather than afterwards?", "What can I use, and from when: tablets, a vacuum pump, injections?"],
    links: [LINKS.robotic, LINKS.hypo, LINKS.protect],
  },
  {
    id: "protect-bowel",
    title: "Bowels: the one place radiotherapy is worse, and it keeps getting slowly worse",
    tone: "discuss",
    quotes: [
      { text: "At 6 months, moderate to severe impact of bowel habits on quality of life was reported in: 3 out of 100 patients offered active surveillance, 3 out of 100 patients offered radical prostatectomy, 10 out of 100 patients offered radical radiotherapy.", source: NG131, grade: "NG131 box 2" },
      { text: "Fecal leakage affected 12% in the radiotherapy group compared with 6% in the other groups by year 12.", source: PROTECT_PRO12, grade: "ProtecT, years 7 to 12" },
      { text: "Explain to people that there is a small increase in the risk of colorectal cancer after radical external beam radiotherapy for prostate cancer.", source: NG131 },
    ],
    meaning: "Radiotherapy passes through the front wall of the rectum, and the bowel is where its cost shows. The effect is worst in the first six months and settles, but faecal leakage climbs slowly afterwards: by year twelve it affected one man in eight in the radiotherapy group against one in sixteen in the others. NICE also asks that you are told, in plain terms, about the small increase in bowel cancer risk afterwards. Bleeding from the back passage after prostate radiotherapy is always worth reporting rather than assuming.",
    questions: ["What would the bowel side effects be in the first weeks, and what is offered for them?", "Am I being offered a rectal spacer or any technique to keep the dose off the bowel?", "Who do I tell if I am bleeding from the back passage years later?"],
    links: [LINKS.hypo, LINKS.brachy, LINKS.sbrt],
  },
  {
    id: "radiotherapy-schedule",
    title: "If you choose radiotherapy: the schedule NICE names, and the brachytherapy boost",
    tone: "info",
    quotes: [
      { text: "For people having radical external beam radiotherapy for localised prostate cancer: offer hypofractionated radiotherapy (60 Gy in 20 fractions) using image-guided intensity modulated radiation therapy (IMRT), unless contraindicated or offer conventional radiotherapy (74 Gy in 37 fractions) to people who cannot have hypofractionated radiotherapy.", source: NG131 },
      { text: "Consider brachytherapy in combination with external beam radiotherapy for people with CPG 2, 3, 4 and 5 localised or locally advanced prostate cancer.", source: NG131 },
    ],
    meaning: "The standard NHS course is twenty visits over four weeks, not thirty-seven: NICE moved to the shorter schedule because it works as well. The longer course is reserved for people who cannot have the short one. A brachytherapy boost, where radioactive sources are placed in the prostate itself, is something NICE says to consider on top of external beam radiotherapy from CPG 2 upwards, so it is fair to ask whether your centre offers it.",
    questions: ["How many visits would it be, over how many weeks, and how far do I have to travel?", "Is a brachytherapy boost offered here, and would it suit me?", "What do I need to do about my bladder and bowel before each session?"],
    links: [LINKS.hypo, LINKS.brachy, LINKS.sbrt],
  },
  {
    id: "adt-with-radiotherapy",
    title: "Radiotherapy comes with hormone therapy, and the length is a decision of its own",
    tone: "discuss",
    quotes: [
      { text: "Offer people with CPG 2, 3, 4 and 5 localised or locally advanced prostate cancer a combination of radical radiotherapy and androgen deprivation therapy, rather than radical radiotherapy or androgen deprivation therapy alone.", source: NG131 },
      { text: "Offer people with CPG 2, 3, 4 and 5 localised or locally advanced prostate cancer 6 months of androgen deprivation therapy before, during or after radical external beam radiotherapy.", source: NG131 },
      { text: "Consider continuing androgen deprivation therapy for up to 3 years for people with CPG 4 and 5 localised or locally advanced prostate cancer, and discuss the benefits and risks of this option with them.", source: NG131 },
    ],
    meaning: "From CPG 2 upwards, radiotherapy is not given on its own: six months of hormone therapy goes with it, and at CPG 4 and 5 that may be extended to three years. This matters because hormone therapy, not the radiotherapy, is what produces the hot flushes, the loss of sex drive, the bone thinning and the weight gain that men describe afterwards. NICE explicitly asks that the benefits and risks of the longer course are discussed with you rather than assumed, so the length is a conversation you are entitled to have.",
    questions: ["How many months of hormone therapy, and what is the reason for that length in my case?", "What happens to my testosterone after it stops, and how long does it take to come back?", "What is offered for hot flushes, bone thinning and weight gain while I am on it?"],
    links: [LINKS.decisions, LINKS.hypo],
  },
  {
    id: "surveillance-protocol",
    title: "What active surveillance actually involves: the NICE protocol, test by test",
    tone: "watch",
    quotes: [
      { text: "Offer multiparametric MRI to people having active surveillance who have not had an MRI previously. If the MRI results do not agree with the biopsy findings, offer a new MRI-influenced biopsy.", source: NG131 },
      { text: "Year 1 of active surveillance: every 3 to 4 months: measure prostate-specific antigen (PSA); throughout active surveillance: monitor PSA kinetics; at 12 months: digital rectal examination (DRE); at 12 to 18 months: multiparametric MRI.", source: NG131, grade: "NG131 table 2" },
      { text: "Year 2 and every year thereafter until active surveillance ends: every 6 months: measure PSA; throughout active surveillance: monitor PSA kinetics; every 12 months: DRE.", source: NG131, grade: "NG131 table 2" },
      { text: "Offer radical treatment to people with localised prostate cancer who had chosen an active surveillance regimen and who now have evidence of disease progression.", source: NG131 },
    ],
    meaning: "Surveillance is a timetable, not a shrug. In the first year it is a PSA every three or four months, a rectal examination at twelve months and an MRI at twelve to eighteen months; after that it is a PSA every six months and an examination every year, with an MRI or a repeat biopsy whenever anything changes. Knowing the timetable is the difference between being monitored and being forgotten, so ask for it in writing and ask who books the appointments.",
    questions: ["Can I have the surveillance timetable in writing, with who books each test?", "What PSA rise or MRI change would make you recommend treatment?", "Who do I ring if an appointment does not arrive?"],
    links: [LINKS.surveillance, LINKS.psa, LINKS.mri],
  },
  {
    id: "docetaxel-high-risk",
    title: "High-risk disease starting long-term hormone therapy: the docetaxel conversation",
    tone: "discuss",
    quotes: [
      { text: "Discuss the option of docetaxel chemotherapy with people who have newly diagnosed non-metastatic prostate cancer who: are starting long-term androgen deprivation therapy and have no significant comorbidities and have high-risk disease, as shown by: T3/T4 staging or Gleason score 8 to 10 or PSA greater than 40 microgram/litre.", source: NG131 },
      { text: "In a large UK randomised trial, 80 out of 100 people with high-risk disease who did not receive docetaxel were still alive after 5 years compared with 84 out of 100 people who did. However, this difference could be because of chance.", source: NG131, grade: "NG131 box 3" },
      { text: "15 out of 100 people who took docetaxel developed febrile neutropenia (that is, they got a fever because the chemotherapy had reduced their white blood cells' ability to fight infection). 1 out of 100 people who took docetaxel died because of infections that, in the opinion of the investigators, they might not have developed if they had not received docetaxel.", source: NG131, grade: "NG131 box 3" },
    ],
    meaning: "For high-risk disease that has not spread, six cycles of chemotherapy can be added to the hormone therapy. NICE is unusually candid about what is known: chemotherapy clearly delays progression by about a year, the survival difference of four in a hundred at five years might be chance, and fifteen in a hundred get a fever from a low white count, with one in a hundred dying of an infection they might not otherwise have had. That is a real decision with real numbers on both sides, and it belongs to you.",
    questions: ["Do I meet NICE's criteria for the docetaxel discussion: T3 or T4, Gleason 8 to 10, or PSA above 40?", "What would six cycles mean for my work and my life over those four months?", "What is the plan if I get a fever, and what number do I ring?"],
    links: [LINKS.docetaxel, LINKS.mdt],
  },
  {
    id: "warned-before-treatment",
    title: "What NICE says you must be told before you consent, and who has to see you",
    tone: "refer",
    quotes: [
      { text: "Tell people with prostate cancer and their partners or carers about the effects of prostate cancer and the treatment options on their: sexual function, physical appearance, continence, other aspects of masculinity. Support people and their partners or carers in making treatment decisions, taking into account the effects on quality of life as well as survival.", source: NG131 },
      { text: "People with prostate cancer who are candidates for radical treatment should have the opportunity to discuss the range of treatment modalities and their serious side effects in relation to their treatment options with a specialist surgical oncologist and a specialist clinical oncologist.", source: NG131 },
      { text: "Warn people undergoing radical treatment for prostate cancer of the likely effects of the treatment on their urinary function.", source: NG131 },
      { text: "Explain to people and, if they wish, their partner, about the potential loss of ejaculation and fertility associated with radical treatment for prostate cancer. Offer sperm storage.", source: NG131 },
    ],
    meaning: "Four things NICE requires before you sign anything: that continence, sexual function, appearance and masculinity are discussed with you and, if you want, your partner; that you get to talk to both a surgeon and a radiotherapy oncologist rather than whichever one you met first; that you are warned about urinary function; and that sperm storage is offered, which applies to any man who might want children, at any age. If any of the four has not happened, that is a fair thing to say out loud.",
    questions: ["Have I been seen by both a surgeon and a clinical oncologist, and did they agree?", "Has sperm storage been offered to me?", "Can my partner come to the next appointment so we hear the same thing?"],
    links: [LINKS.mdt, LINKS.prep],
  },
  {
    id: "hifu-cryotherapy",
    title: "HIFU and cryotherapy: NICE says not outside a trial, and why",
    tone: "stop",
    quotes: [
      { text: "Do not offer high-intensity focused ultrasound and cryotherapy to people with localised prostate cancer, other than in the context of controlled clinical trials comparing their use with established interventions.", source: NG131 },
      { text: "Because there was a lack of evidence on quality-of-life benefits and long-term survival, these interventions are not recommended in this guideline.", source: NG131 },
      { text: "NICE's interventional procedures guidance on focal therapy using high-intensity focused ultrasound for localised prostate cancer and focal therapy using cryoablation for localised prostate cancer found no major safety concerns, but evidence on efficacy is limited in quantity and there is a concern that prostate cancer is commonly multifocal.", source: NG131 },
    ],
    meaning: "Focal treatments that heat or freeze part of the prostate are offered privately and at some NHS centres, and they are attractive because they promise the cure without the leaking. NICE's position is that they should be used in trials comparing them with established treatments, not instead of them, because the long-term results are not in and because prostate cancer is usually in more than one place in the gland. If one is being offered to you, ask whether it is inside a trial.",
    questions: ["Is this being offered inside a clinical trial, and can I see the protocol?", "If the focal treatment does not work, can I still have surgery or radiotherapy afterwards?", "What is your centre's own recurrence rate after this, and over how many years?"],
    links: [LINKS.decisions, LINKS.mdt],
  },
  {
    id: "continence-services",
    title: "If continence is what worries you most: what exists, and when to ask",
    tone: "refer",
    quotes: [
      { text: "Ensure that people with prostate cancer who have troublesome urinary symptoms after treatment have access to specialist continence services for assessment, diagnosis and conservative treatment. This could include coping strategies, pelvic floor muscle re-education, bladder retraining and pharmacotherapy.", source: NG131 },
      { text: "Refer people with prostate cancer who have intractable stress incontinence to a specialist surgeon for consideration of an artificial urinary sphincter.", source: NG131 },
      { text: "Offer a urological assessment to people who have troublesome urinary symptoms before treatment.", source: NG131 },
      { text: "Do not offer injection of bulking agents into the distal urinary sphincter to treat stress incontinence in people with prostate cancer.", source: NG131 },
    ],
    meaning: "There is a service for this, it is free, and you do not have to wait until it has gone on for years. NICE asks that you have access to specialist continence services, which means pelvic floor re-education with a physiotherapist, bladder retraining and medicines, and that men whose stress incontinence does not settle are referred for an artificial urinary sphincter, an implanted device that keeps the tube closed until you squeeze a pump. It also rules one thing out: bulking injections are not to be offered. If you already have urinary symptoms before treatment, NICE asks for a urological assessment first.",
    questions: ["Can I see a continence physiotherapist before treatment to learn the exercises properly?", "At what point would you refer me for an artificial urinary sphincter?", "Who supplies pads, and do I pay for them?"],
    links: [LINKS.decisions, LINKS.first60],
  },
  {
    id: "sexual-services",
    title: "If sexual function is what worries you most: what exists, and when to ask",
    tone: "refer",
    quotes: [
      { text: "Offer people who have had radical treatment for prostate cancer access to specialist erectile dysfunction services.", source: NG131 },
      { text: "Offer people with prostate cancer who experience loss of erectile function phosphodiesterase type 5 (PDE5) inhibitors to improve their chance of spontaneous erections.", source: NG131 },
      { text: "If PDE5 inhibitors do not restore erectile function or are contraindicated, offer people vacuum devices, intraurethral inserts or penile injections, or penile prostheses as an alternative.", source: NG131 },
      { text: "Offer people with prostate cancer, and their partners or carers, the opportunity to talk to a healthcare professional experienced in dealing with psychosexual issues at any stage of the condition and its treatment.", source: NG131 },
    ],
    meaning: "The ladder is written into the guideline, and everything on it is free on the NHS: tablets first, then vacuum pumps, pellets or creams, self-injections, and an implant if none of those work. Beside the ladder sits the offer of someone trained in psychosexual issues, for you and for your partner, at any stage. The commonest mistake is waiting: erections are easier to recover if blood keeps flowing to the penis from early on, so ask to be referred before treatment rather than after a silent year.",
    questions: ["Can I be referred to the erectile dysfunction service now, before treatment?", "Which of tablets, pump, injections and pellets would you start with for me, and how long do I try each one?", "Is there a psychosexual counsellor my partner and I can see together?"],
    links: [LINKS.decisions, LINKS.first60],
  },
  {
    id: "progression-and-follow-up",
    title: "If stopping the cancer is what worries you most: what follow-up looks like and what a rising PSA means",
    tone: "watch",
    quotes: [
      { text: "Check PSA levels for all people with prostate cancer who are having radical treatment no earlier than 6 weeks after treatment, at least every 6 months for the first 2 years, and then at least once a year after that.", source: NG131 },
      { text: "Take into account that biochemical relapse (a rising PSA) alone should not mean an immediate change in treatment is needed.", source: NG131 },
      { text: "Offer people with biochemical relapse after radical prostatectomy, with no known metastases, radical radiotherapy to the prostatic bed.", source: NG131 },
      { text: "Estimate PSA doubling time if biochemical relapse occurs. Base this on a minimum of 3 measurements over at least a 6-month period.", source: NG131 },
    ],
    meaning: "After treatment the PSA becomes the thing you watch: no earlier than six weeks, then at least every six months for two years, then yearly. A rise is not an emergency and NICE says so in the recommendation itself, because the speed matters more than the number: three readings over at least six months are used to work out how fast it is doubling. A rise after surgery with no sign of spread has a standard answer, which is radiotherapy to the prostate bed, and that is often still given with the aim of cure.",
    questions: ["What PSA level after treatment counts as a relapse for me, and who is watching it?", "If my PSA rises, how long would you watch before doing anything?", "Would I have a PSMA PET scan to find out where it is?"],
    links: [LINKS.psa, LINKS.bcr, LINKS.decisions],
  },
  {
    id: "decision-aid-and-nomograms",
    title: "If you cannot decide: NICE says the clinic should be using a decision aid with you",
    tone: "info",
    quotes: [
      { text: "Use an up-to-date decision aid in all urological cancer multidisciplinary teams (MDTs). Healthcare professionals trained in its use should offer it to people with localised prostate cancer when making treatment decisions.", source: NG131 },
      { text: "Use nomograms together with people with prostate cancer to help: with decision making, predict biopsy results, predict pathological stage, predict risk of treatment failure. Explain the reliability, validity and limitations of any predictions made using nomograms.", source: NG131 },
      { text: "Discuss all relevant management options in this guideline with people with prostate cancer and their partners or carers, even if they are not available through their local services.", source: NG131 },
      { text: "Find out the extent to which the person wishes to be involved in their decision making, and ensure that they have sufficient information to do so.", source: NG131 },
    ],
    meaning: "Not knowing what to choose is not a failure on your part: NICE expects the team to use a decision aid with you, to run the prediction tools in front of you and explain their limits, and to tell you about options even when this hospital does not do them. That last sentence is worth holding on to, because it means you should hear about brachytherapy, or a trial, or a technique offered elsewhere, rather than only what is available down the corridor.",
    questions: ["Which decision aid do you use here, and can I take it home?", "What options exist that this hospital does not offer?", "Can I have a second opinion, and will you help me arrange it?"],
    links: [LINKS.mdt, LINKS.prep, LINKS.decisions],
  },
];

const decide = (a: Answers): string[] => {
  const { risk, radical, priority } = a;
  const out: string[] = [];

  if (radical === "not-suitable") out.push("not-suitable-watchful-waiting");
  else if (risk === "unknown") out.push("risk-unknown");
  else if (risk === "cpg1") out.push("cpg1-active-surveillance");
  else if (risk === "cpg2") out.push("cpg2-three-way-choice");
  else if (risk === "cpg3") out.push("cpg3-radical-first");
  else out.push("cpg4-5-no-surveillance");

  // NICE's box 2 covers CPG 1 to 3; it is not the right table for CPG 4 and 5, and the cards say so.
  const boxTwo = risk !== "cpg4-5" && radical !== "not-suitable";
  if (boxTwo) {
    out.push("protect-survival");
    if (priority === "continence") out.push("protect-urinary", "protect-sexual", "protect-bowel");
    else if (priority === "sexual") out.push("protect-sexual", "protect-urinary", "protect-bowel");
    else if (priority === "progression") out.push("protect-bowel", "protect-urinary", "protect-sexual");
    else out.push("protect-urinary", "protect-sexual", "protect-bowel");
  }

  if (risk !== "cpg1" && risk !== "unknown" && radical !== "not-suitable") out.push("adt-with-radiotherapy");
  if (radical !== "not-suitable") out.push("radiotherapy-schedule");
  if (risk === "cpg4-5" && radical !== "not-suitable") out.push("docetaxel-high-risk");
  if ((risk === "cpg1" || risk === "cpg2" || risk === "cpg3") && radical !== "not-suitable") out.push("surveillance-protocol");
  if (radical !== "not-suitable") out.push("warned-before-treatment");
  if (risk !== "unknown" && radical !== "not-suitable") out.push("hifu-cryotherapy");

  if (priority === "continence") out.push("continence-services");
  else if (priority === "sexual") out.push("sexual-services");
  else if (priority === "progression") out.push("progression-and-follow-up");
  else out.push("decision-aid-and-nomograms");

  return out;
};

export const prostateLocalisedTool: DecisionTool = {
  id: "prostate-localised",
  cancerId: "prostate",
  entityIds: ["prostate", "prostate-low-risk", "prostate-intermediate-risk", "prostate-high-risk", "active-surveillance", "psa", "gleason-grade-group", "cambridge-prognostic-group", "percentage-gleason-pattern-4", "intraductal-carcinoma-prostate", "protect"],
  title: "Prostate cancer that has not spread: monitoring, surgery or radiotherapy",
  short: "Localised prostate cancer",
  lede: "An educational aid, not advice for your case. Enter your Cambridge Prognostic Group and it shows what NICE NG131 offers at that group, word for word, together with NICE's own numbers for what each option did to survival, progression, continence, erections and bowels in a UK randomised trial.",
  icon: "compass",
  guideline: NG131,
  sources: [NG131, PROTECT_15Y, PROTECT_PRO, PROTECT_PRO12],
  inputs: [
    {
      id: "risk", label: "Cambridge Prognostic Group", hint: "NICE asks the urology multidisciplinary team to assign every newly diagnosed localised or locally advanced prostate cancer to one of five groups, from your Gleason score or grade group, your PSA and your T stage, and then writes a separate recommendation for each group. If you were given a risk band instead, the bridge is: CPG 1 is low risk, CPG 2 and 3 are intermediate risk, CPG 4 and 5 are high risk. If nobody has told you either, choose the last option.", icon: "layers",
      options: [
        { value: "cpg1", label: "CPG 1, low risk (Gleason 6 or grade group 1, PSA under 10, T1 to T2)" },
        { value: "cpg2", label: "CPG 2, intermediate risk (Gleason 3+4 or grade group 2, or PSA 10 to 20, T1 to T2)" },
        { value: "cpg3", label: "CPG 3, intermediate risk (Gleason 3+4 and PSA 10 to 20, or Gleason 4+3 or grade group 3, T1 to T2)" },
        { value: "cpg4-5", label: "CPG 4 or 5, high risk (Gleason 8 or above, PSA over 20, or T3 to T4)" },
        { value: "unknown", label: "I have not been told which group or band I am in" },
      ],
    },
    {
      id: "radical", label: "Treatment aimed at cure", hint: "NICE writes separate recommendations for people choosing not to have immediate radical treatment and for people for whom curative treatment is not suitable, so your position is part of the guideline rather than something applied on top of it.", icon: "question",
      options: [
        { value: "considering", label: "Open to surgery or radiotherapy, or not yet decided" },
        { value: "prefer-avoid", label: "I would rather not have surgery or radiotherapy now" },
        { value: "not-suitable", label: "Treatment aimed at cure is not suitable, or I do not want it at all" },
      ],
    },
    {
      id: "priority", label: "What you are most worried about losing", hint: "This changes the order the trade-off cards are shown in and which support service the aid points you at. It does not change what NICE recommends.", icon: "pain",
      options: [
        { value: "continence", label: "Staying dry" },
        { value: "sexual", label: "Sex and erections" },
        { value: "progression", label: "Stopping the cancer, whatever it costs" },
        { value: "unsure", label: "I do not know yet" },
      ],
    },
  ],
  cards,
  decide,
  questions: [
    "What is my Cambridge Prognostic Group, and what were the three numbers that decided it?",
    "Has anyone taken me through box 2 of NICE NG131, the table of benefits and harms?",
    "Have I been seen by both a surgeon and a clinical oncologist?",
    "For your own patients, what proportion are pad-free and potent at one year, and how are you counting that?",
    "What would you do if you were me, and what would change your mind?",
  ],
  notes: [
    "This aid covers prostate cancer that has not spread beyond the prostate or the tissue immediately around it. It does not cover cancer that has spread to lymph nodes, bone or elsewhere, treatment after a rising PSA, or the choice of hormone therapy, which are on the decisions page.",
    "No personal survival figure is given here, and NICE gives none. The numbers in box 2 describe what happened to 100 men offered each option in one UK randomised trial of 1,643 men with mostly CPG 1 to 3 disease. Your own risk depends on your grade, your PSA, your stage, your age and your other health.",
    "Box 2 and the trial behind it were built on CPG 1 to 3 disease. Where CPG 4 or 5 is chosen the aid does not show those numbers, because they were not measured in men like that.",
    "Where the guideline uses the words offer a choice between, decline, or choose not to have immediate radical treatment, the cards keep them. Your preference is written into these recommendations.",
    "The aid asks for a Cambridge Prognostic Group because that is what NICE writes its recommendations in and what a man in England is told. If you were given a risk band instead, CPG 1 is low risk, CPG 2 and 3 are intermediate risk, and CPG 4 and 5 are high risk.",
    "Nothing you enter is stored or sent anywhere.",
  ],
  links: [LINKS.decisions, LINKS.first60, LINKS.prep, LINKS.cancer, LINKS.protect],
  asOf,
};
