/**
 * Hand-written "questions to ask your oncologist", keyed by cancer id.
 * Generic questions for any cancer are generated in src/lib/questions.ts.
 * Settings are free text but should match the cancer's standardOfCare settings where possible.
 */
export type Question = { setting: string; question: string; why: string };

import { GALLBLADDER_CANCER_ID, gallbladderQuestions } from "./spikes/gallbladder-living";
import { TNBC_CANCER_ID, tnbcQuestions } from "./spikes/tnbc-living";
import { PANCREATIC_CANCER_ID, pancreaticQuestions } from "./spikes/pancreatic-living";
import { COLORECTAL_CANCER_ID, colorectalQuestions } from "./spikes/colorectal-living";
import { LUNG_CANCER_ID, lungQuestions, SCLC_CANCER_ID, sclcQuestions } from "./spikes/lung-living";

export const questions: Record<string, Question[]> = {
  [GALLBLADDER_CANCER_ID]: gallbladderQuestions,
  [TNBC_CANCER_ID]: tnbcQuestions,
  [PANCREATIC_CANCER_ID]: pancreaticQuestions,
  [COLORECTAL_CANCER_ID]: colorectalQuestions,
  [LUNG_CANCER_ID]: lungQuestions,
  [SCLC_CANCER_ID]: sclcQuestions,
};
