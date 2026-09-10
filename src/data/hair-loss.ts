/**
 * Hair loss during cancer treatment: which drugs cause it and how much, what prevents or reverses it, how
 * regrowth unfolds, and how wigs and cold caps are paid for. Side data for /live/hair/. Every id named here
 * must exist in the graph (checked by src/lib/complementary.test.ts and at build time by the page).
 *
 * Rates for individual drugs are not written here: the page reads them from each drug record's `toxicity`
 * rows, which carry their own label or trial source. Class-level statements cite NCI, ACS and Macmillan.
 * No invented numbers; where a source gives none, the text says "common", "partial" or "uncommon". UK spelling.
 */
export type Source = { label: string; url: string };

export type AlopeciaDegree = "near-universal" | "common" | "partial" | "uncommon" | "changes";
export const DEGREE_LABEL: Record<AlopeciaDegree, string> = {
  "near-universal": "Complete loss in nearly everyone",
  common: "Complete or marked loss is common",
  partial: "Thinning or partial loss",
  uncommon: "Uncommon or mild",
  changes: "Texture, colour or brow and lash changes",
};
export const DEGREE_ORDER: AlopeciaDegree[] = ["near-universal", "common", "partial", "uncommon", "changes"];

export type HairLossCause = {
  id: string;
  group: string;
  degree: AlopeciaDegree;
  /** Drug ids in the corpus. */
  drugIds: string[];
  /** Technology ids in the corpus (radiotherapy techniques). */
  technologyIds?: string[];
  /** Plain sentence on pattern and timing. */
  note: string;
  /** Whether loss can be permanent, and with what. */
  persistent?: string;
  /** What helps for this class, in one line. */
  helps: string;
  source: Source;
};

const NCI_HAIR: Source = { label: "NCI: hair loss (alopecia) and cancer treatment", url: "https://www.cancer.gov/about-cancer/treatment/side-effects/hair-loss" };
const ACS_HAIR: Source = { label: "American Cancer Society: hair loss", url: "https://www.cancer.org/cancer/managing-cancer/side-effects/hair-skin-nails/hair-loss.html" };
const MACMILLAN_HAIR: Source = { label: "Macmillan Cancer Support: hair loss", url: "https://www.macmillan.org.uk/cancer-information-and-support/impacts-of-cancer/hair-loss" };
const NHS_WIGS: Source = { label: "NHS: wigs and fabric supports on the NHS", url: "https://www.nhs.uk/nhs-services/help-with-health-costs/wigs-and-fabric-supports-on-the-nhs/" };
const JAAD_2019: Source = { label: "Hair disorders in cancer survivors (J Am Acad Dermatol 2019)", url: "https://doi.org/10.1016/j.jaad.2018.03.056" };
const SCALP_JAMA: Source = { label: "SCALP randomised trial of scalp cooling (JAMA 2017)", url: "https://doi.org/10.1001/jama.2016.20939" };
const DIGNICAP_JAMA: Source = { label: "DigniCap cohort study (JAMA 2017)", url: "https://doi.org/10.1001/jama.2016.21038" };
const ETIA_2018: Source = { label: "Endocrine therapy-induced alopecia in breast cancer (JAMA Dermatol 2018)", url: "https://doi.org/10.1001/jamadermatol.2018.0454" };
const BIMATOPROST_RCT: Source = { label: "Bimatoprost for chemotherapy-induced eyelash hypotrichosis, randomised trial (Br J Dermatol 2015)", url: "https://doi.org/10.1111/bjd.13443" };

