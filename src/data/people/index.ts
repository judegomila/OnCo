import type { PersonInput } from "@/lib/schema";
import { peopleEurope } from "./europe";
import { peopleAsiaPacific } from "./asia-pacific";
import { peopleUsEast } from "./us-east";
import { peopleUsWest } from "./us-west";

/** People (clinicians, scientists, leaders) grouped by file. Register each file here. */
const files: PersonInput[][] = [peopleEurope, peopleAsiaPacific, peopleUsEast, peopleUsWest];
export const people: PersonInput[] = files.flat();
