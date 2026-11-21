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
import { peopleBE } from "./country-be";
import { peopleMA } from "./country-ma";
import { peopleIQ } from "./country-iq";
import { peoplePE } from "./country-pe";
import { peopleMM } from "./country-mm";
import { peopleCL } from "./country-cl";
import { peoplePT } from "./country-pt";
import { peopleGR } from "./country-gr";
import { peopleKE } from "./country-ke";
import { peopleCZ } from "./country-cz";
import { peopleSD } from "./country-sd";
import { peopleCD } from "./country-cd";
import { peopleHU } from "./country-hu";
import { peopleAT } from "./country-at";
import { peopleTZ } from "./country-tz";
import { peopleUZ } from "./country-uz";
import { peopleSA } from "./country-sa";
import { peopleUG } from "./country-ug";
import { peopleVE } from "./country-ve";
import { peopleLK } from "./country-lk";
import { peopleGH } from "./country-gh";
import { peopleDK } from "./country-dk";
import { peopleNP } from "./country-np";
import { peopleKZ } from "./country-kz";
import { peopleEC } from "./country-ec";
import { peopleCU } from "./country-cu";
import { peopleYE } from "./country-ye";
import { peopleBY } from "./country-by";
import { peopleRS } from "./country-rs";
import { peopleSY } from "./country-sy";
import { peopleAF } from "./country-af";
import { peopleBG } from "./country-bg";
import { peopleNO } from "./country-no";
import { peopleFI } from "./country-fi";
import { peopleKP } from "./country-kp";
import { peopleKH } from "./country-kh";
import { peopleIE } from "./country-ie";
import { peopleZW } from "./country-zw";
import { peopleAO } from "./country-ao";
import { peopleTN } from "./country-tn";
import { peopleSK } from "./country-sk";
import { peopleNZ } from "./country-nz";
import { peopleHR } from "./country-hr";
import { peopleMZ } from "./country-mz";
import { peopleMW } from "./country-mw";
import { peopleMG } from "./country-mg";
import { peopleDO } from "./country-do";
import { peopleGT } from "./country-gt";
import { peopleCI } from "./country-ci";
import { peopleSG } from "./country-sg";
import { peopleTD } from "./country-td";
import { peopleLB } from "./country-lb";
import { peopleBO } from "./country-bo";
import { peopleZM } from "./country-zm";
import { peoplePR } from "./country-pr";
import { peopleUY } from "./country-uy";
import { peopleLT } from "./country-lt";
import { peopleNE } from "./country-ne";
import { peopleCM } from "./country-cm";
import { peopleGE } from "./country-ge";
import { peopleAZ } from "./country-az";
import { peopleBA } from "./country-ba";
import { peopleHT } from "./country-ht";
import { peopleSN } from "./country-sn";
import { peopleSI } from "./country-si";
import { peopleML } from "./country-ml";
import { peoplePG } from "./country-pg";
import { peopleBF } from "./country-bf";
import { peopleCR } from "./country-cr";
import { peoplePY } from "./country-py";
import { peopleRW } from "./country-rw"; // wave 12
import { peopleGN } from "./country-gn"; // wave 12
import { peopleJM } from "./country-jm"; // wave 16
import { peopleTT } from "./country-tt"; // wave 16
import { peopleBS } from "./country-bs"; // wave 16
import { peopleBB } from "./country-bb"; // wave 16
import { peopleBZ } from "./country-bz"; // wave 16
import { peopleGY } from "./country-gy"; // wave 16
import { peopleSR } from "./country-sr"; // wave 16
import { peopleLC } from "./country-lc"; // wave 16
import { peopleCW } from "./country-cw"; // wave 16
import { peopleFJ } from "./country-fj"; // wave 16
import { peopleWS } from "./country-ws"; // wave 16
import { peopleSB } from "./country-sb"; // wave 16
import { peopleVU } from "./country-vu"; // wave 16
import { peopleGU } from "./country-gu"; // wave 16
import { peoplePF } from "./country-pf"; // wave 16
import { peopleNC } from "./country-nc"; // wave 16
import { peopleMD } from "./country-md"; // wave 12
import { peopleLV } from "./country-lv"; // wave 12
import { peopleHN } from "./country-hn"; // wave 12
import { peopleAM } from "./country-am"; // wave 12
import { peopleSO } from "./country-so"; // wave 12
import { peopleJO } from "./country-jo"; // wave 12
import { peopleSV } from "./country-sv"; // wave 12
import { peoplePA } from "./country-pa"; // wave 12
import { peopleAE } from "./country-ae"; // wave 13
import { peopleKW } from "./country-kw"; // wave 13
import { peopleQA } from "./country-qa"; // wave 13
import { peopleOM } from "./country-om"; // wave 13
import { peopleBH } from "./country-bh"; // wave 13
import { peopleLY } from "./country-ly"; // wave 13
import { peoplePS } from "./country-ps"; // wave 13
import { peopleCY } from "./country-cy"; // wave 13
import { peopleMT } from "./country-mt"; // wave 13
import { peopleLU } from "./country-lu"; // wave 13
import { peopleIS } from "./country-is"; // wave 13
import { peopleEE } from "./country-ee"; // wave 13
import { peopleAL } from "./country-al"; // wave 13
import { peopleMK } from "./country-mk"; // wave 13
import { peopleME } from "./country-me"; // wave 13
import { peopleMN } from "./country-mn"; // wave 13
import { peopleSL } from "./country-sl"; // wave 14
import { peopleLR } from "./country-lr"; // wave 14
import { peopleTG } from "./country-tg"; // wave 14
import { peopleBJ } from "./country-bj"; // wave 14
import { peopleGM } from "./country-gm"; // wave 14
import { peopleGW } from "./country-gw"; // wave 14
import { peopleMR } from "./country-mr"; // wave 14
import { peopleCV } from "./country-cv"; // wave 14
import { peopleST } from "./country-st"; // wave 14
import { peopleGA } from "./country-ga"; // wave 14
import { peopleCG } from "./country-cg"; // wave 14
import { peopleCF } from "./country-cf"; // wave 14
import { peopleGQ } from "./country-gq"; // wave 14
import { peopleBI } from "./country-bi"; // wave 14
import { peopleSS } from "./country-ss"; // wave 14
import { peopleER } from "./country-er"; // wave 14
import { peopleNA } from "./country-na"; // wave 15
import { peopleBW } from "./country-bw"; // wave 15
import { peopleLS } from "./country-ls"; // wave 15
import { peopleSZ } from "./country-sz"; // wave 15
import { peopleMU } from "./country-mu"; // wave 15
import { peopleKM } from "./country-km"; // wave 15
import { peopleDJ } from "./country-dj"; // wave 15
import { peopleMV } from "./country-mv"; // wave 15
import { peopleBT } from "./country-bt"; // wave 15
import { peopleLA } from "./country-la"; // wave 15
import { peopleTL } from "./country-tl"; // wave 15
import { peopleBN } from "./country-bn"; // wave 15
import { peopleKG } from "./country-kg"; // wave 15
import { peopleTJ } from "./country-tj"; // wave 15
import { peopleTM } from "./country-tm"; // wave 15
import { peopleNI } from "./country-ni"; // wave 15

