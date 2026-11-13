import { protocol } from "./helpers";
import { ASCO_ICI_2021, ESMO_GAP, ESMO_ICI_2022, SITC_ICI_2021 } from "./irae-sources";

/*
 * Eye side effects of checkpoint inhibitors: dry eye, uveitis, optic neuritis and orbital inflammation.
 *
 * What was read, and how: SITC 2021 (full text, ophthalmological section and recommendations), as described in
 * ./irae-sources.ts; the 2025 consensus disease definitions for ophthalmic irAEs (J Immunother Cancer, open access,
 * full text from Europe PMC, PMC11979595; its online supplemental tables were not read). ASCO 2021 abstract only; ESMO
 * 2022 not reachable. DOIs resolved through Europe PMC. Quotes checked by script against the raw text on 11 November
 * 2026.
 */
export const iraeOcular = protocol({
  id: "irae-ocular",
  name: "Eye side effects of checkpoint inhibitors: dry eye, uveitis and optic neuritis",
  aka: ["checkpoint inhibitor uveitis", "ocular irAEs", "Eye-irAEs", "immune-related uveitis", "immune-related optic neuritis", "immune-related dry eye disease", "ophthalmic immune-related adverse events"],
  domain: "immunotherapy-toxicity",
  tldr: "Immunotherapy can occasionally cause dry, gritty eyes or inflammation inside the eye (uveitis), and rarely of the nerve to the eye. Red or painful eyes, sensitivity to light, floaters, blurred or double vision, or drooping eyelids should be reported so an eye specialist can see you. Most is treated with eye drops and immunotherapy usually continues; sudden loss of vision is an emergency.",
  simple: "Immunotherapy can sometimes affect the eyes. Tell your team about red, painful or dry eyes, or blurred or double vision. Sudden loss of sight is an emergency.",
  summary: "Dry eye (1 to 24% in prospective trials) and uveitis (under 1% to 6%) are the commonest ocular irAEs; optic neuritis, orbital inflammation, thyroid eye disease and eye-movement disorders from myasthenia or myositis also occur (SITC 2021). Most begin within 6 months of starting treatment. Infection and metastasis to the eye must be excluded, and steroids given before an eye examination can worsen an infection or mask the diagnosis.\n\nSITC 2021: ophthalmology input for diagnosis, grading and management; consider referral for grade 1 to 2 symptoms and refer immediately for grade 3 or more; MRI brain with pituitary views if there are ocular or bulbar symptoms; start steroids for eye symptoms only under an ophthalmologist unless needed for another irAE; artificial tears for symptoms.\n\nThe 2025 Eye-irAE consensus definitions add disease-specific treatment: anterior uveitis is treated with topical steroid with review every 1 to 2 weeks and the checkpoint inhibitor is not stopped; posterior and panuveitis step up to local injections, with holding the checkpoint inhibitor or oral steroids only if disease progresses; immune-related optic neuritis is treated by withholding the checkpoint inhibitor and giving IV methylprednisolone 1000 mg daily for 3 to 5 days once infection is excluded; dry eye is managed locally and the checkpoint inhibitor usually continues.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "nurse", "patient-or-carer"],
    where: ["outpatient-clinic", "acute-oncology-service", "telephone-triage", "emergency-department"],
  },
  population: "Adults receiving or who have received an immune checkpoint inhibitor who develop eye symptoms. People with a past history of uveitis, autoimmune eye disease or eye metastases need particular care. Children are not addressed by these sources.",
  trigger: "Red, painful, dry or gritty eyes, light sensitivity, floaters, blurred vision, loss of vision, double vision, or droopy or puffy eyelids during or after checkpoint inhibitor treatment.",
  steps: [
    {
      action: "For grade 1 to 2 eye symptoms, consider referral to an ophthalmologist",
      why: "Even mild-looking symptoms can hide inflammation that threatens sight.",
      source: "sitc-2021",
      quote: "Eye symptoms of visual disturbance; red, painful, dry, or irritated eyes; double vision; droopy or puffy eyelids; and difficultly moving the eyes that are grade 1–2 in any patient undergoing immunotherapy should prompt the clinician to consider ophthalmological referral if available.",
    },
    {
      action: "For grade 3 or more eye symptoms, refer to an ophthalmologist immediately",
      why: "Severe inflammation can cause permanent loss of vision.",
      source: "sitc-2021",
      quote: "Eye symptoms of visual disturbance; red, painful, dry or irritated eyes; double vision; droopy or puffy eyelids; and difficultly moving the eyes that are grade ≥3 in any patient undergoing immunotherapy should prompt immediate ophthalmological referral.",
    },
    {
      action: "Do not start steroids for eye symptoms before an ophthalmologist has examined the eye, unless they are needed for another side effect",
      why: "Steroids can worsen an eye infection that looks the same, and can hide the signs the specialist needs.",
      source: "sitc-2021",
      quote: "Initiation of systemic or topical treatment with corticosteroids for eye symptoms should occur under the guidance of an ophthalmologist, unless systemic steroids are needed for non-ophthalmological issues.",
    },
    {
      action: "If there are eye-movement problems or other bulbar symptoms, obtain an MRI of the brain including the pituitary",
      why: "Double vision or droopy lids may come from myasthenia, myositis, hypophysitis or the brain rather than the eye.",
      source: "sitc-2021",
      quote: "If ocular or bulbar symptoms are present (eg, difficulty moving eyes), MRI of the brain (including pituitary cuts) should be conducted.",
    },
    {
      action: "For uveitis, test for syphilis, tuberculosis, Lyme disease where endemic, and sarcoidosis",
      why: "Infections and sarcoidosis cause the same inflammation and need different treatment.",
      source: "eye-irae-2025",
      quote: "For all uveitis anatomic locations, testing to rule out syphilis, tuberculosis, Lyme disease (in endemic areas) and sarcoidosis should be done.",
    },
    {
      action: "Treat anterior uveitis with steroid eye drops, reviewing every 1 to 2 weeks, and continue the checkpoint inhibitor",
      why: "Inflammation at the front of the eye can usually be controlled with drops alone.",
      source: "eye-irae-2025",
      quote: "For irAU, a topical ophthalmic corticosteroid is recommended with follow-up every 1–2 weeks until symptoms and signs resolve.",
    },
    {
      action: "For posterior uveitis or panuveitis that persists or worsens, step up to steroid injections in or around the eye, and consider holding the checkpoint inhibitor or giving oral steroids only if it still progresses",
      why: "Deeper inflammation can damage the retina, but local treatment often avoids stopping cancer treatment.",
      source: "eye-irae-2025",
      quote: "For irPanU, the recommended treatment would be to initiate a topical ophthalmic corticosteroid to treat the anterior segment inflammation with follow-up every 1–2 weeks. If findings persist or worsen on follow-up, then intraocular steroids may be considered. If disease progresses despite this, consider holding the ICI and/or initiating oral corticosteroids.",
    },
    {
      action: "For immune-related optic neuritis, withhold the checkpoint inhibitor and give IV methylprednisolone 1000 mg daily for 3 to 5 days once infection is excluded",
      why: "Inflammation of the optic nerve can cause rapid, lasting loss of sight.",
      source: "eye-irae-2025",
      quote: "Most cases of irON should be treated, including withholding of ICI and initiation of immunomodulation. Intravenous methylprednisolone (IVMP) at a dose of 1000 mg daily or equivalent should be initiated as soon as infectious causes are ruled out and can be continued for 3–5 days.",
    },
    {
      action: "Manage dry eye with local eye treatment and continue the checkpoint inhibitor in most cases; discuss a planned break only if the cornea is at risk",
      why: "Dry eye is usually managed with eye treatments alone.",
      source: "eye-irae-2025",
      quote: "If the irDED cannot be adequately controlled with local therapies and there is risk of permanent damage to the cornea, then a scheduled break in ICI may be discussed with the oncology team. For most cases, ICI may be continued.",
    },
  ],
  bestInClass: {
    statement: "SITC 2021 sets the frame: ophthalmology involvement, immediate referral at grade 3 or more, and no steroids for eye symptoms until an ophthalmologist has examined the eye. The 2025 Eye-irAE consensus definitions, written by uveitis specialists and neuro-ophthalmologists through a modified Delphi process, are the most recent and most specific source: they keep the checkpoint inhibitor going for anterior uveitis and most dry eye, treat locally first for deeper uveitis, and withhold the checkpoint inhibitor with IV methylprednisolone for optic neuritis. Neither source grades its recommendations, and there are no trials.",
    sources: ["sitc-2021", "eye-irae-2025"],
  },
  variants: [
    {
      name: "Grade-driven referral without disease-specific treatment (SITC 2021)",
      differs: "Refers by CTCAE grade and leaves treatment to the ophthalmologist, without saying when the checkpoint inhibitor may continue for a specific eye condition.",
      evidence: "Expert consensus; no level of evidence printed for the ophthalmological recommendations.",
      sources: ["sitc-2021"],
    },
  ],
  grades: [
    { claim: "Anterior uveitis: the checkpoint inhibitor should not be discontinued", grade: "consensus (modified Delphi), not graded", source: "eye-irae-2025", quote: "Consensus was reached that the ICI should not be discontinued and that irAU can generally be successfully controlled with topical therapy." },
    { claim: "Immediate ophthalmology referral for grade 3 or more eye symptoms", grade: "not graded (expert consensus)", source: "sitc-2021" },
  ],
  sources: [
    SITC_ICI_2021,
    {
      key: "eye-irae-2025",
      label: "Consensus disease definitions for ophthalmic immune-related adverse events of immune checkpoint inhibitors",
      publisher: "Journal for ImmunoTherapy of Cancer",
      year: 2025,
      url: "https://europepmc.org/article/PMC/PMC11979595",
      doi: "10.1136/jitc-2024-011049",
      gradingScheme: "Modified Delphi consensus using the RAND/UCLA Appropriateness Method, 29 panellists from 25 academic centres; definitions and treatment guidance, not graded recommendations.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    ASCO_ICI_2021,
    ESMO_ICI_2022,
  ],
  upgrades: [],
  gaps: [
    ESMO_GAP,
    "The ASCO 2021 guideline was read only as its abstract and its ocular table is not compared here.",
    "The online supplemental tables of the 2025 Eye-irAE definitions, which the authors call the primary reference, were not read; the steps rest on the main text only.",
    "The 2025 panel did not set visual acuity thresholds for severity, so what counts as vision-threatening remains a clinical judgement.",
  ],
  drugs: ["pembrolizumab", "nivolumab", "ipilimumab", "atezolizumab", "durvalumab", "cemiplimab", "tremelimumab", "avelumab", "dostarlimab", "methylprednisolone"],
  technologies: ["checkpoint-inhibitor"],
  institutions: ["sitc", "asco", "esmo"],
  terms: ["irae"],
  keyPapers: ["paper-asco-irae-guideline-jco-2021"],
  related: ["irae-neurological", "irae-thyroid", "irae-hypophysitis-adrenal"],
  tags: ["protocol", "irae", "ophthalmology"],
});
