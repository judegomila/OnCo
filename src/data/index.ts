import { ucsfBreastTrials } from "./ucsf-breast-trials";
import { trop2PreclinicalWatch } from "./trop2-preclinical-watch";
import { trop2EmergingModalities } from "./trop2-emerging-modalities";
import { trop2TrialLandscape } from "./trop2-trial-landscape";
import { trop2DeeperRegistry } from "./trop2-deeper-registry";
import { parpSelectiveReview } from "./parp-selective-review";
import { cancers } from "./cancers";
import { canonicalTermCategory } from "./term-categories";
import { sections } from "./sections";
import { technologies } from "./technologies";
import { targets } from "./targets";
import { drugs } from "./drugs";
import { companies } from "./companies";
import { institutions } from "./institutions";
import { pathways } from "./pathways";
import { terms } from "./terms";
import { trials } from "./trials";
import { pairings } from "./pairings";
import { roadmaps } from "./roadmaps";
import { ideas } from "./ideas";
import { collections } from "./collections";
import type { DrugInput, EntityInput, TargetInput } from "@/lib/schema";
import { applySpikeSupplements, mergeSpikeInto, spikeEntities, unappliedSpikeSupplements, unpatchedSpikeCancers } from "./spikes";
import { applyMergeSupplements, unappliedMergeSupplements } from "./merged-records";
import { failures } from "./failures";
import { pipelineTrials } from "./pipeline-trials";
import { groups } from "./groups";
import { frontier } from "./frontier";
import { people } from "./people";
import { peopleInvestigatorsWave } from "./people-investigators-wave";
import { cassianYeePeople, cassianYeeCompanies, cassianYeeInstitutions, cassianYeeTerms, cassianYeePapers, cassianYeeTrials } from "./people-cassian-yee-2026-11";
import { bottlenecks } from "./bottlenecks";
import { sources } from "./sources";
import { mechanisms } from "./mechanisms";
import { frontierRoadmaps } from "./frontier-roadmap";
import { supporting } from "./supporting";
import { gapFill } from "./gap-fill";
import { keyPapers } from "./key-papers";
import { papersSubtypesWave } from "./papers-subtypes-wave";
import { papersRareWave } from "./papers-rare-wave";
import { papersPancreaticWave } from "./papers-pancreatic-wave";
import { papersWatch202609 } from "./papers-watch-2026-09";
import { papersWatch202611 } from "./papers-watch-2026-11";
import { ivermectinDrugs, ivermectinTrials, ivermectinPapers } from "./ivermectin";
import { papersTrialsWave1 } from "./papers-trials-wave1";
import { trialKeyPapersWave1 } from "./trial-key-papers-wave1";
import { papersCitedWave7 } from "./papers-cited-wave7";
import { citedPaperLinksWave7 } from "./cited-paper-links-wave7";
import { TRIAL_REGISTRY_OUTCOMES } from "./trial-registry-outcomes";
import { TRIAL_REGISTRY_STATUS } from "./trial-registry-status";
import { applyRegistryStatus } from "@/lib/registry-status";
import { papersPeopleWave6 } from "./papers-people-wave6";
import { personPapersWave6 } from "./person-papers-wave6";
import { trialsIdeasWave6 } from "./trials-ideas-wave6";
import { papersIdeasWave6 } from "./papers-ideas-wave6";
import { ideaLinksWave6 } from "./idea-links-wave6";
import { companyDrugsWave6, trialCompaniesWave6 } from "./company-drugs-wave6";
import { companyPipelineGapDrugs, companyPipelineGapTrials, companyPipelineGapCompanyDrugs } from "./company-pipeline-gap";
import { SUPPORTIVE_DRUGS } from "./supportive-drugs";
import { ACCELERATED_APPROVALS, ACCELERATED_READ_ON } from "./accelerated-approvals";
import { CDX_FDA_ROWS } from "./cdx-fda-rows";
import { FDA_OCE_EVENTS } from "./fda-oce-events";
import { mergeAcceleratedEvents } from "@/lib/accelerated";
import { TARGET_FIRST_DESCRIBED } from "./target-first-described";
import { firstDescribedSource } from "@/lib/first-described";
import { TRIAL_START_DATES } from "./trial-start-dates";
import { TRIAL_PARTICIPATION } from "./trial-participation";
import { TRIAL_ALTERNATE_PARTICIPATION } from "./trial-alternate-participation";
import { yearRecords } from "./years";
import { entityTrialLinksWave5, entityTrialsWave5, trialsEntitiesWave5 } from "./trials-entities-wave5";
import { issuesWaveAPapers, issuesWaveATrials } from "./issues-2026-09-wave-a";
import { nutrition } from "./nutrition";
import { adcChemistry } from "./adc-chemistry";
import { journals } from "./journals";
import { termsBasics } from "./terms-basics";
import { termsModalities } from "./terms-modalities";
import { trialDesignTerms } from "./trial-design-wave";
import { lawTerms } from "./law-wave";
import { termsJargon } from "./terms-jargon";
import { biomarkerTerms } from "./terms-biomarkers-wave";
import { institutionsUs } from "./institutions/us";
import { institutionsWorld } from "./institutions/world";
import { institutionsBodies } from "./institutions/bodies";
import { institutionsEurope } from "./institutions/europe";
import { russiaInstitutions, russiaPapers } from "./russia-entities";
import { canadaInstitutions, canadaPapers } from "./canada-entities";
import { koreaInstitutions, koreaPapers } from "./korea-entities";
import { netherlandsInstitutions, netherlandsPapers, netherlandsTrials } from "./netherlands-entities";
import { franceInstitutions, francePapers, franceTrials } from "./france-entities";
import { italyInstitutions, italyPapers, italyPeople } from "./italy-entities";
import { institutionsCentresWave3 } from "./institutions/centres-wave3";
import { institutionsDonorFoundations } from "./institutions/donor-foundations";
import { foundationModels } from "./foundation-models";
import { foundationRoadmaps } from "./foundation-roadmap";
import { ctdnaRoadmaps, ctdnaTrials, ctdnaTerms } from "./ctdna-roadmap";
import { ideaWaves } from "./ideas-waves";
import { mechanicsPathways } from "./mechanics-pathways";
import { complementary } from "./complementary";
import { hairEntities } from "./hair";
import { rejuvenationBody } from "./spikes/rejuvenation-body";
import { rejuvenationFrontier } from "./spikes/rejuvenation-frontier";
import { rejuvenationPaediatric } from "./spikes/rejuvenation-paediatric";
import { rejuvenationSecondCancers } from "./spikes/rejuvenation-second-cancers";
import { rejuvenationMind } from "./spikes/rejuvenation-mind";
import { rejuvenationTransplant } from "./spikes/rejuvenation-transplant";
import { rejuvenationRehab } from "./spikes/rejuvenation-rehab";
import { recoveryEntities } from "./recovery";
import { rejuvenationAgenda } from "./spikes/rejuvenation-agenda";
import { precisionMolecular } from "./spikes/precision-molecular";
import { precisionRadiation } from "./spikes/precision-radiation";
import { precisionSurgery } from "./spikes/precision-surgery";
import { precisionDosing } from "./spikes/precision-dosing";
import { precisionRoadmap } from "./spikes/precision-roadmap";
import { protocolUpgradesRtSurgery } from "./spikes/protocol-upgrades-rt-surgery";
import { protocolUpgradesCare } from "./spikes/protocol-upgrades-care";
import { protocolUpgradesAdministration } from "./spikes/protocol-upgrades-administration";
import { protocolUpgradesPharmacyAccess } from "./spikes/protocol-upgrades-pharmacy-access";
import { protocolUpgradesFillGi } from "./spikes/protocol-upgrades-fill-gi";
import { protocolUpgradesFillSkin } from "./spikes/protocol-upgrades-fill-skin";
import { protocolUpgradesFillBody } from "./spikes/protocol-upgrades-fill-body";
import { rejuvenationMeasurement } from "./spikes/rejuvenation-measurement";
import { tests } from "./tests";
import { testsCdxDevices } from "./tests-cdx-devices";
import { mcedPapers } from "./mced-census";
import { mcedTests, mcedCompanies } from "./mced-census-tests";
import { preventionScreeningGaps2026_11 } from "./prevention-screening-gaps-2026-11";
import { mcedTrials } from "./mced-census-trials";
import { nciCoverage } from "./nci-coverage";
import { institutionsIndia } from "./institutions/india";
import { institutionsUsCancerCharities } from "./institutions/us-cancer-charities";
import { institutionsNonprofitsFromCompanies } from "./institutions/nonprofits-from-companies";
import { institutionsPatientCoalitions, collectionsPatientCoalitions } from "./institutions/patient-coalitions-2026-11";
import { institutionsRareCancerFoundations, collectionsRareCancerFoundations } from "./institutions/rare-cancer-foundations-2026-11";
import { patientEducationLinks } from "./patient-education-links-2026-11";
import { institutionsUsCentresAaci } from "./institutions/us-cancer-centres-aaci";
import { companiesUkCancerCharities, institutionsUkCancerCharities } from "./institutions/uk-cancer-charities";
import { institutionsCogPaediatric } from "./institutions/cog-paediatric";
import { institutionsIndiaNcg } from "./institutions/india-ncg";
import { institutionsJapanMhlw } from "./institutions/japan-mhlw";
import { institutionsUiccSocieties } from "./institutions/uicc-societies";
import { institutionsGermany } from "./institutions/germany";
import { institutionsIsrael } from "./institutions/israel";
import { institutionsWaveInvestigators } from "./institutions-wave-investigators";
import { india } from "./india";
import { israel } from "./israel";
import { recordsAU } from "./country-records-au";
import { recordsES } from "./country-records-es";
import { recordsBR } from "./country-records-br";
import { recordsSE } from "./country-records-se";
import { recordsCH } from "./country-records-ch";
import { recordsID } from "./country-records-id";
import { recordsPK } from "./country-records-pk";
import { recordsTR } from "./country-records-tr";
import { recordsBD } from "./country-records-bd";
import { recordsIR } from "./country-records-ir";
import { recordsMX } from "./country-records-mx";
import { recordsEG } from "./country-records-eg";
import { recordsPL } from "./country-records-pl";
import { recordsNG } from "./country-records-ng";
import { recordsTH } from "./country-records-th";
import { recordsVN } from "./country-records-vn";
import { recordsPH } from "./country-records-ph";
import { recordsET } from "./country-records-et";
import { recordsZA } from "./country-records-za";
import { recordsCO } from "./country-records-co";
import { recordsAR } from "./country-records-ar";
import { recordsUA } from "./country-records-ua";
import { recordsRO } from "./country-records-ro";
import { recordsMY } from "./country-records-my";
import { recordsDZ } from "./country-records-dz";
import { recordsTW } from "./country-records-tw";
import { china } from "./china";
import { approvedWave1 } from "./drugs-approved-wave1";
import { targetsWave1 } from "./targets-wave1";
import { targetsBiomarkerWave } from "./targets-biomarker-wave";
import { biomarkerReadouts } from "./biomarker-readouts";
import { biomarkerReadouts2 } from "./biomarker-readouts-2";
import { biomarkerReadouts3 } from "./biomarker-readouts-3";
import { biomarkerReadouts4 } from "./biomarker-readouts-4";
import { companiesWave1 } from "./companies-wave1";
import { companiesYc } from "./companies-yc";
import { companiesStartups } from "./companies-startups";
import { companiesDealParties } from "./companies-deal-parties";
import { investors } from "./investors";
import { roadmapsWave2 } from "./roadmaps-wave2";
import { pathwaysKegg } from "./pathways-kegg";
import { journalsWave2 } from "./journals-wave2";
import { companiesSponsors } from "./companies-sponsors";
import { companiesSponsorsWave3 } from "./companies-sponsors-wave3";
import { companiesMakersWave4 } from "./companies-makers-wave4";
import { targetsWaveSoc } from "./targets-wave-soc";
import { targetsPipelineGap } from "./targets-pipeline-gap";
import { targetsGenesWave } from "./targets-genes-wave";
import { targetsImmuneMarkers } from "./targets-immune-markers";
import { targetSpecificity } from "./target-specificity";
import { targetsReaderEdits } from "./targets-reader-edits";
import { drugsEmaWave } from "./drugs-ema-wave";
import { drugsUniverseGaps } from "./drugs-universe-gaps";
import { companiesSponsorsWave } from "./companies-sponsors-wave";
import { companiesCooperativeGroups, cooperativeGroupTrialCompanies } from "./companies-cooperative-groups";
import { companiesCooperativeGroupsMigrated } from "./companies-cooperative-groups-migrated";
import { companiesNew2026Antibodies } from "./companies-new-2026-antibodies";
import { companiesNew2026Radiopharma } from "./companies-new-2026-radiopharma";
import { companiesNew2026CellGene } from "./companies-new-2026-cell-gene";
import { companiesNew2026SmallMolecule } from "./companies-new-2026-small-molecule";
import { companiesPortfolioMonitors } from "./companies-portfolio-monitors";
import { companiesInvictus, drugsInvictus } from "./companies-invictus";
import { portfolioMonitorDrugs, portfolioMonitorTrials } from "./products-portfolio-monitors";
import { companiesNew2026DxAi } from "./companies-new-2026-dx-ai";
import { companiesNew2026Sponsors } from "./companies-new-2026-sponsors";
import { monitorsEdgarA } from "./companies-monitors-2026-11-edgar-a";
import { monitorsEdgarB } from "./companies-monitors-2026-11-edgar-b";
import { monitorsOrphans } from "./companies-monitors-2026-11-orphans";
import { hereditarySyndromesGaps2026, hereditaryTestCompaniesGaps2026, hereditaryTestsGaps2026 } from "./hereditary-gaps-2026-11";
import { monitorsSbirA } from "./companies-monitors-2026-11-sbir-a";
import { monitorsSbirB } from "./companies-monitors-2026-11-sbir-b";
import { monitorsSbirC } from "./companies-monitors-2026-11-sbir-c";
import { monitorsSbirD } from "./companies-monitors-2026-11-sbir-d";
import { prometheusGapTechnologies, prometheusGapDrugs } from "./prometheus-gaps-2026-11";
import { veterinaryGapDrugs, veterinaryGapInstitutions } from "./veterinary-gaps-2026-11";
import { institutionsPrizes202611 } from "./prizes-gaps-2026-11";
import { companiesPrometheusGapsA } from "./companies-prometheus-gaps-a";
import { companiesPrometheusGapsB } from "./companies-prometheus-gaps-b";
import { institutionsPrometheusGaps, collectionsPrometheusGaps, termsPrometheusGaps } from "./prometheus-gaps-institutions";
import { institutionsParticleTherapyGaps2026, particleTherapyHostBacklinks } from "./particle-therapy-gaps-2026-11";
import { institutionsDonorRegistryGaps2026, donorRegistryBacklinks } from "./donor-registries-gaps-2026-11";
import { institutionsBiobankGaps2026, collectionsBiobankGaps2026, biobankBacklinks } from "./biobanks-gaps-2026-11";
import { institutionsGrantGaps2026, collectionsGrantGaps2026, trialsGrantGaps2026, grantBacklinks } from "./funding-programmes-gaps-2026-11";
import { termsLawGaps2026, lawBacklinks } from "./laws-gaps-2026-11";
import { termsPayerGaps2026, institutionsPayerGaps2026, payerBacklinks } from "./payers-gaps-2026-11";
import { supportiveCareGapDrugs, supportiveCareGapDrugBacklinks } from "./supportive-care-gaps-2026-11";
import { supportiveCareGapTechnologies, supportiveCareGapTerms, supportiveCareGapTermBacklinks } from "./supportive-care-gaps-2026-11-terms";
// Institutions for the countries that held fewer than three (census of 11 November 2026, by region).
import { institutionsCountriesMena, countriesMenaBacklinks } from "./institutions/countries-2026-11-mena";
import { institutionsCountriesAsiaPacific, countriesAsiaPacificBacklinks } from "./institutions/countries-2026-11-asia-pacific";
import { institutionsCountriesAmericas, countriesAmericasBacklinks } from "./institutions/countries-2026-11-americas";
import { institutionsCountriesWestCentralAfrica, countriesWestCentralAfricaBacklinks } from "./institutions/countries-2026-11-west-central-africa";
import { institutionsCountriesEastSouthernAfrica, countriesEastSouthernAfricaBacklinks } from "./institutions/countries-2026-11-east-southern-africa";
import { institutionsCountriesEuropeOverseas, countriesEuropeOverseasBacklinks } from "./institutions/countries-2026-11-europe-overseas";
import { drugsPipelineWave1 } from "./drugs-pipeline-wave1";
import { trop2DualPayload } from "./trop2-dual-payload";
import { pipelineTrialsWave2 } from "./pipeline-trials-wave2";
import { drugsPipelineWave2 } from "./drugs-pipeline-wave2";
import { drugsPipelineWave6 } from "./drugs-pipeline-wave6";
import { drugsDealAssets } from "./drugs-deal-assets";
import { drugsPipelineWave7 } from "./drugs-pipeline-wave7";
import { drugsChinaWave1 } from "./drugs-china-wave1";
import { pvCancer, pvTrials, pvTerms, pvIdeas } from "./polycythaemia-vera";
import { etCancer, etTrials, aspirinDrug } from "./essential-thrombocythaemia";
import { radiationTechnologies, radiationTerms } from "./radiation-wave1";
import { radiationTrials } from "./radiation-wave2";
import { cancerSubtypes, cancerParents } from "./cancer-subtypes";
import { radiationDrugs, radiationCompanies } from "./radiation-wave3";
import { manufacturingTechnologies, manufacturingCompanies } from "./manufacturing-wave";
import { cancerParentsWave2, cancerParentsWave2Map } from "./cancer-parents-wave2";
import { radiationTrials4 } from "./radiation-wave4";
import { radiationPapersWave5, radiationTermsWave5, radiationTrialsWave5 } from "./radiation-wave5";
import { pdacDrugs, pdacTrials, pdacCompanies } from "./pdac-wave";
import { drugsSubtypesWave } from "./drugs-subtypes-wave";
import { diagnosticsTechnologies1, diagnosticsCompanies1 } from "./diagnostics-wave1";
import { diagnosticsTechnologies2, diagnosticsCompanies2 } from "./diagnostics-wave2";
import { freeCollections } from "./free-wave";
import { tumourTestCompanies } from "./tumour-tests";
import { ispyTrials, ispyCompanies } from "./ispy-wave";
import { platformTerms, platformTrials } from "./platform-trials-wave";
import { thyroidSubtypes } from "./thyroid-subtypes";
import { headNeckSubtypes } from "./head-neck-subtypes";
import { ovarianSubtypes } from "./ovarian-subtypes";
import { kidneySubtypes } from "./kidney-subtypes";
import { testisOesophagusSubtypes } from "./testis-oesophagus-subtypes";
import { bladderSubtypes } from "./bladder-subtypes";
import { prostateSubtypes } from "./prostate-subtypes";
import { cnsSubtypes } from "./cns-subtypes";
import { upperGiLiverSubtypes } from "./upper-gi-liver-subtypes";
import { bloodSubtypes } from "./blood-subtypes";
import { neuroendocrineSubtypes } from "./neuroendocrine-subtypes";
import { rareSubtypes } from "./rare-subtypes";
import { pancreaticSubtypes } from "./pancreatic-subtypes";
import { gynaecologicalSubtypes } from "./gynaecological-subtypes";
import { skinSubtypes, skinTrials } from "./skin-subtypes";
import { breastSubtypes, breastSubtypeTrials } from "./breast-subtypes";
import { paediatricSubtypes } from "./paediatric-subtypes";
import { sarcomaLymphomaSubtypes } from "./sarcoma-lymphoma-subtypes";
import { sarcomaBoneSubtypes, sarcomaBoneTrials } from "./sarcoma-bone-subtypes";
import { headNeckHpvSubtypes, headNeckHpvTrials } from "./head-neck-hpv-subtypes";
import { colorectalLymphomaSubtypes, colorectalLymphomaTrials } from "./colorectal-lymphoma-subtypes";
import { lungSubtypes, lungSubtypeTrials } from "./lung-subtypes";
import { trialsSubtypesWave } from "./trials-subtypes-wave";
import { cancersWave4Parents } from "./cancers-wave4-parents";
import { cancersWave4Lung } from "./cancers-wave4-lung";
import { cancersWave4Breast } from "./cancers-wave4-breast";
import { cancersWave4ColonKidneyTestis } from "./cancers-wave4-colon-kidney-testis";
import { cancersWave4Haematology } from "./cancers-wave4-haematology";
import { cancersWave4Rare } from "./cancers-wave4-rare";
import { cancersWave4EndocrineThoracicGynae } from "./cancers-wave4-endocrine-thoracic-gynae";
import { trialsSocWave } from "./trials-soc-wave";
import { papersSocWave } from "./papers-soc-wave";
import { modelTechnologies } from "./models-wave";
import { machineTechnologies, machineCompanies } from "./machines-wave";
import { machineTechnologies2, machineCompanies2 } from "./machines-wave2";
import { machineTechnologies3, machineCompanies3, machineTrials3, machineRoadmaps3, machineIdeas3 } from "./machines-wave3";
import { devicesGapsTechnologies, devicesGapsCompanies, devicesGapsTerms } from "./devices-gaps-2026-11";
import { devicesGapsDiagnosticTechnologies, devicesGapsDiagnosticCompanies } from "./devices-gaps-2026-11-diagnostic";
import { contrastAgentDrugs, contrastAgentTechnologies, contrastAgentCompanies } from "./contrast-agents-gaps-2026-11";
import { theoryHub, theoryTerms } from "./theories-wave";
import { networkInstitutions, networkPeople } from "./institution-networks-wave";
import { pipelineTrialsWave3 } from "./pipeline-trials-wave3";
import { pipelineTrialsWave4 } from "./pipeline-trials-wave4";
import { pipelineTrialsWave5 } from "./pipeline-trials-wave5";
import { pipelineTrialsWave6 } from "./pipeline-trials-wave6";
import { checkpointTargets, checkpointTerms, IMMUNE_CHECKPOINT_TARGET_IDS } from "./checkpoint-map";
import { cansimOncologyTerms } from "./terms-cansim-oncology";
import { cansimMethodsTerms } from "./terms-cansim-methods";
import { scoringSystemsGapTerms } from "./scoring-systems-gaps-2026-11";
import { cansimTargets } from "./targets-cansim";
import { issuesWaveB } from "./issues-2026-09-wave-b";
import { READOUT_TEST_RECORDS } from "./readout-test-records";
import { hospicesSupportGaps } from "./hospices-support-gaps-2026-11";
import { palliativeNavigationFertilityGaps } from "./palliative-navigation-fertility-gaps-2026-11";
import { psychosocialGeneticsGaps } from "./psychosocial-genetics-gaps-2026-11";
import { helplinesGaps } from "./helplines-gaps-2026-11";
import { protocols } from "./protocols";

