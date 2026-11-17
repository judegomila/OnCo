import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * The Bahamas: the public bodies and papers behind /countries/bs/ (wave 16) that the corpus did not hold. The two
 * institution records were written from the bodies' own sites (the National Prescription Drug Plan's site and the
 * National Health Insurance Authority's home and questions pages) and from The Tribune's report of 16 June 2026, all
 * read raw on 16 November 2026; a second pass the same day added the drug plan's 2019 to 2021 formulary and NHI's
 * benefits package (PDF text). DOIs were resolved through Europe PMC and the figures in `findings` are taken from the
 * indexed abstracts. The corpus already held Donenberg and colleagues' 2011 BRCA1 paper, which the page links.
 *
 * Inbound links: each new institution links Princess Margaret Hospital, which the corpus already holds, and the two
 * link each other; the papers are listed on the page. Coordinates are approximate Nassau city points, not building
 * positions.
 */
const asOf = "2026-11-16";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const NPDP = "https://www.nibdrugplan.com/";
const NHI = "https://www.nhibahamas.gov.bs/";
const NHI_FAQ = "https://www.nhibahamas.gov.bs/faqs/";
const NPDP_FORMULARY = "https://www.nibdrugplan.com/wp-content/uploads/2025/05/2019-2021-Formulary-Listing-Doc-rev1.pdf";
const NHI_BENEFITS = "https://www.nhibahamas.gov.bs/wp-content/uploads/Primary-Care-Benefits-Package.pdf";
const TRIBUNE_NHI = "https://tribune242.com/news/2026/jun/16/pharmacy-concern-over-drug-plans-nhi-switch/";

