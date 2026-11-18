import { protocol } from "./helpers";

/*
 * Management of chemotherapy extravasation, by agent class, in adults. Written 11 November 2026; second accuracy pass
 * 16 November 2026, when every source was fetched again and every claim re-read against the raw text.
 *
 * What was read on 16 November 2026, and how (all fetched raw with curl; PDFs through pdftotext -layout; HTML and XML
 * stripped of tags; every quotation checked by script against the saved text):
 * - ONS/ASCO Guideline on the Management of Antineoplastic Extravasation (Clin J Oncol Nurs 2025;29(5):384-399,
 *   DOI 10.1188/25.CJON.384-399, PMC12463152; co-published JCO Oncol Pract 2026;22(6):924-938, DOI 10.1200/OP-25-00579).
 *   On 11 November only the abstract could be read. On 16 November the PubMed Central page answered a plain request
 *   and the full text was read there as HTML: the five recommendations with their strength and certainty, Table 4
 *   (antidote doses) and Table 5. Europe PMC still returned a server error for the XML, the publisher does not allow
 *   XML download, and ascopubs.org still sits behind a bot check, so the JCO Oncology Practice copy was not read. The
 *   two figures (the algorithm) are images on PubMed Central.
 * - ONS Voice summary of that guideline (October 2025): read in full as HTML.
 * - The guideline's one-page clinical algorithm (PDF on ons.org). It has no text layer, so it was read as an image:
 *   steps cite it for content but take no quotation from it.
 * - JSCN/JSMO/JASPO multidisciplinary guideline on extravasation (ESMO Open 2024;9:103932, DOI 10.1016/j.esmoop.2024.103932,
 *   PMC11490930): full text read as Europe PMC XML, including Table 1 (grades) and Table 2 (drug classification).
 * - Savene (dexrazoxane) Summary of Product Characteristics, EMA product information PDF (file dated July 2024; the SmPC
 *   leaves its own revision date blank): full text. Gives the licensed dexrazoxane schedule.
 * - West Midlands Expert Advisory Group for SACT, Guidelines for the Management of Extravasation of a Systemic Anti-Cancer
 *   Therapy including Cytotoxic Agents (v1, agreed 19 July 2017, review date 19 July 2019; published on england.nhs.uk
 *   in May 2019): full text, with the flowchart page also read as an image. The UK network variant; past its own review
 *   date, which the page says.
 * - ESMO-EONS Clinical Practice Guidelines (Ann Oncol 2012;23 Suppl 7:vii167-vii173, DOI 10.1093/annonc/mds294): still
 *   not reachable on 16 November 2026 (annalsofoncology.org returned a bot check; Europe PMC holds no abstract). A
 *   Europe PMC search found no newer ESMO edition. No step rests on it.
 * Every DOI above was resolved through Crossref and its title checked.
 */
