import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { TD_DIVE } from "@/data/country-td";

export const metadata: Metadata = pageMeta({ title: TD_DIVE.title, description: TD_DIVE.description, path: "/countries/td/" });

export default function ChadPage() {
  return <CountryDeepDive dive={TD_DIVE} />;
}
