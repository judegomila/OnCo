import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { BO_DIVE } from "@/data/country-bo";

export const metadata: Metadata = pageMeta({ title: BO_DIVE.title, description: BO_DIVE.description, path: "/countries/bo/" });

export default function BoliviaPage() {
  return <CountryDeepDive dive={BO_DIVE} />;
}
