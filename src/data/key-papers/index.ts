import type { PaperInput } from "@/lib/schema";

/** Key papers, one page each. Register each file here. */
const files: PaperInput[][] = [];
export const keyPapers: PaperInput[] = files.flat();
