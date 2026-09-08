/**
 * Named probability estimates for speculative content (ideas and speculative roadmap steps).
 *
 * Keyed by entity id for ideas, and `<roadmapId>#<stepIndex>` for roadmap steps (0-based).
 * `probability` is a [low, high] range that the claim is borne out on roughly a five-year
 * horizon (for ideas: that the hypothesis is confirmed in a well-powered study; for roadmap
 * steps: that the step is reached). These are initial estimates by the OnCo editors on
 * 2026-09-07, meant to be argued with and revised. Later estimates by named contributors
 * should be appended as new entries in `history` rather than overwriting.
 */
export type Confidence = { probability: [number, number]; by: string; on: string; note?: string; history?: Array<{ probability: [number, number]; by: string; on: string; note?: string }> };

const ed = (lo: number, hi: number, note?: string): Confidence => ({ probability: [lo, hi], by: "OnCo editors (initial estimate)", on: "2026-09-07", note });

export const confidence: Record<string, Confidence> = {
  // ---- Ideas ----
  "idea-trop2-pet-selection": ed(0.35, 0.6, "Tracers exist; the open question is whether uptake predicts ADC benefit better than nothing."),
  "idea-payload-switching": ed(0.5, 0.75, "Cross-resistance among TOP1 payloads is already observed retrospectively; prospective confirmation is likely."),
  "idea-post-neoadjuvant-adc": ed(0.55, 0.8, "Two phase 3 trials fully enrolled; the KATHERINE precedent is strong."),
  "idea-ctdna-escalation-tnbc": ed(0.3, 0.55, "IMvigor011 proved the concept in bladder; TNBC shedding and feasibility are the risks (ZEST)."),
  "idea-efflux-agnostic": ed(0.2, 0.45, "Biologically plausible; no prospective stratification data yet."),
  "idea-fap-theranostics-pancancer": ed(0.25, 0.5, "Imaging is convincing; therapeutic dosimetry to stroma is the unknown."),
  "idea-in-vivo-car-solid": ed(0.1, 0.3, "In vivo CAR is first-in-human in B-cell disease only; solid-tumour antigen and trafficking problems remain."),
  "idea-neoadjuvant-adc-io": ed(0.4, 0.65, "High metastatic response rates and I-SPY signals support it; anthracycline omission is the risk."),
  "idea-til-guided-deescalation": ed(0.55, 0.8, "Retrospective cohorts are consistent; prospective single-arm trials are running."),
  "idea-ai-her2-low-scoring": ed(0.5, 0.75, "Reproducibility gains are near-certain; predictive superiority is the question."),
  "idea-alpha-after-adc": ed(0.1, 0.3, "No radioconjugate against TROP2 or HER2 is in the clinic yet."),
  "idea-shared-kras-vaccine-adjuvant": ed(0.15, 0.35, "AMPLIFY-7P missed its primary endpoint in June 2026; immunogenicity is real, efficacy unproven."),
  "idea-mced-plus-fapi": ed(0.2, 0.45, "Both components exist; nobody has run the diagnostic study."),
  "idea-total-body-pet-dosimetry": ed(0.3, 0.55, "Dosimetry-guided dosing is plausible; a randomised outcome benefit is a higher bar."),
  "idea-organoid-guided-adc": ed(0.2, 0.4, "Take rates and timelines limit feasibility in metastatic disease."),
  "idea-dual-payload-first": ed(0.15, 0.35, "Phase 1 assets only; first-line use is years away."),
  "idea-cd8-pet-io": ed(0.3, 0.5, "Correlative data are encouraging; prospective switch trials are hard to run."),
  "idea-exercise-as-adjuvant": ed(0.5, 0.75, "CHALLENGE gives level-1 evidence in colon cancer; replication in other cancers is likely but slow."),
  "idea-multimodal-foundation-model": ed(0.35, 0.6, "Single-modality predictive AI is already cleared; multimodal treatment-effect prediction is unproven."),
  "idea-interception-vaccines": ed(0.15, 0.35, "Long trials with incidence endpoints; biologically attractive."),
  "idea-alpha-first-mhspc": ed(0.15, 0.35, "Ac-225 supply and toxicity in early disease are the barriers."),
  "idea-mced-new-onset-diabetes": ed(0.25, 0.5, "Enrichment strategy is sound; stage-shift evidence needed."),
  "idea-fus-plus-adc-glioma": ed(0.1, 0.3, "BBB-opening is feasible; drug efficacy in glioblastoma has a long record of failure."),
  "idea-neoadjuvant-io-glioblastoma": ed(0.1, 0.25, "Prior IO trials in glioblastoma were negative; neoadjuvant timing is a hypothesis, not a fix."),
  "idea-psma-pet-guided-mdt": ed(0.5, 0.75, "Randomised MDT trials with PSMA PET are underway; SBRT benefit in oligometastatic disease is established."),
  "idea-ras-inhibitor-neoadjuvant-pdac": ed(0.35, 0.6, "Depends on RASolute 302 confirmation and resectability conversion."),

  // ---- Speculative roadmap steps ----
  "adc-generations#6": ed(0.3, 0.55, "Imaging-guided ADC selection needs a predictive tracer and a positive selection trial."),
  "trop2-adc-roadmap#6": ed(0.45, 0.7, "Bispecific TROP2 ADCs are already in the clinic; the PET-guided algorithm is the uncertain part."),
  "tnbc-history#5": ed(0.25, 0.5, "Cure for most stage II-III patients is plausible on current trajectories; control for mesenchymal disease is not."),
  "radiopharma-roadmap#5": ed(0.4, 0.65, "Gated by Ac-225 supply and by combination trials."),
  "cell-therapy-roadmap#4": ed(0.2, 0.45, "In vivo CAR and logic-gated solid-tumour CARs are early; autoimmune use may arrive first."),
  "molecular-imaging-roadmap#4": ed(0.3, 0.55, "Total-body PET and antigen tracers exist; routine pre-ADC imaging needs reimbursement and evidence."),
  "early-detection-roadmap#4": ed(0.25, 0.5, "Depends on the 2026 FDA decision and on mortality data that do not yet exist."),
  "immunotherapy-roadmap#4": ed(0.3, 0.55, "Shared-neoantigen vaccines have failed once; myeloid reprogramming is unproven."),
  "kras-roadmap#4": ed(0.35, 0.6, "Neoadjuvant RAS inhibition is being tested now; interception in cyst carriers is far off."),
};