export const chemotherapyExtravasationManagement = protocol({
  id: "chemotherapy-extravasation-management",
  name: "Management of chemotherapy extravasation by drug class",
  aka: ["Extravasation management", "Vesicant extravasation", "Anthracycline extravasation", "Chemotherapy leak into tissue"],
  domain: "chemotherapy-administration",
  tldr:
    "If a chemotherapy drug leaks out of the vein into the skin around a drip or port, the nurse stops the drip at once, draws back what they can, marks the area and then treats it according to the drug, with an antidote or a cold or warm pack. Tell the team straight away if the site stings, burns, swells or changes colour, during treatment or in the days after.",
  summary:
    "Extravasation is leakage of an intravenous anticancer drug into the surrounding tissue. Management starts the same way for every drug: stop the infusion, leave the cannula or port needle in place, aspirate what can be withdrawn without flushing, mark and photograph the area, inform the senior nurse and doctor, then remove the device and elevate the limb.\n\nThe specific measures depend on the drug's class. Vesicants are split into DNA-binding agents (anthracyclines, mitomycin, dactinomycin, mechlorethamine), which are localised with cold and neutralised with an antidote where one exists, and non-DNA-binding agents (vinca alkaloids, taxanes), which are dispersed with warmth and hyaluronidase. The ONS/ASCO 2025 guideline, the newest GRADE-based one, recommends antidotes where available (a strong recommendation on very low certainty evidence): dexrazoxane for doxorubicin, daunorubicin, epirubicin and idarubicin; hyaluronidase for vinca alkaloids, and conditionally for paclitaxel and docetaxel; topical dimethyl sulfoxide for mitomycin and mitoxantrone, or for an anthracycline when dexrazoxane is unavailable or contraindicated; sodium thiosulfate for more than 20 ml of high-concentration cisplatin, and to be considered for bendamustine. Thermal compresses (a conditional recommendation) are used three to four times daily for 48 to 72 hours: cold for most vesicants, warm for vinca alkaloids, etoposide and oxaliplatin, and for taxanes when hyaluronidase is given.\n\nDexrazoxane is given intravenously away from the affected limb, 1000 mg/m2 on days 1 and 2 and 500 mg/m2 on day 3, the first dose within six hours, with cooling removed at least 15 minutes beforehand and no dimethyl sulfoxide alongside. For extravasation from a central venous access device ONS/ASCO suggests surgical referral or escalation of care as well as conservative management (a conditional recommendation), with DNA-binding vesicants, large volumes and grade 2 or worse injury the likeliest to benefit. The Japanese 2024 guideline differs on heat (it weakly recommends against warm compresses alone) and makes no recommendation on aspiration; it weakly recommends against local steroid injection and against debriding an ulcer without necrosis. Documentation, patient teaching and follow-up for weeks complete the protocol.",
  asOf: "2026-11-16",
  setting: {
    who: ["nurse", "doctor", "pharmacist", "surgical-team", "patient-or-carer"],
    where: ["chemotherapy-day-unit", "ward", "outpatient-clinic", "home"],
  },
  population:
    "Adults receiving intravenous anticancer drugs through a peripheral cannula or a central venous access device. The ONS/ASCO guideline is written for adults, and the UK network guideline for patients over 16 cared for in adult services; the Japanese guideline does not state an age range. The Savene label says safety and efficacy below 18 have not been established, and does not recommend dexrazoxane in elderly patients, in whom it was not evaluated.",
  trigger:
    "During or after an intravenous anticancer infusion, the patient reports pain, burning or swelling at the site, or the nurse sees redness, swelling, a change in skin colour or blanching around the site, or loss of blood return from the device.",
  steps: [
    {
      action: "Recognise it: check the site and the line for loss of blood return, pain, redness, swelling, and skin colour change or blanching",
      why: "Recognising a leak early and acting on it gives the best chance of limiting the injury.",
      source: "ons-asco-algorithm-2025",
    },
    {
      action: "Stop the infusion at once and leave the cannula or port needle in place",
      why: "Leaving the device in gives a route to draw back drug still sitting in the line or tissue.",
      source: "ons-voice-2025",
      quote: "Stop the infusion immediately but leave the needle or catheter in place to allow for the possibility of aspirating any residual drug from the line or tissue.",
    },
    {
      action: "Slowly aspirate as much drug as possible through the device with a syringe, without flushing, then disconnect the tubing",
      why: "The aim is to remove drug still sitting in the line or tissue. The ONS/ASCO algorithm adds that the line is not flushed, and the Japanese guideline makes no recommendation on aspiration.",
      source: "ons-voice-2025",
      quote: "Attempt to withdraw as much of the drug as possible using a syringe, then disconnect the tubing.",
    },
    {
      action: "Call for help: inform a doctor straight away, and a consultant for any vesicant or any extravasation from a central line",
      why: "Antidotes and referrals need a prescriber, and some have to start within hours.",
      source: "wm-eag-2017",
      quote: "A doctor should be informed of the incident immediately; in the case of vesicants or an extravasation via a CVAD a consultant should be informed.",
    },
    {
      action: "Measure the area, outline it with a pen and photograph it",
      why: "A marked outline and a photograph show later whether the injury is spreading or settling.",
      source: "wm-eag-2017",
      quote: "Mark the extravasated area with a pen, take a digital image if possible.",
    },
    {
      action: "Remove the peripheral cannula or the port needle without pressing hard on the site, and raise a peripheral limb",
      why: "Raising the limb helps the fluid be absorbed. The algorithm says to avoid firm pressure on the site.",
      source: "ons-asco-algorithm-2025",
    },
    {
      action: "Identify the drug and its class: DNA-binding vesicant, non-DNA-binding vesicant, irritant or non-vesicant",
      why: "The class decides whether the area is cooled to keep the drug in one place or warmed to spread it, and which antidote applies.",
      source: "wm-eag-2017",
      quote: "DNA – binding: these drugs are absorbed locally, enter cells and bind to their DNA, precipitating the death of the cell. Following this, the drug can then be re-released to further destroy healthy cells leading to deeper erosion of cells within the tissue",
    },
    {
      action: "Cold compresses for anthracyclines, alkylating agents, antimetabolites, and taxanes when hyaluronidase is not given",
      why: "Cold narrows the vessels, which keeps the drug in a small area.",
      source: "ons-voice-2025",
      quote: "Cold compresses vasoconstrict and reduce spread and are best for alkylating agents, anthracyclines, taxanes (without hyaluronidase use), and antimetabolites.",
    },
    {
      action: "Warm compresses for vinca alkaloids, etoposide and oxaliplatin, and for paclitaxel or docetaxel when hyaluronidase is given",
      why: "Warmth spreads the drug so that it is diluted and absorbed.",
      source: "ons-voice-2025",
      quote: "Warm compresses disperse the agent and should be used for vinca alkaloids, etoposide, oxaliplatin, paclitaxel, and docetaxel (when coadministering hyaluronidase).",
    },
    {
      action: "Apply the compress for 15 to 20 minutes at a time, three to four times a day, for 48 to 72 hours",
      why: "The guideline panel preferred this longer course to a single day.",
      source: "ons-voice-2025",
      quote: "Using compresses use three to four times daily over 48–72 hours is recommended over shorter durations (e.g., 24 hours).",
    },
    {
      action: "Anthracyclines (doxorubicin, daunorubicin, epirubicin, idarubicin): give dexrazoxane, the first dose as soon as possible and within six hours",
      why: "Dexrazoxane is the antidote licensed for anthracycline extravasation, and the window for the first dose is short.",
      source: "savene-smpc",
      quote: "The first infusion should be initiated as soon as possible, within the first six hours after the accident.",
    },
    {
      action: "Anthracyclines: dose dexrazoxane at 1000 mg/m2 on day 1, 1000 mg/m2 on day 2 and 500 mg/m2 on day 3, days 2 and 3 at the same hour as day 1 plus or minus 3 hours, no single dose above 2000 mg where body surface area is over 2 m2, and halved if creatinine clearance is below 40 ml/min",
      why: "This is the licensed three-day schedule. The ONS/ASCO algorithm gives the same doses and also caps day 3 at 1000 mg.",
      source: "savene-smpc",
      quote: "Treatment should be given once daily for 3 consecutive days. The recommended dose is: Day 1: 1000 mg/m2 Day 2: 1000 mg/m2 Day 3: 500 mg/m2",
    },
    {
      action: "Anthracyclines: infuse dexrazoxane over 1 to 2 hours into a large vein of a limb or area other than the affected one, and take cold packs off the area at least 15 minutes before",
      why: "The drug has to reach the injured tissue through the blood, which cold slows.",
      source: "savene-smpc",
      quote: "Cooling procedures such as ice packs should have been removed from the area at least 15 minutes before the Savene administration in order to allow sufficient blood flow.",
    },
    {
      action: "Anthracyclines: do not apply dimethyl sulfoxide to a patient receiving dexrazoxane",
      why: "In animal studies the combination caused skin wounds that dexrazoxane alone prevented.",
      source: "savene-smpc",
      quote: "Dimethylsulfoxide (DMSO) should not be used in patients who are administered dexrazoxane to treat anthracycline extravasation",
    },
    {
      action: "Mitomycin, mitoxantrone, or an anthracycline when dexrazoxane is unavailable or contraindicated: use topical dimethyl sulfoxide",
      why: "Dimethyl sulfoxide is thought to protect tissue by scavenging free radicals.",
      source: "ons-voice-2025",
      quote: "Dimethyl sulfoxide for extravasation occurring with mitomycin C and mitoxantrone as well as when dexrazoxane is not available or is contraindicated",
    },
    {
      action: "Dimethyl sulfoxide: paint a thin layer over the marked area only, let it dry, and stop if it blisters",
      why: "It should treat the injured area without irritating healthy skin.",
      source: "wm-eag-2017",
      quote: "Carefully apply a thin layer of DMSO topically to the marked area avoiding contact with unaffected areas",
    },
    {
      action: "Dimethyl sulfoxide: start within 10 to 25 minutes, using a 50 to 99 per cent solution every 8 hours for 7 days over an area twice the size of the extravasation",
      why: "This is the schedule the ONS/ASCO algorithm and the full guideline give; see the variants for a six-hourly one.",
      source: "ons-asco-algorithm-2025",
    },
    {
      action: "Vinca alkaloids (vincristine, vinblastine, vinorelbine): give hyaluronidase and use warm compresses",
      why: "Hyaluronidase breaks down the tissue's binding substance so the drug spreads and is absorbed.",
      source: "ons-voice-2025",
      quote: "Hyaluronidase for extravasation occurring with vinca alkaloids, paclitaxel, and docetaxel",
    },
    {
      action: "Hyaluronidase: inject 1 ml (150 units) as five 0.2 ml injections under the skin around the edge of the area",
      why: "Ringing the area spreads the enzyme evenly through it.",
      source: "wm-eag-2017",
      quote: "Subcutaneously (or intradermally) inject 1 ml (150 IU) of hyaluronidase as 5 separate 0.2 ml injections around the periphery of extravasation site.",
    },
    {
      action: "Taxanes (paclitaxel, docetaxel): consider hyaluronidase with warm compresses; without it, use cold",
      why: "Taxane leaks may not cause severe injury, but the panel judged the possible benefit worth the low risk.",
      source: "ons-voice-2025",
      quote: "Although paclitaxel or docetaxel extravasations may not result in severe tissue injury, the experts made a conditional recommendation that patients receive hyaluronidase as an antidote because of a potential benefit in minimizing injury and the low potential for harm.",
      grade: "conditional recommendation",
    },
    {
      action: "Cisplatin (more than 20 ml at above 0.5 mg/ml): give sodium thiosulfate, and consider it for bendamustine",
      why: "The ONS/ASCO panel names it as the antidote for concentrated cisplatin. For bendamustine the full guideline says to consider it, because bendamustine is a derivative of mechlorethamine.",
      source: "ons-voice-2025",
      quote: "Sodium thiosulfate for extravasation occurring with > 20 ml of cisplatin in high concentration (greater than 0.5 mg/ml) and bendamustine",
    },
    {
      action: "Mechlorethamine (chlormethine), carmustine, dacarbazine and other DNA-binding vesicants with no antidote named: manage on the DNA-binding pathway, with cold to localise",
      why: "The UK network guideline classes these as DNA-binding vesicants and puts them on the cold, localise pathway.",
      source: "wm-eag-2017",
    },
    {
      action: "Drugs with no cold or warm compress named above: choose a compress by the drug's mechanism, the pain or swelling, and the patient's comfort",
      why: "Where the guideline names no compress for a drug, it leaves the choice to these three considerations. The UK network guideline uses a dry cold compress for non-vesicants.",
      source: "ons-voice-2025",
      quote: "For extravasation of agents not listed, consider the mechanism of action, presence of pain or swelling, and patient comfort when selecting a compress.",
    },
    {
      action: "Do not inject steroids into the site",
      why: "In the evidence the Japanese panel reviewed, injected steroids were linked to worse injury and slower recovery.",
      source: "jscn-jsmo-jaspo-2024",
      quote: "It is weakly recommended not to inject local steroids for EV of anticancer drugs.",
      grade: "Not recommend (weak), certainty D",
    },
    {
      action: "After a central line extravasation of a vesicant or an irritant with vesicant properties, refer for surgical review or escalate care, alongside conservative management",
      why: "The panel suggests this for central lines, and says patients with DNA-binding vesicants, large volumes or grade 2 or worse injury are the likeliest to benefit. For peripheral lines it found too little evidence and leaves referral to clinical judgement.",
      grade: "conditional recommendation; very low certainty of evidence",
      source: "ons-asco-2025",
      quote: "For patients with central line extravasation of irritant with vesicant properties or vesicant antineoplastic agents, ONS and ASCO suggest surgical referral/escalation of care in addition to conservative management rather than conservative management alone (conditional recommendation; very low certainty of evidence).",
    },
    {
      action: "Do not debride an ulcer that has no dead tissue",
      why: "Ulcers without necrosis can heal without surgery, and it is hard to judge early how deep the damage goes.",
      source: "jscn-jsmo-jaspo-2024",
      quote: "It is weakly recommended not to debride EV-induced skin ulcer lesions without necrosis.",
      grade: "Not recommend (weak), certainty C",
    },
    {
      action: "Refer for surgical debridement where tissue necrosis or pain has not resolved after more than 10 days",
      why: "The UK network guideline keeps surgery for severe injuries that conservative treatment has not settled.",
      source: "wm-eag-2017",
      quote: "Treatment of unresolved tissue necrosis or pain lasting more than 10 days is surgical debridement; this is generally for those patients who have suffered a severe extravasation in whom conservative therapy has not been appropriately initiated.",
    },
    {
      action: "Document the drug, dose, volume, site, device, timings, every measure taken and the response, and report the incident",
      why: "A full record guides follow-up and lets the service learn from each event.",
      source: "ons-voice-2025",
      quote: "Document the event carefully, including the drug, dose, timing, interventions taken, and the patient’s response.",
    },
    {
      action: "Teach the patient or carer to keep the area clean and dry, raise the limb, keep up the compresses, and report redness, pain, blistering, peeling or fever",
      why: "Damage can appear days or weeks later, at home.",
      source: "ons-voice-2025",
      quote: "Monitor the area for changes such as redness, pain, blistering, peeling, or streaks and report any delayed reactions such as fever higher than 100.4º F.",
    },
    {
      action: "Review the site within a week, booked before the patient leaves",
      why: "A planned review catches injury that is getting worse.",
      source: "wm-eag-2017",
      quote: "All patients must have a review of their extravasation injury within 1 week, this appointment must be arranged prior to the patient leaving clinic",
    },
    {
      action: "Start follow-up within a day, in person or remotely, and keep monitoring DNA-binding vesicant injuries for at least three weeks",
      why: "Injury from DNA-binding drugs has a history of appearing late.",
      source: "ons-asco-algorithm-2025",
    },
  ],
  bestInClass: {
    statement:
      "The best supported current recommendation is the ONS/ASCO guideline (2025, GRADE): stop, aspirate and mark; use the drug's antidote where one exists, its one strong recommendation (dexrazoxane for anthracyclines, hyaluronidase for vinca alkaloids and conditionally for taxanes, dimethyl sulfoxide for mitomycin and mitoxantrone or when dexrazoxane cannot be used, sodium thiosulfate for concentrated cisplatin and to be considered for bendamustine); and, as conditional recommendations, thermal compresses for 48 to 72 hours, cold for most vesicants and warm for vinca alkaloids, etoposide and oxaliplatin, and surgical referral or escalation of care after a central line extravasation. All five of its recommendations rest on very low certainty evidence. Dexrazoxane follows its licensed three-day schedule, started within six hours. Guidelines disagree on two points. ONS/ASCO recommends warm compresses for the dispersing drugs and its algorithm advises aspiration; the Japanese JSCN/JSMO/JASPO guideline (2024) weakly recommends against warm compresses used alone, partly because hyaluronidase is not approved for extravasation in Japan, and makes no recommendation on aspiration because the evidence could not be weighed.",
    sources: ["ons-asco-2025", "ons-voice-2025", "ons-asco-algorithm-2025", "savene-smpc", "jscn-jsmo-jaspo-2024"],
  },
  variants: [
    {
      name: "UK network pathway: localise and neutralise, or disperse and dilute (West Midlands, 2017)",
      differs:
        "Sorts vesicants by DNA binding: DNA-binding drugs get cold compresses and antidotes, non-DNA-binding drugs get warmth and hyaluronidase. Compresses for 20 minutes four times daily for 1 to 2 days. Chooses the anthracycline antidote by volume: topical dimethyl sulfoxide under 3 ml, dexrazoxane over 3 ml. Starts hyaluronidase within 1 hour (the ONS/ASCO algorithm says within 2 to 4 hours and the table in the full guideline within 3 to 4 hours). For a vesicant or irritant leaking from a peripheral cannula, its flowchart includes referral to the local plastics or flush-out team for a saline flush-out as soon as possible, and its text says to consult that team where relevant. Its dimethyl sulfoxide appendix says every 6 hours for 7 days while its own antidote table says every 8 hours.",
      evidence:
        "Expert consensus with no grades; the guideline describes the antidote evidence as often inconclusive. It passed its own review date in July 2019.",
      sources: ["wm-eag-2017"],
    },
    {
      name: "Japanese multidisciplinary guideline (JSCN, JSMO and JASPO, 2024)",
      differs:
        "Cold compresses weakly recommended; warm compresses alone weakly recommended against; topical steroids weakly recommended and injected steroids weakly recommended against; no recommendation on aspiration. Classifies oxaliplatin, docetaxel, paclitaxel and mitoxantrone as vesicants on its own systematic review, where the UK network list calls oxaliplatin and mitoxantrone irritants. It reports finding no clinical evidence to support sorting vesicants by DNA binding.",
      evidence: "GRADE with the Minds handbook; certainty very low (D) for most local measures and moderate (B) for dexrazoxane.",
      sources: ["jscn-jsmo-jaspo-2024"],
    },
  ],
  grades: [
    { claim: "Give dexrazoxane for anthracycline extravasation", grade: "Recommend (weak), certainty B", source: "jscn-jsmo-jaspo-2024", quote: "Administration of dexrazoxane for EV induced by an anthracycline cancer drug is weakly recommended." },
    { claim: "Use cold compresses as local therapy", grade: "Recommend (weak), certainty D", source: "jscn-jsmo-jaspo-2024", quote: "Cold compression is weakly recommended as local therapy to prevent aggravation/progression of tissue injury and inflammation induced by EV." },
    { claim: "Avoid warm compresses used alone", grade: "Not recommend (weak), certainty D", source: "jscn-jsmo-jaspo-2024", quote: "Avoidance of warm compresses (heat) is weakly recommended to prevent EV-induced skin damage and aggravation/progression of inflammation." },
    { claim: "Aspirating residual drug or blood", grade: "None, certainty D", source: "jscn-jsmo-jaspo-2024", quote: "No recommendation (no vote)." },
    { claim: "Do not inject steroids locally", grade: "Not recommend (weak), certainty D", source: "jscn-jsmo-jaspo-2024", quote: "It is weakly recommended not to inject local steroids for EV of anticancer drugs." },
    { claim: "Apply topical steroids", grade: "Recommend (weak), certainty D", source: "jscn-jsmo-jaspo-2024", quote: "Applying topical steroids for EV of anticancer drugs is weakly recommended." },
    { claim: "Do not debride an ulcer without necrosis", grade: "Not recommend (weak), certainty C", source: "jscn-jsmo-jaspo-2024", quote: "It is weakly recommended not to debride EV-induced skin ulcer lesions without necrosis." },
    { claim: "Use an antidote where one exists (taxanes are graded separately)", grade: "strong recommendation; very low certainty of evidence", source: "ons-asco-2025", quote: "ONS and ASCO recommend the use of antidotes rather than no antidotes (strong recommendation; very low certainty of evidence)." },
    { claim: "Give an antidote (hyaluronidase in the studies) after paclitaxel or docetaxel extravasation", grade: "conditional recommendation; very low certainty of evidence", source: "ons-asco-2025", quote: "In patients with extravasation of paclitaxel or docetaxel, ONS and ASCO suggest the use of antidote rather than no antidote (conditional recommendation; very low certainty of evidence)." },
    { claim: "Use a thermal compress rather than none", grade: "conditional recommendation; very low certainty of evidence", source: "ons-asco-2025", quote: "For patients with extravasation of irritant with vesicant properties or vesicant antineoplastic agents, ONS and ASCO suggest use of a thermal compress rather than no compress (conditional recommendation; very low certainty of evidence)." },
    { claim: "Repeat the compress over more than 24 hours rather than 24 hours or less", grade: "conditional recommendation; very low certainty of evidence", source: "ons-asco-2025", quote: "ONS and ASCO suggest a longer period of compress (repeated application over more than 24 hours) rather than a shorter period of compress (repeated application over 24 hours or less) (conditional recommendation; very low certainty of evidence)." },
    { claim: "Refer for surgery or escalate care after a central line extravasation", grade: "conditional recommendation; very low certainty of evidence", source: "ons-asco-2025", quote: "For patients with central line extravasation of irritant with vesicant properties or vesicant antineoplastic agents, ONS and ASCO suggest surgical referral/escalation of care in addition to conservative management rather than conservative management alone (conditional recommendation; very low certainty of evidence)." },
  ],
  sources: [
    {
      key: "ons-asco-2025",
      label: "ONS/ASCO Guideline on the Management of Antineoplastic Extravasation, Clinical Journal of Oncology Nursing 29(5):384-399",
      publisher: "Oncology Nursing Society and American Society of Clinical Oncology",
      year: 2025,
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12463152/",
      doi: "10.1188/25.CJON.384-399",
      gradingScheme: "GRADE: each recommendation is strong (\"ONS and ASCO recommend\") or conditional (\"ONS and ASCO suggest\"), printed with its certainty of evidence. All five here are on very low certainty.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "ons-voice-2025",
      label: "New Extravasation Guidelines Provide Recommendations for Protecting Patients and Standardizing Care, ONS Voice",
      publisher: "Oncology Nursing Society",
      year: 2025,
      url: "https://www.ons.org/publications-research/voice/news-views/10-2025/new-extravasation-guidelines-provide-recommendations",
      gradingScheme: "Reports the ONS/ASCO GRADE recommendations; prints a strength only for the taxane hyaluronidase recommendation and no certainty.",
      read: "public-summary",
      accessed: "2026-11-16",
    },
    {
      key: "ons-asco-algorithm-2025",
      label: "Algorithm on the Management of Antineoplastic Extravasation of Vesicant or Irritant with Vesicant Properties in Adults",
      publisher: "Oncology Nursing Society and American Society of Clinical Oncology",
      year: 2025,
      url: "https://www.ons.org/sites/default/files/2025-09/ons-asco-algorithm-on-antineoplastic-extravasation_09.2025.pdf",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "jscn-jsmo-jaspo-2024",
      label: "Extravasation associated with cancer drug therapy: multidisciplinary guideline of the Japanese Society of Cancer Nursing, Japanese Society of Medical Oncology, and Japanese Society of Pharmaceutical Oncology, ESMO Open 9:103932",
      publisher: "Japanese Society of Cancer Nursing, Japanese Society of Medical Oncology and Japanese Society of Pharmaceutical Oncology",
      year: 2024,
      url: "https://europepmc.org/article/PMC/PMC11490930",
      doi: "10.1016/j.esmoop.2024.103932",
      gradingScheme: "GRADE and Minds: strength Recommend or Not recommend, strong or weak; certainty A high, B moderate, C low, D very low.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "savene-smpc",
      label: "Savene 20 mg/ml powder and solvent for concentrate for solution for infusion: Summary of Product Characteristics",
      publisher: "European Medicines Agency",
      year: 2024,
      url: "https://www.ema.europa.eu/en/documents/product-information/savene-epar-product-information_en.pdf",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "wm-eag-2017",
      label: "Guidelines for the Management of Extravasation of a Systemic Anti-Cancer Therapy including Cytotoxic Agents, version 1",
      publisher: "West Midlands Expert Advisory Group for Systemic Anti-Cancer Therapy, NHS England",
      year: 2017,
      url: "https://www.england.nhs.uk/midlands/wp-content/uploads/sites/46/2019/05/management-extravasation-of-a-systemic-anti-cancer-therapy-including-cytotoxic-agents.pdf",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "esmo-eons-2012",
      label: "Management of chemotherapy extravasation: ESMO-EONS Clinical Practice Guidelines, Annals of Oncology 23 Suppl 7:vii167-vii173",
      publisher: "ESMO and European Oncology Nursing Society",
      year: 2012,
      url: "https://doi.org/10.1093/annonc/mds294",
      doi: "10.1093/annonc/mds294",
      read: "not-reachable",
      accessed: "2026-11-16",
    },
  ],
  upgrades: [],
  gaps: [
    "On 16 November 2026 the full text of the ONS/ASCO guideline was read on PubMed Central, where it had not been readable five days earlier, and its five graded recommendations are now quoted. The guideline's two figures are images there, so the algorithm was read from the PDF on ons.org as an image and no quotation is taken from it. The JCO Oncology Practice copy of the same guideline (2026) sits behind a bot check and was not read.",
    "ONS's own summary is not consistent on compress duration: its list of recommendations says three to four times daily over 48 to 72 hours, as the algorithm does, while its sidebar says several times a day for 24 to 48 hours. The graded recommendation itself says only more than 24 hours rather than 24 hours or less.",
    "The ESMO-EONS guideline (2012) could not be read, again on 16 November 2026: the publisher's site returned a bot check and no abstract is indexed. No step rests on it. No newer ESMO edition was found.",
    "No source that could be read recommends sodium thiosulfate for mechlorethamine (chlormethine) extravasation today. The ONS/ASCO guideline says it was previously indicated for mechlorethamine, recommends it for concentrated cisplatin and says to consider it for bendamustine; the UK network guideline lists mechlorethamine as a DNA-binding vesicant without naming an antidote.",
    "The ONS Chemotherapy and Immunotherapy Guidelines and Recommendations for Practice (2023) is a paid book and was not read.",
    "Hyaluronidase timing differs, including inside the ONS/ASCO guideline: within 2 to 4 hours in its algorithm, within 3 to 4 hours in its antidote table, and within 1 hour in the UK network guideline. None gives evidence for its window.",
    "The dimethyl sulfoxide schedule differs between every 8 hours (ONS/ASCO) and every 6 hours (the UK network guideline's appendix, which contradicts its own table). The UK network guideline describes dimethyl sulfoxide as an unlicensed option for this use.",
    "The Savene label has no data on extravasation from central venous access devices: those patients were excluded from its efficacy evaluation.",
    "The West Midlands guideline passed its review date in July 2019 and no later version was found at its address. An Irish national guideline (NCCP, 2023) could not be retrieved, again on 16 November 2026, when its address on hse.ie returned page not found. No UK or Irish guidance newer than 2017 was read.",
  ],
  drugs: [
    "dexrazoxane", "doxorubicin", "daunorubicin", "epirubicin", "idarubicin", "vincristine", "vinblastine", "vinorelbine",
    "paclitaxel", "docetaxel", "mitomycin", "mitoxantrone", "dactinomycin", "mechlorethamine", "trabectedin", "oxaliplatin",
    "etoposide", "cisplatin", "bendamustine",
    "carmustine", "dacarbazine",
  ],
  technologies: ["implanted-ports", "picc-lines"],
  terms: ["extravasation-infusion-reaction", "central-venous-access"],
  related: ["dmso-dimethyl-sulfoxide", "sodium-thiosulfate"],
});
