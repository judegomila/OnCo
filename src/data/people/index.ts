import type { PersonInput } from "@/lib/schema";

/** People (clinicians, scientists, leaders) grouped by file. Register each file here. */
const files: PersonInput[][] = [];
export const people: PersonInput[] = files.flat();
