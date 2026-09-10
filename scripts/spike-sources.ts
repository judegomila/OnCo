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

/** File stem -> spike, so the test can compare against `readdirSync("src/data/spikes")`. */
export const SPIKE_FILES: Record<string, Spike> = {
  nsclc, prostate, pancreatic, glioblastoma, "breast-hr-positive": breastHr, "breast-her2-positive": breastHer2, hcc, cholangiocarcinoma, neuroendocrine, melanoma,
  "head-and-neck": headAndNeck, thyroid, colorectal, gastric, esophageal, sclc, mesothelioma, urothelial, rcc, ovarian, endometrial, cervical, aml, "all-leukemia": allLeukemia,
  cll, dlbcl, "multiple-myeloma": multipleMyeloma, "hodgkin-lymphoma": hodgkin, sarcoma, neuroblastoma,
};

/** Spike files that are not spikes (the registry itself, and gap-cancers which exports plain entities). */
export const NON_SPIKE_FILES = ["index", "gap-cancers", "nci-paediatric", "nci-rare-solid", "nci-rare-other"];

export const spikeSources: Spike[] = Object.values(SPIKE_FILES);
