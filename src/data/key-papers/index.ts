import type { PaperInput } from "@/lib/schema";
import { papersSolidTumours } from "./solid-tumours";
import { papersBloodImmuneCell } from "./blood-immune-cell";
import { papersPreventionDetectionBiology } from "./prevention-detection-biology";
import { papersRadiation } from "./radiation";
import { papersVirotherapy } from "./virotherapy";

/** Key papers, one page each. Register each file here. */
const files: PaperInput[][] = [papersSolidTumours, papersBloodImmuneCell, papersPreventionDetectionBiology, papersRadiation, papersVirotherapy];
export const keyPapers: PaperInput[] = files.flat();