const RAW_INPUTS: EntityInput[] = [
  ...ucsfBreastTrials,
  ...trop2PreclinicalWatch,
  ...trop2EmergingModalities,
  ...trop2TrialLandscape,
  ...trop2DeeperRegistry,
  ...parpSelectiveReview,
  ...cancers,
  ...spikeEntities,
  ...sections,
  ...technologies,
  ...targets,
  ...drugs,
  ...companies,
  ...institutions,
  ...pathways,
  ...terms,
  ...trials,
  ...pairings,
  ...roadmaps,
  ...ideas,
  ...collections,
  ...failures,
  ...pipelineTrials,
  ...groups,
  ...frontier,
  ...people, ...peopleInvestigatorsWave,
  ...cassianYeePeople, ...cassianYeeCompanies, ...cassianYeeInstitutions, ...cassianYeeTerms, ...cassianYeePapers, ...cassianYeeTrials,
  ...bottlenecks,
  ...ideaWaves,
  ...sources,
  ...mechanisms,
  ...frontierRoadmaps,
  ...supporting,
  ...gapFill,
  ...keyPapers,
  ...papersSubtypesWave,
  ...radiationPapersWave5,
  ...papersRareWave,
  ...papersPancreaticWave,
  ...papersWatch202609, ...papersWatch202611, ...ivermectinDrugs, ...ivermectinTrials, ...ivermectinPapers,
  ...papersTrialsWave1,
  ...papersCitedWave7,
  ...papersPeopleWave6,
  ...papersIdeasWave6,
  ...trialsIdeasWave6,
  ...trialsEntitiesWave5,
  ...issuesWaveATrials, ...issuesWaveAPapers,
  ...nutrition,
  ...adcChemistry,
  ...journals,
  ...termsBasics,
  ...termsModalities,
  ...trialDesignTerms,
  ...lawTerms,
  ...termsJargon,
  ...biomarkerTerms,
  ...institutionsUs,
  ...institutionsWorld,
  ...institutionsBodies,
  ...institutionsEurope,
  ...russiaInstitutions,
  ...russiaPapers,
  ...canadaInstitutions, ...canadaPapers,
  ...koreaInstitutions, ...koreaPapers,
  ...netherlandsInstitutions, ...netherlandsPapers, ...netherlandsTrials,
  ...franceInstitutions, ...francePapers, ...franceTrials,
  ...italyInstitutions, ...italyPeople, ...italyPapers,
  ...institutionsCentresWave3,
  ...institutionsDonorFoundations,
  ...foundationModels,
  ...foundationRoadmaps,
  ...ctdnaRoadmaps, ...ctdnaTrials, ...ctdnaTerms,
  ...mechanicsPathways,
  ...complementary,
  ...hairEntities,
  ...rejuvenationBody,
  ...rejuvenationFrontier,
  ...rejuvenationPaediatric,
  ...rejuvenationSecondCancers,
  ...rejuvenationMind,
  ...rejuvenationTransplant,
  ...rejuvenationRehab,
  ...recoveryEntities,
  ...rejuvenationAgenda,
  ...precisionMolecular,
  ...precisionRadiation,
  ...precisionSurgery,
  ...precisionDosing,
  ...precisionRoadmap,
  ...protocolUpgradesRtSurgery,
  ...protocolUpgradesCare,
  ...protocolUpgradesAdministration,
  ...protocolUpgradesPharmacyAccess,
  ...protocolUpgradesFillGi,
  ...protocolUpgradesFillSkin,
  ...protocolUpgradesFillBody,
  ...rejuvenationMeasurement,
  ...tests,
  ...testsCdxDevices,
  ...mcedPapers, ...mcedTests, ...mcedCompanies, ...mcedTrials,
  ...preventionScreeningGaps2026_11,
  ...nciCoverage,
  ...networkInstitutions, ...networkPeople,
  ...institutionsIndia,
  ...institutionsUsCancerCharities,
  ...institutionsNonprofitsFromCompanies,
  ...institutionsPatientCoalitions, ...collectionsPatientCoalitions,
  ...institutionsRareCancerFoundations, ...collectionsRareCancerFoundations,
  ...institutionsUsCentresAaci,
  ...institutionsUkCancerCharities,
  ...institutionsCogPaediatric,
  ...institutionsIndiaNcg,
  ...institutionsJapanMhlw,
  ...institutionsUiccSocieties,
  ...institutionsGermany,
  ...institutionsIsrael,
  ...institutionsWaveInvestigators,
  ...india,
  ...israel,
  ...recordsAU, ...recordsES, ...recordsBR, ...recordsSE, ...recordsCH,
  ...recordsID, ...recordsPK, ...recordsTR, ...recordsBD, ...recordsIR, ...recordsMX, ...recordsEG, ...recordsPL, ...recordsNG, ...recordsTH,
  ...recordsVN, ...recordsPH, ...recordsET, ...recordsZA, ...recordsCO, ...recordsAR, ...recordsUA, ...recordsRO, ...recordsMY, ...recordsDZ, ...recordsTW,
  ...china,
  ...approvedWave1,
  ...targetsWave1,
  ...targetsBiomarkerWave, ...biomarkerReadouts, ...biomarkerReadouts2, ...biomarkerReadouts3, ...biomarkerReadouts4,
  ...companiesWave1,
  ...companiesYc,
  ...companiesStartups,
  ...companiesDealParties,
  ...investors,
  ...roadmapsWave2,
  ...pathwaysKegg,
  ...journalsWave2,
  ...companiesSponsors,
  ...companiesUkCancerCharities,
  ...companiesSponsorsWave3, ...companiesCooperativeGroups, ...companiesCooperativeGroupsMigrated,
  ...companiesMakersWave4,
  ...companiesNew2026Antibodies, ...companiesNew2026Radiopharma, ...companiesNew2026CellGene, ...companiesNew2026SmallMolecule, ...companiesNew2026DxAi, ...companiesNew2026Sponsors, ...companiesPortfolioMonitors, ...companiesInvictus,
  ...hereditarySyndromesGaps2026, ...hereditaryTestCompaniesGaps2026, ...hereditaryTestsGaps2026,
  ...monitorsEdgarA, ...monitorsEdgarB, ...monitorsOrphans, ...monitorsSbirA, ...monitorsSbirB, ...monitorsSbirC, ...monitorsSbirD,
  ...prometheusGapTechnologies, ...prometheusGapDrugs, ...institutionsPrometheusGaps, ...collectionsPrometheusGaps, ...termsPrometheusGaps, ...companiesPrometheusGapsA, ...companiesPrometheusGapsB,
  ...veterinaryGapDrugs, ...veterinaryGapInstitutions,
  ...institutionsPrizes202611,
  ...institutionsParticleTherapyGaps2026, ...institutionsDonorRegistryGaps2026, ...institutionsBiobankGaps2026, ...collectionsBiobankGaps2026, ...institutionsGrantGaps2026, ...collectionsGrantGaps2026, ...trialsGrantGaps2026, ...termsLawGaps2026, ...termsPayerGaps2026, ...institutionsPayerGaps2026,
  ...supportiveCareGapDrugs, ...supportiveCareGapTechnologies, ...supportiveCareGapTerms,
  ...institutionsCountriesMena, ...institutionsCountriesAsiaPacific, ...institutionsCountriesAmericas, ...institutionsCountriesWestCentralAfrica, ...institutionsCountriesEastSouthernAfrica, ...institutionsCountriesEuropeOverseas,
  ...targetsWaveSoc, ...targetsPipelineGap, ...targetsReaderEdits, ...targetsGenesWave, ...targetsImmuneMarkers, ...drugsEmaWave, ...drugsUniverseGaps, ...companiesSponsorsWave,
  ...drugsPipelineWave1,
  ...trop2DualPayload,
  ...pipelineTrialsWave2,
  ...drugsPipelineWave2, ...drugsPipelineWave6, ...drugsDealAssets, ...drugsPipelineWave7, ...drugsChinaWave1, pvCancer, ...pvTrials, ...pvTerms, ...pvIdeas, ...pdacDrugs, ...pdacTrials, ...pdacCompanies, ...drugsSubtypesWave, ...diagnosticsTechnologies1, ...diagnosticsCompanies1, ...diagnosticsTechnologies2, ...diagnosticsCompanies2, ...ispyTrials, ...ispyCompanies, etCancer, ...etTrials, aspirinDrug, ...radiationTechnologies, ...radiationTerms, ...radiationTrials, ...cancerSubtypes, ...radiationDrugs, ...radiationCompanies, ...cancerParentsWave2, ...radiationTrials4, ...radiationTermsWave5, ...radiationTrialsWave5, ...thyroidSubtypes, ...headNeckSubtypes, ...ovarianSubtypes, ...kidneySubtypes, ...testisOesophagusSubtypes, ...bladderSubtypes, ...sarcomaLymphomaSubtypes, ...modelTechnologies, ...machineTechnologies, ...machineCompanies, ...manufacturingTechnologies, ...manufacturingCompanies, theoryHub, ...theoryTerms, ...platformTerms, ...platformTrials, ...prostateSubtypes, ...cnsSubtypes, ...machineTechnologies2, ...machineCompanies2, ...machineTechnologies3, ...machineCompanies3, ...machineTrials3, ...machineRoadmaps3, ...machineIdeas3, ...devicesGapsTechnologies, ...devicesGapsCompanies, ...devicesGapsTerms, ...devicesGapsDiagnosticTechnologies, ...devicesGapsDiagnosticCompanies, ...contrastAgentDrugs, ...contrastAgentTechnologies, ...contrastAgentCompanies, ...colorectalLymphomaSubtypes, ...colorectalLymphomaTrials, ...upperGiLiverSubtypes, ...bloodSubtypes, ...gynaecologicalSubtypes, ...skinSubtypes, ...skinTrials, ...lungSubtypes, ...lungSubtypeTrials, ...breastSubtypes, ...breastSubtypeTrials, ...sarcomaBoneSubtypes, ...sarcomaBoneTrials, ...paediatricSubtypes, ...neuroendocrineSubtypes, ...rareSubtypes, ...pancreaticSubtypes, ...headNeckHpvSubtypes, ...headNeckHpvTrials, ...trialsSubtypesWave, ...cancersWave4Parents, ...cancersWave4Lung, ...cancersWave4Breast, ...cancersWave4ColonKidneyTestis, ...cancersWave4Haematology, ...cancersWave4Rare, ...cancersWave4EndocrineThoracicGynae, ...trialsSocWave, ...papersSocWave,
  ...pipelineTrialsWave3,
  ...pipelineTrialsWave4,
  ...pipelineTrialsWave5, ...pipelineTrialsWave6, ...companyPipelineGapDrugs, ...companyPipelineGapTrials, ...portfolioMonitorDrugs, ...portfolioMonitorTrials, ...drugsInvictus,
  ...issuesWaveB,
  ...freeCollections, ...tumourTestCompanies,
  ...checkpointTargets, ...checkpointTerms,
  ...cansimOncologyTerms, ...cansimMethodsTerms, ...cansimTargets,
  ...scoringSystemsGapTerms,
  ...hospicesSupportGaps, ...palliativeNavigationFertilityGaps, ...psychosocialGeneticsGaps, ...helplinesGaps,
  ...protocols,
];