export const HAIR_LOSS_CAUSES: HairLossCause[] = [
  { id: "anthracyclines", group: "Anthracyclines", degree: "near-universal", drugIds: ["doxorubicin"],
    note: "Doxorubicin and epirubicin, alone or in AC, EC and FEC regimens, cause complete hair loss in almost everyone, starting two to three weeks after the first dose. Pegylated liposomal doxorubicin causes much less.",
    helps: "Scalp cooling works less well with anthracyclines than with taxanes alone; wigs and coverings; regrowth is expected.", source: NCI_HAIR },
  { id: "liposomal-anthracycline", group: "Liposomal anthracycline", degree: "partial", drugIds: ["pegylated-liposomal-doxorubicin"],
    note: "The liposome changes how the drug is distributed, so hair loss is usually mild or partial rather than complete, at the price of hand-foot skin reaction.",
    helps: "Usually needs no specific measure; a shorter style disguises thinning.", source: NCI_HAIR },
  { id: "taxanes", group: "Taxanes", degree: "near-universal", drugIds: ["paclitaxel", "docetaxel", "cabazitaxel"],
    note: "Paclitaxel, docetaxel and cabazitaxel cause complete loss of scalp hair and often body hair, brows and lashes within a few weeks of starting.",
    persistent: "Docetaxel is the drug most often linked to persistent (permanent) chemotherapy-induced alopecia, usually diffuse thinning rather than baldness.",
    helps: "Scalp cooling has its best results with taxane-only regimens (about half of women preserved most hair in SCALP); minoxidil for persistent thinning.", source: SCALP_JAMA },
  { id: "alkylators", group: "Alkylating agents", degree: "common", drugIds: ["cyclophosphamide", "ifosfamide", "melphalan"],
    note: "Cyclophosphamide and ifosfamide cause marked loss at standard doses and complete loss at high dose; high-dose melphalan before stem cell transplant causes complete loss.",
    persistent: "High-dose busulfan and cyclophosphamide conditioning for transplant can cause permanent thinning.",
    helps: "Scalp cooling is not used in blood cancers; wigs and coverings; dermatology review if hair has not returned a year on.", source: NCI_HAIR },
  { id: "topoisomerase-vinca", group: "Topoisomerase inhibitors and vinca alkaloids", degree: "common", drugIds: ["etoposide", "platinum-etoposide", "irinotecan", "folfiri", "topotecan", "eribulin", "vincristine", "vinblastine", "vinorelbine"],
    note: "Etoposide, irinotecan, topotecan and eribulin commonly cause marked hair loss; vincristine, vinblastine and vinorelbine more often cause thinning.",
    helps: "Scalp cooling can be offered for solid-tumour regimens; regrowth is expected.", source: NCI_HAIR },
  { id: "antimetabolites-platinum", group: "Antimetabolites and platinum drugs", degree: "uncommon", drugIds: ["fluorouracil", "gemcitabine", "methotrexate", "cisplatin", "carboplatin", "oxaliplatin", "temozolomide", "bendamustine"],
    note: "Fluorouracil, gemcitabine, methotrexate, the platinum drugs, temozolomide and bendamustine given alone cause mild thinning at most; in combination with a taxane or anthracycline the partner drug sets the risk.",
    helps: "Usually no measure needed; check the combination.", source: NCI_HAIR },
  { id: "adcs", group: "Antibody-drug conjugates", degree: "common", drugIds: ["trastuzumab-deruxtecan", "sacituzumab-govitecan", "datopotamab-deruxtecan", "enfortumab-vedotin", "tisotumab-vedotin"],
    note: "Conjugates carrying topoisomerase or microtubule payloads cause hair loss in a third to a half of patients in their pivotal trials (rates below are read from each label). Trastuzumab emtansine and brentuximab vedotin cause it uncommonly.",
    helps: "Scalp cooling is being used off-protocol with these regimens; no trial yet reports preservation rates.", source: NCI_HAIR },
  { id: "adcs-low", group: "Antibody-drug conjugates with lower rates", degree: "uncommon", drugIds: ["trastuzumab-emtansine", "brentuximab-vedotin"],
    note: "Alopecia appears in the labels of trastuzumab emtansine and brentuximab vedotin at low rates.",
    helps: "Usually no measure needed.", source: NCI_HAIR },
  { id: "endocrine", group: "Endocrine therapy", degree: "partial", drugIds: ["tamoxifen", "letrozole", "exemestane", "fulvestrant", "goserelin", "leuprolide"],
    note: "Tamoxifen, aromatase inhibitors and ovarian suppression cause gradual thinning in a pattern like female or male pattern hair loss over months to years, not sudden shedding.",
    persistent: "Thinning persists while treatment continues and usually improves after it stops; stopping endocrine therapy early to protect hair raises recurrence risk and should be discussed, never done alone.",
    helps: "Topical or low-dose oral minoxidil improved hair in most treated patients in a dermatology series; spironolactone is sometimes added in women.", source: ETIA_2018 },
  { id: "cdk46", group: "CDK4/6 inhibitors", degree: "partial", drugIds: ["palbociclib", "ribociclib", "abemaciclib"],
    note: "About a third of women on palbociclib with letrozole reported hair thinning in the label; ribociclib and abemaciclib are similar. It is thinning, not baldness, and continues through treatment.",
    helps: "Minoxidil; the drugs are taken for years so cooling is not relevant.", source: ETIA_2018 },
  { id: "hedgehog", group: "Hedgehog pathway inhibitors", degree: "common", drugIds: ["vismodegib", "sonidegib"],
    note: "Vismodegib and sonidegib cause hair loss in more than half of patients, alongside muscle cramps and taste loss, because the hedgehog pathway maintains the hair cycle.",
    persistent: "Regrowth after stopping can be slow and incomplete.",
    helps: "Treatment breaks and minoxidil are used; discuss with the prescriber.", source: NCI_HAIR },
  { id: "kinase-inhibitors", group: "Kinase inhibitors", degree: "partial", drugIds: ["sorafenib", "cabozantinib", "regorafenib", "ripretinib", "pemigatinib", "futibatinib"],
    note: "Multikinase inhibitors such as sorafenib, cabozantinib, regorafenib and ripretinib, and FGFR inhibitors, commonly cause thinning; hair may also become curlier or lighter.",
    helps: "Usually tolerable; minoxidil if distressing.", source: JAAD_2019 },
  { id: "egfr-inhibitors", group: "EGFR inhibitors", degree: "changes", drugIds: ["erlotinib", "osimertinib"],
    note: "Erlotinib and osimertinib rarely cause loss but make scalp hair brittle and curly, lengthen eyelashes (trichomegaly) and can inflame the scalp.",
    helps: "Lash trimming by an optician if lashes irritate the eye; scalp care for folliculitis.", source: JAAD_2019 },
  { id: "immunotherapy", group: "Checkpoint immunotherapy", degree: "changes", drugIds: ["pembrolizumab", "nivolumab", "ipilimumab"],
    note: "Checkpoint inhibitors do not cause typical chemotherapy hair loss; a small minority develop patchy alopecia areata, hair whitening or vitiligo-type changes as immune side effects.",
    helps: "Dermatology referral; these changes often accompany a good tumour response.", source: JAAD_2019 },
  { id: "radiotherapy", group: "Radiotherapy to the head", degree: "common", drugIds: [], technologyIds: ["imrt-igrt", "proton-therapy"],
    note: "Hair is lost only where the beam enters or leaves, starting two to three weeks into treatment. Whole-brain radiotherapy affects the whole scalp; focused treatment affects a patch.",
    persistent: "Regrowth depends on dose: after lower doses hair returns within months, after higher doses it can be thinner or permanent.",
    helps: "Scalp-sparing intensity-modulated or proton plans lower the dose to hair follicles where the tumour allows; ask the radiotherapy team what the plan does to the scalp.", source: NCI_HAIR },
];

