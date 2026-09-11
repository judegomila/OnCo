/**
 * Location-aware helpers for ClinicalTrials.gov API v2, verified against the live API (2026-09-07):
 *  - `query.locn=<country or city>` restricts to studies with a matching location string.
 *  - `filter.geo=distance(lat,lon,50mi)` restricts to studies with a site within the radius.
 *  - Fields `LocationCity, LocationCountry, LocationFacility, LocationGeoPoint` return all sites, so
 *    distance to the nearest site is computed here.
 * Geocoding uses OpenStreetMap Nominatim on explicit user action only, with a User-Agent, one
 * request at a time, per its usage policy (https://operations.osmfoundation.org/policies/nominatim/).
 */

export type Site = { facility?: string; city?: string; country?: string; lat?: number; lon?: number };
export type GeoStudy = { nctId: string; title: string; phase: string; status: string; sponsor: string; start?: string; sites: Site[]; nearest?: { site: Site; km: number } };

export function buildGeoApiUrl(opts: { condition?: string; intervention?: string; country?: string; center?: { lat: number; lon: number; radiusMi: number }; pageSize?: number }): string {
  const p = new URLSearchParams();
  p.set("format", "json");
  p.set("pageSize", String(opts.pageSize ?? 15));
  p.set("filter.overallStatus", "RECRUITING");
  if (opts.condition) p.set("query.cond", opts.condition);
  if (opts.intervention) p.set("query.intr", opts.intervention);
  if (opts.country) p.set("query.locn", opts.country);
  if (opts.center) p.set("filter.geo", `distance(${opts.center.lat.toFixed(4)},${opts.center.lon.toFixed(4)},${Math.round(opts.center.radiusMi)}mi)`);
  p.set("fields", "NCTId,BriefTitle,Phase,OverallStatus,LeadSponsorName,StartDate,LocationFacility,LocationCity,LocationCountry,LocationGeoPoint");
  p.set("sort", "LastUpdatePostDate:desc");
  return `https://clinicaltrials.gov/api/v2/studies?${p.toString()}`;
}

export function buildGeoSearchUrl(opts: { condition?: string; intervention?: string; country?: string }): string {
  const p = new URLSearchParams();
  if (opts.condition) p.set("cond", opts.condition);
  if (opts.intervention) p.set("intr", opts.intervention);
  if (opts.country) p.set("locStr", opts.country);
  p.set("aggFilters", "status:rec");
  return `https://clinicaltrials.gov/search?${p.toString()}`;
}

type Raw = {
  protocolSection?: {
    identificationModule?: { nctId?: string; briefTitle?: string };
    statusModule?: { overallStatus?: string; startDateStruct?: { date?: string } };
    sponsorCollaboratorsModule?: { leadSponsor?: { name?: string } };
    designModule?: { phases?: string[] };
    contactsLocationsModule?: { locations?: Array<{ facility?: string; city?: string; country?: string; geoPoint?: { lat?: number; lon?: number } }> };
  };
};

export function parseGeoStudies(json: { studies?: Raw[] }, center?: { lat: number; lon: number }): GeoStudy[] {
  return (json.studies ?? []).map((s) => {
    const ps = s.protocolSection ?? {};
    const sites: Site[] = (ps.contactsLocationsModule?.locations ?? []).map((l) => ({ facility: l.facility, city: l.city, country: l.country, lat: l.geoPoint?.lat, lon: l.geoPoint?.lon }));
    let nearest: GeoStudy["nearest"];
    if (center) {
      for (const site of sites) {
        if (site.lat === undefined || site.lon === undefined) continue;
        const km = haversineKm(center.lat, center.lon, site.lat, site.lon);
        if (!nearest || km < nearest.km) nearest = { site, km };
      }
    }
    const phases = ps.designModule?.phases ?? [];
    return {
      nctId: ps.identificationModule?.nctId ?? "",
      title: ps.identificationModule?.briefTitle ?? "",
      phase: phases.length ? phases.map((p) => p.replace("EARLY_PHASE1", "Early 1").replace("PHASE", "").replace("NA", "N/A")).join("/") : "-",
      status: ps.statusModule?.overallStatus ?? "",
      sponsor: ps.sponsorCollaboratorsModule?.leadSponsor?.name ?? "",
      start: ps.statusModule?.startDateStruct?.date,
      sites, nearest,
    };
  }).filter((s) => s.nctId).sort((a, b) => (a.nearest?.km ?? Infinity) - (b.nearest?.km ?? Infinity));
}

export function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371, toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1), dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

/** Geocode a postcode or place with Nominatim. Call only on explicit user action. */
export async function geocode(query: string, countryHint?: string): Promise<{ lat: number; lon: number; label: string } | null> {
  const p = new URLSearchParams({ format: "json", limit: "1", q: countryHint ? `${query}, ${countryHint}` : query });
  const r = await fetch(`https://nominatim.openstreetmap.org/search?${p.toString()}`, { headers: { Accept: "application/json" } });
  if (!r.ok) return null;
  const j = (await r.json()) as Array<{ lat: string; lon: string; display_name: string }>;
  if (!j.length) return null;
  return { lat: parseFloat(j[0].lat), lon: parseFloat(j[0].lon), label: j[0].display_name };
}

/** Countries offered in the country filter (CT.gov location strings). */
export const COUNTRIES = ["United States", "United Kingdom", "Canada", "Australia", "Germany", "France", "Spain", "Italy", "Netherlands", "Belgium", "Switzerland", "Sweden", "Denmark", "Ireland", "Israel", "Japan", "Korea, Republic of", "China", "Taiwan", "Singapore", "India", "Brazil", "Mexico", "Argentina", "South Africa"];
