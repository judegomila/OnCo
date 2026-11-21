import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { GQ_DIVE } from "@/data/country-gq";

export const metadata: Metadata = pageMeta({ title: GQ_DIVE.title, description: GQ_DIVE.description, path: "/countries/gq/" });

export default function EquatorialGuineaPage() {
  return <CountryDeepDive dive={GQ_DIVE} />;
}
