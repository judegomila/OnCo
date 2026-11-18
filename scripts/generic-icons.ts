/**
 * Icons that are nobody's logo: the stock favicon of a website builder, a web host or a shared platform, which a favicon
 * fetch returns for every organisation whose site has not replaced it. Each was found the same way, as one byte-identical
 * file on unrelated domains, and each was looked at before it was listed. scripts/fetch-logos.ts refuses a new logo whose
 * md5 is here, and scripts/generic-icons.test.ts fails if a file under public/logos matches one.
 *
 * To add one: run `npx tsx scripts/fetch-logos.ts --audit`, open a file from a group shared by unrelated organisations,
 * and list its md5 with what the picture is and where it was seen. A logo two records rightly share (a hospital and its
 * own biobank, a charity and its helpline) does not belong here.
 */
import { createHash } from "node:crypto";

export const GENERIC_ICON_MD5: Record<string, string> = {
  "e8f5f175ac4ba5f256cfc0a59dad15cb": "WordPress default icon, grey W (Apmonia Therapeutics, Intensity Therapeutics, Imerman Angels, European Cancer Leagues, T.E. Meds, UPR Comprehensive Cancer Center)",
  "6ff1009e1215a17f2ac9420bed6a164d": "WordPress default icon, blue W (HORG, INC Chile, IGHG, removed 29 October 2026; Japan Psycho-Oncology Society, found by this list on 16 November 2026)",
  "4f627cb19959032256c959f3d9149e8a": "Vercel default icon, white triangle on a black disc (More Health, Mission Bio, CinnaGen, EHIS Ethiopia, Psychosocial Oncology New Zealand)",
  "3e86903dfcc66a2427a514c4b0c82e8b": "HostGator mascot, the web host's own icon (Cansera, Armenian Psycho-Oncology Association)",
  "d337bca72a93fba20f4ee8e22ff538a6": "European Commission emblem, fetched for six EU-funded project records (weekly refresh of 16 November 2026)",
  "e4c5f593f6128a7328b2bbf5915e427d": "Grey block placeholder, 32 px (Loki Therapeutics, Onvagus)",
  "3ba48c9871ccecc45bafc2417e018878": "Shared platform icon, a white apple on orange (Canadian Association of Psychosocial Oncology, IPOS)",
  "85e0b94ab5e54257c87e45c27e8cac6c": "Shared icon, an orange and blue network, fetched for four unrelated biobank records (weekly refresh of 16 November 2026)",
  "8bba1412890a7cfa63db8b26e0374988": "A news site's favicon, a red three-armed swirl, fetched where the website field was a news article (Abdera Therapeutics, Ariceum Therapeutics; removed 29 October 2026)",
  "b30d7204f83eb7ac091c62f6b986d537": "Joomla default icon, four black interlocking links (Ministry of Health and Sports of Bolivia; dropped from the weekly refresh of 17 November 2026)",
  "01f5171374ccae311b9d45131d108a0f": "Stock placeholder, a blue globe lettered WWW (Centre Hospitalier de la Polynesie francaise; dropped 17 November 2026)",
  "4bebb30919f785ae13f395c0a15b38b1": "Stock icon, a black die, returned for health.gov.mw although the site's own page names the national coat of arms (Ministry of Health, Malawi; dropped 17 November 2026)",
  "4d57e1399f30afe5eb9f1d8c965a40d1": "Stock icon, a document behind a browser window, returned for a site that declares no icon (Ministry of Health and Wellness, Barbados; dropped 17 November 2026)",
  "2c016906b8755173681b21ba2e777f66": "Icon design template, a grey construction grid with a green corner (Shwe Yaung Hnin Si Cancer Foundation; dropped 17 November 2026)",
  "50df95f81316d5b260372f6de8aba092": "Website template icon, a graduation cap in a shield with laurels, served by health.gov.pg (three Papua New Guinea health records; dropped 17 November 2026)",
};

export const md5Of = (buf: Buffer | Uint8Array): string => createHash("md5").update(buf).digest("hex");

/** What generic icon these bytes are, or undefined when they are not a known one. */
export function genericIcon(buf: Buffer | Uint8Array): string | undefined {
  return GENERIC_ICON_MD5[md5Of(buf)];
}
