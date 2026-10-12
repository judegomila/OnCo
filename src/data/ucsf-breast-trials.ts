/** UCSF adult female breast-study coverage, checked against exact registry captures on 2026-10-10.
 * Local availability is separate from overall recruitment. See docs/audits/ucsf-breast-2026-10-10.md. */
import type { TrialInput } from "@/lib/schema";

export const ucsfBreastTrials: TrialInput[] = [
  {
    id: "nct06224673",
    kind: "trial",
    name: "ARX788 in HER2-low advanced breast cancer",
    aka: [
      "ARX788 for Treating Patients With HER2-low Locally Advanced Unresectable or Metastatic Breast Cancer"
    ],
    nct: "NCT06224673",
    phase: "2",
    setting: "HER2-low unresectable or metastatic breast cancer",
    sponsor: "Laura Huppert, MD, BA",
    tldr: "This study tests ARX788, a drug attached to an antibody that binds HER2, in advanced breast cancer with low HER2 expression.",
    summary: "This study tests ARX788, a drug attached to an antibody that binds HER2, in advanced breast cancer with low HER2 expression.\n\nInterventional study registered as NCT06224673, sponsored by Laura Huppert, MD, BA. Registry phase: 2. Registry enrollment is 36 participants (estimated). Registry status checked October 10, 2026: recruiting. UCSF lists this study as open to eligible people; local availability and overall registry status are separate. See the registry for full eligibility and current sites.",
    asOf: "2026-10-10",
    cancers: [
      "breast-cancer",
      "tnbc"
    ],
    institutions: [
      "ucsf"
    ],
    tags: [
      "ucsf-breast-coverage",
      "interventional"
    ],
    links: [
      {
        label: "ClinicalTrials.gov NCT06224673",
        url: "https://clinicaltrials.gov/study/NCT06224673"
      },
      {
        label: "UCSF study listing and local availability",
        url: "https://clinicaltrials.ucsf.edu/trial/NCT06224673"
      }
    ],
    participation: [
      {
        nct: "NCT06224673",
        source: "https://clinicaltrials.gov/study/NCT06224673",
        fetchedAt: "2026-10-10T20:54:18.251381Z",
        studySha256: "2431de014aae8966c182c390714ed1ff1defc6698bdf46685dc2a5ab73a4b597",
        overallStatus: "RECRUITING",
        leadSponsor: "Laura Huppert, MD, BA",
        collaboratorCount: 1,
        hasEligibility: true,
        siteCount: 1,
        recruitingSiteCount: 1,
        countries: [
          "United States"
        ],
        minimumAge: "18 Years",
        sex: "ALL",
        healthyVolunteers: false,
        enrolment: 36,
        enrolmentType: "ESTIMATED",
        lastUpdatePosted: "2026-06-11"
      }
    ],
    status: "recruiting",
    started: "2026-06-05",
    startedType: "actual",
    drugs: [
      "arx788"
    ]
  },
  {
    id: "nct04893109",
    kind: "trial",
    name: "ATEMPT 2.0",
    aka: [
      "ATEMPT 2.0: Adjuvant T-DM1 vs TH"
    ],
    nct: "NCT04893109",
    phase: "2",
    setting: "HER2-positive breast cancer after surgery",
    sponsor: "Dana-Farber Cancer Institute",
    tldr: "ATEMPT 2.0 compares a shorter course of T-DM1 followed by trastuzumab with paclitaxel and trastuzumab after breast surgery, tracking side effects and cancer recurrence.",
    summary: "ATEMPT 2.0 compares a shorter course of T-DM1 followed by trastuzumab with paclitaxel and trastuzumab after breast surgery, tracking side effects and cancer recurrence.\n\nInterventional study registered as NCT04893109, sponsored by Dana-Farber Cancer Institute. Registry phase: 2. Registry enrollment is 500 participants (estimated). Registry status checked October 10, 2026: recruiting. UCSF lists this study as open to eligible people; local availability and overall registry status are separate. See the registry for full eligibility and current sites.",
    asOf: "2026-10-10",
    cancers: [
      "breast-cancer"
    ],
    institutions: [
      "ucsf"
    ],
    tags: [
      "ucsf-breast-coverage",
      "interventional"
    ],
    links: [
      {
        label: "ClinicalTrials.gov NCT04893109",
        url: "https://clinicaltrials.gov/study/NCT04893109"
      },
      {
        label: "UCSF study listing and local availability",
        url: "https://clinicaltrials.ucsf.edu/trial/NCT04893109"
      }
    ],
    participation: [
      {
        nct: "NCT04893109",
        source: "https://clinicaltrials.gov/study/NCT04893109",
        fetchedAt: "2026-10-10T20:54:18.305117Z",
        studySha256: "7b4fff4ec17919572250532775e2c24e08ccbf1a3de4573dabae34631dd6a6c6",
        overallStatus: "RECRUITING",
        leadSponsor: "Dana-Farber Cancer Institute",
        collaboratorCount: 1,
        hasEligibility: true,
        siteCount: 53,
        recruitingSiteCount: 46,
        countries: [
          "United States"
        ],
        minimumAge: "18 Years",
        sex: "ALL",
        healthyVolunteers: false,
        enrolment: 500,
        enrolmentType: "ESTIMATED",
        lastUpdatePosted: "2026-08-19"
      }
    ],
    status: "recruiting",
    started: "2021-06-16",
    startedType: "actual",
    drugs: [
      "paclitaxel",
      "trastuzumab",
      "trastuzumab-emtansine"
    ]
  },
  {
    id: "nct06778863",
    kind: "trial",
    name: "CLSP-1025 in p53 R175H solid tumors",
    aka: [
      "A Study of CLSP-1025 in Adult Patients With Solid Tumors That Harbor the p53 R175H Mutation"
    ],
    nct: "NCT06778863",
    phase: "1",
    setting: "Advanced solid tumors with p53 R175H and HLA-A*02:01",
    sponsor: "Clasp Therapeutics, Inc.",
    tldr: "This early study tests CLSP-1025, which aims to bring immune cells to cancer cells displaying a particular mutated p53 fragment. Both the mutation and a matching immune-system marker are required.",
    summary: "This early study tests CLSP-1025, which aims to bring immune cells to cancer cells displaying a particular mutated p53 fragment. Both the mutation and a matching immune-system marker are required.\n\nInterventional study registered as NCT06778863, sponsored by Clasp Therapeutics, Inc.. Registry phase: 1. Registry enrollment is 90 participants (estimated). Registry status checked October 10, 2026: recruiting. UCSF lists this study as open to eligible people; local availability and overall registry status are separate. See the registry for full eligibility and current sites.",
    asOf: "2026-10-10",
    cancers: [
      "breast-cancer"
    ],
    institutions: [
      "ucsf"
    ],
    tags: [
      "ucsf-breast-coverage",
      "interventional"
    ],
    links: [
      {
        label: "ClinicalTrials.gov NCT06778863",
        url: "https://clinicaltrials.gov/study/NCT06778863"
      },
      {
        label: "UCSF study listing and local availability",
        url: "https://clinicaltrials.ucsf.edu/trial/NCT06778863"
      }
    ],
    participation: [
      {
        nct: "NCT06778863",
        source: "https://clinicaltrials.gov/study/NCT06778863",
        fetchedAt: "2026-10-10T20:54:18.246315Z",
        studySha256: "cdf259817fa5689e049b43401b1b48e5a524786f3b982831730a2a1446b352c7",
        overallStatus: "RECRUITING",
        leadSponsor: "Clasp Therapeutics, Inc.",
        collaboratorCount: 0,
        hasEligibility: true,
        siteCount: 21,
        recruitingSiteCount: 21,
        countries: [
          "United States"
        ],
        minimumAge: "18 Years",
        sex: "ALL",
        healthyVolunteers: false,
        enrolment: 90,
        enrolmentType: "ESTIMATED",
        lastUpdatePosted: "2026-02-13"
      }
    ],
    status: "recruiting",
    started: "2025-02-28",
    startedType: "actual",
    drugs: []
  },
  {
    id: "nct06075953",
    kind: "trial",
    name: "DCIS RECAST",
    aka: [
      "DCIS: RECAST Trial Ductal Carcinoma In Situ: Re-Evaluating Conditions for Active Surveillance Suitability as Treatment"
    ],
    nct: "NCT06075953",
    phase: "2",
    setting: "Ductal carcinoma in situ managed with hormone therapy and active surveillance",
    sponsor: "QuantumLeap Healthcare Collaborative",
    tldr: "RECAST tests whether hormone therapy and repeated scans can help identify people with ductal carcinoma in situ who can continue careful monitoring. Surgery is recommended if the study evaluations indicate it is needed.",
    summary: "RECAST tests whether hormone therapy and repeated scans can help identify people with ductal carcinoma in situ who can continue careful monitoring. Surgery is recommended if the study evaluations indicate it is needed.\n\nInterventional study registered as NCT06075953, sponsored by QuantumLeap Healthcare Collaborative. Registry phase: 2. Registry enrollment is 400 participants (estimated). Registry status checked October 10, 2026: recruiting. UCSF lists this study as open to eligible people; local availability and overall registry status are separate. See the registry for full eligibility and current sites.",
    asOf: "2026-10-10",
    cancers: [
      "breast-cancer"
    ],
    institutions: [
      "ucsf"
    ],
    tags: [
      "ucsf-breast-coverage",
      "interventional"
    ],
    links: [
      {
        label: "ClinicalTrials.gov NCT06075953",
        url: "https://clinicaltrials.gov/study/NCT06075953"
      },
      {
        label: "UCSF study listing and local availability",
        url: "https://clinicaltrials.ucsf.edu/trial/NCT06075953"
      }
    ],
    participation: [
      {
        nct: "NCT06075953",
        source: "https://clinicaltrials.gov/study/NCT06075953",
        fetchedAt: "2026-10-10T20:54:18.265436Z",
        studySha256: "14bf7aed65c56ba75185de23017fe08323c831ce74f99984de978826b983433f",
        overallStatus: "RECRUITING",
        leadSponsor: "QuantumLeap Healthcare Collaborative",
        collaboratorCount: 0,
        hasEligibility: true,
        siteCount: 29,
        recruitingSiteCount: 26,
        countries: [
          "United States"
        ],
        minimumAge: "18 Years",
        sex: "FEMALE",
        healthyVolunteers: false,
        enrolment: 400,
        enrolmentType: "ESTIMATED",
        lastUpdatePosted: "2026-09-28"
      }
    ],
    status: "recruiting",
    started: "2024-02-17",
    startedType: "actual",
    drugs: [
      "elacestrant",
      "exemestane",
      "letrozole",
      "tamoxifen"
    ]
  },
  {
    id: "nct05297734",
    kind: "trial",
    name: "Supportive cancer care delivery models",
    aka: [
      "Comparative Effectiveness Trial of Two Supportive Cancer Care Delivery Models for Adults With Cancer"
    ],
    nct: "NCT05297734",
    phase: "not-applicable",
    setting: "Adults receiving cancer care",
    sponsor: "Stanford University",
    tldr: "This study compares two ways to deliver support during cancer care: a technology-based approach and a redesigned care team. It studies care delivery rather than a new cancer drug.",
    summary: "This study compares two ways to deliver support during cancer care: a technology-based approach and a redesigned care team. It studies care delivery rather than a new cancer drug.\n\nInterventional study registered as NCT05297734, sponsored by Stanford University. No drug-development phase applies in the structured registry record. Registry enrollment is 2,996 participants (estimated). Registry status checked October 10, 2026: recruiting. UCSF lists this study as open to eligible people; local availability and overall registry status are separate. See the registry for full eligibility and current sites.",
    asOf: "2026-10-10",
    cancers: [
      "breast-cancer"
    ],
    institutions: [
      "ucsf"
    ],
    tags: [
      "ucsf-breast-coverage",
      "interventional"
    ],
    links: [
      {
        label: "ClinicalTrials.gov NCT05297734",
        url: "https://clinicaltrials.gov/study/NCT05297734"
      },
      {
        label: "UCSF study listing and local availability",
        url: "https://clinicaltrials.ucsf.edu/trial/NCT05297734"
      }
    ],
    participation: [
      {
        nct: "NCT05297734",
        source: "https://clinicaltrials.gov/study/NCT05297734",
        fetchedAt: "2026-10-10T20:54:18.535094Z",
        studySha256: "e859d3151e72fa6b4c194d53ccacca2ab44fc78cf4f93717ab5b10ba4313e4b6",
        overallStatus: "RECRUITING",
        leadSponsor: "Stanford University",
        collaboratorCount: 1,
        hasEligibility: true,
        siteCount: 17,
        recruitingSiteCount: 12,
        countries: [
          "United States"
        ],
        minimumAge: "18 Years",
        sex: "ALL",
        healthyVolunteers: false,
        enrolment: 2996,
        enrolmentType: "ESTIMATED",
        lastUpdatePosted: "2026-04-30"
      }
    ],
    status: "recruiting",
    started: "2022-06-24",
    startedType: "actual",
    drugs: []
  },
  {
    id: "nct03011684",
    kind: "trial",
    name: "Tamoxifen versus letrozole for fertility preservation",
    aka: [
      "Fertility Preservation Using Tamoxifen and Letrozole in Estrogen Sensitive Tumors Trial"
    ],
    nct: "NCT03011684",
    phase: "3",
    setting: "Fertility preservation before treatment for estrogen-sensitive tumors",
    sponsor: "University of California, San Francisco",
    tldr: "This study compares tamoxifen and letrozole during ovarian stimulation before cancer treatment. It asks which approach produces more mature eggs for fertility preservation.",
    summary: "This study compares tamoxifen and letrozole during ovarian stimulation before cancer treatment. It asks which approach produces more mature eggs for fertility preservation.\n\nInterventional study registered as NCT03011684, sponsored by University of California, San Francisco. Registry phase: 3. Registry enrollment is 309 participants (estimated). Registry status checked October 10, 2026: recruiting. UCSF lists this study as open to eligible people; local availability and overall registry status are separate. See the registry for full eligibility and current sites.",
    asOf: "2026-10-10",
    cancers: [
      "breast-cancer"
    ],
    institutions: [
      "ucsf"
    ],
    tags: [
      "ucsf-breast-coverage",
      "interventional"
    ],
    links: [
      {
        label: "ClinicalTrials.gov NCT03011684",
        url: "https://clinicaltrials.gov/study/NCT03011684"
      },
      {
        label: "UCSF study listing and local availability",
        url: "https://clinicaltrials.ucsf.edu/trial/NCT03011684"
      }
    ],
    participation: [
      {
        nct: "NCT03011684",
        source: "https://clinicaltrials.gov/study/NCT03011684",
        fetchedAt: "2026-10-10T20:54:18.493700Z",
        studySha256: "6f6a05e483dec8d6449fb0553539fc684d5804a16d7d57b0e9a074d76f5a2fc4",
        overallStatus: "RECRUITING",
        leadSponsor: "University of California, San Francisco",
        collaboratorCount: 0,
        hasEligibility: true,
        siteCount: 1,
        recruitingSiteCount: 1,
        countries: [
          "United States"
        ],
        minimumAge: "18 Years",
        maximumAge: "50 Years",
        sex: "FEMALE",
        healthyVolunteers: false,
        enrolment: 309,
        enrolmentType: "ESTIMATED",
        lastUpdatePosted: "2026-06-04"
      }
    ],
    status: "recruiting",
    started: "2016-07-21",
    startedType: "actual",
    drugs: [
      "letrozole",
      "tamoxifen"
    ]
  },
  {
    id: "nct06638307",
    kind: "trial",
    name: "MEN2312 in advanced breast cancer",
    aka: [
      "A First-in-Human Study of MEN2312 in Adults With Advanced Breast Cancer"
    ],
    nct: "NCT06638307",
    phase: "1",
    setting: "Advanced breast cancer",
    sponsor: "Stemline Therapeutics, Inc.",
    tldr: "This first human study tests MEN2312, a drug that blocks an enzyme involved in controlling gene activity. It studies safety, dose and early signs of activity in advanced breast cancer.",
    summary: "This first human study tests MEN2312, a drug that blocks an enzyme involved in controlling gene activity. It studies safety, dose and early signs of activity in advanced breast cancer.\n\nInterventional study registered as NCT06638307, sponsored by Stemline Therapeutics, Inc.. Registry phase: 1. Registry enrollment is 240 participants (estimated). Registry status checked October 10, 2026: recruiting. UCSF lists this study as open to eligible people; local availability and overall registry status are separate. See the registry for full eligibility and current sites.",
    asOf: "2026-10-10",
    cancers: [
      "breast-cancer"
    ],
    institutions: [
      "ucsf"
    ],
    tags: [
      "ucsf-breast-coverage",
      "interventional"
    ],
    links: [
      {
        label: "ClinicalTrials.gov NCT06638307",
        url: "https://clinicaltrials.gov/study/NCT06638307"
      },
      {
        label: "UCSF study listing and local availability",
        url: "https://clinicaltrials.ucsf.edu/trial/NCT06638307"
      }
    ],
    participation: [
      {
        nct: "NCT06638307",
        source: "https://clinicaltrials.gov/study/NCT06638307",
        fetchedAt: "2026-10-10T20:54:18.544462Z",
        studySha256: "88a956a7771da8f121bc8d443a95386f05ed8cfe51c413cf6f04049b67b99bce",
        overallStatus: "RECRUITING",
        leadSponsor: "Stemline Therapeutics, Inc.",
        collaboratorCount: 0,
        hasEligibility: true,
        siteCount: 45,
        recruitingSiteCount: 45,
        countries: [
          "Spain",
          "United States"
        ],
        minimumAge: "18 Years",
        sex: "ALL",
        healthyVolunteers: false,
        enrolment: 240,
        enrolmentType: "ESTIMATED",
        lastUpdatePosted: "2026-08-07"
      }
    ],
    status: "recruiting",
    started: "2024-10-25",
    startedType: "actual",
    drugs: [
      "elacestrant"
    ]
  },
  {
    id: "nct07512271",
    kind: "trial",
    name: "AI patient education for breast oncology",
    aka: [
      "Generative AI Patient Education Module for Breast Oncology"
    ],
    nct: "NCT07512271",
    phase: "not-applicable",
    setting: "Breast oncology patients and their clinicians",
    sponsor: "University of California, San Francisco",
    tldr: "This study evaluates an AI tool for breast cancer education. It checks the safety and accuracy of answers and how patients and clinicians experience the tool.",
    summary: "This study evaluates an AI tool for breast cancer education. It checks the safety and accuracy of answers and how patients and clinicians experience the tool.\n\nInterventional study registered as NCT07512271, sponsored by University of California, San Francisco. No drug-development phase applies in the structured registry record. Registry enrollment is 35 participants (estimated). Registry status checked October 10, 2026: recruiting. UCSF lists this study as open to eligible people; local availability and overall registry status are separate. See the registry for full eligibility and current sites.",
    asOf: "2026-10-10",
    cancers: [
      "breast-cancer"
    ],
    institutions: [
      "ucsf"
    ],
    tags: [
      "ucsf-breast-coverage",
      "interventional"
    ],
    links: [
      {
        label: "ClinicalTrials.gov NCT07512271",
        url: "https://clinicaltrials.gov/study/NCT07512271"
      },
      {
        label: "UCSF study listing and local availability",
        url: "https://clinicaltrials.ucsf.edu/trial/NCT07512271"
      }
    ],
    participation: [
      {
        nct: "NCT07512271",
        source: "https://clinicaltrials.gov/study/NCT07512271",
        fetchedAt: "2026-10-10T20:54:18.599887Z",
        studySha256: "c8e2deab89f68491d389b80d857ce6497bbe3f5e279e8a678106ed2211474860",
        overallStatus: "RECRUITING",
        leadSponsor: "University of California, San Francisco",
        collaboratorCount: 0,
        hasEligibility: true,
        siteCount: 1,
        recruitingSiteCount: 1,
        countries: [
          "United States"
        ],
        minimumAge: "18 Years",
        sex: "ALL",
        healthyVolunteers: false,
        enrolment: 35,
        enrolmentType: "ESTIMATED",
        lastUpdatePosted: "2026-08-06"
      }
    ],
    status: "recruiting",
    started: "2026-07-14",
    startedType: "actual",
    drugs: []
  },
  {
    id: "nct05307705",
    kind: "trial",
    name: "LOXO-783 in breast cancer and other solid tumors",
    aka: [
      "A Study of LOXO-783 in Patients With Breast Cancer/Other Solid Tumors"
    ],
    nct: "NCT05307705",
    phase: "1",
    setting: "Breast cancer and other solid tumors with selected PIK3CA alterations",
    sponsor: "Eli Lilly and Company",
    tldr: "This early study tests LOXO-783 alone and with other cancer treatments in tumors with selected PIK3CA gene changes. It looks at safety, dose and early treatment activity.",
    summary: "This early study tests LOXO-783 alone and with other cancer treatments in tumors with selected PIK3CA gene changes. It looks at safety, dose and early treatment activity.\n\nInterventional study registered as NCT05307705, sponsored by Eli Lilly and Company. Registry phase: 1. Registry enrollment is 260 participants (estimated). Registry status checked October 10, 2026: recruiting. UCSF lists this study as open to eligible people; local availability and overall registry status are separate. See the registry for full eligibility and current sites.",
    asOf: "2026-10-10",
    cancers: [
      "breast-cancer"
    ],
    institutions: [
      "ucsf"
    ],
    tags: [
      "ucsf-breast-coverage",
      "interventional"
    ],
    links: [
      {
        label: "ClinicalTrials.gov NCT05307705",
        url: "https://clinicaltrials.gov/study/NCT05307705"
      },
      {
        label: "UCSF study listing and local availability",
        url: "https://clinicaltrials.ucsf.edu/trial/NCT05307705"
      }
    ],
    participation: [
      {
        nct: "NCT05307705",
        source: "https://clinicaltrials.gov/study/NCT05307705",
        fetchedAt: "2026-10-10T20:54:18.777694Z",
        studySha256: "533a300434ca82aa8b4b9b13805e04759f348878d23a4eafceef25669809966f",
        overallStatus: "RECRUITING",
        leadSponsor: "Eli Lilly and Company",
        collaboratorCount: 0,
        hasEligibility: true,
        siteCount: 50,
        recruitingSiteCount: 17,
        countries: [
          "Australia",
          "Belgium",
          "Canada",
          "China",
          "France",
          "Germany",
          "Japan",
          "Singapore",
          "South Korea",
          "Spain",
          "United Kingdom",
          "United States"
        ],
        minimumAge: "18 Years",
        sex: "ALL",
        healthyVolunteers: false,
        enrolment: 260,
        enrolmentType: "ESTIMATED",
        lastUpdatePosted: "2026-09-08"
      }
    ],
    status: "recruiting",
    started: "2022-05-11",
    startedType: "actual",
    drugs: [
      "abemaciclib",
      "fulvestrant",
      "imlunestrant",
      "paclitaxel"
    ]
  },
  {
    id: "nct05020574",
    kind: "trial",
    name: "Breast microbiome and implant infections",
    aka: [
      "Microbiome and Association With Implant Infections"
    ],
    nct: "NCT05020574",
    phase: "2",
    setting: "Mastectomy and tissue-expander breast reconstruction",
    sponsor: "University of California, San Francisco",
    tldr: "This study examines whether bacteria in breast tissue are associated with infections after reconstruction. It also studies how an antibiotic changes the breast microbiome.",
    summary: "This study examines whether bacteria in breast tissue are associated with infections after reconstruction. It also studies how an antibiotic changes the breast microbiome.\n\nInterventional study registered as NCT05020574, sponsored by University of California, San Francisco. Registry phase: 2. Registry enrollment is 200 participants (estimated). Registry status checked October 10, 2026: recruiting. UCSF lists this study as open to eligible people; local availability and overall registry status are separate. See the registry for full eligibility and current sites.",
    asOf: "2026-10-10",
    cancers: [
      "breast-cancer"
    ],
    institutions: [
      "ucsf"
    ],
    tags: [
      "ucsf-breast-coverage",
      "interventional"
    ],
    links: [
      {
        label: "ClinicalTrials.gov NCT05020574",
        url: "https://clinicaltrials.gov/study/NCT05020574"
      },
      {
        label: "UCSF study listing and local availability",
        url: "https://clinicaltrials.ucsf.edu/trial/NCT05020574"
      }
    ],
    participation: [
      {
        nct: "NCT05020574",
        source: "https://clinicaltrials.gov/study/NCT05020574",
        fetchedAt: "2026-10-10T20:54:18.804056Z",
        studySha256: "b7306f890c2a9e6c6a978696e8e810aa7cb5c4879eb1342c1f3caf6465098b17",
        overallStatus: "RECRUITING",
        leadSponsor: "University of California, San Francisco",
        collaboratorCount: 1,
        hasEligibility: true,
        siteCount: 1,
        recruitingSiteCount: 1,
        countries: [
          "United States"
        ],
        minimumAge: "18 Years",
        sex: "FEMALE",
        healthyVolunteers: false,
        enrolment: 200,
        enrolmentType: "ESTIMATED",
        lastUpdatePosted: "2026-03-18"
      }
    ],
    status: "recruiting",
    started: "2021-09-28",
    startedType: "actual",
    drugs: []
  },
  {
    id: "nct07121972",
    kind: "trial",
    name: "Mirai-MRI breast screening",
    aka: [
      "Mirai-MRI: Validation of AI Models for Breast Cancer Risk"
    ],
    nct: "NCT07121972",
    phase: "not-applicable",
    setting: "Supplemental MRI screening selected by an AI breast-risk model",
    sponsor: "University of California, San Francisco",
    tldr: "This study uses an AI risk assessment to select people for additional breast MRI screening. It measures cancer detection rather than testing treatment for an existing cancer.",
    summary: "This study uses an AI risk assessment to select people for additional breast MRI screening. It measures cancer detection rather than testing treatment for an existing cancer.\n\nInterventional study registered as NCT07121972, sponsored by University of California, San Francisco. No drug-development phase applies in the structured registry record. Registry enrollment is 400 participants (estimated). Registry status checked October 10, 2026: recruiting. UCSF lists this study as open to eligible people; local availability and overall registry status are separate. See the registry for full eligibility and current sites.",
    asOf: "2026-10-10",
    cancers: [
      "breast-cancer"
    ],
    institutions: [
      "ucsf"
    ],
    tags: [
      "ucsf-breast-coverage",
      "interventional"
    ],
    links: [
      {
        label: "ClinicalTrials.gov NCT07121972",
        url: "https://clinicaltrials.gov/study/NCT07121972"
      },
      {
        label: "UCSF study listing and local availability",
        url: "https://clinicaltrials.ucsf.edu/trial/NCT07121972"
      }
    ],
    participation: [
      {
        nct: "NCT07121972",
        source: "https://clinicaltrials.gov/study/NCT07121972",
        fetchedAt: "2026-10-10T20:54:18.804312Z",
        studySha256: "0a7c1c362281693aae26589b1faec199e480246bdb9298ed5c962cfedddd239c",
        overallStatus: "RECRUITING",
        leadSponsor: "University of California, San Francisco",
        collaboratorCount: 1,
        hasEligibility: true,
        siteCount: 4,
        recruitingSiteCount: 2,
        countries: [
          "United States"
        ],
        minimumAge: "40 Years",
        maximumAge: "89 Years",
        sex: "FEMALE",
        healthyVolunteers: true,
        enrolment: 400,
        enrolmentType: "ESTIMATED",
        lastUpdatePosted: "2025-11-06"
      }
    ],
    status: "recruiting",
    started: "2025-11-03",
    startedType: "actual",
    drugs: []
  },
  {
    id: "nct05107674",
    kind: "trial",
    name: "NX-1607 in advanced malignancies",
    aka: [
      "A Study of NX-1607 in Adults With Advanced Malignancies"
    ],
    nct: "NCT05107674",
    phase: "1",
    setting: "Selected advanced cancers, including triple-negative breast cancer",
    sponsor: "Nurix Therapeutics, Inc.",
    tldr: "This early study tests NX-1607 alone or with paclitaxel in selected advanced cancers. It seeks a tolerable dose and early evidence of treatment activity.",
    summary: "This early study tests NX-1607 alone or with paclitaxel in selected advanced cancers. It seeks a tolerable dose and early evidence of treatment activity.\n\nInterventional study registered as NCT05107674, sponsored by Nurix Therapeutics, Inc.. Registry phase: 1. Registry enrollment is 345 participants (estimated). Registry status checked October 10, 2026: recruiting. UCSF lists this study as open to eligible people; local availability and overall registry status are separate. See the registry for full eligibility and current sites.",
    asOf: "2026-10-10",
    cancers: [
      "breast-cancer",
      "tnbc"
    ],
    institutions: [
      "ucsf"
    ],
    tags: [
      "ucsf-breast-coverage",
      "interventional"
    ],
    links: [
      {
        label: "ClinicalTrials.gov NCT05107674",
        url: "https://clinicaltrials.gov/study/NCT05107674"
      },
      {
        label: "UCSF study listing and local availability",
        url: "https://clinicaltrials.ucsf.edu/trial/NCT05107674"
      }
    ],
    participation: [
      {
        nct: "NCT05107674",
        source: "https://clinicaltrials.gov/study/NCT05107674",
        fetchedAt: "2026-10-10T20:54:18.913369Z",
        studySha256: "13fd6f5034e1b5a9b021f93e491bf9c04046e63a98674d4e38bd8e204422b100",
        overallStatus: "RECRUITING",
        leadSponsor: "Nurix Therapeutics, Inc.",
        collaboratorCount: 0,
        hasEligibility: true,
        siteCount: 17,
        recruitingSiteCount: 15,
        countries: [
          "United Kingdom",
          "United States"
        ],
        minimumAge: "18 Years",
        sex: "ALL",
        healthyVolunteers: false,
        enrolment: 345,
        enrolmentType: "ESTIMATED",
        lastUpdatePosted: "2025-09-09"
      }
    ],
    status: "recruiting",
    started: "2021-09-29",
    startedType: "actual",
    drugs: [
      "paclitaxel"
    ]
  },
  {
    id: "nct06648278",
    kind: "trial",
    name: "COUNTS 2.0 virtual patient navigation",
    aka: [
      "Patient Care Outreach, Navigation, Technology and Support 2.0"
    ],
    nct: "NCT06648278",
    phase: "not-applicable",
    setting: "Breast cancer or cardiovascular disease in underserved communities",
    sponsor: "University of California, San Francisco",
    tldr: "COUNTS 2.0 tests a virtual service that helps people navigate their care. It measures use, satisfaction and access to support.",
    summary: "COUNTS 2.0 tests a virtual service that helps people navigate their care. It measures use, satisfaction and access to support.\n\nInterventional study registered as NCT06648278, sponsored by University of California, San Francisco. No drug-development phase applies in the structured registry record. Registry enrollment is 260 participants (estimated). Registry status checked October 10, 2026: recruiting. UCSF lists this study as open to eligible people; local availability and overall registry status are separate. See the registry for full eligibility and current sites.",
    asOf: "2026-10-10",
    cancers: [
      "breast-cancer"
    ],
    institutions: [
      "ucsf"
    ],
    tags: [
      "ucsf-breast-coverage",
      "interventional"
    ],
    links: [
      {
        label: "ClinicalTrials.gov NCT06648278",
        url: "https://clinicaltrials.gov/study/NCT06648278"
      },
      {
        label: "UCSF study listing and local availability",
        url: "https://clinicaltrials.ucsf.edu/trial/NCT06648278"
      }
    ],
    participation: [
      {
        nct: "NCT06648278",
        source: "https://clinicaltrials.gov/study/NCT06648278",
        fetchedAt: "2026-10-10T20:54:19.098675Z",
        studySha256: "801a8f35238790d5ddbeedde93b5eded600e3640cc168ebd4b8ba1055cd9495f",
        overallStatus: "RECRUITING",
        leadSponsor: "University of California, San Francisco",
        collaboratorCount: 0,
        hasEligibility: true,
        siteCount: 2,
        recruitingSiteCount: 2,
        countries: [
          "United States"
        ],
        minimumAge: "18 Years",
        sex: "ALL",
        healthyVolunteers: false,
        enrolment: 260,
        enrolmentType: "ESTIMATED",
        lastUpdatePosted: "2026-01-13"
      }
    ],
    status: "recruiting",
    started: "2023-08-10",
    startedType: "actual",
    drugs: []
  },
  {
    id: "nct07487844",
    kind: "trial",
    name: "Pulsed electric field ablation in metastatic breast cancer",
    aka: [
      "Pulsed Electric Field Ablation for Metastatic Breast Cancer"
    ],
    nct: "NCT07487844",
    phase: "not-applicable",
    setting: "Metastatic breast cancer",
    sponsor: "University of California, San Francisco",
    tldr: "This study tests a procedure that uses brief electrical pulses to treat a tumor in people with metastatic breast cancer. It evaluates the procedure rather than a new drug.",
    summary: "This study tests a procedure that uses brief electrical pulses to treat a tumor in people with metastatic breast cancer. It evaluates the procedure rather than a new drug.\n\nInterventional study registered as NCT07487844, sponsored by University of California, San Francisco. No drug-development phase applies in the structured registry record. Registry enrollment is 20 participants (estimated). Registry status checked October 10, 2026: recruiting. UCSF lists this study as open to eligible people; local availability and overall registry status are separate. See the registry for full eligibility and current sites.",
    asOf: "2026-10-10",
    cancers: [
      "breast-cancer"
    ],
    institutions: [
      "ucsf"
    ],
    tags: [
      "ucsf-breast-coverage",
      "interventional"
    ],
    links: [
      {
        label: "ClinicalTrials.gov NCT07487844",
        url: "https://clinicaltrials.gov/study/NCT07487844"
      },
      {
        label: "UCSF study listing and local availability",
        url: "https://clinicaltrials.ucsf.edu/trial/NCT07487844"
      }
    ],
    participation: [
      {
        nct: "NCT07487844",
        source: "https://clinicaltrials.gov/study/NCT07487844",
        fetchedAt: "2026-10-10T20:54:19.098802Z",
        studySha256: "ac3459aad82fdf9110c37c4b747a301e1c4e2a1eec393b06222824be3629bf65",
        overallStatus: "RECRUITING",
        leadSponsor: "University of California, San Francisco",
        collaboratorCount: 2,
        hasEligibility: true,
        siteCount: 1,
        recruitingSiteCount: 1,
        countries: [
          "United States"
        ],
        minimumAge: "18 Years",
        sex: "ALL",
        healthyVolunteers: false,
        enrolment: 20,
        enrolmentType: "ESTIMATED",
        lastUpdatePosted: "2026-09-18"
      }
    ],
    status: "recruiting",
    started: "2026-06-29",
    startedType: "actual",
    drugs: []
  },
  {
    id: "nct06533826",
    kind: "trial",
    name: "TRADE DXd",
    aka: [
      "TReatment of ADC-Refractory Breast CancEr With Dato-DXd or T-DXd: TRADE DXd"
    ],
    nct: "NCT06533826",
    phase: "2",
    setting: "HER2-negative metastatic breast cancer, including HER2-low disease",
    sponsor: "Ana C Garrido-Castro, MD",
    tldr: "TRADE DXd studies the order of two antibody-linked drugs, trastuzumab deruxtecan and datopotamab deruxtecan. It asks how well one works after the other stops controlling the cancer.",
    summary: "TRADE DXd studies the order of two antibody-linked drugs, trastuzumab deruxtecan and datopotamab deruxtecan. It asks how well one works after the other stops controlling the cancer.\n\nInterventional study registered as NCT06533826, sponsored by Ana C Garrido-Castro, MD. Registry phase: 2. Registry enrollment is 357 participants (estimated). Registry status checked October 10, 2026: recruiting. UCSF lists this study as open to eligible people; local availability and overall registry status are separate. See the registry for full eligibility and current sites.",
    asOf: "2026-10-10",
    cancers: [
      "breast-cancer"
    ],
    institutions: [
      "ucsf"
    ],
    tags: [
      "ucsf-breast-coverage",
      "interventional"
    ],
    links: [
      {
        label: "ClinicalTrials.gov NCT06533826",
        url: "https://clinicaltrials.gov/study/NCT06533826"
      },
      {
        label: "UCSF study listing and local availability",
        url: "https://clinicaltrials.ucsf.edu/trial/NCT06533826"
      }
    ],
    participation: [
      {
        nct: "NCT06533826",
        source: "https://clinicaltrials.gov/study/NCT06533826",
        fetchedAt: "2026-10-10T20:54:19.150632Z",
        studySha256: "eb6773c39dc4a205db47ad372a89196720f1b2065eb4d6015e75c271b3663198",
        overallStatus: "RECRUITING",
        leadSponsor: "Ana C Garrido-Castro, MD",
        collaboratorCount: 2,
        hasEligibility: true,
        siteCount: 11,
        recruitingSiteCount: 10,
        countries: [
          "United States"
        ],
        minimumAge: "18 Years",
        sex: "ALL",
        healthyVolunteers: false,
        enrolment: 357,
        enrolmentType: "ESTIMATED",
        lastUpdatePosted: "2026-08-26"
      }
    ],
    status: "recruiting",
    started: "2024-10-29",
    startedType: "actual",
    drugs: [
      "datopotamab-deruxtecan",
      "trastuzumab-deruxtecan"
    ]
  },
  {
    id: "nct05964504",
    kind: "trial",
    name: "PLUMB metastatic lobular breast cancer registry",
    aka: [
      "Improving Survival for Metastatic Lobular Breast Cancer (PLUMB Registry)"
    ],
    nct: "NCT05964504",
    phase: "observational",
    setting: "Metastatic invasive lobular breast cancer",
    sponsor: "University of California, San Francisco",
    tldr: "PLUMB follows people with metastatic lobular breast cancer and collects clinical data and samples. It aims to improve how treatment response is measured for this cancer subtype.",
    summary: "PLUMB follows people with metastatic lobular breast cancer and collects clinical data and samples. It aims to improve how treatment response is measured for this cancer subtype.\n\nObservational study registered as NCT05964504, sponsored by University of California, San Francisco. Registry enrollment is 150 participants (estimated). Registry status checked October 10, 2026: recruiting. UCSF lists this study as open to eligible people; local availability and overall registry status are separate. See the registry for full eligibility and current sites.",
    asOf: "2026-10-10",
    cancers: [
      "breast-cancer"
    ],
    institutions: [
      "ucsf"
    ],
    tags: [
      "ucsf-breast-coverage",
      "observational"
    ],
    links: [
      {
        label: "ClinicalTrials.gov NCT05964504",
        url: "https://clinicaltrials.gov/study/NCT05964504"
      },
      {
        label: "UCSF study listing and local availability",
        url: "https://clinicaltrials.ucsf.edu/trial/NCT05964504"
      }
    ],
    participation: [
      {
        nct: "NCT05964504",
        source: "https://clinicaltrials.gov/study/NCT05964504",
        fetchedAt: "2026-10-10T20:54:19.184724Z",
        studySha256: "c2d678bd9685500d63e9163cfe1d0fb662554c221c0782c5061f2d92427a2278",
        overallStatus: "RECRUITING",
        leadSponsor: "University of California, San Francisco",
        collaboratorCount: 1,
        hasEligibility: true,
        siteCount: 4,
        recruitingSiteCount: 4,
        countries: [
          "United States"
        ],
        minimumAge: "18 Years",
        sex: "ALL",
        healthyVolunteers: false,
        enrolment: 150,
        enrolmentType: "ESTIMATED",
        lastUpdatePosted: "2026-09-02"
      }
    ],
    status: "recruiting",
    started: "2023-12-20",
    startedType: "actual",
    drugs: []
  },
  {
    id: "nct05902507",
    kind: "trial",
    name: "MRI simulation for breast radiotherapy",
    aka: [
      "Magnetic Resonance Imaging in Radiotherapy for Breast Cancer"
    ],
    nct: "NCT05902507",
    phase: "observational",
    setting: "Breast cancer radiation treatment planning",
    sponsor: "University of California, San Francisco",
    tldr: "This study evaluates using MRI to plan breast radiation treatment. It examines whether the scans can be incorporated into routine planning and improve it.",
    summary: "This study evaluates using MRI to plan breast radiation treatment. It examines whether the scans can be incorporated into routine planning and improve it.\n\nObservational study registered as NCT05902507, sponsored by University of California, San Francisco. Registry enrollment is 20 participants (estimated). Registry status checked October 10, 2026: recruiting. UCSF lists this study as open to eligible people; local availability and overall registry status are separate. See the registry for full eligibility and current sites.",
    asOf: "2026-10-10",
    cancers: [
      "breast-cancer"
    ],
    institutions: [
      "ucsf"
    ],
    tags: [
      "ucsf-breast-coverage",
      "observational"
    ],
    links: [
      {
        label: "ClinicalTrials.gov NCT05902507",
        url: "https://clinicaltrials.gov/study/NCT05902507"
      },
      {
        label: "UCSF study listing and local availability",
        url: "https://clinicaltrials.ucsf.edu/trial/NCT05902507"
      }
    ],
    participation: [
      {
        nct: "NCT05902507",
        source: "https://clinicaltrials.gov/study/NCT05902507",
        fetchedAt: "2026-10-10T20:54:19.344921Z",
        studySha256: "65eaab0f08d4c78f46c9a7172c7d157eda5ee3e38332e44596c99e41f4e85996",
        overallStatus: "RECRUITING",
        leadSponsor: "University of California, San Francisco",
        collaboratorCount: 0,
        hasEligibility: true,
        siteCount: 1,
        recruitingSiteCount: 1,
        countries: [
          "United States"
        ],
        minimumAge: "18 Years",
        sex: "ALL",
        healthyVolunteers: false,
        enrolment: 20,
        enrolmentType: "ESTIMATED",
        lastUpdatePosted: "2026-06-11"
      }
    ],
    status: "recruiting",
    started: "2023-05-15",
    startedType: "actual",
    drugs: []
  },
  {
    id: "nct03053193",
    kind: "trial",
    name: "FLEX breast cancer gene-expression registry",
    aka: [
      "MammaPrint, BluePrint, and Full-genome Data Linked With Clinical Data to Evaluate New Gene EXpression Profiles"
    ],
    nct: "NCT03053193",
    phase: "observational",
    setting: "Stage I to III breast cancer with MammaPrint and BluePrint testing",
    sponsor: "Agendia",
    tldr: "FLEX links breast tumor gene-expression tests with clinical outcomes. It is a registry for studying new patterns in the data, rather than assigning a new treatment.",
    summary: "FLEX links breast tumor gene-expression tests with clinical outcomes. It is a registry for studying new patterns in the data, rather than assigning a new treatment.\n\nObservational study registered as NCT03053193, sponsored by Agendia. Registry enrollment is 30,000 participants (estimated). Registry status checked October 10, 2026: recruiting. UCSF lists this study as open to eligible people; local availability and overall registry status are separate. See the registry for full eligibility and current sites.",
    asOf: "2026-10-10",
    cancers: [
      "breast-cancer"
    ],
    institutions: [
      "ucsf"
    ],
    tags: [
      "ucsf-breast-coverage",
      "observational"
    ],
    links: [
      {
        label: "ClinicalTrials.gov NCT03053193",
        url: "https://clinicaltrials.gov/study/NCT03053193"
      },
      {
        label: "UCSF study listing and local availability",
        url: "https://clinicaltrials.ucsf.edu/trial/NCT03053193"
      }
    ],
    participation: [
      {
        nct: "NCT03053193",
        source: "https://clinicaltrials.gov/study/NCT03053193",
        fetchedAt: "2026-10-10T20:54:19.419491Z",
        studySha256: "aa14da5ef85472365cca29342fa88143ab79a40f58748520327782f724de22a8",
        overallStatus: "RECRUITING",
        leadSponsor: "Agendia",
        collaboratorCount: 0,
        hasEligibility: true,
        siteCount: 134,
        recruitingSiteCount: 117,
        countries: [
          "Canada",
          "Greece",
          "Israel",
          "United States"
        ],
        minimumAge: "18 Years",
        sex: "ALL",
        healthyVolunteers: false,
        enrolment: 30000,
        enrolmentType: "ESTIMATED",
        lastUpdatePosted: "2025-08-20"
      }
    ],
    status: "recruiting",
    started: "2017-04-28",
    startedType: "actual",
    drugs: []
  },
  {
    id: "nct07546331",
    kind: "trial",
    name: "Body composition and breast reconstruction outcomes",
    aka: [
      "Novel Body Composition Measurements in Association With Outcomes of Breast Reconstruction Reconstruction"
    ],
    nct: "NCT07546331",
    phase: "observational",
    setting: "Breast reconstruction",
    sponsor: "University of California, San Francisco",
    tldr: "This study collects body composition measurements and compares them with breast reconstruction outcomes. It is an observational study, not a trial of cancer treatment.",
    summary: "This study collects body composition measurements and compares them with breast reconstruction outcomes. It is an observational study, not a trial of cancer treatment.\n\nObservational study registered as NCT07546331, sponsored by University of California, San Francisco. Registry enrollment is 40 participants (estimated). Registry status checked October 10, 2026: recruiting. UCSF lists this study as open to eligible people; local availability and overall registry status are separate. See the registry for full eligibility and current sites.",
    asOf: "2026-10-10",
    cancers: [
      "breast-cancer"
    ],
    institutions: [
      "ucsf"
    ],
    tags: [
      "ucsf-breast-coverage",
      "observational"
    ],
    links: [
      {
        label: "ClinicalTrials.gov NCT07546331",
        url: "https://clinicaltrials.gov/study/NCT07546331"
      },
      {
        label: "UCSF study listing and local availability",
        url: "https://clinicaltrials.ucsf.edu/trial/NCT07546331"
      }
    ],
    participation: [
      {
        nct: "NCT07546331",
        source: "https://clinicaltrials.gov/study/NCT07546331",
        fetchedAt: "2026-10-10T20:54:19.458765Z",
        studySha256: "e476fb209ce73132d1a6a248f4e392fea511d8f122b189a38b11180b729bef97",
        overallStatus: "RECRUITING",
        leadSponsor: "University of California, San Francisco",
        collaboratorCount: 0,
        hasEligibility: true,
        siteCount: 1,
        recruitingSiteCount: 1,
        countries: [
          "United States"
        ],
        minimumAge: "18 Years",
        sex: "ALL",
        healthyVolunteers: false,
        enrolment: 40,
        enrolmentType: "ESTIMATED",
        lastUpdatePosted: "2026-04-22"
      }
    ],
    status: "recruiting",
    started: "2026-02-18",
    startedType: "actual",
    drugs: []
  },
  {
    id: "nct06551116",
    kind: "trial",
    name: "QuantifyHER",
    aka: [
      "QuantifyHER: Quantitative Immunofluorescence and/or RT-qPCR for Measuring HER2 in HER2-low Metastatic Breast Cancer"
    ],
    nct: "NCT06551116",
    phase: "observational",
    setting: "HER2-low metastatic breast cancer receiving trastuzumab deruxtecan",
    sponsor: "Abramson Cancer Center at Penn Medicine",
    tldr: "QuantifyHER evaluates more precise ways to measure HER2 in tumors. It asks whether these measurements help distinguish people who respond to trastuzumab deruxtecan from those who do not.",
    summary: "QuantifyHER evaluates more precise ways to measure HER2 in tumors. It asks whether these measurements help distinguish people who respond to trastuzumab deruxtecan from those who do not.\n\nObservational study registered as NCT06551116, sponsored by Abramson Cancer Center at Penn Medicine. Registry enrollment is 200 participants (estimated). Registry status checked October 10, 2026: recruiting. UCSF lists this study as open to eligible people; local availability and overall registry status are separate. See the registry for full eligibility and current sites.",
    asOf: "2026-10-10",
    cancers: [
      "breast-cancer"
    ],
    institutions: [
      "ucsf"
    ],
    tags: [
      "ucsf-breast-coverage",
      "observational"
    ],
    links: [
      {
        label: "ClinicalTrials.gov NCT06551116",
        url: "https://clinicaltrials.gov/study/NCT06551116"
      },
      {
        label: "UCSF study listing and local availability",
        url: "https://clinicaltrials.ucsf.edu/trial/NCT06551116"
      }
    ],
    participation: [
      {
        nct: "NCT06551116",
        source: "https://clinicaltrials.gov/study/NCT06551116",
        fetchedAt: "2026-10-10T20:54:19.475932Z",
        studySha256: "29bdcd90712e9c920da05c3a6c2f6a9976d97a6b39b70f383c41eac68e8da5ad",
        overallStatus: "RECRUITING",
        leadSponsor: "Abramson Cancer Center at Penn Medicine",
        collaboratorCount: 2,
        hasEligibility: true,
        siteCount: 37,
        recruitingSiteCount: 37,
        countries: [
          "United States"
        ],
        minimumAge: "18 Years",
        sex: "ALL",
        healthyVolunteers: false,
        enrolment: 200,
        enrolmentType: "ESTIMATED",
        lastUpdatePosted: "2026-07-08"
      }
    ],
    status: "recruiting",
    started: "2024-10-10",
    startedType: "actual",
    drugs: []
  },
  {
    id: "nct06774027",
    kind: "trial",
    name: "Breast cancer ADC treatment registry",
    aka: [
      "Prospective Registry of ADC as First- and Second-line Treatment for Breast Cancer"
    ],
    nct: "NCT06774027",
    phase: "observational",
    setting: "Metastatic HER2-negative breast cancer treated with approved antibody-drug conjugates",
    sponsor: "University of California, San Francisco",
    tldr: "This registry follows people receiving approved antibody-linked drugs as part of routine breast cancer care. It studies outcomes when these drugs are used in sequence without assigning the treatment.",
    summary: "This registry follows people receiving approved antibody-linked drugs as part of routine breast cancer care. It studies outcomes when these drugs are used in sequence without assigning the treatment.\n\nObservational study registered as NCT06774027, sponsored by University of California, San Francisco. Registry enrollment is 100 participants (estimated). Registry status checked October 10, 2026: recruiting. UCSF lists this study as open to eligible people; local availability and overall registry status are separate. See the registry for full eligibility and current sites.",
    asOf: "2026-10-10",
    cancers: [
      "breast-cancer",
      "tnbc"
    ],
    institutions: [
      "ucsf"
    ],
    tags: [
      "ucsf-breast-coverage",
      "observational"
    ],
    links: [
      {
        label: "ClinicalTrials.gov NCT06774027",
        url: "https://clinicaltrials.gov/study/NCT06774027"
      },
      {
        label: "UCSF study listing and local availability",
        url: "https://clinicaltrials.ucsf.edu/trial/NCT06774027"
      }
    ],
    participation: [
      {
        nct: "NCT06774027",
        source: "https://clinicaltrials.gov/study/NCT06774027",
        fetchedAt: "2026-10-10T20:54:19.644702Z",
        studySha256: "789fc54800f7b1aa217266c2aecfc93f0c3d957e21375dea337f5d019c91049e",
        overallStatus: "RECRUITING",
        leadSponsor: "University of California, San Francisco",
        collaboratorCount: 3,
        hasEligibility: true,
        siteCount: 1,
        recruitingSiteCount: 1,
        countries: [
          "United States"
        ],
        minimumAge: "18 Years",
        sex: "ALL",
        healthyVolunteers: true,
        enrolment: 100,
        enrolmentType: "ESTIMATED",
        lastUpdatePosted: "2025-12-18"
      }
    ],
    status: "recruiting",
    started: "2025-10-08",
    startedType: "actual",
    drugs: []
  },
  {
    id: "nct03452774",
    kind: "trial",
    name: "SYNERGY-AI trial matching registry",
    aka: [
      "SYNERGY-AI: Artificial Intelligence Based Precision Oncology Clinical Trial Matching and Registry"
    ],
    nct: "NCT03452774",
    phase: "observational",
    setting: "Cancer clinical trial matching and registry follow-up",
    sponsor: "Massive Bio, Inc.",
    tldr: "SYNERGY-AI evaluates an AI-assisted service for matching people with cancer to clinical trials. It studies matching and enrollment, not the effectiveness of a particular cancer drug.",
    summary: "SYNERGY-AI evaluates an AI-assisted service for matching people with cancer to clinical trials. It studies matching and enrollment, not the effectiveness of a particular cancer drug.\n\nObservational study registered as NCT03452774, sponsored by Massive Bio, Inc.. Registry enrollment is 50,000 participants (estimated). Registry status checked October 10, 2026: recruiting. UCSF lists this study as open to eligible people; local availability and overall registry status are separate. See the registry for full eligibility and current sites.",
    asOf: "2026-10-10",
    cancers: [
      "breast-cancer"
    ],
    institutions: [
      "ucsf"
    ],
    tags: [
      "ucsf-breast-coverage",
      "observational"
    ],
    links: [
      {
        label: "ClinicalTrials.gov NCT03452774",
        url: "https://clinicaltrials.gov/study/NCT03452774"
      },
      {
        label: "UCSF study listing and local availability",
        url: "https://clinicaltrials.ucsf.edu/trial/NCT03452774"
      }
    ],
    participation: [
      {
        nct: "NCT03452774",
        source: "https://clinicaltrials.gov/study/NCT03452774",
        fetchedAt: "2026-10-10T20:54:19.927530Z",
        studySha256: "7c12c1747b3cd24068ae30aab95b778fbaca9b1d653b166f77c198bd6fab067a",
        overallStatus: "RECRUITING",
        leadSponsor: "Massive Bio, Inc.",
        collaboratorCount: 0,
        hasEligibility: true,
        siteCount: 68,
        recruitingSiteCount: 68,
        countries: [
          "Puerto Rico",
          "United States"
        ],
        sex: "ALL",
        healthyVolunteers: false,
        enrolment: 50000,
        enrolmentType: "ESTIMATED",
        lastUpdatePosted: "2025-10-28"
      }
    ],
    status: "recruiting",
    started: "2018-01-01",
    startedType: "actual",
    drugs: []
  },
  {
    id: "nct06671912",
    kind: "trial",
    name: "LoTam low-dose tamoxifen",
    aka: [
      "Testing Low Dose Tamoxifen for Invasive Breast Cancer, LoTam Trial"
    ],
    nct: "NCT06671912",
    phase: "3",
    setting: "Postmenopausal hormone receptor-positive, HER2-negative early breast cancer",
    sponsor: "Alliance for Clinical Trials in Oncology",
    tldr: "LoTam compares low-dose tamoxifen with usual hormone therapy after early breast cancer. The registry currently marks the study suspended.",
    summary: "LoTam compares low-dose tamoxifen with usual hormone therapy after early breast cancer. The registry currently marks the study suspended.\n\nInterventional study registered as NCT06671912, sponsored by Alliance for Clinical Trials in Oncology. Registry phase: 3. Registry enrollment is 1,556 participants (estimated). Registry status checked October 10, 2026: suspended. UCSF lists this study as closed to local enrollment; local availability and overall registry status are separate. See the registry for full eligibility and current sites.",
    asOf: "2026-10-10",
    cancers: [
      "breast-cancer"
    ],
    institutions: [
      "ucsf"
    ],
    tags: [
      "ucsf-breast-coverage",
      "interventional"
    ],
    links: [
      {
        label: "ClinicalTrials.gov NCT06671912",
        url: "https://clinicaltrials.gov/study/NCT06671912"
      },
      {
        label: "UCSF study listing and local availability",
        url: "https://clinicaltrials.ucsf.edu/trial/NCT06671912"
      }
    ],
    participation: [
      {
        nct: "NCT06671912",
        source: "https://clinicaltrials.gov/study/NCT06671912",
        fetchedAt: "2026-10-10T20:54:19.990390Z",
        studySha256: "79bea5b2fabea025ffe42784c7eb230b92185be839ebd1ecb0706e49c3651ee1",
        overallStatus: "SUSPENDED",
        leadSponsor: "Alliance for Clinical Trials in Oncology",
        collaboratorCount: 1,
        hasEligibility: true,
        siteCount: 732,
        recruitingSiteCount: 0,
        countries: [
          "Puerto Rico",
          "United States"
        ],
        minimumAge: "18 Years",
        sex: "ALL",
        healthyVolunteers: false,
        enrolment: 1556,
        enrolmentType: "ESTIMATED",
        lastUpdatePosted: "2026-09-02",
        whyStopped: "Amending protocol to increase sample size"
      }
    ],
    started: "2025-02-19",
    startedType: "actual",
    drugs: [
      "anastrozole",
      "exemestane",
      "letrozole",
      "tamoxifen"
    ]
  },
  {
    id: "nct02779751",
    kind: "trial",
    name: "Abemaciclib with pembrolizumab in breast or lung cancer",
    aka: [
      "A Study of Abemaciclib (LY2835219) in Participants With Non-Small Cell Lung Cancer or Breast Cancer"
    ],
    nct: "NCT02779751",
    phase: "1",
    setting: "Advanced hormone receptor-positive, HER2-negative breast cancer or non-small cell lung cancer",
    sponsor: "Eli Lilly and Company",
    tldr: "This early study tests abemaciclib with pembrolizumab in selected advanced breast and lung cancers. It examines safety and treatment activity.",
    summary: "This early study tests abemaciclib with pembrolizumab in selected advanced breast and lung cancers. It examines safety and treatment activity.\n\nInterventional study registered as NCT02779751, sponsored by Eli Lilly and Company. Registry phase: 1. Registry enrollment is 100 participants (estimated). Registry status checked October 10, 2026: active not recruiting. UCSF lists this study as closed to local enrollment; local availability and overall registry status are separate. See the registry for full eligibility and current sites.",
    asOf: "2026-10-10",
    cancers: [
      "breast-cancer"
    ],
    institutions: [
      "ucsf"
    ],
    tags: [
      "ucsf-breast-coverage",
      "interventional"
    ],
    links: [
      {
        label: "ClinicalTrials.gov NCT02779751",
        url: "https://clinicaltrials.gov/study/NCT02779751"
      },
      {
        label: "UCSF study listing and local availability",
        url: "https://clinicaltrials.ucsf.edu/trial/NCT02779751"
      }
    ],
    participation: [
      {
        nct: "NCT02779751",
        source: "https://clinicaltrials.gov/study/NCT02779751",
        fetchedAt: "2026-10-10T20:54:19.775509Z",
        studySha256: "2651020b1b1128c9e0ee56df60a3db867453fee03b4000c7aa5b720ca865dff5",
        overallStatus: "ACTIVE_NOT_RECRUITING",
        leadSponsor: "Eli Lilly and Company",
        collaboratorCount: 1,
        hasEligibility: true,
        siteCount: 24,
        recruitingSiteCount: 0,
        countries: [
          "Belgium",
          "France",
          "Italy",
          "Spain",
          "Taiwan",
          "Turkey (Türkiye)",
          "United States"
        ],
        minimumAge: "18 Years",
        sex: "ALL",
        healthyVolunteers: false,
        enrolment: 100,
        enrolmentType: "ESTIMATED",
        lastUpdatePosted: "2026-01-26"
      }
    ],
    status: "active",
    started: "2016-11-14",
    startedType: "actual",
    drugs: [
      "abemaciclib",
      "anastrozole",
      "pembrolizumab"
    ]
  },
  {
    id: "nct00548236",
    kind: "trial",
    name: "Active After Cancer Trial",
    aka: [
      "The Active After Cancer Trial (AACT)"
    ],
    nct: "NCT00548236",
    phase: "not-applicable",
    setting: "Breast or colorectal cancer survivors after chemotherapy",
    sponsor: "Dana-Farber Cancer Institute",
    tldr: "This study tests whether telephone counseling helps cancer survivors become more physically active. It also follows fitness, fatigue and mood.",
    summary: "This study tests whether telephone counseling helps cancer survivors become more physically active. It also follows fitness, fatigue and mood.\n\nInterventional study registered as NCT00548236, sponsored by Dana-Farber Cancer Institute. No drug-development phase applies in the structured registry record. Registry enrollment is 120 participants (actual). Registry status checked October 10, 2026: active not recruiting. UCSF lists this study as closed to local enrollment; local availability and overall registry status are separate. See the registry for full eligibility and current sites.",
    asOf: "2026-10-10",
    cancers: [
      "breast-cancer"
    ],
    institutions: [
      "ucsf"
    ],
    tags: [
      "ucsf-breast-coverage",
      "interventional"
    ],
    links: [
      {
        label: "ClinicalTrials.gov NCT00548236",
        url: "https://clinicaltrials.gov/study/NCT00548236"
      },
      {
        label: "UCSF study listing and local availability",
        url: "https://clinicaltrials.ucsf.edu/trial/NCT00548236"
      }
    ],
    participation: [
      {
        nct: "NCT00548236",
        source: "https://clinicaltrials.gov/study/NCT00548236",
        fetchedAt: "2026-10-10T20:54:19.901503Z",
        studySha256: "def5d23b4136efb71b4d92216ee7eb29334895e6c75ccaa8477c5cc6062a2ed3",
        overallStatus: "ACTIVE_NOT_RECRUITING",
        leadSponsor: "Dana-Farber Cancer Institute",
        collaboratorCount: 1,
        hasEligibility: true,
        siteCount: 9,
        recruitingSiteCount: 0,
        countries: [
          "United States"
        ],
        minimumAge: "18 Years",
        sex: "ALL",
        healthyVolunteers: false,
        enrolment: 120,
        enrolmentType: "ACTUAL",
        lastUpdatePosted: "2026-02-23"
      }
    ],
    status: "active",
    enrolled: 120,
    started: "2007-10",
    startedType: "actual",
    drugs: []
  },
  {
    id: "nct06058377",
    kind: "trial",
    name: "Durvalumab with chemotherapy in high-risk early breast cancer",
    aka: [
      "Adding an Immunotherapy Drug, MEDI4736 (Durvalumab), to the Usual Chemotherapy Treatment (Paclitaxel, Cyclophosphamide, and Doxorubicin) for Stage II-III Breast Cancer"
    ],
    nct: "NCT06058377",
    phase: "3",
    setting: "Stage II to III hormone receptor-positive, HER2-negative breast cancer with MammaPrint High 2 risk",
    sponsor: "National Cancer Institute (NCI)",
    tldr: "This study compares usual chemotherapy with or without durvalumab in a selected high-risk group of early breast cancers. It asks whether adding immune treatment lowers the chance of a cancer-related event.",
    summary: "This study compares usual chemotherapy with or without durvalumab in a selected high-risk group of early breast cancers. It asks whether adding immune treatment lowers the chance of a cancer-related event.\n\nInterventional study registered as NCT06058377, sponsored by National Cancer Institute (NCI). Registry phase: 3. Registry enrollment is 3,680 participants (estimated). Registry status checked October 10, 2026: recruiting. UCSF lists this study as closed to local enrollment; local availability and overall registry status are separate. See the registry for full eligibility and current sites.",
    asOf: "2026-10-10",
    cancers: [
      "breast-cancer"
    ],
    institutions: [
      "ucsf"
    ],
    tags: [
      "ucsf-breast-coverage",
      "interventional"
    ],
    links: [
      {
        label: "ClinicalTrials.gov NCT06058377",
        url: "https://clinicaltrials.gov/study/NCT06058377"
      },
      {
        label: "UCSF study listing and local availability",
        url: "https://clinicaltrials.ucsf.edu/trial/NCT06058377"
      }
    ],
    participation: [
      {
        nct: "NCT06058377",
        source: "https://clinicaltrials.gov/study/NCT06058377",
        fetchedAt: "2026-10-10T20:54:20.454521Z",
        studySha256: "3bf0b6c83fae8394e2a00b0148439a059a1cedae51c7a920d456aaf9df16ad89",
        overallStatus: "RECRUITING",
        leadSponsor: "National Cancer Institute (NCI)",
        collaboratorCount: 0,
        hasEligibility: true,
        siteCount: 561,
        recruitingSiteCount: 542,
        countries: [
          "Puerto Rico",
          "United States"
        ],
        minimumAge: "18 Years",
        sex: "ALL",
        healthyVolunteers: false,
        enrolment: 3680,
        enrolmentType: "ESTIMATED",
        lastUpdatePosted: "2026-10-09"
      }
    ],
    status: "recruiting",
    started: "2023-11-27",
    startedType: "actual",
    drugs: [
      "cyclophosphamide",
      "doxorubicin",
      "durvalumab",
      "paclitaxel"
    ]
  },
  {
    id: "nct04379570",
    kind: "trial",
    name: "Text and telephone support for endocrine therapy",
    aka: [
      "Additional Support Program Via Text Messaging and Telephone-Based Counseling for Breast Cancer Patients Receiving Hormonal Therapy"
    ],
    nct: "NCT04379570",
    phase: "3",
    setting: "Breast cancer patients prescribed endocrine therapy",
    sponsor: "Alliance for Clinical Trials in Oncology",
    tldr: "This study compares usual care with text reminders and telephone counseling to support taking prescribed hormone therapy. It studies medication use rather than a new hormone drug.",
    summary: "This study compares usual care with text reminders and telephone counseling to support taking prescribed hormone therapy. It studies medication use rather than a new hormone drug.\n\nInterventional study registered as NCT04379570, sponsored by Alliance for Clinical Trials in Oncology. Registry phase: 3. Registry enrollment is 1,167 participants (actual). Registry status checked October 10, 2026: active not recruiting. UCSF lists this study as closed to local enrollment; local availability and overall registry status are separate. See the registry for full eligibility and current sites.",
    asOf: "2026-10-10",
    cancers: [
      "breast-cancer"
    ],
    institutions: [
      "ucsf"
    ],
    tags: [
      "ucsf-breast-coverage",
      "interventional"
    ],
    links: [
      {
        label: "ClinicalTrials.gov NCT04379570",
        url: "https://clinicaltrials.gov/study/NCT04379570"
      },
      {
        label: "UCSF study listing and local availability",
        url: "https://clinicaltrials.ucsf.edu/trial/NCT04379570"
      }
    ],
    participation: [
      {
        nct: "NCT04379570",
        source: "https://clinicaltrials.gov/study/NCT04379570",
        fetchedAt: "2026-10-10T20:54:20.368562Z",
        studySha256: "4fc99421d7cc1cbb33a74504ca5e31293e3ea8bc79fafcc3ffd4ab7183a44192",
        overallStatus: "ACTIVE_NOT_RECRUITING",
        leadSponsor: "Alliance for Clinical Trials in Oncology",
        collaboratorCount: 1,
        hasEligibility: true,
        siteCount: 526,
        recruitingSiteCount: 0,
        countries: [
          "United States"
        ],
        minimumAge: "18 Years",
        sex: "FEMALE",
        healthyVolunteers: false,
        enrolment: 1167,
        enrolmentType: "ACTUAL",
        lastUpdatePosted: "2026-10-01"
      }
    ],
    status: "active",
    enrolled: 1167,
    started: "2021-02-15",
    startedType: "actual",
    drugs: []
  },
  {
    id: "nct03971409",
    kind: "trial",
    name: "Avelumab combinations in advanced TNBC",
    aka: [
      "Avelumab With Binimetinib, Sacituzumab Govitecan, or Liposomal Doxorubicin in Treating Stage IV or Unresectable, Recurrent Triple Negative Breast Cancer"
    ],
    nct: "NCT03971409",
    phase: "2",
    setting: "Stage IV or unresectable recurrent triple-negative breast cancer",
    sponsor: "Laura Huppert, MD, BA",
    tldr: "This study tests avelumab with different drug combinations in advanced triple-negative breast cancer. Some groups receive treatment intended to stimulate the immune system before the main combination.",
    summary: "This study tests avelumab with different drug combinations in advanced triple-negative breast cancer. Some groups receive treatment intended to stimulate the immune system before the main combination.\n\nInterventional study registered as NCT03971409, sponsored by Laura Huppert, MD, BA. Registry phase: 2. Registry enrollment is 145 participants (actual). Registry status checked October 10, 2026: active not recruiting. UCSF lists this study as closed to local enrollment; local availability and overall registry status are separate. See the registry for full eligibility and current sites.",
    asOf: "2026-10-10",
    cancers: [
      "breast-cancer",
      "tnbc"
    ],
    institutions: [
      "ucsf"
    ],
    tags: [
      "ucsf-breast-coverage",
      "interventional"
    ],
    links: [
      {
        label: "ClinicalTrials.gov NCT03971409",
        url: "https://clinicaltrials.gov/study/NCT03971409"
      },
      {
        label: "UCSF study listing and local availability",
        url: "https://clinicaltrials.ucsf.edu/trial/NCT03971409"
      }
    ],
    participation: [
      {
        nct: "NCT03971409",
        source: "https://clinicaltrials.gov/study/NCT03971409",
        fetchedAt: "2026-10-10T20:54:20.296495Z",
        studySha256: "3fa049299222fdfb5ea522008a1ac72d47ddbb077fcd6241a95934a9a1b33f22",
        overallStatus: "ACTIVE_NOT_RECRUITING",
        leadSponsor: "Laura Huppert, MD, BA",
        collaboratorCount: 7,
        hasEligibility: true,
        siteCount: 12,
        recruitingSiteCount: 0,
        countries: [
          "United States"
        ],
        minimumAge: "18 Years",
        sex: "ALL",
        healthyVolunteers: false,
        enrolment: 145,
        enrolmentType: "ACTUAL",
        lastUpdatePosted: "2026-04-17"
      }
    ],
    status: "active",
    enrolled: 145,
    started: "2019-07-08",
    startedType: "actual",
    drugs: [
      "avelumab",
      "binimetinib",
      "sacituzumab-govitecan",
      "utomilumab"
    ]
  },
  {
    id: "nct03414658",
    kind: "trial",
    name: "AVIATOR",
    aka: [
      "The AVIATOR Study: Trastuzumab and Vinorelbine With Avelumab OR Avelumab & Utomilumab in Advanced HER2+ Breast Cancer"
    ],
    nct: "NCT03414658",
    phase: "2",
    setting: "Advanced HER2-positive breast cancer",
    sponsor: "Adrienne G. Waks",
    tldr: "AVIATOR compares trastuzumab and vinorelbine with combinations that add avelumab, with or without utomilumab. It asks whether the added immune treatments improve control of advanced HER2-positive breast cancer.",
    summary: "AVIATOR compares trastuzumab and vinorelbine with combinations that add avelumab, with or without utomilumab. It asks whether the added immune treatments improve control of advanced HER2-positive breast cancer.\n\nInterventional study registered as NCT03414658, sponsored by Adrienne G. Waks. Registry phase: 2. Registry enrollment is 100 participants (actual). Registry status checked October 10, 2026: active not recruiting. UCSF lists this study as closed to local enrollment; local availability and overall registry status are separate. See the registry for full eligibility and current sites.",
    asOf: "2026-10-10",
    cancers: [
      "breast-cancer"
    ],
    institutions: [
      "ucsf"
    ],
    tags: [
      "ucsf-breast-coverage",
      "interventional"
    ],
    links: [
      {
        label: "ClinicalTrials.gov NCT03414658",
        url: "https://clinicaltrials.gov/study/NCT03414658"
      },
      {
        label: "UCSF study listing and local availability",
        url: "https://clinicaltrials.ucsf.edu/trial/NCT03414658"
      }
    ],
    participation: [
      {
        nct: "NCT03414658",
        source: "https://clinicaltrials.gov/study/NCT03414658",
        fetchedAt: "2026-10-10T20:54:20.453662Z",
        studySha256: "cde41b3c720457e996dee0b9207492ea979992092fa18362b5825b1b2f6c3f73",
        overallStatus: "ACTIVE_NOT_RECRUITING",
        leadSponsor: "Adrienne G. Waks",
        collaboratorCount: 3,
        hasEligibility: true,
        siteCount: 17,
        recruitingSiteCount: 0,
        countries: [
          "United States"
        ],
        minimumAge: "18 Years",
        sex: "ALL",
        healthyVolunteers: false,
        enrolment: 100,
        enrolmentType: "ACTUAL",
        lastUpdatePosted: "2026-07-20"
      }
    ],
    status: "active",
    enrolled: 100,
    started: "2018-06-21",
    startedType: "actual",
    drugs: [
      "avelumab",
      "trastuzumab",
      "utomilumab",
      "vinorelbine"
    ]
  },
  {
    id: "nct04821141",
    kind: "trial",
    name: "Bazedoxifene plus conjugated estrogens for breast risk biomarkers",
    aka: [
      "Phase IIB Trial of Bazedoxifene Plus Conjugated Estrogens"
    ],
    nct: "NCT04821141",
    phase: "2",
    setting: "Women at increased breast cancer risk with menopausal symptoms",
    sponsor: "University of Kansas Medical Center",
    tldr: "This study compares bazedoxifene plus conjugated estrogens with a waiting-list group. It measures breast cancer risk markers and menopausal symptoms, rather than treating an existing breast cancer.",
    summary: "This study compares bazedoxifene plus conjugated estrogens with a waiting-list group. It measures breast cancer risk markers and menopausal symptoms, rather than treating an existing breast cancer.\n\nInterventional study registered as NCT04821141, sponsored by University of Kansas Medical Center. Registry phase: 2. Registry enrollment is 120 participants (estimated). Registry status checked October 10, 2026: active not recruiting. UCSF lists this study as closed to local enrollment; local availability and overall registry status are separate. See the registry for full eligibility and current sites.",
    asOf: "2026-10-10",
    cancers: [
      "breast-cancer"
    ],
    institutions: [
      "ucsf"
    ],
    tags: [
      "ucsf-breast-coverage",
      "interventional"
    ],
    links: [
      {
        label: "ClinicalTrials.gov NCT04821141",
        url: "https://clinicaltrials.gov/study/NCT04821141"
      },
      {
        label: "UCSF study listing and local availability",
        url: "https://clinicaltrials.ucsf.edu/trial/NCT04821141"
      }
    ],
    participation: [
      {
        nct: "NCT04821141",
        source: "https://clinicaltrials.gov/study/NCT04821141",
        fetchedAt: "2026-10-10T20:54:20.582402Z",
        studySha256: "357c0577c4b8297fcff62e6b36df5b9868738f6127cc3f64eb32d06813cf4f1f",
        overallStatus: "ACTIVE_NOT_RECRUITING",
        leadSponsor: "University of Kansas Medical Center",
        collaboratorCount: 1,
        hasEligibility: true,
        siteCount: 6,
        recruitingSiteCount: 0,
        countries: [
          "United States"
        ],
        minimumAge: "45 Years",
        maximumAge: "64 Years",
        sex: "FEMALE",
        healthyVolunteers: true,
        enrolment: 120,
        enrolmentType: "ESTIMATED",
        lastUpdatePosted: "2025-10-29"
      }
    ],
    status: "active",
    started: "2021-12-14",
    startedType: "actual",
    drugs: []
  },
  {
    id: "nct02498613",
    kind: "trial",
    name: "Cediranib plus olaparib in advanced solid tumors",
    aka: [
      "A Phase 2 Study of Cediranib in Combination With Olaparib in Advanced Solid Tumors"
    ],
    nct: "NCT02498613",
    phase: "2",
    setting: "Selected advanced solid tumors, including triple-negative breast cancer",
    sponsor: "National Cancer Institute (NCI)",
    tldr: "This study tests cediranib with olaparib in selected advanced cancers, including triple-negative breast cancer. It asks whether the combination can shrink tumors; it is not a study of treatment after curative breast surgery.",
    summary: "This study tests cediranib with olaparib in selected advanced cancers, including triple-negative breast cancer. It asks whether the combination can shrink tumors; it is not a study of treatment after curative breast surgery.\n\nInterventional study registered as NCT02498613, sponsored by National Cancer Institute (NCI). Registry phase: 2. Registry enrollment is 122 participants (actual). Registry status checked October 10, 2026: active not recruiting. UCSF lists this study as closed to local enrollment; local availability and overall registry status are separate. See the registry for full eligibility and current sites.",
    asOf: "2026-10-10",
    cancers: [
      "breast-cancer",
      "tnbc"
    ],
    institutions: [
      "ucsf"
    ],
    tags: [
      "ucsf-breast-coverage",
      "interventional"
    ],
    links: [
      {
        label: "ClinicalTrials.gov NCT02498613",
        url: "https://clinicaltrials.gov/study/NCT02498613"
      },
      {
        label: "UCSF study listing and local availability",
        url: "https://clinicaltrials.ucsf.edu/trial/NCT02498613"
      }
    ],
    participation: [
      {
        nct: "NCT02498613",
        source: "https://clinicaltrials.gov/study/NCT02498613",
        fetchedAt: "2026-10-10T20:54:20.834374Z",
        studySha256: "5ad4fbd3a1f5d117d04b5cbe16795ff53f68c2053378e4eea8683742b4b9c468",
        overallStatus: "ACTIVE_NOT_RECRUITING",
        leadSponsor: "National Cancer Institute (NCI)",
        collaboratorCount: 1,
        hasEligibility: true,
        siteCount: 16,
        recruitingSiteCount: 0,
        countries: [
          "Canada",
          "United States"
        ],
        minimumAge: "18 Years",
        sex: "ALL",
        healthyVolunteers: false,
        enrolment: 122,
        enrolmentType: "ACTUAL",
        lastUpdatePosted: "2026-09-25"
      }
    ],
    status: "active",
    enrolled: 122,
    started: "2016-08-31",
    startedType: "actual",
    drugs: [
      "olaparib"
    ]
  },
  {
    id: "nct04266249",
    kind: "trial",
    name: "CompassHER2-pCR",
    aka: [
      "CompassHER2-pCR: Decreasing Chemotherapy for Breast Cancer Patients After Pre-surgery Chemo and Targeted Therapy"
    ],
    nct: "NCT04266249",
    phase: "2",
    setting: "Early HER2-positive breast cancer treated before surgery",
    sponsor: "ECOG-ACRIN Cancer Research Group",
    tldr: "CompassHER2-pCR tests whether people whose cancer clears with a shorter course of pre-surgery treatment can receive less chemotherapy afterward. Further treatment depends on what is found at surgery.",
    summary: "CompassHER2-pCR tests whether people whose cancer clears with a shorter course of pre-surgery treatment can receive less chemotherapy afterward. Further treatment depends on what is found at surgery.\n\nInterventional study registered as NCT04266249, sponsored by ECOG-ACRIN Cancer Research Group. Registry phase: 2. Registry enrollment is 2,175 participants (actual). Registry status checked October 10, 2026: active not recruiting. UCSF lists this study as closed to local enrollment; local availability and overall registry status are separate. See the registry for full eligibility and current sites.",
    asOf: "2026-10-10",
    cancers: [
      "breast-cancer"
    ],
    institutions: [
      "ucsf"
    ],
    tags: [
      "ucsf-breast-coverage",
      "interventional"
    ],
    links: [
      {
        label: "ClinicalTrials.gov NCT04266249",
        url: "https://clinicaltrials.gov/study/NCT04266249"
      },
      {
        label: "UCSF study listing and local availability",
        url: "https://clinicaltrials.ucsf.edu/trial/NCT04266249"
      }
    ],
    participation: [
      {
        nct: "NCT04266249",
        source: "https://clinicaltrials.gov/study/NCT04266249",
        fetchedAt: "2026-10-10T20:54:21.300658Z",
        studySha256: "52886fdaeaad30f26d8a77feb323192066ba77101dad13b42b398623dc0cc74d",
        overallStatus: "ACTIVE_NOT_RECRUITING",
        leadSponsor: "ECOG-ACRIN Cancer Research Group",
        collaboratorCount: 1,
        hasEligibility: true,
        siteCount: 1008,
        recruitingSiteCount: 0,
        countries: [
          "Puerto Rico",
          "United States"
        ],
        minimumAge: "18 Years",
        sex: "ALL",
        healthyVolunteers: false,
        enrolment: 2175,
        enrolmentType: "ACTUAL",
        lastUpdatePosted: "2026-09-14"
      }
    ],
    status: "active",
    enrolled: 2175,
    started: "2020-03-13",
    startedType: "actual",
    drugs: [
      "docetaxel",
      "nab-paclitaxel",
      "paclitaxel",
      "pertuzumab",
      "trastuzumab",
      "trastuzumab-emtansine"
    ]
  },
  {
    id: "nct04711109",
    kind: "trial",
    name: "Denosumab for breast cancer prevention in BRCA1 carriers",
    aka: [
      "Studying the Effect of Denosumab on Preventing Breast Cancer in Women With a BRCA1 Germline Mutation"
    ],
    nct: "NCT04711109",
    phase: "3",
    setting: "Breast cancer prevention in women with a germline BRCA1 mutation",
    sponsor: "Alliance for Clinical Trials in Oncology",
    tldr: "This study compares denosumab with placebo to see whether it prevents breast cancer in women with an inherited BRCA1 mutation. It is a prevention study rather than treatment for diagnosed cancer.",
    summary: "This study compares denosumab with placebo to see whether it prevents breast cancer in women with an inherited BRCA1 mutation. It is a prevention study rather than treatment for diagnosed cancer.\n\nInterventional study registered as NCT04711109, sponsored by Alliance for Clinical Trials in Oncology. Registry phase: 3. Registry enrollment is 300 participants (estimated). Registry status checked October 10, 2026: active not recruiting. UCSF lists this study as closed to local enrollment; local availability and overall registry status are separate. See the registry for full eligibility and current sites.",
    asOf: "2026-10-10",
    cancers: [
      "breast-cancer"
    ],
    institutions: [
      "ucsf"
    ],
    tags: [
      "ucsf-breast-coverage",
      "interventional"
    ],
    links: [
      {
        label: "ClinicalTrials.gov NCT04711109",
        url: "https://clinicaltrials.gov/study/NCT04711109"
      },
      {
        label: "UCSF study listing and local availability",
        url: "https://clinicaltrials.ucsf.edu/trial/NCT04711109"
      }
    ],
    participation: [
      {
        nct: "NCT04711109",
        source: "https://clinicaltrials.gov/study/NCT04711109",
        fetchedAt: "2026-10-10T20:54:20.781933Z",
        studySha256: "c10e88f60401f27be5d0441a21088017b7a32b0f7d19971f7f20fc03daf6a1e0",
        overallStatus: "ACTIVE_NOT_RECRUITING",
        leadSponsor: "Alliance for Clinical Trials in Oncology",
        collaboratorCount: 2,
        hasEligibility: true,
        siteCount: 47,
        recruitingSiteCount: 0,
        countries: [
          "United States"
        ],
        minimumAge: "25 Years",
        maximumAge: "55 Years",
        sex: "FEMALE",
        healthyVolunteers: true,
        enrolment: 300,
        enrolmentType: "ESTIMATED",
        lastUpdatePosted: "2026-10-05"
      }
    ],
    status: "active",
    started: "2023-02-14",
    startedType: "actual",
    drugs: [
      "denosumab"
    ]
  },
  {
    id: "nct00433511",
    kind: "trial",
    name: "E5103 adjuvant chemotherapy with or without bevacizumab",
    aka: [
      "Doxorubicin Hydrochloride, Cyclophosphamide, and Paclitaxel With or Without Bevacizumab in Treating Patients With Lymph Node-Positive or High-Risk, Lymph Node-Negative Breast Cancer"
    ],
    nct: "NCT00433511",
    phase: "3",
    setting: "Node-positive or high-risk node-negative breast cancer after surgery",
    sponsor: "National Cancer Institute (NCI)",
    tldr: "E5103 compares chemotherapy after breast surgery with or without bevacizumab. It measures whether adding the drug changes the chance of cancer recurrence.",
    summary: "E5103 compares chemotherapy after breast surgery with or without bevacizumab. It measures whether adding the drug changes the chance of cancer recurrence.\n\nInterventional study registered as NCT00433511, sponsored by National Cancer Institute (NCI). Registry phase: 3. Registry enrollment is 4,994 participants (actual). Registry status checked October 10, 2026: active not recruiting. UCSF lists this study as closed to local enrollment; local availability and overall registry status are separate. See the registry for full eligibility and current sites.",
    asOf: "2026-10-10",
    cancers: [
      "breast-cancer"
    ],
    institutions: [
      "ucsf"
    ],
    tags: [
      "ucsf-breast-coverage",
      "interventional"
    ],
    links: [
      {
        label: "ClinicalTrials.gov NCT00433511",
        url: "https://clinicaltrials.gov/study/NCT00433511"
      },
      {
        label: "UCSF study listing and local availability",
        url: "https://clinicaltrials.ucsf.edu/trial/NCT00433511"
      }
    ],
    participation: [
      {
        nct: "NCT00433511",
        source: "https://clinicaltrials.gov/study/NCT00433511",
        fetchedAt: "2026-10-10T20:54:21.093921Z",
        studySha256: "8d8e62914035de99ea3df2cc9a09db685a66f55c6f8bb967456394a84b22bb61",
        overallStatus: "ACTIVE_NOT_RECRUITING",
        leadSponsor: "National Cancer Institute (NCI)",
        collaboratorCount: 3,
        hasEligibility: true,
        siteCount: 842,
        recruitingSiteCount: 0,
        countries: [
          "Peru",
          "South Africa",
          "United States"
        ],
        minimumAge: "18 Years",
        sex: "ALL",
        healthyVolunteers: false,
        enrolment: 4994,
        enrolmentType: "ACTUAL",
        lastUpdatePosted: "2026-10-01"
      }
    ],
    status: "active",
    enrolled: 4994,
    started: "2007-11-02",
    startedType: "actual",
    drugs: [
      "bevacizumab",
      "cyclophosphamide",
      "doxorubicin",
      "paclitaxel"
    ]
  },
  {
    id: "nct04042701",
    kind: "trial",
    name: "Trastuzumab deruxtecan with pembrolizumab",
    aka: [
      "DS8201a and Pembrolizumab in Participants With Locally Advanced/Metastatic Breast or Non-Small Cell Lung Cancer"
    ],
    nct: "NCT04042701",
    phase: "1",
    setting: "Locally advanced or metastatic breast cancer or non-small cell lung cancer",
    sponsor: "Daiichi Sankyo",
    tldr: "This early study combines trastuzumab deruxtecan with pembrolizumab in advanced breast or lung cancer. It studies a suitable dose, side effects and tumor response.",
    summary: "This early study combines trastuzumab deruxtecan with pembrolizumab in advanced breast or lung cancer. It studies a suitable dose, side effects and tumor response.\n\nInterventional study registered as NCT04042701, sponsored by Daiichi Sankyo. Registry phase: 1. Registry enrollment is 115 participants (estimated). Registry status checked October 10, 2026: active not recruiting. UCSF lists this study as closed to local enrollment; local availability and overall registry status are separate. See the registry for full eligibility and current sites.",
    asOf: "2026-10-10",
    cancers: [
      "breast-cancer"
    ],
    institutions: [
      "ucsf"
    ],
    tags: [
      "ucsf-breast-coverage",
      "interventional"
    ],
    links: [
      {
        label: "ClinicalTrials.gov NCT04042701",
        url: "https://clinicaltrials.gov/study/NCT04042701"
      },
      {
        label: "UCSF study listing and local availability",
        url: "https://clinicaltrials.ucsf.edu/trial/NCT04042701"
      }
    ],
    participation: [
      {
        nct: "NCT04042701",
        source: "https://clinicaltrials.gov/study/NCT04042701",
        fetchedAt: "2026-10-10T20:54:21.083546Z",
        studySha256: "dcb479beba343b06fc2d122b269a27623cb4af0cc6693a5061c4967aa510d013",
        overallStatus: "ACTIVE_NOT_RECRUITING",
        leadSponsor: "Daiichi Sankyo",
        collaboratorCount: 2,
        hasEligibility: true,
        siteCount: 30,
        recruitingSiteCount: 0,
        countries: [
          "France",
          "Spain",
          "United Kingdom",
          "United States"
        ],
        minimumAge: "18 Years",
        sex: "ALL",
        healthyVolunteers: false,
        enrolment: 115,
        enrolmentType: "ESTIMATED",
        lastUpdatePosted: "2025-11-18"
      }
    ],
    status: "active",
    started: "2020-02-10",
    startedType: "actual",
    drugs: [
      "pembrolizumab",
      "trastuzumab-deruxtecan"
    ]
  },
  {
    id: "nct03941730",
    kind: "trial",
    name: "Estradiol in ER-beta-positive TNBC",
    aka: [
      "Estradiol in Treating Patients With ER Beta Positive, Triple Negative Locally Advanced or Metastatic Breast Cancer"
    ],
    nct: "NCT03941730",
    phase: "2",
    setting: "ER-beta-positive locally advanced or metastatic triple-negative breast cancer",
    sponsor: "Mayo Clinic",
    tldr: "This study tests estradiol in triple-negative breast cancers that express a different estrogen receptor, ER beta. That selection differs from the usual ER-alpha test used to classify breast cancer.",
    summary: "This study tests estradiol in triple-negative breast cancers that express a different estrogen receptor, ER beta. That selection differs from the usual ER-alpha test used to classify breast cancer.\n\nInterventional study registered as NCT03941730, sponsored by Mayo Clinic. Registry phase: 2. Registry enrollment is 8 participants (actual). Registry status checked October 10, 2026: active not recruiting. UCSF lists this study as closed to local enrollment; local availability and overall registry status are separate. See the registry for full eligibility and current sites.",
    asOf: "2026-10-10",
    cancers: [
      "breast-cancer",
      "tnbc"
    ],
    institutions: [
      "ucsf"
    ],
    tags: [
      "ucsf-breast-coverage",
      "interventional"
    ],
    links: [
      {
        label: "ClinicalTrials.gov NCT03941730",
        url: "https://clinicaltrials.gov/study/NCT03941730"
      },
      {
        label: "UCSF study listing and local availability",
        url: "https://clinicaltrials.ucsf.edu/trial/NCT03941730"
      }
    ],
    participation: [
      {
        nct: "NCT03941730",
        source: "https://clinicaltrials.gov/study/NCT03941730",
        fetchedAt: "2026-10-10T20:54:21.165516Z",
        studySha256: "10c37510e73fdd5227cd1badd9534216b15fd0514c0b7946ecfe24d26c3f1e9c",
        overallStatus: "ACTIVE_NOT_RECRUITING",
        leadSponsor: "Mayo Clinic",
        collaboratorCount: 1,
        hasEligibility: true,
        siteCount: 9,
        recruitingSiteCount: 0,
        countries: [
          "United States"
        ],
        minimumAge: "18 Years",
        sex: "FEMALE",
        healthyVolunteers: false,
        enrolment: 8,
        enrolmentType: "ACTUAL",
        lastUpdatePosted: "2026-05-12"
      }
    ],
    status: "active",
    enrolled: 8,
    started: "2019-08-28",
    startedType: "actual",
    drugs: []
  },
  {
    id: "nct04316117",
    kind: "trial",
    name: "FEATURE FDG-PET/CT response assessment",
    aka: [
      "Using FDG-PET/CT to Assess Response of Bone-Dominant Metastatic Breast Cancer, FEATURE Study"
    ],
    nct: "NCT04316117",
    phase: "2",
    setting: "Bone-dominant metastatic breast cancer",
    sponsor: "ECOG-ACRIN Cancer Research Group",
    tldr: "FEATURE studies whether PET/CT scans can measure treatment response in breast cancer that has spread mainly to bones. It evaluates imaging rather than assigning a new cancer treatment.",
    summary: "FEATURE studies whether PET/CT scans can measure treatment response in breast cancer that has spread mainly to bones. It evaluates imaging rather than assigning a new cancer treatment.\n\nInterventional study registered as NCT04316117, sponsored by ECOG-ACRIN Cancer Research Group. Registry phase: 2. Registry enrollment is 138 participants (actual). Registry status checked October 10, 2026: active not recruiting. UCSF lists this study as closed to local enrollment; local availability and overall registry status are separate. See the registry for full eligibility and current sites.",
    asOf: "2026-10-10",
    cancers: [
      "breast-cancer"
    ],
    institutions: [
      "ucsf"
    ],
    tags: [
      "ucsf-breast-coverage",
      "interventional"
    ],
    links: [
      {
        label: "ClinicalTrials.gov NCT04316117",
        url: "https://clinicaltrials.gov/study/NCT04316117"
      },
      {
        label: "UCSF study listing and local availability",
        url: "https://clinicaltrials.ucsf.edu/trial/NCT04316117"
      }
    ],
    participation: [
      {
        nct: "NCT04316117",
        source: "https://clinicaltrials.gov/study/NCT04316117",
        fetchedAt: "2026-10-10T20:54:21.447916Z",
        studySha256: "5f4d41298a3187435207f1b3d14311612715f28bc5fd1a67f4bf61fdfffb7ad0",
        overallStatus: "ACTIVE_NOT_RECRUITING",
        leadSponsor: "ECOG-ACRIN Cancer Research Group",
        collaboratorCount: 1,
        hasEligibility: true,
        siteCount: 104,
        recruitingSiteCount: 0,
        countries: [
          "Ireland",
          "Puerto Rico",
          "United States"
        ],
        minimumAge: "18 Years",
        sex: "ALL",
        healthyVolunteers: false,
        enrolment: 138,
        enrolmentType: "ACTUAL",
        lastUpdatePosted: "2026-09-14"
      }
    ],
    status: "active",
    enrolled: 138,
    started: "2020-09-15",
    startedType: "actual",
    drugs: []
  },
  {
    id: "nct06518057",
    kind: "trial",
    name: "Hippocampal-avoidance craniospinal irradiation",
    aka: [
      "Hippocampal Avoidance in Craniospinal Irradiation for the Treatment of Leptomeningeal Metastases From Breast Cancer or Non-small Cell Lung Cancer"
    ],
    nct: "NCT06518057",
    phase: "2",
    setting: "Leptomeningeal metastases from breast cancer or non-small cell lung cancer",
    sponsor: "University of Washington",
    tldr: "This study tests radiation to the brain and spinal cord while reducing radiation to a brain region involved in memory. It examines cancer control and effects on brain function.",
    summary: "This study tests radiation to the brain and spinal cord while reducing radiation to a brain region involved in memory. It examines cancer control and effects on brain function.\n\nInterventional study registered as NCT06518057, sponsored by University of Washington. Registry phase: 2. Registry enrollment is 22 participants (estimated). Registry status checked October 10, 2026: recruiting. UCSF lists this study as closed to local enrollment; local availability and overall registry status are separate. See the registry for full eligibility and current sites.",
    asOf: "2026-10-10",
    cancers: [
      "breast-cancer"
    ],
    institutions: [
      "ucsf"
    ],
    tags: [
      "ucsf-breast-coverage",
      "interventional"
    ],
    links: [
      {
        label: "ClinicalTrials.gov NCT06518057",
        url: "https://clinicaltrials.gov/study/NCT06518057"
      },
      {
        label: "UCSF study listing and local availability",
        url: "https://clinicaltrials.ucsf.edu/trial/NCT06518057"
      }
    ],
    participation: [
      {
        nct: "NCT06518057",
        source: "https://clinicaltrials.gov/study/NCT06518057",
        fetchedAt: "2026-10-10T20:54:21.385616Z",
        studySha256: "12b17bb6624d6731462ebb7a3e9ec1bee6801c492fff7f6b30d54b2cd35f04d9",
        overallStatus: "RECRUITING",
        leadSponsor: "University of Washington",
        collaboratorCount: 0,
        hasEligibility: true,
        siteCount: 3,
        recruitingSiteCount: 2,
        countries: [
          "United States"
        ],
        minimumAge: "18 Years",
        sex: "ALL",
        healthyVolunteers: false,
        enrolment: 22,
        enrolmentType: "ESTIMATED",
        lastUpdatePosted: "2026-08-14"
      }
    ],
    status: "recruiting",
    started: "2025-03-03",
    startedType: "actual",
    drugs: []
  },
  {
    id: "nct05056077",
    kind: "trial",
    name: "Tools To Be Fit",
    aka: [
      "Improving Nutrition and Physical Activity for Cancer Survivors (Tools To Be Fit)"
    ],
    nct: "NCT05056077",
    phase: "not-applicable",
    setting: "Cancer survivors after treatment",
    sponsor: "University of California, San Francisco",
    tldr: "This study tests combinations of tools to support healthier eating and physical activity after cancer treatment. It measures health behaviors and body weight.",
    summary: "This study tests combinations of tools to support healthier eating and physical activity after cancer treatment. It measures health behaviors and body weight.\n\nInterventional study registered as NCT05056077, sponsored by University of California, San Francisco. No drug-development phase applies in the structured registry record. Registry enrollment is 353 participants (actual). Registry status checked October 10, 2026: active not recruiting. UCSF lists this study as closed to local enrollment; local availability and overall registry status are separate. See the registry for full eligibility and current sites.",
    asOf: "2026-10-10",
    cancers: [
      "breast-cancer"
    ],
    institutions: [
      "ucsf"
    ],
    tags: [
      "ucsf-breast-coverage",
      "interventional"
    ],
    links: [
      {
        label: "ClinicalTrials.gov NCT05056077",
        url: "https://clinicaltrials.gov/study/NCT05056077"
      },
      {
        label: "UCSF study listing and local availability",
        url: "https://clinicaltrials.ucsf.edu/trial/NCT05056077"
      }
    ],
    participation: [
      {
        nct: "NCT05056077",
        source: "https://clinicaltrials.gov/study/NCT05056077",
        fetchedAt: "2026-10-10T20:54:21.451664Z",
        studySha256: "d04d98fe1e420f72212ba1c84c4237dc48a5395597bffdf74e97638474fc1f02",
        overallStatus: "ACTIVE_NOT_RECRUITING",
        leadSponsor: "University of California, San Francisco",
        collaboratorCount: 5,
        hasEligibility: true,
        siteCount: 1,
        recruitingSiteCount: 0,
        countries: [
          "United States"
        ],
        minimumAge: "18 Years",
        sex: "ALL",
        healthyVolunteers: false,
        enrolment: 353,
        enrolmentType: "ACTUAL",
        lastUpdatePosted: "2026-10-05"
      }
    ],
    status: "active",
    enrolled: 353,
    started: "2021-10-21",
    startedType: "actual",
    drugs: []
  },
  {
    id: "nct06633926",
    kind: "trial",
    name: "IACS3 integrative cancer survivorship",
    aka: [
      "Integrative Approaches for Cancer Survivorship (IACS3)"
    ],
    nct: "NCT06633926",
    phase: "not-applicable",
    setting: "Non-metastatic breast cancer survivors",
    sponsor: "University of California, San Francisco",
    tldr: "IACS3 compares a program of nutrition, lifestyle practices, yoga and therapeutic touch with a health education program. This pilot study focuses on feasibility and participation, not proof that either program prevents recurrence.",
    summary: "IACS3 compares a program of nutrition, lifestyle practices, yoga and therapeutic touch with a health education program. This pilot study focuses on feasibility and participation, not proof that either program prevents recurrence.\n\nInterventional study registered as NCT06633926, sponsored by University of California, San Francisco. No drug-development phase applies in the structured registry record. Registry enrollment is 107 participants (actual). Registry status checked October 10, 2026: active not recruiting. UCSF lists this study as closed to local enrollment; local availability and overall registry status are separate. See the registry for full eligibility and current sites.",
    asOf: "2026-10-10",
    cancers: [
      "breast-cancer"
    ],
    institutions: [
      "ucsf"
    ],
    tags: [
      "ucsf-breast-coverage",
      "interventional"
    ],
    links: [
      {
        label: "ClinicalTrials.gov NCT06633926",
        url: "https://clinicaltrials.gov/study/NCT06633926"
      },
      {
        label: "UCSF study listing and local availability",
        url: "https://clinicaltrials.ucsf.edu/trial/NCT06633926"
      }
    ],
    participation: [
      {
        nct: "NCT06633926",
        source: "https://clinicaltrials.gov/study/NCT06633926",
        fetchedAt: "2026-10-10T20:54:21.624782Z",
        studySha256: "6907b542fb744f0a456af07540f0ea86672387d347b9bc9aaddc3b46c5995815",
        overallStatus: "ACTIVE_NOT_RECRUITING",
        leadSponsor: "University of California, San Francisco",
        collaboratorCount: 1,
        hasEligibility: true,
        siteCount: 4,
        recruitingSiteCount: 0,
        countries: [
          "United States"
        ],
        minimumAge: "18 Years",
        sex: "ALL",
        healthyVolunteers: false,
        enrolment: 107,
        enrolmentType: "ACTUAL",
        lastUpdatePosted: "2026-08-03"
      }
    ],
    status: "active",
    enrolled: 107,
    started: "2025-03-31",
    startedType: "actual",
    drugs: []
  },
  {
    id: "nct01570998",
    kind: "trial",
    name: "Intraoperative radiation for breast-conserving surgery",
    aka: [
      "Intraoperative Radiation Therapy in Treating Patients With Breast Cancer Undergoing Breast-Conserving Surgery"
    ],
    nct: "NCT01570998",
    phase: "not-applicable",
    setting: "Breast cancer treated with breast-conserving surgery",
    sponsor: "University of California, San Francisco",
    tldr: "This study evaluates radiation delivered during breast surgery. It follows side effects and cancer outcomes to assess this approach.",
    summary: "This study evaluates radiation delivered during breast surgery. It follows side effects and cancer outcomes to assess this approach.\n\nInterventional study registered as NCT01570998, sponsored by University of California, San Francisco. No drug-development phase applies in the structured registry record. Registry enrollment is 1,259 participants (actual). Registry status checked October 10, 2026: active not recruiting. UCSF lists this study as closed to local enrollment; local availability and overall registry status are separate. See the registry for full eligibility and current sites. The registry narrative calls this phase IV, but its structured phase field is NA; this record preserves the structured value rather than inferring a drug phase.",
    asOf: "2026-10-10",
    cancers: [
      "breast-cancer"
    ],
    institutions: [
      "ucsf"
    ],
    tags: [
      "ucsf-breast-coverage",
      "interventional"
    ],
    links: [
      {
        label: "ClinicalTrials.gov NCT01570998",
        url: "https://clinicaltrials.gov/study/NCT01570998"
      },
      {
        label: "UCSF study listing and local availability",
        url: "https://clinicaltrials.ucsf.edu/trial/NCT01570998"
      }
    ],
    participation: [
      {
        nct: "NCT01570998",
        source: "https://clinicaltrials.gov/study/NCT01570998",
        fetchedAt: "2026-10-10T20:54:21.678328Z",
        studySha256: "13a9af4b8b734e9efae8626f1ba43c884b1c6c45d17067a6865cab7acd8dbb31",
        overallStatus: "ACTIVE_NOT_RECRUITING",
        leadSponsor: "University of California, San Francisco",
        collaboratorCount: 1,
        hasEligibility: true,
        siteCount: 25,
        recruitingSiteCount: 0,
        countries: [
          "United States"
        ],
        minimumAge: "45 Years",
        sex: "FEMALE",
        healthyVolunteers: false,
        enrolment: 1259,
        enrolmentType: "ACTUAL",
        lastUpdatePosted: "2026-03-18"
      }
    ],
    status: "active",
    enrolled: 1259,
    started: "2012-05-18",
    startedType: "actual",
    drugs: []
  },
  {
    id: "nct04188548",
    kind: "trial",
    name: "EMBER imlunestrant early study",
    aka: [
      "A Study of LY3484356 in Participants With Advanced or Metastatic Breast Cancer or Endometrial Cancer"
    ],
    nct: "NCT04188548",
    phase: "1",
    setting: "Advanced or metastatic breast cancer or endometrial cancer",
    sponsor: "Eli Lilly and Company",
    tldr: "This early study tests imlunestrant, originally called LY3484356, alone or with other cancer therapies. It studies safety and activity in advanced breast or endometrial cancer.",
    summary: "This early study tests imlunestrant, originally called LY3484356, alone or with other cancer therapies. It studies safety and activity in advanced breast or endometrial cancer.\n\nInterventional study registered as NCT04188548, sponsored by Eli Lilly and Company. Registry phase: 1. Registry enrollment is 379 participants (actual). Registry status checked October 10, 2026: active not recruiting. UCSF lists this study as closed to local enrollment; local availability and overall registry status are separate. See the registry for full eligibility and current sites.",
    asOf: "2026-10-10",
    cancers: [
      "breast-cancer"
    ],
    institutions: [
      "ucsf"
    ],
    tags: [
      "ucsf-breast-coverage",
      "interventional"
    ],
    links: [
      {
        label: "ClinicalTrials.gov NCT04188548",
        url: "https://clinicaltrials.gov/study/NCT04188548"
      },
      {
        label: "UCSF study listing and local availability",
        url: "https://clinicaltrials.ucsf.edu/trial/NCT04188548"
      }
    ],
    participation: [
      {
        nct: "NCT04188548",
        source: "https://clinicaltrials.gov/study/NCT04188548",
        fetchedAt: "2026-10-10T20:54:21.768016Z",
        studySha256: "8fb0a233cc774946ca0cafe7aa1355395450b9c50d45ba9d60499809cb690dee",
        overallStatus: "ACTIVE_NOT_RECRUITING",
        leadSponsor: "Eli Lilly and Company",
        collaboratorCount: 0,
        hasEligibility: true,
        siteCount: 74,
        recruitingSiteCount: 0,
        countries: [
          "Australia",
          "Belgium",
          "France",
          "Japan",
          "South Korea",
          "Spain",
          "Taiwan",
          "United States"
        ],
        minimumAge: "18 Years",
        sex: "ALL",
        healthyVolunteers: false,
        enrolment: 379,
        enrolmentType: "ACTUAL",
        lastUpdatePosted: "2026-06-22"
      }
    ],
    status: "active",
    enrolled: 379,
    started: "2019-12-10",
    startedType: "actual",
    drugs: [
      "abemaciclib",
      "alpelisib",
      "everolimus",
      "imlunestrant",
      "pertuzumab",
      "trastuzumab"
    ]
  },
  {
    id: "nct03589339",
    kind: "trial",
    name: "NBTXR3 with radiotherapy and anti-PD-1 treatment",
    aka: [
      "NBTXR3 Activated by Radiotherapy for Patients With Advanced Cancers Treated With An Anti-PD-1 Therapy"
    ],
    nct: "NCT03589339",
    phase: "1",
    setting: "Advanced cancers treated with anti-PD-1 therapy",
    sponsor: "Nanobiotix",
    tldr: "This early study injects NBTXR3 into tumors and activates it with radiation alongside immune treatment. It studies safety and early signs of activity.",
    summary: "This early study injects NBTXR3 into tumors and activates it with radiation alongside immune treatment. It studies safety and early signs of activity.\n\nInterventional study registered as NCT03589339, sponsored by Nanobiotix. Registry phase: 1. Registry enrollment is 145 participants (estimated). Registry status checked October 10, 2026: active not recruiting. UCSF lists this study as closed to local enrollment; local availability and overall registry status are separate. See the registry for full eligibility and current sites.",
    asOf: "2026-10-10",
    cancers: [
      "breast-cancer",
      "tnbc"
    ],
    institutions: [
      "ucsf"
    ],
    tags: [
      "ucsf-breast-coverage",
      "interventional"
    ],
    links: [
      {
        label: "ClinicalTrials.gov NCT03589339",
        url: "https://clinicaltrials.gov/study/NCT03589339"
      },
      {
        label: "UCSF study listing and local availability",
        url: "https://clinicaltrials.ucsf.edu/trial/NCT03589339"
      }
    ],
    participation: [
      {
        nct: "NCT03589339",
        source: "https://clinicaltrials.gov/study/NCT03589339",
        fetchedAt: "2026-10-10T20:54:21.735895Z",
        studySha256: "b377c881d392ed7a55e2d2bcc315859a88ad281acd5aec0b359c5e80984ea139",
        overallStatus: "ACTIVE_NOT_RECRUITING",
        leadSponsor: "Nanobiotix",
        collaboratorCount: 0,
        hasEligibility: true,
        siteCount: 13,
        recruitingSiteCount: 0,
        countries: [
          "United States"
        ],
        minimumAge: "18 Years",
        sex: "ALL",
        healthyVolunteers: false,
        enrolment: 145,
        enrolmentType: "ESTIMATED",
        lastUpdatePosted: "2025-10-24"
      }
    ],
    status: "active",
    started: "2019-01-16",
    startedType: "actual",
    drugs: [
      "nbtxr3",
      "nivolumab",
      "pembrolizumab"
    ]
  },
  {
    id: "nct05508906",
    kind: "trial",
    name: "Palazestrant combination study",
    aka: [
      "Phase 1b Study of OP-1250 (Palazestrant) in Combination With Ribociclib, Alpelisib, Everolimus, or Atirmociclib in ER+, HER2- Breast Cancer"
    ],
    nct: "NCT05508906",
    phase: "1",
    setting: "Estrogen receptor-positive, HER2-negative advanced breast cancer",
    sponsor: "Olema Pharmaceuticals, Inc.",
    tldr: "This early study tests palazestrant with ribociclib, alpelisib, everolimus or atirmociclib. It seeks suitable combination doses and evaluates side effects and drug levels.",
    summary: "This early study tests palazestrant with ribociclib, alpelisib, everolimus or atirmociclib. It seeks suitable combination doses and evaluates side effects and drug levels.\n\nInterventional study registered as NCT05508906, sponsored by Olema Pharmaceuticals, Inc.. Registry phase: 1. Registry enrollment is 190 participants (estimated). Registry status checked October 10, 2026: active not recruiting. UCSF lists this study as closed to local enrollment; local availability and overall registry status are separate. See the registry for full eligibility and current sites.",
    asOf: "2026-10-10",
    cancers: [
      "breast-cancer"
    ],
    institutions: [
      "ucsf"
    ],
    tags: [
      "ucsf-breast-coverage",
      "interventional"
    ],
    links: [
      {
        label: "ClinicalTrials.gov NCT05508906",
        url: "https://clinicaltrials.gov/study/NCT05508906"
      },
      {
        label: "UCSF study listing and local availability",
        url: "https://clinicaltrials.ucsf.edu/trial/NCT05508906"
      }
    ],
    participation: [
      {
        nct: "NCT05508906",
        source: "https://clinicaltrials.gov/study/NCT05508906",
        fetchedAt: "2026-10-10T20:54:21.904565Z",
        studySha256: "5234459c729d5e3c8ef63f7326186734484afae10a43416c20939ad40cdbe276",
        overallStatus: "ACTIVE_NOT_RECRUITING",
        leadSponsor: "Olema Pharmaceuticals, Inc.",
        collaboratorCount: 2,
        hasEligibility: true,
        siteCount: 16,
        recruitingSiteCount: 0,
        countries: [
          "Australia",
          "United States"
        ],
        minimumAge: "18 Years",
        sex: "ALL",
        healthyVolunteers: false,
        enrolment: 190,
        enrolmentType: "ESTIMATED",
        lastUpdatePosted: "2026-09-15"
      }
    ],
    status: "active",
    started: "2022-08-31",
    startedType: "actual",
    drugs: [
      "alpelisib",
      "atirmociclib",
      "everolimus",
      "ribociclib"
    ]
  },
  {
    id: "nct05239143",
    kind: "trial",
    name: "P-MUC1C-ALLO1 in advanced solid tumors",
    aka: [
      "P-MUC1C-ALLO1 Allogeneic CAR-T Cells in the Treatment of Subjects With Advanced or Metastatic Solid Tumors"
    ],
    nct: "NCT05239143",
    phase: "1",
    setting: "Advanced or metastatic epithelial solid tumors",
    sponsor: "Poseida Therapeutics, Inc.",
    tldr: "This early study tests donor-derived immune cells engineered to recognize a tumor-associated protein. It evaluates dose and safety across selected advanced solid tumors.",
    summary: "This early study tests donor-derived immune cells engineered to recognize a tumor-associated protein. It evaluates dose and safety across selected advanced solid tumors.\n\nInterventional study registered as NCT05239143, sponsored by Poseida Therapeutics, Inc.. Registry phase: 1. Registry enrollment is 180 participants (estimated). Registry status checked October 10, 2026: active not recruiting. UCSF lists this study as closed to local enrollment; local availability and overall registry status are separate. See the registry for full eligibility and current sites.",
    asOf: "2026-10-10",
    cancers: [
      "breast-cancer"
    ],
    institutions: [
      "ucsf"
    ],
    tags: [
      "ucsf-breast-coverage",
      "interventional"
    ],
    links: [
      {
        label: "ClinicalTrials.gov NCT05239143",
        url: "https://clinicaltrials.gov/study/NCT05239143"
      },
      {
        label: "UCSF study listing and local availability",
        url: "https://clinicaltrials.ucsf.edu/trial/NCT05239143"
      }
    ],
    participation: [
      {
        nct: "NCT05239143",
        source: "https://clinicaltrials.gov/study/NCT05239143",
        fetchedAt: "2026-10-10T20:54:21.948989Z",
        studySha256: "c3d762db3fc7a89298b3c4b7b87e30588573cac396c7a69fdf8b7ad022ebae87",
        overallStatus: "ACTIVE_NOT_RECRUITING",
        leadSponsor: "Poseida Therapeutics, Inc.",
        collaboratorCount: 0,
        hasEligibility: true,
        siteCount: 14,
        recruitingSiteCount: 0,
        countries: [
          "United States"
        ],
        minimumAge: "18 Years",
        sex: "ALL",
        healthyVolunteers: false,
        enrolment: 180,
        enrolmentType: "ESTIMATED",
        lastUpdatePosted: "2026-02-09"
      }
    ],
    status: "active",
    started: "2022-02-15",
    startedType: "actual",
    drugs: []
  },
  {
    id: "nct06215469",
    kind: "trial",
    name: "AMMA portable scalp cooling",
    aka: [
      "Portable Scalp Cooling System (PSCS) to Prevent Hair Loss for Breast Cancer Patients (Cooler Heads)"
    ],
    nct: "NCT06215469",
    phase: "not-applicable",
    setting: "Early breast cancer receiving chemotherapy",
    sponsor: "University of California, San Francisco",
    tldr: "This study evaluates a portable scalp-cooling system during breast cancer chemotherapy. It asks how well the device limits hair loss.",
    summary: "This study evaluates a portable scalp-cooling system during breast cancer chemotherapy. It asks how well the device limits hair loss.\n\nInterventional study registered as NCT06215469, sponsored by University of California, San Francisco. No drug-development phase applies in the structured registry record. Registry enrollment is 40 participants (estimated). Registry status checked October 10, 2026: active not recruiting. UCSF lists this study as closed to local enrollment; local availability and overall registry status are separate. See the registry for full eligibility and current sites.",
    asOf: "2026-10-10",
    cancers: [
      "breast-cancer"
    ],
    institutions: [
      "ucsf"
    ],
    tags: [
      "ucsf-breast-coverage",
      "interventional"
    ],
    links: [
      {
        label: "ClinicalTrials.gov NCT06215469",
        url: "https://clinicaltrials.gov/study/NCT06215469"
      },
      {
        label: "UCSF study listing and local availability",
        url: "https://clinicaltrials.ucsf.edu/trial/NCT06215469"
      }
    ],
    participation: [
      {
        nct: "NCT06215469",
        source: "https://clinicaltrials.gov/study/NCT06215469",
        fetchedAt: "2026-10-10T20:54:21.992328Z",
        studySha256: "0949e930fba963a316338750b943b9e4c47dfe491619b066de96b3276ccbf669",
        overallStatus: "ACTIVE_NOT_RECRUITING",
        leadSponsor: "University of California, San Francisco",
        collaboratorCount: 1,
        hasEligibility: true,
        siteCount: 1,
        recruitingSiteCount: 0,
        countries: [
          "United States"
        ],
        minimumAge: "21 Years",
        sex: "ALL",
        healthyVolunteers: false,
        enrolment: 40,
        enrolmentType: "ESTIMATED",
        lastUpdatePosted: "2026-04-22"
      }
    ],
    status: "active",
    started: "2024-05-16",
    startedType: "actual",
    drugs: []
  },
  {
    id: "nct06445738",
    kind: "trial",
    name: "PROSPECTIVE radiotherapy omission",
    aka: [
      "Post-operative Radiotherapy Omission in Selected Patients With Early Breast Cancer Trial International VErsion (PROSPECTIVE)"
    ],
    nct: "NCT06445738",
    phase: "not-applicable",
    setting: "Selected early breast cancer after breast-conserving surgery",
    sponsor: "Breast Cancer Trials, Australia and New Zealand",
    tldr: "PROSPECTIVE uses MRI and other selection criteria to identify people who may omit radiation after breast surgery. It follows whether cancer returns in the same breast.",
    summary: "PROSPECTIVE uses MRI and other selection criteria to identify people who may omit radiation after breast surgery. It follows whether cancer returns in the same breast.\n\nInterventional study registered as NCT06445738, sponsored by Breast Cancer Trials, Australia and New Zealand. No drug-development phase applies in the structured registry record. Registry enrollment is 1,400 participants (estimated). Registry status checked October 10, 2026: recruiting. UCSF lists this study as closed to local enrollment; local availability and overall registry status are separate. See the registry for full eligibility and current sites.",
    asOf: "2026-10-10",
    cancers: [
      "breast-cancer"
    ],
    institutions: [
      "ucsf"
    ],
    tags: [
      "ucsf-breast-coverage",
      "interventional"
    ],
    links: [
      {
        label: "ClinicalTrials.gov NCT06445738",
        url: "https://clinicaltrials.gov/study/NCT06445738"
      },
      {
        label: "UCSF study listing and local availability",
        url: "https://clinicaltrials.ucsf.edu/trial/NCT06445738"
      }
    ],
    participation: [
      {
        nct: "NCT06445738",
        source: "https://clinicaltrials.gov/study/NCT06445738",
        fetchedAt: "2026-10-10T20:54:22.098278Z",
        studySha256: "45b2e0625d59346a3ccf29c5a6356a32d0d892d291724b8f6d3a8fecd5895538",
        overallStatus: "RECRUITING",
        leadSponsor: "Breast Cancer Trials, Australia and New Zealand",
        collaboratorCount: 0,
        hasEligibility: true,
        siteCount: 9,
        recruitingSiteCount: 3,
        countries: [
          "Australia",
          "United States"
        ],
        minimumAge: "50 Years",
        sex: "FEMALE",
        healthyVolunteers: false,
        enrolment: 1400,
        enrolmentType: "ESTIMATED",
        lastUpdatePosted: "2026-01-15"
      }
    ],
    status: "recruiting",
    started: "2025-06-06",
    startedType: "actual",
    drugs: []
  },
  {
    id: "nct03422003",
    kind: "trial",
    name: "FABREC breast reconstruction radiotherapy",
    aka: [
      "Study of Radiation Fractionation on Patient Outcomes After Breast REConstruction (FABREC) for Invasive Breast Carcinoma"
    ],
    nct: "NCT03422003",
    phase: "not-applicable",
    setting: "Breast cancer after mastectomy and immediate reconstruction",
    sponsor: "Dana-Farber Cancer Institute",
    tldr: "FABREC compares shorter-course with conventional radiation after mastectomy and reconstruction. It measures patient-reported outcomes and effects on reconstruction and cancer control.",
    summary: "FABREC compares shorter-course with conventional radiation after mastectomy and reconstruction. It measures patient-reported outcomes and effects on reconstruction and cancer control.\n\nInterventional study registered as NCT03422003, sponsored by Dana-Farber Cancer Institute. No drug-development phase applies in the structured registry record. Registry enrollment is 400 participants (actual). Registry status checked October 10, 2026: active not recruiting. UCSF lists this study as closed to local enrollment; local availability and overall registry status are separate. See the registry for full eligibility and current sites.",
    asOf: "2026-10-10",
    cancers: [
      "breast-cancer"
    ],
    institutions: [
      "ucsf"
    ],
    tags: [
      "ucsf-breast-coverage",
      "interventional"
    ],
    links: [
      {
        label: "ClinicalTrials.gov NCT03422003",
        url: "https://clinicaltrials.gov/study/NCT03422003"
      },
      {
        label: "UCSF study listing and local availability",
        url: "https://clinicaltrials.ucsf.edu/trial/NCT03422003"
      }
    ],
    participation: [
      {
        nct: "NCT03422003",
        source: "https://clinicaltrials.gov/study/NCT03422003",
        fetchedAt: "2026-10-10T20:54:22.248726Z",
        studySha256: "bccf13e02874a514870d44240dab1e3cc5c350a44e77d0aec3d2421f8a59caaf",
        overallStatus: "ACTIVE_NOT_RECRUITING",
        leadSponsor: "Dana-Farber Cancer Institute",
        collaboratorCount: 1,
        hasEligibility: true,
        siteCount: 15,
        recruitingSiteCount: 0,
        countries: [
          "United States"
        ],
        minimumAge: "18 Years",
        sex: "FEMALE",
        healthyVolunteers: false,
        enrolment: 400,
        enrolmentType: "ACTUAL",
        lastUpdatePosted: "2024-11-01"
      }
    ],
    status: "active",
    enrolled: 400,
    started: "2018-04-01",
    startedType: "actual",
    drugs: []
  },
  {
    id: "nct07218003",
    kind: "trial",
    name: "RNDO-564 alone or with pembrolizumab",
    aka: [
      "A Phase 1/1b of RNDO-564 Single Agent or in Combination With Pembrolizumab in Bladder Cancer and Other Solid Tumors Associated With Nectin-4"
    ],
    nct: "NCT07218003",
    phase: "1",
    setting: "Selected advanced solid tumors associated with Nectin-4",
    sponsor: "Rondo Therapeutics",
    tldr: "This early study tests RNDO-564 alone or with pembrolizumab in selected advanced tumors. It examines dose, side effects and early treatment activity.",
    summary: "This early study tests RNDO-564 alone or with pembrolizumab in selected advanced tumors. It examines dose, side effects and early treatment activity.\n\nInterventional study registered as NCT07218003, sponsored by Rondo Therapeutics. Registry phase: 1. Registry enrollment is 149 participants (estimated). Registry status checked October 10, 2026: enrolling by invitation. UCSF lists this study as closed to local enrollment; local availability and overall registry status are separate. See the registry for full eligibility and current sites.",
    asOf: "2026-10-10",
    cancers: [
      "breast-cancer",
      "tnbc"
    ],
    institutions: [
      "ucsf"
    ],
    tags: [
      "ucsf-breast-coverage",
      "interventional"
    ],
    links: [
      {
        label: "ClinicalTrials.gov NCT07218003",
        url: "https://clinicaltrials.gov/study/NCT07218003"
      },
      {
        label: "UCSF study listing and local availability",
        url: "https://clinicaltrials.ucsf.edu/trial/NCT07218003"
      }
    ],
    participation: [
      {
        nct: "NCT07218003",
        source: "https://clinicaltrials.gov/study/NCT07218003",
        fetchedAt: "2026-10-10T20:54:22.238412Z",
        studySha256: "30ad36ab807d71e3a7948723d1f847e14e86dd2890ac3907f5a38a2b51e17ce3",
        overallStatus: "ENROLLING_BY_INVITATION",
        leadSponsor: "Rondo Therapeutics",
        collaboratorCount: 0,
        hasEligibility: true,
        siteCount: 11,
        recruitingSiteCount: 0,
        countries: [
          "United States"
        ],
        minimumAge: "18 Years",
        sex: "ALL",
        healthyVolunteers: false,
        enrolment: 149,
        enrolmentType: "ESTIMATED",
        lastUpdatePosted: "2026-06-11"
      }
    ],
    status: "recruiting",
    started: "2025-11-17",
    startedType: "actual",
    drugs: [
      "pembrolizumab"
    ]
  },
  {
    id: "nct00070564",
    kind: "trial",
    name: "SWOG S0221 adjuvant chemotherapy schedules",
    aka: [
      "S0221 Adjuvant Doxorubicin, Cyclophosphamide, and Paclitaxel in Treating Patients With Breast Cancer"
    ],
    nct: "NCT00070564",
    phase: "3",
    setting: "Resected stage I to III breast cancer",
    sponsor: "SWOG Cancer Research Network",
    tldr: "S0221 compares schedules for chemotherapy after breast surgery. It studies which schedule controls cancer while tracking side effects.",
    summary: "S0221 compares schedules for chemotherapy after breast surgery. It studies which schedule controls cancer while tracking side effects.\n\nInterventional study registered as NCT00070564, sponsored by SWOG Cancer Research Network. Registry phase: 3. Registry enrollment is 3,294 participants (actual). Registry status checked October 10, 2026: active not recruiting. UCSF lists this study as closed to local enrollment; local availability and overall registry status are separate. See the registry for full eligibility and current sites.",
    asOf: "2026-10-10",
    cancers: [
      "breast-cancer"
    ],
    institutions: [
      "ucsf"
    ],
    tags: [
      "ucsf-breast-coverage",
      "interventional"
    ],
    links: [
      {
        label: "ClinicalTrials.gov NCT00070564",
        url: "https://clinicaltrials.gov/study/NCT00070564"
      },
      {
        label: "UCSF study listing and local availability",
        url: "https://clinicaltrials.ucsf.edu/trial/NCT00070564"
      }
    ],
    participation: [
      {
        nct: "NCT00070564",
        source: "https://clinicaltrials.gov/study/NCT00070564",
        fetchedAt: "2026-10-10T20:54:22.519717Z",
        studySha256: "ccd3f8d8cd7a052aea44f22820cf55c141c076459794767083e3b85af6f15698",
        overallStatus: "ACTIVE_NOT_RECRUITING",
        leadSponsor: "SWOG Cancer Research Network",
        collaboratorCount: 1,
        hasEligibility: true,
        siteCount: 542,
        recruitingSiteCount: 0,
        countries: [
          "Canada",
          "Puerto Rico",
          "United States"
        ],
        minimumAge: "18 Years",
        sex: "ALL",
        healthyVolunteers: false,
        enrolment: 3294,
        enrolmentType: "ACTUAL",
        lastUpdatePosted: "2026-08-28"
      }
    ],
    status: "active",
    enrolled: 3294,
    started: "2003-11",
    drugs: [
      "cyclophosphamide",
      "doxorubicin",
      "paclitaxel",
      "pegfilgrastim"
    ]
  },
  {
    id: "nct01674140",
    kind: "trial",
    name: "SWOG S1207 endocrine therapy with or without everolimus",
    aka: [
      "S1207 Hormone Therapy With or Without Everolimus in Treating Patients With Breast Cancer"
    ],
    nct: "NCT01674140",
    phase: "3",
    setting: "Hormone receptor-positive, HER2-negative high-risk breast cancer after surgery",
    sponsor: "SWOG Cancer Research Network",
    tldr: "S1207 compares hormone therapy with or without everolimus after breast cancer treatment. It asks whether adding everolimus changes the chance of recurrence.",
    summary: "S1207 compares hormone therapy with or without everolimus after breast cancer treatment. It asks whether adding everolimus changes the chance of recurrence.\n\nInterventional study registered as NCT01674140, sponsored by SWOG Cancer Research Network. Registry phase: 3. Registry enrollment is 1,939 participants (actual). Registry status checked October 10, 2026: active not recruiting. UCSF lists this study as closed to local enrollment; local availability and overall registry status are separate. See the registry for full eligibility and current sites.",
    asOf: "2026-10-10",
    cancers: [
      "breast-cancer"
    ],
    institutions: [
      "ucsf"
    ],
    tags: [
      "ucsf-breast-coverage",
      "interventional"
    ],
    links: [
      {
        label: "ClinicalTrials.gov NCT01674140",
        url: "https://clinicaltrials.gov/study/NCT01674140"
      },
      {
        label: "UCSF study listing and local availability",
        url: "https://clinicaltrials.ucsf.edu/trial/NCT01674140"
      }
    ],
    participation: [
      {
        nct: "NCT01674140",
        source: "https://clinicaltrials.gov/study/NCT01674140",
        fetchedAt: "2026-10-10T20:54:22.659395Z",
        studySha256: "896576439c3607f49fd6ded5cb247691ed7109a4286d041ce833a61783f953a4",
        overallStatus: "ACTIVE_NOT_RECRUITING",
        leadSponsor: "SWOG Cancer Research Network",
        collaboratorCount: 1,
        hasEligibility: true,
        siteCount: 1459,
        recruitingSiteCount: 0,
        countries: [
          "Puerto Rico",
          "United States"
        ],
        minimumAge: "18 Years",
        sex: "ALL",
        healthyVolunteers: false,
        enrolment: 1939,
        enrolmentType: "ACTUAL",
        lastUpdatePosted: "2026-02-10"
      }
    ],
    status: "active",
    enrolled: 1939,
    started: "2013-09-12",
    startedType: "actual",
    drugs: [
      "anastrozole",
      "everolimus",
      "exemestane",
      "goserelin",
      "letrozole",
      "tamoxifen"
    ]
  },
  {
    id: "nct05323955",
    kind: "trial",
    name: "Tucatinib after isolated brain progression",
    aka: [
      "Secondary BRain Metastases Prevention After Isolated Intracranial Progression on Trastuzumab/Pertuzumab or T-DM1 in Patients With aDvanced Human Epidermal Growth Factor Receptor 2+ brEast Cancer With the Addition of Tucatinib"
    ],
    nct: "NCT05323955",
    phase: "2",
    setting: "Advanced HER2-positive breast cancer with isolated intracranial progression",
    sponsor: "Carey Anders, M.D.",
    tldr: "This study adds tucatinib after local treatment for cancer progression in the brain while continuing selected HER2-directed therapy. It follows further progression in people whose cancer outside the brain remains controlled.",
    summary: "This study adds tucatinib after local treatment for cancer progression in the brain while continuing selected HER2-directed therapy. It follows further progression in people whose cancer outside the brain remains controlled.\n\nInterventional study registered as NCT05323955, sponsored by Carey Anders, M.D.. Registry phase: 2. Registry enrollment is 48 participants (estimated). Registry status checked October 10, 2026: active not recruiting. UCSF lists this study as closed to local enrollment; local availability and overall registry status are separate. See the registry for full eligibility and current sites.",
    asOf: "2026-10-10",
    cancers: [
      "breast-cancer"
    ],
    institutions: [
      "ucsf"
    ],
    tags: [
      "ucsf-breast-coverage",
      "interventional"
    ],
    links: [
      {
        label: "ClinicalTrials.gov NCT05323955",
        url: "https://clinicaltrials.gov/study/NCT05323955"
      },
      {
        label: "UCSF study listing and local availability",
        url: "https://clinicaltrials.ucsf.edu/trial/NCT05323955"
      }
    ],
    participation: [
      {
        nct: "NCT05323955",
        source: "https://clinicaltrials.gov/study/NCT05323955",
        fetchedAt: "2026-10-10T20:54:22.593829Z",
        studySha256: "d7e90931b302aed087155c9b6829641405f755a50bcade50e24fc2d5d79adf45",
        overallStatus: "ACTIVE_NOT_RECRUITING",
        leadSponsor: "Carey Anders, M.D.",
        collaboratorCount: 1,
        hasEligibility: true,
        siteCount: 8,
        recruitingSiteCount: 0,
        countries: [
          "United States"
        ],
        minimumAge: "18 Years",
        sex: "ALL",
        healthyVolunteers: false,
        enrolment: 48,
        enrolmentType: "ESTIMATED",
        lastUpdatePosted: "2026-06-23"
      }
    ],
    status: "active",
    started: "2023-03-23",
    startedType: "actual",
    drugs: [
      "pertuzumab",
      "trastuzumab",
      "trastuzumab-emtansine",
      "tucatinib"
    ]
  },
  {
    id: "nct04457596",
    kind: "trial",
    name: "CompassHER2 RD",
    aka: [
      "T-DM1 and Tucatinib Compared With T-DM1 Alone in Preventing Relapses in People With High Risk HER2-Positive Breast Cancer, the CompassHER2 RD Trial"
    ],
    nct: "NCT04457596",
    phase: "3",
    setting: "High-risk HER2-positive breast cancer with residual disease after pre-surgery treatment",
    sponsor: "Alliance for Clinical Trials in Oncology",
    tldr: "CompassHER2 RD compares T-DM1 with or without tucatinib after surgery when cancer remains following pre-surgery therapy. It asks whether adding tucatinib lowers the chance of relapse.",
    summary: "CompassHER2 RD compares T-DM1 with or without tucatinib after surgery when cancer remains following pre-surgery therapy. It asks whether adding tucatinib lowers the chance of relapse.\n\nInterventional study registered as NCT04457596, sponsored by Alliance for Clinical Trials in Oncology. Registry phase: 3. Registry enrollment is 1,056 participants (actual). Registry status checked October 10, 2026: active not recruiting. UCSF lists this study as closed to local enrollment; local availability and overall registry status are separate. See the registry for full eligibility and current sites.",
    asOf: "2026-10-10",
    cancers: [
      "breast-cancer"
    ],
    institutions: [
      "ucsf"
    ],
    tags: [
      "ucsf-breast-coverage",
      "interventional"
    ],
    links: [
      {
        label: "ClinicalTrials.gov NCT04457596",
        url: "https://clinicaltrials.gov/study/NCT04457596"
      },
      {
        label: "UCSF study listing and local availability",
        url: "https://clinicaltrials.ucsf.edu/trial/NCT04457596"
      }
    ],
    participation: [
      {
        nct: "NCT04457596",
        source: "https://clinicaltrials.gov/study/NCT04457596",
        fetchedAt: "2026-10-10T20:54:22.784557Z",
        studySha256: "f27612e78c43de7af89362cdaa3a691206a9c8de9ebbb937be29dd49fbe19088",
        overallStatus: "ACTIVE_NOT_RECRUITING",
        leadSponsor: "Alliance for Clinical Trials in Oncology",
        collaboratorCount: 2,
        hasEligibility: true,
        siteCount: 1176,
        recruitingSiteCount: 0,
        countries: [
          "Canada",
          "Puerto Rico",
          "United States"
        ],
        minimumAge: "18 Years",
        sex: "ALL",
        healthyVolunteers: false,
        enrolment: 1056,
        enrolmentType: "ACTUAL",
        lastUpdatePosted: "2026-06-15"
      }
    ],
    status: "active",
    enrolled: 1056,
    started: "2021-03-02",
    startedType: "actual",
    drugs: [
      "trastuzumab-emtansine",
      "tucatinib"
    ]
  },
  {
    id: "nct02849496",
    kind: "trial",
    name: "Olaparib with or without atezolizumab in BRCA-mutant breast cancer",
    aka: [
      "Testing Olaparib Either Alone or in Combination With Atezolizumab in BRCA Mutant Non-HER2-positive Breast Cancer"
    ],
    nct: "NCT02849496",
    phase: "2",
    setting: "BRCA-mutant, HER2-negative unresectable or metastatic breast cancer",
    sponsor: "National Cancer Institute (NCI)",
    tldr: "This study compares olaparib alone with olaparib plus atezolizumab in advanced BRCA-mutant breast cancer. It tests adding immune treatment to DNA-repair inhibition, rather than treatment after curative breast surgery.",
    summary: "This study compares olaparib alone with olaparib plus atezolizumab in advanced BRCA-mutant breast cancer. It tests adding immune treatment to DNA-repair inhibition, rather than treatment after curative breast surgery.\n\nInterventional study registered as NCT02849496, sponsored by National Cancer Institute (NCI). Registry phase: 2. Registry enrollment is 89 participants (actual). Registry status checked October 10, 2026: active not recruiting. UCSF lists this study as closed to local enrollment; local availability and overall registry status are separate. See the registry for full eligibility and current sites.",
    asOf: "2026-10-10",
    cancers: [
      "breast-cancer"
    ],
    institutions: [
      "ucsf"
    ],
    tags: [
      "ucsf-breast-coverage",
      "interventional"
    ],
    links: [
      {
        label: "ClinicalTrials.gov NCT02849496",
        url: "https://clinicaltrials.gov/study/NCT02849496"
      },
      {
        label: "UCSF study listing and local availability",
        url: "https://clinicaltrials.ucsf.edu/trial/NCT02849496"
      }
    ],
    participation: [
      {
        nct: "NCT02849496",
        source: "https://clinicaltrials.gov/study/NCT02849496",
        fetchedAt: "2026-10-10T20:54:22.886389Z",
        studySha256: "1e19d8b1e98b08f5acd968de998a36e31958a79c2104d6238cffec83ecbfe068",
        overallStatus: "ACTIVE_NOT_RECRUITING",
        leadSponsor: "National Cancer Institute (NCI)",
        collaboratorCount: 0,
        hasEligibility: true,
        siteCount: 58,
        recruitingSiteCount: 0,
        countries: [
          "United States"
        ],
        minimumAge: "18 Years",
        sex: "ALL",
        healthyVolunteers: false,
        enrolment: 89,
        enrolmentType: "ACTUAL",
        lastUpdatePosted: "2026-08-28"
      }
    ],
    status: "active",
    enrolled: 89,
    started: "2017-03-30",
    startedType: "actual",
    drugs: [
      "atezolizumab",
      "olaparib"
    ]
  },
  {
    id: "nct03737695",
    kind: "trial",
    name: "Recurrent or metastatic breast cancer biospecimen registry",
    aka: [
      "Clinical Information and Biospecimen Collection From Patients With Recurrent or Stage IV Breast Cancer"
    ],
    nct: "NCT03737695",
    phase: "observational",
    setting: "Recurrent or stage IV breast cancer",
    sponsor: "Mayo Clinic",
    tldr: "This registry collects clinical information, blood and tumor samples from people with recurrent or metastatic breast cancer. It aims to understand tumor spread and differences in treatment response.",
    summary: "This registry collects clinical information, blood and tumor samples from people with recurrent or metastatic breast cancer. It aims to understand tumor spread and differences in treatment response.\n\nObservational study registered as NCT03737695, sponsored by Mayo Clinic. Registry enrollment is 300 participants (estimated). Registry status checked October 10, 2026: active not recruiting. UCSF lists this study as closed to local enrollment; local availability and overall registry status are separate. See the registry for full eligibility and current sites.",
    asOf: "2026-10-10",
    cancers: [
      "breast-cancer"
    ],
    institutions: [
      "ucsf"
    ],
    tags: [
      "ucsf-breast-coverage",
      "observational"
    ],
    links: [
      {
        label: "ClinicalTrials.gov NCT03737695",
        url: "https://clinicaltrials.gov/study/NCT03737695"
      },
      {
        label: "UCSF study listing and local availability",
        url: "https://clinicaltrials.ucsf.edu/trial/NCT03737695"
      }
    ],
    participation: [
      {
        nct: "NCT03737695",
        source: "https://clinicaltrials.gov/study/NCT03737695",
        fetchedAt: "2026-10-10T20:54:22.869192Z",
        studySha256: "5c1ceb8dda2e1225c9c0ae2d637154853bc2fb63312b79fcd243c93461d3f15e",
        overallStatus: "ACTIVE_NOT_RECRUITING",
        leadSponsor: "Mayo Clinic",
        collaboratorCount: 0,
        hasEligibility: true,
        siteCount: 14,
        recruitingSiteCount: 0,
        countries: [
          "United States"
        ],
        minimumAge: "18 Years",
        sex: "ALL",
        healthyVolunteers: false,
        enrolment: 300,
        enrolmentType: "ESTIMATED",
        lastUpdatePosted: "2026-06-04"
      }
    ],
    status: "active",
    started: "2019-09-16",
    startedType: "actual",
    drugs: []
  },
  {
    id: "nct04395508",
    kind: "trial",
    name: "At-home pertuzumab and trastuzumab expanded access",
    aka: [
      "An Expanded Access Study to Provide at Home Subcutaneous Administration of Pertuzumab and Trastuzumab Fixed-Dose Combination (PH FDC SC) for Patients With HER2-Positive Breast Cancer During the COVID-19 Pandemic"
    ],
    nct: "NCT04395508",
    phase: "not-applicable",
    setting: "Early or metastatic HER2-positive breast cancer during the COVID-19 pandemic",
    sponsor: "Genentech, Inc.",
    tldr: "This expanded-access program provided at-home injections of pertuzumab and trastuzumab to support continuity of care during the pandemic. It is not a randomized trial; the registry now marks the program approved for marketing.",
    summary: "This expanded-access program provided at-home injections of pertuzumab and trastuzumab to support continuity of care during the pandemic. It is not a randomized trial; the registry now marks the program approved for marketing.\n\nExpanded access study registered as NCT04395508, sponsored by Genentech, Inc.. No drug-development phase applies in the structured registry record. Registry status checked October 10, 2026: approved for marketing. UCSF lists this study as closed to local enrollment; local availability and overall registry status are separate. See the registry for full eligibility and current sites.",
    asOf: "2026-10-10",
    cancers: [
      "breast-cancer"
    ],
    institutions: [
      "ucsf"
    ],
    tags: [
      "ucsf-breast-coverage",
      "expanded-access"
    ],
    links: [
      {
        label: "ClinicalTrials.gov NCT04395508",
        url: "https://clinicaltrials.gov/study/NCT04395508"
      },
      {
        label: "UCSF study listing and local availability",
        url: "https://clinicaltrials.ucsf.edu/trial/NCT04395508"
      }
    ],
    participation: [
      {
        nct: "NCT04395508",
        source: "https://clinicaltrials.gov/study/NCT04395508",
        fetchedAt: "2026-10-10T20:54:22.910516Z",
        studySha256: "f19aafe257fd54019017805977d0bd72e339bee027047ef3895461d3ae718955",
        overallStatus: "APPROVED_FOR_MARKETING",
        leadSponsor: "Genentech, Inc.",
        collaboratorCount: 0,
        hasEligibility: true,
        siteCount: 12,
        recruitingSiteCount: 0,
        countries: [
          "United States"
        ],
        minimumAge: "18 Years",
        sex: "ALL",
        healthyVolunteers: false,
        lastUpdatePosted: "2022-07-05"
      }
    ],
    drugs: [
      "pertuzumab",
      "trastuzumab"
    ]
  },
  {
    id: "nct07659652",
    kind: "trial",
    name: "Quality of life with breast cancer CNS metastases",
    aka: [
      "Quality of Life for Patients With Breast Cancer Brain Metastases and Leptomeningeal Disease"
    ],
    nct: "NCT07659652",
    phase: "observational",
    setting: "Breast cancer brain metastases or leptomeningeal disease",
    sponsor: "University of California, San Francisco",
    tldr: "This observational study follows symptoms and quality of life in people whose breast cancer has spread to the brain or its coverings. It examines how these experiences relate to care decisions.",
    summary: "This observational study follows symptoms and quality of life in people whose breast cancer has spread to the brain or its coverings. It examines how these experiences relate to care decisions.\n\nObservational study registered as NCT07659652, sponsored by University of California, San Francisco. Registry enrollment is 200 participants (estimated). Registry status checked October 10, 2026: not yet recruiting. UCSF lists this study as closed to local enrollment; local availability and overall registry status are separate. See the registry for full eligibility and current sites.",
    asOf: "2026-10-10",
    cancers: [
      "breast-cancer"
    ],
    institutions: [
      "ucsf"
    ],
    tags: [
      "ucsf-breast-coverage",
      "observational"
    ],
    links: [
      {
        label: "ClinicalTrials.gov NCT07659652",
        url: "https://clinicaltrials.gov/study/NCT07659652"
      },
      {
        label: "UCSF study listing and local availability",
        url: "https://clinicaltrials.ucsf.edu/trial/NCT07659652"
      }
    ],
    participation: [
      {
        nct: "NCT07659652",
        source: "https://clinicaltrials.gov/study/NCT07659652",
        fetchedAt: "2026-10-10T20:54:23.083850Z",
        studySha256: "10d3c4e52034a6640f43b398f26f7ffa1f43695ecf3026fcfc8b54d3c7dc6fb0",
        overallStatus: "NOT_YET_RECRUITING",
        leadSponsor: "University of California, San Francisco",
        collaboratorCount: 0,
        hasEligibility: true,
        siteCount: 1,
        recruitingSiteCount: 0,
        countries: [
          "United States"
        ],
        minimumAge: "18 Years",
        sex: "ALL",
        healthyVolunteers: false,
        enrolment: 200,
        enrolmentType: "ESTIMATED",
        lastUpdatePosted: "2026-08-24"
      }
    ],
    status: "planned",
    started: "2026-10-15",
    startedType: "estimated",
    drugs: []
  },
  {
    id: "nct03906331",
    kind: "trial",
    name: "Selpercatinib RET expanded access",
    aka: [
      "Expanded Access for the Treatment of Cancers With Rearranged During Transfection (RET) Activation"
    ],
    nct: "NCT03906331",
    phase: "not-applicable",
    setting: "Cancers with activating RET alterations",
    sponsor: "Eli Lilly and Company",
    tldr: "This expanded-access record concerns selpercatinib for cancers with activating RET changes. The registry now marks the program approved for marketing; this does not mean the former access program is recruiting.",
    summary: "This expanded-access record concerns selpercatinib for cancers with activating RET changes. The registry now marks the program approved for marketing; this does not mean the former access program is recruiting.\n\nExpanded access study registered as NCT03906331, sponsored by Eli Lilly and Company. No drug-development phase applies in the structured registry record. Registry status checked October 10, 2026: approved for marketing. UCSF lists this study as closed to local enrollment; local availability and overall registry status are separate. See the registry for full eligibility and current sites.",
    asOf: "2026-10-10",
    cancers: [
      "breast-cancer"
    ],
    institutions: [
      "ucsf"
    ],
    tags: [
      "ucsf-breast-coverage",
      "expanded-access"
    ],
    links: [
      {
        label: "ClinicalTrials.gov NCT03906331",
        url: "https://clinicaltrials.gov/study/NCT03906331"
      },
      {
        label: "UCSF study listing and local availability",
        url: "https://clinicaltrials.ucsf.edu/trial/NCT03906331"
      }
    ],
    participation: [
      {
        nct: "NCT03906331",
        source: "https://clinicaltrials.gov/study/NCT03906331",
        fetchedAt: "2026-10-10T20:54:23.115792Z",
        studySha256: "4f69eb111522f555f8804537fce4a2ba0e87bf1e41b8ee4bd23fc891bfc2fd01",
        overallStatus: "APPROVED_FOR_MARKETING",
        leadSponsor: "Eli Lilly and Company",
        collaboratorCount: 0,
        hasEligibility: true,
        siteCount: 64,
        recruitingSiteCount: 0,
        countries: [
          "Australia",
          "France",
          "Germany",
          "Hong Kong",
          "Israel",
          "Italy",
          "Japan",
          "New Zealand",
          "Poland",
          "Singapore",
          "Spain",
          "Switzerland",
          "United States"
        ],
        minimumAge: "18 Years",
        sex: "ALL",
        lastUpdatePosted: "2025-01-17"
      }
    ],
    drugs: [
      "selpercatinib"
    ]
  }
];
