import type { EntityInput, InstitutionInput, PaperInput, TrialInput } from "@/lib/schema";

/**
 * Sweden: the institutions, companies, trials and papers behind /countries/se/ that the corpus did not hold.
 * People are in src/data/people/country-se.ts. Every record carries its sources; DOIs were resolved through
 * Crossref and PubMed before use (Europe PMC returned 503 on 3 November 2026), and the numbers in `findings` were
 * read from the PubMed abstract, not from a summary of it.
 *
 * The Swedish public bodies were read in Swedish on their own sites: Socialstyrelsen (the cancer register and its
 * statistics), Regionala cancercentrum i samverkan, TLV, Samverkan läkemedel (the NT council) and Cancerfonden.
 */
const asOf = "2026-11-03";
const inst = (x: Omit<InstitutionInput, "kind" | "asOf">): InstitutionInput => ({ kind: "institution", asOf, ...x });
const paper = (x: Omit<PaperInput, "kind" | "asOf">): PaperInput => ({ kind: "paper", asOf, ...x });
const trial = (x: Omit<TrialInput, "kind" | "asOf">): TrialInput => ({ kind: "trial", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

export const recordsSE: EntityInput[] = [
  // ---------------------------------------------------------------- Registry, cancer centres, payers, charity
  inst({
    id: "swedish-cancer-register",
    name: "Swedish Cancer Register (Cancerregistret, Socialstyrelsen)",
    aka: ["Cancerregistret", "Swedish Cancer Registry", "Socialstyrelsens cancerregister", "National Board of Health and Welfare cancer register"],
    city: "Stockholm", country: "SE", lat: 59.334, lng: 18.056, institutionType: "government",
    website: "https://www.socialstyrelsen.se/statistik-och-data/register/cancerregistret/",
    tldr: "Sweden's national count of cancer, kept by the National Board of Health and Welfare since 1958. Every new tumour has to be reported by law, usually twice, by the clinic and by the pathology laboratory, and about 80,000 are reported each year.",
    summary: "The Swedish Cancer Register is one of Socialstyrelsen's health data registers and has compiled diagnosed tumours since 1958. Reporting is a legal duty on everyone who provides health care, set out in the Act on Health Data Registers (1998:543), the ordinance on the cancer register (2001:709) and Socialstyrelsen's regulations HSLF-FS 2016:7. Where a diagnosis is made both clinically and morphologically, both units report, to one of the six regional cancer centres, which code and check the notifications before passing them on; the register is updated once a year. Socialstyrelsen states that about 80,000 malignant tumours are reported each year and that about 99 per cent of tumour records are morphologically confirmed. Basal cell carcinoma has been kept in a separate register since 2004, at about 50,000 people a year.\n\nIts headline for 2024, published on 4 November 2025: 80,764 malignant tumours in 73,861 people, 34,996 women and 38,865 men, with 11,372 women and 12,142 men dying of cancer the same year according to the cause of death register. Breast cancer was the commonest diagnosis in women (8,803) and prostate cancer in men (10,782).\n\nThe register's own quality report names its weak point plainly. Unlike most other national registers, including the other Nordic ones, Sweden has never followed up cancers that appear on a death certificate without a registration, so tumours diagnosed by imaging alone in older people, typically in the pancreas and lung, can be missing. Socialstyrelsen estimated the shortfall by linking the cause of death and patient registers: 3,958 cases a year on average over 2005 to 2022, 6.4 per cent of registered cases, falling to 4.8 per cent in 2014 to 2022 from 8.0 per cent in 2005 to 2013, and 12.3 per cent among people diagnosed at 80 or older against 2.7 per cent below 80. It notes that introducing systematic follow-up would probably need a change in the law.",
    programs: ["National cancer notification since 1958", "Statistik om nyupptäckta cancerfall (annual statistics)", "Basal cell carcinoma register (since 2004)", "Cancer i siffror (with Cancerfonden)"],
    institutions: ["rcc-i-samverkan", "cancerfonden"],
    people: ["mats-lambe"],
    sections: ["prevention", "early-detection"], terms: ["real-world-evidence"], bottlenecks: ["b-data-silos"],
    links: [
      { label: "Socialstyrelsen: Cancerregistret", url: "https://www.socialstyrelsen.se/statistik-och-data/register/cancerregistret/" },
      { label: "Statistik om nyupptäckta cancerfall 2024 (Socialstyrelsen, 2025, PDF)", url: "https://www.socialstyrelsen.se/contentassets/06ca5be116fc41f7a0326ef92a0715f1/2025-11-9874.pdf" },
      { label: "Cancerregistrets framställning och kvalitet", url: "https://www.socialstyrelsen.se/statistik-och-data/register/cancerregistret/framstallning-och-kvalitet/" },
      { label: "Bortfall i svenska cancerregistret, 2005-2022 (Socialstyrelsen, 2024, PDF)", url: "https://www.socialstyrelsen.se/contentassets/24aca3770af044db957f4ee2af50172a/2024-4-9040.pdf" },
    ],
  }),

  inst({
    id: "rcc-i-samverkan",
    name: "Regional Cancer Centres in Collaboration (RCC i samverkan)",
    aka: ["Regionala cancercentrum i samverkan", "RCC i samverkan", "Regionala cancercentrum", "Regional Cancer Centres Sweden", "cancercentrum.se"],
    city: "Sweden (six regional centres)", country: "SE", lat: 59.334, lng: 18.063, institutionType: "consortium",
    website: "https://cancercentrum.se/",
    tldr: "The six regional cancer centres that run Sweden's shared cancer machinery: the national care pathways with their waiting-time targets, the national clinical guidelines, the national quality registers, the coding of the cancer register, and the organised screening and testing programmes.",
    summary: "Regionala cancercentrum i samverkan is the collaboration of Sweden's six regional cancer centres, RCC Norr, Mellansverige, Stockholm Gotland, Väst, Sydöst and Syd, one for each health-care region. They are what makes Sweden's regionally run cancer care behave as one system.\n\nThey run the standardised care pathways (standardiserade vårdförlopp, SVF), started by the government and the regions in 2015, which define the investigations for a suspected cancer and a maximum time from well-founded suspicion to the start of first treatment. RCC's annual report for 2025 records 148,441 completed pathways and sets them against two national goals: that 70 per cent of new cancers in the diagnoses that have a pathway go through it, a goal the report measures for 27 pathways and 16 met, and that 80 per cent of patients in a pathway start treatment within its lead time. In 2025, 47 per cent did, up from 45 per cent in 2024; by treatment, 46 per cent for surgery, 35 per cent for radiotherapy and 50 per cent for drugs, and only acute leukaemia met the 80 per cent goal.\n\nThe centres also code and quality-check notifications to the national cancer register, host the national quality registers on the INCA platform, publish the national care programmes (vårdprogram) in Kunskapsbanken, and support the regions' screening and testing: the bowel screening programme for everyone aged 60 to 74, cervical screening with HPV self-sampling, the pilot lung screening studies, and organised prostate cancer testing (OPT), which began in two regions in 2020 and which Socialstyrelsen distinguishes from screening.",
    programs: ["Standardised care pathways (SVF)", "National care programmes (Kunskapsbanken)", "National quality registers (INCA platform)", "Cancer register coding", "Organised prostate cancer testing (OPT)", "Bowel screening support", "Cervical screening and HPV self-sampling"],
    institutions: ["swedish-cancer-register"],
    sections: ["early-detection", "prevention"], bottlenecks: ["b-early-detection"],
    links: [
      { label: "RCC: standardiserade vårdförlopp", url: "https://cancercentrum.se/diagnosbehandling/vardforloppsvf.11933.html" },
      { label: "RCC: SVF annual report 2025 (Bilaga 1, 27 March 2026, PDF)", url: "https://cancercentrum.se/download/18.7c07b08019d24db18e31c22a/1774867469204/%C3%85rsapport%20%C3%B6verenskommelse%202025%20J%C3%A4mlik%20och%20effektiv%20cancerv%C3%A5rd%20med%20kortare%20v%C3%A4ntetider_bilaga%201%20SVF.pdf" },
      { label: "RCC: national quality registers", url: "https://cancercentrum.se/utvecklingsarbeteutbildning/statistikrapporter/statistik/kvalitetsregister.8592.html" },
      { label: "RCC: organised prostate cancer testing", url: "https://cancercentrum.se/preventiontidigupptackt/screeningochtestning/prostatacancertestning.678.html" },
      { label: "RCC: screening och testning (overview, including HPV self-sampling)", url: "https://cancercentrum.se/preventiontidigupptackt/screeningochtestning.8829.html" },
      { label: "RCC: screening for bowel cancer, ages 60 to 74", url: "https://cancercentrum.se/preventiontidigupptackt/screeningochtestning/screeningtjockochandtarmscancer.679.html" },
      { label: "RCC: pilot studies of lung cancer screening", url: "https://cancercentrum.se/preventiontidigupptackt/screeningochtestning/lungcancerscreening.683.html" },
    ],
  }),

  inst({
    id: "tlv-sweden",
    name: "Dental and Pharmaceutical Benefits Agency (TLV)",
    aka: ["TLV", "Tandvårds- och läkemedelsförmånsverket", "Nämnden för läkemedelsförmåner"],
    city: "Stockholm", country: "SE", lat: 59.331, lng: 18.040, institutionType: "government",
    website: "https://www.tlv.se/",
    tldr: "The Swedish state agency that decides which prescription medicines are subsidised and at what price, and that writes the health-economic assessments the regions use for cancer drugs given in hospital. It pays more for a treatment the more severe the disease.",
    summary: "Tandvårds- och läkemedelsförmånsverket decides, through its expert board Nämnden för läkemedelsförmåner, whether a medicine enters the pharmaceutical benefits, the scheme that caps what a patient pays at the pharmacy, and at what price. The company must apply and must show the medicine meets the law (2002:160); the ordinance (2002:687) requires a decision within 180 days of a complete application.\n\nTLV's assessments rest on the ethical platform Sweden's parliament set for health-care priorities: human dignity, need and solidarity, and cost-effectiveness. Severity is graded on a four-step scale, low, moderate, high and very high, and the agency states that the more severe the condition, the higher the cost per quality-adjusted life year it is reasonable to pay; for particularly rare conditions of very high severity it may accept more. It publishes no fixed threshold, so the figures appear case by case: for erdafitinib in previously treated urothelial cancer, a condition TLV graded very high in severity, it estimated about 950,000 kronor per QALY against vinflunine and judged most of its sensitivity analyses below what it normally accepts at that severity.\n\nFor drugs given in hospital, which the regions buy rather than the pharmacy benefit, TLV produces health-economic assessments on request from the regions' NT council and takes no decision itself. Where regions and a company agree, TLV hosts three-party talks that can end in a side agreement under which the company repays part of the cost to the state and the regions. TLV also works in the Joint Nordic HTA-Bodies, begun as FINOSE with Finland and Norway in 2018, and in the EU joint clinical assessments under Regulation 2021/2282, which began on 12 January 2025 with cancer medicines and advanced therapies; the health-economic judgement stays national.",
    programs: ["Pharmaceutical benefits decisions", "Health-economic assessments of hospital drugs for the regions", "Three-party talks and side agreements", "Joint Nordic HTA-Bodies (JNHB)", "EU HTA Regulation joint clinical assessments"],
    institutions: ["nt-radet"],
    bottlenecks: ["b-drug-pricing"],
    links: [
      { label: "TLV: hälsoekonomi (severity scale and the ethical platform)", url: "https://www.tlv.se/lakemedelsforetag/halsoekonomi.html" },
      { label: "TLV: trepartsöverläggningar", url: "https://www.tlv.se/lakemedelsforetag/trepartsoverlaggningar-mellan-foretag-och-regionerna.html" },
      { label: "Förordning (2002:687) om läkemedelsförmåner, section 9 (180 days)", url: "https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/forordning-2002687-om-lakemedelsformaner-mm_sfs-2002-687/" },
      { label: "TLV: hälsoekonomiska bedömningar av klinikläkemedel (on request from the NT council)", url: "https://www.tlv.se/lakemedelsforetag/halsoekonomiska-bedomningar-och-rapporter-kliniklakemedel.html" },
      { label: "TLV: nordiskt samarbete, FINOSE and JNHB", url: "https://www.tlv.se/lakemedelsforetag/nordiskt-samarbete---finose-jnhb.html" },
      { label: "TLV: HTA-förordningen (applied from 12 January 2025)", url: "https://www.tlv.se/lakemedelsforetag/hta-forordningen.html" },
      { label: "TLV decision basis, Balversa (erdafitinib), Dnr 3644/2024 (PDF)", url: "https://www.tlv.se/download/18.1a66d8be196f12a54922e940/1748270301976/bes250522_balversa_3644-2024_underlag.pdf" },
    ],
  }),

  inst({
    id: "nt-radet",
    name: "NT Council (Rådet för nya terapier)",
    aka: ["NT-rådet", "Rådet för nya terapier", "New Therapies Council", "Nationellt ordnat införande", "Samverkan läkemedel"],
    city: "Sweden (all 21 regions)", country: "SE", lat: 59.335, lng: 18.068, institutionType: "consortium",
    website: "https://samverkanlakemedel.se/organisation---ordnat-inforande/nt-radet",
    tldr: "The expert council of Sweden's regions that recommends, on behalf of all of them, whether new hospital-given medicines such as most cancer infusions should be used, so that a patient's access does not depend on where they live.",
    summary: "Rådet för nya terapier is an expert group with a member from each health-care region, a chair, experts in health economics and medical ethics, and co-opted members with expertise in oncology, paediatrics, law and communication, plus two patient advisers. It decides whether a new medicine, or a new indication, goes into the national process of ordered introduction (nationellt ordnat införande) or is left to each region; most of these are clinic medicines, the drugs given by health-care staff, which the regions pay for directly.\n\nWhen a medicine goes into the national process, the council orders a health-economic assessment from TLV, decides what willingness to pay exists, and can send the regions' joint negotiating function to the company to reach an agreement that makes the treatment cost-effective; then it issues a recommendation to every region. It states openly that it sometimes has to say no when the price is very high, because the money would otherwise come from care for patients with equal or greater need. Treatment councils can judge individual cases against a recommendation. The regions report more than 140 jointly negotiated agreements covering prescription and hospital medicines, and say almost all of them are needed for the medicines to be judged cost-effective.",
    programs: ["National ordered introduction of new medicines", "Recommendations to all regions", "Joint price negotiation with companies", "Follow-up of use"],
    institutions: ["tlv-sweden"],
    bottlenecks: ["b-drug-pricing"],
    links: [
      { label: "Samverkan läkemedel: NT-rådet", url: "https://samverkanlakemedel.se/organisation---ordnat-inforande/nt-radet" },
      { label: "Samverkan läkemedel: for patients and the public", url: "https://samverkanlakemedel.se/process---ordnat-inforande/for-patienter-och-allmanhet" },
      { label: "Four new medicines in the high-cost protection after three-party talks (1 September 2026)", url: "https://samverkanlakemedel.se/lakemedel---ordnat-inforande/nyheter/nyheter/2026-09-01-fyra-nya-lakemedel-i-hogkostnadsskyddet-tack-vare-trepartsoverlaggningar" },
    ],
  }),

  inst({
    id: "cancerfonden",
    name: "Swedish Cancer Society (Cancerfonden)",
    aka: ["Cancerfonden", "Swedish Cancer Society", "Cancerfonden Sverige"],
    city: "Stockholm", country: "SE", lat: 59.343, lng: 18.050, institutionType: "consortium",
    website: "https://www.cancerfonden.se/",
    tldr: "A Swedish charity, founded in 1951, that describes itself as one of the largest funders of cancer research in the country and publishes, with the national register, the plain-language statistics book Cancer i siffror.",
    summary: "Cancerfonden is a fundraising charity, not a public body, with about 115 staff. It describes itself as one of the largest funders of Swedish cancer research and states that from 1951 to 2025 it awarded nearly 18 billion kronor to research projects in Sweden. Its fundraising is overseen by Svensk Insamlingskontroll.\n\nWith Socialstyrelsen it produces Cancer i siffror, the popular-science statistics book: the 2023 edition, using 2021 data, puts the number of people living in Sweden at the end of 2021 who had ever had a cancer diagnosed since 1958 at about 600,000, and relative five-year survival at 77.8 per cent for men and 76.6 per cent for women. In October 2026 it published estimates of what cancer costs a household: for women aged 40 to 64 with breast cancer, an average economic burden of about 170,000 kronor once sick pay and benefits are counted, about 135,000 of it in the first two years, and a similar total for colorectal cancer at the same ages.",
    programs: ["Research grants", "Cancer i siffror (with Socialstyrelsen)", "Patient information", "Policy and advocacy"],
    institutions: ["swedish-cancer-register"],
    sections: ["supportive-care"], bottlenecks: ["b-funding-allocation"],
    links: [
      { label: "Cancerfonden: om oss", url: "https://www.cancerfonden.se/om-cancerfonden" },
      { label: "Cancerfonden: vår organisation", url: "https://www.cancerfonden.se/om-oss/organisation" },
      { label: "Cancer i siffror 2023 (Cancerfonden and Socialstyrelsen, PDF)", url: "https://www.socialstyrelsen.se/globalassets/sharepoint-dokument/dokument-webb/statistik/cancer-i-siffror-2023.pdf" },
      { label: "Cancerfonden: så kan cancer påverka din ekonomi (14 October 2026)", url: "https://www.cancerfonden.se/nyhet/cancer-kan-paverka-privatekonomin" },
    ],
  }),

  // ---------------------------------------------------------------- Stockholm3 and STHLM3-MRI
  trial({
    id: "sthlm3-mri",
    name: "STHLM3-MRI (Stockholm3 and MRI-targeted biopsy in prostate cancer screening)",
    aka: ["STHLM3MR-2", "STHLM3 MR Phase 2", "Stockholm3-MRI"],
    nct: "NCT03377881", phase: "not-applicable", design: "non-inferiority", status: "positive",
    sponsor: "Karolinska Institutet", started: "2018-04-04", startedType: "actual", yearReported: 2021, enrolled: 12750,
    setting: "Population-based prostate cancer screening by invitation of men aged 50 to 74 in Stockholm: men with PSA of 3 ng/mL or more randomised 2:3 to standard biopsy or MRI with targeted and standard biopsy",
    tldr: "A Stockholm trial that invited men from the general population for prostate testing and asked whether using an MRI scan to decide who needs a biopsy finds as many important cancers as biopsying everyone with a raised PSA. It did, and it found about a third as many harmless cancers.",
    summary: "STHLM3-MRI enrolled 12,750 men aged 50 to 74 invited by post from the general population. The 1,532 with a PSA of 3 ng/mL or higher were randomised 2:3 to a standard biopsy (603) or to MRI followed by targeted and standard biopsy only if the scan suggested cancer (929). In the intention-to-treat analysis clinically significant cancer (Gleason score 7 or more) was found in 21 per cent of the MRI group and 18 per cent of the standard group, meeting the non-inferiority margin, while clinically insignificant cancer fell from 12 to 4 per cent. The trial also tested the Stockholm3 blood-based risk score, developed in the earlier STHLM3 study, and a two-year follow-up of the baseline round was published in 2026. It was funded by the Swedish Research Council and others.",
    result: "Clinically significant cancer 21% (MRI-guided) vs 18% (standard biopsy), non-inferior; clinically insignificant cancer 4% vs 12%.",
    outcomes: [
      { endpoint: "Clinically significant prostate cancer (Gleason 7 or more) detected", primary: true, unit: "%", arms: [{ name: "MRI with targeted and standard biopsy", n: 929, value: 21 }, { name: "Standard biopsy", n: 603, value: 18 }], source: "https://doi.org/10.1056/NEJMoa2100852" },
      { endpoint: "Clinically insignificant prostate cancer (Gleason 6) detected", unit: "%", arms: [{ name: "MRI with targeted and standard biopsy", n: 929, value: 4 }, { name: "Standard biopsy", n: 603, value: 12 }], source: "https://doi.org/10.1056/NEJMoa2100852" },
    ],
    cancers: ["prostate"], technologies: ["prostate-screening-psa-mri", "mp-mri"], terms: ["psa", "overdiagnosis"], institutions: ["karolinska", "capio-st-goran"],
    people: ["martin-eklund", "henrik-gronberg"], keyPapers: ["paper-eklund-sthlm3-mri-nejm-2021"], sections: ["early-detection"], bottlenecks: ["b-early-detection"],
    links: [
      { label: "ClinicalTrials.gov NCT03377881", url: "https://clinicaltrials.gov/study/NCT03377881" },
      doi("10.1056/NEJMoa2100852", "Eklund et al., NEJM 2021"),
      doi("10.7326/ANNALS-25-04753", "Palsdottir et al., two-year follow-up, Annals of Internal Medicine 2026"),
    ],
  }),

  paper({
    id: "paper-eklund-sthlm3-mri-nejm-2021",
    name: "MRI-targeted or standard biopsy in prostate cancer screening (STHLM3-MRI)",
    journal: "New England Journal of Medicine", year: 2021, doi: "10.1056/NEJMoa2100852", pmid: "34237810",
    authors: "Eklund M, Jäderling F, Discacciati A, Bergman M, Annerstedt M, Aly M, Glaessgen A, Carlsson S, Grönberg H, Nordström T; STHLM3 consortium", paperType: "rct", participants: 12750,
    tldr: "In a Stockholm screening trial, sending men with a raised PSA for an MRI scan first, and biopsying only those whose scan looked suspicious, found as many important prostate cancers as biopsying all of them, and a third as many harmless ones.",
    summary: "A population-based non-inferiority trial from Karolinska Institutet. Men aged 50 to 74 were invited by post; of 12,750 enrolled, 1,532 had a PSA of 3 ng/mL or higher and were randomised 2:3 to standard biopsy (603) or to MRI with targeted and standard biopsy if the MRI suggested cancer (929). The primary outcome was the proportion with clinically significant cancer (Gleason score 7 or more) in the intention-to-treat population; the key secondary outcome was detection of clinically insignificant (Gleason 6) cancer.",
    findings: [
      "Clinically significant cancer was diagnosed in 192 men (21 per cent) in the MRI group and 106 (18 per cent) in the standard biopsy group, a difference of 3 percentage points (95 per cent CI -1 to 7; P<0.001 for non-inferiority).",
      "Clinically insignificant cancer fell from 12 per cent (73 men) with standard biopsy to 4 per cent (41 men) with the MRI pathway, a difference of -8 percentage points (95 per cent CI -11 to -5).",
    ],
    whatItMeans: "Overdiagnosis, finding cancers that would never have caused harm, is the main reason Sweden's health authority advises against PSA screening. This trial showed that putting an MRI before the biopsy keeps the detection of cancers that matter while cutting the harmless ones by about two thirds. Sweden's regions have since begun organised prostate cancer testing, which the regional cancer centres describe as making PSA testing more equal and structured and helping to evaluate complementary tests; Socialstyrelsen still distinguishes it from screening.",
    caveats: [
      "One screening round in one city; it measures what was found, not deaths prevented.",
      "Detection depends on the quality of MRI reading, which may be lower outside expert centres.",
    ],
    trials: ["sthlm3-mri"], cancers: ["prostate"], technologies: ["prostate-screening-psa-mri", "mp-mri"], terms: ["psa", "overdiagnosis"],
    institutions: ["karolinska", "capio-st-goran"], people: ["martin-eklund", "henrik-gronberg"], journals: ["nejm"], sections: ["early-detection"], bottlenecks: ["b-early-detection"],
    links: [doi("10.1056/NEJMoa2100852", "NEJM 2021"), pubmed("34237810")],
  }),

  paper({
    id: "paper-gronberg-sthlm3-lancet-oncol-2015",
    name: "Prostate cancer screening in men aged 50-69 years (STHLM3): a prospective population-based diagnostic study",
    journal: "Lancet Oncology", year: 2015, doi: "10.1016/S1470-2045(15)00361-7", pmid: "26563502",
    authors: "Grönberg H, Adolfsson J, Aly M, Nordström T, Wiklund P, Brandberg Y, Thompson J, Wiklund F, Lindberg J, Clements M, Egevad L, Eklund M", paperType: "observational",
    tldr: "A Stockholm study that combined a PSA test with other blood proteins, 232 genetic markers and clinical details into one risk score. At the same sensitivity as PSA alone, the score would have avoided about a third of prostate biopsies.",
    summary: "STHLM3 was a prospective, population-based, paired, screen-positive diagnostic study of men aged 50 to 69 without prostate cancer, invited at random by date of birth from the Swedish population register. Every participant had both PSA and the predefined STHLM3 model: plasma proteins (PSA, free PSA, intact PSA, hK2, MSMB, MIC1), 232 single-nucleotide polymorphisms, and age, family history, previous biopsy and prostate examination. The aim was higher specificity than PSA without lower sensitivity for Gleason 7 or higher cancer. It was funded by Stockholm County Council and registered as ISRCTN84445406.",
    findings: [
      "Area under the curve for Gleason 7 or higher cancer was 0.74 (95 per cent CI 0.72 to 0.75) for the STHLM3 model against 0.56 (0.55 to 0.60) for PSA alone (p<0.0001).",
      "At the same sensitivity as a PSA cutoff of 3 ng/mL or more, the model could reduce the number of biopsies by 32 per cent (95 per cent CI 24 to 39) and avoid 44 per cent (35 to 54) of benign biopsies.",
    ],
    whatItMeans: "It showed in a general population, not a referred clinic population, that a multi-marker risk score could spare many men a biopsy without missing more of the cancers that matter. The same group then tested the score inside the STHLM3-MRI screening trial.",
    caveats: [
      "A diagnostic accuracy study, not a trial of mortality; men with a negative score were not all biopsied, so cancers missed by both tests cannot be counted.",
      "Developed and validated in Stockholm men; performance in other populations needs its own validation.",
    ],
    cancers: ["prostate"], terms: ["psa", "overdiagnosis", "polygenic-risk-score"], institutions: ["karolinska"], people: ["henrik-gronberg", "martin-eklund"],
    related: ["sthlm3-mri"], journals: ["lancet-oncology"], sections: ["early-detection"], bottlenecks: ["b-early-detection", "b-biomarker-validation"],
    links: [doi("10.1016/S1470-2045(15)00361-7", "Lancet Oncology 2015"), pubmed("26563502")],
  }),

  // ---------------------------------------------------------------- Twin registers
  paper({
    id: "paper-lichtenstein-twins-cancer-heritability-nejm-2000",
    name: "Environmental and heritable factors in the causation of cancer: analyses of cohorts of twins from Sweden, Denmark, and Finland",
    journal: "New England Journal of Medicine", year: 2000, doi: "10.1056/NEJM200007133430201", pmid: "10891514",
    authors: "Lichtenstein P, Holm NV, Verkasalo PK, Iliadou A, Kaprio J, Koskenvuo M, Pukkala E, Skytthe A, Hemminki K", paperType: "observational",
    tldr: "A study of nearly 45,000 pairs of twins in the Swedish, Danish and Finnish twin registers that asked how much of ordinary cancer is inherited. For most cancers the answer was a minor share: the environment, in the broad sense of everything that is not inherited, played the larger part.",
    summary: "Led from the Department of Medical Epidemiology at Karolinska Institutet, the study combined 44,788 twin pairs from the three Nordic twin registers, linked to the national cancer registers, to estimate the risk of cancer at 28 sites in the twin of an affected person, and modelled the relative contributions of heritable and environmental factors at 11 sites. At least one cancer occurred in 10,803 people among 9,512 pairs. It depended on twin registers and national cancer registers that can be linked person by person.",
    findings: [
      "Twins of affected people had an increased risk of stomach, colorectal, lung, breast and prostate cancer.",
      "Statistically significant heritability was found for prostate cancer (42 per cent; 95 per cent CI 29 to 50), colorectal cancer (35 per cent; 10 to 48) and breast cancer (27 per cent; 4 to 41).",
      "The authors concluded that inherited genetic factors make a minor contribution to susceptibility to most types of neoplasm, and that the environment has the principal role in sporadic cancer.",
    ],
    whatItMeans: "It is the reason a family history matters for some cancers and not much for others, and it supports prevention: if most of the risk is not inherited, much of it can in principle be changed. The larger heritability for prostate, colorectal and breast cancer pointed at genetic risk that later genome-wide studies and polygenic scores set out to find.",
    caveats: [
      "Twin models assume identical and fraternal twins share their environment equally; heritability here means the share of variation in risk in these populations, not the share of any one person's cancer.",
      "Estimates for less common cancers had wide confidence intervals; the larger NorTwinCan study in 2016 reported higher estimates for prostate and breast cancer.",
    ],
    cancers: ["prostate", "colorectal"], institutions: ["karolinska"], people: ["paul-lichtenstein"], related: ["paper-mucci-nortwincan-heritability-jama-2016"],
    journals: ["nejm"], sections: ["prevention"], bottlenecks: ["b-hereditary-risk"],
    links: [doi("10.1056/NEJM200007133430201", "NEJM 2000"), pubmed("10891514")],
  }),

  paper({
    id: "paper-mucci-nortwincan-heritability-jama-2016",
    name: "Familial risk and heritability of cancer among twins in Nordic countries (NorTwinCan)",
    journal: "JAMA", year: 2016, doi: "10.1001/jama.2015.17703", pmid: "26746459",
    authors: "Mucci LA, Hjelmborg JB, Harris JR, Czene K, Havelick DJ, Scheike T, Graff RE, Holst K, et al.; Nordic Twin Study of Cancer (NorTwinCan) Collaboration", paperType: "observational", participants: 203691,
    tldr: "Following more than 200,000 twins in Denmark, Finland, Norway and Sweden for a median of 32 years, this study estimated that about a third of the variation in cancer risk is inherited, with higher shares for melanoma and prostate cancer.",
    summary: "A prospective cohort of 80,309 identical and 123,382 same-sex fraternal twin individuals in the population-based twin registers of Denmark, Finland, Norway and Sweden, followed through the cancer registers between 1943 and 2010. Time-to-event models estimated familial risk, the risk of cancer given that a co-twin developed it, and heritability, adjusting for age and follow-up and accounting for censoring and the competing risk of death. Karolinska Institutet's Department of Medical Epidemiology and Biostatistics was among the collaborating centres.",
    findings: [
      "27,156 incident cancers were diagnosed in 23,980 people, a cumulative incidence of 32 per cent.",
      "Cumulative cancer risk was 46 per cent (95 per cent CI 44 to 48) in identical twins and 37 per cent (36 to 38) in fraternal twins whose co-twin developed cancer, against 32 per cent overall.",
      "Heritability of cancer overall was 33 per cent (95 per cent CI 30 to 37); significant heritability was found for skin melanoma (58 per cent), prostate (57 per cent), non-melanoma skin (43 per cent), ovary (39 per cent), kidney (38 per cent), breast (31 per cent) and corpus uteri (27 per cent).",
    ],
    whatItMeans: "It gives patients and counsellors population figures for how much a twin's or close relative's cancer raises one's own risk, cancer by cancer, and it shows that for prostate cancer and melanoma inherited risk is substantial.",
    caveats: [
      "Twin heritability is a population estimate under model assumptions, not a measure of any individual's genetic risk.",
      "An erratum was published (JAMA 2016;315(8):822).",
    ],
    cancers: ["prostate", "melanoma"], institutions: ["karolinska"], related: ["paper-lichtenstein-twins-cancer-heritability-nejm-2000"],
    journals: ["jama"], sections: ["prevention"], bottlenecks: ["b-hereditary-risk"],
    links: [doi("10.1001/jama.2015.17703", "JAMA 2016"), pubmed("26746459")],
  }),
];
