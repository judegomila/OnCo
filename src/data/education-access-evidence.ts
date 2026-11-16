import type { TermInput } from "@/lib/schema";

/** General U.S. regulatory distinctions; sources and scopes are attached to each record. */
export const educationAccessEvidence: TermInput[] = [
  {
    "id": "investigational-new-drug-application",
    "name": "Investigational New Drug application",
    "aka": [
      "IND application",
      "Investigational New Drug",
      "investigator IND"
    ],
    "tldr": "This application supports a specified investigation or treatment-access use of a drug in the United States. It is separate from permission to market the product.",
    "summary": "An Investigational New Drug application contains nonclinical, manufacturing and clinical-protocol information for defined investigational use. Becoming effective does not establish that the product benefits a person or is approved for marketing, and a clinical hold can prevent use. A New Drug Application or Biologics License Application instead requests marketing authorization. Submission, acceptance for filing, an application becoming effective and a marketing decision are different events. The applicable route and product version matter.",
    "notes": ["For an ordinary new IND, FDA describes a 30-calendar-day period after receipt before an investigation may begin, unless FDA gives earlier notification or imposes a hold. Expanded-access INDs and protocols have route-specific rules; no application number establishes a treatment start date.","Product identity matters alongside the proposed use. A redesigned cell product or personalised formulation cannot acquire another product's evidence or authorisation merely by sharing a target, ingredient category or platform name. FDA assesses nonclinical, manufacturing and clinical-protocol information for the proposed investigation. Ask whether the cited data and permission actually cover that product version and plan; a supplier's earlier authorisation is not itself permission for a different use."],
    "links": [{"label":"FDA: Investigational New Drug application","url":"https://www.fda.gov/drugs/types-applications/investigational-new-drug-application-ind"},{"label":"FDA: new drug applications","url":"https://www.fda.gov/drugs/types-applications/new-drug-application-nda"},{"label":"FDA: biologics license applications","url":"https://www.fda.gov/vaccines-blood-biologics/development-approval-process-cber/biologics-license-applications-blas-cber-regulated-products"},{"label":"FDA: expanded access questions and answers, April 2026","url":"https://www.fda.gov/media/162793/download"}],
    "related": [
      "bla-nda",
      "first-in-human",
      "expanded-access",
      "investigator-initiated-trials",
      "trial-protocol"
    ],
    "kind": "term",
    "asOf": "2026-11-11",
    "category": "Regulation & policy"
  },
  {
    "id": "investigator-initiated-trials",
    "name": "Investigator-initiated trials and study responsibilities",
    "aka": [
      "investigator-initiated trial",
      "investigator-sponsored study",
      "sponsor-investigator"
    ],
    "tldr": "A researcher can originate a study while its sponsor, investigators, supplier and funders have distinct responsibilities. The protocol and regulatory arrangement identify who does what.",
    "summary": "Investigator-initiated describes the origin of a study, not its phase, evidence strength or authorization. Under U.S. drug-investigation rules, a sponsor initiates and takes responsibility for the investigation; an investigator conducts it. An individual sponsor-investigator has both sets of responsibilities. An academic institution can also sponsor a study. Product supply or funding alone should not be used to infer the regulatory sponsor. The proposed protocol determines whether an IND or another applicable arrangement is needed.",
    "notes": [
      "A study of a lawfully marketed drug is IND-exempt only when all applicable exemption conditions are met. These include the study purpose, risk implications of dose, route or population, and required ethics review and informed consent. Academic origin or approved-drug status alone does not establish exemption."
    ],
    "links": [
      {
        "label": "21 CFR 312.3: sponsor and investigator definitions",
        "url": "https://www.ecfr.gov/current/title-21/chapter-I/subchapter-D/part-312/subpart-A/section-312.3"
      },
      {
        "label": "21 CFR 312.2: applicability and exemptions",
        "url": "https://www.ecfr.gov/current/title-21/chapter-I/subchapter-D/part-312/subpart-A/section-312.2"
      },
      {
        "label": "FDA: IND exemption criteria",
        "url": "https://www.fda.gov/drugs/investigational-new-drug-application-ind/ind-application-procedures-exemptions-ind-requirements"
      },
      {
        "label": "FDA: Investigational New Drug application",
        "url": "https://www.fda.gov/drugs/types-applications/investigational-new-drug-application-ind"
      }
    ],
    "related": [
      "investigational-new-drug-application",
      "clinical-trial",
      "trial-protocol",
      "expanded-access",
      "off-label"
    ],
    "kind": "term",
    "asOf": "2026-11-08",
    "category": "Regulation & policy"
  },
  {
    "id": "laboratory-certification-test-authorization",
    "name": "Laboratory certification and test authorization",
    "aka": [
      "Clinical Laboratory Improvement Amendments",
      "CLIA laboratory certification",
      "CLIA certification",
      "laboratory quality versus test authorization"
    ],
    "tldr": "Laboratory certification addresses the laboratory and its testing quality. Product authorization and evidence that a particular test use helps patients answer separate questions.",
    "summary": "The U.S. Clinical Laboratory Improvement Amendments program sets laboratory-quality requirements for testing human specimens. CMS distinguishes analytical oversight under that program from clinical validity, which concerns what a result means for a clinical condition. A research-use label describes intended purpose; a laboratory-developed-test description concerns how and where a test is developed and used. FDA product authorization concerns a specified product and intended use. These descriptions can coexist and do not form one universal ladder of clinical usefulness or payment.",
    "notes": [
      "The CMS FAQ is used here for the analytical-oversight versus clinical-validity distinction, not its historical discussion of FDA authority over laboratory-developed tests. Current procedural history is retained in the separate FDA LDT-rule record.",
      "An entry in FDA establishment registration or device listing does not itself mean that the facility or device is approved, cleared or authorized. Registration and product authorization are separate claims.",
      "Three examples separate intended uses. Validated ER immunohistochemistry in invasive breast cancer, with appropriate tissue handling, tumour-nucleus scoring and controls, has a marker-specific pathology and endocrine-treatment assessment role; it does not validate a new RNA score as a substitute. In a wholly fictional second example, assay T version 1 detects alteration M in fixed tumour tissue under rule R, and Drug A requires exactly that result in setting S. The stipulated match supplies that requirement within the exercise, without promising benefit; another specimen, result type or setting needs evidence for the changed use. A third fictional score Q combines RNA, spatial neighbourhoods and a derived culture response to propose Drug A. Reproducibility and biological support can justify research, but do not establish that Q-guided care improves outcomes against an appropriate comparator. A laboratory certificate does not supply that missing evidence. Useful research and an established clinical use can appear on different parts of one report."
    ],
    "links": [
      {
        "label": "CMS: Clinical Laboratory Improvement Amendments",
        "url": "https://www.cms.gov/medicare/quality/clinical-laboratory-improvement-amendments"
      },
      {
        "label": "CMS: CLIA analytical oversight and clinical validity (2013 FAQ; historical FDA discussion not used)",
        "url": "https://www.cms.gov/regulations-and-guidance/legislation/clia/downloads/ldt-and-clia_faqs.pdf"
      },
      {
        "label": "FDA: current laboratory-developed-test rule notice",
        "url": "https://www.fda.gov/medical-devices/in-vitro-diagnostics/laboratory-developed-tests"
      },
      {
        "label": "FDA: research-use-only and investigational-use-only IVD guidance",
        "url": "https://www.fda.gov/media/87374/download"
      },
      {
        "label": "FDA: companion diagnostics",
        "url": "https://www.fda.gov/medical-devices/in-vitro-diagnostics/companion-diagnostics"
      },
      {
        "label": "FDA: registration and listing do not establish authorization",
        "url": "https://www.fda.gov/medical-devices/device-registration-and-listing/important-reminders-about-registration-and-listing"
      },{"label":"ASCO/CAP: ER and PR testing recommendations (2020)","url":"https://www.cap.org/wp-content/uploads/documents/erpgr_summaryrecommendations.pdf"},{"label":"FDA: companion diagnostic labeling for a group of oncology products (April 2020)","url":"https://www.fda.gov/media/120340/download"}],
    "related": [
      "research-use-only",
      "fda-ldt-rule",
      "analytical-vs-clinical-validation",
      "companion-diagnostic",
      "companion-diagnostic-term"
    ],
    "kind": "term",
    "asOf": "2026-11-13",
    "category": "Regulation & policy"
  },
  {
    "id": "trial-search-site-verification",
    "name": "Clinical trial search, site verification and screening",
    "aka": [
      "finding a clinical trial",
      "trial-site verification",
      "trial prescreening",
      "trial screening and enrollment"
    ],
    "tldr": "A trial search identifies studies to examine. The study team must separately check the relevant site, cohort and full eligibility requirements.",
    "summary": "NCI describes finding a study, discussing it with the team, informed consent and formal screening as distinct steps. A registry identifier helps distinguish studies, while the dated protocol and record describe the design and entry rules. Overall recruiting status can reflect an open facility elsewhere; it does not establish an available place in the relevant local cohort. A matching diagnosis or biomarker is only part of eligibility. Medical-history review and required tests can still exclude participation after an initial discussion.",
    "notes": ["Search with disease, treatment setting, intervention aliases, biomarker and location terms. Keep registry verification and update dates with the result; ask the team about the current protocol, site and cohort. A record or invitation to screen is not a promise of enrollment.","Estimated enrollment is a target total, while actual enrollment records people already enrolled. Neither is a count of places available now. Overall study recruitment, an individual facility’s status and availability in the relevant cohort or dose group require separate dated checks.","When a protocol randomizes participants, meeting its entry rules does not reserve the experimental arm. Assignment follows the protocol’s chance process rather than a choice by the participant or doctor. Screening, eligibility, enrollment, arm assignment and individual benefit are different steps; a plausible match or invitation to screen does not establish the later steps.","Keep a compact screening record: registry number and title, current protocol version, disease and stage, treatment goal and required biomarker. Ask about previous treatments, relevant conditions and safety history, current medicines, laboratory criteria and required samples. Advanced-disease and postoperative studies can share a biomarker while requiring different measurable disease, pathology or enrolment windows. A washout is the interval defined by that protocol after a named treatment or medicine; its starting event and duration must be checked with the treating and study teams. A deadline or a half-life calculation is not permission to change treatment.","Confirm the relevant site, cohort and slot, each assignment group and the randomisation ratio, screening and visit dates, treatment duration and follow-up. Check travel, sample needs, available support and who pays. Record who supplied each dated answer and what remains unknown; request the current protocol or consent material and clarify discrepancies between it, the registry and the site. A personal eligibility worksheet prepares that discussion and does not replace formal screening.","In a fictional postoperative study, a matching molecular report is a reason to ask about screening, not proof of pathology, treatment-history, local availability or timing eligibility. If Drug B plus standard care is randomised against standard care alone, either group can be assigned; neither the doctor nor participant chooses the experimental arm. If a multicohort registry says recruiting but the local breast cohort has no slots, access is unconfirmed. Asking about another site or reopening supplies a next question, not a promise. Trial phase describes the research question rather than an individual benefit estimate."],
    "links": [{"label":"NCI: steps to find a clinical trial","url":"https://www.cancer.gov/research/participate/clinical-trials-search/steps"},{"label":"NCI: what to expect during a clinical trial","url":"https://www.cancer.gov/research/participate/clinical-trials/what-to-expect"},{"label":"ClinicalTrials.gov: protocol registration definitions","url":"https://clinicaltrials.gov/policy/protocol-definitions"},{"label":"42 CFR 11.10: overall recruitment and individual-site status","url":"https://www.govinfo.gov/content/pkg/CFR-2025-title42-vol1/pdf/CFR-2025-title42-vol1-sec11-10.pdf"},{"label":"NCI: eligibility, randomization and clinical-trial comparisons","url":"https://www.cancer.gov/research/participate/clinical-trials/how-trials-work"},{"label":"NCI: research, routine-care and practical costs of a trial","url":"https://www.cancer.gov/research/participate/clinical-trials/paying"}],
    "related": [
      "clinical-trial",
      "trial-registration",
      "trial-protocol",
      "accrual",
      "expanded-access",
      "investigational-new-drug-application"
    ],
    "kind": "term",
    "asOf": "2026-11-11",
    "category": "Regulation & policy"
  }
];