/** People (clinicians, scientists, leaders, and the heroes of /heroes/) grouped by file. Register each file here. */
const files: PersonInput[][] = [peopleEurope, peopleAsiaPacific, peopleUsEast, peopleUsWest, heroes, heroesDonors, peopleLeadersWave2, peopleLeadersWave3, peopleLeadersWave4, peopleIndia, peopleIsrael, peopleChina, peopleKeyOpinionLeaders, peopleVirotherapy, peopleAU, peopleES, peopleBR, peopleSE, peopleCH, peopleID, peoplePK, peopleTR, peopleBD, peopleIR, peopleMX, peopleEG, peoplePL, peopleNG, peopleTH, peopleVN, peoplePH, peopleET, peopleZA, peopleCO, peopleAR, peopleUA, peopleRO, peopleMY, peopleDZ, peopleTW];
// Country deep dives, wave 5.
files.push(peopleBE, peopleMA, peopleIQ, peoplePE, peopleMM, peopleCL, peoplePT, peopleGR, peopleKE, peopleCZ);
// Country deep dives, wave 6.
files.push(peopleSD, peopleCD, peopleHU, peopleAT, peopleTZ, peopleUZ, peopleSA, peopleUG, peopleVE, peopleLK);
// Country deep dives, wave 7.
files.push(peopleGH, peopleDK, peopleNP, peopleKZ, peopleEC, peopleCU, peopleYE, peopleBY, peopleRS, peopleSY);
// Country deep dives, wave 9.
files.push(peopleSK, peopleNZ, peopleHR, peopleMZ, peopleMW, peopleMG, peopleDO, peopleGT, peopleCI, peopleSG);
// Country deep dives, wave 10.
files.push(peopleTD, peopleLB, peopleBO, peopleZM, peoplePR, peopleUY, peopleLT, peopleNE, peopleCM, peopleGE);
// Country deep dives, wave 11.
files.push(peopleAZ, peopleBA, peopleHT, peopleSN, peopleSI, peopleML, peoplePG, peopleBF, peopleCR, peoplePY);
// Country deep dives, wave 12.
files.push(peopleRW, peopleGN, peopleMD, peopleLV, peopleHN, peopleAM, peopleSO, peopleJO, peopleSV, peoplePA);
files.push(peopleJM, peopleTT, peopleBS, peopleBB, peopleBZ, peopleGY, peopleSR, peopleLC, peopleCW, peopleFJ, peopleWS, peopleSB, peopleVU, peopleGU, peoplePF, peopleNC); // wave 16
// Country deep dives, wave 13.
files.push(peopleAE, peopleKW, peopleQA, peopleOM, peopleBH, peopleLY, peoplePS, peopleCY, peopleMT, peopleLU, peopleIS, peopleEE, peopleAL, peopleMK, peopleME, peopleMN);
// Country deep dives, wave 14.
files.push(peopleSL, peopleLR, peopleTG, peopleBJ, peopleGM, peopleGW, peopleMR, peopleCV, peopleST, peopleGA, peopleCG, peopleCF, peopleGQ, peopleBI, peopleSS, peopleER);
// Country deep dives, wave 15.
files.push(peopleNA, peopleBW, peopleLS, peopleSZ, peopleMU, peopleKM, peopleDJ, peopleMV, peopleBT, peopleLA, peopleTL, peopleBN, peopleKG, peopleTJ, peopleTM, peopleNI);
export const people: PersonInput[] = files.flat();
people.push(...peopleAF, ...peopleBG, ...peopleNO, ...peopleFI, ...peopleKP, ...peopleKH, ...peopleIE, ...peopleZW, ...peopleAO, ...peopleTN);
