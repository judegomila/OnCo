import type { PersonInput } from "@/lib/schema";
import { peopleEurope } from "./europe";
import { peopleAsiaPacific } from "./asia-pacific";
import { peopleUsEast } from "./us-east";
import { peopleUsWest } from "./us-west";
import { heroes } from "./heroes";
import { peopleLeadersWave2 } from "./leaders-wave2";
import { peopleIndia } from "./india";
import { peopleChina } from "./china";
import { heroesDonors } from "./heroes-donors";

/** People (clinicians, scientists, leaders, and the heroes of /heroes/) grouped by file. Register each file here. */
const files: PersonInput[][] = [peopleEurope, peopleAsiaPacific, peopleUsEast, peopleUsWest, heroes, heroesDonors, peopleLeadersWave2, peopleIndia, peopleChina];
export const people: PersonInput[] = files.flat();
