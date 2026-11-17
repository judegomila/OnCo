import { protocol } from "./helpers";

/*
 * Looking after a tunnelled central line (Hickman or Broviac type) or an implanted port in a child or young person
 * with cancer, in hospital, in clinic and at home. The adult records (picc-and-tunnelled-line-care,
 * implanted-port-access-and-care, central-line-maintenance-bundle, community-care-of-vascular-access-devices) hold the
 * general steps; this record holds what the paediatric sources say and shows where they differ from the adult ones.
 *
 * Written on 16 November 2026. Second accuracy pass on 17 November 2026: every source was fetched again raw with curl
 * into a scratch directory and read as text, every quote was checked verbatim by script (whitespace and line breaks
 * only), and every step, figure and grade was read against the passage it cites. What was read, and how:
 * - Children's Cancer and Leukaemia Group (CCLG), community care information resource, section 6, Central lines: full
 *   text of the HTML page, which prints "Page last updated January 2026". It is the UK professional body's resource for
 *   community teams, not a graded guideline, and it defers to each Principal Treatment Centre's own guideline. The
 *   CCLG guidelines index lists no central line guideline.
 * - CCLG, same resource, section 7, Febrile neutropenia ("Page last updated June 2025"): full text of the HTML page.
 *   Added in the second pass as the source for what families are told to do about a fever; the first version cited a
 *   CDC sentence that says nothing about fever.
 * - CDC/HICPAC Guidelines for the Prevention of Intravascular Catheter-Related Infections, 2011 (last update October
 *   2017, including the July 2017 chlorhexidine dressing update): full text. cdc.gov refused a request with a browser
 *   user agent (403) and served the PDF to plain curl (cdc.gov/infection-control/media/pdfs/Guideline-BSI-H.pdf), read
 *   with pdftotext. The CDC landing page still lists the 2011 guideline; no later edition was found.
 * - SHEA/IDSA/APIC compendium, CLABSI prevention 2022 update (Buetti et al.): full text, Europe PMC XML (PMC9096710).
 *   Europe PMC lists no later update.
 * - epic3 (Loveday et al., J Hosp Infect 2014): full text, Europe PMC XML (PMC7114876). Its scope statement says it
 *   does not address the detailed care of infants under 1 year or of children having chemotherapy through long-term
 *   catheters, so it is cited here for grades only. A Europe PMC title search found no epic4.
 * - The Children's Hospital Association (CHA) haematology/oncology central line maintenance bundle: Rinke et al.,
 *   Pediatrics 2012 (inpatients, PMC3457619) and Rinke et al., Pediatrics 2013 (ambulatory children, PMC3813391) were
 *   read in FULL in the second pass. On 16 November neither the Europe PMC nor the NCBI interface served them and the
 *   PubMed Central website put a browser check in front of a script; on 17 November one plain request to each PubMed
 *   Central page returned the article. Table 1 of the 2012 paper prints the bundle's elements, so they are now given.
 *   Bundy et al., Pediatrics 2014 (32 units) is still an abstract, Europe PMC.
 * - Rinke et al., Jt Comm J Qual Patient Saf 2015 (what families do at home): full text, PMC4519015 author manuscript
 *   XML through NCBI E-utilities.
 * - Cochrane review CD010996.pub3 (Bradford 2020), saline versus heparin flushing in infants and children: full text
 *   in the second pass, the PubMed Central page (PMC7192095). Ullman et al., Cancer Nurs 2022 (pilot trial, heparin
 *   versus saline locks in children with cancer): full text, Europe PMC XML (PMC9584054).
 * - Lock solutions: Schoot 2015 (ethanol, prevention), Wolf 2018 (ethanol, treatment and secondary prevention),
 *   Handrup 2013 and the CATERPILLAR trial 2024 (taurolidine): abstracts, Europe PMC. Qin et al., Front Pharmacol 2026
 *   (meta-analysis of taurolidine locks in children): full text, Europe PMC XML (PMC13732722). CLOCK trial protocol
 *   (BMJ Open 2024): full text, Europe PMC XML (PMC11243282).
 * - Zerr et al., Cancer 2021 (Children's Oncology Group trial of chlorhexidine bathing): full text, Europe PMC XML
 *   (PMC7820990).
 * - Swimming: Robbins 1999 (abstract) and Miller 2014 (full text, PMC4632199 author manuscript XML through NCBI
 *   E-utilities).
 * - Children's Oncology Group: its supportive care guidelines page (a copy a sibling checker saved from
 *   childrensoncologygroup.org on 16 November) lists "Central Venous Catheter Care - ARCHIVED: August 2018" and no
 *   current line guideline. The archived PDF was fetched and read with pdftotext on 17 November: it is the group's
 *   October 2016 endorsement of a 2013 guideline for patients with cancer, with no formal grading.
 * - Italian Association of Pediatric Hematology and Oncology (AIEOP) guidelines on central venous access devices
 *   (Cellini et al., J Vasc Access 2022): abstract only, which states no recommendation; the journal is not open.
 *   Named in sources; no step rests on it.
 * - Infusion Nurses Society, Infusion Therapy Standards of Practice, 9th edition (2024): the DOI resolved through
 *   Crossref and leads to an abstract page only. Not read; named in sources and gaps, and nothing rests on it.
 * - Not found: any SIOP or International Pediatric Oncology Guidelines document on line care.
 *
 * Corrected in the second pass: the fever advice now rests on a source that states it; the CDC 2017 statement on
 * chlorhexidine dressings under 18 is given with its scope (short-term, non-tunnelled lines); "0.9%" is no longer
 * attributed to CCLG, which says "sodium chloride"; reasons that said more than their sources were reworded; two
 * trials are no longer given a nationality their abstracts do not state.
 *
 * Nothing here rests on an Internet Archive copy.
 *
 * No source here is industry funded so far as its text states. Every DOI came from a Europe PMC or Crossref record
 * whose title was checked. Quotes are copied from the raw text with line breaks joined and nothing else changed; where
 * a sentence ends in a reference marker, the quote stops before it.
 */