/** Readout ids by parent target id and by the drugs their current thresholds name (see the biomarker branch in ALL_INPUTS). */
const ALL_READOUTS = [...biomarkerReadouts, ...biomarkerReadouts2, ...biomarkerReadouts3, ...biomarkerReadouts4];
const READOUTS_BY_TARGET: Record<string, string[]> = {};
const READOUTS_BY_DRUG: Record<string, string[]> = {};
for (const bm of ALL_READOUTS) {
  if (bm.target) (READOUTS_BY_TARGET[bm.target] ??= []).push(bm.id);
  for (const t of bm.thresholds ?? []) if ((t.status ?? "current") === "current") { const list = (READOUTS_BY_DRUG[t.drugId] ??= []); if (!list.includes(bm.id)) list.push(bm.id); }
}
// A test or device names the readouts it measures in its own `related` (src/data/readout-test-records.ts), never the
// readout's `drugs`, which holds what a result selects.
for (const [bmId, ids] of Object.entries(READOUT_TEST_RECORDS)) for (const id of ids) { const list = (READOUTS_BY_DRUG[id] ??= []); if (!list.includes(bmId)) list.push(bmId); }

/**
 * Care protocols (./protocols/) by each device, medicine and glossary term they name. The reverse link is written
 * here, as for readouts, so a protocol is reached from the pages it concerns and is not an orphan; those pages list
 * their protocols in their own section (src/lib/members.ts `protocolsFor`) and leave them out of Connected.
 */
