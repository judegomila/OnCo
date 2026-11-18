import { protocol } from "./helpers";
import { ASCO_GAP, ASCO_ICI_2021, ESMO_GAP, ESMO_ICI_2022, SITC_ICI_2021 } from "./irae-sources";

/*
 * Eye side effects of checkpoint inhibitors: dry eye, uveitis, optic neuritis and orbital inflammation.
 *
 * What was read, and how (first pass, 11 November 2026): SITC 2021 full text and the 2025 consensus disease
 * definitions for ophthalmic irAEs (main text only); ASCO 2021 abstract only; ESMO 2022 not reachable.
 *
 * Second accuracy pass, 17 November 2026. Every claim was re-read against raw text:
 * - 2025 Eye-irAE consensus (J Immunother Cancer, PMC11979595): full-text XML fetched again from the Europe PMC REST
 *   API with curl; DOI resolved through Crossref and Europe PMC, title checked, no correction or newer edition listed.
 *   Its online supplemental tables, not read in the first pass, were fetched from the Europe PMC supplementaryFiles
 *   endpoint (two Word files) and unpacked to text by script. Nothing is quoted from the supplement.
 * - SITC 2021: the Europe PMC full-text XML saved on 16 November 2026 by the irae-myocarditis checker was re-used.
 * - ASCO 2021: abstract only (the Europe PMC record saved by the same checker); the full text still refuses a script,
 *   so its organ-by-organ tables, including any for the eye, are not read. ESMO 2022: still not reachable.
 * - CTCAE v5.0 and v6.0: new source for the uveitis and visual acuity grade definitions, read from the National Cancer
 *   Institute spreadsheets saved on 16 November 2026 by the irae-colitis checker.
 * - Macmillan's pembrolizumab page: new source for the patient advice on which eye symptoms to report and how fast,
 *   fetched with curl and stripped of tags by script.
 * Quotes checked by script against the raw text on 17 November 2026.
 * Corrected in this pass: periocular injection was offered for posterior uveitis and panuveitis (the source offers it
 * for intermediate uveitis); "consider" and "may be considered" written as orders; "only" added to the rule on holding
 * the checkpoint inhibitor; the optic neuritis step lost "most cases" and "or equivalent"; SITC's "under the guidance
 * of an ophthalmologist" written as "examined"; SITC's general rule to withhold at grade 2 was missing; reasons that
 * said more than the sources; "rarely" with no frequency; and an urgency line for patients that had no source.
 */
