import { protocol } from "./helpers";

/*
 * A scan with contrast for an adult who has reacted to contrast before: what the record must hold, when to refer to an
 * allergy specialist, choosing a different agent, and the narrow place left for premedication.
 *
 * What was read, and how (11 November 2026, fetched raw into a scratch directory and read as text):
 * - ESUR Contrast Media Safety Committee Guidelines 2026: full text, the PDF linked from esur.org/esur-guidelines-2026/
 *   (uploaded October 2026, preface dated November 2025), read with pdftotext. Its hypersensitivity sections were
 *   rewritten for this edition. It prints no grades.
 * - van der Molen et al., Hypersensitivity reactions to contrast media: Part 2. Prevention of recurrent hypersensitivity
 *   reactions in adults (Eur Radiol 2025), the ESUR paper behind the handbook: full text, Europe PMC XML (PMC12559128).
 *   It prints no grades.
 * - ACR Manual on Contrast Media: not reachable (the address served a JavaScript shell to a script). It is the main
 *   source of the corticosteroid premedication regimens used in North America; no step or figure here rests on it.
 * - Part 1 of the ESUR paper (management of reactions, PMC12559081) and the EAACI guideline it cites were not read; the
 *   EAACI emergency regimen is quoted as the ESUR handbook prints it.
 *
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied from the raw text with line breaks
 * joined.
 */