const PROTOCOLS_BY_RECORD: Record<string, string[]> = {};
for (const pr of protocols) for (const id of new Set([...(pr.technologies ?? []), ...(pr.drugs ?? []), ...(pr.terms ?? [])])) (PROTOCOLS_BY_RECORD[id] ??= []).push(pr.id);

/** Every input, with glossary terms mapped to their canonical category (see ./term-categories.ts). */
/**
 * Generated gene records (scripts/fetch-cancer-genes.ts) yield to a hand-written target with the same id: the hand-written
 * record stays, and the generated role, evidence tier and sources are folded onto it where it has none. Any other duplicate
 * id is left in place for validate to report.
 */
const GENERATED_GENE_IDS = new Set(targetsGenesWave.map((t) => t.id));
const RAW_INPUTS_DEDUPED: EntityInput[] = (() => {
  const firstTarget = new Map<string, number>();
  const out: EntityInput[] = [];
  for (const e of RAW_INPUTS) {
    if (e.kind === "target") {
      const at = firstTarget.get(e.id);
      if (at !== undefined && GENERATED_GENE_IDS.has(e.id)) {
        const hand = out[at] as TargetInput;
        const gen = e as TargetInput;
        out[at] = { ...hand, role: hand.role?.length ? hand.role : gen.role, evidenceTier: hand.evidenceTier ?? gen.evidenceTier, sources: hand.sources?.length ? hand.sources : gen.sources } as EntityInput;
        continue;
      }
      if (at === undefined) firstTarget.set(e.id, out.length);
    }
    out.push(e);
  }
  return out;
})();

