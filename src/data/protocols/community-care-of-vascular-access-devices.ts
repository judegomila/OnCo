import { protocol } from "./helpers";

/*
 * Care of PICCs, tunnelled lines and ports by community and district nurses, and by patients and carers at home, in
 * the UK primary and community care framework.
 *
 * What was read, and how (all on 11 November 2026, fetched raw into a scratch directory and read as text):
 * - NICE CG139, Healthcare-associated infections: prevention and control in primary and community care (published
 *   March 2012, last updated February 2017), recommendations page: full text, HTML (port exemplar agent's copy). NICE
 *   does not grade; each recommendation carries the year it was written or amended.
 * - NICE QS61, Infection prevention and control (published 17 April 2014), quality statement 5, vascular access devices:
 *   full text, HTML.
 * - The RCN Standards for Infusion Therapy and the Queen's Nursing Institute's community standards were not found in a
 *   readable current edition and are not cited.
 *
 * The device-specific steps (needle, flush, lock) are in the port and PICC care protocols; this record covers what
 * changes when care moves out of hospital. Quotes are copied with line breaks joined only.
 */
export const communityCareOfVascularAccessDevices = protocol({
  id: "community-care-of-vascular-access-devices",
  name: "Central line and port care in the community and at home",
  aka: ["district nurse line care", "community PICC care", "PICC care at home", "port flush in the community", "line care after discharge", "home line care"],
  domain: "vascular-access",
  tldr: "If you go home with a PICC, tunnelled line or port, a community or district nurse may look after it, or you or a carer may be taught to. You should be shown what to do before you leave hospital, have someone to ask afterwards, and the nurse should clean their hands, use a clean no-touch technique, change the clear dressing weekly and clean the end of the line before and after use.",
  simple: "Before you go home with a line, you should be taught how to look after it and who to call. The nurse who looks after it at home should clean their hands and the line end every time.",
  summary: "NICE CG139 (2012, updated 2017) is the UK guideline for infection prevention in primary and community care, and NICE QS61 (2014) statement 5 makes vascular access device care a quality standard: people with a device should have their infection risk minimised by completing specified procedures for insertion and maintenance, and by removal as soon as it is no longer needed, with a written protocol as the structure measure. Before discharge, patients and carers are taught any techniques they need to prevent infection and manage the device, with follow-up training and support available; community staff are trained and assessed as competent. The care itself is the hospital standard: hand decontamination before access or dressing; aseptic technique (ANTT named as one framework); a sterile transparent dressing over a central line changed every 7 days or sooner if lifting or damp; chlorhexidine in 70% alcohol on the hub before and after access (QS61 adds a 15-second clean, from epic3); saline to flush and lock; and daily inspection of central line sites. Many of these recommendations date from 2003 and none is graded.",
  asOf: "2026-11-11",
  setting: {
    who: ["nurse", "patient-or-carer"],
    where: ["community", "home"],
  },
  population: "Adults with cancer living at home with a PICC, tunnelled central catheter or implanted port, cared for by community or district nurses, practice nurses or themselves and their carers. NICE CG139 covers primary and community care in England.",
  trigger: "A person is discharged, or starts treatment as an outpatient, with a central venous access device that will be cared for outside hospital.",
  steps: [
    {
      action: "Before discharge, teach the person and their carer any techniques they will need to prevent infection and manage the device safely",
      why: "Most of the time with a line is spent at home, and problems start there.",
      source: "nice-cg139",
      quote: "Before discharge from hospital, patients and their carers should be taught any techniques they may need to use to prevent infection and safely manage a vascular access device.",
      grade: "[2003, amended 2012]",
    },
    {
      action: "Make sure follow-up training and support are available to the person and carer after discharge",
      why: "Skills fade and questions arise once people are home.",
      source: "nice-cg139",
      quote: "Follow-up training and support should be available to patients with a vascular access device and their carers.",
      grade: "[2003, amended 2012]",
    },
    {
      action: "Have community staff who care for lines trained and assessed as competent in the infection-prevention practices",
      why: "Community nurses may care for central lines only occasionally, so training and checks keep standards consistent.",
      source: "nice-cg139",
      quote: "Healthcare workers caring for a patient with a vascular access device should be trained, and assessed as competent, in using and consistently adhering to the infection prevention practices described in this guideline.",
      grade: "[2003, amended 2012]",
    },
    {
      action: "Clean your hands before accessing or dressing the line",
      why: "Hands are the commonest route by which germs reach a line.",
      source: "nice-cg139",
      quote: "Hands must be decontaminated (see section 1.1.2 on hand decontamination ) before accessing or dressing a vascular access device.",
      grade: "[new 2012]",
    },
    {
      action: "Use an aseptic technique, such as ANTT, for site care and whenever the line is accessed",
      why: "Keeping key parts untouched stops germs entering the line in a home setting without hospital facilities.",
      source: "nice-cg139",
      quote: "An aseptic technique must be used for vascular access device catheter site care and when accessing the system",
      grade: "[new 2012]",
    },
    {
      action: "Change the transparent dressing over a central line every 7 days, or sooner if it lifts or moisture collects under it",
      why: "A sealed dressing keeps germs out; a loose or damp one lets them in.",
      source: "nice-cg139",
      quote: "Change the transparent semipermeable membrane dressing covering a central venous access device insertion site every 7 days, or sooner if the dressing is no longer intact or moisture collects under it.",
      grade: "[2012]",
    },
    {
      action: "Clean the hub or injection port with chlorhexidine in 70% alcohol before and after each access",
      why: "The hub is touched every time the line is used and is a main route for infection.",
      source: "nice-cg139",
      quote: "Decontaminate the injection port or vascular access device catheter hub before and after accessing the system using chlorhexidine gluconate in 70% alcohol.",
      grade: "[new 2012]",
    },
    {
      action: "Flush and lock the lumens with sterile 0.9% saline unless the device maker requires otherwise",
      why: "Flushing keeps the line open; saline avoids the risks of heparin for most devices.",
      source: "nice-cg139",
      quote: "Preferably, a sterile 0.9 percent sodium chloride injection should be used to flush and lock catheter lumens.",
      grade: "[2003]",
    },
    {
      action: "Inspect a central line site daily, and have it removed as soon as it is no longer needed",
      why: "Daily checks catch infection early; a line that is not needed only adds risk.",
      source: "nice-qs61",
      quote: "Central venous catheter insertion sites should be inspected daily.",
    },
    {
      action: "Work to a written local protocol covering insertion, maintenance and removal, and audit against it",
      why: "QS61 measures quality by whether every specified step is done for every person with a device.",
      source: "nice-qs61",
      quote: "People who need a vascular access device have their risk of infection minimised by the completion of specified procedures necessary for the safe insertion and maintenance of the device and its removal as soon as it is no longer needed.",
    },
  ],
  bestInClass: {
    statement: "In the UK, NICE CG139 and QS61 statement 5 set the standard for line care outside hospital: patient and carer teaching before discharge with follow-up support, trained and assessed staff, hand decontamination, aseptic technique, a transparent dressing changed every 7 days on central lines, hub decontamination with chlorhexidine in alcohol before and after access, saline flush and lock, daily site inspection and removal when no longer needed, all under a written protocol. The clinical steps match the hospital guidelines (CDC, epic3, ESMO) set out in the port and PICC care protocols; the community-specific additions are the teaching, support and competence recommendations, which date from 2003 and are ungraded.",
    sources: ["nice-cg139", "nice-qs61"],
  },
  variants: [],
  grades: [],
  sources: [
    {
      key: "nice-cg139",
      label: "Healthcare-associated infections: prevention and control in primary and community care (CG139), recommendations",
      publisher: "NICE",
      year: 2012,
      url: "https://www.nice.org.uk/guidance/cg139/chapter/Recommendations",
      gradingScheme: "NICE does not grade recommendations; each is tagged with the year it was written or amended ([2003], [2012], [new 2012]).",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "nice-qs61",
      label: "Infection prevention and control (QS61), quality statement 5: vascular access devices",
      publisher: "NICE",
      year: 2014,
      url: "https://www.nice.org.uk/guidance/qs61/chapter/Quality-statement-5-Vascular-access-devices",
      gradingScheme: "Quality statements are not graded; each comes with structure, process and outcome measures.",
      read: "full-text",
      accessed: "2026-11-11",
    },
  ],
  technologies: ["picc-lines", "implanted-ports", "catheter-securement-devices"],
  terms: ["central-venous-access"],
  related: ["picc-and-tunnelled-line-care", "implanted-port-access-and-care", "blood-sampling-from-a-central-line", "central-line-occlusion-management", "central-line-maintenance-bundle"],
  upgrades: [],
  gaps: [
    "NICE CG139 was last updated in 2017 and several of its line-care recommendations date from 2003; no newer UK community guideline on central line care was found.",
    "No source read sets how often a community nurse should see a person with a line, who keeps the care record across hospital and community, or how out-of-hours problems are handled; these are local arrangements.",
    "Whether patients and carers can safely flush or dress their own lines, and with what training, is not addressed beyond NICE's teaching recommendation.",
    "The RCN infusion standards and Queen's Nursing Institute community standards could not be found in a readable current edition.",
  ],
});