export type HairProblem = {
  id: string;
  title: string;
  /** The problem, one or two plain sentences. */
  problem: string;
  /** Why it happens. */
  mechanism: string;
  /** What works now, one line each. */
  worksNow: string[];
  /** What is being tried, one line each; only things with a registered trial, a published study or a live programme. */
  inProgress: string[];
  /** Entity ids to link (validated). */
  entityIds: string[];
  sources: Source[];
};

export const HAIR_PROBLEMS: HairProblem[] = [
  { id: "prevention", title: "Hair falls out with taxane or anthracycline chemotherapy",
    problem: "Nearly everyone treated with docetaxel, paclitaxel, doxorubicin or epirubicin loses their scalp hair within a few weeks, and many rank it among the worst parts of treatment.",
    mechanism: "Hair matrix cells divide faster than almost any other cell, so drugs that kill dividing cells stop the follicle mid-growth and the shaft breaks off. Cooling the scalp narrows its vessels while the drug is at peak concentration, so far less reaches the follicle.",
    worksNow: [
      "Scalp cooling with a machine-cooled cap (DigniCap, Paxman) or manual gel caps: about half of women on taxane regimens kept most of their hair in the SCALP randomised trial; results are weaker with anthracycline-containing regimens.",
      "Ask which regimen you will have: taxane-only regimens (weekly paclitaxel, docetaxel-cyclophosphamide) respond best; AC or EC followed by a taxane less so; blood cancers are not cooled.",
      "Book the cap for the first cycle; cooling started after hair has begun to shed is less effective.",
      "A wig or covering fitted before the first cycle allows colour matching while hair is still there.",
    ],
    inProgress: [
      "Trials combining scalp cooling with topical agents applied to the scalp, and of cooling with newer antibody-drug conjugate regimens, are collecting preservation rates.",
      "Charities and some health systems are funding machines in more units; OnCo's idea record tracks the case for routine coverage.",
    ],
    entityIds: ["scalp-cooling", "paper-scalp-trial-jama-2017", "wigs-cranial-prosthesis", "idea-moon-hair-preservation-for-all", "docetaxel", "paclitaxel", "doxorubicin"],
    sources: [SCALP_JAMA, DIGNICAP_JAMA] },

  { id: "persistent", title: "Hair has not come back a year after chemotherapy",
    problem: "In a minority of people, most often after docetaxel or high-dose conditioning for transplant, hair regrows thin and never recovers its former density.",
    mechanism: "The stem cells that regenerate the follicle are usually spared, which is why hair returns; when they are damaged, follicles miniaturise and produce fine, sparse hair, resembling pattern hair loss.",
    worksNow: [
      "Dermatology review to exclude other causes that are easy to treat (iron deficiency, thyroid disease, telogen effluvium from illness).",
      "Topical minoxidil 5 percent or low-dose oral minoxidil, the standard treatments for pattern hair loss, produced improvement in most treated patients in cancer-survivor series; a small randomised trial showed faster regrowth after chemotherapy.",
      "Camouflage: hair fibres, scalp micropigmentation, partial hairpieces and toppers.",
    ],
    inProgress: [
      "Low-dose oral minoxidil is being studied prospectively in persistent chemotherapy-induced alopecia at dermatology-oncology clinics.",
      "Scalp cooling itself appears to reduce the risk of persistent alopecia, a secondary finding under evaluation in cooling cohorts.",
    ],
    entityIds: ["minoxidil-chemotherapy-alopecia", "docetaxel", "scalp-cooling", "late-effects"],
    sources: [JAAD_2019] },

  { id: "endocrine", title: "Thinning on tamoxifen, aromatase inhibitors or CDK4/6 inhibitors",
    problem: "Years of endocrine therapy, and the CDK4/6 inhibitors given with it, cause gradual thinning at the parting and crown that is easy to dismiss but affects adherence.",
    mechanism: "Lowering oestrogen shifts the balance toward androgen effects on the follicle, shortening the growth phase in the same pattern as female pattern hair loss; CDK4/6 inhibition slows matrix cell cycling directly.",
    worksNow: [
      "Topical minoxidil produced moderate or significant improvement in about 80 percent of treated patients with endocrine-therapy-induced alopecia in the largest reported series; low-dose oral minoxidil is an alternative when lotion is impractical.",
      "Spironolactone is sometimes added for women; it is not used in men and needs a prescriber who knows the cancer history.",
      "Do not stop endocrine therapy for hair without a conversation: five to ten years of treatment halves recurrence. Switching between tamoxifen and an aromatase inhibitor sometimes helps.",
    ],
    inProgress: [
      "Prospective studies of minoxidil started at the same time as endocrine therapy, rather than after thinning is established, are under way in survivorship clinics.",
    ],
    entityIds: ["minoxidil-chemotherapy-alopecia", "endocrine-therapy", "aromatase-inhibitor", "tamoxifen", "letrozole", "exemestane", "palbociclib", "ribociclib", "abemaciclib"],
    sources: [ETIA_2018] },

  { id: "brows-lashes", title: "Eyebrows and eyelashes",
    problem: "Brows and lashes often fall out later than scalp hair and are missed more, because they frame the face and protect the eyes from dust and sweat.",
    mechanism: "Brow and lash follicles cycle more slowly than scalp hair, so they are hit later and regrow later; regrowth usually follows within a few months of the last dose.",
    worksNow: [
      "Bimatoprost 0.03 percent applied nightly along the upper lash line increased lash length and thickness in a randomised trial that included people after chemotherapy; it is a prescription and rarely reimbursed.",
      "Brow pencils, powders and stencils; Look Good Feel Better workshops teach the techniques free.",
      "Wraparound glasses outdoors and preservative-free eye drops protect the eyes while lashes are absent.",
      "Microblading or tattooing is best deferred until blood counts have recovered and with a practitioner who knows the history, because of infection risk.",
    ],
    inProgress: [
      "Off-label bimatoprost for eyebrows is used widely; controlled data are limited to lashes.",
    ],
    entityIds: ["bimatoprost-eyelash-regrowth", "wigs-cranial-prosthesis"],
    sources: [BIMATOPROST_RCT, ACS_HAIR] },

  { id: "radiotherapy", title: "Radiotherapy to the head",
    problem: "Radiotherapy causes hair loss only where the beam passes through the scalp, but after high doses the follicles in that patch may not recover.",
    mechanism: "Ionising radiation damages the dividing matrix and, at higher cumulative doses, the follicle stem cells; below that threshold hair returns in months, above it the loss can be permanent.",
    worksNow: [
      "Ask what the plan does to the scalp: intensity-modulated and proton plans can reduce scalp dose where the tumour position allows.",
      "Gentle scalp care during treatment (no heat styling, mild shampoo) reduces irritation in the treated skin.",
      "Wigs and coverings; partial hairpieces suit a patch of loss.",
    ],
    inProgress: [
      "Scalp-sparing planning techniques for whole-brain and glioma radiotherapy have been reported in small series and are being adopted where they do not compromise tumour coverage.",
    ],
    entityIds: ["imrt-igrt", "proton-therapy"],
    sources: [NCI_HAIR] },

  { id: "cost", title: "Scalp cooling is offered but you have to pay, or is not offered at all",
    problem: "Availability depends on the unit and the payer. Machines cost money and chair time; in the US patients are often charged per cycle, and in the UK provision varies between hospitals.",
    mechanism: "Cooling adds one to two hours to each chemotherapy visit and needs a machine or freezer capacity, which units must fund or find a charity to fund; reimbursement codes exist in the US but coverage is inconsistent.",
    worksNow: [
      "UK: ask the chemotherapy unit whether it has Paxman or DigniCap machines; many were funded by Walk the Walk, and Macmillan and Cancer Hair Care advise on local access.",
      "US: HairToStay subsidises the cost of scalp cooling for people on lower incomes; the Rapunzel Project helps infusion centres install biomedical freezers for manual caps and lists centres that have them.",
      "Manual gel caps can be rented and used with dry ice where no machine exists; they need a helper to change caps every 20 to 30 minutes.",
    ],
    inProgress: [
      "Making cooling routine and funded for every alopecia-inducing regimen is an open idea on OnCo with the case and the barriers set out.",
    ],
    entityIds: ["scalp-cooling", "idea-moon-hair-preservation-for-all", "macmillan-cancer-support"],
    sources: [MACMILLAN_HAIR] },

  { id: "appearance", title: "The distress of looking ill",
    problem: "Hair loss makes cancer visible to everyone, including children and colleagues, before the person is ready to tell them.",
    mechanism: "Body image and control over disclosure are the components of distress that appearance programmes and psychological support target; the hair itself is not the whole problem.",
    worksNow: [
      "A wig on NHS prescription (free in Scotland, Wales and Northern Ireland; a charge in England unless exempt) or by 'cranial prosthesis' prescription in the US; free wigs from the American Cancer Society and local wig banks.",
      "Look Good Feel Better (UK, US and other countries) runs free skincare and make-up workshops for people in treatment.",
      "Psycho-oncology and peer support groups help with the fear and the conversations; CBT-based programmes for body image have randomised support.",
    ],
    inProgress: [
      "Trials of appearance-focused psychological programmes delivered online are collecting body-image outcomes.",
    ],
    entityIds: ["wigs-cranial-prosthesis", "psycho-oncology", "peer-support-groups", "macmillan-cancer-support"],
    sources: [NHS_WIGS, MACMILLAN_HAIR] },
];

