import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { SO_DIVE } from "@/data/country-so";

export const metadata: Metadata = pageMeta({ title: SO_DIVE.title, description: SO_DIVE.description, path: "/countries/so/" });

export default function SomaliaPage() {
  return <CountryDeepDive dive={SO_DIVE} />;
}
