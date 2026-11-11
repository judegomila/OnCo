import type { PersonInput } from "@/lib/schema";
import { peopleEurope } from "./europe";
import { peopleAsiaPacific } from "./asia-pacific";
import { peopleUsEast } from "./us-east";
import { peopleUsWest } from "./us-west";
import { heroes } from "./heroes";
import { peopleLeadersWave2 } from "./leaders-wave2";
import { peopleIndia } from "./india";
import { peopleIsrael } from "./israel";
import { peopleChina } from "./china";
import { heroesDonors } from "./heroes-donors";
import { peopleKeyOpinionLeaders } from "./key-opinion-leaders";
import { peopleLeadersWave3 } from "./leaders-wave3";
import { peopleLeadersWave4 } from "./leaders-wave4";
import { peopleVirotherapy } from "./virotherapy";
import { peopleAU } from "./country-au";
import { peopleES } from "./country-es";
import { peopleBR } from "./country-br";
import { peopleSE } from "./country-se";
import { peopleCH } from "./country-ch";
import { peopleID } from "./country-id";
import { peoplePK } from "./country-pk";
import { peopleTR } from "./country-tr";
import { peopleBD } from "./country-bd";
import { peopleIR } from "./country-ir";
import { peopleMX } from "./country-mx";
import { peopleEG } from "./country-eg";
import { peoplePL } from "./country-pl";
import { peopleNG } from "./country-ng";
import { peopleTH } from "./country-th";
import { peopleVN } from "./country-vn";
import { peoplePH } from "./country-ph";
import { peopleET } from "./country-et";
import { peopleZA } from "./country-za";
import { peopleCO } from "./country-co";
import { peopleAR } from "./country-ar";
import { peopleUA } from "./country-ua";
import { peopleRO } from "./country-ro";
import { peopleMY } from "./country-my";
import { peopleDZ } from "./country-dz";
import { peopleTW } from "./country-tw";
import { peopleRW } from "./country-rw"; // wave 12
import { peopleGN } from "./country-gn"; // wave 12
import { peopleMD } from "./country-md"; // wave 12
import { peopleLV } from "./country-lv"; // wave 12
import { peopleHN } from "./country-hn"; // wave 12
import { peopleAM } from "./country-am"; // wave 12
import { peopleSO } from "./country-so"; // wave 12
import { peopleJO } from "./country-jo"; // wave 12
import { peopleSV } from "./country-sv"; // wave 12
import { peoplePA } from "./country-pa"; // wave 12

/** People (clinicians, scientists, leaders, and the heroes of /heroes/) grouped by file. Register each file here. */
const files: PersonInput[][] = [peopleEurope, peopleAsiaPacific, peopleUsEast, peopleUsWest, heroes, heroesDonors, peopleLeadersWave2, peopleLeadersWave3, peopleLeadersWave4, peopleIndia, peopleIsrael, peopleChina, peopleKeyOpinionLeaders, peopleVirotherapy, peopleAU, peopleES, peopleBR, peopleSE, peopleCH, peopleID, peoplePK, peopleTR, peopleBD, peopleIR, peopleMX, peopleEG, peoplePL, peopleNG, peopleTH, peopleVN, peoplePH, peopleET, peopleZA, peopleCO, peopleAR, peopleUA, peopleRO, peopleMY, peopleDZ, peopleTW];
files.push(peopleRW, peopleGN, peopleMD, peopleLV, peopleHN, peopleAM, peopleSO, peopleJO, peopleSV, peoplePA); // wave 12
export const people: PersonInput[] = files.flat();
