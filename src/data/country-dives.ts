/**
 * Every country page's list of the drugs it names, in one place, so a drug page can link back to the country pages
 * that discuss it (src/lib/drug-availability.ts). The deep dives from wave 2 on carry the list on their CountryDive;
 * the wave 1 pages keep it in their own country file. A page added later joins here or its drugs are not linked back:
 * src/lib/drug-availability.test.ts checks that every country file exporting a drug list is in this one.
 */
import type { CountryDive } from "./country-dive";
import { AE_DIVE } from "./country-ae";
import { AF_DIVE } from "./country-af";
import { AL_DIVE } from "./country-al";
import { AM_DIVE } from "./country-am";
import { AO_DIVE } from "./country-ao";
import { AR_DIVE } from "./country-ar";
import { AT_DIVE } from "./country-at";
import { AU_DIVE } from "./country-au";
import { AZ_DIVE } from "./country-az";
import { BA_DIVE } from "./country-ba";
import { BB_DIVE } from "./country-bb";
import { BD_DIVE } from "./country-bd";
import { BE_DIVE } from "./country-be";
import { BF_DIVE } from "./country-bf";
import { BG_DIVE } from "./country-bg";
import { BH_DIVE } from "./country-bh";
import { BO_DIVE } from "./country-bo";
import { BR_DIVE } from "./country-br";
import { BS_DIVE } from "./country-bs";
import { BY_DIVE } from "./country-by";
import { BZ_DIVE } from "./country-bz";
import { CD_DIVE } from "./country-cd";
import { CH_DIVE } from "./country-ch";
import { CI_DIVE } from "./country-ci";
import { CL_DIVE } from "./country-cl";
import { CM_DIVE } from "./country-cm";
import { CO_DIVE } from "./country-co";
import { CR_DIVE } from "./country-cr";
import { CU_DIVE } from "./country-cu";
import { CW_DIVE } from "./country-cw";
import { CY_DIVE } from "./country-cy";
import { CZ_DIVE } from "./country-cz";
import { DK_DIVE } from "./country-dk";
import { DO_DIVE } from "./country-do";
import { DZ_DIVE } from "./country-dz";
import { EC_DIVE } from "./country-ec";
import { EE_DIVE } from "./country-ee";
import { EG_DIVE } from "./country-eg";
import { ES_DIVE } from "./country-es";
import { ET_DIVE } from "./country-et";
import { FI_DIVE } from "./country-fi";
import { FJ_DIVE } from "./country-fj";
import { GE_DIVE } from "./country-ge";
import { GH_DIVE } from "./country-gh";
import { GN_DIVE } from "./country-gn";
import { GR_DIVE } from "./country-gr";
import { GT_DIVE } from "./country-gt";
import { GU_DIVE } from "./country-gu";
import { GY_DIVE } from "./country-gy";
import { HN_DIVE } from "./country-hn";
import { HR_DIVE } from "./country-hr";
import { HT_DIVE } from "./country-ht";
import { HU_DIVE } from "./country-hu";
import { ID_DIVE } from "./country-id";
import { IE_DIVE } from "./country-ie";
import { IQ_DIVE } from "./country-iq";
import { IR_DIVE } from "./country-ir";
import { IS_DIVE } from "./country-is";
import { JM_DIVE } from "./country-jm";
import { JO_DIVE } from "./country-jo";
import { KE_DIVE } from "./country-ke";
import { KH_DIVE } from "./country-kh";
import { KP_DIVE } from "./country-kp";
import { KW_DIVE } from "./country-kw";
import { KZ_DIVE } from "./country-kz";
import { LB_DIVE } from "./country-lb";
import { LC_DIVE } from "./country-lc";
import { LK_DIVE } from "./country-lk";
import { LT_DIVE } from "./country-lt";
import { LU_DIVE } from "./country-lu";
import { LV_DIVE } from "./country-lv";
import { LY_DIVE } from "./country-ly";
import { MA_DIVE } from "./country-ma";
import { MD_DIVE } from "./country-md";
import { ME_DIVE } from "./country-me";
import { MG_DIVE } from "./country-mg";
import { MK_DIVE } from "./country-mk";
import { ML_DIVE } from "./country-ml";
import { MM_DIVE } from "./country-mm";
import { MN_DIVE } from "./country-mn";
import { MT_DIVE } from "./country-mt";
import { MW_DIVE } from "./country-mw";
import { MX_DIVE } from "./country-mx";
import { MY_DIVE } from "./country-my";
import { MZ_DIVE } from "./country-mz";
import { NC_DIVE } from "./country-nc";
import { NE_DIVE } from "./country-ne";
import { NG_DIVE } from "./country-ng";
import { NO_DIVE } from "./country-no";
import { NP_DIVE } from "./country-np";
import { NZ_DIVE } from "./country-nz";
import { OM_DIVE } from "./country-om";
import { PA_DIVE } from "./country-pa";
import { PE_DIVE } from "./country-pe";
import { PF_DIVE } from "./country-pf";
import { PG_DIVE } from "./country-pg";
import { PH_DIVE } from "./country-ph";
import { PK_DIVE } from "./country-pk";
import { PL_DIVE } from "./country-pl";
import { PR_DIVE } from "./country-pr";
import { PS_DIVE } from "./country-ps";
import { PT_DIVE } from "./country-pt";
import { PY_DIVE } from "./country-py";
import { QA_DIVE } from "./country-qa";
import { RO_DIVE } from "./country-ro";
import { RS_DIVE } from "./country-rs";
import { RW_DIVE } from "./country-rw";
import { SA_DIVE } from "./country-sa";
import { SB_DIVE } from "./country-sb";
import { SD_DIVE } from "./country-sd";
import { SE_DIVE } from "./country-se";
import { SG_DIVE } from "./country-sg";
import { SI_DIVE } from "./country-si";
import { SK_DIVE } from "./country-sk";
import { SN_DIVE } from "./country-sn";
import { SO_DIVE } from "./country-so";
import { SR_DIVE } from "./country-sr";
import { SV_DIVE } from "./country-sv";
import { SY_DIVE } from "./country-sy";
import { TD_DIVE } from "./country-td";
import { TH_DIVE } from "./country-th";
import { TN_DIVE } from "./country-tn";
import { TR_DIVE } from "./country-tr";
import { TT_DIVE } from "./country-tt";
import { TW_DIVE } from "./country-tw";
import { TZ_DIVE } from "./country-tz";
import { UA_DIVE } from "./country-ua";
import { UG_DIVE } from "./country-ug";
import { UY_DIVE } from "./country-uy";
import { UZ_DIVE } from "./country-uz";
import { VE_DIVE } from "./country-ve";
import { VN_DIVE } from "./country-vn";
import { VU_DIVE } from "./country-vu";
import { WS_DIVE } from "./country-ws";
import { YE_DIVE } from "./country-ye";
import { ZA_DIVE } from "./country-za";
import { ZM_DIVE } from "./country-zm";
import { ZW_DIVE } from "./country-zw";
import { SL_DIVE } from "./country-sl"; // wave 14
import { LR_DIVE } from "./country-lr"; // wave 14
import { TG_DIVE } from "./country-tg"; // wave 14
import { BJ_DIVE } from "./country-bj"; // wave 14
import { GM_DIVE } from "./country-gm"; // wave 14
import { GW_DIVE } from "./country-gw"; // wave 14
import { MR_DIVE } from "./country-mr"; // wave 14
import { CV_DIVE } from "./country-cv"; // wave 14
import { ST_DIVE } from "./country-st"; // wave 14
import { GA_DIVE } from "./country-ga"; // wave 14
import { CG_DIVE } from "./country-cg"; // wave 14
import { CF_DIVE } from "./country-cf"; // wave 14
import { GQ_DIVE } from "./country-gq"; // wave 14
import { BI_DIVE } from "./country-bi"; // wave 14
import { SS_DIVE } from "./country-ss"; // wave 14
import { ER_DIVE } from "./country-er"; // wave 14
import { DE_DRUGS } from "./country-de";
import { FR_DRUGS } from "./country-fr";
import { IL_DRUGS } from "./country-il";
import { IN_DRUGS } from "./country-in";
import { IT_DRUGS } from "./country-it";
import { KR_DRUGS } from "./country-kr";
import { NL_DRUGS } from "./country-nl";
import { RU_DRUGS } from "./country-ru";
import { US_DRUGS } from "./country-us";

