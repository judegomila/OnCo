import type { PaperInput } from "@/lib/schema";
import { papersPreventionDetectionBiology } from "./prevention-detection-biology";

/** Key papers, one page each. Register each file here. */
const files: PaperInput[][] = [papersPreventionDetectionBiology];
export const keyPapers: PaperInput[] = files.flat();