/**
 * The company each test in src/data/readout-test-records.ts credits lists that test among its products,
 * so a test taken out of a readout's `drugs` keeps an inbound link from the company its own record names.
 */
const READOUT_TESTS_BY_COMPANY: Record<string, string[]> = (() => {
  const ids = new Set(Object.values(READOUT_TEST_RECORDS).flat());
  const out: Record<string, string[]> = {};
  for (const e of RAW_INPUTS_DEDUPED) if (e.kind === "drug" && ids.has(e.id)) for (const co of e.companies ?? []) { const list = (out[co] ??= []); if (!list.includes(e.id)) list.push(e.id); }
  return out;
})();

/**
 * Inbound links for the November 2026 census fill (particle therapy centres, donor registries, biobanks, funding
 * programmes, laws, payers, and the supportive care medicines, devices and terms the care protocols named): each fill file exports a map from an existing record to the new records it should list,
 * so the host hospital, funder, drug or technology page shows them without editing the file that owns it. The field is
 * chosen by the new record's kind, so a typed array only ever holds its own kind; collections go to `related`.
 */
const CENSUS_FILL_BACKLINKS: Map<string, Map<string, string[]>> = (() => {
  const kindOf = new Map<string, string>([
    ...institutionsParticleTherapyGaps2026, ...institutionsDonorRegistryGaps2026, ...institutionsBiobankGaps2026, ...collectionsBiobankGaps2026,
    ...institutionsGrantGaps2026, ...collectionsGrantGaps2026, ...trialsGrantGaps2026, ...termsLawGaps2026, ...termsPayerGaps2026, ...institutionsPayerGaps2026,
    ...supportiveCareGapDrugs, ...supportiveCareGapTechnologies, ...supportiveCareGapTerms,
    ...institutionsCountriesMena, ...institutionsCountriesAsiaPacific, ...institutionsCountriesAmericas, ...institutionsCountriesWestCentralAfrica, ...institutionsCountriesEastSouthernAfrica, ...institutionsCountriesEuropeOverseas,
  ].map((e) => [e.id, e.kind] as [string, string]));
  const fieldFor: Record<string, string> = { institution: "institutions", term: "terms", trial: "trials", collection: "related", drug: "drugs", technology: "technologies" };
  const out = new Map<string, Map<string, string[]>>();
  for (const map of [particleTherapyHostBacklinks, donorRegistryBacklinks, biobankBacklinks, grantBacklinks, lawBacklinks, payerBacklinks, supportiveCareGapDrugBacklinks, supportiveCareGapTermBacklinks, countriesMenaBacklinks, countriesAsiaPacificBacklinks, countriesAmericasBacklinks, countriesWestCentralAfricaBacklinks, countriesEastSouthernAfricaBacklinks, countriesEuropeOverseasBacklinks])
    for (const [from, ids] of Object.entries(map)) for (const id of ids) {
      const kind = kindOf.get(id);
      if (!kind) throw new Error(`Census fill backlink names a record not in the fill files: ${id}`);
      const byField = out.get(from) ?? new Map<string, string[]>(); out.set(from, byField);
      const list = byField.get(fieldFor[kind]) ?? []; byField.set(fieldFor[kind], list);
      if (!list.includes(id)) list.push(id);
    }
  return out;
})();
function withCensusFillBacklinks<T extends EntityInput>(e: T): T {
  const add = CENSUS_FILL_BACKLINKS.get(e.id);
  if (!add) return e;
  const out: Record<string, unknown> = { ...e };
  for (const [field, ids] of add) { const own = ((e as Record<string, unknown>)[field] as string[] | undefined) ?? []; out[field] = [...own, ...ids.filter((id) => id !== e.id && !own.includes(id))]; }
  return out as T;
}
{
  const ids = new Set(RAW_INPUTS_DEDUPED.map((e) => e.id));
  const missing = [...CENSUS_FILL_BACKLINKS.keys()].filter((id) => !ids.has(id));
  if (missing.length) throw new Error(`Census fill backlinks name records that do not exist: ${missing.join(", ")}`);
}

