import { protocol } from "./helpers";

/*
 * Accessing and caring for an implanted port (totally implantable venous access device) in adults having cancer
 * treatment.
 *
 * First written 11 November 2026. Second accuracy pass on 17 November 2026: every claim was re-read against its
 * source as raw text, every quote was checked by script (whitespace and line-break hyphenation normalised, nothing
 * else), and the record was corrected where it said more than its source.
 *
 * What was re-read on 17 November 2026, and how:
 * - CDC/HICPAC Guidelines for the Prevention of Intravascular Catheter-Related Infections, 2011 (last update October
 *   2017): full text, the cdc.gov PDF through pdftotext (a copy another checker in this pass fetched from cdc.gov the
 *   same day was re-used). Its two "Unresolved issue" statements on port needles had been missed and are now on the
 *   page.
 * - SHEA/IDSA/APIC compendium, CLABSI prevention 2022 update (Buetti et al.): full text, Europe PMC full-text XML
 *   (PMC9096710), copy fetched the same day by another checker re-used.
 * - epic3 (Loveday et al., J Hosp Infect 2014): full text, Europe PMC full-text XML (PMC7114876), same-day copy
 *   re-used.
 * - NICE CG139, recommendations and update information pages (HTML; published March 2012, last updated February
 *   2017), same-day copy re-used.
 * - Cochrane review CD008462.pub4 (2022): abstract only (Europe PMC; its full-text endpoint returned an error).
 *   Crossref shows pub4 as the latest version.
 * - Goossens et al., Ann Oncol 2013: abstract only, Europe PMC. The abstract as held there has lost the
 *   non-inferiority margin, so the page reports the rates and the authors' conclusion and no longer says
 *   "non-inferior" on its own authority.
 * - Liu et al., Int J Clin Oncol 2025 (online November 2024): abstract only. Wang et al., Front Oncol 2022: abstract.
 * - NHS Borders TIVAD protocol (issue 2, August 2020) and Shared Health Manitoba clinical procedure P02.2 (version
 *   20 May 2025): full text, the public PDFs fetched with curl and read through pdftotext.
 * - Macmillan Cancer Support "Implantable ports" and Cancer Research UK "Portacaths": the public pages, fetched raw
 *   and stripped to text. Added on 17 November 2026 as the sources for what patients are asked to report and for the
 *   4 to 6 week flush.
 *
 * Not readable on 17 November 2026:
 * - ESMO Clinical Practice Guidelines, central venous access in oncology (Sousa et al., Ann Oncol 2015). It was read
 *   in full on 11 November 2026 from the Internet Archive's capture of academic.oup.com. On 17 November the publisher
 *   returned 403, Europe PMC holds no full text, and the Internet Archive was refusing scripted requests, so it was
 *   not requested again. Its seven quotes and their grades stand as read on 11 November and are listed in `gaps`. A
 *   heparin figure that rested on ESMO alone was taken off the page.
 * - INS Infusion Therapy Standards of Practice, 9th edition (J Infus Nurs 2024): the journal page serves no
 *   standards text to a script and no open copy was found. Named in sources; no step rests on it.
 * - RCN Standards for Infusion Therapy and the ONS Access Device Standards of Practice: not read, not cited.
 *
 * Masks and turning the head away (the owner's question), with the scope of each source:
 * - No national or international guideline read asks for a mask on the clinician or the patient, or for the patient
 *   to turn the head away, when a port is accessed, flushed or dressed. Their masks are for inserting a line (CDC,
 *   SHEA) or for splash risk (epic3 SP29, NICE 1.1.3.10). epic3 also says its reviews found no robust experimental
 *   studies showing that masks worn by healthcare workers protected patients during routine ward procedures.
 * - Shared Health Manitoba P02.2 (paramedics, all ages) states both, for the access and until the infusion is
 *   running; the patient's mask comes off before the needle is removed.
 * - NHS Borders (nurses and midwives, adults) asks the nurse for an "appropriate face covering" and nothing of the
 *   patient.
 *
 * Every DOI was resolved through Crossref or Europe PMC and its title checked. Quotes are copied from the raw text with
 * line breaks joined and nothing else changed; where a source sentence ends in a reference list, the quote stops before
 * it.
 */