export const iraeOcular = protocol({
  id: "irae-ocular",
  name: "Eye side effects of checkpoint inhibitors: dry eye, uveitis and optic neuritis",
  aka: ["checkpoint inhibitor uveitis", "ocular irAEs", "Eye-irAEs", "immune-related uveitis", "immune-related optic neuritis", "immune-related dry eye disease", "ophthalmic immune-related adverse events"],
  domain: "immunotherapy-toxicity",
  tldr: "Immunotherapy can cause dry, gritty eyes or inflammation inside the eye (uveitis); inflammation of the nerve to the eye has also been reported. Contact your hospital's 24-hour number straight away about dry, itchy, painful or swollen eyes, sensitivity to light or any change in eyesight. Dry eye and uveitis at the front of the eye are usually treated with drops, and immunotherapy usually continues.",
  simple: "Immunotherapy can sometimes affect the eyes. Contact your hospital's 24-hour number straight away about dry, itchy, painful or swollen eyes, sensitivity to light, or any change in your eyesight.",
  summary: "Dry eye (1 to 24% in prospective trials) and uveitis (under 1% to 6% in clinical trials) are the commonest ocular irAEs; optic neuropathy, extraocular muscle myopathy, keratitis and orbitopathy are also reported, and untreated ocular toxicity may lead to vision loss (SITC 2021). The 2025 Eye-irAE consensus adds definitions for optic neuritis, orbital inflammation, thyroid eye disease-like orbital inflammation, cranial nerve palsies, scleritis and episcleritis, and says most begin within 6 months of starting treatment. Infection, metastasis to the eye or orbit and pre-existing autoimmune disease can look the same, so other causes need excluding; steroids may worsen an infection or mask the diagnosis when the ophthalmologist examines the eye.\n\nGrading: SITC grades by CTCAE version 5.0 without printing the eye definitions. CTCAE 5.0 grades uveitis by site and cell count: anterior uveitis with trace cells is grade 1; with 1+ or 2+ cells, grade 2; with 3+ or more cells, or any intermediate, posterior or panuveitis, grade 3; best corrected visual acuity of 20/200 or worse in the affected eye, grade 4. For blurred vision, optic nerve disorder and scleral disorder, grade 3 begins at acuity worse than 20/40 or more than 3 lines lost from baseline. CTCAE has no term for episcleritis, and version 6.0 (2025) leaves the uveitis grades unchanged.\n\nSITC 2021: ophthalmological consultation for diagnosis, grading and management; consider referral, if available, for grade 1 to 2 symptoms and refer immediately at grade 3 or more; MRI of the brain with pituitary cuts if ocular or bulbar symptoms are present; steroids for eye symptoms start under an ophthalmologist's guidance unless needed for another problem; artificial tears may be used. SITC gives no eye-specific steroid dose and no eye-specific rule on holding the checkpoint inhibitor, so its general rules stand: grade 1 may continue with monitoring, and at grade 2 treatment is temporarily withheld, unless otherwise specified.\n\nThe 2025 consensus is disease-specific. Anterior uveitis: topical steroid (every hour at first in its summary table), follow-up every 1 to 2 weeks, and the checkpoint inhibitor not discontinued; its supplemental table says not to hold it unless the uveitis cannot be adequately controlled. Intermediate uveitis: topical steroid, then periocular or intraocular steroid injection may be considered if findings persist. Posterior uveitis: mild disease could be observed with close follow-up; panuveitis starts with topical steroid; for both, intraocular steroid may be considered if findings persist or worsen, then holding the checkpoint inhibitor, oral steroids or both if disease still progresses. Optic neuritis: most cases are treated, by withholding the checkpoint inhibitor and giving IV methylprednisolone 1000 mg daily or equivalent, started as soon as infectious causes are ruled out and continued for 3 to 5 days. Dry eye: local treatment, review every 1 to 2 months, and the checkpoint inhibitor may continue in most cases. Episcleritis: lubricating drops, topical steroid and oral NSAIDs. Scleritis: oral NSAIDs or oral steroids titrated to signs and symptoms. The panel discussed no visual acuity thresholds and no absolute eye indication for stopping the checkpoint inhibitor, a decision it leaves to the oncologist and ophthalmologist together.\n\nFor patients, Macmillan's pembrolizumab page (reviewed August 2026) says to contact the hospital straight away on the 24-hour number about dry, itchy, painful or swollen eyes, eyes that are sensitive to light, or changes to eyesight, during treatment or after it ends.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "nurse", "patient-or-carer"],
    where: ["outpatient-clinic", "acute-oncology-service", "telephone-triage", "emergency-department"],
  },
  population: "People receiving or who have received an immune checkpoint inhibitor who develop eye symptoms. SITC notes that similar eye problems can come from infection, from cancer that has spread to the eye or orbit, or from pre-existing autoimmune disease. Neither guideline addresses children separately.",
  trigger: "Red, painful, dry or gritty eyes, light sensitivity, floaters, blurred vision, loss of vision, double vision, or droopy or puffy eyelids during or after checkpoint inhibitor treatment.",
  steps: [
    {
      action: "Ask patients to contact the hospital straight away, on its 24-hour number, about dry, itchy, painful or swollen eyes, sensitivity to light or any change in eyesight, during treatment or after it ends",
      why: "Macmillan gives this advice for pembrolizumab. The 2025 consensus says eye side effects can occur at any time on treatment or after it has finished.",
      source: "macmillan-pembrolizumab",
      quote: "This treatment can affect your eyes and eyesight. Contact the hospital straight away on the 24-hour number if you have any of these symptoms during treatment or after it ends:",
    },
    {
      action: "For grade 1 to 2 eye symptoms, consider referral to an ophthalmologist",
      why: "SITC notes that the symptoms of uveitis may not reflect how severe it is.",
      source: "sitc-2021",
      quote: "Eye symptoms of visual disturbance; red, painful, dry, or irritated eyes; double vision; droopy or puffy eyelids; and difficultly moving the eyes that are grade 1–2 in any patient undergoing immunotherapy should prompt the clinician to consider ophthalmological referral if available.",
    },
    {
      action: "For grade 3 or more eye symptoms, refer to an ophthalmologist immediately",
      why: "SITC warns that untreated eye side effects may lead to loss of vision.",
      source: "sitc-2021",
      quote: "Eye symptoms of visual disturbance; red, painful, dry or irritated eyes; double vision; droopy or puffy eyelids; and difficultly moving the eyes that are grade ≥3 in any patient undergoing immunotherapy should prompt immediate ophthalmological referral.",
    },
    {
      action: "Start steroid drops or systemic steroids for eye symptoms only under the guidance of an ophthalmologist, unless systemic steroids are needed for another side effect",
      why: "Steroids may worsen an eye infection that looks the same, and may hide the signs the specialist needs to make the diagnosis and grade it.",
      source: "sitc-2021",
      quote: "Initiation of systemic or topical treatment with corticosteroids for eye symptoms should occur under the guidance of an ophthalmologist, unless systemic steroids are needed for non-ophthalmological issues.",
    },
    {
      action: "If there are ocular or bulbar symptoms, such as difficulty moving the eyes, obtain an MRI of the brain including pituitary cuts",
      why: "SITC describes double vision, drooping lids and restricted eye movement in myasthenia gravis and myositis, which affect the eye muscles and not the eye itself.",
      source: "sitc-2021",
      quote: "If ocular or bulbar symptoms are present (eg, difficulty moving eyes), MRI of the brain (including pituitary cuts) should be conducted.",
    },
    {
      action: "For uveitis, test to rule out syphilis, tuberculosis, Lyme disease where endemic, and sarcoidosis",
      why: "Other causes of uveitis, particularly infections, have to be ruled out before it is treated as a side effect of immunotherapy.",
      source: "eye-irae-2025",
      quote: "For all uveitis anatomic locations, testing to rule out syphilis, tuberculosis, Lyme disease (in endemic areas) and sarcoidosis should be done.",
    },
    {
      action: "Treat anterior uveitis with steroid eye drops, with follow-up every 1 to 2 weeks until symptoms and signs resolve, and do not stop the checkpoint inhibitor unless the uveitis cannot be adequately controlled",
      why: "The panel agreed that inflammation at the front of the eye can generally be controlled with drops. Its summary table starts them every hour and then reduces to the least frequent dose that keeps the eye quiet.",
      source: "eye-irae-2025",
      quote: "For irAU, a topical ophthalmic corticosteroid is recommended with follow-up every 1–2 weeks until symptoms and signs resolve.",
    },
    {
      action: "For posterior uveitis or panuveitis that persists or worsens on follow-up, consider a steroid injection into the eye; if it still progresses, consider holding the checkpoint inhibitor, starting oral steroids, or both",
      why: "Mild posterior uveitis could be observed with close follow-up, and panuveitis starts with steroid drops for the front of the eye. The panel's tables call holding the checkpoint inhibitor and systemic steroids a last resort, because systemic treatment may reduce the benefit of the cancer treatment; some panellists thought that too cautious.",
      source: "eye-irae-2025",
      quote: "For irPanU, the recommended treatment would be to initiate a topical ophthalmic corticosteroid to treat the anterior segment inflammation with follow-up every 1–2 weeks. If findings persist or worsen on follow-up, then intraocular steroids may be considered. If disease progresses despite this, consider holding the ICI and/or initiating oral corticosteroids.",
    },
    {
      action: "For most cases of immune-related optic neuritis, withhold the checkpoint inhibitor and start IV methylprednisolone 1000 mg daily, or equivalent, as soon as infectious causes are ruled out; it can be continued for 3 to 5 days",
      why: "Optic neuritis generally causes an acute loss of vision. Treatment is then adjusted to how much sight is lost and how it responds to the steroid.",
      source: "eye-irae-2025",
      quote: "Most cases of irON should be treated, including withholding of ICI and initiation of immunomodulation. Intravenous methylprednisolone (IVMP) at a dose of 1000 mg daily or equivalent should be initiated as soon as infectious causes are ruled out and can be continued for 3–5 days.",
    },
    {
      action: "Manage dry eye with local eye treatment and continue the checkpoint inhibitor in most cases; discuss a scheduled break with the oncology team if local treatment cannot control it and the cornea is at risk of permanent damage",
      why: "Lubricating drops and other local treatments are the recommended care, with review every 1 to 2 months until symptoms resolve. SITC notes that dry eye may be severe enough to perforate the cornea.",
      source: "eye-irae-2025",
      quote: "If the irDED cannot be adequately controlled with local therapies and there is risk of permanent damage to the cornea, then a scheduled break in ICI may be discussed with the oncology team. For most cases, ICI may be continued.",
    },
  ],
  bestInClass: {
    statement: "SITC 2021 sets the frame: ophthalmology involvement, immediate referral at grade 3 or more, and steroids for eye symptoms started only under an ophthalmologist's guidance. The 2025 Eye-irAE consensus definitions, drafted by uveitis specialists and neuro-ophthalmologists and rated by a multidisciplinary panel through a modified Delphi process, are the most recent and most specific source: the checkpoint inhibitor is not discontinued for anterior uveitis and may continue for most dry eye, deeper uveitis is treated locally first, and for most optic neuritis the checkpoint inhibitor is withheld and IV methylprednisolone given. Neither source grades its eye recommendations, and the 2025 authors say treatment of these conditions is not standardised.",
    sources: ["sitc-2021", "eye-irae-2025"],
  },
  variants: [
    {
      name: "Grade-driven referral without disease-specific treatment (SITC 2021)",
      differs: "Refers by CTCAE grade and leaves treatment to the ophthalmologist. It gives no eye-specific rule on the checkpoint inhibitor, so its general rule stands: unless otherwise specified, treatment is temporarily withheld at grade 2. In CTCAE 5.0 anterior uveitis with 1+ or 2+ cells is grade 2, the condition for which the 2025 consensus says the checkpoint inhibitor should not be discontinued.",
      evidence: "Expert consensus; no level of evidence printed for the ophthalmological recommendations or for the general grade 2 rule.",
      sources: ["sitc-2021", "ctcae-v5", "eye-irae-2025"],
    },
    {
      name: "Earlier systemic steroids or an earlier break in the checkpoint inhibitor (views within the 2025 panel)",
      differs: "The supplemental tables for intermediate uveitis, posterior uveitis, panuveitis and dry eye say to consider holding the checkpoint inhibitor as a last resort. Some panellists thought that wording overly conservative when symptoms are severe or inflammation is uncontrolled, and the medical oncologists on the panel said systemic steroids may be used for vision-threatening disease, especially in acute settings. For optic neuritis the main text says most cases should be treated with the checkpoint inhibitor withheld, while the supplemental table says to consider holding it.",
      evidence: "Panel discussion; the authors call the timing of systemic steroids an area of controversy that needs more research.",
      sources: ["eye-irae-2025"],
    },
  ],
  grades: [
    { claim: "Anterior uveitis: the checkpoint inhibitor should not be discontinued", grade: "consensus (modified Delphi), not graded", source: "eye-irae-2025", quote: "Consensus was reached that the ICI should not be discontinued and that irAU can generally be successfully controlled with topical therapy." },
    { claim: "Immediate ophthalmology referral for grade 3 or more eye symptoms", grade: "not graded (expert consensus)", source: "sitc-2021" },
  ],
  sources: [
    { ...SITC_ICI_2021, accessed: "2026-11-17" },
    {
      key: "eye-irae-2025",
      label: "Consensus disease definitions for ophthalmic immune-related adverse events of immune checkpoint inhibitors",
      publisher: "Journal for ImmunoTherapy of Cancer",
      year: 2025,
      url: "https://europepmc.org/article/PMC/PMC11979595",
      doi: "10.1136/jitc-2024-011049",
      gradingScheme: "Modified Delphi consensus using the RAND/UCLA Appropriateness Method, 29 panellists from 25 academic centres rating each component on 9-point scales; definitions and treatment guidance, not graded recommendations.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "ctcae-v5",
      label: "Common Terminology Criteria for Adverse Events (CTCAE) version 5.0",
      publisher: "US National Cancer Institute, Cancer Therapy Evaluation Program",
      year: 2017,
      url: "https://dctd.cancer.gov/research/ctep-trials/trial-development",
      gradingScheme: "Not an evidence grade: a severity scale for each adverse event term, from grade 1 to grade 5 (death). Version 6.0 (2025) was compared for the uveitis term, which is unchanged.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "macmillan-pembrolizumab",
      label: "Pembrolizumab",
      publisher: "Macmillan Cancer Support",
      year: 2026,
      url: "https://www.macmillan.org.uk/cancer-information-and-support/treatments-and-drugs/pembrolizumab",
      gradingScheme: "Patient information page; not graded. Reviewed 1 August 2026, next review 1 August 2028.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    { ...ASCO_ICI_2021, accessed: "2026-11-17" },
    ESMO_ICI_2022,
  ],
  upgrades: [],
  gaps: [
    ESMO_GAP,
    ASCO_GAP,
    "The ASCO 2021 full text, and so whatever it says about the eye by grade, could not be read on 17 November 2026, and no grade-by-grade steroid dose for the eye is stated here. Neither SITC 2021 nor the 2025 consensus gives a dose for topical, periocular or intraocular steroid. The 2025 consensus gives a systemic steroid dose for optic neuritis but none for uveitis or episcleritis, and for scleritis says only that oral steroids are titrated to signs and symptoms.",
    "On 17 November 2026 the online supplemental tables of the 2025 Eye-irAE definitions, which the authors call the primary reference, were read from Europe PMC. The publisher states that supplemental material is supplied by the authors and may not have been peer-reviewed, so the steps quote the main text only.",
    "The 2025 panel did not discuss visual acuity thresholds for severity, or any absolute eye indication for stopping the checkpoint inhibitor, so what counts as vision-threatening remains a clinical judgement. The only acuity thresholds on this page are the CTCAE grade definitions.",
    "CTCAE has no term for episcleritis, and the 2025 panel did not reach consensus on the accuracy of its diagnostic criteria for episcleritis.",
    "SITC's general rule (withhold at grade 2 unless otherwise specified) and the 2025 consensus (do not discontinue for anterior uveitis) have not been reconciled by either body.",
    "No guideline read gives patients a list of eye symptoms to report or a time limit. The advice here is Macmillan's for pembrolizumab; its pages for the other checkpoint inhibitors were not read.",
  ],
  drugs: ["pembrolizumab", "nivolumab", "ipilimumab", "atezolizumab", "durvalumab", "cemiplimab", "tremelimumab", "avelumab", "dostarlimab", "methylprednisolone"],
  technologies: ["checkpoint-inhibitor"],
  institutions: ["sitc", "asco", "esmo"],
  terms: ["irae"],
  keyPapers: ["paper-asco-irae-guideline-jco-2021"],
  related: ["irae-neurological", "irae-thyroid", "irae-hypophysitis-adrenal"],
  tags: ["protocol", "irae", "ophthalmology"],
});
