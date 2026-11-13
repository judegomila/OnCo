import type { ProtocolInput } from "@/lib/schema";
import { acuteOncologyTelephoneTriage } from "./acute-oncology-telephone-triage";
import { alloHctGvhdProphylaxis } from "./allo-hct-gvhd-prophylaxis";
import { ambulatoryChemotherapyPumpsAtHome } from "./ambulatory-chemotherapy-pumps-at-home";
import { antiVegfDrugsAroundSurgery } from "./anti-vegf-drugs-around-surgery";
import { antibacterialProphylaxisInNeutropenia } from "./antibacterial-prophylaxis-in-neutropenia";
import { anticancerDrugInteractionReview } from "./anticancer-drug-interaction-review";
import { anticipatoryNauseaAndVomiting } from "./anticipatory-nausea-and-vomiting";
import { anticoagulantsAndAntiplateletsBeforeEndoscopy } from "./anticoagulants-and-antiplatelets-before-endoscopy";
import { antiemeticProphylaxisByEmeticRisk } from "./antiemetic-prophylaxis-by-emetic-risk";
import { antifungalProphylaxisInHaematology } from "./antifungal-prophylaxis-in-haematology";
import { antithromboticInterruptionAroundSurgery } from "./antithrombotic-interruption-around-surgery";
import { asepticCompoundingOfHazardousAnticancerDrugs } from "./aseptic-compounding-of-hazardous-anticancer-drugs";
import { bispecificStepUpDosing } from "./bispecific-step-up-dosing";
import { bleedingPrecautionsWhenPlateletsAreLow } from "./bleeding-precautions-when-platelets-are-low";
import { bloodSamplingFromACentralLine } from "./blood-sampling-from-a-central-line";
import { bodySizeBasedDoseCalculation } from "./body-size-based-dose-calculation";
import { boneHealthOnHormoneTherapy } from "./bone-health-on-hormone-therapy";
import { boneMarrowAspirateAndTrephineBiopsy } from "./bone-marrow-aspirate-and-trephine-biopsy";
import { bowelPreparationForColonoscopy } from "./bowel-preparation-for-colonoscopy";
import { breastCancerFollowUpAfterTreatment } from "./breast-cancer-follow-up-after-treatment";
import { breastRadiotherapyPositioningAndSetup } from "./breast-radiotherapy-positioning-and-setup";
import { breastScreeningAfterChestRadiotherapyAtAYoungAge } from "./breast-screening-after-chest-radiotherapy-at-a-young-age";
import { breathHoldLeftBreastRadiotherapy } from "./breath-hold-left-breast-radiotherapy";
import { cancerAssociatedVteTreatment } from "./cancer-associated-vte-treatment";
import { cancerRelatedFatigueScreeningAndManagement } from "./cancer-related-fatigue-screening-and-management";
import { carTApheresis } from "./car-t-apheresis";
import { carTBridging } from "./car-t-bridging";
import { carTInfectionPrevention } from "./car-t-infection-prevention";
import { carTLymphodepletion } from "./car-t-lymphodepletion";
import { carTReferralAndEligibility } from "./car-t-referral-and-eligibility";
import { carboplatinDoseCalculation } from "./carboplatin-dose-calculation";
import { cardioOncologyRiskAssessmentAndCardiacSurveillance } from "./cardio-oncology-risk-assessment-and-cardiac-surveillance";
import { careInTheLastDaysOfLife } from "./care-in-the-last-days-of-life";
import { catheterRelatedThrombosisInCancer } from "./catheter-related-thrombosis-in-cancer";
import { centralLineInsertionBundle } from "./central-line-insertion-bundle";
import { centralLineMaintenanceBundle } from "./central-line-maintenance-bundle";
import { centralLineOcclusionManagement } from "./central-line-occlusion-management";
import { centralLineRemoval } from "./central-line-removal";
import { centralVenousCatheterInsertionForAnticancerTherapy } from "./central-venous-catheter-insertion-for-anticancer-therapy";
import { checkpointInhibitorBaselineAndMonitoring } from "./checkpoint-inhibitor-baseline-and-monitoring";
import { chemotherapyExtravasationManagement } from "./chemotherapy-extravasation-management";
import { chemotherapyInducedAnaemiaEsaAndIron } from "./chemotherapy-induced-anaemia-esa-and-iron";
import { chemotherapyInducedPeripheralNeuropathyAssessmentAndPrevention } from "./chemotherapy-induced-peripheral-neuropathy-assessment-and-prevention";
import { chronicPainInCancerSurvivors } from "./chronic-pain-in-cancer-survivors";
import { colorectalCancerFollowUpAfterCurativeTreatment } from "./colorectal-cancer-follow-up-after-curative-treatment";
import { communityCareOfVascularAccessDevices } from "./community-care-of-vascular-access-devices";
import { consentAndEducationBeforeAnticancerTreatment } from "./consent-and-education-before-anticancer-treatment";
import { contrastReactionHistoryAndPremedication } from "./contrast-reaction-history-and-premedication";
import { crsGradingAndManagement } from "./crs-grading-and-management";
import { dentalAssessmentBeforeBoneModifyingAgents } from "./dental-assessment-before-bone-modifying-agents";
import { diagnosticBronchoscopyAndEbusPreparation } from "./diagnostic-bronchoscopy-and-ebus-preparation";
import { dietAlcoholAndWeightDuringCancerTreatment } from "./diet-alcohol-and-weight-during-cancer-treatment";
import { distressScreeningAndReferral } from "./distress-screening-and-referral";
import { doseBandingOfAnticancerDrugs } from "./dose-banding-of-anticancer-drugs";
import { dpydTestingBeforeFluoropyrimidines } from "./dpyd-testing-before-fluoropyrimidines";
import { drivingFlyingAndTravelDuringCancerTreatment } from "./driving-flying-and-travel-during-cancer-treatment";
import { drugDesensitisationAfterAnticancerHypersensitivity } from "./drug-desensitisation-after-anticancer-hypersensitivity";
import { egfrInhibitorRashProphylaxis } from "./egfr-inhibitor-rash-prophylaxis";
import { enhancedRecoveryAfterBreastReconstruction } from "./enhanced-recovery-after-breast-reconstruction";
import { enhancedRecoveryAfterColorectalSurgery } from "./enhanced-recovery-after-colorectal-surgery";
import { enhancedRecoveryAfterCytoreductiveSurgeryAndHipec } from "./enhanced-recovery-after-cytoreductive-surgery-and-hipec";
import { enhancedRecoveryAfterGastrectomy } from "./enhanced-recovery-after-gastrectomy";
import { enhancedRecoveryAfterGynaecologicalCancerSurgery } from "./enhanced-recovery-after-gynaecological-cancer-surgery";
import { enhancedRecoveryAfterHeadAndNeckFreeFlapSurgery } from "./enhanced-recovery-after-head-and-neck-free-flap-surgery";
import { enhancedRecoveryAfterLiverSurgery } from "./enhanced-recovery-after-liver-surgery";
import { enhancedRecoveryAfterLungSurgery } from "./enhanced-recovery-after-lung-surgery";
import { enhancedRecoveryAfterOesophagectomy } from "./enhanced-recovery-after-oesophagectomy";
import { enhancedRecoveryAfterPancreatoduodenectomy } from "./enhanced-recovery-after-pancreatoduodenectomy";
import { enhancedRecoveryAfterRadicalCystectomy } from "./enhanced-recovery-after-radical-cystectomy";
import { exerciseDuringAndAfterCancerTreatment } from "./exercise-during-and-after-cancer-treatment";
import { eyeCareWithOcularToxicAntibodyDrugConjugates } from "./eye-care-with-ocular-toxic-antibody-drug-conjugates";
import { fdgPetCtPreparation } from "./fdg-pet-ct-preparation";
import { febrileNeutropeniaFirstHour } from "./febrile-neutropenia-first-hour";
import { fertilityPreservationBeforeCancerTreatment } from "./fertility-preservation-before-cancer-treatment";
import { fertilityProtectionBeforePelvicRadiotherapy } from "./fertility-protection-before-pelvic-radiotherapy";
import { foodSafetyAndNeutropenicDiet } from "./food-safety-and-neutropenic-diet";
import { gCsfProphylaxisByFebrileNeutropeniaRisk } from "./g-csf-prophylaxis-by-febrile-neutropenia-risk";
import { gadoliniumContrastKidneyImpairment } from "./gadolinium-contrast-kidney-impairment";
import { geriatricAssessmentBeforeSystemicCancerTherapy } from "./geriatric-assessment-before-systemic-cancer-therapy";
import { handFootSyndromePreventionAndDoseModification } from "./hand-foot-syndrome-prevention-and-dose-modification";
import { handHygieneInCancerCare } from "./hand-hygiene-in-cancer-care";
import { hazardousDrugHandlingInClinicalAreas } from "./hazardous-drug-handling-in-clinical-areas";
import { hdrBrachytherapyRoomSafetyAndStuckSourceEmergency } from "./hdr-brachytherapy-room-safety-and-stuck-source-emergency";
import { headAndNeckRadiotherapyDentalAssessmentOsteoradionecrosis } from "./head-and-neck-radiotherapy-dental-assessment-osteoradionecrosis";
import { headAndNeckRadiotherapyImmobilisationMask } from "./head-and-neck-radiotherapy-immobilisation-mask";
import { headAndNeckRadiotherapyOralMucositis } from "./head-and-neck-radiotherapy-oral-mucositis";
import { hepaticDoseAdjustmentOfAnticancerDrugs } from "./hepatic-dose-adjustment-of-anticancer-drugs";
import { hepatitisBScreeningAndReactivationProphylaxis } from "./hepatitis-b-screening-and-reactivation-prophylaxis";
import { herpesSimplexAndZosterAntiviralProphylaxis } from "./herpes-simplex-and-zoster-antiviral-prophylaxis";
import { hotFlushesOnEndocrineTherapyNonHormonalOptions } from "./hot-flushes-on-endocrine-therapy-non-hormonal-options";
import { hypercalcaemiaOfMalignancy } from "./hypercalcaemia-of-malignancy";
import { hyperleukocytosisLeukostasis } from "./hyperleukocytosis-leukostasis";
import { hyponatraemiaSiadh } from "./hyponatraemia-siadh";
import { icahtProlongedCytopenia } from "./icaht-prolonged-cytopenia";
import { icansGradingAndManagement } from "./icans-grading-and-management";
import { iecHsManagement } from "./iec-hs-management";
import { imageGuidedCoreBiopsyPreparationAndAftercare } from "./image-guided-core-biopsy-preparation-and-aftercare";
import { implantedPortAccessAndCare } from "./implanted-port-access-and-care";
import { indwellingPleuralCatheterDrainageAtHome } from "./indwelling-pleural-catheter-drainage-at-home";
import { infusionReactionManagement } from "./infusion-reaction-management";
import { insomniaInAdultsWithCancer } from "./insomnia-in-adults-with-cancer";
import { intrathecalChemotherapyAndVincaAlkaloidSafety } from "./intrathecal-chemotherapy-and-vinca-alkaloid-safety";
import { iodinatedContrastKidneyAndMetformin } from "./iodinated-contrast-kidney-and-metformin";
import { iraeColitis } from "./irae-colitis";
import { iraeDiabetes } from "./irae-diabetes";
import { iraeHaematological } from "./irae-haematological";
import { iraeHepatitis } from "./irae-hepatitis";
import { iraeHypophysitisAdrenal } from "./irae-hypophysitis-adrenal";
import { iraeMyocarditis } from "./irae-myocarditis";
import { iraeNephritis } from "./irae-nephritis";
import { iraeNeurological } from "./irae-neurological";
import { iraeOcular } from "./irae-ocular";
import { iraePneumonitis } from "./irae-pneumonitis";
import { iraeRechallenge } from "./irae-rechallenge";
import { iraeRheumatological } from "./irae-rheumatological";
import { iraeSkin } from "./irae-skin";
import { iraeSteroidTaperAndPjp } from "./irae-steroid-taper-and-pjp";
import { iraeThyroid } from "./irae-thyroid";
import { irinotecanEarlyCholinergicSyndromeAndLateDiarrhoea } from "./irinotecan-early-cholinergic-syndrome-and-late-diarrhoea";
import { linearAcceleratorQualityAssurance } from "./linear-accelerator-quality-assurance";
import { lutetium177TherapyHomeRadiationSafety } from "./lutetium-177-therapy-home-radiation-safety";
import { lymphoedemaRiskReductionSurveillanceAndTreatment } from "./lymphoedema-risk-reduction-surveillance-and-treatment";
import { malignantAscitesDrainage } from "./malignant-ascites-drainage";
import { malignantBowelObstruction } from "./malignant-bowel-obstruction";
import { malignantPericardialEffusion } from "./malignant-pericardial-effusion";
import { medicinesReconciliationInCancerCare } from "./medicines-reconciliation-in-cancer-care";
import { metastaticSpinalCordCompression } from "./metastatic-spinal-cord-compression";
import { midlineCathetersForAnticancerTherapy } from "./midline-catheters-for-anticancer-therapy";
import { mriSafetyScreeningImplants } from "./mri-safety-screening-implants";
import { nauseaAndVomitingInAdvancedCancer } from "./nausea-and-vomiting-in-advanced-cancer";
import { neratinibDiarrhoeaProphylaxisAndDoseEscalation } from "./neratinib-diarrhoea-prophylaxis-and-dose-escalation";
import { neutropenicEnterocolitis } from "./neutropenic-enterocolitis";
import { neutropenicPrecautionsAndDailyLife } from "./neutropenic-precautions-and-daily-life";
import { nutritionScreeningAndSupportDuringCancerTreatment } from "./nutrition-screening-and-support-during-cancer-treatment";
import { opioidSwitchingAndConversion } from "./opioid-switching-and-conversion";
import { oralAnticancerMedicinesAtHome } from "./oral-anticancer-medicines-at-home";
import { oralMucositisPreventionAndOralCare } from "./oral-mucositis-prevention-and-oral-care";
import { paediatricChemotherapyNauseaVomitingPrevention } from "./paediatric-chemotherapy-nausea-vomiting-prevention";
import { paediatricCisplatinHearingProtection } from "./paediatric-cisplatin-hearing-protection";
import { paediatricClostridioidesDifficile } from "./paediatric-clostridioides-difficile";
import { paediatricFertilityPreservation } from "./paediatric-fertility-preservation";
import { paediatricFeverAndNeutropenia } from "./paediatric-fever-and-neutropenia";
import { paediatricOralMucositisPrevention } from "./paediatric-oral-mucositis-prevention";
import { paediatricPlateletTransfusionThresholds } from "./paediatric-platelet-transfusion-thresholds";
import { paediatricProceduralPainAndSedation } from "./paediatric-procedural-pain-and-sedation";
import { palliativeSedation } from "./palliative-sedation-for-refractory-suffering";
import { pelvicRadiationDiseaseBowelSymptoms } from "./pelvic-radiation-disease-bowel-symptoms";
import { peripheralCannulaForAnticancerTherapy } from "./peripheral-cannula-for-anticancer-therapy";
import { permanentProstateSeedBrachytherapyHomeRadiationSafety } from "./permanent-prostate-seed-brachytherapy-home-radiation-safety";
import { piccAndTunnelledLineCare } from "./picc-and-tunnelled-line-care";
import { pneumocystisPneumoniaProphylaxis } from "./pneumocystis-pneumonia-prophylaxis";
import { premedicationBeforeReactionProneAnticancerDrugs } from "./premedication-before-reaction-prone-anticancer-drugs";
import { prostateBiopsyRouteAndAntibioticProphylaxis } from "./prostate-biopsy-route-and-antibiotic-prophylaxis";
import { prostateRadiotherapyBladderAndRectalPreparation } from "./prostate-radiotherapy-bladder-and-rectal-preparation";
import { radiationDermatitisSkinCare } from "./radiation-dermatitis-skin-care";
import { radioiodineTherapyHomeRadiationSafety } from "./radioiodine-therapy-home-radiation-safety";
import { radionuclideTherapyPatientReleaseCriteria } from "./radionuclide-therapy-patient-release-criteria";
import { radiotherapyConsent } from "./radiotherapy-consent";
import { radiotherapyDoseFractionationReference } from "./radiotherapy-dose-fractionation-reference";
import { radiotherapyPatientIdentificationAndTimeOut } from "./radiotherapy-patient-identification-and-time-out";
import { radiotherapyPlanningCtSimulation } from "./radiotherapy-planning-ct-simulation";
import { radiotherapyPregnancyAndBreastfeedingEnquiry } from "./radiotherapy-pregnancy-and-breastfeeding-enquiry";
import { radiotherapyRiskAnalysisFmea } from "./radiotherapy-risk-analysis-fmea";
import { radiotherapyWithPacemakerOrDefibrillator } from "./radiotherapy-with-pacemaker-or-defibrillator";
import { raisedIntracranialPressure } from "./raised-intracranial-pressure";
import { redCellAndPlateletTransfusionThresholds } from "./red-cell-and-platelet-transfusion-thresholds";
import { renalDoseAdjustmentOfAnticancerDrugs } from "./renal-dose-adjustment-of-anticancer-drugs";
import { respiratoryMotionManagement4dCtAndGating } from "./respiratory-motion-management-4d-ct-and-gating";
import { routinePreoperativeTests } from "./routine-preoperative-tests";
import { sactAdministrationChecksAtTheChair } from "./sact-administration-checks-at-the-chair";
import { sactPrescribingAndPharmacyVerification } from "./sact-prescribing-and-pharmacy-verification";
import { scalpCoolingDuringChemotherapy } from "./scalp-cooling-during-chemotherapy";
import { sentinelNodeTracersAndBlueDyeSafety } from "./sentinel-node-tracers-and-blue-dye-safety";
import { sexAndContraceptionDuringChemotherapy } from "./sex-and-contraception-during-chemotherapy";
import { sexualHealthAssessmentAndInterventions } from "./sexual-health-assessment-and-interventions";
import { skinAndNailCareDuringCancerDrugTreatment } from "./skin-and-nail-care-during-cancer-drug-treatment";
import { stereotacticRadiosurgeryAndSbrtDeliverySafeguards } from "./stereotactic-radiosurgery-and-sbrt-delivery-safeguards";
import { strongOpioidsForCancerPain } from "./strong-opioids-for-cancer-pain";
import { sunProtectionDuringAndAfterCancerTreatment } from "./sun-protection-during-and-after-cancer-treatment";
import { superiorVenaCavaObstruction } from "./superior-vena-cava-obstruction";
import { surgicalSiteInfectionPrevention } from "./surgical-site-infection-prevention";
import { survivorshipCarePlanAndTreatmentSummary } from "./survivorship-care-plan-and-treatment-summary";
import { suspectedCentralLineInfection } from "./suspected-central-line-infection";
import { syringeDriverContinuousSubcutaneousInfusion } from "./syringe-driver-continuous-subcutaneous-infusion";
import { treatmentInducedDiarrhoeaGradingAndManagement } from "./treatment-induced-diarrhoea-grading-and-management";
import { tumourLysisSyndrome } from "./tumour-lysis-syndrome";
import { vaccinationAroundCancerTreatment } from "./vaccination-around-cancer-treatment";
import { venousAccessDeviceSelectionForAnticancerTherapy } from "./venous-access-device-selection-for-anticancer-therapy";
import { vteProphylaxisAfterCancerSurgery } from "./vte-prophylaxis-after-cancer-surgery";
import { vteRiskAssessmentAndThromboprophylaxisAmbulatory } from "./vte-risk-assessment-and-thromboprophylaxis-ambulatory";

