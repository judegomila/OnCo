import type { PaperInput } from "@/lib/schema";
import { papersSolidTumours } from "./solid-tumours";
import { papersBloodImmuneCell } from "./blood-immune-cell";
import { papersPreventionDetectionBiology } from "./prevention-detection-biology";

/** Key papers, one page each. Register each file here. */
const files: PaperInput[][] = [papersSolidTumours, papersBloodImmuneCell, papersPreventionDetectionBiology];
export const keyPapers: PaperInput[] = files.flat();