const institutions: InstitutionInput[] = [
  i({ id: "npdp-bahamas", name: "National Prescription Drug Plan (Bahamas)", aka: ["NPDP", "NIB Drug Plan", "Bahamas National Prescription Drug Plan"],
    city: "Nassau", country: "BS", lat: 25.06, lng: -77.345, institutionType: "government", website: NPDP,
    tldr: "The Bahamas' public plan that helps named groups of people with chronic conditions get their medicines from public and private pharmacies. Breast cancer and prostate cancer are among the conditions it covers.",
    summary: "The plan's site says the Government of the Bahamas enacted legislation in 2009 to introduce the National Prescription Drug Plan, to improve access to prescription drugs and medical supplies in public and private pharmacies for people with chronic disease and to fund health promotion. The conditions it lists are rheumatic disease (arthritis and lupus), asthma and chronic obstructive pulmonary disease, benign prostate hypertrophy, breast cancer, diabetes, epilepsy, glaucoma, high cholesterol, hypertension, coronary heart disease and cardiomyopathy, prostate cancer, psychiatric illness, sickle cell anaemia and thyroid disease. The groups it names include Bahamian citizens aged 65 or over who are not eligible for a National Insurance pension, children under 18 (or under 25 if full-time students) with a covered condition, indigent persons, and members of the police force. The site says the plan is managed by the National Insurance Board and implemented in phases. In June 2026 The Tribune reported that the plan was being transferred from the National Insurance Board to the National Health Insurance scheme and that it faced temporary shortages of some medicines. The plan's formulary list for 2019 to 2021 names, under breast cancer, anastrozole, letrozole, tamoxifen, trastuzumab and zoledronic acid, and under prostate cancer, bicalutamide, goserelin and zoledronic acid, beside pain and other supportive medicines; no later list was found. The coordinates are an approximate Nassau city point.",
    programs: ["Medicines for covered chronic conditions, including breast cancer and prostate cancer", "Health promotion and wellness funding"],
    institutions: ["nhi-bahamas", "princess-margaret-hospital-bahamas"],
    cancers: ["breast-cancer", "prostate"],
    links: [
      { label: "National Prescription Drug Plan: conditions covered and who is eligible", url: NPDP },
      { label: "National Prescription Drug Plan: formulary list 2019 to 2021 (PDF)", url: NPDP_FORMULARY },
      { label: "The Tribune: pharmacy concern over the drug plan's move to NHI (16 June 2026)", url: TRIBUNE_NHI },
    ] }),

  i({ id: "nhi-bahamas", name: "National Health Insurance Authority (Bahamas)", aka: ["NHI Bahamas", "NHIA", "National Health Insurance Bahamas"],
    city: "Nassau", country: "BS", lat: 25.05, lng: -77.35, institutionType: "government", website: NHI,
    tldr: "The public body that runs NHI Bahamas, which pays for primary care, such as doctor visits, health screening and some laboratory tests, with nothing to pay at the point of care. Its present benefits are a first phase and do not list cancer treatment.",
    summary: "The National Health Insurance Authority says Bahamians began registering for the programme in January 2016, that enrolment began in 2017 and that primary care services under NHI Bahamas started in May 2017. Its home page says more than 160,000 Bahamians have joined and that beneficiaries pay no copayment or deductible for covered services. Its questions page says all legal residents are covered, with no one excluded for a pre-existing condition, age or income, that the present programme covers primary care, including visits to a doctor, disease prevention, health screening and some laboratory tests, and that vision and dental care are not covered. Asked whether NHI Bahamas covers treatment for diseases such as cancer, the questions page answers that only treatments that can be delivered through primary care are covered; the home page names Pap smears and prostate screening among the services, and the benefits package, revised on 10 June 2021, lists a liquid Pap smear every 3 years for women over 21, a PSA test offered annually to men over 40 and a faecal immunochemical test every two years for people over 45. In June 2026 The Tribune reported that the National Prescription Drug Plan was being transferred to the scheme. The coordinates are an approximate Nassau city point.",
    programs: ["NHI Bahamas primary care coverage (from May 2017)", "National Prescription Drug Plan (transfer reported in 2026)"],
    institutions: ["npdp-bahamas", "princess-margaret-hospital-bahamas"],
    keyPapers: ["paper-trottier-brca-founder-unaffected-bahamas-clingenet-2016", "paper-roberts-prostate-screening-clinic-bahamas-ccc-2017"], links: [
      { label: "National Health Insurance Authority: NHI Bahamas", url: NHI },
      { label: "National Health Insurance Authority: frequently asked questions", url: NHI_FAQ },
      { label: "National Health Insurance Authority: primary care benefits package (revised 10 June 2021, PDF)", url: NHI_BENEFITS },
      { label: "The Tribune: pharmacy concern over the drug plan's move to NHI (16 June 2026)", url: TRIBUNE_NHI },
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-trottier-brca-founder-unaffected-bahamas-clingenet-2016", name: "Prevalence of founder mutations in the BRCA1 and BRCA2 genes among unaffected women from the Bahamas",
    journal: "Clinical Genetics", year: 2016, doi: "10.1111/cge.12602", pmid: "25920394", authors: "Trottier M, Lunn J, Butler R, et al.", paperType: "observational", participants: 1847,
    tldr: "Among 1,847 Bahamian women who had never had breast or ovarian cancer, 2.8% of those with a family history of these cancers carried a founder BRCA mutation, against 0.09% of those without one.",
    summary: "The study asked whether testing the whole population for BRCA mutations is worthwhile in the Bahamas, where 23% of women with breast cancer carry one of seven founder mutations in BRCA1 or BRCA2. It tested 1,847 women with no personal history of breast or ovarian cancer, unselected for age or family history. The authors had earlier suggested that all Bahamian women with breast or ovarian cancer be offered genetic testing, and conclude that all unaffected Bahamian women with a family history of breast or ovarian cancer should be offered it as well.",
    findings: ["20 of 705 unaffected women with a family history of breast or ovarian cancer carried a founder mutation (2.8%).", "1 of 1,089 unaffected women without a family history carried one (0.09%).", "38% of unaffected women with a known mutation in the family carried the familial mutation."],
    whatItMeans: "For a Bahamian woman who has not had cancer, a family history of breast or ovarian cancer is what makes a founder-mutation test likely to find something.",
    caveats: ["Tests only the known founder mutations, so other mutations would be missed.", "The abstract does not say how the 1,847 women were recruited, so they may not represent all Bahamian women."],
    cancers: ["breast-cancer"], links: [doi("10.1111/cge.12602", "DOI"), pubmed("25920394")] }),

  p({ id: "paper-jones-cervix-radiotherapy-bahamas-ccc-2017", name: "Experience with curative radiotherapy for cervix cancer in the Bahamas for 2006-2016",
    journal: "Cancer Causes & Control", year: 2017, doi: "10.1007/s10552-017-0964-1", pmid: "28921401", authors: "Jones G, Kellini O, Girgis N, et al.", paperType: "real-world", participants: 72,
    tldr: "Seventy-two women had curative radiotherapy for cervical cancer in the Bahamas from 2006 to 2016; the median wait from diagnosis to treatment was 110 days, and treatment times shortened over the decade.",
    summary: "A retrospective study of all cases of cervix cancer managed from 2006 to 2016 at The Cancer Centre Bahamas, in conjunction with Princess Margaret Hospital, Nassau. Seventy-two women received curative radiotherapy or chemoradiotherapy. The paper reports presenting characteristics, waiting and overall treatment times, recurrence, survival and adverse events, as a benchmark for a small island state.",
    findings: ["For 68 newly diagnosed cases the median wait from diagnosis to starting treatment was 110 days; 90 days for the 47 with no prior surgery or neoadjuvant chemotherapy.", "99% of intended external radiotherapy fractions, 74% of brachytherapy sessions and 79% of concurrent weekly chemotherapy were given.", "Median overall treatment time in the 47-case group was 78 days in 2006 to 2010 and 65 days in 2011 to 2016 (p = 0.005).", "Four women had grade 3 to 4 toxicity; five had local failure and eight distant failure.", "Two-year survival for newly diagnosed stage 2B (26 of 72) was 71%."],
    whatItMeans: "Curative radiotherapy for cervical cancer was given in the Bahamas throughout 2006 to 2016, with a typical wait of three months or more before it started.",
    caveats: ["One centre and 72 women over eleven years.", "Data end in 2016; the abstract gives survival for one stage only."],
    cancers: ["cervical"], institutions: ["princess-margaret-hospital-bahamas"], links: [doi("10.1007/s10552-017-0964-1", "DOI"), pubmed("28921401")] }),

  p({ id: "paper-roberts-prostate-screening-clinic-bahamas-ccc-2017", name: "The prostate cancer screening clinic in the Bahamas: a model for low- and middle-income countries",
    journal: "Cancer Causes & Control", year: 2017, doi: "10.1007/s10552-017-0972-1", pmid: "29119339", authors: "Roberts R, Mitchell C, Tancawan AL, et al.", paperType: "real-world", participants: 1844,
    tldr: "A yearly community prostate screening clinic on Grand Bahama registered 1,844 men from 2012 to 2015 and found 40 prostate cancers, half of them high risk.",
    summary: "A local chapter of the Us TOO prostate cancer support group has led an annual community-based screening clinic on Grand Bahama each September since 2009, with corporate funding, volunteers running the clinics and health professionals providing care. The paper analyses 2012 to 2015. An explicit algorithm using age, other illnesses, digital rectal examination and prostate specific antigen (PSA) values decided who went on to secondary assessment and biopsy.",
    findings: ["1,844 men registered (mean age 57.6 years); 149 attended more than once, for 1,993 clinic visits.", "The urologist reviewed 315 men; 45 met the criteria for biopsy and 40 had prostate cancer, a positive predictive value of 89%.", "By D'Amico risk group the 40 cancers were 10% low, 40% intermediate and 50% high risk.", "The urologist counselled all 40 men and arranged access to standard care."],
    whatItMeans: "A volunteer-run clinic found cancers that needed treatment, half of them high risk, but few men came back for a second screen.",
    caveats: ["Men who chose to attend, on one island.", "No comparison group, and no data yet on whether deaths fell."],
    cancers: ["prostate"], links: [doi("10.1007/s10552-017-0972-1", "DOI"), pubmed("29119339")] }),
];

/** Records behind /countries/bs/ (wave 16). */
export const recordsBS: EntityInput[] = [...institutions, ...papers];