export const implantedPortAccessAndCare = protocol({
  id: "implanted-port-access-and-care",
  name: "Implanted port access, flushing and care in adults having cancer treatment",
  aka: ["port access", "accessing a portacath", "port-a-cath care", "Huber needle access", "port flush", "port de-access", "TIVAD care", "totally implantable venous access device care", "chemo port care"],
  domain: "vascular-access",
  tldr: "A port is a small chamber under the skin, joined to a tube in a large vein, that lets nurses give treatment and take blood through a special needle. Each time, the nurse cleans their hands and your skin, checks that blood comes back and flushes the port with salt water. A port that is not in regular use is flushed every 4 to 6 weeks.",
  simple: "A port is a little device under your skin for treatment and blood tests. The nurse cleans their hands and your skin, puts a special needle in, checks it works and rinses it with salt water. Tell your hospital team if the skin around it goes red, swollen or sore, if fluid leaks there, or if you have a high temperature.",
  summary: "Port care rests on recommendations written for all central lines, each for its own setting: CDC/HICPAC (2011) and SHEA (2022, acute-care hospitals) in the United States, epic3 for NHS hospitals in England, NICE CG139 for primary and community care. Hand hygiene before and after accessing (CDC Category IB) and aseptic technique (CDC IB; NICE names ANTT as an example) come first. Skin antisepsis is chlorhexidine in alcohol, worded for a line's insertion site: CDC IA (>0.5% with alcohol, before insertion and during dressing changes), epic3 IVAD23 Class A (2% chlorhexidine gluconate in 70% isopropyl alcohol, allowed to air dry), ESMO [I, A]. Connectors and hubs are scrubbed before each access (CDC IA, SHEA moderate quality of evidence, epic3 IVAD30 Class D/GPP: at least 15 seconds, then allowed to dry). No guideline read gives a skin drying time; CDC says to follow the antiseptic manufacturer.\n\nAccess is with a non-coring (Huber) needle and blood return is confirmed before treatment. No guideline that could be read states either step; the local policies and the UK patient pages describe both, and the INS standards, which do address port access, could not be read. On dressings, the guidelines cover the healing wound after a port is put in (replace every 7 days until healed: NICE 1.4.3.6, epic3 IVAD22 Class D/GPP; CDC no more than once a week, Category II) and transparent dressings on central line insertion sites in general (every 7 days, or sooner if no longer intact or moisture collects: NICE 1.4.3.4). None names the needle site of an accessed port. On the needle itself, CDC makes no recommendation on how often it is replaced or how long it can stay in (both unresolved issues); one UK local policy changes it weekly.\n\nFlush with 0.9% saline after every infusion or sample (ESMO [II, B]; epic3 IVAD34 Class A is for saline to flush and lock lumens accessed frequently). On the lock, heparin has not been shown to be clearly better than saline. The Cochrane review (2022, 12 RCTs, 2422 adults, all central lines, two oncology studies) found fewer occlusions with heparin (RR 0.70, 95% CI 0.51 to 0.95, low-certainty evidence) and concluded it was uncertain whether heparin results in fewer occlusions. In ports, a randomised trial of 802 people with cancer reported impossible aspiration at 3.70% of accesses with saline and 3.92% with heparin 300 U/3 ml, and concluded that saline is safe and effective if combined with a strict protocol. NICE prefers saline (1.4.4.6) and says ports should be flushed and locked with heparin when the manufacturer recommends it (1.4.4.7; both 2003). For ports not in use ESMO recommends a four-weekly flush [III, C] and Macmillan tells patients every 4 to 6 weeks; a 2025 meta-analysis of 11 studies tended to support three months, with caution.\n\nNo national or international guideline read recommends a mask for the clinician or the patient, or the patient turning the head away, when a port is accessed, flushed or dressed. Their masks are for inserting a line (CDC IB, SHEA) and for splash risk (epic3 SP29, NICE 1.1.3.10), and epic3 reports no robust experimental studies showing that masks worn by healthcare workers protected patients during routine ward procedures. A Canadian paramedic procedure requires both for the access; a Scottish nursing policy asks only the nurse for a face covering (variants). The ESMO grades are as read on 11 November 2026; the guideline could not be re-read on 17 November 2026.",
  asOf: "2026-11-17",
  setting: {
    who: ["nurse", "patient-or-carer"],
    where: ["chemotherapy-day-unit", "ward", "outpatient-clinic", "home", "community"],
  },
  population: "Adults with an implanted port (totally implantable venous access device) having cancer treatment, in any cancer. The guidelines cited are written for central venous catheters in general, each for its own setting: SHEA for acute-care hospitals (it states its recommendations are not stratified by catheter type), epic3 for NHS hospitals in England, NICE CG139 for primary and community care, ESMO for people with cancer. Of the two local policies, NHS Borders covers adults only and the Manitoba procedure all ages. Children, power injection through the port, and ports placed for dialysis or parenteral nutrition alone follow their own protocols and are not covered here.",
  trigger: "A port is to be used for treatment or blood sampling, or is due its routine flush while not in use.",
  steps: [
    {
      action: "Look at and feel the skin over the port before you start, and examine it closely if it is tender or the person has a fever",
      why: "CDC asks for the site to be checked by eye or by touch, and examined thoroughly where there is tenderness, fever with no obvious source or another sign of infection. The Manitoba procedure adds that the port is not used if there is any evidence of infection over it.",
      source: "cdc-hicpac-2011",
      quote: "Monitor the catheter sites visually when changing the dressing or by palpation through an intact dressing on a regular basis, depending on the clinical situation of the individual patient.",
      grade: "Category IB",
    },
    {
      action: "Clean your hands before and after touching the port, the needle or the dressing",
      why: "CDC states that hand hygiene before a line is handled, together with proper aseptic technique, protects against infection.",
      source: "cdc-hicpac-2011",
      quote: "Hand hygiene should be performed before and after palpating catheter insertion sites as well as before and after inserting, replacing, accessing, repairing, or dressing an intravascular catheter.",
      grade: "Category IB",
    },
    {
      action: "Use aseptic technique throughout, for example Aseptic Non Touch Technique",
      why: "Aseptic technique means that only uncontaminated equipment and fluids touch the needle and the line. NICE names ANTT as an example, not a requirement. No national guideline read says which gloves to wear to access a port; both local policies read put on sterile gloves before cleaning the skin and inserting the needle.",
      source: "nice-cg139",
      quote: "An aseptic technique must be used for vascular access device catheter site care and when accessing the system",
      grade: "[new 2012]",
    },
    {
      action: "Clean the skin over the port with 2% chlorhexidine gluconate in 70% isopropyl alcohol and let it air dry before the needle goes in",
      why: "epic3 recommends this antiseptic for cleaning the site of a central line at dressing changes, with povidone iodine in alcohol for people sensitive to chlorhexidine. No guideline read words it for the skin over a port by name; both local policies read use it there.",
      source: "epic3",
      quote: "Use a single-use application of 2% chlorhexidine gluconate in 70% isopropyl alcohol (or povidone iodine in alcohol for patients with sensitivity to chlorhexidine) to clean the central catheter insertion site during dressing changes, and allow to air dry.",
      grade: "Class A",
    },
    {
      action: "Put a non-coring (Huber type) needle through the centre of the septum, at right angles, until it meets the back of the port",
      why: "A port is made to be entered with this special needle. Macmillan tells patients it is called a Huber needle, and NHS Borders says a Gripper or Huber needle must be used.",
      practice: "No national guideline that could be read states the needle type or how it is inserted. NHS Borders requires a Gripper or Huber needle and inserts it at 90 degrees to the skin until the back of the port is felt; the Manitoba procedure inserts the access set needle at 90 degrees into the centre of the septum until resistance is met at the back of the port; Macmillan's patient page names the Huber needle. The INS standards, which address port access, could not be read.",
    },
    {
      action: "Draw back to check for blood return before giving any treatment, and if there is none do not give treatment until the port has been assessed",
      why: "Blood coming back shows that the needle is in the right place. Cancer Research UK tells patients that the nurse will check for blood return each time the port is used.",
      practice: "No guideline read states or grades this step. NHS Borders makes blood return a rule before chemotherapy, parenteral nutrition and all intravenous therapy and sends a port without it to its central line protocol; the Manitoba procedure says correct placement is verified by the return of blood; and the port trial of Goossens 2013 took 'easy injection, impossible aspiration' as its primary outcome.",
    },
    {
      action: "Scrub the needleless connector or hub with an antiseptic each time before it is used, and access it only with sterile devices",
      why: "CDC gives this its strongest grade as the way to lower the risk of contaminating the line through the connector. epic3 adds a minimum of 15 seconds and letting it dry.",
      source: "cdc-hicpac-2011",
      quote: "Minimize contamination risk by scrubbing the access port with an appropriate antiseptic (chlorhexidine, povidone iodine, an iodophor, or 70% alcohol) and accessing the port only with sterile devices",
      grade: "Category IA",
    },
    {
      action: "Flush with 0.9% saline after every infusion and every blood sample",
      why: "Flushing is meant to stop the catheter blocking, as Macmillan tells patients, and NHS Borders flushes between medicines so that incompatible ones do not mix in the line.",
      source: "esmo-2015",
      quote: "Routine flushing with saline, after the completion of any infusion or blood sampling, is recommended",
      grade: "[II, B]",
    },
    {
      action: "While the needle stays in, cover it with a sterile transparent dressing and change the dressing every 7 days, or sooner if it lifts or moisture collects under it",
      why: "NICE's rule is written for the insertion site of any central line, not for a port needle by name. A clear dressing lets the site be inspected without being taken off. NHS Borders covers the needle with an occlusive dressing and inspects the site daily in hospital.",
      source: "nice-cg139",
      quote: "Change the transparent semipermeable membrane dressing covering a central venous access device insertion site every 7 days, or sooner if the dressing is no longer intact or moisture collects under it.",
      grade: "[2012]",
    },
    {
      action: "Keep an accessed port out of the bath and the swimming pool; showering is allowed if the needle and dressing are protected from water",
      why: "CDC says a line and its site should not go under water, and permits showering with precautions such as an impermeable cover. NHS Borders advises showering, and no bathing or swimming, while the needle is in.",
      source: "cdc-hicpac-2011",
      quote: "Do not submerge the catheter or catheter site in water.",
      grade: "Category IB",
    },
    {
      action: "Lock the port with sterile 0.9% saline by preference, and with heparin where the port's manufacturer recommends it",
      why: "NICE prefers saline and keeps heparin for ports whose maker recommends it. Trials in adults have not shown clearly that heparin keeps lines open better than saline, and epic3 lists a drop in platelets, allergic reactions and bleeding as side effects of heparin flushes. Many units still lock ports with heparin (see variants).",
      source: "nice-cg139",
      quote: "Preferably, a sterile 0.9 percent sodium chloride injection should be used to flush and lock catheter lumens.",
      grade: "[2003]",
    },
    {
      action: "To remove the needle, flush and lock first, hold the port steady, withdraw the needle and press on the site with sterile gauze until bleeding stops",
      why: "This is how both local policies read describe it. Neither gives a reason beyond stopping the bleeding.",
      practice: "No national guideline read describes removing a port needle. NHS Borders holds the port securely, removes the needle slowly and presses with a sterile swab until bleeding has stopped (about 5 minutes). The Manitoba procedure cleans the injection port with alcohol, flushes with saline, injects the heparin, stabilises the port, locks the needle in its safety position and holds sterile gauze on the site until bleeding stops.",
    },
    {
      action: "When the port is not in use between courses, flush it every four weeks",
      why: "A regular flush is meant to keep the catheter from blocking. Macmillan tells patients every 4 to 6 weeks, NHS Borders says at least every 4 weeks, and some centres leave longer gaps (see variants).",
      source: "esmo-2015",
      quote: "To maintain patency of subcutaneous ports that are not in active use, a four weekly flush is recommended",
      grade: "[III, C]",
    },
    {
      action: "Teach the patient and carer what to watch for and ask them to report any change at the port or any new discomfort",
      why: "CDC suggests it, and NHS Borders makes sure the patient knows why reporting complications matters and has a contact number for it.",
      source: "cdc-hicpac-2011",
      quote: "Encourage patients to report any changes in their catheter site or any new discomfort to their provider.",
      grade: "Category II",
    },
    {
      action: "Treat fever, shivering or chills, or redness, pain, swelling or leaking fluid at the port as a possible line infection, and take paired blood cultures from the port and from a vein",
      why: "These are the signs Macmillan asks patients to report and NHS Borders lists for systemic infection. NHS Borders says not to use the line and to refer to the medical team; Cancer Research UK tells patients that an infection needs antibiotics straight away.",
      source: "esmo-2015",
      quote: "If CRBSI is suspected, collect paired blood (acquiring the same volume of blood) from the catheter and from a peripheral vein",
      grade: "[II, A]",
    },
    {
      action: "If the port will not flush or give blood back, or the arm, neck, chest or shoulder swells, stop and have it assessed, with a Doppler ultrasound scan if a clot is suspected",
      why: "Macmillan lists swelling of the arm, chest, neck or shoulder among the things to report, and says a blocked catheter may be flushed with a solution to clear it or the port may need to be removed.",
      source: "esmo-2015",
      quote: "Doppler ultrasound should be carried out if thrombosis is suspected",
      grade: "[III, A]",
    },
  ],
  bestInClass: {
    statement: "Hand hygiene (CDC IB), aseptic technique (CDC IB; NICE), chlorhexidine in alcohol on the skin and on the connector, allowed to dry (CDC IA; epic3 Class A for the skin, Class D/GPP for the hub), a 0.9% saline flush after every use (ESMO [II, B]) and a four-weekly flush when the port is not in use (ESMO [III, C]; Macmillan tells patients every 4 to 6 weeks). A non-coring needle and a check for blood return are in every local policy and patient page read, but in no guideline that could be read. The 7-day change of a transparent dressing is written for central line insertion sites (NICE [2012]) and for a port's healing wound (NICE [2003], epic3 Class D/GPP, CDC Category II), not for the needle of an accessed port, and CDC makes no recommendation on how often that needle is replaced (unresolved issue). On the lock, the sources differ. epic3 (Class A, for lumens accessed frequently) and NICE (by preference) favour saline; NICE says ports should be flushed and locked with heparin when the manufacturer recommends it. The Cochrane review (2022) was uncertain whether heparin results in fewer occlusions, and a randomised trial in 802 people with ports (Goossens 2013) concluded that saline is safe and effective if combined with a strict protocol. Masks for the clinician or patient, and the patient turning the head away, are in no national or international guideline read; they are local practice. The ESMO grades are as read on 11 November 2026 and could not be re-read on 17 November 2026.",
    sources: ["esmo-2015", "cdc-hicpac-2011", "epic3", "nice-cg139", "cochrane-heparin-saline-2022", "goossens-2013", "macmillan-implantable-ports"],
  },
  variants: [
    {
      name: "Heparin lock",
      differs: "Locks the port with heparinised saline after the saline flush, instead of saline alone. NHS Borders (adults) flushes with 10 ml of 0.9% saline and locks with 4 ml of heparinised saline 100 units/ml when the port is not in use or was accessed for flushing only. The Manitoba procedure injects a prefilled syringe of heparin 100 units/ml at de-access, 6 ml for a large port and 3 ml for a small one. Cancer Research UK tells patients that a port not in use for treatment is flushed with heparin and saline.",
      evidence: "Cochrane 2022 (12 RCTs, 2422 adults, two oncology studies, heparin 10 to 5000 IU/mL): low-certainty evidence that heparin may give fewer occlusions (RR 0.70, 95% CI 0.51 to 0.95), no clear difference in patency duration, bloodstream infection or bleeding, and studies not powered to detect rare events such as heparin-induced thrombocytopenia. Goossens 2013 (802 people with a new port randomised, heparin 300 U/3 ml against saline): impossible aspiration at 3.92% of accesses with heparin and 3.70% with saline; the authors concluded saline is safe and effective if combined with a strict protocol. NICE: heparin when the manufacturer recommends it [2003]. epic3 notes that manufacturers of implanted ports may recommend heparin flushes for lines accessed infrequently.",
      sources: ["cochrane-heparin-saline-2022", "goossens-2013", "nice-cg139", "epic3", "nhs-borders-tivad-2020", "manitoba-p02-2", "cruk-portacaths"],
    },
    {
      name: "Longer flushing interval between courses",
      differs: "Flushes a port that is not in use every two to three months, or longer, rather than every four weeks.",
      evidence: "ESMO, as read on 11 November 2026 and not re-read, notes reports of every 8 weeks or every 3 to 4 months and calls for prospective study. A 2025 meta-analysis of 11 studies (4924 participants) tended to support three-monthly flushing with no expected rise in occlusion or overall complications, to be read with caution; one analysis showed more occlusion at two or three months than at one month (RR 1.50, 1.18 to 1.92) that was not confirmed by sensitivity analysis. A single-centre retrospective study in 617 people with breast cancer found no significant difference in complications across intervals of up to 30, 31 to 90 and 91 to 120 days.",
      sources: ["esmo-2015", "liu-flush-interval-2025", "wang-breast-flush-2022"],
    },
    {
      name: "Masks for clinician and patient, and the patient's head turned away",
      differs: "The clinician wears a procedure mask, a mask is placed on the patient and on anyone staying nearby, and the patient lies flat with the head turned away from the port. Shared Health Manitoba P02.2 states, before the port is accessed: \"Put a procedure mask on. Place a mask on the patient, as well as any other individuals who will remain in the vicinity.\" and \"Have the patient lay supine, and turn their head away from the port.\" Once the infusion is running it says: \"Remove the patient’s mask and allow them to resume a comfortable head position.\" So the patient's mask and head position cover the access and the start of the infusion, not the removal of the needle. The procedure is for all ages and is written for paramedics (those with a primary or intermediate scope may access a port only in an emergency); it lists the masks under protective equipment for contact and droplet precautions and uses a sterile field and drape. NHS Borders (adults; nurses and midwives) asks the nurse to \"Put on apron and appropriate face covering.\" and asks nothing of the patient.",
      evidence: "No national or international guideline read recommends it (CDC/HICPAC 2011, SHEA 2022, epic3, NICE CG139, and ESMO 2015 as read on 11 November 2026). They specify masks for inserting a central or arterial line (CDC Category IB; SHEA, for everyone involved in the insertion) and where blood or body fluid may splash into the face and eyes (epic3 SP29, Class D/GPP H&S; NICE 1.1.3.10 [2003]). epic3 explains that healthcare workers, and sometimes patients, may wear surgical masks to stop respiratory droplets from the mouth and nose being expelled into the environment, and reports that its systematic reviews found no robust experimental studies showing that masks worn by healthcare workers protected patients from infection during routine ward procedures such as wound dressing or invasive medical procedures. Neither local policy gives a reason or a reference for the practice, and a Europe PMC search on 17 November 2026 found no trial of masks or head turning at port access.",
      sources: ["manitoba-p02-2", "nhs-borders-tivad-2020", "cdc-hicpac-2011", "shea-clabsi-2022", "epic3", "nice-cg139"],
    },
    {
      name: "Weekly needle change with a new puncture site, and a minimum skin drying time",
      differs: "NHS Borders (adults) says the needle can be left in place for up to one week and, if the port is in constant use for more than a week, changes it weekly using a different puncture site. It cleans the skin for a minimum of 30 seconds and lets it air dry for at least a minute, and it makes blood return a rule before any intravenous therapy. The Manitoba procedure cleans the skin for 30 seconds in each of two directions and lets it air dry.",
      evidence: "Local policy (issue 2, August 2020; its review date of July 2023 has passed). CDC/HICPAC makes no recommendation on how often the needle is replaced or how long it can stay in (both unresolved issues) and says that some centres have left needles in place for several weeks without bloodstream infection, a practice it calls not adequately studied. The national guidelines read give no skin drying time: epic3 and NICE say to allow to air dry, and CDC to follow the manufacturer.",
      sources: ["nhs-borders-tivad-2020", "manitoba-p02-2", "cdc-hicpac-2011", "epic3", "nice-cg139"],
    },
  ],
  grades: [
    { claim: "Hand hygiene before and after accessing or dressing an intravascular catheter", grade: "Category IB", source: "cdc-hicpac-2011" },
    { claim: "Chlorhexidine above 0.5% with alcohol for skin preparation before central line insertion and during dressing changes", grade: "Category IA", source: "cdc-hicpac-2011", quote: "Prepare clean skin with a >0.5% chlorhexidine preparation with alcohol before central venous catheter and peripheral arterial catheter insertion and during dressing changes." },
    { claim: "2% chlorhexidine in 70% isopropyl alcohol at the central catheter site during dressing changes, allowed to air dry", grade: "Class A", source: "epic3" },
    { claim: "Chlorhexidine above 0.5% with alcohol for antisepsis, as a main strategy against catheter infection (as read on 11 November 2026)", grade: "[I, A]", source: "esmo-2015", quote: "Use of >0.5% chlorhexidine skin preparation with alcohol for antisepsis [I, A]" },
    { claim: "Scrub the access port of a needleless system with an antiseptic and access it only with sterile devices", grade: "Category IA", source: "cdc-hicpac-2011" },
    { claim: "Disinfect hubs, needleless connectors and injection ports before access", grade: "Quality of Evidence: MODERATE", source: "shea-clabsi-2022", quote: "Disinfect catheter hubs, needleless connectors, and injection ports before accessing the catheter (Quality of Evidence: MODERATE)" },
    { claim: "Decontaminate the access port or hub with 2% chlorhexidine in 70% isopropyl alcohol for at least 15 seconds and let it dry", grade: "Class D/GPP", source: "epic3", quote: "The hub should be cleaned for a minimum of 15 s and allowed to dry before accessing the system." },
    { claim: "Decontaminate the injection port or hub before and after accessing the system", grade: "[new 2012]", source: "nice-cg139", quote: "Decontaminate the injection port or vascular access device catheter hub before and after accessing the system using chlorhexidine gluconate in 70% alcohol." },
    { claim: "Saline flush after every infusion or blood sample (as read on 11 November 2026)", grade: "[II, B]", source: "esmo-2015" },
    { claim: "Sterile normal saline to flush and lock lumens accessed frequently", grade: "Class A", source: "epic3", quote: "Use sterile normal saline for injection to flush and lock catheter lumens that are accessed frequently." },
    { claim: "Heparin flush and lock for implanted ports when the manufacturer recommends it", grade: "[2003]", source: "nice-cg139", quote: "When recommended by the manufacturer, implanted ports or opened-ended catheter lumens should be flushed and locked with heparin sodium flush solutions." },
    { claim: "Heparin versus saline flushing made no difference to thrombosis rates (as read on 11 November 2026)", grade: "[I, C]", source: "esmo-2015", quote: "However, when compared with 0.9% normal saline flushing, no differences in thrombosis rates were found [I, C]" },
    { claim: "Heparin lock may reduce occlusion compared with saline (RR 0.70, 95% CI 0.51 to 0.95)", grade: "low-certainty evidence", source: "cochrane-heparin-saline-2022" },
    { claim: "Four-weekly flush for ports not in active use (as read on 11 November 2026)", grade: "[III, C]", source: "esmo-2015" },
    { claim: "How often to replace the needle used to access a port", grade: "Unresolved issue", source: "cdc-hicpac-2011", quote: "No recommendation can be made regarding the frequency for replacing needles to access implantable ports." },
    { claim: "How long a needle used to access a port can stay in place", grade: "Unresolved issue", source: "cdc-hicpac-2011", quote: "No recommendation can be made regarding the length of time a needle used to access implanted ports can remain in place." },
    { claim: "Replace transparent dressings on tunnelled or implanted line sites no more than once a week, unless soiled or loose, until the insertion site has healed", grade: "Category II", source: "cdc-hicpac-2011", quote: "Replace transparent dressings used on tunneled or implanted CVC sites no more than once per week (unless the dressing is soiled or loose), until the insertion site has healed." },
    { claim: "Replace dressings on tunnelled or implanted line sites every 7 days until the insertion site has healed", grade: "[2003]", source: "nice-cg139", quote: "Dressings used on tunnelled or implanted central venous catheter sites should be replaced every 7 days until the insertion site has healed, unless there is an indication to change them sooner." },
    { claim: "Replace dressings on tunnelled or implanted catheter insertion sites every 7 days until healed; a dressing may then no longer be needed", grade: "Class D/GPP", source: "epic3", quote: "Dressings used on tunnelled or implanted catheter insertion sites should be replaced every 7 days until the insertion site has healed unless there is an indication to change them sooner." },
    { claim: "Paired blood cultures from the catheter and a peripheral vein when line infection is suspected (as read on 11 November 2026)", grade: "[II, A]", source: "esmo-2015" },
    { claim: "Remove the line for, among others, port abscess, tunnel infection or severe sepsis (as read on 11 November 2026)", grade: "[II, A]", source: "esmo-2015", quote: "Indications to remove the CVC are: severe sepsis, suppurative (septic) thrombophlebitis, endocarditis, tunnel infection, port abscess" },
    { claim: "Masks and eye protection where blood or body fluid may splash into the face and eyes (the only epic3 mask recommendation relevant to line care)", grade: "Class D/GPP H&S", source: "epic3", quote: "Fluid-repellent surgical face masks and eye protection must be worn where there is a risk of blood or body fluids splashing into the face and eyes." },
    { claim: "Maximal sterile barrier precautions, including a mask, for inserting central lines, PICCs or a guidewire exchange (not for accessing a port)", grade: "Category IB", source: "cdc-hicpac-2011", quote: "Use maximal sterile barrier precautions, including the use of a cap, mask, sterile gown, sterile gloves, and a sterile full body drape, for the insertion of CVCs, PICCs, or guidewire exchange" },
  ],
  sources: [
    {
      key: "esmo-2015",
      label: "Central venous access in oncology: ESMO Clinical Practice Guidelines",
      publisher: "ESMO (Annals of Oncology)",
      year: 2015,
      url: "https://doi.org/10.1093/annonc/mdv296",
      doi: "10.1093/annonc/mdv296",
      gradingScheme: "[level, grade]: levels I (large good-quality RCT or meta-analysis) to V (no control group, case reports, expert opinion); grades A (strongly recommended) to E (never recommended), adapted from the IDSA/USPHS system; ungraded statements are standard practice in the experts' view.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "cdc-hicpac-2011",
      label: "Guidelines for the Prevention of Intravascular Catheter-Related Infections, 2011 (last update October 2017)",
      publisher: "CDC/HICPAC",
      year: 2011,
      url: "https://www.cdc.gov/infection-control/media/pdfs/Guideline-BSI-H.pdf",
      gradingScheme: "Category IA (strongly recommended, strongly supported by well-designed studies), IB (strongly recommended, some studies and strong rationale, or accepted practice), IC (required by regulation), II (suggested), Unresolved issue (insufficient evidence or no consensus).",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "shea-clabsi-2022",
      label: "Strategies to prevent central line-associated bloodstream infections in acute-care hospitals: 2022 Update",
      publisher: "SHEA, IDSA, APIC (Infection Control and Hospital Epidemiology)",
      year: 2022,
      url: "https://doi.org/10.1017/ice.2022.87",
      doi: "10.1017/ice.2022.87",
      gradingScheme: "Quality of evidence HIGH, MODERATE or LOW, with each recommendation classed as an essential practice, an additional approach or an unresolved issue.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "epic3",
      label: "epic3: National Evidence-Based Guidelines for Preventing Healthcare-Associated Infections in NHS Hospitals in England",
      publisher: "Journal of Hospital Infection (Loveday et al., commissioned by the Department of Health)",
      year: 2014,
      url: "https://doi.org/10.1016/S0195-6701(13)60012-2",
      doi: "10.1016/S0195-6701(13)60012-2",
      gradingScheme: "SIGN-style classes A (1++ or consistent 1+ evidence) to D (level 3 or 4 evidence), GPP (good practice point from the guideline group's clinical experience and patient preference), H&S (health and safety legislation).",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "nice-cg139",
      label: "Healthcare-associated infections: prevention and control in primary and community care (CG139), recommendations",
      publisher: "NICE",
      year: 2012,
      url: "https://www.nice.org.uk/guidance/cg139/chapter/Recommendations",
      gradingScheme: "NICE does not grade recommendations; each is tagged with the year it was written or amended ([2003], [2012], [new 2012]). [2003] means the evidence has not been reviewed since 2003. Last updated February 2017.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "cochrane-heparin-saline-2022",
      label: "Heparin versus 0.9% sodium chloride locking for prevention of occlusion in central venous catheters in adults",
      publisher: "Cochrane Database of Systematic Reviews",
      year: 2022,
      url: "https://doi.org/10.1002/14651858.CD008462.pub4",
      doi: "10.1002/14651858.CD008462.pub4",
      gradingScheme: "GRADE certainty of evidence: high, moderate, low or very low.",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "goossens-2013",
      label: "Comparing normal saline versus diluted heparin to lock non-valved totally implantable venous access devices in cancer patients: a randomised, non-inferiority, open trial",
      publisher: "Annals of Oncology (Goossens et al.)",
      year: 2013,
      url: "https://doi.org/10.1093/annonc/mdt114",
      doi: "10.1093/annonc/mdt114",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "liu-flush-interval-2025",
      label: "Is it feasible to prolong the flushing interval for totally implantable venous access devices (TIVADs)? A systematic review and meta-analysis",
      publisher: "International Journal of Clinical Oncology (Liu et al.)",
      year: 2025,
      url: "https://doi.org/10.1007/s10147-024-02665-2",
      doi: "10.1007/s10147-024-02665-2",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "wang-breast-flush-2022",
      label: "Safety and feasibility assessment of extending the flushing interval in totally implantable venous access port flushing during the non-treatment stage for patients with breast cancer",
      publisher: "Frontiers in Oncology (Wang et al.)",
      year: 2022,
      url: "https://doi.org/10.3389/fonc.2022.1021488",
      doi: "10.3389/fonc.2022.1021488",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "ins-2024",
      label: "Infusion Therapy Standards of Practice, 9th Edition",
      publisher: "Infusion Nurses Society (Journal of Infusion Nursing)",
      year: 2024,
      url: "https://doi.org/10.1097/NAN.0000000000000532",
      doi: "10.1097/NAN.0000000000000532",
      read: "not-reachable",
      accessed: "2026-11-11",
    },
    {
      key: "nhs-borders-tivad-2020",
      label: "Totally Implanted Venous Access Devices (TIVAD) or PortaCath Protocol, issue 2",
      publisher: "NHS Borders",
      year: 2020,
      url: "https://rightdecisions.scot.nhs.uk/media/1806/protocol-for-tivad-port-2020_1.pdf",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "manitoba-p02-2",
      label: "P02.2: Medication and fluid administration by subcutaneous port (clinical procedure, version 2025-05-20)",
      publisher: "Shared Health Manitoba",
      year: 2025,
      url: "https://healthproviders.sharedhealthmb.ca/download/924/p-standard-clinical-procedures/42744/p02-2-medication-fluid-administration-by-subcutaneous-port.pdf",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "macmillan-implantable-ports",
      label: "Implantable ports (patient information, reviewed 1 March 2022)",
      publisher: "Macmillan Cancer Support",
      year: 2022,
      url: "https://www.macmillan.org.uk/cancer-information-and-support/treatment/types-of-treatment/cancer-drug-treatments/implantable-ports",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "cruk-portacaths",
      label: "Portacaths (patient information, last reviewed 16 May 2024)",
      publisher: "Cancer Research UK",
      year: 2024,
      url: "https://www.cancerresearchuk.org/about-cancer/treatment/chemotherapy/how-you-have/into-your-vein/portacath",
      read: "full-text",
      accessed: "2026-11-17",
    },
  ],
  technologies: ["implanted-ports", "infusion-devices-vascular-access", "huber-needles-port-access"],
  terms: ["central-venous-access", "febrile-neutropenia", "vte", "extravasation-infusion-reaction"],
  related: [],
  upgrades: ["idea-upgrade-masks-and-head-turn-at-port-access-infection-study"],
  gaps: [
    "No national or international guideline read (CDC/HICPAC 2011, SHEA 2022, epic3 2014, NICE CG139, and ESMO 2015 as read on 11 November 2026) recommends a mask on the clinician or the patient, or the patient turning the head away, when a port is accessed, flushed or dressed. Their mask recommendations cover line insertion (maximal sterile barrier precautions) and splash risk only. A provincial paramedic procedure (Shared Health Manitoba P02.2, all ages) requires both for the access and until the infusion is running; NHS Borders asks the nurse alone for a face covering. Neither gives a reason, and whether the INS standards address it could not be checked.",
    "On 17 November 2026 the ESMO 2015 guideline could not be re-read: the publisher returned 403, Europe PMC holds no full text, and the Internet Archive copy read on 11 November 2026 was refusing scripted requests. What rests on ESMO was read on 11 November and is not re-verified: the saline flush after every infusion or sample [II, B], the four-weekly flush for ports not in use [III, C], paired blood cultures [II, A], Doppler ultrasound for suspected thrombosis [III, A], the three graded sentences quoted in the evidence table, its note on longer flushing intervals, and its grading scheme. The four-weekly flush is also stated by NHS Borders (at least every 4 weeks) and by Macmillan (every 4 to 6 weeks). An ESMO statement on the amount of heparin, which rested on that guideline alone, was taken off the page.",
    "The INS Infusion Therapy Standards of Practice, 9th edition (2024), the most detailed standard on port access, needle change and flushing, could not be read: the journal served no standards text to a script and no open copy was found. Nothing here rests on it.",
    "No current edition of the RCN Standards for Infusion Therapy could be found to read, and the ONS Access Device Standards of Practice is a priced book; neither is cited.",
    "How often to change the needle of a port left accessed, and how long it can stay in, are unresolved issues in CDC/HICPAC 2011, and no other national guideline read states an interval. Weekly change is one local policy (NHS Borders).",
    "No guideline read states a dressing rule for the needle site of an accessed port. The 7-day rule in the steps is NICE's rule for central line insertion sites in general; the port-specific dressing rules in NICE, epic3 and CDC concern the healing wound after the port is put in.",
    "Skin drying time: the guidelines say only to let the antiseptic air dry, or to follow the manufacturer. The 30-second cleaning times and the one-minute drying time in the local policies are local.",
    "Heparin strength and volume for a port lock are not set by any guideline read. The figures on this page (4 ml of 100 units/ml; 3 or 6 ml of 100 units/ml; 300 U/3 ml in the Goossens trial) are those of two local policies and one trial, not recommendations.",
    "The heparin versus saline evidence is low to very low certainty across all central venous catheters, with only two oncology studies in the Cochrane review; the Cochrane full text, the Goossens trial and the flushing-interval studies were read as abstracts only. The Goossens abstract as held by Europe PMC has lost its non-inferiority margin, so the page gives the rates and the authors' conclusion.",
    "What patients are asked to report comes from the Macmillan and Cancer Research UK pages. Neither sets a time limit, beyond Cancer Research UK saying an infection needs antibiotics straight away. The Macmillan page was reviewed in March 2022, its next review was due in March 2025, and it says it is being reviewed.",
    "The ESMO guideline dates from 2015 and the CDC guideline from 2011 (updated 2017); no newer edition of either was found, and Crossref lists no later version of the Cochrane review. The NHS Borders policy passed its review date in July 2023.",
  ],
});
