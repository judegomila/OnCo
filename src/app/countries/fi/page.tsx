import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { FI_DIVE } from "@/data/country-fi";

export const metadata: Metadata = pageMeta({ title: FI_DIVE.title, description: FI_DIVE.description, path: "/countries/fi/" });

export default function FinlandPage() {
  return <CountryDeepDive dive={FI_DIVE} />;
}
