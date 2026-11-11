import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { ZM_DIVE } from "@/data/country-zm";

export const metadata: Metadata = pageMeta({ title: ZM_DIVE.title, description: ZM_DIVE.description, path: "/countries/zm/" });

export default function ZambiaPage() {
  return <CountryDeepDive dive={ZM_DIVE} />;
}