const RECORDS: EntityInput[] = RAW_INPUTS_DEDUPED.map((base) => {
  // Spike supplements (src/data/spikes/index.ts): partial records a cancer deep dive attaches to targets, readouts,
  // drugs and papers other files own; arrays append, scalars fill gaps. Applied before everything else.
  // Cancer deep-dive patches (mergeSpikeInto) reach every cancer record, whichever file holds it: cancers.ts, the NCI rare
  // and paediatric lists in src/data/spikes/, the subtype waves. Supplements (partial records onto targets, readouts,
  // drugs and papers other files own) come next; arrays append, scalars fill gaps.
  // Merge supplements (src/data/merged-records.ts): what a record retired as a duplicate carried and its survivor did
  // not. Applied on the same terms as a spike supplement, so retiring an id loses no relation.
  const raw = withCensusFillBacklinks(applyMergeSupplements(applySpikeSupplements(base.kind === "cancer" ? mergeSpikeInto(base) : base)));
  // Paper pages written for DOIs a record cites in its external links by scripts/fetch-cited-papers.ts (wave 7): the
  // citing record, whatever its kind, gains the paper in `keyPapers`. Applied first so the kind-specific steps below see it.
  const cited = citedPaperLinksWave7[raw.id];
  let e: EntityInput = cited ? { ...raw, keyPapers: [...(raw.keyPapers ?? []), ...cited.filter((id) => !(raw.keyPapers ?? []).includes(id))] } : raw;
  const prs = PROTOCOLS_BY_RECORD[e.id];
  if (prs) e = { ...e, related: [...(e.related ?? []), ...prs.filter((id) => !(e.related ?? []).includes(id))] };
  // Patient education links (src/data/patient-education-links-2026-11.ts): NCCN Guidelines for Patients, NCI PDQ patient
  // summaries and ONS/NCODA patient education sheets, appended to the record's own links; an address it holds is not repeated.
  const edu = patientEducationLinks[e.id];
  if (edu) { const have = new Set((e.links ?? []).map((l) => l.url)); e = { ...e, links: [...(e.links ?? []), ...edu.filter((l) => !have.has(l.url))] }; }
  // Supportive care medicines (src/data/supportive-drugs.ts): the flag that keeps antiemetics, growth factors, bone agents,
  // antidotes and opioids out of treatment counts and rankings, and renders the "Supportive care" pill.
  if (e.kind === "drug" && SUPPORTIVE_DRUGS[e.id]) e = { ...e, supportive: true };
  // Accelerated approvals (scripts/fetch-accelerated.ts, src/data/accelerated-approvals.ts): every indication the FDA's
  // four tables give the product becomes typed regulatoryEvents, the grant and the conversion or withdrawal that closed
  // it, keyed to each other by the agency's indication text. A hand-written event on the same date and type wins.
  if (e.kind === "drug" && ACCELERATED_APPROVALS[e.id]) {
    e = { ...e, regulatoryEvents: mergeAcceleratedEvents(e.regulatoryEvents ?? [], ACCELERATED_APPROVALS[e.id], ACCELERATED_READ_ON) as DrugInput["regulatoryEvents"] };
  }
  // FDA oncology approval notifications since 2020 (scripts/build-fda-oce-events.ts, src/data/fda-oce-events.ts): each
  // becomes a dated United States event on the product it names, unless the record already dates that approval itself
  // (a United States approval, accelerated approval, conversion or label change within seven days; sixteen when the
  // record gives only a month). Hand-written and accelerated-table events win.
  if (e.kind === "drug" && FDA_OCE_EVENTS[e.id]) {
    const own = e.regulatoryEvents ?? [];
    const dated = (d: string) => Date.parse(/^\d{4}-\d{2}$/.test(d) ? `${d}-15` : d.slice(0, 10));
    const covered = (date: string) => own.some((ev) => /^(US|USA|United States|FDA)$/i.test(ev.region) && ["approval", "accelerated-approval", "conversion", "label-change"].includes(ev.type) && Math.abs(dated(ev.date) - dated(date)) <= (/^\d{4}-\d{2}$/.test(ev.date) ? 16 : 7) * 86_400_000);
    const add = FDA_OCE_EVENTS[e.id].filter((ev) => !covered(ev.date));
    if (add.length) e = { ...e, regulatoryEvents: [...own, ...add].sort((a, b) => a.date.localeCompare(b.date)) as DrugInput["regulatoryEvents"] };
  }
  // FDA companion diagnostic rows a readout did not carry (src/data/cdx-fda-rows.ts), appended after its own; a row it
  // already holds for the same device, PMA number and drugs is not repeated.
  if (e.kind === "biomarker" && CDX_FDA_ROWS[e.id]) {
    const own = e.companionDiagnostics ?? [];
    const key = (c: { device: string; pma?: string; drugs?: string[] }) => `${c.device.toLowerCase()}|${c.pma ?? ""}|${[...(c.drugs ?? [])].sort().join(",")}`;
    const have = new Set(own.map(key));
    e = { ...e, companionDiagnostics: [...own, ...CDX_FDA_ROWS[e.id].filter((c) => !have.has(key(c)))] };
  }
  // Immune members of the checkpoint map (src/data/checkpoint-map.ts) carry the immune-checkpoint role, whichever file owns the record.
  if (e.kind === "target" && IMMUNE_CHECKPOINT_TARGET_IDS.has(e.id) && !(e.role ?? []).includes("immune-checkpoint")) e = { ...e, role: [...(e.role ?? []), "immune-checkpoint"] };
  if (e.kind === "term") return { ...e, category: canonicalTermCategory(e.id, e.category) };
  // Biomarker readouts hang off a parent target and off the drugs whose current label thresholds name them; the
  // reverse links are written here so a target page lists its readouts and a drug page its required readouts in
  // `related`, and no readout is an orphan reachable only by search.
  if (e.kind === "target") {
    // Specificity and distribution (scripts/fetch-target-specificity.ts, src/data/target-specificity.ts): filled where the record carries none of its own.
    // First-description year (scripts/fetch-first-described.ts, src/data/target-first-described.ts): the earliest
    // sequence paper UniProt cites for the protein, never the earliest paper OnCo holds. A hand-written year wins.
    const fd = TARGET_FIRST_DESCRIBED[e.id];
    if (fd && e.firstDescribed === undefined) e = { ...e, firstDescribed: fd.year, firstDescribedBasis: "sequence", firstDescribedNote: fd.note, firstDescribedSource: firstDescribedSource(fd) };
    const sp = targetSpecificity[e.id];
    if (sp && !e.specificity && !e.distribution) e = { ...e, ...(sp.specificity ? { specificity: sp.specificity } : {}), distribution: sp.distribution, ...(sp.tumourAgnostic ? { tumourAgnostic: true } : {}), specificityNote: sp.specificityNote, specificitySources: sp.specificitySources };
    if (READOUTS_BY_TARGET[e.id]) return { ...e, related: [...(e.related ?? []), ...READOUTS_BY_TARGET[e.id].filter((id) => !(e.related ?? []).includes(id))] };
    return e;
  }
  if (e.kind === "drug" && READOUTS_BY_DRUG[e.id]) e = { ...e, related: [...(e.related ?? []), ...READOUTS_BY_DRUG[e.id].filter((id) => !(e.related ?? []).includes(id))] };
  if (e.kind === "cancer" && !e.parent && (cancerParents[e.id] ?? cancerParentsWave2Map[e.id])) return { ...e, parent: cancerParents[e.id] ?? cancerParentsWave2Map[e.id] };
  if (e.kind === "trial") {
    let t = e;
    // Key papers found for trials by scripts/fetch-trial-papers.ts (wave 1), kept in one file rather than edited into every trial file.
    if (trialKeyPapersWave1[t.id]) t = { ...t, keyPapers: [...(t.keyPapers ?? []), ...trialKeyPapersWave1[t.id].filter((id) => !(t.keyPapers ?? []).includes(id))] };
    // Sponsors verified through the ClinicalTrials.gov lead-sponsor field by scripts/fetch-company-drugs.ts (wave 6).
    if (trialCompaniesWave6[t.id]) t = { ...t, companies: [...(t.companies ?? []), ...trialCompaniesWave6[t.id].filter((id) => !(t.companies ?? []).includes(id))] };
    // Cooperative groups and public trial sponsors (src/data/companies-cooperative-groups.ts): the group record that lists the trial.
    if (cooperativeGroupTrialCompanies[t.id]) t = { ...t, companies: [...(t.companies ?? []), ...cooperativeGroupTrialCompanies[t.id].filter((id) => !(t.companies ?? []).includes(id))] };
    // Drugs and technologies the registry's intervention list names, found by scripts/fetch-entity-trials.ts (wave 5) for
    // records that had no trial; the trial record itself stays as written.
    const ent = entityTrialLinksWave5[t.id];
    if (ent) t = { ...t, drugs: [...(t.drugs ?? []), ...(ent.drugs ?? []).filter((id) => !(t.drugs ?? []).includes(id))], technologies: [...(t.technologies ?? []), ...(ent.technologies ?? []).filter((id) => !(t.technologies ?? []).includes(id))] };
    // Outcomes copied from the ClinicalTrials.gov results section by scripts/fetch-registry-outcomes.ts (wave 7), for
    // trials that carry none of their own; the ingested summary's "no results" sentence is replaced. On a hand-written
    // trial the editor's enrolment, year reported and asOf stand; only the outcomes (and any of those fields it lacks) are added.
    const reg = TRIAL_REGISTRY_OUTCOMES[t.id];
    if (reg && !(t.outcomes?.length)) {
      const posted = reg.yearReported ? ` in ${reg.yearReported}` : "";
      const ingested = t.tags?.includes("ctgov-ingest");
      const merged = ingested ? { ...t, ...reg } : { ...reg, ...t, outcomes: reg.outcomes, asOf: t.asOf > (reg.asOf ?? "") ? t.asOf : reg.asOf ?? t.asOf };
      t = { ...merged, summary: t.summary.replace(/No results (?:have been posted on ClinicalTrials\.gov|are recorded here; the registry entry is the source)\./, `Results were posted on ClinicalTrials.gov${posted}; the figures recorded here are the registry's, not a publication's.`) };
    }
    // Status read from the registry by scripts/fetch-registry-status.ts (wave 7a follow-up): applied only while the trial
    // still carries the status the script saw, with a dated note and, on ingested trials, the matching TL;DR and summary phrase.
    const st = TRIAL_REGISTRY_STATUS[t.id];
    if (st) t = applyRegistryStatus(t, st);
    // Start date from the registry's startDateStruct (scripts/fetch-trial-starts.ts, src/data/trial-start-dates.ts),
    // with the registry's own ACTUAL or ESTIMATED beside it. A date written on the record wins.
    const start = TRIAL_START_DATES[t.id];
    if (start && !t.started) t = { ...t, started: start.started, ...(start.type ? { startedType: start.type } : {}) };
    // What the registry says about joining: dated, hashed, and small enough to render without fetching anything.
    const participation = TRIAL_PARTICIPATION[t.id];
    if (participation?.length) t = { ...t, participation };
    const alternateParticipation = TRIAL_ALTERNATE_PARTICIPATION[t.id];
    if (alternateParticipation?.length) t = { ...t, alternateParticipation };
    return t;
  }
  // Trials found for drugs and technologies that had none by scripts/fetch-entity-trials.ts (wave 5): the record's own `trials` array.
  if ((e.kind === "drug" || e.kind === "technology") && entityTrialsWave5[e.id]) return { ...e, trials: [...(e.trials ?? []), ...entityTrialsWave5[e.id].filter((id) => !(e.trials ?? []).includes(id))] };
  // Each test in src/data/readout-test-records.ts, listed by the company its own record credits (READOUT_TESTS_BY_COMPANY).
  if (e.kind === "company" && READOUT_TESTS_BY_COMPANY[e.id]) e = { ...e, drugs: [...(e.drugs ?? []), ...READOUT_TESTS_BY_COMPANY[e.id].filter((id) => !(e.drugs ?? []).includes(id))] };
  // Drugs found for companies through the ClinicalTrials.gov lead-sponsor field by scripts/fetch-company-drugs.ts (wave 6).
  // and the pipeline products added for companies whose pages showed none (gap audit class 5, src/data/company-pipeline-gap.ts).
  if (e.kind === "company" && (companyDrugsWave6[e.id] || companyPipelineGapCompanyDrugs[e.id])) {
    const extra = [...(companyDrugsWave6[e.id] ?? []), ...(companyPipelineGapCompanyDrugs[e.id] ?? [])];
    return { ...e, drugs: [...(e.drugs ?? []), ...extra.filter((id, i) => !(e.drugs ?? []).includes(id) && extra.indexOf(id) === i)] };
  }
  // Trials and key papers found for ideas by scripts/fetch-idea-evidence.ts (wave 6).
  if (e.kind === "idea" && ideaLinksWave6[e.id]) {
    const w = ideaLinksWave6[e.id];
    return { ...e, trials: [...(e.trials ?? []), ...w.trials.filter((id) => !(e.trials ?? []).includes(id))], keyPapers: [...(e.keyPapers ?? []), ...w.keyPapers.filter((id) => !(e.keyPapers ?? []).includes(id))] };
  }
  // Papers found for people by scripts/fetch-people-papers.ts (wave 6): the person's own `papers` rows and the paper records behind them.
  if (e.kind === "person" && personPapersWave6[e.id]) {
    const w = personPapersWave6[e.id];
    const have = new Set((e.papers ?? []).map((x) => x.title.toLowerCase()));
    return { ...e, papers: [...(e.papers ?? []), ...w.papers.filter((x) => !have.has(x.title.toLowerCase()))], keyPapers: [...(e.keyPapers ?? []), ...w.keyPapers.filter((id) => !(e.keyPapers ?? []).includes(id))] };
  }
  return e;
});

{
  const missing = unappliedSpikeSupplements();
  if (missing.length) throw new Error(`Spike supplements name records that do not exist: ${missing.join(", ")}`);
  const unpatched = unpatchedSpikeCancers();
  if (unpatched.length) throw new Error(`Spike patches name cancers that do not exist: ${unpatched.join(", ")}`);
  const orphanedMerges = unappliedMergeSupplements();
  if (orphanedMerges.length) throw new Error(`Merge supplements name records that do not exist: ${orphanedMerges.join(", ")}`);
  const ids = new Set(RECORDS.map((r) => r.id));
  const strayEdu = Object.keys(patientEducationLinks).filter((id) => !ids.has(id));
  if (strayEdu.length) throw new Error(`Patient education links name records that do not exist: ${strayEdu.join(", ")}`);
}

/**
 * One record per year, generated from everything above it (./years.ts). Last, because it reads every other record;
 * the years themselves carry no relation arrays beyond the previous and next year, so they add nothing to anyone
 * else's backlinks.
 */
export const ALL_INPUTS: EntityInput[] = [...RECORDS, ...yearRecords(RECORDS)];
