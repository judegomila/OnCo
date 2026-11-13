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
 */
export const routinePreoperativeTests = protocol({
  id: "routine-preoperative-tests",
  name: "Routine tests before planned surgery, by size of operation and fitness",
  aka: ["preoperative tests", "pre-op bloods", "pre-assessment tests", "preoperative investigations", "routine chest X-ray before surgery", "preoperative ECG"],
  domain: "surgery-perioperative",
  tldr: "Before a planned operation, tests should be chosen for the person and the size of the operation, not done for everyone. A blood count is offered before major surgery; a heart tracing and kidney tests depend on age, health and the operation; a chest X-ray, urine dipstick or heart scan is not done routinely.",
  simple: "You may have blood tests or a heart tracing before your operation. Which ones depends on how big the operation is and on your health. Tests that will not change your care are not needed.",
  summary: "NICE NG45 (2016) sets which routine tests to offer before elective surgery by surgery grade (minor, intermediate, major or complex) and ASA grade. Not routinely before any surgery: chest X-ray, resting echocardiography (consider it for a murmur with cardiac symptoms, or signs of heart failure, after an ECG and anaesthetic discussion), urine dipstick (consider midstream urine culture if a urinary infection would change the decision), sickle cell testing (ask about it instead), and HbA1c in people without diabetes. Offer HbA1c to people with diabetes not tested in the last 3 months. Before major or complex surgery: full blood count for all ASA grades; ECG for ASA 2 and above, and considered over 65 at ASA 1 without an ECG in the last year; kidney function for ASA 2 and above, and considered in ASA 1 at risk of acute kidney injury. Clotting tests are not routine; consider them in chronic liver disease, and make an individual plan for anticoagulants, noting that DOAC effects cannot be measured by routine tests. Ask about pregnancy on the day of surgery and test with consent if in doubt. Take existing medicines into account. People with cancer often have recent blood tests from their treatment; NG45 does not address chemotherapy or recent cancer treatment.",
  asOf: "2026-11-11",
  setting: {
    who: ["anaesthetist", "nurse", "surgical-team"],
    where: ["outpatient-clinic"],
  },
  population: "People aged over 16 having elective surgery, as NICE NG45 scopes it. It does not cover pregnant women or people having cardiothoracic procedures or neurosurgery (so not lung cancer surgery), and it is not about tests to diagnose or stage the cancer itself.",
  trigger: "Preoperative assessment before a planned operation.",
  steps: [
    {
      action: "Take the person's current medicines into account when deciding on any test",
      why: "Some medicines, such as diuretics or anticoagulants, make particular tests worthwhile.",
      source: "nice-ng45",
      quote: "Take into account any medicines people are taking when considering whether to offer any preoperative test.",
      grade: "Not graded (NICE 1.2.1)",
    },
    {
      action: "Do not routinely offer a chest X-ray, resting echocardiogram or urine dipstick before surgery",
      why: "These tests rarely change the plan when done routinely, and abnormal results can lead to delays and more tests.",
      source: "nice-ng45",
      quote: "Do not routinely offer chest X‑rays before surgery.",
      grade: "Not graded (NICE 1.8.1)",
    },
    {
      action: "Consider an echocardiogram only for a heart murmur with cardiac symptoms, or signs of heart failure, after a resting ECG and discussion with an anaesthetist",
      why: "In these people a heart scan can change how the anaesthetic is given.",
      source: "nice-ng45",
      quote: "Before ordering the resting echocardiogram, carry out a resting electrocardiogram (ECG) and discuss the findings with an anaesthetist.",
      grade: "Not graded (NICE 1.9.2)",
    },
    {
      action: "Offer HbA1c to people with diabetes who have not been tested in the last 3 months; do not test routinely in people without diabetes",
      why: "Poorly controlled diabetes raises the risk of complications and can often be improved before planned surgery.",
      source: "nice-ng45",
      quote: "Offer HbA1c testing to people with diabetes having surgery if they have not been tested in the last 3 months.",
      grade: "Not graded (NICE 1.6.2)",
    },
    {
      action: "Before major or complex surgery, offer a full blood count to everyone; offer kidney function tests and an ECG to people with ASA grade 2 or above, and consider them in fit people at risk of kidney injury or over 65",
      why: "Anaemia, kidney problems and heart rhythm problems matter more as the operation gets bigger.",
      source: "nice-ng45",
      grade: "Table 3 (major or complex surgery): full blood count Yes at every ASA grade; kidney function and ECG Yes at ASA 2 and ASA 3 or 4, Consider at ASA 1",
    },
    {
      action: "Do not test clotting routinely; consider it in chronic liver disease, and make an individual plan for anyone on anticoagulants",
      why: "Clotting tests rarely change care unless the liver is affected; blood thinners need their own plan, and newer ones do not show on routine tests.",
      source: "nice-ng45",
      quote: "Note that currently the effects of direct oral anticoagulants (DOACs) cannot be measured by routine testing.",
      grade: "Table 2 and Table 3: Not routinely at ASA 1 and 2; Consider in people with chronic liver disease",
    },
    {
      action: "Ask about sickle cell disease rather than testing for it routinely",
      why: "Asking finds people who need specialist planning without testing everyone.",
      source: "nice-ng45",
      quote: "Ask the person having surgery if they or any member of their family have sickle cell disease.",
      grade: "Not graded (NICE 1.4.2)",
    },
    {
      action: "On the day of surgery, sensitively ask anyone who could be pregnant whether they might be, and test with consent if there is any doubt",
      why: "Anaesthesia and surgery can harm a pregnancy, and some cancer surgery would be planned differently.",
      source: "nice-ng45",
      quote: "Carry out a pregnancy test with the woman's consent if there is any doubt about whether she could be pregnant.",
      grade: "Not graded (NICE 1.3.4)",
    },
  ],
  bestInClass: {
    statement: "NICE NG45 (2016): tests chosen by surgery grade and ASA grade, with chest X-ray, echocardiography, urine dipstick, sickle cell testing and HbA1c in people without diabetes not done routinely, and a full blood count before all major or complex surgery. It is the only guideline read here, so no disagreement can be shown.",
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
      gradingScheme: "NICE does not grade recommendations. Tables mark each test 'Yes' (offer), 'Not routinely' or 'Consider' by surgery grade and ASA grade.",
      read: "full-text",
      accessed: "2026-11-11",
    },
  ],
  technologies: [],
  terms: [],
  related: ["enhanced-recovery-after-liver-surgery", "vte-prophylaxis-after-cancer-surgery"],
  upgrades: [],
  gaps: [
    "Only one guideline (NICE NG45, 2016) was read. Other national guidance (for example US or European preoperative evaluation guidelines) was not, so the page cannot show where they differ.",
    "NG45 does not address people who are having or have recently had chemotherapy, radiotherapy or immunotherapy, who may need blood counts, thyroid or other tests for that reason; those come from the cancer team's own protocols.",
    "Tests to diagnose or stage the cancer, and cardiopulmonary exercise testing before major cancer surgery, are outside NG45 and this record.",
  ],
});
