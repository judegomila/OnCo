import { protocol } from "./helpers";

/*
 * Which routine tests to do before planned surgery, including cancer surgery, by size of operation and the person's
 * fitness (ASA grade).
 *
 * What was read, and how (11 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - NICE NG45, Routine preoperative tests for elective surgery (published April 2016): overview (scope) and
 *   recommendations page, full text,
 *   including Tables 1 to 3 (tests by surgery grade and ASA grade), which survive as text cell by cell.
 * No second guideline was read; see gaps.
 *
 * Second accuracy pass, 17 November 2026: the NG45 overview, recommendations, context and update information pages
 * were fetched again from nice.org.uk with curl and read as text with the tags stripped. Every quote was checked
 * verbatim by script. The page still shows publication on 5 April 2016 with no later update. Corrected: the clotting
 * step now carries the ASA grade and surgery grade its table cell is scoped to; the ECG at ASA 1 carries its
 * 12-month condition; reasons NICE does not give were taken out of the "why" lines; the claim that lung cancer
 * surgery is outside the guideline was removed, because the recommendations list lung operations as an example.
 */
export const routinePreoperativeTests = protocol({
  id: "routine-preoperative-tests",
  name: "Routine tests before planned surgery, by size of operation and fitness",
  aka: ["preoperative tests", "pre-op bloods", "pre-assessment tests", "preoperative investigations", "routine chest X-ray before surgery", "preoperative ECG"],
  domain: "surgery-perioperative",
  tldr: "Before a planned operation, tests should be chosen for the person and the size of the operation, not done for everyone. A blood count is offered before major or complex surgery; a heart tracing and kidney tests depend on age, health and the operation; a chest X-ray, urine dipstick or heart scan is not done routinely.",
  simple: "You may have blood tests or a heart tracing before your operation. Which ones depends on how big the operation is and on your health. Not everyone needs every test.",
  summary: "NICE NG45 (2016) sets which routine tests to offer before elective surgery by surgery grade (minor, intermediate, major or complex) and ASA grade. Not routinely before any surgery: chest X-ray, resting echocardiography (consider it for a murmur with cardiac symptoms, or signs of heart failure, after an ECG and anaesthetic discussion), urine dipstick (consider midstream urine culture if a urinary infection would change the decision), sickle cell testing (ask about it instead), and HbA1c in people without diagnosed diabetes. Offer HbA1c to people with diabetes not tested in the last 3 months. Before minor surgery no full blood count, clotting or lung function test is routine at any ASA grade; kidney function and an ECG are considered only at ASA 3 or 4. Before major or complex surgery: full blood count for all ASA grades; ECG for ASA 2 and above, and considered over 65 at ASA 1 without an ECG in the past 12 months; kidney function for ASA 2 and above, and considered in ASA 1 at risk of acute kidney injury. Clotting tests are not routine at ASA 1 or 2 for any surgery, or at any ASA grade for minor surgery; before intermediate, major or complex surgery at ASA 3 or 4, consider them in chronic liver disease, and make an individual plan in line with local guidance if anticoagulant treatment needs changing, noting that DOAC effects cannot be measured by routine tests. Ask about pregnancy on the day of surgery and test with consent if in doubt. Take existing medicines into account. NG45 was developed in relation to cardiovascular, diabetes, obesity, renal and respiratory comorbidities; its recommendations do not mention chemotherapy or other cancer treatment.",
  asOf: "2026-11-17",
  setting: {
    who: ["anaesthetist", "nurse", "surgical-team"],
    where: ["outpatient-clinic"],
  },
  population: "People aged over 16 having elective surgery, as NICE NG45 scopes it. It does not cover pregnant women or people having cardiothoracic procedures or neurosurgery. The guideline is English (NICE); other countries have their own guidance, which was not read.",
  trigger: "Preoperative assessment before a planned operation.",
  steps: [
    {
      action: "Take the person's current medicines into account when deciding on any test",
      why: "NICE asks that medicines be thought about before any test is chosen. It does not list which medicines call for which test.",
      source: "nice-ng45",
      quote: "Take into account any medicines people are taking when considering whether to offer any preoperative test.",
      grade: "Not graded (NICE 1.2.1)",
    },
    {
      action: "Do not routinely offer a chest X-ray, resting echocardiogram or urine dipstick before surgery",
      why: "NICE's context section says that too much testing can cause anxiety, delays in treatment and unnecessary treatment after false positive results, and that abnormal results often do not change care in relatively healthy people.",
      source: "nice-ng45",
      quote: "Do not routinely offer chest X‑rays before surgery.",
      grade: "Not graded (NICE 1.8.1)",
    },
    {
      action: "Consider an echocardiogram only for a heart murmur with cardiac symptoms, or signs of heart failure, after a resting ECG and discussion with an anaesthetist",
      why: "These are the two situations in which NICE says a heart scan may be considered. The cardiac symptoms it names are breathlessness, pre-syncope, syncope and chest pain.",
      source: "nice-ng45",
      quote: "Before ordering the resting echocardiogram, carry out a resting electrocardiogram (ECG) and discuss the findings with an anaesthetist.",
      grade: "Not graded (NICE 1.9.2)",
    },
    {
      action: "Offer HbA1c to people with diabetes who have not been tested in the last 3 months; do not test routinely in people without diagnosed diabetes",
      why: "A result from the last 3 months is recent enough for NICE. It also asks that the most recent HbA1c result goes with a referral from primary care.",
      source: "nice-ng45",
      quote: "Offer HbA1c testing to people with diabetes having surgery if they have not been tested in the last 3 months.",
      grade: "Not graded (NICE 1.6.2)",
    },
    {
      action: "Before major or complex surgery, offer a full blood count to everyone; offer kidney function tests and an ECG to people with ASA grade 2 or above, and at ASA grade 1 consider kidney function tests for people at risk of acute kidney injury and an ECG for people aged over 65 with no ECG result from the past 12 months",
      why: "NICE's table for major or complex surgery offers more tests than its tables for minor and intermediate surgery. ASA grade 1 means a normal healthy patient and ASA grade 2 a patient with mild systemic disease.",
      source: "nice-ng45",
      grade: "Table 3 (major or complex surgery): full blood count Yes at every ASA grade; kidney function and ECG Yes at ASA 2 and ASA 3 or 4; at ASA 1, kidney function Consider in people at risk of AKI and ECG Consider for people aged over 65 if no ECG results available from past 12 months",
    },
    {
      action: "Do not test clotting routinely; before intermediate, major or complex surgery at ASA grade 3 or 4, consider it in people with chronic liver disease, and make an individual plan in line with local guidance if anticoagulant treatment needs changing",
      why: "NICE notes that the effect of direct oral anticoagulants cannot be measured by routine tests. Where local guidance calls for clotting to be tested, it advises point-of-care testing.",
      source: "nice-ng45",
      quote: "Note that currently the effects of direct oral anticoagulants (DOACs) cannot be measured by routine testing.",
      grade: "Table 1 (minor surgery): Not routinely at every ASA grade. Table 2 and Table 3: Not routinely at ASA 1 and ASA 2; at ASA 3 or 4, Consider in people with chronic liver disease",
    },
    {
      action: "Ask about sickle cell disease rather than testing for it routinely",
      why: "NICE advises asking about the person and their family. If a specialist sickle cell service manages the person's disease, that team should be contacted before surgery.",
      source: "nice-ng45",
      quote: "Ask the person having surgery if they or any member of their family have sickle cell disease.",
      grade: "Not graded (NICE 1.4.2)",
    },
    {
      action: "On the day of surgery, sensitively ask all women of childbearing potential whether they could be pregnant, and test with consent if there is any doubt",
      why: "NICE asks that women who could be pregnant are made aware of the risks of the anaesthetic and the procedure to the fetus, and that these discussions are documented.",
      source: "nice-ng45",
      quote: "Carry out a pregnancy test with the woman's consent if there is any doubt about whether she could be pregnant.",
      grade: "Not graded (NICE 1.3.4)",
    },
  ],
  bestInClass: {
    statement: "NICE NG45 (2016): tests chosen by surgery grade and ASA grade, with chest X-ray, echocardiography, urine dipstick, sickle cell testing and HbA1c in people without diagnosed diabetes not done routinely, and a full blood count before all major or complex surgery. It is the only guideline read here, so no disagreement can be shown.",
    sources: ["nice-ng45"],
  },
  variants: [],
  grades: [
    { claim: "No routine resting echocardiography", grade: "Not graded (NICE 1.9.1)", source: "nice-ng45", quote: "Do not routinely offer resting echocardiography before surgery." },
    { claim: "No routine urine dipstick", grade: "Not graded (NICE 1.7.1)", source: "nice-ng45", quote: "Do not routinely offer urine dipstick tests before surgery." },
    { claim: "No routine HbA1c in people without diagnosed diabetes", grade: "Not graded (NICE 1.5.1)", source: "nice-ng45", quote: "Do not routinely offer HbA1c testing before surgery to people without diagnosed diabetes." },
    { claim: "No routine sickle cell testing", grade: "Not graded (NICE 1.4.1)", source: "nice-ng45", quote: "Do not routinely offer testing for sickle cell disease or sickle cell trait before surgery." },
  ],
  sources: [
    {
      key: "nice-ng45",
      label: "Routine preoperative tests for elective surgery (NG45), recommendations",
      publisher: "NICE",
      year: 2016,
      url: "https://www.nice.org.uk/guidance/ng45/chapter/Recommendations",
      gradingScheme: "NICE prints no evidence grade on its recommendations; the wording ('offer', 'do not routinely offer', 'consider') shows their strength. Tables mark each test 'Yes' (offer the test), 'Not routinely' (do not routinely offer the test) or 'Consider' (the value of the test may depend on specific patient characteristics) by surgery grade and ASA grade.",
      read: "full-text",
      accessed: "2026-11-17",
    },
  ],
  technologies: [],
  terms: [],
  related: ["enhanced-recovery-after-liver-surgery", "vte-prophylaxis-after-cancer-surgery"],
  upgrades: [],
  gaps: [
    "Only one guideline (NICE NG45, 2016) was read. Other national guidance (for example US or European preoperative evaluation guidelines) was not, so the page cannot show where they differ. On 17 November 2026 the NICE page still showed publication on 5 April 2016 and no later update.",
    "NG45's recommendations do not mention chemotherapy, radiotherapy or immunotherapy. No source read here says which extra tests a person needs before surgery because of recent cancer treatment.",
    "The tests NG45 lists as covered do not include tests to diagnose or stage a cancer, or cardiopulmonary exercise testing, which its context section names only as a newer test in growing use. They are outside this record.",
    "NG45's overview says it does not cover cardiothoracic procedures, yet its recommendations list lung operations among the examples of major or complex surgery. The pages read do not explain the difference, so this record does not say whether lung cancer surgery is covered.",
    "The reasons behind individual recommendations are in NICE's full guideline and evidence reviews, which were not read; the 'why' lines here say only what the recommendations and context pages state.",
  ],
});
