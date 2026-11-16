/**
 * Every country page's list of the drugs it names, in one place, so a drug page can link back to the country pages
 * that discuss it (src/lib/drug-availability.ts). The deep dives from wave 2 on carry the list on their CountryDive;
 * the wave 1 pages keep it in their own country file. A page added later joins here or its drugs are not linked back:
 * src/lib/drug-availability.test.ts checks that every country file exporting a drug list is in this one.
 */
import type { CountryDive } from "./country-dive";
import { AF_DIVE } from "./country-af";
import { AM_DIVE } from "./country-am";
import { AO_DIVE } from "./country-ao";
import { AR_DIVE } from "./country-ar";
import { AT_DIVE } from "./country-at";
import { AU_DIVE } from "./country-au";
import { AZ_DIVE } from "./country-az";
import { BA_DIVE } from "./country-ba";
import { BD_DIVE } from "./country-bd";
import { BE_DIVE } from "./country-be";
import { BF_DIVE } from "./country-bf";
import { BG_DIVE } from "./country-bg";
import { BO_DIVE } from "./country-bo";
import { BR_DIVE } from "./country-br";
import { BY_DIVE } from "./country-by";
import { CD_DIVE } from "./country-cd";
import { CH_DIVE } from "./country-ch";
import { CI_DIVE } from "./country-ci";
import { CL_DIVE } from "./country-cl";
import { CM_DIVE } from "./country-cm";
import { CO_DIVE } from "./country-co";
import { CR_DIVE } from "./country-cr";
import { CU_DIVE } from "./country-cu";
import { CZ_DIVE } from "./country-cz";
import { DK_DIVE } from "./country-dk";
import { DO_DIVE } from "./country-do";
import { DZ_DIVE } from "./country-dz";
import { EC_DIVE } from "./country-ec";
import { EG_DIVE } from "./country-eg";
import { ES_DIVE } from "./country-es";
import { ET_DIVE } from "./country-et";
import { FI_DIVE } from "./country-fi";
import { GE_DIVE } from "./country-ge";
import { GH_DIVE } from "./country-gh";
import { GN_DIVE } from "./country-gn";
import { GR_DIVE } from "./country-gr";
import { GT_DIVE } from "./country-gt";
import { HN_DIVE } from "./country-hn";
import { HR_DIVE } from "./country-hr";
import { HT_DIVE } from "./country-ht";
import { HU_DIVE } from "./country-hu";
import { ID_DIVE } from "./country-id";
import { IE_DIVE } from "./country-ie";
import { IQ_DIVE } from "./country-iq";
import { IR_DIVE } from "./country-ir";
import { JO_DIVE } from "./country-jo";
import { KE_DIVE } from "./country-ke";
import { KH_DIVE } from "./country-kh";
import { KP_DIVE } from "./country-kp";
import { KZ_DIVE } from "./country-kz";
import { LB_DIVE } from "./country-lb";
import { LK_DIVE } from "./country-lk";
import { LT_DIVE } from "./country-lt";
import { LV_DIVE } from "./country-lv";
import { MA_DIVE } from "./country-ma";
import { MD_DIVE } from "./country-md";
import { MG_DIVE } from "./country-mg";
import { ML_DIVE } from "./country-ml";
import { MM_DIVE } from "./country-mm";
import { MW_DIVE } from "./country-mw";
import { MX_DIVE } from "./country-mx";
import { MY_DIVE } from "./country-my";
import { MZ_DIVE } from "./country-mz";
import { NE_DIVE } from "./country-ne";
import { NG_DIVE } from "./country-ng";
import { NO_DIVE } from "./country-no";
import { NP_DIVE } from "./country-np";
import { NZ_DIVE } from "./country-nz";
import { PA_DIVE } from "./country-pa";
import { PE_DIVE } from "./country-pe";
import { PG_DIVE } from "./country-pg";
import { PH_DIVE } from "./country-ph";
import { PK_DIVE } from "./country-pk";
import { PL_DIVE } from "./country-pl";
import { PR_DIVE } from "./country-pr";
import { PT_DIVE } from "./country-pt";
import { PY_DIVE } from "./country-py";
import { RO_DIVE } from "./country-ro";
import { RS_DIVE } from "./country-rs";
import { RW_DIVE } from "./country-rw";
import { SA_DIVE } from "./country-sa";
import { SD_DIVE } from "./country-sd";
import { SE_DIVE } from "./country-se";
import { SG_DIVE } from "./country-sg";
import { SI_DIVE } from "./country-si";
import { SK_DIVE } from "./country-sk";
import { SN_DIVE } from "./country-sn";
import { SO_DIVE } from "./country-so";
import { SV_DIVE } from "./country-sv";
import { SY_DIVE } from "./country-sy";
import { TD_DIVE } from "./country-td";
import { TH_DIVE } from "./country-th";
import { TN_DIVE } from "./country-tn";
import { TR_DIVE } from "./country-tr";
import { TW_DIVE } from "./country-tw";
import { TZ_DIVE } from "./country-tz";
import { UA_DIVE } from "./country-ua";
import { UG_DIVE } from "./country-ug";
import { UY_DIVE } from "./country-uy";
import { UZ_DIVE } from "./country-uz";
import { VE_DIVE } from "./country-ve";
import { VN_DIVE } from "./country-vn";
import { YE_DIVE } from "./country-ye";
import { ZA_DIVE } from "./country-za";
import { ZM_DIVE } from "./country-zm";
import { ZW_DIVE } from "./country-zw";
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
  ...[AF_DIVE, AM_DIVE, AO_DIVE, AR_DIVE, AT_DIVE, AU_DIVE, AZ_DIVE, BA_DIVE, BD_DIVE, BE_DIVE, BF_DIVE, BG_DIVE, BO_DIVE, BR_DIVE, BY_DIVE, CD_DIVE, CH_DIVE, CI_DIVE, CL_DIVE, CM_DIVE, CO_DIVE, CR_DIVE, CU_DIVE, CZ_DIVE, DK_DIVE, DO_DIVE, DZ_DIVE, EC_DIVE, EG_DIVE, ES_DIVE, ET_DIVE, FI_DIVE, GE_DIVE, GH_DIVE, GN_DIVE, GR_DIVE, GT_DIVE, HN_DIVE, HR_DIVE, HT_DIVE, HU_DIVE, ID_DIVE, IE_DIVE, IQ_DIVE, IR_DIVE, JO_DIVE, KE_DIVE, KH_DIVE, KP_DIVE, KZ_DIVE, LB_DIVE, LK_DIVE, LT_DIVE, LV_DIVE, MA_DIVE, MD_DIVE, MG_DIVE, ML_DIVE, MM_DIVE, MW_DIVE, MX_DIVE, MY_DIVE, MZ_DIVE, NE_DIVE, NG_DIVE, NO_DIVE, NP_DIVE, NZ_DIVE, PA_DIVE, PE_DIVE, PG_DIVE, PH_DIVE, PK_DIVE, PL_DIVE, PR_DIVE, PT_DIVE, PY_DIVE, RO_DIVE, RS_DIVE, RW_DIVE, SA_DIVE, SD_DIVE, SE_DIVE, SG_DIVE, SI_DIVE, SK_DIVE, SN_DIVE, SO_DIVE, SV_DIVE, SY_DIVE, TD_DIVE, TH_DIVE, TN_DIVE, TR_DIVE, TW_DIVE, TZ_DIVE, UA_DIVE, UG_DIVE, UY_DIVE, UZ_DIVE, VE_DIVE, VN_DIVE, YE_DIVE, ZA_DIVE, ZM_DIVE, ZW_DIVE].map(dive),
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