export type RegrowthStep = { when: string; what: string; source: Source };
export const REGROWTH_TIMELINE: RegrowthStep[] = [
  { when: "2 to 4 weeks after the first dose", what: "Shedding starts, often suddenly, with tenderness of the scalp; many people cut hair short beforehand so the change is less abrupt.", source: ACS_HAIR },
  { when: "During treatment", what: "Scalp hair is absent or sparse; brows, lashes and body hair follow later. The scalp needs sun protection and a soft covering against cold.", source: MACMILLAN_HAIR },
  { when: "A few weeks to 3 months after the last dose", what: "Fine, soft new growth appears. It is often a different texture or colour at first ('chemo curls'); this usually settles over the following year.", source: ACS_HAIR },
  { when: "6 to 12 months", what: "Hair is generally long enough to style. Colouring and perming are best left until the new hair is a few centimetres long and the scalp is no longer sensitive, with a patch test first.", source: MACMILLAN_HAIR },
  { when: "A year or more", what: "If density has not recovered, see a dermatologist: persistent chemotherapy-induced alopecia is treatable and other causes should be excluded.", source: JAAD_2019 },
  { when: "Radiotherapy", what: "Loss is limited to the treated area and begins two to three weeks in; regrowth depends on the dose and may be incomplete after high doses.", source: NCI_HAIR },
];

