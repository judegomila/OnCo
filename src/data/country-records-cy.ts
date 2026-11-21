import type { EntityInput, InstitutionInput } from "@/lib/schema";

/**
 * Cyprus: the public body behind /countries/cy/ (wave 13) that the corpus did not hold, written from the European
 * Observatory on Health Systems and Policies' Health Systems and Policy Monitor for Cyprus (sections 2.7.4 and 5.6),
 * read raw on 16 November 2026. The department's own pages refused a plain request (403) and were not read; its postal
 * address (1475 Nicosia) is from the European Medicines Agency's list of national competent authorities, read raw the same day. The
 * Cyprus Cancer Registry, the Health Insurance Organisation, the Bank of Cyprus Oncology Centre and the German
 * Oncology Center already exist and are reused. Coordinates are an approximate city point for Nicosia.
 */
const asOf = "2026-11-16";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });

const HSPM = "https://eurohealthobservatory.who.int/monitors/health-systems-monitor/countries-hspm/hspm/cyprus2025";

const institutions: InstitutionInput[] = [
  i({ id: "cyprus-pharmaceutical-services", name: "Pharmaceutical Services, Ministry of Health (Cyprus)", aka: ["Department of Pharmaceutical Services", "DPhS"],
    city: "Nicosia", country: "CY", lat: 35.17, lng: 33.36, institutionType: "government",
    tldr: "The department of Cyprus's Ministry of Health responsible for the quality, safety and pricing of medicines. It acts as secretariat of the Drugs Council, which administers the 2001 law on the licensing and marketing of medicines.",
    summary: "The European Observatory's Health Systems and Policy Monitor says that ensuring the quality, efficacy, safety and pricing of pharmaceuticals in Cyprus is the responsibility of the Department of Pharmaceutical Services, which falls under the Ministry of Health. It acts as the secretariat of the Drugs Council, providing evaluation before and after approval and inspection and supervision, under the Medicinal Products for Human Use (Control of Quality, Supply and Pricing) Law of 2001 (70(I)/2001), which is harmonised with Directive 2001/83/EC. Medicines are marketed in Cyprus through national procedures or, with other EU member states, through the centralised, decentralised and mutual recognition procedures. Its pharmacovigilance and clinical trials sectors monitor the safety of medicines after marketing, and its pricing sector sets the prices of prescription medicines within 90 days of a complete application by comparing wholesale prices in ten reference countries. Under the General Healthcare System the decision to reimburse a medicine belongs to the Health Insurance Organisation, not to the department. The Monitor notes that a bill to establish a National Pharmaceutical Authority was still pending. OnCo has not read the department's own pages, which refused a plain request. The European Medicines Agency's list of national competent authorities gives its address as Pharmaceutical Services, Ministry of Health, 1475 Nicosia; the coordinates are an approximate city point for Nicosia, not the building.",
    programs: ["Secretariat of the Drugs Council", "Pharmacovigilance and clinical trials sectors", "Medicinal product pricing"],
    institutions: ["cyprus-health-insurance-organisation", "ema"],
    links: [
      { label: "Health Systems and Policy Monitor, Cyprus: 2.7.4 Regulation and governance of pharmaceuticals", url: `${HSPM}/organization-and-governance/regulation` },
      { label: "Health Systems and Policy Monitor, Cyprus: 5.6 Pharmaceutical care", url: `${HSPM}/provision-of-services/pharmaceutical-care` },
      { label: "EMA: national competent authorities (human), entry for Cyprus", url: "https://www.ema.europa.eu/en/partners-networks/eu-partners/eu-member-states/national-competent-authorities-human" },
    ] }),
];

/** Records behind /countries/cy/ (wave 13). */
export const recordsCY: EntityInput[] = [...institutions];
