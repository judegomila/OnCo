import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { JO_DIVE } from "@/data/country-jo";

export const metadata: Metadata = pageMeta({ title: JO_DIVE.title, description: JO_DIVE.description, path: "/countries/jo/" });

export default function JordanPage() {
  return <CountryDeepDive dive={JO_DIVE} />;
}
