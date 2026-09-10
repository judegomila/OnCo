import type { PersonInput } from "@/lib/schema";
import { peopleEurope } from "./europe";
import { peopleAsiaPacific } from "./asia-pacific";
import { peopleUsEast } from "./us-east";
import { peopleUsWest } from "./us-west";
import { heroes } from "./heroes";
import { peopleLeadersWave2 } from "./leaders-wave2";
import { peopleLeadersWave3 } from "./leaders-wave3";

/** People (clinicians, scientists, leaders, and the heroes of /heroes/) grouped by file. Register each file here. */
const files: PersonInput[][] = [peopleEurope, peopleAsiaPacific, peopleUsEast, peopleUsWest, heroes, peopleLeadersWave2, peopleLeadersWave3];
export const people: PersonInput[] = files.flat();