export const contrastReactionHistoryAndPremedication = protocol({
  id: "contrast-reaction-history-and-premedication",
  name: "Contrast scans after a previous contrast reaction: allergy referral, switching agent and premedication",
  aka: ["contrast allergy", "contrast premedication", "steroid premedication before CT", "allergy to CT dye", "iodine contrast allergy", "gadolinium allergy", "contrast hypersensitivity", "recurrent contrast reaction prevention"],
  domain: "screening-diagnostics",
  tldr: "If you have reacted to a scan dye before, tell the team every time, and ask that the name of the dye goes in your records. European radiologists now advise using a different dye, chosen with an allergy specialist where possible, rather than taking steroid tablets beforehand, which have not been shown to prevent serious reactions. A needed scan should not be refused because of an old reaction.",
  simple: "Had a reaction to scan dye before? Tell the team. They should note which dye it was, may send you to an allergy clinic, and will usually use a different dye next time. You will be watched for at least 30 minutes after the dye with a drip line left in.",
  summary: "ESUR (2025 paper; 2026 handbook) has moved away from routine premedication. Corticosteroid and H1-antihistamine premedication has no evidence of reducing severe immediate reactions and weak, conflicting evidence for mild or moderate ones; it is not recommended after non-immediate reactions; and in comparative studies changing the culprit agent was more effective (in one multivariate analysis, OR 0.329 for recurrence after changing the iodinated agent against 0.907, not significant, for steroid premedication). The sequence is: document the agent, dose, timing and severity of the index reaction; measure serum tryptase within 4 hours of a moderate or severe immediate reaction (and a baseline at 24 hours or more); refer moderate and severe reactions, reactions to more than one agent and recurrent reactions to a drug allergy specialist for skin testing of the culprit and alternatives, ideally within 6 months; and for the next scan consider unenhanced or other imaging but never deny a well-indicated contrast examination. When contrast is given, use the agent the allergist advises, or a different one if the culprit is known, and observe for at least 30 minutes with the line in place. Elective scans after moderate or severe reactions wait for the allergy result. Premedication remains optional only for an emergency after a severe reaction to an unknown agent (ESUR quoting EAACI: prednisolone 50 mg IV or equivalent and clemastine 2 mg IV or equivalent, at least 30 minutes before). After a severe non-immediate skin reaction with danger signs, the whole class (all iodinated or all gadolinium agents) is avoided. North American practice, in the ACR Manual, still includes corticosteroid premedication regimens; that manual could not be read here.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "radiographer", "nurse", "patient-or-carer"],
    where: ["outpatient-clinic", "ward", "emergency-department"],
  },
  population: "Adults with a history of a hypersensitivity reaction to an iodine-based or gadolinium-based contrast agent who need a contrast-enhanced scan. Children are outside the ESUR paper (it excluded paediatric studies). Treating a reaction as it happens is a separate emergency protocol; the ESUR handbook covers it.",
  trigger: "A contrast-enhanced CT or MRI is requested for someone whose record or history mentions a previous contrast reaction.",
  steps: [
    {
      action: "Find out which contrast agent caused the previous reaction, how severe it was and how soon it came on, and record it in the allergy section of the health record",
      why: "Knowing the exact dye and how bad the reaction was decides what is safe next time.",
      source: "esur-2026",
      quote: "If the patient has experienced a previous hypersensitivity reaction, identify the specific agent that elicited the previous reaction, and if the injection is mandatory, choose an alternative contrast agent.",
    },
    {
      action: "After a moderate or severe immediate reaction, take blood for serum tryptase within 4 hours, and again after 24 hours or more as a baseline",
      why: "Tryptase shows whether the reaction was a true allergic-type release from mast cells, which the allergy clinic needs to know.",
      source: "esur-2026",
      quote: "Measure serum tryptase within 4 hours from the start of all moderate to severe immediate hypersensitivity reactions to contrast agents.",
    },
    {
      action: "Refer moderate and severe reactions, reactions to more than one agent, and any repeat reaction to a drug allergy specialist, naming the agent used",
      why: "Skin testing can show which dyes are safe for this person, which is better than guessing.",
      source: "esur-2025-hsr-part2",
      quote: "Serum tryptase should be measured within 1–4 h after a moderate or severe reaction, and at least all moderate or severe hypersensitivity reactions should be referred to an allergologist.",
    },
    {
      action: "Consider an unenhanced scan or another kind of imaging, but do not refuse a contrast scan that is clearly needed when there is no alternative",
      why: "An old reaction should not cost someone a scan their cancer care depends on.",
      source: "esur-2026",
      quote: "Never deny a patient a clinically well-indicated enhanced examination if alternative imaging strategies are not available.",
    },
    {
      action: "For an elective scan after a moderate or severe reaction, wait for the allergy assessment and use the agent it advises",
      why: "The allergy result is the most reliable guide to a safe dye.",
      source: "esur-2026",
      quote: "Postpone imaging to wait for the results of the allergy analysis",
    },
    {
      action: "Where no allergy advice is available, use a different contrast agent from the one that caused the reaction, rather than relying on premedication",
      why: "Switching to a different dye prevented repeat reactions better than steroid tablets in comparative studies.",
      source: "esur-2025-hsr-part2",
      quote: "Changing from the culprit contrast agent to another molecule with differing side-chains is more effective than premedication.",
    },
    {
      action: "Do not give routine premedication; reserve it for an emergency scan after a severe reaction to an unknown agent",
      why: "Steroids and antihistamines beforehand have not been shown to prevent serious reactions, and steroids can raise blood sugar.",
      source: "esur-2025-hsr-part2",
      quote: "Premedication is optional in emergency situations where an unidentified culprit CM led to a severe HR, as recommended by the EAACI",
    },
    {
      action: "If premedication is used in that emergency, give prednisolone 50 mg IV (or equivalent) and clemastine 2 mg IV (or equivalent) at least 30 minutes before, with a resuscitation-trained team member nearby",
      why: "This is the short intravenous regimen ESUR prints from the European allergy guideline for when there is no time for testing.",
      source: "esur-2026",
      quote: "Consider administration of premedication (EAACI guidelines)",
    },
    {
      action: "After the contrast, keep the person under observation for at least 30 minutes with the drip line still in",
      why: "Most immediate reactions start within this time, and the line lets treatment be given at once.",
      source: "esur-2026",
      quote: "When the contrast medium is administered: observe the patient at least 30 minutes with IV line in place",
    },
    {
      action: "After a severe delayed skin reaction with danger signs (blistering, skin loss, mouth or eye involvement, fever or organ involvement), do not give any agent of the same class again; choose other imaging and refer urgently",
      why: "Severe delayed skin reactions can be life-threatening and can recur with related dyes.",
      source: "esur-2026",
      quote: "Avoid all iodine-based contrast media after a severe non-immediate hypersensitivity reaction to an iodine-based contrast medium",
    },
    {
      action: "After a mild or moderate delayed reaction, give the person written advice on what to do if it happens again",
      why: "Delayed reactions, usually a rash, can appear hours to days later, after the person has gone home.",
      source: "esur-2026",
      quote: "Give the patient written instructions for a possible repeat non-immediate hypersensitivity reaction",
    },
  ],
  bestInClass: {
    statement: "ESUR 2025/2026: document the culprit agent and severity, measure tryptase within 4 hours of a moderate or severe immediate reaction, refer to a drug allergy specialist for testing of the culprit and alternatives, and use the agent the allergist advises or, without that, a different agent; observe for at least 30 minutes with the line in place; never deny a well-indicated contrast examination. No routine premedication: there is no evidence that it reduces severe immediate reactions, the evidence for mild and moderate ones is weak and conflicting, and it is not recommended after non-immediate reactions; it stays optional for an emergency after a severe reaction to an unknown agent, as EAACI recommends. The ACR Manual on Contrast Media, the main North American reference, keeps corticosteroid premedication regimens; it could not be read here, so its exact recommendations are not stated.",
    sources: ["esur-2026", "esur-2025-hsr-part2"],
  },
  variants: [
    {
      name: "Corticosteroid and antihistamine premedication before each contrast scan",
      differs: "Gives oral or intravenous corticosteroid, often with an H1-antihistamine, before the contrast to anyone with a previous reaction, frequently scaled to the severity of that reaction, and often with the same contrast agent.",
      evidence: "ESUR (2025): the regimens date from the era of high-osmolar contrast and early low-osmolar agents and remain widely used; there are no comparative randomised trials; premedication may mainly reduce mild reactions and does not significantly affect severe ones; in a large retrospective study recurrence was 19% (80 of 423) with the same agent and steroid premedication against 3% (10 of 322) with a different agent and no premedication (OR 0.14). Corticosteroids can raise blood glucose transiently. The ACR Manual's current regimens could not be read.",
      sources: ["esur-2025-hsr-part2", "acr-manual-contrast"],
    },
  ],
  grades: [
    { claim: "Routine premedication not recommended (no grade printed)", grade: "ungraded consensus", source: "esur-2025-hsr-part2", quote: "In summary, there is no evidence that premedication reduces the risk of severe IHR to CM." },
    { claim: "Change the culprit agent rather than premedicate (no grade printed)", grade: "ungraded consensus", source: "esur-2025-hsr-part2", quote: "Comparative studies have shown that an alternative ICM was more effective than premedication in preventing HR" },
    { claim: "Emergency premedication regimen quoted from EAACI", grade: "ungraded (handbook)", source: "esur-2026", quote: "50 mg prednisolone IV (or equivalent) – ≥ 30min before contrast administration" },
  ],
  sources: [
    {
      key: "esur-2026",
      label: "Contrast Media Safety Committee Guidelines 2026: hypersensitivity reactions to contrast agents (in adults)",
      publisher: "European Society of Urogenital Radiology (ESUR) Contrast Media Safety Committee",
      year: 2026,
      url: "https://www.esur.org/wp-content/uploads/2026/10/Guidelines-2026.pdf",
      gradingScheme: "The handbook prints no grades.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "esur-2025-hsr-part2",
      label: "Hypersensitivity reactions to contrast media: Part 2. Prevention of recurrent hypersensitivity reactions in adults. Updated guidelines by the ESUR Contrast Media Safety Committee",
      publisher: "ESUR Contrast Media Safety Committee (van der Molen et al., European Radiology)",
      year: 2025,
      url: "https://doi.org/10.1007/s00330-025-11676-0",
      doi: "10.1007/s00330-025-11676-0",
      gradingScheme: "Recommendations are not graded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "acr-manual-contrast",
      label: "ACR Manual on Contrast Media",
      publisher: "American College of Radiology",
      year: 2024,
      url: "https://www.acr.org/Clinical-Resources/Contrast-Manual",
      read: "not-reachable",
      accessed: "2026-11-11",
    },
  ],
  technologies: ["iodinated-contrast-media", "gadolinium-based-contrast-agents", "ct", "mri"],
  related: ["iodinated-contrast-kidney-and-metformin"],
  upgrades: ["idea-pu-contrast-switch-agent-after-reaction"],
  gaps: [
    "The ACR Manual on Contrast Media could not be read (the address served a JavaScript shell to a script), so the North American premedication regimens and their indications are not stated here; the page names the disagreement without the detail.",
    "There are no randomised trials comparing switching agent with premedication; the evidence for switching is retrospective and observational (ESUR 2025).",
    "Drug allergy services able to test contrast agents are not available everywhere; ESUR makes referral after mild reactions optional where capacity is short.",
    "Neither ESUR document grades its recommendations.",
    "Children are not covered by the ESUR paper.",
  ],
});
