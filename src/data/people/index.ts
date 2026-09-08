import type { PersonInput } from "@/lib/schema";
import { peopleEurope } from "./europe";
import { peopleAsiaPacific } from "./asia-pacific";
import { peopleUsEast } from "./us-east";

/** People (clinicians, scientists, leaders) grouped by file. Register each file here. */
const files: PersonInput[][] = [peopleEurope, peopleAsiaPacific, peopleUsEast];
export const people: PersonInput[] = files.flat();