export type CountryDrugList = { iso2: string; name: string; drugs: readonly string[] };

const dive = (d: CountryDive): CountryDrugList => ({ iso2: d.iso2, name: d.name, drugs: d.drugs });

export const COUNTRY_DIVES: CountryDrugList[] = [
  ...[AE_DIVE, AF_DIVE, AL_DIVE, AM_DIVE, AO_DIVE, AR_DIVE, AT_DIVE, AU_DIVE, AZ_DIVE, BA_DIVE, BB_DIVE, BD_DIVE, BE_DIVE, BF_DIVE, BG_DIVE, BH_DIVE, BI_DIVE, BJ_DIVE, BO_DIVE, BR_DIVE, BS_DIVE, BY_DIVE, BZ_DIVE, CD_DIVE, CF_DIVE, CG_DIVE, CH_DIVE, CI_DIVE, CL_DIVE, CM_DIVE, CO_DIVE, CR_DIVE, CU_DIVE, CV_DIVE, CW_DIVE, CY_DIVE, CZ_DIVE, DK_DIVE, DO_DIVE, DZ_DIVE, EC_DIVE, EE_DIVE, EG_DIVE, ER_DIVE, ES_DIVE, ET_DIVE, FI_DIVE, FJ_DIVE, GA_DIVE, GE_DIVE, GH_DIVE, GM_DIVE, GN_DIVE, GQ_DIVE, GR_DIVE, GT_DIVE, GU_DIVE, GW_DIVE, GY_DIVE, HN_DIVE, HR_DIVE, HT_DIVE, HU_DIVE, ID_DIVE, IE_DIVE, IQ_DIVE, IR_DIVE, IS_DIVE, JM_DIVE, JO_DIVE, KE_DIVE, KH_DIVE, KP_DIVE, KW_DIVE, KZ_DIVE, LB_DIVE, LC_DIVE, LK_DIVE, LR_DIVE, LT_DIVE, LU_DIVE, LV_DIVE, LY_DIVE, MA_DIVE, MD_DIVE, ME_DIVE, MG_DIVE, MK_DIVE, ML_DIVE, MM_DIVE, MN_DIVE, MR_DIVE, MT_DIVE, MW_DIVE, MX_DIVE, MY_DIVE, MZ_DIVE, NC_DIVE, NE_DIVE, NG_DIVE, NO_DIVE, NP_DIVE, NZ_DIVE, OM_DIVE, PA_DIVE, PE_DIVE, PF_DIVE, PG_DIVE, PH_DIVE, PK_DIVE, PL_DIVE, PR_DIVE, PS_DIVE, PT_DIVE, PY_DIVE, QA_DIVE, RO_DIVE, RS_DIVE, RW_DIVE, SA_DIVE, SB_DIVE, SD_DIVE, SE_DIVE, SG_DIVE, SI_DIVE, SK_DIVE, SL_DIVE, SN_DIVE, SO_DIVE, SR_DIVE, SS_DIVE, ST_DIVE, SV_DIVE, SY_DIVE, TD_DIVE, TG_DIVE, TH_DIVE, TN_DIVE, TR_DIVE, TT_DIVE, TW_DIVE, TZ_DIVE, UA_DIVE, UG_DIVE, UY_DIVE, UZ_DIVE, VE_DIVE, VN_DIVE, VU_DIVE, WS_DIVE, YE_DIVE, ZA_DIVE, ZM_DIVE, ZW_DIVE].map(dive),
  { iso2: "DE", name: "Germany", drugs: DE_DRUGS },
  { iso2: "FR", name: "France", drugs: FR_DRUGS },
  { iso2: "IL", name: "Israel", drugs: IL_DRUGS },
  { iso2: "IN", name: "India", drugs: IN_DRUGS },
  { iso2: "IT", name: "Italy", drugs: IT_DRUGS },
  { iso2: "KR", name: "South Korea", drugs: KR_DRUGS },
  { iso2: "NL", name: "The Netherlands", drugs: NL_DRUGS },
  { iso2: "RU", name: "Russia", drugs: RU_DRUGS },
  { iso2: "US", name: "United States", drugs: US_DRUGS },
];
