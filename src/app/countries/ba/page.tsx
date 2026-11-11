import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { BA_DIVE } from "@/data/country-ba";

export const metadata: Metadata = pageMeta({ title: BA_DIVE.title, description: BA_DIVE.description, path: "/countries/ba/" });

export default function BosniaAndHerzegovinaPage() {
  return <CountryDeepDive dive={BA_DIVE} />;
}