export const paediatricCentralLineCare = protocol({
  id: "paediatric-central-line-care",
  name: "Central line care for children with cancer: tunnelled lines and ports in hospital and at home",
  aka: ["Hickman line care in children", "Broviac care", "paediatric central line care", "pediatric CVAD care", "portacath care in children", "wiggly care", "central line care at home for children", "paediatric CLABSI prevention"],
  domain: "paediatric",
  tldr: "Most children having cancer treatment have a central line: a tube that comes out through the skin of the chest, or a port under the skin. The care is mostly about preventing infection: clean hands, scrubbing the end of the line before every use, a clean secure dressing, and keeping the line out of water. Families are asked to ring their unit for a temperature of 38°C or above.",
  simple: "A central line saves your child from many needles. Wash hands before touching it. The end of the line is scrubbed before each use. Keep it dry and taped safely. Ring your child's cancer unit if their temperature is 38°C or above, even if they seem well, or if they seem unwell. Tell the team if the skin around the line is red or sore.",
  summary: "No current graded guideline covers central line care in children with cancer as its own subject. The Children's Oncology Group endorsed a 2013 guideline on central venous catheter care for patients with cancer in October 2016 and archived that endorsement in August 2018; the Italian paediatric haematology and oncology association published guidelines in 2022 that could be read only as an abstract; epic3 states that it does not address children having chemotherapy through long-term catheters. What can be read is the UK Children's Cancer and Leukaemia Group (CCLG) resource for community teams (updated January 2026), the general CDC/HICPAC (2011, updated 2017) and SHEA (2022) guidelines where they speak of children, and the Children's Hospital Association (CHA) maintenance bundle with its outcome studies. Each child's own treatment centre has a line policy, and that policy comes first; this page explains the care and is not a guide to doing it.\n\nThe care itself: trained staff and trained families only (CCLG; SHEA asks for patient and family education before transfer home); hand hygiene (CDC Category IB) and aseptic non-touch technique; the cap or hub scrubbed before every entry (SHEA at least 5 seconds; epic3 at least 15 seconds and allowed to dry; the CHA bundle 15 seconds of alcohol scrub and 15 seconds to dry, or 30 seconds of chlorhexidine and 30 to 60 seconds to dry); the site cleaned with chlorhexidine in alcohol (CDC above 0.5%; epic3 2% in 70% isopropyl alcohol) and re-dressed weekly while it needs a dressing, with the line looped and taped or kept in a bag; sodium chloride flushes from a 10 ml or larger syringe; a port needle placed after numbing cream and changed within two weeks (CCLG) or every 7 days (CHA bundle). The CHA bundle also asks for sterile gloves and a mask for whoever changes a dressing or a port needle, and for the child's face to be shielded from the site.\n\nWhere children differ from adults. Chlorhexidine: CDC makes no recommendation on its safety or efficacy in infants under 2 months; its 2017 update makes no recommendation on chlorhexidine dressings for short-term, non-tunnelled lines in anyone under 18 and recommends against them in premature neonates; SHEA recommends chlorhexidine dressings from 2 months of age. Chlorhexidine bathing: a Children's Oncology Group randomised trial in 177 children did not support it. Locks: CCLG says most UK centres now lock with saline; a Cochrane review (4 trials, 255 children) could not tell saline from heparin, and describes typical heparin locks of 10 units per ml for tunnelled lines and 100 units per ml for ports. No guideline read sets a heparin concentration or a flush volume for children. Ethanol locks prevented infection in one trial of 307 children and increased blockage without benefit in another of 94; taurolidine locks cut infection in a trial of 112 children and made no detectable difference in one of 463. Swimming: CCLG says not with a tunnelled line, and yes with a port that has no needle in it when the child is not neutropenic. Fever: CCLG says families are advised to telephone the unit for a temperature of 38°C or above on one occasion, even if the child seems well.\n\nThe bundle works when everyone who touches the line is in it. In one centre, training and auditing clinic nurses, home-care nurses and families together was followed by a fall in line infections in children at home from 0.63 to 0.32 per 1,000 line days.",
  asOf: "2026-11-17",
  setting: {
    who: ["nurse", "patient-or-carer", "doctor"],
    where: ["ward", "outpatient-clinic", "chemotherapy-day-unit", "home", "community"],
  },
  population: "Children and young people having cancer treatment or a stem cell transplant through a tunnelled central line (Hickman or Broviac type) or an implanted port, in hospital, in clinic and at home. The bundle studies are from children's haematology and oncology units in the United States; the CCLG resource is written for UK community teams. Babies under 2 months are an exception for chlorhexidine. PICCs and short-term lines are treated on the same principles but are not the subject here. The child's own treatment centre has its own line policy and training, which come first: nothing here is an instruction to carry out line care without that training.",
  trigger: "A child with cancer has a tunnelled line or port placed, and for as long as it stays in.",
  steps: [
    {
      action: "Let only people who have been trained and assessed in central line care touch or use the line, staff and family alike",
      why: "A central line ends in a large vein near the heart. CCLG lists poor line management among the causes of infection, and handling faults among the causes of damage to the line, so the handling is taught and checked first.",
      source: "cclg-central-lines-2026",
      quote: "Before caring for these lines, training must have been completed and CVAD competencies achieved.",
    },
    {
      action: "Teach the child, where old enough, and the family every part of the line care they will do, before the child goes home",
      why: "Children with cancer are often looked after as outpatients with the line in place, and at home a parent or the young person may be the one flushing the line or changing the dressing. In a survey of 105 patients and carers at one United States clinic, 23% said they had no training before first going home with a line.",
      source: "shea-clabsi-2022",
      quote: "In addition, education of the patient and/or family, as appropriate, is required for all CVC care procedures especially when transfer to an alternative setting (eg, home care, ambulatory setting) is planned.",
    },
    {
      action: "Clean your hands before and after every contact with the line, the site or the dressing",
      why: "Clean hands, together with aseptic technique whenever the line is handled, protect against line infection.",
      source: "cdc-hicpac-2011",
      quote: "Hand hygiene should be performed before and after palpating catheter insertion sites as well as before and after inserting, replacing, accessing, repairing, or dressing an intravascular catheter.",
      grade: "Category IB",
    },
    {
      action: "Use an aseptic non-touch technique for everything done to the line",
      why: "CCLG puts this first among its principles of line care: it is how infection is kept out each time the line is handled.",
      source: "cclg-central-lines-2026",
      quote: "To prevent infection adhering to principles of (Aseptic) Non-Touch Technique (A) NTT.",
    },
    {
      action: "Scrub the cap or hub with alcoholic chlorhexidine or 70% alcohol, with friction, before every entry into the line, for the time the unit's policy sets",
      why: "SHEA notes that about half of hubs and connectors carry germs in ordinary practice, and scrubbing lowers the number carried into the line. The sources set different times: SHEA at least 5 seconds; epic3 at least 15 seconds, then left to dry; the children's hospital bundle 15 seconds of alcohol and 15 seconds to dry, or 30 seconds of chlorhexidine and 30 to 60 seconds to dry.",
      source: "shea-clabsi-2022",
      quote: "Disinfect catheter hubs, needleless connectors, and injection ports before accessing the catheter (Quality of Evidence: MODERATE)",
      grade: "Quality of Evidence: MODERATE",
    },
    {
      action: "Check the site regularly, by looking at dressing changes and by feeling through the intact dressing, and take the dressing off to look properly if the site is tender or there is a fever with no clear cause",
      why: "CCLG lists redness, swelling, pain, fever and discharge at the exit site as the signs of a line infection. Regular checks are how they are noticed.",
      source: "cdc-hicpac-2011",
      quote: "Monitor the catheter sites visually when changing the dressing or by palpation through an intact dressing on a regular basis, depending on the clinical situation of the individual patient.",
      grade: "Category IB",
    },
    {
      action: "Clean the skin at the site with chlorhexidine in alcohol at dressing changes and let it dry; for a baby under 2 months, follow the unit's own policy on which antiseptic to use",
      why: "Chlorhexidine in alcohol carries CDC's strongest grade for line sites (above 0.5%; epic3 asks for 2% in 70% isopropyl alcohol, left to air dry). SHEA reports serious skin injuries from chlorhexidine in very young or very preterm babies, and CDC makes no recommendation on it under 2 months.",
      source: "cdc-hicpac-2011",
      quote: "Prepare clean skin with a >0.5% chlorhexidine preparation with alcohol before central venous catheter and peripheral arterial catheter insertion and during dressing changes.",
      grade: "Category IA",
    },
    {
      action: "Clean and re-dress the exit site of a tunnelled line weekly while it needs a dressing, and sooner if the dressing is damp, loose or dirty",
      why: "A new exit site is kept under a clear dressing. CCLG and epic3 both say a dressing may no longer be needed once the site has healed, and CDC asks for any dressing that is damp, loosened or visibly soiled to be replaced.",
      source: "cclg-central-lines-2026",
      quote: "When the exit site is clean and dry it should be cleaned and re-dressed weekly, if it requires a dressing.",
    },
    {
      action: "Keep the line secured at all times, looped and taped to the chest or tucked in a line bag, including once a healed site no longer needs a dressing",
      why: "CCLG gives the reasons: securing the line prevents pulling, discomfort and tugging on the exit site, and a line kept in a bag or taped in a loop is less likely to be pulled out by accident.",
      source: "cclg-central-lines-2026",
      quote: "Long term lines that are well healed do not require dressing but must be secured.",
    },
    {
      action: "Flush the line with sodium chloride (saline), using a 10 ml or larger syringe",
      why: "CCLG names correct flushing as the way to prevent a blocked line, and tells teams to avoid small syringes wherever possible to prevent damage to the line.",
      source: "cclg-central-lines-2026",
      quote: "The line requires flushing with sodium chloride.",
    },
    {
      action: "Before a needle goes into a port, offer numbing cream and preparation with a play specialist, and use a non-coring needle",
      why: "A port needs a needle through the skin each time. CCLG says a local anaesthetic cream can be used first, that play specialists are available in hospital to prepare the child, and that the port is accessed with a special non-coring needle.",
      source: "cclg-central-lines-2026",
      quote: "Before inserting the gripper™ needle a local anaesthetic cream can be used.",
    },
    {
      action: "Flush a port that is not in use monthly",
      why: "CCLG says a port with no needle in it needs no other care. One of its three principles of line care is to keep the device open.",
      source: "cclg-central-lines-2026",
      quote: "When the Portacath™ is not in use, no particular care is required and it only needs to be flushed monthly.",
    },
    {
      action: "Keep a tunnelled line and its exit site, and a port with a needle in it, from going under water: no swimming, and showers with the line and its end under a waterproof cover",
      why: "CDC allows showering if the line and its connector are protected with an impermeable cover, to make it less likely that germs get into the line. CCLG says children with a tunnelled line must bathe with care and that showers are more advisable.",
      source: "cdc-hicpac-2011",
      quote: "Do not submerge the catheter or catheter site in water.",
      grade: "Category IB",
    },
    {
      action: "Let a child with a port swim and bathe when there is no needle in it and they are not neutropenic, and steer them away from contact sports",
      why: "With no needle in, a port lies wholly under the skin, and CCLG says the child may swim and bathe; it asks only that contact sports be avoided.",
      source: "cclg-central-lines-2026",
      quote: "When there is no gripper needle in the Portacath™ they may go swimming (if not neutropenic), bathe, etc, although contact sports should be avoided.",
    },
    {
      action: "Do not give chemotherapy through a line that flushes but will not give blood back, until its position has been checked",
      why: "A line that will not bleed back may have moved or have a clot or a fibrin sheath at its tip, so it is checked by X-ray or venogram and the result written in the notes before it is used.",
      source: "cclg-central-lines-2026",
      quote: "Chemotherapy should NEVER be administered in a line with PWO until the line has been checked by x-ray or venogram for position or signs of a blood clot or fibrin sheath at the end of the line.",
    },
    {
      action: "If the line is cut or breaks, clamp it above the break, cover the break with a sterile swab or plaster, and ring the outreach nurse or treatment centre",
      why: "CCLG's reason for the clamp is to prevent bleeding; it also lists a line open to the air as a cause of air getting into the blood. It says repair is possible only for the outside part of a line, by a trained practitioner.",
      source: "cclg-central-lines-2026",
      quote: "Clamp line above break to prevent bleeding.",
    },
    {
      action: "Ask the family to tell the team about any change at the site or new discomfort",
      why: "CDC asks teams to encourage this, and CCLG calls the education of the patient and parent key to preventing line infection.",
      source: "cdc-hicpac-2011",
      quote: "Encourage patients to report any changes in their catheter site or any new discomfort to their provider.",
      grade: "Category II",
    },
    {
      action: "Ask the family to telephone the unit if the child's temperature is 38°C or above on a single reading, even if the child seems well; if it is between 37.5°C and 37.9°C with any other concern or symptom; or if the child seems unwell, with or without a fever",
      why: "CCLG tells community teams to treat any fever as a sign of infection until proven otherwise, and lists a central line among the things that raise the risk. It says an unwell child with a fever and low immunity may get worse quickly, and that families can call 999 at any point on the way to hospital.",
      source: "cclg-febrile-neutropenia-2025",
      quote: "They are also instructed to contact the hospital if their child appears unwell, regardless of fever, and community professionals should note that low temperature may be a later sign of sepsis.",
    },
    {
      action: "Run the line care as one bundle across the ward, the clinic, home-care nurses and families: train each group, audit what is done, and show everyone the infection rates",
      why: "The line is handled by many people in many places. In the centre that did this, line infections in children living at home fell by about half.",
      source: "rinke-ambulatory-2013",
      quote: "The mean CLABSI rate decreased by 48% from 0.63 CLABSIs per 1000 central line days at baseline to 0.32 CLABSIs per 1000 central line days during the intervention period (P = .005).",
      grade: "Interrupted time-series study, one centre",
    },
    {
      action: "Have the line taken out as soon as possible once intensive treatment has finished",
      why: "CCLG gives the reason: to prevent the risk of infection.",
      source: "cclg-central-lines-2026",
      quote: "All devices are recommended to be removed as soon as possible, when intensive treatment finishes, to prevent risk of infection.",
    },
  ],
  bestInClass: {
    statement: "No current graded guideline on central line care in children with cancer could be read, so best in class is assembled from three kinds of source and the differences are shown. The Children's Hospital Association bundle is the paediatric oncology approach with outcome data. It covers three areas: fewer entries into the line (a daily review of whether the line is needed), aseptic entries (hand hygiene, gloves, and the cap scrubbed with alcohol for 15 seconds and dried for 15, or with chlorhexidine for 30 seconds and dried for 30 to 60), and aseptic changes of caps, tubing, dressings and port needles (sterile gloves and a mask for the person doing it, the site scrubbed with chlorhexidine, and the child's face shielded during dressing and port needle changes), with clear dressings and port needles changed every 7 days and gauze dressings every 2. Its authors mark most elements as CDC recommendations and the rest as the association's expert consensus. Across 32 units the infection rate fell from 2.85 to 2.04 per 1,000 line days (Bundy 2014); in one inpatient unit from 2.25 to 1.79, a change that was not statistically significant (Rinke 2012); and in one centre's children at home from 0.63 to 0.32 (Rinke 2013). The CCLG resource (UK, January 2026) adds the home side: weekly dressing while one is needed, a secured line, saline flushes and saline locks, monthly port flushes, no swimming with a tunnelled line. The general guidelines grade the shared steps (CDC Category IA for chlorhexidine in alcohol, IB for hand hygiene and for not submerging the line). The sources differ on five points. Chlorhexidine dressings: SHEA 2022 recommends them from 2 months of age (quality of evidence high), CDC's 2017 update makes no recommendation under 18 years for short-term, non-tunnelled lines, and CCLG reports that many UK centres use them. Hub scrub time: SHEA at least 5 seconds, epic3 at least 15, the bundle 15 or 30 with drying time. Port needle: CCLG up to two weeks, the bundle every 7 days. Dressing on a healed tunnelled site: CCLG says none is needed and epic3 that one may no longer be required, while CDC calls it an unresolved issue. Strength of chlorhexidine for the skin: CDC above 0.5% in alcohol, epic3 2% in 70% isopropyl alcohol. On the lock, CCLG says saline is sufficient and the Cochrane review could not separate saline from heparin; antimicrobial locks are not routine (epic3 Class D/GPP). CDC suggests them for patients with long-term lines and a history of several line infections despite the best aseptic care (Category II), and SHEA lists them as an additional approach for patients with recurrent infection who are on long-term dialysis lines or have limited venous access, and for those at heightened risk of severe harm from a line infection.",
    sources: ["rinke-inpatient-2012", "bundy-2014", "rinke-ambulatory-2013", "cclg-central-lines-2026", "cdc-hicpac-2011", "shea-clabsi-2022", "epic3", "cochrane-saline-heparin-children-2020"],
  },
  variants: [
    {
      name: "Heparin lock rather than saline",
      differs: "Locks the line or port with heparinised saline after the saline flush. CCLG reports that most UK centres no longer do this: \"Most centres do not lock line with Heparin nowadays as saline locks are sufficient to maintain patency.\" The Cochrane review describes a typical lock for children as 1 to 3 ml of heparin 10 units per ml in a tunnelled line and 5 ml of 100 units per ml in a port. The Australian pilot trial used sodium heparin 50 units in 5 ml, 1 to 2 ml per lumen, for tunnelled lines and PICCs, and 2 ml of 100 units per ml for ports.",
      evidence: "The Cochrane review (2020, 4 trials, 255 infants and children with long-term central lines) found the evidence too uncertain to say which is better: rate ratio for blockage with saline against heparin 0.75 (95% CI 0.10 to 5.51, very low certainty) and for bloodstream infection 1.48 (0.24 to 9.37, low certainty). Its four trials each used a different heparin concentration. A pilot randomised trial in 61 children with cancer (Ullman 2022) saw complete blockage in 2 lines, both in the heparin group, and was a pilot to test whether a larger trial is feasible. The CLOCK trial in seven hospitals in Australia and New Zealand is randomising children with cancer between saline, heparinised saline and a tetrasodium EDTA lock.",
      sources: ["cclg-central-lines-2026", "cochrane-saline-heparin-children-2020", "ullman-2022", "clock-protocol-2024"],
    },
    {
      name: "Ethanol locks",
      differs: "Fills the line with 70% ethanol for a few hours, to prevent infection or alongside antibiotics to treat one, instead of a heparin or saline lock.",
      evidence: "For prevention, a multi-centre randomised double-blind trial in 307 children aged 1 to 18 with new lines (Schoot 2015) found line infection in 10% with two-hour ethanol locks (1.5 or 3 ml, at most once a week) against 19% with heparin locks of 100 units per ml (0.77 against 1.46 per 1,000 catheter days, p = 0.039), with more short-lived nausea and taste change. For treatment and secondary prevention, a randomised double-blind trial in 94 children and young people with a new line infection (Wolf 2018) found treatment failure in 44% with ethanol and 43% with placebo, and blockage needing a clot-dissolving drug in 58% against 33%; its authors do not recommend routine use. SHEA says the adverse effects of ethanol locks should be weighed carefully before use.",
      sources: ["schoot-ethanol-2015", "wolf-ethanol-2018", "shea-clabsi-2022"],
    },
    {
      name: "Taurolidine locks",
      differs: "Locks the line with a taurolidine solution, usually with citrate and sometimes heparin, to prevent infection.",
      evidence: "The trials disagree. A randomised trial of 129 tunnelled lines in 112 children with cancer (Handrup 2013) found catheter-related bloodstream infection at 0.4 per 1,000 line days with taurolidine against 1.4 with heparin (incidence rate ratio 0.26, 95% CI 0.09 to 0.61). The larger CATERPILLAR trial in the Netherlands (463 children, first 90 days after insertion) found line infection in 9.1% with taurolidine, citrate and heparin against 11.2% with heparin alone (incidence rate ratio 0.81, 95% CI 0.46 to 1.45) and concluded that no difference was detected. A 2026 meta-analysis of studies in children (not only cancer) pooled a lower infection rate with taurolidine and said the evidence is insufficient to establish its safety or to recommend routine use.",
      sources: ["handrup-taurolidine-2013", "caterpillar-2024", "qin-taurolidine-meta-2026"],
    },
    {
      name: "Chlorhexidine-impregnated disc or dressing at the exit site",
      differs: "Places a chlorhexidine disc or gel dressing around the exit site under the clear dressing. CCLG reports the practice: \"Many centres use a BioPatch™ (a chlorhexidine impregnated disc) around the exit site before applying the transparent dressing.\"",
      evidence: "The guidelines differ for children. SHEA 2022 lists chlorhexidine-containing dressings for patients over 2 months of age as an essential practice (quality of evidence high) and says their use under 2 months remains unclear. CDC's July 2017 update says no recommendation can be made for patients under 18 because of the lack of sufficient evidence, and says they are not recommended in premature neonates because of the risk of serious skin reactions. CDC's statements are about short-term, non-tunnelled lines; SHEA's is about central lines in general, and SHEA adds that for long-term catheters in well-healed sites the benefit is unclear. No source read makes a recommendation specific to a child's tunnelled line.",
      sources: ["cclg-central-lines-2026", "shea-clabsi-2022", "cdc-hicpac-2011"],
    },
    {
      name: "Port needle left in for up to two weeks",
      differs: "CCLG: \"The needle can stay in place for up to two weeks before being changed and a clear dressing is used to cover and support the needle.\" The Children's Hospital Association bundle changes the needle every 7 days, sooner if it is soiled, loosened, dislodged or infiltrated. The adult port record notes weekly needle change as common local practice.",
      evidence: "CCLG cites no study for its interval, the bundle's 7 days is the association's expert consensus, and none of CDC/HICPAC 2011, SHEA 2022 or epic3 sets one.",
      sources: ["cclg-central-lines-2026", "rinke-inpatient-2012", "cdc-hicpac-2011", "shea-clabsi-2022", "epic3"],
    },
    {
      name: "Mask for the nurse and the child's face shielded at dressing and needle changes",
      differs: "The Children's Hospital Association bundle asks the person changing a cap, tubing, dressing or port needle, and any assistant, to wear sterile gloves and a mask, and asks for the child's face (or tracheostomy) to be shielded from the site during dressing and port needle changes. The CCLG resource does not mention either.",
      evidence: "The bundle's authors mark these two elements as expert consensus of the Children's Hospital Association, not as CDC recommendations. The centre that published the bundle did not use sterile gloves and masks for cap and tubing changes, because of the resources needed, and wore clean gloves instead. The bundle was tested as a whole, so the effect of the mask or the shielding on its own is not known.",
      sources: ["rinke-inpatient-2012", "rinke-ambulatory-2013", "cclg-central-lines-2026"],
    },
    {
      name: "Daily chlorhexidine bathing",
      differs: "Washes the child every day with 2% chlorhexidine cloths to lower the number of germs on the skin.",
      evidence: "SHEA recommends it for intensive care patients over 2 months of age and says its role elsewhere is unclear. The Children's Oncology Group randomised double-blind trial in children with cancer or having a donor stem cell transplant (aged 2 months to under 22 years) stopped early for slow recruitment with 177 enrolled: line infections were 5.44 per 1,000 line days with chlorhexidine and 3.10 with control cloths (p = 0.049), and its authors concluded the data do not support routine use.",
      sources: ["shea-clabsi-2022", "zerr-chg-bathing-2021"],
    },
    {
      name: "Swimming with a tunnelled line",
      differs: "Some home parenteral nutrition programmes surveyed for a 2014 review allowed children with a tunnelled line to swim, most of them only in pools, with the site cleaned and the dressing changed straight afterwards. CCLG does not, and advises showers over baths: \"Patients with Hickman™ lines are unable to go swimming\".",
      evidence: "A questionnaire and record review of 91 children with cancer and 101 tunnelled lines (Robbins 1999) found no statistically significant difference in line infections between the 49 who swam and those who did not (relative risk 1.6, p = 0.16). A 2014 review reanalysed those figures as a significant excess in swimmers, found no trial, surveyed home parenteral nutrition programmes whose rules ranged from no swimming to no restriction, and concluded that a firm recommendation cannot be made; its authors discourage swimming after a fatal infection in a child in their care. CDC's rule against submerging a catheter is Category IB and is not specific to healed tunnelled lines.",
      sources: ["cclg-central-lines-2026", "robbins-swimming-1999", "miller-swimming-2014", "cdc-hicpac-2011"],
    },
  ],
  grades: [
    { claim: "Hand hygiene before and after accessing or dressing an intravascular catheter", grade: "Category IB", source: "cdc-hicpac-2011" },
    { claim: "Chlorhexidine above 0.5% with alcohol for skin preparation during dressing changes", grade: "Category IA", source: "cdc-hicpac-2011" },
    { claim: "2% chlorhexidine gluconate in 70% isopropyl alcohol to clean the central line site at dressing changes, left to air dry (a guideline whose scope excludes children on chemotherapy through long-term lines)", grade: "Class A", source: "epic3", quote: "to clean the central catheter insertion site during dressing changes, and allow to air dry." },
    { claim: "Chlorhexidine in infants under 2 months: no recommendation", grade: "Unresolved issue", source: "cdc-hicpac-2011", quote: "No recommendation can be made for the safety or efficacy of chlorhexidine in infants aged <2 months." },
    { claim: "Chlorhexidine-containing dressings for central lines in patients over 2 months of age", grade: "Quality of Evidence: HIGH", source: "shea-clabsi-2022", quote: "Use chlorhexidine-containing dressings for CVCs in patients over 2 months of age (Quality of Evidence: HIGH)" },
    { claim: "Chlorhexidine dressings under 2 months of age", grade: "Stated as unclear", source: "shea-clabsi-2022", quote: "For children under 2 months of age, use of chlorhexidine dressings remains unclear, particularly in very preterm or low birthweight infants." },
    { claim: "Chlorhexidine-impregnated dressings on short-term, non-tunnelled central lines in patients under 18 years: no recommendation (July 2017 update)", grade: "Unresolved issue", source: "cdc-hicpac-2011", quote: "No recommendation can be made about the use of chlorhexidine-impregnated dressings to protect the site of short-term, non-tunneled central venous catheters for pediatric patients less than 18 years old and non-premature neonates due to the lack of sufficient evidence from published, high-quality studies about efficacy and safety in this age group." },
    { claim: "Chlorhexidine-impregnated dressings on short-term, non-tunnelled central lines in premature neonates: not recommended (July 2017 update)", grade: "Category IC", source: "cdc-hicpac-2011" },
    { claim: "Transparent dressings changed at least every 7 days, with a stated exception for children at risk of the line dislodging (written for short-term lines)", grade: "Category IB", source: "cdc-hicpac-2011", quote: "except in those pediatric patients in which the risk for dislodging the catheter may outweigh the benefit of changing the dressing" },
    { claim: "Transparent dressings on tunnelled or implanted sites changed no more than once a week until the site has healed", grade: "Category II", source: "cdc-hicpac-2011", quote: "Replace transparent dressings used on tunneled or implanted CVC sites no more than once per week (unless the dressing is soiled or loose), until the insertion site has healed." },
    { claim: "Dressings on tunnelled or implanted sites replaced every 7 days until healed; a dressing may not be needed after that", grade: "Class D/GPP", source: "epic3", quote: "A dressing may no longer be required once the insertion site has healed." },
    { claim: "Whether a well-healed tunnelled exit site needs any dressing", grade: "Unresolved issue", source: "cdc-hicpac-2011", quote: "No recommendation can be made regarding the necessity for any dressing on well-healed exit sites of long-term cuffed and tunneled CVCs." },
    { claim: "Do not submerge the catheter or its site in water; showering with an impermeable cover is permitted", grade: "Category IB", source: "cdc-hicpac-2011" },
    { claim: "Scrub the access port with an appropriate antiseptic (chlorhexidine, povidone iodine, an iodophor or 70% alcohol); no time is set", grade: "Category IA", source: "cdc-hicpac-2011" },
    { claim: "Disinfect hubs, connectors and ports before access, with friction for at least 5 seconds", grade: "Quality of Evidence: MODERATE", source: "shea-clabsi-2022", quote: "Apply mechanical friction for a minimum of 5 seconds to reduce contamination." },
    { claim: "Hub cleaned for at least 15 seconds and allowed to dry", grade: "Class D/GPP", source: "epic3", quote: "The hub should be cleaned for a minimum of 15 s and allowed to dry before accessing the system." },
    { claim: "Antimicrobial lock solutions not used routinely", grade: "Class D/GPP", source: "epic3", quote: "Antimicrobial lock solutions should not be used routinely to prevent catheter-related bloodstream infections." },
    { claim: "Prophylactic antimicrobial lock for patients with long-term catheters and a history of multiple catheter-related bloodstream infections despite optimal aseptic technique", grade: "Category II", source: "cdc-hicpac-2011" },
    { claim: "Antimicrobial lock therapy for long-term lines, as an additional approach where infection recurs", grade: "Quality of Evidence: HIGH", source: "shea-clabsi-2022", quote: "Use antimicrobial lock therapy for long-term CVCs (Quality of Evidence: HIGH)" },
    { claim: "Saline against heparin flushing in children: blockage", grade: "very low certainty evidence", source: "cochrane-saline-heparin-children-2020", quote: "The estimated RR for CVC occlusion per 1000 catheter days between the normal saline and heparin groups was 0.75 (95% CI 0.10 to 5.51; 2 studies, 229 participants; very low certainty evidence)." },
    { claim: "Chlorhexidine bathing in children with cancer or having a donor transplant", grade: "Randomised double-blind trial, stopped early (177 enrolled)", source: "zerr-chg-bathing-2021", quote: "The data from the current study do not support the use of routine CHG bathing in children with cancer or those undergoing allogeneic HCT." },
    { claim: "A standard line care bundle across 32 children's haematology and oncology units", grade: "Multicentre quality improvement collaborative", source: "bundy-2014", quote: "As of August 2012, the mean CLABSI rate during the collaborative was 2.04 CLABSIs per 1000 CL-days, a reduction of 28% (relative risk: 0.71 [95% confidence interval: 0.55-0.92])." },
    { claim: "Swimming with a central line", grade: "Narrative review; no trial found", source: "miller-swimming-2014", quote: "Unfortunately, due to the limited information available, a firm recommendation cannot be made." },
  ],
  sources: [
    { key: "cclg-central-lines-2026", label: "Community care information resource, section 6: Central lines (page last updated January 2026)", publisher: "Children's Cancer and Leukaemia Group (CCLG)", year: 2026, url: "https://cclg.org.uk/information-professionals/community-care-information-resource/section-6-treatment/central-lines", gradingScheme: "A professional information resource; not graded. It refers readers to each Principal Treatment Centre's own guideline.", read: "full-text", accessed: "2026-11-17" },
    { key: "cclg-febrile-neutropenia-2025", label: "Community care information resource, section 7: Febrile neutropenia (page last updated June 2025)", publisher: "Children's Cancer and Leukaemia Group (CCLG)", year: 2025, url: "https://www.cclg.org.uk/information-professionals/community-care-information-resource/section-7-side-effects-and-supportive-care/febrile-neutropenia", gradingScheme: "A professional information resource; not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "cdc-hicpac-2011", label: "Guidelines for the Prevention of Intravascular Catheter-Related Infections, 2011 (last update October 2017)", publisher: "CDC/HICPAC", year: 2011, url: "https://www.cdc.gov/infection-control/media/pdfs/Guideline-BSI-H.pdf", gradingScheme: "Category IA (strongly recommended, strongly supported by well-designed studies), IB (strongly recommended, some studies and strong rationale, or accepted practice), IC (required by regulation), II (suggested), Unresolved issue (insufficient evidence or no consensus).", read: "full-text", accessed: "2026-11-17" },
    { key: "shea-clabsi-2022", label: "Strategies to prevent central line-associated bloodstream infections in acute-care hospitals: 2022 Update", publisher: "SHEA, IDSA, APIC (Infection Control and Hospital Epidemiology)", year: 2022, url: "https://doi.org/10.1017/ice.2022.87", doi: "10.1017/ice.2022.87", gradingScheme: "Quality of evidence HIGH, MODERATE or LOW, with each recommendation classed as an essential practice, an additional approach, an approach that should not be considered routine, or an unresolved issue.", read: "full-text", accessed: "2026-11-17" },
    { key: "epic3", label: "epic3: National Evidence-Based Guidelines for Preventing Healthcare-Associated Infections in NHS Hospitals in England", publisher: "Journal of Hospital Infection (Loveday et al., commissioned by the Department of Health)", year: 2014, url: "https://doi.org/10.1016/S0195-6701(13)60012-2", doi: "10.1016/S0195-6701(13)60012-2", gradingScheme: "SIGN-style classes A to D, GPP (good practice point). Its scope excludes the detailed care of infants under 1 year and of children having chemotherapy through long-term catheters.", read: "full-text", accessed: "2026-11-17" },
    { key: "rinke-inpatient-2012", label: "Implementation of a central line maintenance care bundle in hospitalized pediatric oncology patients", publisher: "Pediatrics (Rinke et al.)", year: 2012, url: "https://doi.org/10.1542/peds.2012-0295", doi: "10.1542/peds.2012-0295", gradingScheme: "Not a guideline. Its Table 1 marks each bundle element as CDC recommended or as Children's Hospital Association expert consensus.", read: "full-text", accessed: "2026-11-17" },
    { key: "rinke-ambulatory-2013", label: "Central line maintenance bundles and CLABSIs in ambulatory oncology patients", publisher: "Pediatrics (Rinke et al.)", year: 2013, url: "https://doi.org/10.1542/peds.2013-0302", doi: "10.1542/peds.2013-0302", read: "full-text", accessed: "2026-11-17" },
    { key: "rinke-families-2015", label: "Bringing central line-associated bloodstream infection prevention home: catheter maintenance practices and beliefs of pediatric oncology patients and families", publisher: "Joint Commission Journal on Quality and Patient Safety (Rinke et al.)", year: 2015, url: "https://doi.org/10.1016/s1553-7250(15)41023-2", doi: "10.1016/s1553-7250(15)41023-2", read: "full-text", accessed: "2026-11-17" },
    { key: "bundy-2014", label: "Preventing CLABSIs among pediatric hematology/oncology inpatients: national collaborative results", publisher: "Pediatrics (Bundy et al., Children's Hospital Association Hematology/Oncology CLABSI Collaborative)", year: 2014, url: "https://doi.org/10.1542/peds.2014-0582", doi: "10.1542/peds.2014-0582", read: "abstract", accessed: "2026-11-17" },
    { key: "cochrane-saline-heparin-children-2020", label: "Normal saline (0.9% sodium chloride) versus heparin intermittent flushing for the prevention of occlusion in long-term central venous catheters in infants and children", publisher: "Cochrane Database of Systematic Reviews (Bradford, Edwards, Chan)", year: 2020, url: "https://doi.org/10.1002/14651858.cd010996.pub3", doi: "10.1002/14651858.cd010996.pub3", gradingScheme: "GRADE certainty of evidence: high, moderate, low or very low.", read: "full-text", accessed: "2026-11-17" },
    { key: "ullman-2022", label: "Routine catheter lock solutions in pediatric cancer care: a pilot randomized controlled trial of heparin vs saline", publisher: "Cancer Nursing (Ullman et al.)", year: 2022, url: "https://doi.org/10.1097/ncc.0000000000001053", doi: "10.1097/ncc.0000000000001053", read: "full-text", accessed: "2026-11-17" },
    { key: "clock-protocol-2024", label: "Preventing adverse events during paediatric cancer treatment: protocol for a multi-site hybrid randomised controlled trial of catheter lock solutions (the CLOCK trial)", publisher: "BMJ Open (Ullman et al.)", year: 2024, url: "https://doi.org/10.1136/bmjopen-2024-085637", doi: "10.1136/bmjopen-2024-085637", read: "full-text", accessed: "2026-11-17" },
    { key: "schoot-ethanol-2015", label: "Prevention of central venous catheter-associated bloodstream infections in paediatric oncology patients using 70% ethanol locks: a randomised controlled multi-centre trial", publisher: "European Journal of Cancer (Schoot et al.)", year: 2015, url: "https://doi.org/10.1016/j.ejca.2015.06.126", doi: "10.1016/j.ejca.2015.06.126", read: "abstract", accessed: "2026-11-17" },
    { key: "wolf-ethanol-2018", label: "Treatment and secondary prophylaxis with ethanol lock therapy for central line-associated bloodstream infection in paediatric cancer: a randomised, double-blind, controlled trial", publisher: "Lancet Infectious Diseases (Wolf et al.)", year: 2018, url: "https://doi.org/10.1016/s1473-3099(18)30224-x", doi: "10.1016/s1473-3099(18)30224-x", read: "abstract", accessed: "2026-11-17" },
    { key: "handrup-taurolidine-2013", label: "Central venous catheters and catheter locks in children with cancer: a prospective randomized trial of taurolidine versus heparin", publisher: "Pediatric Blood and Cancer (Handrup, Møller, Schrøder)", year: 2013, url: "https://doi.org/10.1002/pbc.24482", doi: "10.1002/pbc.24482", read: "abstract", accessed: "2026-11-17" },
    { key: "caterpillar-2024", label: "The CATERPILLAR study: an assessor-blinded randomized controlled trial comparing a taurolidine-citrate-heparin lock solution to a heparin-only lock solution for the prevention of central-line-associated bloodstream infections in paediatric oncology patients", publisher: "Journal of Hospital Infection (van den Bosch et al.)", year: 2024, url: "https://doi.org/10.1016/j.jhin.2024.06.009", doi: "10.1016/j.jhin.2024.06.009", read: "abstract", accessed: "2026-11-17" },
    { key: "qin-taurolidine-meta-2026", label: "The efficacy of taurolidine lock solution in preventing catheter-related bloodstream infections in pediatrics: a systematic review and meta-analysis", publisher: "Frontiers in Pharmacology (Qin et al.)", year: 2026, url: "https://doi.org/10.3389/fphar.2026.1938862", doi: "10.3389/fphar.2026.1938862", read: "full-text", accessed: "2026-11-17" },
    { key: "zerr-chg-bathing-2021", label: "Chlorhexidine gluconate bathing in children with cancer or those undergoing hematopoietic stem cell transplantation: a double-blinded randomized controlled trial from the Children's Oncology Group", publisher: "Cancer (Zerr et al.)", year: 2021, url: "https://doi.org/10.1002/cncr.33271", doi: "10.1002/cncr.33271", read: "full-text", accessed: "2026-11-17" },
    { key: "robbins-swimming-1999", label: "Swimming and central venous catheter-related infections in the child with cancer", publisher: "Journal of Pediatric Oncology Nursing (Robbins, Cromwell, Korones)", year: 1999, url: "https://doi.org/10.1177/104345429901600107", doi: "10.1177/104345429901600107", read: "abstract", accessed: "2026-11-17" },
    { key: "miller-swimming-2014", label: "Going with the flow or swimming against the tide: should children with central venous catheters swim?", publisher: "Nutrition in Clinical Practice (Miller et al.)", year: 2014, url: "https://doi.org/10.1177/0884533613515931", doi: "10.1177/0884533613515931", gradingScheme: "The review appraised each paper by GRADE concepts and made no graded recommendation.", read: "full-text", accessed: "2026-11-17" },
    { key: "cog-cvc-archived-2018", label: "Clinical Practice Guideline on Central Venous Catheter Care for the Patient with Cancer: COG endorsement (version of 14 November 2016, marked ARCHIVED August 2018)", publisher: "Children's Oncology Group, Supportive Care Guideline Committee", year: 2016, url: "https://childrensoncologygroup.org/wp-content/uploads/2026/06/cog_sc_cvad_care_guideline_archived_aug2018.pdf", gradingScheme: "The document states beside its recommendations that no formal grading system was used, and on its first page that it is no longer current.", read: "full-text", accessed: "2026-11-17" },
    { key: "aieop-2022", label: "Guidelines of the Italian Association of Pediatric Hematology and Oncology for the management of the central venous access devices in pediatric patients with onco-hematological disease", publisher: "Journal of Vascular Access (Cellini et al., AIEOP)", year: 2022, url: "https://doi.org/10.1177/1129729820969309", doi: "10.1177/1129729820969309", read: "abstract", accessed: "2026-11-17" },
    { key: "ins-standards-2024", label: "Infusion Therapy Standards of Practice, 9th Edition", publisher: "Infusion Nurses Society (Journal of Infusion Nursing)", year: 2024, url: "https://doi.org/10.1097/nan.0000000000000532", doi: "10.1097/nan.0000000000000532", read: "not-reachable", accessed: "2026-11-17" },
  ],
  upgrades: ["idea-upgrade-swimming-with-a-tunnelled-line-registry-study"],
  gaps: [
    "No current graded guideline on central line care in children with cancer could be read. The Children's Oncology Group's only document on the subject is its 2016 endorsement of a 2013 guideline for patients with cancer, which uses no formal grading, recommends routine saline flushing and found the data on heparin flushes conflicting; the group marked it archived in August 2018 and no longer current. No SIOP or International Pediatric Oncology Guidelines document on line care was found, and the Italian association's 2022 guidelines were read only as an abstract that states no recommendation, so their content is not given here.",
    "The Infusion Nurses Society's Infusion Therapy Standards of Practice (9th edition, 2024) set flushing and locking practice for nurses. On 17 November 2026 only an abstract page could be reached, so nothing here is taken from them.",
    "The CCLG resource is written for community teams, cites three general nursing references, and defers to each Principal Treatment Centre's own guideline; those local guidelines were not read.",
    "Flush volumes and heparin concentrations for children are not set by any guideline read. The figures on this page are what a Cochrane review calls typical and what individual trials used. CCLG says the line is flushed with sodium chloride and does not give a strength or a volume.",
    "The Children's Hospital Association bundle was tested as a whole, so no single element's effect is known, including the mask and the shielding of the child's face. Its authors mark those two elements as expert consensus. On 17 November 2026 the two papers that describe the bundle were read in full for the first time; the collaborative's 32-unit results (Bundy 2014) were still read as an abstract.",
    "Chlorhexidine in babies under 2 months: CDC makes no recommendation and SHEA calls the use of chlorhexidine dressings unclear. No source read gives a preferred antiseptic for that age group.",
    "How long a port needle may stay in is not set by any guideline read; the CCLG resource says up to two weeks and the Children's Hospital Association bundle 7 days, neither citing a study.",
    "Saline against heparin locks in children rests on 4 small trials with very low to moderate certainty. The CLOCK trial, which would settle more, had not reported in any source read.",
    "Ethanol and taurolidine lock trials were read as abstracts, apart from the 2026 meta-analysis. The two taurolidine trials in children with cancer disagree, and no guideline read recommends either lock routinely.",
    "Swimming with a tunnelled line has never been studied prospectively. The one study in children with cancer dates from 1999 and its figures have been read both ways.",
    "Fever at home: the CCLG resource gives the temperatures at which families are advised to telephone and says treatment must start within one hour of arriving at hospital. No source read sets a time within which the family should ring, and no source read gives advice for families that is specific to a fever in a child with a central line as distinct from any child on cancer treatment.",
    "What families find hardest at home was surveyed in one United States clinic (105 patients and carers, 2012): dressing changes were the hardest part to do as taught, and 23% said they had no training before first going home with a line. No UK or European equivalent was found.",
  ],
  institutions: [],
  companies: ["cclg", "childrens-oncology-group"],
  cancers: ["childhood-cancers"],
  technologies: ["tunnelled-cuffed-central-venous-catheters", "implanted-ports", "catheter-lock-solutions", "ethanol-lock-therapy"],
  terms: ["central-venous-access", "febrile-neutropenia"],
  related: ["picc-and-tunnelled-line-care", "implanted-port-access-and-care", "central-line-maintenance-bundle", "community-care-of-vascular-access-devices", "paediatric-fever-and-neutropenia", "paediatric-procedural-pain-and-sedation", "suspected-central-line-infection", "central-line-occlusion-management"],
  sections: ["supportive-care"],
  tags: ["protocol", "paediatric", "vascular-access", "clabsi"],
});