export type WigRow = { label: string; detail: string; url: string };
export const WIG_PROVISION: Array<{ region: "UK" | "US" | "Global"; title: string; rows: WigRow[] }> = [
  { region: "UK", title: "United Kingdom", rows: [
    { label: "NHS wig prescription", detail: "Hospitals supply synthetic and some human-hair wigs on prescription. In England there is a charge per wig unless you are exempt (under 16, under 19 in full-time education, on qualifying benefits, or holding an HC2 certificate); wigs are free in Scotland, Wales and Northern Ireland.", url: NHS_WIGS.url },
    { label: "Macmillan Cancer Support", detail: "Information on hair loss, scalp cooling and wig fitting, and grants for people in financial hardship that can be used for a wig.", url: MACMILLAN_HAIR.url },
    { label: "Cancer Hair Care", detail: "UK charity offering free advice, a helpline and wig and scarf fitting guidance for people with treatment-related hair loss.", url: "https://www.cancerhaircare.co.uk/" },
    { label: "Little Princess Trust", detail: "Free real-hair wigs for children and young people up to 24 who have lost hair through cancer treatment.", url: "https://www.littleprincesses.org.uk/" },
    { label: "Look Good Feel Better UK", detail: "Free skincare and make-up workshops, including drawing brows and tying scarves.", url: "https://www.lookgoodfeelbetter.co.uk/" },
  ] },
  { region: "US", title: "United States", rows: [
    { label: "'Cranial prosthesis' prescription", detail: "Ask the oncologist for a prescription that says 'cranial prosthesis' (not 'wig') with the diagnosis code for drug-induced alopecia; many private insurers reimburse part or all of the cost when billed this way. Medicare does not cover wigs.", url: ACS_HAIR.url },
    { label: "American Cancer Society", detail: "Free wigs through local programmes and the TLC catalogue of wigs, hats and scarves at low cost.", url: ACS_HAIR.url },
    { label: "Look Good Feel Better", detail: "Free workshops on skincare, make-up and head coverings for people in treatment.", url: "https://lookgoodfeelbetter.org/" },
    { label: "HairToStay", detail: "Charity that subsidises the cost of scalp cooling for patients who cannot afford it.", url: "https://hairtostay.org/" },
    { label: "The Rapunzel Project", detail: "Charity that helps infusion centres install freezers for manual cold caps and lists centres with cooling available.", url: "https://rapunzelproject.org/" },
  ] },
  { region: "Global", title: "Everywhere", rows: [
    { label: "Ask before the first cycle", detail: "Wig fitting, cap booking and photographs for colour matching are all easier while you still have hair.", url: MACMILLAN_HAIR.url },
    { label: "Synthetic versus human hair", detail: "Synthetic wigs are lighter, cheaper and hold their style; human-hair wigs look most natural, cost more and need styling. A soft cotton or bamboo liner protects a tender scalp.", url: ACS_HAIR.url },
  ] },
];