/**
 * Every care protocol, one import per file. Fill agents add their file here; the list is a plain union, so a parallel
 * round resolves by keeping both sides. Rules in docs/PROTOCOLS.md.
 */
export const protocols: ProtocolInput[] = [
  acuteOncologyTelephoneTriage,
  alloHctGvhdProphylaxis,
  ambulatoryChemotherapyPumpsAtHome,
  antiVegfDrugsAroundSurgery,
  antibacterialProphylaxisInNeutropenia,
  anticancerDrugInteractionReview,
  anticipatoryNauseaAndVomiting,
  anticoagulantsAndAntiplateletsBeforeEndoscopy,
  antiemeticProphylaxisByEmeticRisk,
  antifungalProphylaxisInHaematology,
  antithromboticInterruptionAroundSurgery,
  asepticCompoundingOfHazardousAnticancerDrugs,
  bispecificStepUpDosing,
  bleedingPrecautionsWhenPlateletsAreLow,
  bloodSamplingFromACentralLine,
  bodySizeBasedDoseCalculation,
  boneHealthOnHormoneTherapy,
  boneMarrowAspirateAndTrephineBiopsy,
  bowelPreparationForColonoscopy,
  breastCancerFollowUpAfterTreatment,
  breastRadiotherapyPositioningAndSetup,
  breastScreeningAfterChestRadiotherapyAtAYoungAge,
  breathHoldLeftBreastRadiotherapy,
  cancerAssociatedVteTreatment,
  cancerRelatedFatigueScreeningAndManagement,
  carTApheresis,
  carTBridging,
  carTInfectionPrevention,
  carTLymphodepletion,
  carTReferralAndEligibility,
  carboplatinDoseCalculation,
  cardioOncologyRiskAssessmentAndCardiacSurveillance,
  careInTheLastDaysOfLife,
  catheterRelatedThrombosisInCancer,
  centralLineInsertionBundle,
  centralLineMaintenanceBundle,
  centralLineOcclusionManagement,
  centralLineRemoval,
  centralVenousCatheterInsertionForAnticancerTherapy,
  checkpointInhibitorBaselineAndMonitoring,
  chemotherapyExtravasationManagement,
  chemotherapyInducedAnaemiaEsaAndIron,
  chemotherapyInducedPeripheralNeuropathyAssessmentAndPrevention,
  chronicPainInCancerSurvivors,
  colorectalCancerFollowUpAfterCurativeTreatment,
  communityCareOfVascularAccessDevices,
  consentAndEducationBeforeAnticancerTreatment,
  contrastReactionHistoryAndPremedication,
  crsGradingAndManagement,
  dentalAssessmentBeforeBoneModifyingAgents,
  diagnosticBronchoscopyAndEbusPreparation,
  dietAlcoholAndWeightDuringCancerTreatment,
  distressScreeningAndReferral,
  doseBandingOfAnticancerDrugs,
  dpydTestingBeforeFluoropyrimidines,
  drivingFlyingAndTravelDuringCancerTreatment,
  drugDesensitisationAfterAnticancerHypersensitivity,
  egfrInhibitorRashProphylaxis,
  enhancedRecoveryAfterBreastReconstruction,
  enhancedRecoveryAfterColorectalSurgery,
  enhancedRecoveryAfterCytoreductiveSurgeryAndHipec,
  enhancedRecoveryAfterGastrectomy,
  enhancedRecoveryAfterGynaecologicalCancerSurgery,
  enhancedRecoveryAfterHeadAndNeckFreeFlapSurgery,
  enhancedRecoveryAfterLiverSurgery,
  enhancedRecoveryAfterLungSurgery,
  enhancedRecoveryAfterOesophagectomy,
  enhancedRecoveryAfterPancreatoduodenectomy,
  enhancedRecoveryAfterRadicalCystectomy,
  exerciseDuringAndAfterCancerTreatment,
  eyeCareWithOcularToxicAntibodyDrugConjugates,
  fdgPetCtPreparation,
  febrileNeutropeniaFirstHour,
  fertilityPreservationBeforeCancerTreatment,
  fertilityProtectionBeforePelvicRadiotherapy,
  foodSafetyAndNeutropenicDiet,
  gCsfProphylaxisByFebrileNeutropeniaRisk,
  gadoliniumContrastKidneyImpairment,
  geriatricAssessmentBeforeSystemicCancerTherapy,
  handFootSyndromePreventionAndDoseModification,
  handHygieneInCancerCare,
  hazardousDrugHandlingInClinicalAreas,
  hdrBrachytherapyRoomSafetyAndStuckSourceEmergency,
  headAndNeckRadiotherapyDentalAssessmentOsteoradionecrosis,
  headAndNeckRadiotherapyImmobilisationMask,
  headAndNeckRadiotherapyOralMucositis,
  hepaticDoseAdjustmentOfAnticancerDrugs,
  hepatitisBScreeningAndReactivationProphylaxis,
  herpesSimplexAndZosterAntiviralProphylaxis,
  hotFlushesOnEndocrineTherapyNonHormonalOptions,
  hypercalcaemiaOfMalignancy,
  hyperleukocytosisLeukostasis,
  hyponatraemiaSiadh,
  icahtProlongedCytopenia,
  icansGradingAndManagement,
  iecHsManagement,
  imageGuidedCoreBiopsyPreparationAndAftercare,
  implantedPortAccessAndCare,
  indwellingPleuralCatheterDrainageAtHome,
  infusionReactionManagement,
  insomniaInAdultsWithCancer,
  intrathecalChemotherapyAndVincaAlkaloidSafety,
  iodinatedContrastKidneyAndMetformin,
  iraeColitis,
  iraeDiabetes,
  iraeHaematological,
  iraeHepatitis,
  iraeHypophysitisAdrenal,
  iraeMyocarditis,
  iraeNephritis,
  iraeNeurological,
  iraeOcular,
  iraePneumonitis,
  iraeRechallenge,
  iraeRheumatological,
  iraeSkin,
  iraeSteroidTaperAndPjp,
  iraeThyroid,
  irinotecanEarlyCholinergicSyndromeAndLateDiarrhoea,
  linearAcceleratorQualityAssurance,
  lutetium177TherapyHomeRadiationSafety,
  lymphoedemaRiskReductionSurveillanceAndTreatment,
  malignantAscitesDrainage,
  malignantBowelObstruction,
  malignantPericardialEffusion,
  medicinesReconciliationInCancerCare,
  metastaticSpinalCordCompression,
  midlineCathetersForAnticancerTherapy,
  mriSafetyScreeningImplants,
  nauseaAndVomitingInAdvancedCancer,
  neratinibDiarrhoeaProphylaxisAndDoseEscalation,
  neutropenicEnterocolitis,
  neutropenicPrecautionsAndDailyLife,
  nutritionScreeningAndSupportDuringCancerTreatment,
  opioidSwitchingAndConversion,
  oralAnticancerMedicinesAtHome,
  oralMucositisPreventionAndOralCare,
  paediatricChemotherapyNauseaVomitingPrevention,
  paediatricCisplatinHearingProtection,
  paediatricClostridioidesDifficile,
  paediatricFertilityPreservation,
  paediatricFeverAndNeutropenia,
  paediatricOralMucositisPrevention,
  paediatricPlateletTransfusionThresholds,
  paediatricProceduralPainAndSedation,
  palliativeSedation,
  pelvicRadiationDiseaseBowelSymptoms,
  peripheralCannulaForAnticancerTherapy,
  permanentProstateSeedBrachytherapyHomeRadiationSafety,
  piccAndTunnelledLineCare,
  pneumocystisPneumoniaProphylaxis,
  premedicationBeforeReactionProneAnticancerDrugs,
  prostateBiopsyRouteAndAntibioticProphylaxis,
  prostateRadiotherapyBladderAndRectalPreparation,
  radiationDermatitisSkinCare,
  radioiodineTherapyHomeRadiationSafety,
  radionuclideTherapyPatientReleaseCriteria,
  radiotherapyConsent,
  radiotherapyDoseFractionationReference,
  radiotherapyPatientIdentificationAndTimeOut,
  radiotherapyPlanningCtSimulation,
  radiotherapyPregnancyAndBreastfeedingEnquiry,
  radiotherapyRiskAnalysisFmea,
  radiotherapyWithPacemakerOrDefibrillator,
  raisedIntracranialPressure,
  redCellAndPlateletTransfusionThresholds,
  renalDoseAdjustmentOfAnticancerDrugs,
  respiratoryMotionManagement4dCtAndGating,
  routinePreoperativeTests,
  sactAdministrationChecksAtTheChair,
  sactPrescribingAndPharmacyVerification,
  scalpCoolingDuringChemotherapy,
  sentinelNodeTracersAndBlueDyeSafety,
  sexAndContraceptionDuringChemotherapy,
  sexualHealthAssessmentAndInterventions,
  skinAndNailCareDuringCancerDrugTreatment,
  stereotacticRadiosurgeryAndSbrtDeliverySafeguards,
  strongOpioidsForCancerPain,
  sunProtectionDuringAndAfterCancerTreatment,
  superiorVenaCavaObstruction,
  surgicalSiteInfectionPrevention,
  survivorshipCarePlanAndTreatmentSummary,
  suspectedCentralLineInfection,
  syringeDriverContinuousSubcutaneousInfusion,
  treatmentInducedDiarrhoeaGradingAndManagement,
  tumourLysisSyndrome,
  vaccinationAroundCancerTreatment,
  venousAccessDeviceSelectionForAnticancerTherapy,
  vteProphylaxisAfterCancerSurgery,
  vteRiskAssessmentAndThromboprophylaxisAmbulatory,
];
