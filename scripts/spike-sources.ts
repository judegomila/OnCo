/**
 * The cancer spikes as separate modules, before `mergeDuplicates` folds overlapping records together.
 *
 * `src/data/spikes/index.ts` keeps its list private, so the audit imports each spike here to compare
 * the pre-merge copies of any record two spikes both define. `scripts/audit.test.ts` checks that this
 * list matches the files on disk, so a new spike cannot be missed silently.
 */
import type { Spike } from "../src/data/spikes";
import nsclc from "../src/data/spikes/nsclc";
import prostate from "../src/data/spikes/prostate";
import pancreatic from "../src/data/spikes/pancreatic";
import glioblastoma from "../src/data/spikes/glioblastoma";
import breastHr from "../src/data/spikes/breast-hr-positive";
import breastHer2 from "../src/data/spikes/breast-her2-positive";
import hcc from "../src/data/spikes/hcc";
import cholangiocarcinoma from "../src/data/spikes/cholangiocarcinoma";
import neuroendocrine from "../src/data/spikes/neuroendocrine";
import melanoma from "../src/data/spikes/melanoma";
import headAndNeck from "../src/data/spikes/head-and-neck";
import thyroid from "../src/data/spikes/thyroid";
import colorectal from "../src/data/spikes/colorectal";
import colorectalCore from "../src/data/spikes/colorectal-core";
import gastric from "../src/data/spikes/gastric";
import esophageal from "../src/data/spikes/esophageal";
import sclc from "../src/data/spikes/sclc";
import mesothelioma from "../src/data/spikes/mesothelioma";
import urothelial from "../src/data/spikes/urothelial";
import rcc from "../src/data/spikes/rcc";
import ovarian from "../src/data/spikes/ovarian";
import endometrial from "../src/data/spikes/endometrial";
import cervical from "../src/data/spikes/cervical";
import aml from "../src/data/spikes/aml";
import allLeukemia from "../src/data/spikes/all-leukemia";
import cll from "../src/data/spikes/cll";
import dlbcl from "../src/data/spikes/dlbcl";
import multipleMyeloma from "../src/data/spikes/multiple-myeloma";
import hodgkin from "../src/data/spikes/hodgkin-lymphoma";
import sarcoma from "../src/data/spikes/sarcoma";
import neuroblastoma from "../src/data/spikes/neuroblastoma";
import gallbladderLiving from "../src/data/spikes/gallbladder-living";
import gallbladderMolecular from "../src/data/spikes/gallbladder-molecular";
import gallbladderCore from "../src/data/spikes/gallbladder-core";
import gallbladderUk from "../src/data/spikes/gallbladder-uk";
import gallbladderEvidence from "../src/data/spikes/gallbladder-evidence";
import gallbladderTreatment from "../src/data/spikes/gallbladder-treatment";
import gallbladderGeography from "../src/data/spikes/gallbladder-geography";
import tnbcCore from "../src/data/spikes/tnbc-core";
import tnbcEvidence from "../src/data/spikes/tnbc-evidence";
import pancreaticEvidence from "../src/data/spikes/pancreatic-evidence";
import tnbcUk from "../src/data/spikes/tnbc-uk";
import pancreaticUk from "../src/data/spikes/pancreatic-uk";
import colorectalUk from "../src/data/spikes/colorectal-uk";
import tnbcLiving from "../src/data/spikes/tnbc-living";
import tnbcMolecular from "../src/data/spikes/tnbc-molecular";
import tnbcTreatment from "../src/data/spikes/tnbc-treatment";
import pancreaticTreatment from "../src/data/spikes/pancreatic-treatment";
import pancreaticLiving from "../src/data/spikes/pancreatic-living";
import pancreaticCore from "../src/data/spikes/pancreatic-core";
import pancreaticMolecular from "../src/data/spikes/pancreatic-molecular";
import colorectalLiving from "../src/data/spikes/colorectal-living";

/** File stem -> spike, so the test can compare against `readdirSync("src/data/spikes")`. */
export const SPIKE_FILES: Record<string, Spike> = {
  nsclc, prostate, pancreatic, "pancreatic-core": pancreaticCore, "pancreatic-uk": pancreaticUk, "colorectal-uk": colorectalUk, glioblastoma, "breast-hr-positive": breastHr, "breast-her2-positive": breastHer2, hcc, cholangiocarcinoma, neuroendocrine, melanoma,
  "head-and-neck": headAndNeck, thyroid, colorectal, "colorectal-core": colorectalCore, gastric, esophageal, sclc, mesothelioma, urothelial, rcc, ovarian, endometrial, cervical, aml, "all-leukemia": allLeukemia,
  cll, dlbcl, "multiple-myeloma": multipleMyeloma, "hodgkin-lymphoma": hodgkin, sarcoma, neuroblastoma, "gallbladder-living": gallbladderLiving, "gallbladder-molecular": gallbladderMolecular, "gallbladder-core": gallbladderCore, "gallbladder-uk": gallbladderUk, "gallbladder-evidence": gallbladderEvidence, "gallbladder-treatment": gallbladderTreatment,
  "gallbladder-geography": gallbladderGeography, "tnbc-core": tnbcCore, "tnbc-evidence": tnbcEvidence, "tnbc-uk": tnbcUk, "tnbc-living": tnbcLiving, "tnbc-molecular": tnbcMolecular, "tnbc-treatment": tnbcTreatment, "pancreatic-living": pancreaticLiving, "pancreatic-evidence": pancreaticEvidence, "pancreatic-treatment": pancreaticTreatment, "pancreatic-molecular": pancreaticMolecular, "colorectal-living": colorectalLiving,
};

/** Spike files that are not spikes (the registry itself, and gap-cancers which exports plain entities). */
// The gallbladder-evidence-* files are helpers of the gallbladder-evidence spike (shared constants, paper lists, roadmap and ideas), not spikes.
export const NON_SPIKE_FILES = ["index", "gap-cancers", "nci-paediatric", "nci-rare-solid", "nci-rare-other", "gallbladder-evidence-shared", "gallbladder-evidence-papers-surgery", "gallbladder-evidence-papers-epidemiology", "gallbladder-evidence-roadmap", "gallbladder-registry-trials", "tnbc-registry-trials", "tnbc-evidence-shared", "tnbc-evidence-papers-foundations", "tnbc-evidence-papers-treatment", "tnbc-evidence-roadmap", "pancreatic-evidence-shared", "pancreatic-evidence-papers-foundations", "pancreatic-evidence-papers-treatment", "pancreatic-evidence-roadmap", "pancreatic-registry-trials", "pancreatic-treatment-shared", "pancreatic-treatment-trials", "pancreatic-treatment-trials-advanced", "pancreatic-treatment-trials-targeted", "pancreatic-treatment-supplements"];

export const spikeSources: Spike[] = Object.values(SPIKE_FILES);
