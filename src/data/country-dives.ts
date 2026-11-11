/**
 * Every country page's list of the drugs it names, in one place, so a drug page can link back to the country pages
 * that discuss it (src/lib/drug-availability.ts). The wave 2 deep dives carry the list on their CountryDive; the
 * wave 1 pages keep it in their own country file. A page added later joins here or its drugs are not linked back:
 * src/lib/drug-availability.test.ts checks that every country file exporting a drug list is in this one.
 */
import type { CountryDive } from "./country-dive";
import { AR_DIVE } from "./country-ar";
import { AU_DIVE } from "./country-au";
import { BD_DIVE } from "./country-bd";
import { BR_DIVE } from "./country-br";
import { CH_DIVE } from "./country-ch";
import { CO_DIVE } from "./country-co";
import { DZ_DIVE } from "./country-dz";
import { EG_DIVE } from "./country-eg";
import { ES_DIVE } from "./country-es";
import { ET_DIVE } from "./country-et";
import { ID_DIVE } from "./country-id";
import { IR_DIVE } from "./country-ir";
import { MX_DIVE } from "./country-mx";
import { MY_DIVE } from "./country-my";
import { NG_DIVE } from "./country-ng";
import { PH_DIVE } from "./country-ph";
import { PK_DIVE } from "./country-pk";
import { PL_DIVE } from "./country-pl";
import { RO_DIVE } from "./country-ro";
import { SE_DIVE } from "./country-se";
import { TH_DIVE } from "./country-th";
import { TR_DIVE } from "./country-tr";
import { TW_DIVE } from "./country-tw";
import { UA_DIVE } from "./country-ua";
import { VN_DIVE } from "./country-vn";
import { ZA_DIVE } from "./country-za";
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
  ...[AR_DIVE, AU_DIVE, BD_DIVE, BR_DIVE, CH_DIVE, CO_DIVE, DZ_DIVE, EG_DIVE, ES_DIVE, ET_DIVE, ID_DIVE, IR_DIVE, MX_DIVE, MY_DIVE, NG_DIVE, PH_DIVE, PK_DIVE, PL_DIVE, RO_DIVE, SE_DIVE, TH_DIVE, TR_DIVE, TW_DIVE, UA_DIVE, VN_DIVE, ZA_DIVE].map(dive),
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
