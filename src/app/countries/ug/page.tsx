import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { UG_DIVE } from "@/data/country-ug";

export const metadata: Metadata = pageMeta({ title: UG_DIVE.title, description: UG_DIVE.description, path: "/countries/ug/" });

export default function UgandaPage() {
  return <CountryDeepDive dive={UG_DIVE} />;
}
